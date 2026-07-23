# AI IMAGE GENERATION PROMPTS — NiloV Catering P0 Assets

**Visual DNA**: Light/editorial catering, ivory `#FAF7F2` bg, warm gold `#B08D57` accents, Cormorant/Inter fonts
**Consistency Rules**: Same lighting, color grading, surface, framing across ALL assets
**Negative Prompt** (apply to ALL):
```
dark background, black background, studio strobe, ring light, oversaturated, HDR, vignette, 
selective color, micro portion, restaurant plating, garnish overload, busy pattern, watermark, 
text, logo, signature, border, frame, vignette, dramatic shadows, high contrast, cool tones, 
blue shadows, sterile, clinical, plastic, fake, 3d render, cgi, illustration, drawing, painting
```

---

## BASE PROMPT TEMPLATE (prepend to every prompt)

```
[SUBJECT], [ANGLE], catering portion on [SURFACE],
soft natural window light from left, shallow depth of field f/4,
warm color grading (amber highlights, lifted blacks, warm midtones),
professional food photography, 8k, --ar [ASPECT] --style raw --v 6 --q 2
```

---

## P0 ASSETS — GENERATE IN ORDER

### 1. HERO VIDEO POSTER (Static frame for hero)
```
Banquet table setting for 100 guests, long table with ivory linens, 
gold-rimmed china, crystal glassware, tall floral centerpieces with cream roses and eucalyptus,
candlelight glow, warm ambient venue lighting, 
hero angle (slightly elevated, showing table length), 
catering scale not restaurant, --ar 16:9
```

### 2. HERO MINI-VIDEOS (3 formats, 5s loop concepts)

**Furshet (Standing cocktail)**
```
Waiter pouring champagne into crystal flute, golden bubbles rising, 
tray of salmon canapes in background, soft venue light, 
45-degree angle, seamless loop action (pour → stop → reset), --ar 1:1
```

**Banquet (Seated dinner)**
```
Chef plating main course: sliced beef tenderloin with peppercorn sauce, 
microgreens placed with tweezers, sauce drizzle, 
top-down view, steam rising, seamless loop (plate → garnish → reset), --ar 16:10
```

**Coffee Break**
```
Barista pouring latte art (rosetta) into ceramic cup, 
tray of mini pastries (croissant, macaron, madeleine) beside, 
45-degree, warm morning light, seamless loop (pour → art complete → reset), --ar 1:1
```

### 3. FORMAT HERO IMAGES (3, used in FormatShowcase)

**Furshet**
```
Standing cocktail reception, guests in background (blurred), 
foreground: high-top table with canapes, champagne flutes, 
ivory linen runner, gold cutlery, natural venue light, --ar 16:10
```

**Banquet**
```
Elegant seated dinner, long table stretching into distance, 
each place: charger, folded napkin, menu card, wine glasses, 
floral centerpiece every 4 seats, candlelight, --ar 16:10
```

**Coffee Break**
```
Morning coffee station, glass dispensers with infused water, 
ceramic cups, tiered stand with mini pastries, 
barista corner in background, bright airy room, --ar 16:10
```

### 4. MENU PREVIEW COVERS (4 categories)

**Furshet**
```
Assortment of canapes on slate board: salmon, cheese, ham, vegetable, 
top-down, ivory paper liner, gold cocktail picks, --ar 1:1
```

**Banquet**
```
Three-course place setting: amuse-bouche, main (beef), dessert, 
top-down, ivory charger, gold flatware, --ar 1:1
```

**Coffee Break**
```
Mini pastries array: croissant, pain au chocolat, macaron, madeleine, 
ceramic cup with latte, top-down, warm wood surface, --ar 1:1
```

**Detskoe (Kids)**
```
Kids' buffet: mini sandwiches (star-shaped), fruit skewers, 
cupcakes with colorful frosting, juice boxes, 
top-down, colorful but not chaotic, --ar 1:1
```

### 5. EVENT TYPE COVERS (6, used in EventTypeSelector)

**Korporativ (Corporate)**
```
Modern venue, standing networking, branded cocktail napkins, 
projection screen in background, professional atmosphere, --ar 3:2
```

**Svadba (Wedding)**
```
Romantic outdoor ceremony setup: arch with flowers, 
white chairs, aisle petals, golden hour light, --ar 3:2
```

**Vypusknoy (Prom/Graduation)**
```
Elegant ballroom, round tables, youthful but sophisticated, 
photo booth corner, disco ball, --ar 3:2
```

**Chastnoe (Private Party)**
```
Intimate private dining room, 12-seat table, 
chef's counter visible, personalized menus, --ar 3:2
```

**Detskoe (Kids Party)**
```
Bright playful setup: balloon arch, themed dessert table, 
kids' chairs, activity corner, natural light, --ar 3:2
```

**Chef-at-home**
```
Home kitchen transformed: chef plating at island, 
family watching, copper pots, warm domestic luxury, --ar 3:2
```

### 6. HERO DISHES (12 dishes = 4 formats × 3 tiers)

**Furshet Economy**: "Канапе с красной рыбой" — Top-down, 6 pieces on rectangular slate
**Furshet Standard**: "Тарталетка куриная" — 45°, 3 pieces on white plate with microgreens
**Furshet Premium**: "Мини-бургер" — 45°, single perfect slider on gold-rimmed plate

**Banquet Economy**: "Куриное филе гриль" — 45°, sliced breast with rosemary, roasted vegetables
**Banquet Standard**: "Лосось гриль" — 45°, skin crisp, beurre blanc, asparagus
**Banquet Premium**: "Стейк из говядины" — Hero angle, medium-rare, peppercorn sauce, truffle mash

**Coffee Break Economy**: "Круассан с маслом" — 45°, flaky layers visible, butter curl
**Coffee Break Standard**: "Макаронс-шутер" — Top-down, 3 macarons in shot glass with coulis
**Coffee Break Premium**: "Кедровый раф" — 45°, glass cup, latte art, cedar garnish

**Detskoe Economy**: "Мини-хот-дог" — 45°, star-shaped bun, ketchup smile
**Detskoe Standard**: "Капкейк" — Top-down, swirl frosting, sprinkles
**Detskoe Premium**: "Смузи-бар" — Hero, 3 colorful glasses, fruit garnish

---

## MIDJOURNEY BATCH COMMANDS (Copy-paste)

```bash
# Hero poster
/imagine prompt: "Banquet table setting for 100 guests, long table with ivory linens, gold-rimmed china, crystal glassware, tall floral centerpieces with cream roses and eucalyptus, candlelight glow, warm ambient venue lighting, hero angle (slightly elevated, showing table length), catering scale not restaurant, soft natural window light from left, shallow depth of field f/4, warm color grading (amber highlights, lifted blacks, warm midtones), professional food photography, 8k" --ar 16:9 --style raw --v 6 --q 2 --no "dark background, black background, studio strobe, ring light, oversaturated, HDR, vignette, selective color, micro portion, restaurant plating, garnish overload, busy pattern, watermark, text, logo, signature, border, frame, vignette, dramatic shadows, high contrast, cool tones, blue shadows, sterile, clinical, plastic, fake, 3d render, cgi, illustration, drawing, painting"

# Furshet hero
/imagine prompt: "Standing cocktail reception, guests in background (blurred), foreground: high-top table with canapes, champagne flutes, ivory linen runner, gold cutlery, natural venue light, soft natural window light from left, shallow depth of field f/4, warm color grading (amber highlights, lifted blacks, warm midtones), professional food photography, 8k" --ar 16:10 --style raw --v 6 --q 2 --no "dark background, black background, studio strobe, ring light, oversaturated, HDR, vignette, selective color, micro portion, restaurant plating, garnish overload, busy pattern, watermark, text, logo, signature, border, frame, vignette, dramatic shadows, high contrast, cool tones, blue shadows, sterile, clinical, plastic, fake, 3d render, cgi, illustration, drawing, painting"

# Banquet hero
/imagine prompt: "Elegant seated dinner, long table stretching into distance, each place: charger, folded napkin, menu card, wine glasses, floral centerpiece every 4 seats, candlelight, soft natural window light from left, shallow depth of field f/4, warm color grading (amber highlights, lifted blacks, warm midtones), professional food photography, 8k" --ar 16:10 --style raw --v 6 --q 2 --no "dark background, black background, studio strobe, ring light, oversaturated, HDR, vignette, selective color, micro portion, restaurant plating, garnish overload, busy pattern, watermark, text, logo, signature, border, frame, vignette, dramatic shadows, high contrast, cool tones, blue shadows, sterile, clinical, plastic, fake, 3d render, cgi, illustration, drawing, painting"

# Coffee Break hero
/imagine prompt: "Morning coffee station, glass dispensers with infused water, ceramic cups, tiered stand with mini pastries, barista corner in background, bright airy room, soft natural window light from left, shallow depth of field f/4, warm color grading (amber highlights, lifted blacks, warm midtones), professional food photography, 8k" --ar 16:10 --style raw --v 6 --q 2 --no "dark background, black background, studio strobe, ring light, oversaturated, HDR, vignette, selective color, micro portion, restaurant plating, garnish overload, busy pattern, watermark, text, logo, signature, border, frame, vignette, dramatic shadows, high contrast, cool tones, blue shadows, sterile, clinical, plastic, fake, 3d render, cgi, illustration, drawing, painting"
```

---

## POST-GENERATION PIPELINE

1. **Select best 1-2 per prompt** (check: lighting consistency, ivory bg compatibility, no artifacts)
2. **Apply NiloV LUT** (DaVinci/Resolve/Lightroom) — see §2.2 in Visual Style Guide
3. **Crop to exact aspect** (16:9, 16:10, 1:1, 3:2)
4. **Export responsive sizes**: 1920w, 1280w, 720w, 480w
5. **Encode**: WebP 85% + AVIF 70% + JPEG fallback
6. **Generate blurDataURL** (10px base64)
7. **Name**: `{block}-{subject}-{size}.webp` → `/public/images/{block}/`
8. **Update ASSET_INVENTORY.md** → 🟦 Sourced

---

## VIDEO PROMPTS (for Runway Gen-3 / Pika / Sora)

**Hero Video (10-15s seamless loop)**:
```
Cinematic banquet venue, slow camera dolly along 100-guest table, 
ivory linens, gold china, crystal, floral centerpieces, candlelight flicker, 
guests naturally conversing (blurred), warm venue lighting, 
seamless loop: end frame = start frame, 24fps, 1920x1080
```

**Dish Hover Videos (5s each)**:
```
[DISH NAME], [ACTION: pour/sprinkle/torch/steam/cut/lift/assemble], 
top-down or 45-degree, same surface as hero photo, 
single continuous action, natural reset, 5.0s exact, 720x720, seamless loop
```

---

*Run these prompts, curate ruthlessly, apply LUT, deploy as P0 placeholders immediately.*