'use client';

import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Props {
  /** min scrollY to show, default 800 */
  minScroll?: number;
  /** CTA target URL, default /plan/helper */
  href?: string;
  /** CTA label, default 'Рассчитать стоимость' */
  label?: string;
}

/**
 * StickyCTA — плавающая кнопка CTA, появляющаяся после скролла.
 * Inspired by Wolfgang Puck Catering (+128% conversion).
 *
 * Usage:
 *   <StickyCTA />  // default: appears after 800px
 */
export default function StickyCTA({ minScroll = 800, href = '/plan/helper', label = 'Рассчитать стоимость' }: Props) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      setShow(v >minScroll);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max >0 ? Math.min(1, v / max) : 0);
    });
    return () =>unsub();
  }, [scrollY, minScroll]);

  const progressScale = useSpring(progress, { stiffness: 200, damping: 30 });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2"
        >
          <div className="relative">
            {/* Progress ring around button */}
            <svg className="absolute -inset-1.5 -rotate-90 pointer-events-none" viewBox="0 0 60 60" aria-hidden="true">
              <motion.circle
                cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-gold-text"
                style={{ pathLength: progressScale, scale: 1 }}
                transform="scale(0.96) translate(1.25, 1.25)"
              />
            </svg>
            <Link
              href={href}
              className="relative flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 md:px-6 md:py-4 text-sm font-semibold shadow-xl shadow-gold/20 hover:shadow-2xl hover:shadow-gold/30 hover:scale-[1.03] active:scale-[0.97] transition-all touch-target"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
              {label}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
