'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Send, Loader2 } from 'lucide-react';

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
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
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label="Обсудить мероприятие"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=800&fit=crop&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          {/* Left — text */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium mb-3">
              Свяжитесь с нами
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-cream leading-tight mb-6">
              Обсудим ваше
              <br />
              <span className="text-gold">мероприятие</span>
            </h2>
            <p className="text-sm text-cream/60 leading-relaxed mb-8 max-w-md">
              Расскажите о вашем мероприятии — мы подготовим предложение с персональным меню и точной стоимостью в течение 24 часов.
            </p>

            <div className="space-y-4">
              <a
                href="tel:+78121234567"
                className="flex items-center gap-3 text-sm text-cream/80 hover:text-gold transition-colors duration-200"
              >
                <Phone className="w-4 h-4 text-gold/70" />
                +7 (812) 123-45-67
              </a>
              <a
                href="mailto:info@nilov-catering.ru"
                className="flex items-center gap-3 text-sm text-cream/80 hover:text-gold transition-colors duration-200"
              >
                <Mail className="w-4 h-4 text-gold/70" />
                info@nilov-catering.ru
              </a>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 md:p-8 space-y-5"
          >
            <div>
              <label htmlFor="cta-name" className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-2">
                Ваше имя
              </label>
              <input
                id="cta-name"
                name="name"
                type="text"
                required
                placeholder="Анна"
                className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-cream placeholder:text-cream-muted/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label htmlFor="cta-phone" className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-2">
                Телефон
              </label>
              <input
                id="cta-phone"
                name="phone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-cream placeholder:text-cream-muted/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
              />
            </div>

            <div>
              <label htmlFor="cta-date" className="block text-xs uppercase tracking-wider text-cream-muted font-medium mb-2">
                Дата мероприятия
              </label>
              <input
                id="cta-date"
                name="date"
                type="date"
                className="w-full bg-muted border border-border rounded-sm px-4 py-3 text-sm text-cream placeholder:text-cream-muted/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
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
        </motion.div>
      </div>
    </section>
  );
}