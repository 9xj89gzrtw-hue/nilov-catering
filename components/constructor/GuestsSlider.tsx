'use client';
import { useConstructor } from '@/hooks/useConstructor';

export default function GuestsSlider() {
  const { guestCount, setGuestCount, format } = useConstructor();
  const count = guestCount || 0;
  return (
    <div>
      <h2 className="font-heading text-2xl text-cream mb-2">Количество гостей</h2>
      <p className="text-sm text-cream-muted mb-8">От 10 до 500 человек</p>
      <div className="text-center mb-8">
        <span className="font-heading text-6xl text-gold">{count || '—'}</span>
        <span className="text-cream-muted ml-2">гостей</span>
      </div>
      <input type="range" min={10} max={500} step={5} value={count || 10} onChange={e => setGuestCount(Number(e.target.value))}
        className="w-full accent-gold h-2" aria-label="Количество гостей" />
      <div className="flex justify-between text-xs text-cream-muted mt-2"><span>10</span><span>500</span></div>
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {[20, 50, 100, 150, 200, 300, 500].map(n => (
          <button key={n} onClick={() => setGuestCount(n)} className={`px-4 py-2 rounded-full text-sm transition-colors min-h-[44px] ${count === n ? 'bg-gold text-background' : 'border border-border text-cream-muted hover:border-gold/50'}`}>
            {n}
          </button>
        ))}
      </div>
      {count > 0 && count < 10 && <p className="text-center text-burgundy mt-4 text-sm">⚠ Минимальный заказ на 10 человек</p>}
      {count > 500 && <p className="text-center text-gold mt-4 text-sm">Для {count} гостей — индивидуальный расчёт. Позвоните: +7 (812) 919-59-11</p>}
    </div>
  );
}
