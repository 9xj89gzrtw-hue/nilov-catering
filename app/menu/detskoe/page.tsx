'use client';

import { useMemo } from 'react';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import MenuTariffs from '@/components/blocks/MenuTariffs';
import Link from 'next/link';

export default function DetskoePage() {
  const kidsDishes = useMemo(() => ALL_DISHES.filter(d => d.format.includes('detskoe')), []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Детское меню</h1>
        <p className="text-muted-foreground mb-8">
          Безопасное, вкусное и красивое меню для детских праздников. Все ингредиенты согласованы, аллергены промаркированы. Минимум 10 гостей.
        </p>

        {/* CTA: "Не нашли — составим" */}
        <div className="mb-8 p-4 rounded-xl border border-gold-text bg-gold-tint flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm font-medium">Не нашли подходящее меню? Составим индивидуально.</p>
          <Link 
            href="/plan/helper" 
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Составить меню
          </Link>
        </div>

        <MenuTariffs format="detskoe" formatLabel="Детское меню" />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Все детские блюда ({kidsDishes.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {kidsDishes.map(dish => (
            <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
              <h3 className="font-medium text-sm mb-1">
                {dish.name}
                {dish.childFriendly && <span className="ml-1 text-[10px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-medium">Дети</span>}
              </h3>
              <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{dish.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gold-text font-semibold">{dish.pricePerGuest} ₽/гость</span>
                <div className="flex gap-1">
                  {dish.dietBadges.includes('vegan') && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">VG</span>}
                  {dish.dietBadges.includes('gluten-free') && <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">GF</span>}
                </div>
              </div>
              {dish.allergens.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {dish.allergens.slice(0, 4).map(a => {
                    const isHighRisk = a === 'nuts' || a === 'peanuts' || a === 'gluten' || a === 'fish' || a === 'crustaceans' || a === 'molluscs';
                    return (
                      <span key={a} className={`text-[8px] px-1 py-0.5 rounded ${
                        isHighRisk ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isHighRisk && '⚠ '}{ALLERGEN_LABEL[a]}
                      </span>
                    );
                  })}
                  {dish.allergens.length > 4 && (
                    <span className="text-[8px] bg-muted text-muted-foreground px-1 py-0.5 rounded">+{dish.allergens.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Safety banner — для аллергиков */}
        <div className="mt-8 p-4 rounded-xl border border-destructive/30 bg-destructive/5">
          <p className="text-sm font-medium mb-1">⚠ Аллергены в детском меню</p>
          <p className="text-xs text-muted-foreground">
            Блюда с орехами и глютеном выделены красным. Если у ребёнка аллергия — отметьте её в конструкторе меню или предупредите менеджера по телефону. Все блюда маркируются по 14 аллергенам ТР ТС 022/2011.
          </p>
          <Link href="/plan/constructor?format=detskoe" className="text-xs text-gold-text font-semibold hover:underline mt-2 inline-block">
            Собрать детское меню в конструкторе →
          </Link>
        </div>
      </div>
    </main>
  );
}