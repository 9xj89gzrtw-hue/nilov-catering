'use client';

import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Запирает фокус внутри контейнера. Escape — закрывает через onClose.
 * 04_BLOCKS.md §A6
 */
export function useFocusTrap(active: boolean, onClose?: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    previousFocus.current = document.activeElement as HTMLElement;

    const el = ref.current;
    if (!el) return;

    const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Автофокус на первый элемент
    first?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }

      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    el.addEventListener('keydown', handleKeyDown);

    return () => {
      el.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [active, onClose]);

  return ref as RefObject<HTMLDivElement>;
}