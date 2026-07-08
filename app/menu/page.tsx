"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, X, Download, FileText, Package } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import MenuCard from "@/components/menu/MenuCard";
import MenuPDFGenerator from "@/components/menu/MenuPDFGenerator";
import { MenuBuilderProvider, useMenuBuilder } from "@/components/menu/MenuBuilder";
import PriceCalculator from "@/components/quote/PriceCalculator";
import { menuItems, pricingPackages } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { pdf } from "@react-pdf/renderer";

function MenuBuilderSheet() {
  const { selectedItems, updateQuantity, removeItem, clearAll, getTotal, totalCount, addItem } =
    useMenuBuilder();
  const [guestCount, setGuestCount] = useState(10);
  const [downloading, setDownloading] = useState(false);

  const total = getTotal();
  const perGuest = guestCount > 0 ? total / guestCount : total;

  const handleDownloadPDF = useCallback(async () => {
    if (selectedItems.size === 0) return;
    setDownloading(true);
    try {
      const items = Array.from(selectedItems.entries()).map(([, { item, quantity }]) => ({
        name: item.name,
        weight: item.weight,
        price: item.price,
        quantity,
      }));
      const blob = await pdf(
        <MenuPDFGenerator items={items} total={total} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nilov-catering-menyu.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setDownloading(false);
  }, [selectedItems, total]);

  return (
    <>
      <Sheet>
        <SheetTrigger
          render={
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="fixed bottom-20 right-4 z-30 md:bottom-6 md:right-6"
            />
          }
        >
            <Button className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30 rounded-full h-14 px-5 gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">{totalCount}</span>
            </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[420px] flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-accent" />
              Моё меню
              {totalCount > 0 && (
                <Badge className="bg-accent text-white text-xs ml-auto">{totalCount} поз.</Badge>
              )}
            </SheetTitle>
          </SheetHeader>

          {selectedItems.size > 0 && (
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleDownloadPDF}
                disabled={downloading}
              >
                <FileText className="w-4 h-4 mr-2" />
                {downloading ? "Создание..." : "Скачать PDF"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {selectedItems.size === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Добавьте блюда из меню</p>
                <p className="text-xs mt-1">Нажмите «Добавить» на любом блюде</p>
              </div>
            )}
            {Array.from(selectedItems.entries()).map(([id, { item, quantity }]) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.price)} x {quantity} = {formatPrice(item.price * quantity)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => updateQuantity(id, quantity - 1)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Уменьшить"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(id, quantity + 1)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                    aria-label="Увеличить"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeItem(id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors ml-1"
                    aria-label="Удалить"
                  >
                    <X className="w-3 h-3 text-destructive" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Количество гостей</span>
              <Input
                type="number"
                min={1}
                value={guestCount}
                onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
                className="w-20 h-8 text-sm text-right"
              />
            </div>
            <Separator />
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Итого за меню</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">На человека</span>
                <span className="text-accent font-bold text-lg">{formatPrice(Math.round(perGuest))}</span>
              </div>
            </div>
            <a href="/quote">
              <Button className="w-full">Оформить заявку</Button>
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const filtered = useMemo(() => {
    let items = menuItems;
    if (activeCategory !== "all") {
      items = items.filter((m) => m.category === activeCategory);
    }
    if (activeType !== "all") {
      if (activeType === "vegetarian") items = items.filter((m) => m.isVegetarian);
      else if (activeType === "gluten-free") items = items.filter((m) => m.isGlutenFree);
      else if (activeType === "new") items = items.filter((m) => m.isNew);
      else if (activeType === "popular") items = items.filter((m) => m.isPopular);
    }
    return items;
  }, [activeCategory, activeType]);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Меню", href: "/menu" },
  ];

  return (
    <MenuBuilderProvider>
      <main className="pb-20 md:pb-0">
        <div className="bg-primary py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Наше меню</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
              Авторские блюда от шеф-повара Николая Нилова. Соберите своё идеальное меню.
            </p>
          </div>
        </div>
        <Breadcrumbs items={breadcrumbs} />

        {/* Standard Package Quick Select */}
        <section className="py-8 bg-accent-light/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-accent" />
              <h2 className="font-heading text-xl font-bold">Готовые пакеты меню</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {pricingPackages.filter(p => p.id !== 'individual').map((pkg) => (
                <PackageQuickSelect key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <MenuFilter
                activeCategory={activeCategory}
                activeType={activeType}
                onCategoryChange={setActiveCategory}
                onTypeChange={setActiveType}
              />
            </AnimatedSection>
            <MenuGrid filtered={filtered} />
          </div>
        </section>
        <section id="calculator" className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <PriceCalculator />
          </div>
        </section>
        <MenuBuilderSheet />
      </main>
    </MenuBuilderProvider>
  );
}

function MenuGrid({ filtered }: { filtered: typeof menuItems }) {
  const { addItem } = useMenuBuilder();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {filtered.map((item, i) => (
        <AnimatedSection key={item.id} delay={Math.min(i * 0.05, 0.3)}>
          <MenuCard item={item} onAdd={addItem} />
        </AnimatedSection>
      ))}
    </div>
  );
}

function MenuFilter({
  activeCategory,
  activeType,
  onCategoryChange,
  onTypeChange,
}: {
  activeCategory: string;
  activeType: string;
  onCategoryChange: (v: string) => void;
  onTypeChange: (v: string) => void;
}) {
  const categories = [
    { value: "all", label: "Все" },
    { value: "zakuski", label: "Закуски" },
    { value: "goryachee", label: "Горячие блюда" },
    { value: "garniry", label: "Гарниры" },
    { value: "deserty", label: "Десерты" },
    { value: "napitki", label: "Напитки" },
    { value: "set-meny", label: "Сет-меню" },
  ];

  const types = [
    { value: "all", label: "Все" },
    { value: "popular", label: "Популярное" },
    { value: "vegetarian", label: "Вегетарианское" },
    { value: "gluten-free", label: "Без глютена" },
    { value: "new", label: "Новинки" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.value
                ? "bg-accent text-white shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => onTypeChange(t.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              activeType === t.value
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-muted-foreground hover:border-accent/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PackageQuickSelect({ pkg }: { pkg: typeof pricingPackages[number] }) {
  const { addItem, selectedItems, clearAll } = useMenuBuilder();

  const handleSelectPackage = () => {
    if (!pkg.includes || pkg.includes.length === 0) return;
    // Add all items from package (quantity 1 each)
    pkg.includes.forEach((itemId) => {
      const item = menuItems.find((m) => m.id === itemId);
      if (item) {
        // Only add if not already in cart
        if (!selectedItems.has(itemId)) {
          addItem(item);
        }
      }
    });
  };

  const isSelected = pkg.includes ? pkg.includes.every((id) => selectedItems.has(id)) : false;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSelectPackage}
      className={`flex-shrink-0 p-4 rounded-xl border-2 transition-all min-w-[200px] text-left ${
        isSelected
          ? "border-accent bg-accent/5"
          : "border-border bg-card hover:border-accent/50"
      } ${pkg.isPopular ? "ring-2 ring-accent/20" : ""}`}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-heading font-bold text-sm">{pkg.name}</h3>
        {pkg.isPopular && <Badge className="bg-accent text-white text-[10px] px-1.5 py-0">Хит</Badge>}
      </div>
      <p className="text-accent font-bold text-lg">{formatPrice(pkg.pricePerPerson)}<span className="text-xs font-normal text-muted-foreground">/чел</span></p>
      <p className="text-xs text-muted-foreground mt-1">{pkg.features.length} позиций в меню</p>
    </motion.button>
  );
}