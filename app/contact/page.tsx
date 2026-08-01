import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import PageHeader from '@/components/common/PageHeader';

export const metadata: Metadata = {
  alternates: { canonical: '/contact', languages: { 'ru': '/contact', 'en': '/en', 'x-default': '/contact' } },
  title: 'Контакты, СПб',
  description: 'Свяжитесь с NiloV Catering: телефон, WhatsApp, Telegram. Санкт-Петербург, В.О., 20-я линия 11. Юр.лицо: ИП Нилов Д.И.',
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = (await searchParams) || {};
  const preEventType = Array.isArray(sp.eventType) ? sp.eventType[0] : sp.eventType || '';
  const preFormat = Array.isArray(sp.format) ? sp.format[0] : sp.format || '';
  const preGuests = Array.isArray(sp.guests) ? sp.guests[0] : sp.guests || '';
  const preAddress = Array.isArray(sp.address) ? sp.address[0] : sp.address || '';
  const preSubject = Array.isArray(sp.subject) ? sp.subject[0] : sp.subject || '';
  const preLocation = Array.isArray(sp.location) ? sp.location[0] : sp.location || '';
  const preSource = Array.isArray(sp.source) ? sp.source[0] : sp.source || '';
  // If helper wizard passed occasion as `subject`, use it as fallback for eventType select
  const eventTypeDefault = preEventType || preSubject;
  return (
    <main className="pt-24 pb-20" id="main">
      <div className="container-site max-w-3xl">
        <Breadcrumbs />

        <PageHeader
          title="Контакты"
          eyebrow="Свяжитесь с нами"
          subtitle={
            <>
              Позвоните или напишите — подберём решение за 15 минут. Работаем ежедневно с 9:00 до 21:00.
              <br />
              📍 Работаем в Санкт-Петербурге и ЛО. Для иногородних клиентов (Москва и регионы):
              работаем удалённо через WhatsApp/Telegram, поможем найти площадку в СПб, организуем
              видеодегустацию по Zoom.
            </>
          }
        />

        {/* Contact cards — large readable */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Телефон', value: SITE.phone, href: `tel:${SITE.phoneTel}`, icon: '📞', sub: 'Перезвоним ≤15 мин' },
            { label: 'WhatsApp', value: 'Написать в WhatsApp', href: SITE.whatsapp, icon: '💬', sub: 'Ответ за 5 мин' },
            { label: 'Telegram', value: '@nilovcatering', href: 'https://t.me/nilovcatering', icon: '✈️', sub: 'Канал + чат' },
            { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: '✉️', sub: 'Для документов и B2B' },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors no-underline"
            >
              <span className="text-3xl block mb-1" aria-hidden="true">{c.icon}</span>
              <p className="text-sm text-muted-foreground">{c.label}</p>
              <p className="text-base font-semibold text-foreground">{c.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{c.sub}</p>
            </a>
          ))}
        </div>

        {/* Address + Hours — large readable */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="rounded-xl border border-line bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">📍</span>
              <div>
                <p className="text-sm font-semibold">{SITE.legalAddress}</p>
                <p className="text-sm text-muted-foreground mt-1">Производство: м. Василеостровская. Доставка: КАД — бесплатно, за КАД — от 3 000 ₽.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">🕐</span>
              <div>
                <p className="text-sm font-semibold">Ежедневно 9:00–21:00</p>
                <p className="text-sm text-muted-foreground mt-1">Заявки через сайт принимаем круглосуточно. События — в любой день недели.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal block */}
        <div className="rounded-xl border-2 border-gold-tint bg-gold-tint/5 p-4 mb-10">
          <h2 className="font-heading text-base font-medium mb-2">📋 Юридическое лицо</h2>
          <dl className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <dt className="text-muted-foreground">Юр.лицо:</dt>
            <dd className="font-medium">{SITE.legalName}</dd>
            <dt className="text-muted-foreground">Бренд:</dt>
            <dd>{SITE.name} (с 2007 года)</dd>
            <dt className="text-muted-foreground">ИНН:</dt>
            <dd className="font-mono">{SITE.inn}</dd>
            <dt className="text-muted-foreground">ОГРНИП:</dt>
            <dd className="font-mono">{SITE.ogrnip}</dd>
          </dl>
          <p className="text-sm text-muted-foreground mt-2">
            Проверить контрагента: <a href="https://www.rusprofile.ru/ip/314784710400401" target="_blank" rel="noopener noreferrer" className="text-gold-text hover:underline">rusprofile.ru →</a>
            {' · '}
            <Link href="/certificates" className="text-gold-text hover:underline">все сертификаты →</Link>
          </p>
        </div>

        {/* Quick form — упрощённая: 3 обязательных поля + collapsible «Дополнительно».
            C5 fix (User Flow, 6.25): было 10+ обязательных/видимых полей → стало 3.
            Остальные поля перенесены в collapsible-секции «Дополнительно» и B2B.
            Так пользователь не пугается стеной инпутов и быстрее отправляет заявку. */}
        <div className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-heading text-xl font-medium mb-4">Заявка на кейтеринг</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Заполните форму — менеджер перезвонит в течение 15 минут (в рабочее время).
            Для срочных заявок звоните: <a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">{SITE.phone}</a>.
          </p>
          {/* Form optimization — show it's quick */}
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-emerald-600">⚡</span>
            <span>Заполните 3 обязательных поля — остальное по желанию. Ответ за 15 минут.</span>
          </div>
          <form className="space-y-4" action="/api/contact" method="POST">
            <input type="hidden" name="source" value="contact-b2c" />
            {/* Honeypot — невидимое поле для ботов. Реальные пользователи его не видят. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="website-hp">Не заполняйте это поле</label>
              <input id="website-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {/* === Обязательные поля — 3 штуки, видны сразу === */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Имя *</label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Ваше имя"
                className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Телефон *</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                data-phone-mask="true"
                className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow touch-target"
              />
              <p className="text-xs text-muted-foreground mt-1">Перезвоним в течение 15 минут в рабочее время.</p>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">Что нужно сделать? *</label>
              <textarea
                id="comment"
                name="comment"
                required
                rows={3}
                placeholder="Например: фуршет на 30 человек 12 сентября, нужно веганское меню и без глютена. Бюджет — до 60 000 ₽."
                defaultValue={preSource === 'helper' ? `Заявка из помощника: ${preSubject}, ${preGuests} гостей, ${preLocation}`.trim() : ''}
                className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">Кратко опишите задачу — остальное уточним по телефону.</p>
            </div>

            {/* === Дополнительно — collapsible, все поля необязательные === */}
            <details className="mt-4 rounded-lg border border-line bg-secondary/30 p-3">
              <summary className="text-sm font-medium text-muted-foreground cursor-pointer touch-target">
                Дополнительно (необязательно)
              </summary>
              <div className="mt-3 space-y-3">

            {/* Email — был обязателен в старой версии, теперь необязательно */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email <span className="text-muted-foreground text-xs">(если не хотите звонок — укажите email)</span></label>
              <input id="email" type="email" name="email" autoComplete="email" placeholder="example@mail.ru" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow" />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Дата события</label>
                <input id="date" type="date" name="date" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">Кол-во гостей</label>
                <input id="guests" type="number" name="guests" min="1" placeholder="напр. 50" defaultValue={preGuests} data-prefill="guests" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow" />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">Адрес доставки (или «не определилась»)</label>
              <input id="address" type="text" name="address" defaultValue={preAddress} data-prefill="address" autoComplete="street-address" placeholder="напр. СПб, Купчино, ул. Бухарестская, д. X" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow" />
              <p className="text-sm text-muted-foreground mt-1">Нужен для расчёта зоны доставки. В пределах КАД — бесплатно.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="customerType" className="block text-sm font-medium text-foreground mb-1">Вы заказываете как</label>
              <select id="customerType" name="customerType" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow">
                <option value="individual">Физлицо (частный заказ)</option>
                <option value="company">Юрлицо (B2B, ЭДО)</option>
                <option value="school">Школа / учреждение (Роспотребнадзор, 44-ФЗ)</option>
                <option value="government">Госзаказчик (44-ФЗ / 223-ФЗ)</option>
                <option value="agency">Event-агентство (субподряд)</option>
              </select>
            </div>
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-1">Тип события</label>
                <select id="eventType" name="eventType" defaultValue={eventTypeDefault} data-prefill="eventType" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow">
                  <option value="">Выберите...</option>
                  <option value="Свадьба">Свадьба</option>
                  <option value="Корпоратив">Корпоратив</option>
                  <option value="День рождения">День рождения</option>
                  <option value="Юбилей">Юбилей / годовщина</option>
                  <option value="Выпускной">Выпускной</option>
                  <option value="Детский праздник">Детский праздник</option>
                  <option value="Конференция">Конференция / семинар</option>
                  <option value="Кофе-брейк">Кофе-брейк</option>
                  <option value="Шеф на дом">Шеф на дом</option>
                  <option value="Поминки">Поминки (поминальный обед)</option>
                  <option value="Ифтар / Рамадан">Ифтар / Рамадан (халяль)</option>
                  <option value="Никах (халяль)">Никах (исламская свадьба, халяль)</option>
                  <option value="Доставка еды">Доставка еды</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-foreground mb-1">Формат</label>
                <select id="format" name="format" defaultValue={preFormat} data-prefill="format" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none focus-visible:outline-2 focus-visible:outline-[#B8860B] focus-visible:outline-offset-2 transition-shadow">
                  <option value="">Не определились</option>
                  <option value="Фуршет">Фуршет (стоя, закуски)</option>
                  <option value="Банкет">Банкет (посадка, официанты)</option>
                  <option value="Кофе-брейк">Кофе-брейк</option>
                  <option value="Детский">Детский кейтеринг</option>
                  <option value="Поминальный обед">Поминальный обед (постное меню, без алкоголя)</option>
                  <option value="Шеф на дом">Шеф на дом</option>
                </select>
              </div>
            </div>

              </div>
            </details>

            {/* Группы гостей с диетами — collapsible по умолчанию для простых B2C заявок */}
            <details className="rounded-lg border border-line bg-secondary/30 p-3">
              <summary className="text-sm font-medium cursor-pointer touch-target">
                🥗 Несколько групп гостей с разными диетами? (раскройте при необходимости)
              </summary>
              <p className="text-sm text-muted-foreground mt-2 mb-3">
                Например: 10 веганов + 8 халяль + 4 без глютена + 1 без орехов + 57 всеядных.
                Каждая группа получит своё под-меню с фильтром по диете.
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Всеядные</span>
                    <input type="number" name="groupOmnivore" id="groupOmnivore" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Веганы</span>
                    <input type="number" name="groupVegan" id="groupVegan" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Халяль</span>
                    <input type="number" name="groupHalal" id="groupHalal" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Без глютена (целиакия)</span>
                    <input type="number" name="groupGlutenFree" id="groupGlutenFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Без орехов (анафилаксия)</span>
                    <input type="number" name="groupNutFree" id="groupNutFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Без сахара (СД1/СД2)</span>
                    <input type="number" name="groupSugarFree" id="groupSugarFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Без молока (анафилаксия)</span>
                    <input type="number" name="groupDairyFree" id="groupDairyFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Без яиц (анафилаксия)</span>
                    <input type="number" name="groupEggFree" id="groupEggFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Другая диета / аллергия</span>
                    <input type="number" name="groupOther" id="groupOther" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                </div>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input type="checkbox" name="medicalDiet" />
                  Медицинская диета (целиакия / анафилаксия / сахарный диабет СД1/СД2 / анафилаксия на молоко/яйца) — требуется документированный протокол безопасности и обязательная дегустация
                </label>
              </div>
            </details>

            {/* Multi-session / recurring orders */}
            <details className="rounded-lg border border-line bg-secondary/30 p-3">
              <summary className="text-sm font-medium cursor-pointer touch-target">
                📅 Многодневное мероприятие или регулярные заказы? (раскройте при необходимости)
              </summary>
              <p className="text-sm text-muted-foreground mt-2 mb-3">
                Для конференций (2+ дня), еженедельных офисных обедов, серий мероприятий —
                укажите расписание сессий. Менеджер составит комплексную смету со скидкой до 20%.
              </p>
              <div className="space-y-2">
                <label className="block">
                  <span className="text-sm text-muted-foreground block mb-1">Тип заказа</span>
                  <select name="orderType" className="w-full rounded border border-line bg-background px-3 py-2 text-sm">
                    <option value="single">Разовое событие</option>
                    <option value="multi-day">Многодневная конференция (2+ дня)</option>
                    <option value="recurring-weekly">Еженедельные обеды/кофе-брейки</option>
                    <option value="recurring-monthly">Ежемесячные мероприятия</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground block mb-1">Количество сессий/дней</span>
                  <input type="number" name="sessionCount" min="1" placeholder="напр. 6 кофе-брейков × 2 дня" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                </label>
                <label className="block">
                  <span className="text-sm text-muted-foreground block mb-1">Расписание (опционально)</span>
                  <textarea name="schedule" rows={2} placeholder="напр. День 1: 10:00 кофе-брейк, 13:00 обед, 15:00 кофе-брейк. День 2: ..." className="w-full rounded border border-line bg-background px-3 py-2 text-sm resize-none" />
                </label>
              </div>
            </details>

            {/* B2B toggle — open by default для корпоративных клиентов */}
            <details id="b2b-details" className="rounded-lg border border-line bg-secondary/30 p-3">
              <summary className="text-sm font-medium cursor-pointer touch-target">
                💼 Заявка от юридического лица? (B2B) — раскройте, если организация
              </summary>
              <p className="text-sm text-muted-foreground mt-2 mb-3">
                Для корпоративов, школ, учреждений, гос. заказчиков (44-ФЗ, 223-ФЗ).
                ИП Нилов Д.И. — УСН (без НДС). Работаем с НДС и без НДС. Полный комплект документов через ЭДО (Диадок, СБИС).
                ЭДО: Контур.Диадок, СБИС.
              </p>
              <div className="space-y-2">
                <label className="block">
                  <span className="text-sm text-muted-foreground block mb-1">Название организации</span>
                  <input type="text" name="companyName" placeholder="ООО «Ромашка» / ГБОУ Школа №123" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">ИНН организации (10 или 12 цифр)</span>
                    <input type="text" name="companyInn" inputMode="numeric" pattern="[0-9]{10,12}" placeholder="7800000000" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">КПП (если есть)</span>
                    <input type="text" name="companyKpp" inputMode="numeric" pattern="[0-9]{9}" placeholder="780101001" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-sm text-muted-foreground block mb-1">Юр.адрес организации</span>
                  <input type="text" name="companyAddress" placeholder="191123, г. Санкт-Петербург, ул. ..." className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">ЭДО-система</span>
                    <select name="edo" className="w-full rounded border border-line bg-background px-3 py-2 text-sm">
                      <option value="">Не выбран</option>
                      <option value="Контур.Диадок">Контур.Диадок</option>
                      <option value="СБИС">СБИС</option>
                      <option value="Другое">Другое</option>
                      <option value="Без ЭДО">Без ЭДО</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Налоговый режим</span>
                    <select name="vat" className="w-full rounded border border-line bg-background px-3 py-2 text-sm">
                      <option value="">Не выбран</option>
                      <option value="С НДС (ОСН)">Работаем с НДС (ОСН)</option>
                      <option value="Без НДС (УСН)">Без НДС (УСН)</option>
                      <option value="Уточнить">Уточнить при звонке</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Период события (дней)</span>
                    <input type="number" name="daysCount" min="1" placeholder="1" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-muted-foreground block mb-1">Бюджет (₽)</span>
                    <input type="number" name="totalBudget" min="0" placeholder="500000" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                </div>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="needDocsForRospot" />
                    Нужен пакет документов для Роспотребнадзора (медкнижки, бракераж, ППК)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="needContract" />
                    Нужен договор юр.лицо-юр.лицо с фиксированной сметой
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="needSLA" />
                    Нужен SLA в договоре (метрики доставки, штрафы, страхование)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="procurement44FZ" />
                    Закупка по 44-ФЗ / 223-ФЗ (тендер)
                  </label>
                </div>
              </div>
            </details>

            <button
              type="submit"
              className="w-full rounded-lg bg-gold-text text-white py-3.5 text-base font-semibold hover:bg-gold-text/90 active:scale-[0.98] transition-all touch-target"
            >
              Отправить заявку →
            </button>
            <p className="text-sm text-muted-foreground text-center">
              Менеджер перезвонит ≤15 минут в рабочее время. Нажимая кнопку, вы соглашаетесь с{' '}
              <Link href="/privacy" className="underline hover:text-foreground">политикой конфиденциальности (152-ФЗ)</Link>.
            </p>
          </form>
        </div>

        {/* B2B-менеджер */}
        <div className="mt-6 p-5 rounded-xl border border-line bg-secondary/30">
          <h2 className="font-heading text-base font-medium mb-2">💼 B2B-менеджер</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Для корпоративных клиентов, школ, учреждений, гос. заказчиков — отдельный менеджер.
            Поможет с договором, ЭДО, НДС, отсрочкой, спец. ценами от 100 гостей.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href={`mailto:${SITE.email}?subject=B2B-запрос`} className="text-gold-text hover:underline">✉️ {SITE.email}</a>
            <span className="text-muted-foreground">·</span>
            <a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">📞 {SITE.phone}</a>
            <span className="text-muted-foreground">·</span>
            <Link href="/events/korporativ" className="text-gold-text hover:underline">B2B-блок →</Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/events/vypusknoy" className="text-gold-text hover:underline">Школьный B2B →</Link>
          </div>
        </div>

        {/* Yandex Maps embed — geo-anchor for local SEO + trust */}
        <div className="rounded-2xl overflow-hidden border border-line shadow-md mb-6">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=30.276615%2C59.931038&z=16&pt=30.276615,59.931038,pm2rdm"
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen={true}
            title="Карта — NiloV Catering, СПб, В.О., 20-я линия, 11"
            style={{ border: 0 }}
          />
          <div className="p-4 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-heading text-base font-medium">NiloV Catering</p>
              <p className="text-sm text-muted-foreground">199106, СПб, В.О., 20-я линия, дом 11, помещение 5-Н</p>
            </div>
            <a
              href="https://yandex.ru/maps/?rtext=~59.931038,30.276615&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gold-text text-white px-4 py-2 text-sm font-semibold hover:bg-gold-text/90 no-underline whitespace-nowrap"
            >
              Построить маршрут →
            </a>
          </div>
        </div>

        {/* Yandex.Maps reviews — local SEO + social proof */}
        <div className="mt-6 p-5 rounded-xl border border-line bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading text-lg font-medium">Отзывы на Яндекс.Картах</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm font-semibold">4.8</span>
                <span className="text-sm text-muted-foreground">· 27 отзывов</span>
              </div>
            </div>
            <a
              href="https://yandex.ru/maps/org/nilev_catering/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-background px-3 py-2 text-xs font-semibold hover:border-gold-text no-underline"
            >
              Все отзывы →
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { author: 'Екатерина М.', date: 'Май 2025', text: 'Заказывали фуршет на 40 человек. Всё вовремя, красиво, вкусно. Отдельно — аллергены у гостей учли идеально.' },
              { author: 'Дмитрий К.', date: 'Апрель 2025', text: 'Корпоратив 200 человек. Шеф Дмитрий лично контролировал. Цена честная, без сюрпризов.' },
            ].map((r, i) => (
              <div key={i} className="p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{r.author}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <div className="text-amber-400 text-xs mb-1">★★★★★</div>
                <p className="text-xs text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-fill form fields from URL search params (client-side, for static export compatibility) */}
      <noscript>
        <div className="container-site max-w-3xl py-4">
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-lg">
            ⚠ JavaScript отключён. Форма работает, но поля не подставятся автоматически из ссылки.
            Заполните, пожалуйста, вручную. Или позвоните:{' '}
            <a href="tel:+78129195911" className="underline font-semibold">+7 (812) 919-59-11</a>.
          </p>
        </div>
      </noscript>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
            try {
              var sp = new URLSearchParams(window.location.search);
              var fields = ['eventType', 'format', 'guests', 'address', 'customerType', 'companyName', 'companyInn', 'companyKpp', 'companyAddress', 'edo', 'comment'];
              fields.forEach(function(name) {
                var val = sp.get(name);
                if (!val) return;
                var el = document.querySelector('[data-prefill="' + name + '"]');
                if (!el) return;
                if (el.tagName === 'SELECT') {
                  // For select, set value if option exists
                  for (var i = 0; i < el.options.length; i++) {
                    if (el.options[i].value === val) {
                      el.value = val;
                      break;
                    }
                  }
                } else {
                  el.value = val;
                }
              });
            } catch (e) { /* silent */ }
          })();

          // Auto-expand B2B section when customerType = company/school/government
          var ct = document.getElementById('customerType');
          var b2b = document.getElementById('b2b-details');
          if (ct && b2b) {
            function checkB2B() {
              var v = ct.value;
              if (v === 'company' || v === 'school' || v === 'government' || v === 'agency') {
                b2b.setAttribute('open', '');
              }
            }
            ct.addEventListener('change', checkB2B);
            checkB2B();
          }

          // === Phone auto-format mask (C5 fix) ===
          // Formats input as +7 (XXX) XXX-XX-XX while typing.
          // Strips non-digits, keeps at most 10 significant digits (after the leading 7).
          (function() {
            var phoneInput = document.querySelector('[data-phone-mask="true"]');
            if (!phoneInput) return;

            function formatPhone(raw) {
              // Strip everything except digits
              var digits = (raw || '').replace(/\\D/g, '');
              // Normalize leading 8 → 7 (Russian mobile convention)
              if (digits.length > 0 && digits[0] === '8') {
                digits = '7' + digits.slice(1);
              }
              // Drop leading 7 for the formatting buffer (we'll re-add it)
              var hasSeven = digits[0] === '7';
              var body = hasSeven ? digits.slice(1) : digits;
              // Keep at most 10 digits in body
              body = body.slice(0, 10);
              // Build formatted string
              var out = '+7';
              if (body.length > 0) {
                out += ' (' + body.slice(0, 3);
                if (body.length >= 3) out += ')';
                if (body.length > 3) {
                  out += ' ' + body.slice(3, 6);
                }
                if (body.length > 6) {
                  out += '-' + body.slice(6, 8);
                }
                if (body.length > 8) {
                  out += '-' + body.slice(8, 10);
                }
              }
              return out;
            }

            // Skip mask if user pasted an international number that doesn't start with 7/8
            function handleInput(e) {
              var raw = phoneInput.value;
              // Allow user to clear the field
              if (raw.trim() === '' || raw.trim() === '+') {
                phoneInput.value = '';
                return;
              }
              var formatted = formatPhone(raw);
              // Restore caret position to end (simplest behavior for short fields)
              phoneInput.value = formatted;
            }

            // Initial format in case of prefill
            if (phoneInput.value) handleInput();
            phoneInput.addEventListener('input', handleInput);
            phoneInput.addEventListener('paste', function(e) {
              // Defer to let paste content land in the field first
              setTimeout(function() { handleInput(e); }, 0);
            });
          })();`,
        }}
      />
    </main>
  );
}
