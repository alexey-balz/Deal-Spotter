import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Minus, Trash2, ShoppingBasket } from "lucide-react";
import { useShoppingList } from "@/stores/shopping-list";
import { deals, discountPercent } from "@/data/deals";
import { chains, chainById } from "@/data/chains";
import { formatEUR } from "@/lib/format";
import { ChainLogo } from "@/components/chain-logo";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/list")({
  head: () => ({
    meta: [
      { title: "Meine Einkaufsliste — Sparpilot" },
      { name: "description", content: "Deine gespeicherten Angebote nach Supermarkt gruppiert." },
    ],
  }),
  component: ListPage,
});

function ListPage() {
  const items = useShoppingList((s) => s.items);
  const setQty = useShoppingList((s) => s.setQty);
  const remove = useShoppingList((s) => s.remove);
  const clear = useShoppingList((s) => s.clear);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const grouped = useMemo(() => {
    return chains
      .map((chain) => {
        const rows = items
          .map((i) => {
            const deal = deals.find((d) => d.id === i.dealId);
            return deal ? { item: i, deal } : null;
          })
          .filter((x): x is { item: typeof items[number]; deal: typeof deals[number] } =>
            !!x && x.deal.chainId === chain.id,
          );
        const subtotal = rows.reduce((sum, r) => sum + r.deal.price * r.item.qty, 0);
        const savings = rows.reduce((sum, r) => sum + (r.deal.originalPrice - r.deal.price) * r.item.qty, 0);
        return { chain, rows, subtotal, savings };
      })
      .filter((g) => g.rows.length > 0);
  }, [items]);

  const total = grouped.reduce((s, g) => s + g.subtotal, 0);
  const totalSavings = grouped.reduce((s, g) => s + g.savings, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-6">
        <h1 className="font-display text-2xl font-extrabold tracking-tight">Einkaufsliste</h1>
        <div className="mt-8">
          <EmptyState
            icon={<ShoppingBasket className="h-7 w-7" />}
            title="Noch keine Angebote gespeichert"
            description="Tippe auf das + bei einem Deal, um ihn hier zu sammeln. Wir gruppieren alles automatisch nach Supermarkt."
            action={
              <Button asChild>
                <Link to="/">Angebote durchstöbern</Link>
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pb-32 pt-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight">Einkaufsliste</h1>
          <p className="text-sm text-muted-foreground">
            {grouped.length} {grouped.length === 1 ? "Markt" : "Märkte"} · {items.reduce((n, i) => n + i.qty, 0)} Artikel
          </p>
        </div>
        <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-sale">
              <Trash2 className="mr-1 h-4 w-4" />
              Leeren
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Liste wirklich leeren?</AlertDialogTitle>
              <AlertDialogDescription>
                Alle gespeicherten Angebote werden entfernt. Das lässt sich nicht rückgängig machen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbrechen</AlertDialogCancel>
              <AlertDialogAction onClick={() => clear()} className="bg-sale hover:bg-sale/90">
                Ja, leeren
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mt-6 space-y-6">
        {grouped.map(({ chain, rows, subtotal }) => (
          <section key={chain.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <header className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
              <ChainLogo chain={chain} size={28} />
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Zwischensumme</p>
                <p className="font-display text-lg font-extrabold tabular text-foreground">{formatEUR(subtotal)}</p>
              </div>
            </header>
            <ul className="divide-y divide-border">
              {rows.map(({ item, deal }) => (
                <li key={item.dealId} className="flex items-center gap-3 px-4 py-3">
                  <img src={deal.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold">{deal.name}</p>
                    <p className="text-xs text-muted-foreground">{deal.unit} · −{discountPercent(deal)}%</p>
                    <p className="mt-1 text-sm">
                      <span className="font-bold tabular text-sale">{formatEUR(deal.price)}</span>{" "}
                      <span className="text-xs text-muted-foreground line-through tabular">{formatEUR(deal.originalPrice)}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
                    <button
                      onClick={() => (item.qty === 1 ? remove(item.dealId) : setQty(item.dealId, item.qty - 1))}
                      className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted"
                      aria-label="Menge verringern"
                    >
                      {item.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                    </button>
                    <span className="min-w-[1.25rem] text-center text-sm font-bold tabular">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.dealId, item.qty + 1)}
                      className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover"
                      aria-label="Menge erhöhen"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-14 z-20 border-t border-border bg-background/95 backdrop-blur md:bottom-0">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Geschätzte Gesamtsumme</p>
            <p className="font-display text-2xl font-extrabold tabular text-foreground leading-none">
              {formatEUR(total)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Ersparnis</p>
            <p className="font-display text-lg font-extrabold tabular text-sale leading-none">
              −{formatEUR(totalSavings)}
            </p>
          </div>
        </div>
        <div style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>
    </div>
  );
}
