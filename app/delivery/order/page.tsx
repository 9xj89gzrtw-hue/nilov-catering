'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDeliveryCart, MIN_ORDER_AMOUNT, TIME_SLOTS, DELIVERY_PRESETS, calcCartTotal } from '@/hooks/useDeliveryCart';
import { DELIVERY_ZONES } from '@/lib/service-spec';
import MenuBuilder from '@/components/interactive/MenuBuilder';
import { ALL_DISHES } from '@/lib/menu-data';

const STEPS = ['Меню', 'Доставка', 'Контакты', 'Готово'];

const PAYMENT_METHODS = [
  { id: 'card', label: 'Карта курьеру', icon: '💳' },
  { id: 'cash', label: 'Наличные', icon: '💵' },
  { id: 'transfer', label: 'Перевод по СБП', icon: '📱' },
];

export default function DeliveryOrderPage() {
  const cart = useDeliveryCart();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

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

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Текущая зона (для скрытия термобокса)
  const currentZone = DELIVERY_ZONES.find(z => z.id === cart.zoneId);
  const showThermobox = currentZone ? !currentZone.coldChain : false;

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
          // На SSR показываем структуру страницы (пресеты + шаги), без интерактива
          // Это лучше чем animate-pulse — пользователь видит что на странице
          <div>
            {step === 0 && (
              <div>
                <div className="mb-6">
                  <h3 className="font-heading text-lg font-medium mb-3">⚡ Быстрый старт</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {DELIVERY_PRESETS.map(preset => (
                      <div key={preset.id} className="rounded-xl border border-line bg-card p-4">
                        <span className="text-2xl mb-1 block">{preset.emoji}</span>
                        <h4 className="text-sm font-semibold mb-0.5">{preset.label}</h4>
                        <p className="text-[10px] text-muted-foreground mb-2">{preset.description}</p>
                        <span className="text-xs text-gold-text font-semibold">~{preset.estimatedTotal.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-muted-foreground py-8">Загрузка каталога блюд…</p>
              </div>
            )}
            {step > 0 && (
              <div className="text-center py-12 text-sm text-muted-foreground">Загрузка формы…</div>
            )}
          </div>
        ) : (
          <>
            {/* === Step 0: Menu builder === */}
            {step === 0 && (
              <div>
                {/* Presets */}
                {cart.items.length === 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading text-lg font-medium">⚡ Быстрый старт</h3>
                      <span className="text-xs text-muted-foreground">или соберите сами ↓</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      {DELIVERY_PRESETS.map(preset => (
                        <button
                          key={preset.id}
                          onClick={() => cart.applyPreset(preset.id)}
                          className="rounded-xl border border-line bg-card p-4 text-left hover:border-gold-text hover:shadow-sm transition-all"
                        >
                          <span className="text-2xl mb-1 block">{preset.emoji}</span>
                          <h4 className="text-sm font-semibold mb-0.5">{preset.label}</h4>
                          <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">{preset.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gold-text font-semibold">~{preset.estimatedTotal.toLocaleString('ru-RU')} ₽</span>
                            <span className="text-[10px] text-muted-foreground">{preset.items.length} блюд</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="text-center mb-4">
                      <p className="text-xs text-muted-foreground">💡 1 порция = 1 гость. На 10 человек: 5-7 блюд × 10 порций = 50-70 порций.</p>
                    </div>
                  </div>
                )}

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
                  emptyCartText="Выберите пресет выше или нажмите «+ Добавить» на блюде"
                  unit="порц. (= чел.)"
                  enableReorder
                />

                {cart.items.length === 0 && (
                  <div className="mt-6 p-4 rounded-xl border border-dashed border-line text-center">
                    <p className="text-sm text-muted-foreground">💡 На 10 человек возьмите 5-7 разных блюд × по 10 порций = 50-70 порций всего. 1 порция рассчитана на 1 гостя.</p>
                  </div>
                )}

                {cart.items.length > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-gold-tint/30 text-center text-xs text-muted-foreground">
                    💡 1 порция = 1 гость. На N гостей берите по N порций каждого блюда. Пресет «Семейный ужин на 10» = 6 блюд × 10 порций = 60 порций на 10 человек.
                  </div>
                )}
              </div>
            )}

            {/* === Step 1: Delivery zone + time === */}
            {step === 1 && (
              <div className="max-w-3xl mx-auto">
                <h2 className="font-heading text-xl mb-4">Зона доставки {!cart.zoneId && <span className="text-xs text-warning ml-2">⚠ выберите зону</span>}</h2>
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
                      <p className="text-xs text-muted-foreground mb-2">{zone.distance} за КАД</p>
                      <div className="text-[10px] text-muted-foreground space-y-0.5">
                        <p>❄️ Холодовая цепь: {zone.coldChain ? '✅' : '⚠ только термобоксы'}</p>
                        <p>⏱ Ответ: до {zone.slaHours}ч</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Thermobox — только для зон без холодовой цепи */}
                {showThermobox && (
                  <div className="rounded-xl border border-warning/30 bg-warning/5 p-4 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cart.needThermobox}
                        onChange={e => cart.setThermobox(e.target.checked)}
                        className="mt-1 accent-gold-text"
                      />
                      <div>
                        <p className="text-sm font-medium">📦 Аренда термобокса (залог 1 500 ₽, возвращается при сдаче)</p>
                        <p className="text-xs text-muted-foreground">В вашей зоне нет холодовой цепи — рекомендуем термобокс для сохранения свежести блюд.</p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Time slot — узкие 2-часовые окна */}
                <h2 className="font-heading text-xl mb-4">Время доставки</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
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
                      <span className="text-[11px] font-medium leading-tight block">{slot.label}</span>
                    </button>
                  ))}
                </div>

                {/* Точное время — для запланированных ужинов */}
                <div className="rounded-xl border border-line bg-card p-4 mb-6">
                  <label className="block">
                    <span className="text-sm font-medium block mb-1">⏰ Точное время подачи (необязательно)</span>
                    <p className="text-xs text-muted-foreground mb-2">Для запланированных мероприятий — укажите, к какому часу подать еду</p>
                    <input
                      type="time"
                      value={cart.contact.exactTime}
                      onChange={e => cart.setContact({ exactTime: e.target.value })}
                      className="rounded-lg border border-line bg-background px-3 py-2 text-sm focus:outline-none focus:border-gold-text"
                    />
                  </label>
                  <label className="flex items-center gap-2 mt-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cart.contact.callAhead}
                      onChange={e => cart.setContact({ callAhead: e.target.checked })}
                      className="accent-gold-text"
                    />
                    <span className="text-xs">📞 Позвонить за 30 минут до прибытия</span>
                  </label>
                </div>

                {/* Live total preview */}
                <div className="rounded-xl border border-line bg-card p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Стоимость блюд</span><span>{totals.subtotal.toLocaleString('ru-RU')} ₽</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Доставка</span><span>{totals.delivery === 0 ? 'Бесплатно' : `${totals.delivery.toLocaleString('ru-RU')} ₽`}</span></div>
                  {totals.thermobox > 0 && (
                    <div className="flex justify-between"><span className="text-muted-foreground">Термобокс (залог)</span><span>{totals.thermobox.toLocaleString('ru-RU')} ₽</span></div>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t border-line">
                    <span>Итого</span><span className="text-gold-text text-lg">{totals.total.toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>
              </div>
            )}

            {/* === Step 2: Contacts + address === */}
            {step === 2 && (
              <div className="max-w-2xl mx-auto">
                <h2 className="font-heading text-xl mb-4 text-center">Контакты и адрес</h2>

                {/* Контактные данные */}
                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Имя *" value={cart.contact.name}
                      onChange={e => cart.setContact({ name: e.target.value })}
                      className="rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                    <input type="tel" placeholder="+7 (___) ___-__-__ *" value={cart.contact.phone}
                      onChange={e => cart.setContact({ phone: e.target.value })}
                      className="rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  </div>
                  <input type="text" placeholder="Адрес доставки *" value={cart.contact.address}
                    onChange={e => cart.setContact({ address: e.target.value })}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />

                  {/* Для загородной доставки — поля подъезд/этаж/домофон */}
                  {cart.zoneId === 'kad' && (
                    <div className="grid grid-cols-3 gap-3">
                      <input type="text" placeholder="Подъезд" value={cart.contact.entrance}
                        onChange={e => cart.setContact({ entrance: e.target.value })}
                        className="rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                      <input type="text" placeholder="Этаж" value={cart.contact.floor}
                        onChange={e => cart.setContact({ floor: e.target.value })}
                        className="rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                      <input type="text" placeholder="Код домофона" value={cart.contact.intercom}
                        onChange={e => cart.setContact({ intercom: e.target.value })}
                        className="rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                    </div>
                  )}

                  {/* Для загородной доставки — поля код ворот/КП/участок */}
                  {cart.zoneId !== 'kad' && (
                    <div className="rounded-xl border border-gold-tint bg-gold-tint/20 p-3 space-y-2">
                      <p className="text-xs text-muted-foreground">📍 Загородная доставка — заполните, чтобы курьер нашёл вас:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="Название КП / СНТ / посёлка" value={cart.contact.entrance}
                          onChange={e => cart.setContact({ entrance: e.target.value })}
                          className="rounded-lg border border-line bg-card px-3 py-2.5 text-sm focus:outline-none focus:border-gold-text" />
                        <input type="text" placeholder="№ участка / дома" value={cart.contact.floor}
                          onChange={e => cart.setContact({ floor: e.target.value })}
                          className="rounded-lg border border-line bg-card px-3 py-2.5 text-sm focus:outline-none focus:border-gold-text" />
                      </div>
                      <input type="text" placeholder="Код ворот / как проехать (необязательно)" value={cart.contact.intercom}
                        onChange={e => cart.setContact({ intercom: e.target.value })}
                        className="w-full rounded-lg border border-line bg-card px-3 py-2.5 text-sm focus:outline-none focus:border-gold-text" />
                    </div>
                  )}

                  {/* Квартира/офис — только для зоны kad */}
                  {cart.zoneId === 'kad' && (
                    <input type="text" placeholder="Квартира / офис (необязательно)" value={cart.contact.apartment}
                      onChange={e => cart.setContact({ apartment: e.target.value })}
                      className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  )}

                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Дата доставки *</label>
                    <input type="date" min={minDate} value={cart.contact.date}
                      onChange={e => cart.setContact({ date: e.target.value })}
                      className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  </div>

                  {/* Способ оплаты */}
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Способ оплаты</label>
                    <div className="grid grid-cols-3 gap-2">
                      {PAYMENT_METHODS.map(m => (
                        <button
                          key={m.id}
                          onClick={() => cart.setContact({ paymentMethod: m.id })}
                          className={`rounded-xl border p-2.5 text-center transition-all ${
                            cart.contact.paymentMethod === m.id
                              ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text'
                              : 'border-line bg-card hover:border-gold-text'
                          }`}
                        >
                          <span className="text-base block mb-0.5">{m.icon}</span>
                          <span className="text-[10px] font-medium">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea placeholder="Комментарий к заказу (особые пожелания, аллергии гостей, код ворот и т.д.)" value={cart.contact.comment}
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
                    <div className="flex justify-between"><span className="text-muted-foreground">Термобокс (залог)</span><span>{totals.thermobox.toLocaleString('ru-RU')} ₽</span></div>
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

                {/* Trust badges перед кнопкой отправки */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-4 flex-wrap">
                  <span>★ 4.8 Яндекс.Карты</span>
                  <span>·</span>
                  <span>С 2007 года</span>
                  <span>·</span>
                  <span>3000+ событий</span>
                  <span>·</span>
                  <span>Курьер позвонит за 30 мин</span>
                </div>
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
                  Доставка: <strong className="text-foreground">{cart.contact.date}</strong>
                  {cart.contact.exactTime && <> к <strong className="text-foreground">{cart.contact.exactTime}</strong></>}
                  {!cart.contact.exactTime && <> · {TIME_SLOTS.find(s => s.id === cart.contact.timeSlot)?.label}</>}
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
