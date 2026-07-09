'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';

export default function ContactClient() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      name: data.get('name'),
      phone: data.get('phone'),
      date: data.get('date'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — info */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-cream mb-8">Свяжитесь с нами</h2>

            <div className="space-y-6">
              <a href="tel:+78121234567" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream-muted mb-1">Телефон</p>
                  <p className="text-sm text-cream group-hover:text-gold transition-colors">+7 (812) 123-45-67</p>
                </div>
              </a>

              <a href="mailto:info@nilov-catering.ru" className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream-muted mb-1">Email</p>
                  <p className="text-sm text-cream group-hover:text-gold transition-colors">info@nilov-catering.ru</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream-muted mb-1">Адрес</p>
                  <p className="text-sm text-cream">Санкт-Петербург, наб. реки Фонтанки, 90</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-cream-muted mb-1">Время работы</p>
                  <p className="text-sm text-cream">Пн–Сб: 09:00 – 21:00</p>
                  <p className="text-sm text-cream-muted">Вс: по договорённости</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 aspect-[16/9] rounded-md bg-muted border border-border flex items-center justify-center">
              <p className="text-xs text-cream-muted text-center px-4">
                Карта будет доступна при публикации<br />
                наб. реки Фонтанки, 90
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-cream mb-8">Заявка</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="c-name" className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-2">
                  Ваше имя *
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Анна"
                  className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-cream placeholder:text-cream-muted/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="c-phone" className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-2">
                  Телефон *
                </label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-cream placeholder:text-cream-muted/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="c-date" className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-2">
                  Дата мероприятия
                </label>
                <input
                  id="c-date"
                  name="date"
                  type="date"
                  className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-cream focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>

              {status === 'success' && (
                <p className="text-sm text-green-400 text-center" role="alert">
                  Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400 text-center" role="alert">
                  Произошла ошибка. Попробуйте позвонить нам.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}