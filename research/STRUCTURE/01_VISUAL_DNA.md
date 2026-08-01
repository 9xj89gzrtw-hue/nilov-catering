# 01 — VISUAL DNA (Светлая Visual Bible)

> **OVERRIDE blueprint §1.8.** Blueprint заложил тёмный фон `#0A0A0A` + gold + burgundy.
> Решено (по заказчику): **светлый, воздушный** сайт. Gold/burgundy сохраняем как акценты, не как фон.
>
> ### Что именно заказчик имел в виду под «Drinkit» (разобрано 2026-07-18)
> Drinkit — кофейное приложение Dodo Brands (App Store, 4.9★, 278 оценок) ✅ *(реальный сайт-эталон, проверено FactChecker)*. Заказчик
> процитировал его точнее: **«вся идея что все фотки живые и что-то делают»**.
> То есть требование НЕ «много анимаций вообще», а конкретный паттерн:
> **каждое фото еды/напитка — живое и в движении по умолчанию**, а не статичная тарелка.
> В приложении это пар от кофе, наливание, сборка напитка клиентом («change the composition»).
> Доп. философия приложения, УЖЕ ложащаяся в нашу структуру:
> - **Кастомизация** («change/add/remove ingredients to taste») → наш `Constructor` (мастер 6 шагов).
> - **Прозрачность** («monitors ingredients, calories, and allergens with care») → наш `TrustProof` + `AllergenFilter`.
> - **Live-статус** («we'll let you know when everything is ready») → `LiveInstagramFeed` + `AvailabilityCalendar`.
> - **Чистый, быстрый, technology-forward UI** → LCP < 1.2s, мгновенный калькулятор.
> ⇒ Требование «живые фото» реализуем как: autoplay-loop видео в Hero, **Ken Burns + лёгкий
>   parallax на ВСЕХ карточках меню/форматов/галереи**, а где возможно — короткие loop-видео
>   блюд (5с «что-то делает») на hover вместо статики (см. `04_BLOCKS` `DishCard`).

## 1. Направление
**Light / editorial-catering (мировой уровень исполнения, НЕ премиум по позиционированию).** Тёплый ivory-фон, много «воздуха», крупная serif-типографика,
настоящая фотография блюд (не сток), деликатное золото как знак **тепла, праздника и
аккуратности** — НЕ ценника, НЕ статуса. [Волна 12, B6/T1] Атмосфера «вкусного и опрятного журнала о еде», а не «тёмного ресторанного сайта».
> **Позиционирование: средний сегмент, НЕ премиум (см. `29_POSITIONING` / `29_TRUST_SEG_CRITIC`).**
> Глянец ДНК (light/airy, безупречные типографика/анимации/CWV) = **КАЧЕСТВО исполнения** → СОХРАНЯЕМ (это и есть «лучший в мире сайт»).
> Премиум-ЛЕКСЕМЫ («VIP», «элитно», «эксклюзив», «для избранных», «от 100 000₽») = СНОБИЗМ → УБИРАЕМ из копирайта/CTA.
> Заменяем на: «под ключ для любого бюджета», «реальные цены», «доступно», «делаем круто для любого события», «без переплат».
> Визуал (палитра/типографика/анимации) НЕ трогаем — мировой уровень остаётся.

## 2. Палитра (финальная, светлая)

| Роль | Название | HEX | Использование | Контраст (проверено WCAG 2.1, 2026-07-19) |
|---|---|---|---|---|
| Фон основной | Warm ivory | `#FAF7F2` | page bg, секции | — |
| Фон альтернативный | Soft cream | `#F2ECE3` | зебра-секции, карточки | — |
| Ink (текст) | Deep espresso | `#1C1815` | заголовки, body | 16.5:1 на ivory ✓ AAA |
| Текст вторичный | Warm grey | `#4A423B` | подписи, muted (поднят с #6B625A по V6) | 8.9:1 на ivory ✓ AAA |
| Золото-заливка | Champagne gold | `#B08D57` | CTA-ФОН, бейдж-фон, разделители, декор-плоскости — **НЕ текст** | 2.89:1 (как текст FAIL — только заливка) |
| Золото-ТЕКСТ | Deep gold | `#8A6D3B` | overline, gold-акцентный текст, ссылки-акценты | 4.54:1 на ivory ✓ AA [Волна 12, B1] |
| Золото-декор (light) | Pale gold | `#C9A961` | hover-градиенты, рамки — **НЕ текст** | 2.11:1 (как текст FAIL — только декор) |
| Акцент 2 | Burgundy | `#722F37` | бейджи «хит / избранное», тёплые акценты | 9.03:1 на ivory ✓ AAA |
| Earthy | Clay | `#7C6A55` | иллюстративные детали, иконки, overline-альт | 4.85:1 ✓ AA |
| Успех/сезон | Sage | `#7E8B6B` | **фон** бейджа «в сезоне» с ink-текстом — **НЕ текст** | 3.39:1 как текст FAIL; ink на sage-фоне 4.86:1 ✓ AA [Волна 12, B5] |
| Border/hairline | `#E4DCCF` | тонкие линии, каркас карточек | — |

> **[Волна 12, B10]** Все контрасты пересчитаны скриптом WCAG 2.1 (sRGB relative luminance) 2026-07-19.
> Прежние аннотации `#B08D57 = 4.6:1` и `#C9A961 = «ярче»` были ЛОЖНЫ (реально 2.89 и 2.11).
> Правило: золото/пале-голд/sage — **только заливка/декор**, текстовые акценты — `#8A6D3B` (gold-text) или earth/burgundy/ink.

**Правила:**
- НИКОГДА чёрный плашечный фон под текст Hero. Текст Hero — на мягком градиентном оверлее поверх фото
  (ivory→transparent, opacity 0.35–0.5), чтобы фото оставалось «живым».
- Золото — только на интерактиве и акцентах. Не заливаем им большие плоскости.
- Диалоговые/модальные окна — `rgba(28,24,21,0.06)` blur, НЕ чёрный.

## 3. Типографика (KEEP из blueprint §6.2, без изменений)
- **H1/H2/H3:** Cormorant (serif, 300–700; *italic* для акцентных слов, включая кириллицу при наличии глифа) [Волна 15, A-R1/B-C1: Cormorant OSS, самохост, distinctive вместо generic Playfair].
  - H1 (Home Hero И EventHero — **ЕДИНЫЙ clamp**, канон и для подстраниц; см. `06_TOKENS` `--text-h1`): `clamp(2.5rem, 5vw, 4.5rem)`, -0.02em, line-height 1.1
  - H2: `clamp(1.8rem, 3.5vw, 3rem)`
  - H3: `clamp(1.4rem, 2.5vw, 2rem)`
- **Body:** Inter (400/500/600), `clamp(1rem, 1.2vw, 1.125rem)`, line-height 1.6.
- **Цены/метки/цифры:** JetBrains Mono, `clamp(0.875rem, 1vw, 1rem)`.
- Модульная шкала 1.333. `font-display: swap`, preload woff2.

## 4. Motion-language (насыщенный, по запросу заказчика)
Источник вдохновения — уровень интерактива приложения Drinkit («все фотки живые и
что-то делают»), адаптированный под сайт. **Реализация: Framer Motion**
(`whileInView`, `useScroll`+`useTransform`, `useReducedMotion`) — УЖЕ в `package.json`,
GSAP НЕТ в deps (см. `05_BUILD` Фаза 0/5, `06_TOKENS` §4).
- **Lenis** smooth scroll + тонкий scroll-progress bar (gold-заливка). [Волна 12, C2 — КРИТ] Lenis НЕ Framer-анимация → при `prefers-reduced-motion` НЕ инициализировать вовсе (`lenis?.destroy()`), иначе hijacked-scroll + INP-провал.
- **Hero:** autoplay-видео loop (банкетная атмосфера) + **Framer Motion timeline** (`animate`, `useReducedMotion`), текст появляется после 0.8–1.2s (не 3s, как в blueprint — на светлом LCP-важнее).
- **Reveals:** Framer Motion `whileInView` — `initial={{y:24,opacity:0}}` → `whileInView={{y:0,opacity:1}}`,
  `transition={{duration:.4, ease:[.22,1,.36,1]}}`, stagger 80ms, `viewport={{once:true}}`. НЕ одновременно.
- **Hero H1 (clip-path wipe):** вместо простого fade — пословный **`clip-path: inset(0 100% 0 0)` → `inset(0)`**
  (Framer `animate` per word, stagger 60ms) — «ink-bleed» проявление текста как у топовых SOTD
  (OpenCode Michelin-storefront). Дороже fade, даёт «вау» сразу при заходе. См. `09_HERO_STORYBOARD`, `16` #30.
- **Seamless Preloader→Hero:** прогресс-бар догоняет 100% → лого scale-down в Hero-overline (morph),
  видео Hero НЕ блокирует paint (LCP<1.2s), но entrance играет сразу после.
- **Page transitions:** Framer `AnimatePresence` между роутами — мягкий clip-path/blur переход
  (лёгкий, LCP-безопасный; не тяжёлый WebGL video как у Restaurant GEM).
- **Карточки меню/форматов:** hover → **Ken Burns** zoom (1.0→1.08, 600ms) + magnetic-эффект курсора
  (`components/effects/MagneticButton`/`ParallaxImage` УЖЕ есть).
- **Калькулятор:** count-up цены (spring), magnetic CTA.
- **Trust-bar:** бегущая строка (marquee) «с 2007 · N лет 🟡 · 3000+ мероприятий 🟡 · клиенты 🟡: …». [Волна 13, B-R2] Число лет и «с 2007» согласовать: 2026−2007=19, но живой сайт NiloV показывает «18 лет» — противоречие; ДО релиза заказчик подтверждает ОДНО число, и «с 2007»/«N лет» не должны конфликтовать (либо «с 2007», либо «N лет», не оба с расходящейся арифметикой). Пометка 🟡 `pending-verification` (3000+ мероприятий и клиенты 🟡 — НЕ подтверждены независимо, НЕ публиковать как голый факт; см. FACTCHECK_REPORT_2026-07-20). [Волна 12, C8] marquee вне Framer → гасить по `useReducedMotion()` + `pause-on-hover/focus` (WCAG 2.2.2).
- **Галерея:** [Волна 12, B7] grid с фикс. `aspect-ratio`-слотами (без пересчёта высот masonry) + `content-visibility:auto`, lazy-load, blur-up. Parallax — ТОЛЬКО на одном hero-стрипе, НЕ per-image в сетке (masonry+per-image transform = CLS/LCP-ловушка, бьёт по LCP<1.2s).
- **Sticky Mobile CTA:** при скролле вниз на мобильном — прилипающая золотая кнопка «Рассчитать / Позвонить» (паттерн «Thirsty Click»).
- **prefers-reduced-motion:** все анимации выключаются через Framer `useReducedMotion()`, контент статичен.

## 5. Геометрические рамки (деталь «опрятно / со вкусом»)
- Не только прямоугольники. **Круглые и ромбовидные** фреймы для фото (как Queen of Hearts, Proof of the Pudding).
- [Волна 12, B4] Круг = `border-radius:50%` + `object-fit:cover`; ромб = `clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%)` + `object-fit:cover`. НЕ `rotate-45` (перекашивает фото и подпись).
- [Волна 12, B8] внутри масок — `object-position: var(--frame-object-pos)` для Ken Burns/видео, чтобы «живой» кадр не резал тарелку/лицо.
- Тонкая золотая обводка 1px + мягкая тень Elevation-1.
- Диагональные линии-акценты под словами заголовков (Proof of the Pudding style).
- [Волна 12, B4] geometric-frame — обязательный элемент Hero (не «вариант»), это отличительная «дорогая» деталь топ-сайтов.

## 6. Depth system (тени, светлая адаптация blueprint §6.3)
- Elevation-1 (карточки): `0 2px 4px rgba(28,24,21,0.06)`
- Elevation-2 (модалки): `0 8px 24px rgba(28,24,21,0.12)`
- Elevation-3 (оверлеи): `0 24px 48px rgba(28,24,21,0.18)`
- Золотое свечение: `rgba(176,141,87,0.10)`

## 7. «Looks trustworthy / cared-for» чек-лист (на каждый блок)
> Переименован из «Looks expensive» (`29_TRUST_SEG_CRITIC` T2): цель — выглядеть **честно и опрятно**, а НЕ «дорого». Глянец ДНК сохраняем как знак качества исполнения, НЕ как сигнал «не для всех».
|- [ ] Нет ALL-CAPS-спама.
- [ ] Ровно 1 primary CTA в секции.
- [ ] Настоящая фотография, не сток-плитка.
- [ ] Мягкий градиентный оверлей на Hero (НЕ чёрная плашка).
- [ ] Staggered, а не simultaneous motion.
- [ ] Контраст ≥ 4.5:1 (AA), крупный текст ≥ 7:1 (AAA).
- [ ] Золото/пале-голд/sage — только заливка/декор, НЕ текст; текст-акценты = gold-text `#8A6D3B` / earth / burgundy / ink [Волна 12].
- [ ] CTA-кнопка = ink-текст на золотой заливке (5.7:1), НЕ белый (3.09:1) [Волна 12, B3/C1].
- [ ] Цены = ink `#1C1815`, золото только underline/разделитель [Волна 12, B2].
- [ ] Touch-targets ≥ 44px; focus-visible 2px gold.
- [ ] Reveal-контент виден без JS (opacity:0 только при `mounted && !reducedMotion`) [Волна 12, C7].
- [ ] Lenis/marquee/parallax гасятся при `prefers-reduced-motion` [Волна 12, C2/C8].
