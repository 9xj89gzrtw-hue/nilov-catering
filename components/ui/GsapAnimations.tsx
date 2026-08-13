"use client";

/**
 * GSAP ANIMATIONS HOOK
 *
 * Обёртка над GSAP для анимаций мирового уровня
 * Использует @gsap/react для интеграции с React
 *
 * ВОЗМОЖНОСТИ:
 * - ScrollTrigger анимации при скролле
 * - Text reveal по буквам/словам
 * - Parallax эффекты
 * - Smooth reveal секций
 * - Magnetic кнопки
 */

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагины
gsap.registerPlugin(ScrollTrigger);

// ============================================
// HOOK: Fade In Up при появлении в viewport
// ============================================

export function useFadeInUp(delay = 0, duration = 0.8) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [delay, duration]);

  return ref;
}

// ============================================
// HOOK: Stagger reveal для списков
// ============================================

export function useStaggerChildren(stagger = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.children;

    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [stagger]);

  return ref;
}

// ============================================
// HOOK: Parallax эффект
// ============================================

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      yPercent: speed * 50,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed]);

  return ref;
}

// ============================================
// HOOK: Text reveal (по словам)
// ============================================

export function useTextReveal() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Разбиваем текст на слова
    const text = el.textContent || "";
    const words = text.split(" ");
    el.innerHTML = words.map((word) => `<span class="inline-block">${word}</span>`).join(" ");

    const spans = el.querySelectorAll("span");

    gsap.fromTo(
      spans,
      { y: "100%", opacity: 0, rotateX: -80 },
      {
        y: "0%",
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}

// ============================================
// HOOK: Scale on scroll
// ============================================

export function useScaleReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}

// ============================================
// COMPONENT: Magnetic Button
// ============================================

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const button = ref.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const button = ref.current;
    if (!button) return;

    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ============================================
// COMPONENT: Animated Counter
// ============================================

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        onEnter: () => {
          hasAnimated.current = true;
        },
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.value).toLocaleString("ru-RU")}${suffix}`;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [target, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

// Export GSAP for advanced usage
export { gsap, ScrollTrigger };
