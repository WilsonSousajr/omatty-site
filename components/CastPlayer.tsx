"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "asciinema-player/dist/bundle/asciinema-player.css";

type CastOptions = { posterAt: number; reduced: boolean; narrow: boolean };

// Below this width, 120 columns fitted to the screen are ~2px a character.
const narrowQuery = "(max-width: 40rem)";

/** How the recording is sized: fitted on a wide screen, readable and scrolled on a phone. */
function sizing(narrow: boolean) {
  if (!narrow) return { fit: "width" as const };
  // The frame scrolls sideways and opens on the left edge: the session
  // cards and their verdicts, which are what the recording is about.
  return { fit: false as const, terminalFontSize: "9px" };
}

/** Options for a hero loop: npt:0:17 is "seventeen seconds in". */
function playerOptions({ posterAt, reduced, narrow }: CastOptions) {
  return {
    // Under reduced motion it holds still on the poster; play is one click.
    autoPlay: !reduced,
    loop: true,
    idleTimeLimit: 1.5,
    poster: `npt:0:${posterAt}`,
    controls: "auto" as const,
    // A narrow system monospace keeps 120 columns legible and costs no download.
    terminalFontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
    ...sizing(narrow),
  };
}

function usePlayer(src: string, posterAt: number) {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let player: { dispose(): void } | undefined;
    let gone = false;
    const matches = (query: string) => window.matchMedia(query).matches;
    const reduced = matches("(prefers-reduced-motion: reduce)");
    const narrow = matches(narrowQuery);
    // The player touches window at import time, so it is loaded only here.
    void import("asciinema-player").then(({ create }) => {
      if (gone || !mount.current) return;
      const opts = playerOptions({ posterAt, reduced, narrow });
      player = create(src, mount.current, opts);
      setReady(true);
    });
    return () => {
      gone = true;
      player?.dispose();
    };
  }, [src, posterAt]);
  return { mount, ready };
}

/**
 * A real omatty recording (invariant 4), played as text. Until the player
 * loads - and forever without JS - the fallback shows the poster frame as
 * text. Once it loads, the player is laid over the fallback, which stays in
 * place (so nothing shifts) and in the accessibility tree.
 *
 *   <CastPlayer src="/casts/hero.cast" posterAt={17} fallback={<pre>…</pre>} />
 */
export function CastPlayer({
  src,
  posterAt,
  fallback,
}: {
  src: string;
  posterAt: number;
  fallback: ReactNode;
}) {
  const { mount, ready } = usePlayer(src, posterAt);
  return (
    <div className="cast-player">
      {/* Not aria-hidden: the player's controls are focusable, and under
          reduced motion its play button is the only way to start it (omatty#510). */}
      <div ref={mount} />
      <div
        className={
          ready ? "cast-player__poster is-covered" : "cast-player__poster"
        }
      >
        {fallback}
      </div>
    </div>
  );
}
