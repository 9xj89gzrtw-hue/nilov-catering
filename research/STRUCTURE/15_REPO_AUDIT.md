# 15 — АУДИТ РЕПОЗИТОРИЯ (задача B, 2026-07-18)

**Зачем:** сверить готовую структуру (`00–14`) с тем, что УЖЕ есть в
`~/Documents/hermes/catering-site`. Решить: что переиспользовать, что перекрасить,
что переименовать, что дописать. Сборка в этом чате НЕ ведётся.

---

## 1. Стек — СОВПАДАЕТ (проверено в package.json)
- `next@16.2.10`, `react@19.2.4`, `tailwindcss@4`, `framer-motion@12.42.2`,
  `lenis@1.3.25`, `zod@4.4.3`, `zustand@5.0.14`, `@react-pdf/renderer@4.5.1`, `shadcn@4.13.0`.
- Доп. (есть, в структуре не упомянуты, но полезны): `embla-carousel-*`, `sonner`, `next-themes`.
- ⚠️ НЕТ в deps: `gsap`. В структуре везде GSAP ScrollTrigger. **Решение (принято):** НЕ ставить gsap,
  а использовать Framer Motion (`useScroll`/`whileInView`/`useReducedMotion`), который УЖЕ в deps
  и покрывает ~90% reveal/parallax/scroll. См. `05_BUILD` Фаза 0/5, `06_TOKENS` §4.
- ⚠️ Рядом лежит форк `nilov-catering/` (дубликат с `PriceCalculator`, `MenuBuilder` и т.д.).
  **НЕ трогать** — источник истины `catering-site/`. Форк = старая ветка.

## 2. globals.css — КРИТИЧНО: до сих пор ТЁМНЫЙ
`app/globals.css` начинается с `/* Design System: Cinematic Dark (Awwwards SOTD) */`
и задаёт `--color-background: #0A0A0A`, тёмные карточки, тёмные тени.
**Фаза 0 = полностью переписать `globals.css` по `06_TOKENS.md` (light system).**
Все существующие секции (HeroSection и т.д.) заточены под тёмный — после смены токенов
они «поедут» (белый текст на белом). Значит Фаза 0 обязательна ДО любой сборки.

## 3. Роуты: что есть vs что в новой IA (`02_IA.md`)

| Существует сейчас | Новая IA | Действие |
|---|---|---|
| `/` | `/` | пересобрать (светлая) |
| `/services`, `/services/[slug]` (weddings/corporate/private) | `/events/*` | **переименовать** роуты → `/events/*` + 301-редиректы |
| `/about` | `/why-us` | переименовать + редирект |
| `/testimonials` | `/reviews` | переименовать + редирект |
| `/pricing` | слито в `/plan/calculator` + `/menu` | удалить, редирект на `/plan/calculator` |
| `/quote` | `/plan/calculator` (единый «спланировать») | **переименовать `/quote`→`/plan/calculator`** + редирект |
| `/constructor` | `/plan/constructor` | переименовать → `/plan/constructor` |
| `/menu` | `/menu` + подстраницы | дописать `/menu/furshet` `/banquet` `/coffee-break` `/catalog` `/show-cooking` |
| `/gallery` | `/gallery` | ок (группировка по событиям внутри) |
| `/team` | `/team` | **уже есть** — ок, оставить отдельной |
| `/contact` | `/contact` | ок |
| `/faq` `/blog` `/blog/[slug]` `/privacy` `/terms` `/cookies` | без изменений | ок |
| — | `/events/chef-at-home` | **новый** роут (выезд шефа+сомелье) |
| — | `/seasonal` | **новый** роут (сезонные модули) |
| — | `/plan` (хаб) | **новый** хаб-роут |

**API-расхождение:** в репо `/api/quote`, `/api/constructor`, `/api/booking`, `/api/availability`,
`/api/contact`, `/api/newsletter`. Спеки `07/08` ссылаются на `/api/calculate`.
→ Решение: оставить `/api/quote` (переименовать логически в calculate внутри) ИЛИ
добавить `/api/calculate` как алиас. Зафиксировать при Фазе 3.

## 4. Компоненты: что УЖЕ есть (переиспользовать/перекрасить)

`components/` уже содержит НЕПУСТОЙ набор (в отличие от `components/blocks`, который пуст):
- **layout:** `Header`, `Footer`, `MobileBottomNav`, `MobileNav` — перекрасить в светлую.
- **sections (тёмные, подправить):** `HeroSection`, `ServicesSection`, `MenuPreviewSection`,
  `GallerySection`, `SocialProofBar`, `TestimonialsSection`, `ProcessTimeline`, `PhilosophySection`,
  `CTASection`, `FAQSection` — это ПРЯМЫЕ аналоги блоков `04_BLOCKS`! Переименовать в
  `blocks/` и перекрасить, а не писать заново.
- **constructor:** `FormatSelector`, `GuestsSlider`, `TierSelector`, `AddOnsSelector`, `StepProgress`,
  `SummaryCard`, `ContactForm` — **почти готовый** `Constructor` из `08_CONSTRUCTOR_SPEC`!
  Дописать недостающее (custom-menu builder, allergen filter) и перекрасить.
- **quote:** `QuoteForm` → адаптировать под `Calculator` (`07`), добавить count-up, package grid.
- **gallery:** `GalleryGrid`, `GalleryFilter`, `GalleryLightbox` → `GalleryMasonry` + parallax.
- **effects (готовые примитивы движения!):** `MagneticButton`, `ParallaxImage`, `TextReveal`,
  `CustomCursor`, `NoiseOverlay`, `AnimatedCounter` (= наш CountUp), `AnimatedSection` (= наш Reveal).
  → Это СНИМАЕТ кучу работы: Reveal/Magnetic/Parallax/Ken-Burns-база уже есть.
- **common:** `Breadcrumbs`, `CookieBanner`, `CountUpNumber`, `Skeleton`, `SkipLink`, `ScrollToTop`,
  `ThemeProvider`.
- **seo:** `StructuredData` → наш `SchemaBlock` (JSON-LD). Готово.
- **ai:** `Консьерж` (AI-слой в резерве, модель не подключена), `VoiceSearch` — В РЕЗЕРВ (по `05_BUILD` не в MVP). Удалять не надо,
  просто не подключать.

**Вывод:** сборка НЕ с нуля. Есть ~40 компонентов в тёмной теме. План:
1. Фаза 0 — перекрасить `globals.css` + `components/ui/*` (button/card/badge) в светлую.
2. Фаза 0 — переименовать `sections/*`/`effects/*` в `blocks/*` по `04_BLOCKS`, подправить типографику.
3. Фазы 1–4 — дописать недостающее (Events хаб, Calculator count-up, Constructor custom,
   Seasonal, WhyUs, Reviews, LiveInstagram, AvailabilityCalendar, AwardsStrip, TrustProof).

## 5. Чего НЕТ (дописать с нуля)
- `AwardsStrip`, `TrustProof`, `LiveInstagramFeed`, `AvailabilityCalendar`, `StickyMobileCTA`
  (глобальный; есть MobileBottomNav, но не тот паттерн), `TeamGrid` (страница `/team` есть,
  но компонента-грида нет), `BlogEditorial`, `SeasonalModule`, `WhyUs` секция.
- Подстраницы `/menu/*` (только `/menu` есть).
- `Container`, `SectionHeading`, `PriceTag`, `ImageWithBlur` (есть `ParallaxImage`, но blur-up отдельно нет),
  `Marquee` (для TrustBar), `Tabs` (для меню/событий), `Reveal` (есть `AnimatedSection` — алиас).
- `@react-pdf/renderer` подключён — `07` PDF-КП реализуем.

## 6. Риски
- [ ] После смены `globals.css` на светлую — ВСЕ существующие секции временно «сломаются»
      (белый текст на светлом). Это ожидаемо; чиним в Фазе 2 постранично.
- [ ] `next-themes` в deps — возможно, стоит убрать (мы НЕ делаем dark/light toggle, только светлую).
- [ ] Дубликат `nilov-catering/` рядом — не путать, работаем только в `catering-site/`.

## 7. Итог для сборки
Структура `00–14` ВЕРНА и применима. Репозиторий — не пустышка, а тёмный
недострой с ~40 готовыми компонентами. Сборка = **перекраска + переименование + дописывание
недостающего**, а не написание с нуля. Это радикально сокращает Фазы 0–2.
