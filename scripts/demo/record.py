#!/usr/bin/env python3
"""Records the real omatty binary in a real PTY as an asciicast v2 file.

    scripts/demo/record.py /tmp/omd public/casts/hero.cast

omatty runs against the scratch HOME that setup.sh built. Keys are sent on a
fixed schedule (KEYS below), every byte omatty writes is timestamped, and the
result plays in asciinema-player. Nothing in the cast is edited afterwards
(AGENTS.md, invariant 4); idle time is capped by the player, not by cutting.
"""
import fcntl
import json
import os
import pty
import select
import shutil
import signal
import struct
import subprocess
import sys
import termios
import time

COLS, ROWS = 120, 30
LEADER = b"\x0f"  # ctrl+o

# (seconds after start, keys). Tuned by reading frames with testdata/screen.
KEYS = [
    (13.0, LEADER + b"]"),  # to the parser project, whose card has gone red
    (15.0, LEADER + b"g"),  # the gate pane: which step failed, and why
    (18.0, b"S"),  # send the failures back into the session
    (29.0, LEADER + b"d"),  # the diff the green verdict is about
]
END_AT = 34.0


def demo_env(home: str) -> dict:
    here = os.path.dirname(os.path.abspath(__file__))
    go_env = lambda k: subprocess.check_output(["go", "env", k], text=True).strip()
    return {
        "HOME": home,
        "PATH": os.environ["PATH"],
        "TERM": "xterm-256color",
        "LANG": "en_US.UTF-8",
        # The scratch HOME would otherwise mean a cold build cache on every run.
        "GOCACHE": go_env("GOCACHE"),
        "GOMODCACHE": go_env("GOMODCACHE"),
        "GOPATH": go_env("GOPATH"),
        "DEMO_PATCHES": os.path.join(here, "patches"),
    }


def spawn(home: str):
    pid, fd = pty.fork()
    if pid == 0:
        os.execvpe("omatty", ["omatty"], demo_env(home))
    fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", ROWS, COLS, 0, 0))
    return pid, fd


def pump(fd: int, deadline: float, start: float, events: list) -> bool:
    """Reads output until the deadline; False once omatty has exited."""
    while (left := deadline - time.monotonic()) > 0:
        ready, _, _ = select.select([fd], [], [], left)
        if not ready:
            continue
        try:
            chunk = os.read(fd, 65536)
        except OSError:
            return False
        if not chunk:
            return False
        events.append((time.monotonic() - start, chunk))
    return True


def record(home: str) -> list:
    pid, fd = spawn(home)
    start, events = time.monotonic(), []
    for at, keys in KEYS + [(END_AT, LEADER + b"q")]:
        if not pump(fd, start + at, start, events):
            break
        os.write(fd, keys)
    pump(fd, time.monotonic() + 3, start, events)
    try:
        os.kill(pid, signal.SIGKILL)
    except ProcessLookupError:
        pass
    return events


def write_cast(events: list, path: str) -> None:
    decoder = __import__("codecs").getincrementaldecoder("utf-8")("replace")
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
    events = record(home)
    write_cast(events, cast)
    with open(cast + ".raw", "wb") as raw:
        raw.write(b"".join(c for _, c in events))
    with open(cast + ".times", "w") as times:
        offset = 0
        for t, chunk in events:
            offset += len(chunk)
            times.write(f"{t:.3f} {offset}\n")
    print(f"{len(events)} events, {events[-1][0]:.1f}s -> {cast}")


if __name__ == "__main__":
    main()
