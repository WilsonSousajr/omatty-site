import { describe, expect, test } from "vitest";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";

/**
 * AGENTS.md invariants 2 and 3, from omatty's docs/announcement.md, "What must
 * not be claimed": a claim on this page cannot be corrected by a commit once
 * someone has read it, so the ones omatty has already had to retract are
 * refused here, in both languages.
 */
type Strings = { path: string; text: string }[];

function strings(node: unknown, path = ""): Strings {
  if (typeof node === "string") return [{ path, text: node }];
  if (typeof node !== "object" || node === null) return [];
  return Object.entries(node).flatMap(([key, value]) =>
    strings(value, `${path}.${key}`),
  );
}

const banned: [string, RegExp][] = [
  [
    "a uniqueness claim",
    /\bthe only\b|\bonly (tool|one) (that|to)\b|\bo únic[oa]\b|\ba únic[oa]\b/i,
  ],
  [
    "an unsourced count of the field",
    /\b1[0-9]{2}\b|~\s*\d+|\bdozens of\b|\bdezenas de\b/i,
  ],
  [
    "an install method that does not exist",
    /curl[^|]*\|\s*(ba|z)?sh|\bapt(-get)? install\b|\bnix (profile|-env)\b|\b(yay|paru) -S\b/i,
  ],
  [
    "a false claim about claude agents",
    /claude agents (does not|doesn't|não) (exist|existe)/i,
  ],
  [
    "support for an agent that is not shipped",
    /\bsupports? (codex|gemini|aider)\b|\bsuporta (o )?(codex|gemini)\b/i,
  ],
  [
    "a hard-coded version, which drifts from lib/site.ts",
    /\bv?\d+\.\d+\.\d+\b/,
  ],
];

describe.each([
  ["en", en],
  ["pt", pt],
])("the %s page", (_lang, dict) => {
  test.each(banned)("makes no %s", (_what, pattern) => {
    const hits = strings(dict).filter(({ text }) => pattern.test(text));
    expect(hits).toEqual([]);
  });

  test("uses no dashes as punctuation: no em dash, en dash or double hyphen", () => {
    const hits = strings(dict).filter(({ text }) => /—|–|--/.test(text));
    expect(hits).toEqual([]);
  });

  test("mentions Windows only to say omatty does not run on it", () => {
    const negative =
      /no windows|sem windows|macos and linux only|apenas (para )?macos e linux/i;
    const hits = strings(dict).filter(
      ({ text }) => /windows/i.test(text) && !negative.test(text),
    );
    expect(hits).toEqual([]);
  });
});

test("the English hero makes the one sanctioned claim, word for word", () => {
  expect(en.hero.claim).toBe(
    "omatty runs your project's own check line inside each session's worktree and puts the verdict on the session's card.",
  );
});
