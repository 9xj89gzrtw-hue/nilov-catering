'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { renderFactItem } from '@/components/facts/FactItem';
import type { ClientLogo } from '@/lib/types';

interface TrustMarqueeProps {
  clients: ClientLogo[];
}

/**
 * Клиентский marquee логотипов/названий клиентов.
 * Бесконечная бегущая строка через Framer Motion.
 * Mobile: ускоренный, меньше элементов.
 */
export function TrustMarquee({ clients }: TrustMarqueeProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const visibleClients = useMemo(
    () => (isMobile ? clients.slice(0, 8) : clients),
    [isMobile, clients],
  );

  // Дублируем для бесшовного цикла
  const doubled = useMemo(
    () => [...visibleClients, ...visibleClients],
    [visibleClients],
  );

  const duration = isMobile ? 12 : 25;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="overflow-hidden py-1"
    >
      <motion.div
        className="flex gap-4 md:gap-6"
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
        {doubled.map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="shrink-0 px-5 py-3 md:px-7 md:py-4 border border-gold-text/30 bg-secondary rounded-sm min-w-[130px] md:min-w-[170px] flex items-center justify-center"
          >
            {renderFactItem({
              status: client.status,
              claim: client.name,
              disclaimer: client.disclaimer,
            })}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
