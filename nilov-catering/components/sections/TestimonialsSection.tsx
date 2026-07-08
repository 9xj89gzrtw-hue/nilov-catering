"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import AnimatedSection from "@/components/common/AnimatedSection";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
              Отзывы
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Что говорят наши клиенты
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Carousel
            plugins={[Autoplay({ delay: 5000 })]}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full border-border">
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? "fill-accent text-accent"
                                : "text-border"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                        &laquo;{testimonial.text}&raquo;
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            placeholder="empty"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.event}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  );
}