# Contributing

> Canonical / web version: <https://dims-network.github.io/docs/contributing.html>

All code is in **[dims-network/dims](https://github.com/dims-network/dims)**.
Start with its [its README](https://github.com/dims-network/dims#working-on-dims) —
a map telling you which single document to read for the task you have, rather
than asking you to read everything.

## Where to start

Issues labelled **`agent-ready`** are self-contained: they name the files, link
the contract, and state the acceptance check. Both human and automated
contributors are welcome to take them.

## The short version

- **One copy of the code.** If you are fixing the same bug twice, you are in the
  wrong repository.
- **Everything self-registers.** Adding a tab or an analysis must not require
  editing an existing file. If it does, the contract needs fixing — say so.
- **Assume data is private** until `dims-case.json` says otherwise. Never commit
  anything under `assets/`, and never move data content into an external
  service.
- **No build step, by design.** A dashboard must open from a plain file server
  years from now.

## Code of conduct

Participation is covered by our
[Code of Conduct](https://github.com/dims-network/dims/blob/main/CODE_OF_CONDUCT.md).
