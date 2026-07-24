/** Маппинг имён иконок (string) → Lucide React компоненты */
import {
  Calendar, Sparkles, Coffee, ShieldCheck, FileText, Truck, ChefHat, ScrollText, ClipboardCheck, Flag,
  Quote, GraduationCap, Users, Star, LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Calendar, Sparkles, Coffee, ShieldCheck, FileText, Truck, ChefHat, ScrollText, ClipboardCheck, Flag,
  Quote, GraduationCap, Users, Star,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || ShieldCheck; // fallback
}