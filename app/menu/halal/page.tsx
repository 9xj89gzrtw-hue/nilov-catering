'use client';

import { useMemo } from 'react';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';

export default function HalalPage() {
  const dishes = useMemo(() => ALL_DISHES.filter(d => d.dietBadges.includes('halal')), []);

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Халяль</h1>
        <p className="text-muted-foreground mb-2">
          Меню халяль. Отдельная линия приготовления, сертифицированные продукты по стандартам «Халяль-сертификат».
        </p>

        <div className="mb-6 p-4 rounded-xl border border-amber-200 bg-amber-50 text-sm">
          ⚠️ Халяль-меню предоставляется по запросу. Срок согласования — от 3 рабочих дней. Сертифицированные продукты, отдельная линия приготовления.
        </div>

        <p className="text-muted-foreground mb-8">
          Халяль-совместимых блюд в каталоге: {dishes.length}. Можно собрать меню через конструктор с фильтром «Халяль».
        </p>

        {dishes.length > 0 && (
          <>
            <h2 className="text-xl font-heading font-medium mt-12 mb-4">Халяль-блюда ({dishes.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {dishes.map(dish => (
                <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
                  <div className="flex items-start justify-between">
                    <h3 className="font-medium text-sm mb-1 pr-2">{dish.name}</h3>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium shrink-0">H</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gold-text">{dish.pricePerGuest} ₽/гость</span>
                  </div>
                  {dish.allergens.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {dish.allergens.map(a => {
                        const isNut = a === 'nuts' || a === 'peanuts';
                        return (
                          <span key={a} className={`text-[10px] px-1 py-0.5 rounded ${
                            isNut ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                          }`}>{ALLERGEN_LABEL[a]}</span>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-10">
              <a href="/plan/constructor?format=furshet" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                🛒 Собрать халяль-меню в конструкторе →
              </a>
            </div>
          </>
        )}

        <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
          <p className="text-sm font-medium mb-1">Заказать халяль-меню</p>
          <p className="text-xs text-muted-foreground mb-3">Шеф разработает халяль-меню под бюджет и формат.</p>
          <a href="tel:+78129195911" className="text-sm text-gold-text font-semibold hover:underline">
            📞 +7 (812) 919-59-11
          </a>
        </div>
      </div>
    </main>
  );
}