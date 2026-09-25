# Add-a-New-Book Runbook

Companion to `DEPLOY_RUNBOOK.md` in this folder — this covers getting a new book's
content live, that doc covers getting code live. Follow this end-to-end whenever a
new book (or batch of books) needs to be added to Bookalyzer.

## 1. Author the content JSON files

One file per book per language, at `content/books/{book-slug}.{lang}.json`
(`lang` ∈ `en`, `hy`, `ru`). Schema and per-question-type shapes are fully specified
in `docs/bookalyzer-content-json-template.md` — read that before writing content, it's
the source of truth. Summary of what matters most:

- Required fields: `book_slug`, `language`, `title`, `author`, `genre`,
  `short_summary`, `extended_summary`, `questions[]`. Optional: `copyright_status`
  (`"public domain" | "active copyright" | "adaptation-rights edge case"`).
- `genre` must be exactly one of: `Fable`, `Fantasy`, `Adventure`, `Family Story`,
  `Classic Literature` (validator only warns on mismatch, but always respect it).
- **Only 6 of the 8 documented question types are wired up in the frontend today:**
  `mc`, `ordering`, `matching`, `fillblank`, `classification`, `open`. Don't use
  `ranking` or `crossword` for new content yet — they exist in the schema/template
  doc but have no UI to play them.
- 10-15 questions per book+language is the target (bank variety for retakes); below
  6 the importer just warns, not rejects. Every `prompt` must be unique within its
  file — the importer matches questions by `(book, prompt)`, so a duplicate prompt is
  a hard import error, not a warning.
- Every question needs a `bloom_level`: `Remember | Understand | Apply | Analyze |
  Evaluate | Create`.
- Quality bar: plausible wrong-answer options (no trivially-eliminable outlier), no
  recycling the same scene/moment across multiple questions in one bank, no forced
  binaries in `classification` questions.
- Don't reproduce copyrighted source text verbatim — summaries and questions should
  be original writing about the book, not excerpts.
- **This step is content authoring, not scaffolding.** Whoever (or whatever) writes
  the JSON needs real knowledge of the book to get summaries and comprehension
  questions right. For books with only shaky/uncertain source knowledge, track that
  explicitly (see `NEW_BOOKS_BACKLOG.md` for the running example of this) rather than
  presenting guessed content as verified.

## 2. Add cover art

Edit `components/layout/BookCover.tsx`:
- Add an entry to the `COVERS` map: `"{book-slug}": { type: "art", art: "{art-id}" }`.
- Add a matching `if (art === "{art-id}") { ... }` block: 200×200 SVG viewBox, a
  gradient background built from the app's existing palette (see other entries in
  the file for the exact hex values in use — e.g. `#3A4A75`, `#141A28`, `#E3A94F`,
  `#6B9080`, `#D8697A`, `#B4772F`, `#2F4066`, `#7A5C7E`, `#F3ECDD`, `#F3E3B8`), and one
  simple iconographic motif tied to the story (a key for Buratino, a honey pot for
  Winnie-the-Pooh, etc.).
- Optional alternative: a real uploaded cover image via `app/api/admin/covers/route.ts`
  (PNG/JPEG/WEBP, admin-session-only) + PATCH the book's `coverImageId` from
  `/admin/books`. Not the default — needs a logged-in human, can't be scripted.

## 3. Apply on the local server

- Local `.env` needs a working `DATABASE_URL` against the local MySQL dev DB.
- Run `npm run import-content` (wraps `npx tsx scripts/import-content.ts`). It globs
  `content/books/*.json`, validates each file via `lib/content/validateBookContent.ts`,
  and upserts `BookGroup` / `Book` / `Question` rows per file inside one transaction.
  Fix any reported errors before moving on; review warnings.
- `npm run dev` and spot-check: cover renders, summaries read correctly, an
  assessment attempt can be started and completed for the new book.

## 4. Commit and push

```
git add content/books/{slug}.*.json components/layout/BookCover.tsx
git commit -m "..."
git push origin main
```

## 5. Deploy to DigitalOcean

Code deploy is exactly `docs/deployment/DEPLOY_RUNBOOK.md`:
```
ssh do-deploy "cd ~/bookalyzer && ./deploy_to_do.sh"
```
Verify per that doc (`pm2 list`, `curl http://127.0.0.1:3001/api/health`,
`https://bookalyzer.duckdns.org`).

**Content import is never automatic** — `deploy_to_do.sh` does not run it. After every
deploy where book content changed, run on the droplet:
```
ssh do-deploy "cd ~/bookalyzer && npx tsx scripts/import-content.ts"
```

The `public/uploads/covers` persistence hazard called out in `DEPLOY_RUNBOOK.md` (never
`git clean`) only matters if the optional real-image cover upload path was used — SVG
covers are code, they deploy with everything else.

## Quick-reference command block

```
# 1. author content/books/{slug}.en.json, {slug}.hy.json, {slug}.ru.json
# 2. add COVERS entry + SVG block in components/layout/BookCover.tsx
npm run import-content        # apply locally
npm run dev                   # spot-check in browser
git add content/books/{slug}.*.json components/layout/BookCover.tsx
git commit -m "Add {book title}"
git push origin main
ssh do-deploy "cd ~/bookalyzer && ./deploy_to_do.sh"
ssh do-deploy "cd ~/bookalyzer && npx tsx scripts/import-content.ts"
curl -I https://bookalyzer.duckdns.org
```
