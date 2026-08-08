'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  yOffset?: number; // parallax strength, default 100 (px)
  scaleRange?: [number, number]; // [start, end], default [1.15, 0.95]
}

/**
 * ParallaxSection — обёртка с parallax-эффектом на скролле.
 * Inspired by Ballena Cabo / White Desert Awwwards patterns.
 *
 * Usage:
 *   <ParallaxSection>...content...</ParallaxSection>
 */
export default function ParallaxSection({
  children,
  className = '',
  yOffset = 60,
  scaleRange = [1.0, 1.05],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);

  return (
    <motion.div ref={ref} style={{ y, scale }} className={className}>
      {children}
    </motion.div>
  );
}
