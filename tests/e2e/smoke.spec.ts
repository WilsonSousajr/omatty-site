import { expect, test } from "@playwright/test";

test("the page renders without console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  await page.goto("/en");
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
});
