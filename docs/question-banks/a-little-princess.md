# A Little Princess: question bank analysis

Slug: `a-little-princess` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** Edwardian boarding-school novel (1905), 19 chapters. Plain
  prose, long chapters, a slow fall and a slow rescue.
- **Readers in this app:** about 9–13. Younger readers follow the cruelty and
  the magic; older ones can argue about Sara's choices.
- **Author's aim:** to test a child's character by taking everything away from
  her — and to show that what adults call "a little princess" is behaviour,
  not rank or money.
- **Big ideas:**
  - **A:** dignity is something you decide, not something your circumstances
    grant you.
  - **B:** imagination is not escape; it is how Sara keeps command of her own
    behaviour.
  - **C:** kindness counts most when it costs you something you need.
  - **D:** adult respect follows money (Miss Minchin), and that is the book's
    quiet indictment.
- **What children love about it:** the silent "you are talking to a princess"
  speech, Melchisedec the rat, the buns, the attic transformed overnight, the
  monkey coming through the skylight.
- **Cultural context:** none required, but the Russian and Armenian editions
  are widely read; names were kept as the existing translations had them
  (Сара Кру / Սառա Քրու, мисс Минчин / միս Մինչին).

**Key scenes:**

| # | Scene | Big idea |
|---|---|---|
| S1 | Ch 2 — Monsieur Dufarge: "She has not LEARNED French; she is French" | D |
| S2 | Ch 4 — Lottie, aged four; Sara becomes her "mamma" | C |
| S3 | Ch 5 — Becky found asleep by the fire | C |
| S4 | Ch 7 — the eleventh birthday, the Last Doll, the news | D |
| S5 | Ch 8 — stripped of everything, moved to the attic | A |
| S6 | Ch 9 — Melchisedec takes crumbs from her hand | C |
| S7 | Ch 12 — a boy of the Large Family gives her his sixpence | A |
| S8 | Ch 13 — the fourpenny piece, six buns, five given away | C |
| S9 | Ch 15 — the attic transformed while she sleeps | B |
| S10 | The silent princess speech during Miss Minchin's scoldings | A, B |
| S11 | Ch 19 — Anne, and Sara's arrangement for hungry children | C |

**Unsure / VERIFY:** none. Every key was checked against the Project Gutenberg
text (ebook 146). Two traps checked explicitly: Sara pays for **four** buns and
receives **six** (two thrown in "for makeweight"), giving away **five**; and the
Large Family boy is called Guy Clarence *by Sara* — his real name is Donald, so
no question hangs on that name.

## 2. Audit of the current bank

Checker output before the rewrite (13 questions per language):

```
en: 3× correct option is clearly the longest (q2, q3, q5)
    7× open keyword repeats the prompt (q9 kindness/wealth/princess, q12 imagination/comfort/attic/picture)
    bank: 9/13 questions are Remember/Understand
ru/hy: the same bank, same findings (доброта/богатство/уют, բարություն/հարստություն…)
```

| # | Type / Bloom | Verdict | Reason |
|---|---|---|---|
| 1 | mc/Remember — doll's name | Replace | Emily is named in the extended summary |
| 2 | mc/Remember — what changes Sara's life | Replace | First line of the short summary |
| 3 | mc/Understand — how Miss Minchin's treatment changes | Replace | Short summary, and the correct option was longest by 35 chars |
| 4 | fillblank — "act like a ___ inside" | Replace | Answer is in the short summary and in the book's title |
| 5 | mc/Understand — who is Becky | Replace | Extended summary |
| 6 | ordering — four events | Replace | All four are summary sentences, in summary order |
| 7 | matching — 4 characters to roles | Replace | Roles paraphrase the summary; keyword echo ("mysterious neighbor") |
| 8 | classification — kind vs harsh to Sara | Replace | Moral sorting, and Lavinia never appears elsewhere in the bank |
| 9 | open/Evaluate — kindness vs wealth | Replace | 3 of 7 keywords repeat the prompt; question is answerable without the book |
| 10 | mc/Remember — who searched for Sara | Replace | Extended summary; correct option longest (52 vs 12) |
| 11 | classification — before/after father's death | Fix → kept the idea, replaced all items with reader-only ones |
| 12 | open/Create — imagine a plain room | Fix → re-anchored in the actual attic scene; 4 prompt-echo keywords dropped |
| 13 | fillblank — "scullery ___" | Replace | Short summary |

**Bank-level findings:** 12 of 13 questions passed the summary test, i.e. a
child who read only `short_summary` could score full marks. Big ideas A, B and
C were untouched — every question was about *what happened to* Sara, none about
what she does with it. Not one of the famous scenes (buns, rat, sixpence,
French lesson, the magic) appeared. The three languages were faithful
translations of each other, so no drift to repair.

## 3. Design for this book

- **Why this type mix:** a long novel with a sharp before/after hinge and a
  large cast → classification on the hinge, matching on the minor characters
  (the ones a summary-reader has never heard of), ordering across the whole
  arc to break the "summary order = story order" assumption. The moral core is
  arguable, so the Evaluate question asks about a *choice* Sara makes rather
  than about her slogan. No crossword: the grid would have to work in three
  scripts and the book offers no natural short-word set.
- **Coverage map:**

| # | Type / Bloom | Scene | Big idea | Replaces |
|---|---|---|---|---|
| 1 | mc/Understand | S1 French lesson | D | old q1 |
| 2 | mc/Remember | S8 the buns | C | old q2 |
| 3 | fillblank/Understand | S10 "a princess must be polite" | A | old q4 |
| 4 | mc/Remember | S6 Melchisedec | C | old q5 |
| 5 | ordering/Understand | S1→S9 across the book | — | old q6 |
| 6 | matching/Analyze | S2, S3, S8, Ram Dass | C | old q7 |
| 7 | classification/Analyze | the birthday hinge | A | old q11 |
| 8 | mc/Analyze | S10 the silent speech | B | old q3 |
| 9 | open/Evaluate | S8 giving the buns away | C | old q9 |
| 10 | open/Create | S9 the magic attic | B | old q12 |
| 11 | mc/Understand | S7 the sixpence | A | old q10 |
| 12 | fillblank/Remember | the Large Family | B | old q13 |

## 4. Proposed bank

Files: `a-little-princess.{hy,ru,en}.proposed.json` (identical content applied
to `content/books/`).

**Before → after, three examples:**

1. *"What is the name of Sara Crewe's beloved doll?" (Emily)* → **"What does
   Monsieur Dufarge find when he speaks to her?"** The old key sits in the
   extended summary; the new one needs chapter 2, and its explanation teaches
   big idea D — Miss Minchin punishes Sara for the humiliation of being wrong.
2. *"Do you agree that a real princess is defined by kindness rather than
   wealth?"* → **"Sara had eaten almost nothing for days when she gave away
   five of her six buns. Was that right?"** The old question is answerable
   with no book at all and had `kindness`, `wealth`, `princess` as keywords —
   all three in its own prompt. The new one forces a judgement about a
   specific act, and its explanation tells the grader that *both* answers can
   score 1.
3. *ordering: arrives → father dies → attic → fortune restored* → **six
   reader-only events from the French lesson to the magic.** The old item list
   was the short summary in order. The new one breaks the common wrong
   assumption that Sara's fall opens the book; two happy years precede it.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Every key checked against Gutenberg ebook 146 (bun count, coin, rat,
      sixpence, chapter order, the "polite" rule, the eight children)
- [x] Summary test: no question in the new bank is answerable from
      `short_summary` or `extended_summary`
- [x] Giveaway test: the ordering item about the buns states only that Sara
      gives five away; q2 asks how many she *keeps*, which the item does not
      reveal (six − five is inferable, so q2 and q5 were checked as a pair and
      left — the inference itself requires having read the scene). The
      classification items name no answer used elsewhere.
- [x] Age read-through at 9
- [x] hy / ru / en are the same bank; names follow the existing translations

## 6. Questions for Shahen

- The `short_summary` and `extended_summary` are unchanged. They give away a
  lot (Emily, Becky, Mr. Carrisford, the attic). That is fine now that no
  question depends on them, but if you ever want summary-level questions back,
  the summaries should be trimmed first.
