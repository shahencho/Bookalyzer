import { NextResponse } from "next/server";
import { getChildSession } from "@/lib/auth";

export async function POST() {
  const session = await getChildSession();
  session.destroy();
  return NextResponse.json({ ok: true });
}
