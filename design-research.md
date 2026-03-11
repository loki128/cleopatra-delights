# Premium Website Design Patterns Research
## For Cleopatra Delights -- Next.js + Tailwind CSS v4 + Framer Motion

---

## 1. STRIPE.COM

### Layout Techniques
- **Bento grid system**: Asymmetric card grid with varying column spans (2-col + 1-col, 1-col + 2-col alternating). CSS Grid with `grid-template-columns: repeat(3, 1fr)` and selective `grid-column: span 2`.
- **Full-bleed hero** with contained text overlay: Hero spans 100vw with internal `max-width` container.
- **Edge-to-edge sections** alternating with contained sections for rhythm.
- **Editorial grid**: Content sections use a 12-column grid with content placed in columns 2-11, creating natural margins.

### Typography Patterns
- Large display headings (~56-72px) paired with 18-20px body text = ~3.5:1 ratio.
- Heavy weight headings (700) with light body (400) for contrast.
- Italicized subheadings to create a third typographic layer.
- System sans-serif stack with custom cuts for brand identity.

### Color/Gradient Techniques
- **Animated mesh gradients**: WebGL canvas element behind hero with multi-stop radial gradients blended together. Colors shift slowly over time.
- **CSS fallback gradient**: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)` with a PNG wave fallback when WebGL unavailable.
- **Radial glow behind cards**: `background: radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%)`.
- **Color-coded sections**: Each product area has its own accent hue.

### Animation Patterns
- Scroll-triggered fade-in with stagger: Elements use `opacity: 0; transform: translateY(20px)` transitioning to visible on intersection.
- Carousel with crossfade transitions for customer stories.
- Subtle parallax on hero background (background-attachment or transform-based).
- Hover micro-interactions on cards: `transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1)`.

### Spacing Philosophy
- Generous vertical padding between sections: 120-160px desktop, 80px mobile.
- Internal card padding: 32-48px.
- Consistent 24px gap in grid layouts.
- Breathing room around hero CTA buttons: 16px vertical gap between buttons, 48px from body text.

### Hero Section
- Value prop headline + italic supporting text + dual CTA (primary button + OAuth button).
- Animated gradient canvas background with wave pattern fallback image.
- Center-aligned content with max-width constraint (~680px for text).

### Card/Content Patterns
- **Customer story cards**: Image + metadata (stats) + link. Hover elevates with shadow.
- **Feature cards**: Icon/illustration top, title, description, action link. Consistent padding.
- **Testimonial pattern**: Small circular avatar, quote text, attribution line.

### CTA Design
- Primary: Solid background button with white text, rounded corners (border-radius: 24px), padding 12px 24px.
- Secondary: Ghost/outline button or text link with arrow.
- Always paired: primary + secondary CTA together.

### Navigation
- Clean horizontal nav: Products, Solutions, Developers, Resources, Pricing.
- Mega-menu dropdowns with organized groups.
- Sticky on scroll with subtle background blur.

---

## 2. APPLE.COM

### Layout Techniques
- **Full-viewport hero sections**: Each product gets 100vh (or near) treatment.
- **Centered single-column layout** for primary content: max-width ~980px.
- **Product tile grid**: 2-column at desktop with equal-height cards.
- **Alternating dark/light sections** create visual chapters.

### Typography Patterns
- **Cinematic type**: Hero headlines at 56-96px, often a single word or short phrase.
- Font: SF Pro Display (proprietary) -- similar to Inter/Geist for web equivalents.
- **Size contrast ratio**: Headlines 5-7x body text size.
- Taglines use medium weight (500), body uses regular (400).
- `text-wrap: balance` on headlines to prevent orphans.
- Letter-spacing: Tight on large type (-0.015em), normal on body.

### Color/Gradient Techniques
- **Monochromatic product sections**: Each product has its own background color palette.
- Dark sections: Pure black (#000) or near-black (#1d1d1f) with white text.
- Light sections: #fbfbfd or pure white.
- **No complex gradients** -- purity through flatness.
- Accent colors are product-specific (blue for iPhone, space gray for Mac).

### Animation Patterns
- **Scroll-driven animations**: Product images scale, rotate, and fade as user scrolls. Implemented with JS scroll listeners mapping scroll position to CSS transform values.
- **Sticky + transform**: Section sticks, then inner content transforms on continued scroll.
- **Cinematic video playback**: Videos scrub forward/backward based on scroll position using `requestAnimationFrame` + `video.currentTime` manipulation.
- **Staggered reveals**: Elements fade in with 100-200ms delays between siblings.
- Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` (Apple's standard ease).

### Spacing Philosophy
- **Extreme whitespace**: 80-200px between sections.
- **Product tiles**: 16-24px gap between grid items.
- **Asymmetric vertical rhythm**: Hero sections get more space than detail sections.
- Padding scale: 40px, 60px, 80px, 120px increments.

### Hero Section
- Product name in large type + one-line tagline + dual CTA ("Learn more" / "Buy").
- Full-bleed product photography below text.
- Dark background for premium products, light for consumer products.

### Card/Content Patterns
- **Product tiles**: Full-bleed background image, product name overlay, tagline, link pair.
- Equal height with `aspect-ratio` or fixed height.
- Hover state: subtle image zoom (scale 1.02) with overflow hidden.

### CTA Design
- Text links with right arrow: "Learn more >" in blue (#0066cc).
- "Buy" as secondary text link.
- Minimal button usage -- primarily text CTAs.
- Blue link color on both dark and light backgrounds (adjusted for contrast).

### Navigation
- Sticky translucent navbar: `backdrop-filter: saturate(180%) blur(20px); background: rgba(255,255,255,0.72)`.
- Compact height (44px).
- Collapses to hamburger on mobile.
- Dark variant on dark pages: `background: rgba(29,29,31,0.72)`.

---

## 3. FRAMER SITES (General Patterns)

### Layout Techniques
- **Grid-breaking layouts**: Elements intentionally overflow their grid boundaries with `overflow: visible` and negative margins.
- **Asymmetric two-column**: Image fills one column edge-to-edge while text sits centered in the other.
- **Overlapping elements**: `position: relative` with negative margins or CSS Grid area overlap.
- **Bento grids with varied aspect ratios**: Mix of 1:1, 16:9, and 4:3 cards in single grid.

### Typography Patterns
- **Large Type trend**: Hero text at 80-120px (5-8vw fluid).
- Fluid type scaling: `font-size: clamp(2.5rem, 5vw, 6rem)`.
- Mixed serif + sans-serif pairings for editorial feel.
- **Kinetic typography**: Individual letters/words animated with stagger delays.

### Animation Patterns
- **Parallax layers**: Multiple layers moving at different scroll speeds using `transform: translateY(calc(var(--scroll) * 0.3))`.
- **Page transitions**: Shared layout animations between routes (Framer Motion `layoutId`).
- **Entrance animations**: Every section has a scroll-triggered entrance.
- **3D transforms**: `perspective(1000px) rotateX(5deg)` on scroll for depth.
- **Scroll velocity effects**: Elements respond to scroll speed, not just position.

### Special Effects
- **Custom cursors**: `cursor: none` with a following div using `transform: translate()`.
- **Magnetic buttons**: Button moves toward cursor on hover approach.
- **Text masking**: Background video/gradient clipped to text with `background-clip: text`.
- **Sticky scrolling**: Sections that pin and animate internal content.
- **Smooth scroll**: `scroll-behavior: smooth` with `overscroll-behavior: none`.

### Hero Section
- Full-viewport with layered animation.
- Often video or animated background.
- Text entrance animation with letter-by-letter or word-by-word reveal.

---

## 4. LINEAR.APP

### Dark UI Techniques
- **Base surface**: Near-black (#0A0A0B or similar), NOT pure black.
- **Elevation layers**: 3-4 surface levels with increasing lightness:
  - Layer 0 (base): `hsl(0, 0%, 4%)`
  - Layer 1 (card): `hsl(0, 0%, 7%)`
  - Layer 2 (elevated): `hsl(0, 0%, 10%)`
  - Layer 3 (modal): `hsl(0, 0%, 13%)`
- **Text hierarchy via opacity**: 4 levels using CSS custom properties:
  - Primary: `rgba(255, 255, 255, 0.92)`
  - Secondary: `rgba(255, 255, 255, 0.65)`
  - Tertiary: `rgba(255, 255, 255, 0.48)`
  - Quaternary: `rgba(255, 255, 255, 0.32)`
- **Borders**: `1px solid rgba(255, 255, 255, 0.08)` -- barely visible separation.

### Glassmorphism
- `backdrop-filter: blur(16px) saturate(180%)`.
- Background: `rgba(10, 10, 11, 0.7)` -- high opacity dark glass.
- Border: `1px solid rgba(255, 255, 255, 0.06)`.
- Dedicated CSS `color-scheme: glass` variant.

### Glow Effects
- **Radial glow behind elements**: `background: radial-gradient(ellipse at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)`.
- **Box-shadow glow**: `box-shadow: 0 0 80px rgba(99, 102, 241, 0.3), 0 0 32px rgba(99, 102, 241, 0.2)`.
- **Border glow on focus/hover**: `box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.5), 0 0 16px rgba(99, 102, 241, 0.2)`.
- Glow colors: Purple-blue accent (#6366F1) as primary glow source.

### Grid/Dot Patterns
- **SVG dot grid background**: 5x5 grid of dots with staggered opacity animations.
- Animation timing: `steps(1, end)` for discrete state changes (not smooth).
- Dots alternate between `opacity: 0.3` and `opacity: 1` across 16 keyframe steps.
- Duration: 2800-3200ms per cycle, infinite loop.
- CSS: `background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 24px 24px`.

### Typography
- 9+ scale system from `--title-9` (largest) to `--text-tiny` (smallest).
- Responsive: `--title-9` on desktop reduces to `--title-5` at 768px.
- Font weights: light, medium, semibold via CSS variables.
- Monospace for technical content at 0.9em scale.
- `text-wrap: balance` on hero headings.
- `font-variant-numeric: tabular-nums` for data alignment.

### Animation Patterns
- **Staggered grid animations**: 16-step sequences with `steps(1, end)` timing.
- **Ambient animations**: Slow, infinite loops (3200ms) for background movement.
- **Entrance animations**: Blur-in reveal: `filter: blur(10px); opacity: 0` to `filter: blur(0); opacity: 1` over 500ms.

### Card Designs
- Dark surface cards with subtle border: `border: 1px solid rgba(255,255,255,0.08)`.
- `overflow: hidden` with `-webkit-line-clamp: 2` for content truncation.
- Border-radius: 12px.
- No heavy shadows -- elevation through background lightness differential.

### Hero Section
- Centered headline with `text-align: center` and `text-wrap: balance`.
- Large type scaling responsively from title-9 to title-5.
- Animated dot grid as background.
- Subtle radial glow behind headline.

---

## 5. VERCEL.COM

### Dark Minimalist Techniques
- **Near-black base**: #000000 with slightly lighter surface layers.
- **Extreme color restraint**: Primarily grayscale with one accent color (blue for links/CTAs).
- **Theme system**: CSS custom properties with `light-theme` / `dark-theme` class switching.
- **High contrast text**: White (#EDEDED) on black backgrounds.

### Code-Inspired Aesthetics
- **Geist font family**: Custom sans-serif (Geist Sans) + monospace (Geist Mono).
- **Code block styling**: `data-geist-code-block` attributes with terminal-like presentation.
- **Monospace accents**: Technical content in Geist Mono for developer credibility.
- **Terminal-inspired sections**: Dark backgrounds with monospace type and blinking cursors.

### Typography
- **Geist Sans**: Sharp, geometric letterforms. Clean, high legibility.
- **Size hierarchy**: Tight -- hero ~48-64px, section heads ~32-40px, body 16px.
- **Weight usage**: 400 (regular) for body, 600 (semibold) for headings, 700 (bold) sparingly.
- **Letter-spacing**: Tight on headings (-0.02em), normal on body.

### Layout
- Container queries (`@container`) for component-level responsiveness.
- `flex` with `min-w-0` constraints for content flow.
- Breakpoints: Primary at 1150px.
- **Contained sections**: max-width ~1200px centered with generous side padding.

### Animation Patterns
- **Globe animation**: Nodes pulsing on a 3D globe with animated connection lines.
- **Performance metrics**: `requestAnimationFrame` for smooth rendering.
- **Subtle transitions**: 150-200ms for interactive state changes.
- **No heavy scroll animations** -- restraint matches brand.

### Special Effects
- **Minimal borders**: `border: 1px solid rgba(255,255,255,0.1)`.
- **No gradients on surfaces** -- flat color blocks.
- **Subtle glows**: Very restrained, only on interactive elements.
- **Social proof metrics**: Animated counters showing customer performance gains.

### Hero Section
- Bold headline + customer logos + quantified benefits.
- Dark background with contained width.
- Primary CTA button + secondary link.

### Navigation
- Horizontal nav with organized dropdowns (Products, Resources, Solutions).
- Sticky on scroll.
- Mobile hamburger at 1150px breakpoint.
- Clean, minimal -- no background effects on nav bar.

---

## 6. NOTION.SO

### Whitespace Techniques
- **Generous padding**: 80-120px vertical section spacing.
- Content blocks breathe with 32-48px internal padding.
- **Max-width content**: ~1080px centered with large side margins.
- Whitespace as primary hierarchy tool -- no heavy borders or dividers.

### Playful Illustration Style
- **Character mascots**: "Nosey" animated characters (noseyAgents, noseyGlasses, noseyHeadset, noseySearching).
- Illustrations humanize features and inject personality.
- Hand-drawn quality with digital polish.
- Used alongside feature descriptions, not as decoration.

### Typography Hierarchy
- **Hero**: Short, punchy headlines ("One workspace. Zero busywork.").
- Clear 3-level hierarchy: headline > subheading > body.
- Sans-serif stack (likely custom or system fonts).
- Weight contrast: Bold headlines (700), regular body (400).

### Color Palette
- **Semantic background colors on cards**: teal, red, blue, yellow assigned to different product areas.
- Dark text on light colored backgrounds.
- Accent colors strategic, not saturating.
- Base: Clean white/off-white backgrounds.

### Layout Patterns
- **Grid-based cards**: Wide (2-col span) + standard (1-col) cards mixed.
- Hero: Centered text above full-width media (video with poster fallback).
- Responsive: Mobile-specific image variants for each card.

### Card Designs
- **Feature cards**: Eyebrow label (category) + heading + body + CTA link.
- Distinct background colors for differentiation.
- Layered imagery (desktop + mobile variants).
- Generous padding and rounded corners (12-16px radius).

### Animation Patterns
- Character-based micro-animations tied to feature sections.
- Video auto-play in hero with poster fallback.
- Carousel/slide system for hero with multiple slides.
- Hover states on cards and navigation links.

### Hero Section
- Centered headline + subheading + dual CTA ("Get Notion free" + "Request a demo").
- Full-width video below with play button overlay.
- Mobile poster variant for performance.

### Navigation
- Sticky header with mega-menu dropdowns.
- Organized: Product, Solutions, Resources.
- Dual CTA in nav: "Log in" + "Get Notion free".

---

## 7. AWWWARDS-WINNING SITES (Common Patterns)

### Shared Design Techniques from Award Winners

**Layout Innovation**
- Grid-breaking: Elements intentionally crossing column boundaries.
- Overlapping layers with `z-index` stacking and absolute positioning.
- Mixed fixed + scroll sections (sticky pinning with internal scroll).
- Asymmetric layouts that create visual tension.
- Full-bleed imagery alternating with contained text blocks.

**Animation Approaches**
- Scroll-triggered entrance animations (intersection observer driven).
- Page transitions between routes (shared layout animations).
- Custom cursor interactions (cursor followers, magnetic elements).
- Parallax depth layers (3+ speed layers).
- Text reveal animations (clip-path, mask, or translate-based).
- Smooth scroll with lerp (linear interpolation) for inertia feel.

**Typography Trends**
- Oversized display type: 80-200px heroes (6-12vw fluid).
- Fluid typography: `clamp()` function for seamless scaling.
- Mixed font pairings: Serif headlines + sans-serif body or vice versa.
- Variable fonts for weight animation on hover.
- Split-text animation (per-character or per-word Framer Motion stagger).

**Color Usage**
- Monochromatic or very limited palettes (2-3 colors max).
- Strategic accent color for CTAs only.
- Dark mode as default for premium feel.
- Gradient usage on backgrounds, not on UI elements.

**Special Effects**
- Grain/noise texture overlays: `background-image: url(noise.svg); opacity: 0.03`.
- Glassmorphism for floating elements.
- Light leak / lens flare effects via radial gradients.
- SVG filter effects for organic textures.
- WebGL for 3D/particle effects (Three.js, GSAP).

**Hero Patterns**
- Full-viewport with video or animated background.
- Large type with staggered word/letter animation.
- Scroll indicator (animated arrow or "scroll" text).
- Minimal content -- headline + one CTA max.

---

## 8. CROSS-CUTTING CSS TECHNIQUES

### Modern CSS for Premium Feel

**Fluid Typography**
```css
font-size: clamp(2.5rem, 5vw + 1rem, 6rem);
```

**Scroll-Driven Animations (CSS-only)**
```css
.element {
  animation: fadeIn linear;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Glassmorphism Stack**
```css
.glass {
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(10, 10, 11, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}
```

**Radial Glow Behind Elements**
```css
.glow-wrapper::before {
  content: '';
  position: absolute;
  inset: -40px;
  background: radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, transparent 70%);
  z-index: -1;
  filter: blur(40px);
}
```

**Dot Grid Background**
```css
.dot-grid {
  background-image: radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

**Noise Texture Overlay**
```css
.noise::after {
  content: '';
  position: fixed;
  inset: 0;
  background: url('/noise.svg');
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

**Grid Template Animation**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  transition: grid-template-columns 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.grid:hover {
  grid-template-columns: 2fr 1fr 1fr;
}
```

**Animated Border (Moving Gradient)**
```css
.animated-border {
  background: linear-gradient(var(--angle), #D4AF37, #8B1A1A, #1B7878, #D4AF37);
  background-size: 400% 400%;
  animation: gradient-rotate 4s ease infinite;
  padding: 2px;
  border-radius: 12px;
}
@keyframes gradient-rotate {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}
```

**Elevation System (Dark UI)**
```css
:root {
  --surface-0: hsl(0 0% 4%);
  --surface-1: hsl(0 0% 7%);
  --surface-2: hsl(0 0% 10%);
  --surface-3: hsl(0 0% 13%);
  --text-primary: rgba(255,255,255,0.92);
  --text-secondary: rgba(255,255,255,0.65);
  --text-tertiary: rgba(255,255,255,0.48);
}
```

**Apple-style Translucent Nav**
```css
.nav {
  position: sticky;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  background: rgba(255,255,255,0.72);
  z-index: 100;
}
```

### Rauno Gavioli's Craft Principles (ex-Vercel designer)

**Spacing System**: 8px base unit increments (8, 16, 24, 32, 40, 48...).

**Shadow Scale (3 tiers)**:
- Small: `0 2px 5px rgba(0,0,0,0.05), 0 4px 10px rgba(0,0,0,0.08)`
- Medium: `0 4px 8px rgba(0,0,0,0.04), 0 8px 30px rgba(0,0,0,0.08)`
- Large: `0 12px 30px rgba(0,0,0,0.06), 0 30px 60px rgba(0,0,0,0.12)`

**Border Radius Scale**: 4px (subtle), 8px (cards), 16px (modals), 9999px (pills).

**Transition Timing**:
- Micro interactions: 150ms
- Enter: 200ms ease-out
- Exit: 150ms ease-in
- Page transitions: 300-500ms cubic-bezier(0.2, 0.8, 0.2, 1)

**Font Smoothing**: Always `antialiased` (`-webkit-font-smoothing: antialiased`).

**Focus States**: `outline: 2px solid var(--focus-color); outline-offset: 2px`.

**GPU Acceleration**: `transform: translateZ(0)` on scrollable containers.

---

## 9. TRANSLATION TO CLEOPATRA DELIGHTS
### Which Patterns Fit an Egyptian Luxury Dessert Brand

### HIGH-VALUE PATTERNS TO ADOPT

**From Stripe:**
- Animated gradient meshes -- use gold (#D4AF37) / deep red (#8B1A1A) / teal (#1B7878) color stops
- Bento grid for menu/product showcase
- Dual CTA pattern (primary gold button + ghost outline)
- Card hover elevations with gold-tinted shadows

**From Apple:**
- Scroll-driven product reveals for dessert showcase
- Cinematic typography: Playfair Display at 64-96px for hero
- Extreme whitespace between sections (120-160px)
- Alternating dark (obsidian/nile) and light (papyrus) sections
- Translucent sticky nav with `backdrop-filter: blur(20px)`
- Image zoom on hover for dessert photography

**From Linear:**
- Dark section treatment (Obsidian zone) with surface elevation layers
- Radial gold glow behind featured content: `radial-gradient(ellipse, rgba(212,175,55,0.15), transparent 70%)`
- Dot grid pattern for backgrounds (gold dots on dark surface)
- Text hierarchy via opacity (4-level system)
- Glassmorphism on overlay cards/modals
- Subtle animated border glow on featured cards

**From Vercel:**
- Sharp, clean typography hierarchy
- Extreme color restraint (let gold be the ONLY accent on dark sections)
- Contained sections with generous side margins
- Performance-first animation philosophy

**From Notion:**
- Semantic background colors on cards (each dessert category gets a color zone)
- Eyebrow labels on cards (category tags like "Baklava", "Kunafa")
- Playful but branded illustrations for empty states
- Clean card design with generous internal padding

**From Framer Sites:**
- Parallax layers on hero (desert landscape layers at different scroll speeds)
- Text masking: Gold gradient or desert texture clipped to text
- Split-text entrance animations with Framer Motion stagger
- Magnetic hover on CTA buttons

**From Awwwards Winners:**
- Grain/noise texture overlay (papyrus texture at 3% opacity)
- Custom cursor (gold dot or Egyptian ankh symbol)
- Smooth scroll with inertia
- Page transitions between routes

### SPECIFIC IMPLEMENTATION SUGGESTIONS

**Hero Section (Egyptian Luxury)**
```
- Full viewport dark (obsidian) background
- Subtle dot grid pattern (gold dots)
- Radial gold glow behind headline
- Playfair Display at clamp(3rem, 6vw, 5.5rem)
- Staggered word entrance animation (Framer Motion)
- Grain/noise texture overlay at 2-3% opacity
- Scroll indicator with golden animated arrow
```

**Navigation**
```
- Sticky with Apple-style backdrop blur
- Background: rgba(8, 7, 10, 0.8) (obsidian translucent)
- Border-bottom: 1px solid rgba(212, 175, 55, 0.1) (hint of gold)
- Logo + centered links + gold CTA button
- Height: 64px with centered vertical alignment
```

**Product/Menu Cards**
```
- Dark cards (surface-1) on obsidian sections
- Light cards (white/papyrus) on papyrus sections
- Border: 1px solid rgba(212,175,55,0.08)
- Border-radius: 12px
- Hover: translateY(-4px) + gold-tinted shadow
- Hover shadow: 0 12px 32px rgba(212,175,55,0.12)
- Internal padding: 32px
- Eyebrow label with gold text
- next/image with aspect-ratio: 4/3
```

**Section Transitions**
```
- Obsidian to Papyrus: Use angled clip-path or SVG divider with Egyptian motif
- Gold accent line between sections: height 1px, background gold at 20% opacity
- Fade-in-up entrance on all section content (IntersectionObserver + Framer Motion)
```

**Gold Glow System**
```css
/* Subtle glow for featured items */
.gold-glow {
  box-shadow: 0 0 60px rgba(212, 175, 55, 0.15),
              0 0 24px rgba(212, 175, 55, 0.1);
}

/* Intense glow for CTAs */
.gold-glow-intense {
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.3),
              0 0 16px rgba(212, 175, 55, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Radial glow backdrop */
.gold-radial::before {
  content: '';
  position: absolute;
  inset: -60px;
  background: radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 65%);
  filter: blur(40px);
  z-index: -1;
}
```

**Typography Scale (Playfair Display + Inter)**
```css
:root {
  --text-hero: clamp(3rem, 6vw, 5.5rem);      /* 48-88px */
  --text-display: clamp(2.25rem, 4vw, 3.5rem); /* 36-56px */
  --text-h2: clamp(1.75rem, 3vw, 2.5rem);      /* 28-40px */
  --text-h3: clamp(1.25rem, 2vw, 1.75rem);     /* 20-28px */
  --text-body: 1.125rem;                         /* 18px */
  --text-small: 0.875rem;                        /* 14px */
  --text-eyebrow: 0.75rem;                       /* 12px */
}
```

**Spacing System (8px base)**
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-7: 2.5rem;   /* 40px */
  --space-8: 3rem;     /* 48px */
  --space-9: 4rem;     /* 64px */
  --space-10: 5rem;    /* 80px */
  --space-11: 6rem;    /* 96px */
  --space-12: 8rem;    /* 128px */
  --space-13: 10rem;   /* 160px */
}
```

**Animation Easing Library**
```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  --ease-spring: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Framer Motion Presets**
```typescript
// Staggered entrance
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
  }
};

// Scroll-triggered section reveal
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

// Card hover
const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 12px rgba(212,175,55,0)' },
  hover: {
    y: -6,
    boxShadow: '0 16px 40px rgba(212,175,55,0.15)',
    transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }
  }
};
```

### PATTERNS TO AVOID
- Pure black backgrounds (use obsidian #08070A instead -- slightly warm)
- Heavy WebGL (performance risk, not needed for a food brand)
- Custom cursors (distracting for a food ordering context)
- Aggressive parallax (causes nausea, breaks mobile)
- Monospace fonts (wrong vibe for luxury desserts)
- Terminal aesthetics (Vercel-specific, not brand-appropriate)
- Flat minimal illustrations (Notion-style, too casual for luxury)
- Star ratings or review scores (per brand guidelines)

---

## 10. COMPONENT LIBRARY MAPPING

### Aceternity UI Components to Consider
| Pattern | Component | Use Case |
|---------|-----------|----------|
| Hero parallax | Hero Parallax | Dessert showcase with scroll depth |
| Card hover | 3D Card Effect | Menu item cards |
| Background glow | Aurora Background | Hero section atmosphere |
| Text reveal | Text Generate Effect | Section headlines |
| Moving cards | Infinite Moving Cards | Testimonial carousel |
| Spotlight | Card Spotlight | Featured dessert highlight |
| Floating nav | Floating Navbar | Primary navigation |
| Animated border | Moving Border | CTA buttons |
| Lamp effect | Lamp Effect | Section headers (Linear-inspired) |
| Background beams | Background Beams | Hero background |
| Noise + gradient | Noise Background | Obsidian section texture |
| Bento grid | Layout Grid | Menu grid layout |

### Magic UI Components to Consider
| Pattern | Component | Use Case |
|---------|-----------|----------|
| Marquee | Marquee | Customer logos or flavor tags |
| Shimmer text | Shiny Text | Gold shimmer on headlines |
| Grid animation | Animated Grid | Background pattern |
| Gradient spin | Background Position Spin | Hero gradient animation |
| Ripple | Ripple Effect | Button click feedback |
| Aurora | Aurora Animation | Dark section atmosphere |
| Rainbow border | Rainbow Gradient | Premium card borders |

---

*Research completed 2026-03-11. Sources: Direct site analysis via web fetch, Rauno Gavioli's craft documentation, MDN Web Docs, CSS-Tricks, Aceternity UI component library, Magic UI component library, NNGroup minimalism research.*
