import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { importBookFile } from "@/lib/content/importBook";
import { validateBookContent } from "@/lib/content/validateBookContent";

const CONTENT_DIR = path.join(process.cwd(), "content", "books");

function contentFilePath(slug: string, language: string) {
  return path.join(CONTENT_DIR, `${slug}.${language}.json`);
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ bookId: string }> }) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { bookId } = await params;
  const book = await prisma.book.findUnique({
    where: { id: Number(bookId) },
    include: { bookGroup: true },
  });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const filePath = contentFilePath(book.bookGroup.slug, book.language);
  let raw: string;
  try {
    raw = await fs.readFile(filePath, "utf-8");
  } catch {
    return NextResponse.json(
      { error: `Content file not found on disk at content/books/${book.bookGroup.slug}.${book.language}.json` },
      { status: 404 }
    );
  }

  const filename = `${book.bookGroup.slug}.${book.language}.json`;
  return new NextResponse(raw, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ bookId: string }> }) {
  const session = await getAdminSession();
  if (!session.adminId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { bookId } = await params;
  const book = await prisma.book.findUnique({
    where: { id: Number(bookId) },
    include: { bookGroup: true },
  });
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const text = await file.text();
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    return NextResponse.json({ error: `Not valid JSON: ${err instanceof Error ? err.message : String(err)}` }, { status: 400 });
  }

  const result = validateBookContent(raw);
  if (!result.valid) {
    return NextResponse.json({ error: "Content validation failed", errors: result.errors }, { status: 400 });
  }

  const data = raw as { book_slug: string; language: string; questions: unknown[] };
  if (data.book_slug !== book.bookGroup.slug || data.language !== book.language) {
    return NextResponse.json(
      {
        error: `This file is for "${data.book_slug}" (${data.language}), but this row is "${book.bookGroup.slug}" (${book.language}). Download this row's current file, make your edits in place, and upload that.`,
      },
      { status: 400 }
    );
  }

  const filePath = contentFilePath(book.bookGroup.slug, book.language);
  await fs.mkdir(CONTENT_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(raw, null, 2) + "\n", "utf-8");

  await importBookFile(prisma, raw, filePath);

  return NextResponse.json({
    ok: true,
    questionCount: data.questions.length,
    warnings: result.warnings,
  });
}
