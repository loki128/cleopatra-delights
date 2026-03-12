# Dashboard UI Redesign — Product Requirements Document

## Executive Summary

This PRD defines a **complete visual and UX overhaul** of the Cleopatra Delights admin dashboard. The current interface is functional but visually weak: flat, cramped, low-contrast, and amateur-looking. The goal is to transform it into a **premium, modern SaaS-style dashboard** with a dark luxury aesthetic—black/charcoal foundation, elegant gold accents, strong hierarchy, and polished components—that feels like a product built for real businesses (Stripe/Linear/premium analytics caliber) while retaining a subtle connection to the Cleopatra Delights luxury dessert brand.

The document is written for **Claude Code** (or similar implementation agents) to use as the primary blueprint. It is opinionated and specific: it names what is wrong, what should change, and in what order. No code is included; the output is a design and UX specification that drives implementation.

---

## 1. Product Overview

- **Product:** Cleopatra Delights Order Management Dashboard (admin-only web app).
- **Scope of this PRD:** UI/UX redesign only. No change to features, data model, auth, or API behavior. Same pages, same flows, same data—radically improved presentation and interaction quality.
- **Users:** Single admin (Lukita, bakery owner). The dashboard is a daily work tool for orders, customers, and business metrics.
- **Tech context:** Next.js, TypeScript, Tailwind, existing dark theme with gold accents. Redesign applies to layout, components, tokens, and composition—not to the underlying stack.

---

## 2. Problem Statement: Current UI

The current dashboard suffers from predictable “template syndrome”: it works but does not feel intentional or premium. Specific problems:

- **Flat and lifeless:** Backgrounds and surfaces lack depth. Cards and panels look like flat rectangles with thin borders instead of layered, intentional surfaces. There is little sense of elevation or hierarchy.
- **Cramped and poorly spaced:** Padding and margins are inconsistent and often too small. Content feels squeezed. There is no clear spacing system, so some areas feel dense and others oddly empty.
- **Low contrast and weak hierarchy:** Text and UI elements do not create a clear reading order. Primary vs. secondary information is underdifferentiated. Gold accents are underused or applied inconsistently, so the palette feels muted rather than intentional.
- **Amateur and prototype-like:** The overall impression is “side project” or “internal tool,” not “product we could sell.” Typography is generic, components are basic, and there is no cohesive visual language.
- **Sidebar:** Too narrow, making labels and icons feel cramped. Proportions feel off relative to the main content. Active state and hierarchy are unclear. It does not feel like a confident navigation rail.
- **KPI / stat cards:** Thin, small, and visually lightweight. They do not command attention or feel like the “headline” metrics they are. Numbers and labels lack typographic emphasis.
- **Charts and tables:** Placed on the page but not integrated into the layout. Charts feel like dropped-in widgets; tables feel like raw data grids. There is no clear relationship between charts, filters, and tables (e.g. shared headers, aligned spacing, or visual grouping).
- **Typography:** Scale and weight are underdifferentiated. Headings do not feel like real headings; body and metadata blur together. No clear type scale or rhythm.
- **Brand:** The dark + gold idea is present but not executed with confidence. The result feels generic dark theme rather than “luxury dashboard with gold accent.”

These issues together make the dashboard feel bland, cramped, unattractive, low-contrast, and amateur. The redesign must directly address each of these.

---

## 3. Redesign Goals

1. **Premium perception:** A stakeholder should be able to look at the dashboard and believe it is a professional, sellable product—Stripe/Linear/premium analytics quality, not a basic admin template.
2. **Strong visual hierarchy:** At a glance, the user knows what is primary (e.g. key metrics, current focus), what is secondary (supporting data), and what is tertiary (metadata, actions). Hierarchy is achieved through size, weight, color, and spacing—not guesswork.
3. **Dark luxury aesthetic:** Black/charcoal foundation with elegant gold accents. High contrast where it matters (text, key numbers, CTAs); tasteful restraint elsewhere. The feel is “high-end SaaS with a luxury brand touch,” not “generic dark UI.”
4. **Cohesive layout and spacing:** A single spacing and grid system applied consistently. Layout feels intentional: sidebar, header, content, and components share alignment and rhythm. No random gaps or cramped zones.
5. **Polished components:** Every major component (sidebar, header, KPI cards, charts, tables, filters, badges, empty/loading states) is redesigned to feel substantial, readable, and integrated—not thin, generic, or floating.
6. **Subtle brand fit:** The dashboard should feel like it belongs to Cleopatra Delights (luxury desserts) in a subtle, sophisticated way—e.g. through accent color, occasional warmth in secondary elements, or typographic flair—without becoming thematic or decorative.

---

## 4. Design Principles

- **Clarity over decoration:** Every visual choice should make the interface easier to scan and use. Avoid decorative elements that do not support hierarchy or task completion.
- **Confidence through scale and weight:** Use size and font weight boldly to signal importance. Primary content is larger and bolder; secondary content is clearly smaller and lighter. Do not be timid with type scale.
- **Depth through elevation, not clutter:** Use subtle background steps (e.g. surface-0, surface-1, surface-2) and restrained borders/shadows to create depth and grouping. Avoid visual noise.
- **Gold as accent, not filler:** Gold is for emphasis: key numbers, primary actions, active states, and critical highlights. Do not dilute it with overuse on every card or border.
- **Whitespace as structure:** Generous, consistent spacing defines sections and reduces cognitive load. Dense areas (e.g. table rows) are intentionally dense; elsewhere, breathe.
- **One system:** Typography, color, and spacing are defined as systems and applied consistently. No one-off values that break the system.

---

## 5. Target Visual Style

- **Genre:** Premium modern SaaS dashboard with dark luxury positioning.
- **References (vibe, not copy):** Stripe Dashboard (clarity, spacing, confidence), Linear (refined dark UI, subtle motion), premium analytics dashboards (e.g. Vercel, well-crafted Metabase/Retool themes)—polished, high-information-density-but-readable, professional.
- **Mood:** Confident, calm, efficient. The dashboard feels like a tool built for serious use. Luxury is conveyed through restraint and quality (materials, spacing, typography) rather than ornament.
- **Cleopatra Delights fit:** Gold accent and a slightly warm dark base (e.g. very subtle warmth in charcoal) can echo “luxury dessert brand” without literal imagery or playful elements. Think “same brand, professional context.”

---

## 6. Layout Architecture Changes

- **Establish a clear grid:** Main content area uses a consistent column grid (e.g. 12-column). All sections, cards, and tables align to this grid. No floating or misaligned blocks.
- **Define regions explicitly:** (1) Sidebar (fixed width, full height), (2) Main content area with optional top bar or page header, (3) Content area with consistent horizontal and vertical padding. Regions have clear boundaries (e.g. background or border separation).
- **Page-level structure:** Each page type (overview, list, detail) has a defined structure: optional page title + actions, then primary content blocks. Blocks are full-width or grid-based as appropriate. No ad-hoc stacking without a reason.
- **Consistent gutters:** Same horizontal padding for the main content area across breakpoints (e.g. 24px or 32px from viewport edge to content). Vertical rhythm: consistent spacing between major sections (e.g. 24px or 32px).
- **Fix the “empty” feel:** Ensure the main content area is never a vast sea of one background. Use cards, panels, or clear section backgrounds so the eye has anchors. The overview page in particular should feel composed, not sparse.

---

## 7. Sidebar Redesign

**Current problems:** Too narrow; labels and icons cramped; weak hierarchy; does not feel like a confident navigation rail.

**Target:**

- **Width:** Increase to a comfortable fixed width (e.g. 240–260px on desktop). The sidebar should feel like a dedicated zone, not an afterthought. Collapsible to icon-only (e.g. ~64px) if desired, but default state is expanded.
- **Background and elevation:** Distinct from main content—e.g. surface-1 or slightly darker than main content so it reads as “nav” not “same as content.” Optional very subtle right border or shadow to separate from content.
- **Logo zone:** Dedicated area at top with logo (or wordmark) and enough padding. Size the logo so it feels intentional, not tiny.
- **Nav items:** Generous vertical padding per item (e.g. 10–12px vertical, 12–16px horizontal). Icon + label; icon size large enough to read (e.g. 20px). Clear hover state (background or color shift). **Active state:** Unmistakable—e.g. gold left border or gold accent background, plus bolder or brighter label. Do not rely on a barely visible background change.
- **Badge (e.g. NEW order count):** If present, size and position it so it’s visible but not noisy. Prefer a small pill with contrast (e.g. gold or accent) rather than a tiny number lost in the sidebar.
- **Bottom group:** Sign out and “Back to site” separated (divider or spacing) from main nav. Same padding and hover rules for consistency.
- **Typography:** Labels use the same font as the rest of the app but with clear active/hover states. No tiny or low-contrast text.

---

## 8. Header / Top Bar Redesign

**Current problems:** If present, likely minimal or inconsistent. Page titles and global context may be weak.

**Target:**

- **Presence:** A clear top bar or page-header strip for the main content area. Height sufficient to feel like a “header” (e.g. 56–64px) with consistent horizontal padding matching content.
- **Content:** Page title (e.g. “Overview”, “Orders”, “Customers”) as the primary element—larger, bolder, clear typographic hierarchy. Optional breadcrumb or context line for detail pages (e.g. Order #12345).
- **Actions:** Primary actions (e.g. “Add”, “Export”, or page-specific actions) aligned to the right. Buttons should follow the same component system (primary = gold/accent, secondary = outline or ghost). Do not mix random button styles.
- **Separation:** Subtle bottom border or slight background difference from content below so the header reads as a distinct strip. No heavy visual weight—just enough to define the region.

---

## 9. KPI / Stat Card Redesign

**Current problems:** Thin, lifeless, do not command attention; numbers and labels lack emphasis.

**Target:**

- **Size and proportion:** Cards are substantial—enough padding (e.g. 20–24px internal) and a minimum height so they feel like “cards” not “labels.” Consider making the primary KPI (e.g. “New orders” or “Revenue”) slightly larger or more prominent than the others.
- **Structure:** Clear internal hierarchy: (1) Label or category (e.g. “New orders”) in smaller, secondary text; (2) Main value (number or currency) as the dominant element—large, bold, high contrast; (3) Optional subtext (e.g. “vs last month”, “Needs attention”) in smaller, muted text.
- **Visual treatment:** Background distinct from page background (e.g. surface-1). Optional very subtle border or soft shadow for depth. Do not use heavy borders or noisy patterns. Gold accent reserved for the primary metric or a subtle accent (e.g. left border) on the “attention” card.
- **Alignment:** Cards sit on the grid; spacing between cards is consistent (e.g. 16px or 24px). They align with the content below (charts, tables).
- **Numbers:** Use tabular figures if available for numeric alignment. Ensure sufficient size and weight so the number is the first thing the eye hits in the card.

---

## 10. Chart and Analytics Section Redesign

**Current problems:** Charts feel like dropped-in widgets; not visually integrated with the rest of the layout.

**Target:**

- **Containers:** Each chart lives in a clear container (card or panel) with a header: title (e.g. “Revenue (last 8 weeks)”) and optional controls (e.g. period selector). Container has same padding and elevation system as other cards. Background matches surface system.
- **Chart area:** Adequate height so the chart is readable (e.g. minimum 280–320px for main revenue chart). Padding inside the chart area so axes and labels are not cramped.
- **Aesthetics:** Axes and gridlines subtle (e.g. low-opacity lines). Gold (or accent) for primary data series; secondary series in a complementary color (e.g. teal or muted gold). No chartjunk. Legend if needed: clear, compact, same typography system.
- **Integration:** Charts align with the grid and spacing of KPI cards and tables above/below. Optional shared “Analytics” or “Overview” section background to group KPI + charts visually.
- **Status breakdown (e.g. donut or bar):** Same container treatment. Proportions and colors for statuses consistent with status badges used in tables and detail views.

---

## 11. Table / List Redesign

**Current problems:** Tables feel like raw data grids; not visually integrated; weak hierarchy.

**Target:**

- **Container:** Table is inside a card or panel with a header (e.g. “Recent orders”, “All orders”). Header can include filter summary or quick actions. Same elevation and padding system as other cards.
- **Row height:** Generous enough to scan (e.g. 48–56px minimum). Do not cram rows; if density is needed, do it deliberately with a “compact” variant.
- **Columns:** Primary column (e.g. customer name or order ID) has more visual weight (e.g. bolder or slightly larger). Secondary columns (dates, amounts, status) use consistent typography—readable but subordinate. Right-align numbers (e.g. totals, counts) for scanability.
- **Status badges:** Redesigned (see Section 12)—consistent with the rest of the system, clear contrast, not tiny.
- **Hover and interaction:** Row hover state is clear (e.g. background change). Click target (e.g. row or “View”) is obvious. No mystery clickability.
- **Borders and dividers:** Prefer subtle row dividers or alternating row backgrounds only if they improve readability. Avoid heavy grid lines everywhere.
- **Header row:** Sticky on scroll if table is long. Header typography: uppercase or small-caps, letter-spacing, or weight to distinguish from body. Background distinct so it stays readable when scrolling.

---

## 12. Empty States, Loading States, and Status Badges

**Empty states:**

- Dedicated layout: icon or illustration (simple, on-brand), short headline, short description, optional CTA (e.g. “View all orders” or “Go to orders”). Centered or aligned to content. Use secondary text color; do not leave a blank area or a single line of grey text.

**Loading states:**

- Skeleton loaders that mirror the real layout (cards, table rows, chart area). Same spacing and approximate proportions. Subtle animation (e.g. shimmer). Avoid spinners alone for large content areas; prefer skeletons so layout doesn’t jump.

**Status badges:**

- Pill or chip style with clear semantic colors: e.g. New = gold/amber, In progress = teal, Done/Delivered = green, Cancelled = red, Review/neutral = gray. Sufficient padding and font size so they’re readable and tappable. Contrast checked for accessibility. Consistent across tables, detail views, and filters.

---

## 13. Typography System

- **Define a type scale:** e.g. 12, 14, 16, 18, 24, 32 (or similar). Every text element maps to a scale step. No arbitrary font sizes.
- **Font stack:** Retain Playfair (or similar serif) for page titles or key headlines if it fits the brand; use a strong sans (e.g. Inter, Geist) for UI and data. Ensure fallbacks for system fonts.
- **Weights:** At least regular (400) and semibold (600) in use; bold (700) for primary headings and key numbers. Avoid “everything medium.”
- **Hierarchy:** Page title (largest, bold); section headings (smaller, semibold); card/section titles (smaller still); body (default); metadata and captions (smallest, lighter color/weight). Line heights: comfortable for body (e.g. 1.5); tighter for large display numbers if needed.
- **Apply consistently:** Same scale and weights across sidebar, header, cards, tables, and detail views. No one-off “big number” or “tiny label” that doesn’t sit in the scale.

---

## 14. Color System

- **Foundation:** Black or near-black (e.g. #0a0a0a, #111) for true dark mode; charcoal (e.g. #1a1a1a, #1f1f1f) for main content background. Surface steps: surface-0 (base), surface-1 (cards, sidebar), surface-2 (elevated panels, inputs) with subtle steps—not all the same gray.
- **Text:** Primary text high contrast (e.g. near white or cream); secondary text clearly muted but readable; tertiary/placeholder even lighter. Ensure WCAG AA for body text at least.
- **Gold accent:** Single gold (or gold range) for primary actions, key metrics, active nav, critical highlights. Use sparingly so it stays special. Optional darker gold for hover/pressed.
- **Semantic:** Success (green), warning (amber), error (red), neutral (gray) for statuses and alerts. Chosen to work on dark background with sufficient contrast.
- **Borders and dividers:** Low-opacity white or gold; avoid harsh lines. Use borders to separate regions, not to decorate every card.

---

## 15. Spacing and Grid System

- **Base unit:** e.g. 4px. All spacing is a multiple: 4, 8, 12, 16, 24, 32, 48, 64.
- **Content padding:** Main content area: e.g. 24px or 32px horizontal; 24px or 32px vertical between major sections.
- **Component internal:** Cards: 20–24px padding. Table cells: 12–16px horizontal, 14–18px vertical. Buttons: consistent padding by size (sm/md/lg).
- **Between components:** Consistent gap between cards (e.g. 16 or 24px). Same gap in grid layouts. Vertical rhythm: e.g. 24px between sections; 16px between related elements.
- **Grid:** 12-column grid for main content. Gaps (e.g. 24px) between columns. KPI cards, chart, and table sections align to this grid.

---

## 16. Interaction and Animation Guidance

- **Transitions:** Short (150–250ms) for hover, focus, and state changes. Use for background, border, color—not for layout jumps unless necessary (e.g. sidebar collapse).
- **Page transitions:** Optional subtle fade or slide when navigating between list and detail. Keep it quick and purposeful; avoid flashy effects.
- **Feedback:** Buttons and links have clear hover and focus states. Form inputs have focus ring (visible, accessible). Status changes (e.g. order status update) can show brief confirmation (toast or inline) without being disruptive.
- **Restraint:** This is a work tool. Animation should support clarity and feedback, not decoration. No auto-playing or distracting motion.

---

## 17. Responsive Behavior

- **Breakpoints:** Define clear breakpoints (e.g. 640, 768, 1024, 1280). Layout and spacing scale appropriately.
- **Sidebar:** On smaller screens (e.g. below 1024px), sidebar becomes overlay/drawer or collapses to icons with slide-out. Main content gets full width when sidebar is hidden.
- **KPI cards:** Stack or 2x2 on small screens; 4-column on large. Same card design; only layout changes.
- **Tables:** Horizontal scroll with sticky first column (or key column) if needed; or consider card-based list view on very small screens. Do not simply squash columns.
- **Charts:** Responsive width; height can be fixed or aspect-ratio based. Labels and legend remain readable.
- **Touch:** Tap targets at least 44px where interactive. Spacing between interactive elements sufficient to avoid mis-taps.

---

## 18. Accessibility Expectations

- **Color:** Do not rely on color alone for status or hierarchy. Use icon, label, or pattern in addition to color where meaning is critical.
- **Contrast:** Text and interactive elements meet WCAG AA (4.5:1 for normal text; 3:1 for large text and UI components). Check gold and accent on dark backgrounds.
- **Focus:** All interactive elements have visible focus indicator. Focus order is logical (e.g. sidebar → main content; top to bottom in forms).
- **Semantics:** Headings in order (h1 → h2 → h3). Tables have proper headers; lists use list markup. Buttons vs. links used correctly.
- **Motion:** Respect prefers-reduced-motion: disable or shorten non-essential animation when the user has requested reduced motion.

---

## 19. Component-by-Component Implementation Priorities

Implement in this order so that the layout and system are in place before polishing every detail.

1. **Design tokens (colors, spacing, type scale):** Define or update CSS variables (or Tailwind/theme) for colors, spacing scale, and typography. All subsequent work uses these.
2. **Layout and grid:** Main shell—sidebar width and styling, main content area, grid, and gutters. Get the “frame” right.
3. **Sidebar:** Full sidebar redesign (width, nav items, active/hover, logo, bottom group). This sets the tone for the app.
4. **Header / top bar:** Page title and actions strip. Consistent across pages.
5. **KPI cards:** New card component with hierarchy (label, value, subtext), padding, and elevation. Apply on overview.
6. **Charts:** Container and header; chart styling (axes, colors, legend). Revenue and status breakdown.
7. **Tables:** Container, header row, row height, typography, borders/dividers. Then status badges inside tables.
8. **Status badges:** Standalone component used in tables, detail views, filters. Semantic colors and sizing.
9. **Forms and inputs (detail pages):** Inputs, selects, textareas, primary/secondary buttons. Match new color and spacing system.
10. **Detail pages (order, customer):** Apply cards, spacing, and typography to two-column (or rethought) layout. Timeline and notes.
11. **Empty and loading states:** Skeletons and empty state layouts. Use across list and overview where relevant.
12. **Filters and search:** Filter bar or strip styling; search input and dropdowns. Visually integrated with tables.
13. **Responsive and polish:** Sidebar collapse/overlay, card stacking, table behavior on small screens. Final pass on spacing and alignment.
14. **Accessibility and motion:** Focus states, reduced-motion, contrast check. Document any remaining tech debt.

---

## 20. Success Criteria for the Redesign

- **Perception:** A neutral reviewer would describe the dashboard as “premium,” “modern,” and “polished,” not “template-like” or “prototype.”
- **Hierarchy:** Primary information (e.g. key metrics, current page focus, primary actions) is obvious at a glance; secondary and tertiary content is clearly subordinate.
- **Consistency:** Typography, color, spacing, and component style are consistent across overview, list, and detail pages. One design system in evidence.
- **Brand:** Dark luxury with gold accent is clearly executed; the dashboard feels like a professional tool that could sit alongside the Cleopatra Delights brand without clashing.
- **Usability:** No regression in task completion; navigation, filters, and actions remain clear. Improved spacing and contrast should improve scannability.
- **Accessibility:** Meets WCAG AA for contrast and focus; semantics and reduced motion considered.
- **Responsive:** Layout and components behave correctly from mobile to desktop; sidebar and tables are usable on small screens.

---

## Phased Execution Plan for Claude Code

**Phase 1 — Foundation (tokens and layout)**  
- Audit or create design tokens: color palette (background, surfaces, text, gold, semantic), spacing scale (4–64px), type scale and weights.  
- Implement layout shell: sidebar width and background, main content area with grid and gutters, consistent padding.  
- Do not change every component yet; ensure the shell and tokens are the single source of truth for the next steps.

**Phase 2 — Navigation and page frame**  
- Redesign sidebar: width, logo zone, nav items (padding, icon size, active/hover), badge, bottom group.  
- Add or redesign header/top bar: page title, optional breadcrumb, primary actions.  
- Apply to all dashboard pages so every page has the new frame.

**Phase 3 — Overview page**  
- Redesign KPI cards: size, padding, label/value/subtext hierarchy, elevation.  
- Redesign chart containers: header, padding, chart height; style axes and series (gold/accent).  
- Redesign recent-orders table (or equivalent): container, row height, typography, status badges.  
- Ensure overview feels composed and premium, not flat or empty.

**Phase 4 — Lists (orders, customers)**  
- Redesign table component: container, header row, column hierarchy, row height, borders/dividers.  
- Redesign status badges as a reusable component; apply in tables.  
- Redesign filters/search bar: layout, inputs, alignment with table.  
- Apply to orders list and customers list.

**Phase 5 — Detail pages**  
- Redesign order detail: two-column (or rethought) layout, cards for customer and order info, timeline, actions panel. Use new tokens and spacing.  
- Redesign customer detail: customer card, notes, order history table.  
- Ensure forms (inputs, buttons, textareas) use the new system.

**Phase 6 — States and polish**  
- Implement empty states (layout, copy, optional CTA) for list and overview.  
- Implement loading skeletons for overview, list, and detail.  
- Final pass: alignment to grid, spacing consistency, responsive behavior (sidebar, cards, tables).  
- Accessibility: focus states, contrast check, reduced-motion for animations.

**Phase 7 — Verification**  
- Walk through every page and confirm: no bland/cramped/low-contrast hotspots; hierarchy is clear; components feel integrated.  
- Confirm success criteria (Section 20) and fix any gaps.  
- Document any remaining limitations or future improvements.

---

*End of PRD. Use this document as the blueprint for the full UI redesign; implement in the order above and do not ship isolated styling changes without updating the system (tokens, layout, and components) first.*
