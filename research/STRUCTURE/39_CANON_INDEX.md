# 39 — CANON INDEX (мост спека ↔ код) — единый источник истины

**Дата:** 2026-07-20. **Зачем:** устранить разрыв «спека `04_BLOCKS.md` называет блоки одними именами, код реализует их под другими». Это породило ложную критику («6 блоков отсутствует»). Ниже — КАНОНИЧЕСКАЯ карта: что требует спека → какой файл реально это делает → статус. Читать ПЕРЕД любой правкой сайта.

**Папка спецификаций:** `/Users/evgenijdanilov/Documents/hermes/catering-site/research/STRUCTURE/`
**Код сайта:** `/Users/evgenijdanilov/Documents/hermes/catering-site/` (`app/`, `components/`, `lib/`)

> **📌 B11 — номенклатура канонов этого файла.** Название «39 канонов» / «39 канон» — неточное: файл `39_CANON_INDEX.md` содержит ровно **4 канона**, каждый со своим номером. При ссылках из других файлов используйте точную формулировку:
> - **канон №0** (Домен) — `04_BLOCKS.md:1378` `url: https://odaeda.ru`;
> - **канон №1** (Тема: светлая);
> - **канон №2** (Шрифты: Cormorant / Inter / JetBrains Mono);
> - **канон №3** (Навигация).
> Любое упоминание «39 канонов» следует читать как «канон №0 файла 39_CANON_INDEX.md» (единый прод-домен) либо как ссылку на конкретный номер канона выше.

---

## ⚠️ КАНОН №0 — ДОМЕН (единый прод-домен, обязателен для cross-check)

| Что | Значение | Источник |
|---|---|---|
| **Прод-домен (канон)** | `https://odaeda.ru` (и только он) | `04_BLOCKS.md:1378` (JSON-LD `url` / `url: https://odaeda.ru`), `02_IA.md:119` (базовый домен sitemap), `02_IA.md:125` (`<urlset>`), `04_BLOCKS.md` — `metadataBase` НЕ определён (отсутствует в файле) |
| **Бренд-алиас (НЕ канон)** | `nilov-catering.ru` — только как текстовое имя бренда ИП Нилов | `04_BLOCKS.md:2201,2327` (бренд-текст, без канонической роли) |
| **Запрещено в каноне** | любые `*.vercel.app` / `localhost` / `nilov-catering.ru` в `canonical`/`@id`/JSON-LD `url`/`metadataBase` | `02_IA.md:120` |

> **ИТОГО (грейп-гейт, обязателен перед сборкой):** во ВСЕХ `canonical` / `@id` / JSON-LD `url` / `metadataBase` — единственный домен **`odaeda.ru`**. `nilov-catering.ru` — только как бренд-текст («NiloV Catering / ИП Нилов»), НИКОГДА как канонический хост. Проверка: `grep -rn "nilov-catering.ru" app/ components/ lib/ | grep -iE "canonical|metadataBase|@id|url" ` → **0 совпадений** (бренд-текст без канонической роли допустим). Сайт разворачивается на `odaeda.ru`; старый домен `nilov-catering.ru` ставится на 301 → `odaeda.ru`.

---

## ⚠️ КАНОН №1 — ТЕМА: СВЕТЛАЯ (это ИСТИНА, несмотря на противоречия в тексте спецы)

| Документ | Что говорит | Вердикт |
|---|---|---|
| `01_VISUAL_DNA.md` §1 | «OVERRIDE blueprint §1.8. Решено (по заказчику): **светлый, воздушный** сайт» | ✅ КАНОН = светлая |
| `06_TOKENS.md` строка 1 | «Design Tokens — **светлая система**» (ivory `#FAF7F2` / ink `#1C1815` / gold `#B08D57`) | ✅ КАНОН = светлая |
| `04_BLOCKS.md` §Фаза 0 (B1) | «переписать `globals.css` под `06_TOKENS` (ivory/ink)» | ✅ КАНОН = светлая |
| `app/globals.css` (код, сейчас) | `#0A0A0A` / `#F5F0EB` / burgundy `#722F37` / gold `#C9A96E` — **тёмная** | 🔴 РАССИНХРОН: код тёмный, канон светлый *(legacy v1, см. `41` Шаг 0 дисклеймер)* |
| ~~`04_BLOCKS.md` (другие места)~~ | ~~«dark theme as default», «Cinematic Dark»~~ | ❌ **НЕТ в `04`** — поиск 0 совпадений; тёмные упоминания только про legacy-код globals.css, никогда как цель *(CoherenceChecker C9: ложная атрибуция удалена)* |

> **ИТОГО:** перед сборкой сайта `app/globals.css` ОБЯЗАН быть переписан под светлую ДНК (`06_TOKENS`). Gate: `grep -rn "0A0A0A|F5F0EB|722F37|C9A96E" app/ components/` → **0 совпадений**. Сейчас совпадения ЕСТЬ → блокирующий баг B1 не закрыт.

---

## ⚠️ КАНОН №2 — ШРИФТЫ

| Роль | Спека (`09`/`36_RUBRIC`) | Код (`lib/fonts.ts` + `globals.css`) | Статус |
|---|---|---|---|
| Heading | Cormorant (OFL, самохост `@fontsource`, Волна 15) | **Cormorant** (OFL, самохост `@fontsource`, Волна 15) | ✅ Канон: Cormorant (НЕ Playfair — Playfair удалён из `06` §2, см. `44` CodeRealityChecker ось 3). Ceiling-ход C1 («кастом RU-шрифт») закрыт частично. |
| Body | Inter | Inter (next/font) | ✅ |
| Mono | JetBrains Mono | JetBrains Mono (next/font) | ✅ |

---

## ⚠️ КАНОН №3 — НАВИГАЦИЯ (код расходится со спецой)

**Спека `04_BLOCKS.md` SiteHeader:** События/Меню/Галерея/Почему мы/Команда/Отзывы/Сезонное + тел/WA/ТГ + CTA «Спланировать».
**Код `lib/data.ts` navItems:** Меню/Конструктор/Цены/Услуги/Галерея/О нас/Контакты.

**Реальные роуты `app/` (что существует):** about, blog, constructor, contact, cookies, faq, gallery, menu, offer, pricing, privacy, quote, services, **team**, testimonials, terms.
**Отсутствуют как роуты:** `/why-us` (есть `/about`), `/reviews` (есть `/testimonials`), `/seasonal`.

> Канон навигации в коде — СВОЙ, отличный от `04`. Перед сборкой надо либо привести `navItems` к `04`, либо обновить `04` под реальность.

---

## 📋 МОСТ: БЛОКИ ГЛАВНОЙ (спека `04` → код)

`app/page.tsx` рендерит ровно 9 секций + глобальные провайдеры. Маппинг:

| № | Блок в `04_BLOCKS.md` | Реальный файл в коде | Статус |
|---|---|---|---|
| 1 | `HeroSection` (вариант В, живое фото) | `components/sections/HeroSection.tsx` | ✅ ЕСТЬ (но НЕ соответствует сториборду `09`: не та H1, не та CTA, slide-up ≠ wipe, нет цены/пресетов) |
| 2 | `TrustBar` (marquee логотипов) | **нет отдельного файла** | ⚠️ Влит в `SocialProofBar` ниже |
| 3 | `AwardsStrip` → `TrustProof` | **нет отдельного файла** | ⚠️ Влит в `SocialProofBar` ниже |
| — | **`SocialProofBar`** (статы 19 лет/3000+/98% + AnimatedCounter) | `components/sections/SocialProofBar.tsx` | ✅ ЕСТЬ (это и есть TrustBar+Awards+WhyUs-аналог) |

> **КАНОН ИМЁН TRUST-БЛОКА (C8, единый источник — устраняет 4-имённый разнобой):**
> целевых блока ДВА: **`TrustBar`** (marquee логотипов клиентов, 🟡-flagged) и **`TrustProof`** (proof-ряд фактов/наград/комплаенс, поглотил бывший `AwardsStrip`). **`AwardsStrip` — DEPRECATED** (объединён в `TrustProof`, отдельным блоком НЕ собирать). **`SocialProofBar`** — имя LEGACY-кода (`components/sections/SocialProofBar.tsx`), при сборке **РАЗБИТЬ** на `TrustBar` + `TrustProof` (см. `04` БЛОК 2/57). Нигде не вводить пятое имя.
| 4 | `EventTypeSelector` (6 карточек → `/events/*`) | **нет** (карточки ведут в `/constructor`, не `/events/*`) | ⚠️ Частично в `ServicesSection` |
| 5 | `FormatShowcase` (3 формата, цена/гость) | **нет отдельного файла** | ⚠️ Влит в `ServicesSection` |
| — | **`ServicesSection`** (bento форматов → `/constructor`) | `components/sections/ServicesSection.tsx` | ✅ ЕСТЬ (аналог бл.4+5) |
| 6 | `MenuPreview` (подборки меню) | `components/sections/MenuPreviewSection.tsx` | ✅ ЕСТЬ |
| 7 | `GalleryTeaser` (masonry по событиям) | `components/sections/GallerySection.tsx` | ✅ ЕСТЬ (lightbox есть, focus-trap — НЕТ) |
| 1-bis | `InspireStrip` | **нет** | ❌ Отсутствует |
| 6-bis | `HomeVideoShowcase` | **нет** | ❌ Отсутствует |
| 7-bis | `EventsRecapHome` | **нет** | ❌ Отсутствует |
| 8 | `WhyUs` (count-up + история бренда) | **ЧАСТИЧНО:** есть `components/sections/PhilosophySection.tsx` (5678 байт, экспорт `PhilosophySection`), НО он НЕ импортирован в `app/page.tsx` (не рендерится на главной). Роль «статы/бренд» частично закрыта анонимными числами в `SocialProofBar`. → Сборщик: либо дописать `PhilosophySection` до `WhyUs` (история Дмитрий Нилов + count-up) и заимпортить в page, либо влить в `SocialProofBar`. Файл НЕ удалять. | ⚠️ Частично |
| 9 | `TestimonialsCarousel` | `components/sections/TestimonialsSection.tsx` | ✅ ЕСТЬ (нет aria-live, нет Review JSON-LD) |
| 10 | `ProcessSteps` (5 шагов) | `components/sections/ProcessTimeline.tsx` | ✅ ЕСТЬ (4 шага вместо 5; фоновое autoplay-видео бьёт Perf) |
| 11 | `LiveInstagramFeed` (VK/IG UGC) | **нет** | ❌ Отсутствует |
| 12 | `CTASection` | `components/sections/CTASection.tsx` | ✅ ЕСТЬ |
| 13 | `FAQTeaser` | `components/sections/FAQSection.tsx` | ✅ ЕСТЬ |

**Глобальные (в `app/layout.tsx`):** `Header`, `Footer`, `MobileBottomNav`, `Preloader`, `SmoothScrollProvider`, `CustomCursor`, `NoiseOverlay`, `Консьерж` (FAB, optional-обёртка над `/plan/helper`; AI-слой в резерве), JSON-LD (LocalBusiness+Organization).

---

## 🔴 РЕАЛЬНО ОТСУТСТВУЮЩИЕ ФИЧИ (по коду, grep = 0)

Эти элементы из `04_BLOCKS.md` / волн критики **действительно не реализованы** ни под каким именем:

1. **`StickyMobileCTA`** (Волна 1/3, критично для Игоря/Дарьи) — всегда видимая sticky-кнопка «Рассчитать/Позвонить» на mobile.
2. **`AnnouncementBar`** (сезонный анонс, ZH1/ZH2 Жанна) — нет в layout.
3. **`TextSizeToggle`** (Виктор V1, крупный шрифт/WCAG AAA) — нет.
4. **`AvailabilityCalendar`** (Олег O1–O9, мгновенное бронирование) — нет.
5. **`LiveInstagramFeed` / соц-лента** (VK первичен, IG вторичен) — Footer соц-ссылки `href="#"` (мёртвые).
6. **`InspireStrip` / `HomeVideoShowcase` / `EventsRecapHome`** — блоки «вдохновения»/видео на главной отсутствуют.
7. **`MobileBottomNav` = 2 пункта** (Меню/Калькулятор + Звонок) вместо контракта **B3 = ровно 5** (События/Меню/Галерея/Почему мы/Спланировать). `/#calculator` — мёртвая ссылка (секции calculator на главной нет).
8. **152-ФЗ бейдж** в Footer (FAIL `19 #31`) — нет; нет `/delivery`, `/certificates` (Волна 2А).
9. **Роуты** `/why-us` (есть `/about`), `/reviews` (есть `/testimonials`), `/seasonal` — отсутствуют.

---

## ✅ ЧТО УЖЕ ХОРОШО (сохранить при перекраске)

- MaskReveal-анимации (`TextReveal`), Ken Burns hover, lightbox с клавиатурой (←/→/Esc), scroll-progress, responsive grid-ы, AnimatedCounter, Cormorant self-host (технически грамотно).
- Структура главной собрана из 9 семантически богатых секций + глобальных провайдеров.

---

## 📌 ПОРЯДОК ДЕЙСТВИЙ ПЕРЕД СБОРКОЙ САЙТА

1. **B1 (блокирующий):** переписать `app/globals.css` под светлую ДНК (`06_TOKENS` ivory/ink/gold). Gate: `grep` → 0 тёмных HEX.
2. **Решить навигацию:** привести `lib/data.ts` navItems к `04` ИЛИ обновить `04` под реальность (роуты `/about`, `/testimonials` вместо `/why-us`, `/reviews`).
3. **Добавить реально отсутствующие глобальные фичи** (StickyMobileCTA, AnnouncementBar, TextSizeToggle, AvailabilityCalendar, соц-лента, 5-tab bottom-nav, 152-ФЗ).
4. **HeroSection** привести к сториборду `09` (H1 «Кейтеринг, который чувствуешь заранее», CTA «Спланировать событие» → `/plan`, clip-path wipe, цена выше фолда, poster-LCP).
5. **a11y:** focus-trap в `GallerySection` lightbox; `aria-live` на Testimonials + Review JSON-LD.
6. **Perf:** убрать autoplay-видео (Hero gate на reduced-motion, ProcessTimeline фон → facade/preload=none).

---

## 🗂 КАК ЧИТАТЬ ЭТУ ПАПКУ (STRUCTURE)

- `00_PLAN` … `38_*` — хронология спецификаций и критик (итерации).
- `04_BLOCKS.md` — библиотека блоков (словарь сборки). **Имена блоков в нём ≠ имена файлов в коде** (см. мост выше).
- `36_DESIGN_RUBRIC.md` + `36_DESIGNCRITIC_*` — оценка спецы (средний 8.1, PASS).
- `37_MOTIONCRITIC_*` — оценка motion/медиа (8.11).
- `38_BLOCKCRITIC_CODE_REALITY.md` — ⚠️ **УСТАРЕЛ/ЧАСТИЧНО НЕДОСТОВЕРЕН** (ошибочно объявлял 6 блоков «отсутствующими» по буквальным именам). Заменён настоящим анализом в этом файле `39_CANON_INDEX.md`.
- `39_CANON_INDEX.md` (этот файл) — **читать первым** перед любой правкой.

> **Правило сессии:** перед утверждением «блок X отсутствует», свериться с мостом выше. Если блок реализован под другим именем — не дублировать, а задокументировать маппинг здесь.
