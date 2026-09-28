import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import {
  INSTALL_CMD,
  INSTALL_SCRIPT_CMD,
  ISSUES_NEW_URL,
  REPO_URL,
  SITE_URL,
  VERSION,
  repoFile,
} from "@/lib/site";

// A copy of omatty's README at the release lib/site.ts names. Refresh it when
// VERSION moves, and this test says whether the page's facts moved with it.
const readme = readFileSync("tests/fixtures/omatty-README.md", "utf8");

describe("the facts the page states", () => {
  test("the install command is the one omatty's README gives", () => {
    expect(readme).toContain(INSTALL_CMD);
  });

  test("the one-line install is the one omatty's README gives (omatty#517)", () => {
    expect(readme).toContain(INSTALL_SCRIPT_CMD);
  });

  test("the version is the one omatty's README reports", () => {
    expect(readme).toContain(`**v${VERSION}**`);
  });

  test("links point at the omatty repository", () => {
    expect(REPO_URL).toBe("https://github.com/WilsonSousajr/omatty");
    expect(ISSUES_NEW_URL).toBe(`${REPO_URL}/issues/new`);
    expect(repoFile("docs/comparison.md")).toBe(
      `${REPO_URL}/blob/main/docs/comparison.md`,
    );
  });

  test("the site URL has no trailing slash, so paths join cleanly", () => {
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});
