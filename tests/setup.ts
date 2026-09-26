import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library unmounts between tests on its own only when vitest's
// globals are on; they are off here, so a render would leak into the next test.
afterEach(cleanup);

// jsdom has no matchMedia. Default to a visitor with no motion preference;
// a test about reduced motion replaces it. Node-environment tests have no window.
if (typeof window !== "undefined") {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
  })) as unknown as typeof window.matchMedia;
}
