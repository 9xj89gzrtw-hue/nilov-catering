import { faqItems } from "@/lib/data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Частые вопросы</h1>
          <p className="text-primary-foreground/70 text-lg">Ответы на самые популярные вопросы о нашем кейтеринге</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Accordion className="space-y-3">
              {faqItems.map((item, i) => (
                <AccordionItem key={item.id} value={`item-${i + 1}`} className="bg-card border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-heading text-lg font-semibold hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
