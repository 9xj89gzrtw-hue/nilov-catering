'use client';

import { useState } from 'react';
import Link from 'next/link';

type Format = 'furshet' | 'banket' | 'coffee-break' | 'detskoe' | 'chef-at-home';
type Tier = 'economy' | 'standard' | 'premium' | 'luxury';

interface TariffPrice {
  format: Format;
  label: string;
  icon: string;
  desc: string;
  minGuests: number;
  prices: Record<Tier, number>;
}

const TARIFFS: TariffPrice[] = [
  { format: 'furshet', label: 'Фуршет', icon: '🥪', desc: 'Стоячий приём, лёгкие закуски', minGuests: 20, prices: { economy: 2450, standard: 3450, premium: 4350, luxury: 5350 } },
  { format: 'banket', label: 'Банкет', icon: '🍽️', desc: 'Посадка за стол, официанты', minGuests: 15, prices: { economy: 4470, standard: 5470, premium: 5970, luxury: 6970 } },
  { format: 'coffee-break', label: 'Кофе-брейк', icon: '☕', desc: 'Кофе, выпечка, десерты', minGuests: 10, prices: { economy: 390, standard: 1450, premium: 1950, luxury: 2450 } },
  { format: 'detskoe', label: 'Детский', icon: '🎈', desc: 'Меню для детей, аниматор', minGuests: 10, prices: { economy: 1950, standard: 2450, premium: 2950, luxury: 3450 } },
  { format: 'chef-at-home', label: 'Шеф на дом', icon: '👨‍🍳', desc: 'Шеф готовит у вас', minGuests: 4, prices: { economy: 2500, standard: 4500, premium: 7500, luxury: 10000 } },
];

const TIER_ORDER: Tier[] = ['economy', 'standard', 'premium', 'luxury'];
const TIER_LABEL: Record<Tier, string> = { economy: 'Эконом', standard: 'Стандарт', premium: 'Расширенный', luxury: 'Максимальный' };
const QUICK_GUESTS = [10, 20, 30, 50, 100, 150, 200, 300, 500];

export default function ConstructorWizard() {
  const [step, setStep] = useState(0);
  const [format, setFormat] = useState<Format | null>(null);
  const [guests, setGuests] = useState(20);
  const [tier, setTier] = useState<Tier | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const tariff = format ? TARIFFS.find(t => t.format === format) : null;
  const pricePerGuest = tariff && tier ? tariff.prices[tier] : 0;
  const total = pricePerGuest * guests;
  const canNext = step === 0 ? format !== null : step === 1 ? guests >= 10 : step === 2 ? tier !== null : true;

  const handleNext = () => { if (canNext) setStep(s => Math.min(s + 1, 5)); };
  const handlePrev = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-6 text-center">Конструктор меню</h1>

        {/* Progress */}
        <div className="flex gap-1 mb-8" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={6}>
          {['Формат', 'Гости', 'Тариф', 'Итог', 'Контакты', 'Готово'].map((label, i) => (
            <div key={label} className={`flex-1 h-1.5 rounded-full transition-colors ${i <= step ? 'bg-gold-text' : 'bg-muted'}`} />
          ))}
        </div>

        {/* Live price */}
        {format && guests > 0 && tier && (
          <div className="mb-6 p-4 rounded-xl border border-gold-tint bg-gold-tint/50 text-center">
            <span className="text-lg font-bold text-gold-text">{guests} гостей · {tariff?.label} · {TIER_LABEL[tier]} = {total.toLocaleString()} ₽</span>
          </div>
        )}

        {/* Step 0: Format */}
        {step === 0 && (
          <div>
            <p className="text-muted-foreground mb-6 text-center">Выберите формат мероприятия</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {TARIFFS.map(t => (
                <button key={t.format} type="button"
                  onClick={() => { setFormat(t.format); }}
                  className={`rounded-xl border p-5 text-left transition-all ${format === t.format ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                  <span className="text-3xl mb-2 block">{t.icon}</span>
                  <h3 className="font-heading text-lg font-medium mb-1">{t.label}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
                  <span className="text-xs text-gold-text font-semibold">от {t.minGuests} гостей</span>
                  <span className="text-xs text-muted-foreground block mt-1">от {t.prices.economy.toLocaleString()} ₽/гость</span>
                </button>
              ))}
            </div>
            <div className="text-center">
              <Link href="/plan/helper" className="text-sm text-muted-foreground hover:text-gold-text transition-colors">🤔 Не знаете, что выбрать? Подберём за 3 вопроса →</Link>
            </div>
          </div>
        )}

        {/* Step 1: Guests */}
        {step === 1 && (
          <div className="max-w-lg mx-auto text-center">
            <p className="text-muted-foreground mb-4">Сколько гостей?</p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <button type="button" onClick={() => setGuests(Math.max(10, guests - 5))}
                className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-xl hover:border-gold-text">−</button>
              <div className="text-center">
                <span className="text-6xl font-heading text-gold-text">{guests}</span>
                <p className="text-muted-foreground mt-1">гостей</p>
              </div>
              <button type="button" onClick={() => setGuests(Math.min(500, guests + 5))}
                className="w-12 h-12 rounded-full border border-line flex items-center justify-center text-xl hover:border-gold-text">+</button>
            </div>
            <input type="range" min={10} max={500} step={5} value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              className="w-full mb-4 accent-gold-text" />
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {QUICK_GUESTS.map(n => (
                <button key={n} type="button" onClick={() => setGuests(n)}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${guests === n ? 'border-gold-text bg-gold-tint text-gold-text' : 'border-line text-muted-foreground hover:border-gold-text'}`}>{n}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tier */}
        {step === 2 && tariff && (
          <div className="max-w-lg mx-auto">
            <p className="text-muted-foreground mb-6 text-center">Выберите тариф</p>
            <div className="space-y-3">
              {TIER_ORDER.map(t => {
                const price = tariff.prices[t];
                const isRec = t === 'standard';
                return (
                  <button key={t} type="button" onClick={() => setTier(t)}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${tier === t ? 'border-gold-text bg-gold-tint ring-1 ring-gold-text' : 'border-line bg-card hover:border-gold-text'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-heading text-lg font-medium">{TIER_LABEL[t]}</span>
                        {isRec && <span className="ml-2 text-xs bg-gold-text text-white px-2 py-0.5 rounded">Рекомендуем</span>}
                      </div>
                      <span className="text-gold-text font-semibold text-lg">{price.toLocaleString()} ₽/гость</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{guests} × {price.toLocaleString()} = {(guests * price).toLocaleString()} ₽</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && tariff && tier && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-xl border border-line bg-card p-6 space-y-3 mb-6">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Формат</span><span className="font-medium">{tariff.label}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Гости</span><span className="font-medium">{guests}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Тариф</span><span className="font-medium">{TIER_LABEL[tier]}</span></div>
              <hr className="border-line" />
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Стоимость</span><span className="font-medium">{(guests * tariff.prices[tier]).toLocaleString()} ₽</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Доставка</span><span className="font-medium">в пределах КАД</span></div>
              <div className="flex justify-between text-base font-semibold pt-2 border-t border-line">
                <span>Итого</span><span className="text-gold-text text-xl">{(guests * tariff.prices[tier]).toLocaleString()} ₽</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-4">Для точной сметы с персоналом, посудой и доп. услугами — отправьте заявку.</p>
          </div>
        )}

        {/* Step 4: Contact */}
        {step === 4 && (
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
                  <input type="text" placeholder="Ваше имя *" value={name} onChange={e => setName(e.target.value)}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                  <input type="tel" placeholder="+7 (___) ___-__-__ *" value={phone} onChange={e => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm focus:outline-none focus:border-gold-text" />
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 5: Done */}
        {step === 5 && (
          <div className="text-center py-8">
            <span className="text-5xl block mb-4">🎉</span>
            <h2 className="text-xl font-heading font-medium mb-2">Заявка принята!</h2>
            <p className="text-muted-foreground mb-6">Менеджер свяжется с вами в ближайшее время для уточнения деталей.</p>
            <Link href="/pricing" className="text-gold-text font-semibold hover:underline">Посмотреть тарифы →</Link>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 max-w-lg mx-auto">
          {step > 0 ? (
            <button type="button" onClick={handlePrev} className="text-sm text-muted-foreground hover:text-foreground">← Назад</button>
          ) : <div />}
          {step < 4 ? (
            <button type="button" onClick={handleNext} disabled={!canNext}
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
              {step === 3 ? 'Отправить заявку' : 'Далее'}
            </button>
          ) : step === 4 && !submitted ? (
            <button type="button" onClick={() => setSubmitted(true)} disabled={!name || !phone}
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-colors">
              Отправить
            </button>
          ) : step === 4 && submitted ? (
            <button type="button" onClick={() => setStep(5)}
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Продолжить
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}