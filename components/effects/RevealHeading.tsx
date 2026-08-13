'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number; // delay per word, default 0.08
}

/**
 * RevealHeading — заголовок с word-by-word reveal на скролле.
 * Inspired by Ballena Cabo Awwwards pattern (block-hero__title-word).
 *
 * Usage:
 *   <RevealHeading as="h1" stagger={0.05}>Свадебный банкет мечты</RevealHeading>
 */
export default function RevealHeading({
  children,
  className = '',
  delay = 0,
  as = 'h2',
  stagger = 0.08,
}: Props) {
  const text = typeof children === 'string' ? children : String(children);
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: '110%', rotate: 6, opacity: 0 },
    visible: {
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: 'easeOut' as const },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={className}
    >
      {words.map((w, i) =>(
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.25em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
