import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

const REWARD_GOAL = 20;
// A "qualifying" quiz toward the free-book reward: read the physical book
// and score 90%+ — matches the addendum's emphasis on physical reading as
// the highest-recognition mode.
const REWARD_MODE = "PHYSICAL";
const REWARD_MIN_SCORE = 90;

export async function GET() {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const child = await prisma.child.findUnique({ where: { id: session.childId } });
  if (!child) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const sessions = await prisma.assessmentSession.findMany({
    where: { childId: child.id, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    include: { book: { include: { bookGroup: true } } },
  });

  const badges = await prisma.badge.findMany({ where: { childId: child.id } });
  const badgeTally = {
    GOLD: badges.filter((b) => b.badgeTier === "GOLD").length,
    SILVER: badges.filter((b) => b.badgeTier === "SILVER").length,
    BRONZE: badges.filter((b) => b.badgeTier === "BRONZE").length,
  };

  const rewardCount = sessions.filter(
    (s) => s.readingMode === REWARD_MODE && (s.overallScore ?? 0) >= REWARD_MIN_SCORE
  ).length;

  return NextResponse.json({
    name: child.name,
    nickname: child.nickname,
    xp: child.xp,
    booksCompleted: new Set(sessions.map((s) => s.bookId)).size,
    attempts: sessions.length,
    lastScore: sessions[0]?.overallScore ?? null,
    badgeTally,
    rewardCount,
    rewardGoal: REWARD_GOAL,
    history: sessions.map((s) => ({
      date: s.completedAt,
      book: s.book.title,
      bookSlug: s.book.bookGroup.slug,
      mode: s.readingMode,
      score: s.overallScore,
    })),
  });
}
