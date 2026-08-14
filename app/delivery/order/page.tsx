"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useDeliveryCart,
  MIN_ORDER_AMOUNT,
  TIME_SLOTS,
  DELIVERY_PRESETS,
  calcCartTotal,
} from "@/hooks/useDeliveryCart";
import { DELIVERY_ZONES } from "@/lib/service-spec";
import MenuBuilder from "@/components/interactive/MenuBuilder";
import { ALL_DISHES } from "@/lib/menu-data";

const STEPS = ["Меню", "Доставка", "Контакты", "Готово"];

const PAYMENT_METHODS = [
  { id: "card", label: "Карта курьеру", icon: "" },
  { id: "cash", label: "Наличные", icon: "" },
  { id: "transfer", label: "Перевод по СБП", icon: "" },
];

export default function DeliveryOrderPage() {
  const cart = useDeliveryCart();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const hydrated = cart._hasHydrated;

  const totals = calcCartTotal(cart);
  const canNext =
    step === 0
      ? cart.items.length > 0
      : step === 1
        ? !!cart.zoneId
        : step === 2
          ? !!cart.contact.name &&
            !!cart.contact.phone &&
            !!cart.contact.address &&
            !!cart.contact.date
          : true;

  const handleNext = () => {
    if (canNext) setStep(Math.min(step + 1, 3));
  };
  const handlePrev = () => setStep(Math.max(step - 1, 0));

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!totals.meetsMinimum) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "delivery-order",
          name: cart.contact.name,
          phone: cart.contact.phone,
          email: "",
          date: cart.contact.date,
          time: cart.contact.timeSlot || cart.contact.exactTime || "",
          location: cart.contact.address,
          comment: `Зона: ${cart.zoneId || "unknown"}. Позиций: ${cart.items.length}`,
          items: cart.items,
          total: totals.total,
          format: "delivery",
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Сеть недоступна");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Не удалось отправить заявку");
      }
      setSubmitted(true);
      setStep(3);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Неизвестная ошибка";
      setSubmitError(`Не удалось отправить: ${msg}. Позвоните +7 (812) 919-59-11.`);
    } finally {
      setSubmitting(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Текущая зона (для скрытия термобокса)
  const currentZone = DELIVERY_ZONES.find((z) => z.id === cart.zoneId);
  const showThermobox = currentZone ? !currentZone.coldChain : false;

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2">Заказ доставки кейтеринга</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Соберите заказ из нашего меню — привезём готовые блюда на дом или в офис. Без персонала
            и посуды, только еда.
          </p>
        </div>

        {/* Progress */}
        <div
          className="mx-auto mb-8 flex max-w-2xl gap-1"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${i <= step ? "bg-gold-text" : "bg-muted"}`}
              />
              <span
                className={`text-[10px] ${i === step ? "text-gold-text font-semibold" : "text-muted-foreground"}`}
              >
                {label}
              </span>
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
                  <h3 className="font-heading mb-3 text-lg font-medium">Быстрый старт</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {DELIVERY_PRESETS.map((preset) => (
                      <div key={preset.id} className="border-line bg-card rounded-xl border p-4">
                        <span className="mb-1 block text-2xl">{preset.emoji}</span>
                        <h4 className="mb-0.5 text-sm font-semibold">{preset.label}</h4>
                        <p className="text-muted-foreground mb-2 text-[10px]">
                          {preset.description}
                        </p>
                        <span className="text-gold-text text-xs font-semibold">
                          ~{preset.estimatedTotal.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground py-8 text-center text-sm">
                  Загрузка каталога блюд…
                </p>
              </div>
            )}
            {step > 0 && (
              <div className="text-muted-foreground py-12 text-center text-sm">Загрузка формы…</div>
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
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-heading text-lg font-medium">Быстрый старт</h3>
                      <span className="text-muted-foreground text-xs">или соберите сами ↓</span>
                    </div>
                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {DELIVERY_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => cart.applyPreset(preset.id)}
                          className="border-line bg-card hover:border-gold-text rounded-xl border p-4 text-left transition-all hover:shadow-sm"
                        >
                          <span className="mb-1 block text-2xl">{preset.emoji}</span>
                          <h4 className="mb-0.5 text-sm font-semibold">{preset.label}</h4>
                          <p className="text-muted-foreground mb-2 line-clamp-2 text-[10px]">
                            {preset.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-gold-text text-xs font-semibold">
                              ~{preset.estimatedTotal.toLocaleString("ru-RU")} ₽
                            </span>
                            <span className="text-muted-foreground text-[10px]">
                              {preset.items.length} блюд
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mb-4 text-center">
                      <p className="text-muted-foreground text-xs">
                        1 порция = 1 гость. На 10 человек: 5-7 блюд × 10 порций = 50-70 порций.
                      </p>
                    </div>
                  </div>
                )}

                {/* Sticky cart summary */}
                <div className="border-gold-tint bg-gold-tint/30 mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                  <div>
                    <p className="text-muted-foreground text-xs">
                      Позиций: <strong className="text-foreground">{cart.items.length}</strong>
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Мин. заказ:{" "}
                      <strong className="text-foreground">
                        {MIN_ORDER_AMOUNT.toLocaleString("ru-RU")} ₽
                      </strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-heading text-gold-text text-2xl font-bold tabular-nums">
                      {totals.subtotal.toLocaleString("ru-RU")} ₽
                    </p>
                    {!totals.meetsMinimum && cart.items.length > 0 && (
                      <p className="text-warning text-xs">
                        Ещё {totals.remainingToMin.toLocaleString("ru-RU")} ₽ до минимума
                      </p>
                    )}
                    {totals.meetsMinimum && (
                      <p className="text-success text-xs">Минимум достигнут</p>
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
                  <div className="border-line mt-6 rounded-xl border border-dashed p-4 text-center">
                    <p className="text-muted-foreground text-sm">
                      На 10 человек возьмите 5-7 разных блюд × по 10 порций = 50-70 порций всего. 1
                      порция рассчитана на 1 гостя.
                    </p>
                  </div>
                )}

                {cart.items.length > 0 && (
                  <div className="bg-gold-tint/30 text-muted-foreground mt-4 rounded-lg p-3 text-center text-xs">
                    1 порция = 1 гость. На N гостей берите по N порций каждого блюда. Пресет
                    «Семейный ужин на 10» = 6 блюд × 10 порций = 60 порций на 10 человек.
                  </div>
                )}
              </div>
            )}

            {/* === Step 1: Delivery zone + time === */}
            {step === 1 && (
              <div className="mx-auto max-w-3xl">
                <h2 className="font-heading mb-4 text-xl">
                  Зона доставки{" "}
                  {!cart.zoneId && <span className="text-warning ml-2 text-xs">выберите зону</span>}
                </h2>
                <div className="mb-8 grid gap-3 sm:grid-cols-2">
                  {DELIVERY_ZONES.map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => cart.setZone(zone.id)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        cart.zoneId === zone.id
                          ? "border-gold-text bg-gold-tint ring-gold-text ring-1"
                          : "border-line bg-card hover:border-gold-text"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-heading text-sm font-medium">{zone.name}</h3>
                        <span
                          className={`text-xs font-semibold ${zone.surcharge === 0 ? "text-success" : "text-gold-text"}`}
                        >
                          {zone.surcharge === 0
                            ? "Бесплатно"
                            : `+${zone.surcharge.toLocaleString("ru-RU")} ₽`}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2 text-xs">
                        {zone.surcharge === 0
                          ? `${zone.distance} — в черте города`
                          : `${zone.distance} за КАД`}
                      </p>
                      <div className="text-muted-foreground space-y-0.5 text-[10px]">
                        <p>
                          Холодовая цепь:{" "}
                          {zone.coldChain ? "сумки-холодильники +2…+6 °C" : "только термобоксы"}
                        </p>
                        <p>⏱ До {zone.slaHours} ч</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Thermobox — только для зон без холодовой цепи */}
                {showThermobox && (
                  <div className="border-warning/30 bg-warning/5 mb-6 rounded-xl border p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={cart.needThermobox}
                        onChange={(e) => cart.setThermobox(e.target.checked)}
                        className="accent-gold-text mt-1"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          Аренда термобокса (залог 1 500 ₽, возвращается при сдаче)
                        </p>
                        <p className="text-muted-foreground text-xs">
                          В вашей зоне нет холодовой цепи — рекомендуем термобокс для сохранения
                          свежести блюд.
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {/* Time slot — узкие 2-часовые окна */}
                <h2 className="font-heading mb-4 text-xl">Время доставки</h2>
                <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => cart.setContact({ timeSlot: slot.id })}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        cart.contact.timeSlot === slot.id
                          ? "border-gold-text bg-gold-tint ring-gold-text ring-1"
                          : "border-line bg-card hover:border-gold-text"
                      }`}
                    >
                      <span className="mb-1 block text-lg">{slot.icon}</span>
                      <span className="block text-[11px] leading-tight font-medium">
                        {slot.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Точное время — для запланированных ужинов */}
                <div className="border-line bg-card mb-6 rounded-xl border p-4">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">
                      ⏰ Точное время подачи (необязательно)
                    </span>
                    <p className="text-muted-foreground mb-2 text-xs">
                      Для запланированных мероприятий — укажите, к какому часу подать еду
                    </p>
                    <input
                      type="time"
                      value={cart.contact.exactTime}
                      onChange={(e) => cart.setContact({ exactTime: e.target.value })}
                      className="border-line bg-background focus:border-gold-text focus-visible:outline-gold rounded-lg border px-3 py-2 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                  </label>
                  <label className="mt-3 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={cart.contact.callAhead}
                      onChange={(e) => cart.setContact({ callAhead: e.target.checked })}
                      className="accent-gold-text"
                    />
                    <span className="text-xs">Позвонить за 30 минут до прибытия</span>
                  </label>
                </div>

                {/* Live total preview */}
                <div className="border-line bg-card space-y-2 rounded-xl border p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Стоимость блюд</span>
                    <span>{totals.subtotal.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>
                      {totals.delivery === 0
                        ? "Бесплатно"
                        : `${totals.delivery.toLocaleString("ru-RU")} ₽`}
                    </span>
                  </div>
                  {totals.thermobox > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Термобокс (залог)</span>
                      <span>{totals.thermobox.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  )}
                  <div className="border-line flex justify-between border-t pt-2 font-semibold">
                    <span>Итого</span>
                    <span className="text-gold-text text-lg">
                      {totals.total.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* === Step 2: Contacts + address === */}
            {step === 2 && (
              <div className="mx-auto max-w-2xl">
                <h2 className="font-heading mb-4 text-center text-xl">Контакты и адрес</h2>

                {/* Контактные данные */}
                <div className="mb-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Имя *"
                      value={cart.contact.name}
                      onChange={(e) => cart.setContact({ name: e.target.value })}
                      className="border-line bg-card focus:border-gold-text focus-visible:outline-gold rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__ *"
                      value={cart.contact.phone}
                      onChange={(e) => cart.setContact({ phone: e.target.value })}
                      className="border-line bg-card focus:border-gold-text focus-visible:outline-gold rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Адрес доставки *"
                    value={cart.contact.address}
                    onChange={(e) => cart.setContact({ address: e.target.value })}
                    className="border-line bg-card focus:border-gold-text focus-visible:outline-gold w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                  />

                  {/* Для загородной доставки — поля подъезд/этаж/домофон */}
                  {cart.zoneId === "kad" && (
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Подъезд"
                        value={cart.contact.entrance}
                        onChange={(e) => cart.setContact({ entrance: e.target.value })}
                        className="border-line bg-card focus:border-gold-text focus-visible:outline-gold rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                      />
                      <input
                        type="text"
                        placeholder="Этаж"
                        value={cart.contact.floor}
                        onChange={(e) => cart.setContact({ floor: e.target.value })}
                        className="border-line bg-card focus:border-gold-text focus-visible:outline-gold rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                      />
                      <input
                        type="text"
                        placeholder="Код домофона"
                        value={cart.contact.intercom}
                        onChange={(e) => cart.setContact({ intercom: e.target.value })}
                        className="border-line bg-card focus:border-gold-text focus-visible:outline-gold rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                      />
                    </div>
                  )}

                  {/* Для загородной доставки — поля код ворот/КП/участок */}
                  {cart.zoneId !== "kad" && (
                    <div className="border-gold-tint bg-gold-tint/20 space-y-2 rounded-xl border p-3">
                      <p className="text-muted-foreground text-xs">
                        Загородная доставка — заполните, чтобы курьер нашёл вас:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Название КП / СНТ / посёлка"
                          value={cart.contact.entrance}
                          onChange={(e) => cart.setContact({ entrance: e.target.value })}
                          className="border-line bg-card focus:border-gold-text focus-visible:outline-gold inline-flex min-h-[44px] items-center rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                        />
                        <input
                          type="text"
                          placeholder="№ участка / дома"
                          value={cart.contact.floor}
                          onChange={(e) => cart.setContact({ floor: e.target.value })}
                          className="border-line bg-card focus:border-gold-text focus-visible:outline-gold inline-flex min-h-[44px] items-center rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Код ворот / как проехать (необязательно)"
                        value={cart.contact.intercom}
                        onChange={(e) => cart.setContact({ intercom: e.target.value })}
                        className="border-line bg-card focus:border-gold-text focus-visible:outline-gold inline-flex min-h-[44px] w-full items-center rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                      />
                    </div>
                  )}

                  {/* Квартира/офис — только для зоны kad */}
                  {cart.zoneId === "kad" && (
                    <input
                      type="text"
                      placeholder="Квартира / офис (необязательно)"
                      value={cart.contact.apartment}
                      onChange={(e) => cart.setContact({ apartment: e.target.value })}
                      className="border-line bg-card focus:border-gold-text focus-visible:outline-gold w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                  )}

                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs">
                      Дата доставки *
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={cart.contact.date}
                      onChange={(e) => cart.setContact({ date: e.target.value })}
                      className="border-line bg-card focus:border-gold-text focus-visible:outline-gold w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                    />
                  </div>

                  {/* Способ оплаты */}
                  <div>
                    <label className="text-muted-foreground mb-1 block text-xs">
                      Способ оплаты
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {PAYMENT_METHODS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => cart.setContact({ paymentMethod: m.id })}
                          className={`rounded-xl border p-2.5 text-center transition-all ${
                            cart.contact.paymentMethod === m.id
                              ? "border-gold-text bg-gold-tint ring-gold-text ring-1"
                              : "border-line bg-card hover:border-gold-text"
                          }`}
                        >
                          <span className="mb-0.5 block text-base">{m.icon}</span>
                          <span className="text-[10px] font-medium">{m.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    placeholder="Комментарий к заказу (особые пожелания, аллергии гостей, код ворот и т.д.)"
                    value={cart.contact.comment}
                    onChange={(e) => cart.setContact({ comment: e.target.value })}
                    className="border-line bg-card focus:border-gold-text focus-visible:outline-gold min-h-[80px] w-full resize-none rounded-xl border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
                  />
                </div>

                {/* Order summary */}
                <div className="border-line bg-card mb-6 space-y-2 rounded-xl border p-4 text-sm">
                  <h3 className="mb-2 font-medium">Ваш заказ:</h3>
                  <ul className="text-muted-foreground max-h-40 space-y-1 overflow-y-auto text-xs">
                    {cart.items.map((item) => {
                      const dish = ALL_DISHES.find((d) => d.id === item.dishId);
                      if (!dish) return null;
                      return (
                        <li key={item.dishId} className="flex justify-between">
                          <span>
                            {dish.name} × {item.qty}
                          </span>
                          <span className="tabular-nums">
                            {(dish.pricePerGuest * item.qty).toLocaleString("ru-RU")} ₽
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <hr className="border-line" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Блюда</span>
                    <span>{totals.subtotal.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>
                      {totals.delivery === 0
                        ? "Бесплатно"
                        : `${totals.delivery.toLocaleString("ru-RU")} ₽`}
                    </span>
                  </div>
                  {totals.thermobox > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Термобокс (залог)</span>
                      <span>{totals.thermobox.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  )}
                  <div className="border-line flex justify-between border-t pt-2 font-semibold">
                    <span>Итого</span>
                    <span className="text-gold-text text-lg">
                      {totals.total.toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>

                {/* Min order warning */}
                {!totals.meetsMinimum && (
                  <div className="border-warning/30 bg-warning/10 text-warning mb-4 rounded-xl border p-3 text-center text-xs">
                    Минимальный заказ — {MIN_ORDER_AMOUNT.toLocaleString("ru-RU")} ₽. Добавьте ещё
                    на {totals.remainingToMin.toLocaleString("ru-RU")} ₽.
                  </div>
                )}

                {/* Trust badges перед кнопкой отправки */}
                <div className="text-muted-foreground mb-4 flex flex-wrap items-center justify-center gap-4 text-xs">
                  <span>4.8 средняя оценка</span>
                  <span>·</span>
                  <span>С 2007 года</span>
                  <span>·</span>
                  <span>27 отзывов · 4.8/5</span>
                  <span>·</span>
                  <span>Курьер позвонит за 30 мин</span>
                </div>
              </div>
            )}

            {/* === Step 3: Done === */}
            {step === 3 && submitted && (
              <div className="mx-auto max-w-md py-8 text-center">
                <span className="mb-4 block text-5xl">✅</span>
                <h2 className="font-heading mb-2 text-xl font-medium">Заказ принят!</h2>
                <p className="text-muted-foreground mb-2">
                  Мы свяжемся с вами по телефону{" "}
                  <strong className="text-foreground">{cart.contact.phone}</strong> для
                  подтверждения.
                </p>
                <p className="text-muted-foreground mb-6 text-sm">
                  Доставка: <strong className="text-foreground">{cart.contact.date}</strong>
                  {cart.contact.exactTime && (
                    <>
                      к <strong className="text-foreground">{cart.contact.exactTime}</strong>
                    </>
                  )}
                  {!cart.contact.exactTime && (
                    <>· {TIME_SLOTS.find((s) => s.id === cart.contact.timeSlot)?.label}</>
                  )}
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="text-gold-text text-sm font-semibold hover:underline">
                    На главную →
                  </Link>
                  <button
                    onClick={() => {
                      cart.reset();
                      setStep(0);
                      setSubmitted(false);
                    }}
                    className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                  >
                    Оформить новый заказ
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {step < 3 && (
              <div className="mx-auto mt-8 flex max-w-md justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    ← Назад
                  </button>
                ) : (
                  <Link
                    href="/delivery"
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    ← Зоны доставки
                  </Link>
                )}
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canNext}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    Далее
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canNext || !totals.meetsMinimum || submitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-8 py-3 text-sm font-semibold transition-colors disabled:opacity-50"
                  >
                    {submitting ? "Отправляем..." : "Оформить заказ"}
                  </button>
                )}
                {submitError && <p className="mt-2 text-sm text-red-600">{submitError}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
