import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

// The same argument as omatty's TestDepguard_ExecAllowlistMatchesReality: a
// list written down in two places drifts, so assert it, do not trust it.
const read = (path: string) => readFileSync(path, "utf8");

function gateShSteps(): string[] {
  const line = read("scripts/gate.sh").match(/^STEPS=\((.*)\)$/m);
  return line?.[1]?.trim().split(/\s+/) ?? [];
}

function ciSteps(): string[] {
  const runs = read(".github/workflows/ci.yml").matchAll(/npm run gate:(\w+)/g);
  return [...runs].map((m) => m[1] ?? "");
}

function packageGateScripts(): string[] {
  const pkg = JSON.parse(read("package.json")) as {
    scripts: Record<string, string>;
  };
  return Object.keys(pkg.scripts)
    .filter((name) => name.startsWith("gate:"))
    .map((name) => name.slice("gate:".length));
}

describe("the gate", () => {
  test("gate.sh names at least one step", () => {
    expect(gateShSteps().length).toBeGreaterThan(0);
  });

  test("ci.yml runs exactly gate.sh's steps, in the same order", () => {
    expect(ciSteps()).toEqual(gateShSteps());
  });

  test("every package.json gate script is a step, and every step has one", () => {
    expect([...packageGateScripts()].sort()).toEqual([...gateShSteps()].sort());
  });
});
