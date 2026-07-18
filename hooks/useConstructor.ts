import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SelectedItem { id: string; name: string; pricePerGuest: number; quantity: number; category: string; }
export interface AddOn { id: string; name: string; price: number; quantity: number; unit: 'fixed' | 'per-guest'; }

interface ConstructorState {
  format: string | null; guestCount: number | null; tierMode: 'preset' | 'custom'; tier: string | null;
  selectedItems: SelectedItem[]; addOns: AddOn[];
  contact: { name: string; phone: string; date: string; comment: string };
  subtotal: number; addOnsTotal: number; total: number; perGuest: number; savings: number;
  currentStep: number; isCalculating: boolean; errors: Record<string, string>;
  setFormat: (f: string) => void; setGuestCount: (n: number) => void;
  setTierMode: (m: 'preset' | 'custom') => void; setTier: (t: string) => void;
  toggleItem: (item: SelectedItem) => void; toggleAddOn: (addon: AddOn) => void;
  setContact: (c: Partial<{ name: string; phone: string; date: string; comment: string }>) => void;
  setStep: (s: number) => void; recalc: () => void; reset: () => void;
}

const TIERS: Record<string, Record<string, number>> = {
  furshet: { economy: 2450, standard: 3450, premium: 4350, luxury: 5350 },
  banket: { classic: 4470, premium: 5970, vip: 6970 },
  'coffee-break': { light: 950, standard: 1450, premium: 1950, luxury: 2450 },
  'mobile-furshet': { standard: 858, premium: 1188 },
};

export const useConstructor = create<ConstructorState>()(
  persist((set, get) => ({
    format: null, guestCount: null, tierMode: 'preset', tier: null,
    selectedItems: [], addOns: [],
    contact: { name: '', phone: '', date: '', comment: '' },
    subtotal: 0, addOnsTotal: 0, total: 0, perGuest: 0, savings: 0,
    currentStep: 1, isCalculating: false, errors: {},
    setFormat: (f) => { set({ format: f, tier: null, selectedItems: [] }); get().recalc(); },
    setGuestCount: (n) => { set({ guestCount: n }); get().recalc(); },
    setTierMode: (m) => { set({ tierMode: m, tier: null, selectedItems: [] }); get().recalc(); },
    setTier: (t) => { set({ tier: t }); get().recalc(); },
    toggleItem: (item) => {
      const items = get().selectedItems;
      const exists = items.find(i => i.id === item.id);
      if (exists) { set({ selectedItems: items.filter(i => i.id !== item.id) }); }
      else { set({ selectedItems: [...items, item] }); }
      get().recalc();
    },
    toggleAddOn: (addon) => {
      const addons = get().addOns;
      const exists = addons.find(a => a.id === addon.id);
      if (exists) { set({ addOns: addons.filter(a => a.id !== addon.id) }); }
      else { set({ addOns: [...addons, addon] }); }
      get().recalc();
    },
    setContact: (c) => set({ contact: { ...get().contact, ...c } }),
    setStep: (s) => set({ currentStep: s }),
    recalc: () => {
      const s = get();
      let subtotal = 0;
      if (s.tierMode === 'preset' && s.format && s.tier && s.guestCount) {
        subtotal = (TIERS[s.format]?.[s.tier] || 0) * s.guestCount;
      } else if (s.tierMode === 'custom' && s.guestCount) {
        subtotal = s.selectedItems.reduce((sum, i) => sum + i.pricePerGuest * i.quantity * s.guestCount!, 0);
      }
      const addOnsTotal = s.addOns.reduce((sum, a) => sum + a.price * (a.unit === 'fixed' ? a.quantity : a.quantity * (s.guestCount || 1)), 0);
      const total = subtotal + addOnsTotal;
      const perGuest = s.guestCount ? total / s.guestCount : 0;
      const luxuryPrice = s.format ? (TIERS[s.format]?.luxury || TIERS[s.format]?.vip || 0) * (s.guestCount || 0) : 0;
      const savings = Math.max(0, luxuryPrice - total);
      set({ subtotal, addOnsTotal, total, perGuest, savings });
    },
    reset: () => set({ format: null, guestCount: null, tier: null, tierMode: 'preset', selectedItems: [], addOns: [], contact: { name: '', phone: '', date: '', comment: '' }, currentStep: 1, subtotal: 0, addOnsTotal: 0, total: 0, perGuest: 0, savings: 0 }),
  }), { name: 'nilov-constructor', skipHydration: true })
);

export const FORMAT_CARDS = [
  { id: 'furshet', name: 'Фуршет', price: 2450, minGuests: 20, icon: '🥂', image: '/images/hero/banquet.jpg.svg', desc: 'Холодные и горячие закуски, канапе, напитки' },
  { id: 'banket', name: 'Банкет', price: 4470, minGuests: 15, icon: '🍽️', image: '/images/dishes/hot.svg', desc: 'Посадочное обслуживание, многоходовое меню' },
  { id: 'coffee-break', name: 'Кофе-брейк', price: 950, minGuests: 10, icon: '☕', image: '/images/dishes/drink.svg', desc: 'Кофе, чай, выпечка, мини-сэндвичи' },
  { id: 'mobile-furshet', name: 'Мобильный фуршет', price: 858, minGuests: 10, icon: '📦', image: '/images/dishes/breakfast.svg', desc: 'Готовые наборы с доставкой' },
];

export const ADD_ON_CATALOG: AddOn[] = [
  { id: 'pyramid', name: 'Пирамида из шампанского', price: 7000, quantity: 1, unit: 'fixed' },
  { id: 'barman', name: 'Бармен-шоу', price: 6000, quantity: 1, unit: 'fixed' },
  { id: 'fountain', name: 'Шоколадный фонтан', price: 5000, quantity: 1, unit: 'fixed' },
  { id: 'cake', name: 'Торт на заказ', price: 3000, quantity: 1, unit: 'fixed' },
  { id: 'floristics', name: 'Флористика (в подарок при свадьбе)', price: 0, quantity: 1, unit: 'fixed' },
  { id: 'welcome', name: 'Welcome drink', price: 450, quantity: 1, unit: 'per-guest' },
  { id: 'show-cooking', name: 'Show-cooking станция', price: 800, quantity: 1, unit: 'per-guest' },
  { id: 'coffee-station', name: 'Кофейная станция', price: 250, quantity: 1, unit: 'per-guest' },
];
