#!/usr/bin/env sh
set -eu

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is not installed. Install it before starting Expo." >&2
  exit 1
fi

pnpm start