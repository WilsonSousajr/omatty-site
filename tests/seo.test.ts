import { describe, expect, test } from "vitest";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { pageMetadata, robotsRules, sitemapEntries } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

describe("pageMetadata", () => {
  test("names each page's own URL as canonical, and its sibling in the other language", () => {
    const meta = pageMetadata("pt", pt);
    expect(meta.metadataBase?.toString()).toBe(`${SITE_URL}/`);
    expect(meta.alternates).toEqual({
      canonical: "/pt",
      languages: { en: "/en", pt: "/pt", "x-default": "/en" },
    });
  });

  test("shares with the page's own title, description and locale", () => {
    const meta = pageMetadata("en", en);
    expect(meta.title).toBe(en.meta.title);
    expect(meta.description).toBe(en.meta.description);
    expect(meta.openGraph).toMatchObject({
      type: "website",
      url: "/en",
      siteName: "omatty",
      locale: "en_US",
      alternateLocale: ["pt_BR"],
    });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });
  });
});

describe("sitemapEntries", () => {
  test("lists both pages, each pointing at the other", () => {
    const entries = sitemapEntries();
    expect(entries.map((e) => e.url)).toEqual([
      `${SITE_URL}/en`,
      `${SITE_URL}/pt`,
    ]);
    expect(entries[0]?.alternates?.languages).toEqual({
      en: `${SITE_URL}/en`,
      pt: `${SITE_URL}/pt`,
    });
  });
});

describe("robotsRules", () => {
  test("lets every crawler in and points it at the sitemap", () => {
    expect(robotsRules()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${SITE_URL}/sitemap.xml`,
    });
  });
});
