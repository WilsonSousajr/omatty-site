/**
 * Every fact about omatty that the page states, in one place, so a release
 * is one edit here and tests/site.test.ts checks it against omatty's README.
 *
 *   <CopyCommand command={INSTALL_CMD} … />
 */
export const VERSION = "0.11.0";

export const INSTALL_CMD = "brew install WilsonSousajr/tap/omatty";

/**
 * The one-line install for any macOS or Linux machine (omatty#517). Always
 * the production domain, never SITE_URL: a preview deployment still sends a
 * visitor to omatty.com for the script.
 */
export const INSTALL_SCRIPT_CMD =
  "curl -fsSL https://omatty.com/install.sh | sh";

/**
 * What omatty.com/install.sh redirects to (next.config.ts): omatty's own
 * scripts/install.sh on main, versioned with the release, so the script never
 * needs a site change.
 */
export const INSTALL_SCRIPT_SOURCE =
  "https://raw.githubusercontent.com/WilsonSousajr/omatty/main/scripts/install.sh";

export const REPO_URL = "https://github.com/WilsonSousajr/omatty";

export const ISSUES_NEW_URL = `${REPO_URL}/issues/new`;

/** A file in omatty's repository on main: repoFile("CHANGELOG.md"). */
export function repoFile(path: string): string {
  return `${REPO_URL}/blob/main/${path}`;
}

// omatty.com since 2026-09-26; www.omatty.com 308-redirects here on Vercel.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://omatty.com"
).replace(/\/$/, "");
