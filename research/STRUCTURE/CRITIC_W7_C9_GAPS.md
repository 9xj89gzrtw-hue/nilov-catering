# КРИТИК W7 — Ось C9: Гэпы / SEO / Роутинг (STRUCTURE-каталог)

**Роль:** Независимый финальный критик (другая модель, не автор). Аудит ТОЛЬКО по
спек-файлам STRUCTURE (не по коду). Вердикт авторитетен.
**Объект:** 116 .md в `/research/STRUCTURE/`. Прочитаны: `02_IA.md`, `03_JOURNEYS.md`,
`04_BLOCKS.md` (полностью, ~2194 строки), `41_BUILD_CHECKLIST.md`.
**Дата:** 2026-07-20

---

## ВЕРДИКТ

**Ось C9 (Гэпы/SEO): 7 / 10 → REWORK** (ниже порога PASS=8 из-за висячих роутов и дыр
в SEO-контракте).

| Критерий | Оценка | Обоснование |
|---|---|---|
| Покрытие 13 ключевых страниц | **10/10** | Все 13 страниц имеют блок-спеку в `04_BLOCKS.md`. |
| per-page SEO-контракт (OG/meta/canonical) | **6/10** | Контракт ЕСТЬ и силён для ядра, но 4 из 13 ключевых страниц не входят в перечисление и маппинг схемы. |
| Висячие роуты (без страницы) | **4/10** | 3 подтверждённых висячих роута (`/tasting`, `/venues`, `/accessibility`) + 2 optional. |
| Итог | **7.0** | REWORK (есть реальные баги в spec). |

**Легенда:** критерий «висячие роуты» по определению задачи = баг; наличие багов не
позволяет дать ≥8 без доказательства закрытия (правило самокритики).

---

## 1. ПОКРЫТИЕ КЛЮЧЕВЫХ СТРАНИЦ — 13/13 ✅

| # | Страница | Блок-спека в `04_BLOCKS.md` | Строка | Статус |
|---|---|---|---|---|
| 1 | `home /` | Блоки 1–13 + bis (HeroSection…ProcessSteps), SchemaBlock `/`→Organization+LocalBusiness | `04:853-872`, `04:1250` | ✅ |
| 2 | `/events/*` | `EventHero` (БЛОК 14), `PackageGrid` (15), `EventsRecap` (27, `/events/recap`); под-роуты svadba/korporativ/chastnoe/detskoe/vypusknoy/chef-at-home в `02_IA` | `04:1499`,`04:1540`,`04:1978`; `02_IA:15-24` | ✅ |
| 3 | `/plan` (хаб) | `HelpersWizard` (15.8, ссылается на `/plan` хаб), `Calculator` (20); `08_CONSTRUCTOR_SPEC` | `04:926`,`04:1808` | ✅ |
| 4 | `/menu` | `MenuLanding` (15.5), `MenuCatalog` (16), `DietLinePage` (15.6), `DishCard` (17), `AllergenLegend` (17-bis) | `04:881`,`04:1595`,`04:896`,`04:1658` | ✅ |
| 5 | `/why-us` | `WhyUs` (БЛОК 8) | `04:864`,`04:779` | ✅ |
| 6 | `/reviews` | `ReviewCard`/`ReviewList` (БЛОК 22-конвейер), `RatingBadge` (24) | `04:1015`,`04:1049`,`04:1925` | ✅ |
| 7 | `/delivery` | `DeliveryZonesMap` (БЛОК 21) | `04:1852` | ✅ |
| 8 | `/certificates` | `CertBlock` (БЛОК 22) | `04:1877` | ✅ |
| 9 | `/thank-you` | `ThankYouScreen` (БЛОК 25) | `04:1948` | ✅ |
| 10 | `/404` | `NotFoundPage` (БЛОК 26) | `04:1965` | ✅ |
| 11 | `/allergens` | `AllergenLegend` (БЛОК 17-bis), явный роут `/allergens` | `04:1723`,`04:1729` | ✅ |
| 12 | `/help/formats` | `FormatHelp` (БЛОК 15.7) | `04:910` | ✅ |
| 13 | `/plan/helper` | `HelpersWizard` (БЛОК 15.8) | `04:922` | ✅ |

**Доп. проверенные (вне списка 13, но упомянуты в задаче):** `/blog`+`/blog/[slug]`
покрыты (`BlogEditorial`/`BlogPostPage`/`BlogCard`, `04:1201-1217`) — НЕ висячий.
B2B-слой (`/partners`, `/subscribe`, `/media-kit`, `/account/orders`) покрыт
(Волна 11 / Волна 9: `04:2130`,`04:2143`,`04:2152`,`04:263`) — НЕ висячий.

---

## 2. PER-PAGE SEO-КОНТРАКТ (SchemaBlock, `04_BLOCKS.md`)

**Контракт СУЩЕСТВУЕТ** и силён (`04:1244-1245`): обязательные `<title>`,
`<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:type`,
`og:locale=ru_RU`, `<link rel="canonical">` (self-canonical) из `generateMetadata`,
плюс JSON-LD (`Organization`/`LocalBusiness`/`Menu`/`Offer`/`FAQPage`/`AggregateRating`),
`llms.txt`, `sitemap.xml`, `robots.txt` (`41:140`).

⚠️ **ДЫРА (BUG C9-4):** перечисление страниц в контракте (`04:1245`) и таблица
маппинга схемы (`04:1247-1257`) охватывают только
`/`, `/menu`, `/events/*`, `/plan/*`, `/reviews`, `/blog`, `/why-us`, `/seasonal`.
Из 13 проверяемых ключевых страниц **НЕ внесены** в перечисление и маппинг схемы:

- `/delivery` — нет в списке, нет `@type` в маппинге.
- `/certificates` — нет в списке, нет `@type` в маппинге.
- `/allergens` — нет в списке, нет `@type` в маппинге.
- `/help/formats` — нет в списке, нет `@type` в маппинге.

( `/plan/helper` формально покрыт wildcard `/plan/*`; `/thank-you` по `03_JOURNEYS:60`
`noindex` — осознанно, но контракт об этом молчит; `/404` не индексируется — корректно.)

**Риск:** сборщик, следуя маппингу `04:1247-1257`, может не сгенерировать OG/canonical/
JSON-LD для 4 реальных контент-страниц → они уйдут в прод без SEO-тегов. Контракт
декларирует «каждая страница», но его явный охват неполон.

---

## 3. ВИСЯЧИЕ РОУТЫ (баг = роут без блок-спеки) — НАЙДЕНЫ

Задача подозревала `/tasting` — **подозрение ПОДТВЕРЖДЕНО**. Ниже роуты, объявленные в
`02_IA.md` / `41_BUILD_CHECKLIST.md` с именем блока, но **БЕЗ блок-спеки в `04_BLOCKS.md`**
(поиск по `04_BLOCKS.md`: `TastingBooking`, `VenueList`, `AccessibilityPage`,
`CareerPage`, `EnPage` — 0 совпадений):

| Роут | Объявлен | Блок (по IA) | Спека в 04 | Статус |
|---|---|---|---|---|
| `/tasting` | `02_IA:66` (GapHunter G1, MEDIUM) | `TastingBooking` | ❌ нет | 🔴 ДАНГЛИНГ |
| `/venues` | `02_IA:69` (GapHunter G5, LOW) | `VenueList` | ❌ нет | 🟠 ДАНГЛИНГ |
| `/accessibility` | `02_IA:68` (GapHunter G3, LOW–MED) | (страница WCAG) | ❌ нет | 🟠 ДАНГЛИНГ |
| `/en` | `02_IA:71` (optional, LOW) | — | ❌ нет | 🟡 optional |
| `/careers` | `02_IA:72` (optional, LOW) | — | ❌ нет | 🟡 optional |

**НЕ висячие (проверено отдельно):** `/blog` (есть `BlogPostPage`/`BlogEditorial`,
`04:1211-1217`), B2B `/partners`+`/subscribe`+`/media-kit` (Волна 11, `04:2130`,`2143`,`2152`),
`/account/orders` (`04:263`), `/team`+`/contact`+`/gallery` (существующие роуты репо +
блоки `TeamMember`, `GalleryMasonry` 19).

---

## 4. BUG-LIST (file:line)

- **C9-1 (MEDIUM, баг)** — `/tasting` объявлен как bookable-страница с блоком `TastingBooking`
  (`02_IA.md:66`), но в `04_BLOCKS.md` блок `TastingBooking` отсутствует → висячий роут.
  Действие: добавить БЛОК-спеку `TastingBooking` (дата/тип/гости → `/api/contact`/WA) в `04`.

- **C9-2 (LOW, баг)** — `/venues` объявлен с блоком `VenueList` (`02_IA.md:69`), спека
  отсутствует в `04_BLOCKS.md` → висячий роут. Действие: добавить спеку `VenueList`.

- **C9-3 (LOW–MEDIUM, баг)** — `/accessibility` (заявление WCAG, GapHunter G3,
  `02_IA.md:68`) не имеет блок-спеки в `04_BLOCKS.md` → висячий роут. Действие: добавить
  спеку страницы доступности (подкрепляет претензию WCAG).

- **C9-4 (MEDIUM, баг)** — SEO per-page контракт неполон: перечисление `04_BLOCKS.md:1245`
  и маппинг схемы `04_BLOCKS.md:1247-1257` не покрывают `/delivery`, `/certificates`,
  `/allergens`, `/help/formats`. Эти 4 ключевые страницы не получат OG/canonical/JSON-LD
  при сборке по маппингу. Действие: расширить список `04:1245` + таблицу `04:1247-1257`
  (добавить `@type`, напр. `/delivery`→`LocalBusiness`+`Offer`, `/certificates`→`Organization`,
  `/help/formats`/`/allergens`→`Article`/`FAQPage`).

- **C9-5 (LOW, optional баг)** — `/en` (`02_IA.md:71`) и `/careers` (`02_IA.md:72`)
  объявлены optional, но без спек; если войдут в scope — добавить блоки или пометить
  явно «вне scope Волны N».

- **C9-6 (LOW, doc-баг)** — `SchemaBlock` в тексте многократно назван «БЛОК 30»
  (`04:1244`,`04:1259`,`04:1314`,`04:1337`,`04:1345`), но в `04_BLOCKS.md` **нет**
  заголовка `### БЛОК 30 —` (блоки идут 11–29, затем раздел «ВОЛНА 11»). SchemaBlock
  описан подразделом без каноничного заголовка (`04:1244`, внутри раздела «Специфичные
  блоки»/конвейера отзывов). Действие: дать `SchemaBlock` заголовок `### БЛОК 30 —`
  для единообразия с cross-reference.

---

## 5. ИТОГ ПО ОСИ C9

- **Сильные стороны:** 13/13 обязательных страниц полностью специфицированы; SEO-контракт
  (OG/meta/canonical/JSON-LD/`llms.txt`/`sitemap`) существует и технически корректен для
  ядра; `/blog` и B2B-слой НЕ висячие (подозрение задачи частично снято — `/blog` и B2B ок).
- **Слабые стороны (REWORK):** 3 подтверждённых висячих роута (`/tasting`, `/venues`,
  `/accessibility`) + 2 optional; SEO-контракт не охватывает 4 из 13 ключевых страниц;
  нумерационная нестыковка «БЛОК 30».

**Оценка: 7/10 → REWORK.** Для PASS (≥8) достаточно закрыть C9-1…C9-4: прописать
блок-спеки для висячих роутов и расширить SEO-перечисление/маппинг на `/delivery`,
`/certificates`, `/allergens`, `/help/formats`.
