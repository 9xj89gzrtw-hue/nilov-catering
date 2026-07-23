# Последовательность сборки (Build Sequence) + роли

**Где собираем:** НЕ в этом чате. В отдельном проекте/чате, блок за блоком.
Каждый блок = отдельный контекст (промпт + проверка), потом собираем в страницу.

---

## Фаза 0 — Фундамент (перекраска существующего, НЕ с нуля)
> **ОБЯЗАТЕЛЬНОЕ ЧТЕНИЕ ПЕРЕД СТАРТОМ:** `39_CANON_INDEX.md` (мост спека↔код, канон темы/шрифтов/навигации)
> + `41_BUILD_CHECKLIST.md` (единый чек-лист со статусом блока + гейтами). Без них — не начинать.
> По `15_REPO_AUDIT.md`: в `components/` УЖЕ ~40 компонентов (тёмных),
> `components/blocks/` пуст, `components/ui/*` (shadcn) готовы. Сборка = перекраска + дописка.

1. **Перекрасить `app/globals.css`** под `06_TOKENS.md` (light system, shadcn-имена).
   Меняем ТОЛЬКО значения токенов (`--color-background:#FAF7F2` и т.д.),
   не имена — иначе `components/ui/*` (button/card/badge) сломаются.
   Убрать `NoiseOverlay`/тёмный ambient, если мешают светлому.
2. **`components/ui/*`** (button, card, badge, input, accordion, separator, sheet) — НЕ трогать файлы,
   только токены выше. Проверить, что primary = gold.
3. **Оставить существующие секции В `components/sections/` (НЕ переименовывать папку!):**
   HeroSection, ServicesSection, MenuPreviewSection, GallerySection, SocialProofBar,
   TestimonialsSection, ProcessTimeline, CTASection, FAQSection — перекрасить в светлую.
   `PhilosophySection` (5678 байт, `components/sections/PhilosophySection.tsx`) **РЕАЛЬНО СУЩЕСТВУЕТ в коде как orphan** (файл есть на диске, НЕ заимпортирован в `app/page.tsx`) — его роль trust+бренд частично дублируется `SocialProofBar`, НО файл НЕ удалять и НЕ создавать заново;
   блок `WhyUs` (история бренда/Дмитрий Нилов) **дописываем из существующего `PhilosophySection`** (не создаём новый файл, переиспользуем orphan) → заимпортировать в `app/page.tsx`.
   Новые блоки тоже класть в `components/sections/{{BLOCK_NAME}}.tsx`
   (см. `41_BUILD_CHECKLIST` Шаг 1; `12_BLOCK_EXECUTOR_PROMPT` обновлён под это решение).
4. **Переиспользовать примитивы движения (пути проверены по диску, критик C7-04):**
   - `components/effects/*`: `MagneticButton` (=Magnetic), `ParallaxImage` (=Ken Burns/parallax base),
     `AnimatedCounter` (=CountUp), `TextReveal` (=Reveal/whileInView), `CustomCursor` (desktop), `NoiseOverlay`.
   - `components/common/*`: `AnimatedSection` (=Reveal/whileInView), `Skeleton`, `SkipLink`, `ScrollToTop`.
5. **Глобальные: `SmoothScrollProvider` (Lenis) + `ScrollToTop` + `Header`/`Footer`/`MobileBottomNav`**
   перекрасить в светлую; `ThemeProvider`/`next-themes` — убрать (только светлая, без toggle).
→ **Гейт:** вся палитра/типографика берётся из токенов, хардкода нет;
  существующие секции рендерятся читаемо на светлом (белый текст → тёмный).
  Все scroll-анимации — на **Framer Motion** (`whileInView`/`useScroll`), НЕ GSAP
  (gsap НЕТ в deps; Framer уже есть и покрывает reveal/parallax).
  `grep -rn "0A0A0A\|F5F0EB\|722F37\|C9A96E" app/ components/` → **0 совпадений** (тёмных HEX нет).

## Фаза 1 — Hero (идеально, потом остальное)
- `HeroSection` (уже есть) → перекрасить + autoplay-loop видео + 1 CTA «Спланировать событие»→`/plan`
  (см. `09_HERO_STORYBOARD.md`, `04`/`41` Шаг 2). Добиться «дорого» на одном экране.
  > Единый CTA-текст: «Спланировать событие» (НЕ «Выбрать формат» — устаревшее из ранней версии, критик A BUG-2).
→ **Гейт:** заказчик говорит «вау» ИЛИ (объективно) LCP<1.2s (poster `<img>` мгновенно), INP<200ms (видео `preload=none`), reduced-motion → только poster (критик A BUG-6: добавлен объективный критерий вместо только субъективного).

## Фаза 2 — Секции главной (по одной, переиспользуя существующее)
> **ТОЧНЫЙ список блоков + статус (сделан/переиспользовать/новый) + гейты — в `41_BUILD_CHECKLIST.md` Шаг 3.**
> Ниже — порядок и важные уточнения (устраняют путаницу имён):
Порядок рендера главной:
`HeroSection` → `SocialProofBar`(УЖЕ закрывает `TrustBar`+`AwardsStrip`+`TrustProof` — дописать geometric frames, имена клиентов, facts-ряд; **НЕ создавать отдельные `AwardsStrip`/`TrustProof` — это дубли!**) →
`EventTypeSelector`(=**`ServicesSection`**, НЕ переименовывать; перекрасить, вести на `/events/*`) →
`FormatShowcase`(=часть `ServicesSection`/`MenuPreviewSection`, дописать цену/гость) →
`MenuPreview`(`MenuPreviewSection`) → `GalleryTeaser`(`GallerySection`, +parallax masonry, **focus-trap в lightbox**) →
`WhyUs`(**дописать из `PhilosophySection`**, который УЖЕ ЕСТЬ в коде как orphan — история бренда/Дмитрий Нилов; заимпортировать в `app/page.tsx`, НЕ создавать новый файл) →
`TestimonialsCarousel`(`TestimonialsSection`, +aria-live, Review JSON-LD) →
`ProcessTimeline`(`ProcessSteps`, 4→5 шагов, убрать autoplay-фон) →
`LiveInstagramFeed`(НОВЫЙ; **VK первичен, IG вторичен**, реальные ссылки) →
`SeasonalModule`(НОВЫЙ, по сезону) → `CTASection` → `FAQTeaser`(`FAQSection`, аккордеон→/faq).
Каждая — отдельный промпт (`12_BLOCK_EXECUTOR_PROMPT`), отдельная проверка motion/a11y.
**Технический SEO (в конце Фазы 2):** `StructuredData` (УЖЕ есть в `components/seo`) → JSON-LD
(Organization, LocalBusiness, Menu, Offer, FAQPage, AggregateRating) + `llms.txt` + `sitemap.xml` + `robots.txt`.
Все reveal/parallax — **Framer Motion `whileInView`/`useScroll`** (НЕ GSAP, см. Фаза 0).

## Фаза 3 — Страницы (сборка из блоков + переименование роутов)
> **ЕДИНЫЙ КАНОН РОУТОВ + ПОРЯДОК ДЕЙСТВИЙ (чтобы не было мёртвых ссылок) — в `41_BUILD_CHECKLIST.md` Шаг 4. Ниже кратко.**
**ПОРЯДОК (критично — BUG-C):**
1. **СНАЧАЛА** обновить `lib/data.ts` navItems → канон `02_IA`: События/Меню/Галерея/Почему нас/Команда/Отзывы/Сезонное + тел/WA/ТГ + CTA «Спланировать».
2. **ПОТОМ** переименовать роуты + 301-редиректы (`next.config` ИЛИ `middleware.ts`):
   `/services/*`→`/events/*` (svadba/korporativ/chastnoe/detskoe/vypusknoy/chef-at-home) · `/about`→`/why-us` ·
   `/testimonials`→`/reviews` · `/quote`→`/plan/calculator` · `/constructor`→`/plan/constructor` ·
   `/pricing`→редирект на `/plan/calculator` · 🆕 `/seasonal`, `/plan` (хаб), `/events/recap`.
3. Проверить ссылки в секциях (grep `href="/about"` и т.п. → 0).
Гейт Фазы 3: `grep -rn "/about\|/testimonials\|/services\|/quote" app/ components/ lib/` → **0**.
Потом страницы: `/events/*` (из ServicesSection) → `/menu/*` (furshet/banquet/coffee-break/catalog/show-cooking)
→ `/gallery` (группировка по событиям) → `/why-us`(=about) → `/team`(УЖЕ есть, дописать `TeamGrid`)
→ `/reviews`(=testimonials) → `/seasonal`(НОВАЯ) → `/plan/calculator`(=QuoteForm, +count-up + PackageGrid, см. `07`)
→ `/plan/constructor`(=components/constructor/*, +CustomMenuBuilder + AllergenFilter, см. `08`) → `/contact` → `/blog` → юр. страницы.
На `/plan/*` и `/contact` добавить `AvailabilityCalendar`(НОВЫЙ, urgency-бейдж).
API: репо `/api/quote`+`/api/constructor`+`/api/booking`+`/api/availability` УЖЕ есть;
спеки `07/08` ссылаются на `/api/calculate` → сделать алиас ИЛИ переименовать логику в quote-роуте.

## Фаза 4 — Интерактив (самое «вау»)
- `Calculator` (=QuoteForm + count-up, `AnimatedCounter` УЖЕ есть) + PackageGrid.
- `Constructor` (=components/constructor/*, мастер 6 шагов; дописать CustomMenuBuilder + AllergenFilter).
- Photo-alive hover + **ingredient storytelling** (Drinkit-паттерн: «все фотки живые») на `DishCard`/`GalleryMasonry`
  — короткие loop-видео блюд на hover вместо статики (`ParallaxImage` + Ken Burns).
- `StickyMobileCTA` (глобальный; MobileBottomNav есть, но НЕ тот паттерн «Thirsty Click» → дописать).
- Page transitions (Framer Motion `AnimatePresence`).

## Фаза 5 — Motion / Perf / A11y финишный проход
- Все reveal/parallax — **Framer Motion** (`whileInView`, `useScroll`+`useTransform`),
  `useReducedMotion()` выключает анимации. GSAP НЕ используем (нет в deps).
- Lighthouse ≥ 95, **LCP < 1.2s** (poster мгновенно, видео не блокирует paint), blur-up (`ParallaxImage`/next/image).
- WCAG 2.2 AA: alt, focus-visible 2px gold, контраст, skip-link (УЖЕ есть `SkipLink`).

## Фаза 6 — Независимый аудит (критик НЕ писал код)
Запустить параллельно 3 независимых проверки:
1. **Creative Director** — «выглядит ли дорого / есть ли вау / где дёшево».
2. **UX** — «понятен ли путь до заявки / где клиент теряется».
3. **Frontend** — «ошибки, скорость, адаптив, a11y».
→ Главный агент принимает решения по правкам.

---

## Роли (на наши РЕАЛЬНЫЕ инструменты, без вымышленных моделей)
| Роль | Кто исполняет |
|---|---|
| Архитектор структуры | Я (Hermes) + этот набор документов `research/STRUCTURE/*` как источник истины |
| Исполнитель (код блока) | Субагент через `delegate_task` (leaf), промпт = спека блока из `04_BLOCKS.md` + токены из `01_VISUAL_DNA.md` |
| Визуальный критик | Отдельный субагент с ролью «art-director luxury catering», НЕ видевший промежуточный код, только результат |
| Финальный аудит | 3 параллельных субагента (creative/UX/frontend) → сводка |

**Ключевое отличие от прошлой попытки:** один блок = один контекст, роли разделены,
критик независимый. Не просим одну модель «сделай весь сайт красиво».

## Резерв (НЕ в MVP, только если останется ресурс)
AR-меню, `Консьерж` (AI-модель в резерве, не подключена)/чат-бот, голосовой поиск, личный B2B-кабинет.
Из blueprint они есть, но это не то, что делает сайт «дорогим» — убираем из первой итерации.
