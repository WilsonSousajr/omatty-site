import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ClosingCta } from "@/components/ClosingCta";
import { Compare } from "@/components/Compare";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { KeyTable } from "@/components/KeyTable";
import { Limits } from "@/components/Limits";
import { Nav } from "@/components/Nav";
import { Problem } from "@/components/Problem";
import { WontDo } from "@/components/WontDo";
import { en } from "@/dictionaries/en";
import { pt } from "@/dictionaries/pt";
import { INSTALL_CMD, ISSUES_NEW_URL, repoFile } from "@/lib/site";

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
    ["Limits", () => <Limits dict={dict} />, dict.limits.title],
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
  test("is a table with named columns, one row per place others are ahead", () => {
    render(<Compare dict={en} />);
    const table = screen.getByRole("table");
    expect(
      within(table).getByRole("columnheader", { name: en.compare.headers.who }),
    ).toBeTruthy();
    expect(within(table).getAllByRole("row")).toHaveLength(
      en.compare.rows.length + 1,
    );
  });

  test("never breaks a product name at its hyphen, so claude-squad stays one word", () => {
    render(<Compare dict={en} />);
    const names = screen
      .getAllByRole("rowheader")
      .map((th) => th.textContent ?? "");
    expect(names.some((n) => n.includes("claude\u2011squad"))).toBe(true);
    expect(names.every((n) => !n.includes("-"))).toBe(true);
  });

  test("links to the full comparison and its sources", () => {
    render(<Compare dict={en} />);
    expect(screen.getByRole("link", { name: en.compare.more })).toHaveAttribute(
      "href",
      repoFile("docs/comparison.md"),
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
  test("is the install anchor, with the command and a way to report what broke", () => {
    render(<ClosingCta dict={en} />);
    expect(
      screen.getByRole("region", { name: en.closing.title }),
    ).toHaveAttribute("id", "install");
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
