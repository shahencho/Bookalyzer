import type { PrismaClient } from "@prisma/client";

const MAX_ATTEMPTS = 10;
const LOCKOUT_MINUTES = 15;

/**
 * A 4-digit PIN is only 10,000 combinations, so unthrottled login attempts
 * are trivially guessable. Locks a child's nickname for 15 minutes after
 * 10 consecutive failed attempts.
 */
export async function isLockedOut(prisma: PrismaClient, childId: number): Promise<boolean> {
  const since = new Date(Date.now() - LOCKOUT_MINUTES * 60 * 1000);
  const recent = await prisma.loginAttempt.findMany({
    where: { childId, attemptedAt: { gte: since } },
    orderBy: { attemptedAt: "desc" },
    take: MAX_ATTEMPTS,
  });
  if (recent.length < MAX_ATTEMPTS) return false;
  return recent.every((a) => !a.succeeded);
}

export async function recordLoginAttempt(prisma: PrismaClient, childId: number, succeeded: boolean) {
  await prisma.loginAttempt.create({ data: { childId, succeeded } });
}
