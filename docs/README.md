# Bookalyzer — v2.0 Test Round — README

**Last updated:** 2026-09-22

**How to use this folder in a new session:** Point Claude at this README first.
It explains what each document covers and the order to read them in before
starting implementation work on the v2.0 test round.

---

## Files in this folder

### 1. bookalyzer-addendum-v2.0.md
Start here. This is the product/spec layer:
- The original 7 MVP scoring and grading decisions (XP vs. score, badges on
  completion, no pass/fail, partial credit, Bloom tagging required, fuzzy
  grading for open answers).
- The immutability rule from the original spec, and a note on why it was
  dropped in the 2026-09-22 review.
- The v2.0 Test Round Scope: the goal (a real test with parents and kids),
  the six books involved, and the language and question-bank-size targets.
- A short list of questions still open for Zaven (sign-off items).

### 2. bookalyzer-full-architecture.md
Read this second. This is the database layer:
- CORE tables to build first for the six-book test round (book_groups, books,
  questions, assessment_sessions, question_attempts).
- NEAR-TERM tables for real accounts (parents, children, cover_images,
  badges, admin_users).
- DEFERRED tables, explicitly out of scope for now (notifications,
  gamification_state), plus one table dropped entirely (book_versions).
- The six simplification decisions made in the 2026-09-22 architecture
  review (immutability dropped, cover moderation dropped, XP as a simple
  field, badges kept as their own table, simple question rotation rule,
  simple live/not-live language handling).

### 3. bookalyzer-content-json-template.md
Read this third, when it's time to actually write content. This is the
content layer:
- The one-JSON-file-per-book-per-language format and naming convention.
- Content rules (10-15 questions per book per language, required Bloom
  tagging, quality bar for plausible wrong answers and non-repeating scenes).
- The exact JSON shape for each of the eight supported question types (mc,
  ordering, matching, fillblank, classification, open, ranking, crossword —
  the last two added 2026-09-21).
- How the import/upsert function is expected to behave (create if new,
  update if the book+language combination already exists).

---

## Current state as of 2026-09-22

- Only one book is fully built: **The Little Prince**, and only in English.
  It needs Armenian and Russian versions written.
- Five more books are scoped but have **no content written yet**: Alice's
  Adventures in Wonderland, Winnie-the-Pooh, Emil from Lönneberga, Pippi
  Longstocking, The Secret Garden. All six need to exist in all three
  languages (Armenian, Russian, English) for the test round.
- The demo frontend (the clickable JSX/TSX prototype) already implements all
  v1.1 features referenced above. **Exception, added 2026-09-21:** Ranking and
  Crossword question types were just brought into test-round scope (see
  addendum #7 update) and are not yet built in the demo frontend — this is
  new frontend work, not just content/backend. Everything else remains a
  content-depth and real-database/backend gap, not a features gap.
- No database has been implemented yet — the schema in
  bookalyzer-full-architecture.md is fully designed but not built.
- The admin 7-step wizard still exists in the demo UI, but per the
  architecture doc it is being replaced by the JSON import pipeline as the
  real content-entry path — don't build backend support for the wizard
  itself.

## Suggested order for a new implementation session

1. Read this README, then the three documents above in order (spec →
   architecture → content template).
2. ~~Confirm with Shahen whether the two still-open Zaven questions~~ —
   RESOLVED 2026-09-21 by Shahen without waiting for Zaven: include both
   Crossword and Ranking question types, and keep the night-sky visual theme.
   See bookalyzer-addendum-v2.0.md #7 update and Questions for Zaven section.
3. Ask Shahen whether prior translations for the five new books exist
   anywhere else (Google Drive, another chat) before writing fresh content.
4. Build the CORE database tables first, then NEAR-TERM tables.
5. Write content JSON files for the five new books, all three languages
   each, following the template exactly.
6. Wire up the import/upsert pipeline and load all six books' content.
