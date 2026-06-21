export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export const categories: Category[] = [
  { id: "beverages", name: "Getränke",      emoji: "🥤" },
  { id: "dairy",     name: "Molkereiprodukte", emoji: "🧀" },
  { id: "meat",      name: "Fleisch & Wurst",  emoji: "🥩" },
  { id: "snacks",    name: "Snacks & Süßes",   emoji: "🍫" },
  { id: "bakery",    name: "Backwaren",        emoji: "🥖" },
  { id: "frozen",    name: "Tiefkühl",         emoji: "🧊" },
  { id: "produce",   name: "Obst & Gemüse",    emoji: "🥦" },
  { id: "household", name: "Haushalt",         emoji: "🧴" },
  { id: "coffee_tea",   name: "Kaffee & Tee",            emoji: "☕" },
  { id: "drugstore",    name: "Drogerie & Pflege",       emoji: "🧴" },
  { id: "pet",          name: "Tierbedarf",              emoji: "🐶" },
  { id: "vegan",        name: "Vegan & Vegetarisch",     emoji: "🌱" },
  { id: "pantry",       name: "Vorratsschrank",          emoji: "🍝" },
  { id: "baby",         name: "Baby & Kind",             emoji: "👶" },
  { id: "fish",         name: "Fisch & Meeresfrüchte",   emoji: "🐟" },
  { id: "wine_spirits", name: "Wein & Spirituosen",      emoji: "🍷" },
  { id: "spices",       name: "Gewürze & Saucen",        emoji: "🧂" },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<string, Category>;
