'use client';
import { useConstructor } from '@/hooks/useConstructor';

export default function DishCartIndicator({ dishId }: { dishId: string }) {
  const inCart = useConstructor(s =>s.selectedItems.some(i =>i.dishId === dishId));
  if (!inCart) return null;
  return (
    <div className="absolute top-1.5 left-1.5 w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center text-lg font-bold ring-2 ring-white shadow-lg z-10 animate-fade-in" role="status" aria-label="Это блюдо уже добавлено в конструктор меню">
      
    </div>
  );
}
