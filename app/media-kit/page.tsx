import type { Metadata } from "next";
import Link from "next/link";
import { SITE, LEGAL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Медиа-кит",
  description:
    "Медиа-кит NiloV Catering: факт-лист, логотип, фото, биография шефа, бренд-палитра. Материалы для журналистов и партнёров.",
  alternates: {
    canonical: "/media-kit",
    languages: { ru: "/media-kit", "x-default": "/media-kit" },
  },
};

export default function MediaKitPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-heading mb-4 text-3xl font-medium md:text-4xl">Медиа-кит</h1>
        <p className="text-muted-foreground mb-10 text-lg">
          Материалы для журналистов, блогеров и партнёров. Всё, что нужно для публикации о NiloV
          Catering — в одном месте.
        </p>

        {/* Факт-лист */}
        <section className="mb-10">
          <h2 className="font-heading mb-4 text-xl font-medium">Факт-лист</h2>
          <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground text-sm">Название компании</dt>
              <dd className="font-medium">{SITE.name}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Юридическое лицо</dt>
              <dd className="font-medium">{LEGAL.operatorShort}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Год основания</dt>
              <dd className="font-medium">2007</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Шеф-повар</dt>
              <dd className="font-medium">Дмитрий Нилов</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Команда</dt>
              <dd className="font-medium">40+ человек (шефы, кондитеры, официанты, координаторы)</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Событий проведено</dt>
              <dd className="font-medium">3 000+</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Блюд в каталоге</dt>
              <dd className="font-medium">124 позиции, 7 категорий</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Рейтинг</dt>
              <dd className="font-medium">4.8/5 (27+ отзывов)</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">География</dt>
              <dd className="font-medium">Санкт-Петербург и Ленинградская область</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-sm">Система налогообложения</dt>
              <dd className="font-medium">УСН 6% (без НДС)</dd>
            </div>
          </dl>
        </section>

        {/* Биография шефа */}
        <section className="mb-10">
          <h2 className="font-heading mb-4 text-xl font-medium">Биография шефа</h2>
          <p className="text-foreground/90 leading-relaxed">
            Дмитрий Нилов — шеф-повар и основатель NiloV Catering. С 2007 года обслуживает события
            в Санкт-Петербурге — от камерных ужинов на 8 персон до банкетов на 200 гостей.
            Специализация: французская техника (sous-vide 63°C), локальные продукты Ленинградской
            области, авторская подача. Поддерживает стандарты ХАССП, 14 аллергенов ТР ТС 022/2011,
            халяль (сертификат Совета муфтиев России).
          </p>
        </section>

        {/* Бренд-палитра */}
        <section className="mb-10">
          <h2 className="font-heading mb-4 text-xl font-medium">Бренд-палитра</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="mb-2 h-16 rounded-lg" style={{ backgroundColor: "#8C7140" }} />
              <p className="text-sm font-medium">Золото</p>
              <p className="text-muted-foreground text-xs">#8C7140</p>
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg" style={{ backgroundColor: "#1a1614" }} />
              <p className="text-sm font-medium">Тёмный</p>
              <p className="text-muted-foreground text-xs">#1a1614</p>
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg border border-gray-200" style={{ backgroundColor: "#faf8f3" }} />
              <p className="text-sm font-medium">Фон</p>
              <p className="text-muted-foreground text-xs">#faf8f3</p>
            </div>
            <div>
              <div className="mb-2 h-16 rounded-lg" style={{ backgroundColor: "#C9A66B" }} />
              <p className="text-sm font-medium">Акцент</p>
              <p className="text-muted-foreground text-xs">#C9A66B</p>
            </div>
          </div>
        </section>

        {/* Материалы для скачивания */}
        <section className="mb-10">
          <h2 className="font-heading mb-4 text-xl font-medium">Материалы для скачивания</h2>
          <div className="grid gap-4">
            {[
              {
                file: "Логотип NiloV (SVG)",
                size: "SVG · 0.6 КБ",
                href: "/press-kit/nilov-logo.svg",
                download: true,
              },
              {
                file: "OG-изображение (PNG 1200×630)",
                size: "PNG · 141 КБ",
                href: "/og-image.jpg",
                download: true,
              },
              {
                file: "Пресс-релиз 2026",
                size: "HTML · 4 КБ",
                href: "/press-kit/press-release-2026.html",
                download: true,
              },
            ].map((f) => (
              <a
                key={f.file}
                href={f.href}
                download={f.download || undefined}
                className="border-line bg-card hover:border-gold-text flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <span className="text-sm font-medium">{f.file}</span>
                <span className="text-muted-foreground text-xs">{f.size}</span>
              </a>
            ))}
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            Нужны фото блюд или команды в высоком разрешении? Напишите на{" "}
            <a href={`mailto:${SITE.email}`} className="text-gold-text underline">
              {SITE.email}
            </a>{" "}
            — отправим в течение 1 рабочего дня.
          </p>
        </section>

        {/* Контакты для СМИ */}
        <section>
          <h2 className="font-heading mb-4 text-xl font-medium">Контакты для СМИ</h2>
          <div className="border-line bg-secondary/30 rounded-lg border p-4">
            <p className="text-sm">
              Пресс-запросы:{" "}
              <a href={`mailto:${SITE.email}`} className="text-gold-text underline">
                {SITE.email}
              </a>
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Телефон:{" "}
              <a href={`tel:${SITE.phoneTel}`} className="text-gold-text underline">
                {SITE.phone}
              </a>{" "}
              · {SITE.address}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
