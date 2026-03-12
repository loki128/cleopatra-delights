import { format } from "date-fns";
import type { OrderTimelineEntry } from "@prisma/client";

type EntryWithPayload = OrderTimelineEntry & { payload?: unknown };

function formatMessage(entry: EntryWithPayload): string {
  if (entry.type === "CREATED") return "Order received";
  if (entry.type === "STATUS_CHANGE") {
    const p = entry.payload as {
      fromStatus?: string;
      toStatus?: string;
    } | null;
    if (p?.toStatus) return `Status changed to ${p.toStatus.replace(/_/g, " ")}`;
    return "Status updated";
  }
  if (entry.type === "NOTE_ADDED") return "Note added";
  return "Activity";
}

export default function Timeline({
  entries,
}: {
  entries: {
    id: string;
    createdAt: Date;
    type: string;
    payload?: unknown;
  }[];
}) {
  if (entries.length === 0) {
    return (
      <p className="text-[14px] text-[var(--dash-text-tertiary)]">
        No activity yet.
      </p>
    );
  }

  return (
    <div className="relative pl-6 space-y-5">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--dash-border-strong)]" />

      {entries.map((entry) => (
        <div key={entry.id} className="relative">
          {/* Dot */}
          <div className="absolute -left-6 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-[var(--dash-surface-1)] bg-[var(--dash-accent)] shadow-[0_0_6px_rgba(59,130,246,0.3)]" />

          <div className="text-[12px] text-[var(--dash-text-tertiary)] font-medium">
            {format(new Date(entry.createdAt), "MMM d, yyyy — h:mm a")}
          </div>
          <div className="text-[14px] text-[var(--dash-text-primary)] mt-1">
            {formatMessage(entry as EntryWithPayload)}
          </div>
        </div>
      ))}
    </div>
  );
}
