'use client';
import { useConstructor, FORMAT_CARDS } from '@/hooks/useConstructor';
import { motion } from 'framer-motion';

export default function SummaryCard() {
  const { format, tier, guestCount, addOns, subtotal, addOnsTotal, total, perGuest, savings } = useConstructor();
  const fmtName = FORMAT_CARDS.find(f => f.id === format)?.name || format;
  return (
    <div>
      <h2 className="font-heading text-2xl text-cream mb-6">Итого</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Формат</span><span className="text-cream">{fmtName}</span></div>
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Тариф</span><span className="text-cream">{tier || '—'}</span></div>
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Гостей</span><span className="text-cream">{guestCount || '—'}</span></div>
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Меню</span><span className="font-mono text-cream">{subtotal.toLocaleString('ru-RU')} ₽</span></div>
          {addOns.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-xs text-cream-muted uppercase">Доп. услуги</p>
              {addOns.map(a => <div key={a.id} className="flex justify-between text-sm"><span className="text-cream-muted">{a.name}</span><span className="font-mono text-cream">{a.price === 0 ? 'Бесплатно' : `${a.price.toLocaleString('ru-RU')} ₽`}</span></div>)}
            </div>
          )}
        </div>
        <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-xl p-6 sticky top-4">
          <p className="text-xs text-cream-muted uppercase tracking-wider mb-2">Итого</p>
          <motion.p key={total} initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="font-heading text-4xl text-gold mb-2">
            {total.toLocaleString('ru-RU')} ₽
          </motion.p>
          <p className="text-sm text-cream-muted">≈ {Math.round(perGuest).toLocaleString('ru-RU')} ₽/гость</p>
          {savings > 0 && <p className="text-xs text-gold mt-2">Вы экономите {savings.toLocaleString('ru-RU')} ₽ vs Люкс</p>}
          <div className="mt-4 pt-4 border-t border-gold/20 space-y-2">
            <p className="text-xs text-cream-muted">✓ Доставка в КАД включена</p>
            <p className="text-xs text-cream-muted">✓ Без скрытых платежей</p>
            <p className="text-xs text-cream-muted">✓ Депозит 30% при оформлении</p>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-[10px] px-2 py-1 bg-gold/10 text-gold rounded-full">19 лет</span>
            <span className="text-[10px] px-2 py-1 bg-gold/10 text-gold rounded-full">3000+ мероприятий</span>
            <span className="text-[10px] px-2 py-1 bg-gold/10 text-gold rounded-full">Эрмитаж</span>
          </div>
        </div>
      </div>
    </div>
  );
}
