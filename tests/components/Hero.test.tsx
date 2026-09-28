import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { en } from "@/dictionaries/en";
import { INSTALL_CMD, INSTALL_SCRIPT_CMD, REPO_URL, VERSION } from "@/lib/site";

// The player is CastPlayer's subject, not the hero's.
vi.mock("asciinema-player", () => ({ create: () => ({ dispose() {} }) }));

describe("Hero", () => {
  test("leads with the headline, the one claim and the install command", () => {
    render(<Hero dict={en} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      en.hero.headline,
    );
    expect(screen.getByText(en.hero.claim)).toBeInTheDocument();
    expect(screen.getByText(INSTALL_SCRIPT_CMD)).toBeInTheDocument();
  });

  // omatty#570: brew does nothing on a Linux machine without Homebrew, and
  // the one-liner hands off to the tap itself where brew is present, so the
  // first screen offers one command that works everywhere omatty runs.
  test("offers only the one-line install, not brew (omatty#570)", () => {
    render(<Hero dict={en} />);
    expect(screen.queryByText(INSTALL_CMD)).not.toBeInTheDocument();
  });

  test("states the version and what it runs on beside the install command (invariant 3)", () => {
    render(<Hero dict={en} />);
    expect(
      screen.getByText(
        `v${VERSION}, pre-1.0. For macOS and Linux, with git and Claude Code.`,
      ),
    ).toBeInTheDocument();
  });

  test("shows the real recording in a frame, with its text poster and an honest caption", () => {
    render(<Hero dict={en} />);
    const frame = screen.getByRole("figure", { name: en.hero.recording });
    expect(frame).toHaveTextContent("READY");
    // omatty#556: the agent on screen is the real Claude Code, and the caption
    // says which parts were scripted (the keys and the two prompts).
    expect(screen.getByText(/real Claude Code/)).toBeInTheDocument();
    expect(
      screen.getByText(/keys and the two prompts are scripted/),
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
