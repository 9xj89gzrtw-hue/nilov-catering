import type { Format, Tier, AddOn } from './types';
import { PRICE_PER_GUEST, ADDONS } from './constants';

/** Данные цен — либо хардкод, либо CMS */
export interface PricingData {
  pricePerGuest: Record<Format, Partial<Record<Tier, number>>>;
  addons: AddOn[];
}

/** Дефолт из хардкода */
export const DEFAULT_PRICING: PricingData = {
  pricePerGuest: PRICE_PER_GUEST,
  addons: ADDONS,
};