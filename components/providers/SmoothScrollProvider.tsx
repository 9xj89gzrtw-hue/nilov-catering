'use client';

import { useEffect, useRef, createContext, useContext, useCallback, type ReactNode } from 'react';
import Lenis from 'lenis';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: Record<string, unknown>) => void;
}

const ScrollContext = createContext<ScrollContextType>({ lenis: null, scrollTo: () => {} });

export const useSmoothScroll = () => useContext(ScrollContext);

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')!.slice(1);
        const el = document.getElementById(id);
        if (el) {
          lenis.scrollTo(el, { offset: -80 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback((target: string | number, options?: Record<string, unknown>) => {
    lenisRef.current?.scrollTo(target, options);
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}