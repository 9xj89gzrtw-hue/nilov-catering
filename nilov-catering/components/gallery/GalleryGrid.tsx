"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/data";

interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        Изображения не найдены
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((image, index) => (
        <button
          key={image.id}
          onClick={() => onImageClick(index)}
          className="relative group w-full break-inside-avoid block"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-lg",
              index % 3 === 0 ? "aspect-[4/3]" : index % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              placeholder="empty"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
              <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{image.alt}</p>
                <p className="text-white/70 text-xs">{image.categoryLabel}</p>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}