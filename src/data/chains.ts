export type Chain = {
  id: string;
  name: string;
  color: string;       // background
  textColor: string;   // logo text color
};

export const chains: Chain[] = [
  { id: "aldi",     name: "ALDI",     color: "#00549F", textColor: "#FFFFFF" },
  { id: "lidl",     name: "Lidl",     color: "#FFED00", textColor: "#0050AA" },
  { id: "rewe",     name: "REWE",     color: "#CC071E", textColor: "#FFFFFF" },
  { id: "edeka",    name: "EDEKA",    color: "#1A6AB0", textColor: "#FFE500" },
  { id: "kaufland", name: "Kaufland", color: "#E10915", textColor: "#FFFFFF" },
  { id: "netto",    name: "Netto",    color: "#FFD600", textColor: "#D4011A" },
];

export const chainById = Object.fromEntries(chains.map((c) => [c.id, c])) as Record<string, Chain>;
