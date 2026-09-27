import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/** SPIN's Need-payoff: the outcome, asked as a question, before the answer. */
export function Payoff({ dict }: { dict: Dictionary }) {
  return (
    <Section id="payoff" title={dict.payoff.title}>
      <p className="payoff prose">{dict.payoff.body}</p>
    </Section>
  );
}
