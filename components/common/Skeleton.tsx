"use client";

import { motion } from "framer-motion";

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-muted rounded-lg ${className || ""}`}
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center space-y-6">
        <SkeletonPulse className="h-4 w-48 mx-auto rounded-full" />
        <SkeletonPulse className="h-14 w-96 max-w-[80vw] mx-auto" />
        <SkeletonPulse className="h-14 w-72 max-w-[60vw] mx-auto" />
        <SkeletonPulse className="h-5 w-64 max-w-[50vw] mx-auto" />
        <div className="flex gap-4 justify-center mt-8">
          <SkeletonPulse className="h-12 w-48 rounded-xl" />
          <SkeletonPulse className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border/50 overflow-hidden">
      <SkeletonPulse className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <SkeletonPulse className="h-5 w-3/4" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-2/3" />
        <SkeletonPulse className="h-9 w-full rounded-lg mt-2" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TextSkeleton() {
  return (
    <div className="space-y-3">
      <SkeletonPulse className="h-4 w-full" />
      <SkeletonPulse className="h-4 w-5/6" />
      <SkeletonPulse className="h-4 w-4/6" />
    </div>
  );
}