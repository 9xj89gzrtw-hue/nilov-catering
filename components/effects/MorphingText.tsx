'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface MorphingTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

function WordReveal({ word, isEntering }: { word: string; isEntering: boolean }) {
  return (
    <span className="inline-flex" aria-hidden="true">
      {word.split('').map((char, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={isEntering ? { opacity: 0, y: 12, rotateX: -90 } : { opacity: 1, y: 0, rotateX: 0 }}
          animate={isEntering ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: -12, rotateX: 90 }}
          transition={{
            duration: 0.3,
            delay: isEntering ? i * 0.04 + 0.1 : (word.length - 1 - i) * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          style={{
            background: 'linear-gradient(135deg, #B08D57 0%, #8A6D3B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function MorphingText({ words, interval = 3500, className = '' }: MorphingTextProps) {
  const [index, setIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsEntering(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setIsEntering(true);
      }, words[index].length * 30 + 200);
    }, interval);
    return () => clearInterval(timer);
  }, [index, interval, words]);

  return (
    <span className={className} aria-label={words[index]}>
      <AnimatePresence mode="wait">
        <WordReveal key={`${words[index]}-${isEntering}`} word={words[index]} isEntering={isEntering} />
      </AnimatePresence>
      <span className="sr-only">{words[index]}</span>
    </span>
  );
}
