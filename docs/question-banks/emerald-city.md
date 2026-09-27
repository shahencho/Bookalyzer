# The Wizard of the Emerald City: question bank analysis

Slug: `emerald-city` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** Volkov's 1939 Russian reworking of Baum's *Wizard of Oz* —
  not a translation. Shorter chapters, a tighter moral frame, several episodes
  and characters of its own.
- **Readers in this app:** about 6–11.
- **Author's aim:** a quest in which the heroine can only go home by helping
  three strangers first — kindness is built into the rules of the plot.
- **Big ideas:** **A** you get home by helping other people get what they
  need · **B** the three companions already have what they are asking for ·
  **C** the Emerald City runs on stagecraft — green glass, screens and a man
  behind a curtain · **D** a fake can still work, because belief does the
  rest.
- **What children love:** the talking dog, the poppy field, the mice, the
  bucket of water, and Totoshka pulling back the curtain.
- **Cultural context:** for Russian-speaking children this, not Baum, *is* the
  story — Ellie, Totoshka, Bastinda and Goodwin are the familiar names, and
  Faramant and Din Gior belong to a six-book series.

**Key scenes:** Gingema's hurricane and the falling house · Villina's book and
the condition · Totoshka speaking · the Scarecrow, the Woodman, the Lion · the
ogre · the poppy field and Ramina's whistle · the green spectacles · Goodwin
in four shapes · Bastinda and the bucket · the golden cap · the curtain pulled
back · the balloon · Stella and the silver shoes.

**Unsure / VERIFY:** the exact position of the ogre episode in the sequence
varies between editions, so it does not appear in the ordering question — only
in the summary. No question depends on it.

## 2. Audit of the current bank

Only 10 questions, and **three of them (q2, q8, q9) asked the same thing**:
match each companion to the thing he lacks. Checker: 6 prompt-echo keywords,
5 longest-correct options, 9 short keywords — the worst short-keyword count in
the batch.

| # | Old question | Verdict |
|---|---|---|
| 1 | what does Ellie follow to the city | Replace — summary (and every film) |
| 2 | matching companions to wishes | Replace — summary; duplicated by q8 and q9 |
| 3 | fillblank: each found it was there ___ all along | Replace — gives away the book's own point |
| 4 | open: whose wish is closest to yours | Replace — needs no book |
| 5 | what accidentally defeats the witch at the start | **Fix** — recast to name Gingema and Villina's part |
| 6 | fillblank: the road leads to the ___ city | Replace — the title |
| 7 | ordering | **Fix** — kept, with six verified stages |
| 8 | matching companions to what they realise | Replace — duplicate |
| 9 | classification of companions by what they lack | Replace — duplicate |
| 10 | open: what would you ask the Wizard for | **Fix** — kept, but rebuilt so it needs Goodwin's method |

**Bank-level:** nothing in the old bank was specific to Volkov. A child who had
only seen the American film would have scored full marks: no Totoshka speaking,
no Villina's condition, no Faramant, Din Gior, Ramina or the silver whistle,
no Bastinda by name, no green spectacles, no curtain.

## 3. Design for this book

- **Why this type mix:** the real-magic/trickery split is the book's spine and
  makes a clean six-item classification. Matching is spent entirely on the
  Volkov-only characters, which is the fastest way to tell a reader from a
  film-watcher. The Evaluate question asks the question the book itself raises
  about Goodwin, and the Create question asks the child to use his method.
- **Coverage map:** Totoshka speaking → q1 · Villina's condition → q2 (idea A)
  · Gingema → q3 · Ramina's whistle → q4 · the journey → q5 · four Volkov
  characters → q6 · magic vs trickery → q7 (idea C) · Goodwin's disguises →
  q8 (idea C) · did the fakes help → q9 (Evaluate, ideas B and D) · invent your
  own fake → q10 (Create, idea D) · Bastinda's fear → q11 · the silver shoes →
  q12.

## 4. Proposed bank

**Three examples:**

1. *"What does Ellie follow to get to the Emerald City?"* → **"What happens to
   Totoshka as soon as he arrives in the Magic Land?"** The old answer is the
   yellow brick road, which every child knows without the book. The new one
   requires Volkov, and it sets up the ending, since it is the dog who exposes
   Goodwin.
2. *fillblank "each companion found that what he was looking for had been
   there ___ all along"* → **"Bastinda was more afraid than anything of
   ___."** The old question states the book's moral in the prompt and asks the
   child to fill in the last word of it. The new one asks for a fact only a
   reader has.
3. *"Whose wish is closest to your own?"* → **"Goodwin gives bran, a cloth
   heart and a drink. Did he actually help them?"** The old question can be
   answered without opening the book; the new one is the genuine argument the
   book sets up, and both verdicts score full marks.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Keys verified against Russian sources: Gingema's hurricane turned by
      Villina, the three-wishes condition from Villina's book, Totoshka's
      speech, Ramina's silver whistle, Faramant's spectacles, Din Gior,
      Goodwin's changing shapes and balloon origin, Bastinda and water, the
      golden cap, Stella and the silver shoes
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 6
- [x] ru written first (original language), then en and hy

## 6. Questions for Shahen

- If you ever add Baum's *Wonderful Wizard of Oz* (it is slug
  `wizard-of-oz`, already in the library and in the second thirty), the two
  banks must stay clearly apart. The Volkov bank is now built almost entirely
  on details Baum does not have, which should make that easy — but the Oz
  bank should be rewritten with the same care so the pair do not collide.
