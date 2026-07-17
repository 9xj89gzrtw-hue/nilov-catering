'use client';
import { useConstructor, FORMAT_CARDS } from '@/hooks/useConstructor';
import { motion } from 'framer-motion';

export default function FormatSelector() {
  const { format, setFormat } = useConstructor();
  return (
    <div>
      <h2 className="font-heading text-2xl text-cream mb-2">Выберите формат</h2>
      <p className="text-sm text-cream-muted mb-6">Какой тип мероприятия планируете?</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FORMAT_CARDS.map((f, i) => (
          <motion.button key={f.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            onClick={() => setFormat(f.id)}
            className={`relative p-6 rounded-xl border text-left transition-all min-h-[44px] ${format === f.id ? 'border-gold bg-gold/10' : 'border-border hover:border-border-light bg-card'}`}>
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-heading text-xl text-cream mb-1">{f.name}</h3>
            <p className="text-xs text-cream-muted mb-3">{f.desc}</p>
            <p className="font-mono text-gold text-lg">от {f.price.toLocaleString('ru-RU')} ₽/гость</p>
            {format === f.id && <span className="absolute top-4 right-4 text-gold">✓</span>}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
