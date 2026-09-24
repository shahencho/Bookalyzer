import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// Fixed test-account defaults, by design — this endpoint exists purely to
// get a parent+child pair into the DB in one click for admins testing the
// child-facing flow with real families. Not for real accounts.
const DEFAULT_PARENT_PASSWORD = "11111111";
const DEFAULT_CHILD_PIN = "1111";

function slugify(input: string): string {
  const base = input.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 15);
  return base.padEnd(3, "0") || "user";
}

async function firstFreeEmail(base: string): Promise<string> {
  for (let i = 0; i < 50; i++) {
    const email = i === 0 ? `${base}@bookalyzer.test` : `${base}${i}@bookalyzer.test`;
    if (!(await prisma.parent.findUnique({ where: { email } }))) return email;
  }
  throw new Error("Could not find a free email after 50 attempts");
}

async function firstFreeNickname(base: string): Promise<string> {
  for (let i = 0; i < 50; i++) {
    const nickname = i === 0 ? base : `${base}${i}`;
    if (!(await prisma.child.findUnique({ where: { nickname } }))) return nickname;
  }
  throw new Error("Could not find a free nickname after 50 attempts");
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { parentName, childName, childAge } = await req.json();
  if (!parentName || typeof parentName !== "string" || !parentName.trim()) {
    return NextResponse.json({ error: "Parent name is required" }, { status: 400 });
  }
  if (!childName || typeof childName !== "string" || !childName.trim()) {
    return NextResponse.json({ error: "Child name is required" }, { status: 400 });
  }
  const age = Number.isInteger(Number(childAge)) ? Number(childAge) : 8;
  const clampedAge = Math.min(17, Math.max(4, age));

  const email = await firstFreeEmail(slugify(parentName));
  const nickname = await firstFreeNickname(slugify(childName));
  const [passwordHash, pinHash] = await Promise.all([
    bcrypt.hash(DEFAULT_PARENT_PASSWORD, 10),
    bcrypt.hash(DEFAULT_CHILD_PIN, 10),
  ]);

  const parent = await prisma.parent.create({
    data: {
      name: parentName.trim(),
      email,
      passwordHash,
      children: {
        create: { name: childName.trim(), nickname, pinHash, age: clampedAge },
      },
    },
    include: { children: true },
  });

  return NextResponse.json({
    parent: { id: parent.id, name: parent.name, email: parent.email, password: DEFAULT_PARENT_PASSWORD },
    child: {
      id: parent.children[0].id,
      name: parent.children[0].name,
      nickname: parent.children[0].nickname,
      pin: DEFAULT_CHILD_PIN,
      age: parent.children[0].age,
    },
  });
}
