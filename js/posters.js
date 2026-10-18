/**
 * posters.js — Poster-worthy moments: reference tables, rule cards and figures that stand on their own
 *
 * - Each poster gets a "🖨 Poster" button that prints just that piece on one landscape page, in place
 *   (so live drawings print as they are), with the committee watermark and version (print-report.js).
 * - "Print Posters" prints the whole set, one landscape page each.
 * - A "Posters" gallery near the top of the report mirrors every poster; a mirror jumps to its original.
 * - In the full report PDF a poster starts on a new page and is never split.
 */

// { sel: something inside the poster, title } — or { sel, all: true, titleSel } for a family of cards
const POSTERS = [
  { sel: ".rule-card", all: true, titleSel: ".rule-title", numberSel: ".rule-number" },
  { sel: ".xlr-inspector-sticky .xlr-table-card", title: "XLR Mating Faces: Connector Pin Inspector" },
  { sel: ".aes14-t2-row", title: "AES14 Table 2: Connector Pin Designations" },
  { sel: "#xlr-hub .xlr-table-card table", title: "AES14 Table 1: Connector Designations & Applications" },
  { sel: ".tia-mnemonic-bar", title: "AES72 / TIA-568-B Pair Colours: SUN · SKY · GRASS · EARTH" },
  { sel: "#multichannel-hierarchy .detail-card table", title: "AES59 → AES72-4E → XLR / TRS Pin-by-Pin Cross-Reference" },
  { sel: "#multichannel-hierarchy table:not(.detail-card table)", title: "AES59 Master 8-Path Pinout Matrix" },
  { sel: ".definitions-grid", title: "Top-Level Engineering Definitions" },
  { sel: ".level-table-section", all: true, titleSel: ".level-table-heading", prefix: "Signal Level · " },
  { sel: "#tutorials-section .alignment-table", title: "Richard Hess Interconnection Compatibility Matrix" },
  { sel: "#normative-references .alignment-table", title: "Standards Referenced in This Report" },
  { sel: "#dennis-bohn-par .alignment-table", title: "Pro Audio Reference: Greek Technical Alphabet" }
];

const PRINT_W = 960; // landscape Letter / A4 printable area in CSS px
const PRINT_H = 600;

function posterRoot(el) {
  return el.closest(".rule-card, .level-table-section, .xlr-table-card, .detail-card, .table-responsive, .tia-mnemonic-bar, .definitions-grid") || el;
}

function markPoster(root, title) {
  if (root.dataset.poster) return;
  root.dataset.poster = title;
  root.classList.add("report-poster");
  if (!root.id) root.id = "poster-" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "poster-print-btn";
  btn.title = `Print "${title}" as a one-page poster`;
  btn.textContent = "🖨 Poster";
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    printPosters([root], title);
  });
  root.prepend(btn);
}

function findPosters() {
  POSTERS.forEach(p => {
    const els = p.all ? [...document.querySelectorAll(p.sel)] : [document.querySelector(p.sel)].filter(Boolean);
    els.forEach(el => {
      if (el.closest("#poster-gallery")) return;
      let title = p.title;
      if (p.titleSel) {
        const num = p.numberSel ? el.querySelector(p.numberSel)?.textContent.trim() : "";
        title = `${p.prefix || ""}${num ? num + " · " : ""}${el.querySelector(p.titleSel)?.textContent.trim() || "Poster"}`;
      }
      markPoster(posterRoot(el), title);
    });
  });
}

// A mirror is a copy with every id renamed (and the url(#…) / href="#…" references that point at them),
// so gradients still resolve and nothing in the live page ever finds the copy instead of the original
function mirrorOf(root) {
  const copy = root.cloneNode(true);
  copy.querySelectorAll(".poster-print-btn").forEach(b => b.remove());
  const ids = new Map();
  [copy, ...copy.querySelectorAll("[id]")].forEach(n => {
    if (!n.id) return;
    ids.set(n.id, `${n.id}--mirror`);
    n.id = `${n.id}--mirror`;
  });
  const fix = (v) => v.replace(/url\(#([^)]+)\)/g, (m, id) => (ids.has(id) ? `url(#${ids.get(id)})` : m))
    .replace(/^#(.+)$/, (m, id) => (ids.has(id) ? `#${ids.get(id)}` : m));
  [copy, ...copy.querySelectorAll("*")].forEach(n => {
    [...n.attributes].forEach(a => {
      if (/url\(#|^#/.test(a.value)) n.setAttribute(a.name, fix(a.value));
    });
    n.removeAttribute("data-probe-target");
    n.removeAttribute("data-range-idx");
    n.removeAttribute("data-circuit-id");
    n.classList.remove("report-poster", "range-dial-tick", "range-knob-rotor", "aes14-t2-row");
  });
  copy.removeAttribute("data-poster");
  return copy;
}

function buildGallery() {
  const posters = [...document.querySelectorAll(".report-poster")];
  if (!posters.length || document.getElementById("poster-gallery")) return;
  const section = document.createElement("section");
  section.id = "poster-gallery";
  section.className = "section poster-gallery";
  section.innerHTML = `
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Posters</span>
        <h2 class="section-title">Posters: The Key Figures and Tables</h2>
        <p class="section-lead" style="margin: 0;">Each one stands on its own. Select a poster to go to it in the report, print one with its 🖨 Poster button, or print them all as a set.</p>
        <button type="button" class="poster-set-btn">🖨 Print all ${posters.length} posters</button>
      </div>
      <div class="poster-grid"></div>
    </div>`;
  section.querySelector(".poster-set-btn").addEventListener("click", printAllPosters);
  const grid = section.querySelector(".poster-grid");
  const hero = document.getElementById("hero");
  if (hero) hero.after(section);
  else document.body.prepend(section);
  posters.forEach(root => {
    const tile = document.createElement("a");
    tile.className = "poster-tile";
    tile.href = `#${root.id}`;
    tile.innerHTML = `<span class="poster-tile-title">${root.dataset.poster}</span><div class="poster-tile-view"></div>`;
    const view = tile.querySelector(".poster-tile-view");
    const copy = mirrorOf(root);
    copy.style.width = `${Math.max(640, root.offsetWidth)}px`;
    view.appendChild(copy);
    grid.appendChild(tile);
    copy.style.zoom = String(Math.min(1, view.clientWidth / Math.max(1, copy.offsetWidth)));
  });
}

// Print posters where they stand: everything else is hidden, each poster is sized to one landscape page
function printPosters(roots, label) {
  const undo = [];
  roots.forEach(root => {
    for (let n = root.parentElement; n && n !== document.body; n = n.parentElement) {
      if (!n.classList.contains("poster-path")) {
        n.classList.add("poster-path");
        undo.push(() => n.classList.remove("poster-path"));
      }
    }
    // The poster's title goes just above it (inside it would upset grid and flex layouts)
    let title = null;
    if (!root.matches(".rule-card, .level-table-section")) { // these carry their own heading
      title = document.createElement("div");
      title.className = "poster-print-title";
      title.textContent = root.dataset.poster;
      root.before(title);
    }
    // Widen until it fits the page height too: printed size is width × zoom by height × zoom
    const oldWidth = root.style.width;
    // A poster in a hidden tab has no size on screen: measure a copy laid out off-screen instead
    let probe = root;
    if (!root.offsetHeight) {
      probe = root.cloneNode(true);
      probe.style.cssText = "position:absolute;left:-20000px;top:0;visibility:hidden;display:block;";
      document.body.appendChild(probe);
    }
    let z = 1;
    for (let i = 0; i < 5; i++) {
      probe.style.width = `${PRINT_W / z}px`;
      // scrollHeight: some posters sit in fixed-height scroll boxes that open up in print
      z = Math.min(1.6, PRINT_H / Math.max(1, probe.offsetHeight, probe.scrollHeight)); // small posters grow to fill the page
    }
    if (probe !== root) probe.remove();
    root.style.width = `${PRINT_W / z}px`;
    root.style.zoom = String(z);
    root.classList.add("poster-printing");
    undo.push(() => {
      root.classList.remove("poster-printing");
      root.style.width = oldWidth;
      root.style.zoom = "";
      if (title) title.remove();
    });
  });

  document.body.classList.add("print-poster-only");
  const style = document.createElement("style");
  style.textContent = "@page { size: landscape; }";
  document.head.appendChild(style);
  const done = () => {
    document.body.classList.remove("print-poster-only");
    undo.forEach(f => f());
    style.remove();
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  if (window.printReport) window.printReport(label);
  else window.print();
}

function printAllPosters() {
  printPosters([...document.querySelectorAll(".report-poster")].filter(p => !p.closest("#poster-gallery")), "Posters");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("print-posters-btn")?.addEventListener("click", printAllPosters);
  setTimeout(findPosters, 0);
  // Tables and inspectors are filled in by other scripts on load: mirror them once they exist
  setTimeout(() => {
    findPosters();
    buildGallery();
  }, 1500);
});
