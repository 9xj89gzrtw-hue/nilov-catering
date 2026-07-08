"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Briefcase, PartyPopper, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/common/AnimatedSection";
import { motion } from "framer-motion";

const serviceCards = [
  {
    icon: Heart,
    title: "Свадьбы",
    description: "Безупречный кейтеринг для самого важного дня. От канапе до многосоставного банкета с авторскими блюдами.",
    href: "/services/weddings",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    icon: Briefcase,
    title: "Корпоративы",
    description: "Организация питания для деловых мероприятий и конференций.",
    href: "/services/corporate",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    span: "",
    featured: false,
  },
  {
    icon: PartyPopper,
    title: "Частные мероприятия",
    description: "Дни рождения, юбилеи и семейные праздники.",
    href: "/services/private",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    span: "",
    featured: false,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Наши услуги
            </motion.div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Кейтеринг для <span className="text-accent">любого повода</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base">
              Создаём гастрономические впечатления для мероприятий любого масштаба и формата
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {serviceCards.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.href} delay={i * 0.15}>
                <Link href={service.href}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className={`h-full overflow-hidden border-border hover:border-accent/50 hover:shadow-xl transition-all duration-500 cursor-pointer group ${service.span}`}>
                      <div className={`relative ${service.featured ? "aspect-[4/3] md:aspect-auto md:h-64" : "aspect-[16/10]"} overflow-hidden`}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          placeholder="empty"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-accent/90 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-white/80 text-sm hidden md:block">
                            {service.description}
                          </p>
                          <motion.div
                            className="flex items-center gap-1 text-accent text-sm font-medium mt-3"
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            Подробнее <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        </div>
                      </div>
                      {/* Mobile-only description */}
                      <CardContent className="p-4 md:hidden">
                        <p className="text-muted-foreground text-sm">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}