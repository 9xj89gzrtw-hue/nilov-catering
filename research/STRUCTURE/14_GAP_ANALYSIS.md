# GAP-анализ — что проверили, что есть, что забыли

**Повод:** проверка «всё ли из 3 исходных файлов осело в структуру + не упустили ли
паттерны из свежего веба». Датировано июль 2026.

---

## 1. Что из исходников УЖЕ в структуре (ок)
- Ценообразование/тарифы → `NILOV_UNIFIED_MENU.md` → `07_CALCULATOR_SPEC`, `04_BLOCKS` (PackageGrid, MenuCatalog).
- Калькулятор/конструктор → `07`, `08`.
- Персоны/воронка → `03_JOURNEYS`.
- Боли клиентов (порции/остынет/вкус/цена/сложность) → отражены в TrustBar/AwardsStrip/AvailabilityCalendar/ProcessSteps.
- Юр. комплаенс (152-ФЗ, ТР ТС 021/2011, 14 аллергенов) → `07` (аллерген-фильтр), `04_BLOCKS` (ContactForm чекбокс), footer-бейдж.
- Show-cooking станции → `04_BLOCKS` (ShowCookingGrid).

## 2. Что из исходников СОЗНАТЕЛЬНО в резерве (не забыто, а отложено)
AR-меню, Консьерж (AI-модель в резерве, не подключена; публично — «Консьерж»/«Помощник», детерминированный wizard, НЕ «AI»)/чат-бот, голосовой поиск, личный B2B-кабинет, Admin CMS, ЮKassa.
Обоснование: не влияют на «дорогой вид» в MVP; веб их НЕ называет must-have для конверсии кейтеринга.

## 3. ЧЕСТНЫЕ ПРОПУСКИ (нашли в вебе, добавляем)

| Пропуск | Источник веба | Решение |
|---|---|---|
| **Team page отдельно** | cateringrewards (2026): «buyers trust people as much as food»; 24 Carrots ведёт с командой | `/team` → отдельная страница (не только секция в /why-us). Доверие = лица. |
| **Blog как SEO-двигатель** | webcitz/htmlburger хвалят блог; gofoodservice/hallam: schema + local SEO | `/blog` + editorial-стратегия (кейсы, сезонные советы, «как выбрать кейтеринг»). Блок `BlogEditorial`. |
| **Сезонные модули** | bettercater summer 2026; blueprint §имел сезон. ротацию | блок `SeasonalModule` (ББQ лето, Новый год, Масленица) как повторяющаяся секция. |
| **Schema.org + llms.txt** | blueprint §9/§20; gofoodservice: «structured data helps AI systems» | явная задача в Фазе 2: JSON-LD (Organization, LocalBusiness, Menu, Offer, FAQPage, AggregateRating) + `llms.txt` + `sitemap.xml` + `robots.txt`. |
| **Interactive food stations** (персонализация) | caterease 2026, tablacatering 2026 | усилить `ShowCookingGrid` → «интерактивные станции» как wow + персонализация (уже есть, подсвечиваем). |
| **Accessibility/transparency как trust** | hooray.agency 2026: «accessibility and transparency now decide trust» | вынести в отдельный чек-лист аудита (уже в 05, но добавить «прозрачность цен/состава» как блок TrustProof). |

## 4. Что НЕ добавляем (и почему)
- Careers/Вакансии — в исходниках нет, для конверсии клиента не нужно.
- Multi-language — рынок СПб/РФ, RU-first достаточно.
- Marketplace/агрегаторы — не наша модель.

## 5. Итог
Из 3 файлов ничего критичного НЕ потеряно (функционал покрыт). Добавили 4 реальных
пропуска, подтверждённых свежим вебом: Team page, Blog-стратегия, Seasonal модули,
Schema/llms.txt. Структура теперь полна.
