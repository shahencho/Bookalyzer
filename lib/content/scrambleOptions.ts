import type { ClassificationContent, MatchingContent, McContent, OrderingContent } from "@/lib/grading";
import { hashString, rng, scrambleOrderingContent } from "./scrambleOrdering";

/**
 * Like ordering items, MC options, matching answers and classification
 * labels are rendered in their stored order — and bulk-authored content
 * almost always stores the answer first (MC) or in line with its row
 * (matching), so children can score without reading. These functions
 * re-store the choices in a seeded shuffled order and remap the key.
 *
 * Idempotent: choices are first sorted into a canonical (text) order, then
 * shuffled with a seed derived from the prompt, so re-importing a file —
 * including an already-scrambled admin download — yields the same result.
 */

const MAX_TRIES = 50;

function compareText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * perm[newIdx] = canonical index of the element stored at newIdx.
 * Draws from one seeded stream until `reject` passes (bounded, so a
 * degenerate input can never loop forever).
 */
function seededPermutation(n: number, seedKey: string, reject: (perm: number[]) => boolean): number[] {
  const random = rng(hashString(seedKey));
  const perm = Array.from({ length: n }, (_, i) => i);
  for (let tries = 0; tries < MAX_TRIES; tries++) {
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [perm[i], perm[j]] = [perm[j], perm[i]];
    }
    if (!reject(perm)) break;
  }
  return perm;
}

export function scrambleMcContent(content: McContent, seedKey: string): McContent {
  const { options, correct } = content;
  const n = options.length;
  if (n < 2 || !Number.isInteger(correct) || correct < 0 || correct >= n) return content;

  const canonical = options
    .map((text, i) => ({ text, isCorrect: i === correct }))
    .sort((a, b) => compareText(a.text, b.text) || Number(b.isCorrect) - Number(a.isCorrect));

  const perm = seededPermutation(n, seedKey, () => false);
  return {
    ...content,
    options: perm.map((p) => canonical[p].text),
    correct: perm.findIndex((p) => canonical[p].isCorrect),
  };
}

export function scrambleMatchingContent(content: MatchingContent, seedKey: string): MatchingContent {
  const { left, right, correctMap } = content;
  const n = right.length;
  if (n < 2) return content;
  const targets = left.map((_, i) => correctMap[String(i)]);
  if (targets.some((t) => !Number.isInteger(t) || t < 0 || t >= n)) return content;

  // Tie-break equal texts by the first left row pointing at them.
  const firstRow = (r: number) => {
    const i = targets.indexOf(r);
    return i === -1 ? Infinity : i;
  };
  const canonical = right
    .map((text, orig) => ({ text, orig }))
    .sort((a, b) => compareText(a.text, b.text) || firstRow(a.orig) - firstRow(b.orig));

  const newIndexOf = (perm: number[]) => {
    const out = new Array<number>(n);
    perm.forEach((p, newIdx) => {
      out[canonical[p].orig] = newIdx;
    });
    return out;
  };
  // Never leave every row answered by the option on the same line.
  const perm = seededPermutation(n, seedKey, (perm) => {
    const idx = newIndexOf(perm);
    return targets.every((t, i) => idx[t] === i);
  });

  const idx = newIndexOf(perm);
  const newMap: Record<string, number> = {};
  targets.forEach((t, i) => {
    newMap[String(i)] = idx[t];
  });
  return { ...content, right: perm.map((p) => canonical[p].text), correctMap: newMap };
}

export function scrambleClassificationContent(
  content: ClassificationContent,
  seedKey: string
): ClassificationContent {
  const { options } = content;
  const n = options.length;
  if (n < 2) return content;

  const canonical = [...options].sort(
    (a, b) => compareText(a.label, b.label) || compareText(a.group, b.group)
  );
  const hasBothGroups = new Set(options.map((o) => o.group)).size > 1;
  // Avoid "all A, then all B" (or the reverse) — that pattern is a hint.
  const isBlocked = (perm: number[]) => {
    let switches = 0;
    for (let i = 1; i < n; i++) {
      if (canonical[perm[i]].group !== canonical[perm[i - 1]].group) switches++;
    }
    return switches <= 1;
  };
  const perm = seededPermutation(n, seedKey, (perm) => hasBothGroups && n > 2 && isBlocked(perm));
  return { ...content, options: perm.map((p) => canonical[p]) };
}

/** Applies the right scramble for a question type; other types pass through. */
export function scrambleQuestionContent(type: string, content: unknown, seedKey: string): unknown {
  switch (type) {
    case "ordering":
    case "ranking":
      return scrambleOrderingContent(content as OrderingContent, seedKey);
    case "mc":
      return scrambleMcContent(content as McContent, seedKey);
    case "matching":
      return scrambleMatchingContent(content as MatchingContent, seedKey);
    case "classification":
      return scrambleClassificationContent(content as ClassificationContent, seedKey);
    default:
      return content;
  }
}
