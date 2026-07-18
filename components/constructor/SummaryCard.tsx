'use client';

import { useConstructor, FORMAT_CARDS } from '@/hooks/useConstructor';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

function AnimatedTotal({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString('ru-RU'));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] });
    return controls.stop;
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
}

export default function SummaryCard() {
  const { format, tier, guestCount, addOns, subtotal, total, perGuest, savings } = useConstructor();
  const fmtName = FORMAT_CARDS.find((f) => f.id === format)?.name || format;

  return (
    <div>
      <h2 className="font-heading text-2xl text-foreground mb-6">Итого</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Формат</span><span className="text-foreground font-medium">{fmtName}</span></div>
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Тариф</span><span className="text-foreground font-medium">{tier || '—'}</span></div>
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Гостей</span><span className="text-foreground font-medium">{guestCount || '—'}</span></div>
          <div className="flex justify-between text-sm"><span className="text-cream-muted">Меню</span><span className="font-mono text-foreground">{subtotal.toLocaleString('ru-RU')} ₽</span></div>
          {addOns.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <p className="text-xs text-cream-muted uppercase tracking-wider">Доп. услуги</p>
              {addOns.map((a) => (
                <div key={a.id} className="flex justify-between text-sm">
                  <span className="text-cream-muted">{a.name}</span>
                  <span className="font-mono text-foreground">{a.price === 0 ? 'Бесплатно' : `${a.price.toLocaleString('ru-RU')} ₽`}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 rounded-2xl p-6 sticky top-4">
          <p className="text-xs text-cream-muted uppercase tracking-wider mb-2">Итого</p>
          <p className="font-heading text-4xl text-gold-dark mb-2">
            <AnimatedTotal value={total} /> ₽
          </p>
          <p className="text-sm text-cream-muted">≈ {Math.round(perGuest).toLocaleString('ru-RU')} ₽/гость</p>
          {savings > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-gold-dark mt-2 font-medium"
            >
              Вы экономите {savings.toLocaleString('ru-RU')} ₽ vs Люкс
            </motion.p>
          )}
          <div className="mt-4 pt-4 border-t border-gold/20 space-y-2">
            <p className="text-xs text-cream-muted">✓ Доставка в КАД включена</p>
            <p className="text-xs text-cream-muted">✓ Без скрытых платежей</p>
            <p className="text-xs text-cream-muted">✓ Депозит 30% при оформлении</p>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            <span className="text-[10px] px-2 py-1 bg-gold/10 text-gold-dark rounded-full">19 лет</span>
            <span className="text-[10px] px-2 py-1 bg-gold/10 text-gold-dark rounded-full">3000+ мероприятий</span>
            <span className="text-[10px] px-2 py-1 bg-gold/10 text-gold-dark rounded-full">Эрмитаж</span>
          </div>
        </div>
      </div>
    </div>
  );
}
