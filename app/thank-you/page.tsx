import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { SITE } from '@/lib/data';

export const metadata: Metadata = { title: 'Заявка принята', robots: { index: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ warning?: string; orderId?: string }> }) {
  const { warning, orderId } = await searchParams;
  const isFailed = warning === 'delivery-failed';

  return (
    <main id="main" className="min-h-screen flex items-center justify-center pt-24 pb-20">
      <div className="container-site max-w-lg text-center">
        {isFailed ? (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1>Заявка не отправлена</h1>
            <p className="text-lg text-muted-foreground mt-4 mb-2">
              Временная ошибка отправки. Приносим извинения — пожалуйста, позвоните нам:
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 min-h-[44px] text-sm font-semibold text-primary-foreground my-4"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {SITE.phone}
            </a>
            <p className="text-sm text-muted-foreground mb-8">
              Мы сразу примем заказ по телефону. Рабочее время: 9:00–21:00.
            </p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1>Заявка принята!</h1>
            <p className="text-lg text-muted-foreground mt-4 mb-8">
              Менеджер перезвонит вам в течение 15 минут в рабочее время (9:00–21:00).
              {orderId && <span className="block text-sm mt-2">Номер заявки: <strong>{orderId}</strong></span>}
            </p>
          </>
        )}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/plan" className="rounded-lg bg-primary px-6 py-3 min-h-[44px] inline-flex items-center text-sm font-semibold text-primary-foreground">К спланированному событию</Link>
          <Link href="/" className="text-sm text-gold-text hover:underline min-h-[44px] inline-flex items-center px-2">На главную</Link>
        </div>
      </div>
    </main>
  );
}
