import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/** Questions as <details>, so each answer opens without JavaScript (invariant 7). */
export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <Section id="faq" title={dict.faq.title}>
      <div className="faq prose">
        {dict.faq.items.map((item) => (
          <details key={item.q} className="faq__item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
