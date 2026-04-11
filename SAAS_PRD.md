# PopUpKit — Product Requirements Document

**Online ordering and business management for food trailers, popups, and market vendors.**

---

## Market

- **$2.8B** US food truck industry (2026, IBISWorld)
- **~92,000** food truck/trailer businesses operating in the US
- **23.8% CAGR** growth from 2020-2025
- **$346K** average annual revenue per food truck
- At just 2-10% penetration: **$550K-$2.8M ARR** opportunity from subscriptions alone

## The Competition

| Platform | Monthly Fee | Processing | Problem for Small Vendors |
|----------|-------------|------------|---------------------------|
| Square | $0 / $49 / $149 | 2.6% + $0.10 | Best option today, but not food-vendor-specific. No location publishing, no pre-order flows. |
| Toast | $0 / $69+ | 2.49-3.5% | 2-year contracts, proprietary hardware, $75-149/mo extra for online ordering. Overkill. |
| ChowNow | $119 / $229 / $328 | 2.95% + $0.29 | Way too expensive for a $1,500/week dessert trailer. |
| GloriaFood | $0 (add-ons $9-59) | Varies | Best free option but basic templates, no POS, no mobile-first dashboard. |
| Clover | $0-$59.95 | 2.3% + $0.10 | 36-48 month lock-in contracts, $300-700/mo total cost. |

**Nobody is purpose-built for the solo food trailer operator.**

## The Problem

Small food vendors (trailers, popups, farmers market stands) have 3 options today:

1. **Enterprise platforms** (Square, Toast, ChowNow) — $60-200/mo, built for full restaurants, overwhelming for a 1-person operation
2. **Instagram/phone orders** — free but chaotic. No tracking, no payment processing, orders get lost in DMs
3. **Build a custom site** — expensive ($2K-5K from a freelancer) and hard to maintain

### 5 Gaps Nobody Fills

1. **No mobile/popup workflow** — trailers change locations daily. No POS has location publishing or "we are here today" notifications. Vendors hack it with Instagram stories.
2. **Pricing assumes restaurant revenue** — ChowNow's $119/mo minimum doesn't make sense for a vendor doing $500-2K/week.
3. **Fragmented tool stack** — typical solo operator juggles 5-7 tools: POS, Instagram, Google Calendar, manual menu updates, text/DM for orders, QuickBooks, separate online ordering platform.
4. **Pre-orders are an afterthought** — dessert/specialty vendors take 80%+ of orders in advance. No POS handles custom pre-orders, pickup time slots, or flavor customization well.
5. **No seasonal flexibility** — weekend-only or summer-only vendors pay full monthly subscriptions during downtime.

---

## The Solution

PopUpKit gives every food vendor their own online store + admin dashboard in minutes. Same tech stack you built for Cleopatra Delights — but any vendor can sign up and get one.

**How it works:**
1. Vendor signs up → creates their store (name, logo, description, location)
2. Builds their menu in the dashboard (items, categories, prices, photos)
3. Gets a public storefront URL: `popupkit.com/store/cleopatra-delights`
4. Customers browse the menu, place orders, and pay with Stripe
5. Vendor manages orders, tracks revenue, and sees customer data in their dashboard

---

## Target Users

**Primary:** Solo food trailer/truck operators, popup chefs, farmers market bakers, cottage food sellers
- Usually 1-2 person operation
- Low tech skills (Instagram is their main "website")
- Budget-conscious ($20-50/mo max)
- Need mobile-friendly dashboard (they're cooking, not at a desk)

**Secondary:** Small catering businesses, home bakers with cottage food licenses

---

## MVP Features (v1.0)

### 1. Authentication & Onboarding
- Sign up with email/password or Google OAuth
- Onboarding wizard: store name → category → logo upload → location → done
- Each vendor gets their own isolated data (multi-tenant)

### 2. Store Builder
- Store profile: name, description, logo, banner image, location, hours
- Public URL: `popupkit.com/store/[slug]`
- Store status: open/closed/coming-soon toggle
- Contact info: phone, email, Instagram handle

### 3. Menu Management
- Add/edit/delete menu items
- Fields: name, description, price, image, category, available (toggle)
- Categories: create, reorder, rename
- Drag-and-drop reordering within categories
- Bulk toggle availability (sold out / back in stock)

### 4. Public Storefront (customer-facing)
- Browsable menu with category filtering
- Item detail view (description, image, price)
- Cart system (add items, adjust quantities, remove)
- Checkout flow with delivery/pickup selection
- Customer info collection: name, email, phone, special instructions
- Stripe payment processing (card, Apple Pay, Google Pay)
- Order confirmation page with order number
- Mobile-first design (most customers order from their phone)

### 5. Order Management Dashboard
- Real-time order feed (new orders appear automatically)
- Order status workflow: New → Confirmed → Preparing → Ready → Completed
- Order detail view: items, customer info, payment status, notes
- Quick actions: confirm, mark preparing, mark ready, cancel + refund
- Filter by status, date range, search by customer name
- Sound/browser notification for new orders
- Daily order summary

### 6. Customer Management
- Auto-created customer profiles from orders
- Customer list: name, email, total orders, total spent, last order
- Customer detail: order history, lifetime value
- Notes field for each customer

### 7. Analytics Dashboard
- Revenue: today, this week, this month, trend chart
- Orders: count, average order value
- Top selling items
- Peak ordering hours/days
- Customer stats: new vs returning

### 8. Settings
- Store profile editing
- Stripe account connection (Stripe Connect onboarding)
- Notification preferences
- Operating hours / schedule
- Order settings: min order amount, lead time, delivery radius

---

### 9. Location & Schedule (differentiator — nobody else does this)
- "Where are you today?" location publisher
- Weekly schedule builder (which events/markets this week)
- Public schedule page on the storefront
- Auto-update storefront with current location
- Shareable "Find us today" link for Instagram stories

### 10. Pre-Order System (differentiator — 80% of specialty vendors need this)
- Pickup time slot selection during checkout
- Pre-order lead time settings (order 24h in advance)
- Flavor/customization fields per menu item (e.g. "Choose your frosting")
- Order cutoff times per day

### 11. Seasonal Pause (differentiator — no competitor offers this)
- Pause subscription during off-season (no charge)
- Store shows "Back in [month]" message
- Data preserved, resume anytime

---

## Future Features (v2.0+)

- Custom domains (vendor brings their own domain)
- QR code menu (print and display at the trailer)
- SMS order notifications (Twilio)
- Recurring orders / subscriptions
- Coupon codes / promotions
- Multi-location support
- Team members (add staff with limited permissions)
- Customer reviews
- Embedded widget (add ordering to existing website)
- Email marketing (announce new items, specials)
- Integration with DoorDash/UberEats

---

## Monetization

### Pricing Model
- **Free tier:** Menu + storefront only (no payments, no dashboard analytics)
- **Starter — $19/mo:** Everything in MVP + Stripe payments (platform takes 2% transaction fee)
- **Pro — $39/mo:** Everything + 0% platform fee, custom domain, priority support

### Revenue Streams
1. Monthly subscriptions (primary)
2. Transaction fees on free/starter plans (secondary)
3. Premium features (custom domains, SMS notifications)

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | You already know it, SSR for storefronts, API routes for backend |
| Language | TypeScript | Type safety, same as your other projects |
| Styling | Tailwind CSS v4 | Fast, responsive, consistent with your skills |
| Database | Supabase (PostgreSQL) | Free tier generous, real-time subscriptions for live orders, storage for images |
| ORM | Prisma | Schema management, type-safe queries |
| Auth | NextAuth v5 | Google + email/password, multi-tenant session |
| Payments | Stripe Connect | Each vendor gets their own Stripe account, platform collects fees |
| Image Storage | Supabase Storage | Menu item photos, logos, banners |
| Email | Resend | Order confirmations, notifications |
| Real-time | Supabase Realtime | Live order feed without polling |
| Charts | Recharts | Analytics dashboard |
| Forms | React Hook Form + Zod | Menu builder, checkout, settings |
| Deployment | Vercel | Auto-deploy, edge functions, same as current |

---

## Database Schema

### Core Models

```
Vendor
├── id
├── email
├── name
├── slug (unique — used in URL)
├── description
├── logo (URL)
├── banner (URL)
├── phone
├── instagram
├── location (address string)
├── lat / lng (for map)
├── timezone
├── currency (default USD)
├── storeStatus (OPEN / CLOSED / COMING_SOON)
├── stripeAccountId (Stripe Connect)
├── stripeOnboardingComplete (boolean)
├── plan (FREE / STARTER / PRO)
├── planExpiresAt
├── createdAt
└── updatedAt

Category
├── id
├── vendorId (FK → Vendor)
├── name
├── slug
├── sortOrder
└── createdAt

MenuItem
├── id
├── vendorId (FK → Vendor)
├── categoryId (FK → Category)
├── name
├── description
├── price (in cents)
├── image (URL)
├── available (boolean)
├── sortOrder
├── createdAt
└── updatedAt

Order
├── id
├── vendorId (FK → Vendor)
├── customerId (FK → Customer)
├── orderNumber (auto-increment per vendor)
├── status (NEW / CONFIRMED / PREPARING / READY / COMPLETED / CANCELLED)
├── orderType (PICKUP / DELIVERY)
├── subtotal
├── tax
├── total
├── stripePaymentIntentId
├── paymentStatus (PENDING / PAID / REFUNDED)
├── customerName
├── customerEmail
├── customerPhone
├── deliveryAddress
├── specialInstructions
├── estimatedReadyAt
├── completedAt
├── cancelledAt
├── cancelReason
├── createdAt
└── updatedAt

OrderItem
├── id
├── orderId (FK → Order)
├── menuItemId (FK → MenuItem)
├── name (snapshot — menu item might change later)
├── price (snapshot)
├── quantity
└── subtotal

Customer
├── id
├── vendorId (FK → Vendor)
├── name
├── email
├── phone
├── orderCount
├── totalSpent
├── firstOrderAt
├── lastOrderAt
├── notes
├── createdAt
└── updatedAt

VendorSettings
├── id
├── vendorId (FK → Vendor)
├── minOrderAmount
├── leadTimeMinutes
├── deliveryEnabled
├── deliveryRadius (miles)
├── deliveryFee
├── taxRate
├── autoConfirmOrders (boolean)
├── notifyEmail (boolean)
├── notifySound (boolean)
└── operatingHours (JSON — { mon: {open, close}, tue: ... })
```

---

## Page Structure

### Marketing Site (public)
```
/                       → Landing page (hero, features, pricing, CTA)
/pricing                → Pricing comparison table
/login                  → Vendor login
/signup                 → Vendor registration
```

### Public Storefront (per vendor)
```
/store/[slug]           → Vendor storefront (menu, about, cart)
/store/[slug]/checkout  → Checkout page (customer info + Stripe payment)
/store/[slug]/order/[id] → Order confirmation / status tracker
```

### Vendor Dashboard (authenticated)
```
/dashboard              → Overview (KPIs, recent orders, quick actions)
/dashboard/orders       → Order management (list, filters, search)
/dashboard/orders/[id]  → Order detail + actions
/dashboard/menu         → Menu builder (categories + items)
/dashboard/menu/new     → Add menu item form
/dashboard/menu/[id]    → Edit menu item
/dashboard/customers    → Customer list
/dashboard/customers/[id] → Customer detail + order history
/dashboard/analytics    → Revenue charts, top items, trends
/dashboard/settings     → Store profile, Stripe, notifications, hours
/dashboard/settings/payments → Stripe Connect onboarding
```

---

## Component Inventory

### Marketing Site
- `LandingHero` — headline, subhead, CTA buttons, product screenshot
- `FeatureGrid` — 6-8 feature cards with icons
- `PricingTable` — 3-tier comparison (Free / Starter / Pro)
- `TestimonialSection` — social proof from food vendors
- `CTABanner` — bottom conversion banner
- `MarketingNav` — top nav with Login/Sign Up
- `MarketingFooter` — links, legal, social

### Public Storefront
- `StorefrontLayout` — vendor-branded header, cart icon, footer
- `StoreHeader` — logo, name, description, status badge, location
- `MenuCategoryTabs` — horizontal scrollable category filter
- `MenuItemCard` — image, name, description, price, Add to Cart
- `MenuItemModal` — expanded view with quantity selector
- `Cart` — slide-over cart panel (items, quantities, subtotal)
- `CheckoutForm` — customer info fields + order type selector
- `StripePaymentElement` — Stripe embedded payment form
- `OrderConfirmation` — order number, summary, estimated time
- `OrderStatusTracker` — real-time status progress bar

### Vendor Dashboard
- `DashboardShell` — sidebar + main content wrapper
- `DashboardSidebar` — nav links, store switcher, profile
- `DashboardHeader` — page title, breadcrumbs
- `StatCard` — KPI metric card (orders, revenue, customers)
- `RevenueChart` — line/bar chart for revenue over time
- `OrderFeed` — real-time list of incoming orders
- `OrderCard` — compact order summary with quick actions
- `OrderDetailPanel` — full order info, timeline, customer
- `OrderStatusStepper` — visual status progression
- `MenuBuilder` — category list with draggable items
- `MenuItemForm` — add/edit menu item (image upload, price, etc.)
- `CategoryManager` — add/reorder/rename categories
- `ImageUploader` — drag-and-drop image upload to Supabase Storage
- `CustomersTable` — sortable, searchable customer list
- `CustomerDetailCard` — profile, stats, order history
- `AnalyticsGrid` — top items, peak hours, customer breakdown
- `SettingsForm` — store profile, hours, order settings
- `StripeConnectButton` — onboard vendor to Stripe Connect
- `PlanBadge` — current plan indicator
- `UpgradePrompt` — nudge free users to upgrade

### Shared
- `Button` — primary, secondary, ghost, danger variants
- `Input` / `Select` / `Textarea` — form controls
- `Modal` — dialog overlay
- `Toast` — success/error notifications
- `Badge` — status badges (order status, plan, store status)
- `Skeleton` — loading placeholders
- `EmptyState` — illustration + message for empty lists
- `Avatar` — vendor/customer avatar with fallback initials
- `DataTable` — sortable, filterable table (TanStack Table)
- `SearchInput` — search with debounce
- `Pagination` — page navigation

---

## Key Technical Decisions

### Multi-Tenancy
- **Approach:** Shared database, tenant isolation via `vendorId` foreign key on all records
- Every query filters by the authenticated vendor's ID
- Prisma middleware or wrapper to enforce tenant isolation automatically
- RLS policies on Supabase as a safety net

### Stripe Connect
- **Standard Connect accounts** — vendors onboard with their own Stripe account
- Platform creates PaymentIntents on behalf of vendors
- Platform fee collected via `application_fee_amount` on each payment
- Refunds processed through the platform

### Image Handling
- Upload to Supabase Storage (free 1GB on free tier)
- Serve via Supabase CDN URLs
- Client-side resize/compress before upload (max 1MB)
- `next/image` with Supabase loader for optimization

### Real-Time Orders
- Supabase Realtime subscriptions on the `Order` table
- Dashboard listens for `INSERT` events filtered by `vendorId`
- Browser notification API + sound for new orders
- Fallback: polling every 30s if Realtime disconnects

---

## Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Project scaffold (Next.js 16, Tailwind v4, Prisma, Supabase)
- [ ] Database schema + migrations
- [ ] Auth (NextAuth v5 — email/password + Google)
- [ ] Vendor onboarding wizard
- [ ] Dashboard shell (sidebar, layout, navigation)

### Phase 2: Menu Builder (Week 2-3)
- [ ] Category CRUD
- [ ] Menu item CRUD with image upload
- [ ] Drag-and-drop reordering
- [ ] Availability toggle (sold out)

### Phase 3: Public Storefront (Week 3-4)
- [ ] Store page with menu display
- [ ] Cart system (client-side state)
- [ ] Checkout page with customer info form
- [ ] Stripe Connect vendor onboarding
- [ ] Stripe payment processing
- [ ] Order confirmation page

### Phase 4: Order Management (Week 4-5)
- [ ] Order list with filters and search
- [ ] Order detail view
- [ ] Status workflow (confirm → prepare → ready → complete)
- [ ] Real-time order notifications (Supabase Realtime)
- [ ] Cancel + refund flow

### Phase 5: Customers & Analytics (Week 5-6)
- [ ] Auto-created customer profiles
- [ ] Customer list and detail pages
- [ ] Revenue analytics (charts, trends)
- [ ] Top selling items, peak hours
- [ ] Dashboard overview KPIs

### Phase 6: Landing Page & Launch (Week 6-7)
- [ ] Marketing landing page
- [ ] Pricing page
- [ ] Subscription management (Stripe billing)
- [ ] Custom domain setup (docs)
- [ ] Production deployment + domain

---

## What This Adds to Your Resume

| Skill | How PopUpKit demonstrates it |
|-------|------------------------------|
| Multi-tenant SaaS | Shared DB with tenant isolation, per-vendor data |
| Stripe Payments | Stripe Connect, PaymentIntents, refunds, subscription billing |
| Real-time | Supabase Realtime for live order notifications |
| Image uploads | Client-side compression + Supabase Storage |
| Complex auth | Multi-role (vendor/customer), onboarding flows |
| Drag-and-drop | Menu builder with reorderable categories/items |
| Production SaaS | Landing page, pricing, billing, multi-user |

Every single one of these is a gap in your current portfolio.
