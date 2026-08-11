// PDF template generator for legal documents
// /api/templates/[doc]/route.ts → returns PDF for "dogovor" | "nda" | "sla"
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { ReactElement } from 'react';
import { SITE } from '@/lib/data';

export const dynamic = 'force-static';

const styles = StyleSheet.create({
  page: { fontSize: 11, padding: 36, fontFamily: 'Helvetica', color: '#1a1a1a', lineHeight: 1.45 },
  h1: { fontSize: 18, marginBottom: 8, textAlign: 'center', fontFamily: 'Helvetica-Bold' },
  h2: { fontSize: 13, marginTop: 16, marginBottom: 6, fontFamily: 'Helvetica-Bold' },
  p: { marginBottom: 8 },
  meta: { fontSize: 9, color: '#666', marginBottom: 24, textAlign: 'center' },
  list: { marginBottom: 8, paddingLeft: 16 },
  listItem: { marginBottom: 4 },
  footer: { fontSize: 8, color: '#999', marginTop: 32, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#ccc', textAlign: 'center' },
  signature: { marginTop: 36, flexDirection: 'row', justifyContent: 'space-between' },
  signatureBlock: { width: '45%' },
  signatureLine: { marginTop: 36, borderTopWidth: 1, borderTopColor: '#000', paddingTop: 4 },
  field: { marginBottom: 6 },
  fieldName: { fontSize: 9, color: '#666' },
  fieldValue: { fontSize: 11, borderBottomWidth: 1, borderBottomColor: '#999', minHeight: 16 },
  badge: { fontSize: 8, color: '#999', marginTop: 4 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 4, marginBottom: 4 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#333', paddingBottom: 4, marginBottom: 6, fontFamily: 'Helvetica-Bold', fontSize: 10 },
  tableCellName: { flex: 3 },
  tableCellPrice: { flex: 1, textAlign: 'right' },
  tableCellQty: { flex: 1, textAlign: 'center' },
  highlight: { backgroundColor: '#fff8e1', padding: 8, borderRadius: 4, marginBottom: 8 },
  warning: { backgroundColor: '#ffebee', padding: 8, borderRadius: 4, marginBottom: 8, fontSize: 10 },
});

function DocHeader({ docType }: { docType: string }) {
  const titles: Record<string, string> = {
    dogovor: 'Договор на оказание кейтеринговых услуг',
    nda: 'Соглашение о неразглашении конфиденциальной информации (NDA)',
    sla: 'Соглашение об уровне обслуживания (SLA) для корпоративных клиентов',
  };
  return (
    <View>
      <Text style={styles.h1}>{titles[docType] || 'Документ'}</Text>
      <Text style={styles.meta}>
        Шаблон от {SITE.legalName} (бренд {SITE.name}) · ИНН {SITE.inn} · ОГРНИП {SITE.ogrnip}
        {'\n'}Редакция от 25.07.2026 · Документ действует как шаблон; финальная версия согласовывается сторонами
      </Text>
    </View>
  );
}

function DocFooter() {
  return (
    <View style={styles.footer} fixed>
      <Text>
        {SITE.legalName} · ИНН {SITE.inn} · ОГРНИП {SITE.ogrnip} · {SITE.legalAddress}
      </Text>
      <Text>
        {SITE.phone} · {SITE.email} · nilov-catering.ru · стр. {`$PAGE/$TOTAL_PAGES`}
      </Text>
      <Text>© 2007–2026 NiloV Catering. Шаблон. Не является публичной офертой (ст. 437 ГК РФ).</Text>
    </View>
  );
}

function DogovorTemplate(): ReactElement {
  return (
    <Document title="Договор на оказание кейтеринговых услуг — NiloV Catering" author={SITE.legalName}>
      <Page size="A4" style={styles.page}>
        <DocHeader docType="dogovor" />

        <Text style={styles.h2}>1. Предмет договора</Text>
        <Text style={styles.p}>
          1.1. Исполнитель ({SITE.legalName}, действующий как ИП Нилов Дмитрий Игоревич, ОГРНИП {SITE.ogrnip}) обязуется оказать Заказчику кейтеринговые услуги по организации выездного ресторанного обслуживания (далее — Услуги), а Заказчик обязуется принять и оплатить Услуги в соответствии с условиями настоящего Договора.
        </Text>
        <Text style={styles.p}>
          1.2. Перечень Услуг, дата, время, место проведения, количество гостей и меню определяются в Спецификации (Приложение №1), являющейся неотъемлемой частью настоящего Договора.
        </Text>

        <Text style={styles.h2}>2. Права и обязанности сторон</Text>
        <Text style={styles.p}>2.1. Исполнитель обязан:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>2.1.1. Оказать Услуги в полном объёме согласно Спецификации и согласованному меню.</Text>
          <Text style={styles.listItem}>2.1.2. Обеспечить соблюдение санитарно-эпидемиологических требований ТР ТС 021/2011, ТР ТС 022/2011, СанПиН 2.3/2.4.3590-20.</Text>
          <Text style={styles.listItem}>2.1.3. Предоставить персонал с действующими медицинскими книжками (ЛМК).</Text>
          <Text style={styles.listItem}>2.1.4. Соблюдать маркировку 14 аллергенов по ТР ТС 022/2011 Приложение 3.</Text>
          <Text style={styles.listItem}>2.1.5. По запросу Заказчика предоставить: декларацию ЕАЭС, бракеражный журнал, ППК, полис страхования ГО (базовый лимит 5 000 000 ₽).</Text>
        </View>
        <Text style={styles.p}>2.2. Заказчик обязан:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>2.2.1. Своевременно согласовать меню, количество гостей и логистику (не позднее чем за 5 рабочих дней до события).</Text>
          <Text style={styles.listItem}>2.2.2. Обеспечить доступ на площадку за 4 часа до начала события.</Text>
          <Text style={styles.listItem}>2.2.3. Информировать Исполнителя о пищевых аллергиях и медицинских диетах гостей не позднее чем за 72 часа до события.</Text>
          <Text style={styles.listItem}>2.2.4. Произвести оплату Услуг в порядке, предусмотренном разделом 3.</Text>
        </View>

        <Text style={styles.h2}>3. Стоимость и порядок расчётов</Text>
        <Text style={styles.p}>
          3.1. Стоимость Услуг определяется в Спецификации и включает: меню, аренду оборудования, работу персонала, логистику в пределах СПб и Ленинградской области.
        </Text>
        <Text style={styles.p}>
          3.2. Депозит 30% бронирует дату и входит в предоплату. Предоплата 50% — по счёту после подписания Договора. Постоплата 50% — в течение 5 рабочих дней после подписания Акта выполненных работ.
        </Text>
        <Text style={styles.p}>
          3.3. ИП Нилов Д.И. применяет УСН (без НДС). Для Заказчиков на ОСН, требующих счёт-фактуру с НДС, работы оформляются через партнёрское ООО по предварительному согласованию с Заказчиком.
        </Text>
        <Text style={styles.p}>
          3.4. ЭДО: Контур.Диадок, СБИС. Кассовый чек выдаётся по 54-ФЗ.
        </Text>

        <Text style={styles.h2}>4. Форс-мажор</Text>
        <Text style={styles.p}>
          4.1. Стороны освобождаются от ответственности за неисполнение обязательств при форс-мажорных обстоятельствах: пожар, авария на производстве, болезнь шеф-повара, стихийные бедствия, акты государственных органов.
        </Text>
        <Text style={styles.p}>
          4.2. При форс-мажоре Исполнитель предоставляет запасного повара, резервный транспорт и замену поставщика в течение 4 часов.
        </Text>

        <Text style={styles.h2}>5. Реквизиты сторон</Text>
        <View style={styles.signature}>
          <View style={styles.signatureBlock}>
            <Text style={{fontFamily: 'Helvetica-Bold', marginBottom: 4}}>Исполнитель:</Text>
            <Text>{SITE.legalName}</Text>
            <Text>ИНН: {SITE.inn}</Text>
            <Text>ОГРНИП: {SITE.ogrnip}</Text>
            <Text>Адрес: {SITE.legalAddress}</Text>
            <Text>Тел: {SITE.phone}</Text>
            <Text>Email: {SITE.email}</Text>
            <View style={styles.signatureLine}>
              <Text>________________ / Нилов Д.И. /</Text>
              <Text style={styles.badge}>М.П.</Text>
            </View>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={{fontFamily: 'Helvetica-Bold', marginBottom: 4}}>Заказчик:</Text>
            <View style={styles.field}><Text style={styles.fieldName}>Наименование / ФИО</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.field}><Text style={styles.fieldName}>ИНН</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.field}><Text style={styles.fieldName}>ОГРН/ОГРНИП</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.field}><Text style={styles.fieldName}>Юридический адрес</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.field}><Text style={styles.fieldName}>Телефон</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.field}><Text style={styles.fieldName}>Email</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.signatureLine}>
              <Text>________________ / ____________ /</Text>
              <Text style={styles.badge}>М.П.</Text>
            </View>
          </View>
        </View>

        <DocFooter />
      </Page>
    </Document>
  );
}

function NdaTemplate(): ReactElement {
  return (
    <Document title="NDA — NiloV Catering" author={SITE.legalName}>
      <Page size="A4" style={styles.page}>
        <DocHeader docType="nda" />

        <Text style={styles.highlight}>
          Настоящий шаблон NDA предоставляется для ознакомления. NiloV Catering готов подписать как свой, так и ваш шаблон NDA. Подпись возможна через ЭДО (Диадок/СБИС) или оригинал с печатью.
        </Text>

        <Text style={styles.h2}>1. Определение конфиденциальной информации</Text>
        <Text style={styles.p}>
          1.1. Конфиденциальная информация — любая информация, переданная одной стороной (Раскрытой стороной) другой стороне (Получающей стороне) в связи с переговорами или исполнением договора на оказание кейтеринговых услуг, в том числе:
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Список гостей мероприятия, их контакты, dietary restrictions, медицинские показания;</Text>
          <Text style={styles.listItem}>• Меню мероприятия, бюджет, логистика, техническое задание;</Text>
          <Text style={styles.listItem}>• Условия договора, финансовые показатели, коммерческие предложения;</Text>
          <Text style={styles.listItem}>• Фотоматериалы с мероприятия (без письменного согласия — не публикуются);</Text>
          <Text style={styles.listItem}>• Информация о бизнес-процессах, контрагентах, поставщиках Раскрытой стороны.</Text>
        </View>
        <Text style={styles.p}>
          1.2. Не является конфиденциальной информация, которая была публично известна на момент раскрытия, стала публичной без нарушения настоящего Соглашения, или была законно получена от третьего лица без обязательства по неразглашению.
        </Text>

        <Text style={styles.h2}>2. Обязательства получающей стороны</Text>
        <Text style={styles.p}>2.1. Получающая сторона обязуется:</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>2.1.1. Использовать Конфиденциальную информацию исключительно для целей исполнения договора с NiloV Catering.</Text>
          <Text style={styles.listItem}>2.1.2. Не разглашать Конфиденциальную информацию третьим лицам без письменного согласия Раскрытой стороны.</Text>
          <Text style={styles.listItem}>2.1.3. Обеспечить конфиденциальность силами своих сотрудников и субподрядчиков, ознакомив их с условиями настоящего NDA. Сотрудники NiloV Catering подписывают внутренний NDA при приёме на работу (срок действия — 3 года после увольнения).</Text>
          <Text style={styles.listItem}>2.1.4. По запросу Раскрытой стороны — уничтожить или вернуть носители с Конфиденциальной информацией в течение 5 рабочих дней.</Text>
        </View>

        <Text style={styles.h2}>3. Срок действия</Text>
        <Text style={styles.p}>
          3.1. Настоящее Соглашение действует с момента подписания и в течение 3 (трёх) лет после завершения переговоров или исполнения договора.
        </Text>
        <Text style={styles.p}>
          3.2. Обязательство по неразглашению списка гостей, медицинских показаний (включая аллергии), и фотоматериалов с мероприятия — бессрочное.
        </Text>

        <Text style={styles.h2}>4. Фотосъёмка</Text>
        <Text style={styles.p}>
          4.1. Фотосъёмка на мероприятии проводится только с письменного согласия Заказчика. Без согласия — только общие планы (блюда, сервировка, зал) без лиц гостей.
        </Text>
        <Text style={styles.p}>
          4.2. Любые фото/видео с лицами гостей могут быть использованы в маркетинговых материалах NiloV Catering исключительно при наличии письменного согласия Заказчика и изображённых лиц.
        </Text>

        <Text style={styles.h2}>5. Подписи сторон</Text>
        <View style={styles.signature}>
          <View style={styles.signatureBlock}>
            <Text style={{fontFamily: 'Helvetica-Bold', marginBottom: 4}}>Раскрытая сторона:</Text>
            <Text>{SITE.legalName}</Text>
            <Text>ИНН: {SITE.inn} · ОГРНИП: {SITE.ogrnip}</Text>
            <View style={styles.signatureLine}>
              <Text>________________ / Нилов Д.И. /</Text>
              <Text style={styles.badge}>М.П.</Text>
            </View>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={{fontFamily: 'Helvetica-Bold', marginBottom: 4}}>Получающая сторона:</Text>
            <View style={styles.field}><Text style={styles.fieldName}>Наименование / ФИО</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.field}><Text style={styles.fieldName}>ИНН</Text><Text style={styles.fieldValue}> </Text></View>
            <View style={styles.signatureLine}>
              <Text>________________ / ____________ /</Text>
              <Text style={styles.badge}>М.П.</Text>
            </View>
          </View>
        </View>

        <DocFooter />
      </Page>
    </Document>
  );
}

function SlaTemplate(): ReactElement {
  return (
    <Document title="SLA — NiloV Catering" author={SITE.legalName}>
      <Page size="A4" style={styles.page}>
        <DocHeader docType="sla" />

        <Text style={styles.highlight}>
          SLA (Service Level Agreement) — для корпоративных клиентов с регулярными заказами (3+ событий в квартал или подписка на обеды). Индивидуальные SLA — для контрактов от 1 000 000 ₽.
        </Text>

        <Text style={styles.h2}>1. Время реакции и подтверждения</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCellName}>Тип запроса</Text>
          <Text style={styles.tableCellQty}>Канал</Text>
          <Text style={styles.tableCellPrice}>SLA</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellName}>Запрос на кейтеринг (новый)</Text>
          <Text style={styles.tableCellQty}>Email / форма</Text>
          <Text style={styles.tableCellPrice}>≤ 2 ч (рабочее)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellName}>Запрос на кейтеринг (новый)</Text>
          <Text style={styles.tableCellQty}>Звонок</Text>
          <Text style={styles.tableCellPrice}>≤ 30 мин</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellName}>Корректировка меню (за 5+ дней до события)</Text>
          <Text style={styles.tableCellQty}>Email</Text>
          <Text style={styles.tableCellPrice}>≤ 4 ч</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellName}>Срочная корректировка (за 24-72 ч)</Text>
          <Text style={styles.tableCellQty}>Звонок + email</Text>
          <Text style={styles.tableCellPrice}>≤ 1 ч</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellName}>Документы (договор/счёт/акт/ЭДО)</Text>
          <Text style={styles.tableCellQty}>Email</Text>
          <Text style={styles.tableCellPrice}>≤ 1 рабочий день</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellName}>Инцидент на событии</Text>
          <Text style={styles.tableCellQty}>Менеджер на площадке</Text>
          <Text style={styles.tableCellPrice}>≤ 5 мин</Text>
        </View>

        <Text style={styles.h2}>2. Тайминг события</Text>
        <Text style={styles.p}>
          2.1. Заезд команды на площадку — за 4 часа до начала события (для банкетов 100+ гостей — за 6 часов).
        </Text>
        <Text style={styles.p}>
          2.2. Готовность раздаточных столов — за 30 минут до официального начала.
        </Text>
        <Text style={styles.p}>
          2.3. Подача блюд — по согласованному таймингу (Приложение к Спецификации). Отклонение ±5 минут для фуршета, ±10 минут для банкета.
        </Text>
        <Text style={styles.p}>
          2.4. Демонтаж — после официального завершения + 30 минут. Логистика вывоза оборудования — 1.5 часа.
        </Text>

        <Text style={styles.h2}>3. Качество и протоколы безопасности</Text>
        <Text style={styles.p}>3.1. Соответствие ТР ТС 021/2011, ТР ТС 022/2011, СанПиН 2.3/2.4.3590-20 — обязательно.</Text>
        <Text style={styles.p}>3.2. Холодовая цепь: +2...+6 °C для скоропортящихся, −18 °C для замороженных. Датчики температуры с логированием.</Text>
        <Text style={styles.p}>3.3. Маркировка 14 аллергенов по ТР ТС 022/2011 Приложение 3 — на каждом блюде.</Text>
        <Text style={styles.p}>3.4. Персонал с ЛМК — 100%. Шеф-повара — опыт 12+ лет.</Text>
        <Text style={styles.p}>3.5. Страхование ГО — базовый лимит 5 000 000 ₽, расширенный — до 30 000 000 ₽.</Text>

        <Text style={styles.h2}>4. Штрафы за нарушение SLA</Text>
        <Text style={styles.p}>4.1. Опоздание менеджера на событие (без форс-мажора) — возврат 5% от стоимости события.</Text>
        <Text style={styles.p}>4.2. Отклонение тайминга подачи более ±15 минут (для банкета) / ±10 минут (для фуршета) — возврат 3%.</Text>
        <Text style={styles.p}>4.3. Нарушение холодовой цепи, зафиксированное Заказчиком — возврат 100% стоимости пострадавших блюд + компенсация 10% от стоимости события.</Text>
        <Text style={styles.p}>4.4. При форс-мажоре (см. раздел 4 Договора) — штрафы не применяются.</Text>

        <Text style={styles.h2}>5. Эскалация</Text>
        <Text style={styles.p}>5.1. Уровень 1: Менеджер события (контакт в Спецификации).</Text>
        <Text style={styles.p}>5.2. Уровень 2: Шеф-повар ({SITE.phone}).</Text>
        <Text style={styles.p}>5.3. Уровень 3: Дмитрий Нилов, руководитель бренда ({SITE.email}).</Text>

        <DocFooter />
      </Page>
    </Document>
  );
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ doc: string }> }
) {
  const { doc } = await params;
  const valid: Record<string, () => ReactElement> = {
    dogovor: DogovorTemplate,
    nda: NdaTemplate,
    sla: SlaTemplate,
  };
  if (!valid[doc]) {
    return NextResponse.json({ error: 'Unknown template' }, { status: 404 });
  }
  try {
    // Cast to any to bypass @react-pdf/renderer's strict DocumentProps typing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const TemplateFn = valid[doc] as any;
    const pdfBuffer = await renderToBuffer(TemplateFn());
    const filename = `nilov-${doc}-template.pdf`;
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e: unknown) {
    const err = e as Error;
    console.error('PDF render error:', err.message);
    return NextResponse.json({ error: 'PDF generation failed', detail: err.message }, { status: 500 });
  }
}
