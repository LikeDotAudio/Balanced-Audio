/**
 * Hess matrix wiring diagrams.
 *
 * One wiring diagram per row of the Richard Hess Interconnection Compatibility Matrix
 * (#tutorials-section, first .alignment-table). Each entry in ROWS mirrors one table row: the source
 * output topology and connector, the destination connector, every conductor (from contact -> to
 * contact) and the Pin 3 treatment (float mark, jumper, Z_match resistor, Y split, cancellation).
 *
 * The connector ends reuse the geometry and colours of the "Connector Plug Anatomy" illustration
 * further down the section (3.5 mm TRS mini-plug, 1/4" TS/TRS phone plug, RCA plug, XLR-3 face).
 * Each conductor is shaded from the colour of the contact it leaves to the colour of the contact it
 * lands on. Drawn for the dark page; paper view inverts the section as a whole.
 *
 * The block is inserted directly after the table's .table-responsive wrapper. Diagram N has
 * id="hess-wiring-N" and links back to the table row id="hess-row-N".
 */
(function () {
  "use strict";

  const NS = "http://www.w3.org/2000/svg";
  const BG = "#040812";
  const INK = "#e2e8f0";
  const DIM = "#94a3b8";
  const FAINT = "#334155";
  const DANGER = "#ef4444";
  const OK = "#4ade80";

  // Contact colours, as in the Connector Plug Anatomy illustration.
  const C = {
    trs35: { T: "#38bdf8", R: "#f43f5e", S: "#64748b" },
    q: { T: "#facc15", R: "#f43f5e", S: "#64748b" },
    rca: { C: "#fb923c", S: "#64748b" },
    xlr: { 1: "#94a3b8", 2: "#38bdf8", 3: "#f43f5e" },
  };

  // ---------------------------------------------------------------- data (mirrors the table rows)
  const ROWS = [
    { n: 1, title: "6.1 Push-Pull → unbalanced input", topo: "pushpull", layout: "xlr-ts",
      wires: [["2", "T"], ["1", "S"]], pin3: "float",
      tag: "PIN 3: FLOAT — DO NOT SHORT", tagColor: DANGER,
      treat: "Float Pin 3 (do not short)", level: "−6.0 dB (half voltage)" },
    { n: 2, title: "6.2 Active impedance-balanced → unbalanced input", topo: "impbal", layout: "xlr-ts",
      wires: [["2", "T"], ["1", "S"]], pin3: "tie-or-float",
      tag: "PIN 3: TIE TO PIN 1 (OR FLOAT)", tagColor: OK,
      treat: "Tie Pin 3 to Pin 1, or float", level: "0.0 dB (full voltage)" },
    { n: 3, title: "6.3 Transformer floating → unbalanced input", topo: "xfmr", layout: "xlr-ts",
      wires: [["2", "T"], ["3", "S"], ["1", "S"]], pin3: "bond-sleeve",
      tag: "PIN 3: BONDED TO SLEEVE", tagColor: OK,
      treat: "Must bond Pin 3 to sleeve", level: "0.0 dB (full winding voltage)" },
    { n: 4, title: "6.4 Double transformer link → unbalanced input", topo: "xfmr2", layout: "xlr-ts",
      wires: [["2", "T"], ["3", "S"], ["1", "S"]], pin3: "ground-dest",
      tag: "PIN 3: TIED TO GROUND AT DESTINATION", tagColor: OK,
      treat: "Tie Pin 3 to ground at destination", level: "0.0 dB" },
    { n: 5, title: "6.5 Cross-coupled (THAT OutSmarts) → unbalanced input", topo: "xcoupled", layout: "xlr-ts",
      wires: [["2", "T"], ["3", "S"], ["1", "S"]], pin3: "short",
      tag: "PIN 3: MUST SHORT TO PIN 1", tagColor: OK,
      treat: "Must short Pin 3 to Pin 1", level: "0.0 dB (automatic +6 dB transfer to Pin 2)" },
    { n: 6, title: "3.5 mm stereo TRS → dual balanced XLR (Y split)", topo: "stereo", layout: "trs-2xlr",
      wires: [["T", "L2"], ["R", "R2"], ["S", "L1"], ["S", "L3"], ["S", "R1"], ["S", "R3"]], pin3: "split",
      tag: "STEREO SPLITTER: SLEEVE → PINS 1 & 3 OF BOTH", tagColor: OK,
      treat: "Stereo splitter required", level: "0.0 dB" },
    { n: 7, title: "3.5 mm stereo TRS → single balanced mono XLR (DO NOT USE)", topo: "stereo", layout: "trs-xlr-cancel",
      wires: [["T", "2"], ["R", "3"], ["S", "1"]], pin3: "cancel",
      tag: "DO NOT USE DIRECT CABLE", tagColor: DANGER,
      treat: "Do not use a direct cable", level: "−∞ dB for centre content (vocals, kick, bass cancel)" },
    { n: 8, title: "3.5 mm mono TS (Eurorack) → balanced XLR", topo: "eurorack", layout: "ts35-xlr-z",
      wires: [["T", "2"], ["S", "1"]], pin3: "zmatch",
      tag: "PIN 3 → GROUND VIA Z_match", tagColor: "#38bdf8",
      treat: "Tie Pin 3 to ground via Z_match", level: "Full level preserved" },
    { n: 9, title: "Unbalanced output (1/4″ TS / RCA) → balanced XLR input", topo: "unbal", layout: "ts-xlr-pseudo",
      wires: [["T", "2"], ["S", "3"]], pin3: "pseudo",
      tag: "SLEEVE → PIN 3 AT SOURCE · SHIELD → PIN 1 ONLY", tagColor: "#38bdf8",
      treat: "Connect sleeve to Pin 3 at source; shield to Pin 1 at the balanced input only", level: "Full level preserved" },
  ];

  // ---------------------------------------------------------------- svg helpers
  let gradSeq = 0;
  function el(name, attrs, parent) {
    const e = document.createElementNS(NS, name);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function text(parent, x, y, str, attrs) {
    const t = el("text", Object.assign({ x, y, fill: INK, "font-size": 8, "font-weight": 700 }, attrs || {}), parent);
    t.textContent = str;
    return t;
  }

  // Plug drawings: geometry copied from the Connector Plug Anatomy illustration (local coords, centre line y=52).
  // place(g, x, y, s, dir): x = barrel end (cable side), dir = +1 tip points right, -1 tip points left.
  const PLUGS = {
    trs35: {
      len: 142,
      contacts: { S: { cx: 65, top: 44, bot: 60 }, R: { cx: 100, top: 44, bot: 60 }, T: { cx: 126, top: 44, bot: 60 } },
      draw(g, mono) {
        el("rect", { x: 0, y: 35, width: 45, height: 34, rx: 2, fill: "#1e293b", stroke: FAINT, "stroke-width": 1.5 }, g);
        el("rect", { x: 45, y: 44, width: 40, height: 16, fill: C.trs35.S, stroke: "#0f172a", "stroke-width": 1 }, g);
        el("rect", { x: 85, y: 44, width: 4, height: 16, fill: "#000" }, g);
        el("rect", { x: 89, y: 44, width: 22, height: 16, fill: mono ? C.trs35.S : C.trs35.R, stroke: "#0f172a", "stroke-width": 1 }, g);
        el("rect", { x: 111, y: 44, width: 4, height: 16, fill: "#000" }, g);
        el("path", { d: "M 115,44 L 132,44 C 137,44 140,48 142,52 C 140,56 137,60 132,60 L 115,60 Z", fill: C.trs35.T }, g);
      },
    },
    q: {
      len: 185,
      contacts: { S: { cx: 82, top: 42, bot: 62 }, R: { cx: 129, top: 42, bot: 62 }, T: { cx: 163, top: 42, bot: 62 } },
      draw(g, mono) {
        el("rect", { x: 0, y: 33, width: 55, height: 38, rx: 2, fill: "#1e293b", stroke: FAINT, "stroke-width": 1.5 }, g);
        el("rect", { x: 55, y: 42, width: 55, height: 20, fill: C.q.S, stroke: "#0f172a", "stroke-width": 1 }, g);
        el("rect", { x: 110, y: 42, width: 5, height: 20, fill: "#000" }, g);
        el("rect", { x: 115, y: 42, width: 28, height: 20, fill: mono ? C.q.S : C.q.R, stroke: "#0f172a", "stroke-width": 1 }, g);
        el("rect", { x: 143, y: 42, width: 5, height: 20, fill: "#000" }, g);
        el("path", { d: "M 148,42 L 170,42 C 176,42 182,47 185,52 C 182,57 176,62 170,62 L 148,62 Z", fill: C.q.T }, g);
      },
    },
    rca: {
      len: 135,
      contacts: { S: { cx: 87, top: 39, bot: 65 }, C: { cx: 120, top: 47, bot: 57 } },
      draw(g) {
        el("rect", { x: 10, y: 35, width: 60, height: 34, rx: 3, fill: "#1e293b", stroke: FAINT, "stroke-width": 1.5 }, g);
        el("path", { d: "M 70,39 L 105,39 L 105,65 L 70,65 Z", fill: C.rca.S, stroke: "#0f172a", "stroke-width": 1 }, g);
        el("rect", { x: 105, y: 47, width: 30, height: 10, rx: 3, fill: C.rca.C }, g);
      },
    },
  };

  function plug(svg, type, x, y, s, dir, opts) {
    opts = opts || {};
    const def = PLUGS[type];
    const g = el("g", { transform: `translate(${x},${y}) scale(${dir * s},${s}) translate(0,-52)` }, svg);
    def.draw(g, opts.mono);
    const colors = C[type];
    const a = {};
    for (const k in def.contacts) {
      const c = def.contacts[k];
      const cx = x + dir * s * c.cx;
      a[k] = {
        top: { x: cx, y: y + s * (c.top - 52), side: "v" },
        bot: { x: cx, y: y + s * (c.bot - 52), side: "v" },
        color: (opts.mono && k === "R") ? colors.S : colors[k],
      };
    }
    // contact labels
    const names = { T: "T", R: "R", S: "S", C: "C" };
    (opts.labels || []).forEach(([k, where]) => {
      if (!a[k]) return;
      const yy = where === "above" ? a[k].top.y - 4 : a[k].bot.y + 10;
      text(svg, a[k].top.x, yy, names[k], { fill: a[k].color, "font-size": 8, "font-weight": 900, "text-anchor": "middle" });
    });
    return a;
  }

  // XLR-3 face (anatomy illustration geometry, centre 100,52 r30; pins 1 TL, 2 TR, 3 bottom).
  function xlrFace(svg, cx, cy, s) {
    const g = el("g", { transform: `translate(${cx},${cy}) scale(${s}) translate(-100,-52)` }, svg);
    el("circle", { cx: 100, cy: 52, r: 30, fill: "#0f172a", stroke: "#38bdf8", "stroke-width": 2 }, g);
    const pins = { 1: [86, 44], 2: [114, 44], 3: [100, 66] };
    const a = {};
    for (const p in pins) {
      const [px, py] = pins[p];
      el("circle", { cx: px, cy: py, r: 6.5, fill: C.xlr[p], stroke: "#000", "stroke-width": 1 }, g);
      const x = cx + s * (px - 100), y = cy + s * (py - 52), r = 6.5 * s;
      a[p] = { c: { x, y }, left: { x: x - r, y, side: "h" }, right: { x: x + r, y, side: "h" },
        top: { x, y: y - r, side: "v" }, bot: { x, y: y + r, side: "v" }, color: C.xlr[p] };
    }
    // numbers on top of everything (drawn after wires by caller via xlrNumbers)
    a._numbers = () => {
      for (const p in pins) {
        const [px, py] = pins[p];
        const t = el("text", { x: cx + s * (px - 100), y: cy + s * (py - 52) + 2.6 * s, fill: "#000",
          "font-size": 7.5 * s, "font-weight": 900, "text-anchor": "middle" }, svg);
        t.textContent = p;
      }
    };
    return a;
  }

  // Orthogonal wire. pts: list of points; colours shade from c1 (leaving contact) to c2 (landing contact).
  function wire(svg, pts, c1, c2, opts) {
    opts = opts || {};
    const d = "M " + pts.map((p) => `${p.x},${p.y}`).join(" L ");
    const x0 = pts[0].x, x1 = pts[pts.length - 1].x;
    let stroke = c1;
    if (c1 !== c2 && Math.abs(x1 - x0) > 4) {
      const id = "hw-grad-" + (++gradSeq);
      const lg = el("linearGradient", { id, gradientUnits: "userSpaceOnUse", x1: x0, y1: 0, x2: x1, y2: 0 }, svg.__defs);
      el("stop", { offset: "0.3", "stop-color": c1 }, lg);
      el("stop", { offset: "0.7", "stop-color": c2 }, lg);
      stroke = `url(#${id})`;
    } else if (c1 !== c2) {
      stroke = c2;
    }
    el("path", { d, fill: "none", stroke: BG, "stroke-width": 5.5, "stroke-linejoin": "round" }, svg.__wires);
    el("path", { d, fill: "none", stroke, "stroke-width": opts.w || 2.4, "stroke-linejoin": "round",
      "stroke-dasharray": opts.dash || "none" }, svg.__wires);
  }
  function dot(svg, x, y, color) { el("circle", { cx: x, cy: y, r: 2.8, fill: color || INK }, svg.__marks); }
  function P(x, y) { return { x, y }; }

  function floatMark(svg, x, y, label) {
    const g = svg.__marks;
    el("path", { d: `M ${x - 4},${y - 4} L ${x + 4},${y + 4} M ${x - 4},${y + 4} L ${x + 4},${y - 4}`, stroke: DANGER, "stroke-width": 2.2 }, g);
    if (label) text(g, x + 8, y + 3, label, { fill: DANGER, "font-size": 7.5, "font-weight": 900 });
  }
  function ground(svg, x, y, color) {
    const g = svg.__marks;
    el("path", { d: `M ${x},${y} v 5 M ${x - 7},${y + 5} h 14 M ${x - 4.5},${y + 8} h 9 M ${x - 2},${y + 11} h 4`,
      stroke: color || DIM, "stroke-width": 1.4, fill: "none" }, g);
  }
  function resistorH(svg, x, y, w, color) {
    const n = 6, step = w / n;
    let d = `M ${x},${y}`;
    for (let i = 0; i < n; i++) d += ` L ${x + step * (i + 0.5)},${y + (i % 2 ? 4.5 : -4.5)}`;
    d += ` L ${x + w},${y}`;
    el("path", { d, fill: "none", stroke: color || INK, "stroke-width": 1.6, "stroke-linejoin": "round" }, svg.__marks);
  }

  // ---------------------------------------------------------------- output topology symbols (inside source box)
  function opamp(g, x, y, w, label, color) {
    el("path", { d: `M ${x},${y - w / 2} L ${x + w},${y} L ${x},${y + w / 2} Z`, fill: "#0f172a", stroke: color || INK, "stroke-width": 1.2 }, g);
    if (label) text(g, x + w * 0.3, y + 2.5, label, { "font-size": 6.5, fill: color || INK, "text-anchor": "middle" });
  }
  function coil(g, x, y0, y1, bulgeRight) {
    const n = 4, h = (y1 - y0) / n, s = bulgeRight ? 1 : 0;
    let d = `M ${x},${y0}`;
    for (let i = 0; i < n; i++) d += ` a ${h / 2},${h / 2} 0 0 ${s} 0,${h}`;
    el("path", { d, fill: "none", stroke: INK, "stroke-width": 1.3 }, g);
  }
  function rH(g, x, y, w) {
    const n = 6, step = w / n;
    let d = `M ${x},${y}`;
    for (let i = 0; i < n; i++) d += ` L ${x + step * (i + 0.5)},${y + (i % 2 ? 3.5 : -3.5)}`;
    d += ` L ${x + w},${y}`;
    el("path", { d, fill: "none", stroke: INK, "stroke-width": 1.2 }, g);
  }
  function line(g, d, color, w) { el("path", { d, fill: "none", stroke: color || DIM, "stroke-width": w || 1 }, g); }
  function outLabel(g, x, y, str, color) { text(g, x, y + 2.5, str, { "font-size": 6.5, fill: color, "font-weight": 900 }); }
  function gnd(g, x, y) { line(g, `M ${x},${y} v 4 M ${x - 5},${y + 4} h 10 M ${x - 3},${y + 6.5} h 6 M ${x - 1},${y + 9} h 2`, DIM, 1.1); }

  // Symbols are drawn in the box region x 12..80; outputs labelled with the pin / contact they feed.
  const TOPO = {
    pushpull(g) {
      opamp(g, 22, 82, 22, "+1"); opamp(g, 22, 118, 22, "−1");
      line(g, "M 12,100 h 4 M 16,82 v 36 M 16,82 h 6 M 16,118 h 6", DIM);
      line(g, "M 44,82 h 20", C.xlr[2], 1.4); outLabel(g, 66, 82, "2", C.xlr[2]);
      line(g, "M 44,118 h 20", C.xlr[3], 1.4); outLabel(g, 66, 118, "3", C.xlr[3]);
      gnd(g, 30, 140); outLabel(g, 38, 146, "1", C.xlr[1]);
      text(g, 12, 168, "two drivers", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "(ground-referenced)", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    impbal(g) {
      opamp(g, 16, 82, 22, "+1");
      line(g, "M 38,82 h 4", INK); rH(g, 42, 82, 14); line(g, "M 56,82 h 8", C.xlr[2], 1.4); outLabel(g, 66, 82, "2", C.xlr[2]);
      line(g, "M 64,118 h -8", C.xlr[3], 1.4); rH(g, 42, 118, 14); line(g, "M 42,118 h -6", INK); gnd(g, 36, 118);
      outLabel(g, 66, 118, "3", C.xlr[3]);
      gnd(g, 22, 140); outLabel(g, 30, 146, "1", C.xlr[1]);
      text(g, 12, 168, "one driver + R;", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "Pin 3 = R to gnd", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    xfmr(g) {
      coil(g, 36, 80, 120, false); coil(g, 46, 80, 120, true);
      line(g, "M 40,78 v 44 M 42,78 v 44", INK, 1);
      line(g, "M 36,80 h -18 M 36,120 h -18", DIM); text(g, 12, 102, "in", { "font-size": 6.5, fill: DIM });
      line(g, "M 46,80 h 18", C.xlr[2], 1.4); outLabel(g, 66, 80, "2", C.xlr[2]);
      line(g, "M 46,120 h 18", C.xlr[3], 1.4); outLabel(g, 66, 120, "3", C.xlr[3]);
      gnd(g, 30, 140); outLabel(g, 38, 146, "1", C.xlr[1]);
      text(g, 12, 168, "floating secondary", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "(no ground ref.)", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    xfmr2(g) {
      coil(g, 20, 84, 116, false); coil(g, 28, 84, 116, true); line(g, "M 23.5,82 v 36 M 25,82 v 36", INK, 1);
      coil(g, 42, 84, 116, false); coil(g, 50, 84, 116, true); line(g, "M 45.5,82 v 36 M 47,82 v 36", INK, 1);
      line(g, "M 28,84 h 14 M 28,116 h 14", DIM);
      line(g, "M 20,84 h -6 M 20,116 h -6", DIM);
      line(g, "M 50,84 h 4 v -4 h 10", C.xlr[2], 1.4); outLabel(g, 66, 80, "2", C.xlr[2]);
      line(g, "M 50,116 h 4 v 4 h 10", C.xlr[3], 1.4); outLabel(g, 66, 120, "3", C.xlr[3]);
      gnd(g, 30, 140); outLabel(g, 38, 146, "1", C.xlr[1]);
      text(g, 12, 168, "two transformers", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "(galvanic isolation)", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    xcoupled(g) {
      opamp(g, 22, 82, 22, "+"); opamp(g, 22, 118, 22, "−");
      line(g, "M 12,100 h 4 M 16,82 v 36 M 16,82 h 6 M 16,118 h 6", DIM);
      line(g, "M 44,82 h 20", C.xlr[2], 1.4); outLabel(g, 66, 82, "2", C.xlr[2]);
      line(g, "M 44,118 h 20", C.xlr[3], 1.4); outLabel(g, 66, 118, "3", C.xlr[3]);
      // cross-coupled feedback
      el("path", { d: "M 54,82 L 30,112 M 54,118 L 30,88", stroke: "#a78bfa", "stroke-width": 1, "stroke-dasharray": "2 2", fill: "none" }, g);
      gnd(g, 30, 140); outLabel(g, 38, 146, "1", C.xlr[1]);
      text(g, 12, 168, "cross-coupled pair", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "(emulates a winding)", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    stereo(g) {
      opamp(g, 16, 76, 20, "L"); opamp(g, 16, 108, 20, "R");
      line(g, "M 36,76 h 14", C.trs35.T, 1.4); outLabel(g, 52, 76, "T", C.trs35.T);
      line(g, "M 36,108 h 14", C.trs35.R, 1.4); outLabel(g, 52, 108, "R", C.trs35.R);
      gnd(g, 26, 130); outLabel(g, 34, 136, "S", "#94a3b8");
      text(g, 12, 168, "phone / laptop", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "stereo out (unbal.)", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    eurorack(g) {
      opamp(g, 14, 82, 20, "+1");
      line(g, "M 34,82 h 2", INK); rH(g, 36, 82, 12); line(g, "M 48,82 h 6", C.trs35.T, 1.4); outLabel(g, 56, 82, "T", C.trs35.T);
      text(g, 36, 74, "1 kΩ", { "font-size": 6, fill: DIM, "font-weight": 600 });
      gnd(g, 26, 110); outLabel(g, 34, 116, "S", "#94a3b8");
      text(g, 12, 168, "Eurorack module", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "10 Vpp, Zout ≈ 1 kΩ", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
    unbal(g) {
      opamp(g, 14, 82, 20, "+1");
      line(g, "M 34,82 h 18", C.q.T, 1.4); outLabel(g, 56, 82, "T", C.q.T);
      gnd(g, 26, 110); outLabel(g, 34, 116, "S", "#94a3b8");
      text(g, 12, 168, "unbalanced out", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
      text(g, 12, 177, "(guitar, hi-fi, DJ)", { "font-size": 6.5, fill: DIM, "font-weight": 600 });
    },
  };

  function box(svg, x, y, w, h, label, sub) {
    el("rect", { x, y, width: w, height: h, fill: "#070d18", stroke: FAINT, "stroke-width": 1 }, svg.__boxes);
    text(svg.__boxes, x + 5, y + 10, label, { "font-size": 7, fill: DIM, "font-weight": 900, "letter-spacing": "0.06em" });
    if (sub) text(svg.__boxes, x + 5, y + 19, sub, { "font-size": 6.5, fill: "#64748b", "font-weight": 600 });
  }
  function sourceBox(svg, row, w) {
    box(svg, 6, 26, w, 166, "SOURCE", null);
    const g = el("g", {}, svg.__boxes);
    TOPO[row.topo](g);
  }

  // ---------------------------------------------------------------- layouts
  const LAYOUT = {
    // Rows 1–5: XLR-3 male output face -> 1/4" TS plug into an unbalanced input.
    "xlr-ts"(svg, row) {
      sourceBox(svg, row, 144);
      text(svg.__boxes, 112, 70, "XLR-3 OUT", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 900 });
      const X = xlrFace(svg.__conn, 112, 104, 0.95);
      box(svg, 362, 26, 72, 166, "UNBAL IN", "1/4″ TS jack");
      ground(svg, 398, 150);
      text(svg.__marks, 398, 176, "input gnd", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 600 });
      const T = plug(svg.__conn, "q", 247, 134, 0.62, 1, { mono: true, labels: [["T", "below"]] });
      text(svg.__marks, T.S.top.x - 12, 178, "S", { fill: C.q.S, "font-size": 8, "font-weight": 900, "text-anchor": "middle" });
      text(svg.__marks, 280, 190, "1/4″ TS plug", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 700 });

      const lanes = { 2: X[2].right, 3: X[3].right };
      const w = (from, to) => {
        const cf = X[from].color, ct = T[to].color;
        if (from === "1") {
          const a = X[1].left;
          wire(svg, [a, P(78, a.y), P(78, 158), P(T.S.bot.x, 158), T.S.bot], cf, ct);
        } else {
          const a = lanes[from], b = T[to].top;
          wire(svg, [a, P(b.x, a.y), b], cf, ct);
        }
      };
      row.wires.forEach(([f, t]) => w(f, t));

      const p3 = X[3].right;
      if (row.pin3 === "float") {
        wire(svg, [p3, P(172, p3.y)], C.xlr[3], C.xlr[3]);
        floatMark(svg, 176, p3.y, "FLOAT — do not short");
      } else if (row.pin3 === "tie-or-float") {
        wire(svg, [p3, P(166, p3.y), P(166, 158)], C.xlr[3], C.xlr[1], { dash: "4 2.5" });
        dot(svg, 166, 158, C.xlr[1]);
        text(svg.__marks, 172, p3.y + 14, "jumper 3→1 at the XLR", { "font-size": 7, fill: OK });
        text(svg.__marks, 172, p3.y + 23, "(or leave Pin 3 floating)", { "font-size": 7, fill: DIM, "font-weight": 600 });
      } else if (row.pin3 === "short") {
        wire(svg, [P(160, p3.y), P(160, 158)], C.xlr[3], C.xlr[1], { w: 3 });
        dot(svg, 160, p3.y, C.xlr[3]); dot(svg, 160, 158, C.xlr[1]);
        text(svg.__marks, 166, p3.y + 18, "jumper: short 3→1", { "font-size": 7, fill: OK });
      } else if (row.pin3 === "bond-sleeve") {
        text(svg.__marks, 304, 112, "3 + 1 bonded on sleeve", { "font-size": 7, fill: OK, "text-anchor": "end" });
      } else if (row.pin3 === "ground-dest") {
        text(svg.__marks, 304, 112, "3 tied to ground here", { "font-size": 7, fill: OK, "text-anchor": "end" });
        text(svg.__marks, 304, 170, "(destination end)", { "font-size": 6.5, fill: DIM, "text-anchor": "end", "font-weight": 600 });
      }
      X._numbers();
    },

    // Row 6: 3.5 mm stereo TRS plug -> Y split -> two XLR plugs (L, R).
    "trs-2xlr"(svg, row) {
      sourceBox(svg, row, 114);
      const S = plug(svg.__conn, "trs35", 226, 106, 0.75, -1, { labels: [["T", "below"], ["R", "above"], ["S", "below"]] });
      text(svg.__marks, 190, 136, "3.5 mm TRS plug", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 700 });
      box(svg, 336, 26, 98, 166, "BAL INPUTS", null);
      const L = xlrFace(svg.__conn, 382, 66, 0.72);
      const R = xlrFace(svg.__conn, 382, 150, 0.72);
      text(svg.__marks, 428, 70, "L", { fill: C.trs35.T, "font-size": 10, "font-weight": 900, "text-anchor": "end" });
      text(svg.__marks, 428, 154, "R", { fill: C.trs35.R, "font-size": 10, "font-weight": 900, "text-anchor": "end" });
      const tC = C.trs35, J = 346;
      // Tip -> L pin 2 (over the top), Ring -> R pin 2 (under the bottom)
      wire(svg, [S.T.top, P(S.T.top.x, 22), P(L[2].top.x, 22), L[2].top], tC.T, C.xlr[2]);
      wire(svg, [S.R.bot, P(S.R.bot.x, 186), P(R[2].bot.x + 0, 186), R[2].bot], tC.R, C.xlr[2]);
      // Sleeve splits (Y): up to L 1 & 3, down to R 1 & 3
      wire(svg, [S.S.top, P(S.S.top.x, L[3].left.y), L[3].left], tC.S, C.xlr[3]);
      wire(svg, [P(J, L[3].left.y), P(J, L[1].left.y), L[1].left], tC.S, C.xlr[1]);
      wire(svg, [S.S.bot, P(S.S.bot.x, R[3].left.y), R[3].left], tC.S, C.xlr[3]);
      wire(svg, [P(J, R[3].left.y), P(J, R[1].left.y), R[1].left], tC.S, C.xlr[1]);
      dot(svg, J, L[3].left.y, DIM); dot(svg, J, R[3].left.y, DIM);
      // Y glyph
      el("path", { d: `M 240,106 h 18 l 12,-12 M 258,106 l 12,12`, stroke: OK, "stroke-width": 1.4, fill: "none" }, svg.__marks);
      text(svg.__marks, 274, 109, "Y split", { fill: OK, "font-size": 8, "font-weight": 900 });
      text(svg.__marks, 272, 82, "S → pins 1 & 3", { fill: DIM, "font-size": 6.5, "font-weight": 700 });
      text(svg.__marks, 272, 138, "S → pins 1 & 3", { fill: DIM, "font-size": 6.5, "font-weight": 700 });
      L._numbers(); R._numbers();
    },

    // Row 7: 3.5 mm stereo TRS plug -> single XLR into a differential receiver (cancellation).
    "trs-xlr-cancel"(svg, row) {
      sourceBox(svg, row, 114);
      const S = plug(svg.__conn, "trs35", 226, 130, 0.75, -1, { labels: [["T", "below"], ["R", "above"], ["S", "below"]] });
      text(svg.__marks, 190, 160, "3.5 mm TRS plug", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 700 });
      el("rect", { x: 300, y: 26, width: 134, height: 166, fill: "#1a0606", stroke: DANGER, "stroke-width": 1 }, svg.__boxes);
      text(svg.__boxes, 305, 36, "BAL INPUT (mono)", { "font-size": 7, fill: DANGER, "font-weight": 900 });
      const X = xlrFace(svg.__conn, 336, 100, 1.0);
      wire(svg, [S.T.top, P(S.T.top.x, 52), P(X[2].top.x, 52), X[2].top], C.trs35.T, C.xlr[2]);
      wire(svg, [S.S.top, P(S.S.top.x, X[1].left.y), X[1].left], C.trs35.S, C.xlr[1]);
      wire(svg, [S.R.bot, P(S.R.bot.x, 184), P(X[3].bot.x, 184), X[3].bot], DANGER, DANGER, { w: 2.8 });
      text(svg.__marks, 238, 180, "Right lands on Pin 3 (−)", { fill: DANGER, "font-size": 7, "font-weight": 900, "text-anchor": "middle" });
      // differential receiver
      const g = svg.__marks;
      el("path", { d: "M 380,80 L 416,100 L 380,120 Z", fill: "#0f172a", stroke: DANGER, "stroke-width": 1.4 }, g);
      text(g, 384, 94, "+", { fill: C.xlr[2], "font-size": 9, "font-weight": 900 });
      text(g, 384, 113, "−", { fill: C.xlr[3], "font-size": 9, "font-weight": 900 });
      line(g, `M ${X[2].right.x},${X[2].right.y} H 380`, C.xlr[2], 1.2);
      line(g, `M ${X[3].right.x},${X[3].right.y} H 360 V 110 H 380`, C.xlr[3], 1.2);
      line(g, "M 416,100 h 12", DANGER, 1.4);
      text(g, 386, 140, "out = L − R", { fill: INK, "font-size": 8, "font-weight": 900, "text-anchor": "middle" });
      text(g, 386, 152, "centre (L = R) → 0 V", { fill: DANGER, "font-size": 7, "font-weight": 900, "text-anchor": "middle" });
      text(g, 386, 162, "vocals, kick, bass gone", { fill: DANGER, "font-size": 6.5, "font-weight": 700, "text-anchor": "middle" });
      el("path", { d: "M 380,72 L 420,128 M 420,72 L 380,128", stroke: DANGER, "stroke-width": 1.2, opacity: 0.5 }, g);
      X._numbers();
    },

    // Row 8: 3.5 mm mono TS (Eurorack) -> XLR, Pin 3 to ground through Z_match.
    "ts35-xlr-z"(svg, row) {
      sourceBox(svg, row, 114);
      const S = plug(svg.__conn, "trs35", 226, 130, 0.75, -1, { mono: true, labels: [["T", "below"], ["S", "below"]] });
      text(svg.__marks, 190, 160, "3.5 mm TS plug", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 700 });
      box(svg, 336, 26, 98, 166, "BAL INPUT", "XLR-3");
      const X = xlrFace(svg.__conn, 384, 104, 1.0);
      wire(svg, [S.T.top, P(S.T.top.x, 56), P(X[2].top.x, 56), X[2].top], C.trs35.T, C.xlr[2]);
      wire(svg, [S.S.top, P(S.S.top.x, X[1].left.y), X[1].left], C.trs35.S, C.xlr[1]);
      const jx = 268, y3 = X[3].left.y;
      wire(svg, [P(jx, X[1].left.y), P(jx, y3), P(282, y3)], C.xlr[1], C.xlr[1]);
      resistorH(svg, 282, y3, 32, INK);
      wire(svg, [P(314, y3), X[3].left], C.xlr[3], C.xlr[3]);
      dot(svg, jx, X[1].left.y, C.xlr[1]);
      text(svg.__marks, 298, y3 + 16, "Z_match ≈ Zout", { fill: "#38bdf8", "font-size": 7.5, "font-weight": 900, "text-anchor": "middle" });
      text(svg.__marks, 298, y3 + 26, "(e.g. 1 kΩ) Pin 3 → gnd", { fill: DIM, "font-size": 6.5, "font-weight": 700, "text-anchor": "middle" });
      X._numbers();
    },

    // Row 9: unbalanced 1/4" TS (or RCA) output -> balanced XLR input, pseudo-balanced cable.
    "ts-xlr-pseudo"(svg, row) {
      sourceBox(svg, row, 114);
      const S = plug(svg.__conn, "q", 228, 132, 0.58, -1, { mono: true, labels: [["T", "below"], ["S", "below"]] });
      text(svg.__marks, 176, 158, "1/4″ TS plug", { "font-size": 6.5, fill: DIM, "text-anchor": "middle", "font-weight": 700 });
      const R = plug(svg.__conn, "rca", 196, 178, 0.5, -1, {});
      text(svg.__marks, 202, 175, "or RCA:", { "font-size": 6.5, fill: DIM, "font-weight": 700 });
      text(svg.__marks, 202, 184, "centre = T, shell = S", { "font-size": 6.5, fill: DIM, "font-weight": 700 });
      void R;
      box(svg, 336, 26, 98, 166, "BAL INPUT", "XLR-3");
      const X = xlrFace(svg.__conn, 384, 104, 1.0);
      wire(svg, [S.T.top, P(S.T.top.x, 56), P(X[2].top.x, 56), X[2].top], C.q.T, C.xlr[2]);
      wire(svg, [S.S.top, P(S.S.top.x, X[3].left.y), X[3].left], C.q.S, C.xlr[3]);
      // shield: Pin 1 at the balanced input only, open at the source end
      wire(svg, [X[1].left, P(214, X[1].left.y)], C.xlr[1], C.xlr[1], { dash: "5 3" });
      floatMark(svg, 210, X[1].left.y, null);
      text(svg.__marks, 214, X[1].left.y - 6, "shield: Pin 1 only, open at source", { fill: DIM, "font-size": 6.5, "font-weight": 700 });
      text(svg.__marks, 240, X[3].left.y + 12, "S → Pin 3 at the source plug", { fill: "#38bdf8", "font-size": 6.5, "font-weight": 900 });
      X._numbers();
    },
  };

  // ---------------------------------------------------------------- build
  function readTable(table) {
    const out = [];
    if (!table) return out;
    table.querySelectorAll("tbody tr").forEach((tr) => {
      const cells = Array.from(tr.cells).filter((td) => !td.classList.contains("hess-row-no"));
      out.push(cells.map((c) => c.textContent.replace(/\s+/g, " ").trim()));
    });
    return out;
  }

  function buildSvg(row) {
    const svg = el("svg", { viewBox: "0 0 440 200", width: "100%", role: "img",
      "aria-label": `Wiring diagram ${row.n}: ${row.title}` });
    el("rect", { x: 0, y: 0, width: 440, height: 200, fill: BG }, svg);
    svg.__defs = el("defs", {}, svg);
    svg.__boxes = el("g", {}, svg);
    svg.__wires = el("g", {}, svg);
    svg.__conn = el("g", {}, svg);
    svg.__marks = el("g", {}, svg);
    // Wires are drawn over the plug bodies only at their contact; put connectors under wires except XLR numbers.
    svg.insertBefore(svg.__conn, svg.__wires);
    // treatment tag across the top
    const tag = el("g", {}, svg);
    text(tag, 220, 16, row.tag, { fill: row.tagColor, "font-size": 8.5, "font-weight": 900, "text-anchor": "middle", "letter-spacing": "0.04em" });
    LAYOUT[row.layout](svg, row);
    return svg;
  }

  function init() {
    const sec = document.getElementById("tutorials-section");
    if (!sec || document.getElementById("hess-wiring")) return;
    const wrap = sec.querySelector(".table-responsive");
    const table = wrap && wrap.querySelector("table.alignment-table");
    if (!wrap || !table) return;
    const cells = readTable(table);

    const block = document.createElement("div");
    block.id = "hess-wiring";
    block.className = "hess-wiring";
    block.innerHTML =
      '<h3 class="hess-wiring-title">Wiring diagrams for the compatibility matrix</h3>' +
      '<p class="hess-wiring-lead">One diagram per table row, numbered to match. Each conductor is shaded from the colour of the contact it leaves to the colour of the contact it lands on (plug colours as in the connector anatomy below: XLR <b style="color:#94a3b8">1 shield</b> · <b style="color:#38bdf8">2 hot</b> · <b style="color:#f43f5e">3 cold</b>; 1/4″ <b style="color:#facc15">tip</b> · <b style="color:#f43f5e">ring</b> · <b style="color:#64748b">sleeve</b>; 3.5 mm <b style="color:#38bdf8">tip L</b> · <b style="color:#f43f5e">ring R</b>; RCA <b style="color:#fb923c">centre</b>). <b style="color:#ef4444">×</b> = contact left open; dots = joints; a straight bar between pins = jumper.</p>' +
      '<div class="hess-wiring-grid"></div>';
    const grid = block.querySelector(".hess-wiring-grid");

    ROWS.forEach((row, i) => {
      const c = cells[i] || [];
      const treat = c[2] || row.treat;
      const level = c[3] || row.level;
      const fig = document.createElement("figure");
      fig.className = "hess-wiring-fig" + (row.pin3 === "cancel" ? " is-danger" : "");
      fig.id = "hess-wiring-" + row.n;
      const head = document.createElement("div");
      head.className = "hess-wiring-head";
      head.innerHTML = `<a class="hess-wiring-no" href="#hess-row-${row.n}" title="Go to table row ${row.n}">${row.n}</a>` +
        `<span class="hess-wiring-name"></span>`;
      head.querySelector(".hess-wiring-name").textContent = row.title;
      fig.appendChild(head);
      fig.appendChild(buildSvg(row));
      const cap = document.createElement("figcaption");
      cap.innerHTML = '<span class="hw-k">Pin 3 / treatment</span> <span class="hw-treat"></span>' +
        '<span class="hw-k">Level</span> <span class="hw-level"></span>' +
        `<a class="hw-back" href="#hess-row-${row.n}">↑ row ${row.n} in the table</a>`;
      cap.querySelector(".hw-treat").textContent = treat;
      cap.querySelector(".hw-level").textContent = level;
      fig.appendChild(cap);
      grid.appendChild(fig);
    });

    wrap.parentNode.insertBefore(block, wrap.nextSibling);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
