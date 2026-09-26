import type { Dictionary } from "@/dictionaries/en";
import { repoFile } from "@/lib/site";
import { Section } from "./Section";

// A non-breaking hyphen: CSS cannot stop a line break at a real one, and a
// phone would otherwise print "claude-" and "squad" on two lines.
const unbreakable = (name: string) => name.replaceAll("-", "\u2011");

/**
 * omatty's docs/comparison.md, condensed to where others are ahead. A row
 * the product has since closed comes off (omatty#509), it is not kept.
 */
export function Compare({ dict }: { dict: Dictionary }) {
  const { compare } = dict;
  return (
    <Section id="compare" title={compare.title}>
      <p className="prose">{compare.intro}</p>
      <div className="compare__scroll">
        <table className="compare">
          <thead>
            <tr>
              <th scope="col">{compare.headers.who}</th>
              <th scope="col">{compare.headers.what}</th>
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row) => (
              <tr key={row.what}>
                <th scope="row">{unbreakable(row.who)}</th>
                <td>{row.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="prose">
        <p>{compare.claudeAgents}</p>
        <p>{compare.lazygit}</p>
        <p>
          <a href={repoFile("docs/comparison.md")}>{compare.more}</a>
        </p>
      </div>
    </Section>
  );
}
