# The hero recording

`public/casts/hero.cast` is the real omatty binary, recorded in a real PTY.
Everything on screen that belongs to omatty is real: the cards, the gate, its
verdicts, the failure it sends back, and the diff. The `go vet` and
`go test` runs are real too.

The agent in each session is **not** Claude. It is `stand-in-agent`, a
scripted stand-in that edits the worktree from `patches/` and reports its
turns through `omatty hook`, the same way claude does. Its first line on screen
says so, and so does the caption under the recording. A scripted agent makes
the recording the same every time and costs nothing to redo.

## Make it

```bash
OMATTY_REPO=~/src/omatty scripts/demo/make-hero.sh
```

This needs `omatty`, `go` and `python3` on `PATH`. `OMATTY_REPO` is a checkout
of omatty, used for `testdata/screen`, which renders the text poster
(`public/casts/hero.txt`) from the cast. The script:

1. `setup.sh /tmp/omd` builds a scratch `HOME`: two Go repositories (`repos/`),
   a worktree session in each, a confirmed gate per project, and a config
   that turns on `gate.auto` and starts the stand-in as `claude_bin`.
2. `record.py` runs omatty at 120×30, presses the keys in its `KEYS` schedule,
   and writes asciicast v2 with a timestamp on every byte.
3. It refuses the cast if it contains a local path or your user name
   (AGENTS.md, "Security considerations").
4. It renders the frame at `poster_at` seconds as the text poster.

## Change it

- **What happens:** `stand-in-agent` and `patches/<branch>/<step>/`.
  `patches/quoted-fields/1` is the attempt whose test fails;
  `patches/quoted-fields/2` is the fix.
- **When keys are pressed:** `KEYS` in `record.py`.
- **The poster frame:** `poster_at` in `make-hero.sh`, and `posterAt` in
  `components/Hero.tsx`. The two must agree.

Never edit a cast by hand (AGENTS.md, invariant 4). Re-record it.

## Recording with the real Claude Code

The same scratch `HOME` works with real `claude`: drop `claude_bin` from
`/tmp/omd/.omatty/config.toml`, run `HOME=/tmp/omd omatty`, and record with
`asciinema rec`. That recording costs a real turn per session, and it will be
different every time. Read it for paths and prompts before committing it.
