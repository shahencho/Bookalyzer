import { PrismaClient, BookStatus } from "@prisma/client";
import { validateBookContent } from "./validateBookContent";

const QUESTION_TYPE_MAP: Record<string, string> = {
  mc: "MC",
  ordering: "ORDERING",
  matching: "MATCHING",
  fillblank: "FILLBLANK",
  classification: "CLASSIFICATION",
  open: "OPEN",
  ranking: "RANKING",
  crossword: "CROSSWORD",
};

const BLOOM_MAP: Record<string, string> = {
  Remember: "REMEMBER",
  Understand: "UNDERSTAND",
  Apply: "APPLY",
  Analyze: "ANALYZE",
  Evaluate: "EVALUATE",
  Create: "CREATE",
};

function slugToTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

/**
 * Imports/upserts one book+language content file.
 *
 * Question matching strategy: by (bookId, prompt), scoped to non-archived
 * rows only. Editing a question's content/answer key on re-import updates
 * the existing row in place (past QuestionAttempt scores are untouched,
 * since they store the score at attempt time, not a live computation).
 * Editing a question's *prompt* wording is treated as a new question — the
 * old row is archived (never hard-deleted, to protect QuestionAttempt's FK
 * to attempt history), and a fresh row is inserted. This is an accepted
 * tradeoff of matching by prompt text instead of an explicit content key.
 */
export async function importBookFile(prisma: PrismaClient, raw: unknown, filePath: string) {
  const result = validateBookContent(raw);
  if (!result.valid) {
    throw new Error(`Invalid content file ${filePath}:\n${result.errors.join("\n")}`);
  }
  if (result.warnings.length > 0) {
    console.warn(`Warnings for ${filePath}:\n${result.warnings.join("\n")}`);
  }

  const data = raw as {
    book_slug: string;
    language: "hy" | "ru" | "en";
    title: string;
    author: string;
    genre: string;
    copyright_status?: "public domain" | "active copyright" | "adaptation-rights edge case";
    short_summary: string;
    extended_summary: string;
    questions: Array<{
      type: string;
      bloom_level: string;
      prompt: string;
      content: unknown;
      explanation: string;
    }>;
  };

  await prisma.$transaction(async (tx) => {
    const bookGroup = await tx.bookGroup.upsert({
      where: { slug: data.book_slug },
      create: {
        slug: data.book_slug,
        title: slugToTitleCase(data.book_slug),
        author: data.author,
        genre: data.genre,
        ...(data.copyright_status ? { copyrightStatus: data.copyright_status } : {}),
      },
      update: {
        genre: data.genre,
        author: data.author,
        ...(data.copyright_status ? { copyrightStatus: data.copyright_status } : {}),
      },
    });

    const book = await tx.book.upsert({
      where: { bookGroupId_language: { bookGroupId: bookGroup.id, language: data.language } },
      create: {
        bookGroupId: bookGroup.id,
        language: data.language,
        title: data.title,
        author: data.author,
        shortSummary: data.short_summary,
        extendedSummary: data.extended_summary,
        status: BookStatus.LIVE,
      },
      update: {
        title: data.title,
        author: data.author,
        shortSummary: data.short_summary,
        extendedSummary: data.extended_summary,
        // status is intentionally left untouched — an admin may have
        // manually taken this language version offline.
      },
    });

    const existingActive = await tx.question.findMany({
      where: { bookId: book.id, archivedAt: null },
    });
    const existingByPrompt = new Map(existingActive.map((q) => [q.prompt.trim().toLowerCase(), q]));
    const seenIds = new Set<number>();

    for (const q of data.questions) {
      const key = q.prompt.trim().toLowerCase();
      const existing = existingByPrompt.get(key);
      const type = QUESTION_TYPE_MAP[q.type];
      const bloomLevel = BLOOM_MAP[q.bloom_level];

      if (existing) {
        await tx.question.update({
          where: { id: existing.id },
          data: {
            type: type as never,
            bloomLevel: bloomLevel as never,
            content: q.content as never,
            explanation: q.explanation,
          },
        });
        seenIds.add(existing.id);
      } else {
        const created = await tx.question.create({
          data: {
            bookId: book.id,
            type: type as never,
            bloomLevel: bloomLevel as never,
            prompt: q.prompt,
            content: q.content as never,
            explanation: q.explanation,
          },
        });
        seenIds.add(created.id);
      }
    }

    const toArchive = existingActive.filter((q) => !seenIds.has(q.id));
    if (toArchive.length > 0) {
      await tx.question.updateMany({
        where: { id: { in: toArchive.map((q) => q.id) } },
        data: { archivedAt: new Date() },
      });
    }
  });
}
