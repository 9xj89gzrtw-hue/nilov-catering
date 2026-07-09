'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 1800;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A]"
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-10"
          >
            <span className="font-heading text-4xl md:text-5xl font-semibold text-cream tracking-wide block">
              Нилов
              <span className="text-gold ml-2 font-normal text-2xl md:text-3xl">Кейтеринг</span>
            </span>
            <span className="block text-[10px] uppercase tracking-[0.4em] text-cream-muted mt-3">
              Санкт-Петербург
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-border-light overflow-hidden">
            <motion.div
              className="h-full bg-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress number */}
          <motion.span
            className="mt-4 text-xs font-mono text-cream-muted tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {progress}%
          </motion.span>

          {/* Decorative lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-border-light/30 to-transparent" />
            <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-border-light/30 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}