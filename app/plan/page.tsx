import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Планирование' };

export default function PlanPage() {
  return (
    <main className="pt-24 pb-20"><div className="container-site max-w-3xl text-center">
      <h1 className="mb-4">Спланировать событие</h1>
      <p className="text-lg text-muted-foreground mb-12 text-balance">Выберите инструмент — и мы поможем.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { title: 'Калькулятор', desc: 'Рассчитайте стоимость за 30 секунд', href: '/plan/calculator' },
          { title: 'Конструктор', desc: 'Соберите меню шаг за шагом', href: '/plan/constructor' },
          { title: 'Помощник', desc: 'Не знаете с чего начать? Подберём за 3 вопроса', href: '/plan/helper' },
        ].map((t) => (
          <a key={t.href} href={t.href} className="rounded-xl border border-line bg-card p-6 hover:border-gold-text hover:-translate-y-1 transition-all">
            <h2 className="font-heading text-xl font-medium mb-2">{t.title}</h2>
            <p className="text-sm text-muted-foreground">{t.desc}</p>
          </a>
        ))}
      </div>
    </div></main>
  );
}
