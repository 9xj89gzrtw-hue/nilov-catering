import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/accessibility",
    languages: { ru: "/accessibility", "x-default": "/accessibility" },
  },
  title: "Доступность (WCAG 2.2 AA)",
  description:
    "Заявление о доступности сайта NiloV Catering. WCAG 2.2 AA. Skip-link, A−/A/A+ переключатель шрифта, prefers-reduced-motion, контраст AA.",
};

export default function AccessibilityPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <nav aria-label="Хлебные крошки" className="text-muted-foreground mb-4 text-sm">
          <Link href="/" className="hover:text-foreground">
            Главная
          </Link>
          {" / "}
          <span className="text-foreground">Доступность</span>
        </nav>

        <h1 className="font-heading mb-4 text-3xl font-medium md:text-4xl">
          Заявление о доступности
        </h1>

        <div className="text-foreground space-y-6 text-base leading-relaxed">
          <p className="text-muted-foreground">
            NiloV Catering стремится обеспечить доступность сайта для всех пользователей, включая
            людей с ограниченными возможностями. Мы следуем стандарту WCAG 2.2 уровня AA.
          </p>

          <div className="space-y-3">
            <h2 className="font-heading text-foreground text-xl font-medium">Что реализовано</h2>
            <ul className="text-muted-foreground list-disc space-y-1.5 pl-5">
              <li>Skip-link «Перейти к содержимому» в начале каждой страницы (виден при Tab)</li>
              <li>
                <strong>Переключатель размера шрифта A+ в шапке</strong> каждой страницы (100% /
                125% / 150%)
              </li>
              <li>Все изображения имеют alt-текст</li>
              <li>Навигация возможна с клавиатуры (Tab, Enter, Escape)</li>
              <li>Focus-visible кольцо на всех интерактивных элементах (4.54:1 AA)</li>
              <li>Контраст текста ≥5.7:1 (AA) на основном фоне</li>
              <li>
                Уважение prefers-reduced-motion — анимации отключаются для пользователей с
                настройкой
              </li>
              <li>aria-label на всех навигационных элементах</li>
              <li>Семантический HTML (nav, main, section, footer, h1-h3)</li>
              <li>{'lang="ru" на корневом html'}</li>
              <li>Контакты доступны по tel: и mailto: ссылкам (один клик для звонка/email)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-foreground text-xl font-medium">
              Для пожилых пользователей
            </h2>
            <ul className="text-muted-foreground list-disc space-y-1.5 pl-5">
              <li>
                Телефон{" "}
                <a href={`tel:${SITE.phoneTel}`} className="text-gold-text underline">
                  {SITE.phone}
                </a>{" "}
                — кликабелен в шапке на всех страницах (text-base 16px)
              </li>
              <li>
                Переключатель A+ в шапке — увеличивает шрифт до 150% (3 уровня: 100% / 125% / 150%)
              </li>
              <li>Контраст gold-text на background — AA-совместимый</li>
              <li>Крупные кнопки CTA (min 44×44 px touch target)</li>
              <li>
                На странице{" "}
                <Link href="/events/yubiley" className="text-gold-text underline">
                  /events/yubiley
                </Link>{" "}
                — приоритет телефону над формой
              </li>
              <li>Простые хлебные крошки на всех страницах (без JS)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-foreground text-xl font-medium">Для аллергиков</h2>
            <ul className="text-muted-foreground list-disc space-y-1.5 pl-5">
              <li>
                14 аллергенов ТР ТС 022/2011 — на странице{" "}
                <Link href="/allergens" className="text-gold-text underline">
                  /allergens
                </Link>
              </li>
              <li>
                Протоколы для целиакии, анафилаксии, халяль — на{" "}
                <Link href="/certificates" className="text-gold-text underline">
                  /certificates
                </Link>
              </li>
              <li>Каждое блюдо промаркировано значком аллергена ( + название)</li>
              <li>Конструктор меню позволяет исключить аллергены фильтром</li>
              <li>Заявка с аллергией — поле «медицинская диета» в форме</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-foreground text-xl font-medium">
              Известные ограничения
            </h2>
            <ul className="text-muted-foreground list-disc space-y-1.5 pl-5">
              <li>Видео-контент — субтитры в процессе внедрения (план — Q3 2026)</li>
              <li>
                Конструктор меню — интерактивный режим требует JavaScript (есть SSR fallback с
                формой)
              </li>
              <li>
                Выпадающие меню навигации (События, Меню) требуют JavaScript. Без JS используйте
                ссылки в подвале сайта или{" "}
                <Link href="/sitemap.xml" className="underline">
                  карту сайта
                </Link>
                .
              </li>
              <li>Галерея — masonry-сетка может быть сложна для навигации скринридером</li>
              <li>Карусель отзывов — переключение требует JS (есть SSR с одним отзывом)</li>
            </ul>
          </div>

          <div className="border-line bg-secondary/30 rounded-lg border p-4">
            <p className="text-base">
              Если вы столкнулись с проблемой доступности, напишите нам:{" "}
              <a href={`mailto:${SITE.email}`} className="text-gold-text underline">
                {SITE.email}
              </a>{" "}
              или позвоните{" "}
              <a href={`tel:${SITE.phoneTel}`} className="text-gold-text underline">
                {SITE.phone}
              </a>
              . Мы ответим в течение 2 рабочих дней.
            </p>
          </div>

          <p className="text-muted-foreground border-line border-t pt-4 text-sm">
            Последнее обновление: август 2026. Стандарт: WCAG 2.2 AA. Проверка: axe-core,
            Lighthouse, ручное тестирование с NVDA.
          </p>
        </div>
      </div>
    </main>
  );
}
