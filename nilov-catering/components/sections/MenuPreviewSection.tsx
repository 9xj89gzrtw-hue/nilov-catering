"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MenuCard from "@/components/menu/MenuCard";
import AnimatedSection from "@/components/common/AnimatedSection";
import { menuItems } from "@/lib/data";
import { MenuBuilderProvider, useMenuBuilder } from "@/components/menu/MenuBuilder";

const popularItems = menuItems.filter((item) => item.isPopular).slice(0, 6);

function MenuGrid() {
  const { addItem } = useMenuBuilder();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {popularItems.map((item, i) => (
        <AnimatedSection key={item.id} delay={i * 0.08}>
          <MenuCard item={item} onAdd={addItem} />
        </AnimatedSection>
      ))}
    </div>
  );
}

export default function MenuPreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Наше меню
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Популярные блюда
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Отборные позиции из нашего меню, которые чаще всего выбирают наши клиенты
            </p>
          </div>
        </AnimatedSection>

        <MenuBuilderProvider>
          <MenuGrid />
        </MenuBuilderProvider>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-10">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/menu"
                className="inline-flex h-11 items-center justify-center rounded-lg px-6 py-2 text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-colors shadow-md"
              >
                Всё меню
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}