import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/** Why the page exists: judging the work is the slow part, not doing it. */
export function Problem({ dict }: { dict: Dictionary }) {
  return (
    <Section id="problem" title={dict.problem.title}>
      <div className="prose">
        {dict.problem.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
