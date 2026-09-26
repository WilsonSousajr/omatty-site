import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The text frame scripts/demo/make-hero.sh renders beside a cast: what the
 * page shows before the player loads, without JS, and to a screen reader.
 * Read at build time. readPoster("hero") reads public/casts/hero.txt.
 */
export function readPoster(name: string): string {
  if (!/^[a-z0-9-]+$/.test(name)) {
    throw new Error(
      `cast name ${JSON.stringify(name)} must be lowercase letters, digits and dashes`,
    );
  }
  return readFileSync(
    join(process.cwd(), "public", "casts", `${name}.txt`),
    "utf8",
  );
}
