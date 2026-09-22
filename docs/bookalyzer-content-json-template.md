# Bookalyzer — Book Content JSON Template (v1)

**Purpose:** One JSON file per book, per language. This is the structured
format anyone (Shahen, Zaven, a translator) fills in to create or update a
book's content — no database access needed. A single import/upsert function
reads this file and creates-or-updates the book + questions based on whether
that book+language combination already exists.

**Naming convention:** `{book-slug}.{language-code}.json`
Example: `alice-in-wonderland.hy.json`, `alice-in-wonderland.ru.json`,
`alice-in-wonderland.en.json`. Language codes: hy (Armenian), ru (Russian),
en (English).

---

## Top-level structure

```
{
  "book_slug": "alice-in-wonderland",
  "language": "hy",
  "title": "...",
  "author": "...",
  "genre": "...",
  "short_summary": "...",
  "extended_summary": "...",
  "questions": [ ... ]
}
```

## Content rules for writers

- **10-15 questions per book per language is the target**, so retakes have
  real variety. Fewer than 6 is allowed (the import pipeline warns, not
  rejects — an attempt on a smaller bank simply shows fewer than 6
  questions rather than failing), but every book should keep growing
  toward the 10-15 target over time.
- **Every question's `prompt` text must be unique within its book+language
  file.** The import pipeline matches questions across re-imports by
  `(book, prompt)` — two questions with identical prompt text in the same
  file will collide and the import will be rejected. (A side effect: editing
  a question's *prompt* wording later is treated as replacing it with a new
  question rather than updating it in place — the old one is archived, not
  deleted. Editing anything else about a question — its content/answer key,
  bloom level, explanation — updates it in place and does not affect this.)
- **`genre` must be one of a fixed short list**, so the child library's
  genre filter doesn't accumulate casing/spelling duplicates across the 18
  hand-authored files: `Fable`, `Fantasy`, `Adventure`, `Family Story`,
  `Classic Literature`.
- **Bloom Taxonomy tagging is required** on every single question — one of:
  Remember, Understand, Apply, Analyze, Evaluate, Create. Not optional.
- **Etalon quality bar** (matching the approved Emil from Lönneberga Russian
  reference set):
  - Wrong-answer options must all be plausible within the story's world — one
    absurd/obviously-wrong outlier breaks the mechanic by being trivially
    eliminable without even knowing the story.
  - No recycling the same episode/scene across multiple questions in the same
    bank — each question should draw on a distinct moment or detail.
  - No forced or artificial binaries in Classification questions — if a
    natural two-group split doesn't exist in the story, rework the question
    rather than forcing one.

## Question type shapes (within the `questions` array)

Each question type has a different `content` shape. Eight types are now
in scope for the v2.0 test round (Ranking and Crossword added 2026-09-21,
see bookalyzer-addendum-v2.0.md #7 update) — the demo currently implements
the first six; Ranking and Crossword still need frontend build work.

### Multiple choice (mc)
```
{
  "type": "mc",
  "bloom_level": "Remember",
  "prompt": "...",
  "content": { "options": ["...", "...", "...", "..."], "correct": 0 },
  "explanation": "..."
}
```

### Ordering
```
{
  "type": "ordering",
  "bloom_level": "Understand",
  "prompt": "...",
  "content": { "items": ["...", "...", "...", "..."], "correctOrder": [0,1,3,2] },
  "explanation": "..."
}
```

### Matching
```
{
  "type": "matching",
  "bloom_level": "Analyze",
  "prompt": "...",
  "content": {
    "left": ["...", "...", "...", "..."],
    "right": ["...", "...", "...", "..."],
    "correctMap": { "0": 0, "1": 1, "2": 2, "3": 3 }
  },
  "explanation": "..."
}
```

### Fill in the blank (fillblank)
```
{
  "type": "fillblank",
  "bloom_level": "Remember",
  "prompt": "...",
  "content": { "answer": "eye", "altAnswers": ["eyes"] },
  "explanation": "..."
}
```

### Classification
```
{
  "type": "classification",
  "bloom_level": "Analyze",
  "prompt": "...",
  "content": {
    "groupA": "...",
    "groupB": "...",
    "options": [
      { "label": "...", "group": "A" },
      { "label": "...", "group": "B" }
    ]
  },
  "explanation": "..."
}
```

### Open answer (open)
```
{
  "type": "open",
  "bloom_level": "Evaluate",
  "prompt": "...",
  "content": { "keywords": ["...", "...", "...", "..."] },
  "explanation": "..."
}
```
Graded via simple exact/fuzzy text matching against the keyword set — no AI,
no human review.

### Ranking
```
{
  "type": "ranking",
  "bloom_level": "Evaluate",
  "prompt": "...",
  "content": { "items": ["...", "...", "...", "..."], "correctOrder": [2,0,3,1] },
  "explanation": "..."
}
```
Same content shape as Ordering (items + correctOrder), but the prompt asks the
child to rank by a subjective/qualitative criterion (e.g. bravery, importance
to the story) rather than chronological sequence. Scored the same way as
Ordering — partial credit per item placed correctly.

### Crossword
```
{
  "type": "crossword",
  "bloom_level": "Remember",
  "prompt": "...",
  "content": {
    "gridSize": { "rows": 8, "cols": 8 },
    "words": [
      { "answer": "PRINCE", "clue": "...", "row": 0, "col": 0, "direction": "across" },
      { "answer": "ROSE", "clue": "...", "row": 0, "col": 2, "direction": "down" }
    ]
  },
  "explanation": "..."
}
```
Graded via exact per-word match (case-insensitive) against `answer` — no AI,
no human review. Partial credit per word solved, consistent with the
partial-credit rule for other multi-part question types.

## Import behavior spec

- The import function reads a JSON file and looks up `book_slug` +
  `language` (via `book_groups.title`-matching-slug + `books.language`).
- **If no matching book_group + language row exists:** create the book_group
  (if needed), the books row, and all questions rows fresh.
- **If a matching book_group + language row exists:** update the books row
  (title/summaries/etc.) and replace/update the questions tied to it.
- No versioning, no publish/unpublish step — content is live as soon as it's
  imported (matches the dropped-immutability decision in
  bookalyzer-full-architecture.md).
