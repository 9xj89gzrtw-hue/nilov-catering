'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, MessageCircle } from 'lucide-react';

interface SocialPost {
  id: string;
  platform: 'vk' | 'telegram';
  image: string;
  text: string;
  date: string;
  likes?: number;
  link: string;
}

const HARDCODED_POSTS: SocialPost[] = [
  {
    id: '1',
    platform: 'vk',
    image: '/placeholders/social-1.svg',
    text: 'Свадьба Ольги и Андрея — 120 гостей, шатёр на берегу залива. Такой красивый день! ❤️',
    date: '2 дня назад',
    likes: 47,
    link: 'https://vk.com/nilovcatering',
  },
  {
    id: '2',
    platform: 'vk',
    image: '/placeholders/social-2.svg',
    text: 'Новое меню кофе-брейков: миндальные круассаны, смородиновые тарты, какао с маршмэллоу ☕',
    date: '5 дней назад',
    likes: 32,
    link: 'https://vk.com/nilovcatering',
  },
  {
    id: '3',
    platform: 'vk',
    image: '/placeholders/social-3.svg',
    text: 'За кулисами: команда собирает площадку на 350 гостей. 07:00, всё по плану 💪',
    date: 'неделя назад',
    likes: 61,
    link: 'https://vk.com/nilovcatering',
  },
  {
    id: '4',
    platform: 'telegram',
    image: '/placeholders/social-4.svg',
    text: 'Фермерские овощи сегодня: баклажаны, цуккини, сладкий перец. Всё из ЛО, не старше 48 часов.',
    date: '3 дня назад',
    likes: 28,
    link: 'https://t.me/nilovcatering',
  },
];

export default function LiveSocialFeed({ posts }: { posts?: SocialPost[] }) {
  const items = posts && posts.length > 0 ? posts : HARDCODED_POSTS;
  return (
    <section aria-label="Мы в соцсетях" className="py-20 md:py-28 bg-secondary">
      <div className="container-site">
        <p className="text-xs tracking-[0.2em] uppercase text-gold-text mb-3">Живая лента</p>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-medium">Мы в соцсетях</h2>
            <p className="text-sm text-muted-foreground mt-2">Свежие события, меню и закадровые моменты</p>
          </div>
          <div className="hidden md:flex gap-3">
            <a href="https://vk.com/nilovcatering" target="_blank" rel="noopener noreferrer" className="text-xs text-gold-text hover:underline">ВКонтакте</a>
            <a href="https://t.me/nilovcatering" target="_blank" rel="noopener noreferrer" className="text-xs text-gold-text hover:underline">Telegram</a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden bg-card border border-line block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3 md:p-4">
                <p className="text-xs md:text-sm leading-relaxed text-foreground line-clamp-3">{post.text}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{post.likes}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <div className="flex gap-4 justify-center">
            <a href="https://vk.com/nilovcatering" target="_blank" rel="noopener noreferrer" className="text-sm text-gold-text underline underline-offset-4">ВКонтакте</a>
            <a href="https://t.me/nilovcatering" target="_blank" rel="noopener noreferrer" className="text-sm text-gold-text underline underline-offset-4">Telegram</a>
          </div>
        </div>
      </div>
    </section>
  );
}