// ISO-week helpers for the "week of interest" picker.
// Weeks start on Monday.

export type WeekInfo = {
  offset: number;       // 0 = current week, 1 = next, ...
  start: Date;          // Monday 00:00
  end: Date;            // Sunday 23:59:59
  isoWeek: number;      // ISO week number
  year: number;
};

function startOfWeek(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // 0 = Sunday
  const diff = (day === 0 ? -6 : 1 - day);
  date.setDate(date.getDate() + diff);
  return date;
}

function isoWeekNumber(d: Date): { week: number; year: number } {
  const target = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNr = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNr + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  const diff = target.getTime() - firstThursday.getTime();
  const week = 1 + Math.round((diff / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return { week, year: target.getUTCFullYear() };
}

export function getWeek(offset: number, from: Date = new Date()): WeekInfo {
  const start = startOfWeek(from);
  start.setDate(start.getDate() + offset * 7);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  const { week, year } = isoWeekNumber(start);
  return { offset, start, end, isoWeek: week, year };
}

export const AVAILABLE_WEEK_OFFSETS = [0, 1, 2] as const;

export function weekLabel(w: WeekInfo): string {
  if (w.offset === 0) return "Diese Woche";
  if (w.offset === 1) return "Nächste Woche";
  return `KW ${w.isoWeek}`;
}

const dm = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" });
export function weekRangeLabel(w: WeekInfo): string {
  return `${dm.format(w.start)} – ${dm.format(w.end)}`;
}
