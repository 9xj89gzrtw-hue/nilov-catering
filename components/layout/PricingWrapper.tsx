'use client';

import { useEffect } from 'react';
import { PricingProvider, usePricing } from '@/lib/pricing-context';
import { useConstructor } from '@/hooks/useConstructor';

/** Синхронизирует PricingContext → Zustand useConstructor */
function PricingSync() {
  const pricing = usePricing();

  useEffect(() => {
    useConstructor.getState().setPricing(pricing);
  }, [pricing]);

  return null;
}

/** Серверный wrapper: получает CMS-цены, прокидывает в клиентские контексты */
export default function PricingWrapper({
  children,
  cmsPricing,
}: {
  children: React.ReactNode;
  cmsPricing?: { pricePerGuest: any; addons?: any[] } | null;
}) {
  return (
    <PricingProvider cmsPricing={cmsPricing}>
      <PricingSync />
      {children}
    </PricingProvider>
  );
}