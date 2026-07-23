'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ALL_DISHES } from '@/lib/menu-data';
import { DELIVERY_ZONES } from '@/lib/service-spec';

// Минимальная сумма заказа для доставки
export const MIN_ORDER_AMOUNT = 5000;

// Слоты времени доставки
export const TIME_SLOTS = [
  { id: 'morning', label: 'Утро (09:00–12:00)', icon: '🌅' },
  { id: 'day', label: 'День (12:00–15:00)', icon: '☀️' },
  { id: 'afternoon', label: 'Полдень (15:00–18:00)', icon: '🌇' },
  { id: 'evening', label: 'Вечер (18:00–21:00)', icon: '🌆' },
  { id: 'night', label: 'Поздний вечер (21:00–23:00)', icon: '🌙' },
] as const;

export interface DeliveryCartItem {
  dishId: string;
  qty: number; // количество порций
}

export interface DeliveryCartState {
  _hasHydrated: boolean;
  setHasHydrated: () => void;

  items: DeliveryCartItem[];

  // Контактные данные
  contact: {
    name: string;
    phone: string;
    address: string;
    apartment: string;
    date: string;     // ISO date (YYYY-MM-DD)
    timeSlot: string; // id из TIME_SLOTS
    comment: string;
  };

  // Выбранная зона доставки
  zoneId: string;

  // Опции
  needThermobox: boolean; // аренда термобокса (для зон без холодовой цепи)

  // Actions
  addDish: (dishId: string) => void;
  removeDish: (dishId: string) => void;
  setQty: (dishId: string, qty: number) => void;
  reorderItems: (fromIdx: number, toIdx: number) => void;
  clearItems: () => void;

  setContact: (c: Partial<DeliveryCartState['contact']>) => void;
  setZone: (zoneId: string) => void;
  setThermobox: (need: boolean) => void;

  reset: () => void;
}

const THERMOBOX_PRICE = 1500; // залог за термобокс

const DISH_MAP = new Map(ALL_DISHES.map(d => [d.id, d]));

const INITIAL_CONTACT = {
  name: '',
  phone: '',
  address: '',
  apartment: '',
  date: '',
  timeSlot: 'day',
  comment: '',
};

export const useDeliveryCart = create<DeliveryCartState>()(
  persist(
    (set, get) => ({
      _hasHydrated: false,
      setHasHydrated: () => set({ _hasHydrated: true }),

      items: [],
      contact: { ...INITIAL_CONTACT },
      zoneId: 'kad',
      needThermobox: false,

      addDish: (dishId) => {
        const items = get().items;
        const existing = items.find(i => i.dishId === dishId);
        if (existing) {
          set({ items: items.map(i => i.dishId === dishId ? { ...i, qty: i.qty + 1 } : i) });
        } else {
          set({ items: [...items, { dishId, qty: 1 }] });
        }
      },

      removeDish: (dishId) => {
        set({ items: get().items.filter(i => i.dishId !== dishId) });
      },

      setQty: (dishId, qty) => {
        const next = Math.max(0, Math.min(999, qty));
        if (next === 0) {
          set({ items: get().items.filter(i => i.dishId !== dishId) });
        } else {
          set({
            items: get().items.map(i =>
              i.dishId === dishId ? { ...i, qty: next } : i
            ),
          });
        }
      },

      reorderItems: (fromIdx, toIdx) => {
        const items = [...get().items];
        if (fromIdx < 0 || fromIdx >= items.length || toIdx < 0 || toIdx >= items.length) return;
        const [moved] = items.splice(fromIdx, 1);
        items.splice(toIdx, 0, moved);
        set({ items });
      },

      clearItems: () => set({ items: [] }),

      setContact: (c) => set(s => ({ contact: { ...s.contact, ...c } })),
      setZone: (zoneId) => {
        // Если выбрана зона без холодовой цепи — автоматически включаем термобокс
        const zone = DELIVERY_ZONES.find(z => z.id === zoneId);
        set({ zoneId, needThermobox: zone ? !zone.coldChain : get().needThermobox });
      },
      setThermobox: (need) => set({ needThermobox: need }),

      reset: () => set({
        items: [],
        contact: { ...INITIAL_CONTACT },
        zoneId: 'kad',
        needThermobox: false,
      }),
    }),
    {
      name: 'nilov-delivery-cart',
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated();
      },
      partialize: (s) => ({
        items: s.items,
        contact: s.contact,
        zoneId: s.zoneId,
        needThermobox: s.needThermobox,
      }),
    }
  )
);

// === Селекторы (хелперы для UI) ===

export function getDish(dishId: string) {
  return DISH_MAP.get(dishId);
}

export function calcCartSubtotal(items: DeliveryCartItem[]): number {
  return items.reduce((sum, item) => {
    const dish = DISH_MAP.get(item.dishId);
    if (!dish) return sum;
    return sum + dish.pricePerGuest * item.qty;
  }, 0);
}

export function calcDeliverySurcharge(zoneId: string): number {
  const zone = DELIVERY_ZONES.find(z => z.id === zoneId);
  return zone?.surcharge ?? 0;
}

export function calcThermoboxCost(needThermobox: boolean): number {
  return needThermobox ? THERMOBOX_PRICE : 0;
}

export function calcCartTotal(state: DeliveryCartState): {
  subtotal: number;
  delivery: number;
  thermobox: number;
  total: number;
  meetsMinimum: boolean;
  remainingToMin: number;
} {
  const subtotal = calcCartSubtotal(state.items);
  const delivery = calcDeliverySurcharge(state.zoneId);
  const thermobox = calcThermoboxCost(state.needThermobox);
  const total = subtotal + delivery + thermobox;
  const meetsMinimum = subtotal >= MIN_ORDER_AMOUNT;
  const remainingToMin = Math.max(0, MIN_ORDER_AMOUNT - subtotal);

  return { subtotal, delivery, thermobox, total, meetsMinimum, remainingToMin };
}
