# 00 — ПЛАН перезапуска структуры NiloV Catering

**Дата рестарта:** 2026-07-18 (продолжение сессии `20260718_215339_7c26fc`)
**Методология:** `website-structure-planner` (глобальный skill) — планируем ДО кода.
**ВАЖНО:** сайт в этом чате НЕ строим. Делаем только структуру + библиотеку блоков.

---

## Что было в начале сессии
- 3 «кашевых» файла в `research/`:
  - `CATERING_WEBSITE_RESEARCH_V3.md` (5307 строк, 38 разделов) — исследование рынка/UX/Awwwards/tech.
  - `PRODUCT_BLUEPRINT_V3 (2).md` (3061 строка, 24 главы) — продукт-блупринт, страницы, калькулятор, стек, фазы.
  - `NILOV_UNIFIED_MENU.md` (603 строки) — вся ценовая логика, тарифы, каталог блюд.
- В репозитории УЖЕ 22 реальные страницы (`app/`: `/`, `/menu`, `/services/*`, `/gallery`, `/constructor`, `/quote`, `/contact`, `/pricing`, `/about`, `/team`, `/testimonials`, `/faq`, `/blog`, `/offer`, `/privacy`, `/terms`, `/cookies` …). То есть «каша» не в архитектуре страниц, а в отсутствии ЕДИНОЙ визуальной системы и единой библиотеки блоков.

## Решения, зафиксированные в сессии (ДО меня)
1. **Визуальное направление — СВЕТЛОЕ, воздушное (override blueprint §1.8 «тёмный»).**
   - Blueprint §1.8 заложил тёмный фон `#0A0A0A` + gold + burgundy. Заказчик хочет светлый.
   - Это FOUNDATION-конфликт — решён ДО детализации. См. `01_VISUAL_DNA.md`.
2. **Drinkit — это сигнал, а не стиль.** Заказчику понравилось приложение Drinkit (заказ кофе), но именно потому, что там «много видео/анимации/интерактива». → Требование: насыщенный motion (photo-alive, Ken Burns, scroll-driven, marquee, count-up, sticky mobile CTA), а не копия палитры приложения.
3. **Смотрим лучшие светлые сайты и ПОВТОРЯЕМ** (не берём заложенный в blueprint дизайн как догму). Бенчмарк-шаг выполнен (см. `13_BENCHMARK_SYNTHESIS.md`).
4. **Делаем структуру, потом блоки по одному** (разбивка на изолированные контексты — чтобы не деградировать как в прошлых попытках «сделать всё за раз»).

## Почему НЕ создаём отдельный skill `web-structure-architect`
В процессе сессии встал вопрос «сохранить методологию как skill». Решено: НЕ плодить дубликат.
Глобальный `website-structure-planner` (~/.hermes/skills/web-development/) УЖЕ покрывает эту задачу
(«messy research → coherent structure», benchmark-driven, block library, executor-шаблон). Используем его.
Если позже понадобится catering-специфика — доработаем сам `website-structure-planner` (references/benchmark_sources.md уже содержит catering-кейс).

## Что KEEP из исходников / что CHANGE / что ADD

| Аспект | KEEP (из файлов) | CHANGE / OVERRIDE | ADD (из бенчмарка) |
|---|---|---|---|
| Стек | Next.js 16 + React 19 + Tailwind v4 + Framer Motion + Lenis + shadcn (gsap НЕТ в deps — reveal/parallax на Framer) | — | ничего (актуально) |
| Типографика | **Cormorant** + Inter + JetBrains Mono, шкала 1.333 | — | — |
| Цвет | gold `#C9A961` / burgundy `#722F37` как АКЦЕНТЫ | фон `#0A0A0A` → **отменён**, светлый ivory `#FAF7F2` | earthy `#7C6A55`, контрастный ink `#1C1815` |
| Меню/цены | все тарифы NILOV_UNIFIED_MENU | — | ingredient-storytelling на hover (5s video+КБЖУ+origin) |
| Страницы | 22 роута | — | AwardsStrip, LiveInstagram, StickyMobileCTA, AvailabilityCalendar |
| Motion | Framer Motion reveals (whileInView), magnetic CTA (MagneticButton УЖЕ есть) | — | Ken Burns, marquee trust-bar, parallax masonry, count-up price |
| Конверсия | 5 шагов (blueprint §1.4) | — | «Thirsty Click» sticky CTA, urgency через календарь |

## Карта документов (этой папки)
- `01_VISUAL_DNA.md` — светлая Visual Bible (палитра/типо/движение), override §1.8.
- `02_IA.md` — sitemap: 22 существующих роута, свёрнутые в КЛИЕНТСКУЮ логику (не департаментскую). **Типографика: Cormorant + Inter + JetBrains Mono** (НЕ Playfair — см. `01` §3, `06` §2, `44`).
- `03_JOURNEYS.md` — 5 персон, 4–5 сценариев, конверсионная логика по блокам.
- `04_BLOCKS.md` — БИБЛИОТЕКА БЛОКОВ (общий словарь для сборки). КЛЮЧЕВОЙ файл.
- `05_BUILD.md` — пофазная последовательность сборки + роли (architect/executor/critic) на реальных инструментах.
- `06_TOKENS.md` — конкретные дизайн-токены (Tailwind v4 `@theme`, HEX, шкала, радиусы, тени, motion).
- `07_CALCULATOR_SPEC.md` — глубокая спецификация калькулятора (математика из blueprint §3).
- `08_CONSTRUCTOR_SPEC.md` — глубокая спецификация конструктора меню (blueprint §18, уникальная фича).
- `09_HERO_STORYBOARD.md`, `10_FORMAT_SHOWCASE_STORYBOARD.md`, `11_GALLERY_TEASER_STORYBOARD.md` — текстовые раскадровки.
- `12_BLOCK_EXECUTOR_PROMPT.md` — переиспользуемый шаблон промпта для субагента-исполнителя (скопирован из skill).
- `13_BENCHMARK_SYNTHESIS.md` — «что делают топы → что сделали мы → что улучшили», реальные URL.
- `14_GAP_ANALYSIS.md` — что из исходников осело, что в резерве, честные пропуски.
- `15_REPO_AUDIT.md` — сверка структуры с реальным репозиторием: что уже есть/тёмное/сломано, план перекраски+переименования (Фаза 0 = перекраска, не с нуля).
- `16_BLOCK_BENCHMARKS.md` — лучшая в мире реализация КАЖДОГО из ~30 блоков библиотеки (`04_BLOCKS.md`): блоки #1–#30 (вкл. #30 FIRST-LOAD эффект) покрыты с реальными источниками 2026 + как у нас сделать лучше.
- `17_MEDIA_DIRECTION.md` — фото/видео для нового сайта: 5 типов кадров (foodshot.ai), формат «как в Drinkit» (loop-живые), behind-scenes (cynthiaconcierge), откуда брать для прототипа (сток/демо), единый стиль, чек-лист по блокам.
- `18_CRITIC_SYSTEM.md` — система НЕЗАВИСИМОЙ самокритики: rubric (9 осей, фикс. веса, как Awwwards), независимый Critic-агент (др. модель, блокирует preference leakage ICLR 2026), FactChecker+Architect с ОБЯЗАТЕЛЬНЫМ интернетом, объективные метрики (CWV/a11y) как якорь, правила против self-bias. Автор НЕ оценивает себя.
- `19_BLOCK_CRITICS.md` — конкретный критик для КАЖДОГО из 31 блока (`04_BLOCKS`): ❌-условия + ссылки на benchmark/`spec`.
- `20_CRITIC_RESULTS.md` — сводка оценок: блочные (Ит.1→3: 0 PASS→31 REWORK), структурные (5.2/10), меню (4.75/10). Все REWORK, PASS только после сборки+замеров.
- `21_LOGIC_AUDIT.md` — отчёт LogicAuditor: рассинхрон цен (Люкс 6500 vs 5350), формула калькулятора≠конструктора, тупики воронки.
- `22_COHERENCE_REPORT.md` — отчёт CoherenceChecker: дрейф токенов, 3 slug'а «Свадьба», разнобой CTA-глагола.
- `23_MENU_STRATEGY.md` — НОВОЕ продающее меню (не копия интерфуда): эталонный список 60–90 SKU + 6 тренд-якорей 2026 (вернули сильное из старого + добавили global small plates / plant-based / interactive stations / grazing / dessert stations / signature mocktails).
- `24_MENU_CRITIC.md` — отчёт MenuCritic (3.7/10): продажность/полнота/потребности, эталонный список позиций, bug-list B1–B11.
- `25_MENU_UX_CRITIC.md` — отчёт MenuUXCritic (5.8/10): удобство/красота/понятность/запоминаемость, сравнение с эталонами П1–П6 (`16`#31), bug-list B-MUX-1..8.
- `26_VIDEO_ARCHIVE_TASK.md` — ТЗ: куда засунуть видео заказчика (6 мест из `17`§8: EventRecap-лента / Hero-ротация / Wall of Love / behind-scenes / ShowCooking / Gallery video). Запуск исполнителя 6 ПОСЛЕ волны 1.
- `39_CANON_INDEX.md` — мост спека↔код (шрифты/тема/блоки/роуты), читать ДО `04`.
- `40_BUILDDOC_CRITIC.md` — независимый вердикт критика A (6.0/10 REWORK) по удобству сборки.
- `41_BUILD_CHECKLIST.md` — единый чек-лист сборки (Шаги 0–6, статус блоков, grep-гейты).
- `42_NAV_UX_AUDIT.md` — независимый вердикт критика B (2.78/10 FAIL) по навигации.
- `43_NAV_SPEC.md` — целевая спецификация навигации (канон роутов, визуальная раскладка §6, покрытие §7).
- `44_CODEREALITY_AUDIT.md` — независимый вердикт критика C (2.1/10 FAIL) по рассинхрону спека↔код.
- `45_FACTCHECK_AUDIT.md` — независимый вердикт критика D (3.67/10 FAIL) по факт-claim'ам.
- `46_GAPHUNTER_AUDIT.md` — независимый вердикт критика F (8.2/10 PASS) по индустриальным gaps.
- `47_COHERENCE_AUDIT.md` — независимый вердикт критика E (6.67→7.2/10 REWORK) по внутр. согласованности; итоговый повторный прогон A/E (7.7/7.2 → после R1–R5 ждём PASS >8).

> **Критики A–F** — независимые субагенты (отд. модель, без self-bias). Автор НЕ ставит финальный балл. См. `18_CRITIC_SYSTEM` §5 + SOUL.md.

> См. связанный skill `self-critic-system` (software-development/) — переиспользуемая система независимой критики.

## Следующий шаг (после выдачи структуры)
ОСТАНОВИТЬСЯ и спросить пользователя, прежде чем собирать. Сборка = пофазно, блок за блоком, через executor-субагентов.
