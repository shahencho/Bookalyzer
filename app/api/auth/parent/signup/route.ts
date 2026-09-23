import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getParentSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  let parent;
  try {
    parent = await prisma.parent.create({
      data: { name: name.trim(), email: normalizedEmail, passwordHash },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    throw e;
  }

  const session = await getParentSession();
  session.parentId = parent.id;
  await session.save();

  return NextResponse.json({ id: parent.id, name: parent.name });
}
