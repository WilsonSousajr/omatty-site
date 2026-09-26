#!/usr/bin/env bash
# Records public/casts/hero.cast and its text poster from scratch.
#
#   OMATTY_REPO=~/src/omatty scripts/demo/make-hero.sh
#
# Needs omatty, go and python3 on PATH, and a checkout of omatty for its
# testdata/screen emulator, which renders the poster frame from the cast.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
site="$(cd "$here/../.." && pwd)"
repo="${OMATTY_REPO:?set OMATTY_REPO to a checkout of github.com/WilsonSousajr/omatty}"
home=/tmp/omd
cast="$site/public/casts/hero.cast"
poster_at=17 # both verdicts on screen, and the failure in the gate pane

"$here/setup.sh" "$home"
mkdir -p "$(dirname "$cast")"
python3 "$here/record.py" "$home" "$cast"
pkill -f "$home" || true # dtach may still hold the demo sessions

# A cast is whatever the terminal showed. Refuse one that shows this machine.
if grep -qE "/Users/|/home/|$(whoami)" "$cast"; then
  echo "refusing: $cast contains a local path or user name" >&2
  exit 1
fi

off=$(awk -v t="$poster_at" '$1 <= t { o = $2 } END { print o + 0 }' "$cast.times")
head -c "$off" "$cast.raw" | perl -pe 's/\e\[\?1049[hl]//g' > "$cast.frame"
(cd "$repo" && go run ./testdata/screen "$cast.frame" 120 30) |
  sed -e 's/|$//' -e 's/[[:space:]]*$//' > "${cast%.cast}.txt"
rm -f "$cast.raw" "$cast.times" "$cast.frame"
echo "poster at ${poster_at}s -> ${cast%.cast}.txt"
