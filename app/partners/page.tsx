import type { Metadata } from "next";
import Link from "next/link";
import { LEGAL } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/partners", languages: { ru: "/partners", "x-default": "/partners" } },
  title: "Партнёрам — агентствам, площадкам, поставщикам",
  description:
    "Партнёрская программа NiloV Catering: комиссия 10-15% агентствам, обмен лидами, SLA, NDA, шаблон договора. ЭДО. СПб и ЛО.",
};

export default function PartnersPage() {
  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-4">Партнёрам</h1>
        <p className="text-muted-foreground mb-8">
          Партнёрская программа NiloV Catering для агентств мероприятий, площадок, организаторов и
          поставщиков. Прозрачные условия, агентская комиссия, NDA, SLA. Работаем с 2007 года, 27
          отзывов · 4.8/5.
        </p>

        {/* Agent / Event-agency program */}
        <div className="border-gold-text/40 bg-gold-text/5 mb-8 rounded-xl border-2 p-6">
          <h2 className="font-heading mb-3 flex items-center gap-2 text-xl font-medium">
            Агентствам и компаниям мероприятий
          </h2>
          <p className="text-foreground/90 mb-4 text-sm">
            Если вы агентств мероприятийо, продюсерская компания или частный организатор — мы готовы
            стать вашим кейтеринг-партнёром в СПб и ЛО. Вы получаете готовое предложение для
            клиента, мы — заказ. Прозрачная агентская схема.
          </p>
          <ul className="text-foreground/90 mb-4 list-inside list-disc space-y-1.5 text-sm">
            <li>
              <span className="font-medium">Агентская комиссия:</span> 10% от суммы заказа (для
              агентств с NDA), 15% — для эксклюзивных партнёров (3+ событий в месяц)
            </li>
            <li>
              <span className="font-medium">NDA:</span> подписываем до начала работы. Шаблон NDA —
              по запросу на b2b@nilov-catering.ru в течение 1 рабочего дня
            </li>
            <li>
              <span className="font-medium">SLA:</span> доставка в окно ±15 минут, штраф 1% за
              минуту опоздания, максимум 30%
            </li>
            <li>
              <span className="font-medium">Договор:</span> либо напрямую с ИП Нилов Д.И. (УСН 6%),
              без НДС (УСН) или с НДС через партнёрское ООО — на выбор агентства
            </li>
            <li>
              <span className="font-medium">ЭДО:</span> Контур.Диадок (код оператора 2AE), СБИС (код
              оператора 2АК)
            </li>
            <li>
              <span className="font-medium">Лидогенерация:</span> передаём лиды на
              площадки/флористов/декораторов по запросу. Зеркально — принимаем лиды от партнёров
            </li>
            <li>
              <span className="font-medium">Под вашим брендом:</span> можем работать под брендом
              агентства (униформа без логотипов, без материалов с нашим брендом). Уточняйте
            </li>
            <li>
              <span className="font-medium">Страхование ГО:</span> базовый полис 5 000 000 ₽,
              расширение до 30 000 000 ₽ для контрактов от 5 млн ₽
            </li>
            <li>
              <span className="font-medium">Персональный менеджер:</span> выделенный B2B-менеджер
              для партнёров с NDA, прямой мобильный
            </li>
          </ul>
          <p className="text-muted-foreground text-xs">
            Запросить шаблон NDA, агентский договор и прайс-лист для партнёров:{" "}
            <a href="mailto:b2b@nilov-catering.ru" className="text-gold-text underline">
              b2b@nilov-catering.ru
            </a>{" "}
            или{" "}
            <a href="tel:+78129195911" className="text-gold-text underline">
              +7 (812) 919-59-11
            </a>
            .
          </p>
        </div>

        {/* Venues */}
        <div className="border-line bg-card mb-8 rounded-xl border p-6">
          <h2 className="font-heading mb-3 flex items-center gap-2 text-xl font-medium">
            Площадкам
          </h2>
          <p className="text-foreground/90 mb-4 text-sm">
            Если у вас ресторан, лофт, особняк, шатёр, яхт-клуб, ДК или иная площадка для
            мероприятий — добавим вас в наш каталог рекомендованных площадок. Зеркально — вы
            рекомендуете нас как кейтеринг-партнёра вашим клиентам.
          </p>
          <ul className="text-foreground/90 mb-4 list-inside list-disc space-y-1.5 text-sm">
            <li>
              <span className="font-medium">Каталог:</span> размещение в разделе /venues с фото,
              адресом, ценой, метрополитеном
            </li>
            <li>
              <span className="font-medium">Реферальная комиссия:</span> 5-10% от суммы кейтеринга
              при передаче лида (по договорённости)
            </li>
            <li>
              <span className="font-medium">Пробные мероприятия:</span> совместные дегустации для
              вашего клиента на вашей площадке — бесплатно
            </li>
            <li>
              <span className="font-medium">Технический райдер:</span> предоставляем заранее
              (электричество, вода, кухня, зона разгрузки)
            </li>
            <li>
              <span className="font-medium">Логистика:</span> согласование времени
              загрузки/разгрузки с администрацией площадки
            </li>
          </ul>
        </div>

        {/* Suppliers */}
        <div className="border-line bg-card mb-8 rounded-xl border p-6">
          <h2 className="font-heading mb-3 flex items-center gap-2 text-xl font-medium">
            Поставщикам
          </h2>
          <p className="text-foreground/90 mb-4 text-sm">
            Мы работаем с фермерами ЛО, локальными производителями мяса, рыбы, овощей, сыров.
            Приоритет — продукция с сертификатами ХАССП, халяль (СМР), БГ-верификацией.
          </p>
          <ul className="text-foreground/90 mb-4 list-inside list-disc space-y-1.5 text-sm">
            <li>Мясо: говядина, баранина, птица (халяль — обязательно сертификат СМР)</li>
            <li>Рыба: судак, треска, лосось, форель (ветеринарное свидетельство)</li>
            <li>Овощи и зелень: сезонные, локальные фермеры ЛО</li>
            <li>Сыры: моццарелла, буррата, пармезан, творожные сыры</li>
            <li>Хлеб и выпечка: пекарни-партнёры с БГ-линией</li>
            <li>Алкоголь: через лицензированных поставщиков (для бар-меню)</li>
          </ul>
          <p className="text-muted-foreground text-xs">
            Контакты для поставщиков:{" "}
            <a href="mailto:info@nilov-catering.ru" className="underline">
              info@nilov-catering.ru
            </a>{" "}
            с темой «Поставщик».
          </p>
        </div>

        {/* Subcontractor kitchens */}
        <div className="border-line bg-card mb-8 rounded-xl border p-6">
          <h2 className="font-heading mb-3 flex items-center gap-2 text-xl font-medium">
            Субподрядным кухням (для событий 500+ гостей)
          </h2>
          <p className="text-foreground/90 mb-4 text-sm">
            Для событий на 500+ гостей мы работаем через сертифицированные кухонные мощности СПб.
            Если у вас производственная кухня с мощностью от 500 порций/смена — рассмотрим
            партнёрство.
          </p>
          <ul className="text-foreground/90 mb-4 list-inside list-disc space-y-1.5 text-sm">
            <li>Аудит: ХАССП, медкнижки персонала, страхование ГО, примеры работ</li>
            <li>Договор субподряда: с ИП Нилов Д.И., оплата по акту (срок — 5 рабочих дней)</li>
            <li>ЭДО: Диадок или СБИС</li>
            <li>NDA: подписываем до передачи заказчика</li>
            <li>Сертификация халяль/БГ: передаём протокол, проверяем соблюдение</li>
            <li>Логистика: координация от NiloV Catering (единый менеджер, меню, сервировка)</li>
          </ul>
        </div>

        {/* Partner network benefits */}
        <div className="border-line bg-secondary/30 mb-8 rounded-xl border p-6">
          <h2 className="font-heading mb-3 text-xl font-medium">Что вы получаете как партнёр</h2>
          <ul className="text-foreground/90 list-inside list-disc space-y-2 text-sm">
            <li>Стабильный поток заказов (27 отзывов · 4.8/5 за историю, 150+ в год)</li>
            <li>Прозрачную агентскую комиссию без задержек</li>
            <li>Персонального менеджера и прямой канал связи</li>
            <li>Доступ к нашему бренду и репутации (4.8/5 из 27 отзывов)</li>
            <li>Совместный маркетинг: упоминания в соцсетях, кейсы на сайте (по согласию)</li>
            <li>Раннее бронирование и приоритет в пиковые даты (май-сентябрь, декабрь)</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
          <h2 className="font-heading mb-2 text-xl font-medium">Стать партнёром</h2>
          <p className="mb-4 text-sm opacity-90">
            Опишите ваш бизнес и предложение — B2B-менеджер свяжется в течение 1 рабочего дня.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:b2b@nilov-catering.ru?subject=Партнёрство"
              className="bg-background text-foreground hover:bg-background/90 inline-flex min-h-[44px] items-center rounded-lg px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              b2b@nilov-catering.ru
            </a>
            <a
              href="tel:+78129195911"
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              +7 (812) 919-59-11
            </a>
            <Link
              href="/contact"
              className="border-background hover:bg-background/10 inline-flex min-h-[44px] items-center rounded-lg border-2 px-5 py-2.5 text-sm font-semibold no-underline transition-colors"
            >
              Форма заявки
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="text-muted-foreground mt-8 space-y-1 text-xs">
          <p>{LEGAL.operatorFull}</p>
          <p>
            ИНН {LEGAL.inn} · ОГРНИП {LEGAL.ogrnip}
          </p>
          <p>
            ЭДО: {LEGAL.edo.diadoc} · {LEGAL.edo.sbis}
          </p>
          <p>НДС через партнёрское ООО (по запросу)</p>
        </div>
      </div>
    </main>
  );
}
