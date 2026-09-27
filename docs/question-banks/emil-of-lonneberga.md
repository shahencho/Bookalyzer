# Emil of Lönneberga: question bank analysis

Slug: `emil-of-lonneberga` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** episodic comic stories (1963 onwards) about a five-year-old
  on a Swedish farm around 1900. Short chapters, one escapade each, read aloud
  as much as read alone.
- **Readers in this app:** about 6–10.
- **Author's aim:** to write a "naughty" child who is never once malicious, and
  to let the adults be wrong about him.
- **Big ideas:** **A** Emil's disasters come from kindness or curiosity at the
  wrong scale, never from spite · **B** the punishment loop is affectionate,
  not frightening — and it ends in forgiveness every time · **C** the same
  stubbornness that causes the trouble saves Alfred's life · **D** a whole
  village can be wrong about a child, and one mother can refuse the verdict.
- **What children love:** the soup tureen, Ida on the flagpole, the rat trap,
  the wooden men piling up, and the sleigh through the blizzard.

**Key scenes:** the tureen · Ida and the flagpole · the rat trap · the
poorhouse feast · the auction and the horse · the toolshed and the carving ·
the blue notebooks · the America collection · the ride to Mariannelund.

**Unsure / VERIFY:** the exact number of wooden figures differs across the
three books, so no key names a number; the fillblank asks only what he carves.
What Emil becomes as an adult is not used, as I could not confirm it.

## 2. Audit of the current bank

11 questions — the smallest bank in the batch — with **two matching questions
and two classification questions** among them. Checker: 11 prompt-echo
keywords, 3 longest-correct options, 5 short keywords.

| # | Old question | Verdict |
|---|---|---|
| 1 | where does his father send him | Replace — in the summary |
| 2 | fillblank: he carves little wooden ___ | **Keep** — in the summary too, but it is the book's signature; re-anchored |
| 3 | matching characters | **Fix** — kept, four household roles |
| 4 | classification of events | **Fix** — recast as "ends in the shed" vs "ends in thanks" |
| 5 | open: why do people still love him | Replace — answerable from the summary's tone |
| 6 | what do most of his scrapes have in common | Replace — states its own answer in the prompt |
| 7 | fillblank: head stuck in a soup ___ | Replace — one-word guess from context; the tureen moved into the classification |
| 8 | ordering of famous scrapes | Replace — the stories have no fixed order; replaced with the *structure* of a typical day |
| 9 | matching moments to what they reveal | Replace — duplicate matching, and the "reveals" are opinions |
| 10 | classification of moments | Replace — duplicate |
| 11 | open: what do you do instead of sulking | Replace — needs no book |

**Bank-level:** the blue notebooks, the poorhouse feast, the America
collection and the ride to Mariannelund — the four things that give these
books their heart — were all missing. Half the bank was duplicated question
types, and the ordering question assumed a canonical sequence the stories do
not have.

## 3. Design for this book

- **Why this type mix:** episodic books resist ordering, so the ordering
  question here sequences the *repeating shape* of an Emil story instead — which
  is a real piece of understanding and cannot be guessed. Classification splits
  on outcome (shed vs thanks), which puts the two halves of Emil's character
  side by side. One Analyze question is spent on the America collection,
  because that is where the series stops being only funny.
- **Coverage map:** the notebooks → q1 · the poorhouse → q2 (idea A) · the
  wooden men → q3 (idea B) · Ida and the flagpole → q4 · the loop → q5
  (idea B) · the household → q6 · shed vs thanks → q7 (ideas A and C) ·
  the America money → q8 (idea D) · does the punishment work → q9 (Evaluate,
  idea B) · invent an escapade → q10 (Create, idea A) · Katthult → q11 ·
  Mariannelund → q12 (idea C).

## 4. Proposed bank

**Three examples:**

1. *"Where does Emil's father send him when he gets into trouble?"* → **"What
   does Emil's mother do about every one of his escapades?"** The old answer is
   the summary's second sentence; the new one introduces the blue notebooks,
   which are both a lovely detail and the reason the stories exist at all.
2. *"Why do the people of Lönneberga still love him?"* → **"The villagers
   collect money to send Emil to America. What does his mother do?"** From a
   sentiment question to the scene that actually contains the answer.
3. *ordering: "put Emil's famous scrapes in the order the stories describe
   them"* → **ordering the six stages of a typical Emil day** (idea →
   disaster → shed → carving → notebook → forgiveness). The old version had no
   defensible key, since the escapades are independent; the new one tests
   whether the child has noticed the shape of the whole series.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Keys verified: Katthult, Alma, Anton, Ida, Alfred and Lina; the toolshed
      and the carved figures; the soup tureen; Ida on the flagpole; the rat
      trap; the poorhouse fed with the relatives' food; the blue notebooks; the
      America collection and the mother's refusal; the blizzard ride to
      Mariannelund
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 6
- [x] hy / ru / en identical

## 6. Questions for Shahen

- These are three books sold as one in most editions, and the library entry
  treats them as a single title. The bank draws on all three (the Mariannelund
  ride is from the third). If your readers only have the first volume, the last
  question and one classification item will be unfair — tell me and I will
  confine the bank to volume one.
