/**
 * Every fact about omatty that the page states, in one place, so a release
 * is one edit here and tests/site.test.ts checks it against omatty's README.
 *
 *   <CopyCommand command={INSTALL_CMD} … />
 */
export const VERSION = "0.7.0";

export const INSTALL_CMD = "brew install WilsonSousajr/tap/omatty";

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
