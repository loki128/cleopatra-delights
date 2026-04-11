import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Settings } from "lucide-react";

export default async function DashboardSettingsPage() {
  // SECURITY: verify auth independently -- defense in depth
  const session = await auth();
  if (!session?.user) redirect("/dashboard/login");

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <div className="dash-card flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--dash-surface-3)] flex items-center justify-center text-[var(--dash-text-tertiary)] mb-5">
          <Settings size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-[var(--dash-text-lg)] font-semibold text-[var(--dash-text-primary)] mb-2">
          Settings
        </h3>
        <p className="text-[var(--dash-text-sm)] text-[var(--dash-text-tertiary)]">
          Account settings coming soon.
        </p>
      </div>
    </div>
  );
}
