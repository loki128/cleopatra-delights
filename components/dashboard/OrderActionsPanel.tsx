"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import {
  updateOrderStatus,
  updateOrderTotal,
} from "@/app/dashboard/orders/[id]/actions";
import NotesEditor from "./NotesEditor";
import { Mail } from "lucide-react";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "REVIEWED", label: "Reviewed" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "READY", label: "Ready" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

type OrderForActions = {
  id: string;
  status: OrderStatus;
  total: number | null;
  internalNotes: string | null;
  customerEmail: string;
  customerName: string;
};

export default function OrderActionsPanel({
  order,
}: { order: OrderForActions }) {
  const router = useRouter();
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [totalLocal, setTotalLocal] = useState(
    order.total != null ? String(order.total) : "",
  );
  const [totalSaving, setTotalSaving] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  async function handleStatusChange(newStatus: OrderStatus) {
    setStatusUpdating(true);
    await updateOrderStatus(order.id, newStatus);
    setStatusUpdating(false);
    router.refresh();
  }

  async function handleSaveTotal() {
    const num = totalLocal.trim() === "" ? null : parseFloat(totalLocal);
    if (num !== null && (Number.isNaN(num) || num < 0)) return;
    setTotalSaving(true);
    await updateOrderTotal(order.id, num);
    setTotalSaving(false);
    router.refresh();
  }

  async function handleCancel() {
    await updateOrderStatus(order.id, "CANCELLED");
    setShowCancelConfirm(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Status */}
      <div>
        <label className="block text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-2.5">
          Status
        </label>
        <select
          value={order.status}
          onChange={(e) =>
            handleStatusChange(e.target.value as OrderStatus)
          }
          disabled={statusUpdating}
          className="dash-select w-full disabled:opacity-50"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Total */}
      <div>
        <label className="block text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-2.5">
          Total ($)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="0"
            step="0.01"
            value={totalLocal}
            onChange={(e) => setTotalLocal(e.target.value)}
            onBlur={handleSaveTotal}
            className="dash-input flex-1"
          />
          <button
            type="button"
            onClick={handleSaveTotal}
            disabled={totalSaving}
            className="dash-btn-primary !px-4 disabled:opacity-50"
          >
            {totalSaving ? "..." : "Save"}
          </button>
        </div>
      </div>

      {/* Internal notes */}
      <NotesEditor orderId={order.id} initialNotes={order.internalNotes} />

      {/* Actions */}
      <div className="pt-4 border-t border-[var(--dash-border)] space-y-3">
        <a
          href={`mailto:${order.customerEmail}`}
          className="dash-btn-secondary w-full justify-center"
        >
          <Mail size={16} />
          Email Customer
        </a>
        {order.status !== "CANCELLED" && (
          <>
            {!showCancelConfirm ? (
              <button
                type="button"
                onClick={() => setShowCancelConfirm(true)}
                className="dash-btn-danger w-full justify-center"
              >
                Cancel Order
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="dash-btn-danger flex-1 justify-center"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="dash-btn-secondary flex-1 justify-center"
                >
                  Back
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
