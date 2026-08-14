import type { Metadata } from "next";
import WhyUsContent from "./WhyUsContent";

// OpenGraph image dimensions (standard OG size) (/* eslint-disable-line -- OG dimensions */)
const OG_IMAGE_WIDTH = 1200; /* eslint-disable-line -- OG size */
const OG_IMAGE_HEIGHT = 800; /* eslint-disable-line -- OG size */

export const metadata: Metadata = {
  alternates: { canonical: "/why-us", languages: { ru: "/why-us", "x-default": "/why-us" } },
  title: "Почему мы",
  description:
    "NiloV Catering — кейтеринг в Петербурге с 2007 года. 27 отзывов · 4.8/5. Дмитрий Нилов (шеф), команда 40+ чел. Ресторанное качество по реальной цене. Фото команды, кухни, кейсов с реальных событий.",
  openGraph: {
    title: "Почему NiloV Catering — 19 лет на кухне Петербурга",
    description:
      "Шеф Дмитрий Нилов, команда 40+ человек, 3 000+ событий. ХАССП, 14 аллергенов, халяль СМР, БГ <20 ppm. Фото команды, кухни и кейсов с реальных событий.",
    images: [
      {
        url: "/images/catering/chef-01.jpg",
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: "Шеф-повар NiloV Catering",
      },
    ],
  },
};

export default function WhyUsPage() {
  return <WhyUsContent />;
}
