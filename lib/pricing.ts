// Единая функция расчёта стоимости — используется калькулятором И конструктором
// Источник: 07_CALCULATOR_SPEC (канон цен NILOV_UNIFIED_MENU)
import type { Format, Tier, AddOn } from './types';
import type { PricingData } from './pricing-types';
import { DEFAULT_PRICING } from './pricing-types';
import {
  STAFF_RATE,
  STAFF_RATIO,
  COORDINATOR_FLAT,
  SETUP_RATE,
  SETUP_HOURS,
  SERVICE_STAFF_HOURS,
  CHILD_RATE,
  EARLY_BOOKING_30,
  EARLY_BOOKING_60,
  EARLY_BOOKING_90,
  GAMMA_MAX,
  CHEF_HOURLY_RATE_BASE,
} from './constants';

export interface CalcOpts {
  discounts?: boolean;
  bookingDays?: number;
  items?: { pricePerGuest: number; qty: number }[];
  extraZoneDelivery?: number;
  childGuests?: number;
  serviceBreakdown?: boolean;
  /** CMS-цены (fallback на хардкод) */
  pricing?: PricingData;
}

export interface CalcResult {
  base: number;
  discount: number;
  addonsTotal: number;
  total: number;
  perGuest: number;
  savings: number;
  service: number;
  serviceBreakdown?: {
    staffCount: number;
    ratio: string;
    coordinator: boolean;
    setupHours: number;
  };
}

export function calcTotal(
  guests: number | null,
  format: Format,
  tier: Tier | 'custom',
  addons: AddOn[] = [],
  opts: CalcOpts = {},
): CalcResult {
  const prices = opts.pricing?.pricePerGuest || DEFAULT_PRICING.pricePerGuest;

  // Guard: null/NaN/<=0 guests → zero result
  if (guests === null || isNaN(guests) || guests <= 0) {
    return {
      base: 0,
      discount: 0,
      addonsTotal: 0,
      total: 0,
      perGuest: 0,
      savings: 0,
      service: 0,
    };
  }

  const g = guests;
  const childG = opts.childGuests ?? 0;
  const adultG = Math.max(0, g - childG);
  const effectiveGuests = adultG + childG * CHILD_RATE;

  // 1. База
  let base: number;
  if (tier === 'custom' && opts.items && opts.items.length > 0) {
    base = opts.items.reduce((sum, item) => sum + item.pricePerGuest * item.qty * g, 0);
  } else if (format === 'chef-at-home') {
    base = CHEF_HOURLY_RATE_BASE * SERVICE_STAFF_HOURS;
    // Для chef-at-home база фиксированная почасовая
  } else {
    const t = tier === 'custom' ? 'standard' : tier;
    const price = prices[format]?.[t] ?? 0;
    base = price * effectiveGuests;
  }

  // 2. Сервис-норма (заложена в базу, здесь для прозрачности)
  const ratio = STAFF_RATIO[format] ?? 20;
    const staffCount = Math.ceil(g / ratio);
    const service = format === 'chef-at-home'
    ? 0
    : (STAFF_RATE[format] * SERVICE_STAFF_HOURS * staffCount + COORDINATOR_FLAT + SETUP_RATE * SETUP_HOURS);

  // 3. Скидки (combined: gamma + early - gamma*early)
  let discount = 0;
  if (opts.discounts !== false) {
    // Gamma-скидка: 0.15*(N-10)/(150+(N-10)), max 15%
    if (g > 10) {
      const gamma = Math.min(GAMMA_MAX, 0.15 * (g - 10) / (150 + (g - 10)));
      discount += base * gamma;
    }
    // Early-booking (комбинируется: gamma + early - gamma*early)
    let earlyRate = 0;
    if (opts.bookingDays && opts.bookingDays >= 90) {
      earlyRate = EARLY_BOOKING_90;
    } else if (opts.bookingDays && opts.bookingDays >= 60) {
      earlyRate = EARLY_BOOKING_60;
    } else if (opts.bookingDays && opts.bookingDays >= 30) {
      earlyRate = EARLY_BOOKING_30;
    }
    if (earlyRate > 0) {
      // combined: gamma + early - gamma*early (через discount уже содержит gamma*base)
      const gammaRate = g > 10 ? Math.min(GAMMA_MAX, 0.15 * (g - 10) / (150 + (g - 10))) : 0;
      discount = base * (gammaRate + earlyRate - gammaRate * earlyRate);
    }
  }

  // 4. Аддоны
  const addonsTotal = addons.reduce((sum, a) => {
    if (a.priceType === 'perGuest') return sum + a.price * g;
    return sum + a.price;
  }, 0);

  // 5. Доставка вне КАД
  const delivery = opts.extraZoneDelivery ?? 0;

  // Итого
  const total = base - discount + addonsTotal + delivery;
  const perGuest = g > 0 ? Math.round(total / g) : 0;

  // 6. Savings vs Максимальный (luxury tier)
  const maxPrice = prices[format]?.['luxury'] ?? base * 1.5;
  const maxBase = format === 'chef-at-home' ? base * 1.5 : maxPrice * effectiveGuests;
  const savings = Math.max(0, maxBase - total);

  const result: CalcResult = {
    base: Math.round(base),
    discount: Math.round(discount),
    addonsTotal: Math.round(addonsTotal),
    total: Math.round(total),
    perGuest,
    savings: Math.round(savings),
    service: Math.round(service),
  };

  if (opts.serviceBreakdown) {
    const ratio = STAFF_RATIO[format] ?? 20;
    const sc = Math.ceil(g / ratio);
    result.serviceBreakdown = {
      staffCount: sc,
      ratio: `1:${ratio}`,
      coordinator: true,
      setupHours: SETUP_HOURS,
    };
  }

  return result;
}

// Реэкспорт для совместимости (через DEFAULT_PRICING)
export { DEFAULT_PRICING as DEFAULT_PRICING_EXPORT };