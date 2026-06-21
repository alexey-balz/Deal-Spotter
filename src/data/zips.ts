export const zipCities: Record<string, string> = {
  "01067": "Dresden",
  "10115": "Berlin",
  "20095": "Hamburg",
  "30159": "Hannover",
  "40213": "Düsseldorf",
  "50667": "Köln",
  "60311": "Frankfurt",
  "70173": "Stuttgart",
  "80331": "München",
  "90402": "Nürnberg",
};

export const cityForZip = (zip: string): string => {
  if (zipCities[zip]) return zipCities[zip];
  const prefix = zip.slice(0, 2);
  const match = Object.entries(zipCities).find(([z]) => z.startsWith(prefix));
  return match ? match[1] : "Deutschland";
};
