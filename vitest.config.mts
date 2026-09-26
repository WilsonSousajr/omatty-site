import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: ["tests/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["lib/**", "components/**", "proxy.ts"],
      // The floor omatty holds over ./internal/..., and it does not move.
      thresholds: { lines: 90, branches: 90, functions: 90, statements: 90 },
    },
  },
});
