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

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo zone */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--dash-gold)] to-[#9A7A10] flex items-center justify-center shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
          <span className="font-serif text-sm font-bold text-[#0a0a0c]">
            CD
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[var(--dash-text-primary)] font-semibold text-[15px] leading-tight">
            Cleopatra
          </span>
          <span className="text-[var(--dash-text-quaternary)] text-[11px] font-medium tracking-wider uppercase">
            Dashboard
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[var(--dash-border)]" />

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, badge }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`
                group relative flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium
                transition-all duration-150
                ${
                  active
                    ? "bg-[var(--dash-gold-muted)] text-[var(--dash-gold)]"
                    : "text-[var(--dash-text-tertiary)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--dash-text-primary)]"
                }
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-[var(--dash-gold)] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              )}

              <Icon
                size={20}
                strokeWidth={active ? 2.2 : 1.8}
                className="shrink-0"
              />
              <span className="flex-1">{label}</span>

              {badge != null && badge > 0 && (
                <span className="flex items-center justify-center min-w-[22px] h-[22px] rounded-full bg-[var(--dash-gold)] text-[#0a0a0c] text-[11px] font-bold px-1.5 shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom group */}
      <div className="px-3 pb-4 space-y-1">
        <div className="mx-1 mb-2 h-px bg-[var(--dash-border)]" />

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-[var(--dash-text-tertiary)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[var(--dash-text-primary)] transition-all duration-150"
        >
          <ExternalLink size={18} strokeWidth={1.8} />
          Back to Site
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-[var(--dash-text-tertiary)] hover:bg-[var(--dash-error-muted)] hover:text-[var(--dash-error)] transition-all duration-150"
        >
          <LogOut size={18} strokeWidth={1.8} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 bg-[var(--dash-surface-0)] border-r border-[var(--dash-border)] z-30 dash-scroll overflow-y-auto"
        style={{ width: "var(--dash-sidebar-w)" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile: top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-5 bg-[var(--dash-surface-0)]/95 backdrop-blur-xl border-b border-[var(--dash-border)] z-40">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="p-2 -ml-2 rounded-xl text-[var(--dash-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--dash-gold)] to-[#9A7A10] flex items-center justify-center">
            <span className="font-serif text-[10px] font-bold text-[#0a0a0c]">
              CD
            </span>
          </div>
          <span className="font-semibold text-[15px] text-[var(--dash-text-primary)]">
            Dashboard
          </span>
        </div>
        <div className="w-10" />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* Drawer */}
          <aside
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-[var(--dash-surface-0)] border-r border-[var(--dash-border)] shadow-[var(--dash-shadow-elevated)]"
            style={{ animation: "slideIn 0.2s var(--ease-out-expo)" }}
          >
            {sidebarContent}
          </aside>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
