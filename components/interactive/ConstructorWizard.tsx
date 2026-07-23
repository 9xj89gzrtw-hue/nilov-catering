'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useConstructor } from '@/hooks/useConstructor';
import MenuBuilder from '@/components/interactive/MenuBuilder';
import { ALL_DISHES } from '@/lib/menu-data';
import type { Format, Tier } from '@/lib/types';

const TARIFFS: { format: Format; label: string; icon: string; desc: string; minGuests: number; prices: Record<Tier, number> }[] = [
  { format: 'furshet', label: 'Фуршет', icon: '🥪', desc: 'Стоячий приём, лёгкие закуски', minGuests: 20, prices: { economy: 2450, standard: 3450, premium: 4350, luxury: 5350 } },
  { format: 'banket', label: 'Банкет', icon: '🍽️', desc: 'Посадка за стол, официанты', minGuests: 15, prices: { economy: 4470, standard: 5470, premium: 5970, luxury: 6970 } },
  { format: 'coffee-break', label: 'Кофе-брейк', icon: '☕', desc: 'Кофе, выпечка, десерты', minGuests: 10, prices: { economy: 390, standard: 1450, premium: 1950, luxury: 2450 } },
  { format: 'detskoe', label: 'Детский', icon: '🎈', desc: 'Меню для детей, аниматор', minGuests: 10, prices: { economy: 1950, standard: 2450, premium: 2950, luxury: 3450 } },
  { format: 'chef-at-home', label: 'Шеф на дом', icon: '👨‍🍳', desc: 'Шеф готовит у вас', minGuests: 4, prices: { economy: 2500, standard: 4500, premium: 7500, luxury: 10000 } },
];

const TIER_ORDER: Tier[] = ['economy', 'standard', 'premium', 'luxury'];
const TIER_LABEL: Record<Tier, string> = { economy: 'Эконом', standard: 'Стандарт', premium: 'Расширенный', luxury: 'Максимальный' };
const QUICK_GUESTS = [10, 20, 30, 50, 100, 150, 200, 300, 500];

const STEPS = ['Формат', 'Гости', 'Тариф', 'Меню', 'Итог', 'Контакты', 'Готово'];

export default function ConstructorWizard() {
  const store = useConstructor();
  const [submitted, setSubmitted] = useState(false);

  // Hydrate from query string (?format=&tier=)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fmt = params.get('format') as Format | null;
    const tier = params.get('tier') as Tier | null;
    if (fmt && TARIFFS.some(t => t.format === fmt)) {
      store.setFormat(fmt);
      if (tier && TIER_ORDER.includes(tier)) {
        store.setTier(tier);
        store.setStep(3); // skip to menu step
      } else {
        store.setStep(2);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = store.currentStep;
  const tariff = store.format ? TARIFFS.find(t => t.format === store.format) : null;
  const canNext =
    step === 0 ? store.format !== null :
    step === 1 ? store.guestCount >= 10 :
    step === 2 ? (store.tierMode === 'custom' ? true : store.tier !== null) :
    step === 3 ? (store.tierMode === 'custom' ? store.selectedItems.length > 0 : true) :
    step === 4 ? true :
    step === 5 ? !!store.contact.name && !!store.contact.phone :
    true;

  const handleNext = () => { if (canNext) store.setStep(Math.min(step + 1, 6)); };
  const handlePrev = () => store.setStep(Math.max(step - 1, 0));

  // Total: для preset берём из store.total; для custom — то же (recalc учитывает)
  const total = store.total;
  const perGuest = store.perGuest;

  // Live price display
  const livePriceText = store.format && store.guestCount > 0 && store.tier && store._hasHydrated
    ? store.tierMode === 'custom'
      ? store.selectedItems.length > 0
        ? `${store.guestCount} гостей · ${store.selectedItems.length} блюд · ${total.toLocaleString('ru-RU')} ₽`
        : null
      : `${store.guestCount} гостей · ${tariff?.label} · ${TIER_LABEL[store.tier]} = ${total.toLocaleString('ru-RU')} ₽`
    : null;

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-6xl">
        <h1 className="mb-6 text-center">Конструктор меню</h1>

        {/* Progress */}
        <div className="flex gap-1 mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gold-text' : 'bg-muted'}`} />
              <span className={`text-[10px] hidden sm:block ${i === step ? 'text-gold-text font-semibold' : 'text-muted-foreground'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Live price */}
        {livePriceText && (
          <div className="mb-6 p-4 rounded-xl border border-gold-tint bg-gold-tint/50 text-center">
            <span className="text-lg font-bold text-gold-text">{livePriceText}</span>
          </div>
        )}

        {/* Hydration guard */}
        {!store._hasHydrated && (
          <div className="text-center py-8 text-muted-foreground text-sm">Загрузка конструктора…</div>
        )}

        {/* === Step 0: Format === */}
        {store._hasHydrated && step === 0 && (
          <div>
            <p className="text-muted-foreground mb-6 text-center">Выберите формат мероприятия</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
              {TARIFFS.map(t => (
                <button key={t.format} type="button"
                  onClick={() => store.setFormat(t.format)}
                  className={`rounded-xl border p-5 text-left transition-all ${store.format === t.format ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                  <span className="text-3xl mb-2 block">{t.icon}</span>
                  <h3 className="font-heading text-lg font-medium mb-1">{t.label}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                  <span className="text-xs text-gold-text font-semibold">от {t.minGuests} гостей</span>
                  <span className="text-xs text-muted-foreground block mt-1">от {t.prices.economy.toLocaleString('ru-RU')} ₽/гость</span>
                </button>
              ))}
            </div>
            <div className="text-center">
              <Link href="/plan/helper" className="text-sm text-muted-foreground hover:text-gold-text transition-colors">🤔 Не знаете, что выбрать? Подберём за 3 вопроса →</Link>
            </div>
          </div>
        )}

        {/* === Step 1: Guests === */}
        {store._hasHydrated && step === 1 && (
          <div className="max-w-lg mx-auto text-center">
            <p className="text-muted-foreground mb-4">Сколько гостей?</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button type="button" onClick={() => store.setGuestCount(Math.max(10, store.guestCount - 5))}
                className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-xl hover:border-gold-text">−</button>
              <div className="text-center">
                <span className="text-6xl font-heading text-gold-text">{store.guestCount}</span>
                <p className="text-muted-foreground mt-1">гостей</p>
              </div>
              <button type="button" onClick={() => store.setGuestCount(Math.min(500, store.guestCount + 5))}
                className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-xl hover:border-gold-text">+</button>
            </div>
            <input type="range" min={10} max={500} step={5} value={store.guestCount}
              onChange={e => store.setGuestCount(Number(e.target.value))}
              className="w-full mb-4 accent-gold-text" />
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {QUICK_GUESTS.map(n => (
                <button key={n} type="button" onClick={() => store.setGuestCount(n)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${store.guestCount === n ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'}`}>{n}</button>
              ))}
            </div>
          </div>
        )}

        {/* === Step 2: Tier === */}
        {store._hasHydrated && step === 2 && tariff && (
          <div className="max-w-lg mx-auto">
            <p className="text-muted-foreground mb-6 text-center">Выберите тариф</p>

            {/* Mode toggle */}
            <div className="flex gap-2 mb-5 p-1 bg-muted rounded-lg max-w-md mx-auto">
              <button
                onClick={() => store.setTierMode('preset')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${store.tierMode === 'preset' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Готовый тариф
              </button>
              <button
                onClick={() => store.setTierMode('custom')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${store.tierMode === 'custom' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                ⚡ Собрать самому
              </button>
            </div>

            {store.tierMode === 'preset' ? (
              <div className="space-y-3">
                {TIER_ORDER.map(t => {
                  const price = tariff.prices[t];
                  const isRec = t === 'standard';
                  return (
                    <button key={t} type="button" onClick={() => store.setTier(t)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${store.tier === t ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading text-lg font-medium">{TIER_LABEL[t]}</span>
                          {isRec && <span className="ml-2 text-xs bg-gold-text text-white px-2 py-0.5 rounded">Рекомендуем</span>}
                        </div>
                        <span className="text-gold-text font-semibold text-lg">{price.toLocaleString('ru-RU')} ₽/гость</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{store.guestCount} × {price.toLocaleString('ru-RU')} = {(store.guestCount * price).toLocaleString('ru-RU')} ₽</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-gold-tint bg-gold-tint/30 p-5 text-center">
                <p className="text-sm mb-1">⚡ Вы выбрали режим «Собрать самому»</p>
                <p className="text-xs text-muted-foreground">На следующем шаге вы сможете перетащить блюда из каталога в своё меню.</p>
              </div>
            )}
          </div>
        )}

        {/* === Step 3: Menu builder (NEW) === */}
        {store._hasHydrated && step === 3 && (
          <div>
            <div className="mb-4 text-center">
              <h2 className="font-heading text-xl mb-1">
                {store.tierMode === 'custom' ? '🍽️ Соберите своё меню' : '✨ Дополните меню'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {store.tierMode === 'custom'
                  ? 'Перетащите блюда из каталога в ваше меню. Цена пересчитывается автоматически.'
                  : 'Тариф выбран. По желанию добавьте дополнительные блюда к вашему заказу.'}
              </p>
            </div>

            <MenuBuilder
              selectedItems={store.selectedItems}
              onAdd={store.addDish}
              onRemove={store.removeDish}
              onSetQty={store.setItemQty}
              onReorder={store.reorderItems}
              formatFilter={store.format || undefined}
              catalogTitle="Каталог блюд"
              cartTitle="Ваше меню"
              emptyCartText="Перетащите блюда сюда или нажмите «+» на карточке"
              unit="на гостя"
              enableReorder
            />

            {/* Live calc summary */}
            {store.selectedItems.length > 0 && (
              <div className="mt-6 p-4 rounded-xl border border-gold-tint bg-gold-tint/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Позиций: {store.selectedItems.length}</p>
                  <p className="text-sm font-medium">Итого на {store.guestCount} гостей</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-heading font-bold text-gold-text tabular-nums">{total.toLocaleString('ru-RU')} ₽</p>
                  <p className="text-xs text-muted-foreground">{perGuest.toLocaleString('ru-RU')} ₽/гость</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* === Step 4: Summary === */}
        {store._hasHydrated && step === 4 && tariff && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-xl border border-line bg-card p-6 space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Формат</span><span className="font-medium">{tariff.label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Гости</span><span className="font-medium">{store.guestCount}</span></div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Тариф</span>
                <span className="font-medium">
                  {store.tierMode === 'custom' ? `Своё меню (${store.selectedItems.length} позиций)` : TIER_LABEL[store.tier!]}
                </span>
              </div>
              <hr className="border-line" />
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Стоимость</span><span className="font-medium">{total.toLocaleString('ru-RU')} ₽</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Доставка</span><span className="font-medium">в пределах КАД бесплатно</span></div>
              {store.savings > 0 && (
                <div className="flex justify-between text-sm text-success"><span className="text-muted-foreground">Скидка</span><span>−{store.savings.toLocaleString('ru-RU')} ₽</span></div>
              )}
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-line">
                <span>Итого</span><span className="text-gold-text text-xl">{total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            {/* Selected dishes preview */}
            {store.selectedItems.length > 0 && (
              <div className="rounded-xl border border-line bg-card/50 p-4 mb-6">
                <h3 className="text-sm font-medium mb-2">Состав вашего меню:</h3>
                <ul className="text-xs text-muted-foreground space-y-1 max-h-40 overflow-y-auto">
                  {store.selectedItems.map(item => {
                    const dish = ALL_DISHES.find(d => d.id === item.dishId);
                    if (!dish) return null;
                    return (
                      <li key={item.dishId} className="flex justify-between">
                        <span>{dish.name} × {item.qty}</span>
                        <span className="tabular-nums">{(dish.pricePerGuest * item.qty).toLocaleString('ru-RU')} ₽</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <p className="text-xs text-muted-foreground text-center mb-4">Для точной сметы с персоналом, посудой и доп. услугами — отправьте заявку.</p>
          </div>
        )}

        {/* === Step 5: Contact === */}
        {store._hasHydrated && step === 5 && (
          <div className="max-w-md mx-auto">
            {submitted ? (
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">✅</span>
                <h2 className="text-xl font-heading font-medium mb-2">Заявка отправлена!</h2>
                <p className="text-muted-foreground mb-4">Менеджер перезвонит в течение 15 минут.</p>
                <Link href="/" className="text-gold-text font-semibold hover:underline text-sm">На главную →</Link>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-heading font-medium mb-4 text-center">Контакты</h2>
                <div className="space-y-4 mb-6">
                  <input type="text" placeholder="Ваше имя *" value={store.contact.name} onChange={e => store.setContact({ name: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <input type="tel" placeholder="+7 (___) ___-__-__ *" value={store.contact.phone} onChange={e => store.setContact({ phone: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <input type="date" value={store.contact.date} onChange={e => store.setContact({ date: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <textarea placeholder="Комментарий (необязательно)" value={store.contact.comment} onChange={e => store.setContact({ comment: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text min-h-[80px] resize-none" />
                </div>
              </>
            )}
          </div>
        )}

        {/* === Step 6: Done === */}
        {store._hasHydrated && step === 6 && (
          <div className="text-center py-8">
            <span className="text-5xl block mb-4">🎉</span>
            <h2 className="text-xl font-heading font-medium mb-2">Заявка принята!</h2>
            <p className="text-muted-foreground mb-6">Менеджер свяжется с вами в ближайшее время для уточнения деталей.</p>
            <Link href="/pricing" className="text-gold-text font-semibold hover:underline">Посмотреть тарифы →</Link>
          </div>
        )}

        {/* Navigation */}
        {store._hasHydrated && step < 6 && (
          <div className="flex justify-between mt-8 max-w-lg mx-auto">
            {step > 0 ? (
              <button type="button" onClick={handlePrev} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>
            ) : <div />}
            {step < 5 ? (
              <button type="button" onClick={handleNext} disabled={!canNext}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                {step === 4 ? 'Отправить заявку' : 'Далее'}
              </button>
            ) : step === 5 && !submitted ? (
              <button type="button" onClick={() => setSubmitted(true)} disabled={!canNext}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                Отправить
              </button>
            ) : step === 5 && submitted ? (
              <button type="button" onClick={() => store.setStep(6)}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                Продолжить
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
