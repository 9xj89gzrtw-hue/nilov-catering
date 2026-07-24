import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/allergens' },
  title: 'Аллергены, медицинские диеты и поминальный протокол — NiloV Catering',
  description: '14 аллергенов ТР ТС 022/2011, протоколы для целиакии (<20 ppm), анафилаксии (nut-free), халяль, веган, сахарный диабет (расчёт ХЕ), поминки (без алкоголя). Раздельное оборудование, маркировка блюд, EpiPen.',
};

const ALLERGENS_14 = [
  { name: 'Глютен (злаки)', emoji: '🌾', details: 'Пшеница, рожь, ячмень, овёс и их производные. Для целиакии — отдельная линия кухни, тестирование <20 ppm.' },
  { name: 'Ракообразные', emoji: '🦐', details: 'Креветки, крабы, омары, лангустины. Встречаются в морепродуктах, соусах, бульонах.' },
  { name: 'Яйца', emoji: '🥚', details: 'Белок и желток. В выпечке, соусах (майонез), блюдах с обвалкой.' },
  { name: 'Рыба', emoji: '🐟', details: 'Все виды рыб. Встречается в супах, соусах (ворчестер), пастах.' },
  { name: 'Арахис', emoji: '🥜', details: 'Бобовые, часто называют орехом. В азиатской кухне, десертах, марципане. Анафилаксия — частая.' },
  { name: 'Соя', emoji: '🌱', details: 'Соевый соус, тофу, мисо, эдамаме. В азиатских блюдах, веган-меню.' },
  { name: 'Молоко', emoji: '🥛', details: 'Коровье, козье, овечье. Лактоза, казеин, сыворотка. В десертах, соусах.' },
  { name: 'Орехи', emoji: '🌰', details: 'Лесной, грецкий, кедровый, миндаль, кешью, фисташка, пекан, макадамия, бразильский. Анафилаксия — частая.' },
  { name: 'Сельдерей', emoji: '🌿', details: 'Корень и стебель. В супах, бульонах, салатах. Часто скрытый аллерген.' },
  { name: 'Горчица', emoji: '🟡', details: 'Семена и паста. В соусах, маринадах, мясных изделиях.' },
  { name: 'Кунжут', emoji: '▪️', details: 'Семена и паста (тахини). В выпечке, азиатских блюдах, хумусе.' },
  { name: 'Сульфиты', emoji: '🍷', details: 'Диоксид серы и сульфиты. В вине, сухофруктах, переработанных продуктах.' },
  { name: 'Люпин', emoji: '🌼', details: 'Бобовые, родственные арахису. В муке, выпечке, готовых продуктах.' },
  { name: 'Моллюски', emoji: '🦪', details: 'Устрицы, мидии, кальмары, осьминоги. В морепродуктах, паэлье, ризотто.' },
];

export default function Page() {
  return (
    <main className="pt-24 pb-20">
      <div className="container-site max-w-4xl">
        <nav aria-label="Хлебные крошки" className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">Главная</Link>
          {' / '}
          <span className="text-foreground">Аллергены</span>
        </nav>

        <h1 className="font-heading text-3xl md:text-4xl font-medium mb-3">14 аллергенов ТР ТС 022/2011</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Все блюда маркируются по 14 аллергенам согласно Техническому регламенту Таможенного союза
          «О безопасности пищевой продукции» (Приложение 3). Ниже — детали по каждому аллергену
          и протоколы безопасности для медицинских диет.
        </p>

        {/* 14 аллергенов — детально */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {ALLERGENS_14.map((a) => (
            <div key={a.name} className="p-4 rounded-xl border border-line bg-card">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-2xl" aria-hidden="true">{a.emoji}</span>
                <h2 className="font-heading text-base font-medium text-foreground">{a.name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{a.details}</p>
            </div>
          ))}
        </div>

        {/* Целиакия-протокол */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-blue-200 bg-blue-50">
          <h2 className="font-heading text-xl font-medium mb-3">🌾 Протокол для целиакии (без глютена)</h2>
          <ul className="text-sm text-foreground space-y-1.5 mb-3">
            <li>✓ Отдельная зона кухни — без пересечения с пшеничной мукой</li>
            <li>✓ Отдельные разделочные столы, плиты, духовки</li>
            <li>✓ Отдельные ножи, доски, сковороды, противни (синяя маркировка)</li>
            <li>✓ Тестирование &lt;20 ppm (Codex Alimentarius, GFCO, Coeliac UK)</li>
            <li>✓ Поставщики БГ-ингредиентов: Bob's Red Mill, Гарнец, верифицированные БГ-производители</li>
            <li>✓ Полный состав каждого БГ-блюда с маркой и поставщиком ингредиентов</li>
            <li>✓ Отдельный фритюр — без панировочных сухарей</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Подробнее: <Link href="/menu/gluten-free" className="text-gold-text hover:underline">/menu/gluten-free →</Link>
            {' · '}
            <Link href="/certificates" className="text-gold-text hover:underline">сертификаты →</Link>
          </p>
        </div>

        {/* Анафилаксия-протокол (nut-free) */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-red-200 bg-red-50">
          <h2 className="font-heading text-xl font-medium mb-3">🥜 Протокол для анафилаксии на орехи (nut-free)</h2>
          <p className="text-sm text-foreground mb-3">
            Если у гостя анафилаксия на арахис, лесной, кедровый, грецкий или любой другой орех:
          </p>
          <ul className="text-sm text-foreground space-y-1.5 mb-3">
            <li>✓ Отдельная смена приготовления — без пересечения с другими заказами</li>
            <li>✓ Отдельная зона кухни с красной цветовой маркировкой</li>
            <li>✓ Отдельные доски, ножи, посуда — никогда не используются для ореховых блюд</li>
            <li>✓ Запрещённые ингредиенты: арахисовое масло, миндальная мука, марципан, pesto с кедровым, нуга, praline, amaretto, kirsch</li>
            <li>✓ Верификация поставщиков: бренды муки, шоколада, пасты — без следов орехов</li>
            <li>✓ Per-dish маркировка на событии — этикетка с составом на каждом блюде</li>
            <li>✓ EpiPen / адреналин: обучаем персонал первой помощи при анафилактическом шоке (ежегодный инструктаж)</li>
            <li>✓ При заявленной анафилаксии менеджер звонит клиенту за 24 часа до события для подтверждения протокола</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Укажите в заявке тип ореха и тяжесть аллергии. Подробнее: <Link href="/certificates" className="text-gold-text hover:underline">сертификаты →</Link>
          </p>
        </div>

        {/* Халяль-протокол */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50">
          <h2 className="font-heading text-xl font-medium mb-3">🕌 Халяль-протокол (раздельное оборудование)</h2>
          <ul className="text-sm text-foreground space-y-1.5 mb-3">
            <li>✓ Забой по обряду зибха (zibh) с произнесением такбира (tasmiya)</li>
            <li>✓ Сертификат Совета муфтиев России (ДУМ РФ)</li>
            <li>✓ Поставщики мяса: сертифицированные халяль-бойни Ленинградской области</li>
            <li>✓ Отдельный мангал, гриль, сковороды, ножи, разделочные доски (зелёная маркировка)</li>
            <li>✓ Без свинины — полное разделение линий</li>
            <li>✓ Без алкоголя — винный уксус, мирин, коньяк исключены из халяль-блюд</li>
            <li>✓ Отдельный транспорт для халяль-заказов</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Подробнее: <Link href="/menu/halal" className="text-gold-text hover:underline">/menu/halal →</Link>
            {' · '}
            <Link href="/certificates" className="text-gold-text hover:underline">сертификаты →</Link>
          </p>
        </div>

        {/* Веган-протокол */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-green-200 bg-green-50">
          <h2 className="font-heading text-xl font-medium mb-3">🌱 Веган-протокол (без животных продуктов)</h2>
          <ul className="text-sm text-foreground space-y-1.5 mb-3">
            <li>✓ Без мяса, рыбы, морепродуктов, яиц, молока, мёда, желатина</li>
            <li>✓ Отдельная зона кухни для веган-блюд (по умолчанию)</li>
            <li>✓ Отдельные доски/ножи с зелёной маркировкой</li>
            <li>✓ Без cross-contamination с молочными/яйцами/мёдом</li>
            <li>✓ Отдельная посуда для веган-блюд</li>
            <li>✓ Поставщики растительных ингредиентов верифицированы</li>
            <li>✓ 30 веганских блюд в каталоге — от закусок до десертов</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Подробнее: <Link href="/menu/vegan" className="text-gold-text hover:underline">/menu/vegan →</Link>
          </p>
        </div>

        {/* Диабет-протокол (сахарный диабет 1 типа) */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-purple-200 bg-purple-50">
          <h2 className="font-heading text-xl font-medium mb-3">
            💉 Протокол для сахарного диабета (СД1, СД2)
          </h2>
          <p className="text-sm text-foreground mb-3">
            Для гостей с сахарным диабетом 1 или 2 типа мы делаем отдельное меню с расчётом
            хлебных единиц (ХЕ). 1 ХЕ = 10–12 г углеводов. Целевой ГИ блюд — не выше 50.
          </p>
          <ul className="text-sm text-foreground space-y-1.5 mb-3">
            <li>✓ <span className="font-medium">Без добавленного сахара</span> — сахар, мёд, фруктоза, сиропы (кленовый, агавы, топинамбура), патока исключены</li>
            <li>✓ Заменители: стевия, эритрит, аллюлоза — по запросу</li>
            <li>✓ <span className="font-medium">Без скрытых сахаров в соусах</span> — кетчуп, терияки, барбекю, томатная паста либо исключаем, либо готовим сами без сахара</li>
            <li>✓ <span className="font-medium">Фрукты с низким ГИ</span> — ягоды (клубника, малина, черника), киви, грейпфрут. Банан, виноград, дыня, манго — исключаем</li>
            <li>✓ Расчёт ХЕ на каждую порцию — указываем в карточке блюда и в меню-карте</li>
            <li>✓ Состав БЖУ: белки / жиры / углеводы (г) — указываем на блюде</li>
            <li>✓ <span className="font-medium">Без candy-bar / сладкого стола по умолчанию</span> — заменяем на сырно-фруктовую тарелку (брусника, черника, твёрдые сыры, орехи — если нет анафилаксии)</li>
            <li>✓ Безалкогольное меню — алкоголь влияет на уровень глюкозы непредсказуемо</li>
            <li>✓ БГ + без-сахара торт: отдельная выпечка с стевией/эритритом и миндальной мукой (если нет анафилаксии на орехи)</li>
            <li>✓ Обязательная дегустация для гостя с СД1 — подтверждение состава и расчёта ХЕ перед заказом</li>
            <li>✓ Шеф-кондитер Елена Соколова специализируется на диабетической выпечке (стаж 8 лет)</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            В заявке выберите тип «Другое» и в комментарии укажите: «СД1 (или СД2), считаем ХЕ,
            без добавленного сахара». Менеджер свяжется в течение 1 часа для согласования меню.{' '}
            <Link href="/contact" className="text-gold-text hover:underline">Оставить заявку →</Link>
          </p>
        </div>

        {/* Поминки-протокол */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-gray-300 bg-gray-50">
          <h2 className="font-heading text-xl font-medium mb-3">
            🕯 Поминальный протокол (без алкоголя, без торта)
          </h2>
          <p className="text-sm text-foreground mb-3">
            Поминальный обед — особый формат. Полностью исключаем алкоголь, сладкие торты со
            свечками, шумные элементы сервировки. Меню по православной традиции: кутья, блины,
            кисель — обязательно.
          </p>
          <ul className="text-sm text-foreground space-y-1.5 mb-3">
            <li>✓ Меню без алкоголя: шампанское, вино, пиво, ликёры — исключены</li>
            <li>✓ Без торта «С днём рождения» и свечек</li>
            <li>✓ Тихая сервировка, без музыки, без аниматоров</li>
            <li>✓ Кутья (коливо), постные блины, кисель — по традиции</li>
            <li>✓ Постное меню: борщ постный, уха, рыба запечённая, винегрет, пирожки с капустой</li>
            <li>✓ Доставка в кафе у дома или в храм (по согласованию)</li>
            <li>✓ Срочные заказы — даже на день обращения</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Подробнее: <Link href="/events/pominki" className="text-gold-text hover:underline">/events/pominki →</Link>
          </p>
        </div>

        {/* CTA */}
        <div className="p-6 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-heading text-xl font-medium mb-2">Заказать меню с исключением аллергенов</h2>
          <p className="text-sm mb-4 opacity-90">
            Укажите аллергены в заявке — менеджер свяжется для подтверждения протокола.
            Для медицинских диет (целиакия, анафилаксия) — обязательная дегустация от 1 гостя.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-background text-foreground px-5 py-2.5 text-sm font-semibold hover:bg-background/90 transition-colors no-underline">
              ✍️ Оставить заявку
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              📞 {SITE.phone}
            </a>
            <Link href="/certificates" className="rounded-lg border-2 border-background px-5 py-2.5 text-sm font-semibold hover:bg-background/10 transition-colors no-underline">
              📋 Сертификаты
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
