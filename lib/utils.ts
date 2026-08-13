import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - утилита для объединения Tailwind CSS классов
 *
 * Объединяет clsx (условные классы) и tailwind-merge (умное слияние)
 *
 * Использование:
 * ```tsx
 * cn('px-4 py-2', isActive && 'bg-primary', className)
 * cn('text-sm', 'text-lg') // => 'text-lg' (конфликт разрешён)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
