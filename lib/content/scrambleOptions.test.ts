import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  scrambleClassificationContent,
  scrambleMatchingContent,
  scrambleMcContent,
  scrambleQuestionContent,
} from "./scrambleOptions";

const mc = { options: ["right", "wrong 1", "wrong 2", "wrong 3"], correct: 0 };

test("mc: correct index still points at the correct option", () => {
  for (let i = 0; i < 100; i++) {
    const out = scrambleMcContent(mc, `prompt ${i}`);
    assert.equal(out.options[out.correct], "right");
    assert.deepEqual([...out.options].sort(), [...mc.options].sort());
  }
});

test("mc: correct position is spread across all slots", () => {
  const seen = new Set<number>();
  for (let i = 0; i < 100; i++) seen.add(scrambleMcContent(mc, `prompt ${i}`).correct);
  assert.deepEqual([...seen].sort(), [0, 1, 2, 3]);
});

test("mc: idempotent, and independent of the input order", () => {
  const once = scrambleMcContent(mc, "seed");
  assert.deepEqual(scrambleMcContent(once, "seed"), once);
  const reordered = { options: ["wrong 3", "wrong 1", "right", "wrong 2"], correct: 2 };
  assert.deepEqual(scrambleMcContent(reordered, "seed"), once);
});

const matching = {
  left: ["King", "Fox", "Rose", "Pilot"],
  right: ["orders", "taming", "thorns", "plane"],
  correctMap: { "0": 0, "1": 1, "2": 2, "3": 3 },
};

test("matching: every row still maps to its own answer, never all on the diagonal", () => {
  for (let i = 0; i < 100; i++) {
    const out = scrambleMatchingContent(matching, `prompt ${i}`);
    assert.deepEqual(out.left, matching.left);
    matching.left.forEach((_, row) => {
      assert.equal(out.right[out.correctMap[String(row)]], matching.right[row]);
    });
    assert.ok(matching.left.some((_, row) => out.correctMap[String(row)] !== row));
  }
});

test("matching: idempotent across re-imports", () => {
  const once = scrambleMatchingContent(matching, "seed");
  assert.deepEqual(scrambleMatchingContent(once, "seed"), once);
});

const classification = {
  groupA: "Home",
  groupB: "Earth",
  options: [
    { label: "a1", group: "A" as const },
    { label: "a2", group: "A" as const },
    { label: "b1", group: "B" as const },
    { label: "b2", group: "B" as const },
  ],
};

test("classification: same labels and groups, never all-A-then-all-B", () => {
  for (let i = 0; i < 100; i++) {
    const out = scrambleClassificationContent(classification, `prompt ${i}`);
    assert.deepEqual(
      [...out.options].sort((x, y) => x.label.localeCompare(y.label)),
      classification.options
    );
    const groups = out.options.map((o) => o.group).join("");
    assert.ok(groups !== "AABB" && groups !== "BBAA", groups);
  }
});

test("classification: idempotent across re-imports", () => {
  const once = scrambleClassificationContent(classification, "seed");
  assert.deepEqual(scrambleClassificationContent(once, "seed"), once);
});

test("other types pass through untouched", () => {
  const fill = { answer: "eye", altAnswers: ["eyes"] };
  assert.equal(scrambleQuestionContent("fillblank", fill, "k"), fill);
});

test("every content file keeps its answer keys after scrambling", () => {
  const dir = path.join(process.cwd(), "content", "books");
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const book = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
    for (const q of book.questions) {
      const key = q.prompt.trim().toLowerCase();
      const out = scrambleQuestionContent(q.type, q.content, key) as never;
      const where = `${file}: ${q.prompt}`;
      if (q.type === "mc") {
        const c = out as { options: string[]; correct: number };
        assert.equal(c.options[c.correct], q.content.options[q.content.correct], where);
      } else if (q.type === "matching") {
        const c = out as { right: string[]; correctMap: Record<string, number> };
        q.content.left.forEach((_: string, row: number) => {
          assert.equal(c.right[c.correctMap[row]], q.content.right[q.content.correctMap[row]], where);
        });
      } else if (q.type === "classification") {
        const c = out as { options: { label: string; group: string }[] };
        for (const o of q.content.options) {
          assert.ok(c.options.some((x) => x.label === o.label && x.group === o.group), where);
        }
      }
    }
  }
});
