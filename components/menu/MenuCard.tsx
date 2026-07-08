"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronDown, Plus } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem } from "@/lib/data";

interface MenuCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (onAdd) {
      onAdd(item);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 border-border/50 hover:border-accent/30 bg-card/80 backdrop-blur-sm">
      <div className="relative aspect-[4/3] overflow-hidden img-zoom">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          placeholder="empty"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.isPopular && (
            <Badge className="bg-accent text-white text-xs shadow-md shadow-accent/30">Популярное</Badge>
          )}
          {item.isNew && (
            <Badge variant="outline" className="bg-card/90 backdrop-blur-sm text-foreground text-xs border-white/30">
              Новинка
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          {item.isVegetarian && (
            <span
              className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center shadow-md"
              title="Вегетарианское"
            >
              <Leaf className="w-3.5 h-3.5 text-white" />
            </span>
          )}
          {item.isGlutenFree && (
            <span
              className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center text-[10px] text-white font-bold shadow-md"
              title="Без глютена"
            >
              БГ
            </span>
          )}
        </div>

        {/* Quick add button on hover */}
        {onAdd && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/40 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent-dark"
            onClick={handleAdd}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading text-lg font-bold leading-tight group-hover:text-accent transition-colors duration-300">
            {item.name}
          </h3>
          <span className="text-accent font-bold whitespace-nowrap">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2 leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{item.weight}</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-accent hover:text-accent-dark flex items-center gap-0.5 transition-colors"
          >
            БЖУ
            <ChevronDown
              className={cn(
                "w-3 h-3 transition-transform duration-300",
                expanded && "rotate-180"
              )}
            />
          </button>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-2 pt-2 border-t border-border/50 grid grid-cols-4 gap-2 text-center text-xs text-muted-foreground">
                <div>
                  <span className="block font-medium text-foreground">{item.calories}</span>
                  ккал
                </div>
                <div>
                  <span className="block font-medium text-foreground">{item.proteins}г</span>
                  белки
                </div>
                <div>
                  <span className="block font-medium text-foreground">{item.fats}г</span>
                  жиры
                </div>
                <div>
                  <span className="block font-medium text-foreground">{item.carbs}г</span>
                  углеводы
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {onAdd && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="sm"
              className={cn(
                "w-full mt-3 transition-all duration-300",
                added
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : "bg-accent hover:bg-accent-dark text-white shadow-md shadow-accent/20"
              )}
              onClick={handleAdd}
            >
              {added ? "Добавлено ✓" : "Добавить в моё меню"}
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}