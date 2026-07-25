'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALLERGEN_LABEL } from '@/lib/types';
import { SITE } from '@/lib/data';
import FoodPhoto from '@/components/common/FoodPhoto';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';

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
        <p className="text-lg text-muted-foreground mb-3">
          Настоящий халяль: забой по обряду зибха (zibh) с произнесением такбира (tasmiya).
          Сертификат от Совета муфтиев России — Международного центра стандартизации и сертификации «Халяль». Рег. № СМР-Халяль-2026-142, действует до 31.12.2026. Отдельное оборудование, без свинины, без алкоголя.
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          📜 Проверить подлинность сертификата: {' '}
          <a href="https://halalrf.ru" target="_blank" rel="noopener noreferrer" className="text-gold-text font-semibold underline">
            реестр МЦСС «Халяль» (halalrf.ru) →
          </a>
          {' · '}
          <Link href="/certificates" className="text-gold-text font-semibold underline">скан PDF на странице сертификатов →</Link>
        </p>

        {/* Ифтар / Рамадан блок */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-amber-300 bg-amber-50">
          <h2 className="font-heading text-xl font-medium mb-3">🌙 Рамадан и ифтар — меню разговения</h2>
          <p className="text-sm text-amber-900 mb-3">
            В месяц Рамадан организуем ифтары (разговение после заката солнца) для коллективов и семей.
            Подача синхронизирована с временем магриба — готовое меню доставляем за 30 минут до захода.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-amber-900 mb-1">📅 Традиционное начало</p>
              <p className="text-xs text-amber-800">Финики (3 шт./гость) + вода + молоко — открывают пост по сунне Пророка ﷺ.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-amber-900 mb-1">🍲 Суп (чорба / харис)</p>
              <p className="text-xs text-amber-800">Горячий суп после фиников — баранья чорба или пшеничная харис.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-amber-900 mb-1">🍖 Основное + салаты</p>
              <p className="text-xs text-amber-800">Халяль-шашлык, плов, фаттуш, табуле, хумус — на выбор.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-amber-900 mb-1">🍯 Десерт (чак-чак)</p>
              <p className="text-xs text-amber-800">Татарский чак-чак или пахлава с чаем из трав.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-amber-900 mb-1">🚚 Логистика магриба</p>
              <p className="text-xs text-amber-800">Доставка с учётом точного времени заката. Менеджер уточнит время за день до ифтара.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-amber-900 mb-1">👥 Минимум — 10 чел</p>
              <p className="text-xs text-amber-800">Ифтар-пакет от 1 800 ₽/гость. Для коллектива 30+ — скидка 10%.</p>
            </div>
          </div>
          <p className="text-xs text-amber-800 mt-3">
            <Link href="/contact?eventType=Ифтар+%2F+Рамадан+%28халяль%29&format=Ифтар&guests=30" className="font-semibold underline">Заказать ифтар →</Link>
            {' · '}
            <Link href="/plan/constructor?format=furshet&diet=halal" className="font-semibold underline">Собрать халяль-меню в конструкторе →</Link>
          </p>
        </div>

        {/* Никах блок */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-emerald-300 bg-emerald-50">
          <h2 className="font-heading text-xl font-medium mb-3">💍 Никах — исламская свадебная церемония</h2>
          <p className="text-sm text-emerald-900 mb-3">
            Организуем помолвку и никах с учётом исламских традиций: без алкоголя, без свинины,
            раздельные станции для мужчин и женщин (по запросу), традиционные блюда.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-emerald-900 mb-1">🍽️ Меню никаха</p>
              <p className="text-xs text-emerald-800">Плов, манты, чебуреки, самса, халяль-шашлык, чак-чак, пахлава, чайная церемония.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-emerald-900 mb-1">🚫 Без алкоголя и свинины</p>
              <p className="text-xs text-emerald-800">Полный бар — безалкогольный: морсы, лимонады, чай, mocktails. Винный уксус, мирин, коньяк, <strong>ванильный экстракт (35% алк.)</strong>, ром в пропитке тортов — исключены. Заменяем на ванильный порошок/пасту.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-emerald-900 mb-1">💰 Цена никаха</p>
              <p className="text-xs text-emerald-800">От <strong>4 500 ₽/гость</strong> (минимум 30 гостей). Включает: меню из 8 блюд, безалкогольный бар, сервировка, официанты. Подробности и индивидуальный расчёт — у менеджера.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-emerald-900 mb-1">👥 Раздельный зал</p>
              <p className="text-xs text-emerald-800">По запросу — раздельные станции для мужчин и женщин, перегородка, женский зал с женским персоналом.</p>
            </div>
            <div className="p-3 rounded-lg bg-white/60">
              <p className="font-semibold text-emerald-900 mb-1">📜 Сертификат СМР</p>
              <p className="text-xs text-emerald-800">Предоставляем копию сертификата Совета муфтиев России на подписанный договор.</p>
            </div>
          </div>
          <p className="text-xs text-emerald-800 mt-3">
            <Link href="/contact?eventType=Никах+%28халяль%29&format=Банкет&guests=50" className="font-semibold underline">Заказать никах →</Link>
            {' · '}
            <Link href="/events/svadba" className="font-semibold underline">Свадебный кейтеринг (общая страница) →</Link>
          </p>
        </div>

        {/* Халяль-протокол — детально */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50">
          <h2 className="font-heading text-xl font-medium mb-4">🕌 Протокол халяль-приготовления</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-1">Сертифицирующий орган</h3>
              <p className="text-muted-foreground">Совет муфтиев России (ДУМ РФ) — Международный центр стандартизации и сертификации «Халяль». Рег. № СМР-Халяль-2026-142, до 31.12.2026. Скан по запросу.</p>
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
              <p className="text-muted-foreground">Халяль-заказы готовятся в окне без алкогольных ингредиентов. Винный уксус, мирин, коньяк, <strong>ванильный экстракт (35% алк.)</strong>, ром в пропитке тортов — исключены. Заменяем на ванильный порошок/пасту. Соусы на халяль-базе.</p>
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
          Каждое мясное блюдо — из мяса халяль-забоя по обряду зибха. Веганские блюда (хумус, фаттуш, табуле)
          помечены «веган» — они не содержат мяса, забой не требуется. Без свинины, без алкоголя.
        </p>

        {dishes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {dishes.map(dish => {
              const isVegan = dish.dietBadges.includes('vegan');
              const isMeat = !isVegan; // For halal dishes: vegan = no meat, others = meat from zibha
              return (
                <div key={dish.id} className="rounded-xl border border-line bg-card overflow-hidden hover:border-gold-text transition-colors">
                  <div className="aspect-[4/3] relative overflow-hidden bg-secondary">
                    <FoodPhoto
                      src={getDishImage(dish.id, dish.station)}
                      alt={dish.name}
                      aspectRatio="wide"
                      objectPosition={getObjectPositionForDish(dish.id, dish.station)}
                      className="w-full h-full"
                    />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">H Халяль</span>
                      {isVegan && <span className="text-[10px] bg-emerald-700 text-white px-1.5 py-0.5 rounded font-bold">VG Веган</span>}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading text-base font-medium pr-2">{dish.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gold-text">{dish.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                      <span className="text-xs text-muted-foreground" title={isMeat ? 'Забой по обряду зибха с такбиром' : 'Веганское блюдо — забой не требуется'}>
                        {isMeat ? '🗡️ забой: зибха' : '🌱 веган'}
                      </span>
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
                </div>
              );
            })}
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
