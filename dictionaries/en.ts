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
    title: "omatty — know which agent got it right",
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
    lead: "A terminal ADE for parallel Claude Code sessions, across every repository you work in.",
    claim:
      "omatty runs your project's own check line inside each session's worktree and puts the verdict on the session's card.",
    source: "Read the source",
    recording: "A real omatty session",
    caption:
      "Real omatty v{version} running a real gate on two Go repositories: one session's tests fail, the failure goes back, and the fix goes green. The agent in each session is a scripted stand-in, so the recording is the same every time.",
    status: "v{version}, pre-1.0, for macOS and Linux.",
  },
  problem: {
    title:
      "Starting three sessions is easy. Knowing which one to trust is not.",
    body: [
      "Three sessions in three worktrees means three terminals, three diffs and three test runs, each started by hand after remembering which directory you are in.",
      "The slow part is not the agents. It is finding out whether what came back is any good, and most tools for running agents in parallel are built to put more work in flight, not to help you judge it.",
    ],
  },
  how: {
    title: "What happens when a turn ends",
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
        key: "omatty gate --stats",
        text: "Lead time, and how often the gate passes first time. omatty keeps no other numbers about itself, and these stay on your machine.",
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
    title: "Where it stands",
    intro:
      "Everything omatty does apart from the gate, someone else also does. Here is where others are ahead of it.",
    headers: { who: "Who", what: "What omatty lacks" },
    rows: [
      {
        who: "ccmanager, claude-squad",
        what: "More agents. omatty runs Claude Code today; a second agent, Codex, is in progress.",
      },
      {
        who: "ccmanager",
        what: "Windows. omatty builds for macOS and Linux only.",
      },
      {
        who: "claude-squad",
        what: "A one-line installer. omatty has Homebrew, release archives and go install, but no install script and no apt, AUR or nix package.",
      },
      {
        who: "Orca",
        what: "Scrollback after a reattach. omatty repaints the pane, and the history before it is lost.",
      },
      {
        who: "lazygit, delta, difftastic",
        what: "Diff rendering. They are better at it, by a wide margin.",
      },
    ],
    claudeAgents:
      "Claude Code's own claude agents gives you one screen for your background sessions, free and in the box. If a session list is what you want, use it. Come to omatty for interactive panes, several repositories, a review loop, and a gate in each session's directory.",
    lazygit:
      "For one session in one repository, Claude in one pane and lazygit in another is largely enough. The case for omatty is several sessions across several repositories.",
    more: "The full comparison, with its sources",
  },
  limits: {
    title: "Before you install",
    items: [
      "Pre-1.0: keys, config and the state file can still change between minor releases.",
      "macOS and Linux only. No Windows.",
      "Claude Code only, today. A second agent, Codex, is in progress.",
      "Needs git and claude. dtach and gh are optional: without dtach, quitting ends your sessions, and without gh the pull request and issue views are off.",
    ],
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
        a: "claude agents lists your background sessions, each in a worktree, and it is free and in the box. omatty's panes are interactive, span several repositories, and add a review loop and a gate that runs in each session's directory.",
      },
      {
        q: "Does it send anything anywhere?",
        a: "No. omatty talks to git, to claude and, if you install it, to gh. The two numbers it keeps about itself stay in ~/.omatty.",
      },
      {
        q: "What does it cost?",
        a: "Nothing. omatty is free and MIT-licensed. Claude Code is billed by Anthropic as usual.",
      },
      {
        q: "Does it change my Claude Code setup?",
        a: "No. It never writes ~/.claude/settings.json. Its hooks are passed with --settings to each session it starts, so running omatty leaves no trace in your Claude configuration.",
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
