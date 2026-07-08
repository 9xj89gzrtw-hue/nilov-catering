"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

interface CountUpNumberProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export default function CountUpNumber({
  value,
  suffix = "",
  label,
  className,
}: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div className={className}>
      <span ref={ref} className="text-4xl md:text-5xl font-heading font-bold text-accent">
        {displayValue.toLocaleString("ru-RU")}{suffix}
      </span>
      <p className="mt-2 text-primary-foreground/70 text-sm">{label}</p>
    </div>
  );
}