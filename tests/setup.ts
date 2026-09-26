import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library unmounts between tests on its own only when vitest's
// globals are on; they are off here, so a render would leak into the next test.
afterEach(cleanup);
