# Bookalyzer — Full Database Architecture (Design Reference)

**Status:** DRAFT — architectural design for future reference, not all tables are
scoped for immediate implementation. Purpose: have the complete picture in mind
even while building only CORE + NEAR-TERM tables for the v2.0 test round.

---

## CORE tables (build now, for the six-book test round)

### book_groups
The story itself, language-neutral.
- id
- title (canonical/reference title, not shown to users)
- author
- genre
- copyright_status (public domain / active copyright / adaptation-rights edge case)
- created_at, updated_at

### books
One row per language version of a book. FK to book_groups.
- id
- book_group_id (FK -> book_groups)
- language (hy / ru / en)
- title (localized)
- author (localized, if needed)
- short_summary
- extended_summary
- status (live / not live — see partial-translation simplification below)
- cover_image_id (FK -> cover_images)
- created_at, updated_at

### questions
FK to books — language-specific, since question text/options are per language.
- id
- book_id (FK -> books)
- type (mc / ordering / matching / fillblank / classification / open / ranking /
  crossword) — ranking and crossword added 2026-09-21, now in scope for the
  v2.0 test round (see bookalyzer-addendum-v2.0.md #7 update)
- bloom_level (Remember / Understand / Apply / Analyze / Evaluate / Create) — REQUIRED
- prompt
- content (JSON blob — structure depends on type: options+correct index for mc,
  items+correctOrder for ordering, left/right/correctMap for matching, answer+
  altAnswers for fillblank, groupA/groupB/options for classification, keywords
  for open, items+correctOrder for ranking (same shape as ordering), gridSize+
  words for crossword — see bookalyzer-content-json-template.md for exact
  shapes)
- explanation
- created_at, updated_at

### assessment_sessions (NEW — identified as a gap in the original 3-table design)
One row per completed assessment attempt. Ties together score/XP/badge/status —
previously this data had no home; only question-level records existed.
- id
- child_id (FK -> children)
- book_id (FK -> books)
- reading_mode (short / extended / physical)
- overall_score (percentage)
- xp_earned
- badge_earned (bronze / silver / gold)
- started_at, completed_at
- status (in_progress / completed / abandoned)

### question_attempts
One row per question shown within a session. Powers the rotation rule (exclude
questions from the most recent attempt on that book).
- id
- session_id (FK -> assessment_sessions)
- question_id (FK -> questions)
- answer_given (JSON, shape matches question type)
- score (0 to 1, supports partial credit)
- created_at

---

## NEAR-TERM tables (build alongside CORE for the real test — real accounts, not demo login)

### parents
- id
- name
- email
- created_at

### children
- id
- parent_id (FK -> parents) — one child belongs to exactly one parent; no
  shared/multi-parent access for now
- name
- nickname (for login)
- pin_hash
- age
- xp (running total — simple field, NOT a separate ledger table, see below)
- created_at

### cover_images
Simplified — no moderation workflow (see Simplifications below).
- id
- image_url or storage_path
- uploaded_by (child_id or parent_id or admin_id)
- created_at

### badges
One row per child per book per badge tier. Kept as its own table — a single
field can't represent "gold on book A, bronze on book B" for a child who has
read multiple books.
- id
- child_id (FK -> children)
- book_id (FK -> books)
- badge_tier (bronze / silver / gold)
- earned_at

### admin_users
- id
- name
- email
- created_at

**Note on XP:** XP is NOT a separate transaction/ledger table. It's a simple
running-total field on `children.xp`, incremented on each completed session.
Decided sufficient since nothing currently needs XP history or a breakdown by
source — if that need arises later, a ledger table can be added without
breaking the simple field (just recompute it as a derived rollup at that point).

---

## DEFERRED tables (designed for future direction, explicitly NOT MVP/test-round scope)

### notifications
Future direction: nudge a parent if their child hasn't read in a while,
celebrate reading streaks. Not built for the test round.
- id
- parent_id (FK -> parents)
- type (nudge / streak_celebration / etc.)
- message
- sent_at
- read_at

### gamification_state
Future direction: tie XP to a visible companion creature or "planet" that
visually grows with each book completed, rather than just showing a number —
fits the existing Little Prince / night-sky visual theme already in the demo.
Demo of this concept already exists separately, not yet merged into the main
build.
- id
- child_id (FK -> children)
- companion_stage (integer or enum representing growth level)
- last_updated

### book_versions — DROPPED ENTIRELY (not just deferred)
This table would have supported the original immutability/version-audit-trail
rule (publish → unpublish → edit → republish, with historical versions kept).
Since that rule was dropped entirely in the 2026-09-22 review (see
Simplifications below), this table isn't needed at all, now or later, unless
the immutability rule is revisited as a business decision.

---

## Simplifications agreed during architecture review (2026-09-22)

1. **Immutability rule DROPPED.** Content (books and questions) is directly
   editable at any time, including questions a child has already been tested
   on historically. Historical scores/attempts stay as recorded at the time —
   no version-audit-trail table, no publish/unpublish/republish workflow.

2. **Cover image moderation DROPPED.** A cover just gets uploaded and shown
   immediately — no pending/approved/rejected review step.

3. **XP simplified to a field, not a table.** See note under `children` above.

4. **Badges correctly KEPT as their own table.** Initially proposed as a
   simplification (collapse into a single field), but rejected on review:
   one row per child per book per tier is necessary since a child can hold
   different badge tiers across different books simultaneously.

5. **Question rotation rule kept simple.** On a new assessment attempt,
   exclude only the exact questions shown in the child's single most-recent
   attempt on that specific book. If the bank is too small to fill the gap,
   backfill with least-recently-seen questions. No multi-attempt lookback
   window, no weighting or scoring logic beyond this.

6. **Partial-translation handling kept simple.** A language version of a book
   (a row in `books`) is either `status = live` and shown as an option, or not
   live and simply absent — no "coming soon in this language" state or
   partial-availability messaging in the UI.

---

## Content pipeline (see bookalyzer-content-json-template.md for the actual template)

- One JSON file per book per language (e.g. `alice-in-wonderland.hy.json`),
  matching the `questions` table structure exactly.
- No admin UI wizard needed for content entry — a single import/upsert
  function reads the JSON: updates the book + questions if a matching
  book_group + language already exists, creates fresh rows if not.
- This replaces the earlier 7-step Admin wizard as the real content-entry path
  going forward. The wizard may still exist in the UI demo, but it isn't the
  production content pipeline for the test round.
