import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";
import { isLockedOut, recordLoginAttempt } from "@/lib/loginLockout";

export async function POST(req: NextRequest) {
  const { nickname, pin } = await req.json();
  if (!nickname || pin === undefined || pin === null) {
    return NextResponse.json({ error: "nickname and pin are required" }, { status: 400 });
  }

  const child = await prisma.child.findUnique({ where: { nickname } });
  if (!child) {
    return NextResponse.json({ error: "Invalid nickname or PIN" }, { status: 401 });
  }

  if (await isLockedOut(prisma, child.id)) {
    return NextResponse.json(
      { error: "Too many failed attempts. Try again in 15 minutes." },
      { status: 429 }
    );
  }

  const valid = await bcrypt.compare(String(pin), child.pinHash);
  await recordLoginAttempt(prisma, child.id, valid);

  if (!valid) {
    return NextResponse.json({ error: "Invalid nickname or PIN" }, { status: 401 });
  }

  const session = await getChildSession();
  session.childId = child.id;
  await session.save();

  return NextResponse.json({ id: child.id, name: child.name, preferredLanguage: child.preferredLanguage });
}
