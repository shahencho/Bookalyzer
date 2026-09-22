import { test } from "node:test";
import assert from "node:assert/strict";
import { validateBookContent } from "./validateBookContent";

function baseQuestion(overrides: Record<string, unknown> = {}) {
  return {
    type: "mc",
    bloom_level: "Remember",
    prompt: "Question?",
    content: { options: ["a", "b"], correct: 0 },
    explanation: "because",
    ...overrides,
  };
}

function baseFile(questions: unknown[]) {
  return {
    book_slug: "test-book",
    language: "en",
    title: "Test Book",
    author: "Author",
    genre: "Fable",
    short_summary: "s",
    extended_summary: "e",
    questions,
  };
}

test("a valid file with 6+ unique-prompt questions passes", () => {
  const questions = Array.from({ length: 6 }, (_, i) => baseQuestion({ prompt: `Question ${i}?` }));
  const result = validateBookContent(baseFile(questions));
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
});

test("missing bloom_level fails", () => {
  const q = baseQuestion({ prompt: "Q1?" });
  delete (q as Record<string, unknown>).bloom_level;
  const questions = [q, ...Array.from({ length: 5 }, (_, i) => baseQuestion({ prompt: `Q${i + 2}?` }))];
  const result = validateBookContent(baseFile(questions));
  assert.equal(result.valid, false);
});

test("malformed correctOrder (not a permutation) fails", () => {
  const bad = {
    type: "ordering",
    bloom_level: "Understand",
    prompt: "Order these",
    content: { items: ["a", "b", "c"], correctOrder: [0, 1, 1] },
    explanation: "x",
  };
  const questions = [bad, ...Array.from({ length: 5 }, (_, i) => baseQuestion({ prompt: `Q${i}?` }))];
  const result = validateBookContent(baseFile(questions));
  assert.equal(result.valid, false);
});

test("duplicate prompts within the same book+language fail", () => {
  const questions = [
    baseQuestion({ prompt: "Same question?" }),
    baseQuestion({ prompt: "Same question?" }),
    ...Array.from({ length: 4 }, (_, i) => baseQuestion({ prompt: `Unique ${i}?` })),
  ];
  const result = validateBookContent(baseFile(questions));
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.includes("duplicate prompt")));
});

test("fewer than 6 questions warns but does not fail (small real-world content banks are allowed)", () => {
  const questions = Array.from({ length: 3 }, (_, i) => baseQuestion({ prompt: `Q${i}?` }));
  const result = validateBookContent(baseFile(questions));
  assert.equal(result.valid, true);
  assert.ok(result.warnings.some((w) => w.includes("question(s)")));
});
