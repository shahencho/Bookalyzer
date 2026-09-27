# Emil and the Detectives: question bank analysis

Slug: `emil-and-the-detectives` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** the first modern children's detective story (1929).
  Realistic Berlin, no magic, a plot that runs on one day and one clue.
- **Readers in this app:** about 8–12.
- **Author's aim:** to write a detective story where the detectives are
  children, the city is real, and the crime is small enough to matter — a
  hairdresser's savings rather than a treasure.
- **Big ideas:** **A** a careful ordinary habit turns out to be the only
  evidence there is · **B** a child alone is helpless; a child organised with
  other children is not · **C** shame keeps Emil from asking adults for help,
  and the whole plot follows from that · **D** the adults are almost useless
  until the very end.
- **What children love:** the chocolate, the sleep, the pin holes, the crowd
  of boys appearing out of nowhere, and the moment at the bank.

**Key scenes:** the money pinned in · the compartment and the chocolate ·
waking to an empty pocket · the decision not to go to the police · getting off
the train on the thief's heels · Gustav and the gathering of the children ·
the shadowing across Berlin · the bank and the needle holes · the reward · the
grandmother's last line.

**Unsure / VERIFY:** "little Tuesday" at the telephone, the Professor, and
Gustav's horn are famous but I could not confirm them in the source I used, so
no key depends on them; Gustav appears only as "the Berlin boy who first
offers to help". The monument Emil defaced is described without naming whom it
depicts, for the same reason.

## 2. Audit of the current bank

Checker: 5 prompt-echo keywords, 16 longest-correct options — the second-worst
option-shape score in the batch. 14 questions.

| # | Old question | Verdict |
|---|---|---|
| 1 | why is Emil travelling alone | Replace — summary |
| 2 | what happens to the money on the train | Replace — summary |
| 3 | fillblank: the leader is a boy named ___ | Replace — relies on the unverified horn detail |
| 4 | why not go to the police | **Fix** — kept; one of the best questions in the old bank |
| 5 | matching characters | **Fix** — kept, roles made scene-specific |
| 6 | ordering | **Fix** — kept, items made specific |
| 7 | classification of actions | **Fix** — recast as journey vs Berlin |
| 8 | what the children discover about Grundeis | **Fix** — kept as the closing question |
| 9 | fillblank: they corner him at a ___ | Replace — weak, and the answer varies by translation |
| 10 | open: was he right not to go to the police | **Fix** — kept, grading brief added |
| 11 | what makes Gustav an effective leader | Replace — character-virtue question |
| 12 | classification of moments | Replace — duplicate of q7 |
| 13 | open/Create: one more mystery next year | Replace — needs no book; replaced with the surveillance-planning task |
| 14 | the central lesson of the book | Replace — slogan |

**Bank-level:** the needle — the single most important object in the book —
never appeared, in any of the fourteen questions. Neither did the bank scene
that resolves the plot. Two classification questions did the same job.

## 3. Design for this book

- **Why this type mix:** a detective story should test the clue, so two
  questions (q1 and q4) bracket the needle and one Analyze question asks why
  it works structurally. Ordering suits a one-day plot. The Create task asks
  the child to plan surveillance, which is what the book is actually about, and
  cannot be answered by someone who has not seen the children organise.
- **Coverage map:** the pinned money → q1 (idea A) · the police decision → q2
  (idea C) · Grundeis → q3 · the bank → q4 (idea A) · the day → q5 · four
  people → q6 (idea D) · journey vs Berlin → q7 (idea B) · why the needle
  matters → q8 (idea A) · was he right → q9 (Evaluate, idea C) · plan a tail →
  q10 (Create, idea B) · the grandmother's rule → q11 · the gang → q12.

## 4. Proposed bank

**Three examples:**

1. *"What happens to Emil's money on the train?"* → **"What does Emil do to
   keep the money safe?"** The old question restates the summary; the new one
   asks for the detail the entire plot resolves on, and its explanation points
   out how Kästner plants it.
2. *"What is the central lesson of Emil and the Detectives?"* → **"Why does
   the needle matter so much to the way this story works?"** A moral slogan
   replaced by a genuine question about construction, at the same Bloom level
   but with a defensible key.
3. *open/Create: "imagine they solve one more mystery next year"* → **"plan
   two things you would organise in advance to follow someone unnoticed."**
   The old task could be answered by any child with an imagination; the new one
   rewards having watched how the Berlin children actually worked.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Keys verified: 140 marks pinned with a sewing needle, Grundeis and the
      chocolate, the red-painted monument nose and the Neustadt policeman,
      Gustav, Pony Hütchen fetching the police, the needle holes as proof, the
      thousand-mark reward, the bank-robber gang, the grandmother's advice
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 8
- [x] hy / ru / en identical

## 6. Questions for Shahen

- The author field in the hy and ru files was "Erich Kästner" in Latin script;
  I have set it to «Эрих Кёстнер» and «Էրիխ Քեստներ» respectively. If the app
  displays the author from a single language file, this will now differ by
  language — worth confirming which file the UI reads.
