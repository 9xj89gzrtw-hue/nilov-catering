import type { Metadata } from "next";
import EnLangFix from "./EnLangFix";

// OpenGraph image dimensions (standard OG size) (/* eslint-disable-line -- OG dimensions */)
const OG_IMAGE_WIDTH = 1200; /* eslint-disable-line -- OG size */
const OG_IMAGE_HEIGHT = 630; /* eslint-disable-line -- OG size */

export const metadata: Metadata = {
  title: "Catering in St. Petersburg — from 390 ₽/guest",
  description:
    "Restaurant-quality catering for any event in St. Petersburg since 2007. Buffet, banquet, coffee break, chef-at-home. English-speaking manager.",
  robots: { index: false, follow: true }, // English landing is a translation preview, not the primary site
  alternates: { canonical: "/en", languages: { ru: "/", en: "/en", "x-default": "/" } },
  openGraph: {
    locale: "en_US",
    title: "Catering in St. Petersburg — from 390 ₽/guest",
    description: "Restaurant-quality catering for any event in St. Petersburg since 2007.",
    images: [
      {
        url: "/opengraph-image",
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "NiloV Catering — Catering in St. Petersburg",
      },
    ],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EnLangFix />
      {children}
    </>
  );
}
