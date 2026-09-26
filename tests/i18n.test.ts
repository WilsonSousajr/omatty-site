import { describe, expect, test } from "vitest";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { fill, getDictionary } from "@/lib/i18n";

describe("getDictionary", () => {
  test("returns each locale's own strings", () => {
    expect(getDictionary("en")).toBe(en);
    expect(getDictionary("pt")).toBe(pt);
  });
});

describe("fill", () => {
  test("replaces every named placeholder", () => {
    expect(fill("v{version}, v{version}", { version: "0.6.0" })).toBe(
      "v0.6.0, v0.6.0",
    );
  });

  test("leaves an unknown placeholder visible rather than printing undefined", () => {
    expect(fill("{nope}", {})).toBe("{nope}");
  });
});
