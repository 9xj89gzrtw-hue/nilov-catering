'use client';

import { useState } from 'react';
import { Send, Check, Phone, CalendarDays, Users } from 'lucide-react';
import { SITE } from '@/lib/data';

/**
 * LeadCaptureForm — компактная форма захвата лидов для главной страницы
 * 
 * Решает критику: "Отсутствует форма обратной связи / заявки"
 * - Поля: Имя, Телефон, Тип события, Дата (опц.), Комментарий (опц.)
 * - Валидация на клиенте
 * - Отправка в /api/quote
 * - Индикация статуса (loading, success, error)
 * - Accessibility: labels, aria, error messages
 */

const EVENT_TYPES = [
  'Свадьба',
  'Корпоратив', 
  'День рождения',
  'Детский праздник',
  'Частный ужин',
  'Другое',
];

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    date: '',
    comment: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setStatus('error');
      setMessage('Пожалуйста, укажите ваше имя');
      return;
    }
    
    if (!validatePhone(formData.phone)) {
      setStatus('error');
      setMessage('Проверьте формат телефона (например, +7 999 123-45-67)');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          subject: `Заявка с главной страницы · ${formData.eventType || 'Не указано'}`,
          format: 'lead-form',
          source: 'homepage',
          ...(formData.date && { date: formData.date }),
          ...(formData.comment && { comment: formData.comment }),
        }),
      });
      
      const json = await res.json();
      
      if (json.success) {
        setStatus('success');
        setMessage('Спасибо! Перезвоним в течение 15 минут.');
        setFormData({ name: '', phone: '', eventType: '', date: '', comment: '' });
      } else {
        setStatus('error');
        setMessage(json.message || 'Ошибка отправки. Позвоните нам напрямую.');
      }
    } catch {
      setStatus('error');
      setMessage('Сеть недоступна. Позвоните +7 (812) 919-59-11.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center" role="status" aria-live="polite">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-heading text-xl text-foreground mb-2" style={{ fontWeight: 500 }}>
          Заявка отправлена!
        </h3>
        <p className="text-muted-foreground">{message}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-gold-text hover:underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-line rounded-2xl p-6 md:p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2" style={{ fontWeight: 500 }}>
          Получить расчёт за 15 минут
        </h3>
        <p className="text-sm text-muted-foreground">
          Оставьте контакт — менеджер перезвонит и подготовит персональное предложение
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
            <span>Ваше имя</span>
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="lead-name"
            required
            autoComplete="name"
            placeholder="Как к вам обращаться?"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                       focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 
                       transition-colors min-h-[44px]"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="lead-phone" className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold-text" />
            <span>Телефон</span>
            <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="lead-phone"
            required
            autoComplete="tel"
            placeholder="+7 (___) ___-__-__"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                       focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 
                       transition-colors min-h-[44px]"
            aria-describedby="phone-hint"
          />
          <p id="phone-hint" className="text-xs text-muted-foreground mt-1">
            Нужен для расчёта и подтверждения брони
          </p>
        </div>

        {/* Event Type */}
        <div>
          <label htmlFor="lead-event" className="block text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gold-text" />
            <span>Тип события</span>
          </label>
          <select
            id="lead-event"
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                       focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 
                       transition-colors min-h-[44px]"
          >
            <option value="">Выберите тип мероприятия</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Row: Date + Quick actions */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label htmlFor="lead-date" className="block text-sm font-medium text-foreground mb-1.5">
              Дата (примерная)
            </label>
            <input
              type="date"
              id="lead-date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-xl border border-line bg-background px-4 py-3 text-base 
                         focus:border-gold-text focus:outline-none focus:ring-2 focus:ring-gold-text/20 
                         transition-colors min-h-[44px]"
            />
          </div>
          
          {/* Quick WhatsApp link */}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="self-end rounded-xl border-2 border-[#25D366] text-[#25D366] px-4 py-3 
                       hover:bg-[#25D366] hover:text-white transition-colors flex items-center gap-2 
                       text-sm font-medium no-underline min-h-[44px]"
            aria-label="Написать в WhatsApp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.6 6.31A7.85 7.85 0 0 0 12.05 4 7.94 7.94 0 0 0 4.1 11.94a7.84 7.84 0 0 0 1.07 3.97L4 20l4.2-1.1a7.93 7.93 0 0 0 3.85 1h.01a7.94 7.94 0 0 0 7.94-7.94 7.85 7.85 0 0 0-2.4-5.65Zm-5.55 12.21h-.01a6.55 6.55 0 0 1-3.34-.92l-.24-.14-2.49.65.67-2.43-.16-.25a6.6 6.6 0 0 1 10.27-8.16 6.6 6.6 0 0 1-4.7 11.25Zm3.62-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.08-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.34-.45-.34l-.39-.01a.74.74 0 0 0-.53.25c-.18.2-.7.68-.7 1.66s.71 1.92.81 2.05c.1.13 1.4 2.14 3.4 3 .47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.35-.95.16-.46.16-.86.11-.95-.05-.08-.18-.13-.38-.23Z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>

        {/* Error message */}
        {status === 'error' && message && (
          <div 
            className="p-3 rounded-xl border border-red-300 bg-red-50 text-red-700 text-sm flex items-start gap-2"
            role="alert"
            aria-live="assertive"
          >
            <span aria-hidden="true">⚠️</span>
            <span>{message}</span>
          </div>
        )}

        {/* Submit button */}
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
              <Send className="w-4 h-4" />
              Рассчитать стоимость
            </>
          )}
        </button>

        {/* Trust note */}
        <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-2">
          <Users className="w-4 h-4 text-gold-text" aria-hidden="true" />
          <span>Перезвоним за 15 минут · Работаем с 9:00 до 21:00 · Без спама</span>
        </p>
      </form>
    </div>
  );
}
