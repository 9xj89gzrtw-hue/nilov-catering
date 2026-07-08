"use client";

import { motion } from "framer-motion";
import { Star, Users, Award, Clock } from "lucide-react";

const proofItems = [
  { icon: Star, value: "4.9/5", label: "Средняя оценка", detail: "на основе 847 отзывов" },
  { icon: Users, value: "850+", label: "Мероприятий", detail: "успешно проведено" },
  { icon: Award, value: "12 лет", label: "Опыта", detail: "в индустрии кейтеринга" },
  { icon: Clock, value: "2 часа", label: "Ответ", detail: "среднее время реакции" },
];

export default function SocialProofBar() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-r from-accent/5 via-gold/5 to-accent/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,120,42,0.04),transparent_70%)]" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {proofItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/10 mb-3 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-sm font-medium text-foreground/80 mt-0.5">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {item.detail}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}