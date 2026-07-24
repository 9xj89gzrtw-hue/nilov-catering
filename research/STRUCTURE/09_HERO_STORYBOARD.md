# Hero — текстовый раскадровка (light, editorial + cinematic)

**Цель:** первый экран задаёт планку «дорого». Светлый, воздушный, много движения (Drinkit-vibe).
**Токены:** `06_TOKENS.md`. **Блок:** `HeroSection` (УЖЕ есть в `components/sections/`, перекрасить; см. `15_REPO_AUDIT.md`).
**Benchmark-источники:** autoplay video hero (Proof of the Pudding, Anmol, Deborah Miller),
geometric/circular frames + диагональные линии (Proof of the Pudding), LCP<1.2s (pxlpeak 2026).

---

## Визуальный слой (от фона к тексту)
1. **Background media** [Волна 12, C3 — вариант В из `28_HEROCRITIC`]: `poster` (blur-up, светлый кадр кухни) — **ЭТО и есть LCP-элемент**, показывается мгновенно. Поверх — subtle loop-видео/Ken Burns, которое НЕ является LCP-кандидатом (`preload="none"` + IntersectionObserver, crossfade по `canplaythrough`). НЕ full-video hero (вариант Б отвергнут `28`: +3.2s LCP). Кадр: утренний свет на кухне, руки шефа на светлом мраморе, пар от блюда. Codec-tiers: AV1→HEVC→H.264, `-movflags +faststart`, <2MB. На slow-connection/`prefers-reduced-motion` → только poster.
2. **Overlay** — мягкий боковой/нижний градиент `rgba(250,247,242,.55)→transparent`
   (чтобы текст читался, НЕ чёрная плашка). Светлый, не「приглушающий」видео.
3. **Контент** — слева (desktop) / по центру (mobile), max-width текста ~620px.
   **[benchmark: Proof of the Pudding]** акцентное слово H1 подчёркнуто **диагональной линией**
   (SVG-линия под углом, `--color-gold`), а не сплошным underline. Это «дорогая» деталь.
   Рядом с overline — **круглый фрейм** (`--radius-circle`) с мини-фото блюда/логотипа
   (geometric frame вместо прямоугольника).

## Layout вариант (рекомендую: editorial left-aligned)
```
┌───────────────────────────────────────────────┐
│ [надпись-оверлайн]  NiloV · с 2007 года        │
│                                                 │
│  Кейтеринг, который                            │  ← H1 Cormorant 76px, ink
│  чувствуешь заранее.                          │     (акцент «чувствуешь» = font-weight 600 + gold-text, НЕ курсив [B8])
│                                                 │
│  Более 3000 событий 🟡 в Петербурге.           │  ← lead Inter 19px, ink-soft (🟡 = не подтверждено независимо, НЕ публиковать как голый факт; см. FACTCHECK_REPORT_2026-07-20)
│  От семейного ужина до банкета на 500 гостей.  │
│                                                 │
│  [ Спланировать событие → ]   Смотреть форматы  │  ← 1 primary gold-pill (ink-текст) + 1 ghost-ссылка [B1, канон C9]
│                                                 │
│  ♦ Доставка в КАД включена · Су-вид технология │  ← microcopy 12px ink-soft
│                                                 │
│              ↓ прокрутите                       │  ← scroll-hint (анимированная стрелка)
└───────────────────────────────────────────────┘
```

## Copy (editorial, не пафосный, RU)
- **Overline:** `NiloV Catering · Петербург · с 2007`
- **H1:** «Кейтеринг, который **чувствуешь** заранее.» [Волна 13, B8] Cormorant Cyrillic italic ограничен/синтезируется (faux-oblique выглядит дёшево) → акцент на «чувствуешь» давать НЕ курсивом, а через `font-weight` (600) + gold-text underline-акцент; если нужен именно наклон — проверить рендер реального Cormorant Cyrillic italic, при faux-oblique заменить на dedicated display-гарнитуру с полным RU-покрытием.
- **Sub:** «Более 3000 событий с 2007 года. От камерного ужина до банкета на 500 гостей — ресторанное качество там, где вы его не ждёте.» [Волна 14, B-R2] Указываем «с 2007 года» (якорь-дата, не конфликтует), а НЕ «N лет» — иначе арифметика (2026−2007=19) спорит с «18» на живом сайте. Точное «N лет» — только после подтверждения заказчиком (🟡 pending-verification, `04_BLOCKS` TODO).
- **CTA primary (ровно один):** «Спланировать событие» → `/plan` (канон C9; хаб = калькулятор/конструктор/помощник — действие воронки, не просмотр, закрывает B1) [Волна 12/14, B1]
- **CTA secondary (ghost-ссылка, не кнопка):** «Смотреть форматы» → `/events`
- **Sticky Mobile CTA:** дублирует primary «Спланировать / Позвонить» (customershand: sticky reserve = +20–45% заявок) [Волна 12, B1]
- **Microcopy:** «♦ Доставка в КАД включена · Технология су-вид · Маркировка по 14 аллергенам»

## Альтернативный вариант (centered cinematic)
Текст по центру, видео ярче, H1 крупнее (96px). Больше «вау», меньше editorial.
Выбираем **left-aligned** — он читается как premium-журнал, а не как промо-ролик.

## Circular frame (geometric) — ОБЯЗАТЕЛЬНЫЙ элемент рекомендованного Hero [Волна 12, B4]
Слева текст, справа **круглое фото** (`--radius-circle` + `object-fit:cover`,
`object-position: var(--frame-object-pos)`, border `--color-line`) с лёгким параллакс-наклоном,
как «окно на кухню». Overline с мини-круглым логотипом. Это отличительная geometric-деталь
топ-сайтов (Proof of the Pudding / Queen of Hearts) — она разбивает «стену текста» и является
частью финальной концепции, а НЕ опциональным вариантом.

## Motion поведение каждого элемента
> ПРОТИВ топов 2026 (`16` #30): вместо простого fade-up — **clip-path wipe / ink-bleed**
> (как OpenCode Michelin-storefront): текст «проявляется» через clip-path, а не растворяется.
| Элемент | Анимация | Тайминг |
|---|---|---|
| Preloader→Hero | seamless: прогресс-бар→100% → лого scale-down в Hero-overline (morph). [Волна 12, B6] **skippable** (тап/скролл прерывает); контент Hero отрисован в DOM и виден БЕЗ JS (прелоадер — оверлей поверх, не барьер); при no-JS/hydration-fail Hero виден сразу | load→0 (0.5s exit, skippable) |
| Overline | slide-up + fade | delay 200ms, 400ms, ease-out-expo |
| H1 (пословно) | **clip-path wipe**: `inset(0 100% 0 0)`→`inset(0)` per word, stagger 60ms (дороже fade) | delay 300ms |
| H1 акцентное слово | диагональная линия подчёркнута draw SVG (gold-заливка, как Proof of the Pudding) | после слова |
| Sub | clip-path wipe (line) или fade-up | delay 700ms |
| CTA | fade-up + magnetic hover (±12px, spring) | delay 900ms |
| Microcopy | fade | delay 1100ms |
| Scroll-hint | пульсация стрелки (y ±6px loop) | после 1.5s |
| Circular frame | лёгкий parallax-наклон по scroll | scroll |
| Reduced-motion / no-JS fallback | [Волна 12, B9/C7] gate на `prefers-reduced-motion` (НЕ на `navigator.connection`): clip-path→instant, magnetic/parallax off, Lenis не инициализируется; контент виден (opacity:1) при `!mounted \|\| reducedMotion` | instant |

## Что делает Hero «дорогим» (чек-лист для аудита)
- [ ] Видео светлое и воздушное, а не тёмное «кино».
- [ ] Текст читается без чёрной плашки (мягкий градиент).
- [ ] H1 — Cormorant Display (серьёзная типографика, не generic sans).
- [ ] Акцентное слово подчёркнуто диагональной линией / есть geometric frame (деталь, не «голый» текст).
- [ ] **H1 использует clip-path wipe (ink-bleed), а не просто fade** — дороже, «вау» сразу при заходе (`16` #30).
- [ ] Только 1 primary CTA (не 5 кнопок).
- [ ] Движение есть, но не «всё сразу» — staggered, спокойное.
- [ ] **LCP < 1.2s** (poster мгновенно, видео не блокирует paint) — [benchmark pxlpeak 2026].
- [ ] **Seamless Preloader→Hero** (morph лого), а не две отдельные анимации.
- [ ] Никаких «ЛУЧШИЙ КЕЙТЕРИНГ СПБ!!!» — сдержанность = дорого.

## Критерий выхода из Фазы 1
Заказчик смотрит на Hero и говорит «вау / хочу так же» → идём к секциям.
Нет — переделываем видео/копирайт, НЕ двигаемся дальше.
