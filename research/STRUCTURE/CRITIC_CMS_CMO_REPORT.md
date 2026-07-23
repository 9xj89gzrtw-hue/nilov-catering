# CMO-КРИТИК (CMS / самообслуживание заказчика) — отчёт

**Роль:** независимый критик-субагент. Точка зрения: ИП Нилов (НЕ-технический заказчик) хочет править ВЕСЬ контент сам, без разработчика.
**Источники:** `29_CMS_CRITIC.md`, `04_BLOCKS.md` (в т.ч. CMS-аннекс строки 80–106), `41_BUILD_CHECKLIST.md`, реальный код репозитория `catering-site/`, web (headless-CMS 2026: Sanity/Storyblok/Strapi).
**Дата:** 2026-07-20.

---

## ⚠️ ГЛАВНЫЙ ВЫВОД

**Заказчик сегодня НЕ может править НИЧЕГО без разработчика.** CMS-слой, красиво описанный в `04_BLOCKS:80-106` (Sanity free / Strapi, 11 коллекций, RBAC), **на 100% не построен**. Реальный код — это 1830 строк захардкоженного контента в `lib/data.ts` плюс копирайт, вшитый в компоненты. `package.json` не содержит ни одной CMS-зависимости. Нет ни одного файла конфигурации CMS.

То есть: спецификация *обещает* самообслуживание, но *сборка* ещё не начала интеграцию CMS. Заказчик без дева не поменяет ни цену, ни меню, ни отзыв, ни видео, ни текст — потому что дев сначала должен построить всю CMS-прослойку (большой объём работы) и перенести весь контент.

**Вердикт: REWORK. Оценка 3/10.**

---

## ОЦЕНКА (по вопросу пользователя)

| # | Критерий | Оценка | Обоснование |
|---|---|---|---|
| 1 | Спек-архитектура «клиент правит сам» (полнота моделей) | **7/10** | Коллекции `Dish/VideoClip/Review/PageText/TeamMember/BlogPost/SeasonalConfig/Package/TrustProofItem/FAQItem/FooterColumn` + `PricingConfig` + RBAC описаны чисто и 1:1 к блокам. НО есть дыры (см. ниже). |
| 2 | Реальность в коде (что есть СЕЙЧАС) | **0/10** | CMS на 0% построена. Весь контент — хардкод в TS/JSX. Ноль self-service. |
| 3 | Стек-фит для НЕ-технаря (1 чел, без дева) по web-2026 | **4/10** | Выбран Sanity/Strapi. По web-2026: Sanity Studio «depends on developer setup», «scary for non-techie without custom»; Strapi требует дева вообще. Лучший для нетехнаря — Storyblok — **запрещён бюджетом** ($99/мес). Сомнительный trade-off для этого пользователя. |
| **Итог** | **«заказчик правит ВЕСЬ контент без девелопера»** | **3/10** | Архитектура звучит правильно (поднимает выше исходных 1.3/10 из `29_CMS_CRITIC`), но она необеспечена кодом, имеет реальные пробелы в покрытии контента и выбран не самый friendly стек. |

---

## SINGLE-SOURCE-OF-TRUTH?

**НЕТ единого источника.** Контент раскидан минимум по 3 местам и код является «источником истины», а не CMS:
- `lib/data.ts` (menuItems, testimonials, teamMembers, faqItems, blogPosts, pricing packages, stats, galleryImages, services, additionalServices, navItems)
- инлайн в компонентах (`HeroSection` копирайт, `Footer` колонки/ссылки/контакты, `CTASection` бейджи, `SocialProofBar` факты)
- роуты / `next.config`

Доказательство рассинхрона (две «истины» уже разошлись):
- Код `HeroSection.tsx:93` → H1 **«Гастрономия мирового уровня…»**, лет **«19 лет»**.
- Спек `04_BLOCKS:379` / `09` → канон H1 **«Кейтеринг, который чувствуешь заранее.»**, **«18 лет (с 2007)»**.
Контент живёт в коде, а не в едином SSOT → классическая дыра «контент разъехался».

---

## БЛОКИ, КОТОРЫЕ НЕ РЕДАКТИРУЮТСЯ ИЗ CMS

**Сегодня (в коде): НЕ редактируется ВООБЩЕ ничего** — все блоки читают хардкод.

**Даже если собрать CMS по спеке `04_BLOCKS:80-106`, останутся НЕ в CMS** (нет коллекции в списке 88–100):
- `NavItem` (navItems) — навигация шапки/футера (в коде `lib/data.ts:112`)
- `Stats` / SocialProofBar факты («18 лет / 3000+») — `lib/data.ts:106`, нет коллекции (TrustProofItem частично, но stats отдельно)
- `Service[]` (EventTypeSelector — типы событий) — `lib/data.ts:89`, нет коллекции
- `AdditionalService[]` (аддоны/допуслуги) — `lib/data.ts:98`, нет коллекции (PricingConfig.addons — только цены)
- `GalleryImage[]` (галерея) — `lib/data.ts:61`, нет коллекции
- Контакты + соц-ссылки (тел/WA/ТГ/VK/IG/адрес) — `Footer.tsx:5,99-119`, `href="#"` мёртвые; FooterColumn их не покрывает полностью
- 152-ФЗ бейдж / legal-тексты — инлайн, нет коллекции
- CTASection trust-бейджи — `CTASection.tsx:44`, инлайн
- AvailabilityCalendar `occupiedDates` — внешняя CRM (по спеке), не CMS
- NewsletterSignup — нет коллекции

**По дизайну НЕ отдаётся клиенту (верно):** логика `calcTotal` (gamma/early_booking), структура компонентов `04`, алгоритм парсера URL (`04_BLOCKS:106`).

---

## BUG-LIST (file:line)

**A. CMS вообще не построена (критическое):**
1. `package.json:11-35` — ноль CMS-зависимостей (`sanity`/`@sanity/client`/`storyblok`/`strapi`/`contentlayer`/`payload` отсутствуют). Интеграции нет.
2. `41_BUILD_CHECKLIST.md:104-134` — НЕТ ни одного шага «установить/настроить Sanity или Strapi» и «связать 11 коллекций». CMS-аннекс `04_BLOCKS:80-106` **осиротен** от плана сборки; вместо него `catalog.json`/`lib/pricing.ts`/`lib/video.ts` помечены 🆕 как fallback-файлы.
3. (отсутствует) `lib/pricing.ts` / `catalog.json` / `lib/video.ts` — не существуют в репо (grep → 0 совпадений). Цены/меню/видео вообще не вынесены даже в локальные файлы.
4. (отсутствует) любой CMS-конфиг (`SANITY_PROJECT_ID`, `.env`, `*.sanity.io`) — grep по репо → только упоминание слова sanity в `29_CMS_CRITIC.md:72` (текст, не код).

**B. Контент захардкожен (нужен дев, чтобы править):**
5. `lib/data.ts:150` — `menuItems` (78 SKU) — нет коллекции `Dish`.
6. `lib/data.ts:24` — `testimonials` — нет `Review` (модерация `approved` отсутствует в коде).
7. `lib/data.ts:34` — `teamMembers` — нет `TeamMember`.
8. `lib/data.ts:43` — `faqItems` — нет `FAQItem`.
9. `lib/data.ts:49` — `blogPosts` — нет `BlogPost`.
10. `lib/data.ts:72` — `PricingPackage[]` (цены пакетов) — нет `PricingConfig`.
11. `lib/data.ts:106` — `stats` (SocialProofBar) — нет коллекции.
12. `lib/data.ts:89` — `Service[]` (типы событий); `:98` — `AdditionalService[]` (аддоны) — нет коллекций.
13. `lib/data.ts:61` — `GalleryImage[]` — нет коллекции.
14. `components/sections/HeroSection.tsx:82,93,103` — H1/sub/overline хардкод; `:55-72` видео хардкод (SVG). Нет `PageText`, нет `VideoClip`/Rutube.
15. `components/layout/Footer.tsx:5` (`socialLinks href="#"`) `:28` (копирайт) `:73-78` (колонки) `:99-119` (контакты) — хардкод; нет `FooterColumn`; соц-ссылки мёртвые `#`.
16. `components/sections/SocialProofBar.tsx:1` — `stats` из `lib/data`.
17. `components/sections/CTASection.tsx:44` — trust-бейджи инлайн.
18. `components/sections/TestimonialsSection.tsx:7` — импорт `testimonials` из хардкода.
19. `app/menu/MenuPageClient.tsx:6` — `menuItems` из хардкода.

**C. Рассинхрон SSOT / спецификация:**
20. `HeroSection.tsx:93` («Гастрономия мирового уровня») vs `04_BLOCKS:379` (канон «Кейтеринг, который чувствуешь заранее») — контент разъехался между кодом и спекой.
21. `HeroSection.tsx:103`/ любой «19 лет» vs `04_BLOCKS:380` «18 лет (с 2007)» 🟡 — расхождение факта.

**D. Стек-фит (web-2026):**
22. `04_BLOCKS:80-82` — бан Storyblok ($99/мес) и выбор Sanity free / Strapi. По web-2026 (Luckymedia, AttractGroup, Pagepro): Storyblok — «particularly intuitive… editors see live preview», лучший для нетехнаря; Sanity Studio — «depends on developer setup», «scary for non-techie without custom»; Strapi — требует дева. Для заявленной цели «1 человек, без дева» выбран не самый подходящий стек; trade-off «сэкономить $99 vs нанять дева под Sanity Studio» для этого пользователя спорный.

---

## ВЕБ-СВЕРКА 2026 (headless CMS, нетехнический редактор)

- **Storyblok** — winner для нетехнического редактора: visual block editor, live preview, «editors see a live preview as they work» (luckymedia.dev, pagepro.co). Идеально ложится на блочную сборку `04_BLOCKS`. Минус: платный ($99/мес) — в спеке **запрещён бюджетом**.
- **Sanity** — гибкий, бесплатный free-tier (20 seats), но «non-technical user friendliness … Depends on developer setup» (attractgroup). Studio из коробки «scary for non-techie without custom» → нужен дев, чтобы сделать友好й UI. Хорошо, но требует dev-билда Studio под заказчика.
- **Strapi / Payload (self-host)** — «only if client does NOT edit himself; needs dev for admin» (как в `29_CMS_CRITIC`). Отметается под цель «без девелопера».
- **Вывод:** для ИП Нилова (1 чел, хочет править сам) реалистичный путь «построил один раз — дальше сам» = **Storyblok** (turnkey) или **Sanity при условии, что дев собрал кастомный friendly Studio**. Голый Sanity/Strapi без dev-доводки для нетехнаря — рискованно.

---

## ЧТО УЖЕ ХОРОШО (не занижаем)

- Архитектура CMS в спеке `04_BLOCKS:80-106` чистая, регулярная, 1:1 к блокам — если собрать, поднимет удобство до 8–9/10.
- ISR `revalidate 3600` заложен → контент будет обновляться без полного деплоя.
- Разделение «клиент правит входные цены, формула в коде» (`04_BLOCKS:84,106`) — правильная граница.

---

## ИТОГ ДЛЯ ПОЛЬЗОВАТЕЛЯ

«Заказчик правит ВЕСЬ контент без девелопера» **сейчас НЕ реализовано (0/10 в коде)**, потому что CMS-слой существует только на бумаге `04_BLOCKS:80-106`. Чтобы закрыть вопрос:
1. **Добавить шаг CMS в `41_BUILD_CHECKLIST`** (сейчас осиротен) — выбор + установка + вязка 11 коллекций.
2. **Перенести весь хардкод `lib/data.ts` + инлайн-копирайт в CMS** (bug-list B5–B19).
3. **Закрыть дыры покрытия** (nav, stats, services, addons, gallery, contacts, legal) — либо коллекциями, либо явно зафиксировать «в коде, правит дев».
4. **Переоценить стек**: для нетехнаря Storyblok (turnkey) vs Sanity+dev-Studio; бюджетный запрет Storyblok может стоить найма дева под Sanity.
4. **Единый SSOT**: код больше не должен быть источником правды (bug-list C20–C21 — контент уже разъехался).

**Вердикт: REWORK · 3/10.**
