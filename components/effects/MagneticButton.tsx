'use client';

import { useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: 'a' | 'button' | 'div';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as: Tag = 'a',
  href,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  const Component = Tag;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{ willChange: 'transform' }}
    >
      <Component
        className={className}
        href={href}
        onClick={onClick}
        type={type}
        disabled={disabled}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}