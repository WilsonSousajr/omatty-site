import type { Dictionary } from "@/dictionaries/en";
import { repoFile } from "@/lib/site";
import { Section } from "./Section";

/** What omatty refuses to be, with the roadmap that argues each refusal. */
export function WontDo({ dict }: { dict: Dictionary }) {
  return (
    <Section id="wont-do" title={dict.wontDo.title}>
      <p className="prose">{dict.wontDo.body}</p>
      <p className="section__more">
        <a href={repoFile("docs/ROADMAP.md")}>{dict.wontDo.link}</a>
      </p>
    </Section>
  );
}
