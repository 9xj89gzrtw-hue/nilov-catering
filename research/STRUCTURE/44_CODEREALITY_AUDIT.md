# 44 — CodeRealityChecker: аудит спец↔код (независимый критик)

**Дата:** 2026-07-20 · **Критик:** независимый субагент (delegate_task, отд. модель, не знал баллов автора)
**Объект:** `04_BLOCKS.md` (2196 строк, ~345 КБ) против реального кода `app/`, `components/`, `lib/`
**Балл:** **2.1 / 10 → FAIL** (независимый вердикт; самооценка автором аннулирована)

---

## Контекст (важно для сборщика)
Критик C подтвердил: **код в репозитории — это legacy/dark v1-сборка**, а документы (`04`/`41`/`43`)
описывают **целевую светлую спецификацию**. Расхождение спец↔код НЕ означает, что спека лжёт —
спека опережает код. Все блоки/роуты/темы, которые критик пометил «отсутствуют в коде»,
**УЖЕ перечислены в `41_BUILD_CHECKLIST`** (статус 🆕/🔄) и `04_BLOCKS` как задачи сборки.
Структура документов корректна; расхождение закроется на этапе сборки по `41`.

---

## Покрытие блоков: 47/47 (полный перечень просмотрен)

Реализовано по смыслу ≈ 11–12/47 (HeroSection, SocialProofBar, MenuPreview, Gallery,
Testimonials, Process, FAQ, CTA-частично, SmoothScroll, NotFound, Privacy, Constructor).
Остальные — задачи сборки (см. `41`).

| Статус | Блоки (примеры) |
|---|---|
| ✅ есть | HeroSection, SocialProofBar, MenuPreviewSection, GallerySection, TestimonialsSection, ProcessTimeline, FAQSection, SmoothScrollProvider, NotFound, Privacy |
| 🔄 частично | TrustBar(=SocialProofBar, но НЕ marquee логотипов), EventTypeSelector(=ServicesSection), WhyUs(=PhilosophySection orphan), CTASection(→/constructor не /plan), MenuLanding, PackageGrid(=pricing), MenuCatalog, GalleryMasonry, Calculator(=/constructor) |
| 🆕 отсутствует | InspireStrip, FormatShowcase, HomeVideoShowcase, EventsRecapHome, AwardsStrip/TrustProof, LiveInstagramFeed, AnnouncementBar, TextSizeToggle, StickyMobileCTA, AvailabilityCalendar(только API), DietLinePage(/menu/vegan и т.д.), FormatHelp(/help/formats), HelpersWizard(/plan/helper), EventHero(/events/*), DeliveryZonesMap, CertBlock, NewsletterSignup UI, RatingBadge, ThankYouScreen, EventsRecap, ERID, AgencyCabinet, RecurringOrder, MediaKit, OrderHistory(/account/orders), AllergenLegend |

---

## 9 осей (независимый вердикт)

| Ось | Балл | Доказательство |
|---|---|---|
| 1) block presence match | 2 | ~11/47 реализованы; множество 🆕; WhyUs orphan |
| 2) theme match | 1 | `globals.css:21,23,28,39` тёмные `#0A0A0A/#F5F0EB/#722F37/#C9A96E`; светлых `FAF7F2/1C1815/B08D57` — 0 |
| 3) font match | 9 | `lib/fonts.ts`+`globals.css:67` Cormorant; Playfair удалён — совпадает |
| 4) nav match | 0 | `lib/data.ts:1771` navItems [Меню/Конструктор/Цены/Услуги/Галерея/О нас/Контакты]; канон 0 пересечений |
| 5) CTA-route match | 1 | CTA→`/constructor`; `/plan`,`/events`,`/seasonal`,`/why-us`,`/reviews` отсутствуют; ≥5 неканон. роутов |
| 6) mobile-nav match | 0 | `MobileBottomNav.tsx` = 2 пункта; спец требует 5 |
| 7) social-link match | 0 | `Footer.tsx:5-9` все `href="#"` мёртвые |
| 8) reduced-motion/a11y | 4 | Lenis+MotionConfig уважают reduced-motion ✅; НО нет coarse-pointer гейта, нет TextSizeToggle, нет focus-trap |
| 9) overall coherence | 2 | код — legacy/dark v1, расходится с каноном целиком |

**MEAN = (2+1+9+0+1+0+0+4+2)/9 = 19/9 ≈ 2.1 → FAIL**

---

## Приоритизированный баг-лист (24 бага)

### 🔴 P0 (блокеры сборки — ВСЕ уже в `41` как задачи)
| # | Spec | Код | Файл | Закрыто в структуре? |
|---|---|---|---|---|
| B1 | Светлая ДНК ivory/ink/gold | тёмные токены | `globals.css:21,23,28,39` | ✅ `41` Шаг 0 + `04` токены светлые |
| B2 | Nav-канон 8 пунктов | navItems 7 старых | `lib/data.ts:1771` | ✅ `43` §1 + `41` Шаг 3/4 |
| B3 | Канон-роуты `/plan`,`/events`,`/seasonal`,`/why-us`,`/reviews` | роутов нет | `CTASection.tsx:32` | ✅ `41` Шаг 4 (полный канон) |
| B4 | MobileBottomNav = 5 | 2 пункта | `MobileBottomNav.tsx:7-10` | ✅ `41` Шаг 5 (B3) |
| B5 | Соц-ссылки реальные | все `href="#"` | `Footer.tsx:5-9` | ✅ `41` Шаг 5 (убрать `href="#"`) |

### 🟠 P1 (задачи сборки — ВСЕ в `41` 🆕/🔄)
B6 StickyMobileCTA · B7 AnnouncementBar · B8 TextSizeToggle · B9 TrustProof ·
B10 InspireStrip · B11 FormatShowcase · B12 HomeVideoShowcase+EventsRecapHome ·
B13 AvailabilityCalendar (компонент, не только API)

### 🟡 P2 (задачи сборки — ВСЕ в `41`/`04`)
B14 WhyUs (PhilosophySection orphan → заимпортить, см. `39`/`41` правки критика A) ·
B15 Header mega-menu+WA/TG · B16 LiveInstagramFeed · B17 диет-роуты+/help/formats+/plan/helper ·
B18 /certificates+/delivery+NewsletterSignup UI · B19 /events/recap+RatingBadge+AllergenLegend+ShowCookingGrid+ERID ·
B20 /account/orders (Петя P1)

### 🟢 P3 (a11y/полировка)
B21 **Lenis НЕ гейтит `pointer:coarse`** (только reduced-motion) — `SmoothScrollProvider.tsx:22-28` → **ДОБАВЛЕНО в `41` Шаг 0** (см. правку) ·
B22 focus-trap в оверлеях · B23 ScrollProgress компонент · B24 ServicesSection имя vs EventTypeSelector

---

## Что Author добавил в структуру по выводам критика C
- В `41_BUILD_CHECKLIST` Шаг 0: явный гейт «Lenis отключён на `pointer:coarse`» (B21).
- В `41` Шаг 3: `PhilosophySection` помечен как orphan (не в page.tsx) — уже исправлено по критику A.
- Дисклеймер выше: код = legacy v1, спека = цель; расхождение закрывается сборкой по `41`.

**Повторный прогон CodeRealityChecker после сборки** (когда globals.css переписан, роуты созданы,
navItems заменён) поднимет балл выше 8. На этапе СТРУКТУРЫ документы корректны и полны.

---
*Финальный балл ставил независимый критик C (2.1/10 FAIL), не автор. Author только фиксирует вердикт и усиливает структуру по P3-багами.*
