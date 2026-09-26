import type { Dictionary } from "@/dictionaries/en";
import { Section } from "./Section";

/**
 * The features as omatty's README presents them: the key or command on the
 * left, what it does on the right. It teaches the keys while it lists them.
 */
export function KeyTable({ dict }: { dict: Dictionary }) {
  return (
    <Section id="keys" title={dict.keys.title}>
      <p className="prose">{dict.keys.intro}</p>
      <dl className="key-table">
        {dict.keys.rows.map((row) => (
          <div key={row.key} className="key-table__row">
            <dt>
              <code>{row.key}</code>
            </dt>
            <dd>{row.text}</dd>
          </div>
        ))}
      </dl>
      <p className="prose section__note">{dict.keys.footprint}</p>
    </Section>
  );
}
