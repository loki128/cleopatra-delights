import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getOverviewStats, getRevenueByWeek } from "@/lib/dashboard-stats";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StatusBreakdownChart from "@/components/dashboard/StatusBreakdownChart";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
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
    return (
      <div>
        <DashboardHeader />
        <div className="dash-card flex items-center justify-center py-16">
          <p className="text-[var(--dash-text-tertiary)]">
            Unable to load dashboard. Make sure DATABASE_URL is set and
            migrations have been run.
          </p>
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
    <div className="space-y-8">
      <DashboardHeader />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="New Orders"
          value={stats.newOrdersCount}
          subtext="Needs attention"
          accent
        />
        <StatCard
          title="In Progress"
          value={stats.inProgressCount}
          subtext="Currently being made"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenueThisMonth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          trend={trendText}
          subtext="vs last month"
        />
        <StatCard
          title="Customers"
          value={stats.totalCustomers}
          subtext={`${stats.newCustomersThisMonth} new this month`}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Revenue chart — takes more space */}
        <div className="lg:col-span-3 dash-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[var(--dash-text-md)] font-semibold text-[var(--dash-text-primary)]">
              Revenue
            </h2>
            <span className="text-[var(--dash-text-xs)] font-medium text-[var(--dash-text-tertiary)] uppercase tracking-wider">
              Last 8 weeks
            </span>
          </div>
          <RevenueChart data={revenueByWeek} />
        </div>

        {/* Status breakdown — compact */}
        <div className="lg:col-span-2 dash-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[var(--dash-text-md)] font-semibold text-[var(--dash-text-primary)]">
              Order Status
            </h2>
            <span className="text-[var(--dash-text-xs)] font-medium text-[var(--dash-text-tertiary)] uppercase tracking-wider">
              Breakdown
            </span>
          </div>
          <StatusBreakdownChart data={stats.statusBreakdown} />
        </div>
      </div>

      {/* Recent orders table */}
      <div className="dash-card !p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--dash-border)]">
          <h2 className="text-[var(--dash-text-md)] font-semibold text-[var(--dash-text-primary)]">
            Recent Orders
          </h2>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-1.5 text-[var(--dash-text-sm)] font-medium text-[var(--dash-gold)] hover:text-[var(--dash-gold-hover)] transition-colors"
          >
            View all
            <ArrowRight size={14} />
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
                        className="font-medium text-[var(--dash-text-primary)] hover:text-[var(--dash-gold)] transition-colors"
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
                    <td
                      className="text-right font-medium text-[var(--dash-text-primary)]"
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
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
    </div>
  );
}
