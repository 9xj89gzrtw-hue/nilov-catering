import type { Metadata } from "next";
import { LEGAL } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy", languages: { ru: "/privacy", "x-default": "/privacy" } },
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных ИП Нилов Д.И. в соответствии с 152-ФЗ. Сбор, хранение, использование, передача. СПб.",
};

export default function Page() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Политика конфиденциальности</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Редакция от 1 августа 2026 г. Соответствует Федеральному закону №152-ФЗ «О персональных
          данных» от 27.07.2006 (с изм. 2026 г.).
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">1. Общие положения</h2>
            <p className="mb-3 text-sm leading-relaxed">
              1.1. Оператор персональных данных — {LEGAL.operatorFull}, ИНН {LEGAL.inn}, ОГРНИП{" "}
              {LEGAL.ogrnip}, адрес: {LEGAL.legalAddress}.
            </p>
            <p className="mb-3 text-sm leading-relaxed">
              1.2. Политика определяет порядок обработки и защиты персональных данных пользователей
              сайта nilov-catering.vercel.app и клиентов Исполнителя.
            </p>
            <p className="text-sm leading-relaxed">
              1.3. Цели обработки: исполнение договора оказания услуг, информирование о статусе
              заказа, маркетинговые рассылки (с согласия), улучшение качества услуг.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">
              2. Категории персональных данных
            </h2>
            <ul className="text-foreground/90 list-inside list-disc space-y-1.5 text-sm">
              <li>ФИО, телефон, email (контактные данные)</li>
              <li>Адрес доставки (для кейтеринга)</li>
              <li>Тип мероприятия, дата, количество гостей</li>
              <li>Информация об аллергиях и диетах (специальная категория — ст. 10 ФЗ-152)</li>
              <li>Для юрлиц: ИНН, КПП, юр. адрес, ЭДО-идентификатор</li>
              <li>Технические данные: IP, cookie, userAgent (для улучшения сайта)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">3. Сбор и хранение</h2>
            <p className="mb-3 text-sm leading-relaxed">
              3.1. Данные собираются только при добровольном предоставлении Пользователем через
              формы сайта или по телефону.
            </p>
            <p className="mb-3 text-sm leading-relaxed">
              3.2. Хранение — основные данные на серверах в Российской Федерации (Yandex Cloud,
              ru-central1). Аналитические данные (Яндекс.Метрика — тепловые карты, сессионные
              записи) обрабатываются на серверах Яндекса в РФ. Скрипты аналитики загружаются
              только после согласия пользователя с использованием файлов cookie (кнопка «Принять»
              в баннере cookie). Срок хранения — 5 лет с момента последнего взаимодействия
              (требование ФНС и НК РФ для юр.документации).
            </p>
            <p className="text-sm leading-relaxed">
              3.3. Данные об аллергиях и диетах (специальная категория) — отдельное хранение с
              ограниченным доступом. Удаляются по запросу после исполнения заказа.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">4. Передача третьим лицам</h2>
            <p className="mb-3 text-sm leading-relaxed">
              4.1. Исполнитель не передаёт персональные данные третьим лицам, за исключением:
            </p>
            <ul className="text-foreground/90 mb-3 list-inside list-disc space-y-1.5 text-sm">
              <li>
                По требованию уполномоченных государственных органов (ФНС, Роспотребнадзор, МВД) — в
                установленном законом порядке
              </li>
              <li>Партнёрам по доставке (только ФИО + адрес, без иных данных)</li>
              <li>Банкам-партнёрам для проведения платежей</li>
              <li>Страховой компании в случае страхового события</li>
            </ul>
            <p className="text-sm leading-relaxed">
              4.2. Исполнитель не продаёт и не арендует базы данных. Маркетинговые рассылки только с
              явного согласия (отдельная галочка при подписке).
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">5. Права субъекта</h2>
            <p className="mb-3 text-sm leading-relaxed">Пользователь имеет право:</p>
            <ul className="text-foreground/90 mb-3 list-inside list-disc space-y-1.5 text-sm">
              <li>Запросить информацию об обрабатываемых данных (ст. 14 ФЗ-152)</li>
              <li>Требовать уточнения, блокировки или уничтожения данных (ст. 15 ФЗ-152)</li>
              <li>Отозвать согласие на обработку в любой момент</li>
              <li>Подать жалобу в Роскомнадзор (rkn.gov.ru)</li>
            </ul>
            <p className="text-sm leading-relaxed">
              Запросы направлять на{" "}
              <a href="mailto:info@nilov-catering.ru" className="underline">
                info@nilov-catering.ru
              </a>{" "}
              с темой «Запрос по персональным данным». Ответ — в течение 30 дней.
            </p>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">6. Cookie и аналитика</h2>
            <p className="mb-3 text-sm leading-relaxed">
              6.1. Сайт использует cookie для запоминания корзины, настроек и аналитики
              (Яндекс.Метрика — тепловые карты и сессионные записи, данные обрабатываются на
              серверах Яндекса в РФ, см. §3.2). Скрипты аналитики загружаются только после
              согласия пользователя. См.{" "}
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
            <h2 className="font-heading mb-3 text-xl font-medium">7. Меры безопасности</h2>
            <ul className="text-foreground/90 list-inside list-disc space-y-1.5 text-sm">
              <li>Шифрование HTTPS (TLS 1.3) на всём сайте</li>
              <li>Двухфакторная аутентификация для администраторов</li>
              <li>Ограниченный доступ к БД (ролевой моделью)</li>
              <li>Ежедневное резервное копирование</li>
              <li>Регулярный аудит безопасности (раз в полгода)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading mb-3 text-xl font-medium">8. Контакты оператора</h2>
            <pre className="bg-secondary rounded-lg p-4 font-mono text-xs whitespace-pre-wrap">
              {`${LEGAL.operatorFull}
ИНН: ${LEGAL.inn} · ОГРНИП: ${LEGAL.ogrnip}
${LEGAL.legalAddress}
Телефон: +7 (812) 919-59-11
Email: info@nilov-catering.ru (общий) / b2b@nilov-catering.ru (B2B)`}
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
}
