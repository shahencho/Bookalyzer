/**
 * Runs sample open-question answers through the same pipeline the submit
 * route uses (every answer goes to DeepSeek) and prints DeepSeek's score and
 * reasoning next to the expected score. The keyword score is shown alongside
 * for comparison only. No database needed — questions are read from
 * content/books/*.json.
 *
 *   npm run eval-open-grading                      # default fixtures
 *   npm run eval-open-grading -- path/to/cases.json
 *
 * Needs DEEPSEEK_API_KEY (and optionally DEEPSEEK_MODEL) in .env.
 */
import fs from "node:fs";
import path from "node:path";
import { gradeQuestion } from "../lib/grading";
import { gradeOpenWithLlm } from "../lib/llmGrading";

interface Case {
  book: string;
  lang: "hy" | "ru" | "en";
  openIndex: number; // nth open question in the book file (0-based)
  expected: 0 | 0.5 | 1;
  note?: string;
  answer: string;
}

interface BookFile {
  title: string;
  author: string;
  extended_summary: string;
  questions: { type: string; bloom_level: string; prompt: string; content: { keywords?: string[] }; explanation: string }[];
}

try {
  process.loadEnvFile(".env");
} catch {
  // no .env — rely on the real environment
}

async function main() {
  if (!process.env.DEEPSEEK_API_KEY) {
    console.error("DEEPSEEK_API_KEY is not set (add it to .env).");
    process.exit(1);
  }

  const casesPath = process.argv[2] ?? "scripts/fixtures/open-grading-cases.json";
  const cases: Case[] = JSON.parse(fs.readFileSync(casesPath, "utf-8"));
  const books = new Map<string, BookFile>();

  console.log(`Model: ${process.env.DEEPSEEK_MODEL || "deepseek-chat"} · ${cases.length} cases\n`);

  let agree = 0;
  for (const [i, c] of cases.entries()) {
    const file = path.join("content/books", `${c.book}.${c.lang}.json`);
    if (!books.has(file)) books.set(file, JSON.parse(fs.readFileSync(file, "utf-8")));
    const book = books.get(file)!;
    const q = book.questions.filter((x) => x.type === "open")[c.openIndex];
    if (!q) throw new Error(`${file} has no open question #${c.openIndex}`);

    const keywordScore = gradeQuestion("open", { keywords: q.content.keywords ?? [] }, c.answer);
    const started = Date.now();
    const llm = await gradeOpenWithLlm({
      language: c.lang,
      bookTitle: book.title,
      bookAuthor: book.author,
      bookSummary: book.extended_summary,
      prompt: q.prompt,
      bloomLevel: q.bloom_level,
      explanation: q.explanation,
      keywords: q.content.keywords ?? [],
      answer: c.answer,
    });
    const method = llm ? `LLM ${Date.now() - started}ms` : "LLM_FAILED";
    const finalScore = llm ? llm.score : keywordScore;
    const reasoning = llm ? llm.reasoning : "";

    const ok = finalScore === c.expected;
    if (ok) agree++;
    console.log(`${ok ? "✓" : "✗"} #${i + 1} [${c.lang}] Q${c.openIndex} ${c.note ?? ""}`);
    console.log(`   answer:    ${c.answer}`);
    console.log(`   expected:  ${c.expected}   got: ${finalScore}   (${method}, keyword said ${keywordScore})`);
    if (reasoning) console.log(`   reasoning: ${reasoning}`);
    console.log();
  }

  console.log(`Agreement: ${agree}/${cases.length} (${Math.round((agree / cases.length) * 100)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
