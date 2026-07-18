'use client';

import { useConstructor, FORMAT_CARDS } from '@/hooks/useConstructor';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function FormatSelector() {
  const { format, setFormat } = useConstructor();

  return (
    <div>
      <h2 className="font-heading text-2xl text-foreground mb-2">Выберите формат</h2>
      <p className="text-sm text-cream-muted mb-6">Какой тип мероприятия планируете?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {FORMAT_CARDS.map((f, i) => {
          const active = format === f.id;
          return (
            <motion.button
              key={f.id}
              type="button"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => setFormat(f.id)}
              whileTap={{ scale: 0.985 }}
              aria-pressed={active}
              className={`group relative block overflow-hidden rounded-2xl text-left min-h-[200px] sm:min-h-[232px] border-2 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 ${
                active
                  ? 'border-gold'
                  : 'border-transparent'
              }`}
              style={{
                boxShadow: active
                  ? '0 22px 52px -16px rgba(176,137,61,0.55)'
                  : '0 12px 30px -20px rgba(26,23,20,0.4)',
              }}
            >
              {/* Background image */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  style={{ backgroundImage: `url(${f.image})` }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
              </span>

              {/* Content */}
              <span className="relative z-10 flex h-full min-h-[200px] sm:min-h-[232px] flex-col justify-between p-5">
                <span className="flex items-start justify-between gap-3">
                  <span className="text-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">{f.icon}</span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
                      active
                        ? 'border-gold bg-gold text-white opacity-100 scale-100'
                        : 'border-white/40 text-white opacity-0 scale-50'
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                </span>

                <span>
                  <span className="block font-heading text-2xl text-white leading-tight drop-shadow">
                    {f.name}
                  </span>
                  <span className="mt-1 block text-xs text-white/80 leading-snug drop-shadow">
                    {f.desc}
                  </span>
                  <span className="mt-3 block font-mono text-gold-light text-lg drop-shadow">
                    от {f.price.toLocaleString('ru-RU')} ₽/гость
                  </span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
