import type { Metadata } from 'next';
import { LEGAL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/cookies', languages: { 'ru': '/cookies', 'x-default': '/cookies' } },
  title: 'Политика использования cookie',
  description:
    'Использование cookie на сайте nilov-catering.vercel.app. Типы cookie, сроки хранения, отключение. 152-ФЗ.',
};

export default function Page() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Политика использования cookie</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Редакция от 1 августа 2026 г. Соответствует 152-ФЗ и ePrivacy Directive (для EU-посетителей).
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-xl font-medium mb-3">1. Что такое cookie</h2>
            <p className="text-sm leading-relaxed">
              Cookie — небольшие текстовые файлы, которые сайт сохраняет в браузере
              пользователя. Они нужны для запоминания настроек, корзины, аналитики и
              персонализации.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">2. Типы cookie на сайте</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left py-2 pr-4 font-medium">Тип</th>
                    <th className="text-left py-2 pr-4 font-medium">Назначение</th>
                    <th className="text-left py-2 pr-4 font-medium">Срок</th>
                    <th className="text-left py-2 font-medium">Согласие</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr className="border-b border-line/60">
                    <td className="py-2 pr-4 font-medium">Необходимые</td>
                    <td className="py-2 pr-4">Корзина, конструктор меню, сессия</td>
                    <td className="py-2 pr-4">Сессия / 30 дней</td>
                    <td className="py-2">Не требуется</td>
                  </tr>
                  <tr className="border-b border-line/60">
                    <td className="py-2 pr-4 font-medium">Аналитические</td>
                    <td className="py-2 pr-4">Яндекс.Метрика — статистика посещений</td>
                    <td className="py-2 pr-4">13 месяцев</td>
                    <td className="py-2">Требуется</td>
                  </tr>
                  <tr className="border-b border-line/60">
                    <td className="py-2 pr-4 font-medium">Функциональные</td>
                    <td className="py-2 pr-4">Запоминание размера шрифта, темы</td>
                    <td className="py-2 pr-4">1 год</td>
                    <td className="py-2">Требуется</td>
                  </tr>
                  <tr className="border-b border-line/60">
                    <td className="py-2 pr-4 font-medium">Аналитика</td>
                    <td className="py-2 pr-4">Microsoft Clarity (тепловые карты, сессионные записи — данные передаются на серверы Microsoft, вне РФ)</td>
                    <td className="py-2 pr-4">13 месяцев</td>
                    <td className="py-2">Опционально</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">3. Управление cookie</h2>
            <p className="text-sm leading-relaxed mb-3">
              3.1. При первом посещении сайта отображается баннер согласия. Пользователь может
              принять все cookie или отклонить опциональные (Microsoft Clarity). Необходимые cookie
              работают в любом случае.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              3.2. Отключить cookie можно в настройках браузера:
            </p>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-3">
              <li>
                Chrome: Настройки → Конфиденциальность → Файлы cookie
              </li>
              <li>Safari: Настройки → Конфиденциальность → Файлы cookie</li>
              <li>Firefox: Настройки → Приватность → Куки</li>
              <li>Edge: Настройки → Cookies и разрешения сайтов</li>
            </ul>
            <p className="text-sm leading-relaxed">
              3.3. При отключении cookie часть функций сайта (корзина, конструктор меню,
              размер шрифта) может стать недоступна.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">4. Сторонние сервисы</h2>
            <p className="text-sm leading-relaxed mb-3">Сайт использует следующие сторонние сервисы, устанавливающие свои cookie:</p>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90">
              <li>Яндекс.Метрика (metrica.yandex.ru) — аналитика (данные в РФ)</li>
              <li>Microsoft Clarity (clarity.ms) — тепловые карты и сессионные записи (данные передаются на серверы Microsoft, вне РФ — см. Политику конфиденциальности §3.2)</li>
              <li>ВКонтакте (vk.com) — ссылка на сообщество (без cookie-виджета)</li>
              <li>WhatsApp (wa.me) — кнопка-ссылка (без cookie)</li>
              <li>Telegram (t.me) — кнопка-ссылка (без cookie)</li>
            </ul>
            <p className="text-sm leading-relaxed mt-3">
              Полные политики этих сервисов — на их сайтах. Исполнитель не контролирует их
              cookie-политику.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">5. Контакты</h2>
            <p className="text-sm leading-relaxed">
              По вопросам cookie-политики:{' '}
              <a href="mailto:info@nilov-catering.ru" className="underline">
                info@nilov-catering.ru
              </a>
              . Оператор: {LEGAL.operatorFull}, ИНН {LEGAL.inn}, ОГРНИП {LEGAL.ogrnip}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
