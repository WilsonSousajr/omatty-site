import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";
import { CopyCommand } from "@/components/CopyCommand";
import { FakeClipboard } from "../fakes";

const labels = { copy: "Copy", copied: "Copied", failed: "Select and copy" };
const command = "brew install WilsonSousajr/tap/omatty";

afterEach(() => vi.useRealTimers());

describe("CopyCommand", () => {
  test("shows the command as selectable text, so it works without JS", () => {
    render(<CopyCommand command={command} labels={labels} />);
    expect(screen.getByText(command).tagName).toBe("CODE");
  });

  test("lets a phone break the command after a slash, and nowhere inside a word", () => {
    const { container } = render(
      <CopyCommand command={command} labels={labels} />,
    );
    const code = container.querySelector("code");
    expect(code?.textContent).toBe(command);
    expect(code?.innerHTML).toBe(
      "brew install WilsonSousajr/<wbr>tap/<wbr>omatty",
    );
  });

  test("copies exactly the command, with no prompt character", async () => {
    const clipboard = new FakeClipboard();
    render(
      <CopyCommand command={command} labels={labels} clipboard={clipboard} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(clipboard.written).toEqual([command]);
    expect(screen.getByRole("button")).toHaveTextContent("Copied");
  });

  test("says how to copy by hand when the clipboard refuses", async () => {
    render(
      <CopyCommand
        command={command}
        labels={labels}
        clipboard={new FakeClipboard(true)}
      />,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveTextContent("Select and copy");
  });

  test("goes back to Copy after a moment", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(
      <CopyCommand
        command={command}
        labels={labels}
        clipboard={new FakeClipboard()}
      />,
    );
    await userEvent.click(screen.getByRole("button"));
    act(() => vi.advanceTimersByTime(2500));
    expect(screen.getByRole("button")).toHaveTextContent("Copy");
  });

  test("announces the result to screen readers", async () => {
    render(
      <CopyCommand
        command={command}
        labels={labels}
        clipboard={new FakeClipboard()}
      />,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });
});
