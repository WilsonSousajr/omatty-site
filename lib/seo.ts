import type { Metadata, MetadataRoute } from "next";
import type { Dictionary } from "@/dictionaries/en";
import { locales, type Locale } from "@/lib/locale";
import { SITE_URL } from "@/lib/site";

// Open Graph wants a territory; the page's Portuguese is Brazil's.
const ogLocale: Record<Locale, string> = { en: "en_US", pt: "pt_BR" };

/** Every language's path, plus x-default for a browser that matches none. */
function languagePaths(): Record<string, string> {
  const paths = Object.fromEntries(locales.map((l) => [l, `/${l}`]));
  return { ...paths, "x-default": "/en" };
}

/** The share card's words and locale; the image is opengraph-image.tsx's. */
function shareCard(lang: Locale, dict: Dictionary) {
  const { title, description } = dict.meta;
  return {
    openGraph: {
      type: "website" as const,
      url: `/${lang}`,
      siteName: "omatty",
      title,
      description,
      locale: ogLocale[lang],
      alternateLocale: locales
        .filter((l) => l !== lang)
        .map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image" as const, title, description },
  };
}

/**
 * The <head> for one language: canonical URL, hreflang siblings, and the
 * share card.
 *
 *   export const generateMetadata = … pageMetadata(lang, getDictionary(lang))
 */
export function pageMetadata(lang: Locale, dict: Dictionary): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: { canonical: `/${lang}`, languages: languagePaths() },
    ...shareCard(lang, dict),
  };
}

/** sitemap.xml: both pages, each naming the other as its alternate. */
export function sitemapEntries(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );
  return locales.map((l) => ({
    url: `${SITE_URL}/${l}`,
    alternates: { languages },
  }));
}

/** robots.txt: nothing here is private, and the sitemap says where to look. */
export function robotsRules(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
