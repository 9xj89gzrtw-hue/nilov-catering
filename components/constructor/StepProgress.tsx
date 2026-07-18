'use client';

import { motion } from 'framer-motion';
import { GlassWater, Users, SlidersHorizontal, PlusCircle, Receipt, Phone } from 'lucide-react';

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Формат: GlassWater,
  Гости: Users,
  Тариф: SlidersHorizontal,
  'Доп. услуги': PlusCircle,
  Итого: Receipt,
  Контакты: Phone,
};

interface Props {
  steps: string[];
  currentStep: number;
  onStepClick: (s: number) => void;
}

export default function StepProgress({ steps, currentStep, onStepClick }: Props) {
  const total = steps.length;
  const progress = ((currentStep - 1) / (total - 1)) * 100;

  return (
    <div className="relative">
      {/* Progress line */}
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" aria-hidden="true" />
      <motion.div
        className="absolute left-0 top-4 h-0.5 bg-gradient-to-r from-gold to-gold-light"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-hidden="true"
      />

      <ol className="relative flex items-start justify-between gap-1">
        {steps.map((step, i) => {
          const n = i + 1;
          const done = n < currentStep;
          const active = n === currentStep;
          const Icon = STEP_ICONS[step] ?? GlassWater;
          const reachable = n <= currentStep;
          return (
            <li key={step} className="flex flex-1 flex-col items-center text-center">
              <button
                type="button"
                onClick={() => reachable && onStepClick(n)}
                disabled={!reachable}
                aria-current={active ? 'step' : undefined}
                className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-card transition-all duration-300 disabled:cursor-not-allowed ${
                  done
                    ? 'border-gold bg-gold text-white'
                    : active
                      ? 'border-gold text-gold shadow-[0_0_0_4px_rgba(176,137,61,0.18)]'
                      : 'border-border text-cream-muted/50'
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </button>
              <span
                className={`mt-2 hidden text-[11px] font-medium leading-tight sm:block ${
                  active ? 'text-foreground' : done ? 'text-gold' : 'text-cream-muted/50'
                }`}
              >
                {n}. {step}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
