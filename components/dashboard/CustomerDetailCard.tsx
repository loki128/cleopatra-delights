import type { Customer } from "@prisma/client";
import { User, Mail, Phone } from "lucide-react";

export default function CustomerDetailCard({
  customer,
}: { customer: Customer }) {
  return (
    <div className="dash-card">
      <h2 className="text-[var(--dash-text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--dash-text-tertiary)] mb-4">
        Customer
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <User
            size={16}
            className="text-[var(--dash-text-quaternary)] shrink-0"
          />
          <span className="font-medium text-[var(--dash-text-primary)]">
            {customer.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Mail
            size={16}
            className="text-[var(--dash-text-quaternary)] shrink-0"
          />
          <a
            href={`mailto:${customer.email}`}
            className="text-[14px] text-[var(--dash-gold)] hover:text-[var(--dash-gold-hover)] transition-colors"
          >
            {customer.email}
          </a>
        </div>
        {customer.phone && (
          <div className="flex items-center gap-3">
            <Phone
              size={16}
              className="text-[var(--dash-text-quaternary)] shrink-0"
            />
            <a
              href={`tel:${customer.phone}`}
              className="text-[14px] text-[var(--dash-gold)] hover:text-[var(--dash-gold-hover)] transition-colors"
            >
              {customer.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
