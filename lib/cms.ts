/**
 * cms.ts — унифицированный адаптер CMS-данных
 *
 * СЕРВЕР: читает data/*.json напрямую (ISR revalidate=3600)
 * КЛИЕНТ: fetch /api/cms/collection → кеширует в memory
 *
 * Приоритет: CMS-файл → хардкод-константа (fallback).
 * Заказчик правит /admin или data/*.json → git push → ISR подхватывает.
 */

import { cmsStore, type Dish, type Review, type Video, type TrustProofItem, type PricingConfig, type PageText } from './cms-store';

// === Server API ===

export async function getDishes(): Promise<Dish[]> {
  const items = await cmsStore.dishes.getAll();
  if (items.length > 0) return items;
  // fallback: динамический импорт не работает в серверных компонентах Next.js
  // возвращаем пустой массив — при первом редактировании заполнится
  return [];
}

export async function getReviews(): Promise<Review[]> {
  return cmsStore.reviews.getAll();
}

export async function getVideos(): Promise<Video[]> {
  return cmsStore.videos.getAll();
}

export async function getTrustProofs(): Promise<TrustProofItem[]> {
  const items = await cmsStore.trustProof.getAll();
  if (items.length > 0) return items;
  return []; // fallback — компоненты используют хардкод
}

export async function getPricing(): Promise<PricingConfig | null> {
  return cmsStore.pricing.get();
}

export async function getPageText(key: string): Promise<string | null> {
  const texts = await cmsStore.pageTexts.getAll();
  const match = texts.find(t => t.key === key);
  return match?.value || null;
}

export async function getAllPageTexts(): Promise<PageText[]> {
  return cmsStore.pageTexts.getAll();
}

/** Проверяет, заполнена ли коллекция (CMS активна) */
export async function isCmsSeeded(): Promise<boolean> {
  const dishes = await cmsStore.dishes.getAll();
  return dishes.length > 0;
}