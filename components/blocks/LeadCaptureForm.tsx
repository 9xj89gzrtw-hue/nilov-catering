'use client';

import { useState } from 'react';
import { Send, Check, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { SITE } from '@/lib/data';

/**
 * LeadCaptureForm v2 — УПРОЩЁННАЯ форма для максимальной конверсии
 * 
 * Cycle 3 fix: Упрощение с 5 полей до 2 обязательных + опциональные
 * - Обязательные: Имя, Телефон (максимум конверсии)
 * - Опциональные: Тип события, Дата (под expand)
 * - GDPR consent в одну строку
 * - Trust badges над формой
 */

export default function LeadCaptureForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validatePhone = (p: string): boolean => {
    return p.replace(/\D/g, '').length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setStatus('error');
      setMessage('Пожалуйста, укажите имя');
      return;
    }
    
    if (!validatePhone(phone)) {
      setStatus('error');
      setMessage('Проверьте телефон');
      return;
    }
    
    if (!consent) {
      setStatus('error');
      setMessage('Дайте согласие на обработку данных');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          subject: `Заявка · ${eventType || 'Главная'}`,
          format: 'lead-form-v2',
          source: 'homepage',
          eventType,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        setMessage('✓ Заявка принята! Перезвоним за 15 минут.');
        setName('');
        setPhone('');
        setEventType('');
        setExpanded(false);
      } else {
        setStatus('error');
        setMessage(json.message или 'Ошибка. Позвоните нам.');
      }
    } catch {
      setStatus('error');
      setMessage('Нет связи. Позвоните +7 (812) 919-59-11');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center" role="status">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-heading text-xl text-foreground mb-2">Заявка отправлена!</h3>
        <p className="text-mutedforeground mb-4">{message}</p>
        <button onClick={() => setStatus('idle')} className="text-gold-text hover:underline text-sm">
          Отправить ещё
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-5 md:p-6 shadow-lg overflow-hidden">
      {/* Trust bar над формой */}
      <div className="flex items-center justify-center gap-4 mb-5 pb-5 border-b border-line/50">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-gold-text font-semibold">19 лет</span>
          <span>опыта</span>
        </div>
        <span className="w-px h-3 bg-line" aria-hidden="true" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-gold-text font-semibold">3000+</span>
          <span>событий</span>
        </div>
        <span className="w-px h-3 bg-line" aria-hidden="true" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="text-gold-text font-semibold">15 мин</span>
          <span>ответ</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Два основных поля — рядом на desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Имя */}
          <div>
            <label htmlFor="lf-name" className="block text-sm font-medium text-foreground mb-1.5">
              Ваше имя <span className="text-red-400">*</span>
            </label>
            <input
              id="lf-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Как к вам?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                         focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 
                         transition-colors min-h-[48px]"
            />
          </div>

          {/* Телефон */}
          <div>
            <label htmlFor="lf-phone" className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-gold-text" aria-hidden="true" />
              Телефон <span className="text-red-400">*</span>
            </label>
            <input
              id="lf-phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                         focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 
                         transition-colors min-h-[48px]"
            />
          </div>
        </div>

        {/* Expandable optional fields */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto no-underline min-h-[36px]"
          aria-expanded={expanded}
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {expanded ? 'Свернуть детали' : 'Добавить детали (необязательно)'}
        </button>

        {expanded && (
          <div className="space-y-3 pt-2 border-t border-line/50 animate-in slide-in-from-top-2 duration-200">
            <div>
              <label htmlFor="lf-event" className="block text-sm font-medium text-foreground mb-1.5">
                Тип мероприятия
              </label>
              <select
                id="lf-event"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                           focus:border-gold-text focus:outline-none transition-colors min-h-[48px]"
              >
                <option value="">Не выбрано</option>
                <option>Свадьба</option>
                <option>Корпоратив</option>
                <option>День рождения</option>
                <option>Детский праздник</option>
                <option>Частный ужин</option>
                <option>Другое</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] text-[#25D366] 
                           px-4 py-3 hover:bg-[#25D366] hover:text-white transition-colors 
                           text-sm font-medium no-underline min-h-[44px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-line 
                           text-foreground hover:border-gold-text hover:text-gold-text transition-colors 
                           text-sm font-medium no-underline min-h-[44px]"
              >
                Позвонить
              </a>
            </div>
          </div>
        )}

        {/* Error */}
        {status === 'error' && message && (
          <div className="p-3 rounded-xl border border-red-300 bg-red-50 text-red-700 text-sm flex items-start gap-2" role="alert">
            <span aria-hidden="true">⚠️</span>
            <span>{message}</span>
          </div>
        )}

        {/* Consent — компактная версия */}
        <label className="flex items-start gap-2.5 p-3 rounded-xl bg-secondary/40 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-border text-gold-text focus:ring-gold-text/20"
            required
          />
          <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
            Согласен на обработку{' '}
            <a href="/privacy" target="_blank" className="text-gold-text hover:underline">персональных данных</a>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-xl bg-primary text-primary-foreground px-6 py-4 text-base 
                     font-semibold hover:bg-primary/90 transition-all duration-200 
                     hover:shadow-lg hover:-translate-y-0.5
                     disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2
                     min-h-[52px]"
        >
          {status === 'loading' ? (
            <>
              <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              Отправляем...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" aria-hidden="true" />
              Рассчитать стоимость меню →
            </>
          )}
        </button>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground text-center">
          Перезвоним за 15 минут · Работаем 9–21 · Без спама
        </p>
      </form>
    </div>
  );
}
