import DashboardSidebar from "./DashboardSidebar";

export default async function DashboardShell({
  children,
  newOrdersCount = 0,
}: {
  children: React.ReactNode;
  newOrdersCount?: number;
}) {
  return (
    <div className="min-h-screen bg-[var(--dash-bg)] text-[var(--dash-text-primary)]">
      <DashboardSidebar newOrdersCount={newOrdersCount} />

      {/* Main content area — offset by sidebar width on desktop */}
      <main className="lg:pl-[var(--dash-sidebar-w)] min-h-screen">
        {/* Mobile top bar spacer */}
        <div className="h-16 lg:hidden" />

        {/* Content wrapper with consistent padding */}
        <div className="px-5 py-6 md:px-8 md:py-8 lg:px-[var(--dash-content-px)] lg:py-[var(--dash-content-py)] max-w-[1600px]">
          {children}
        </div>
      </main>
    </div>
  );
}
