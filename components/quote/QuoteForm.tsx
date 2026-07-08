"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import AnimatedSection from "@/components/common/AnimatedSection";
import { eventTypes, serviceFormats, pricingPackages, menuItems } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

const step1Schema = z.object({
  eventType: z.string().min(1, "Выберите тип мероприятия"),
  date: z.string().min(1, "Укажите дату"),
  time: z.string().min(1, "Укажите время"),
});

const step2Schema = z.object({
  guestCount: z.number().min(10, "Минимум 10 гостей").max(1000, "Максимум 1000 гостей"),
  serviceFormat: z.string().min(1, "Выберите формат"),
  packageId: z.string().min(1, "Выберите пакет"),
});

const step5Schema = z.object({
  name: z.string().min(2, "Введите имя"),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email"),
  contactPreference: z.string().min(1, "Выберите способ связи"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step5Data = z.infer<typeof step5Schema>;

interface QuoteFormState {
  eventType: string;
  date: string;
  time: string;
  guestCount: number;
  serviceFormat: string;
  packageId: string;
  selectedDishes: string[];
  wishes: string;
  needDecoration: boolean;
  needEquipment: boolean;
  needPhoto: boolean;
  name: string;
  phone: string;
  email: string;
  contactPreference: string;
}

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormState>({
    eventType: "",
    date: "",
    time: "",
    guestCount: 50,
    serviceFormat: "",
    packageId: "",
    selectedDishes: [],
    wishes: "",
    needDecoration: false,
    needEquipment: false,
    needPhoto: false,
    name: "",
    phone: "",
    email: "",
    contactPreference: "",
  });
  const [search, setSearch] = useState("");

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { eventType: "", date: "", time: "" },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { guestCount: 50, serviceFormat: "", packageId: "" },
  });

  const step5Form = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: { name: "", phone: "", email: "", contactPreference: "" },
  });

  const steps = [
    "Мероприятие",
    "Гости",
    "Меню",
    "Детали",
    "Контакты",
  ];

  const totalSteps = steps.length;

  const goNext = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleStep1Submit = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleStep2Submit = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    goNext();
  };

  const handleStep4Next = () => {
    setFormData((prev) => ({
      ...prev,
      wishes: (document.getElementById("wishes-textarea") as HTMLTextAreaElement)?.value || "",
      needDecoration: (document.getElementById("switch-deco") as HTMLInputElement)?.checked || false,
      needEquipment: (document.getElementById("switch-equip") as HTMLInputElement)?.checked || false,
      needPhoto: (document.getElementById("switch-photo") as HTMLInputElement)?.checked || false,
    }));
    goNext();
  };

  const toggleDish = (id: string) => {
    setFormData((prev) => {
      const selected = prev.selectedDishes.includes(id)
        ? prev.selectedDishes.filter((d) => d !== id)
        : [...prev.selectedDishes, id];
      return { ...prev, selectedDishes: selected };
    });
  };

  const handleFinalSubmit = async () => {
    const valid = await step5Form.trigger();
    if (!valid) return;

    const values = step5Form.getValues();
    const finalData = { ...formData, ...values };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
        setStep(totalSteps - 1);
      }
    } catch {
      toast.error("Произошла ошибка. Попробуйте ещё раз.");
    }
  };

  const filteredMenu = search.length > 1
    ? menuItems.filter(
        (m) =>
          m.name.toLowerCase().includes(search.toLowerCase()) ||
          m.description.toLowerCase().includes(search.toLowerCase())
      )
    : menuItems;

  const selectedDishItems = menuItems.filter((m) =>
    formData.selectedDishes.includes(m.id)
  );

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <span
              key={i}
              className={cn(
                "text-xs font-medium hidden sm:block",
                i <= step ? "text-accent" : "text-muted-foreground"
              )}
            >
              {s}
            </span>
          ))}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Event */}
      {step === 0 && (
        <AnimatedSection>
          <h3 className="font-heading text-2xl font-bold mb-6">Информация о мероприятии</h3>
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-6 max-w-lg">
              <FormField
                control={step1Form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип мероприятия</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eventTypes.map((et) => (
                          <SelectItem key={et.value} value={et.value}>
                            {et.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step1Form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата мероприятия</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step1Form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время начала</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Далее</Button>
              </div>
            </form>
          </Form>
        </AnimatedSection>
      )}

      {/* Step 2: Guests */}
      {step === 1 && (
        <AnimatedSection>
          <h3 className="font-heading text-2xl font-bold mb-6">Гости и формат</h3>
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-6 max-w-lg">
              <FormField
                control={step2Form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество гостей</FormLabel>
                    <FormControl>
                      <Input type="number" min={10} max={1000} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step2Form.control}
                name="serviceFormat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Формат обслуживания</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите формат" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceFormats.map((sf) => (
                          <SelectItem key={sf.value} value={sf.value}>
                            {sf.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step2Form.control}
                name="packageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пакет</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите пакет" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pricingPackages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name} — от {formatPrice(pkg.pricePerPerson)}/чел.
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={goBack}>
                  Назад
                </Button>
                <Button type="submit">Далее</Button>
              </div>
            </form>
          </Form>
        </AnimatedSection>
      )}

      {/* Step 3: Menu */}
      {step === 2 && (
        <AnimatedSection>
          <h3 className="font-heading text-2xl font-bold mb-6">Выбор блюд</h3>
          <Input
            placeholder="Поиск блюд..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md mb-4"
          />
          <div className="max-h-96 overflow-y-auto space-y-2 mb-4 pr-2">
            {filteredMenu.map((item) => {
              const isSelected = formData.selectedDishes.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleDish(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between p-3 rounded-lg border text-left transition-colors",
                    isSelected
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/30"
                  )}
                >
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.weight}</p>
                  </div>
                  <span className="text-sm font-medium text-accent shrink-0 ml-2">
                    {formatPrice(item.price)}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedDishItems.length > 0 && (
            <p className="text-sm text-muted-foreground mb-4">
              Выбрано {selectedDishItems.length} позиций на{" "}
              {formatPrice(selectedDishItems.reduce((a, b) => a + b.price, 0))}
            </p>
          )}
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={goBack}>
              Назад
            </Button>
            <Button onClick={goNext}>Далее</Button>
          </div>
        </AnimatedSection>
      )}

      {/* Step 4: Details */}
      {step === 3 && (
        <AnimatedSection>
          <h3 className="font-heading text-2xl font-bold mb-6">Дополнительные детали</h3>
          <div className="space-y-6 max-w-lg">
            <div>
              <label className="text-sm font-medium mb-2 block">Пожелания</label>
              <Textarea
                id="wishes-textarea"
                placeholder="Расскажите о ваших пожеланиях к мероприятию..."
                rows={4}
                defaultValue={formData.wishes}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Декор столов</p>
                  <p className="text-xs text-muted-foreground">Цветы, свечи, текстиль</p>
                </div>
                <Switch id="switch-deco" defaultChecked={formData.needDecoration} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Аренда оборудования</p>
                  <p className="text-xs text-muted-foreground">Мобильная кухня, маркизы</p>
                </div>
                <Switch id="switch-equip" defaultChecked={formData.needEquipment} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Фото и видеосъёмка</p>
                  <p className="text-xs text-muted-foreground">Профессиональный оператор</p>
                </div>
                <Switch id="switch-photo" defaultChecked={formData.needPhoto} />
              </div>
            </div>
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={goBack}>
                Назад
              </Button>
              <Button onClick={handleStep4Next}>Далее</Button>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Step 5: Contact */}
      {step === 4 && (
        <AnimatedSection>
          <h3 className="font-heading text-2xl font-bold mb-6">Контактные данные</h3>
          <Form {...step5Form}>
            <form className="space-y-6 max-w-lg">
              <FormField
                control={step5Form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ваше имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван Иванов" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step5Form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input placeholder="+7 (999) 123-45-67" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step5Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={step5Form.control}
                name="contactPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Предпочтительный способ связи</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите способ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="phone">Телефон</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <h4 className="font-medium mb-2">Итого:</h4>
                <p>
                  <span className="text-muted-foreground">Тип:</span>{" "}
                  {eventTypes.find((e) => e.value === formData.eventType)?.label}
                </p>
                <p>
                  <span className="text-muted-foreground">Дата:</span> {formData.date} в{" "}
                  {formData.time}
                </p>
                <p>
                  <span className="text-muted-foreground">Гости:</span> {formData.guestCount}
                </p>
                <p>
                  <span className="text-muted-foreground">Формат:</span>{" "}
                  {serviceFormats.find((f) => f.value === formData.serviceFormat)?.label}
                </p>
                <p>
                  <span className="text-muted-foreground">Пакет:</span>{" "}
                  {pricingPackages.find((p) => p.id === formData.packageId)?.name}
                </p>
                {selectedDishItems.length > 0 && (
                  <p>
                    <span className="text-muted-foreground">Блюд выбрано:</span>{" "}
                    {selectedDishItems.length}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={goBack}>
                  Назад
                </Button>
                <Button type="button" onClick={handleFinalSubmit}>
                  Отправить заявку
                </Button>
              </div>
            </form>
          </Form>
        </AnimatedSection>
      )}
    </div>
  );
}