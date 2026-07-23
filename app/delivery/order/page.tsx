'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDeliveryCart, MIN_ORDER_AMOUNT, TIME_SLOTS, calcCartTotal } from '@/hooks/useDeliveryCart';
import { DELIVERY_ZONES } from '@/lib/service-spec';
import MenuBuilder from '@/components/interactive/MenuBuilder';
import { ALL_DISHES } from '@/lib/menu-data';

const STEPS = ['Меню', 'Доставка', 'Контакты', 'Готово'];

export default function DeliveryOrderPage() {
  const cart = useDeliveryCart();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Hydration guard
  const hydrated = cart._hasHydrated;

  const totals = calcCartTotal(cart);
  const canNext =
    step === 0 ? cart.items.length > 0 :
    step === 1 ? !!cart.zoneId :
    step === 2 ? !!cart.contact.name && !!cart.contact.phone && !!cart.contact.address && !!cart.contact.date :
    true;

  const handleNext = () => { if (canNext) setStep(Math.min(step + 1, 3)); };
  const handlePrev = () => setStep(Math.max(step - 1, 0));

  const handleSubmit = () => {
    if (!totals.meetsMinimum) return;
    setSubmitted(true);
    setStep(3);
  };

  // Минимальная дата — завтра
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-2">🚚 Доставка кейтеринга</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Соберите заказ из нашего меню — привезём готовые блюда на дом или в офис. Без персонала и посуды, только еда.
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1 mb-8 max-w-2xl mx-auto" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gold-text' : 'bg-muted'}`} />
              <span className={`text-[10px] ${i === step ? 'text-gold-text font-semibold' : 'text-muted-foreground'}`}>{label}</span>
            </div>
          ))}
        </div>

        {!hydrated ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Загрузка корзины…</div>
        ) : (
          <>
            {/* === Step 0: Menu builder === */}
            {step === 0 && (
              <div>
                {/* Sticky cart summary */}
                <div className="mb-6 p-4 rounded-xl border border-gold-tint bg-gold-tint/30 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Позиций: <strong className="text-foreground">{cart.items.length}</strong></p>
                    <p className="text-xs text-muted-foreground">Мин. заказ: <strong className="text-foreground">{MIN_ORDER_AMOUNT.toLocaleString('ru-RU')} ₽</strong></p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-heading font-bold text-gold-text tabular-nums">{totals.subtotal.toLocaleString('ru-RU')} ₽</p>
                    {!totals.meetsMinimum && cart.items.length > 0 && (
                      <p className="text-xs text-warning">Ещё {totals.remainingToMin.toLocaleString('ru-RU')} ₽ до минимума</p>
                    )}
                    {totals.meetsMinimum && (
                      <p className="text-xs text-success">✓ Минимум достигнут</p>
                    )}
                  </div>
                </div>

                <MenuBuilder
                  selectedItems={cart.items}
                  onAdd={cart.addDish}
                  onRemove={cart.removeDish}
                  onSetQty={cart.setQty}
                  onReorder={cart.reorderItems}
                  catalogTitle="Каталог блюд для доставки"
                  cartTitle="Ваш заказ"
                  emptyCartText="Перетащите блюда сюда или нажмите «+»"
                  unit="порц."
                  enableReorder
                />

                {cart.items.length === 0 && (
                  <div className="mt-6 p-4 rounded-xl border border-dashed border-line text-center">
                    <p className="text-sm text-muted-foreground mb-3">💡 Подсказка: для первого заказа рекомендуем собрать 5-7 блюд — хватит на 8-10 человек.</p>
                    <p className="text-xs text-muted-foreground">Среднее блюдо в каталоге — около 250 ₽ за порцию.</p>
                  </div>
                )}
              </div>
            )}

            {/* === Step 1: Delivery zone + time === */}
            {step === 1 && (
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-xl mb-4">Зона доставки</h2>
                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {DELIVERY_ZONES.map(zone => (
                    <button
                      key={zone.id}
                      onClick={() => cart.setZone(zone.id)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        cart.zoneId === zone.id
                          ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text'
                          : 'border-line bg-card hover:border-gold-text'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-heading font-medium text-sm">{zone.name}</h3>
                        <span className={`text-xs font-semibold ${zone.surcharge === 0 ? 'text-success' : 'text-gold-text'}`}>
                          {zone.surcharge === 0 ? 'Бесплатно' : `+${zone.surcharge.toLocaleString('ru-RU')} ₽`}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{zone.distance}</p>
                      <div className="text-[10px] text-muted-foreground space-y-0.5">
                        <p>❄️ Холодовая цепь: {zone.coldChain ? '✅' : '⚠ только термобоксы'}</p>
                        <p>⏱ Ответ: до {zone.slaHours}ч</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Thermobox option */}
                <div className="rounded-xl border border-line bg-card p-4 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cart.needThermobox}
                      onChange={e => cart.setThermobox(e.target.checked)}
                      className="mt-1 accent-gold-text"
                    />
                    <div>
                      <p className="text-sm font-medium">📦 Аренда термобокса (+1 500 ₽)</p>
                      <p className="text-xs text-muted-foreground">Рекомендуется для зон без холодовой цепи — сохранит блюда свежими при транспортировке.</p>
                    </div>
                  </label>
                </div>

                {/* Time slot */}
                <h2 className="font-heading text-xl mb-4">Время доставки</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => cart.setContact({ timeSlot: slot.id })}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        cart.contact.timeSlot === slot.id
                          ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text'
                          : 'border-line bg-card hover:border-gold-text'
                      }`}
                    >
                      <span className="text-lg block mb-1">{slot.icon}</span>
                      <span className="text-xs font-medium">{slot.label}</span>
                    </button>
                  ))}
                </div>

                {/* Live total preview */}
                <div className="rounded-xl border border-line bg-card p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Стоимость блюд</span><span>{totals.subtotal.toLocaleString('ru-RU')} ₽</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Доставка</span><span>{totals.delivery === 0 ? 'Бесплатно' : `${totals.delivery.toLocaleString('ru-RU')} ₽`}</span></div>
                  {totals.thermobox > 0 && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Термобокс</span><span>{totals.thermobox.toLocaleString('ru-RU')} ₽</span></div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t border-line">
                    <span>Итого</span><span className="text-gold-text text-lg">{totals.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            )}

            {/* === Step 2: Contacts + address === */}
            {step === 2 && (
              <div className="max-w-md mx-auto">
                <h2 className="font-heading text-xl mb-4 text-center">Контакты и адрес</h2>
                <div className="space-y-4 mb-6">
                  <input type="text" placeholder="Ваше имя *" value={cart.contact.name}
                    onChange={e => cart.setContact({ name: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <input type="tel" placeholder="+7 (___) ___-__-__ *" value={cart.contact.phone}
                    onChange={e => cart.setContact({ phone: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <input type="text" placeholder="Адрес доставки *" value={cart.contact.address}
                    onChange={e => cart.setContact({ address: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <input type="text" placeholder="Квартира / офис (необязательно)" value={cart.contact.apartment}
                    onChange={e => cart.setContact({ apartment: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Дата доставки *</label>
                    <input type="date" min={minDate} value={cart.contact.date}
                      onChange={e => cart.setContact({ date: e.target.value })}
                      className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  </div>
                  <textarea placeholder="Комментарий к заказу (необязательно)" value={cart.contact.comment}
                    onChange={e => cart.setContact({ comment: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text min-h-[80px] resize-none" />
                </div>

                {/* Order summary */}
                <div className="rounded-xl border border-line bg-card p-4 space-y-2 text-sm mb-6">
                  <h3 className="font-medium mb-2">Ваш заказ:</h3>
                  <ul className="space-y-1 max-h-40 overflow-y-auto text-xs text-muted-foreground">
                    {cart.items.map(item => {
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
                  <hr className="border-line" />
                  <div className="flex justify-between"><span className="text-muted-foreground">Блюда</span><span>{totals.subtotal.toLocaleString('ru-RU')} ₽</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Доставка</span><span>{totals.delivery === 0 ? 'Бесплатно' : `${totals.delivery.toLocaleString('ru-RU')} ₽`}</span></div>
                  {totals.thermobox > 0 && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Термобокс</span><span>{totals.thermobox.toLocaleString('ru-RU')} ₽</span></div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t border-line">
                    <span>Итого</span><span className="text-gold-text text-lg">{totals.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                {/* Min order warning */}
                {!totals.meetsMinimum && (
                  <div className="rounded-xl border border-warning/30 bg-warning/10 p-3 text-xs text-warning mb-4 text-center">
                    ⚠ Минимальный заказ — {MIN_ORDER_AMOUNT.toLocaleString('ru-RU')} ₽. Добавьте ещё на {totals.remainingToMin.toLocaleString('ru-RU')} ₽.
                  </div>
                )}
              </div>
            )}

            {/* === Step 3: Done === */}
            {step === 3 && submitted && (
              <div className="max-w-md mx-auto text-center py-8">
                <span className="text-5xl block mb-4">🎉</span>
                <h2 className="text-xl font-heading font-medium mb-2">Заказ принят!</h2>
                <p className="text-muted-foreground mb-2">
                  Мы свяжемся с вами по телефону <strong className="text-foreground">{cart.contact.phone}</strong> для подтверждения.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Доставка: <strong className="text-foreground">{cart.contact.date}</strong>, {TIME_SLOTS.find(s => s.id === cart.contact.timeSlot)?.label}
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="text-gold-text font-semibold hover:underline text-sm">На главную →</Link>
                  <button
                    onClick={() => { cart.reset(); setStep(0); setSubmitted(false); }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Оформить новый заказ
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < 3 && (
              <div className="flex justify-between mt-8 max-w-md mx-auto">
                {step > 0 ? (
                  <button type="button" onClick={handlePrev} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>
                ) : (
                  <Link href="/delivery" className="text-sm text-muted-foreground hover:text-foreground">← Зоны доставки</Link>
                )}
                {step < 2 ? (
                  <button type="button" onClick={handleNext} disabled={!canNext}
                    className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                    Далее
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={!canNext || !totals.meetsMinimum}
                    className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
                    Оформить заказ
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
