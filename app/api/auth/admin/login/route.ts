import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || password === undefined || password === null) {
    return NextResponse.json({ error: "email and password are required" }, { status: 400 });
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const session = await getAdminSession();
  session.adminId = admin.id;
  await session.save();

  return NextResponse.json({ id: admin.id, name: admin.name });
}
