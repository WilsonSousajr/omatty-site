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
    title: "omatty: an engineering workspace for Claude Code, in your terminal",
    description:
      "Parallel Claude Code sessions in live panes, with the file tree, the diff and your own checks beside each one, and your issues and pull requests in the same window. All in your terminal.",
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
    headline: "A real engineering workspace for Claude Code. In your terminal.",
    lead: "Parallel Claude Code sessions in live panes, with the file tree, the diff and your own checks right beside them. Built for engineers who read the code before they ship it.",
    claim:
      "omatty runs your project's own check line inside each session's worktree and puts the verdict on the session's card.",
    source: "Read the source",
    recording: "A real omatty session",
    caption:
      "Real omatty v{version} and real Claude Code, in two Go repositories: both sessions work at once, the file tree marks what changed, the gate lands on each card, and a review comment goes back and stays on its line while Claude edits. The keys and the two prompts are scripted; the rest is not. Long waits are shortened in playback.",
    status:
      "v{version}, pre-1.0. For macOS and Linux, with git and Claude Code.",
  },
  problem: {
    title: "Your agents are in one place. Your engineering is everywhere else.",
    body: [
      "You already run Claude Code in parallel: a session per task, a worktree per session, often across more than one repository. Starting them takes seconds.",
      "Everything you need to judge their work lives somewhere else: panes in tmux, files in an editor, the diff in a git client, the tests in one more terminal per worktree, the pull request in a browser tab. The agents are fast. You are the one switching between all of it.",
    ],
  },
  implication: {
    title: "What the switching costs you",
    items: [
      {
        title: "You lose the thread",
        body: "Which worktree is this file in, and which session changed it? With four sessions running, every look starts with finding the right window.",
      },
      {
        title: "You become the test runner",
        body: "Three worktrees means changing directory, running the suite and reading the output three times, and again after the next turn.",
      },
      {
        title: "Every correction is retyped",
        body: "Telling a session what broke means copying output, switching panes and explaining it again, while Claude keeps editing the file you are pointing at.",
      },
    ],
  },
  payoff: {
    title: "What if the whole loop lived in one window?",
    body: "Picture every session in a live pane, its files and its diff beside it, your own checks already run on its latest turn, and the failures one key away from the session that caused them. Nothing to switch to, and nothing that leaves your terminal.",
  },
  how: {
    title: "One window, the whole engineering loop",
    steps: [
      {
        title: "Claude works in live panes",
        body: "Each session is the real claude binary in a pane you type into, in a worktree of its own, with sessions from several repositories side by side. The sidebar tells you which one is working, which is waiting for you and which is done, read from Claude's own hooks, never from the screen.",
      },
      {
        title: "The file tree follows each session",
        body: "ctrl+o f shows the worktree of the session you are on and moves with you to the next one. When Claude finishes a turn, the tree lists itself again and marks every file Claude added, changed or deleted, so you open the ones that matter. If Claude moves into another worktree of the repository, the tree and the diff follow it there. Mark a file read, and it tells you when it changes again.",
      },
      {
        title: "Read the diff, and answer it",
        body: "Everything the session changed, syntax-highlighted, with the lines no test covers marked. Comment on the lines you disagree with and send every comment back as one message. Comments anchor to a line's content, not its number, so they stay put while Claude edits the file.",
      },
      {
        title: "Your gate runs on every session",
        body: "The fmt, vet, lint, test and coverage line your project already uses, run in that session's worktree on one key, or on its own when a turn ends. One mark per step on the card, and a step passes only when its process exits 0. S sends the failing output back into the session that caused it.",
      },
      {
        title: "Ship it, or take it back",
        body: "ctrl+o p pushes and opens the pull request, or merges it when your gate and the forge's checks are both already green. ctrl+o u puts the worktree back to where the last turn began. ctrl+o i shows the project's issues and pull requests in the same column, whether it lives on GitHub, GitLab, Gitea, Bitbucket or Azure DevOps, and an issue can start a session of its own.",
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
      "It never writes your ~/.claude/settings.json, or any other agent's configuration. Hooks are passed to each session it starts, and status comes from those hooks and Claude's transcripts, never from reading the screen.",
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
        a: "No. omatty talks to git, to claude and to your forge, through the forge's own CLI if you have it installed (gh, glab, tea or az), or its API with a token you already set, which omatty never stores. The two numbers it keeps about itself stay in ~/.omatty.",
      },
      {
        q: "What do I need to run it?",
        a: "macOS or Linux (no Windows yet), git and Claude Code. dtach is optional and keeps your sessions running when you quit. Your forge's CLI, or a token for its API, is optional and turns on pull requests and issues. omatty is pre-1.0, so keys and config can still change between minor releases.",
      },
      {
        q: "Does it work with GitLab, Bitbucket or Azure DevOps?",
        a: "Yes. The pull request on each card, the issues in ctrl+o i and ctrl+o p work on GitHub, GitLab, Gitea, Forgejo and Codeberg, Bitbucket Cloud and Data Center, and Azure DevOps, through the forge's own CLI (gh, glab, tea or az) or its API with a token from your environment. Azure DevOps Server is not read yet. The README's Forges table says which forges a real run has shown.",
      },
      {
        q: "Which agents does it run?",
        a: "Claude Code, as the real claude binary, with everything on this page, and OpenAI's Codex, as the real codex binary, its status and token usage read from its own hooks and rollout. Any other agent runs in a pane too: declare its command in ~/.omatty/config.toml and choose it per session, per project or as the default. For those, omatty shows whether the agent is running and says plainly what it cannot know, rather than guessing. OpenCode, Gemini and others are on the way to the same support.",
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
        a: "Run curl -fsSL https://omatty.com/install.sh | sh. It downloads the release archive for your macOS or Linux machine (amd64 or arm64), refuses it unless it matches checksums.txt, and installs to ~/.local/bin without sudo; with Homebrew present it uses the tap instead. The script is scripts/install.sh in the repository, so you can read it first. Or build it with go install github.com/WilsonSousajr/omatty/cmd/omatty@latest.",
      },
    ],
  },
  closing: {
    title: "Run it, and tell us what broke.",
    body: "omatty is young, and the fastest way it gets better is someone other than its author using it. Install it, point it at a repository you work in, and open an issue for anything that surprised you.",
    issue: "Open an issue",
  },
  footer: {
    tagline: "An engineering workspace for Claude Code, in your terminal.",
    changelog: "Changelog",
    comparison: "Comparison",
    roadmap: "Roadmap",
    license: "MIT license",
  },
};

export type Dictionary = typeof en;
