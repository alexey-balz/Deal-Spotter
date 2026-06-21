import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cityForZip } from "@/data/zips";

type State = {
  zip: string;
  city: string;
  setZip: (zip: string) => void;
};

export const useLocation = create<State>()(
  persist(
    (set) => ({
      zip: "01067",
      city: "Dresden",
      setZip: (zip) => set({ zip, city: cityForZip(zip) }),
    }),
    { name: "sparpilot-location" },
  ),
);
