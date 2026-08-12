'use client';

import { useEffect, useState } from 'react';

export function NewsletterBlock() {
  const [hidden, setHidden] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (main && main.getAttribute('data-hide-newsletter') === 'true') {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    const value = e.target.value;
    if (value && !validateEmail(value)) {
      setStatus('error');
      setMessage('Введите корректный email (пример: name@mail.ru)');
    } else {
      setStatus('idle');
      setMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    setTouched(true);
    if (!email || !validateEmail(email)) {
      setStatus('error');
      setMessage('Введите корректный email (пример: name@mail.ru)');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus('success');
        setMessage(json.message || 'Подписка оформлена!');
        (form as HTMLFormElement).reset();
        setTouched(false);
      } else {
        setStatus('error');
        setMessage(json.message || 'Ошибка. Попробуйте позже.');
      }
    } catch {
      setStatus('error');
      setMessage('Сеть недоступна. Попробуйте позже.');
    }
  };

  return (
    <div className="mb-12 p-6 rounded-xl border border-line bg-card text-center">
      <h3 className="font-heading text-lg font-medium mb-2">Будьте в курсе</h3>
      <p className="text-sm text-muted-foreground mb-4">Сезонные предложения и новые меню — раз в месяц, без спама.</p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="block text-sm font-medium text-foreground mb-1">Email для подписки</label>
          <input id="newsletter-email" type="email" name="email" autoComplete="email" placeholder="Ваш email" required aria-label="Email для подписки на рассылку кейтеринга" aria-invalid={status === 'error' && touched ? 'true' : 'false'} onBlur={handleEmailBlur} className={`w-full rounded-lg border bg-background px-4 py-2.5 text-sm min-h-[44px] inline-flex items-center ${status === 'error' && touched ? 'border-red-500 focus:ring-red-500' : 'border-line focus:ring-primary'}`} />
        </div>
        <button type="submit" disabled={status === 'loading'} className="self-end rounded-lg bg-primary px-5 py-2.5 text-sm min-h-[44px] inline-flex items-center font-semibold text-primary-foreground hover:bg-primary/90 transition-colors min-h-[44px] disabled:opacity-50">
          {status === 'loading' ? 'Отправляем...' : 'Подписаться'}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-3 text-sm text-emerald-700 font-medium" role="status" aria-live="polite">{message}</p>
      )}
      {status === 'error' && touched && (
        <p className="mt-3 text-sm text-red-600 font-medium" role="alert" aria-live="assertive">{message}</p>
      )}
      <p className="mt-2 text-sm text-muted-foreground">Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности (152-ФЗ).</p>
    </div>
  );
}
