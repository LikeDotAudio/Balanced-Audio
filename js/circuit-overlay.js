/**
 * circuit-overlay.js — Put interactive controls over the circuit they change
 *
 * 1. Each military fader cell is lifted out of its control panel and floated over the schematic,
 *    centred above the part it adjusts (found by matching the fader label to text in the SVG:
 *    drive → "Driver In"/V_in, turns ratio → transformer, load → the Ω resistor …), with a
 *    dashed leader down to that part. Unmatched faders fill the gaps left to right.
 * 2. Turning a resistance or capacitance control switches the LUCKY DMM to Ω or C (LCR) mode
 *    for a few seconds, showing the value and, for capacitors, the reactance at several frequencies.
 */

// Each fader's part, as patterns tried in order (most specific first) against the SVG's text
const OVERLAY_ANCHORS = [
  { label: /DRIVE|V<sub>IN|V<sub>PO|SOURCE/i, pick: "left", svg: [/driver in|audio in|signal in/i, /v[_\s]?in\b|v[_\s]?sig|v[_\s]?po/i, /source|generator|op-?amp/i] },
  { label: /TURNS|RATIO/i, svg: [/1\s*:\s*n|turns|ratio/i] },
  { label: /LOAD|BRIDGING/i, pick: "right", svg: [/r[_\s]?load|load/i, /\d\s*k\s*Ω/i, /Ω/i] },
  { label: /R<sub>OUT|MATCH/i, svg: [/r[_\s]?(po|out)|z[_\s]?out/i, /50\s*Ω/i] },
  { label: /HOT \(Z/i, svg: [/z[_\s]?po/i, /hot/i] },
  { label: /COLD \(Z/i, svg: [/z[_\s]?ro/i, /cold/i] },
  { label: /CMZ/i, svg: [/cmz|z[_\s]?cm/i, /common/i] },
  { label: /SHIELD \(C|C<sub>/i, svg: [/c[_\s]?stray|c[_\s]?ps/i, /shield|capac/i] },
  { label: /HUM/i, svg: [/v[_\s]?gvd/i, /hum|ground/i] }
];

class CircuitOverlay {
  constructor() {
    this.groups = [];
    document.querySelectorAll(".vintage-military-panel").forEach(panel => this.adopt(panel));
    if (!this.groups.length) return;

    const relayout = () => this.groups.forEach(g => this.layout(g));
    window.addEventListener("resize", relayout);
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(relayout);
      this.groups.forEach(g => ro.observe(g.wrapper));
    }
    relayout();
    this.bindLcr();
  }

  // Pair a control panel with the schematic that follows it in the same card
  adopt(panel) {
    let wrapper = null;
    for (let el = panel.nextElementSibling; el; el = el.nextElementSibling) {
      if (el.classList.contains("svg-diagram-wrapper")) { wrapper = el; break; }
      if (el.querySelector && el.querySelector(".svg-diagram-wrapper")) { wrapper = el.querySelector(".svg-diagram-wrapper"); break; }
    }
    const svg = wrapper && wrapper.querySelector("svg");
    const cells = [...panel.querySelectorAll(".military-fader-cell")];
    if (!svg || !cells.length) return;

    wrapper.classList.add("circuit-overlay-host");
    const layer = document.createElement("div");
    layer.className = "circuit-overlay-layer";
    wrapper.appendChild(layer);

    const items = cells.map(cell => {
      const label = cell.querySelector(".military-fader-label")?.innerHTML || "";
      const leader = document.createElement("div");
      leader.className = "circuit-overlay-leader";
      layer.appendChild(leader);
      layer.appendChild(cell);
      cell.classList.add("circuit-overlay-cell");
      return { cell, leader, label };
    });
    panel.querySelector(".military-faders-grid")?.remove();
    this.groups.push({ panel, wrapper, svg, layer, items });
  }

  // Centre of a matching SVG text, relative to the wrapper. Sources sit at the left of a schematic and
  // loads at the right, so "left"/"right" take the outermost match; otherwise the first in drawing order.
  findAnchor(svg, wrapperRect, pattern, used, pick) {
    const hits = [...svg.querySelectorAll("text")]
      .filter(t => !used.has(t) && pattern.test(t.textContent || ""))
      .map(t => ({ t, r: t.getBoundingClientRect() }))
      .filter(h => h.r.width);
    if (!hits.length) return null;
    if (pick === "left") hits.sort((a, b) => a.r.left - b.r.left);
    if (pick === "right") hits.sort((a, b) => b.r.right - a.r.right);
    const { t, r } = hits[0];
    used.add(t);
    return { x: r.left + r.width / 2 - wrapperRect.left, y: r.top - wrapperRect.top };
  }

  // Transformer core: two long, close, parallel vertical lines
  findCore(svg, wrapperRect) {
    const verticals = [...svg.querySelectorAll("line")].filter(l => {
      const x1 = +l.getAttribute("x1"), x2 = +l.getAttribute("x2");
      const len = Math.abs(+l.getAttribute("y2") - +l.getAttribute("y1"));
      return x1 === x2 && len > 60;
    });
    for (const a of verticals) {
      const b = verticals.find(o => o !== a && Math.abs(+o.getAttribute("x1") - +a.getAttribute("x1")) < 16);
      if (!b) continue;
      const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
      return { x: (ra.left + rb.right) / 2 - wrapperRect.left, y: Math.min(ra.top, rb.top) - wrapperRect.top };
    }
    return null;
  }

  layout(g) {
    if (g.wrapper.offsetParent === null) return;
    g.wrapper.style.paddingTop = "";
    const wr = g.wrapper.getBoundingClientRect();
    const svgTop = g.svg.getBoundingClientRect().top - wr.top;
    const used = new Set();
    const CELL_W = 156;

    // Match anchors, then give unmatched faders evenly spaced slots
    g.items.forEach(it => {
      const rule = OVERLAY_ANCHORS.find(a => a.label.test(it.label));
      it.anchor = null;
      if (rule) {
        for (const pattern of rule.svg) {
          it.anchor = this.findAnchor(g.svg, wr, pattern, used, rule.pick);
          if (it.anchor) break;
        }
      }
      if (!it.anchor && /TURNS|RATIO/i.test(it.label)) it.anchor = this.findCore(g.svg, wr);
    });
    const free = g.items.filter(it => !it.anchor);
    free.forEach((it, k) => {
      it.anchor = { x: ((k + 1) / (free.length + 1)) * wr.width, y: svgTop + 40, guessed: true };
    });

    // One row of cells across the top; the drawing is pushed down below them so nothing is covered
    const cellH = Math.max(...g.items.map(it => it.cell.offsetHeight || 0));
    const pad = cellH + 18;
    g.wrapper.style.paddingTop = `${pad}px`;

    // Spread cells so they never overlap, keeping each as close above its part as possible
    const order = [...g.items].sort((a, b) => a.anchor.x - b.anchor.x);
    let lastRight = -Infinity;
    order.forEach(it => {
      let left = Math.max(4, Math.min(wr.width - CELL_W - 4, it.anchor.x - CELL_W / 2));
      left = Math.max(left, lastRight + 6);
      lastRight = left + CELL_W;
      Object.assign(it.cell.style, { left: `${left}px`, top: "6px", width: `${CELL_W}px` });

      // Leader from the cell's bottom edge down to its part
      const leaderTop = 6 + it.cell.offsetHeight;
      const leaderH = Math.max(0, it.anchor.y + pad - leaderTop - 2);
      Object.assign(it.leader.style, {
        left: `${it.anchor.x}px`,
        top: `${leaderTop}px`,
        height: `${leaderH}px`,
        display: it.anchor.guessed || leaderH < 4 ? "none" : "block"
      });
    });
  }

  // Resistance / capacitance controls drive the LUCKY DMM into Ω or C mode
  bindLcr() {
    const parse = (txt) => {
      const m = (txt || "").replace(/,/g, "").match(/(-?[\d.]+)\s*([pnuµmkM]?)\s*(Ω|F)/);
      if (!m) return null;
      const mult = { p: 1e-12, n: 1e-9, u: 1e-6, "µ": 1e-6, m: 1e-3, k: 1e3, M: 1e6, "": 1 }[m[2]];
      return { value: parseFloat(m[1]) * mult, kind: m[3] === "F" ? "C" : "R" };
    };
    const onChange = (e) => {
      const cell = e.target.closest(".military-fader-cell");
      if (!cell || !window.floatingMeterDock || typeof window.floatingMeterDock.showLcr !== "function") return;
      requestAnimationFrame(() => {
        const readout = cell.querySelector(".military-fader-readout");
        const parsed = parse(readout && readout.textContent);
        if (!parsed) return;
        const label = (cell.querySelector(".military-fader-label")?.textContent || "").replace(/\s+/g, " ").trim();
        window.floatingMeterDock.showLcr({ ...parsed, label });
      });
    };
    document.addEventListener("input", onChange, true);
    document.addEventListener("pointermove", (e) => { if (e.buttons) onChange(e); }, true);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => setTimeout(() => { window.circuitOverlay = new CircuitOverlay(); }, 0));
} else {
  window.circuitOverlay = new CircuitOverlay();
}
