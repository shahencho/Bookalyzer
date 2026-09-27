# Alice's Adventures in Wonderland: question bank analysis

Slug: `alice-in-wonderland` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** Carroll's 1865 novel, public domain. Not a plot but a
  sequence of arguments — almost every scene is Alice trying to reason with
  someone who is using logic incorrectly on purpose.
- **Readers in this app:** about 8–12.
- **Author's aim:** to write nonsense that is strictly constructed, so that a
  child can feel the exact place where the reasoning goes wrong.
- **Big ideas:** **A** Wonderland's jokes are logical jokes, not random ones ·
  **B** Alice's size changes are always caused by something she eats or drinks,
  and she keeps track · **C** the adults are rude, contradictory and full of
  rules, and Alice stays polite far longer than they deserve · **D** the trial
  is the book's real target: a court that sentences first and decides afterwards.
- **What children love:** the Drink Me bottle, the Cheshire Cat's grin, the mad
  tea party, the riddle with no answer, the flamingo croquet, and "Off with her
  head!"

**Key scenes:** the rabbit hole and the Drink Me bottle · the pool of tears and
the Caucus-race with comfits for prizes · the White Rabbit's house and Bill the
Lizard · the Caterpillar and the mushroom · the Duchess's peppery kitchen and
the baby that turns into a pig · the Cheshire Cat's grin · the tea party, the
raven riddle and the watch stopped at six · the Mock Turtle's school of Reeling
and Writhing · croquet with flamingos · the trial, the tarts, and "Sentence
first — verdict afterwards."

**Unsure / VERIFY:** none. The Dodo's comfits, the mushroom's two sides, the pig
baby, six o'clock, the raven-and-writing-desk riddle, Reeling and Writhing, and
the Queen's sentence-first line were all verified in Gutenberg ebook 11.

## 2. Audit of the current bank

| # | Old question | Verdict |
|---|---|---|
| 1 | how does Alice get to Wonderland | Replace — the summary's first line |
| 2 | fillblank: "Drink Me" makes Alice ___ | Replace — same, and the prompt hints it |
| 6 | what can the Cheshire Cat do | Replace — the grin is on every cover |
| 7 | fillblank: always ___ o'clock | **Fix** — recast as *why* it is six o'clock |
| 3 | matching "what makes them memorable" | **Fix** — recast as what each one *does* |
| 4 | classification of characters | **Fix** — became the size-change sort |
| 9 | matching "how backward the rule is" | Delete — vague; folded into the trial question |
| 8 | ordering "Alice's tumble" | **Fix** — widened to the whole journey |
| 10 | classification "sort each event" | Delete — duplicate instrument |
| 5 | open: why does Alice stay calm | **Fix** — kept, recast around politeness |
| 11 | open: your own rabbit hole | Replace — needs no book |

**Bank-level:** the old bank stopped at the first two chapters. Everything it
asked about — the fall, the bottle, the grin, six o'clock — is on the cover of
any edition or in the first ten pages. The Caucus-race, the pig baby, the
Caterpillar's mushroom, the Mock Turtle, the croquet and the entire trial were
absent, and with them idea **A**: not one question asked the child to notice a
piece of Wonderland *reasoning*.

## 3. Design for this book

- **Why this type mix:** this book rewards questions with a "why" in them, so
  five of the twelve ask for a reason rather than a fact — why it is always six
  o'clock, why Alice objects at the trial, why the Dodo's prize-giving is absurd.
  The classification uses the size changes because they are the one strictly
  consistent system in the book (idea B), which makes them genuinely sortable.
  Both open questions were rebuilt: the Evaluate is about Alice's politeness
  under provocation (idea C), and the Create asks for a lesson in the Mock
  Turtle's school, which requires the child to have noticed how Carroll's
  wordplay is made.
- **Coverage map:** the Caucus-race → q1 (A) · six o'clock → q2 (A) · the
  mushroom → q3 (B) · the pig baby → q4 · the whole journey → q5 · five
  creatures → q6 · size changes → q7 (B) · the trial → q8 (D) · politeness →
  q9 (Evaluate, C) · Reeling and Writhing → q10 (Create, A) · the raven riddle →
  q11 · the White Rabbit ordering her about → q12 (C).

## 4. Proposed bank

**Three examples:**

1. *"At the mad tea party, it's always ___ o'clock."* → **"The Hatter explains
   why his tea party never ends. Why is it always six o'clock where he is?"**
   Same scene, but the new question needs the explanation — time itself is
   stopped because the Hatter quarrelled with it — instead of a number a child
   could guess.
2. *"Sort each character into the right group."* → **"Alice changes size again
   and again. Sort each of these by what it does to her."** The old version's
   groups were arbitrary; the new one tests the only rule Wonderland keeps
   consistently, and a child who read carelessly will get it wrong.
3. *open: "If you fell down your own rabbit hole…"* → **"At the Mock Turtle's
   school the lessons were Reeling and Writhing. Invent one more lesson for that
   school, and say what the children learn in it."** The old question was a
   daydream. The new one only works if you have seen how Carroll bends a real
   word into a joke — and the grading brief says a made-up nonsense word with no
   real word behind it has missed the mechanism.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Every key verified in Gutenberg ebook 11
- [x] Adaptation test: no question is answerable from the Disney film alone —
      the Caucus-race prizes, the pig baby and the trial's logic are all book
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 8
- [x] hy/ru titles kept
- [x] Applied to all three `content/books/alice-in-wonderland.*.json`

## 6. Questions for Shahen

- The raven riddle has no answer in the book, and the explanation says so
  outright. The fillblank asks only for the second half of the riddle ("writing
  desk"), not for a solution — if a child answers with an actual solution they
  will be marked wrong by the exact matcher, which is correct here but worth
  knowing.
