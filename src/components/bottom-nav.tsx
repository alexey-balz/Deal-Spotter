import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, ShoppingBasket, Settings } from "lucide-react";
import { useShoppingList } from "@/stores/shopping-list";

const items = [
  { to: "/" as const,            icon: Home,           label: "Angebote" },
  { to: "/categories" as const,  icon: LayoutGrid,     label: "Kategorien" },
  { to: "/list" as const,        icon: ShoppingBasket, label: "Liste" },
  { to: "/settings" as const,    icon: Settings,       label: "Einstellungen" },
];

export function BottomNav() {
  const count = useShoppingList((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-5xl items-stretch justify-around">
        {items.map(({ to, icon: Icon, label }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium text-muted-foreground data-[status=active]:text-primary"
            >
              <span className="relative">
                <Icon className="h-5 w-5" />
                {to === "/list" && count > 0 && (
                  <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-sale px-1 text-[10px] font-bold tabular text-sale-foreground">
                    {count}
                  </span>
                )}
              </span>
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ height: "env(safe-area-inset-bottom)" }} />
    </nav>
  );
}
