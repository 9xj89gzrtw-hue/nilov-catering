"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Calculator, Image, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Главная", href: "/" },
  { icon: UtensilsCrossed, label: "Меню", href: "/menu" },
  { icon: Calculator, label: "Калькулятор", href: "/menu#calculator" },
  { icon: Image, label: "Галерея", href: "/gallery" },
  { icon: Phone, label: "Контакты", href: "/contact" },
];

export default function MobileNav() {
  const pathname = usePathname();

  if (pathname === "/quote") return null;

  // Get WhatsApp text from localStorage (cart)
  const getWhatsAppUrl = () => {
    let text = "Здравствуйте! Хочу узнать о кейтеринге.";
    try {
      const stored = localStorage.getItem("nilov-cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let total = 0;
          let menuText = "Здравствуйте! Хочу заказать кейтеринг. Моё меню:\n\n";
          parsed.forEach(([, { item, quantity }]: [string, { item: { name: string; price: number }; quantity: number }]) => {
            const sum = item.price * quantity;
            total += sum;
            menuText += `• ${item.name} x${quantity} — ${sum.toLocaleString("ru-RU")} ₽\n`;
          });
          menuText += `\nИтого: ${total.toLocaleString("ru-RU")} ₽`;
          text = menuText;
        }
      }
    } catch {}
    return `https://wa.me/74959213456?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-t border-border/50 md:hidden safe-area-bottom"
        aria-label="Мобильная навигация"
      >
        <div className="flex items-center justify-around h-16 px-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition-colors min-w-0"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0 transition-colors",
                      isActive ? "text-accent" : "text-muted-foreground"
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] leading-tight truncate transition-colors",
                    isActive ? "text-accent font-medium" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-1 w-8 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* WhatsApp Floating Button */}
      <motion.a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-30 md:bottom-6 md:right-6 p-3.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-500/30 transition-colors md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Написать в WhatsApp"
      >
        <MessageCircle className="w-6 h-6" fill="white" />
      </motion.a>
    </>
  );
}