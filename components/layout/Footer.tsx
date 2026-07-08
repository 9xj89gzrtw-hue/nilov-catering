import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* О компании */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">
              Nilov Catering
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Профессиональный кейтеринг в Москве с 2013 года. Создаём
              уникальные гастрономические впечатления для мероприятий любого
              масштаба.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://t.me/nilovcatering"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://vk.com/nilovcatering"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors"
                aria-label="ВКонтакте"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.189 1.368 1.259 2.183 1.815.616.42 1.084.328 1.084.328l2.175-.03s1.14-.07.599-.964c-.044-.073-.314-.661-1.618-1.869-1.366-1.265-1.183-1.06.462-3.246.999-1.33 1.399-2.142 1.273-2.489-.119-.331-.854-.244-.854-.244l-2.45.015s-.182-.025-.316.056c-.131.079-.215.263-.215.263s-.386 1.028-.9 1.903c-1.084 1.846-1.517 1.943-1.693 1.829-.412-.266-.309-1.069-.309-1.638 0-1.781.27-2.523-.525-2.715-.264-.064-.458-.106-1.131-.113-.864-.009-1.594.003-2.007.206-.275.135-.488.436-.358.453.16.021.521.097.712.358.248.336.239 1.093.239 1.093s.142 2.095-.333 2.356c-.326.178-.774-.185-1.733-1.848a13.07 13.07 0 01-.86-1.742s-.071-.174-.198-.267c-.154-.113-.369-.149-.369-.149l-2.327.015s-.347.01-.474.16c-.113.134-.009.41-.009.41s1.819 4.259 3.878 6.401c1.889 1.968 4.034 1.839 4.034 1.839h.972z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/79999213456"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-primary-foreground/10 hover:bg-accent transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              {[
                { label: "О нас", href: "/about" },
                { label: "Услуги", href: "/services" },
                { label: "Меню", href: "/menu" },
                { label: "Галерея", href: "/gallery" },
                { label: "Отзывы", href: "/testimonials" },
                { label: "Цены", href: "/pricing" },
                { label: "Блог", href: "/blog" },
                { label: "FAQ", href: "/faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Подписка */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Подписка</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Подпишитесь на рассылку, чтобы получать спецпредложения и новости
              кейтеринга.
            </p>
            <form
              action="/api/newsletter"
              method="POST"
              className="flex gap-2"
            >
              <Input
                name="email"
                type="email"
                placeholder="Ваш email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm h-9"
                required
              />
              <Button
                type="submit"
                size="sm"
                className="bg-accent hover:bg-accent/90 text-primary-foreground shrink-0"
              >
                OK
              </Button>
            </form>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-heading text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>г. Москва, ул. Тверская, д. 15, офис 301</span>
              </li>
              <li>
                <a
                  href="tel:+74959213456"
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +7 (495) 921-34-56
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@odaeda.ru"
                  className="flex items-center gap-2.5 text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  info@odaeda.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-primary-foreground/70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Пн-Сб: 9:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Nilov Catering. Все права защищены.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}