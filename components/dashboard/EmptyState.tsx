import { LucideIcon } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="dash-card flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--dash-surface-3)] flex items-center justify-center text-[var(--dash-text-tertiary)] mb-5">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <h3 className="text-[var(--dash-text-lg)] font-semibold text-[var(--dash-text-primary)] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-[var(--dash-text-sm)] text-[var(--dash-text-tertiary)] max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
