'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import { getDishImageByIndex } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import MenuTariffs from '@/components/blocks/MenuTariffs';

export default function VeganPage() {
  const dishes = useMemo(() => ALL_DISHES.filter((d) => d.dietBadges.includes('vegan')), []);

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Веган-меню</h1>
        <p className="text-muted-foreground mb-6">
          Растительное меню без продуктов животного происхождения — от закусок до десертов.
          {' '}
          {dishes.length} веганских блюд: стейки из цветной капусты, будда-боулы, шоколадные муссы
          из авокадо, чиа-пудинги. Никаких «соевых сосисок» — только авторская растительная кухня.
        </p>

        <div className="mb-8 p-5 rounded-xl border border-emerald-300 bg-emerald-50">
          <h2 className="font-heading text-base font-medium mb-2">🌱 Что такое наше веган-меню</h2>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90">
            <li>Авторская растительная кухня: цветная капуста, грибы, бобовые, орехи (если нет анафилаксии), кокос, авокадо</li>
            <li>Без имитаций мяса — никаких соевых сосисок, веган-колбас, сейтана</li>
            <li>Тофу — только в 1 блюде (Будда-боул), по желанию заменяем на нут</li>
            <li>Отдельная зона кухни, отдельная посуда, без cross-contamination с молочными и яйцами</li>
            <li>Возможно в одном заказе с всеядными/рыбными группами — через конструктор</li>
            <li>Цены: 2 950 ₽/гость (Стандарт). Премиум-веган через конструктор — от 4 500 ₽/гость</li>
          </ul>
        </div>

        <MenuTariffs format="vegan" formatLabel="Веган" />

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">
          Все веган-блюда ({dishes.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {dishes.map((dish, idx) => (
            <div
              key={dish.id}
              className="rounded-xl border border-line bg-card overflow-hidden hover:border-gold-text transition-colors"
            >
              <div className="relative">
                <FoodPhoto
                  src={getDishImageByIndex(dish.id, dish.station, idx)}
                  alt={dish.name}
                  aspectRatio="square"
                  objectPosition="center 40%"
                  className="w-full"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm mb-1 pr-2">{dish.name}</h3>
                  <span
                    className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium shrink-0"
                    title="Веган — без животных продуктов"
                  >
                    VG
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gold-text">
                    {dish.pricePerGuest} ₽/гость
                  </span>
                </div>
                {dish.allergens.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {dish.allergens.map((a) => (
                      <span
                        key={a}
                        className="text-[10px] bg-muted text-muted-foreground px-1 py-0.5 rounded"
                      >
                        {ALLERGEN_LABEL[a]}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl border border-dashed border-line bg-card/50">
          <p className="text-sm font-medium mb-1">Не нашли своё? Составим индивидуально</p>
          <p className="text-xs text-muted-foreground mb-3">
            Шеф соберёт веган-меню под бюджет и пожелания. Премиум-веган от 4 500 ₽/гость с
            трюфелем, лесными грибами, эдамаме, киноa, ферментированными овощами.
          </p>
          <Link
            href="/plan/constructor?diet=vegan"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            🛒 Собрать веган-меню в конструкторе →
          </Link>
        </div>

        <div className="mt-6 p-4 rounded-xl border border-line bg-card">
          <p className="text-xs text-muted-foreground">
            📸 Все фотографии блюд в каталоге — иллюстрации. Реальные фото блюд с наших событий — в{' '}
            <Link href="/gallery" className="underline">галерее</Link>. Бесплатная дегустация для
            заказа от 100 000 ₽ — убедитесь во вкусе до бронирования.
          </p>
        </div>
      </div>
    </main>
  );
}
