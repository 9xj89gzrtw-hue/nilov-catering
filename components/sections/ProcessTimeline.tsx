'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageSquare, Utensils, CalendarCheck, PartyPopper } from 'lucide-react';

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
    <section ref={ref} className="py-20 md:py-28 bg-muted" aria-label="Как мы работаем">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 md:mb-18">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">Процесс</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-cream">
            Как мы работаем
          </h2>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                className="relative text-center lg:text-left"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              >
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-border-light" />
                )}

                <span className="font-heading text-4xl font-semibold text-gold/20">
                  {step.number}
                </span>

                <div className="mt-4 flex items-center gap-3 justify-center lg:justify-start">
                  <Icon className="w-5 h-5 text-burgundy-light" />
                  <h3 className="font-heading text-xl font-semibold text-cream">
                    {step.title}
                  </h3>
                </div>

                <p className="mt-3 text-sm text-cream-muted leading-relaxed max-w-xs mx-auto lg:mx-0">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}