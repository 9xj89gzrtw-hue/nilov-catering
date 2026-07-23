# 01 — VISUAL STYLE GUIDE (Asset Pipeline Bible)

> **Source of truth for every photo, video, animation, illustration on NiloV Catering.**
> Derived from: `01_VISUAL_DNA.md`, `06_TOKENS.md`, `04_BLOCKS.md`, `17_MEDIA_DIRECTION.md`,
> benchmark research (Proof of the Pudding, Queen of Hearts, Drinkit, Awwwards Hotel/Restaurant winners).

---

## 1. CORE VISUAL DNA (Non-Negotiable)

| Property | Value | Rationale |
|---|---|---|
| **Background** | `#FAF7F2` (Warm Ivory) | Light, editorial, "magazine about food" feel |
| **Primary Text** | `#1C1815` (Deep Espresso) | 16.5:1 contrast on ivory → AAA |
| **Accent Fill** | `#B08D57` (Champagne Gold) | CTA backgrounds, badges, dividers — **never text** |
| **Accent Text** | `#8A6D3B` (Deep Gold) | Overlines, accent links — 4.54:1 on ivory → AA |
| **Secondary Text** | `#4A423B` (Warm Grey) | Captions, muted — 8.9:1 on ivory → AAA |
| **Headlines** | Cormorant 300–700, italic for accents | Renaissance old-style, full Cyrillic, distinctive |
| **Body** | Inter 400/500/600 | Clean, readable, system-friendly |
| **Numbers/Prices** | JetBrains Mono | Technical precision, menu clarity |

**Mood**: "Tasty & tidy food journal" — not "dark luxury restaurant".
**Motion Philosophy**: Drinkit app — "every food photo is alive by default" (Ken Burns, hover→video, autoplay hero).

---

## 2. LIGHTING & COLOR GRADING (Unified Look)

### 2.1 Lighting Style: **Soft Natural Editorial**
- **Key light**: Large diffused window/daylight (North light or 6×6 silk)
- **Fill**: White bounce card opposite key (1:3 ratio max)
- **No**: Harsh direct sun, ring-light catchlights, studio strobe "pop"
- **Mood**: Morning/late afternoon warmth, not clinical

### 2.2 Color Grading Pipeline (Every Asset)
```
RAW → White Balance (5200K ±200K) → 
Exposure +0.15 → Highlights -20 → Shadows +15 →
Warmth +10 (toward amber) → Saturation -5 (desaturate slightly) →
Split Toning: Highlights +5 Hue 45 / Sat 8, Shadows +3 Hue 25 / Sat 5 →
Curve: Slight S-curve (lift blacks to 8, protect highlights) →
Output: sRGB, 8-bit for web
```
**LUT Reference**: Custom "NiloV Ivory" LUT (create once, apply to all).

### 2.3 Forbidden Looks
- ❌ Cool/blue shadows
- ❌ Vignetting (unless geometric frame mask)
- ❌ HDR "Instagram" over-processing
- ❌ Selective color (B&W with one color)
- ❌ Artificial "golden hour" gels on non-golden-hour shots

---

## 3. COMPOSITION RULES BY ASSET TYPE

### 3.1 Hero Video/Poster (Home + Event Pages)
| Parameter | Spec |
|---|---|
| **Aspect** | 16:9 (video), 16:9 or 2.39:1 (poster) |
| **Camera** | Eye-level or slight low-angle (heroic but not towering) |
| **Subject** | Banquet atmosphere: guests interacting, servers pouring, steam rising, candlelight flicker |
| **Depth** | Shallow DoF (f/2.8–f/4) on foreground action; background bokeh |
| **Motion** | **Seamless 10–15s loop**: slow dolly/pan, no hard cuts. First frame = poster. |
| **Text Safe Zone** | Center 60% vertical, 70% horizontal (gradient overlay area) |
| **Color** | Warm candles/gold accents visible; ivory table linens |

### 3.2 Dish Cards (Menu, Constructor, Preview)
| Parameter | Spec |
|---|---|
| **Aspect** | **Square (1:1)** for grid; **4:3** for portrait feature |
| **Camera Angles** (choose per dish): |
|  • Top-down (90°) | Canapés, tartlets, platters, dessert arrays |
|  • 45° (three-quarter) | Burgers, plated mains, glasses, layered desserts |
|  • Hero (15–20°) | Statement dishes (whole fish, carved meat, show stations) |
| **Depth of Field** | f/4–f/5.6: hero dish sharp, garnish/context slightly soft |
| **Styling** | **Catering portions** (not restaurant micro-plating). Show real portions). Real servingware NiloV uses. |
| **Background** | Clean: ivory linen, matte stone, warm wood — **never busy patterns** |
| **Geometric Frame** (CSS mask): |
|  • **Circle** | `border-radius: 50%` + `object-fit: cover` |
|  • **Diamond** | `clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%)` |
|  • **Frame** | 1px gold border `#B08D57` + Elevation-1 shadow |
|  • **Object Position** | `--frame-object-pos: 50% 40%` (focus on plate center, not rim) |

### 3.3 Event/Gallery Photos
| Parameter | Spec |
|---|---|
| **Aspect** | 4:3 (video) or 3:2 (photo) |
| **Mix** | 60% wide (venue atmosphere), 30% detail (table setting, floral, station), 10% candid (guests enjoying) |
| **People** | Natural, unposed, diverse. **No stock "model" looks.** Blur faces if no release (gallery only). |
| **Lighting** | Available light + subtle fill. Venue mood preserved. |

### 3.4 Trust/Team/Kitchen Photos
| Parameter | Spec |
|---|---|
| **Team** | Environmental portraits (in kitchen, at event, with equipment). Warm, approachable. |
| **Kitchen/Process** | Action shots: plating, vacuum sealing, torching, pouring. Steam/motion visible. |
| **Equipment** | Hero shots of signature gear (sous-vide, combi oven, copper pots). Clean background. |

---

## 4. VIDEO TECHNICAL SPECS

### 4.1 Hero Background Video (Autoplay Loop)
| Spec | Value |
|---|---|
| **Format** | WebM (VP9) + MP4 (H.264 fallback) |
| **Resolution** | 1920×1080 (max); poster 1920×1080 WebP |
| **Duration** | 10–15 seconds (seamless loop) |
| **Bitrate** | ≤2 Mbps (target 1.5 Mbps) |
| **File Size** | **< 5 MB** (critical for LCP <1.2s) |
| **Frame Rate** | 24 or 30 fps (match source) |
| **Audio** | None (muted) |
| **Loop** | Perfect seam: last frame = first frame |
| **Poster** | First frame, WebP, 85% quality, `fetchpriority="high"` |
| **Preload** | `preload="none"` (mobile), `preload="metadata"` (desktop Wi-Fi) |
| **Autoplay Logic** | Desktop Wi-Fi only; mobile 4G = poster only (see `04_BLOCKS` B6) |

### 4.2 Dish Hover Videos (5s Loop)
| Spec | Value |
|---|---|
| **Format** | WebM (VP9) primary; MP4 fallback |
| **Resolution** | 720×720 (square) or 960×720 (4:3) |
| **Duration** | **Exactly 5.0s** (seamless) |
| **Bitrate** | ≤1 Mbps |
| **File Size** | **< 500 KB** each |
| **Content** | Single action: pour, sprinkle, torch, steam, cut, lift lid, assemble |
| **Loop Point** | Action completes → resets naturally (e.g., pour ends, bottle returns) |
| **Background** | Same surface as hero photo (consistent) |
| **Preload** | `preload="none"` — load on hover only |

### 4.3 Section/Event Videos (Below Fold)
| Spec | Value |
|---|---|
| **Format** | WebM + MP4 |
| **Resolution** | 1280×720 max |
| **Duration** | 8–12s loop |
| **Facade** | Poster + large play button (≥44px) |
| **Load Trigger** | Click only (never autoplay below fold) — `preload="none"` |

---

## 5. ANIMATION & MOTION SYSTEM

### 5.1 Timing & Easing (Global)
| Motion | Duration | Easing |
|---|---|---|
| **Reveal (fade+slide)** | 400ms | `[0.22, 1, 0.36, 1]` |
| **Stagger (per item)** | 80ms delay | same |
| **Ken Burns (hover)** | 600ms | `easeOut` (cubic-bezier 0.25, 0.46, 0.45, 0.94) |
| **Scale (card hover)** | 200ms | `easeOut` |
| **Text clip-path wipe** | 800ms total | per-word stagger 60ms |
| **Page transition** | 350ms | clip-path/blur |
| **Count-up numbers** | 800ms | spring (damping 15, stiffness 120) |
| **Marquee (TrustBar)** | 30s/loop | linear, pause on hover/focus |

### 5.2 Component Motion Patterns

| Component | Motion | Reduced-Motion Fallback |
|---|---|---|
| **Hero Video** | Ken Burns (1.0→1.08) + opacity crossfade | Static poster, no Ken Burns |
| **Hero H1** | Clip-path word wipe | Fade in |
| **PhotoAliveCard** | Hover→video crossfade (350ms) + Ken Burns fallback | Static image, no zoom |
| **Event/Format Cards** | Scale 1.05 + border gold + image scale 1.05 | Border color only |
| **Calculator/Constructor** | Count-up spring, magnetic CTA | Instant value, no magnetic |
| **TrustBar Marquee** | Continuous translateX | Static, pause on hover |
| **Page Transitions** | AnimatePresence clip-path | Instant swap |
| **Scroll Progress** | TransformX scale | Static at current position |

### 5.3 Reduced Motion Gate (Mandatory)
```tsx
const reducedMotion = useReducedMotion();
// Every Framer Motion variant:
transition: reducedMotion ? { duration: 0 } : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
// Lenis: destroy() on reduced-motion
// Marquee: pause animation
// Ken Burns: disable whileHover scale
```

---

## 6. ICON & ILLUSTRATION STYLE

### 6.1 Icons
- **Style**: Outline, 2px stroke, rounded caps/joins
- **Color**: `--color-gold-text` `#8A6D3B` (on ivory) / `--color-gold-text-on-secondary` `#6E5631` (on cream)
- **Size**: 20×20 base (1.25rem), scales with text
- **Set**: Custom (not Feather/Lucide) — consistent weight
- **Key Icons**: Menu categories, allergens, formats, social (VK, WA, TG), UI (chevron, close, check, phone, calendar)

### 6.2 Illustrations (Empty States, Onboarding, Seasonal)
- **Style**: Line art + single gold accent fill, hand-drawn feel
- **Palette**: Ink lines `#1C1815`, Gold accent `#B08D57` (fill only)
- **Weight**: 1.5px stroke, organic imperfect lines
- **Subjects**: Abstract food motifs (wheat, fork/knife, plate, glass, leaf), not literal dishes
- **Usage**: Empty menu, no events, 404, onboarding steps, seasonal promo

---

## 7. ASSET INVENTORY & PRODUCTION CHECKLIST

### 7.1 Required Assets by Block (from `04_BLOCKS.md` + `app/page.tsx`)

| Block | Asset Type | Qty | Spec Ref | Status |
|---|---|---|---|---|
| **HeroBlock** | Hero video (WebM/MP4) | 1 | §4.1 | ⬜ placeholder only |
| | Hero poster (WebP) | 1 | §4.1 | ⬜ SVG placeholder |
| **HeroExtras** | Format mini-videos | 3 | §4.2 | ⬜ |
| **EventTypeSelector** | Event cover photos | 6 | §3.3 | ⬜ SVG placeholders |
| **FormatShowcase** | Format hero photos | 3 | §3.1 | ⬜ SVG placeholders |
| **MenuPreview** | Category covers | 4 | §3.2 | ⬜ SVG placeholders |
| **TrustBar** | Client logos (SVG) | 8–12 | §6.1 | ⬜ |
| **ProcessSteps** | Step illustrations | 4–5 | §6.2 | ⬜ |
| **TestimonialsCarousel** | Video testimonials | 3–5 | §4.3 | ⬜ |
| | Client photos | 3–5 | §3.4 | ⬜ |
| **GalleryTeaser** | Gallery photos | 6 | §3.3 | ⬜ SVG placeholders |
| **HomeVideoShowcase** | Event recap videos | 4–6 | §4.3 | ⬜ |
| **Menu Catalog** (all formats) | **Dish photos** | **78** | §3.2 | ⬜ |
| | **Dish hover videos** | **78** | §4.2 | ⬜ |
| **Constructor** | Station/process photos | 6–8 | §3.4 | ⬜ |
| **Seasonal** | Seasonal hero + dish | 4×2 | §3.1/3.2 | ⬜ |
| **Team** | Team portraits | 6–10 | §3.4 | ⬜ |
| **Kitchen/Process** | Action shots | 8–10 | §3.4 | ⬜ |
| **TrustProof** | Certificate/badge photos | 5–8 | §3.4 | ⬜ |
| **Icons** | Full icon set | 40+ | §6.1 | ⬜ |
| **Illustrations** | Empty states/onboarding | 8–10 | §6.2 | ⬜ |

**Total**: ~200+ photo/video assets + icons + illustrations

### 7.2 Production Priority Order
1. **P0 (Launch Blockers)**: Hero video+poster, 12 hero dish photos+videos (4 formats × 3 tiers), TrustBar logos
2. **P1 (Core Experience)**: All 78 dish photos, EventTypeSelector covers (6), FormatShowcase (3)
3. **P2 (Rich Experience)**: 78 dish hover videos, GalleryTeaser (6), HomeVideoShowcase (4)
4. **P3 (Polish)**: Team, Kitchen, Process, Seasonal, Illustrations, Icons

---

## 8. SOURCING STRATEGY

### 8.1 Real Photography (Preferred)
| Source | Use For | Notes |
|---|---|---|
| **NiloV's own archive** | All dish/event/kitchen/team | Highest priority — authentic |
| **Professional food photographer (hired)** | Hero, hero dishes, key events | 1-day shoot: 78 dishes styled + hero video |
| **Venue partners** | Event venue photos | With permission/releases |
| **Client-provided (approved)** | Testimonials, event candids | Fact-gate: `status: 'verified'` only |

### 8.2 Licensed Stock (Fallback Only)
| Library | Search Terms | Quality Gate |
|---|---|---|
| **Adobe Stock / Getty** | "catering banquet natural light", "canapé top-down", "food plating 45 degree" | Editorial style only; reject "studio white bg" |
| **Unsplash / Pexels** | Same + "warm tone" | Curate heavily; color-grade to match |

### 8.3 AI Generation (Controlled Gaps Only)
**Tool**: Midjourney v6 / DALL-E 3 / Flux
**Prompt Template** (enforce consistency):
```
[Dish name], [angle: top-down|45-degree|hero], catering portion on [ivory linen|matte stone|warm wood],
soft natural window light from left, shallow depth of field f/4,
warm color grading (amber highlights, lifted blacks),
professional food photography, 8k, --ar 1:1 --style raw --v 6
```
**Negative Prompt**: `dark background, black background, studio strobe, ring light, oversaturated, HDR, vignette, selective color, micro portion, restaurant plating, garnish overload, busy pattern, watermark, text, logo`

**Post-Process**: Apply NiloV LUT (§2.2), resize to spec, verify on ivory bg.

---

## 9. PERFORMANCE & DELIVERY

### 9.1 Image Optimization Pipeline
```
Source (RAW/ProRes) → 
Crop to aspect → 
Color grade (LUT) → 
Resize: 1920w / 1280w / 720w / 480w (responsive) → 
Encode: WebP (85%) + AVIF (70%) + JPEG fallback → 
Blur-up placeholder (10px, base64) → 
Manifest: { srcSet, sizes, poster, blurDataURL }
```

### 9.2 Video Optimization Pipeline
```
Source (ProRes) → 
Trim to exact loop → 
Color grade (LUT) → 
Encode: WebM VP9 (target bitrate) + MP4 H.264 → 
Poster: first frame WebP → 
Verify: seamless loop, file size, mobile playback
```

### 9.3 Loading Strategy
| Asset | Loading |
|---|---|
| Hero poster | `fetchpriority="high"`, preload |
| Hero video | `preload="none"` (mobile), `preload="metadata"` (desktop Wi-Fi) |
| Dish photos (above fold) | `loading="eager"`, blur-up |
| Dish photos (below fold) | `loading="lazy"`, blur-up |
| Hover videos | Load on hover (`preload="none"`) |
| Below-fold videos | Facade + click to load |
| Icons/Illustrations | Inline SVG or font subset |

---

## 10. VALIDATION CHECKLIST (Per Asset)

Before any asset goes to production:
- [ ] **Color**: Matches NiloV palette on ivory `#FAF7F2` bg (test in Figma/browser)
- [ ] **Lighting**: Soft natural, consistent direction (left/right per composition)
- [ ] **Composition**: Correct angle for type, geometric frame safe zone respected
- [ ] **Styling**: Catering portions, real NiloV serveware, no restaurant micro-plating
- [ ] **Technical**: Correct format, resolution, file size, seamless loop (video)
- [ ] **Accessibility**: Meaningful `alt` text (dish: "Salmon canape on rye with dill cream"), not filename
- [ ] **Performance**: WebP/AVIF delivered, blur-up placeholder exists, responsive sizes
- [ ] **Context**: Matches exact section purpose (hero vs card vs gallery)
- [ ] **Fact-Gate**: `status: 'verified'` or visible disclaimer if `pending`

---

## 11. IMPLEMENTATION NOTES FOR DEVS

### 11.1 PhotoAliveCard Enhancements Needed
```tsx
// Add geometric frame support
type FrameShape = 'circle' | 'diamond' | 'rounded-xl';
<PhotoAliveCard frame="circle" objectPosition="50% 40%" ... />

// Add blur-up placeholder
blurDataURL: string; // base64 10px WebP
```

### 11.2 CMS Fields (Sanity/Strapi)
```typescript
// Dish
photo: { asset: ImageAsset; alt: string; blurDataURL: string; }
hoverVideo?: { asset: VideoAsset; poster: ImageAsset; duration: 5; }
frameShape: 'circle' | 'diamond' | 'rounded-xl';
objectPosition: '50% 40%';

// Event
coverImage: { asset; alt; blurDataURL; }
gallery: { asset; alt; caption; status }[];

// VideoClip
videoUrl: string; // Rutube/self-host
poster: ImageAsset;
transcript: string; // A11y mandatory
```

### 11.3 Global CSS Additions (globals.css)
```css
/* Geometric frames */
.frame-circle { border-radius: 50%; clip-path: none; }
.frame-diamond { clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%); border-radius: 0; }
.frame-object-pos { object-position: var(--frame-object-pos, 50% 40%); }

/* Blur-up */
.blur-up { filter: blur(20px) scale(1.1); transition: filter 0.4s ease-out; }
.blur-up.loaded { filter: none; }

/* Focus ring (already in 06_TOKENS) */
*:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }
```

---

## 12. NEXT ACTIONS

1. **Create NiloV LUT** (DaVinci Resolve / Lightroom) from §2.2 specs
2. **Audit NiloV photo archive** — tag usable assets, identify gaps
3. **Hire food photographer** — 1-day shoot brief with this guide
4. **Build icon set** (Figma → SVG → React components)
5. **Generate AI placeholders** for P2/P3 gaps while real assets produced
6. **Implement CMS fields** for all media types
7. **Add frameShape + blurDataURL** to PhotoAliveCard
8. **Performance test** — LCP <1.2s, INP <200ms on 4G throttle

---

*This guide is living. Update when new blocks added or visual DNA evolves. Every asset must pass §10 checklist.*