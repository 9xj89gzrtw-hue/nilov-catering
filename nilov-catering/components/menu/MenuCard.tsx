"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronDown } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import type { MenuItem } from "@/lib/data";

interface MenuCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 border-border">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          placeholder="empty"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.isPopular && (
            <Badge className="bg-accent text-white text-xs">Популярное</Badge>
          )}
          {item.isNew && (
            <Badge variant="outline" className="bg-card/90 text-foreground text-xs">
              Новинка
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {item.isVegetarian && (
            <span
              className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center"
              title="Вегетарианское"
            >
              <Leaf className="w-3.5 h-3.5 text-white" />
            </span>
          )}
          {item.isGlutenFree && (
            <span
              className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-[10px] text-white font-bold"
              title="Без глютена"
            >
              БГ
            </span>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading text-lg font-bold leading-tight">
            {item.name}
          </h3>
          <span className="text-accent font-bold whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{item.weight}</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-accent hover:underline flex items-center gap-0.5"
          >
            БЖУ
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform",
                expanded && "rotate-180"
              )}
            />
          </button>
        </div>
        {expanded && (
          <div className="mt-2 pt-2 border-t border-border grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
            <div>
              <span className="block font-medium text-foreground">
                {item.calories}
              </span>
              ккал
            </div>
            <div>
              <span className="block font-medium text-foreground">
                {item.proteins}г
              </span>
              белки
            </div>
            <div>
              <span className="block font-medium text-foreground">
                {item.fats}г
              </span>
              жиры
            </div>
            <div>
              <span className="block font-medium text-foreground">
                {item.carbs}г
              </span>
              углеводы
            </div>
          </div>
        )}
        {onAdd && (
          <Button
            size="sm"
            variant="outline"
            className="w-full mt-3"
            onClick={() => onAdd(item)}
          >
            Добавить в моё меню
          </Button>
        )}
      </CardContent>
    </Card>
  );
}