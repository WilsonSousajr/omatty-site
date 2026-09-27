# The hero recording

`public/casts/hero.cast` is the real omatty binary running the real Claude
Code, recorded in a real PTY. Everything on screen is real: the two Claude
sessions and their work, the file tree and its change marks, the gate and its
verdicts, the diff, and the review comment Claude acts on. What is scripted is
the keys omatty is sent and the two prompts typed into Claude. The caption
under the recording says so (omatty#556).

A real turn takes as long as it takes, so the recording is never the same
twice, and each take spends real Claude turns (about four).

## Make it

```bash
claude setup-token                       # once; save the token it prints:
pbpaste > ~/.omatty-demo-token && chmod 600 ~/.omatty-demo-token
OMATTY_REPO=~/src/omatty DEMO_TOKEN_FILE=~/.omatty-demo-token scripts/demo/make-hero.sh
```

This needs `omatty`, `claude`, `go` and `python3` on `PATH`. Record with a
released omatty binary, so the version it shows is a real one. `OMATTY_REPO`
is a checkout of omatty, used for `testdata/screen`, which renders the text
poster (`public/casts/hero.txt`) from the cast. The script:

1. `setup.sh /tmp/omd` builds a scratch `HOME`: two Go repositories
   (`repos/`), each with `claude-settings.json` committed as its
   `.claude/settings.json` so edits and `go` commands need no approval; a
   worktree session in each; a confirmed gate per project; `gate.auto` on;
   and Claude's first-run screens answered in `.claude.json`.
2. `record.py` runs omatty at 120×30 and plays `story()`. Each step waits for
   an event rather than a clock: with `gate.auto` on the gate runs when a turn
   ends, and `state.json` counts those runs per project. The token reaches
   Claude as `CLAUDE_CODE_OAUTH_TOKEN` and never the screen.
3. It refuses the cast if it contains a local path, your user name or a token
   (AGENTS.md, "Security considerations").
4. It renders the frame at `poster_at` seconds as the text poster.

Then read the cast yourself before committing it: a real Claude session prints
whatever it prints.

## Change it

- **What happens:** `story()`, `LEDGER_TASK`, `PARSER_TASK` and `REVIEW_NOTE`
  in `record.py`.
- **The poster frame:** `poster_at` in `make-hero.sh` is raw cast time;
  `posterAt` in `components/Hero.tsx` is the same frame on the player's
  timeline, where idle gaps are capped at 1.5 s. Re-derive both from a new take.

Never edit a cast by hand (AGENTS.md, invariant 4). Re-record it. Revoke the
token in your Claude account when you are done recording.
