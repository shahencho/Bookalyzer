import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";
import { pickQuestionsForAttempt } from "@/lib/rotation";
import { sanitizeQuestionForClient } from "@/lib/content/sanitizeQuestionForClient";

function toClientQuestion(q: { id: number; type: string; bloomLevel: string; prompt: string; content: unknown }) {
  const type = q.type.toLowerCase() as Parameters<typeof sanitizeQuestionForClient>[0];
  return {
    id: q.id,
    type,
    bloomLevel: q.bloomLevel,
    prompt: q.prompt,
    content: sanitizeQuestionForClient(type, q.content as never),
  };
}

export async function POST(req: NextRequest) {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { bookId, readingMode } = await req.json();
  if (!bookId || !readingMode) {
    return NextResponse.json({ error: "bookId and readingMode are required" }, { status: 400 });
  }

  // If an in-progress session already exists for this child+book, resume it
  // instead of creating a second one (keeps rotation's "most recent
  // completed attempt" exclusion unambiguous and avoids orphaned sessions).
  const existing = await prisma.assessmentSession.findFirst({
    where: { childId: session.childId, bookId: Number(bookId), status: "IN_PROGRESS" },
    include: { questionAttempts: { include: { question: true }, orderBy: { id: "asc" } } },
  });
  if (existing) {
    return NextResponse.json({
      sessionId: existing.id,
      readingMode: existing.readingMode,
      resumed: true,
      questions: existing.questionAttempts.map((a) => toClientQuestion(a.question)),
      answers: Object.fromEntries(
        existing.questionAttempts
          .filter((a) => a.answerGiven !== null)
          .map((a) => [a.questionId, a.answerGiven])
      ),
    });
  }

  const questionIds = await pickQuestionsForAttempt(prisma, session.childId, Number(bookId));
  if (questionIds.length === 0) {
    return NextResponse.json({ error: "This book has no active questions yet" }, { status: 409 });
  }

  const questions = await prisma.question.findMany({ where: { id: { in: questionIds } } });
  // preserve the rotation-picked order
  const ordered = questionIds.map((id) => questions.find((q) => q.id === id)!).filter(Boolean);

  const created = await prisma.assessmentSession.create({
    data: {
      childId: session.childId,
      bookId: Number(bookId),
      readingMode,
      status: "IN_PROGRESS",
      questionAttempts: {
        create: ordered.map((q) => ({ questionId: q.id })),
      },
    },
  });

  return NextResponse.json({
    sessionId: created.id,
    readingMode: created.readingMode,
    resumed: false,
    questions: ordered.map(toClientQuestion),
    answers: {},
  });
}
