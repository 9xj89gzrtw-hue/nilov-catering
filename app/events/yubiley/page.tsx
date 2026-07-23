import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Юбилей и годовщина — кейтеринг для пожилых',
  description: 'Кейтеринг на золотую свадьбу, юбилей, годовщину. Банкет от 15 гостей, бюджетные решения от 50 000 ₽. Честные цены, реальные отзывы, большой шрифт.',
  alternates: { canonical: '/events/yubiley' },
};

export default function YubileyPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <Link href="/events" className="hover:text-foreground">События</Link>
          {' / '}
          <span className="text-foreground">Юбилей / Годовщина</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-5xl font-medium mb-4">
          Юбилей и годовщина свадьбы
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Кейтеринг на золотую свадьбу, юбилей, годовщину. Банкет с посадкой для пожилых гостей —
          камерный формат от 15 человек. Честные цены, большой шрифт, телефон для звонка.
        </p>

        {/* Phone CTA — large for elderly */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-gold-tint bg-gold-tint/10">
          <h2 className="font-heading text-xl font-medium mb-2">📞 Позвоните — поможем выбрать</h2>
          <p className="text-base text-muted-foreground mb-4">
            Не любите заполнять формы? Позвоните — шеф-повар Дмитрий Нилов лично подберёт меню
            под ваш бюджет и повод. Перезвоним в течение 15 минут.
          </p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-4 text-xl font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
          >
            📞 {SITE.phone}
          </a>
          <p className="text-sm text-muted-foreground mt-3">
            Звонок бесплатный из любой точки РФ. Работаем ежедневно с 9:00 до 21:00.
          </p>
        </div>

        {/* Бюджетные решения — для 15 чел на 50к */}
        <div className="mb-8 p-6 rounded-2xl border border-line bg-card">
          <h2 className="font-heading text-xl font-medium mb-3">💰 Что помещается в бюджет 50 000 ₽ на 15 гостей</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Золотая свадьба или юбилей на 15 пожилых гостей — нужен банкет с посадкой.
            Вот реальные варианты под бюджет 50 000 ₽:
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border-2 border-gold-tint bg-gold-tint/10">
              <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                <h3 className="font-semibold">⭐ Вариант 1: Индивидуальный пакет «Юбилейный»</h3>
                <span className="text-base font-bold text-gold-text">от 50 000 ₽ за 15 чел</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Камерный банкет под ваш бюджет: 3 закуски, 1 горячее, десерт, чай/кофе, посуда, официант, доставка по КАД.
                Меню адаптировано для пожилых гостей (диетические опции, без острых блюд).
              </p>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="inline-block mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
              >
                📞 Обсудить пакет «Юбилейный»
              </a>
            </div>
            <div className="p-4 rounded-lg border border-line bg-background">
              <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                <h3 className="font-semibold">Вариант 2: Фуршет-Эконом с посадкой</h3>
                <span className="text-base font-bold text-gold-text">15 × 2 450 ₽ = 36 750 ₽</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Лёгкие закуски, канапе, горячее, чай/кофе. Гости могут сидеть за столом, но без полноценной подачи.
                Экономия ~13 000 ₽ от бюджета — можно добавить торт или расширить меню.
              </p>
            </div>
          </div>
        </div>

        {/* Premium (вне бюджета) — отдельный блок */}
        <div className="mb-8 p-4 rounded-xl border border-line bg-secondary/30">
          <h3 className="font-heading text-base font-medium mb-2">💎 Премиум-вариант (вне бюджета 50к)</h3>
          <p className="text-sm text-muted-foreground">
            Банкет-Максимальный: <strong>15 × 9 950 ₽ = 149 250 ₽</strong> — 5 закусок, 2 горячих, икорная станция,
            сомелье, торт, координатор. Премиум-формат для особого повода. Возможна рассрочка или уменьшение количества блюд.
          </p>
        </div>

        <TariffOffersSection
          eventId="chastnoe"
          eventName="Юбилей / Годовщина"
          description="Тарифы для частных событий: от камерного ужина до гастрономического опыта с сомелье."
        />

        {/* Что важно для пожилых гостей */}
        <div className="mt-12 p-6 rounded-2xl border border-line bg-card">
          <h2 className="font-heading text-xl font-medium mb-3">🪑 Что важно для пожилых гостей</h2>
          <ul className="text-base text-muted-foreground space-y-2">
            <li>✓ Банкет с посадкой (не фуршет стоя) — пожилым тяжело стоять 2+ часа</li>
            <li>✓ Меню с диетическими опциями (без острого, без жареного, без сырой рыбы)</li>
            <li>✓ Возможность безглютенового и безмолочного меню для аллергиков</li>
            <li>✓ Официанты с опытом работы с пожилыми гостями (терпение, вежливость)</li>
            <li>✓ Чайная станция с травяными чаями (облепиха, ромашка, иван-чай)</li>
            <li>✓ Тишина и неспешная подача — без шумных станций и бармен-шоу</li>
            <li>✓ Возможность тоста и музыкального сопровождения (по запросу)</li>
          </ul>
        </div>

        {/* Юридическая прозрачность */}
        <div className="mt-8 p-5 rounded-xl border-2 border-gold-tint bg-gold-tint/5">
          <h2 className="font-heading text-lg font-medium mb-2">📋 Юридическая прозрачность</h2>
          <dl className="text-base space-y-1">
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">Юр.лицо:</dt>
              <dd className="font-medium">{SITE.legalName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">ИНН:</dt>
              <dd className="font-mono">{SITE.inn}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">ОГРНИП:</dt>
              <dd className="font-mono">{SITE.ogrnip}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">Адрес:</dt>
              <dd>{SITE.legalAddress}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">Сайт:</dt>
              <dd>{SITE.domain} · {SITE.altDomain}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground shrink-0">С работы:</dt>
              <dd>с 2007 года (19 лет в бизнесе)</dd>
            </div>
          </dl>
          <p className="text-sm text-muted-foreground mt-3">
            Проверить контрагента: <a href="https://www.rusprofile.ru/ip/314784710400401" target="_blank" rel="noopener noreferrer" className="text-gold-text hover:underline">rusprofile.ru →</a>
            {' · '}
            <Link href="/certificates" className="text-gold-text hover:underline">все сертификаты →</Link>
            {' · '}
            <Link href="/reviews" className="text-gold-text hover:underline">отзывы →</Link>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Готовы обсудить ваше событие?</h2>
          <p className="text-base mb-4 opacity-90">
            Позвоните или оставьте заявку — перезвоним за 15 минут.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="rounded-lg bg-background text-foreground px-6 py-3 text-base font-semibold hover:bg-background/90 transition-colors no-underline"
            >
              📞 {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-background px-6 py-3 text-base font-semibold hover:bg-background/10 transition-colors no-underline"
            >
              ✍️ Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
