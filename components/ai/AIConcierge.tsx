'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface Message { role: 'bot' | 'user'; text: string; }
const QUICK = ['Хочу фуршет на 30 человек','Сколько стоит банкет?','Веганское меню','Аллергия на орехи'];
const RESPONSES: Record<string,string> = {
  'фуршет': 'Фуршет от 2 450 ₽/гость. 4 тарифа. Открыть конструктор: /constructor',
  'банкет': 'Банкет от 4 470 ₽/гость. 3 тарифа. /constructor',
  'кофе': 'Кофе-брейк от 950 ₽/гость. /constructor',
  'веган': '8+ веганских позиций: боулы, поке, овощи гриль. Значок "Вег" в меню.',
  'аллерг': '14 аллергенов по ТР ТС 021/2011. Фильтр в конструкторе.',
  'шеф': 'Выезд шефа от 5 000 ₽/час. /services/chef-at-home',
  'сомелье': 'Сомелье от 4 000 ₽/час. /services/sommelier-at-home',
  'цен': 'Фуршет от 2450₽, банкет от 4470₽. /constructor',
  'доставк': 'Доставка в КАД включена. За КАД +30₽/км.',
};
function getResponse(t: string): string {
  const l = t.toLowerCase();
  for (const [k,v] of Object.entries(RESPONSES)) if (l.includes(k)) return v;
  return 'Помогу выбрать формат. /constructor или +7 (812) 919-59-11';
}
export default function AIConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'bot', text: 'Здравствуйте! Я AI-консьерж NiloV. Чем помочь?' }]);
  const [input, setInput] = useState('');
  const [consent, setConsent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [messages]);
  const send = (t?: string) => {
    const msg = t || input; if (!msg.trim() || !consent) return;
    setMessages(p => [...p, { role: 'user', text: msg }]); setInput('');
    setTimeout(() => setMessages(p => [...p, { role: 'bot', text: getResponse(msg) }]), 600);
  };
  return (<>
    <motion.button onClick={() => setOpen(!open)} className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-lg flex items-center justify-center text-background hover:scale-110 transition-transform" aria-label={open ? 'Закрыть' : 'AI-консьерж'} whileTap={{ scale: 0.95 }}>
      {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
    </motion.button>
    <AnimatePresence>{open && (
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-36 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]" role="dialog">
        <div className="bg-gradient-to-r from-gold/20 to-transparent px-4 py-3 border-b border-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-background font-heading text-lg">N</div>
          <div><p className="text-cream font-heading text-sm font-semibold">AI-консьерж</p><p className="text-cream-muted text-xs">Онлайн</p></div>
        </div>
        <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
          {messages.map((m, i) => (<div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${m.role === 'user' ? 'bg-gold/20 text-cream' : 'bg-muted text-cream-muted'}`}>{m.text}</div></div>))}
          {messages.length === 1 && consent && <div className="flex flex-wrap gap-2 pt-2">{QUICK.map(q => <button key={q} onClick={() => send(q)} className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-gold/50 hover:text-gold text-cream-muted">{q}</button>)}</div>}
        </div>
        {!consent ? (<div className="p-3 border-t border-border"><label className="flex items-start gap-2 cursor-pointer"><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 accent-gold" /><span className="text-xs text-cream-muted">Согласен с <a href="/privacy" className="text-gold underline">Политикой</a> (152-ФЗ)</span></label></div>) : (
          <div className="p-3 border-t border-border flex gap-2"><input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Вопрос..." className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-cream focus:border-gold focus:outline-none" /><button onClick={() => send()} className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-background"><Send className="w-4 h-4" /></button></div>
        )}
        <a href="tel:+78129195911" className="block text-center py-2 text-xs text-cream-muted hover:text-gold border-t border-border"><Phone className="w-3 h-3 inline mr-1" />+7 (812) 919-59-11</a>
      </motion.div>
    )}</AnimatePresence>
  </>);
}
