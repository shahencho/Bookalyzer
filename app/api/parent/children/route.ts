import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getParentSession } from "@/lib/auth";

const NICKNAME_PATTERN = /^[a-z0-9_]{3,20}$/;
const PIN_PATTERN = /^\d{4}$/;

export async function POST(req: NextRequest) {
  const session = await getParentSession();
  if (!session.parentId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { name, nickname, pin, age } = await req.json();

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof nickname !== "string" || !NICKNAME_PATTERN.test(nickname)) {
    return NextResponse.json(
      { error: "Nickname must be 3-20 characters: lowercase letters, numbers, underscore" },
      { status: 400 }
    );
  }
  if (typeof pin !== "string" || !PIN_PATTERN.test(pin)) {
    return NextResponse.json({ error: "PIN must be exactly 4 digits" }, { status: 400 });
  }
  const ageNum = Number(age);
  if (!Number.isInteger(ageNum) || ageNum < 4 || ageNum > 17) {
    return NextResponse.json({ error: "Age must be between 4 and 17" }, { status: 400 });
  }

  const pinHash = await bcrypt.hash(pin, 10);

  let child;
  try {
    child = await prisma.child.create({
      data: { parentId: session.parentId, name: name.trim(), nickname, pinHash, age: ageNum },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ error: "That nickname is already taken" }, { status: 409 });
    }
    throw e;
  }

  return NextResponse.json({
    id: child.id,
    name: child.name,
    nickname: child.nickname,
    age: child.age,
    xp: child.xp,
    booksCompleted: 0,
    attempts: 0,
    lastScore: null,
    lastMode: null,
  });
}

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
