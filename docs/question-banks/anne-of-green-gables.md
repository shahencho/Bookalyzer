# Anne of Green Gables: question bank analysis

Slug: `anne-of-green-gables` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** episodic novel (1908), 38 short chapters, each mostly a
  self-contained scrape. Warm, funny, with a sudden grief near the end.
- **Readers in this app:** about 9–13.
- **Author's aim:** to show an unwanted child making herself indispensable,
  and to make the reader love her for her faults rather than in spite of them.
- **Big ideas:** **A** being wanted is earned, not given · **B** imagination
  is Anne's way of taking possession of the world (naming things) · **C**
  growing up means learning when to laugh at yourself · **D** duty and
  ambition can pull in opposite directions, and choosing is not defeat.
- **What children love:** the slate, the currant wine, the green hair, the
  ridgepole, the puffed sleeves, Anne's speeches.

**Key scenes:** the drive to Green Gables ("call me Cordelia") · apologising
to Mrs. Lynde · the slate · the currant wine · Minnie May's croup · the
liniment cake · the ridgepole dare · green hair · the Lady of Shalott · the
amethyst brooch · Queen's and the Avery scholarship · Matthew's death.

**Unsure / VERIFY:** none. All keys verified against Gutenberg ebook 45
(currant wine, anodyne liniment, "raven black" → green, ipecac, ridgepole,
the brooch caught in the shawl, the Avery scholarship, "Carrots").

## 2. Audit of the current bank

Checker: 12 prompt-echo keywords and 8 longest-correct options across the
three languages. Unusually for this batch, about a third of the questions were
genuinely reader-only (slate, hair dye, scholarship) — this bank was the least
bad of the first five.

| # | Old question | Verdict |
|---|---|---|
| 1 | why are Matthew and Marilla surprised | Replace — first line of the summary |
| 2 | who becomes Anne's best friend | Replace — summary |
| 3 | fillblank: hair dyed ___ | **Keep** — reader-only, re-anchored with the peddler's promise |
| 4 | why the slate over Gilbert's head | **Fix** — kept, options rewritten and equalised |
| 5 | how the Anne–Gilbert relationship changes | Replace — answerable from any summary |
| 6 | ordering of four summary events | Replace — replaced with six scrapes in true order |
| 7 | matching four main characters | Replace — the four leads are all in the summary; replaced with four villagers |
| 8 | classification of events | Replace — vague groups |
| 9 | open: was giving up the scholarship right | **Fix** — kept the question, added a grading brief and real keywords |
| 10 | which island is Avonlea on | Replace — in the summary |
| 11 | classification of Anne's traits | Replace — traits, not evidence |
| 12 | open/Create: name a place like Anne does | **Fix** — kept; this was the best question in the old bank |
| 13 | fillblank: stay to help ___ | Replace — summary |

**Bank-level:** the old bank used only Anne, Matthew, Marilla, Diana and
Gilbert — the five people named in the summary. Mrs. Lynde, Miss Stacy, Josie
Pye, Mrs. Allan and Minnie May never appeared. Big idea B (naming) appeared
only in the Create question and was never tested as knowledge.

## 3. Design for this book

- **Why this type mix:** an episodic book is made for ordering (six scrapes in
  sequence, which also shows Anne maturing) and for matching against the
  supporting cast. The naming motif is perfect for classification: Anne's name
  vs the village's name for the same place, six items, no ambiguity. Two MCs
  are pure scene recall from chapters a summary never mentions.
- **Coverage map:** currant wine → q1 · slate → q2 · green hair → q3 ·
  liniment cake → q4 · six scrapes → q5 · villagers → q6 · naming → q7 (idea B)
  · the brooch → q8 · the scholarship → q9 (idea D) · naming → q10 (Create) ·
  "Cordelia" → q11 (idea B) · Lady of Shalott → q12.

## 4. Proposed bank

**Three examples:**

1. *"Who becomes Anne's best friend in Avonlea?"* → **"Anne serves Diana what
   she thinks is raspberry cordial. What is actually in the bottle?"** Same
   friendship, but now the child has to have read chapter 16.
2. *matching: Matthew / Marilla / Diana / Gilbert to summary roles* →
   **Mrs. Rachel Lynde / Miss Stacy / Josie Pye / Mrs. Allan.** Four people a
   summary-reader has never heard of, each tied to a specific scene.
3. *classification "sort each event into the right group"* → **"a name Anne
   invented" vs "what everyone else called it"**, with the three pairs being
   the same three places. It tests the book's central habit of mind rather
   than sorting events into vague bins.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Every key checked against the text, including the order of the six
      scrapes (slate ch15 → wine ch16 → croup ch18 → cake ch21 → ridgepole
      ch23 → green hair ch27)
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 9
- [x] hy / ru / en identical; names follow the existing translations
      (Էնն / Энн, Կաթբերտ / Касберт)

## 6. Questions for Shahen

- The ru title in the file is «Энн из Зелёных Мезонинов» and the hy is «Էնն
  Կանաչ Ծերպերից»; I kept both as they were. If your readers know the Russian
  edition as «Аня из Зелёных Мезонинов» (the older Батищева translation), the
  character name in the ru file should change from Энн to Аня throughout.
