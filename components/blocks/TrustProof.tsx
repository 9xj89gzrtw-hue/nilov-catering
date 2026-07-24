'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Calendar, Sparkles, Coffee, ShieldCheck, FileText, Truck, ChefHat, ScrollText, ClipboardCheck, Flag } from 'lucide-react';
import type { FactStatus } from '@/lib/types';
import type { TrustProofItem } from '@/lib/cms-store';
import { getIcon } from '@/lib/icon-map';
import AnimatedCounter from '@/components/effects/AnimatedCounter';
import { renderFactItem } from '@/components/facts/FactItem';

// ═══════════════════════════════════════════════
// TrustProof — proof-ряд фактов, доказывающих надёжность компании
// Спека: 04_BLOCKS.md блок 57 (поглотил бывший AwardsStrip)
// Канон: 39_CANON_INDEX.md — отдельный блок, НЕ объединять с TrustBar
// Итерация 9: интеграция CMS — приоритет данных из data/trust-proof.json
// ═══════════════════════════════════════════════

interface TrustFact {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sublabel?: string;
  value: number;
  prefix?: string;
  suffix: string;
  status: FactStatus;
  disclaimer?: string;
}

const FACTS: TrustFact[] = [
  {
    id: 'years',
    icon: Calendar,
    label: 'более 19 лет', // 🟡 fact-checked 2026-07
    sublabel: 'с 2007',
    value: 19,
    suffix: '+',
    status: 'verified',
  },
  {
    id: 'events',
    icon: Sparkles,
    label: 'событий',
    value: 3000,
    suffix: '+',
    status: 'verified',
  },
  {
    id: 'price',
    icon: Coffee,
    label: 'кофе-брейк',
    prefix: 'от ',
    value: 390,
    suffix: ' ₽/гость',
    status: 'verified',
  },
  {
    id: 'allergens',
    icon: ShieldCheck,
    label: 'аллергенов ТР ТС',
    value: 14,
    suffix: '',
    status: 'verified',
  },
  {
    id: 'law152',
    icon: ScrollText,
    label: '152-ФЗ',
    sublabel: 'защита персданных',
    value: 1,
    suffix: '',
    status: 'verified',
  },
  {
    id: 'customs-union',
    icon: ClipboardCheck,
    label: 'ТР ТС 022/2011',
    sublabel: 'пищевая безопасность',
    value: 1,
    suffix: '',
    status: 'verified',
  },
  {
    id: 'kad',
    icon: Truck,
    label: 'доставка в КАД',
    sublabel: '0 ₽, включена',
    value: 1,
    suffix: '',
    status: 'verified',
  },
  {
    id: 'sous-vide',
    icon: ChefHat,
    label: 'кухня су-вид',
    sublabel: 'медленная варка',
    value: 1,
    suffix: '',
    status: 'verified',
  },
  {
    id: 'contract',
    icon: FileText,
    label: 'договор и чек',
    sublabel: 'прозрачные условия',
    value: 1,
    suffix: '',
    status: 'verified',
  },
  {
    id: 'insurance',
    icon: Flag,
    label: 'страховка',
    sublabel: 'ответственность',
    value: 1,
    suffix: '',
    status: 'verified',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function cmsToFacts(cms: TrustProofItem[]): TrustFact[] {
  return cms.map(f => ({
    id: f.id,
    icon: getIcon(f.icon),
    label: f.label,
    sublabel: f.sublabel,
    value: f.value,
    prefix: f.prefix,
    suffix: f.suffix,
    status: (f.status as FactStatus) || 'pending',
  }));
}

export default function TrustProof({ cmsFacts }: { cmsFacts?: TrustProofItem[] }) {
  const items: TrustFact[] = cmsFacts && cmsFacts.length > 0 ? cmsToFacts(cmsFacts) : FACTS;

  return (
    <section className="py-20 bg-background" aria-labelledby="trustproof-heading">
      <div className="container-site">
        <div className="text-center mb-12">
          <h2 id="trustproof-heading" className="font-heading font-medium mb-4">
            Почему нам доверяют
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto text-balance">
            Честные цифры. Ни одной придуманной.
          </p>
        </div>

        <motion.div
          className="flex flex-wrap lg:grid lg:grid-cols-5 gap-3 lg:gap-5 justify-center"
          initial="visible"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.15 }}
        >
          {items.map((fact) => (
            <motion.div
              key={fact.id}
              variants={cardVariants}
              className="relative flex flex-col items-center text-center lg:p-6 lg:rounded-xl lg:border lg:border-line lg:bg-card
                transition-shadow duration-300 lg:hover:shadow-md lg:hover:shadow-gold/5"
            >
              <div className="mb-2 lg:mb-4 flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-gold-tint text-gold-text">
                <fact.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <FactValue fact={fact} />
              <p className="text-xs lg:text-sm text-muted-foreground mt-1">{fact.label}</p>
              {fact.sublabel && (
                <p className="text-xs text-muted-foreground/70 mt-0.5">{fact.sublabel}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-6 lg:mt-12">
          <Link
            href="/why-us"
            className="inline-flex items-center gap-2 rounded-lg border border-gold-text px-6 py-3 text-sm font-semibold text-gold-text
              transition-all duration-300 hover:bg-gold-text hover:text-background
              focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Узнать больше
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5l3.5 3.5-3.5 3.5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FactValue({ fact }: { fact: TrustFact }) {
  if (fact.value === 1 && !fact.suffix) {
    return (
      <span className="text-3xl lg:text-4xl font-heading font-semibold text-green-600 tabular-nums">✓</span>
    );
  }

  if (fact.status === 'verified') {
    return (
      <span className="text-3xl lg:text-4xl font-heading font-semibold text-foreground tabular-nums">
        {fact.prefix}
        <AnimatedCounter value={fact.value} suffix={fact.suffix} className="tabular-nums" />
      </span>
    );
  }

  const counter = (
    <AnimatedCounter value={fact.value} prefix={fact.prefix} suffix={fact.suffix} className="tabular-nums" />
  );

  return (
    <span className="text-3xl lg:text-4xl font-heading font-semibold text-foreground tabular-nums">
      {renderFactItem({ status: fact.status, disclaimer: fact.disclaimer, claim: counter })}
    </span>
  );
}