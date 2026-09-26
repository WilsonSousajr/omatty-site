import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TerminalFrame } from "@/components/TerminalFrame";

describe("TerminalFrame", () => {
  test("draws its title in the border, as omatty's panes do, and holds its content", () => {
    render(
      <TerminalFrame title="omatty">
        <p>inside</p>
      </TerminalFrame>,
    );
    expect(screen.getByRole("figure", { name: "omatty" })).toContainElement(
      screen.getByText("inside"),
    );
  });
});
