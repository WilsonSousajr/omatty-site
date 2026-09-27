import { expect, test } from "@playwright/test";

const install = "brew install WilsonSousajr/tap/omatty";

test("each language renders without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  for (const lang of ["en", "pt"]) {
    await page.goto(`/${lang}`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("h1")).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("/ sends a Portuguese browser to /pt", async ({ browser }) => {
  const context = await browser.newContext({ locale: "pt-BR" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/pt$/);
  await context.close();
});

test("the copy button puts the exact install command on the clipboard", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "clipboard permissions are chromium-only",
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en");
  await page.getByRole("button", { name: "Copy" }).first().click();
  await expect(
    page.getByRole("button", { name: "Copied" }).first(),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    install,
  );
});

test("the recording's player mounts in the frame and its text poster steps aside", async ({
  page,
}) => {
  await page.goto("/en");
  const frame = page.getByRole("figure", { name: "A real omatty session" });
  await expect(frame.locator(".ap-player")).toBeVisible();
  // Covered in place, not removed: a screen reader keeps the text version,
  // and the page does not shift when the player arrives.
  // A whole class token: /is-covered/ alone also matched a fused
  // "cast-player__posteris-covered", and passed while the poster was broken.
  await expect(frame.locator(".cast-poster").locator("..")).toHaveClass(
    /(^|\s)is-covered(\s|$)/,
  );
});

test("without JavaScript the recording is still there, as its text poster", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en");
  await expect(page.locator(".cast-poster")).toContainText("READY");
  await context.close();
});

test("every nav link lands on a section that exists", async ({ page }) => {
  await page.goto("/en");
  const nav = page.getByRole("navigation", { name: "Sections" });
  for (const href of await nav
    .getByRole("link")
    .evaluateAll((as) => as.map((a) => a.getAttribute("href")))) {
    await expect(page.locator(href ?? "#missing")).toHaveCount(1);
  }
});

test("an FAQ answer opens without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/pt");
  await page.getByText("Quanto custa?").click();
  await expect(page.getByText(/gratuito e tem licença MIT/)).toBeVisible();
  await context.close();
});

test("the page never scrolls sideways, on any screen (omatty#512)", async ({
  page,
}) => {
  // Measured against the screen Playwright was configured with, not
  // window.innerWidth: an emulated phone widens its layout viewport to fit
  // overflowing content, so innerWidth grows with the very bug under test.
  const screenWidth = page.viewportSize()?.width ?? 0;
  for (const lang of ["en", "pt"]) {
    await page.goto(`/${lang}`);
    await page.locator(".ap-player").waitFor();
    const scroll = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    expect(scroll).toBeLessThanOrEqual(screenWidth);
  }
});
