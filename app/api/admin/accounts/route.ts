import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const parents = await prisma.parent.findMany({
    include: { children: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    parents.map((p) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      createdAt: p.createdAt,
      children: p.children.map((c) => ({
        id: c.id,
        name: c.name,
        nickname: c.nickname,
        age: c.age,
        xp: c.xp,
        createdAt: c.createdAt,
      })),
    }))
  );
}
