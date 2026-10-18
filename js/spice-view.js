/**
 * spice-view.js — Ctrl+click (⌘+click) a circuit to see how its SPICE model is built
 *
 * - Every diagram the rack probes (SCHEMATIC_CONFIGS in floating-meters.js) has a netlist here,
 *   generated from the circuit's current control values.
 * - The test-point table maps each probe key (data-probe-target) to its SPICE node and says how it
 *   is measured: V(node) to chassis (node 0) or V(a,b) across the pair, with the live reading.
 */

const SQ2 = Math.SQRT2;
const num = (id, fallback) => {
  const v = parseFloat(document.getElementById(id)?.value);
  return Number.isFinite(v) ? v : fallback;
};
const f3 = (v) => (Math.abs(v) >= 100 ? v.toFixed(0) : Math.abs(v) >= 1 ? v.toFixed(3) : v.toPrecision(3));
const genFreq = () => (window.signalGenerator ? window.signalGenerator.freq : 1000);
const lineVrms = () => (window.floatingMeterDock && window.floatingMeterDock.lineVrms) || 1.228;
const tran = (f) => `.tran ${(1e6 / f / 50).toPrecision(3)}u ${(5e3 / f).toPrecision(3)}m   ; five cycles of the generator`;

// Each builder returns { title, about, netlist: [lines], points: [{ key, node, how }] }
const SPICE_MODELS = {
  "pp-schematic-svg": () => {
    const vin = num("pp-vin", 1.2), rout = num("pp-rout", 50), rload = num("pp-rload", 600);
    const f = genFreq();
    const short = document.getElementById("pp-short-pin3")?.checked;
    return {
      title: "6.1 / Sec 4 · Push-pull active balanced output",
      about: "Two ideal op-amp stages (gain +1 and −1) drive Pin 2 and Pin 3 through equal series resistors into the receiver load.",
      netlist: [
        "* Push-pull active balanced output",
        `VIN  in  0   SIN(0 ${f3(vin * SQ2)} ${f})   ; ${f3(vin)} V RMS drive`,
        "EA1  a1  0   in 0  1      ; A1: non-inverting buffer",
        "EA2  a2  0   in 0 -1      ; A2: inverter",
        `RPO  a1  p2  ${rout}      ; Z_PO, Pin 2 series resistor`,
        `RRO  a2  p3  ${rout}      ; Z_RO, Pin 3 series resistor`,
        `RL   p2  p3  ${rload}     ; receiver input across the pair`,
        short ? "RSH  p3  0   1m        ; TS plug: Pin 3 shorted to chassis" : "* (TS short open)",
        tran(f),
        ".end"
      ],
      points: [
        { key: "pp-vin", node: "in", how: "V(in)" },
        { key: "pp-p2", node: "p2", how: "V(p2)" },
        { key: "pp-p3", node: "p3", how: "V(p3)" },
        { key: "pp-load", node: "p2, p3", how: "V(p2,p3)" }
      ]
    };
  },

  "ib-schematic-svg": () => {
    const vin = num("ib-vin", 1.2), rout = num("ib-rout", 50), rload = num("ib-rload", 600);
    const f = genFreq();
    return {
      title: "6.2 / Sec 5 · Impedance-balanced output",
      about: "One op-amp drives Pin 2; Pin 3 is a matching resistor to 0 V. Equal impedance to ground on both legs is what balances the line.",
      netlist: [
        "* Active impedance-balanced output",
        `VIN  in  0   SIN(0 ${f3(vin * SQ2)} ${f})`,
        "EA1  a1  0   in 0  1      ; the only driven leg",
        `RPO  a1  p2  ${rout}      ; Z_PO`,
        `RRO  p3  0   ${rout}      ; Z_RO: same impedance, no signal`,
        `RL   p2  p3  ${rload}`,
        tran(f),
        ".end"
      ],
      points: [
        { key: "ib-vin", node: "in", how: "V(in)" },
        { key: "ib-p2", node: "p2", how: "V(p2)" },
        { key: "ib-p3", node: "p3", how: "V(p3)" },
        { key: "ib-load", node: "p2, p3", how: "V(p2,p3)" }
      ]
    };
  },

  "xfmr-schematic-svg": () => {
    const st = (window.audioTransformerSim && window.audioTransformerSim.state) || {};
    const n1 = st.n1 || 1500, n2 = st.n2 || 1500, vin = st.vin || 1.23;
    const lp = 10;
    const ls = lp * Math.pow(n2 / n1, 2);
    const f = genFreq();
    return {
      title: "Sec 6 · Audio transformer",
      about: "Coupled inductors with turns ratio N2/N1. The secondary floats: a 1 GΩ leak only gives SPICE a DC path to ground.",
      netlist: [
        "* Audio transformer, floating secondary",
        `VIN  in   0    SIN(0 ${f3(vin * SQ2)} ${f})`,
        "RS   in   pa   50          ; generator source",
        `LP   pa   0    ${lp}       ; primary, ${n1} turns`,
        `LS   p2   p3   ${f3(ls)}   ; secondary, ${n2} turns`,
        "K1   LP   LS   0.999       ; coupling",
        "RLK  p3   0    1G          ; DC reference only",
        "RL   p2   p3   10k         ; receiver input",
        tran(f),
        ".end"
      ],
      points: [
        { key: "xfmr-vin", node: "in", how: "V(in)" },
        { key: "xfmr-p2", node: "p2", how: "V(p2)" },
        { key: "xfmr-p3", node: "p3", how: "V(p3)" },
        { key: "xfmr-load", node: "p2, p3", how: "V(p2,p3)" }
      ]
    };
  },

  "meyer-schematic-svg": () => {
    const vpo = num("meyer-vpo", 1), vgvd = num("meyer-vgvd", 1), zpo = num("meyer-zpo", 50), zro = num("meyer-zro", 50);
    const f = genFreq();
    return {
      title: "Sec 7 · Jim Meyer Thevenin CMRR bench",
      about: "Thevenin source (V_PO, V_RO with Z_PO, Z_RO) into a receiver whose ground sits V_GVD away from the source ground. Any ΔZ turns that ground voltage into differential error.",
      netlist: [
        "* Meyer 3-impedance Thevenin model",
        `VPO  sp   0    SIN(0 ${f3(vpo * SQ2)} ${f})`,
        "ERO  sr   0    sp 0 -1",
        `RPO  sp   p2   ${zpo}      ; Z_PO`,
        `RRO  sr   p3   ${zro}      ; Z_RO  (ΔZ = ${Math.abs(zpo - zro)} Ω)`,
        `VGVD rxg  0    SIN(0 ${f3(vgvd * SQ2)} 60)   ; ground voltage difference`,
        "RCM2 p2   rxg  50k         ; receiver common-mode Z, Pin 2",
        "RCM3 p3   rxg  50k         ; receiver common-mode Z, Pin 3",
        "RDM  p2   p3   20k         ; receiver differential input",
        tran(Math.min(f, 60)),
        ".end"
      ],
      points: [
        { key: "meyer-vpo", node: "sp", how: "V(sp)" },
        { key: "meyer-p2", node: "p2", how: "V(p2)" },
        { key: "meyer-p3", node: "p3", how: "V(p3)" },
        { key: "meyer-diff", node: "p2, p3", how: "V(p2,p3)" },
        { key: "meyer-vgvd", node: "rxg", how: "V(rxg)" }
      ]
    };
  },

  "circuit-6-5": () => ({
    title: "6.5 · Cross-coupled output",
    about: "Two op-amps each sense the other output, so the pair behaves like a floating transformer secondary; modelled here at its ideal terminal behaviour.",
    netlist: [
      "* Cross-coupled electronically balanced output (ideal)",
      `VIN  in  0   SIN(0 ${f3((lineVrms() / 2) * SQ2)} ${genFreq()})`,
      "EA1  a1  0   in 0  1      ; A1 with cross feedback from A2",
      "EA2  a2  0   in 0 -1      ; A2 with cross feedback from A1",
      "RPO  a1  p2  50",
      "RRO  a2  p3  50",
      "RL   p2  p3  10k",
      tran(genFreq()),
      ".end"
    ],
    points: [
      { key: "6-5-vin", node: "in", how: "V(in)" },
      { key: "6-5-p2", node: "p2", how: "V(p2)" },
      { key: "6-5-p3", node: "p3", how: "V(p3)" },
      { key: "6-5-load", node: "p2, p3", how: "V(p2,p3)" }
    ]
  }),

  "circuit-6-6": () => ({
    title: "6.6 · Four-resistor differential receiver",
    about: "One op-amp, four resistors. CMRR is set entirely by how well R1/R2 matches R3/R4.",
    netlist: [
      "* Differential receiver, ideal op-amp (gain 1e6)",
      `VP2  p2  0   SIN(0 ${f3((lineVrms() / 2) * SQ2)} ${genFreq()})`,
      "EP3  p3  0   p2 0 -1",
      "R1   p3  nm  10k",
      "R2   nm  out 10k",
      "R3   p2  np  10k",
      "R4   np  0   10k",
      "EOP  out 0   np nm 1e6",
      tran(genFreq()),
      ".end"
    ],
    points: [
      { key: "6-6-p2", node: "p2", how: "V(p2)" },
      { key: "6-6-p3", node: "p3", how: "V(p3)" },
      { key: "6-6-out", node: "out", how: "V(out) = V(p2,p3)" }
    ]
  }),

  "circuit-6-7": () => ({
    title: "6.7 · Three-op-amp instrumentation receiver",
    about: "Two buffered inputs present >10 MΩ to each leg, then a difference stage. Source ΔZ hardly matters because the inputs draw almost no current.",
    netlist: [
      "* Instrumentation receiver (ideal op-amps)",
      `VP2  p2  0   SIN(0 ${f3((lineVrms() / 2) * SQ2)} ${genFreq()})`,
      "EP3  p3  0   p2 0 -1",
      "RIN2 p2  0   10Meg         ; common-mode input Z, Pin 2",
      "RIN3 p3  0   10Meg         ; common-mode input Z, Pin 3",
      "EB1  b1  0   p2 0 1        ; input buffer A1",
      "EB2  b2  0   p3 0 1        ; input buffer A2",
      "R1   b2  nm  10k",
      "R2   nm  out 10k",
      "R3   b1  np  10k",
      "R4   np  0   10k",
      "EOP  out 0   np nm 1e6     ; difference stage A3",
      tran(genFreq()),
      ".end"
    ],
    points: [
      { key: "6-7-p2", node: "p2", how: "V(p2)" },
      { key: "6-7-p3", node: "p3", how: "V(p3)" },
      { key: "6-7-out", node: "out", how: "V(out) = V(p2,p3)" }
    ]
  }),

  "circuit-6-8": () => ({
    title: "6.8 · Active driver into a transformer",
    about: "A push-pull op-amp pair drives a 1:1 transformer; the Faraday shield returns to Pin 1 and the secondary floats.",
    netlist: [
      "* Hybrid active-transformer output",
      `VIN  in  0   SIN(0 ${f3((lineVrms() / 2) * SQ2)} ${genFreq()})`,
      "EA1  a1  0   in 0  1",
      "EA2  a2  0   in 0 -1",
      "R1   a1  pa  10",
      "R2   a2  pb  10",
      "LP   pa  pb  10",
      "LS   p2  p3  10",
      "K1   LP  LS  0.999",
      "RLK  p3  p1  1G           ; DC reference via the shield",
      "RP1  p1  0   1m           ; Pin 1 bonded to chassis",
      "RL   p2  p3  10k",
      tran(genFreq()),
      ".end"
    ],
    points: [
      { key: "6-8-vin", node: "in", how: "V(in)" },
      { key: "6-8-p2", node: "p2", how: "V(p2)" },
      { key: "6-8-p3", node: "p3", how: "V(p3)" },
      { key: "6-8-load", node: "p2, p3", how: "V(p2,p3)" },
      { key: "6-8-p1", node: "p1", how: "V(p1)" }
    ]
  }),

  "qtp-sim-svg-container": () => {
    const st = window.qtpSimulator ? window.qtpSimulator.getWireState() : {};
    const half = f3((lineVrms() / 2) * SQ2);
    const f = genFreq();
    const pairs = [["sun", 2, 1], ["sky", 4, 5], ["grass", 6, 3], ["earth", 8, 7]];
    const lines = ["* AES72 quad twisted pair: 4 balanced links, fault applied from the example in view"];
    pairs.forEach(([p, hot, cold]) => {
      const hotOk = st[`${p}_hot`] !== false, coldOk = st[`${p}_cold`] !== false;
      const flip = p === "sun" && st.sunFlipped, legFlip = p === "sun" && st.sunColdFlipped;
      lines.push(`V${p}H  ${p}h 0   SIN(0 ${flip ? "-" : ""}${half} ${f})   ; P${hot}+`);
      lines.push(`V${p}C  ${p}c 0   SIN(0 ${flip || legFlip ? "" : "-"}${half} ${f})   ; P${cold}−`);
      lines.push(hotOk ? `R${p}H  ${p}h p${hot} 50` : `* R${p}H open: P${hot} dropped`);
      lines.push(coldOk ? `R${p}C  ${p}c p${cold} 50` : `* R${p}C open: P${cold} dropped`);
      lines.push(`RL${p}  p${hot} p${cold} 10k`);
    });
    if (st.shield === false) lines.push("VHUM hum 0 SIN(0 0.45 60)   ; shield lifted: common-mode hum on every leg (coupled per leg)");
    lines.push(tran(f), ".end");
    return {
      title: "4.2 · Multichannel snake (QTP faults)",
      about: "Four independent balanced links. The fault from the example in the middle of the screen opens, flips or unshields conductors.",
      netlist: lines,
      points: pairs.flatMap(([p, hot, cold]) => [
        { key: `qtp-${p}-hot`, node: `p${hot}`, how: `V(p${hot})` },
        { key: `qtp-${p}-cold`, node: `p${cold}`, how: `V(p${cold})` }
      ])
    };
  }
};

// Diagrams without a circuit model (grounding and wiring illustrations) still list their test points
function genericModel(cfg) {
  const keys = [...new Set([cfg.scope1_ch1, cfg.scope1_ch2, cfg.scope2_ch3, cfg.scope2_ch4, cfg.dmm1, cfg.dmm2, cfg.vu1, cfg.vu2, cfg.vu3, cfg.vu4, ...(cfg.wires || [])].filter(Boolean))];
  return {
    title: cfg.name,
    about: "A wiring / grounding illustration rather than an amplifier circuit: each test point's voltage comes from the behavioural model in floating-meters.js (getSignalForTarget), not from a netlist.",
    netlist: ["* No netlist: behavioural model only", ...keys.map(k => `* ${k}`)],
    points: keys.map(k => ({ key: k, node: "—", how: window.floatingMeterDock?.isAcrossKey(k) ? "across the pair" : "to chassis (0 V)" }))
  };
}

class SpiceView {
  constructor() {
    this.modal = null;
    document.addEventListener("click", (e) => this.onClick(e), true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal && !this.modal.hidden) this.close();
    });
  }

  configFor(el) {
    if (typeof SCHEMATIC_CONFIGS === "undefined") return null;
    return SCHEMATIC_CONFIGS.find(cfg => {
      const root = document.getElementById(cfg.id);
      return root && root.contains(el);
    }) || null;
  }

  onClick(e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    const cfg = this.configFor(e.target);
    if (!cfg) return;
    e.preventDefault();
    e.stopPropagation();
    this.open(cfg);
  }

  build() {
    const m = document.createElement("div");
    m.id = "spice-view";
    m.className = "spice-view";
    m.hidden = true;
    m.innerHTML = `
      <div class="spice-panel" role="dialog" aria-label="SPICE model">
        <div class="spice-head">
          <span class="spice-badge">SPICE</span>
          <span class="spice-title"></span>
          <button type="button" class="spice-btn" data-spice="copy">Copy netlist</button>
          <button type="button" class="spice-btn" data-spice="close">✕</button>
        </div>
        <p class="spice-about"></p>
        <pre class="spice-netlist"></pre>
        <table class="spice-points">
          <thead><tr><th>Test point</th><th>SPICE node</th><th>Measured as</th><th>Reading now</th></tr></thead>
          <tbody></tbody>
        </table>
        <p class="spice-foot">Node 0 is chassis (AES48 Pin 1). Values follow the circuit's current controls. Ctrl+click (⌘+click) any probed circuit to open this view.</p>
      </div>`;
    m.addEventListener("click", (e) => {
      if (e.target === m || e.target.closest('[data-spice="close"]')) this.close();
      if (e.target.closest('[data-spice="copy"]')) this.copy(e.target.closest("button"));
    });
    document.body.appendChild(m);
    this.modal = m;
  }

  open(cfg) {
    if (!this.modal) this.build();
    const model = (SPICE_MODELS[cfg.id] || (() => genericModel(cfg)))();
    const esc = (s) => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    this.modal.querySelector(".spice-title").textContent = model.title;
    this.modal.querySelector(".spice-about").textContent = model.about;
    this.modal.querySelector(".spice-netlist").textContent = model.netlist.join("\n");
    const dock = window.floatingMeterDock;
    this.modal.querySelector("tbody").innerHTML = model.points.map(p => {
      const sig = dock ? dock.getSignalForTarget(p.key) : null;
      const reading = sig ? `${f3(sig.vRms)} V RMS · ${esc(sig.status || "")}` : "—";
      return `<tr><td><code>${esc(p.key)}</code></td><td><code>${esc(p.node)}</code></td><td><code>${esc(p.how)}</code></td><td>${reading}</td></tr>`;
    }).join("");
    this.modal.hidden = false;
  }

  close() {
    if (this.modal) this.modal.hidden = true;
  }

  copy(btn) {
    const text = this.modal.querySelector(".spice-netlist").textContent;
    const done = () => {
      btn.textContent = "Copied";
      setTimeout(() => (btn.textContent = "Copy netlist"), 1500);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, () => {});
    else {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        done();
      } finally {
        ta.remove();
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.spiceView = new SpiceView();
});
