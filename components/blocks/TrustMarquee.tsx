'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ClientCard {
  id: string;
  name: string;
  status: 'verified' | 'pending';
  ref?: { event: string; date: string; venue: string; reviewId?: string };
}

interface TrustMarqueeProps {
  clients: ClientCard[];
}

/**
 * Клиентский marquee — названия клиентов с venue/date и ссылкой на отзыв.
 * Бесконечная бегущая строка через Framer Motion.
 * Mobile: ускоренный, меньше элементов.
 *
 * W20 fix: каждая карточка теперь кликабельна → ведёт на /reviews#case-N
 * (если есть reviewId в ref). Venue/date видны под названием.
 */
export function TrustMarquee({ clients }: TrustMarqueeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) =>setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () =>mq.removeEventListener('change', handler);
  }, []);

  const visibleClients = useMemo(
    () =>(isMobile ? clients.slice(0, 8) : clients),
    [isMobile, clients],
  );

  // Дублируем для бесшовного цикла
  const doubled = useMemo(
    () =>[...visibleClients, ...visibleClients],
    [visibleClients],
  );

  const duration = isMobile ? 14 : 30;

  const renderCard = (client: ClientCard, i: number) => {
    const content = (
      <>
        <p className="text-xs md:text-sm tracking-wider font-medium text-foreground text-center mb-1">
          {client.name}
        </p>
        {client.ref && (
          <p className="text-[10px] text-muted-foreground text-center leading-tight">
            {/* A11y: removed opacity-70 — muted-foreground at full opacity is 8.38:1 on cream (AAA);
                opacity-70 dropped it to 3.86:1 (FAIL). Hierarchy preserved by layout/size. */}
            {client.ref.event}
            <br />
            <span>{client.ref.date}</span>
            <br />
            <span>{client.ref.venue}</span>
          </p>
        )}
        {/* A11y: emerald-600 (oklch → #009966) on cream = 3.11:1 FAIL at 9px.
            #065F46 (emerald-800) on cream = 6.54:1 AA pass. */}
        {client.status === 'verified' && (
          <p className="text-[9px] text-[#065F46] mt-1">проверен</p>
        )}
      </>
    );

    const cls =
      'shrink-0 px-4 py-3 md:px-5 md:py-4 border border-gold-text/30 bg-secondary rounded-sm min-w-[170px] md:min-w-[220px] flex flex-col items-center justify-center hover:border-gold-text transition-colors';

    if (client.ref?.reviewId) {
      return (
        <Link
          key={`${client.id}-${i}`}
          href={`/reviews#${client.ref.reviewId}`}
          className={cls}
        >
          {content}
        </Link>
      );
    }
    return (
      <div key={`${client.id}-${i}`} className={cls}>
        {content}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="overflow-hidden py-1"
    >
      <motion.div
        className="flex gap-3 md:gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((client, i) =>renderCard(client, i))}
      </motion.div>
    </motion.div>
  );
}
