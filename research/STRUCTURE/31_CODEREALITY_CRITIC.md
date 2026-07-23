# 31 — Code Reality Check (CodeRealityChecker)

**Роль:** независимый критик-субагент (др. модель, не автор). Настроен на занижение.
**Дата:** 2026-07-19.
**Объект:** сверка СПЕКИ (`01_VISUAL_DNA`, `02_IA`, `04_BLOCKS`, `06_TOKENS`, `29_POSITIONING`) с РЕАЛЬНЫМ кодом репозитория `catering-site`.
**Метод:** чтение `app/globals.css`, `app/*` (роуты), `components/*`, `lib/*`, `components/ui/*`; grep по токенам/темам/роутам/видео/лексемам.

---

## ОЦЕНКА: 2 / 10 (критический рассинхрон)

Репозиторий НАХОДИТСЯ В ДО-ФАЗОВОМ (legacy) состоянии. Спека была пересмотрена **2026-07-18** (`06_TOKENS` + `04_BLOCKS` B1) в сторону **светлой ДНК + новой IA**, а код остался прежним: **тёмная тема + старые роуты**. Это не «план», это факт — код ПРЯМО СЕЙЧАС противоречит утверждённой спеке по двум фундаментальным пунктам (тема, IA). Спека сама это признаёт (B1 в `04_BLOCKS`), но БАГ НЕ ЗАКРЫТ.

**Что ЕСТЬ в коде и совпадает со спекой (единицы):**
- `app/not-found.tsx` (кастомный 404) — ✅ со спекой.
- `app/team/page.tsx` — ✅ `/team` есть.
- API: `/api/constructor`, `/api/newsletter`, `/api/availability`, `/api/booking`, `/api/quote`, `/api/contact` — ✅ все живы.
- `components/ui/*` (button/card/badge/input/accordion/separator/sheet) — ✅ shadcn-примитивы есть (на них `06` опирается).
- Framer Motion в deps, `useReducedMotion` используется — ✅ motion-language.
- 152-ФЗ чекбокс в формах (`ContactForm`, `QuoteForm`, API) — ✅.
- Хардкод **Vimeo** в коде — **ОТСУТСТВУЕТ** (0 совпадений). Старый баг DeviceCritic (хардкод Vimeo) **ФАКТИЧЕСКИ ЗАКРЫТ**.

---

## BUG-LIST (спека ↔ код)

### 🔴 B1 (БЛОКИРУЮЩИЙ, известный) — `globals.css` тёмный при светлой ДНК
- **Спека:** `01_VISUAL_DNA` §1/§2/§7, `06_TOKENS` §1 (пересмотр 2026-07-18): ivory `#FAF7F2` bg, ink `#1C1815`, gold `#B08D57`, светлые тени `rgba(28,24,21,…)`. `04_BLOCKS` уже пометил как B1 (Фаза 0).
- **Факт:** `app/globals.css` строки 5–56 — `--color-background:#0A0A0A`, `--color-foreground:#F5F0EB`, `--color-cream:#F5F0EB`, `--color-gold:#C9A96E`, `--color-primary:#722F37` (burgundy), тёмные тени `rgba(0,0,0,0.4..0.7)`. Тело (59–68) залито тёмным + тёмные ambient-градиенты.
- **Статус:** НЕ исправлено. Светлые токены из `06` в `globals.css` НЕ применены (пункт 5 задания — НЕТ).
- **Влияние:** ломает весь responsive-контракт `01` §7 («мягкий градиент, НЕ чёрная плашка»). Блокирует любую сборку.

### 🔴 B2 (БЛОКИРУЮЩИЙ, НОВЫЙ — контраргумент к `04_BLOCKS`) — каскад `text-cream` обрушится при флипе темы
- **Спека `04_BLOCKS` B1.6 утверждает:** секции, использующие `text-cream`/`text-cream-muted`, «автоматически переедут на ivory/ink при смене значений (имена совпадают)». **Это НЕВЕРНО.**
- **Факт:** `--color-cream` / `--color-cream-muted` **ОТСУТСТВУЮТ** в токен-таблице `06_TOKENS` §1. Там `cream` переименован в `--color-secondary:#F2ECE3` и `--color-card`. То есть после флипа `globals.css` на светлый `--color-cream` **исчезнет**, а компоненты продолжат ссылаться на несуществующий токен.
- **Масштаб:** `text-cream`/`text-cream-muted`/`bg-cream` — **284 вхождения в 42 файлах**, включая `Header.tsx` (лого, nav, CTA), `Footer.tsx`, ВСЕ `components/constructor/*` (ContactForm, TierSelector, SummaryCard, GuestsSlider, AddOnsSelector…), `HeroSection`, `TestimonialsSection`, `GallerySection`, `Консьерж`, `CustomCursor`.
- **Вывод:** план `04` по B1 технически неполон — флип темы сломает 284 стиля. Нужен либо ренейм токена (`--color-cream` → `--color-cream` сохранить как алиас на `#1C1815`/`muted-foreground`), либо массовый рефакторинг 42 файлов. Без этого Фаза 0 не закрывается.

### 🔴 B3 (БЛОКИРУЮЩИЙ) — IA: спец-роуты отсутствуют, в коде legacy
- **Спека `02_IA`:** `/events/*` (svadba/korporativ/chastnoe/chef-at-home), `/menu/*` (furshet/banquet/coffee-break/catalog/show-cooking), `/plan/*` (calculator/constructor), `/why-us`, `/reviews`, `/seasonal`, `/delivery`, `/certificates`, `/thank-you`.
- **Факт (реальные роуты `app/`):** `/`, `/menu`, `/services`, `/services/[slug]`, `/services/{weddings,corporate,private}`, `/pricing`, `/about`, `/testimonials`, `/quote`, `/constructor`, `/offer`, `/contact`, `/gallery`, `/blog`, `/faq`, `/privacy`, `/terms`, `/cookies`, `/team`.
- **ОТСУТСТВУЮТ ПОЛНОСТЬЮ:** `/events/*`, `/why-us`, `/reviews`, `/plan/*`, `/seasonal`, `/delivery`, `/certificates`, `/thank-you`. (404 = `not-found.tsx` — ✅ есть.)
- **LEGACY (надо rename + 301):** `/services`→`/events`, `/about`→`/why-us`, `/testimonials`→`/reviews`, `/pricing`→`/plan/calculator`, `/quote`→`/plan/calculator`, `/constructor`→`/plan/constructor`, `/offer` (влить в `/plan/calculator`).
- **Вывод:** вся клиентская IA из `02` не реализована. Главная (`app/page.tsx`) собирает старые секции (`ServicesSection`, `ProcessTimeline`) — не по порядку/словарю `04`.

### 🟠 B4 (СРЕДНИЙ) — `navItems` в `lib/data.ts` ссылается на legacy-роуты
- **Факт (строки 1771–1779):** `Меню→/menu`, `Конструктор→/constructor`, `Цены→/pricing`, `Услуги→/services`, `Галерея→/gallery`, `О нас→/about`, `Контакты→/contact`. `mobileNavItems` — тоже legacy.
- **Спека:** nav = `События(/events)·Меню·Галерея·Почему мы(/why-us)·Команда(/team)·Отзывы(/reviews)·Сезонное(/seasonal)·Спланировать(/plan)` (+ тел/WA).
- **Вывод:** даже если поменять `globals.css`, навигация ведёт на несуществующие/legacy страницы. `Header`/`MobileBottomNav`/`Footer` все берут `navItems` из `lib/data.ts`.

### 🟠 B5 (СРЕДНИЙ) — CTA-глагол и цель Header не по спеке
- **Спека `04` C9:** единый primary-CTA-глагол «Спланировать событие» → `/plan`.
- **Факт:** `Header.tsx` CTA = «Обсудить» → `/contact` (строки 93–98, 152–158). Не «Спланировать», не `/plan`.
- **Вывод:** нарушение единого CTA-контракта (C9).

### 🟡 B6 (НИЗКИЙ / план) — `VideoProvider` НЕ реализован
- **Спека `04` «ВИДЕО-СЛОЙ»:** единая абстракция `VideoProvider` (`lib/video.ts`, rutube/selfhost), `getEmbedUrl`, `VideoRef`.
- **Факт:** 0 совпадений `VideoProvider|VideoRef|getEmbedUrl|rutube` в коде. Абстракции нет. Зато **Vimeo тоже 0** — старый баг DeviceCritic (хардкод Vimeo) закрыт, но и спец-провайдер не построен.
- **Вывод:** не блокирующий (нет обратного рассинхрона), но видео-слой `04` не начат. Hero-видео (если есть) — без фасада/провайдера.

### 🟡 B7 (НИЗКИЙ) — премиум-лексема «VIP» в коде
- **Спека `01` §1:** убрать сноб-лексемы (VIP, элитно, эксклюзив, для избранных).
- **Факт:** `components/constructor/TierSelector.tsx:6` — `vip: 'VIP'` в `TIER_NAMES`. Публичный лейбл тарифа «VIP» противоречит деснобификации (`04` T3: «Эконом / Стандарт / Расширенный / Премиум», «Люкс НЕ в публичном заголовке»).
- **Вывод:** мелкий, но реальный лексический рассинхрон.

### 🟡 B8 (НИЗКИЙ) — хардкод HEX в компоненте
- **Спека `06` §5:** «Хардкод HEX в компонентах = нарушение».
- **Факт:** `components/effects/ParallaxImage.tsx:49` — `bg-gradient-to-t from-background via-[#0A0A0A]/40 to-transparent` (литеральный тёмный hex в компоненте, не токен).
- **Вывод:** при флипе темы градиент останется тёмным поверх светлого фона.

---

## ПЛАН ФАЗЫ 0 (todo, блокирующие → в порядке закрытия)

1. **[B1] Переписать `app/globals.css` на светлую палитру** по `06_TOKENS` §1 (ivory `#FAF7F2`, ink `#1C1815`, gold `#B08D57`, светлые тени `rgba(28,24,21,…)`, gold-glow `rgba(176,141,87,…)`). Ambient-градиенты в body — со светлых `rgba`.
2. **[B2] НЕ ломать `text-cream`.** Либо (а) оставить `--color-cream:#1C1815` / `--color-cream-muted:#6B625A` как АЛИАСЫ в `@theme` (самое дешёвое, НЕ трогать 42 файла), либо (б) массово рефакторить 284 вхождения `text-cream`→`text-foreground`/`text-muted-foreground`, `bg-cream`→`bg-secondary`. **Рекомендую (а)** — иначе Фаза 0 взрывает вёрстку. *Исправить утверждение в `04_BLOCKS` B1.6: имена НЕ совпадают — `cream` нет в таблице `06`.*
3. **[B2] Убрать хардкод** `#0A0A0A` в `ParallaxImage.tsx` (→ токен/прозрачность).
4. **[B3] Реализовать IA:** создать `/events/*`, `/why-us`, `/reviews`, `/plan/*`, `/seasonal`, `/delivery`, `/certificates`, `/thank-you`; сделать 301-редиректы для legacy (`/services`,`/about`,`/testimonials`,`/pricing`,`/quote`,`/constructor`,`/offer`) в `next.config`/`middleware`.
5. **[B4] Переписать `navItems`/`mobileNavItems` в `lib/data.ts`** на каноничный состав `02_IA` (События/Меню/Галерея/Почему мы/Команда/Отзывы/Сезонное/Спланировать). Header/Footer/MobileBottomNav подхватят автоматически.
6. **[B5] CTA Header** → «Спланировать событие» → `/plan` (C9).
7. **[B6] Заложить `lib/video.ts` (`VideoProvider`)** + `VideoFacade` (rutube/selfhost, facade-эмбед) — точка свопа по `04`.
8. **[B7] Убрать «VIP»** из `TierSelector` (заменить на канон `04` T3).
9. **[gate] Проверка после Фазы 0:** `grep -rn "0A0A0A|F5F0EB|722F37|C9A96E|#0A0A0A"` по `app/`,`components/`,`globals.css` → **0 совпадений** (критерий `04_BLOCKS` §«Проверка»).

---

## ИТОГ
- **Тема:** тёмная (спека требует светлую) — 🔴 НЕ закрыто, `04` это знает, код нетронут.
- **Светлые токены `06`:** НЕ применены в `globals.css` — 🔴.
- **IA:** legacy, спец-роуты отсутствуют — 🔴 почти целиком.
- **Vimeo-хардкод:** устранён (0) — 🟢 старый баг закрыт; но `VideoProvider` ещё не построен.
- **Премиум-лексемы:** «VIP» остался в `TierSelector` — 🟡.
- **Оценка 2/10:** структура (секции, API, shadcn, 404, 152-ФЗ) есть, но два столпа контракта (светлая ДНК + новая IA) не начаты. Репозиторий в состоянии «до Фазы 0».
- **Критический нюанс для исполнителя:** план `04_BLOCKS` B1.6 ошибочен про `text-cream` — флип темы без обработки 284 вхождений сломает вёрстку. Закрывать B1 и B2 вместе.
