'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Calendar, ShieldCheck, Truck, Users } from 'lucide-react';
import { SITE } from '@/lib/data';

const GUARANTEES = [
  { icon: Calendar,     title: 'Бронь за 24 ч',     desc: 'Фиксируем дату и цену в договоре на 24 часа вперёд' },
  { icon: Truck,        title: 'Доставка вовремя',  desc: 'Опоздаем больше 15 минут — обслуживание бесплатно' },
  { icon: ShieldCheck,  title: '14 аллергенов',     desc: 'Маркировка по ТР ТС 022/2011 на каждое блюдо' },
  { icon: Users,        title: 'Обученный персонал', desc: 'Официанты, повара, бармены — медкнижки и санминимум' },
];

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="cta-heading">
      <div className="container-site max-w-6xl mx-auto">
        {/* Guarantees strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20"
        >
          {GUARANTEES.map((g) => (
            <div key={g.title} className="text-center md:text-left p-4 md:p-5 rounded-xl border border-line bg-card">
              <g.icon className="w-7 h-7 mx-auto md:mx-0 mb-3 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-heading text-base mb-1" style={{ fontWeight: 500 }}>{g.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Big CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-foreground text-background px-6 py-12 md:px-16 md:py-20 text-center"
        >
          {/* Decorative gold accent */}
          <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 rounded-full bg-[#C9A66B]/10 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 rounded-full bg-[#C9A66B]/10 blur-3xl" aria-hidden="true" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.22em] text-[#E8C97E] mb-4">Бесплатно и без обязательств</p>
            <h2 id="cta-heading" className="font-heading text-3xl md:text-5xl mb-4" style={{ fontWeight: 500 }}>
              Рассчитаем меню за 15 минут
            </h2>
            <p className="text-background/75 mb-10 text-base md:text-lg max-w-xl mx-auto">
              Ответьте на 3 вопроса — получите расчёт с ценой под ваш бюджет, количеством гостей и форматом.
              Менеджер перезвонит в рабочее время (9:00–21:00 МСК).
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-6">
              <Link
                href="/plan/helper"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A66B] hover:bg-[#B8924F] text-[#1A1410] px-8 py-4 text-base font-semibold transition-all no-underline shadow-lg"
              >
                Подобрать меню — 3 вопроса
              </Link>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-background/30 text-background hover:bg-background/10 px-8 py-4 text-base font-medium transition-all no-underline"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-background/30 text-background hover:bg-background/10 px-8 py-4 text-base font-medium transition-all no-underline"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Позвонить
              </a>
            </div>

            <p className="text-sm text-background/55">
              Или напишите на почту{' '}
              <a href={`mailto:${SITE.email}`} className="text-background/80 hover:text-[#E8C97E] underline underline-offset-2">{SITE.email}</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
