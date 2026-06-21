import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-background text-primary shadow-card">
        {icon}
      </div>
      <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
      <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
