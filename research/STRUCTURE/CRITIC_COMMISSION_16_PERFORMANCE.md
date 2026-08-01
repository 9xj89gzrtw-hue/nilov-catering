# CRITIC COMMISSION 16 — PERFORMANCE ENGINEER (Core Web Vitals)

**Роль:** независимый Performance Engineer (Core Web Vitals). Специализация: LCP / INP / CLS,
тяжёлые анимации, видео, шрифты, lazy/priority-стратегии, RUM/lab-методология.
**Задача:** максимально строгая критика ПРОИЗВОДИТЕЛЬНОСТИ в СТРУКТУРЕ NiloV Catering
(только спецификация, не код). Не соглашаюсь с самоутверждениями спецы
(«LCP<1.2s», «BUG-X закрыт», «assert в тестах») без верифицируемого доказательства.
**ДНК:** светлая премиум (ivory `#FAF7F2` / ink `#1C1815` / gold `#B08D57`).
**Дата:** 2026-07-20.

---

## 1. Роль и метод

Я оцениваю *производительность на бумаге* — то, как спецификация закладывает CWV-бюджеты,
стратегию шрифтов/изображений/видео, gate-логику анимаций и методологию измерения.
Код не читал (по задаче). Но именно потому, что оценивается спека, я предъявляю к ней
инженерные требования: реалистичность заявленных метрик, внутренняя непротиворечивость
gate-логики, явные priority/preconnect-контракты, и честная методология assert'ов.

Спека демонстрирует **хорошие базовые инстинкты** (poster-LCP, `preload=none` видео,
lazy ниже фолда, `prefers-reduced-motion`, `fetchpriority`, `aspect-ratio` для CLS,
OR-контракт sticky). НО заявленные цели **LCP<1.2s / INP<200ms / CLS<0.1** выставлены как
универсальные твёрдые assert'ы без квалификации по классу устройства/сети, и содержат
ряд внутренних противоречий, которые делают их недостижимыми «как написано».

---

## 2. Прочитано (исходники)

| Файл | Строк | Что извлёк для CWV-критики |
|---|---|---|
| `04_BLOCKS.md` | 2275 (≈360 КБ) | блоки LCP/INP/CLS (B5/B6/B7/B11/B12/B13, D4/D7/D8), Preloader, Hero-video, Ken Burns, parallax, Lenis, видео-слой `lib/video.ts` 314–347, Hero-спец 352–491, Perf-бюджеты 464–467 |
| `09_HERO_STORYBOARD.md` | 89 | motion-таблица, clip-path wipe, Preloader→Hero morph, LCP<1.2s benchmark, reduced-motion fallback |
| `28_HEROCRITIC_LIVINGPHOTO.md` | 61 | вариант В (poster-LCP + subtle loop), баги #1–#9, баллы А 8.5 / Б 5.0 / В 9.0 |
| `41_BUILD_CHECKLIST.md` | 168 | гейты сборки, Фаза 1 Hero-гейт «LCP<1.2s / INP<200ms / reduced-motion», финальный CWV «Good» |
| `15_REPO_AUDIT.md` | 97 | стек (Next 16.2.10, framer-motion 12, lenis 1.3.25, @react-pdf/renderer, **gsap НЕТ**), тёмный legacy globals.css, ~40 компонентов |
| `06_TOKENS.md` | 186 | шрифты (Cormorant/Inter/JetBrains Mono, next/font), motion tokens, reduced-motion/Lenis-гейт |
| `01_VISUAL_DNA.md` | 117 | типографика (Cormorant H1 `clamp(2.5rem,5vw,4.5rem)`, `font-display:swap`+preload woff2), motion-language (Drinkit, Framer) |
| `CRITIC_COMMISSION_13_FRONTEND.md` | 172 | контекст — архитектура 5.0/10, самореферентные «BUG закрыт» без доказательств |

---

## 3. Сводная таблица оценок (0–10, строго)

| # | Измерение CWV | Оценка | Ключевая претензия |
|---|---|---|---|
| 1 | Реалистичность **LCP<1.2s** | **5** | Достижимо только на fast-4G/лаб; на слабом 4G (сама спека B6/D4 признаёт) 120 КБ poster + VPS-TTFB + decode > 1.2s. Assert без квалификации сети. |
| 2 | Реалистичность **INP<200ms** | **4** | Lenis ВКЛ по умолчанию на desktop (`04:158`) — известный INP-риск; магнитные hover + clip-path + десятки `useScroll`/`whileInView` (`04` ×54) на mid-tier. Бюджет измерен только для mobile/reduced-motion. |
| 3 | Реалистичность **CLS<0.1** | **6** | `aspect-ratio`/резерв высоты — хорошо, НО динамические высоты (AnnouncementBar per-visit `04:114`, CookieBanner, OR-sticky padding `04:196`) — классические CLS-источники; `font-display:swap` без fallback-метрик = reflow H1. |
| 4 | Стратегия **шрифтов** | **4** | `next/font` + ручной `preload woff2` (`06:71` vs `01:64`) — дубль/двойная загрузка; 3 семейства ×8 woff2; `swap` без `size-adjust`/fallback = CLS; нет `subsets:['cyrillic']`. |
| 5 | Стратегия **изображений/видео** | **6** | Poster-LCP, `fetchpriority`, lazy — правильно; НО нет `preconnect` к origin постера/Rutube; Rutube IO-autoplay (`04:478`) противоречит D4 (нет autoplay на слабом `04:237`); preloader-overlay vs LCP (`09:64` vs `04:203`). |
| 6 | Gate-логика анимаций / reduced-motion | **6** | В целом корректна (D8/B5/B6/B7/A8), НО противоречие: Lenis выключается то по `prefers-reduced-motion` (`04:158`), то по `pointer:coarse` (`41:22`); Lenis+Framer useScroll не сшиты (`06:148`). |
| 7 | Методология измерения / assert | **3** | «assert в тестах» (`04:236`) = CI на быстрой машине; нет device/network-класса, нет RUM, нет лаб-профиля (Moto G). Универсальный assert нечестен. |

**ИТОГОВЫЙ ВЕРДИКТ:** **6.0 / 10** (строго ≤ 9). Спека *производительность-осознанна*, но заявленные
CWV-цели **не обоснованы как универсально достижимые** и содержат 15+ документируемых
противоречий/пропусков. «Опережает код» (`41:21`) не делает метрики реалистичными.

---

## 4. Bug-list (file:line + альтернатива) — 15 багов

> Формат: `[ID] file:line — суть — альтернатива`. Все line проверены по прочитанным файлам.

**P1. [КРИТ] Универсальный assert LCP<1.2s без квалификации сети.**
`04_BLOCKS.md:464` / `09_HERO_STORYBOARD.md:83` / `41_BUILD_CHECKLIST.md:46` — LCP<1.2s заявлен как
твёрдый бюджет главной. Но `04:203-220` (B6/B13) САМА признаёт слабый 4G в метро (effectiveType='4g',
hardwareConcurrency<=4), где показывается ТОЛЬКО poster. Poster = ≤120 КБ webp/AVIF (`04:455`) на
самохост-ВПС в РФ (TTFB 200–500 мс + TLS + 120 КБ download + decode). На слабом 4G download 120 КБ
уже ~1–2 с → LCP>1.2s гарантированно.
→ Альтернатива: квалифицировать бюджет — «LCP<1.2s на fast-4G/lab (Moto G, 4G-good); на слабом 4G
допуск <2.5s»; уменьшить poster до ≤60–80 КБ AVIF + inline-LQIP (≤4 КБ) как data-URI; добавить
`preconnect` к origin.

**P2. [КРИТ] `font-display:swap` без fallback-метрик = CLS на H1 (противоречит CLS<0.1).**
`01_VISUAL_DNA.md:64` («font-display: swap, preload woff2») + `04_BLOCKS.md:467` («текст НЕ сдвигается
при загрузке шрифтов»). `swap` именно и вызывает reflow: H1 (Cormorant, clamp до 4.5rem `01:59`) рендерится
fallback, затем подменяется Cormorant → CLS. Спека утверждает CLS<0.1, но использует механизм, его создающий.
→ Альтернатива: при `next/font` задать `adjustFontFallback:true` (авто-метрики) ИЛИ ручной
`size-adjust`/`ascent-override` для fallback; либо `font-display:optional` для H1.

**P3. [КРИТ] `next/font` И ручной `<link rel=preload woff2>` одновременно = дубль/двойная загрузка.**
`06_TOKENS.md:71-79` (репо НЕ ручной preload, а `next/font` → headingFont/bodyFont/monoFont) vs
`01_VISUAL_DNA.md:64` и `06_TOKENS.md:106` («preload woff2» в `<head>`). С `next/font` преload
инжектируется автоматически; ручной `<link>` в `04:455` образца для шрифтов приведёт к двойному
запросу/прелоаду и путанице с poster-preload.
→ Альтернатива: выбрать ОДИН механизм. С `next/font` — убрать ручной preload шрифтов; контролировать
через `display`/`subsets`/`weight` в `lib/fonts.ts`.

**P4. [КРИТ] Lenis ВКЛ по умолчанию на desktop → INP-риск не покрыт бюджетом.**
`04_BLOCKS.md:158` — `SmoothScroll(Lenis)` «touchMultiplier:2, ВЫКЛ при prefers-reduced-motion»; то есть
для обычного desktop-пользователя (fine pointer, без reduced-motion) Lenis **активен** (lerp 0.1 + RAF).
Lenis hijack-скролл — известный INP-риск (RAF + scroll-interception задерживают ответ на input во время
momentum). Бюджет INP<200ms (`04:236`, `41:46`) замерен/упомянут только для mobile/reduced-motion,
НЕ для desktop с Lenis.
→ Альтернатива: либо отключать Lenis везде кроме явного «премиум scroll»-тоггла; либо измерять INP
именно с Lenis-active на desktop (lab Moto G + desktop-throttle) и фиксировать число; либо снизить
lerp и остановить RAF при отсутствии скролла (Lenis `idle`/`autoRaf:false`).

**P5. [КРИТ] Противоречие в условии отключения Lenis (reduced-motion vs coarse pointer).**
`04_BLOCKS.md:158` базово: Lenis выключается «при prefers-reduced-motion». `41_BUILD_CHECKLIST.md:22` (A11Y-гейт) и
`04:259` (A8): «НЕ только по pointer:coarse, НО и при prefers-reduced-motion». То есть две разные
спецификации gate. `04:249` (K9) добавляет ещё `(max-width:1023px) OR maxTouchPoints>0` для планшета.
Итог: три разных правила отключения Lenis в одной спеке.
→ Альтернатива: зафиксировать ЕДИНОЕ: `if (prefersReducedMotion || isCoarse || maxTouchPoints>0 || width<=1023) → Lenis.destroy()`; продублировать в `06_TOKENS` §4 и `41`.

**P6. [ВЫС] Preloader-overlay (`z-[100]`, 0.5s exit) конфликтует с LCP<1.2s.**
`09_HERO_STORYBOARD.md:64` («load→0, 0.5s exit, skippable») + `04_BLOCKS.md:203-214` (B5: прелоадер
держит `z-[100]` ~1.4–1.9s = блокирующий баг; фикс ≤400ms morph). Если overlay — `position:fixed; inset:0`
непрозрачный, он **перекрывает LCP-элемент (poster)** → LCP считается видимым только после fade overlay.
0.5s exit + загрузка poster = >1.2s даже на fast-4G. `09:64` утверждает «Hero виден БЕЗ JS, прелоадер —
оверлей поверх, не барьер», но `z-[100]` фикс-overlay ИМЕННО барьер, пока не прозрачен.
→ Альтернатива: прелоадер = `pointer-events:none` + `opacity` fade 0ms→0 за ≤200ms ИЛИ вообще убрать
блокирующий прелоадер (poster-LCP уже даёт «мгновенно»); если morph лого — делать его НЕ перекрывающим
hero (overlay поверх, но hero отрисован и виден сквозь/после 0ms).

**P7. [ВЫС] Lenis и Framer `useScroll` не сшиты (корректность + INP).**
`06_TOKENS.md:148-149` («для parallax используем Framer useScroll + useTransform») при глобальном
Lenis (`04:158`). Когда Lenis hijack-скролл, нативный scroll-ивент не летит → Framer `useScroll`
(читает `window.scrollY`) НЕ обновляется, ИЛИ оба подписаны на scroll → двойная main-thread работа
на каждый скролл. В спеке нет моста `lenis.on('scroll', (e)=> ScrollTrigger/MotionValue.update())`.
→ Альтернатива: явно задать `lenis.on('scroll', ...)` bridge к Framer `useScroll` (через `useMotionValue`
+ `scrollTo`), либо отказаться от Lenis и использовать нативный скролл + CSS scroll-driven animations
(`animation-timeline: scroll()`) — дешевле для INP.

**P8. [ВЫС] Rutube/Hero IO-autoplay противоречит D4 (нет autoplay на слабом соединении).**
`04_BLOCKS.md:237` (D4): ниже фолда «никакого autoplay» на `effectiveType==='4g'/saveData/deviceMemory<=4`,
только poster-facade + play по клику. НО `04:478` («HomeVideoShowcase НЕ трогаем — его autoplay-по-IO
сохраняется») и `04:722` («загрузка по IO requestIdleCallback после paint») — блок `27`/HomeVideoShowcase
ДЕЛАЕТ autoplay по IO. Прямое противоречие D4 ↔ `27`.
→ Альтернатива: D4 должен быть ЕДИНЫМ контрактом для ВСЕХ видео-блоков; убрать autoplay-по-IO из
`27`/HomeVideoShowcase, оставить facade+click везде на слабом соединении.

**P9. [ВЫС] Нет `preconnect`/`dns-prefetch` к origin постера и Rutube.**
`04_BLOCKS.md:455` (ручной `preload as=image fetchpriority=high` для poster) — но без `preconnect` к
самохост-ВПС (там лежит poster) и к `rutube.ru`/`cdn-ru.rutube.ru` (`04:347`, CSP-домены). Каждая
доп. RTT на critical path = ~50–150 мс потерь на LCP и на facade-клик.
→ Альтернатива: добавить `<link rel="preconnect" href="https://<cdn-domain>" crossorigin>` и
`dns-prefetch` в `layout.tsx`; для poster-origin — `preconnect` + `preload` из одного места.

**P10. [СРЕД] Магнитный CTA + clip-path wipe конкурируют с первым interaction (INP).**
`09_HERO_STORYBOARD.md:69` (CTA «magnetic hover ±12px, spring», delay 900ms) + `09:66` (H1 clip-path
wipe, stagger 60ms). Magnetic hover = JS на `pointermove` → main-thread во время того самого момента,
когда пользователь хочет кликнуть CTA. clip-path wipe — paint-тяжёлый entrance, совпадающий по времени
с первым скроллом/кликом. Спека не ограничивает эти анимации по INP-бюджету.
→ Альтернатива: magnetic hover только на `(hover:hover) and (pointer:fine)`; clip-path wipe завершить
до интерактивного окна (до 900ms или перенести на idle); деградация до opacity/transform при INP-превышении
(как в `04:236` D8 — но D8 это только для reduced-motion, нужно для ВСЕХ).

**P11. [СРЕД] Динамические высоты = CLS-источники (AnnouncementBar per-visit, CookieBanner, OR-sticky).**
`04_BLOCKS.md:114` (ZH1: high-season AnnouncementBar — `sessionStorage`, re-показ каждый визит) +
`04:196` (main `padding-bottom` резервируется ТОЛЬКО «если внизу виден sticky») + `04:182-186` (CookieBanner
`z-[120]`). Элементы, чьё присутствие зависит от стейта (per-visit показ/скрытие), при React-mount после
SSR сдвигают layout → CLS. Спека заявляет CLS<0.1, но именно эти блоки — классические CLS-виновники.
→ Альтернатива: резервировать место под AnnouncementBar/CookieBanner в SSR (фикс. высота даже если
скрыты через `visibility:hidden`, не `display:none`); sticky-padding задавать через CSS, а не JS-пересчёт
после paint; проверять CLS в Lighthouse field, не только lab.

**P12. [СРЕД] 3 семейства × ~8 woff2, без `subsets`/`weight`-ограничения — вес шрифтов бьёт LCP/INP.**
`01_VISUAL_DNA.md:57-63` (Cormorant 300–700 + italic, Inter 400/500/600, JetBrains Mono) + `06_TOKENS.md:76-78`.
Кириллический Cormorant — тяжёлый; без `subsets:['cyrillic']` next/font тащит латиницу+кириллицу.
Ручной «preload woff2» (`01:64`) без ограничения числа файлов = множественные запросы на 4G.
→ Альтернатива: `subsets:['cyrillic','latin']`, `weight` явно (не `auto` всех), `display:'swap'` +
`adjustFontFallback`; Inter — через `variable` один файл; загружать JetBrains Mono только на страницах
с ценами (lazy font, `font-display:swap`).

**P13. [СРЕД] `@react-pdf/renderer` — риск попадания в основной JS-бандл (TBT/INP).**
`04_BLOCKS.md:1853` («грузится только по клику») + `04:2217` (B-PROFI-6, в стеке) + `15_REPO_AUDIT.md:11`
(в deps). Утверждение «по клику» — нарратив, НЕ контракт. Если импорт статический в route калькулятора/
конструктора, ~200–400 КБ JS попадают в main chunk → TBT↑ → INP↑.
→ Альтернатива: обязать `next/dynamic(() => import('@react-pdf/renderer'), { ssr:false })` на кнопке
«Скачать КП»; зафиксировать в `41` гейт: grep `import('@react-pdf` (динамический) в калькуляторе.

**P14. [НИЗ] `aspect-ratio`/высота Hero зависит от vh без dvh → CLS на mobile address-bar.**
`04_BLOCKS.md:467` («poster занимает 100% hero-heights через aspect-ratio») + `04:247` (K7: явный фикс
`100dvh`/`100svh` для fixed/sticky, значит сейчас используется `100vh`). Если Hero-height = `100vh`
(не `dvh`), при появлении/исчезновении mobile address-bar высота Hero меняется → CLS постера.
→ Альтернатива: Hero-height = `100svh` (small viewport) как минимум, чтобы resize address-bar не сдвигал
LCP-бокс; `aspect-ratio` + `svh` вместо `vh`.

**P15. [НИЗ] «assert в тестах» без device/network-профиля и RUM — нечестный универсальный assert.**
`04_BLOCKS.md:236` («Жёсткий бюджет mobile: LCP<1.2s, INP<200ms — assert в тестах»). CI-тест на быстрой
машине с локальным сервером покажет <1.2s всегда; это не полевая/лаб-метрика реального 4G. Нет упоминания
Moto G (lab), нет RUM (CrUX/field). Универсальный assert создаёт ложное чувство выполнения бюджета.
→ Альтернатива: зафиксировать методологию — Lighthouse CI (Moto G, 4G-throttled) + CrUX/RUM field;
бюджеты дифференцировать (lab-fast / field-4G / field-slow); assert на field-p75, не на локальном прогоне.

---

## 5. Самопроверка

- [x] **Прочитал все 5 названных файла?** Да: `04_BLOCKS.md`, `09_HERO_STORYBOARD.md`,
      `28_HEROCRITIC_LIVINGPHOTO.md`, `41_BUILD_CHECKLIST.md`, `15_REPO_AUDIT.md`. Плюс `06_TOKENS.md`,
      `01_VISUAL_DNA.md`, `CRITIC_COMMISSION_13_FRONTEND.md` для перекрёстной проверки шрифтов/Lenis.
- [x] **Не согласился автоматически с CWV-целями?** Да — P1/P4/P5/P6/P8/P15 показывают, что
      LCP<1.2s/INP<200ms заявлены как универсальные без квалификации сети/устройства и содержат
      внутренние противоречия.
- [x] **≥10 багов с file:line + альтернативой?** Да — 15 багов (P1–P15), каждый с `file:line` и
      конкретной альтернативой.
- [x] **Ленивость/priority-хинты разобраны?** Да — P1 (fetchpriority+LCP), P9 (preconnect),
      P3/P12 (шрифты), P8 (autoplay vs facade), P13 (dynamic import PDF).
- [x] **Стратегия шрифтов/изображений?** Да — P2/P3/P12 (шрифты), P1/P9/P11 (изображения/CLS).
- [x] **Есть ли блокираторы?** Да — P6 (preloader-overlay), P4/P5/P7 (Lenis), P10 (magnetic/clip-path).
- [x] **Вердикт ≤9?** Да — **6.0/10**.
- [x] **Структура отчёта соблюдена?** Да — Роль / Прочитано / Таблица / Bug-list / Самопроверка / Вердикт.
- [x] **Язык — русский?** Да.

Контр-проверка собственных утверждений:
- Я утверждаю «gsap НЕТ, значит Framer useScroll тяжелее» — это оценка, не блокирующий баг, поэтому
  НЕ вынес в bug-list (корректно). 
- Я утверждаю «120 КБ on слабом 4G > 1.2s» — это зависит от скорости; поэтому в P1 дал альтернативу
  (уменьшить до ≤60–80 КБ + inline-LQIP), а не голословно.
- Я не нашёл в `04` явного `preconnect` — проверил grep'ом по `04`/`06`/`01` (нет совпадений) → P9 обоснован.

---

## 6. Вердикт

**6.0 / 10** (строго ≤ 9).

Спека **производительность-осознанна** лучше, чем архитектура (5.0) и CMS (3.0): она правильно
идентифицирует poster-LCP, `preload=none` видео, lazy ниже фолда, `prefers-reduced-motion`,
`fetchpriority`, `aspect-ratio` для CLS и OR-контракт sticky. **НО**:

1. Заявленные **LCP<1.2s / INP<200ms / CLS<0.1** выставлены как универсальные твёрдые assert'ы без
   квалификации класса устройства/сети (P1, P15). Реалистичны они только на fast-4G/lab; на слабом 4G
   (который сама спека признаёт в B6/D4) LCP>1.2s практически гарантирован.
2. **Внутренние противоречия** делают бюджеты недостижимыми «как написано»: Lenis активен на desktop
   по умолчанию при INP-бюджете (P4), три разных правила отключения Lenis (P5), preloader-overlay
   перекрывает LCP (P6), Rutube IO-autoplay противоречит D4 (P8), `font-display:swap` без метрик
   ломает CLS (P2), `next/font`+ручной preload дублируются (P3).
3. **Методология измерения** («assert в тестах») нечестна без device/network-профиля и RUM (P15).

Рекомендация родителю: перед сборкой (а) дифференцировать CWV-бюджеты по сети/устройству,
(б) зафиксировать ЕДИНОЕ правило отключения Lenis и сшить его с Framer useScroll (P5/P7),
(в) убрать блокирующий preloader или сделать `pointer-events:none`+0ms fade (P6),
(г) перейти на `next/font` без ручного preload + `adjustFontFallback` (P2/P3),
(д) добавить `preconnect` к origin постера/Rutube (P9),
(е) зафиксировать Lazy-font + dynamic import PDF (P12/P13),
(ж) внедрить Lighthouse CI (Moto G, 4G) + CrUX/RUM field-assert (P15).

До устранения P1–P9 цели «LCP<1.2s / INP<200ms» считать **маркетинговыми обещаниями, а не инженерным контрактом**.
