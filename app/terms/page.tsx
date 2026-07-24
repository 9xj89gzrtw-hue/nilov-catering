import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/terms' },
  title: 'Условия оказания услуг — NiloV Catering',
  description:
    'Условия оказания услуг кейтеринга ИП Нилов Д.И. Бронирование, оплата, отмена, ответственность, форс-мажор. СПб.',
};

export default function Page() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Условия оказания услуг</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Редакция от 24 июля 2026 г. Действует для всех заказов, размещённых после этой даты.
          Оператор: {LEGAL.operatorFull}, ИНН {LEGAL.inn}, ОГРНИП {LEGAL.ogrnip}, адрес:{' '}
          {LEGAL.legalAddress}.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-xl font-medium mb-3">1. Общие положения</h2>
            <p className="text-sm leading-relaxed mb-3">
              1.1. Настоящие условия регулируют отношения между ИП Нилов Дмитрий Игоревич
              (далее — «Исполнитель») и физическим или юридическим лицом, разместившим заказ
              (далее — «Заказчик»).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              1.2. Размещение заказа означает полное согласие Заказчика с настоящими условиями
              и публичной офертой (см.{' '}
              <Link href="/offer" className="underline">
                страницу оферты
              </Link>
              ).
            </p>
            <p className="text-sm leading-relaxed">
              1.3. Исполнитель оказывает услуги по приготовлению, доставке и сервировке блюд
              кейтеринга на территории Санкт-Петербурга и Ленинградской области.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">2. Бронирование и согласование</h2>
            <p className="text-sm leading-relaxed mb-3">
              2.1. Заказ считается принятым после подписания договора (или акцепта счёта) и
              внесения предоплаты.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              2.2. Минимальный срок бронирования: 3 рабочих дня для стандартных меню, 14 рабочих
              дней для халяль-меню на 200+ гостей (из-за аудита СМР), 7 рабочих дней для БГ-меню
              с тестированием &lt;20 ppm.
            </p>
            <p className="text-sm leading-relaxed">
              2.3. Дегустация доступна при сумме заказа от 100 000 ₽. Стоимость дегустации —
              3 000 ₽/чел (вычитается из суммы заказа при бронировании).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">3. Оплата</h2>
            <p className="text-sm leading-relaxed mb-3">
              3.1. Физлица: предоплата 50% при бронировании, остаток — в день мероприятия.
              Оплата картой, переводом по СБП или наличными.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              3.2. Юрлица: предоплата 50% по счёту, остаток — в течение 5 рабочих дней после
              мероприятия по акту. ЭДО (Диадок, СБИС) — обязательно.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              3.3. Система налогообложения Исполнителя — {LEGAL.taxSystem}. При необходимости
              выставления счёт-фактуры с НДС — используется налоговый агент (уточняйте).
            </p>
            <p className="text-sm leading-relaxed">
              3.4. Скидки: 10% при бронировании за 60+ дней, 15% за 90+ дней. Объёмные скидки
              при заказе от 100 гостей — индивидуально.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">4. Изменение и отмена заказа</h2>
            <p className="text-sm leading-relaxed mb-3">
              4.1. Изменение состава заказа возможно за 5 рабочих дней до мероприятия (для
              стандартного меню) или за 10 рабочих дней (для халяль/БГ).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              4.2. Отмена заказа: возврат предоплаты — 100% за 14+ дней, 50% за 7–13 дней, 0%
              менее чем за 7 дней. В случае форс-мажора (мед. справка, ЧС) — возврат 100%.
            </p>
            <p className="text-sm leading-relaxed">
              4.3. Изменение количества гостей: уведомление за 72 часа. Уменьшение — не более 15%
              от согласованного. Увеличение — по согласованию.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">5. Доставка</h2>
            <p className="text-sm leading-relaxed mb-3">
              5.1. Доставка в пределах КАД — бесплатно. За КАД — от 3 000 ₽ в зависимости от
              расстояния (зоны 1–3).
            </p>
            <p className="text-sm leading-relaxed mb-3">
              5.2. Парнас, Шушары, Рыбацкое, Кудрово, Девяткино — входят в зону КАД.
            </p>
            <p className="text-sm leading-relaxed">
              5.3. Холодовая цепь ≤+6 °C на всём пути. Горячие блюда доставляются в термоконтейнерах
              с подогревом (+75 °C минимум 2 часа).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">6. Аллергены и спец. требования</h2>
            <p className="text-sm leading-relaxed mb-3">
              6.1. Исполнитель маркирует 14 аллергенов ТР ТС 022/2011 на каждом блюде. Полный
              список — на{' '}
              <Link href="/allergens" className="underline">
                странице аллергенов
              </Link>{' '}
              и в каталоге.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              6.2. Заказчик обязан уведомить об аллергиях и диетах при бронировании. Исполнитель
              принимает все разумные меры, но не гарантирует полное отсутствие перекрёстного
              загрязнения (кроме случаев отдельной линии — БГ, халяль, орехи).
            </p>
            <p className="text-sm leading-relaxed">
              6.3. Анафилаксия на орехи: возможно полностью безореховое производство по
              предварительной договорённости за 7+ дней.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">7. Ответственность</h2>
            <p className="text-sm leading-relaxed mb-3">
              7.1. Гражданская ответственность Исполнителя застрахована в СПАО «Ингосстрах» на
              5 000 000 ₽.
            </p>
            <p className="text-sm leading-relaxed mb-3">
              7.2. В случае порчи имущества Заказчика по вине Исполнителя — возмещение по
              независимой оценке, но не более стоимости заказа.
            </p>
            <p className="text-sm leading-relaxed">
              7.3. Опоздание доставки более 30 минут от согласованного времени — штраф 10% от
              стоимости заказа (по SLA-договору для B2B).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">8. Форс-мажор</h2>
            <p className="text-sm leading-relaxed">
              8.1. Стороны освобождаются от ответственности при обстоятельствах непреодолимой
              силы: пожары, наводнения, землетрясения, акты государственных органов, эпидемии
              (Роспотребнадзор), военные действия. Сторона уведомляет другую в течение 3
              рабочих дней.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">9. Разрешение споров</h2>
            <p className="text-sm leading-relaxed">
              9.1. Споры решаются путём переговоров в течение 14 рабочих дней. При недостижении
              согласия — спор передаётся в Арбитражный суд Санкт-Петербурга и Ленинградской
              области (для юрлиц) или в районный суд по месту нахождения Исполнителя (для
              физлиц). Применяется законодательство РФ.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-medium mb-3">10. Реквизиты Исполнителя</h2>
            <pre className="text-xs whitespace-pre-wrap font-mono bg-secondary p-4 rounded-lg">
{`${LEGAL.operatorFull}
ИНН: ${LEGAL.inn}
ОГРНИП: ${LEGAL.ogrnip}
Налогообложение: ${LEGAL.taxSystem}
Юр. адрес: ${LEGAL.legalAddress}
ЭДО: ${LEGAL.edo.diadoc} / ${LEGAL.edo.sbis}
Банк: ${LEGAL.bank.name}
БИК: ${LEGAL.bank.bik}
р/с: ${LEGAL.bank.account}
Телефон: +7 (812) 919-59-11
Email: info@odaeda.ru / b2b@odaeda.ru`}
            </pre>
          </section>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Документ также доступен в формате PDF по запросу. Связь:{' '}
          <a href="mailto:b2b@odaeda.ru" className="underline">
            b2b@odaeda.ru
          </a>
        </p>
      </div>
    </main>
  );
}
