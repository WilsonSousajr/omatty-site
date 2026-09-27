/**
 * The comparison's facts, in one place for both languages: which tool does
 * each thing. Every value is sourced in omatty's docs/comparison.md and
 * docs/research/ (refreshed 2026-09-27); a cell that could not be sourced for
 * every column is not a row. Columns are named tools, not camps, because a
 * camp's cell claims something about tools nobody read (omatty#515). The
 * dictionaries only name the rows.
 *
 *   verdicts.gate.herdr === false
 */
export const tools = ["omatty", "herdr", "orca", "claudeAgents"] as const;

export type Tool = (typeof tools)[number];

export type RowId = "gate" | "sendBack" | "anchor";

export const verdicts: Record<RowId, Record<Tool, boolean>> = {
  // 2026-landscape.md §7.4: herdr's core and Orca run no local gate; their
  // verdicts are the forge's CI, as is agent view's (§7.5).
  gate: { omatty: true, herdr: false, orca: false, claudeAgents: false },
  // Orca's "Fix broken checks" sends CI failures, not a gate's: it has none.
  sendBack: {
    omatty: true,
    herdr: false,
    orca: false,
    claudeAgents: false,
  },
  // herdr.md §6: herdr-reviewr anchors by line number ("No line-number
  // rebasing"); orca.md: Orca anchors by lineNumber; agent view has no review
  // loop. omatty: internal/review/anchor.go, invariant 7.
  anchor: { omatty: true, herdr: false, orca: false, claudeAgents: false },
};
