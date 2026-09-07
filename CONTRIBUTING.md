# Contributing

All the code is in **[dims-network/dims](https://github.com/dims-network/dims)**,
and so is everything about how to work on it. This repository is only the
website.

- **The map** — which single document to read for the task you have:
  [dims/README.md](https://github.com/dims-network/dims#working-on-dims)
- **Automated contributors**:
  [AGENTS.md](https://github.com/dims-network/dims/blob/main/AGENTS.md)
- **Issues**: [dims-network/dims/issues](https://github.com/dims-network/dims/issues).
  Those labelled `agent-ready` name the files, link the contract and state the
  acceptance check.

## Changing the documentation on this site

Do not edit `docs/*.html`. They are generated from the markdown in the core, at
the release named in [`tools/SOURCE.json`](tools/SOURCE.json):

```sh
pip install -r tools/requirements.txt
python tools/render_docs.py --dims ../dims          # re-render
python tools/render_docs.py --dims ../dims --check  # what CI runs
```

Fix the text in `dims/docs/`, release it, bump `ref`, re-render, commit. CI
fails if the committed HTML is not what the pinned release produces — which is
the whole point: this site used to describe a workflow that had not existed for
months, and nothing connected a page to the code it described.
