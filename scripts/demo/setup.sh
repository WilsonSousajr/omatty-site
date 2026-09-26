#!/usr/bin/env bash
# Builds the throwaway world the hero recording is made in: a scratch HOME
# with two real Go repositories, a worktree session in each, a confirmed gate
# per project, and omatty configured to start the stand-in agent.
#
#   scripts/demo/setup.sh /tmp/omd
#
# The HOME path must be short: omatty's socket lives at $HOME/.omatty/sock and
# a unix socket path is limited to about 104 bytes.
set -euo pipefail
H="${1:?usage: setup.sh <scratch-home>}"
here="$(cd "$(dirname "$0")" && pwd)"
[[ "$H" == /tmp/* ]] || { echo "refusing: $H is not under /tmp" >&2; exit 1; }
rm -rf "$H" && mkdir -p "$H/src" "$H/.omatty/wt"

git_q() { git -c user.name=demo -c user.email=demo@example.com -c init.defaultBranch=main "$@" >/dev/null 2>&1; }

make_repo() { # project branch
  local root="$H/src/$1" wt="$H/.omatty/wt/$1/$2"
  cp -R "$here/repos/$1" "$root"
  git_q -C "$root" init && git_q -C "$root" add -A && git_q -C "$root" commit -m "initial"
  mkdir -p "$(dirname "$wt")" && git_q -C "$root" worktree add -b "$2" "$wt" main
  # Warm the build cache, so the recorded gate runs at the speed it would on
  # a machine that has built the project before.
  (cd "$wt" && go vet ./... && go test ./... >/dev/null)
}

make_repo ledger round-to-cents
make_repo parser quoted-fields

gate='[{"name":"fmt","run":"test -z \"$(gofmt -l .)\""},{"name":"vet","run":"go vet ./..."},{"name":"test","run":"go test ./..."}]'
cat > "$H/.omatty/state.json" <<JSON
{"version":1,
 "projects":[
  {"name":"ledger","root":"$H/src/ledger","gate":$gate},
  {"name":"parser","root":"$H/src/parser","gate":$gate}],
 "sessions":[
  {"id":"5d7f2a10-3c1e-4b8a-9f2d-6e1a0c4b7d21","project":"ledger","title":"round to cents","dir":"$H/.omatty/wt/ledger/round-to-cents","branch":"round-to-cents","base":"main","worktree":true},
  {"id":"8b3e6c42-1f9a-4d7e-a5c0-2e9d8f1b6a53","project":"parser","title":"quoted fields","dir":"$H/.omatty/wt/parser/quoted-fields","branch":"quoted-fields","base":"main","worktree":true}]}
JSON

cat > "$H/.omatty/config.toml" <<TOML
claude_bin = "$here/stand-in-agent"

[gate]
auto = true

[sessions]
lazy_start = false
TOML
echo "demo home ready: $H"
