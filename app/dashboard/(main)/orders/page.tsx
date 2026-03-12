import { prisma } from "@/lib/prisma";
import OrderFiltersBar from "@/components/dashboard/OrderFiltersBar";
import OrdersTable from "@/components/dashboard/OrdersTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { ShoppingBag } from "lucide-react";
import type { OrderStatus, Prisma } from "@prisma/client";

const PAGE_SIZE = 20;

type SearchParams = { [key: string]: string | string[] | undefined };

function getDateRange(datePreset: string): { from?: Date; to?: Date } {
  const now = new Date();
  const to = new Date(now);
  to.setHours(23, 59, 59, 999);

  if (datePreset === "week") {
    const from = new Date(now);
    from.setDate(from.getDate() - 7);
    from.setHours(0, 0, 0, 0);
    return { from, to };
  }
  if (datePreset === "month") {
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from, to };
  }
  if (datePreset === "30") {
    const from = new Date(now);
    from.setDate(from.getDate() - 30);
    from.setHours(0, 0, 0, 0);
    return { from, to };
  }
  return {};
}

export default async function DashboardOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const status =
    typeof params.status === "string" ? params.status : undefined;
  const orderType =
    typeof params.orderType === "string" ? params.orderType : undefined;
  const datePreset =
    typeof params.date === "string" ? params.date : undefined;
  const search =
    typeof params.search === "string" ? params.search.trim() : undefined;
  const page = Math.max(1, parseInt(String(params.page ?? "1"), 10) || 1);

  const dateRange = getDateRange(datePreset ?? "");

  try {
    const where: Prisma.OrderWhereInput = {};

    if (status) where.status = status as OrderStatus;
    if (orderType) where.orderType = orderType;
    if (dateRange.from ?? dateRange.to) {
      where.createdAt = {};
      if (dateRange.from) where.createdAt.gte = dateRange.from;
      if (dateRange.to) where.createdAt.lte = dateRange.to;
    }
    if (search) {
      where.OR = [
        { customerName: { contains: search, mode: "insensitive" } },
        { customerEmail: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
      ];
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.order.count({ where }),
    ]);

    const queryParams: Record<string, string> = {};
    if (status) queryParams.status = status;
    if (orderType) queryParams.orderType = orderType;
    if (datePreset) queryParams.date = datePreset;
    if (search) queryParams.search = search;

    return (
      <div className="space-y-6">
        <DashboardHeader />
        <OrderFiltersBar />
        {orders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders found"
            description="No orders match your current filters. Try adjusting your search or filters."
          />
        ) : (
          <OrdersTable
            orders={orders}
            total={total}
            page={page}
            queryParams={queryParams}
          />
        )}
      </div>
    );
  } catch (e) {
    console.error("Orders page error:", e);
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <div className="dash-card text-center py-12">
          <p className="text-[var(--dash-text-tertiary)]">
            Unable to load orders. Make sure DATABASE_URL is set and migrations
            have been run.
          </p>
        </div>
      </div>
    );
  }
}
