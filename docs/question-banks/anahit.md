# Anahit: question bank analysis

Slug: `anahit` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

> ⚠️ **This book's content was not merely weak — it was the wrong story.** All
> three language files described a Cinderella plot (wicked stepmother, cruel
> stepsisters, a wise old woman in the forest, a magic blessing, becoming
> queen) that does not occur anywhere in Aghayan's tale. The summaries and all
> 12 questions were fabricated. Summaries were rewritten too, not just the bank.

## 1. Book brief

- **Kind of book:** Armenian literary fairy tale (1881), medium length, set in
  the old kingdom of Aghvank. Prose, folk register, one strong heroine.
- **Readers in this app:** about 8–13.
- **Author's aim:** to argue — in a story children will remember — that a
  craft is worth more than rank, and that wisdom is found in a herdsman's
  house as readily as in a palace.
- **Big ideas:**
  - **A:** fortune changes; a skill in your hands does not.
  - **B:** wisdom and character outrank birth (a herdsman's daughter sets
    terms to a prince, and is right).
  - **C:** a woman in this tale does not wait to be rescued — she decides and
    acts.
  - **D:** work has dignity; living off others' forced labour is the story's
    real evil.
- **What children love about it:** the pitcher emptied five or six times, a
  prince at a weaver's loom, and the secret message hidden in the pattern of
  a cloth.
- **Cultural context:** essential. This is a set text in Armenian schools and
  the source of the proverb about craft being a golden bracelet. The Cinderella
  version that was in the files would be immediately recognised as wrong by any
  Armenian parent.

**Key scenes:**

| # | Scene | Big idea |
|---|---|---|
| S1 | The spring at Hatsik: the pitcher emptied five or six times | B |
| S2 | The messengers; Anahit's condition — "let him first learn a craft" | A |
| S3 | Vachagan at the loom, learning to weave dipak | A, D |
| S4 | The wedding |  — |
| S5 | People vanish from the kingdom; Vaghinak disappears | — |
| S6 | Vachagan tricked underground at Peroz; captives forced to work | D |
| S7 | The message woven into the pattern; sold only at the palace | A |
| S8 | Anahit raises troops and frees every captive | C |

**Unsure / VERIFY:** The dog's name appears as both Զանգ and Զանգի in
different retellings, and the city is spelled Պերոզ/Պերոժ — **no question
depends on either**. The proverb «Արհեստն ոսկե ապարանջան է» is strongly
associated with the tale but I could not confirm its exact wording in the
primary text, so the fillblank uses the verified sentence («թող նախ և առաջ մի
___ սովորի») instead of the proverb.

## 2. Audit of the current bank

Checker found 4 prompt-echo keywords and 12 longest-correct options across the
three languages — but those were the least of it. Every one of the 12 questions
referred to events that do not exist in the book:

| # | Old question | Verdict |
|---|---|---|
| 1 | "Who does Anahit live with?" → wicked stepmother | Replace — no stepmother in the tale |
| 2 | fillblank: gathering firewood in the forest | Replace — invented |
| 3 | why the old woman blesses her | Replace — no old woman |
| 4 | classification: Anahit vs her stepsisters | Replace — no stepsisters |
| 5 | ordering: chores → forest → blessing → queen | Replace — invented arc |
| 6 | matching: stepmother, old woman, "ruler of the land" | Replace — invented cast |
| 7 | open: was it fair the stepsisters did not become queen | Replace — invented |
| 8 | why Anahit was chosen over the stepsisters | Replace — invented |
| 9 | fillblank: who wrote the tale | Replace — answerable from the cover |
| 10 | open: what would you do for your village as queen | Replace — wrong premise |
| 11 | "what lesson does the story teach" | Replace — generic, no book needed |
| 12 | fillblank: the stepsisters' cruelty becomes ___ | Replace — invented |

**Bank-level:** nothing salvageable. Verified against Armenian Wikipedia,
Wikisource and Armenian children's-literature sources before rewriting.

## 3. Design for this book

- **Why this type mix:** a tale built on one argument (learn a craft) that is
  tested by later events → the bank is built as a chain: the condition, the
  craft, the disaster, the rescue. Classification splits on the wedding, which
  is the tale's hinge. Two Analyze questions ask *why the condition mattered*
  and *how the craft actually worked* — the two things a child who only heard
  the plot would miss. No crossword (three scripts, no natural word set); no
  ranking (the text establishes no order to rank).
- **Coverage map:** S1→q1, S2→q2 and q8, S3→q3, S1–S8→q4 (ordering), cast→q5,
  hinge→q6, S7→q7, S2→q9 (Evaluate), reader's own life→q10, Hatsik→q11, S8→q12.

## 4. Proposed bank

Files: `anahit.{hy,ru,en}.proposed.json`, written in Armenian first and then
translated, as the playbook requires for Armenian originals.

**Three examples:**

1. *"Who does Anahit live with at the start?" → "her wicked stepmother and
   stepsisters"* → **"At the spring, why does Anahit empty the pitcher five or
   six times before letting Vachagan drink?"** From a fabricated fact to the
   most famous scene in the tale, which shows exactly why the prince wants
   her: she is thinking about him, not flattering him.
2. *fillblank "Anahit meets the old woman while gathering ___ in the forest"*
   → **"let him first of all learn a ___"** — the sentence the whole tale turns
   on, quoted from the text.
3. *open: "Was it fair that the stepsisters did not become queen?"* →
   **"Anahit refused the prince until he learned a craft. Was she right, or
   was it too hard a condition?"** A real judgement about a real choice, with
   an explanation that tells the grader both answers can score full marks.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Keys checked against hy.wikipedia, hy.wikisource and Armenian
      children's-literature sources; uncertain details excluded (see VERIFY)
- [x] Summary test — and note the summaries themselves were replaced, so the
      new questions are not answerable from them either
- [x] Giveaway test
- [x] Age read-through at 8
- [x] hy written first; ru and en are translations of it

## 6. Questions for Shahen

- **Please spot-check this one.** It is the book where I had the least prior
  certainty and where the old content was completely invented, so a native
  reading of the Armenian file is worth your time.
- The other Armenian originals in the list (`brave-nazar`, `fox-without-a-tail`,
  `david-of-sassoun`, `the-madman-raffi`, `the-white-horse-bakunts`,
  `vardanank`, `the-bear-and-the-fox`, `the-dog-and-the-cat`) may have the same
  problem. I am checking each against sources as I reach it and will report any
  further wrong-story cases in the final summary.
