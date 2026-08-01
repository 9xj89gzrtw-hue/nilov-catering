# ASSET INVENTORY TRACKER — NiloV Catering

**Source**: `01_VISUAL_STYLE_GUIDE.md` §7.1  
**Status Codes**: ⬜ Not Started | 🟨 In Progress | 🟦 Sourced/Generated | 🟩 Approved | ⬛ Rejected

---

## P0 — LAUNCH BLOCKERS (Must have before any deploy)

| # | Block | Asset | Type | Spec | Source | Status | File Path | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | HeroBlock | Hero video | WebM/MP4 | §4.1 (10-15s, <5MB) | NiloV shoot | ⬜ | `/public/videos/hero/banquet.webm` | Exists but verify loop/seamless |
| 2 | HeroBlock | Hero poster | WebP | §4.1 (1920×1080) | NiloV shoot | ⬜ | `/public/images/hero/poster.webp` | First frame of video |
| 3 | HeroExtras | Furshet mini-video | WebM | §4.2 (5s, <500KB) | NiloV shoot | ⬜ | `/public/videos/menu/furshet-hero.webm` | |
| 4 | HeroExtras | Banquet mini-video | WebM | §4.2 (5s, <500KB) | NiloV shoot | ⬜ | `/public/videos/menu/banquet-hero.webm` | |
| 5 | HeroExtras | Coffee-break mini-video | WebM | §4.2 (5s, <500KB) | NiloV shoot | ⬜ | `/public/videos/menu/coffee-break-hero.webm` | |
| 6 | MenuPreview | Furshet cover | Photo + WebP | §3.2 (Square) | NiloV shoot | ⬜ | `/public/images/menu/furshet-cover.webp` | |
| 7 | MenuPreview | Banquet cover | Photo + WebP | §3.2 (Square) | NiloV shoot | ⬜ | `/public/images/menu/banquet-cover.webp` | |
| 8 | MenuPreview | Coffee-break cover | Photo + WebP | §3.2 (Square) | NiloV shoot | ⬜ | `/public/images/menu/coffee-break-cover.webp` | |
| 9 | MenuPreview | Detskoe cover | Photo + WebP | §3.2 (Square) | NiloV shoot | ⬜ | `/public/images/menu/detskoe-cover.webp` | |
| 10 | FormatShowcase | Furshet hero | Photo + WebP | §3.1 (16:10) | NiloV shoot | ⬜ | `/public/images/formats/furshet-hero.webp` | |
| 11 | FormatShowcase | Banquet hero | Photo + WebP | §3.1 (16:10) | NiloV shoot | ⬜ | `/public/images/formats/banquet-hero.webp` | |
| 12 | FormatShowcase | Coffee-break hero | Photo + WebP | §3.1 (16:10) | NiloV shoot | ⬜ | `/public/images/formats/coffee-break-hero.webp` | |
| 13 | EventTypeSelector | Korporativ cover | Photo + WebP | §3.3 (3:2) | NiloV shoot | ⬜ | `/public/images/events/korporativ-cover.webp` | |
| 14 | EventTypeSelector | Svadba cover | Photo + WebP | §3.3 (3:2) | NiloV shoot | ⬜ | `/public/images/events/svadba-cover.webp` | |
| 15 | EventTypeSelector | Vypusknoy cover | Photo + WebP | §3.3 (3:2) | NiloV shoot | ⬜ | `/public/images/events/vypusknoy-cover.webp` | |
| 16 | EventTypeSelector | Chastnoe cover | Photo + WebP | §3.3 (3:2) | NiloV shoot | ⬜ | `/public/images/events/chastnoe-cover.webp` | |
| 17 | EventTypeSelector | Detskoe cover | Photo + WebP | §3.3 (3:2) | NiloV shoot | ⬜ | `/public/images/events/detskoe-cover.webp` | |
| 18 | EventTypeSelector | Chef-at-home cover | Photo + WebP | §3.3 (3:2) | NiloV shoot | ⬜ | `/public/images/events/chef-at-home-cover.webp` | |
| 19 | TrustBar | Client logos | SVG | §6.1 (8-12) | NiloV archive | ⬜ | `/public/icons/clients/*.svg` | Verify permissions |
| 20 | Hero Dishes | 12 hero dishes (4 formats × 3 tiers) | Photo + hover video | §3.2 + §4.2 | NiloV shoot | ⬜ | `/public/images/dishes/hero-*.webp` + `/public/videos/dishes/hero-*.webm` | Top 3 dishes per tier per format |

---

## P1 — CORE EXPERIENCE (All format pages + catalog)

### 78 Dish Photos (from MenuTariffs.tsx)

| # | Category | Dish Name | Tier(s) | Angle | Status | Photo Path | Video Path |
|---|---|---|---|---|---|---|---|
| 21 | Канапе | Канапе с красной рыбой | Economy, Standard, Premium | Top-down | ⬜ | | |
| 22 | Канапе | Канапе с сыром | Economy, Standard | Top-down | ⬜ | | |
| 23 | Канапе | Канапе с хамом | Standard, Premium | Top-down | ⬜ | | |
| 24 | Канапе | Канапе овощное | Economy | Top-down | ⬜ | | |
| 25 | Тарталетки | Тарталетка куриная | Economy, Standard | 45° | ⬜ | | |
| 26 | Тарталетки | Тарталетка грибная | Economy, Standard | 45° | ⬜ | | |
| 27 | Тарталетки | Тарталетка с икрой | Premium | 45° | ⬜ | | |
| 28 | Тарталетки | Тарталетка овощная | Standard | 45° | ⬜ | | |
| 29 | Закуски | Мясное плато | Standard, Premium | Hero | ⬜ | | |
| 30 | Закуски | Сырная тарелка | Standard | Top-down | ⬜ | | |
| 31 | Закуски | Буррата + томаты | Standard, Premium | 45° | ⬜ | | |
| 32 | Закуски | Антипасто | Premium | Hero | ⬜ | | |
| 33 | Закуски | Овощи гриль | Standard | Top-down | ⬜ | | |
| 34 | Горячее | Куриное филе гриль | Standard, Premium | 45° | ⬜ | | |
| 35 | Горячее | Стейк из говядины | Premium | Hero | ⬜ | | |
| 36 | Горячее | Лосось гриль | Premium | 45° | ⬜ | | |
| 37 | Горячее | Мини-бургер | Standard, Premium | 45° | ⬜ | | |
| 38 | Горячее | Пицца-станция | Standard | Hero | ⬜ | | |
| 39 | Горячее | Паста-станция | Premium | Hero | ⬜ | | |
| 40 | Десерты | Макаронс-шутер | Standard, Premium | Top-down | ⬜ | | |
| 41 | Десерты | Чизкейк-шутер | Standard | 45° | ⬜ | | |
| 42 | Десерты | Брауни-шутер | Standard, Premium | 45° | ⬜ | | |
| 43 | Десерты | Донат-стена | Premium | Hero | ⬜ | | |
| 44 | Десерты | Мини-тарт ассорти | Standard | Top-down | ⬜ | | |
| 45 | Десерты | Фруктовое плато | Economy, Standard | Top-down | ⬜ | | |
| 46 | Напитки | Клюквенный морс | All | 45° (glass) | ⬜ | | |
| 47 | Напитки | Ягодный лимонад | All | 45° (glass) | ⬜ | | |
| 48 | Напитки | Лимонад эстрагон | All | 45° (glass) | ⬜ | | |
| 49 | Напитки | Облепиховый чай | All | 45° (cup) | ⬜ | | |
| 50 | Напитки | Кедровый раф | All | 45° (cup) | ⬜ | | |
| 51 | Напитки | Welcome drink | Premium | 45° (glass) | ⬜ | | |
| 52 | Бар | Вино красное | Premium | 45° (glass) | ⬜ | | |
| 53 | Бар | Вино белое | Premium | 45° (glass) | ⬜ | | |
| 54 | Бар | Шампанское | Premium | 45° (flute) | ⬜ | | |
| 55 | Бар | Mocktail-бар | Premium | Hero | ⬜ | | |
| 56 | Бар | Кофе specialty | Premium | 45° (cup) | ⬜ | | |
| 57 | Детское | Мини-хот-дог | Detskoe | 45° | ⬜ | | |
| 58 | Детское | Наггетсы куриные | Detskoe | Top-down | ⬜ | | |
| 59 | Детское | Candy-bar | Detskoe | Hero | ⬜ | | |
| 60 | Детское | Смузи-бар | Detskoe | 45° (glass) | ⬜ | | |

**Note**: Dishes appearing in multiple tiers use SAME photo/video (consistent). Total unique dishes = ~60.

---

## P2 — RICH EXPERIENCE

| # | Block | Asset | Qty | Spec | Status |
|---|---|---|---|---|---|
| 61 | All 78 dishes | Hover videos (5s loop) | 60 unique | §4.2 | ⬜ |
| 62 | GalleryTeaser | Gallery photos | 6 | §3.3 (4:3) | ⬜ |
| 63 | HomeVideoShowcase | Event recap videos | 4-6 | §4.3 (8-12s) | ⬜ |
| 64 | TestimonialsCarousel | Video testimonials | 3-5 | §4.3 | ⬜ |
| 65 | TestimonialsCarousel | Client photos | 3-5 | §3.4 | ⬜ |

---

## P3 — POLISH

| # | Block | Asset | Qty | Spec | Status |
|---|---|---|---|---|---|
| 66 | Team | Team portraits | 6-10 | §3.4 | ⬜ |
| 67 | Kitchen/Process | Action shots | 8-10 | §3.4 | ⬜ |
| 68 | TrustProof | Certificate/badge photos | 5-8 | §3.4 | ⬜ |
| 69 | Seasonal | Seasonal heroes + dishes | 4×2 | §3.1/3.2 | ⬜ |
| 70 | Constructor | Station photos | 6-8 | §3.4 | ⬜ |
| 71 | Icons | Full icon set | 40+ | §6.1 | ⬜ |
| 72 | Illustrations | Empty states/onboarding | 8-10 | §6.2 | ⬜ |

---

## PROGRESS SUMMARY

| Priority | Total | ⬜ Not Started | 🟨 In Progress | 🟦 Sourced | 🟩 Approved | ⬛ Rejected |
|---|---|---|---|---|---|---|
| P0 | 20 | 20 | 0 | 0 | 0 | 0 |
| P1 | 60 unique | 60 | 0 | 0 | 0 | 0 |
| P2 | ~80 | 80 | 0 | 0 | 0 | 0 |
| P3 | ~80 | 80 | 0 | 0 | 0 | 0 |
| **TOTAL** | **~240** | **240** | **0** | **0** | **0** | **0** |

---

## NEXT ACTIONS

1. **Audit existing video** (`/public/videos/hero/banquet.webm`) — verify seamless loop, <5MB, color grade
2. **Commission food photographer** — 1-day shoot brief with Visual Style Guide
3. **Generate AI placeholders** for all P0 items (Midjourney prompts from §8.3) → deploy immediately
4. **Build icon set** in Figma → export SVG → React components
5. **Replace all SVG placeholders** in code with real assets as they arrive

---

*Update this tracker every session. One row = one deliverable. No vague "working on it".*