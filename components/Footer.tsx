import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/locale";
import { REPO_URL, repoFile } from "@/lib/site";
import { LangSwitch } from "./LangSwitch";

/** The documents behind the page, and the language switch again. */
export function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <footer className="site-footer">
      <p>{dict.footer.tagline}</p>
      <nav aria-label="omatty" className="site-footer__links">
        <a href={REPO_URL}>{dict.nav.github}</a>
        <a href={repoFile("CHANGELOG.md")}>{dict.footer.changelog}</a>
        <a href={repoFile("docs/comparison.md")}>{dict.footer.comparison}</a>
        <a href={repoFile("docs/ROADMAP.md")}>{dict.footer.roadmap}</a>
        <a href={repoFile("LICENSE")}>{dict.footer.license}</a>
      </nav>
      <LangSwitch current={lang} label={dict.nav.language} />
    </footer>
  );
}
