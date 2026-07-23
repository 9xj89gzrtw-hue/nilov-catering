'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const STEPS_DATA = [
  {
    q: '1. Какой повод?',
    key: 'occasion',
    opts: ['Свадьба', 'Корпоратив', 'День рождения', 'Детский праздник', 'Выпускной', 'Просто ужин'],
  },
  {
    q: '2. Сколько гостей?',
    key: 'guests',
    opts: ['до 20', '20–50', '50–100', '100–200', '200+'],
  },
  {
    q: '3. Где проходит?',
    key: 'location',
    opts: ['Дома', 'В офисе', 'На площадке', 'На природе', 'Пока не знаю'],
  },
];

const OCCASION_TO_FORMAT: Record<string, string> = {
  'Свадьба': 'banket', 'Корпоратив': 'banket', 'День рождения': 'furshet',
  'Детский праздник': 'detskoe', 'Выпускной': 'banket', 'Просто ужин': 'furshet',
};

export default function PlanHelperPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Use native DOM click handler via ref-based approach
  const handleClick = (key: string, value: string) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    
    if (step < STEPS_DATA.length - 1) {
      // Use setTimeout to let state settle, then advance
      window.setTimeout(() => {
        setStep(step + 1);
      }, 50);
    } else {
      // Last step: go to pricing
      window.setTimeout(() => {
        window.location.href = '/pricing';
      }, 100);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
  };

  // Results screen
  if (step >= STEPS_DATA.length) {
    return (
      <main className="pt-24 pb-20">
        <div className="container-site max-w-xl mx-auto text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="mb-4">Готово! Подбираем расчёт...</h1>
          <p className="text-muted-foreground mb-8">
            Ваш повод: <strong>{answers.occasion}</strong> · {answers.guests} гостей · {answers.location}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/pricing" className="inline-block rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Получить расчёт →
            </a>
            <a href="/contact" className="inline-block rounded-lg border border-line px-8 py-3 text-base font-semibold hover:bg-muted transition-colors">
              Связаться с менеджером
            </a>
          </div>
          <button type="button" onClick={handleRestart} className="mt-4 text-sm text-gold-text hover:underline">
            Начать заново
          </button>
        </div>
      </main>
    );
  }

  const current = STEPS_DATA[step];

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-xl mx-auto">
        {/* Progress bar */}
        <div className="flex gap-1 mb-10">
          {STEPS_DATA.map((_, i) => (
            <div key={i}
              className={`flex-1 h-1.5 rounded-full transition-colors ${i < step ? 'bg-gold-text' : i === step ? 'bg-gold-text/50' : 'bg-muted'}`}
            />
          ))}
        </div>

        <div className="text-center mb-10">
          <p className="font-mono text-xs tracking-[0.2em] text-gold-text uppercase mb-2">
            Шаг {step + 1} из {STEPS_DATA.length}
          </p>
          <h1 className="text-3xl md:text-4xl font-heading font-medium tracking-tight">{current.q}</h1>
        </div>

        <div className="space-y-3">
          {current.opts.map(opt => (
            <a
              key={opt}
              href="#"
              onClick={(e) => { e.preventDefault(); handleClick(current.key, opt); }}
              className={`block w-full rounded-xl border p-5 text-left transition-all no-underline ${
                answers[current.key] === opt
                  ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text text-foreground'
                  : 'border-line bg-card hover:border-gold-text text-foreground'
              }`}
            >
              <span className="font-medium">{opt}</span>
            </a>
          ))}
        </div>

        {step > 0 && (
          <button type="button" onClick={() => setStep(s => s - 1)}
            className="mt-6 text-sm text-muted-foreground hover:text-foreground">
            ← Назад
          </button>
        )}
      </div>
    </main>
  );
}