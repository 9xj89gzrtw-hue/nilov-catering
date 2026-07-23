'use client';

import { useMemo } from 'react';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import MenuTariffs from '@/components/blocks/MenuTariffs';

export default function VeganPage() {
  const dishes = useMemo(() => ALL_DISHES.filter(d => d.dietBadges.includes('vegan')), []);

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Веган-линия</h1>
        <p className="text-muted-foreground mb-8">
          Растительное меню без продуктов животного происхождения — от закусок до десертов. {dishes.length} веганских блюд в каталоге.
        </p>

        <MenuTariffs format="vegan" formatLabel="Веган" />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Все веган-блюда ({dishes.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {dishes.map(dish => (
            <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-sm mb-1 pr-2">{dish.name}</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium shrink-0">VG</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{dish.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gold-text">{dish.pricePerGuest} ₽/гость</span>
              </div>
              {dish.allergens.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {dish.allergens.map(a => (
                    <span key={a} className="text-[10px] bg-muted text-muted-foreground px-1 py-0.5 rounded">{ALLERGEN_LABEL[a]}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
          <p className="text-sm font-medium mb-1">Не нашли своё? Составим индивидуально</p>
          <p className="text-xs text-muted-foreground mb-3">Шеф соберёт веган-меню под бюджет и пожелания.</p>
          <a href="/plan/constructor?diet=vegan" className="text-sm text-gold-text font-semibold hover:underline">
            Составить меню с шефом →
          </a>
        </div>
      </div>
    </main>
  );
}