"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Sparkles, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/common/AnimatedSection";

const guestRanges = [
  { label: "До 30", min: 1, max: 30 },
  { label: "30–80", min: 30, max: 80 },
  { label: "80–150", min: 80, max: 150 },
  { label: "150–300", min: 150, max: 300 },
  { label: "300+", min: 300, max: 999 },
];

const eventTypes = [
  { label: "Свадьба", emoji: "\uD83D\uDC8D", multiplier: 1.2 },
  { label: "Корпоратив", emoji: "\uD83D\uDCBC", multiplier: 1.0 },
  { label: "День рождения", emoji: "\uD83C\uDF89", multiplier: 0.9 },
  { label: "Выпускной", emoji: "\uD83C\uDF93", multiplier: 0.85 },
];

const BASE_PRICE_PER_GUEST = 3000;

export default function QuickCalcWidget() {
  const [guestRange, setGuestRange] = useState(0);
  const [eventType, setEventType] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const estimate = useMemo(() => {
    const range = guestRanges[guestRange];
    const avgGuests = Math.round((range.min + range.max) / 2);
    const type = eventTypes[eventType];
    const total = avgGuests * BASE_PRICE_PER_GUEST * type.multiplier;
    return {
      guests: avgGuests,
      perGuest: Math.round(BASE_PRICE_PER_GUEST * type.multiplier),
      total: Math.round(total),
      type: type.label,
    };
  }, [guestRange, eventType]);

  return (
    <section className="py-16 md:py-20 relative overflow-hidden noise-bg">
      <div className="absolute inset-0 mesh-gradient" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase mb-4">
              <Calculator className="w-3.5 h-3.5" />
              Быстрый расчёт
            </div>
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Узнайте стоимость за <span className="gradient-text">30 секунд</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Выберите параметры и получите предварительную оценку
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="glass-card rounded-2xl p-6 md:p-8 border-gradient">
            {/* Guest count */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <Users className="w-4 h-4 text-accent" />
                Количество гостей
              </label>
              <div className="grid grid-cols-5 gap-2">
                {guestRanges.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => { setGuestRange(i); setShowResult(false); }}
                    className={`py-2.5 px-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                      guestRange === i
                        ? "bg-accent text-white shadow-lg shadow-accent/30"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Event type */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <Sparkles className="w-4 h-4 text-accent" />
                Тип мероприятия
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {eventTypes.map((type, i) => (
                  <button
                    key={type.label}
                    onClick={() => { setEventType(i); setShowResult(false); }}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      eventType === i
                        ? "bg-accent text-white shadow-lg shadow-accent/30"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{type.emoji}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculate button */}
            <motion.button
              onClick={() => setShowResult(true)}
              className="w-full btn-glow h-13 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all duration-300 shadow-lg shadow-accent/30 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Рассчитать
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-border/50">
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                          {estimate.guests}
                        </p>
                        <p className="text-xs text-muted-foreground">гостей</p>
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-heading font-bold text-accent">
                          {estimate.perGuest.toLocaleString("ru-RU")}
                        </p>
                        <p className="text-xs text-muted-foreground">руб./гость</p>
                      </div>
                      <div>
                        <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                          {estimate.total > 999999
                            ? `${(estimate.total / 1000000).toFixed(1)}м`
                            : `${Math.round(estimate.total / 1000)}к`}
                        </p>
                        <p className="text-xs text-muted-foreground">руб. итого</p>
                      </div>
                    </div>
                    <p className="text-center text-xs text-muted-foreground mb-4">
                      Предварительная оценка для &laquo;{estimate.type}&raquo; на {estimate.guests} гостей
                    </p>
                    <Link
                      href="/quote"
                      className="block w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm text-center leading-[3rem] hover:bg-primary/90 transition-colors"
                    >
                      Получить точный расчёт бесплатно
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}