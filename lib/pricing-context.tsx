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
  cmsPricing?: { pricePerGuest: any; addons?: any[] } | null;
}) {
  const value: PricingData = cmsPricing?.pricePerGuest && Object.keys(cmsPricing.pricePerGuest).length > 0
    ? {
        pricePerGuest: cmsPricing.pricePerGuest,
        addons: (cmsPricing.addons || DEFAULT_PRICING.addons),
      }
    : DEFAULT_PRICING;

  return (
    <PricingContext.Provider value={value}>
      {children}
    </PricingContext.Provider>
  );
}