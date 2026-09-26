import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/** The limits, said on the page rather than in a reply (invariant 3). */
export function Limits({ dict }: { dict: Dictionary }) {
  return (
    <Section id="limits" title={dict.limits.title}>
      <ul className="limits prose">
        {dict.limits.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}
