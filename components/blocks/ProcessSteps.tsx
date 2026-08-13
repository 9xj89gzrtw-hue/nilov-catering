import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STEPS = [
  { num: 1, label: "Заявка", desc: "Выберите формат и меню — 3 вопроса, 30 секунд" },
  { num: 2, label: "Звонок", desc: "Менеджер перезвонит за 15 минут в рабочее время" },
  { num: 3, label: "Договор", desc: "Фиксируем дату, цену и состав меню в договоре" },
  { num: 4, label: "Событие", desc: "Привозим, сервируем, обслуживаем, убираем" },
];

export default function ProcessSteps() {
  return (
    <section className="bg-background py-20 md:py-28" aria-labelledby="process-heading">
      <div className="container-site">
        <div className="mb-12 text-center md:mb-16">
          <p className="text-gold-text mb-3 text-xs tracking-[0.22em] uppercase">Процесс</p>
          <h2
            id="process-heading"
            className="font-heading text-3xl md:text-5xl"
            style={{ fontWeight: 500 }}
          >
            Как мы работаем
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-4">
          {STEPS.map((step, idx) => (
            <div
              key={step.num}
              className="bg-card border-line relative rounded-xl border p-5 md:p-6"
            >
              <div className="bg-foreground text-background mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                {step.num}
              </div>
              <h3 className="font-heading mb-1 text-lg" style={{ fontWeight: 500 }}>
                {step.label}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>

              {idx < STEPS.length - 1 && (
                <ArrowRight
                  className="text-gold-text/40 absolute top-1/2 -right-3 hidden h-5 w-5 -translate-y-1/2 md:block"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/plan/helper"
            className="bg-foreground text-background hover:bg-foreground/90 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold no-underline transition-colors"
          >
            Начать планирование
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
