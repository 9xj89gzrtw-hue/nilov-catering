#!/usr/bin/env python3
"""Generate remaining missing pages."""
import os

BASE = "/home/z/my-project/nilov-catering"

def write(path, content):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as f:
        f.write(content)
    print(f"  OK: {path}")

write("app/faq/page.tsx", '''import { faqItems } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { AnimatedSection } from "@/components/common/AnimatedSection";
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
            <Accordion type="single" collapsible className="space-y-3">
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
''')

write("app/pricing/page.tsx", '''import { pricingPackages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Цены", href: "/pricing" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Пакеты и цены</h1>
          <p className="text-primary-foreground/70 text-lg">Выберите подходящий пакет для вашего мероприятия</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPackages.map((pkg, i) => (
              <AnimatedSection key={pkg.id} delay={i * 0.15}>
                <Card className={`h-full flex flex-col ${pkg.isPopular ? "border-accent border-2 relative" : ""}`}>
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-accent text-accent-foreground">Популярный выбор</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-heading text-2xl">{pkg.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1">
                    <p className="text-3xl font-bold text-accent mb-6">{formatPrice(pkg.pricePerPerson)}<span className="text-base font-normal text-muted-foreground">/чел</span></p>
                    <ul className="space-y-3 text-left">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/quote" className="w-full">
                      <Button className="w-full" variant={pkg.isPopular ? "default" : "outline"}>Заказать</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
''')

write("app/team/page.tsx", '''import { teamMembers } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import Image from "next/image";

export default function TeamPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Команда", href: "/team" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Наша команда</h1>
          <p className="text-primary-foreground/70 text-lg">Профессионалы, которые делают ваше мероприятие незабываемым</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">
                    <Image src={member.photo} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold">{member.name}</h3>
                  <p className="text-accent text-sm font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.specialization}</p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
''')

write("app/blog/page.tsx", '''import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import Image from "next/image";

export default function BlogPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Блог", href: "/blog" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Блог</h1>
          <p className="text-primary-foreground/70 text-lg">Советы, тренды и идеи для вашего мероприятия</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h2 className="font-heading text-xl font-semibold group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
''')

write("app/blog/[slug]/page.tsx", '''import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Image from "next/image";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const related = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 2);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Блог", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">{post.title}</h1>
          <p className="text-primary-foreground/70 mt-4">{post.date}</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-10">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="font-heading text-2xl font-semibold mb-6">Похожие статьи</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="group block p-4 bg-card border border-border rounded-lg hover:border-accent transition-colors">
                    <h3 className="font-heading text-lg font-semibold group-hover:text-accent">{r.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
''')

write("app/privacy/page.tsx", '''import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Политика конфиденциальности", href: "/privacy" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Политика конфиденциальности</h1>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">1. Общие положения</h2>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта Nilov Catering (odaeda.ru), принадлежащего ООО &quot;Нилов Кейтеринг&quot;. Политика разработана в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ &quot;О персональных данных&quot;. Используя сайт, вы подтверждаете согласие с настоящей Политикой.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">2. Собираемые данные</h2>
            <p>Оператор собирает следующие категории персональных данных: имя и фамилия, номер телефона, адрес электронной почты, IP-адрес, данные о поведении на сайте (cookies, страницы посещений, время проведения). Данные собираются при заполнении форм заявки, подписки на рассылку и автоматически с помощью сервисов аналитики.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">3. Цели обработки</h2>
            <p>Персональные данные обрабатываются в следующих целях: обработка заявок на кейтеринговое обслуживание, связь с клиентами для уточнения деталей мероприятий, отправка информационных материалов по подписке, улучшение качества сервиса, анализ посещаемости и поведения на сайте, соблюдение требований законодательства Российской Федерации.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">4. Юридические основания</h2>
            <p>Обработка персональных данных осуществляется на основании: согласия субъекта персональных данных (ст. 6 п. 1 пп. 1 ФЗ-152), исполнения договора (ст. 6 п. 1 пп. 5 ФЗ-152), законных интересов Оператора (ст. 6 п. 1 пп. 7 ФЗ-152).</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">5. Третьи лица</h2>
            <p>Оператор передаёт персональные данные следующим третьим лицам: Яндекс.Метрика (для аналитики посещаемости), хостинг-провайдер (для обеспечения работоспособности сайта). Передача данных иным третьим лицам осуществляется только с согласия субъекта персональных данных.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">6. Сроки хранения</h2>
            <p>Персональные данные хранятся в течение 3 лет с момента последнего взаимодействия с клиентом, если иное не предусмотрено договором. Данные форм аналитики хранятся в течение 26 месяцев. По истечении сроков хранения данные уничтожаются.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">7. Права субъекта данных</h2>
            <p>Вы имеете право: на доступ к своим персональным данным, на их исправление, на удаление, на отзыв согласия на обработку, на обращение в уполномоченный орган по защите прав субъектов персональных данных. Для реализации прав направьте запрос на info@odaeda.ru.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">8. Контакты</h2>
            <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь: ООО &quot;Нилов Кейтеринг&quot;, ИНН 7712345678, ОГРН 1234567890123, адрес: г. Москва, ул. Тверская, д. 15, офис 301, email: info@odaeda.ru, телефон: +7 (495) 123-45-67.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
''')

write("app/terms/page.tsx", '''import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Условия использования", href: "/terms" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">Условия использования</h1>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <article className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">1. Общие положения</h2>
            <p>Настоящие Условия использования регулируют отношения между ООО &quot;Нилов Кейтеринг&quot; (Исполнитель) и пользователями сайта odaeda.ru (Пользователь). Используя сайт, Пользователь подтверждает своё согласие с настоящими Условиями.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">2. Услуги</h2>
            <p>Сайт предоставляет информацию об услугах кейтеринга, меню, ценах и позволяет оформить заявку на обслуживание мероприятия. Окончательная стоимость и условия определяются в индивидуальном договоре.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">3. Бронирование и оплата</h2>
            <p>Бронирование осуществляется не менее чем за 5 рабочих дней до мероприятия. Предоплата составляет 50% от рассчитанной стоимости. Оставшаяся сумма оплачивается не позднее дня мероприятия.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">4. Отмены и возвраты</h2>
            <p>При отмене более чем за 72 часа до мероприятия предоплата возвращается в полном объёме. При отмене менее чем за 72 часа предоплата не возвращается.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">5. Ответственность</h2>
            <p>Исполнитель несёт ответственность за качество предоставляемых услуг в соответствии с действующим законодательством РФ. Информация на сайте носит информационный характер и не является публичной офертой.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">6. Интеллектуальная собственность</h2>
            <p>Все материалы, размещённые на сайте (тексты, изображения, дизайн), являются интеллектуальной собственностью ООО &quot;Нилов Кейтеринг&quot; или используются на законных основаниях. Копирование без разрешения запрещено.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">7. Внесение изменений</h2>
            <p>Исполнитель оставляет за собой право вносить изменения в настоящие Условия без предварительного уведомления Пользователя. Актуальная версия всегда доступна на данной странице.</p>
          </section>
          <section>
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">8. Контакты</h2>
            <p>По всем вопросам обращайтесь: email: info@odaeda.ru, телефон: +7 (495) 123-45-67, адрес: г. Москва, ул. Тверская, д. 15, офис 301.</p>
          </section>
        </div>
      </article>
    </main>
  );
}
''')

write("app/quote/page.tsx", '''"use client";

import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import QuoteForm from "@/components/quote/QuoteForm";

export default function QuotePage() {
  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Заказать расчёт", href: "/quote" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Заказать расчёт</h1>
          <p className="text-primary-foreground/70 text-lg">Заполните форму и мы подготовим индивидуальное предложение</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
''')

# API Routes
write("app/api/quote/route.ts", '''import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Quote request received:", body);
    return NextResponse.json({ success: true, message: "Заявка получена" });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка обработки" }, { status: 400 });
  }
}
''')

write("app/api/contact/route.ts", '''import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(11),
  eventType: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 });
    }
    console.log("Contact form:", result.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка" }, { status: 400 });
  }
}
''')

write("app/api/newsletter/route.ts", '''import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = z.string().email().safeParse(body.email);
    if (!result.success) {
      return NextResponse.json({ success: false, message: "Некорректный email" }, { status: 400 });
    }
    console.log("Newsletter:", body.email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, message: "Ошибка" }, { status: 400 });
  }
}
''')

write("app/sitemap.ts", '''import { MetadataRoute } from "next";

const BASE_URL = "https://odaeda.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "", "/about", "/services", "/services/weddings", "/services/corporate",
    "/services/private", "/menu", "/gallery", "/testimonials", "/contact",
    "/quote", "/faq", "/pricing", "/blog", "/team", "/privacy", "/terms",
  ];
  return pages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
''')

write("app/robots.ts", '''import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/" },
    sitemap: "https://odaeda.ru/sitemap.xml",
  };
}
''')

print("All remaining files created!")