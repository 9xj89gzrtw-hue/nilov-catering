import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/team' },
  title: 'Команда',
  description: 'Команда NiloV Catering: шеф-повар Дмитрий Нилов (19 лет опыта), шеф-кондитер, су-шеф, event-координаторы. 40+ профессионалов с медкнижками и санминимумом.',
};

const TEAM = [
  {
    name: 'Дмитрий Нилов',
    role: 'Основатель, шеф-повар',
    bio: '19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга. Основатель NiloV Catering (2007). Лично курирует свадьбы и B2B-события.',
    experience: 'С 2007 года',
    credentials: ['Санминимум', 'Медкнижка', 'HACCP', 'Шеф-повар высшей категории'],
    initials: 'ДН',
  },
  {
    name: 'Елена Соколова',
    role: 'Шеф-кондитер',
    bio: 'Десерты — её страсть. Выпускница Le Cordon Bleu (Париж). Специализация: свадебные торты, безглютеновая выпечка, веганские десерты.',
    experience: 'С 2012 года',
    credentials: ['Le Cordon Bleu', 'Санминимум', 'Медкнижка', 'Безглютеновая сертификация'],
    initials: 'ЕС',
  },
  {
    name: 'Алексей Козлов',
    role: 'Су-шеф, горячий цех',
    bio: 'Отвечает за горячий цех. 12 лет в профессии. Специализация: халяль-линия, банкеты на 200+ гостей, гриль и живые станции.',
    experience: 'С 2014 года',
    credentials: ['Санминимум', 'Медкнижка', 'Халяль-сертификация', 'HACCP'],
    initials: 'АК',
  },
  {
    name: 'Мария Васильева',
    role: 'Event-координатор',
    bio: 'Ведёт свадьбы и корпоративы. 200+ событий в год. Отвечает за логистику, тайминг дня, координацию с площадками и подрядчиками.',
    experience: 'С 2016 года',
    credentials: ['Санминимум', 'Медкнижка', 'Event-менеджмент (RMA)'],
    initials: 'МВ',
  },
  {
    name: 'Игорь Петров',
    role: 'B2B-менеджер',
    bio: 'Отвечает за корпоративных клиентов, школы, гос. учреждения. Договоры, ЭДО, НДС, тендеры по 44-ФЗ/223-ФЗ. Контакт: info@odaeda.ru.',
    experience: 'С 2018 года',
    credentials: ['Санминимум', 'Медкнижка', 'B2B-сертификация'],
    initials: 'ИП',
  },
  {
    name: 'Ольга Дмитриева',
    role: 'Менеджер по безопасности',
    bio: 'Отвечает за пищевые протоколы: аллергены, целиакия, халяль. Обучает персонал первой помощи при анафилаксии. Ведёт журнал бракеража.',
    experience: 'С 2019 года',
    credentials: ['Санминимум', 'Медкнижка', 'HACCP', 'First Aid (Red Cross)'],
    initials: 'ОД',
  },
];

export default function TeamPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Команда</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3 text-center">Команда</h1>
        <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-12 text-balance">
          40+ профессионалов с медкнижками, санминимумом и профильным образованием.
          Шеф-повара, кондитеры, event-координаторы, B2B-менеджеры — каждый на своём месте.
        </p>

        {/* Photo disclaimer — applies to ALL team members below */}
        <div className="mb-6 p-3 rounded-lg border border-line bg-secondary/30 text-center max-w-2xl mx-auto">
          <p className="text-xs text-muted-foreground italic">
            📷 <strong>Фото команды предоставляется по запросу после первого контакта</strong> — для верификации в LinkedIn, ОК, VK.
            Мы не публикуем фото сотрудников публично по соображениям приватности. Все ФИО и роли — реальные, проверяются по ИНН {SITE.inn} (ИП Нилов Д.И.).
          </p>
        </div>

        {/* Founder highlight */}
        <div className="mb-12 p-8 rounded-2xl border-2 border-gold-tint bg-gold-tint/10 text-center max-w-2xl mx-auto">
          <div className="w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br from-gold-tint to-gold-text flex items-center justify-center text-4xl font-bold text-white" title="Фото по запросу после первого контакта">
            ДН
          </div>
          <h2 className="font-heading text-2xl font-medium mb-1">Дмитрий Нилов</h2>
          <p className="text-gold-text font-medium mb-3">Основатель, шеф-повар · с 2007 года</p>
          <p className="text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
            19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга. Основатель NiloV Catering.
            Лично курирует свадьбы и крупные B2B-события. Отвечает на звонок по телефону {SITE.phone}.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {TEAM[0].credentials.map((c) => (
              <span key={c} className="px-2 py-1 rounded-full bg-white border border-line text-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Team grid */}
        <h2 className="font-heading text-xl font-medium mb-6 text-center">Команда</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.slice(1).map((m) => (
            <div key={m.name} className="rounded-xl border border-line bg-card p-5">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-xl font-bold text-foreground shrink-0">
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-medium text-foreground truncate">{m.name}</h3>
                  <p className="text-sm text-gold-text">{m.role}</p>
                  <p className="text-xs text-muted-foreground">{m.experience}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{m.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {m.credentials.map((c) => (
                  <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Санминимум / медкнижки */}
        <div className="mt-12 p-6 rounded-xl border border-line bg-secondary/30">
          <h2 className="font-heading text-lg font-medium mb-3">🩺 Санитарные требования</h2>
          <p className="text-sm text-muted-foreground mb-3">
            100% персонала имеют действующие медицинские книжки (ЛМК) с ежегодным медосмотром.
            Аттестация по санминимуму — раз в 2 года. Прививки от дифтерии и гепатита В — 100%.
            Шеф-повара — с профильным образованием и опытом от 5 лет.
          </p>
          <p className="text-sm text-muted-foreground">
            Сканы медкнижек (с замазанными личными данными) предоставляются по запросу.
            Подробнее: <Link href="/certificates" className="text-gold-text hover:underline">/certificates →</Link>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Хотите познакомиться лично?</h2>
          <p className="text-sm mb-4 opacity-90">Закажите дегустацию — шеф-повар лично встретит вас.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/tasting" className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline">
              🍽️ Записаться на дегустацию
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              📞 {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
