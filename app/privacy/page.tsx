import type { Metadata } from 'next';
import { LEGAL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Политика конфиденциальности — NiloV Catering',
  description:
    'Политика обработки персональных данных ИП Нилов Д.И. в соответствии с 152-ФЗ. Сбор, хранение, использование, передача. СПб.',
};

export default function Page() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Политика конфиденциальности</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Редакция от 24 июля 2026 г. Соответствует Федеральному закону №152-ФЗ
          «О персональных данных» от 27.07.2006 (с изм. 2026 г.).
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-xl font-medium mb-3">1. Общие положения</h2>
            <p className="text-sm leading-relaxed mb-3">
              1.1. Оператор персональных данных — {LEGAL.operatorFull}, ИНН {LEGAL.inn}, ОГРНИП{' '}
              {LEGAL.ogrnip}, адрес: {LEGAL.legalAddress}.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              1.2. Политика определяет порядок обработки и защиты персональных данных
              пользователей сайта odaeda.ru и клиентов Исполнителя.
            </p>
            <p className="text-sm leading-relaxed">
              1.3. Цели обработки: исполнение договора оказания услуг, информирование о статусе
              заказа, маркетинговые рассылки (с согласия), улучшение качества услуг.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">2. Категории персональных данных</h2>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90">
              <li>ФИО, телефон, email (контактные данные)</li>
              <li>Адрес доставки (для кейтеринга)</li>
              <li>Тип мероприятия, дата, количество гостей</li>
              <li>Информация об аллергиях и диетах (специальная категория — ст. 10 ФЗ-152)</li>
              <li>Для юрлиц: ИНН, КПП, юр. адрес, ЭДО-идентификатор</li>
              <li>Технические данные: IP, cookie, userAgent (для улучшения сайта)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">3. Сбор и хранение</h2>
            <p className="text-sm leading-relaxed mb-3">
              3.1. Данные собираются только при добровольном предоставлении Пользователем через
              формы сайта или по телефону.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              3.2. Хранение — на серверах в Российской Федерации (Yandex Cloud, ru-central1).
              Срок хранения — 5 лет с момента последнего взаимодействия (требование ФНС и НК РФ
              для юр.документации).
            </p>
            <p className="text-sm leading-relaxed">
              3.3. Данные об аллергиях и диетах (специальная категория) — отдельное хранение с
              ограниченным доступом. Удаляются по запросу после исполнения заказа.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">4. Передача третьим лицам</h2>
            <p className="text-sm leading-relaxed mb-3">
              4.1. Исполнитель не передаёт персональные данные третьим лицам, за исключением:
            </p>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-3">
              <li>
                По требованию уполномоченных государственных органов (ФНС, Роспотребнадзор, МВД)
                — в установленном законом порядке
              </li>
              <li>Партнёрам по доставке (только ФИО + адрес, без иных данных)</li>
              <li>Банкам-партнёрам для проведения платежей</li>
              <li>Страховой компании в случае страхового события</li>
            </ul>
            <p className="text-sm leading-relaxed">
              4.2. Исполнитель не продаёт и не арендует базы данных. Маркетинговые рассылки
              только с явного согласия (отдельная галочка при подписке).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">5. Права субъекта</h2>
            <p className="text-sm leading-relaxed mb-3">Пользователь имеет право:</p>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-3">
              <li>Запросить информацию об обрабатываемых данных (ст. 14 ФЗ-152)</li>
              <li>Требовать уточнения, блокировки или уничтожения данных (ст. 15 ФЗ-152)</li>
              <li>Отозвать согласие на обработку в любой момент</li>
              <li>Подать жалобу в Роскомнадзор (rkn.gov.ru)</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Запросы направлять на{' '}
              <a href="mailto:info@odaeda.ru" className="underline">
                info@odaeda.ru
              </a>{' '}
              с темой «Запрос по персональным данным». Ответ — в течение 30 дней.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">6. Cookie и аналитика</h2>
            <p className="text-sm leading-relaxed mb-3">
              6.1. Сайт использует cookie для запоминания корзины,偏好 и аналитики (Яндекс.Метрика).
              См.{' '}
              <a href="/cookies" className="underline">
                Политику cookie
              </a>
              .
            </p>
            <p className="text-sm leading-relaxed">
              6.2. Пользователь может отключить cookie в настройках браузера. Часть функций
              (корзина, конструктор меню) станет недоступна.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">7. Меры безопасности</h2>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90">
              <li>Шифрование HTTPS (TLS 1.3) на всём сайте</li>
              <li>Двухфакторная аутентификация для администраторов</li>
              <li>Ограниченный доступ к БД (role-based)</li>
              <li>Ежедневное резервное копирование</li>
              <li>Регулярный аудит безопасности (раз в полгода)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">8. Контакты оператора</h2>
            <pre className="text-xs whitespace-pre-wrap font-mono bg-secondary p-4 rounded-lg">
{`${LEGAL.operatorFull}
ИНН: ${LEGAL.inn} · ОГРНИП: ${LEGAL.ogrnip}
${LEGAL.legalAddress}
Телефон: +7 (812) 919-59-11
Email: info@odaeda.ru (общий) / b2b@odaeda.ru (B2B)`}
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
}
