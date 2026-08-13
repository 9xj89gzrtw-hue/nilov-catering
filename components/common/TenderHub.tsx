import Link from "next/link";
import Image from "next/image";

export default function TenderHub() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="container-site max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-gold-text mb-2 text-sm font-semibold tracking-wider uppercase">
            Тендеры и госзаказ
          </p>
          <h2 className="font-heading mb-3 text-3xl font-medium md:text-4xl">
            Участвуем в тендерах 44-ФЗ и 223-ФЗ
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Полный пакет документов для участия в тендерах. Готовы к работе по 44-ФЗ, 223-ФЗ,
            коммерческим закупкам. ЭДО, НДС, страхование — всё в комплекте.
          </p>
        </div>

        {/* Narrative bridge — B2C → B2B emotional connection */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="font-heading text-foreground/80 mb-3 text-lg leading-relaxed italic md:text-xl">
            «Те же руки, которые создают свадебную магию, обеспечивают безупречную логистику 800
            гостям. Халяль-стандарты — наш фундамент для любого масштаба».
          </p>
          <div className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/team/chef-nilov.jpg"
                alt="Дмитрий Нилов"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <span>Дмитрий Нилов, шеф-повар</span>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Document package */}
          <div className="border-line bg-card rounded-2xl border p-6">
            <h3 className="font-heading mb-3 text-lg font-medium">Пакет документов для тендера</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Готовый пакет для загрузки на ЭТП (электронные торговые площадки):
            </p>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600"></span>
                <span>Выписка ЕГРИП (актуальная)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600"></span>
                <span>ИНН 781433059704, ОГРНИП 314784710400401</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600"></span>
                <span>Страхование ГО 5-30М₽ (полис)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600"></span>
                <span>Сертификат Халяль СМР (скан по запросу) (при необходимости)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600"></span>
                <span>Декларации соответствия (ТР ТС 021/2011, 022/2011)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-emerald-600"></span>
                <span>Сертификаты безопасности пищевой продукции</span>
              </li>
            </ul>
            <div className="flex gap-2">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/api/templates/dogovor"
                className="bg-gold-text hover:bg-gold-text/90 rounded-lg px-4 py-2 text-xs font-semibold text-white no-underline"
              >
                Скачать договор (PDF)
              </a>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="/api/templates/sla"
                className="border-line bg-background hover:border-gold-text rounded-lg border px-4 py-2 text-xs font-semibold no-underline"
              >
                Скачать SLA (PDF)
              </a>
            </div>
          </div>

          {/* Case studies — premium display typography */}
          <div className="border-line bg-card rounded-2xl border p-6">
            <h3 className="font-heading mb-3 text-lg font-medium">Опыт работы с тендерами</h3>
            <div className="space-y-4">
              <div className="bg-secondary/30 border-gold-text rounded-lg border-l-4 p-4">
                <p className="font-heading mb-1 text-base font-medium">Конференция «Экспофорум»</p>
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-heading text-gold-text text-2xl font-bold">
                    2 400 000 ₽
                  </span>
                  <span className="text-muted-foreground text-sm">800 гостей × 2 дня</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  12 шоу-станций · SLA ±15 мин · 40 официантов · 4 бармена · 2 сомелье
                </p>
              </div>
              <div className="bg-secondary/30 border-gold-text rounded-lg border-l-4 p-4">
                <p className="font-heading mb-1 text-base font-medium">Корпоратив IT-компании</p>
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-heading text-gold-text text-2xl font-bold">
                    1 094 000 ₽
                  </span>
                  <span className="text-muted-foreground text-sm">200 гостей</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Лофт «Севкабель» · Банкет + барная станция · ЭДО Диадок
                </p>
              </div>
              <div className="bg-secondary/30 border-gold-text rounded-lg border-l-4 p-4">
                <p className="font-heading mb-1 text-base font-medium">
                  Регулярные кофе-брейки офиса
                </p>
                <div className="mb-2 flex items-baseline gap-4">
                  <span className="font-heading text-gold-text text-2xl font-bold">
                    720 000 ₽/год
                  </span>
                  <span className="text-muted-foreground text-sm">50 чел × 4/мес</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Долгосрочный контракт · Фикс-цена 60 000 ₽/мес · Ротация меню 8 недель
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 44-ФЗ / 223-ФЗ badges — premium styling */}
        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100 px-5 py-2.5 text-sm font-semibold text-blue-900 shadow-sm">
            44-ФЗ · Госзакупки
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-sm">
            223-ФЗ · Госкорпорации
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-gradient-to-r from-amber-50 to-amber-100 px-5 py-2.5 text-sm font-semibold text-amber-900 shadow-sm">
            Коммерческие закупки
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100 px-5 py-2.5 text-sm font-semibold text-purple-900 shadow-sm">
            Халяль-сертификат СМР
          </span>
        </div>

        <div className="text-center">
          <Link
            href="/contact?subject=Тендер-44ФЗ"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors"
          >
            Запросить пакет документов для тендера →
          </Link>
        </div>
      </div>
    </section>
  );
}
