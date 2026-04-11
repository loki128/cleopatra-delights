# Cleopatra Delights — Project Instructions

## Stack
- Next.js 16 (App Router, Turbopack)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion 12
- Prisma 7.5 + Supabase PostgreSQL
- NextAuth v5 (Google OAuth)
- Recharts, TanStack Table, Zod, date-fns, Lucide React

## Design Tools — USE PROACTIVELY

### MeiGen (image generation MCP)
- **Always use** for hero images, product photography, textures, backgrounds, OG images
- Brand preferences already configured: Egyptian luxury, obsidian backgrounds, gold accents, cinematic food photography
- Use `enhance_prompt` before generating — never send bare prompts
- Use `search_gallery` and `get_inspiration` for reference before creating

### Stitch (UI design MCP)
- **Always use** for new pages, sections, or layout exploration
- `generate_screen_from_text` for initial screen concepts
- `generate_variants` to explore 2-3 directions before coding
- Never jump to code without visual exploration first

### Figma MCP
- Use when user provides Figma URLs
- `get_design_context` extracts code + screenshot
- Adapt output to this project's design system, don't copy raw

### Context7 (live docs)
- Query before using any library API to avoid hallucinated methods
- Key library IDs:
  - shadcn/ui: `/shadcn/ui`
  - Magic UI: `/magicuidesign/magicui`
  - Aceternity UI: `/websites/ui_aceternity_components`

## Component Sourcing (ALWAYS follow this order)

1. **shadcn/ui** — `npx shadcn@latest add [component]` (first choice for all standard UI)
2. **Aceternity UI** — `npx shadcn@latest add @aceternity/[component]` (hero effects, spotlights, 3D cards)
3. **Magic UI** — `npx shadcn@latest add @magicui/[component]` (marquee, bento grid, animated patterns)
4. **21st.dev** — browse for community shadcn blocks
5. **Float UI / Hover.dev** — testimonials, polished hover effects
6. **Origin UI** — clean functional components (forms, tables)
7. Custom code — LAST resort, only when no registry has it

## Design System

### Egyptian Obsidian Theme (public site)
```
--papyrus: #F2E4C8    (warm background)
--obsidian: #08070A   (dark sections)
--nile: #0A1F1F       (testimonials zone)
--gold: #D4AF37       (primary accent, CTAs)
--red: #8B1A1A        (danger, heat)
--teal: #1B7878       (secondary accent)
--sand: #C8A862       (gold muted)
--charcoal: #1C1C1C   (text on light)
```

### Frost Theme (admin dashboard)
```
--dash-bg: #0a0a0a
--dash-surface: #0f0f0f / #141414 / #1a1a1a
--dash-accent: #3b82f6
--dash-text-primary: #f5f5f5
--dash-text-secondary: #a3a3a3
--dash-border: #262626
```

### Typography
- Headings: Playfair Display (public), Geist Sans (dashboard)
- Body: Inter (public), Geist Sans (dashboard)
- Data/numbers: Geist Mono (dashboard)

### Three-Zone Layout
- **Obsidian zone**: dark bg, gold/light text (hero, featured sections)
- **Papyrus zone**: warm light bg, dark text (content, menus)
- **Nile zone**: deep teal bg, light text (testimonials, social proof)

## Utility
- Use `cn()` from `@/lib/cn` for all className composition (tailwind-merge + clsx)
- Use `@formkit/auto-animate` for list/grid animations (one hook, zero config)
- Use `@vercel/og` for OG image generation in API routes
- Always use `next/image` — never raw `<img>`

## Quality Gates

Before any PR or deploy:
- [ ] `npm run build` passes clean (zero errors)
- [ ] No console errors in browser
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1440px)
- [ ] WCAG 2.2 AA contrast ratios
- [ ] ARIA labels on interactive elements
- [ ] Lighthouse: no regressions from baseline

## Rules

- Never break existing routes, data shapes, or API contracts
- No emojis in UI
- No star ratings (luxury positioning)
- Egyptian heritage must be visible in design, not just copy
- Brand voice in form labels ("Tell Us Everything", "What Are You Craving?")
- Post-change reports: list files changed, why, what was verified
- Workflow: audit > plan > implement > verify > refine (never skip steps)
