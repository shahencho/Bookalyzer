# Ballet Shoes: question bank analysis

Slug: `ballet-shoes` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** family novel (1936), still in copyright. Realistic,
  money-conscious, three child protagonists with genuinely different wants.
- **Readers in this app:** about 8–12.
- **Author's aim:** to write about children's *work* — training, auditions,
  earning — with the seriousness usually given to adult careers, and to let
  one of the three hate it.
- **Big ideas:** **A** a name you make yourself is worth more than one you
  inherit · **B** talent is unevenly given, and that is not a moral failing ·
  **C** almost everything the Fossils get comes from adults who chose to give
  it · **D** doing your share for the household is real, and it costs.
- **What children love:** the vow, the auditions, Posy's arrogance, Petrova's
  garage, Pauline being taken down a peg.

**Key scenes:** the three babies and the surname · GUM leaving · the lodgers
arriving · the birthday vow · the Academy · licences at twelve · The Blue
Bird · Pauline's Alice and the understudy · Posy's private lessons · the
three departures and GUM's return.

**Unsure / VERIFY:** the exact wording of the vow varies between editions, so
the fillblank targets only the words "history books", which are stable. The
licensing age of twelve appears in an explanation, not in any key.

## 2. Audit of the current bank

Checker: 9 prompt-echo keywords, 13 longest-correct options. 14 questions —
above the 10–15 target but at the top of it, and several were duplicates of
each other.

| # | Old question | Verdict |
|---|---|---|
| 1 | the girls' shared surname | Replace — in the first line of the summary |
| 2 | who brings the babies home | Replace — summary |
| 3 | fillblank: Academy of Dancing and ___ Training | Replace — in the summary |
| 4 | why do they enrol | Replace — summary |
| 5 | matching each sister to her passion | Replace — the summary states all three |
| 6 | ordering of summary events | Replace |
| 7 | classification of interests | Replace — same content as q5 |
| 8 | why Petrova's situation differs | Replace — summary |
| 9 | fillblank: name into the ___ books | **Keep** — reader-only and central |
| 10 | open: is it fair to Petrova | **Fix** — kept, with a grading brief |
| 11 | who helps raise them while GUM is away | Replace — summary |
| 12 | classification of details | Replace — vague |
| 13 | open/Create: letter to GUM | **Fix** — kept, anchored at the ending |
| 14 | what is the true bond between them | Replace — a theme question with a slogan answer |

**Bank-level:** five separate questions restated "each sister has a different
talent", which the summary already says. Nobody in the bank existed outside
the Fossil household — no Academy, no lodgers, no Madame Fidolia — so the
whole social world of the book, which is where its plot lives, was untested.

## 3. Design for this book

- **Why this type mix:** the book's engine is a household of adults each
  giving the children one thing, so matching carries it. Ordering follows one
  sister's career rather than the plot, because that is where cause and effect
  actually run. Classification contrasts Petrova and Posy on concrete details
  rather than on labelled "talents". The Evaluate question is the one the book
  itself keeps asking about Petrova.
- **Coverage map:** the tutors → q1 (idea C) · the surname → q2 (idea A) ·
  the vow → q3 (idea A) · Mr. Simpson's garage → q4 · the career → q5 ·
  four adults → q6 (idea C) · Petrova vs Posy → q7 (idea B) · the understudy →
  q8 · fairness to Petrova → q9 (idea D) · letter to GUM → q10 · "Garnie" →
  q11 · Posy's private lessons → q12 (idea B).

## 4. Proposed bank

**Three examples:**

1. *"What is the shared last name given to all three girls?"* → **"Why are
   three unrelated babies all given the surname Fossil?"** The old question
   quotes the summary's first sentence; the new one asks for the reason, which
   is the seed of the vow and of the book's whole argument about earned names.
2. *matching: Pauline → acting, Petrova → machines, Posy → ballet* →
   **Doctor Jakes / Theo Dane / Madame Fidolia / Mr. Simpson.** The old
   matching was three summary sentences; the new one requires knowing who is
   actually in the house.
3. *"What does the story suggest is the true bond holding the sisters
   together?"* → **"Why is Pauline's understudy sent on in her place?"** A
   slogan replaced by the book's sharpest scene.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Keys verified against reference sources (the book is in copyright and
      not available as a text file): the two professors and their subjects,
      "Garnie" from Guardian, Nana as Alice Gutheridge, Mr. Simpson's garage,
      The Blue Bird before Alice, the understudy, Posy's private lessons,
      the three destinations at the end
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 8
- [x] hy / ru / en identical

## 6. Questions for Shahen

- `copyright_status` in all three files was `active copyright` and I kept that
  value (my first draft used a non-enum string, which the checker caught).
- The Russian name for Posy in the existing files is «Поузи» and the Armenian
  is «Փոզի»; I kept both. If your readers know a published Russian
  translation using «Пози», the ru file should follow it.
