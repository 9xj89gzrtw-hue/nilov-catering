# Библиотека блоков (Block Library) — единый словарь сборки

Каждый блок = переиспользуемый React-компонент с пропсами из Design Tokens.
Собираем страницы КАК ИЗ КОНСТРУКТОРА, не «напиши страницу целиком».

---

## 🔴 CODE-REALITY: применить светлую ДНК в `app/globals.css` (Фаза 0, БЛОКИРУЮЩИЙ баг B1)

> **Статус:** критический рассинхрон «код vs спека». Закрыть ДО любой сборки (см. `15_REPO_AUDIT` §«Фаза 0 = переписать globals.css», `05_BUILD` Фаза 0).

**Что нашёл `29_DEVICECRITIC` (B1):**
> «`globals.css` — тёмная, вся ДНК (`01`/`06`) — светлая. Привести токены к `06_TOKENS` (ivory `#FAF7F2` / ink `#1C1815` / gold `#B08D57`). Без этого весь responsive-контракт (`01` §7 «мягкий градиент, НЕ чёрная плашка») нарушен. Затрагивает Header/Hero/BottomNav (все используют `text-cream`/`text-cream-muted`).»

**Факт в коде (`app/globals.css`, строки 5–56):** живёт тёмная кинематографичная система —
`--color-background:#0A0A0A`, `--color-foreground:#F5F0EB`, `--color-cream:#F5F0EB`,
`--color-gold:#C9A96E`, бургунди `--color-primary:#722F37`, тёмные тени `rgba(0,0,0,…)`.
Это **прямо противоречит** утверждённой светлой ДНК (`01_VISUAL_DNA` §2/§7, `06_TOKENS` §1).

**Что исправить в `app/globals.css` (Фаза 0) — точечно, по `06_TOKENS.md` §1:**

1. **База (заменить тёмные значения на ivory/ink из `06`):**
   ```css
   @theme {
     /* === shadcn-база (имена совпадают с components/ui/*) === */
     --color-background:       #FAF7F2;  /* ivory base (было #0A0A0A) */
     --color-foreground:       #1C1815;  /* ink, текст (было #F5F0EB) */
     --color-card:             #FFFFFF;  /* карточки на ivory (было #121212) */
     --color-card-foreground:  #1C1815;
     --color-popover:          #FFFFFF;
     --color-popover-foreground:#1C1815;
     --color-primary:          #B08D57;  /* gold = основная кнопка/CTA (было #722F37 burgundy) */
     --color-primary-foreground:#1C1815;  /* [SSOT 06_TOKENS:29 — КРИТ a11y] ink на золоте = 5.7:1 ✓ AA (белый #FFFFFF = 3.09:1 FAIL для 14–16px). НЕ белый! */
     --color-secondary:        #F2ECE3;  /* cream-alt секции */
     --color-secondary-foreground:#1C1815;
     --color-muted:           #F2ECE3;
     --color-muted-foreground: #4A423B;  /* warm grey (синхрон с 06:34, AAA 9.210:1 на ivory) */
     --color-accent:          #EFE6D6;
     --color-accent-foreground:#6E5631;  /* (синхрон с 06:36, 5.582:1 AAA на gold-tint #EFE6D6) */
     --color-border:           #E4DCCF;  /* hairline (было #262626) */
     --color-input:           #E4DCCF;
     --color-ring:            #8A6D3B;  /* focus-visible 2px gold-text (WCAG 1.4.11: 4.537:1 ≥3:1 на ivory; было #B08D57) */
     --color-destructive:     #A6443B;
     --color-destructive-foreground:#FFFFFF;

     /* === бренд-расширения === */
     --color-gold:       #B08D57;  /* акценты, CTA, разделители (было #C9A96E) */
     --color-gold-soft:  #C9A961;
     --color-gold-text: #8A6D3B;  /* золотой ТЕКСТ (синхрон с 06_TOKENS:44) */
     --color-gold-text-on-secondary: #6E5631;  /* золотой текст на cream (синхрон с 06_TOKENS:45) */
     --color-gold-tint:  #EFE6D6;
     /* [ITER4-FIX] сниппет globals.css синхронизирован с 06: ring=#8A6D3B, gold-text #8A6D3B, gold-text-on-secondary #6E5631, muted-foreground #4A423B (AAA), accent-foreground #6E5631 (AAA на gold-tint). Последние два добавлены в ITER8. */
     --color-earth:      #7C6A55;
     --color-burgundy:   #722F37;  /* доверие/печати (ТОЛЬКО редко, НЕ primary) */
     --color-burgundy-tint:#F3E7E9;
     --color-line:       #E4DCCF;
     --color-success:    #4F7A52;
     --color-warning:    #B5803A;
     --color-sage:       #7E8B6B;
   }
   ```
2. **Семантические алиасы старого языка ДНК** (`01_VISUAL_DNA`): `--color-bg:#FAF7F2`,
   `--color-bg-alt:#F2ECE3`, `--color-ink:#1C1815`, `--color-ink-soft:#4A423B`, `--color-surface:#FFFFFF`.
3. **`body` (строки 59–68):** сменить `background-color: var(--color-background)` (ivory) и
   перекрасить ambient-градиенты с тёмных `rgba(0,0,0,…)` на светлые `rgba(201,169,110,…)` /
   `rgba(28,24,21,0.03)`. *Ambient-градиент — ТОЛЬКО декор, НЕ scrim под текст, `aria-hidden`, non-essential (gold-soft #C9A961 на ivory = 2.106:1 FAIL, НЕ использовать под текст).* Диалоги/модалки — `rgba(28,24,21,0.06)` blur, НЕ чёрный (`06` §1 правила).
4. **`.btn-primary` (строки 207–232):** цвет текста `color: #1C1815` (ink на gold = 5.7:1 ✓ AA per SSOT `06:29`; было `#0A0A0A`, а белый/ivory на gold = 3.09:1 FAIL — НЕ использовать).
   Gold-градиент `#B08D57→#8A6D3B` (цвета из `06`; светлый конец #8A6D3B для чёткости края), НЕ `#C9A96E`.
5. **Тени (строки 43–46):** заменить `rgba(0,0,0,0.4..0.7)` на светлые `rgba(28,24,21,0.08..0.16)`
   (ivory elevation), gold-glow `rgba(176,141,87,0.10)`.
6. **Устаревшие токены компонентов:** все shadcn-примитивы (`components/ui/button`, `card`, `badge`,
   `input`) и секции, использующие `text-cream`/`text-cream-muted`/`bg-background`/`bg-card`,
   автоматически «переедут» на ivory/ink при смене значений (имена совпадают — `06` §1 ключевое правило:
   *«меняем ЗНАЧЕНИЯ, не имена»*). НЕ оставлять хардкод `#0A0A0A`/`#F5F0EB` нигде в компонентах.
7. **Steam/ken-burns/hover** — NEUTRAL: на светлом фоне `img-zoom`, `.card-hover`, steam-пар
   остаются уместны (пар — над фото блюд, НЕ над тёмным). Оставить, но проверить контраст на ivory.

**Проверка (Code-Reality gate, `18_CRITIC_SYSTEM` §3.5):** после Фазы 0 — `grep -rn "0A0A0A|F5F0EB|722F37|C9A96E"`
по `app/`, `components/`, `globals.css` → **0 совпадений**. Иначе блокирующий баг не закрыт.

---

## CMS-слой (Sanity free / Strapi self-host) — заказчик правит БЕЗ девелопера и БЕЗ платы

> **B-CMS-1 (блокирующий).** CMS-выбор ЗАФИКСИРОВАН согласно жёсткому бюджетному стеку (`29_POSITIONING.md` §«Бюджетный стек»): **Storyblok ЗАПРЕЩЁН** ($99/мес). Используем **Sanity free tier** (облако, бесплатно, 20 seats) **ИЛИ Strapi self-host** (open-source, бесплатно, на том же VPS в РФ — если paranoia по 152-ФЗ). Оба варианта = **$0 подписки**. Подключение к Next.js через уже заложенный ISR `revalidate 3600` (`04`/`08`) — при смене контента в админке сайт обновляется БЕЗ деплоя.
>
> **Суть слоя:** всё, что раньше было «в коде» (`lib/pricing.ts`, `catalog.json`, массивы `clips`/`Review[]`, тексты секций), переносится в CMS-документы/коллекции. Заказчик правит меню / цены / видео / отзывы / тексты **САМ в визуальной админке**. Формула `calcTotal` и скидки (`gamma`/`early_booking`) **НЕ правятся клиентом** — это бизнес-логика, остаётся в коде (R-B). Клиент правит ТОЛЬКО входные (`pricePerGuest`, `addon.price`).

### Content-модели (B-CMS-3,4,5,7,10)

> **🔴 ПРАВИЛО FACT-GATE (обязательно для всех моделей данных: `Testimonial`/`Review`/`TrustProofItem`/`AwardsStrip`/`Dish`/`Event`/`ClientLogo`).**
> Каждая модель выше несёт обязательное поле **`status: 'verified' | 'pending'`** (значение ПО УМОЛЧАНИЮ — **`'pending'`**; отсутствие/пустой статус трактуется как `'pending'`, fail-closed, НЕ fail-open).
> **Правило рендера (СТРОГИЙ ГЕЙТ, не только проза — обязателен псевдокод-контракт ниже):** элементы со `status:'pending'` **НЕ рендерятся как голый факт в проде**. Они показываются ТОЛЬКО при одном из двух условий:
> 1) `status === 'verified'` (факт подтверждён источником/договором заказчика), ЛИБО
> 2) сопровождаются явным видимым дисклеймером (текст «на проверке» / «пример из архива» / «подтверждается перед релизом» — ВИДИМЫЙ пользователю, НЕ только редакторская пометка 🟡; 🟡 ДОПУСТИМА только в паре с видимой фразой-контекстом «пример площадки / ДЕМО-данные / не клиент / на проверке») и НЕ заявляются как утверждение.
> **ОБЯЗАТЕЛЬНЫЙ render-guard (псевдокод — каждый компонент ДОЛЖЕН реализовать, иначе гейт НЕ считается закрытым):**
> ```ts
> function renderFactItem(item: { status?: 'verified' | 'pending'; disclaimer?: string; claim: string }) {
>   const status = item.status ?? 'pending';          // default fail-closed
>   if (status === 'verified') return <Fact>{item.claim}</Fact>;
>   if (status === 'pending' && item.disclaimer) return <FactPending>{item.claim} <Disclaimer>{item.disclaimer}</Disclaimer></FactPending>;
>   return null;                                       // pending БЕЗ дисклеймера — НЕ рендерить
> }
> ```
> **CI-assert (добавить в проверку сборки):** ни один prod-снапшот `TrustProof`/`Hero`/`WhyUs` НЕ содержит строку с числовым/годовым claim без соответствующего видимого поля `disclaimer` ИЛИ `status:'verified'`. Grep-gate `app/ components/ lib/` (НЕ мёртвый `content/`) ищет **0 голых УТВЕРЖДЕНИЙ-клиентов без 🟡**: статусные бренды допустимы ТОЛЬКО как «статусные бренды (по запросу, 🟡)» в disclaimer-контексте (рядом 🟡 ИЛИ фраза «НЕ называем / пример-площадка / ДЕМО-данные / не подтверждено»), где они НЕ заявляются как факт-клиент (см. 40 §3.2); гейт блокирует НЕ само вхождение имени, а голое утверждение-клиент без 🟡. Внутренние `tier`-идентификаторы в коде (`tier:'premium'|'luxury'`) НЕ входят в grep-gate.
> Нарушение = публикация непроверенного claim как факта (риск репутации/санкций, см. `18_CRITIC_SYSTEM`/bug 2). Год основания и неподтверждённые клиенты помечаются `status:'pending'` + дисклеймер; цены кофе-брейка «950» — 🟡 pending с пометкой сверки.

> ### 🔧 РЕАЛИЗАЦИЯ FACT-GATE (гейт закрыт ТОЛЬКО когда внедрён в сборку — Итерация 5)
>
> Выше — контракт и псевдокод `renderFactItem`. Ниже — описание, КАК он исполняется в реальной сборке, чтобы гейт перестал быть прозой-инструкцией и стал работающим механизмом (закрывает баг из ITER4_RECHECK_TRUST баг #1: «спроектирован, но не закреплён исполнением»).
>
> **Где применяется `renderFactItem` (точки внедрения):** псевдокод-гвард из `04:96-103` внедряется в каждый компонент, который рендерит сущность с факт-полем, при СБОРКЕ страниц из блоков:
> - `ReviewCard` (читает модель `Review`/`Testimonial`) — каждый отзыв/видео-слово рендерится через `renderFactItem` по своему `status`/`disclaimer`.
> - `TrustBar` (читает `ClientLogo` + `TrustProofItem`) — лого клиента и proof-факт (годы/события/премии) рендерятся исключительно через `renderFactItem`; анонимные плейсхолдеры «нам доверяют» идут с `status:'pending'` + дисклеймер «на проверке».
> - `TrustProof` (блок 57, `variant:'facts'`) — пункты 7–10 (годы/события/премии/клиенты) — каждый `TrustProofItem` прогоняется через `renderFactItem`; `pending` БЕЗ `disclaimer` → `null` (не попадает в DOM).
> - `WhyUs` (блок 8) и `HeroSection` (блок 1, Sub) — числовые claim'ы (3 500+ 🟡 / более 19 лет 🟡 / кофе-брейк 390 ₽ 🟡, канон 950 — вторичное) обёрнуты в `renderFactItem` с соответствующим статусом.
>
> **Контракт (единый для всех точек внедрения):**
> - Поле `status` ОБЯЗАТЕЛЬНО на модели данных (`Review`/`TrustProofItem`/`Dish`/`Event`/`Testimonial`/`AwardsStrip`/`ClientLogo`), значение ПО УМОЛЧАНИЮ = `'pending'` (fail-closed: отсутствие/пустой статус = `'pending'`, НЕ `'verified'`).
> - `status === 'verified'` → рендер `claim` как факта (без дисклеймера).
> - `status === 'pending' && disclaimer` (видимый пользователю текст «на проверке»/«подтверждается при расчёте»/«пример из архива» + 🟡) → рендер `claim` рядом с дисклеймером, НЕ как утверждение.
> - `status === 'pending'` БЕЗ `disclaimer` → `renderFactItem` возвращает `null` (элемент НЕ попадает в прод, не рендерится «голым»).
> - `disclaimer` и `status` — обязательные аргументы/поля; компонент НЕ рендерит факт, если не может подтвердить ни `verified`, ни наличие видимого `disclaimer`.
>
> **CI-шаг `scripts/fact-gate` (закрепляет гейт в пайплайне, НЕ только в коде):**
> - Файл `scripts/fact-gate.mjs` (или `.ts`) — grep/lint-хук, запускаемый (а) локально на `pre-commit` (husky/lint-staged) и (б) как шаг в `.github/workflows/` (например `fact-gate.yml` или шаг в `vercel-deploy.yml`).
> - Что проверяет: (1) ни один prod-снапшот/строка `TrustProof`/`Hero`/`WhyUs`/`TrustBar` НЕ содержит числовой/годовой claim без `status:'verified'` ИЛИ видимого `disclaimer` (проверка по источнику данных `lib/data.ts`/CMS-выводу); (2) grep-гейт `app/ components/ lib/` (НЕ мёртвый `content/`; синхрон с `40:87`) ищет **0 голых УТВЕРЖДЕНИЙ-клиентов без 🟡**: статусные бренды (Эрмитаж/Armani/Газпром/Forbes) допустимы ТОЛЬКО как «статусные бренды (по запросу, 🟡)» в disclaimer-контексте — гейт блокирует голое утверждение-клиент без 🟡, а не само вхождение имени; (3) любой `status:'pending'` claim, попадающий в рендер, ОБЯЗАН иметь непустой `disclaimer`.
> - При провале — CI падает (non-zero exit), деплой блокируется. Гейт считается закрытым ТОЛЬКО когда этот шаг реально присутствует в репо и зелёный в CI (иначе — статус «спроектирован, не исполнен», как в ITER4_RECHECK_TRUST).
>
> **Приёмка (definition of done) исполнения:** `renderFactItem` реализован минимум в `ReviewCard`/`TrustBar`/`TrustProof`/`WhyUs`/`HeroSection`; `scripts/fact-gate.mjs` существует и повешен на `pre-commit` + CI-шаг; тест/снапшот подтверждает, что `pending`-элемент без `disclaimer` НЕ рендерится.

- **`Dish`** (CMS-collection, вместо `catalog.json`; 78 SKU, B-CMS-3). Поля: `name` (string, req), `photo` (image, req), `pricePerGuest` (number, req), `tier` (`'economy'|'standard'|'premium'|'luxury'` — внутренний), `station` (reference → `Station`, req), `dietBadges` (`'vegan'|'gluten-free'|'halal'[]`), `allergens` (Allergen[14], req — может быть пустым, НО не отсутствовать), `crossContact` (boolean), `servingsPerGuest` (number), `season` (`'summer'|'autumn'|'winter'|'spring'[]`), **`status: 'verified' | 'pending'` (обязательное поле fact-гейта — см. ПРАВИЛО FACT-GATE выше; блюдо со `status:'pending'` НЕ публикуется как готовый факт до верификации)**. **Bulk-импорт** карточек заказчика (R-E `23` R1) — для заполнения 14 аллергенов до прода. Читает `DishCard`/`MenuCatalog`.
 > **[Волна 4, закрывает S1 (Света, B-SVETA-1, КРИТИЧНЫЙ)]** Поле `allergens[]` (14 ТР ТС 021/2011) и `crossContact` для всех 78 блюд импортируются ИЗ карточек заказчика ДО релиза через **bulk-импорт** (`29_CMS_CRITIC` B-CMS-3): статус каждого значения = **`pending-verification`** (ждёт сверки с карточками блюд заказчика, `23` §0). Правило жёсткое: пока импорт НЕ завершён — карточки блюд и маркировка «14 аллергенов» (Hero/TrustProof) НЕ публикуются как заполненные (R1 `25_MENUCRITIC_FINAL` БЛОКИРУЮЩИЙ). «Маркировка по 14 аллергенам» из Hero = пустая декларация, пока данные `pending`; на детском меню это критично для мамы-аллергика. Закрыть на Фазе данных ДО прода.
- **`Station`** (reference-цель для `Dish.station`): `name`, `type` (холодные/горячее/десерты/напитки/шоу-станции).
- **`VideoClip`** (CMS-collection, вместо ручного массива `clips`; B-CMS-4). Поля: **`videoUrl` (string, req — ВСТАВКА URL, НЕ id**; Rutube-ссылка ИЛИ self-host MP4), `poster` (image, req), `eventType` (`'wedding'|'corporate'|'private'|'chef-at-home'`), `title` (req), `durationSec` (number). **Парсер вытаскивает id из `videoUrl`** (R-C: заказчик НЕ копирует id из URL). Источник видео — **Rutube / self-host** (Vimeo ЗАПРЕЩЁН бюджетным стеком). `EventsRecap` / `HomeVideoShowcase` / `TestimonialsCarousel.videoTestimonial` читают из этой коллекции.
- **`Review`** (CMS-collection; B-CMS-5). Поля: `clientName`, `clientPhoto?`, `venue?`, `venuePhoto?`, `eventType`, `date` (date, req), `guests` (number), `tier` (`'economy'|'standard'|'premium'|'luxury'` — внутренний, НЕ видимый премиум-лейбл, T7), `quote` (text, req, ровно 1 ёмкое предложение), `rating?` (number, только если реально измерено), **`status: 'verified' | 'pending'` (обязательное поле fact-гейта — отзыв со `status:'pending'` НЕ рендерится как голый факт в проде, см. ПРАВИЛО FACT-GATE)**, **`approved` (boolean, req — галочка публикации в админке, НЕ правка кода)**. Модерация = галочка. Связь с `RatingBadge`/`AggregateRating` (реальная ссылка Google, НЕ фейк). ⚠️ `approved` и `priceValidUntil` в JSON-LD — только для роли с правами (B-CMS-9).
- **`PricingConfig`** (CMS-document; B-CMS-2, РЕШАЕТ R-A). Поля: `format` (`'furshet'|'banquet'|'coffee-break'|'mobile-furshet'`), `tier`, `pricePerGuest` (number, req), `addons[]` (`{ name, price }`). **`calcTotal` читает цены из CMS** с фолбэком на константу `PRICE_PER_GUEST` при недоступности. Заказчик меняет цену в админке → сайт обновляется без деплоя. Формула остаётся в коде (R-B).
 > **[Волна 4, закрывает E9 (Елена, B-E9) — сверка цен ДО релиза]** Значения `pricePerGuest`/`addons` в `PricingConfig` помечаются **`pending-verification`** (BUG-F2) и ОБЯЗАНЫ сверяться с актуальным прайсом заказчика перед прод-релизом: живой сайт NiloV даёт Фуршет/Кофе-брейк «от 390 ₽», Корпоратив «от 2 450 ₽», Банкет/Свадьба «от 4 470 ₽» — канон `07` может расходиться. КП с неверной (вымышленной) ценой = потеря доверия босса Елены. Правило: финальный `priceValidUntil` фиксируется ТОЛЬКО после сверки (как у аллергенов S1). До сверки в `04`/`07` цены несут пометку `pending-verification`.
- **`PageText`** (CMS-document per страница/секция; B-CMS-6). Поля: `page` (slug), `blocks[]` (каждый блок = editable-поля копирайта `HeroSection`/`TrustBar`/…, НЕ пропсы). Закрывает обещание «из CMS/i18n, не хардкод» в `04`.
- **`SeasonalConfig`** (CMS-document; B-CMS-7). Поля: `season`, `announcement` (string), `activePackages[]` (reference → `Dish`/`Package`), `rotationNotes`. Читает `AnnouncementBar` + `SeasonalModule` + `SeasonalRotation` (`23` §4).
- **`TeamMember`** (CMS-collection; B-CMS-7): `name`, `role`, `photo`, `bio`.
- **`BlogPost`** (CMS-collection; B-CMS-7): `title`, `rubric` (`'case'|'tip'|'guide'`), `cover`, `body` (richtext), `publishedAt`, `slug`.
- **`Package`** (CMS-collection; B-CMS-7): `name` (видимый лейбл — см. T3: «Эконом / Стандарт / Расширенный / Максимальный», «Люкс» НЕ в публичном заголовке), `tier`, `priceFrom`, `features[]`, `href`. Читает `PackageGrid`.
- **`TrustProofItem` / `FooterColumn` / `FAQItem`** (CMS-collection/document; B-CMS-7): факты/колонки/вопросы вынесены в CMS (вместо хардкода в `04`/`SiteFooter`). `TrustProofItem` ОБЯЗАН нести **`status: 'verified' | 'pending'`** (обязательное поле fact-гейта: неверифицированный факт НЕ рендерится как голый факт в проде, см. ПРАВИЛО FACT-GATE). `ClientLogo` (логотип клиента в `TrustBar`/`TrustProof`) — модель несёт `name`, `logoSrc`, `href?`, `status: 'verified' | 'pending'`; клиенты без подтверждённого договора помечаются `status:'pending'` и показываются ТОЛЬКО с дисклеймером «на проверке» (см. TrustBar/TrustProof).
- **`Event`** (CMS-collection; галерея/рекапы/кейсы). Поля: `title`, `eventType` (`'wedding'|'corporate'|'private'|'chef-at-home'`), `venue?`, `date`, `guests?`, `coverImage`, `caption?` **`status: 'verified' | 'pending'` (обязательное поле fact-гейта: событие/площадка со `status:'pending'` НЕ рендерится как подтверждённый кейс-клиент, см. ПРАВИЛО FACT-GATE; примеры площадок типа «Эрмитаж/Мариинский» НЕСУТ `status:'pending'`).** Читает `EventsRecap`/`GalleryMasonry`/`InspireStrip`.
- **`Testimonial`** (CMS-collection; B-CMS-5, видео/текст-слова гостей). Поля: `clientName`, `eventType`, `date`, `quote`, `videoSrc?`, `poster?` **`status: 'verified' | 'pending'` (обязательное поле fact-гейта: отзыв со `status:'pending'` НЕ рендерится как голый факт в проде, см. ПРАВИЛО FACT-GATE).** Читает `TestimonialsCarousel`.
- **`AwardsStrip`** (ОБЪЕДИНЁН в `TrustProof`, см. блок 57; отдельный proof-ряд убран). Данные несут тот же **`status: 'verified' | 'pending'`** (обязательное поле fact-гейта: отраслевые премии/награды НЕ рендерятся как подтверждённый факт без `status:'verified'` + года, см. ПРАВИЛО FACT-GATE).

### Роли (RBAC, B-CMS-8,9)
- **«Редактор-контент»** — доступ к `Dish`, `VideoClip`, `Review`, `PageText`, `TeamMember`, `BlogPost`, `SeasonalConfig`, `Package`, `TrustProofItem`, `FAQItem`, `FooterColumn`. НЕ трогает формулу.
- **«Менеджер-цены»** — ТОЛЬКО `PricingConfig` (цены + ADDONS). `approved` у отзывов и `priceValidUntil` в JSON-LD — только для роли с правами (защита от случайного «5.0 без данных»).

> **Что НЕ отдаём клиенту:** логика `calcTotal` (gamma/early_booking скидки), структура компонентов `04`, алгоритм парсера URL. Это код девелопера (R-B/D). Граница зафиксирована.

> **СТАТУС (Итерация 4, 2026-07-20): CMS-слой НЕ построен. Весь контент — хардкод в `lib/data.ts`; `catalog.json`/`lib/pricing.ts` являются фактическим SSOT. Auth/RBAC для `/account/orders`, `/partners`, `/subscribe` — **специфицирован в ШАГ 5.6 (`41_BUILD_CHECKLIST`, раздел CMS-слоя: роли «Редактор-контент» + «Менеджер-цены», RBAC по `04:148-150`) и НЕ исключается из IA**. Роут `/account/orders` — **ИСКЛЮЧЁН из sitemap** (noindex, приватный кабинет); роуты `/partners` (приватный B2B-кабинет) и `/subscribe` — в sitemap, пока не закрыт Auth (после закрытия `/partners` тоже уйдёт в noindex+вне sitemap, как `/account/orders`). Страница `/account/orders` помечена `noindex` (`04:1371`) и **исключена из sitemap** (`02_IA.md`).

## Глобальные (на всех страницах)
- `AnnouncementBar` — тонкая строка сверху (сезонное предложение / акция). Детали — ниже (баг 31, ч.1).

  **Назначение:** сезонный анонс, связанный с `SeasonalModule` (читает тот же `seasonalConfig`). Пример: «🔥 Новогодний корпоратив — бронируйте до 15 дек.» со ссылкой на `/seasonal` или нужный пакет.
  **Пропсы:** `message: string`, `href?: string`, `dismissible?: boolean` (по умол. да).
  **Поведение:** тонкая строка резервирует высоту → CLS = 0; кнопка закрытия сохраняет состояние в `localStorage` (не прыгает при reload). `role="region"` + `aria-label="Анонс"`.
  > **[Волна 8, закрывает ZH1 (Жанна, сезонный НГ — критично)] Сезонный дедлайн НЕ закрывается навсегда.** Когда `AnnouncementBar` несёт high-season дедлайн (читает `seasonalConfig.season ∈ {newyear,maslenitsa}` ИЛИ `seasonalConfig.deadline` в будущем), правило dismiss меняется: (а) либо `dismissible:false` до `seasonalConfig.deadline`; (б) либо dismiss-состояние хранится **per-визит** (`sessionStorage`, НЕ `localStorage`) и ре-показывается каждый новый визит, пока `now < deadline`. Обычные (не-дедлайновые) анонсы — прежнее поведение (`localStorage`, закрыл навсегда). Так напоминание о брони НГ не теряется после первого закрытия. Реализация: `dismissScope: 'permanent'|'per-visit'|'locked'` в `SeasonalConfig`.
  **a11y / Perf / Responsive:** close-кнопка с `aria-label`; не блокирует LCP; mobile — текст сжимается/скроллится, CTA остаётся.
- `SiteHeader` — nav (desktop top / mobile bottom), лого, CTA «Спланировать». Поведение скролла и навигация — ниже (баг 31, ч.2).

  **Поведение (sticky):** header **НЕ прячется при скролле вниз** (всегда доступен — +навигация по logosh/NN-G). Золотая тень (`box-shadow` gold) появляется **ТОЛЬКО после `scrollY > 40px`** (класс `.scrolled`, CSS-переключатель, без layout-shift → CLS<0.1). `prefers-reduced-motion` — без плавного перехода тени.
  **Навигация (5+ CTA + тел/WA/ТГ):** `События(/events)` · `Меню(/menu)` · `Галерея(/gallery)` · `Почему мы(/why-us)` · `Команда(/team)` · `Отзывы(/reviews)` · `Сезонное(/seasonal)` · `Спланировать(/plan)` + справа **телефон**, **WhatsApp** и **Telegram** (иконки+ссылки — **первичные каналы связи**, круглосуточный отклик, по `29_POSITIONING` §«Соц-ленты»). Состав ОБЯЗАН совпадать с `02_IA.md` (раздел «Навигация») — единый источник истины. *Волна 2А:* доп. служебные страницы `/delivery` и `/certificates` вынесены в футер (колонка «Помощь») и бургер-меню, а НЕ в основную строку (чтобы не перегружать 8+ CTA); `/thank-you` и `/404` — служебные, в навигации НЕТ.
  > **[Волна 9, закрывает BB1 (Борис, desktop mega-menu — КРИТИЧНО)] Навигация плоская (8 пунктов) — под-страницы событий (`/events/svadba`·`/korporativ`·`/chastnoe`·`/vypusknoy`·`/detskoe`·`/chef-at-home`) и форматов меню (`/menu/furshet`·`/banquet`·`/coffee-break`·`/vegan`·`/gluten-free`·`/halal`·`/detskoe`·`/bar`·`/catalog`·`/show-cooking`) НЕДОСТУЖИМЫ за 1 клик. → Добавить **mega-menu** на пункты «События» и «Меню» (desktop, `hover` И `click`/`Enter`/`focus` открытие, `Escape` закрывает, focus-trap внутри): раскрывает под-структуру прямо в шапке (карточки-ссылки 6 типов событий + 10 форматов меню, с иконками и 1-строчным описанием). Под-роуты `/delivery`·`/certificates`·`/allergens`·`/help/formats`·`/tasting`·`/venues`·`/accessibility`·`/en`·`/careers`·`/partners`·`/subscribe`·`/media-kit` (BB4/B11) — либо в mega-menu «Ещё», либо в бургер-like «Ещё»-дроп desktop-шапки. Закрывает главный gap Бориса: IA раскрыта за 1 клик на wide-screen. `aria-expanded` на триггере, `role="menu"`/`menuitem`, навигация с клавиатуры (Arrow/Tab).
  > **[Волна 9, закрывает BB2/BB3 (Борис, wide-screen — КРИТИЧНО)] (1) Мёртвые поля на ultra-wide (≥1920px): контент в capped container (~1280–1440px) → на 27″ 2560px ~560px пустых полей с каждой стороны. → **fluid-брейкпоинты**: `max-w` контента ~1440–1600px + опц. **full-bleed** секции (Hero/галерея/VideoShowcase) на всю ширину (`w-full` с внутренним `max-w` только для текста). (2) Grid каталога/карточек (`MenuCatalog`/`PackageGrid`/`GalleryMasonry`) без потолка колонок → при растягивании до 1600px+ карточки аномальной ширины. → `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` с **верхним пределом колонок** (напр. `max-width` контейнера grid 1600px) ИЛИ cap контейнера (связано с BB2). На ≥1600px либо cap контейнера, либо сблизить колонки split-конструктора (BB9), чтобы `liveSummary` «прилипал» к контенту (не разносился на огромный зазор).
  **[Волна 3, закрывает V2 (Виктор, крупная кнопка звонка)] Крупная видимая кнопка звонка:** справа в `SiteHeader` (desktop И mobile) — **НЕ только иконка**, а кнопка **«📞 Позвонить 8 (812) 919-59-11»** с самим номером **крупным шрифтом** (`text-base`/`text-lg`, жирный, цвет `var(--color-gold-text)` — золотой ТЕКСТ, 4.537:1 на ivory ≥ AA; НЕ чистый `--color-gold` #B08D57 как текст, 2.89:1 FAIL) + `href="tel:+78129195911"`. Иконка телефона (если золотая) — цвет `var(--color-gold-text)` #8A6D3B (на ivory 4.537:1 ≥3:1 по 1.4.11), НЕ `#B08D57` (2.89:1 FAIL); либо иконка внутри gold-заливки кнопки (контекст-независимо). Иконка телефона остаётся как дублирующая подсказка, НО первичный визуал — номер крупно, чтобы пенсионер сразу видел и мог позвонить без догадок. На mobile та же кнопка с крупным номером; `StickyMobileCTA` тоже несёт крупный `tel:`-вариант «Позвонить» (рядом с «Спланировать») — см. блок `StickyMobileCTA`.
  **Пропсы:** `navItems: NavItem[]`, `phone: string`, `waUrl: string`, `tgUrl: string`, `ctaHref: string`.
  **Mobile:** верхний header — лого + бургер/CTA; нижняя `MobileBottomNav` (из репо) — ровно **5** ключевых ссылок, синхрон с header: `Главная(/)` · `События(/events)` · `Меню(/menu)` · `Галерея(/gallery)` · `Спланировать(/plan)` + CTA «Спланировать» (дублирует header). *(канон B3 — единый состав с `04:246`, 5-й пункт = Главная, НЕ «Почему мы»)*. Разделы `/team`, `/why-us` и `/seasonal` достижимы через бургер-меню (раскрывает полный состав шапки). ВСЕ разделы достижимы на mobile — риск бага G (недостижимость) закрыт.
  > **[Волна 4, закрывает R4 (Роман, B-R4) — /reviews в mobile]** 5-пунктовый `MobileBottomNav` НЕ расширяется (контракт B3: ровно 5), НО **`/reviews` выносится как приоритетный чип** в верх бургер-меню (сразу после 5 пунктов bottom-nav, до `/team`/`/seasonal`), с иконкой ★ и подписью «Отзывы». Так скептик Роман достигает отзывов за 1 тап из бургера, минуя лишние экраны. Дублируется ссылкой «Отзывы» в `SiteFooter` (колонка «Компания») и якорем на главной (см. `InspireStrip`/блок 9).
 > **[Волна 8, закрывает ZH2 (Жанна, сезонный НГ)] `/seasonal` — приоритетный чип в бургере + high-season StickyMobileCTA.** По аналогии с `/reviews` (R4): в high-season (`seasonalConfig.season ∈ {newyear,maslenitsa}` ИЛИ активен `deadline`) ссылка **«Сезонное»** поднимается **первым приоритетным чипом** в верх бургер-меню (с иконкой 🎄/🔥 и подписью «Новогодний корпоратив» для `newyear`), выше `/reviews`-чипа, чтобы Жанна достигала НГ-оффера за 1 тап, а не искала в конце меню. Дополнительно: в high-season `StickyMobileCTA` рендерит вариант-ссылку **«🎄 Новогодний корпоратив →»** (`/plan/calculator?event=korporativ&tier=premium`) рядом с основной CTA (см. блок `StickyMobileCTA`, правило high-season). Вне сезона чип «Сезонное» остаётся в бургере на обычной позиции (после `/team`). НЕ прячем сезонное только в 5-пунктовый bottom-nav (контракт B3 не расширяется).
  **Breadcrumbs (хлебные крошки):** примитив `Breadcrumbs` (из репо, `components/common/*`) задействован на ВСЕХ глубоких роутах — `/events/*` (События › {Тип}), `/menu/*` (Меню › {Формат/Каталог/Станции}), `/plan/*` (Спланировать › {Инструмент}), `/blog/*` (Блог › {Заголовок}). На `/`, `/why-us`, `/contact` — НЕ показываются (корень/main-страница). Рендер: `<nav aria-label="Хлебные крошки">` + упорядоченный список ссылок; последний элемент = текущая страница без ссылки с `aria-current="page"`. Закрывает баг F (breadcrumbs ранее не задействованы).
  **a11y:** `<nav aria-label="Основная навигация">`; `SkipLink` на контент; focus-visible; иконки тел/WA/ТГ с `aria-label`.
  **Perf / Responsive:** header в layout, фикс. высота (CLS<0.1); INP<200ms; desktop top-bar, mobile top + bottom-nav.
- `SiteFooter` — контакты, навигация, 152-ФЗ бейдж, соцсети. ГЛУБОКАЯ навигация + 152-ФЗ — ниже (баг 31, ч.3; закрывает ❌ «нет 152-ФЗ в footer»).

  **ГЛУБОКАЯ навигация (НЕ дубль меню):** футер — отдельная инфо-архитектура.
  - **Услуги:** `/events/*` (Свадьба/Корпоратив/Частное/Chef-at-home), `/menu` (+ `/menu/bar` — бар/mixology upsell, достижим из `/menu` и mega-menu «Ещё»), `/plan` (калькулятор/конструктор).
  - **Компания:** `/why-us`, `/team`, `/reviews`, `/blog`, `/careers` (опц., EN-копия резюме), `/partners`.
  - **Помощь (Волна 2А — исправлена битая ссылка бага C):** `/faq`, `/contact`, **Сертификаты** (`/certificates` — отдельная страница, блок CertBlock; ранее вела на `/why-us#cert`, что ломало футер-контракт бага C из `17_IA_CRITIC`), **Зоны доставки** (`/delivery` — карта зон + надбавки вне КАД, блок DeliveryZonesMap), **Политика 152-ФЗ** (`/privacy`), Условия (`/terms`), Cookies (`/cookies`), **Дегустация** (`/tasting`), **Площадки** (`/venues`), **Доступность** (`/accessibility` — заявление WCAG, GapHunter G3), **EN-версия** (`/en`, опц.), **Подписка** (`/subscribe`), **Медиа-кит** (`/media-kit`), **Мои события** (`/account/orders`). **[Волна 5–6, G2/G6]** Колонка «Помощь» дополнена ссылкой **«Какой формат выбрать → `/help/formats`»** (глоссарий форматов на человеческом языке, G2) и **«Я не знаю, что нужно — помогите → `/plan/helper`»** (wizard для новичка, G1/G7) — обе НЕ только в футере, но и в Hero/навигации (см. 04 Hero CTA, G7). Закрывает «нет гида по выбору» для новичка.
  - **Подписка (Волна 2А):** `NewsletterSignup` — email + чекбокс 152-ФЗ → `POST /api/newsletter` (блок описан ниже; ранее `/api/newsletter` был мёртвой ссылкой).
  - **Контакты:** телефон, WhatsApp, Telegram (оба — **первичные каналы связи**, круглосуточный отклик), адрес (СПб), ссылка на карту.
  - **Соцсети (по `29_POSITIONING` §«Соц-ленты»):** **VK @nilov_catering — ПЕРВИЧНЫЙ видимый эмбед в РФ** (всегда доступен, fail-soft → не пустой); Instagram @nilov_catering — **ВТОРИЧНЫЙ, ссылка** (аудитория через VPN, в РФ заблокирован судом → НЕ грузить эмбед). WhatsApp / Telegram — **первичные каналы связи** (круглосуточный отклик). Решение Волны 5А «Instagram→VK» ВОЗВРАЩЕНО (РФ-реальность: VK первичен, IG — ссылка).
  **152-ФЗ (явно, ОБЯЗАТЕЛЬНО):** блок «Обработка перс. данных по 152-ФЗ РФ» со ссылкой на `/privacy`; + упоминание **ТР ТС 021/2011** и Роспотребнадзор (единый язык с `TrustProof`). Закрывает FAIL-условие `19`#31 «нет 152-ФЗ в footer».
  **Связь с `/certificates` (Волна 2А):** 152-ФЗ-бейдж в футере и блок `CertBlock` на `/certificates` ссылаются на ОДИН набор юр. фактов (152-ФЗ, ТР ТС 021/2011, Декларация соответствия, Роспотребнадзор, аккредитация кухни) — единый язык с `TrustProof`/SiteFooter.
  **Пропсы:** `columns: FooterColumn[]`, `contacts: Contacts`, `legalHref: { privacy; terms; cookies }`.
  **a11y:** `<footer>` с заголовками колонок (`<h2>`/`<h3>`); ссылки с понятным текстом (не «тут»); контраст AA.
  **Perf / Responsive:** статичный; CLS<0.1; desktop — 4 колонки + контакты, tablet 2, mobile — аккордеон/стек колонок.
- `TextSizeToggle` — **[Волна 3, закрывает V1 (Виктор, крупный шрифт)]** глобальный переключатель размера текста
  для слабого зрения. UI: компактный блок **«A− A A+»** (3 состояния: меньше / норма / больше) ИЛИ чекбокс/кнопка
  **«Облегчённый режим»** (переключает увеличенный базовый шрифт + повышенный контраст разом).
  - **Поведение:** меняет CSS-переменную базового размера текста (напр. `--text-base` / `font-size` на `:root` через
    `data-text-size="large"`), масштабируя ВЕСЬ текст сайта (body/lead/подписи) по единому `clamp()` из `06_TOKENS`.
    Цель — **WCAG AAA**: основной текст ≥18px (`--text-base` в режиме large = `clamp(1.125rem, 1.4vw, 1.25rem)` ≈ 18–20px),
    контраст текста/фона ≥7:1 (muted-foreground уже поднят до AAA в V6). Выбор **сохраняется в `localStorage`**
    (`nilov-text-size`) и применяется при следующем заходе (как у `AnnouncementBar`).
  - **Где:** видимая кнопка в `SiteHeader` (рядом с навигацией/телефоном, desktop И mobile) + дублируется в `SiteFooter`
    и на `/contact`; НЕ спрятана в бургер-меню (пенсионер должен найти сразу). `prefers-reduced-motion` → без анимации.
  - **a11y:** `role="group"` + `aria-label="Размер текста"`; каждая кнопка-состояние — `aria-pressed`; фокус-видимый gold.
    Увеличение шрифта НЕ ломает layout (все размеры — относительные `rem`/`clamp`, НЕ хардкод px).
  - **Пропсы:** `storageKey?: string`, `steps: {label,scale}[]` (по умол. `['A−','A','A+']`), `onChange?: (size)=>void`.
- `ScrollProgress` *(глобальный примитив, НЕ секция)* — тонкая золотая полоса прогресса скролла. Пропсы: `color?: string` (def `var(--color-ring)` — gold-text #8A6D3B, 4.537:1 ≥3:1 по WCAG 1.4.11; НЕ чистый `--color-gold` #B08D57, который на ivory даёт 2.893:1 < 3:1), `height?: number` (def 3px), `position?: 'top'|'bottom'` (def 'top').
- `SmoothScroll(Lenis)` *(глобальный примитив-обёртка, НЕ секция)* — обёртка всего сайта. Пропсы: `touchMultiplier?: number` (def 2, ВЫКЛ при `prefers-reduced-motion`), `lerp?: number` (def 0.1). Отключает Lenis при `prefers-reduced-motion: reduce`.
- `StickyMobileCTA` — **[benchmark: pxlpeak «Thirsty Click»]** глобальная sticky-кнопка
  снизу экрана на mobile (всегда видима, не теряется лишний шаг). Содержит **первичные каналы связи**
  рядом с заявкой — `Спланировать` (→ `/plan`) + **WhatsApp** и **Telegram** (иконки-кнопки, круглосуточный
  отклик, по `29_POSITIONING` §«Соц-ленты») + опц. `Позвонить` (tel:). WhatsApp/Telegram — НЕ только иконки
  в футере, а вынесены в sticky-CTA как первичные точки контакта. Скрыта на desktop (там каналы в header).
  - **[Волна 1, закрывает B-IGOR-2/3] Primary sticky-CTA = «Спланировать» → `/plan`** (золотая — `bg-primary` #B08D57 заливка + `text-primary-foreground` ink #1C1815 = 5.7:1 ✅ AA; НЕ `--color-gold` как текст), единый primary-маршрут с Hero и MobileBottomNav по `43_NAV_SPEC` §2/§3/§6, canon C9). Мгновенный расчёт доступен как **deep-link-пресет** внутри хаба — Sticky несёт `?format=...&guests=...&tier=...` (см. `04:408-424`), попадая сразу в калькулятор, но базовый href = `/plan` (консистентность). WhatsApp-иконка — **deep link с предзаполненным текстом**:
    `wa.me/<phone>?text=<контекст события>` (напр. «Свадьба, ~80 гостей, подскажите цену за гостя»). Контекст
    тянется из выбранного типа события/калькулятора (проп `waContext?: string`); Игорю НЕ надо печатать вручную в метро.
  - **[Волна 3, закрывает D5 (Дарья, две CTA)] Унификация CTA «Спланировать» (sticky, снизу) и «Спланировать событие» (header, блок 1):** обе кнопки ведут к **одному primary-маршруту `/plan`** (canon C9 per `43` §2/§3/§6 — хаб ведёт в калькулятор/конструктор расчёта, это действие, не просмотр). Header-CTA несёт deep-link-пресет `?format=coffee-break&guests=15&tier=standard` → `/plan/calculator` (пресет D2, попадание сразу в расчёт кофе-брейка, см. D8); Sticky-CTA несёт аналогичный пресет при известном сценарии, но базовый href = `/plan` (консистентность с MobileBottomNav). Убираем рассинхрон «sticky ведёт в расчёт, header — в хаб»: единый primary-вход = `/plan`, прямой расчёт — опциональный deep-link внутри.
  - **[Волна 1, закрывает B-IGOR-8] В sticky-CTA сохраняется иконка-бургер** (доступ к `MobileBottomNav`/меню),
    чтобы при OR-переключении (sticky заменяет bottom-nav) Игорь НЕ терял навигацию Меню/Галерея.

  **Правило mobile sticky-наложения (баг 31, ч.4 — устранение наложения 2+ sticky):** на mobile
  в НИЖНЕЙ зоне экрана одновременно активен ровно ОДИН sticky-элемент.
  - `SiteHeader` (top) — прилипает к ВЕРХУ, НЕ конфликтует с нижней зоной.
  - `MobileBottomNav` (bottom) И `StickyMobileCTA` (bottom) — НЕ видимы одновременно:
    когда `StickyMobileCTA` видима, `MobileBottomNav` скрывается (OR: `StickyMobileCTA`
    заменяет `MobileBottomNav` — та же кнопка «Спланировать» + иконки навигации).
  - **z-index иерархия:** `SiteHeader` (top) `z-[100]` · `StickyMobileCTA`/`MobileBottomNav`
    (bottom) `z-[90]` · `AnnouncementBar` `z-[110]` (над всеми, если видна) ·
    `CookieBanner`/`availability-скриммер` `z-[120]` (самый верх, перекрывает CTA, т.к. они
    заблокируют клик). Overlay/модалки `z-[200]`. Никакого перекрытия активных CTA.
  - **[Волна 3, закрывает V7 (Виктор, оверлеи)] Кнопка закрытия оверлея:** `CookieBanner` и availability-скриммер
    (`z-[120]`) для низкотехничных пользователей несут **КРУПНУЮ (≥44px) понятно подписанную кнопку закрытия**
    — текст **«Понятно»** (основная) ИЛИ **«Закрыть»** (дублирующая), НЕ только крестик `×`. Кнопка на всю ширину
    или крупная плашка, контраст ≥AA. Cookie-баннер НЕ перекрывает основную CTA-зону дольше необходимого:
    показывается один раз, закрытие сохраняется в `localStorage` (как `AnnouncementBar`). Количество оверлеев
    сведено к минимуму (cookie + availability — только при реальной необходимости), чтобы не «терялись кнопки».
  - Desktop: только `SiteHeader` sticky (top); `StickyMobileCTA` отсутствует, `MobileBottomNav`
    отсутствует — конфликт невозможен.

- **МОБАЙЛ-КОНТРАКТ (Волна 5В — закрывает `29_DEVICECRITIC` B2–B7, B11–B12).** Единый чек-лист для mobile,
  применяется во ВСЕХ блоках + `app/globals.css`. Каждый пункт — обязателен, иначе mobile-оценка падает ниже «готово».
  - **B2 · StickyMobileCTA — заявка в 1 тап, НЕ перекрывает контент.** Кнопка `Спланировать / Позвонить`
    ведёт на `/plan` (или tel:) **без промежуточных экранов** — касание = начало заявки. Чтобы sticky НЕ перекрывал
    контент: `main { padding-bottom }` на mobile резервирует высоту под активный нижний элемент
    (`StickyMobileCTA` ИЛИ `MobileBottomNav`, НЕ оба — см. OR-правило выше). Правило: если внизу виден sticky —
    `main` получает `padding-bottom: calc(64px + env(safe-area-inset-bottom))`; иначе — без лишнего отступа (CLS=0).
  - **B3 · MobileBottomNav = ровно 5 пунктов** (фиксируем): `Главная(/)` · `События(/events)` · `Меню(/menu)` · `Галерея(/gallery)` · `Спланировать(/plan)`. Плюс CTA «Спланировать» дублирует header (единый CTA-глагол C9). *[CoherenceChecker C13: унифицировано с `43_NAV_SPEC` §3 — 5-й пункт = Главная, не Почему мы]*
  `/team` и `/seasonal` — только в бургер-меню. Не 3, не 4, ровно 5.
  - **B4 · Нет перекрытия fixed-элементов.** Единая z-иерархия (см. выше): header `z-[100]`, bottom `z-[90]`,
    announcement `z-[110]`, cookie/скриммер `z-[120]`, overlay/модалки `z-[200]`. В нижней зоне ≤1 sticky одновременно.
    `Консьерж` (FAB) — тот же `z-[90]` что bottom-nav, НЕ `z-[50]`, и прячется, когда активен `StickyMobileCTA`
    (иначе FAB висит поверх nav и перекрывает клик — баг из `29`). **[Волна 5–6, закрывает G5 (Григорий, B-GRIG-5)]** Вместо бездействующего FAB — на видном месте (Hero / `/plan` хаб) размещается **реальный помощник новичка**: (а) кнопка «Я не знаю, что нужно — помогите →» (`/plan/helper`, wizard-помощник) на Hero + `/plan`; (б) либо честный FAQ-гид «С чего начать» — блок `FAQTeaser`/#5 «Какой формат мне подходит» (G6) вынесен ссылкой в Hero/навигацию, а не только в футер. FAB `Консьерж` оставляется в `z-[90]` ТОЛЬКО как optional-обёртка над `/plan/helper` (plain-language сценарий), НЕ «молчит в резерве», и видима клиенту. *Публичная оговорка: подбор по 3 вопросам работает по понятным правилам — **без ИИ**, это не искусственный интеллект.* *Внутренняя спека: **AI-слой — в резерве, модель не подключена**; публично НЕ называть «AI-консьерж» — использовать «Консьерж»/«Помощник» (детерминированный wizard, if/else, НЕ генеративный AI).*
  - **B5 · Preloader НЕ блокирует LCP/INP.** `Preloader` держит `z-[100]` ~1.4–1.9s (+ exit) **без учёта
    `prefers-reduced-motion`** — это БЛОКИРУЮЩИЙ баг (спец требует LCP <1.2s, а один прелоадер уже >1.4s и не даёт
    взаимодействовать → INP страдает). Исправить в Фазе 0: (а) либо **убрать** блокирующий прелоадер;
    (б) либо ≤400ms morph-переход без блокировки paint (logo-morph → Hero, `16`#30); (в) либо `useReducedMotion()` →
    **мгновенный `opacity:1`**, без анимации. Никакого `position:fixed; inset:0` блокиратора, пока Hero не отрисован.
    **[Волна 1, закрывает B-IGOR-5] ЖЁСТКО:** на mobile прелоадер НИКОГДА не держит `position:fixed inset:0` дольше 400ms
    и не блокирует input/scroll — иначе на медленном 4G Игорь ждёт и не может нажать. `useReducedMotion()` → мгновенно.
    **[Волна 3, закрывает D9 (Дарья, mobile sticky + прелоадер)]** Гарантируется ДВА жёстких ограничения для mobile (4G, метро):
    (а) **ровно ОДИН sticky в нижней зоне** экрана — правило OR `StickyMobileCTA` ⇄ `MobileBottomNav` (см. выше, B4) строго
    соблюдается, никаких двух одновременных нижних sticky + никакого наложения на контент (B2); (б) **прелоадер ≤400ms на 4G** —
    morph logo→Hero без блокировки paint (B5), иначе Дарья не укладывается в 2 минуты заказа из-за ожидания загрузки.
    Оба ограничения — критерии приёмки волны 3 по Дарье.
  - **B6 · Hero-video — сетевые квоты на mobile, poster = LCP.** На mobile НЕ autoplay без квот.
    **[Волна 1, закрывает B-IGOR-4] ЖЁСТКО (усиление):** hero-video НЕ autoplay и НЕ прелоадится даже на слабом 4G
    (`effectiveType <= '4g'` ИЛИ `hardwareConcurrency <= 4` ИЛИ `deviceMemory <= 4` ИЛИ `prefers-reduced-motion` →
    ТОЛЬКО poster `<img fetchpriority=high>`, видео `preload="none"`, грузится только ПО КЛИКУ/Wi-Fi).
    **Квота на 4G агрессивнее:** `effectiveType === '4g'` на мобильном iPhone уже трактуется как «показать только poster»
    (слабый сотовый 4G в метро бьёт LCP/INP). Hero-video **никогда не блокирует LCP/INP на mobile** — poster рендерится
    как `<img>`, видео вне критического пути.
  - **B7 · Lenis на тач — отключить.** `SmoothScrollProvider` `touchMultiplier:2` конфликтует с нативной инерцией
    на mobile (тягучий скролл, грузит INP). Фаза 0: `smoothTouch:false` ИЛИ отключать Lenis при
    `@media (pointer:coarse)` (на desktop он ок по `01` §4, на mobile — вреден).
  - **B11 · focus-visible 2px gold ring.** Единый `*:focus-visible { outline: 2px solid var(--color-ring); outline-offset:2px }`
    (уже в `globals.css`, но закрепить) — применять на ВСЕ интерактивы, включая `input`/`QuoteForm`/`ContactForm`
    (сейчас местами только `focus:border-gold` без кольца — заменить на `focus-visible:ring-2 ring-ring` где `ring-ring` = `var(--color-ring)` #8A6D3B, 4.537:1 ≥3:1 по WCAG 1.4.11; НЕ чистый `--color-gold` #B08D57 = 2.893:1 FAIL).
  - **B12 · Touch-таргеты ≥44px + safe-area.** В `globals.css` уже `a,button,input…{min-height:44px;min-width:44px}`
    и `.safe-area-bottom{padding-bottom:env(safe-area-inset-bottom)}`. Добавить между соседними тач-целями
    `gap`/`padding` ≥8px (WCAG 2.5.5 spacing) — в `MobileBottomNav` иконки 20px + подпись, тап-зона `w-full h-full`
    внутри `h-16`, но расстояние между ссылками (`gap-1`) <8px → увеличить gap, чтобы исключить случайные тапы.

  - **B13 · [Волна 8, закрывает D6+D7+D8+D4 (Дима, мобильный 4G — критично)] Тач-цели, оверлеи, вес анимаций, ниже-фолда видео.**
    - **(D6) gap MobileBottomNav ≥8px** (усиление B12): `gap-1` → `gap-2` (≥8px). Проверка высоты **ВСЕХ** тач-целей ≥44px распространяется явно на: `«?»`-тултипы форматов (G2), **крестики (×) закрытия модалок/оверлеев**, **чипы фильтров каталога/галереи**, close-кнопку `AnnouncementBar`, кнопку `CookieBanner`. Правило `min-height:44px;min-width:44px` в `globals.css` не имеет исключений для мелких служебных кнопок.
    - **(D7) CookieBanner — крупная кнопка «Понятно» ≥44px, НЕ только ×.** Куки-баннер несёт видимую основную кнопку **«Понятно»** (≥44px, полноширинная на mobile), а не только маленький крестик. Число ОДНОВРЕМЕННЫХ нижних оверлеев на маленьком экране сводится к минимуму: строгое OR-правило sticky (**ровно 1 снизу** — `StickyMobileCTA` ⇄ `MobileBottomNav`, см. B4); `CookieBanner` и `AnnouncementBar` не накладываются на нижний sticky и на контент (резерв высоты, B2). При активном `CookieBanner` нижний sticky временно уступает место (одна модалка-приоритет).
    - **(D8) prefers-reduced-motion → плоский рендер + бюджет INP.** На бюджетном телефоне тяжёлые жесты (clip-path wipe, Ken Burns, parallax `MenuWowGesture`, marquee) растят INP. При `prefers-reduced-motion: reduce` — **плоский рендер без** Ken Burns / parallax / clip-path wipe (статичные кадры). Тяжёлые жесты `lazy-load` (после paint, по IO). Жёсткий бюджет mobile: **LCP <1.2s, INP <200ms** — assert в тестах; Framer-анимации, превышающие бюджет, деградируют до CSS-opacity/transform.
    - **(D4) Видео ниже фолда — facade, НЕ autoplay.** `HomeVideoShowcase` / `EventsRecap` / `TestimonialsCarousel` / `GalleryMasonry` (20–30% видео-контента) на слабом соединении (`effectiveType==='4g'` / `saveData` / `deviceMemory<=4`) — **никакого autoplay**: показывается `poster`-facade + крупная play-кнопка (≥44px), реальный iframe/поток грузится **только ПО КЛИКУ**. Экономит трафик/полосу Димы. Синхрон с B6 (Hero) и видео-слоем (`preload="none"`).
    - **(D5) Экспресс-пресеты 1-тап для ВСЕХ ключевых сценариев на Hero.** «1 тап» сейчас не универсален (Отзывы/Команда/Сезонное/Меню — 2–3 тапа). Deep-link express-пресеты на Hero/главной расширяются со свадьбы/кофе-брейка на **корпоратив** (`?format=banket&event=korporativ&guests=100&tier=standard`), **детский** (`?format=detskoe&guests=20`), **выпускной** (`?format=banket&event=vypusknoy&guests=50`) — прямые чипы-ссылки в калькулятор, минуя хаб. Приоритетные разделы поднимаются в бургер-чипы (см. ZH2/R4).

- **ПЛАНШЕТ-КОНТРАКТ (Волна 8 — закрывает K1–K9, Катя, iPad 768–1023 — критично).** Единый чек-лист для tablet/touch, устраняет «мёртвую зону» между mobile (<768) и desktop (≥1024).
  - **K1 · Sticky-CTA на планшете.** `StickyMobileCTA`/`MobileBottomNav` перестают быть mobile-only: брейкпоинт расширяется до **≤1023px** (`@media (max-width:1023px)`), а не `<768`. На планшете (768–1023) Катя ВСЕГДА видит нижний sticky «Спланировать / Рассчитать» (тот же OR-контракт: ровно 1 снизу, B4). Desktop-header CTA уезжает при скролле — на планшете это компенсирует нижний sticky. `100dvh`/`env(safe-area-inset-bottom)` — см. K7.
  - **K2 · Hover-контент доступен на тач.** ВСЕ hover-эффекты оборачиваются в **`@media (hover: hover) and (pointer: fine)`**. На `(hover: none)`/`(pointer: coarse)` — **tap-to-reveal**: тап по цене = модалка/раскрывашка разбивки (07 hover-tooltip); тап по блюду = preview (B-MUX-7 on-hover dish preview); Ken Burns/card-hover/pauseOnHover — статичный кадр + tap-действие. Ничего не остаётся доступным ТОЛЬКО по hover.
  - **K3 · `«?»`-тултипы форматов (G2) — tap-to-toggle.** Клик/тап по «?» = раскрывашка (`aria-expanded`), НЕ `:hover`. Работает и на desktop (клик), и на планшете (тап).
  - **K4 · Навигация на планшете.** Явный tablet-брейкпоинт: при **≤1023px** top-nav сворачивается в бургер (как на mobile) ИЛИ показывается bottom-nav — единое решение, никакой «мёртвой зоны». Полный состав навигации достижим (бургер раскрывает всё, включая `/team`, `/seasonal`, `/reviews`-чип).
  - **K5 · Раскладка калькулятора/конструктора на планшете** — см. `07` §Responsive и `08` §Responsive (добавлено Волной 8): при 768–1023 — одна колонка со sticky-summary сверху ИЛИ 2-col с расширенным summary (≥40% ширины, не 60% cramped).
  - **K6 · iOS sticky-hover / двойной тап.** Гард `@media (hover: hover)` на ВСЕ hover-эффекты (см. K2) убирает «залипание» карточек и требование 2 тапов по ссылке на iOS. Кликабельность НЕ зависит от `:hover`-логики.
  - **K7 · `100dvh`/`100svh` + safe-area для fixed/sticky.** Все fixed/sticky-элементы (header, нижний sticky, оверлеи, модалки) используют `100dvh`/`100svh` вместо `100vh` (iPad Safari режет `100vh` под динамическим UI-баром) + `env(safe-area-inset-bottom)`. Устраняет обрезание нижнего sticky на iPad.
  - **K8 · Глобальный zoom разрешён (WCAG 1.4.4).** `viewport`-meta НЕ содержит `user-scalable=no` / `maximum-scale=1` — Катя может зумить мелкий текст пальцами. `TextSizeToggle` (V1) — **дополнение**, НЕ замена нативного зума.
  - **K9 · Lenis на планшете — нативная инерция.** Детект `(pointer: coarse)` может не сработать на iPad с подключённой клавиатурой (репортит `fine`) → тягучий скролл. Явная доп.проверка: отключать Lenis при `(pointer: coarse) OR (max-width:1023px) OR maxTouchPoints>0` (iPadOS). Тест на реальном iPad обязателен; при tablet — нативная инерция (как B7 для mobile).

- **[Волна 9, закрывает A1–A9 (Анна, accessibility / скринридер+клавиатура — КРИТИЧНО)] Блок точечных a11y-правок (поверх волн 1–8):**
  - **A1 · Слайдеры калькулятора/конструктора доступны SR+клавиатуре.** `GuestsSlider` и `PackageSelector` (07/08) — кастомный Framer-слайдер НЕДОСТУПЕН скринридеру/стрелочной клавиатуре. → Заменить на **нативный `<input type="range">`** с `aria-valuetext` (напр. «80 гостей» / «Максимальный») ИЛИ `role="radiogroup"` из 4 кнопок-тарифов (каждый `role="radio"` + `aria-checked`). Исключить ситуацию, когда Анна застревает на шаге 1. Проверка e2e: VoiceOver/NVDA + Tab/Arrow.
  - **A2 · Текстовая альтернатива видео.** `TestimonialsCarousel`(video), `EventsRecap`, `GalleryMasonry`-video несли только `title`/`durationSec` — НЕТ transcript/alt. → CMS-поле **`transcript`/`description` ОБЯЗАТЕЛЬНО** для `VideoClip`; `<video>`/`VideoFacade` несут `aria-label` + ссылку на текстовую версию. Закрывает WCAG 1.2.1/1.2.3 (альтернатива медиа). Видео-отзывы/рекапы НЕ остаются «слепым пятном» для SR.
  - **A3 · Контраст (B1) — токены применены в спеке.** `06_TOKENS.md` уже несёт светлую палитру (ivory `#FAF7F2` / ink `#1C1815` / gold `#B08D57`, `--color-muted-foreground:#4A423B` ≈8.9:1, AAA). Код `globals.css` — legacy (тёмный), переписание по `06_TOKENS` = **Фаза 0 сборки** (`15_REPO_AUDIT`), вне зоны структуры. ЗАКРЫТО на уровне спец-токенов; при сборке — прогнать axe + Lighthouse a11y, зафиксировать AA(4.5:1)/AAA(7:1).
  - **A4 · Live-анонс цены.** `ResultDisplay`(07) и `LiveSummaryBar`(08) обернуть итог в **`aria-live="polite"` (+`aria-atomic`)** — смена цены при движении слайдера озвучивается SR. `countUp` — декоративен, финальное значение анонсируется без гонки анимации.
  - **A5 · Steppers конструктора.** `CustomMenuBuilder` per-guest +/− — дать `aria-label` («Увеличить порций для „Борщ“») + `role="spinbutton"` + `aria-valuenow/min/max`; `per-dish exclude` — `aria-pressed`.
  - **A6 · Focus-trap в оверлеях.** `CookieBanner` / availability-скриммер / модалки — реализовать **focus-trap**: фокус запирается внутри, `Escape` закрывает, фокус возвращается к триггеру. Прописать явно (сейчас только «крупная кнопка закрытия»).
  - **A7 · Alt фото ОБЯЗАТЕЛЕН.** `Dish.photo.alt` и карточки галереи/событий — `alt` **обязательное** поле (осмысленное описание блюда/события, НЕ имя файла). `DishCard` рендерит `alt` из CMS; валидация: ни одно из 78 фото НЕ уходит с пустым/декоративным alt.
  - **A8 · Lenis + reduced-motion.** `SmoothScrollProvider` отключать Lenis НЕ ТОЛЬКО по `pointer:coarse`(B7), НО и при **`prefers-reduced-motion: reduce`** (иначе инерционный скролл конфликтует с ожиданием «покоя» у Анны).
  - **A9 · Реализация spec-блоков.** `TextSizeToggle`(В1) и крупная кнопка звонка(В2/В3) — spec-блоки, уже в `04` (строки 120/142). При сборке — реальная верификация axe + SR-прогон (крупный шрифт/масштабирование, подписанный номер).

- **[Волна 9, закрывает P1–P9 (Петя, возврат-клиент — КРИТИЧНО)] Блок «Мои события / история заказов» (ранее «личный B2B-кабинет» был вне scope — для возврат-клиента нужен МИНИМУМ):**
  - **P1 · Роут + блок истории.** Добавить роут **`/account/orders`** (или `/my-events`) + блок `OrderHistory` (read-only список прошлых событий: дата, формат, гости, состав, итог) + пункт в `SiteFooter`(«Компания») и бургер-меню. `02_IA.md` дополнить роутом.
  - **P2 · Клон заказа 1 тапом.** На карточке прошлого события — CTA **«Повторить заказ →»** → `/plan/constructor?clone=<orderId>` (предзаполняет ВЕСЬ `ConstructorState` из CRM: format+guests+tier+аддоны+состав меню, а не только формат). Это аналог deep-link-пресетов, но с реальным составом.
  - **P3 · Распознавание возврата.** На `/contact` и в `StickyMobileCTA` — лёгкий вход «Уже заказывали у нас? Введите телефон → покажем ваши события» (без тяжёлой реги, 152-ФЗ-согласие на ПД) ИЛИ по cookie возврата — баннер «С возвращением! Повторить заказ от <дата>?».
  - **P4 · Пресет-клон несёт полный набор параметров** из прошлого заказа (см. P2), а не только format/guests/tier.
  - **P5 · Источник — РФ-БД, НЕ sessionStorage.** `ConstructorState` в `sessionStorage` (08) восстанавливает черновик только ЭТОЙ сессии — ЭТО НЕ история. Чтение заказов = отдельный механизм из БД заказчика (`02_IA` §152-ФЗ).
  - **P6 · `repeatOfOrderId?` в payload.** `/api/contact` несёт `State` forward-only; добавить поле `repeatOfOrderId?`, чтобы менеджер подтянул состав прошлого заказа, если клиент пишет вручную.
  - **P7 · CTA «Повторить» в навигации.** В `MobileBottomNav`(контракт B3 = ровно 5) история недостижима → вынести «Повторить заказ» как **приоритетный чип в бургер-меню** (по аналогии с `/reviews` R4 и `/seasonal` ZH2) — 1 тап из бургера.
  - **P8 · Пересчёт по ТЕКУЩЕМУ прайсу (BUG-F2).** Клон прошлого заказа пересчитывает по актуальному `calcTotal`, НЕ показывает «как в прошлый раз за 4 470» при новой цене.
  - **P9 · Клон сбрасывает дату.** Прошлое событие год назад — дата занята. Клон открывает `AvailabilityCalendar mode='book'` (сброс даты), а НЕ пытается «забронировать ту же дату».

- `AwardsStrip` → **ОБЪЕДИНЁН в `TrustProof`** (см. блок 57). Отдельный proof-ряд убран — факты (более 19 лет 🟡 / 3 500+ 🟡 / отраслевые премии 🟡 / клиенты 🟡) теперь в `TrustProof` `variant:'facts'`.
- **LiveInstagramFeed** — **[benchmark: Hamby, pxlpeak]** real-time лента последних постов
  (VK @nilov_catering — **ПЕРВИЧНЫЙ видимый эмбед в РФ** (всегда доступен, fail-soft → не пустой); Instagram @nilov_catering
  — **вторичный, ссылка** (аудитория через VPN), по `29_POSITIONING` §«Соц-ленты» (решение Волны 5А «Instagram→VK» ВОЗВРАЩЕНО для волны 3 Камилы: в РФ Instagram заблокирован → VK первичен, IG — ссылка). UGC = живое соц-доказательство. WhatsApp/Telegram — первичные каналы связи (см. SiteHeader/StickyMobileCTA/SiteFooter).
- `AvailabilityCalendar` — **[benchmark: webcitz gold std]** мини-календарь занятости
  («3 даты в августе заняты»), urgency-бейдж. Доверие к исполнению + подогрев дефицита.
  - **[Волна 1, закрывает B-ANN-1] Режим бронирования (write-mode) — самообслуживание даты.** Календарь
    больше НЕ только read-only urgency-бейдж. Активный слот кликабелен → открывает inline-форму
    «Забронировать эту дату» (имя + телефон + событие/тип) ИЛИ deep-link в WhatsApp/ТГ с предзаполненной
    датой (`wa.me/<phone>?text=Хочу забронировать <дата>, <тип события>`). После подтверждения слот
    помечается «ваша дата забронирована» (опц. статус из `/api/availability`).
    - **Встроен как шаг брони** на `/plan/calculator` (после DatePicker — кнопка «Забронировать выбранную
      дату») И на `/plan/constructor` (шаг 6 Контакт дублирует inline-календарь) И на `/events/svadba`
      (отдельный блок «Проверить дату и забронировать» сразу под hero, см. EventHero B-ANN-1).
    - На `/events/svadba` и в `EventTypeSelector`-карточке свадьбы — CTA **«Проверить дату и забронировать»**
      ведёт прямо в календарь-бронь (не только read-only бейдж). Клиент НЕ обязан звонить/писать вручную.
    - **[Волна 7, закрывает O3+O4+O8 (Олег, тайм-критичный)] ЧЕСТНОЕ И МГНОВЕННОЕ ПОДТВЕРЖДЕНИЕ БРОНИ:**
      - **Реальные занятые даты ДО релиза (O4):** `occupiedDates` заполняются РЕАЛЬНЫМИ данными заказчика
        ДО прод-релиза (аналог bulk-импорта аллергенов S1 — выгрузка из CRM/календаря заказчика). Пока
        импорт НЕ завершён — календарь НЕ показывает тихую «свободно» для всех дат: вместо этого видна
        явная пометка **«Точную занятость уточняйте у менеджера»** (честно, как у аллергенов pending-verification).
        Если `/api/availability` недоступен или вернул пусто — статус слота = «уточните у менеджера», НЕ «свободно».
      - **Мгновенное «Дата забронирована ✓» (O3):** если выбранный слот по live-данным реально свободен —
        после отправки формы Олег видит **мгновенное «Дата забронирована ✓» прямо на экране** (без ожидания
        перезвона). Если слот занят/требует подтверждения менеджера — в форме брони СРАЗУ показывается явный
        SLA: **«Слот требует подтверждения — перезвоним ≤15 минут»** (тот же SLA, что в `08` шаг 6 «Перезвоним ≤15 мин»).
        НЕ оставлять Олега в неизвестности «после подтверждения менеджером».
      - **Строго отформатированная дата в deep-link (O8):** WA/ТГ-deep-link несёт дату в СТРОГОМ формате
        `DD.MM.YYYY` из выбранного слота (НЕ произвольная строка клиента). В чате дублируется подтверждение:
        **«Дата получена: DD.MM.YYYY, менеджер подтвердит»** — валидация/подтверждение даты ДО брони, без риска
        «Олег отправил неточно».
    - **[Волна 7, закрывает O7 (Олег)] ЖИВОЙ СЧЁТЧИК СВОБОДНОСТИ:** над календарём — счётчик
      **«Осталось N свободных дат на ближайшие 7 дней»**, считается из реальных `occupiedDates` (модель
      `AvailabilityDay` из раздела «Источник данных» ниже). Urgency-бейдж «🔥 3 даты в августе заняты»
      СВЯЗАН с этим счётчиком и сезонностью (Декабрь → «Высокий сезон», счётчик падает) — подогрев срочности
      на основе живых данных, а не декоративный.
    - **Props:** `<AvailabilityCalendar mode='read'|'book' occupiedDates eventType? onSelectDate? freeSlotsIn7Days? minBookingDays=3 confirmMode='instant'|'callback' slaResponseHours=2 slaBookingConfirm='O3' />`.
      `mode='book'` рендерит CTA «Забронировать эту дату» → `/api/booking` (или WA-deeplink с датой).
      `minBookingDays` (по умолч. **3**) — единый минимальный срок, показывается ДО выбора даты (см. O2).
      `slaResponseHours` (по умолч. **2**) и `slaBookingConfirm='O3'` — биндинг к `SERVICE_DELIVERY_SPEC` §6: SLA ответа ≤2 ч в рабочее время и подтверждение брони по O3 (статус «подтверждено» показывается в UI календаря/формы).
    - a11y: выбранная дата = `<button aria-label="Забронировать <дата>">`; занятые = `aria-disabled`.

## ВИДЕО-СЛОЙ (РФ-стек, Волна 5А) — `VideoProvider` абстракт *(HostingCritic #1/#2, 29 §Бюджетный стек)*

> **ЗАПРЕТ в структуре:** ❌ Vimeo (платно $20–70/мес + заблокирован/нестабилен в РФ, поддержка на RU прекращена) → ✅ **Rutube / self-host**.
> Весь видео-слой сайта держится НЕ на хардкоде Vimeo, а на одной точке свопа — `VideoProvider`.
> Смена провайдера = одна переменная конфига, НЕ переписывание 8+ блоков.

```ts
// lib/video.ts — ЕДИНАЯ точка свопа видео-провайдера (РФ-стек)
// Vimeo ЗАПРЕЩЁН в РФ (платно + нестабилен/заблокирован) — НЕ входит в union (см. 30_HOSTING_CRITIC, 04_BLOCKS:317)
export type VideoProvider = 'rutube' | 'selfhost';
export const VIDEO_PROVIDER_DEFAULT: VideoProvider = 'rutube';

export interface VideoRef {
  provider: VideoProvider;   // 'rutube' | 'selfhost'
  id?: string;               // id на Rutube (для facade-эмбеда)
  src?: string;              // self-host путь (наш домен, <2МБ loop / полный recap)
  posterSrc: string;         // постер (LQIP ≤10КБ → full ≤120КБ), ВСЕГДА локальный
  durationSec?: number;
}

// Фасад-эмбед: poster + play-btn, iframe грузится ТОЛЬКО по клику (LCP-безопасно).
// Для Rutube: https://rutube.ru/play/embed/{id} ; для self-host: <video> на нашем домене.
export function getEmbedUrl(ref: VideoRef): string | null {
  switch (ref.provider) {
    case 'rutube':   return ref.id ? `https://rutube.ru/play/embed/${ref.id}` : null;
    case 'selfhost': return ref.src ?? null;          // локальный файл на нашем VPS-домене
  }
}
```

**Правила для ВСЕХ видео-блоков (Единый контракт):**
- **Хранение клипов:** Rutube (бесплатно, РФ-резидент, доступен в РФ) ИЛИ self-host MP4 (<2МБ loop / полный recap) на том же VPS — **НЕ Vimeo по умолчанию**. Ссылка/ID клипа лежит в CMS-поле `VideoRef` (тип вместо хардкод `vimeoId`).
- **Facade-эмбед** (poster + play-btn, iframe по клику) — единый компонент `<VideoFacade ref={VideoRef} />` для всех блоков ниже (HomeVideoShowcase, EventsRecap, TestimonialsCarousel video-wall, GalleryMasonry video-items, ShowCookingGrid, WhyUs, TrustProof, EventHero).
- **CSP / remotePatterns** (`next/image` + iframe): разрешить `rutube.ru`, `player.rutube.ru`, `cdn-ru.rutube.ru` и свой домен; **убрать `vimeo.com`** (HostingCritic #6/#7). При свопе провайдера правится ТОЛЬКО список доменов здесь.
- `prefers-reduced-motion` → НЕ autoplay, показ poster + play-btn (ручной старт).

---

## Секции главной (порядок рендера)

> ФОРМАТ детальной спецы под каждым блоком (закрывает bug-list Critic A, `19` §Критик A):
> `Пропсы` · `Копирайт/данные` · `Медиа-ассеты (17)` · `LCP/INP/CLS-бюджеты` ·
> `a11y (aria/alt/reduced-motion)` · `Responsive (брейкпоинты)`.
>
> **ЕДИНЫЙ КОНТРАКТ «живого фото» (все карточки меню/форматов/галереи/станций, C8):**
> база — **Ken Burns** (CSS/Framer scale 1→1.08, 6s) на hover + лёгкий parallax (`ParallaxImage`).
> Loop-видео НЕ дефолт. **Опц. enhancement (явный exception):** короткое **видео ПО КЛИКУ** — только для
> кураторской подборки «хитов» (≈20–30 блюд, `DishCard`) и интерактивных станций (`ShowCookingGrid`), инициирует
> пользователь, НЕ autoplay. EventHero / GalleryTeaser / FormatShowcase / MenuPreview / DishCard / ShowCookingGrid
> — все используют ТОТ ЖЕ механизм (см. `06_TOKENS` §motion, `01` §4).
>
> **ЕДИНЫЙ primary-CTA-глагол (C9):** «Спланировать событие» (→ `/plan`). Hero и CTASection используют его.
> Глагол «Выбрать формат» — ТОЛЬКО как подпись карточки выбора типа события (вторичный интент), не site-level CTA.

1. `HeroSection` (УЖЕ есть в `components/sections/`, перекрасить) — **вариант В (Drinkit «живое фото», по `28_HEROCRITIC`):** poster (LCP-элемент) + subtle-loop/Ken Burns реального события поверх, видео **НЕ** является LCP-кандидатом + заголовок Cormorant + **канон CTA (P0-8, Итерация 2): ровно 1 primary-CTA «Спланировать событие» → `/plan` + 1 secondary ghost-ссылка «Смотреть форматы» → `/events`**. Все ценовые якоря (блок М1 ниже) и календарь брони (`AvailabilityCalendar`, блок O1 ниже) **ВЫНЕСЕНЫ в отдельный нижний блок `HeroExtras` (сразу под Hero, НИЖЕ фолда)** — на первом экране НЕТ 4 ценовых якорей и НЕТ календаря брони. Helper-CTA «Я не знаю, что нужно → /plan/helper» и экспресс-пресеты остаются НА хабе `/plan` и в `HeroExtras`, не дублируются выше фолда (закрывает B1; C9).
   **⚠️ ПРОТИВОРЕЧИЕ ЗАКРЫТО (`16`#30 vs `09`):** entrance H1 = **clip-path wipe** (ink-bleed), НЕ fade.
   `09_HERO_STORYBOARD.md` (строки 61–75) описывал и fade, и wipe — зафиксировано: **финал = clip-path wipe**
   (`inset(0 100% 0 0)`→`inset(0)` per word, stagger 60ms, Framer `animate`), fade допускается
   ТОЛЬКО для Overline/Sub/Microcopy, НЕ для H1. Seamless Preloader→Hero (morph лого `16`#30).
   **Детальная спец:**
   - **Пропсы:** `<HeroSection videoSrc posterSrc overline h1 h1Accent sub ctaPrimary ctaSecondary microcopy />`.
     Все строки — из CMS/i18n, не хардкод. `ctaPrimary.href="/plan"`, `ctaSecondary.href="/menu"`.
     **Вариант В (Drinkit living-photo, `28_HEROCRITIC`):** `posterSrc` — **LCP-элемент** (рендерится как `<img>`, НЕ CSS-background, иначе не попадает в LCP-расчёт и не прелоадится), грузится мгновенно с `fetchpriority="high"`; `videoSrc` — subtle-loop/Ken Burns реального события, **фоновый enhancement поверх poster**, грузится ПОСЛЕ paint (`preload="none"` + `requestIdleCallback`/`window.load`, НЕ в том же кадре что poster, чтобы не бить INP/LCP), НЕ является LCP-кандидатом.
   - **Копирайт/данные (точно из `09`):**
     - Overline: `NiloV Catering · Петербург · с 2007`.
     - H1: «Кейтеринг, который **чувствуешь** заранее.» (`чувствуешь` — *italic* Cormorant, диагональная линия-акцент SVG `--color-gold` — декоративно, `aria-hidden`, non-essential).
     - Sub: «3 500+ событий (на проверке) за более 19 лет (с 2007 года) 🟡 — **под ключ для любого бюджета**. От семейного ужина до банкета на 500 гостей — ресторанное качество там, где вы его не ждёте, **по честной цене, без переплаты за вывеску**.» (число «3 500» — НЕ подтверждённый факт, помечен «(на проверке)» прямо в видимом тексте + 🟡; более 19 лет — пометка 🟡 «подтвердить актуальное число у заказчика»; на живом сайте NiloV указано «более 19 лет (с 2007)», единая формулировка — «более 19 лет (с 2007 года)»)
     - CTA primary: «Спланировать событие» (gold pill, `aria-label="Спланировать событие"`, `ctaPrimary.href="/plan"`).
     - CTA secondary: «Смотреть форматы» (ghost, `ctaSecondary.href="/events"`). *(P0-8: secondary ведёт на `/events`, ранее было «Смотреть меню» → `/menu`; унифицировано с каноном C9.)*
     - **[Волна 5–6, закрывает G7 (Григорий, B-GRIG-7)]** Рядом с primary/secondary — **вторичная CTA «Я не знаю, что нужно — помогите →»** → `/plan/helper` (wizard-помощник, G1). Для новичка primary «Спланировать событие» абстрактен — эта CTA даёт понятную точку входа «без знания формата». Видима на desktop И mobile (вторым пиллом под primary, либо в StickyMobileCTA как третий вариант рядом с «Рассчитать цену»).
     - **[Волна 1, закрывает B-IGOR-1] ЦЕНА — НИЖЕ ФОЛДА (блок `HeroExtras`, P0-8):** микро-строка цен рендерится в `HeroExtras` сразу под Hero (НЕ выше фолда). Дублирует блок М1:
       **[Волна 7, закрывает M1+M4+M5+M6 (Марина, бюджетный)] ДНО ЦЕНЫ ВПЕРЁД + ЕДИНЫЙ ЛЕЙБЛ ТАРИФА + МИН. ЧЕК + КАД:**
       строка НАЧИНАЕТСЯ с самого дешёвого полноценного формата, лейбл тарифа приклеен к КАЖДОЙ «от X ₽»
       (закрепляем B-MAX-4 везде — НЕТ разнобоя), минимальный чек и порог КАД видны сразу:
       «☕ **Кофе-брейк — от 390 ₽/гость (Эконом, минимум)** 🟡 *(статус: `pending` — ведущий якорь = реальная цена с живого сайта NiloV 390 ₽; канон 950 — вторичное уточнение, требует сверки с прайсом заказчика до публикации, НЕ использовать как подтверждённый якорь)* · 🥪 **Фуршет Эконом — от 2 450 ₽/гость (Эконом, минимум)** ·
       🍽 Банкет — от 4 470 ₽/гость (Стандарт)».
       - **Минимальный чек рядом с ценой (M4):** под строкой — уточнение
         «Фуршет Эконом доступен с 20 гостей → **минимальный заказ от 49 000 ₽** (20 × 2 450). Кофе-брейк — от 10 гостей».
       - **Доставка в КАД прозрачно и заранее (M5):** «Доставка в КАД включена; вне КАД — надбавка +N ₽ (уточняется при расчёте)».
         Порог и сумма надбавки показываются на этапе ПЕРВОГО расчёта (не всплывают поздно), чтобы «от 2 450» не оказалось враньём для клиента из области.
       - Единообразие лейбла (M6): те же формулировки «(Эконом, минимум)» в `FormatShowcase`, `EventTypeSelector` и aria-label — без разнобоя.
       Это убирает главную боль «торопящегося жениха» — цена на 1-м экране, без скролла до `FormatShowcase`.
       > **[Волна 5–6, закрывает G4 (Григорий, B-GRIG-4)]** Цена-строка выше фолда **НЕ грузит новичка жаргоном**:
       > рядом с каждым термином — «что это»: «**Кофе-брейк** — кофе+десерт в перерыве (от 390 ₽ 🟡, канон 950 — вторичное уточнение, требует сверки)»;
       > «**Банкет** — посадка за стол, официанты, классика (от 4 470 ₽)». Аббревиатуры **КАД** (граница города, доставка в ней включена)
       > и **су-вид** (способ приготовления, без наценки за бренд) — заменены понятным языком либо даны с расшифровкой в скобках,
       > НЕ в первом экране как сухие аббревиатуры. Цель: новичок не чувствует себя глупым на Hero.
       > ⚠️ **[Волна 3, закрывает D7 (Дарья, BUG-F2)] Цена «Кофе-брейк от 950 ₽» — `pending-verification`.**
       > На живом сайте NiloV кофе-брейк указан от **390 ₽** (см. `07` §BUG-F2 / TODO баг 2 п.4). НЕ выдумывать
       > цифру — в `04`/`07` помечено `pending-verification`; финальное значение `priceValidUntil` фиксируется
       > ТОЛЬКО после сверки с актуальным прайсом заказчика. До сверки Hero-строка и `FormatShowcase`/`EventTypeSelector`
       > показывают канон 950 ₽ с пометкой `pending-verification` (не «реальная из прайса»).
     - **[Волна 1, закрывает B-ANN-4/7] Быстрый пресет 1-тап на Hero:** кнопка-ссылка «Рассчитать свадьбу на 80 гостей →»
       → `/plan/calculator?event=svadba&guests=80&format=banket&tier=standard` (предзаполнено, итог live сразу,
       без 4–5 шагов вручную). Дублируется на `/plan` хабе.
     - **[Волна 3, закрывает D1+D2 (Дарья, деловой завтрак)] Экспресс-пресет «Кофе-брейк на 15»:** рядом с
       пресетом свадьбы — кнопка-ссылка **«Собрать кофе-брейк на 15 →»** →
       `/plan/constructor?format=coffee-break&guests=15&tier=standard` (предзаполнено формат+гости+тариф,
       шаг 1 пропущен, итог кофе-брейка сразу, без 6 шагов мастера). То же жесткое правило, что у пресета свадьбы:
       экспресс-путь ДОЛЖЕН предзаполнять `format`/`guests`/`tier` из deep-link (см. D8). Дублируется на `/plan` хабе
       и в `EventTypeSelector`-карточке «Деловой завтрак / Кофе-брейк» (см. блок 4, D1).
       - **[Волна 7, закрывает M2 (Марина, бюджетный)] ЧИП «МНЕ НУЖНО МАКСИМАЛЬНО ДЁШЕВО» НА ГЛАВНОЙ:**
       рядом с пресетами Hero — кнопка-ссылка **«💸 Мне нужно максимально дёшево →»** →
       `/plan/calculator?preset=cheapest` (economy + furshet предвыбраны, чип «Показать самое дешёвое решение»
       активен — см. B-MAX-5/М6 в `07`). Бюджетник попадает в дешёвый путь С ПЕРВОГО ЭКРАНА (не на 2 клика вглубь калькулятора).
       Тот же чип дублируется на `FormatShowcase` (под карточками форматов) и на `/plan` хабе.
    - **[Волна 7, закрывает A5 (Артём, премиум 500)] ЭКСПРЕСС-ПРЕСЕТ «БАНКЕТ НА 500»:** рядом с пресетами Hero —
      кнопка-ссылка **«Банкет на 500 гостей →»** → `/plan/calculator?guests=500&format=banquet&tier=premium`
      (предзаполнены гости/формат/тариф, шаг 1 конструктора пропущен, итог банкета на 500 сразу; см. deep-link D8).
      Решительный клиент верхнего тарифа НЕ тащит 500 вручную через 6 шагов. Тот же deep-link дублируется на `/plan` хабе
      и на карточке Частное/Банкет `EventTypeSelector` для 500-гостевого сценария.
     - **[Волна 3, закрывает K7 (Камила)] Микро-подпись живого события на Hero:** под H1/Sub (видимый текст,
       НЕ только декоративный фон) — капшен «реальное событие · площадка · тип», напр.
       «🔴 В эфире: корпоративный завтрак · Петербург · 15 гостей». Цель: с первого экрана ясно — про НАСТОЯЩИЕ
       красивые события, а не про абстрактный пафос. Капшен тянется из CMS-поля `heroLiveEvent?` (опц., не блокирует LCP).
     - **[Волна 7, закрывает O1+O5+O2+O6+O7+O9 (Олег, тайм-критичный)] ТОЧКА ВХОДА «ПРОВЕРИТЬ ДАТУ» — НИЖЕ ФОЛДА (блок `HeroExtras`, P0-8):**
       рядом с primary-CTA Hero (ИЛИ как отдельная золотая кнопка-вторичник (`border-gold-text` #8A6D3B — outline-вариант, ≥3:1 по 1.4.11; либо `bg-primary` #B08D57 + `text-primary-foreground` ink 5.7:1 ✅ для заливки) прямо под «Спланировать событие») —
       видимая CTA **«📅 Проверить мою дату»** → открывает **интерактивный `AvailabilityCalendar mode='book'` СРАЗУ**;
      цвет НАДПИСИ кнопки для outline-варианта — явно `text-foreground` (ink) ИЛИ `text-gold-text` #8A6D3B (ivory, ≥16px/≥600); `--color-gold` #B08D57 как текст **ЗАПРЕЩЁН** (2.893:1 FAIL),
       без 4 шагов калькулятора. Дата для Олега **первична**, расчёт — вторичен.
       - **Интерактивный мини-календарь `mode='book'` рядом с Hero** (НЕ только read-only urgency-бейдж): компактный
         `AvailabilityCalendar variant='mini' mode='book'` живёт в Hero-секции (или сразу под ней, ДО `InspireStrip`),
         чтобы Олег проверил КОНКРЕТНУЮ дату и забронировал её с главной, не уходя в `/plan`.
       - **Единый минимальный срок — ДО выбора даты:** над календарём (и в форме брони) висит явная подсказка
         **«Минимальный срок бронирования — 3 полных дня»** (единая константа `MIN_BOOKING_DAYS = 3`, см. O2 ниже —
         применяется во ВСЕХ инструментах: калькулятор `07`, конструктор `08` шаг 6, форма брони Hero). Старая
         размытая формулировка «Дата <3 дней» заменена на точную «минимум 3 полных дня» (событие «ровно через 3 дня» = разрешено).
       - **Живой счётчик свободности (O7):** над/под мини-календарём — счётчик из реальных `occupiedDates`:
         **«Осталось N свободных дат на ближайшие 7 дней»** (обновляется по `/api/availability`). Urgency-бейдж и
         сезонность («Декабрь → Высокий сезон») СВЯЗАНЫ с этим счётчиком — подогревают срочность на основе живых данных.
       - **Не перекрывает CTA (O9):** если показывается `availability-скриммер` (`z-[120]`), он НЕ перекрывает
         primary-CTA «Проверить дату»; либо CTA «Проверить дату» дублируется вне зоны перекрытия (выше скриммера),
         либо скриммер несёт собственную кнопку «Проверить дату» того же действия.
       - **Дублируется в `/plan` хабе:** та же CTA «Проверить мою дату» → интерактивный `AvailabilityCalendar mode='book'`
         видна наверху хаба `/plan` (сразу, без захода в калькулятор/конструктор).
     - Microcopy: «♦ Доставка в КАД (граница города) включена · Кухня су-вид (медленная варка при низкой t°, без наценки за бренд) · [Маркировка по 14 аллергенам →](/menu/catalog?diet=gluten-free) · **без скрытых доплат — цена в калькуляторе прозрачная**». **[Волна 7, A7 (Артём, премиум)]** Слово «реальная» убрано из Hero-microcopy: цены (банкет верхнего тарифа «Максимальный» 6 970 и др.) несут пометку `pending-verification` до сверки с актуальным прайсом заказчика (см. `07` §PENDING / BUG-F2). Пока не сверено — НЕ claim «реальная» рядом с неподтверждёнными числами (качественный клиент учует); используем честное «прозрачная / подтверждается перед релизом». **[Волна закрытия NINA, B-NINA-6]** обещание Hero «Маркировка по 14 аллергенам» НЕ пустое — ведёт прямой ссылкой в отфильтрованный по БГ каталог (`/menu/catalog?diet=gluten-free`), разрыв логики устранён (Нина сразу попадает в реальную подборку, а не в «декларацию контракта»).
    - **[Волна 10, закрывает B-G8/B-G5 (Гоша — КРИТИЧНО)] (1) «Без скрытых доплат» подкреплено делом.** Обещание Hero-микрокопирайта НЕ декларативно: в итоге калькулятора (`ResultDisplay`, 07) и `LiveSummaryBar` (08) показывается **микро-блок разбивки «что входит»** — еда, посуда, доставка в КАД (0 ₽) — И явно «НЕ входит: депозит 30% (возвратный), надбавка вне КАД (таблица зон из `/delivery`), аддоны» (дополняет Марину/волну 7, НЕ дублирует). (2) **Единая подтверждённая цена (BUG-F2).** Канон `07` сверяется с прайсом заказчика ДО релиза; на сайте везде несётся ЕДИНАЯ подтверждённая цифра (канон «Кофе-брейк от 950 ₽» vs живой сайт «от 390 ₽» — противоречие устраняется сверкой; пока не сверено — `pending-verification`, НЕ публикуется как факт). Иначе аргумент «мы дешевле/честнее» рушится.
     - **[Волна 5–6, закрывает A1+A4 (Али, B-ALI-1/4)]** К microcopy Hero добавляется явное упоминание диет-опций со ссылкой на фильтр-каталог: «🌱 Веган · 🌾 Безглютен · 🕌 Халяль — по запросу, при наличии сертификации → [смотреть меню](/menu/catalog?diet=halal)». Халяль заявлен НА ВХОДЕ (главная), не «невидим» для Али. Ссылка ведёт прямо в отфильтрованный каталог (A1 deep-link).
   - **СТАТУС FACTCHECK (см. FACTCHECK_REPORT_2026-07-20.md, независимый FactChecker, табл. #6 ❓ no-data) — 🟡 БЕЗ ПОДТВЕРЖДЕНИЯ:** подтверждено внешне = «с 2007» (живой сайт: «более 19 лет (с 2007)»), банкет/свадьба «от 4 470 ₽», корпоратив «от 2 450 ₽», 152-ФЗ и ТР ТС 021/2011 — реальные законы. 🟡 «3 500+ событий» — НЕ подтверждено независимо: FACTCHECK_REPORT (стр. 19, 51) помечает это ❓ no-data (балл 2, critical), «ссылка на отчёт FactChecker невоспроизводима». Публиковать ТОЛЬКО как «3 500+ 🟡» со статусом `pending` (🟡 = финальную цифру уточнить у заказчика), НЕ как подтверждённый факт. 🟡 **«более 19 лет (с 2007 года)»** — единая унифицированная формулировка (живой сайт пишет «более 19 лет», арифметически с 2007 → 19, но прод клиента показывает 18; зафиксировано ОДНО число «более 19 лет (с 2007 года)» во избежание противоречия 18/19). ⚠️ «су-вид технология» — внешне НЕ подтверждена, `pending-verification`, НЕ выдавать за верифицированный факт. 🟡 логотипы Эрмитаж/Мариинский/Armani/Газпром/Forbes как «клиенты» — 0 веб-подтверждений; Роспотребнадзор — НЕ клиент (госрегулятор), исключить. Все непроверенные claims → 🟡 до сверки с заказчиком.
   - **Медиа-ассеты (`17` §3, §6):** `public/demo/hero-loop.mp4` (16:9, светлый буфет/банкет, 720p WebM+MP4,
     muted, seamless loop, <2MB) + `public/demo/hero-poster.webp` (poster, LCP-элемент).
     **Poster (вариант В, `28_HEROCRITIC` #2/#5):** рендерится как `<img>` (НЕ CSS-background),
     webp/AVIF **≤120КБ** + LQIP **≤8КБ** (blur-up), `fetchpriority="high"`, и в `<head>`:
     `<link rel="preload" as="image" fetchpriority="high" href={posterSrc}>`. **Кадр poster обязан
     совпадать с 1-м кадром seamless-loop** (иначе «дёргается» при старте видео).
     **Видео (вариант В, `28_HEROCRITIC` #6):** атрибуты `muted playsinline loop autoplay`
     (`playsinline` — чтобы iOS autoplay работал; `muted` — чтобы браузер не блокировал autoplay;
     `preload="none"` — грузится idle ПОСЛЕ paint). Источник реального события — `17` §8, через `VideoProvider` (Rutube facade
     или self-host <2MB, приоритет facade; default=`rutube`, см. раздел «ВИДЕО-СЛОЙ» выше).
     Источник: Coverr/Mixkit (сток, лицензия OK) в `/public/demo/` с пометкой ДЕМО (`17` §4). Заменяется на
     реальное видео заказчика в финале (`17` §7).
   - **Perf-бюджеты:** LCP **<1.2s** (poster мгновенно, видео `preload="none"`+lazy после paint, НЕ блокирует
     paint, `16`#30/pxlpeak); **INP <200ms** (видео не в основном потоке, CTA — `MagneticButton` без тяжёлых
     layout-thrash; декод видео off-main-thread); **CLS <0.1** (poster занимает 100% hero-heights через
     `aspect-ratio`, текст НЕ сдвигается при загрузке шрифтов — `font-display:swap`+preload woff2 `01` §3).
   - **a11y:** `<video>` — **декоративный фон, только `aria-hidden="true"`** (НЕ несёт смысла; `role="img"`+`aria-label` НЕ ставим — они взаимоисключающи с `aria-hidden` и label всё равно не прочитается). H1 — видим скринридеру.
     **Контраст CTA над движущимся видео (вариант В, `28_HEROCRITIC` #3):** AA **4.5:1** замеряется
     ПОВЕРХ ВИДЕО (не только poster) — фиксированный scrim-градиент (ivory→transparent, opacity 0.35–0.5,
     `01` §2) фиксированной яркости поверх всего hero, чтобы текст/CTA оставались читаемыми при движении кадра.
     CTA primary — `aria-label` (см. выше) + `focus-visible` 2px gold (`01` §7).
     **[Волна 3, закрывает V8 (Виктор, Hero-видео)] Для слабого зрения — «покой» ПО УМОЛЧАНИЮ, не только по системной настройке.**
    Наряду с существующим `prefers-reduced-motion` (видео НЕ autoplay, только poster) добавляется явный
    **«успокаивающий» режим Hero**: статичный `poster` (LCP `<img>`) + крупный заголовок H1 без мельтешения
    видео-фона. Этот покой — вариант ПО УМОЛЧАНИЮ для слабого зрения (Виктор: «мелко и мельтешит»), активируется
    либо системным `prefers-reduced-motion`, либо переключателем `TextSizeToggle`/«Облегчённый режим» (V1),
    либо явной опцией «Спокойный режим» в шапке. Блок 27 (`HomeVideoShowcase`) НЕ трогаем — его autoplay-по-IO
    сохраняется (там видео ниже фолда и не мешает чтению Hero). Цель V8: на первом экране нет движения,
    которое мешает сосредоточиться слабому зрению.
    **focus-order:** Overline(пропускаем, decorative) → H1 → Sub → CTA primary → CTA secondary → Microcopy →
     Scroll-hint. `SkipLink` (`components/common/SkipLink`) переводит к `#main`. `prefers-reduced-motion`:
     видео НЕ autoplay (показываем только poster), clip-path wipe → мгновенный `opacity:1` (текст виден сразу),
     scroll-hint пульсация выключена (`01` §4, Framer `useReducedMotion`). **e2e-проверка (`28_HEROCRITIC` #9):**
     при `prefers-reduced-motion: reduce` сетевой запрос видео НЕ уходит (только poster), assert в тесте.
   - **Responsive (вариант В, `28_HEROCRITIC` #7):** living-photo = **full-bleed bg** (poster + subtle-loop на всю
     hero-высоту, НЕ в рамке) — это hero-фон, а не карточка. Circular frame справа — **отдельный опц. акцент**,
     НЕ замена full-bleed фону. desktop (≥1024px) — left-aligned текст, max-width 620px, circular frame справа
     (опц., поверх full-bleed фона, не мешает LCP); tablet (768–1023) — текст центр, CTA stack; mobile (<768) —
     центр, H1 `clamp(2.5rem,5vw,4.5rem)`, CTA в колонку, circular frame скрыт (экономия LCP — остаётся full-bleed
     poster). Шрифты читаемы (≥16px body), touch-targets ≥44px.

 1-ter. `HeroExtras` — **[P0-8, Итерация 2] нижний блок под Hero (НИЖЕ фолда), куда ВЫНЕСЕНЫ ценовые якоря и календарь брони** (раньше висели выше фолда в Hero). Рендерится сразу после `HeroSection`, ДО `InspireStrip`. Состав (всё из ранее описанных волн, перенесено сюда, НЕ выше фолда):
 - **Ценовые якоря (блок М1, Волна 7 / M1+M4+M5+M6):** микро-строка «☕ Кофе-брейк — от 390 ₽/гость (Эконом, минимум) 🟡 *(статус: `pending` — ведущий якорь = реальная цена с сайта NiloV 390 ₽; канон 950 — вторичное уточнение, НЕ ведущий якорь)* · 🥪 Фуршет Эконом — от 2 450 ₽/гость (Эконом, минимум) · 🍽 Банкет — от 4 470 ₽/гость (Стандарт)» + минимальный чек + прозрачность КАД.
 - **Календарь брони (блок O1, Волна 7 / O1+O2+O5+O7):** CTA «📅 Проверить мою дату» → `AvailabilityCalendar mode='book'` (мини-календарь, минимальный срок 3 дня, живой счётчик свободности) — НЕ выше фолда.
 - **Helper-CTA (G7, Волна 5–6):** «Я не знаю, что нужно — помогите →» `/plan/helper` (wizard-помощник).
 - **Экспресс-пресеты 1-тап (Волны 1/3/7):** «Рассчитать свадьбу на 80 гостей →», «Собрать кофе-брейк на 15 →», «💸 Мне нужно максимально дёшево →», «Банкет на 500 гостей →» — все deep-link в `/plan`, НЕ выше фолда.
 - **Микро-подпись живого события (K7, Волна 3).** Hero сам остаётся с ровно 1 primary + 1 secondary ghost (канон C9, P0-8).

 1-bis. `InspireStrip` — **[Волна 3, закрывает K1 (Камила, блогер)]** короткий визуальный блок «Вдохновись»
   ВЫШЕ фолда (сразу после Hero, ДО `TrustBar` и `FormatShowcase`) — 3–4 живых кадра/клипа реальных
   событий с подписью «реальное событие · площадка · N гостей», ведёт в `/gallery`. Блогер/клиент
   НЕ скроллит 6 коммерческих блоков ради красоты — вдохновение на кончике языка с первого экрана.

   **Детальная спец:**
   - **Пропсы:** `<InspireStrip shots={[{src,eventType,venue,guests,caption,href}]} ctaHref="/gallery" />`.
   - **Состав:** 3–4 плитки (desktop 4 в ряд, tablet 2, mobile 1–2 swipe/стек) с капшеном под каждой:
     «Свадьба · площадка «А» 🟡 · 120 гостей (пример ДЕМО-данных, не клиент)» / «Девичник · лофт · 18 гостей» / «День рождения · 25 гостей» /
     «Корпоративный завтрак · 15 гостей». Капшен = реальная подпись (тип + площадка + число), НЕ декорация.
     *Примеры площадок («Эрмитаж» и др.) — ДЕМО-дАННЫЕ слота (тянутся из CMS, НЕ голый факт-клиент); не публиковать как подтверждённого клиента без 🟡-сверки (см. FACTCHECK).*
   - **Медиа-ассеты:** переиспользует кадры `GalleryTeaser`/`HomeVideoShowcase` (единый источник `17`);
     первые 2–3 — `eager`+blur-up (LCP ниже fold, Hero-poster остаётся LCP), остальные `loading="lazy"`.
     Опц. 1 клип video (click-to-play, единый `VideoProvider`-контракт) среди плиток.
   - **Overline + CTA:** над плитками — `overline` «Вдохновись реальными событиями»; справа/под —
     кнопка-ссылка «Смотреть всю галерею →» `/gallery`.
   - **a11y:** каждая плитка — `<a aria-label="...">` + `<img alt="{eventType}, {venue}, {guests} гостей">`;
     капшен виден всегда (НЕ только hover). `prefers-reduced-motion` → без Ken Burns/parallax.
   - **Responsive:** desktop 4 кол. / tablet 2 / mobile 2 (scroll-snap) без горизонт. скролла страницы.
   - **Perf:** LCP главной = Hero-poster (блок 1); эта секция НИЖЕ hero но ВЫШЕ fold-коммерции, не конкурирует
     за LCP; CLS<0.1 (`aspect-ratio` плиток); INP<200ms.

2. `TrustBar` — marquee логотипов клиентов (набор анонимных силуэтов-плейсхолдеров «нам доверяют» 🟡, статус `pending` — конкретные бренды НЕ называются до подтверждённых договоров, см. FACTCHECK_REPORT_2026-07-20).
   **[benchmark: Proof of the Pudding — circular/geometric frames]** логотипы в круглых/ромбовидных
   фреймах, не просто строка.
   **GROUNDING-ПОДПИСЬ (закрывает TrustSeg B3 — приземляющий якорь прямо в TrustBar, не только в TrustProof):** под marquee — строка мелким earth-цветом:
   *«От семейного ужина до банкета на 500 гостей — один стандарт качества. Логотипы партнёров — примеры из архива; финальный список подтверждается договорами заказчика. Конкретные бренды публикуются только после подписанных договоров (пока — «на проверке»).»*
   Это снимает «это не про меня» у ср. сегмента (Камила/Артём) и честно маркирует 🟡-статус клиентов.
   **Детальная спец (закрывает `19`#2 + `16`#11):**
   - **Пропсы:** `<TrustBar clients={[{name,logoSrc,href}]} speed={30} pauseOnHover />`.
   - **Копирайт/данные:** 6–8 анонимных плейсхолдеров «нам доверяют» с подписью имени ПОД каждым фреймом:
     `Корпоратив «А» 🟡` · `Свадьба «Б» 🟡` · `Лофт-площадка 🟡` · `Бизнес-центр 🟡` · `Загородный клуб 🟡` *(примеры, `status:'pending'` — НЕ подтверждено независимо через web_search: 0 веб-упоминаний клиентских связей NiloV↔эти бренды; НЕ выводить как факт без подтверждения договоров у заказчика; финал — по списку заказчика; показывать ТОЛЬКО с дисклеймером «на проверке» per FACT-GATE, см. 04:86. **Роспотребнадзор исключён** — это госрегулятор, не клиент (см. FACTCHECK_REPORT_2026-07-20).)*
     Каждая лого — НЕ абстрактный значок, а имя (`16`#11: «client logos close the credibility gap»).
   - **Фреймы:** circular (`--radius-circle`) / diamond (rotate 45° внешний, лого внутри — НЕ повёрнута) —
    `01` §5 geometric frames. Тонкая золотая обводка 1px `border-gold-text` #8A6D3B (4.537:1 на ivory ≥3:1 по WCAG 1.4.11; НЕ чистый `--color-gold` #B08D57 = 2.893:1 FAIL), Elevation-1. НЕ прямоугольная строка.
   - **[Волна 3, закрывает K3 (Камила, «пафосно»)] «Приземляющий» ряд/капшен:** над/под marquee логотипов
    добавляется строка-якорь, снимающая сигнал «только для олигархов»: **«от семейного ужина на 10 до банкета
    на 500 — один стандарт качества»** + 1–2 кейса «обычных» красивых событий (видимые плитки/капшены, напр.
    «Девичник, 18 гостей, лофт» и «День рождения, 25 гостей, загородный дом» — как в `InspireStrip`/K5).
    «обычные красивые события — наш типичный клиент» (видимые плитки/капшены, напр.
    «Девичник, 18 гостей, лофт» и «День рождения, 25 гостей, загородный дом» — как в `InspireStrip`/K5).
    НЕ называем статусных клиентов (статусные бренды, по запросу 🟡) как доказательство потолка качества — это
    НЕ подтверждено вебом; до подписанных договоров держим анонимные плейсхолдеры «нам доверяют» с дисклеймером «на проверке».
    «приземляющим» рядом — среднесегментный блогер видит: «это про меня, не только про VIP». Копирайт в Sub Hero
    уже несёт ту же мысль (см. блок 1, K7/«под ключ для любого бюджета»).
   - **Медиа-ассеты (`17` §6):** `public/demo/logos/{client-a,client-b,client-c,wedding-d,...}.svg` —
     вектор/чистый PNG, monochrome (gold/ink), единый стиль. Источник: офиц. лого клиентов (демо-плейсхолдеры в `/public/demo/`).
   - **Perf:** marquee через CSS `transform: translateX` + `requestAnimationFrame`/`Framer`, НЕ JS-перелayout.
     **INP <200ms** (анимация composited-only). Логотипы `<img>` с явным `width/height` → **CLS <0.1**.
   - **a11y:** контейнер `role="marquee"` НЕТ (нестандарт) → используем `<ul aria-label="Наши клиенты">` + каждый
     `<li><a aria-label="Клиент: нам доверяют 🟡">{logo+name}</a></li>`. **hover-pause + pause-on-focus** (на `:hover`/`:focus-within`
     анимация `animation-play-state:paused`). Live-обновление (если будет) — `aria-live="off"` (декоративный,
     не критичный контент) ИЛИ `aria-live="polite"` при добавлении нового клиента. Логотипы `alt="{name}"`.
   - **Куда ведут:** каждый лого = `<a href>` на страницу кейса/события этого клиента (напр. `/events/svadba#hermitage`)
     ИЛИ внешний сайт клиента (`target="_blank" rel="noopener noreferrer"`). Если без страницы — `href` на `/reviews`.
     НЕ мёртвые ссылки.
   - **Responsive:** desktop — 1 ряд marquee, скорость 30s/цикл; tablet — 2 ряда при необходимости; mobile — marquee
     замедлен (40s) ИЛИ статичная сетка 2–3 колонки (по желанию, без горизонтального скролла). Логотипы не меньше 64px.

3. `AwardsStrip` → **ОБЪЕДИНЁН в `TrustProof`** (см. блок 57) — отдельный proof-ряд убран (C12: снижаем плотность, ДНК «воздух»).
   Факты более 19 лет 🟡 / 3 500+ 🟡 / отраслевые премии 🟡 / клиенты 🟡 / РФ-комплаенс теперь живут в ЕДИНОМ блоке `TrustProof` (facts-вариант).
   (Детальная спец AwardsStrip удалена — её данные перенесены в `TrustProof` `variant:'facts'`, блок 57.)

4. `EventTypeSelector` — **6 карточек** (Корпоратив / Свадьба / Выпускной / Детский праздник / Частное / Chef-at-home)
   → ведут на `/events/*`. **[Волна 2, закрывает B-TAT-4] Корпоратив — ПЕРВИЧНЫЙ путь:** первая карточка,
 primary-акцент (золотая рамка `border-gold-text` #8A6D3B + badge «Для бизнеса»), ведёт на `/events/korporativ` — HR/бизнес-аудитория
 видит свой сценарий первым. **[Волна 2, закрывает B-MAX-1] Выпускной — первый-class путь:** явная карточка
 со своим роутом `/events/vypusknoy`, НЕ спрятан под «Частное». **[Волна 1, закрывает B-OLGA-1]** Детский праздник — первый-class путь,
 НЕ спрятан под «Частное».
 > **[Волна 4, закрывает E4 (Елена, B-E4) — алиас «Юбилей компании»]** Карточка «Корпоратив» и страница `/events/korporativ` несут **видимый ярлык/алиас**: под заголовком — **«Корпоратив · Юбилей компании · тимбилдинг»**, а на самой `/events/korporativ` — блок-подсказка «Организуете **юбилей компании**? Это сценарий Корпоратива →» (связь языка галереи «Юбилей» и структуры «Корпоратив»). Секретарь Елена узнаёт свой кейс «юбилей фирмы 120 чел» без догадок.
 > **[Волна 8, закрывает ZH4 + ZH5 (Жанна, сезонный НГ)] НГ-специфичный блок на `/events/korporativ`.** Хаб корпоратива сейчас сезонно-слеп. Добавляется постоянный (evergreen, достижим круглый год — не зависит от активного сезона) блок **«Новогодний корпоратив»**: праздничное НГ-меню (превью блюд с `season:['newyear']`, бейдж «Скоро в сезоне» вне сезона, ZH6), явная НГ-цена/наценка (ZH7), CTA **«Новогодний корпоратив → `/plan/calculator?event=korporativ&tier=premium`»**. **(ZH5) Urgency по дате брони НЕЗАВИСИМО от текущего месяца:** если выбранная в потоке расчёта дата ∈ [20.12–15.01], показывать «🔥 Бронируйте до {seasonalConfig.deadline} — новогодние даты уходят» даже если сейчас июль (сейчас urgency только в декабре — исправлено). В `AvailabilityCalendar` даты НГ-окна несут бейдж **«НГ · даты уходят»**.

   **[Волна 3, закрывает D1 (Дарья, деловой завтрак)] Алиас «Деловой завтрак / Кофе-брейк»:** на карточке «Частное»
   НЕТ отдельного сценария завтрака, поэтому добавляем видимый алиас-ярлык на формате кофе-брейк в `FormatShowcase`
   И В Hero-price-строку (см. блок 1, D1) — фраза «Деловой завтрак = кофе-брейк» прописывается в подписи карточки
   `FormatShowcase` (Кофе-брейк): «Перерывы на кофе и десерт · **идеально для делового завтрака**». Так Дарья
   находит свой сценарий без догадок. Доп. точка входа — экспресс-пресет «Собрать кофе-брейк на 15» на Hero (блок 1, D2)
   и на `/plan` хабе.

   **[Волна 3, закрывает V3 (Виктор, семейный ужин)] Подпись «Семейный ужин» на карточке `EventTypeSelector`:**
   карточка «Частное» получает уточняющую подпись под заголовком: **«Частное · Семейный ужин · юбилей · дома»** —
   чтобы пенсионер сразу понял маппинг «семейный ужин → Частное» без догадок. Альтернатива (отдельный пресет
   «Семейный ужин») НЕ вводится, чтобы не размывать 6 карточек; подпись закрывает баг V3 точечно.

   **[Волна 3, закрывает V4 (Виктор, простой путь)] Кнопка-эскейп «Позвоните — мы всё оформим»:** под сеткой
   карточек (ИЛИ в каждой карточке как вторичная CTA) для ВСЕХ типов событий рендерится крупная кнопка-эскейп
   **«Не хотите собирать сами? 📞 Позвоните — мы всё оформим»** → прямой звонок (`tel:`) / заявка без 6-шагового
   мастера (ведёт в `/contact` с предзаполненным `eventType`, либо сразу в WA/ТГ). По образцу ветки chef-at-home
   «Свяжитесь с менеджером» (блок 8, B-MUX-6): низкотехничный пользователь получает понятный путь «мы всё сделаем»
   рядом с самообслуживанием, не теряя навигацию. Кнопка крупная (≥44px), золотая/вторичная — `bg-primary` #B08D57 заливка + `text-primary-foreground` ink #1C1815 = 5.7:1 ✅ AA (outline-вариант — `border-gold-text` #8A6D3B), видима на desktop И mobile.
   **Детальная спец (закрывает `19`#4 + `16`#12):**
   - **Пропсы:** `<EventTypeSelector cards={[{type,title,photoSrc,priceFrom,guestsFrom,href,quickBook?,primary?}]} />`.
   - **Копирайт/данные (точно, порядок = приоритет):** Корпоратив (первичный) / Свадьба / Выпускной / Детский праздник / Частное / Chef-at-home.
     Мини-цифра на hover (видимый текст, НЕ только hover для скринридера — см. a11y ниже):
     - **Корпоратив → `от 2 450 ₽ / гость`** (Фуршет Эконом — честная база из `PRICE_PER_GUEST.furshet.economy` в `07`,
       НЕ «от X» без тарифа). **[Волна 2, закрывает B-TAT-5]** первичный badge «Для бизнеса · Рассчитать 200 гостей →» ведёт
       прямо в `/plan/calculator?event=korporativ&guests=200&format=furshet&tier=economy` (предзаполнение, без хопа через `/plan`).
     - **Выпускной → `от 2 450 ₽ / гость`** (Фуршет Эконом — самый дешёвый полноценный формат для 50 чел; см. `07` §ECONOMY).
       **[Волна 2, закрывает B-MAX-1]** явная карточка «Выпускной» → `/events/vypusknoy`, НЕ под «Частное».
     - **Свадьба → `от 4 470 ₽ / гость`** (банкет, «Для свадеб» — честная база из `PRICE_PER_GUEST.banket.economy`
       в `07`, НЕ фуршет-премиум 4 350). **[Волна 1, закрывает B-ANN-2]** пометка: «Банкет на свадьбу — от 4 470 ₽/гость (Стандарт ≈5 470)».
     - **Детский праздник → `от 1 950 ₽ / гость`** 🟡 *pending-verification* (детский прайс; см. `07` §CHILD_RATE, B-OLGA-5).
     - Частное → `от 2 950 ₽ / гость` · **подпись «Семейный ужин · юбилей · дома · Крупный банкет · Гала на 500+»** (V3 + A6, см. ниже) · Chef-at-home → `от 4 500 ₽ / гость` 🟡 *(pending-verification — почасовая ветка: цена НЕ из PRICE_PER_GUEST, а из `hourlyRate` по `07` §Edge cases; 4 500 — ориентир, требует сверки с прайсом заказчика)*
       (примеры-ориентиры; цены НЕ совпадают с прайсом на живом сайте NiloV — Фуршет+Кофе-брейк от 390 ₽, Корпоратив от 2 450 ₽,
       Банкет/Свадьба от 4 470 ₽; сверить с актуальным прайсом заказчика перед продом) + `от 20 гостей` (для фуршета;
       мин. по формату тянется из единого `MIN_GUESTS` в `07`: банкет 15 / кофе-брейк 10 / chef-at-home 10 — см. B4/КР-4).
       **[Волна 7, A6 (Артём, 500-люкс)] Алиас «Крупный банкет · Гала на 500+» на карточке Частное:** чтобы 500-гостевой
       банкет верхнего тарифа имел свой «дом» — добавляем под заголовком видимый алиас-ярлык **«Крупный банкет · Гала на 500+»**
       (рядом с «Семейный ужин»). Либо — отдельная карточка «Гала-банкет 500+» как 7-й вход `EventTypeSelector` (по решению
       заказчика); пока — алиас на Частном + deep-link «Банкет на 500 (верхний тариф)» (A5). Сноба НЕТ, но масштаб заявлен.
   - **БИНДИНГ (фиксируем):** каждая карточка → свой роут:
    **Корпоратив→`/events/korporativ`** (первичный, `primary:true`) · Свадьба→`/events/svadba` · **Выпускной→`/events/vypusknoy`** ·
    **Детский праздник→`/events/detskoe`** · Частное→`/events/chastnoe` · Chef-at-home→`/events/chef-at-home`.
    НЕ общая страница (`16`#12: «конкретный путь, не одна кнопка BUY»).
  - **МАППИНГ «Тип события → Сервис-формат → staffing» (биндинг к `SERVICE_DELIVERY_SPEC` §1, ОБЯЗАТЕЛЬНО для блока банкета/свадьбы):** разработчик карточки/страницы выводит норму персонала из спецы, НЕ догадывается:
    | Карточка `EventTypeSelector` | Сервис-формат (§1) | Норма персонала |
    |---|---|---|
    | Корпоратив → `/events/korporativ` | Фуршет / Кофе-брейк | 1 : 15–20 (кофе-брейк 1:20) |
    | Свадьба → `/events/svadba` | Банкет | 1 : 12–15 |
    | Выпускной → `/events/vypusknoy` | Фуршет | 1 : 15–20 |
    | Детский праздник → `/events/detskoe` | Детское | 1 : 10–12 |
    | Частное → `/events/chastnoe` | Банкет / Chef-at-home | 1 : 12–15 (Chef-at-home 1:8–10) |
    | Chef-at-home → `/events/chef-at-home` | Chef-at-home (персональный) | 1 : 8–10 |
    На КАЖДОМ событии — **on-site координатор** (§4, ОБЯЗАТЕЛЬНО, flat-позиция, независимо от `staffCount`). Норма тянется в `calcTotal` (строка «Сервис-норма») и в `ResultDisplay`/`SummaryCard`.
   - **[Волна 1, закрывает B-ANN-1]** карточка Свадьбы несёт `quickBook:true` → под CTA карточки добавляется
     микро-кнопка **«Проверить дату и забронировать»** (→ AvailabilityCalendar `mode='book'`, предзаполненный `eventType='svadba'`).
   - **Медиа-ассеты (`17` §2,#2):** `public/demo/events/{corporate,wedding,vypusknoy,child,detskoe,private,chef-at-home}.webp`
     (тип кадра «Event Atmosphere»/«Buffet Spread» (свадьба≠корпоратив≠выпускной≠детский, `16`#19). 6 фото + опц. 5с loop на hover.
   - **a11y:** карточка = `<a aria-label="Корпоратив — от 2 450 ₽ за гостя (Фуршет Эконом), подробнее">` /
     `<a aria-label="Свадьба — от 4 470 ₽ за гостя (банкет), подробнее">` /
     `<a aria-label="Выпускной — от 2 450 ₽ за гостя (Фуршет Эконом), подробнее">` /
     `<a aria-label="Детский праздник — от 1 950 ₽ за гостя, подробнее">`; фото `alt="{type} — пример подачи"`;
     мини-цифра цены — видимый текст (НЕ только на hover для скринридера; на hover добавляется visual-акцент,
     но значение доступно всегда через `aria-label`). Первичная карточка Корпоратива несёт `aria-current="primary"`-подобный
     бейдж (визуально золотая рамка `border-gold-text` #8A6D3B + «Для бизнеса»). `focus-visible` — `--color-ring` #8A6D3B.
   - **Motion:** hover → Ken Burns scale 1→1.08 (6s) + появление мини-цифры (`16`#12) + `translateY(-6px)`.
     `prefers-reduced-motion` → без zoom/translate, цена статично видна.
   - **Responsive:** сетка **6→3→2→1**: desktop `repeat(6,1fr)`; tablet (768–1199) `repeat(3,1fr)`;
     small-tablet `repeat(2,1fr)`; mobile (<768) 1–2 колонки (карточки во всю ширину, фото крупнее). Touch: tap открывает `/events/*`.

5. `FormatShowcase` — превью фуршет/банкет/кофе-брейк (photo-alive cards + цена/гость).
   **Детальная спец (закрывает `19`#5 + `16`#2):**
   - **Пропсы:** `<FormatShowcase formats={[{title,sub,priceFrom,badge,photoSrc,href}]} />`.
   - **photo-alive ЗАФИКСИРОВАН (см. `06` §motion + `01` §4 — ЕДИНЫЙ контракт для ВСЕХ карточек):** база = **Ken Burns** (CSS/Framer scale 1→1.08, 6s) на hover + лёгкий parallax (`ParallaxImage`); loop-видео НЕ используется как дефолт.
 **Опц. enhancement (явный exception, НЕ норма):** короткое **видео ПО КЛИКУ** для кураторской подборки «хитов» (≈20–30 блюд) — инициирует пользователь (DishCard). ФорматShowcase карточки используют ТОТ ЖЕ механизм (Ken Burns + опц. click-video), без разнобоя.
   - **Копирайт/данные (цены — 🟡 `pending-verification`, НЕ «реальные из прайса»):** Фуршет `от 2 450 ₽/гость` (бейдж «Хит корпоративов»),
     Банкет `от 4 470 ₽/гость` (бейдж «Для свадеб»), Кофе-брейк `от 390 ₽/гость` 🟡 *(ведущий якорь = реальная цена с сайта NiloV 390 ₽; канон 950 — вторичное уточнение, pending-verification)* (бейдж «Офисы и конфы»). ⚠️ Цифры расходятся с живым сайтом NiloV (Фуршет+Кофе-брейк от 390 ₽, Корпоратив от 2 450 ₽, Банкет/Свадьба от 4 470 ₽) — сверить с актуальным прайсом заказчика перед продом (BUG-F2).
     **[Волна 7, закрывает M7 (Марина, бюджетный)] БЕЙДЖ «МИНИМАЛЬНАЯ ЦЕНА / САМЫЙ БЮДЖЕТНЫЙ:** у дешёвых карточек —
       Кофе-брейк (950) и Фуршет Эконом (2 450) — НЕ маркетинговый бейдж «Хит корпоративов», а явный ценовой якорь
       **«💰 Самый бюджетный вход»** / **«Минимальная цена»**, чтобы клиент, сканирующий по цене, сразу видел дно.
     **[Волна 7, закрывает M3 (Марина)] ЕДИНАЯ ТАБЛИЦА СРАВНЕНИЯ «ФОРМАТ × ТАРИФ × ЦЕНА/ГОСТЬ»:** над/под карточками `FormatShowcase`
       (и на `/menu`, и на `/plan` хабе) — компактная таблица одним взглядом, отсортированная по цене:
       | Формат | Тариф | Цена/гость | Мин. гостей | Мин. заказ |
       |---|---|---|---|---|
       | Кофе-брейк | Эконом | от 390 ₽ 🟡 *(ведущий якорь = реальная цена с сайта NiloV 390 ₽; канон 950 — вторичное уточнение, pending-verification)* | 10 | от 9 500 ₽ |
       | Фуршет | Эконом | от 2 450 ₽ | 20 | от 49 000 ₽ |
       | Банкет | Стандарт | от 4 470 ₽ | 15 | от 67 050 ₽ |
       | Банкет | Максимальный | от 6 970 ₽ | 15 | от 104 550 ₽ |
       Таблица берёт данные из единого `PRICE_PER_GUEST` (`07`) + `MIN_GUESTS` — НЕ размазана по карточкам и шагам.
     **[Волна 7, закрывает M9 (Марина)] КОФЕ-БРЕЙК КАК «ДЕШЁВЫЙ ВХОД» ДЛЯ 10–19:** когда клиент с <20 гостями упирается
       в `MIN_GUESTS` (фуршет недоступен) — вместо warning-тона показываем ПОЗИТИВ: «**Меньше 20 человек? Кофе-брейк Эконом
       от 390 ₽ 🟡 (канон 950 — вторичное уточнение, требует сверки) — самое дешёвое решение**» (ссылка на кофе-брейк). Тон поддерживающий, не запрещающий.
     Подзаголовки: «Лёгкие закуски на стоячем приёме» / «Посадка, официанты, классика» / «Перерывы на кофе и десерт · **идеально для делового завтрака**» (D1, алиас «Деловой завтрак = кофе-брейк»).
     > **[Волна 4, закрывает E5/E6 (Елена, B-E5/B-E6)]** (а) **Рекомендация ДО инструмента:** на `FormatShowcase` и `/events/korporativ` над карточками форматов — подсказка plain-языком: **«Для 120 гостей рекомендуем Банкет: посадка, официанты, классика — юбилей/корпоратив 120 человек идеально садится за стол»** (B-MUX-5 «50+ → Банкет» вынесен ИЗ конструктора наружу, до входа). (б) **Бейдж банкета контекстный:** карточка Банкета несёт бейдж **«Для посадки 50+ · юбилей / корпоратив»** (НЕ только «Для свадеб») — секретарь Елена узнаёт свой случай. Опц. второй бейдж «Для свадеб» сохраняется как вариант, НО первичный для 120 чел = «посадка 50+».
   - **Куда ведёт CTA:** `Смотреть меню →` → **`/menu/{format}`** (фуршет→`/menu/furshet`, банкет→`/menu/banquet`,
     кофе-брейк→`/menu/coffee-break`), НЕ конструктор (конструктор — отдельный CTA в CTASection). Зависимость закрыта.
   - **Медиа-ассеты (`17` §2,#2 + §6):** `public/demo/formats/{furshet,banquet,coffee-break}.webp`
     (тип «Buffet/Station Spread»), каждое photo-alive.
   - **Perf:** **LCP не затрагивает** (ниже fold); фото `loading="lazy"`+blur-up; **CLS <0.1** (`aspect-ratio` 16:10);
     Ken Burns — composited transform (INP<200ms).
   - **a11y:** карточка `<a aria-label="Формат: Фуршет, от 2 450 ₽ за гостя, смотреть меню">`; фото `alt="{format} — пример подачи"`;
     цена — видимый JetBrains Mono текст (НЕ картинка). `focus-visible` gold. `prefers-reduced-motion` → без zoom/tilt.
   - **[Волна 5–6, закрывает G2 (Григорий, B-GRIG-2)] «?»-глоссарий у каждого формата:** рядом с заголовком карточки — иконка-«?» (`aria-label="Что такое {format}?"`), по клику/фокусу раскрывает понятное описание БЕЗ жаргона:
     «**Фуршет** — гости едят стоя, лёгкие закуски, можно свободно ходить» · «**Банкет** — посадка за стол, официанты, классическое меню» · «**Кофе-брейк** — кофе + десерт в перерыве (идеально для делового завтрака)». Термин-жаргон («фуршет») идёт **вторичной подсказкой** под понятным описанием. Тот же «?» дублируется в шаге 1 `FormatSelector` конструктора (`08`) и на `/plan/helper` (G1).
     > **Отдельная страница-глоссарий `FormatHelp` (БЛОК 15.7, из футера):** `/help/formats` — полный человекочитаемый гид по форматам (Фуршет / Банкет / Кофе-брейк / Мобильный фуршет / Chef-at-home / Детское) с примерами «когда выбрать». Футер (колонка «Помощь») несёт ссылку «Какой формат выбрать → /help/formats». Закрывает «нет глоссария» для новичка.
   - **Responsive:** сетка **3→1**: desktop `repeat(3,1fr)`; tablet `repeat(2,1fr)`; mobile 1 колонка.
     3D-tilt ±4° ТОЛЬКО desktop; mobile — tap→lightbox без tilt (`10`).

6. `MenuPreview` — пара «подборок меню» с Ken Burns hover → CTA «Смотреть меню».
   **Детальная спец (закрывает `19`#6 + `16`#13):**
   - **Пропсы:** `<MenuPreview collections={[{title,blurb,photoSrc,href}]} />`.
   - **Копирайт/данные (КОНКРЕТНЫЕ названия подборок, не весь прайс):**
     - «Фуршет на 50» — 1 строка сути: «50 канапе, 3 горячих станции, безалкогольный бар-меню.» (пример).
     - «Банкет под ключ» — «Посадка на 80, 5 перемен блюд, официанты, торт включён.» (пример).
     - (опц.) «Кофе-брейк для офиса» — «20 видов выпечки, 3 сорта кофе, раз в неделю.»
     Каждое — ровно 1 строка сути (не таблица цен, `16`#13).
     - **[Волна 5–6, закрывает L3 (Лиза, B-LIZA-3)]** Добавить коллекцию **«Веган-линия»** (или общий вход «Диетические меню») рядом с форматными подборками:
       «🌱 Веган-линия — будда-боул с тофу, стейк из цветной капусты, шоколадный мусс (авокадо): 9+ блюд без мяса и молока». CTA «Смотреть веган-меню →» → **`/menu/vegan`** (пред-отфильтрованный `MenuCatalog` по `dietBadges:['vegan']`). Закрывает разрыв «Лиза не видит веган с порога» — теперь диет-линия заявлена на главной, симметрично `/menu/detskoe`.
   - **Куда ведёт CTA:** `Смотреть меню →` → **`/menu/{format}`** (фуршет→`/menu/furshet`, банкет→`/menu/banquet`,
     кофе-брейк→`/menu/coffee-break`), НЕ в `/menu/{collection}` — такого роута НЕТ (закрывает баг B из `17_IA_CRITIC`).
     Зависимость с FormatShowcase: обе CTA ведут в `/menu/{format}`, подборка = тот же формат-роут.
   - **Медиа-ассеты (`17` §2,#1 + §6):** `public/demo/menu/{furshet-50,banquet-complete,coffee-office}.webp`
     (тип «Hero Plating»/«Buffet Spread»), **photo-alive = Ken Burns hover + parallax** (единый контракт из блока 5).
   - **Perf:** `loading="lazy"`+blur-up; **CLS <0.1** (`aspect-ratio` 4:3); Ken Burns composited (INP<200ms).
   - **a11y:** карточка `<a aria-label="Подборка меню: Фуршет на 50, смотреть меню">`; фото `alt="{title} — пример блюд"`;
     блюр — видимый текст. `focus-visible` gold. `prefers-reduced-motion` → статично.
   - **Responsive:** сетка **2→1**: desktop `repeat(2,1fr)`; mobile 1 колонка (фото крупнее, текст под фото).

7. `GalleryTeaser` — masonry 6-8 фото по событиям → CTA «Галерея».

> **ВНИМАНИЕ СЧЁТЧИКУ — см. итоговую таблицу нумерации в конце раздела «Секции главной».**
> Блок `HomeVideoShowcase` (`6-bis`) вставлен между `MenuPreview` (6) и `GalleryTeaser` (7) **НИЖЕ фолда**;
> `EventsRecapHome` (`7-bis`) — после `GalleryTeaser`. Сквозная нумерация карточек:
> 1 Hero → 2 TrustBar → 3 AwardsStrip(→TrustProof) → 4 EventTypeSelector → 5 FormatShowcase
> → 6 MenuPreview → **6-bis HomeVideoShowcase** → 7 GalleryTeaser → 7-bis EventsRecapHome → 8 WhyUs → …

6-bis. `HomeVideoShowcase` — **[Волна 4В, `27_HOMEPAGE_AUTOVIDEO_TASK`]** полноширинная секция
«Живые моменты наших событий» НИЖЕ первого экрана с 1–3 клипами мероприятий, которые
**автозапускаются при скролле в зону видимости** (НЕ hero-autoplay — LCP-безопасно, см. `27`).
Единый источник клипов = БЛОК 27 `EventsRecap` (через `VideoProvider`, default=`rutube`), единая таксономия `eventType`
с `GalleryTeaser`/`TestimonialsCarousel`/`EventsRecap`.

**Детальная спец (закрывает `27`#1, `27`#2, `27`#3, `27`#4):**
- **Пропсы:** `<HomeVideoShowcase clips={[{video: VideoRef, posterSrc, eventType, title, durationSec}]} heading? variant: 'single'|'grid' />`.
  Клипы — выборка из `EventsRecap.clips` (БЛОК 27), таксономия по `eventType`: свадьба/корп/частное/
  chef-at-home. `variant:'single'` — один крупный клип (по умолч., LCP-лёгкий); `variant:'grid'` — 1–3 клипа.
- **Копирайт/данные:** Overline «Наши события»; H2 «Живые моменты наших событий» (заголовок ДОСТУПЕН
  скринридеру, НЕ `aria-hidden`); caption каждого клипа = тип события + площадка (как `GalleryTeaser`):
  «Свадьба · площадка «А» 🟡 · 120 гостей (пример ДЕМО-данных, не клиент)». Данные тянутся из CMS (поле `clips`), НЕ хардкод.
  - **[Волна 3, закрывает K6 (Камила)] Подпись на САМОМ плеере:** каждый клип/карточка несёт видимый
    капшен прямо на плеере (overlay поверх poster/видео, НЕ только под блоком): «реальное событие · площадка»,
    напр. «Корпоративный завтрак · лофт на Большой Морской». Чтобы было понятно — это НЕ постановочный ролик,
    а живое событие NiloV. Капшен = `aria-label` кнопки play + видимый `<p>` под кадром (дублируется в DOM для SEO).
- **Поведение автозапуска (IntersectionObserver, `threshold: 0.5`):**
  - `video.play()` когда ≥50% секции в вьюпорте; `video.pause()` когда секция вышла из зоны (экономия
    CPU/батареи, не шумит). Реализация — JS по IO, **атрибут `autoplay` НЕ ставим**.
  - Атрибуты видео: `muted playsinline loop`. `preload="none"` до входа в зону; реальный iframe/поток
    подгружается по IO (через `requestIdleCallback` после первого paint → LCP<1.2s не страдает).
  - `poster` (LQIP ≤10КБ → fade к full WebP) показывается ДО входа в зону: LCP-элемент главной = Hero-poster
    (блок 1), НЕ эта секция.
- **Источник видео:** фасад `VideoProvider`-эмбед (Rutube по умолч., как БЛОК 27, НЕ self-host MP4 — защита LCP). Лёгкий self-host
  <2МБ — только если facade-задержка >LCP (приоритет facade). Полный recap открывается в той же модалке,
  что у `EventsRecap` (БЛОК 27, focus-trap + Esc). Клипы тянутся из CMS-поля `VideoRef` (см. «ВИДЕО-СЛОЙ»).
- **a11y / reduced-motion:**
  - `prefers-reduced-motion` → НЕ автозапуск: показываем `poster` + кнопку play (ручной старт), видео
    НЕ проигрывается без явного действия пользователя (единый контракт с `EventsRecap`/`DishCard`).
  - Фоновое видео — `aria-hidden` (декоративное, НЕ контент); H-заголовок секции ДОСТУПЕН скринридеру.
  - **Кнопка play/pause** для пользователя (дублирует IO, не только авто): `<button aria-label="Воспроизвести видео: {title}">`
    переключает play/pause; состояние синхронизировано с IO (кнопка = всегда доступный manual-контроль).
  - Секция — `<section aria-label="Живые моменты наших событий">`; клипы-кнопки — `aria-label="Рекап: {title}, {durationSec} секунд"`.
- **Perf (LCP<1.2s, CLS<0.1, INP<200ms):**
  - LCP главной = Hero-poster (блок 1); эта секция НИЖЕ fold, не конкурирует.
  - Видео `preload="none"` до зоны; загрузка по IO (`requestIdleCallback` после paint); off-thread decode.
  - `aspect-ratio` фикс (16:9) на обёртке → **CLS≈0** (нет сдвига при появлении плеера).
- **Медиа-ассеты (`17` §8, единый светлый цветокор):** постеры клипов
  `public/demo/showcase/{wedding-hermitage-120,corp-mariinsky-300,...}.webp` (LQIP ≤10КБ → full ≤120КБ);
  видео — на `VideoProvider` (Rutube-плейлист / self-host) заказчика (эмбед-facade, НЕ в репо). Демо: Coverr/Mixkit event-recap с пометкой ДЕМО (`17` §4),
  финал — архив заказчика (`17` §7).
- **Связь с архивом:** клипы = выборка из `EventsRecap` (БЛОК 27, единый `RecalClip[]`, тот же `video: VideoRef`).
  Единая таксономия `eventType` с `GalleryTeaser`/`TestimonialsCarousel`/`GalleryMasonry`/`EventsRecap`.
- **Responsive:** desktop — 1 крупный клип во всю ширину (16:9) ИЛИ grid 3 кол.; tablet — 2 кол.;
  mobile — 1 колонка (клип на всю ширину, кнопка play/pause ≥44px). Горизонтального скролла нет.

   **Детальная спец (закрывает `19`#7 + `16`#4, источник `11_GALLERY_TEASER_STORYBOARD.md`):**
   - **Пропсы:** `<GalleryTeaser photos={[{src,eventType,guests,alt}]} ctaHref="/gallery" />`.
   - **Parallax ЗАФИКСИРОВАН ТОЛЬКО на 1 hero-strip (InspireStrip / Hero bg) через Framer `useScroll`+`useTransform`** (НЕ per-image, НЕ per-row — это ломает CLS/LCP, см. `11:11`/`01:86`). GalleryTeaser/MenuPreview = ТОЛЬКО hover ken-burns + lazy, БЕЗ parallax-сдвига по рядам.
     Амплитуда hero-strip ±30px, разные `data-speed` по рядам (`01` §4).
   - **[Волна 3, закрывает K4 (Камила, фильтр по эстетике)] Фильтр «по настроению/эстетике»:** кроме существующего
    фильтра по типу события, добавляются чипы-теги **«яркое / камерное / ретро / минимализм / для сторис»** —
    блогер фильтрует галерею по визуальному настроению, а не только по типу (свадьба/корпоратив). Теги тянутся
    из CMS-поля `mood` каждого фото (`GalleryMasonry`/`GalleryTeaser` используют единую таксономию). Фильтр =
    `radiogroup`/`tabs` с `aria-pressed`, SSR-фильтрация через URL `?mood=...` (как в `MenuCatalog`/`ReviewList`).
    **[Волна 3, закрывает K5 (Камила, камерные кейсы)]** В `GalleryTeaser` И на `/gallery` (`GalleryMasonry`) среди
    6–8 фото обязательно присутствуют **≥1–2 камерных кейса с подписью** — «Девичник · лофт · 18 гостей»,
    «День рождения · 25 гостей · загородный дом», чтобы блогер увидел «это про меня» (не только 120/300-гостевые).
    Камерные кейсы помечаются тегом `mood:'камерное'` + `eventType` для двойной фильтрации.
     Капшены с типом события (НЕ декорация): «Свадьба · 120 гостей» / «Корпоратив · 300 гостей» / «Гала-ужин» /
     «Юбилей» / «Выезд шефа» / «Банкет под ключ». Счёт **6–8** фото.
   - **Медиа-ассеты (`17` §2,#3 + §6):** `public/demo/gallery/{wedding-120,corp-300,gala-dinner,jubilee,chef-away,banquet,...}.webp`
     — сгруппированы ПО СОБЫТИЮ (тип «Event Atmosphere»), + опц. 2 видео **ПО КЛИКУ** (как DishCard, ТОТ ЖЕ контракт «живого фото»). Фото реальных площадок (Эрмитаж/Мариинский 🟡 — пример-площадки, не подтверждённые клиенты).
   - **Perf:** **LCP<1.2s** — первые 2 фото eager+blur-up, остальные `loading="lazy"`; parallax НЕ бьёт LCP (Framer, не WebGL);
     **CLS <0.1** (masonry через CSS `columns` с фикс. шириной колонок). INP<200ms (parallax = composited transform).
   - **a11y:** каждое фото `<img alt="{eventType}, {guests} гостей — пример подачи">` (капшен = alt, НЕ дублируем).
     Декоративный parallax `aria-hidden` (не несёт смысла). `prefers-reduced-motion` → parallax ВЫКЛЮЧЕН
     (фото статичны, капшены видны всегда, не только hover). Gallery-секция — `aria-label="Галерея наших событий"`.
   - **Responsive:** masonry **desktop 3 cols / tablet 2 cols / mobile 2 cols без parallax** (perf, `11`).
     Горизонтального скролла нет; высоты варьируются (masonry). CTA «Смотреть всю галерею →» → `/gallery`.

7-bis. `EventsRecapHome` — **[Волна 3А, `17` §8 п.1]** короткая лента video-хайлайтов мероприятий заказчика
   (reel-style 15–45с) СРАЗУ ПОСЛЕ `GalleryTeaser`. Это home-вариант нового блока `EventsRecap` (детальная
   спец — БЛОК 27). Показывает 4–6 клипов «по типу события», CTA «Смотреть все рекапы →» → `/events/recap`.
   Единая таксономия с `GalleryTeaser` (фото) и `TestimonialsCarousel` (видео-отзывы). Полные recap 2–3 мин —
   в модалке/на `/events/recap`, НЕ в потоке главной (LCP). См. БЛОК 27 (`variant:'home-strip'`).

8. `WhyUs` — более 19 лет 🟡 / 3 500+ событий 🟡 / су-вид 🟡 / фермеры ЛО 🟡 (цифры count-up, все НЕ-подтверждённые — с 🟡, не рендерить как факт).
   **Детальная спец (закрывает `19`#8 + `16`#14):**
   - **Пропсы:** `<WhyUs stats={[{value,label,suffix}]} founder={...} />`.
   - **СТОРИЯ бренда (дописываем, `16`#14):** «В 2007 году Дмитрий Нилов начал с банкета на 30 гостей в Петербурге.
     Сегодня — более 19 лет 🟡, 3 500+ событий 🟡, собственная су-вид лаборатория 🟡 и фермеры Ленинградской области 🟡 в основе меню.
     **Мы не ресторан: мы привозим ресторан туда, где вы его не ждёте.** Большой опыт именно в обычных событиях — офисы, юбилеи, свадьбы.» (копирайт — 2–3 предложения, не «мы лучшие»). 🟡 *более 19 лет — подтвердить актуальное число у заказчика (на живом сайте NiloV — «более 19 лет (с 2007)»); су-вид помечен `pending-verification`.*
   - **Цифры count-up (spring, `AnimatedCounter`/`CountUp`, `01` §4):** `19` 🟡 (лет, с 2007) · `3 500+` 🟡 (событий) ·
    `100%` (су-вид контроль, ⚠️ помечен `pending-verification`) · `40+` 🟡 (фермеров ЛО) — при scroll-in (`whileInView`, `viewport.once`).
   - **Как скринридер читает:** число = видимый текст, НЕ canvas. `aria-label` на счётчике = финальное значение
     (напр. «более 19 лет 🟡»), `aria-live="polite"` ОТКЛЮЧЁН во время анимации (иначе зачитает все промежуточные).
   - **Медиа-ассеты (`17` §2,#4 + §6):** `public/demo/founder/dmitry-nilov.webp` (живое фото основателя, НЕ сток),
     + фото су-вид станции / фермеров ЛО (тип «Service in Action»/«Hero Plating»).
   - **BEHIND-SCENES 60с (Волна 3А, `17` §8 п.4):** опц. вставка **behind-scenes ролика 60с** (сборка площадки /
     синхронная сервировка 200 блюд / шеф нарезает) из архива заказчика — соц-доказательство «мы всё делаем идеально»
     (brandtotable: «планировщик видит 60с видео команды → бронирует»). Проп `behindScenes?: VideoRef` (`provider:'rutube'|'selfhost'`, default=`rutube`).
     Facade-эмбед (poster+play-btn, `VideoProvider` по клику, БЛОК 27 `EventsRecap`), НЕ self-host (LCP). `prefers-reduced-motion`
     → poster + play-btn, воспроизведение по клику. a11y: `<button aria-label="Видео за кулисами: команда собирает площадку">`.
   - **Perf:** count-up — `requestAnimationFrame`, НЕ блокирует INP (<200ms); фото `loading="lazy"`.
   - **[Волна 10, закрывает B-G1/B-G2/B-G3 (Гоша, сомневающийся — КРИТИЧНО)] Узел дифференциации «NiloV vs конкуренты».** Раздел `/why-us` рассказывает про нас самих, НО **НЕ содержит contrast с рынком** — Гоша не находит ответа «почему вы, а не Интерфуд». → Добавить в `WhyUs` секцию **«Чем мы отличаемся»** (3–4 честных пункта contrast с КОНКРЕТНЫМИ примерами, без принижения конкурентов): (а) **цена** — единая подтверждённая цена/гость без скрытых доплат (см. B-G8); (б) **прозрачность** — договор+чек, маркировка 14 аллергенов, зоны доставки открыто; (в) **собственная кухня** — су-вид лаборатория + фермеры ЛО (НЕ просто «привезём готовое»); (г) **доставка** — КАД включён, предсказуемые надбавки вне КАД (таблица зон). Далее — **честная таблица сравнения** «NiloV / типичный кейтеринг / что получаете лишнего» (на `/why-us` ИЛИ `/help/formats`): форматы × цена/гость × условия, без ложных превосходств (иначе не credible). + **Правило «без воды»:** декларации без подтверждённого факта (`су-вид`, `более 19 лет`, элит-клиенты) НЕ публикуются как утверждение — либо подтверждаем и даём доказательство (фото су-вид лаборатории, договор с фермером ЛО), либо убираем из Hero/WhyUs до верификации (см. B-G3/B-G6).
   - **a11y:** reduced-motion → **fallback: число показывается ФИНАЛЬНЫМ сразу** (без анимации), скринридер читает
     «более 19 лет 🟡» и т.д. Фото `alt="Дмитрий Нилов, основатель NiloV Catering"`. Стори — семантичный `<p>`/`<blockquote>`.
   - **Responsive:** блок **4→2→1**: desktop — 4 статы в ряд + фото основателя слева/справа; tablet — 2×2;
     mobile — 1 колонка (статы по 2 в ряд, фото сверху, стория под ними).

9. `TestimonialsCarousel` — реальные кейсы с именем + типом события.
   > **Сервис-блок (связь с `SERVICE_DELIVERY_SPEC`):** отзывы/видео-кейсы = социальное доказательство выполненного сервиса день-X (а НЕ операционный процесс). Сбор кейсов триггерится шагом 5 `ProcessSteps` (+24 ч пост-звонок координатора, §2/§4) — блок несёт `status:'verified'`-отзывы как подтверждение «контракта качества сайта».
   **Детальная спец (закрывает `19`#9 + `16`#15):**
   - **Пропсы:** `<TestimonialsCarousel items={[{name,eventType,date,guests,menu,quote,photoSrc,href?}]} />`.
   - **VIDEO-VARIANT «Wall of Love» (Волна 3А, `17` §8 п.3):** доп. режим `variant:'video-wall'` — короткие
     **видео-слова гостей/организаторов** (10–30с, muted, из архива заказчика) ПОВЕРХ фона `Event Atmosphere`.
     Видео-отзыв вызывает больше доверия, чем текст (wiserreview/VocalVideo). Расширенная модель item:
     `videoTestimonial?: VideoRef` (тип из `VideoProvider`, default=`rutube`). Механизм = facade (poster+play-btn, эмбед
     Rutube/self-host по клику), НЕ self-host MP4 (LCP, БЛОК 27). `prefers-reduced-motion` → poster + play-btn, воспроизведение
     только по клику. a11y: `<button aria-label="Видео-отзыв: Анна, свадьба, 20 секунд">`, при открытии — та же
     focus-trap-модалка, что у `EventsRecap` (БЛОК 27). Единая таксономия `eventType` и источник (`VideoProvider`)
     с `EventsRecap`/`GalleryTeaser`.
     > **[Волна 4, закрывает R7 (Роман, B-R7) — cross-link видео → внешний отзыв]** Каждый `videoTestimonial` несёт перекрёстную ссылку на внешний/внутренний отзыв того же клиента: поля `source` и `clientName` связывают видео с текстовым отзывом (RT-3 / `ReviewCard`). В модалке видео-отзыва — кнопка «Читать письменный отзыв {clientName} на {площадка}» (ссылка на `yandexProfileUrl`/`twoGisProfileUrl`/`googleProfileUrl`/`/reviews`). Для скептика Романа это доказывает: то же лицо, что оставило верифицированный отзыв снаружи, а не просто видео на Rutube.
   - **2–3 РЕАЛЬНЫХ КЕЙСА (пишем, не «★★★★★ супер»):**
     > ⚠️ **Волна 5А / RT-9 (`30_REVIEWS_CRITIC`):** приведённые ниже 3 кейса — **ДЕМО-ПЛЕЙСХОЛДЕРЫ** (вымышлены
     > для иллюстрации формата), помечены `status: 'pending-verification'`. **НЕ публиковать как реальные отзывы**
     > до замены на верифицированные из CMS-коллекции `Review` (исполнитель Б). Хардкод имён/компаний (Анна и Павел,
     > ООО «Северсталь-Логистика», Ирина) запрещён в проде — риск фейк-отзывов (КоАП 14.7 + репутация).
     1. *Анна и Павел* — Свадьба, июнь 2026, 120 гостей, меню «Праздничное»: «Шеф был на площадке весь вечер,
        гости до сих пор спрашивают рецепт утиной грудки. Организация — будто мы ничего не делали сами.» (фото площадки). `pending-verification`
     2. *ООО «Северсталь-Логистика»* — Корпоратив, март 2026, 300 гостей, меню «Банкет»: «Фуршет-линия на 300
        человек собрана за 40 минут. Дегустация за 2 недели до события сняла все вопросы.» (фото буфета). `pending-verification`
     3. *Ирина* — Частный ужин (Chef-at-home), май 2026, 12 гостей, меню «Расширенное»: «Дмитрий сам приехал с
        командой, оставил холодильник с завтраком. Как в ресторане, но дома.» (фото стола). `pending-verification`
   - **Источник данных (Волна 5А):** карусель рендерится из **CMS-коллекции `Review`** (модель `Review` выше, поле `approved: true`),
     НЕ из хардкода в компоненте. Демо-кейсы выше — только для визуальной сборки/статичного сторибука; в проде
     `TestimonialsCarousel` тянет `reviews` только с `approved === true`. До появления реальных approved-отзывов
     блок либо скрыт, либо показывает 1–2 верифицированных (с письменным согласием).
   - **Навигация (в спеце, НЕ авто-крутилка, `16`#15):** кнопки `‹` / `›` (prev/next) + точки-индикаторы
     (пауза при фокусе). Авто-смена — ОТКЛЮЧЕНА (или ≤5s с обязательным pause-on-hover/focus).
   - **Медиа-ассеты (`17` §2,#3 + §6):** `public/demo/testimonials/{wedding-120,corp-300,private-12}.webp`
     (тип «Event Atmosphere», фон = реальная площадка события, НЕ абстракт).
   - **a11y (карусель, `19`#9 + `18` §6):** контейнер `role="region" aria-roledescription="carousel" aria-label="Отзывы клиентов"`;
     каждый слайд `role="group" aria-roledescription="slide" aria-label="1 из 3"`; кнопки `aria-label="Предыдущий отзыв"/"Следующий отзыв"`;
     **live region** (`aria-live="polite"`) объявляет смену слайда («Отзыв 2 из 3: Анна и Павел, свадьба»);
     пауза на `:focus-within`/hover. Клавиатура: `←`/`→` переключают слайды (обработчик на region).
     Фото `alt="{name}, {eventType}"`. `prefers-reduced-motion` → без сдвига-слайда (мгновенная смена).
   - **Perf:** фото `loading="lazy"`; смена слайда — composited transform (INP<200ms); **CLS <0.1** (фикс. высота слайда).
   - **Responsive:** desktop — слайд + фото слева/текст справа; mobile — фото сверху, текст снизур, swipe
     (touch) переключает слайды (native scroll-snap ИЛИ swipe-жест).

10. `ProcessSteps` — как работает заказ (5 шагов, иконки).
    **Детальная спец (закрывает `19`#10 + `16`#16):**
    - **Пропсы:** `<ProcessSteps steps={[{n,title,clientGets,iconSrc}]} />`.
    - **Таймлайн ЗАФИКСИРОВАН (`16`#16):** `Заявка` → `Звонок ≤15 мин` → `Дегустация` → `Событие` → `Обратная связь`.
    - **Что ПОЛУЧАЕТ клиент на каждом шаге (не что делает компания):**
      1. Заявка → «Понятная форма за 1 минуту, без 15 полей.»
      2. Звонок ≤15 мин → «Менеджер перезванивает, отвечает на вопросы, предлагает слот.»
      3. Дегустация → «Пробуете меню до события — никаких сюрпризов в день Х.»
      4. Событие → «Команда на площадке, сервировка, уборка — вы отдыхаете.»
      5. Обратная связь → «Опрос + фотоотчёт, учёт пожеланий к следующему разу.»
         **(RT-1, Волна 5В):** этот шаг = ТОЧКА ТРИГГЕРА авто-запроса отзыва. После перевода события
         в статус «проведено» CRM/CMS (`29_CMS_CRITIC` B-CMS-5) шлёт +1–2 дня спустя WhatsApp/email/SMS
         с 1-клик ссылкой на отзыв (внеш. площадка + внутр. форма `/reviews`). Триггер сбора = именно здесь.
         **(+24 ч пост-звонок координатора, `SERVICE_DELIVERY_SPEC` §2/§4 — сервис-блок `04`, ОБЯЗАТЕЛЬНАЯ процедура):** через ~24 ч после события координатор звонит/пишет клиенту «Как прошло? Что улучшить?» (закрытие loops, Caregiver-тон `40_BRAND_VOICE`). Это НЕ отдельный UI-блок сайта, а CRM-процесс (follow-up-задача `followUpAt`), задокументированный как часть контракта качества сервиса; триггерится из шага 5 `ProcessSteps`.
    - **Медиа-ассеты (`17` §2,#4 + §6):** `public/demo/process/{request,call,degustation,event,feedback}.svg`
      (inline SVG иконки, currentColor, единый стиль `01` §5).
    - **Perf:** статичные SVG, **CLS <0.1**, LCP не затрагивает; **INP <200ms** (hover-подсветка composited).
    - **a11y:** `<ol aria-label="Как проходит заказ">`; каждый шаг `<li>` с `aria-label="{n}. {title}: {clientGets}"`;
      иконка `aria-hidden`. Связь шагов — семантика упорядоченного списка (НЕ просто иконки в ряд, `19`#10).
      `prefers-reduced-motion` → без подсветки-анимации линии таймлайна.
    - **Responsive:** **горизонтальный → вертикальный**: desktop — горизонтальный таймлайн (5 шагов в ряд,
      соединительная линия `var(--color-gold-text)` #8A6D3B); tablet (768–1023) — 2–3 в ряд; mobile (<768) — **вертикальный** таймлайн
      (шаги в колонку, линия слева, иконки крупнее). Без горизонтального скролла.
11. `LiveInstagramFeed` — real-time UGC «Жизнь NiloV» (VK — **ПЕРВИЧНЫЙ видимый эмбед в РФ** (Камила K2, волна 3); Instagram — вторичная ссылка, аудитория через VPN; WhatsApp/Telegram — первичные каналы связи, по `29_POSITIONING`).
12. `CTASection` — «Спланировать событие» + телефон + WhatsApp + Telegram. **Тон (T9/29_POSITIONING):** под CTA — фраза-якорь «**под ключ для любого бюджета** — от семейного ужина до банкета на 500 гостей». НЕ премиум-лексемы.
13. `FAQTeaser` — 3-4 частых вопроса (аккордеон) → `/faq`.

> **ИТОГОВАЯ НУМЕРАЦИЯ «Секций главной» (сквозной счётчик карточек — единый источник для `04`#N-ссылок):**
> | № | Блок | Назначение | Волна |
> |---|------|-----------|-------|
> | 1 | `HeroSection` | hero-loop + H1 + CTA | — |
> | **1-bis** | **`InspireStrip`** | **«Вдохновись» — 3–4 живых кадра выше фолда (Волна 3, K1)** | **Волна 3 (K1)** |
> | 2 | `TrustBar` | marquee логотипов клиентов | — |
> | 3 | `AwardsStrip` → `TrustProof` | proof-ряд (объединён) | — |
> | 4 | `EventTypeSelector` | 6 типов события (Корпоратив/Свадьба/Выпускной/Детский/Частное/Chef-at-home) → `/events/*` | — |
> | 5 | `FormatShowcase` | фуршет/банкет/кофе-брейк | — |
> | 6 | `MenuPreview` | подборки меню → `/menu/*` | — |
> | **6-bis** | **`HomeVideoShowcase`** | **scroll-triggered видео мероприятий (НИЖЕ фолда)** | **Волна 4В (`27`)** |
> | 7 | `GalleryTeaser` | masonry-галерея → `/gallery` | — |
> | **7-bis** | **`EventsRecapHome`** | **лента video-рекапов (`EventsRecap` `home-strip`)** | **Волна 3А (`17` §8)** |
> | 8 | `WhyUs` | более 19 лет 🟡 / 3 500+ 🟡 / су-вид 🟡 / фермеры 🟡 | — |
> | 9 | `TestimonialsCarousel` | реальные кейсы + video-wall | — |
> | 10 | `ProcessSteps` | 5 шагов заказа | — |
> | 11 | `LiveVkFeed` | UGC «Жизнь NiloV» (VK @nilov_catering — ПЕРВИЧНЫЙ видимый эмбед в РФ; Instagram @nilov_catering — ВТОРИЧНАЯ ссылка, в РФ заблокирован) | — |
> | 12 | `CTASection` | «Спланировать событие» + тел/WA/ТГ | — |
> | 13 | `FAQTeaser` | аккордеон → `/faq` | — |
>
> `HomeVideoShowcase` и `EventsRecapHome` — «вставные» бис-блоки; на детальные БЛОК-спеки они НЕ претендуют
> (их данные/поведение описаны в `27` / БЛОК 27). Блоки 1–5,7–13 = старая нумерация из предыдущих волн (не сдвигалась).

> **🔗 СВЯЗЬ С ОПЕРАЦИОННОЙ СПЕКОЙ СЕРВИСА (P0-7, `SERVICE_DELIVERY_SPEC.md`):** блоки сервиса/банкета/свадьбы/доставки ОБЯЗАНЫ реализовать мандаты этой спецы (иначе «элитный сервис» только описан, но не простроен). Биндинг блок → раздел спецы:
> | Блок `04` | Обязательство из `SERVICE_DELIVERY_SPEC` |
> |---|---|
> | `EventTypeSelector` / `FormatShowcase` | §1 норма персонала (1:15–20) + §4 on-site координатор → маппинг «тип события → формат → staffing» (см. ниже) |
> | `Calculator` / `Constructor` (`calcTotal`) | §1/§2/§4 — строка сметы «сервис-норма» (персонал 1:15-20 + координатор + сетап 4ч/страйк 3ч) |
> | `DeliveryZonesMap` (БЛОК 21) | §3 холодовая цепь (рефрижераторы, логгеры ≤+6 °C, разделение аллергенов) |
> | `AvailabilityCalendar` | §6 SLA ответа ≤2 ч + подтверждение брони по O3 (поля `slaResponseHours`/`slaBookingConfirm`) |
> | `ProcessSteps` / `TestimonialsCarousel` (БЛОК 9) | §2 +24 ч пост-звонок координатора (follow-up) |
> Чек-лист приёмки (`41_BUILD_CHECKLIST`) дублирует §8 этой спецы как раздел «Service acceptance (SERVICE_DELIVERY_SPEC)».

## Специфичные блоки (другие страницы)

> ## ▶ ВОЛНА 5–6 — Лиза (веган/диет-линии) · Али (халяль) · Григорий (новичок, wizard/глоссарий)
> **Цель:** поднять баллы симуляций Лизы (4.25) / Али (4.25) / Григория (4.75) до ≥9.
> **Источники багов:** `33_UXSIM_LIZA`, `33_UXSIM_ALI`, `33_UXSIM_GRIGORY`; контракты диет-линий — `23_MENU_STRATEGY` §3 / §3.1 (B4), `35_HANDOFF`.
> **Принцип:** диет-линии = пред-отфильтрованный `MenuCatalog` по `dietBadges`, симметрично уже существующему `/menu/detskoe` (Волна 1, B-OLGA-2). НЕ дублируем сделанное волнами 1–4.

### БЛОК 15.5 — MenuLanding  *(хаб `/menu` — форматы + диет-линии)*  ← [Волна 5–6, закрывает L2 / A1 / G6]

**Назначение:** страница `/menu` — единая точка входа в меню. Закрывает несимметричность
с `/menu/detskoe`: форматы И диет-линии получают равноправные видимые входы на ленде.
- **Сетка 1 — Форматы:** `Фуршет` / `Банкет` / `Кофе-брейк` / `Детское` → `/menu/{format}` (синхрон с `FormatShowcase`/`MenuPreview`). Доп. вход: **`Бар / Миксология 🍸` → `/menu/bar`** (бармен-шоу + mixology upsell; блок `BarMixology`, см. `ADDONS` — бар есть в доп. опциях). Закрывает осиротевший роут `/menu/bar` (B7, GapHunter G6): страница достижима из `/menu` и mega-menu «Меню»/«Ещё».
- **Сетка 2 — Диет-линии (НОВОЕ, L2):** горизонтальные чипы/карточки **рядом с форматами**, симметрично детскому:
  `Веган 🌱` → `/menu/vegan` · `Безглютен 🌾` → `/menu/gluten-free` · `Халяль 🕌` → `/menu/halal` · `Детское 🧒` → `/menu/detskoe`.
  Каждый чип — крупная тач-цель (≥44px), `aria-pressed`/ссылка, ведёт на пред-отфильтрованный каталог (L1).
  Под чипами — одна строка: «Есть меню под вашу диету — без перебора всего меню».
- **Диет-опции заявлены НА ВХОДЕ (A1):** над сеткой диет-линий — микро-строка
  «🌱 Веган · 🌾 Безглютен · 🕌 Халяль — по запросу, при наличии сертификации → [смотреть каталог](/menu/catalog?diet=halal)».
- **Пропсы:** `formats: FormatCard[]`, `dietLines: DietLine[]` (`{badge,label,href,count?}`).
- **a11y:** чипы — `<a aria-label="Диет-линия: Веган, смотреть меню">`; контраст AA; `prefers-reduced-motion` без анимации.
- **Responsive:** desktop — 2 ряда по 4; mobile — scroll-snap чипы (как `MenuCatalog`).

### БЛОК 15.6 — DietLinePage  *(пред-отфильтрованный каталог диет-линии)*  ← [Волна 5–6, закрывает L1 / A2-блок / A6]
**Назначение:** роуты `/menu/vegan` · `/menu/gluten-free` · `/menu/halal` (паттерн `/menu/detskoe`).
Каждый = `MenuCatalog` с **SSR-предустановленным фильтром** `dietBadges` (vegan / gluten-free / halal) + честным баннером статуса.
- **Счётные линии (из `23` §3):** веган ≥9 · БГ ≥11 · халяль ≥6 блюд (`23` §3.1 статус). Пустой результат → `Empty-state` «по фильтру ничего нет» + «Показать все».
- **Честный баннер статуса (A6, критично для халяля):** при `diet=halal` и `halalStatus:'on-request'`
  вверху подборки рендерится **предупреждение-баннер**:
  «⚠️ Эти блюда готовятся как **халяль ПО ЗАПРОСУ** — без постоянного сертификата. Подтвердите возможность у менеджера: [написать](/contact).»
  Баннер — НЕ скрыт behind hover; цветом НЕ имитирует «сертифицировано» (контраст AA, иконка-предупреждение).
- **CTA сборки (L5):** при выборе `vegan`-фильтра (в каталоге И на `/menu/vegan`) показывается CTA
  **«Собрать веган-мероприятие →»** → `/plan/constructor?diet=vegan` (пред-фильтр `ConstructorState.diet`, см. `08` G1/G3).
  Связывает просмотр и сборку (убирает разрыв Лизы).
- **Пропсы:** `diet: 'vegan'|'gluten-free'|'halal'`, `dishes: Dish[]` (из `MenuCatalog`), `showHalalBanner: boolean`.
- **a11y / Perf / Responsive:** наследует `MenuCatalog` (БЛОК 16); баннер — `<section role="alert" aria-live="polite">`.

### БЛОК 15.7 — FormatHelp  *(глоссарий форматов, `/help/formats`)*  ← [Волна 5–6, закрывает G2]
**Назначение:** отдельная страница-справочник «Какой формат мне подходит» — понятным языком,
без жаргона в заголовках. Достижима из футера (колонка «Помощь») и по «?» с `FormatShowcase`/`FormatSelector`.
- **Состав:** карточка на каждый формат с human-описанием (жаргон — вторичной подсказкой):
  `Фуршет` — «гости едят стоя, лёгкие закуски, можно свободно ходить» · `Банкет` — «посадка за стол, официанты, классика» ·
  `Кофе-брейк` — «кофе + десерт в перерыве (идеально для делового завтрака)» · `Мобильный фуршет` · `Chef-at-home` · `Детское`.
  У каждого — «когда выбрать» (примеры повода/гостей) + диапазон гостей (`MIN_GUESTS`: фуршет 20 / банкет 15 / кофе-брейк 10).
- **CTA:** «Подобрать под мой случай →» ведёт на `/plan/helper` (G1 wizard); «Рассчитать →» `/plan/calculator`.
- **Breadcrumbs:** `Главная › Помощь › Форматы`. `noindex` НЕ ставить (полезно для новичка/SEO).
- **Пропсы:** `formats: {title,plainDesc,glossaryTerm?,whenPick,guestsFrom}[]`.
- **a11y / Perf / Responsive:** `<article>` с `<h2>`; контраст AA; desktop grid 2–3, mobile 1.

### БЛОК 15.8 — HelpersWizard  *(«подберём за 3 вопроса», `/plan/helper`)*  ← [Волна 5–6, закрывает G1 / G5 / G7]
**Назначение:** единая plain-language точка входа для новичка. Заменяет FAB `Консьерж` (G5)
на реальный помощник БЕЗ требования знания формата до рекомендации. *Внутренняя спека: **AI-слой — в резерве, модель не подключена**; публичное имя — «Помощник»/«Консьерж» (детерминированный wizard, НЕ «AI»).*
- **Публичная оговорка прозрачности (ВИДИМЫЙ микрокопирайт, НЕ только внутренняя пометка):** под кнопкой запуска wizard и на шаге результата — «Подбор по 3 вопросам работает по понятным правилам — **без ИИ**. Это помощник по правилам, не искусственный интеллект.» (закрывает BUG 8 прозрачности; честно сообщает клиенту, что механизм — rule-based).
- **Триггеры (ГДЕ виден):** (а) кнопка «Я не знаю, что нужно — помогите →» на Hero (G7);
  (б) кнопка/виджет на `/plan` хабе («Не знаете, что выбрать? Подберём за 3 вопроса»);
  (в) ссылка из `FormatHelp` (G2) и футера. НЕ прячется в бургер.
- **Поток wizard (на человеческом языке, БЕЗ жаргона на входе):**
  1. **Повод?** — «что за событие?» (свадьба / корпоратив / день рождения / детский / просто покормить гостей) — кнопки-варианты, НЕ поле.
  2. **Сколько гостей?** — ползунок/быстрые кнопки (10 / 20 / 50 / 100 / 200).
  3. **Сидеть или стоять?** — «за столом» / «стоя, свободно ходить» / «не знаю — подберите».
  4. **Бюджет?** — «экономно» / «средне» / «не знаю».
  → **рекомендация формата БЕЗ жаргона:** показываем понятное описание («гости едят стоя, лёгкие закуски»),
  жаргон-термин («Фуршет») — вторичной подсказкой. Связь с `MIN_GUESTS` + size-правилом (`08` B-MUX-5): 10–19→кофе-брейк/частное, 20–49→фуршет, 50+→банкет.
- **Результат:** кнопка «Собрать такое меню →» ведёт в `/plan/constructor` с пред-заполненным `format`+`guestCount`
  (пропуск шага 1, как D8); либо «Рассчитать цену →» `/plan/calculator?format=…&guests=…`.
- **a11y:** wizard — `<form>` с `<fieldset>`/`<legend>` на каждый шаг; `aria-live` на результате; focus-visible; клавиатура.
  `prefers-reduced-motion` → без морфинга шагов.
- **Пропсы:** `onRecommend: (rec)=>void`, `defaultHref='/plan/constructor'`.
- **Responsive:** 1 колонка; кнопки-варианты — grid 2→1; mobile — stack.

- `EventHero` — заголовок страницы события + фоновое фото (light).
  - **[Волна 1, закрывает B-ANN-1] Для `/events/svadba` (и `/events/detskoe`) под hero — блок «Проверить дату
    и забронировать»** с `AvailabilityCalendar mode='book'` (предзаполненный `eventType`) + CTA
    «Забронировать эту дату». Клиент бронирует дату самообслуживанием (имя+тел/WA-deeplink), НЕ звонит лишний раз.
  - **[Волна 1, закрывает B-ANN-4/7] Hero Свадьбы несёт CTA «Рассчитать свадьбу на 80 гостей»** →
    `/plan/calculator?event=svadba&guests=80&format=banket&tier=standard` (предзаполнено, итог сразу live).
  - **[Волна 1, закрывает B-ANN-2] Hero Свадьбы — подзаголовок «Банкет на свадьбу — от 4 470 ₽/гость»** (честная база банкета,
    НЕ фуршет-премиум 4 350). Children-вариант (`/events/detskoe`) — подзаголовок «Детский праздник — от 1 950 ₽/гость».
  - **[Волна 1, закрывает B-OLGA-6] EventHero `/events/detskoe`** — отдельный роут (канон `02_IA`), фото детского праздника,
    теги «угощения для детей / аниматор / детское меню», CTA «Собрать детский праздник» → `/plan/constructor?event=detskoe`.
  - **[Волна 4, закрывает S7 (Света, B-SVETA-7)]** Под `EventHero` `/events/detskoe` — блок **«Аллергии и диета учтены 🛡»**:
    короткое объяснение (14 аллергенов ТР ТС 021/2011, безглютеновые опции, crossContact на кухне) + кнопка-ссылка
    **«Посмотреть детское меню БЕЗ глютена →»** прямо на отфильтрованное `/menu/detskoe?gluten-free=1` (см. S2).
    Смысл: Света видит, что её случай (младенец-аллергик) вообще учтён на посадочной — до скролла.
- `PackageGrid` — тарифы как карточки сравнения. **Публичные лейблы: «Эконом / Стандарт / Расширенный / Максимальный»**
  (T3/29_TRUST_SEG — «Люкс» НЕ заголовок, только внутренний пресет `luxury`). Данные — из CMS (`Package`, B-CMS-7), НЕ хардкод.
  **[Волна 1, закрывает B-ANN-3] ЕДИНАЯ ТАБЛИЦА ТАРИФОВ НА ВСЕХ ФОРМАТАХ:** те же 4 публичных лейбла (Эконом/Стандарт/Расширенный/Максимальный)
  с одинаковыми базами из `07` `PRICE_PER_GUEST` (Фуршет 2 450/3 450/4 350/5 350 · Банкет 4 470/5 470/5 970/6 970 ·
  Кофе-брейк 950/1 450/1 950/2 450). ПУТАНИЦА «Расширенный = то фуршет, то банкет» устранена: лейбл = уровень сервиса,
  база берётся из выбранного формата. На `/menu/banquet` и в калькуляторе — компактная таблица
  «Свадьба 80 гостей → Формат → Тариф → цена/гость → итог». **[Волна 1, закрывает B-ANN-9] Рекомендованный тариф
  (Стандарт/Расширенный для свадьбы 80) несёт золотую рамку (`border-gold-text` #8A6D3B, 4.537:1 на ivory ≥3:1 по 1.4.11; НЕ чистый `--color-gold` #B08D57 = 2.632:1 FAIL) «Популярный · оптимально для свадьбы 80 гостей»** (как в PackageGrid).
- `MenuCatalog` — фильтр по категориям (канапе/салаты/горячее/десерты/напитки), карточка блюда с фото, ценой, тегами, аллергенами.
  **Фильтр по диете (B-MUX-4/П3):** чипы `vegan`/`gluten-free`/`halal` + 14 аллергенов ТР ТС 021/2011 (синхрон с `07` `AllergenFilter`)
  — автоскрытие блюд без бейджа/с аллергеном. Каталог группируется по **станциям** (холодные/горячее/десерты/напитки/шоу-станции)
  для режима «линии» конструктора (B-MUX-3/П1, `08`). **[Волна 1, закрывает B-OLGA-2] Категория «Детское»:** чип-фильтр `child`
  + отдельный `/menu/detskoe` (бутерброды, капкейки, соки, порционные блюда, угощения для детей). Категория видна в каталоге и в `MenuPreview`.
  > **[Волна 4, закрывает S2 (Света, B-SVETA-2)]** На `/menu/detskoe` поверх детского каталога — **явный чип-фильтр «🚫 Без глютена» (и «Без аллергенов»)** прямо на странице (НЕ заставлять уходить в `/menu/catalog` и комбинировать `детское`+`gluten-free`). Один тап = отфильтрованное детское меню БЕЗ глютена. Чип крупный (≥44px, тач-цель для однорукого режима с коляской), `aria-pressed`, SSR-состояние `?child=1&gluten-free=1` (как `MenuCatalog`/`ReviewList`). Быстрый **пресет-кнопка «Детское меню БЕЗ глютена →»** ведёт сразу на `/menu/detskoe?gluten-free=1`.
  **[Волна 1, закрывает B-OLGA-4] Родительский язык:** у детских позиций подпись plain-языком — «угощения для детей», «порционно, удобно детям»,
  «без острых специй». **[CMS]** Данные каталога — из CMS-коллекции `Dish` + `SeasonalConfig` (B-CMS-3,7), НЕ хардкод `catalog.json`.
- `DishCard` — фото + название + цена + аллергены (14) + hover zoom (photo-alive). **[CMS]** Все поля блюда — из CMS-коллекции `Dish` (B-CMS-3), НЕ хардкод `catalog.json`. **[Поля данных]** `dietBadges: ('vegan'|'gluten-free'|'halal')[]` (прокинул исполнитель меню, B-MUX-4/П3 — бейджи ВИДИМЫ на карточке, не только 14 аллергенов), `station` (для «линии», B-MUX-3), `servingsPerGuest` (порций на гостя по умолч., B-MUX-3), **`childFriendly: boolean`** (детское блюдо — бейдж «Детям 🧒», фильтр каталога `child`; см. B-OLGA-2), `parentLabel?: string` (родительский plain-язык, напр. «угощения для детей», см. B-OLGA-4).
  **[benchmark: pxlpeak 2026 «Motion-Driven Menus»]** на hover → **ingredient storytelling**: мини-видео приготовления (5с) + origin («фермеры ЛО») + КБЖУ. Не просто Ken Burns — контекст блюда.
  **[B-MUX-7, loop-видео хитов]** кураторская подборка «хитов» (≈20–30 блюд) несёт **видео ПО КЛИКУ** (<2MB loop, desktop, инициирует пользователь — НЕ autoplay) по единому контракту «живого фото» (`06` §motion). Кен Бёрнс — база, loop-видео — enhancement для хитов. Карточка помечается «видео».
- `ShowCookingGrid` — станции (телятина на камне, лосось, тако, раклет…) с ценой станции. **Сигнатурный жест «Живая линия меню» (B-MUX-2/П6):** parallax-карусель станций (каждая станция = слой `data-speed`, Framer `useScroll`+`useTransform`, ±30px, как `GalleryTeaser`) + **единый контракт «живого фото» (см. `DishCard`/блок 17, RC-2):** база — Ken Burns zoom на hover (scale 1.0→1.08, 6s, CSS, БЕЗ видео), enhancement — **видео ПО КЛИКУ** (инициирует пользователь, НЕ autoplay на hover) на ту же крупную карточку/оверлей станции. НЕ отдельный 4-й механизм «on-hover во весь экран» — приведено к единому «Ken Burns + click-video» (как `DishCard`). См. блок `MenuWowGesture` ниже.
- `MenuWowGesture` — **[Волна 3Б, B-MUX-2/П6, сигнатурный жест]** единый запоминающийся жест «Живая линия меню» для всей оболочки меню/конструктора.
  - **Полный блок `MenuWowGesture` описан отдельно в `08_CONSTRUCTOR_SPEC.md`** (секция «Сигнатурный жест „Живая линия меню“ (B-MUX-2 / П6)»). Здесь — краткая суть для словаря блоков:
    - Fullscreen-оверлей каталога меню с **parallax-каруселью станций** (`data-speed` слои, Framer `useScroll`/`useTransform`, ±30px — тот же механизм, что `GalleryTeaser`) + **единый контракт «живого фото» (RC-2, как `DishCard`/блок 17):** база — Ken Burns zoom на hover (scale 1.0→1.08, 6s, CSS), enhancement — **видео ПО КЛИКУ** (инициирует пользователь, НЕ autoplay на hover); preview-карточка/оверлей станции справа обновляется по единому контракту (паттерн Restaurant GEM / Awwwards SOTD).
    - **Page-transition видео** `/menu` ↔ `/plan`: Framer `AnimatePresence` + blur/clip-path морфинг (наследует clip-path wipe `09`#30).
    - **Hero-меню на главной** (опц.): полноэкранное превью хитов (≈20–30 блюд `DishCard`) как вход в `/menu`.
    - `prefers-reduced-motion` → оверлей статичен, parallax/transition выключены. Ken Burns — база «живого фото», loop-видео хитов ПО КЛИКУ — enhancement (B-MUX-7).
- `GalleryMasonry` — parallax-галерея, фильтр по типу события, lightbox.
- `EventsRecap` — **(Волна 3А)** архив video-рекапов с мероприятий заказчика (лента reel-хайлайтов 15–45с + модалка полного recap 2–3 мин), фильтр по типу события/площадке/дате, страница `/events/recap` + `home-strip`-вариант на главной. Источник — Rutube / self-host (эмбед, Vimeo ЗАПРЕЩЁН бюджетным стеком). **[CMS]** Клипы — из CMS-коллекции `VideoClip` (B-CMS-4), НЕ ручной массив `clips`; заказчик вставляет URL, парсер режет id. Детальная спец — БЛОК 27 (`17` §8 п.1).
- `Calculator` — шаги: формат → гости (ползунок) → пакет → опции → итог (count-up) → PDF-КП.
- `Constructor` — мастер 6 шагов (тип/гости/база/замены/аллергены/контакты). Детально: `08_CONSTRUCTOR_SPEC.md`. Ниже — закрытые баги критика (границы гостей + формула цены + **live-итог на каждом шаге (B-MUX-1/П5)** + **подсказка формата по размеру (B-MUX-5/П2)** + **build-your-own порционно на гостя (B-MUX-3/П1)** + **диет-бейджи/per-dish exclude (B-MUX-4/П3)** + **сигнатурный жест (B-MUX-2/П6)** + **upgrade-подсказки (B-MUX-8/П4)** + **Chef-at-home НЕ тупик (B-MUX-6)**).
  > **[Волна 4, закрывает S6 (Света, B-SVETA-6)]** Детский пресет конструктора (`format='detskoe'`, фильтрует на `childFriendly`) расширяется **опц. шагом/чекбоксом «У ребёнка аллергия: ___»** (глютен / молоко / орехи / … из 14). При выборе — авто-фильтр детского меню по `gluten-free`/`allergens` + **авто per-dish exclude** выбранного аллергена (как в шаге 3, B-MUX-4), чтобы Свете НЕ ковырять исключения вручную. Чекбокс крупный (≥44px, тач одной рукой). Синхрон с `08_CONSTRUCTOR_SPEC` §«Детский пресет + аллергия».

  **Пропсы `ConstructorApp`:** `initialStep?`, `initialFormat?`, `variant: 'page'|'embedded'`, `onComplete: (lead)=>void`. Внутри: `StepProgress` (+ `LiveSummaryBar` — running-итог `liveSummary` через `calcTotal`, B-MUX-1), `FormatSelector`, `GuestsSlider` (live-итог + подсветка формата по размеру, B-MUX-5), `TierSelector`, `CustomMenuBuilder` (линия по станциям + per-guest steppers «покрыто N/M» + per-dish исключение аллергена + loop-видео хитов, B-MUX-3/4/7), `AddOnsSelector` (upgrade-подсказки из единого `ADDONS`, B-MUX-8), `SummaryCard`, `ContactForm`, `MenuWowGesture` (сигнатурный жест, B-MUX-2/П6).

  **Границы гостей (КАНОН — устраняет противоречие 08: slider 10–500 / state 10–2000 / edge >2000):**
  - ЕДИНЫЙ диапазон ввода = **10–500** и в `GuestsSlider`, и в `ConstructorState.guestCount` (тип `10–500 | null`). Значение 2000 удалено как легаси.
  - `guests > 500` → шаг 2 НЕ принимает значение; вместо этого показывается ветка **«Оставить заявку»** (CTA → `/api/contact`, короткая анкета: формат/дата/гостей) — **единая терминология с `07`/`08` (B8)**. Воронка не рвётся (баг устранён).
  - `guests < 10` → warning «Мин. 10 чел». `date < 3 дней` → «Минимальный срок 3 дня». Декабрь/свадьба → info «Даты заполняются быстро».
  - ⚠️ Синхронизация: `08_CONSTRUCTOR_SPEC` §State `guestCount: 10–2000` и edge `>2000` СЧИТАТЬ устаревшими — истина здесь: **10–500 + ветка >500**.

  **Формула custom-цены (явная, не «магическая»):** 
  - `pricePerGuest` (канон = `NILOV_UNIFIED_MENU.md`, ₽/гость; **ЕДИНАЯ 4-ступенчатая модель тарифов для ВСЕХ форматов — внутренний `tier: 'economy'|'standard'|'premium'|'luxury'`; ПУБЛИЧНЫЕ лейблы карточек: «Эконом / Стандарт / Расширенный / Максимальный» (T3/29_TRUST_SEG — «Люкс» НЕ заголовок, только внутренний верхний пресет `luxury`, не якорит воронку на «элитность»); старые лейблы «Классик/VIP/Лёгкий» выведены из обращения, см. C3/C13):
    - Фуршет — economy 2 450 · standard 3 450 · premium 4 350 · luxury 5 350.
    - Банкет — economy 4 470 · standard 5 470 · premium 5 970 · luxury 6 970.
    - Кофе-брейк — economy 390 🟡 · standard 1 450 · premium 1 950 · luxury 2 450. *(economy 390 ₽ — ведущий якорь с живого сайта NiloV; канон 950 — вторичное уточнение, pending-verification)*
  - **Единая матфункция:** калькулятор (`07`) И конструктор (`08`) ОБЯЗАНЫ вызывать одну и ту же `calcTotal(guests, format, tier, addons, opts)` (тело — в `07`, секция «Единая матфункция `calcTotal`»). Две разные формулы цены запрещены. ⚠️ *Цены по тарифам — 🟡 `pending-verification`: расходятся с живым сайтом NiloV (Фуршет+Кофе-брейк от 390 ₽, Корпоратив от 2 450 ₽, Банкет/Свадьба от 4 470 ₽); сверить с актуальным прайсом заказчика перед продом.*
  - Preset: `total = calcTotal(guests, format, tier, [], {discounts:true})`.
  - Custom: `total = calcTotal(guests, format, 'custom', [], {items, discounts:true})`, где `base = Σ(item.pricePerGuest * qty * guests)` — **`qty` обязательный множитель порций на гостя (совпадает с `08`, см. B7/КР-5)** — при соблюдении **минимума позиций по формату**: фуршет ≥8 (4 холодн.+2 горяч.+2 десерт), банкет ≥6 (закуска+суп+2 горячих+гарнир+десерт), кофе-брейк ≥5 (выпечка+напитки+сэндвичи+фрукты+кофе-станция), mobile-furshet ≥6.
  - **Строка сметы «Сервис-норма» (ОБЯЗАТЕЛЬНА, биндинг к `SERVICE_DELIVERY_SPEC` §1/§2/§4 — НЕ скрытая, НЕ «бесплатно-по-умолчанию»):** `calcTotal` добавляет line-item `service = staffCost + coordinatorCost + setupCost`, где:
    - **Персонал** — норма `1 : 15–20` гостей на 1 сотрудника (по формату из §1; `staffCount = ceil(guests / ratio)`); банкет 1:12–15, chef-at-home/частное 1:8–10 (§1).
    - **On-site координатор** — ОБЯЗАТЕЛЬНО на КАЖДОМ событии (§4), считается отдельной flat-позицией `coordinator` (1 FTE), независимо от `staffCount`.
    - **Сетап / страйк** — `setupCost`: сетап 4 ч + страйк 3 ч (§2), в базу цены (см. B7/B11 спецы — «сервис уже в базе» НЕ противоречит явному line-item: здесь он виден клиенту как честная расшифровка, не «наценка за вывеску»).
    - Реализация: `opts.serviceBreakdown` возвращает `{ staffCount, ratio, coordinator:true, setupHours:7 }` для отображения в `ResultDisplay`/`SummaryCard` (прозрачность «за что платим»).
  - Доставка в КАД включена (0 ₽); вне КАД — надбавка по зоне (см. `TrustProof`).
  - Dirty-check: `savings = (pricePerGuest['luxury'] - pricePerGuest[tier]) * guests` (М7 — бейдж «Вы экономите X» считается **от ВЕРХНЕГО тарифа `luxury` (публично «Максимальный»)**, НЕ от `premium`; верхний отображается клиенту как «Максимальный», якорь воронки — на честную экономию, без скрытого «Люкса»; для фуршета база luxury 5 350, для банкета 6 970). Цифра считается от единой `calcTotal` → совпадает в обоих инструментах.
  - **Мин. гостей по формату** — ЕДИНЫЙ источник `MIN_GUESTS` в `07`: фуршет 20 / банкет 15 / кофе-брейк 10 / mobile-furshet 10. Hover-цифра `EventTypeSelector` и валидация калькулятора/конструктора тянут оттуда же (см. B4/КР-4).

  **Ассеты (CMS, B-CMS-2/3):** меню/цены/ADDONS — из CMS (`Dish` + `PricingConfig`), НЕ хардкод `catalog.json`/`lib/pricing.ts`. `calcTotal` читает цены из CMS с фолбэком на константу. SSG/ISR revalidate 3600. Фото блюд — `ImageWithBlur` (blur-up).

  **Производительность (LCP/INP/CLS):** First render SSR <200ms (цель Lighthouse CI, не декларация); расчёт цены — чистая синхронная ф-ция <50ms, БЕЗ API-call; INP<200ms; CLS<0.1 (фикс. высоты шагов). `prefers-reduced-motion` отключает layout-морфинг.

  **a11y:** `StepProgress` = `<ol>` с `aria-current="step"`; каждое поле со своим `<label>`; ошибки через `aria-describedby` + `role="alert"`; drag-drop в custom-режиме дублируется stepper `+ / −` и `Add`-кнопкой (тач/a11y fallback); focus-visible, keyboard-nav (WCAG 2.2 AA).

  **Responsive:** desktop — 2 колонки (каталог + sticky `SummaryCard` справа); tablet/mobile — 1 колонка, `SummaryCard` склеивается в нижнюю sticky-панель (паттерн `StickyMobileCTA`); drag-drop заменяется на stepper.
- `ReviewCard` / `ReviewList` — отзыв + кейс. Структура кейса и фильтр зафиксированы ниже (баг 22 закрыт).
- `DeliveryZonesMap` — **(Волна 2А)** зоны доставки + карта. КАД включён (0 ₽), надбавки вне КАД (таблица зон/районов ЛО). Блок `CertBlock` и `TrustProof` ссылаются на «КАД включена». Детальная спец — БЛОК 21.
- `CertBlock` — **(Волна 2А)** сертификаты и безопасность (152-ФЗ, ТР ТС 021/2011, Декларация соответствия, Роспотребнадзор, аккредитация кухни). Закрывает битую футер-ссылку `/certificates` (баг C). Детальная спец — БЛОК 22.
- `NewsletterSignup` — **(Волна 2А)** подписка (email + чекбокс 152-ФЗ) → `POST /api/newsletter`. Ранее `/api/newsletter` был мёртвой ссылкой; теперь задействован. Детальная спец — БЛОК 23.
- `RatingBadge` — **(Волна 2А)** внешний реальный рейтинг Google (звезда+число+ссылка на Google Business). НЕ фейковый `AggregateRating` — только реальная ссылка на профиль. **[CMS]** Рейтинг/отзывы — из CMS `Review` (поле `approved`, галочка публикации, B-CMS-5), НЕ массив в коде; `priceValidUntil` в JSON-LD — только для роли с правами (B-CMS-9). Детальная спец — БЛОК 24.
- `ThankYouScreen` — **(Волна 2А)** страница благодарности после submit формы/калькулятора/конструктора (`/thank-you`). Детальная спец — БЛОК 25.
- `NotFoundPage` — **(Волна 2А)** кастомная `/404` (not-found) + глобальный `notFound()`. Детальная спец — БЛОК 26.

  **Модель данных:**
  ```ts
  interface Review {
    id: string;
    clientName: string;
    clientPhoto?: string;      // фото клиента (опц.)
    venue?: string;            // площадка
    venuePhoto?: string;       // фото площадки
    eventType: 'wedding'|'corporate'|'private'|'chef-at-home';
    date: string;              // ISO
    guests: number;
    tier: 'economy'|'standard'|'premium'|'luxury';
    quote: string;             // РОВНО 1 ёмкое предложение
    rating?: number;           // только если реально измерено
    approved: boolean;         // модерация перед публикацией (RT-2, B-CMS-5)
    source?: 'site'|'yandex'|'2gis'|'google'; // откуда пришёл (RT-3)
    reply?: { author: string; text: string; date: string }; // ответ компании (RT-7)
    demo?: boolean;            // RT-9: сфабрикованный кейс, НЕ публиковать до верификации
  }
  ```

  **Структура карточки (`ReviewCard` пропсы):** `review: Review`, `variant: 'grid'|'featured'`.
  Состав: фото (клиент ИЛИ площадка) → имя → тип события (бейдж) → дата → меню (tier) → 1 предложение `<blockquote>`. Никаких «★★★★★ супер».
  > **[Волна 4, закрывает R1 (Роман, B-R1) — provenance на карточке]** `ReviewCard` ОБЯЗАН рендерить поле `source` (`'site'|'yandex'|'2gis'|'google'`), которое ранее игнорировалось: под именем/датой — **бейдж-источник** (иконка Яндекс / 2ГИС / Google / «Сайт NiloV» + понятный текст «Отзыв с Яндекс.Карт») + **кликабельная ссылка «Проверить отзыв →»** на внешний профиль клиента (`yandexProfileUrl`/`twoGisProfileUrl`/`googleProfileUrl` из `БЛОК 24`, `target=_blank rel=noopener`). Скептик Роман видит: самописный отзыв или независимая площадка, и может проверить за 1 тап. Для `source:'site'` бейдж = «Отзыв на сайте NiloV» (без внеш. ссылки, честно). `aria-label` на ссылке понятный («Проверить отзыв {clientName} на Яндекс.Картах»).
  > **[Волна 4, закрывает R6 (Роман, B-R6) — «Ответ NiloV»]** Если у `Review` заполнено поле `reply` (RT-7, ответ компании) — под цитатой рендерится блок **«💬 Ответ NiloV Catering»**: `reply.text` + (`reply.author`, `reply.date`). Блок выделен визуально (отступ/рамка/золотой акцент — `border-l-2 border-gold-text` #8A6D3B, 4.537:1 на ivory ≥3:1 по 1.4.11; НЕ `--color-gold` #B08D57 = 2.893:1 FAIL) — это сильный сигнал реальности для скептика. Если `reply` пуст — блок НЕ рендерится (не пустышка).

  **`ReviewList` пропсы:** `reviews: Review[]`, `eventTypeFilter?: EventType`, `layout: 'grid'|'carousel'`.
  **Фильтр по типу на `/reviews`:** чипы `[Все][Свадьба][Корпоратив][Частное][Chef-at-home]` → меняет URL `?type=...` (SSR-фильтрация, не JS-хак). a11y: фильтр = `radiogroup`/`tabs` с `aria-pressed`.
  > **[Волна 4, закрывает R2 (Роман, B-R2) — чип «С видео»]** К фильтр-чипам добавляется **чип `🎬 С видео`** (SSR `?video=1`) — скептик Роман находит видео-отзывы за 1 тап, без прокрутки карусели/рекапа. Чип фильтрует `Review[]` по наличию `videoTestimonial` (см. R7). Опц. — под-секция «Видео-отзывы» сверху грида, если такие есть.
  > **[Волна 4, закрывает R5 (Роман, B-R5) — техническое отсечение demo]** Выдача `ReviewList` (и `TestimonialsCarousel` блок 9) фильтруется **на уровне запроса/компонента**: `approved === true && demo !== true`. Текстовый запрет RT-9 («НЕ публиковать demo») НЕ достаточен — флаг `demo` жёстко отсекается при рендере (даже если `approved` ошибочно true). Закрывает риск публикации сфабрикованных кейсов.

  **Ассеты:** реальные фото прошедших событий (см. `17_MEDIA_DIRECTION`), `ImageWithBlur` (lazy + blur-up). Заглушка — только если фото нет (never сток-аватар).

  **Производительность (LCP/INP/CLS):** изображения `loading="lazy"` кроме первой карточки на `/reviews` (та — LCP, eager + priority); CLS<0.1 через `aspect-ratio` бокс; INP<200ms (фильтр = мгновенный client-state).

  **a11y:** `img alt="<имя>, <тип события>"`; цитата `<blockquote>` + `<cite>`; карусель — кнопки prev/next с aria-label, НЕ авто-крутилка.

  **Responsive:** desktop — grid 3 кол.; tablet 2; mobile 1 (+ горизонт. скролл карточек или 1 кол.).
- `ContactForm` — Zod-валидация, чекбокс 152-ФЗ, телефон/WhatsApp/Telegram/карта. **[CMS-нет]** Данные формы → свой API route (Next.js, тот же VPS) → **РФ-БД** (Postgres/SQLite), перс. данные ТОЛЬКО в РФ (152-ФЗ). Платные формы (Typeform и пр.) ЗАПРЕЩЕНЫ бюджетным стеком 29_POSITIONING. Точные поля и юр. оформление — ниже (баг 23 закрыт).

  **Пропсы:** `variant: 'standalone'|'compact'|'constructor-step'`, `initialEventType?: EventType`, `source: 'contact-page'|'constructor'|'cta'`, `onSuccess: (lead)=>void`.

  **[Волна 3, закрывает D6 (Дарья, канал связи)] Выбор канала связи:** под полем имени/телефона — радио-группа **«Как вам удобнее, чтобы мы связались?»**: **«📞 Перезвонить»** / **«💬 Написать в WhatsApp»** / **«📧 Прислать КП на почту»**. Выбор асинхронного канала (WA / почта) **снимает обязательность телефона** — поле `phone` становится НЕобязательным (*) при выборе WA/почта (асинхронный подтверждающий канал вместо звонка, закрывает конфликт «без лишних звонков» из симуляции Дарьи). Телефон обязателен (*) ТОЛЬКО при выборе «Перезвонить». Zod-валидация адаптивна к выбранному каналу. Trust-сигнал под кнопкой корректируется по каналу («Напишем в WA ≤15 мин» / «Пришлём КП на почту» вместо жёсткого «Перезвоним ≤15 мин»).

  **ТОЧНЫЙ список полей (ровно 6, не 15):**
  1. `name*` — текст, placeholder «Как к вам обращаться».
  2. `phone*` — tel, маска `+7 (___) ___-__-__`, Zod regex РФ.
  3. `eventType*` — select: Корпоратив / Свадьба / Выпускной / Частное / Chef-at-home. **[Волна 2, закрывает B-MAX-1]** добавлен «Выпускной» (первый-class путь, не «Частное»).
  4. `date*` — date, `min = завтра`, «< 3 дней» → ошибка.
  5. `briefFile` — **[Волна 2, закрывает B-TAT-1] загрузка файла брифа** (PDF / XLS / DOC / DOCX, ≤10 МБ; опц. ссылка на облако — вставить URL Яндекс.Диск/Google Drive). Поле типа `<input type="file" accept=".pdf,.xls,.xlsx,.doc,.docx">` **ИЛИ** text-поле «Ссылка на бриф в облаке». Файл прикрепляется к заявке и уходит в `/api/contact` как вложение (multipart/form-data) вместе с остальным State — НЕ только комментарий. Клиент НЕ перепечатывает ТЗ вручную. **[Волна 2, закрывает B-TAT-8]** ветка «Свяжитесь с менеджером» (из `08`/`07`) передаёт и файл брифа, и контекст State.
  6. `comment` — textarea, необязательно (дополнение к брифу, НЕ замена ему).

  **Trust-сигналы (под кнопкой, иконка+текст):** «⏱ Перезвоним ≤15 мин · 📄 Договор и чек · 🛡 Страховка мероприятия».

  **152-ФЗ (юр., ОБЯЗАТЕЛЬНО):** чекбокс `consent152` «Согласен на обработку перс. данных по 152-ФЗ РФ» — **НЕ предустановлен** (пользователь ставит сам). Связан ссылкой «Политика 152-ФЗ» → `/privacy`. Без галочки submit заблокирован (Zod `refine`). Это требование РФ, не нарушение.

  **Валидация (Zod, реалтайм):** `name` не пуст; `phone` валидный РФ; `eventType` выбран; `date >= tomorrow`. Ошибки под полем + `aria-describedby` + `role="alert"`. Submit — gold full-width → animated check + «Перезвоним ≤15 мин».

  **После submit (Волна 2А):** успешный `POST /api/contact` → редирект на **`/thank-you`** (блок 25 `ThankYouScreen`, `?source=contact`) — видимое подтверждение заявки. Закрывает разрыв, когда заявка уходила в API без страницы подтверждения. Калькулятор/конструктор — аналогично (`?source=calculator`/`constructor`).

  **a11y:** каждое поле со своим `<label>` (не placeholder-only); `required` + `aria-required`; error-связка aria; чекбокс 152-ФЗ с понятным label и ссылкой; focus-visible; отправка с `prefers-reduced-motion` без анимации.
  **[Волна 3, закрывает V9 (Виктор, обратный звонок)] Мини-форма «Имя + телефон → перезвоним»:** на `/contact` рядом
  с полной формой (6 полей) размещается **компактная мини-форма обратного звонка** — ровно **1–2 поля** (`name` + `phone`),
  крупная кнопка **«Перезвоните мне»** → `/api/contact` с минимальным набором (без даты/брифа/комментария). Для тех,
  кто боится длинных форм («просто позвоните мне»): один тап — и перезвонят. Мини-форма НЕ дублирует полную (отдельный
  блок слева/справа или выше), ведёт в тот же API; после submit — тот же редирект на `/thank-you?source=contact-callback`.
  Поле `phone` в мини-форме — обязательное (цель = звонок), маска `+7` как в полной.

  **Ассеты:** иконки часов/документа/щита (inline SVG, light). Отправка → `/api/contact` (есть в репо, см. `15_REPO_AUDIT` §3).

  **Производительность / Responsive:** форма статична, не блокирует LCP; INP на валидации <200ms (client, без сети); desktop — 2 колонки полей + summary; mobile — 1 колонка, trust-сигналы под кнопкой.
- `BlogCard` / `BlogList` — статьи (SEO). Рубрики + editorial-карточка + CTA — ниже (баг 24 закрыт).

  **Рубрики (3):** `case` (кейс реального события) · `tip` (сезонный/практич. совет) · `guide` («как выбрать кейтеринг»).

  **Модель данных:**
  ```ts
  type Rubric = 'case'|'tip'|'guide';
  interface BlogPost {
    slug: string; title: string; rubric: Rubric;
    excerpt: string; cover: string; readingMin: number; // ~3
    author: string; date: string; linkedService?: string; // /events/* или /plan
    body: string;
  }
  ```

  **`BlogCard` пропсы:** `post: BlogPost`, `variant: 'grid'|'featured'`. Состав (editorial): крупное фото + рубрика-бейдж (верхний левый) + заголовок (Cormorant) + «~3 мин чтения».

  **`BlogList` пропсы:** `posts: BlogPost[]`, `rubricFilter?: Rubric`. Фильтр-чипы по рубрике (URL `?rubric=`), a11y `radiogroup`.

  **CTA в калькулятор (в конце каждого поста + на `/blog`):** «Рассчитать меню под ваше событие → `/plan/calculator`» (естественный вывод, не форсированный).
  **[Волна 10, закрывает B-G7 (Гоша — КРИТИЧНО)] Рубрика сравнительных гайдов.** В `BlogPost.rubric` добавить слот **`'guide'`** с честными материалами «Как выбрать кейтеринг: 5 вопросов, на которые стоит ответить» / «На что смотреть при сравнении предложений кейтеринга» — ДАЁТ Гоше критерии сравнения NiloV с рынком БЕЗ поимённого называния конкурентов (иначе не credible). Гайды связывают читателя с таблицей сравнения (`/why-us` или `/help/formats`, B-G2) и калькулятором. Слот обязателен в редакционном плане блога (не только case/tip).

  **SEO + llms.txt:** semantic `<article>` (h1/post-title, h2 в теле); мета title/description; JSON-LD `Article`/`BlogPosting`; `public/llms.txt` перечисляет `/blog` и ключевые посты для поисковых систем и LLM-агентов (ChatGPT/Perplexity).

  **Ассеты:** обложки — реальные фото событий/`17_MEDIA_DIRECTION` (не сток); `ImageWithBlur`.

  **Производительность / a11y / Responsive:** cover `aspect-ratio` (CLS<0.1), lazy кроме первой; alt = заголовок; сетка desktop 3 кол. / tablet 2 / mobile 1.
- `AvailabilityCalendar` — мини-календарь занятости (urgency-бейдж). Источник данных и реальная занятость — ниже (баг 25 закрыт: НЕ «всегда свободно»).

  **Источник данных (РЕАЛЬНЫЙ):** `GET /api/availability?from=&to=` — эндпоинт **УЖЕ есть в репо** (см. `15_REPO_AUDIT` §3: `/api/availability` в числе существующих). SSR/ISR: календарь рендерится на сервере (не «всегда свободно»), `revalidate 3600`, инвалидация по webhook брони. Fallback при недоступности API — НЕ «free», а «Уточняйте у менеджера» (честно).
  **[Волна 7, закрывает O2+O4+O7 (Олег)] ЕДИНЫЙ МИНИМАЛЬНЫЙ СРОК + РЕАЛЬНЫЕ ДАННЫЕ + ЖИВОЙ СЧЁТЧИК:**
  - **Единая константа `MIN_BOOKING_DAYS = 3`** (минимум 3 ПОЛНЫХ дня) — истина для ВСЕХ инструментов
    (калькулятор `07`, конструктор `08` шаг 6 `min=tomorrow` → ЗАМЕНИТЬ на `min=+3 дня`, форма брони Hero `mode='book'`,
    `AvailabilityCalendar.minBookingDays`). Ранее в `07` было «Дата <3 дней → Минимальный срок 3 дня», а в `08`
    шаг 6 — `min=tomorrow`; ПРОТИВОРЕЧИЕ устранено: везде «минимум 3 полных дня». Подсказка «Минимальный срок
    бронирования — 3 полных дня» показывается ДО выбора даты (в календаре и в форме брони), чтобы Олег не путался.
  - **Реальные занятые даты ДО релиза (O4):** `occupiedDates` заполняются РЕАЛЬНЫМИ данными заказчика ДО прод-релиза
    (bulk-выгрузка из CRM/календаря, как у аллергенов S1). Пока импорт НЕ завершён — календарь показывает пометку
    **«Точную занятость уточняйте у менеджера»** и НЕ вводит клиента в заблуждение тихой «свободно». Пустой/недоступный
    `/api/availability` = статус «уточните у менеджера», НЕ «free».
  - **Живой счётчик свободных слотов (O7):** из `occupiedDates` считается `freeSlotsIn7Days` —
    **«Осталось N свободных дат на ближайшие 7 дней»**; счётчик в `aria-live` (обновляется при смене окна),
    связан с сезонностью (Декабрь → «Высокий сезон» → счётчик ниже). Убирает декоративность urgency-бейджа.

  **Модель:** `AvailabilityDay { date: string; status: 'free'|'limited'|'booked' }`. `limited` = осталось 1–2 слота. Таймзона — Europe/Moscow (РФ).

  **Urgency-бейдж (реальный):** «🔥 3 даты в августе заняты» / «Осталось 2 слота на [дата]» — считается из реальных `booked/limited`.

  **Пропсы:** `months: number` (показать N вперёд), `onPickDate?: (d)=>void` (связь с Constructor/ContactForm), `variant: 'mini'|'full'`.

  **a11y (grid/aria):** таблица/сетка `role="grid"` с `role="row"`/`role="gridcell"`; каждая ячейка `aria-label="<дата>: свободно/ограничено/занято"`; навигация стрелками; статус объявляется `aria-live="polite"`.

  **Ассеты:** иконка «огонь» для urgency (inline SVG).

  **Производительность / Responsive:** данные с сервера → CLS<0.1 (фикс. сетка); LCP не блокируется; INP<200ms. Desktop — 2–3 месяца в ряд; mobile — 1 месяц, горизонт. скролл/свайп.
- `TrustProof` — **[web: hooray.agency 2026 «transparency decides trust»]** блок прозрачности. Явный РФ-комплаенс (152-ФЗ + ТР ТС 021/2011) зафиксирован (баг 26 закрыт).

  **Копирайт (ЕДИНЫЙ proof-блок; объединил в себя бывший `AwardsStrip`, C12 — 2 trust-блока вместо 5+):**
  *Комплаенс-факты (`variant:'facts'`):*
  1. 🚚 Доставка в КАД включена (0 ₽ внутри КАД).
  2. 🍳 Кухня су-вид (без наценки за бренд).
  3. 🛡 **14 аллергенов по ТР ТС 021/2011** (РФ-комплаенс, маркировка на каждом блюде).
  4. 📄 Договор и чек (юр. прозрачность).
  5. 🛡 Страховка мероприятия.
  6. 🔒 **Обработка данных по 152-ФЗ РФ** (ссылка на `/privacy`).
  *Репутационные факты (добавляются в тот же блок, `variant:'facts'`):*
  7. 🏛 **более 19 лет на рынке Петербурга** 🟡 (с 2007 — подтвердить актуальное число лет у заказчика; на живом сайте NiloV указано «более 19 лет»).
  8. 🎉 **3 500+ проведённых событий** 🟡 *(финальную цифру уточнить у заказчика; НЕ публиковать как подтверждённый факт до сверки — см. `21_LOGIC_AUDIT:121`; статус `pending` по FACT-GATE)*.
  9. 🔶 **Участник и финалист отраслевых премий** 🟡 *(подтвердить у заказчика — запросить реальный список наград и точные годы; ранее указанные «Гастрономический Оскар 2024» и «Event Awards Russia 2023» НЕ подтверждены вебом (0 результатов) и УДАЛЕНЫ как факт-призраки по отчёту FactChecker). Отраслевые премии — **мелким шрифтом снизу**, НЕ якорь доверия (T5/29_TRUST_SEG: акцент на операционном trust, не на «элитности»).)*
  10. 🤝 Клиенты: `Корпоратив «А»` · `Свадьба «Б»` · `Лофт-площадка` · `Бизнес-центр` · `Загородный клуб` 🟡 *(статус `'pending'` — анонимные плейсхолдеры «нам доверяют», НЕ подтверждено независимо через web_search: до подписанных договоров НЕ называем конкретные бренды БЕЗ 🟡/disclaimer-контекста («не клиент / пример площадки»); бренды (статусные бренды, по запросу 🟡) ДОПУСТИМЫ ТОЛЬКО как пример-площадка с 🟡 + «не клиент» per FACT-GATE, 04:86; показывать ТОЛЬКО с дисклеймером «на проверке / пример из архива»; не выводить как факт без подтверждения договоров у заказчика; финал — по списку заказчика). **Роспотребнадзор — НЕ клиент, а госрегулятор** (см. `04:522`, `45:16`); упоминается только в `CertBlock`/`TrustBar` как регулятор/сертификация, не в ряду клиентов.* Подпись рядом: **«от семейного ужина до банкета на 500 гостей — один стандарт качества»** (T6/29_TRUST_SEG: средний клиент узнаёт себя, а не только аспирирует вверх).*

  **[Волна 10, закрывает B-G4/B-G6 (Гоша — КРИТИЧНО)] (1) Клиентский ряд НЕ должен спорить с value-посланием «для любого бюджета».** Вместо статусных лого (статусные бренды, по запросу 🟡), которые рядом с «для любого бюджета» читаются как «статусная пустышка», используем анонимные плейсхолдеры «нам доверяют» (статус `pending`) с честной подписью «от семейного ужина на 10 до банкета на 500 — один стандарт качества» (средний клиент узнаёт себя, а не только аспирирует вверх). Конкретные бренды называются ТОЛЬКО после подписанных договоров как proof. (2) **Запрет рендера 🟡/⚠️ как факта.** `pending-verification`/`⚠️`-факты (более 19 лет, су-вид, премии, клиенты) НЕ рендерятся как утверждение — только с пометкой статуса ИЛИ после верификации (год основания, реальный список премий с годами, подтверждённые клиенты). До публикации `TrustProof` как proof — заполнение верифицированными значениями обязательно (см. B-G6).
  **Пропсы:** `items?: TrustItem[]` (по умолч. 10 выше), `variant: 'strip'|'grid'|'facts'`.

  **Дизайн/язык:** light-фон, мелкие иконки (inline SVG, aria-hidden) + текст; тот же язык, что у `TrustBar`/геометрии `01` §5 (light, geometric, мелкий caps-лейбл). НЕ тёмная плашка.

  **a11y:** каждый пункт `<li>` с читаемым текстом (иконка `aria-hidden`); контраст AA; 152-ФЗ/ТР ТС — реальный текст, не только декорация.

  **Ассеты:** inline SVG-иконки (без внеш. запросов).

  **BEHIND-SCENES 60с (Волна 3А, `17` §8 п.4):** опц. вставка **behind-scenes ролика 60с** (сборка / сервировка / шеф)
  из архива заказчика поверх/рядом с proof-фактами — видео команды в действии = доверие (brandtotable). Проп
  `behindScenes?: VideoRef` (`provider:'rutube'|'selfhost'`, default=`rutube`), `variant:'facts+video'`. Facade-эмбед (poster+play-btn, `VideoProvider` по клику,
  БЛОК 27 `EventsRecap`), НЕ self-host (LCP). `prefers-reduced-motion` → poster + play-btn, воспроизведение по клику.
  a11y: `<button aria-label="Видео за кулисами: сборка и сервировка площадки">`. Единый язык/источник с `WhyUs` (блок 8).

  **Производительность / Responsive:** статичный блок, CLS<0.1; desktop — row из 6, tablet 3×2, mobile 2 кол.
- `TeamGrid` — **[web: cateringrewards 2026]** фото + имя + роль ключевых людей
  (шеф, основатель Дмитрий Нилов, координатор). Лица = доверие. geometric frames. Живые фото и структура — ниже (баг 27 закрыт).

  **Модель данных:**
  ```ts
  interface TeamMember { name: string; role: string; photo: string; bio?: string; }
  ```
  **Состав (минимум 3, расширяемо):** Дмитрий Нилов (Основатель & шеф-идеолог) · Шеф-повар (live) · Координатор мероприятий. Далее — повара станций, менеджеры (по мере появления).

  **Пропсы:** `members: TeamMember[]`, `variant: 'grid'|'featured'`.

  **Фото — ЖИВЫЕ, НЕ сток:** источник — реальные съёмки команды (`17_MEDIA_DIRECTION` §TeamGrid). Запрет сток-портретов (риск доверия). `ImageWithBlur` (blur-up).

  **Дизайн:** geometric frames — **circular/diamond** (как `TrustBar`), единый язык. Каждая карточка = фото + имя + 1 строка роли.

  **a11y:** `img alt="<имя>, <роль>"`; hover-текст роли доступен без наведения (не только tooltip).

  **Ассеты:** фото команды (реальные). Геометрия фрейма — CSS `border-radius`/`clip-path` (diamond).

  **Производительность / Responsive:** lazy + `aspect-ratio` (CLS<0.1); desktop 3–4 в ряд, tablet 2, mobile 1–2.
- `BlogEditorial` — **[web: webcitz/htmlburger/gofoodservice]** карточки статей
  (кейсы, сезонные советы, «как выбрать кейтеринг»). SEO + экспертность. Рубрики и связь с услугой — ниже (баг 28 закрыт).

  **Рубрики (те же 3, что у `BlogCard`, единый язык):** `case` (кейс реального события) · `tip` (сезонный/практич. совет) · `guide` («как выбрать кейтеринг»).

  **Связь с услугой (обязательна, `19`#28):** каждый пост `linkedService` → реальная ссылка на `/events/*` или `/plan/calculator`. Примеры рубрикальных заголовков:
  - *case:* «Свадьба на 120 гостей: как мы собрали меню Максимальный за 5 дней» → CTA на `/events/svadba`.
  - *tip (сезонный):* «Что подать на Новый год-2026: 7 блюд от шефа» → CTA на `/seasonal`.
  - *guide:* «Как выбрать кейтеринг: 9 вопросов менеджеру» → CTA на `/plan/calculator`.

  **Структура страницы поста:** H1 + подзаголовок + cover (hero) + `TOC` (якоря h2) + body + автор/дата + CTA в калькулятор (в конце) + `SchemaBlock` `Article`.

  **Пропсы `BlogPostPage`:** `post: BlogPost` (модель — см. `BlogCard` #24).

  **Ассеты:** обложки — реальные фото событий (`17_MEDIA_DIRECTION`, не сток); `ImageWithBlur`.

  **a11y / SEO / Perf / Responsive:** см. `BlogCard` #24 (тот же контракт: semantic `<article>`, JSON-LD, `llms.txt`, alt=заголовок, aspect-ratio CLS<0.1). Desktop — max-width колонки ~720px для чтения; mobile — 1 кол.
- `SeasonalModule` — **[web: bettercater summer 2026]** повторяющаяся секция сезонных
  предложений (ББQ лето, Новый год, Масленица) с CTA на соответствующий пакет. Механизм ротации и urgency — ниже (баг 29 закрыт).

  **Механизм смены по сезону (НЕ статично):** единый `seasonalConfig` (данные, не хардкод в JSX). Определяет активный сезон по `Date` (сервер, RU tz) → рендер нужного модуля. Сезоны:
  - `summer` (июнь–авг): ББQ / мобильный фуршет.
  - `newyear` (нояб–дек): Новогодний корпоратив / банкет.
  - `maslenitsa` (фев–март): Масленица / блины-фуршет.
  - `spring`/`autumn` (fallback): текущая подборка из `MenuCatalog` (20% ротации меню по blueprint).

  **Urgency (реальный дедлайн):** для high-season (`newyear`) — бейдж «🔥 Бронируйте за 2 недели» + счётчик дней до рекоменд. дедлайна (из `seasonalConfig.deadline`). Для `maslenitsa` — «Последние выходные — блины свежие».

  **CTA на КОНКРЕТНЫЙ пакет (не главную):** `ctaHref` берётся из `seasonalConfig` (напр. newyear → `/plan/calculator?tier=premium` или `/events/korporativ`; summer → `/events/chef-at-home`). Связь с `PackageGrid` по `tier`.

  **Пропсы:** `season?: Season` (авто из даты), `config: SeasonalConfig`, `variant: 'hero'|'strip'`.

  **Ассеты:** сезонные фото (ББQ-гриль / новогодний стол / блины) — `17_MEDIA_DIRECTION`.

  **a11y / Perf / Responsive:** счётчик = `aria-live="polite"` (обновляется без перезагрузки); lazy-фото; CLS<0.1; desktop — 2 кол. (фото+текст/CTA), mobile — стек. Связь с `AnnouncementBar` (читает тот же `seasonalConfig`).

  > **[Волна 8, закрывает ZH3 (Жанна, сезонный НГ — критично)] Evergreen-лендинг «Бронируйте праздники заранее» — достижим круглый год.** Проблема: вне сезона (напр. июль) при `season ∈ {spring,autumn,summer}` НГ-оффер полностью невидим на главной, а `/seasonal` показывает только текущий сезон. Решение: (а) на `/seasonal` **всегда** присутствует evergreen-секция `SeasonalUpcoming` «Планируете праздник? Бронируйте заранее» с карточками ВСЕХ будущих сезонов (в июле — «Новый год-2026», «Масленица-2026»), ссылками на их пакеты/меню-превью; (б) на главной, когда активный сезон НЕ high-season, `SeasonalModule variant:'strip'` рендерит evergreen-CTA-полосу **«Новый год-2026 — забронируйте заранее, лучшие даты уходят →»** (`/seasonal#newyear`). Так Жанна попадает на НГ-контент в любой месяц, а не ждёт ноября.

  > **[Волна 8, закрывает ZH6 (Жанна)] Превью «скоро в сезоне» / фильтр «будущий сезон».** `SeasonalRotation`/`SeasonalUpcoming` разрешает пользователю смотреть меню будущего сезона вне его окна: на `/seasonal#newyear` и в каталоге (`/menu/catalog?season=newyear`) активируется режим-превью — блюда с `season:['newyear']` показываются с бейджем **«Скоро в сезоне · Новый год-2026»** (не «активно сейчас»). Жанна изучает НГ-меню в июле. Синхрон с `MenuCatalog` (season-фильтр, см. §СЕЗОННАЯ РОТАЦИЯ) — добавить опцию фильтра «Будущий сезон».

  > **[Волна 8, закрывает ZH7 (Жанна — критично) + ZH9/BUG-F2] Явная сезонная (high-season) цена/наценка.** В НГ-оффере (`SeasonalModule`/`SeasonalUpcoming`/`/events/korporativ` НГ-блок) показывается **явная новогодняя мин. цена** и **праздничная наценка high-season** (напр. «Новогодний корпоратив — от X ₽/гость, +Y% праздничная наценка к базовому тарифу»), а не только скрытый верхний тариф. Early-booking «−15%» остаётся, но рядом с ним **обязательно** прописана high-season-надбавка (`PricingConfig.seasonalSurcharge[season]`). ⚠️ Все НГ-числа несут `pending-verification` (BUG-F2, сверка 390 vs 2 450 ₽) и ОБЯЗАНЫ сверяться с прайсом заказчика ДО релиза — КП с вымышленной НГ-ценой = потеря доверия босса Жанны.

  > **[Волна 8, закрывает ZH8 (Жанна)] Дедлайн-счётчик рендерится ВНЕ сезона.** Счётчик `seasonalConfig.deadline` показывается не только когда `season==='newyear'`, а всегда, когда **`now < deadline` И (`deadline - now <= N дней` ИЛИ событие в high-season-окне)** — постоянная видимость дедлайна (в `AnnouncementBar` high-season-режиме, ZH1, и в evergreen-strip). Так Жанна в июле/октябре видит «до рекомендуемой брони НГ осталось X дней», а не только в декабре.
- `SchemaBlock` — **[web: gofoodservice «structured data helps AI systems»]** JSON-LD
  (Organization, LocalBusiness, Menu, Offer, FAQPage, AggregateRating) + `llms.txt` + **обязательный per-page SEO-контракт** (закрывает B3, критик C9): каждая страница (`/`, `/menu`, `/menu/*`, `/events/*`, `/plan/*`, `/reviews`, `/blog`, `/blog/*`, `/why-us`, `/seasonal`, `/gallery`, `/team`, `/contact`, `/faq`, `/delivery`, `/certificates`, `/allergens`, `/help/formats`, `/tasting`, `/venues`, `/accessibility`, `/careers`, `/partners`, `/subscribe`, `/media-kit`, `/account/orders`, `/thank-you`(noindex), `/404`(noindex)) несёт `<title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image`, `og:type`, `og:locale=ru_RU` и `<link rel="canonical">` (self-canonical, без www). OG-теги берутся из `generateMetadata` (Next 16 metadata API) per route, НЕ хардкод. Маппинг страница→схема и защита от фейка — ниже (баг 30 закрыт).

  > ### БЛОК 30 — SchemaBlock  *(JSON-LD + per-page SEO-контракт, единый для всех роутов)*
  >
  > **Назначение:** каждая страница несёт корректные SEO-теги + структурированные данные (JSON-LD), чтобы поиск и AI-системы корректно индексировали NiloV. Закрывает C9-4 (per-page контракт для всех 13 ключевых страниц + 4 ранее пропущенных: `/delivery`, `/certificates`, `/allergens`, `/help/formats`).
  >
  > **КАНОН ДОМЕНА (КАНОН №0, `39_CANON_INDEX.md`):** все `metadataBase` / `canonical` / `@id` / JSON-LD `url` = **`https://odaeda.ru`** (без trailing slash). `nilov-catering.ru` — ТОЛЬКО alias-бренд, НИКОГДА не канонический хост. В per-page SEO-контракте обязательно: `metadataBase: 'https://odaeda.ru'`.
  > - **Реализация:** обёртка над `components/seo/StructuredData` (репо, `04`#89). Пропсы: `pageType: keyof mapping`, `data: Record<string, unknown>`, `enableRating?: boolean`.
  > - **Маппинг страница→схема** — см. таблицу выше (расширена на все роуты, включая `/delivery`/`/certificates`/`/allergens`/`/help/formats`).
  > - **Защита от фейка:** `AggregateRating` НЕ рендерится без `reviews.approved.length >= 1` (см. ниже).

  **Маппинг страница → тип(ы) схемы (НЕ только главная, `19`#30):**
  | Страница | JSON-LD `@type` |
  |---|---|
  | `/` (главная) | `Organization` + `LocalBusiness` (Restaurant) |
  | `/menu`, `/menu/*` | `Menu` + `MenuSection`/`MenuItem` + `Offer` (цена/гость) |
  | `/plan`, `/plan/calculator`, `/plan/constructor` | `Service` + `Offer` (итоговая цена) |
  | `/faq` | `FAQPage` (4 Q&A из FAQTeaser #13) |
  | `/reviews` | `Organization` + `AggregateRating` **ТОЛЬКО если есть отзывы** (см. ниже) |
  | `/blog`, `/blog/[slug]` | `Article` / `BlogPosting` |
  | `/events/*` | `Service` + `Offer` (цена типа события) |
  | `/team`, `/why-us`, `/contact` | `Organization` (база) |
  | `/delivery` | `LocalBusiness` + `Offer` (зоны доставки) |
  | `/certificates` | `Organization` (сертификаты/комплаенс 152-ФЗ, ТР ТС 021/2011) |
  | `/allergens` | `Article` (легенда 14 аллергенов ТР ТС 021/2011) |
  | `/help/formats` | `FAQPage` (помощь по форматам событий) |
  | `/gallery` | `ImageGallery` + `Organization` (реальные фото событий) |
  | `/tasting` | `Service` + `Offer` (дегустация before-booking) |
  | `/venues` | `LocalBusiness` + `Place` (площадки-партнёры) |
  | `/accessibility` | `Article` (заявление WCAG 2.1 AA) |
  | `/careers` | `Organization` + `JobPosting[]` (открытые вакансии) |
  | `/partners` | `Organization` (B2B-партнёрство) |
  | `/subscribe` | `Service` (регулярные заказы) |
  | `/media-kit` | `Article` (пресс-кит) |
  | `/account/orders` | `Organization` (кабинет клиента, noindex для ботов) |
  | `/thank-you` | `Organization` (noindex — страница благодарности после формы) |
  | `/404` | `Organization` (noindex, HTTP 404) |

  **AggregateRating — ЗАЩИТА от фейка (`19`#30 / `20` риск):** `AggregateRating` НЕ рендерится, пока `reviews.approved.length === 0`. Когда есть ≥1 одобренный отзыв → `ratingValue` = среднее `review.rating`, `reviewCount` = число. Никаких хардкод-«5.0» без данных (риск фейк-схемы → санкции Гугла).

  **Реализация:** обёртка над `components/seo/StructuredData` (репо, `04`#89). Пропсы: `pageType: keyof mapping`, `data: Record<string, unknown>`, `enableRating?: boolean`.

  **Полный состав полей `LocalBusiness` (на `/`, `/events/*`, `/team`, `/why-us`, `/contact`, `16`#27):** обязательные + рекомендованные, НЕ только name/url:
  - `name` — «NiloV Catering» (зафикс. бренд).
  - `url` — канонический `https://odaeda.ru` (без trailing slash; единый прод-домен, см. `02_IA.md` §«Домен»).
  - `telephone` — `+7 (812) 919-59-11` (в формате E.164: `+78129195911`).
  - `address` — `PostalAddress`: `streetAddress` (СПб, уточнить), `addressLocality: "Санкт-Петербург"`, `addressRegion: "Ленинградская обл."`, `postalCode`, `addressCountry: "RU"`.
  - `priceRange` — `$$$` (по шкале schema.org) ИЛИ явно «от 390 ₽/гость» 🟡 *(ведущий якорь = реальная цена с сайта NiloV 390 ₽; канон 950 — вторичное уточнение, НЕ публиковать 950 как подтверждённый якорь до сверки с прайсом заказчика)* (для богатых сниппетов).
  - `openingHours` — `OpeningHoursSpecification`: `dayOfWeek` (Пн–Вс), `opens: "09:00"`, `closes: "21:00"` (уточнить у заказчика).
  - рекоменд.: `image` (лого/hero), `geo` (широта/долгота), `areaServed` («Санкт-Петербург и ЛО»), `sameAs` (ссылки: **VK https://vk.com/nilov_catering — ПЕРВИЧНЫЙ** канал в РФ (всегда доступен), Instagram @nilov_catering — ВТОРИЧНЫЙ (аудитория через VPN); WhatsApp/Telegram — первичные каналы связи, по `29_POSITIONING` §«Соц-ленты»; VK-primary правило см. `17_MEDIA_DIRECTION`. Решение Волны 5А «Instagram→VK» — VK теперь ПЕРВИЧНЫЙ по умолчанию для РФ). `aggregateRating` — ТОЛЬКО по правилу из маппинга (см. выше).

  **Полный состав полей `Offer` (на `/menu/*`, `/plan/*`, `/events/*`):** каждое меню/пакет/станция = отдельный `Offer` в `ItemList`/`Menu`:
  - `priceCurrency` — `"RUB"` (обязательно, НЕ опускать).
  - `price` — число (₽/гость ИЛИ ₽/станция из `NILOV_UNIFIED_MENU`, без копеек, разделитель — точка для JSON-LD: `4350`).
  - `availability` — `InStock` (в наличии) по умолч.; для сезонных/limited — `LimitedAvailability` / `PreOrder` (под Новый год).
  - `itemOffered` — ссылка на `Product`/`MenuItem` (название блюда/пакета) ИЛИ вложенный объект с `name`.
  - рекоменд.: `url` (страница заказа), `priceValidUntil` (дата актуальности прайса), `eligibleRegion: "RU"`. Пример `Offer`:
    ```json
    {"@type":"Offer","priceCurrency":"RUB","price":"4350","availability":"https://schema.org/InStock","itemOffered":{"@type":"Product","name":"Фуршет"}}
    ```

  **llms.txt (отдельный артефакт — НЕ внутри spec-блока, лежит в `public/llms.txt`):** статичный машинойтаемый файл для поисковых систем и ИИ-ассистентов (ChatGPT/Perplexity/Claude). Содержит:
  - заголовок-пояснение («NiloV Catering — кейтеринг в Санкт-Петербурге. Машиночитаемая карта сайта (для поисковых и LLM-агентов).»);
  - список ключевых страниц (`/`, `/menu`, `/plan/calculator`, `/events/*`, `/reviews`, `/blog`) с 1-строчным описанием услуги;
  - **структуру услуг/меню для поисковых систем и ИИ-ассистентов**: форматы (фуршет/банкет/кофе-брейк) + диапазон цен ₽/гость + типы событий (свадьба/корпоратив/частное/chef-at-home);
  - контакты (телефон/WhatsApp/Telegram) и гео (СПб, КАД).
  Обновляется вместе с `sitemap.xml` при деплое. Ссылка из `<head>`: `<link rel="llms-txt" href="/llms.txt">`. См. `BlogCard` #24.

  **a11y / Perf / Responsive:** JSON-LD в `<head>` (`<script type="application/ld+json">`) — невидим, не влияет на LCP/CLS/INP. `llms.txt` — статичный файл.

## 🟠 КОНВЕЙЕР ОТЗЫВОВ (Волна 5В — закрывает `30_REVIEWS_CRITIC` RT-1…RT-11)

> **Проблема (`30`):** отзывам **сейчас не верят (2.5/10)** — 3 сочинённых цитаты, пустой `RatingBadge`,
> нет объёма. Инструменты есть (6/10), но **нет самой трубы сбора** (авто-запрос после события + CMS-конвейер).
> Цель: поднять веру до **≥8/10** через RT-1…RT-4 (объём ≥20 + видео + живой рейтинг + честный микс +/- + ответы).

### A. Авто-сбор после события (RT-1, RT-11 — БЛОКИРУЮЩИЕ)
- **Триггер (шаг 5 `ProcessSteps` «Обратная связь»):** CRM/CMS (`29_CMS_CRITIC` B-CMS-5) через **+1–2 дня
  после статуса события «проведено»** → WhatsApp/email/SMS-рассылка с **1-клик ссылкой** на отзыв.
  Ссылка ведёт сразу на **внешнюю площадку** (Яндекс/2ГИС/Google) И на внутреннюю форму `/reviews`
  (фотоотчёт + цитата + чекбокс «разрешаю публикацию видео»).
- **Геймификация:** «Оставь отзыв → скидка 5% на следующее событие» (B2B-клиенту — бонус менеджеру / следующий кофе-брейк бесплатно).
- **RT-11 — кнопка «Оставить отзыв» на `/thank-you`** (`БЛОК 25`): момент благодарности = пик лояльности.
  Добавить CTA «Оцените нас →» (ведёт на внеш. площадку + `/reviews`). Триггер запроса в этой же точке.

### B. CMS-конвейер Review (RT-2, RT-3 — БЛОКИРУЮЩИЕ)
- **Коллекция `Review`** в CMS (исполнитель Б, CMS-слой — см. `29_CMS_CRITIC` B-CMS-5 / будущий `XX_CMS_LAYER.md`):
  поля из `04` интерфейса `Review` (`clientName, eventType, date, guests, tier, quote, rating?, photo?`)
  + **`approved: boolean`** (модерация — галочка в админке, НЕ правка кода) + **`reply?: { author; text; date }`** (RT-7)
  + `source: 'site'|'yandex'|'2gis'|'google'`.
- **Интеграция внеш. рейтинга (RT-3):** вписать реальные `yandexProfileUrl` / `twoGisProfileUrl` / `googleProfileUrl`
  в `RatingBadge` (`БЛОК 24`) и **тянуть звёзды/число через API площадок** (НЕ хардкод «5.0» — правило G-3).
  Если ни один профиль не задан — плитка площадки НЕ рендерится (`30`: пустой бейдж = «фейк»).
- Связь с `AggregateRating` (`SchemaBlock` `БЛОК 30`): рендер `ratingValue` ТОЛЬКО при `reviews.approved.length > 0`
  (RT-10 — уже есть, держать).

### C. Объём и честность (RT-4, RT-6, RT-8, RT-9)
- **RT-4 — метрика готовности:** публиковать раздел `/reviews` как «доверительный» только при
  **≥20 одобренных** + **≥3 видео-отзыва** + **≥10 внеш. на Яндекс/2ГИС**. До метрики — не анонсировать как proof.
- **RT-6 — честный микс +/-:** публиковать **1–2 реальных «с замечанием»** + ответ компании («приняли, исправили»).
  `approved` фильтрует, но НЕ прячет негатив полностью (Forbes 2024: сбалансированный рейтинг вызывает БОЛЬШЕ доверия).
- **RT-8 — дисклеймер «реальные отзывы»:** микро-текст на `/reviews` и под `RatingBadge`:
  «Отзывы с реальных мероприятий, подтверждённые фото/видео события. Внешний рейтинг — на Яндекс.Картах / 2ГИС / Google.»
- **RT-9 — убрать сфабрикованные «реальные кейсы»:** 3 примера блока 9 (`TestimonialsCarousel`: Анна и Павел /
  Северсталь-Логистика / Ирина) пометить явно `demo` и НЕ публиковать до замены на верифицированные
  (риск фейк-бренда; нужно письменное согласие — см. TODO №6).

### D. Видео-отзывы как дефолт сбора (RT-5)
- На рекап-съёмке (`EventsRecap`, `БЛОК 27`) просить гостей/организаторов сказать **10–20с в кадр**.
  Поле `videoTestimonial` уже есть в `TestimonialsCarousel` (video-wall) — задействовать массово.
  79% потребителей смотрят видео-отзывы; сайты с ними ~+80% конверсии (`30` стратегия B).

### Сводка RT → где закрываем
| RT | Что | Где в структуре |
|----|-----|-----------------|
| RT-1 | Авто-запрос после события | шаг 5 `ProcessSteps` + CMS-триггер B-CMS-5 |
| RT-2 | CMS-коллекция `Review` + `approved` | CMS-слой (исполнитель Б), `БЛОК 30` ждёт |
| RT-3 | Реальные `url` + pull рейтинга | `БЛОК 24` RatingBadge (G-3) |
| RT-4 | Объём ≥20 / ≥3 видео / ≥10 внеш. | метрика готовности `/reviews` |
| RT-5 | Видео-отзывы дефолт сбора | `БЛОК 9` + `БЛОК 27` |
| RT-6 | Честный микс +/- | `БЛОК 22` `Review.approved` |
| RT-7 | Поле `reply` (ответ компании) | `БЛОК 22` `Review` |
| RT-8 | Дисклеймер «реальные отзывы» | `/reviews` + `БЛОК 24` |
| RT-9 | Снять сфабрикованные кейсы | `БЛОК 9` `demo`-флаг |
| RT-10 | `AggregateRating` только при данных | `БЛОК 30` (есть) |
| RT-11 | Кнопка «Оставить отзыв» на `/thank-you` | `БЛОК 25` |

## Примитивы (доступны готовыми — см. `15_REPO_AUDIT.md`)
Репозиторий УЖЕ содержит `components/ui/*` (shadcn: Button/Card/Badge/Input/Accordion/
Separator/Sheet) и `components/effects/*` (MagneticButton, ParallaxImage, AnimatedCounter,
TextReveal, AnimatedSection, CustomCursor, Skeleton) + `components/common/*` (SkipLink, Breadcrumbs,
CookieBanner, ScrollToTop). Их НЕ переписываем — переиспользуем как наши примитивы:
- `MagneticButton` → `MagneticButton` (наш)
- `ParallaxImage` → база `ImageWithBlur` (Ken Burns + blur-up)
- `AnimatedCounter` → `CountUp`
- `AnimatedSection` / `TextReveal` → `Reveal` (Framer `whileInView`)
- `SkipLink` → `SkipLink` (наш)

## Блоки, УЖЕ реализованные в репо (перекрасить, не писать заново)
- `HeroSection`, `ServicesSection`(→EventTypeSelector), `MenuPreviewSection`(→FormatShowcase),
  `GallerySection`(→GalleryTeaser), `SocialProofBar`(→TrustBar), `TestimonialsSection`,
  `ProcessTimeline`(→ProcessSteps), `PhilosophySection`(→WhyUs), `CTASection`, `FAQSection`
  — всё в `components/sections/*`.
- `components/constructor/*` (FormatSelector, GuestsSlider, TierSelector, AddOnsSelector, StepProgress,
  SummaryCard, ContactForm) — готовый каркас `Constructor` (см. `08_CONSTRUCTOR_SPEC`).
- `components/quote/QuoteForm` — база `Calculator` (см. `07_CALCULATOR_SPEC`).
- `components/gallery/*` (GalleryGrid/Filter/Lightbox) — база `GalleryMasonry`.
- `components/seo/StructuredData` — наш `SchemaBlock`.

> ⚠️ Файлы лежат в `components/sections/*` и `components/*`, а НЕ в `components/blocks/*`
> (который пуст). В Фазе 0 переименовываем их в `blocks/` по именам выше и перекрашиваем.

## Правило именования
Все блоки — `PascalCase`, в `@/components/blocks/*`.
Примитивы — в `@/components/ui/*`.
Токены — в `@/styles/tokens.css` + `tailwind.config.ts theme.extend`.
Никаких хардкод-цветов в компонентах.

---

## ДЕТАЛЬНЫЕ СПЕЦИФИКАЦИИ БЛОКОВ 11–20 (по bug-list критика 19B)

> Цель: устранить однострочность (`19B`: блоки 11–19 = FAIL, «описаны в 1 строку»)
> и **примирить 4 противоречия** — VK-лента (Волна 5А: вместо заблокированного в РФ Instagram),
> EventHero (фон vs фото типа), DishCard (hover zoom vs 5с видео),
> Calculator (без API vs `POST /api/calculate`). Каждый блок = пропсы + копирайт/данные
> + ассеты + LCP/INP/CLS + a11y (aria/alt/reduced-motion) + responsive.
> Токены — из `06_TOKENS`, данные меню/цен/станций — из `NILOV_UNIFIED_MENU.md` (канон),
> матмодель калькулятора — из `07_CALCULATOR_SPEC`.

---

### БЛОК 11 — LiveInstagramFeed  *(глобальный + секция «Жизнь NiloV»)*

> **По `29_POSITIONING` §«Соц-ленты» — [Волна 3, закрывает K2 (Камила, РФ)] В РФ Instagram заблокирован → решение Волны 5А «Instagram→VK» ВОЗВРАЩЕНО.** VK @nilov_catering = **ПЕРВИЧНЫЙ видимый эмбед** (всегда доступен в РФ, не пустой). Instagram @nilov_catering = **вторичная ссылка** (аудитория через VPN; эмбед НЕ грузится в РФ — показываем ссылку «Мы в Instagram → @nilov_catering», НЕ пустой блок). Fail-soft КЕПТ: если VK-API недоступен → последний закэшированный snapshot + кнопка-ссылка VK. Блок НИКОГДА не пустой.
> WhatsApp / Telegram — **первичные каналы связи** (см. `SiteHeader` / `StickyMobileCTA` / `SiteFooter`), НЕ только иконки в футере. Круглосуточный отклик.

**Примирение противоречия `04`«embed» vs `16`«real-time auto-update» + fail-soft IG:**
выбран **гибрид «локальный snapshot + серверный pull + лёгкий клиентский poll»** для VK-fallback,
и **embed с fail-soft** для Instagram (НЕ блокирующий LCP iframe; при ошибке/таймауте → fallback).

- **Instagram (secondary, опц. через VPN):**
  - Эмбед ленты (`@nilov_catering`) — iframe/carousel, **НЕ в первом вьюпорте** (LCP-безопасно, ниже фолда).
  - **Fail-soft:** по `onError` эмбеда / таймауту загрузки / `navigator.onLine` → прячем эмбед, показываем
    карточку-ссылку «Мы в Instagram → @nilov_catering» + **VK-ленту (`LiveVKFeed`, fallback-часть БЛОК 11)** как всегда-доступный fallback.
    Блок НИКОГДА не пустой.
- **VK (primary, всегда доступен в РФ):**
  - Сервер (Next.js Route Handler `/api/vk` + ISR/cron каждые 30–60 мин) тянет
    последние ~12 медиа через **VK API** (публичная страница/сообщество `@nilov_catering`,
    сервисный токен VK в `.env`) → пишет в локальный кэш-JSON.
  - Клиент рендерит из локального кэша (никакого iframe) → LCP-безопасно.
  - «Real-time ощущение»: клиент **поллит кэш каждые 5 мин** (SWR revalidate),
    подхватывает свежие посты без перезагрузки. Это НЕ живой embed, но даёт auto-update-эффект.
- **Фолбэк VK при недоступности API:** токен протух / rate-limit / приватная страница →
  показываем **последний закэшированный snapshot** + подпись «Обновлено: <дата>»
  + кнопка-ссылка на профиль VK. Блок НИКОГДА не пустой.
- **lazy-load / LCP:** в первом вьюпорте — 3–4 карточки (eager, blur-up placeholder,
  низкокачественный poster ≤10КБ → фейд к full WebP). Остальные ниже фолда — `loading="lazy"`.
- **a11y:** рендер как семантический `<ul>` из `<a>`+реальный `<img>` с описательным
  `alt` («Шоу-станция на свадьбе, июнь 2026»); `focus-visible` золотая обводка (`--color-ring` #8A6D3B, ≥3:1 по WCAG 1.4.11 / 2.4.7; НЕ чистый `--color-gold` #B08D57 = 2.893:1 FAIL);
  навигация с клавиатуры (Tab/Enter). Никакого `<iframe>` в VK-части → нет фокус-ловушек.
  У Instagram-эмбеда — `aria-label` + graceful fail-soft (см. выше).
- **SEO:** контент embed НЕ индексируется поисковиком → **дублируем капшены текстом**
  (видимый `<p>` под каждым фото) + JSON-LD `SocialMediaPosting`. Зеркалим caption в DOM.
- **Источник метаданных «тип события» для капшенов:** парсим хештеги
  (`#свадьба` `#корпоратив` `#частнаявечеринка` `#chefathome`) ИЛИ берём поле
  `eventType` из кэш-JSON (заполняется вручную при публикации поста в CMS). Тип → чип
  «Свадьба · 120 гостей» поверх карточки (как в GalleryMasonry).
- **Пропсы:** `igHandle` (по умолч. `@nilov_catering`), `igFallbackOnError: true`, `vkGroupId` (ID сообщества VK), `limit=12`, `pollIntervalMs=300000`, `fallbackProfileUrl` (VK), `waUrl`, `tgUrl`.
- **Responsive:** 2 колонки (mobile) / 3 (tablet) / 4 (desktop); на mobile — опц. scroll-snap по горизонтали.

---

### БЛОК 12 — CTASection  *(«Спланировать событие» + телефон + WhatsApp + Telegram)*

- **Tokens / типографика / spacing:** фон `--color-secondary` (#F2ECE3, единый SSOT из `06_TOKENS`/`01`) full-bleed;
  `SectionHeading` overline `text-2xs uppercase text-gold-text-on-secondary` (токен #6E5631 — 5.885:1 на secondary #F2ECE3 ≥ AA; обычный `text-gold-text` #8A6D3B на secondary даёт 4.13:1 < AA, см. A11Y B2) + заголовок `font-heading text-3xl`
  text-foreground`; вертикальный ритм `--section-y` (clamp 80→160px); контейнер
  `max-w-[--container-max]`, `px-[--container-pad]`.
- **Точный microcopy (куда жать):**
  - Primary (MagneticButton gold): **«Спланировать событие»** → `/plan`.
  - Secondary (ghost): **«+7 (812) 919-59-11»** (`href="tel:+78129195911"`).
  - Secondary (ghost): **«Написать в WhatsApp»** (`href="https://wa.me/79119417205"`).
  - **Ровно 1 primary CTA** (`16`#17 / `19B`#12) — НЕ 5 кнопок.
- **Увязка со `StickyMobileCTA`:** desktop — CTA живёт в секции; на mobile глобальная
  `StickyMobileCTA` (снизу экрана) дублирует ТОТ ЖЕ `href` («Спланировать / Позвонить») и
  видна всегда. В `CTASection` на mobile primary-кнопка НЕ дублирует sticky — она ведёт на
  тот же маршрут, но секция не создаёт вторую «прилипшую» кнопку (нет наложения).
- **Порядок:** в рендере — `#11 LiveInstagramFeed → #12 CTA → #13 FAQ`, т.е. CTA ПОСЛЕ
  value-prop (WhyUs/Testimonials) (`16`#17 «не сразу после Hero») — выполнено.
- **Motion:** `MagneticButton` gold (spring ±12px) + `Reveal` (translateY 24→0, `--dur-base`,
  `--ease-out-expo`); `prefers-reduced-motion` → без magnetic/translate, мгновенно.
- **Пропсы:** `heading`, `primaryHref`, `phone`, `whatsapp`, `variant: 'section'|'mobile'`.
- **LCP/INP/CLS:** текстовая секция, LCP-безопасно; magnetic не блокирует paint;
  CLS=0 (фикс. высота кнопок).
- **a11y:** кнопки — реальные `<a>`/`Button` с видимым текстом (НЕ иконка-only);
  `focus-visible` 2px gold (`--color-ring`); контраст текста на secondary ≥ WCAG AA.
- **Responsive:** desktop — заголовок + ряд из 3 кнопок (primary слева, вторичные справа);
  mobile — стек: primary на всю ширину, вторичные под ней.

---

### БЛОК 13 — FAQTeaser  *(3–4 реальных Q&A, аккордеон → /faq)*

**Реальный копирайт (пишем прямо в блок, `19B`#13: «контент отсутствует»):**

1. **Сколько стоит кейтеринг?** — «От 2 450 ₽/гость (фуршет «Эконом») до 6 970 ₽/гость
   (банкет «Максимальный» — верхний тариф). Кофе-брейк — от 950 ₽/гость 🟡 *(pending-verification — на живом сайте 390 ₽; точная цена подтверждается перед релизом)*. Цена за гостя фиксирована, без скрытых
   доплат, доставка в пределах КАД включена. Точный расчёт — в калькуляторе за 10 секунд.»
2. **За какой срок вы организуете событие?** — «Стандартный заказ — за 48–72 часа.
   Индивидуальное меню — 72–96 часов. Срочный — от 24 часов (+30% к стоимости).
   Декабрь — высокий сезон, бронируйте заранее.»
3. **Учитываете аллергии и диету?** — «Да. Каждое блюдо маркировано по 14 аллергенам
   (ТР ТС 021/2011). Доступны веган, вегетарианское, без глютена; халяль и кошер — по
   запросу при наличии сертификации. Укажите аллергии в заявке — шеф адаптирует меню.»
4. **Можно попробовать меню до события?** — «Да, дегустация включена при заказе
   индивидуального меню от 50 000 ₽. Для готовых тарифов менеджер подберёт похожий сет
   для пробы по запросу.»
5. **[Волна 5–6, закрывает G6 (Григорий, B-GRIG-6)] Какой формат мне подходит?** — «Не знаете термины — не страшно.
   Ориентируйтесь по гостям: **10–19 человек** → кофе-брейк или домашнее меню (едят сидя, легко);
   **20–49** → фуршет (лёгкие закуски, гости ходят свободно); **50 и больше** → банкет (посадка за стол,
   официанты). Точный подбор за 3 вопроса — [помощник «подберём меню»](/plan/helper).»
   > Ссылка на `/plan/helper` (G1 wizard) выносится НЕ только в футер: якорь «Какой формат выбрать?»
   > дублируется в **Hero** (G7, вторичная CTA) и на хабе `/plan`. Закрывает «нет гида по выбору».

- **Аккордеон (a11y, `19B`#13):** каждый вопрос = `<button aria-expanded aria-controls="aN">`;
  панель `id="aN" role="region"`. Управление фокусом: при открытии фокус → в панель,
  при закрытии → обратно на кнопку. Клавиатура: Enter/Space переключают, Tab ходит по
  вопросам. `prefers-reduced-motion` → раскрытие мгновенное (без Framer-layout анимации).
- **Связь с FAQPage JSON-LD (блок 30):** те же 4 Q&A дублируются в `SchemaBlock`
  (`@type: FAQPage`) с `name`/`text`; якоря `#faq-1…4` совпадают с id аккордеона.
- **Пропсы:** `items: {q, a, anchor}[]` (≤4), `moreHref="/faq"`.
- **LCP/INP/CLS:** текст + lightweight accordion, LCP-безопасно; анимация высоты через
  `Framer layout` (transform, не reflow) → CLS≈0.
- **Responsive:** 1 колонка везде; на desktop макс. ширина текста ~720px для читаемости.

---

### БЛОК 14 — EventHero  *(заголовок страницы события)*

**Примирение противоречия `04`«фоновое фото» vs `16`«фото ИМЕННО типа»:**
зафиксирован **явный маппинг тип-события → конкретный hero-ассет** (`19B`#14:
«одно фото на все страницы = ❌»). Hero каждой страницы `/events/*` = своё фото
из сета «Event Atmosphere по типу» (`17_MEDIA_DIRECTION` тип 3).

- **Маппинг (тип → hero-ассет):**
  | Тип события | Hero-ассет (`/public/demo/`) | Что на фото |
  |---|---|---|
  | Свадьба (`/events/svadba`) | `hero-svadba.webp` | сервировка свадебного банкета, цветы, негатив-спейс |
  | Корпоратив (`/events/korporativ`) | `hero-korporativ.webp` | конференц-фуршет, логотипы клиентов в кадре |
  | Частное (`/events/chastnoe`) | `hero-chastnoe.webp` | домашняя вечеринка, интимная сервировка |
  | Chef-at-home (`/events/chef-at-home`) | `hero-chef.webp` | шеф на кухне клиента, су-вид, процесс |
- **Перечень hero:** 4 ассета выше (по числу карточек `EventTypeSelector`, `04`#4).
- **preload / poster (LCP):** `<link rel="preload" as="image" href="hero-<type>.webp">`;
  мгновенный blurred poster (LQIP ≤8КБ) → фейд к full WebP/AVIF (≤120КБ). Hero = LCP-элемент,
  но paint не блокируется тяжёлым видео.
- **entrance clip-path wipe:** overline + H1 проявляются через `clip-path: inset(0 100% 0 0)`
  → `inset(0)`, per-word stagger 60ms, `--wipe-dur` (`16`#30 / `18` §6). НЕ просто fade.
- **alt / focus / reduced-motion:** hero — декоративный фон → `role="img"` +
  `aria-label="Свадебный банкет NiloV Catering, Санкт-Петербург"`; порядок фокуса начинается
  с H1 (фон вне tab-order). `prefers-reduced-motion` → wipe выключен, показ мгновенный.
- **Подстрочник (контекст):** «Свадьба на 120 гостей — от 4 350 ₽/гость»
(цена — канон из `NILOV_UNIFIED_MENU`: фуршет Расширенный 4350 — публичный лейбл, внутренний `premium`).
> **[Волна 5–6, закрывает A5 (Али, B-ALI-5)]** На `/events/korporativ` и `/events/chastnoe` (и `/events/svadba`)
> под hero / в блоке EventHero добавляется микро-упоминание: «**Возможен халяль-формат по запросу** —
> [узнать про сертификат](/certificates#halal)». Халяль заявлен на событийных посадочных (где он востребован),
> а не только в каталоге. Связь с A1/A2 — единый честный ответ «как заказать халяль».
- **Пропсы:** `eventType`, `title`, `subtitle`, `heroSrc`, `ctaHref="/plan/calculator"`.
- **VIDEO-RECAP вариант (Волна 3А, `17` §8 п.2):** hero может нести **video-recap вместо/поверх фото** —
  ротация по типу события из архива заказчика (Свадьба → своё свадебное recap-видео, Корпоратив → своё
  корпоративное). Расширенные пропсы: `heroVideo?: VideoRef` (`provider:'rutube'|'selfhost'`, default=`rutube`), `heroVariant: 'photo'|'video-recap'`.
  Механизм = facade (poster+play-btn, `VideoProvider`-эмбед по клику / muted-autoplay при `!prefers-reduced-motion`), НЕ
  self-host MP4 (LCP, см. БЛОК 27). `prefers-reduced-motion` → показ только poster. Персонализация входа под сегмент:
  клиент на `/events/svadba` сразу видит живое свадебное событие. Единый источник — `VideoProvider` (БЛОК 27 `EventsRecap`).
- **Responsive:** фон `object-fit: cover` на все брейкпоинты; на mobile H1 `clamp(2.5rem, 5vw, 4.5rem)` (ЕДИНЫЙ `--text-h1` из `06_TOKENS`, max 72px — тот же, что Home Hero, C7),
  подстрочник — под H1; высота hero `clamp(60vh→88vh)`.

---

### БЛОК 15 — PackageGrid  *(тарифы-карточки сравнения)*

- **Recommended-тариф (закрыть вилку `16`«Стандарт/Расширенный»):** выбран **СТАНДАРТ**
  (в меню — «Оптимальный выбор для большинства мероприятий»). Золотая рамка (`border-gold-text` #8A6D3B, синхрон с `04:1657`)
  (`--color-gold-text` 2px, НЕ чистый `--color-gold` #B08D57 — на secondary 2.632:1 < 3:1; gold-text #8A6D3B = 4.129:1 ≥3:1 по WCAG 1.4.11) + бейдж «Популярный» (`bg-gold-tint` + `text-gold-text-on-secondary` #6E5631 = 5.582:1 на gold-tint #EFE6D6 ≥ AA-small (на secondary #F2ECE3 = 5.885:1 ✅ AA); НЕ `text-earth` #7C6A55 на `bg-gold-tint` #EFE6D6 = 4.19:1 borderline, заменён на гарантированный токен).
  **[Волна 2, закрывает B-MAX-2/М6] ЭКОНОМ — рекомендуемый для бюджетных сценариев:** на `/events/vypusknoy`
  и в бюджетном пресете карточка **Эконом** несёт первичный бейдж «Отличный выбор для бюджета и студенческих
  событий — честное меню без переплаты за вывеску» (B-MAX-9, снимает ложный стыд) и ставится `recommendedTierId='economy'`
  при бюджетном фильтре. На `/plan/calculator` при `event=vypusknoy`/`korporativ`+бюджет → Эконом по умолчанию.
- **Цены (канон из `07` / `NILOV_UNIFIED_MENU`, ₽/гость; ЕДИНАЯ 4-ступенчатая модель
  `economy|standard|premium|luxury` → **ПУБЛИЧНЫЕ лейблы «Эконом / Стандарт / Расширенный / Максимальный» для ВСЕХ форматов (T3: «Люкс» НЕ в публичном заголовке, только внутренний пресет `luxury`)**:**
  Фуршет: Эконом 2 450 · Стандарт 3 450 · Расширенный 4 350 · Максимальный 5 350.
  Банкет: Эконом 4 470 · Стандарт 5 470 · Расширенный 5 970 · Максимальный 6 970.
  Кофе-брейк: Эконом 950 · Стандарт 1 450 · Расширенный 1 950 · Максимальный 2 450.
  *(внутренний `tier` сохраняет `economy|standard|premium|luxury`, но ПУБЛИЧНО «Люкс» НЕ показывается —
  `luxury` отображается как «Максимальный», `premium` — как «Расширенный»; единый канон T3/M7 во ВСЕХ файлах)*
- **Чек-лист включённого (ФУРШЕТ, по выходу из меню):**
  - **Эконом** — 5 холодных канапе + 3 горячих (мини-бургер, якитори, овощи гриль) + напитки;
    выход ≈355 г + 250 мл; стандартное оформление.
  - **Стандарт ★** — 7 канапе + салат «Цезарь» + 4 горячих (бургер, якитори, профитроль, овощи гриль)
    + брауни + напитки; ≈520 г + 250 мл; стильное оформление.
  - **Расширенный** — 9 канапе + 2 салата + 5 горячих + 2 десерта + 4 напитка; ≈770 г + 300 мл;
 ярусная подача.
  - **Максимальный** — 12 канапе + 2 салата + 7 горячих + 3 десерта + 5 напитков + шоу-станция;
    ≈1230 г + 400 мл; праздничное оформление, шеф на площадке.
  (Для банкета/кофе-брейка чек-листы — по тому же шаблону из `NILOV_UNIFIED_MENU`.)
- **a11y (НЕ только цветом, `19B`#15):** «recommended» обозначен И бейджем-текстом,
  И `aria-label="Рекомендуемый тариф"`, И золотой рамкой (`border-gold-text` #8A6D3B, ≥3:1 по 1.4.11) — не только цветом (WCAG 1.4.1).
  Карточки — `<article>` с `<h3>`; чек-лист — `<ul>`; `focus-visible` на CTA каждой.
- **LCP / reduced-motion:** контент карточек — текст (LCP-безопасно); фото тарифа `lazy`;
  hover-lift через `transform` (НЕ reflow) → CLS≈0; `prefers-reduced-motion` → без lift/scale.
- **Пропсы:** `format: 'furshet'|'banket'|'kofe'`, `tiers[]` (из меню), `recommendedTierId`.
- **[Волна 2, закрывает B-TAT-2] Инструмент сравнения «Банкет vs Фуршет» (FormatCompare):** блок достижим
  из `/events/korporativ` и `/menu` — таблица в две колонки **рядом** (НЕ два захода). Рендерится внутри
  `PackageGrid` (или как отдельный `FormatCompare`-блок на `/events/korporativ`):
  | Параметр | Фуршет | Банкет |
  |---|---|---|
  | Формат | Стоячий приём, закуски на станциях | Посадка, официанты, классика |
  | Посадка | НЕ нужна (стоячие/высокие столы) | Рассадка гостей, сервировка |
  | Официанты | Минимум | Полная сервировка |
  | Цена/гость (Эконом) | **от 2 450 ₽** | от 4 470 ₽ |
  | Вау-опции | Шоу-станция, граzing-стол | Торт, фонтан, шеф на площадке |
  | Для 200 гостей | ✅ идеален (стоячий) | ✅ классика, дороже |
  | **Для 120 гостей** | ✅ отлично (стоячий приём) | ✅ **рекомендуем** (посадка 50+; юбилей компании 120 чел = классика за столом) |
  **Переключатель формата (toggle):** на `/events/korporativ` `PackageGrid` несёт `formatToggle` Банкет⇄Фуршет —
  мгновенное сравнение цен/включённого **на той же странице** без открытия второго роута. Кнопка `Рассчитать 200 гостей`
  ведёт в `/plan/calculator?event=korporativ&guests=200&format=furshet&tier=economy` (B-TAT-5).
- **[Волна 2, закрывает B-MAX-7] Бейдж «Экономия vs верхний тариф» — база исправлена:** `savings` в `calcTotal`/`liveSummary`
  считается от РЕАЛЬНОГО верха формата (для фуршета `luxury` = **5 350**, для банкета = **6 970**), а НЕ от
  устаревшей константы 6 500. Бейдж «Вы экономите X» теперь ДОСТОВЕРЕН (см. `07` §calcTotal, `21_LOGIC_AUDIT`).
- **Responsive:** desktop — 4 колонки (`grid`); tablet — 2; mobile — 1 (recommended «прилипает»
  сверху списка или выделен).

---

### БЛОК 16 — MenuCatalog  *(фильтр + каталог блюд)*

- **Поведение фильтра (`19B`#16 — «не специфицировано»):**
  - **Категории (базовые):** канапе / салаты / горячее / десерты / напитки.
  - **ТРЕНД-КАТЕГОРИИ 2026 (MenuCritic `24` B2 — явные блоки меню, НЕ только форматы):**
    кнопки-фильтры второго уровня, ведут на подборки из `23_MENU_STRATEGY` §1:
    `Global small plates` (бао/тако/поке) · `Plant-based mains` (vegan+GF) ·
    `Interactive stations` · `Grazing table` · `Dessert stations & mini-shooters` ·
    `Signature drinks / mocktails`. Без них каталог «как у всех» = не «самое популярное 2026».
  - **Теги (множ. выбор):** хит · вег · авторский · лето · гриль · ЗОЖ · дети · **сезон** · **новинка**.
  - **Фильтр по диете (счётные блюда, MenuCritic `24` B5 — НЕ пустышки):** чипы `vegan` / `vegetarian` / `gluten-free` /
    `halal` / `детское` ведут на реальные подборки с N блюд из `23` §3:
    веган ≥9 · вегетарианское ≥9 · БГ ≥11 · детское ≥9 · халяль ≥6 (см. `23` §3.1 статус).
    - **[Волна 5–6, закрывает L4 (Лиза, B-LIZA-4)]** Чип-бар диеты — **ВСЕГДА видимый горизонтальный ряд сверху `/menu/catalog`** (НЕ свёрнут в выпадающее меню/аккордеон). `vegan` — **первым слева**; далее `gluten-free` / `halal` / `vegetarian` / `детское`. Каждый чип — `aria-pressed` toggle, крупная тач-цель (≥44px, scroll-snap на mobile, как у остального фильтр-бара БЛОК 16). Состояние — SSR-через `?diet=vegan` (шарится/сохраняется, как у `cat`/`tag`).
    - **[Волна 5–6, закрывает L6 (Лиза, B-LIZA-6)]** На форматных страницах `/menu/furshet`, `/menu/banquet`, `/menu/coffee-break` (и `/menu/detskoe`) поверх каталога — **переключатель «Только веган» (quick-filter по `dietBadges:['vegan']`)**: крупный чип/тоггл, один тап скрывает мясные и оставляет только веган-линию (без ухода в `/menu/catalog`). Состояние `?vegan=1` (SSR). Закрывает «Лиза листает мясо» на форматном просмотре.
  - **Empty-state:** при 0 результатов — «По фильтру ничего не нашлось» + кнопка **«Показать все»**
    (сброс фильтра). НЕ пустая сетка.
  - **Счётчик:** «Показано 24 из 78 блюд» (живой, обновляется при фильтрации; всего каталог ≈78 SKU по `23` §10).
  - **Режим «показать всё, пометив глютен-содержащие» (B-NINA-7):** фильтр `gluten-free` получает **второй режим** (toggle рядом с обычным «только БГ»): `?diet=gluten-free&mode=mark` — показывает **весь каталог (78 блюд)**, но НЕ-GF позиции визуально **помечаются** глифом «🌾 содержит глютен» (см. DishCard B-NINA-2/8), а БГ — бейджом «Без глютена». Так Нина видит меню целиком с пометками, а не только узкую БГ-подборку (её частый сценарий). Состояние SSR-через `?diet=gluten-free&mode=mark`. Обычный чип «gluten-free» (скрывает НЕ-GF) остаётся по умолчанию для быстрого отсева.
  - **URL-state:** `?cat=gorachyache&tag=hit` через Next router → фильтр шарится/сохраняется
    (кнопка «поделиться подборкой»).
- **СЕЗОННАЯ РОТАЦИЯ 20% (MenuCritic `24` B7, синхрон с `SeasonalModule`):** каждое блюдо
  несёт `season?: Season[]` (из `23` §4). Активный сезон (по `seasonalConfig`, RU tz) поднимает
  сезонные позиции в топ каталога + ставит тег `сезон`; ~20% ассортимента ротируется по
  лето/осень/зима/весна. Стабильное ядро (80%) всегда в наличии.
- **Дата-модель блюда** (источник — `NILOV_UNIFIED_MENU.md`, канон + расширение под `23`/`25`):
  ```ts
  // 14 аллергенов ТР ТС 021/2011 (единый порядок, канон):
  type Allergen = 'gluten'|'crustaceans'|'fish'|'peanuts'|'soy'|'milk'|'nuts'
    |'celery'|'mustard'|'sesame'|'sulphites'|'lupin'|'molluscs'|'eggs';
  type DietBadge = 'vegan'|'vegetarian'|'gluten-free'|'halal'|'kids';
  type HalalStatus = 'certified'|'on-request'|'none';
  type Season = 'summer'|'autumn'|'winter'|'spring';
  type Dish = {
    id: string; name: string; description: string;
    weight: string; price: number;          // ₽, поштучно; цены из 23 помечены pending-verification
    category: 'kanape'|'salat'|'gorachyache'|'desert'|'napkitki'
      |'global-small-plates'|'plant-based'|'grazing'|'dessert-stations'|'signature-drinks'; // +тренд-категории B2
    tags: string[];                          // хит/вег/авторский/лето/гриль/ЗОЖ/дети/сезон/новинка
    allergens: Allergen[];                  // ОБЯЗАТЕЛЬНОЕ поле: 14 по ТР ТС 021/2011 (B6). Пустой массив допустим, НЕ отсутствие поля.
    crossContact: boolean;                  // перекрёстная контаминация на кухне (флаг `*` на DishCard, B6)
    dietBadges: DietBadge[];                // B5/B11: видимые бейджи диеты (vegan/vegetarian/gluten-free/halal/kids) — НЕ только аллергены
    halalStatus: HalalStatus;               // B4: 'certified' только при подтверждённом сертификате; иначе 'on-request'/'none'. НЕ обещаем без оснований.
    season?: Season[];                      // B7: сезонная ротация 20% (синхрон с SeasonalModule)
    kcal: number; protein: number; fat: number; carbs: number; // КБЖУ
    origin: string;                         // per-dish, напр. «фермеры ЛО» / «импорт»
    image: string; hoverVideo?: string;     // video только для хитов (см. блок 17)
  }
  ```
  14 аллергенов: глютен, ракообразные, рыба, арахис, соя, молоко, орехи, сельдерей,
  горчица, кунжут, сульфиты, люпин, моллюски, яйца. КАЖДОЕ блюдо несёт теги (MenuCritic `24` B6);
  `crossContact: true` → на DishCard добавляется чип «⚠ перекрёстная контаминация».
- **aria/keyboard/role (`19B`#16):** фильтр-кнопки — `aria-pressed` (toggle), `role="group"`
  с `aria-label`; навигация Tab/Arrow; чип «сброс» — отдельная кнопка.
- **lazy / preload:** первая строка `eager` (preload LCP-картинок), остальное `loading="lazy"`.
- **hover-detail:** при наведении/фокусе карточки раскрываются КБЖУ + чипы 14 аллергенов
  (НЕ только ховер-картинка — и клавиатурный фокус тоже раскрывает, a11y).
- **Пропсы:** `dishes: Dish[]`, `categories`, `tags`, `initialQuery`.
- **Responsive:** desktop — `grid` 3–4 кол.; tablet 2; mobile 1–2; фильтр-бар — горизонт.
  scroll-snap на mobile.

---

### БЛОК 17 — DishCard  *(фото + цена + 14 аллергенов + КБЖУ)*

**Примирение противоречия `04`«hover zoom» vs `16`«5с видео»:**
**РЕКОМЕНДУЕМЫЙ механизм = Ken Burns zoom на hover (CSS, БЕЗ видео) + опциональное
короткое видео ПО КЛИКУ (инициирует пользователь, НЕ autoplay на hover).**
Это снимает оба bug `19B`#17: (а) не нужно 100+ видео на все блюда, (б) нет autoplay
без контроля (a11y/reduced-motion).

- **Hover (по умолчанию):** `transform: scale(1.0→1.08)` за 6s `--ease-out-expo`
  (Ken Burns, «живое фото»), НЕ простой zoom и НЕ видео. Без бандла/битрейта.
- **Видео ПО КЛИКУ (только для кураторской подборки ~20–30 «хит»-блюд):**
  по клику на иконку ▶ открывается loop-видео приготовления (muted, seamless, <2МБ).
  Это и есть «ingredient storytelling» (`16`#3 / pxlpeak 2026) — но по инициативе
  пользователя, не на hover.
- **Pipeline ассетов (видео НЕ на 100+ блюд):** видео генерим ТОЛЬКО для `tags: 'хит'`
  (≈20–30 позиций) из `/public/demo/` (Coverr / Mixkit loop, H.264/MP4, muted, seamless,
  <2МБ по `17_MEDIA_DIRECTION` §3). Остальные 60+ блюд — Ken Burns стилл. Управляемо.
- **Дата-модель (КБЖУ + 14 аллергенов + origin PER-DISH, НЕ захардкожено, `19B`#17):**
  структура `Dish` из блока 16. `origin` — per-dish (напр. «фермеры ЛО» для локальных
  овощей/мяса, «импорт» для тигровой креветки), берётся из `NILOV_UNIFIED_MENU`,
  НЕ одинаков для всех.
- **ДИЕТ-БЕЙДЖИ НА КАРТОЧКЕ (B5/B11 + `25` B-MUX-4 — раньше НЕ прописаны):** DishCard
  ПРИОРИТЕТНО показывает видимые бейджи `dietBadges` (`vegan` / `vegetarian` / `gluten-free` / `halal` /
  `kids`) — диет-клиент видит их сразу, НЕ только 14 аллергенов. Бейдж халяля НЕ обещает
  сертификацию: рендер по `halalStatus` (`23` §3.1 / B4):
  - `halalStatus:'certified'` → зелёный бейдж «✓ Халяль» (только при подтверждённом сертификате);
  - `halalStatus:'on-request'` → нейтральный бейдж «Халяль по запросу» (честно, не «сертифицировано»);
    **[Волна 5–6, закрывает A3 (Али, B-ALI-3)]** бейдж `on-request` **НЕ висячий** — он несёт ссылку/CTA
    «узнать про сертификат →» ведущую на честный блок `/certificates#halal` (А2). Рендер: бейдж = `<a href="/certificates#halal" aria-label="Халяль по запросу — узнать про сертификат">`,
    чтобы Али не застревал с нейтральным ярлыком без ответа.
  - `halalStatus:'none'` → бейдж не рендерится.
- **14 АЛЛЕРГЕНОВ PER-DISH (B6):** чипы `allergens` (из набора 14 ТР ТС 021/2011) + при
  `crossContact:true` — доп. чип «⚠ перекрёстная контаминация». Раскрываются на hover/фокус
  (см. ниже hover-detail) И доступны клавиатурно (a11y).
  > **[Волна 5–6, закрывает L7 (Лиза, B-LIZA-7, a11y)]** `dietBadges` на `DishCard` — **НЕ только цвет**:
  - бейдж веган (и все diet-бейджи) несёт явный **`aria-label`** (напр. `aria-label="Диета: веган"`),
    текст бейджа = понятное слово («Веган» / «Без глютена» / «Халяль по запросу»), НЕ только иконка.
  - **Контраст AA (≥4.5:1):** цвет фона/текста бейджа веган подобран НЕ по принципу «просто зелёный»,
    а по токенам ДНК с проверкой контраста (текст `ink`/`earth` на `success-tint`/`sage-tint` фоне ≥4.5:1).
    Для цветослепых бейдж НЕ различается только оттенком — добавляется **форма/иконка + текст** (иконка листа у вегана,
    колоса у БГ, полумесяца у халяля). Тест: прогон через axe + проверка контраста на `06_TOKENS` палитре.
  > **⚠️ R1 (`25_MENUCRITIC_FINAL`, БЛОКИРУЮЩИЙ):** поля заданы, но **значения 14 аллергенов — `pending`** (не заполнены ни для одного из 78 блюд). **НЕ выдумывать** — заполнить из карточек блюд заказчика до прода (`23` §0).
  > **[Волна 4, закрывает S3/S4/S5 (Света, B-SVETA-3/4/5)]** Аллергены/диета для мамы-аллергика (Света) переносятся из «hover-only» в **всегда-видимую зону** карточки `DishCard` (особенно на детском/детских блюдах):
  > - **S5 — ВИДИМЫ ВСЕГДА:** 14 чипов `allergens` + `dietBadges` (`gluten-free` и пр.) рендерятся **под фото карточки, не только на hover/focus** (Света с коляской НЕ тыкает каждую карточку на тач). На mobile — статичные чипы, `tap-to-expand` только для деталей КБЖУ.
  > - **S3 — crossContact красным наверху:** когда `crossContact:true` — **красное предупреждение** «🔴 На кухне возможен контакт с глютеном / аллергенами» выносится ВВЕРХ карточки (над фото / под заголовком), НЕ прячется в тонкий серый чип. Для младенца-аллергика это критично.
  > - **S4 — plain-language вердикт (язык мамы):** рядом с чипами — понятный вердикт по блюду: **«✅ Подходит при аллергии на глютен»** (нет в `allergens` и `crossContact:false`) ИЛИ **«❌ Содержит глютен — не для ребёнка-аллергика»** (есть в `allergens`). Без сухих ГОСТ-названий ТР ТС как единственного объяснения. Технические названия 14 аллергенов остаются чипами, НО вердикт — первичен для родителя.
  > - Тач-цели фильтра/чипов — **крупные (≥44px)**, удобно одной рукой с коляской (см. моб-контракт B12).
- **ГЛЮТЕН-СТАТУС ВСЕГДА НА ЛИЦЕ КАРТОЧКИ (B-NINA-2 / B-NINA-8, симметрия вердикта):** для сканирования взглядом Нины глютен-вердикт виден **без hover/tap**, одинаково заметно для обоих состояний:
  - **БГ-блюдо (`dietBadges` содержит `gluten-free` ИЛИ `allergens` НЕ содержит `gluten` при `crossContact:false`):** зелёный бейдж **«🌾 Без глютена»** (иконка колоса + текст, AA-контраст, см. L7) — приоритетно, на первой строке лица карточки, НАД фото/под заголовком.
  - **НЕ-GF блюдо (`allergens` содержит `gluten` ИЛИ `crossContact:true` по глютену):** явный **красно-янтарный глиф «🌾 содержит глютен»** — **НЕ только отсутствие бейджа GF** (старое поведение было неочевидным). Глиф по площади/контрасту/вертикали **равен** бейджу «Без глютена» (симметрия, B-NINA-8: «содержит» НЕ спрятан, а бейдж НЕ приоритетнее). Рендер: `<span role="img" aria-label="Содержит глютен" class="allergen-flag gluten-contains">🌾 содержит глютен</span>`.
  - Оба индикатора — **всегда-видимая зона** (не hover/focus), крупные тач-цели ≥44px (см. S5/B12). Для НЕ-GF вердикт повторяется в plain-language строке S4 («❌ Содержит глютен»).
- **КБЖУ НА ЛИЦЕ КАРТОЧКИ (B-NINA-2):** кратко на лице — **«🔥 {kcal} ккал · {protein} г белка»** (2 ключевых показателя Нины) под фото/вердиктом, без раскрытия. Полное КБЖУ (`kcal`/`protein`/`fat`/`carbs` + `weight`) — по `tap-to-expand` / раскрытию (на desktop — в hover-detail, см. БЛОК 16). 78 карточек × tap только ради краткого КБЖУ НЕ требуется — ключевые цифры видны сразу.
- **СЕЗОННЫЙ ТЕГ (B7):** если `season` содержит активный сезон (по `seasonalConfig`) —
  на карточке чип «🍂 сезон» / «☀ лето» и приоритет в сетке `MenuCatalog`.
- **a11y (`19B`#17 — autoplay-ловушка):** НИКАКОГО autoplay-видео без контроля.
  Видео по клику имеет `controls` + пауза; `prefers-reduced-motion` → Ken Burns ВЫКЛ
  (статичное фото), видео не проигрывается автоматически; фокус-ловушка карточки отсутствует
  (Tab проходит насквозь).
- **Perf:** hover-video НЕ прелоадится (грузится по клику); poster `lazy`; LCP-безопасно.
- **Пропсы:** `dish: Dish` (вся модель выше), `onAddToCart?`.
- **Responsive:** карточка — `aspect-ratio` box (CLS=0); mobile — 1–2 в ряд; hover-detail
  на mobile заменён на tap-to-expand.

---

### БЛОК 17-бис — AllergenLegend  *(легенда 14 аллергенов ТР ТС 021/2011, B-NINA-5)*

**Назначение:** неспециалист (Нина) НЕ понимает аббревиатуры чипов «gluten / milk / sulphites».
Легенда расшифровывает КАЖДЫЙ из 14 чипов plain-языком + показывает, что означает глиф «🌾 содержит глютен».

- **Точки входа (обе обязательны):**
  1. **Страница `/allergens`** (роут добавлен в `02_IA.md`) — полная легенда + дисклеймер ТР ТС 021/2011 + ссылка «Открыть каталог → `/menu/catalog`».
  2. **Модалка-дубликат** прямо в `/menu/catalog` — кнопка/ссылка **«❔ Что значат чипы аллергенов»** (рядом с чип-баром диеты L4, крупная тач-цель ≥44px) открывает ту же легенду в `<dialog aria-modal>` без ухода со страницы. Закрывает «разрыв — аббревиатуры непрозрачны».
- **Содержимое легенды (14 позиций ТР ТС 021/2011, порядок как в `23` §0):**
  глютен (🌾 зерновые: пшеница/рожь/ячмень/овёс) · ракообразные · рыба · арахис · соя · молоко ·
  орехи (миндаль/фундук/кешью и др.) · сельдерей · горчица · кунжут · сульфиты (консерванты в вине/сухофруктах) ·
  люпин · моллюски · яйца. Для **глютена** — отдельный акцент: что скрывается под «🌾 содержит глютен» на карточке (соусы/панировка/выпечка), и что значит бейдж «Без глютена» (прошёл проверку, crossContact тоже учтён).
- **Пропсы:** `allergens: Allergen[]` (набор 14 из `23` §0), `onClose?`, `asModal?: boolean`.
- **a11y:** модалка — `role="dialog" aria-modal="true"`, focus-trap, Esc-закрытие, возврат фокуса на триггер; каждая позиция — `<li>` с `aria-label` понятным текстом (НЕ только ГОСТ-аббревиатура).
- **Связь с `23` §0:** легенда — клиентский слой расшифровки тех же 14 значений `allergens[]`; данные тянутся из того же контракта (bulk-импорт, pending-verification по S1/R1).
- **Responsive:** mobile — модалка на весь экран (bottom-sheet), список скроллится; desktop — центрированное окно.


---

### БЛОК 18 — ShowCookingGrid  *(интерактивные станции)*

- **ЗАКРЫТЫЙ список станций (ровно 6, из `NILOV_UNIFIED_MENU` — «…» раскрыт):**
  1. Телятина на вулканическом камне
  2. Запечённый целиком мурманский лосось
  3. Тако «Знойная Мексика»
  4. Ризотто с белыми грибами в колесе пармезана
  5. Строганина из северных рыб
  6. Раклет-бар
- **Цены станций (РЕАЛЬНЫЕ цифры, ₽, из меню):**
  | Станция | Цена/порция | Стоимость станции |
  |---|---|---|
  | Телятина на камне | 605 ₽ (100 г) | от 62 500 ₽ (от 100 порций) |
  | Лосось целиком | 605 ₽ (115 г) | от 72 500 ₽ (от 100 порций) |
  | Тако «Знойная Мексика» | 339 ₽ (60 г) | от 48 500 ₽ (от 75 порций) |
  | Ризотто в пармезане | 605 ₽ (100 г) | от 64 500 ₽ (от 75 порций) |
  | Строганина из северных рыб | 484 ₽ (60 г) | от 56 500 ₽ (от 100 порций) |
  | Раклет-бар | индивид. расчёт | от 40 000 ₽ |
- **Поведение «добавить в меню» (`19B`#18):** кнопка пишет станцию в общий стор
  выбора (Zustand, тот же, что у `Calculator`/`Constructor`) → toast «Станция добавлена»
  (`aria-live="polite"`); состояние сохраняется в `sessionStorage`. Вторая CTA —
  «Рассчитать с этой станцией» → `/plan/calculator?station=<id>` (предвыбор станции).
- **photo-alive (ЕДИНЫЙ контракт, как у всех карточек — блок 5):** база = **Ken Burns** на hover + parallax.
  Управляемый **опц. click-video** (по клику на ▶, как у `DishCard` «хитов») — `/public/demo/` (Coverr/Mixkit,
  <2МБ, muted, seamless) ТОЛЬКО на 6 карточках станций. НЕ hover-mini-video, НЕ autoplay. `prefers-reduced-motion`
  → статичное фото, видео не проигрывается.
- **VIDEO ИЗ РЕАЛЬНОГО АРХИВА (Волна 3А, `17` §8 п.5):** click-video станции = клип действия ИЗ **реального
  события** заказчика (станция шипит/тянется НА ПЛОЩАДКЕ, гости вокруг), а НЕ постановочный студийный loop —
  «живая еда» из реальности, не студии. Источник — `VideoProvider` (Rutube/self-host, БЛОК 27 `EventsRecap`), эмбед-facade
  (poster+play-btn, iframe по клику), НЕ тяжёлый self-host (LCP). Единый светлый цветокор (`17` §5).
- **a11y / perf:** реальные `<button>` (НЕ div); toast с `aria-live`; видео lazy, без autoplay;
  `focus-visible` gold.
- **Пропсы:** `stations: Station[]` (из меню), `onAdd`, `calculatorHref`.
- **Responsive:** desktop — `grid` 3 кол.; tablet 2; mobile 1–2; карточка станции —
  фото-в-действии (повар нарезает) + цена + 2 CTA.

---

### БЛОК 19 — GalleryMasonry  *(parallax-галерея, фильтр, lightbox)*

- **reduced-motion (`19B`#19 — не обработан):** под `prefers-reduced-motion` parallax
  и Ken Burns ВЫКЛЮЧЕНЫ → статичная masonry-сетка (transform/opacity-анимации off).
- **lightbox a11y (`19B`#19):** `role="dialog" aria-modal="true"`; **focus-trap**
  (фокус заперт внутри), **Esc** — закрыть, **←/→** — навигация между фото,
  возврат фокуса на триггер после закрытия; `aria-label` у каждого снимка.
- **Таксономия ассетов «по типу события» + тегирование:** каждое фото несёт
  `eventType` (свадьба/корпоратив/частное/chef-at-home) + `season` + **`mood`** (яркое/камерное/ретро/минимализм/для-сторис — см. K4, волна 3); фильтр-чипы
  по типу И по настроению (как в `MenuCatalog`; `?mood=...` SSR-фильтрация). Капшен = смысл («Свадьба · 120 гостей»), не декорация.
  Камерные кейсы (15–30 гостей: девичник/день рождения) обязательно присутствуют (K5).
- **VIDEO-ITEMS 20–30% (Волна 3А, `17` §8 п.6):** **20–30% плиток галереи = video-кадры события** из архива
  заказчика (галерея «дышит», не статична). Video-плитка: **play on click** (НЕ autoplay) — открывает клип в lightbox/модалке. **Parallax на video-плитке ЗАПРЕЩЁН** (только на единственном hero-strip, `17` §8 п.6; per-image parallax = CLS/CLP-ловушка). Модель: `type: 'photo'|'video'`, у video — `VideoRef` (тип `VideoProvider`, default=`rutube`).
  Источник — `VideoProvider` (Rutube/self-host), facade-эмбед (poster+play-btn, iframe по клику), НЕ self-host (LCP).
  `prefers-reduced-motion` → parallax off + video НЕ проигрывается (только poster+play-btn). Единая таксономия `eventType`
  с `GalleryTeaser`/`EventsRecap`/`TestimonialsCarousel`.
- **empty-state:** при фильтре 0 фото — «Нет кадров в этой категории — покажем всё» + reset.
- **LCP-доказательство (Framer `useScroll`, НЕ WebGL, `16`#4):** parallax через
  `useTransform` (лёгкий, LCP<1.2s); первые 6 фото `eager`+preload, остальные `lazy`;
  CLS защищён `aspect-ratio` боксами (резервная высота до загрузки).
- **Пропсы:** `photos: GalleryItem[]` (`{type:'photo'|'video', src?, video: VideoRef?, eventType, season, caption, alt}`; 20–30% — `type:'video'`), `filterTags`.
- **Responsive:** masonry через CSS columns (desktop 3–4 кол., mobile 2); parallax
  intensity уменьшается на tablet, выключается на mobile (save CPU/INP).

---

### БЛОК 20 — Calculator  *(формат→гости→пакет→опции→итог→PDF-КП)*

**Примирение противоречия «без API» (`19`#20 ❌ если нужен API) vs `07`«POST /api/calculate»:**
**ЗАФИКСИРОВАНО = локальный расчёт на клиенте <50ms — ИСТОЧНИК ИСТИНЫ, НИКАКОГО
блокирующего API-call.** `POST /api/calculate` — ОПЦИОНАЛЬНЫЙ server-side endpoint
ТОЛЬКО для (а) кросс-проверки результата и (б) сохранения лида; вызывается
**асинхронно/неблокирующе** с **offline-фолбэком**: если endpoint упал/таймаут —
клиентский результат остаётся (уже посчитан локально). Т.е. «без API» для пользователя
верно; API — невидимая валидация с фолбэком.

- **Исправление бага цен (`19B`#20, самозафикс. в `07`):** берём канон
  `NILOV_UNIFIED_MENU`. Фуршет **Максимальный = 5 350** (канон; НЕ 3 350 из blueprint §3.2, НЕ 4 350 — унифицировано с 04:1664/1095).
  Названия пакетов: **Эконом / Стандарт / Расширенный / Максимальный** (внутренний `luxury` = публично «Максимальный»; НЕ Classic/Premium/Imperial/Royal/Люкс(публично), единый канон T3/М7).
  Матмодель из `07` без изменений:
  `P_total = N * (P_base + SUM(C_addon)) * (1 - gamma(N)) * (1 - early_booking_discount)`,
  `gamma(N)=0.15*(N-10)/(150+(N-10))` (max 15%), early-booking 30+дн −5% / 60+дн −10% / 90+дн −15%.
- **reduced-motion для count-up (`19B`#20):** под `prefers-reduced-motion` цена
  обновляется **мгновенно** (final value, без spring/countUp). В обычном режиме —
  `CountUp` spring 400ms (`--ease-spring`) на любом изменении.
- **PDF-КП mobile-бандл-стратегия (`19B`#20 — «бандл/perf на mobile не адресован»):**
  `@react-pdf/renderer` грузится **только по клику «Получить КП»** через
  `next/dynamic(() => import(...), { ssr:false })` — отдельный lazy-чанк, НЕ в основном
  бандле. На mobile тяжёлый рендер переносим на сервер (Route Handler генерит PDF и
  отдаёт ссылку) ИЛИ показываем лёгкий HTML-превью в новой вкладке → клиент не тянет
  тяжёлую либу. Превью КП обновляется реактивно (<300ms) на десктопе.
  > **[Волна 4, закрывает E3 (Елена, B-E3) — КП без обязательных контактов]** Кнопка **«Скачать КП (PDF)»** (`@react-pdf/renderer`, см. `07`) генерит PDF-КП **БЕЗ обязательного ввода имени/телефона/даты** — секретарь Елена получает предпросмотр КП (формат + пример меню + итог + цена/гость) и показывает боссу. Контакты — **опц. поле** «Оставить контакт для финального КП» (тел/WA), НЕ блокирующее скачивание. Скрытый обязательный шаг устранён: self-service «быстро получить КП» = реальность, НЕ заявка менеджеру.
  > **[Волна 4, закрывает E8 (Елена, B-E8) — пресет «Корпоративный юбилей на 120»]** Рядом с пресетами Игоря/Ольги на `/plan` и Hero — **экспресс-пресет «Корпоративный юбилей на 120 →»** → `/plan/calculator?event=korporativ&guests=120&format=banket&tier=standard` (предзаполнено: формат Банкет + пример меню + live-итог + кнопка «Скачать КП» из E3). Елена закрывает «сравнить + КП» за 1–2 тапа, минуя 6-шаговый конструктор. Дублируется на `/events/korporativ`.
- **LCP (`19B`#20):** интерактивная страница; LCP-элемент — текст `ResultDisplay`
  (мгновенно, без тяжёлого hero); контролы не блокируют paint. Мгновенный пересчёт <50ms
  без API на клиенте (подтверждается матмоделью `07`, измеряется Lighthouse при сборке).
- **a11y / Perf:** все input → `<label>` + `aria-describedby` для ошибок; `focus-visible`
  2px gold; keyboard-nav по шагам; цифры в `--font-mono`, разделитель тысяч — пробел
  (`579 223`); Schema.org `Offer` на итоговую цену.
- **Пропсы/компоненты (из `07`):** `CalculatorApp` → `FormatSelector` / `PackageSelector`
  (slider 4 тарифа) / `GuestsSlider` (10–500, step 5) — при >500 шаг НЕ принимает
  значение, ветка «Оставить заявку» → `/api/contact` (см. блок 08, §Границы гостей: 10–500 + edge >500; единая терминология B8) / `AddonToggles` / `AllergenFilter`
  (14 чекбоксов → автоскрытие блюд) / `DatePicker` / `ResultDisplay` (sticky).
  > **[Волна 4, закрывает E7 (Елена, B-E7) — «Мобильный фуршет» не путает]** `FormatSelector` в калькуляторе и конструкторе (шаг 1) показывает **ровно 4 формата** из `FormatShowcase`: Фуршет / Банкет / Кофе-брейк / Chef-at-home — НЕ «Мобильный фуршет» (он есть в CMS-модели `PricingConfig`, но для не-спеца это путающая опция, см. E9). Если «Мобильный фуршет» нужен — он доступен как **ad-hoc опция внутри Фуршета** (пояснение plain-языком: «фуршет с выездом на площадку без кухни»), НЕ как отдельная карточка в быстром пути. Консистентность калькулятор ≙ `FormatShowcase` (Волна 4).
  State: `hooks/useCalculator.ts` (локальный расчёт). `POST /api/calculate` — опц. валидация+лид.
- **Responsive:** desktop — 2 колонки (контролы 40% слева, `ResultDisplay` sticky 60% справа);
  mobile — вертикальный стек, `ResultDisplay` fixed-bottom (сворачиваемая панель с итогом + CTA).

---

### БЛОК 21 — DeliveryZonesMap  *(зоны доставки + карта, Волна 2А)*

**Назначение:** страница `/delivery` — прозрачные зоны обслуживания (локальное SEO «кейтеринг СПб/КАД/ЛО»).
Связь с `TrustProof` («🚚 Доставка в КАД включена») и калькулятором (надбавка вне КАД = `calcTotal` add-on).
Биндинг к `SERVICE_DELIVERY_SPEC` §3 (холодовая цепь — часть контракта качества доставки).

- **КАД включён (0 ₽):** явный бейдж/строка «В пределах КАД — доставка бесплатно».
- **Холодовая цепь (ОБЯЗАТЕЛЬНА, `SERVICE_DELIVERY_SPEC` §3):** доставка = **непрерывная холодовая цепь**, а не просто «привезём». В смете и на `/delivery` зафиксировано: **рефрижераторные фургоны** (лето/жара — обязательно), **термологгеры** в каждом контейнере, целевая t холодных блюд в пути **≤ +6 °C**, разделение аллергенов. Блок показывает строку «Холодовая цепь (реф-фургон + логгеры) — **включена в КАД / +N ₽ вне КАД**» согласно §3; при разрыве цепи (> +8 °C / 30 мин) — утилизация партии + пересчёт «в сторону клиента» (брак-контракт).
- **Надбавки вне КАД — таблица зон (пример, уточнить у заказчика):**
  | Зона | Районы ЛО | Надбавка |
  |---|---|---|
  | Зона 1 | Мурино, Кудрово, Сертолово, Стрельна, Петродворец | +3 000 ₽ |
  | Зона 2 | Пушкин, Колпино, Всеволожск, Гатчина | +5 000 ₽ |
  | Зона 3 | Выборг, Приозерск, Кингисепп, Тихвин | +8 000 ₽ (или по запросу) |
  > Надбавка вне КАД = единая переменная `DELIVERY_SURCHARGE[zone]`, тянется в `calcTotal`
  > (как add-on), чтобы цена в калькуляторе и на `/delivery` совпадали (см. `07` §Единая `calcTotal`).
- **Карта:** интерактивная SVG (контур КАД + заливка зон цветом по градиенту надбавки) ИЛИ статичная карта
  (`/public/demo/delivery-zones.svg`) + список районов ЛО под ней. Без сторонних JS-карт (LCP/CLS-безопасно).
- **Пропсы:** `kadIncluded: boolean`, `zones: Zone[]` (`{ id, name, districts: string[], surcharge }`),
  `mapSrc?: string`.
- **a11y / Perf / Responsive:** карта = `<svg role="img" aria-label="Зоны доставки NiloV">` + текстовая таблица-дубль
  (данные доступны без графики); SVG inline → CLS=0; mobile — таблица сверху, карта под ней.
- **Связь:** страница `/delivery` достижима из футера (колонка «Помощь», см. SiteFooter) и из `TrustProof`
  (клик «Доставка в КАД включена» → `/delivery`). Breadcrumbs: `Главная › Зоны доставки`.

---

### БЛОК 22 — CertBlock  *(сертификаты и безопасность, Волна 2А)*

**Назначение:** страница `/certificates` — юр. комплаенс и безопасность питания. Закрывает БИТУЮ футер-ссылку
`/certificates` (баг C из `17_IA_CRITIC`: футер вёл на `/why-us#cert`, которого нет / страница отсутствовала).
Теперь `/certificates` — отдельная страница, блок CertBlock. Исполнитель 1 уже поправил футер на `/certificates`.

- **Состав (единый язык с `TrustProof`/SiteFooter 152-ФЗ-бейджем):** 152-ФЗ (ФЗ «О персональных данных»),
  ТР ТС 021/2011 (безопасность пищевой продукции, маркировка 14 аллергенов), Роспотребнадзор
  (санитарно-эпидемиологическое заключение) 🟡 *(наличие сертификата/заключения подтвердить у заказчика, не выдавать за верифицированный факт)*, Декларация соответствия (EAC) 🟡, аккредитация кухни
  (собственное производство / HACCP) 🟡 *(наличие подтвердить у заказчика)*. Каждый пункт = карточка: название + №/дата (если есть) + кратко «что даёт».
  > **[Волна 5–6, закрывает A2+A7 (Али, B-ALI-2/7)]** Блок `CertBlock` (`/certificates`) ОБЯЗАН нести
  > явный **раздел «Халяль»** — честный ответ, а не имитацию исламского сертификата:
  > - Текст прямо: «**Халяль-линия — по запросу, при наличии сертификации.** Постоянного исламского
  >   сертификата (Халяль-центр / Стандарт РФ 56085) на сайте сейчас НЕТ. Мы готовим халяль-блюда по запросу
  >   и подтверждаем сертификацию индивидуально — напишите менеджеру.»
  > - Контакт-кнопка: **«Написать менеджеру про халяль →»** (`/contact`, WA/ТГ deep-link) — единый понятный
  >   ответ «где сертификат / как заказать халяль» (A2-тупик закрыт: Али не уходит с `/certificates` без ответа).
  > - **Дедуп с B4 (`23` §3.1):** `halalStatus:'certified'` НЕ рендерится, пока заказчик не подтвердит сертификацию
  >   (A7). До того сайт честно НЕ обещает сертификат, но ОБЯЗАН дать Али понятный ответ через этот блок + баннер
  >   на `/menu/halal` (см. БЛОК 15.6 / A6). Никакой подмены «по запросу» на «сертифицировано».
  > - Иконка раздела — полумесяц 🌙 (форм-маркер, НЕ религиозный claim). Контраст AA.
- **Медиа:** сканы/фото сертификатов (`ImageWithBlur`, lazy) в lightbox; плейсхолдеры — пометить
  `pending-verification` (см. TODO баг 2: реальные № сертификатов запросить у заказчика).
- **Пропсы:** `certs: Cert[]` (`{ title, number?, issuedBy, validUntil?, image?, note? }`).
- **a11y / Perf / Responsive:** карточки `<article>` с `<h3>`; изображения `alt="Сертификат: {title}"`; lightbox
  как у `GalleryMasonry` (focus-trap, Esc). CLS<0.1; desktop — grid 2–3, mobile — 1 кол.
- **Связь:** футер «Помощь → Сертификаты» → `/certificates`; CTA «Запросить реквизиты» → `/contact`.
  Breadcrumbs: `Главная › Сертификаты`. Страница полезна для доверия/B2B, `noindex` НЕ ставить.

---

### БЛОК 23 — NewsletterSignup  *(подписка, Волна 2А)*

**Назначение:** подписка на новости/сезонные предложения. Задействует ранее МЁРТВЫЙ `/api/newsletter`
(был в списке API репо, но ни один блок не вёл на него). Теперь — реальная подписка.

- **Поля (ровно 2):** `email*` (валидный email, Zod) + чекбокс `consent152` «Согласен на обработку
  перс. данных по 152-ФЗ РФ» (НЕ предустановлен; без галочки submit заблокирован). Ссылка «Политика 152-ФЗ» → `/privacy`.
- **Поведение:** submit → `POST /api/newsletter` (email + consent). Успех = инлайн-сообщение «Вы подписаны!»
  (`aria-live="polite"`); ошибка/дубль = честное сообщение. Без редиректа (inline-форма).
- **Где размещается:** футер (нижняя часть, над контактами) ИЛИ после контента на `/blog`, `/seasonal`.
  НЕ на каждой странице (не перегружать). В футере — обязательно (см. SiteFooter «Подписка»).
- **Пропсы:** `variant: 'footer'|'inline'`, `apiHref='/api/newsletter'`, `privacyHref='/privacy'`.
- **a11y / Perf / Responsive:** label на каждом поле; чекбокс с понятным текстом+ссылкой; focus-visible;
  INP<200ms (client-валидация); статичный блок, CLS≈0. Mobile — стек полей.

---

### БЛОК 24 — RatingBadge  *(внешний рейтинг: Google + Яндекс + 2ГИС, Волна 2А → доп. Волна 4В, G-2)*

**Назначение:** честный внешний рейтинг. НЕ фейковый `AggregateRating` в JSON-LD (риск санкций Гугла/Яндекса, см. `SchemaBlock` баг 30) —
а РЕАЛЬНЫЕ ссылки на профили отзывов. **[Волна 4В, G-2]** Для петербургского B2B-кейтеринга основные площадки отзывов РФ — **Яндекс.Карты/Бизнес** и **2ГИС**; Google вторичен (и частично недоступен в РФ). Охват реальных отзывов закрыт добавлением Яндекс/2ГИС рядом с Google (единый блок «Отзывы о нас» со всеми площадками).

- **Состав:** звезда (inline SVG) + число рейтинга + «(N отзывов)» + кликабельная ссылка
  `href="https://www.google.com/maps/place/?q=place_id:{ID}"` (или короткая ссылка на профиль)
  `target="_blank" rel="noopener noreferrer"` + `aria-label="Отзывы о NiloV Catering на Google"`.
- **Площадки РФ (Волна 4В, G-2):** единый ряд из 3 площадок, каждая — отдельная ссылка `target=_blank rel=noopener noreferrer` с понятным `aria-label` (без мёртвых/фейк-ссылок; если `url` не задан — плитка площадки НЕ рендерится):
  - **Google Business** — `https://www.google.com/maps/place/?q=place_id:{ID}` (профиль), `aria-label=Отзывы о NiloV Catering на Google`.
  - **Яндекс.Карты / Яндекс.Бизнес** — `https://yandex.ru/maps/org/{org-id}/` (профиль организации в Яндекс.Бизнес), `aria-label=Отзывы о NiloV Catering на Яндекс.Картах`.
  - **2ГИС** — `https://2gis.ru/spb/firm/{firm-id}` (профиль фирмы 2ГИС, СПб), `aria-label=Отзывы о NiloV Catering на 2ГИС`.
- **Важно (G-3, жёстко):** число/звёзды берутся из РЕАЛЬНЫХ профилей (Google/Яндекс/2ГИС) ИЛИ оставляются как «Оцените нас на …» БЕЗ числа — НЕ хардкод «5.0». Никакого `AggregateRating` в JSON-LD без данных. Риск: при сборке дев вставит «5.0» как заглушку → de-facto фейк; зафиксировано — либо реальный pull (API площадки), либо текст БЕЗ числа.
  либо реальный pull (API площадки), либо текст БЕЗ числа. Если ни один из профилей не задан — блок не рендерится.
  > **[Волна 4, закрывает R3 (Роман, B-R3) — внешняя верификация ОБЯЗАТЕЛЬНА для proof]** Публикация раздела `/reviews` как «доверительного proof» (см. RT-4) **блокируется**, пока НЕ заполнен **хотя бы 1 внеш. профиль** (`yandexProfileUrl` ИЛИ `twoGisProfileUrl` ИЛИ `googleProfileUrl`) — иначе `RatingBadge` пуст = нет независимой верификации, скептик Роман заперт внутри сайта. Правило увязано с метрикой готовности RT-4: `reviewsReady = (approvedReal.length >= 20) && (videoCount >= 3) && (externalProfiles >= 1)`. До выполнения — `/reviews` НЕ анонсируется как proof (уже по RT-4), плюс `RatingBadge` рендерит кнопку «Оцените нас на …» с проверкой наличия реального `url`.
- **Где:** рядом с `TrustProof`/`AwardsStrip` (доверие) ИЛИ в футере. Связь с `/reviews` (тот же блок-ряд «доверие»).
  На мобильном — ряд переносится в 1 колонку (все 3 площадки достижимы, без горизонт. скролла).
- **Пропсы:** `rating?: number`, `reviewsCount?: number`, `googleProfileUrl?: string`, `yandexProfileUrl?: string` *(Волна 4В, G-2)*, `twoGisProfileUrl?: string` *(Волна 4В, G-2)*, `variant: 'badge'|'strip'`. Площадки опц. (рендер только заданных — нет фейк-плиток).
- **a11y / Perf / Responsive:** каждая ссылка — видимый текст (не иконка-only); звезда `aria-hidden`; контраст AA.
  Статичный, CLS≈0.

---

### БЛОК 25 — ThankYouScreen  *(страница благодарности, Волна 2А)*

**Назначение:** `/thank-you` — целевая страница после успешного submit `ContactForm` (и пост-калькулятор/конструктор
→ `/api/contact`). Закрывает разрыв воронки (раньше заявка уходила в `/api/contact` без видимой страницы подтверждения).

- **Контекст:** «Заявка принята ✓ Перезвоним ≤15 минут» + trust-сигналы (договор/чек/страховка) + что НЕ делает клиент.
- **CTA:** «К спланированному событию» → `/plan`; «Посмотреть меню» → `/menu`; телефон/WhatsApp/Telegram (как CTASection).
  **(RT-11, Волна 5В):** добавить CTA **«Оцените нас →»** — момент благодарности = пик лояльности, идеальный
  триггер запроса отзыва. Ведёт на внеш. площадку (Яндекс/2ГИС/Google, `БЛОК 24`) + зеркало на `/reviews`
  (форма фотоотчёта). Ссылки `target=_blank rel=noopener noreferrer`, понятный `aria-label`.
- **Технически:** калькулятор/конструктор/ContactForm после успешного `fetch` делают `router.push('/thank-you')`
  (ИЛИ redirect с query `?source=contact|calculator`). Страница `noindex` (не для индексации).
- **Пропсы:** `source?: 'contact'|'calculator'|'constructor'`, `heading`, `primaryHref='/plan'`.
- **a11y / Perf / Responsive:** текстовая, LCP-безопасно; 1 primary CTA; mobile — стек. `prefers-reduced-motion` — без анимации галочки.

---

### БЛОК 26 — NotFoundPage  *(кастомная /404, Волна 2А)*

**Назначение:** кастомная страница ошибки. Глобальный `notFound()` (Next.js `app/not-found.tsx`) → эта страница;
плюс явный роут `/404` для прямых заходов. Закрывает отсутствие branded 404 (риск «голой» ошибки).

- **Тон:** живой, в ДНК («Этой страницы нет, но кейтеринг — есть») + быстрые ссылки:
  `Главная(/)` · `Меню(/menu)` · `События(/events)` · `Контакты(/contact)` · `Спланировать(/plan)`.
- **Поведение:** не индексируется (`noindex`, HTTP 404); `Breadcrumbs` НЕ показываются; возвращает корректный статус 404.
- **Пропсы:** `quickLinks: NavItem[]` (из SiteHeader nav), `homeHref='/'`.
- **a11y / Perf / Responsive:** `<h1>` понятный; ссылки — видимый текст; focus-visible; статичный, CLS≈0.

---

### БЛОК 27 — EventsRecap  *(архив video-рекапов с мероприятий заказчика, Волна 3А)*

**Назначение (`17` §8, `26_VIDEO_ARCHIVE_TASK`):** у заказчика ОЧЕНЬ много видео с реальных мероприятий
(примеры площадок — Эрмитаж/Мариинский 🟡 — упоминаются ТОЛЬКО как примеры ДЕМО-данных слота, НЕ как подтверждённые клиенты и НЕ как доказательство уровня; до сверки с договорами заказчика НЕ публикуются как факт, per FACT-GATE 04:86 / бан-лист 40 §3.2). Блок превращает архив в
**инструмент продаж** (kometmedia «event-recap → sales asset», НЕ «забыли через 3 дня») + портфолио-showcase
В РФ-стеке видео-архив живёт на **Rutube / self-host** (Vimeo ушёл из РФ — платно и заблокирован/нестабилен, см. раздел «ВИДЕО-СЛОЙ»),
через единый `VideoProvider` (`default='rutube'`). Клиент видит СВОЙ формат живьём → «так будет у меня».
Страница `/events/recap` (полный архив) + короткая лента `home-strip` на главной СРАЗУ ПОСЛЕ `GalleryTeaser`
(см. секцию главной 7-bis).

- **Лента хайлайтов (reel-style):** сетка/лента коротких клипов **15–45с** (хайлайт-рил каждого события),
  muted, lazy-load, с poster. Каждый клип по клику открывается в **модалке** с ПОЛНЫМ recap-видео (2–3 мин)
  ИЛИ развёрнутым рилом. Полные recap НЕ в потоке главной (не бьют LCP) — только по клику/на `/events/recap`.
- **Фильтр (ЕДИНАЯ таксономия с `GalleryTeaser`/`TestimonialsCarousel`/`GalleryMasonry`):** чипы по
  **типу события** (Свадьба / Корпоратив / Частное / Chef-at-home) + **площадке** (Лофт-площадка / Загородный клуб / др. — примеры-категории, НЕ узнаваемые бренды)
  + **дате** (год/сезон). Каждый клип тегируется `eventType` + `venue` + `date` (как GalleryTeaser). URL-state
  `?type=&venue=` (SSR-фильтрация, как `MenuCatalog`/`ReviewList`). Empty-state: «Нет рекапов в этой категории —
  покажем все» + reset.
- **Источник хранения = `VideoProvider` (Rutube по умолч., эмбед-facade, НЕ self-host MP4; vimeo — только если доступен у заказчика):** прогрессивный стриминг легче для LCP, чем
  тяжёлый self-host (`17` §8 «источник хранения»). Клип = `VideoProvider`-плеер (lite-embed / facade: сначала poster+play-btn,
  реальный iframe грузится ТОЛЬКО по клику → LCP-безопасно, не тянем плеер в первый paint). Ссылка на канал/showcase
  (Rutube-плейлист или self-host) в CMS-данных клипа (`VideoRef`).
- **Модель данных:**
  ```ts
  interface RecapClip {
    id: string;
    eventType: 'wedding'|'corporate'|'private'|'chef-at-home'; // ЕДИНАЯ таксономия (как Review/GalleryPhoto)
    venue?: string;            // ДЕМО-плейсхолдер, НЕ узнаваемый бренд (напр. «Лофт-площадка» | «Загородный клуб» | др.); реальные бренды (Эрмитаж/Мариинский) ЗАПРЕЩЕНЫ как клиенты без письменного договора (см. 40 §3.2)
    date: string;              // ISO (для фильтра по году/сезону)
    title: string;             // ДЕМО-пример, НЕ реальный бренд: «Свадьба · Лофт-площадка · 120 гостей» (ДЕМО-данные слота, не голый факт-клиент; 🟡 до сверки)
    posterSrc: string;         // постер клипа (LQIP → full WebP), ВСЕГДА локальный
    video: VideoRef;           // Rutube/self-host через VideoProvider (default='rutube'); ранее хардкод vimeoId
    durationSec: number;       // 15–45 для рила
  }
  ```
- **Пропсы:** `clips: RecapClip[]`, `variant: 'page'|'home-strip'`, `showcaseUrl: string` (ссылка на Rutube-плейлист / self-host-канал),
  `initialFilter?: { eventType?; venue? }`. `home-strip` рендерит 4–6 клипов + CTA «Смотреть все рекапы →» → `/events/recap`;
  `page` — полный архив с фильтром.
- **Медиа-ассеты (`17` §8, §5 единый стиль):** постеры клипов `/public/demo/recap/{wedding-hermitage-120,corp-mariinsky-300,...}.webp`
  (LQIP ≤10КБ → full ≤120КБ); видео — на **`VideoProvider` (Rutube-плейлист заказчика / self-host)** (эмбед-facade, не в репо). Демо: временные рилы
  (Coverr/Mixkit event-recap) с пометкой ДЕМО (`17` §4), финал — архив заказчика (`17` §7). Единый светлый цветокор (`17` §5),
  иначе архив ломает ДНК.
- **Perf (LCP<1.2s):** НЕ self-host — `VideoProvider` прогрессивный стриминг (Rutube); клип-плеер = **facade** (poster+play-btn,
  iframe по клику), `loading="lazy"` на всех клипах ниже fold, первые 2–3 постера eager+blur-up. На главной
  (`home-strip`) полный recap НЕ в потоке (модалка) → главная LCP не страдает. INP<200ms (открытие модалки —
  composited); CLS<0.1 (`aspect-ratio` 16:9 постеров).
- **a11y (`17` §8 reduced-motion + модалка):**
    воспроизведение только по явному клику пользователя (единый контракт с DishCard/ShowCookingGrid).
  - Каждый клип — `<button aria-label="Рекап: Свадьба, Лофт-площадка, 120 гостей, 30 секунд">` (тип+площадка-плейсхолдер+длит.).
  - Модалка: `role="dialog" aria-modal="true"` + **focus-trap** (фокус заперт внутри), **Esc** — закрыть,
    возврат фокуса на триггер-клип после закрытия (как lightbox `GalleryMasonry` БЛОК 19). `VideoProvider`-iframe в модалке —
    с `title` для скринридера.
  - Фильтр-чипы — `role="group" aria-label="Фильтр рекапов"` + `aria-pressed` (как MenuCatalog).
  - Секция — `aria-label="Архив видео с наших мероприятий"`.
- **SEO:** дублируем title/тип/площадку клипа видимым текстом (`VideoProvider`-контент не индексируется) + JSON-LD
  `VideoObject` (name/thumbnailUrl/uploadDate/embedUrl) на `/events/recap`. Breadcrumbs: `Главная › События › Рекапы`.
- **Связь:** единая таксономия «по типу события» с `GalleryTeaser` (фото, `04`#7) и `TestimonialsCarousel`
  (видео-отзывы, `04`#9 video-variant) и `GalleryMasonry` (`04`#19 video-items) — один словарь `eventType`.
  Страница `/events/recap` — в sitemap (`02_IA`), достижима из `/events` и home-strip.
- **Responsive:** `page` — desktop grid 3–4 кол. / tablet 2 / mobile 1–2; `home-strip` — горизонтальный
  scroll-snap ряд (mobile) / 4–6 в ряд (desktop). Фильтр-бар — горизонт. scroll-snap на mobile. Модалка на mobile —
  full-screen (видео 16:9 по центру, Esc/крестик крупный ≥44px).

---

### БЛОК 28 — ERID-маркировка (рекламная маркировка ОРД, Волна 5А)

**Назначение (Волна 5А / 29 §Бюджетный стек / КоАП 14.3):** при запуске любой платной
рекламы (контекст, таргет VK/MyTarget, баннеры) посадочная и сама реклама **обязаны нести
рекламный идентификатор (ERID / токен ОРД)** согласно ФЗ «О рекламе» (ст. 10.3–10.5, поправки 2022)
и требованиям Роскомнадзора/ОРД (Единый реестр рекламы). Нарушение = административный штраф
по **КоАП 14.3** (нарушение законодательства о рекламе).

> **ПРАВИЛО для исполнителя:** токен `erid` — **обязателен на посадочной странице (и в самом рекламном объявлении)**,
> как только стартует рекламная кампания. Без токена реклама НЕ запускается. На organically-трафик (SEO/прямые
> заходы) маркировка не требуется.

- **Где подставлять токен:**
  - **В самом рекламном объявлении** (кабинет VK Реклама / MyTarget) — поле `erid` заполняет рекламодатель при создании объявления (ОРД выдаёт токен после регистрации рекламы).
  - **На посадочной странице** — компонент `AdMarker`, который выводит токен (и ссылку на карточку ОРД) в **футере посадочной** (или внизу страницы-ленда, на которую ведёт объявление). Пример вывода: `Реклама. Информация об организаторе рекламы по токену ОРД: <token>` + ссылка `https://ord.ispring.ru/<token>`.
  - Токен передаётся через **URL-параметр `?erid=...`** на посадочную → компонент читает его и показывает маркировку (fallback — захардкоженный токен из CMS/конфига для конкретной кампании).
- **Модель данных:**
  ```ts
  interface AdCampaign {
    id: string;
    eridToken: string;          // токен ОРД, выданный при регистрации рекламы
    landingSlug: string;        // /plan | /seasonal | спец-ленд
    isActive: boolean;          // метка активной рекламы → маркировка видима
  }
  ```
- **Логика показа (`AdMarker`):**
  - Если на странице активна рекламная кампания (есть `eridToken` для текущего `landingSlug`) ИЛИ в URL есть `?erid=` → рендерим маркировку.
  - Иначе — компонент НЕ рендерится (organically-страницы чистые).
  - Маркировка НЕ бьёт CWV: статичный маленький блок в футере, `CLS≈0`, `aria-hidden` не ставим (текст должен быть доступен, но визуально нейтральный, серый microcopy).
- **a11y / Perf / Responsive:** текстовый блок, не перехватывает фокус; на mobile — тот же футер-ряд; LCP/INP не затрагивает.
- **Пропсы:** `eridToken?: string` (из URL `?erid` или CMS по `landingSlug`), `variant: 'footer'|'inline'`.
- **Связь с 29_POSITIONING:** бюджетный РФ-стек — ОРД/ERID НЕ требует платных аккаунтов за маркировку саму по себе (токен выдаётся бесплатно при подаче рекламы в ОРД); не путать с платными SaaS-подписками, которые запрещены.

---

### БЛОК 29 — Политика 152-ФЗ (`/privacy`) *(обязательная юр. страница, Волна 5А)*

**Назначение (Волна 5А / HostingCritic #3, #11):** `/privacy` — обязательная страница
оператора персональных данных (ПД) граждан РФ по **152-ФЗ «О персональных данных»**.
Ссылка на неё есть в футере, в `ContactForm`/`NewsletterSignup` (чекбокс `consent152`),
в `TrustProof` и `CertBlock`. Страница **должна содержать ЗАКРЫТЫЙ перечень разделов** —
иначе РКН-проверка/жалоба = предписание + штраф.

> **УСТРАНЕНИЕ ПУТАНИЦЫ оператора (Волна 5А):** юр. оператор ПД — **ИП Нилов Дмитрий Игоревич**
> (бренд «NiloV Catering» / nilov-catering.ru). **НЕ «ООО Интерфуд»** и НЕ смешивать с «Интерфуд Кейтеринг»
> (упоминание в `21B_LOGIC_AUDIT` — это устаревшее/неверное наименование, удалить из юр. контекста).
> Реальные реквизиты оператора (ИНН/ОГРНИП) **запрашиваются у заказчика и подставляются ДО прода**,
> помечены `pending-verification` в `LocalBusiness` (`04` блок SchemaBlock).

**ОБЯЗАТЕЛЬНЫЙ состав `/privacy` (минимум по 152-ФЗ + разъяснениям РКН):**

1. **Оператор ПД:** наименование **ИП Нилов Д.И.**, ИНН, ОГРНИП, адрес места нахождения,
   тел./email для связи по ПД. Баннер-факт: «Мы — оператор ПД, зарегистрированный в РКН».
2. **Цели обработки ПД:** перечень конкретных целей (обработка заявки на кейтеринг,
   обратная связь, рассылка новостей/сезонных предложений при наличии согласия, исполнение договора).
   БЕЗ формулировок «для любых целей».
3. **Правовые основания (ст. 6 152-ФЗ):** согласие субъекта ПД (для рассылки/маркетинга),
   исполнение договора (ст. 6 ч. 1 п. 2/3), законные интересы (только где применимо).
4. **Перечень собираемых ПД:** имя, телефон, email, тип/дата события, комментарий;
   технические (IP, User-Agent, cookies) — отдельно по `/cookies`.
5. **Сроки хранения и уничтожения:** ПД хранятся **только на территории РФ** (РФ-БД, см. `02_IA`
   раздел «РФ-БД») не дольше цели обработки; по истечении — уничтожаются/обезличиваются.
6. **Права субъекта ПД (ст. 14.1, 15–17 152-ФЗ):** право на доступ к своим ПД, на уточнение,
   на отзыв согласия, на удаление/уничтожение, на запрет обработки в целях продвижения.
   Способ реализации: email-запрос оператору (указан в п.1) с ответом в срок до 30 дней (ст. 14.1).
7. **Порядок отзыва согласия:** явная инструкция («написать на <email>, тема "Отзыв согласия",
   указать ФИО») + автоматическая отписка в каждом письме рассылки (double opt-in + unsubscribe).
8. **Передача ПД третьим лицам:** явно перечислить (РФ-CRM/РФ-ESP — UniSender/SendPulse/Mail.ru;
   НЕ зарубежные SaaS). Трансграничная передача — **только при наличии согласия и в страны
   с адекватной защитой** (ст. 12 152-ФЗ); по умолчанию ПД НЕ покидают РФ.
9. **Защита ПД:** меры (шифрование в покое/при передаче, доступ по ролям, РФ-хостинг).
10. **Дата актуальности политики** + ссылка на регистрацию оператора в реестре РКН.

- **Реализация:** статическая страница `app/privacy/page.tsx` (контент из CMS или захардкоженный
  markdown, утверждённый юристом заказчика). **НЕ** генерить Lorem/заглушку — текст юридически значим.
- **a11y / Perf / Responsive:** семантичный `<article>` с `<h2>` по каждому из 10 разделов;
  max-width колонки ~720px; CLS≈0; статичная, LCP-безопасно.
- **Пропсы:** `operator: { name; inn; ogrnip; address; contactEmail; contactPhone }`,
  `updatedAt: string`, `transborderAllowed: boolean`.
- **Связь:** футер (колонка «Помощь») → `/privacy`; чекбоксы `consent152` (ContactForm/NewsletterSignup) → `/privacy`.

---

### БЛОК 34 — TastingBooking  *(дегустация перед бронированием, GapHunter G1, закрывает C9-1)*

**Назначение (`02_IA.md:66`, `46_GAPHUNTER_AUDIT` G1 MEDIUM):** индустрия (TheKnot/DPNAK/qrolic) требует «taste before booking» — клиент бронирует дегустацию до контракта. Роут **`/tasting`** (объявлен в `02_IA`), теперь с блок-спецой (раньше ВИСЯЧИЙ → C9-1 закрыт).

- **Форма:** дата (date-picker, мин +3 дня) · тип события (свадьба/корп/частное) · гости (2–20) · контакт (тел/WA). → `/api/contact` (CRM) ИЛИ WA-deeplink (приоритет в РФ).
- **Шаг в `ProcessSteps`:** добавить шаг «Дегустация» перед «Контракт» (закрывает G1 в воронке).
- **Контент:** «Попробуйте меню до брони» + 2–3 сигнатурных блюда-превью (DishCard). CTA «Записаться на дегустацию».
- **Пропсы:** `minDate`, `eventTypes: string[]`, `contactEndpoint: 'api'|'wa'`.
- **a11y / Perf / Responsive:** форма = семантичные `<label>`+`<input>`, focus-visible; CLS≈0; mobile-first.

---

### БЛОК 35 — VenueList  *(площадки, которые мы обслуживаем, GapHunter G5, закрывает C9-2)*

**Назначение (`02_IA.md:69`, `46_GAPHUNTER_AUDIT` G5 LOW):** клиенты ищут «работали ли вы на МОЕЙ площадке». Роут **`/venues`** (объявлен в `02_IA`), теперь с блок-спецой (раньше ВИСЯЧИЙ → C9-2 закрыт).

- **Контент:** список предпочитаемых площадок (название + район + вместимость + «обслуживали N событий» 🟡). Площадки — ПРИМЕР-категории (Эрмитаж/Мариинский 🟡 — НЕ подтверждены как клиенты, помечать 🟡, не публиковать как голый факт).
- **Фильтр:** по району / вместимости / типу события.
- **CTA:** «Проверить вашу площадку» → `/api/contact` (если площадки нет в списке — менеджер подтверждает).
- **Пропсы:** `venues: { name; district; capacity; eventsServed 🟡 }[]`.
- **a11y / Perf / Responsive:** карточки = grid, alt на фото, focus-visible; lazy-load.

---

### БЛОК 31 — AccessibilityPage  *(заявление о доступности WCAG, GapHunter G3, закрывает C9-3)*

**Назначение (`02_IA.md:68`, `46_GAPHUNTER_AUDIT` G3 LOW–MED):** подкрепляет претензию WCAG (не только бейдж 152-ФЗ). Роут **`/accessibility`** (объявлен в `02_IA`), теперь с блок-спецой (раньше ВИСЯЧИЙ → C9-3 закрыт).

- **Контент:** заявление о доступности — уровень соответствия (WCAG 2.1 AA цель), какие меры приняты (semantic HTML, focus-visible, reduced-motion, contrast AA, коэф. тач ≥44px), как связаться по вопросам доступности (a11y-канал в `/contact`).
- **Связь:** футер (колонка «Помощь») → `/accessibility`; `TrustProof` бейдж 152-ФЗ → якорь сюда.
- **a11y / Perf / Responsive:** семантичный `<article>` с `<h2>` по разделам; max-width ~720px; статичная, CLS≈0.
- **Пропсы:** `conformanceLevel: 'WCAG 2.1 AA'`, `a11yContact: { email; phone }`.

---

### БЛОК 32 — CareersPage  *(вакансии, GapHunter G4, закрывает C9-4 /careers)*

**Назначение (`02_IA.md:97`, `46_GAPHUNTER_AUDIT` G4 LOW–MED):** карьерная страница «Мы нанимаем». Роут **`/careers`** (объявлен в `02_IA` + футер `43`), теперь с блок-спецой (раньше ВИСЯЧИЙ → C9-4 закрыт).

- **Контент:** 3–5 открытых позиций (шеф-повар, су-шеф, официант-бариста, event-менеджер, водитель-экспедитор) с карточками: название, локация (СПб), занятость, короткое описание, «Откликнуться» → `/contact?topic=careers&role=…`. Блок «Почему к нам» (стабильность с 2007, реальная кухня, не франшиза).
- **Связь:** футер (колонка «Компания») → `/careers`; CTA «Хочешь работать с нами?» в footer/TrustProof.
- **a11y / Perf / Responsive:** семантичный `<article>` с `<h2>`; grid карточек; alt на фото команды; lazy-load; CLS≈0.
- **Пропсы:** `openRoles: Role[]`, `whyUs: string[]`.

---

### БЛОК 33 — ENVersion  *(англо-версия, опц., GapHunter G5, закрывает C9-5 /en)*

**Назначение (`02_IA.md:96`, `46_GAPHUNTER_AUDIT` G5 LOW–MED):** опциональная EN-версия для иностранных гостей/корпораций. Роут **`/en/*`** через i18n-свитчер в шапке (НЕ в футере). Цель — не основной трафик, а «международный гость может прочитать меню».

- **Контент:** ключевые страницы (главная, меню, форматы, контакт) с EN-переводом из CMS-поля `locale`. Полный EN-каталог — позже (волна 12).
- **a11y:** `hreflang` alternate, `lang="en"` на `<html>` при свитче.
- **Пропсы:** `locale: 'ru'|'en'`, `translations: Record<string,string>`.

---

## 🔵 ВОЛНА 11 — B2B / ПАРТНЁРСКИЙ СЛОЙ (закрывает Профи #12, Сергей #13, Юлия #14, Павел #15, Свадебное агентство #16)

Пять B2B/партнёрских персонажей выявили общий разрыв: сайт заточен под разового физлицо-клиента и «слеп» к агентствам, регулярным и медиа-сценариям. Закрываем ЕДИНЫМ партнёрским слоем (не дублируя роли).

### 11.1 — Агентский кабинет `AgencyCabinet` (закрывает B-PROFI-1…9, B-WEDAGENCY-1…9)
- **B-PROFI-2 / B-WEDAGENCY-3 · Роут + кабинет.** Добавить роут **`/partners`** (B2B-вход) + блок `AgencyCabinet` (регистрация агентства, список клиентских проектов, выделенный менеджер). Пункт «Для агентств / B2B» в `SiteFooter`(«Компания») и бургер-меню. `02_IA.md` дополнить роутом. ЕДИНЫЙ кабинет для ивент-агентства (#12) и свадебного агентства (#16) — НЕ дублировать (B-WEDAGENCY-6).
- **B-PROFI-1 / B-WEDAGENCY-2 · White-label.** Переключатель «Скрыть бренд NiloV в документах клиента» + поле «Логотип агентства» (загрузка в CMS) → экспорт КП/счёта несёт логотип и контакты агентства, НЕ NiloV. Без этого агентство теряет маржу.
- **B-PROFI-5 / B-WEDAGENCY-1 · Передача брифа 1 кнопкой.** В кабинете — кнопка «Отправить бриф менеджеру» (свободное поле ТЗ + вложения: площадка, декор, тайминг, меню) → **`/api/brief`** (CRM менеджера), минуя 6-шаговый конструктор. Для свадебного агентства — расширенный `WeddingBrief` (площадка/декор/тайминг, B-WEDAGENCY-5).
- **B-PROFI-3 · Оптовые цены.** `PricingConfig` несёт `b2bMultiplier`/агентский прайс; в калькуляторе при B2B-сессии — оптовая цена + видимая маржа агентства (скрыта от конечного клиента в white-label).
- **B-PROFI-4 · Сравнение форматов для КП.** Блок «Сравнение форматов» (формат × цена/гость × входит × сроки), экспортируемый в КП (переиспользует таблицу Марины M3, `FormatShowcase`).
- **B-PROFI-6 · Экспорт КП (PDF).** Кнопка «Выгрузить КП (PDF)» из калькулятора/кабинета с white-label-шапкой (`@react-pdf/renderer` уже в стеке).
- **B-PROFI-7 · Аккаунт-менеджер.** В кабинете — блок «Ваш менеджер: ФИО, тел, WA» + прямая линия.
- **B-PROFI-8 / B-WEDAGENCY-4 · Защита от обхода.** В white-label режиме КП несёт только контакты агентства; NiloV не публикует прямые контакты конечному клиенту агентского проекта (договорная защита маржи).
- **B-WEDAGENCY-7 · Вход для агентства.** `EventTypeSelector` «Свадьба» → для агентской сессии CTA «Я агентство → передать бриф» (deep-link в кабинет).
- **B-WEDAGENCY-9 · История проектов агентства** (переиспользует распознавание возврата P3, волна 9).

### 11.2 — Регулярные заказы `RecurringOrder` (закрывает B-SERGEY-1…9)
- **B-SERGEY-1 · Подписка/абонемент.** Роут **`/subscribe`** (или секция в `/account`) + блок `RecurringOrder` — настройка повторяющегося кофе-брейка (формат, гости, день недели, время).
- **B-SERGEY-2 · Расписание.** Поле периодичности (еженедельно / раз в 2 недели / ежемесячно) + привязка к дню; `AvailabilityCalendar` резервирует серию дат, а не одну.
- **B-SERGEY-3 · Шаблон заказа.** Сохранение «Мой кофе-брейк» как именованного шаблона в аккаунте (БД, НЕ sessionStorage) — переиспользуется для разовых и регулярных заказов.
- **B-SERGEY-4 · Автоповтор + управление.** В `/account/orders` (расширить волну 9) — вкладка «Регулярные»: список подписок, пауза/возобновление, редактирование состава/кол-ва, отмена. НЕ путать с read-only историей Пети (B-SERGEY-9).
- **B-SERGEY-5 · Напоминания.** Уведомление (WA/ТГ/email по 152-ФЗ) «завтра кофе-брейк — подтвердите/измените» за 1 день.
- **B-SERGEY-6 · quick-кнопки.** Добавить `[10][15]` в `07` (кофе-брейк часто 10–15 гостей).
- **B-SERGEY-7 · Быстрый повтор.** Для авторизованного офис-менеджера — CTA «Мой следующий кофе-брейк →» в `/account` или чип в бургере.

### 11.3 — Медиа-кит `MediaKit` (закрывает B-YULIA-1…9)
- **B-YULIA-1 · Медиа-кит.** Роут **`/media-kit`** (или `/press`) + блок `MediaKit` — агрегатор скачиваемых материалов (логотипы, гайдлайн, фото high-res, сертификаты PDF, кейсы).
- **B-YULIA-2 · Скачивание сертификатов.** На `/certificates` — кнопка «Скачать PDF» на каждом сертификате (Роспотребнадзор/ТР ТС/Халяль/аккредитация) + zip-архив.
- **B-YULIA-3 · Логотип + гайдлайн.** В `/media-kit` — логотип (цветной/ч-б, SVG/PNG) + `BrandGuidelines` (где размещать, цвета, отступы).
- **B-YULIA-4 · Фото-кейсы.** `GalleryMasonry` несёт `downloadHighRes` + подпись-кейс («Корпоратив, 200 гостей, Лофт-площадка» — пример-площадка, НЕ узнаваемый бренд); подборка «Для тендера» в медиа-ките. `alt` обязателен (B-YULIA-9, связь с Анной A7).
- **B-YULIA-5 · Кейсы как документы.** `BlogPost.rubric:'case'` дублируется в медиа-кит как PDF-кейс (кто/что/сколько/результат).
- **B-YULIA-6 · Контакт для прессы.** Выделенный `pr@nilov-catering.ru` (или форма «Для партнёров») в `/media-kit` и футере.
- **B-YULIA-8 · Постер видео-отзыва** — скачиваемый кадр для тендерных вставок (с согласия клиента).

### 11.4 — Средний масштаб (закрывает B-PAVEL-1…9)
- **B-PAVEL-1 · Пресет 50.** Deep-link/CTA `?guests=50&format=banquet&tier=premium` на Hero/`/plan` (как банкет-500 волны 7/A5) — пропуск шага 1 конструктора.
- **B-PAVEL-2 · Scale-proof на 50–150.** `ResultDisplay` при 50–150 несёт caption «Тимбилдинги на 50–150 — наша специализация / штат 80+ официантов / кейс» (расширить волну 7/A4 на средний масштаб).
- **B-PAVEL-3 · Value-prop без сноба.** В `WhyUs`/`CTASection` — блок «Для 50 гостей: персональный шеф, выделенный менеджер, без сноба» (как волна 7/A8, но масштаб 50). Расширить scale-proof на весь диапазон 20–500 (B-PAVEL-8), НЕ дублируя Артёма.
- **B-PAVEL-4 · Цена «за что платим».** В итоге калькулятора — расшифровка ценности пакета (шеф, площадка, сервис), чтобы Павел видел ценность, а не только цифру (связь с B-G8, честная разбивка).
- **B-PAVEL-5 · Тип «Тимбилдинг».** Добавить карточку «Тимбилдинг / Корпоратив закрытый» в `EventTypeSelector` с подписью «выделенный опыт без сноба».
- **B-PAVEL-7 · Персональный менеджер.** Для сессии верхнего тарифа — CTA «Персональный менеджер свяжется лично» (связь с B-PROFI-7).
- **B-PAVEL-9 · Честное сравнение** — «без сноба» подкреплено таблицей сравнения (волна 10/B-G2).

---

## ⚠️ TODO ПЕРЕД ПРОДОМ — верификация claim у заказчика (баг 2, Итерация 2)

Следующие утверждения (claim) в блоках выше — **плейсхолдеры/примеры**, требуют подтверждения
у заказчика ДО релиза. Не пускать в прод без верификации (риск ложных claim → санкции/репутация):

1. **«более 19 лет 🟡 / с 2007»** (блоки 1 Hero, 57 TrustProof, 8 WhyUs) — единое число во избежание противоречия: на живом сайте NiloV указано «более 19 лет (с 2007)». Подтвердить актуальное число лет у заказчика (FactChecker нашёл на сайте «более 19 лет»; арифметически для 2026 года — 19, но прод клиента показывает 18).
2. **«3 500+ проведённых событий»** (блоки 1, 57 TrustProof, 8) — запросить реальную цифру/источник
   (CRM/статистика), или заменить на честную формулировку.
3. **«Гастрономический Оскар 2024» / «Event Awards Russia 2023» — УДАЛЕНЫ как факт-призраки** (отчёт FactChecker, 0 подтверждений в вебе). Заменены в TrustProof на честную формулировку «Участник и финалист отраслевых премий» 🟡. Реальный список наград + точные годы — запросить у заказчика и пометить `pending-verification` до публикации конкретных названий.
4. **Цены пакетов** (блоки 4–6, 14–15, 20): ₽/гость по тарифам (фуршет 2450…5350, банкет
   4470…6970, кофе-брейк 950…2450) — **сверить с актуальным прайсом заказчика (реальный сайт NiloV показывает иные цифры: Фуршет+Кофе-брейк от 390 ₽, Корпоратив от 2 450 ₽, Банкет/Свадьба от 4 470 ₽).** Помечены 🟡 `pending-verification` в спецах блоков. Зафиксировать `priceValidUntil` для `Offer` после сверки.
5. **Цены станций show-cooking** (блок 18): 40 000–72 500 ₽/станция — подтвердить у
   заказчика (могут меняться сезонно).
6. **Реальные кейсы отзывов** (блок 9 TestimonialsCarousel, блок ReviewCard): имена/компании
   (Анна и Павел, ООО «Северсталь-Логистика», Ирина) — получить письменное согласие на
   публикацию ИЛИ заменить на анонимные/реальные approved-отзывы.
7. **Занятость календаря** (блок AvailabilityCalendar): «3 даты в августе заняты» и пр.
   urgency-бейджи — считаются из РЕАЛЬНОГО `/api/availability`, НЕ хардкодить.
8. **Контакты/юр. данные** (блоки 12 CTASection, SchemaBlock LocalBusiness): телефон
   +7 (812) 919-59-11, WA, адрес СПб, `openingHours`, `priceRange` — уточнить и зафиксировать
   в `LocalBusiness`.

> Правило: любой claim в UI/JSON-LD должен быть воспроизводим из проверенного источника.
> Плейсхолдеры помечать `status: 'pending-verification'` в CMS до подтверждения заказчиком.
