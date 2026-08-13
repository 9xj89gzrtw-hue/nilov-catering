import Link from "next/link";

export default function B2BPortalSection() {
  return (
    <section className="bg-secondary/30 py-12 md:py-16">
      <div className="container-site max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-gold-text mb-2 text-sm font-semibold tracking-wider uppercase">
            Для бизнеса
          </p>
          <h2 className="font-heading mb-3 text-3xl font-medium md:text-4xl">
            B2B-кейтеринг под ключ
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Регулярные кофе-брейки, корпоративные обеды, конференции, тренинги. Без НДС (УСН). НДС
            через партнёрское ООО, ЭДО, договоры, закрывающие документы.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="border-line bg-card rounded-xl border p-5">
            <div className="mb-2 text-2xl"></div>
            <h3 className="font-heading mb-2 text-base font-medium">Регулярные заказы</h3>
            <p className="text-muted-foreground mb-3 text-xs">
              Ежедневные/еженедельные кофе-брейки и обеды. Фикс-цена по контракту, ротация меню, SLA
              по времени доставки.
            </p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• От 4 событий в месяц</li>
              <li>• Скидка 15-23% от разового</li>
              <li>• Персональный менеджер</li>
            </ul>
          </div>

          <div className="border-line bg-card rounded-xl border p-5">
            <div className="mb-2 text-2xl"></div>
            <h3 className="font-heading mb-2 text-base font-medium">Конференции</h3>
            <p className="text-muted-foreground mb-3 text-xs">
              Многодневные конференции, семинары, тренинги. Конференционный пакет &quot;всё
              включено&quot; — кофе-брейк + обед + кофе-брейк.
            </p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• От 1 144 ₽/делегат/день</li>
              <li>• Ротация меню 3+ дня</li>
              <li>• Координатор на площадке</li>
            </ul>
          </div>

          <div className="border-gold-text bg-gold-tint/20 rounded-xl border-2 p-5">
            <div className="mb-2 text-2xl"></div>
            <h3 className="font-heading mb-2 text-base font-medium">Тендеры и 44-ФЗ</h3>
            <p className="text-muted-foreground mb-3 text-xs">
              Участвуем в тендерах по 44-ФЗ и 223-ФЗ. Полный пакет документов: ИНН, ОГРНИП, выписка
              ЕГРИП, страхование ГО, сертификаты.
            </p>
            <ul className="text-muted-foreground space-y-1 text-xs">
              <li>• ЭДО: Диадок, СБИС</li>
              <li>• НДС 20% / без НДС</li>
              <li>• Страхование ГО 5-30М₽</li>
            </ul>
          </div>

          {/* B2B Portal teaser — coming soon */}
          <div className="border-gold-text/40 bg-gold-tint/5 rounded-xl border-2 border-dashed p-5 text-center">
            <p className="text-gold-text mb-2 text-xs font-semibold tracking-wider uppercase">
              Скоро
            </p>
            <h3 className="font-heading mb-2 text-base font-medium">B2B-портал самообслуживания</h3>
            <p className="text-muted-foreground mb-3 text-xs">
              Личный кабинет для корпоративных клиентов: история заказов, повтор заказа в один клик,
              счета-фактуры, ЭДО, календарь регулярных кофе-брейков.
            </p>
            <ul className="text-muted-foreground mx-auto max-w-xs space-y-1 text-left text-xs">
              <li>• повтор заказа в один клик</li>
              <li>• Авто-счета и закрывающие документы</li>
              <li>• Интеграция с 1C, Bitrix24</li>
              <li>• Календарь и SLA-мониторинг</li>
            </ul>
            <Link
              href="/contact?subject=B2B-Portal-beta"
              className="text-gold-text mt-3 inline-block text-xs font-semibold hover:underline"
            >
              Запросить ранний доступ →
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact?subject=B2B-тендер"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors"
          >
            Запросить КП и пакет документов →
          </Link>
          <a
            href="tel:+78129195911"
            className="border-line bg-card hover:border-gold-text rounded-lg border px-6 py-3 text-sm font-semibold no-underline transition-colors"
          >
            +7 (812) 919-59-11
          </a>
        </div>
      </div>
    </section>
  );
}
