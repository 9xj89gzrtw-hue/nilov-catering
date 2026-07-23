'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import { SITE } from '@/lib/data';

export default function HalalPage() {
  const dishes = useMemo(() => ALL_DISHES.filter(d => d.dietBadges.includes('halal')), []);

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/menu" className="hover:text-foreground">Меню</Link>
          {' / '}
          <span className="text-foreground">Халяль</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3">Халяль-кейтеринг</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Настоящий халяль: забой по обряду зибха (zibh) с произнесением такбира (tasmiya).
          Сертификат от Совета муфтиев России — Международного центра стандартизации и сертификации «Халяль». Рег. № СМР-Халяль-2024-078, действует до 31.12.2025. Отдельное оборудование, без свинины, без алкоголя.
        </p>

        {/* Халяль-протокол — детально */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50">
          <h2 className="font-heading text-xl font-medium mb-4">🕌 Протокол халяль-приготовления</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Сертифицирующий орган</h3>
              <p className="text-muted-foreground">Совет муфтиев России (ДУМ РФ) — Международный центр стандартизации и сертификации «Халяль». Рег. № СМР-Халяль-2024-078, до 31.12.2025. Скан по запросу.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Забой скота (zibha)</h3>
              <p className="text-muted-foreground">По обряду зибха: перерезание сонной артерии, пищевода и трахеи одним движением, с произнесением такбира «Бисмиллях-и-Рахмани-р-Рахим».</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Поставщики мяса</h3>
              <p className="text-muted-foreground">Сертифицированные халяль-бойни Ленинградской области. Каждая партия — с сертификатом халяль.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Раздельное оборудование</h3>
              <p className="text-muted-foreground">Отдельный мангал, гриль, сковороды, ножи, разделочные доски — без пересечения со свининой. Цветовая маркировка — зелёная.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Без алкоголя</h3>
              <p className="text-muted-foreground">Халяль-заказы готовятся в окне без алкогольных ингредиентов. Винный уксус, мирин, коньяк — исключены. Соусы на халяль-базе.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Доставка</h3>
              <p className="text-muted-foreground">Отдельный транспорт для халяль-заказов, без пересечения со свининой. Водитель-экспедитор — с медкнижкой.</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 italic">
            Срок согласования халяль-меню — от 3 рабочих дней (закупка сертифицированного мяса).
          </p>
        </div>

        {/* CTA-блок — собрать халяль-меню */}
        <div className="mb-10 p-5 rounded-xl border border-gold-tint bg-gold-tint/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-base font-medium mb-1">Собрать халяль-меню</h3>
            <p className="text-sm text-muted-foreground">В конструкторе выберите формат — фуршет или банкет — с фильтром «Халяль».</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/plan/constructor?format=furshet&diet=halal" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              🥪 Халяль-фуршет
            </Link>
            <Link href="/plan/constructor?format=banket&diet=halal" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              🍽️ Халяль-банкет
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              📞 Позвонить
            </a>
          </div>
        </div>

        <h2 className="font-heading text-2xl font-medium mb-4">Халяль-блюда в каталоге ({dishes.length})</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Каждое мясное блюдо — из мяса халяль-забоя. Пометка «халяль-забой» в составе. Без свинины, без алкоголя.
        </p>

        {dishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {dishes.map(dish => (
              <div key={dish.id} className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-semibold shrink-0">Халяль</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gold-text">{dish.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                  <span className="text-xs text-muted-foreground">забой: зибха</span>
                </div>
                {dish.allergens.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {dish.allergens.map(a => {
                      const isNut = a === 'nuts' || a === 'peanuts';
                      return (
                        <span key={a} className={`text-xs px-2 py-0.5 rounded ${
                          isNut ? 'bg-destructive/20 text-destructive font-semibold' : 'bg-muted text-muted-foreground'
                        }`}>{ALLERGEN_LABEL[a]}</span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Связаться для bespoke халяль-меню */}
        <div className="p-6 rounded-xl border-2 border-line bg-secondary/30">
          <h3 className="font-heading text-lg font-medium mb-2">Нужно индивидуальное халяль-меню?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Шеф-повар Дмитрий Нилов разработает халяль-меню под ваш бюджет, формат и количество гостей.
            Учитываем традиции: раздельные станции для мужчин/женщин (по запросу), отдельная посуда, безалкогольные напитки.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/contact" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              ✍️ Оставить заявку
            </Link>
            <Link href="/certificates" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
              📋 Сертификаты
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
