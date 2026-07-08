"use client";

import { motion } from "framer-motion";

const TRUST_ITEMS = [
  "Газпром", "Сбербанк", "Яндекс", "ВТБ", "Ростех",
  "Лента", "МТС", "Роснефть", "СИБУР", "Лукойл",
];

export default function TrustMarquee() {
  return (
    <section className="py-6 bg-muted/40 dark:bg-muted/20 overflow-hidden border-y border-border/30">
      <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-3 font-medium">
        Нам доверяют ведущие компании России
      </p>
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-muted-foreground/40 dark:text-muted-foreground/30 text-sm font-bold tracking-widest uppercase select-none hover:text-muted-foreground/70 transition-colors duration-300"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </section>
  );
}