'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import { SITE } from '@/lib/data';

export default function GlutenFreePage() {
  const dishes = useMemo(() => ALL_DISHES.filter(d => d.dietBadges.includes('gluten-free')), []);
  // Split desserts: nut-free DEFAULT vs nut-containing OPTION
  const dessertsNutFree = dishes.filter(d => d.station === 'desserts' && !d.allergens.includes('nuts') && !d.allergens.includes('peanuts'));
  const dessertsWithNuts = dishes.filter(d => d.station === 'desserts' && (d.allergens.includes('nuts') || d.allergens.includes('peanuts')));
  const mainsNutFree = dishes.filter(d => (d.station === 'hot' || d.station === 'cold') && !d.allergens.includes('nuts') && !d.allergens.includes('peanuts'));
  const mainsWithNuts = dishes.filter(d => (d.station === 'hot' || d.station === 'cold') && (d.allergens.includes('nuts') || d.allergens.includes('peanuts')));
  const drinksNutFree = dishes.filter(d => d.station === 'drinks' && !d.allergens.includes('nuts') && !d.allergens.includes('peanuts'));
  const drinksWithNuts = dishes.filter(d => d.station === 'drinks' && (d.allergens.includes('nuts') || d.allergens.includes('peanuts')));
  const allWithNuts = [...dessertsWithNuts, ...mainsWithNuts, ...drinksWithNuts];

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/menu" className="hover:text-foreground">Меню</Link>
          {' / '}
          <span className="text-foreground">Без глютена</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3">Безглютеновое меню</h1>
        <p className="text-lg text-muted-foreground mb-6">
          {dishes.length} блюд без глютена — от закусок до десертов. Отдельная линия кухни,
          отдельная посуда (синяя маркировка), тестирование &lt;20 ppm. Подходит для целиакии.
        </p>

        {/* Целиакия-протокол */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-blue-200 bg-blue-50">
          <h2 className="font-heading text-xl font-medium mb-4">🌾 Протокол для целиакии</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Отдельная зона кухни</h3>
              <p className="text-muted-foreground">Отдельные разделочные столы, плиты, духовки. Не пересекаются с пшеничными блюдами.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Отдельная посуда</h3>
              <p className="text-muted-foreground">Ножи, доски, сковороды, противни — отдельные, с синей цветовой маркировкой.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Тестирование &lt;20 ppm</h3>
              <p className="text-muted-foreground">Целевая норма &lt;20 ppm gluten (соответствует Codex Alimentarius, GFCO, Coeliac UK). Регулярная проверка.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Поставщики</h3>
              <p className="text-muted-foreground">Верифицированные БГ-производители: миндальная мука Bob's Red Mill, рисовая мука ТМ Гарнец, БГ овсянка.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">⚠ Перекрёстное загрязнение глютеном</h3>
              <p className="text-muted-foreground">Приготовление в отдельной смене. Без пересечения с пшеничной мукой в воздухе. Отдельный фритюр.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">⚠ Перекрёстное загрязнение орехами</h3>
              <p className="text-muted-foreground">5 БГ-блюд используют миндальную муку + 1 БГ-напиток содержит кедровый орех (Кедровый раф). Для гостей с combined целиакия + анафилаксия на орехи — укажите в заявке, приготовим отдельное nut-free БГ-подмножество.</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            При заказе для целиакии: укажите в заявке — менеджер подтвердит протокол и пришлёт спецификацию БГ-блюд.
            Для combined целиакия + анафилаксия на орехи — укажите обе диеты, шеф подберёт nut-free БГ-меню.
          </p>
        </div>

        {/* Nut-free DEFAULT banner */}
        <div className="mb-8 p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50">
          <p className="text-sm font-semibold text-emerald-900 mb-2">✅ БГ-меню по умолчанию — nut-free (без орехов)</p>
          <p className="text-sm text-emerald-900 mb-2">
            Все блюда в основном БГ-меню ниже — на <strong>рисовой и овсяной муке</strong>, без миндальной муки и кедрового ореха.
            Безопасно для гостей с целиакией + анафилаксией на орехи.
          </p>
          <p className="text-sm text-emerald-900">
            БГ-блюда с миндальной мукой / кедровым орехом (5 шт.) вынесены в отдельный блок <strong>«Опция (содержит орехи)»</strong> внизу страницы — доступны только по явному запросу.
          </p>
        </div>

        {/* Десерты — DEFAULT nut-free */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-medium mb-2">🍰 БГ-десерты и выпечка (nut-free по умолчанию)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Безглютеновый торт на день рождения, БГ капкейки, БГ хлеб — на <strong>рисовой и овсяной муке</strong> (без орехов).
            Безопасно для гостей с целиакией + анафилаксией на орехи.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dessertsNutFree.map(dish => (
              <div key={dish.id} className="rounded-xl border-2 border-blue-200 bg-blue-50/50 p-4 hover:border-gold-text transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded font-semibold shrink-0">GF ✓ nut-free</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gold-text">{dish.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                  <span className="text-xs text-muted-foreground">&lt;20 ppm</span>
                </div>
                {dish.allergens.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dish.allergens.map(a => (
                      <span key={a} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{ALLERGEN_LABEL[a]}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Основные блюда — DEFAULT nut-free */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-medium mb-2">🥗 БГ-закуски и горячее (nut-free по умолчанию)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainsNutFree.map(dish => (
              <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold shrink-0">GF ✓ nut-free</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gold-text">{dish.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                </div>
                {dish.allergens.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dish.allergens.map(a => (
                      <span key={a} className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{ALLERGEN_LABEL[a]}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Напитки — DEFAULT nut-free */}
        {drinksNutFree.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-2xl font-medium mb-2">☕ БГ-напитки (nut-free по умолчанию)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {drinksNutFree.map(dish => (
                <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold shrink-0">GF ✓ nut-free</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gold-text">{dish.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Опция — блюда с миндальной мукой / кедровым орехом (НЕ для анафилаксии на орехи) */}
        {allWithNuts.length > 0 && (
          <div className="mb-10 p-5 rounded-xl border-2 border-amber-400 bg-amber-50">
            <h2 className="font-heading text-xl font-medium mb-2 text-amber-900">⚠ Опция: БГ-блюда с орехами (НЕ по умолчанию)</h2>
            <p className="text-sm text-amber-900 mb-4">
              Эти блюда <strong>безопасны для целиакии</strong> (&lt;20 ppm), но <strong>содержат миндальную муку или кедровый орех</strong>.
              Не заказывайте их при анафилаксии на орехи. По умолчанию БГ-меню состоит только из nut-free блюд выше.
              Эти блюда доступны только по явному запросу.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allWithNuts.map(dish => (
                <div key={dish.id} className="rounded-xl border border-amber-300 bg-white p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                    <span className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded font-semibold shrink-0">⚠ Орехи</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gold-text">{dish.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                    <span className="text-xs text-amber-700 font-medium">опция</span>
                  </div>
                  {dish.allergens.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {dish.allergens.map(a => (
                        <span key={a} className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">{ALLERGEN_LABEL[a]}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/10">
          <h2 className="font-heading text-lg font-medium mb-2">Заказать полностью БГ-меню</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Соберите БГ-меню в конструкторе с фильтром «без глютена» или позвоните — шеф-повар подберёт под ваш бюджет.
            Для целиакии — обязательное подтверждение протокола перед бронированием.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/plan/constructor?diet=gluten-free" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              ✨ Собрать БГ-меню
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/contact" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              ✍️ Заявка
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
