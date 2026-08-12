'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function ContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showB2B, setShowB2B] = useState(false);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-2xl">
        <Breadcrumbs />

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-2">Контакты</h1>
        <p className="text-muted-foreground mb-8">
          Заполните форму — перезвоним за 15 минут (9:00–21:00). Без спама.
        </p>

        {/* Trust bar */}
        <p className="text-sm text-muted-foreground mb-8">
          19 лет на кухне СПб · 3 000+ событий · 4.8/5 по 27 отзывам
        </p>

        <h2 className="font-heading text-xl font-medium mb-4">Заявка на кейтеринг</h2>
        <form
          method="POST"
          action="/api/quote"
          onSubmit={async (e) => {
            e.preventDefault();
            // Validate phone before submit
            const form = e.currentTarget;
            const phoneInput = form.querySelector('#phone') as HTMLInputElement;
            const phone = phoneInput.value.replace(/[\s\-\(\)]/g, '');
            if (phone.replace(/\D/g, '').length < 10) {
              setError('Введите корректный номер телефона — минимум 10 цифр. Например: +7 (812) 919-59-11');
              phoneInput.focus();
              return;
            }
            if (!form.checkValidity()) {
              form.reportValidity();
              return;
            }
            setSubmitting(true);
            setError('');
            const formData = new FormData(form);
            try {
              const res = await fetch('/api/quote', { method: 'POST', body: formData });
              const json = await res.json();
              if (json.success) {
                router.push(`/thank-you?orderId=${json.orderId || ''}`);
              } else {
                setError(json.message || 'Ошибка. Позвоните ' + SITE.phone);
                setSubmitting(false);
              }
            } catch {
              setError('Сеть недоступна. Позвоните ' + SITE.phone + ' или WhatsApp.');
              setSubmitting(false);
            }
          }}
          className="space-y-5"
        >
          <input type="hidden" name="source" value="contact" />

          {/* Honeypot */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {/* 1. Имя — required */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">Ваше имя *</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              autoComplete="name"
              placeholder="Анна"
              className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20"
            />
          </div>

          {/* 2. Телефон — required */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1.5">Телефон *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              required
              pattern="[\d\s\+\-\(\)]{10,}"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+7 (___) ___-__-__"
              onInvalid={(e) => {
                e.preventDefault();
                (e.target as HTMLInputElement).setCustomValidity('');
                if (!(e.target as HTMLInputElement).value) {
                  (e.target as HTMLInputElement).setCustomValidity('Введите номер телефона');
                } else if ((e.target as HTMLInputElement).value.length < 10) {
                  (e.target as HTMLInputElement).setCustomValidity('Слишком короткий номер — минимум 10 цифр');
                }
              }}
              onInput={(e) =>(e.target as HTMLInputElement).setCustomValidity('')}
              className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20"
              aria-describedby="phone-hint"
            />
            <p id="phone-hint" className="text-xs text-muted-foreground mt-1">Минимум 10 цифр. Например: +7 (812) 919-59-11</p>
          </div>

          {/* 3. Комментарий — required */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-1.5">Что вам нужно? *</label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={3}
              placeholder="Напр. Свадьба на 50 человек, 15 августа, нужно меню и торт"
              className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 resize-none"
            />
          </div>

          {/* 4. Email — optional */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email (необязательно)</label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="example@mail.ru"
              className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20"
            />
          </div>

          {/* 5. Дата и гости — optional */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-1.5">Дата (необязательно)</label>
              <input
                id="date"
                type="date"
                name="date"
                className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20"
              />
            </div>
            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-1.5">Гостей (необязательно)</label>
              <input
                id="guests"
                type="number"
                name="guests"
                min="1"
                placeholder="напр. 50"
                className="w-full rounded-xl border border-line bg-background px-4 py-3.5 text-base focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20"
              />
            </div>
          </div>

          {/* B2B toggle */}
          <button
            type="button"
            onClick={() =>setShowB2B(!showB2B)}
            className="text-sm text-gold-text font-medium hover:underline"
          >
            {showB2B ? '− Скрыть корпоративные детали' : '+ Для корпоративных клиентов (ИНН, ЭДО, тендеры)'}
          </button>

          {showB2B && (
            <div className="space-y-4 p-4 rounded-xl border border-line bg-secondary/30">
              <div>
                <label className="block text-sm font-medium mb-1.5">Название компании</label>
                <input type="text" name="companyName" placeholder="ООО «Ромашка»" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:border-gold-text focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">ИНН</label>
                  <input type="text" name="companyInn" inputMode="numeric" placeholder="7800000000" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm focus:border-gold-text focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">ЭДО</label>
                  <select name="edo" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm focus:border-gold-text focus:outline-none">
                    <option value="">—</option>
                    <option value="diadoc">Диадок</option>
                    <option value="sbis">СБИС</option>
                    <option value="rostra">Ростра</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 rounded-xl border border-red-300 bg-red-50 text-red-900 text-sm" role="alert">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-4 text-base font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Отправляем...' : 'Отправить заявку →'}
          </button>
        </form>

        {/* Alternative contacts */}
        <div className="mt-8 pt-8 border-t border-line text-center">
          <p className="text-sm text-muted-foreground mb-3">Или свяжитесь напрямую:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-gold-text">
              📞 {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-gold-text">
              💬 WhatsApp
            </a>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:text-gold-text">
              ✉️ {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
// W91 deploy Sun Aug  9 20:42:11 UTC 2026
