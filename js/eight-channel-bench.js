/**
 * eight-channel-bench.js — 8-Line Test Bench (Right Rack "8-CH" Tab) & Left Sidebar Line Selector
 *
 * Specifications:
 * 1. Eight balanced lines, CH1–CH8, each carrying its own identification tone at 100 Hz × channel
 *    (CH1 = 100 Hz, CH2 = 200 Hz … CH8 = 800 Hz) so every line is recognisable by ear and on the scope.
 * 2. Every line has its own mini oscilloscope and its own level meter (dBu bar + Vrms / Vpk digits),
 *    all eight visible at once with no scrolling.
 * 3. Four simple signal generators (GEN A–D: sine / square / triangle / sawtooth, frequency, level, on/off).
 *    Any line can be re-patched from its own tone to GEN A–D.
 * 3b. The generators live in the left sidebar and appear only while the 8-CH meters are showing.
 * 4. Line selector in the left Story sidebar: picking a line focuses it in the rack (enlarged row,
 *    edit strip for frequency / level / mute, optional audible monitor via Web Audio).
 * 5. Fixed 10 ms scope window: CH1 shows 1 cycle, CH8 shows 8 cycles.
 * 6. The multichannel breakout (AES59 DB25 → AES72 RJ45 → 8 × XLR/TRS) is wired to these meters:
 *    each breakout output gets a live wire to its meter row, and channel selection is shared both ways.
 */

const BENCH_CH_COLORS = ["#facc15", "#38bdf8", "#f43f5e", "#4ade80", "#a78bfa", "#fb923c", "#2dd4bf", "#f472b6"];
const BENCH_WAVES = [
  { id: "sine", glyph: "∿", crest: Math.SQRT2 },
  { id: "square", glyph: "⊓", crest: 1 },
  { id: "triangle", glyph: "⋀", crest: Math.sqrt(3) },
  { id: "sawtooth", glyph: "⩘", crest: Math.sqrt(3) }
];
const BENCH_WINDOW_MS = 10;
const BENCH_METER_MIN = -40;
const BENCH_METER_MAX = 24;

class EightChannelBench {
  constructor() {
    this.channels = Array.from({ length: 8 }, (_, i) => ({
      n: i + 1,
      freq: 100 * (i + 1),
      levelDbu: 4,
      src: "tone", // 'tone' | 'A' | 'B' | 'C' | 'D'
      muted: false,
      color: BENCH_CH_COLORS[i]
    }));

    this.generators = [
      { id: "A", on: true, wave: "sine", freq: 1000, levelDbu: 4 },
      { id: "B", on: true, wave: "square", freq: 440, levelDbu: 0 },
      { id: "C", on: true, wave: "triangle", freq: 60, levelDbu: -10 },
      { id: "D", on: false, wave: "sawtooth", freq: 2000, levelDbu: -6 }
    ];

    this.focus = 1; // 0 = all lines equal
    this.monitorOn = false;
    this.audioCtx = null;
    this.monOsc = null;
    this.monGain = null;
    this.panel = null;
    this.animFrame = null;
    this.init();
  }

  init() {
    this.panel = document.getElementById("rack-panel-8ch");
    if (!this.panel) return;
    this.renderPanel();
    this.buildSidebarSelector();
    this.focusLine(this.focus, false);
    this.initBreakoutLink();
    this.startLoop();
  }

  // ---------- Signal model ----------

  sourceFor(ch) {
    if (ch.src === "tone") return { wave: "sine", freq: ch.freq, levelDbu: ch.levelDbu, live: !ch.muted };
    const g = this.generators.find(x => x.id === ch.src);
    return { wave: g.wave, freq: g.freq, levelDbu: g.levelDbu, live: g.on && !ch.muted };
  }

  waveSample(wave, phase) {
    const p = phase - Math.floor(phase);
    switch (wave) {
      case "square": return p < 0.5 ? 1 : -1;
      case "triangle": return p < 0.5 ? 4 * p - 1 : 3 - 4 * p;
      case "sawtooth": return 2 * p - 1;
      default: return Math.sin(2 * Math.PI * p);
    }
  }

  levels(src) {
    if (!src.live) return { vrms: 0, vpk: 0, dbu: -Infinity };
    const vrms = 0.775 * Math.pow(10, src.levelDbu / 20);
    const crest = (BENCH_WAVES.find(w => w.id === src.wave) || BENCH_WAVES[0]).crest;
    return { vrms, vpk: vrms * crest, dbu: src.levelDbu };
  }

  fmtFreq(f) {
    return f >= 1000 ? `${(f / 1000).toFixed(f % 1000 === 0 ? 0 : 2)}k` : `${Math.round(f)}`;
  }

  // ---------- DOM ----------

  renderPanel() {
    const genHtml = this.generators.map(g => `
      <div class="bench-gen ${g.on ? "on" : ""}" data-gen="${g.id}">
        <div class="bench-gen-top">
          <span class="bench-gen-name">GEN ${g.id}</span>
          <button type="button" class="bench-gen-power" data-gen-power="${g.id}">${g.on ? "ON" : "OFF"}</button>
        </div>
        <div class="bench-gen-waves">
          ${BENCH_WAVES.map(w => `<button type="button" class="bench-wave-btn ${w.id === g.wave ? "active" : ""}" data-gen-wave="${g.id}" data-wave="${w.id}" title="${w.id}">${w.glyph}</button>`).join("")}
        </div>
        <div class="bench-gen-fields">
          <label><input type="number" class="bench-num" data-gen-freq="${g.id}" min="10" max="20000" step="10" value="${g.freq}"><span>Hz</span></label>
          <label><input type="number" class="bench-num" data-gen-level="${g.id}" min="-40" max="24" step="1" value="${g.levelDbu}"><span>dBu</span></label>
        </div>
      </div>`).join("");

    const rowHtml = this.channels.map(ch => `
      <div class="bench-line" data-line="${ch.n}" style="--line-color: ${ch.color};">
        <div class="bench-line-id">
          <span class="bench-line-name">CH${ch.n}</span>
          <select class="bench-src" data-line-src="${ch.n}" title="Source patched to CH${ch.n}">
            <option value="tone">${ch.freq} Hz</option>
            <option value="A">GEN A</option>
            <option value="B">GEN B</option>
            <option value="C">GEN C</option>
            <option value="D">GEN D</option>
          </select>
        </div>
        <canvas class="bench-scope" data-line-scope="${ch.n}"></canvas>
        <div class="bench-meter">
          <span class="bench-meter-dbu" data-line-dbu="${ch.n}">+4.0</span>
          <span class="bench-meter-v" data-line-v="${ch.n}">1.228 V</span>
          <canvas class="bench-meter-bar" data-line-bar="${ch.n}"></canvas>
        </div>
      </div>`).join("");

    this.genDock = document.createElement("div");
    this.genDock.id = "sidebar-gen-dock";
    this.genDock.className = "sidebar-gen-dock";
    this.genDock.innerHTML = `<div class="sidebar-line-title"><span>⚡ GENERATORS A–D</span></div><div class="bench-gens">${genHtml}</div>`;

    this.panel.innerHTML = `
      <div class="bench-lines">${rowHtml}</div>
      <div class="bench-edit" id="bench-edit">
        <span class="bench-edit-name" id="bench-edit-name">CH1</span>
        <label>TONE <input type="number" class="bench-num" id="bench-edit-freq" min="10" max="20000" step="10"><span>Hz</span></label>
        <label>LVL <input type="range" id="bench-edit-level" min="-40" max="24" step="1"></label>
        <button type="button" class="bench-edit-btn" id="bench-edit-mute">MUTE</button>
        <button type="button" class="bench-edit-btn" id="bench-edit-mon" title="Listen to the selected line">🔇 MON</button>
      </div>
    `;

    this.scopes = this.channels.map(ch => this.panel.querySelector(`[data-line-scope="${ch.n}"]`));
    this.bars = this.channels.map(ch => this.panel.querySelector(`[data-line-bar="${ch.n}"]`));
    this.bindPanel();
  }

  bindPanel() {
    const p = this.panel;
    const g = this.genDock;

    g.querySelectorAll("[data-gen-power]").forEach(btn => btn.addEventListener("click", () => {
      const gen = this.generators.find(x => x.id === btn.dataset.genPower);
      gen.on = !gen.on;
      btn.textContent = gen.on ? "ON" : "OFF";
      btn.closest(".bench-gen").classList.toggle("on", gen.on);
      this.updateMonitor();
    }));

    g.querySelectorAll("[data-gen-wave]").forEach(btn => btn.addEventListener("click", () => {
      const gen = this.generators.find(x => x.id === btn.dataset.genWave);
      gen.wave = btn.dataset.wave;
      this.genDock.querySelectorAll(`[data-gen-wave="${gen.id}"]`).forEach(b => b.classList.toggle("active", b === btn));
      this.updateMonitor();
    }));

    g.querySelectorAll("[data-gen-freq]").forEach(inp => inp.addEventListener("input", () => {
      const v = parseFloat(inp.value);
      if (!isNaN(v) && v > 0) this.generators.find(x => x.id === inp.dataset.genFreq).freq = Math.min(20000, v);
      this.updateMonitor();
    }));

    g.querySelectorAll("[data-gen-level]").forEach(inp => inp.addEventListener("input", () => {
      const v = parseFloat(inp.value);
      if (!isNaN(v)) this.generators.find(x => x.id === inp.dataset.genLevel).levelDbu = Math.max(-40, Math.min(24, v));
      this.updateMonitor();
    }));

    p.querySelectorAll("[data-line-src]").forEach(sel => sel.addEventListener("change", () => {
      this.channels[Number(sel.dataset.lineSrc) - 1].src = sel.value;
      this.updateMonitor();
    }));

    p.querySelectorAll(".bench-line").forEach(row => row.addEventListener("click", (e) => {
      if (e.target.closest("select")) return;
      const n = Number(row.dataset.line);
      this.focusLine(this.focus === n ? 0 : n, false);
    }));

    p.querySelector("#bench-edit-freq").addEventListener("input", (e) => {
      const ch = this.channels[this.focus - 1];
      const v = parseFloat(e.target.value);
      if (!ch || isNaN(v) || v <= 0) return;
      ch.freq = Math.min(20000, v);
      p.querySelector(`[data-line-src="${ch.n}"] option[value="tone"]`).textContent = `${this.fmtFreq(ch.freq)} Hz`;
      this.updateSidebarSelector();
      this.updateMonitor();
    });

    p.querySelector("#bench-edit-level").addEventListener("input", (e) => {
      const ch = this.channels[this.focus - 1];
      if (!ch) return;
      ch.levelDbu = Number(e.target.value);
      this.updateMonitor();
    });

    p.querySelector("#bench-edit-mute").addEventListener("click", (e) => {
      const ch = this.channels[this.focus - 1];
      if (!ch) return;
      ch.muted = !ch.muted;
      e.currentTarget.classList.toggle("active", ch.muted);
      this.updateMonitor();
    });

    p.querySelector("#bench-edit-mon").addEventListener("click", (e) => {
      this.monitorOn = !this.monitorOn;
      e.currentTarget.classList.toggle("active", this.monitorOn);
      e.currentTarget.textContent = this.monitorOn ? "🔊 MON" : "🔇 MON";
      this.updateMonitor();
    });
  }

  buildSidebarSelector() {
    const sidebar = document.getElementById("story-index-sidebar");
    if (!sidebar || document.getElementById("sidebar-line-selector")) return;

    const box = document.createElement("div");
    box.id = "sidebar-line-selector";
    box.className = "sidebar-line-selector";
    box.innerHTML = `
      <div class="sidebar-line-title">
        <span>📶 LINE SELECT</span>
        <button type="button" class="sidebar-line-all" data-select-line="0">ALL</button>
      </div>
      <div class="sidebar-line-grid">
        ${this.channels.map(ch => `
          <button type="button" class="sidebar-line-btn" data-select-line="${ch.n}" style="--line-color: ${ch.color};">
            <span class="sidebar-line-ch">CH${ch.n}</span>
            <span class="sidebar-line-hz" data-sidebar-hz="${ch.n}">${this.fmtFreq(ch.freq)} Hz</span>
          </button>`).join("")}
      </div>
    `;
    sidebar.appendChild(this.genDock);
    sidebar.appendChild(box);

    box.querySelectorAll("[data-select-line]").forEach(btn => btn.addEventListener("click", () => {
      this.focusLine(Number(btn.dataset.selectLine), true);
    }));
  }

  updateSidebarSelector() {
    this.channels.forEach(ch => {
      const hz = document.querySelector(`[data-sidebar-hz="${ch.n}"]`);
      if (hz) hz.textContent = `${this.fmtFreq(ch.freq)} Hz`;
    });
    document.querySelectorAll("[data-select-line]").forEach(btn => {
      btn.classList.toggle("active", Number(btn.dataset.selectLine) === this.focus);
    });
  }

  focusLine(n, openRack) {
    this.focus = n;
    this.panel.querySelectorAll(".bench-line").forEach(row => {
      row.classList.toggle("focused", Number(row.dataset.line) === n);
      row.classList.toggle("dimmed", n !== 0 && Number(row.dataset.line) !== n);
    });

    const edit = this.panel.querySelector("#bench-edit");
    const ch = this.channels[n - 1];
    edit.classList.toggle("disabled", !ch);
    if (ch) {
      edit.style.setProperty("--line-color", ch.color);
      this.panel.querySelector("#bench-edit-name").textContent = `CH${ch.n}`;
      this.panel.querySelector("#bench-edit-freq").value = ch.freq;
      this.panel.querySelector("#bench-edit-level").value = ch.levelDbu;
      this.panel.querySelector("#bench-edit-mute").classList.toggle("active", ch.muted);
    } else {
      this.panel.querySelector("#bench-edit-name").textContent = "ALL";
    }

    if (n > 0 && window.multichannelEngine && window.multichannelEngine.selectedCh !== n) {
      window.multichannelEngine.selectChannel(n, true);
    }

    if (openRack && window.floatingMeterDock && typeof window.floatingMeterDock.switchRackTab === "function") {
      window.floatingMeterDock.switchRackTab("8ch");
    }
    this.updateSidebarSelector();
    this.updateMonitor();
  }

  // ---------- Breakout → meter wiring ----------

  initBreakoutLink() {
    this.wiresSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.wiresSvg.id = "bench-breakout-wires-svg";
    this.wiresSvg.setAttribute("class", "live-probe-wires-svg");
    document.body.appendChild(this.wiresSvg);

    // Bring the 8 meters up while the breakout diagram is in view, back to the lab rack once it leaves
    const target = document.getElementById("mc-svg-container");
    if (!target || !("IntersectionObserver" in window)) return;
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const dock = window.floatingMeterDock;
        if (!dock || dock.autoTrack === false) return;
        if (entry.isIntersecting && dock.currentTab !== "8ch") dock.switchRackTab("8ch");
        else if (!entry.isIntersecting && dock.currentTab === "8ch") dock.switchRackTab("rack");
      });
    }, { threshold: 0.3 }).observe(target);
  }

  renderBreakoutWires() {
    if (!this.wiresSvg) return;
    const outs = document.querySelectorAll("[data-mc-out]");
    if (this.panel.offsetParent === null || outs.length === 0) {
      if (this.wiresSvg.innerHTML) this.wiresSvg.innerHTML = "";
      return;
    }

    let html = "";
    outs.forEach(out => {
      const n = Number(out.dataset.mcOut);
      const row = this.panel.querySelector(`.bench-line[data-line="${n}"]`);
      if (!row) return;
      const a = out.getBoundingClientRect();
      const b = row.getBoundingClientRect();
      if (a.bottom < 0 || a.top > window.innerHeight) return;

      const x1 = a.right;
      const y1 = a.top + a.height / 2;
      const x2 = b.left;
      const y2 = b.top + b.height / 2;
      const dx = Math.max(40, (x2 - x1) * 0.5);
      const color = this.channels[n - 1].color;
      const sel = this.focus === n || this.focus === 0;
      const d = `M ${x1},${y1} C ${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
      html += `<path d="${d}" fill="none" stroke="${color}" stroke-width="${sel ? 2.4 : 1.85}" opacity="${sel ? 0.9 : 0.62}" />`;
      html += `<circle cx="${x1}" cy="${y1}" r="3" fill="${color}" /><circle cx="${x2}" cy="${y2}" r="3" fill="${color}" />`;
    });
    this.wiresSvg.innerHTML = html;
  }

  // ---------- Audio monitor ----------

  updateMonitor() {
    const ch = this.channels[this.focus - 1];
    const src = ch ? this.sourceFor(ch) : null;
    const audible = this.monitorOn && src && src.live;

    if (!audible) {
      if (this.monGain && this.audioCtx) this.monGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.02);
      return;
    }

    if (!this.audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.audioCtx = new Ctx();
      this.monOsc = this.audioCtx.createOscillator();
      this.monGain = this.audioCtx.createGain();
      this.monGain.gain.value = 0;
      this.monOsc.connect(this.monGain).connect(this.audioCtx.destination);
      this.monOsc.start();
    }
    if (this.audioCtx.state === "suspended") this.audioCtx.resume();

    const t = this.audioCtx.currentTime;
    this.monOsc.type = src.wave;
    this.monOsc.frequency.setTargetAtTime(src.freq, t, 0.01);
    // +4 dBu maps to a comfortable monitor level; follow the line level in dB
    const gain = 0.08 * Math.pow(10, (src.levelDbu - 4) / 20);
    this.monGain.gain.setTargetAtTime(Math.min(0.3, gain), t, 0.02);
  }

  // ---------- Rendering ----------

  fitCanvas(cv) {
    const w = Math.max(1, Math.round(cv.clientWidth));
    const h = Math.max(1, Math.round(cv.clientHeight));
    if (cv.width !== w || cv.height !== h) {
      cv.width = w;
      cv.height = h;
    }
    return cv.getContext("2d");
  }

  drawScope(cv, ch, src, lv, tSec) {
    const ctx = this.fitCanvas(cv);
    const w = cv.width;
    const h = cv.height;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    // 10 divisions × 1 ms graticule
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 1; i < 10; i++) {
      const x = Math.round((i / 10) * w) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.moveTo(0, Math.round(h / 2) + 0.5);
    ctx.lineTo(w, Math.round(h / 2) + 0.5);
    ctx.stroke();

    // Fixed 3 V full-scale half-height so level differences are visible
    const scale = (h / 2 - 2) / 3.0;
    // Tones are triggered (static); generator sources free-run slowly so they read as patched-in
    const drift = ch.src === "tone" ? 0 : (tSec * 0.25) % 1;

    ctx.strokeStyle = ch.color;
    ctx.lineWidth = 1.4;
    ctx.shadowColor = ch.color;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    for (let x = 0; x <= w; x++) {
      const tMs = (x / w) * BENCH_WINDOW_MS;
      const v = lv.vpk * this.waveSample(src.wave, (src.freq * tMs) / 1000 + drift);
      const y = h / 2 - Math.max(-h / 2 + 1, Math.min(h / 2 - 1, v * scale));
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  drawBar(cv, dbu) {
    const ctx = this.fitCanvas(cv);
    const w = cv.width;
    const h = cv.height;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, w, h);

    const span = BENCH_METER_MAX - BENCH_METER_MIN;
    const segs = 16;
    const segW = w / segs;
    const lit = isFinite(dbu) ? ((dbu - BENCH_METER_MIN) / span) * segs : 0;
    for (let i = 0; i < segs; i++) {
      const segDb = BENCH_METER_MIN + ((i + 1) / segs) * span;
      const on = i < lit;
      const color = segDb > 18 ? "#ef4444" : segDb > 4 ? "#facc15" : "#4ade80";
      ctx.fillStyle = on ? color : "#1a1a1a";
      ctx.fillRect(Math.round(i * segW) + 1, 1, Math.max(1, Math.round(segW) - 2), h - 2);
    }
    // +4 dBu nominal tick
    const xNom = ((4 - BENCH_METER_MIN) / span) * w;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(Math.round(xNom), 0, 1, h);
  }

  renderFrame(tSec) {
    this.channels.forEach((ch, i) => {
      const src = this.sourceFor(ch);
      const lv = this.levels(src);
      this.drawScope(this.scopes[i], ch, src, lv, tSec);
      this.drawBar(this.bars[i], lv.dbu);

      const dbuEl = this.panel.querySelector(`[data-line-dbu="${ch.n}"]`);
      const vEl = this.panel.querySelector(`[data-line-v="${ch.n}"]`);
      if (isFinite(lv.dbu)) {
        dbuEl.textContent = `${lv.dbu >= 0 ? "+" : ""}${lv.dbu.toFixed(1)} dBu`;
        vEl.textContent = `${lv.vrms.toFixed(3)}V rms · ${lv.vpk.toFixed(2)}pk`;
      } else {
        dbuEl.textContent = "−∞ dBu";
        vEl.textContent = "0.000V rms";
      }
    });
  }

  startLoop() {
    const loop = (ts) => {
      // Only draw while the 8-CH tab is visible
      const benchUp = this.panel.offsetParent !== null;
      if (benchUp) this.renderFrame(ts / 1000);
      if (this.genDock.classList.contains("shown") !== benchUp) this.genDock.classList.toggle("shown", benchUp);
      this.renderBreakoutWires();
      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.eightChannelBench = new EightChannelBench();
  });
} else {
  window.eightChannelBench = new EightChannelBench();
}
