# 28 — HEROCRITIC: Drinkit «живое фото» vs Poster vs Full-video (блок 1 HeroSection)

**Роль:** HeroCritic (независимый, скептичный, не автор). **Дата:** 2026-07-19.
**База:** `04_BLOCKS` блок 1 · `27_HOMEPAGE_AUTOVIDEO_TASK` · `01_VISUAL_DNA` §4 · `17_MEDIA_DIRECTION` §3/§8.
**Веб (2026, подтверждено):** mintec «Hero Video Dilemma» (+3.2s LCP до оптимизации, 1.8s после), web.dev lazy-loading-video, MDN `<video>`, wppoland video-background perf, createtoday/webcitz/sitesplaced catering-hero бенчмарки, react-poster-video (poster-first autoplay).

Ось оценки: **(1) конверсия/доверие · (2) LCP/perf · (3) a11y/доступность.**
Варианты для кейтеринга NiloV:
- **А** — статичный poster (изображение реального события).
- **Б** — full-video autoplay (агрессивный фоновый ролик банкета, `04` блок 1 изначально «видео-loop»).
- **В** — **Drinkit-стиль «живое фото»**: subtle loop / Ken Burns реального события, muted, poster = LCP-элемент, видео `preload=none` грузится после paint (`27` п.5).

---

## БАЛЛЫ (0–10, заниженно)

| Вариант | (1) Конверсия/доверие | (2) LCP/perf | (3) a11y | **ИТОГ** |
|---|---|---|---|---|
| **А** Poster | 7 | 10 | 10 | **8.5** |
| **Б** Full-video | 6 | 4 | 6 | **5.0** ❌ |
| **В** Living-photo | 8 | 9 | 9 | **8.5 → 9.0** ✅ |

### Разбор (почему занижено)
- **А (8.5):** LCP/а11у идеальны (одна картинка, alt, reduced-motion неактуален). НО для кейтеринга-2026 заказчик и рынок ждут «живость» (Drinkit-DNA, `01` §4, `17` §3) — чисто статичный hero проигрывает вовлечению и «вау» на входе. Надёжный, но скучный.
- **Б (5.0):** Потенциально «вау», НО фактически худший. Видео = прямой конкурент LCP: mintec замерил **+3.2s** к LCP на сыром варианте, даже после оптимизаций ~1.8s (бюджет `04` = <1.2s → **провал**). Autoplay блокируется браузером/батареей → чёрная вспышка или пустой фон; тяжёлый CPU/трафик на mobile; движение отвлекает от CTA. `27` сам это признаёт («Hero остаётся poster»). **Для hero — отвергнуть**, перенести в `HomeVideoShowcase` ниже фолда (по IO, `27` п.1).
- **В (9.0):** Лучший баланс. Poster = мгновенный LCP (≤120КБ webp/AVIF + LQIP ≤8КБ), видео — subtle loop реального события (доверие + «живость»), `preload=none` не бьёт paint, `aria-hidden` (не конкурирует с CTA). Скепсис: требует дисциплины (poster ДОЛЖЕН быть LCP-элементом, видео НЕ должно «проскакивать» вперёд), иначе скатывается в Б.

---

## РЕКОМЕНДАЦИЯ (для NiloV)

**Выбрать В (Drinkit living-photo), где poster — LCP, видео — тонкий enhancement ПОСЛЕ paint.**
- Базовый слой = **А** (poster, мгновенный, а11у-безопасный) — он же fallback при `prefers-reduced-motion`, медленном соединении, блокировке autoplay (паттерн react-poster-video: «если не играет — остаётся фото, без чёрного экрана»).
- **Б запретить в hero.** Реальное событийное видео — в `HomeVideoShowcase` (ниже фолда, IntersectionObserver, `27`).
- Риск: если исполнитель не сделает poster истинным LCP-элементом с `fetchpriority="high"` — В превратится в Б. Жёстко прописать в `04`.

---

## BUG-LIST по блоку 1 HeroSection (`04`, что ДОПИСАТЬ для варианта В)

> Критично: в `04` строка 78 блок 1 до сих пор гласит «видео-loop + заголовок» (это **Б**!),
> а `27` п.5 уже перевёл hero на Drinkit living-photo (**В**). **Противоречие не закрыто.**

1. **[КРИТ] Противоречие 04↔27.** В `04` блок 1 заменить «видео-loop» на явную формулировку варианта **В**: «poster (LCP) + subtle loop/Ken Burns поверх, видео НЕ есть LCP-кандидат». Убрать подтекст full-video hero.
2. **[КРИТ] poster = LCP-элемент, не декорация.** Прописать: poster рендерится как `<img>` (НЕ CSS-background, иначе не попадает в LCP-расчёт и не прелоадится), `fetchpriority="high"`, `<link rel="preload" as="image" fetchpriority="high">` в `<head>`. В `04` сейчас только «blur-up poster» — без fetchpriority/preload.
3. **[КРИТ] Контраст CTA над движущимся видео.** У `04` есть «мягкий градиентный оверлей», но НЕ прописано требование **AA 4.5:1 поверх ВИДЕО** (движение усложняет верификацию контраста). Добавить: scrim-градиент фиксированной яркости, замер контраста на кадре видео, а не на poster.
4. **[СРЕД] aria-hidden И role/aria-label взаимоисключающи.** `04` строка 103–104 даёт видео ОДНОВРЕМЕННО `aria-hidden` И `role="img"`+`aria-label`. Это противоречие: `aria-hidden` глушит всё, label не прочитается. Для декоративного фона → **только `aria-hidden`, без role/label**. Label нужен, только если видео несёт смысл (у hero — не несёт).
5. **[СРЕД] poster должен совпадать с первым кадром видео.** `04` пишет «blur-up poster» — для subtle-loop blur-плейсхолдер приемлем, НО финальный poster обязан = первый кадр seamless-loop (иначе «дёргается» при старте видео). Добавить требование совпадения кадров.
6. **[СРЕД] Атрибуты autoplay-видео не полны.** Для В нужно явно: `muted playsinline loop autoplay` (без `playsinline` iOS не autoplay; без `muted` блокируется). `04` это не фиксирует (есть только «muted, seamless loop»). Добавить `playsinline` + `autoplay`.
7. **[НИЗ] Mobile: circular frame vs full-bleed living-photo.** `04` предлагает «circular frame справа (опц.)» и «скрыт на mobile (экономия LCP)». Для В нужно решить: living-photo — full-bleed фон или в рамке? Если в рамке — это не «живой hero-фон», а карточка (другой паттерн). Уточнить контракт: В = full-bleed bg-poster + subtle-loop, circular frame — отдельный опц. акцент, не замена.
8. **[НИЗ] preload-дисциплина видео.** `04` верно: `preload="none"` + lazy после paint. Добавить: загрузку видео инициировать **после** `window.load`/`requestIdleCallback`, НЕ в том же кадре, что poster (иначе конкурирует за полосу и бьёт INP/LCP). `27` п.3 это есть для `HomeVideoShowcase`, перенести в hero-В.
9. **[НИЗ] reduced-motion — уже ок, но закрепить тест.** `04` строка 108 корректно: reduced-motion → видео НЕ autoplay, показ poster, clip-path wipe → мгновенный `opacity:1`. Добавить в TODO: e2e-проверка, что при `prefers-reduced-motion` сетевой запрос видео НЕ уходит.

**Что в `04` уже хорошо (не трогать):** LCP-бюджет <1.2s, CLS<0.1 через `aspect-ratio`, `font-display:swap`+preload woff2, focus-order, SkipLink, `prefers-reduced-motion` для wipe/scroll-hint, единый primary-CTA-глагол «Спланировать событие» (`/plan`).

---

## ИТОГ ДЛЯ РОДИТЕЛЯ
- **Лучший для NiloV: В (Drinkit living-photo), база = poster-LCP.** Б отвергнуть в hero (→ `HomeVideoShowcase` по IO). А — надёжный fallback/reduced-motion-слой.
- **Баллы:** А 8.5 · Б 5.0 · В 9.0.
- **Главный баг `04`:** блок 1 всё ещё описан как «видео-loop» (**Б**), хотя `27` перевёл на **В** — противоречие не закрыто (bug #1). Плюс 8 пунктовов дописать (fetchpriority/preload poster, контраст над видео, aria-hidden vs role-label, совпадение кадров, playsinline+autoplay, mobile-frame контракт, idle-загрузка видео, e2e reduced-motion).
