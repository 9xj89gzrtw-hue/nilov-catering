'use client';

import { useMemo } from 'react';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import MenuTariffs from '@/components/blocks/MenuTariffs';
import B2BBanner from '@/components/common/B2BBanner';
import { AllergenChips } from '@/components/common/AllergenChips';
import DishCartIndicator from '@/components/interactive/DishCartIndicator';
import FoodPhoto from '@/components/common/FoodPhoto';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import Link from 'next/link';

export default function CoffeeBreakPage() {
  const coffeeDishes = useMemo(() =>ALL_DISHES.filter(d =>d.format.includes('coffee-break')), []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Кофе-брейк</h1>
        <p className="text-muted-foreground mb-2">
          Кофе, чай, выпечка и десерты для перерывов. Идеально для конференций и деловых встреч.
        </p>
        <p className="text-sm text-gold-text font-semibold mt-1 mb-8">от 390 ₽/гость · мин. 10 гостей</p>

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

        <MenuTariffs format="coffee-break" formatLabel="Кофе-брейк" />

        {/* Multi-day conference pricing */}
        <div className="mt-8 p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/10">
          <h2 className="font-heading text-xl font-medium mb-3">Многодневные конференции (2+ дня)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Для конференций 2+ дня — пакетная цена со скидкой 20% + объёмные скидки.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-line bg-background">
              <p className="text-sm font-semibold mb-1">Пример: 200 чел × 3 дня × 6 кофе-брейков</p>
              <p className="text-xs text-muted-foreground">1 450 ₽ × 200 × 6 × 3 = 5 220 000 ₽ (без скидок)</p>
              <p className="text-xs text-muted-foreground">Со скидками 15% (объём) + 20% (многодневность) = <strong className="text-foreground">3 549 600 ₽</strong></p>
              <p className="text-xs text-muted-foreground">Экономия: 1 670 400 ₽</p>
            </div>
            <div className="p-3 rounded-lg border border-line bg-background">
              <p className="text-sm font-semibold mb-1">Пример: 100 чел × 2 дня × 4 кофе-брейка</p>
              <p className="text-xs text-muted-foreground">1 450 ₽ × 100 × 4 × 2 = 1 160 000 ₽ (без скидок)</p>
              <p className="text-xs text-muted-foreground">Со скидкой 10% (объём) = <strong className="text-foreground">1 044 000 ₽</strong></p>
              <p className="text-xs text-muted-foreground">Экономия: 116 000 ₽</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            Скидки: от 50 гостей — 5%, от 100 — 10%, от 200 — 15%, от 500 — индивидуально.
            Многодневные конференции (2+ дня) — дополнительно -20%.
          </div>
          <div className="rounded-lg border border-line bg-secondary/30 p-4 mb-3">
            <p className="font-medium mb-2">Подписка для офисов</p>
            <p className="text-xs text-muted-foreground mb-2">
              Для регулярных кофе-брейков (4+ раза в месяц): еженедельно 4 события × 50 чел × 390 ₽
              = 78 000 ₽/мес → со скидкой 15% = 66 300 ₽/мес. Долгосрочный контракт: фикс-цена 60 000 ₽/мес
              (скидка 23%), ежемесячный ЭДО-инвойс, SLA в комплекте. Ротация меню: 8-недельный цикл
              без повторов, сезонные обновления.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Для многодневных конференций (2+ дня):</strong> ротация меню между днями —
              разные сеты канапе/выпечки/напитков каждый день, чтобы делегаты не устали от
              однообразия. 3-дневная конференция = 3 разных кофе-брейк-сета без повторов.
            </p>
          </div>
          <Link
            href="/contact?subject=Многодневная-конференция"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm min-h-[44px] inline-flex items-center font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
          >
             Запросить точную смету для конференции
          </Link>
        </div>

        {/* Conference Day Package */}
        <div className="mt-6 p-5 rounded-xl border-2 border-gold-text/40 bg-gold-text/5">
          <h2 className="font-heading text-lg font-medium mb-2">Конференционный пакет (на делегата/день)</h2>
          <p className="text-sm text-foreground/90 mb-3">
            Комплексная цена: утренний кофе-брейк + обед + дневной кофе-брейк.
            Один счёт, одна доставка, одна смета — без раздельных заказов.
          </p>
          <ul className="text-sm space-y-1 mb-3 list-disc list-inside text-foreground/90">
            <li><strong>Стандарт:</strong> 1 430 ₽/делегат/день (кофе-брейк 390 + обед 650 + кофе-брейк 390)</li>
            <li><strong>Скидка 20%</strong> для 2+ дневных конференций → 1 144 ₽/делегат/день</li>
            <li>Пример: 200 делегатов × 2 дня × 1 144 = <strong className="text-gold-text">457 600 ₽</strong> (включая доставку, посуду, официантов)</li>
            <li>Ротация: 3 разных кофе-брейк-сета + 2 разных обеда — без повторов</li>
            <li>Координатор конференции: <strong>Мария Васильева</strong>, прямой мобильный через <a href="/contact" className="underline text-gold-text">форму B2B-заявки</a></li>
          </ul>
          <Link
            href="/contact?eventType=Конференция&format=Кофе-брейк&comment=Конференционный пакет"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm min-h-[44px] inline-flex items-center font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
          >
             Заказать конференционный пакет →
          </Link>
        </div>

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Все блюда кофе-брейка ({coffeeDishes.length})</h2>
        <B2BBanner />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          {coffeeDishes.map(dish =>(
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
      </div>
    </main>
  );
}