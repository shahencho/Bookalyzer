## Bookalyzer MVP Specification — Addendum v2.0

**Status:** DRAFT — pending review

**Base document:** Bookalyzer MVP Specification v1.0 (APPROVED)

**Purpose:** The base spec left several implementation details open. Below are the
decisions made to unblock a clickable UI demo, for review and sign-off. Anything
marked with a question is a request for confirmation or correction.

---

## 1. Assessment scoring vs. XP

**Decision:** Keep two numbers separate, not combined.

- **XP** — flat reward for *completing* a reading mode (5 points), exactly as in
  the base spec. This is the gamification currency.
- **Assessment score** — simple percentage of correct answers, shown on the
  Results screen and Parent Dashboard. Does **not** feed into XP in the MVP.

**Why:** The base spec only defines points for reading-mode completion, but the
Results/Dashboard screens reference an "overall score" separately. Keeping them
apart avoids inventing a per-question point-weighting system, which the spec
already defers to a later "reward economy redesign."

---

## 2. Badges — earned by finishing, not by passing

**Decision:** Bronze / Silver / Gold badges are awarded when the child
**finishes** the assessment tied to that reading mode, regardless of score.
There is no minimum-score gate.

**Why:** Follows the stated principle "Learning over testing" plus unlimited
attempts — a low score isn't a failure, it's a starting point. The badge marks
engagement; mastery is communicated separately via score and Bloom breakdown.

---

## 3. No pass/fail threshold

**Decision:** Every submitted attempt shows full results and insights. There is
no passing score required to proceed, retry, or earn a badge.

**Why:** Same rationale as #2 — nothing in the base spec defines a threshold,
and adding one would work against "Learning over testing" and the fact that
attempts are unlimited.

---

## 4. Partial credit for multi-part questions

**Decision:** Ordering, Matching, and Classification questions award **partial
credit per sub-item** (e.g. an ordering question with 5 items gives credit for
each item placed correctly), rather than all-or-nothing per question.

**Why:** All-or-nothing would be discouraging in a "learning over testing"
product, and partial credit makes the score and Bloom breakdown more meaningful.
Still fully rule-based/deterministic — no AI involved.

---

## 5. Bloom Taxonomy tagging is required metadata

**Decision:** Every question in the curated question bank must be tagged with
one of the six Bloom levels (Remember, Understand, Apply, Analyze, Evaluate,
Create) by the Administrator at upload time. Not optional.

**Why:** The Parent Dashboard's "Bloom Taxonomy breakdown" is only reliable if
every question is tagged. Low cost since curated questions are hand-authored by
the educational team anyway.

---

## 6. Published assessments — immutability rule DROPPED (see 2026-09-22 update)

**Original decision (v1.0):** "Frozen after approval" was treated literally. To
fix an error, the Administrator would unpublish and republish — no in-place edit
or version history.

**UPDATE 2026-09-22:** This rule was explicitly dropped in the v2.0 architecture
review. Content is now directly editable at any time, including questions a
child has already been tested on. Historical scores stay as recorded; no
version-audit-trail table exists. See bookalyzer-full-architecture.md for the
current data model.

---

## 7. Open Answer & Fill-Missing-Word grading

**Decision:** Graded via simple exact/fuzzy text matching against a defined
answer (or a small set of accepted keywords for Open Answer), not AI and not
human review.

**Why:** Keeps grading deterministic and instant, in line with "AI Generated
Questions: not enabled in MVP."

**UPDATE 2026-09-21:** Crossword and Ranking are now IN SCOPE for the v2.0 test
round (decision made without waiting for Zaven sign-off — see Questions for
Zaven below). Ranking reuses the Ordering content shape (items + correctOrder);
Crossword is a new grid-based shape. Both are not yet implemented in the demo
frontend, so this adds frontend build work that wasn't previously scoped for
the test round. See bookalyzer-content-json-template.md for the JSON shapes.

---

## Demo scope notes (not spec decisions, just what's built)

- **Platform:** Clickable frontend only, hardcoded/mock data, no backend —
  built to preview flows and UX, not to validate technical architecture.
- **Flows covered:** Child (login → library → mode → read → assessment →
  results), Parent (dashboard → child detail/report), Admin (book list →
  7-step creation wizard matching the spec's workflow exactly — NOTE: this
  wizard is being replaced by a JSON import pipeline for the v2.0 test round,
  see bookalyzer-content-json-template.md).
- **Language:** Demo copy is in English for review speed. Base spec requires
  Armenian-only MVP content — real content will need Armenian copy before this
  goes further than a UX preview.
- **Visual direction:** A "night sky / small planet" motif (inspired by The
  Little Prince) rather than a generic dashboard look — open to feedback.

---

## v2.0 Test Round Scope — added 2026-09-22

**Goal:** Real test with parents and kids for feedback. Content depth was
identified as the actual gap, not missing features — all existing v1.1 features
are being kept for the test (timer, retake pool, search, genre filter, cover
upload, admin wizard remains in UI even though it's no longer the real content
pipeline).

**Six books for the test round:**
1. The Little Prince (already built, English only — needs Armenian + Russian)
2. Alice's Adventures in Wonderland
3. Winnie-the-Pooh
4. Emil from Lönneberga
5. Pippi Longstocking
6. The Secret Garden

**Language coverage:** All six books built in all three languages (Armenian,
Russian, English) together — no staggering by language.

**Question bank size:** 10-15 questions per book per language (up from the
original 8). 6 questions shown per assessment attempt regardless of bank size
— kept at 6 for attention span, ages 4-8.

**Related documents:**
- bookalyzer-full-architecture.md — full database schema (CORE / NEAR-TERM /
  DEFERRED tables), including the new assessment_sessions table and all
  simplifications agreed in the 2026-09-22 review.
- bookalyzer-content-json-template.md — JSON template and content rules for
  writing the six books' worth of trilingual content.

---

## Questions for Zaven (original — all resolved by 2026-09-21 without waiting for sign-off)

1. Sign-off on decisions #1–#7 above, or corrections? — decisions 1-5 and 7
   stand; #6 was superseded by the 2026-09-22 architecture review.
2. Answer to the open question under #6 (historical attempts vs. republished
   assessments)? — moot, immutability/republish workflow was dropped entirely.
3. Any objection to deferring Crossword/Ranking question types out of this
   demo pass? — RESOLVED 2026-09-21: not deferred. Both are now in scope for
   the v2.0 test round (proceeding on this assumption; Zaven can still
   override later).
4. Is the "night sky" visual direction on-brand, or should the demo lean more
   neutral/corporate for this review? — RESOLVED 2026-09-21: keeping the
   night-sky theme (proceeding on this assumption; Zaven can still override
   later).
