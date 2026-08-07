'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * HelperLeadForm — client-side form that POSTs to /api/quote
 * and redirects to /thank-you on success.
 *
 * UX critic: "Form submission returns raw JSON — browser shows
 * {\"success\":true...} instead of thank-you page"
 * Fix: fetch POST + router.push('/thank-you?orderId=...')
 */
export default function HelperLeadForm({
  format,
  occasion,
  guests,
  location,
}: {
  format: string;
  occasion: string;
  guests: string;
  location: string;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        const formData = new FormData(e.currentTarget);
        try {
          const res = await fetch('/api/quote', {
            method: 'POST',
            body: formData,
          });
          const json = await res.json();
          if (json.success) {
            router.push(`/thank-you?orderId=${json.orderId || ''}`);
          } else {
            setError(json.message || 'Не удалось отправить заявку. Позвоните +7 (812) 919-59-11.');
            setSubmitting(false);
          }
        } catch {
          setError('Сеть недоступна. Позвоните +7 (812) 919-59-11 или напишите в WhatsApp.');
          setSubmitting(false);
        }
      }}
      className="space-y-3"
    >
      <input type="hidden" name="source" value="helper" />
      <input type="hidden" name="format" value={format} />
      <input type="hidden" name="subject" value={`${occasion} · ${guests} · ${location}`} />
      <div>
        <label htmlFor="helper-name" className="block text-sm font-medium text-foreground mb-1.5">Ваше имя</label>
        <input
          type="text"
          id="helper-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Анна"
          className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="helper-phone" className="block text-sm font-medium text-foreground mb-1.5">Телефон</label>
        <input
          type="tel"
          id="helper-phone"
          name="phone"
          required
          autoComplete="tel"
          placeholder="+7 (___) ___-__-__"
          className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 transition-colors"
        />
      </div>
      {error && (
        <div className="p-3 rounded-xl border border-red-300 bg-red-50 text-red-900 text-sm" role="alert">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-4 text-base font-semibold hover:bg-primary/90 transition-colors no-underline shadow-md disabled:opacity-50"
      >
        {submitting ? 'Отправляем...' : 'Получить расчёт →'}
      </button>
      <p className="text-xs text-muted-foreground text-center">
        Перезвоним за 15 минут в рабочее время (9:00–21:00). Без спама.
      </p>
    </form>
  );
}
