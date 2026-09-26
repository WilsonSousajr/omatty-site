/**
 * Every English string on the page. Its shape is the Dictionary type, and
 * pt.ts must satisfy it, so a key added here and not translated fails tsc
 * (AGENTS.md, invariant 5).
 */
export const en = {
  meta: {
    title: "omatty — know which agent got it right",
    description:
      "A terminal ADE for parallel Claude Code sessions that runs your project's own check line in each session's worktree and puts the verdict on its card.",
  },
  hero: {
    headline: "Run agents in parallel. Know which ones got it right.",
  },
};

export type Dictionary = typeof en;
