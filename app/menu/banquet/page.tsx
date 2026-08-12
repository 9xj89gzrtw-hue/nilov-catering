'use client';

import { useMemo } from 'react';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import MenuCTABlock from '@/components/blocks/MenuCTABlock';
import MenuTariffs from '@/components/blocks/MenuTariffs';
import B2BBanner from '@/components/common/B2BBanner';
import { AllergenChips } from '@/components/common/AllergenChips';
import DishCartIndicator from '@/components/interactive/DishCartIndicator';
import FoodPhoto from '@/components/common/FoodPhoto';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import Link from 'next/link';

export default function BanquetPage() {
  const banquetDishes = useMemo(() =>ALL_DISHES.filter(d =>d.format.includes('banket')), []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Банкет</h1>
        <p className="text-muted-foreground mb-2">
          Посадка за стол, официанты, смена блюд. Классический формат для свадеб и юбилеев.
        </p>
        <p className="text-sm text-gold-text font-semibold mt-1 mb-8">от 3 950 ₽/гость · мин. 15 гостей</p>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-8">
          <B2BBanner />
        </div>

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

        <MenuTariffs format="banquet" formatLabel="Банкет" />

        <B2BBanner />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Все блюда банкета ({banquetDishes.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {banquetDishes.map(dish =>(
            <div key={dish.id} className="rounded-xl border border-line bg-card overflow-hidden hover:border-gold-text transition-colors">
              <div className="aspect-[4/3] relative bg-secondary">
                <FoodPhoto
                  src={getDishImage(dish.id, dish.station)}
                  alt={dish.name}
                  aspectRatio="wide"
                  objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                  className="w-full h-full"
                />
                <AllergenChips dish={dish} />
                <DishCartIndicator dishId={dish.id} />
                <div className="absolute bottom-1.5 right-1.5">
                  <span className="text-[10px] bg-white/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 font-semibold">{dish.pricePerGuest} ₽</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1">{dish.name}</h3>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold-text font-semibold">{dish.pricePerGuest} ₽/гость</span>
                  <div className="flex gap-1">
                    {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">VG</span>}
                    {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">GF</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <MenuCTABlock format="banket" formatLabel="Банкет" />
      </div>
    </main>
  );
}