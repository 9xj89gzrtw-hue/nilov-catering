"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConstructor } from "@/hooks/useConstructor";
import { ALL_DISHES } from "@/lib/menu-data";
import { getDishImage } from "@/lib/dish-images";
import { AnimatePresence, motion } from "framer-motion";

/**
 * PersistentCartRail — sticky панель корзины внизу экрана.
 * Показывает выбранные блюда, сумму и кнопку "Перейти к оформлению".
 *
 * Используется на /menu/catalog, /menu/* страницах.
 * Скрывается если корзина пуста.
 *
 * Inspired by Ballena Cabo / Great Performances Awwwards patterns.
 */
export default function PersistentCartRail() {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const selectedItems = useConstructor((s) => s.selectedItems);
  const guestCount = useConstructor((s) => s.guestCount);
  const removeDish = useConstructor((s) => s.removeDish);
  const setItemQty = useConstructor((s) => s.setItemQty);

  useEffect(() => setMounted(true), []);

  if (!mounted || selectedItems.length === 0) return null;

  // Calculate totals
  const dishMap = new Map(ALL_DISHES.map((d) => [d.id, d]));
  const items = selectedItems.map((item) => {
    const dish = dishMap.get(item.dishId);
    return {
      ...item,
      dish,
      total: dish ? dish.pricePerGuest * item.qty * (guestCount || 1) : 0,
    };
  });
  const grandTotal = items.reduce((sum, i) => sum + i.total, 0);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <>
      {/* Backdrop when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Cart rail */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-background/95 border-line fixed right-0 bottom-0 left-0 z-40 border shadow-2xl backdrop-blur-xl md:right-4 md:bottom-4 md:left-auto md:max-w-md md:rounded-2xl"
      >
        {/* Compact bar — always visible */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:bg-muted/30 touch-target flex w-full items-center justify-between gap-3 p-4 transition-colors md:rounded-2xl"
          aria-expanded={expanded}
          aria-label={`Корзина: ${totalQty} позиций, ${grandTotal.toLocaleString("ru-RU")} ₽. ${expanded ? "Свернуть" : "Развернуть"}`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative shrink-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span className="bg-gold-text absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                {totalQty}
              </span>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-semibold">
                {totalQty} {totalQty === 1 ? "позиция" : totalQty < 5 ? "позиции" : "позиций"} в
                меню
              </p>
              <p className="text-muted-foreground truncate text-xs">
                ≈ {grandTotal.toLocaleString("ru-RU")} ₽ на {guestCount || "?"} гостей
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </div>
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="border-line overflow-hidden border-t"
            >
              <div className="max-h-[60vh] space-y-2 overflow-y-auto p-3">
                {items.map((item, i) => (
                  <motion.div
                    key={`${item.dishId}-${item.groupId || "default"}-${i}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-card border-line flex items-center gap-3 rounded-lg border p-2"
                  >
                    {item.dish && (
                      <div className="bg-secondary h-12 w-12 shrink-0 overflow-hidden rounded">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getDishImage(item.dish.id, item.dish.station)}
                          alt={item.dish.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium">
                        {item.dish?.name || item.dishId}
                      </p>
                      <p className="text-muted-foreground text-[10px]">
                        {item.dish?.pricePerGuest || 0} ₽ × {item.qty} × {guestCount || 1}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        onClick={() => setItemQty(item.dishId, Math.max(1, item.qty - 1))}
                        className="border-line hover:border-gold-text h-11 w-11 rounded border text-xs"
                        aria-label="Уменьшить"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-xs font-semibold">{item.qty}</span>
                      <button
                        onClick={() => setItemQty(item.dishId, item.qty + 1)}
                        className="border-line hover:border-gold-text h-11 w-11 rounded border text-xs"
                        aria-label="Увеличить"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeDish(item.dishId)}
                        className="text-muted-foreground hover:text-destructive ml-1 h-11 w-11 rounded"
                        aria-label="Удалить"
                      >
                        ✕
                      </button>
                    </div>
                  </motion.div>
                ))}
                {items.length === 0 && (
                  <p className="text-muted-foreground py-8 text-center text-sm">Корзина пуста</p>
                )}
              </div>

              {/* Footer with CTA */}
              <div className="border-line space-y-2 border-t p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Итого (≈ на {guestCount || 0} гостей):
                  </span>
                  <span className="text-gold-text font-bold">
                    {grandTotal.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                <Link
                  href="/plan/constructor"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 block w-full rounded-lg py-3 text-center text-sm font-semibold transition-colors"
                >
                  Оформить заказ →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
