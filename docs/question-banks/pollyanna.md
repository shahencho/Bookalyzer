# Pollyanna: question bank analysis

Slug: `pollyanna` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** Porter's 1913 novel, public domain. Sentimental in reputation
  and a good deal tougher in fact — the word "Pollyanna" has come to mean
  something the book itself never says.
- **Readers in this app:** about 9–13.
- **Author's aim:** to show a game invented for hard things actually being used
  on hard things — and then to take it away from the child who invented it.
- **Big ideas:** **A** the glad game has a concrete, unhappy origin: crutches
  instead of a doll · **B** Aunt Polly acts from duty, never affection, and the
  bare attic room says so before she does · **C** Pollyanna does not preach the
  game, she leaks it — each adult catches it differently · **D** after the
  accident she cannot play at all, and the town has to play it back at her.
- **What children love:** the freckles and the missing looking-glass, Jimmy
  Bean, the prisms making rainbows on Mrs. Snow's wall, and the letter at the end.

**Key scenes:** the arrival and the attic room · Nancy finding her crying on the
floor · the crutches in the missionary barrel · calf's-foot jelly for Mrs. Snow ·
Jimmy Bean and the Ladies' Aid who prefer a boy in India because he counts in
the report · Mr. Pendleton found in the woods with a broken leg · the prisms ·
the minister and the eight hundred rejoicing texts · the automobile · the
townspeople at Aunt Polly's door · Dr. Chilton · the final letter, six steps.

**Unsure / VERIFY:** none — everything above was grepped in Gutenberg ebook
1450, including the crutches ("we began it on some crutches that came in a
missionary barrel"), the looking-glass and freckles, the report line, the prism
chapter, the eight hundred rejoicing texts, and the closing letter with the six
steps and the wedding beside the bed.

## 2. Audit of the current bank

| # | Old question | Verdict |
|---|---|---|
| 1 | what game did her father teach her | Replace — the summary answers it |
| 2 | fillblank: something to be ___ about | Replace — the word is in the prompt |
| 6 | the game has one rule — what is it? | Replace — same fact a third time |
| 7 | fillblank: learns the game from her ___ | Replace — same fact a fourth time |
| 3 | ordering "these events" | **Fix** — rebuilt from the real chapters |
| 4 | classification of characters | **Fix** — became the four-person matching |
| 8 | ordering the town's changing attitude | Delete — invented, not in the book |
| 9 | matching "how the game changes them" | **Fix** — kept, made concrete |
| 10 | classification "sort each response" | **Fix** — became game asks / does not ask |
| 5 | open: is the glad game healthy | **Fix** — kept, now anchored in the book |
| 11 | open: try the glad game yourself | Replace — about the child, not the book |

**Bank-level:** four of eleven questions asked the same fact — what the glad
game is — and the bank contained **no** proper noun other than Pollyanna. No
Aunt Polly, no attic, no crutches, no Mrs. Snow, no Jimmy Bean, no Mr.
Pendleton, no accident, no Dr. Chilton. Both open questions were the "is
optimism good?" essay, which a child can write without opening the book, and
the second one was not about the book at all.

## 3. Design for this book

- **Why this type mix:** the failure to correct was repetition, so the new bank
  spends its thirteen slots on thirteen different things. The crutches get the
  one fillblank they deserve (idea A) and are then never asked again. The
  classification is the most useful question in the bank: it sorts what the game
  **does** ask from what people assume it asks, and every group-B item is one the
  book itself contradicts — which is exactly the ammunition the Evaluate question
  then needs. The Ladies' Aid question was added because it is the sharpest moral
  moment in the book and no bank had ever touched it.
- **Coverage map:** the attic room → q1 (B) · the crutches → q2 (A) · the
  looking-glass → q3 (A) · duty → q4 (B) · the chapter order → q5 · four adults
  → q6 (C) · what the game does and does not ask → q7 · the report → q8 · the
  automobile → q9 · the town playing it back → q10 (D) · Dr. Chilton → q11 ·
  pretending vs surviving → q12 (Evaluate) · a new visit → q13 (Create).

## 4. Proposed bank

**Three examples:**

1. *"What game did Pollyanna's father teach her?"* → **"The glad game began with
   a missionary barrel. Pollyanna asked for a doll, and what came instead was a
   pair of ___."** The old question is answered by the book's own blurb; the new
   one requires the origin scene, which is the thing that makes the game
   defensible at all.
2. *"Sort each response into the right group."* → a six-item sort between **what
   the glad game really asks you to do** and **what it does not** — the second
   group being "pretend nothing bad has happened", "never cry", "tell other
   people they must be glad". Those three are what the word "Pollyanna" means in
   ordinary speech, and the book disproves each one.
3. *open: "Try the glad game yourself: think of something recently that felt
   hard…"* → **"Invent one new person in the town for her to visit… it must be
   something small and true, not a promise that everything will get better."**
   The old version was a diary prompt. The new one has a rule that only a reader
   can follow, and the grading brief says so.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Every key grepped in Gutenberg ebook 1450
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 9
- [x] hy/ru titles kept: «Փոլիաննա», «Поллианна»
- [x] `copyright_status: public domain` added to all three files, which were all
      missing it
- [x] Author localised: Элинор Портер, Էլինոր Փորթեր

## 6. Questions for Shahen

- The bank now includes the accident and the possibility that Pollyanna will
  never walk, because without it the glad game looks like cheerfulness rather
  than endurance. If that is too heavy for the younger end of the audience, q9
  and q10 are the two to cut — but cutting them takes idea D out of the bank
  entirely.
