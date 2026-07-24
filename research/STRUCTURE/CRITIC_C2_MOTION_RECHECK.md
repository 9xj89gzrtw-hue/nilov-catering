# CRITIC — Ось C2 (Motion / Media / РФ-стек) — RECHECK по КОДУ

**Роль:** независимый критик (devil's advocate, занижение; иная модель, без самооценки).
**Дата:** 2026-07-20. **Объект:** `STRUCTURE/*.md` (спека) **+ фактический код** (`components/**`, `public/images/**`, `app/**`).
**Метод:** прочитаны назначенные файлы (17, 26, 27, 09/10/11, 01, 04, 37_A/B/C, W7_C2, 29_CMS_CRITIC) + полный grep по репо + чтение реальных `.tsx`/`globals.css`/SVG-плейсхолдеров. Web-фактчек РФ выполнен.
**Отличие от W7_C2:** тот критик оценивал СПЕКУ и нашёл union `'vimeo'`/остатки в `02_IA`. С тех пор код переписан (Волна 16, B-MOTION): union очищен, `useReducedMotion` добавлен в 8/8 компонентов, Lenis-утечка устранена. Настоящий прогон сверяет **актуальный код** — и находит новый класс багов (SMIL-плейсхолдеры).

---

## 1. RF-факты (подтверждены web_search, 2026)
| Утверждение | Статус | Источник |
|---|---|---|
| Instagram **полностью заблокирован в РФ** | ✅ | Полная блокировка WhatsApp/FB/Instagram с 12.02.2026 (GlobalDatingInsights, подтверждено Песковым); Meta признана экстремистской (известия.ру, 2025). |
| Vimeo **ушёл из РФ** (не принимает RU-юзеров, нет RU-поддержки/языка) | ✅ | vc.ru «Vimeo уходит из России»; ru.wikipedia Vimeo (с 14.03.2022 приостановка рег. для РФ). |
| Rutube = ведущий РФ-видеохостинг (аналог YouTube) | ✅ | rutube.ru (офиц. сайт), RuStore 20М+ установок. |
| VK доступен в РФ, первичен | ✅ | `04:138`. |

---

## 2. Оценка оси C2 по 5 пунктам задания (1–10, заниженно)

| # | Пункт задания | Балл | Суть |
|---|---|---|---|
| 1 | Parallax ТОЛЬКО 1 hero-strip, НЕ per-image (CLS/LCP) | **7** | КОД: `ParallaxImage` определён ×2, но **нигде не импортируется** → per-image parallax в галерее НЕ реализован (✓). Hero использует `useScroll` bgY/bgScale — это легальный «1 hero-strip». НО спека `04:731-732` ВСЁ ЕЩЁ предписывает per-row parallax (`data-speed` по рядам) — противоречие `11:11`/`01:86`. `04:1807` уже исправлено (parallax на video-плитке ЗАПРЕЩЁН) — плюс. |
| 2 | Vimeo ЗАПРЕЩЁН → Rutube/self-host (grep Vimeo=баг) | **8** | КОД: `grep 'vimeo'` по `*.ts/*.tsx` = **0 совпадений**; union `'rutube'\|'selfhost'` (чист). ✅ СПЕКА: `04:322` очищен (W7 B.2 РЕШЁН), `02_IA:143-147` теперь Rutube (W7 B.1 РЕШЁН). РЕЗИДУУМ: `04:2008` «vimeo — только если доступен у заказчика» (противоречит бану); `26:8`, `29_CMS_CRITIC:30,62` — остатки Vimeo-ссылок/id. |
| 3 | VK-primary эмбед, Instagram = ссылка (РФ-блок) | **6** | СПЕКА: `04:138` корректно (VK-primary embed, IG=ссылка). НО `04:866-867` ВСЁ ЕЩЁ: «`LiveInstagramFeed` … Instagram — **ОСНОВНОЙ**», блок назван `LiveInstagramFeed`. КОД: ни VK-, ни IG-эмбеда НЕТ вообще — `Footer.tsx:6-9` это просто `href="#"` ссылки; компонент `LiveVKFeed`/iframe отсутствует (grep). Т.е. «VK-primary visible embed» не собран. |
| 4 | reduced-motion гейт на Lenis + autoplay + SMIL-плейсхолдеры | **5** | Lenis ✅ (ранний return + `MotionConfig reducedMotion="user"`). Hero autoplay ✅ (goto poster при reduce). НО: (a) `PhilosophySection.tsx:21-30` и `ProcessTimeline.tsx:42-51` — `<video autoPlay>` **без гейта** (всегда крутятся под reduce); (b) **СМИЛ-плейсхолдеры (60+ SVG, 222 SMIL-анимации) НЕ гасятся** — SMIL не попадает под `globals.css` `@media` (там только CSS `animation`/`transition`) и не под Framer. Под reduce плейсхолдеры «дышат» вечно. |
| 5 | SVG-плейсхолдеры анимированы корректно и не бьют CLS | **6** | Анимации — ATTRIBUTE-level (opacity/r/translate/rotate **внутри** SVG), НЕ меняют размер SVG/соседний DOM → **CLS≈0** ✅. Потребители резервируют место (`fill`+`aspect-*` в `GalleryGrid`/`MenuPageClient`, `h-screen`+absolute в Hero). НО: (a) под reduced-motion НЕ гасятся (см. п.4); (b) **функциональный баг** — Hero «video» `HeroSection.tsx:57` указывает `src="/images/hero/catering-hero.svg" type="video/webm"` → SVG используется как webm-источник; реальное видео НЕ играет, стоит анимированный SVG-плейсхолдер (placeholder не заменён на боевое видео). |

**Итоговая ось C2 = (7+8+6+5+6)/5 ≈ 6.4 → 6 / 10. Вердикт: 🔴 REWORK.**

---

## 3. BUG-LIST (file:line, severity)

### 🔴 КРИТ (ломают РФ-функциональность / a11y reduced-motion)

**D1 — SMIL-плейсхолдеры НЕ загашены при prefers-reduced-motion (222 анимации, 60+ файлов).**
- Файлы: `public/images/hero/catering-hero.svg:9-10,14,21-24`; `public/images/gallery/show-station.svg:9-10,14,18`; `public/images/gallery/wedding-banquet.svg:9-10,14,18`; `public/images/gallery/banket.svg`, `kids.svg`; `public/images/menu/sezonnye/se{1..7}.svg`, `salaty/s*`, `deserty/d*`, `bbq/b*`, `goryachee/h*`, `kanape/k9`; `public/images/team/*`; `public/images/testimonials/avatar*`.
- Суть: `<animate … repeatCount="indefinite">` / `<animateTransform>`. SMIL-анимации игнорируют CSS `@media (prefers-reduced-motion)` (`globals.css:298-305` гасит только CSS-анимации) и `MotionConfig reducedMotion="user"` (Framer, не SVG-SMIL). Результат: вестибулярно чувствительные юзеры видят вечно пульсирующие/плывущие плейсхолдеры. **Новый класс бага** — предыдущие code-критики (37_B/C) смотрели только на Framer/JS и его пропустили.
- Фикс: добавить в `globals.css` `svg * { animation: none !important; }` НЕ поможет (SMIL ≠ CSS). Реально: (а) удалить SMIL из плейсхолдеров (сделать статичными, т.к. это временные заглушки) ИЛИ (б) обернуть в `<g>` и гасить через JS-скрипт по `matchMedia('(prefers-reduced-motion: reduce)')` → `svg.pauseAnimations()` / `setCurrentTime(0)`. Рекомендую (а) — плейсхолдеры не должны анимироваться вовсе.

**D2 — Фоновые `<video autoPlay>` без reduced-motion гейта.**
- `components/sections/PhilosophySection.tsx:21-30` — `<video autoPlay muted loop … src="/images/hero/catering-hero.svg">` (сам `src` — SVG, т.е. не играет, но декларация/намерение autoplay есть).
- `components/sections/ProcessTimeline.tsx:42-51` — то же.
- Суть: нарушает контракт `17:170`/`27:39` (reduced-motion → НЕ autoplay). Lenis/marquee/hero загашены, а эти — нет.
- Фикс: как в Hero — `prefersReducedMotion ? staticImage : <video autoPlay>`; либо `video` с `ref` + `play()/pause()` по `useReducedMotion()`.

**C1 — Спека: Instagram ВСЁ ЕЩЁ «ОСНОВНОЙ» (РФ-блок → пустая секция).**
- `04_BLOCKS.md:866-867` — «`LiveInstagramFeed` | UGC … (Instagram — **ОСНОВНОЙ**, КЕПТ; VK fallback в РФ)»; строка 11 таблицы «`LiveInstagramFeed` … VK — ПЕРВИЧНЫЙ». Прямое противоречие `04:138` (VK-primary) и РФ-реальности (IG заблокирован 12.02.2026).
- Фикс: привести `04:866-867` к `04:138`; переименовать блок `LiveInstagramFeed`→`LiveVKFeed`/`LiveSocialFeed` (как W7 C.2).

### 🟡 СРЕД (консистентность / реализация)

**B1 — Спека ре-разрешает vimeo (противоречит бану).**
- `04_BLOCKS.md:2008` — «`VideoProvider` (Rutube по умолч., …; **vimeo — только если доступен у заказчика**)». Union чист (`04:322`), но проза возвращает banned-сервис в достижимый путь.
- Фикс: убрать «vimeo — только если доступен»; оставить только Rutube/self-host.

**A1 — Спека per-row parallax (CLS/LCP-ловушка) не устранена.**
- `04_BLOCKS.md:731-732` — «Parallax ЗАФИКСИРОВАН через Framer useScroll+useTransform … разные `data-speed` по рядам». Против `11_GALLERY_TEASER:11,45` и `01_VISUAL_DNA:86` (parallax только 1 hero-strip). В коде пока не реализовано (см. п.1), но спека готовит баг.
- Фикс: привести `04:731-732` к `11`/`01:86` (статичный grid + fade-up; parallax только hero-strip).

**B2 — Остатки Vimeo в таске/CMS-спеце.**
- `26_VIDEO_ARCHIVE_TASK.md:8` — «База: … Vimeo Showcase» (residue). `29_CMS_CRITIC.md:30,62` — «Видео = ручной Vimeo-id», «вставляет Vimeo-ссылку → парсер». Устарело vs `04:91` (Rutube/self-host `videoUrl`).
- Фикс: `26:8` убрать Vimeo; `29_CMS:62` → «Rutube-ссылка».

**C2 — VK-primary эмбед не собран в коде.**
- `components/layout/Footer.tsx:6-9` — VK/IG/Telegram = `href="#"`. Нет `LiveVKFeed`/`iframe`/`oembed` ни в одном `.tsx` (grep `vk.com|iframe|oembed` = только Footer-ссылки). Спец требует «VK-primary visible embed в РФ», но на деле — просто ссылка.
- Фикс: реализовать `LiveVKFeed` (виджет VK или oembed) как primary; IG оставить ссылкой.

### 🟢 ФУНКЦИОНАЛЬНЫЙ (не CLS, но баг)

**F1 — Hero «video» указывает на .svg как webm-источник.**
- `components/sections/HeroSection.tsx:57` — `<source src="/images/hero/catering-hero.svg" type="video/webm" />`. `catering-hero.svg` — SVG-картинка, не webm. Браузер не проигрывает → виден только `poster` (тот же анимированный SVG). Итог: «киношный hero-видео» = анимированный SVG-плейсхолдер, боевое видео не подключено.
- Фикс: заменить `src` на реальный Rutube-facade/self-host MP4; плейсхолдер-SVG оставить только в `poster`.

---

## 4. Что УЖЕ ИСПРАВЛЕНО (не трогать)
- `04_BLOCKS.md:322` union `'rutube'|'selfhost'` — vimeo **удалён** (W7 B.2 РЕШЁН).
- `02_IA.md:143-147` — источник теперь Rutube (W7 B.1 РЕШЁН).
- `components/providers/SmoothScrollProvider.tsx:22-28,82` — ранний return при reduced-motion + `MotionConfig reducedMotion="user"`; `cancelAnimationFrame` в cleanup (W7 утечка РЕШЁНА).
- 8/8 Framer-компонентов вызывают `useReducedMotion` (37_B закрыт для JS-анимаций): `AnimatedCounter`, `TextReveal`, `MagneticButton`, `common/ParallaxImage`, `LiveCard`, `AnimatedSection`, `Preloader`, `HeroSection`.
- `HeroSection.tsx:16-23` — autoplay video загашен при reduced-motion (→ static img).
- `04:1807` — parallax на video-плитке ЗАПРЕЩЁН (согласно `17` §8).
- `04:138` — VK-primary / IG-ссылка (верно для РФ).

---

## 5. Итоговый вердикт
🔴 **REWORK — 6 / 10.** Костяк оси сильный и заметно продвинулся с W7 (vimeo из union вычищен, Lenis/marquee/hero загашены, 8/8 Framer-компонентов уважают reduced-motion). **НО** остались 3 критич. дефекта, каждый по предмету задания:
1. **D1** — SMIL-плейсхолдеры (60+ SVG, 222 анимации) НЕ гасятся при reduced-motion (новый класс бага, мимо 37_B/C).
2. **D2/C3** — фоновые `<video autoPlay>` в Philosophy/Process без гейта; VK-primary эмбед вообще не собран (оба — `href="#"`).
3. **C1/B1/A1** — спец-резидуум: `04:866-867` Instagram «ОСНОВНОЙ», `04:2008` ре-разрешает vimeo, `04:731-732` per-row parallax.

**Действие для родителя (до PASS ≥8):** закрыть D1 (убрать SMIL из плейсхолдеров или `pauseAnimations()`), D2 (гашение фоновых video), C1/C2 (VK-embed + переименование блока), B1/A1 (подчистить спеку). F1 — заменить hero-video на реальный Rutube/MP4. Perf-доказательств (Lighthouse/axe) по-прежнему нет (сайт не замерен) → балл за perf-оси не может быть выше 7 без прогона.
