# Git workflow — simonask.io

Quick reference for managing code across **staging** and **production**.

---

## At a glance

| Branch | Website | When it deploys |
|--------|---------|-----------------|
| `staging` | [stage.simonask.io](https://stage.simonask.io) | Every push to `staging` |
| `main` | [simonask.io](https://simonask.io) | Every push to `main` |

**GitHub repo:** `SimonAndreAsk/simon-ask-personal-project`  
**Project folder:** `C:\Users\Simon\OneDrive\Desktop\simonask.io`

Branches do **not** stay in sync automatically. You merge when you want them to match.

---

## Mental model

```text
Edit locally → commit → push to staging → check stage.simonask.io
                              ↓
                    merge staging → main → push → simonask.io
```

**Sanity (articles)** is separate: publishing in Sanity updates content on both sites (same dataset). Only **code** (design, layout, features) follows this Git flow.

---

## Before you start

Open PowerShell in the repo root:

```powershell
cd "C:\Users\Simon\OneDrive\Desktop\simonask.io"
```

Check you’re clean (no half-finished edits):

```powershell
git status
```

If you have changes to keep, commit them first (see [[#Daily work (staging)]]).

**Commit identity (this repo only):**

- Name: Simon Ask  
- Email: `183377963+SimonAndreAsk@users.noreply.github.com`  

New commits should show as **SimonAndreAsk** on GitHub and Vercel.

---

## Daily work (staging)

Stay on `staging` for normal development.

```powershell
git checkout staging
git pull origin staging
```

Edit files, then:

```powershell
git add .
git commit -m "Short description of what changed"
git push origin staging
```

Wait 1–2 minutes, then open **https://stage.simonask.io**.

---

## Ship to production (staging → main)

Use when stage looks good and you want it on **simonask.io**.

```powershell
git checkout main
git pull origin main

git merge staging
git push origin main
```

Optional — switch back to staging:

```powershell
git checkout staging
```

### If merge has conflicts

Git will list conflicted files. Fix them in your editor, then:

```powershell
git add .
git commit -m "Merge staging into main"
git push origin main
```

---

## Sync staging after main-only changes (main → staging)

Use when you committed or merged something on **`main`** only and want **stage.simonask.io** to match.

```powershell
git checkout staging
git pull origin staging

git merge main
git push origin staging
```

### If merge has conflicts

```powershell
git add .
git commit -m "Merge main into staging"
git push origin staging
```

---

## Pull latest from GitHub

When GitHub has changes you don’t have locally (e.g. Vercel merged a PR):

```powershell
git pull origin staging    # if on staging
# or
git pull origin main       # if on main
```

If push is rejected, pull first:

```powershell
git pull --rebase origin staging
git push origin staging
```

---

## Cheat sheet

| I want to… | Commands |
|------------|----------|
| Work on staging | `git checkout staging` |
| Save work to stage site | `git add .` → `git commit -m "..."` → `git push origin staging` |
| Release to simonask.io | `checkout main` → `pull` → `merge staging` → `push origin main` |
| Update staging from main | `checkout staging` → `pull` → `merge main` → `push origin staging` |
| See current branch | `git branch` |
| See what changed | `git status` |

---

## Vercel

| Event | Result |
|-------|--------|
| Push to `staging` | New deployment → **stage.simonask.io** |
| Push to `main` | New deployment → **simonask.io** |
| Domain status | Vercel → Project → **Settings → Domains** |

If **stage.simonask.io** doesn’t load but Vercel shows **Valid**:

1. Confirm a **Ready** deployment exists for branch `staging`.
2. Run `ipconfig /flushdns` (Admin PowerShell) and retry.

---

## What Git does *not* do

- **Does not** publish Sanity articles — use Sanity Studio, then **Publish** there.
- **Does not** auto-sync `staging` and `main` — you merge explicitly.
- **Does not** change DNS — that’s Cloudflare + Vercel.

---

## Typical weekly loop

1. `git checkout staging` && `git pull`
2. Build or tweak site locally; optional `npm run dev` in `nextjs-simonask.io`
3. `git add .` → `commit` → `push origin staging`
4. Review on **stage.simonask.io**
5. When ready: merge **staging → main** and `push origin main`
6. Confirm **simonask.io**

---

## Related docs

- Repo overview: `README.md` (project root)
- Next.js app: `nextjs-simonask.io/README.md`
- Sanity Studio: `studio-simonask.io/README.md`
