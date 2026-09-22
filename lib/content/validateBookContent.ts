import { z } from "zod";

const bloomLevelSchema = z.enum([
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
]);

const mcSchema = z.object({
  type: z.literal("mc"),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    options: z.array(z.string().min(1)).min(2),
    correct: z.number().int().min(0),
  }),
  explanation: z.string().min(1),
}).refine((q) => q.content.correct < q.content.options.length, {
  message: "correct index out of range",
});

const orderingLikeSchema = z.object({
  type: z.enum(["ordering", "ranking"]),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    items: z.array(z.string().min(1)).min(2),
    correctOrder: z.array(z.number().int().min(0)),
  }),
  explanation: z.string().min(1),
}).refine((q) => {
  const { items, correctOrder } = q.content;
  if (correctOrder.length !== items.length) return false;
  const sorted = [...correctOrder].sort((a, b) => a - b);
  return sorted.every((v, i) => v === i);
}, { message: "correctOrder must be a permutation of item indices" });

const matchingSchema = z.object({
  type: z.literal("matching"),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    left: z.array(z.string().min(1)).min(2),
    right: z.array(z.string().min(1)).min(2),
    correctMap: z.record(z.string(), z.number().int().min(0)),
  }),
  explanation: z.string().min(1),
}).refine((q) => {
  const { left, right, correctMap } = q.content;
  if (left.length !== right.length) return false;
  return left.every((_, i) => {
    const v = correctMap[String(i)];
    return typeof v === "number" && v >= 0 && v < right.length;
  });
}, { message: "correctMap must cover every left index with a valid right index" });

const fillblankSchema = z.object({
  type: z.literal("fillblank"),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    answer: z.string().min(1),
    altAnswers: z.array(z.string()).optional(),
  }),
  explanation: z.string().min(1),
});

const classificationSchema = z.object({
  type: z.literal("classification"),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    groupA: z.string().min(1),
    groupB: z.string().min(1),
    options: z
      .array(
        z.object({
          label: z.string().min(1),
          group: z.enum(["A", "B"]),
        })
      )
      .min(2),
  }),
  explanation: z.string().min(1),
});

const openSchema = z.object({
  type: z.literal("open"),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    keywords: z.array(z.string().min(1)).min(1),
  }),
  explanation: z.string().min(1),
});

const crosswordSchema = z.object({
  type: z.literal("crossword"),
  bloom_level: bloomLevelSchema,
  prompt: z.string().min(1),
  content: z.object({
    gridSize: z.object({ rows: z.number().int().min(1), cols: z.number().int().min(1) }),
    words: z
      .array(
        z.object({
          answer: z.string().min(1),
          clue: z.string().min(1),
          row: z.number().int().min(0),
          col: z.number().int().min(0),
          direction: z.enum(["across", "down"]),
        })
      )
      .min(1),
  }),
  explanation: z.string().min(1),
}).refine((q) => {
  const { gridSize, words } = q.content;
  return words.every((w) => {
    const endRow = w.direction === "down" ? w.row + w.answer.length - 1 : w.row;
    const endCol = w.direction === "across" ? w.col + w.answer.length - 1 : w.col;
    return endRow < gridSize.rows && endCol < gridSize.cols;
  });
}, { message: "one or more crossword words fall outside the declared grid" });

const schemasByType: Record<string, z.ZodTypeAny> = {
  mc: mcSchema,
  ordering: orderingLikeSchema,
  ranking: orderingLikeSchema,
  matching: matchingSchema,
  fillblank: fillblankSchema,
  classification: classificationSchema,
  open: openSchema,
  crossword: crosswordSchema,
};

function parseQuestion(q: unknown) {
  const type = (q as { type?: string })?.type;
  const schema = type ? schemasByType[type] : undefined;
  if (!schema) {
    return { success: false as const, error: { issues: [{ path: ["type"], message: `unknown or missing question type "${type}"` }] } };
  }
  return schema.safeParse(q);
}

export const bookContentSchema = z.object({
  book_slug: z.string().min(1),
  language: z.enum(["hy", "ru", "en"]),
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  // Optional — defaults to "public domain" on create. Set to "active
  // copyright" for anything not confirmed public domain (see the 6 books
  // flagged in docs/bookalyzer-addendum-v2.0.md's copyright risk note).
  copyright_status: z.enum(["public domain", "active copyright", "adaptation-rights edge case"]).optional(),
  short_summary: z.string().min(1),
  extended_summary: z.string().min(1),
  questions: z.array(z.any()).min(1),
});

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const FIXED_GENRES = ["Fable", "Fantasy", "Adventure", "Family Story", "Classic Literature"];

export function validateBookContent(raw: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const top = bookContentSchema.safeParse(raw);
  if (!top.success) {
    return { valid: false, errors: top.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`), warnings };
  }

  const data = top.data;

  if (!FIXED_GENRES.includes(data.genre)) {
    warnings.push(`genre "${data.genre}" is not in the fixed genre list (${FIXED_GENRES.join(", ")})`);
  }

  const seenPrompts = new Set<string>();
  data.questions.forEach((q: { prompt?: string }, i: number) => {
    const result = parseQuestion(q);
    if (!result.success) {
      errors.push(`questions[${i}]: ${result.error.issues.map((iss: { message: string }) => iss.message).join("; ")}`);
      return;
    }
    const promptKey = String(q.prompt).trim().toLowerCase();
    if (seenPrompts.has(promptKey)) {
      errors.push(
        `questions[${i}]: duplicate prompt text within this book+language — the import pipeline matches questions by (book, prompt), so prompts must be unique`
      );
    }
    seenPrompts.add(promptKey);
  });

  // Runtime handles small banks gracefully (an attempt just shows fewer than
  // 6 questions rather than failing), so this is a content-quality nudge,
  // not a hard gate — real early content is often smaller than the target.
  if (data.questions.length < 6) {
    warnings.push(
      `only ${data.questions.length} question(s) — fewer than 6 means an assessment attempt won't reach the usual 6-question length`
    );
  } else if (data.questions.length < 10) {
    warnings.push(
      `only ${data.questions.length} question(s) — 10-15 is the target bank size so retakes have real variety`
    );
  }

  return { valid: errors.length === 0, errors, warnings };
}
