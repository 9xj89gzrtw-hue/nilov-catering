'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ALL_DISHES } from '@/lib/menu-data';
import { getDishImage, getObjectPositionForDish } from '@/lib/dish-images';
import FoodPhoto from '@/components/common/FoodPhoto';

const CATS = [
  { title: 'Фуршет',   href: '/menu/furshet',       photo: '/images/real/canape-platter.jpg',     dishId: 'canape-salmon',        priceFrom: 'от 2 450 ₽' },
  { title: 'Банкет',    href: '/menu/banquet',       photo: '/images/real/beef-medallions.jpg',    dishId: 'beef-medallions',      priceFrom: 'от 3 950 ₽' },
  { title: 'Кофе-брейк', href: '/menu/coffee-break',  photo: '/images/real/macarons.jpg',           dishId: 'macaron-shooter',      priceFrom: 'от 390 ₽' },
  { title: 'Халяль',    href: '/menu/halal',         photo: '/images/real/grilled-chicken.jpg',    dishId: 'halal-chicken-shashlik', priceFrom: 'от 2 600 ₽' },
  { title: 'Веган',     href: '/menu/vegan',         photo: '/images/real/vegetarian-bowl.jpg',    dishId: 'buddha-bowl',          priceFrom: 'от 2 300 ₽' },
  { title: 'Без глютена', href: '/menu/gluten-free', photo: '/images/real/cake-berry.jpg',         dishId: 'gluten-free-cake',     priceFrom: 'от 2 700 ₽' },
  { title: 'Детское',   href: '/menu/detskoe',       photo: '/images/real/burger.jpg',             dishId: 'mini-burger',          priceFrom: 'от 1 550 ₽' },
  { title: 'Десерты',   href: '/menu/catalog?cat=deserty', photo: '/images/real/dessert-table.jpg', dishId: 'choc-mousse',        priceFrom: 'от 290 ₽' },
];

export default function MenuPreview() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40" aria-labelledby="menu-heading">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-[0.2em] text-gold-text mb-3"
            >
              Меню под любой повод
            </motion.p>
            <motion.h2
              id="menu-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-heading text-3xl md:text-5xl"
              style={{ fontWeight: 500 }}
            >
              124 блюда. 8 категорий. 1 команда шефов.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Link
              href="/menu/catalog"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-gold-text hover:text-gold-text transition-colors no-underline"
            >
              Открыть полный каталог
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {CATS.map((cat, idx) => {
            const dish = ALL_DISHES.find(d => d.id === cat.dishId);
            const img = cat.photo || (dish ? getDishImage(dish.id, dish.station) : '');
            const objPos = dish ? getObjectPositionForDish(dish.id, dish.station) : 'center 40%';
            return (
              <motion.div
                key={cat.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={cat.href}
                  className="group block h-full no-underline rounded-xl overflow-hidden bg-card border border-line hover:border-gold-text/40 transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <FoodPhoto
                      src={img}
                      alt={cat.title}
                      aspectRatio="square"
                      objectPosition={objPos}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-heading text-base md:text-lg text-foreground group-hover:text-gold-text transition-colors" style={{ fontWeight: 500 }}>
                        {cat.title}
                      </h3>
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">{cat.priceFrom}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
