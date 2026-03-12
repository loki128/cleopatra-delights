<div align="center">

# Cleopatra Delights

**Handcrafted global desserts — Jacksonville, FL**

Full-stack production website and admin dashboard for a food trailer business serving desserts inspired by Africa, the Middle East, Asia, Europe & the Americas.

### [cleopatradelights.com](https://cleopatradelights.com)

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Live_on_Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://cleopatradelights.com)

</div>

---

## Overview

A production-grade marketing website, custom order platform, and admin dashboard for Cleopatra Delights. Built from scratch with two distinct design systems: an Egyptian-inspired dark theme for the public site, and a minimal Frost theme for the admin panel.

### Public Site
- 58-item menu with category filtering, search, and animated card grid
- Custom order form with client + server validation, honeypot spam protection, and email delivery via Resend
- Dual-row auto-scrolling gallery with CSS marquee animations
- Dark obsidian design system with Egyptian-inspired visual identity
- SEO-optimized with JSON-LD schema, Open Graph metadata, sitemap, and robots.txt

### Admin Dashboard (`/dashboard`)
- Protected admin panel with Google OAuth (NextAuth v5) and role-based access
- Real-time KPI cards: new orders, in-progress count, revenue, customer metrics
- Revenue analytics with weekly trend charts (Recharts)
- Order management: filtering, search, pagination, status workflows, timeline tracking
- Customer CRM: profiles, order history, notes, lifetime value stats
- Responsive sidebar with icon rail (64px) expanding to full nav (200px) on hover
- Frost design system: dark `#0a0a0a` background, blue `#3b82f6` accents, Geist typography

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animation | Framer Motion 12 |
| Database | Supabase (PostgreSQL 17) via connection pooler |
| ORM | Prisma 7.5 with `@prisma/adapter-pg` driver |
| Auth | NextAuth v5 (Auth.js) with Google OAuth |
| Email | Resend API |
| Charts | Recharts |
| Tables | TanStack Table |
| Validation | Zod + React Hook Form |
| Icons | Lucide React |
| Fonts | Playfair Display + Inter (public), Geist Sans + Mono (dashboard) |
| Deployment | Vercel (auto-deploy from `main`) |
| Domain | cleopatradelights.com |

---

## Architecture

```
app/
├── layout.tsx                    # Root layout, metadata, JSON-LD schema
├── page.tsx                      # Homepage (7 sections)
├── globals.css                   # Design tokens, both theme systems
├── menu/                         # 58-item menu with category tabs
├── location/                     # Events schedule, Google Maps
├── order/                        # Custom order form
├── api/
│   ├── order/route.ts            # POST — validates + sends via Resend
│   └── auth/[...nextauth]/       # NextAuth API routes
└── dashboard/
    ├── layout.tsx                # Geist font loader
    ├── (auth)/login/             # Google OAuth login (no sidebar)
    └── (main)/                   # Authenticated routes (with sidebar)
        ├── layout.tsx            # Session provider + DashboardShell
        ├── page.tsx              # Overview: KPIs, charts, recent orders
        ├── orders/               # Order list + detail pages
        ├── customers/            # Customer list + detail pages
        └── settings/             # Account settings

components/
├── Navbar.tsx                    # Glass navbar + mobile drawer
├── Hero.tsx                      # Full-bleed hero with stagger animations
├── Gallery.tsx                   # Dual-row CSS marquee gallery
└── dashboard/
    ├── DashboardShell.tsx        # Layout wrapper with sidebar offset
    ├── DashboardSidebar.tsx      # Collapsible icon rail sidebar
    ├── StatCard.tsx              # KPI stat cards
    ├── RevenueChart.tsx          # Weekly revenue line chart
    ├── StatusBreakdownChart.tsx  # Order status donut chart
    ├── OrdersTable.tsx           # Sortable, filterable order table
    ├── CustomersTable.tsx        # Customer data table
    ├── OrderDetailPanel.tsx      # Order detail view with timeline
    ├── OrderActionsPanel.tsx     # Status update + notes
    └── ...                       # 20+ dashboard components

lib/
├── prisma.ts                     # Prisma client with pooler auto-config
├── auth.ts                       # NextAuth config + admin email guard
├── dashboard-stats.ts            # Aggregation queries (revenue, trends)
├── menuData.ts                   # Menu items and categories
└── validations/order.ts          # Zod schema for order form

prisma/
└── schema.prisma                 # Customer, Order, OrderTimeline, User models
```

---

## Running Locally

```bash
git clone https://github.com/loki128/cleopatra-delights.git
cd cleopatra-delights
npm install
```

Create `.env.local`:
```env
# Database (Supabase pooler — transaction mode)
DATABASE_URL=postgresql://postgres.PROJECT_REF:PASSWORD@aws-1-REGION.pooler.supabase.com:6543/postgres

# Email
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your@email.com

# Auth
AUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_SECRET=same-as-auth-secret
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret
ADMIN_EMAILS=admin@example.com
```

```bash
npx prisma db push    # Create database tables
npm run dev            # Open http://localhost:3000
```

---

## Design Systems

### Public Site — Egyptian Obsidian
- **Palette:** Obsidian `#08070A`, Gold `#D4AF37`, Crimson `#8B1A1A`, Teal `#1B7878`, Papyrus `#F2E4C8`
- **Typography:** Playfair Display (headings), Inter (body)
- **Zones:** Three-zone layout system (Obsidian, Papyrus, Nile)
- **Animation:** Blur-in stagger entrance, spring-based transitions, CSS marquee gallery

### Admin Dashboard — Frost
- **Palette:** Near-black `#0a0a0a`, surfaces `#0f0f0f`-`#1a1a1a`, blue accent `#3b82f6`
- **Typography:** Geist Sans (UI), Geist Mono (data/numbers)
- **Tokens:** Full CSS custom property system (`--dash-*` prefix)
- **Components:** Cards, stat tiles, tables, badges, tooltips, skeleton loaders

---

## Built By

**[@loki128](https://github.com/loki128)** — self-taught developer, 18, Jacksonville FL.

---

## License

MIT 2026 Cleopatra Delights
