#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="$ROOT_DIR/.expo/expo.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "Expo is not running according to $PID_FILE."
  exit 0
fi

expo_pid="$(cat "$PID_FILE")"
if kill -0 "$expo_pid" 2>/dev/null; then
  kill "$expo_pid"
  echo "Stopped Expo process $expo_pid."
else
  echo "Expo process $expo_pid is no longer running."
fi

rm -f "$PID_FILE"