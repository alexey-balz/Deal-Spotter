import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Trash2, Info } from "lucide-react";
import { useLocation } from "@/stores/location";
import { useShoppingList } from "@/stores/shopping-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cityForZip } from "@/data/zips";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Einstellungen — Sparpilot" },
      { name: "description", content: "Postleitzahl, Einkaufsliste und App-Infos verwalten." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { zip, city, setZip } = useLocation();
  const [draft, setDraft] = useState(zip);
  const clear = useShoppingList((s) => s.clear);
  const count = useShoppingList((s) => s.items.length);

  const save = () => {
    const clean = draft.replace(/\D/g, "").slice(0, 5);
    if (clean.length === 5) {
      setZip(clean);
      toast.success(`PLZ aktualisiert: ${clean} ${cityForZip(clean)}`);
    } else {
      toast.error("Bitte 5 Ziffern eingeben");
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-12 pt-6">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">Einstellungen</h1>

      <section className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold">Postleitzahl</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Aktuell: <span className="font-semibold text-foreground">{zip} {city}</span>
        </p>
        <div className="mt-3 flex gap-2">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="PLZ"
            inputMode="numeric"
            maxLength={5}
            className="max-w-[140px]"
          />
          <Button onClick={save}>Speichern</Button>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-sale" />
          <h2 className="font-display font-bold">Einkaufsliste</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {count > 0 ? `${count} gespeicherte Angebote.` : "Deine Liste ist leer."}
        </p>
        <Button
          variant="outline"
          className="mt-3 text-sale hover:bg-sale/10 hover:text-sale"
          onClick={() => {
            clear();
            toast.success("Liste geleert");
          }}
          disabled={count === 0}
        >
          Liste leeren
        </Button>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <h2 className="font-display font-bold">Über Sparpilot</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Sparpilot bündelt Wochenangebote der größten deutschen Supermärkte an einem Ort.
          Diese Demo nutzt Beispieldaten — keine echten Preise oder Filialinformationen.
        </p>
      </section>
    </div>
  );
}
