"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { PricingData } from "./pricing-types";
import { DEFAULT_PRICING } from "./pricing-types";

interface PricingContextType {
  pricing: PricingData;
  updatePricing: (updates: Partial<PricingData>) => void;
  format: string | null;
  setFormat: (format: string) => void;
  tier: string | null;
  setTier: (tier: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ 
  children, 
  cmsPricing 
}: { 
  children: ReactNode; 
  cmsPricing?: { pricePerGuest: unknown; addons?: unknown[] } | null;
}) {
  const [pricing, setPricing] = useState<PricingData>(
    cmsPricing as PricingData || DEFAULT_PRICING
  );
  const [format, setFormat] = useState<string | null>(null);
  const [tier, setTier] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(50);

  const updatePricing = useCallback((updates: Partial<PricingData>) => {
    setPricing(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <PricingContext.Provider
      value={{
        pricing,
        updatePricing,
        format,
        setFormat,
        tier,
        setTier,
        guests,
        setGuests,
      }}
    >
      {children}
    </PricingContext.Provider>
  );
}

export function usePricing() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
}
