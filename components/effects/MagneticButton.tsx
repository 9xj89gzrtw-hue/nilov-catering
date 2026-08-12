'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () =>void;
  className?: string;
  intensity?: number; // 0.1..0.8, default 0.4
}

/**
 * MagneticButton — кнопка с magnetic-эффектом (притягивается к курсору).
 * Inspired by shadcn.io / ogblocks.dev 2026 patterns.
 *
 * Usage:
 *   <MagneticButton href="/plan/helper">Рассчитать</MagneticButton>
 *   <MagneticButton onClick={handleClick}>Click</MagneticButton>
 */
export default function MagneticButton({ children, href, onClick, className = '', intensity = 0.4 }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.3 });

  const handleMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * intensity);
    y.set((e.clientY - rect.top - rect.height / 2) * intensity);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const motionStyle = { x: sx, y: sy } as const;

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={motionStyle}
        className={className}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={motionStyle}
      className={className}
    >
      {children}
    </motion.button>
  );
}
