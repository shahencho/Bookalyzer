# Question bank quality playbook

**How to use.** Rewrite one book per session. Start a session with:

> Follow `docs/question-banks/README.md` for **`<slug>`**.

The session produces `docs/question-banks/<slug>.md`, a per-book analysis
from [_TEMPLATE.md](_TEMPLATE.md), and stops for review. The content files are
changed only after the analysis is approved. The worked example is
[the-little-prince.md](the-little-prince.md).

The existing banks were bulk-generated from one pattern. **Do not bulk-fix
them with another pattern.** Every book gets its own analysis: a picture book
for 4-year-olds, an Armenian national epic and Anne Frank's diary need
different banks.

---

## 1. What a question bank is for

In priority order, a good bank:

1. **Rewards reading, not guessing.** A child who read the book does well. A
   child who read only the summary, saw the cover or knows the film does not.
2. **Brings the child back to what the book means.** Most questions touch one
   of the book's big ideas, not only plot trivia. The `explanation` shown after
   answering should teach something: *why* this matters in the story.
3. **Is enjoyable for this age.** Questions use the book's humour, suspense
   and favourite moments, and ask about the child's own life where it fits
   ("what would *you* do…"). A question should feel like talking about a book
   you loved, not like an exam.
4. **Is correct, in all three languages.** Every answer key matches the text.
   Every distractor is clearly wrong for a reader.

### How the bank is used (design constraints)

| Fact | Consequence for authors |
|---|---|
| Each attempt shows **6 random questions** from the bank. There is no type or Bloom balancing ([lib/rotation.ts](../../lib/rotation.ts)). | Every question must stand alone. Any random 6 should feel varied, so the bank as a whole must be balanced. |
| A retake excludes the previous attempt's questions where possible. | 10–15 questions, all distinct. Weak filler questions come up in retakes. |
| Two questions can appear in the same attempt. | **No question may give away another's answer** (a clue in one prompt that answers another). |
| MC options, matching answers, classification items and ordering items are **shuffled at import** ([scrambleOptions.ts](../../lib/content/scrambleOptions.ts)). | The position of the correct option doesn't matter. Its **length and wording** still do. |
| Changing a question's `prompt` archives the old question and creates a new one. | That's fine for rewrites. It only resets per-question history. |
| Open answers: **every answered open question is graded by the LLM**, using the `explanation` as the "expected idea" and the keywords as hints. Keywords are also the fallback score if the LLM is unavailable. Whole-word matching, so `друг` no longer fires inside `другими`. The schema requires at least 1 keyword. | Keywords must be rare, specific evidence, because they are what the grader sees as a hint and what saves the question in LLM-down fallback. Never use a word from the prompt. Write the `explanation` as a grading brief — it now carries most of the weight. |
| Fillblank: exact match after normalisation, plus `altAnswers`. No LLM. | Follow [answer-variants-guide.md](../answer-variants-guide.md). |
| Crossword: exact match per word. The grid is per language. | Each language needs its own valid grid. |

---

## 2. The per-book workflow

### Stage 1: Understand the book (before looking at the current questions)

Write the **Book brief** section of the per-book md. This is the most
important stage. Everything else is derived from it.

- **What kind of book it is**: picture book, fable, fairy tale, novel, epic,
  diary, mystery, adventure series and so on, plus its length and reading
  level.
- **Who reads it**: the realistic age range in this app. It decides vocabulary,
  option length and how abstract questions can be. A 5-year-old answering about
  the Gruffalo needs short concrete options. A 13-year-old reading Anne Frank
  can handle "Do you agree…?".
- **Why the book exists**: the author's aim in one or two sentences. Examples:
  "a satire of adult priorities", "national memory of the Battle of Avarayr",
  "a counting and days-of-the-week picture book".
- **3–5 big ideas** a child should take away.
- **What children love about it**: the funny scenes, the scary ones, the
  favourite character, the famous line. Good questions live here.
- **8–15 key scenes**, each tagged with the big idea it carries. A scene may
  carry no big idea if it is simply loved.
- **Cultural context** where it matters: Armenian classics (Tumanyan, Raffi,
  Bakunts, Demirchyan, the Sassoun epic) and Soviet-era Russian classics carry
  meaning that a generic Western question pattern misses.
- **What you are unsure of.** Don't guess at plot details. If you can't verify
  a detail, don't build a question on it, or mark it `VERIFY` for Shahen.
  **A wrong answer key is worse than a missing question.**

### Stage 2: Audit the current bank (all three languages)

1. Run `npx tsx scripts/check-question-bank.ts <slug>` and paste the findings.
2. Give each question a verdict: **Keep / Fix / Replace**, with one reason.
   Use the anti-pattern list in section 4.
3. Bank-level findings:
   - Which big ideas are missing?
   - Which scenes or characters are over-used, and which are never used?
   - Are the Bloom labels honest?
   - Do the hy/ru/en versions differ (a translation error, or a different
     question)?

### Stage 3: Design the bank *for this book*

There is no fixed type mix. Choose types because the book invites them:

| Book trait | Question types that fit |
|---|---|
| Cumulative or sequential story (Gruffalo, Caterpillar, fables) | ordering, fillblank on the refrain, simple mc |
| Many distinct characters (Oz, Little Prince, Nils, Emil) | matching, "which character would…" Apply mc |
| Mystery or detective (Sherlock, Emil and the Detectives) | mc on clues and inference (Analyze), "how did he know…" open |
| Moral or inner change (Secret Garden, Pollyanna, Happy Prince) | ordering of the character's change, Evaluate open |
| Epic, history or identity (David of Sassoun, Vardanank) | the values of the heroes, cause and consequence, "why is this remembered" |
| Diary or real events (Anne Frank) | empathy, perspective and historical understanding; careful tone |
| Humour and mischief (Emil, Karlsson, Pippi, Prostokvashino) | Apply and Create questions that let the child play in the book's world |

Then draw a **coverage map**: scene → big idea → question. Each scene is the
subject of at most one question. The bank should cover most of the big ideas
and several of the loved moments. Keep a healthy spread of Bloom levels; for
the youngest books, Remember/Understand can be the majority.

### Stage 4: Write the questions

- Write in the book's **original language first**, then translate. Armenian:
  Tumanyan, Aghayan, Raffi, Bakunts, Demirchyan, Sassoun. Russian: Buratino,
  Crooked Mirrors, Emerald City, Neznaika, Prostokvashino. All others: English.
- Use the character names from the standard translation children actually read
  in each language.
- A translation must be a *correct question in that language*. Check fillblank
  grammar, and build a new crossword grid.
- Apply the quality bar in section 3.

### Stage 5: Verify

- `npx tsx scripts/check-question-bank.ts` on each proposed file: **0 ERRORs**,
  and every WARN either fixed or explained.
- Check **every answer key against the text**, not memory. Chronology is a
  common trap: narrative order is not the same as event order.
- **Summary test:** can someone who read only `short_summary` answer this? If
  yes, rewrite or drop it (except the 1–2 central questions).
- **Giveaway test:** does any prompt, clue or option reveal another question's
  answer?
- **Age read-through:** read every question as the youngest reader of this
  book.

### Stage 6: Apply (after approval)

Replace the three `content/books/<slug>.*.json` files, run
`npm run import-content content/books/<slug>.hy.json content/books/<slug>.ru.json content/books/<slug>.en.json`,
and update the tracker at the bottom of this file.

---

## 3. Quality bar (per question)

1. **It needs the book.** It shouldn't be answerable from the title, cover,
   summary or general knowledge.
2. **It is anchored in one scene** and says which one ("When the narrator was
   six…"). Vague prompts invite vague answers.
3. **The key is true to the text.** Anything debatable becomes an open question.
4. **Distractors are plausible in this story's world and defensibly wrong.**
   Nothing absurd and nothing half-true. Strong distractors come from real
   events in the book that answer a *different* question.
5. **No shape giveaways.** Options should be similar in length (within about
   30%) and grammatical form. No word should echo from the prompt into only the
   correct option. Avoid "all/never" extremes in distractors only.
6. **The Bloom level is honest.** If the book states the answer, the level is
   Remember or Understand, even if the prompt says "why".
7. **Classification only for a natural split** in the story (home/away,
   before/after, did/didn't), with at least 5 mixed items. No moral sorting of
   ambiguous characters.
8. **Ranking only when the text establishes the order.** An opinion scored as
   fact is not acceptable. Make it an open Evaluate question instead.
9. **Crossword:** 5–7 words, all connected, with clues from moments not used by
   other questions. Clues should require the book, not a dictionary.
10. **Open questions:** the prompt asks for one clear thing. Keywords are rare,
    specific evidence. The `explanation` says what a strong answer contains and
    which positions are acceptable.
11. **The explanation teaches.** Two or three sentences: the answer, *and* why
    it matters in the story or how it links to a big idea.
12. **Tone:** warm, curious, respectful of the child. For hard themes (war,
    death, loss), be honest and gentle, and ask for understanding, not graphic
    detail.

---

## 4. Anti-patterns (seen in the bulk banks)

| Anti-pattern | Example | Fix |
|---|---|---|
| Summary-level trivia | "Where does the pilot meet the prince?" (Sahara, first line of the summary) | Ask about a scene only readers know |
| Wrong chronology | Ordering puts pilot before fox; the prince met the fox first | Verify against the text; state "in the order they happen" vs "in the order the book tells them" |
| Keyword-echo matching | "The Fox" ↔ "being tamed" | Paraphrase the right-hand side; use less famous characters |
| Longest option is correct | 75% of MC across the corpus | Equalise lengths; trim the correct option |
| Forced moral binary | The Rose in "understands what matters" | Natural split, or drop it |
| Opinion scored as fact | Ranking grown-ups by "understanding" | Open Evaluate question |
| Same character everywhere | The businessman in 5 of 12 questions | One scene per question; coverage map |
| Prompt words as keywords | `planet` in "invent a planet" | Keywords must not appear in the prompt |
| Short keywords | `time`, `care`, `love`, `друг`, `սեր` | Phrases or 5+ letter words; rare evidence |
| Disconnected crossword | STAR crosses nothing; the ru grid has a letter clash | Build a real grid; run the checker |
| Cross-question giveaway | The crossword clue "What the prince asks the pilot to draw" while an MC asks about the sheep drawing | Clue a different moment |
| Same template for every book | A Create question "invent another X" everywhere | Derive the type mix from the book (Stage 3) |

---

## 5. Open decisions (for Shahen)

- ~~**Allow `keywords: []` for Create/Evaluate?**~~ **Settled 2026-09-27:** every
  open answer now goes to the LLM regardless of keywords, so keywords are hints
  plus an LLM-down fallback score. The schema still requires at least 1, which
  is worth keeping for exactly that fallback.
- **Target age per book.** There is no age field in the schema. The brief
  records it for now. Consider adding one if the library will filter by age.
- **Ranking type.** Few books support a text-based ranking. Allow banks without one?
- `happy-prince` and `happy-prince-and-other-tales` overlap. Their banks must
  not duplicate each other's questions.

---

## 6. Tracker

Status: `—` not started · `analysis` md written, awaiting review ·
`approved` · `applied` content files updated and imported.

| Slug | Title | Original lang | Status |
|---|---|---|---|
| a-little-princess | A Little Princess | en | applied |
| alice-in-wonderland | Alice's Adventures in Wonderland | en | applied |
| anahit | Anahit (Aghayan) | hy | applied |
| anne-frank-diary | The Diary of a Young Girl | en* | applied |
| anne-of-green-gables | Anne of Green Gables | en | applied |
| ballet-shoes | Ballet Shoes | en | applied |
| brave-nazar | Brave Nazar (Tumanyan) | hy | applied |
| buratino | The Golden Key, or The Adventures of Buratino | ru | applied |
| carpathian-castle | The Carpathian Castle | en* | applied |
| charlie-and-the-great-glass-elevator | Charlie and the Great Glass Elevator | en | applied |
| coraline | Coraline | en | applied |
| crooked-mirrors | The Kingdom of Crooked Mirrors | ru | applied |
| david-of-sassoun | David of Sassoun | hy | applied |
| emerald-city | The Wizard of the Emerald City | ru | applied |
| emil-and-the-detectives | Emil and the Detectives | en* | applied |
| emil-of-lonneberga | Emil of Lönneberga | en* | applied |
| fox-without-a-tail | The Fox Without a Tail (Tumanyan) | hy | applied |
| gikor | Gikor (Tumanyan) | hy | applied |
| happy-prince-and-other-tales | The Happy Prince and Other Tales | en | applied |
| harry-potter | Harry Potter | en | applied |
| heidi | Heidi | en* | applied |
| karlsson | Karlsson-on-the-Roof | en* | applied |
| mio-my-mio | Mio, My Son | en* | applied |
| mowgli | Mowgli | en | applied |
| neznaika | Neznaika's Adventures | ru | applied |
| nils-wonderful-adventures | The Wonderful Adventures of Nils | en* | applied |
| peter-pan | Peter Pan | en | applied |
| pinocchio | The Adventures of Pinocchio | en* | applied |
| pippi-longstocking | Pippi Longstocking | en* | applied |
| pollyanna | Pollyanna | en | applied |
| prostokvashino | Holidays in Prostokvashino | ru | — |
| sherlock-holmes-adventures | The Adventures of Sherlock Holmes | en | — |
| skellig | Skellig | en | — |
| the-bear-and-the-fox | The Bear and the Fox (Tumanyan) | hy | — |
| the-dog-and-the-cat | The Dog and the Cat (Tumanyan) | hy | — |
| the-graveyard-book | The Graveyard Book | en | — |
| the-gruffalo | The Gruffalo | en | — |
| the-happy-prince | The Happy Prince | en | — |
| the-hobbit | The Hobbit | en | — |
| the-little-prince | The Little Prince | en* | analysis (en draft; hy/ru pending) |
| the-madman-raffi | The Madman (Raffi) | hy | — |
| the-owl-service | The Owl Service | en | — |
| the-railway-children | The Railway Children | en | — |
| the-secret-garden | The Secret Garden | en | — |
| the-very-hungry-caterpillar | The Very Hungry Caterpillar | en | — |
| the-white-horse-bakunts | The White Horse (Bakunts) | hy | — |
| tom-sawyer | The Adventures of Tom Sawyer | en | — |
| treasure-island | Treasure Island | en | — |
| twenty-thousand-leagues | Twenty Thousand Leagues Under the Sea | en* | — |
| vardanank | Vardanank (Demirchyan) | hy | — |
| white-fang | White Fang | en | — |
| winnie-the-pooh | Winnie-the-Pooh | en | — |
| wizard-of-oz | The Wonderful Wizard of Oz | en | — |

\* Originally written in another language (French, German, Swedish, Dutch or
Italian). Author in English, but check names against the standard Russian and
Armenian translations; Russian children often know these books under different
names (e.g. Karlsson, Nils, Pinocchio vs Buratino).
