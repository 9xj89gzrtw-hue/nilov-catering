"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Clock, ArrowRight, Shield, Award, Zap } from "lucide-react";

const CTA_IMG = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&h=800&fit=crop";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth.getTime() - now.getTime();

    const interval = setInterval(() => {
      const remaining = endOfMonth.getTime() - Date.now();
      if (remaining <= 0) { clearInterval(interval); return; }
      setTimeLeft({
        hours: Math.floor(remaining / (1000 * 60 * 60)),
        minutes: Math.floor((remaining / (1000 * 60)) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    }, 1000);

    setTimeLeft({
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / (1000) % 60)),
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-white/90 text-sm">
      <Clock className="w-4 h-4 text-accent" />
      <span className="hidden sm:inline">Специальное предложение действует ещё:</span>
      <span className="sm:hidden">Предложение:</span>
      <div className="flex gap-1.5 font-mono font-bold">
        {[
          { val: timeLeft.hours, label: "ч" },
          { val: timeLeft.minutes, label: "м" },
          { val: timeLeft.seconds, label: "с" },
        ].map(({ val, label }, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="glass text-white px-2 py-1 rounded text-sm">
              {String(val).padStart(2, "0")}
            </span>
            <span className="text-accent/70 text-[10px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const trustBadges = [
  { icon: Shield, text: "Гарантия возврата" },
  { icon: Award, text: "12 лет опыта" },
  { icon: Zap, text: "Ответ за 2 часа" },
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden grain-overlay">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={CTA_IMG}
          alt="Закажите кейтеринг"
          fill
          className="object-cover"
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
      </motion.div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            Бесплатная дегустация при заказе до конца месяца
          </motion.div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Готовы создать
            <span className="gradient-text"> незабываемое</span> мероприятие?
          </h2>
          <p className="text-white/70 text-lg mb-6 leading-relaxed">
            Свяжитесь с нами для бесплатной консультации и расчёта стоимости.
            Мы ответим в течение 2 часов.
          </p>

          <div className="mb-8 flex justify-center">
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/quote"
                className="btn-glow group inline-flex h-13 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-accent/50"
              >
                Получить расчёт бесплатно
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="tel:+74959213456"
                className="glass group inline-flex h-13 items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/15 transition-all duration-300"
              >
                Позвонить
              </a>
            </motion.div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-white/40 text-xs">
                <Icon className="w-3.5 h-3.5" />
                {text}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}