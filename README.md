&nbsp;

**Sparpilot — German Grocery Deals Aggregator**  
A mobile-first React app that surfaces weekly deals from Aldi, Lidl, Rewe, Edeka, and Kaufland. All data is local mock data; shopping list and selected ZIP persist via Zustand + localStorage. No backend, no auth.  

### Design System (src/styles.css)

- Background #FFFFFF, surface #F5F6F7, border #E5E7EB  
- Primary (CTAs, nav active, chips selected): vivid green #16A34A, hover #15803D  
- Sale red (badges, discount %, final price only): #DC2626  
- Text: #0F172A / muted #64748B  
- Strikethrough original price uses muted gray, never red  
- Fonts: @fontsource-variable/plus-jakarta-sans (display/UI) + @fontsource/inter (body numerics). Installed via bun add, imported in src/styles.css entry side. Headings tight tracking, prices tabular-nums.  
- Radius 0.875rem, soft shadows, 44px min tap targets  
- All tokens registered in @theme inline so bg-primary, text-sale, etc. work via Tailwind v4

### Routes (TanStack Start, file-based)

- / — Deal feed (home)  
- /categories — Category browse + per-category deal lists  
- /list — Shopping list grouped by chain  
- /settings — ZIP, clear list, about  
- __root.tsx — shell with top app bar + bottom nav (bottom nav hidden on md: and up where a side rail replaces it)

### Mock Data (src/data/)

- chains.ts — 5 chains with id, name, brand color, inline SVG logo  
- categories.ts —   🥤 Getränke
                    🧀 Molkereiprodukte
                    🥩 Fleisch & Wurst
                    🍫 Snacks & Süßes
                    🥖 Backwaren
                    🧊 Tiefkühl
                    🧼 Haushalt
                    ☕ Kaffee & Tee
                    🧴 Drogerie & Pflege
                    🐶 Tierbedarf
                    🌱 Vegan & Vegetarisch
                    🍝 Vorratsschrank (Nudeln, Reis, Konserven)
                    👶 Baby & Kind
                    🐟 Fisch & Meeresfrüchte
                    🍷 Wein & Spirituosen
                    🧂 Gewürze & Saucen
- stores.ts — sample stores keyed by ZIP prefix  
- deals.ts — ~40 realistic deals (Milka 100g, Kerrygold Butter 250g, Jacobs Krönung 500g, Coca-Cola 1.5L, Barilla Pasta, Wiesenhof Hähnchen, etc.) with originalPrice, price, valid-from/until, unit  
- Images: Use placehold.co for product images, passing the product name as text (e.g., placehold.co/400x400/F5F6F7/0F172A?text=Product+Name) to avoid broken Unsplash links for branded items.  
- Discount % computed from prices, not stored

### State (Zustand, persisted to localStorage)

- useShoppingList: items: {dealId, qty}[], add/remove/setQty/clear, derived total  
- useLocation: {zip, city}, default 01067 Dresden, plus small ZIP→city lookup table  
- useFilters: selectedChainId | 'all', query  
- Hydration: Ensure Zustand localStorage persistence handles hydration correctly for TanStack Start (e.g., custom hydration hook) to prevent SSR mismatches.

### React Query

- Wired (QueryClient already in router context) and used to wrap mock loaders so the data layer can swap to Supabase later without component changes.

### Components

- TopAppBar — location pill (opens ZipDialog), search input  
- ZipDialog (shadcn Dialog) — input with validation, recent ZIPs  
- ChainFilterCarousel — horizontal scroll pill toggles (All + 5 chains), active = green fill  
- DealCard — image (aspect-square), chain logo top-left badge, name, unit, strikethrough original, large red price, red -XX% badge top-right, green circular + button bottom-right. In-list state shows quantity stepper instead of +.  
- DealGrid — 1 col mobile, 2 col sm:, 3 col lg:  
- BottomNav — 4 icons (Home, Categories, List, Settings) with badge count on List; uses TanStack &nbsp; + activeProps  
- CategoryTile, ShoppingListGroup, EmptyState (illustration + message + CTA)

### Pages

- Home: TopAppBar → ChainFilterCarousel → DealGrid filtered by chain + search. Sticky chain carousel under app bar.  
- Categories: Grid of category tiles → tapping filters feed via /?category=... (URL search param) or inline list.  
- Shopping List: Grouped by chain with chain header + subtotal. Sticky bottom summary bar: total estimated cost + "Clear list" (destructive confirm). Empty state with "Browse deals" CTA.  
- Settings: Change ZIP, clear shopping list, app info.

### Empty / Edge States

- Empty list: friendly illustration, "Noch keine Angebote gespeichert", CTA to home  
- No search results: "Keine Treffer für …", suggest clearing filters  
- All copy in German (matches target users)

### Out of Scope (this pass)

- Real backend, auth, push notifications, real store locator/geo, PDF flyer viewer, price history

### Technical Notes

- File structure: src/routes/{index,categories,list,settings}.tsx, src/components/{deal-card,top-app-bar,bottom-nav,zip-dialog,chain-filter,empty-state}.tsx, src/stores/{shopping-list,location,filters}.ts, src/data/*, src/lib/format.ts (EUR + percent + dates).  
- shadcn primitives used: dialog, input, button, badge, sheet, separator, scroll-area  
- Icons: lucide-react  
- Currency formatted via Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).  
- Dates formatted via Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit' }).  
- No useEffect+fetch; data via useSuspenseQuery wrapping in-memory mock loaders so future Supabase swap is one file.<Link>