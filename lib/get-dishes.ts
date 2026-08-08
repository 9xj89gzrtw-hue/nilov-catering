// Синхронизация админки с каталогом
// Админка (/admin/dishes) пишет в data/dishes.json
// Каталог (/menu/catalog) и другие страницы читают из ВСЕХ_БЛЮД
//
// Эта функция объединяет оба источника:
// 1. Если в data/dishes.json есть блюда — они добавляются/замещают
// 2. ALL_DISHES из menu-data.ts — основной hardcoded источник
//
// Приоритет: dish из dishes.json (если есть) → иначе dish из ALL_DISHES

import { promises as fs } from 'fs';
import path from 'path';
import { ALL_DISHES } from './menu-data';
import type { Dish } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

// Admin Dish interface (from lib/cms-store.ts)
interface AdminDish {
  id: string;
  name: string;
  photo?: string;
  image?: string;
  pricePerGuest: number;
  tier?: string | string[];
  station: string;
  dietBadges: string[];
  allergens?: number[] | string[];
  crossContact?: boolean;
  servingsPerGuest?: number;
  status?: 'verified' | 'pending';
  description?: string;
  format?: string[];
}

let _cachedDishes: Dish[] | null = null;
let _cacheTime = 0;
const CACHE_TTL = 60_000; // 1 minute

async function readAdminDishes(): Promise<AdminDish[]> {
  try {
    const file = path.join(DATA_DIR, 'dishes.json');
    const raw = await fs.readFile(file, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Конвертировать AdminDish в Dish (lib/types) */
function adminToDish(ad: AdminDish): Dish | null {
  if (!ad.id || !ad.name) return null;
  // allergens может быть number[] или string[]
  const allergens: string[] = Array.isArray(ad.allergens)
    ? ad.allergens.map(a => typeof a === 'number' ? String(a) : String(a))
    : [];
  // tier может быть string или string[]
  const tier = Array.isArray(ad.tier) ? ad.tier : ad.tier ? [ad.tier] : ['standard'];
  return {
    id: ad.id,
    name: ad.name,
    description: ad.description || '',
    image: ad.photo || ad.image || '',
    station: (ad.station || 'cold') as Dish['station'],
    format: (ad.format || ['furshet']) as Dish['format'],
    tier: tier as Dish['tier'],
    pricePerGuest: ad.pricePerGuest || 0,
    servingsPerGuest: ad.servingsPerGuest || 1,
    allergens: allergens as Dish['allergens'],
    dietBadges: (ad.dietBadges || []) as Dish['dietBadges'],
    childFriendly: false,
  };
}

/**
 * Получить все блюда — объединение admin (data/dishes.json) и ALL_DISHES (hardcoded).
 * Кешируется на 1 минуту для производительности.
 *
 * Логика:
 * - admin-блюда с тем же id ЗАМЕЩАЮТ hardcoded (админ может править цены/фото/состав)
 * - admin-блюда с новым id ДОБАВЛЯЮТСЯ к hardcoded
 * - если dishes.json пуст → только ALL_DISHES
 */
export async function getAllDishesSynced(): Promise<Dish[]> {
  // Кеш на 1 минуту
  if (_cachedDishes && Date.now() - _cacheTime < CACHE_TTL) {
    return _cachedDishes;
  }

  const adminDishes = await readAdminDishes();
  const adminMap = new Map<string, Dish>();
  for (const ad of adminDishes) {
    const converted = adminToDish(ad);
    if (converted) adminMap.set(converted.id, converted);
  }

  // Merge: ALL_DISHES как база, admin переопределяет
  const result: Dish[] = [];
  const seenIds = new Set<string>();

  for (const dish of ALL_DISHES) {
    const adminVersion = adminMap.get(dish.id);
    if (adminVersion) {
      // admin version — но сохраняем description из hardcoded (т.к. в admin может не быть)
      result.push({
        ...dish,
        ...adminVersion,
        description: adminVersion.description || dish.description,
      });
    } else {
      result.push(dish);
    }
    seenIds.add(dish.id);
  }

  // Add admin dishes not in ALL_DISHES
  for (const [id, adminDish] of adminMap) {
    if (!seenIds.has(id)) {
      result.push(adminDish);
    }
  }

  _cachedDishes = result;
  _cacheTime = Date.now();
  return result;
}

/** Синхронная версия — использует только ALL_DISHES (без admin).
 * Используется в client components, где нет доступа к fs.
 */
export function getAllDishesSync(): Dish[] {
  return ALL_DISHES;
}

/** Сбросить кеш (для тестов или после admin save) */
export function clearDishesCache() {
  _cachedDishes = null;
  _cacheTime = 0;
}
