"use client";

import { useState } from "react";
import { updateOrderInternalNotes } from "@/app/dashboard/orders/[id]/actions";
import { Check, AlertCircle } from "lucide-react";

export default function NotesEditor({
  orderId,
  initialNotes,
}: {
  orderId: string;
  initialNotes: string | null;
}) {
  const [notes, setNotes] = useState(initialNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<"idle" | "saved" | "error">("idle");

  async function handleSave() {
    setSaving(true);
    setMessage("idle");
    const result = await updateOrderInternalNotes(
      orderId,
      notes.trim() || null,
    );
    setSaving(false);
    if (result.error) {
      setMessage("error");
    } else {
      setMessage("saved");
      setTimeout(() => setMessage("idle"), 2000);
    }
  }

  return (
    <div>
      <label className="block text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-2.5">
        Internal Notes
      </label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="dash-input w-full resize-y !rounded-xl"
        placeholder="Private notes (not visible to customer)"
      />
      <div className="flex items-center gap-3 mt-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="dash-btn-primary !py-2 !px-4 !text-[13px] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Notes"}
        </button>
        {message === "saved" && (
          <span className="flex items-center gap-1 text-[12px] text-[var(--dash-success)] font-medium">
            <Check size={14} />
            Saved
          </span>
        )}
        {message === "error" && (
          <span className="flex items-center gap-1 text-[12px] text-[var(--dash-error)] font-medium">
            <AlertCircle size={14} />
            Failed to save
          </span>
        )}
      </div>
    </div>
  );
}
