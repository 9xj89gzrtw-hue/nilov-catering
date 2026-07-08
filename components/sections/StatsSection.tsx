"use client";

import { Calendar, PartyPopper, Users, Star } from "lucide-react";
import AnimatedSection from "@/components/common/AnimatedSection";
import CountUpNumber from "@/components/common/CountUpNumber";
import { stats } from "@/lib/data";
import { motion } from "framer-motion";

const statIcons = [Calendar, PartyPopper, Users, Star];

export default function StatsSection() {
  return (
    <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <p className="text-center text-primary-foreground/50 text-xs tracking-[0.2em] uppercase mb-10 md:mb-14 font-medium">
            Цифры, которые говорят за нас
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <AnimatedSection key={stat.label} delay={i * 0.12}>
                <div className="text-center group relative">
                  {/* Decorative glow on hover */}
                  <motion.div
                    className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 rounded-2xl transition-colors duration-500 -m-4"
                  />

                  <div className="relative">
                    <motion.div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-foreground/10 mb-4 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-5 h-5 text-accent" />
                    </motion.div>
                    <CountUpNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                    />
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}