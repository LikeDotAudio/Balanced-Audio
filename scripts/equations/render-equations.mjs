/**
 * render-equations.mjs — Pre-render module governing equations (LaTeX) to standalone SVG.
 *
 * Usage (called by build.py):
 *   node scripts/equations/render-equations.mjs <in.json> <out.json>
 *
 * in.json  : { "MOD-001": "<latex>", ... }
 * out.json : { "MOD-001": "<svg ...>...</svg>", ... }
 *
 * SVGs use currentColor so the page's CSS sets their colour, and carry their own glyph paths
 * (fontCache: none) so each one renders on its own with no web font or CDN.
 */

import fs from "node:fs";
import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";

const [inPath, outPath] = process.argv.slice(2);
if (!inPath || !outPath) {
  console.error("usage: node render-equations.mjs <in.json> <out.json>");
  process.exit(2);
}

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
const doc = mathjax.document("", {
  InputJax: new TeX({ packages: AllPackages }),
  OutputJax: new SVG({ fontCache: "none" })
});

// Source equations use '*' for multiplication; typeset it as a centred dot
const tidy = (tex) => tex
  .replace(/(?<!\\)&/g, "\\&")
  .replace(/\s\*\s/g, " \\cdot ")
  .replace(/\*/g, " \\cdot ");

const equations = JSON.parse(fs.readFileSync(inPath, "utf8"));
const out = {};
let failed = 0;

for (const [id, tex] of Object.entries(equations)) {
  if (!tex || !tex.trim()) continue;
  try {
    const node = doc.convert(tidy(tex), { display: true });
    const svg = adaptor.innerHTML(node);
    // MathJax reports TeX errors inside the SVG rather than throwing
    if (svg.includes('data-mjx-error')) throw new Error("TeX error");
    out[id] = svg;
  } catch (err) {
    failed++;
    console.error(`  ! ${id}: could not render (${err.message}) — ${tex}`);
  }
}

fs.writeFileSync(outPath, JSON.stringify(out, null, 0));
console.log(`Rendered ${Object.keys(out).length} equations to SVG${failed ? `, ${failed} failed` : ""}`);
