'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { menuItems, menuCategories, menuTypeFilters } from '@/lib/data';
import { Leaf, Wheat, AlertCircle } from 'lucide-react';

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = menuItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (activeType === 'vegetarian' && !item.isVegetarian) return false;
    if (activeType === 'gluten-free' && !item.isGlutenFree) return false;
    if (activeType === 'new' && !item.isNew) return false;
    if (activeType === 'popular' && !item.isPopular) return false;
    return true;
  });

  return (
    <section className="py-16 md:py-24 bg-background" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Allergen info banner */}
        <div className="mb-8 p-4 border border-border bg-card/40 rounded-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-gold/70 mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-[11px] text-cream-muted/80 leading-relaxed">
            Все блюда маркированы по 14 аллергенам согласно ТР ТС 021/2011. Звёздочка означает возможное присутствие аллергена вследствие перекрёстной контаминации. Подробная информация — в QR-меню и у менеджера.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {menuCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`text-[10px] uppercase tracking-[0.15em] px-5 py-2.5 rounded-full transition-all duration-300 cursor-hover ${
                activeCategory === cat.value
                  ? 'bg-gold/20 border border-gold/40 text-gold'
                  : 'text-cream-muted hover:text-cream border border-border hover:border-border-light'
              }`}
              aria-pressed={activeCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {menuTypeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              className={`text-[10px] tracking-wider px-3 py-1.5 rounded-full transition-all duration-300 border cursor-hover ${
                activeType === f.value
                  ? 'border-gold/50 text-gold bg-gold/10'
                  : 'border-border text-cream-muted/60 hover:text-cream hover:border-border-light'
              }`}
              aria-pressed={activeType === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          layout
        >
          {filtered.map((item, i) => {
            const hasAllergens = item.allergens && item.allergens.length > 0;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group bg-card border border-border overflow-hidden cursor-hover hover:border-border-light transition-colors duration-500"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  {item.video ? (
                    <video
                      src={item.video} 
                      poster={item.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="object-cover w-full h-full transition-transform duration-[1s] ease-out group-hover:scale-110"
                      aria-label={item.imageAlt || item.name}
                    />
                  ) : (
                    <>
                      <Image
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-115 animate-kenburns-slow"
                        loading="lazy"
                      />
                      {/* Steam/particle overlay on hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute -top-1/4 left-1/4 w-1 h-1/2 bg-gradient-to-t from-transparent via-white/8 to-transparent blur-md animate-steam-rise-1" />
                        <div className="absolute -top-1/4 left-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent via-white/6 to-transparent blur-md animate-steam-rise-2" />
                        <div className="absolute -top-1/4 left-3/4 w-1 h-1/2 bg-gradient-to-t from-transparent via-white/7 to-transparent blur-md animate-steam-rise-3" />
                      </div>
                      {/* Warm glow pulse */}
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-gold/0 via-gold/0 to-gold/0 group-hover:from-gold/8 group-hover:to-transparent transition-all duration-700" />
                    </>
                  )}
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                    {item.isVegetarian && (
                      <span className="bg-[#0A0A0A]/60 backdrop-blur-sm text-cream/80 text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1" aria-label="Вегетарианское">
                        <Leaf className="w-2.5 h-2.5" /> Вег
                      </span>
                    )}
                    {item.isGlutenFree && (
                      <span className="bg-[#0A0A0A]/60 backdrop-blur-sm text-cream/80 text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1" aria-label="Без глютена">
                        <Wheat className="w-2.5 h-2.5" /> БГ
                      </span>
                    )}
                    {item.isNew && (
                      <span className="bg-burgundy/80 backdrop-blur-sm text-cream text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                        Новинка
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-semibold text-cream group-hover:text-gold transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-cream-muted line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-medium text-gold/80">{item.price.toLocaleString('ru-RU')} &#8381;</span>
                      <p className="text-[10px] text-cream-muted/50 mt-0.5">{item.weight}</p>
                    </div>
                  </div>

                  {/* Allergens line */}
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-[10px] text-cream-muted/60 leading-relaxed">
                      <span className="text-cream-muted/40 uppercase tracking-wider mr-1.5">Аллергены:</span>
                      {hasAllergens ? (
                        <span className="text-cream-muted/80">{item.allergens!.join(', ')}</span>
                      ) : (
                        <span className="text-cream-muted/40">не объявлены</span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-cream-muted py-16 text-sm">
            Нет блюд, соответствующих выбранным фильтрам.
          </p>
        )}
      </div>
    </section>
  );
}
