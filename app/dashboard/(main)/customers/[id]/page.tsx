import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CustomerDetailCard from "@/components/dashboard/CustomerDetailCard";
import CustomerNotesEditor from "@/components/dashboard/CustomerNotesEditor";
import StatusBadge from "@/components/dashboard/StatusBadge";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { format } from "date-fns";
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import type { OrderStatus } from "@prisma/client";

export default async function DashboardCustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      orders: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!customer) notFound();

  const avgOrderValue =
    customer.orderCount > 0 && customer.totalSpent > 0
      ? customer.totalSpent / customer.orderCount
      : 0;

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <CustomerDetailCard customer={customer} />

          <div className="dash-card">
            <CustomerNotesEditor
              customerId={customer.id}
              initialNotes={customer.notes}
            />
          </div>

          {/* Order history */}
          <div className="dash-card !p-0 overflow-hidden">
            <div className="px-6 py-5 border-b border-[var(--dash-border)]">
              <h2 className="text-[var(--dash-text-md)] font-semibold text-[var(--dash-text-primary)]">
                Order History
              </h2>
            </div>
            <div className="overflow-x-auto dash-scroll">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="!py-12 text-center text-[var(--dash-text-tertiary)]"
                      >
                        No orders
                      </td>
                    </tr>
                  ) : (
                    customer.orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="font-semibold text-[var(--dash-text-primary)] hover:text-[var(--dash-accent)] transition-colors"
                          >
                            #{order.id.slice(-8)}
                          </Link>
                        </td>
                        <td>{order.orderType}</td>
                        <td className="text-[var(--dash-text-tertiary)]">
                          {format(
                            new Date(order.createdAt),
                            "MMM d, yyyy",
                          )}
                        </td>
                        <td>
                          <StatusBadge
                            status={order.status as OrderStatus}
                          />
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

        {/* Stats sidebar */}
        <div>
          <div className="dash-card-accent sticky top-8 space-y-6">
            <h2 className="text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)]">
              Stats
            </h2>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--dash-accent-muted)] flex items-center justify-center shrink-0">
                <DollarSign size={18} className="text-[var(--dash-accent)]" />
              </div>
              <div>
                <p className="text-[var(--dash-text-tertiary)] text-[12px] font-medium">
                  Total Spent
                </p>
                <p
                  className="text-[20px] font-bold text-[var(--dash-accent)]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  ${customer.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--dash-info-muted)] flex items-center justify-center shrink-0">
                <ShoppingBag size={18} className="text-[var(--dash-info)]" />
              </div>
              <div>
                <p className="text-[var(--dash-text-tertiary)] text-[12px] font-medium">
                  Orders
                </p>
                <p
                  className="text-[20px] font-bold text-[var(--dash-text-primary)]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {customer.orderCount}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--dash-success-muted)] flex items-center justify-center shrink-0">
                <TrendingUp
                  size={18}
                  className="text-[var(--dash-success)]"
                />
              </div>
              <div>
                <p className="text-[var(--dash-text-tertiary)] text-[12px] font-medium">
                  Avg Order Value
                </p>
                <p
                  className="text-[20px] font-bold text-[var(--dash-text-primary)]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  ${avgOrderValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
