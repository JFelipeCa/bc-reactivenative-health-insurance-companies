#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
RUNTIME_DIR="$ROOT_DIR/.expo"
PID_FILE="$RUNTIME_DIR/expo.pid"
LOG_FILE="$RUNTIME_DIR/expo.log"

cd "$ROOT_DIR"
mkdir -p "$RUNTIME_DIR"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Error: pnpm is required. Install it before running this script."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies with pnpm..."
  pnpm install
fi

if [ -f "$PID_FILE" ]; then
  existing_pid="$(cat "$PID_FILE")"
  if kill -0 "$existing_pid" 2>/dev/null; then
    echo "Expo is already running with PID $existing_pid."
    echo "Log: $LOG_FILE"
    exit 0
  fi
  rm -f "$PID_FILE"
fi

echo "Starting Expo..."
nohup pnpm exec expo start "$@" >"$LOG_FILE" 2>&1 &
expo_pid=$!
echo "$expo_pid" > "$PID_FILE"

echo "Expo started with PID $expo_pid."
echo "Log: $LOG_FILE"
echo "Stop it with: ./stop.sh"