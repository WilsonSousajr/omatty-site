import type { Dictionary } from "@/dictionaries/en";
import { fill } from "@/lib/i18n";
import { INSTALL_CMD, REPO_URL, VERSION } from "@/lib/site";
import { CopyCommand } from "./CopyCommand";

/**
 * The first screen: what omatty is for, the one claim it makes, and the
 * command that installs it, with the limits stated right beside it.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">{dict.hero.headline}</h1>
      <p className="hero__lead">{dict.hero.lead}</p>
      <p className="hero__claim">{dict.hero.claim}</p>
      <div className="hero__actions">
        <CopyCommand command={INSTALL_CMD} labels={dict.copy} />
        <a href={REPO_URL}>{dict.hero.source}</a>
      </div>
      <p className="hero__status">
        {fill(dict.hero.status, { version: VERSION })}
      </p>
    </section>
  );
}
