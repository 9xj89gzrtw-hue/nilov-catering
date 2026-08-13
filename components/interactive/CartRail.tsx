"use client";

import { useState } from "react";
import Link from "next/link";
import { useConstructor } from "@/hooks/useConstructor";
import { ALL_DISHES } from "@/lib/menu-data";
import { X, ShoppingBag, ArrowRight } from "lucide-react";

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

  const dishName = (id: string) => ALL_DISHES.find((d) => d.id === id)?.name || id;
  const dishPrice = (id: string) => ALL_DISHES.find((d) => d.id === id)?.pricePerGuest || 0;

  // Desktop: always visible sidebar
  // Mobile: toggle button + slide-up sheet
  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-primary-foreground fixed right-4 bottom-20 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg md:hidden"
        aria-label="Открыть корзину"
      >
        <ShoppingBag className="h-5 w-5" />
        {items.length > 0 && (
          <span className="text-primary flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold">
            {items.length}
          </span>
        )}
      </button>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="bg-card border-line absolute right-0 bottom-0 left-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-heading text-lg font-medium">Ваше меню ({items.length})</h3>
              <button
                onClick={() => setOpen(false)}
                className="hover:bg-secondary flex h-8 w-8 items-center justify-center rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {items.length === 0 ? (
              <p className="text-muted-foreground py-8 text-center text-sm">
                Нажимайте «+ В меню» на блюдах, чтобы собрать меню
              </p>
            ) : (
              <CartContent
                items={items}
                dishName={dishName}
                dishPrice={dishPrice}
                total={total}
                guests={guests}
                store={store}
              />
            )}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-20 hidden w-80 shrink-0 self-start md:block">
        <div className="bg-card border-line max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShoppingBag className="text-gold-text h-5 w-5" />
            <h3 className="font-heading text-lg font-medium">Ваше меню</h3>
            {items.length > 0 && (
              <span className="bg-gold-tint text-gold-text ml-auto rounded-full px-2 py-0.5 text-xs font-semibold">
                {items.length} блюд
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-2 text-sm">Корзина пуста</p>
              <p className="text-muted-foreground text-xs">
                Нажимайте «+ В меню» на блюдах, чтобы собрать меню
              </p>
            </div>
          ) : (
            <CartContent
              items={items}
              dishName={dishName}
              dishPrice={dishPrice}
              total={total}
              guests={guests}
              store={store}
            />
          )}
        </div>
      </aside>
    </>
  );
}

function CartContent({
  items,
  dishName,
  dishPrice,
  total,
  guests,
  store,
}: {
  items: { dishId: string; qty: number }[];
  dishName: (id: string) => string;
  dishPrice: (id: string) => number;
  total: number;
  guests: number;
  store: {
    setGuestCount: (n: number) => void;
    removeDish: (id: string) => void;
    clearItems: () => void;
  };
}) {
  return (
    <>
      {/* Guest count */}
      <div className="bg-secondary/50 mb-4 rounded-xl p-3">
        <label className="text-muted-foreground mb-1 block text-xs">Гостей</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => store.setGuestCount(Math.max(4, guests - 5))}
            className="border-line hover:border-gold-text flex h-8 w-8 items-center justify-center rounded-lg border"
          >
            −
          </button>
          <input
            type="number"
            value={guests}
            onChange={(e) => store.setGuestCount(Math.max(4, parseInt(e.target.value) || 4))}
            className="flex-1 border-none bg-transparent text-center text-lg font-semibold outline-none"
            min={4}
          />
          <button
            onClick={() => store.setGuestCount(guests + 5)}
            className="border-line hover:border-gold-text flex h-8 w-8 items-center justify-center rounded-lg border"
          >
            +
          </button>
        </div>
      </div>

      {/* Items list */}
      <div className="mb-4 max-h-[40vh] space-y-2 overflow-y-auto">
        {items.map((item) => (
          <div key={item.dishId} className="bg-secondary/30 flex items-center gap-2 rounded-lg p-2">
            <div className="min-w-0 flex-1">
              <p className="text-foreground line-clamp-1 text-xs font-medium">
                {dishName(item.dishId)}
              </p>
              <p className="text-muted-foreground text-[10px]">
                {dishPrice(item.dishId)} ₽ × {item.qty}
              </p>
            </div>
            <button
              onClick={() => store.removeDish(item.dishId)}
              className="text-muted-foreground hover:text-destructive flex h-6 w-6 items-center justify-center rounded"
              aria-label="Удалить"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-line mb-4 border-t pt-3">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-muted-foreground text-sm">Итого</span>
          <span className="font-heading text-foreground text-2xl font-semibold">
            {total.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <p className="text-muted-foreground text-xs">
          {guests} гостей · ≈ {guests > 0 ? Math.round(total / guests).toLocaleString("ru-RU") : 0}{" "}
          ₽/гость
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/plan/constructor"
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold no-underline transition-colors"
      >
        Оформить заявку
        <ArrowRight className="h-4 w-4" />
      </Link>
      <button
        onClick={() => store.clearItems()}
        className="text-muted-foreground hover:text-foreground mt-2 w-full text-xs"
      >
        Очистить меню
      </button>
    </>
  );
}
