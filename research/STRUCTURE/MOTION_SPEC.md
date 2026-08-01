# 01 — MOTION & INTERACTION SPEC (Animation System Bible)

> **Source**: `01_VISUAL_DNA.md` §4, `06_TOKENS.md`, `04_BLOCKS.md`, `17_MEDIA_DIRECTION.md`,
> Framer Motion 12 + Lenis, `prefers-reduced-motion` mandatory.

---

## 1. MOTION PRINCIPLES (Non-Negotiable)

| Principle | Rule |
|---|---|
| **Purpose First** | Every animation communicates state/feedback/hierarchy. No decoration. |
| **Respect Reduced Motion** | `useReducedMotion()` → ALL animations disabled (opacity/transform only). |
| **Stagger, Don't Stack** | Sequential reveals (80ms stagger). Never simultaneous. |
| **Physics-Based** | Spring for UI, ease-out for content, linear for loops. |
| **LCP-Safe** | Hero content visible <1.2s. Preloader ≤400ms morph. |
| **INP <200ms** | Heavy gestures (Ken Burns, parallax) lazy-load after paint. |
| **Touch-First** | Hover = progressive enhancement. Tap reveals on mobile/tablet. |

---

## 2. EASING & TIMING TOKENS (Centralized)

```ts
// lib/motion/tokens.ts
export const motionTokens = {
  // Easings
  ease: {
    standard: [0.22, 1, 0.36, 1],      // Framer default — content reveals
    spring: [0.34, 1.56, 0.64, 1],      // UI feedback (buttons, cards)
    entrance: [0.22, 1, 0.36, 1],       // Page/section entrance
    exit: [0.55, 0.055, 0.675, 0.19],   // Modals, toasts
    linear: [0, 0, 1, 1],               // Infinite loops (marquee, progress)
  },
  
  // Durations (ms)
  duration: {
    instant: 0,
    micro: 100,      // Hover/focus, tap feedback
    fast: 200,       // Tooltip, badge, small UI
    standard: 300,   // Card hover, dropdown, tab switch
    slow: 500,       // Ken Burns, section reveal, modal
    hero: 800,       // Hero text wipe, video fade
    loop: 10000,     // Marquee, slow parallax
  },
  
  // Stagger
  stagger: {
    item: 60,        // Per child in list
    section: 80,     // Per section in page
  },
  
  // Spring configs
  spring: {
    gentle: { stiffness: 120, damping: 14 },   // Cards, images
    snappy: { stiffness: 300, damping: 20 },   // Buttons, toggles
    bouncy: { stiffness: 500, damping: 18 },   // Playful (CTA, counter)
  },
} as const;
```

---

## 3. COMPONENT ANIMATION SPECS

### 3.1 HeroBlock (`components/blocks/HeroBlock.tsx`)

| Element | Animation | Trigger | Reduced Motion |
|---|---|---|---|
| Background video | `opacity 0→1` (1s) | `onCanPlayThrough` | Show poster only |
| Ken Burns (scroll) | `scale 1→1.08`, `opacity 1→0.3` | `useScroll` on section | Static at 1.0 |
| Brand tag | `fade-up` (400ms) | Mount | Immediate |
| H1 word wipe | `clip-path inset(0 100% 0 0) → inset(0)` | Mount, stagger 60ms/word | Fade only |
| Subtitle | `fade-up` (400ms, delay 150ms) | Mount | Immediate |
| Primary CTA | `fade-up` (400ms, delay 300ms) + `scale 1→1.02` hover | Mount | Immediate |
| Trust line | `fade-up` (400ms, delay 450ms) | Mount | Immediate |

**Preloader→Hero Morph** (01_VISUAL_DNA §4):
- Progress bar 0→100% (linear, ≤400ms)
- Logo scale-down + translate to Hero overline position
- Hero video begins paint at 100%
- **Reduced motion**: Instant, no morph

### 3.2 PhotoAliveCard / KenBurnsCard (`components/effects/PhotoAliveCard.tsx`)

| Variant | Desktop (hover) | Mobile/Tablet (tap) | Reduced Motion |
|---|---|---|---|
| **With video** | `onMouseEnter`: video plays, poster cross-fade 350ms | `onTouchStart`: video plays, tap elsewhere pauses | Poster static |
| **Ken Burns (CSS)** | `scale 1→1.08` (2.5s ease-out) | Tap → modal preview (separate spec) | Static 1.0 |
| **Ken Burns (Framer)** | `whileHover={{ scale: 1.08 }}` (duration 600ms, ease standard) | N/A | Static |

**Magnetic Cursor** (optional, `components/effects/MagneticButton.tsx`):
- Radius: 80px
- Spring: gentle
- Disable on `pointer: coarse`

### 3.3 Page Transitions (`app/layout.tsx` → `AnimatePresence`)

```tsx
// Route transition: clip-path wipe (not full page fade)
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ clipPath: 'inset(0 100% 0 0)' }}
    animate={{ clipPath: 'inset(0 0% 0 0)' }}
    exit={{ clipPath: 'inset(0 0% 0 100%)' }}
    transition={{ duration: 0.4, ease: motionTokens.ease.entrance }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```
- **Duration**: 400ms
- **Easing**: `entrance`
- **Reduced motion**: Instant swap (no animation)

### 3.4 Reveal on Scroll (Sections, Cards)

```tsx
// Standard reveal (used in EventTypeSelector, FormatShowcase, GalleryTeaser)
<motion.div
  initial={{ y: 24, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ duration: 0.4, ease: motionTokens.ease.standard }}
/>

// Staggered children (container)
<motion.div
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: motionTokens.stagger.item } }
  }}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {children.map((child, i) => (
    <motion.div key={i} variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
      {child}
    </motion.div>
  ))}
</motion.div>
```

### 3.5 TrustBar Marquee (`components/blocks/TrustBar.tsx` / `TrustMarquee.tsx`)

- **Technology**: CSS animation (not Framer) — smoother, no layout thrash
- **Speed**: 30s per full cycle (adjust for content width)
- **Pause**: `hover` + `focus` + `prefers-reduced-motion`
- **Implementation**:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); } /* content duplicated */
}
.marquee-inner {
  animation: marquee 30s linear infinite;
  animation-play-state: running;
}
.marquee-inner:hover,
.marquee-inner:focus-within,
@media (prefers-reduced-motion: reduce) {
  .marquee-inner { animation-play-state: paused; }
}
```

### 3.6 Calculator / Constructor Interactions

| Component | Animation | Spec |
|---|---|---|
| Guests slider | Spring count-up | `spring.bouncy`, `aria-live="polite"` on result |
| Tier selector | Radio group → scale 1→1.04 on select | `snappy` spring, focus ring |
| Addon toggle | Checkbox → checkmark draw (SVG path) | 200ms, `ease.standard` |
| LiveSummary price | Count-up (0 → target) | 600ms, `ease.standard`, `Intl.NumberFormat` |
| Step progress | Progress bar fill | 300ms per step, `ease.entrance` |

### 3.7 Microinteractions (Buttons, Links, Form)

| Element | Hover/Focus | Active (press) | Disabled |
|---|---|---|---|
| **Primary CTA** (`bg-primary`) | `scale 1.02`, `shadow-xl gold/30` | `scale 0.98` | `opacity 0.5`, no transform |
| **Secondary** (underline) | `color gold-text`, `underline-offset 4px` | `scale 0.99` | `opacity 0.4` |
| **Icon button** (WA/TG/Phone) | `scale 1.1`, `rotate 3deg` | `scale 0.95` | `opacity 0.5` |
| **Input** | `ring-2 ring-ring` (gold-text) | — | `opacity 0.5`, `cursor not-allowed` |
| **Card link** (EventType, Format) | `border-gold-text`, `scale 1.01` | `scale 0.98` | — |

**Focus Visible** (ALL interactive):
```css
*:focus-visible {
  outline: 2px solid var(--color-ring); /* #8A6D3B */
  outline-offset: 2px;
}
```

### 3.8 Loading States

| Context | Skeleton | Duration |
|---|---|---|
| Dish card grid | `aspect-square` gray pulse (`bg-muted`) | Until image `onLoad` |
| Hero video | Poster image (high priority) | Until `canPlayThrough` |
| Video hover | Poster + play icon | Until `loadedData` |
| Menu constructor | Step-by-step reveal | Per step 200ms |
| TrustBar logos | Gray blocks (aspect-auto) | Until SVG load |

---

## 4. LENIS SMOOTH SCROLL (`components/effects/SmoothScrollProvider.tsx`)

```tsx
export function SmoothScrollProvider({ children }) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis>();

  useEffect(() => {
    if (reduced) return; // NEVER init on reduced motion
    
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      touchMultiplier: 2,
      smoothTouch: false, // CRITICAL: disable on touch
    });
    
    function raf(time) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    setLenis(instance);
    return () => instance.destroy();
  }, [reduced]);

  // Expose for scroll-triggered animations
  return <ScrollContext.Provider value={lenis}>{children}</ScrollContext.Provider>;
}
```

**Rules**:
- ❌ No Lenis on `prefers-reduced-motion`
- ❌ No Lenis on `pointer: coarse` (mobile/tablet)
- ✅ Desktop only, `pointer: fine`
- ✅ `touchMultiplier: 2` (not higher — INP risk)

---

## 5. PERFORMANCE BUDGETS (Enforced in CI)

| Metric | Budget | Measurement |
|---|---|---|
| **Hero LCP** | <1.2s | Lighthouse (mobile 4G throttle) |
| **INP** | <200ms | Real User Monitoring / Lighthouse |
| **CLS** | <0.1 | Layout shift audit |
| **TBT** | <150ms | Main thread blocking |
| **Animation FPS** | 60fps sustained | DevTools Performance tab |
| **JS Heap (animations)** | <5MB | DevTools Memory |

**Automated Checks** (add to CI):
```bash
# Lighthouse CI budget
lighthouse:ci --budget-path=./lighthouse-budget.json
```

```json
// lighthouse-budget.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1200 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "interactive": ["error", { "maxNumericValue": 3500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 150 }]
      }
    }
  }
}
```

---

## 6. REDUCED MOTION IMPLEMENTATION CHECKLIST

Every component with animation **MUST**:

- [ ] Import `useReducedMotion` from `framer-motion`
- [ ] Gate ALL `whileHover`, `whileInView`, `animate`, `transition` behind `if (!reduced)`
- [ ] Provide static fallback (opacity 1, transform none)
- [ ] Test with `prefers-reduced-motion: reduce` in DevTools

```tsx
// Pattern used in PhotoAliveCard, HeroBlock, all reveals
const reduced = useReducedMotion();

const variants = reduced ? {} : {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'standard' } }
};

// CSS fallback for Lenis/marquee
@media (prefers-reduced-motion: reduce) {
  .marquee-inner { animation-play-state: paused; }
  html { scroll-behavior: auto !important; }
}
```

---

## 7. ACCESSIBILITY (WCAG 2.2 + Motion)

| Criterion | Implementation |
|---|---|
| **2.2.2 Pause, Stop, Hide** | Marquee pauses on hover/focus; video autoplays only on desktop non-reduced |
| **2.3.3 Animation from Interactions** | `prefers-reduced-motion` disables all non-essential motion |
| **2.4.7 Focus Visible** | 2px gold-text ring on ALL interactive elements |
| **2.5.5 Target Size** | 44×44px minimum (buttons, links, close icons, chips) |
| **1.4.10 Reflow** | No horizontal scroll at 320px; fluid grids |

---

## 8. TESTING PROTOCOL

### 8.1 Manual (Every PR)
1. **Reduced Motion ON** (DevTools → Rendering → Emulate prefers-reduced-motion)
   - No layout shift, no frozen opacity-0 elements, all content readable
2. **Mobile Sim** (iPhone SE / Android 4G throttle)
   - LCP <1.2s, INP <200ms, no stuck hover states
3. **Keyboard Only** (Tab/Shift+Tab/Enter/Esc)
   - Focus visible everywhere, focus trap in modals, skip link works
4. **Screen Reader** (VoiceOver/NVDA)
   - `aria-live` announces price changes, alt text meaningful

### 8.2 Automated (CI)
- Lighthouse CI budgets (above)
- Axe-core accessibility (`npm test:a11y`)
- Playwright visual regression (Chromium + WebKit)
- Bundle size check (`@next/bundle-analyzer`)

---

## 9. FUTURE EXTENSIONS (Post-Launch)

| Feature | Spec Reference | Priority |
|---|---|---|
| View Transitions API (MPA) | Replace Framer page transition | P1 |
| Scroll-driven animations (CSS `animation-timeline`) | Replace Framer `useScroll` for parallax | P2 |
| WASM video decode (ffmpeg.wasm) | Client-side poster extraction | P3 |
| Motion One (lighter than Framer) | Evaluate for micro-interactions | P3 |

---

*This spec is the contract. Any animation not defined here = doesn't ship. Update this doc when adding new motion patterns.*