import { test } from "node:test";
import assert from "node:assert/strict";
import { scrambleOrderingContent } from "./scrambleOrdering";

const original = { items: ["a", "b", "c", "d"], correctOrder: [0, 1, 2, 3] };

test("stored item order is never the correct order", () => {
  for (let i = 0; i < 200; i++) {
    const out = scrambleOrderingContent(original, `prompt ${i}`);
    assert.notDeepEqual(out.items, ["a", "b", "c", "d"]);
    assert.notDeepEqual(out.correctOrder, [0, 1, 2, 3]);
  }
});

test("correctOrder still resolves to the original sequence", () => {
  const out = scrambleOrderingContent(original, "seed");
  assert.deepEqual(out.correctOrder.map((i) => out.items[i]), ["a", "b", "c", "d"]);
});

test("idempotent across re-imports of scrambled output", () => {
  const once = scrambleOrderingContent(original, "seed");
  const twice = scrambleOrderingContent(once, "seed");
  assert.deepEqual(twice, once);
});

test("two-item questions get swapped", () => {
  const out = scrambleOrderingContent({ items: ["x", "y"], correctOrder: [0, 1] }, "k");
  assert.deepEqual(out, { items: ["y", "x"], correctOrder: [1, 0] });
});
