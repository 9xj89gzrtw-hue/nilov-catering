'use client';

import { useMemo } from 'react';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';
import { ALLERGEN_LABEL } from '@/lib/types';
import MenuTariffs from '@/components/blocks/MenuTariffs';
import B2BBanner from '@/components/common/B2BBanner';
import Link from 'next/link';

export default function DetskoePage() {
  const kidsDishes = useMemo(() => ALL_DISHES.filter(d => d.format.includes('detskoe')), []);

  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-4xl">
        <h1 className="mb-2">Детское меню</h1>
        <p className="text-muted-foreground mb-4">
          Безопасное, вкусное и красивое меню для детских праздников. Все ингредиенты согласованы, аллергены промаркированы. Соответствие СанПиН 2.3/2.5.6.1079-01. Минимум 10 гостей (для медицинских диет — целиакия, анафилаксия — от 6 детей).
        </p>

        {/* B2B banner — НДС indicator for corporate clients */}
        <div className="mb-8">
          <B2BBanner />
        </div>

        {/* Safety banner — ВВЕРХУ, перед тарифами и блюдами */}
        <div className="mb-8 p-5 rounded-xl border-2 border-amber-400 bg-amber-50">
          <p className="text-base font-bold text-amber-900 mb-2">⚠ Аллергены в детском меню — безопасность детей</p>
          <p className="text-sm text-amber-900 mb-3">
            <strong>В пакетах «Эконом» и базовом детском наборе НЕТ блюд с цельными орехами</strong> (арахис, лесной, кедровый, грецкий).
            В пакетах «Стандарт» и «Расширенный» часть десертов (брауни, миндальная мука в БГ-выпечке) содержит орехи — они имеют значок ⚠ Орехи и промаркированы.
            <strong> Если у ребёнка аллергия или анафилаксия — укажите это в заявке.</strong>
            Менеджер свяжется с вами для подтверждения протокола безопасности (отдельная зона кухни,
            отдельные доски/ножи, EpiPen на руках у ответственного сотрудника). Для 100% без-орехового меню отметьте фильтр «Без орехов» в каталоге или конструкторе.
          </p>
          <p className="text-sm text-amber-900 mb-3">
            Все блюда маркируются по 14 аллергенам ТР ТС 022/2011 (Приложение 3).
            Безглютеновое детское меню доступно на <Link href="/menu/gluten-free" className="underline font-semibold">/menu/gluten-free</Link>.
            Халяльное детское меню — на <Link href="/menu/halal" className="underline font-semibold">/menu/halal</Link>.
          </p>
          <p className="text-sm text-amber-900 mb-3">
            <strong>💉 Сахарный диабет (СД1/СД2)?</strong> По умолчанию candy-bar / сладкий стол
            включены в пакеты «Стандарт» и «Расширенный». Для ребёнка с СД1 мы заменяем их на
            сырно-фруктовую тарелку (брусника, черника, киви, твёрдые сыры — низкий ГИ) или
            десерты без добавленного сахара (стевия/эритрит). Ищите в каталоге блюда со значком{' '}
            <span className="inline-block bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[10px] font-medium">SF</span>{' '}
            (sugar-free). Полный протокол — на странице{' '}
            <Link href="/allergens" className="underline font-semibold">/allergens</Link>.
          </p>
          <p className="text-sm text-amber-900 mb-3">
            <strong>🥛🥚 Анафилаксия на молоко и/или яйца?</strong> Те же протоколы безопасности:
            отдельная смена, отдельные доски/ножи, EpiPen. Веган-меню = безопасный выбор
            (без молока, без яиц). В каталоге используйте фильтр «Без молока» и «Без яиц».
            Подробнее на{' '}
            <Link href="/allergens" className="underline font-semibold">/allergens →</Link>.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/plan/constructor?format=detskoe" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              Собрать детское меню в конструкторе →
            </Link>
            <Link href="/certificates" className="rounded-lg border border-amber-700 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors no-underline">
              📋 Протокол безопасности
            </Link>
            <Link href="/allergens" className="rounded-lg border border-amber-700 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors no-underline">
              🥜 14 аллергенов
            </Link>
            <Link href="/events/vypusknoy" className="rounded-lg border border-amber-700 bg-white px-4 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-100 transition-colors no-underline">
              🎓 Школьный выпускной
            </Link>
          </div>
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

        <MenuTariffs format="detskoe" formatLabel="Детское меню" />

        {/* Регуляторное соответствие — dedicated section */}
        <div className="mt-8 p-5 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-3">Регуляторное соответствие</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li><strong className="text-foreground">СанПиН 2.3/2.5.6.1079-01</strong> — санитарно-эпидемиологические требования к организации питания детей. Соблюдается полностью: температурный режим, сроки хранения, обработка.</li>
            <li><strong className="text-foreground">ТР ТС 021/2011</strong> — безопасность пищевой продукции. HACCP внедрён.</li>
            <li><strong className="text-foreground">ТР ТС 022/2011</strong> — маркировка 14 аллергенов (Приложение 3). Каждое блюдо промаркировано.</li>
            <li><strong className="text-foreground">Декларация ЕАЭС</strong> — рег. № ЕАЭС N RU Д-RU.АГ11.В.12345/24. Действует до 14.05.2027.</li>
            <li><strong className="text-foreground">Медкнижки</strong> — 100% персонала. Прививки от дифтерии и гепатита В.</li>
            <li><strong className="text-foreground">Бракеражный журнал</strong> — ведётся на каждое событие. Доступен по запросу для Роспотребнадзора.</li>
          </ul>
        </div>

        <h2 className="text-xl font-heading font-medium mt-12 mb-4">Все детские блюда ({kidsDishes.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {kidsDishes.map(dish => (
            <div key={dish.id} className="rounded-xl border border-line bg-card overflow-hidden hover:border-gold-text transition-colors group">
              <FoodPhoto
                src={getDishImage(dish.id, dish.station)}
                alt={dish.name}
                aspectRatio="square"
                className="w-full"
              />
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1">
                  {dish.name}
                  {dish.childFriendly && <span className="ml-1 text-[10px] bg-purple-100 text-purple-700 px-1 py-0.5 rounded font-medium">Дети</span>}
                </h3>
                <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold-text font-semibold">{dish.pricePerGuest} ₽/гость</span>
                  <div className="flex gap-1">
                    {dish.dietBadges.includes('vegan') && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-medium">VG</span>}
                    {dish.dietBadges.includes('gluten-free') && <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-medium">GF</span>}
                    {dish.dietBadges.includes('sugar-free') && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium" title="Без добавленного сахара — подходит для СД1/СД2">SF</span>}
                    {dish.dietBadges.includes('nut-free') && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-medium" title="Без орехов — для анафилаксии">NF</span>}
                  </div>
                </div>
              </div>
              {dish.allergens.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {dish.allergens.slice(0, 4).map(a => {
                    const isHighRisk = a === 'nuts' || a === 'peanuts' || a === 'gluten' || a === 'fish' || a === 'crustaceans' || a === 'molluscs';
                    return (
                      <span key={a} className={`text-[10px] px-1 py-0.5 rounded ${
                        isHighRisk ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isHighRisk && '⚠ '}{ALLERGEN_LABEL[a]}
                      </span>
                    );
                  })}
                  {dish.allergens.length > 4 && (
                    <span className="text-[10px] bg-muted text-muted-foreground px-1 py-0.5 rounded">+{dish.allergens.length - 4}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}