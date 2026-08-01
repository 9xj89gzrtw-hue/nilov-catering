'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useConstructor } from '@/hooks/useConstructor';

export default function CartBadge() {
  const itemCount = useConstructor(s => s.selectedItems.length);
  const total = useConstructor(s => s.total);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <>
      <Link
        href="/plan/constructor"
        className="relative inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-secondary transition-colors touch-target"
        aria-label={mounted && itemCount > 0 ? `Корзина: ${itemCount} блюд, ${total.toLocaleString('ru-RU')} ₽` : 'Корзина пуста — открыть конструктор меню'}
      >
        <ShoppingBag className="w-4 h-4" />
        {mounted && itemCount > 0 && (
          <span
            key={itemCount}
            className="cart-badge-pop absolute -top-0.5 -right-0.5 bg-destructive text-white text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center ring-2 ring-background shadow-md"
          >
            {itemCount}
          </span>
        )}
      </Link>
      <div aria-live="polite" className="sr-only">
        {mounted && itemCount > 0 ? `В корзине ${itemCount} блюд на сумму ${total.toLocaleString('ru-RU')} рублей` : 'Корзина пуста'}
      </div>
    </>
  );
}
