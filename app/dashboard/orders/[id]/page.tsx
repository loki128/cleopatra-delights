import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import OrderDetailPanel from "@/components/dashboard/OrderDetailPanel";
import OrderActionsPanel from "@/components/dashboard/OrderActionsPanel";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      timelineEntries: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderDetailPanel order={order} />
        </div>
        <div>
          <div className="dash-card sticky top-8">
            <OrderActionsPanel order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
