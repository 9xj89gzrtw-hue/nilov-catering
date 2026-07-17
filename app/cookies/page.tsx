import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
export const metadata: Metadata = { title: "Cookie-политика" };
export default function CookiesPage() {
  return (<><div className="pt-20 md:pt-24 pb-4"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><Breadcrumbs items={[{ label: "Cookie" }]} /></div></div>
  <section className="py-12 bg-background"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
    <h1 className="font-heading text-4xl text-cream mb-8">Cookie-политика</h1>
    <h2 className="text-gold text-xl mt-8 mb-3">Типы cookie</h2><p className="text-cream-muted">Необходимые (работа сайта), аналитические (Яндекс.Метрика).</p>
    <h2 className="text-gold text-xl mt-8 mb-3">Управление</h2><p className="text-cream-muted">Управление cookie через баннер при первом визите.</p>
    <h2 className="text-gold text-xl mt-8 mb-3">Срок хранения</h2><p className="text-cream-muted">1 год с момента последнего визита.</p>
    <h2 className="text-gold text-xl mt-8 mb-3">Третьи стороны</h2><p className="text-cream-muted">Яндекс.Метрика (аналитика), ЮKassa (платежи).</p>
  </div></section></>);
}
