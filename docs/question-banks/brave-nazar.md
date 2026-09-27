# Brave Nazar: question bank analysis

Slug: `brave-nazar` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

> ⚠️ **Factual correction applied to the summaries.** All three language files
> said Nazar killed **seven flies** — that is the Grimm brothers' *Brave Little
> Tailor*, not Tumanyan. In «Քաջ Նազար» he cannot count the dead flies and
> decides there were **a thousand**, which is what the banner then says
> («Որ մին զարկի՝ ջարդի հազար»). The old bank also had him **hiding inside
> something** during the battle, which does not happen. Summaries and questions
> were both rewritten.

## 1. Book brief

- **Kind of book:** Armenian literary fairy tale (1912), short, comic, satirical.
- **Readers in this app:** about 7–12. The plot is simple; the satire rewards
  older readers.
- **Author's aim:** to laugh at how reputations are made — and at the people
  who make them — rather than at one silly man.
- **Big ideas:** **A** a reputation, once started, feeds itself · **B** the
  crowd sees what it already believes · **C** nobody in power is checked,
  because checking takes courage · **D** Nazar tells the truth ("it is all
  luck") and is not believed.
- **What children love:** the flies, riding the tiger by accident, the branch
  that terrifies an army, and the fact that he gets away with all of it.
- **Cultural context:** essential. "Քաջ Նազար" is a byword in Armenian for a
  fraud in a hero's clothes; the tale is read as political satire.

**Key scenes:** locked out overnight · the flies at dawn · the banner · the
neighbour's donkey · asleep in the tree, falling onto the tiger · the seven
giant brothers · the bolting horse and the snapped branch · the crown · "it is
all a man's luck".

**Unsure / VERIFY:** the tale exists in several retellings; the wife's exact
role in having the banner written varies, so the questions say only that the
banner "is written" for him. His wife and the giants are unnamed in the text,
so no question asks for their names.

## 2. Audit of the current bank

Checker: 4 prompt-echo keywords, 9 longest-correct options, 8 short keywords.
But the substantive problems were worse:

| # | Old question | Verdict |
|---|---|---|
| 1 | what does he kill with one swat | Replace — in the summary, and the summary was wrong |
| 2 | fillblank: flies land on his ___ | Replace — trivial, and not the memorable detail |
| 3 | why do villagers believe he is a hero | Replace — summary |
| 4 | classification: what he is vs what people think | **Fix** — good idea, replaced the vague labels with three real event pairs |
| 5 | ordering of his rise | **Fix** — kept the type, replaced items with verified events |
| 6 | matching characters to roles | **Fix** — kept, roles rewritten to be scene-specific |
| 7 | what makes his army look victorious | **Fix** — kept the idea; the old options did not include the branch |
| 8 | open: did he deserve to rule | **Fix** — kept, added the "who is to blame" half and a grading brief |
| 9 | fillblank: who wrote the tale | Replace — answerable from the cover |
| 10 | open/Create: advise Nazar | **Fix** — kept, anchored in a confession scene |
| 11 | what does the story mock | Replace — invites a memorised slogan |
| 12 | Apply: what if he had told the truth | Replace — hypothetical with no single defensible key |
| 13 | fillblank: he hides inside a ___ | Replace — **factually wrong**, this does not happen |

**Bank-level:** no question touched the tiger, the banner's actual words, the
donkey, the seven brothers or the closing line — i.e. every memorable moment
was missing, while two questions asked what the story "teaches".

## 3. Design for this book

- **Why this type mix:** the tale is a chain of misread accidents, which makes
  classification ("what happened" vs "what people believed") the single best
  instrument for it — the same three moments appear in both columns.
  Ordering carries the snowball. Three Analyze questions ask *why* the
  misreading worked, which is the satire itself.
- **Coverage map:** tiger → q1 · banner → q2 (idea A) · the count → q3 ·
  donkey → q4 · the rise → q5 (idea A) · four actors → q6 (idea B) · reality
  vs belief → q7 (idea B) · the battle → q8 · deserving the throne → q9
  (idea C) · advising Nazar → q10 · "a man's luck" → q11 (idea D) · the giants
  → q12 (idea C).

## 4. Proposed bank

**Three examples:**

1. *"What does Nazar accidentally kill with one slap while eating?"* → **"Why
   does he decide there were a thousand of them?"** The old question's answer
   was in the summary and rested on the wrong number. The new one is about the
   moment the lie is born, and the answer — he could not count them — is the
   characterisation.
2. *fillblank "During the battle Nazar hides inside a ___"* → **"…who with one
   blow smashes a ___"**. A wrong fact replaced by the most quoted line in the
   tale.
3. *"What is this story mainly mocking?"* → **classification: "what actually
   happened" vs "what people believed"**, using the tree, the horse and the
   branch. The satire is now something the child performs rather than recites.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Keys verified against hy.wikipedia and full-text sources: the banner's
      wording, the neighbour's donkey, falling from the tree onto the tiger,
      the seven giant brothers, the bolting horse and snapped branch, the
      crowning, and the closing "it is all a man's luck"
- [x] Summary test — summaries were corrected and then re-tested
- [x] Giveaway test · [x] Age read-through at 7
- [x] hy written first; ru and en translated from it

## 6. Questions for Shahen

- Worth a native check, like `anahit`: this is a school text and the old
  version had absorbed a German fairy tale's plot detail. If any other Tumanyan
  file shows the same kind of contamination I will flag it in the final summary.
