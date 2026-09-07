# Development & integration workflow

> Canonical / web version: <https://dims-network.github.io/docs/workflow.html>
> Keep this file and `docs/workflow.html` in sync.

**All code lives in one repository: [dims-network/dims](https://github.com/dims-network/dims).**

That includes the dashboard core, every tab, the Python analyses and the
builder. Individual studies live in their own small *case* repositories that
carry only their configuration, their data, and a pinned copy of the core.

| Repo | Role |
|---|---|
| **[dims](https://github.com/dims-network/dims)** | all code; released as versioned tags |
| **case repos** | one study each: `config.json`, `assets/`, a pinned `vendor/dims-core` |
| **[.github](https://github.com/dims-network/.github)** | one copy of every CI job, called by the rest |

## Why this replaced the old model

Until September 2026 the code was spread across five repositories that were
meant to be kept in step by hand, with the template as "one source of truth".
It did not hold, and the failure was measurable: three disjoint git lineages,
four different copies of the frontend between 2136 and 2500 lines, and no
repository containing every feature. One fork carried the only correct wavelet
coherence for months while four others shipped a version that tracked signal
power — because there was no mechanism for a fix to travel.

Propagation is now a **version bump**, not a merge.

## Lifecycle of a change

1. **Open a PR against `dims`.** CI checks syntax, validates `config.json`
   against the shared schema, and guards file sizes.
2. **Merge.** That is the single approval point, as before — but there is now
   only one copy of the code to approve.
3. **Release** a tag when the change should reach studies.
4. **Cases update themselves:** a bot opens a PR in each case repo bumping
   `dimsCore` and refreshing `vendor/`. CI there verifies the vendored bytes
   match the release exactly, so hand-edited vendored code is a red X rather
   than a silent fork.

There is no step where anyone copies a file between repositories.

## Adding something

Adding a tab or an analysis must not require editing a file that already
works — they register themselves. Read the one relevant contract:

- a tab → [`docs/contracts/tab.md`](https://github.com/dims-network/dims/blob/main/docs/contracts/tab.md)
- an analysis → [`docs/contracts/step.md`](https://github.com/dims-network/dims/blob/main/docs/contracts/step.md)
- a new study → [`docs/contracts/case.md`](https://github.com/dims-network/dims/blob/main/docs/contracts/case.md)

## Working with human-subject data

Every case declares `"visibility": "public"` or `"private"` in
`dims-case.json`, and private cases are enforced by hooks and by CI rather than
by memory. Before touching a study that holds recordings of people, read
[`docs/contracts/data-visibility.md`](https://github.com/dims-network/dims/blob/main/docs/contracts/data-visibility.md).
