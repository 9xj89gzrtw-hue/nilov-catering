"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useConstructor } from "@/hooks/useConstructor";

export default function CartBadge() {
  const itemCount = useConstructor((s) => s.selectedItems.length);
  const total = useConstructor((s) => s.total);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <Link
        href="/plan/constructor"
        className="hover:bg-secondary touch-target relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors"
        aria-label={
          mounted && itemCount > 0
            ? `Корзина: ${itemCount} блюд, ${total.toLocaleString("ru-RU")} ₽`
            : "Корзина пуста — открыть конструктор меню"
        }
      >
        <ShoppingBag className="h-4 w-4" />
        {mounted && itemCount > 0 && (
          <span
            key={itemCount}
            className="cart-badge-pop bg-destructive ring-background absolute -top-0.5 -right-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold text-white shadow-md ring-2"
          >
            {itemCount}
          </span>
        )}
      </Link>
      <div aria-live="polite" className="sr-only">
        {mounted && itemCount > 0
          ? `В корзине ${itemCount} блюд на сумму ${total.toLocaleString("ru-RU")} рублей`
          : "Корзина пуста"}
      </div>
    </>
  );
}
