import { describe, expect, test } from "vitest";
import { readPoster } from "@/lib/casts";

describe("readPoster", () => {
  test("reads the text frame recorded beside a cast", () => {
    expect(readPoster("hero")).toContain("READY");
  });

  test("refuses a name that could climb out of public/casts", () => {
    expect(() => readPoster("../../package")).toThrow(/cast name/);
  });
});
