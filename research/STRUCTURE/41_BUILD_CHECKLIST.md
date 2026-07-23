# 41 — BUILD CHECKLIST (единый чек-лист сборки со статусом) — ИСТОЧНИК ИСТИНЫ ДЛЯ СБОРЩИКА

**Читать ПЕРВЫМ** перед любой сборкой (после `39_CANON_INDEX.md`).
Этот файл устраняет разрыв между `04_BLOCKS.md` (имена блоков) и реальным кодом, и фиксирует **единый канон роутов** + **статус каждого блока** + **гейт между фазами**.

**Легенда статуса:**
- ✅ СДЕЛАНО — уже есть в коде, перекрасить в светлую.
- ♻️ ПЕРЕИСПОЛЬЗОВАТЬ — есть в коде под другим именем, сопоставить с `04` через `39`.
- 🆕 НОВЫЙ — дописать с нуля по спеце.
- 🔄 ПЕРЕИМЕНОВАТЬ — сменить путь/имя + 301-редирект.

---

## ШАГ 0 — ОБЯЗАТЕЛЬНОЕ ЧТЕНИЕ (до кода)
1. `39_CANON_INDEX.md` — мост спека↔код, канон темы/шрифтов/навигации.
2. `06_TOKENS.md` — светлая палитра (единственный источник цветов).
3. `05_BUILD.md` — фазы (этот чек-лист = его детализация).
4. `12_BLOCK_EXECUTOR_PROMPT.md` — шаблон для субагента-исполнителя блока.

> **ГЕЙТ ШАГА 0:** понимаешь ли ты, какой блок из `04` где реализован в коде? Если нет — вернись к `39`.
> **ДИСКЛЕЙМЕР (критик C, `44`):** текущий код в репозитории — **legacy/dark v1-сборка**. Документы (`04`/`41`/`43`) описывают **целевую светлую спецификацию** и ОПЕРЕЖАЮТ код. Расхождение спец↔код закрывается СБОРКОЙ по этому чек-листу, не означает ошибку спецы. Любой блок, помеченный 🆕/🔄 здесь, — задача сборки, а не пропуск в документах.
> **A11Y-ГЕЙТ (B21, критик C):** `SmoothScrollProvider` (Lenis) ДОЛЖЕН отключаться не только по `prefers-reduced-motion`, но и на `pointer:coarse` (тач). Добавить гейт `(matchMedia('(pointer: coarse)').matches || prefersReducedMotion)` → Lenis не инициализируется.

---

## ШАГ 1 — ФАЗА 0: ФУНДАМЕНТ (перекраска, НЕ с нуля)

| Действие | Статус | Гейт |
|---|---|---|
| Переписать `app/globals.css` под `06_TOKENS` (light) — только ЗНАЧЕНИЯ токенов, не имена | 🆕 | `grep -rniE "0A0A0A|F5F0EB|722F37|C9A96E|#141414|#121212|#262626|#A88B5A|#080808" app/ components/` → **0 совпадений** (тёмные HEX legacy; светлые ivory #FAF7F2 / ink #1C1815 / gold #B08D57 ОБЯЗАНЫ присутствовать в globals.css — их НЕ включаем в паттерн) |
| `components/ui/*` (shadcn) — НЕ трогать файлы, проверить primary=gold | ✅ | primary-кнопка золотая с ink-текстом |
| Переиспользовать `components/effects/*` (MagneticButton, ParallaxImage, AnimatedCounter, TextReveal, CustomCursor, Skeleton, SkipLink) | ✅ | импортируются без правок |
| `SmoothScrollProvider` (Lenis) + `ScrollToTop` + `Header`/`Footer`/`MobileBottomNav` перекрасить в светлую; убрать `ThemeProvider`/toggle | ✅ | светлый фон, тёмный текст, без dark-toggle |
| **РЕШЕНИЕ ПУТЕЙ (BUG-A закрыт):** НЕ переименовывать `components/sections/*` → `blocks/*`. **Оставляем `components/sections/` как есть**, новые блоки тоже кладём в `components/sections/{{BLOCK_NAME}}.tsx`. `12_BLOCK_EXECUTOR_PROMPT` обновлён под это. | 🔧 | все блоки в `components/sections/` |

> **ГЕЙТ ФАЗЫ 0:** палитра/типографика из токенов, хардкода нет; существующие секции читаемы на светлом (тёмный текст → светлый). Все scroll-анимации — Framer Motion (`whileInView`/`useScroll`), НЕ GSAP (gsap НЕТ в deps).

---

## ШАГ 2 — ФАЗА 1: HERO (идеально, потом остальное)

| Блок `04` | Файл в коде | Статус | Гейт |
|---|---|---|---|
| `HeroSection` (вариант В, живое фото) | `components/sections/HeroSection.tsx` | ✅ перекрасить + video | H1 «Кейтеринг, который чувствуешь заранее», CTA «Спланировать событие»→`/plan`, clip-path wipe, цена выше фолда, poster-LCP |

> **ГЕЙТ ФАЗЫ 1:** заказчик говорит «вау» И объективно: LCP<1.2s (poster `<img>`), INP<200ms (видео `preload=none`), reduced-motion → только poster.

---

## ШАГ 3 — ФАЗА 2: СЕКЦИИ ГЛАВНОЙ (по одной)

| № | Блок `04` | Файл в коде | Статус | Что сделать |
|---|---|---|---|---|
| 1 | `HeroSection` | HeroSection.tsx | ✅ | перекрасить (см. Шаг 2) |
| 2 | `TrustBar` | **влит в `SocialProofBar`** | ♻️ | добавить geometric frames + имена клиентов (Эрмитаж… 🟡 — НЕ подтверждены вебом, помечать 🟡, не публиковать как голый факт до сверки с заказчиком; см. FACTCHECK_REPORT_2026-07-20) |
| 3 | `AwardsStrip`→`TrustProof` | **влит в `SocialProofBar`** | ♻️ | вынести facts-ряд (`TrustProof variant:'facts'`) |
| — | `SocialProofBar` | SocialProofBar.tsx | ✅ | перекрасить, AnimatedCounter ок |
| 4 | `EventTypeSelector` | **`ServicesSection`** (НЕ переименовывать!) | ♻️ | перекрасить; вести на `/events/*` (см. Шаг 5) |
| 5 | `FormatShowcase` | **`ServicesSection`** (часть) | ♻️ | дописать цену/гость на карточки |
| 6 | `MenuPreview` | MenuPreviewSection.tsx | ✅ | перекрасить |
| 7 | `GalleryTeaser` | GallerySection.tsx | ✅ | +parallax masonry; **focus-trap в lightbox** (A6) |
| 1-bis | `InspireStrip` | — | 🆕 | короткий блок «Вдохновись» выше фолда |
| 6-bis | `HomeVideoShowcase` | — | 🆕 | full-bleed видео (facade, НЕ autoplay) |
| 7-bis | `EventsRecapHome` | — | 🆕 | reel-хайлайты |
| 8 | `WhyUs` (история бренда) | **ЧАСТИЧНО:** `PhilosophySection.tsx` УЖЕ ЕСТЬ в `components/sections/` (5678 байт, экспорт `PhilosophySection`), но НЕ заимпортирован в `app/page.tsx` | ♻️ | дописать до `WhyUs` (история Дмитрий Нилов + count-up), заимпортить в page. Файл НЕ удалять (критик A BUG-1) |
| 9 | `TestimonialsCarousel` | TestimonialsSection.tsx | ✅ | +aria-live; Review JSON-LD |
| 10 | `ProcessSteps` | ProcessTimeline.tsx | ✅ | 4→5 шагов; убрать autoplay-фон (B6) |
| 11 | `LiveInstagramFeed` | — | 🆕 | VK первичен, IG вторичен (реальные ссылки) |
| 12 | `CTASection` | CTASection.tsx | ✅ | перекрасить; единый глагол C9 |
| 13 | `FAQTeaser` | FAQSection.tsx | ✅ | аккордеон → `/faq` |

> **ГЕЙТ ФАЗЫ 2:** каждая секция отдельный промпт (через `12_BLOCK_EXECUTOR_PROMPT`); проверка motion/a11y на каждой; Framer Motion (НЕ GSAP).

---

## ШАГ 4 — ФАЗА 3: РОУТЫ (ЕДИНЫЙ КАНОН — BUG-D закрыт)

**КАНОН РОУТОВ (источник истины для сборки):**
- Существующие роуты в коде: `/about`, `/testimonials`, `/services`, `/menu`, `/gallery`, `/team`, `/constructor`, `/quote`, `/pricing`, `/contact`, `/faq`, `/blog`, `/offer`, `/privacy`, `/terms`, `/cookies`.
- **Новая IA (`02_IA`):** `/events/*`, `/why-us`, `/reviews`, `/seasonal`, `/plan/*`.

**ПОРЯДОК ДЕЙСТВИЙ (чтобы не было мёртвых ссылок — BUG-C закрыт):**
1. **СНАЧАЛА** обновить `lib/data.ts` navItems → канон (`02_IA`): События/Меню/Галерея/Почему мы/Команда/Отзывы/Сезонное + тел/WA/ТГ + CTA «Спланировать».
2. **ПОТОМ** переименовать роуты + 301-редиректы (`next.config` или `middleware.ts`):
   - `/services/*` → `/events/*` (svadba/korporativ/chastnoe/detskoe/vypusknoy/chef-at-home)
   - `/about` → `/why-us`
   - `/testimonials` → `/reviews`
   - `/quote` → `/plan/calculator`
   - `/constructor` → `/plan/constructor`
   - `/pricing` → редирект на `/plan/calculator`
   - 🆕 `/seasonal`, `/plan` (хаб), `/events/recap`
   - 🆕 `/plan/helper` (wizard «Я не знаю, что мне нужно — помогите» 🟡 G1/G5/G7 — точка входа новичка, см. `43_NAV_SPEC` §2; *[CoherenceChecker C11: унифицировано с `04:386`/`43` §2 — «помогите», не «помоги»]*)
   - 🆕 `/help/formats` (глоссарий форматов, Григорий G2 — из футера, см. `43_NAV_SPEC` §4)
   - 🆕 `/allergens` (легенда 14 аллергенов ТР ТС 021/2011, NINA — см. `43_NAV_SPEC` §4)
   - `/team` — УЖЕ существует (`app/team`), оставить как есть; добавить в navItems (`43_NAV_SPEC` §1)
   - 🆕 ПОЛНЫЙ КАНОН из `02_IA` (НЕ усечённый, критик A BUG-4): `/account/orders` (Петя P1/P2), `/partners` (B2B, Волна 11), `/subscribe` (регулярные, Сергей), `/media-kit` (пресса, Юлия), `/thank-you` (после заявки), `/offer` (PDF-КП из калькулятора), `/delivery`, `/certificates`, `/faq`, `/blog`, `/privacy`, `/terms`, `/cookies`, `/404`. **ПЛЮС GapHunter (F):** `/venues` (площадки, блок `VenueList`), `/tasting` (дегустация bookable, блок `TastingBooking`), `/accessibility` (заявление WCAG), `/en` (EN-версия, опц.), `/careers` (мы нанимаем, опц.). Все они либо УЖЕ есть в `app/`, либо создаются по `02_IA`. Сборщик НЕ должен их выкидывать из scope.
3. Проверить, что ВСЕ внутренние ссылки в секциях ведут на новые роуты (grep на старые пути → 0).

> **ГЕЙТ ФАЗЫ 3:** `grep -rn "/about\|/testimonials\|/services\|/quote" app/ components/ lib/` → **0** (все ссылки на новые роуты).
> **Примечание (критик A BUG-5 — false positive):** `07_CALCULATOR_SPEC.md` и `08_CONSTRUCTOR_SPEC.md` **СУЩЕСТВУЮТ** в `research/STRUCTURE/` (проверено `ls`). Критик ошибочно заявил об их отсутствии. Ссылки на них в `05`/`04`/`12` валидны.

---

## ШАГ 5 — ГЛОБАЛЬНЫЕ ФИЧИ (реально отсутствующие — BUG-F уточнён)

| Фича | Статус | Где |
|---|---|---|
| `StickyMobileCTA` | 🆕 | компонент + OR-контракт с `MobileBottomNav` (ровно 1 снизу) |
| `AnnouncementBar` | 🆕 | в `layout.tsx`, season-config |
| `TextSizeToggle` | 🆕 | Виктор V1, в Header + Footer |
| `AvailabilityCalendar` | 🆕 | на `/plan/*` и `/contact` |
| `MobileBottomNav` = 5 пунктов | 🔄 | сейчас 2; контракт B3. **Мёртвая ссылка `/#calculator`** (`MobileBottomNav.tsx:9`) — секции `#calculator` на главной НЕТ → заменить на `/plan/calculator` (критик A BUG-7) |
| 152-ФЗ бейдж + `/delivery`, `/certificates` | 🆕 | Footer + страницы |
| Реальные соц-ссылки (VK/IG/WA/ТГ) | 🔄 | Footer `socialLinks` (сейчас `href="#"`); убрать все `href="#"` (критик A: Telegram/VK/IG мёртвые) |

---

## ШАГ 5.5 — МОДУЛИ КАЛЬКУЛЯТОРА/КОНСТРУКТОРА (🆕, закрывает C7-02/C7-03)

> Независимый критик C7 (2026-07-20) обнаружил dangling-ссылки в `07`/`08`: спецы импортируют модули,
> которых **нет на диске** (→ `Module not found` при сборке). Фикс: явно зафиксировать их создание как 🆕 задачи Фазы 4.
> Не править спецы `07`/`08` — они корректны, модули создаются в процессе сборки.

| Модуль | Статус | Действие |
|---|---|---|
| `lib/pricing.ts` | 🆕 | Создать: перенести `calcTotal` + `PRICE_PER_GUEST` + `ADDONS` + `MIN_GUESTS` + `CHILD_RATE` из `07_CALCULATOR_SPEC` (`07:63-153`). Источник чисел — `NILOV_UNIFIED_MENU.md` (корень репо). BUG-F2 (цена 950↔390) сверить с прайсом до прод-релиза. |
| `addons.json` | 🆕 | Создать: 14+ позиций аддонов из `07:136-153`. |
| `hooks/useCalculator.ts` | 🆕 | Создать: хук состояния калькулятора (опирается на `lib/pricing.ts`). НЕ путать с существующим `hooks/useConstructor.ts`. |
| `components/calculator/*` | 🆕 | Создать (`CalculatorApp`/`FormatSelector`/`GuestsSlider`/`TierSelector`/`ResultDisplay`/`LiveSummaryBar` из `07:185-205`): переиспользовать `components/quote/QuoteForm` как базу. **НЕ создавать отдельный `/api/calculate` — калькулятор = клиентский расчёт `calcTotal` + алиас к `/api/quote` (см. строку 130).** |
| `POST /api/calculate` | 🆕 | Алиас → существующий `app/api/quote` (или новый route), см. `05:79`. |
| `zod`-схемы (`07`/`08`) | 🆕 | Добавить `contactSchema` (`name:z.string().min(2)`, `phone:z.string().regex(/^\+7\d{10}$/)`, `date:z.string().min(1)`, `comment:z.string().optional()`) + `z.infer` типы; импорт из `zod` (в deps `^4.4.3`). Закрывает C7-05. |
| `catalog.json` (`08:149`) | 🆕 | Fallback-источник каталога блюд при отсутствии CMS (синхронизировать с `04:88,973` → CMS-коллекция `Dish`). |
| `lib/video.ts` (`04:321`, тип `VideoProvider`) | 🆕 | Создать: единая точка свопа видео-провайдера РФ-стека (`'rutube'|'selfhost'`, БЕЗ vimeo — запрещён в РФ). Зависят 6+ блоков (`HomeVideoShowcase`/`EventsRecap`/`GalleryMasonry`/`TestimonialsCarousel`/`ShowCookingGrid`/`EventHero`). Экспорт `VideoRef`, `getEmbedUrl`, `VIDEO_PROVIDER_DEFAULT='rutube'`. |
| `zod`-схемы calc/constructor-входов (`07`/`08`) | 🆕 | Помимо `contactSchema` (ниже) — `z.object` для входов калькулятора (`format`, `guests`, `tier`) и конструктора (State), с `z.infer`-типами. `08:53` «Zod realtime» ⇒ схемы обязательны, НЕ опциональны. Закрывает C7-T3. |

> ГЕЙТ 5.5: `grep -rn "from 'lib/pricing'\|from '@/lib/pricing'\|addons.json\|useCalculator\|from 'lib/video'\|from '@/lib/video'" components/ app/` → все импорты резолвятся (файлы созданы, включая `lib/video.ts`).

---

## ШАГ 5.6 — CMS-СЛОЙ (Sanity free / Strapi self-host) — ЗАКРЫВАЕТ CMS-КРИТИКА (CRITIC_CMS_CMO_REPORT.md, bug A1–A4)

> **КРИТИЧНО (независимый CMO-критик, 2026-07-20):** CMS-аннекс `04_BLOCKS:80-106` **осиротен** от плана сборки —
> в `package.json` 0 CMS-зависимостей, `lib/pricing.ts`/`catalog.json`/`lib/video.ts` не существуют, весь контент —
> хардкод в `lib/data.ts` + инлайн-копирайт в компонентах. Заказчик СЕГОДНЯ не может править НИЧЕГО без девелопера.
> Этот шаг СВЯЗЫВАЕТ спеку `04` с реальной сборкой: CMS собирается ДО наполнения контентом, чтобы ИП Нилов правил сам.

| Модуль | Статус | Действие |
|---|---|---|
| CMS-провайдер (Sanity free ИЛИ Strapi self-host) | 🆕 | `pnpm add sanity` ИЛИ `pnpm add @strapi/strapi` (см. `04:80-82`, бюджетный стек — Storyblok $99/мес ЗАПРЕЩЁН). Sanity free = 20 seats, $0; Strapi = self-host на том же VPS РФ, $0. |
| 11 CMS-коллекций (`04:86-100`) | 🆕 | Создать схемы: `Dish`, `Station`, `VideoClip`, `Review`, `PricingConfig`, `PageText`, `SeasonalConfig`, `TeamMember`, `BlogPost`, `Package`, `TrustProofItem`/`FooterColumn`/`FAQItem`. ВЯЗКА 1:1 к блокам `04`. |
| Перенос `lib/data.ts` → CMS | 🆕 | `menuItems`(78 SKU)→`Dish`; `testimonials`→`Review`; `teamMembers`→`TeamMember`; `faqItems`→`FAQItem`; `blogPosts`→`BlogPost`; `PricingPackage[]`→`PricingConfig`; `stats`(SocialProofBar)→`TrustProofItem`; `Service[]`/`AdditionalService[]`→`Package`/`PricingConfig.addons`; `GalleryImage[]`→`Dish.photo` (галерея = подборка Dish) либо `Package`. Закрывает bug B5–B13 (хардкод). |
| Инлайн-копирайт → `PageText` | 🆕 | `HeroSection` H1/sub/overline, `Footer` колонки/контакты/соц-ссылки (убрать `href="#"` → реальные VK/IG/WA/ТГ из `PageText`), `CTASection` trust-бейджи, `SocialProofBar` → читать из CMS, НЕ из `lib/data.ts`. Закрывает bug B14–B17, B19. |
| SSOT-фиксация | 🆕 | Код БОЛЬШЕ НЕ источник истины. Единый SSOT = CMS. `HeroSection.tsx:93` («Гастрономия мирового уровня»/«19 лет») → заменить на `PageText` из канона `04:379-380` («Кейтеринг, который чувствуешь заранее» / «18 лет (с 2007) 🟡»). Закрывает bug C20–C21 (рассинхрон). |
| RBAC (`04:102-104`) | 🆕 | Роль «Редактор-контент» (все коллекции кроме формул) + «Менеджер-цены» (только `PricingConfig` + `approved`/`priceValidUntil`). `calcTotal`/парсер URL остаются в коде (R-B). |
| ISR `revalidate 3600` | 🔄 | уже заложен в `04`/`08` — подключить к CMS-фетчу, чтобы правка в админке обновляла сайт БЕЗ деплоя. |

> **ГЕЙТ 5.6:** `grep -rn "sanity\|@sanity/client\|strapi" package.json` → зависимость есть; `lib/data.ts` НЕ импортируется компонентами напрямую (контент из CMS); `Footer.tsx` НЕ содержит `href="#"`; `HeroSection` H1 == канону `04:379`. Без прохождения гейта заказчик НЕ сможет править контент → блокирует вердикт «самообслуживание».

---

## ШАГ 6 — SEO + ИНТЕРАКТИВ (конец)

- JSON-LD (Organization, LocalBusiness, Menu, Offer, FAQPage, AggregateRating) + `llms.txt` + `sitemap.xml` + `robots.txt`.
- `Calculator` (=QuoteForm + count-up) + `Constructor` (мастер 6 шагов + CustomMenuBuilder + AllergenFilter).
- Photo-alive hover (Drinkit-паттерн) на `DishCard`/`GalleryMasonry`.
- [GapHunter G7] Аналитика: GA4 + Clarity/Hotjar (или эквивалент) — обязательны для приёмки (catercamp: аналитика + тепловые карты). Добавить в `layout.tsx` (self-hosted/no-PD-за-рубеж, РФ-резидентство соблюдено).

## ШАГ 5.9 — SERVICE ACCEPTANCE (дублирует §8 `SERVICE_DELIVERY_SPEC.md`)

> Обязательный раздел приёмки сервиса. Критерии взяты из `SERVICE_DELIVERY_SPEC.md` (§1/§2/§3/§4/§6/§8) — без их прохождения «премиум-сервис» считается НЕ построенным, только описанным. Биндинг из `04_BLOCKS.md:924-932`.

| Критерий приёмки | Источник спецы | Гейт |
|---|---|---|
| **Сервис-норма в смете** — `calcTotal` (`07`) возвращает `service = staffCost + coordinatorCost + setupCost + coldChain` и `serviceBreakdown` (`staffCount/ratio/coordinator/setupHours`); `liveSummary` конструктора (`08`) несёт те же поля | §1/§2/§4, `04:1064-1068`, `07 calcTotal`, `08:23,26` | калькулятор/конструктор показывают блок «Сервис-норма: N сотрудников (1:R), on-site координатор, сетап 7 ч»; строка видна клиенту как честная расшифровка (НЕ скрыта) |
| **Норма персонала по типу события** — банкет 1:12-15, chef-at-home/частное 1:8-10, фуршет/кофе-брейк 1:15-20; `staffCount = ceil(guests/ratio)` | §1, `04:639-648` | разработчик берёт норму из маппинга `EventTypeSelector`, НЕ догадывается |
| **On-site координатор** — ОБЯЗАТЕЛЬНО на каждом событии (flat `COORDINATOR_FLAT`), независимо от `staffCount` | §4, `04:1066` | в каждой смете присутствует строка координатора |
| **Холодовая цепь в доставке** — реф-фургоны, логгеры ≤+6 °C, разрыв >+8 °C/30 мин → утилизация; стоимость реф-логистики ВКЛЮЧЕНА в `pricePerGuest` (внутри КАД) | §3, `04:1944`, `07 COLD_CHAIN_COST` | `DeliveryZonesMap` показывает режим холодовой цепи; вне КАД — надбавка `extraZoneDelivery` |
| **Ставки исчислимы** — `STAFF_RATE[format]` ₽/FTE-час, `COORDINATOR_FLAT` ₽, `SETUP_RATE` ₽/ч заданы явно в `07` рядом с `PRICE_PER_GUEST` | `07` (Итерация 4), `04:1065` | разработчик может посчитать сумму сервис-нормы, не догадываясь |
| **SLA ответа** — `slaResponseHours=2`, подтверждение брони по `slaBookingConfirm='O3'` | §6, `04:331,334` | `AvailabilityCalendar` несёт оба поля; статус «подтверждено» отображается в шаге 6 конструктора (`08:53`) |
| **Пост-звонок +24ч** — follow-up координатора (CRM-процесс, НЕ on-site); `ProcessSteps` шаг 5 | §2, `04:885,931` | триггер follow-up привязан к `ProcessSteps` (НЕ к `TestimonialsCarousel`) |
| **Мин. гостей vs норма** — `MIN_GUESTS` (`07`): фуршет 20 / банкет 15 / кофе-брейк 10 / mobile-furshet 10; цена покрывает персонал (обосновано в `07`) | §1/§2, `04:1071` | валидация калькулятора/конструктора тянет `MIN_GUESTS` из `07` |

> **ГЕЙТ 5.9:** смета калькулятора и конструктора содержит видимую строку «Сервис-норма» с расшифровкой персонала/координатора/сетапа; холодовая цепь отражена в `DeliveryZonesMap`; SLA-поля присутствуют в `AvailabilityCalendar` и шаге 6 конструктора. Иначе блок «премиум-сервис» — декларация, не реализация.

---

> **ФИНАЛЬНЫЙ ГЕЙТ:** `pnpm build` exit 0; Lighthouse a11y AA; axe 0 critical; CWV «Good»; GA4+Clarity подключены.
