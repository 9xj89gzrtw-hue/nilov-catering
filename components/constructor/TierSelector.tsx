'use client';
import { useConstructor } from '@/hooks/useConstructor';
import { pricingPackages } from '@/lib/data';
import { motion } from 'framer-motion';

const TIER_NAMES: Record<string, string> = { economy: 'Эконом', standard: 'Стандарт', premium: 'Премиум', luxury: 'Люкс', classic: 'Классик', vip: 'VIP', light: 'Лёгкий' };

export default function TierSelector() {
  const { format, tierMode, setTierMode, tier, setTier, guestCount } = useConstructor();
  const tiers: Record<string, number> = {
    furshet: { economy: 2450, standard: 3450, premium: 4350, luxury: 5350 },
    banket: { classic: 4470, premium: 5970, vip: 6970 },
    'coffee-break': { light: 950, standard: 1450, premium: 1950, luxury: 2450 },
    'mobile-furshet': { standard: 858, premium: 1188 },
  }[format || ''] || {};

  return (
    <div>
      <h2 className="font-heading text-2xl text-cream mb-2">Тариф или своё меню</h2>
      <p className="text-sm text-cream-muted mb-6">Готовый пакет или соберите сами</p>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTierMode('preset')} className={`px-6 py-2 rounded-full text-sm transition-colors min-h-[44px] ${tierMode === 'preset' ? 'bg-gold text-background' : 'border border-border text-cream-muted'}`}>Готовые тарифы</button>
        <button onClick={() => setTierMode('custom')} className={`px-6 py-2 rounded-full text-sm transition-colors min-h-[44px] ${tierMode === 'custom' ? 'bg-gold text-background' : 'border border-border text-cream-muted'}`}>Собрать своё</button>
      </div>
      {tierMode === 'preset' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(tiers).map(([key, price], i) => (
            <motion.button key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setTier(key)} className={`relative p-5 rounded-xl border text-left transition-all min-h-[44px] ${tier === key ? 'border-gold bg-gold/10' : 'border-border hover:border-border-light'}`}>
              {key === 'standard' && <span className="absolute -top-2 left-4 text-[9px] uppercase bg-gold text-background px-2 py-0.5 rounded">Рекомендуем</span>}
              <h3 className="font-heading text-lg text-cream">{TIER_NAMES[key] || key}</h3>
              <p className="font-mono text-gold text-xl mt-2">{price.toLocaleString('ru-RU')} ₽</p>
              <p className="text-xs text-cream-muted mt-1">за гостя</p>
              {tier === key && <span className="absolute top-3 right-3 text-gold">✓</span>}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-cream-muted text-sm mb-4">Каталог блюд доступен на странице <a href="/menu" className="text-gold underline">Меню</a></p>
          <p className="text-cream-muted text-sm">Отметьте блюда здесь — они добавятся в ваш заказ</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pricingPackages.slice(0, 3).map(pkg => (
              <div key={pkg.id} className="p-4 border border-border rounded-lg">
                <p className="text-cream text-sm font-heading">{pkg.name}</p>
                <p className="text-gold font-mono text-sm mt-1">{pkg.pricePerPerson.toLocaleString('ru-RU')} ₽</p>
              </div>
            ))}
          </div>
          <p className="text-gold text-sm mt-4">Подробный выбор блюд — в следующей версии конструктора</p>
        </div>
      )}
    </div>
  );
}
