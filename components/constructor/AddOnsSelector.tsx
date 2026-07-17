'use client';
import { useConstructor, ADD_ON_CATALOG } from '@/hooks/useConstructor';
import { motion } from 'framer-motion';

export default function AddOnsSelector() {
  const { addOns, toggleAddOn } = useConstructor();
  return (
    <div>
      <h2 className="font-heading text-2xl text-cream mb-2">Дополнительные услуги</h2>
      <p className="text-sm text-cream-muted mb-6">Не обязательно — можно пропустить</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ADD_ON_CATALOG.map((a, i) => {
          const selected = addOns.find(x => x.id === a.id);
          return (
            <motion.button key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => toggleAddOn(a)} className={`flex items-center justify-between p-4 rounded-lg border transition-all text-left min-h-[44px] ${selected ? 'border-gold bg-gold/10' : 'border-border hover:border-border-light'}`}>
              <div>
                <p className="text-cream text-sm">{a.name}</p>
                <p className="font-mono text-gold text-xs mt-1">{a.price === 0 ? 'Бесплатно' : `${a.price.toLocaleString('ru-RU')} ₽${a.unit === 'per-guest' ? '/гость' : ''}`}</p>
              </div>
              <span className={`w-6 h-6 rounded border-2 flex items-center justify-center ${selected ? 'border-gold bg-gold text-background' : 'border-border'}`}>
                {selected && '✓'}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
