'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function QuoteForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [comment, setComment] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) { toast.error('Необходимо согласие на обработку ПДн'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, guests, eventDate, comment }) });
      if (res.ok) { toast.success('Заявка отправлена! Перезвоним в течение 15 минут.'); setName(''); setPhone(''); setGuests(''); setEventDate(''); setComment(''); setConsent(false); }
      else { toast.error('Ошибка. Позвоните +7 (812) 919-59-11'); }
    } catch { toast.error('Ошибка сети. Позвоните +7 (812) 919-59-11'); }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="qf-name" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Имя *</label>
          <input id="qf-name" type="text" required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none transition-colors text-base" placeholder="Ваше имя" />
        </div>
        <div>
          <label htmlFor="qf-phone" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Телефон *</label>
          <input id="qf-phone" type="tel" required value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none transition-colors text-base" placeholder="+7 (___) ___-__-__" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="qf-guests" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Гостей</label>
          <input id="qf-guests" type="number" min="10" value={guests} onChange={e=>setGuests(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none transition-colors text-base" placeholder="50" />
        </div>
        <div>
          <label htmlFor="qf-date" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Дата</label>
          <input id="qf-date" type="date" value={eventDate} onChange={e=>setEventDate(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none transition-colors text-base" />
        </div>
      </div>
      <div>
        <label htmlFor="qf-comment" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Комментарий</label>
        <textarea id="qf-comment" rows={3} value={comment} onChange={e=>setComment(e.target.value)} className="w-full bg-card border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none transition-colors resize-none text-base" placeholder="Особые пожелания, аллергии..." />
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 accent-gold" />
        <span className="text-xs text-cream-muted leading-relaxed">Я согласен с <a href="/privacy" className="text-gold underline">Политикой конфиденциальности</a> и обработкой ПДн (152-ФЗ)</span>
      </label>
      <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-gold to-gold-dark text-background font-heading text-lg rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px]">
        {loading ? 'Отправка...' : 'Оформить заявку'}
      </button>
    </form>
  );
}
