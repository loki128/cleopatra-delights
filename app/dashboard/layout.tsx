import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import SessionProvider from "@/components/dashboard/SessionProvider";

export default async function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await auth();
  let newOrdersCount = 0;
  try {
    newOrdersCount = await prisma.order.count({ where: { status: "NEW" } });
  } catch {
    // DB not configured or not migrated yet
  }

  return (
    <SessionProvider session={session}>
      <DashboardShell newOrdersCount={newOrdersCount}>{children}</DashboardShell>
    </SessionProvider>
  );
}
