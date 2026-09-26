import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/** The life of one turn, in order: the one place the page numbers anything. */
export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <Section id="how" title={dict.how.title}>
      <ol className="steps">
        {dict.how.steps.map((step) => (
          <li key={step.title} className="steps__item">
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
