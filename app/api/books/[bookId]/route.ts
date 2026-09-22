import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ bookId: string }> }) {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { bookId } = await params;
  const book = await prisma.book.findUnique({
    where: { id: Number(bookId) },
    include: { bookGroup: true, coverImage: true },
  });

  if (!book || book.status !== "LIVE") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: book.id,
    slug: book.bookGroup.slug,
    title: book.title,
    author: book.author,
    genre: book.bookGroup.genre,
    shortSummary: book.shortSummary,
    extendedSummary: book.extendedSummary,
    coverUrl: book.coverImage?.storagePath ?? null,
  });
}
