"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import type { MenuItem } from "@/lib/data";

interface SelectedItem {
  item: MenuItem;
  quantity: number;
}

interface MenuBuilderContextValue {
  selectedItems: Map<string, SelectedItem>;
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearAll: () => void;
  getTotal: () => number;
  totalCount: number;
  getWhatsAppText: () => string;
}

const MenuBuilderContext = createContext<MenuBuilderContextValue | null>(null);

const STORAGE_KEY = "nilov-cart";

function serializeMap(map: Map<string, SelectedItem>): [string, SelectedItem][] {
  return Array.from(map.entries());
}

function deserializeMap(entries: [string, SelectedItem][]): Map<string, SelectedItem> {
  return new Map(entries);
}

export function MenuBuilderProvider({ children }: { children: ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<Map<string, SelectedItem>>(() => {
    if (typeof window === "undefined") return new Map();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return deserializeMap(parsed);
      }
    } catch {}
    return new Map();
  });
  const [hydrated, setHydrated] = useState(false);

  // Persist to localStorage on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeMap(selectedItems)));
    } catch {}
  }, [selectedItems]);

  // Hydration marker
  useEffect(() => setHydrated(true), []);

  const addItem = useCallback((item: MenuItem) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      const existing = next.get(item.id);
      if (existing) {
        next.set(item.id, { item, quantity: existing.quantity + 1 });
      } else {
        next.set(item.id, { item, quantity: 1 });
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      next.delete(itemId);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      const next = new Map(prev);
      if (quantity <= 0) {
        next.delete(itemId);
      } else {
        const existing = next.get(itemId);
        if (existing) {
          next.set(itemId, { ...existing, quantity });
        }
      }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedItems(new Map());
  }, []);

  const getTotal = useCallback(() => {
    let total = 0;
    selectedItems.forEach(({ item, quantity }) => {
      total += item.price * quantity;
    });
    return total;
  }, [selectedItems]);

  const totalCount = Array.from(selectedItems.values()).reduce(
    (acc, { quantity }) => acc + quantity,
    0
  );

  const getWhatsAppText = useCallback(() => {
    if (selectedItems.size === 0) return "Здравствуйте! Хочу узнать о кейтеринге.";
    let text = "Здравствуйте! Хочу заказать кейтеринг. Моё меню:\n\n";
    let total = 0;
    selectedItems.forEach(({ item, quantity }) => {
      const sum = item.price * quantity;
      total += sum;
      text += `• ${item.name} x${quantity} — ${sum.toLocaleString("ru-RU")} ₽\n`;
    });
    text += `\nИтого: ${total.toLocaleString("ru-RU")} ₽`;
    return text;
  }, [selectedItems]);

  return (
    <MenuBuilderContext.Provider
      value={{
        selectedItems,
        addItem,
        removeItem,
        updateQuantity,
        clearAll,
        getTotal,
        totalCount,
        getWhatsAppText,
      }}
    >
      {children}
    </MenuBuilderContext.Provider>
  );
}

export function useMenuBuilder() {
  const ctx = useContext(MenuBuilderContext);
  if (!ctx) throw new Error("useMenuBuilder must be used within MenuBuilderProvider");
  return ctx;
}