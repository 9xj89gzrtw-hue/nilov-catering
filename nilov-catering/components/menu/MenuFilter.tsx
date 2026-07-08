"use client";

import { cn } from "@/lib/utils";
import { menuCategories, menuTypeFilters } from "@/lib/data";

interface MenuFilterProps {
  activeCategory: string;
  activeType: string;
  onCategoryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function MenuFilter({
  activeCategory,
  activeType,
  onCategoryChange,
  onTypeChange,
}: MenuFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {menuCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0",
              activeCategory === cat.value
                ? "bg-accent text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {menuTypeFilters.map((t) => (
          <button
            key={t.value}
            onClick={() => onTypeChange(t.value)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 border",
              activeType === t.value
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/50"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}