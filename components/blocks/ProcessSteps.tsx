'use client';

import Link from 'next/link';

const STEPS = [
  { num: 1, label: 'Заявка', desc: 'Выберите формат и меню' },
  { num: 2, label: 'Звонок', desc: 'Менеджер подтвердит детали' },
  { num: 3, label: 'Событие', desc: 'Мы всё подготовим и проведём' },
];

export default function ProcessSteps() {
  return (
    <section className="py-12 md:py-16 bg-secondary" aria-labelledby="process-heading">
      <div className="container-site">
        <h2 id="process-heading" className="text-center mb-8">Как мы работаем</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 max-w-2xl mx-auto">
          {STEPS.map((step) => (
            <div key={step.num} className="flex items-center gap-4 md:flex-col md:text-center">
              <span className="w-10 h-10 rounded-full bg-gold-tint text-gold-text font-mono text-sm font-semibold flex items-center justify-center shrink-0">
                {step.num}
              </span>
              <div>
                <p className="font-medium text-sm">{step.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/plan" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-transform">
            Начать планирование
          </Link>
        </div>
      </div>
    </section>
  );
}