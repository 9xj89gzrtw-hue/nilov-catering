'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Utensils, CalendarCheck, PartyPopper } from 'lucide-react';
import MaskReveal from '@/components/effects/TextReveal';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Знакомство',
    description: 'Обсуждаем концепцию, формат и ваш бюджет. Выслушиваем пожелания и предлагаем варианты.',
  },
  {
    icon: Utensils,
    number: '02',
    title: 'Меню',
    description: 'Шеф-повар готовит авторское меню. Вы утверждаете состав и приезжаете на дегустацию.',
  },
  {
    icon: CalendarCheck,
    number: '03',
    title: 'Подготовка',
    description: 'Закупаем свежие продукты, координируем логистику и готовим команду к мероприятию.',
  },
  {
    icon: PartyPopper,
    number: '04',
    title: 'Мероприятие',
    description: 'Безупречный сервис от первой до последней минуты. Ваша забота — наслаждаться.',
  },
];

export default function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 md:py-36 bg-muted relative" aria-label="Как мы работаем">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <MaskReveal>
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Процесс</p>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[0.95]">
              Как мы
              <br />
              <span className="text-cream/40">работаем</span>
            </h2>
          </MaskReveal>
        </div>

        {/* Timeline with connecting line */}
        <div className="relative">
          {/* Horizontal line — desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border-light" />
          {/* Animated progress line */}
          <motion.div
            className="hidden lg:block absolute top-12 left-0 h-px bg-gradient-to-r from-gold/60 to-gold/20"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {/* Dot on line */}
                  <div className="hidden lg:flex items-center justify-center mb-8">
                    <div className="w-6 h-6 rounded-full border-2 border-gold/60 bg-background flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    </div>
                  </div>

                  {/* Number */}
                  <span className="block font-heading text-5xl md:text-6xl font-semibold text-gold/[0.08] leading-none mb-4">
                    {step.number}
                  </span>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                      <Icon className="w-4 h-4 text-burgundy-light" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-cream">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-cream-muted leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}