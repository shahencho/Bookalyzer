# The Carpathian Castle: question bank analysis

Slug: `carpathian-castle` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** Verne's 1892 gothic-looking mystery that turns out to be
  science fiction. Slow first half (village life), fast second half.
- **Readers in this app:** about 11–14. It is the longest-winded book in this
  batch and needs a patient reader.
- **Author's aim:** to build a haunted castle and then dismantle it in front
  of the reader, showing that the "supernatural" is simply technology nobody
  present can recognise yet.
- **Big ideas:** **A** fear fills the gap where an explanation is missing ·
  **B** the same invention can torment or heal, depending on its use ·
  **C** grief that refuses to end turns into obsession · **D** the man who
  claims to be scientific (Doctor Patak) is the most superstitious of all.
- **What children love:** the smoke from a dead chimney, the shock at the
  gate, the voice from an empty castle, and the reveal.

**Key scenes:** Frik and the telescope · the village argument · Nic Deck and
Patak on the path · the bell and the voice · the shock at the gate · Franz at
the inn · Stilla's death recalled · the figure on the bastion · captivity ·
Orfanik's explanation · the castle destroyed · Franz recovering to the
recordings.

**Unsure / VERIFY:** none. Verified against the French original (Gutenberg
5082): Frik's telescope, Werst, Koltz, Miriota, Nic Deck, Patak, Orfanik, the
electric current from the laboratory batteries, the phonographs hidden in the
baron's box at the San Carlo, the portrait reflected in angled mirrors, and
Franz's recovery through the recordings.

## 2. Audit of the current bank

Checker: 9 prompt-echo keywords, 13 longest-correct options.

| # | Old question | Verdict |
|---|---|---|
| 1 | what do villagers report seeing and hearing | Replace — summary |
| 2 | fillblank: the village is called ___ | **Keep** — reader-only |
| 3 | why is Franz drawn to investigate | Replace — summary |
| 4 | matching characters to the mystery | **Fix** — kept, recast around the four villagers |
| 5 | classification of statements | **Fix** — recast as belief vs reality, with paired items |
| 6 | ordering of events | **Fix** — kept, items made specific |
| 7 | the real explanation of the apparition | **Fix** — kept; this was the best question in the old bank |
| 8 | fillblank: the engineer is named ___ | **Keep** — reader-only |
| 9 | Apply: how would a villager find the truth | Replace — no defensible single key |
| 10 | whose grief causes the events | Replace — the summary names Gortz |
| 11 | open: did Gortz's way of grieving help him | **Fix** — kept, grading brief added |
| 12 | open/Create: invent a scientific explanation | **Fix** — kept, tightened to require both halves |

**Bank-level:** unusually, this bank had the right *idea* — it knew the book
was about explanation defeating superstition. What it lacked was evidence: no
question referred to a specific scene, and half of them could be answered from
the blurb. Frik, Nic Deck, Patak, the gate, the phonographs in the theatre box
and the ending were all absent.

## 3. Design for this book

- **Why this type mix:** the novel is constructed as belief-then-explanation,
  so the classification question pairs each superstition with the machine that
  caused it — six items, no ambiguity, and it teaches the book's thesis by
  making the child perform it. Two Analyze questions handle the mechanism.
  Ordering matters here more than in most books because Verne withholds the
  explanation deliberately.
- **Coverage map:** the smoke → q1 (idea A) · the gate → q2 (idea A) ·
  Orfanik → q3 · Stilla's death → q4 (idea C) · the reveal structure → q5 ·
  the villagers → q6 (idea D) · belief vs reality → q7 (idea A) · the
  apparatus → q8 · Gortz's grief → q9 (idea C) · invent a haunting → q10 ·
  Werst → q11 · Franz's recovery → q12 (idea B).

## 4. Proposed bank

**Three examples:**

1. *"What do the villagers report seeing and hearing at night?"* → **"What
   first makes them certain the castle is occupied?"** with the answer being
   smoke from a chimney. The old version is atmosphere; the new one is the
   actual first clue, and it is far better storytelling.
2. *"Which character's grief and obsession most directly causes the strange
   events?"* → **"Where and how did La Stilla die?"** The old question names
   its own answer in the summary; the new one requires the Naples chapters.
3. *classification "sort each statement into the right group"* (groups unnamed
   in the old prompt) → **"what the villagers believed" vs "what was really
   happening"**, with three matched pairs: devil/inventor, spirit at the
   gate/electric current, ghost on the bastion/lit portrait in mirrors.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Every key checked against the French original
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 11
- [x] hy / ru / en identical

## 6. Questions for Shahen

- This is the hardest book in the first ten for a child to finish; the bank
  assumes a reader who got to the end. If many children abandon it, the two
  reveal questions (q8, q12) will read as unfair — worth watching in the data.
