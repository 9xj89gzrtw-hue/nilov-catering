'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

  useEffect(() => {
    // Only show on devices with fine pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;
    setIsVisible(true);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a, button, [role="button"], input, textarea, select, .cursor-hover')
      ) {
        setIsHovering(true);
      }
    };

    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        el.closest('a, button, [role="button"], input, textarea, select, .cursor-hover')
      ) {
        setIsHovering(false);
      }
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    let raf: number;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="rounded-full border border-cream/50"
          animate={{
            width: isHovering ? 56 : isClicking ? 28 : 36,
            height: isHovering ? 56 : isClicking ? 28 : 36,
            opacity: isHovering ? 0.8 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </div>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-cream"
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </>
  );
}