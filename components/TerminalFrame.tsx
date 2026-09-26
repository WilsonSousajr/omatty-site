import type { ReactNode } from "react";

/**
 * A rounded frame with its title set into the top border, the way omatty
 * draws a pane. It frames real terminal output only (invariant 4).
 *
 *   <TerminalFrame title="omatty"><CastPlayer … /></TerminalFrame>
 */
export function TerminalFrame({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <figure aria-label={title} className="terminal-frame">
      <figcaption className="terminal-frame__title">{title}</figcaption>
      <div className="terminal-frame__screen">{children}</div>
    </figure>
  );
}
