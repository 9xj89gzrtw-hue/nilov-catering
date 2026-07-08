import { stats } from '@/lib/data';

export default function SocialProofBar() {
  return (
    <section id="social-proof" className="border-y border-border bg-muted py-10 md:py-12" aria-label="Наша статистика">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4 md:px-8">
              <span className="font-heading text-4xl md:text-5xl font-semibold text-cream">
                {stat.value.toLocaleString('ru-RU')}
                <span className="text-gold">{stat.suffix}</span>
              </span>
              <p className="mt-2 text-xs sm:text-sm uppercase tracking-wider text-cream-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}