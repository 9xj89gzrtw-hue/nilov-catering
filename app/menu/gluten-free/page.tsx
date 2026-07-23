'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import { SITE } from '@/lib/data';

export default function GlutenFreePage() {
  const dishes = useMemo(() => ALL_DISHES.filter(d => d.dietBadges.includes('gluten-free')), []);
  const desserts = dishes.filter(d => d.station === 'desserts');
  const mains = dishes.filter(d => d.station === 'hot' || d.station === 'cold');
  const drinks = dishes.filter(d => d.station === 'drinks');

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
              <h3 className="font-semibold mb-1">Перекрёстное загрязнение глютеном</h3>
              <p className="text-muted-foreground">Приготовление в отдельной смене. Без пересечения с пшеничной мукой в воздухе. Отдельный фритюр.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">⚠ Перекрёстное загрязнение орехами</h3>
              <p className="text-muted-foreground">5 БГ-блюд используют миндальную/кедровую муку. Для гостей с combined целиакия + анафилаксия на орехи — укажите в заявке, приготовим отдельное nut-free БГ-подмножество.</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            При заказе для целиакии: укажите в заявке — менеджер подтвердит протокол и пришлёт спецификацию БГ-блюд.
            Для combined целиакия + анафилаксия на орехи — укажите обе диеты, шеф подберёт nut-free БГ-меню.
          </p>
        </div>

        {/* Nut-free warning для БГ + nut-anaphylaxis */}
        <div className="mb-8 p-4 rounded-xl border-2 border-amber-300 bg-amber-50">
          <p className="text-sm font-semibold text-amber-900 mb-2">⚠ Внимание: БГ-меню и орехи</p>
          <p className="text-sm text-amber-900 mb-2">
            5 блюд в БГ-меню используют <strong>миндальную муку</strong> (БГ шоколадный торт, БГ капкейки, БГ пицца, БГ тарт, БГ хлеб)
            и 1 блюдо содержит <strong>кедровый орех</strong> (Кедровый раф). Эти блюда:
          </p>
          <ul className="text-sm text-amber-900 space-y-1 mb-2 ml-4 list-disc">
            <li>✓ Безопасны для гостей с целиакией (celiac-safe, &lt;20 ppm)</li>
            <li>✗ <strong>НЕ безопасны</strong> для гостей с анафилаксией на орехи (миндаль/кедровый)</li>
            <li>✗ Промаркированы значком ⚠ Орехи</li>
          </ul>
          <p className="text-sm text-amber-900">
            <strong>Для combined целиакия + анафилаксия на орехи</strong> — укажите обе диеты в заявке.
            Шеф подготовит nut-free БГ-подмножество (на рисовой/овсяной/подсолнечной муке).
          </p>
        </div>

        {/* Десерты — выделены отдельно (торт, хлеб, капкейки) */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-medium mb-2">🍰 БГ-десерты и выпечка</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Безглютеновый торт на день рождения, БГ капкейки, БГ хлеб, БГ пицца, БГ панкейки — для ребёнка с целиакией.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {desserts.map(dish => (
              <div key={dish.id} className="rounded-xl border-2 border-blue-200 bg-blue-50/50 p-4 hover:border-gold-text transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded font-semibold shrink-0">GF</span>
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

        {/* Основные блюда */}
        <div className="mb-10">
          <h2 className="font-heading text-2xl font-medium mb-2">🥗 БГ-закуски и горячее</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mains.map(dish => (
              <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold shrink-0">GF</span>
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

        {/* Напитки */}
        {drinks.length > 0 && (
          <div className="mb-10">
            <h2 className="font-heading text-2xl font-medium mb-2">☕ БГ-напитки</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {drinks.map(dish => (
                <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-semibold shrink-0">GF</span>
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
