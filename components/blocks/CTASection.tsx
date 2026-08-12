import Link from 'next/link';
import { Phone, MessageCircle, Calendar, ShieldCheck, Truck, Users } from 'lucide-react';
import { SITE } from '@/lib/data';

const GUARANTEES = [
  { icon: Calendar,     title: 'Бронь за 3 дня',     desc: 'Фиксируем дату и цену в договоре' },
  { icon: Truck,        title: 'Доставка вовремя',   desc: 'SLA ±15 минут. Опоздание — штраф 1% за минуту (макс. 30%)' },
  { icon: ShieldCheck,  title: '14 аллергенов',      desc: 'Маркируем каждое блюдо — глютен, орехи, молоко и др.' },
  { icon: Users,        title: 'Обученный персонал', desc: 'Официанты, повара, бармены — с медкнижками' },
];

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="cta-heading">
      <div className="container-site max-w-5xl mx-auto">
        {/* Guarantees strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16">
          {GUARANTEES.map((g) => (
            <div key={g.title} className="text-center md:text-left p-4 rounded-xl border border-line bg-card">
              <g.icon className="w-7 h-7 mx-auto md:mx-0 mb-3 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-heading text-base mb-1" style={{ fontWeight: 500 }}>{g.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA panel */}
        <div className="relative overflow-hidden rounded-2xl bg-foreground text-background px-6 py-12 md:px-12 md:py-16 text-center">
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-4">Бесплатно и без обязательств</p>
            <h2 id="cta-heading" className="font-heading text-3xl md:text-5xl mb-4" style={{ fontWeight: 500 }}>
              Рассчитаем за 15 минут
            </h2>
            <p className="text-background/75 mb-8 text-base md:text-lg max-w-xl mx-auto">
              Ответьте на 3 вопроса — получите расчёт с ценой под ваш бюджет.
              Перезвоним в рабочее время (9:00–21:00).
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-6">
              <Link
                href="/plan/helper"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-semibold transition-colors no-underline shadow-sm min-w-[280px]"
              >
                Узнать цену — 3 вопроса
              </Link>
              {/* Secondary CTAs — compact icon buttons, not competing with primary */}
              <div className="flex gap-2 justify-center">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-background/30 text-background hover:bg-background/10 transition-colors no-underline"
                  aria-label="Написать в WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-background/30 text-background hover:bg-background/10 transition-colors no-underline"
                  aria-label="Позвонить"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <p className="text-sm text-background/55">
              Или напишите на почту{' '}
              <a href={`mailto:${SITE.email}`} className="text-background/80 hover:text-gold-text underline underline-offset-2">{SITE.email}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
