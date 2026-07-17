import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
export const metadata: Metadata = { title: "Публичная оферта" };
export default function OfferPage() {
  return (<><div className="pt-20 md:pt-24 pb-4"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><Breadcrumbs items={[{ label: "Оферта" }]} /></div></div>
  <section className="py-12 bg-background"><div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
    <h1 className="font-heading text-4xl text-cream mb-8">Публичная оферта</h1>
    <h2 className="text-gold text-xl mt-8 mb-3">1. Предмет</h2><p className="text-cream-muted">ООО «Интерфуд» оказывает кейтеринговые услуги: фуршет, банкет, кофе-брейк, выезд шефа, сомелье на дом.</p>
    <h2 className="text-gold text-xl mt-8 mb-3">2. Заказ</h2><p className="text-cream-muted">Заказ оформляется через сайт, по телефону +7 (812) 919-59-11 или WhatsApp.</p>
    <h2 className="text-gold text-xl mt-8 mb-3">3. Оплата</h2><p className="text-cream-muted">Депозит 30% при оформлении. Доплата 70% после мероприятия. Оплата: ЮKassa (СБП, карта, МИР), безналичный расчёт (B2B).</p>
    <h2 className="text-gold text-xl mt-8 mb-3">4. Отмена</h2><p className="text-cream-muted">За 7+ дней — возврат 100%. За 3-7 дней — удержание 30%. Менее 3 дней — удержание 50%.</p>
    <h2 className="text-gold text-xl mt-8 mb-3">5. Ответственность</h2><p className="text-cream-muted">При срыве по вине NiloV — возврат 100% + компенсация 10%.</p>
    <h2 className="text-gold text-xl mt-8 mb-3">6. Форс-мажор</h2><p className="text-cream-muted">Стороны освобождаются от ответственности при обстоятельствах непреодолимой силы.</p>
  </div></section></>);
}
