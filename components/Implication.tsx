import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/**
 * SPIN's Implication: what an unchecked session costs the person running
 * it. Each cost is one omatty's docs/comparison.md names, not an invented one.
 */
export function Implication({ dict }: { dict: Dictionary }) {
  return (
    <Section id="cost" title={dict.implication.title}>
      <ul className="costs">
        {dict.implication.items.map((item) => (
          <li key={item.title} className="costs__item">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
