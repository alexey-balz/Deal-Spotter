const eur = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });
const date = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" });

export const formatEUR = (n: number) => eur.format(n);
export const formatDate = (iso: string) => date.format(new Date(iso));
