# 37_MOTIONCRITIC_B_CODE — Критика РЕАЛЬНОГО кода анимации NiloV Catering

**Роль:** независимый КРИТИК КОДА (devil's advocate, занижение).
**Объект:** реальные компоненты анимации сайта (читал исходники, не декларации).
**Дата:** 2026-07-19.
**Стек:** Next.js 16 / React 19 / framer-motion ^12.42.2 / lenis ^1.3.25.

> Ниже — честная, заниженная оценка. Там, где дизайн-доки (`06_TOKENS`, `36_DESIGNCRITIC_*`) ОБЕЩАЮТ reduced-motion-гейты, код их НЕ содержит. Реальность проверена grep'ом по репозиторию: `useReducedMotion` присутствует ровно в **одном** из 8 анимационных файлов.

---

## 1. Таблица 9 осей (0–10, заниженно)

| # | Ось | Балл | Обоснование (код, не слова) |
|---|-----|------|------------------------------|
| 1 | Реальность реализации | **6** | Компоненты реально работают (не заглушки). НО дизайн-доки обещают reduced-motion-дисциплину, которой в коде нет. 1/8 файлов гейчен. |
| 2 | Performance (CWV/INP) | **4** | Lenis держит бесконечный rAF даже в покое и в фоне; marquee крутит rAF ВНЕ viewport; Preloader/Counter делают setState каждый кадр. Бьёт собственный бюджет INP<200мс/LCP<1.2с. |
| 3 | Reduced-motion | **2** | Только `AnimatedSection` вызывает `useReducedMotion()`. Lenis, 2× marquee, parallax, counter, TextReveal, MaskReveal, Preloader — ВСЕ игнорируют. Глобальный CSS медиа-запрос гасит только CSS-анимации, а не Framer-JS. |
| 4 | Интерактивность (hover/focus/tap + клавиатура) | **4** | Magnetic работает на hover (с конфликтом transform), whileTap на tap. НО нет клавиатурного фокус-аффорданса, нет паузы marquee, parallax неинтерактивен, `as="div"`-вариант MagneticButton не фокусируем. |
| 5 | Консистентность | **4** | `AnimatedSection` следует паттерну; остальные 6 — нет. Две разные реализации marquee (2× vs 4× дубль, разный стиль). Нет общих примитивов. |
| 6 | Осязаемость / feedback | **6** | Magnetic + whileTap дают тактильность; TrustMarquee имеет приятный hover-переход цвета. Но reduced-motion-юзеры лишены любого фидбэка. |
| 7 | Stagger / timing | **6** | TextReveal использует `delay + i*0.04` stagger — хорошо. AnimatedSection без внутреннего stagger. Кубические безье приятные. |
| 8 | Бенчмарк (Awwwards-2026 практики) | **4** | Нет глобального `MotionConfig reducedMotion="user"`, нет IO-паузы marquee, нет `visibilitychange`-паузы Lenis, нет no-JS reveal-фолбэка, нет единого rAF-бюджета. Позади award-grade. |
| 9 | Безопасность (утечки / бесконечный RAF / забытые listener) | **5** | **Реальная утечка**: rAF-цикл Lenis не отменяется на destroy/HMR. Marquee — бесконечный rAF без паузы. Click-listener почищен ✓. Counter/Preloader rAF почищен ✓. |

**Средний балл: (6+4+2+4+4+6+6+4+5) / 9 = 4.6 / 10**

---

## 2. Bug-list (строка + проблема + фикс)

### 🔴 КРИТ (реальные баги, не «мнение»)

**B1. Lenis НЕ загашен при prefers-reduced-motion — нарушение собственного C2.**
- Файл: `components/providers/SmoothScrollProvider.tsx:19-59`
- Проблема: эффект всегда делает `new Lenis(...)` и запускает rAF. Нет ни `useReducedMotion()`, ни `if (reduced) { lenis?.destroy(); return; }`. Lenis — НЕ Framer-анимация, глобальный CSS `@media (prefers-reduced-motion)` его НЕ останавливает (он пишет transform через JS). Результат: вестибулярно чувствительные юзеры получают hijacked smooth-scroll + дёрганый INP. Это прямо противоречит `06_TOKENS:168` (C2 «Lenis НЕ является Framer-анимацией … надо явно НЕ инициализировать»).
- Фикс:
```tsx
import { useReducedMotion } from 'framer-motion';
// внутри эффекта:
const prefersReducedMotion = useReducedMotion();
if (prefersReducedMotion) return; // не инициализируем Lenis вообще
```

**B2. Утечка rAF-цикла Lenis на destroy / HMR.**
- Файл: `components/providers/SmoothScrollProvider.tsx:31-36, 54-58`
- Проблема: `raf(time){ lenis.raf(time); requestAnimationFrame(raf); }` запускается, но cleanup вызывает только `lenis.destroy()` и **НЕ `cancelAnimationFrame(rafId)`**. После destroy наш цикл продолжает бесконечно вызывать `lenis.raf()` на уничтоженном инстансе (потенциальный throw + вечный пустой rAF). При HMR/fast-refresh каждый ремоунт создаёт новый Lenis + новый rAF, старый НЕ отменяется → накапливаются параллельные rAF-петли (утечка CPU).
- Фикс:
```tsx
let rafId = 0;
const raf = (time: number) => { rafId = requestAnimationFrame(raf); lenis.raf(time); };
rafId = requestAnimationFrame(raf);
// cleanup:
cancelAnimationFrame(rafId);
lenis.destroy();
```

**B3. Marquee (×2) НЕ загашен при reduced-motion и НЕ имеет паузы (WCAG 2.2.2).**
- Файлы: `nilov-catering/components/sections/TrustMarquee.tsx:16-29`, `components/sections/HeroSection.tsx:162-173`
- Проблема: оба используют Framer `animate={{ x: ['0%','-50%'], repeat: Infinity }}` и НЕ вызывают `useReducedMotion()`. Глобальный CSS `globals.css:298-304` ставит `animation-duration: 0.01ms !important` — но это НЕ останавливает Framer (его `animate` — не CSS-`animation`, а JS/Web Animations). Итог: под reduced-motion бегущая строка крутится вечно. Автодвижущийся контент >5с без паузы = **нарушение WCAG 2.2.2 (Pause/Stop/Hide)**. Паузы по hover/focus тоже нет.
- Фикс:
```tsx
const prefersReducedMotion = useReducedMotion();
// условно не анимировать или поставить repeat: 0
transition={{ duration: 30, repeat: prefersReducedMotion ? 0 : Infinity, ease: 'linear' }}
// + onHoverStart/onHoverEnd или CSS-пауза + aria-label на контейнере
```
Для WCAG 2.2.2 добавить `pause-on-hover`/`focus` и `aria-label` (сейчас контейнер — голый `<motion.div>` без семантики; 4× дублирование читается скринридером 4 раза).

**B4. ParallaxImage НЕ загашен при reduced-motion.**
- Файл: `components/common/ParallaxImage.tsx:23-29`
- Проблема: `useScroll`+`useTransform` (Framer) без `useReducedMotion()`. Под reduced-motion параллакс продолжает двигаться (конфликт с `06_TOKENS:168` C8). Глобальный CSS его не гасит. Параллакс — классический триггер вестибулярной тошноты.
- Фикс: `const rm = useReducedMotion(); const y = useTransform(scrollYProgress,[0,1], rm?['0%','0%']:['-10%','10%']);` (+ убрать willChange-нагрузку, поставить `willChange:'transform'` на motion.div).

**B5. Preloader блокирует interaction и НЕ загашен при reduced-motion.**
- Файл: `components/providers/Preloader.tsx:10-31`
- Проблема: под reduced-motion прелоадер всё равно держит `fixed inset-0 z-[100]` ~1.6с (1400мс progress + 200мс). Противоречит `04_BLOCKS:206-211` («useReducedMotion → мгновенный opacity:1, без анимации»). На mobile/4G это бьёт INP (нельзя скроллить/кликать). Плюс `setProgress` каждый кадр (~84 setState за 1.4с) — лишняя нагрузка на main thread при загрузке.
- Фикс:
```tsx
const prefersReducedMotion = useReducedMotion();
useEffect(() => {
  if (prefersReducedMotion) { setIsLoading(false); return; }
  // ...raf как есть, + cancelAnimationFrame в cleanup (уже есть)
}, []);
```

**B6. AnimatedCounter НЕ загашен при reduced-motion + per-frame setState.**
- Файл: `components/effects/AnimatedCounter.tsx:24-45`
- Проблема: count-up 0→target за 2с без `useReducedMotion()`. Под reduced-motion число всё равно «бежит». Плюс `setCount` каждый кадр (~120 re-render за 2с); на секции со множеством счётчиков штабелируется → INP.
- Фикс: `if (prefersReducedMotion) { setCount(target); return; }` и/или снимать анимацию; рассмотреть throttle кадров.

**B7. TextReveal / MaskReveal НЕ загашены при reduced-motion.**
- Файлы: `components/effects/TextReveal.tsx:13-59` (TextReveal), `:63-86` (MaskReveal)
- Проблема: оба делают `initial={{ y:'100%' }}`→`0` без `useReducedMotion()`. Под reduced-motion слова/строки всё равно въезжают. Нет `mounted`-гуарда (см. B8).
- Фикс: добавить `useReducedMotion()` → при reduce рендерить статично (`y:0`, без motion-обёртки).

### 🟡 СРЕДНИЕ (качество/доступность)

**B8. Нет no-JS / hydration-reveal-фолбэка (контент невидим при сбое JS).**
- Файлы: `AnimatedSection.tsx:44-47`, `TextReveal.tsx`, `AnimatedCounter.tsx:51-52`
- Проблема: начальное `opacity:0` ставится всегда (даже до `mounted`). При ошибке JS / блокировщике скриптов / hydration-fail весь reveal-контент остаётся `opacity:0` навсегда. `06_TOKENS:169` (C7) требует «opacity:0 ТОЛЬКО при `mounted && !reducedMotion`».
- Фикс: ввести `mounted` state (useEffect→true) и показывать контент по умолчанию, пока не смонтировано / reduce.

**B9. MagneticButton: конфликт inline-style transform с Framer transform + нет клавиатуры.**
- Файл: `components/effects/MagneticButton.tsx:31-54`
- Проблема: `handleMouseMove` пишет `ref.current.style.transform = translate(...)` напрямую, а `motion.div` параллельно анимирует `whileTap` (scale) в тот же `style.transform`. Две системы пишут один transform → дёрганье / потеря tap-scale. Нет `useReducedMotion()` (magnetic продолжает тянуть под reduce). Нет клавиатурного фокус-стиля; вариант `as="div"` с `onClick` не фокусируется (нет tabindex/role) → недоступен с клавиатуры (WCAG 2.1.1). При `disabled` обёртка `motion.div` остаётся интерактивной (magnetic + click на `<a>`-варианте не блокируется).
- Фикс: использовать Framer `useMotionValue`+`useSpring` вместо прямой записи style; добавить `useReducedMotion`→отключать magnetic; для `as="div"` ставить `role="button"`+`tabIndex={0}`+`onKeyDown`; уважать `disabled` на обёртке.

**B10. Marquee-контент без семантики / дубль читается скринридером N раз.**
- Файлы: `TrustMarquee.tsx:21`, `HeroSection.tsx:167`
- Проблема: дублирование массива (`[...items, ...items, ...items, ...items]` / ×2) ради бесшовности, но контейнер — `<motion.div>` без `aria-label`, и каждый дубль читается голосом. Специфика (`04_BLOCKS:538`) требовала `<ul aria-label="Наши клиенты">` + `aria-hidden` на дублях.
- Фикс: обернуть в `<ul aria-label=...>`, оригинальный набор видим, дубли — `aria-hidden`.

### 🟢 МИНОРНЫЕ

**B11. Lenis rAF не останавливается при скрытой вкладке.**
- Файл: `SmoothScrollProvider.tsx:31-36` — добавить `document.addEventListener('visibilitychange', ...)` → `lenis.stop()`/`start()` чтобы не тратить CPU в фоне.

**B12. ParallaxImage не ставит `willChange`.**
- Файл: `ParallaxImage.tsx:33` — добавить `style={{ y, willChange: 'transform' }}`.

---

## 3. Что СДЕЛАНО ПРАВИЛЬНО (не трогать)

- `AnimatedSection.tsx:33-39` — **единственный** компонент, корректно гейчащий reduced-motion (возвращает plain `<div>`). Эталон для остальных.
- `Preloader.tsx:30` и `AnimatedCounter.tsx:44` — корректный `cancelAnimationFrame` в cleanup.
- `SmoothScrollProvider.tsx:55` — `document.removeEventListener('click', ...)` почищен.
- `TextReveal.tsx:51` — аккуратный stagger `delay + i*0.04`.
- `TrustMarquee.tsx:24` — приятный hover-переход цвета (тактильность).
- Глобальный `globals.css:298-304` — правильно гасит CSS-анимации/transition (но не Framer-JS, см. B3/B4).

---

## 4. Вердикт

**Средний балл: 4.6 / 10.**

Код **реально работает** и визуально богат (magnetic, stagger-reveal, marquee, parallax, count-up, smooth-scroll) — это не заглушки. Однако проект **системно не выполняет собственную reduced-motion-дисциплину**, которую его же дизайн-доки (`06_TOKENS`, `36_DESIGNCRITIC_*`) помечают как ЗАКРЫТУЮ. На деле `useReducedMotion()` вызван в **1 из 8** анимационных файлов. Lenis, оба marquee, parallax, счётчик, text-reveal и прелоадер продолжают анимировать под `prefers-reduced-motion: reduce`, потому что глобальный CSS медиа-запрос гасит только CSS-анимации, а не Framer-JS. Это **доказанное WCAG-нарушение** (2.2.2 Pause/Stop/Hide + вестибулярный риск) и прямой конфликт с заявленным бюджетом INP<200мс.

Плюс **реальная утечка**: rAF-цикл Lenis не отменяется на destroy/HMR (`SmoothScrollProvider`), и marquee крутит rAF вне viewport/в фоне.

**Главный честный вывод:** дизайн-критики (36_DESIGNCRITIC_C) выставили Motion=8, опираясь на ДОКУМЕНТЫ (`01:71`, `06_TOKENS:168`), где гейты «задокументированы». При проверке КОДА эти гейты отсутствуют. Реальный кодовый балл Motion заслуженно ниже — **4.6**, и единственный путь поднять его: добавить `useReducedMotion()` во все 7 компонентов + глобальный `MotionConfig reducedMotion="user"` как страховку, починить утечку rAF Lenis, добавить IO/visibility-паузы marquee/Lenis и no-JS reveal-фолбэк.

**Быстрый план поднятия балла (приоритет):**
1. `MotionConfig reducedMotion="user"` в корне (закроет 80% Framer-гейтов сразу) — B3/B4/B6/B7.
2. Lenis-gate + cancelAnimationFrame(rafId) + visibilitychange — B1/B2/B11.
3. Marquee: pause-on-hover/focus + aria-label + reduced-motion — B3/B10.
4. Preloader reduced-motion skip — B5.
5. MagneticButton: useMotionValue/useSpring + keyboard + reduced-motion — B9.
6. no-JS reveal-фолбэк (mounted) — B8.
