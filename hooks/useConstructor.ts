'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Format, Tier, Diet, AddOn } from '@/lib/types';
import type { PricingData } from '@/lib/pricing-types';
import { DEFAULT_PRICING } from '@/lib/pricing-types';
import { MIN_GUESTS, STAFF_RATE, STAFF_RATIO, COORDINATOR_FLAT, SETUP_RATE, SETUP_HOURS, SERVICE_STAFF_HOURS, GAMMA_MAX } from '@/lib/constants';
import { calcTotal } from '@/lib/pricing';
import { ALL_DISHES } from '@/lib/menu-data';

const DISH_MAP = new Map(ALL_DISHES.map(d => [d.id, d]));

export interface SelectedItem {
  dishId: string;
  qty: number;
  excludeAllergen?: string;
  // ID группы гостей, для которой это блюдо (если несколько групп)
  groupId?: string;
}

// Группа гостей с диетой — для смешанных мероприятий (10 веганов + 8 халяль + 12 всеядных)
export interface GuestGroup {
  id: string;
  name: string;        // «Веганы», «Халяль», «Всеядные»
  count: number;        // кол-во гостей в группе
  diet: Diet | 'omnivore' | null;  // diet restriction
  description?: string;
}

export interface ConstructorState {
  // Hydration guard
  _hasHydrated: boolean;
  setHasHydrated: () => void;

  // Core
  format: Format | null;
  guestCount: number;
  childGuests: number;
  diet: Diet | null;
  guestEdge: 'none' | 'over-500';

  // Guest groups (для смешанных мероприятий)
  guestGroups: GuestGroup[];
  groupsEnabled: boolean;

  // Tier
  tierMode: 'preset' | 'custom';
  tier: Tier | null;

  // Custom menu
  selectedItems: SelectedItem[];

  // Excluded allergens (из AllergenFilterBar) — передаются в заявку
  excludedAllergens: string[];

  // Add-ons
  addOns: AddOn[];

  // Contact
  contact: { name: string; phone: string; date: string; comment: string };

  // UI
  currentStep: number;
  isCalculating: boolean;
  errors: string[];

  // Derived (computed in actions)
  base: number;
  addonsTotal: number;
  total: number;
  perGuest: number;
  savings: number;
  service: number;

  // CMS pricing
  pricing: PricingData;
  setPricing: (p: PricingData) => void;

  // Actions
  setFormat: (f: Format | null) => void;
  setGuestCount: (n: number) => void;
  setChildGuests: (n: number) => void;
  setDiet: (d: Diet | null) => void;
  setTierMode: (m: 'preset' | 'custom') => void;
  setTier: (t: Tier | null) => void;
  setStep: (s: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleAddOn: (a: AddOn) => void;
  setContact: (c: Partial<ConstructorState['contact']>) => void;
  setExcludedAllergens: (allergens: string[]) => void;

  // Guest groups
  setGroupsEnabled: (enabled: boolean) => void;
  addGroup: (group: Omit<GuestGroup, 'id'>) => void;
  updateGroup: (id: string, patch: Partial<GuestGroup>) => void;
  removeGroup: (id: string) => void;
  clearGroups: () => void;

  // Custom menu management (drag-and-drop)
  addDish: (dishId: string, groupId?: string) => void;
  removeDish: (dishId: string) => void;
  setItemQty: (dishId: string, qty: number) => void;
  reorderItems: (fromIdx: number, toIdx: number) => void;
  clearItems: () => void;

  recalc: () => void;
  reset: () => void;
}

const INITIAL: Pick<ConstructorState, '_hasHydrated' | 'format' | 'guestCount' | 'childGuests' | 'diet' | 'tierMode' | 'tier' | 'selectedItems' | 'excludedAllergens' | 'guestGroups' | 'groupsEnabled' | 'addOns' | 'contact' | 'currentStep' | 'isCalculating' | 'errors' | 'guestEdge' | 'base' | 'addonsTotal' | 'total' | 'perGuest' | 'savings' | 'service' | 'pricing'> = {
  _hasHydrated: false,
  format: null,
  guestCount: 20,
  childGuests: 0,
  diet: null,
  guestEdge: 'none',
  tierMode: 'preset',
  tier: null,
  selectedItems: [],
  excludedAllergens: [],
  guestGroups: [],
  groupsEnabled: false,
  addOns: [],
  contact: { name: '', phone: '', date: '', comment: '' },
  currentStep: 0,
  isCalculating: false,
  errors: [],
  base: 0,
  addonsTotal: 0,
  total: 0,
  perGuest: 0,
  savings: 0,
  service: 0,
  pricing: DEFAULT_PRICING,
};

export const useConstructor = create<ConstructorState>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      setHasHydrated: () => set({ _hasHydrated: true }),

      setPricing: (p: PricingData) => set({ pricing: p }),

      setFormat: (f) => {
        const state = { format: f };
        if (f) {
          const min = MIN_GUESTS[f] || 20;
          const g = get();
          if (g.guestCount < min) (state as Record<string, unknown>).guestCount = min;
        }
        set(state as Partial<ConstructorState>);
        get().recalc();
      },

      setGuestCount: (n) => {
        const guestEdge = n > 500 ? 'over-500' as const : 'none' as const;
        set({ guestCount: Math.max(1, Math.min(n, 500)), guestEdge });
        get().recalc();
      },

      setChildGuests: (n) => {
        set({ childGuests: Math.max(0, n) });
        get().recalc();
      },

      setDiet: (d) => set({ diet: d }),

      setTierMode: (m) => set({ tierMode: m }),
      setTier: (t) => { set({ tier: t }); get().recalc(); },

      setStep: (s) => set({ currentStep: s }),
      nextStep: () => set(s => ({ currentStep: Math.min(s.currentStep + 1, 5) })),
      prevStep: () => set(s => ({ currentStep: Math.max(s.currentStep - 1, 0) })),

      toggleAddOn: (a) => {
        const current = get().addOns;
        const exists = current.find(x => x.id === a.id);
        const next = exists ? current.filter(x => x.id !== a.id) : [...current, a];
        set({ addOns: next });
        get().recalc();
      },

      setContact: (c) => set(s => ({ contact: { ...s.contact, ...c } })),

      setExcludedAllergens: (allergens) => set({ excludedAllergens: allergens }),

      // === Guest groups (для смешанных мероприятий) ===
      setGroupsEnabled: (enabled) => set({ groupsEnabled: enabled }),

      addGroup: (group) => {
        const id = `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
        const newGroup: GuestGroup = { id, ...group };
        set(s => ({ guestGroups: [...s.guestGroups, newGroup] }));
      },

      updateGroup: (id, patch) => {
        set(s => ({
          guestGroups: s.guestGroups.map(g => g.id === id ? { ...g, ...patch } : g),
        }));
      },

      removeGroup: (id) => {
        set(s => ({
          guestGroups: s.guestGroups.filter(g => g.id !== id),
          // Удалить блюда привязанные к этой группе
          selectedItems: s.selectedItems.filter(i => i.groupId !== id),
        }));
        get().recalc();
      },

      clearGroups: () => set({ guestGroups: [] }),

      // === Custom menu management (drag-and-drop) ===
      addDish: (dishId, groupId) => {
        const items = get().selectedItems;
        // Если есть groupId — разрешаем несколько экземпляров одного блюда (по группе)
        if (groupId) {
          // Если блюдо уже в этой группе — увеличиваем qty
          const existingInGroup = items.find(i => i.dishId === dishId && i.groupId === groupId);
          if (existingInGroup) {
            set({ selectedItems: items.map(i =>
              i.dishId === dishId && i.groupId === groupId ? { ...i, qty: i.qty + 1 } : i
            ) });
          } else {
            set({ selectedItems: [...items, { dishId, qty: 1, groupId }] });
          }
        } else {
          // Без группы — как раньше
          if (items.some(i => i.dishId === dishId && !i.groupId)) return;
          set({ selectedItems: [...items, { dishId, qty: 1 }] });
        }
        get().recalc();
      },

      removeDish: (dishId) => {
        set({ selectedItems: get().selectedItems.filter(i => i.dishId !== dishId) });
        get().recalc();
      },

      setItemQty: (dishId, qty) => {
        const next = Math.max(0, Math.min(99, qty));
        if (next === 0) {
          set({ selectedItems: get().selectedItems.filter(i => i.dishId !== dishId) });
        } else {
          set({
            selectedItems: get().selectedItems.map(i =>
              i.dishId === dishId ? { ...i, qty: next } : i
            ),
          });
        }
        get().recalc();
      },

      reorderItems: (fromIdx, toIdx) => {
        const items = [...get().selectedItems];
        if (fromIdx < 0 || fromIdx >= items.length || toIdx < 0 || toIdx >= items.length) return;
        const [moved] = items.splice(fromIdx, 1);
        items.splice(toIdx, 0, moved);
        set({ selectedItems: items });
      },

      clearItems: () => {
        set({ selectedItems: [] });
        get().recalc();
      },

      recalc: () => {
        const { format, guestCount, childGuests, tier, tierMode, selectedItems, addOns, pricing, guestGroups, groupsEnabled } = get();
        if (!format || !tier) {
          set({ base: 0, addonsTotal: 0, total: 0, perGuest: 0, savings: 0, service: 0 });
          return;
        }

        // === Multi-group mode: расчёт per-group ===
        // Для каждого блюда, привязанного к группе — умножаем на размер группы, не на guestCount
        if (groupsEnabled && guestGroups.length > 0) {
          const groupsMap = new Map(guestGroups.map(g => [g.id, g]));
          let base = 0;
          for (const item of selectedItems) {
            const dish = DISH_MAP.get(item.dishId);
            if (!dish) continue;
            if (item.groupId) {
              const group = groupsMap.get(item.groupId);
              const groupSize = group?.count || 0;
              base += dish.pricePerGuest * item.qty * groupSize;
            } else {
              // Блюдо без группы — на всех гостей
              base += dish.pricePerGuest * item.qty * guestCount;
            }
          }
          // Addons (service) — по полному guestCount
          const addonsTotal = addOns.reduce((sum, a) => {
            if (a.priceType === 'perGuest') return sum + a.price * guestCount;
            return sum + a.price;
          }, 0);
          // Service (персонал+посуда) — сервис-норма по формату, на guestCount
          const ratio = STAFF_RATIO[format] ?? 20;
          const staffCount = Math.ceil(guestCount / ratio);
          const service = format === 'chef-at-home'
            ? 0
            : (STAFF_RATE[format] * SERVICE_STAFF_HOURS * staffCount + COORDINATOR_FLAT + SETUP_RATE * SETUP_HOURS);
          // Gamma-скидка
          let discount = 0;
          if (guestCount > 10) {
            const gamma = Math.min(GAMMA_MAX, 0.15 * (guestCount - 10) / (150 + (guestCount - 10)));
            discount += base * gamma;
          }
          const totalSum = Math.round(base - discount + addonsTotal);
          const perGuest = guestCount > 0 ? Math.round(totalSum / guestCount) : 0;
          // Savings vs luxury
          const maxPrice = pricing.pricePerGuest[format]?.['luxury'] ?? base * 1.5;
          const maxBase = format === 'chef-at-home' ? base * 1.5 : maxPrice * guestCount;
          const savings = Math.max(0, Math.round(maxBase - totalSum));
          set({
            base: Math.round(base),
            addonsTotal: Math.round(addonsTotal),
            total: totalSum,
            perGuest,
            savings,
            service: Math.round(service),
          });
          return;
        }

        // Custom mode (без групп): calculate from selected dishes
        if (tierMode === 'custom' && selectedItems.length > 0) {
          const itemsForCalc = selectedItems
            .map(i => {
              const dish = DISH_MAP.get(i.dishId);
              return dish ? { pricePerGuest: dish.pricePerGuest, qty: i.qty } : null;
            })
            .filter((x): x is { pricePerGuest: number; qty: number } => x !== null);

          const result = calcTotal(guestCount, format, 'custom', addOns, {
            discounts: true,
            childGuests,
            serviceBreakdown: false,
            pricing,
            items: itemsForCalc,
          });

          set({
            base: result.base,
            addonsTotal: result.addonsTotal,
            total: result.total,
            perGuest: result.perGuest,
            savings: result.savings,
            service: result.service,
          });
          return;
        }

        const result = calcTotal(guestCount, format, tier as Tier, addOns, {
          discounts: true,
          childGuests,
          serviceBreakdown: false,
          pricing,
        });

        set({
          base: result.base,
          addonsTotal: result.addonsTotal,
          total: result.total,
          perGuest: result.perGuest,
          savings: result.savings,
          service: result.service,
        });
      },

      reset: () => set({ ...INITIAL }),
    }),
    {
      name: 'nilov-constructor',
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated();
      },
      partialize: (s) => ({
        format: s.format,
        guestCount: s.guestCount,
        childGuests: s.childGuests,
        diet: s.diet,
        tierMode: s.tierMode,
        tier: s.tier,
        selectedItems: s.selectedItems,
        excludedAllergens: s.excludedAllergens,
        guestGroups: s.guestGroups,
        groupsEnabled: s.groupsEnabled,
        addOns: s.addOns,
        contact: s.contact,
        currentStep: s.currentStep,
        base: s.base,
        addonsTotal: s.addonsTotal,
        total: s.total,
        perGuest: s.perGuest,
        savings: s.savings,
        service: s.service,
      }),
    }
  )
);