"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Utensils, ArrowRight } from "lucide-react";
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
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MenuCard item={item} onAdd={addItem} />
          </motion.div>
        </AnimatedSection>
      ))}
    </div>
  );
}

export default function MenuPreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase mb-4"
            >
              <Utensils className="w-3.5 h-3.5" />
              Наше меню
            </motion.div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Популярные <span className="gradient-text">блюда</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Отборные позиции из нашего меню, которые чаще всего выбирают наши клиенты.
              каждое блюдо — авторская разработка шеф-повара
            </p>
          </div>
        </AnimatedSection>

        <MenuBuilderProvider>
          <MenuGrid />
        </MenuBuilderProvider>

        <AnimatedSection delay={0.3}>
          <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/menu"
                className="btn-glow group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-300 shadow-lg shadow-accent/25"
              >
                Всё меню
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link
                href="/menu"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold border border-border text-foreground hover:border-accent/50 hover:text-accent transition-all duration-300"
              >
                Скачать PDF меню
              </Link>
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}