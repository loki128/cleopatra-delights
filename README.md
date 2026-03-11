<div align="center">

# Cleopatra Delights

**Handcrafted global desserts — Jacksonville, FL**

A full-stack production website for a food trailer business serving desserts inspired by Africa, the Middle East, Asia, Europe & the Americas.

### [cleopatradelights.com](https://cleopatradelights.com)

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion_12-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Live_on_Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://cleopatradelights.com)

</div>

---

## Overview

A production-grade marketing website and order platform for Cleopatra Delights, a Jacksonville-based food trailer specializing in globally-inspired desserts. Built from scratch with a custom dark-theme design system, cinematic animations, and a working custom order pipeline.

**Key features:**
- 58-item menu with category filtering, search, and animated card grid
- Custom order form with client + server validation, honeypot spam protection, and email delivery via Resend API
- Dual-row auto-scrolling gallery with CSS marquee animations
- Fully responsive (mobile-first) with WCAG 2.2 accessibility
- SEO-optimized with JSON-LD schema, Open Graph metadata, sitemap, and robots.txt
- Dark obsidian design system with Egyptian-inspired visual identity

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Email | Resend API |
| Deployment | Vercel (auto-deploy from `main`) |
| Domain | cleopatradelights.com |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, about, signature spotlight, gallery, find us, CTA |
| `/menu` | Full 58-item menu with category tabs, search, and animated cards |
| `/location` | Upcoming events schedule, Google Maps embed, Instagram CTA |
| `/order` | Custom order form with validation, custom dropdowns, and email delivery |

---

## Architecture

```
app/
├── layout.tsx              # Root layout, metadata, JSON-LD schema
├── page.tsx                # Homepage (7 sections)
├── globals.css             # Design tokens, animations, responsive utilities
├── api/order/route.ts      # POST endpoint — validates + sends via Resend
├── menu/                   # Menu page + layout (metadata)
├── location/               # Location page + layout (metadata)
└── order/                  # Order form page + layout (metadata)
components/
├── Navbar.tsx              # Glass navbar + mobile drawer + announcement bar
├── Hero.tsx                # Full-bleed hero with blur-in stagger animations
├── About.tsx               # Editorial typography section
├── SignatureSpotlight.tsx   # Featured product highlight
├── Gallery.tsx             # Dual-row CSS marquee photo gallery
├── FindUs.tsx              # Location info tiles + Instagram CTA
├── CTABanner.tsx           # Conversion banner
├── EgyptianDivider.tsx     # Decorative section divider
└── Footer.tsx              # 4-column footer with contact info
lib/
├── menuData.ts             # Menu items, categories, types
└── locationData.ts         # Events schedule, location data
```

---

## Running Locally

```bash
git clone https://github.com/loki128/cleopatra-delights.git
cd cleopatra-delights
npm install
```

Create `.env.local`:
```
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com
```

```bash
npm run dev
# Open http://localhost:3000
```

---

## Design System

- **Palette:** Obsidian (`#08070A`), Gold (`#D4AF37`), Crimson (`#8B1A1A`), Teal (`#1B7878`), Cream (`#FAF0E6`)
- **Typography:** Playfair Display (headings), Inter (body)
- **Surface elevation:** 4-tier token system (`--surface-0` through `--surface-3`)
- **Animations:** Blur-in stagger entrance, CSS marquee gallery, spring-based nav transitions

---

## Built By

**[@loki128](https://github.com/loki128)** -- self-taught developer, 18, Jacksonville FL.

---

## License

MIT 2026 Cleopatra Delights
