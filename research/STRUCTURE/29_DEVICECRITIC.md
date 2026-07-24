# 29 — DeviceCritic: удобство и работа на всех устройствах

> Роль: независимый критик (все устройства идеально?). Настроен на занижение.
> Источники: `04_BLOCKS.md`, `06_TOKENS.md`, `01_VISUAL_DNA.md`, реальный код репо,
> web_search: CWV 2026 (LCP≤2.5s, INP≤200ms, CLS<0.1), touch-target ≥44px (Apple 44pt / Material 48dp / WCAG 2.5.5).

## ВЕРДИКТ КОРОТКО
На любых устройствах «идеально» — **НЕТ**. Главный системный дефект: собранная тема —
**тёмная кинематографичная** (`globals.css`: `--color-background:#0A0A0A`, foreground `#F5F0EB`),
в то время как вся утверждённая ДНК (`01` §2, `06` §1) — **светлая ivory/ink**. Т.е. спецификация
адаптивности/моушена писалась под светлый сайт, а в коде живёт другая дизайн-система. Всё ниже
оценивается по ФАКТУ (тёмная тема), но bug-list помечает и это расхождение.

## ОЦЕНКИ (0–10, заниженно)
| Категория | Оценка | Почему |
|---|---|---|
| (1) Mobile (LCP/INP/CLS, 44px, BottomNav, формы) | **4/10** | блокирующий preloader 1.4s, hero-video autoplay на ВСЕХ мобильных, нет StickyMobileCTA, нижняя навигация урезана, Lenis на touch, стек fixed-элементов перекрывается |
| (2) Tablet / Desktop | **6/10** | desktop-nav и кастом-курсор ок, но тот же preloader, тяжёлый hero-video, на tablet — полноэкранное оверлей-меню вместо компактной навигации |
| (3) Риски (тяжёлое видео, длинные формы, hero на слабых) | **3/10** | нет квот/ленивой загрузки видео по сети, нет замеров CWV, формы не по спеце, тесты на реальных устройствах отсутствуют |

## ЧТО ХОРОШО (признаю)
- Touch-таргеты ≥44px соблюдены массово: кнопки/чипы/селекторы несут `min-h-[44px]` (`QuoteForm`, `CTASection`, `Constructor*`, `TierSelector`, `GuestsSlider`, `VoiceSearch`).
- `MobileBottomNav` резервирует `env(safe-area-inset-bottom)` — учтён «чёлка»/home-bar.
- `CustomCursor` корректно `hidden md:block` + `(pointer:fine)` — не мешает тачу.
- `QuoteForm`: у каждого поля свой `<label htmlFor>`, чекбокс 152-ФЗ, кнопка `min-h-[44px]`.

## BUG-LIST (что добавить/проверить)

### Критические (блокируют «идеально на mobile»)
- **B1. Тема не применена.** `globals.css` — тёмная, вся ДНК (`01`/`06`) — светлая. Привести токены
  к `06_TOKENS` (ivory `#FAF7F2` / ink `#1C1815` / gold `#B08D57`). Без этого весь responsive-контракт
  (`01` §7 «мягкий градиент, НЕ чёрная плашка») нарушен. Затрагивает Header/Hero/BottomNav (все
  используют `text-cream`/`text-cream-muted`).
- **B2. Нет StickyMobileCTA.** Спец `04` (строки 40–55) требует глобальную прилипающую
  «Спланировать/Позвонить» (паттерн pxlpeak «Thirsty Click»). В репо компонента **нет** — только
  `MobileBottomNav`. → конверсия на mobile теряется; заявка НЕ в 1 тап с любой глубины.
- **B3. MobileBottomNav урезан до 3 пунктов** (Меню / Калькулятор / Звонок). Спец `04` требует ровно 5
  ключевых: События / Меню / Галерея / Почему мы / **Спланировать** (+ дублирующий CTA). Сейчас нет
  «Спланировать» и разделов События/Галерея/Почему мы. Нарушен не только состав, но и единый CTA-глагол
  (см. `22_COHERENCE_REPORT` C9).
- **B4. Перекрытие fixed-элементов снизу (один z-index 50 на всех).** `Консьерж` (FAB
  `bottom-20 right-4 z-50 w-14 h-14`), `CookieBanner` (`bottom-0 z-50`), `MobileBottomNav` (`bottom-0 z-50`)
  — равный z, перекрываются/конкурируют. Спец `04` (z-иерархия: header z-100, bottom z-90,
  cookie/баннер z-120) **не соблюдена**. На маленьком экране FAB висит поверх bottom-nav / перекрывает
  контент. Нужно: единая иерархия + правило «в нижней зоне одновременно ≤1 sticky» (OR: StickyMobileCTA
  заменяет BottomNav, как в `04` строки 47–49).
- **B5. Preloader блокирует LCP/INP на mobile.** `Preloader` держит `z-[100]` ~1.4s + exit 0.5s,
  **без учёта `prefers-reduced-motion`** (анимация идёт всегда). Спец `04` ставит LCP <1.2s; один
  прелоадер уже >1.4s и не даёт взаимодействовать (INP). Либо убрать, либо делать ≤400ms и
  `useReducedMotion →` мгновенный `opacity:1`, либо morph-переход без блокировки paint.

### Видео / производительность (риски)
- **B6. Hero-video autoplay на ВСЕХ мобильных.** `HeroSection`: `setUseVideo(false)` только при
  `slow-2g/2g` ИЛИ reduced-motion. На 3G/4G середнячке и «слабом android» грузится полный
  `/videos/hero/banquet.webm` в первом кадре → бьёт LCP (спец требовал poster как LCP-элемент
  `<img fetchpriority=high>` + видео `preload="none"` idle). Добавить: `effectiveType<=3g` /
  `navigator.hardwareConcurrency<=4` / `deviceMemory<=4` → статик, а не только 2g. Проверить, что
  `/videos/hero/banquet.webm` и `/images/hero/catering-hero.jpg` реально лежат в `/public` (иначе
  broken LCP + 404).
- **B7. Lenis на тач-устройствах.** `SmoothScrollProvider` `touchMultiplier:2` — на mobile конфликтует
  с нативной инерцией, даёт «тягучий» скролл и нагрузку на INP. Рекомендую `smoothTouch:false` /
  отключать Lenis при `(pointer:coarse)`. Спец `01` §4 хочет Lenis, но на mobile он чаще вреден.
- **B8. Нет квот видео и ленивой загрузки для вставных блоков.** Спец `04` (6-bis `HomeVideoShowcase`,
  7-bis `EventsRecapHome`, DishCard loop-видео) предписывает IntersectionObserver + `preload="none"` +
  facade (Rutube / self-host), НЕ self-host тяжёлые MP4. Проверить, что эти блоки (если собраны) НЕ грузят видео
  до входа в зону и имеют poster LQIP. Иначе на mobile «всё видео сразу» убьёт батарею/INP.
- **B9. Ken Burns + Framer-scroll-parallax на ВСЕХ карточках/галерее.** На low-end android composited-
  transform не спасает при большом числе узлов; `useScroll` слушатели на main-thread могут дёргать INP.
  Проверить на реальном бюджетном устройстве; для ≤`(pointer:coarse)` + reduced-motion — отключать
  parallax (спец `04`/`01` это требуют, но фактически parallax в `GallerySection` не всегда
  `prefers-reduced-motion`-гейтед — проверить).

### Формы / a11y
- **B10. QuoteForm не соответствует спеце `04` (`ContactForm`).** Спец: ровно 5 полей
  (name/phone/eventType select/date `min=завтра`/comment), маска телефона `+7 (___) ___-__-__`,
  Zod realtime-валидация, `aria-describedby`+`role=alert` на ошибках, чекбокс 152-ФЗ НЕ предустановлен,
  после submit → `/thank-you`. Факт: нет маски, нет Zod, нет привязки ошибок к aria, `eventType`
  отсутствует, редиректа на `/thank-you` нет (просто toast). Привести к спеце или обосновать упрощение.
- **B11. focus-visible 2px gold** по `01` §7 — в `QuoteForm`/`input.tsx` используется
  `focus:border-gold` (только рамка), без видимого gold-ring 2px по спеце `06` (`--color-ring`).
  Добавить `focus-visible:ring-2 ring-ring` на интерактив.
- **B12. MobileBottomNav aria-таргеты.** Иконки 20px + подпись 10px uppercase — тап-зона `w-full h-full`
  внутри `h-16` ок, но расстояние между соседними ссылками (gap-1) <8px safe-gap из `04`. Добавить
  `gap`/`padding` между целями, чтобы исключить случайные тапы (WCAG 2.5.5 spacing).

### Tablet
- **B13. Tablet (768–1023px) = мобильное оверлей-меню.** `Header` desktop-nav `hidden lg:flex`
  (lg=1024). На планшете открывается полноэкранный `AnimatePresence` оверлей (`bg-background/95`) —
  тяжело и неудобно для 10″. Спец `04` хочет desktop top-bar ≥1024, но tablet можно дать компактный
  бургер-список/дроп, а не fullscreen. Проверить поведение на 768/834/1024.

### Замеры / тесты
- **B14. Нет замеров CWV и тестов на реальных устройствах.** Спец декларирует LCP<1.2s / INP<200ms /
  CLS<0.1, но нет Lighthouse CI, нет замера на real Android (Pixel/Moto бюджет) + iOS Safari.
  Добавить: Lighthouse CI (mobile), `web-vitals` runtime-мониторинг, ручной прогон на 2–3 реальных
  устройствах (вкл. слабый android + iPhone SE/мини по ширине). Проверить CLS от шрифтов
  (`font-display:swap`+preload woff2 из `01` §3 — есть ли preload в `<head>`? в `layout.tsx` НЕТ
  `<link rel=preload>` шрифтов → при загрузке Cormorant/Inter возможен layout-shift заголовков).

## ИТОГ
«Премиум-мероприятие возможно, но не в первую очередь» — подтверждаю: сайт визуально «дорого»
(тёмный кинематограф), но **на mobile он тяжёлый и неполный**: блокирующий preloader, autoplay-video
без сетевых квот, отсутствует ключевой StickyMobileCTA, нижняя навигация урезана, fixed-элементы
перекрываются. Оценка mobile 4/10 — далеко от «идеально». Закрытие B1–B5 обязательно до релиза;
B6–B14 — до премиум-готовности.
