"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
  speed?: number;
}

export default function ParallaxImage({
  src,
  alt,
  className,
  overlay = true,
  speed = 0.2,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          placeholder="empty"
        />
      </motion.div>
      {overlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}
    </div>
  );
}