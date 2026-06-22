# Contributing

> Canonical / web version: <https://dims-network.github.io/docs/contributing.html>
> Keep this file and `docs/contributing.html` in sync.

## Where code lives

- **[DIMS_dashboard_template](https://github.com/dims-network/DIMS_dashboard_template)**
  — the dashboard itself: the frontend (`js/`, `css/`, `index.html`), the analysis
  scripts (`opt/step_*.py`), and `serve.py`. **Make code changes here.**
- **DIMS_dashboard_builder** — the no-code wizard. Changes to the wizard itself
  (the Flask app in `app/`, the UI in `app/static/`) are made directly in that repo.
- **DIMS_Dashboard** — canonical data + the deployed site; receives template code,
  never authors it.

## How the template lives inside the builder

The builder ships a complete copy of the template under `template/` so a
non-technical user needs **neither git nor a network connection**
(`acquire_template()` in `app/project.py` copies it into each generated project,
and the builder runs the project's own `opt/` scripts).

That `template/` directory is a **git subtree** of the upstream template repo —
the files are committed (offline-safe), but their history is linked upstream so
updates pull in with one command.

## Adding a feature to the dashboard

1. Open a PR against **DIMS_dashboard_template** (frontend or `opt/` scripts).
2. Test it on real data via **DIMS_Dashboard** + `serve.py` (see
   [WORKFLOW.md](WORKFLOW.md)).
3. Merge it into `template/main` (the single bless point).
4. Integrate into the builder:
   ```sh
   cd DIMS_dashboard_builder
   scripts/update-template.sh
   # = git subtree pull --prefix=template \
   #     https://github.com/dims-network/DIMS_dashboard_template.git main --squash
   ```
5. Review the squashed merge, sanity-check with a build, then `git push`.

> Existing generated projects pick up new scripts automatically: on the next
> build, `acquire_template()` refreshes a project's template *code* (`opt/`, the
> frontend, the deploy workflow) while preserving the user's `config.json` and
> `assets/`.