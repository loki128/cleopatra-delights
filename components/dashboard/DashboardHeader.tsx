"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Breadcrumb = { label: string; href?: string };

function getPageInfo(pathname: string): {
  title: string;
  breadcrumbs?: Breadcrumb[];
} {
  if (pathname === "/dashboard") {
    return { title: "Overview" };
  }
  if (pathname === "/dashboard/orders") {
    return { title: "Orders" };
  }
  if (pathname.startsWith("/dashboard/orders/")) {
    const id = pathname.split("/").pop() ?? "";
    return {
      title: `Order #${id.slice(-8)}`,
      breadcrumbs: [{ label: "Orders", href: "/dashboard/orders" }],
    };
  }
  if (pathname === "/dashboard/customers") {
    return { title: "Customers" };
  }
  if (pathname.startsWith("/dashboard/customers/")) {
    return {
      title: "Customer Details",
      breadcrumbs: [{ label: "Customers", href: "/dashboard/customers" }],
    };
  }
  if (pathname === "/dashboard/settings") {
    return { title: "Settings" };
  }
  return { title: "Dashboard" };
}

export default function DashboardHeader({
  actions,
}: {
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { title, breadcrumbs } = getPageInfo(pathname);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-between gap-4 mb-2 pb-5 border-b border-[var(--dash-border)]"
    >
      <div className="min-w-0">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 mb-1">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[var(--dash-text-tertiary)] hover:text-[var(--dash-accent)] text-[13px] font-medium transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--dash-text-tertiary)] text-[13px]">
                    {crumb.label}
                  </span>
                )}
                <ChevronRight
                  size={12}
                  className="text-[var(--dash-text-quaternary)]"
                />
              </span>
            ))}
          </nav>
        )}

        {/* Page title */}
        <h1 className="text-[20px] font-semibold text-[var(--dash-text-primary)] tracking-tight truncate">
          {title}
        </h1>
      </div>

      {/* Actions slot */}
      {actions && (
        <div className="flex items-center gap-3 shrink-0">{actions}</div>
      )}
    </motion.header>
  );
}
