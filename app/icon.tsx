import { ImageResponse } from "next/og";

// ============================================
// DESIGN TOKENS — Icon Brand Colors
// ============================================

/** Gold brand color from DESIGN-SYSTEM.md */
const ICON_BG_COLOR = "#B08D57";
/** Dark text color from design system */
const ICON_TEXT_COLOR = "#1C1815";
/** Icon display size */
const ICON_SIZE = 32;
/** Font size for icon letter */
const ICON_FONT_SIZE = 18;
/** Border radius for rounded corners */
const ICON_BORDER_RADIUS = 6;

export const size = { width: ICON_SIZE, height: ICON_SIZE };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: ICON_FONT_SIZE,
        background: ICON_BG_COLOR,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: ICON_TEXT_COLOR,
        borderRadius: ICON_BORDER_RADIUS,
        fontFamily: "Georgia, serif",
        fontWeight: 700,
      }}
    >
      N
    </div>,
    { ...size }
  );
}
