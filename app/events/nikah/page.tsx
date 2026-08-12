import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Никах и ифтар — халяль-кейтеринг под ключ',
  description: 'Халяль-кейтеринг для никаха и ифтара. Сертификат Совета муфтиев России. Отдельное оборудование, без свинины, без алкоголя. Ифтар от 1 800 ₽/гость, никах от 3 950 ₽/гость.',
  alternates: { canonical: '/events/nikah', languages: { 'ru': '/events/nikah', 'x-default': '/events/nikah' } },
};

export default function NikahPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/events" className="hover:text-foreground">События</Link>
          {' / '}
          <span className="text-foreground">Никах и ифтар</span>
        </nav>
        <header className="mb-8">
          <p className="text-gold-text text-sm font-semibold uppercase tracking-wider mb-2">Халяль-кейтеринг</p>
          <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">Никах и ифтар</h1>
          <p className="text-lg text-muted-foreground mb-4 max-w-2xl">Полностью халяль-меню для никаха (мусульманской свадьбы) и ифтара (разговения в Рамадан).
            Сертификат Совета муфтиев России, отдельная линия производства, без свинины и алкоголя.
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-gold-text font-semibold">Никах от 3 950 ₽/гость</span> · мин. 15 гостей ·
            <span className="text-gold-text font-semibold">Ифтар от 1 800 ₽/гость</span> · мин. 20 гостей
          </p>
        </header>
        <div className="mb-10 p-5 rounded-xl border-2 border-gold-tint bg-gold-tint/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm font-medium">Рассчитаем меню под ваш бюджет и количество гостей</p>
          <div className="flex gap-2 flex-wrap">
            <Link href="/plan/constructor?format=banket&diet=halal" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">Собрать меню</Link>
            <Link href="/menu/halal" className="rounded-lg border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-gold-text transition-colors no-underline">Каталог халяль-блюд</Link>
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-gold-text transition-colors no-underline"> {SITE.phone}</a>
          </div>
        </div>
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-medium mb-4">Что входит</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { t: 'Сертификат халяль', d: 'Совет муфтиев России, рег. № СМР-Халяль (скан по запросу). Действует до 31.12.2026.' },
              { t: 'Отдельное оборудование', d: 'Полностью раздельные линии: ножи, доски, посуда, плиты. Без кросс-контаминации.' },
              { t: 'Забой по обряду зибха', d: 'С произнесением такбира (tasmiya). Поставщик — сертифицированные халяль-бойни Ленинградской области.' },
              { t: 'Без свинины и алкоголя', d: 'Полное отсутствие в меню. Без вина в соусах, без рома в десертах.' },
              { t: 'Меню по канонам', d: 'Кутья, халва, чак-чак, плов, манты, самса, долма, хумус, фаттуш, баклажаны.' },
              { t: 'Время ифтара', d: 'Доставка с учётом точного времени заката. Менеджер уточняет за день до мероприятия.' },
            ].map(item => (
              <div key={item.t} className="p-4 rounded-xl border border-line bg-card">
                <h3 className="font-heading text-base font-medium mb-1">{item.t}</h3>
                <p className="text-sm text-muted-foreground">{item.d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="font-heading text-2xl font-medium mb-4">Никах или ифтар?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border-2 border-emerald-200 bg-emerald-50/30">
              <h3 className="font-heading text-xl font-medium mb-2 text-emerald-900">Никах</h3>
              <p className="text-sm text-muted-foreground mb-3">Мусульманская свадебная церемония. Банкет с посадкой, отдельно мужская и женская зоны по запросу. Меню от 3 950 ₽/гость, мин. 15 гостей.</p>
              <ul className="text-sm space-y-1 text-foreground/90">
                <li>• Банкет с посадкой, 4–6 перемен блюд</li>
                <li>• Безалкогольные напитки: морсы, лимонады, чай</li>
                <li>• Халяль-десерты: чак-чак, халва, щербет</li>
                <li>• Официанты и сервировка</li>
                <li>• Возможна раздельная сервировка зон</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border-2 border-amber-200 bg-amber-50/30">
              <h3 className="font-heading text-xl font-medium mb-2 text-amber-900">Ифтар</h3>
              <p className="text-sm text-muted-foreground mb-3">Разговение после заката в месяц Рамадан. Фуршетный формат с датами, водой и лёгкими закусками. Меню от 1 800 ₽/гость, мин. 20 гостей.</p>
              <ul className="text-sm space-y-1 text-foreground/90">
                <li>• Финики и вода — традиционное начало</li>
                <li>• Лёгкие закуски: хумус, фаттуш, долма</li>
                <li>• Горячее: плов, манты, самса</li>
                <li>• Скидка 10% для коллективов 30+</li>
                <li>• Доставка точно к времени заката</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mb-10 p-6 rounded-xl border-2 border-gold-text bg-gold-tint/20">
          <h2 className="font-heading text-xl font-medium mb-3">B2B и тендеры · НДС</h2>
          <p className="text-sm text-foreground mb-2">Без НДС (УСН). НДС через партнёрское ООО. ЭДО: Контур.Диадок, СБИС. Договор: ИП Нилов Д.И., ИНН 781433059704, ОГРНИП 314784710400401.</p>
          <Link href="/contact?subject=B2B-тендер" className="text-gold-text font-semibold hover:underline text-sm">Запросить КП и пакет документов →</Link>
        </section>
        <section className="p-6 rounded-xl border-2 border-gold-text bg-gold-tint/20">
          <h2 className="font-heading text-xl font-medium mb-3">Готовы обсудить детали?</h2>
          <p className="text-sm text-muted-foreground mb-4">Шеф-повар Дмитрий Нилов лично подберёт меню под ваш праздник. Перезвоним в течение 15 минут.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact?subject=Никах-или-ифтар" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">Оставить заявку</Link>
            <Link href="/plan/constructor?format=banket&diet=halal" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">Собрать меню</Link>
            <a href={`https://wa.me/${SITE.phoneTel.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-semibold hover:border-gold-text transition-colors no-underline">WhatsApp</a>
          </div>
        </section>
      </div>
    </main>
  );
}
