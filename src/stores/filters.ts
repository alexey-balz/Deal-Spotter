import { create } from "zustand";

type State = {
  selectedChainId: string; // "all" or chain id
  query: string;
  selectedWeek: number;    // 0 = current week, 1 = next, 2 = in two weeks
  setChain: (id: string) => void;
  setQuery: (q: string) => void;
  setWeek: (w: number) => void;
};

export const useFilters = create<State>((set) => ({
  selectedChainId: "all",
  query: "",
  selectedWeek: 0,
  setChain: (id) => set({ selectedChainId: id }),
  setQuery: (q) => set({ query: q }),
  setWeek: (w) => set({ selectedWeek: w }),
}));
