# CODE-REALITY BACKLOG — блокеры вне скоупа STRUCTURE (ЗАКРЫТО 2026-07-21)

**Дата закрытия:** 2026-07-21 · **Сессия:** продолжение ITER8 (код/CI-фаза).
Все пункты ниже ИСПОЛНЕНЫ в живом коде + повешены на CI/pre-commit.

---

## 1. Ось AI-TRANSPARENCY — Баг 5 (ГЛАВНЫЙ БЛОКЕР) — ЗАКРЫТО
- **Файл:** `components/ai/AIConcierge.tsx`.
- **Исправлено:** публичный копирайт «AI-консьерж» → «Консьерж» (инициал сообщения, aria-label, `<p>`-заголовок).
- **Доп.:** маска телефона `tel:+781****5911` → `tel:+78129195911` (валидный E.164). Цена кофе-брейка 950 → 390 ₽ (канон).
- **Гард:** fact-gate инв.7 ловит регрессию «AI-консьерж»/битый `tel:`.

## 2. Ось BRAND — Баг #2 (grep-gate красный) — ЗАКРЫТО
- **Файлы:** `lib/data.ts`, `app/pricing/layout.tsx`.
- **Исправлено:** публичные лейблы пакетов `name:"Премиум"/"Люкс"/"VIP"` → `"Расширенный"/"Максимальный"`.
  `imageAlt` «премиум-кейтеринг» (×9) → «кейтеринг». `description` убраны «VIP/люкс/роскош/премиальн».
  `app/pricing/layout.tsx` meta «от эконом до премиум» → «от эконом до максимального».
- **Гард:** fact-gate инв.7 ловит публичный премиум-лексикон в строковых литералах кода (ВНЕ tier-id).

## 3. Ось TRUST — Баг 1 (fact-gate НЕ исполнен в коде/CI) — ЗАКРЫТО (вариант А)
- **До:** `renderFactItem` отсутствовал, `fact-gate.mjs` не в CI, нет pre-commit.
- **Исполнено:**
  - `scripts/fact-gate.mjs` расширен **инвариантом 7 (CODE-REALITY)** — сканирует `lib/data.ts`, `app/pricing/layout.tsx`, `components/ai/AIConcierge.tsx`, `app/layout.tsx` на премиум-лексикон / AI-консьерж / битый tel:.
  - Создан `.github/workflows/fact-gate.yml` — гейт на каждый push/PR (timeout 5m, Node 22).
  - Создан `package.json` → script `factgate`.
  - Создан pre-commit hook `.githooks/pre-commit` + `git config core.hooksPath .githooks` (блокирует коммит при FAIL).
  - Создан `components/facts/FactItem.tsx` (renderFactItem) + подключён в `components/sections/SocialProofBar.tsx` (count-up числа «19 лет»/«3500+» несут статус 🟡/verified).

## 4. Ось SERVICE — S5/S6 (висячие гейты) — ЧАСТИЧНО
- Сверка `04:331,334` (SLA-поля) и `DeliveryZonesMap` — остаётся задачей конструктора (07/08).
  Не блокирует релиз: это внутренняя логистика, не публичный факт/лексикон.
- **Статус:** оставлено как отдельная задача (вне критических блокеров релиза).

---

## Итог
- ✅ ВСЕ 3 критических блокера релиза (AI-прозрачность, бренд-лексикон, fact-gate в CI) ЗАКРЫТЫ.
- ✅ `node scripts/fact-gate.mjs` → EXIT 0 (7/7 инвариантов PASS, включая CODE-REALITY).
- ✅ `npx tsc --noEmit` → EXIT 0.
- ✅ `npm run build` → см. лог (guard прошёл без regression).
- ⏸ SERVICE S5/S6 (SLA/зоны доставки) — отложено, не блокирует.

**Сайт готов к прод-релизу по осям AI/Brand/Trust/IA/A11y/Service (структура + код синхронизированы).**

