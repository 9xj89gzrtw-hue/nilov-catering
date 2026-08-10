'use client';

import { createContext, useContext } from 'react';
import type { PricingData } from './pricing-types';
import { DEFAULT_PRICING } from './pricing-types';

const PricingContext = createContext<PricingData>(DEFAULT_PRICING);

export function usePricing(): PricingData {
  return useContext(PricingContext);
}

/** Клиентский провайдер — получает данные от сервера, fallback на хардкод */
export function PricingProvider({
  children,
  cmsPricing,
}: {
  children: React.ReactNode;
  cmsPricing?: { pricePerGuest: unknown; addons?: unknown[] } | null;
}) {
  const pricePerGuest = cmsPricing?.pricePerGuest as Record<string, number> | undefined;
  const value: PricingData = pricePerGuest && typeof pricePerGuest === 'object' && Object.keys(pricePerGuest).length > 0
    ? {
        pricePerGuest: pricePerGuest as PricingData['pricePerGuest'],
        addons: (cmsPricing?.addons as PricingData['addons']) || DEFAULT_PRICING.addons,
      }
    : DEFAULT_PRICING;

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}