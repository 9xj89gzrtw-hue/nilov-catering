'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { num: 1, label: 'Заявка',     desc: 'Выберите формат и меню — 3 вопроса, 30 секунд' },
  { num: 2, label: 'Звонок',     desc: 'Менеджер перезвонит за 15 минут в рабочее время' },
  { num: 3, label: 'Договор',    desc: 'Фиксируем дату, цену и состав меню в договоре' },
  { num: 4, label: 'Событие',    desc: 'Привозим, сервируем, обслуживаем, убираем' },
];

export default function ProcessSteps() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="process-heading">
      <div className="container-site">
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3"
          >
            Процесс
          </motion.p>
          <motion.h2
            id="process-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Как мы работаем
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-5 md:p-6 rounded-2xl bg-card border border-line"
            >
              {/* Step number circle */}
              <div className="w-10 h-10 rounded-full bg-foreground text-background font-mono text-sm font-semibold flex items-center justify-center mb-3">
                {step.num}
              </div>
              <h3 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>{step.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

              {/* Arrow connector (desktop only) */}
              {idx < STEPS.length - 1 && (
                <ArrowRight
                  className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-gold-text/40 -translate-y-1/2"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Link
            href="/plan/helper"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-all no-underline shadow-sm"
          >
            Начать планирование
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
