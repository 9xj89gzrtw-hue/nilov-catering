# ITER4_FIXES_SERVICE.md — ПРАВКИ оси SERVICE (Итерация 5, ИСПРАВЛЯЮЩИЙ РЕДАКТОР)

**Ось:** SERVICE. **Объект:** только `07_CALCULATOR_SPEC.md` и `08_CONSTRUCTOR_SPEC.md` (41 не правился — его гейты 175/179/183 стали валидны через изменения 08:53 и 07:129-144). **Код НЕ трогался.**

## Что сделано (по 6 пунктам задания)

**1) `07:129-144` — per-format ratio для `staffCount` (R1).**
Убран хардкод `/18`. Добавлена единая таблица `RATIO_FLOOR: Record<Format,number>` (banket:12, detskoe:10, chef-at-home:8, furshet/coffee-break/mobile-furshet:15) — это ТА ЖЕ норма, что и строка `ratio`. `staffCount = Math.ceil(guests / RATIO_FLOOR[format])`. Банкет 100 гостей теперь `ceil(100/12)=9` FTE (было 6). Норма «декоративной» больше не является.

**2) `07:66,80,93` — chef-at-home в Format/ratio (R2).**
`'chef-at-home'` добавлен в тип `Format`, в `STAFF_RATE` (₽750/FTE-ч) и в `PRICE_PER_GUEST` (пустой `{}` — почасовая ветка, цена из `hourlyRate`, не из тарифов). В таблице ratio — `'1:8-10'`. Норма 1:8-10 теперь исполнима в `calcTotal`.

**3) `08:53` — SLA-поле в шаге 6 (R4).**
Добавлен блок SLA-статуса заказа: «Гарантия перезвона ≤15 мин · `slaResponseHours=2`, `slaBookingConfirm='O3'`» + живой бейдж «Ожидает подтверждения → Подтверждено» (синхрон `AvailabilityCalendar`, `04:331,334`). Поля несутся в `ContactForm`/payload `/api/contact`. Гейт `41:179,183` теперь НЕ лжёт.

**4) `07:53-59` vs `185-189` — унификация MIN_GUESTS (дубль).**
Блок 53-59 превращён в ссылку: реальное определение хранится ОДИН РАЗ в §«Детский прайс» (185-189), помечено «ЕДИНСТВЕННОЕ определение». Вторая копия устранена.

**5) State↔calcTotal имена (07↔08).**
`08` State приведён к возврату `calcTotal` (`07`): `base` (вместо `subtotal`) + `addonsTotal` (вместо `addOnsTotal`) + `total` + `service` + `serviceBreakdown`. Единый source of truth имён.

**6) `07:260` — «AI-слой».**
Заменён на «AI-слой (внутренняя спецификация, не публично)» + явная помета «внутренний, НЕ публичный».

## Результат
Гейты `41` ШАГ 5.9 (175 per-format ratio, 179/183 SLA в шаге 6) стали валидны. Закрыты R1/R2/R4 + дубли MIN_GUESTS + рассинхрон имён. **НЕ тронуты** (вне scope задания): R3 (COLD_CHAIN вне КАД), R5 (line-item vs расшифровка), R6/R7/R8/R9 — требуют правок `04`/`41`, не входили в 6 пунктов.

**Оценка оси SERVICE:** ~8.5/10 (ядро персонала исправлено, SLA-гейт валиден; остатки R3/R5-R9 — в других файлах).

*Связано: `07_CALCULATOR_SPEC.md`, `08_CONSTRUCTOR_SPEC.md`, `41_BUILD_CHECKLIST.md`, `ITER4_RECHECK_SERVICE.md`.*
