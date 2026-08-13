"use client";

/**
 * AUTO ANIMATE WRAPPER
 *
 * Использует @formkit/auto-animate для анимации списков
 * Просто оберните любой контейнер и его дети будут анимироваться
 *
 * Пример:
 * <AutoAnimate>
 *   {items.map(item => <div key={item.id}>{item.name}</div>)}
 * </AutoAnimate>
 */

import { useAutoAnimate } from "@formkit/auto-animate/react";

interface AutoAnimateProps {
  children: React.ReactNode;
  className?: string;
  /** Длительность анимации в мс (default: 300) */
  duration?: number;
}

export function AutoAnimate({ children, className, duration = 300 }: AutoAnimateProps) {
  const [parent] = useAutoAnimate({
    duration,
    easing: "ease-out",
    disrespectUserMotionPreference: false, // Уважает prefers-reduced-motion
  });

  return (
    <div ref={parent} className={className}>
      {children}
    </div>
  );
}

export default AutoAnimate;
