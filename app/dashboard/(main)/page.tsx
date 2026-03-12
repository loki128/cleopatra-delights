import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOverviewStats, getRevenueByWeek } from "@/lib/dashboard-stats";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatusBreakdownChart from "@/components/dashboard/StatusBreakdownChart";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/dashboard/MotionContainer";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import type { OrderStatus } from "@prisma/client";

export default async function DashboardOverviewPage() {
  let stats;
  let revenueByWeek: { weekLabel: string; revenue: number }[] = [];
  let recentOrders: Awaited<ReturnType<typeof prisma.order.findMany>> = [];

  try {
    [stats, revenueByWeek, recentOrders] = await Promise.all([
      getOverviewStats(),
      getRevenueByWeek(8),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);
  } catch (e) {
    console.error("Dashboard overview error:", e);
    const message =
      e instanceof Error
        ? e.message
        : typeof e === "object" && e !== null && "message" in e
          ? String((e as { message: unknown }).message)
          : String(e);
    return (
      <div>
        <DashboardHeader />
        <div className="dash-card flex flex-col items-center justify-center gap-4 py-16 px-6">
          <p className="text-[var(--dash-error)] font-semibold text-center">
            Unable to load dashboard. Make sure DATABASE_URL is set and
            migrations have been run.
          </p>
          <p className="text-sm text-[var(--dash-text-secondary)] text-center max-w-md">
            1. Add <code className="bg-black/20 px-1 rounded">DATABASE_URL</code> to{" "}
            <code className="bg-black/20 px-1 rounded">.env.local</code>. Using Supabase <strong>pooled</strong> (port 6543)? Add <code className="bg-black/20 px-1 rounded">?pgbouncer=true</code> to the URL.
            <br />
            2. Run <code className="bg-black/20 px-1 rounded">npx prisma db push</code> (or <code className="bg-black/20 px-1 rounded">npx prisma migrate dev --name init</code>) from project root.
            <br />
            3. Restart dev server: <code className="bg-black/20 px-1 rounded">npm run dev</code>
          </p>
          {process.env.NODE_ENV === "development" && (
            <pre className="text-xs text-left p-3 rounded bg-black/20 overflow-auto max-w-lg whitespace-pre-wrap text-[var(--dash-text-tertiary)]">
              {message || "Check the terminal running npm run dev for the error."}
            </pre>
          )}
        </div>
      </div>
    );
  }

  const trendText =
    stats.revenueTrend > 0
      ? `+${stats.revenueTrend.toFixed(0)}%`
      : stats.revenueTrend < 0
        ? `${stats.revenueTrend.toFixed(0)}%`
        : "No change";

  return (
    <div className="space-y-7">
      <DashboardHeader />

      {/* ── KPI Cards ── */}
      <section>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StaggerItem>
            <StatCard
              title="New Orders"
              value={stats.newOrdersCount}
              subtext="Needs attention"
              accent
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              title="In Progress"
              value={stats.inProgressCount}
              subtext="Currently being made"
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              title="Revenue"
              value={`$${stats.revenueThisMonth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              trend={trendText}
              subtext="vs last month"
            />
          </StaggerItem>
          <StaggerItem>
            <StatCard
              title="Customers"
              value={stats.totalCustomers}
              subtext={`${stats.newCustomersThisMonth} new this month`}
            />
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ── Analytics ── */}
      <section>
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--dash-text-tertiary)] pb-2 border-b border-[var(--dash-border)]">
            Analytics
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-5 gap-4" delay={0.2}>
          <StaggerItem className="lg:col-span-3">
            <div className="dash-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-semibold text-[var(--dash-text-primary)]">
                  Revenue
                </h3>
                <span className="text-[11px] font-medium text-[var(--dash-text-quaternary)] uppercase tracking-wider">
                  Last 8 weeks
                </span>
              </div>
              <RevenueChart data={revenueByWeek} />
            </div>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <div className="dash-card">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[15px] font-semibold text-[var(--dash-text-primary)]">
                  Order Status
                </h3>
                <span className="text-[11px] font-medium text-[var(--dash-text-quaternary)] uppercase tracking-wider">
                  Breakdown
                </span>
              </div>
              <StatusBreakdownChart data={stats.statusBreakdown} />
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ── Recent Activity ── */}
      <section>
        <div className="mb-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--dash-text-tertiary)] pb-2 border-b border-[var(--dash-border)]">
            Recent Activity
          </h2>
        </div>

        <FadeIn delay={0.4}>
          <div className="dash-card !p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--dash-border)]">
              <h3 className="text-[15px] font-semibold text-[var(--dash-text-primary)]">
                Recent Orders
              </h3>
              <Link
                href="/dashboard/orders"
                className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--dash-accent)] hover:text-[var(--dash-accent-hover)] transition-colors"
              >
                View all
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="overflow-x-auto dash-scroll">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="!py-12 text-center text-[var(--dash-text-tertiary)]"
                      >
                        No orders yet
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="font-medium text-[var(--dash-text-primary)] hover:text-[var(--dash-accent)] transition-colors"
                          >
                            {order.customerName}
                          </Link>
                        </td>
                        <td>{order.orderType}</td>
                        <td className="text-[var(--dash-text-tertiary)]">
                          {formatDistanceToNow(new Date(order.createdAt), {
                            addSuffix: true,
                          })}
                        </td>
                        <td>
                          <StatusBadge status={order.status as OrderStatus} />
                        </td>
                        <td className="text-right dash-mono font-medium text-[var(--dash-text-primary)]">
                          {order.total != null
                            ? `$${order.total.toFixed(2)}`
                            : "---"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
