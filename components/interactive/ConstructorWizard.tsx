'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useConstructor } from '@/hooks/useConstructor';
import MenuBuilder from '@/components/interactive/MenuBuilder';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALL_TARIFF_OFFERS, getPricesForFormat, FORMAT_TO_EVENT } from '@/lib/tariff-offers';
import { ALLERGEN_LABEL } from '@/lib/types';
import type { Format, Tier, Allergen } from '@/lib/types';

// Метаданные форматов — только UI (icon, label, desc). Цены берутся из getPricesForFormat.
const TARIFF_META: { format: Format; label: string; icon: string; desc: string }[] = [
  { format: 'furshet', label: 'Фуршет', icon: '🥪', desc: 'Стоячий приём, лёгкие закуски' },
  { format: 'banket', label: 'Банкет', icon: '🍽️', desc: 'Посадка за стол, официанты' },
  { format: 'coffee-break', label: 'Кофе-брейк', icon: '☕', desc: 'Кофе, выпечка, десерты' },
  { format: 'detskoe', label: 'Детский', icon: '🎈', desc: 'Меню для детей, аниматор' },
  { format: 'chef-at-home', label: 'Шеф на дом', icon: '👨‍🍳', desc: 'Шеф готовит у вас' },
];

const TIER_ORDER: Tier[] = ['economy', 'standard', 'premium', 'luxury'];
const TIER_LABEL: Record<Tier, string> = { economy: 'Эконом', standard: 'Стандарт', premium: 'Расширенный', luxury: 'Максимальный' };
const QUICK_GUESTS = [10, 15, 20, 30, 50, 80, 100, 150, 200, 300, 500];

const STEPS = ['Формат', 'Гости', 'Тариф', 'Меню', 'Контакты', 'Готово'];

const EVENT_TO_FORMAT: Record<string, Format> = {
  svadba: 'banket',
  korporativ: 'banket',
  vypusknoy: 'banket',
  chastnoe: 'furshet',
  detskoe: 'detskoe',
  'chef-at-home': 'chef-at-home',
  'coffee-break': 'coffee-break',
  furshet: 'furshet',
  banket: 'banket',
};

export default function ConstructorWizard() {
  const store = useConstructor();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);

    const eventParam = params.get('event') as string | null;
    const formatParam = params.get('format') as string | null;
    const tierParam = params.get('tier') as Tier | null;
    const guestsParam = params.get('guests');
    const customItemsJson = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('tariffCustomItems') : null;

    let resolvedFormat: Format | null = null;
    if (formatParam && TARIFF_META.some(t => t.format === formatParam)) {
      resolvedFormat = formatParam as Format;
    } else if (eventParam && EVENT_TO_FORMAT[eventParam]) {
      resolvedFormat = EVENT_TO_FORMAT[eventParam];
    }

    if (resolvedFormat) {
      store.setFormat(resolvedFormat);
      if (guestsParam) {
        const g = parseInt(guestsParam, 10);
        if (!isNaN(g) && g >= 10) store.setGuestCount(g);
      }
      if (tierParam && TIER_ORDER.includes(tierParam)) {
        store.setTier(tierParam);
        store.setTierMode('preset');

        if (customItemsJson) {
          try {
            const customItems = JSON.parse(customItemsJson);
            store.clearItems();
            for (const item of customItems) {
              if (ALL_DISHES.find(d => d.id === item.dishId)) {
                store.addDish(item.dishId);
                if (item.qty > 1) store.setItemQty(item.dishId, item.qty);
              }
            }
            sessionStorage.removeItem('tariffCustomItems');
          } catch {
            // ignore
          }
        } else {
          const eventId = FORMAT_TO_EVENT[resolvedFormat];
          const offers = ALL_TARIFF_OFFERS[eventId] || [];
          const offer = offers.find(o => o.tier === tierParam);
          if (offer) {
            store.clearItems();
            for (const item of offer.composition) {
              if (ALL_DISHES.find(d => d.id === item.dishId)) {
                store.addDish(item.dishId);
              }
            }
          }
        }
        // Если guests передан — сразу к меню (step 3). Иначе — к выбору гостей (step 1).
        store.setStep(guestsParam ? 3 : 1);
      } else {
        // Если передан только format (без tier) — на шаг гостей (step 1)
        store.setStep(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = store.currentStep;
  const formatMeta = store.format ? TARIFF_META.find(t => t.format === store.format) : null;
  const prices = store.format ? getPricesForFormat(store.format) : [];

  const canNext =
    step === 0 ? store.format !== null :
    step === 1 ? store.guestCount >= 10 :
    step === 2 ? (store.tierMode === 'custom' ? true : store.tier !== null) :
    step === 3 ? (store.tierMode === 'custom' ? store.selectedItems.length > 0 : true) :
    step === 4 ? !!store.contact.name && !!store.contact.phone :
    true;

  const handleNext = () => { if (canNext) store.setStep(Math.min(step + 1, 5)); };
  const handlePrev = () => store.setStep(Math.max(step - 1, 0));

  const total = store.total;
  const perGuest = store.perGuest;

  const livePriceText = store.format && store.guestCount > 0 && store._hasHydrated
    ? store.tierMode === 'custom'
      ? store.selectedItems.length > 0
        ? `${store.guestCount} гостей · ${store.selectedItems.length} блюд · ${total.toLocaleString('ru-RU')} ₽`
        : null
      : store.tier
      ? `${store.guestCount} гостей · ${formatMeta?.label} · ${TIER_LABEL[store.tier]} = ${total.toLocaleString('ru-RU')} ₽`
      : null
    : null;

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-6xl">
        <h1 className="mb-6 text-center">Конструктор меню</h1>

        <div className="flex gap-1 mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gold-text' : 'bg-muted'}`} />
              <span className={`text-[10px] hidden sm:block ${i === step ? 'text-gold-text font-semibold' : 'text-muted-foreground'}`}>{label}</span>
            </div>
          ))}
        </div>

        {livePriceText && (
          <div className="mb-6 p-4 rounded-xl border border-gold-tint bg-gold-tint/50 text-center">
            <span className="text-lg font-bold text-gold-text">{livePriceText}</span>
          </div>
        )}

        {!store._hasHydrated && (
          <div className="space-y-4">
            <div className="h-12 bg-muted/50 rounded-lg animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-muted/50 rounded-xl animate-pulse" />)}
            </div>
          </div>
        )}

        {store._hasHydrated && step === 0 && (
          <div>
            <p className="text-muted-foreground mb-6 text-center">Выберите формат мероприятия</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
              {TARIFF_META.map(t => {
                const fmtPrices = getPricesForFormat(t.format);
                const minPrice = Math.min(...fmtPrices.map(p => p.pricePerGuest));
                const minGuests = Math.min(...fmtPrices.map(p => p.minGuests));
                return (
                  <button key={t.format} type="button"
                    onClick={() => store.setFormat(t.format)}
                    className={`rounded-xl border p-5 text-left transition-all ${store.format === t.format ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                    <span className="text-3xl mb-2 block">{t.icon}</span>
                    <h3 className="font-heading text-lg font-medium mb-1">{t.label}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                    <span className="text-xs text-gold-text font-semibold">от {minGuests} гостей</span>
                    <span className="text-xs text-muted-foreground block mt-1">от {minPrice.toLocaleString('ru-RU')} ₽/гость</span>
                  </button>
                );
              })}
            </div>
            <div className="text-center">
              <Link href="/plan/helper" className="text-sm text-muted-foreground hover:text-gold-text transition-colors">🤔 Не знаете, что выбрать? Подберём за 3 вопроса →</Link>
            </div>
          </div>
        )}

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

        {store._hasHydrated && step === 2 && formatMeta && (
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6 text-center">Выберите тариф или режим</p>

            <div className="flex gap-2 mb-5 p-1 bg-muted rounded-lg max-w-md mx-auto">
              <button
                onClick={() => store.setTierMode('preset')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${store.tierMode === 'preset' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                Готовый тариф
              </button>
              <button
                onClick={() => { store.setTierMode('custom'); store.setTier(null); store.clearItems(); }}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${store.tierMode === 'custom' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                ⚡ Собрать самому
              </button>
            </div>

            {store.tierMode === 'preset' ? (
              <div className="space-y-3">
                {TIER_ORDER.map(t => {
                  const priceTier = prices.find(p => p.tier === t);
                  if (!priceTier || priceTier.pricePerGuest === 0) return null;
                  const isRec = t === 'standard';
                  return (
                    <button key={t} type="button" onClick={() => store.setTier(t)}
                      className={`w-full rounded-xl border p-4 text-left transition-all ${store.tier === t ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-heading text-lg font-medium">{TIER_LABEL[t]}</span>
                          {isRec && <span className="ml-2 text-xs bg-gold-text text-white px-2 py-0.5 rounded">Рекомендуем</span>}
                        </div>
                        <span className="text-gold-text font-semibold text-lg">{priceTier.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{store.guestCount} × {priceTier.pricePerGuest.toLocaleString('ru-RU')} = {(store.guestCount * priceTier.pricePerGuest).toLocaleString('ru-RU')} ₽</p>
                      <p className="text-[10px] text-muted-foreground mt-1">После выбора тарифа вы сможете убрать/заменить блюда на следующем шаге.</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-gold-tint bg-gold-tint/30 p-5 text-center">
                <p className="text-sm mb-1 font-medium">⚡ Режим «Собрать самому»</p>
                <p className="text-xs text-muted-foreground mb-2">На следующем шаге выберите блюда из каталога. Подходит для особых диет (веган, без глютена) и если стандартный тариф не подходит.</p>
                <p className="text-[10px] text-muted-foreground">💡 Цена = Σ(цена блюда × кол-во) × гости. Можно исключить аллергены фильтром.</p>
                <p className="text-[10px] text-muted-foreground mt-1">📞 Для смешанных групп гостей (например, 10 веганов + 8 халяль + 12 всеядных) — оставьте заявку, менеджер поможет разделить меню.</p>
              </div>
            )}
          </div>
        )}

        {store._hasHydrated && step === 3 && (
          <div>
            <div className="mb-4 text-center">
              <h2 className="font-heading text-xl mb-1">
                {store.tierMode === 'custom'
                  ? '🍽️ Соберите своё меню'
                  : '✏️ Настройте меню тарифа'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {store.tierMode === 'custom'
                  ? 'Перетащите блюда из каталога в ваше меню. Цена пересчитывается автоматически.'
                  : 'Состав тарифа загружен. Можно убрать блюда, заменить, добавить. Цена пересчитывается автоматически.'}
              </p>
            </div>

            <MenuBuilder
              selectedItems={store.selectedItems}
              onAdd={store.addDish}
              onRemove={store.removeDish}
              onSetQty={store.setItemQty}
              onReorder={store.reorderItems}
              excludedAllergens={new Set(store.excludedAllergens as Allergen[])}
              onExcludedAllergensChange={(next) => store.setExcludedAllergens([...next])}
              formatFilter={store.format || undefined}
              catalogTitle="Каталог блюд"
              cartTitle="Ваше меню"
              emptyCartText="Нажмите «+ Добавить» на блюде или перетащите его сюда"
              unit="на гостя"
              enableReorder
              enableHybridMode
            />

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

        {store._hasHydrated && step === 4 && formatMeta && (
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-xl mb-4 text-center">Итог и контакты</h2>

            <div className="rounded-xl border border-line bg-card p-6 space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Формат</span><span className="font-medium">{formatMeta.label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Гости</span><span className="font-medium">{store.guestCount}</span></div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Тариф</span>
                <span className="font-medium">
                  {store.tierMode === 'custom' ? `Своё меню (${store.selectedItems.length} позиций)` : TIER_LABEL[store.tier!]}
                </span>
              </div>
              <hr className="border-line" />
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Стоимость еды</span><span className="font-medium">{store.base.toLocaleString('ru-RU')} ₽</span></div>
              {store.service > 0 && (
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Персонал + посуда</span><span className="font-medium">{store.service.toLocaleString('ru-RU')} ₽ <span className="text-[10px] text-muted-foreground">(включено)</span></span></div>
              )}
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Доставка по КАД</span><span className="font-medium text-success">бесплатно</span></div>
              {store.savings > 0 && (
                <div className="flex justify-between text-sm text-success"><span className="text-muted-foreground">Скидка</span><span>−{store.savings.toLocaleString('ru-RU')} ₽</span></div>
              )}
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-line">
                <span>Итого</span><span className="text-gold-text text-xl">{total.toLocaleString('ru-RU')} ₽</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center bg-success/5 rounded p-2">
                ✓ Это финальная сумма. Доплат за персонал, посуду и доставку по КАД не будет.
              </p>
            </div>

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

            {/* Excluded allergens — передаются в заявку менеджеру */}
            {store.excludedAllergens.length > 0 && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 mb-6">
                <h3 className="text-sm font-medium mb-2">⚠ Исключённые аллергены (передаётся менеджеру):</h3>
                <div className="flex flex-wrap gap-1.5">
                  {store.excludedAllergens.map(a => (
                    <span key={a} className="text-xs bg-destructive text-white px-2 py-0.5 rounded-full font-semibold">
                      {ALLERGEN_LABEL[a as Allergen] || a}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Менеджер подтвердит по телефону, что в заказе нет блюд с этими аллергенами.
                </p>
              </div>
            )}

            <div className="rounded-xl border border-line bg-card p-5 space-y-4 mb-6">
              <h3 className="text-sm font-medium">Контакты для заявки</h3>
              <input type="text" placeholder="Ваше имя *" value={store.contact.name} onChange={e => store.setContact({ name: e.target.value })}
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
              <input type="tel" placeholder="+7 (___) ___-__-__ *" value={store.contact.phone} onChange={e => store.setContact({ phone: e.target.value })}
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
              <input type="date" value={store.contact.date} onChange={e => store.setContact({ date: e.target.value })}
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
              <textarea placeholder="Аллергии гостей, особые пожелания, комментарий…" value={store.contact.comment} onChange={e => store.setContact({ comment: e.target.value })}
                className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text min-h-[80px] resize-none" />
            </div>
          </div>
        )}

        {store._hasHydrated && step === 5 && (
          <div className="text-center py-8">
            <span className="text-5xl block mb-4">🎉</span>
            <h2 className="text-xl font-heading font-medium mb-2">Заявка принята!</h2>
            <p className="text-muted-foreground mb-6">Менеджер свяжется с вами в течение 15 минут для уточнения деталей и финальной проверки аллергенов.</p>
            <div className="flex flex-col gap-2 max-w-xs mx-auto">
              <Link href="/" className="text-gold-text font-semibold hover:underline text-sm">На главную →</Link>
              <Link href="/pricing" className="text-xs text-muted-foreground hover:text-foreground">Посмотреть тарифы →</Link>
            </div>
          </div>
        )}

        {store._hasHydrated && step < 5 && (
          <div className="flex justify-between mt-8 max-w-2xl mx-auto">
            {step > 0 ? (
              <button type="button" onClick={handlePrev} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>
            ) : <div />}
            {step < 4 ? (
              <button type="button" onClick={handleNext} disabled={!canNext}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                Далее
              </button>
            ) : step === 4 ? (
              <button type="button"
                onClick={() => {
                  // Merge excludedAllergens в comment — чтобы менеджер точно увидел
                  if (store.excludedAllergens.length > 0) {
                    const allergensList = store.excludedAllergens
                      .map(a => ALLERGEN_LABEL[a as Allergen] || a)
                      .join(', ');
                    const existingComment = store.contact.comment || '';
                    const allergenLine = `[АВТО] Исключённые аллергены: ${allergensList}`;
                    if (!existingComment.includes('[АВТО]')) {
                      store.setContact({ comment: existingComment ? `${allergenLine}\n\n${existingComment}` : allergenLine });
                    }
                  }
                  setSubmitted(true);
                  store.setStep(5);
                }}
                disabled={!canNext}
                className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                Отправить заявку
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
