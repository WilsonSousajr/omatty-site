#!/usr/bin/env bash
# The full local gate. .github/workflows/ci.yml runs the same steps in the
# same order, and tests/gate-parity.test.ts fails if the two lists differ.
set -euo pipefail
cd "$(dirname "$0")/.."

STEPS=(format lint types deps vuln boundaries dupl test build smoke budget)

for step in "${STEPS[@]}"; do
  printf '\n== gate:%s\n' "$step"
  if ! npm run --silent "gate:$step"; then
    printf '\nFAIL gate:%s\n' "$step" >&2
    exit 1
  fi
done
printf '\nPASS all %d steps\n' "${#STEPS[@]}"
