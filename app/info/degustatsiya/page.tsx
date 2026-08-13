import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Дегустация меню",
  description: "Запишитесь на бесплатную дегустацию меню для свадьбы или корпоратива.",
  alternates: { canonical: "/tasting" },
  robots: { index: false, follow: true },
};

export default function DegustatsiyaPage() {
  // 308 permanent redirect to canonical /tasting page (W94-v34: deduplicate)
  permanentRedirect("/tasting");
}
