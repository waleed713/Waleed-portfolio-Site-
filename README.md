# Waleed Ahmad — Portfolio (Next.js 16 + TypeScript + Tailwind v4 + Lenis)

## Run locally
```bash
npm install
cp .env.example .env.local     # then edit ADMIN_PASSWORD and AUTH_SECRET
npm run dev                    # http://localhost:3000
```
Admin panel: **/admin** (sign in with `ADMIN_PASSWORD`).

## What the admin can do
- **Projects** – upload screenshot, title, category, tags, live URL, client, year, optional Markdown case study, publish/draft, feature.
- **Blog posts** – Markdown editor with toolbar, live preview, inline image upload, cover image, tags, publish/draft.
- **Messages** – contact-form enquiries land here. Set `WEB3FORMS_KEY` to also get each one by email (sent from the visitor's browser, because Web3Forms blocks server calls on the free plan).

## Where things live
- `data/*.json` – projects, posts, messages (your content)
- `data/uploads/` – images uploaded from the admin
- `lib/site.ts` – name, contact info, services, process steps, stats (edit text here)
- `components/site/*` – homepage sections

## Deploying
Content is stored in JSON files, so you need a host with a **persistent disk**
(VPS, Railway, Render, Fly.io with a volume, Docker volume).
On Vercel the filesystem is read-only — swap `readCollection/writeCollection`
in `lib/db.ts` for Supabase / Neon / Turso and uploads for Vercel Blob / Cloudinary.
Always set `ADMIN_PASSWORD`, `AUTH_SECRET` and `NEXT_PUBLIC_SITE_URL` in production.

## Fonts
Headings: **Jika** (`public/fonts/Jika.otf`) · Body: **Jost** (via `@fontsource-variable/jost`).
Jika is free for personal use only — buy a commercial licence from 7ntypes.com for a business/freelance site.
