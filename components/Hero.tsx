import type { Dictionary } from "@/dictionaries/en";
import { fill } from "@/lib/i18n";
import { INSTALL_CMD, REPO_URL, VERSION } from "@/lib/site";
import { readPoster } from "@/lib/casts";
import { CastPlayer } from "./CastPlayer";
import { CopyCommand } from "./CopyCommand";
import { TerminalFrame } from "./TerminalFrame";

// Both cards READY, and the sent review comment still on its line after
// Claude inserted three above it. On the player's timeline, where idle gaps
// are capped at 1.5s; make-hero.sh's poster_at is the same frame in raw time.
const posterAt = 57;

/**
 * The first screen: what omatty is for, the one claim it makes, and the
 * command that installs it, with what it runs on stated right beside it.
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
      <div className="hero__recording">
        <TerminalFrame title={dict.hero.recording}>
          <CastPlayer
            src="/casts/hero.cast"
            posterAt={posterAt}
            fallback={<pre className="cast-poster">{readPoster("hero")}</pre>}
          />
        </TerminalFrame>
        <p className="hero__caption">
          {fill(dict.hero.caption, { version: VERSION })}
        </p>
      </div>
    </section>
  );
}
