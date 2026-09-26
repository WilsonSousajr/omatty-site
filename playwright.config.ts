import { defineConfig, devices } from "@playwright/test";

// The smoke test runs against the production build, as omatty's ptyrun runs
// the real binary: the unit tests never exercise the wiring between parts.
export default defineConfig({
  testDir: "tests/e2e",
  forbidOnly: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3100" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npx next start -p 3100",
    url: "http://localhost:3100/en",
    reuseExistingServer: false,
  },
});
