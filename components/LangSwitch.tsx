import { locales, type Locale } from "@/lib/locale";

// Each language is named in itself: a Portuguese reader looking for their
// language on the English page is looking for "Português".
const endonyms: Record<Locale, string> = { en: "English", pt: "Português" };

/** Links to the same page in every language: <LangSwitch current="en" label="Language" />. */
export function LangSwitch({
  current,
  label,
}: {
  current: Locale;
  label: string;
}) {
  return (
    <nav aria-label={label} className="lang-switch">
      {locales.map((locale) => (
        <a
          key={locale}
          href={`/${locale}`}
          hrefLang={locale}
          lang={locale}
          aria-current={locale === current ? "page" : undefined}
        >
          {endonyms[locale]}
        </a>
      ))}
    </nav>
  );
}
