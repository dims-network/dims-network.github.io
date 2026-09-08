# dims-network.github.io

The website for **DIMS** — open tools for exploring dynamic interactions and
multimodal signals: recordings and the time series taken from them, on one
timeline, with the analyses that say how two signals relate.

**Site:** <https://dims-network.github.io/>
**Live dashboard:** <https://dims-network.github.io/case-demo/>
**Code:** [dims-network/dims](https://github.com/dims-network/dims)

## Try it, then build one

Open the [live dashboard](https://dims-network.github.io/case-demo/) and click
the timeline — the video and every chart follow the point you pick.

To build your own, you need Python and nothing else:

```sh
pip install "dims-network[builder]"
dims-builder
```

The [tutorial](https://dims-network.github.io/tutorial.html) walks through it,
with and without the wizard.

## What is in this repository

| | |
|---|---|
| `index.html` | the landing page |
| `tutorial.html` | build your own dashboard — with the wizard, or by hand |
| `docs/` | **generated.** The reference, rendered from the markdown in the core |
| `tools/` | the renderer, and the list of pages it builds |

`docs/*.html` and `docs/docs.js` are **generated — do not edit them.** They come
from `dims/docs/*.md` at the release named in
[`tools/SOURCE.json`](tools/SOURCE.json), and CI fails if what is committed is
not what that release produces. Before this, the site carried its own copy of the
documentation and drifted.

To change a page, change the markdown in the core, release it, then:

```sh
pip install -r tools/requirements.txt
python tools/render_docs.py --dims ../dims        # after bumping "ref"
```

## Citation

Miao, G. Q., Trujillo, J., Bulls, L. S., Thornton, M. A., Dale, R., & Pouw, W.
(2025). *DIMS Dashboard for Exploring Dynamic Interactions and Multimodal
Signals.* Proceedings of the 47th Annual Meeting of the Cognitive Science
Society (CogSci 2025). — [post-print PDF](Miao_etal_2025_DIMS_Dashboard_CogSciPostPrint_CameraReady.pdf)

A machine-readable `CITATION.cff` will be added once the DIMS methods paper is
published ([issue #1](https://github.com/dims-network/dims-network.github.io/issues/1)).

## Licence

MIT — see [LICENSE](LICENSE).
