import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { TopAppBar } from "@/components/top-app-bar";
import { ChainFilter } from "@/components/chain-filter";
import { WeekPicker } from "@/components/week-picker";
import { DealCard } from "@/components/deal-card";
import { EmptyState } from "@/components/empty-state";
import { deals } from "@/data/deals";
import { useFilters } from "@/stores/filters";
import { categories, categoryById } from "@/data/categories";

type SearchParams = { category?: string };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sparpilot — Wochenangebote" },
      { name: "description", content: "Tagesaktuelle Supermarkt-Angebote aus deiner Region." },
    ],
  }),
  component: Home,
});

function Home() {
  const { category } = Route.useSearch();
  const chainId = useFilters((s) => s.selectedChainId);
  const query = useFilters((s) => s.query.trim().toLowerCase());
  const week = useFilters((s) => s.selectedWeek);

  const filtered = useMemo(() => {
    return deals
      .filter((d) => d.week === week)
      .filter((d) => chainId === "all" || d.chainId === chainId)
      .filter((d) => !category || d.categoryId === category)
      .filter((d) =>
        !query ||
        d.name.toLowerCase().includes(query) ||
        d.brand?.toLowerCase().includes(query) ||
        categoryById[d.categoryId]?.name.toLowerCase().includes(query),
      )
      .sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice);
  }, [chainId, query, category, week]);

  const activeCategory = category ? categoryById[category] : null;

  return (
    <div>
      <TopAppBar />

      <div className="sticky top-[105px] z-20 space-y-2 border-b border-border bg-background/95 px-4 py-2 backdrop-blur">
        <WeekPicker />
        <ChainFilter />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-8 pt-4">
        {activeCategory && (
          <div className="mb-4 flex items-center justify-between rounded-xl bg-accent/60 px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">{activeCategory.emoji}</span>
              <span className="font-semibold text-foreground">{activeCategory.name}</span>
              <span className="text-muted-foreground">· {filtered.length} Angebote</span>
            </div>
            <Link
              to="/"
              search={{ category: undefined }}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Filter entfernen
            </Link>
          </div>
        )}

        {!activeCategory && !query && (
          <div className="mb-4">
            <h1 className="font-display text-2xl font-extrabold tracking-tight">
              Top-Angebote diese Woche
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} Treffer · sortiert nach Rabatt
            </p>
          </div>
        )}

        {filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="h-6 w-6" />}
            title="Keine Angebote gefunden"
            description={query ? `Keine Treffer für „${query}". Versuch's mit einem anderen Begriff.` : "Probiere einen anderen Filter."}
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <DealCard key={d.id} deal={d} />
            ))}
          </div>
        )}

        {!activeCategory && !query && (
          <section className="mt-10">
            <h2 className="mb-3 font-display text-lg font-bold">Nach Kategorie stöbern</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {categories.slice(0, 8).map((c) => (
                <Link
                  key={c.id}
                  to="/"
                  search={{ category: c.id }}
                  className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card p-3 text-center transition hover:border-primary hover:bg-accent/40"
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-xs font-semibold text-foreground">{c.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
