'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, Send, Loader2 } from 'lucide-react';
import MaskReveal from '@/components/effects/TextReveal';

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
      className="relative py-24 md:py-36 overflow-hidden"
      aria-label="Обсудить мероприятие"
    >
      {/* Background with parallax effect via CSS */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&h=800&fit=crop&q=80&auto=format"
          alt=""
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'saturate(0.3) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/82" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Left — text */}
          <div className="flex flex-col justify-center">
            <MaskReveal>
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold font-medium mb-4">
                Свяжитесь с нами
              </p>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-cream leading-[0.95] mb-6">
                Обсудим ваше
                <br />
                <span className="text-gold italic">мероприятие</span>
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.2}>
              <p className="text-sm text-cream/50 leading-relaxed mb-10 max-w-md">
                Расскажите о вашем мероприятии — мы подготовим предложение с персональным меню и точной стоимостью в течение 24 часов.
              </p>
            </MaskReveal>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href="tel:+78129195911"
                className="flex items-center gap-4 text-sm text-cream/70 hover:text-gold transition-colors duration-300 group cursor-hover"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold/50 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-gold/70" />
                </div>
                <div>
                  <span className="block text-cream font-medium">+7 (812) 919-59-11</span>
                  <span className="block text-[10px] text-cream-muted mt-0.5">Ежедневно 9:00 — 21:00</span>
                </div>
              </a>
              <a
                href="mailto:info@nilov-catering.ru"
                className="flex items-center gap-4 text-sm text-cream/70 hover:text-gold transition-colors duration-300 group cursor-hover"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-gold/50 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-gold/70" />
                </div>
                <div>
                  <span className="block text-cream font-medium">info@nilov-catering.ru</span>
                  <span className="block text-[10px] text-cream-muted mt-0.5">Ответим в течение 2 часов</span>
                </div>
              </a>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-card/60 backdrop-blur-md border border-border p-6 md:p-8 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div>
              <label htmlFor="cta-name" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                Ваше имя
              </label>
              <input
                id="cta-name"
                name="name"
                type="text"
                required
                placeholder="Анна"
                className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label htmlFor="cta-phone" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                Телефон
              </label>
              <input
                id="cta-phone"
                name="phone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label htmlFor="cta-date" className="block text-[10px] uppercase tracking-widest text-cream-muted font-medium mb-2.5">
                Дата мероприятия
              </label>
              <input
                id="cta-date"
                name="date"
                type="date"
                className="w-full bg-transparent border-b border-border focus:border-gold px-1 py-3 text-sm text-cream placeholder:text-cream-muted/30 focus:outline-none transition-colors duration-300 [color-scheme:dark]"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn-primary text-xs uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-60 mt-4 cursor-hover"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
            </button>

            {status === 'success' && (
              <motion.p
                className="text-sm text-gold/80 text-center"
                role="alert"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Заявка отправлена! Мы свяжемся с вами в ближайшее время.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                className="text-sm text-burgundy-light/80 text-center"
                role="alert"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Произошла ошибка. Попробуйте позвонить нам.
              </motion.p>
            )}
            <p className="text-[10px] text-cream-muted/30 text-center mt-3">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}