import { prisma } from "@/lib/prisma";
import CustomersTable from "@/components/dashboard/CustomersTable";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EmptyState from "@/components/dashboard/EmptyState";
import { Users } from "lucide-react";

type CustomerWithOrders = Awaited<
  ReturnType<typeof prisma.customer.findMany>
>[number] & {
  orders: { createdAt: Date }[];
};

export default async function DashboardCustomersPage() {
  let customers: CustomerWithOrders[] = [];
  try {
    customers = (await prisma.customer.findMany({
      orderBy: { firstOrderAt: "desc" },
      include: {
        orders: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { createdAt: true },
        },
      },
    })) as CustomerWithOrders[];
  } catch (e) {
    console.error("Customers page error:", e);
    return (
      <div className="space-y-6">
        <DashboardHeader />
        <div className="dash-card text-center py-12">
          <p className="text-[var(--dash-text-tertiary)]">
            Unable to load customers. Make sure DATABASE_URL is set and
            migrations have been run.
          </p>
        </div>
      </div>
    );
  }

  const withLastOrder = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    firstOrderAt: c.firstOrderAt,
    orderCount: c.orderCount,
    totalSpent: c.totalSpent,
    notes: c.notes,
    lastOrderAt: c.orders[0]?.createdAt ?? null,
  }));

  return (
    <div className="space-y-6">
      <DashboardHeader />
      {customers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No customers yet"
          description="Customers will appear here once orders start coming in."
        />
      ) : (
        <CustomersTable customers={withLastOrder} />
      )}
    </div>
  );
}
