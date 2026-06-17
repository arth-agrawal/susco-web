export function tokenizeQuery(query?: string) {
  return (query ?? "")
    .toLowerCase()
    .split(/[^a-z0-9₹]+/i)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function parsePriceIntent(query?: string) {
  if (!query) return {};
  const underMatch = query.match(/(?:under|below|less than|<)\s*₹?\s*(\d+)/i);
  if (underMatch?.[1]) return { maxPrice: Number(underMatch[1]) };
  const overMatch = query.match(/(?:over|above|more than|>)\s*₹?\s*(\d+)/i);
  if (overMatch?.[1]) return { minPrice: Number(overMatch[1]) };
  return {};
}
