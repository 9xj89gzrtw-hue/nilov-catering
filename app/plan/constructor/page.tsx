import type { Metadata } from 'next';
import { Suspense } from 'react';
import ConstructorWizard from '@/components/interactive/ConstructorWizard';

export const metadata: Metadata = {
  alternates: { canonical: '/plan/constructor' },
  title: 'Конструктор меню',
  description: 'Соберите меню под ваше событие за 2 минуты. Фуршет, банкет, кофе-брейк, детский праздник — рассчитайте стоимость онлайн.',
};

function ConstructorSkeleton() {
  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <div className="h-10 bg-muted/50 rounded-lg animate-pulse mb-6" aria-hidden="true" />
        <div className="space-y-8">
          <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-32 bg-muted/50 rounded-xl animate-pulse" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConstructorPage() {
  return (
    <Suspense fallback={<ConstructorSkeleton />}>
      <ConstructorWizard />
    </Suspense>
  );
}