import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE } from "@/lib/data";
import RelatedPages from "@/components/common/RelatedPages";
import SmartCTA from "@/components/common/SmartCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/faq", languages: { ru: "/faq", "x-default": "/faq" } },
  title: "FAQ — частые вопросы о кейтеринге",
  description:
    "Ответы на 22 частых вопроса: цены, минимальный заказ, дегустация, аллергены, B2B, договор, ЭДО, НДС, NDA, медкнижки, бракераж, страхование, форс-мажор, диабет, поминки.",
};

const FAQS_B2C = [
  {
    q: "Какая минимальная сумма заказа?",
    a: "Минимум зависит от формата и тарифа. Кофе-брейк — от 10 гостей × 390 ₽ = 3 900 ₽ (Эконом). Фуршет — от 20 гостей × 2 450 ₽ = 49 000 ₽ (Эконом); Расширенный от 20 × 5 950 ₽ = 119 000 ₽. Банкет — от 15 × 3 950 ₽ = 59 250 ₽ (Эконом свадебный); Максимальный от 15 × 9 950 ₽ = 149 250 ₽. Точную сумму рассчитает менеджер — оставьте заявку на /contact.",
  },
  {
    q: "За сколько дней бронировать?",
    a: "Минимум 3 дня. Рекомендуем 2–4 недели, особенно в высокий сезон (май–сентябрь, декабрь). При бронировании за 30+ дней — скидка 5%, за 60+ дней — 10%, за 90+ дней — 15%.",
  },
  {
    q: "Работаете ли за КАД?",
    a: "Да, по всей Ленинградской области. В пределах КАД — доставка бесплатно. За КАД — надбавка от 3 000 ₽ в зависимости от расстояния (зависит от километража и логистики).",
  },
  {
    q: "Можно ли заказать дегустацию?",
    a: "Да, для событий от 30 гостей — обязательная бесплатная дегустация (до 6 блюд из вашего тарифа). Для меньших событий — платная от 3 000 ₽/чел (сумма зачисляется в заказ). Для медицинских диет (целиакия, анафилаксия, СД1) — обязательная дегустация от 1 гостя, бесплатно. Дегустация с выездом к вам — от 5 000 ₽ за выезд.",
  },
  {
    q: "Что с аллергиями?",
    a: "Маркируем 14 аллергенов по ТР ТС 022/2011 (Приложение 3): глютен, ракообразные, яйца, рыба, арахис, соя, молоко, орехи, сельдерей, горчица, кунжут, сульфиты, люпин, моллюски. Веган, безглютен, халяль — отдельные линии меню с отдельным оборудованием. При заявленной анафилаксии — отдельная смена, отдельные доски/ножи, наличие EpiPen. Укажите аллергены в заявке — менеджер свяжется для подтверждения протокола.",
  },
  {
    q: "Включены ли чаевые?",
    a: "Нет, чаевые не включены и остаются на усмотрение заказчика. Официанты и повара получают фиксированную оплату по договору — чаевые не являются их основным доходом.",
  },
  {
    q: "Можно ли заказать несколько диет в одном заказе?",
    a: "Да! В конструкторе есть режим «Несколько групп гостей». Каждая группа получает своё под-меню с фильтром по диете: веганы + халяль + без глютена + без орехов + всеядные в одном заказе. Цена по группам — вы платите только за блюда своей группы. Например, свадьба на 80: 10 веганов + 8 халяль + 4 БГ + 1 без орехов + 57 всеядных.",
  },
  {
    q: "Что входит в стоимость тарифа?",
    a: "Всё включено: еда и напитки по тарифу, официанты (1 на 10 гостей), координатор события, посуда и столовые приборы, текстиль, доставка в пределах КАД, установка и сервировка, уборка после события. Доплаты: доставка за КАД (от 3 000 ₽), аренда оборудования (от 5 000 ₽), бармен-шоу (от 8 000 ₽), шампанское безлимит (от 1 500 ₽/гость), свадебный торт (от 1 200 ₽/кг).",
  },
  {
    q: "Депозит и возврат?",
    a: "Депозит 30% от стоимости заказа — для брони даты (входит в предоплату 50%). Возврат: за 14+ дней до события — 100% возврат, за 7–13 дней — 50%, менее чем за 7 дней — невозврат (но перенос даты бесплатный). В случае форс-мажора (пожар, авария, болезнь, мед. справка) — возврат 100%. Подробно — в «Условиях оказания услуг» §4.2.",
  },
  {
    q: "Можно ли изменить меню после брони?",
    a: "Да. Изменения состава — за 5 рабочих дней до события (стандартное меню) или за 10 рабочих дней (халяль/БГ) бесплатно. Менее этого срока — только количественные изменения (не состав). Соответствует §4.1 Условий оказания услуг.",
  },
];

const FAQS_B2B = [
  {
    q: "Работаете с юридическими лицами?",
    a: "Да, B2B — наше основное направление. Договор юр.лицо ↔ юр.лицо с фиксированной сметой. Счёт на оплату (безналичный расчёт). Закрывающие документы: акт + счёт-фактура. ЭДО: Контур.Диадок, СБИС. ИП Нилов Д.И. применяет УСН (без НДС). Для плательщиков НДС (ОСН) — оформляем через партнёрское ООО (по запросу). Кассовый чек по 54-ФЗ.",
  },
  {
    q: "Какие документы предоставляете для Роспотребнадзора?",
    a: "Полный пакет: действующие медицинские книжки 100% персонала, журнал бракеража на каждое событие, программа производственного контроля (ППК), ТР ТС 021/2011 + HACCP, температурный режим (холодовая цепь ≤+6 °C), сертификаты на все продукты. По запросу — сканы с замазанными личными данными. Подробнее: /certificates",
  },
  {
    q: "Работаете по 44-ФЗ и 223-ФЗ?",
    a: "Да, поддерживаем закупочные процедуры. Готовим документы для тендера: тех. задание, спецификация, смета, реквизиты. ИНН/ОГРНИП — опубликованы на сайте. Срок подготовки тендерной документации — 1-2 рабочих дня. Связаться с B2B-менеджером: b2b@nilov-catering.ru, +7 (812) 919-59-11.",
  },
  {
    q: "Есть ли SLA в договоре?",
    a: "Да, для B2B-клиентов с объёмом от 30 гостей — индивидуальный SLA. Метрики: доставка (точно в согласованное окно — ±15 минут для всех форматов (банкет, фуршет, кофе-брейк, доставка); штраф 1% за каждую минуту опоздания, максимум 30% от суммы заказа), качество (жалобы ≤5% гостей), компенсация при нарушении (штраф 5-15% от стоимости). Страхование гражданской ответственности — базовый полис 5 000 000 ₽ (для контрактов свыше 5 млн — расширенное покрытие до 30 000 000 ₽ через ведущие страховые компании РФ). План на случай ЧП: запасной повар, резервный транспорт, замена поставщика в течение 4 часов.",
  },
  {
    q: "Отсрочка платежа для B2B?",
    a: "Для постоянных клиентов (3+ событий) — отсрочка 14 рабочих дней (фиксированно, прописывается в договоре). Для новых B2B-клиентов — 50% предоплата, 50% постоплата в течение 5 рабочих дней после события. Депозит 30% бронируется за дату (входит в предоплату). Для гос. заказчиков по 44-ФЗ — оплата по факту после приёмки.",
  },
  {
    q: "Скидки за объём?",
    a: "От 50 гостей — 5%, от 100 гостей — 10%, от 200 гостей — 15%, от 500 гостей — индивидуально. Для многодневных конференций (2+ дня) — пакетная цена со скидкой 20%. Для школ и учреждений — спец. тариф от 1 800 ₽/гость.",
  },
  {
    q: "Страхование и форс-мажор?",
    a: "Полис страхования гражданской ответственности: базовый — 5 000 000 ₽ на событие. Для контрактов свыше 5 000 000 ₽ — расширенное покрытие до 30 000 000 ₽ через ведущие страховые компании РФ. Покрытие: ущерб здоровью гостей, имуществу заказчика, порча продуктов. Форс-мажор (пожар, авария на производстве, болезнь шеф-повара) — перенос даты без штрафов. План на случай ЧП: резервный шеф, запасной транспорт, замена поставщика в течение 4 часов.",
  },
  {
    q: "Можно ли получить договор и реквизиты заранее?",
    a: "Да. Реквизиты ИП Нилов Д.И. (ИНН 781433059704, ОГРНИП 314784710400401) — опубликованы на /certificates. Шаблон договора, NDA и SLA доступны для ПРЯМОГО скачивания на /certificates (PDF, без email-ожидания). Для B2B-клиентов — индивидуальный договор с фиксированной сметой.",
  },
  {
    q: "Можно ли подписать NDA (соглашение о конфиденциальности)?",
    a: "Да. NDA подписываем до начала переговоров по запросу. Шаблон NDA доступен для ПРЯМОГО скачивания на /certificates (PDF, без email-ожидания). Также работаем по вашему шаблону — пришлите на b2b@nilov-catering.ru. Подпись ЭДО (Диадок/СБИС) или оригинал с печатью. Все сотрудники (повара, официанты, менеджеры) подписывают NDA при приёме на работу — срок действия 3 года после увольнения. Список гостей, меню, бюджет, логистика — конфиденциальная информация, не передаётся третьим лицам.",
  },
  {
    q: "Можно ли сделать меню для ребёнка с диабетом (без сахара)?",
    a: "Да. Расчёт хлебных единиц (ХЕ) на порцию — 1 ХЕ = 10–12 г углеводов. Без добавленного сахара, мёда, фруктозы, сиропов (включая кленовый, агавы, топинамбура). Заменители — стевия или эритрит. Без скрытых сахаров в соусах (кетчуп, терияки, барбекю — либо исключаем, либо готовим сами без сахара). Фрукты только с низким ГИ (ягоды, киви, грейпфрут) — банан, виноград, дыня исключаются. БГ+без-сахара торт — отдельная выпечка. Обязательная дегустация для гостя с СД1. Подробный протокол — на странице «Аллергены».",
  },
  {
    q: "Можно ли заказать поминки?",
    a: "Да. Поминальный обед — отдельная линия меню: кутья, постные блины, кисель, борщ постный, уха, рыба запечённая, винегрет, пирожки с капустой. Без алкоголя, без торта «С днём рождения», без музыки. Доставка в кафе или домой. Срочные заказы — даже на день обращения. Подробное меню — /events/pominki.",
  },
  {
    q: "Работаете ли с иногородними клиентами (Москва и регионы)?",
    a: "Да. Мы в СПб, но работаем удалённо с клиентами из Москвы и других городов: поможем найти площадку в СПб, организуем видеодегустацию по Zoom (шеф покажет готовые блюда, расскажет состав), согласуем меню через WhatsApp/Telegram. Договор и ЭДО-документы — электронно. Личная встреча в СПб — по запросу. Связь: +7 (812) 919-59-11, info@nilov-catering.ru.",
    group: "b2c",
  },
];

export default function FAQPage() {
  const allFaqs = [...FAQS_B2C, ...FAQS_B2B];

  return (
    <main id="main" className="pt-24 pb-20">
      <Breadcrumbs />
      <div className="container-site max-w-3xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: allFaqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />

        <h1 className="font-heading mb-3 text-center text-3xl font-medium md:text-4xl">
          Частые вопросы
        </h1>
        <p className="text-muted-foreground mb-8 text-center">
          22 ответа о кейтеринге — для частных клиентов и B2B. Не нашли ответ?{" "}
          <a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">
            Позвоните {SITE.phone}
          </a>
          .
        </p>

        {/* Quick search */}
        <div className="relative mb-8" role="search">
          <svg
            className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            id="faq-search"
            placeholder="Поиск по вопросам…"
            aria-label="Поиск по вопросам"
            className="border-line bg-background focus:ring-ring focus:border-gold-text focus-visible:outline-gold w-full rounded-xl border py-3.5 pr-4 pl-12 text-base transition-shadow outline-none focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2"
          />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          document.getElementById('faq-search').addEventListener('input', function(e) {
            var q = e.target.value.toLowerCase().trim();
            var visibleCount = 0;
            document.querySelectorAll('#faq-list details').forEach(function(el) {
              var text = el.textContent.toLowerCase();
              var match = !q || text.includes(q);
              el.style.display = match ? '' : 'none';
              if (match) visibleCount++;
            });
            // Show/hide section headers based on whether they have visible items
            document.querySelectorAll('#faq-list >div').forEach(function(section) {
              var hasVisible = section.querySelectorAll('details:not([style*="none"])').length >0;
              var header = section.previousElementSibling;
              if (header && header.tagName === 'H2') {
                header.style.display = hasVisible ? '' : 'none';
                section.style.display = hasVisible ? '' : 'none';
              }
            });
            // Empty state
            var emptyMsg = document.getElementById('faq-empty');
            if (emptyMsg) {
              emptyMsg.style.display = visibleCount === 0 ? '' : 'none';
            }
          });
        `,
          }}
        />

        <div id="faq-list">
          {/* B2C FAQ */}
          <h2 className="font-heading mb-4 flex items-center gap-2 text-xl font-medium">
            <span className="text-2xl"></span> Для частных клиентов
          </h2>
          <div className="mb-12 space-y-3">
            {FAQS_B2C.map((f, i) => (
              <details key={`b2c-${i}`} className="group border-line bg-card rounded-xl border">
                <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-2 p-4 font-medium">
                  <span>{f.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground shrink-0 transition-transform group-open:rotate-45"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </summary>
                <p className="text-muted-foreground px-4 pb-4 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          {/* B2B FAQ */}
          <h2 className="font-heading mb-4 flex items-center gap-2 text-xl font-medium">
            <span className="text-2xl"></span> Для бизнеса (B2B)
          </h2>
          <div className="mb-12 space-y-3">
            {FAQS_B2B.map((f, i) => (
              <details key={`b2b-${i}`} className="group border-line bg-card rounded-xl border">
                <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-2 p-4 font-medium">
                  <span>{f.q}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground shrink-0 transition-transform group-open:rotate-45"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </summary>
                <p className="text-muted-foreground px-4 pb-4 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          {/* Empty state for search */}
          <div id="faq-empty" style={{ display: "none" }} className="py-12 text-center">
            <p className="mb-3 text-4xl">🔍</p>
            <p className="mb-2 text-lg font-medium">Ничего не найдено</p>
            <p className="text-muted-foreground mb-4 text-sm">
              Попробуйте изменить запрос или свяжитесь с нами напрямую.
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-gold-text font-semibold hover:underline"
            >
              {SITE.phone}
            </a>
          </div>

          {/* CTA */}
          <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
            <h2 className="font-heading mb-2 text-xl font-medium">Не нашли ответ?</h2>
            <p className="mb-4 text-sm opacity-90">
              Позвоните или оставьте заявку — ответим за 15 минут.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${SITE.phoneTel}`}
                className="bg-background text-foreground hover:bg-background/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
              >
                {SITE.phone}
              </a>
              <Link
                href="/contact"
                className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
              >
                Оставить заявку
              </Link>
              <Link
                href="/certificates"
                className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
              >
                Сертификаты
              </Link>
            </div>
          </div>
        </div>

        {/* Связанные страницы — логичные переходы */}
        <RelatedPages context="info" slug="faq" />
        <SmartCTA
          context="info"
          slug="faq"
          title="Не нашли ответ?"
          description="Напишите нам — поможем с любым вопросом по кейтерингу"
        />
      </div>
    </main>
  );
}
