/* The front page draws a diagram and a list of repository cards from one
   inline script, and the diagram runs first. A repository present in `repos`
   but missing from `pos` threw a TypeError inside the first draw, which took
   the rest of the script with it -- so the page rendered neither the diagram
   nor the cards, and said nothing about why.

   This loads the page and asserts that the cards are there and nothing threw.
   jsdom has no canvas backend, so the 2d context is stubbed: what is being
   tested is that the script completes, not what it paints. */
import { JSDOM, VirtualConsole } from "jsdom";
import fs from "fs";

const file = process.argv[2];
const problems = [];
const vc = new VirtualConsole();
vc.on("jsdomError", e => problems.push("uncaught: " + e.message));
vc.on("error", (...a) => problems.push("console.error: " + a.join(" ")));

const dom = new JSDOM(fs.readFileSync(file, "utf8"), {
  runScripts: "dangerously", virtualConsole: vc, pretendToBeVisual: true,
  beforeParse(window) {
    const stub = new Proxy({}, { get: (t, k) =>
      k === "measureText" ? () => ({ width: 40 })
      : k === "createLinearGradient" ? () => ({ addColorStop() {} })
      : () => {} });
    window.HTMLCanvasElement.prototype.getContext = () => stub;
  },
});

const cards = dom.window.document.querySelectorAll("#cards .card");
console.log(`repository cards rendered: ${cards.length}`);
if (cards.length === 0) problems.push("no repository cards were rendered");
for (const p of problems) console.log("::error::" + p);
process.exit(problems.length ? 1 : 0);
