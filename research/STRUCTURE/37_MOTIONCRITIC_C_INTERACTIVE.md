# MOTION-КРИТИК C — Интерактивные элементы (заниженная оценка)

**Объект:** клиентские секции/формы сайта NiloV Catering (real code) + спека форм/калькулятора (`07_CALCULATOR_SPEC.md`, `08_CONSTRUCTOR_SPEC.md`).
**Роль:** независимый КРИТИК (devil's advocate, занижаем). Бенчмарк — web_search 2026.
**Дата:** 2026-07-19

Прочитано: `gallery/GalleryClient.tsx`, `menu/MenuPageClient.tsx`, `constructor/ConstructorClient.tsx`,
`sections/{CTASection,FAQSection,ServicesSection,GallerySection,TestimonialsSection}.tsx`,
`components/constructor/{GuestsSlider,StepProgress,ContactForm}.tsx`, `app/globals.css`, `components/effects/CustomCursor.tsx`.

---

## Таблица 9 осей (0–10, заниженно)

| # | Ось | Балл | Обоснование (критика) |
|---|-----|------|------------------------|
| 1 | **Уместность интерактива** (не мешает конверсии) | **5** | Меню перегружено декором: autoplay `<video>` loop в сетке + `kenburns-slow` (18s infinite) + steam-пар + warm-glow на hover. Отвлекает от CTA и ест цПУ. Главное: в конструкторе **нет running liveSummary** (цена/гость count-up), который спец 08 (B-MUX-1) объявляет обязательным — юзер идёт «вслепую» 4 шага, именно что осудил критик 25. |
| 2 | **Доступность интерактива** (focus/клавиатура/aria, WCAG 2.1.1/2.4.7) | **4** | Плюсы: FAQ-аккордеон (aria-expanded/controls/labelledby), menu/gallery фильтры (aria-pressed), StepProgress (aria-current, disabled), ContactForm (label↔id). Минусы: **нет видимого `:focus-visible` кольца** на кнопках/карточках (StepProgress, gallery, menu pills, service cards) → WCAG 2.4.7 нарушен; lightbox **без focus-trap**, фокус после закрытия не возвращается к триггеру (WCAG 2.4.3). |
| 3 | **Reduced-motion** (гасятся ли hover/scroll-эффекты) | **3** | `globals.css` гасит только CSS `animation`/`transition` (duration 0.01ms). НО Framer Motion (`initial/animate` scale/slide/y, lightbox, step x-slide, testimonials, services, FAQ height, CTA) анимирует через rAF **inline-transform** — медиа-запрос его НЕ останавливает. Прочитанные секции **не используют `useReducedMotion`** (есть только в `AnimatedSection`). Reduced-motion юзеры всё равно видят slide/fade. Autoplay-карусель отзывов не останавливается. |
| 4 | **Отзывчивость** (тап vs hover, tablet/mobile) | **4** | Много `group-hover` + `onMouseEnter/Leave` (GallerySection `hoveredIdx`, menu steam/glow) — на тач подпись категории галереи и hover-эффекты меню **никогда не показываются**. Спец 07/08 (Волна 8 K2/K3) требует `@media (hover:hover) and (pointer:fine)` + tap-to-reveal — **не реализовано**. Touch-таргеты 44px есть (плюс). Конструктор на планшете просто стекается — sticky-summary сверху (спец K5) отсутствует. |
| 5 | **Консистентность** (единый паттерн интерактива) | **5** | Filter-pills (gallery/menu) и FAQ консистентны. Но галерея реализована **ДВАЖДЫ по-разному**: `GalleryClient` (group-hover CSS) vs `GallerySection` (state `hoveredIdx` + onMouseEnter/Leave) — две парадигмы одного жеста. Lightbox продублирован с разным markup (квадратные стрелки vs круглые). `cursor-hover` размазан по всем компонентам без единого контракта. |
| 6 | **Feedback** (видимый отклик на действие) | **5** | Фильтры (gold/aria-pressed), gallery (hover+caption+lightbox), FAQ (chevron rotate+expand), testimonials (active dot/arrows), ContactForm (loading→toast→success) — ок. Провал: **нет живой цены в конструкторе** (liveSummary/count-up из спец 08 не сделан) → главная обратная связь («сколько стоит») появляется только на шаге 5. GuestsSlider показывает число, но без count-up (спец требует). |
| 7 | **Performance** (интерактив не роняет INP/CLS) | **4** | Menu: `animate-kenburns-slow` 18s infinite на десятках карточек + autoplay `<video>` loop в сетке = постоянный paint/decode, риск INP/CLS/батарея на мобильном. Menu grid `motion.div layout` + `AnimatePresence popLayout` при каждом фильтре → измерение layout всех карточек (INP-спайк). Плюс: `loading="lazy"`, `fill`+aspect резервируют место (CLS ок), `useInView once:true`. |
| 8 | **Бенчмарк** (catering/конструктор-UX 2026) | **3** | Web-search 2026: `prefers-reduced-motion` — обязательно; sticky order/reserve всегда виден; real-time/live расчёт; конфигураторы — real-time превью + «native feel» + haptic. Сайт позади И собственной спецы, И бенчмарка: нет reduced-motion в JS, нет тач-эквивалентов, нет живой цены в конструкторе, нет count-up, тяжёлый декор. «Sticky CTA» на мобильном (спец 07/08) не реализован. |
| 9 | **Безопасность** (нет dead-end/зависаний) | **6** | Нет зависаний: шаги конструктора не блокируют (назад только при `s<currentStep`), lightbox стрелки по модулю (не зацикливается), ContactForm success+reset. Но: lightbox **нет закрытия по клику на бэкдроп** (только X/Esc/стрелки); ветка `count>500` в GuestsSlider — мёртвый код (слайдер capped 500); autoplay-видео меню может «висеть»/сталлиться на слабой сети. |

**Средний балл: (5+4+3+4+5+5+4+3+6) / 9 = 39 / 9 ≈ 4.3 / 10**

---

## Bug-list (конкретные дефекты интерактива)

- **B1 (конверсия/feedback).** `ConstructorClient` не рендерит `LiveSummaryBar`/running `liveSummary` (цена/гость, count-up), обязательный по спец 08 B-MUX-1. Юзер 4 шага без цены.
- **B2 (a11y/reduced-motion).** Framer-анимации не гасятся `prefers-reduced-motion`. Только CSS в `globals.css` (animation/transition 0.01ms). Все прочитанные секции не вызывают `useReducedMotion`.
- **B3 (a11y/focus).** Lightbox: нет focus-trap; после закрытия фокус не возвращается к триггеру-картинке (WCAG 2.4.3); при открытии фокус только на кнопке X, `aria-modal` без ловушки → Tab уходит в фон.
- **B4 (a11y/WCAG 2.4.7).** Нет видимого `:focus-visible` кольца на интерактивных элементах (StepProgress, gallery, menu pills, service cards, testimonials nav). `focus:border-gold` на input = `:focus`, не `:focus-visible`.
- **B5 (консистентность).** Галерея реализована дважды разными паттернами (`GalleryClient` group-hover vs `GallerySection` `hoveredIdx`+onMouseEnter/Leave); lightbox продублирован с разным markup.
- **B6 (отзывчивость/тач).** Hover-only раскрышки (подпись категории галереи, steam/glow меню) без тач-эквивалента; спец 07/08 Волна 8 K2/K3 (`@media (hover:hover) and (pointer:fine)` + tap-to-reveal) не реализована. На тач подпись категории галереи не видна.
- **B7 (perf).** Menu: `animate-kenburns-slow` 18s infinite + autoplay `<video>` loop в сетке — постоянный paint/decode, риск INP/CLS/батарея на мобильном.
- **B8 (a11y/reduced-motion).** Testimonials: `setInterval(goNext, 6000)` не останавливается при reduced-motion; смена контента без `aria-live` (скринридер не объявляет).
- **B9 (UX).** Lightbox: нет закрытия кликом по бэкдропу (только X/Esc/←→).
- **B10 (perf/INP).** Menu grid `motion.div layout` + `AnimatePresence mode="popLayout"` пересчитывает layout всех карточек при каждом фильтре.
- **B11 (правильность vs спец).** `GuestsSlider`: quick-кнопки `[20,50,100,150,200,300,500]` — спец 08 требует видимые `[400]` и `[200]` (B-TAT-3/A1); фактически 400 отсутствует. Ветвь `count>500` — мёртвый код (max=500). Нет count-up (спец требует).
- **B12 (правильность vs спец).** `ContactForm`: нет поля «Загрузить бриф» (спец 08 B-TAT-1); `<input type=date>` без `min="+3 дней"` (спец `MIN_BOOKING_DAYS=3`).

---

## Вердикт (заниженно)

Интерактив **визуально богатый и местами корректный по ARIA** (FAQ, фильтры, StepProgress, ContactForm), но по инклюзивности, reduced-motion, тач-отклику и **живой обратной связи по цене** заметно ниже и собственной спецы (07/08), и бенчмарка catering/конструктор-UX 2026.

Топ-приоритеты до прод-релиза:
1. **Добавить liveSummary + count-up в конструктор** (B1) — критично для конверсии.
2. **Гейтить Framer через `useReducedMotion`** + остановить autoplay-карусель при reduced-motion (B2, B8).
3. **Focus-trap + возврат фокуса в lightbox, видимый `:focus-visible`** (B3, B4).
4. **Тач-эквиваленты hover-раскрышек** по спец K2/K3 (B6).
5. **Снять тяжёлый декор меню** (kenburns/autoplay-video) или ограничить до hover/reduced-motion (B7, B10).
6. **Унифицировать галерею/lightbox** в один компонент (B5), добавить закрытие по бэкдропу (B9).

**Итоговый средний балл: 4.3 / 10** — «надо доводить», не «готово к проду».
