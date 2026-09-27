# Mowgli: question bank analysis

Slug: `mowgli` · Status: applied · Date: 2026-09-27
Process: [README.md](README.md)

## 1. Book brief

- **Kind of book:** the Mowgli stories from Kipling's *Jungle Book* (1894) —
  several linked tales, not one novel. Formal, rhythmic prose; a world with
  strict rules.
- **Readers in this app:** about 8–13.
- **Author's aim:** to build a society with a Law and then drop a child into
  it who belongs to neither that society nor the human one.
- **Big ideas:** **A** the Law is the point — everything in the jungle has a
  rule, and the monkeys, who have none, are the most despised · **B** Mowgli
  is bought, taught and rescued before he ever does anything himself · **C**
  fire is the one thing that belongs to people, and carrying it is what
  separates him from the Pack · **D** both worlds take him in and both drive
  him out.
- **What children love:** the Master Words, Kaa's dance, the Red Flower, and
  the buffalo in the ravine.

**Key scenes:** the baby at the cave mouth · Council Rock and the bull · the
Law lessons · the Bandar-log and the Cold Lairs · Kaa · Akela's failing · the
Red Flower · Messua and the village · the buffalo herd and Shere Khan · the
stoning.

**Unsure / VERIFY:** none for the material used. Names, the bull, "We be of
one blood", the Cold Lairs, Kaa, the Red Flower, Messua, the ravine and the
buffalo were all verified in Gutenberg ebook 236. Raksha appears only once in
the text, so Mother Wolf is referred to by role rather than name.

## 2. Audit of the current bank

Checker: 14 prompt-echo keywords — the joint highest in the batch — but
**zero longest-correct options**, the only book with none.

| # | Old question | Verdict |
|---|---|---|
| 1 | who raises Mowgli | Replace — summary |
| 2 | who are Baloo and Bagheera | Replace — summary |
| 3 | who is Shere Khan | Replace — summary |
| 4 | what is the Law of the Jungle | Replace — asks for a definition, not evidence |
| 5 | matching animals to roles | **Fix** — kept, with Tabaqui added |
| 6 | ordering | **Fix** — kept, items made specific |
| 7 | classification jungle vs village | **Fix** — kept; sharpened into "each side turns on him" |
| 8 | why does Shere Khan hate Mowgli | Replace — answerable from the summary |
| 9 | open: does Mowgli belong in the jungle | **Fix** — recast around the villagers' reaction |
| 10 | open/Create | **Fix** — replaced with "invent a Law of the Jungle" |
| 11–12 | remaining mc | Replace — summary level |

**Bank-level:** the bull, the Master Words, the Bandar-log, Kaa, the Red
Flower and the ravine were all missing — which is to say the bank covered the
premise and none of the incidents. Four questions asked who somebody was.

## 3. Design for this book

- **Why this type mix:** a set of linked tales suits a bank that samples each
  one: the Council, the lessons, the Cold Lairs, the fire, the village. The
  classification is built to make the child notice the symmetry of Mowgli's
  two rejections. The Create question asks them to write a Law, which is the
  one thing that tests whether they understood the book's central idea.
- **Coverage map:** the bull → q1 (idea B) · the Master Words → q2 · the
  Bandar-log → q3 (idea A) · Kaa → q4 · the whole arc → q5 · the four animals
  → q6 · two worlds → q7 (idea D) · the Red Flower → q8 (idea C) · the
  stoning → q9 (Evaluate, idea D) · invent a Law → q10 (Create, idea A) ·
  the Red Flower's name → q11 · the ravine → q12.

## 4. Proposed bank

**Three examples:**

1. *"What is the Law of the Jungle?"* → **"Why are the Bandar-log despised by
   everyone?"** The old question asks for a definition a child could invent.
   The new one gets at the same idea from the inside: the monkeys are hated
   precisely for having no Law.
2. *"Who raises Mowgli?"* → **"How is his life bought at Council Rock?"** From
   the summary's first sentence to the debt that follows him through every
   later story.
3. *open/Create (generic)* → **"Invent one more Law of the Jungle: what is the
   rule, and what trouble does it prevent?"** The second half is the test —
   in Kipling every rule exists because something once went wrong, and a child
   who has noticed that writes a very different answer.

## 5. Verification

- [x] Checker: 0 ERRORs, 0 WARNs on all three files
- [x] All keys verified against Gutenberg ebook 236
- [x] Summary test · [x] Giveaway test · [x] Age read-through at 8
- [x] hy / ru / en identical

## 6. Questions for Shahen

- The entry is called `mowgli` rather than *The Jungle Book*, and the bank
  stays inside the Mowgli stories — nothing from "Rikki-Tikki-Tavi" or "The
  White Seal". If your edition is the full *Jungle Book*, those stories are
  currently untested and there is room for three or four more questions.
