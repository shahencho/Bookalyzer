# Deploy runbook (DigitalOcean)

How a deploy is actually run, as of the first production deploy on 2026-09-22.
For the pre-flight/backup checklist see
[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md).

Live at **https://bookalyzer.duckdns.org**, on the same droplet as several
other unrelated apps (SmartLogist, assettrack, cancerquizdefense, and more).
Bookalyzer only touches its own nginx block, PM2 process, and MySQL
database — nothing else on the box is affected by anything below.

## The whole thing

```bash
git push origin main
ssh do-deploy "cd ~/bookalyzer && ./deploy_to_do.sh"
```

That's it. `deploy_to_do.sh` runs **on** the droplet against `~/bookalyzer`
and does `git fetch` + `git reset --hard origin/main`, so **the code must be
pushed first** — there is no local build or file-copy step.

## What the script does, in order

1. Fails loudly if `.env` is missing/empty (see below for why it doesn't try
   to restore it — there's nothing to restore).
2. `git fetch && git reset --hard origin/main`
3. `mkdir -p public/uploads/covers` (defensive no-op after the first run)
4. `npm ci` — full install, **not** `--omit=dev`. The build needs
   `tailwindcss`/`postcss`/`typescript`, which are devDependencies.
5. `npx prisma generate`
6. `npx prisma migrate deploy`
7. `npm run build`
8. `pm2 restart bookalyzer --update-env`
9. `curl http://127.0.0.1:3001/api/health` — real DB-connectivity check
   (`prisma.$queryRaw`SELECT 1``), not just a liveness ping. Non-zero exit if
   it fails.

## The bug already found and fixed once: don't `source .env` in the script

The first version of this script did `set -a; source .env; set +a` before
`npm ci`, to make `DATABASE_URL`/`PORT` available in the shell. This broke
the build: `.env` sets `NODE_ENV=production`, and npm treats a
`NODE_ENV=production` **environment variable** as an implicit
`--omit=dev` — silently skipping `tailwindcss`/`postcss`/`typescript`, which
then makes `next build` fail with `Cannot find module 'tailwindcss'`.

It was also unnecessary: Next.js and Prisma both load `.env` themselves
(confirmed by "Environment variables loaded from .env" in their own output).
The script doesn't source `.env` at all — if you're tempted to re-add it for
some new step, don't; pass the one variable you need explicitly instead.

## `.env` needs no backup/restore dance

Unlike some other apps on this box, `deploy_to_do.sh` does **not** back
`.env` up before the reset and restore it after. It doesn't need to:
`.env` is listed in `.gitignore`, so it's untracked, and `git reset --hard`
only ever touches files git already tracks — it never deletes or reverts
untracked files. Same reasoning applies to `public/uploads/`. The one hard
rule: **never add `git clean` to this script.** That's the only git command
that would wipe `.env` and every admin-uploaded cover image.

## What has to be done by hand

**`~/bookalyzer/.env` never travels through git.** Created once, by hand,
during bootstrap:
```
DATABASE_URL="mysql://bookalyzer_app:<url-encoded password>@localhost:3306/bookalyzer_prod"
SESSION_SECRET="<random 32+ byte string>"
NODE_ENV=production
PORT=3001
```

**If the password contains `/`, `@`, `:`, or other URL-reserved characters,
percent-encode them** (`/` → `%2F`, etc.) — otherwise Prisma's connection
string parser misreads the URL and fails with `P1013: invalid port number`,
even though the password itself is correct. This bit us on the very first
deploy.

If the droplet is ever rebuilt, `.env` — and therefore the DB password and
session secret — is gone with nothing in the repo to reveal it was ever
needed. Re-create it from the checklist.

**Real admin accounts** are never created via `prisma/seed.ts` (that's dev
fixture data with hardcoded blank passwords — fine on a machine nobody else
can reach, a real hole on a public site). Use:
```bash
npx tsx scripts/create-admin.ts --email=you@example.com --name="Your Name" --password="a-real-password"
```

**Content** (`content/books/*.json`) only reaches the database via:
```bash
npx tsx scripts/import-content.ts
```
This is not part of `deploy_to_do.sh` and never runs automatically — run it
after the first deploy, and again whenever book content changes.

## Hazard: the script resets the repo it is running from

Same class of bug as other deploy scripts on this box: `deploy_to_do.sh`
lives in the repo it `git reset --hard`s, and bash reads a script
incrementally rather than all at once. As long as the file doesn't change
size, the reset is invisible to the running shell. **When
`deploy_to_do.sh` itself has just been edited, the first deploy after that
edit needs a manual bootstrap instead of the normal flow:**

```bash
ssh do-deploy "cd ~/bookalyzer && git fetch origin main && git reset --hard origin/main"
ssh do-deploy "cd ~/bookalyzer && ls -la deploy_to_do.sh"   # expect -rwxr-xr-x
ssh do-deploy "cd ~/bookalyzer && ./deploy_to_do.sh"
```

After that, the repo already matches `origin/main`, so the reset inside the
script is a no-op on the script file itself, and normal two-command deploys
resume.

## The executable bit

`deploy_to_do.sh` is committed with mode `100755`
(`git update-index --chmod=+x deploy_to_do.sh` was run before the first
commit that included it). This was set up correctly from day one on this
project — unlike some other apps on this box, there's no `core.fileMode`
history to fight here, but if `git reset --hard` ever starts delivering it
non-executable, that's the first thing to check.

## Reading the output

Noise that's safe to ignore on a healthy run:
- `npm WARN EBADENGINE` for `brace-expansion`/`eslint-visitor-keys` — those
  packages want Node 20+; the droplet runs Node 18.19.1. Doesn't affect the
  app; only affects some lint tooling's own internals.
- `X packages are looking for funding` / `npm fund` mentions.
- Prisma's own "Update available" banner suggesting a major-version bump.

Not noise — check before trusting a green run:
- Any `npm audit` vulnerability count that goes **up**, or reintroduces
  `next`/`react` in the flagged list — see the CVE note below.
- Anything under "Failed to compile" in the build step.

## Security: Next.js version is pinned exactly, on purpose

`next` and `react`/`react-dom` are pinned to **exact** versions (no `^`) in
`package.json`, unlike most other dependencies. This project was bumped
from `15.1.0` to `15.5.26` on first deploy (2026-09-22) to close a critical
RCE (CVE-2025-66478, CVSS 10.0) plus two follow-up CVEs
(CVE-2025-55183/55184, later CVE-2025-67779) that were **not** all fixed
within the 15.1.x patch line — some fixes only ever landed in later minor
releases. `15.5.26` tracks npm's `backport` dist-tag for major version 15
(`npm view next dist-tags`), which is Vercel's maintained line for apps not
ready to move to Next 16. When bumping `next` again:

1. Check `npm view next dist-tags` for the current `backport`/`latest` tags
   rather than assuming the latest patch of your current minor is enough —
   verify against https://nextjs.org/blog (search "security") for the
   specific CVE ranges covered.
2. Use `npm install --save-exact next@<version>` to preserve the no-caret
   pin.
3. `npm audit` findings for `deepmerge-ts` (via Prisma's config tooling) and
   `postcss` (bundled inside `next`'s own `node_modules`) are known,
   build-tooling-only, and require a `next@16` major upgrade to fully clear
   — a deliberate, separate decision, not an oversight.

## Useful signals, in order

1. `git log --oneline -1` on the droplet matches what you pushed.
2. `pm2 list` — `bookalyzer` `online`, restart counter (`↺`) not climbing.
3. `curl -s http://127.0.0.1:3001/api/health` → `{"status":"ok"}`.
4. `curl -I https://bookalyzer.duckdns.org` → `200`, valid cert (browser
   padlock, or `curl -v` and check the cert dates).
5. A deploy does **not** restart the app on its own if it aborts early
   (`set -euo pipefail` stops the script, but PM2 keeps running the old
   build). Check `pm2 list` uptime: if it predates the deploy, the new code
   isn't live yet.

## Rollback

```bash
ssh do-deploy "cd ~/bookalyzer && git log --oneline -5"   # find the last-known-good SHA
ssh do-deploy "cd ~/bookalyzer && git reset --hard <sha> && npm ci && npx prisma generate && npx prisma migrate deploy && npm run build && pm2 restart bookalyzer"
```
`prisma migrate deploy` only ever applies forward migrations — rolling back
a schema change (not just app code) needs a manual down-migration, there is
no automatic reverse.

## Logs

```bash
ssh do-deploy "pm2 logs bookalyzer"
ssh do-deploy "pm2 logs bookalyzer --lines 200 --nostream"
```
