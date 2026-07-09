"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AnimatedSection from "@/components/common/AnimatedSection";
import { testimonials } from "@/lib/data";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-10 right-10 text-accent/5">
        <Quote className="w-64 h-64" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Отзывы
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Что говорят <span className="gradient-text">наши клиенты</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              98% клиентов рекомендуют нас друзьям — это главная метрика нашего качества
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Carousel
            plugins={[Autoplay({ delay: 5000 })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, idx) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Card className="h-full border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 bg-card/80 backdrop-blur-sm group overflow-hidden relative">
                      {/* Quote decoration */}
                      <div className="absolute top-4 right-4 text-accent/10 group-hover:text-accent/20 transition-colors duration-500">
                        <Quote className="w-10 h-10" />
                      </div>

                      <CardContent className="p-6 flex flex-col relative">
                        {/* Stars */}
                        <div className="flex gap-0.5 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.1 + i * 0.05 }}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? "fill-accent text-accent"
                                    : "text-border"
                                }`}
                              />
                            </motion.div>
                          ))}
                        </div>

                        {/* Quote text */}
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 relative z-10">
                          &laquo;{testimonial.text}&raquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <motion.div
                            className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-accent/20"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Image
                              src={testimonial.avatar}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              placeholder="empty"
                            />
                          </motion.div>
                          <div>
                            <p className="text-sm font-semibold">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.event}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>

        {/* Trust indicator */}
        <AnimatedSection delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-3 text-muted-foreground text-sm">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t) => (
                <div key={t.id} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden relative">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" placeholder="empty" />
                </div>
              ))}
            </div>
            <span className="text-muted-foreground">
              <span className="font-bold text-foreground">3000+</span> довольных клиентов
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}