/**
 * Every English string on the page. Its shape is the Dictionary type, and
 * pt.ts must satisfy it, so a key added here and not translated fails tsc
 * (AGENTS.md, invariant 5). "{version}" is filled from lib/site.ts.
 */
export const en = {
  meta: {
    title: "omatty — know which agent got it right",
    description:
      "A terminal ADE for parallel Claude Code sessions that runs your project's own check line in each session's worktree and puts the verdict on its card.",
  },
  nav: {
    home: "omatty, home",
    github: "GitHub",
    language: "Language",
  },
  copy: {
    copy: "Copy",
    copied: "Copied",
    failed: "Select and copy",
  },
  hero: {
    headline: "Run agents in parallel. Know which ones got it right.",
    lead: "A terminal ADE for parallel Claude Code sessions, across every repository you work in.",
    claim:
      "omatty runs your project's own check line inside each session's worktree and puts the verdict on the session's card.",
    source: "Read the source",
    recording: "A real omatty session",
    caption:
      "Real omatty v{version} running a real gate on two Go repositories: one session's tests fail, the failure goes back, and the fix goes green. The agent in each session is a scripted stand-in, so the recording is the same every time.",
    status: "v{version}, pre-1.0, for macOS and Linux.",
  },
};

export type Dictionary = typeof en;
