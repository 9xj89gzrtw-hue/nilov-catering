// Сервис-норма NiloV Catering (SERVICE_DELIVERY_SPEC §1-4)
// Единый источник для калькулятора / конструктора / ProcessSteps

import type { Format } from './types';

// Норма персонала по типу события (гостей : 1 FTE)
// §1: банкет 1:12-15, chef-at-home/частное 1:8-10, фуршет/кофе-брейк 1:15-20
export const STAFF_RATIO: Record<Format, { min: number; max: number }> = {
  banket: { min: 12, max: 15 },
  furshet: { min: 15, max: 20 },
  'coffee-break': { min: 15, max: 20 },
  'mobile-furshet': { min: 15, max: 20 },
  detskoe: { min: 8, max: 10 },
  'chef-at-home': { min: 8, max: 10 },
};

export function getStaffCount(guests: number, format: Format): number {
  const ratio = STAFF_RATIO[format] ?? { min: 15, max: 20 };
  return Math.ceil(guests / ratio.min);
}

// Зоны доставки (КАД + области)
export interface DeliveryZone {
  id: string;
  name: string;
  distance: string;
  surcharge: number;      // 0 = внутри КАД
  coldChain: boolean;     // холодовая цепь доступна
  slaHours: number;       // время реакции
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  { id: 'kad', name: 'В пределах КАД', distance: 'до 30 км', surcharge: 0, coldChain: true, slaHours: 2 },
  { id: 'zone1', name: 'Зона 1 (до 50 км)', distance: '30–50 км', surcharge: 3000, coldChain: true, slaHours: 3 },
  { id: 'zone2', name: 'Зона 2 (до 80 км)', distance: '50–80 км', surcharge: 5000, coldChain: true, slaHours: 4 },
  { id: 'zone3', name: 'Зона 3 (до 120 км)', distance: '80–120 км', surcharge: 8000, coldChain: false, slaHours: 6 },
];

// SLA (SERVICE_DELIVERY_SPEC §6)
export const SLA_RESPONSE_HOURS = 2;
export const SLA_BOOKING_CONFIRM = 'O3';   // O3 = в течение 3 дней после заявки
export const POST_EVENT_FOLLOWUP_HOURS = 24;
