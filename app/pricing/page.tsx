import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import BudgetCalculator from '@/components/interactive/BudgetCalculator';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';
import PrintButton from '@/components/common/PrintButton';
import { FileText, FileSignature, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing', languages: { 'ru': '/pricing', 'en': '/en', 'x-default': '/pricing' } },
  title: 'Тарифы и цены',
  description: 'Прозрачные цены на кейтеринг в СПб. Фуршет от 2 450 ₽/гость, банкет от 3 950 ₽/гость, кофе-брейк от 390 ₽/гость. Все тарифы с полным составом меню.',
};

// Force static rendering — removes cookie/searchParams dependency that prevents prerender
export const dynamic = 'force-static';

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
            <>
              <Link
                href="/api/templates/dogovor"
                download="nilov-dogovor-template.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline"
                title="Шаблон договора на оказание кейтеринговых услуг"
              >
                <FileText className="w-4 h-4" aria-hidden="true" />
                Договор PDF
              </Link>
              <Link
                href="/api/templates/nda"
                download="nilov-nda-template.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline"
                title="Шаблон соглашения о неразглашении (NDA)"
              >
                <FileSignature className="w-4 h-4" aria-hidden="true" />
                NDA PDF
              </Link>
              <Link
                href="/api/templates/sla"
                download="nilov-sla-template.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors touch-target no-underline"
                title="Шаблон SLA — уровень обслуживания для B2B"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                SLA PDF
              </Link>
              <PrintButton label="Печать тарифов" />
            </>
          }
        />

        {/* Quick navigation to event types — visible in SSR, no JS needed */}
        <nav className="mb-8 flex flex-wrap gap-2" aria-label="Быстрая навигация по типам событий">
          <Link href="/pricing?event=svadba" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Свадьба</Link>
          <Link href="/pricing?event=korporativ" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">💼 Корпоратив</Link>
          <Link href="/pricing?event=vypusknoy" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">🎓 Выпускной</Link>
          <Link href="/pricing?event=coffee-break" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">☕ Кофе-брейк</Link>
          <Link href="/pricing?event=detskoe" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Детское</Link>
          <Link href="/pricing?event=pominki" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Поминки</Link>
          <Link href="/pricing?event=chastnoe" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">🥂 Частное</Link>
          <Link href="/pricing?event=chef-at-home" className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-gold-text transition-colors no-underline">Шеф на дом</Link>
        </nav>

        <section className="mb-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <BudgetCalculator variant="inline" defaultGuests={50} defaultTariff="furshet-standard" />
          </div>
        </section>

        {/* Scarcity — conversion optimization */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900">Пиковый сезон: занято 80% выходных дат</p>
            <p className="text-xs text-amber-700">Июнь-август — высокий спрос. Забронируйте дату сейчас — менеджер подтвердит за 15 минут.</p>
          </div>
        </div>

        <TariffOffersSection />

        {/* SSR price summary table — visible without JS, all event types at once */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-medium mb-4">Сводная таблица цен</h2>
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
                <tr className="border-t border-line"><td scope="row" className="p-3" rowSpan={4}>Свадьба</td><td className="p-3">Эконом</td><td className="p-3 text-right font-semibold text-gold-text">3 950 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td className="p-3">Стандарт</td><td className="p-3 text-right font-semibold text-gold-text">5 470 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td className="p-3">Расширенный</td><td className="p-3 text-right font-semibold text-gold-text">7 350 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td className="p-3">Максимальный</td><td className="p-3 text-right font-semibold text-gold-text">9 950 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line bg-secondary/30"><td scope="row" className="p-3">Кофе-брейк</td><td className="p-3">Эконом</td><td className="p-3 text-right font-semibold text-gold-text">390 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line"><td scope="row" className="p-3">Корпоратив</td><td className="p-3">Фуршет</td><td className="p-3 text-right font-semibold text-gold-text">2 450 ₽</td><td className="p-3 text-right">20</td></tr>
                <tr className="border-t border-line"><td scope="row" className="p-3">Корпоратив</td><td className="p-3">Банкет</td><td className="p-3 text-right font-semibold text-gold-text">3 950 ₽</td><td className="p-3 text-right">30</td></tr>
                <tr className="border-t border-line"><td scope="row" className="p-3" rowSpan={2}>Поминки</td><td className="p-3">Базовый</td><td className="p-3 text-right font-semibold text-gold-text">1 800 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line"><td className="p-3">Расширенный</td><td className="p-3 text-right font-semibold text-gold-text">2 500 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line bg-secondary/30"><td scope="row" className="p-3">Детское</td><td className="p-3">Стандарт</td><td className="p-3 text-right font-semibold text-gold-text">1 550 ₽</td><td className="p-3 text-right">10</td></tr>
                <tr className="border-t border-line"><td scope="row" className="p-3">Шеф на дом</td><td className="p-3">Премиум</td><td className="p-3 text-right font-semibold text-gold-text">5 000 ₽</td><td className="p-3 text-right">6</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Все цены включают: еду, персонал, посуду, доставку по КАД. Доставка за КАД — от 3 000 ₽.</p>
        </section>

        {/* Competitive comparison — moat visualization */}
        <section className="mt-12">
          <h2 className="font-heading text-2xl font-medium mb-4">Почему NiloV, а не другие</h2>
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
                  { p: 'Халяль сертификат СМР', n: '✅', a: '❌', e: '❌', c: '❌' },
                  { p: 'Страхование ГО 5-30М₽', n: '✅', a: '❌', e: 'до 1М₽', c: '❌' },
                  { p: '14 аллергенов (ТР ТС 022/2011)', n: '✅', e: '8', a: '6', c: '0' },
                  { p: 'Опыт (лет)', n: '17', a: '12', e: '18', c: '8' },
                  { p: 'Событий проведено', n: '3000+', a: '~1500', e: '~2000', c: '~800' },
                  { p: 'Блюд в каталоге', n: '124', a: '80', e: '100', c: '60' },
                  { p: 'Онлайн-конструктор меню', n: '✅', a: '❌', e: '❌', c: '✅' },
                  { p: 'Budget Calculator с НДС', n: '✅', a: '❌', e: '❌', c: '❌' },
                  { p: 'Поминки (без алкоголя)', n: '✅', a: '❌', e: '❌', c: '❌' },
                  { p: 'Шеф на дом', n: '✅', a: '❌', e: '✅', c: '❌' },
                  { p: 'ЭДО (Диадок + СБИС)', n: '✅', a: '❌', e: '❌', c: '✅' },
                ].map((row, i) => (
                  <tr key={i} className={`border-t border-line ${i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}>
                    <td className="p-3 font-medium">{row.p}</td>
                    <td className="p-3 text-center font-bold text-gold-text">{row.n}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.a}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.e}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Данные на основе открытых источников (сайты конкурентов, отзывы). Май 2025.
            Если у конкурентов появились обновления — сообщите, обновим таблицу.
          </p>
        </section>

        {/* Referral program */}
        <section className="mt-8 p-5 rounded-xl border-2 border-dashed border-gold-text/30 bg-gold-tint/5 text-center">
          <p className="text-sm font-medium mb-1">🎁 Рекомендуйте нас — получайте бонусы</p>
          <p className="text-xs text-muted-foreground">
            Поделитесь ссылкой с друзьями. За каждый рекомендованный заказ — скидка 500 ₽ на следующее мероприятие.
          </p>
        </section>
      </div>
    </main>
  );
}
