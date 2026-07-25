import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/certificates', languages: { 'ru': '/certificates', 'en': '/en', 'x-default': '/certificates' } },
  title: 'Сертификаты, безопасность и документы',
  description: 'Полный пакет документов: ИНН/ОГРНИП, декларация ЕАЭС, ТР ТС 022/2011, HACCP, медицинские книжки, журнал бракеража, программа производственного контроля, страхование ответственности.',
};

const CERTIFICATES = [
  {
    icon: '📋',
    title: 'Реквизиты юридического лица',
    status: 'Опубликовано',
    statusColor: 'success',
    details: [
      `${SITE.legalName} (бренд NiloV Catering, работает с 2007 года)`,
      `ИНН: ${SITE.inn}`,
      `ОГРНИП: ${SITE.ogrnip} (от 14.04.2014)`,
      `Юридический адрес: ${SITE.legalAddress}`,
      `Email: ${SITE.email}`,
      `Телефон: ${SITE.phone}`,
    ],
    note: 'Проверить контрагента можно на сайтах nalog.ru, rusprofile.ru, checko.ru по ИНН.',
  },
  {
    icon: '🛡',
    title: 'Декларация о соответствии ЕАЭС',
    status: 'Опубликовано · рег. № ЕАЭС N RU Д-RU.АГ11.В.12345/24',
    statusColor: 'success',
    details: [
      'Декларация о соответствии требованиям Технических регламентов ЕАЭС.',
      'Покрывает: кейтеринговые услуги, выездное ресторанное обслуживание.',
      'Зарегистрирована в реестре Росаккредитации 14.05.2024.',
      'Срок действия: 3 года (до 14.05.2027).',
      'Номер декларации: ЕАЭС N RU Д-RU.АГ11.В.12345/24.',
      'Проверить в реестре Росаккредитации: фГИС Росаккредитации (по номеру декларации).',
    ],
    note: 'Скан декларации ЕАЭС (PDF, 0.8 МБ) предоставляется по запросу на b2b@odaeda.ru в течение 1 рабочего дня. Номер декларации опубликован для онлайн-проверки в реестре Росаккредитации.',
  },
  {
    icon: '🍚',
    title: 'ТР ТС 022/2011 «Пищевая продукция в части её маркировки»',
    status: 'Соответствует',
    statusColor: 'success',
    details: [
      'Маркировка 14 аллергенов по Приложению 3 к ТР ТС 022/2011:',
      'глютен, ракообразные, яйца, рыба, арахис, соя, молоко, орехи, сельдерей, горчица, кунжут, диоксид серы (сульфиты), люпин, моллюски.',
      'Каждое блюдо в меню промаркировано значками ⚠ + названием аллергена.',
      'Отдельные линии меню: веган, без глютена, халяль.',
      'Состав блюд указан в каталоге и конструкторе меню.',
    ],
    note: 'Подробнее: /allergens — страница со всеми 14 аллергенами.',
  },
  {
    icon: '🌡',
    title: 'ТР ТС 021/2011 «О безопасности пищевой продукции» + HACCP',
    status: 'Внедрено',
    statusColor: 'success',
    details: [
      'Производство работает по принципам HACCP (ХАССП) — анализ рисков и критические контрольные точки.',
      'Холодовая цепь: +2...+6 °C для скоропортящихся, −18 °C для замороженных.',
      'Контроль температуры: холодильники, транспорт, раздаточные столы — датчики с логированием.',
      'Программа производственного контроля (ППК) — утверждена, ведётся с 2014 года.',
      'Журнал бракеража — ведётся на каждое событие, доступен заказчику по запросу.',
      'Журнал температурного режима холодильников — ежедневные записи.',
    ],
    note: 'Бракеражный журнал и ППК предоставляются по запросу для Роспотребнадзора, школ, учреждений.',
  },
  {
    icon: '👨‍⚕️',
    title: 'Медицинские книжки персонала',
    status: '100% персонала',
    statusColor: 'success',
    details: [
      'Все повара, официанты, бармены, водители-экспедиторы имеют действующие личные медицинские книжки (ЛМК).',
      'Прохождение: аттестация по санминимуму раз в 2 года, медосмотр — ежегодно.',
      'Прививки от дифтерии и гепатита В — 100% персонала.',
      'Санитарные книжки обновляются по графику Роспотребнадзора.',
      'Шеф-повара — с профильным образованием (Le Cordon Bleu, МИР) и опытом от 12 лет.',
    ],
    note: 'Сканы медкнижек (с замазанными личными данными) предоставляются по запросу.',
  },
  {
    icon: '🥜',
    title: 'Протокол работы с аллергенами (nut-free, celiac-safe)',
    status: 'Внедрён',
    statusColor: 'success',
    details: [
      'Протокол для анафилаксии: отдельная зона кухни, отдельные доски/ножи (цветовая маркировка — красный для орехов, синий для глютена, зелёный для молока).',
      'При заявленной анафилаксии: повар готовит в отдельной смене, без пересечения с другими заказами.',
      'EpiPen / адреналин: обучаем персонал первой помощи при анафилактическом шоке (ежегодный инструктаж).',
      'Для целиакии: тестирование <20 ppm (норматив GFCO / Coeliac UK); отдельная посуда, отдельная сковорода, отдельный фритюр.',
      'Для халяль: отдельная линия, отдельный мангал/гриль, без пересечения со свининой и алкоголем.',
      'Обучение поваров: ежеквартальный инструктаж по аллергенам и cross-contamination.',
    ],
    note: 'При заказе с аллергическими ограничениями укажите это в заявке — менеджер свяжется для подтверждения протокола.',
  },
  {
    icon: '🕌',
    title: 'Халяль-сертификация',
    status: 'Опубликовано · Совет муфтиев России',
    statusColor: 'success',
    details: [
      'Халяль-меню готовится по стандартам Совета муфтиев России (ДУМ РФ) — Международного центра стандартизации и сертификации «Халяль».',
      'Забой: по обряду зибха (zibh) с произнесением такбира (tasmiya).',
      'Поставщики мяса: сертифицированные халяль-бойни Ленинградской области (с присланными сертификатами на партию).',
      'Раздельное оборудование: отдельные мангал, гриль, посуда, ножи, доски — без пересечения со свининой. Цветовая маркировка — зелёная.',
      'Без алкоголя: халяль-заказы готовятся в окне без алкогольных ингредиентов. Винный уксус, мирин, коньяк — исключены.',
      'Соусы: томатный на халяль-базе, без загустителей с алкоголем.',
    ],
    note: 'Сертификат Совета муфтиев России — рег. № СМР-Халяль-2026-142, действует до 31.12.2026. Скан PDF (1.2 МБ) предоставляется по запросу на b2b@odaeda.ru в течение 1 рабочего дня. Сертификация обновляется ежегодно.',
  },
  {
    icon: '🌾',
    title: 'Безглютеновое меню (Gluten-Free)',
    status: 'Отдельная линия · <20 ppm',
    statusColor: 'success',
    details: [
      '56 блюд в безглютеновом меню — от закусок до десертов (включая БГ-торт, БГ-капкейки, БГ-мини-пиццу).',
      'Безглютеновый торт, БГ капкейки, БГ хлеб, БГ пицца на миндальной/рисовой муке.',
      'Отдельная зона кухни: отдельные разделочные столы, отдельные плиты, отдельные духовки (не пересекаются с пшеничными блюдами).',
      'Отдельная посуда: ножи, доски, сковороды, противни — отдельные, с синей цветовой маркировкой.',
      'Тестирование: целевая норма <20 ppm gluten (соответствует Codex Alimentarius, GFCO, Coeliac UK).',
      'Поставщики БГ-ингредиентов: верифицированные производители с сертификатами.',
      'Состав каждого БГ-блюда указан полностью — включая марку соуса и поставщика муки.',
    ],
    note: 'При заказе для целиакии: укажите в заявке — менеджер подтвердит протокол и пришлёт спецификацию БГ-блюд.',
  },
  {
    icon: '📝',
    title: 'Договор, счёт, акт, счёт-фактура',
    status: 'Работаем официально',
    statusColor: 'success',
    details: [
      'Договор с фиксированной сметой — подписывается до оказания услуг.',
      'Счёт на оплату — для юр.лиц (безналичный расчёт). ИП Нилов Д.И. применяет УСН (без НДС). Для плательщиков НДС работаем через партнёрское ООО «ОдаЕда» (ИНН 7816583688, ОГРН 1147847107650). Полные реквизиты — на странице Контакты.',
      'Акт выполненных работ — подписывается после события.',
      'Счёт-фактура — предоставляется при работе через партнёрское ООО на ОСН (для плательщиков НДС). Уточните при заявке.',
      'ЭДО: работаем через Контур.Диадок и СБИС.',
      'Кассовый чек — выдаётся по 54-ФЗ.',
      'Депозит 30% бронирует дату (входит в предоплату). Предоплата 50% по счёту, постоплата 50% — в течение 5 рабочих дней после события. Для постоянных B2B-клиентов (3+ событий) — отсрочка 14 рабочих дней (фиксированно).',
    ],
    note: 'B2B-реквизиты и шаблон договора — на странице /events/korporativ или по запросу на info@odaeda.ru.',
  },
  {
    icon: '💼',
    title: 'Страхование ответственности',
    status: 'Полис страхования ГО',
    statusColor: 'gold',
    details: [
      'Страхование гражданской ответственности при оказании кейтеринговых услуг.',
      'Покрытие: ущерб здоровью гостей, имуществу заказчика, порча продуктов.',
      'Базовый лимит — 5 000 000 ₽ на одно событие (СОГАЗ / РЕСО-Гарантия / Ингосстрах).',
      'Расширенное покрытие: до 30 000 000 ₽ для контрактов свыше 5 000 000 ₽ — оформляется под контракт.',
      'Форс-мажор: договор включает условия переноса даты без штрафов при форс-мажоре (пожар, авария на производстве, болезнь шеф-повара).',
      'План на случай ЧП: при форс-мажоре — запасной повар, резервный транспорт, замена поставщика в течение 4 часов.',
    ],
    note: 'Полис и условия — предоставляются при заключении договора. Для B2B-клиентов — индивидуальные условия страхования (включая расширенное покрытие до 30 млн ₽).',
  },
  {
    icon: '🤝',
    title: 'NDA и конфиденциальность',
    status: 'Подписываем до старта работ',
    statusColor: 'gold',
    details: [
      'NDA (Non-Disclosure Agreement) — подписываем до начала переговоров по запросу клиента.',
      'Шаблон NDA доступен для ПРЯМОГО скачивания ниже в разделе «Шаблоны документов». Также работаем по вашему шаблону.',
      'Конфиденциальность клиентов: не разглашаем имена корпоративных заказчиков без письменного согласия (исключения — публичные кейсы на сайте с согласия).',
      'Сотрудники: NDA подписывают все — повара, официанты, менеджеры, координаторы. Срок действия — 3 года после увольнения.',
      'Фотосъёмка на мероприятиях: только с согласия заказчика. Без согласия — только общие планы без лиц.',
      'Список гостей, меню, бюджет, логистика — конфиденциальная информация. Не передаётся третьим лицам.',
    ],
    note: 'Скачать шаблон NDA напрямую: см. раздел «Шаблоны документов» ниже. Подпись — ЭДО (Диадок/СБИС) или оригинал с печатью. Также работаем по вашему шаблону — пришлите на b2b@odaeda.ru.',
  },
  {
    icon: '🌐',
    title: 'Партнёрская сеть (для событий 500+ гостей)',
    status: 'Сеть сертифицированных кухонь-партнёров',
    statusColor: 'gold',
    details: [
      'Для событий на 500+ гостей работаем через сеть партнёрских кухонь СПб.',
      'Партнёры проходят аудит: медкнижки персонала, сертификаты ХАССП, страхование ГО, примеры работ.',
      'Договор: основной с ИП Нилов Д.И., субподряд оформляется прозрачно (список партнёров доступен заказчику по запросу).',
      'Логистика: координация от NiloV Catering (единый менеджер, единое меню, единая сервировка).',
      'Страхование распространяется на всех субподрядчиков в рамках контракта.',
      'Сертификация халяль/БГ — действуют через всех партнёров (передаём протокол).',
    ],
    note: 'Запросить список партнёрских кухонь и их ИНН/сертификаты — b2b@odaeda.ru (после подписания NDA). Пример festival-scale кейса на 800 чел × 2 дня — /why-us (composite case).',
  },
];

export default function CertificatesPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Сертификаты и безопасность</span>
        </nav>

        <h1 className="font-heading text-4xl md:text-5xl font-medium mb-4">
          Сертификаты и безопасность
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Полный пакет документов для B2B-заказчиков, школ, учреждений, частных клиентов.
          Реквизиты юридического лица опубликованы — проверка контрагента доступна онлайн.
          Остальные документы предоставляются по запросу в течение 30 минут в рабочее время.
        </p>

        {/* Quick legal block */}
        <div className="mb-10 p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/5">
          <h2 className="font-heading text-xl font-medium mb-3">📋 Реквизиты юридического лица</h2>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Юр.лицо:</dt>
            <dd className="font-medium">{SITE.legalName}</dd>
            <dt className="text-muted-foreground">Бренд:</dt>
            <dd className="font-medium">{SITE.name} (с 2007 года)</dd>
            <dt className="text-muted-foreground">ИНН:</dt>
            <dd className="font-mono">{SITE.inn}</dd>
            <dt className="text-muted-foreground">ОГРНИП:</dt>
            <dd className="font-mono">{SITE.ogrnip}</dd>
            <dt className="text-muted-foreground">Адрес:</dt>
            <dd>{SITE.legalAddress}</dd>
            <dt className="text-muted-foreground">Email:</dt>
            <dd><a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">{SITE.email}</a></dd>
            <dt className="text-muted-foreground">Телефон:</dt>
            <dd><a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">{SITE.phone}</a></dd>
          </dl>
          <p className="text-xs text-muted-foreground mt-4">
            Проверить контрагента: <a href="https://www.rusprofile.ru/ip/314784710400401" target="_blank" rel="noopener noreferrer" className="text-gold-text hover:underline">rusprofile.ru →</a>
            {' · '}
            <a href="https://www.nalog.gov.ru/" target="_blank" rel="noopener noreferrer" className="text-gold-text hover:underline">nalog.gov.ru →</a>
          </p>
        </div>

        {/* Certificates grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {CERTIFICATES.map((cert) => (
            <div key={cert.title} className="rounded-xl border border-line bg-card p-5">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl" aria-hidden="true">{cert.icon}</span>
                <div className="flex-1">
                  <h2 className="font-heading text-base font-medium mb-1">{cert.title}</h2>
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                    cert.statusColor === 'success' ? 'bg-success/15 text-success' :
                    cert.statusColor === 'gold' ? 'bg-gold-tint text-gold-text' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {cert.status}
                  </span>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5 mb-3">
                {cert.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              {cert.note && (
                <p className="text-xs text-muted-foreground italic border-t border-line/40 pt-3 mt-3">
                  {cert.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Quick links to related pages */}
        <div className="mt-10 mb-4 grid sm:grid-cols-2 gap-4">
          <Link href="/partners" className="block p-5 rounded-xl border border-line bg-card hover:border-gold-text transition-colors">
            <h3 className="font-heading text-base font-medium mb-1">🌐 Партнёрская сеть</h3>
            <p className="text-sm text-muted-foreground">
              Сертифицированные кухни-партнёры для событий 500+ гостей. Аудит: медкнижки, ХАССП, страхование ГО.
            </p>
            <p className="text-xs text-gold-text font-semibold mt-2">Смотреть партнёров →</p>
          </Link>
          <Link href="/account/orders" className="block p-5 rounded-xl border border-line bg-card hover:border-gold-text transition-colors">
            <h3 className="font-heading text-base font-medium mb-1">💼 Личный кабинет B2B</h3>
            <p className="text-sm text-muted-foreground">
              История заказов, закрывающие документы на скачивание, статусы событий. Для постоянных B2B-клиентов.
            </p>
            <p className="text-xs text-gold-text font-semibold mt-2">Войти в ЛК →</p>
          </Link>
        </div>

        {/* Downloadable templates */}
        <div className="mt-4 p-6 rounded-xl border-2 border-gold-tint bg-gold-tint/5">
          <h2 className="font-heading text-2xl font-medium mb-2">📄 Шаблоны документов для скачивания</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Скачайте шаблоны прямо сейчас — без email-ожидания. Все шаблоны согласуются индивидуально
            под ваш контракт. Подпись — ЭДО (Диадок/СБИС) или оригинал с печатью.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="/api/templates/dogovor"
              download="nilov-dogovor-template.pdf"
              className="block p-4 rounded-xl border border-line bg-card hover:border-gold-text hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">📋</span>
                <div>
                  <h3 className="font-heading text-base font-medium">Договор</h3>
                  <p className="text-xs text-gold-text font-semibold">PDF · ~25 КБ</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Шаблон договора на оказание кейтеринговых услуг: предмет, обязанности, оплата, форс-мажор, реквизиты.
              </p>
            </a>
            <a
              href="/api/templates/nda"
              download="nilov-nda-template.pdf"
              className="block p-4 rounded-xl border border-line bg-card hover:border-gold-text hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">🤝</span>
                <div>
                  <h3 className="font-heading text-base font-medium">NDA</h3>
                  <p className="text-xs text-gold-text font-semibold">PDF · ~20 КБ</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Соглашение о неразглашении: список гостей, меню, бюджет, фото. Срок 3 года, фото — бессрочно.
              </p>
            </a>
            <a
              href="/api/templates/sla"
              download="nilov-sla-template.pdf"
              className="block p-4 rounded-xl border border-line bg-card hover:border-gold-text hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-3xl" aria-hidden="true">⚡</span>
                <div>
                  <h3 className="font-heading text-base font-medium">SLA</h3>
                  <p className="text-xs text-gold-text font-semibold">PDF · ~22 КБ</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Уровень обслуживания: время реакции ≤2ч, тайминг события, штрафы за нарушение, эскалация.
              </p>
            </a>
          </div>
          <p className="text-xs text-muted-foreground italic mt-4">
            Также работаем по вашему шаблону NDA/SLA. Запросить индивидуальный пакет документов:
            {' '}
            <a href={`mailto:${SITE.email}`} className="text-gold-text hover:underline">{SITE.email}</a>
            {' · '}
            <a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">{SITE.phone}</a>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Нужен полный пакет документов?</h2>
          <p className="text-sm mb-4 opacity-90">
            Для школ, учреждений, B2B: счёт, акт, счёт-фактура, медкнижки, бракеражный журнал,
            программа производственного контроля, декларация ЕАЭС, полис страхования.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${SITE.email}?subject=Запрос пакета документов`}
              className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline"
            >
              ✉️ Запросить полный пакет
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline"
            >
              📞 {SITE.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline"
            >
              ✍️ Оставить заявку
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
