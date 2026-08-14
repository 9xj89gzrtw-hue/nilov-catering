# 📝 CODE PATTERNS - Готовые решения типичных задач

> **Копируйте, адаптируйте, используйте!** Не изобретайте велосипед.

---

## 📋 ОГЛАВЛЕНИЕ

1. [Страница (Page Template)](#страница-page-template)
2. [Hero Section](#hero-section)
3. [Карточки (Cards)](#карточки-cards)
4. [Формы (Forms)](#формы-forms)
5. [Галерея (Gallery)](#галерея-gallery)
6. [FAQ / Аккордеон](#faq--аккордеон)
7. [Отзывы (Reviews)](#отзывы-reviews)
8. [Навигация (Navigation)](#навигация-navigation)
9. [API Routes](#api-routes)
10. [Хуки (Custom Hooks)](#хуки-custom-hooks)

---

## 📄 СТРАНИЦА (Page Template)

```tsx
// app/[page-name]/page.tsx
import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InViewWrapper, scrollAnimations } from "@/components/ui/InViewWrapper";
import { generateBreadcrumbSchema } from "@/lib/schema";

// 1. Metadata (обязательно!)
export const metadata: Metadata = {
  title: "Название страницы | Nilov Catering",
  description: "Описание 150-300 символов для SEO",
  openGraph: {
    title: "Название страницы | Nilov Catering",
    description: "Описание для соцсетей",
    images: ["/images/og-image.jpg"],
  },
};

// 2. Schema.org (для SEO)
const jsonLd = generateBreadcrumbSchema([
  { name: "Главная", url: "https://nilov-catering.ru" },
  { name: "Страница", url: "https://nilov-catering.ru/page" },
]);

// 3. Компонент страницы
export default function PageName() {
  return (
    <ErrorBoundary>
      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-[#1a1816] py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <InViewWrapper
              inViewClassName="opacity-100 translate-y-0 transition-all duration-700"
              outOfViewClassName="opacity-0 translate-y-10"
            >
              <h1 className="font-serif text-4xl text-white md:text-6xl">Заголовок H1</h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-300">Подзаголовок или описание</p>
            </InViewWrapper>
          </div>
        </section>

        {/* Content Sections */}
        <ContentSection />

        {/* CTA Section */}
        <CTASection />
      </main>
    </ErrorBoundary>
  );
}
```

---

## 🎯 HERO SECTION

### С фоновым изображением

```tsx
function HeroWithImage() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/catering/finedining-01.avif')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1816]/95 via-[#1a1816]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <InViewWrapper>
          <span className="mb-6 inline-block rounded-full bg-[#d4a574]/20 px-4 py-2 text-sm font-medium text-[#d4a574]">
            Премиальный кейтеринг в Санкт-Петербурге
          </span>

          <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
            Создаём <span className="text-[#d4a574]">незабываемые</span> мероприятия
          </h1>

          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-gray-300">
            Более 15 лет опыта организации банкетов, фуршетов и корпоративных мероприятий любого
            масштаба.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <button className="group rounded-xl bg-gradient-to-r from-[#d4a574] to-[#c9a227] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,165,116,0.4)]">
              Рассчитать стоимость
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>

            <button className="rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10">
              Смотреть портфолио
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid max-w-lg grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-[#d4a574]">15+</p>
              <p className="mt-1 text-sm text-gray-400">лет опыта</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#d4a574]">2000+</p>
              <p className="mt-1 text-sm text-gray-400">мероприятий</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#d4a574]">98%</p>
              <p className="mt-1 text-sm text-gray-400">довольных клиентов</p>
            </div>
          </div>
        </InViewWrapper>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30 pt-2">
          <div className="h-3 w-1 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
```

### Минимальный Hero

```tsx
function MinimalHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-[#faf9f7] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl text-[#1a1816] md:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-[#9a938a]">{subtitle}</p>}
      </div>
    </section>
  );
}
```

---

## 🃏 КАРТОЧКИ (Cards)

### Услуг / Преимуществ

```tsx
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function ServiceCard({ icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <InViewWrapper
      inViewClassName="opacity-100 translate-y-0 transition-all duration-500"
      outOfViewClassName="opacity-0 translate-y-8"
      className={`delay-${delay}`}
    >
      <div className="group rounded-2xl border border-[#e8e2d9] bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a574]/30 hover:shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f5f0e8] text-2xl transition-colors duration-300 group-hover:bg-[#d4a574] group-hover:text-white">
          {icon}
        </div>

        <h3 className="mt-6 text-xl font-semibold text-[#1a1816]">{title}</h3>
        <p className="mt-3 leading-relaxed text-[#9a938a]">{description}</p>

        <a
          href="#"
          className="mt-6 inline-flex items-center font-medium text-[#d4a574] underline-offset-4 group-hover:underline"
        >
          Подробнее
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </InViewWrapper>
  );
}

// Использование:
<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
  <ServiceCard icon="🍽️" title="Банкеты" description="Полный цикл организации" delay={0} />
  <ServiceCard icon="🥂" title="Фуршеты" description="Выездное обслуживание" delay={100} />
  <ServiceCard icon="🏢" title="Корпоративы" description="Бизнес-мероприятия" delay={200} />
</div>;
```

### Карточка меню (блюда)

```tsx
interface DishCardProps {
  image: string;
  name: string;
  description: string;
  weight?: string;
  price?: number;
}

function DishCard({ image, name, description, weight, price }: DishCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-[#e8e2d9] bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-[#1a1816] transition-colors group-hover:text-[#d4a574]">
            {name}
          </h3>
          {(weight || price) && (
            <div className="shrink-0 text-right">
              {weight && <p className="text-xs text-[#9a938a]">{weight}</p>}
              {price && <p className="font-semibold text-[#d4a574]">{price}₽</p>}
            </div>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-[#9a938a]">{description}</p>
      </div>
    </article>
  );
}
```

---

## 📝 ФОРМЫ (Forms)

### Форма заявки (React Hook Form + Zod)

```tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Schema валидации
const contactSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, "Некорректный телефон"),
  email: z.string().email("Некорректный email").optional().or(z.literal("")),
  guests: z.string().optional(),
  eventType: z.string().optional(),
  message: z.string().max(1000, "Максимум 1000 символов").optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      guests: "",
      eventType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Ошибка отправки");

      toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время");
      reset();
    } catch (error) {
      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name & Phone - 2 колонки на десктопе */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#1a1816]">
            Ваше имя *
          </label>
          <input
            id="name"
            {...register("name")}
            placeholder="Как к вам обращаться?"
            className={`w-full rounded-xl border px-4 py-3 ${
              errors.name ? "border-red-500" : "border-[#e8e2d9]"
            } outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#1a1816]">
            Телефон *
          </label>
          <input
            id="phone"
            {...register("phone")}
            type="tel"
            placeholder="+7 (___) ___-__-__"
            className={`w-full rounded-xl border px-4 py-3 ${
              errors.phone ? "border-red-500" : "border-[#e8e2d9]"
            } outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20`}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#1a1816]">
          Email (необязательно)
        </label>
        <input
          id="email"
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          className="w-full rounded-xl border border-[#e8e2d9] px-4 py-3 outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20"
        />
      </div>

      {/* Event Type & Guests */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="eventType" className="mb-2 block text-sm font-medium text-[#1a1816]">
            Тип мероприятия
          </label>
          <select
            id="eventType"
            {...register("eventType")}
            className="w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3 outline-none focus:border-[#d4a574]"
          >
            <option value="">Выберите...</option>
            <option value="wedding">Свадьба</option>
            <option value="corporate">Корпоратив</option>
            <option value="birthday">День рождения</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div>
          <label htmlFor="guests" className="mb-2 block text-sm font-medium text-[#1a1816]">
            Количество гостей
          </label>
          <select
            id="guests"
            {...register("guests")}
            className="w-full rounded-xl border border-[#e8e2d9] bg-white px-4 py-3 outline-none focus:border-[#d4a574]"
          >
            <option value="">Выберите...</option>
            <option value="20">до 20 гостей</option>
            <option value="50">20-50 гостей</option>
            <option value="100">50-100 гостей</option>
            <option value="200">100+ гостей</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#1a1816]">
          Дополнительная информация
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={4}
          placeholder="Расскажите о вашем мероприятии..."
          className="w-full resize-none rounded-xl border border-[#e8e2d9] px-4 py-3 outline-none transition focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/20"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-[#d4a574] to-[#c9a227] py-4 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,165,116,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Отправка..." : "Отправить заявку"}
      </button>
    </form>
  );
}
```

---

## 🖼️ ГАЛЕРЕЯ (Gallery)

### Masonry Gallery

```tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

function MasonryGallery({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((image, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors duration-300 group-hover:bg-black/30 group-hover:opacity-100">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex >= 0 && (
        <ImageLightbox
          images={images.map((img) => ({ src: img.src, alt: img.alt }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </>
  );
}
```

---

## ❓ FAQ / АККОРДЕОН

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

const faqs = [
  {
    question: "Сколько стоит организация банкета?",
    answer:
      "Стоимость зависит от количества гостей, меню и уровня сервиса. Банкет от 3000₽ за человека, фуршет от 1500₽. Точный расчёт после консультации.",
  },
  {
    question: "Выезжаете ли вы за пределы Санкт-Петербурга?",
    answer:
      "Да, мы организуем мероприятия в Ленинградской области и других регионах. Выезд до 100км включён в стоимость, далее — по договорённости.",
  },
  // ... больше FAQ
];

export function FAQSection() {
  return (
    <section className="bg-[#faf9f7] py-24" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <InViewWrapper>
          <h2 className="mb-4 text-center font-serif text-4xl text-[#1a1816]">
            Часто задаваемые вопросы
          </h2>
          <p className="mb-12 text-center text-[#9a938a]">
            Не нашли ответ? Свяжитесь с нами напрямую!
          </p>
        </InViewWrapper>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              containerClassName="bg-white rounded-xl shadow-sm border border-[#e8e2d9]"
            >
              <AccordionTrigger className="px-6 py-5 text-left text-base font-medium text-[#1a1816]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 leading-relaxed text-[#9a938a]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

---

## ⭐ ОТЗЫВЫ (Reviews)

```tsx
"use client";
import Image from "next/image";
import { useState } from "react";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

interface Review {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  event: string;
  date: string;
}

function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 }, [
    emblaCarouselAutoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center font-serif text-4xl text-[#1a1816]">
          Отзывы наших клиентов
        </h2>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-0 flex-[0_0_100%] pl-6 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <article className="flex h-full flex-col rounded-2xl border border-[#e8e2d9] bg-white p-8 shadow-md">
                    {/* Stars */}
                    <div className="flex gap-1 text-[#c9a227]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635L15.878 18.09z" />
                        </svg>
                      ))}
                    </div>

                    {/* Text */}
                    <blockquote className="mt-4 flex-1 italic leading-relaxed text-[#4a4540]">
                      "{review.text}"
                    </blockquote>

                    {/* Author */}
                    <div className="mt-6 flex items-center gap-4 border-t border-[#e8e2d9] pt-6">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-[#1a1816]">{review.name}</p>
                        <p className="text-sm text-[#9a938a]">
                          {review.event}, {review.date}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 🧭 НАВИГАЦИЯ (Navigation)

### Header с sticky навигацией

```tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileDrawer from "@/components/ui/MobileDrawer";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/menu", label: "Меню" },
  { href: "/events", label: "Мероприятия" },
  { href: "/gallery", label: "Галерея" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl font-bold text-[#1a1816]">
            Nilov<span className="text-[#d4a574]">Catering</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#d4a574] ${
                  pathname === link.href ? "text-[#d4a574]" : "text-[#4a4540]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-lg bg-[#d4a574] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c9a227]"
            >
              Заказать звонок
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="p-2 lg:hidden" onClick={() => setMobileMenuOpen(true)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileDrawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="right">
        <nav className="space-y-4 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium text-[#1a1816] hover:text-[#d4a574]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 block w-full rounded-lg bg-[#d4a574] py-3 text-center font-semibold text-white"
          >
            Заказать звонок
          </Link>
        </nav>
      </MobileDrawer>
    </header>
  );
}
```

---

## 🔌 API ROUTES

### Contact Form API

```tsx
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import Zod from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/),
  email: z.string().email().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Здесь: отправить email, сохранить в БД и т.д.
    console.log("New lead:", data);

    return NextResponse.json({ success: true, message: "Заявка получена" });
  } catch (error) {
    if (error instanceof Zod.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { success: false, message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
```

---

## 🪝 ХУКИ (Custom Hooks)

### useDebouncedValue

```tsx
// hooks/useDebouncedValue.ts
import { useState, useEffect } from "react";

export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Использование:
function SearchInput() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);

  useEffect(() => {
    // Выполняется только через 500мс после остановки ввода
    if (debouncedSearch) {
      fetch(`/api/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

### useMediaQuery

```tsx
// hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Использование:
function ResponsiveComponent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

---

## ✅ ЗАПОМНИТЕ!

1. **Копируйте паттерны** — не пишите с нуля
2. **Адаптируйте** — подставьте свои данные
3. **Следуйте структуре** — metadata → ErrorBoundary → main → sections
4. **Используйте компоненты** — из `@/components/ui/`
5. **Добавляйте анимации** — InViewWrapper на все секции
