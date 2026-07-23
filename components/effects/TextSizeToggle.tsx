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
      className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-line transition-colors"
      aria-label={`Размер текста: ${size === 'normal' ? 'обычный' : size === 'large' ? 'крупный' : 'очень крупный'}. Нажмите чтобы изменить.`}
    >
      {size === 'normal' ? 'A− A A+' : size === 'large' ? 'A− A A+' : 'A− A A+'}
      <span className="ml-1 text-xs align-top">
        {size === 'normal' ? '100%' : size === 'large' ? '125%' : '150%'}
      </span>
    </button>
  );
}
