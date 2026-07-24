'use client';

import { useState, useEffect } from 'react';

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
    setSize(s => s === 'normal' ? 'large' : s === 'large' ? 'xlarge' : 'normal');
  };

  return (
    <button
      onClick={cycle}
      className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded border border-line transition-colors font-medium touch-target"
      aria-label={`Размер текста: ${size === 'normal' ? 'обычный' : size === 'large' ? 'крупный' : 'очень крупный'}. Нажмите чтобы изменить.`}
      title="Увеличить размер текста"
    >
      <span aria-hidden="true">A+</span>
      <span className="ml-1 text-xs align-top">
        {size === 'normal' ? '100%' : size === 'large' ? '125%' : '150%'}
      </span>
    </button>
  );
}
