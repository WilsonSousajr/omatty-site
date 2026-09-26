import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { en } from "@/dictionaries/en";
import { INSTALL_CMD, REPO_URL, VERSION } from "@/lib/site";

describe("Hero", () => {
  test("leads with the headline, the one claim and the install command", () => {
    render(<Hero dict={en} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      en.hero.headline,
    );
    expect(screen.getByText(en.hero.claim)).toBeInTheDocument();
    expect(screen.getByText(INSTALL_CMD)).toBeInTheDocument();
  });

  test("states the version and the limits beside the install command (invariant 3)", () => {
    render(<Hero dict={en} />);
    expect(
      screen.getByText(`v${VERSION}, pre-1.0, for macOS and Linux.`),
    ).toBeInTheDocument();
  });

  test("links to the source", () => {
    render(<Hero dict={en} />);
    expect(screen.getByRole("link", { name: en.hero.source })).toHaveAttribute(
      "href",
      REPO_URL,
    );
  });
});

describe("Nav", () => {
  test("carries the wordmark home, GitHub and the language switch", () => {
    render(<Nav dict={en} lang="en" />);
    expect(screen.getByRole("link", { name: en.nav.home })).toHaveAttribute(
      "href",
      "/en",
    );
    expect(screen.getByRole("link", { name: en.nav.github })).toHaveAttribute(
      "href",
      REPO_URL,
    );
    expect(
      screen.getByRole("navigation", { name: en.nav.language }),
    ).toBeInTheDocument();
  });
});
