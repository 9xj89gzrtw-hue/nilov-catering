"use client";

import { useInView } from "react-intersection-observer";
import { type ReactNode } from "react";

/**
 * InViewWrapper - компонент для reveal-анимаций при скролле
 *
 * Базовое использование:
 * ```tsx
 * <InViewWrapper>
 *   <div>Появится при скролле</div>
 * </InViewWrapper>
 * ```
 *
 * С кастомной анимацией:
 * ```tsx
 * <InViewWrapper
 *   threshold={0.3}
 *   triggerOnce={true}
 *   className="transition-all duration-700"
 *   inViewClassName="opacity-100 translate-y-0"
 *   outOfViewClassName="opacity-0 translate-y-10"
 * >
 *   <h2>Заголовок с анимацией</h2>
 * </InViewWrapper>
 * ```
 */

interface InViewWrapperProps {
  children: ReactNode;
  /** Порог срабатывания (0-1), сколько элемент должно быть видно */
  threshold?: number | number[];
  /** Сработать только один раз */
  triggerOnce?: boolean;
  /** Корневой элемент для наблюдения */
  rootMargin?: string;
  /** Класс когда в области видимости */
  inViewClassName?: string;
  /** Класс когда вне области видимости */
  outOfViewClassName?: string;
  /** Дополнительные классы */
  className?: string;
  /** Callback при изменении видимости */
  onChange?: (inView: boolean) => void;
}

export function InViewWrapper({
  children,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = "0px 0px -50px 0px",
  inViewClassName = "",
  outOfViewClassName = "",
  className = "",
  onChange,
}: InViewWrapperProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin,
    onChange,
  });

  return (
    <div ref={ref} className={`${inView ? inViewClassName : outOfViewClassName} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Хук useScrollReveal - удобная обёртка для анимаций
 *
 * ```tsx
 * function MyComponent() {
 *   const { ref, isInView } = useScrollReveal({ threshold: 0.3 });
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
 *     >
 *       Контент
 *     </div>
 *   );
 * }
 * ```
 */
export function useScrollReveal(options?: {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}) {
  return useInView({
    threshold: options?.threshold ?? 0.1,
    triggerOnce: options?.triggerOnce ?? true,
    rootMargin: options?.rootMargin ?? "0px 0px -50px 0px",
  });
}

/**
 * Готовые варианты анимаций для использования с InViewWrapper
 */
export const scrollAnimations = {
  /** Fade in снизу */
  fadeUp: {
    inView: "opacity-100 translate-y-0",
    outOfView: "opacity-0 translate-y-10",
  },
  /** Fade in сверху */
  fadeDown: {
    inView: "opacity-100 translate-y-0",
    outOfView: "opacity-0 -translate-y-10",
  },
  /** Fade in слева */
  fadeLeft: {
    inView: "opacity-100 translate-x-0",
    outOfView: "opacity-0 -translate-x-10",
  },
  /** Fade in справа */
  fadeRight: {
    inView: "opacity-100 translate-x-0",
    outOfView: "opacity-0 translate-x-10",
  },
  /** Простой fade */
  fadeIn: {
    inView: "opacity-100",
    outOfView: "opacity-0",
  },
  /** Масштаб */
  scaleIn: {
    inView: "scale-100 opacity-100",
    outOfView: "scale-95 opacity-0",
  },
} as const;
