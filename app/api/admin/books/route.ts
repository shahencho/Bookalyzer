import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const books = await prisma.book.findMany({
    include: { bookGroup: true, coverImage: true },
    orderBy: [{ bookGroup: { title: "asc" } }, { language: "asc" }],
  });

  return NextResponse.json(
    books.map((b) => ({
      id: b.id,
      title: b.title,
      language: b.language,
      status: b.status,
      genre: b.bookGroup.genre,
      coverUrl: b.coverImage?.storagePath ?? null,
    }))
  );
}
