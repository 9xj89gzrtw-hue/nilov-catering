# CRITIC COMMISSION №30 — Animation Engineer
## Техническая реализуемость анимаций в структуре NiloV Catering (только спецификация)

> **Роль:** Независимый эксперт «Animation Engineer». Оценка ТОЛЬКО технической осуществимости,
> производительности и браузерной реализуемости анимаций, описанных в документах структуры.
> ДНК: светлая премиум. Позиция: МАКСИМАЛЬНО СТРОГАЯ. Автосогласие отклонено. Скоринг 0–10, жёстко ≤9.

---

## 1. Роль и метод

Я критикую **спецификацию**, а не код (код — legacy/dark v1, сборка вперёд спецы, см. `15_REPO_AUDIT` §1, `41_BUILD_CHECKLIST:21`).
Критерии инженера-аниматора:

1. **Compositor-only** — анимации только `transform`/`opacity` (и `filter` с осторожностью), без `clip-path`/`box-shadow`/`width/height`/`top/left` в кадрах.
2. **`will-change`** — явная дисциплина продвижения слоёв, без утечек памяти GPU.
3. **Scroll-стек** — сколько работы на main thread на каждом кадре скролла (Lenis + rAF + Framer `useScroll`).
4. **`prefers-reduced-motion`** — жёсткий CSS-гейт (не только JS-хук), без исключений.
5. **Современные API** — Scroll-driven Animations (`animation-timeline: scroll()`) и View Transitions API.
6. **Браузерная совместимость** — префиксы, FOUT/FOIT, Safari/iOS.
7. **Измеримость** — есть ли бюджет плавности (fps/jank), а не только LCP/INP/CLS.

> **Важно:** спецификация *местами* показывает инженерную зрелость (фасад-видео, отключение Lenis, INP-бюджеты, 1-loop-cap Ken Burns). Но как **animation engineer** я обязан бить по местам, где «хотим много движения» входит в лобовое столкновение с заявленными CWV-бюджетами, и по местам, где спека сама себе противоречит.

---

## 2. Прочитано (источники)

| Документ | Что извлечено |
|---|---|
| `04_BLOCKS.md` (2275 строк) | Глобальные примитивы (`SmoothScroll(Lenis)`, `ScrollProgress`, `StickyMobileCTA`), контракт «живого фото» (Ken Burns + parallax на ВСЕХ карточках), Hero-спец, marquee, прелоадер, мобильные/планшетные контракты (B/D/K/A-волны), видео-слой |
| `09_HERO_STORYBOARD.md` | Motion-таблица Hero: clip-path wipe per-word, morph-прелоадер, scroll-hint пульс, parallax-наклон круглого фрейма, reduced-motion gate |
| `10_FORMAT_SHOWCASE_STORYBOARD.md` | Ken Burns scale 1→1.08 (6s) + 3D-tilt ±4° + translateY(-6px) на hover карточки |
| `11_GALLERY_TEASER_STORYBOARD.md` | Парадокс: parallax «только на 1 hero-стрипе» (B7), но `content-visibility:auto`; противоречит `04` |
| `41_BUILD_CHECKLIST.md` | Гейты сборки, переиспользование `components/effects/*` (вкл. `CustomCursor`, `MagneticButton`, `ParallaxImage`) «без правок» |
| `15_REPO_AUDIT.md` | Стек совпадает: framer-motion ^12.42.2, lenis ^1.3.25; **gsap НЕТ**; `CustomCursor`/`NoiseOverlay` есть в `components/effects/*` |
| `06_TOKENS.md` §4 Motion tokens | Ease/duration, clip-path wipe, Ken Burns (cap 1 loop), magnetic ±12px, page-transition через `AnimatePresence`, reduced-motion гейт |
| `13_BENCHMARK_SYNTHESIS.md` | Заказчик хочет «scroll-driven»; отсылка к scroll-driven как к желаемому паттерну |
| `CRITIC_COMMISSION_16_PERFORMANCE.md:124` | Прямая рекомендация: нативный скролл + CSS `animation-timeline: scroll()` дешевле для INP (в спеце **не принята**) |
| `CRITIC_COMMISSION_14_A11Y.md:118-120` | `CustomCursor` = риск WCAG 2.5.7 |

---

## 3. Сводная таблица оценки по дисциплинам

| Дисциплина | Оценка | Комментарий инженера |
|---|---|---|
| Compositor-only (transform/opacity) | **3/10** | Ключевые «вау»-эффекты — `clip-path` wipe и `box-shadow` переход — НЕ композиторные (paint-bound). |
| `will-change` дисциплина | **0/10** | В спецификации **ноль** упоминаний `will-change`. При десятках анимируемых слоёв это утечка GPU-памяти/джанк. |
| Scroll-стек (Lenis+rAF+Framer) | **3/10** | Lenis (rAF) + marquee (rAF) + `useScroll`/`useTransform` ×N + `ScrollProgress` + `ParallaxImage` ×десятки = main-thread на каждом кадре. |
| `prefers-reduced-motion` | **6/10** | Осознан в Framer-ветке, но CSS-марquee/parallax/Lenis гасятся только JS-хуком; CSS-фолбэк `@media` не прописан. Внутренние противоречия (контракт vs гейт). |
| Современные API (SDA / View Transitions) | **1/10** | Обе технологии **не используются**, хотя желательны (`13`) и рекомендованы (`16:124`). Весь scroll-linked motion — на JS. |
| Браузерная совместимость | **5/10** | `backdrop-filter` без `-webkit-` префикса; `requestIdleCallback` без фолбэка (Safari); FOUT во время clip-path-анимации H1. |
| Измеримость плавности | **2/10** | Бюджеты только LCP/INP/CLS. Нет цели по fps, нет лимита одновременных анимаций, нет гейта «кадр < 16.7ms». |
| Внутренняя непротиворечивость | **4/10** | Контракт «parallax на ВСЕХ карточках» (`04:359`) лоб в лоб с «parallax только на hero-стрипе» (`11:11,45`) и с плоским рендером при reduced-motion (`04:236`). |

---

## 4. Bug-list (минимум 10, с file:line + альтернативой)

### BUG-A1 · `will-change` полностью отсутствует в спецификации
- **Где:** `06_TOKENS.md:147-169` (весь блок Motion tokens), `04_BLOCKS.md:158,357-359`.
- **Суть:** Десятки одновременно анимируемых слоёв (Ken Burns на hover ×N карточек, marquee, parallax, magnetic, scroll-hint pulse, `ScrollProgress`). `will-change` не упоминается **ни разу**. Без дисциплины либо слои не продвигаются (джанк при старте), либо продвигаются навсегда (утечка GPU-памяти → OOM/падение fps на слабых устройствах, которые спека сама целит — `04:236` D8 `deviceMemory<=4`).
- **Альтернатива:** Прописать политику `will-change` в `06_TOKENS` §4: продвигать (`will-change: transform`) **только на активном состоянии** (hover/focus/in-view) и снимать после (`will-change: auto` по `onAnimationEnd`/`animationend`); для бесконечных (marquee, scroll-hint) — ровно один постоянный слой; жёсткий лимит «не более K продвинутых слоёв одновременно» (в духе cap-1-loop из `06:166`).

### BUG-A2 · `clip-path` wipe — paint-bound, выдан за «дорогое вау» без оговорки стоимости
- **Где:** `06_TOKENS.md:161-162`, `09_HERO_STORYBOARD.md:66` (per-word `inset(0 100% 0 0)→inset(0)`, stagger 60ms), `04_BLOCKS.md:369-372`.
- **Суть:** Анимация `clip-path` **не композиторная** — на большинстве движков триггерит перерастеризацию (paint) каждый кадр, особенно с перекрытием текста/видео. Спека сама пишет «дороже fade» (`06:162`) — но делает его **базовым** entrance для H1 (много слов × stagger) и page-transitions (`06:167`). На Hero это burst main-thread-работы ровно в момент, когда замеряется INP.
- **Альтернатива:** Либо (а) ограничить clip-path одним элементом (весь H1 за раз, не per-word), либо (б) заменить на композиторный `mask-image` + `transform`, либо (в) использовать `transform: translateX` + `overflow:hidden` wrapper (чистый composite) для эффекта «проявления». Per-word clip-path — только если измерено <16.7ms на целевом устройстве.

### BUG-A3 · Анимация `box-shadow` у header — repaint каждый кадр
- **Где:** `04_BLOCKS.md:118` («Золотая тень появляется ТОЛЬКО после `scrollY > 40px`… `prefers-reduced-motion` — без плавного перехода тени» — значит переход ЕСТЬ в обычном режиме).
- **Суть:** `box-shadow` не композиторный; transition по `scrollY` (toggle класса `.scrolled`) вызывает перерисовку тени на каждом кадре скролла. Конфликтует с заявленным CLS<0.1 (тут не layout, но paint-стоимость высока при быстром скролле на слабых).
- **Альтернатива:** Анимировать **opacity псевдо-элемента** с предзаготовленной тенью (`::after { opacity:0→1 }`, composite-only), либо просто toggle без transition. Никогда не transition-ить сам `box-shadow`.

### BUG-A4 · Scroll-стек: Lenis + rAF-marquee + Framer `useScroll` — всё на main thread
- **Где:** `04_BLOCKS.md:158` (Lenis rAF), `:157` (`ScrollProgress`), `:359`/`06:166` (`ParallaxImage` на карточках), `:536-537` (marquee «CSS transform + requestAnimationFrame/Framer»).
- **Суть:** Lenis перехватывает скролл (rAF-цикл). Поверх — `ScrollProgress` + десятки `ParallaxImage` (`useScroll`/`useTransform`) + marquee (rAF). Каждый кадр скролла = N подписчиков на main thread, каждый пересчитывает transform. На целевых слабых устройствах (`04:236` `deviceMemory<=4`) это прямой провал INP<200ms. Спека **знает** решение (`16:124` предлагает CSS `animation-timeline: scroll()`) — но **не применяет**.
- **Альтернатива:** Перенести parallax/progress на **CSS Scroll-driven Animations** (`animation-timeline: scroll()`, `view()`) — работает в композиторе, не трогает JS. Для Lenis: либо отказаться в пользу нативного скролла + SDA (как советует `16:124`), либо ограничить число `useScroll`-подписчиков и использовать единый Lenis-движок без дублирующих rAF.

### BUG-A5 · Scroll-driven Animations API (CSS) не используется, хотя желателен
- **Где:** `13_BENCHMARK_SYNTHESIS.md:35` («scroll-driven» назван желаемым паттерном), `CRITIC_COMMISSION_16_PERFORMANCE.md:124` (прямая рекомендация), НО `04_BLOCKS.md`/`06_TOKENS.md` — **ни одного** упоминания `animation-timeline`/`scroll()`.
- **Суть:** Поддержка Chrome/Edge 115+ (2023), Safari 26 (2025/TP), Firefox (флаг/отстаёт). Для «премиум, много движения» это главный рычаг разгрузки main thread. Спека игнорирует современный стандарт и везде полагается на JS (Framer/Lenis/rAF).
- **Альтернатива:** Прописать SDA как **прогрессивное улучшение**: парallax/progress/scroll-reveal реализовать на CSS `animation-timeline`, а Framer-ветку оставить как фолбэк (`@supports not (animation-timeline: scroll())`). Это снимет BUG-A4 на поддерживающих браузерах.

### BUG-A6 · View Transitions API не используется для page-transitions
- **Где:** `06_TOKENS.md:167` («Page transition: clip-path/blur, Framer `AnimatePresence`»).
- **Суть:** В Next.js App Router `AnimatePresence` для смены **роута** — хрупко: нет нативного «exit before navigation», часты layout-shift и «мертвые» анимации при навигации (известная боль App Router + Framer). При этом Нативный View Transitions API (Chrome 126+, Safari 18+) даёт composited cross-fade/shared-element из коробки, без JS-оверёжки и без блокировки скролла.
- **Альтернатива:** Использовать **View Transitions API** (`document.startViewTransition` + `next-view-transitions` либо нативный обёртчик) для переходов между роутами; Framer `AnimatePresence` оставить только для in-page (mount/unmount компонентов), где он надёжен.

### BUG-A7 · Внутреннее противоречие: «parallax на ВСЕХ карточках» vs «parallax только на 1 hero-стрипе»
- **Где:** `04_BLOCKS.md:359` (контракт «живого фото»: Ken Burns + лёгкий parallax `ParallaxImage` на **всех** карточках меню/форматов/галереи/станций) **против** `11_GALLERY_TEASER_STORYBOARD.md:11,45` («Parallax — НЕ per-image … лёгкий parallax допустим только на 1 hero-стрипе… На mobile parallax off») и `04:236` D8 (плоский рендер без parallax при reduced-motion).
- **Суть:** Глобальный контракт `04` обязывает parallax на десятках/сотнях карточек (MenuCatalog 78 SKU + галерея + форматы). Это взрыв GPU-слоёв и main-thread работы при скролле — прямое нарушение собственного бюджета INP<200ms (`04:464`). Storyboard `11` сам это признаёт и запрещает, но `04` (источник истины блоков) всё равно диктует parallax везде.
- **Альтернатива:** Сделать `04:359` подчинённым правилу из `11`: parallax **только** на одном feature-стрипе; на остальных карточках — только hover-Ken-Burns (user-driven, не scroll-driven) + reveal. Устранить рассинхрон между `04` и `11`/D8 явной правкой `04`.

### BUG-A8 · `requestIdleCallback` без фолбэка (Safari)
- **Где:** `04_BLOCKS.md:376` («грузится ПОСЛЕ paint (`preload="none"` + `requestIdleCallback`/`window.load`)»).
- **Суть:** `requestIdleCallback` не поддерживался в Safari до ~2024 (и до сих пор частично/с оговорками). Без фолбэка на `requestAnimationFrame`/`setTimeout` видео Hero может вообще не догрузиться на части iOS — теряется «живое фото».
- **Альтернатива:** `const ric = window.requestIdleCallback || (cb => setTimeout(cb, 200));` и явный вызов после `window.load`.

### BUG-A9 · `backdrop-filter` без `-webkit-` префикса (Safari/iOS)
- **Где:** `04_BLOCKS.md:63` («Диалоги/модалки — `rgba(28,24,21,0.06)` blur, НЕ чёрный») и `09_HERO_STORYBOARD.md:12,470` (scrim-градиент поверх hero).
- **Суть:** `backdrop-filter` требует `-webkit-backdrop-filter` для Safari <18 (значительная доля iOS в РФ). Без префикса блюр-оверлеи/модалки на iPhone **не применяются** → текст над видео/фото теряет контраст (нарушение AA 4.5:1, `09:469`) и модалки выглядят «голыми».
- **Альтернатива:** Всегда писать пару `backdrop-filter` + `-webkit-backdrop-filter`; в `06_TOKENS` зафиксировать миксин/утилиту. Замерить контраст ПОВЕРХ видео не только post-hoc, но и при отсутствии блюра (фолбэк — непрозрачный scrim).

### BUG-A10 · `font-display:swap` (FOUT) во время clip-path-анимации H1 = видимый «дёрг» и сдвиг clip-области
- **Где:** `04_BLOCKS.md:467` («текст НЕ сдвигается при загрузке шрифтов — `font-display:swap`+preload woff2») + `09_HERO_STORYBOARD.md:66` (clip-path wipe H1 стартует с delay 300ms).
- **Суть:** Cormorant — display-шрифт, Cyrillic-покрытие ограничено (`09:41` признаёт faux-oblique). Если woff2 не успел (нет прелоада для нужного подмножества / slow 4G), H1 анимируется fallback-глифами, затем **swap** меняет метрики → clip-path-область и ширина слов меняются на лету → видимый «скачок» внутри уже идущей анимации. Утверждение `04:467`, что swap «не сдвигает текст», верно для статичного текста, но НЕ для текста в процессе transform/clip-path.
- **Альтернатива:** Либо (а) `font-display: optional` для H1 (или block с коротким таймаутом) + preload точного Cyrillic-подмножества Cormorant, либо (б) стартовать entrance-анимацию H1 **после** `document.fonts.ready`, либо (в) зафиксировать ширину контейнера H1 `min-width`/`ch`, чтобы swap не двигал clip-область.

### BUG-A11 · `CustomCursor` — непрерывный pointermove-аниматор + риск WCAG 2.5.7, переиспользуется «без правок»
- **Где:** `39_CANON_INDEX.md:74` (глобально в `layout`), `41_BUILD_CHECKLIST.md:32` («переиспользовать … `CustomCursor` … импортируются без правок»), `15_REPO_AUDIT.md:65`, `CRITIC_COMMISSION_14_A11Y.md:118-120`.
- **Суть:** Кастомный курсор = listener `pointermove` на каждый кадр движения (+ transform следования). На целевых слабых устройствах — лишний main-thread cost; для пользователей с тремором/low-vision — риск скрытия нативного курсора (WCAG 2.5.7). Спека велит взять «без правок».
- **Альтернатива:** Либо убрать из светлой сборки; либо `hidden md:block` + `(pointer:fine)` + **никогда не прятать нативный курсор** (`cursor: none` только визуально поверх, нативный остаётся); не использовать для drag-жестов без кнопочного эквивалента.

### BUG-A12 · Magnetic-кнопки ±12px на множестве CTA = множество pointermove-обработчиков
- **Где:** `06_TOKENS.md:165` (magnetic ±12px), `04_BLOCKS.md:69,465` (Hero CTA, sticky CTA), `09_HERO_STORYBOARD.md:69` (magnetic hover).
- **Суть:** `MagneticButton` требует per-frame `pointermove` на каждом инстансе (header CTA, Hero CTA, sticky-mobile CTA, формы). Несколько экземпляров на экране = несколько параллельных pointermove-циклов → INP-стоимость на слабых. Также magnetic конфликтует с тач (хотя `pointer:fine` помогает) и с reduced-motion (гасится только если прописан гейт).
- **Альтернатива:** Ограничить magnetic **одним** первичным CTA на экран; остальные — hover-scale (composite). Гасить по `useReducedMotion()` И по `pointer:coarse`. Throttle pointermove через rAF (один тик на кадр, не на каждое событие).

### BUG-A13 · Нет бюджета плавности (fps/jank) и лимита одновременных анимаций
- **Где:** `04_BLOCKS.md:464-467` (бюджеты LCP/INP/CLS), `:236` (INP<200ms assert) — но **нет** цели «≥60fps», «≤N одновременных анимаций», «кадр < 16.7ms».
- **Суть:** Спека требует «много движения» (`00_PLAN.md:20`, `13:35`), но не определяет, *как измерить*, что оно плавное. INP ловит только input-lag, не постоянный scroll-jank. Без явного fps-гейта и cap на слои анимации верстальщик легко превысит бюджет (см. BUG-A1/A4/A7).
- **Альтернатива:** Добавить в `41_BUILD_CHECKLIST` гейт: «DevTools Performance — long tasks < 50ms при скролле; ≤ K продвинутых (`will-change`) слоёв; frame rate ≥ 55fps на throttled CPU (4× slowdown)». Привязать к e2e.

### BUG-A14 · Прелоадер-morph vs «никакого блокиратора» — внутреннее противоречие по LCP/INP
- **Где:** `04_BLOCKS.md:206-209` («либо ≤400ms morph … Никакого `position:fixed; inset:0` блокиратора») **против** `09_HERO_STORYBOARD.md:64` («seamless: прогресс-бар→100% → лого scale-down … (0.5s exit, skippable)») и `06_TOKENS.md:163`.
- **Суть:** Morph-прелоадер **подразумевает** наличие оверлея `position:fixed inset:0` хотя бы на 400–500ms+0.5s exit. На mobile 4G (`04:208` B-IGOR-5: «НИКОГДА не держит дольше 400ms») это съедает воспринимаемый LCP и INP. Спека одновременно хочет «вау-morph» и «LCP<1.2s без блокировки» — противоречие не разрешено для мобильного пути.
- **Альтернатива:** На mobile (и reduced-motion) — **мгновенный** показ Hero, прелоадер отменяется (`04:207` вариант в); morph-лого оставить только desktop+wifi как чисто декоративный, не блокирующий input. Чётко разделить пути в `09`.

### BUG-A15 · Reveal-stagger на длинных списках (78 SKU / галерея) = десятки Framer-узлов + IO
- **Где:** `06_TOKENS.md:160` (reveal stagger 80ms), `04_BLOCKS.md:160` (Reveal wrapper / `whileInView`), `:505` (первые 2–3 eager, остальные lazy).
- **Суть:** `whileInView` создаёт отдельный motion-узел и (как минимум) IntersectionObserver на **каждый** элемент. Для MenuCatalog из 78 SKU + галереи это сотни наблюдателей и сотни motion-компонентов, монтируемых разом → main-thread churn при первом скролле, конфликт с INP. `viewport={{once:true}}` (`06:169`) помогает после, но старт тяжёлый.
- **Альтернатива:** Для списков > ~12 элементов — **один** IntersectionObserver на контейнер + CSS-class reveal (не Framer-узел на каждый item); либо групповой stagger по контейнеру; `content-visibility:auto` (как в `11:11`) для «ниже фолда».

### BUG-A16 · `prefers-reduced-motion` гейт не гарантирован для CSS-анимаций (только JS-хук)
- **Где:** `06_TOKENS.md:168` (признаёт: «marquee и parallax вне Framer → их тоже гасить по `useReducedMotion()`»), `04_BLOCKS.md:236` (D8 плоский рендер).
- **Суть:** Гейт завязан на `useReducedMotion()` (Framer, JS). Если JS не загрузился/hydration fail (а спека сама допускает no-JS fallback для контента, `09:64`), marquee/rAF-parallax/CSS-анимации **продолжают крутиться**. Нет декларативного `@media (prefers-reduced-motion: reduce) { *,*::before,*::after { animation: none !important; transition: none !important } }` в `globals.css`.
- **Альтернатива:** Добавить глобальный CSS-гейт в `app/globals.css` (правило выше) как первичный, JS-хук — вторичный. Это закроет no-JS/ошибку-hydration случай для ВСЕХ анимаций сразу.

---

## 5. Самопроверка (self-review)

| № | Проверяю сам себя | Вердикт |
|---|---|---|
| 1 | Я действительно нашёл упоминания `will-change`? (не пропустил?) | Нет — grep по всей папке STRUCTURE: `will-change` → **0 совпадений**. BUG-A1 обоснован. |
| 2 | Scroll-driven / View Transitions реально не упомянуты в спеце? | Да — в `04`/`06`/**0**; есть только в `13` (желание) и `16:124` (совет, не принят). BUG-A5/A6 обоснованы. |
| 3 | Противоречие parallax (04 vs 11) реально? | Да — `04:359` «на всех карточках» vs `11:11,45` «только 1 hero-стрип, mobile off». BUG-A7 обоснован. |
| 4 | `clip-path` действительно не compositor-only? | Да — общеизвестно: `clip-path` (кроме простых `inset` в некоторых движках) вызывает paint; спека сама пишет «дороже fade» (`06:162`). BUG-A2 обоснован. |
| 5 | Я не «забил» на позитив? Спека НЕ всё плохо. | Верно: фасад-видео (`04:348`), отключение Lenis (`04:158,259`), 1-loop-cap Ken Burns (`06:166`), facade ниже фолда (`04:237`), reduced-motion осознан (`06:168`). Это удерживает оценку выше дна. |
| 6 | Хватает ли 10 багов? | **16 багов** (A1–A16), всем с file:line + альтернативой. Перевыполнено. |
| 7 | Не согласился автоматически? | Да — там, где спека «гордится» motion-богатством, я показал, что оно лобовое с её же CWV-бюджетами. |
| 8 | Скоринг ≤9 соблюдён? | Да — **6.0/10** (см. Вердикт). |

---

## 6. Вердикт

### Итоговый скоринг: **6.0 / 10** (жёстко ≤ 9, как требовалось)

**Обоснование:** Спека демонстрирует **хорошее концептуальное покрытие** а11y/perf-намерений (reduced-motion, фасад-видео, отключение Lenis, INP-бюджеты, cap на Ken Burns loop, facade ниже фолда). Но как **техническая реализуемость анимаций** она проваливает инженерную дисциплину:

- **Ноль `will-change`-политики** (BUG-A1) при десятках слоёв — гарантированный джанк/утечка на целевых слабых устройствах.
- **Ключевые «вау»-эффекты paint-bound** (`clip-path` wipe, `box-shadow`) выданы за премиум без композиторной замены (BUG-A2/A3).
- **Scroll-стек целиком на main thread** (Lenis+rAF-marquee+Framer `useScroll`×N), хотя решение (CSS Scroll-driven Animations) известно авторам (`16:124`) и желательно заказчику (`13:35`) — но **не принято** (BUG-A4/A5).
- **View Transitions API** проигнорирован в пользу хрупкого Framer `AnimatePresence` в App Router (BUG-A6).
- **Внутренние противоречия**: parallax «везде» vs «только hero» (BUG-A7); прелоадер-morph vs «без блокиратора» (BUG-A14).
- **Совместимость**: `backdrop-filter` без `-webkit-` (BUG-A9), `requestIdleCallback` без фолбэка (BUG-A8), FOUT во время clip-path (BUG-A10).
- **Нет измеримого бюджета плавности** — только LCP/INP/CLS (BUG-A13).

Причина, почему **не ниже**: спека *местами* технически грамотна и осознаёт часть рисков; при честной реализации большинства альтернатив из BUG-A1…A16 оценка поднимается до 8–9. Но в **текущем виде** спецификация обещает «много премиум-движения» поверх бюджетов, которые это движение систематически нарушает, и игнорирует современные композиторные API. **6.0/10** — рабочая, но требует переработки motion-контрактов перед сборкой.

### Обязательные правки перед сборкой (приоритет)
1. Прописать `will-change`-политику в `06_TOKENS` §4 (BUG-A1).
2. Устранить противоречие parallax `04:359` ↔ `11:11,45` (BUG-A7).
3. Заменить paint-bound `clip-path`/`box-shadow`-анимации на composite-only (BUG-A2/A3).
4. Принять CSS Scroll-driven Animations + View Transitions как прогрессивное улучшение (BUG-A5/A6).
5. Добавить глобальный CSS `@media (prefers-reduced-motion)`-гейт в `globals.css` (BUG-A16).
6. Добавить fps/jank-бюджет и cap слоёв в `41_BUILD_CHECKLIST` (BUG-A13).
