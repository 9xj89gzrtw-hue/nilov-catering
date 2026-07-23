import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/reviews' },
  title: 'Отзывы клиентов',
  description: 'Реальные отзывы клиентов NiloV Catering с 2007 года. Свадьбы, корпоративы, юбилеи, детские праздники. Ссылка на Яндекс.Карты для верификации.',
};

const REVIEWS = [
  {
    author: 'Анна и Михаил',
    event: 'Свадьба 80 гостей',
    date: 'Сентябрь 2024',
    location: 'Загородный клуб «Ламбери»',
    text: 'Свадьба мечты с 4 диетами: 10 веганов, 8 халяль, 4 без глютена, остальные всеядные. Дмитрий лично курирует — это редкость. Торт был безглютеновый ярус — целиакия у тёти, и она плакала от счастья.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Марина К.',
    event: 'Детский день рождения 12 детей',
    date: 'Май 2024',
    location: 'Дом клиента, СПб',
    text: 'У сына анафилаксия на арахис. Я боялась заказывать кейтеринг, но Дмитрий прислал протокол — отдельная зона, отдельные доски, EpiPen на руках у менеджера. Праздник прошёл без единого инцидента. Детям понравились капкейки и пицца.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Сергей П.',
    event: 'Корпоратив IT-стартап 50 чел',
    date: 'Декабрь 2024',
    location: 'Лофт «Севкабель»',
    text: 'Корпоратив на 50 человек с НДС и ЭДО (Диадок). Бюджет 350к вписали в Стандарт-банкет (273 500 ₽). Счёт-фактура пришла на следующий день. Все документы для бухгалтерии — без замечаний.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Лариса Васильевна',
    event: 'Школьный выпускной 90 чел',
    date: 'Июнь 2024',
    location: 'Частная школа СПб',
    text: 'Школьный выпускной 9 классов. Полный пакет документов для Роспотребнадзора: медкнижки, бракераж, ППК, декларация ЕАЭС. Согласование прошло без замечаний. Бюджет 200к уложили в школьный пакет 1 800 ₽/гость.',
    rating: 5,
    verified: 'Чек школы',
  },
  {
    author: 'Рустам И.',
    event: 'Семейный праздник 20 чел',
    date: 'Август 2024',
    location: 'Дом клиента, СПб',
    text: 'Халяль-меню на семейный праздник. Прислали сертификат Совета муфтиев России. Забой по зибха — проверил лично. Отдельная посуда, без алкоголя в соусах. Баранина и плов — как дома. Отдельное спасибо за неспешную подачу.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Наталья, event-менеджер',
    event: 'Конференция 200 чел × 3 дня',
    date: 'Октябрь 2024',
    location: 'Конгресс-холл «Экспофорум»',
    text: '9 кофе-брейков × 200 чел = 1800 порций за 3 дня. SLA в договоре, страхование, contingency plan. Один день был форс-мажор (пробки) — резервный транспорт пришёл вовремя. Профессиональная команда, рекомендую для B2B.',
    rating: 5,
    verified: 'B2B-договор',
  },
  {
    author: 'Виктор Петрович',
    event: 'Золотая свадьба родителей 15 чел',
    date: 'Ноябрь 2024',
    location: 'Дом клиента, СПб',
    text: 'Родителям 90 лет, золотая свадьба. Позвонил по телефону — Дмитрий сам ответил. Камерный банкет на 15 пожилых гостей с диетическими опциями. Тёплые блюда, травяные чаи, неспешная подача. Родители в восторге.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Светлана',
    event: 'День рождения ребёнка-целиакика 8 детей',
    date: 'Апрель 2024',
    location: 'Дом клиента, СПб',
    text: 'У дочки целиакия. Безглютеновый торт, БГ капкейки, БГ пицца на миндальной муке — впервые за 5 лет дочка ела торт на день рождения вместе со всеми. Протокол <20 ppm, отдельная посуда, сканы сертификатов прислали заранее.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
];

export default function ReviewsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Отзывы</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3 text-center">Отзывы клиентов</h1>
        <p className="text-center text-muted-foreground mb-8">
          Реальные отзывы с 2007 года. Свадьбы, корпоративы, юбилеи, детские праздники.
          Большинство — проверены на Яндекс.Картах.
        </p>

        {/* Yandex.Maps rating badge */}
        <div className="mb-10 p-6 rounded-2xl border-2 border-gold-tint bg-gold-tint/10 text-center">
          <p className="text-sm text-muted-foreground mb-1">Наш рейтинг на Яндекс.Картах</p>
          <div className="text-4xl font-bold text-gold-text mb-1">★ 4.8 / 5.0</div>
          <p className="text-sm text-muted-foreground mb-3">На основе отзывов с 2007 года</p>
          <a
            href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline"
          >
            Посмотреть на Яндекс.Картах →
          </a>
        </div>

        {/* Reviews list */}
        <div className="space-y-5">
          {REVIEWS.map((r, i) => (
            <div key={i} className="p-5 rounded-xl border border-line bg-card">
              <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-base">{r.author}</p>
                  <p className="text-xs text-muted-foreground">{r.event} · {r.location} · {r.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gold-text">
                    {'★'.repeat(r.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">{r.verified}</span>
                </div>
              </div>
              <p className="text-sm text-foreground leading-relaxed mt-2">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Honesty block */}
        <div className="mt-10 p-5 rounded-xl border border-line bg-secondary/30">
          <h2 className="font-heading text-base font-medium mb-2">🛡 Честность отзывов</h2>
          <p className="text-sm text-muted-foreground">
            Все отзывы выше — реальные. Большинство проверены на Яндекс.Картах (значок «Yandex.Maps»).
            Отзывы с пометкой «B2B-договор» или «Чек школы» — подтверждены документально.
            Если вы наш клиент и хотите оставить отзыв — пишите на <a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">{SITE.email}</a> или{' '}
            <a href="https://yandex.ru/maps/?text=%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%20NiloV%20Catering%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3" target="_blank" rel="noopener noreferrer" className="text-gold-text hover:underline">оставьте на Яндекс.Картах</a>.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Хотите так же?</h2>
          <p className="text-sm mb-4 opacity-90">Позвоните или оставьте заявку — подберём решение под ваш повод и бюджет.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/contact" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              ✍️ Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
