import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/contact' },
  title: 'Контакты, СПб',
  description: 'Свяжитесь с NiloV Catering: телефон, WhatsApp, Telegram. Санкт-Петербург, В.О., 20-я линия 11. Юр.лицо: ИП Нилов Д.И.',
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-2">Контакты</h1>
        <p className="text-muted-foreground mb-8">
          Позвоните или напишите — подберём решение за 15 минут. Работаем ежедневно с 9:00 до 21:00.
        </p>

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
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className="text-base font-semibold text-foreground">{c.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
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
                <p className="text-xs text-muted-foreground mt-1">Производство: м. Василеостровская. Доставка: КАД — бесплатно, за КАД — от 3 000 ₽.</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-line bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl" aria-hidden="true">🕐</span>
              <div>
                <p className="text-sm font-semibold">Ежедневно 9:00–21:00</p>
                <p className="text-xs text-muted-foreground mt-1">Заявки через сайт принимаем круглосуточно. События — в любой день недели.</p>
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
          <p className="text-xs text-muted-foreground mt-2">
            Проверить контрагента: <a href="https://www.rusprofile.ru/ip/314784710400401" target="_blank" rel="noopener noreferrer" className="text-gold-text hover:underline">rusprofile.ru →</a>
            {' · '}
            <Link href="/certificates" className="text-gold-text hover:underline">все сертификаты →</Link>
          </p>
        </div>

        {/* Quick form — расширенная, с B2B полями */}
        <div className="rounded-xl border border-line bg-card p-6">
          <h2 className="font-heading text-xl font-medium mb-4">Заявка на кейтеринг</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Заполните форму — менеджер перезвонит в течение 15 минут (в рабочее время).
            Для срочных заявок звоните: <a href={`tel:${SITE.phoneTel}`} className="text-gold-text hover:underline">{SITE.phone}</a>.
          </p>
          <form className="space-y-4" action="/api/contact" method="POST">
            <input type="hidden" name="source" value="contact-b2c" />
            {/* Honeypot — невидимое поле для ботов. Реальные пользователи его не видят. */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <label htmlFor="website-hp">Не заполняйте это поле</label>
              <input id="website-hp" type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {/* B2C fields */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Имя *</label>
                <input id="name" type="text" name="name" required className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">Телефон *</label>
                <input id="phone" type="tel" name="phone" required placeholder="+7 (___) ___-__-__" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-foreground mb-1">Дата события</label>
                <input id="date" type="date" name="date" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-foreground mb-1">Кол-во гостей</label>
                <input id="guests" type="number" name="guests" min="1" placeholder="напр. 50" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-foreground mb-1">Тип события</label>
                <select id="eventType" name="eventType" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow">
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
                  <option value="Доставка еды">Доставка еды</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-foreground mb-1">Формат</label>
                <select id="format" name="format" className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow">
                  <option value="">Не определились</option>
                  <option value="Фуршет">Фуршет (стоя, закуски)</option>
                  <option value="Банкет">Банкет (посадка, официанты)</option>
                  <option value="Кофе-брейк">Кофе-брейк</option>
                  <option value="Детский">Детский кейтеринг</option>
                  <option value="Шеф на дом">Шеф на дом</option>
                </select>
              </div>
            </div>

            {/* Группы гостей с диетами — для multi-diet заказа */}
            <fieldset className="rounded-lg border border-line bg-secondary/30 p-3">
              <legend className="text-sm font-medium px-2">
                🥗 Несколько групп гостей с разными диетами? (заполните при необходимости)
              </legend>
              <p className="text-xs text-muted-foreground mt-2 mb-3">
                Например: 10 веганов + 8 халяль + 4 без глютена + 1 без орехов + 57 всеядных.
                Каждая группа получит своё под-меню с фильтром по диете.
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Всеядные</span>
                    <input type="number" name="groupOmnivore" id="groupOmnivore" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Веганы</span>
                    <input type="number" name="groupVegan" id="groupVegan" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Халяль</span>
                    <input type="number" name="groupHalal" id="groupHalal" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Без глютена (целиакия)</span>
                    <input type="number" name="groupGlutenFree" id="groupGlutenFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Без орехов (анафилаксия)</span>
                    <input type="number" name="groupNutFree" id="groupNutFree" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Другая диета / аллергия</span>
                    <input type="number" name="groupOther" id="groupOther" min="0" placeholder="0" className="rounded border border-line bg-background px-3 py-2 text-sm w-full" />
                  </label>
                </div>
                <label className="flex items-center gap-2 text-sm mt-2">
                  <input type="checkbox" name="medicalDiet" />
                  Медицинская диета (целиакия / анафилаксия) — требуется документированный протокол безопасности
                </label>
              </div>
            </fieldset>

            {/* B2B toggle — open by default для корпоративных клиентов */}
            <details className="rounded-lg border border-line bg-secondary/30 p-3">
              <summary className="text-sm font-medium cursor-pointer">
                💼 Заявка от юридического лица? (B2B) — раскройте, если организация
              </summary>
              <p className="text-xs text-muted-foreground mt-2 mb-3">
                Для корпоративов, школ, учреждений, гос. заказчиков (44-ФЗ, 223-ФЗ).
                ИП Нилов Д.И. — УСН (без НДС). Для плательщиков НДС — работаем через партнёрское ООО (по запросу).
                ЭДО: Контур.Диадок, СБИС.
              </p>
              <div className="space-y-2">
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Название организации</span>
                  <input type="text" name="companyName" placeholder="ООО «Ромашка» / ГБОУ Школа №123" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">ИНН организации (10 или 12 цифр)</span>
                    <input type="text" name="companyInn" inputMode="numeric" pattern="[0-9]{10,12}" placeholder="7800000000" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">КПП (если есть)</span>
                    <input type="text" name="companyKpp" inputMode="numeric" pattern="[0-9]{9}" placeholder="780101001" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs text-muted-foreground block mb-1">Юр.адрес организации</span>
                  <input type="text" name="companyAddress" placeholder="191123, г. Санкт-Петербург, ул. ..." className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">ЭДО-система</span>
                    <select name="edo" className="w-full rounded border border-line bg-background px-3 py-2 text-sm">
                      <option value="">Не выбран</option>
                      <option value="Контур.Диадок">Контур.Диадок</option>
                      <option value="СБИС">СБИС</option>
                      <option value="Другое">Другое</option>
                      <option value="Без ЭДО">Без ЭДО</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Налоговый режим</span>
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
                    <span className="text-xs text-muted-foreground block mb-1">Период события (дней)</span>
                    <input type="number" name="daysCount" min="1" placeholder="1" className="w-full rounded border border-line bg-background px-3 py-2 text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground block mb-1">Бюджет (₽)</span>
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
                    Нужен SLA в договоре (метрики punctuality, штрафы, страхование)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" name="procurement44FZ" />
                    Закупка по 44-ФЗ / 223-ФЗ (тендер)
                  </label>
                </div>
              </div>
            </details>

            {/* Комментарий */}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">Комментарий</label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                placeholder="Пожелания по меню, аллергии, бюджет, особые требования, логистика..."
                className="w-full rounded-lg border border-line bg-background px-4 py-3 text-base focus:ring-2 focus:ring-ring focus:border-gold-text outline-none transition-shadow resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all"
            >
              Отправить заявку
            </button>
            <p className="text-xs text-muted-foreground text-center">
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
      </div>
    </main>
  );
}
