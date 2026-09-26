/**
 * The page's languages, and how a visitor's browser picks one.
 *
 * Pure: proxy.ts hands it the Accept-Language header and redirects to the
 * result, e.g. negotiateLocale("pt-BR,pt;q=0.9") === "pt".
 */
export const locales = ["en", "pt"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Narrows a route segment to a supported locale: isLocale("pt") === true. */
export function isLocale(candidate: string): candidate is Locale {
  return (locales as readonly string[]).includes(candidate);
}

type Preference = { language: string; quality: number };

/** Reads "pt-BR;q=0.8" as { language: "pt", quality: 0.8 }. */
function parsePreference(entry: string): Preference {
  const [tag = "", ...params] = entry.trim().split(";");
  const qParam = params.find((p) => p.trim().startsWith("q="));
  const parsed = qParam ? Number(qParam.trim().slice(2)) : 1;
  // A malformed q is a browser bug, not a refusal; read it as the default.
  const quality = Number.isFinite(parsed) ? parsed : 1;
  return { language: tag.split("-")[0]?.toLowerCase() ?? "", quality };
}

/** The supported locale the header prefers most, or the default. */
export function negotiateLocale(header: string | null): Locale {
  const best = (header ?? "")
    .split(",")
    .map(parsePreference)
    .filter((p) => p.quality > 0 && isLocale(p.language))
    .sort((a, b) => b.quality - a.quality)[0];
  return best && isLocale(best.language) ? best.language : defaultLocale;
}
