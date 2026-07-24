'use client';

import { motion, type Variants } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

const wordVariants: Variants = {
  hidden: { y: '0.5em', opacity: 0, rotateX: -4 },
  visible: (i: number) => ({
    y: '0em', opacity: 1, rotateX: 0,
    transition: { duration: 0.6, delay: i * 0.03, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const words = children.split(' ');

  return (
    <p className={className} style={{ perspective: '800px' }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="inline-block"
          style={{ marginRight: '0.2em', transformOrigin: 'center bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}
