"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ORDER_TYPES } from "@/lib/constants";
import { Search } from "lucide-react";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "All statuses" },
  { value: "NEW", label: "New" },
  { value: "REVIEWED", label: "Reviewed" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "READY", label: "Ready" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

const DATE_PRESETS = [
  { value: "", label: "All time" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "30", label: "Last 30 days" },
];

export default function OrderFiltersBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      router.push(`/dashboard/orders?${next.toString()}`);
    },
    [router, searchParams],
  );

  const status = searchParams.get("status") ?? "";
  const orderType = searchParams.get("orderType") ?? "";
  const datePreset = searchParams.get("date") ?? "";
  const search = searchParams.get("search") ?? "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[220px] max-w-[360px]">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-quaternary)] pointer-events-none"
        />
        <input
          type="search"
          placeholder="Search name, email, notes..."
          value={search}
          onChange={(e) => setParam("search", e.target.value)}
          className="dash-input w-full !pl-10"
        />
      </div>

      {/* Filters */}
      <select
        value={status}
        onChange={(e) => setParam("status", e.target.value)}
        className="dash-select"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={orderType}
        onChange={(e) => setParam("orderType", e.target.value)}
        className="dash-select"
      >
        <option value="">All types</option>
        {ORDER_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={datePreset}
        onChange={(e) => setParam("date", e.target.value)}
        className="dash-select"
      >
        {DATE_PRESETS.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
