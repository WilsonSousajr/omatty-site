import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";

// The limits mirror omatty's golangci-lint gate: gocyclo 10 is `complexity`,
// gocognit 15 is `sonarjs/cognitive-complexity`, forbidigo on stdout is
// `no-console`, and the 2-level nesting rule is `max-depth`.
const limits = {
  complexity: ["error", 10],
  "sonarjs/cognitive-complexity": ["error", 15],
  "sonarjs/no-identical-functions": "error",
  "max-depth": ["error", 2],
  "max-lines": [
    "error",
    { max: 500, skipBlankLines: true, skipComments: true },
  ],
  "max-lines-per-function": [
    "error",
    { max: 20, skipBlankLines: true, skipComments: true },
  ],
  "no-console": "error",
  "@typescript-eslint/no-explicit-any": "error",
  "id-denylist": [
    "error",
    "data",
    "handler",
    "manager",
    "util",
    "helper",
    "process",
    "info",
    "obj",
  ],
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  { plugins: { sonarjs }, rules: limits },
  {
    // Components that are only markup are exempt from the line limit, not
    // from the complexity limits (AGENTS.md, "Code style guidelines").
    files: ["app/**/*.tsx", "components/**/*.tsx"],
    rules: { "max-lines-per-function": "off" },
  },
  {
    // A test is a list of cases; its length is not a smell.
    files: ["tests/**/*.{ts,tsx}"],
    rules: { "max-lines-per-function": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".lighthouseci/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
