import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getChildSession();
  if (!session.childId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const child = await prisma.child.findUnique({ where: { id: session.childId } });
  if (!child) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  const genre = searchParams.get("genre")?.trim();
  const langParam = searchParams.get("lang");
  const language = langParam === "hy" || langParam === "ru" || langParam === "en" ? langParam : child.preferredLanguage;

  const books = await prisma.book.findMany({
    where: {
      language,
      status: "LIVE",
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { author: { contains: q } },
            ],
          }
        : {}),
      ...(genre ? { bookGroup: { genre } } : {}),
    },
    include: { bookGroup: true, coverImage: true },
    orderBy: { title: "asc" },
  });

  return NextResponse.json(
    books.map((b) => ({
      id: b.id,
      slug: b.bookGroup.slug,
      title: b.title,
      author: b.author,
      genre: b.bookGroup.genre,
      shortSummary: b.shortSummary,
      coverUrl: b.coverImage?.storagePath ?? null,
    }))
  );
}
