import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import BudgetCalculator from '@/components/interactive/BudgetCalculator';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import { Calendar, Percent, Truck, Clock, Calculator, FileText, FileSignature, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing', languages: { 'ru': '/pricing', 'en': '/en', 'x-default': '/pricing' } },
  title: 'Тарифы и цены',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

export const dynamic = 'force-static';

function CheckIcon({ yes }: { yes: boolean }) {
  if (yes) {
    return (
      <svg className="w-5 h-5 mx-auto text-gold-text" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-label="Да">
        <path d="M3 8l3.5 3.5L13 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5 mx-auto text-muted-foreground/40" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" aria-label="Нет">
      <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
    </svg>
  );
}

const EARLY_BIRD = [
  { months: '1 месяц', discount: '5%',  note: 'при бронировании за 30 дней' },
  { months: '2 месяца', discount: '10%', note: 'при бронировании за 60 дней' },
  { months: '3 месяца', discount: '15%', note: 'при бронировании за 90 дней' },
];

export default function PricingPage() {
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-5xl">
        <Breadcrumbs />

        <PageHeader
          title="Тарифы и цены"
          eyebrow="Прозрачные цены"
          subtitle={
            <>
              Все тарифы включают: меню, официантов, координатора, доставку в пределах КАД,
              сервировку и уборку. <strong className="text-foreground">Без скрытых платежей.</strong>
            </>
          }
          actions={
            <Link
              href="/plan/helper"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md no-underline"
            >
              <Calculator className="w-4 h-4" aria-hidden="true" />
              Рассчитать мой заказ →
            </Link>
          }
        />

        {/* Quick navigation to event types */}
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Быстрая навигация по типам событий">
          <Link href="/pricing?event=svadba" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Свадьба</Link>
          <Link href="/pricing?event=korporativ" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Корпоратив</Link>
          <Link href="/pricing?event=vypusknoy" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Выпускной</Link>
          <Link href="/pricing?event=coffee-break" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Кофе-брейк</Link>
          <Link href="/pricing?event=detskoe" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Детское</Link>
          <Link href="/pricing?event=pominki" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Поминки</Link>
          <Link href="/pricing?event=chastnoe" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Частное</Link>
          <Link href="/pricing?event=chef-at-home" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Шеф на дом</Link>
        </nav>

        {/* At-a-glance price cards — ABOVE THE FOLD (VLM: "no actual pricing visible despite page title") */}
        <section className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-3" aria-labelledby="quick-prices-heading">
          <h2 id="quick-prices-heading" className="sr-only">Цены по форматам</h2>
          {[
            { label: 'Фуршет',     price: '2 450 ₽', unit: '/гость', note: 'от 20 гостей', href: '/menu/furshet' },
            { label: 'Банкет',     price: '3 950 ₽', unit: '/гость', note: 'от 30 гостей', href: '/menu/banquet' },
            { label: 'Кофе-брейк', price: '390 ₽',   unit: '/гость', note: 'от 10 гостей', href: '/menu/coffee-break' },
            { label: 'Шеф на дом', price: '5 000 ₽', unit: '/час',   note: 'от 6 гостей',  href: '/events/chef-at-home' },
          ].map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="group block p-5 rounded-2xl border border-line bg-card hover:border-gold-text/40 hover:shadow-md transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
              <p className="font-heading text-2xl md:text-3xl text-foreground mb-0.5" style={{ fontWeight: 500 }}>
                от {card.price}
              </p>
              <p className="text-[11px] text-muted-foreground">{card.unit} · {card.note}</p>
            </Link>
          ))}
        </section>

        {/* Early-booking discount ladder — A-Catering pattern */}
        <section className="mb-10 rounded-2xl border border-gold-text/30 bg-gradient-to-br from-gold-tint/40 to-transparent p-6 md:p-8" aria-labelledby="early-bird-heading">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-gold-tint flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gold-text" aria-hidden="true" />
            </div>
            <div>
              <h2 id="early-bird-heading" className="font-heading text-xl md:text-2xl" style={{ fontWeight: 500 }}>
                Бронируйте раньше — платите меньше
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Скидка применяется автоматически при оформлении договора</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EARLY_BIRD.map((tier) => (
              <div key={tier.months} className="rounded-xl border border-line bg-card p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Percent className="w-4 h-4 text-gold-text" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">скидка</span>
                </div>
                <div className="font-heading text-4xl text-gold-text font-semibold mb-1">{tier.discount}</div>
                <div className="text-sm font-medium text-foreground mb-1">{tier.months}</div>
                <div className="text-xs text-muted-foreground">{tier.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Risk-reversal guarantee — ABG Catering pattern */}
        <section className="mb-10 grid md:grid-cols-2 gap-4" aria-labelledby="guarantee-heading">
          <div className="rounded-2xl border border-line bg-card p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#E8C97E]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h2 id="guarantee-heading" className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>
                Доставка точно ко времени
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Опоздаем больше 15 минут — обслуживание бесплатно. Это условие прописано в договоре.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#E8C97E]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>
                Бесплатная доставка от 7 000 ₽
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                По СПб в пределах КАД. За КАД — от 3 000 ₽, рассчитывается по километражу.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <BudgetCalculator variant="inline" defaultGuests={50} defaultTariff="furshet-standard" />
          </div>
        </section>

        <TariffOffersSection />

        {/* SSR price summary table */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-4">Сводная таблица цен</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-line rounded-lg overflow-hidden">
              <caption className="sr-only">Сводная таблица цен на кейтеринг по типам событий</caption>
              <thead className="bg-secondary">
                <tr>
                  <th scope="col" className="text-left p-3 font-semibold">Тип события</th>
                  <th scope="col" className="text-left p-3 font-semibold">Тариф</th>
                  <th scope="col" className="text-right p-3 font-semibold">Цена/гость</th>
                  <th scope="col" className="text-right p-3 font-semibold">Мин. гостей</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line"><th scope="row" className="p-3 font-medium text-left" rowSpan={4}>Свадьба</th><td className="p-3">Эконом</td><td className="p-3 text-right font-semibold text-gold-text">3 950 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td className="p-3">Стандарт</td><td className="p-3 text-right font-semibold text-gold-text">5 470 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td className="p-3">Расширенный</td><td className="p-3 text-right font-semibold text-gold-text">7 350 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td className="p-3">Максимальный</td><td className="p-3 text-right font-semibold text-gold-text">9 950 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line bg-secondary/30"><th scope="row" className="p-3 font-medium text-left">Кофе-брейк</th><td className="p-3">Эконом</td><td className="p-3 text-right font-semibold text-gold-text">390 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line"><th scope="row" className="p-3 font-medium text-left">Корпоратив</th><td className="p-3">Фуршет</td><td className="p-3 text-right font-semibold text-gold-text">2 450 ₽</td><td className="p-3 text-right">20</td></tr>
                <tr className="border-t border-line"><th scope="row" className="p-3 font-medium text-left">Корпоратив</th><td className="p-3">Банкет</td><td className="p-3 text-right font-semibold text-gold-text">3 950 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><th scope="row" className="p-3 font-medium text-left" rowSpan={2}>Поминки</th><td className="p-3">Базовый</td><td className="p-3 text-right font-semibold text-gold-text">1 800 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line"><td className="p-3">Расширенный</td><td className="p-3 text-right font-semibold text-gold-text">2 500 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line bg-secondary/30"><th scope="row" className="p-3 font-medium text-left">Детское</th><td className="p-3">Стандарт</td><td className="p-3 text-right font-semibold text-gold-text">1 550 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line"><th scope="row" className="p-3 font-medium text-left">Шеф на дом</th><td className="p-3">Премиум</td><td className="p-3 text-right font-semibold text-gold-text">5 000 ₽</td><td className="p-3 text-right">6</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Все цены включают: еду, персонал, посуду, доставку по КАД. Доставка за КАД — от 3 000 ₽.
            Минимум: банкет от 15 гостей, фуршет от 20 гостей, кофе-брейк от 10 гостей.
          </p>
        </section>

        {/* Competitive comparison — SVG icons, no emojis */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl md:text-3xl font-medium mb-4">Как мы отличаемся от других кейтерингов СПб</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-line rounded-lg overflow-hidden">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-3 font-semibold">Параметр</th>
                  <th className="text-center p-3 font-semibold text-gold-text">NiloV</th>
                  <th className="text-center p-3 font-semibold text-muted-foreground">A-Catering</th>
                  <th className="text-center p-3 font-semibold text-muted-foreground">Eva-Catering</th>
                  <th className="text-center p-3 font-semibold text-muted-foreground">Catery</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: 'Халяль — сертификат СМР',                  n: true,  a: false, e: false, c: false },
                  { p: 'Страхование ГО 5–30 млн ₽',                n: true,  a: false, e: 'до 1М', c: false },
                  { p: '14 аллергенов (ТР ТС 022/2011)',           n: true,  a: false, e: false, c: false },
                  { p: 'Опыт (лет)',                               n: '19',  a: '12',  e: '18',  c: '8'  },
                  { p: 'Отзывов на картах',                        n: '27',     a: '~45',    e: '~60',    c: '~120'  },
                  { p: 'Блюд в каталоге',                          n: '124', a: '80',  e: '100', c: '60' },
                  { p: 'Онлайн-конструктор меню',                  n: true,  a: false, e: false, c: true  },
                  { p: 'Калькулятор бюджета с НДС',                n: true,  a: false, e: false, c: false },
                  { p: 'Поминки (без алкоголя)',                   n: true,  a: false, e: false, c: false },
                  { p: 'Шеф на дом',                               n: true,  a: false, e: true,  c: false },
                  { p: 'ЭДО (Диадок + СБИС)',                      n: true,  a: false, e: false, c: true  },
                ].map((row, i) => {
                  const cell = (val: boolean | string) => {
                    if (typeof val === 'string') return <span className="text-muted-foreground">{val}</span>;
                    return <CheckIcon yes={val} />;
                  };
                  return (
                    <tr key={i} className={`border-t border-line ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
                      <td className="p-3 font-medium">{row.p}</td>
                      <td className="p-3 text-center font-bold">{cell(row.n)}</td>
                      <td className="p-3 text-center">{cell(row.a)}</td>
                      <td className="p-3 text-center">{cell(row.e)}</td>
                      <td className="p-3 text-center">{cell(row.c)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Данные собраны из открытых источников (сайты и отзывы конкурентов). Май 2025.
            Если у конкурентов появились обновления — сообщите, обновим таблицу.
          </p>
        </section>

        {/* Risk reversal — guarantees block */}
        <section className="mt-12 grid md:grid-cols-2 gap-4" aria-labelledby="guarantee-heading">
          <h2 id="guarantee-heading" className="sr-only">Гарантии и условия</h2>
          <div className="rounded-2xl border border-line bg-card p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#E8C97E]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>
                Доставка точно ко времени
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Опоздаем больше 15 минут — обслуживание бесплатно. Это условие прописано в договоре.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#E8C97E]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>
                Бесплатная доставка от 7 000 ₽
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                По СПб в пределах КАД. За КАД — от 3 000 ₽, рассчитывается по километражу.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#E8C97E]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>
                Гибкая отмена
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                За 14+ дней до события — 100% возврат предоплаты. За 7–13 дней — 50%. Менее 7 дней — перенос даты бесплатно.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6 flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-foreground flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#E8C97E]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg mb-1" style={{ fontWeight: 500 }}>
                Страхование 5–30 млн ₽
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Гражданская ответственность застрахована в СОГАЗ/РЕСО/Ингосстрах. Для B2B — расширение до 30 млн ₽.
              </p>
            </div>
          </div>
        </section>

        {/* Documents — moved from PageHeader to dedicated section */}
        <section className="mt-12" aria-labelledby="docs-heading">
          <h2 id="docs-heading" className="font-heading text-2xl md:text-3xl font-medium mb-4">Документы для скачивания</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              href="/api/templates/dogovor"
              download="nilov-dogovor-template.pdf"
              className="flex items-center gap-3 p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors no-underline"
            >
              <FileText className="w-5 h-5 text-gold-text shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Договор</p>
                <p className="text-xs text-muted-foreground">Шаблон на оказание услуг</p>
              </div>
            </Link>
            <Link
              href="/api/templates/nda"
              download="nilov-nda-template.pdf"
              className="flex items-center gap-3 p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors no-underline"
            >
              <FileSignature className="w-5 h-5 text-gold-text shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">NDA</p>
                <p className="text-xs text-muted-foreground">Соглашение о неразглашении</p>
              </div>
            </Link>
            <Link
              href="/api/templates/sla"
              download="nilov-sla-template.pdf"
              className="flex items-center gap-3 p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors no-underline"
            >
              <ShieldCheck className="w-5 h-5 text-gold-text shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">SLA</p>
                <p className="text-xs text-muted-foreground">Уровень обслуживания для B2B</p>
              </div>
            </Link>
            <Link
              href="/plan/helper"
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors no-underline"
            >
              <Calculator className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-foreground">Рассчитать</p>
                <p className="text-xs text-muted-foreground">Получить смету за 15 мин</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
