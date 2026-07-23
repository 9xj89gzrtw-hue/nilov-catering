# 27 — HOMEPAGE AUTOVIDEO TASK (автозапуск видео мероприятий при скролле)

**Датировано:** 2026-07-19. **Источник требования:** заказчик — «хочет, чтобы какие-то видео из его
мероприятий прям сразу на главной запускались». **Уточнение пользователя:** не обязательно
hero — может быть чуть ниже, при скролле вниз. Смотреть лучшие реализации.

**База:** `04_BLOCKS.md` блок 1 `HeroSection` (poster+LCP) + `17_MEDIA_DIRECTION.md` (Drinkit,
§8) + `04` блок 27 `EventsRecap` (архив Rutube/self-host видео) + блок 14 `EventHero` (video-recap).

**ВЕБ-ОБОСНОВАНИЕ (2026, подтверждено поиском) — выбранный паттерн:**
- **IntersectionObserver** (MDN 2025, zencopa 2025, Ray Silvers 2026): play когда секция
  в зоне видимости (`threshold` ~0.5), **pause когда вышла** — экономит CPU/батарею, не шумит.
- **Scroll-triggered video storytelling** (renealmanza, Awwwards scrolling): секция-«история»
  ниже фолда, видео стартует при доскролле = лучший UX, чем hero-autoplay (не бьёт LCP).
- Hero остаётся poster/изображение (LCP-безопасно), видео — в выделенной секции ниже.

## ЧТО СДЕЛАТЬ (после возврата финальных критиков — НЕ параллельно с ними, конфликт 04)

Исполнитель добавляет **новый блок `HomeVideoShowcase`** (между TrustBar и GalleryTeaser,
сразу после Hero-зоны, НО ниже первого экрана) + дорабатывает поведение:

1. **Секция `HomeVideoShowcase` (новый блок в `04`):**
   - Полноширинная секция «Живые моменты наших событий» с 1–3 клипами мероприятий
     (выборка из `EventsRecap`, таксономия по типу: свадьба/корп/частное).
   - Автозапуск **при скролле в зону** (IntersectionObserver, `threshold: 0.5`):
     `video.play()` когда ≥50% в вьюпорте; `video.pause()` когда вышла.
   - Атрибуты: `muted playsinline loop` (autoplay-атрибут НЕ ставим — запуск JS-ом по IO).
   - `poster` (LQIP ≤10КБ → фейд к full) показывается ДО входа в зону (LCP-безопасно).

2. **Источник видео:** Rutube facade-эмбед (как БЛОК 27) ИЛИ self-host MP4 (Vimeo ЗАПРЕЩЁН в РФ — `04_BLOCKS:317`). Или лёгкий
   self-host <2МБ, если facade-задержка >LCP. Приоритет facade.

3. **Perf (LCP<1.2s, CLS<0.1, INP<200ms):**
   - LCP-элемент главной = Hero-poster (блок 1), НЕ эта секция.
   - Видео `preload="none"` до входа в зону; загрузка по IO (requestIdleCallback после paint).
   - `aspect-ratio` фикс → CLS≈0. Off-thread decode.

4. **a11y / reduced-motion:**
   - `prefers-reduced-motion` → НЕ автозапуск, показ poster + play-btn (ручной старт).
   - `aria-hidden` на фоновое видео; H-заголовок секции доступен скринридеру.
   - Кнопка play/pause для пользователя (не только IO).

5. **Hero (блок 1) — Drinkit-стиль «живые фото» (обновлено по исследованиям):** hero =
   **subtle loop / Ken Burns «живое фото» реального события** (НЕ агрессивный видео-ролик,
   НЕ статичный poster). Обоснование веб (2026): createtoday 32 catering sites — near-white
   доминирует (еда честно читается); webcitz — топы 2026 = «immersive food photography»;
   sitesplaced — cinematic **looping video backgrounds** (loop, не полный ролик); Drinkit
   (hsedesign/behance) — чистый минимализм, продукт в центре, «живые» кадры. Это и есть наш
   DNA (`01_VISUAL_DNA` §4). Технич.: muted, seamless loop, poster = LCP-элемент (webp/AVIF
   ≤120КБ, LQIP ≤8КБ, мгновенно), видео `preload="none"`/facade грузится после paint → LCP<1.2s
   не страдает; видео НЕ конкурирует с CTA (фоновое, `aria-hidden`); `prefers-reduced-motion` →
   статичный poster. Решение исполнителя: hero = Drinkit-loop (real event footage), если
   LCP достижим; иначе poster + click-to-play.

6. **Связь с архивом:** клипы = выборка из `EventsRecap` (единый источник, те же Rutube-id / self-host).

**Критерий готовности:** на главной ниже фолда есть секция, которая автозапускает реальное
видео мероприятия при скролле (IO, muted/playsinline/loop, pause при выходе), LCP<1.2s,
reduced-motion→poster+play-btn. Потом — прогон Critic (perf/factcheck/a11y) на блок.

**Синхрон:** запускать исполнителя ТОЛЬКО после возврата финальных критиков `cd937ff6`,
чтобы не конфликтовать с их чтением `04`.
