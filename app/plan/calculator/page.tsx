import type { Metadata } from 'next';
import { Suspense } from 'react';
import Calculator from '@/components/interactive/Calculator';

export const metadata: Metadata = {
  title: 'Калькулятор стоимости',
  description: 'Рассчитайте стоимость кейтеринга за 30 секунд. Выберите формат, гостей и тариф — итог обновляется мгновенно.',
};

function CalculatorSkeleton() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h2 className="text-center mb-2">Калькулятор стоимости</h2>
        <p className="text-center text-muted-foreground mb-10">Загрузка…</p>
        <div className="space-y-8">
          <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-20 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-20 bg-muted/50 rounded-lg animate-pulse" />
          <div className="h-40 bg-muted/50 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  return (
    <main className="pt-24 pb-20">
      <Suspense fallback={<CalculatorSkeleton />}>
        <Calculator />
      </Suspense>
    </main>
  );
}
