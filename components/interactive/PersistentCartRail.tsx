'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useConstructor } from '@/hooks/useConstructor';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage } from '@/lib/dish-images';
import { AnimatePresence, motion } from 'framer-motion';

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

  const selectedItems = useConstructor(s =>s.selectedItems);
  const guestCount = useConstructor(s =>s.guestCount);
  const removeDish = useConstructor(s =>s.removeDish);
  const setItemQty = useConstructor(s =>s.setItemQty);

  useEffect(() =>setMounted(true), []);

  if (!mounted || selectedItems.length === 0) return null;

  // Calculate totals
  const dishMap = new Map(ALL_DISHES.map(d =>[d.id, d]));
  const items = selectedItems.map(item => {
    const dish = dishMap.get(item.dishId);
    return {
      ...item,
      dish,
      total: dish ? dish.pricePerGuest * item.qty * (guestCount || 1) : 0,
    };
  });
  const grandTotal = items.reduce((sum, i) =>sum + i.total, 0);
  const totalQty = items.reduce((sum, i) =>sum + i.qty, 0);

  return (
    <>
      {/* Backdrop when expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>setExpanded(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Cart rail */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 md:bottom-4 md:left-auto md:right-4 md:max-w-md md:rounded-2xl bg-background/95 backdrop-blur-xl border border-line shadow-2xl"
      >
        {/* Compact bar — always visible */}
        <button
          onClick={() =>setExpanded(!expanded)}
          className="w-full flex items-center justify-between gap-3 p-4 md:rounded-2xl hover:bg-muted/30 transition-colors touch-target"
          aria-expanded={expanded}
          aria-label={`Корзина: ${totalQty} позиций, ${grandTotal.toLocaleString('ru-RU')} ₽. ${expanded ? 'Свернуть' : 'Развернуть'}`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="relative shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span className="absolute -top-2 -right-2 bg-gold-text text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            </div>
            <div className="text-left min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">
                {totalQty} {totalQty === 1 ? 'позиция' : totalQty < 5 ? 'позиции' : 'позиций'} в меню
              </p>
              <p className="text-xs text-muted-foreground truncate">
                ≈ {grandTotal.toLocaleString('ru-RU')} ₽ на {guestCount || '?'} гостей
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <motion.svg
              animate={{ rotate: expanded ? 180 : 0 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"/>
            </motion.svg>
          </div>
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line"
            >
              <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
                {items.map((item, i) =>(
                  <motion.div
                    key={`${item.dishId}-${item.groupId || 'default'}-${i}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-card border border-line"
                  >
                    {item.dish && (
                      <div className="w-12 h-12 rounded overflow-hidden bg-secondary shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getDishImage(item.dish.id, item.dish.station)}
                          alt={item.dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.dish?.name || item.dishId}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.dish?.pricePerGuest || 0} ₽ × {item.qty} × {guestCount || 1}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>setItemQty(item.dishId, Math.max(1, item.qty - 1))}
                        className="w-11 h-11 rounded border border-line text-xs hover:border-gold-text"
                        aria-label="Уменьшить"
                      >−</button>
                      <span className="text-xs font-semibold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() =>setItemQty(item.dishId, item.qty + 1)}
                        className="w-11 h-11 rounded border border-line text-xs hover:border-gold-text"
                        aria-label="Увеличить"
                      >+</button>
                      <button
                        onClick={() =>removeDish(item.dishId)}
                        className="ml-1 w-11 h-11 rounded text-muted-foreground hover:text-destructive"
                        aria-label="Удалить"
                      >✕</button>
                    </div>
                  </motion.div>
                ))}
                {items.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">Корзина пуста</p>
                )}
              </div>

              {/* Footer with CTA */}
              <div className="border-t border-line p-3 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Итого (≈ на {guestCount || 0} гостей):</span>
                  <span className="font-bold text-gold-text">{grandTotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                <Link
                  href="/plan/constructor"
                  className="block w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground text-center hover:bg-primary/90 transition-colors"
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
