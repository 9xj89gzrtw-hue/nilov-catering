import type { Metadata } from 'next';
import Link from 'next/link';
import TariffOffersSection from '@/components/blocks/TariffOffersSection';
import ShareButton from '@/components/common/ShareButton';

export const metadata: Metadata = {
  alternates: { canonical: '/events/svadba', languages: { 'ru': '/events/svadba', 'x-default': '/events/svadba' } },
  title: 'Свадебный кейтеринг',
  description: 'Свадебный кейтеринг NiloV в СПб: банкет, фуршет, торт, флористика. Полный цикл подготовки свадьбы под ключ.',
};

export default function SvadbaPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        {/* Hero photo — real wedding banquet */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
          <picture>
            <source srcSet="/images/real/wedding-banquet-480.avif 480w, /images/real/wedding-banquet-768.avif 768w, /images/real/wedding-banquet.avif 1920w" sizes="(max-width: 768px) 100vw, 1024px" type="image/avif" />
            <source srcSet="/images/real/wedding-banquet-480.webp 480w, /images/real/wedding-banquet-768.webp 768w, /images/real/wedding-banquet.webp 1920w" sizes="(max-width: 768px) 100vw, 1024px" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/real/wedding-banquet.jpg" alt="Свадебный банкет — кейтеринг NiloV" className="w-full h-full object-cover" />
          </picture>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)' }} aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-text mb-1">Свадьбы под ключ</p>
            <h1 className="font-heading text-2xl md:text-4xl text-white" style={{ fontWeight: 500 }}>Свадебный кейтеринг</h1>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-muted-foreground mb-2 max-w-xl mx-auto">Меню, сервировка, торт, флористика — всё для вашей свадьбы. Работаем с лучшими площадками СПб.
          </p>
          <p className="text-xs text-muted-foreground">Цены фиксированы по тарифам (₽/гость). Доплата только за индивидуальные позиции (торт с декором, доп. персонал, выезд за КАД). Финальная смета фиксируется в договоре после согласования меню.</p>
          {/* Trust bar */}
          <p className="text-sm text-muted-foreground mt-3">
            19 лет на кухне СПб · 3 000+ событий · 4.8/5 по 27 отзывам · ⏱ Перезвоним за 15 минут
          </p>
          <div className="mt-4">
            <ShareButton
              title="Свадебный кейтеринг — NiloV"
              text="Посмотри свадебные тарифы и меню — нужно согласовать"
              label="Отправить ссылку жениху/родным"
            />
          </div>
        </div>

        {/* Seasonal: White Nights */}
        <div className="mb-6 p-4 rounded-xl border border-amber-300 bg-amber-50 text-center">
          <p className="text-sm font-medium text-amber-900">Сезон белых ночей (май-июль) — бронирование за 60+ дней
          </p>
          <p className="text-xs text-amber-700 mt-1">Пиковый сезон свадеб в СПб. Забронируйте дату заранее — скидка 5% за 30 дней, 10% за 60 дней, 15% за 90 дней.
          </p>
        </div>

        {/* Multi-diet callout — для невест с разными диетами среди гостей */}
        <div className="mb-6 p-5 rounded-xl border-2 border-emerald-300 bg-emerald-50 text-center">
          <h2 className="font-heading text-base font-medium mb-2">Веган + халяль + БГ + без орехов в одной свадьбе?</h2>
          <p className="text-sm text-foreground/90 mb-3">Да! В конструкторе меню есть режим «Несколько групп гостей». Каждая группа получает
            своё под-меню с фильтром по диете. Например, свадьба на 80: 10 веганов + 8 халяль +
            4 БГ + 1 без орехов + 57 всеядных. Цена по группам — платите только за блюда своей группы.
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            <strong>Как считается цена:</strong> веган-группа — по тарифу «Веган Стандарт»
            (2 950 ₽/гость, см. <Link href="/menu/vegan" className="underline">веган-меню</Link>).
            Всеядная группа — по тарифу «Свадьба Стандарт» (5 470 ₽/гость, см. тарифы ниже).
            Итог = sum(per-group price × guests). Например: 50 веганов × 2 950 + 30 всеядных × 5 470
            = 147 500 + 164 100 = <strong className="text-gold-text">311 600 ₽</strong> за 80 гостей
            (вместо 437 600 ₽ при единой цене 5 470 ₽/гость).
          </p>
          <Link href="/plan/constructor?event=svadba" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">Собрать свадебное меню с разными диетами →
          </Link>
        </div>

        {/* Vegan wedding cake callout */}
        <div className="mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center">
          <p className="text-sm text-foreground/90">
            <span className="font-medium">Веганский свадебный торт?</span>Да — отдельная выпечка
            на миндальной/рисовой муке с кокосовыми сливками. Также: БГ-торт (&lt;20 ppm),
            без-сахара торт (для СД1, на стевии). Цены — от 1 200 ₽/кг.{' '}
            <Link href="/menu/vegan" className="underline text-gold-text">Веган-меню →</Link>
          </p>
        </div>

        {/* Remote/Moscow client note */}
        <div className="mb-6 p-4 rounded-xl border border-blue-200 bg-blue-50/50 text-center">
          <p className="text-sm text-foreground/90">
            <span className="font-medium">Невеста из Москвы или другого города?</span>Работаем
            удалённо: поможем найти площадку в СПб, организуем видеодегустацию по Zoom, согласуем
            меню через WhatsApp/Telegram. Связь — <a href="tel:+78129195911" className="underline text-gold-text">+7 (812) 919-59-11</a>{' '}
            или <a href="https://wa.me/78129195911" className="underline text-gold-text">WhatsApp</a>.
          </p>
        </div>

        {/* Direct order CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <Link href="/plan/constructor?event=svadba" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Оставить заявку на свадьбу
          </Link>
          <Link href="/tasting" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">Записаться на дегустацию
          </Link>
          <Link href="/pricing" className="rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">Все тарифы и цены
          </Link>
        </div>

        {/* Аллергии — прямой мост в конструктор */}
        <div className="mb-10 p-4 rounded-xl border border-gold-tint bg-gold-tint/30 text-center">
          <p className="text-sm font-medium mb-1">Аллергии у гостей? Рыба, орехи, глютен?</p>
          <p className="text-xs text-muted-foreground mb-3">В конструкторе меню можно исключить конкретные аллергены фильтром — 14 аллергенов ТР ТС 022/2011. Менеджер подтвердит по телефону.
          </p>
          <Link href="/plan/constructor?format=banket" className="text-xs text-gold-text font-semibold hover:underline">Собрать свадебное меню с фильтром аллергенов →
          </Link>
        </div>

        {/* Chef quote — emotional storytelling */}
        <div className="mt-12 mb-8 p-6 rounded-2xl bg-secondary/30 border-l-4 border-gold-text">
          <p className="font-heading text-lg md:text-xl italic text-foreground/90 mb-3">«Свадьба — это не банкет. Это день, когда каждая деталь говорит невесте:
            &quot;Ты важна&quot;. Мы готовим не еду — мы готовим спокойствие».
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/images/team/chef-nilov.jpg" alt="Дмитрий Нилов" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium">Дмитрий Нилов</p>
              <p className="text-xs text-muted-foreground">Шеф-повар, 19 лет опыта</p>
            </div>
          </div>
        </div>

        <TariffOffersSection
          eventId="svadba"
          eventName="Свадьба"
          description="Выберите готовый тариф или настройте меню под себя. Каждый тариф — полный состав блюд с ценами."
        />

        {/* What's included — с разбивкой по тирам */}
        <div className="mt-12 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-2">Что входит в тариф</h2>
          <p className="text-xs text-muted-foreground mb-4">Состав «полного цикла» зависит от выбранного тарифа. Ниже — что входит в каждый.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg border border-line p-3 bg-secondary/30">
              <h3 className="font-medium text-sm mb-2">Эконом (3 950 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Доставка в КАД</li>
                <li>Сервировка и базовый персонал</li>
                <li>Чай/кофе, морс</li>
                <li>Свадебный торт</li>
                <li>Винная карта и координатор — со Стандарта</li>
              </ul>
            </div>
            <div className="rounded-lg border border-line p-3 bg-secondary/30">
              <h3 className="font-medium text-sm mb-2">Стандарт (5 470 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Доставка в КАД</li>
                <li>Сервировка и персонал</li>
                <li>Барная станция (вкл. вино 2 бокала — опц. безалк. для халяль)</li>
                <li>Десертный стол</li>
                <li>Свадебный торт</li>
                <li>Координатор события</li>
              </ul>
            </div>
            <div className="rounded-lg border border-line p-3 bg-secondary/30">
              <h3 className="font-medium text-sm mb-2">Расширенный (7 350 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Всё из Стандарта</li>
                <li>Welcome drink</li>
                <li>Барная станция (вкл. винная карта безлимит — опц. безалк. для халяль)</li>
                <li>Шампанское (2 бокала)</li>
                <li>Морепродукты</li>
                <li>Свадебный торт</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gold-text p-3 bg-gold-tint/30">
              <h3 className="font-medium text-sm mb-2">Максимальный (9 950 ₽)</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>Всё из Расширенного</li>
                <li>Свадебный торт на заказ</li>
                <li>Координатор события</li>
                <li>Сомелье + 5 вин (опц. безалк. дегустация для халяль)</li>
                <li>Чёрная икра</li>
                <li>Эко-упаковка остатков</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Флористика — отдельно, бесплатно при бронировании за 60+ дней. Свадебный торт включён во все тарифы. Винная карта и координатор — включены в Стандарт и выше.</p>
          <p className="text-xs text-muted-foreground mt-2"><strong>Халяль-вариант любого тарифа:</strong> винная карта заменяется на безалкогольную (морс/лимонад/мята-вода/бар безалкогольных коктейлей). Скидка 200 ₽/гость. Укажите «халяль» в заявке.</p>
          <p className="text-xs text-muted-foreground mt-2"><strong>Анафилаксия на орехи?</strong> В меню по умолчанию нет цельных орехов. При анафилаксии — отдельная смена, EpiPen у ответственного сотрудника. См. <a href="/allergens" className="underline">аллергены</a>.</p>
        </div>

        {/* Production rider — тайминги, оборудование, штат */}
        <div className="mt-12 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-2xl font-medium mb-4">Производственный райдер</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-gold-text">Тайминги</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Заезд команды: за 4 часа до начала (банкет 100+ — за 6 часов)</li>
                <li>Готовность раздаточных столов: за 30 мин до начала</li>
                <li>Подача блюд: по согласованному таймингу (±15 минут для всех форматов)</li>
                <li>Демонтаж: после завершения + 30 мин</li>
                <li>Вывоз оборудования: 1.5 часа</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gold-text">Штат</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>1 официант на 10 гостей (банкет), на 15 (фуршет)</li>
                <li>1 шеф-повар + 2 повара на 50 гостей</li>
                <li>1 координатор-менеджер на мероприятие</li>
                <li>Сомелье — опционально (тарифы Расширенный/Максимальный)</li>
                <li>Бармен — при наличии бара (1 на 30 гостей)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gold-text">Оборудование (включено)</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Столы раздаточные, chafing-dishes, мармиты</li>
                <li>Посуда, столовые приборы, бокалы (бокалы Riedel — тариф Премиум+)</li>
                <li>Скатерти, салфетки, текстиль (цвет — по запросу)</li>
                <li>Освещение раздаточных столов (LED-споты)</li>
                <li>Музыкальное оборудование — не входит (предоставляется площадкой)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-gold-text">Логистика</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Доставка по СПб (в пределах КАД) — включена</li>
                <li>Доставка за КАД — от 3 000 ₽ (зависит от расстояния)</li>
                <li>Парковка для транспорта — предоставляется площадкой</li>
                <li>Разгрузка — 30-45 мин, нужна зона разгрузки</li>
                <li>Кухня на площадке — не требуется (полуфабрикаты высокой готовности)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Extended rider — technical requirements */}
        <div className="mt-6 p-6 rounded-xl border border-line bg-secondary/30">
          <h3 className="font-semibold mb-3 text-gold-text">Технические требования к площадке</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Электричество</p>
              <p>Не менее 6 кВт для раздаточной зоны. Розетки 220В с заземлением. При недостатке мощности — генератор за отдельную плату.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Вода и канализация</p>
              <p>Доступ к проточной воде (для мытья рук персонала). При отсутствии — бутылированная вода + биотуалет для персонала.</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Раздевалка для персонала</p>
              <p>Отдельное помещение 6+ м² для переодевания и хранения личных вещей персонала (8-15 чел).</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Мусор и отходы</p>
              <p>Контейнеры для пищевых отходов + пластик/стекло. Вывоз организует NiloV Catering (включено).</p>
            </div>
          </div>
        </div>

        {/* SPb Palace/Venue Matrix — venue partnerships */}
        <section className="mt-12 mb-8">
          <h2 className="font-heading text-2xl font-medium mb-4">Площадки Санкт-Петербурга</h2>
          <p className="text-sm text-muted-foreground mb-6">Работаем на лучших площадках СПб. Знаем логистику, ограничения, кухонные мощности каждой.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Особняк Бруноз', area: 'Петроградский', guests: 'до 120', feature: 'Исторический особняк, камерный зал' },
              { name: 'Лофт «Севкабель»', area: 'Васильевский', guests: 'до 300', feature: 'Индустриальный лофт, панорама Невы' },
              { name: 'Конгресс-холл «Экспофорум»', area: 'Пушкин', guests: 'до 800', feature: 'Конгресс-холл, 3 зала, парковка' },
              { name: 'Константиновский дворец', area: 'Стрельна', guests: 'до 200', feature: 'Дворцовый комплекс, набережная' },
              { name: 'Особняк Половцова', area: 'Адмиралтейский', guests: 'до 80', feature: 'Дворец XIX века, мраморный зал' },
              { name: 'Лахта Центр', area: 'Приморский', guests: 'до 500', feature: 'Небоскрёб, панорамные залы' },
              { name: 'Царская усадьба «Царское Село»', area: 'Пушкин', guests: 'до 150', feature: 'Исторический парк, павильоны' },
              { name: 'Ресторан «Гостиный двор»', area: 'Васильевский', guests: 'до 100', feature: 'Собственная кухня, терраса' },
              { name: 'Вилла Роза', area: 'Репино', guests: 'до 60', feature: 'Загородная вилла, Финский залив' },
            ].map(v => (
              <div key={v.name} className="p-4 rounded-xl border border-line bg-card hover:border-gold-text transition-colors">
                <h3 className="font-heading text-base font-medium mb-1">{v.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{v.area} · {v.guests}</p>
                <p className="text-xs text-foreground/80">{v.feature}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-center">Не нашли свою площадку? Работаем на любой — привезём всё необходимое.{' '}
            <Link href="/contact?subject=Площадка-не-в-списке" className="text-gold-text hover:underline">Уточнить →</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
