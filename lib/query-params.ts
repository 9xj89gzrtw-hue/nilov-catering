"use client";

/**
 * URL SEARCH PARAMS HOOKS (nuqs wrappers)
 *
 * Использует nuqs для типобезопасной работы с URL параметрами
 * Идеально для: фильтров меню, сортировки, табов, пагинации
 *
 * Пример:
 * const [category, setCategory] = useQueryState('category', 'all');
 * const [sort, setSort] = useQueryState('sort', 'price-asc');
 */

import { useQueryState, useQueryStates, parseAsBoolean, parseAsInteger, parseAsString } from "nuqs";

// ============================================
// Базовые хуки
// ============================================

/** Строковый параметр */
export function useStringParam(key: string, defaultValue = "") {
  return useQueryState(key, parseAsString.withDefault(defaultValue));
}

/** Числовой параметр */
export function useNumberParam(key: string, defaultValue = 0) {
  return useQueryState(key, parseAsInteger.withDefault(defaultValue));
}

/** Булев параметр */
export function useBooleanParam(key: string, defaultValue = false) {
  return useQueryState(key, parseAsBoolean.withDefault(defaultValue));
}

// ============================================
// Специфичные для кейтеринга хуки
// ============================================

interface MenuFilters {
  category: string; // furshet | banquet | coffee-break | all
  diet: string; // halal | vegan | gluten-free | all
  priceMin: number;
  priceMax: number;
  sort: string; // price-asc | price-desc | name | popular
  page: number;
}

const menuFilterParsers = {
  category: parseAsString.withDefault("all"),
  diet: parseAsString.withDefault("all"),
  priceMin: parseAsInteger.withDefault(0),
  priceMax: parseAsInteger.withDefault(100000),
  sort: parseAsString.withDefault("popular"),
  page: parseAsInteger.withDefault(1),
};

/**
 * Хук для фильтрации меню
 * Автоматически синхронизируется с URL
 */
export function useMenuFilters() {
  const [filters, setFilters] = useQueryStates(menuFilterParsers);

  const setCategory = (category: string) => setFilters({ category, page: 1 });

  const setDiet = (diet: string) => setFilters({ diet, page: 1 });

  const setSort = (sort: string) => setFilters({ sort, page: 1 });

  const setPage = (page: number) => setFilters({ page });

  const reset = () =>
    setFilters({
      category: "all",
      diet: "all",
      priceMin: 0,
      priceMax: 100000,
      sort: "popular",
      page: 1,
    });

  return {
    ...filters,
    setCategory,
    setDiet,
    setSort,
    setPage,
    reset,
    hasActiveFilters:
      filters.category !== "all" ||
      filters.diet !== "all" ||
      filters.priceMin > 0 ||
      filters.priceMax < 100000,
  };
}

// ============================================
// Хуки для событий
// ============================================

interface EventFilters {
  type: string; // svadba | korporativ | detskoe | all
  guests: string; // 20-50 | 50-100 | 100+ | all
  budget: string; // economy | standard | premium | all
}

const eventFilterParsers = {
  type: parseAsString.withDefault("all"),
  guests: parseAsString.withDefault("all"),
  budget: parseAsString.withDefault("all"),
};

/**
 * Хук для фильтрации мероприятий
 */
export function useEventFilters() {
  const [filters, setFilters] = useQueryStates(eventFilterParsers);

  const setType = (type: string) => setFilters({ type });

  const setGuests = (guests: string) => setFilters({ guests });

  const setBudget = (budget: string) => setFilters({ budget });

  const reset = () => setFilters({ type: "all", guests: "all", budget: "all" });

  return {
    ...filters,
    setType,
    setGuests,
    setBudget,
    reset,
    hasActiveFilters:
      filters.type !== "all" || filters.guests !== "all" || filters.budget !== "all",
  };
}
