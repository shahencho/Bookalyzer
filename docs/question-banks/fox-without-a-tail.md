# The Fox Without a Tail: question bank analysis

Slug: `fox-without-a-tail` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

> ⚠️ **Wrong story.** All three files told **Aesop's** fable of the fox who
> loses her tail in a trap and tries to persuade the other foxes to cut theirs
> off — a story of vanity, exposed by an old fox at a meeting. Tumanyan's
> «Պոչատ աղվեսը» is a completely different tale: a **cumulative chain story**
> in which a fox drinks an old woman's milk, has her tail cut off, and must
> work her way along a chain of exchanges (cow → field → spring → girl →
> walnut tree → hen → miller) to earn it back. There is no meeting, no speech
> and no old fox. Summaries and all twelve questions were rewritten.

## 1. Book brief

- **Kind of book:** Armenian cumulative folk tale, retold by Tumanyan; first
  printed in the *Lusaber* reader in 1908. Very short, highly repetitive,
  built to be read aloud.
- **Readers in this app:** about 5–9 — the youngest book in this batch.
- **Author's aim:** to give small children the pleasure of a pattern they can
  predict and join in with, and, underneath it, a picture of how everything
  depends on everything else.
- **Big ideas:** **A** shame, not pain, is what drives the fox · **B** nobody
  in the chain is cruel; each simply needs something first · **C** the chain
  only moves when one person (the miller) gives without asking · **D** put
  back what you took.
- **What children love:** the repetition, the chant, and guessing who will be
  asked next.
- **Cultural context:** this is an early-reader staple in Armenian schools;
  the cumulative form is shared with a family of Armenian chain tales.

**Key scenes:** the stolen milk · the cut tail · the old woman's condition ·
cow, field, spring, girl, walnut tree, hen · the miller's free grain · the
chain unwinding · the tail returned.

**Unsure / VERIFY:** the fox's repeated rhyming plea differs between printings,
so no question quotes it. The order of the chain is taken from the Armenian
sources and is the one used in the ordering question.

## 2. Audit of the current bank

The checker was clean on errors (0) — this was the only book in the batch with
no ERRORs at baseline — and that is exactly why a mechanical check is not
enough: every question was well-formed and about the wrong story.

| # | Old question | Verdict |
|---|---|---|
| 1 | how does the fox lose her tail (a hunter's trap) | Replace — **wrong**: the old woman cuts it off |
| 2 | why does she call a meeting of the foxes | Replace — **no meeting in the tale** |
| 3 | open: why does she want the others to cut theirs off | Replace — invented premise |
| 4 | the real reason behind her speech | Replace — invented |
| 5 | ordering | Replace — items were Aesop's |
| 6 | matching characters | Replace — the cast does not exist |
| 7 | fillblank: a tail is nothing but a ___ | Replace — invented line |
| 8 | classification | Replace |
| 9 | who sees through the trick | Replace — invented character |
| 10 | what question exposes the trick | Replace — invented |
| 11 | open/Create: what would you say back | Replace — invented premise |
| 12 | what lesson does this fable teach | Replace — slogan, and the wrong fable |

## 3. Design for this book

- **Why this type mix:** a cumulative tale is the ideal ordering question —
  the chain has one correct sequence and a child who listened can reproduce
  it. Matching pairs each helper with its demand. The classification splits the
  journey out from the journey back, which is the structural point of the
  form. Two Analyze questions ask *why* the chain behaves as it does, which is
  the only abstract thinking a five-year-old needs here.
- **Coverage map:** the stolen milk → q1 (idea D) · the shame → q2 (idea A) ·
  the condition → q3 (idea D) · the chain → q4 · the demands → q5 (idea B) ·
  out and back → q6 · why the chain sticks → q7 (idea B) · the miller → q8
  (idea C) · was the punishment fair → q9 (Evaluate) · invent a link → q10
  (Create) · the hen's grain → q11 · the unwinding → q12.

## 4. Proposed bank

**Three examples:**

1. *"How does the fox lose her tail?" → "in a hunter's trap"* → **"How does the
   whole story begin?" → "She drinks the old woman's milk."** The old key was
   simply false for this book.
2. *"Who sees through the fox's trick at the meeting?"* → **"Who is the only
   one who gives the fox something without asking for anything back?"** An
   invented character replaced by the moment the story actually turns.
3. *"What lesson does this fable teach?"* → **"Why does the fox have to reach
   the very last link before she gets anything?"** A slogan replaced by the
   question that explains the shape of the whole tale, answerable only by a
   child who followed the chain.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Chain order and every demand verified against Armenian sources for
      Tumanyan's «Պոչատ աղվեսը» (1908, *Lusaber*)
- [x] Summary test — summaries replaced entirely, then re-tested
- [x] Giveaway test · [x] Age read-through at 5
- [x] hy written first; ru and en translated from it. The hy title was already
      «Պոչատ աղվեսը» — only the *story* was wrong. The ru and en titles
      («Лиса без хвоста», "The Fox Without a Tail") work as translations of
      it and were kept.

## 6. Questions for Shahen

- **This is the fourth wrong-story case and the most instructive one:** the
  Armenian title was right all along, and only the content had drifted into a
  different, more famous fable. The checker reported zero errors on it. It is
  worth assuming that any book whose title has a well-known Aesop or Grimm
  twin may have the same problem — I will watch for it in the remaining books.
