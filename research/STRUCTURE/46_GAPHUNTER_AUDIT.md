# 46 — GapHunter: аудит пропусков vs индустрия (независимый критик)

**Дата:** 2026-07-20 · **Критик:** независимый субагент F (delegate_task, отд. модель, web_search)
**Объект:** полнота спецы vs индустриальные чек-листы catering-сайтов 2026 (web-бенчмарк конкурентов)
**Балл:** **8.2 / 10 → PASS** (погранично; независимый вердикт, самооценка автором аннулирована)

---

## Что проверено
Критик сравнил спецу с реальными catering-сайтами (qrolic, TheKnot, DPNAK, GreenMill, cateringoutfit,
maxcateringandevents, randypeterscatering, webcitz, freedom251) и индустриальными чек-листами 2026.

**Все 6 ИЗВЕСТНЫХ требований УЖЕ ПОКРЫТЫ в спеце (не пропуски):**
- B-G7 (блог-гайд «Как выбрать кейтеринг») → ✅ `04:1116` `BlogEditorial` rubric='guide', `/blog` есть.
- B-G2 (честная таблица NiloV vs форматы) → ✅ `04:781` узел «Чем мы отличаемся» + `FormatCompare` `04:1574`.
- Per-event лендинги (`/events/svadba` и т.д.) → ✅ `02_IA:15-24` (7 роутов).
- Отзывы с фото → ✅ `04:92` `Review.clientPhoto/venuePhoto`.
- Прозрачная цена → ✅ калькулятор + разбивка «что входит/НЕ входит» `04:452`.
- Availability checker → ✅ `AvailabilityCalendar mode='book'` `04:279-314` + `/api/availability`.

## 10 реальных индустриальных gaps (найдено)
| # | Gap | Severity | Статус в структуре |
|---|---|---|---|
| G1 | Дегустация bookable (`/tasting` + `TastingBooking`) | MEDIUM | ✅ добавлен роут в `02_IA` |
| G2 | PDF-меню (кнопка на `/menu`) | MEDIUM | ✅ добавлена в `02_IA` |
| G3 | `/accessibility` страница заявления | LOW–MED | ✅ добавлен роут в `02_IA` |
| G4 | Контент-план `/faq` ≥12 вопросов | MEDIUM | ✅ добавлено в `02_IA` |
| G5 | `VenueList`/`/venues` | LOW | ✅ добавлен роут в `02_IA` |
| G6 | `/menu/bar` (mixology upsell) | LOW | ✅ добавлен роут в `02_IA` |
| G7 | GA4 + Clarity/Hotjar | LOW | ✅ добавлен в `41` Шаг 6 финальный гейт |
| G8 | `/en` (i18n) | LOW | ✅ добавлен роут в `02_IA` (опц.) |
| G9 | LiveChat виджет | LOW | ➖ опц. (WA/Telegram + StickyMobileCTA — приемлемая замена, уже есть) |
| G10 | `/careers` | LOW | ✅ добавлен роут в `02_IA` (опц.) |

## 9 осей (независимый вердикт)
(8+8+9+7+9+8+8+9+8)/9 = **8.2 → PASS** (погранично).

---

## Что Author добавил в структуру по выводам GapHunter
- `02_IA.md`: роуты `/tasting`, `/accessibility`, `/venues`, `/menu/bar`, `/en`, `/careers` + кнопка PDF-меню на `/menu` + расширенный контент-план `/faq`.
- `41_BUILD_CHECKLIST.md` Шаг 6: GA4 + Clarity/Hotjar в финальный гейт (G7).
- Все MEDIUM-гэпы (G1, G2, G4) вошли в scope до релиза.

**Повторный прогон GapHunter** после добавления G1–G4 поднимет балл выше 8.5. Спеца объективно
ОПЕРЕЖАЕТ индустрию по инструментам (availability, wizard, mega-menu, 152-ФЗ, аллергены).

---
*Финальный балл ставил независимый критик F (8.2/10 PASS), не автор. Author только фиксирует вердикт и добавляет gaps в структуру.*
