'use client';

import { useMemo, useState, useEffect } from 'react';
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

const GRADIENT_MAP: Record<string, string>= {
  'cold': 'from-blue-100 via-blue-50 to-cyan-50',
  'hot': 'from-orange-100 via-orange-50 to-amber-50',
  'desserts': 'from-pink-100 via-pink-50 to-rose-50',
  'drinks': 'from-emerald-100 via-emerald-50 to-teal-50',
  'show': 'from-purple-100 via-purple-50 to-fuchsia-50',
};

const STATION_LABELS: Record<string, string>= {
  'cold': 'Холодные закуски',
  'hot': 'Горячее',
  'desserts': 'Десерты',
  'drinks': 'Напитки',
  'show': 'Шоу-станции',
};

export default function FurshetPage() {
  const furshetDishes = useMemo(() =>ALL_DISHES.filter(d =>d.format.includes('furshet')), []);
  const [visibleStations, setVisibleStations] = useState<number | null>(null);
  useEffect(() => { setVisibleStations(2); }, []);

  const grouped = useMemo(() => {
    const map: Record<string, typeof ALL_DISHES>= {};
    furshetDishes.forEach(d => {
      const station = d.station || 'cold';
      if (!map[station]) map[station] = [];
      map[station].push(d);
    });
    return map;
  }, [furshetDishes]);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading mb-4">Фуршет</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Лёгкие закуски на стоячем приёме. Канапе, тарталетки, брускетты, мини-бургеры.
            Гости свободно перемещаются и общаются.
          </p>
          <p className="text-sm text-gold-text font-semibold mt-3">от 2 450 ₽/гость · мин. 20 гостей</p>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Link href="#tariffs" className="rounded-full bg-gold-text text-white px-4 py-1.5 text-xs font-semibold">
            Тарифы и цены
          </Link>
          <Link href="#dishes" className="rounded-full border border-line px-4 py-1.5 text-xs hover:border-gold-text transition-colors">
            Все блюда
          </Link>
          <Link href="/plan/constructor?format=furshet" className="rounded-full border border-line px-4 py-1.5 text-xs hover:border-gold-text transition-colors">
            Собрать меню
          </Link>
        </div>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-10">
          <B2BBanner />
        </div>

        {/* Tariffs */}
        <div id="tariffs" className="scroll-mt-20">
          <h2 className="text-2xl font-heading font-medium mb-6">Тарифы</h2>
          <MenuTariffs format="furshet" formatLabel="Фуршет" />
        </div>

        {/* All dishes by station — with pagination */}
        <B2BBanner />
        <div id="dishes" className="mt-8 scroll-mt-20">
          <h2 className="text-2xl font-heading font-medium mb-6">Все блюда фуршета</h2>

          {Object.entries(grouped).slice(0, visibleStations === null ? undefined : visibleStations).map(([station, dishes]) =>(
            <div key={station} className="mb-10">
              <h3 className="text-lg font-heading font-medium mb-4">{STATION_LABELS[station] || station}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {dishes.map(dish => {
                  return (
                    <div key={dish.id} className="rounded-xl border border-line bg-card overflow-hidden hover:border-gold-text hover:-translate-y-0.5 transition-all group">
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
                        {dish.dietBadges.length >0 && (
                          <div className="absolute top-1.5 left-1.5 flex gap-0.5">
                            {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-[#065F46] text-white px-1 py-0.5 rounded font-bold">VG</span>}
                            {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-[#B45309] text-white px-1 py-0.5 rounded font-bold">GF</span>}
                          </div>
                        )}
                      </div>
                      <div className="p-2.5">
                        <h4 className="text-xs font-medium leading-tight mb-0.5 group-hover:text-gold-text transition-colors line-clamp-1">{dish.name}</h4>
                        <p className="text-[10px] text-muted-foreground line-clamp-2">{dish.description}</p>
                        {dish.allergens.length >0 && (
                          <div className="mt-1 flex flex-wrap gap-0.5">
                            {dish.allergens.slice(0, 2).map(a =>(
                              <span key={a} className="text-[10px] bg-muted text-muted-foreground px-1 py-0.5 rounded">{ALLERGEN_LABEL[a]}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Pagination for stations */}
          {visibleStations !== null && visibleStations < Object.keys(grouped).length && (
            <div className="text-center py-8">
              <button
                onClick={() =>setVisibleStations(s =>(s ?? 0) + 2)}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gold-text bg-card px-6 py-3 text-sm font-semibold text-gold-text hover:bg-gold-tint transition-colors touch-target"
                type="button"
                aria-controls="dishes"
                aria-expanded={(visibleStations ?? 0) >2 ? 'true' : 'false'}
              >
                Показать ещё станции ↓
              </button>
              <p className="text-xs text-muted-foreground mt-2" aria-live="polite">
                Показано {visibleStations} из {Object.keys(grouped).length} категорий
              </p>
            </div>
          )}
        </div>

        <MenuCTABlock format="furshet" formatLabel="Фуршет" />
      </div>
    </main>
  );
}