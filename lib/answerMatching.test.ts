import { test } from "node:test";
import assert from "node:assert/strict";
import { answerMentions, answersMatch, normalizeAnswer } from "./answerMatching";

test("normalize: case, spacing, edge punctuation, ё, Armenian inner marks", () => {
  assert.equal(normalizeAnswer("  Apprentice.  "), "apprentice");
  assert.equal(normalizeAnswer("«գյուղը»։"), "գյուղը");
  assert.equal(normalizeAnswer("ЕЁ  дом"), "ее дом");
  assert.equal(normalizeAnswer("գյո՞ւղը"), "գյուղը");
});

test("hy: definite article -ը / -ն in either direction", () => {
  assert.ok(answersMatch("աշակերտը", "աշակերտ"));
  assert.ok(answersMatch("աշակերտ", "աշակերտը"));
  assert.ok(answersMatch("գյուղ", "գյուղը"));
  assert.ok(answersMatch("տունը", "տուն"));
  assert.ok(answersMatch("տղան", "տղա"));
});

test("hy: possessive and plural forms", () => {
  assert.ok(answersMatch("գյուղս", "գյուղը"));
  assert.ok(answersMatch("աշակերտները", "աշակերտ"));
  assert.ok(answersMatch("գյուղերը", "գյուղ"));
});

test("hy: different words still fail", () => {
  assert.ok(!answersMatch("ծառա", "աշակերտ"));
  assert.ok(!answersMatch("քաղաքը", "գյուղը"));
});

test("ru: case endings of the same noun/adjective", () => {
  assert.ok(answersMatch("ученик", "учеником"));
  assert.ok(answersMatch("ученика", "учеником"));
  assert.ok(answersMatch("деревня", "деревню"));
  assert.ok(answersMatch("деревне", "деревню"));
  assert.ok(answersMatch("слуга", "слугой"));
  assert.ok(answersMatch("родная деревня", "родную деревню"));
});

test("ru: short words and different words are not collapsed", () => {
  assert.ok(!answersMatch("дочь", "дом"));
  assert.ok(!answersMatch("город", "деревню"));
  assert.ok(!answersMatch("слуга", "учеником"));
});

test("en: leading article, plurals, possessive", () => {
  assert.ok(answersMatch("an apprentice", "apprentice"));
  assert.ok(answersMatch("the village", "village"));
  assert.ok(answersMatch("villages", "village"));
  assert.ok(answersMatch("boxes", "box"));
  assert.ok(answersMatch("stories", "story"));
  assert.ok(answersMatch("merchant's", "merchant"));
});

test("en: different words, and word count must match", () => {
  assert.ok(!answersMatch("city", "village"));
  assert.ok(!answersMatch("glass", "glas"));
  assert.ok(!answersMatch("apprentice boy", "apprentice"));
  assert.ok(!answersMatch("", "apprentice"));
});

test("answerMentions: whole words only, but tolerates word forms", () => {
  // the keyword is really there, in some grammatical form
  assert.ok(answerMentions("Из-за бедности, нечем было кормить семью", "бедность"));
  assert.ok(answerMentions("Հայրը աղքատ էր", "աղքատ"));
  assert.ok(answerMentions("They were very poor villages", "village"));
  assert.ok(answerMentions("он получил письмо из дома", "письмо"));
  // multi-word keyword as consecutive words
  assert.ok(answerMentions("он стал мальчиком на побегушках в лавке", "мальчиком на побегушках"));

  // keyword only as a fragment of an unrelated longer word
  assert.ok(!answerMentions("Ես սիրում եմ խաղալ ընկերներիս հետ", "ընկեր"));
  assert.ok(!answerMentions("I want to start now", "art"));
  assert.ok(!answerMentions("он домашний мальчик", "дом"));
  assert.ok(!answerMentions("", "семья"));
});
