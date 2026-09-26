"use client";

import { useEffect, useState } from "react";

/** The one clipboard call we make, so a test can hand in a FakeClipboard. */
type Clipboard = { writeText(text: string): Promise<void> };

type CopyState = "idle" | "copied" | "failed";

type CopyLabels = { copy: string; copied: string; failed: string };

// Long enough to read "Copied", short enough to copy twice in a row.
const resetAfterMs = 2000;

/** "a/b" renders as "a/", <wbr>, "b": a phone may break after a slash, never mid-word. */
function breakAfterSlashes(command: string) {
  const parts = command.split("/");
  return parts.flatMap((part, i) =>
    i === parts.length - 1 ? [part] : [`${part}/`, <wbr key={i} />],
  );
}

function useCopy(command: string, clipboard?: Clipboard) {
  const [state, setState] = useState<CopyState>("idle");
  useEffect(() => {
    if (state === "idle") return;
    const timer = setTimeout(() => setState("idle"), resetAfterMs);
    return () => clearTimeout(timer);
  }, [state]);
  const copy = () =>
    (clipboard ?? navigator.clipboard)
      .writeText(command)
      .then(() => setState("copied"))
      // A denied permission leaves the text selectable; say so, don't hide it.
      .catch(() => setState("failed"));
  return { state, copy };
}

/**
 * A shell command a visitor is meant to paste: the text itself stays
 * selectable (invariant 7), and the button copies it without the prompt.
 *
 *   <CopyCommand command="brew install WilsonSousajr/tap/omatty" labels={dict.copy} />
 */
export function CopyCommand({
  command,
  labels,
  clipboard,
}: {
  command: string;
  labels: CopyLabels;
  clipboard?: Clipboard;
}) {
  const { state, copy } = useCopy(command, clipboard);
  const label = state === "idle" ? labels.copy : labels[state];
  return (
    <div className="copy-command">
      <span aria-hidden="true" className="copy-command__prompt">
        $
      </span>
      <code className="copy-command__text">{breakAfterSlashes(command)}</code>
      <button type="button" onClick={copy} className="copy-command__button">
        {label}
      </button>
      <span role="status" className="sr-only">
        {state === "idle" ? "" : label}
      </span>
    </div>
  );
}
