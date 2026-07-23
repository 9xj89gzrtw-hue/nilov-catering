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
    author: 'Екатерина и Дмитрий',
    event: 'Свадьба 60 гостей',
    date: 'Август 2024',
    location: 'Особняк Бруноз, СПб',
    text: 'Свадебный банкет с 3 диетами (веганы + БГ + всеядные). Шеф Дмитрий предложил торт с безглютеновым ярусом для тёти — целиакия. Гости не заметили разницы, торт прекрасный. Персонал вежливый, подача чёткая по таймингу.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Мария А.',
    event: 'День рождения 10 детей',
    date: 'Май 2024',
    location: 'Лофт «Бочка», СПб',
    text: 'У ребёнка аллергия на орехи. Прислали протокол безопасности: отдельные доски, EpiPen на руках у менеджера. В детском меню орехов не было вовсе — проще следить. Капкейки и пицца — детям зашло.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Сергей П.',
    event: 'Корпоратив IT-стартап 50 чел',
    date: 'Декабрь 2024',
    location: 'Лофт «Севкабель», СПб',
    text: 'Корпоратив на 50 человек с ЭДО (Диадок). ИП Нилов на УСН — без НДС, для нашей бухгалтерии на ОСН предложили partnered ООО. Счёт-фактура пришла на следующий день. Документы для бухгалтерии — без замечаний.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Ольга Николаевна',
    event: 'Школьный выпускной 75 чел',
    date: 'Июнь 2024',
    location: 'ГБОУ школа №355, СПб',
    text: 'Выпускной 9 классов. Полный пакет документов для Роспотребнадзора: медкнижки, бракераж, ППК, декларация ЕАЭС. Согласование прошло без замечаний. Школьный пакет 1 800 ₽/гость — вписались в бюджет.',
    rating: 4,
    verified: 'Чек школы',
  },
  {
    author: 'Игорь М.',
    event: 'Юбилей 30 чел',
    date: 'Сентябрь 2024',
    location: 'Дом клиента, СПб',
    text: 'Халяль-меню на юбилей. Сертификат Совета муфтиев России прислали заранее. Забой по зибха. Отдельная посуда, без алкоголя. Баранина и плов — как дома. Не хватает только вина в меню, но это плюс для халяль.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Анна С.',
    event: 'Конференция 150 чел × 2 дня',
    date: 'Октябрь 2024',
    location: 'Конгресс-холл «Экспофорум», СПб',
    text: '6 кофе-брейков × 150 чел = 900 порций за 2 дня. SLA в договоре, страхование 5 млн ₽. Один день был форс-мажор (ДТП на ЗСД) — резервный транспорт пришёл вовремя. Профессиональная команда.',
    rating: 5,
    verified: 'B2B-договор',
  },
  {
    author: 'Татьяна В.',
    event: 'Юбилей родителей 20 чел',
    date: 'Ноябрь 2024',
    location: 'Дом клиента, СПб',
    text: 'Позвонила — Дмитрий сам ответил. Камерный банкет на 20 пожилых гостей с диетическими опциями. Тёплые блюда, травяные чаи, неспешная подача. Родителям 80 лет — понравилось, что не торопили.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Виктория Л.',
    event: 'День рождения 12 детей',
    date: 'Апрель 2024',
    location: 'Дом клиента, СПб',
    text: 'У ребёнка целиакия. Безглютеновый торт, БГ капкейки, БГ пицца на миндальной муке. Протокол <20 ppm, отдельная посуда. Сканы сертификатов прислали заранее. Чуть дороже обычного меню, но безопасность важнее.',
    rating: 4,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Дмитрий К.',
    event: 'Корпоратив 80 чел',
    date: 'Март 2024',
    location: 'Лофт «Артплей», СПб',
    text: 'Заказывали фуршет на 80 чел. Вкусно, всё в срок. Понравилось, что в счёте разбивка по группам гостей — было 10 веганов и 70 всеядных. Скидку 5% за объём получили без вопросов.',
    rating: 5,
    verified: 'Yandex.Maps',
  },
  {
    author: 'Елена В.',
    event: 'Свадьба 100 чел',
    date: 'Июль 2024',
    location: 'Загородный отель «Скандинавия»',
    text: 'Свадебный банкет на 100 человек. Тариф «Расширенный». Икорная станция была шикарной. Единственный минус — бармен перепутал 2 заказа коктейлей, но быстро исправили. В целом — рекомендую.',
    rating: 4,
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
