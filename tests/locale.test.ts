import { describe, expect, test } from "vitest";
import { defaultLocale, isLocale, negotiateLocale } from "@/lib/locale";

describe("negotiateLocale", () => {
  test.each([
    ["pt-BR,pt;q=0.9,en;q=0.8", "pt"],
    ["en-US,en;q=0.9", "en"],
    ["fr-FR,pt;q=0.5,en;q=0.9", "en"],
    ["fr-FR,pt;q=0.9,en;q=0.5", "pt"],
    ["PT-pt", "pt"],
    ["de, fr;q=0.8", defaultLocale],
    ["", defaultLocale],
    [null, defaultLocale],
    ["*", defaultLocale],
    ["pt;q=0, en;q=0.1", "en"],
    ["pt;q=garbage", "pt"],
  ])("%j -> %s", (header, want) => {
    expect(negotiateLocale(header)).toBe(want);
  });
});

describe("isLocale", () => {
  test("accepts exactly the supported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("pt-BR")).toBe(false);
    expect(isLocale("__proto__")).toBe(false);
  });
});
