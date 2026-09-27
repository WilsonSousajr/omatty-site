import type { Dictionary } from "@/dictionaries/en";
import { tools, verdicts, type Tool } from "@/lib/comparison";
import { repoFile } from "@/lib/site";
import { Section } from "./Section";

// A non-breaking hyphen: CSS cannot stop a line break at a real one, and a
// phone would otherwise print "claude-" and "squad" on two lines.
const unbreakable = (name: string) => name.replaceAll("-", "‑");

type Headers = Dictionary["compare"]["headers"];

/** A column's name, and the tools it stands for in smaller type. */
function toolHeader(headers: Headers, tool: Tool) {
  if (tool === "omatty") return headers.omatty;
  const examples = headers[`${tool}Examples`];
  return (
    <>
      {headers[tool]}
      <span className="compare__examples">{unbreakable(examples)}</span>
    </>
  );
}

/** One cell: a mark to see, and Yes or No to hear. */
function Verdict({
  yes,
  words,
}: {
  yes: boolean;
  words: Dictionary["compare"];
}) {
  return (
    <>
      <span aria-hidden="true" className={yes ? "compare__yes" : "compare__no"}>
        {yes ? "✓" : "✗"}
      </span>
      <span className="sr-only">{yes ? words.yes : words.no}</span>
    </>
  );
}

/**
 * What omatty is built for, against the kinds of tool people compare it to.
 * The facts live in lib/comparison.ts, each sourced in omatty's
 * docs/comparison.md; this component only lays them out.
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
              <th scope="col">{compare.headers.feature}</th>
              {tools.map((tool) => (
                <th
                  key={tool}
                  scope="col"
                  className={`compare__tool compare__tool--${tool}`}
                >
                  {toolHeader(compare.headers, tool)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.feature}</th>
                {tools.map((tool) => (
                  <td
                    key={tool}
                    className={`compare__cell compare__cell--${tool}`}
                  >
                    <Verdict yes={verdicts[row.id][tool]} words={compare} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="section__note">
        {compare.asOf}{" "}
        <a href={repoFile("docs/comparison.md")}>{compare.more}</a>
      </p>
    </Section>
  );
}
