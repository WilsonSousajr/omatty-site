import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { INSTALL_SCRIPT_CMD } from "@/lib/site";

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
    "an install method that does not exist: a script other than omatty.com/install.sh, or a package (omatty#517)",
    /curl(?![^|]*https:\/\/omatty\.com\/install\.sh)[^|]*\|\s*(ba|z)?sh|\bapt(-get)? install\b|\bnix (profile|-env)\b|\b(yay|paru) -S\b/i,
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
    "a second agent said to be in progress, which #152 is not (omatty#515)",
    /\bcodex\b[^.]*\b(in progress|em andamento)\b/i,
  ],
  [
    "several repositories offered as a difference from claude agents, which spans all projects (omatty#515)",
    /\b(span|spans|abrangem|abrange) (several|vários) repositórios?\b|\bspan several repositories\b/i,
  ],
  [
    "a hard-coded version, which drifts from lib/site.ts",
    /\bv?\d+\.\d+\.\d+\b/,
  ],
  [
    "claim that the forge is gh alone, which omatty's forges ended (omatty#610)",
    /\bgh is optional and turns on\b|\bo gh é opcional e liga\b|\bif you install it, to gh\b|\bse você o instalar, com o gh\b/i,
  ],
];

/**
 * Invariant 1 for the forges (omatty#610): the page names a forge only if
 * omatty's README, in its Forges table, does - and it names every one there,
 * so a reader on GitLab or Azure DevOps finds theirs.
 */
const readme = readFileSync("tests/fixtures/omatty-README.md", "utf8");
const forgesTable = readme.slice(readme.indexOf("## Forges"));
const forgeNames = [
  "GitHub",
  "GitLab",
  "Gitea",
  "Forgejo",
  "Codeberg",
  "Bitbucket",
  "Azure DevOps",
  "SourceHut",
  "Gerrit",
  "Phabricator",
  "CodeCommit",
];
const readForges = ["GitHub", "GitLab", "Gitea", "Bitbucket", "Azure DevOps"];

describe.each([
  ["en", en],
  ["pt", pt],
])("the %s page", (_lang, dict) => {
  test.each(banned)("makes no %s", (_what, pattern) => {
    const hits = strings(dict).filter(({ text }) => pattern.test(text));
    expect(hits).toEqual([]);
  });

  test("pipes nothing into a shell but the exact one-line install (omatty#517)", () => {
    const hits = strings(dict).filter(
      ({ text }) =>
        /\|\s*(ba|z)?sh\b/.test(text) && !text.includes(INSTALL_SCRIPT_CMD),
    );
    expect(hits).toEqual([]);
  });

  test("names only forges omatty's README reads (omatty#610)", () => {
    const text = strings(dict)
      .map((s) => s.text)
      .join(" ");
    const named = forgeNames.filter((name) => text.includes(name));
    expect(named.filter((name) => !forgesTable.includes(name))).toEqual([]);
  });

  test("names every forge omatty reads, so a reader finds theirs (omatty#610)", () => {
    const text = strings(dict)
      .map((s) => s.text)
      .join(" ");
    expect(readForges.filter((name) => !text.includes(name))).toEqual([]);
  });

  test("names Azure DevOps Server only to say it is not read yet (omatty#610)", () => {
    const hits = strings(dict).filter(
      ({ text }) =>
        /Azure DevOps Server/.test(text) &&
        !/not (read )?yet|ainda não/i.test(text),
    );
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
