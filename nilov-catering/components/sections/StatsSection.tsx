"use client";

import { Calendar, PartyPopper, Users, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CountUpNumber from "@/components/common/CountUpNumber";
import AnimatedSection from "@/components/common/AnimatedSection";
import { stats } from "@/lib/data";

const statIcons = [Calendar, PartyPopper, Users, Star];

export default function StatsSection() {
  return (
    <section className="bg-primary py-16 md:py-20 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 mb-3 group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <CountUpNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                  />
                  {i < stats.length - 1 && (
                    <Separator className="mt-6 bg-primary-foreground/10 md:hidden" />
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}