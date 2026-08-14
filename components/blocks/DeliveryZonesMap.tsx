"use client";

import { motion } from "framer-motion";
import { Truck, Thermometer, Clock, ShieldCheck } from "lucide-react";
import { DELIVERY_ZONES } from "@/lib/service-spec";

export default function DeliveryZonesMap() {
  return (
    <section aria-label="Зоны доставки" className="py-20 md:py-28">
      <div className="container-site">
        <p className="text-gold-text mb-3 text-xs tracking-[0.2em] uppercase">Доставка</p>
        <h2 className="font-heading mb-4 text-3xl font-medium md:text-4xl">Где мы работаем</h2>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Бесплатная доставка в пределах КАД. Надбавки вне КАД — честные и предсказуемые.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DELIVERY_ZONES.map((zone, i) => (
            <motion.div
              key={zone.id}
              className="border-line bg-card rounded-xl border p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${zone.surcharge === 0 ? "bg-success/10" : "bg-gold-tint"}`}
                >
                  <Truck
                    className={`h-4 w-4 ${zone.surcharge === 0 ? "text-success" : "text-gold-text"}`}
                  />
                </div>
                <h3 className="font-heading text-sm font-medium">{zone.name}</h3>
              </div>
              <p className="text-muted-foreground mb-3 text-xs">{zone.distance}</p>
              <div className="space-y-1.5 text-xs">
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <Thermometer className="h-3 w-3" />
                  <span>
                    Холодовая цепь: {zone.coldChain ? "сумки-холодильники +2…+6 °C" : "термобоксы"}
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>Срок доставки: до {zone.slaHours} ч</span>
                </div>
                <div className="text-foreground mt-2 flex items-center gap-1.5 font-semibold">
                  {zone.surcharge === 0 ? (
                    <>
                      <ShieldCheck className="text-success h-3 w-3" />
                      Бесплатно
                    </>
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
