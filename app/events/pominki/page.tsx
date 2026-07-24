import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: '/events/pominki' },
  title: 'Поминки — кейтеринг в СПб, поминальное меню',
  description:
    'Поминальный обед в Санкт-Петербурге. Постное меню без алкоголя: кутья, блины, кисель, рыбные блюда. Доставка в кафе и домой. От 1 800 ₽/гость.',
};

const POMINKI_MENU = [
  {
    section: 'Обязательные блюда',
    items: [
      { name: 'Кутья (коливо)', desc: 'Пшеница с мёдом, маком и изюмом. По православной традиции.', price: '150 ₽/порция' },
      { name: 'Блины постные', desc: 'С мёдом или без начинки. Подаются первыми.', price: '120 ₽/порция' },
      { name: 'Кисель овсяный или ягодный', desc: 'Традиционный поминальный напиток.', price: '90 ₽/порция' },
    ],
  },
  {
    section: 'Холодные закуски',
    items: [
      { name: 'Селёдка с отварным картофелем', desc: 'Классика поминального стола.', price: '220 ₽/порция' },
      { name: 'Винегрет', desc: 'Свёкла, морковь, картофель, солёные огурцы, квашеная капуста.', price: '180 ₽/порция' },
      { name: 'Солёные огурцы и помидоры', desc: 'Домашние заготовки.', price: '120 ₽/порция' },
      { name: 'Пирожки постные с капустой и грибами', desc: 'Домашние, из печи.', price: '90 ₽/шт' },
    ],
  },
  {
    section: 'Первые блюда',
    items: [
      { name: 'Борщ постный', desc: 'Без мясного бульона, с фасолью.', price: '180 ₽/порция' },
      { name: 'Уха рыбацкая', desc: 'Из трёх видов рыбы. Подается с расстегаем.', price: '240 ₽/порция' },
    ],
  },
  {
    section: 'Горячие блюда',
    items: [
      { name: 'Рыба запечённая с гарниром', desc: 'Судак или треска с отварным картофелем.', price: '380 ₽/порция' },
      { name: 'Грибы жареные с картофелем', desc: 'Лесные грибы, молодой картофель, лук.', price: '320 ₽/порция' },
      { name: 'Котлеты рыбные', desc: 'Из трески с зеленью.', price: '280 ₽/порция' },
    ],
  },
  {
    section: 'Напитки',
    items: [
      { name: 'Морс клюквенный', desc: 'Домашний.', price: '90 ₽/порция' },
      { name: 'Компот из сухофруктов', desc: 'Без сахара.', price: '80 ₽/порция' },
      { name: 'Чай (чёрный, зелёный)', desc: 'С мёдом и лимоном.', price: '50 ₽/порция' },
    ],
  },
];

export default function PominkiPage() {
  const totalMin = POMINKI_MENU.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-3xl">
        <h1 className="mb-2">Поминки</h1>
        <p className="text-muted-foreground mb-6">
          Поминальный обед — особый вид мероприятия. Мы готовим по православной традиции:
          постное меню без алкоголя, без торта «С днём рождения», без шумных тостов. Кутья,
          блины, кисель — обязательно. Доставка в кафе, в церковный зал или домой. Тихо,
          достойно, профессионально.
        </p>

        <div className="mb-8 p-5 rounded-xl border border-line bg-card">
          <h2 className="font-heading text-lg font-medium mb-3">Что важно знать</h2>
          <ul className="text-sm space-y-1.5 list-disc list-inside text-foreground/90">
            <li>Меню полностью без алкоголя. Шампанское, вино, пиво — исключены.</li>
            <li>Без торта со свечками и надписями. Можно подать кутью и постные пирожки.</li>
            <li>Без музыки, без аниматоров, без фотосессии.</li>
            <li>Возможна доставка в кафе у дома или в храм (с согласованием).</li>
            <li>Срок организации: от 1 рабочего дня (срочные поминки — возможно).</li>
            <li>Чек выдаём на руки. Договор и закрывающие документы — для родных.</li>
            <li>Бюджет: от 1 800 ₽/гость. Минимум — 10 человек.</li>
          </ul>
        </div>

        <div className="mb-8 p-5 rounded-xl border border-gold-text/40 bg-gold-text/5">
          <h2 className="font-heading text-lg font-medium mb-2">Как заказать</h2>
          <ol className="text-sm space-y-2 list-decimal list-inside text-foreground/90 mb-3">
            <li>
              Позвоните:{' '}
              <a href="tel:+78129195911" className="text-gold-text font-semibold hover:underline">
                +7 (812) 919-59-11
              </a>{' '}
              (с городского телефона в СПб набирайте просто 919-59-11, без 812).
            </li>
            <li>Скажите: дату, время, количество гостей, адрес (дом или кафе).</li>
            <li>Менеджер предложит меню под ваш бюджет — от 1 800 ₽/гость.</li>
            <li>Курьер привезёт за 60 минут до начала. Сервируем тихо.</li>
          </ol>
          <p className="text-xs text-muted-foreground">
            Если вам тяжело говорить — напишите в WhatsApp:{' '}
            <a
              href="https://wa.me/78129195911"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              wa.me/78129195911
            </a>
            . Менеджер свяжется в течение 15 минут.
          </p>
        </div>

        <h2 className="font-heading text-xl font-medium mt-12 mb-4">
          Поминальное меню ({totalMin} блюд)
        </h2>
        <div className="space-y-8 mb-10">
          {POMINKI_MENU.map((sec) => (
            <div key={sec.section}>
              <h3 className="font-heading text-base font-medium text-gold-text mb-3">
                {sec.section}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sec.items.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-xl border border-line bg-card p-4 hover:border-gold-text transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                      <span className="text-xs font-semibold text-gold-text shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10 p-5 rounded-xl border border-dashed border-line bg-card/50">
          <p className="text-sm font-medium mb-2">Заказать поминки</p>
          <p className="text-xs text-muted-foreground mb-4">
            Можно звонком или через форму заявки (выберите тип события «Поминки»).
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a
              href="tel:+78129195911"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              📞 +7 (812) 919-59-11
            </a>
            <a
              href="https://wa.me/78129195911"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-foreground hover:border-gold-text transition-colors"
            >
              💬 WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-5 py-3 text-sm font-semibold text-foreground hover:border-gold-text transition-colors"
            >
              ✍️ Форма заявки
            </Link>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Принимаем срочные заказы — даже на день обращения, если есть свободная бригада.
        </p>
      </div>
    </main>
  );
}
