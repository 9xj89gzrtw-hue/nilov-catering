# Калькулятор — детальная спецификация (light-adapted)

**Источник:** blueprint §3.1–3.7 (матмодель, mockup) + `NILOV_UNIFIED_MENU.md` (цены).
**Канон цен:** `NILOV_UNIFIED_MENU.md` (см. ⚠ ниже).
**Визуал:** light (токены `06_TOKENS.md`). Страница `/plan/calculator` + секция на главной.

---

## ⚠ БАГ ДАННЫХ (зафиксирован при детализации)
Blueprint §3.2 даёт цены/названия, расходящиеся с меню:
- §3.2: Фуршет Premium **3350**, имена Classic/Premium/Imperial/Royal.
- Меню: Фуршет **Стандарт 3450 / Расширенный 4350 / Премиум 5350** (Эконом/Стандарт/Расширенный/Премиум).
**Решение:** берём канон из `NILOV_UNIFIED_MENU.md`. Названия пакетов: Эконом/Стандарт/Расширенный/Премиум.

## Цены (канон, ₽/гость) — ЕДИНЫЙ ИСТОЧНИСТ
*Канон = `NILOV_UNIFIED_MENU.md`. Любые расхождения в других файлах (напр. `luxury 6500` в старом `04`) СЧИТАТЬ устаревшими.*
| Формат | Эконом | Стандарт | Расширенный | Премиум |
|---|---|---|---|---|
| Фуршет | 2 450 | 3 450 | 4 350 | 5 350 |
| Банкет | 4 470 (Эконом) | 5 470 (Стандарт) | 5 970 (Расширенный) | 6 970 (Максимальный) |
| Кофе-брейк | 950 (Эконом) | 1 450 (Стандарт) | 1 950 (Расширенный) | 2 450 (Максимальный) |
| Бизнес-ланч | 700 | 1 200 (обед) | — | — |
*Банкет: 4 тарифа (Эконом/Стандарт/Расширенный/Максимальный) — унифицирован с `04`/`08` по модели `economy|standard|premium|luxury` (C3).*

> ⚠️ **🟡 PENDING-VERIFICATION (сверка с живым сайтом заказчика):** FactChecker нашёл на
> `interfood-catering.vercel.app`, что фуршет+кофе-брейк от **390 ₽**, Корпоратив от **2 450 ₽**,
> Банкет/Свадьба от **4 470 ₽**. Это **противоречит** канону меню выше (2 450 / 950 / 4 470).
> До прод-релиза цены `NILOV_UNIFIED_MENU.md` **нужно подтвердить у заказчика** (BUG-F2).
> В spec везде используется канон меню; если заказчик утвердит 390/2450 — поменять канон меню,
> а не разбегать по файлам. (Маркер 🟡 — единый для всех неподтверждённых claims в СТРУКТУРЕ.)
> **ЕДИНАЯ 4-ступенчатая модель тарифов (C3, Волна 2, закрывает B-MAX-3/М7):** `tier: 'economy'|'standard'|'premium'|'luxury'`,
> лейблы **«Эконом / Стандарт / Расширенный / Максимальный»** для ВСЕХ форматов (фуршет/банкет/кофе-брейк/
> mobile-furshet/детский). «Люкс» — ТОЛЬКО внутренний `tier='luxury'`, НЕ показывается клиенту (отображается как «Максимальный»).
> Исключающий лейбл «Премиум» публично = `premium`-tier (отображается «Расширенный»). Синхрон с `04_BLOCKS` (блок 15 PackageGrid) и `08`.
> Устаревшие лейблы «Классик/VIP/Лёгкий/Люкс(публично)» выведены из обращения. Банкет получает
> 4-й тариф «Премиум» (6 970) вместо старого «VIP/Люкс».
>
> **[Волна 2, закрывает B-MAX-5/М6] БЮДЖЕТНЫЙ ПРЕСЕТ:** калькулятор несёт чип «Показать самое дешёвое решение» —
> при выборе (или при `event=vypusknoy`/студенческом сценарии) ставит `tier='economy'` + `format='furshet'`
> и подсвечивает «Фуршет Эконом — от 2 450 ₽/гость, самый дешёвый полноценный формат». Параллельно size-подсказке
> (B-MUX-5: 50+→Банкет) показывается бюджетная альтернатива: «Хотите дешевле? Фуршет Эконом на 50 чел = 122 500 ₽
> вместо Банкета 223 500 ₽». Рекомендация НЕ толкает вверх по цене при бюджетном фильтре.
> **[Волна 7, M2] Deep-link пресета:** чип достижим извне через `/plan/calculator?preset=cheapest`
> (economy+furshet предвыбраны, чип активен) — это та же ссылка, что у Hero-чипа «Мне нужно максимально дёшево» (см. `04` M2).
> Рядом с итогом — микро-блок честности «В цену включено: еда, посуда, доставка в КАД. Не включено: депозит 30% (возвратный), надбавка вне КАД, аддоны» (M8).
>
> **[Волна 2, закрывает B-MAX-4] FormatShowcase/«от X ₽» помечен тарифом:** любая публичная цена «от N ₽/гость»
> снабжается лейблом тарифа, напр. «Фуршет **от 2 450 ₽/гость (Эконом, минимум)**» — клиент сразу видит дно цены.

## Минимум гостей по формату — ЕДИНЫЙ ИСТОЧНИК (B4 / КР-4)
`MIN_GUESTS` = единственный источник правды, на него ссылаются и калькулятор, и конструктор (`08`), и hover-цифра `EventTypeSelector` (`04`).

> **⚠ КАНОН (одна копия, Итерация 5, S1):** определение `MIN_GUESTS` ХРАНИТСЯ ТОЛЬКО ОДИН РАЗ — см. реальное `export const MIN_GUESTS` в §«Детский прайс» ниже (`07:198-201`). Любое другое упоминание — ссылка на него, НЕ вторая копия (дублирующая копия значений/import удалена). Глобальный диапазон ввода слайдера — 10–500 (см. Edge cases: тупик 10–19 закрыт нотисом).

## Единая матфункция `calcTotal` (B2 / КР-2) — ОБЯЗАТЕЛЬНА для калькулятора И конструктора
ОДНА функция, импортируемая обоими инструментами. Две разные формулы цены ЗАПРЕЩЕНЫ.
```ts
type Format = 'furshet'|'banket'|'coffee-break'|'mobile-furshet'|'detskoe'|'chef-at-home'; // [Волна 1] +detskoe (B-OLGA-1); [Итерация 5] +'chef-at-home' (норма 1:8-10, закрывает R2)
type Tier   = 'economy'|'standard'|'premium'|'luxury'; // единая 4-ступенчатая модель для ВСЕХ форматов (C3)
interface AddOn { id: string; priceType: 'fixed'|'perGuest'; price: number; }
interface CalcOpts {
  discounts?: boolean;        // применять gamma(N) + early_booking (по умолчанию true)
  bookingDays?: number;       // дней до события → early_booking скидка
  items?: { pricePerGuest: number; qty: number }[]; // для custom-режима (qty = порций на гостя)
  extraZoneDelivery?: number; // вне КАД, ₽ (0 внутри КАД)
  childGuests?: number;       // [Волна 1, B-OLGA-5] число детей → считаются по CHILD_RATE
  serviceBreakdown?: boolean; // [Итерация 4, SERVICE] вернуть расшифровку «Сервис-норма» (staffCount/ratio/coordinator/setupHours)
}

// СТАВКИ СЕРВИС-НОРМЫ (реальное финансовое ядро, биндинг к SERVICE_DELIVERY_SPEC §1/§2/§4)
const STAFF_RATE: Record<Format, number> = {  // ₽/FTE-час по формату (заложено в базу цены)
  furshet: 650, banket: 750, 'coffee-break': 500, 'mobile-furshet': 650, detskoe: 600, 'chef-at-home': 750,
};
const COORDINATOR_FLAT = 5000;   // ₽ flat-позиция on-site координатора (1 FTE, каждое событие)
const SETUP_RATE = 650;          // ₽/ч (сетап 4 ч + страйк 3 ч = 7 ч)
const SETUP_HOURS = 7;           // §2: сетап 4 ч + страйк 3 ч
const SERVICE_STAFF_HOURS = 8;   // ₽-часы персонала на событие (норма закладывается в базу цены)
const COLD_CHAIN_COST = 0;       // ₽ — холодовая цепь (реф-фургон + логгеры) ВКЛЮЧЕНА в pricePerGuest (база еды/КАД)

const PRICE_PER_GUEST: Record<Format, Partial<Record<Tier, number>>> = {
  furshet:      { economy:2450, standard:3450, premium:4350, luxury:5350 },
  banket:       { economy:4470, standard:5470, premium:5970, luxury:6970 }, // 4 тира, унифицировано с 04 (C3)
  'coffee-break':{ economy:950, standard:1450, premium:1950, luxury:2450 },
  'mobile-furshet':{ economy:2450, standard:3450, premium:4350, luxury:5350 },
  'detskoe':    { economy:1950, standard:2450, premium:2950, luxury:3450 }, // [Волна 1, B-OLGA-5] детский прайс
  'chef-at-home':{}, // почасовая ветка (см. §Edge cases): цена НЕ из PRICE_PER_GUEST, а из hourlyRate; запись держит Record<Format> полным
};
// ПУБЛИЧНЫЕ лейблы (М7): economy→«Эконом», standard→«Стандарт», premium→«Расширенный», luxury→«Максимальный» (НЕ «Люкс»/«Премиум» — канон 04_BLOCKS: согласован с публичными лейблами тарифов).
const TIER_LABEL: Record<Tier, string> = { economy:'Эконом', standard:'Стандарт', premium:'Расширенный', luxury:'Максимальный' };

export function calcTotal(
guests: number | null, // S7: валидация 10..500 через zod ДО вызова (z.number().int().min(10).max(500)); null = ещё не выбрано. NaN/null/<=0 отсекаются guard-ом (S9).
format: Format,
  tier: Tier | 'custom',
  addons: AddOn[] = [],
  opts: CalcOpts = {}
): { base: number; discount: number; addonsTotal: number; total: number; perGuest: number; savings: number; serviceBreakdown?: { staffCount: number; ratio: string; coordinator: boolean; setupHours: number } } {
  const PRICE = PRICE_PER_GUEST[format];
  // база
  let base: number;
  if (tier === 'custom') {
    // qty = обязательный множитель порций на гостя (B7/КР-5)
    base = (opts.items ?? []).reduce((s, it) => s + it.pricePerGuest * it.qty * guests, 0);
  } else {
    const p = PRICE[tier];
    if (p === undefined) throw new Error(`Тариф ${tier} недоступен для ${format}`);
    base = p * guests;
  }
  // скидки (одинаковые для обоих инструментов)
  let discount = 0;
  if (opts.discounts !== false) {
    const gamma = 0.15 * (guests - 10) / (150 + (guests - 10)); // max 15% за объём
    const early = earlyBookingDiscount(opts.bookingDays);       // -5/-10/-15%
    // совокупная скидка = gamma + early - gamma*early (не суммируется аддитивно)
    discount = base * (gamma + early - gamma * early);
  }
  const addonsTotal = addons.reduce(
    (s, a) => s + (a.priceType === 'fixed' ? a.price : a.price * guests), 0
  );
  // СТРОКА «СЕРВИС-НОРМА» (Итерация 4, SERVICE — реальное финансовое ядро, биндинг SERVICE_DELIVERY_SPEC §1/§2/§4)
  // Норма персонала по формату (единая таблица ratio, Итерация 5, закрывает R1/R2):
  //   banket           1:12-15  → floor 12
  //   detskoe          1:10-12  → floor 10
  //   chef-at-home      1:8-10  → floor 8   (частное/chef, строже всех)
  //   furshet          1:15-20  → floor 15
  //   coffee-break     1:15-20  → floor 15
  //   mobile-furshet   1:15-20  → floor 15
  // Дефолт (любой неизвестный формат) — 1:15-20 (floor 15).
  const RATIO_FLOOR: Record<Format, number> = {
    banket: 12, detskoe: 10, 'chef-at-home': 8,
    furshet: 15, 'coffee-break': 15, 'mobile-furshet': 15,
  };
  const ratio = (format === 'banket') ? '1:12-15' : (format === 'detskoe') ? '1:10-12'
              : (format === 'chef-at-home') ? '1:8-10'
              : (format === 'mobile-furshet') ? '1:15-20' : '1:15-20';
  // staffCount берётся из ТОЙ ЖЕ таблицы ratio (floor), что и строка ratio выше → единый source of truth (R1)
  const staffCount = Math.max(1, Math.ceil(guests / RATIO_FLOOR[format]));
  const staffCost = staffCount * STAFF_RATE[format] * SERVICE_STAFF_HOURS; // персонал, заложен в базу цены
  const coordinatorCost = COORDINATOR_FLAT; // on-site координатор (ОБЯЗАТЕЛЬНО на каждом событии, §4)
  const setupCost = SETUP_RATE * SETUP_HOURS; // сетап 4 ч + страйк 3 ч (§2), заложен в базу цены
  const service = staffCost + coordinatorCost + setupCost + COLD_CHAIN_COST; // холодовая цепь включена в КАД (реф-фургон + логгеры)
  const svc: { staffCount: number; ratio: string; coordinator: boolean; setupHours: number } | undefined =
    opts.serviceBreakdown ? { staffCount, ratio, coordinator: true, setupHours: SETUP_HOURS } : undefined;
  const total = Math.max(0, base - discount + addonsTotal + (opts.extraZoneDelivery ?? 0));
  // ПРИМЕЧАНИЕ: service НЕ прибавляется к total (он уже заложен в pricePerGuest — честная расшифровка «за что платим», см. 04:1067);
  // для явного line-item-режима (04 вариант Б) — раскомментировать: total += service.
  return { base, discount, addonsTotal, total, perGuest: Math.round(total / guests), service, serviceBreakdown: svc };
}

function earlyBookingDiscount(days?: number): number {
  if (days == null) return 0;
  if (days >= 90) return 0.15;
  if (days >= 60) return 0.10;
  if (days >= 30) return 0.05;
  return 0;
}
```
**Применение:** калькулятор (`/plan/calculator`) и конструктор (`/plan/constructor`) импортируют
`calcTotal` из `lib/pricing.ts`. Скидки gamma/early_booking включены в ОБОИХ (устраняет КР-2:
раньше калькулятор считал скидки, конструктор — нет). Депозит = 30% от `total`.

## Доп. услуги — ЕДИНЫЙ КАТАЛОГ `ADDONS` (B3 / КР-3)
Единственный источник цен (дублируется в `addons.json` для обоих инструментов). Калькулятор (`07`)
и конструктор (`08` шаг 4) читают ОДИН массив, цены не разъезжаются.
```ts
export const ADDONS: AddOn[] = [
  { id:'champagne-pyramid', name:'Пирамида из шампанского', priceType:'fixed', price:7000 }, // 7000–9000, берём 7000
  { id:'bartender-show',    name:'Бармен-шоу',               priceType:'fixed', price:6000 }, // от 6000
  { id:'chocolate-fountain',name:'Шоколадный фонтан',        priceType:'fixed', price:5000 }, // от 5000
  { id:'custom-cake',       name:'Торт на заказ',            priceType:'fixed', price:3000 }, // от 3000
  { id:'sommelier',         name:'Сомелье',                  priceType:'perGuest', price:350 },
  { id:'show-station',      name:'Шоу-станция',              priceType:'perGuest', price:800 },
  { id:'masterclass',       name:'Кулинарный мастер-класс',  priceType:'perGuest', price:600 },
  { id:'eco-packaging',     name:'Эко-упаковка',             priceType:'perGuest', price:50 },
  { id:'videography',       name:'Видеосъёмка',              priceType:'fixed', price:5000 },
  { id:'floristics',        name:'Флористика',               priceType:'fixed', price:0, note:'бесплатно при свадебном банкете' },
  // [Волна 1, закрывает B-OLGA-3] Блок «Развлечения» для детских и взрослых праздников:
  { id:'animator',          name:'Аниматор / ведущий',       priceType:'fixed',     price:5000,  category:'entertainment', note:'детский праздник — обязательный аддон' },
  { id:'kids-show',         name:'Шоу-программа для детей',  priceType:'fixed',     price:4000,  category:'entertainment' },
  { id:'photo-zone',        name:'Фотозона',                 priceType:'fixed',     price:3500,  category:'entertainment' },
  { id:'face-painting',     name:'Аквагрим',                  priceType:'perGuest',  price:150,   category:'entertainment' },
];
```
*Старое расхождение устранено: 07 давал «Сомелье +350 / Шоу-станция +800 / Мастер-класс +600 / Эко +50 / Видео 5000», 08 давал «пирамида 7000 / бармен-шоу 6000 / фонтан 5000 / торт 3000 / флористика 0» — теперь это один `ADDONS`.*

## Детский прайс — ЕДИНЫЙ ИСТОЧНИК (B-OLGA-5, Волна 1)
Дети как гости считаются ДЕШЕВЛЕ взрослых. `CHILD_RATE` — множитель детской цены к `PRICE_PER_GUEST`:
```ts
export const CHILD_RATE = 0.6; // детский гость = 60% от взрослого тарифа (pending-verification, сверить с заказчиком)
// ПРИМЕНЕНИЕ (BUG-SVC-5): в calcTotal дети считаются ДЕШЕВЛЕ — base умножается на childFactor:
//   const childGuests = opts.childGuests ?? 0;
//   const adultGuests = Math.max(0, (guests ?? 0) - childGuests);
//   base = adultGuests * pricePerGuest + childGuests * pricePerGuest * CHILD_RATE;
// (где pricePerGuest = tier==='custom' ? Σ(item.pricePerGuest*item.qty) : PRICE[tier])

// дети НЕ триггерят warning MIN_GUESTS для фуршета (граница ≥20 взрослых ИЛИ детский праздник)
export const MIN_GUESTS = {
  furshet: 20, banket: 15, 'coffee-break': 10, 'mobile-furshet': 10, 'chef-at-home': 10,
  'detskoe': 10, // [Волна 1, B-OLGA-5] детский праздник: мин. 10 (20 детей = валидная граница, НЕ warning)
} as const;
// ▶️ ЭТО — ЕДИНСТВЕННОЕ определение MIN_GUESTS (Итерация 5, закрывает дубль 53-59↔185-188).
```
- **Детский праздник** — отдельный формат `detskoe` (база ≈ 1 950 ₽/гость, 🟡 pending-verification). Считается
  через ту же `calcTotal` с `format:'detskoe'`. 20 детей = граница `MIN_GUESTS.detskoe` (НЕ warning, закрывает B-OLGA-5).
- Конструктор/калькулятор: пресет «Детский праздник на N» проставляет `format='detskoe'` + авто-добавляет
  addon `animator` (обязательный) + фильтрует меню на `childFriendly` (см. `04` DishCard).

## Early-booking скидка видна ДО выбора даты (B-ANN-5 / B-MAX-8, Волна 1/2)
Скидка `earlyBookingDiscount` (−5/−10/−15% за 30/60/90 дней) заложена в `calcTotal`, НО в калькуляторе/конструкторе
она **НЕ спрятана за DatePicker**. Рядом с итогом ВСЕГДА виден инлайн-баннер:
> «Забронируйте за 60+ дней — **минус 10%** · за 90 дней — **минус 15%**» (без необходимости ставить дату).
При выборе даты в DatePicker скидка считается и показывается в `liveSummary` (`calcTotal` с `bookingDays`).
Баннер НЕ блокирует расчёт — цена видна сразу, скидка = «бонус за раннее бронирование».

**[Волна 2, закрывает B-MAX-8] Подсказка минимальной цены при раннем бронировании:** баннер дополнен
конкретным примером — «Самый дешёвый вариант: **Фуршет Эконом на 50 чел за 90+ дней = 104 125 ₽** (вместо
122 500 ₽)». Калькулятор показывает итог с `bookingDays≥90` при включённом чекбоксе «Учитывать скидку за
раннее бронирование» (по умолчанию вкл.) — Макс видит, что можно дешевле, ДО ввода даты. Скидка early_booking
суммируется с gamma по формуле `gamma + early − gamma*early` (совокупно, НЕ аддитивно).


## Компоненты
```
CalculatorApp
 ├ FormatSelector    // 4 карточки (Фуршет/Банкет/Кофе-брейк/Chef-at-home) + мини-фото, hover scale+gold border. Chef-at-home → режим почасовой оценки (базовая оценка «от 2 500 ₽/час (уточняется)» + контекст в /api/contact, B-MUX-6, см. Edge cases)
 ├ PackageSelector   // slider 4 тарифа, цена countUp (spring 400ms)
 ├ GuestsSlider      // 10–500, step 5, magnetic thumb, цифра гостей **Cormorant** 64px gold — при >500 → ветка «Оставить заявку (VIP)» → /contact (white-glove, см. A2)
 │                    // quick-buttons [20][50][100][150][200][300][400][500]  // [Волна 2, B-TAT-3] [200] добавлена; [Волна 7, A1] [400] И [500] — ВИДИМЫЕ, ПЕРВИЧНЫЕ (НЕ «опц.»): 500 трактуется как заявленная возможность, а не скрытый потолок-край слайдера. Клиент, пришедший за 500, видит [500] сразу.
 ├ AddonToggles      // карточки-чекбоксы с иконками, Framer Motion layout
 ├ AllergenFilter    // 14 чекбоксов ТР ТС 021/2011 → автоскрытие блюд
 ├ DatePicker        // календарь занятости, urgency-бейдж (реальные occupiedDates, живой счётчик свободных слотов — см. O7)
 │                    // [Волна 7, O6] DatePicker/ AvailabilityCalendar доступен ДО/параллельно расчёту:
 │                    // проверка даты НЕ зависит от выбора формата/гостей. На вкладке «Сначала проверьте дату»
 │                    // (или как отдельный блок над контролами) клиент проверяет/бронирует дату первично,
 │                    // расчёт — вторично. min по умолч. +3 полных дня (MIN_BOOKING_DAYS).
 └ ResultDisplay     // sticky: цена/гость (JetBrains Mono 80px gold), разбивка, CTA «Получить КП» (magnetic gold)
                     // [Волна 7, M8] микро-блок «ЧТО НЕ ВХОДИТ» у итога: «В цену включено: еда, посуда, доставка в КАД.
                     //   Не включено: депозит 30% (возвратный), надбавка вне КАД, аддоны (опционально)».
                     // [Волна 7, A4] SCALE-PROOF CHIP при 300+ гостях: под итогом — caption «⭐ Банкеты на 500+ — наша
                     //   специализация · штат 80+ официантов · кейс: гала-банкет 500 гостей, Эрмитаж 🟡». Конверсия премиум-доверия
                    //   ⚠️ Эрмитаж как кейс — НЕ подтверждён вебом (FACTCHECK_REPORT_2026-07-20 R1); публиковать копирайт только после сверки с заказчиком, иначе убрать кейс-имя.
                     //   к МАСШТАБУ в момент коммита крупного заказа.
```

## Волна 4 — синхронизация с 04 (Елена/Света)
- **E3/E8 (КП self-service):** `ResultDisplay` несёт кнопку **«Скачать КП (PDF)»** (`@react-pdf/renderer`, dynamic import, см. `04` БЛОК 20 E3) — генерит PDF-КП **БЕЗ обязательных контактов** (предпросмотр: формат + пример меню + итог + цена/гость). Поле «Оставить контакт для финального КП» — опц., НЕ блокирует скачивание. Экспресс-пресет **«Корпоративный юбилей на 120»** → `/plan/calculator?event=korporativ&guests=120&format=banket&tier=standard` (предзаполнение + кнопка КП, см. `04` E8).
- **E7 (Мобильный фуршет):** `FormatSelector` калькулятора показывает ровно 4 формата (Фуршет/Банкет/Кофе-брейк/Chef-at-home), НЕ «Мобильный фуршет» как отдельную карточку (он — ad-hoc опция внутри Фуршета). Консистентность с `FormatShowcase`/`04` E7.
- **S1/S6 (аллергены/дети):** `AllergenFilter` (14 чекбоксов → автоскрытие блюд) + детский пресет: при заходе `?event=detskoe` калькулятор фильтрует на `childFriendly` И предлагает чекбокс «У ребёнка аллергия: ___» → авто-фильтр `gluten-free`/`allergens` (синхрон `04` S6). Данные 14 аллергенов — `pending-verification` до bulk-импорта (`04` S1).
State: `hooks/useCalculator.ts` (как §3.6). API `POST /api/calculate` дублирует расчёт для валидации.

## Раскладка
- **Desktop:** 2 колонки — слева контролы (40%), справа ResultDisplay sticky (60%).
- **[Волна 8, закрывает K5 (Катя, iPad 768–1023)] Tablet (768–1023):** НЕ desktop-2col-60%-cramped и НЕ голый mobile-stack. Правило: **одна колонка контролов + sticky-summary СВЕРХУ** (ResultDisplay `position:sticky; top:0`, всегда видна цена при скролле) ИЛИ **2-col с расширенным summary ≥40% ширины** (не зажатые 60/40 → контролы 55% / summary 45%). Нижний sticky-CTA планшета (K1) дублирует «Получить КП». `100dvh`/safe-area (K7). Hover-tooltip разбивки → tap-to-reveal на тач (K2).
- **Mobile:** вертикальный стек, ResultDisplay fixed-bottom (сворачиваемая панель с итогом + CTA).

## Motion / Wow
- Любое изменение → price countUp + subtle haptic (mobile).
- Hover по цене → tooltip разбивки. **[Волна 8, K2/K3 (Катя, тач)]** Обёрнут в `@media (hover:hover) and (pointer:fine)`; на тач (`hover:none`) — **tap по цене открывает модалку/раскрывашку разбивки** (не hover). `«?»`-иконки — tap-to-toggle.
- Inline-баннер (публичный копирайт, без упоминания ИИ): «Добавьте шоу-станцию для вау-эффекта». *Внутренняя спец-пометка: НЕ добавлять слой «Консьерж»; AI-слой (внутренняя спецификация, не публично) — держать ТОЛЬКО во внутренних спецификациях (в резерве, не подключен), в публичный копирайт не выносить. Итерация 5: «AI-слой» явно помечен как внутренний, НЕ публичный.*
- PDF-превью КП справа, обновляется в реальном времени (<300ms, `@react-pdf/renderer` dynamic import).

## Edge cases
- **Мин. гостей по формату (B4/КР-4):** при выборе формата берём `MIN_GUESTS[format]`. Если введено `guests < MIN_GUESTS[format]` → warning «Минимум N для формата X» (НЕ generic «10»). Глобальный пол слайдера = 10, но валидация per-format.
- **Тупик 10–19 гостей (закрыт):** слайдер принимает 10–19 (глобальный пол), НО для форматов с `MIN_GUESTS > 10` (фуршет 20 / банкет 15) при `guests` в диапазоне 10–19 показываем **инлайн-нотис**: «Для <20 гостей фуршет/банкет недоступен по меню — выберите **Кофе-брейк** (от 10) или частное меню / Chef-at-home. Либо увеличьте число гостей до 20+.» Нотис не блокирует ввод (чтобы не рвать воронку), но честно закрывает разрыв обещания меню.
- Гости >500 → выделенная **white-glove ветка** «Оставить заявку (VIP-менеджер)» → **`/contact`**
  (НЕ только `/api/contact`): страница `/contact` несёт премиум-подтверждение масштаба
  **«VIP-менеджер свяжется лично · гала-банкет 500+ — индивидуально»**, передаёт контекст
  (формат/дата/гостей/опции из State). Терминология унифицирована с `08`/`04` (B8), НО с премиум-рукопожатием
  для 500+ — люкс-клиент НЕ брошен в generic-форму. См. A2 (Волна 7).
- **Chef-at-home (B11/тупик воронки → B-MUX-6, НЕ тупик):** формат НЕ входит в тировую сетку калькулятора. В `FormatSelector` добавлена опция **«Chef-at-home»**, при выборе которой калькулятор переходит в режим **почасовой оценки** (базовая ставка — `pending-verification`, требует подтверждения у заказчика) + опции (официант/сомелье из `ADDONS`):
  ```
  chefTotal = hourlyRate * hours + Σ(addon.perGuest * guests) + addonsFixed
  // hourlyRate — PENDING-VERIFICATION (уточнить у заказчика до прод-релиза)
  ```
  **Устранение тупика (синхрон с `08` B-MUX-6):** калькулятор НЕ уходит в «позвоните» без данных. Показываем **базовую оценку «от 2 500 ₽/час (уточняется)»** + пример итога от `guestCount`×`hours`×`hourlyRateBase`, пометка «точная цена после брифа менеджера». Кнопка **«Свяжитесь с менеджером»** → `/api/contact` **передаёт контекст** (формат/гостей/дата/выбранные опции из State) — это персональное предложение с данными, НЕ «позвоните» без контекста. Висячий claim «почасовая цена» из `03_JOURNEYS` устранён.
- Дата в прошлом → ошибка. **Минимальный срок — единый 3 полных дня (`MIN_BOOKING_DAYS = 3`):** дата
  ранее чем через 3 полных дня от сегодня → «Минимальный срок бронирования — 3 полных дня» (точная
  формулировка, НЕ «<3 дней»). Событие «ровно через 3 дня» = разрешено. Подсказка «Минимальный срок
  бронирования — 3 полных дня» показывается ДО выбора даты в DatePicker. Декабрь → info «Высокий сезон».
  *(Синхрон с `04` `AvailabilityCalendar.minBookingDays` и `08` шаг 6 `min=+3 дня` — противоречие
  «3 дня в калькуляторе vs tomorrow в конструкторе» устранено: везде 3 полных дня. Волна 7, O2.)*
- Пересчёт мгновенный (<50ms), без API-call на клиенте.

## A11y / Perf
- Все input → `<label>`, error через `aria-describedby`.
- Focus-visible 2px gold. Keyboard-nav по шагам.
- Цифры в `--font-mono`, разделитель тысяч — пробел, без копеек и знака валюты (`579 223`).
- Schema.org `Offer` на итоговую цену.
