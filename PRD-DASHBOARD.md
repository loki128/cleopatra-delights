# Cleopatra Delights — Order Management Dashboard
## Product Requirements Document

---

## 1. What Is This

A private admin dashboard for Cleopatra Delights. Customer orders come in through the public website form and land in this dashboard instead of (or in addition to) email. The owner can track every order from inquiry to delivery, see business stats at a glance, and manage customers.

**Public site:** cleopatradelights.com (already built)
**Admin dashboard:** cleopatradelights.com/dashboard (new — behind login)

Both live in the same Next.js app. One codebase, one deployment.

**Design stance:** The current dashboard UI (if any exists) is to be treated as a **rough wireframe only**—something that defines content and flows, not something to preserve. The implementation should **rethink visual hierarchy, spacing, component sizing, and overall composition from the ground up** while keeping the same core functionality. The goal is a transformative redesign, not a visual match to the wireframe.

---

## 2. Core User

Lukita (bakery owner). Single admin user to start. The dashboard is not customer-facing — customers still use the public order form. This keeps scope tight while still demonstrating auth, database, CRUD, and dashboard patterns.

Future: could add a customer portal where customers track their own order status, but that's v2.

---

## 3. Tech Stack (New Additions)

| Layer | Technology | Why |
|-------|-----------|-----|
| Database | Supabase (PostgreSQL) | Free tier, hosted, realtime option later |
| ORM | Prisma | Type-safe database queries, easy migrations |
| Auth | NextAuth.js v5 | Google sign-in, session management, route protection |
| Charts | Recharts | Lightweight, React-native, good dark theme support |
| Tables | TanStack Table | Sorting, filtering, pagination — industry standard |
| Date handling | date-fns | Lightweight date formatting and manipulation |

Everything else stays the same (Next.js 16, TypeScript, Tailwind v4, Framer Motion).

---

## 4. Data Model

### Orders Table
```
id              String    @id @default(cuid())
createdAt       DateTime  @default(now())
updatedAt       DateTime  @updatedAt

// Customer info (from form submission)
customerName    String
customerEmail   String
customerPhone   String?
orderType       String        // "NYC Cookie Box", "Brownie Tray", etc.
occasion        String?
eventDate       DateTime?
notes           String        // the "Tell Us Everything" field
howHeard        String?

// Dashboard-only fields (admin manages these)
status          OrderStatus   @default(NEW)
total           Float?        // price quoted, nullable until confirmed
internalNotes   String?       // private notes (not visible to customer)
```

### OrderStatus Enum
```
NEW           — just came in, hasn't been reviewed
REVIEWED      — owner has seen it, thinking about it
CONFIRMED     — accepted, price quoted, customer agreed
IN_PROGRESS   — currently being made
READY         — done, waiting for pickup/delivery
DELIVERED     — handed off to customer
CANCELLED     — cancelled by either party
```

### Customers Table (auto-created from orders)
```
id              String    @id @default(cuid())
name            String
email           String    @unique
phone           String?
firstOrderAt    DateTime
orderCount      Int       @default(1)
totalSpent      Float     @default(0)
notes           String?   // "always wants extra frosting", "allergic to nuts"
```

### User Table (for auth — just the admin)
```
id              String    @id
email           String    @unique
name            String?
role            Role      @default(ADMIN)
```

---

## 5. Pages & Layout

### Layout: Sidebar + Main Content
Dark theme; brand alignment with Cleopatra Delights (obsidian/gold). Fixed sidebar on desktop, collapsible on mobile. **Exact proportions, spacing, and visual weight are to be redesigned**—treat any existing layout as wireframe-only.

```
/dashboard              → Overview (stats + recent orders)
/dashboard/orders       → All orders table (filterable, sortable)
/dashboard/orders/[id]  → Single order detail + edit
/dashboard/customers    → Customer list
/dashboard/customers/[id] → Single customer + order history
/dashboard/settings     → Account settings (future)
```

### Sidebar Navigation
- Logo (small, top)
- Overview
- Orders (with count badge for NEW orders)
- Customers
- Divider
- Back to Public Site (link to /)
- Sign Out

---

## 6. Page-by-Page Breakdown

### 6A. Overview Dashboard (`/dashboard`)

The home screen. Answers: "How's business doing?"

**Top row — 4 stat cards:**
| Card | Value | Subtext |
|------|-------|---------|
| New Orders | count of status=NEW | "Needs your attention" |
| In Progress | count of IN_PROGRESS | "Currently being made" |
| Revenue (This Month) | sum of total where DELIVERED this month | vs last month % change |
| Total Customers | distinct customer count | "X new this month" |

**Middle row — Revenue chart:**
- Bar chart or area chart showing revenue by week for the last 8 weeks
- Clean, minimal, dark theme (gold accent bars on obsidian background)

**Bottom row — Recent Orders table (last 10):**
- Columns: Customer, Order Type, Date, Status (color-coded badge), Total
- Click any row → goes to /dashboard/orders/[id]
- "View All Orders" link at bottom

**Bottom row — Order Status Breakdown:**
- Simple donut or horizontal bar showing distribution across statuses
- Visual at-a-glance: how many orders are in each stage

### 6B. Orders Page (`/dashboard/orders`)

Full table of all orders. This is the workhorse page.

**Filters bar (top):**
- Status dropdown (All, New, Confirmed, In Progress, Ready, etc.)
- Order Type dropdown (Cookie Box, Brownie Tray, etc.)
- Date range picker (This Week, This Month, Last 30 Days, Custom)
- Search box (searches customer name, email, notes)

**Table columns:**
| Column | Details |
|--------|---------|
| Order # | Short ID or incremental number |
| Customer | Name + email below in smaller text |
| Type | Order type with category color |
| Event Date | When they need it |
| Status | Color-coded pill badge |
| Total | Dollar amount or "—" if not quoted |
| Created | Relative time ("2 hours ago", "Mar 8") |
| Actions | Quick status change dropdown, view button |

**Table features:**
- Sortable by any column (click header)
- Pagination (20 per page)
- Bulk select + bulk status change (nice to have, not v1 critical)

**Empty state:** Friendly message when no orders match filters.

### 6C. Single Order Detail (`/dashboard/orders/[id]`)

Full view of one order with ability to edit.

**Left column (2/3 width):**
- Order header: status badge, order type, created date
- Customer info card: name, email, phone (click to call/email)
- Order details: occasion, event date, notes (the full "Tell Us Everything" text)
- Timeline: chronological log of status changes ("Mar 8 — Status changed to CONFIRMED", "Mar 7 — Order received")

**Right column (1/3 width):**
- Status changer: dropdown to update status (triggers timeline entry)
- Price field: input to set/update the total
- Internal notes: textarea for private notes
- Quick actions: "Email Customer" (opens mailto), "Cancel Order" (with confirmation)

### 6D. Customers Page (`/dashboard/customers`)

Table of all customers, auto-populated from orders.

**Table columns:**
| Column | Details |
|--------|---------|
| Customer | Name + email |
| Orders | Total order count |
| Total Spent | Lifetime spend |
| First Order | When they first ordered |
| Last Order | Most recent order date |

Click a row → customer detail page.

### 6E. Customer Detail (`/dashboard/customers/[id]`)

- Customer info (name, email, phone)
- Private notes about this customer (editable textarea)
- Full order history table (all their orders, same format as orders page)
- Stats: total spent, order count, average order value

---

## 7. Auth Flow

**Sign in page:** `/dashboard/login`
- Clean centered card, dark theme
- "Sign in with Google" button (single method — keeps it simple)
- Only whitelisted email(s) can access (Lukita's Google account)
- Unauthorized emails see "Access denied — this dashboard is private"

**Route protection:**
- All `/dashboard/*` routes are protected via NextAuth middleware
- Unauthenticated users get redirected to `/dashboard/login`
- Public site routes (`/`, `/menu`, `/location`, `/order`) remain unprotected

---

## 8. How Orders Flow In

Current flow:
```
Customer fills form → API route → Resend email → Lukita checks email
```

New flow:
```
Customer fills form → API route → Save to database + Send email → Dashboard shows new order
```

The existing `/api/order` route gets updated to:
1. Validate input (same as now)
2. Save to Supabase via Prisma (NEW)
3. Auto-create or link customer record (NEW)
4. Send notification email via Resend (same as now)
5. Return success

Email becomes a notification, not the source of truth. The database is the source of truth.

---

## 9. Design Direction — Transformative Redesign

**Treat existing UI as wireframe only.** Do not preserve current spacing, component sizes, or hierarchy. Rethink the dashboard from the ground up while keeping the same features and data. The outcome should feel intentional and production-grade, not a copy of the wireframe.

### 9.1 Brand and Theme (Constraints Only)
- **Theme:** Dark, luxury-adjacent. Use the Cleopatra Delights palette as a constraint: obsidian/surface tones, gold accent, cream text, teal for secondary emphasis. The dashboard should feel like the same brand, but **layout and composition are not bound by the current site**—they can diverge where it improves clarity and efficiency.
- **Tokens to reuse (or refine):** Background (`--obsidian`, `--surface-0`–`--surface-3`), accent (`--gold`), text hierarchy (`--text-primary` through `--text-quaternary`), status semantics (gold = new, teal = in progress, green = done, red = cancelled, gray = reviewed). Typography: Playfair for titles, Inter for UI and data—but **scale, weight, and spacing are open for redesign**.

### 9.2 Visual Hierarchy (Redesign)
- Define a clear **information hierarchy** per page: what is primary (glanceable), secondary (supporting), and tertiary (detail). Do not assume the wireframe’s hierarchy is correct.
- **Overview:** Decide what deserves the most visual weight (e.g. revenue vs. new orders vs. recent activity) and size/place elements accordingly. Consider a single hero metric or a reordered grid.
- **Lists (orders, customers):** Rethink table density, row height, and column emphasis. Primary actions and key identifiers (e.g. customer name, status) should win attention; supporting data (dates, totals) should have a clear but subordinate role.
- **Detail views:** Rethink the 2/3–1/3 split and the order of blocks. Timeline, customer card, and actions can be reordered and resized to improve scanability and workflow.

### 9.3 Spacing and Rhythm (Redesign)
- Establish a **spacing system** (e.g. 4/8/16/24/32/48 or similar) and use it consistently. Do not copy existing padding/margins from the wireframe.
- **Whitespace:** Use generous spacing where it reduces cognitive load (e.g. between sections, around primary actions). Tighten where density helps (e.g. table rows, compact filters).
- **Vertical rhythm:** Headings, sections, and cards should follow a clear rhythm. Consider a consistent “section gutter” and “card internal padding” that scales by viewport.

### 9.4 Component Sizing and Proportions (Redesign)
- **Stat cards:** Size and proportion should reflect importance (e.g. primary KPI larger, secondary smaller). Do not assume equal-sized cards.
- **Sidebar:** Width, icon size, and label prominence are design decisions. Consider a narrower rail with icons + labels, or a wider rail with more context—whichever best serves the workflow.
- **Tables:** Row height, font size for primary vs. secondary columns, and action affordances (buttons vs. links) should be chosen deliberately. Consider alternating row treatment or zebra stripes only if they improve readability.
- **Charts:** Chart height, label size, and legend placement should be chosen for quick reading. Revenue and status breakdown can have different proportions.

### 9.5 Composition and Layout (Redesign)
- **Overview:** Composition is open—e.g. one large chart + compact stats, or stats-first with chart below, or a bento-style grid. Choose what best answers “How’s business doing?”
- **Orders list:** Filters can sit inline, in a collapsible bar, or in a dedicated strip—whatever reduces clutter and supports quick filtering.
- **Order/Customer detail:** Content order and column widths are open. Prefer a composition that supports the main task (e.g. change status, add note) without unnecessary scrolling.

### 9.6 Polish and Motion
- **Animations:** Use Framer Motion (or equivalent) with restraint. Transitions should support orientation (e.g. list → detail) and feedback (e.g. status change). Avoid decorative motion.
- **Loading and empty states:** Design these as first-class: clear, calm, and consistent with the new hierarchy and spacing.

### 9.7 Out of Scope for This PRD
- No requirement to match the public site’s component styling (e.g. glass panels, dividers) unless it clearly serves the dashboard. Reuse tokens and brand, not layout or component proportions.

---

## 10. Build Phases

### Phase 1: Foundation (Database + Auth + Layout)
- Set up Supabase project + Prisma schema
- Configure NextAuth with Google provider
- Build dashboard layout (sidebar + main content shell)
- Protect routes with middleware
- Update `/api/order` to save to database

### Phase 2: Orders Core
- Orders list page with table (TanStack Table)
- Order detail page with status management
- Status change + timeline logging
- Filters and search

### Phase 3: Overview Dashboard
- Stat cards with real data
- Revenue chart (Recharts)
- Recent orders widget
- Status breakdown chart

### Phase 4: Customers
- Customer list page
- Customer detail + order history
- Auto-link customers from orders

### Phase 5: Polish
- Loading states and skeletons
- Empty states
- Mobile responsive sidebar (collapsible)
- Error handling and edge cases
- Framer Motion page transitions

---

## 11. Definition of Done (per phase)

- `npm run build` passes clean
- No console errors
- Responsive (mobile + desktop)
- All CRUD operations work end-to-end
- Auth blocks unauthorized access
- Dark theme and brand tokens aligned with public site
- **Design:** Visual hierarchy, spacing system, component sizing, and composition follow a deliberate ground-up redesign (Section 9), not a visual clone of the wireframe

---

## 12. What This Proves on a Resume

- **Database design:** Schema, relations, migrations, ORM
- **Authentication:** OAuth, session management, route protection
- **CRUD operations:** Create, read, update, delete with validation
- **Data visualization:** Charts, stats, real-time aggregation
- **Full-stack architecture:** Public site + private admin in one codebase
- **Business logic:** Order lifecycle, status management, customer tracking
- **Professional tooling:** Prisma, TanStack Table, Recharts — tools used in real companies
