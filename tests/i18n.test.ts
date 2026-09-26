import { describe, expect, test } from "vitest";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { getDictionary } from "@/lib/i18n";

describe("getDictionary", () => {
  test("returns each locale's own strings", () => {
    expect(getDictionary("en")).toBe(en);
    expect(getDictionary("pt")).toBe(pt);
  });
});
