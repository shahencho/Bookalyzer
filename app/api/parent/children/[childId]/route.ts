import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getParentSession } from "@/lib/auth";
import { generateInsight } from "@/lib/insight";

export async function GET(req: NextRequest, { params }: { params: Promise<{ childId: string }> }) {
  const session = await getParentSession();
  if (!session.parentId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { childId } = await params;
  const child = await prisma.child.findUnique({ where: { id: Number(childId) } });
  if (!child || child.parentId !== session.parentId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const sessions = await prisma.assessmentSession.findMany({
    where: { childId: child.id, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    include: { book: true },
  });

  const attempts = await prisma.questionAttempt.findMany({
    where: { session: { childId: child.id, status: "COMPLETED" } },
    include: { question: true },
  });

  const byBloom = new Map<string, number[]>();
  for (const a of attempts) {
    if (a.score === null) continue;
    const level = a.question.bloomLevel;
    if (!byBloom.has(level)) byBloom.set(level, []);
    byBloom.get(level)!.push(a.score);
  }
  const bloomAverages = Object.fromEntries(
    [...byBloom.entries()].map(([level, scores]) => [
      level,
      Math.round((scores.reduce((s, v) => s + v, 0) / scores.length) * 100),
    ])
  );

  return NextResponse.json({
    id: child.id,
    name: child.name,
    nickname: child.nickname,
    age: child.age,
    xp: child.xp,
    booksCompleted: new Set(sessions.map((s) => s.bookId)).size,
    attempts: sessions.length,
    lastScore: sessions[0]?.overallScore ?? null,
    bloom: bloomAverages,
    insight: generateInsight(child.name, bloomAverages),
    history: sessions.map((s) => ({
      date: s.completedAt,
      mode: s.readingMode,
      score: s.overallScore,
      book: s.book.title,
    })),
  });
}
