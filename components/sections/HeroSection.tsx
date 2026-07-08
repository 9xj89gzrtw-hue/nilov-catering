'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Главный экран">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-[slowZoom_30s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')" }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        {/* Gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold font-medium mb-6">
          Премиальный кейтеринг в Санкт-Петербурге
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold text-cream leading-[1.1] mb-6">
          Гастрономия, которая
          <br />
          <span className="text-gold">создаёт впечатления</span>
        </h1>
        <p className="text-base sm:text-lg text-cream/60 max-w-xl mx-auto mb-10 leading-relaxed">
          Авторское меню, безупречный сервис и внимание к каждой детали — для мероприятий, которые запоминаются
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="btn-primary text-xs uppercase tracking-wider w-full sm:w-auto"
          >
            Обсудить мероприятие
          </Link>
          <Link
            href="/menu"
            className="btn-outline text-xs uppercase tracking-wider w-full sm:w-auto"
          >
            Смотреть меню
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#social-proof"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40 hover:text-cream/70 transition-colors duration-300"
        aria-label="Прокрутить вниз"
      >
        <span className="text-[10px] uppercase tracking-widest">Далее</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}