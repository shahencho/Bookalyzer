import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";
import { gradeQuestion, type QuestionType } from "@/lib/grading";
import { gradeOpenWithLlm } from "@/lib/llmGrading";

const BADGE_BY_MODE: Record<string, "BRONZE" | "SILVER" | "GOLD"> = {
  SHORT: "BRONZE",
  EXTENDED: "SILVER",
  PHYSICAL: "GOLD",
};

const XP_PER_COMPLETION = 5;

export async function POST(req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { sessionId } = await params;
  const body = await req.json().catch(() => ({}));
  const durationSeconds: number | undefined = body?.durationSeconds;

  const assessmentSession = await prisma.assessmentSession.findUnique({
    where: { id: Number(sessionId) },
    include: { book: true, questionAttempts: { include: { question: true } } },
  });
  if (!assessmentSession || assessmentSession.childId !== session.childId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (assessmentSession.status !== "IN_PROGRESS") {
    return NextResponse.json({ error: "Session already submitted" }, { status: 409 });
  }

  const { book } = assessmentSession;

  // Rule-based grading first. Every answered open question then goes to the
  // LLM (all in parallel), which judges meaning with the keywords as hints
  // only — a keyword can appear inside an answer that misses the point, and
  // a good answer can use none. On LLM failure the keyword score stands.
  const breakdown = await Promise.all(
    assessmentSession.questionAttempts.map(async (attempt) => {
      type Graded = { attempt: typeof attempt; score: number; gradingMethod: string; gradingReasoning: string | null };
      const type = attempt.question.type.toLowerCase() as QuestionType;
      const score = gradeQuestion(type, attempt.question.content as never, attempt.answerGiven);
      if (type !== "open") {
        return { attempt, score, gradingMethod: "EXACT", gradingReasoning: null } satisfies Graded;
      }

      const answerText = String(attempt.answerGiven ?? "").trim();
      if (answerText === "") {
        return { attempt, score: 0, gradingMethod: "KEYWORD", gradingReasoning: null } satisfies Graded;
      }

      const llm = await gradeOpenWithLlm({
        language: book.language,
        bookTitle: book.title,
        bookAuthor: book.author,
        bookSummary: book.extendedSummary,
        prompt: attempt.question.prompt,
        bloomLevel: attempt.question.bloomLevel,
        explanation: attempt.question.explanation,
        keywords: (attempt.question.content as { keywords?: string[] }).keywords ?? [],
        answer: answerText,
      });
      const graded: Graded = llm
        ? { attempt, score: llm.score, gradingMethod: "LLM", gradingReasoning: llm.reasoning }
        : { attempt, score, gradingMethod: "LLM_FAILED", gradingReasoning: null };
      return graded;
    })
  );

  const overallScore =
    breakdown.length === 0
      ? 0
      : Math.round((breakdown.reduce((sum, b) => sum + b.score, 0) / breakdown.length) * 100);

  const badgeTier = BADGE_BY_MODE[assessmentSession.readingMode] ?? "BRONZE";

  await prisma.$transaction(async (tx) => {
    for (const { attempt, score, gradingMethod, gradingReasoning } of breakdown) {
      await tx.questionAttempt.update({
        where: { id: attempt.id },
        data: { score, gradingMethod, gradingReasoning },
      });
    }

    await tx.assessmentSession.update({
      where: { id: assessmentSession.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        overallScore,
        xpEarned: XP_PER_COMPLETION,
        badgeEarned: badgeTier,
        durationSeconds: durationSeconds ?? null,
      },
    });

    // Badge is awarded on finishing, regardless of score — no pass/fail gate.
    await tx.badge.upsert({
      where: {
        childId_bookId_badgeTier: {
          childId: assessmentSession.childId,
          bookId: assessmentSession.bookId,
          badgeTier,
        },
      },
      create: { childId: assessmentSession.childId, bookId: assessmentSession.bookId, badgeTier },
      update: {},
    });

    await tx.child.update({
      where: { id: assessmentSession.childId },
      data: { xp: { increment: XP_PER_COMPLETION } },
    });
  });

  return NextResponse.json({
    overallScore,
    xpEarned: XP_PER_COMPLETION,
    badgeEarned: badgeTier,
    breakdown: breakdown.map(({ attempt, score }) => ({
      questionId: attempt.questionId,
      prompt: attempt.question.prompt,
      bloomLevel: attempt.question.bloomLevel,
      score,
      explanation: attempt.question.explanation,
    })),
  });
}
