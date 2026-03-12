import { format } from "date-fns";
import type { Order, OrderTimelineEntry } from "@prisma/client";
import StatusBadge from "./StatusBadge";
import Timeline from "./Timeline";
import { Calendar, Mail, Phone, User, FileText } from "lucide-react";

type OrderWithTimeline = Order & {
  timelineEntries: OrderTimelineEntry[];
};

export default function OrderDetailPanel({
  order,
}: { order: OrderWithTimeline }) {
  const entries = [...order.timelineEntries].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-6">
      {/* Status bar */}
      <div className="dash-card flex items-center gap-4 flex-wrap">
        <StatusBadge status={order.status} />
        <span className="text-[var(--dash-text-secondary)] text-[14px]">
          {order.orderType}
        </span>
        <span className="text-[var(--dash-text-quaternary)]">|</span>
        <span className="text-[var(--dash-text-tertiary)] text-[13px]">
          Created {format(new Date(order.createdAt), "MMM d, yyyy")}
        </span>
        {order.total != null && (
          <>
            <span className="text-[var(--dash-text-quaternary)]">|</span>
            <span
              className="text-[var(--dash-accent)] font-bold text-[16px]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              ${order.total.toFixed(2)}
            </span>
          </>
        )}
      </div>

      {/* Customer card */}
      <div className="dash-card">
        <h3 className="text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-4">
          Customer
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <User
              size={16}
              className="text-[var(--dash-text-quaternary)] shrink-0"
            />
            <span className="font-medium text-[var(--dash-text-primary)]">
              {order.customerName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail
              size={16}
              className="text-[var(--dash-text-quaternary)] shrink-0"
            />
            <a
              href={`mailto:${order.customerEmail}`}
              className="text-[14px] text-[var(--dash-accent)] hover:text-[var(--dash-accent-hover)] transition-colors"
            >
              {order.customerEmail}
            </a>
          </div>
          {order.customerPhone && (
            <div className="flex items-center gap-3">
              <Phone
                size={16}
                className="text-[var(--dash-text-quaternary)] shrink-0"
              />
              <a
                href={`tel:${order.customerPhone}`}
                className="text-[14px] text-[var(--dash-accent)] hover:text-[var(--dash-accent-hover)] transition-colors"
              >
                {order.customerPhone}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Order details */}
      <div className="dash-card">
        <h3 className="text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-4">
          Order Details
        </h3>
        <div className="space-y-3">
          {order.occasion && (
            <div className="flex items-start gap-3">
              <FileText
                size={16}
                className="text-[var(--dash-text-quaternary)] shrink-0 mt-0.5"
              />
              <div>
                <span className="text-[var(--dash-text-tertiary)] text-[13px]">
                  Occasion
                </span>
                <p className="text-[var(--dash-text-primary)] text-[14px]">
                  {order.occasion}
                </p>
              </div>
            </div>
          )}
          {order.eventDate && (
            <div className="flex items-start gap-3">
              <Calendar
                size={16}
                className="text-[var(--dash-text-quaternary)] shrink-0 mt-0.5"
              />
              <div>
                <span className="text-[var(--dash-text-tertiary)] text-[13px]">
                  Event date
                </span>
                <p className="text-[var(--dash-text-primary)] text-[14px]">
                  {format(new Date(order.eventDate), "EEEE, MMM d, yyyy")}
                </p>
              </div>
            </div>
          )}
          {order.notes && (
            <div className="pt-3 mt-3 border-t border-[var(--dash-border)]">
              <p className="text-[var(--dash-text-tertiary)] text-[13px] mb-2">
                Customer notes
              </p>
              <p className="text-[var(--dash-text-secondary)] text-[14px] whitespace-pre-wrap leading-relaxed">
                {order.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      <div className="dash-card">
        <h3 className="text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-4">
          Timeline
        </h3>
        <Timeline entries={entries} />
      </div>
    </div>
  );
}
