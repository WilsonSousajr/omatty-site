import { en, type Dictionary } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import type { Locale } from "@/lib/locale";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

/** The strings for one language: getDictionary("pt").hero.headline. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Fills "{name}" placeholders: fill("v{version}", { version: "0.6.0" }) === "v0.6.0". */
export function fill(template: string, values: Record<string, string>): string {
  // An unknown name stays visible, so a typo shows on the page, not "undefined".
  return template.replace(
    /\{(\w+)\}/g,
    (whole, name: string) => values[name] ?? whole,
  );
}
