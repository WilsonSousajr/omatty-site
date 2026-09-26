import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { CastPlayer } from "@/components/CastPlayer";

/** Stands in for asciinema-player: records how it was created and disposed. */
class FakeAsciinema {
  created: { src: unknown; opts: Record<string, unknown> }[] = [];
  disposed = 0;
  create = (src: unknown, _el: HTMLElement, opts: Record<string, unknown>) => {
    this.created.push({ src, opts });
    return { dispose: () => void this.disposed++ };
  };
}

const fake = vi.hoisted(() => ({ current: null as unknown as FakeAsciinema }));
vi.mock("asciinema-player", () => ({
  create: (...args: Parameters<FakeAsciinema["create"]>) =>
    fake.current.create(...args),
}));

function viewer({ reduced = false, narrow = false }) {
  window.matchMedia = ((query: string) => ({
    matches:
      (reduced && query.includes("reduce")) ||
      (narrow && query.includes("max-width")),
  })) as unknown as typeof window.matchMedia;
}

const poster = <pre>✓✓✗ test</pre>;

/** Renders the hero player and waits for it to create the real player. */
async function mountPlayer() {
  const view = render(
    <CastPlayer src="/casts/hero.cast" posterAt={17} fallback={poster} />,
  );
  await waitFor(() => expect(fake.current.created).toHaveLength(1));
  return { ...view, ...fake.current.created[0]! };
}

beforeEach(() => {
  fake.current = new FakeAsciinema();
  viewer({});
});
afterEach(() => vi.clearAllMocks());

describe("CastPlayer", () => {
  test("renders the text poster first, so the page says something without JS", () => {
    render(
      <CastPlayer src="/casts/hero.cast" posterAt={17} fallback={poster} />,
    );
    expect(screen.getByText("✓✓✗ test")).toBeInTheDocument();
  });

  test("plays the cast on a loop, fitted to the frame, with idle time capped", async () => {
    const { src, opts } = await mountPlayer();
    expect(src).toBe("/casts/hero.cast");
    expect(opts).toMatchObject({
      autoPlay: true,
      loop: true,
      idleTimeLimit: 1.5,
      fit: "width",
    });
  });

  test("under reduced motion it holds still on the poster frame", async () => {
    viewer({ reduced: true });
    const { opts } = await mountPlayer();
    expect(opts).toMatchObject({ autoPlay: false, poster: "npt:0:17" });
  });

  test("on a phone it keeps a readable size and lets the frame scroll, instead of shrinking 120 columns to fit", async () => {
    viewer({ narrow: true });
    const { opts } = await mountPlayer();
    expect(opts).toMatchObject({ fit: false, terminalFontSize: "9px" });
  });

  test("hides the text poster from sight once the player exists, keeping it for screen readers", async () => {
    await mountPlayer();
    expect(screen.getByText("✓✓✗ test").parentElement).toHaveClass("sr-only");
  });

  test("disposes the player when it leaves the page", async () => {
    const { unmount } = await mountPlayer();
    unmount();
    expect(fake.current.disposed).toBe(1);
  });
});
