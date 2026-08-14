import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Блог — кейтеринг, советы, кейсы",
  description:
    "Статьи о кейтеринге: выбор формата, аллергены, свадебный банкет, сезонное меню, кофе-брейк. Практические советы от шеф-повара NiloV Catering с 2007 года.",
  alternates: { canonical: "/blog", languages: { ru: "/blog", "x-default": "/blog" } },
  openGraph: { url: "https://nilov-catering.vercel.app/blog" },
};

const ARTICLES = [
  {
    t: "Как организовать идеальный свадебный банкет: чек-лист",
    d: "15 января 2026",
    iso: "2026-01-15",
    slug: "svadebnyy-banquet-chek-list",
    desc: "Полный чек-лист для организации свадебного банкета: от выбора меню до финальной сервировки. Всё, что нужно знать молодожёнам.",
    words: 340,
    category: "Свадьба",
    image: "/images/real/wedding-banquet.jpg",
    featured: true,
  },
  {
    t: "Тренды фуршетного меню 2025 года",
    d: "8 января 2026",
    iso: "2026-01-08",
    slug: "trendy-furshet-2025",
    desc: "Мини-бургеры, крафтовые коктейли, edible flowers и другие тренды фуршета. Что подавать гостям в этом сезоне.",
    words: 260,
    category: "Тренды",
    image: "/images/real/canape-platter.jpg",
    featured: false,
  },
  {
    t: "Кейтеринг для офиса: как накормить коллектив вкусно",
    d: "20 декабря 2025",
    iso: "2025-12-20",
    slug: "office-catering-tips",
    desc: "Бизнес-ланчи, кофе-брейки, корпоративные ужины — как выбрать формат и не превысить бюджет.",
    words: 290,
    category: "B2B",
    image: "/images/real/corporate-buffet.jpg",
    featured: false,
  },
  {
    t: "Халяль кейтеринг: особенности и традиции",
    d: "10 декабря 2025",
    iso: "2025-12-10",
    slug: "halal-catering-traditions",
    desc: "Сертификация, разрешённые ингредиенты, особенности подготовки. Как мы соблюдаем халяль стандарты.",
    words: 230,
    category: "Халяль",
    image: "/images/menu-preview/halal-shashlik.jpg",
    featured: false,
  },
  {
    t: "Детский праздник под ключ: что включается",
    d: "28 ноября 2025",
    iso: "2025-11-28",
    slug: "detskiy-prazdnik-pod-klyuch",
    desc: "Детское меню, безопасные блюда, тематическое оформление. Полный гид по детскому кейтерингу.",
    words: 210,
    category: "Дети",
    image: "/images/menu-preview/kids-burger.jpg",
    featured: false,
  },
  {
    t: "Как выбрать формат кейтеринга: фуршет или банкет?",
    d: "10 июля 2026",
    iso: "2026-07-10",
    slug: "furshet-vs-banket",
    desc: "Разбор плюсов и минусов двух главных форматов. Когда фуршет выигрывает, а когда без банкета не обойтись.",
    words: 180,
    category: "Форматы",
    image: "/images/formats/furshet-hero.svg",
    featured: false,
  },
  {
    t: "14 аллергенов: почему маркировка важна для вашего события",
    d: "1 июля 2026",
    iso: "2026-07-01",
    slug: "allergeny-markirovka",
    desc: "Что требует ТР ТС 022/2011 и как мы защищаем гостей с пищевой непереносимостью.",
    words: 200,
    category: "Безопасность",
    image: "/images/dishes/buddha-bowl-01.jpg",
    featured: false,
  },
  {
    t: "Тренды кейтеринга 2025: что модно this season",
    d: "15 мая 2026",
    iso: "2026-05-15",
    slug: "trendy-katering-2025",
    desc: "Съедобные цветы, локальные ингредиенты, интерактивные станции и другие тренды сезона. Что заказывают в 2025 году.",
    words: 280,
    category: "Тренды",
    image: "/images/real/charcuterie.jpg",
    featured: false,
  },
  {
    t: "Как организовать детский праздник под ключ: чек-лист родителей",
    d: "20 апреля 2026",
    iso: "2026-04-20",
    slug: "detskiy-prazdnik-chek-list",
    desc: "От выбора тематики до безопасного меню. Полный чек-лист для родителей: как устроить незабываемый праздник без стресса.",
    words: 320,
    category: "Дети",
    image: "/images/real/dessert-table.jpg",
    featured: false,
  },
];

function readTime(words: number): string {
  return `${Math.max(1, Math.ceil(words / 200))} мин`;
}

const categoryColors: Record<string, string> = {
  Свадьба: "bg-rose-100 text-rose-700",
  Тренды: "bg-violet-100 text-violet-700",
  B2B: "bg-blue-100 text-blue-700",
  Халяль: "bg-emerald-100 text-emerald-700",
  Дети: "bg-amber-100 text-amber-700",
  Форматы: "bg-gold/20 text-gold-text",
  Безопасность: "bg-red-100 text-red-700",
};

// Responsive image sizes for blog (/* eslint-disable-line -- responsive sizes */)
const BLOG_FEATURED_SIZES =
  "(max-width: 768px) 100vw, 50vw"; /* eslint-disable-line -- image sizes */
const BLOG_CARD_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"; /* eslint-disable-line -- image sizes */

export default function BlogPage() {
  const featuredArticle = ARTICLES.find((a) => a.featured);
  const regularArticles = ARTICLES.filter((a) => !a.featured);

  return (
    <main id="main" className="pt-24 pb-20">
      <div className="container-site max-w-6xl">
        <Breadcrumbs />

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-heading mb-3 text-3xl font-medium md:text-4xl lg:text-5xl">
            Блог NiloV Catering
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Советы, кейсы и сезонные идеи от шеф-повара. Практический опыт с 2007 года.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <Link
            href={`/blog/${featuredArticle.slug}`}
            className="group border-line bg-card hover:border-gold-text hover:shadow-gold/10 mb-10 block overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.t}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={BLOG_FEATURED_SIZES}
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[featuredArticle.category] || "bg-accent text-accent-foreground"}`}
                  >
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
                  <time dateTime={featuredArticle.iso}>{featuredArticle.d}</time>
                  <span>·</span>
                  <span>{readTime(featuredArticle.words)} чтения</span>
                </div>
                <h2 className="font-heading group-hover:text-gold-text mb-3 text-2xl font-medium transition-colors md:text-3xl">
                  {featuredArticle.t}
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{featuredArticle.desc}</p>
                <span className="text-gold-text inline-flex items-center gap-2 font-semibold transition-all group-hover:gap-3">
                  Читать статью
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regularArticles.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group border-line bg-card hover:border-gold-text hover:shadow-gold/10 overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.t}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={BLOG_CARD_SIZES}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${categoryColors[a.category] || "bg-accent text-accent-foreground"}`}
                  >
                    {a.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                  <time dateTime={a.iso}>{a.d}</time>
                  <span>·</span>
                  <span>{readTime(a.words)}</span>
                </div>
                <h3 className="font-heading group-hover:text-gold-text mb-2 line-clamp-2 text-lg font-medium transition-colors">
                  {a.t}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="from-primary/5 via-accent to-primary/10 border-gold/20 mt-16 rounded-2xl border bg-gradient-to-br p-8 text-center md:p-12">
          <h2 className="font-heading mb-3 text-2xl font-medium md:text-3xl">
            Подпишитесь на новости
          </h2>
          <p className="text-muted-foreground mx-auto mb-6 max-w-md">
            Получайте свежие статьи о кейтеринге, сезонные меню и эксклюзивные предложения первыми.
          </p>
          <Link
            href="/subscribe"
            className="bg-primary text-primary-foreground hover:bg-primary/90 touch-target shadow-primary/20 inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold shadow-lg transition-colors"
          >
            Подписаться на рассылку
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
