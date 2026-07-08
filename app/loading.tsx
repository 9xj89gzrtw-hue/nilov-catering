import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-border animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-accent/20 animate-pulse" />
          </div>
          <Sparkles className="absolute inset-0 m-auto w-5 h-5 text-accent animate-pulse" />
        </div>
        <p className="text-muted-foreground text-sm">Готовим вкусности...</p>
      </div>
    </div>
  );
}