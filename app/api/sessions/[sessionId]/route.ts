import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";
import { sanitizeQuestionForClient } from "@/lib/content/sanitizeQuestionForClient";

export async function GET(req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { sessionId } = await params;
  const assessmentSession = await prisma.assessmentSession.findUnique({
    where: { id: Number(sessionId) },
    include: { questionAttempts: { include: { question: true }, orderBy: { id: "asc" } } },
  });

  if (!assessmentSession || assessmentSession.childId !== session.childId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    sessionId: assessmentSession.id,
    status: assessmentSession.status,
    readingMode: assessmentSession.readingMode,
    questions: assessmentSession.questionAttempts.map((a) => {
      const type = a.question.type.toLowerCase() as Parameters<typeof sanitizeQuestionForClient>[0];
      return {
        id: a.question.id,
        type,
        bloomLevel: a.question.bloomLevel,
        prompt: a.question.prompt,
        content: sanitizeQuestionForClient(type, a.question.content as never),
      };
    }),
    answers: Object.fromEntries(
      assessmentSession.questionAttempts
        .filter((a) => a.answerGiven !== null)
        .map((a) => [a.questionId, a.answerGiven])
    ),
  });
}
