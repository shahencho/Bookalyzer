#!/usr/bin/env bash
# Runs ON the droplet, inside ~/bookalyzer. Steady-state deploy = from the
# local machine: `git push origin main` then `ssh do-deploy "cd ~/bookalyzer && ./deploy_to_do.sh"`.
#
# If this script itself was just edited: the first run after that edit needs
# a manual bootstrap instead of the normal flow, because `git reset --hard`
# swaps this file out from under the still-running interpreter mid-read.
# See docs/deployment/DEPLOY_RUNBOOK.md for the bootstrap sequence.
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -s .env ]; then
  echo "FATAL: .env is missing or empty. Create it by hand first — see docs/deployment/DEPLOYMENT_CHECKLIST.md."
  exit 1
fi

# Deliberately NOT sourcing .env into this shell: Next.js and Prisma both
# load it themselves. Exporting NODE_ENV=production here would make `npm ci`
# skip devDependencies (tailwindcss/postcss/typescript), breaking the build.

echo "==> Fetching latest code"
git fetch origin main
git reset --hard origin/main

echo "==> Ensuring upload directory exists"
mkdir -p public/uploads/covers

echo "==> Installing dependencies"
npm ci

echo "==> Generating Prisma client"
npx prisma generate

echo "==> Applying database migrations"
npx prisma migrate deploy

echo "==> Building"
npm run build

echo "==> Restarting app"
pm2 restart bookalyzer --update-env

echo "==> Verifying health"
# pm2 restart returns before Next has finished binding the port, so poll
# instead of sleeping once. A single `sleep 2` reported "Deploy FAILED" on a
# perfectly good deploy (connection refused, then 200 a second later).
health_url="http://127.0.0.1:${PORT:-3001}/api/health"
for attempt in $(seq 1 15); do
  if curl -fsS --max-time 5 "$health_url" > /dev/null 2>&1; then
    echo "Deploy OK: health check passed (attempt $attempt)."
    exit 0
  fi
  sleep 1
done
echo "Deploy FAILED: health check did not return 200 within 15s. Check 'pm2 logs bookalyzer'."
exit 1
