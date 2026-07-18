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
      message: data.get('message'),
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
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — info (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">Контакты</p>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-cream leading-tight mb-10">
              Свяжитесь
              <br />
              <span className="text-cream/40">с нами</span>
            </h2>

            <div className="space-y-7">
              <a href="tel:+78129195911" className="flex items-start gap-4 group cursor-hover">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-gold/40 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-gold/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cream-muted mb-1">Телефон</p>
                  <p className="text-sm text-cream group-hover:text-gold transition-colors duration-300">+7 (812) 919-59-11</p>
                  <p className="text-[10px] text-cream-muted/50 mt-0.5">Ежедневно 9:00 — 21:00</p>
                </div>
              </a>

              <a href="mailto:info@nilov-catering.ru" className="flex items-start gap-4 group cursor-hover">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0 group-hover:border-gold/40 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-gold/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cream-muted mb-1">Email</p>
                  <p className="text-sm text-cream group-hover:text-gold transition-colors duration-300">info@nilov-catering.ru</p>
                  <p className="text-[10px] text-cream-muted/50 mt-0.5">Ответим в течение 2 часов</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-gold/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cream-muted mb-1">Адрес</p>
                  <p className="text-sm text-cream">Санкт-Петербург,<br />наб. реки Фонтанки, 90</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-gold/70" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-cream-muted mb-1">Время работы</p>
                  <p className="text-sm text-cream">Пн–Сб: 09:00 – 21:00</p>
                  <p className="text-sm text-cream-muted/60">Вс: по договорённости</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-12 aspect-[4/3] rounded-md bg-muted border border-border flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-card to-muted" />
              <div className="relative text-center">
                <MapPin className="w-8 h-8 text-gold/30 mx-auto mb-3" />
                <p className="text-[10px] uppercase tracking-widest text-cream-muted/40">
                  наб. реки Фонтанки, 90
                </p>
              </div>
            </div>
          </div>

          {/* Right — form (3 cols) */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="c-name" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                    Ваше имя *
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Анна"
                    className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="c-phone" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                    Телефон *
                  </label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="c-date" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                  Дата мероприятия
                </label>
                <input
                  id="c-date"
                  name="date"
                  type="date"
                  className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="c-msg" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                  Расскажите о мероприятии
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  rows={4}
                  placeholder="Формат, количество гостей, особые пожелания..."
                  className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60 cursor-hover"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>

              {status === 'success' && (
                <p className="text-sm text-green-400/80 text-center" role="alert">
                  Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400/80 text-center" role="alert">
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