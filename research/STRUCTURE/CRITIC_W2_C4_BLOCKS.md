# CRITIC W2 · C4 — БЛОКИ И СЕКЦИИ (ось 4/9)

**Роль:** Независимый критик #4 (Блоки/секции). Правила: независимая оценка, без самооценки автора, под-оценивание, файл:строка-доказательства.
**Объект:** `04_BLOCKS.md`, `12_BLOCK_EXECUTOR_PROMPT.md`, `16_BLOCK_BENCHMARKS.md`, `13_BENCHMARK_SYNTHESIS.md` (чтение) + перекрёстная сверка с `01_VISUAL_DNA.md`, `06_TOKENS.md`, `43_NAV_SPEC.md`, `39_CANON_INDEX.md`, `05_BUILD.md`, `41_BUILD_CHECKLIST.md` + проверка кода на диске (`app/globals.css`, `components/sections/PhilosophySection.tsx`).
**Дата:** 2026-07-20. **Стадия:** SPEC (сборки ещё нет) → Perf/a11y по правилу `18_CRITIC_SYSTEM` §5 капнуты на 8 (без Lighthouse/axe-доказательства).

---

## 1. ПОЛНЫЙ ПЕРЕБОР СЕКЦИЙ 04_BLOCKS (покрытие)

Проверка (a): «все ли секции имеют описание (variant/пропсы/маршруты CTA) — нет ли висячих/пустых».

**Секции главной (нумерация 1–13 + bis):**
1 HeroSection · 1-bis InspireStrip · 2 TrustBar · 3 AwardsStrip→**TrustProof** (слит, не пустой) · 4 EventTypeSelector · 5 FormatShowcase · 6 MenuPreview · 6-bis HomeVideoShowcase · 7 GalleryTeaser · 7-bis EventsRecapHome · 8 WhyUs · 9 TestimonialsCarousel · 10 ProcessSteps · 11 LiveInstagramFeed · 12 CTASection · 13 FAQTeaser.

**Специфичные блоки:** 15.5 MenuLanding · 15.6 DietLinePage · 15.7 FormatHelp · 15.8 HelpersWizard · БЛОК 11/12/13 (переописаны) · 14 EventHero · 15 PackageGrid · 16 MenuCatalog · 17 DishCard · 17-бис AllergenLegend · 18 ShowCookingGrid · 19 GalleryMasonry · 20 Calculator · 21 DeliveryZonesMap · 22 CertBlock · 23 NewsletterSignup · 24 RatingBadge · 25 ThankYouScreen · 26 NotFoundPage · 27 EventsRecap · 28 ERID · 29 Privacy · 11.1–11.4 (B2B-волна) · + инлайн SchemaBlock/TrustProof/TeamGrid/BlogEditorial/SeasonalModule/MenuWowGesture.

**Вердикт (a):** ВСЕ секции имеют детальную спецификацию (пропсы + CTA + Responsive + a11y). Висячих/пустых НЕТ. AwardsStrip корректно помечен как слитый в TrustProof. **Покрытие: 16/16 главных + ~30 специфичных блоков описаны.** Замечание низкой тяжести — см. BUG C4-A1 (коллизия нумерации).

---

## 2. PhilosophySection — orphan / дублирование (b)

Проверка (b): «отмечен ли orphan и не дублируется ли».

- `04_BLOCKS.md:1363` — в map компонентов: `PhilosophySection(→WhyUs)` (связь зафиксирована).
- Orphan помечен в каноне: `05_BUILD.md:23-24,53` и `39_CANON_INDEX.md:64` и `41_BUILD_CHECKLIST.md:65` — «`PhilosophySection.tsx` УЖЕ ЕСТЬ в `components/sections/`, НЕ заимпортирован в `app/page.tsx` (orphan) → дописать WhyUs, НЕ создавать новый файл».
- `12_BLOCK_EXECUTOR_PROMPT.md:45` — инструкция исполнителю: «WhyUs→**дописать из `PhilosophySection` (УЖЕ ЕСТЬ orphan, не создавать новый `WhyUs.tsx`)**».
- **На диске:** `components/sections/PhilosophySection.tsx` **СУЩЕСТВУЕТ**; grep `WhyUs` по `*.tsx` → **0 совпадений** (отдельного `WhyUs.tsx` НЕТ). Дублирования НЕТ.

**Вердикт (b):** SATISFIED. Orphan корректно отмечен в каноне и в промпте исполнителя; на диске файл есть, дубля нет. Мелкое замечание: сам `04_BLOCKS.md` не несёт слова «orphan» у `PhilosophySection` (только `→WhyUs`) — билдер, читающий только 04, мог бы создать новый `WhyUs.tsx`; но `12` и канон это перекрывают. Не баг.

---

## 3. Цвета/типографика консистентны с 01/06 (c)

Проверка (c): «цвета/типографика в блоках консистентны с 01_VISUAL_DNA/06_TOKENS».

**Канон (01:58, 06:76,106):** заголовки = **Cormorant** (НЕ Playfair); gold = `#B08D57`; overline = `text-gold-text` `#8A6D3B` (AA 4.54:1, исправлено Волной 12 B7).

**НАЙДЕНЫ 2 НЕСООТВЕТСТВИЯ:**

- **BUG C4-C1 (medium, a11y):** `04_BLOCKS.md:1438` (БЛОК 12 CTASection): overline задан как `text-2xs uppercase text-gold` — т.е. старый токен `#B08D57` (**2.89:1, AA FAIL**). `06_TOKENS.md:181` ЖЁСТКО предписывает `text-gold-text` (`#8A6D3B`, 4.54:1 ✓ AA), помечая `text-gold` как исправленный FAIL. Спек 04 не впитал правку 06 → контраст надзаголовка FAIL. Фикс: `text-gold` → `text-gold-text`.
- **BUG C4-C2 (medium):** `16_BLOCK_BENCHMARKS.md:22` — «H1 (Playfair)». Прямо противоречит канону Cormorant (01:58, 06:76,106: «Cormorant, НЕ Playfair»). Бенчмарк-документ разъезжается с ДНК по шрифту заголовков. Фикс: Playfair → Cormorant.

**Код на диске (вне зоны спец-дефекта, но влияет на (c)):**
- **BUG C4-B1 (info/blocker, КОД):** `app/globals.css:21,23` — до сих пор **тёмная** система (`--color-background:#0A0A0A`, `--color-foreground:#F5F0EB`). Фаза-0 CODE-REALITY блокиратор B1 (`04_BLOCKS.md:8-77`) **НЕ закрыт**. Спек 04 правильно требует светлую ДНК — сама 04 невиновна, но цвета в коде НЕ консистентны с 06. Отмечено для информирования сборщика (гейт grep `0A0A0A` должен дать 0).

Остальное (gold CTA, ivory secondary `#F2ECE3` в CTASection:1437, H1 Cormorant в Hero:370) — консистентно.

**Вердикт (c):** в основном консистентно, НО 2 документированных расхождения (overline AA-FAIL + Playfair в бенчмарке) + незакрытый тёмный globals.css.

---

## 4. Mobile-first масштабируемость (d)

Проверка (d): «каждый блок масштабируем (mobile-first)».

- 04 несёт исчерпывающий мобильный контракт (B2–B13, K1–K9, A1–A9, P1–P9): OR-правило sticky (ровно 1 снизу), `MobileBottomNav`=5, touch-targets ≥44px (`B12`/`D6`), `prefers-reduced-motion` flat-render (`D8`), fluid-брейкпоинты + ultra-wide (`BB2`), планшетный контракт ≤1023px (`K1`), `100dvh`/`safe-area` (`K7`), нативный зум (`K8`).
- Каждый блок несёт секцию `Responsive` (напр. DishCard:1719 «mobile — 1–2 в ряд», GalleryMasonry:1804 «mobile 2», Calculator:1849 «mobile — стек, ResultDisplay fixed-bottom»).
- `12_BLOCK_EXECUTOR_PROMPT.md:35` — mobile-first жёстко предписан исполнителю (sm640/md768/lg1024/xl1280, упрощённая анимация на mobile).

**Вердикт (d):** SATISFIED на уровне спец. (Кап 8 — рендер/реальный Lighthouse не проверяем на стадии spec.)

---

## 5. CTA-маршруты vs 43_NAV_SPEC (e) — ГЛАВНЫЙ БАГ

Проверка (e): «маршруты CTA в 04_BLOCKS — везде /plan согласно 43_NAV_SPEC (grep '/plan/calculator' должен быть 0 в целевых местах)».

Канон (`43_NAV_SPEC.md:35` §2/§6 + `04_BLOCKS.md:367` C9): единый primary-CTA-глагол **«Спланировать событие» → `/plan`** (хаб). Sticky-CTA «Рассчитать цену» → `/plan/calculator` разрешён (дРУГОЙ глагол, прямой расчёт).

**НАЙДЕНО ПРЯМОЕ ПРОТИВОРЕЧИЕ ВНУТРИ 04:**

- **BUG C4-E1 (HIGH):** `04_BLOCKS.md:1442` (БЛОК 12 CTASection): Primary (MagneticButton gold): **«Спланировать событие» → `/plan/calculator`**.
  - Противоречит `04_BLOCKS.md:367` (C9): «**Hero и CTASection используют его** [«Спланировать событие» → `/plan`]».
  - Противоречит `43_NAV_SPEC.md:35` §2/§6 (primary verb → `/plan` hub) и `43:35` R4 (расхождение `04:168→/plan/calculator` устранено для sticky, а НЕ для CTASection).
  - Тот же глагол «Спланировать событие» ведёт в разные места: Hero (`04:370` → `/plan`) и CTASection (`1442` → `/plan/calculator`). Нарушает унификацию CTA (волна D5, `04:168`).
  - **Фикс:** либо `1442` → `/plan` (согласно C9/43), либо если CTASection реально ведёт в прямой расчёт — переименовать глагол в «Рассчитать цену» (как sticky), чтобы глагол≠маршрут не конфликтовали. Рекомендую `/plan` (канон C9).

**По grep `/plan/calculator` (24 совпадения):** большинство — ЛЕГИТИМНЫ (sticky «Рассчитать цену» `164,168`; express-пресеты «Рассчитать свадьбу/банкет/юбилей» `409,419,423,584,948,1549,1587,1765,1835`; blog-CTA `1114,1205,1210`; seasonal `1230`; ThankYou «К спланированному событию»→`/plan` НЕ считается). Единственное НАРУШЕНИЕ в «целевом месте» (primary-глагол «Спланировать событие») — **только `1442` (CTASection)**. Hero `370` корректен (`/plan`).

**Доп. расхождение нумерации бенчмарков (влияет на навигацию сборщика):**
- **BUG C4-X1 (medium):** `16_BLOCK_BENCHMARKS.md` ссылается на номера блоков, которых НЕТ в 04: «БЛОК 57 TrustProof», «БЛОК 60 TeamGrid», «БЛОК 64 SeasonalModule», «БЛОК 66 SchemaBlock», «БЛОК 43 EventHero», «БЛОК 44 PackageGrid», «БЛОК 49 ShowCooking», «БЛОК 53 ReviewCard», «БЛОК 54 ContactForm», «БЛОК 55/#62 Blog». В 04 нумерация = БЛОК 11–29 + 15.5–15.8 (EventHero = БЛОК 14, а не 43; TeamGrid/SeasonalModule/SchemaBlock/TrustProof вообще без `### БЛОК N` хедера). Бенчмарк-ссылки не маппятся на 04 → сборщик не найдёт блок по номеру. Фикс: привести номера бенчмарка к нумерации 04.

**Вердикт (e):** FAIL по целевому месту — CTASection ломает канон `/plan`. Плюс drift нумерации бенчмарка.

---

## 6. ОЦЕНКА ПО ОСЯМ (1–10, под-оценка)

| Ось | Оценка | Обоснование |
|---|---|---|
| a. Полнота спец секций (висячие/пустые) | **8** | Все описаны, без пустых; коллизия нумерации (C4-A1) снижает. |
| b. PhilosophySection orphan/дубль | **9** | Корректно помечен orphan во всех канонах + 12; на диске файл есть, WhyUs.tsx нет. |
| c. Цвет/типографика ↔ 01/06 | **6** | overline `text-gold` AA-FAIL (C4-C1) + Playfair в бенчмарке (C4-C2) + тёмный globals.css (C4-B1). |
| d. Mobile-first масштабируемость | **8** | Сильный моб-контракт + per-block Responsive; кап 8 (нет рендера). |
| e. CTA-маршруты ↔ 43_NAV_SPEC | **4** | CTASection «Спланировать событие»→/plan/calculator ломает C9/43 (C4-E1). |
| f. Кросс-док когерентность | **6** | Drift нумерации 04↔16 (C4-X1) + БЛОК 30/57 без хедеров (C4-A1). |

**Итоговый балл (среднее осей a–f):** (8+9+6+8+4+6)/6 = **6.8 → 7/10** (округление вниз, self-critic under-rate).

---

## 7. БАГ-ЛИСТ

| id | severity | file:line | суть | фикс |
|---|---|---|---|---|
| **C4-E1** | HIGH | `04_BLOCKS.md:1442` | CTASection primary «Спланировать событие» → `/plan/calculator` ломает C9 (`04:367`) и `43_NAV_SPEC` §2/§6 (primary-глагол должен → `/plan` hub). Hero (`:370`) → `/plan`, рассинхрон внутри 04. | `1442`: `→ /plan/calculator` заменить на `→ /plan` (канон C9). Либо переименовать глагол в «Рассчитать цену», если нужен прямой расчёт. |
| **C4-C1** | MEDIUM (a11y AA) | `04_BLOCKS.md:1438` | БЛОК 12 overline `text-2xs uppercase text-gold` — токен `#B08D57` = 2.89:1 (AA FAIL). `06_TOKENS.md:181` ЖЁСТКО требует `text-gold-text` `#8A6D3B` (4.54:1 ✓ AA). | `text-gold` → `text-gold-text`. |
| **C4-C2** | MEDIUM | `16_BLOCK_BENCHMARKS.md:22` | «H1 (Playfair)» противоречит канону Cormorant (01:58, 06:76,106: «Cormorant, НЕ Playfair»). | Playfair → Cormorant. |
| **C4-X1** | MEDIUM | `16_BLOCK_BENCHMARKS.md` (§9,11,14,19,20,21,22,24,25,26,28) | Бенчмарк-ссылки «БЛОК 57/60/64/66/43/44/49/53/54/55» не маппятся на нумерацию 04 (БЛОК 11–29 + 15.5–15.8; EventHero = БЛОК 14, а не 43). Сборщик не найдёт блок по номеру. | Привести номера бенчмарка к нумерации 04 (или добавить map-таблицу 16↔04). |
| **C4-A1** | LOW | `04_BLOCKS.md:855-870` vs `1394-1464`; `1150,1245` | Коллизия нумерации: БЛОК 11/12/13 описаны дважды (как home 11/12/13 и как `### БЛОК 11/12/13`); БЛОК 30 (SchemaBlock) и БЛОК 57 (TrustProof) упомянуты с номерами, но их детальные спецы — инлайн (`:1245`, `:1150`) БЕЗ `### БЛОК 30`/`### БЛОК 57` хедеров → неоднозначно. | Нормализовать нумерацию: либо дать `### БЛОК 30`/`### БЛОК 57` хедеры, либо убрать «БЛОК N» из инлайн-ссылок. |
| **C4-B1** | INFO (код, не спец) | `app/globals.css:21,23` | CODE-REALITY блокиратор B1 (`04:8-77`) не закрыт: globals.css до сих пор тёмный (`#0A0A0A`). Спек 04 прав, но цвета в коде ≠ 06. | Фаза 0 сборки: переписать токены globals.css на `06_TOKENS` §1; гейт `grep -rn "0A0A0A\|F5F0EB\|722F37\|C9A96E"` → 0. Не править спец. |

**Критических багов (axis<5 или ≥3 critical):** 1 (C4-E1 — ось e=4). Порог «≥3 critical → REWORK» не пробит по количеству, НО итог <8.0 → REWORK по правилу PASS-порога.

---

## 8. ВЕРДИКТ

# ⚠️ REWORK

**Обоснование:** итоговый балл **7/10** (< порога PASS 8.0). Главный блокирующий пункт — **C4-E1**: CTASection (`04_BLOCKS.md:1442`) ведёт primary-глаголом «Спланировать событие» в `/plan/calculator`, прямо нарушая канон C9 (`04:367`) и `43_NAV_SPEC` §2/§6 (primary verb → `/plan` hub). Внутри 04 Hero→`/plan` (`:370`), а CTASection→`/plan/calculator` (`:1442`) — рассинхрон в одном файле. Плюс 2 расхождения с токенами (overline AA-FAIL C4-C1, Playfair C4-C2) и drift нумерации бенчмарка (C4-X1).

**Что закрыть перед PASS:**
1. C4-E1 — привести CTASection к `/plan` (или сменить глагол).
2. C4-C1 — overline `text-gold` → `text-gold-text`.
3. C4-C2 — Playfair → Cormorant в `16_BLOCK_BENCHMARKS`.
4. C4-X1 — синхронизировать номера блоков 04↔16.
5. (код) C4-B1 — закрыть тёмный globals.css на Фазе 0 сборки.

Остальное (полнота спец, orphan PhilosophySection без дубля, mobile-first) — в норме.

---
*Критик: независимый subagent #4 (ось 4/9). Автор спец не оценивал. Перепроверка фактов — по диску (globals.css, PhilosophySection.tsx) и перекрёстно по 01/06/43/39/05/41.*
