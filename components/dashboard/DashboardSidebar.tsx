"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * CSS variable contract — set these on .dash-root or :root
 *
 * --dash-accent:        #3b82f6
 * --dash-accent-muted:  rgba(59,130,246,0.12)
 * --dash-surface-0:     #0a0a0a
 * --dash-surface-1:     #0f0f0f
 * --dash-surface-2:     #141414
 * --dash-surface-3:     #1a1a1a
 * --dash-text-primary:  #e5e5e5
 * --dash-text-secondary:#a0a0a0
 * --dash-text-tertiary: #666666
 * --dash-text-quaternary:#444444
 * --dash-border:        #1e1e1e
 * --dash-error:         #ef4444
 * --dash-error-muted:   rgba(239,68,68,0.1)
 */

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
};

export default function DashboardSidebar({
  newOrdersCount = 0,
}: { newOrdersCount?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navItems: NavItem[] = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    {
      href: "/dashboard/orders",
      label: "Orders",
      icon: ShoppingBag,
      badge: newOrdersCount,
    },
    { href: "/dashboard/customers", label: "Customers", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  /* ── Desktop icon rail nav item ── */
  const DesktopNavItem = ({ href, label, icon: Icon, badge }: NavItem) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={`
          group relative flex items-center rounded-lg transition-all duration-200
          ${expanded ? "gap-3 px-3 py-2" : "justify-center p-2.5"}
          ${
            active
              ? "text-[var(--dash-accent)] bg-[var(--dash-accent-muted)]"
              : "text-[var(--dash-text-tertiary)] hover:text-[var(--dash-text-primary)] hover:bg-white/[0.04]"
          }
        `}
      >
        {/* Active indicator bar */}
        {active && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-[var(--dash-accent)]"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}

        <Icon size={18} strokeWidth={active ? 2 : 1.5} className="shrink-0" />

        {expanded && (
          <span className="text-[13px] font-medium whitespace-nowrap">{label}</span>
        )}

        {/* Badge */}
        {badge != null && badge > 0 && (
          <span
            className={`
              flex items-center justify-center rounded-full bg-[var(--dash-accent)] text-white font-semibold
              ${expanded
                ? "min-w-[18px] h-[18px] text-[10px] px-1.5 ml-auto"
                : "absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] text-[9px] px-1"
              }
            `}
          >
            {badge}
          </span>
        )}

        {/* Tooltip (collapsed state only) */}
        {!expanded && (
          <div
            className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#222] border border-[#2e2e2e] rounded-lg text-[12px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 text-[var(--dash-text-primary)]"
          >
            {label}
            {badge != null && badge > 0 && (
              <span className="ml-1.5 text-[var(--dash-accent)]">({badge})</span>
            )}
          </div>
        )}
      </Link>
    );
  };

  /* ── Tooltip wrapper for bottom actions (collapsed) ── */
  const ActionTooltip = ({ label }: { label: string }) => (
    <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-[#222] border border-[#2e2e2e] rounded-lg text-[12px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 text-[var(--dash-text-primary)]">
      {label}
    </div>
  );

  /* ── Mobile full sidebar content ── */
  const mobileSidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#60a5fa] to-[#2563eb] flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-white tracking-tight">CD</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[var(--dash-text-primary)] font-semibold text-[14px] leading-tight">
            Cleopatra
          </span>
          <span className="text-[var(--dash-text-quaternary)] text-[10px] font-medium tracking-wider uppercase">
            Dashboard
          </span>
        </div>
      </div>

      <div className="mx-4 h-px bg-[var(--dash-border)]" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium
                transition-all duration-200
                ${
                  active
                    ? "text-[var(--dash-accent)] bg-[var(--dash-accent-muted)]"
                    : "text-[var(--dash-text-tertiary)] hover:bg-white/[0.04] hover:text-[var(--dash-text-primary)]"
                }
              `}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 rounded-r-full bg-[var(--dash-accent)]" />
              )}
              <Icon size={18} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
              <span className="flex-1">{label}</span>
              {badge != null && badge > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-[var(--dash-accent)] text-white text-[10px] font-semibold px-1.5">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 space-y-0.5">
        <div className="mx-2 mb-2 h-px bg-[var(--dash-border)]" />
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[var(--dash-text-tertiary)] hover:bg-white/[0.04] hover:text-[var(--dash-text-primary)] transition-all duration-200"
        >
          <ExternalLink size={16} strokeWidth={1.5} />
          Back to Site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
          className="group flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[var(--dash-text-tertiary)] hover:bg-[var(--dash-error-muted)] hover:text-[var(--dash-error)] transition-all duration-200"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop: collapsible icon rail ── */}
      <motion.aside
        className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 z-30 overflow-hidden bg-[var(--dash-surface-0)]"
        style={{ borderRight: "1px solid var(--dash-border)" }}
        animate={{ width: expanded ? 200 : 64 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo */}
        <div className={`flex items-center ${expanded ? "gap-3 px-4" : "justify-center"} py-4`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#60a5fa] to-[#2563eb] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-white tracking-tight">CD</span>
          </div>
          {expanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.15 }}
              className="text-[var(--dash-text-primary)] font-semibold text-[14px] leading-tight whitespace-nowrap"
            >
              Cleopatra
            </motion.span>
          )}
        </div>

        {/* Divider */}
        <div className="mx-3 h-px bg-[var(--dash-border)]" />

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {navItems.map((item) => (
            <DesktopNavItem key={item.href} {...item} />
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-2 pb-3 space-y-0.5">
          <div className="mx-1 mb-2 h-px bg-[var(--dash-border)]" />

          {/* Back to Site */}
          <Link
            href="/"
            className={`
              group relative flex items-center rounded-lg text-[var(--dash-text-tertiary)] hover:text-[var(--dash-text-primary)] hover:bg-white/[0.04] transition-all duration-200
              ${expanded ? "gap-3 px-3 py-2" : "justify-center p-2.5"}
            `}
          >
            <ExternalLink size={18} strokeWidth={1.5} className="shrink-0" />
            {expanded && <span className="text-[13px] font-medium whitespace-nowrap">Back to Site</span>}
            {!expanded && <ActionTooltip label="Back to Site" />}
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
            className={`
              group relative flex w-full items-center rounded-lg text-[var(--dash-text-tertiary)] hover:bg-[var(--dash-error-muted)] hover:text-[var(--dash-error)] transition-all duration-200
              ${expanded ? "gap-3 px-3 py-2" : "justify-center p-2.5"}
            `}
          >
            <LogOut size={18} strokeWidth={1.5} className="shrink-0" />
            {expanded && <span className="text-[13px] font-medium whitespace-nowrap">Sign Out</span>}
            {!expanded && <ActionTooltip label="Sign Out" />}
          </button>
        </div>
      </motion.aside>

      {/* ── Mobile: top bar (h-12 / 48px) ── */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-40 bg-[var(--dash-surface-0)]"
        style={{
          borderBottom: "1px solid var(--dash-border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="p-2 -ml-1 rounded-lg text-[var(--dash-text-secondary)] hover:bg-white/[0.05] transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={18} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#60a5fa] to-[#2563eb] flex items-center justify-center">
            <span className="text-[8px] font-bold text-white tracking-tight">CD</span>
          </div>
          <span className="font-medium text-[13px] text-[var(--dash-text-primary)]">Dashboard</span>
        </div>
        <div className="w-9" />
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="absolute left-0 top-0 bottom-0 w-[260px] bg-[var(--dash-surface-0)]"
              style={{ borderRight: "1px solid var(--dash-border)" }}
            >
              {mobileSidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
