import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getParentSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || password === undefined || password === null) {
    return NextResponse.json({ error: "email and password are required" }, { status: 400 });
  }

  const parent = await prisma.parent.findUnique({ where: { email } });
  if (!parent || !(await bcrypt.compare(password, parent.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const session = await getParentSession();
  session.parentId = parent.id;
  await session.save();

  return NextResponse.json({ id: parent.id, name: parent.name });
}
