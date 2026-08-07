'use client';

import { useEffect } from 'react';

/**
 * ScrollReveal — adds .revealed class to .reveal elements when they enter viewport.
 * Pure CSS animation, no framer-motion needed.
 * Uses IntersectionObserver for performance.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Reveal once
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all .reveal elements
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
