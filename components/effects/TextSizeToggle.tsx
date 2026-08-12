'use client';

import { useState, useEffect } from 'react';
import { Type } from 'lucide-react';

export default function TextSizeToggle() {
  const [size, setSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  useEffect(() => {
    const saved = localStorage.getItem('text-size') as 'normal' | 'large' | 'xlarge' | null;
    if (saved) setSize(saved);
  }, []);

  useEffect(() => {
    const scale = size === 'normal' ? 1 : size === 'large' ? 1.25 : 1.5;
    document.documentElement.style.setProperty('--text-scale', String(scale));
    localStorage.setItem('text-size', size);
  }, [size]);

  const cycle = () => {
    setSize(s =>s === 'normal' ? 'large' : s === 'large' ? 'xlarge' : 'normal');
  };

  const label = size === 'normal' ? '100%' : size === 'large' ? '125%' : '150%';

  return (
    <button
      onClick={cycle}
      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-2 rounded-md hover:bg-secondary/50 transition-colors font-medium touch-target"
      aria-label={`Размер текста: ${size === 'normal' ? 'обычный' : size === 'large' ? 'крупный' : 'очень крупный'}. Нажмите чтобы изменить.`}
      title={`Размер текста: ${label}. Нажмите чтобы увеличить.`}
    >
      <Type className="w-4 h-4" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
