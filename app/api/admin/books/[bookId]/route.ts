import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ bookId: string }> }) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { bookId } = await params;
  const { status, coverImageId } = await req.json();

  const updated = await prisma.book.update({
    where: { id: Number(bookId) },
    data: {
      ...(status ? { status } : {}),
      ...(coverImageId !== undefined ? { coverImageId } : {}),
    },
  });

  return NextResponse.json(updated);
}
