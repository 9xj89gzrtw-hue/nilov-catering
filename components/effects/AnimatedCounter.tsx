'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className = '',
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: '-30px' });
  const [displayed, setDisplayed] = useState(value); // start with value, not 0

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayed(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {displayed.toLocaleString('ru-RU')}
      {suffix}
    </span>
  );
}
