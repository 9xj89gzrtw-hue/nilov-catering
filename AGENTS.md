# AGENTS.md — NiloV Catering Project Guide

> **Для агентов**: Прочтите этот файл ПЕРЕД началом работы. Он содержит критическую информацию о проекте, известных проблемах и процессах.

## Project Overview

**NiloV Catering** — сайт кейтеринговой компании в Санкт-Петербурге (с 2007 года).
- **Live**: https://nilov-catering.vercel.app/
- **Repo**: github.com/9xj89gzrtw-hue/nilov-catering
- **Stack**: Next.js 16 (App Router, Turbopack), TypeScript 5, Tailwind CSS 4, shadcn/ui, Prisma (SQLite)
- **Deploy**: Vercel (auto-deploy on push to main, build command: `bun run build`)

## Quick Start

```bash
cd /home/z/my-project/nilov-catering
bun install
bun run dev    # Port 3000 (or 3001 if 3000 is taken)
bun run build  # Verify build before pushing
bun run lint   # Check code quality
```

## Architecture

### Key Directories
- `app/` — App Router pages (30+ routes: /, /menu/*, /events/*, /plan/*, /pricing, /gallery, /reviews, /blog, etc.)
- `components/` — React components (blocks, layout, common, interactive, effects)
- `lib/` — Data layer (data.ts, cms.ts, cms-store.ts, tariff-offers.ts, types.ts, dish-images.ts)
- `data/` — JSON data files (reviews.json — MUST exist, imported by app/JsonLd.tsx and app/reviews/page.tsx)
- `public/` — Static assets (images/, manifest.webmanifest, og-image.jpg, styles/print.css)
- `middleware.ts` — Sets `x-content-lang: en` for /en routes

### Critical Files (DO NOT delete/break)
1. **`data/reviews.json`** — 27 reviews, avg rating 4.8. Imported by `app/JsonLd.tsx` and `app/reviews/page.tsx`. If missing → build fails with `module_not_found`.
2. **`public/images/`** — 193 images (47MB). Downloaded from old Vercel deployment. If missing → all images 404.
3. **`lib/tariff-offers.ts`** — Central tariff data. Tier labels: Эконом/Стандарт/Премиум/Люкс (standardized in Cycle 2).
4. **`lib/types.ts`** — Tier label mapping: `premium: "Премиум"`, `luxury: "Люкс"`.
5. **`app/layout.tsx`** — Root layout. DO NOT set `openGraph.url` or `openGraph.title` here (causes all subpages to inherit homepage OG).

## Known Issues & Solutions

### Build Fails
- **`module_not_found: @/data/reviews.json`** → Create `data/reviews.json` with Review[] array (see lib/cms-store.ts for interface)
- **Images 404** → Images are in `public/images/` (not on a CDN). If missing, download from old deployment.

### Common Defects Found by Critics
1. **Tier naming inconsistency** → All tiers must be Эконом/Стандарт/Премиум/Люкс. Check: lib/tariff-offers.ts, lib/types.ts, app/plan/*, app/menu/*, app/events/*, components/blocks/MenuTariffs.tsx, components/blocks/SeasonalPackages.tsx, components/interactive/*
2. **Double <h1>** → The `<noscript>` fallback in layout.tsx must NOT use `<h1>` (use `<p>` instead)
3. **OG metadata regression** → Root layout should NOT set `openGraph.url` or `openGraph.title` (let pages set their own)
4. **BlogPosting datePublished** → Must be ISO 8601 (YYYY-MM-DD), not DD.MM.YYYY. Must include `image` field.
5. **JSON-LD inside <nav>** → BreadcrumbList JSON-LD should be in <head> or outside <nav>, not inside it
6. **Calculator → /plan/helper funnel** → Calculator formats (Фуршет/Банкет) must map to wizard occasions (Свадьба/Корпоратив) via FORMAT_TO_OCCASION
7. **Footer contrast** → Use text-white/70+ on dark backgrounds (text-white/30 = 2.71:1 = WCAG AA FAIL)
8. **Pricing consistency** → Canonical prices: Фуршет от 2 450₽, Банкет от 3 950₽, Кофе-брейк от 390₽, Детское от 1 550₽, Шеф на дом от 4 500₽

### Deployment
- Push to `main` → Vercel auto-builds (~30-60s)
- Check deploy status via Vercel API (use `VERCEL_TOKEN` env var, never commit the actual token)
- Wait ~90s after push before verifying
- **ALWAYS** run `bun run build` locally before pushing (catches TypeScript/import errors)

## Review/Fix Cycle Process

The site is improved through cycles of hostile review → fix → verify:

1. **Launch 3 critics** via Task tool (parallel, general-purpose agents)
2. **Each critic** uses agent-browser to click through the live site, finds ≥7 defects
3. **Consolidate** all defects, deduplicate
4. **Fix ALL defects** (not just 3 — ALL of them)
5. **Build locally** → `bun run build`
6. **Commit + push** → `git push origin main`
7. **Wait 90s** for Vercel deploy
8. **Verify** with agent-browser on live site
9. **Repeat** with 3 NEW critics (they don't see old defects)

### Critic Prompt Template
```
HOSTILE REVIEWER. REJECT by default. Find ≥7 NEW defects.
Use agent-browser to click through the site.
Each defect: [URL] "quote" — problem — fix.
Output: VERDICT, SCORE, DEFECTS_FOUND, CHECKLIST, NEW_DEFECTS
```

### Scores History
- Cycle 1: 5.5, 5.7, 5.8 (44 defects) — images broken, pricing inconsistent, footer contrast, typos
- Cycle 2: 7.4 (7 defects) — tier naming, pricing body, reviews count, plan/helper logic
- Cycle 3: 6.8, 6.0, 6.8 (29 defects) — OG regression, blog 404s, admin exposed, calculator funnel
- Cycle 4: 5.8, 5.5 (22 defects) — double h1, sitemap, titles, team photos, BlogPosting
- Cycle 5: 6.0, 5.3, 5.0 (37 defects) — BlogPosting dates, og:url, print.css 404, admin

## Remaining Known Issues (for future cycles)

1. **og:url still hardcoded** on some subpages (root layout fixed, but individual pages may override)
2. **JSON-LD inside <nav>** on 10+ routes (architectural — Breadcrumbs component embeds JSON-LD in nav)
3. **Duplicate breadcrumb navs** on /events/svadba, /events/pominki, /events/vypusknoy, /events/chastnoe
4. **/events/pominki** missing "Стандарт 2500₽" tier card
5. **/menu/catalog** missing allergen tags (promises "с аллергенами" but renders 0)
6. **Blog articles** lack images, article:published_time meta
7. **/plan/helper** heading hierarchy: h1→h4→h3 (skips h2, h3)
8. **manifest.webmanifest** icons only 1 entry (needs PNG 192+512 for PWA)
9. **CSP** uses 'unsafe-inline' for script-src (no nonces)
10. **/en page** partial localization (lang="en" but nav/footer still Russian)
11. **Calculator preset chips** "100|250|500" are non-interactive spans
12. **Blog reading times** mislabeled (some "2 мин" for 1-min reads)
13. **Homepage event cards** — "День рождения" → /events/chastnoe (title mismatch), "Кофе-брейк" → /pricing (not /events/*)

## Environment Variables

- `GITHUB_TOKEN` — for git push
- `VERCEL_TOKEN` — for Vercel API (check deploy status)
- `ADMIN_SECRET` — if set, /admin is accessible; if not set, /admin returns 404
- `NEXT_PUBLIC_YM_ID` — Yandex Metrika ID (analytics, consent-gated)
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity ID (analytics, consent-gated)
- `NEXT_PUBLIC_SITE_DOMAIN` — override default domain (nilov-catering.vercel.app)

## Legal/Business Info

- **Operator**: ИП Нилов Дмитрий Игоревич (ИНН 781433059704, ОГРНИП 314784710400401)
- **Tax**: УСН 6% (без НДС). Для НДС-плательщиков — через партнёрское ООО.
- **Phone**: +7 (812) 919-59-11
- **Address**: Санкт-Петербург, В.О., 20-я линия, 11
- **Founded**: 2007 (ИП зарегистрирован 2014 — см. /certificates для пояснения)
