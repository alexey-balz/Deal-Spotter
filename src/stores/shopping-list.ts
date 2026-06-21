import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ListItem = { dealId: string; qty: number };

type State = {
  items: ListItem[];
  add: (dealId: string) => void;
  remove: (dealId: string) => void;
  setQty: (dealId: string, qty: number) => void;
  clear: () => void;
};

export const useShoppingList = create<State>()(
  persist(
    (set) => ({
      items: [],
      add: (dealId) =>
        set((s) => {
          const existing = s.items.find((i) => i.dealId === dealId);
          if (existing) {
            return { items: s.items.map((i) => (i.dealId === dealId ? { ...i, qty: i.qty + 1 } : i)) };
          }
          return { items: [...s.items, { dealId, qty: 1 }] };
        }),
      remove: (dealId) => set((s) => ({ items: s.items.filter((i) => i.dealId !== dealId) })),
      setQty: (dealId, qty) =>
        set((s) => ({
          items: qty <= 0 ? s.items.filter((i) => i.dealId !== dealId)
                          : s.items.map((i) => (i.dealId === dealId ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "sparpilot-list" },
  ),
);
