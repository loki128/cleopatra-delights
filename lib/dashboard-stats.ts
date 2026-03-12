import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@prisma/client";

export async function getOverviewStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    newCount,
    inProgressCount,
    revenueThisMonth,
    revenueLastMonth,
    totalCustomers,
    newCustomersThisMonth,
    statusCounts,
  ] = await Promise.all([
    prisma.order.count({ where: { status: "NEW" } }),
    prisma.order.count({ where: { status: "IN_PROGRESS" } }),
    prisma.order.aggregate({
      where: {
        status: "DELIVERED",
        createdAt: { gte: startOfMonth },
      },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: {
        status: "DELIVERED",
        createdAt: { gte: startOfLastMonth, lt: startOfMonth },
      },
      _sum: { total: true },
    }),
    prisma.customer.count(),
    prisma.customer.count({
      where: { firstOrderAt: { gte: startOfMonth } },
    }),
    prisma.order.groupBy({
      by: ["status"],
      _count: { id: true },
    }),
  ]);

  const revThis = revenueThisMonth._sum.total ?? 0;
  const revLast = revenueLastMonth._sum.total ?? 1;
  const revenueTrend =
    revLast === 0 ? (revThis > 0 ? 100 : 0) : ((revThis - revLast) / revLast) * 100;

  const statusBreakdown = statusCounts.map((s) => ({
    status: s.status as OrderStatus,
    count: s._count.id,
  }));

  return {
    newOrdersCount: newCount,
    inProgressCount,
    revenueThisMonth: revThis,
    revenueTrend,
    totalCustomers,
    newCustomersThisMonth,
    statusBreakdown,
  };
}

export async function getRevenueByWeek(weeks = 8) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - weeks * 7);
  start.setHours(0, 0, 0, 0);

  const orders = await prisma.order.findMany({
    where: {
      status: "DELIVERED",
      createdAt: { gte: start },
      total: { not: null },
    },
    select: { createdAt: true, total: true },
  });

  const byWeek = new Map<string, number>();
  for (let i = 0; i < weeks; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (weeks - 1 - i) * 7);
    weekStart.setHours(0, 0, 0, 0);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    byWeek.set(weekStart.toISOString().slice(0, 10), 0);
  }

  const sortedWeekStarts = Array.from(byWeek.keys()).sort();

  for (const o of orders) {
    const d = new Date(o.createdAt);
    d.setDate(d.getDate() - d.getDay());
    d.setHours(0, 0, 0, 0);
    const key = d.toISOString().slice(0, 10);
    const existing = byWeek.get(key);
    if (existing !== undefined) {
      byWeek.set(key, existing + (o.total ?? 0));
    } else {
      const nearest = sortedWeekStarts.find((k) => k <= key) ?? sortedWeekStarts[0];
      byWeek.set(nearest, (byWeek.get(nearest) ?? 0) + (o.total ?? 0));
    }
  }

  return sortedWeekStarts.map((key) => {
    const weekStart = new Date(key);
    return {
      weekLabel: weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }),
      revenue: byWeek.get(key) ?? 0,
    };
  });
}
