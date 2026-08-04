'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChefHat, Leaf, ShieldCheck, Users } from 'lucide-react';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

const PILLARS = [
  {
    icon: ChefHat,
    title: 'Шеф-команда из ресторанов СПб',
    desc: 'Дмитрий Нилов и 4 су-шефа из Michelins-listed ресторанов. Готовят на вашей площадке, не везут готовое.',
  },
  {
    icon: Leaf,
    title: 'Сезонные продукты с фермерских хозяйств',
    desc: 'Прямые контракты с Лен. областью и Карелией: рыба, молочка, овощи, зелень. Меню пересобираем 4 раза в год.',
  },
  {
    icon: ShieldCheck,
    title: '14 аллергенов по ТР ТС 022/2011',
    desc: 'Маркируем каждое блюдо. Халяль — сертификат Духовного управления мусульман РФ. Страхование ГО 5 млн ₽.',
  },
  {
    icon: Users,
    title: '40 человек в штате, не на аутсорсе',
    desc: 'Официанты, повара, бармены, координаторы — все с медкнижками и санминимумом. Не «звоним друзьям».',
  },
];

const STATS = [
  { v: 19,   s: '',   l: 'лет в СПб' },
  { v: 3000, s: '+',  l: 'событий' },
  { v: 40,   s: '+',  l: 'в команде' },
  { v: 98,   s: '%',  l: 'повторных клиентов' },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="why-us-heading">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 md:sticky md:top-24"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3">О компании</p>
            <h2 id="why-us-heading" className="font-heading text-3xl md:text-5xl mb-5" style={{ fontWeight: 500 }}>
              19 лет на кухне Петербурга
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
              Дмитрий Нилов открыл производство на Васильевском в 2007 году. Начали с кофе-брейков на 20 человек —
              сегодня проводим банкеты на 200 гостей и фестивали на 800+. Без франшизы, без аутсорса — вся команда в штате.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              Работаем с физлицами и компаниями. Для B2B — договор, УПД, ЭДО (Диадок/СБИС), страхование ответственности 5–30 млн ₽.
              Участвуем в тендерах по 44-ФЗ и 223-ФЗ.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8">
              {STATS.map((s) => (
                <div key={s.l} className="text-center md:text-left">
                  <div className="font-heading text-2xl md:text-3xl font-semibold text-gold-text">
                    <AnimatedCounter value={s.v} suffix={s.s} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>

            <Link
              href="/why-us"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-text hover:underline no-underline"
            >
              Все принципы и команда
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Right — pillars */}
          <div className="md:col-span-7 space-y-4">
            {PILLARS.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex gap-5 p-5 md:p-6 rounded-2xl border border-line bg-card hover:border-gold-text/40 transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-tint flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-gold-text" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-lg md:text-xl mb-1.5" style={{ fontWeight: 500 }}>{p.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
