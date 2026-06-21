import { Plus, Minus, Trash2 } from "lucide-react";
import type { Deal } from "@/data/deals";
import { discountPercent, dealValidUntil } from "@/data/deals";
import { chainById } from "@/data/chains";
import { formatEUR, formatDate } from "@/lib/format";
import { useShoppingList } from "@/stores/shopping-list";
import { ChainLogo } from "./chain-logo";
import { cn } from "@/lib/utils";

export function DealCard({ deal }: { deal: Deal }) {
  const chain = chainById[deal.chainId];
  const items = useShoppingList((s) => s.items);
  const add = useShoppingList((s) => s.add);
  const setQty = useShoppingList((s) => s.setQty);
  const remove = useShoppingList((s) => s.remove);
  const item = items.find((i) => i.dealId === deal.id);
  const pct = discountPercent(deal);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          src={deal.image}
          alt={deal.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2">
          <ChainLogo chain={chain} size={26} />
        </div>
        <div className="absolute right-2 top-2 rounded-lg bg-sale px-2 py-1 text-xs font-bold tabular text-sale-foreground shadow-sm">
          −{pct}%
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {deal.name}
        </h3>
        <p className="text-xs text-muted-foreground">{deal.unit}</p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through tabular">
              {formatEUR(deal.originalPrice)}
            </span>
            <span className="font-display text-2xl font-extrabold leading-none text-sale tabular">
              {formatEUR(deal.price)}
            </span>
            <span className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
              gültig bis {formatDate(dealValidUntil(deal).toISOString())}
            </span>
          </div>

          {item ? (
            <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
              <button
                onClick={() => (item.qty === 1 ? remove(deal.id) : setQty(deal.id, item.qty - 1))}
                className="grid h-8 w-8 place-items-center rounded-full text-foreground transition hover:bg-muted"
                aria-label="Menge verringern"
              >
                {item.qty === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              </button>
              <span className="min-w-[1.5rem] text-center text-sm font-bold tabular">{item.qty}</span>
              <button
                onClick={() => setQty(deal.id, item.qty + 1)}
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground",
                  "transition hover:bg-primary-hover",
                )}
                aria-label="Menge erhöhen"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => add(deal.id)}
              className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-card transition hover:bg-primary-hover active:scale-95"
              aria-label="Zur Liste hinzufügen"
            >
              <Plus className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
