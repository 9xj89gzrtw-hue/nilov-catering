"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Clock, ArrowRight } from "lucide-react";

const CTA_IMG = "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&h=800&fit=crop";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Countdown to end of month (scarcity/urgency)
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth.getTime() - now.getTime();

    const interval = setInterval(() => {
      const remaining = endOfMonth.getTime() - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        hours: Math.floor(remaining / (1000 * 60 * 60)),
        minutes: Math.floor((remaining / (1000 * 60)) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    }, 1000);

    setTimeLeft({
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 text-white/90 text-sm">
      <Clock className="w-4 h-4 text-accent" />
      <span>Специальное предложение действует ещё:</span>
      <div className="flex gap-1.5 font-mono font-bold">
        <span className="bg-white/10 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="text-accent">:</span>
        <span className="bg-white/10 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span className="text-accent">:</span>
        <span className="bg-white/10 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, "0")}</span>
      </div>
    </div>
  );
}

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={CTA_IMG}
          alt="Закажите кейтеринг"
          fill
          className="object-cover"
          placeholder="empty"
        />
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Бесплатная дегустация при заказе до конца месяца
          </motion.div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Готовы создать
            <span className="text-accent"> незабываемое</span> мероприятие?
          </h2>
          <p className="text-white/80 text-lg mb-6">
            Свяжитесь с нами для бесплатной консультации и расчёта стоимости.
            Мы ответим в течение 2 часов.
          </p>

          <div className="mb-8 flex justify-center">
            <CountdownTimer />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/quote"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25 group"
              >
                Получить расчёт бесплатно
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="tel:+74959213456"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg px-8 py-3 text-sm font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                +7 (495) 921-34-56
              </a>
            </motion.div>
          </div>

          <p className="text-white/50 text-xs mt-6">
            Более 850 мероприятий проведено безупречно · Гарантия возврата предоплаты
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}