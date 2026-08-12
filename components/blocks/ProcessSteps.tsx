import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  { num: 1, label: 'Заявка',     desc: 'Выберите формат и меню — 3 вопроса, 30 секунд' },
  { num: 2, label: 'Звонок',     desc: 'Менеджер перезвонит за 15 минут в рабочее время' },
  { num: 3, label: 'Договор',    desc: 'Фиксируем дату, цену и состав меню в договоре' },
  { num: 4, label: 'Событие',    desc: 'Привозим, сервируем, обслуживаем, убираем' },
];

export default function ProcessSteps() {
  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="process-heading">
      <div className="container-site">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-gold-text mb-3">
            Процесс
          </p>
          <h2
            id="process-heading"
            className="font-heading text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Как мы работаем
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {STEPS.map((step, idx) =>(
            <div
              key={step.num}
              className="relative p-5 md:p-6 rounded-xl bg-card border border-line"
            >
              <div className="w-10 h-10 rounded-full bg-foreground text-background font-semibold text-sm flex items-center justify-center mb-3">
                {step.num}
              </div>
              <h3 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>{step.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

              {idx < STEPS.length - 1 && (
                <ArrowRight
                  className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-gold-text/40 -translate-y-1/2"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/plan/helper"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors no-underline"
          >
            Начать планирование
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
