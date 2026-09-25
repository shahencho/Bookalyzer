# New Books Backlog — Armenian curriculum list (2026-09-24)

Tracks the 50-book list the user supplied on top of the existing 15-book catalog in
`content/books/`. Each book gets `en` + `hy` + `ru` content files (per user decision,
overriding the "match original language" option). Genre is constrained to the fixed
list enforced by `lib/content/validateBookContent.ts`: `Fable`, `Fantasy`, `Adventure`,
`Family Story`, `Classic Literature`.

**Confidence column is the important one.** It reflects how well-sourced my summaries/
questions are for that specific book, not whether the file exists. High/Medium =
well-known or reasonably well-known work, written from real knowledge of the text.
**Low = I do not have reliable first-hand knowledge of this specific book's plot/text**
(mostly contemporary or regional Armenian titles from the "Koreez reading list" that
aren't broadly documented, or works I only know by reputation, not content). Per the
user's explicit instruction, these were generated anyway on best-effort general
knowledge — **treat Low-confidence entries as needing a human review pass (ideally
against the actual source text) before they're trusted as accurate for kids.**

The original age/grade metadata (Pre-school through Grade 8) from the user's list has
**no home in the current DB schema** (`BookGroup`/`Book` have no age/grade field) — it's
preserved here for reference only and is not part of the imported JSON.

Status values: `pending` (not started) → `drafted` (JSON files written, not yet
imported locally) → `imported-local` → `deployed`.

## Pre-school (age 4-5)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-001 | Պոչատ աղվեսը | fox-without-a-tail | Հովհաննես Թումանյան | en/hy/ru | Fable | public domain | High | imported-local |
| ARM-002 | Շունն ու կատուն | the-dog-and-the-cat | Հովհաննես Թումանյան | en/hy/ru | Fable | public domain | High | imported-local |
| ARM-003 | Գնդլիկ Բոխը | gndlik-bokh | Հովհաննես Թումանյան | en/hy/ru | Fable | public domain | **Low** — title doesn't match a Tumanyan story I can confidently source; may be a variant spelling/title. Verify against source. | held-back |
| ARM-004 | The Gruffalo | the-gruffalo | Julia Donaldson | en/hy/ru | Fantasy | active copyright | High | imported-local |
| ARM-005 | The Very Hungry Caterpillar | the-very-hungry-caterpillar | Eric Carle | en/hy/ru | Fantasy | active copyright | High | imported-local |

## Grade 1 (age 5-6)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-006 | Քաջ Նազար | brave-nazar | Հովհաննես Թումանյան | en/hy/ru | Fable | public domain | High | imported-local |
| ARM-007 | Անահիտ | anahit | Ղազարոս Աղայան | en/hy/ru | Classic Literature | public domain | Medium | imported-local |
| ARM-008 | Երջանիկ իշխանը | the-happy-prince | Oscar Wilde | en/hy/ru | Classic Literature | public domain | High | imported-local |
| ARM-009 | Pinocchio | pinocchio | Carlo Collodi | en/hy/ru | Fantasy | public domain | High | imported-local |
| ARM-010 | The Wonderful Adventures of Nils | nils-wonderful-adventures | Selma Lagerlöf | en/hy/ru | Adventure | public domain | Medium-High | imported-local |

## Grade 2 (age 6-7)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-011 | Գիքորը | gikor | Հովհաննես Թումանյան | en/hy/ru | Classic Literature | public domain | High | imported-local |
| ARM-012 | Սուտասանը | the-liar-tumanyan | Հովհաննես Թումանյան | en/hy/ru | Fable | public domain | Medium | held-back |
| ARM-013 | Արջն ու աղվեսը | the-bear-and-the-fox | Հովհաննես Թումանյան | en/hy/ru | Fable | public domain | High | imported-local |
| ARM-014 | Օզ երկրի կախարդը | wizard-of-oz | L. Frank Baum | en/hy/ru | Fantasy | public domain | High | imported-local |
| ARM-015 | Peter Pan | peter-pan | J. M. Barrie | en/hy/ru | Fantasy | public domain | High | imported-local |

## Grade 3 (age 7-8)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-016 | Օպերայի բակում | operas-courtyard | Արմեն Գրիգորյան | en/hy/ru | Family Story | active copyright | **Low** — contemporary Armenian title, no reliable source available to me. | held-back |
| ARM-017 | Կոմիտաս․ ժողովրդի հոգին | komitas-soul-of-the-people | Նունե Թորոսյան | en/hy/ru | Classic Literature | active copyright | **Low** — I know Komitas (the composer) generally, not this specific book's text/structure. | held-back |
| ARM-018 | Երազներն իրականանում են․ Իլոն Մասք | dreams-come-true-elon-musk | — | en/hy/ru | Classic Literature | active copyright | **Low** — general Elon Musk biographical facts are known to me, but not this specific book's framing/content for kids. | held-back |
| ARM-019 | Երջանիկ իշխանը և ուրիշ հեքիաթներ | happy-prince-and-other-tales | Oscar Wilde | en/hy/ru | Classic Literature | public domain | High | imported-local |
| ARM-020 | Միո, իմ Միո | mio-my-mio | Astrid Lindgren | en/hy/ru | Fantasy | active copyright | Medium-High | imported-local |
| ARM-021 | The Railway Children | the-railway-children | E. Nesbit | en/hy/ru | Family Story | public domain | High | imported-local |

## Grade 4 (age 8-9)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-022 | Բյուրեղապակե մարդը | the-crystal-glass-man | Էլֆիք Զոհրաբյան | en/hy/ru | Fantasy | active copyright | **Low** — contemporary Armenian title, no reliable source available to me. | held-back |
| ARM-023 | Կախարդին գումարած ագռավ | wizard-plus-raven | Երազիկ Գրիգորյան | en/hy/ru | Fantasy | active copyright | **Low** — contemporary Armenian title, no reliable source available to me. | held-back |
| ARM-024 | Charlie and the Great Glass Elevator | charlie-and-the-great-glass-elevator | Roald Dahl | en/hy/ru | Fantasy | active copyright | High | imported-local |
| ARM-025 | Coraline | coraline | Neil Gaiman | en/hy/ru | Fantasy | active copyright | High | imported-local |
| ARM-026 | Heidi | heidi | Johanna Spyri | en/hy/ru | Family Story | public domain | High | imported-local |
| ARM-027 | The Adventures of Tom Sawyer | tom-sawyer | Mark Twain | en/hy/ru | Adventure | public domain | High | imported-local |

## Grade 5 (age 9-10)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-028 | Ագաթա Օդլի․ Խորհրդավոր բանալին | agatha-odli-mysterious-key | Լինա Ջոնս | en/hy/ru | Adventure | active copyright | **Low** — appears to be a localized/regional children's mystery series; no reliable source available to me. | held-back |
| ARM-029 | 3Ա-ի ինքնամոռաց արշավանքը | 3a-class-expedition | Մհեր Իսրայելյան | en/hy/ru | Adventure | active copyright | **Low** — contemporary Armenian title, no reliable source available to me. | held-back |
| ARM-030 | Սևանի ափին | on-the-shore-of-sevan | Վախթանգ Անանյան | en/hy/ru | Adventure | public domain (author d. 1980; treat as active copyright to be safe — verify) | Medium | held-back |
| ARM-031 | Treasure Island | treasure-island | Robert Louis Stevenson | en/hy/ru | Adventure | public domain | High | imported-local |
| ARM-032 | White Fang | white-fang | Jack London | en/hy/ru | Adventure | public domain | High | imported-local |
| ARM-033 | Ballet Shoes | ballet-shoes | Noel Streatfeild | en/hy/ru | Family Story | active copyright | Medium | imported-local |
| ARM-034 | Emil and the Detectives | emil-and-the-detectives | Erich Kästner | en/hy/ru | Adventure | active copyright | High | imported-local |

## Grade 6 (age 10-11)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-035 | Վիշապաքարի գաղտնիքը | secret-of-the-dragon-rock | Արտավազդ Եղիազարյան | en/hy/ru | Adventure | active copyright | **Low** — contemporary Armenian title, no reliable source available to me. | held-back |
| ARM-036 | Կարպատյան դղյակը | carpathian-castle | Ժյուլ Վեռն (Jules Verne) | en/hy/ru | Adventure | public domain | Medium-High | imported-local |
| ARM-037 | Twenty Thousand Leagues Under the Sea | twenty-thousand-leagues | Jules Verne | en/hy/ru | Adventure | public domain | High | imported-local |
| ARM-038 | The Hobbit | the-hobbit | J. R. R. Tolkien | en/hy/ru | Fantasy | active copyright | High | imported-local |
| ARM-039 | The Adventures of Sherlock Holmes | sherlock-holmes-adventures | Arthur Conan Doyle | en/hy/ru | Adventure | public domain (mostly) | High | imported-local |

## Grade 7 (age 11-12)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-040 | Սասունցի Դավիթ | david-of-sassoun | Հայկական էպոս | en/hy/ru | Classic Literature | public domain | High | imported-local |
| ARM-041 | Վարդանանք | vardanank | Դերենիկ Դեմիրճյան | en/hy/ru | Classic Literature | active copyright (author d. 1972) | Medium-High | imported-local |
| ARM-042 | Anne of Green Gables | anne-of-green-gables | L. M. Montgomery | en/hy/ru | Family Story | public domain | High | imported-local |
| ARM-043 | A Little Princess | a-little-princess | Frances Hodgson Burnett | en/hy/ru | Family Story | public domain | High | imported-local |
| ARM-044 | The Graveyard Book | the-graveyard-book | Neil Gaiman | en/hy/ru | Fantasy | active copyright | High | imported-local |

## Grade 8 (age 12-13)

| ID | Title (original) | Slug | Author | Language(s) | Genre | Copyright | Confidence | Status |
|---|---|---|---|---|---|---|---|---|
| ARM-045 | Խենթը | the-madman-raffi | Րաֆֆի | en/hy/ru | Classic Literature | public domain | Medium — themes are historical/political (Armenian national liberation movement); summary written to be age-appropriate, not graphic. | imported-local |
| ARM-046 | Սպիտակ ձին | the-white-horse-bakunts | Ակսել Բակունց | en/hy/ru | Classic Literature | public domain | Medium | imported-local |
| ARM-047 | Ավելորդը | the-superfluous-one | Դերենիկ Դեմիրճյան | en/hy/ru | Classic Literature | active copyright | **Low** — I know the author's major works but not this specific title in detail. | held-back |
| ARM-048 | Anne Frank: The Diary of a Young Girl | anne-frank-diary | Anne Frank | en/hy/ru | Classic Literature | active copyright | High — Holocaust subject matter; summary/questions written respectfully and age-appropriately, no graphic content. | imported-local |
| ARM-049 | Skellig | skellig | David Almond | en/hy/ru | Fantasy | active copyright | Medium | imported-local |
| ARM-050 | The Owl Service | the-owl-service | Alan Garner | en/hy/ru | Fantasy | active copyright | Medium-Low | imported-local |

## 2026-09-25: first deploy round

The 38 non-Low-confidence books are being committed, pushed, and deployed to production now.
The 12 `held-back` books above (10 Low-confidence + `on-the-shore-of-sevan` and
`the-liar-tumanyan`, per the user's explicit call to also hold those two back) are
intentionally **not committed to git** — their JSON files still exist locally under
`content/books/` (and are already in the local dev DB from earlier testing) but are
untracked, so they were not pushed and the production content-import step never saw
them. They're staged for review; once reviewed/corrected, `git add` them and follow
the normal `ADD_NEW_BOOK_RUNBOOK.md` flow to bring them to production individually or
as a batch.

## Known gaps / follow-ups

- 12 titles are marked **Low confidence** (mostly contemporary/regional Armenian
  "Koreez reading list" picks: ARM-003, 016, 017, 018, 022, 023, 028, 029, 035, 047,
  plus partial caveats on 030). Recommend sourcing the actual text or a trusted
  synopsis for these before treating their quiz content as reliable for kids.
- Age/grade metadata has no field in the current schema — if age-appropriate
  filtering becomes a real product requirement, that's a schema/architecture change,
  not something this content-import pipeline can express today.
- `ranking` and `crossword` question types exist in the content schema but aren't
  built in the frontend yet — none of these 50 books use them, per
  `docs/bookalyzer-content-json-template.md`.
