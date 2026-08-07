'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useConstructor } from '@/hooks/useConstructor';
import { ALL_DISHES } from '@/lib/menu-data';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * CartRail — sticky persistent cart sidebar on /menu/catalog.
 *
 * Owner: 'меню вообще неудобно просматривать и собирать'
 * Menu UX critic: 'No persistent cart rail on the catalog'
 *
 * Shows: selected dishes, quantities, running total, guest count, CTA.
 * Desktop: right sidebar. Mobile: bottom sheet (toggle).
 */
export default function CartRail() {
  const store = useConstructor();
  const [open, setOpen] = useState(false); // mobile bottom sheet toggle

  const items = store.selectedItems;
  const total = store.total;
  const guests = store.guestCount;

  const dishName = (id: string) => ALL_DISHES.find(d => d.id === id)?.name || id;
  const dishPrice = (id: string) => ALL_DISHES.find(d => d.id === id)?.pricePerGuest || 0;

  // Desktop: always visible sidebar
  // Mobile: toggle button + slide-up sheet
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 z-40 md:hidden flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold shadow-lg"
        aria-label="Открыть корзину"
      >
        <ShoppingBag className="w-5 h-5" />
        {items.length > 0 && (
          <span className="bg-white text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {items.length}
          </span>
        )}
      </button>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl border-t border-line max-h-[70vh] overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-medium">Ваше меню ({items.length})</h3>
              <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Нажимайте «+ В меню» на блюдах, чтобы собрать меню
              </p>
            ) : (
              <CartContent items={items} dishName={dishName} dishPrice={dishPrice} total={total} guests={guests} store={store} />
            )}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block sticky top-20 self-start w-80 shrink-0">
        <div className="bg-card border border-line rounded-2xl p-5 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-gold-text" />
            <h3 className="font-heading text-lg font-medium">Ваше меню</h3>
            {items.length > 0 && (
              <span className="ml-auto text-xs bg-gold-tint text-gold-text px-2 py-0.5 rounded-full font-semibold">
                {items.length} блюд
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground mb-2">
                Корзина пуста
              </p>
              <p className="text-xs text-muted-foreground">
                Нажимайте «+ В меню» на блюдах, чтобы собрать меню
              </p>
            </div>
          ) : (
            <CartContent items={items} dishName={dishName} dishPrice={dishPrice} total={total} guests={guests} store={store} />
          )}
        </div>
      </aside>
    </>
  );
}

function CartContent({ items, dishName, dishPrice, total, guests, store }: {
  items: { dishId: string; qty: number }[];
  dishName: (id: string) => string;
  dishPrice: (id: string) => number;
  total: number;
  guests: number;
  store: { setGuestCount: (n: number) => void; removeDish: (id: string) => void; clearItems: () => void };
}) {
  return (
    <>
      {/* Guest count */}
      <div className="mb-4 p-3 rounded-xl bg-secondary/50">
        <label className="text-xs text-muted-foreground block mb-1">Гостей</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => store.setGuestCount(Math.max(4, guests - 5))}
            className="w-8 h-8 rounded-lg border border-line flex items-center justify-center hover:border-gold-text"
          >−</button>
          <input
            type="number"
            value={guests}
            onChange={(e) => store.setGuestCount(Math.max(4, parseInt(e.target.value) || 4))}
            className="flex-1 text-center text-lg font-semibold bg-transparent border-none outline-none"
            min={4}
          />
          <button
            onClick={() => store.setGuestCount(guests + 5)}
            className="w-8 h-8 rounded-lg border border-line flex items-center justify-center hover:border-gold-text"
          >+</button>
        </div>
      </div>

      {/* Items list */}
      <div className="space-y-2 mb-4 max-h-[40vh] overflow-y-auto">
        {items.map((item) => (
          <div key={item.dishId} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground line-clamp-1">{dishName(item.dishId)}</p>
              <p className="text-[10px] text-muted-foreground">{dishPrice(item.dishId)} ₽ × {item.qty}</p>
            </div>
            <button
              onClick={() => store.removeDish(item.dishId)}
              className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-destructive"
              aria-label="Удалить"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-line pt-3 mb-4">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-sm text-muted-foreground">Итого</span>
          <span className="font-heading text-2xl text-foreground font-semibold">
            {total.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {guests} гостей · ≈ {guests > 0 ? Math.round(total / guests).toLocaleString('ru-RU') : 0} ₽/гость
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/plan/constructor"
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors no-underline"
      >
        Оформить заявку
        <ArrowRight className="w-4 h-4" />
      </Link>
      <button
        onClick={() => store.clearItems()}
        className="w-full text-xs text-muted-foreground hover:text-foreground mt-2"
      >
        Очистить меню
      </button>
    </>
  );
}
