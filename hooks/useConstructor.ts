'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Format, Tier, Diet, AddOn } from '@/lib/types';
import type { PricingData } from '@/lib/pricing-types';
import { DEFAULT_PRICING } from '@/lib/pricing-types';
import { MIN_GUESTS } from '@/lib/constants';
import { calcTotal } from '@/lib/pricing';
import { ALL_DISHES } from '@/lib/menu-data';

const DISH_MAP = new Map(ALL_DISHES.map(d => [d.id, d]));

export interface SelectedItem {
  dishId: string;
  qty: number;
  excludeAllergen?: string;
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

  // Custom menu management (drag-and-drop)
  addDish: (dishId: string) => void;
  removeDish: (dishId: string) => void;
  setItemQty: (dishId: string, qty: number) => void;
  reorderItems: (fromIdx: number, toIdx: number) => void;
  clearItems: () => void;

  recalc: () => void;
  reset: () => void;
}

const INITIAL: Pick<ConstructorState, '_hasHydrated' | 'format' | 'guestCount' | 'childGuests' | 'diet' | 'tierMode' | 'tier' | 'selectedItems' | 'excludedAllergens' | 'addOns' | 'contact' | 'currentStep' | 'isCalculating' | 'errors' | 'guestEdge' | 'base' | 'addonsTotal' | 'total' | 'perGuest' | 'savings' | 'service' | 'pricing'> = {
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

      // === Custom menu management (drag-and-drop) ===
      addDish: (dishId) => {
        const items = get().selectedItems;
        if (items.some(i => i.dishId === dishId)) return; // already selected
        set({ selectedItems: [...items, { dishId, qty: 1 }] });
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
        const { format, guestCount, childGuests, tier, tierMode, selectedItems, addOns, pricing } = get();
        if (!format || !tier) {
          set({ base: 0, addonsTotal: 0, total: 0, perGuest: 0, savings: 0, service: 0 });
          return;
        }

        // Custom mode: calculate from selected dishes
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