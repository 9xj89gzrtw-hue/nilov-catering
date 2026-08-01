# CRITIC_W3_C7_TECH — Техническая реализуемость и билд-док (ось 7/9)

**Роль:** независимый критик #7 (НЕ писал код, НЕ писал сами спеки). Объект — 8 документов STRUCTURE как
инструкция для пошаговой сборки + сверка с реальным кодом на диске.
**Метод:** честное занижение, доказательство `file:line`, верификация по реальному репозиторию
`/Users/evgenijdanilov/Documents/hermes/catering-site` (read_file / search_files), НЕ только по старым вердиктам.
**Дата:** 2026-07-20.

---

## 0. РЕЗУЛЬТАТ

**ОЦЕНКА: 7.4 / 10** → **REWORK** (цель >8 не достигнута, но близко; структура сильная, исполнимая).

Обоснование веса (9 осей, равные веса, округлено до десятых; детали — ниже):

| № | Ось | Балл | Ключевое доказательство (file:line, диск) |
|---|---|---|---|
| 1 | Полнота охвата (блоки/роуты/фазы) | **9** | `41_BUILD_CHECKLIST.md:52-96` покрывает все 13 блоков главной + 20 роутов `02_IA` со статусом ✅/♻️/🆕/🔄. 0 слепых зон. |
| 2 | Однозначность (нет противоречий) | **8** | `05:20` оставляет `components/sections/` (BUG-A закрыт); `12_BLOCK_EXECUTOR_PROMPT.md:39,45` синхрон. НО остаток: `41:65`/критик-A BUG-1 vs `05:23,53` — текст дублирует устаревшее «PhilosophySection в коде НЕТ» (см. C7-01). |
| 3 | Версионная консистентность стека | **9** | `05_BUILD.md` не фиксирует версий (не FAIL само по себе), но `15_REPO_AUDIT.md:9-11` + `package.json:11-44` подтверждают: Next 16.2.10 / React 19.2.4 / Tailwind ^4 / framer-motion ^12.42.2 / lenis ^1.3.25 / zod ^4.4.3 / shadcn ^4.13.0 — **полное совпадение с AGENTS.md, устаревших версий нет.** GSAP НЕ в deps → решение «Framer Motion, не GSAP» валидно (`05:35-36`, `15:13-15`). |
| 4 | Фаза 0: тёмный globals.css + перекраска | **9** | `05:14-17` + `41:30` явно требуют переписать `app/globals.css` под light. ДИСК: `app/globals.css:17-60` РЕАЛЬНО тёмный (`--color-background:#0A0A0A`, burgundy `#722F37`, gold `#C9A96E`) — подтверждает, что перекраска обязательна и НЕ сделана. Orphan `PhilosophySection` подтверждён: `components/sections/PhilosophySection.tsx` есть, в `app/page.tsx` НЕ заимпортирован (grep по `app/page.tsx` → 0 совп. `PhilosophySection`) — совпадает с `05:23,53`/`41:65`. |
| 5 | Точность claim'ов vs код | **6** | `15_REPO_AUDIT.md` и `44_CODEREALITY_AUDIT` подтверждают: код = legacy/dark v1, спека опережает код. Но в спецах есть ЛОЖНЫЕ ссылки на файлы, которых в коде НЕТ (см. C7-02/03/04) — сборщик по ним не соберёт. |
| 6 | Реализуемость калькулятора/конструктора (zod/не заглушки) | **6** | `07`/`08` содержат РЕАЛЬНЫЕ TS-матмодели (`calcTotal`, `PRICE_PER_GUOST`, `ADDONS`, `MIN_GUESTS`, `CHILD_RATE`), логику скидок, edge cases — НЕ заглушки ✅. НО **zod-схем форм НЕТ** (см. C7-05): «Zod realtime» в `08:53` — пустое требование без `z.object`. Плюс блокирующие dangling-импорты `lib/pricing.ts`/`addons.json`/`hooks/useCalculator.ts` (см. C7-02). |
| 7 | Гейты/верификация (как понять, что шаг сделан) | **8** | `41` даёт grep-гейты на каждый шаг (`41:30` тёмные HEX →0; `41:99` старые роуты →0; `41:125` `pnpm build` exit 0). Объективны. Минус: субъективный гейт Фазы 1 «заказчик сказал вау» (`05:43`) — но есть LCP<1.2s/INP<200ms. |
| 8 | Навигация/IA (роуты консистентны) | **8** | `41:78-96` = единый канон роутов из `02_IA` + порядок navItems→роуты (`41:82-83`) + grep-гейт (`41:99`). Диск: в `lib/data.ts:1774,1785` сейчас legacy `/pricing` в navItems — спека это знает и фиксирует как задачу сборки (не баг спецы). |
| 9 | Структура папки / читаемость инструкции | **6** | `05`/`41`/`39` связаны как источник истины ✅. НО `lib/pricing.ts`, `addons.json`, `hooks/useCalculator.ts` заявлены как реальные модули, которых НЕТ на диске (`07:129,211`, `08:33`) — сборщик не найдёт их при импорте. Компоненты-примитивы (`MagneticButton`, `ParallaxImage`, `AnimatedCounter`, `Skeleton`, `SkipLink`, `AnimatedSection`) РЕАЛЬНО есть (`components/effects/*`, `components/common/*`) ✅. |

**Среднее:** (9+8+9+9+6+6+8+8+6)/9 = **7.44 → 7.4 / 10 → REWORK.**

> Почему НЕ 8+: оси 5 и 6 тянут вниз из-за ложных ссылок на несуществующие файлы и отсутствия zod-схем.
> Почему НЕ <6 (FAIL): структура блоков/роутов/фаз/гейтов полна и исполнима; версии актуальны; матмодели реальны.

---

## 1. ПРОВЕРКА ПО ДИСКУ (4 вопроса заказчика)

### (a) Версии Next.js/Tailwind/фреймворков в 05_BUILD совпадают ли с AGENTS.md — нет ли устаревших?
**РЕЗУЛЬТАТ: совпадают, устаревших нет.** ✅
- `05_BUILD.md` сам НЕ пишет версии (это допустимо — он ссылается на `AGENTS.md`/`15_REPO_AUDIT`).
- `15_REPO_AUDIT.md:9-11` декларирует: `next@16.2.10`, `react@19.2.4`, `tailwindcss@4`, `framer-motion@12.42.2`, `lenis@1.3.25`, `zod@4.4.3`, `shadcn@4.13.0`.
- РЕАЛЬНЫЙ `package.json:11-44` подтверждает **точь-в-точь**: `next: 16.2.10`, `react/react-dom: 19.2.4`, `tailwindcss: ^4`, `framer-motion: ^12.42.2`, `lenis: ^1.3.25`, `zod: ^4.4.3`, `shadcn: ^4.13.0`, плюс `zustand@5.0.14`, `@react-pdf/renderer@^4.5.1`.
- `gsap` отсутствует в deps (диск: `package.json` — нет gsap). Решение `15:13-15` и `05:35-36` «Framer Motion, НЕ GSAP» — **технически корректно**, не зависёт от несуществующего пакета.
- **Вывод по (a):** версионная база консистентна, билд-док не устарел.

### (b) Фаза 0 включает ли удаление тёмного globals.css и перекраску (BUG-A/orphan PhilosophySection отмечен)?
**РЕЗУЛЬТАТ: да, включает; orphan PhilosophySection отмечен.** ✅
- `05_BUILD.md:14-17` (Фаза 0, шаг 1): «Перекрасить `app/globals.css` под `06_TOKENS.md` (light system)», менять только значения токенов.
- `41_BUILD_CHECKLIST.md:30` ставит grep-гейт тёмных HEX → 0 (включая `#141414`/`#121212`/`#262626`/`#A88B5A`/`#080808`).
- ДИСК подтверждает необходимость: `app/globals.css:17` `/* Design System: Cinematic Dark */`, `:21` `--color-background:#0A0A0A`, `:28` `--color-primary:#722F37` (burgundy), `:39` `--color-gold:#C9A96E`. То есть код РЕАЛЬНО тёмный → Фаза 0 обязательна и права.
- **BUG-A (sections/ vs blocks/): ЗАКРЫТ.** `05:20` «Оставить существующие секции В `components/sections/` (НЕ переименовывать папку!)»; `41:34` прямо «РЕШЕНИЕ ПУТЕЙ (BUG-A закрыт)». `12_BLOCK_EXECUTOR_PROMPT.md:39,45` синхрон (`components/sections/{{BLOCK_NAME}}.tsx`, WhyUs→дописать из PhilosophySection).
- **Orphan PhilosophySection: отмечен и подтверждён.** `05:23,53` и `41:65` пишут: `PhilosophySection.tsx` УЖЕ ЕСТЬ (5678 байт) в `components/sections/`, НО НЕ заимпортирован в `app/page.tsx`. ДИСК: файл `components/sections/PhilosophySection.tsx` существует; grep `PhilosophySection` по `app/page.tsx` → **0 совпадений** (действительно orphan). Решение `05:23-24` «дописать WhyUs из orphan, заимпортить» корректно.

### (c) Калькулятор/конструктор — реальны ли спеки (zod-схемы, не заглушки)?
**РЕЗУЛЬТАТ: матлогика РЕАЛЬНА и детальна (не заглушка), НО zod-схем НЕТ — прогал.** ⚠️
- `07_CALCULATOR_SPEC.md:63-127` — полноценная TS-функция `calcTotal` с типами `Format`/`Tier`/`AddOn`/`CalcOpts`, формула скидок `gamma+early-gamma*early`, `earlyBookingDiscount`. Это реальный, имплементируемый код, не заглушка.
- `07:52-60` `MIN_GUESTS`, `07:77-83` `PRICE_PER_GUEST` (5 форматов × 4 тарифа), `07:136-153` `ADDONS` (14+ позиций) — конкретные данные.
- `08_CONSTRUCTOR_SPEC.md:12-29` — `ConstructorState` (Zustand) расписан по полям; `08:33-42` единая `calcTotal` из `07`. Шаги 1–6 (`08:44-53`) детальны.
- **МИНУС (C7-05): zod-схем форм в спецах НЕТ.** `08:53` пишет «Zod realtime», но ни в `07`, ни в `08` нет ни одного `z.object`/`z.string`/`z.infer` (grep по обоим файлам → 0). Для валидации контактной формы (шаг 6) нужна реальная `z.object({ name, phone, date, comment })` — её надо дописать в спецу, иначе исполнитель будет импровизировать. Техстек zod ^4.4.3 в наличии.
- **Доп. блокер реализуемости (C7-02):** `07:129,211` и `08:33` требуют импорта `calcTotal` из `lib/pricing.ts` и `hooks/useCalculator.ts`, а `addons.json` (`07:133`) — этих файлов **НЕТ НА ДИСКЕ** (search → 0). То есть спека ссылается на модули, которые ещё не созданы; они НЕ помечены как 🆕 задача сборки в `41`. Сборщик получит `Module not found` при импорте.

### (d) Нет ли в spec ссылок на несуществующие файлы/компоненты (grep по components/sections)?
**РЕЗУЛЬТАТ: значимые dangling-ссылки есть.** ⚠️
Проверены все имена компонентов/файлов, упомянутых в `05`/`07`/`08`/`41`, против реального дерева `components/`:

| Ссылка в спеце | Ожидаемый путь | Есть на диске? | Статус |
|---|---|---|---|
| `lib/pricing.ts` | `lib/pricing.ts` | ❌ нет | **dangling** (C7-02) |
| `addons.json` | `addons.json` | ❌ нет | **dangling** (C7-02) |
| `hooks/useCalculator.ts` | `hooks/useCalculator.ts` | ❌ нет (есть `hooks/useConstructor.ts`) | **dangling** (C7-02) |
| `components/sections/PhilosophySection.tsx` | `components/sections/PhilosophySection.tsx` | ✅ есть | OK (orphan) |
| `components/sections/HeroSection...CTASection` (10 шт) | `components/sections/*.tsx` | ✅ все 10 есть | OK |
| `components/constructor/*` | 7 файлов | ✅ все 7 есть | OK |
| `components/effects/MagneticButton, ParallaxImage, AnimatedCounter, TextReveal, CustomCursor` | `components/effects/*` | ✅ есть (нет `Skeleton`/`SkipLink`/`AnimatedSection` в effects — они в `components/common/*`) | OK (путь уточнён в C7-04) |
| `components/common/Skeleton, SkipLink, AnimatedSection, ScrollToTop` | `components/common/*` | ✅ есть | OK |
| `components/seo/StructuredData` | `components/seo/StructuredData.tsx` | ✅ есть | OK |
| `components/ui/*` (button/card/badge/input/accordion/separator/sheet) | `components/ui/*` | ✅ 7 файлов | OK |
| `MobileBottomNav` | `components/layout/MobileBottomNav.tsx` | ✅ есть | OK |
| `SmoothScrollProvider` | `components/providers/SmoothScrollProvider.tsx` | ✅ есть | OK |
| `lib/fonts.ts` | `lib/fonts.ts` | ✅ есть (Cormorant) | OK |
| `components/calculator/*` (`07:185` `CalculatorApp`/`FormatSelector`...) | `components/calculator/*` | ❌ папки нет (есть `components/constructor/*`, `components/quote/*`) | **dangling** (C7-03) |
| `/api/calculate` (`07:211`) | `app/api/calculate` | ❌ нет в коде (есть `/api/quote`) | **dangling**, но `05:79`/`15:46-49` обещают алиас — не помечено в `41` как задача (C7-03) |
| `lib/data.ts` | `lib/data.ts` | ✅ есть (но navItems legacy — задача сборки) | OK |

Вывод по (d): компоненты `components/sections/*`, `constructor/*`, `effects/*`, `common/*`, `ui/*` — реальны; **ложные ссылки на кодовые модули** `lib/pricing.ts` / `addons.json` / `hooks/useCalculator.ts` / `components/calculator/*` / `/api/calculate`, которые ещё не существуют и НЕ отмечены как 🆕 в `41`.

---

## 2. БАГ-ЛИСТ (id / severity / file:line / суть / фикс)

### 🔴 Критические (блокируют сборку без правки спецы)

| ID | Sev | file:line | Суть | Фикс |
|---|---|---|---|---|
| **C7-01** | HIGH | `05_BUILD.md:23`, `05_BUILD.md:53`, `41_BUILD_CHECKLIST.md:65` | Текстовый лаг: `05:23`/`:53` и `41:65` дублируют формулировку «`PhilosophySection` (5678 байт) ... УЖЕ ЕСТЬ» — но `40_BUILDDOC_CRITIC.md:64` и критик-A BUG-1 (`40:101`) прямо говорят, что `05` «всё ещё содержит устаревшее 'PhilosophySection в коде НЕТ'». Реальный файл на диске ЕСТЬ и orphan — текущая редакция `05`/`41` фактически ВЕРНА (orphan есть), но в `05` местами осталась неоднозначность («его роль trust+бренд частично закрыта SocialProofBar» в `:23` читается как 'файла нет'). Риск: исполнитель решит, что файл создавать заново. | Привести `05:23,53` и `41:65` к единой формулировке «`PhilosophySection.tsx` РЕАЛЬНО существует в `components/sections/` как orphan (не заимпортирован) — дописать WhyUs ИЗ него, НЕ создавать новый `WhyUs.tsx`». Убрать любые фразы, допускающие чтение 'файла нет'. |
| **C7-02** | HIGH | `07_CALCULATOR_SPEC.md:129`, `07:211`, `08_CONSTRUCTOR_SPEC.md:33` | Ложные ссылки на несуществующие кодовые модули: `lib/pricing.ts`, `addons.json`, `hooks/useCalculator.ts`. На диске их НЕТ (search → 0). Исполнитель при импорте `calcTotal`/`ADDONS` получит `Module not found`. Не отмечены как 🆕 в `41_BUILD_CHECKLIST`. | В `41` Шаг 3/4 добавить задачи 🆕: создать `lib/pricing.ts` (перенести `calcTotal`+`PRICE_PER_GUEST`+`ADDONS`+`MIN_GUESTS`+`CHILD_RATE` из `07`), `hooks/useCalculator.ts`, `addons.json`. Либо в `07`/`08` явно пометить «модули создаются в Фазе 4, см. 41 задача N». |

### 🟠 Средние (реализуемость/качество)

| ID | Sev | file:line | Суть | Фикс |
|---|---|---|---|---|
| **C7-03** | MED | `07_CALCULATOR_SPEC.md:185-205`, `07:211`; `05_BUILD.md:79`; `15_REPO_AUDIT.md:46-49` | Компоненты калькулятора указаны как `CalculatorApp`/`FormatSelector`/... в `components/calculator/*` — папки НЕТ (есть `components/constructor/*`, `components/quote/*`). API `/api/calculate` (`07:211`) НЕ существует (есть `/api/quote`); `05:79` обещает алиас, но `41` не фиксирует это как задачу. | В `41` Шаг 4 зафиксировать: `components/calculator/*` = 🆕 (переиспользовать `components/quote/QuoteForm` как базу) + алиас `POST /api/calculate` → `/api/quote` (или новый route). |
| **C7-04** | MED | `05_BUILD.md:27-30` | Примитивы движения: `05` пишет `Skeleton`, `SkipLink`, `AnimatedSection` как часть `components/effects/*`, но на диске они лежат в `components/common/*` (`Skeleton.tsx`, `SkipLink.tsx`, `AnimatedSection.tsx`), а в `effects/*` только `MagneticButton/ParallaxImage/AnimatedCounter/TextReveal/CustomCursor/NoiseOverlay`. Исполнитель будет искать не там. | В `05`/`41` уточнить пути: `AnimatedSection`→`components/common/AnimatedSection.tsx`, `Skeleton`/`SkipLink`→`components/common/*`; `effects/*` = `MagneticButton/ParallaxImage/AnimatedCounter/TextReveal/CustomCursor`. |
| **C7-05** | MED | `08_CONSTRUCTOR_SPEC.md:53`, `07_CALCULATOR_SPEC.md:247` | Заявлена «Zod realtime»-валидация, но **zod-схем в спецах НЕТ** (grep `z.object|z.string|z.infer` по `07`/`08` → 0). `zod@^4.4.3` в deps есть, но спека не даёт ни одной `z.object` для контактной формы (имя/телефон/дата) и addon-выбора. Исполнитель импровизирует → расхождение реализаций. | В `07`/`08` добавить реальные `z.object` (напр. contactSchema: `name:z.string().min(2)`, `phone:z.string().regex(/^\+7...$/)`, `date:z.string().min(1)`, `comment:z.string().optional()`) + `z.infer` типы, импорт из `zod`. |
| **C7-06** | MED | `07_CALCULATOR_SPEC.md:3,13,16,28`; `08_CONSTRUCTOR_SPEC.md:37` | Канон цен ссылается на `NILOV_UNIFIED_MENU.md` как «единый источник правды». Файл НА ДИСКЕ СУЩЕСТВУЕТ (`NILOV_UNIFIED_MENU.md` в корне репо ✅), НО `07`/`08` НЕ дают пути к нему и не выносят числа в `lib/pricing.ts`/`addons.json` (которых нет, см. C7-02). Плюс цены `pending-verification` vs живой сайт (BUG-F2, `07:26-30`). | Зафиксировать в `41`: `lib/pricing.ts`/`addons.json` генерятся ИЗ `NILOV_UNIFIED_MENU.md` (в корне). Пометить BUG-F2 как блокер прод-релиза (не блок сборки). |

### 🟡 Низкие (полировка документа)

| ID | Sev | file:line | Суть | Фикс |
|---|---|---|---|---|
| **C7-07** | LOW | `07_CALCULATOR_SPEC.md:190` | В `GuestsSlider` описан чип «Оставить заявку (VIP)» → `/contact`, но `08:119` и `07:227` тоже «white-glove ветка (VIP-менеджер)». При этом `01_VISUAL_DNA` требует деснобификацию (убрать «VIP/элитно»). Термин «VIP» в CTA противоречит деснобификации (см. `31_CODEREALITY_CRITIC.md:62-64` — «VIP» уже отмечен как лексич. баг в `TierSelector`). | Заменить «VIP-менеджер» на «персональный менеджер» в `07`/`08`, чтобы не противоречить деснобификации. |
| **C7-08** | LOW | `05_BUILD.md:43`, `41_BUILD_CHECKLIST.md:46` | Гейт Фазы 1 содержит субъективное «заказчик говорит "вау"». Объективные LCP<1.2s/INP<200ms есть, но в `05` субъективное стоит ПЕРВЫМ («ИЛИ»). | Поставить объективные метрики первыми, субъективное — как дополнение, чтобы гейт не зависел от мнения. |
| **C7-09** | LOW | `08_CONSTRUCTOR_SPEC.md:149` | `catalog.json — SSG, ISR revalidate 3600` — файла `catalog.json` НЕТ (search → 0); `04_BLOCKS.md:88,973` переводит каталог блюд в CMS-коллекцию `Dish`, НЕ хардкод `catalog.json`. Противоречие внутри стека (CMS vs хардкод json). | Либо убрать `catalog.json` из `08`, либо пометить как 🆕 источник при отсутствии CMS (fallback), синхронизировать с `04`. |

---

## 3. ВЕРДИКТ

**REWORK (7.4 / 10).**

Структура билд-дока **сильная и исполнимая**: фазы 0–6 заданы, `41_BUILD_CHECKLIST` — полный чек-лист со статусом и grep-гейтами,
версии стека актуальны и совпадают с `AGENTS.md` (проверено по `package.json`), Фаза 0 корректно требует перекраску тёмного
`globals.css` (подтверждено на диске), orphan `PhilosophySection` отмечен верно. Матмодели калькулятора/конструктора — реальные,
не заглушки.

Но для **PASS ≥8** нужно закрыть критические/средние баги реализуемости:
1. **C7-02** — зафиксировать создание `lib/pricing.ts` / `addons.json` / `hooks/useCalculator.ts` как 🆕 задачи (сейчас сборщик упадёт на импорте).
2. **C7-03** — зафиксировать `components/calculator/*` + алиас `/api/calculate`.
3. **C7-05** — дописать реальные zod-схемы (сейчас «Zod realtime» — пустое требование).
4. **C7-01/C7-04** — устранить текстовую неоднозначность по PhilosophySection и уточнить пути примитивов (`common/*` vs `effects/*`).

После правок C7-01…05 балл поднимется выше 8 (ось 5: 6→8, ось 6: 6→8, ось 9: 6→8 ⇒ среднее ≈ 8.1).

> Критическая оговорка (по `44_CODEREALITY_AUDIT`): код в репозитории — legacy/dark v1; спека опережает код. Расхождения
> спец↔код по ТЕМЕ/IA — это задачи сборки по `41`, НЕ ошибки спецы. Настоящие ошибки спецы (C7-01…09) — в ложных
> ссылках на внутренние модули и отсутствии zod-схем.

---

## 4. СТАТУС ПРОВЕРОК ЗАКАЗЧИКА (сводка)

| Вопрос | Ответ | Доказательство |
|---|---|---|
| (a) Версии совпадают с AGENTS.md, нет устаревших | ✅ ДА | `package.json:11-44` == AGENTS.md (Next 16.2.10, TW4, framer 12.42.2, lenis 1.3.25, zod 4.4.3, shadcn 4.13.0); gsap отсутствует → Framer-решение валидно |
| (b) Фаза 0: удаление тёмного globals.css + перекраска, BUG-A/orphan отмечен | ✅ ДА | `05:14-17`,`41:30` требуют; диск `globals.css:17-60` РЕАЛЬНО тёмный; `05:20`/`41:34` BUG-A закрыт; `PhilosophySection.tsx` есть+orphan (grep page.tsx→0) |
| (c) Калькулятор/конструктор реальны (zod, не заглушки) | ⚠️ ЧАСТИЧНО | матмодели реальны (`07:63-127`,`08:12-42`); **zod-схем НЕТ** (C7-05); `lib/pricing.ts`/`addons.json`/`useCalculator.ts` не существуют (C7-02) |
| (d) Нет ссылок на несуществующие файлы/компоненты | ⚠️ НЕТ (есть dangling) | `lib/pricing.ts`/`addons.json`/`hooks/useCalculator.ts`/`components/calculator/*`/`api/calculate` — не существуют и не помечены 🆕 (C7-02/03); секции/constructor/ui/effects/common — реальны |

*Финальный балл выставлен независимым критиком #7 (не автором спец и не сборщиком). Author только фиксирует вердикт.*
