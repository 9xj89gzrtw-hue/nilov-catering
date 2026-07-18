'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Calculator, Check } from 'lucide-react';
import Link from 'next/link';
import MaskReveal from '@/components/effects/TextReveal';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden" aria-label="Заказать кейтеринг">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-background to-burgundy/10" />
      <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/gallery/banket.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Готовы обсудить?</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95] mb-6">
            Рассчитайте стоимость<br /><span className="text-gold italic">за 2 минуты</span>
          </h2>
          <p className="text-sm text-cream-muted max-w-lg mx-auto mb-10">
            Соберите меню в конструкторе — мгновенный расчёт, без скрытых платежей. Или позвоните — ответим за 15 минут.
          </p>

          {/* Two main CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link href="/constructor" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-dark text-background font-heading text-lg rounded-lg hover:opacity-90 transition-opacity min-h-[44px] w-full sm:w-auto justify-center">
              <Calculator className="w-5 h-5" />
              Открыть конструктор
            </Link>
            <a href="tel:+78129195911" className="inline-flex items-center gap-2 px-8 py-4 border border-border text-cream font-heading text-lg rounded-lg hover:border-gold/50 transition-colors min-h-[44px] w-full sm:w-auto justify-center">
              <Phone className="w-5 h-5 text-gold" />
              +7 (812) 919-59-11
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['19 лет опыта', '3000+ мероприятий', 'Эрмитаж · Мариинский', 'Доставка в КАД включена'].map(badge => (
              <span key={badge} className="inline-flex items-center gap-1.5 text-xs text-cream-muted px-3 py-1.5 rounded-full border border-border">
                <Check className="w-3 h-3 text-gold" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
