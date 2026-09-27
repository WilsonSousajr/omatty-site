#!/usr/bin/env python3
"""Records the real omatty binary, running real Claude Code, as asciicast v2.

    DEMO_TOKEN_FILE=~/.omatty-demo-token scripts/demo/record.py /tmp/omd public/casts/hero.cast

omatty runs against the scratch HOME that setup.sh built. Claude is the real
`claude`, authenticated by the token `claude setup-token` printed, read from
DEMO_TOKEN_FILE and handed over as CLAUDE_CODE_OAUTH_TOKEN; it never appears
on screen or in the cast.

A real turn takes as long as it takes, so each step in story() waits for an
event instead of a clock. The event is omatty's own: with gate.auto on, the
gate runs when a turn ends, and state.json counts each such run per project
(gate_runs) and each one that passed (gate_first_pass). Every byte omatty writes is
timestamped; idle time is capped by the player, never cut (AGENTS.md,
invariant 4).
"""
import codecs
import fcntl
import json
import os
import pty
import select
import signal
import struct
import subprocess
import sys
import termios
import time

COLS, ROWS = 120, 30
LEADER = b"\x0f"  # ctrl+o
LEDGER = "5d7f2a10-3c1e-4b8a-9f2d-6e1a0c4b7d21"
PARSER = "8b3e6c42-1f9a-4d7e-a5c0-2e9d8f1b6a53"
TURN_TIMEOUT = 300.0

LEDGER_TASK = (
    "Cents(0.29) returns 28 instead of 29. Make Cents round to the nearest "
    "cent and add a test for it. Don't run the tests yourself: the project's "
    "gate runs them when you finish."
)
PARSER_TASK = (
    'Fields should keep a comma inside double quotes as part of the field and '
    'drop the quotes, so a,"b,c",d gives a, b,c and d. Add a test. Don\'t run '
    "the tests yourself: the project's gate runs them when you finish."
)
REVIEW_NOTE = "Handle a doubled quote inside a quoted field too, the way CSV does."


class Take:
    """One recording: the PTY, the event log, and the scratch HOME's state."""

    def __init__(self, home: str):
        self.home, self.events = home, []
        self.pid, self.fd = spawn(home)
        self.start = time.monotonic()

    def pump(self, seconds: float) -> None:
        """Reads output for a while; raises once omatty has exited."""
        deadline = time.monotonic() + seconds
        while (left := deadline - time.monotonic()) > 0:
            ready, _, _ = select.select([self.fd], [], [], left)
            if not ready:
                continue
            chunk = os.read(self.fd, 65536)
            if not chunk:
                raise RuntimeError("omatty exited mid-take")
            self.events.append((time.monotonic() - self.start, chunk))

    def keys(self, data: bytes, settle: float = 0.8) -> None:
        os.write(self.fd, data)
        self.pump(settle)

    def type(self, text: str) -> None:
        """Types like a person, so the prompt is readable as it appears."""
        for ch in text:
            os.write(self.fd, ch.encode())
            self.pump(0.02)
        self.keys(b"\r", 1.0)

    def until(self, what: str, done, timeout: float = TURN_TIMEOUT) -> None:
        deadline = time.monotonic() + timeout
        while not done():
            if time.monotonic() > deadline:
                raise RuntimeError(f"timed out waiting for {what}")
            self.pump(0.5)

    def gate(self, project: str) -> tuple:
        with open(os.path.join(self.home, ".omatty", "state.json")) as f:
            for p in json.load(f)["projects"]:
                if p["name"] == project:
                    return p.get("gate_runs", 0), p.get("gate_first_pass", 0)
        return 0, 0

    def turn(self, project: str, before: tuple) -> bool:
        """Waits for a turn to end and its gate to land; True if it passed."""
        self.until(f"{project} turn", lambda: self.gate(project)[0] > before[0])
        self.pump(3)  # the verdict lands on the card; the column reloads
        return self.gate(project)[1] > before[1]

    def close(self) -> None:
        try:
            self.keys(LEADER + b"q", 3)
        except (RuntimeError, OSError):
            pass  # quitting is omatty exiting, which is the point
        try:
            os.kill(self.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass


def story(t: Take) -> None:
    t.pump(6)  # both claude panes start
    ledger0, parser0 = t.gate("ledger"), t.gate("parser")
    t.type(LEDGER_TASK)  # the ledger session is selected and focused
    t.keys(LEADER + b"j", 1.5)  # to the parser session
    t.type(PARSER_TASK)
    t.keys(LEADER + b"k", 1.5)  # back to ledger, working
    t.keys(LEADER + b"f", 2)  # its file tree, before the turn lands

    passed = t.turn("ledger", ledger0)  # the tree marks what changed
    t.keys(LEADER + b"g", 4)  # the gate pane: every step, and its verdict
    if not passed:
        t.keys(b"S", 2)  # send the failure back
        t.turn("ledger", t.gate("ledger"))

    t.keys(LEADER + b"j", 2)  # to parser
    t.turn("parser", parser0)
    t.keys(LEADER + b"d", 3)  # the diff
    t.keys(b"j" * 20, 1.5)  # down to where the scanner meets a quote
    t.keys(b"c", 0.8)
    for ch in REVIEW_NOTE:
        t.keys(ch.encode(), 0.02)
    t.keys(b"\r", 2)
    before = t.gate("parser")
    t.keys(b"S", 2)  # the comment goes back as one message
    t.turn("parser", before)
    t.pump(5)  # the diff reloads; the comment stays on its line
    t.keys(LEADER + b"j", 3)  # the ledger card, green beside it


def token() -> str:
    path = os.path.expanduser(os.environ.get("DEMO_TOKEN_FILE", "~/.omatty-demo-token"))
    with open(path) as f:
        return f.read().strip()


def demo_env(home: str) -> dict:
    go_env = lambda k: subprocess.check_output(["go", "env", k], text=True).strip()
    return {
        "HOME": home,
        "PATH": os.environ["PATH"],
        "TERM": "xterm-256color",
        "LANG": "en_US.UTF-8",
        "CLAUDE_CODE_OAUTH_TOKEN": token(),
        # The scratch HOME would otherwise mean a cold build cache on every run.
        "GOCACHE": go_env("GOCACHE"),
        "GOMODCACHE": go_env("GOMODCACHE"),
        "GOPATH": go_env("GOPATH"),
    }


def spawn(home: str):
    env = demo_env(home)
    pid, fd = pty.fork()
    if pid == 0:
        os.execvpe("omatty", ["omatty"], env)
    fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", ROWS, COLS, 0, 0))
    return pid, fd


def write_cast(events: list, path: str) -> None:
    decoder = codecs.getincrementaldecoder("utf-8")("replace")
    header = {"version": 2, "width": COLS, "height": ROWS, "idle_time_limit": 1.5,
              "env": {"TERM": "xterm-256color"}, "title": "omatty"}
    with open(path, "w") as out:
        out.write(json.dumps(header) + "\n")
        for t, chunk in events:
            text = decoder.decode(chunk)
            if text:
                out.write(json.dumps([round(t, 4), "o", text]) + "\n")


def main() -> None:
    home, cast = sys.argv[1], sys.argv[2]
    # A killed take still writes what it recorded, so it can be read.
    signal.signal(signal.SIGTERM, lambda *_: sys.exit(1))
    take = Take(home)
    try:
        story(take)
    except Exception as err:  # still write what was recorded, to read it
        print(f"story stopped: {err}", file=sys.stderr)
    finally:
        take.close()
        write_cast(take.events, cast)
        with open(cast + ".raw", "wb") as raw:
            raw.write(b"".join(c for _, c in take.events))
        with open(cast + ".times", "w") as times:
            offset = 0
            for t, chunk in take.events:
                offset += len(chunk)
                times.write(f"{t:.3f} {offset}\n")
    print(f"{len(take.events)} events, {take.events[-1][0]:.1f}s -> {cast}")


if __name__ == "__main__":
    main()
