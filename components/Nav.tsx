import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/locale";
import { REPO_URL } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

/** The top bar: wordmark, the links a visitor needs, and the language. */
export function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <header className="site-nav">
      <a
        href={`/${lang}`}
        className="site-nav__mark"
        aria-label={dict.nav.home}
      >
        omatty
      </a>
      <nav className="site-nav__links" aria-label="omatty">
        <a href={REPO_URL}>{dict.nav.github}</a>
      </nav>
      <LangSwitch current={lang} label={dict.nav.language} />
    </header>
  );
}
