import { NextResponse } from "next/server";
import { getParentSession } from "@/lib/auth";

export async function POST() {
  const session = await getParentSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}
