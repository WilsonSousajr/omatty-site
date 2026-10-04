import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

// One cold Lighthouse run on a shared CI runner scored /en at 0.7 against a
// 0.95 floor, and a rerun of the same commit passed (#571). A budget that
// fails for no reason teaches people to rerun until it is green, which is how
// a real regression gets through. So the budget takes several runs and
// asserts on their median, and the floor stays where it was.
type Assertion = [string, { minScore: number; aggregationMethod?: string }];

const rc = JSON.parse(readFileSync("lighthouserc.json", "utf8")) as {
  ci: {
    collect: { numberOfRuns: number };
    assert: { assertions: Record<string, Assertion> };
  };
};

describe("the Lighthouse budget (#571)", () => {
  test("takes at least three runs per page", () => {
    expect(rc.ci.collect.numberOfRuns).toBeGreaterThanOrEqual(3);
  });

  test("asserts every category on the median run, not the best or the worst", () => {
    for (const [name, [, options]] of Object.entries(rc.ci.assert.assertions)) {
      expect(options.aggregationMethod, name).toBe("median-run");
    }
  });

  test("keeps the performance floor at 0.95", () => {
    expect(
      rc.ci.assert.assertions["categories:performance"]?.[1].minScore,
    ).toBe(0.95);
  });
});
