import { stats } from '@/lib/data';
import AnimatedCounter from '@/components/effects/AnimatedCounter';

export default function SocialProofBar() {
  return (
    <section id="social-proof" className="relative border-y border-border bg-muted py-12 md:py-16" aria-label="Наша статистика">
      {/* Gold line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4 md:px-8 group">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-cream block"
              />
              <p className="mt-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream-muted font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Gold line bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}