'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useConstructor } from '@/hooks/useConstructor';
import type { GuestGroup } from '@/hooks/useConstructor';
import MenuBuilder from '@/components/interactive/MenuBuilder';
import ShareButton from '@/components/common/ShareButton';
import FoodPhoto from '@/components/common/FoodPhoto';
import { ALL_DISHES } from '@/lib/menu-data';
import { ALL_TARIFF_OFFERS, getPricesForFormat, FORMAT_TO_EVENT } from '@/lib/tariff-offers';
import { ALLERGEN_LABEL } from '@/lib/types';
import type { Format, Tier, Allergen } from '@/lib/types';

// Метаданные форматов — только UI (icon, label, desc, img). Цены берутся из getPricesForFormat.
const TARIFF_META: { format: Format; label: string; icon: string; desc: string; img: string }[] = [
  { format: 'furshet', label: 'Фуршет', icon: '', desc: 'Стоячий приём, лёгкие закуски. Для дней рождения и корпоративов', img: '/images/menu/kanape/k1.jpg' },
  { format: 'banket', label: 'Банкет', icon: '', desc: 'Посадка за стол, официанты. Для свадеб и юбилеев', img: '/images/real/beef-medallions.jpg' },
  { format: 'coffee-break', label: 'Кофе-брейк', icon: '', desc: 'Кофе, выпечка, десерты. Для конференций', img: '/images/menu/deserty/d1.jpg' },
  { format: 'detskoe', label: 'Детский', icon: '', desc: 'Меню для детей, аниматор. Для детских праздников', img: '/images/menu/goryachee/h1.jpg' },
  { format: 'chef-at-home', label: 'Шеф на дом', icon: '', desc: 'Шеф готовит у вас. Для камерных ужинов', img: '/images/dishes-new/beef-steak.jpg' },
  { format: 'pominki', label: 'Поминки', icon: '', desc: 'Поминальный обед, без алкоголя', img: '/images/real/salmon-dish.jpg' },
];

const TIER_ORDER: Tier[] = ['economy', 'standard', 'premium', 'luxury'];
const TIER_LABEL: Record<Tier, string> = { economy: 'Эконом', standard: 'Стандарт', premium: 'Расширенный', luxury: 'Максимальный' };
const QUICK_GUESTS = [10, 15, 20, 30, 50, 80, 100, 150, 200, 300, 500];

// Упрощено с 6 шагов (Формат / Гости / Тариф / Меню / Контакты / Готово)
// до 3 actionable steps (Событие / Меню / Контакты) + success screen (Готово).
// Шаг 0 = Формат+Гости, Шаг 1 = Тариф+Меню, Шаг 2 = Контакты, Шаг 3 = Готово.
const STEP_LABELS = ['Событие', 'Меню', 'Контакты'] as const;
const SUCCESS_STEP = 3;

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
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // Mid-funnel email capture (Smart Save) — C3 anchor 8.9
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');
  const searchParams = useSearchParams();

  // Активная группа (если groupsEnabled)
  const activeGroup = store.groupsEnabled && activeGroupId
    ? store.guestGroups.find(g => g.id === activeGroupId) || null
    : null;
  const activeGroupDiet = activeGroup?.diet && activeGroup.diet !== 'omnivore' ? activeGroup.diet : null;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = searchParams;

    const eventParam = params.get('event') as string | null;
    const formatParam = params.get('format') as string | null;
    const tierParam = params.get('tier') as Tier | null;
    const guestsParam = params.get('guests');
    const dishParam = params.get('dish'); // NEW: pre-add specific dish from catalog
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
        // Если guests передан — сразу к меню (new step 1). Иначе — тоже к меню
        // (формат + гости уже выбраны через URL, шаг «Событие» можно пропустить).
        store.setStep(1);
      } else {
        // Если передан только format (без tier) — на шаг «Событие» (new step 0),
        // чтобы пользователь выбрал гостей.
        store.setStep(0);
      }
    }

    // Pre-add specific dish from catalog (?dish=...) — WITHOUT clearing existing items
    if (dishParam) {
      const dish = ALL_DISHES.find(d => d.id === dishParam);
      if (dish && !store.selectedItems.find(i => i.dishId === dishParam)) {
        store.setTierMode('custom');
        // DO NOT clearItems() — that was the bug wiping the cart on every catalog→constructor click
        store.addDish(dishParam);
      }
      if (guestsParam) {
        const g = parseInt(guestsParam, 10);
        if (!isNaN(g) && g >= 10) store.setGuestCount(g);
      }
      store.setStep(1); // new Меню step
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fallback hydration: if zustand-persist hasn't fired _hasHydrated after 200ms, force it.
  // Also clamp step to new bounds (3 max) — handles persisted state from old 6-step version.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!store._hasHydrated) {
      const t = setTimeout(() => store.setHasHydrated(), 200);
      return () => clearTimeout(t);
    }
    if (store.currentStep > SUCCESS_STEP) {
      store.setStep(SUCCESS_STEP);
    }
  }, [store._hasHydrated, store.setHasHydrated]);

  const step = store.currentStep;
  const formatMeta = store.format ? TARIFF_META.find(t => t.format === store.format) : null;
  const prices = store.format ? getPricesForFormat(store.format) : [];

  const canNext =
    step === 0 ? (store.format !== null && store.guestCount >= 6) :
    step === 1 ? (store.tierMode === 'custom' ? store.selectedItems.length > 0 : store.tier !== null) :
    step === 2 ? (!!store.contact.name && !!store.contact.phone) :
    true;
  // Блокировка отправки если группы включены, но сумма не совпадает с guestCount
  const groupsMismatch = store.groupsEnabled && store.guestGroups.length > 0
    && store.guestGroups.reduce((s, g) => s + g.count, 0) !== store.guestCount;
  const canSubmit = canNext && !groupsMismatch;

  // Min-order validation per format — защищает от отрицательной маржи
  // (C2 critical bug: 191 263₽ banquet for 10 guests → negative margin)
  const minOrderCheck = (() => {
    if (!store.format || !store.guestCount) return null;
    const mins: Record<string, { guests: number; total: number; label: string }> = {
      banket: { guests: 15, total: 50000, label: 'Банкет — минимум 15 гостей или 50 000 ₽' },
      furshet: { guests: 20, total: 30000, label: 'Фуршет — минимум 20 гостей или 30 000 ₽' },
      'coffee-break': { guests: 10, total: 3900, label: 'Кофе-брейк — минимум 10 гостей или 3 900 ₽' },
      detskoe: { guests: 10, total: 10000, label: 'Детское — минимум 10 гостей или 10 000 ₽' },
      'chef-at-home': { guests: 6, total: 27000, label: 'Шеф на дом — минимум 6 гостей или 27 000 ₽' },
      pominki: { guests: 10, total: 15000, label: 'Поминки — минимум 10 гостей или 15 000 ₽' },
    };
    const min = mins[store.format];
    if (!min) return null;
    if (store.guestCount < min.guests) {
      return { type: 'guests' as const, min: min.guests, label: min.label };
    }
    if (store.total < min.total) {
      return { type: 'total' as const, min: min.total, label: min.label };
    }
    return null;
  })();

  const handleNext = () => { if (canNext) store.setStep(Math.min(step + 1, SUCCESS_STEP)); };
  const handlePrev = () => store.setStep(Math.max(step - 1, 0));

  // Skip-to-contacts: для пользователей, которые хотят отправить заявку без выбора блюд.
  // Если тариф не выбран — ставим standard по умолчанию (если доступен для формата).
  const handleSkipToContacts = () => {
    if (store.tierMode === 'preset' && !store.tier && store.format) {
      const hasStandard = prices.some(p => p.tier === 'standard' && p.pricePerGuest > 0);
      if (hasStandard) store.setTier('standard');
    }
    store.setStep(2);
  };

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

  // Show sticky summary bar only on steps where DroppableCart is NOT visible
  // (avoids 3 sticky elements on Меню step: header + summary + DroppableCart).
  // Step 0 (Событие) + Step 2 (Контакты) → summary bar visible.
  // Step 1 (Меню) → hidden, DroppableCart shows cart.
  // Step 3 (Готово) → hidden, success screen.
  const showSummaryBar = !!store.format && store.guestCount > 0 && step !== 1 && step < SUCCESS_STEP;

  return (
    <div className="pt-24 pb-20 overflow-x-hidden">
      <div className="container-site max-w-6xl">
        {/* H1 рендерится только после гидратации (когда _hasHydrated=true).
            На сервере fallback уже содержит H1 — не дублируем. */}
        {store._hasHydrated && (
          <header className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-gold-text font-semibold mb-2">Конструктор меню</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-3 leading-tight">Соберите своё меню</h1>
          </header>
        )}

        {/* Progress: 3 actionable steps (Событие / Меню / Контакты).
            Готово (success screen) не входит в progress bar. */}
        {step < SUCCESS_STEP && (
          <div className="flex gap-1 mb-8" role="progressbar" aria-valuenow={step + 1} aria-label={`Прогресс: шаг ${step + 1} из ${STEP_LABELS.length}`} aria-valuemin={1} aria-valuemax={STEP_LABELS.length}>
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1">
                <div className={`w-full h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gold-text' : 'bg-muted'}`} />
                <span className={`text-[10px] hidden sm:block ${i === step ? 'text-gold-text font-semibold' : 'text-muted-foreground'}`}>{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sticky Smart Summary bar — visible on Событие + Контакты steps (not on Меню, where DroppableCart is shown). */}
        {showSummaryBar && (
          <div
            className="sticky top-16 z-20 mb-6 p-2 sm:p-3 rounded-xl bg-card/90 backdrop-blur-md border border-gold-text/30 shadow-[0_4px_30px_rgba(28,24,21,0.08)] flex items-center justify-between gap-2 sm:gap-3"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            aria-label={`Текущий заказ: ${store.guestCount} гостей, ${store.selectedItems.length} блюд, итого ${store.total.toLocaleString('ru-RU')} рублей`}
          >
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm min-w-0">
              <span className="font-medium whitespace-nowrap">{store.guestCount} гостей</span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="font-medium hidden sm:inline">{formatMeta?.label}</span>
              {store.tier && (<><span className="text-muted-foreground hidden md:inline">·</span><span className="font-medium hidden md:inline">{TIER_LABEL[store.tier]}</span></>)}
              {store.selectedItems.length > 0 && (
                <>
                  <span className="text-muted-foreground hidden sm:inline">·</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-tint text-gold-text text-xs font-semibold whitespace-nowrap">
                    {store.selectedItems.length} блюд
                  </span>
                </>
              )}
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-none">Итого</p>
              <p className="font-bold text-gold-text tabular-nums text-sm sm:text-base">{store.total.toLocaleString('ru-RU')} ₽</p>
            </div>
          </div>
        )}

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

        {/* === STEP 0: СОБЫТИЕ (format + guests, two columns) === */}
        {step === 0 && (
          <div>
            <p className="text-muted-foreground mb-6 text-center">Выберите формат и количество гостей</p>
            <div className="grid lg:grid-cols-[1fr_minmax(280px,360px)] gap-6">
              {/* Left: format cards */}
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {TARIFF_META.map(t => {
                    const fmtPrices = getPricesForFormat(t.format);
                    const minPrice = Math.min(...fmtPrices.map(p => p.pricePerGuest));
                    const minGuests = Math.min(...fmtPrices.map(p => p.minGuests));
                    return (
                      <button key={t.format} type="button"
                        onClick={() => store.setFormat(t.format)}
                        className={`group rounded-xl border overflow-hidden text-left transition-all touch-target ${store.format === t.format ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                        {/* W85: Photo on top */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                          <FoodPhoto
                            src={t.img}
                            alt={t.label}
                            aspectRatio="wide"
                            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <h3 className="absolute bottom-1 left-2 right-2 font-heading text-sm font-medium text-white">{t.label}</h3>
                        </div>
                        <div className="p-2">
                          <p className="text-[10px] text-muted-foreground mb-1 leading-snug">{t.desc}</p>
                          <span className="text-[10px] text-gold-text font-semibold block">от {minGuests} гостей</span>
                          <span className="text-[10px] text-muted-foreground block">от {minPrice.toLocaleString('ru-RU')} ₽/гость</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="p-3 rounded-xl bg-secondary/30 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Не знаете, что выбрать?</p>
                  <Link href="/plan/helper" className="inline-flex items-center gap-2 text-gold-text font-semibold hover:underline text-sm">
                     Подберём за 3 вопроса →
                  </Link>
                </div>
              </div>

              {/* Right: guest counter + groups */}
              <div className="text-center">
                <p className="text-muted-foreground mb-3 text-sm">Сколько гостей? От 6 до 500.</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <button type="button" onClick={() => store.setGuestCount(Math.max(6, store.guestCount - 1))}
                    className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-xl hover:border-gold-text hover:bg-secondary/50 transition-colors touch-target" aria-label="Уменьшить на 1">−</button>
                  <div className="text-center">
                    {/* Editable number input — allows arbitrary values like 23, 87 */}
                    <input
                      type="number"
                      min={6}
                      max={500}
                      value={store.guestCount}
                      onChange={e => {
                        const v = Number(e.target.value);
                        if (!isNaN(v)) {
                          store.setGuestCount(Math.max(6, Math.min(500, v)));
                        }
                      }}
                      onBlur={e => {
                        const v = Number(e.target.value);
                        if (isNaN(v) || v < 6) store.setGuestCount(6);
                        if (v > 500) store.setGuestCount(500);
                      }}
                      className="w-24 text-4xl md:text-5xl font-heading text-gold-text text-center bg-transparent border-b-2 border-line focus:border-gold-text focus:outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-colors"
                      aria-label="Количество гостей"
                      inputMode="numeric"
                    />
                    <p className="text-muted-foreground mt-1 text-xs">гостей</p>
                  </div>
                  <button type="button" onClick={() => store.setGuestCount(Math.min(500, store.guestCount + 1))}
                    className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-xl hover:border-gold-text hover:bg-secondary/50 transition-colors touch-target" aria-label="Увеличить на 1">+</button>
                </div>
                <input type="range" min={6} max={500} step={1} value={store.guestCount}
                  onChange={e => store.setGuestCount(Number(e.target.value))}
                  className="w-full mb-4 accent-gold-text" aria-label="Количество гостей (ползунок)" />
                <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                  {QUICK_GUESTS.map(n => (
                    <button key={n} type="button" onClick={() => store.setGuestCount(n)}
                      className={`rounded-full border px-2.5 py-1 text-xs transition-colors touch-target ${store.guestCount === n ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'}`}>{n}</button>
                  ))}
                </div>

                {/* === Группы гостей (для смешанных мероприятий) === */}
                <div className="mt-4 p-3 rounded-xl border border-line bg-card text-left">
                  <label className="flex items-start gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={store.groupsEnabled}
                      onChange={e => store.setGroupsEnabled(e.target.checked)}
                      className="mt-1 accent-gold-text"
                    />
                    <div>
                      <p className="text-sm font-medium"> Несколько групп гостей с разными диетами</p>
                      <p className="text-xs text-muted-foreground">Например: 10 веганов + 8 халяль + 12 всеядных. Каждая группа получит своё под-меню.</p>
                    </div>
                  </label>

                  {store.groupsEnabled && (
                    <div className="mt-3 space-y-2">
                      {store.guestGroups.length > 0 && (
                        <div className="space-y-2">
                          {store.guestGroups.map(g => (
                            <div key={g.id} className="flex flex-wrap items-center gap-2 p-2 rounded-lg border border-line bg-background">
                              <input
                                type="text"
                                placeholder="Название"
                                value={g.name}
                                onChange={e => store.updateGroup(g.id, { name: e.target.value })}
                                className="flex-1 min-w-[100px] rounded border border-line bg-card px-2 py-1 text-xs"
                              />
                              <input
                                type="number"
                                placeholder="Гостей"
                                min={0}
                                value={g.count}
                                onChange={e => store.updateGroup(g.id, { count: parseInt(e.target.value) || 0 })}
                                className="w-20 rounded border border-line bg-card px-2 py-1 text-xs"
                              />
                              <select
                                value={g.diet || ''}
                                onChange={e => store.updateGroup(g.id, { diet: (e.target.value || null) as GuestGroup['diet'] })}
                                className="rounded border border-line bg-card px-2 py-1 text-xs"
                              >
                                <option value="">Всеядные</option>
                                <option value="vegan">Веган</option>
                                <option value="gluten-free">Без глютена</option>
                                <option value="halal">Халяль</option>
                              </select>
                              <button
                                onClick={() => store.removeGroup(g.id)}
                                className="text-xs text-muted-foreground hover:text-destructive px-2 py-1 rounded touch-target"
                                aria-label="Удалить группу"
                              ></button>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        onClick={() => store.addGroup({ name: '', count: 0, diet: 'omnivore' })}
                        className="w-full py-2 rounded-lg border border-dashed border-gold-text text-gold-text text-xs font-medium hover:bg-gold-tint/30 transition-colors touch-target"
                      >
                        + Добавить группу
                      </button>

                      {store.guestGroups.length > 0 && (
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-line">
                          <span>Всего в группах: <strong className="text-foreground">{store.guestGroups.reduce((s, g) => s + g.count, 0)}</strong></span>
                          <span>Общих гостей: <strong className="text-foreground">{store.guestCount}</strong></span>
                        </div>
                      )}
                      {store.guestGroups.length > 0 && (() => {
                        const groupSum = store.guestGroups.reduce((s, g) => s + g.count, 0);
                        const mismatch = groupSum !== store.guestCount;
                        return mismatch ? (
                          <div className="mt-2 p-2 rounded-lg border border-warning/40 bg-warning/10 text-xs text-warning">
                             Сумма гостей в группах ({groupSum}) не совпадает с общим числом гостей ({store.guestCount}).
                            Блюда без привязки к группе будут рассчитаны на {store.guestCount} чел. — уточните количество.
                          </div>
                        ) : (
                          <div className="mt-2 p-2 rounded-lg border border-success/30 bg-success/5 text-xs text-success">
                             Сумма гостей в группах совпадает с общим числом ({store.guestCount} чел.)
                          </div>
                        );
                      })()}
                      <p className="text-[10px] text-muted-foreground">
                         На следующем шаге выберите блюда для каждой группы отдельно — каталог будет фильтроваться по диете группы.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 1: МЕНЮ (tariff cards + dish catalog) === */}
        {step === 1 && (
          <div>
            {/* Tariff mode toggle + tariff cards (collapsed when custom mode is chosen) */}
            {formatMeta && (
              <div className="max-w-2xl mx-auto mb-6">
                <div className="flex gap-2 mb-4 p-1 bg-muted rounded-lg max-w-md mx-auto">
                  <button
                    onClick={() => store.setTierMode('preset')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all touch-target ${store.tierMode === 'preset' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
                  >
                    Готовый тариф
                  </button>
                  <button
                    onClick={() => { store.setTierMode('custom'); store.setTier(null); store.clearItems(); }}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all touch-target ${store.tierMode === 'custom' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground'}`}
                  >
                     Собрать самому
                  </button>
                </div>

                {store.tierMode === 'preset' ? (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {TIER_ORDER.map(t => {
                      const priceTier = prices.find(p => p.tier === t);
                      if (!priceTier || priceTier.pricePerGuest === 0) return null;
                      const isRec = t === 'standard';
                      return (
                        <button key={t} type="button" onClick={() => store.setTier(t)}
                          className={`w-full rounded-xl border p-3 text-left transition-all touch-target ${store.tier === t ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <span className="font-heading text-base font-medium">{TIER_LABEL[t]}</span>
                              {isRec && <span className="ml-2 text-xs bg-gold-text text-white px-2 py-0.5 rounded">Рекомендуем</span>}
                            </div>
                            <span className="text-gold-text font-semibold text-base whitespace-nowrap">{priceTier.pricePerGuest.toLocaleString('ru-RU')} ₽/гость</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{store.guestCount} × {priceTier.pricePerGuest.toLocaleString('ru-RU')} = {(store.guestCount * priceTier.pricePerGuest).toLocaleString('ru-RU')} ₽</p>
                        </button>
                      );
                    })}
                    <p className="sm:col-span-2 text-[10px] text-muted-foreground text-center">
                      После выбора тарифа уберите/замените блюда в каталоге ниже — цена пересчитается автоматически.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gold-tint bg-gold-tint/30 p-4 text-center">
                    <p className="text-sm mb-1 font-medium"> Режим «Собрать самому»</p>
                    <p className="text-xs text-muted-foreground">
                      Выберите блюда из каталога ниже. Подходит для особых диет (веган, без глютена) и если стандартный тариф не подходит.
                      Цена = Σ(цена блюда × кол-во) × гости.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Dish catalog + cart (MenuBuilder has its own sticky DroppableCart). */}
            <div className="mb-4 text-center">
              <h2 className="font-heading text-xl mb-1">
                {store.tierMode === 'custom'
                  ? ' Соберите своё меню'
                  : ' Настройте меню тарифа'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {store.tierMode === 'custom'
                  ? 'Нажмите «+ Добавить» на блюде или перетащите его в корзину. На телефоне — долгое нажатие. Цена пересчитывается автоматически.'
                  : 'Состав тарифа загружен. Можно убрать блюда, заменить, добавить. Цена пересчитывается автоматически.'}
              </p>
              {store.selectedItems.length > 0 && (
                <div className="mt-3 inline-block">
                  <ShareButton
                    title="Моё меню — NiloV Catering"
                    text={`Меню на ${store.guestCount} гостей: ${store.selectedItems.length} блюд, итого ${store.total.toLocaleString('ru-RU')} ₽`}
                    label=" Отправить меню родным/коллегам"
                  />
                </div>
              )}
            </div>

            <MenuBuilder
              selectedItems={store.selectedItems}
              onAdd={(dishId) => store.addDish(dishId, activeGroupId || undefined)}
              onRemove={store.removeDish}
              onSetQty={store.setItemQty}
              onReorder={store.reorderItems}
              excludedAllergens={new Set(store.excludedAllergens as Allergen[])}
              onExcludedAllergensChange={(next) => store.setExcludedAllergens([...next])}
              formatFilter={store.format || undefined}
              dietFilter={activeGroupDiet || undefined}
              catalogTitle={activeGroup ? `Каталог для группы: ${activeGroup.name || 'Без названия'} (${activeGroup.count} чел.)` : 'Каталог блюд'}
              cartTitle="Ваше меню"
              emptyCartText="Нажмите «+ Добавить» на блюде, чтобы добавить его в меню"
              unit="на гостя"
              enableReorder
              enableHybridMode
            />

            {/* Переключатель активной группы — над каталогом внутри того же шага */}
            {store.groupsEnabled && store.guestGroups.length > 0 && (
              <div className="mb-4 p-3 rounded-xl border border-gold-tint bg-gold-tint/20">
                <p className="text-xs font-medium mb-2"> Активная группа (каталог фильтруется по её диете):</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveGroupId(null)}
                    className={`rounded-full px-3 py-1 text-xs border transition-colors touch-target ${
                      !activeGroupId ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'
                    }`}
                  >
                    Все группы (без фильтра)
                  </button>
                  {store.guestGroups.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setActiveGroupId(g.id)}
                      className={`rounded-full px-3 py-1 text-xs border transition-colors touch-target ${
                        activeGroupId === g.id ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'
                      }`}
                    >
                      {g.name || 'Без названия'} · {g.count} чел. {g.diet && g.diet !== 'omnivore' && `· ${g.diet}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            {/* Mid-funnel email capture — Smart Save (3+ dishes) */}
            {store.selectedItems.length >= 3 && !savedEmail && (
              <div className="mt-6 p-4 rounded-xl border border-gold-text/30 bg-gold-tint/10 text-center max-w-2xl mx-auto">
                <p className="text-sm font-medium mb-2"> Сохраните меню, чтобы не потерять</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Введите email — пришлём ссылку на ваше меню. Так вы сможете вернуться к нему позже
                  и показать коллегам/родным.
                </p>
                <div className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.ru"
                    value={savedEmail}
                    onChange={(e) => setSavedEmail(e.target.value)}
                    className="flex-1 rounded-lg border border-line bg-background px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (savedEmail && savedEmail.includes('@')) {
                        // Save to localStorage for now (in production: POST to /api/save-menu)
                        if (typeof window !== 'undefined') {
                          localStorage.setItem('saved-menu-email', savedEmail);
                          localStorage.setItem('saved-menu-url', window.location.href);
                        }
                        setShowSaveDialog(true);
                        setTimeout(() => setShowSaveDialog(false), 3000);
                      }
                    }}
                    className="rounded-lg bg-gold-text text-white px-4 py-2 text-sm font-semibold hover:bg-gold-text/90 touch-target"
                  >
                    Сохранить
                  </button>
                </div>
                {showSaveDialog && (
                  <p className="text-xs text-emerald-600 mt-2">Меню сохранено в этом браузере. Закройте вкладку и откройте заново — состав восстановится. Письмо на {savedEmail} не отправляется автоматически — менеджер пришлёт расчёт после заявки.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* === STEP 2: КОНТАКТЫ (summary + contact form + submit) === */}
        {step === 2 && minOrderCheck && (
          <div className="mb-4 p-4 rounded-xl border-2 border-amber-400 bg-amber-50 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <h3 className="font-semibold text-amber-900 mb-1"> Дополните меню до идеала</h3>
                <p className="text-sm text-amber-800 mb-2">
                  Для формата «{formatMeta?.label}» рекомендуем минимум {minOrderCheck.min} {minOrderCheck.type === 'guests' ? 'гостей' : '₽'} — это обеспечит полный кейтеринг-опыт для каждого гостя.
                </p>
                <p className="text-xs text-amber-700 mb-2">
                  {minOrderCheck.type === 'guests'
                    ? `Сейчас: ${store.guestCount} гостей. Добавьте ещё ${minOrderCheck.min - store.guestCount} — или выберите другой формат.`
                    : `Сейчас: ${store.total.toLocaleString('ru-RU')} ₽. Добавьте signature-блюда на ${(minOrderCheck.min - store.total).toLocaleString('ru-RU')} ₽ — гости будут в восторге.`}
                </p>
                <button type="button" onClick={() => store.setStep(1)} className="mt-2 text-amber-900 underline font-medium text-sm touch-target inline-block">
                  ← Вернуться к меню
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Real-time availability indicator — honest messaging */}
        {step === 2 && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-3 max-w-2xl mx-auto">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-emerald-900">Принимаем заявки на эту дату</p>
              <p className="text-xs text-emerald-700">Менеджер проверит загрузку бригад и подтвердит за 15 минут в рабочее время (9:00–21:00 МСК).</p>
            </div>
          </div>
        )}

        {step === 2 && formatMeta && (
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
                 Это финальная сумма. Доплат за персонал, посуду и доставку по КАД не будет.
              </p>
            </div>

            {store.selectedItems.length > 0 && (
              <div className="rounded-xl border border-line bg-card/50 p-4 mb-6">
                <h3 className="text-sm font-medium mb-2">Состав вашего меню:</h3>
                <ul className="text-xs text-muted-foreground space-y-1 max-h-40 overflow-y-auto">
                  {store.selectedItems.map((item, idx) => {
                    const dish = ALL_DISHES.find(d => d.id === item.dishId);
                    if (!dish) return null;
                    const group = item.groupId ? store.guestGroups.find(g => g.id === item.groupId) : null;
                    const groupSize = group?.count || store.guestCount;
                    const itemTotal = dish.pricePerGuest * item.qty * groupSize;
                    return (
                      <li key={`${item.dishId}-${item.groupId || 'nogroup'}-${idx}`} className="flex justify-between gap-2">
                        <span className="min-w-0 flex-1">
                          {dish.name} × {item.qty}
                          {group && <span className="text-[10px] text-muted-foreground ml-1">[{group.name || 'Группа'} · {group.count}ч]</span>}
                        </span>
                        <span className="tabular-nums shrink-0">{itemTotal.toLocaleString('ru-RU')} ₽</span>
                      </li>
                    );
                  })}
                </ul>
                {/* Per-group subtotals */}
                {store.groupsEnabled && store.guestGroups.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-line space-y-1">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Подытоги по группам:</p>
                    {store.guestGroups.map(g => {
                      const groupItems = store.selectedItems.filter(i => i.groupId === g.id);
                      const groupTotal = groupItems.reduce((sum, item) => {
                        const dish = ALL_DISHES.find(d => d.id === item.dishId);
                        return sum + (dish ? dish.pricePerGuest * item.qty * g.count : 0);
                      }, 0);
                      return (
                        <div key={g.id} className="flex justify-between text-[11px]">
                          <span className="text-muted-foreground">{g.name || 'Без названия'} ({g.count} чел.)</span>
                          <span className="tabular-nums font-medium">{groupTotal.toLocaleString('ru-RU')} ₽</span>
                        </div>
                      );
                    })}
                    {store.selectedItems.some(i => !i.groupId) && (
                      <div className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">На всех ({store.guestCount} чел.)</span>
                        <span className="tabular-nums font-medium">
                          {store.selectedItems.filter(i => !i.groupId).reduce((sum, item) => {
                            const dish = ALL_DISHES.find(d => d.id === item.dishId);
                            return sum + (dish ? dish.pricePerGuest * item.qty * store.guestCount : 0);
                          }, 0).toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Excluded allergens — передаются в заявку менеджеру */}
            {store.excludedAllergens.length > 0 && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 mb-6">
                <h3 className="text-sm font-medium mb-2"> Исключённые аллергены (передаётся менеджеру):</h3>
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
              <h3 className="text-sm font-semibold text-foreground">Контакты для заявки</h3>
              <div>
                <label htmlFor="cw-name" className="block text-sm font-medium text-foreground mb-1.5">Ваше имя <span className="text-destructive">*</span></label>
                <input
                  type="text"
                  id="cw-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Анна"
                  value={store.contact.name}
                  onChange={e => store.setContact({ name: e.target.value })}
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="cw-phone" className="block text-sm font-medium text-foreground mb-1.5">Телефон <span className="text-destructive">*</span></label>
                <input
                  type="tel"
                  id="cw-phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={store.contact.phone}
                  onChange={e => store.setContact({ phone: e.target.value })}
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="cw-date" className="block text-sm font-medium text-foreground mb-1.5">Дата события</label>
                <input
                  type="date"
                  id="cw-date"
                  name="date"
                  autoComplete="off"
                  value={store.contact.date}
                  onChange={e => store.setContact({ date: e.target.value })}
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2"
                />
              </div>
              <div>
                <label htmlFor="cw-comment" className="block text-sm font-medium text-foreground mb-1.5">Комментарий</label>
                <textarea
                  id="cw-comment"
                  name="comment"
                  placeholder="Аллергии гостей, особые пожелания…"
                  value={store.contact.comment}
                  onChange={e => store.setContact({ comment: e.target.value })}
                  className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm focus:outline-none focus:border-gold-text focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 min-h-[80px] resize-none"
                />
              </div>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl border-2 border-red-300 bg-red-50 text-red-900">
                <p className="text-sm font-medium mb-1">Ошибка отправки</p>
                <p className="text-sm">{submitError}</p>
              </div>
            )}
          </div>
        )}

        {/* === STEP 3: ГОТОВО (success screen) === */}
        {step === SUCCESS_STEP && (
          <div className="text-center py-8">
            <span className="text-5xl block mb-4"></span>
            <h2 className="text-xl font-heading font-medium mb-2">Заявка принята!</h2>
            {orderId && (
              <p className="text-sm text-muted-foreground mb-2">
                Номер заявки: <strong className="text-foreground font-mono">{orderId}</strong>
              </p>
            )}
            <p className="text-muted-foreground mb-6">Менеджер свяжется с вами в течение 15 минут для уточнения деталей и финальной проверки аллергенов.</p>

            {/* Shareable URL — viral loop: send menu to spouse/colleague/boss for approval */}
            <div className="text-left rounded-xl border border-line bg-card p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm font-medium mb-2"> Поделитесь меню</p>
              <p className="text-xs text-muted-foreground mb-3">
                Отправьте ссылку жениху/коллегам/руководителю для согласования:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  className="flex-1 rounded-lg border border-line bg-background px-3 py-2 text-xs font-mono"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className="rounded-lg bg-gold-text text-white px-4 py-2 text-xs font-semibold hover:bg-gold-text/90 transition-colors touch-target"
                >
                  {copied ? ' Скопировано' : 'Копировать'}
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <a
                  href={`https://wa.me/78129195911?text=${encodeURIComponent('Посмотри меню: ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 hover:underline"
                >
                   WhatsApp
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                   Telegram
                </a>
              </div>
            </div>

            {/* Referral program — growth loop */}
            <div className="text-left rounded-xl border-2 border-dashed border-gold-text/30 bg-gold-tint/5 p-4 mb-6 max-w-md mx-auto">
              <p className="text-sm font-medium mb-1"> Рекомендуйте нас — получайте бонусы</p>
              <p className="text-xs text-muted-foreground">
                Поделитесь ссылкой с друзьями. За каждый рекомендованный заказ — скидка 500 ₽ на следующее мероприятие.
              </p>
            </div>

            <div className="flex flex-col gap-2 max-w-xs mx-auto">
              <Link href="/" className="text-gold-text font-semibold hover:underline text-sm">На главную →</Link>
              <Link href="/pricing" className="text-xs text-muted-foreground hover:text-foreground">Посмотреть тарифы →</Link>
            </div>
          </div>
        )}

        {/* === NAV BUTTONS === */}
        {store._hasHydrated && step < SUCCESS_STEP && (
          <div className="flex flex-wrap justify-between items-center gap-3 mt-8 max-w-2xl mx-auto">
            {step > 0 ? (
              <button type="button" onClick={handlePrev} className="text-sm text-muted-foreground hover:text-foreground touch-target px-2 py-1">← Назад</button>
            ) : <div />}

            <div className="flex items-center gap-3 ml-auto">
              {/* "Пропустить → Контакты" — для пользователей, которые хотят отправить
                  заявку без детальной настройки меню (только на шаге Меню). */}
              {step === 1 && (
                <button
                  type="button"
                  onClick={handleSkipToContacts}
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 touch-target px-2 py-1"
                >
                  Пропустить → Контакты
                </button>
              )}

              {step < 2 ? (
                <button type="button" onClick={handleNext} disabled={!canNext}
                  className="rounded-lg px-8 py-3 text-sm font-semibold transition-colors touch-target disabled:bg-secondary disabled:text-muted-foreground disabled:cursor-not-allowed enabled:bg-primary enabled:text-primary-foreground enabled:hover:bg-primary/90 enabled:shadow-md">
                  Далее
                </button>
              ) : step === 2 ? (
                <button type="button"
                  onClick={async () => {
                    // Блокировка отправки при невыполненном минимальном заказе
                    if (minOrderCheck) return;
                    // Сборка авто-комментария: аллергены + группы гостей
                    const autoLines: string[] = [];
                    if (store.excludedAllergens.length > 0) {
                      const allergensList = store.excludedAllergens
                        .map(a => ALLERGEN_LABEL[a as Allergen] || a)
                        .join(', ');
                      autoLines.push(`Исключённые аллергены: ${allergensList}`);
                    }
                    if (store.groupsEnabled && store.guestGroups.length > 0) {
                      const groupsList = store.guestGroups
                        .map(g => `${g.name || 'Без названия'}: ${g.count} чел. (${g.diet || 'всеядные'})`)
                        .join('; ');
                      autoLines.push(`Группы гостей: ${groupsList}`);
                    }
                    let finalComment = store.contact.comment || '';
                    if (autoLines.length > 0) {
                      // Build auto-metadata block for backend only — NOT written back to visible textarea
                      const autoBlock = autoLines.join('\n');
                      finalComment = store.contact.comment
                        ? `${store.contact.comment}\n\n[Авто-сводка]\n${autoBlock}`
                        : `[Авто-сводка]\n${autoBlock}`;
                      // Do NOT call store.setContact — keep the user's textarea clean
                    }

                    // Реальная отправка заявки на бэкенд
                    let submitOk = false;
                    let submitError = '';
                    try {
                      const response = await fetch('/api/quote', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: store.contact.name,
                          phone: store.contact.phone,
                          date: store.contact.date,
                          format: store.format,
                          tier: store.tier,
                          guests: store.guestCount,
                          total: store.total,
                          comment: finalComment,
                          excludedAllergens: store.excludedAllergens,
                          guestGroups: store.guestGroups,
                          selectedItems: store.selectedItems,
                          source: 'constructor',
                        }),
                      });
                      const data = await response.json();
                      if (data.success) {
                        setOrderId(data.orderId || '');
                        submitOk = true;
                      } else {
                        submitError = data.error || 'Сервер не подтвердил заявку';
                      }
                    } catch (e) {
                      submitError = e instanceof Error ? e.message : 'Сеть недоступна';
                      console.error('Submit error:', e);
                    }
                    if (submitOk) {
                      setSubmitted(true);
                      store.setStep(SUCCESS_STEP);
                    } else {
                      setSubmitError(`Не удалось отправить заявку: ${submitError}. Позвоните +7 (812) 919-59-11 или напишите в WhatsApp — мы зафиксируем заказ вручную.`);
                    }
                  }}
                  disabled={!canSubmit || !!minOrderCheck}
                  className={`rounded-lg px-8 py-3 text-sm font-semibold transition-all touch-target ${
                    canSubmit && !minOrderCheck
                      ? 'bg-gold-text text-white hover:bg-gold-text/90 hover:shadow-lg hover:-translate-y-0.5'
                      : 'bg-secondary text-muted-foreground cursor-not-allowed'
                  }`}>
                  {minOrderCheck ? 'Дополните меню →' : 'Отправить заявку →'}
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
