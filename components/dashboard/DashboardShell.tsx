import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardShell({
  children,
  newOrdersCount = 0,
}: {
  children: React.ReactNode;
  newOrdersCount?: number;
}) {
  return (
    <div className="dash-root min-h-screen relative">
      <DashboardSidebar newOrdersCount={newOrdersCount} />
      <main className="min-h-screen" style={{ paddingLeft: "var(--shell-offset, 0px)" }}>
        <div className="h-12 lg:hidden" />
        <div className="px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-7 max-w-[1400px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
