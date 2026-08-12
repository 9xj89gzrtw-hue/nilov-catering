import type { Metadata } from 'next';
import { LEGAL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/offer', languages: { 'ru': '/offer', 'x-default': '/offer' } },
  title: 'Публичная оферта',
  description:
    'Публичная оферта ИП Нилов Д.И. на оказание услуг кейтеринга. Акцепт осуществляется путём размещения заказа. СПб.',
};

export default function OfferPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Публичная оферта</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Редакция от 1 августа 2026 г. Настоящий документ является публичной офертой в смысле
          ст. 437 ГК РФ. Размещение заказа через сайт nilov-catering.ru, по телефону +7 (812) 919-59-11
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
              <li>Размещение заказа через сайт nilov-catering.ru</li>
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
              3.2. Оплата: депозит 30% бронирует дату (входит в предоплату). Предоплата 50% по счёту при бронировании.
              Остаток 50% — для физлиц в день мероприятия, для юрлиц в течение 5 рабочих дней после мероприятия по акту.
              Для постоянных B2B-клиентов (3+ событий) — отсрочка 14 рабочих дней. Для гос. заказчиков 44-ФЗ — оплата по факту приёмки.
              Единые условия для всех каналов: /certificates, /faq.
            </p>
            <p className="text-sm leading-relaxed">
              3.3. Исполнитель работает на системе налогообложения {LEGAL.taxSystem}. Для Заказчиков на ОСН, требующих счёт-фактуру с НДС, документы оформляются через партнёрское ООО (по запросу). Документы для юрлиц: счёт, акт, УПД. ЭДО — Контур.Диадок и СБИС.
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
              (электричество 220 В, столы, доступ за 4-6 часов до начала — банкет 100+ гостей: за 6 часов, фуршет/кофе-брейк: за 4 часа), принять результат и
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
              5.2. Гражданская ответственность Исполнителя застрахована: базовый полис
              5 000 000 ₽ (ведущие страховые компании РФ). Для контрактов свыше 5 000 000 ₽ —
              расширенное покрытие до 30 000 000 ₽.
            </p>
            <p className="text-sm leading-relaxed">
              5.3. Опоздание доставки — доставка должна быть в согласованное окно: ±15 минут для всех форматов (банкет, фуршет, кофе-брейк, доставка). Штраф 1%
              за каждую минуту опоздания, начиная с 1-й (максимум 30% от суммы заказа). Для
              B2B-клиентов с SLA-договором — расширенные санкции по индивидуальному соглашению.
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
              вступает в силу с момента публикации на сайте nilov-catering.ru.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              7.2. Все споры разрешаются в соответствии с законодательством РФ.
            </p>
            <p className="text-sm leading-relaxed">
              7.3. По всем вопросам обращаться:{' '}
              <a href="mailto:info@nilov-catering.ru" className="underline">
                info@nilov-catering.ru
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
Email: info@nilov-catering.ru / b2b@nilov-catering.ru`}
            </pre>
          </section>
        </div>
      </div>
    </main>
  );
}
