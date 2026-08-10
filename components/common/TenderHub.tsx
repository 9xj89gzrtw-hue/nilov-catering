import Link from 'next/link';
import Image from 'next/image';

export default function TenderHub() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container-site max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-gold-text text-sm font-semibold uppercase tracking-wider mb-2">Тендеры и госзаказ</p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium mb-3">Участвуем в тендерах 44-ФЗ и 223-ФЗ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Полный пакет документов для участия в тендерах. Готовы к работе по 44-ФЗ, 223-ФЗ,
            коммерческим закупкам. ЭДО, НДС, страхование — всё в комплекте.
          </p>
        </div>

        {/* Narrative bridge — B2C → B2B emotional connection */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <p className="font-heading text-lg md:text-xl text-foreground/80 italic mb-3 leading-relaxed">
            «Те же руки, которые создают свадебную магию, обеспечивают безупречную логистику
            800 гостям. Халяль-стандарты — наш фундамент для любого масштаба».
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0">
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

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Document package */}
          <div className="p-6 rounded-2xl border border-line bg-card">
            <h3 className="font-heading text-lg font-medium mb-3"> Пакет документов для тендера</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Готовый пакет для загрузки на ЭТП (электронные торговые площадки):
            </p>
            <ul className="text-sm space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5"></span>
                <span>Выписка ЕГРИП (актуальная)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5"></span>
                <span>ИНН 781433059704, ОГРНИП 314784710400401</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5"></span>
                <span>Страхование ГО 5-30М₽ (полис)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5"></span>
                <span>Сертификат Халяль СМР (скан по запросу) (при необходимости)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5"></span>
                <span>Декларации соответствия (ТР ТС 021/2011, 022/2011)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5"></span>
                <span>Сертификаты безопасности пищевой продукции</span>
              </li>
            </ul>
            <div className="flex gap-2">
              <a href="/api/templates/dogovor" className="rounded-lg bg-gold-text text-white px-4 py-2 text-xs font-semibold hover:bg-gold-text/90 no-underline">
                Скачать договор (PDF)
              </a>
              <a href="/api/templates/sla" className="rounded-lg border border-line bg-background px-4 py-2 text-xs font-semibold hover:border-gold-text no-underline">
                Скачать SLA (PDF)
              </a>
            </div>
          </div>

          {/* Case studies — premium display typography */}
          <div className="p-6 rounded-2xl border border-line bg-card">
            <h3 className="font-heading text-lg font-medium mb-3"> Опыт работы с тендерами</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-gold-text">
                <p className="font-heading text-base font-medium mb-1">Конференция «Экспофорум»</p>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading text-2xl font-bold text-gold-text">2 400 000 ₽</span>
                  <span className="text-sm text-muted-foreground">800 гостей × 2 дня</span>
                </div>
                <p className="text-xs text-muted-foreground">12 шоу-станций · SLA ±15 мин · 40 официантов · 4 бармена · 2 сомелье</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-gold-text">
                <p className="font-heading text-base font-medium mb-1">Корпоратив IT-компании</p>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading text-2xl font-bold text-gold-text">1 094 000 ₽</span>
                  <span className="text-sm text-muted-foreground">200 гостей</span>
                </div>
                <p className="text-xs text-muted-foreground">Лофт «Севкабель» · Банкет + барная станция · ЭДО Диадок</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/30 border-l-4 border-gold-text">
                <p className="font-heading text-base font-medium mb-1">Регулярные кофе-брейки офиса</p>
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-heading text-2xl font-bold text-gold-text">720 000 ₽/год</span>
                  <span className="text-sm text-muted-foreground">50 чел × 4/мес</span>
                </div>
                <p className="text-xs text-muted-foreground">Годовой контракт · Фикс-цена 60 000 ₽/мес · Ротация меню 8 недель</p>
              </div>
            </div>
          </div>
        </div>

        {/* 44-ФЗ / 223-ФЗ badges — premium styling */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 text-blue-900 text-sm font-semibold shadow-sm">
             44-ФЗ · Госзакупки
          </span>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-300 text-emerald-900 text-sm font-semibold shadow-sm">
             223-ФЗ · Госкорпорации
          </span>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 text-amber-900 text-sm font-semibold shadow-sm">
             Коммерческие закупки
          </span>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-300 text-purple-900 text-sm font-semibold shadow-sm">
             Халяль-сертификат СМР
          </span>
        </div>

        <div className="text-center">
          <Link href="/contact?subject=Тендер-44ФЗ" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
            Запросить пакет документов для тендера →
          </Link>
        </div>
      </div>
    </section>
  );
}
