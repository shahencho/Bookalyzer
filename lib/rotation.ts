import type { PrismaClient } from "@prisma/client";

const QUESTIONS_PER_ATTEMPT = 6;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Picks 6 questions for a new assessment attempt: excludes only the exact
 * questions shown in the child's single most-recent *completed* attempt on
 * this book, backfilling with least-recently-seen questions if the active
 * bank is too small to avoid repeats. No multi-attempt lookback, no
 * weighting — per the addendum's simplification #5.
 */
export async function pickQuestionsForAttempt(
  prisma: PrismaClient,
  childId: number,
  bookId: number
): Promise<number[]> {
  const activeQuestions = await prisma.question.findMany({
    where: { bookId, archivedAt: null },
    select: { id: true },
  });
  const activeIds = activeQuestions.map((q) => q.id);

  const lastSession = await prisma.assessmentSession.findFirst({
    where: { childId, bookId, status: "COMPLETED" },
    orderBy: { completedAt: "desc" },
    include: { questionAttempts: { select: { questionId: true } } },
  });
  const excludeIds = new Set(lastSession?.questionAttempts.map((a) => a.questionId) ?? []);

  const eligible = activeIds.filter((id) => !excludeIds.has(id));

  if (eligible.length >= QUESTIONS_PER_ATTEMPT) {
    return shuffle(eligible).slice(0, QUESTIONS_PER_ATTEMPT);
  }

  // Backfill from least-recently-seen (oldest last QuestionAttempt.createdAt
  // first; never-seen questions sort first via null-as-oldest).
  const excludedIds = [...excludeIds].filter((id) => activeIds.includes(id));
  const lastSeenAt = await prisma.questionAttempt.groupBy({
    by: ["questionId"],
    where: { questionId: { in: excludedIds } },
    _max: { createdAt: true },
  });
  const lastSeenMap = new Map(lastSeenAt.map((r) => [r.questionId, r._max.createdAt]));
  const backfillOrder = [...excludedIds].sort((a, b) => {
    const aTime = lastSeenMap.get(a)?.getTime() ?? 0;
    const bTime = lastSeenMap.get(b)?.getTime() ?? 0;
    return aTime - bTime;
  });

  const needed = QUESTIONS_PER_ATTEMPT - eligible.length;
  const backfill = backfillOrder.slice(0, needed);

  return shuffle([...eligible, ...backfill]).slice(0, QUESTIONS_PER_ATTEMPT);
}
