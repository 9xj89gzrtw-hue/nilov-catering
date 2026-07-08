"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(11, "Введите корректный номер"),
  eventType: z.string().min(1, "Выберите тип мероприятия"),
  message: z.string().min(10, "Минимум 10 символов"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", eventType: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Сообщение отправлено!");
        form.reset();
      }
    } catch {
      toast.error("Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  }

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Контакты", href: "/contact" },
  ];

  return (
    <main>
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Контакты</h1>
          <p className="text-primary-foreground/70 text-lg">Свяжитесь с нами для обсуждения вашего мероприятия</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <AnimatedSection>
                <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8">Наши контакты</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-0.5 text-accent" />
                    <div><p className="font-medium">Телефон</p><a href="tel:+74951234567" className="text-muted-foreground hover:text-accent">+7 (495) 123-45-67</a></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-0.5 text-accent" />
                    <div><p className="font-medium">Email</p><a href="mailto:info@odaeda.ru" className="text-muted-foreground hover:text-accent">info@odaeda.ru</a></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-0.5 text-accent" />
                    <div><p className="font-medium">Адрес</p><p className="text-muted-foreground">г. Москва, ул. Тверская, д. 15, офис 301</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-0.5 text-accent" />
                    <div><p className="font-medium">Часы работы</p><p className="text-muted-foreground">Пн-Сб: 9:00 - 21:00</p></div>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <div className="mt-8 bg-muted rounded-lg h-64 flex items-center justify-center text-muted-foreground">
                  Карта загрузится после настройки API-ключа Яндекс.Карт
                </div>
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.1}>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-8">Напишите нам</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Имя</FormLabel><FormControl><Input placeholder="Ваше имя" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="email@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Телефон</FormLabel><FormControl><Input type="tel" placeholder="+7XXXXXXXXXX" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="eventType" render={({ field }) => (
                    <FormItem><FormLabel>Тип мероприятия</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Выберите тип" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="wedding">Свадьба</SelectItem>
                          <SelectItem value="corporate">Корпоратив</SelectItem>
                          <SelectItem value="private">Частное мероприятие</SelectItem>
                          <SelectItem value="other">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem><FormLabel>Сообщение</FormLabel><FormControl><Textarea placeholder="Расскажите о вашем мероприятии..." rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Отправка..." : "Отправить сообщение"}</Button>
                </form>
              </Form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
