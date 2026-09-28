import type { Dictionary } from "@/dictionaries/en";
import { INSTALL_CMD, INSTALL_SCRIPT_CMD, ISSUES_NEW_URL } from "@/lib/site";
import { CopyCommand } from "./CopyCommand";
import { Section } from "./Section";

/**
 * The end of the page and the #install anchor: the one-line install that works
 * on any macOS or Linux machine (omatty#517), the Homebrew command again, and
 * the issue tracker, because an issue from someone else is the page's measure.
 */
export function ClosingCta({ dict }: { dict: Dictionary }) {
  return (
    <Section id="install" title={dict.closing.title}>
      <p className="prose">{dict.closing.body}</p>
      <div className="hero__actions">
        <CopyCommand command={INSTALL_SCRIPT_CMD} labels={dict.copy} />
        <CopyCommand command={INSTALL_CMD} labels={dict.copy} />
        <a href={ISSUES_NEW_URL}>{dict.closing.issue}</a>
      </div>
    </Section>
  );
}
