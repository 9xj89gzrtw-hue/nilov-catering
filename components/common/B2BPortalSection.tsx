import Link from 'next/link';

export default function B2BPortalSection() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container-site max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-gold-text text-sm font-semibold uppercase tracking-wider mb-2">Для бизнеса</p>
          <h2 className="font-heading text-3xl md:text-4xl font-medium mb-3">B2B-кейтеринг под ключ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Регулярные кофе-брейки, корпоративные обеды, конференции, тренинги.
            Работаем с НДС и без НДС, ЭДО, договоры, закрывающие документы.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl border border-line bg-card">
            <div className="text-2xl mb-2">📅</div>
            <h3 className="font-heading text-base font-medium mb-2">Регулярные заказы</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Ежедневные/еженедельные кофе-брейки и обеды. Фикс-цена по контракту,
              ротация меню, SLA по времени доставки.
            </p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• От 4 событий в месяц</li>
              <li>• Скидка 15-23% от разового</li>
              <li>• Персональный менеджер</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-line bg-card">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-heading text-base font-medium mb-2">Конференции</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Многодневные конференции, семинары, тренинги. Конференционный пакет
              &quot;всё включено&quot; — кофе-брейк + обед + кофе-брейк.
            </p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• От 1 144 ₽/делегат/день</li>
              <li>• Ротация меню 3+ дня</li>
              <li>• Координатор на площадке</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border-2 border-gold-text bg-gold-tint/20">
            <div className="text-2xl mb-2">💼</div>
            <h3 className="font-heading text-base font-medium mb-2">Тендеры и 44-ФЗ</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Участвуем в тендерах по 44-ФЗ и 223-ФЗ. Полный пакет документов:
              ИНН, ОГРНИП, выписка ЕГРИП, страхование ГО, сертификаты.
            </p>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• ЭДО: Диадок, СБИС</li>
              <li>• НДС 20% / без НДС</li>
              <li>• Страхование ГО 5-30М₽</li>
            </ul>
          </div>

          {/* B2B Portal teaser — coming soon */}
          <div className="p-5 rounded-xl border-2 border-dashed border-gold-text/40 bg-gold-tint/5 text-center">
            <p className="text-xs font-semibold text-gold-text uppercase tracking-wider mb-2">Скоро</p>
            <h3 className="font-heading text-base font-medium mb-2">B2B Self-Service Portal</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Личный кабинет для корпоративных клиентов: история заказов, 1-click reorder,
              счета-фактуры, ЭДО, календарь регулярных кофе-брейков.
            </p>
            <ul className="text-xs space-y-1 text-muted-foreground text-left max-w-xs mx-auto">
              <li>• 1-click повтор заказа</li>
              <li>• Авто-счета и закрывающие документы</li>
              <li>• Интеграция с 1C, Bitrix24</li>
              <li>• Календарь и SLA-мониторинг</li>
            </ul>
            <Link href="/contact?subject=B2B-Portal-beta" className="inline-block mt-3 text-xs text-gold-text font-semibold hover:underline">
              Запросить ранний доступ →
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/contact?subject=B2B-тендер" className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors no-underline">
            Запросить КП и пакет документов →
          </Link>
          <a href="tel:+78129195911" className="rounded-lg border border-line bg-card px-6 py-3 text-sm font-semibold hover:border-gold-text transition-colors no-underline">
            📞 +7 (812) 919-59-11
          </a>
        </div>
      </div>
    </section>
  );
}
