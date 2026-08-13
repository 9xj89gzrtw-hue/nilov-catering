"use client";
import { useConstructor } from "@/hooks/useConstructor";

export default function DishCartIndicator({ dishId }: { dishId: string }) {
  const inCart = useConstructor((s) => s.selectedItems.some((i) => i.dishId === dishId));
  if (!inCart) return null;
  return (
    <div
      className="animate-fade-in absolute top-1.5 left-1.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white shadow-lg ring-2 ring-white"
      role="status"
      aria-label="Это блюдо уже добавлено в конструктор меню"
    ></div>
  );
}
