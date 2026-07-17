'use client';
import { useState } from 'react';
import { useConstructor } from '@/hooks/useConstructor';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const { contact, setContact, total, reset } = useConstructor();
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) { toast.error('Необходимо согласие на обработку ПДн'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/constructor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...contact, total, consent }) });
      if (res.ok) { setSuccess(true); toast.success('Заявка отправлена! Перезвоним за 15 минут.'); }
      else { toast.error('Ошибка. Позвоните +7 (812) 919-59-11'); }
    } catch { toast.error('Ошибка сети'); }
    setLoading(false);
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
        <h2 className="font-heading text-3xl text-cream mb-2">Заявка отправлена!</h2>
        <p className="text-cream-muted mb-6">Менеджер перезвонит в течение 15 минут</p>
        <button onClick={() => { reset(); setSuccess(false); }} className="px-6 py-3 border border-border rounded-lg text-cream-muted hover:text-cream min-h-[44px]">
          Оформить ещё одну заявку
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      <h2 className="font-heading text-2xl text-cream mb-2">Контактные данные</h2>
      <p className="text-sm text-cream-muted mb-6">Перезвоним в течение 15 минут</p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="c-name" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Имя *</label>
          <input id="c-name" type="text" required value={contact.name} onChange={e => setContact({ name: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none text-base" placeholder="Ваше имя" />
        </div>
        <div>
          <label htmlFor="c-phone" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Телефон *</label>
          <input id="c-phone" type="tel" required value={contact.phone} onChange={e => setContact({ phone: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none text-base" placeholder="+7 (___) ___-__-__" />
        </div>
        <div>
          <label htmlFor="c-date" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Дата мероприятия</label>
          <input id="c-date" type="date" value={contact.date} onChange={e => setContact({ date: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none text-base" />
        </div>
        <div>
          <label htmlFor="c-comment" className="block text-xs text-cream-muted mb-1.5 uppercase tracking-wider">Комментарий</label>
          <textarea id="c-comment" rows={2} value={contact.comment} onChange={e => setContact({ comment: e.target.value })} className="w-full bg-background border border-border rounded-lg px-4 py-3 text-cream focus:border-gold focus:outline-none resize-none text-base" placeholder="Особые пожелания, аллергии..." />
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-gold" />
          <span className="text-xs text-cream-muted leading-relaxed">Я согласен с <a href="/privacy" className="text-gold underline">Политикой конфиденциальности</a> и обработкой ПДн (152-ФЗ)</span>
        </label>
        <button type="submit" disabled={loading || !consent} className="w-full py-4 bg-gradient-to-r from-gold to-gold-dark text-background font-heading text-lg rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px]">
          {loading ? 'Отправка...' : `Оформить заявку — ${total.toLocaleString('ru-RU')} ₽`}
        </button>
      </form>
    </div>
  );
}
