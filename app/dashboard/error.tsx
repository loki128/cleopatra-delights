"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="dash-card flex flex-col items-center justify-center py-16 text-center border-[var(--dash-error-muted)] !border-[rgba(248,113,113,0.15)]">
      <div className="w-14 h-14 rounded-2xl bg-[var(--dash-error-muted)] flex items-center justify-center mb-5">
        <AlertTriangle size={28} className="text-[var(--dash-error)]" />
      </div>
      <h2 className="text-[var(--dash-text-lg)] font-semibold text-[var(--dash-text-primary)] mb-2">
        Something went wrong
      </h2>
      <p className="text-[var(--dash-text-sm)] text-[var(--dash-text-tertiary)] mb-8 max-w-md">
        {error.message}
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <button type="button" onClick={reset} className="dash-btn-primary">
          Try Again
        </button>
        <Link href="/dashboard" className="dash-btn-secondary">
          Back to Overview
        </Link>
      </div>
    </div>
  );
}
