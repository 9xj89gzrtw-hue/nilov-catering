import { ImageResponse } from "next/og";

// ============================================
// DESIGN TOKENS — OG Image Brand Colors
// ============================================

/** Light cream background */
const OG_BG_START = "#FAF7F2";
/** Warm cream background end */
const OG_BG_END = "#F2ECE3";
/** Primary dark text color */
const OG_TEXT_PRIMARY = "#1C1815";
/** Secondary text color */
const OG_TEXT_SECONDARY = "#4A423B";
/** Gold accent color */
const OG_ACCENT_GOLD = "#8A6D3B";
/** Brighter gold for highlights */
const OG_ACCENT_BRIGHT = "#B08D57";

/** OG Image dimensions (standard OpenGraph size: 1200x630) */
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** OG Image size export for Next.js ImageResponse */
export const size = { width: OG_WIDTH, height: OG_HEIGHT };
export const alt = "NiloV Catering — Кейтеринг под ключ в Санкт-Петербурге";
export const contentType = "image/png";

// Typography constants
const TITLE_FONT_SIZE = 72;
const SUBTITLE_FONT_SIZE = 28;
const TAGLINE_FONT_SIZE = 24;
const STATS_FONT_SIZE = 22;

// Style objects for OG image
const TITLE_STYLE = {
  fontSize: TITLE_FONT_SIZE,
  fontWeight: 500,
  color: OG_TEXT_PRIMARY,
  marginBottom: 20,
};
const SUBTITLE_STYLE = {
  fontSize: SUBTITLE_FONT_SIZE,
  color: OG_TEXT_SECONDARY,
  fontFamily: "system-ui",
  marginBottom: 10,
};
const TAGLINE_STYLE = {
  fontSize: TAGLINE_FONT_SIZE,
  color: OG_ACCENT_GOLD,
  fontFamily: "system-ui",
  marginBottom: 10,
};
const STATS_STYLE = { fontSize: STATS_FONT_SIZE, color: OG_ACCENT_BRIGHT, fontFamily: "system-ui" };

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(135deg, ${OG_BG_START} 0%, ${OG_BG_END} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={TITLE_STYLE}>NiloV Catering</div>
      <div style={SUBTITLE_STYLE}>Кейтеринг под ключ в Санкт-Петербурге</div>
      <div style={TAGLINE_STYLE}>Фуршет · Банкет · Кофе-брейк · Доставка</div>
      <div style={STATS_STYLE}>С 2007 года · 3 000+ событий · 4.8/5 по 27 отзывам</div>
    </div>,
    { ...size }
  );
}
