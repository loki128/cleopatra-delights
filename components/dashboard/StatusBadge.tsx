import { OrderStatus } from "@prisma/client";

const STATUS_STYLES: Record<
  OrderStatus,
  { label: string; color: string; bg: string }
> = {
  NEW: {
    label: "New",
    color: "var(--dash-accent)",
    bg: "var(--dash-accent-muted)",
  },
  REVIEWED: {
    label: "Reviewed",
    color: "var(--dash-text-secondary)",
    bg: "rgba(255, 255, 255, 0.06)",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "var(--dash-teal)",
    bg: "var(--dash-teal-muted)",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "var(--dash-info)",
    bg: "var(--dash-info-muted)",
  },
  READY: {
    label: "Ready",
    color: "var(--dash-success)",
    bg: "var(--dash-success-muted)",
  },
  DELIVERED: {
    label: "Delivered",
    color: "var(--dash-success)",
    bg: "var(--dash-success-muted)",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "var(--dash-error)",
    bg: "var(--dash-error-muted)",
  },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const style = STATUS_STYLES[status] ?? {
    label: status,
    color: "var(--dash-text-secondary)",
    bg: "rgba(255, 255, 255, 0.06)",
  };

  const isNew = status === "NEW";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[12px] font-semibold ${isNew ? "dash-badge-pulse" : ""}`}
      style={{ color: style.color, backgroundColor: style.bg }}
      aria-label={`Status: ${style.label}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: style.color }}
      />
      {style.label}
    </span>
  );
}
