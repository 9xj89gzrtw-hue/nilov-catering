'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  slaHours?: number;
  slaBooking?: string;
  variant?: 'mini' | 'full';
  mode?: 'book' | 'check';
}

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

// Демо-занятости (в проде — API)
const BUSY_DATES = new Set(['2026-08-15', '2026-08-22', '2026-09-05', '2026-09-10']);

export default function AvailabilityCalendar({ slaHours = 2, slaBooking = 'O3', variant = 'full', mode = 'check' }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Пн=0

  const days: (number | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const dateStr = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const isPast = (d: number) => new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isBusy = (d: number) => BUSY_DATES.has(dateStr(d));

  const prevMonth = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else { setMonth(m => m - 1); } };
  const nextMonth = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else { setMonth(m => m + 1); } };

  if (variant === 'mini') {
    return (
      <div className="rounded-lg border border-line bg-card p-3 inline-block">
        <div className="flex items-center justify-between mb-2">
          <button onClick={prevMonth} className="p-1 touch-target"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs font-medium">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="p-1 touch-target"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center">
          {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <div key={d} className="text-[10px] text-muted-foreground py-0.5">{d}</div>)}
          {days.map((d, i) => (
            <div key={i} className={`text-xs py-1 rounded ${d === null ? '' : isPast(d) ? 'text-muted-foreground/40' : isBusy(d) ? 'bg-destructive/10 text-destructive line-through' : 'hover:bg-gold-tint cursor-pointer'}`}
              onClick={() => d && !isPast(d) && !isBusy(d) && setSelected(dateStr(d))}>
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-medium">{MONTHS[month]} {year}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-secondary touch-target"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-secondary touch-target"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-6">
        {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <div key={d} className="text-xs font-medium text-muted-foreground py-1">{d}</div>)}
        {days.map((d, i) => (
          <button
            key={i}
            disabled={d === null || isPast(d!) || isBusy(d!)}
            onClick={() => d && setSelected(dateStr(d))}
            className={`text-sm py-2.5 rounded-lg touch-target transition-colors ${d === null ? '' :
              isPast(d!) ? 'text-muted-foreground/30 cursor-not-allowed' :
              isBusy(d!) ? 'bg-destructive/10 text-destructive line-through cursor-not-allowed' :
              selected === dateStr(d!) ? 'bg-primary text-primary-foreground font-semibold' :
              'hover:bg-gold-tint'}
            `}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-destructive/10 border border-destructive/30" /><span>Занято</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /><span>Выбрано</span></div>
        {selected && <span className="ml-auto font-medium text-foreground">{selected} — ответ за {slaHours}ч</span>}
      </div>
    </div>
  );
}