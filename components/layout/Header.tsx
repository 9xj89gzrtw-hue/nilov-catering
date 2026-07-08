"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/components/common/ThemeProvider";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const scrolledBg = scrolled || !isHome;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolledBg
            ? "bg-background/70 backdrop-blur-xl border-b border-border/30 shadow-[0_1px_20px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "font-heading text-2xl font-bold tracking-wide transition-colors duration-300",
                scrolledBg ? "text-foreground" : "text-white"
              )}
            >
              <span className="relative">
                Nilov
                <span className={cn(
                  "transition-colors duration-300",
                  scrolledBg ? "text-accent" : "text-accent"
                )}> Catering</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200",
                    pathname === item.href
                      ? scrolledBg
                        ? "text-accent bg-accent/5"
                        : "text-white bg-white/10"
                      : scrolledBg
                        ? "text-foreground hover:text-accent hover:bg-muted/50"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-2 rounded-full transition-all duration-200",
                  scrolledBg ? "text-foreground hover:bg-muted/50" : "text-white/80 hover:text-white hover:bg-white/10"
                )}
                aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
              <motion.a
                href="tel:+74959213456"
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "text-sm font-medium flex items-center gap-1.5 transition-all duration-200 px-3 py-1.5 rounded-lg",
                  scrolledBg ? "text-foreground hover:bg-muted/50" : "text-white hover:bg-white/10"
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                +7 (495) 921-34-56
              </motion.a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link href="/quote">
                  <Button size="sm" className="btn-glow shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300">
                    Рассчитать стоимость
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Mobile menu */}
            <div className="flex items-center gap-1 lg:hidden">
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-2 transition-colors",
                  scrolledBg ? "text-foreground" : "text-white"
                )}
                aria-label={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger className="lg:hidden">
                  <button
                    className={cn(
                      "p-2 transition-colors relative",
                      scrolledBg ? "text-foreground" : "text-white"
                    )}
                    aria-label="Открыть меню"
                  >
                    <AnimatePresence mode="wait">
                      {!mobileOpen ? (
                        <motion.div
                          key="menu-icon"
                          initial={{ opacity: 0, rotate: -90 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Menu className="w-6 h-6" />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link
                      href="/"
                      className="font-heading text-2xl font-bold text-foreground"
                    >
                      Nilov <span className="text-accent">Catering</span>
                    </Link>
                    <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
                      {navItems.map((item, i) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                        >
                          <Link
                            href={item.href}
                            className={cn(
                              "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors block",
                              pathname === item.href
                                ? "bg-accent/10 text-accent font-semibold"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                    <div className="border-t border-border pt-4">
                      <a
                        href="tel:+74959213456"
                        className="flex items-center gap-2 text-sm font-medium text-foreground mb-4"
                      >
                        <Phone className="w-4 h-4" />
                        +7 (495) 921-34-56
                      </a>
                      <Link href="/quote" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full btn-glow shadow-lg shadow-accent/25">Рассчитать стоимость</Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}