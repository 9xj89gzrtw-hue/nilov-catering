'use client';

import { motion, type Variants } from 'framer-motion';
import {
  ShieldCheck,
  Clock,
  Calendar,
  Sparkles,
  Users,
  FileCheck,
  type LucideIcon,
} from 'lucide-react';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

// ═══════════════════════════════════════════════════════════════════════════
// TrustBlock — блок доверия с ключевыми аргументами CRO
// Решает критику: "Страхование 30 млн упомянуто только в кейсе"
//
// Ключевые элементы:
// 1. Страхование ответственности 5–30 млн ₽
// 2. Гарантия опозданий (>15 мин = бесплатно)
// 3. 19 лет опыта (с 2007 года)
// 4. 3000+ мероприятий
// 5. 40+ человек в штате
// 6. Лицензии и сертификаты
// ═══════════════════════════════════════════════════════════════════════════

interface TrustItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: {
    value: number;
    prefix?: string;
    suffix: string;
  };
  badge?: string;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    id: 'insurance',
    icon: ShieldCheck,
    title: 'Страхование ответственности',
    description: 'Покрытие до 30 млн ₽ на каждое мероприятие. Ваша защита от любых форс-мажоров.',
    highlight: {
      value: 30,
      prefix: 'до ',
      suffix: ' млн ₽',
    },
    badge: 'Гарантия',
  },
  {
    id: 'punctuality',
    icon: Clock,
    title: 'Гарантия пунктуальности',
    description: 'Опоздаем больше 15 минут — обслуживание бесплатно. Точность — наш приоритет.',
    badge: '15 мин',
  },
  {
    id: 'experience',
    icon: Calendar,
    title: '19 лет опыта',
    description: 'Работаем в Санкт-Петербурге с 2007 года. Знаем все площадки и особенности города.',
    highlight: {
      value: 19,
      suffix: '+ лет',
    },
  },
  {
    id: 'events',
    icon: Sparkles,
    title: '3000+ мероприятий',
    description: 'От кофе-брейков до фестивалей на 800+ гостей. Разный масштаб — один подход.',
    highlight: {
      value: 3000,
      suffix: '+',
    },
  },
  {
    id: 'team',
    icon: Users,
    title: '40+ человек в штате',
    description: 'Повара, официанты, бармены, координаторы — все с медкнижками. Никакого аутсорса.',
    highlight: {
      value: 40,
      suffix: '+',
    },
  },
  {
    id: 'licenses',
    icon: FileCheck,
    title: 'Лицензии и сертификаты',
    description: 'ТР ТС 022/2011, СМР халяль, 152-ФЗ. Полная юридическая чистота.',
    badge: 'Сертификаты',
  },
];

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut' as const,
    },
  },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function TrustBlock() {
  return (
    <section
      className="py-20 md:py-28 bg-secondary/50 relative overflow-hidden"
      aria-labelledby="trust-block-heading"
    >
      {/* Subtle gold accent line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-gold-text) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-site">
        {/* ─── Section Header ─────────────────────────────────────────── */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' as const }}
            className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3 font-medium"
          >
            Гарантии и доверие
          </motion.p>

          <motion.h2
            id="trust-block-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: 'easeOut' as const, delay: 0.05 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ fontWeight: 500 }}
          >
            Почему нам доверяют{' '}
            <span className="text-gold-text">3000+ клиентов</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Честные цифры и реальные гарантии. Каждый пункт проверяемый —
            документы предоставляем по запросу.
          </motion.p>
        </div>

        {/* ─── Trust Cards Grid ───────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TRUST_ITEMS.map((item) => (
            <TrustCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ─── Bottom Note ───────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-xs text-muted-foreground/70 mt-10 md:mt-12"
        >
          Все данные верифицированы. Запросить документы:{' '}
          <a
            href="mailto:b2b@nilov-catering.ru?subject=Запрос документов"
            className="inline-flex items-center min-h-[44px] px-3 py-2 text-gold-text hover:underline underline-offset-2"
            aria-label="Отправить email на b2b@nilov-catering.ru"
          >
            b2b@nilov-catering.ru
          </a>
        </motion.p>
      </div>
    </section>
  );
}

// ─── Card Component ─────────────────────────────────────────────────────────

function TrustCard({ item }: { item: TrustItem }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col p-6 md:p-8 rounded-xl border border-line bg-card
        transition-all duration-300
        hover:border-gold-text/40 hover:shadow-lg hover:shadow-gold/5
        focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      tabIndex={0}
      role="article"
      aria-label={item.title}
    >
      {/* Badge (if present) */}
      {item.badge && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gold-tint text-gold-text">
            {item.badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gold-tint text-gold-text mb-5 group-hover:scale-105 transition-transform duration-300">
        <Icon className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
      </div>

      {/* Title & Description */}
      <h3
        className="font-heading text-lg md:text-xl mb-2.5"
        style={{ fontWeight: 500 }}
      >
        {item.title}
      </h3>

      <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-grow">
        {item.description}
      </p>

      {/* Highlight Value (if present) */}
      {item.highlight && (
        <div className="mt-4 pt-4 border-t border-line/60">
          <span className="text-2xl md:text-3xl font-heading font-semibold text-gold-text tabular-nums">
            {item.highlight.prefix}
            <AnimatedCounter
              value={item.highlight.value}
              suffix={item.highlight.suffix}
              className="tabular-nums"
            />
          </span>
        </div>
      )}
    </motion.div>
  );
}
