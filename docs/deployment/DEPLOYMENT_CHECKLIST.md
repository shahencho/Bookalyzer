# DigitalOcean Deployment Checklist

For the steady-state two-command deploy flow, see
[DEPLOY_RUNBOOK.md](DEPLOY_RUNBOOK.md). This checklist is for **one-time
bootstrap** (first deploy, or rebuilding the droplet from scratch) plus a
short pre-flight for routine deploys.

Server facts, so nothing here has to be rediscovered:
- Droplet: `139.59.136.124`, shared with several other unrelated apps under
  the same PM2 daemon and nginx install — do not touch their sites-available
  files or PM2 process names.
- Domain: `bookalyzer.duckdns.org`
- App port: `3001` (confirmed free at bootstrap; check `ss -tlnp` if
  reusing this checklist after other apps have been added to the box)
- MySQL database: `bookalyzer_prod`, user `bookalyzer_app`
- PM2 process name: `bookalyzer`
- Droplet path: `~/bookalyzer` (i.e. `/root/bookalyzer`)
- Node on droplet: v18.19.1 — this is *below* what some devDependencies
  request (they want 20+), but the app itself works fine on it. Don't
  assume Node 20 is present when writing new tooling.

## One-time bootstrap

### 1. DNS
- [ ] Reserve the subdomain via DuckDNS (needs the account token) and point
      it at `139.59.136.124`.
- [ ] Confirm propagation: `curl -s https://www.duckdns.org` isn't useful
      here — just check `nslookup bookalyzer.duckdns.org` resolves to the
      droplet IP before running certbot.

### 2. MySQL
```sql
CREATE DATABASE bookalyzer_prod CHARACTER SET utf8mb4;
CREATE USER 'bookalyzer_app'@'localhost' IDENTIFIED BY '<fresh strong password>';
GRANT ALL PRIVILEGES ON bookalyzer_prod.* TO 'bookalyzer_app'@'localhost';
FLUSH PRIVILEGES;
```
- [ ] **Verify the password actually took** —
  `mysql -u bookalyzer_app -p bookalyzer_prod -e "SELECT 1;"` — it's easy to
  paste a placeholder string literally instead of substituting the real
  password into the `CREATE USER` statement. This happened on the first
  bootstrap and went unnoticed until `prisma migrate deploy` failed with
  `Access denied`.
- [ ] If the password contains `/`, `@`, `:`, `#`, or `?`, note that it'll
  need percent-encoding in `DATABASE_URL` later (see step 5).

### 3. Repo access
- [ ] GitHub repo exists and this machine can `git push` to it.
- [ ] SSH key for droplet access exists locally (`~/.ssh/id_ed25519_do` or
  similar) and its public half is in the droplet's `~/.ssh/authorized_keys`.
- [ ] `~/.ssh/config` has a `do-deploy` host alias pointing at
  `139.59.136.124`. Test: `ssh do-deploy "whoami && hostname"`.
- [ ] The droplet itself needs **no** GitHub credentials — it only ever
  clones/fetches a public repo. If the repo is ever made private, the
  droplet will need read-only deploy-key access added; don't add push
  credentials there under any circumstances (keep the one-way flow: local
  pushes, droplet only pulls).

### 4. Clone
```bash
ssh do-deploy "git clone https://github.com/<user>/Bookalyzer.git ~/bookalyzer"
```
Directory must be empty/nonexistent first — `git clone` refuses otherwise.

### 5. `.env` (created by hand, never via git)
```bash
ssh do-deploy "cat > ~/bookalyzer/.env << 'EOF'
DATABASE_URL=\"mysql://bookalyzer_app:<url-encoded password>@localhost:3306/bookalyzer_prod\"
SESSION_SECRET=\"<openssl rand -base64 32>\"
NODE_ENV=production
PORT=3001
EOF
chmod 600 ~/bookalyzer/.env"
```
- [ ] File exists, mode `600`.
- [ ] Password is percent-encoded if it contains URL-reserved characters.

### 6. First build + migrate (manual — PM2 not registered yet)
```bash
ssh do-deploy "cd ~/bookalyzer && mkdir -p public/uploads/covers && npm ci && npx prisma generate && npx prisma migrate deploy && npm run build"
```
- [ ] `npm ci` installed the full package set (~450 packages), not a
  suspiciously small number (~118) — a small count means devDependencies
  got skipped, usually because `NODE_ENV=production` leaked into the shell
  before `npm ci` ran. See the runbook's note on this exact bug.
- [ ] Build ends with the route table printed, no `Failed to compile`.

### 7. PM2
```bash
ssh do-deploy "cd ~/bookalyzer && PORT=3001 pm2 start npm --name bookalyzer -- start && pm2 save"
```
- [ ] `pm2 list` shows `bookalyzer` `online`, alongside (not replacing) the
  other apps already running.
- [ ] `pm2 save` ran — persists into the systemd unit the box already has,
  no new systemd unit needed.

### 8. Content + real admin
```bash
ssh do-deploy "cd ~/bookalyzer && npx tsx scripts/import-content.ts"
ssh do-deploy "cd ~/bookalyzer && npx tsx scripts/create-admin.ts --email=<real> --name=\"<real>\" --password=\"<real, not empty>\""
```
- [ ] Import reports `Imported N file(s) successfully` (warnings about
  question-bank size are fine — content quality, not a deploy blocker).
- [ ] **Do not** use an empty or default password for the real admin
  account, even for convenience — `/admin/login` is public once nginx is
  wired up. If you want the login form to skip typing the email, that's
  safe to hardcode as a UI default (it's a username, not a secret); the
  password field should not get the same treatment.
- [ ] `prisma/seed.ts` was never run against this database.

### 9. Security check before exposing to the internet
- [ ] `npm audit` reviewed — no unresolved `critical` findings in `next` or
  `react` specifically. Check `npm view next dist-tags` for the current
  `backport`/`latest` tags rather than assuming the version in
  `package.json` is still current; Next.js has shipped multiple
  mid-cycle security advisories.
- [ ] `curl http://127.0.0.1:3001/api/health` → `{"status":"ok"}` — confirms
  DB connectivity before going further.

### 10. Nginx + TLS
```bash
ssh do-deploy "cat > /etc/nginx/sites-available/bookalyzer << 'EOF'
server {
    listen 80;
    server_name bookalyzer.duckdns.org;
    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_cache_bypass \$http_upgrade;
        client_max_body_size 10m;
    }
}
EOF
ln -sf /etc/nginx/sites-available/bookalyzer /etc/nginx/sites-enabled/bookalyzer
nginx -t && systemctl reload nginx"
ssh do-deploy "certbot --nginx -d bookalyzer.duckdns.org --non-interactive"
```
- [ ] `nginx -t` passes both before and after certbot runs.
- [ ] Certbot's Let's Encrypt account is already registered on this box
  (from other domains) — no `--agree-tos`/`--email` needed for a new cert
  on an existing account. If this is a rebuilt droplet with no prior
  certbot history, add `--agree-tos -m <email>` to the certbot command.
- [ ] `curl -I https://bookalyzer.duckdns.org` → `200`.
- [ ] `curl -I http://bookalyzer.duckdns.org` → `301` to `https://`.

## Routine pre-flight (every deploy, not just first)

- [ ] `git status` clean, nothing uncommitted you meant to ship.
- [ ] If `deploy_to_do.sh` itself changed, use the manual bootstrap sequence
  in the runbook instead of the normal two-command flow.
- [ ] After: `pm2 list` shows `bookalyzer` online with a restart counter
  that only went up by however many times *you* restarted it.

## Rollback plan

See the runbook's Rollback section. Short version: `git reset --hard
<previous-sha>` on the droplet, rerun steps 6's commands, `pm2 restart
bookalyzer`. There is no automated backup/snapshot step in
`deploy_to_do.sh` today (unlike some other apps on this box) — if that's
wanted, it'd be a deliberate addition, not something already covered.

## Troubleshooting

```bash
pm2 logs bookalyzer
pm2 logs bookalyzer --lines 200 --nostream
sudo nginx -t
sudo systemctl status nginx
ss -tlnp | grep 3001
mysql -u bookalyzer_app -p bookalyzer_prod -e "SHOW TABLES;"
```
