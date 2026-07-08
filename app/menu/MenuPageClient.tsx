'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { menuItems, menuCategories, menuTypeFilters } from '@/lib/data';
import { Leaf, Wheat } from 'lucide-react';

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');

  const filtered = menuItems.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (activeType === 'vegetarian' && !item.isVegetarian) return false;
    if (activeType === 'gluten-free' && !item.isGlutenFree) return false;
    if (activeType === 'new' && !item.isNew) return false;
    if (activeType === 'popular' && !item.isPopular) return false;
    return true;
  });

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {menuCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`text-xs uppercase tracking-wider px-4 py-2 rounded-sm transition-colors duration-200 ${
                activeCategory === cat.value
                  ? 'bg-burgundy text-cream'
                  : 'bg-muted text-cream-muted hover:text-cream border border-border'
              }`}
              aria-pressed={activeCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {menuTypeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              className={`text-xs tracking-wider px-3 py-1.5 rounded-sm transition-colors duration-200 border ${
                activeType === f.value
                  ? 'border-gold text-gold'
                  : 'border-border text-cream-muted hover:text-cream'
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
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card border border-border rounded-md overflow-hidden card-hover"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {item.isVegetarian && (
                    <span className="bg-card/80 backdrop-blur-sm text-cream-muted text-[10px] px-2 py-0.5 rounded-sm flex items-center gap-1" aria-label="Вегетарианское">
                      <Leaf className="w-3 h-3" /> Вег
                    </span>
                  )}
                  {item.isGlutenFree && (
                    <span className="bg-card/80 backdrop-blur-sm text-cream-muted text-[10px] px-2 py-0.5 rounded-sm flex items-center gap-1" aria-label="Без глютена">
                      <Wheat className="w-3 h-3" /> БГ
                    </span>
                  )}
                  {item.isNew && (
                    <span className="bg-burgundy/80 backdrop-blur-sm text-cream text-[10px] px-2 py-0.5 rounded-sm">
                      Новинка
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-cream">{item.name}</h3>
                    <p className="mt-1 text-xs text-cream-muted line-clamp-2">{item.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-medium text-gold">{item.price.toLocaleString('ru-RU')} ₽</span>
                    <p className="text-[10px] text-cream-muted mt-0.5">{item.weight}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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