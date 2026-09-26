import { en, type Dictionary } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import type { Locale } from "@/lib/locale";

const dictionaries: Record<Locale, Dictionary> = { en, pt };

/** The strings for one language: getDictionary("pt").hero.headline. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
