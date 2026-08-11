import type { Metadata } from 'next';
import Link from 'next/link';
import { LEGAL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/partners', languages: { 'ru': '/partners', 'en': '/en', 'x-default': '/partners' } },
  title: 'Партнёрам — агентствам, площадкам, поставщикам',
  description:
    'Партнёрская программа NiloV Catering: комиссия 10-15% агентствам, обмен лидами, SLA, NDA, шаблон договора. ЭДО. СПб и ЛО.',
};

export default function PartnersPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Партнёрам</h1>
        <p className="text-muted-foreground mb-8">
          Партнёрская программа NiloV Catering для event-агентств, площадок, организаторов
          и поставщиков. Прозрачные условия, агентская комиссия, NDA, SLA. Работаем с 2007 года,
          27 отзывов · 4.8/5.
        </p>

        {/* Agent / Event-agency program */}
        <div className="mb-8 p-6 rounded-xl border-2 border-gold-text/40 bg-gold-text/5">
          <h2 className="font-heading text-xl font-medium mb-3 flex items-center gap-2">
             Агентствам и event-компаниям
          </h2>
          <p className="text-sm text-foreground/90 mb-4">
            Если вы event-агентство, продюсерская компания или частный организатор — мы готовы
            стать вашим кейтеринг-партнёром в СПб и ЛО. Вы получаете готовое предложение для
            клиента, мы — заказ. Прозрачная агентская схема.
          </p>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-4">
            <li><span className="font-medium">Агентская комиссия:</span> 10% от суммы заказа (для агентств с NDA), 15% — для эксклюзивных партнёров (3+ событий в месяц)</li>
            <li><span className="font-medium">NDA:</span> подписываем до начала работы. Шаблон NDA — по запросу на b2b@nilov-catering.ru в течение 1 рабочего дня</li>
            <li><span className="font-medium">SLA:</span> доставка точно в согласованное окно, штраф 1% за минуту опоздания, максимум 30%</li>
            <li><span className="font-medium">Договор:</span> либо напрямую с ИП Нилов Д.И. (УСН 6%), с НДС или без НДС — на выбор агентства</li>
            <li><span className="font-medium">ЭДО:</span> Контур.Диадок (operator ID 2AE), СБИС (operator ID 2АК)</li>
            <li><span className="font-medium">Лидогенерация:</span> передаём лиды на площадки/флористов/декораторов по запросу. Зеркально — принимаем лиды от партнёров</li>
            <li><span className="font-medium">White-label:</span> можем работать под брендом агентства (униформа без логотипов, без материалов с нашим брендом). Уточняйте</li>
            <li><span className="font-medium">Страхование ГО:</span> базовый полис 5 000 000 ₽, расширение до 30 000 000 ₽ для контрактов от 5 млн ₽</li>
            <li><span className="font-medium">Персональный менеджер:</span> выделенный B2B-менеджер для партнёров с NDA, прямой мобильный</li>
          </ul>
          <p className="text-xs text-muted-foreground">
            Запросить шаблон NDA, агентский договор и прайс-лист для партнёров:{' '}
            <a href="mailto:b2b@nilov-catering.ru" className="underline text-gold-text">b2b@nilov-catering.ru</a>{' '}
            или <a href="tel:+78129195911" className="underline text-gold-text">+7 (812) 919-59-11</a>.
          </p>
        </div>

        {/* Venues */}
        <div className="mb-8 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-xl font-medium mb-3 flex items-center gap-2">
             Площадкам
          </h2>
          <p className="text-sm text-foreground/90 mb-4">
            Если у вас ресторан, лофт, особняк, шатёр, яхт-клуб, ДК или иная площадка для
            мероприятий — добавим вас в наш каталог рекомендованных площадок. Зеркально — вы
            рекомендуете нас как кейтеринг-партнёра вашим клиентам.
          </p>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-4">
            <li><span className="font-medium">Каталог:</span> размещение в разделе /venues с фото, адресом, ценой, метрополитеном</li>
            <li><span className="font-medium">Реферальная комиссия:</span> 5-10% от суммы кейтеринга при передаче лида (по договорённости)</li>
            <li><span className="font-medium">Пробные мероприятия:</span> совместные дегустации для вашего клиента на вашей площадке — бесплатно</li>
            <li><span className="font-medium">Технический райдер:</span> предоставляем заранее (электричество, вода, кухня, зона разгрузки)</li>
            <li><span className="font-medium">Логистика:</span> согласование времени загрузки/разгрузки с администрацией площадки</li>
          </ul>
        </div>

        {/* Suppliers */}
        <div className="mb-8 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-xl font-medium mb-3 flex items-center gap-2">
             Поставщикам
          </h2>
          <p className="text-sm text-foreground/90 mb-4">
            Мы работаем с фермерами ЛО, локальными производителями мяса, рыбы, овощей, сыров.
            Приоритет — продукция с сертификатами ХАССП, халяль (СМР), БГ-верификацией.
          </p>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-4">
            <li>Мясо: говядина, баранина, птица (халяль — обязательно сертификат СМР)</li>
            <li>Рыба: судак, треска, лосось, форель (ветеринарное свидетельство)</li>
            <li>Овощи и зелень: сезонные, локальные фермеры ЛО</li>
            <li>Сыры: моццарелла, буррата, пармезан, творожные сыры</li>
            <li>Хлеб и выпечка: пекарни-партнёры с БГ-линией</li>
            <li>Алкоголь: через лицензированных поставщиков (для бар-меню)</li>
          </ul>
          <p className="text-xs text-muted-foreground">
            Контакты для поставщиков: <a href="mailto:info@nilov-catering.ru" className="underline">info@nilov-catering.ru</a>{' '}
            с темой «Поставщик».
          </p>
        </div>

        {/* Subcontractor kitchens */}
        <div className="mb-8 p-6 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-xl font-medium mb-3 flex items-center gap-2">
             Субподрядным кухням (для событий 500+ гостей)
          </h2>
          <p className="text-sm text-foreground/90 mb-4">
            Для событий на 500+ гостей мы работаем через сертифицированные кухонные мощности СПб. Если у вас
            производственная кухня с мощностью от 500 порций/смена — рассмотрим партнёрство.
          </p>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90 mb-4">
            <li>Аудит: ХАССП, медкнижки персонала, страхование ГО, примеры работ</li>
            <li>Договор субподряда: с ИП Нилов Д.И., оплата по акту (срок — 5 рабочих дней)</li>
            <li>ЭДО: Диадок или СБИС</li>
            <li>NDA: подписываем до передачи заказчика</li>
            <li>Сертификация халяль/БГ: передаём протокол, проверяем соблюдение</li>
            <li>Логистика: координация от NiloV Catering (единый менеджер, меню, сервировка)</li>
          </ul>
        </div>

        {/* Partner network benefits */}
        <div className="mb-8 p-6 rounded-xl border border-line bg-secondary/30">
          <h2 className="font-heading text-xl font-medium mb-3"> Что вы получаете как партнёр</h2>
          <ul className="text-sm space-y-2 list-disc list-inside text-foreground/90">
            <li>Стабильный поток заказов (27 отзывов · 4.8/5 за историю, 200+ в год)</li>
            <li>Прозрачную агентскую комиссию без задержек</li>
            <li>Персонального менеджера и прямой канал связи</li>
            <li>Доступ к нашему бренду и репутации (4.8/5 из 27 отзывов)</li>
            <li>Совместный маркетинг: упоминания в соцсетях, кейсы на сайте (по согласию)</li>
            <li>Раннее бронирование и приоритет в пиковые даты (май-сентябрь, декабрь)</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Стать партнёром</h2>
          <p className="text-sm mb-4 opacity-90">
            Опишите ваш бизнес и предложение — B2B-менеджер свяжется в течение 1 рабочего дня.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="mailto:b2b@nilov-catering.ru?subject=Партнёрство" className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline">
               b2b@nilov-catering.ru
            </a>
            <a href="tel:+78129195911" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
               +7 (812) 919-59-11
            </a>
            <Link href="/contact" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
               Форма заявки
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-8 text-xs text-muted-foreground space-y-1">
          <p>{LEGAL.operatorFull}</p>
          <p>ИНН {LEGAL.inn} · ОГРНИП {LEGAL.ogrnip}</p>
          <p>ЭДО: {LEGAL.edo.diadoc} · {LEGAL.edo.sbis}</p>
          <p>НДС через партнёрское ООО (по запросу)</p>
        </div>
      </div>
    </main>
  );
}
