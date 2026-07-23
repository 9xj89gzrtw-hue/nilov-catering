// Встроенная CMS: JSON-файлы → админка /admin
// РФ-совместимо: без внешних API, без карт, без облаков
// Спек: 04_BLOCKS.md §CMS-слой + 29_POSITIONING.md §РФ-стек
// Заказчик правит контент через /admin, файлы коммитятся в git
// ISR revalidate=3600 подхватывает изменения без деплоя

import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

/** Прочитать JSON-коллекцию */
async function readCollection<T>(name: string): Promise<T[]> {
  await ensureDir();
  const file = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/** Записать JSON-коллекцию */
async function writeCollection<T>(name: string, data: T[]): Promise<void> {
  await ensureDir();
  const file = path.join(DATA_DIR, `${name}.json`);
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
}

// === Коллекции ===

export interface Dish {
  id: string;
  name: string;
  photo: string;
  pricePerGuest: number;
  tier: 'economy' | 'standard' | 'premium' | 'luxury';
  station: string;
  dietBadges: string[];
  allergens: number[];
  crossContact: boolean;
  servingsPerGuest: number;
  status: 'verified' | 'pending';
}

export interface Review {
  id: string;
  clientName: string;
  clientPhoto?: string;
  venue?: string;
  venuePhoto?: string;
  eventType: string;
  date: string;
  guests: number;
  quote: string;
  rating?: number;
  status: 'verified' | 'pending';
  externalUrl?: string;
}

export interface Video {
  id: string;
  videoUrl: string;
  poster: string;
  eventType: string;
  title: string;
  durationSec: number;
  transcript?: string;
}

export interface TrustProofItem {
  id: string;
  icon: string;
  label: string;
  sublabel?: string;
  value: number;
  prefix?: string;
  suffix: string;
  status: 'verified' | 'pending';
}

export interface PricingConfig {
  pricePerGuest: Record<string, Partial<Record<string, number>>>;
  addons: Array<{
    id: string; name: string; price: number; priceType: 'fixed' | 'perGuest';
    description?: string; category?: string; formats?: string[];
  }>;
}

export interface PageText {
  key: string;       // например 'hero-title', 'faq-1-answer'
  value: string;     // текст
  updatedAt: string;
}

// === API ===

export const cmsStore = {
  dishes: {
    getAll: () => readCollection<Dish>('dishes'),
    save: (data: Dish[]) => writeCollection('dishes', data),
  },
  reviews: {
    getAll: () => readCollection<Review>('reviews'),
    save: (data: Review[]) => writeCollection('reviews', data),
  },
  videos: {
    getAll: () => readCollection<Video>('videos'),
    save: (data: Video[]) => writeCollection('videos', data),
  },
  trustProof: {
    getAll: () => readCollection<TrustProofItem>('trust-proof'),
    save: (data: TrustProofItem[]) => writeCollection('trust-proof', data),
  },
  pricing: {
    get: async (): Promise<PricingConfig | null> => {
      const items = await readCollection<PricingConfig>('pricing');
      return items[0] || null;
    },
    save: (data: PricingConfig) => writeCollection('pricing', [data]),
  },
  pageTexts: {
    getAll: () => readCollection<PageText>('page-texts'),
    save: (data: PageText[]) => writeCollection('page-texts', data),
  },
  /** Список всех коллекций для админки */
  collections: ['dishes', 'reviews', 'videos', 'trust-proof', 'pricing', 'page-texts'] as const,
};

export const CMS_REVALIDATE = 3600; // 1 час