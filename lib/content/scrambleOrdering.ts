import type { OrderingContent } from "@/lib/grading";

// FNV-1a — a tiny stable string hash, used only to seed the shuffle below.
export function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// mulberry32 — small seeded PRNG so the scramble is reproducible.
export function rng(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The client renders ordering/ranking items in their stored order, and
 * content authors almost always write them in the correct order — which
 * hands the child the answer. This re-stores the items in a scrambled
 * order (never the correct one) and remaps `correctOrder` to match.
 *
 * Idempotent: items are first put back into correct order, then shuffled
 * with a seed derived from the prompt, so re-importing a file (including
 * an already-scrambled admin download) always yields the same result.
 */
export function scrambleOrderingContent(content: OrderingContent, seedKey: string): OrderingContent {
  const { items, correctOrder } = content;
  const n = items.length;
  if (n < 2 || correctOrder.length !== n) return content;

  const canonical = correctOrder.map((idx) => items[idx]);

  const random = rng(hashString(seedKey));
  // perm[newIdx] = canonical position of the item stored at newIdx.
  const perm = canonical.map((_, i) => i);
  do {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
  } while (perm.every((v, i) => v === i));

  const newItems = perm.map((p) => canonical[p]);
  const newCorrectOrder = new Array<number>(n);
  perm.forEach((p, newIdx) => {
    newCorrectOrder[p] = newIdx;
  });

  return { ...content, items: newItems, correctOrder: newCorrectOrder };
}
