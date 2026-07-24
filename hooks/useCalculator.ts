'use client';

import { useState, useMemo, useCallback } from 'react';
import { calcTotal } from '@/lib/pricing';
import { usePricing } from '@/lib/pricing-context';
import type { Format, Tier, AddOn } from '@/lib/types';

export interface CalculatorState {
  format: Format;
  guests: number;
  tier: Tier;
  selectedAddons: AddOn[];
  childGuests: number;
  bookingDays: number;
}

const defaults: CalculatorState = {
  format: 'furshet',
  guests: 20,
  tier: 'standard',
  selectedAddons: [],
  childGuests: 0,
  bookingDays: 0,
};

export function useCalculator(initial?: Partial<CalculatorState>) {
  const [state, setState] = useState<CalculatorState>({ ...defaults, ...initial });
  const pricing = usePricing();

  const result = useMemo(
    () => calcTotal(state.guests, state.format, state.tier, state.selectedAddons, {
      discounts: true,
      bookingDays: state.bookingDays,
      childGuests: state.childGuests,
      serviceBreakdown: true,
      pricing,
    }),
    [state.format, state.guests, state.tier, state.selectedAddons, state.childGuests, state.bookingDays, pricing],
  );

  const setFormat = useCallback((f: Format) => setState(s => ({ ...s, format: f })), []);
  const setGuests = useCallback((g: number) => setState(s => ({ ...s, guests: g })), []);
  const setTier = useCallback((t: Tier) => setState(s => ({ ...s, tier: t })), []);
  const toggleAddon = useCallback((a: AddOn) => {
    setState(s => {
      const exists = s.selectedAddons.find(x => x.id === a.id);
      return {
        ...s,
        selectedAddons: exists
          ? s.selectedAddons.filter(x => x.id !== a.id)
          : [...s.selectedAddons, a],
      };
    });
  }, []);
  const setChildGuests = useCallback((c: number) => setState(s => ({ ...s, childGuests: c })), []);
  const setBookingDays = useCallback((d: number) => setState(s => ({ ...s, bookingDays: d })), []);
  const reset = useCallback(() => setState(defaults), []);

  return {
    state,
    result,
    setFormat,
    setGuests,
    setTier,
    toggleAddon,
    setChildGuests,
    setBookingDays,
    reset,
    availableAddons: pricing.addons,
  };
}