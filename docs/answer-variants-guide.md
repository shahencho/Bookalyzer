# Fill-in-the-blank answer variants — authoring guide

How to write `answer` / `altAnswers` for `fillblank` questions so that children
who know the answer get credit, in all three languages. Gikor is the worked
example; the other books should be brought to the same standard using the
checklist at the end.

## How grading works

A child's typed answer scores 1 if it matches `answer` or any of `altAnswers`,
otherwise 0. No LLM is involved for fillblank (only open questions use one).

Matching ([lib/answerMatching.ts](../lib/answerMatching.ts)) already ignores:

| Handled by code | Examples |
|---|---|
| Case, extra spaces, edge punctuation, quotes, `ё`/`е`, Armenian `՞ ՛ ՜` | `Apprentice.` = `apprentice` |
| **hy** article / possessive `-ը -ն -ս -դ` | `աշակերտը` = `աշակերտ`, `գյուղս` = `գյուղը` |
| **hy** plural `-ներ -եր` (+ article) | `աշակերտները` = `աշակերտ` |
| **ru** noun/adjective case endings | `ученик` = `учеником` = `ученика`, `деревне` = `деревню` |
| **en** leading `a/an/the`, plural `-s/-es/-ies`, possessive `'s` | `an apprentice` = `apprentice`, `villages` = `village` |

Stems must keep at least 3 letters, so short words are only matched exactly.
Multi-word answers must have the same number of words.

**So you do not need to list grammatical forms.** Spend `altAnswers` on
**different words with the same meaning**.

## What to add

Principle: *accept anything a teacher would accept as the same meaning in
this blank.* Add synonyms, not paraphrases or loosely related ideas.

- **Synonyms** a child might use: `apprentice` → `servant`, `helper`, `shop boy`.
- **The original text's own word**, if the question was written in modern
  language: hy `աշակերտ` → `շագիրդ` (Tumanyan's wording).
- **Common short/long versions**: `village` ↔ `home village`.
- **Near-meaning answers that fit the story**: `village` → `home`.

Do not add: wrong-but-related answers (`city` for `village`), whole
sentences, spelling mistakes (keep lists clean — typo tolerance is a separate
decision).

## Per-language notes

**Armenian (hy)**
- Write the base form (`աշակերտ`), not the article form; the code covers `-ը/-ն`.
- Include dialect or older words children meet in the original text
  (`շագիրդ`, `դուքան`).
- Case forms other than article/plural (`-ի`, `-ից`, `-ում`, `-ով`) are **not**
  handled — if the blank needs one, list both it and the base form.

**Russian (ru)**
- Write the form the blank requires grammatically (`работает ___` →
  `учеником`); nominative and other case forms match automatically.
- Synonyms of a different gender or stem must be listed (`слугой`,
  `подмастерьем`, `помощником`).
- Verbs are not stemmed — list verb forms explicitly if the blank is a verb.

**English (en)**
- Articles and plurals are handled. Possessive pronouns are not
  (`his village` ≠ `village`), which is fine when the prompt already has them.
- List British/American variants if both are plausible (`colour`/`color`).

## Worked example — Gikor

| Lang | Blank | answer | altAnswers |
|---|---|---|---|
| hy | …խանութի ___։ | `աշակերտ` | `փոքրիկ աշակերտ`, `շագիրդ`, `ծառա`, `սպասավոր`, `փոքրիկ ծառա` |
| hy | …վերադառնալ իր ___ | `գյուղը` | `գյուղ`, `հայրենի գյուղ`, `տուն`, `հայրենի տուն` |
| ru | работает ___ в лавке | `учеником` | `учеником в лавке`, `слугой`, `подмастерьем`, `помощником`, `мальчиком на побегушках` |
| ru | вернуться в свою ___ | `деревню` | `деревня`, `родную деревню`, `дом`, `село`, `родное село` |
| en | works as an ___ | `apprentice` | `apprentice boy`, `shop apprentice`, `servant`, `shop boy`, `errand boy`, `helper`, `assistant`, `worker` |
| en | returning to his ___ | `village` | `home village`, `village home`, `home`, `hometown`, `family` |

## Rollout checklist (other books)

There are ~288 fillblank questions across 159 files. Per book:

1. Open all three language files side by side (`<slug>.hy/.ru/.en.json`).
2. For each fillblank: read the prompt, list 2–6 synonyms per language using
   the rules above. Keep the three languages consistent in meaning.
3. Remove now-redundant grammatical variants only if you want to tidy up —
   they are harmless.
4. Import (it validates each file first):
   `npm run import-content content/books/<slug>.hy.json content/books/<slug>.ru.json content/books/<slug>.en.json`
   — the importer updates questions in place by prompt text; don't change
   the prompt wording or the question is archived and recreated.
5. Spot-check a few answers in the app, then tick the book off in
   [deployment/NEW_BOOKS_BACKLOG.md](deployment/NEW_BOOKS_BACKLOG.md) or a
   tracking list.
