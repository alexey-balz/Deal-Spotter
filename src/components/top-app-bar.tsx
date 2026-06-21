import { MapPin, Search, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "@/stores/location";
import { useFilters } from "@/stores/filters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cityForZip } from "@/data/zips";

export function TopAppBar() {
  const { zip, city, setZip } = useLocation();
  const query = useFilters((s) => s.query);
  const setQuery = useFilters((s) => s.setQuery);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(zip);

  const save = () => {
    const clean = draft.replace(/\D/g, "").slice(0, 5);
    if (clean.length === 5) {
      setZip(clean);
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 pt-3 pb-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-display font-extrabold">
              S
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground leading-none">Sparpilot</p>
              <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (o) setDraft(zip); }}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="truncate">{zip} {city}</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Postleitzahl ändern</DialogTitle>
                  </DialogHeader>
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="z.B. 10115"
                    inputMode="numeric"
                    maxLength={5}
                    onKeyDown={(e) => e.key === "Enter" && save()}
                  />
                  <p className="text-xs text-muted-foreground">
                    {draft.length === 5 ? `→ ${cityForZip(draft)}` : "5 Ziffern eingeben"}
                  </p>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
                    <Button onClick={save} disabled={draft.length !== 5}>Speichern</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Produkte suchen…"
            className="h-11 w-full rounded-full border border-border bg-muted/60 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:bg-background"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Suche löschen"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
