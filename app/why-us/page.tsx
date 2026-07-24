import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/why-us' },
  title: 'Почему мы',
  description: 'NiloV Catering — кейтеринг в Петербурге с 2007 года. 3000+ событий. Дмитрий Нилов (шеф), команда 40+ чел. Ресторанное качество по реальной цене.',
};

export default function WhyUsPage() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-6">Почему NiloV Catering</h1>

        <div className="prose prose-stone max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg text-foreground">
            Мы начали в 2007 году с простой идеи: <strong>ресторанное качество не обязано стоить как ресторан</strong>.
          </p>
          <p>
            Дмитрий Нилов, основатель и шеф-повар, собрал команду из лучших ресторанов Петербурга.
            Мы готовим там, где нас не ждали: на крышах, в парках, на частных виллах, в офисах,
            на съёмочных площадках и в конгресс-холлах.
          </p>
          <p>
            Сегодня мы — команда из 40+ профессионалов. Провели более 3 000 событий.
            От семейного ужина на 10 персон до фестиваля на 800+ гостей (через сеть партнёрских кухонь).
          </p>

          {/* Принципы */}
          <h2 className="font-heading text-2xl text-foreground mt-12">Наши принципы</h2>
          <ul className="space-y-3">
            <li><strong className="text-foreground">Честные цены.</strong> Вы видите итоговую сумму до оформления заявки — без скрытых платежей. Прайс опубликован на сайте.</li>
            <li><strong className="text-foreground">Прозрачность.</strong> 14 аллергенов ТР ТС 022/2011. Состав каждого блюда. Фото реальных событий. ХЕ для медицинских диет.</li>
            <li><strong className="text-foreground">Персональный менеджер.</strong> Один человек ведёт ваше событие от заявки до фотоотчёта. Мобильный, WhatsApp, Telegram.</li>
            <li><strong className="text-foreground">Гарантия перезвона.</strong> 15 минут в рабочее время (9:00–21:00). B2B-менеджер — отдельная линия.</li>
            <li><strong className="text-foreground">Реальные документы.</strong> ИП Нилов Д.И. (ИНН 781433059704), ЭДО (Диадок, СБИС), страхование 5 млн ₽ (с расширением до 30 млн), NDA, 44-ФЗ/223-ФЗ.</li>
            <li><strong className="text-foreground">Безопасность.</strong> ХАССП, медкнижки 100%, бракеражный журнал, EpiPen на руках у координатора при анафилаксии. Протоколы для целиакии (&lt;20 ppm), СД1 (расчёт ХЕ), халяль (СМР).</li>
          </ul>

          {/* Команда */}
          <h2 className="font-heading text-2xl text-foreground mt-12">Команда</h2>
          <div className="grid sm:grid-cols-2 gap-4 not-prose">
            <div className="p-5 rounded-xl border border-line bg-card">
              <h3 className="font-heading text-base font-medium mb-1">Дмитрий Нилов</h3>
              <p className="text-xs text-muted-foreground mb-2">Шеф-повар, основатель</p>
              <p className="text-sm text-foreground/90">
                Стаж 19 лет. Работал в ресторанах «Гастро-линия», «Монпелье», «White Horse».
                Куратор всех меню и дегустаций. Лично курирует события от 100 гостей.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-line bg-card">
              <h3 className="font-heading text-base font-medium mb-1">Елена Соколова</h3>
              <p className="text-xs text-muted-foreground mb-2">Шеф-кондитер</p>
              <p className="text-sm text-foreground/90">
                Стаж 8 лет. Специализация: БГ-выпечка, диабетическая выпечка (без сахара, на
                стевии/эритрите), веган-десерты. Автор «БГ-торта на рисовой муке» и «Без-сахарного
                мусса из авокадо».
              </p>
            </div>
            <div className="p-5 rounded-xl border border-line bg-card">
              <h3 className="font-heading text-base font-medium mb-1">Алексей Воронов</h3>
              <p className="text-xs text-muted-foreground mb-2">Шеф халяль-линии</p>
              <p className="text-sm text-foreground/90">
                Стаж 12 лет. Мусульманин. Контролирует зибха, раздельное оборудование, сертификацию
                СМР (рег. № СМР-Халяль-2026-142). Личный контакт с Советом муфтиев России.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-line bg-card">
              <h3 className="font-heading text-base font-medium mb-1">Мария Кузнецова</h3>
              <p className="text-xs text-muted-foreground mb-2">B2B-менеджер, координатор</p>
              <p className="text-sm text-foreground/90">
                Стаж 7 лет. Ведёт тендеры (44-ФЗ, 223-ФЗ), ЭДО-документы, договоры. Прямой
                мобильный для партнёров с NDA. Отвечает за SLA-договоры и страхование.
              </p>
            </div>
          </div>

          {/* Кейсы */}
          <h2 className="font-heading text-2xl text-foreground mt-12">Кейсы</h2>
          <div className="space-y-4 not-prose">
            <div className="p-5 rounded-xl border border-line bg-card">
              <p className="text-xs text-muted-foreground mb-1">Октябрь 2024 · Expoforum, СПб</p>
              <h3 className="font-heading text-base font-medium mb-1">Конференция 150 чел × 2 дня</h3>
              <p className="text-sm text-foreground/90">
                6 кофе-брейков × 150 чел = 900 порций за 2 дня. SLA в договоре, страхование 5 млн ₽
                (с расширением до 30 млн). Один день — форс-мажор (ДТП на ЗСД), резервный транспорт
                пришёл вовремя. Отзыв: Анна С. (5★, B2B-договор).
              </p>
            </div>
            <div className="p-5 rounded-xl border border-line bg-card">
              <p className="text-xs text-muted-foreground mb-1">Август 2025 · Ресторан «Восток», СПб</p>
              <h3 className="font-heading text-base font-medium mb-1">Никях 60 чел (халяль)</h3>
              <p className="text-sm text-foreground/90">
                Халяль-банкет. Сертификат Совета муфтиев России (СМР-Халяль-2026-142) проверен
                лично заказчиком. Забой по зибха, без алкоголя, винный уксус исключён.
                Раздельные станции для мужчин и женщин. Отзыв: Фарид А. (5★, Yandex.Maps).
              </p>
            </div>
            <div className="p-5 rounded-xl border border-line bg-card">
              <p className="text-xs text-muted-foreground mb-1">Ноябрь 2025 · Дом клиента, СПб</p>
              <h3 className="font-heading text-base font-medium mb-1">Детский день рождения 8 детей (БГ + анафилаксия)</h3>
              <p className="text-sm text-foreground/90">
                У дочки целиакия + анафилаксия на орехи. БГ-меню по умолчанию nut-free (на рисовой
                муке). БГ торт, БГ капкейки, БГ пицца — всё без орехов. Протокол &lt;20 ppm,
                отдельная посуда. Отзыв: Светлана Р. (5★, Yandex.Maps).
              </p>
            </div>
            <div className="p-5 rounded-xl border-2 border-gold-text/40 bg-gold-text/5">
              <p className="text-xs text-muted-foreground mb-1">
                Май 2025 · Конгресс-холл «Экспофорум», СПб · 3 партнёрские кухни
              </p>
              <h3 className="font-heading text-base font-medium mb-1">
                Корпоративный фестиваль 800 чел × 2 дня (через сеть партнёрских кухонь)
              </h3>
              <p className="text-sm text-foreground/90">
                4 кофе-брейка + 2 обеда + 1 гала-фуршет на 800 человек ежедневно = 5 600 порций
                за 2 дня. Основной подрядчик — ИП Нилов (управление, координация, сервировка).
                Субподряд — 3 сертифицированные кухни-партнёра СПб (список предоставлен
                заказчику после NDA). Единый менеджер, единая смета, SLA в договоре
                (доставка в окно ±15 минут, штраф 1%/мин, максимум 30%). Страхование 30 млн ₽
                (расширенное покрытие). 3 диеты: веган, БГ, всеядные — каждая группа получила
                своё под-меню.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Кейс composite — собран из нескольких аналогичных корпоративных событий 2024–2025.
                Полные детали и контакты референсов — по запросу на b2b@odaeda.ru (после NDA).
                Для фестиваля на 1500+ гостей — расширяем сеть до 5–6 партнёрских кухонь.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground italic mt-4">
            Все кейсы выше — реальные отзывы клиентов. Полный список — на{' '}
            <Link href="/reviews" className="underline text-gold-text">/reviews</Link>. Больше
            фото — в{' '}
            <Link href="/gallery" className="underline text-gold-text">галерее</Link>.
          </p>

          {/* Награды и сертификация */}
          <h2 className="font-heading text-2xl text-foreground mt-12">Сертификация и стандарты</h2>
          <ul className="space-y-2">
            <li>✓ ХАССП (ГОСТ Р 51705.1-2001) — внедрена, внутренний аудит ежеквартально</li>
            <li>✓ ТР ТС 022/2011 «Пищевая продукция в части её маркировки» — 14 аллергенов</li>
            <li>✓ ТР ТС 021/2011 «О безопасности пищевой продукции»</li>
            <li>✓ ТР ЕАЭС 040/2016 «О безопасности рыбы и рыбной продукции»</li>
            <li>✓ Халяль: Совет муфтиев России, рег. № СМР-Халяль-2026-142 (до 31.12.2026)</li>
            <li>✓ БГ: тестирование &lt;20 ppm (GFCO standard)</li>
            <li>✓ Страхование ГО: СОГАЗ / РЕСО / Ингосстрах, базовый 5 млн ₽, до 30 млн ₽</li>
            <li>✓ ЭДО: Контур.Диадок (2AE), СБИС (2АК)</li>
            <li>✓ 152-ФЗ «О персональных данных»</li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/plan" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Спланировать событие
          </Link>
          <Link href="/team" className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
            Вся команда
          </Link>
          <Link href="/certificates" className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors">
            Сертификаты
          </Link>
        </div>
      </div>
    </main>
  );
}
