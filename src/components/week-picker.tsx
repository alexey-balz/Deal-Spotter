import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useFilters } from "@/stores/filters";
import { AVAILABLE_WEEK_OFFSETS, getWeek, weekLabel, weekRangeLabel } from "@/lib/weeks";

export function WeekPicker() {
  const week = useFilters((s) => s.selectedWeek);
  const setWeek = useFilters((s) => s.setWeek);

  const min = AVAILABLE_WEEK_OFFSETS[0];
  const max = AVAILABLE_WEEK_OFFSETS[AVAILABLE_WEEK_OFFSETS.length - 1];
  const info = getWeek(week);

  const go = (delta: number) => {
    const next = Math.min(max, Math.max(min, week + delta));
    setWeek(next);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-card px-1 py-1">
      <button
        onClick={() => go(-1)}
        disabled={week <= min}
        className="grid h-8 w-8 place-items-center rounded-full text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Vorherige Woche"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center">
        <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-tight text-foreground">
            {weekLabel(info)} <span className="text-muted-foreground font-normal">· KW {info.isoWeek}</span>
          </p>
          <p className="truncate text-[11px] leading-tight text-muted-foreground tabular">
            {weekRangeLabel(info)}
          </p>
        </div>
      </div>

      <button
        onClick={() => go(1)}
        disabled={week >= max}
        className="grid h-8 w-8 place-items-center rounded-full text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Nächste Woche"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
