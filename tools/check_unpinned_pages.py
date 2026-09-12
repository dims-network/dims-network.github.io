"""The hand-written pages say things about a release. Check they are true of it.

The documentation and the tutorial are built from the core repository and
published per version, so they cannot drift from it. `index.html` and
`setup.html` are what is left here: written by hand, carrying no version
marker, with nothing connecting them to the code they describe.

They drifted, and a reader paid for it. The front page advertised v1.0.1 for
four releases, and `setup.html` published an install command that produced a
`dims-builder` which could not start -- reported from outside the project by
someone who could not begin the no-code path (dims-network/dims#21, #18).

Two things are checked, both against the release `tools/SOURCE.json` pins:

  * a release-tag link must name that release, not an older one;
  * every `pip install` line must be one the core's own README publishes.

The second is the general form of the failure: the site may not invent an
install the project does not endorse. Neither check knows anything about the
prose around it, which is deliberate -- these are the two claims that were
wrong, and they are the two a machine can settle.
"""
import json
import os
import re
import sys

SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ("index.html", "setup.html")


def main(dims_root):
    ref = json.load(open(os.path.join(SITE, "tools/SOURCE.json")))["ref"]
    readme = open(os.path.join(dims_root, "README.md")).read()
    # Normalise whitespace so a line broken for layout still matches.
    published = {" ".join(m.split())
                 for m in re.findall(r"pip install[^\n<]*", readme)}

    problems = []
    for page in PAGES:
        path = os.path.join(SITE, page)
        if not os.path.exists(path):
            continue
        text = open(path).read()

        for tag in set(re.findall(r"releases/tag/(v[\d.]+)", text)):
            if tag != ref:
                problems.append(
                    f"{page} links to release {tag}; this site documents {ref}. "
                    f"Update the page, or the ref in tools/SOURCE.json.")

        for cmd in re.findall(r"pip install[^\n<]*", text):
            cmd = " ".join(cmd.split())
            if cmd not in published:
                problems.append(
                    f"{page} publishes `{cmd}`, which the core's README at {ref} "
                    f"does not. It publishes: {', '.join(sorted(published))}.")

    for p in problems:
        print(f"::error::{p}")
    if problems:
        print("\nThese pages are written here rather than generated, so nothing "
              "else would have caught this.")
        return 1
    print(f"{len(PAGES)} hand-written pages agree with the core at {ref}")
    return 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("usage: check_unpinned_pages.py <path to a dims checkout>")
    sys.exit(main(sys.argv[1]))
