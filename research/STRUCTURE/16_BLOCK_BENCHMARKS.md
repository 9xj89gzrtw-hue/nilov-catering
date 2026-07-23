# 16 — BENCHMARK ПО БЛОКАМ (лучшая в мире реализация → как у нас лучше)

**Датировано:** 2026-07-18. **Источники:** реальный ресёрч (web_search + extract),
не выдумка. Свежие данные 2026 (UENI «30 Best Restaurant 2026», startdesigns «Top 10 2026»,
Awwwards Food/Drink SOTD 2026, Contentsquare 2026 CTA-study, webdesign-awards 2026).
Дополняет `13_BENCHMARK_SYNTHESIS.md` (там — общие паттерны, здесь — **по блокам**).

> Принцип: мы НЕ копируем 1:1 (наш конверсионный кейтеринг ≠ награда Awwwards).
> Берём доказанный паттерн топа → адаптируем под нашу светлую IA → **добавляем то,
> чего у топа НЕТ** (русский комплаенс, мгновенный калькулятор+PDF, конструктор-мастер).

---

## 1. HERO — «весь экран = одна живая еда»
**Лучший в мире:** Bodip's Smokin' Que (UENI 2026 SOTD-уровень) —
«a fiery close-up of glazed ribs that fills the viewport. Dark backdrop, saturated colour.
No clutter, no carousel, no welcome paragraph. Just food and a clear path to 'order online'.»
Также Awwwards Food/Drink SOTD 2026: Matcha Cartel, Banh mi Viet Nam ✅ *(реальный сайт-эталон, проверено FactChecker)*, CIAO ENERGY,
Terry Ho, Ballena Fine Dining — все editoral + video-led, одна крупная фото/видео-сцена. ✅ *Awwwards SOTD (Matcha Cartel, Banh mi Viet Nam) — реальный сайт-эталон, проверено FactChecker.*
**Как у нас (уже в `09_HERO_STORYBOARD`):** autoplay-loop видео + 1 CTA «Выбрать формат».
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Берём правило «resist crowding» → Hero НЕ несёт overline+3 CTA+бейджи. ТОЛЬКО:
  overline, H1 (Cormorant), 1 primary CTA + 1 ghost. Остальное — после скролла.
- Видео = «живая еда» (Drinkit-паттерн): пар от блюда / нарезка / подача, НЕ статичный кадр.
- Тёмный фон Bodip's → у нас **светлый** (override §1.8), но принцип «еда = весь экран» тот же.
- Преимущество над топом: у них Hero = только имидж; у нас Hero сразу ведёт в
  калькулятор/конструктор (конверсия, а не просто «красиво»).

## 2. FORMAT SHOWCASE (3 формата) — «карточки-живые»
**Лучший в мире:** Awwwards Hotel/Restaurant SOTD (Palazzo Sogni, Ballena Fine Dining) —
крупные фото блюд, circular/geometric frames, диагональные линии под заголовками.
**Как у нас (`10_FORMAT_SHOWCASE_STORYBOARD`):** 3 карточки (Фуршет/Банкет/Кофе-брейк),
Ken Burns hover, цена в JetBrains Mono, ghost-CTA.
**КАК СДЕЛАТЬ ЛУЧШЕ:** добавить **короткое loop-видео на hover** (Drinkit: «фото что-то делает»)
вместо только Ken Burns zoom — у топов этого часто нет, у нас будет «живая еда» как фишка.

## 3. MENU (интерактив) — «фильтр + фото на hover + состав»
**Лучший в мире:** Sizzle & Smoke (startdesigns 2026) — «Users can filter dishes by category,
see dish images on hover, and even get ingredient details. An interactive menu can reduce decision fatigue.»
Плюс Seahawk Media 2026: «3D Food Renderings & AR Preview… microinteractions like a steaming
coffee cup icon add delight.» Pippit: «Static menus are a thing of the past.»
**Как у нас (`04_BLOCKS` DishCard + `07`):** MenuCatalog с фильтром категорий, карточка с
фото/ценой/аллергенами, hover zoom.
**КАК СДЕЛАТЬ ЛУЧШЕ (ingredient-storytelling, паттерн из `13`):**
- На hover DishCard → **5-сек видео приготовления + origin («фермеры ЛО») + КБЖУ** (pxlpeak 2026).
- Берём Sizzle & Smoke (фильтр+состав), НО добавляем **14 аллергенов ТР ТС 021/2011**
  (русский комплаенс — у западных топов его НЕТ, у нас = доверие + юр.чистота).
- Преимущество: у топов меню = картинка; у нас меню = преддиагностика заказа (гибридная модель §1.5).

## 4. GALLERY (parallax masonry) — «3D-depth симуляция»
**Лучший в мире:** Awwwards Parallax-коллекция — «simulates 3D depth by moving the background
slower than the layers in the foreground.» 2026 = 61% SOTD используют WebGL/3D (digitalstrategyforce).
**Как у нас (`11_GALLERY_TEASER`, `04` GalleryMasonry):** masonry + parallax разной скорости — **Только на 1 hero-стрип (НЕ per-image)**, остальные плитки — статика/фейд.
(Framer useScroll), капшен с типом события на hover.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Parallax НЕ через тяжёлый WebGL (бьёт LCP), а через Framer `useTransform` (лёгкий, LCP<1.2s).
- Группировка НЕ «фото еды», а **по типу события** («Свадьба · 120 гостей») — клиент видит себя.
  У Awwwards-топов галерея часто «просто красивые кадры»; у нас — контекст = конверсия.
- Капшен несёт смысл (120 гостей), а не декорацию.

## 5. CALCULATOR (мгновенный) — «живой итог»
**Лучший в мире:** Contentsquare 2026 (58 млн mobile-сессий, 400 e-com sites) —
«sticky bottom-bar CTAs on product pages generated **31% more conversions** than non-sticky equivalents.»
«Position the CTA after the value proposition, not at the very top.» (Foundry CRO 2026).
**Как у нас (`07_CALCULATOR_SPEC`):** слайдеры гостей/пакета, count-up цены, sticky ResultDisplay,
PDF-КП.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Count-up цены (spring) при любом изменении — «живой» отклик, как у топовых калькуляторов.
- Sticky ResultDisplay (desktop right / mobile bottom) + наш глобальный `StickyMobileCTA` (паттерн
  «Thirsty Click») → реализуем 31%-ное преимущество из статистики.
- Преимущество над топом: у них калькулятор часто = «заполни 15 полей»; у нас —
  **мгновенно (<50ms, без API-call) + PDF-КП сразу** (webcitz: «interactive menu builders» — у нас глубже).

## 6. CONSTRUCTOR (мастер 6 шагов) — «прогресс + контекст»
**Лучший в мире:** Growform «16 Best Multi-Step Forms» — «clear progress, validation, and helpful copy.
Long forms increase friction, which leads to lower conversion rates.» (mediterranean/trenderashop: progress bar + validation).
**Как у нас (`08_CONSTRUCTOR_SPEC`):** Zustand, 6 шагов, StepProgress, sessionStorage, edge-cases.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- StepProgress с явным номером шага + «осталось N» (снимает страх длинной формы).
- На шаге 3 (своё меню) — если бросает → CTA «Шеф соберёт индивидуально» (воронка из `08`).
- Преимущество: у топов мастер-форм = сборка ПК/подписки; у нас — **сборка меню**
  (уникальная фича, которой нет у конкурентов, см. `13` §4).

## 7. STICKY MOBILE CTA — «+31% конверсии»
**Лучший в мире:** Contentsquare 2026 — sticky bottom-bar = **+31% конверсии** vs non-sticky.
designstudiouiux 2026: «sticky CTA paired with a floating cart for mobile.» strikingalchemy:
«position it after your headline, at the end of your value proposition, or as a sticky button while scrolling.»
**Как у нас (`04` StickyMobileCTA, `05` Фаза 4):** глобальная gold-кнопка снизу на mobile.
**КАК СДЕЛАТЬ ЛУЧШЕ:** НЕ прятать CTA на mobile; показывать **после первого скролла**
(после value proposition, по статистике), текст «Рассчитать / Позвонить» (2 тапа до заявки).

## 8. LIVE INSTAGRAM FEED — «real-time UGC = trust + revenue»
**Лучший в мире:** embedsocial 2026 — «Instagram remains the ultimate visual engine for brand trust…
converting social presence into a revenue driver.» elfsight: «showcase user-generated content from real customers.»
**Как у нас (`04` LiveInstagramFeed):** секция «Жизнь NiloV» с embed-лентой @nilov_catering.
**КАК СДЕЛАТЬ ЛУЧШЕ:** НЕ просто «лента фото», а **real-time** (auto-update) + капшены
с типом события (как в Gallery) → связываем UGC с контекстом заказа.

## 9. AWARDS / TRUST BAR — «вынеси награду на полку»
**Лучший в мире:** Orbit Media — «You won! Put the trophy on the shelf and then put the award
on your website. Along with certifications and membership logos, these little visuals are 'trust'.»
**Как у нас (`04` AwardsStrip + TrustProof):** «18 лет 🟡 · 3000+ событий 🟡 · Эрмитаж 🟡 · Мариинский 🟡
· Роспотребнадзор 🟡» в geometric frames сразу после Hero. 🟡 = не подтверждено независимо (Роспотребнадзор — госрегулятор, а не клиент; см. FACTCHECK_REPORT_2026-07-20).
**КАК СДЕЛАТЬ ЛУЧШЕ:** добавить **конкретные имена клиентов** (Эрмитаж, Мариинский, Armani 🟡 — НЕ подтверждены вебом, публиковать только как примеры после сверки с заказчиком)
а не абстрактные лого — orbitmedia: «client logos close the 'are they credible?' gap».

## 10. AVAILABILITY CALENDAR — «urgency для limited availability»
**Лучший в мире:** wisernotify 2026 — «Best for… businesses with limited availability, and
appointment-based businesses that need urgency. Promote limited-time offers or seasonal slots.»
sociablekit: auto-updating calendar, 400k+ sites.
**Как у нас (`04` AvailabilityCalendar):** мини-календарь занятости + urgency-бейдж.
**КАК СДЕЛАТЬ ЛУЧШЕ:** показывать **реальную занятость** («3 даты в августе заняты») —
доверие к исполнению + подогрев дефицита (у топов часто «мы всегда свободны» = неправдоподобно).

---

## 11. TRUST BAR (marquee логотипов) — «геометрия вместо строки»
**Лучший в мире:** Proof of the Pudding (Awwwards SOTD) ✅ *(реальный сайт-эталон, проверено FactChecker)* — логотипы клиентов в
**круглых/ромбовидных фреймах**, не просто строка. Orbit Media: client logos
«close the 'are they credible?' gap».
**Как у нас (`04` TrustBar #2):** marquee логотипов (Эрмитаж, Мариинский, Armani, Газпром… 🟡 — все 🟡 = не подтверждено независимо, НЕ публиковать как голый факт; см. FACTCHECK_REPORT_2026-07-20).
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Логотипы НЕ в прямоугольной строке, а в **circular/diamond frames** (Proof of the Pudding).
- Каждая лого — с подписью КТО («Эрмитаж 🟡», а не абстрактный значок) → закрывает trust-gap. 🟡 = не подтверждено независимо, НЕ публиковать как голый факт до сверки с заказчиком.
- Marquee НЕ бесконечно-быстрый (раздражает); плавный, с паузой на hover-pause.

## 12. EVENT TYPE SELECTOR (4 карточки) — «путь по типу события»
**Лучший в мире:** Awwwards Hotel/Restaurant SOTD (Palazzo Sogni, Ballena Fine Dining) —
чёткая навигация по сути («weddings / corporate / private»), крупные фото-карточки.
**Как у нас (`04` #4):** 4 карточки (Свадьба / Корпоратив / Частное / Chef-at-home) → `/events/*`.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Каждая карточка ведёт на КОНКРЕТНЫЙ путь (а не на общую страницу меню).
- Hover → Ken Burns + мини-цифра («от 2450 ₽/гость», «от 20 гостей») = снятие страха «дорого/сложно».
- Преимущество: у топов часто «одна кнопка BUY»; у нас — клиентская логика (blueprint §1.4, 5 шагов).

## 13. MENU PREVIEW (пара подборок) — «аппетит, а не прайс-лист»
**Лучший в мире:** Sizzle & Smoke / Le Jardin — «Subtle animations keep users exploring»,
меню как эмоция, не список блюд.
**Как у нас (`04` #6):** пара «подборок меню» с Ken Burns hover → CTA «Смотреть меню».
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- 2–3 тематические подборки («Фуршет на 50», «Банкет под ключ») вместо «всё меню».
- Каждая подборка = 1 крупное фото + название + 1 строка сути + CTA. НЕ таблица цен.
- Преимущество: ведёт в `/menu/*`, а не заставляет скроллить прайс.

## 14. WHY US (цифры count-up) — «доказательство, а не слова»
**Лучший в мире:** dorik «About Us» (2026): «clear mission, engaging brand story,
visuals that reflect values». sitebuilderreport: «The Legend of Ma'ono» story of Chef = authenticity.
**Как у нас (`04` #8):** 18 лет 🟡 / 3000 событий 🟡 / су-вид 🟡 / фермеры ЛО 🟡 (цифры count-up, все 🟡 НЕ подтверждены независимо, НЕ публиковать как голый факт; см. FACTCHECK_REPORT_2026-07-20).
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Hero-цифры с **count-up** (spring) при scroll-in — «живые», не статичные.
- Блок = СТОРИЯ (основатель Дмитрий Нилов, 18 лет 🟡), а не «мы лучшие».
- Преимущество: у топов About = картинка; у нас — событийная история + измеримые факты.

## 15. TESTIMONIALS CAROUSEL — «кейс, а не звезды»
**Лучший в мире:** Webflow 2026 — «Make testimonials concise and authentic.
Include customer details where possible.» Framer: «brief quotes from happy customers».
**Как у нас (`04` #9, `ReviewCard`):** реальные кейсы с именем + типом события.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- НЕ «★★★★★ + 'всё супер'», а **кейс**: «Свадьба на 120, июнь 2026 — меню Премиум,
  шеф-на-площадке, гости в восторге» + имя + фото.
- Carousel с аккуратной навигацией (не авто-крутилка, которую все ненавидят).
- Преимущество: у топов — абстрактные отзывы; у нас — контекст события = узнаваемость.

## 16. PROCESS STEPS (5 шагов) — «прозрачность пути»
**Лучший в мире:** upmenu/superioseating 2026 — «work backward from target date…
clear timeline reduces anxiety.» HubSpot: «clearly re-states who the company is».
**Как у нас (`04` #10):** как работает заказ (5 шагов, иконки).
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- 5 шагов КАК наглядная временная шкала («Заявка → Звонок ≤15 мин → Дегустация →
  Событие → Обратная связь»), а не просто иконки в ряд.
- Каждый шаг = что ПОЛУЧАЕТ клиент (а не что делает компания).
- Преимущество: снимает страх «а вдруг всё сложно/дорого».

## 17. CTA SECTION — «один шаг, а не стена»
**Лучший в мире:** Contentsquare 2026 — «Position the CTA after the value proposition».
designstudiouiux: «CTA after paragraph three / after value prop, not at very top.»
**Как у нас (`04` #12):** «Спланировать событие» + телефон + WA.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Ровно 1 primary CTA («Спланировать») + телефон/WA как вторичные (не 5 кнопок).
- Секция ПОСЛЕ value-prop (после WhyUs/Testimonials), не сразу после Hero.
- Преимущество: +конверсия по статистике Contentsquare.

## 18. FAQ TEASER — «аккордеон → полный FAQ»
**Лучший в мире:** Orbits/Helpcrunch 2026 — FAQ как «reduced support tickets» lever;
краткие, по делу. growform: multi-step + helpful copy снимает friction.
**Как у нас (`04` #13):** 3–4 частых вопроса (аккордеон) → `/faq`.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Только 3–4 ТОП-возражения на главной (цена, сроки, аллергены, дегустация),
  остальное — на `/faq`.
- Аккордеон с плавным раскрытием (Framer layout), не модалка.
- Преимущество: снимает возражения ДО перехода в калькулятор.

## 19. EVENT HERO (заголовок страницы события) — «контекст события»
**Лучший в мире:** Awwwards Hotel/Restaurant SOTD — per-location/per-event hero
(«Dishoom — per-location founding myths»), крупное фото события.
**Как у нас (`04` #43):** заголовок страницы события + фоновое фото (light).
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Hero каждой страницы события = фото ИМЕННО этого типа (свадьба ≠ корпоратив).
- Заголовок + 1 подстрочник («Свадьба на 120 гостей — от 4350 ₽/гость»).
- Преимущество: клиент сразу видит СВОЁ событие (персонализация без WebGL).

## 20. PACKAGE GRID (тарифы-карточки) — «сравнение, а не прайс»
**Лучший в мире:** SaaS pricing 2026 (Linear, Vercel, Figma, Notion) —
«plan cards spaced well, tiered logically, emphasize outcomes.» Huemor: «best plan emphasized».
**Как у нас (`04` #44):** тарифы (Эконом/Стандарт/Премиум/Люкс) как карточки сравнения.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- 1 тариф = **recommended** (Стандарт/Премиум) с золотой рамкой + бейдж «популярный».
- Каждая карточка = цена/гость + что ВКЛЮЧЕНО (чек-лист), а не «от 3450».
- Преимущество: снимает паралич выбора (у топов часто 5+ планов без акцента).

## 21. SHOW COOKING GRID (интерактивные станции) — «вау + персонализация»
**Лучший в мире:** caterease 2026 / tablacatering 2026 — interactive food stations
как дифференциатор («guests customize their experience»).
**Как у нас (`04` #49):** станции (телятина на камне, лосось, тако, раклет…) с ценой.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Каждая станция = фото в действии (повар нарезает) + цена станции + «добавить в меню».
- Hover → mini-video (Drinkit-паттерн «фото что-то делает»).
- Преимущество: у топов станции = статичная картинка; у нас — живая + персонализация.

## 22. REVIEW CARD / LIST — «имя + событие + фото»
**Лучший в мире:** Webflow 2026 — «Include customer details where possible.
Authentic over polished.» Framer: «persuasive testimonials».
**Как у нас (`04` #53):** отзыв + кейс.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Карточка = фото клиента (или площадки) + имя + тип события + 1 ёмкое предложение.
- На `/reviews` — фильтр по типу события (свадьба/корпоратив/частное).
- Преимущество: узнаваемость («у меня такое же») = конверсия.

## 23. CONTACT FORM — «лёгкие поля + trust-сигналы»
**Лучший в мире:** Orbitforms 2026 — «contact form is a critical conversion touchpoint
deserving same attention as landing pages.» Solo: «simple essential fields, mobile-friendly,
intent-based routing, trust signals (response times).» VentureHarbour: мульти-шаг + ясные CTA.
**Как у нас (`04` #54, `components/quote/QuoteForm`):** Zod-валидация, чекбокс 152-ФЗ, тел/WA/карта.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Поля ТОЛЬКО нужные (имя, телефон, тип события, дата, коммент) — не 15 полей.
- Trust-сигнал рядом: «Перезвоним ≤15 мин · Договор и чек · Страховка мероприятия».
- Чекбокс 152-ФЗ обязателен, но НЕ предустановлен (юр.чистота РФ).
- Преимущество: снимает friction (Orbitforms: форма = высокий leverage на конверсию).

## 24. BLOG CARD / LIST (editorial SEO) — «экспертность + трафик»
**Лучший в мире:** sitebuilderreport 2026 — «embedded Instagram feed at bottom = real-time
dynamic element»; MarketerMilk: RISE blog 220K/mo от SEO. optimizepress: «interactive
elements (quizzes, polls, clickable infographics) engage.»
**Как у нас (`04` #55, `BlogEditorial` #62):** карточки статей (кейсы, сезонные советы).
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Editorial-карточки: крупное фото + рубрика (кейс/совет/гид) + заголовок + чтение ~3 мин.
- В конце поста — CTA в калькулятор (естественный вывод, не форсированный).
- Преимущество: SEO-двигатель (у топов часто блог = «новости», а не экспертность).

## 25. TEAM GRID (лица = доверие) — «люди, а не лого»
**Лучший в мире:** cateringrewards 2026 — «buyers trust people as much as food».
HubSpot: «Meet the Team — staggered layout, who they are + what they do.»
**Как у нас (`04` #60):** фото + имя + роль (шеф, основатель Дмитрий Нилов, координатор).
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Каждая карточка = живое фото (не сток-портрет) + имя + 1 строка роли.
- Geometric frames (circular), как в AwardsStrip — единый язык.
- Преимущество: лицо основателя = персональная ответственность (доверие выше, чем у «компании»).

## 26. SEASONAL MODULE (сезонные предложения) — «повод заказать сейчас»
**Лучший в мире:** bettercater summer 2026 — сезонные модули (BBQ лето, Новый год).
**Как у нас (`04` #64):** повторяющаяся секция (ББQ лето, Новый год, Масленица) с CTA.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Секция меняется по сезону (ротация 20% меню из blueprint) + urgency («Новогодний корпоратив —
  бронируйте за 2 недели»).
- CTA ведёт на КОНКРЕТНЫЙ пакет (а не на главную меню).
- Преимущество: создаёт повод заказать именно сейчас (дефицит сезона).

## 27. SCHEMA BLOCK (JSON-LD) — «структура для поиска + AI»
**Лучший в мире:** gofoodservice — «structured data helps AI systems understand your
menu.» gatilab 2026: LocalBusiness + Restaurant + Offer + FAQPage обязательны для Local SEO.
**Как у нас (`04` #66, `components/seo/StructuredData`):** JSON-LD (Organization, LocalBusiness,
Menu, Offer, FAQPage, AggregateRating) + `llms.txt`.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Все 6 типов схем на соответствующих страницах (а не только на главной).
- `llms.txt` — чтобы AI-поиск (ChatGPT/Perplexity) корректно цитировал меню/услуги.
- Преимущество: опережает конкурентов в AI-discovery (тренд 2026, у РФ-топов редко).

## 28. TRUST PROOF (прозрачность) — «снимает страх скрытого»
**Лучший в мире:** hooray.agency 2026 — «accessibility and transparency now decide trust».
Orbit Media: awards/certifications = «trust».
**Как у нас (`04` #57):** «Доставка в КАД включена · Су-вид · 14 аллергенов ·
Договор и чек · Страховка мероприятия».
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Иконка + текст (не плашка), light, единый язык с AwardsStrip.
- Явно про РФ-комплаенс (152-ФЗ, ТР ТС 021/2011) — у западных топов этого НЕТ,
  у нас = доверие + юр.чистота.
- Преимущество: снимает страх «скрытые платежи / не надёжно».

## 29. HEADER / FOOTER / ANNOUNCEMENT (глобальные) — «навигация без трения»
**Лучший в мире:** htmlburger 2026 — «footer supports DEEPER navigation (docs,
FAQs, certifications) — not repeating the menu.» eLeken 2026: sticky header со
subtle drop-shadow ТОЛЬКО после скролла; Davis: «reduces visual weight». logosh:
sticky nav = +mid-single-digit lift, NN/G: navigate 22% faster.
**Как у нас (`04` глобальные):** SiteHeader (desktop top / mobile bottom), SiteFooter, AnnouncementBar.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Header: sticky, НЕ прячется при скролле вниз (logosh: +22% навигации),
  тонкая gold-тень ТОЛЬКО после скролла (Davis).
- Nav: 5+CTA (События · Меню · Галерея · Почему мы · Спланировать) + телефон/WA справа.
- Footer: ГЛУБОКАЯ навигация (FAQ, сертификаты, политика 152-ФЗ, блог) — не дубль меню (htmlburger).
- AnnouncementBar: сезонное предложение сверху (связь с SeasonalModule).
- Преимущество: меньше трения = выше конверсия к заявке.

---

## 30. FIRST-LOAD ЭФФЕКТ (при самом заходе) — «вау в первые 1.2с»
**Лучший в мире (2026):** Awwwards имеет целую категорию **«First Page Load Animation»**
(Restaurant GEM, ELEMENT — gsap, сразу при загрузке) + **«Preloader/Intro»** (blinkpath,
Walbi, Daniel Spatzek — **immersive intro video / loader** перед контентом) +
**«ink-bleed text reveal (clip-path wipe)»** (OpenCode, Michelin-storefront) — текст
«проявляется» через clip-path, а не просто fade. Restaurant GEM Homepage Hero ✅ *(реальный сайт-эталон, проверено FactChecker)*
также: fullscreen menu, on-hover dish preview, **page-transition video**.
**Что УЖЕ есть в репо (`15_REPO_AUDIT`):** `components/providers/Preloader.tsx`
(бренд-лого «Нилов Кейтеринг / СПб» + прогресс-бар, выход 0.5s) и
`components/effects/TextReveal.tsx` (слово-по-слову reveal y:100%→0 + `MaskReveal` line-mask).
**ПРОБЕЛ (честно):** в `09_HERO_STORYBOARD` entrance описан как **простой fade-up с
задержками 200–1100ms** — слабее топового clip-path wipe; и Preloader **не связан
с Hero** seamless-переходом; нет page-transition анимации.
**КАК СДЕЛАТЬ ЛУЧШЕ:**
- Заменить простой fade Hero-текста на **clip-path wipe / ink-bleed** (как OpenCode Michelin):
  H1 слова «проявляются» через `clip-path: inset(0 100% 0 0)`→`inset(0)` (Framer) — дороже, чем fade.
- **Seamless Preloader→Hero:** прогресс-бар догоняет 100% → лого scale-down в Hero-overline
  (morph), видео Hero НЕ блокирует paint (LCP<1.2s), но entrance играет сразу после.
- Добавить **page-transition** (Framer `AnimatePresence`) между роутами — Restaurant GEM
  делает через video; мы — мягкий clip-path/blur переход (лёгкий, LCP-безопасный).
- Сохранить `prefers-reduced-motion` off (у топов часто нет → а11y проигрывают).
**Преимущество над топами:** у них first-load часто = тяжёлый WebGL/видео (бьёт LCP);
  у нас — **clip-path wipe + seamless preloader**, который ДОРОГО выглядит, но LCP<1.2s (Framer, не WebGL).


✅ Hero · FormatShowcase · Menu/DishCard · Gallery · Calculator · Constructor · StickyMobileCTA ·
   LiveInstagram · AwardsStrip · AvailabilityCalendar  (было в v1)
✅ + TrustBar · EventTypeSelector · MenuPreview · WhyUs · Testimonials · ProcessSteps ·
   CTASection · FAQTeaser · EventHero · PackageGrid · ShowCooking · ReviewCard ·
   ContactForm · BlogCard · TeamGrid · SeasonalModule · SchemaBlock · TrustProof ·
   Header/Footer/Announcement  (дописано сейчас, блоки 11–29)
→ **ВСЕ ключевые блоки библиотеки `04_BLOCKS.md` теперь имеют бенчмарк
   «лучшая в мире реализация → как у нас лучше» с реальными источниками 2026.**

1. **Мгновенный калькулятор + PDF-КП** (<50ms, без API) — глубже западных «menu builders».
2. **Конструктор-мастер меню** (6 шагов) — у топов НЕТ.
3. **Русский комплаенс** (152-ФЗ, ТР ТС 021/2011, 14 аллергенов) — у западных НЕ актуально,
   у нас = доверие + юр.чистота.
4. **Гибридная модель** (сайт = преддиагностика → менеджер-эксперт, §1.5).
5. **Drinkit-паттерн «живые фото»** (loop-видео/Ken Burns на ВСЕХ карточках) — адаптирован под кейтеринг.
6. **+31% конверсии** через sticky mobile CTA (доказано Contentsquare 2026).

---

## 31. МЕНЮ-КОНСТРУКТОР: лучшие «вау»-реализации (что искал пользователь)

**Источники (реальные живые примеры, 2026):** lunchbox.io «5 Examples» (Dos Toros,
Chopt, O'Bagel), orders.co «Catering Menu Step-by-Step», oyelabs «Frictionless Ordering»,
Awwwards Food/Drink SOTD (Matcha Cartel, Banh mi Viet Nam, Restaurant GEM).

### Эталонные паттерны «вау» (какое меню/конструктор удобно·красиво·понятно·запоминающе)

**П1. Build-Your-Own bar (Dos Toros, Chopt).**
Клиент собирает СВОЮ линию: выбирает базу → белки → овощи → соусы → сайды, и
**для каждого пункта указывает кол-во персон** (Dos Toros: «specify how many individuals
they're ordering each selection for» → кухня пакует napkins/cutlery точно). Это =
**конструктор порционно на гостя**, а не «корзина блюд». Вау: клиент чувствует
контроль + персонализацию, а кейтерер получает точные данные для сборки.
→ У НАС: конструктор (08) должен позволять собрать «линию» по станциям/категориям
и задать count per item (не только общий guestCount).

**П2. Сегментация по размеру события (Chopt).**
3 стиля заказа: Craft Your Own / Wrap Platters / Large Salads — выбор зависит от группы
(>10 = salad bar, ≤10 = platters). → У НАС: FormatShowcase/PackageGrid предлагают
формат по размеру (фуршет/банкет/кофе-брейк), но конструктор должен подсказывать
формат исходя из guestCount (10–19 → кофе-брейк/частное; 20+ → фуршет; 50+ → банкет).

**П3. Диетическая гибкость в UI (O'Bagel).**
Modifiers (veg/gluten-free/substitution) + notes-поле для аллергий прямо в карточке.
→ У НАС: DishCard должен показывать диет-бейджи (веган/БГ/халяль) и позволять
исключить аллерген при добавлении в конструктор (14 аллергенов ТР ТС — фильтр).

**П4. Tiered packages + upgrades (orders.co).**
Базовый/средний/премиум по размеру + upgrades (десерт/напитки/onsite-сервис).
→ У НАС: PackageGrid уже tiered (Эконом/Стандарт/Премиум/Люкс) — конструктор
должен предлагать upgrade-модули (шеф-шоу, сомелье, кофе-бар) поверх пакета.

**П5. Frictionless flow (oyelabs).** Минимум шагов, видимый прогресс, понятный итог
«что выбрано / сколько гостей / итоговая цена» на каждом шаге. Сохранение состояния
(sessionStorage) при обрыве. → У НАС: конструктор-мастер (08) — 6 шагов, но каждый
шаг должен показывать live-итог (единая calcTotal), а не только финал.

**П6. Мемоability (Restaurant GEM, Awwwards).** on-hover dish preview, fullscreen menu,
page-transition видео → меню «запоминается» визуально. → У НАС: DishCard Ken Burns +
click-video (хиты), GalleryTeaser grouping по событию — но НАДО добавить
**уникальный запоминающийся жест**: напр. «живая линия меню» (карусель станций с
parallax) или hero-меню на главной (Restaurant GEM fullscreen menu).

### КАК У НАС СДЕЛАТЬ ЛУЧШЕ (синтез для MenuCritic/MenuUXCritic)
- Конструктор = **build-your-own линия порционно на гостя** (П1) + **подсказка формата
  по размеру** (П2) + **диет-фильтр/аллергены в UI** (П3) + **tiered + upgrades** (П4)
  + **live-итог на каждом шаге** (П5) + **запоминающийся жест** (П6).
- Это и есть «вау»: клиент собирает своё событие как конструктор Lego, видит цену
  мгновенно, не теряет прогресс, и меню визуально «живое» (Drinkit-паттерн).
- Преимущество над эталонами: у Dos Toros/Chopt НЕТ мгновенного PDF-КП и русского
  комплаенса; у нас будет (калькулятор <50ms + PDF + 152-ФЗ/ТР ТС).

→ Все паттерны выше должны лечь в раскадровки/спеки при сборке (Фазы 1–4, `05_BUILD`).
