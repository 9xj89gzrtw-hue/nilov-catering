import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Банкет — кейтеринг в СПб — NiloV Catering" },
  description:
    "Банкетный кейтеринг в СПб: посадка за стол, официанты, классическая подача. От 3 950 ₽/гость. Свадьбы, корпоративы, юбилеи.",
  alternates: {
    canonical: "/menu/banquet",
    languages: { ru: "/menu/banquet", "x-default": "/menu/banquet" },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
