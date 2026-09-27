/**
 * Every English string on the page. Its shape is the Dictionary type, and
 * pt.ts must satisfy it, so a key added here and not translated fails tsc
 * (AGENTS.md, invariant 5). "{version}" is filled from lib/site.ts.
 *
 * Every claim here traces to omatty's README, docs/comparison.md or
 * CHANGELOG.md (invariant 1), and tests/claims.test.ts refuses the ones
 * omatty has had to retract (invariant 2).
 */
export const en = {
  meta: {
    title: "omatty: know which agent got it right",
    description:
      "A terminal ADE for parallel Claude Code sessions that runs your project's own check line in each session's worktree and puts the verdict on its card.",
  },
  nav: {
    home: "omatty, home",
    sections: "Sections",
    how: "How it works",
    compare: "Compare",
    faq: "FAQ",
    github: "GitHub",
    install: "Install",
    language: "Language",
  },
  copy: {
    copy: "Copy",
    copied: "Copied",
    failed: "Select and copy",
  },
  hero: {
    headline: "Run agents in parallel. Know which ones got it right.",
    lead: "Starting parallel Claude Code sessions takes seconds. Checking their work is the bottleneck, and this terminal ADE is built for it.",
    claim:
      "omatty runs your project's own check line inside each session's worktree and puts the verdict on the session's card.",
    source: "Read the source",
    recording: "A real omatty session",
    caption:
      "Real omatty v{version} running a real gate on two Go repositories: one session's tests fail, the failure goes back, and the fix goes green. The agent in each session is a scripted stand-in, so the recording is the same every time.",
    status:
      "v{version}, pre-1.0. For macOS and Linux, with git and Claude Code.",
  },
  problem: {
    title: "Five agents say they're done. Which ones are?",
    body: [
      "You already run Claude Code in parallel: a session per task, a worktree per session, often across more than one repository. Starting them takes seconds.",
      "Then each one ends its turn and says the work is finished. Whether it ran your linter and your whole test suite, in its own worktree, against its own changes, you cannot tell from the summary.",
    ],
  },
  implication: {
    title: "Every unchecked session lands on you",
    items: [
      {
        title: "You become the test runner",
        body: "Three worktrees means changing directory, running the suite and reading the output three times, and again after the next turn.",
      },
      {
        title: "Failures surface late",
        body: "What you do not check locally, CI finds minutes after the push, or a reviewer finds after that. By then the session has moved on.",
      },
      {
        title: "Every correction is retyped",
        body: "Telling a session what broke means copying output, switching panes and explaining it again, while Claude keeps editing the file you are pointing at.",
      },
    ],
  },
  payoff: {
    title: "What if every session checked its own work?",
    body: "Picture each turn ending with your own fmt, lint and test line already run in that session's worktree, the verdict on its card, and the failures one key away from the session that caused them. You would open only the diffs worth reading.",
  },
  how: {
    title: "That is what omatty does when a turn ends",
    steps: [
      {
        title: "Claude works in its own worktree",
        body: "Each session is the real claude binary in a pane you type into, in a directory of its own. Sessions from several repositories sit side by side in one window, and every key goes to Claude except the ctrl+o leader.",
      },
      {
        title: "Your gate runs there",
        body: "The fmt, vet, lint, test and coverage line your project already uses, run in that session's worktree: on one key, or on its own when a turn ends if you turn that on. omatty proposes the line from your repository, and nothing runs until you confirm it.",
      },
      {
        title: "The verdict lands on the card",
        body: "One mark per step, and the name of the first step that did not pass. A step passes when its process exits 0; omatty never reads the output to decide.",
      },
      {
        title: "The failure goes back with one key",
        body: "S sends the failing output into the session that caused it. Read the diff, comment on the lines you disagree with, and send every comment back as one message. Comments anchor to a line's content, not its number, so they stay put while Claude edits the file.",
      },
    ],
  },
  keys: {
    title: "The rest of it, by the key you press",
    intro:
      "Every keystroke goes to Claude except ctrl+o. These are the keys and commands that do the rest.",
    rows: [
      {
        key: "ctrl+o g",
        text: "Open the gate pane and run the gate for the session you are in.",
      },
      {
        key: "ctrl+o d",
        text: "Everything the session changed, syntax-highlighted, with the lines it added that no test covers marked.",
      },
      {
        key: "ctrl+o u",
        text: "Put the session's worktree back to where its last turn began.",
      },
      {
        key: "ctrl+o p",
        text: "Push and open the pull request, or merge it when your gate and the forge's checks are both already green.",
      },
      {
        key: "omatty discover",
        text: "Pick from the repositories Claude Code already knows you use.",
      },
      {
        key: "omatty adopt",
        text: "Bring in the Claude sessions you already have in a repository.",
      },
      {
        key: "ssh -t box omatty",
        text: "It is a terminal program, so it works over SSH on a headless machine. With dtach installed, quitting detaches instead of ending your sessions.",
      },
      {
        key: "omatty gate",
        text: "Shows a project's gate, or proposes one from the repository and runs nothing until you confirm. It also reports lead time and how often the gate passes first time, and those numbers never leave your machine.",
      },
    ],
    footprint:
      "It never writes your ~/.claude/settings.json. Hooks are passed to each session it starts, and status comes from those hooks and Claude's transcripts, never from reading the screen.",
  },
  wontDo: {
    title: "What it will not do",
    body: "omatty does not delegate, plan, schedule or decide for you. There is no coordinator, no agent-to-agent messaging, no unattended queue and no cloud. You stay the part of the loop that catches things; omatty's job is to get you there sooner.",
    link: "Why, feature by feature",
  },
  compare: {
    title: "Built to judge the work, not just to run it",
    intro:
      "Most tools for parallel agents are built to put more work in flight. omatty is built for what comes after: finding out which of it is good.",
    headers: {
      feature: "What you need",
      omatty: "omatty",
      herdr: "herdr",
      herdrExamples: "with herdr-reviewr",
      orca: "Orca",
      orcaExamples: "desktop app",
      claudeAgents: "claude agents",
      claudeAgentsExamples: "built into Claude Code",
    },
    yes: "Yes",
    no: "No",
    rows: [
      {
        feature:
          "Your own check line runs in each session's worktree, a verdict per step on its card",
        id: "gate" as const,
      },
      {
        feature: "Your gate's failures go back to the session with one key",
        id: "sendBack" as const,
      },
      {
        feature: "Review comments stay on the right line while Claude edits",
        id: "anchor" as const,
      },
    ],
    asOf: "As of 27 September 2026. Every cell is sourced in the full comparison.",
    more: "Read the full comparison",
  },
  faq: {
    title: "Questions",
    items: [
      {
        q: "What is a terminal ADE?",
        a: "An agent development environment that lives in your terminal: the agents run in panes, and the tools for judging their work (the diff, the review, the gate) sit around them. omatty runs the real claude binary; it does not reimplement Claude's interface.",
      },
      {
        q: "How is this different from claude agents?",
        a: "claude agents lists your background sessions across all your projects, each in a worktree, shows each pull request's checks, and it is free and in the box. omatty puts several live sessions side by side, adds a review loop, and runs your own check line in each session's directory before anything is pushed.",
      },
      {
        q: "How is this different from herdr?",
        a: "herdr is a terminal workspace for many kinds of agent, and it is ahead of omatty on breadth: more agents, more operating systems, and several machines in one window. omatty is narrower. It reads Claude's status from hooks and transcripts rather than the screen, never writes your Claude settings, keeps review comments on the right line while Claude edits, and runs your gate on every session.",
      },
      {
        q: "Does it send anything anywhere?",
        a: "No. omatty talks to git, to claude and, if you install it, to gh. The two numbers it keeps about itself stay in ~/.omatty.",
      },
      {
        q: "What do I need to run it?",
        a: "macOS or Linux (no Windows yet), git and Claude Code. dtach is optional and keeps your sessions running when you quit; gh is optional and turns on pull requests and issues. omatty is pre-1.0, so keys and config can still change between minor releases.",
      },
      {
        q: "Which agents does it run?",
        a: "Claude Code, as the real claude binary. Other agents are not supported yet.",
      },
      {
        q: "What does it cost?",
        a: "Nothing. omatty is free and MIT-licensed. Claude Code is billed by Anthropic as usual.",
      },
      {
        q: "Does it change my Claude Code setup?",
        a: "No. It never writes ~/.claude/settings.json. Its hooks are handed to each session it starts, on that session's command line, so running omatty leaves no trace in your Claude configuration.",
      },
      {
        q: "What if my project has no gate yet?",
        a: "omatty gate <project> reads the repository and proposes the line it already uses: gofmt, go vet and go test; cargo fmt, clippy and test; ruff and pytest; or the lint and test scripts in package.json. Nothing is written or run until you confirm it.",
      },
      {
        q: "How do I install it without Homebrew?",
        a: "Download a release archive for macOS or Linux (amd64 or arm64) and check it against checksums.txt, or build it with go install github.com/WilsonSousajr/omatty/cmd/omatty@latest.",
      },
    ],
  },
  closing: {
    title: "Run it, and tell us what broke.",
    body: "omatty is young, and the fastest way it gets better is someone other than its author using it. Install it, point it at a repository you work in, and open an issue for anything that surprised you.",
    issue: "Open an issue",
  },
  footer: {
    tagline: "A terminal ADE for parallel Claude Code sessions.",
    changelog: "Changelog",
    comparison: "Comparison",
    roadmap: "Roadmap",
    license: "MIT license",
  },
};

export type Dictionary = typeof en;
