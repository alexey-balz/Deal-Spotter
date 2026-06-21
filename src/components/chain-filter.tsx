import { chains } from "@/data/chains";
import { useFilters } from "@/stores/filters";
import { cn } from "@/lib/utils";

export function ChainFilter() {
  const selected = useFilters((s) => s.selectedChainId);
  const setChain = useFilters((s) => s.setChain);

  const all = [{ id: "all", name: "Alle" }, ...chains];

  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-2 pb-1">
        {all.map((c) => {
          const active = selected === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setChain(c.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-background text-foreground hover:bg-muted",
              )}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
