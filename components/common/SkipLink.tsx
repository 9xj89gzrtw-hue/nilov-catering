"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SkipLink() {
  const [focused, setFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`fixed top-0 left-0 z-[100] px-4 py-2 bg-accent text-white font-medium text-sm transition-all duration-200 ${
        focused
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => setFocused(false)}
    >
      Перейти к основному содержанию
    </a>
  );
}

export function RippleButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative overflow-hidden ${className}`}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}