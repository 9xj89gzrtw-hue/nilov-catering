# 37 — MOTION-КРИТИК A (спека): анимация / motion-язык проекта

**Роль:** независимый ДИЗАЙН-КРИТИК (devil's advocate, занижение). Я НЕ автор спеков.
**Дата:** 2026-07-19.
**Объект:** motion-язык / анимация в ПРОЕКТНЫХ файлах (спека, НЕ собранный рантайм).
**Зона оценки:** чисто motion (не «foundation»/«blocks»/«media-ДНК» в целом — см. `36_DESIGNCRITIC_C_MOTION_MEDIA`).
**Источники:**
- `01_VISUAL_DNA.md` §4 (motion-language), §5 (геометрия), §7 (чек-лист).
- `06_TOKENS.md` §4 (motion tokens).
- `09_HERO_STORYBOARD.md`, `10_FORMAT_SHOWCASE_STORYBOARD.md`, `11_GALLERY_TEASER_STORYBOARD.md` (motion-таблицы).
- `17_MEDIA_DIRECTION.md` (loop-видео, codec-tiers).
- Рубрика `36_DESIGN_RUBRIC.md` (правила занижения, вердикты).

**Метод (по `AGENTS.md` + `36_DESIGN_RUBRIC` §Правила):** фикс. занижение; балл ≥8 требует
ЦИТАТЫ спеки + РЕАЛЬНОГО бенчмарка (иначе падает до 7); автор баллы не ставит; метрики
(Lighthouse/INP/axe) измеримы ТОЛЬКО при сборке → это честный потолок spec-стадии.

**Обязательный web_search выполнен (4 запроса, 2026):**
1. `best website animation practices 2026` → schoolofmotion.com/10-sites, mightyfinedesign.co, atin.studio «Future of Web Animation 2026», designrush, motionkit.io.
2. `prefers-reduced-motion best practices` → MDN `@media/prefers-reduced-motion`, doka.guide/a11y, dev.to (Lottie+a11y), since1979 (React hook).
3. `Awwwards restaurant motion 2026` → awwwards.com/sites/crav-burgers (SOTD), reallygooddesigns «motion visual identity 2026», animation-2026 GitHub (GSAP+R3F Awwwards-level).
4. `Lighthouse INP animation jank 2026` → rankai.ai/core-web-vitals-2026, dev.to/core-web-vitals-2026, sitegrade.io «INP fully replacing FID», ignitionnova «INP update 2026».
Плюс извлечён MDN `prefers-reduced-motion` (подтверждено: реальная CSS-медиафункция, не выдумка).

---

## ТАБЛИЦА 9 ОСЕЙ (0–10, заниженно; ≥8 требует доказательства)

| # | Ось | Балл | Одна строка критики (devil's advocate) |
|---|---|---|---|
| 1 | Purpose / уместность | **7** | Motion ТОЧНО привязан к смыслу (reveal=entrance, hover=delight, preloader=morph, reduced-motion=off) и к north-star «Drinkit living-photo» (`01 §4`). НО словарь максималистский: clip-path ink-bleed + Ken Burns на ВСЕХ карточках + magnetic + marquee + parallax + count-up одновременно (`01 §4`, `06 §4`) — для midsegment-траста «без снобизма» (`01 §1`) это избыточно, motion местами «флексит» вместо помощи выбору кейтеринга. |
| 2 | Performance (CWV от анимаций) | **6** | Есть реальная дисциплина: poster-LCP hero (вар.В, `09:11`), hover-throttle `pointer:fine+IO+≤1 loop+≤1 decode` (`06_TOKENS:166`), codec-tiers (`17:52`), `content-visibility:auto` (`11:11`). НО каждый сигнатурный жест — на CWV-опасном списке: clip-path wipe «Дороже fade» (`06_TOKENS:161`), Lenis smooth-scroll (scroll-listener → INP), magnetic на `mousemove`, 100 `<video>`-карточек (`17:107`). Троттлинг смягчает, но НЕ доказан; бюджета INP/LCP на ВЕСЬ motion-системе нет (есть только у Calculator). sitegrade.io 2026: «INP fully replacing FID» — анимации = главный INP-риск. |
| 3 | Reduced-motion / a11y | **7** | Лучшая ось по НАМЕРЕНИЮ: `lenis.destroy()` при reduced-motion (`01:71`, `06:160`), marquee/parallax пауза по `useReducedMotion()`+`pause-on-hover/focus` (`06:168`, WCAG 2.2.2), reveal-фолбэк `mounted && !reducedMotion` (`06:169`), Framer-гейт (`01:88`). НО гашение marquee/parallax/Lenis — ВНЕ Framer → полагается на JS-гейт, который не покрывает CSS-анимации без отдельного `@media (prefers-reduced-motion: reduce)` (MDN подтверждает медиафункцию). Документировано, не измерено axe. |
| 4 | Интерактивность (hover/focus/tap + клавиатура) | **6** | Покрыты три пути: hover Ken Burns+magnetic (`01 §4`), touch → autoplay-on-view/tap-to-play (`06_TOKENS:158`), keyboard → «focus запускает тот же loop» (`17:45`, WCAG 2.1.1). НО motion-делайты (magnetic `±12px`, 3D-tilt `±4° `10:48`, Ken Burns zoom) фундаментально pointer/mouse-driven; клавиатурная альтернатива ЗАДЕКЛАРИРОВАНА только для loop-видео, не для tilt/magnetic; на touch делайты пассивны (autoplay), не интерактивны — а catering-трафик 78% мобайл (`11:12`). |
| 5 | Консистентность motion-языка | **7** | Токены заданы и едины: `--ease-out-expo/-spring`, dur 200/400/700, wipe 600, stagger 80мс, per-word 60мс (`06_TOKENS:152-169`); reveal-паттерн `initial y:24 opacity:0 → whileInView` повторяется в `09/10/11`. НО меж-док. противоречие по parallax: `11:11` «parallax НЕ per-image, только 1 hero-strip» vs `17:159` «GalleryMasonry video-слоты … parallax + play on click». Плюс `06 §4` «GSAP НЕТ в deps» но местами упоминается GSAP — остаточный шум. |
| 6 | Осязаемость / feedback | **7** | Богатый словарь отклика: magnetic (физич. инерция), `shadow-hover` на карточках (`10:49`), focus-visible 2px gold (`--color-ring`, `06:38`), scroll-progress bar (gold), preloader→hero morph (`09:64`), count-up цены (spring), scroll-hint пульс (`09:71`). НО «осязаемость» по природе pointer-концепт: на touch нет тактильного эквивалента magnetic/tilt (получают пассивный autoplay); применение focus-visible к ВСЕМ интерактивам (меню/галерея-ссылки) задекларировано токеном, не верифицировано. |
| 7 | Stagger / timing | **8** | [ДОКАЗАНО] Дисциплина тайминга — сильнейшая ось. Токены: dur-fast 200 / base 400 / slow 700, ease-out-expo для reveals, ease-spring для countUp/magnetic; stagger 80мс (reveals), per-word 60мс (hero), hero-таймлайн НЕ одновременный: overline 200→H1 300→sub 700→CTA 900→microcopy 1100→scroll-hint 1.5s (`06_TOKENS:152-169`, `09:65-72`). Бенчмарк: Awwwards SOTD 2026 (crav-burgers и др.) и schoolofmotion «10 sites 2026» ставят staggered, sequenced entrance в стандарт; atin.studio 2026 — «immersion через тайминг». Residual: clip-path 60мс×N слов на initial paint конкурирует с LCP<1.2s; marquee/parallax не имеют заданного easing. |
| 8 | Бенчмарк vs Awwwards / restaurant-motion 2026 | **7** | Benchmark-осведомлённость ВЫСОКАЯ и честная: clip-path ink-bleed ← OpenCode Michelin (`09:60`), geometric circle/diamond frames ← Proof of the Pudding / Queen of Hearts (`01:92`), autoplay hero ← PoP/Anmol/Deborah Miller (`09:5`), marquee ← trust-bar; и — важно — сознательно ОТВЕРГНУТ тяжёлый WebGL-video page-transition Restaurant GEM в пользу лёгкого clip-path/blur (`01:81`). НО ВСЕ референсы — luxury/award-максимум (Awwwards SOTD, которые сами же «тяжёлые»); ни ОДНОГО calm/mid-tier catering-референса; урок Framer Awards 2025 («restraint» победил) в плотность НЕ интернализирован. |
| 9 | Безопасность (нет бесконечных loop / memory leaks) | **7** | Гейты есть: «≤1 активный loop», `preload="none"+IntersectionObserver`, «≤1 decode за раз» (`06_TOKENS:166`), seamless loop (кадр1=кадрN, `17:52`), reduced-motion стопит loops. НО архитектура 80–100 `<video>`-узлов в DOM (даже paused, preload=none) — memory/decoder-бюджет на mobile; нет стратегии lazy-mount/unmount видео при уходе со viewport/роута (только throttle ВОСПРОИЗВЕДЕНИЯ). AnimatePresence page-transitions — риск «висящих» анимаций при некорректном exit. marquee CSS-анимация бежит бесконечно (гасится по reduced-motion/hover — задекларировано). |

**Средний балл: (7+6+7+6+7+7+8+7+7) / 9 = 62 / 9 ≈ 6.9 / 10** (заниженно, честно).

> Ниже порога PASS (≥8 по `36_DESIGN_RUBRIC`). Выше FAIL (<6). Честный потолок spec-стадии:
> каждая ось, требующая доказательства CWV/axe, капнута до 6–7 (нет замеров при сборке).
> Ось 7 (Stagger/timing) — единственная ≥8, с прямыми цитатами `06_TOKENS`/`09` + бенчмарком.

---

## BUG-LIST (motion-зона; цитата → почему плохо → реальный мир → фикс)

**M1. [ВЫС] Hero clip-path ink-bleed wipe конкурирует с бюджетом LCP<1.2s и сам признан «дороже fade».**
- Цитата `06_TOKENS:161-162`: «clip-path: inset(0 100% 0 0) → inset(0) … «Ink-bleed» проявление … **Дороже fade**»; `09:66`: per-word stagger 60мс после delay 300мс (H1 «Кейтеринг, который чувствуешь заранее.» ≈ 5 слов → ~300мс только на H1, CTA в ~900мс).
- Почему: clip-path — transform (не reflow), НО стартует на initial paint поверх LCP-постера; «дороже fade» = больше main-thread work ровно когда LCP замеряется. При long RU-H1 тайминг упирается в <1.2s.
- Реальный мир: schoolofmotion/atin.studio 2026 — тренд «performance-first motion»; rankai.ai 2026 — анимации на initial paint бьют по LCP/INP.
- Фикс: стартовать wipe ТОЛЬКО после подтверждения poster-LCP (пост-load rAF, не на mount); ограничить per-word до ≤4 слов ИЛИ fade для sub/overline; задокументировать LCP-бюджет на hero-анимацию.

**M2. [ВЫС] Lenis smooth-scroll — INP-хостильный на среднем мобайле, хотя есть reduced-motion гейт.**
- Цитата `01:71`: «Lenis smooth scroll + тонкий scroll-progress bar»; `06_TOKENS:160`: `if (prefersReducedMotion){lenis?.destroy();return;}`.
- Почему: гейт срабатывает только для ~5% с OS-flag; остальные 95% (вкл. catering-мобайл-большинство) получают JS-инерционный scroll-listener → раздувание INP. smooth-scroll либы — известный INP-антипаттерн 2026.
- Реальный мир: sitegrade.io 2026 «INP fully replacing FID»; ignitionnova 2026 «INP update» — scroll-linked JS = топ INP-риск.
- Фикс: perf-fallback — отключать Lenis при `navigator.hardwareConcurrency<=4` / `navigator.connection.saveData` / low-end; либо заменить на CSS `scroll-behavior:smooth` + IntersectionObserver (без постоянного listener).

**M3. [ВЫС] 80–100 DishCard loop-видео: троттлинг АКТИВНЫХ loop=1, но 100 `<video>` DOM-узлов висят в памяти.**
- Цитата `17_MEDIA:107`: «DishCard (меню): 80–100 блюд, фото + 5с loop на hover»; `06_TOKENS:166`: «не более 1 активного loop одновременно; ≤1 decode на main thread за раз».
- Почему: троттлинг ограничивает ВОСПРОИЗВЕДЕНИЕ, не КОЛИЧЕСТВО узлов. 100 `<video preload="none">` в DOM = memory pressure + decoder slots на mobile; нет unmount при уходе со viewport/роута → потенциальный leak/CLS при переходах.
- Реальный мир: Mintec 2026 (hero-video lesson) — десятки видео-узлов = memory/CLS; 2026 CWV ставят video-node count в ущерб.
- Фикс: lazy-mount `<video>` ТОЛЬКО на hover/focus (swap poster→video), unmount на blur/route-change; ИЛИ poster + Lottie/GIF micro-loop (без `<video>`-узла).

**M4. [СРЕД] Меж-док. противоречие по parallax галереи (`11` vs `17 §8`).**
- Цитаты `11_GALLERY_TEASER:11`: «Parallax — НЕ per-image; лёгкий parallax допустим только на 1 hero-стрипе» vs `17_MEDIA:159`: «GalleryMasonry video-слоты … parallax + play on click».
- Почему: две инструкции для одного блока конфликтуют → исполнитель не знает, parallax на плитках gallery или нет; per-tile parallax = CLS/LCP-ловушка (`11:11` сам это признаёт).
- Реальный мир: atin.studio 2026 — inconsistent motion = usability-шум; masonry+per-image transform бьёт CLS.
- Фикс: привести `17 §8` к `11` (parallax ТОЛЬКО на 1 hero-strip, не per-tile); play-on-click оставить, parallax убрать из рядовых слотов.

**M5. [СРЕД] Клавиатурное/тач-равенство motion-делайтов — задекларировано частично.**
- Цитата `17:45`: «hover-loop дублируется клавиатурной альтернативой (focus → тот же loop)»; НО `01 §4`/`10:48` magnetic `±12px` и 3D-tilt `±4°` — pointer/mouse-only, без клав./тач-эквивалента.
- Почему: WCAG 2.1.1 требует операцию с клавиатуры; богатые делайты (tilt/magnetic) недоступны с клавиатуры, на touch — пассивны. Равенство есть только для loop-видео.
- Реальный мир: since1979/dev.to 2026 — `useReducedMotion`+keyboard parity обязательны; WCAG 2.1.1.
- Фикс: для ВСЕХ pointer-делайтов задать keyboard-состояние (focus-visible ring + static reveal, без анимации) и touch tap-to-activate для tilt; прописать в `06 §4` + `17`.

**M6. [СРЕД] Reduced-motion гейт для НЕ-Framer элементов (marquee/parallax/Lenis) — только JS, без CSS-медиафункции.**
- Цитата `06_TOKENS:168`: «marquee (Trust-bar) и parallax (галерея) — **вне Framer** → их тоже гасить по `useReducedMotion()`».
- Почему: `useReducedMotion()` покрывает ТОЛЬКО Framer-анимации; marquee (CSS `@keyframes`), parallax (scroll-listener), scroll-hint pulse, Lenis — вне Framer. При отказе JS или если гейт не дойдёт до CSS — они играют для вестибулярно чувствительных.
- Реальный мир: MDN `@media/prefers-reduced-motion` (извлечено) — реальная медиафункция; doka.guide — «замедлить или полностью отключить анимацию»; WCAG 2.2.2 (Pause/Stop/Hide для >5s).
- Фикс: добавить явный CSS `@media (prefers-reduced-motion: reduce){ * { animation: none !important; transition: none !important; } }` kill-switch для marquee/parallax/scroll-hint/ Ken Burns, не только JS; верифицировать axe после сборки.

**M7. [НИЗ] Motion-плотность максимализм vs midsegment «без снобизма».**
- Цитаты `01 §1`: «Премиум-ЛЕКСЕМЫ … СНОБИЗМ → УБИРАЕМ» vs `01 §4/§5`: clip-path ink-bleed SOTD, gold diamond-frames, Ken Burns на 80 карточках, marquee.
- Почему: copy «доступно для любого бюджета / без переплат», а motion кричит «luxury award-site» → эмоц. диссонанс бьёт trust-seg.
- Реальный мир: Framer Awards 2025 — победил «restraint»; atin.studio 2026 — «interactivity + usability», не максимализм.
- Фикс: «вау»-жесты ТОЛЬКО Hero + ShowCooking; в массовых блоках (DishCard×80, Gallery) — Ken Burns без loop, убрать diamond-frames из рядовых рядов; прописать «restraint в массовых блоках» в `01 §4`.

**M8. [НИЗ] Нет CWV-бюджета на ВЕСЬ motion-систему (только у Calculator).**
- Цитата `06_TOKENS §4`: задаёт duration/ease, НО ни слова про INP/LCP/CLS-бюджет motion-системы; `04_BLOCKS` Calculator — «INP<200ms» (другой блок).
- Почему: нельзя доказать PASS без чисел; clip-path+Lenis+magnetic+100-video без суммарного бюджета = неизмеримый риск.
- Реальный мир: 2026 — INP ключевая метрика (sitegrade.io); Lighthouse INP jank от анимаций — топ-тема.
- Фикс: добавить в `06 §4` явный per-interaction INP-бюджет (<200ms) и суммарный LCP<1.2s с учётом hero-wipe/Lenis; замерить Lighthouse/PageSpeed при сборке.

---

## VERDICT: REWORK

**Не FAIL** — фундамент motion-языка здоровый и выше среднего для spec-стадии: единые токены
(`06 §4`), дисциплинированный stagger/timing (**8**, доказан), осмысленный north-star «Drinkit
living-photo», сознательный отказ от тяжёлого WebGL (Restaurant GEM), и — редкость для спец —
продуманные reduced-motion-гейты (Lenis.destroy, marquee/parallax-pause, reveal-фолбэк).

**Но не PASS (≥8)** — средний **6.9**, и 3 ВЫС-бага держат потолок:
1. **M1** — hero clip-path wipe конкурирует с LCP<1.2s (сам признан «дороже fade»);
2. **M2** — Lenis = INP-риск на mobile-большинстве (гейт только для OS-flag);
3. **M3** — 100 `<video>`-узлов в DOM без unmount = memory/CLS-риск.

Плюс меж-док. противоречие parallax (`M4`), частичное клавиатурное равенство (`M5`),
JS-только reduced-motion-гейт для CSS-анимаций (`M6`), плотность vs midsegment (`M7`),
отсутствие CWV-бюджета (`M8`).

**Что уже хорошо (не трогать):** motion-токены `06 §4`, ink-bleed Hero (после фикса M1),
poster-LCP вар.В, hover-throttle `06:166`, codec-tiers `17:52`, reduced-motion-гейты (после M6),
staggered-timing `09`, living-photo north-star.

**Действие для родителя (перед сборкой):** закрыть M1–M3 (LCP-race hero-wipe; Lenis perf-fallback;
lazy-mount/unmount видео) + M4 (выровнять parallax `11`↔`17`) + M6 (CSS `@media` kill-switch).
M5/M7/M8 — до/после сборки. Объективная перепроверка (Lighthouse INP/LCP, axe) — после сборки,
отдельным прогоном (правило `36_DESIGN_RUBRIC` §Правила 5: балл ≥8 требует доказательства/метрики).

> Независимый критик (A-motion), занижающий. Бенчмарки: schoolofmotion 2026, atin.studio 2026,
> awwwards crav-burgers SOTD, reallygooddesigns 2026, MDN prefers-reduced-motion, sitegrade.io 2026
> (INP), rankai.ai/dev.to 2026 (CWV). Перепроверка метрик — после сборки.
