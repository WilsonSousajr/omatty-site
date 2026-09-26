import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { LangSwitch } from "@/components/LangSwitch";

describe("LangSwitch", () => {
  test("links each language to its page, named in its own language", () => {
    render(<LangSwitch current="en" label="Language" />);
    expect(screen.getByRole("link", { name: "Português" })).toHaveAttribute(
      "href",
      "/pt",
    );
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute(
      "href",
      "/en",
    );
  });

  test("marks the current language and tells the browser each link's language", () => {
    render(<LangSwitch current="pt" label="Idioma" />);
    const pt = screen.getByRole("link", { name: "Português" });
    expect(pt).toHaveAttribute("aria-current", "page");
    expect(pt).toHaveAttribute("hreflang", "pt");
    expect(screen.getByRole("link", { name: "English" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(
      screen.getByRole("navigation", { name: "Idioma" }),
    ).toBeInTheDocument();
  });
});
