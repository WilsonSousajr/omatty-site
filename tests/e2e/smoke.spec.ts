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
  // sr-only, not hidden: a screen reader keeps the text version. Playwright
  // counts a 1px sr-only box as visible, so assert the state itself.
  await expect(frame.locator(".cast-poster").locator("..")).toHaveClass(
    /sr-only/,
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
