import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { deals } from "@/data/deals";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Kategorien — Sparpilot" },
      { name: "description", content: "Angebote nach Kategorie: Getränke, Molkerei, Fleisch, Snacks und mehr." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const counts = categories.map((c) => ({
    ...c,
    count: deals.filter((d) => d.categoryId === c.id).length,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 pb-8 pt-6">
      <h1 className="font-display text-2xl font-extrabold tracking-tight">Kategorien</h1>
      <p className="mt-1 text-sm text-muted-foreground">Wähle eine Kategorie, um passende Deals zu sehen.</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {counts.map((c) => (
          <Link
            key={c.id}
            to="/"
            search={{ category: c.id }}
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-card transition hover:-translate-y-0.5 hover:border-primary"
          >
            <span className="text-4xl">{c.emoji}</span>
            <div>
              <p className="font-display font-bold text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.count} Angebote</p>
            </div>
            <span className="mt-2 text-xs font-semibold text-primary group-hover:underline">
              Anzeigen →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
