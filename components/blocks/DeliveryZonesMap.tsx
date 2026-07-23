'use client';

import { motion } from 'framer-motion';
import { Truck, Thermometer, Clock, ShieldCheck } from 'lucide-react';
import { DELIVERY_ZONES } from '@/lib/service-spec';

export default function DeliveryZonesMap() {
  return (
    <section aria-label="Зоны доставки" className="py-20 md:py-28">
      <div className="container-site">
        <p className="text-xs tracking-[0.2em] uppercase text-gold-text mb-3">Доставка</p>
        <h2 className="font-heading text-3xl md:text-4xl font-medium mb-4">Где мы работаем</h2>
        <p className="text-muted-foreground mb-10 max-w-xl">Бесплатная доставка в пределах КАД. Надбавки вне КАД — честные и предсказуемые.</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DELIVERY_ZONES.map((zone, i) => (
            <motion.div
              key={zone.id}
              className="rounded-xl border border-line bg-card p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${zone.surcharge === 0 ? 'bg-success/10' : 'bg-gold-tint'}`}>
                  <Truck className={`w-4 h-4 ${zone.surcharge === 0 ? 'text-success' : 'text-gold-text'}`} />
                </div>
                <h3 className="font-heading font-medium text-sm">{zone.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{zone.distance}</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Thermometer className="w-3 h-3" />
                  <span>Холодовая цепь: {zone.coldChain ? '✅' : '❌ (термобоксы)'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Ответ: до {zone.slaHours}ч</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-foreground mt-2">
                  {zone.surcharge === 0 ? (
                    <><ShieldCheck className="w-3 h-3 text-success" /> Бесплатно</>
                  ) : (
                    <>+{zone.surcharge.toLocaleString()} ₽</>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
