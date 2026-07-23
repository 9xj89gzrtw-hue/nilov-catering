import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/accessibility' },
  title: 'Доступность (WCAG 2.2 AA)',
  description: 'Заявление о доступности сайта NiloV Catering. WCAG 2.2 AA. Skip-link, A−/A/A+ переключатель шрифта, prefers-reduced-motion, контраст AA.',
};

export default function AccessibilityPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Доступность</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-4">Заявление о доступности</h1>

        <div className="space-y-6 text-base text-foreground leading-relaxed">
          <p className="text-muted-foreground">
            NiloV Catering стремится обеспечить доступность сайта для всех пользователей, включая людей с
            ограниченными возможностями. Мы следуем стандарту WCAG 2.2 уровня AA.
          </p>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-medium text-foreground">✓ Что реализовано</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Skip-link «Перейти к содержимому» в начале каждой страницы (виден при Tab)</li>
              <li><strong>Переключатель размера шрифта A− / A / A+ в подвале</strong> каждой страницы (100% / 110% / 125%)</li>
              <li>Все изображения имеют alt-текст</li>
              <li>Навигация возможна с клавиатуры (Tab, Enter, Escape)</li>
              <li>Focus-visible кольцо на всех интерактивных элементах (4.54:1 AA)</li>
              <li>Контраст текста ≥5.7:1 (AA) на основном фоне</li>
              <li>Уважение prefers-reduced-motion — анимации отключаются для пользователей с настройкой</li>
              <li>aria-label на всех навигационных элементах</li>
              <li>Семантический HTML (nav, main, section, footer, h1-h3)</li>
              <li>lang="ru" на корневом html</li>
              <li>Контакты доступны по tel: и mailto: ссылкам (один клик для звонка/email)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-medium text-foreground">👵 Для пожилых пользователей</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Телефон <a href={`tel:${SITE.phoneTel}`} className="text-gold-text underline">{SITE.phone}</a> — кликабелен в шапке на всех страницах (text-base 16px)</li>
              <li>Переключатель A− / A / A+ в подвале — увеличивает шрифт до 125%</li>
              <li>Контраст gold-text на background — AA-совместимый</li>
              <li>Крупные кнопки CTA (min 44×44 px touch target)</li>
              <li>На странице <Link href="/events/yubiley" className="text-gold-text underline">/events/yubiley</Link> — приоритет телефону над формой</li>
              <li>Простые хлебные крошки на всех страницах (без JS)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-medium text-foreground">🥜 Для аллергиков</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>14 аллергенов ТР ТС 022/2011 — на странице <Link href="/allergens" className="text-gold-text underline">/allergens</Link></li>
              <li>Протоколы для целиакии, анафилаксии, халяль — на <Link href="/certificates" className="text-gold-text underline">/certificates</Link></li>
              <li>Каждое блюдо промаркировано значком аллергена (⚠ + название)</li>
              <li>Конструктор меню позволяет исключить аллергены фильтром</li>
              <li>Заявка с аллергией — поле «медицинская диета» в форме</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-heading text-xl font-medium text-foreground">⚠ Известные ограничения</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
              <li>Видео-контент — субтитры в процессе внедрения (план — Q1 2025)</li>
              <li>Конструктор меню — интерактивный режим требует JavaScript (есть SSR fallback с формой)</li>
              <li>Галерея — masonry-сетка может быть сложна для навигации скринридером</li>
              <li>Карусель отзывов — переключение требует JS (есть SSR с одним отзывом)</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-line bg-secondary/30">
            <p className="text-base">
              Если вы столкнулись с проблемой доступности, напишите нам:{' '}
              <a href={`mailto:${SITE.email}`} className="text-gold-text underline">{SITE.email}</a>{' '}
              или позвоните{' '}
              <a href={`tel:${SITE.phoneTel}`} className="text-gold-text underline">{SITE.phone}</a>.
              Мы ответим в течение 2 рабочих дней.
            </p>
          </div>

          <p className="text-sm text-muted-foreground pt-4 border-t border-line">
            Последнее обновление: ноябрь 2024. Стандарт: WCAG 2.2 AA. Проверка: axe-core, Lighthouse, ручное тестирование с NVDA.
          </p>
        </div>
      </div>
    </main>
  );
}
