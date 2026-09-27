/**
 * Mechanical quality checks for a book's question banks — the things a
 * script can catch so the human/AI review can focus on meaning.
 * See docs/question-banks/README.md.
 *
 *   npx tsx scripts/check-question-bank.ts the-little-prince
 *   npx tsx scripts/check-question-bank.ts docs/question-banks/the-little-prince.en.proposed.json
 *
 * A slug checks all three languages in content/books/; a path checks that file.
 * Exits 1 if any ERROR is found (WARNs are advisory).
 */
import fs from "node:fs";
import path from "node:path";
import { validateBookContent } from "../lib/content/validateBookContent";

// The checker walks every question shape in the schema, so `content` is
// deliberately untyped here — validateBookContent has already vetted it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Q = { type: string; bloom_level: string; prompt: string; content: any; explanation?: string };
type Finding = { level: "ERROR" | "WARN"; where: string; msg: string };

const MIN_KEYWORD_LEN = 5;

function checkFile(file: string): Finding[] {
  const out: Finding[] = [];
  const raw = JSON.parse(fs.readFileSync(file, "utf8"));
  const v = validateBookContent(raw);
  for (const e of v.errors ?? []) out.push({ level: "ERROR", where: "schema", msg: e });

  const qs: Q[] = raw.questions ?? [];
  if (qs.length < 10 || qs.length > 15) out.push({ level: "WARN", where: "bank", msg: `${qs.length} questions (target 10-15)` });

  qs.forEach((q, i) => {
    const where = `q${i + 1} ${q.type}/${q.bloom_level}`;
    const prompt = q.prompt.toLowerCase();
    if (!q.explanation || q.explanation.trim().length < 40)
      out.push({ level: "WARN", where, msg: "explanation missing or very short — it is shown to the child and used by the LLM grader" });

    if (q.type === "mc") {
      const lens: number[] = q.content.options.map((o: string) => o.length);
      const max = Math.max(...lens);
      const c = q.content.correct;
      if (lens[c] === max && lens.filter((l) => l === max).length === 1 && max > 1.3 * Math.min(...lens))
        out.push({ level: "WARN", where, msg: `correct option is clearly the longest (${lens.join("/")} chars)` });
    }

    if (q.type === "open") {
      // Every open answer now goes to the LLM (keywords are only hints in the
      // prompt, plus the fallback score used when the LLM is unavailable), so
      // a weak keyword is no longer a scoring exploit — hence WARN, not ERROR.
      const kws: string[] = q.content.keywords ?? [];
      for (const k of kws) {
        const kl = k.toLowerCase();
        if (prompt.includes(kl))
          out.push({ level: "WARN", where, msg: `keyword "${k}" repeats the prompt — it adds no evidence, and scores 1 in LLM-down fallback for copying the question` });
        else if (!kl.includes(" ") && kl.length < MIN_KEYWORD_LEN)
          out.push({ level: "WARN", where, msg: `keyword "${k}" is short and weak evidence — prefer a rare word or phrase` });
      }
    }

    if (q.type === "crossword") {
      const words = q.content.words as { answer: string; row: number; col: number; direction: string }[];
      const cells = new Map<string, string>();
      const owned = words.map((w) => {
        const keys: string[] = [];
        for (let k = 0; k < w.answer.length; k++) {
          const r = w.row + (w.direction === "down" ? k : 0);
          const c = w.col + (w.direction === "across" ? k : 0);
          const key = `${r},${c}`;
          const prev = cells.get(key);
          if (prev && prev !== w.answer[k].toUpperCase())
            out.push({ level: "ERROR", where, msg: `letter clash at ${key} (${w.answer})` });
          cells.set(key, w.answer[k].toUpperCase());
          keys.push(key);
        }
        return keys;
      });
      const seen = new Set([0]);
      const stack = [0];
      while (stack.length) {
        const a = stack.pop()!;
        words.forEach((_, b) => {
          if (!seen.has(b) && owned[a].some((k) => owned[b].includes(k))) {
            seen.add(b);
            stack.push(b);
          }
        });
      }
      if (seen.size < words.length)
        out.push({ level: "ERROR", where, msg: `${words.length - seen.size} word(s) do not cross the rest of the grid` });
      if (words.length < 5) out.push({ level: "WARN", where, msg: `only ${words.length} words (aim for 5-7)` });
    }

    if (q.type === "classification") {
      const counts = { A: 0, B: 0 } as Record<string, number>;
      for (const o of q.content.options) counts[o.group]++;
      if (!counts.A || !counts.B) out.push({ level: "ERROR", where, msg: "one group is empty" });
    }
  });

  const bloom = new Map<string, number>();
  const types = new Map<string, number>();
  qs.forEach((q) => {
    bloom.set(q.bloom_level, (bloom.get(q.bloom_level) ?? 0) + 1);
    types.set(q.type, (types.get(q.type) ?? 0) + 1);
  });
  const lowOrder = (bloom.get("Remember") ?? 0) + (bloom.get("Understand") ?? 0);
  if (qs.length && lowOrder / qs.length > 0.6)
    out.push({ level: "WARN", where: "bank", msg: `${lowOrder}/${qs.length} questions are Remember/Understand` });
  console.log(`  types: ${[...types].map(([k, n]) => `${k}×${n}`).join(" ")}`);
  console.log(`  bloom: ${[...bloom].map(([k, n]) => `${k}×${n}`).join(" ")}`);
  return out;
}

function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("usage: npx tsx scripts/check-question-bank.ts <slug | file.json>");
    process.exit(2);
  }
  const files = arg.endsWith(".json")
    ? [arg]
    : ["hy", "ru", "en"].map((l) => path.join("content", "books", `${arg}.${l}.json`)).filter((f) => fs.existsSync(f));
  if (files.length === 0) {
    console.error(`no files found for "${arg}"`);
    process.exit(2);
  }

  let errors = 0;
  const shapes: string[] = [];
  for (const f of files) {
    console.log(`\n${f}`);
    const findings = checkFile(f);
    for (const x of findings) console.log(`  ${x.level.padEnd(5)} ${x.where}: ${x.msg}`);
    if (findings.length === 0) console.log("  no findings");
    errors += findings.filter((x) => x.level === "ERROR").length;
    const qs: Q[] = JSON.parse(fs.readFileSync(f, "utf8")).questions ?? [];
    shapes.push(qs.map((q) => `${q.type}/${q.bloom_level}`).join(","));
  }
  if (files.length > 1 && new Set(shapes).size > 1)
    console.log("\nWARN  languages differ in question count/type/bloom order — they should be the same bank in translation");

  process.exit(errors > 0 ? 1 : 0);
}

main();
