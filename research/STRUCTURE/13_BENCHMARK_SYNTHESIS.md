# Benchmark Synthesis — что делают лучшие, и как мы стали лучше

**Метод:** реальный веб-ресьорч топовых catering/ресторан/Awwwards-сайтов (июль 2026),
затем сверка наших документов `STRUCTURE/*` и точечные улучшения. Без выдумки — только доказанное.

---

## 1. Источники (реальные)
- htmlburger «30 Beautiful Catering Websites» — Talk of the Town, Ridgewells, Global Gourmet, Relish, Queen of Hearts, Proof of the Pudding, Chowgirls…
- webcitz «12 Best Catering Websites 2026» — Immersive Menu Storytelling, real-time availability, visual social proof.
- pxlpeak «10 Best Restaurant Websites 2026» — Motion-Driven Menus, Thirsty Click, LCP<1.2s, live IG.
- digitalstrategyforce «Immersive 2026 Awwwards» — 61% SOTD = WebGL/3D; scroll-driven > static.
- Awwwards SOTD 2026: Crav Burgers, Amrit Palace, helena.london (наши референсы из blueprint).

## 2. Таблица: что у лучших → что мы делаем

| Паттерн (доказан) | Пример сайта | Было в наших доках | Стало (улучшение) |
|---|---|---|---|
| Светлый крем + акцент | Talk of the Town, Relish, Queen of Hearts | ivory+gold ✅ | + pastel/earthy tonal layering, diamond/geometric frames |
| Autoplay video hero | Proof of the Pudding, Anmol, Deborah Miller | HeroSection (УЖЕ в components/sections, перекрасить) ✅ | + диагональные линии под акцентным словом, circular frame-вариант |
| Serif+sans mix | Deborah Miller, Sopranos | Cormorant+Inter ✅ | без изменений (верно) |
| Geometric/circular frames | Proof of the Pudding, Pyramid | нет | + `--radius-circle`, фреймы на фото-карточках |
| Awards/certifications | Chef By Request, Chic Chef | нет | + `AwardsStrip` (награды 🟡, Роспотребнадзор — регулятор, НЕ клиент, 19 лет 🟡, 3000 событий 🟡 — все 🟡 НЕ подтверждены независимо, см. FACTCHECK_REPORT_2026-07-20) |
| Live social proof | Hamby, pxlpeak | нет | + `LiveInstagramFeed` (real-time UGC) |
| Sticky mobile CTA | pxlpeak «Thirsty Click» | только в calculator | + глобальный `StickyMobileCTA` |
| Ingredient storytelling | pxlpeak 2026 | только Ken Burns | + на DishCard: hover → 5-сек видео prep + origin/КБЖУ |
| Real-time availability | webcitz gold std | только в blueprint | + `AvailabilityCalendar` как блок (доверие к исполнению) |
| LCP планка | pxlpeak <1.2s | 1.5s | поднято до **<1.2s** |
| Scroll-driven > static | Awwwards 2026 | ScrollTrigger ✅ | без изменений |
| Immersive WebGL 3D | Awwwards 61% SOTD | нет | **НЕ берём в MVP** (см. §3) |

## 3. Важное решение: НЕ копируем WebGL-иммерсив
Awwwards 2026 доминирует 3D/WebGL (61% SOTD). НО:
- Для **кейтеринга цель — конверсия, не награда**. Тяжёлый WebGL бьёт по LCP/mobile/a11y.
- Наш заказчик хочет «много анимации/интерактива» — это закрывается scroll-driven + parallax + photo-alive + magnetic + count-up (уже в токенах).
- **Резерв SOTD-уровня:** лёгкий WebGL-акцент (например, интерактивный 3D-шар еды на Hero ИЛИ шейдерный фон в секции Philosophy) — только если останется ресурс и Lighthouse останется ≥95. Не в MVP.

## 4. Что мы ВЫИГРАЛИ у топов (наши уникальные фичи, которых у них нет)
- Мгновенный калькулятор + PDF-КП (webcitz: «interactive menu builders» — у нас глубже).
- Меню-конструктор мастер (у топов нет).
- Гибридная модель «сайт=преддиагностика→менеджер эксперт» (из blueprint §1.5).
- Русский комплаенс (152-ФЗ, ТР ТС 021/2011, 14 аллергенов) — у западных топов неактуально, у нас = доверие.

## 5. Итог
Наши документы уже в мейнстриме luxury (светлый+акцент, video hero, serif+sans, scroll motion).
Добавили то, чего не хватало для «лучше топов»: awards strip, live social proof, sticky mobile CTA,
ingredient storytelling, real-time calendar, geometric frames, LCP<1.2s. И сознательно НЕ берём
тяжёлый WebGL (риск для конверсии). Это и есть «сделать лучше на основе веба».
