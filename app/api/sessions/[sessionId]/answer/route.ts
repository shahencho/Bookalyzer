import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

// Per-answer autosave so a closed browser can resume an in-progress attempt.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ sessionId: string }> }) {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { sessionId } = await params;
  const { questionId, answer } = await req.json();
  if (!questionId) {
    return NextResponse.json({ error: "questionId is required" }, { status: 400 });
  }

  const assessmentSession = await prisma.assessmentSession.findUnique({
    where: { id: Number(sessionId) },
  });
  if (!assessmentSession || assessmentSession.childId !== session.childId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (assessmentSession.status !== "IN_PROGRESS") {
    return NextResponse.json({ error: "Session is no longer in progress" }, { status: 409 });
  }

  await prisma.questionAttempt.updateMany({
    where: { sessionId: Number(sessionId), questionId: Number(questionId) },
    data: { answerGiven: answer },
  });

  return NextResponse.json({ ok: true });
}
