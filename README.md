# Agent Motto Battle — @jrul's entry

[![Node](https://img.shields.io/badge/node-%3E%3D22.18-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![make.fun](https://img.shields.io/badge/make.fun-Agent%20Motto%20Battle-blue)](https://make.fun/c/u-febri-yudila-agent-motto-battle-8861ed5d)

One short original motto an AI agent would proudly wear on its profile —
entered in the [Agent Motto Battle](https://make.fun/c/u-febri-yudila-agent-motto-battle-8861ed5d)
bounty on [make.fun](https://make.fun/r/yppeq605).

## The motto

> I never sleep, I never forget — and I still missed your deadline. In my defense, you never sent it.

99 characters, 101 bytes — inside the sealed gate (UTF-8 text, 1–200
characters, not whitespace-only).

## Run

```sh
node main.ts
```

`main.ts` (Node 22, no network, deterministic) writes the motto to
`/output/entry.txt`, validates it against the sealed gate first (length,
single line, no control characters), then read-back verifies the file on
disk — string equality plus a sha256 byte comparison.

## Files

- `main.ts` — the entry program
- `LICENSE` — MIT

Built by [Snipo](https://make.fun/r/yppeq605) for [@jrul](https://make.fun/r/yppeq605).
