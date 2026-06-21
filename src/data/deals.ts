import { getWeek } from "@/lib/weeks";

export type Deal = {
  id: string;
  name: string;
  brand?: string;
  unit: string;
  chainId: string;
  categoryId: string;
  originalPrice: number;
  price: number;
  week: number; // 0 = current ISO week, 1 = next, 2 = in two weeks
  image: string;
};

const img = (text: string, bg = "F5F6F7", fg = "0F172A") =>
  `https://placehold.co/600x600/${bg}/${fg}?font=source-sans-pro&text=${encodeURIComponent(text)}`;

export const deals: Deal[] = [
  // ===== Week 0 — current week =====

  // ALDI
  { id: "d1",  name: "Milka Tafelschokolade", brand: "Milka", unit: "100 g", chainId: "aldi", categoryId: "snacks", originalPrice: 1.49, price: 0.79, week: 0, image: img("Milka 100g", "8B4FA8", "FFFFFF") },
  { id: "d2",  name: "Kerrygold Butter",      brand: "Kerrygold", unit: "250 g", chainId: "aldi", categoryId: "dairy", originalPrice: 3.29, price: 2.29, week: 0, image: img("Kerrygold 250g", "FFE066", "1F5E2B") },
  { id: "d3",  name: "Jacobs Krönung",        brand: "Jacobs", unit: "500 g", chainId: "aldi", categoryId: "beverages", originalPrice: 7.99, price: 4.99, week: 0, image: img("Jacobs 500g", "8B2A1E", "FFFFFF") },
  { id: "d4",  name: "Bananen", unit: "1 kg", chainId: "aldi", categoryId: "produce", originalPrice: 1.79, price: 1.19, week: 0, image: img("Bananen 1kg", "FFE066", "3A2A0A") },
  { id: "d5",  name: "Wiesenhof Hähnchenbrust", brand: "Wiesenhof", unit: "400 g", chainId: "aldi", categoryId: "meat", originalPrice: 5.49, price: 3.99, week: 0, image: img("Hähnchen 400g", "F5D7C0", "5A2A1A") },
  { id: "d6",  name: "Coca-Cola",             brand: "Coca-Cola", unit: "1,5 L", chainId: "aldi", categoryId: "beverages", originalPrice: 1.99, price: 1.29, week: 0, image: img("Coca-Cola 1.5L", "B0070E", "FFFFFF") },

  // LIDL
  { id: "d7",  name: "Barilla Spaghetti N.5", brand: "Barilla", unit: "500 g", chainId: "lidl", categoryId: "snacks", originalPrice: 2.29, price: 1.39, week: 0, image: img("Barilla 500g", "0050AA", "FFFFFF") },
  { id: "d8",  name: "Nutella",               brand: "Ferrero", unit: "450 g", chainId: "lidl", categoryId: "snacks", originalPrice: 4.49, price: 2.99, week: 0, image: img("Nutella 450g", "8B2A1E", "FFFFFF") },
  { id: "d9",  name: "Frischmilch 3,5%",      unit: "1 L", chainId: "lidl", categoryId: "dairy", originalPrice: 1.29, price: 0.89, week: 0, image: img("Milch 1L", "FFFFFF", "0E3A8C") },
  { id: "d10", name: "Hackfleisch gemischt",  unit: "500 g", chainId: "lidl", categoryId: "meat", originalPrice: 4.99, price: 3.49, week: 0, image: img("Hack 500g", "C44A4A", "FFFFFF") },
  { id: "d11", name: "Erdbeeren",             unit: "500 g", chainId: "lidl", categoryId: "produce", originalPrice: 3.99, price: 2.49, week: 0, image: img("Erdbeeren 500g", "C8254B", "FFFFFF") },
  { id: "d12", name: "Bitburger Pils",        brand: "Bitburger", unit: "20 × 0,5 L", chainId: "lidl", categoryId: "beverages", originalPrice: 14.99, price: 10.99, week: 0, image: img("Bitburger 20x0.5L", "1F5E2B", "FFFFFF") },

  // REWE
  { id: "d13", name: "Ja! Naturjoghurt",      brand: "Ja!", unit: "500 g", chainId: "rewe", categoryId: "dairy", originalPrice: 0.79, price: 0.49, week: 0, image: img("Joghurt 500g", "FFFFFF", "C8252B") },
  { id: "d14", name: "Haribo Goldbären",      brand: "Haribo", unit: "200 g", chainId: "rewe", categoryId: "snacks", originalPrice: 1.99, price: 0.99, week: 0, image: img("Haribo 200g", "FFC72C", "C8252B") },
  { id: "d15", name: "Brötchen frisch",       unit: "10 Stück", chainId: "rewe", categoryId: "bakery", originalPrice: 2.50, price: 1.79, week: 0, image: img("Brötchen 10x", "E8C896", "5A2A1A") },
  { id: "d16", name: "Schweinenackensteaks",  unit: "1 kg", chainId: "rewe", categoryId: "meat", originalPrice: 9.99, price: 6.99, week: 0, image: img("Nackensteaks 1kg", "C44A4A", "FFFFFF") },
  { id: "d17", name: "Volvic Naturelle",      brand: "Volvic", unit: "6 × 1,5 L", chainId: "rewe", categoryId: "beverages", originalPrice: 4.74, price: 2.99, week: 0, image: img("Volvic 6x1.5L", "0070C0", "FFFFFF") },
  { id: "d18", name: "Iglo Fischstäbchen",    brand: "Iglo", unit: "30 Stück", chainId: "rewe", categoryId: "frozen", originalPrice: 6.49, price: 4.49, week: 0, image: img("Fischstäbchen 30x", "FFA500", "FFFFFF") },

  // EDEKA
  { id: "d19", name: "Gouda jung am Stück",   unit: "500 g", chainId: "edeka", categoryId: "dairy", originalPrice: 5.99, price: 3.99, week: 0, image: img("Gouda 500g", "FFD466", "3A2A0A") },
  { id: "d20", name: "Lavazza Qualità Oro",   brand: "Lavazza", unit: "1 kg", chainId: "edeka", categoryId: "beverages", originalPrice: 16.99, price: 11.99, week: 0, image: img("Lavazza 1kg", "0E2A4A", "FFD700") },
  { id: "d21", name: "Tomaten Strauch",       unit: "500 g", chainId: "edeka", categoryId: "produce", originalPrice: 2.49, price: 1.79, week: 0, image: img("Tomaten 500g", "C8252B", "FFFFFF") },
  { id: "d22", name: "Ben & Jerry's Eis",     brand: "Ben & Jerry's", unit: "465 ml", chainId: "edeka", categoryId: "frozen", originalPrice: 5.99, price: 3.99, week: 0, image: img("Ben Jerry 465ml", "FFFFFF", "0050AA") },
  { id: "d23", name: "Frosta Pfanne",         brand: "Frosta", unit: "500 g", chainId: "edeka", categoryId: "frozen", originalPrice: 3.99, price: 2.79, week: 0, image: img("Frosta 500g", "0E5E2B", "FFFFFF") },
  { id: "d24", name: "Persil Universal",      brand: "Persil", unit: "60 WL", chainId: "edeka", categoryId: "household", originalPrice: 19.99, price: 13.99, week: 0, image: img("Persil 60WL", "0E5E8C", "FFFFFF") },

  // KAUFLAND
  { id: "d25", name: "Rindergulasch",         unit: "1 kg", chainId: "kaufland", categoryId: "meat", originalPrice: 13.99, price: 9.99, week: 0, image: img("Rindergulasch 1kg", "8B2A1E", "FFFFFF") },
  { id: "d26", name: "Käse-Sahne Torte",      unit: "550 g", chainId: "kaufland", categoryId: "bakery", originalPrice: 4.99, price: 3.49, week: 0, image: img("Torte 550g", "F5D7C0", "5A2A1A") },
  { id: "d27", name: "Paulaner Weißbier",     brand: "Paulaner", unit: "11 × 0,5 L", chainId: "kaufland", categoryId: "beverages", originalPrice: 13.99, price: 9.99, week: 0, image: img("Paulaner 11x0.5L", "FFD700", "0E3A8C") },
  { id: "d28", name: "Avocado Hass",          unit: "Stück", chainId: "kaufland", categoryId: "produce", originalPrice: 1.49, price: 0.89, week: 0, image: img("Avocado", "3A5A2A", "FFFFFF") },
  { id: "d29", name: "Mozzarella",            brand: "Galbani", unit: "125 g", chainId: "kaufland", categoryId: "dairy", originalPrice: 1.49, price: 0.89, week: 0, image: img("Mozzarella 125g", "FFFFFF", "0E5E2B") },
  { id: "d30", name: "Pringles Original",     brand: "Pringles", unit: "185 g", chainId: "kaufland", categoryId: "snacks", originalPrice: 2.99, price: 1.79, week: 0, image: img("Pringles 185g", "C8252B", "FFD700") },
  { id: "d31", name: "Toilettenpapier 3-lg",  unit: "10 Rollen", chainId: "kaufland", categoryId: "household", originalPrice: 5.99, price: 3.99, week: 0, image: img("WC-Papier 10x", "FFFFFF", "2A5A8C") },
  { id: "d32", name: "Schwarzbrot",           unit: "500 g", chainId: "kaufland", categoryId: "bakery", originalPrice: 1.99, price: 1.29, week: 0, image: img("Schwarzbrot 500g", "5A2A1A", "FFFFFF") },

  // NETTO Marken-Discount — week 0
  { id: "n1",  name: "Gut & Günstig Frischkäse", unit: "200 g", chainId: "netto", categoryId: "dairy", originalPrice: 1.49, price: 0.89, week: 0, image: img("Frischkäse 200g", "FFFFFF", "D4011A") },
  { id: "n2",  name: "BiFi Original", brand: "BiFi", unit: "5 × 22,5 g", chainId: "netto", categoryId: "snacks", originalPrice: 2.99, price: 1.99, week: 0, image: img("BiFi 5x", "D4011A", "FFD600") },
  { id: "n3",  name: "Rindersteak Hüfte", unit: "200 g", chainId: "netto", categoryId: "meat", originalPrice: 5.99, price: 3.99, week: 0, image: img("Hüftsteak 200g", "8B2A1E", "FFFFFF") },
  { id: "n4",  name: "Krombacher Pils", brand: "Krombacher", unit: "20 × 0,5 L", chainId: "netto", categoryId: "beverages", originalPrice: 15.99, price: 10.99, week: 0, image: img("Krombacher 20x", "0E5E2B", "FFFFFF") },
  { id: "n5",  name: "Heidelbeeren", unit: "125 g", chainId: "netto", categoryId: "produce", originalPrice: 2.49, price: 1.49, week: 0, image: img("Heidelbeeren 125g", "2A2A8C", "FFFFFF") },
  { id: "n6",  name: "Wagner Steinofen Pizza", brand: "Wagner", unit: "320 g", chainId: "netto", categoryId: "frozen", originalPrice: 3.49, price: 1.99, week: 0, image: img("Wagner Pizza", "C8252B", "FFFFFF") },

  // ===== Week 1 — next week =====
  { id: "w1a", name: "Ritter Sport Mix", brand: "Ritter Sport", unit: "3 × 100 g", chainId: "aldi", categoryId: "snacks", originalPrice: 4.49, price: 2.99, week: 1, image: img("Ritter Sport 3x", "0E5E2B", "FFFFFF") },
  { id: "w1b", name: "Landliebe Milchreis", brand: "Landliebe", unit: "200 g", chainId: "lidl", categoryId: "dairy", originalPrice: 0.99, price: 0.59, week: 1, image: img("Milchreis 200g", "FFFFFF", "C8252B") },
  { id: "w1c", name: "Rotkäppchen Sekt", brand: "Rotkäppchen", unit: "0,75 L", chainId: "rewe", categoryId: "beverages", originalPrice: 4.99, price: 3.49, week: 1, image: img("Rotkäppchen 0.75L", "C8252B", "FFD700") },
  { id: "w1d", name: "Schwarzwälder Schinken", unit: "100 g", chainId: "edeka", categoryId: "meat", originalPrice: 2.99, price: 1.79, week: 1, image: img("Schinken 100g", "8B2A1E", "FFFFFF") },
  { id: "w1e", name: "Aufbackbrötchen", unit: "10 Stück", chainId: "kaufland", categoryId: "bakery", originalPrice: 1.99, price: 0.99, week: 1, image: img("Aufbackbrötchen", "E8C896", "5A2A1A") },
  { id: "w1f", name: "Veltins Pilsener", brand: "Veltins", unit: "20 × 0,5 L", chainId: "netto", categoryId: "beverages", originalPrice: 15.99, price: 11.49, week: 1, image: img("Veltins 20x", "0E3A8C", "FFFFFF") },
  { id: "w1g", name: "Magnum Classic", brand: "Magnum", unit: "3 × 110 ml", chainId: "netto", categoryId: "frozen", originalPrice: 3.99, price: 2.49, week: 1, image: img("Magnum 3x", "3A2A1A", "FFD700") },

  // ===== Week 2 — in two weeks =====
  { id: "w2a", name: "Müller Joghurt Mix", brand: "Müller", unit: "6 × 150 g", chainId: "aldi", categoryId: "dairy", originalPrice: 3.49, price: 2.49, week: 2, image: img("Müller 6x", "FFFFFF", "0E5E2B") },
  { id: "w2b", name: "Maggi Fix Spaghetti", brand: "Maggi", unit: "30 g", chainId: "lidl", categoryId: "snacks", originalPrice: 0.79, price: 0.49, week: 2, image: img("Maggi Fix", "FFD700", "C8252B") },
  { id: "w2c", name: "Tempo Taschentücher", brand: "Tempo", unit: "30 × 10 Stück", chainId: "rewe", categoryId: "household", originalPrice: 6.99, price: 4.49, week: 2, image: img("Tempo 30x", "FFFFFF", "0E5E8C") },
  { id: "w2d", name: "Lachsfilet TK", unit: "400 g", chainId: "edeka", categoryId: "frozen", originalPrice: 8.99, price: 5.99, week: 2, image: img("Lachs 400g", "F5A07A", "5A2A1A") },
  { id: "w2e", name: "Granny Smith Äpfel", unit: "1 kg", chainId: "kaufland", categoryId: "produce", originalPrice: 2.49, price: 1.69, week: 2, image: img("Äpfel 1kg", "8FBE3A", "FFFFFF") },
  { id: "w2f", name: "Saftschorle Apfel", unit: "6 × 1 L", chainId: "netto", categoryId: "beverages", originalPrice: 4.74, price: 2.99, week: 2, image: img("Apfelschorle 6x1L", "FFD466", "5A2A1A") },
  { id: "w2g", name: "Mehrkornbrot", unit: "500 g", chainId: "netto", categoryId: "bakery", originalPrice: 1.99, price: 1.29, week: 2, image: img("Mehrkornbrot 500g", "C8A058", "FFFFFF") },
];

export const discountPercent = (d: Deal) =>
  Math.round(((d.originalPrice - d.price) / d.originalPrice) * 100);

export const dealValidUntil = (d: Deal): Date => getWeek(d.week).end;
