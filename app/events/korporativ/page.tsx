import type { Metadata } from "next";
import Link from "next/link";
import TariffOffersSection from "@/components/blocks/TariffOffersSection";
import BudgetCalculator from "@/components/interactive/BudgetCalculator";
import B2BPortalSection from "@/components/common/B2BPortalSection";
import TenderHub from "@/components/common/TenderHub";

export function generateMetadata(): Metadata {
  return {
    title: "Корпоративы",
    description:
      "Кейтеринг для корпоративных мероприятий в СПб. Бизнес-ланчи, фуршеты, банкеты. От 10 до 800+ человек (с расширением производственных мощностей).",
    alternates: {
      canonical: "/events/korporativ",
      languages: { ru: "/events/korporativ", "x-default": "/events/korporativ" },
    },
  };
}

export default function CorporatePage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-5xl">
        {/* Hero photo — corporate buffet */}
        <div className="relative mb-8 h-56 overflow-hidden rounded-2xl md:h-72">
          <picture>
            <source
              srcSet="/images/real/corporate-buffet-480.avif 480w, /images/real/corporate-buffet-768.avif 768w, /images/real/corporate-buffet.avif 1920w"
              sizes="(max-width: 768px) 100vw, 1024px"
              type="image/avif"
            />
            <source
              srcSet="/images/real/corporate-buffet-480.webp 480w, /images/real/corporate-buffet-768.webp 768w, /images/real/corporate-buffet.webp 1920w"
              sizes="(max-width: 768px) 100vw, 1024px"
              type="image/webp"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/real/corporate-buffet.jpg"
              alt="Корпоративный фуршет — кейтеринг NiloV"
              className="h-full w-full object-cover"
            />
          </picture>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.15) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <p className="text-gold-text mb-1 text-[11px] tracking-[0.2em] uppercase">
              Корпоративный кейтеринг
            </p>
            <h1
              className="font-heading text-2xl text-white md:text-3xl"
              style={{ fontWeight: 500 }}
            >
              Корпоративы
            </h1>
          </div>
        </div>

        <p className="text-muted-foreground mb-8">
          Бизнес-ланчи, фуршеты и банкеты для компаний любого размера. От неформальной встречи на 10
          человек до годового собрания на 800+ гостей (с расширением производственных мощностей и
          субподрядных бригад).{" "}
          <Link href="/events/recap" className="text-gold-text hover:underline">
            Пример кейса 800 чел × 2 дня →
          </Link>
        </p>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <TariffOffersSection
              eventId="korporativ"
              eventName="Корпоратив"
              description="Готовые тарифы для корпоративных событий. Каждый включает полный состав блюд."
            />

            {/* B2B-блок — для юридических лиц */}
            <div className="border-gold-tint bg-card mt-12 rounded-2xl border-2 p-6">
              <h2 className="font-heading mb-3 text-xl font-medium">
                Работаем с юридическими лицами
              </h2>

              <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="border-line bg-background rounded-lg border p-3">
                  <p className="mb-1 text-sm font-semibold">Документы</p>
                  <p className="text-muted-foreground text-xs">
                    Договор, счёт, акт, счёт-фактура, ЭДО (Диадок, СБИС), чек по 54-ФЗ
                  </p>
                </div>
                <div className="border-line bg-background rounded-lg border p-3">
                  <p className="mb-1 text-sm font-semibold">НДС</p>
                  <p className="text-muted-foreground text-xs">
                    ИП Нилов Д.И. на УСН — без НДС. Для плательщиков НДС (ОСН) оформляем через
                    партнёрское ООО (по запросу).
                  </p>
                </div>
                <div className="border-line bg-background rounded-lg border p-3">
                  <p className="mb-1 text-sm font-semibold">Сроки</p>
                  <p className="text-muted-foreground text-xs">
                    Стандарт — 3+ дня. Готовим тендерную документацию за 1-2 дня. Срочные заказы
                    (менее 3 дней) — по согласованию с шеф-поваром.
                  </p>
                </div>
                <div className="border-line bg-background rounded-lg border p-3">
                  <p className="mb-1 text-sm font-semibold">Оплата</p>
                  <p className="text-muted-foreground text-xs">
                    50% предоплата, 50% постоплата в течение 5 рабочих дней. Для постоянных B2B (3+
                    событий) — отсрочка 14 рабочих дней (фиксированно).
                  </p>
                </div>
              </div>

              <div className="mb-6 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="mb-1 font-medium">SLA в договоре (B2B, события от 30 гостей):</p>
                  <ul className="text-muted-foreground space-y-1 text-xs">
                    <li>
                      Доставка: точно в согласованное окно — ±15 минут для всех форматов (штраф 1%
                      за каждую минуту опоздания, начиная с 1-й; максимум 30% от суммы заказа).
                      Единая формула SLA.
                    </li>
                    <li>Качество: жалобы ≤5% гостей</li>
                    <li>Компенсация: штраф 5-15% при нарушении</li>
                    <li>
                      Страхование ГО: 5 000 000 ₽ базовый, до 30 000 000 ₽ для контрактов свыше 5
                      млн ₽ (ведущие страховые компании РФ)
                    </li>
                    <li>План на случай ЧП: резервный шеф + транспорт в течение 4 часов</li>
                  </ul>
                </div>
                <div>
                  <p className="mb-1 font-medium">Закупки и учреждения:</p>
                  <ul className="text-muted-foreground space-y-1 text-xs">
                    <li>44-ФЗ и 223-ФЗ — тендерная документация</li>
                    <li>Школы, вузы, детсады, гос. учреждения</li>
                    <li>Школьный тариф от 1 800 ₽/гость</li>
                    <li>Скидки: от 50 гостей — 5%, от 100 — 10%, от 200 — 15%</li>
                    <li>Многодневные конференции (2+ дня) — дополнительно -20%</li>
                    <li>Реквизиты: ИНН 781433059704, ОГРНИП 314784710400401</li>
                  </ul>
                </div>
              </div>

              {/* Expoforum / large-venue logistics */}
              <div className="border-line bg-secondary/30 mt-8 rounded-xl border p-5">
                <h3 className="font-heading mb-2 text-base font-medium">
                  Логистика для Expoforum, ККТ «Космос», конгресс-холлов
                </h3>
                <ul className="text-muted-foreground list-inside list-disc space-y-1.5 text-sm">
                  <li>
                    Координация с администрацией площадки: согласование времени загрузки/разгрузки,
                    павильон №, ворота.
                  </li>
                  <li>Пропуска для транспорта и персонала — оформляем заранее.</li>
                  <li>
                    Холодовая цепь: сумки-холодильники +2…+6 °C на весь путь. Для дальних площадок
                    (Expoforum в Шушарах) — 2 рейса с запасом времени 90 минут.
                  </li>
                  <li>Мармиты с подогревом для горячих блюд (часы +75 °C).</li>
                  <li>
                    Зоны для официантов и точки сервировки — согласуем заранее (1 официант на 15
                    гостей для фуршета, 1 на 10 для банкета).
                  </li>
                  <li>Координатор на площадке с 60 минут до начала до конца события.</li>
                </ul>
              </div>

              <div className="border-line mt-4 flex flex-wrap gap-3 border-t pt-4">
                <Link
                  href="/contact"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
                >
                  Оставить B2B-заявку
                </Link>
                <a
                  href="tel:+78129195911"
                  className="border-gold-text text-gold-text hover:bg-gold-tint inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
                >
                  +7 (812) 919-59-11
                </a>
                <Link
                  href="/certificates"
                  className="border-line bg-background hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
                >
                  Сертификаты и страхование
                </Link>
                <Link
                  href="/events/vypusknoy"
                  className="border-line bg-background hover:border-gold-text inline-flex min-h-[44px] items-center rounded-lg border px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
                >
                  Школьный B2B
                </Link>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <BudgetCalculator
              variant="sidebar"
              defaultGuests={80}
              defaultTariff="furshet-standard"
            />
          </aside>
        </div>
      </div>

      <B2BPortalSection />
      <TenderHub />
    </main>
  );
}
