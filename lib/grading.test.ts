import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeQuestion } from "./grading";

test("mc: all-or-nothing", () => {
  const content = { options: ["a", "b"], correct: 1 };
  assert.equal(gradeQuestion("mc", content, 1), 1);
  assert.equal(gradeQuestion("mc", content, 0), 0);
});

test("fillblank: matches answer or alt answers, case/whitespace insensitive", () => {
  const content = { answer: "eye", altAnswers: ["eyes"] };
  assert.equal(gradeQuestion("fillblank", content, " Eye "), 1);
  assert.equal(gradeQuestion("fillblank", content, "eyes"), 1);
  assert.equal(gradeQuestion("fillblank", content, "ear"), 0);
});

test("ordering: partial credit per correctly placed item", () => {
  const content = { items: ["a", "b", "c", "d"], correctOrder: [0, 1, 2, 3] };
  assert.equal(gradeQuestion("ordering", content, [0, 1, 2, 3]), 1);
  assert.equal(gradeQuestion("ordering", content, [0, 1, 3, 2]), 0.5);
  assert.equal(gradeQuestion("ordering", content, [3, 2, 1, 0]), 0);
});

test("ranking uses the same grading as ordering", () => {
  const content = { items: ["a", "b"], correctOrder: [1, 0] };
  assert.equal(gradeQuestion("ranking", content, [1, 0]), 1);
  assert.equal(gradeQuestion("ranking", content, [0, 1]), 0);
});

test("matching: partial credit per correct pair", () => {
  const content = { left: ["a", "b"], right: ["x", "y"], correctMap: { "0": 0, "1": 1 } };
  assert.equal(gradeQuestion("matching", content, { "0": 0, "1": 1 }), 1);
  assert.equal(gradeQuestion("matching", content, { "0": 0, "1": 0 }), 0.5);
});

test("classification: partial credit per correct group", () => {
  const content = {
    groupA: "A",
    groupB: "B",
    options: [
      { label: "x", group: "A" as const },
      { label: "y", group: "B" as const },
    ],
  };
  assert.equal(gradeQuestion("classification", content, { "0": "A", "1": "B" }), 1);
  assert.equal(gradeQuestion("classification", content, { "0": "A", "1": "A" }), 0.5);
});

test("open: keyword substring match, all-or-nothing", () => {
  const content = { keywords: ["friend", "bond"] };
  assert.equal(gradeQuestion("open", content, "we became close friends"), 1);
  assert.equal(gradeQuestion("open", content, "nothing relevant here"), 0);
});

test("crossword: partial credit per correctly filled word, case-insensitive", () => {
  const content = {
    gridSize: { rows: 3, cols: 3 },
    words: [
      { answer: "FOX", clue: "", row: 0, col: 0, direction: "across" as const },
      { answer: "ROSE", clue: "", row: 1, col: 0, direction: "across" as const },
    ],
  };
  assert.equal(gradeQuestion("crossword", content, { "0": "fox", "1": "ROSE" }), 1);
  assert.equal(gradeQuestion("crossword", content, { "0": "fox", "1": "wrong" }), 0.5);
});

test("undefined/null answer always scores 0", () => {
  assert.equal(gradeQuestion("mc", { options: ["a"], correct: 0 }, undefined), 0);
  assert.equal(gradeQuestion("mc", { options: ["a"], correct: 0 }, null), 0);
});
