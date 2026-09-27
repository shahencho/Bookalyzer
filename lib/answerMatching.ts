/**
 * Typed-answer matching that tolerates grammatical forms of the same word
 * in Armenian, Russian and English (articles, plurals, case endings).
 * It does NOT handle synonyms — those belong in the question's `altAnswers`
 * (see docs/answer-variants-guide.md).
 *
 * Language is detected per word from its script, so callers never pass one.
 */

// Stripping never leaves a stem shorter than this, so short words
// (e.g. ru "дом", hy "տեր") are only ever matched as-is.
const MIN_STEM = 3;

// Armenian: plural + article combos first, then bare plural, then
// article/possessive (-ը / -ն definite, -ս / -դ possessive).
const HY_SUFFIXES = ["ները", "ներն", "ներս", "ներդ", "երը", "երն", "երս", "երդ", "ներ", "եր", "ը", "ն", "ս", "դ"];

// Russian noun/adjective case endings, longest first so "учеником" strips
// "ом", not "м".
const RU_ENDINGS = [
  "ами", "ями", "ого", "его", "ому", "ему", "ыми", "ими",
  "ой", "ей", "ою", "ею", "ом", "ем", "ах", "ях", "ов", "ев",
  "ую", "юю", "ая", "яя", "ое", "ее", "ые", "ие", "ых", "их", "ым", "им", "ью",
  "а", "я", "о", "е", "у", "ю", "ы", "и", "ь",
];

const EN_ARTICLES = new Set(["a", "an", "the"]);

// Punctuation stripped from word edges; Armenian ՞ ՛ ՜ sit inside words and
// are removed everywhere.
const EDGE_PUNCT = /^[\s.,!?;:։՝«»"'“”‘’()\-–—…]+|[\s.,!?;:։՝«»"'“”‘’()\-–—…]+$/g;
const HY_INNER_MARKS = /[՞՛՜]/g;

export function normalizeAnswer(s: unknown): string {
  return String(s ?? "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(HY_INNER_MARKS, "")
    .split(/\s+/)
    .map((w) => w.replace(EDGE_PUNCT, ""))
    .filter(Boolean)
    .join(" ");
}

function stripSuffixes(word: string, suffixes: string[], firstOnly: boolean): string[] {
  const out: string[] = [];
  for (const suf of suffixes) {
    if (word.endsWith(suf) && word.length - suf.length >= MIN_STEM) {
      out.push(word.slice(0, -suf.length));
      if (firstOnly) break;
    }
  }
  return out;
}

/** All forms of one normalized word that should count as "the same word". */
export function wordVariants(word: string): Set<string> {
  const variants = new Set([word]);

  if (/[Ա-֏]/.test(word)) {
    for (const v of stripSuffixes(word, HY_SUFFIXES, false)) variants.add(v);
  } else if (/[Ѐ-ӿ]/.test(word)) {
    for (const v of stripSuffixes(word, RU_ENDINGS, true)) variants.add(v);
  } else if (/[a-z]/.test(word)) {
    const base = word.replace(/['’]s$/, "");
    variants.add(base);
    if (base.endsWith("ies") && base.length - 3 >= MIN_STEM) variants.add(base.slice(0, -3) + "y");
    if (base.endsWith("es") && base.length - 2 >= MIN_STEM) variants.add(base.slice(0, -2));
    if (base.endsWith("s") && !base.endsWith("ss") && base.length - 1 >= MIN_STEM) variants.add(base.slice(0, -1));
  }

  return variants;
}

function toWords(s: unknown): string[] {
  const words = normalizeAnswer(s).split(" ").filter(Boolean);
  if (words.length > 1 && EN_ARTICLES.has(words[0])) words.shift();
  return words;
}

/** True when two normalized words are the same word up to grammatical form. */
function sameWord(a: string, b: string): boolean {
  const bv = wordVariants(b);
  for (const v of wordVariants(a)) if (bv.has(v)) return true;
  return false;
}

/**
 * True when `given` is the same answer as `expected` up to case, spacing,
 * punctuation and grammatical word form. Word counts must match, and each
 * word pair must share at least one variant.
 */
export function answersMatch(given: unknown, expected: unknown): boolean {
  const g = toWords(given);
  const e = toWords(expected);
  if (g.length === 0 || g.length !== e.length) return false;
  return g.every((gw, i) => sameWord(gw, e[i]));
}

/**
 * True when `answer` mentions `keyword` as a whole word — or, for a
 * multi-word keyword, as a run of consecutive whole words — tolerating
 * grammatical forms on both sides. Used by open-question keyword scoring so
 * a keyword is not "found" inside an unrelated longer word (hy "ընկեր" in
 * "ընկերներիս", en "art" in "start").
 */
export function answerMentions(answer: unknown, keyword: unknown): boolean {
  const words = normalizeAnswer(answer).split(" ").filter(Boolean);
  const kw = normalizeAnswer(keyword).split(" ").filter(Boolean);
  if (kw.length === 0 || words.length < kw.length) return false;
  for (let i = 0; i + kw.length <= words.length; i++) {
    if (kw.every((k, j) => sameWord(words[i + j], k))) return true;
  }
  return false;
}
