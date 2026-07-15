"use client";

import { cn } from "@/lib/utils";
import { galleryCategories } from "@/lib/data";

interface GalleryFilterProps {
  active: string;
  onChange: (value: string) => void;
}

export default function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {galleryCategories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0",
            active === cat.value
              ? "bg-accent text-white"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}