import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/locale";
import { REPO_URL } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

/** The top bar: wordmark, the sections a visitor jumps to, and the language. */
export function Nav({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const { nav } = dict;
  return (
    <header className="site-nav">
      <a href={`/${lang}`} className="site-nav__mark" aria-label={nav.home}>
        omatty
      </a>
      <nav className="site-nav__links" aria-label={nav.sections}>
        <a href="#how">{nav.how}</a>
        <a href="#compare">{nav.compare}</a>
        <a href="#faq">{nav.faq}</a>
        <a href="#install">{nav.install}</a>
      </nav>
      <a href={REPO_URL} className="site-nav__github">
        {nav.github}
      </a>
      <LangSwitch current={lang} label={nav.language} />
    </header>
  );
}
