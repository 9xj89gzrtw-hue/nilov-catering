"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "rotate";
  blur?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0, scale: 1, rotate: 0 },
  down: { y: -40, x: 0, scale: 1, rotate: 0 },
  left: { x: 40, y: 0, scale: 1, rotate: 0 },
  right: { x: -40, y: 0, scale: 1, rotate: 0 },
  scale: { y: 0, x: 0, scale: 0.9, rotate: 0 },
  rotate: { y: 20, x: 0, scale: 1, rotate: -2 },
};

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const initial = directionMap[direction];

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...initial,
        filter: blur ? "blur(6px)" : "none",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1], // custom cubic-bezier for snappy feel
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}