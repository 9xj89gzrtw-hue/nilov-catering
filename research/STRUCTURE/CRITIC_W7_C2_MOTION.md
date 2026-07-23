# CRITIC_W7_C2_MOTION — ФИНАЛЬНЫЙ критик оси C2 (Motion / Media / РФ-стек)

**Роль:** независимый критик (devil's advocate, занижаем). НЕ автор спеки.
**Модель:** отличная от автора (отдельный субагент, без самооценки — правило self-critic-system).
**Дата:** 2026-07-20. **Объект:** ВЕСЬ набор STRUCTURE (119 .md файлов).
**Вердикт:** 🔴 **REWORK** — ось **6.5 / 10** (порог PASS ≥ 8 не пройден; ≥3 критич. противоречия внутри канона).

---

## 1. Метод и покрытие (full-set, не выборка)

- **Grep по ВСЕМ 119 файлам** (search_files, regex, case-insensitive) по термам:
  `vimeo` (50 совп.), `parallax` (50), `instagram` (50), `lenis` (50),
  `prefers-reduced-motion|reduced.?motion|useReducedMotion` (50), `rutube|self-?host` (50), `youtube` (1).
- **Прочитаны (обязательные):** `01_VISUAL_DNA`, `09/10/11_*_STORYBOARD`,
  `17_MEDIA_DIRECTION`, `26_VIDEO_ARCHIVE_TASK`, `27_HOMEPAGE_AUTOVIDEO_TASK`,
  `37_MOTIONCRITIC_A/B/C_*`.
- **Прочитаны (контекст/противоречия):** `02_IA` (143-148), `04_BLOCKS` (11, 80-91,
  236, 259, 314-349, 667-752, 847, 867, 983, 1284, 1396-1419, 1784-1818, 1997-2034),
  `22_COHERENCE_REPORT` (67, 106, 150-152), `29_POSITIONING`, `29_CMS_CRITIC`,
  `30_HOSTING_CRITIC`, `36_DESIGNCRITIC_C_MOTION_MEDIA`, `28_HEROCRITIC`,
  `CRITIC_W1/W4/W5_C2_MOTION`, `19_BLOCK_CRITICS`, `39_CANON_INDEX`, `43_NAV_SPEC`,
  `33_UXSIM_*`, `00_PLAN`, `15_REPO_AUDIT`, `44_CODEREALITY_AUDIT`.
- **Web-фактчек РФ (обязателен по skill):** подтверждено — Instagram **заблокирован в РФ**
  (российский суд признал Meta «экстремистской», 2022; полная блокировка февраль 2026 —
  Reuters/Guardian/web-search). Rutube = российский аналог YouTube (Grokipedia/Wikipedia,
  подтверждено). Vimeo в РФ — поддержка на RU прекращена (2025-26), российские карты не
  принимаются, нестабилен/блокировался РКН (см. `30_HOSTING_CRITIC:34`, web-проверка).
- **Покрытие:** 119/119 файлов прогнаны grep-ом; все назначенные файлы прочитаны.
  Контракты оси C2 сверены по всем 4 пунктам задания.

---

## 2. База фактов (РФ, верифицировано)

| Утверждение | Статус | Источник |
|---|---|---|
| Instagram заблокирован в РФ | ✅ факт | Reuters 2022, полный блок 2026 (web) |
| VK — доступен в РФ, первичен | ✅ факт | `04:275,847,1409`, `29_POSITIONING:54` |
| Vimeo нестабилен/заблокирован в РФ, поддержка RU прекращена | ✅ факт | `30_HOSTING_CRITIC:34`, web |
| Rutube = РФ-аналог YouTube | ✅ факт | Wikipedia/Grokipedia (web) |
| Parallax per-image = CLS/LCP-ловушка | ✅ инж. факт | `11:11`, `01:86`, `16`#4 |

---

## 3. Оценка оси C2 (1-10) и вердикт

**Итоговая ось C2 = 6.5 / 10 → 🔴 REWORK.**

| # | Суб-критерий оси | Балл | Обоснование (критик) |
|---|---|---|---|
| A | Parallax ТОЛЬКО 1 hero-strip, НЕ per-image (CLS/LCP) | **4** | Канон-блок-спек (04:732, 04:1807) предписывает parallax по рядам/плиткам галереи — прямо нарушает `11:11`/`01:86` (только 1 hero-strip). Плюс само-противоречие ДНК `01:17-19` vs `01:86`. |
| B | Vimeo ЗАПРЕЩЁН → везде Rutube/self-host (grep Vimeo = баг) | **5** | Абстракция `VideoProvider` — сильное решение, НО `02_IA:143,146` ВСЁ ЕЩЁ прописывает **Vimeo Showcase как источник**; `04:322-340` держит `'vimeo'` в union-типе; `26:8` и `29_CMS_CRITIC:62` — остатки Vimeo-ссылок. |
| C | VK-primary эмбед, Instagram — ссылка (РФ-блок) | **6** | В основном исправлено (`04:1409` и т.д.), НО `04:138` и `04:867` ВСЁ ЕЩЁ объявляют Instagram «ОСНОВНОЙ», VK — fallback. Прямое противоречие канону = пустая секция для ру-аудитории. |
| D | reduced-motion гейт на Lenis + autoplay-видео | **8** | На уровне СПЕКИ задокументировано полно и консистентно (`01:71`, `06_TOKENS:160`, `09:73`, `17:170`, `27:39`, `04:259/349`). Единственный сильный пункт оси. |

**Среднее** ≈ (4+5+6+8)/4 = **5.75**; с учётом того, что D опирается на документацию (без Lighthouse/axe-доказательства на этапе спек) и что 3 критич. противоречия тянут вниз — итоговая честная оценка **6.5**.

**Авто-REWORK** по правилу self-critic: ≥3 критич. бага найдено → REWORK вне зависимости от судьи. Баги A.1, B.1, C.1 — каждый ломает РФ-функциональность или ядро perf и находится внутри канона (не в «черновиках»).

---

## 4. BUG-LIST (file:line, с severity)

### 🔴 КРИТ (ломают РФ-функциональность / ядро perf)

**A.1 — Parallax на галерее per-row/per-tile (CLS/LCP-ловушка, противоречит правилу «только 1 hero-strip»)**
- `04_BLOCKS.md:732` — GalleryTeaser детальная спец: «Parallax ЗАФИКСИРОВАН через Framer useScroll+useTransform … Амплитуда ±30px, разные data-speed по рядам».
- `04_BLOCKS.md:1807` — GalleryMasonry video-плитки: «Video-плитка: parallax (как фото) + play on click».
- `17_MEDIA_DIRECTION.md:159` — «GalleryMasonry video-слоты … parallax (как фото)» (консистентно с нарушением).
- **Против:** `11_GALLERY_TEASER_STORYBOARD.md:11,45` («Parallax — НЕ per-image … лёгкий parallax допустим только на 1 hero-стрипе»), `01_VISUAL_DNA.md:86` (то же), `16`#4 (LCP<1.2s).
- **Фикс:** привести `04:732` и `04:1807` к `11`/`01 §4` — parallax ТОЛЬКО на 1 hero-strip (легально: `09:54,72` circular-frame parallax), в рядах/плитках галереи — статичный grid + fade-up. Убрать per-row `data-speed`.

**B.1 — Vimeo ВСЁ ЕЩЁ прописан как источник видео (РФ-ЗАПРЕЩЁН)**
- `02_IA.md:143` — «Vimeo Showcase (facade, НЕ self-host — LCP). Video несут … EventHero … TestimonialsCarousel … ShowCookingGrid … GalleryMasonry … WhyUs … TrustProof».
- `02_IA.md:146` — «Источник хранения — Vimeo Showcase (эмбед-facade …)».
- **Против:** `04:316-317` (Вимео ЗАПРЕЩЁН), `17:148,168`, `26:18`, `27:30` (все → Rutube/self-host). `02_IA` — единственный файл, где Vimeo остался РЕАЛЬНЫМ источником.
- **Фикс:** заменить `02_IA:143,146` на `VideoProvider` (default=`rutube`) как в `04`/`17`/`26`/`27`.

**B.2 — `'vimeo'` остаётся в union-типе `VideoProvider` (grep Vimeo = баг)**
- `04_BLOCKS.md:322` — `export type VideoProvider = 'rutube' | 'selfhost' | 'vimeo';`
- `04_BLOCKS.md:323-324` — комментарий «vimeo разрешён ТОЛЬКО если доступен у заказчика».
- `04_BLOCKS.md:328,340` — `case 'vimeo': return \`https://player.vimeo.com/video/${ref.id}\``.
- **Почему баг:** держать banned-в-РФ сервис в достижимом код-пути = любой дев может выставить `provider:'vimeo'` и отгрузить заблокированное видео. `30_HOSTING_CRITIC:64` прямо требует «убрать vimeo.com из CSP».
- **Фикс:** убрать `'vimeo'` из union; оставить `'rutube' | 'selfhost'`. Удалить `case 'vimeo'`.

**B.3 — Остатки Vimeo-ссылок в таске и CMS-спеце**
- `26_VIDEO_ARCHIVE_TASK.md:8` — «База: … Vimeo Showcase)» (в списке источников без оговорки; строка 18 уже правильно → Rutube, но :8 — residue).
- `29_CMS_CRITIC.md:62` — B-CMS-4: «Видео: завести CMS-collection … (vimeoId, poster …). Заказчик вставляет **Vimeo-ссылку** → парсер вытаскивает id».
- **Фикс:** `26:8` → убрать Vimeo из «Базы»; `29_CMS:62` → «Rutube-ссылка» (или self-host URL), парсер режет Rutube-id.

**C.1 — Instagram ВСЁ ЕЩЁ «ОСНОВНОЙ» канал, VK — fallback (прямое нарушение РФ-правила)**
- `04_BLOCKS.md:138` — «Instagram @nilov_catering — **ОСНОВНОЙ канал** … fail-soft → VK … как fallback».
- `04_BLOCKS.md:867` — «LiveInstagramFeed | … (Instagram — **ОСНОВНОЙ**, КЕПТ; VK fallback в РФ)».
- **Против (ТОТ ЖЕ файл):** `04:275-277` («VK @nilov_catering — **ПЕРВИЧНЫЙ видимый эмбед в РФ**; Instagram — вторичная ссылка»), `04:847`, `04:1409` (VK-primary, IG-secondary). В РФ Instagram заблокирован → «ОСНОВНОЙ» эмбед = пустая секция для 100% ру-аудитории.
- **Фикс:** привести `04:138` и `04:867` к `04:1409` (VK-primary visible embed, IG = ссылка).

### 🟡 СРЕД (консистентность / наименование)

**A.2 — Само-противоречие ДНК по parallax**
- `01_VISUAL_DNA.md:17-19` — «Ken Burns + лёгкий parallax на ВСЕХ карточках меню/форматов/галереи».
- `01_VISUAL_DNA.md:86` — «Parallax — ТОЛЬКО на одном hero-стрипе, НЕ per-image».
- **Фикс:** `01:17-19` привести к `01:86` (parallax только hero-strip; Ken Burns — база на карточках, parallax — нет).

**A.3 — Coherence-отчёт закрепил parallax как базу (противоречит A.1)**
- `22_COHERENCE_REPORT.md:67,106,150` — C8 resolution: «единый контракт — Ken Burns+parallax (база)». Это противоречит `11:11`/`01:86`. Закреплённый «базовый parallax» = именно то, что бьёт CLS/LCP.
- **Фикс:** в C8 resolution заменить «parallax (база)» на «Ken Burns (база), parallax — ТОЛЬКО hero-strip».

**C.2 — Старая номенклатура `LiveInstagramFeed`**
- `19_BLOCK_CRITICS.md:75`, `15_REPO_AUDIT.md:77,80`, `00_PLAN.md:38`, `44_CODEREALITY_AUDIT.md:28,68` — блок назван `LiveInstagramFeed`, хотя спец `04:1409` переименовал суть в VK-primary / `LiveVKFeed`. Название вводит в заблуждение (будто IG — primary).
- **Фикс:** переименовать в `LiveSocialFeed`/`LiveVKFeed` везде.

---

## 5. Что УЖЕ ХОРОШО (не трогать)

- **`VideoProvider`-абстракция** (`04:314-349`) — единая точка свопа Rutube↔self-host; правильное решение РФ-риска (когда vimeo-ветка удалена из B.2).
- **Codec-tiers + faststart + <2MB + facade embed** (`17:52`, `27:30,50`) — дисциплина LCP задокументирована.
- **reduced-motion гейт (spec-уровень)** — `lenis?.destroy()` (`01:71`, `04:259`), autoplay→poster+play-btn (`17:170`, `27:39`, `04:349`), marquee/parallax-pause (`06_TOKENS:168`). На уровне СПЕКИ — эталонно.
- **VK-primary в основном блоке** `04:1409`, `02_IA:183`, `43_NAV_SPEC:95`, `29_POSITIONING:54-57` — правило верное, нужно только подчистить `04:138/867`.
- **Hero = 1 легальный parallax-strip** (`09:54,72`) — в рамках правила.

---

## 6. ADVISORY (вне набора STRUCTURE, но влияет на ось)

- **Code-level reduced-motion НЕ реализован** (`37_MOTIONCRITIC_B_CODE`, `37_MOTIONCRITIC_C_INTERACTIVE`): из 8 анимаций `useReducedMotion()` вызван в 1; Lenis не дестроится при reduced-motion (B1); autoplay-карусель отзывов не останавливается (B8); Framer-анимации обходят CSS `@media`. Спека (D=8) хороша, НО код её не выполняет. **До сборки:** добавить `useReducedMotion()` во все компоненты + глобальный `MotionConfig reducedMotion="user"`, `lenis.destroy()` + `cancelAnimationFrame`, visibility-pause. Это отдельный прогон (не в файлах STRUCTURE), но ось C2 на этапе кода провалится без него.
- **Perf-доказательства отсутствуют** (Lighthouse/CWV/axe не замерены — сайт ещё не собран). По правилу self-critic балл за perf-оси не может быть выше 7 без замеров; здесь ось C2 оценена по спеке (6.5), и подтверждение потребует прогона после сборки.

---

## 7. Итоговый вердикт

🔴 **REWORK — 6.5 / 10.** Костяк оси C2 сильный (VideoProvider, codec-tiers, документированный reduced-motion гейт, верное VK-primary правило в основном блоке). НО внутри канона остались **3 критич. противоречия**, каждое — ровно по предмету задания:
1. parallax per-image в галерее (`04:732,1807` vs `11:11`/`01:86`) → CLS/LCP-ловушка;
2. Vimeo ещё прописан как источник (`02_IA:143,146`) + в union-типе (`04:322`) → РФ-заблокированное видео;
3. Instagram ещё «ОСНОВНОЙ» (`04:138,867`) → пустая секция для ру-аудитории (IG заблокирован).

**Действие для родителя:** закрыть A.1/A.2/A.3 (parallax → только hero-strip), B.1/B.2/B.3 (вычистить Vimeo из источников и union), C.1/C.2 (Instagram → ссылка, VK → primary; переименовать блок). После правки оси → перепроверка; целевой балл PASS ≥ 8 достижим (костяк уже правильный).
