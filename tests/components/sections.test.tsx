import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ClosingCta } from "@/components/ClosingCta";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { KeyTable } from "@/components/KeyTable";
import { Implication } from "@/components/Implication";
import { Nav } from "@/components/Nav";
import { Payoff } from "@/components/Payoff";
import { Problem } from "@/components/Problem";
import { WontDo } from "@/components/WontDo";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { verdicts } from "@/lib/comparison";
import {
  INSTALL_CMD,
  INSTALL_SCRIPT_CMD,
  ISSUES_NEW_URL,
  repoFile,
} from "@/lib/site";

describe.each([
  ["en", en],
  ["pt", pt],
] as const)("every section in %s", (_lang, dict) => {
  test.each([
    ["Problem", () => <Problem dict={dict} />, dict.problem.title],
    ["HowItWorks", () => <HowItWorks dict={dict} />, dict.how.title],
    ["KeyTable", () => <KeyTable dict={dict} />, dict.keys.title],
    ["WontDo", () => <WontDo dict={dict} />, dict.wontDo.title],
    ["Compare", () => <Compare dict={dict} />, dict.compare.title],
    ["Implication", () => <Implication dict={dict} />, dict.implication.title],
    ["Payoff", () => <Payoff dict={dict} />, dict.payoff.title],
    ["Faq", () => <Faq dict={dict} />, dict.faq.title],
    ["ClosingCta", () => <ClosingCta dict={dict} />, dict.closing.title],
  ])("%s is a region named by its heading", (_name, element, title) => {
    render(element());
    const heading = screen.getByRole("heading", { level: 2, name: title });
    expect(screen.getByRole("region", { name: title })).toContainElement(
      heading,
    );
  });
});

describe("HowItWorks", () => {
  test("is an ordered list, because a turn really is a sequence", () => {
    render(<HowItWorks dict={en} />);
    const steps = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(steps).toHaveLength(en.how.steps.length);
    expect(screen.getByRole("list").tagName).toBe("OL");
  });
});

describe("KeyTable", () => {
  test("pairs each key, set as code, with what it does", () => {
    render(<KeyTable dict={en} />);
    for (const row of en.keys.rows) {
      const key = screen.getByText(row.key);
      expect(key.tagName).toBe("CODE");
      expect(key.closest("dt")?.nextElementSibling).toHaveTextContent(row.text);
    }
  });
});

describe("Compare", () => {
  test("names every row's facts from lib/comparison, in both languages", () => {
    for (const dict of [en, pt]) {
      expect(dict.compare.rows.map((r) => r.id).sort()).toEqual(
        Object.keys(verdicts).sort(),
      );
    }
  });

  test("names the tools it compares, each cell sourced, not a whole camp (omatty#515)", () => {
    render(<Compare dict={en} />);
    const names = screen
      .getAllByRole("columnheader")
      .map((h) => h.textContent ?? "");
    expect(names.join(" ")).toMatch(/herdr/);
    expect(names.join(" ")).toMatch(/Orca/);
    expect(Object.keys(verdicts)).not.toContain("ssh");
  });

  test("is a table with one column per tool and one row per need", () => {
    render(<Compare dict={en} />);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("columnheader")).toHaveLength(5);
    expect(within(table).getAllByRole("row")).toHaveLength(
      en.compare.rows.length + 1,
    );
  });

  test("marks each cell from the facts, readable as Yes or No", () => {
    render(<Compare dict={en} />);
    const gate = screen.getByRole("row", {
      name: new RegExp(en.compare.rows[0]!.feature),
    });
    const cells = within(gate)
      .getAllByRole("cell")
      .map((c) => c.textContent);
    expect(cells).toEqual(
      ["Yes", "No", "No", "No"].map((v) => expect.stringContaining(v)),
    );
  });

  test("never breaks a product name at its hyphen, so herdr-reviewr stays one word", () => {
    render(<Compare dict={en} />);
    const header = screen.getByRole("columnheader", { name: /herdr/ });
    expect(header.textContent).toContain("herdr\u2011reviewr");
    expect(header.textContent).not.toContain("herdr-reviewr");
  });

  test("dates its claims and links to their sources", () => {
    render(<Compare dict={en} />);
    expect(screen.getByText(en.compare.asOf)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: en.compare.more })).toHaveAttribute(
      "href",
      repoFile("docs/comparison.md"),
    );
  });
});

describe("Implication", () => {
  test("lists what an unchecked session costs, unnumbered: they are not a sequence", () => {
    render(<Implication dict={en} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(within(list).getAllByRole("listitem")).toHaveLength(
      en.implication.items.length,
    );
  });
});

describe("WontDo", () => {
  test("links to the roadmap that says why", () => {
    render(<WontDo dict={en} />);
    expect(screen.getByRole("link", { name: en.wontDo.link })).toHaveAttribute(
      "href",
      repoFile("docs/ROADMAP.md"),
    );
  });
});

describe("Faq", () => {
  test("opens each answer from its question, with no JavaScript", () => {
    const { container } = render(<Faq dict={en} />);
    const questions = container.querySelectorAll("details > summary");
    expect([...questions].map((q) => q.textContent)).toEqual(
      en.faq.items.map((i) => i.q),
    );
  });
});

describe("ClosingCta", () => {
  test("is the install anchor, with the commands and a way to report what broke", () => {
    render(<ClosingCta dict={en} />);
    expect(
      screen.getByRole("region", { name: en.closing.title }),
    ).toHaveAttribute("id", "install");
    expect(screen.getByText(INSTALL_SCRIPT_CMD)).toBeInTheDocument();
    expect(screen.getByText(INSTALL_CMD)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: en.closing.issue }),
    ).toHaveAttribute("href", ISSUES_NEW_URL);
  });
});

describe("Footer", () => {
  test("links to the documents behind the page", () => {
    render(<Footer dict={en} lang="en" />);
    expect(
      screen.getByRole("link", { name: en.footer.changelog }),
    ).toHaveAttribute("href", repoFile("CHANGELOG.md"));
    expect(
      screen.getByRole("link", { name: en.footer.license }),
    ).toHaveAttribute("href", repoFile("LICENSE"));
  });
});

describe("Nav", () => {
  test("links to the sections a visitor jumps to", () => {
    render(<Nav dict={en} lang="en" />);
    const sections = screen.getByRole("navigation", { name: en.nav.sections });
    const hrefs = within(sections)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(["#how", "#compare", "#faq", "#install"]);
  });
});
