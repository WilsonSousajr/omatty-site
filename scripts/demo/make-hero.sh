#!/usr/bin/env bash
# Records public/casts/hero.cast and its text poster from scratch, with the
# real Claude Code in both sessions.
#
#   OMATTY_REPO=~/src/omatty DEMO_TOKEN_FILE=~/.omatty-demo-token scripts/demo/make-hero.sh
#
# Needs omatty, claude, go and python3 on PATH, a token from
# `claude setup-token` in DEMO_TOKEN_FILE, and a checkout of omatty for its
# testdata/screen emulator, which renders the poster frame from the cast.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
site="$(cd "$here/../.." && pwd)"
repo="${OMATTY_REPO:?set OMATTY_REPO to a checkout of github.com/WilsonSousajr/omatty}"
home=/tmp/omd
cast="$site/public/casts/hero.cast"
# The poster frame in the cast's raw time. Hero.tsx's posterAt is the same
# frame on the player's timeline, which caps idle gaps at 1.5s, so the two
# differ; re-derive both from a new take.
poster_at=66 # both cards READY, and the sent comment still on its line

"$here/setup.sh" "$home"
mkdir -p "$(dirname "$cast")"
python3 "$here/record.py" "$home" "$cast"
pkill -f "$home" || true # dtach may still hold the demo sessions

# A cast is whatever the terminal showed. Refuse one that shows this machine
# or a credential: a token, if claude ever printed it, would be public.
if grep -qE "/Users/|/home/|$(whoami)|sk-ant-" "$cast"; then
  echo "refusing: $cast contains a local path, user name or token" >&2
  exit 1
fi

off=$(awk -v t="$poster_at" '$1 <= t { o = $2 } END { print o + 0 }' "$cast.times")
head -c "$off" "$cast.raw" | perl -pe 's/\e\[\?1049[hl]//g' > "$cast.frame"
(cd "$repo" && go run ./testdata/screen "$cast.frame" 120 30) |
  sed -e 's/|$//' -e 's/[[:space:]]*$//' > "${cast%.cast}.txt"
rm -f "$cast.raw" "$cast.times" "$cast.frame"
echo "poster at ${poster_at}s -> ${cast%.cast}.txt"
