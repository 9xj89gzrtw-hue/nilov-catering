'use client';

import { useEffect, useState } from 'react';

/**
 * NewsletterBlock — subscription form in footer.
 * Hides itself on pages where promotional content is inappropriate
 * (поминки — bereavement context). Pages opt-out via data-hide-newsletter="true"
 * on <main>.
 */
export function NewsletterBlock() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (main && main.getAttribute('data-hide-newsletter') === 'true') {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  return (
    <div className="mb-12 p-6 rounded-xl border border-line bg-card text-center">
      <h3 className="font-heading text-lg font-medium mb-2">Будьте в курсе</h3>
      <p className="text-sm text-muted-foreground mb-4">Сезонные предложения и новые меню — раз в месяц, без спама.</p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="/api/newsletter" method="POST">
        <label htmlFor="newsletter-email" className="sr-only">Email для подписки</label>
        <input id="newsletter-email" type="email" name="email" placeholder="Ваш email" required className="flex-1 rounded-lg border border-line bg-background px-4 py-2.5 text-sm" />
        <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Подписаться</button>
      </form>
      <p className="mt-2 text-sm text-muted-foreground">Нажимая «Подписаться», вы соглашаетесь с политикой конфиденциальности (152-ФЗ).</p>
    </div>
  );
}
