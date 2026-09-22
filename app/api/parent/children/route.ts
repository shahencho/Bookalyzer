import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getParentSession } from "@/lib/auth";

export async function GET() {
  const session = await getParentSession();
  if (!session.parentId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const children = await prisma.child.findMany({
    where: { parentId: session.parentId },
    include: {
      assessmentSessions: { where: { status: "COMPLETED" }, orderBy: { completedAt: "desc" } },
    },
  });

  return NextResponse.json(
    children.map((c) => {
      const last = c.assessmentSessions[0];
      return {
        id: c.id,
        name: c.name,
        nickname: c.nickname,
        age: c.age,
        xp: c.xp,
        booksCompleted: new Set(c.assessmentSessions.map((s) => s.bookId)).size,
        attempts: c.assessmentSessions.length,
        lastScore: last?.overallScore ?? null,
        lastMode: last?.readingMode ?? null,
      };
    })
  );
}
