// @vitest-environment node
import { expect, test } from "vitest";
import nextConfig from "@/next.config";
import { INSTALL_SCRIPT_CMD, INSTALL_SCRIPT_SOURCE } from "@/lib/site";

/**
 * omatty#517: `curl -fsSL https://omatty.com/install.sh | sh` works because
 * next.config.ts sends /install.sh to omatty's own scripts/install.sh on main.
 * The script is versioned with the release, so changing it never needs a site
 * change; and the claims test allows that one curl | sh only while this holds.
 */
test("/install.sh redirects to omatty's install script on main", async () => {
  const redirects = (await nextConfig.redirects?.()) ?? [];
  expect(redirects).toContainEqual({
    source: "/install.sh",
    destination: INSTALL_SCRIPT_SOURCE,
    permanent: false,
  });
  expect(INSTALL_SCRIPT_SOURCE).toBe(
    "https://raw.githubusercontent.com/WilsonSousajr/omatty/main/scripts/install.sh",
  );
});

// The production domain, never SITE_URL: a preview deployment still tells a
// visitor to fetch the script from omatty.com.
test("the one-liner fetches that path from omatty.com", () => {
  expect(INSTALL_SCRIPT_CMD).toBe(
    "curl -fsSL https://omatty.com/install.sh | sh",
  );
});
