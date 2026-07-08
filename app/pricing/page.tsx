"use client";

import { useState, useCallback } from "react";
import { pricingPackages, menuItems } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AnimatedSection from "@/components/common/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download } from "lucide-react";
import Link from "next/link";
import { pdf } from "@react-pdf/renderer";
import MenuPDFGenerator from "@/components/menu/MenuPDFGenerator";

export default function PricingPage() {
  const [downloadingPkg, setDownloadingPkg] = useState<string | null>(null);

  const handleDownloadPackagePDF = useCallback(async (pkgId: string) => {
    const pkg = pricingPackages.find((p) => p.id === pkgId);
    if (!pkg || !pkg.includes) return;

    setDownloadingPkg(pkgId);
    try {
      const items = pkg.includes.map((id) => {
        const mi = menuItems.find((m) => m.id === id);
        return {
          name: mi?.name || id,
          weight: mi?.weight || "",
          price: mi?.price || 0,
          quantity: 1,
        };
      }).filter(i => i.price > 0);

      const blob = await pdf(
        <MenuPDFGenerator
          items={items}
          total={items.reduce((sum, i) => sum + i.price * i.quantity, 0)}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nilov-catering-${pkgId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setDownloadingPkg(null);
  }, []);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Цены", href: "/pricing" },
  ];

  return (
    <main className="pb-20 md:pb-0">
      <div className="bg-primary py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Пакеты и цены</h1>
          <p className="text-primary-foreground/70 text-lg">Выберите подходящий пакет для вашего мероприятия</p>
        </div>
      </div>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {pricingPackages.map((pkg, i) => (
              <AnimatedSection key={pkg.id} delay={i * 0.1}>
                <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl ${pkg.isPopular ? "border-accent border-2 relative" : "border-border hover:border-accent/30"}`}>
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-accent text-white shadow-md">Популярный выбор</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-heading text-2xl">{pkg.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex-1">
                    <div className="mb-2">
                      {pkg.pricePerPerson > 0 ? (
                        <span className="text-3xl font-bold text-accent">{formatPrice(pkg.pricePerPerson)}<span className="text-base font-normal text-muted-foreground">/чел</span></span>
                      ) : (
                        <span className="text-3xl font-bold text-accent">По запросу</span>
                      )}
                    </div>
                    {pkg.minGuests && (
                      <p className="text-xs text-muted-foreground mb-4">от {pkg.minGuests} гостей</p>
                    )}
                    <ul className="space-y-2.5 text-left mt-4">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                    {pkg.includes && pkg.includes.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => handleDownloadPackagePDF(pkg.id)}
                        disabled={downloadingPkg === pkg.id}
                      >
                        <Download className="w-4 h-4" />
                        {downloadingPkg === pkg.id ? "Создание PDF..." : "Скачать меню (PDF)"}
                      </Button>
                    )}
                    <Link href="/quote" className="w-full">
                      <Button className="w-full" variant={pkg.isPopular ? "default" : "outline"}>
                        Заказать
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}