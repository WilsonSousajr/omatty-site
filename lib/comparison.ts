/**
 * The comparison's facts, in one place for both languages: which kind of tool
 * does each thing. Every value is sourced in omatty's docs/comparison.md
 * (captured 2026-09-18) or docs/announcement.md; a cell that could not be
 * sourced for every column is not a row. The dictionaries only name the rows.
 *
 *   verdicts.gate.terminal === false
 */
export const tools = ["omatty", "terminal", "desktop", "claudeAgents"] as const;

export type Tool = (typeof tools)[number];

export type RowId = "gate" | "sendBack" | "review" | "ssh";

export const verdicts: Record<RowId, Record<Tool, boolean>> = {
  // comparison.md: "no other tool in this space does this - not the terminal
  // managers, not the desktop apps"; announcement.md: claude agents does not
  // run the project's verification in each session's directory.
  gate: { omatty: true, terminal: false, desktop: false, claudeAgents: false },
  sendBack: {
    omatty: true,
    terminal: false,
    desktop: false,
    claudeAgents: false,
  },
  // "none of them has a review loop that sends comments back" (terminal
  // managers); Orca annotates AI diffs; claude agents has no review loop.
  review: { omatty: true, terminal: false, desktop: true, claudeAgents: false },
  // Desktop apps: "Not reachable over SSH on a headless box".
  ssh: { omatty: true, terminal: true, desktop: false, claudeAgents: true },
};
