# The Little Prince: question bank analysis

Slug: `the-little-prince` · Status: analysis (en draft; hy/ru pending) · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** a short philosophical fable in 27 chapters, with the
  author's own drawings. It is simple on the surface and layered underneath.
- **Readers in this app:** about 8–14. Younger children get the story (the
  planets, the fox). Older ones can discuss the ideas.
- **Author's aim:** a gentle satire of adult priorities, and a meditation on
  love, friendship and loss, told through a child's eyes.
- **Big ideas:**
  - **A:** grown-ups see only the outside of things; children (and the heart)
    see what is inside.
  - **B:** what is essential is invisible to the eye. Ties are made through
    time and care ("taming").
  - **C:** you are responsible for what you have tamed or loved.
  - **D:** love makes ordinary things special, even after loss (the stars that
    laugh).
- **What children love about it:** the hat that is really an elephant inside a
  snake, the sheep in a box, the silly grown-ups on tiny planets, watching many
  sunsets by moving a chair, the fox.

**Key scenes:**

| # | Scene | Big idea |
|---|---|---|
| S1 | Drawing No. 1: the grown-ups see a hat, not a boa digesting an elephant | A |
| S2 | The sheep in a box | A |
| S3 | Baobabs: daily discipline on a tiny planet | C |
| S4 | Many sunsets in one day (sadness) | — |
| S5 | The rose: vanity, thorns, glass globe; the prince leaves | B, C |
| S6 | The king, conceited man, tippler, businessman, geographer | A |
| S7 | The lamplighter, the only one who could be a friend | C |
| S8 | The garden of 5,000 roses; the prince cries | B |
| S9 | The fox: taming, the secret, "responsible forever" | B, C |
| S10 | The switchman and the thirst-pill merchant | A |
| S11 | The well: water "good for the heart" | B |
| S12 | The snake; the goodbye; the stars that laugh | D |

**Chronology (a trap):** the book *opens* with the pilot meeting the prince,
but the prince met the fox *before* the pilot. He had been on Earth almost a
year and tells the fox story afterwards.

## 2. Audit of the current bank

Checker output (summary):
- **en**
  - q8 crossword: STAR doesn't cross the other words.
  - q12 open: 5 keywords appear in the prompt.
  - q6 open: short keywords `time`, `care`, `love`, `bond`.
  - q1, q9, q11 mc: the correct option is the longest.
- **ru**
  - q8 crossword: **letter clash at cell 2,2** (ЛИС), plus a disconnected word.
  - q12: keyword `одержим` is in the prompt.
  - q6: short keyword `друг`.
- **hy**
  - q8 crossword: 2 disconnected words.
  - q12: 4 keywords are in the prompt.
  - q6: short keywords `կապ` and `սեր`.

| # | Type / Bloom | Scene | Verdict | Reason |
|---|---|---|---|---|
| 1 | mc Remember: where the pilot meets the prince | — | Replace | Answered by the first line of the summary |
| 2 | ordering: leave → planets → pilot → fox | — | Replace | **Wrong key** (pilot before fox), in all 3 languages |
| 3 | matching: character → what matters | S6, S9 | Fix | Keyword giveaways ("Fox" ↔ "tamed"); only famous characters |
| 4 | fillblank: "invisible to the ___" | S9 | Fix | Known without reading; "heart" is the richer blank |
| 5 | classification: grown-up matters vs understands | S5, S6 | Replace | Forced moral binary; the Rose's placement is debatable |
| 6 | open Evaluate: why the fox wants to be tamed | S9 | Replace | Really Understand; short keywords give free credit |
| 7 | ranking: least → most understanding | S6, S7 | Replace | Opinion scored as fact; the fox is not a grown-up |
| 8 | crossword: ROSE, FOX, STAR | — | Replace | Not connected (and the ru grid has a clash) |
| 9 | mc Apply: counting followers online | S6 | Fix | A good idea, but the correct option is longest and 2 distractors are "good" characters |
| 10 | classification: planet vs Earth | S5, S9 | Fix | A natural split, but it reuses the rose and the fox |
| 11 | mc: why baobabs are dangerous | S3 | Drop | Plain recall; the correct option is the longest |
| 12 | open Create: invent another planet | S6 | Fix | Prompt words used as keywords |

**Bank-level findings:**
- Big ideas A, C and D are almost missing.
- The businessman appears in 5 of 12 questions and the fox in 6.
- S1, S2, S7, S10, S11 and S12 are never used.
- q6's Bloom label is inflated.

## 3. Design for this book

- **Why this type mix:**
  - A gallery of distinct characters on the planets makes a strong matching
    question and an Apply mc.
  - The prince's change of heart about the rose is the emotional spine of the
    book, so it suits ordering.
  - Two famous lines suit fillblank (only one is used, to avoid a pair of
    giveaways).
  - The book is about ideas, so it gets 3 open questions (Evaluate, Analyze,
    Create).
  - Ranking is dropped: the text sets no defensible order.

**Coverage map:**

| # | Type / Bloom | Scene | Idea | Replaces |
|---|---|---|---|---|
| 1 | mc Remember | S1: the "hat" | A | 1 |
| 2 | mc Understand | S2: the sheep in a box | A | new |
| 3 | ordering Understand | S5 → S8 → S9: the prince's feelings about the rose | B | 2 |
| 4 | matching Analyze | S6: king, tippler, businessman, geographer | A | 3 |
| 5 | fillblank Remember | S9: "only with the ___" → heart | B | 4 |
| 6 | classification Understand | S3–S5 vs S8/S10: home vs Earth, 6 items | — | 5, 10 |
| 7 | mc Analyze | S7: the lamplighter as the only possible friend | C | 7 |
| 8 | mc Understand | S10: the merchant, "walk to a spring" | A | new |
| 9 | mc Apply | S6: likes → the conceited man | A | 9 |
| 10 | open Evaluate | S9: "responsible forever": agree? Own example | C | 6 |
| 11 | open Analyze | S12: why the stars will laugh | D | new |
| 12 | open Create | The prince lands in your town | A | 12 |
| 13 | crossword Remember | BAOBAB, SNAKE, SHEEP, ROSE, LAMP, FOX (9×8, connected) | — | 8 |

## 4. Proposed bank

The English version is in [the-little-prince.en.proposed.json](the-little-prince.en.proposed.json).
It passes the checker with 0 errors.

**Ordering.** Before, the key was wrong and tested travel logistics:
> leave planet → planets → **pilot → fox**

After, it tests the emotional arc:
> the rose blooms and he is amazed → her pride drives him away → he cries in
> the garden of 5,000 roses → the fox: she is unique because of the time he
> gave her

**Matching.** Before, "The Fox" ↔ "being tamed" could be matched by the words
alone. After, the characters are ones only a reader knows, and the answers are
paraphrased:
> The Tippler ↔ "Doing something he is ashamed of, to forget his shame"

**Open, Create.** Before, the keywords were `planet`, `grown-up`, `imagine` and
`strange`, all taken from the prompt, so any answer scored 1. After, the prompt
is personal ("lands in *your* town"). The only keyword is the rare phrase
"matters of consequence", so nearly every answer is graded by the LLM against
the explanation.

## 5. Verification

- [x] The en checker has 0 ERRORs. There are 2 advisory WARNs (Evaluate/Create
  questions have keywords; they are deliberately rare).
- [x] Keys checked against the text: the hat, the three rejected sheep and then
  the box, the 5,000 roses before the fox, "53 minutes", "only one I could have
  made my friend", "responsible, forever", the laughing stars.
- [x] Summary test: only q5 (the central quote) is summary-adjacent.
- [x] Giveaway test: the crossword clues avoid the MC scenes (the SHEEP clue is
  about the worry for the flower, not the drawing). "Well" is not an answer
  anywhere.
- [ ] Age read-through by Shahen
- [ ] hy / ru versions: use the character names from the standard translations
  (ru: Честолюбец, Пьяница, Делец, Фонарщик, Географ; hy: check against the
  published Armenian edition). Build new crossword grids for both.

## 6. Questions for Shahen

- Is the ending question (the prince's "death" and the laughing stars) right
  for the youngest readers, or should it be kept for older ones?
- Keep a ranking question for every book, or allow banks without one?
