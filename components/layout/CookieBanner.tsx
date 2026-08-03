'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const shown = localStorage.getItem('cookie-consent-shown');
    if (!shown) setShow(true);
  }, []);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.setItem('cookie-consent-shown', 'true');
      setShow(false);
    }, 3000);
    return () => clearTimeout(t);
  }, [show]);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-background/98 border-t border-line/50" role="dialog" aria-label="Cookie">
      <div className="container-site py-1.5 flex items-center justify-between gap-2">
        <p className="text-[10px] text-muted-foreground/70">
          Cookie · <Link href="/privacy" className="underline">Подробнее</Link>
        </p>
        <button onClick={() => { localStorage.setItem('cookie-consent','accepted'); localStorage.setItem('cookie-consent-shown','true'); setShow(false); }} className="text-[10px] text-muted-foreground/70 hover:text-foreground underline">OK</button>
      </div>
    </div>
  );
}
