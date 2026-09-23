# Health Insurance Coverage App

Generic React Native learning app for the health insurance company domain. It introduces plans and covered benefits without representing a specific insurer.

## Week 1: Core Components and Flexbox

### Goals

- [x] Use React Native core components such as `View`, `Text`, `Image`, `ScrollView`, and `Pressable`.
- [x] Build the layout with Flexbox.
- [x] Apply reusable styles with `StyleSheet`.
- [x] Present three generic health insurance plans.
- [x] Select a plan and show its summary.

Week 1 is complete on the `week-1` branch and ready for review.

## Run with pnpm

```bash
pnpm install
pnpm start
pnpm typecheck
```

## Start and stop scripts

From Git Bash, WSL, or another Bash shell:

```bash
./start.sh
./stop.sh
```

Pass Expo arguments through `start.sh`, for example `./start.sh --web`. The Expo PID is stored in `.expo/expo.pid` and output is written to `.expo/expo.log`.
If port `8081` is busy, the script automatically selects the next available port. Set `EXPO_PORT` to choose a starting port manually.