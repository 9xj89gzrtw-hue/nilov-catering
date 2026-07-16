'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MaskReveal from '@/components/effects/TextReveal';

export default function PhilosophySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Философия"
    >
      {/* Decorative gold line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background video */}
      <video
        src="/videos/sections/philosophy.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[#0A0A0A]/60 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left — decorative number + quote */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Large decorative quote mark */}
            <span className="absolute -top-8 -left-4 font-heading text-[8rem] lg:text-[12rem] text-gold/[0.06] leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            <MaskReveal>
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-6">
                Наша философия
              </p>
            </MaskReveal>

            <MaskReveal delay={0.1}>
              <blockquote className="font-heading text-2xl sm:text-3xl lg:text-[2.5rem] text-cream/90 leading-[1.2] font-normal italic max-w-xl">
                Мы верим, что каждое блюдо — это история, а каждый праздник заслуживает быть безупречным
              </blockquote>
            </MaskReveal>

            <MaskReveal delay={0.3}>
              <div className="mt-8 max-w-lg">
                <p className="text-sm text-cream/40 leading-relaxed">
                  Основатель Алексей Нилов привез в Санкт-Петербург традиции французской haute cuisine, соединив их с русскими кулинарными традициями. Каждый банкет — это авторское меню, созданное специально для вас, где нет шаблонов, только индивидуальный подход.
                </p>
              </div>
            </MaskReveal>

            {/* Signature */}
            <MaskReveal delay={0.5}>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-12 h-px bg-gold/40" />
                <span className="font-heading text-lg text-gold/60 italic">Алексей Нилов</span>
                <span className="text-[10px] uppercase tracking-widest text-cream-muted/30">
                  Основатель и шеф
                </span>
              </div>
            </MaskReveal>
          </motion.div>

          {/* Right — key values */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[
              { num: '01', title: 'Авторский подход', desc: 'Каждое меню создаётся с нуля под ваш праздник и предпочтения гостей' },
              { num: '02', title: 'Безупречный сервис', desc: 'Обученная команда официантов и координаторов обеспечивает безупречную подачу' },
              { num: '03', title: 'Свежие продукты', desc: 'Работаем только с проверенными поставщиками и сезонными ингредиентами' },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                className="group border-l border-border pl-6 hover:border-gold/50 transition-colors duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              >
                <span className="text-[10px] font-mono text-gold/40 tracking-wider">{item.num}</span>
                <h3 className="font-heading text-xl text-cream mt-1 group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-cream/35 leading-relaxed mt-2 max-w-xs">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative gold line bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}