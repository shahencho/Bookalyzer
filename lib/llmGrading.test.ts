import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeOpenWithLlm, parseLlmGrade, type OpenGradingInput } from "./llmGrading";

const input: OpenGradingInput = {
  language: "en",
  bookTitle: "Gikor",
  bookAuthor: "Hovhannes Tumanyan",
  bookSummary: "A poor father sends his son to work in the city.",
  prompt: "Why did the father send Gikor away?",
  bloomLevel: "EVALUATE",
  explanation: "Poverty forced a painful choice.",
  keywords: ["poor"],
  answer: "He wanted a better life for him",
};

function stubFetch(body: unknown, status = 200): typeof fetch {
  return (async () => new Response(JSON.stringify(body), { status })) as typeof fetch;
}

test("parseLlmGrade: accepts 0 / 0.5 / 1 with reasoning", () => {
  assert.deepEqual(parseLlmGrade('{"score": 0.5, "reasoning": "Thin."}'), { score: 0.5, reasoning: "Thin." });
  assert.deepEqual(parseLlmGrade('{"score": "1", "reasoning": "Good."}'), { score: 1, reasoning: "Good." });
});

test("parseLlmGrade: rejects bad JSON, other scores, missing reasoning", () => {
  assert.equal(parseLlmGrade("not json"), null);
  assert.equal(parseLlmGrade('{"score": 0.7, "reasoning": "x"}'), null);
  assert.equal(parseLlmGrade('{"score": 1}'), null);
  assert.equal(parseLlmGrade(undefined), null);
});

test("gradeOpenWithLlm: returns null without an API key", async () => {
  delete process.env.DEEPSEEK_API_KEY;
  assert.equal(await gradeOpenWithLlm(input, { fetchImpl: stubFetch({}) }), null);
});

test("gradeOpenWithLlm: parses a successful response", async () => {
  process.env.DEEPSEEK_API_KEY = "test";
  const fetchImpl = stubFetch({ choices: [{ message: { content: '{"score":1,"reasoning":"Matches the idea."}' } }] });
  assert.deepEqual(await gradeOpenWithLlm(input, { fetchImpl }), { score: 1, reasoning: "Matches the idea." });
});

test("gradeOpenWithLlm: HTTP error and timeout return null", async () => {
  process.env.DEEPSEEK_API_KEY = "test";
  assert.equal(await gradeOpenWithLlm(input, { fetchImpl: stubFetch({}, 500) }), null);
  // Never resolves on its own; the ref'd timer keeps the event loop alive
  // until the (unref'd) AbortSignal.timeout fires.
  const hanging = ((_: unknown, init?: RequestInit) =>
    new Promise((_, reject) => {
      const keepAlive = setTimeout(() => {}, 1000);
      init?.signal?.addEventListener("abort", () => {
        clearTimeout(keepAlive);
        reject(new Error("aborted"));
      });
    })) as typeof fetch;
  assert.equal(await gradeOpenWithLlm(input, { fetchImpl: hanging, timeoutMs: 20 }), null);
});
