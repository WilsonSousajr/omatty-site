/**
 * Every fact about omatty that the page states, in one place, so a release
 * is one edit here and tests/site.test.ts checks it against omatty's README.
 *
 *   <CopyCommand command={INSTALL_CMD} … />
 */
export const VERSION = "0.6.0";

export const INSTALL_CMD = "brew install WilsonSousajr/tap/omatty";

export const REPO_URL = "https://github.com/WilsonSousajr/omatty";

export const ISSUES_NEW_URL = `${REPO_URL}/issues/new`;

/** A file in omatty's repository on main: repoFile("CHANGELOG.md"). */
export function repoFile(path: string): string {
  return `${REPO_URL}/blob/main/${path}`;
}

// One value to change when the site moves to its own domain.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://omatty-site.vercel.app"
).replace(/\/$/, "");
