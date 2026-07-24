import type { Format } from './types';
import type { Tier, AddOn } from './types';

// ═══════════════════════════════════════════
// Минимум гостей по формату (07_CALCULATOR_SPEC)
// ═══════════════════════════════════════════
export const MIN_GUESTS: Record<Format, number> = {
  furshet: 20,
  banket: 15,
  'coffee-break': 10,
  'mobile-furshet': 10,
  detskoe: 10,
  'chef-at-home': 10,
};

// Глобальный диапазон слайдера
export const GUESTS_MIN = 10;
export const GUESTS_MAX = 500;
export const GUESTS_STEP = 5;

// Детский коэффициент
export const CHILD_RATE = 0.6;

// Минимальный срок бронирования (полных дней)
export const MIN_BOOKING_DAYS = 3;

// Скидки
export const EARLY_BOOKING_30 = 0.05;
export const EARLY_BOOKING_60 = 0.10;
export const EARLY_BOOKING_90 = 0.15;

// Gamma-скидка: 0.15*(N-10)/(150+(N-10)), max 15%
export const GAMMA_MAX = 0.15;

// Chef-at-home
export const CHEF_HOURLY_RATE_BASE = 2500;

// Сервис-норма
export const STAFF_RATE: Record<Format, number> = {
  furshet: 650, banket: 750, 'coffee-break': 500,
  'mobile-furshet': 650, detskoe: 600, 'chef-at-home': 750,
};
/** Соотношение гостей к персоналу: FLOOR = больше персонала. ceil(g / ratio) */
export const STAFF_RATIO: Record<Format, number> = {
  furshet: 15, banket: 12, 'coffee-break': 15,
  'mobile-furshet': 15, detskoe: 10, 'chef-at-home': 8,
};
export const COORDINATOR_FLAT = 5000;
export const SETUP_RATE = 650;
export const SETUP_HOURS = 7;
export const SERVICE_STAFF_HOURS = 8;

// Quick-кнопки гостей
export const GUEST_QUICK_BUTTONS = [10, 20, 50, 100, 150, 200, 300, 500];

// ═══════════════════════════════════════════
// Цены — ЕДИНЫЙ ИСТОЧНИК ПРАВДЫ: tariff-offers.ts через getPricesForFormat
// Чтобы цены на сайте не расходились между UI и calcTotal
// ═══════════════════════════════════════════
// Используется в lib/pricing.ts (calcTotal) для расчёта стоимости
// Берётся из tariff-offers.ts — единый источник с UI
// (lib/tariff-offers.ts -> getPricesForFormat -> PRICE_PER_GUEST)

// Чтобы избежать циклической зависимости — дублируем цены здесь.
// Эти значения ДОЛЖНЫ совпадать с lib/tariff-offers.ts (SVADBA, KORPORATIV, DETSKOE, CHEF_AT_HOME)
// и COFFEE_BREAK_PRICES. Если правите тут — правьте и в tariff-offers.ts.
export const PRICE_PER_GUEST: Record<Format, Partial<Record<Tier, number>>> = {
  // furshet ← CHASTNOE (см. tariff-offers.ts: economy=2450, standard=3950, premium=5950, luxury=нет)
  furshet:          { economy: 2450, standard: 3950, premium: 5950 },
  // banket ← SVADBA (economy=3950, standard=5470, premium=7350, luxury=9950)
  banket:           { economy: 3950, standard: 5470, premium: 7350, luxury: 9950 },
  // coffee-break ← COFFEE_BREAK_PRICES (нет в tariff-offers, захардкожено)
  'coffee-break':   { economy: 390,  standard: 1450, premium: 1950, luxury: 2450 },
  'mobile-furshet': { economy: 2450, standard: 3950, premium: 5950 },
  // detskoe ← DETSKOE (economy=1550, standard=2450, premium=3450, luxury=нет)
  detskoe:          { economy: 1550, standard: 2450, premium: 3450 },
  // chef-at-home ← CHEF_AT_HOME (economy=4500, standard=7500 — hourly, не perGuest)
  'chef-at-home':   {},
};

export const ADDONS: AddOn[] = [
  {
    id: 'pyramid', name: 'Пирамида из бокалов',
    description: 'Эффектная подача напитков', priceType: 'fixed', price: 7000,
    category: 'service', formats: ['furshet', 'banket'],
  },
  {
    id: 'bartender', name: 'Бармен-шоу',
    description: 'Профессиональный бармен с программой', priceType: 'fixed', price: 6000,
    category: 'entertainment', formats: ['furshet', 'banket', 'detskoe'],
  },
  {
    id: 'fountain', name: 'Шоколадный фонтан',
    description: 'Фонтан с фруктами и сладостями', priceType: 'fixed', price: 5000,
    category: 'entertainment', formats: ['furshet', 'banket', 'detskoe'],
  },
  {
    id: 'cake', name: 'Торт на заказ',
    description: 'Индивидуальный торт от кондитера', priceType: 'fixed', price: 3000,
    category: 'service', formats: ['banket', 'detskoe'],
  },
  {
    id: 'sommelier', name: 'Сомелье',
    description: 'Подбор вин к меню', priceType: 'perGuest', price: 350,
    category: 'service', formats: ['banket'],
  },
  {
    id: 'show-station', name: 'Шоу-станция',
    description: 'Приготовление блюд на глазах у гостей', priceType: 'perGuest', price: 800,
    category: 'entertainment', formats: ['furshet', 'banket'],
  },
  {
    id: 'masterclass', name: 'Мастер-класс',
    description: 'Кулинарный мастер-класс для гостей', priceType: 'perGuest', price: 600,
    category: 'entertainment', formats: ['furshet', 'detskoe'],
  },
  {
    id: 'eco-pack', name: 'Эко-упаковка',
    description: 'Биоразлагаемая посуда и упаковка', priceType: 'perGuest', price: 50,
    category: 'service', formats: ['furshet', 'coffee-break', 'detskoe'],
  },
  {
    id: 'video', name: 'Видеосъёмка',
    description: 'Профессиональная съёмка события', priceType: 'fixed', price: 5000,
    category: 'tech', formats: ['banket', 'detskoe'],
  },
  {
    id: 'florist', name: 'Флористика',
    description: 'Оформление цветами (бесплатно при свадьбе)', priceType: 'fixed', price: 0,
    category: 'decoration', formats: ['banket'],
  },
  {
    id: 'animator', name: 'Аниматор',
    description: 'Детский аниматор с программой', priceType: 'fixed', price: 5000,
    category: 'entertainment', formats: ['detskoe'],
  },
  {
    id: 'kids-show', name: 'Шоу-программа для детей',
    description: 'Мыльные пузыри, фокусы, игры', priceType: 'fixed', price: 4000,
    category: 'entertainment', formats: ['detskoe'],
  },
  {
    id: 'photo-zone', name: 'Фотозона',
    description: 'Тематическая фотозона с реквизитом', priceType: 'fixed', price: 3500,
    category: 'decoration', formats: ['furshet', 'banket', 'detskoe'],
  },
  {
    id: 'face-paint', name: 'Аквагрим',
    description: 'Аквагрим для детей', priceType: 'perGuest', price: 150,
    category: 'entertainment', formats: ['detskoe'],
  },
];