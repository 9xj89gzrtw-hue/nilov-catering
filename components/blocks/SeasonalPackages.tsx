'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PkgItem {
  name: string;
  desc: string;
  qty: string;
}
interface Pkg {
  name: string;
  price: string;
  desc: string;
  items: PkgItem[];
}

const PKGS: Record<string, Pkg[]> = {
  'new-year': [
    {
      name: 'Эконом', price: '3 450 ₽/гость',
      desc: 'Новогодний фуршет. Канапе, горячее, десерты, игристое.',
      items: [
        { name: 'Оливье с раковыми шейками', desc: 'Раковые шейки, картофель, яйцо, горошек, майонез', qty: '1 порция' },
        { name: 'Канапе с красной икрой', desc: 'Икра лососёвая, сливочное масло, багет', qty: '2 шт/гость' },
        { name: 'Тарталетка с крабом', desc: 'Крабовое мясо, сливочный сыр, авокадо', qty: '1 шт/гость' },
        { name: 'Запечённый гусь', desc: 'Гусь с яблоками и черносливом', qty: '1 порция' },
        { name: 'Корюшка горячего копчения', desc: 'Корюшка, копчёная на ольховой щепе', qty: '3 шт/гость' },
        { name: 'Мандариновый десерт', desc: 'Мусс из мандаринов, бисквит, цедра', qty: '1 стакан' },
        { name: 'Имбирный чай с облепихой', desc: 'Облепиха, имбирь, мёд, корица', qty: 'безлимит' },
        { name: 'Глинтвейн безалкогольный', desc: 'Виноградный сок, пряности, апельсин', qty: '1 бокал' },
      ],
    },
    {
      name: 'Стандарт', price: '4 950 ₽/гость',
      desc: 'Новогодний банкет: 3 смены блюд, вино, коктейли, фотозона.',
      items: [
        { name: 'Оливье с раковыми шейками', desc: 'Раковые шейки, картофель, яйцо, горошек', qty: '1 порция' },
        { name: 'Канапе с красной икрой', desc: 'Икра, масло, багет', qty: '2 шт/гость' },
        { name: 'Мясное плато', desc: 'Буженина, ростбиф, индейка, горчица', qty: '1 станция' },
        { name: 'Сырная тарелка', desc: 'Камамбер, маасдам, пармезан, мёд', qty: '1 станция' },
        { name: 'Запечённый гусь', desc: 'Гусь с яблоками и черносливом', qty: '1 порция' },
        { name: 'Стейк из говядины', desc: 'Говядина Prime, перечный соус', qty: '1 порция' },
        { name: 'Корюшка горячего копчения', desc: 'На ольховой щепе', qty: '3 шт/гость' },
        { name: 'Мандариновый десерт', desc: 'Мусс, бисквит, цедра', qty: '1 стакан' },
        { name: 'Сало в шоколаде', desc: 'Солёное сало, бельгийский шоколад', qty: '1 сет' },
        { name: 'Шампанское', desc: 'Брют/просекко', qty: '2 бокала' },
        { name: 'Глинтвейн', desc: 'Красное вино, пряности, апельсин', qty: '1 бокал' },
        { name: 'Имбирный чай с облепихой', desc: 'Облепиха, имбирь, мёд', qty: 'безлимит' },
      ],
    },
    {
      name: 'Расширенный', price: '6 950 ₽/гость',
      desc: 'Полный цикл: меню, бар, шоу-программа, ведущий, декор зала.',
      items: [
        { name: 'Оливье с раковыми шейками', desc: 'Раковые шейки, картофель, яйцо', qty: '1 порция' },
        { name: 'Икорная станция', desc: 'Красная икра, бриошь, масло, лимон', qty: '1 станция' },
        { name: 'Антипасто', desc: 'Прошутто, салями, артишоки', qty: '1 станция' },
        { name: 'Запечённый гусь', desc: 'Гусь с яблоками и черносливом', qty: '1 порция' },
        { name: 'Стейк из говядины', desc: 'Prime, перечный соус', qty: '1 порция' },
        { name: 'Лосось гриль', desc: 'Филе, лимонный бер-блан', qty: '1 порция' },
        { name: 'Корюшка горячего копчения', desc: 'Ольховая щепа', qty: '3 шт/гость' },
        { name: 'Мандариновый десерт', desc: 'Мусс, бисквит, цедра', qty: '1 стакан' },
        { name: 'Сало в шоколаде', desc: 'Солёное сало, бельгийский шоколад', qty: '1 сет' },
        { name: 'Шампанское', desc: 'Брют/розе, безлимит', qty: 'безлимит' },
        { name: 'Коктейльный бар', desc: 'Апероль, Мохито, Космополитен', qty: '1 бармен' },
        { name: 'Глинтвейн', desc: 'Красное вино, пряности', qty: 'безлимит' },
      ],
    },
  ],
  maslenitsa: [
    {
      name: 'Стандарт', price: '1 200 ₽/гость',
      desc: 'Масленичный фуршет: блины с начинками, самовар, сбитень.',
      items: [
        { name: 'Блины классические', desc: 'Тонкие блины со сметаной, мёдом, вареньем', qty: '3 шт/гость' },
        { name: 'Блины с красной икрой', desc: 'Тонкий блин, сливочное масло, икра лососёвая', qty: '1 шт/гость' },
        { name: 'Блины с сёмгой', desc: 'Слабосолёная сёмга, творожный сыр, укроп', qty: '1 шт/гость' },
        { name: 'Блины с грибами', desc: 'Жульен из шампиньонов и лисичек в блинном мешочке', qty: '1 шт/гость' },
        { name: 'Блины с мясом', desc: 'Томлёная говядина, лук, сметанный соус', qty: '1 шт/гость' },
        { name: 'Самовар (чай)', desc: 'Чёрный чай, травы, мёд из самовара', qty: 'безлимит' },
        { name: 'Морс клюквенный', desc: 'Домашний морс из клюквы с мятой', qty: 'безлимит' },
      ],
    },
    {
      name: 'Расширенный', price: '1 800 ₽/гость',
      desc: 'Масленица с размахом: блинный торт, сбитень, оладьи, народные игры.',
      items: [
        { name: 'Блины классические', desc: 'Со сметаной, мёдом, вареньем', qty: '4 шт/гость' },
        { name: 'Блины с красной икрой', desc: 'Икра лососёвая, сливочное масло', qty: '2 шт/гость' },
        { name: 'Блины с сёмгой', desc: 'Слабосолёная сёмга, творожный сыр', qty: '1 шт/гость' },
        { name: 'Блины с грибами', desc: 'Жульен из шампиньонов и лисичек', qty: '1 шт/гость' },
        { name: 'Блины с мясом', desc: 'Томлёная говядина, лук', qty: '1 шт/гость' },
        { name: 'Оладьи яблочные', desc: 'Пышные оладьи, карамелизированные яблоки', qty: '2 шт/гость' },
        { name: 'Блинный торт', desc: '10 слоёв с заварным кремом и ягодами', qty: '1 кусок' },
        { name: 'Самовар (чай)', desc: 'Чёрный чай, травы, мёд', qty: 'безлимит' },
        { name: 'Сбитень медовый', desc: 'Мёд, имбирь, пряности', qty: '2 стакана' },
        { name: 'Морс клюквенный', desc: 'Домашний, с мятой', qty: 'безлимит' },
      ],
    },
  ],
  bbq: [
    {
      name: 'Стандарт', price: '2 450 ₽/гость',
      desc: 'Гриль-фуршет: шашлыки, овощи, салаты, лимонады.',
      items: [
        { name: 'Шашлык из свинины', desc: 'Свиная шея в луковом маринаде, 200 г', qty: '1 порция' },
        { name: 'Шашлык из курицы', desc: 'Куриное бедро в аджике, 200 г', qty: '1 порция' },
        { name: 'Овощи гриль', desc: 'Баклажан, перец, цуккини, шампиньоны', qty: '1 порция' },
        { name: 'Картофель по-деревенски', desc: 'С розмарином и чесноком', qty: '1 порция' },
        { name: 'Кукуруза гриль', desc: 'С маслом и паприкой', qty: '1 шт/гость' },
        { name: 'Салат «Греческий»', desc: 'Помидоры, огурцы, фета, оливки', qty: '1 порция' },
        { name: 'Лимонад домашний', desc: 'Лимон, мята, содовая', qty: 'безлимит' },
      ],
    },
    {
      name: 'Расширенный', price: '3 950 ₽/гость',
      desc: 'Гриль-банкет: стейки, люля, рыба на гриле, мохито, десерты.',
      items: [
        { name: 'Шашлык из свинины', desc: 'Свиная шея, луковый маринад, 200 г', qty: '1 порция' },
        { name: 'Шашлык из курицы', desc: 'Бедро в аджике, 200 г', qty: '1 порция' },
        { name: 'Люля-кебаб из баранины', desc: 'Рубленая баранина с зеленью, 150 г', qty: '1 порция' },
        { name: 'Стейк из лосося', desc: 'Лосось на гриле с лимоном, 180 г', qty: '1 порция' },
        { name: 'Овощи гриль', desc: 'Баклажан, перец, цуккини, шампиньоны', qty: '1 порция' },
        { name: 'Картофель по-деревенски', desc: 'С розмарином и чесноком', qty: '1 порция' },
        { name: 'Кукуруза гриль', desc: 'С маслом и паприкой', qty: '1 шт/гость' },
        { name: 'Салат «Греческий»', desc: 'Помидоры, огурцы, фета, оливки', qty: '1 порция' },
        { name: 'Мохито 0%', desc: 'Лайм, мята, сахарный сироп', qty: 'безлимит' },
        { name: 'Лимонад домашний', desc: 'Лимон, мята, содовая', qty: 'безлимит' },
      ],
    },
  ],
};

interface Props {
  season: string;
  label: string;
  ctaFormat?: string;
}

export default function SeasonalPackages({ season, label, ctaFormat }: Props) {
  const pkgs = PKGS[season];
  if (!pkgs || pkgs.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-xl font-heading font-medium mb-1">Готовые пакеты: {label}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Выберите готовый пакет или{' '}
        <Link href={ctaFormat ? `/plan/constructor?format=${ctaFormat}` : '/plan/constructor'} className="text-gold-text underline underline-offset-2">
          соберите свой
        </Link>.
      </p>

      <div className="space-y-6">
        {pkgs.map((pkg, i) => (
          <PkgBlock key={i} pkg={pkg} />
        ))}
      </div>
    </section>
  );
}

function PkgBlock({ pkg }: { pkg: Pkg }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border-2 border-line bg-card overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading text-lg font-semibold">{pkg.name}</h3>
          <span className="text-lg font-bold text-gold-text shrink-0 ml-4">{pkg.price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{pkg.desc}</p>

        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-sm"
        >
          <span>{open ? 'Скрыть состав' : 'Показать состав'} ({pkg.items.length} позиций)</span>
          <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div className="mt-4 space-y-1.5">
            {pkg.items.map((item, j) => (
              <div key={j} className="py-1.5 border-b border-line/20 last:border-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-sm font-medium">{item.name}</span>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}