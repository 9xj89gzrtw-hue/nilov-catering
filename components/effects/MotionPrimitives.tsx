'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';

const revealVariants: Variants = {
  hidden: { y: 24, opacity: 1 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Блок, появляющийся при скролле (whileInView reveal) */
export function RevealBlock({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div variants={revealVariants} initial="visible" whileInView="visible" viewport={{ once: true, margin: '-40px' }} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

/** Карточка с Ken Burns zoom на фото при hover */
export function KenBurnsCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`group overflow-hidden rounded-xl border border-line bg-card transition-shadow duration-300 hover:border-gold-text hover:shadow-lg hover:shadow-gold/10 ${className}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

/** Фото с Ken Burns zoom при hover */
export function KenBurnsImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
    </div>
  );
}

/** Магнитная кнопка */
export function MagneticButton({ children, href, className = '' }: { children: ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}

/** Секция с reveal-заголовком */
export function RevealSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      initial="visible"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.section>
  );
}
