# Harry Potter: question bank analysis

Slug: `harry-potter` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

> ⚠️ **The old bank never named anybody.** All eleven questions referred to
> "the boy", "his two closest friends", "the school" and "the hidden magical
> world". Not one said Harry, Ron, Hermione, Hogwarts, Snape or Voldemort. The
> result was a bank about the *idea* of a magic school, answerable by a child
> who had never read a page. Everything was rewritten.

## 1. Book brief

- **Kind of book:** the first Harry Potter novel (1997). Seventeen chapters, a
  school year, and a mystery plot hidden inside it.
- **Readers in this app:** about 8–12.
- **Author's aim:** to hide a detective story inside a school story, and to
  play fair with the reader — every clue is on the page long before it matters.
- **Big ideas:** **A** the clues are visible all along (the Chocolate Frog
  card, the emptied vault, the three-headed dog) · **B** Harry cannot do it
  alone; the obstacle chapter is a demonstration of that · **C** the teacher
  everyone suspects is protecting him, and the one nobody suspects is not ·
  **D** the last protection is a test of character, not of power.
- **What children love:** the letters, Diagon Alley, the Sorting Hat, Quidditch,
  the trapdoor, and the turban.
- **Special problem for this book:** almost every child knows the film. A bank
  that is not deliberately built on book-only material tests nothing.

**Key scenes:** the cupboard and the letters · Ollivanders · the Sorting ·
the troll · the Chocolate Frog card · the Mirror of Erised · the Forbidden
Forest · the trapdoor and the six protections · Quirrell's turban · the feast.

**Unsure / VERIFY:** Snape's seven-bottle logic puzzle and its absence from
the film were verified; the rest of the detail (the wand, the card, the
protections, the Mirror's inscription, the turban) is quoted from the novel as
universally reproduced. The end-of-year points totals are **not** used as a
key — only the fact that Neville was awarded ten — because I did not verify
the individual numbers.

## 2. Audit of the current bank

11 questions. Checker: 7 prompt-echo keywords, 3 longest-correct options, 3
short keywords, and a **missing `copyright_status` in the hy file**.

| # | Old question | Verdict |
|---|---|---|
| 1 | what does the boy discover on his eleventh birthday | Replace — summary, and film |
| 2 | matching characters/places to roles | Replace — the "characters" were unnamed |
| 3 | fillblank: courage, loyalty and quick ___ | Replace — a virtue list, not a fact |
| 4 | classification of characters | Replace — unnamed characters |
| 5 | open: why does friendship matter in danger | Replace — needs no book |
| 6 | why the two friends are essential | Replace — could be answered in the abstract |
| 7 | fillblank: he learns by attending ___ | Replace — summary |
| 8 | ordering of the first year | Replace — film-level |
| 9 | matching parts of the story to their role | Replace — literary-function labels, no evidence |
| 10 | classification of things | Replace — vague |
| 11 | open: what would you do if you found a magic world | Replace — needs no book |

**Bank-level:** the bank could have been written by someone who had seen a
trailer. The new one is built deliberately around material the film cuts or
compresses: Snape's logic puzzle (cut entirely), the Chocolate Frog card as
the source of Flamel's name, the teacher-by-teacher authorship of the
protections, and the division of labour between the three friends underground.

## 3. Design for this book

- **Why this type mix:** the trapdoor sequence is a gift to this format — an
  ordering question for the six obstacles, a matching question for the teachers
  who built them, and a classification for who actually solves each one. Two
  questions target the single most film-resistant scene in the book (the
  bottles). The Evaluate question takes on the ending that readers have argued
  about for twenty-five years.
- **Coverage map:** the logic puzzle → q1 and q2 (idea A) · Ollivander → q3 ·
  the Chocolate Frog card → q4 (idea A) · the six obstacles → q5 · the
  teachers → q6 · who solves what → q7 (idea B) · the Mirror's rule → q8
  (idea D) · the House Cup points → q9 (Evaluate) · invent a protection → q10
  (Create) · the Mirror's inscription → q11 · the turban → q12 (idea C).

## 4. Proposed bank

**Three examples:**

1. *"What does the boy discover on his eleventh birthday?"* → **"Snape's
   puzzle is a row of seven bottles. How many hold poison?"** From the single
   most famous fact in modern children's literature to a detail that exists
   only in the novel — the film cuts the scene completely.
2. *"Match each character or place to its role in the story"* (with unnamed
   entries) → **"Match each teacher to the protection they set."** Named
   people, specific objects, and a key that requires the chapter.
3. *open: "Why do you think friendship matters when facing danger?"* →
   **"Sort each obstacle by who actually gets them past it."** The old
   question asked for a sentiment; the new classification makes the child
   prove the same point with evidence — and discover that Harry solves fewer
   of them than they remembered.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] `copyright_status: active copyright` added to the hy file, which was
      missing it
- [x] Keys checked; the one uncertain detail (exact final point totals) was
      deliberately excluded
- [x] Summary test — the summary was rewritten to name the characters, and the
      questions were re-tested against it afterwards
- [x] Film test (this book's extra check): no question in the new bank can be
      answered from the 2001 film alone
- [x] Age read-through at 8 · [x] hy / ru / en identical

## 6. Questions for Shahen

- **The title is just "Harry Potter"** in all three files, but the content —
  old and new — is entirely *Philosopher's Stone*. If you intend to add more
  books in the series, this entry should be renamed now, before children have
  history against it; if it is meant to stand for the whole series, the bank
  should say so and questions from later books would need adding.
- The Russian file uses the Rosman-era names (Снегг, Когтевран-style
  transliterations are avoided, but Снегг and Волан-де-Морт are used). If your
  readers know the Махаон translation (Злотеус Злей), the ru file needs those
  names instead. Tell me which and I will switch it.
