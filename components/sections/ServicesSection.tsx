"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Briefcase, PartyPopper, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedSection from "@/components/common/AnimatedSection";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, MouseEvent } from "react";

const serviceCards = [
  {
    icon: Heart,
    title: "Свадьбы",
    description: "Безупречный кейтеринг для самого важного дня. От канапе до многосоставного банкета с авторскими блюдами шеф-повара Николая Нилова. Мы создаём гастрономические истории, которые запоминаются навсегда.",
    href: "/services/weddings",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&h=400&fit=crop",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
    stats: "120+ свадеб в сезон",
  },
  {
    icon: Briefcase,
    title: "Корпоративы",
    description: "Организация питания для деловых мероприятий, конференций и пресс-конференций. Фуршеты, кофе-брейки и банкеты для команд от 20 до 2000 человек.",
    href: "/services/corporate",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    span: "",
    featured: false,
    stats: "Газпром, Сбербанк, Яндекс",
  },
  {
    icon: PartyPopper,
    title: "Частные мероприятия",
    description: "Дни рождения, юбилеи и семейные праздники. Создаём атмосферу уюта и праздника с индивидуальным подходом к каждому гостю.",
    href: "/services/private",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    span: "",
    featured: false,
    stats: "500+ частных вечеров",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.innerWidth < 768) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,120,42,0.03),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(218,175,92,0.03),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Кейтеринг для <span className="gradient-text">любого повода</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              12 лет опыта в создании гастрономических впечатлений для мероприятий
              любого масштаба и формата
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid layout with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 perspective-1000">
          {serviceCards.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimatedSection key={service.href} delay={i * 0.15}>
                <Link href={service.href} className="block h-full">
                  <TiltCard className="h-full">
                    <Card className={`h-full overflow-hidden border-border/50 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 cursor-pointer group ${service.span} bg-card/80 backdrop-blur-sm`}>
                      <div className={`relative ${service.featured ? "aspect-[4/3] md:aspect-auto md:h-72" : "aspect-[16/10]"} overflow-hidden img-zoom`}>
                        <div className="absolute inset-0">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            placeholder="empty"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Glassmorphism overlay on hover */}
                        <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6" style={{ transform: "translateZ(20px)" }}>
                          <div className="flex items-center gap-2.5 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-accent/90 flex items-center justify-center shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-white">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-white/80 text-sm hidden md:block leading-relaxed mb-3">
                            {service.description}
                          </p>
                          <p className="text-white/50 text-xs hidden md:block mb-3">
                            {service.stats}
                          </p>
                          <motion.div
                            className="inline-flex items-center gap-1.5 text-accent text-sm font-medium bg-accent/10 px-3 py-1 rounded-full group-hover:bg-accent/20 transition-colors duration-300"
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            Подробнее <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                          </motion.div>
                        </div>
                      </div>
                      {/* Mobile-only description */}
                      <CardContent className="p-4 md:hidden">
                        <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                        <p className="text-xs text-accent/70 mt-2 font-medium">{service.stats}</p>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}