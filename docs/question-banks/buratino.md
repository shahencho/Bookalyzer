# The Golden Key, or The Adventures of Buratino — question bank analysis

Slug: `buratino` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** Russian fairy-tale novel (1936), fast, funny, short
  chapters. Tolstoy's free retelling of *Pinocchio* — and deliberately not the
  same story: Buratino never becomes a real boy and never really reforms.
- **Readers in this app:** about 6–11.
- **Author's aim:** an adventure in which cheerful, reckless cheek beats
  cruelty and greed — and where the prize is a theatre of one's own rather
  than a moral transformation.
- **Big ideas:** **A** the world is full of people who will take advantage of
  you if you are in a hurry · **B** friends, not cleverness, get Buratino out
  of every trap · **C** what Karabas hoards, the puppets end up owning
  together · **D** the reward is work you choose, not treasure.
- **What children love:** the nose, the four soldi, "kreks, feks, peks", the
  tavern, Artemon fighting, Tortila, the door behind the hearth.
- **Cultural context:** for Russian-speaking children this is a shared
  reference: Papa Carlo, Karabas, the Field of Miracles and "the wooden boy"
  are everyday sayings.

**Key scenes:** the talking log and Giuseppe · the jacket and the alphabet
book · the puppet show · Karabas and the five coins · the fox and the cat ·
the tavern · hung from the oak · Malvina's lesson and the cupboard · the
Field of Miracles · Tortila and the key · the door behind the painted hearth.

**Unsure / VERIFY:** none. Giuseppe's nickname, the jacket, five coins, the
magic words, Tortila's key and the theatre behind the door were all confirmed.

## 2. Audit of the current bank

Only 10 questions (below the 10–15 comfort zone once you remove duplicates),
**two of them both matching questions** (q3 and q8) and largely overlapping.
Checker: 4 prompt-echo keywords, 7 short keywords, 4 longest-correct options.

| # | Old question | Verdict |
|---|---|---|
| 1 | what is Buratino carved from | Replace — first line of the summary |
| 2 | fillblank: sells the alphabet to buy a ticket to the ___ theatre | Replace — summary |
| 3 | matching characters/objects to roles | Replace — duplicate of q8 |
| 4 | open: what lesson does he learn from being tricked | Replace — invites a moral slogan; the book pointedly does not reform him |
| 5 | what do the tricksters call the place | Replace — "Field of Miracles" is in the summary |
| 6 | fillblank: behind the hearth there is a secret ___ | Replace — summary |
| 7 | ordering of the first day | **Fix** — kept the type, extended across the whole book |
| 8 | matching characters to roles | **Fix** — kept one matching, with four minor characters instead |
| 9 | classification: would this please Papa Carlo | Replace — moral sorting, ambiguous |
| 10 | open: what would you do if a stranger promised a money tree | **Fix** — replaced with a Create question rooted in the secret door |

**Bank-level:** Giuseppe, Duremar, Artemon, Tortila, Pierrot and the golden key
itself were all missing, while two questions asked the same matching task. The
ending — a theatre rather than treasure, which is the whole point — was untested.

## 3. Design for this book

- **Why this type mix:** a chase plot with a long chain of causes suits
  ordering, and the large comic cast suits one (not two) matching questions.
  Classification contrasts Buratino with Pierrot, which is how Tolstoy builds
  his comedy. Two Analyze questions ask *why* Karabas behaves as he does,
  which is the hidden spine of the plot and invisible to a summary-reader.
- **Coverage map:** Giuseppe → q1 · the jacket → q2 · the magic words → q3 ·
  Karabas's change of heart → q4 (idea A) · the chain of adventures → q5 ·
  four minor characters → q6 (idea B) · Buratino vs Pierrot → q7 · the key's
  value → q8 (idea C) · the sold alphabet book → q9 (Evaluate) · your own
  secret door → q10 (Create) · Tortila → q11 · the theatre → q12 (idea D).

## 4. Proposed bank

**Three examples:**

1. *"What is Buratino carved from?"* → **"Where did Papa Carlo get the talking
   log?"** The first is the summary's opening clause; the second needs chapter
   one, and its explanation makes the nice point that Buratino has two makers.
2. *"What lesson does Buratino learn from being tricked?"* → **"Was Buratino
   right to sell the alphabet book?"** The old question assumes a moral arc the
   book refuses to supply. The new one asks the child to judge, and the grading
   brief says both verdicts can score full marks.
3. *"Behind the painted hearth there is a secret ___"* → **"What turns out to
   be behind the secret door?"** with distractors of treasure, a passage and a
   workshop. The answer — a theatre, not gold — is the point of the book, and
   the old fillblank gave it away from the summary.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] Every key verified: Giuseppe "Sizy Nos" and the log, the only jacket,
      five gold coins and Karabas's near-slip, "kreks, feks, peks", Tortila
      holding the key Karabas dropped, the theatre behind the door
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 6
- [x] ru written first (original language), then hy and en

## 6. Questions for Shahen

- The ru file lists the author as "Alexey Tolstoy" in Latin script in the
  original data; I set it to «Алексей Толстой» in the Russian file and kept
  transliterations in hy/en. Worth checking that the author field is displayed
  from the right language file.
