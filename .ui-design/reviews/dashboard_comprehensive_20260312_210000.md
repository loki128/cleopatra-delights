# Design Review: Dashboard — Comprehensive Post-Redesign Audit

**Review ID:** dashboard_comprehensive_20260312_210000
**Reviewed:** 2026-03-12 21:00
**Target:** `app/dashboard/**` + `components/dashboard/**` + `globals.css` (dashboard section)
**Focus:** Visual, Usability, Code Quality, Performance
**Platforms:** Desktop, Tablet, Mobile

---

## Summary

The dashboard has a strong dark-mode foundation with a polished icon-rail sidebar, cohesive gold accent system, and well-structured CSS design token layer. However, there are **accessibility gaps** (missing aria-labels, color-only status indicators), **hardcoded inline styles** that bypass the token system, and **duplicate code** across several components. Performance is generally good but sidebar animations and backdrop-filter usage on every card add up on lower-end devices.

**Issues Found:** 24

| Severity   | Count |
|------------|-------|
| Critical   | 3     |
| Major      | 8     |
| Minor      | 9     |
| Suggestion | 4     |

---

## Critical Issues

### C1: Missing `aria-label` on filter controls (Usability / A11y)

**Severity:** Critical
**Location:** `components/dashboard/OrderFiltersBar.tsx:63-93`
**Category:** Usability / Accessibility

**Problem:**
All three `<select>` elements (status, date preset, order type) have no `aria-label` or associated `<label>`. Screen readers announce them as unlabelled comboboxes.

**Impact:**
WCAG 2.2 Level A violation (1.3.1 Info and Relationships, 4.1.2 Name Role Value). Users relying on assistive technology cannot identify what each filter controls.

**Recommendation:**
Add `aria-label` to each select, or wrap with visually-hidden `<label>` elements:

```tsx
// Before
<select className="dash-select" value={status} onChange={...}>

// After
<select className="dash-select" aria-label="Filter by order status" value={status} onChange={...}>
```

---

### C2: Color-only status indication in `StatusBadge` (Usability / A11y)

**Severity:** Critical
**Location:** `components/dashboard/StatusBadge.tsx:50-60`
**Category:** Usability / Accessibility

**Problem:**
Status badges rely solely on color (green for delivered, red for cancelled, gold for new, etc.) to convey meaning. The text label helps sighted users, but the colored dot indicator uses color as the only differentiator. More importantly, the badge has no `role` or `aria-label` to communicate the semantic status to assistive technology.

**Impact:**
WCAG 1.4.1 (Use of Color) — users with color vision deficiency cannot distinguish statuses by the dot alone. Missing `aria-label` means screen readers only read the raw text without status context.

**Recommendation:**
Add `aria-label` with the full status name and consider adding a secondary visual indicator (icon or pattern) alongside color:

```tsx
// After
<span aria-label={`Status: ${label}`} className="...">
  <span className="..." aria-hidden="true" /> {/* colored dot */}
  {label}
</span>
```

---

### C3: Error message exposure in production (Code Quality / Security)

**Severity:** Critical
**Location:** `app/dashboard/error.tsx:27`
**Category:** Code Quality / Security

**Problem:**
The error boundary directly renders `error.message` to the user. In production, this could expose stack traces, database connection strings, or internal implementation details.

**Impact:**
Information disclosure vulnerability. An attacker could trigger errors to learn about internal infrastructure (e.g., Supabase connection details already appear in build logs).

**Recommendation:**
Show a generic message in production, log the real error server-side:

```tsx
// Before
<p className="...">{error.message}</p>

// After
<p className="...">
  {process.env.NODE_ENV === "development" ? error.message : "Something went wrong. Please try again."}
</p>
```

---

## Major Issues

### M1: Hardcoded inline styles bypass design token system (Visual / Code)

**Severity:** Major
**Location:** `DashboardSidebar.tsx:66,76,227`, `DashboardShell.tsx:17,21,25`, `StatCard.tsx:63,66`, `login/page.tsx:17-21,29-35`
**Category:** Visual Design / Code Quality

**Problem:**
Despite a comprehensive `--dash-*` CSS variable system in `globals.css`, at least 15+ inline gradient/shadow definitions use hardcoded `rgba()` values. Examples:
- Sidebar: `background: linear-gradient(180deg, #111116 0%, #0c0c10 50%, #0a0a0e 100%)`
- Shell: `background: "#08080c"` (should be `var(--dash-bg)`)
- StatCard accent: `rgba(212,175,55,0.18)` (should use `var(--dash-gold-muted)` or similar)
- Login page: Multiple hardcoded `rgba(212,175,55,...)` gradients

**Impact:**
Theme changes require hunting through 15+ files instead of updating CSS variables. Makes dark/light mode support nearly impossible. Maintenance nightmare.

**Recommendation:**
Extract all repeated gold/surface values into CSS custom properties or utility classes. The token system already has `--dash-gold-muted`, `--dash-surface-0` through `--dash-surface-4`, etc. — use them.

---

### M2: Duplicate tooltip styling in sidebar (Code Quality)

**Severity:** Major
**Location:** `DashboardSidebar.tsx:106-119, 276-280, 294-298`
**Category:** Code Quality

**Problem:**
The tooltip popup styling (background, border, shadow, border-radius, padding, font-size, z-index) is defined as inline styles in three separate places within the same file. Each instance is slightly different.

**Impact:**
DRY violation. Any tooltip style change must be made in three places. Risk of visual inconsistency between tooltips.

**Recommendation:**
Extract a `dash-tooltip-nav` CSS class or create a shared `Tooltip` component. The design system already has a `dash-tooltip` class for chart tooltips — extend it or create a variant.

---

### M3: No loading/skeleton states on sub-pages (Usability)

**Severity:** Major
**Location:** `app/dashboard/orders/page.tsx`, `app/dashboard/customers/page.tsx`, `app/dashboard/orders/[id]/page.tsx`, `app/dashboard/customers/[id]/page.tsx`
**Category:** Usability

**Problem:**
Only the main dashboard page (`app/dashboard/loading.tsx`) has a loading skeleton. The orders list, customers list, and detail pages have no `loading.tsx` files. On slow connections or cold starts, users see a blank white/dark screen while data loads.

**Impact:**
Perceived performance suffers. Users may think the page is broken. Inconsistent experience — the overview page has polished skeletons, but navigating to orders shows nothing.

**Recommendation:**
Create `loading.tsx` files for each route segment using the existing `TableSkeleton`, `ChartSkeleton`, and `StatCardSkeleton` components from `LoadingSkeleton.tsx`.

---

### M4: `NotesEditor` and `CustomerNotesEditor` are nearly identical (Code Quality)

**Severity:** Major
**Location:** `components/dashboard/NotesEditor.tsx`, `components/dashboard/CustomerNotesEditor.tsx`
**Category:** Code Quality

**Problem:**
These two components are ~95% identical. They share the same state management pattern (local state, save handler, success timeout, error handling), the same UI (label, textarea, save button), and the same styling. The only differences are the label text ("Internal Notes" vs "Private Notes") and the API endpoint.

**Impact:**
Bug fixes and styling changes must be applied twice. Adds ~60 lines of duplicate code.

**Recommendation:**
Merge into a single `NotesEditor` component with props for `label`, `onSave`, and optionally `placeholder`:

```tsx
<NotesEditor
  label="Internal Notes"
  initialValue={order.notes}
  onSave={(notes) => updateOrder(id, { notes })}
/>
```

---

### M5: Tables not keyboard-navigable (Usability / A11y)

**Severity:** Major
**Location:** `components/dashboard/OrdersTable.tsx`, `components/dashboard/CustomersTable.tsx`
**Category:** Usability / Accessibility

**Problem:**
Table rows have hover states (`dash-table tbody tr:hover`) but no focus styles. Sort headers use `onClick` but aren't button elements — they're `<th>` tags. Users navigating by keyboard cannot interact with sorting.

**Impact:**
WCAG 2.1.1 (Keyboard) violation. Power users and users with motor disabilities cannot sort columns or navigate rows efficiently.

**Recommendation:**
- Wrap sort headers in `<button>` elements with `aria-sort` attributes
- Add `:focus-visible` styles to table rows matching the hover styles
- Consider `role="grid"` with arrow-key navigation for complex tables

---

### M6: Mobile sidebar drawer lacks focus trap (Usability / A11y)

**Severity:** Major
**Location:** `DashboardSidebar.tsx:344-410`
**Category:** Usability / Accessibility

**Problem:**
The mobile sidebar drawer has `role="dialog"` and `aria-modal="true"` but no focus trap. When the drawer opens, keyboard users can tab behind the overlay to interact with page content. There's also no `aria-label` on the dialog itself.

**Impact:**
WCAG 2.4.3 (Focus Order) — modal dialogs must trap focus. Users can get lost behind the overlay.

**Recommendation:**
Add a focus trap (e.g., `focus-trap-react` or a manual `useEffect` with `document.addEventListener('keydown', ...)` for Tab key). Add `aria-label="Navigation menu"` to the dialog.

---

### M7: `CustomersTable` has no empty state (Usability)

**Severity:** Major
**Location:** `components/dashboard/CustomersTable.tsx`
**Category:** Usability

**Problem:**
When there are zero customers, the table renders with headers but an empty `<tbody>`. No message explains the empty state. The project already has an `EmptyState` component that's used elsewhere.

**Impact:**
Confusing UX — users see column headers with nothing below, unclear if data is loading or genuinely empty.

**Recommendation:**
```tsx
if (data.length === 0) {
  return <EmptyState icon={Users} title="No customers yet" description="Customers will appear here when orders are placed." />;
}
```

---

### M8: Inconsistent date formatting across components (Visual / Usability)

**Severity:** Major
**Location:** `OrderDetailPanel.tsx:36,42`, `Timeline.tsx:49`, `OrdersTable.tsx:105`, `customers/[id]/page.tsx:102`
**Category:** Visual Design / Usability

**Problem:**
Date formats vary across the dashboard:
- OrderDetailPanel: `MMM d, yyyy` (e.g., "Mar 5, 2026")
- OrderDetailPanel event date: `EEEE, MMM d, yyyy` (e.g., "Thursday, Mar 5, 2026")
- Timeline: `MMM d, yyyy — h:mm a` (e.g., "Mar 5, 2026 — 2:30 PM")
- OrdersTable: `MMM d` (e.g., "Mar 5")
- Customer detail: `MMM d, yyyy` (e.g., "Mar 5, 2026")

**Impact:**
Inconsistent formatting makes the dashboard feel unpolished and can confuse users comparing dates across views.

**Recommendation:**
Create a shared `formatDate` utility with named presets (`short`, `full`, `withTime`) and use consistently across all components.

---

## Minor Issues

### m1: `--dash-sidebar-w: 260px` token is stale (Code)

**Severity:** Minor
**Location:** `globals.css:149`
**Category:** Code Quality

**Problem:**
The CSS variable `--dash-sidebar-w: 260px` is still defined but the sidebar was redesigned to 64px collapsed / 200px expanded. `--dash-sidebar-collapsed: 68px` is also slightly wrong (actual is 64px).

**Recommendation:**
Update to match actual values: `--dash-sidebar-w: 200px; --dash-sidebar-collapsed: 64px;`

---

### m2: Login page hover effects use imperative style manipulation (Code)

**Severity:** Minor
**Location:** `app/dashboard/login/page.tsx:82-89`
**Category:** Code Quality

**Problem:**
The Google sign-in button uses `onMouseEnter`/`onMouseLeave` handlers to directly mutate `e.currentTarget.style`. This bypasses React's declarative model and can cause flickering.

**Recommendation:**
Use CSS `:hover` pseudo-class or Tailwind's `hover:` prefix instead of JavaScript event handlers.

---

### m3: Magic number `top-8` for sticky positioning (Visual)

**Severity:** Minor
**Location:** `orders/[id]/page.tsx:32`, `customers/[id]/page.tsx:119`
**Category:** Visual Design

**Problem:**
Sticky sidebar panels use `top-8` (32px) but this doesn't account for the mobile top bar height (56px) or any future header additions.

**Recommendation:**
Use a CSS variable like `--dash-sticky-top` that accounts for the header height across breakpoints.

---

### m4: `AnimatePresence` imported but inconsistently used (Performance)

**Severity:** Minor
**Location:** `DashboardSidebar.tsx`
**Category:** Performance

**Problem:**
`AnimatePresence` is used for the mobile drawer but not for the desktop sidebar expansion/collapse. Desktop tooltip popups also mount/unmount without `AnimatePresence`, causing them to snap-disappear rather than animate out.

**Recommendation:**
Wrap tooltip conditionals in `AnimatePresence` with `exit` variants for polish, or remove `AnimatePresence` import if only used once for consistency.

---

### m5: Backdrop-filter on every `dash-card` (Performance)

**Severity:** Minor
**Location:** `globals.css:548-549`
**Category:** Performance

**Problem:**
Every `dash-card` applies `backdrop-filter: blur(16px) saturate(160%)`. On pages with 10+ cards (orders list, customer detail), this triggers expensive GPU compositing for each element. On low-end devices and tablets, this can cause jank during scroll.

**Recommendation:**
Remove `backdrop-filter` from `dash-card` base class. Apply it selectively only where the frosted-glass effect is actually visible (sidebar, modals, tooltips). Most cards sit on an opaque dark background where blur has no visible effect.

---

### m6: No `prefers-reduced-motion` respect for Framer Motion (Performance / A11y)

**Severity:** Minor
**Location:** `DashboardSidebar.tsx`, `StatCard.tsx`, `DashboardHeader.tsx`, `loading.tsx`
**Category:** Performance / Accessibility

**Problem:**
While `globals.css:451-454` disables CSS animations for `prefers-reduced-motion`, Framer Motion animations (sidebar expand, stat card hover lift, header fade-in, stagger animations) are unaffected and still play.

**Recommendation:**
Use Framer Motion's `useReducedMotion()` hook to disable JS-driven animations:
```tsx
const shouldReduceMotion = useReducedMotion();
// Then conditionally skip animations
```

---

### m7: Settings page is a placeholder (Usability)

**Severity:** Minor
**Location:** `app/dashboard/settings/page.tsx`
**Category:** Usability

**Problem:**
The settings page shows a "Coming Soon" card with no additional context about what settings will be available or when.

**Recommendation:**
Either remove from the sidebar navigation until ready, or add a brief description of planned settings (e.g., "Manage admin access, notification preferences, and store configuration").

---

### m8: `DashboardShell` noise texture SVG is a long data URL (Code)

**Severity:** Minor
**Location:** `DashboardShell.tsx:25`
**Category:** Code Quality

**Problem:**
The noise grain overlay uses an inline SVG data URL that makes the component harder to read.

**Recommendation:**
Move to a CSS class (`.grain::before` already exists in `globals.css:372-384` with the same pattern). Apply `className="grain"` instead of duplicating the data URL inline.

---

### m9: `OrderActionsPanel` cancel confirmation has no auto-reset (Usability)

**Severity:** Minor
**Location:** `components/dashboard/OrderActionsPanel.tsx`
**Category:** Usability

**Problem:**
When a user clicks "Cancel Order" and the confirmation state appears, it stays indefinitely until clicked again. If the user navigates away and back, the state resets (React unmount), but if they just scroll away, the red confirm button stays active.

**Recommendation:**
Add a 5-second timeout that resets `confirmCancel` to `false`:
```tsx
useEffect(() => {
  if (confirmCancel) {
    const timer = setTimeout(() => setConfirmCancel(false), 5000);
    return () => clearTimeout(timer);
  }
}, [confirmCancel]);
```

---

## Suggestions

### S1: Add row-level actions to `CustomersTable`

Currently, the customers table has no action column (unlike the orders table which has a "View" link). Users must know to click the customer name link. Adding an explicit action column with a "View" button would improve discoverability.

---

### S2: Consider `role="status"` for save feedback messages

In `NotesEditor` and `OrderActionsPanel`, success/error messages appear after save actions. Adding `role="status"` or `aria-live="polite"` would announce these changes to screen readers.

---

### S3: Add column sorting to `CustomersTable`

The orders table supports column sorting via TanStack Table, but the customers table does not. For consistency and usability, enable at least "Total Spent" and "Orders" column sorting.

---

### S4: Extract shared chart container pattern

Both the revenue chart and status breakdown chart in `app/dashboard/page.tsx` use the same `dash-card` + header + body pattern. A `ChartCard` wrapper component would reduce repetition and ensure consistent spacing.

---

## Positive Observations

- **Icon-rail sidebar pattern** is modern and space-efficient. The hover-expand with `layoutId` active indicator is smooth and polished.
- **CSS design token system** (`--dash-*` variables) is comprehensive — surfaces, borders, text hierarchy, semantics, shadows, spacing, and typography are all tokenized.
- **Gold accent system** is cohesive. The `dash-stat-accent`, `dash-card-accent`, and gold glow tiers create a clear visual hierarchy.
- **Table design** is clean — sticky headers, hover gold left-border accent, subtle row separators.
- **Skeleton loading** on the overview page matches the actual content layout closely, providing a good perceived-performance experience.
- **`prefers-reduced-motion`** is handled for CSS animations (though not yet for JS-driven Framer Motion).
- **Mobile sidebar** uses proper dialog semantics (`role="dialog"`, `aria-modal`) and overlay dismissal.
- **`tabular-nums`** is consistently applied to numeric data across all components.

---

## Next Steps

1. **Fix critical accessibility issues (C1, C2, C5)** — add `aria-label` to filters, status badges, and sanitize error output.
2. **Add loading skeletons to sub-pages (M3)** — orders list, customers list, detail pages.
3. **Consolidate hardcoded styles into CSS variables (M1)** — audit all inline rgba/hex values and replace with `--dash-*` tokens.
4. **Merge duplicate NotesEditor components (M4)** — single component with props.
5. **Add keyboard support to tables (M5)** — button-wrapped sort headers, focus styles.
6. **Add focus trap to mobile drawer (M6)** — use `focus-trap-react` or manual implementation.
7. **Standardize date formatting (M8)** — create shared utility.
8. **Remove unnecessary backdrop-filter from dash-card (m5)** — performance win on low-end devices.

---

_Generated by UI Design Review. Run `/design-review` again after fixes._
