import type { Metadata } from 'next';
import { LEGAL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/offer' },
  title: 'Публичная оферта — NiloV Catering',
  description:
    'Публичная оферта ИП Нилов Д.И. на оказание услуг кейтеринга. Акцепт осуществляется путём размещения заказа. СПб.',
};

export default function OfferPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Публичная оферта</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Редакция от 24 июля 2026 г. Настоящий документ является публичной офертой в смысле
          ст. 437 ГК РФ. Размещение заказа через сайт odaeda.ru, по телефону +7 (812) 919-59-11
          или через форму заявки означает полный акцепт настоящей оферты (ст. 438 ГК РФ).
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-xl font-medium mb-3">1. Предмет оферты</h2>
            <p className="text-sm leading-relaxed">
              1.1. Исполнитель ({LEGAL.operatorFull}, ИНН {LEGAL.inn}, ОГРНИП {LEGAL.ogrnip})
              обязуется оказать Заказчику услуги по приготовлению, доставке и сервировке блюд
              кейтеринга на условиях, согласованных сторонами в счёте-договоре.
            </p>
            <p className="text-sm leading-relaxed mt-3">
              1.2. Заказчик обязуется принять и оплатить услуги в порядке и на условиях,
              изложенных в настоящей оферте и на странице{' '}
              <a href="/terms" className="underline">
                «Условия оказания услуг»
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">2. Акцепт оферты</h2>
            <p className="text-sm leading-relaxed mb-3">
              2.1. Акцепт оферты осуществляется одним из следующих способов:
            </p>
            <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-3">
              <li>Размещение заказа через сайт odaeda.ru</li>
              <li>Подача заявки по телефону +7 (812) 919-59-11</li>
              <li>Подача заявки через WhatsApp/Telegram</li>
              <li>Подписание счёта-договора (для юрлиц)</li>
              <li>Внесение предоплаты 50% от суммы заказа</li>
            </ul>
            <p className="text-sm leading-relaxed">
              2.2. С момента акцепта оферта считается заключённым договором оказания услуг.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">3. Стоимость и порядок оплаты</h2>
            <p className="text-sm leading-relaxed mb-3">
              3.1. Стоимость услуг определяется исходя из действующего прайса на момент акцепта
              оферты. Прайс доступен на странице{' '}
              <a href="/pricing" className="underline">
                «Тарифы»
              </a>{' '}
              и в{' '}
              <a href="/menu/catalog" className="underline">
                каталоге блюд
              </a>
              .
            </p>
            <p className="text-sm leading-relaxed mb-3">
              3.2. Оплата: предоплата 50% при бронировании, остаток 50% — в день мероприятия
              (для физлиц) или в течение 5 рабочих дней после мероприятия по акту (для юрлиц).
            </p>
            <p className="text-sm leading-relaxed">
              3.3. Исполнитель работает на системе налогообложения {LEGAL.taxSystem}. Документы
              для юрлиц: счёт, акт, УПД. ЭДО — Контур.Диадок и СБИС.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">4. Права и обязанности сторон</h2>
            <p className="text-sm leading-relaxed mb-3">
              4.1. Исполнитель обязуется оказать услуги надлежащего качества, в согласованные
              сроки, с соблюдением санитарно-эпидемиологических требований (ТР ТС 022/2011, ТР ТС
              021/2011, СанПиН 2.3/2.4.3590-20).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              4.2. Заказчик обязуется предоставить площадку с условиями для сервировки
              (электричество 220 В, столы, доступ за 90 минут до начала), принять результат и
              оплатить услуги.
            </p>
            <p className="text-sm leading-relaxed">
              4.3. Подробные права и обязанности — в{' '}
              <a href="/terms" className="underline">
                «Условиях оказания услуг»
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">5. Ответственность</h2>
            <p className="text-sm leading-relaxed mb-3">
              5.1. Исполнитель несёт ответственность за качество блюд и своевременность доставки
              в соответствии с законодательством РФ (ЗоЗПП, ГК РФ).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              5.2. Гражданская ответственность Исполнителя застрахована в СПАО «Ингосстрах» на
              5 000 000 ₽.
            </p>
            <p className="text-sm leading-relaxed">
              5.3. За нарушение сроков доставки более 30 минут — штраф 10% от стоимости заказа.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">6. Изменение и расторжение</h2>
            <p className="text-sm leading-relaxed mb-3">
              6.1. Договор может быть расторгнут по соглашению сторон или в одностороннем
              порядке в соответствии со ст. 782 ГК РФ.
            </p>
            <p className="text-sm leading-relaxed">
              6.2. Условия возврата предоплаты при расторжении — в{' '}
              <a href="/terms" className="underline">
                «Условиях оказания услуг»
              </a>{' '}
              (раздел 4).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">7. Заключительные положения</h2>
            <p className="text-sm leading-relaxed mb-3">
              7.1. Исполнитель оставляет за собой право изменять условия оферты. Новая редакция
              вступает в силу с момента публикации на сайте odaeda.ru.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              7.2. Все споры разрешаются в соответствии с законодательством РФ.
            </p>
            <p className="text-sm leading-relaxed">
              7.3. По всем вопросам обращаться:{' '}
              <a href="mailto:info@odaeda.ru" className="underline">
                info@odaeda.ru
              </a>
              , +7 (812) 919-59-11.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">8. Реквизиты Исполнителя</h2>
            <pre className="text-xs whitespace-pre-wrap font-mono bg-secondary p-4 rounded-lg">
{`${LEGAL.operatorFull}
ИНН: ${LEGAL.inn}
ОГРНИП: ${LEGAL.ogrnip}
Налогообложение: ${LEGAL.taxSystem}
Юр. адрес: ${LEGAL.legalAddress}
ЭДО: ${LEGAL.edo.diadoc} / ${LEGAL.edo.sbis}
Банк: ${LEGAL.bank.name} · БИК ${LEGAL.bank.bik}
р/с: ${LEGAL.bank.account}
Телефон: +7 (812) 919-59-11
Email: info@odaeda.ru / b2b@odaeda.ru`}
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
}
