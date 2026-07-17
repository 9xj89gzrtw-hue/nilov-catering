'use client';
import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
export default function VoiceSearch({ onResult }: { onResult: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  useEffect(() => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SR) { setSupported(true); const r = new SR(); r.lang = 'ru-RU'; r.continuous = false; r.interimResults = false;
      r.onresult = (e: any) => { onResult(e.results[0][0].transcript); setListening(false); };
      r.onerror = () => setListening(false);
      setRecognition(r);
    }
  }, [onResult]);
  if (!supported) return null;
  const toggle = () => { if (listening) { recognition?.stop(); setListening(false); } else { recognition?.start(); setListening(true); } };
  return <button onClick={toggle} aria-label={listening ? 'Остановить' : 'Голосовой ввод'} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all min-h-[44px] ${listening ? 'bg-burgundy text-cream animate-pulse' : 'border border-border text-cream-muted hover:text-gold'}`}>{listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}</button>;
}
