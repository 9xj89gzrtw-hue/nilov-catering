# CRITIC COMMISSION 15 — SEO Expert (независимая строгая критика SEO-структуры NiloV Catering)

**Объект:** только спецификация `research/STRUCTURE/*` + фактический код `app/` (перекрёстная проверка утверждений спецы кодом).
**ДНК:** светлая премиум (канон `01_VISUAL_DNA`, `06_TOKENS`, `39_CANON_INDEX`).
**Метод:** я НЕ автор документов и НЕ обязан соглашаться с их самооценками. Проверяю цитатами `file:line`. Где спека пишет «закрыто», сверяю с кодом — и нахожу прямое опровержение.

---

## 1. Роль

Независимый SEO-эксперт. Оцениваю **только SEO-составляющую структуры**: семантику/IA, URL-структуру, метаданные, structured data (LocalBusiness / Event / Review / AggregateRating), внутреннюю перелинковку, локальное SEO СПб, контент-кластеры, canonical / внешний домен. Не оцениваю визуал, motion, копирайт как таковой (только их SEO-влияние). Скоринг 0–10, строго.

---

## 2. Прочитано (реально, с цитатами)

| Файл | Статус проверки |
|---|---|
| `02_IA.md` | полностью (212 строк) — sitemap, канон slug'ов, редиректы |
| `04_BLOCKS.md` | полностью (2275 строк) — БЛОК 30 `SchemaBlock`, JSON-LD, per-page SEO-контракт, llms.txt, локальные поля, Blog |
| `13_BENCHMARK_SYNTHESIS.md` | полностью (48 строк) |
| `14_GAP_ANALYSIS.md` | полностью (39 строк) |
| `39_CANON_INDEX.md` | полностью — мост спецы↔кода (подтверждает рассинхрон) |
| Код `app/` (перекрёстная проверка) | `layout.tsx`, `sitemap.ts`, `robots.ts`, `services/*/page.tsx`, `*/layout.tsx`, `team/page.tsx`, `contact/layout.tsx` |
| Контекст | `21_LOGIC_AUDIT.md`, `C6_TRUST_FACTCHECK_CRITIC.md`, `CRITIC_W3_C9_GAPS.md`, `CRITIC_W7_C9_GAPS.md`, `BENCHMARK_CRITIC_2026.md`, `30_REVIEWS_CRITIC.md` — для верификации домена/claim'ов |

---

## 3. Сводная таблица по осям (скоринг по каждой)

| Ось | Оценка | Обоснование (кратко) |
|---|---|---|
| Семантика / IA | 7/10 | Клиентоцентричная IA хороша, канон slug'ов прописан; НО код живёт в старой IA (`/about`,`/services`,`/testimonials`) |
| URL-структура | 6/10 | RU-канон разумен, редиректы описаны; НО фактический код не соответствует канону (см. bug 3) |
| Метаданные (title/description/OG) | 5/10 | `layout.tsx` даёт OG/Twitter для главной; per-page контракт в спеце есть (04:1248) — НО в коде он НЕ реализован для большинства страниц, а canonical битый (bug 1) |
| Structured data (LocalBusiness/Event/Review) | 3/10 | LocalBusiness-поля продуманы; НО нет `Event` вообще, нет `BreadcrumbList`, geo/адрес — заглушки/ошибка (bug 5,6,8) |
| Внутренняя перелинковка | 4/10 | Есть breadcrumbs-UI и 1 CTA в блоге; НЕТ модели контент-кластеров и тематической link-графы (bug 10) |
| Локальное SEO СПб | 3/10 | Локальные поля есть, но гео-ошибка (область≠город), адрес — «уточнить», домен недоступен, внешний рейтинг не подключён (bug 6,7,16) |
| Контент-кластеры / блог | 5/10 | `/blog` заявлен как SEO-двигатель, rubric-фильтр есть; НО нет pillar↔cluster связки и динамического sitemap (bug 10,13) |
| canonical / внешний домен | **0/10** | Canonical в коде указывает на **чужой домен `odaeda.ru`** (bug 1) — критичный, почти фатальный дефект |
| **ИТОГ (взвешенно по SEO-значимости)** | **5.0 / 10** | Спасают IA и продуманность LocalBusiness-полей; топят внешний canonical + хаос доменов + устаревший sitemap |

> Предыдущие критики уже ставили SEO-ось **5/10** (`CRITIC_W3_C9_GAPS:17`) и **6/10** (`CRITIC_W7_C9_GAPS:19`). Мой независимый строгий пересмотр с учётом кода **подтверждает низ**, а по canonical — ухудшает до критического. Я НЕ завышаю.

---

## 4. Bug-list (≥10, с file:line + альтернативой)

**BUG-01 (FATAL) — canonical указывает на ВНЕШНИЙ чужой домен `odaeda.ru`.**
`app/services/weddings/page.tsx:14`, `app/services/corporate/page.tsx:14`, `app/services/private/page.tsx:14`, `app/pricing/layout.tsx:6`, `app/gallery/layout.tsx:6`, `app/quote/layout.tsx:6`, `app/menu/layout.tsx:6`, `app/team/page.tsx:10`, `app/contact/layout.tsx:6`.
Все несут `alternates: { canonical: "https://odaeda.ru/..." }`. Спеце канон — `https://nilov-catering.ru` (`04_BLOCKS.md:1291`), а `odaeda.ru` — стороний сайт (ревью `critic1_review.json` прямо помечено «NILUS CATERING WEBSITE REVIEW (odaeda.ru)»). Итог: поиск получает сигнал «канонический источник этого контента — чужой домен», что ведёт к **дедупликации/обесцениванию** всех страниц NiloV.
*Альтернатива:* заменить на `https://nilov-catering.ru` + относительный путь (self-canonical через `metadataBase` из `layout.tsx:15`), либо вообще убрать `alternates.canonical` на этих layout'ах и полагаться на `metadataBase` + `/`.

**BUG-02 (FATAL) — три конфликтующих домена в одном проекте.**
1) canonical = `odaeda.ru` (код, bug 1); 2) `metadataBase` + спеца = `nilov-catering.ru` (`layout.tsx:15`, `04_BLOCKS.md:1291`); 3) `sitemap`/`robots` = `nilov-catering.vercel.app` (`sitemap.ts:3`, `robots.ts:6`). Поисковые сигналы противоречат друг другу → ни один домен не получает чистого link-equity.
*Альтернатива:* выбрать ЕДИНЫЙ прод-домен (`nilov-catering.ru`), прописать его во все три места + директиву `Host` в `robots.ts`.

**BUG-03 (HIGH) — `sitemap.ts` устарел относительно IA и ссылается на недели-домен.**
`sitemap.ts:3,7-11`. `BASE_URL="https://nilov-catering.vercel.app"`; список содержит **удалённые** роуты `/about`,`/services`,`/testimonials`,`/pricing`,`/quote` (по `02_IA.md:108-128` они переименованы в `/why-us`,`/events`,`/reviews`,`/plan/calculator`). При этом **ни одного** нового каноничного роута (`/why-us`,`/events/svadba`,`/menu/furshet`,`/plan/calculator` и т.д.) в sitemap **нет**. Блог — 6 захардкоженных URL. Спеца требует sitemap из канона (`02_IA.md:78`), но код ей не следует.
*Альтернатива:* генерировать sitemap программно из канона `02_IA` (все `/events/*`,`/menu/*`,`/plan/*`,`/reviews`,`/blog/*` из CMS) на едином домене; убрать deprecated.

**BUG-04 (HIGH) — `robots.ts` расходится с canonical и metadataBase.**
`robots.ts:6` → `sitemap: "https://nilov-catering.vercel.app/sitemap.xml"`. При этом canonicals (bug 1) — `odaeda.ru`, а `metadataBase` — `nilov-catering.ru`. Нет директивы `Host`, нет `disallow` для `/account/orders` (noindex) и `/api/*`.
*Альтернатива:* единый домен + `host:` + `disallow: /api/`, `disallow: /account/`.

**BUG-05 (HIGH) — нет схемы `Event` ни для `/events/*`, ни для `/events/recap`.**
`04_BLOCKS.md:1267` маппит `/events/*` → только `Service`+`Offer`; рекапы реальных мероприятий (`БЛОК 27`, `04_BLOCKS.md:2003`, роут `/events/recap`) вообще не получают JSON-LD. Для ивент-кейтеринга `Event` (startDate, eventAttendanceMode, location, performer) — прямой rich-result («мероприятия рядом», расширенные сниппеты дат/площадок). Упущено.
*Альтернатива:* добавить `@type:"Event"` (минимум на `/events/recap` и на карточки событий) с датой/площадкой/типом; на `/events/*` — `Service`+`Offer`+опц. `Event` для примера.

**BUG-06 (HIGH) — ошибка географии локального SEO (область ≠ город) + пустые поля.**
`04_BLOCKS.md:1293`: `addressLocality:"Санкт-Петербург"` + `addressRegion:"Ленинградская обл."`. СПб — **самостоятельный субъект РФ**, административно НЕ входит в Ленинградскую область. Смешивание даёт некорректный `PostalAddress` → Яндекс/Google могут не связать фирму с городом. Плюс `streetAddress:"СПб, уточнить"`, `postalCode` пуст, `geo` (широта/долгота) — пусто (`04_BLOCKS.md:1296`).
*Альтернатива:* `addressLocality:"Санкт-Петербург"`, `addressRegion:"Санкт-Петербург"` (либо убрать region), заполнить реальный `streetAddress`, `postalCode`, `geo{latitude,longitude}`.

**BUG-07 (HIGH) — `LocalBusiness.url` указывает на недоступный/неиндексируемый домен.**
`04_BLOCKS.md:1291` `url:"https://nilov-catering.ru"`. Но `21_LOGIC_AUDIT.md:121` и `C6_TRUST_FACTCHECK_CRITIC.md:6` подтверждают: `nilov-catering.ru` **не делегирован / не индексируется** (найден только `interfood-catering.vercel.app` + VK). Вся structured data ссылается на нерезолвящийся домен → схема бесполезна для собственного продвижения и путает краулеры.
*Альтернатива:* перед прод-релизом подтвердить делегирование/запуск `nilov-catering.ru` (или временно point на рабочий домен) и только тогда фиксировать `url` в схеме.

**BUG-08 (MEDIUM) — есть breadcrumbs-UI, НЕТ `BreadcrumbList` JSON-LD.**
`04_BLOCKS.md:127` описывает примитив `Breadcrumbs` на глубоких роутах, НО маппинг схем (`04_BLOCKS.md:1258-1283`) не содержит `BreadcrumbList` ни для одной страницы. Упущен готовый rich-result «хлебные крошки» в выдаче (важно для СПб-локала и UX в SERP).
*Альтернатива:* рендерить `BreadcrumbList` во все `/events/*`,`/menu/*`,`/plan/*`,`/blog/*` синхронно с UI-крошками.

**BUG-09 (MEDIUM) — `FAQPage` только с 4 Q&A при плане ≥12.**
`04_BLOCKS.md:1264` маппит `/faq`→`FAQPage` «4 Q&A из FAQTeaser»; но `02_IA.md:73` требует **≥12 реальных вопросов** на `/faq`. Схема недомаркирована относительно контента → часть FAQ не попадает в rich-snippet.
*Альтернатива:* генерировать `FAQPage` из ВСЕХ ≥12 вопросов страницы (источник — CMS `FAQItem`), а не из 4-х «teaser».

**BUG-10 (MEDIUM) — нет модели внутренней перелинковки / контент-кластеров.**
Блог (`04_BLOCKS.md:1116-1119`) имеет ровно одну CTA «→ /plan/calculator» и rubric-фильтр `?rubric=`. Нет **pillar↔cluster** связки: посты не перелинкованы с `/events/*` и `/menu/*`, нет тематической link-графы, усиливающей авторитетность по «кейтеринг СПб». `02_IA.md:77` называет блог «SEO-двигателем», но двигатель не соединён с посадочными.
*Альтернатива:* editorial internal-link graph — каждый пост несёт 2–3 контекстные ссылки на релевантный `/events/{type}` и `/menu/{format}` + hub `/why-us`; страницы событий ссылаются на supporting-посты.

**BUG-11 (MEDIUM) — рассогласование бренда в `title` vs спеце.**
`layout.tsx:17-18` — `"Нилов Кейтеринг — кейтеринг в Санкт-Петербурге"` / шаблон `"%s | Нилов Кейтеринг"`. Спеце и канон бренда — **NiloV Catering** (`04_BLOCKS.md:1290`, `02_IA`, `AGENTS.md`). SERP-бренд («Нилов Кейтеринг») расходится с визуальным «NiloV Catering» → размывание brand-поиска и CTR.
*Альтернатива:* единый бренд «NiloV Catering» в `title.template` и description.

**BUG-12 (MEDIUM) — мёртвая внутренняя ссылка `/#calculator`.**
`39_CANON_INDEX.md:88` прямо фиксирует: `/#calculator` — мёртвая ссылка (секции calculator на главной нет; калькулятор уехал в `/plan/calculator`). Любая перелинковка, скопированная из старых спеки/кода, ведёт в никуда.
*Альтернатива:* заменить все `/#calculator` на `/plan/calculator` (с опц. deep-link пресетом).

**BUG-13 (LOW-MED) — blog-URL в sitemap захардкожены, нет динамики из CMS.**
`sitemap.ts:11` — 6 фиксированных slug'ов. При добавлении постов в CMS sitemap устареет → новые статьи не попадут в индекс автоматически.
*Альтернатива:* `sitemap.ts` читает коллекцию `BlogPost` (как и `BlogList`) и генерирует URL динамически + `lastModified` из поля даты.

**BUG-14 (LOW) — placeholder верификации вебмастера + deprecated `keywords`.**
`layout.tsx:63` `verification:{ yandex:"yandex_verification_code" }` — нерабочая заглушка; нет Google/Yandex Search Console привязки. `layout.tsx:22-33` — `keywords` meta (игнорируется Google, только шум). Плюс `description`/`title` (`layout.tsx:21`) несут неподтверждённый claim «18 лет опыта» (`21_LOGIC_AUDIT.md:117` — 0 независимых подтверждений), что рискует попасть в SERP-сниппет как факт-призрак.
*Альтернатива:* реальный `yandex`/`google` verification-code; убрать `keywords`; в snippet использовать проверяемое «с 2007» без голого «18 лет».

**BUG-15 (LOW, но бьёт local SEO) — внешний рейтинг не подключён фактически.**
`БЛОК 24` (`04_BLOCKS.md:1950`) требует `RatingBadge` с реальными ссылками Google/Яндекс/2ГИС; `AggregateRating` защищён от фейка (`04_BLOCKS.md:1285`). Но механизм импорта внешнего рейтинга **не описан** (`BENCHMARK_CRITIC_2026.md:51`, `30_REVIEWS_CRITIC.md:24`), и `RatingBadge` в коде пуст (`url` не заданы). Для СПб-локала внешние отзывы на картах — ключевой ранжирующий/доверительный сигнал; сейчас он отсутствует.
*Альтернатива:* либо подключить реальные профили (заполнить `url` в `RatingBadge`), либо честно убрать агрегированный рейтинг до появления источника.

---

## 5. Самопроверка (честная)

1. **Не завысил ли я bug-01?** Перепроверил: 9 файлов кода с `odaeda.ru` (grep `odaeda.ru` = 9 совпадений) + `critic1_review.json` подтверждает, что `odaeda.ru` — чужой сайт. Спеца (`04_BLOCKS.md:1291`) требует `nilov-catering.ru`. Расхождение объективно. ✅ FATAL подтверждён.
2. **Не слишком ли строг к sitemap?** `02_IA.md:78` явно требует `sitemap.xml` из канона; код (`sitemap.ts`) содержит deprecated роуты и ни одного нового. Это не придирка, а факт. ✅
3. **Event-схема — действительно ли нужна?** Для кейтеринга `/events/*` как `Service` допустимо, НО `/events/recap` = архив реальных мероприятий, и там `Event` очевидно уместен. Bug-05 обоснован. ✅
4. **Гео-ошибка реальна?** СПб — город федерального значения, отдельный субъект; «Ленинградская обл.» — другой регион. Смешивание в `PostalAddress` некорректно по schema.org. ✅
5. **Не дублирую ли я предыдущих критиков?** `CRITIC_W3/W7_C9` видели отсутствие per-page OG/meta в спеце (до волн). Я пошёл глубже: проверил **код** и нашёл внешний canonical, чего не было в их scope. Добавлена новая фактура. ✅
6. **Хватает ли багов (≥10)?** 15 багов с file:line. ✅
7. **Вердикт ≤9?** 5.0 ≤ 9. ✅ Соответствует требованию.

---

## 6. Вердикт

**Итоговый SEO-скоринг структуры: 5.0 / 10.**

Структура **задумана грамотно** (клиентоцентричная IA, продуманные LocalBusiness-поля, явный per-page SEO-контракт в спеце `БЛОК 30`, llms.txt, семантика RU-канона). НО при перекрёстной проверке кодом вскрывается **критический разрыв между спецой и реализацией**, который сама спеца помечает как «закрыто», а код — опровергает:

- **FATAL:** canonical в 9 файлах указывает на чужой домен `odaeda.ru` (bug 1) при трёх одновременных конфликтующих доменах (bug 2).
- **HIGH:** sitemap/robots устарели и ссылаются на недели-домен (bug 3,4); нет `Event`-схемы (bug 5); гео-ошибка локального SEO + пустой адрес (bug 6); `url` в схеме ведёт на недоступный домен (bug 7).
- **MEDIUM/LOW:** нет `BreadcrumbList`, недомаркированный FAQ, отсутствие модели контент-кластеров, бренд-рассогласование в title, мёртвая `/#calculator`, захардкоженный blog-sitemap, placeholder верификации, неподключённый внешний рейтинг.

**Главный риск:** пока `nilov-catering.ru` не делегирован и canonical'ы висят на `odaeda.ru`, весь SEO-фундамент (включая отличную по замыслу structured data) работает **против** сайта — поиск либо дедуплицирует страницы на чужой домен, либо не связывает сигналы.

**Что закрыть ДО прод-релиза (блокирующие):**
1. Единый домен во всех точках (canonical / metadataBase / sitemap / robots / schema `url`) — устраняет bug 1,2,3,4,7.
2. Перегенерировать sitemap из канона `02_IA` (bug 3).
3. Исправить гео/адрес в LocalBusiness (bug 6).
4. Добавить `Event` (recap) + `BreadcrumbList` (bug 5,8).
5. Модель внутренней перелинковки блог↔посадочные (bug 10).

*Независимый эксперт «SEO Expert». Строго. Самооценкам спецы не следовал — проверял кодом.*
