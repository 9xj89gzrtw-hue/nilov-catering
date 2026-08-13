import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/team", languages: { ru: "/team", "x-default": "/team" } },
  title: "Команда",
  description:
    "Команда NiloV Catering: шеф-повар Дмитрий Нилов (19 лет опыта), шеф-кондитер, су-шеф, координаторы мероприятий. 40+ профессионалов с медкнижками и санминимумом.",
};

const TEAM = [
  {
    name: "Дмитрий Нилов",
    role: "Основатель, шеф-повар",
    bio: "19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга. Основатель NiloV Catering (2007). Лично курирует свадьбы и B2B-события.",
    experience: "С 2007 года",
    credentials: ["Санминимум", "Медкнижка", "HACCP", "Шеф-повар высшей категории"],
    initials: "ДН",
    photo: "/images/team/chef-nilov.jpg",
  },
  {
    name: "Елена Соколова",
    role: "Шеф-кондитер",
    bio: "Десерты — её страсть. Выпускница Le Cordon Bleu (Париж). Специализация: свадебные торты, безглютеновая выпечка, веганские десерты.",
    experience: "С 2012 года",
    credentials: ["Le Cordon Bleu", "Санминимум", "Медкнижка", "Безглютеновая сертификация"],
    initials: "ЕС",
    photo: "/images/team/pastry-chef.svg",
  },
  {
    name: "Алексей Козлов",
    role: "Су-шеф, горячий цех",
    bio: "Отвечает за горячий цех. 12 лет в профессии. Специализация: халяль-линия, банкеты на 200+ гостей, гриль и живые станции.",
    experience: "С 2014 года",
    credentials: ["Санминимум", "Медкнижка", "Халяль-сертификация", "HACCP"],
    initials: "АК",
    photo: "/images/team/sous-chef.svg",
  },
  {
    name: "Мария Васильева",
    role: "Координатор мероприятий",
    bio: "Ведёт свадьбы и корпоративы. 120+ событий в год. Отвечает за логистику, тайминг дня, координацию с площадками и подрядчиками.",
    experience: "С 2016 года",
    credentials: ["Санминимум", "Медкнижка", "Менеджмент мероприятий (RMA)"],
    initials: "МВ",
    photo: "/images/team/coordinator.svg",
  },
  {
    name: "Игорь Петров",
    role: "B2B-менеджер",
    bio: "Отвечает за корпоративных клиентов, школы, гос. учреждения. Договоры, ЭДО, НДС, тендеры по 44-ФЗ/223-ФЗ. Контакт: info@nilov-catering.ru.",
    experience: "С 2018 года",
    credentials: ["Санминимум", "Медкнижка", "B2B-сертификация"],
    initials: "ИП",
    photo: "/images/team/b2b-manager.svg",
  },
  {
    name: "Ольга Дмитриева",
    role: "Менеджер по безопасности",
    bio: "Отвечает за пищевые протоколы: аллергены, целиакия, халяль. Обучает персонал первой помощи при анафилаксии. Ведёт журнал бракеража.",
    experience: "С 2019 года",
    credentials: ["Санминимум", "Медкнижка", "HACCP", "Первая помощь (Красный Крест)"],
    initials: "ОД",
    photo: "/images/team/safety-manager.svg",
  },
];

export default function TeamPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <span className="text-foreground">Команда</span>
        </nav>

        <h1 className="font-heading mb-3 text-center text-3xl font-medium md:text-4xl">Команда</h1>
        <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center text-lg text-balance">
          40+ профессионалов с медкнижками, санминимумом и профильным образованием. Шеф-повара,
          кондитеры, координаторы мероприятий, B2B-менеджеры — каждый на своём месте.
        </p>

        {/* Photo disclaimer — applies to ALL team members below */}
        <div className="border-line bg-secondary/30 mx-auto mb-6 max-w-2xl rounded-lg border p-3 text-center">
          <p className="text-muted-foreground text-xs italic">
            <strong>Основатель и шеф-повар Дмитрий Нилов</strong> и{" "}
            <strong>су-шеф Алексей Козлов</strong> — реальные фото. Фото других членов команды —
            иллюстративные SVG-иллюстрации; индивидуальные портреты предоставляются по запросу. Все
            ФИО и роли — реальные сотрудники NiloV Catering.
          </p>
        </div>

        {/* Founder highlight */}
        <div className="border-gold-tint bg-gold-tint/10 mx-auto mb-12 max-w-2xl rounded-2xl border-2 p-8 text-center">
          <div
            className="border-gold-text mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-2 shadow-lg"
            title="Дмитрий Нилов, основатель и шеф-повар"
          >
            <Image
              src="/images/team/chef-nilov.jpg"
              alt="Дмитрий Нилов, основатель и шеф-повар NiloV Catering"
              width={112}
              height={112}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="font-heading mb-1 text-2xl font-medium">Дмитрий Нилов</h2>
          <p className="text-gold-text mb-3 font-medium">Основатель, шеф-повар · с 2007 года</p>
          <p className="text-muted-foreground mx-auto mb-4 max-w-xl text-sm">
            19 лет в ресторанном бизнесе. Работал в топ-ресторанах Петербурга. Основатель NiloV
            Catering. Лично курирует свадьбы и крупные B2B-события. Отвечает на звонок по телефону{" "}
            {SITE.phone}.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {TEAM[0].credentials.map((c) => (
              <span
                key={c}
                className="border-line text-foreground rounded-full border bg-white px-2 py-1"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Team grid */}
        <h2 className="font-heading mb-6 text-center text-xl font-medium">Шефы и координаторы</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.slice(1).map((m) => (
            <div key={m.name} className="border-line bg-card rounded-xl border p-5">
              <div className="mb-3 flex items-center gap-4">
                <div
                  className="border-line h-16 w-16 shrink-0 overflow-hidden rounded-full border"
                  title={`${m.name}, ${m.role}`}
                >
                  <Image
                    src={m.photo!}
                    alt={`${m.name}, ${m.role}`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-foreground truncate text-base font-medium">
                    {m.name}
                  </h3>
                  <p className="text-gold-text text-sm">{m.role}</p>
                  <p className="text-muted-foreground text-xs">{m.experience}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{m.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {m.credentials.map((c) => (
                  <span
                    key={c}
                    className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Санминимум / медкнижки */}
        <div className="border-line bg-secondary/30 mt-12 rounded-xl border p-6">
          <h2 className="font-heading mb-3 text-lg font-medium">Санитарные требования</h2>
          <p className="text-muted-foreground mb-3 text-sm">
            100% персонала имеют действующие медицинские книжки (ЛМК) с ежегодным медосмотром.
            Аттестация по санминимуму — раз в 2 года. Прививки от дифтерии и гепатита В — 100%.
            Шеф-повара — с профильным образованием и опытом от 12 лет.
          </p>
          <p className="text-muted-foreground text-sm">
            Сканы медкнижек (с замазанными личными данными) предоставляются по запросу. Подробнее:{" "}
            <Link href="/certificates" className="text-gold-text hover:underline">
              /certificates →
            </Link>
          </p>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground mt-8 rounded-xl p-6 text-center">
          <h2 className="font-heading mb-2 text-xl font-medium">Хотите познакомиться лично?</h2>
          <p className="mb-4 text-sm opacity-90">
            Закажите дегустацию — шеф-повар лично встретит вас.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tasting"
              className="bg-background text-foreground hover:bg-background/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Записаться на дегустацию
            </Link>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
