/**
 * floating-meters.js — Permanent Left-Side Laboratory Instrument Rack & Universal Wires Engine
 *
 * Specifications:
 * 1. Permanent Left-Side Dock: Fixed 350px width, joined with sidebar, strictly non-scrolling.
 * 2. Exactly 6 Laboratory Instruments:
 *    - Scope 1: Audio In / Pin 2 Hot (CH1 Yellow #facc15, CH2 Cyan #38bdf8)
 *    - Scope 2: Pin 3 Cold / Differential Load (CH3 Pink #f43f5e, CH4 Green #4ade80)
 *    - DMM 1: LUCKY 8050A #1 (Input & Pin 2 Hot RMS & Audio Level dBu in yellow phosphor #facc15)
 *    - DMM 2: LUCKY 8050A #2 (Differential Load RMS & THD+N / CMRR in yellow phosphor #facc15)
 *    - VU Meter 1: APK Precision AC Voltmeter #1 (Channel A: Audio Drive In)
 *    - VU Meter 2: APK Precision AC Voltmeter #2 (Channel B: Differential Load Out)
 * 3. "No text until someone clicks the meter":
 *    - Clean hardware face at rest (CRT screen, yellow VFD digits, analog needle dial).
 *    - Clicking any meter card toggles open its controls, range keys, and telemetry drawer.
 * 4. Dynamic SVG Wires:
 *    - Real-time colored Bézier spline wires extending from left rack terminals across the screen to probed circuit nodes.
 * 5. Create Anchors:
 *    - Click [⚓ CREATE ANCHOR] and click anywhere on the page to drop persistent test anchors.
 * 6. HP 353A Patch Panel & Trend Recorder bays accessible via rack navigation tabs.
 * 7. Strict Aesthetics: Squares (border-radius: 0), pure black (#000000), grey borders (#333333), zero wasted padding.
 */

const SCHEMATIC_CONFIGS = [
  {
    id: "enclosure-svg",
    name: "Section 1: Enclosure Grounding & AES48 Standard",
    shortName: "Sec 1: AES48 Enclosure",
    scope1_ch1: "enc-chassisa",
    scope1_ch2: "enc-shield",
    scope2_ch3: "enc-pin1bond",
    scope2_ch4: "enc-chassisb",
    dmm1: "enc-chassisa",
    dmm2: "enc-pin1bond",
    vu1: "enc-shield",
    vu2: "enc-chassisb"
  },
  {
    id: "xlr-svg-container",
    name: "Section 0.5: Universal XLR Hub (AES14 Table 2)",
    shortName: "Sec 0.5: XLR Hub",
    scope1_ch1: "xlrm-p2",
    scope1_ch2: "xlrf-p2",
    scope2_ch3: "xlrf-p3",
    scope2_ch4: "xlrf-diff",
    dmm1: "xlrf-p2",
    dmm2: "xlrf-diff",
    vu1: "xlrm-p2",
    vu2: "xlrf-diff"
  },
  {
    id: "pp-schematic-svg",
    name: "Section 4: Push-Pull Active Balanced Driver",
    shortName: "Sec 4: Push-Pull Driver",
    scope1_ch1: "pp-vin",
    scope1_ch2: "pp-p2",
    scope2_ch3: "pp-p3",
    scope2_ch4: "pp-load",
    dmm1: "pp-p2",
    dmm2: "pp-load",
    vu1: "pp-vin",
    vu2: "pp-load"
  },
  {
    id: "ib-schematic-svg",
    name: "Section 5: Active Impedance-Balanced Output",
    shortName: "Sec 5: Impedance-Balanced",
    scope1_ch1: "ib-vin",
    scope1_ch2: "ib-p2",
    scope2_ch3: "ib-p3",
    scope2_ch4: "ib-load",
    dmm1: "ib-p2",
    dmm2: "ib-load",
    vu1: "ib-vin",
    vu2: "ib-load"
  },
  {
    id: "xfmr-schematic-svg",
    name: "Section 6: Audio Transformer Simulator",
    shortName: "Sec 6: Audio Transformer",
    scope1_ch1: "xfmr-vin",
    scope1_ch2: "xfmr-p2",
    scope2_ch3: "xfmr-p3",
    scope2_ch4: "xfmr-load",
    dmm1: "xfmr-p2",
    dmm2: "xfmr-load",
    vu1: "xfmr-vin",
    vu2: "xfmr-load"
  },
  {
    id: "meyer-schematic-svg",
    name: "Section 7: Meyer CMRR Test Bench",
    shortName: "Sec 7: Meyer CMRR",
    scope1_ch1: "meyer-vpo",
    scope1_ch2: "meyer-p2",
    scope2_ch3: "meyer-p3",
    scope2_ch4: "meyer-diff",
    dmm1: "meyer-p2",
    dmm2: "meyer-diff",
    vu1: "meyer-vpo",
    vu2: "meyer-diff"
  }
];

// One unique, saturated colour per probe point — shared by its wire, probe tag, terminal dot, trace and readout
const PROBE_COLORS = {
  CH1: "#facc15", // yellow
  CH2: "#0ea5e9", // sky
  CH3: "#f43f5e", // rose
  CH4: "#22c55e", // green
  DMM1: "#f97316", // orange
  DMM2: "#a855f7", // purple
  VU1: "#14b8a6", // teal
  VU2: "#6366f1", // indigo
  VU3: "#84cc16", // lime
  VU4: "#f472b6" // pink
};

// HP-style voltmeter ranges (full-scale volts); each step is ~10 dB
const VM_RANGES = [0.01, 0.03, 0.1, 0.3, 1, 3, 10, 30, 100];
// Level-pyramid zones drawn on the decibel arc (dBu)
const VM_ZONES = [
  { from: -60, to: -40, color: "#f59e0b", label: "MIC" },
  { from: -12, to: -6, color: "#06b6d4", label: "CONSUMER" },
  { from: -2, to: 10, color: "#10b981", label: "PRO +4" },
  { from: 18, to: 28, color: "#ef4444", label: "HEADROOM" }
];

// Line-level goal every meter is judged against: +4 dBu across the balanced pair
const GOAL_DBU = 4;

class FloatingMeterDock {
  constructor() {
    this.dock = null;
    this.currentTab = "rack"; // 'rack' | 'hp353a' | 'chart'
    this.isArmed = false; // "Poke Circuit" mode
    this.isCreatingAnchor = false; // "Create Anchor" mode
    this.anchors = []; // User-created test anchors
    this.anchorCounter = 1;

    // Automatic Scroll Tracking
    this.autoTrack = true;
    this.currentActiveSchematic = null;

    // Wire Style & Hover State (Default: light gray while reading, vivid on hover)
    this.wireStyle = "reading-gray"; // 'reading-gray' | 'vivid' | 'ghost'
    this.hoveredChannels = null; // ['CH1', 'CH2'], etc.
    this.hoveredProbeTarget = null; // Target key when schematic node is hovered
    this.isHoveringRack = false;

    // Active Probe Targets for instruments (Default to Section 6 Audio Transformer)
    this.scope1VinTarget = "xfmr-vin";
    this.scope1Target = "xfmr-p2";
    this.scope2ColdTarget = "xfmr-p3";
    this.scope2Target = "xfmr-load";
    this.dmm1Target = "xfmr-p2";
    this.dmm2Target = "xfmr-load";
    this.vu1Target = "xfmr-vin";
    this.vu2Target = "xfmr-load";
    this.vu3Target = "xfmr-p2";
    this.vu4Target = "xfmr-p3";
    this.dmm1Mode = "rms"; // 'rms' | 'dbu' | 'peak' | 'crest'
    this.dmm2Mode = "diff"; // 'diff' | 'thd' | 'cmrr' | 'error'
    // LUCKY COM lead: 'gnd' = single-ended to Pin 1 / 0 V, 'across' = probes across both wires of the pair
    this.dmm1Com = "gnd";
    this.dmm2Com = "across";

    // Reference impedance (Fluke 8050A selectable REF Z)
    this.refZ = 600;
    this.refZList = [50, 75, 93, 110, 125, 135, 150, 250, 300, 500, 600, 800, 900, 1000, 1200, 2400, 8000, 10000];

    // Oscilloscope settings (Shared timebase, independent V/div)
    this.scope1VoltsDiv = 1.0;
    this.scope2VoltsDiv = 1.0;
    this.scopeTimeDiv = 0.5; // ms/div
    this.scope8VoltsDiv = 1.0;
    this.scopeTime = 0;

    // VU Meters Ballistics & Sensitivity
    this.vu1Range = 3.0; // 3V (+10 dB)
    this.vu2Range = 3.0;
    this.vu3Range = 3.0;
    this.vu4Range = 3.0;
    this.vmAuto = { 1: true, 2: true, 3: true, 4: true }; // autorange per voltmeter
    this.vu1NeedleDbu = 4.0;
    this.vu2NeedleDbu = 4.0;
    this.vu3NeedleDbu = 4.0;
    this.vu4NeedleDbu = 4.0;
    this.vu1TargetDbu = 4.0;
    this.vu2TargetDbu = 4.0;
    this.vu3TargetDbu = 4.0;
    this.vu4TargetDbu = 4.0;
    this.attackRate = 0.28;
    this.releaseRate = 0.08;

    // HP 353A Patch Panel State
    this.hp353aOutZ = 600;
    this.hp353aInZ = 10000;
    this.hp353aAtten10 = 0;
    this.hp353aAtten1 = 0;
    this.hp353aMode = "MEAS";
    this.hp353aFreq = "<5kHz";

    // Trend Recorder State
    this.trendRunning = true;
    this.trendBuffer = [];
    this.maxTrendSamples = 140;

    this.animFrame = null;
    this.init();
  }

  setRefZ(r) {
    if (!r || isNaN(r)) return;
    this.refZ = Number(r);
    const rTxt = this.refZ >= 1000 ? `${(this.refZ / 1000).toFixed(this.refZ % 1000 === 0 ? 0 : 1)} kΩ` : `${this.refZ} Ω`;
    const btn1 = this.dock?.querySelector("#rack-btn-refz");
    if (btn1) btn1.textContent = `REF Z: ${rTxt}`;
    const btn2 = this.dock?.querySelector("#rack-btn-refz2");
    if (btn2) btn2.textContent = `REF Z: ${rTxt}`;
    this.updateFromActiveCircuit();
    this.showToast(`Reference Z set to ${rTxt}`);
  }

  // Blend two #rrggbb colours; t = 0 gives a, t = 1 gives b
  mixHex(a, b, t) {
    const parse = (h) => /^#[0-9a-f]{6}$/i.test(h) ? [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) : null;
    const ca = parse(a);
    const cb = parse(b);
    if (!ca || !cb) return a;
    return "#" + ca.map((v, i) => Math.round(v + (cb[i] - v) * t).toString(16).padStart(2, "0")).join("");
  }

  cycleRefZ() {
    const list = this.refZList || [50, 75, 93, 110, 125, 135, 150, 250, 300, 500, 600, 800, 900, 1000, 1200, 2400, 8000, 10000];
    const idx = list.indexOf(this.refZ || 600);
    const nextIdx = (idx + 1) % list.length;
    this.setRefZ(list[nextIdx]);
    if (window.circuitSim && typeof window.circuitSim.setRefZ === "function") {
      window.circuitSim.setRefZ(this.refZ);
    }
  }

  renderProbeOptions(selectedVal) {
    const groups = [
      {
        label: "Circuit 6.1 (Dual Push-Pull)",
        options: [
          { val: "6-1-p2", label: "Pin 2 Hot (Output +)" },
          { val: "6-1-p3", label: "Pin 3 Cold (Output −)" },
          { val: "6-1-load", label: "Differential Across Load" },
          { val: "6-1-vin", label: "Audio Input Drive" },
          { val: "6-1-op1", label: "Op-Amp A1 Output (Hot)" },
          { val: "6-1-op2", label: "Op-Amp A2 Output (Inverting)" },
          { val: "6-1-p1", label: "Pin 1 Chassis Ground" }
        ]
      },
      {
        label: "Circuit 6.2 (Active Impedance-Balanced)",
        options: [
          { val: "6-2-p2", label: "Pin 2 Hot (Active Driven Out)" },
          { val: "6-2-p3", label: "Pin 3 Cold (Passive 0V Match)" },
          { val: "6-2-load", label: "Differential Across Load" },
          { val: "6-2-vin", label: "Audio Input Drive" }
        ]
      },
      {
        label: "Circuit 6.3 (Transformer Floating)",
        options: [
          { val: "6-3-sec", label: "Secondary Across Pins 2 & 3" },
          { val: "6-3-p2", label: "Secondary Pin 2 (Hot)" },
          { val: "6-3-p3", label: "Secondary Pin 3 (Cold)" },
          { val: "6-3-pri", label: "Primary Audio Drive" }
        ]
      },
      {
        label: "Section 4.5 (Audio Transformer Simulator)",
        options: [
          { val: "xfmr-pri", label: "Transformer Primary Input" },
          { val: "xfmr-sec", label: "Transformer Secondary Output" },
          { val: "xfmr-core", label: "Core Saturation / Magnetizing" },
          { val: "xfmr-zobel", label: "Zobel Damping Network" }
        ]
      },
      {
        label: "Section 5.0 (Jim Meyer Thevenin Ground Loop)",
        options: [
          { val: "meyer-vgvd", label: "Ground Loop Voltage (V_GVD 60Hz)" },
          { val: "meyer-vpo", label: "Generator V_PO (Hot Leg)" },
          { val: "meyer-vro", label: "Generator V_RO (Cold Leg)" },
          { val: "meyer-p2", label: "Cable Pin 2 Hot Line" },
          { val: "meyer-p3", label: "Cable Pin 3 Cold Line" },
          { val: "meyer-shield", label: "Cable Shield (Pin 1 to Pin 1)" },
          { val: "meyer-verr", label: "CM-to-DM Noise Error (V_err)" },
          { val: "meyer-diff", label: "Receiver Differential Audio Out" }
        ]
      },
      {
        label: "Section 0 (Enclosure & AES48 Grounding)",
        options: [
          { val: "enc-chassisa", label: "Equipment A Chassis Ground" },
          { val: "enc-pin1bond", label: "AES48 Direct Chassis Bond (0V Clean)" },
          { val: "enc-pin1fault", label: "Pin 1 Routed to Audio Board Ground (120Hz Buzz)" },
          { val: "enc-shield", label: "Cable Shield Outside Shell" }
        ]
      }
    ];

    let html = "";
    groups.forEach(g => {
      html += `<optgroup label="${g.label}">`;
      g.options.forEach(o => {
        const sel = o.val === selectedVal ? " selected" : "";
        html += `<option value="${o.val}"${sel}>${o.label}</option>`;
      });
      html += `</optgroup>`;
    });

    if (this.anchors && this.anchors.length > 0) {
      html += `<optgroup label="User Placed Test Anchors">`;
      this.anchors.forEach(a => {
        const sel = a.id === selectedVal ? " selected" : "";
        html += `<option value="${a.id}"${sel}>⚓ ${a.label || a.id}</option>`;
      });
      html += `</optgroup>`;
    }

    return html;
  }

  voltmeterCardHtml(n) {
    const labels = { 1: "DRIVE", 2: "LOAD 2↔3", 3: "PIN 2 HOT", 4: "PIN 3 COLD" };
    return `
          <div id="rack-card-vu${n}" class="rack-meter-card rack-vm-card" title="Click for range and probe settings">
            <div class="rack-meter-bar">
              <div class="rack-meter-title">
                <span id="dot-vu${n}" class="rack-terminal-dot" style="background: ${PROBE_COLORS["VU" + n]};"></span>
                <span id="rack-vu${n}-name" class="rack-meter-name" style="color: ${PROBE_COLORS["VU" + n]};">${labels[n]}</span>
              </div>
              <span id="rack-vu${n}-range-badge" class="rack-status-pill">AUTO 3V</span>
            </div>
            <div class="rack-vu-bezel">
              <canvas id="rack-vu${n}-canvas" class="rack-canvas rack-vm-canvas"></canvas>
            </div>
            <div class="meter-collapsible-drawer">
              <span>RANGE (FULL SCALE):</span>
              <div class="vu-range-btn-row">
                <button class="drawer-btn active" data-vm="${n}" data-vm-range="auto">AUTO</button>
                ${VM_RANGES.map(r => `<button class="drawer-btn" data-vm="${n}" data-vm-range="${r}">${r}V</button>`).join("")}
              </div>
              <div class="rack-telemetry-text" id="vu${n}-detail-text"></div>
              <div class="rack-probe-selector-group">
                <label class="rack-probe-label">MOVE PROBE TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):</label>
                <select class="rack-probe-dropdown" data-probe-select="vu${n}">
                  ${this.renderProbeOptions(this["vu" + n + "Target"])}
                </select>
              </div>
            </div>
          </div>`;
  }

  init() {
    this.createPermanentRackDOM();
    this.initCanvases();
    this.attachEventListeners();
    this.setupGlobalProbeHooks();
    this.initAnchorEngine();
    this.initScrollTracker();
    this.startMainInstrumentLoop();
    this.updateFromActiveCircuit();
  }

  createPermanentRackDOM() {
    if (document.getElementById("floating-meter-dock")) {
      document.getElementById("floating-meter-dock").remove();
    }

    const rack = document.createElement("aside");
    rack.id = "floating-meter-dock";
    rack.className = "floating-meter-dock permanent-left-rack";
    rack.setAttribute("aria-label", "Laboratory Master Test Bench & 6-Instrument Left Rack");

    rack.innerHTML = `
      <!-- Rack Master Header & Navigation -->
      <div class="rack-header">
        <div class="rack-nav-tabs">
          <button id="rack-tab-rack" class="rack-nav-tab active" title="6 Laboratory Instruments">🎛️ LAB RACK</button>
          <button id="rack-tab-8ch" class="rack-nav-tab" title="8 Lines (100–800 Hz) with a scope and meter per line, plus 4 simple generators">📶 8-CH</button>
          <button id="rack-tab-gen" class="rack-nav-tab" title="Signal Generator Quick Access">⚡ GEN</button>
          <button id="rack-tab-hp353a" class="rack-nav-tab" title="HP 353A Patch Panel">🎛️ HP 353A</button>
          <button id="rack-tab-chart" class="rack-nav-tab" title="Multi-Channel Trend Graph">📉 TREND</button>
        </div>
        <div class="rack-quick-actions">
          <button id="rack-btn-track" class="rack-action-btn track-btn active" title="Automatically attach probe leads to the schematic in view as you scroll">🔄 AUTO</button>
          <button id="rack-btn-wire-mode" class="rack-action-btn wire-btn active" title="Wire style: Light Gray while reading text vs Vivid on hover">🌫️ GRAY</button>
          <button id="rack-btn-anchor" class="rack-action-btn anchor-btn" title="Click to drop a persistent circuit test anchor anywhere!">⚓ ANCHOR</button>
          <button id="rack-btn-poke" class="rack-action-btn poke-btn" title="Click any wire or component on schematics to poke it!">🎯 POKE</button>
        </div>
        <div id="rack-active-circuit-bar" class="rack-active-circuit-bar">
          <span class="rack-active-circuit-title"><span class="rack-live-pulse"></span> TRACKING:</span>
          <span id="rack-active-circuit-badge" class="rack-active-circuit-name">Sec 6: Audio Transformer</span>
        </div>
      </div>

      <!-- ================= 1. Six Permanent Instruments Bay ================= -->
      <div id="rack-instruments-bay" class="rack-instruments-bay">

        <!-- Meter 1: 8-channel scope — one strip per probe point, all on one common timebase -->
        <div id="rack-card-scope8" class="rack-meter-card" title="Click for volts/div and probe settings">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-scope1-ch1" class="rack-terminal-dot" style="background: ${PROBE_COLORS.CH1};" title="CH1"></span>
              <span id="dot-scope1-ch2" class="rack-terminal-dot" style="background: ${PROBE_COLORS.CH2};" title="CH2"></span>
              <span id="dot-scope2-ch3" class="rack-terminal-dot" style="background: ${PROBE_COLORS.CH3};" title="CH3"></span>
              <span id="dot-scope2-ch4" class="rack-terminal-dot" style="background: ${PROBE_COLORS.CH4};" title="CH4"></span>
              <span>SCOPE &bull; 8 CH &bull; ONE TIMEBASE</span>
            </div>
            <div class="scope8-zoom">
              <button type="button" class="scope8-zoom-btn" data-scope-zoom="1" title="Zoom out (more time)">&minus;</button>
              <span id="scope8-tb" class="rack-status-pill">.5 ms/div</span>
              <button type="button" class="scope8-zoom-btn" data-scope-zoom="-1" title="Zoom in (less time)">+</button>
            </div>
          </div>
          <div class="rack-scope-bezel">
            <canvas id="rack-scope8-canvas" class="rack-canvas scope8-canvas" title="Scroll to zoom the timebase"></canvas>
          </div>
          <div class="meter-collapsible-drawer">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>VOLTS/DIV (ALL CH):</span>
              <div class="scope-btn-row">
                ${[0.2, 0.5, 1, 2, 5].map(v => `<button class="scope-btn${v === 1 ? " active" : ""}" data-scope8-vdiv="${v}">${v < 1 ? String(v).slice(1) : v}V</button>`).join("")}
              </div>
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">CH2 PROBE:</label>
              <select class="rack-probe-dropdown" data-probe-select="scope1">${this.renderProbeOptions(this.scope1Target)}</select>
              <label class="rack-probe-label">CH4 PROBE:</label>
              <select class="rack-probe-dropdown" data-probe-select="scope2">${this.renderProbeOptions(this.scope2Target)}</select>
            </div>
          </div>
        </div>

        <!-- Meter 3: LUCKY 8050A DMM #1 (Input & Hot +VE Line) -->
        <div id="rack-card-dmm1" class="rack-meter-card" title="Click to open Lucky 8050A #1 settings">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-dmm1" class="rack-terminal-dot yellow" style="background: ${PROBE_COLORS.DMM1};"></span>
              <span id="rack-dmm1-name" class="rack-meter-name" style="color: ${PROBE_COLORS.DMM1};">PIN 2 → GND</span>
            </div>
            <span id="rack-dmm1-status" class="rack-status-pill yellow">+VE HOT</span>
          </div>
          <!-- Clean Digital Face (Yellow Phosphor) -->
          <div class="rack-dmm-face">
            <span id="rack-dmm1-val1" class="rack-dmm-digits" style="color: ${PROBE_COLORS.DMM1};">1.228 V</span>
            <span id="rack-dmm1-val2" class="rack-dmm-sub-digits" style="color: ${PROBE_COLORS.DMM1};">+4.0 dBu</span>
          </div>
          <div class="rack-ref-line" id="rack-dmm1-ref"><button type="button" class="rack-com-btn" data-dmm-com="1" title="Move the COM lead: ground (single-ended) or across both wires of the pair">COM: GND</button><span class="rack-ref-text"></span><span class="rack-goal"></span><span class="rack-drop" title="Level against the +4 dBu goal"><i></i><b></b></span></div>
          <!-- LCR mode (shown while a resistance / capacitance control is being turned) -->
          <div class="rack-dmm-lcr" id="rack-dmm1-lcr" hidden></div>
          <!-- All Engineering Values & Equivalents Multi-Matrix -->
          <div class="rack-dmm-matrix" id="rack-dmm1-matrix">
            <div class="matrix-item"><span class="m-lbl">Vpk:</span><span id="dmm1-mat-vpk" class="m-val">1.737V</span></div>
            <div class="matrix-item"><span class="m-lbl">Vpp:</span><span id="dmm1-mat-vpp" class="m-val">3.474V</span></div>
            <div class="matrix-item"><span class="m-lbl">dBu:</span><span id="dmm1-mat-dbu" class="m-val">+4.00</span></div>
            <div class="matrix-item"><span class="m-lbl">dBV:</span><span id="dmm1-mat-dbv" class="m-val">+1.78</span></div>
            <div class="matrix-item"><span class="m-lbl">dBm:</span><span id="dmm1-mat-dbm" class="m-val">+4.00</span></div>
            <div class="matrix-item"><span class="m-lbl">mW:</span><span id="dmm1-mat-pmw" class="m-val">2.51</span></div>
            <div class="matrix-item"><span class="m-lbl">mA:</span><span id="dmm1-mat-ima" class="m-val">2.05</span></div>
            <div class="matrix-item"><span class="m-lbl">Zref:</span><span id="dmm1-mat-refz" class="m-val">600Ω</span></div>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <div class="dmm-keypad-mini">
              <button class="dmm-key active" data-dmm1-mode="rms">TRUE RMS</button>
              <button class="dmm-key" data-dmm1-mode="dbu">dBm LEVEL</button>
              <button class="dmm-key" data-dmm1-mode="peak">PEAK</button>
              <button class="dmm-key" id="rack-btn-refz" title="Cycle reference impedance (50 Ω to 10 kΩ)">REF Z: 600 Ω</button>
            </div>
            <!-- Comprehensive Equivalents Conversion Table -->
            <div class="dmm-equivalents-table" style="margin-top: 5px; background: rgba(5, 8, 17, 0.9); border: 1px solid #1e293b; padding: 5px; border-radius: 2px;">
              <div style="font-size: 0.62rem; color: #38bdf8; font-weight: 800; margin-bottom: 3px;">📊 SIGNAL CONVERSION &amp; EQUIVALENTS:</div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px 6px; font-size: 0.63rem;">
                <div><span style="color: #64748b;">Peak-to-Peak:</span> <span id="dmm1-tbl-vpp" style="color: #facc15; font-weight: 700;">3.474 Vpp</span></div>
                <div><span style="color: #64748b;">Peak Voltage:</span> <span id="dmm1-tbl-vpk" style="color: #facc15; font-weight: 700;">1.737 Vpk</span></div>
                <div><span style="color: #64748b;">dBu (0.775V):</span> <span id="dmm1-tbl-dbu" style="color: #facc15; font-weight: 700;">+4.00 dBu</span></div>
                <div><span style="color: #64748b;">dBV (1.000V):</span> <span id="dmm1-tbl-dbv" style="color: #facc15; font-weight: 700;">+1.78 dBV</span></div>
                <div><span style="color: #64748b;">Power in Zref:</span> <span id="dmm1-tbl-pwr" style="color: #facc15; font-weight: 700;">2.51 mW</span></div>
                <div><span style="color: #64748b;">Loop Current:</span> <span id="dmm1-tbl-cur" style="color: #facc15; font-weight: 700;">2.05 mA</span></div>
              </div>
            </div>
            <div class="rack-telemetry-text" id="dmm1-detail-text">
              Probed Signal: Pin 2 Hot Output (+4.0 dBu Ref 0.775V)
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">
                MOVE PROBES TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):
              </label>
              <select class="rack-probe-dropdown" data-probe-select="dmm1">
                ${this.renderProbeOptions(this.dmm1Target)}
              </select>
            </div>
          </div>
        </div>

        <!-- Meter 4: LUCKY 8050A DMM #2 (Differential / Cold / THD) -->
        <div id="rack-card-dmm2" class="rack-meter-card" title="Click to open Lucky 8050A #2 settings">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-dmm2" class="rack-terminal-dot green" style="background: ${PROBE_COLORS.DMM2};"></span>
              <span id="rack-dmm2-name" class="rack-meter-name" style="color: ${PROBE_COLORS.DMM2};">PIN 2 ↔ PIN 3</span>
            </div>
            <span id="rack-dmm2-status" class="rack-status-pill green">BALANCED</span>
          </div>
          <!-- Clean Digital Face (Yellow Phosphor) -->
          <div class="rack-dmm-face">
            <span id="rack-dmm2-val1" class="rack-dmm-digits" style="color: ${PROBE_COLORS.DMM2};">2.456 V</span>
            <span id="rack-dmm2-val2" class="rack-dmm-sub-digits" style="color: ${PROBE_COLORS.DMM2};">0.003% THD</span>
          </div>
          <div class="rack-ref-line" id="rack-dmm2-ref"><button type="button" class="rack-com-btn" data-dmm-com="2" title="Move the COM lead: ground (single-ended) or across both wires of the pair">COM: GND</button><span class="rack-ref-text"></span><span class="rack-goal"></span><span class="rack-drop" title="Level against the +4 dBu goal"><i></i><b></b></span></div>
          <!-- All Engineering Values & Equivalents Multi-Matrix -->
          <div class="rack-dmm-matrix" id="rack-dmm2-matrix">
            <div class="matrix-item"><span class="m-lbl">Vpk:</span><span id="dmm2-mat-vpk" class="m-val">3.474V</span></div>
            <div class="matrix-item"><span class="m-lbl">Vpp:</span><span id="dmm2-mat-vpp" class="m-val">6.947V</span></div>
            <div class="matrix-item"><span class="m-lbl">dBu:</span><span id="dmm2-mat-dbu" class="m-val">+10.0</span></div>
            <div class="matrix-item"><span class="m-lbl">dBV:</span><span id="dmm2-mat-dbv" class="m-val">+7.78</span></div>
            <div class="matrix-item"><span class="m-lbl">dBm:</span><span id="dmm2-mat-dbm" class="m-val">+10.0</span></div>
            <div class="matrix-item"><span class="m-lbl">Pload:</span><span id="dmm2-mat-pmw" class="m-val">10.05mW</span></div>
            <div class="matrix-item"><span class="m-lbl">THD:</span><span id="dmm2-mat-thd" class="m-val">0.003%</span></div>
            <div class="matrix-item"><span class="m-lbl">CMRR:</span><span id="dmm2-mat-cmrr" class="m-val">>95dB</span></div>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <div class="dmm-keypad-mini">
              <button class="dmm-key active" data-dmm2-mode="diff">DIFF RMS</button>
              <button class="dmm-key" data-dmm2-mode="thd">THD+N %</button>
              <button class="dmm-key" data-dmm2-mode="cmrr">CMRR dB</button>
              <button class="dmm-key" id="rack-btn-refz2" title="Cycle reference impedance (50 Ω to 10 kΩ)">REF Z: 600 Ω</button>
            </div>
            <!-- Comprehensive Differential Equivalents Table -->
            <div class="dmm-equivalents-table" style="margin-top: 5px; background: rgba(5, 8, 17, 0.9); border: 1px solid #1e293b; padding: 5px; border-radius: 2px;">
              <div style="font-size: 0.62rem; color: #4ade80; font-weight: 800; margin-bottom: 3px;">📊 DIFFERENTIAL EQUIVALENTS &amp; DISTORTION:</div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px 6px; font-size: 0.63rem;">
                <div><span style="color: #64748b;">Differential Vpp:</span> <span id="dmm2-tbl-vpp" style="color: #facc15; font-weight: 700;">6.947 Vpp</span></div>
                <div><span style="color: #64748b;">Differential Vpk:</span> <span id="dmm2-tbl-vpk" style="color: #facc15; font-weight: 700;">3.474 Vpk</span></div>
                <div><span style="color: #64748b;">Diff Level (dBu):</span> <span id="dmm2-tbl-dbu" style="color: #facc15; font-weight: 700;">+10.0 dBu</span></div>
                <div><span style="color: #64748b;">Diff Level (dBV):</span> <span id="dmm2-tbl-dbv" style="color: #facc15; font-weight: 700;">+7.78 dBV</span></div>
                <div><span style="color: #64748b;">Load Power:</span> <span id="dmm2-tbl-pwr" style="color: #facc15; font-weight: 700;">10.05 mW</span></div>
                <div><span style="color: #64748b;">Common-Mode Rej:</span> <span id="dmm2-tbl-cmrr" style="color: #4ade80; font-weight: 700;">>95.0 dB</span></div>
              </div>
            </div>
            <div class="rack-telemetry-text" id="dmm2-detail-text">
              Differential Load: 2.456V RMS &bull; CMRR: >95.0 dB &bull; THD: 0.003%
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">
                MOVE PROBES TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):
              </label>
              <select class="rack-probe-dropdown" data-probe-select="dmm2">
                ${this.renderProbeOptions(this.dmm2Target)}
              </select>
            </div>
          </div>
        </div>

        <!-- Meters 5–8: four HP-style AC voltmeters (2 × 2) -->
        <div class="rack-vm-grid">
          ${[1, 2, 3, 4].map(n => this.voltmeterCardHtml(n)).join("")}
        </div>
      </div>

      <div class="rack-credit">Instruments &amp; design &bull; Anthony Kuzub &bull; Like.audio</div>

      <!-- ================= 1.5 Signal Generator Quick Bay ================= -->
      <div id="rack-panel-gen" class="rack-instrument-panel" style="display: none; padding: 6px;">
        <div class="hp353a-panel-card" style="margin-top: 0; background: #070d18; border: 1px solid #1e293b; border-radius: 4px;">
          <div class="hp353a-header" style="background: #0f172a; border-bottom: 1px solid #334155; padding: 6px 8px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="background: #0284c7; color: #fff; font-family: var(--font-mono); font-size: 0.65rem; font-weight: 900; padding: 1px 5px; border-radius: 2px;">AN/URM-1960</span>
              <span style="font-family: var(--font-mono); font-weight: 800; font-size: 0.72rem; color: #38bdf8;">LAB GENERATOR</span>
            </div>
            <button type="button" id="rack-siggen-mute-btn" class="siggen-toggle-btn active" style="font-size: 0.65rem; padding: 2px 7px;">OUT ON</button>
          </div>
          
          <div style="padding: 8px; display: flex; flex-direction: column; gap: 8px;">
            <!-- Waveform select -->
            <div>
              <div style="font-size: 0.65rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Waveform:</div>
              <div class="siggen-wave-btn-group" style="display: flex; gap: 4px;">
                <button type="button" class="siggen-wave-btn active rack-gen-wave" data-wave="sine" style="flex: 1; font-size: 0.68rem; padding: 3px 2px;">∿ Sine</button>
                <button type="button" class="siggen-wave-btn rack-gen-wave" data-wave="square" style="flex: 1; font-size: 0.68rem; padding: 3px 2px;">⊓ Sq</button>
                <button type="button" class="siggen-wave-btn rack-gen-wave" data-wave="triangle" style="flex: 1; font-size: 0.68rem; padding: 3px 2px;">▲ Tri</button>
                <button type="button" class="siggen-wave-btn rack-gen-wave" data-wave="noise" style="flex: 1; font-size: 0.68rem; padding: 3px 2px;">〰 Pink</button>
              </div>
            </div>

            <!-- Frequency & Presets -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
                <span style="font-size: 0.65rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Frequency:</span>
                <span id="rack-gen-freq-display" style="font-family: monospace; font-weight: 800; color: #38bdf8; font-size: 0.82rem;">1,000 Hz</span>
              </div>
              <select id="rack-gen-spot-select" class="military-preset-select" style="width: 100%; font-size: 0.72rem; padding: 3px 5px;">
                <option value="20">20 Hz (Sub-Bass Limit)</option>
                <option value="100">100 Hz (Mains Hum Ref)</option>
                <option value="400">400 Hz (AES Standard Test)</option>
                <option value="1000" selected>1 kHz (0 dBu Pro Ref)</option>
                <option value="10000">10 kHz (HF Bandwidth)</option>
                <option value="20000">20 kHz (Audio Band Edge)</option>
              </select>
            </div>

            <!-- Continuous slider -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.6rem; color: #64748b; font-family: monospace; margin-bottom: 2px;">
                <span>10 Hz</span>
                <span>100 Hz</span>
                <span>1 kHz</span>
                <span>10 kHz</span>
                <span>100 kHz</span>
              </div>
              <input type="range" id="rack-gen-freq-slider" class="range-slider" min="1.0" max="5.0" step="0.005" value="3.0" style="width: 100%;" />
            </div>

            <!-- Live speaker audition -->
            <div style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(51, 65, 85, 0.6); border-radius: 4px; padding: 5px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <button type="button" id="rack-gen-speaker-btn" class="siggen-speaker-btn" style="font-size: 0.68rem; padding: 3px 6px;">
                  <span id="rack-gen-speaker-icon">🔇</span>
                  <span id="rack-gen-speaker-txt">Monitor: Muted</span>
                </button>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 0.6rem; color: #94a3b8; font-weight: 700;">VOL:</span>
                  <input type="range" id="rack-gen-speaker-vol" min="0" max="0.5" step="0.01" value="0.15" style="width: 50px; height: 4px;" />
                </div>
              </div>
            </div>

            <!-- Quick Level / Drive shortcut -->
            <div style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(51, 65, 85, 0.6); border-radius: 4px; padding: 6px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 0.65rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Drive Voltage (V<sub>IN</sub>):</span>
                <span id="rack-gen-vin-disp" style="font-family: monospace; font-weight: 800; color: #38bdf8; font-size: 0.8rem;">1.2 V</span>
              </div>
              <input type="range" id="rack-gen-vin-slider" min="0.1" max="5.0" step="0.1" value="1.2" style="width: 100%;" />
            </div>

            <!-- Quick Muggle Level Selectors inside the rack -->
            <div style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(51, 65, 85, 0.6); border-radius: 4px; padding: 6px 8px;">
              <div style="font-size: 0.65rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">Quick Audio Model:</div>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px;">
                <button type="button" class="rack-muggle-quick-btn" data-preset="mic" style="background: #0f172a; border: 1px solid #334155; border-radius: 3px; font-size: 0.65rem; color: #e2e8f0; padding: 3px; cursor: pointer; text-align: left;">🎙️ Mic (-50dBu)</button>
                <button type="button" class="rack-muggle-quick-btn" data-preset="pro-line" style="background: #0f172a; border: 1px solid #38bdf8; border-radius: 3px; font-size: 0.65rem; color: #38bdf8; padding: 3px; cursor: pointer; text-align: left;">🎛️ Pro (+4dBu)</button>
                <button type="button" class="rack-muggle-quick-btn" data-preset="consumer-line" style="background: #0f172a; border: 1px solid #334155; border-radius: 3px; font-size: 0.65rem; color: #e2e8f0; padding: 3px; cursor: pointer; text-align: left;">📻 Cons (-10dBV)</button>
                <button type="button" class="rack-muggle-quick-btn" data-preset="vintage-600" style="background: #0f172a; border: 1px solid #334155; border-radius: 3px; font-size: 0.65rem; color: #e2e8f0; padding: 3px; cursor: pointer; text-align: left;">🏛️ 600Ω Match</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ================= 2. HP 353A Patch Panel Bay ================= -->
      <div id="rack-panel-hp353a" class="rack-instrument-panel" style="display: none; padding: 6px;">
        <div class="hp353a-panel-card" style="margin-top: 0; background: #000000; border: 1px solid #333333; border-radius: 0;">
          <div class="hp353a-header" style="background: #0a0a0a; border-bottom: 1px solid #222222; padding: 6px 8px;">
            <div class="hp353a-badge">
              <span class="hp353a-hp-logo" style="background: #333333; color: #ffffff; border-radius: 0;">hp</span>
              <span class="hp353a-title" style="font-family: var(--font-mono); font-weight: 800;">353A PATCH PANEL</span>
            </div>
            <span style="font-size: 0.65rem; color: #888888; font-family: var(--font-mono);">MANUAL 00353-90003</span>
          </div>
          <div class="hp353a-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; padding: 8px;">
            <div class="hp353a-ctrl-col" style="background: #050505; border: 1px solid #222222; padding: 6px; text-align: center;">
              <span class="hp353a-ctrl-title" style="font-size: 0.65rem; color: #888888; font-family: var(--font-mono);">OUTPUT Z</span>
              <div id="hp353a-outz-dial" class="hp353a-rotary-dial" style="margin: 6px auto; cursor: pointer;" title="Click to cycle Output Impedance (135, 600, 900 Ω)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span id="hp353a-outz-val" class="hp353a-value-readout" style="color: #38bdf8; font-family: var(--font-mono); font-weight: 800;">600 Ω</span>
            </div>
            <div class="hp353a-ctrl-col" style="background: #050505; border: 1px solid #222222; padding: 6px; text-align: center;">
              <span class="hp353a-ctrl-title" style="font-size: 0.65rem; color: #888888; font-family: var(--font-mono);">INPUT TERM Z</span>
              <div id="hp353a-inz-dial" class="hp353a-rotary-dial" style="margin: 6px auto; cursor: pointer;" title="Click to cycle Input Termination (135, 600, 900, 10k Ω)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span id="hp353a-inz-val" class="hp353a-value-readout" style="color: #38bdf8; font-family: var(--font-mono); font-weight: 800;">10 kΩ</span>
            </div>
            <div class="hp353a-ctrl-col" style="background: #050505; border: 1px solid #222222; padding: 6px; text-align: center;">
              <span class="hp353a-ctrl-title" style="font-size: 0.65rem; color: #888888; font-family: var(--font-mono);">ATTEN 10 dB</span>
              <div id="hp353a-atten10-dial" class="hp353a-rotary-dial" style="margin: 6px auto; cursor: pointer;" title="Click to step 10 dB Attenuation (0 - 100 dB)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span id="hp353a-atten10-val" class="hp353a-value-readout" style="color: #f59e0b; font-family: var(--font-mono); font-weight: 800;">0 dB</span>
            </div>
            <div class="hp353a-ctrl-col" style="background: #050505; border: 1px solid #222222; padding: 6px; text-align: center;">
              <span class="hp353a-ctrl-title" style="font-size: 0.65rem; color: #888888; font-family: var(--font-mono);">ATTEN 1 dB</span>
              <div id="hp353a-atten1-dial" class="hp353a-rotary-dial" style="margin: 6px auto; cursor: pointer;" title="Click to step 1 dB Attenuation (0 - 10 dB)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span id="hp353a-atten1-val" class="hp353a-value-readout" style="color: #f59e0b; font-family: var(--font-mono); font-weight: 800;">0 dB</span>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-top: 1px solid #222222;">
            <button id="hp353a-toggle-meas" class="rack-action-btn" title="Toggle MEAS vs CAL">MODE: MEAS</button>
            <span id="hp353a-atten-total" style="font-family: var(--font-mono); font-size: 0.72rem; color: #f59e0b; font-weight: 800;">0 dB Loss</span>
            <button id="hp353a-toggle-freq" class="rack-action-btn" title="Toggle FREQ (<5kHz vs >5kHz)">FREQ: &lt;5kHz</button>
          </div>
        </div>
      </div>

      <!-- ================= 3. Multi-Channel Trend Recorder Bay ================= -->
      <!-- 8-Line Bench: populated by eight-channel-bench.js -->
      <div id="rack-panel-8ch" class="rack-instrument-panel bench-panel" style="display: none;"></div>

      <div id="rack-panel-chart" class="rack-instrument-panel" style="display: none; padding: 6px;">
        <div class="trend-recorder-card" style="margin-top: 0; background: #000000; border: 1px solid #333333; border-radius: 0;">
          <div class="trend-toolbar" style="display: flex; justify-content: space-between; align-items: center; padding: 6px; background: #0a0a0a; border-bottom: 1px solid #222222;">
            <span class="trend-title" style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 800; color: #4ade80;">📉 LIVE STRIP CHART</span>
            <div class="trend-btn-group" style="display: flex; gap: 3px;">
              <button id="trend-btn-pause" class="rack-action-btn">PAUSE</button>
              <button id="trend-btn-clear" class="rack-action-btn">CLEAR</button>
            </div>
          </div>
          <canvas id="rack-trend-canvas" width="338" height="180" class="rack-canvas" style="background: #020b05;"></canvas>
          <div style="display: flex; justify-content: space-around; padding: 4px; font-family: var(--font-mono); font-size: 0.65rem; border-top: 1px solid #222222;">
            <span style="color: #facc15;">&bull; +VE Hot</span>
            <span style="color: #38bdf8;">&bull; -VE Cold</span>
            <span style="color: #4ade80;">&bull; Diff Load</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(rack);
    this.dock = rack;

    // Fullscreen SVG Overlay for Dynamic Bézier Wires
    if (!document.getElementById("live-probe-wires-svg")) {
      const wiresSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      wiresSvg.id = "live-probe-wires-svg";
      wiresSvg.setAttribute("class", "live-probe-wires-svg");
      document.body.appendChild(wiresSvg);
    }
  }

  initCanvases() {
    this.scope8Canvas = document.getElementById("rack-scope8-canvas");
    this.scope1Canvas = document.getElementById("rack-scope1-canvas");
    if (this.scope1Canvas) this.scope1Ctx = this.scope1Canvas.getContext("2d");

    this.scope2Canvas = document.getElementById("rack-scope2-canvas");
    if (this.scope2Canvas) this.scope2Ctx = this.scope2Canvas.getContext("2d");

    this.vu1Canvas = document.getElementById("rack-vu1-canvas");
    if (this.vu1Canvas) this.vu1Ctx = this.vu1Canvas.getContext("2d");

    this.vu2Canvas = document.getElementById("rack-vu2-canvas");
    if (this.vu2Canvas) this.vu2Ctx = this.vu2Canvas.getContext("2d");

    this.vu3Canvas = document.getElementById("rack-vu3-canvas");
    if (this.vu3Canvas) this.vu3Ctx = this.vu3Canvas.getContext("2d");

    this.vu4Canvas = document.getElementById("rack-vu4-canvas");
    if (this.vu4Canvas) this.vu4Ctx = this.vu4Canvas.getContext("2d");

    this.trendCanvas = document.getElementById("rack-trend-canvas");
    if (this.trendCanvas) this.trendCtx = this.trendCanvas.getContext("2d");
  }

  attachEventListeners() {
    const dock = this.dock;

    // "No text until someone clicks the meter": Click-to-expand drawer
    dock.querySelectorAll(".rack-meter-card").forEach(card => {
      card.addEventListener("click", (e) => {
        // Prevent toggling if user clicked directly on button or select
        if (e.target.closest("button") || e.target.closest("select") || e.target.closest("input")) {
          return;
        }
        card.classList.toggle("open");
      });
    });

    // Navigation Tabs
    const tabRack = dock.querySelector("#rack-tab-rack");
    const tabGen = dock.querySelector("#rack-tab-gen");
    const tabHp = dock.querySelector("#rack-tab-hp353a");
    const tabChart = dock.querySelector("#rack-tab-chart");
    const tab8ch = dock.querySelector("#rack-tab-8ch");

    const bayInstruments = dock.querySelector("#rack-instruments-bay");
    const bayGen = dock.querySelector("#rack-panel-gen");
    const bayHp = dock.querySelector("#rack-panel-hp353a");
    const bayChart = dock.querySelector("#rack-panel-chart");
    const bay8ch = dock.querySelector("#rack-panel-8ch");

    const switchTab = (tab) => {
      this.currentTab = tab;
      tabRack?.classList.toggle("active", tab === "rack");
      tabGen?.classList.toggle("active", tab === "gen");
      tabHp?.classList.toggle("active", tab === "hp353a");
      tabChart?.classList.toggle("active", tab === "chart");
      tab8ch?.classList.toggle("active", tab === "8ch");

      if (bayInstruments) bayInstruments.style.display = tab === "rack" ? "flex" : "none";
      if (bayGen) bayGen.style.display = tab === "gen" ? "block" : "none";
      if (bayHp) bayHp.style.display = tab === "hp353a" ? "block" : "none";
      if (bayChart) bayChart.style.display = tab === "chart" ? "block" : "none";
      if (bay8ch) bay8ch.style.display = tab === "8ch" ? "flex" : "none";
    };
    this.switchRackTab = switchTab;

    tabRack?.addEventListener("click", () => switchTab("rack"));
    tabGen?.addEventListener("click", () => switchTab("gen"));
    tabHp?.addEventListener("click", () => switchTab("hp353a"));
    tabChart?.addEventListener("click", () => switchTab("chart"));
    tab8ch?.addEventListener("click", () => switchTab("8ch"));

    // Sync Generator Rack Controls
    const rackMuteBtn = dock.querySelector("#rack-siggen-mute-btn");
    rackMuteBtn?.addEventListener("click", () => {
      if (window.signalGenerator) {
        window.signalGenerator.setOutputActive(!window.signalGenerator.outputActive);
        rackMuteBtn.classList.toggle("active", window.signalGenerator.outputActive);
        rackMuteBtn.textContent = window.signalGenerator.outputActive ? "OUT ON" : "MUTED";
      }
    });

    dock.querySelectorAll(".rack-gen-wave").forEach(btn => {
      btn.addEventListener("click", () => {
        const wave = btn.getAttribute("data-wave");
        if (window.signalGenerator) window.signalGenerator.setWaveform(wave);
        dock.querySelectorAll(".rack-gen-wave").forEach(b => b.classList.toggle("active", b === btn));
      });
    });

    const rackFreqSlider = dock.querySelector("#rack-gen-freq-slider");
    const rackFreqDisp = dock.querySelector("#rack-gen-freq-display");
    const rackSpotSelect = dock.querySelector("#rack-gen-spot-select");

    rackFreqSlider?.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      const freq = Math.round(Math.pow(10, val));
      if (window.signalGenerator) window.signalGenerator.setFrequency(freq, "slider");
      if (rackFreqDisp) rackFreqDisp.textContent = `${freq.toLocaleString()} Hz`;
    });

    rackSpotSelect?.addEventListener("change", (e) => {
      const freq = parseFloat(e.target.value);
      if (!isNaN(freq)) {
        if (window.signalGenerator) window.signalGenerator.setFrequency(freq, "spot");
        if (rackFreqSlider) rackFreqSlider.value = Math.log10(freq).toFixed(3);
        if (rackFreqDisp) rackFreqDisp.textContent = `${freq.toLocaleString()} Hz`;
      }
    });

    const rackSpeakerBtn = dock.querySelector("#rack-gen-speaker-btn");
    const rackSpeakerIcon = dock.querySelector("#rack-gen-speaker-icon");
    const rackSpeakerTxt = dock.querySelector("#rack-gen-speaker-txt");
    const rackSpeakerVol = dock.querySelector("#rack-gen-speaker-vol");

    rackSpeakerBtn?.addEventListener("click", () => {
      if (window.signalGenerator) {
        const state = !window.signalGenerator.monitorAudible;
        window.signalGenerator.setMonitorAudible(state);
        if (rackSpeakerIcon) rackSpeakerIcon.textContent = state ? "🔊" : "🔇";
        if (rackSpeakerTxt) rackSpeakerTxt.textContent = state ? "Audition ON" : "Monitor: Muted";
        rackSpeakerBtn.classList.toggle("active", state);
      }
    });

    rackSpeakerVol?.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      if (window.signalGenerator) window.signalGenerator.setVolume(vol);
    });

    // Quick Drive Vin Slider on Rack
    const rackVinSlider = dock.querySelector("#rack-gen-vin-slider");
    const rackVinDisp = dock.querySelector("#rack-gen-vin-disp");
    rackVinSlider?.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (rackVinDisp) rackVinDisp.textContent = `${val.toFixed(1)} V`;
      const vinEl = document.getElementById("pp-vin");
      if (vinEl) {
        vinEl.value = val;
        if (window.circuitAnimator) window.circuitAnimator.updatePushPull();
      }
    });

    // Quick Muggle Buttons on Rack
    dock.querySelectorAll(".rack-muggle-quick-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const preset = btn.getAttribute("data-preset");
        if (window.circuitAnimator) window.circuitAnimator.setMugglePreset(preset);
        dock.querySelectorAll(".rack-muggle-quick-btn").forEach(b => {
          const isActive = (b === btn);
          b.style.borderColor = isActive ? "#38bdf8" : "#334155";
          b.style.color = isActive ? "#38bdf8" : "#e2e8f0";
        });
        if (rackVinSlider) {
          const vinEl = document.getElementById("pp-vin");
          if (vinEl) {
            rackVinSlider.value = vinEl.value;
            if (rackVinDisp) rackVinDisp.textContent = `${parseFloat(vinEl.value).toFixed(1)} V`;
          }
        }
      });
    });

    // Quick Actions
    const trackBtn = dock.querySelector("#rack-btn-track");
    const wireBtn = dock.querySelector("#rack-btn-wire-mode");
    const anchorBtn = dock.querySelector("#rack-btn-anchor");
    const pokeBtn = dock.querySelector("#rack-btn-poke");

    wireBtn?.addEventListener("click", () => {
      if (this.wireStyle === "reading-gray") {
        this.wireStyle = "vivid";
        wireBtn.textContent = "🌈 VIVID";
        wireBtn.classList.remove("active");
        this.showToast("Wire Style: Vivid (All wires fully colored)");
      } else if (this.wireStyle === "vivid") {
        this.wireStyle = "ghost";
        wireBtn.textContent = "👻 GHOST";
        wireBtn.classList.remove("active");
        this.showToast("Wire Style: Ghost (Ultra-faint traces)");
      } else {
        this.wireStyle = "reading-gray";
        wireBtn.textContent = "🌫️ GRAY";
        wireBtn.classList.add("active");
        this.showToast("Wire Style: Reading Gray (Light gray during reading, vivid on meter hover)");
      }
      this.renderWires();
    });

    // Hover tracking on individual meter cards to illuminate specific channel wires
    const cardChannels = {
      "rack-card-scope8": ["CH1", "CH2", "CH3", "CH4"],
      "rack-card-dmm1": ["DMM1"],
      "rack-card-dmm2": ["DMM2"],
      "rack-card-vu1": ["VU1"],
      "rack-card-vu2": ["VU2"],
      "rack-card-vu3": ["VU3"],
      "rack-card-vu4": ["VU4"]
    };

    Object.entries(cardChannels).forEach(([cardId, channels]) => {
      const card = dock.querySelector(`#${cardId}`);
      if (card) {
        card.addEventListener("mouseenter", () => {
          this.hoveredChannels = channels;
          this.isHoveringRack = true;
        });
        card.addEventListener("mouseleave", () => {
          this.hoveredChannels = null;
        });
      }
    });

    dock.addEventListener("mouseenter", () => {
      this.isHoveringRack = true;
    });
    dock.addEventListener("mouseleave", () => {
      this.isHoveringRack = false;
      this.hoveredChannels = null;
    });

    trackBtn?.addEventListener("click", () => {
      this.autoTrack = !this.autoTrack;
      trackBtn.classList.toggle("active", this.autoTrack);
      if (this.autoTrack) {
        this.currentActiveSchematic = null;
        this.updateActiveSchematicFromScroll();
        this.renderWires();
        this.showToast("🔄 Auto-Track: Probes actively tracking schematic in view");
      } else {
        this.showToast("🔒 Locked: Probes holding current test points");
      }
    });

    anchorBtn?.addEventListener("click", () => {
      this.isCreatingAnchor = !this.isCreatingAnchor;
      anchorBtn.classList.toggle("active", this.isCreatingAnchor);
      if (this.isCreatingAnchor) {
        document.body.classList.add("probe-cursor-active");
        this.showToast("⚓ Anchor Mode: Click ANYWHERE on the page to drop a circuit test anchor!");
      } else {
        document.body.classList.remove("probe-cursor-active");
      }
    });

    pokeBtn?.addEventListener("click", () => {
      this.isArmed = !this.isArmed;
      pokeBtn.classList.toggle("active", this.isArmed);
      if (this.isArmed) {
        document.body.classList.add("probe-cursor-active");
        this.showToast("🎯 Poke Mode: Click any wire or pin across schematics to attach scopes!");
      } else {
        document.body.classList.remove("probe-cursor-active");
      }
    });

    // Scope 1 Volts/Div Controls
    dock.querySelectorAll("[data-scope1-vdiv]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-scope1-vdiv]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.scope1VoltsDiv = parseFloat(e.currentTarget.getAttribute("data-scope1-vdiv"));
        const badge = dock.querySelector("#scope1-vdiv-badge");
        if (badge) badge.textContent = `${this.scope1VoltsDiv}V • ${this.scopeTimeDiv}ms`;
      });
    });

    // Scope 2 Volts/Div Controls
    dock.querySelectorAll("[data-scope2-vdiv]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-scope2-vdiv]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.scope2VoltsDiv = parseFloat(e.currentTarget.getAttribute("data-scope2-vdiv"));
        const badge = dock.querySelector("#scope2-vdiv-badge");
        if (badge) badge.textContent = `${this.scope2VoltsDiv}V • ${this.scopeTimeDiv}ms`;
      });
    });

    // 8-channel scope: shared volts/div, timebase zoom (buttons or mouse wheel)
    const TIMEBASES = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];
    const setTimebase = (dir) => {
      const i = TIMEBASES.findIndex(t => t >= this.scopeTimeDiv - 1e-9);
      this.scopeTimeDiv = TIMEBASES[Math.max(0, Math.min(TIMEBASES.length - 1, (i < 0 ? 3 : i) + dir))];
      const tb = dock.querySelector("#scope8-tb");
      if (tb) tb.textContent = `${this.scopeTimeDiv < 1 ? String(this.scopeTimeDiv).replace(/^0/, "") : this.scopeTimeDiv} ms/div`;
    };
    dock.querySelectorAll("[data-scope-zoom]").forEach(btn => {
      btn.addEventListener("click", () => setTimebase(Number(btn.dataset.scopeZoom)));
    });
    this.scope8Canvas?.addEventListener("wheel", (e) => {
      e.preventDefault();
      setTimebase(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });
    dock.querySelectorAll("[data-scope8-vdiv]").forEach(btn => {
      btn.addEventListener("click", () => {
        dock.querySelectorAll("[data-scope8-vdiv]").forEach(b => b.classList.toggle("active", b === btn));
        this.scope8VoltsDiv = parseFloat(btn.dataset.scope8Vdiv);
      });
    });

    // Shared Time/Div Controls
    dock.querySelectorAll("[data-tdiv]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-tdiv]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.scopeTimeDiv = parseFloat(e.currentTarget.getAttribute("data-tdiv"));
        const b1 = dock.querySelector("#scope1-vdiv-badge");
        const b2 = dock.querySelector("#scope2-vdiv-badge");
        if (b1) b1.textContent = `${this.scope1VoltsDiv}V • ${this.scopeTimeDiv}ms`;
        if (b2) b2.textContent = `${this.scope2VoltsDiv}V • ${this.scopeTimeDiv}ms`;
      });
    });

    // LUCKY COM lead: ground vs across the pair
    dock.querySelectorAll("[data-dmm-com]").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = `dmm${btn.dataset.dmmCom}Com`;
        this[key] = this[key] === "across" ? "gnd" : "across";
        this.updateFromActiveCircuit();
      });
    });

    // DMM 1 Modes
    dock.querySelectorAll("[data-dmm1-mode]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-dmm1-mode]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.dmm1Mode = e.currentTarget.getAttribute("data-dmm1-mode");
        this.updateFromActiveCircuit();
      });
    });

    // DMM 2 Modes
    dock.querySelectorAll("[data-dmm2-mode]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-dmm2-mode]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.dmm2Mode = e.currentTarget.getAttribute("data-dmm2-mode");
        this.updateFromActiveCircuit();
      });
    });

    // Voltmeter ranges: AUTO or a fixed full-scale range
    dock.querySelectorAll("[data-vm-range]").forEach(btn => {
      btn.addEventListener("click", () => {
        const n = Number(btn.dataset.vm);
        dock.querySelectorAll(`[data-vm="${n}"]`).forEach(b => b.classList.toggle("active", b === btn));
        if (btn.dataset.vmRange === "auto") {
          this.vmAuto[n] = true;
        } else {
          this.vmAuto[n] = false;
          this[`vu${n}Range`] = parseFloat(btn.dataset.vmRange);
        }
        this.updateFromActiveCircuit();
      });
    });

    // Dropdown Node Selectors
    dock.querySelectorAll("[data-probe-select]").forEach(select => {
      select.addEventListener("change", (e) => {
        const type = select.getAttribute("data-probe-select");
        const val = e.target.value;
        if (type === "scope1") this.scope1Target = val;
        if (type === "scope2") this.scope2Target = val;
        if (type === "dmm1") this.dmm1Target = val;
        if (type === "dmm2") this.dmm2Target = val;
        if (type === "vu1") this.vu1Target = val;
        if (type === "vu2") this.vu2Target = val;
        if (type === "vu3") this.vu3Target = val;
        if (type === "vu4") this.vu4Target = val;
        this.updateFromActiveCircuit();
      });
    });

    // Fluke Reference Impedance Buttons
    dock.querySelector("#rack-btn-refz")?.addEventListener("click", () => {
      this.cycleRefZ();
    });
    dock.querySelector("#rack-btn-refz2")?.addEventListener("click", () => {
      this.cycleRefZ();
    });

    // HP 353A Patch Panel Controls
    this.setupHp353aPanel();

    // Trend Graph Controls
    dock.querySelector("#trend-btn-pause")?.addEventListener("click", (e) => {
      this.trendRunning = !this.trendRunning;
      e.target.textContent = this.trendRunning ? "PAUSE" : "RESUME";
    });
    dock.querySelector("#trend-btn-clear")?.addEventListener("click", () => {
      this.trendBuffer = [];
    });
  }

  setupHp353aPanel() {
    const dock = this.dock;

    const outZVal = dock.querySelector("#hp353a-outz-val");
    const outZDial = dock.querySelector("#hp353a-outz-dial");
    outZDial?.addEventListener("click", () => {
      const zSteps = [135, 600, 900];
      const nextIdx = (zSteps.indexOf(this.hp353aOutZ) + 1) % zSteps.length;
      this.hp353aOutZ = zSteps[nextIdx];
      if (outZVal) outZVal.textContent = `${this.hp353aOutZ} Ω`;
      outZDial.style.transform = `rotate(${nextIdx * 60 - 30}deg)`;
      this.showToast(`HP 353A: Output Impedance set to ${this.hp353aOutZ} Ω`);
    });

    const inZVal = dock.querySelector("#hp353a-inz-val");
    const inZDial = dock.querySelector("#hp353a-inz-dial");
    inZDial?.addEventListener("click", () => {
      const zSteps = [135, 600, 900, 10000];
      const nextIdx = (zSteps.indexOf(this.hp353aInZ) + 1) % zSteps.length;
      this.hp353aInZ = zSteps[nextIdx];
      if (inZVal) inZVal.textContent = this.hp353aInZ >= 1000 ? `${this.hp353aInZ / 1000} kΩ` : `${this.hp353aInZ} Ω`;
      inZDial.style.transform = `rotate(${nextIdx * 50 - 45}deg)`;
      this.showToast(`HP 353A: Termination set to ${inZVal.textContent}`);
    });

    const atten10Val = dock.querySelector("#hp353a-atten10-val");
    const atten10Dial = dock.querySelector("#hp353a-atten10-dial");
    const attenTotal = dock.querySelector("#hp353a-atten-total");

    atten10Dial?.addEventListener("click", () => {
      this.hp353aAtten10 = (this.hp353aAtten10 + 10) % 110;
      if (atten10Val) atten10Val.textContent = `${this.hp353aAtten10} dB`;
      atten10Dial.style.transform = `rotate(${(this.hp353aAtten10 / 10) * 32 - 140}deg)`;
      if (attenTotal) attenTotal.textContent = `${this.hp353aAtten10 + this.hp353aAtten1} dB Loss`;
    });

    const atten1Val = dock.querySelector("#hp353a-atten1-val");
    const atten1Dial = dock.querySelector("#hp353a-atten1-dial");
    atten1Dial?.addEventListener("click", () => {
      this.hp353aAtten1 = (this.hp353aAtten1 + 1) % 11;
      if (atten1Val) atten1Val.textContent = `${this.hp353aAtten1} dB`;
      atten1Dial.style.transform = `rotate(${this.hp353aAtten1 * 32 - 140}deg)`;
      if (attenTotal) attenTotal.textContent = `${this.hp353aAtten10 + this.hp353aAtten1} dB Loss`;
    });

    const measBtn = dock.querySelector("#hp353a-toggle-meas");
    measBtn?.addEventListener("click", () => {
      this.hp353aMode = this.hp353aMode === "MEAS" ? "CAL" : "MEAS";
      measBtn.textContent = `MODE: ${this.hp353aMode}`;
      measBtn.classList.toggle("active", this.hp353aMode === "MEAS");
    });

    const freqBtn = dock.querySelector("#hp353a-toggle-freq");
    freqBtn?.addEventListener("click", () => {
      this.hp353aFreq = this.hp353aFreq === "<5kHz" ? ">5kHz" : "<5kHz";
      freqBtn.textContent = `FREQ: ${this.hp353aFreq}`;
    });
  }

  initAnchorEngine() {
    document.addEventListener("click", (e) => {
      if (!this.isCreatingAnchor) return;
      if (e.target.closest("#floating-meter-dock")) return;

      const pageX = e.pageX;
      const pageY = e.pageY;
      const id = `anchor-${this.anchorCounter++}`;

      const anchor = document.createElement("div");
      anchor.id = id;
      anchor.className = "circuit-test-anchor";
      anchor.setAttribute("data-probe-target", id);
      anchor.setAttribute("data-probe-label", `Anchor Node ${this.anchorCounter - 1}`);
      anchor.style.left = `${pageX - 20}px`;
      anchor.style.top = `${pageY - 12}px`;
      anchor.innerHTML = `<span>⚓ Node ${this.anchorCounter - 1}</span><span style="font-size: 0.6rem; margin-left: 3px; cursor: pointer;" title="Remove Anchor">&times;</span>`;

      anchor.querySelector("span:last-child")?.addEventListener("click", (ev) => {
        ev.stopPropagation();
        anchor.remove();
        this.anchors = this.anchors.filter(a => a.id !== id);
      });

      anchor.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this.selectProbeTarget(id, `Anchor Node ${this.anchorCounter - 1}`, anchor);
      });

      document.body.appendChild(anchor);
      this.anchors.push({ id, el: anchor, x: pageX, y: pageY });

      // Add to select dropdowns
      this.dock.querySelectorAll(".rack-probe-dropdown").forEach(sel => {
        const opt = document.createElement("option");
        opt.value = id;
        opt.textContent = `⚓ Test Anchor ${this.anchorCounter - 1}`;
        sel.appendChild(opt);
      });

      this.isCreatingAnchor = false;
      const anchorBtn = this.dock.querySelector("#rack-btn-anchor");
      if (anchorBtn) anchorBtn.classList.remove("active");
      document.body.classList.remove("probe-cursor-active");
      this.showToast(`⚓ Anchor ${this.anchorCounter - 1} dropped at (${pageX}, ${pageY})`);
    });
  }

  setupGlobalProbeHooks() {
    const bindTarget = (el) => {
      el.style.cursor = "crosshair";
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = el.getAttribute("data-probe-target");
        const label = el.getAttribute("data-probe-label") || el.getAttribute("title") || target;
        this.selectProbeTarget(target, label, el);
      });
      el.addEventListener("mouseenter", () => {
        const target = el.getAttribute("data-probe-target");
        if (target) this.hoveredProbeTarget = target;
      });
      el.addEventListener("mouseleave", () => {
        this.hoveredProbeTarget = null;
      });
    };

    document.querySelectorAll("[data-probe-target]").forEach(bindTarget);

    document.addEventListener("click", (e) => {
      if (!this.isArmed) return;
      const probeTargetEl = e.target.closest("[data-probe-target]");
      if (probeTargetEl) {
        const target = probeTargetEl.getAttribute("data-probe-target");
        const label = probeTargetEl.getAttribute("data-probe-label") || probeTargetEl.getAttribute("title") || target;
        this.selectProbeTarget(target, label, probeTargetEl);
      }
    });
  }

  selectProbeTarget(targetKey, customLabel = null, clickedEl = null) {
    this.autoTrack = false;
    const trackBtn = this.dock?.querySelector("#rack-btn-track");
    if (trackBtn) trackBtn.classList.remove("active");

    this.scope1Target = targetKey;
    this.dmm1Target = targetKey;

    this.dock?.querySelectorAll("[data-probe-select='scope1'], [data-probe-select='dmm1']").forEach(sel => {
      sel.value = targetKey;
    });

    const badge = this.dock?.querySelector("#rack-active-circuit-badge");
    if (badge) {
      badge.textContent = customLabel ? `Manual: ${customLabel.length > 15 ? customLabel.substring(0, 15) : customLabel}` : `Manual: ${targetKey}`;
      badge.title = `Manually pinned to ${customLabel || targetKey}`;
    }

    this.updateFromActiveCircuit();
    this.renderWires();
    this.showToast(`⚡ Probing: ${customLabel || targetKey}`);
  }

  getActiveSchematic() {
    const vh = window.innerHeight;
    const viewCenter = vh * 0.5;

    let bestConfig = null;
    let maxVisibleHeight = 0;
    let closestToCenter = Infinity;

    for (const cfg of SCHEMATIC_CONFIGS) {
      const el = document.getElementById(cfg.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();

      // Check vertical intersection with viewport [0, vh]
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(vh, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;

      if (visibleHeight > 40) {
        const elCenter = (rect.top + rect.bottom) / 2;
        const distFromCenter = Math.abs(elCenter - viewCenter);
        if (visibleHeight > maxVisibleHeight * 0.7 && distFromCenter < closestToCenter) {
          closestToCenter = distFromCenter;
          maxVisibleHeight = Math.max(maxVisibleHeight, visibleHeight);
          bestConfig = cfg;
        } else if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          bestConfig = cfg;
        }
      }
    }

    if (!bestConfig && this.currentActiveSchematic) {
      const currEl = document.getElementById(this.currentActiveSchematic.id);
      if (currEl) {
        const r = currEl.getBoundingClientRect();
        if (r.bottom > 0 && r.top < vh) {
          return this.currentActiveSchematic;
        }
      }
      let minDistance = Infinity;
      for (const cfg of SCHEMATIC_CONFIGS) {
        const el = document.getElementById(cfg.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs((rect.top + rect.bottom) / 2 - viewCenter);
        if (dist < minDistance) {
          minDistance = dist;
          bestConfig = cfg;
        }
      }
    }

    return bestConfig || SCHEMATIC_CONFIGS[3]; // default to Section 6 Audio Transformer
  }

  updateActiveSchematicFromScroll() {
    if (!this.autoTrack) return;

    const activeCfg = this.getActiveSchematic();
    if (!activeCfg) return;

    if (!this.currentActiveSchematic || this.currentActiveSchematic.id !== activeCfg.id) {
      this.currentActiveSchematic = activeCfg;

      this.scope1VinTarget = activeCfg.scope1_ch1;
      this.scope1Target = activeCfg.scope1_ch2;
      this.scope2ColdTarget = activeCfg.scope2_ch3;
      this.scope2Target = activeCfg.scope2_ch4;
      this.dmm1Target = activeCfg.dmm1;
      this.dmm2Target = activeCfg.dmm2;
      this.vu1Target = activeCfg.vu1;
      this.vu2Target = activeCfg.vu2;
      this.vu3Target = activeCfg.vu3 || activeCfg.scope1_ch2;
      this.vu4Target = activeCfg.vu4 || activeCfg.scope2_ch3;

      // Update dropdown selections in drawer if open
      this.dock?.querySelectorAll("[data-probe-select='scope1']").forEach(sel => sel.value = this.scope1Target);
      this.dock?.querySelectorAll("[data-probe-select='scope2']").forEach(sel => sel.value = this.scope2Target);
      this.dock?.querySelectorAll("[data-probe-select='dmm1']").forEach(sel => sel.value = this.dmm1Target);
      this.dock?.querySelectorAll("[data-probe-select='dmm2']").forEach(sel => sel.value = this.dmm2Target);
      this.dock?.querySelectorAll("[data-probe-select='vu1']").forEach(sel => sel.value = this.vu1Target);
      this.dock?.querySelectorAll("[data-probe-select='vu2']").forEach(sel => sel.value = this.vu2Target);
      this.dock?.querySelectorAll("[data-probe-select='vu3']").forEach(sel => sel.value = this.vu3Target);
      this.dock?.querySelectorAll("[data-probe-select='vu4']").forEach(sel => sel.value = this.vu4Target);

      // Update active circuit badge in dock header
      const badge = this.dock?.querySelector("#rack-active-circuit-badge");
      if (badge) {
        badge.textContent = activeCfg.shortName || activeCfg.name;
        badge.title = `Currently tracking ${activeCfg.name}`;
      }

      this.updateFromActiveCircuit();
    }
  }

  initScrollTracker() {
    const handleScrollOrResize = () => {
      this.updateActiveSchematicFromScroll();
      this.renderWires();
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    // Initial evaluation
    this.updateActiveSchematicFromScroll();
  }

  showToast(msg) {
    let toast = document.getElementById("probe-hud-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "probe-hud-toast";
      toast.className = "probe-hud-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("visible");
    }, 2500);
  }

  getSignalForTarget(key) {
    let freq = 1000.0;
    if (window.signalGenerator) {
      freq = window.signalGenerator.freq;
    }
    const isMuted = window.signalGenerator && !window.signalGenerator.outputActive;

    let vRms = 1.23;
    let phase = 0;
    let shape = "sine";
    let status = "BALANCED";
    let thd = 0.0025;
    let cmrr = 95.0;
    let iLoad = 0.002;
    let name = "Test Node";

    if (!key) key = "xfmr-p2";

    if (key.startsWith("6-1") || key.startsWith("pp")) {
      const vin = isMuted ? 0.0 : parseFloat(document.getElementById("pp-vin")?.value || 1.2);
      const rout = parseFloat(document.getElementById("pp-rout")?.value || 50);
      const rload = parseFloat(document.getElementById("pp-rload")?.value || 600);
      const shortPin3 = document.getElementById("pp-short-pin3")?.checked || false;

      let vPin2, vPin3, vDiff;
      if (!shortPin3) {
        iLoad = (2 * vin) / (2 * rout + rload);
        vPin2 = vin - iLoad * rout;
        vPin3 = -(vin - iLoad * rout);
        vDiff = 2 * (vin - iLoad * rout);
        status = "NORMAL SYMMETRICAL";
        cmrr = 95.0;
        thd = 0.0025;
      } else {
        iLoad = vin / (rout + rload);
        vPin2 = vin - iLoad * rout;
        vPin3 = 0;
        vDiff = vPin2;
        status = iLoad > 0.05 ? "CURRENT LIMIT CLIP" : "TS SHORTED";
        cmrr = 48.0;
        thd = iLoad > 0.05 ? 12.5 : 0.085;
      }

      if (key === "6-1-p2" || key === "pp-p2") {
        vRms = vPin2;
        name = "Push-Pull Pin 2 (HOT +)";
      } else if (key === "6-1-p3" || key === "pp-p3") {
        vRms = shortPin3 ? 0.0001 : Math.abs(vPin3);
        phase = Math.PI;
        name = "Push-Pull Pin 3 (COLD -)";
      } else if (key === "6-1-load" || key === "pp-load") {
        vRms = vDiff;
        name = "Differential Across Load";
      } else if (key === "6-1-vin" || key === "pp-vin") {
        vRms = vin;
        name = "Audio Input Drive (Vin)";
      } else if (key === "6-1-op1" || key === "pp-op1") {
        vRms = vin;
        name = "Op-Amp A1 Output (Hot)";
      } else if (key === "6-1-op2" || key === "pp-op2") {
        vRms = shortPin3 ? 14.0 : vin;
        phase = Math.PI;
        shape = shortPin3 ? "clipped" : "sine";
        name = "Op-Amp A2 Output (Inverting)";
      } else if (key === "6-1-p1" || key === "pp-p1") {
        vRms = 0.0001;
        shape = "flatline";
        name = "Pin 1 Chassis Ground";
      }
    } else if (key.startsWith("6-2") || key.startsWith("ib")) {
      const vin = isMuted ? 0.0 : parseFloat(document.getElementById("ib-vin")?.value || 1.2);
      const rout = parseFloat(document.getElementById("ib-rout")?.value || 50);
      const rload = parseFloat(document.getElementById("ib-rload")?.value || 10000);
      iLoad = vin / (rout + rload);
      const vPin2 = iLoad * rload;

      if (key === "6-2-p2" || key === "ib-p2") {
        vRms = vPin2;
        status = "ACTIVE DRIVEN (+)";
        name = "Impedance-Balanced Pin 2 (HOT +)";
      } else if (key === "6-2-p3" || key === "ib-p3") {
        vRms = 0.0001;
        shape = "flatline";
        status = "PASSIVE MATCH (0V SIGNAL, 50Ω Z)";
        name = "Impedance-Balanced Pin 3 (COLD -)";
      } else if (key === "6-2-load" || key === "ib-load") {
        vRms = vPin2;
        status = "DIFFERENTIAL LOAD OK";
        name = "Differential Across Load";
      } else if (key === "6-2-p1" || key === "ib-p1") {
        vRms = 0.0001;
        shape = "flatline";
        name = "Pin 1 Chassis Ground";
      } else {
        vRms = vin;
        name = "Audio Input Drive";
      }
    } else if (key.startsWith("xfmr") || key.startsWith("6-3")) {
      let simVin = isMuted ? 0.0 : 1.23;
      let ratio = 1.0;
      if (window.audioTransformerSim && window.audioTransformerSim.state) {
        simVin = isMuted ? 0.0 : (window.audioTransformerSim.state.vin || 1.23);
        ratio = (window.audioTransformerSim.state.n2 || 1500) / (window.audioTransformerSim.state.n1 || 1500);
      }
      const vSec = simVin * ratio;

      if (key === "xfmr-vin" || key === "6-3-pri") {
        vRms = simVin;
        status = "PRIMARY GENERATOR";
        name = "Transformer Gen In (Vin)";
      } else if (key === "xfmr-pri") {
        vRms = simVin;
        status = "PRIMARY WINDING DRIVE";
        name = "Transformer Primary (N1)";
      } else if (key === "xfmr-sec" || key === "xfmr-p2" || key === "6-3-p2" || key === "6-3-sec") {
        vRms = vSec;
        status = "TRANSFORMED SECONDARY (+)";
        name = "Transformer Pin 2 (HOT +)";
      } else if (key === "xfmr-p3" || key === "6-3-p3") {
        vRms = vSec;
        phase = Math.PI;
        status = "FLOATING SECONDARY (-)";
        name = "Transformer Pin 3 (COLD -)";
      } else if (key === "xfmr-load") {
        vRms = vSec;
        status = "TRANSFORMER LOAD OUT";
        name = "Secondary Load Resistor";
      } else if (key === "xfmr-p1") {
        vRms = 0.0001;
        shape = "flatline";
        status = "AES48 CHASSIS GROUND";
        name = "Transformer Pin 1 (CHASSIS)";
      } else if (key === "xfmr-shield") {
        vRms = 0.0005;
        shape = "flatline";
        status = "FARADAY SHIELD";
        name = "Faraday Shield Foil";
      } else if (key === "xfmr-core") {
        vRms = 0.15;
        shape = "sine";
        status = "CORE MAGNETIC FLUX";
        name = "Core Saturation Flux";
      } else if (key === "xfmr-zobel") {
        vRms = simVin * ratio * 0.98;
        status = "ZOBEL DAMPED SECONDARY";
        name = "Zobel Damping Network";
      }
    } else if (key.startsWith("meyer")) {
      const vpo = parseFloat(document.getElementById("meyer-vpo")?.value || 1.0);
      const vgvd = parseFloat(document.getElementById("meyer-vgvd")?.value || 1.0);
      const zpo = parseFloat(document.getElementById("meyer-zpo")?.value || 50);
      const zro = parseFloat(document.getElementById("meyer-zro")?.value || 50);
      const cmz = parseFloat(document.getElementById("meyer-cmz")?.value || 20);
      const deltaZ = Math.abs(zpo - zro);
      const vErr = vgvd * (deltaZ / (50000 + cmz));

      if (key === "meyer-vgvd") {
        vRms = vgvd;
        freq = 60.0;
        shape = "hum";
        status = "GROUND OFFSET (60Hz HUM)";
        name = "Ground Loop V_GVD";
      } else if (key === "meyer-vpo" || key === "meyer-p2") {
        vRms = vpo;
        status = "GENERATOR HOT (V_PO)";
        name = "Generator V_PO (Hot)";
      } else if (key === "meyer-vro" || key === "meyer-p3") {
        vRms = vpo;
        phase = Math.PI;
        status = "GENERATOR RETURN (V_RO)";
        name = "Generator V_RO (Cold)";
      } else if (key === "meyer-shield") {
        vRms = vgvd * (cmz / (cmz + 20));
        freq = 60.0;
        shape = "hum";
        status = "SHIELD GROUND LOOP CURRENT";
        name = "Cable Shield (Loop)";
      } else if (key === "meyer-verr") {
        vRms = Math.max(0.00001, vErr);
        freq = 60.0;
        shape = "hum";
        status = `CM-TO-DM ERROR (ΔZ=${deltaZ.toFixed(1)}Ω)`;
        name = "CM-to-DM Noise Error";
      } else if (key === "meyer-diff") {
        vRms = 2 * vpo * (20000 / (20000 + zpo + zro));
        status = "RECEIVER DIFFERENTIAL AUDIO";
        name = "Receiver Differential Out";
      }
    } else if (key.startsWith("enc")) {
      if (key === "enc-shield") {
        vRms = 0.05;
        shape = "hum";
        freq = 60.0;
        status = "SHIELD CHASSIS POTENTIAL";
        name = "Cable Shield Outside Shell";
      } else if (key === "enc-pin1bond") {
        vRms = 0.0001;
        shape = "flatline";
        status = "AES48 DIRECT CHASSIS BOND (0V)";
        name = "AES48 Direct Chassis Bond";
      } else if (key === "enc-pin1fault") {
        vRms = 0.35;
        freq = 120.0;
        shape = "hum";
        status = "PIN 1 FAULT (120Hz GROUND BUZZ)";
        name = "Pin 1 Routed to Board Ground";
      } else {
        vRms = 0.001;
        shape = "flatline";
        status = "EQUIPMENT A CHASSIS";
        name = "Equipment A Chassis Ground";
      }
    } else if (key.startsWith("xlrm-") || key.startsWith("xlrf-")) {
      // Universal XLR Hub: contact voltages for the selected AES14 Table 2 configuration, +4 dBu line
      const item = (typeof AES14_TABLE2_DATA !== "undefined" && window.xlrHubEngine)
        ? AES14_TABLE2_DATA.find(d => d.id === window.xlrHubEngine.currentCircuitId) || AES14_TABLE2_DATA[0]
        : null;
      const lineVrms = isMuted ? 0 : 1.228;
      const side = key.startsWith("xlrm-") ? "Male" : "Female";
      const pins = item ? item.pins : {};
      // Unbalanced configs carry the whole signal on the hot contact; balanced split it between hot and cold
      const balanced = Object.values(pins).some(p => p && p.type === "cold");
      const dcNote = (p) => (p && p.dc && !/^0V/.test(p.dc) ? ` · ${p.dc}` : "");

      if (key.endsWith("-diff")) {
        vRms = lineVrms;
        name = `${item ? item.name : "XLR"}: across 2↔3`;
        status = item && item.id === 4 ? "DIFFERENTIAL · 12V DC ACROSS 2-3!" : "RECEIVER DIFFERENTIAL";
      } else {
        const n = Number(key.split("-p")[1]);
        const pin = pins[n];
        name = `${side} ${n}: ${pin ? pin.name : "n/c"}`;
        if (!pin || pin.type === "shield" || pin.type === "jumper") {
          vRms = 0.0001;
          shape = "flatline";
          status = pin ? `${pin.type === "jumper" ? "TIED TO PIN 1" : "CHASSIS"}${dcNote(pin)}` : "NOT CONNECTED";
        } else {
          vRms = balanced ? lineVrms / 2 : lineVrms;
          phase = pin.type === "cold" ? Math.PI : 0;
          status = `${pin.type === "cold" ? "COLD" : "HOT"}${dcNote(pin)}`;
        }
      }
    } else {
      vRms = 1.0;
      status = "CUSTOM TEST ANCHOR";
      name = key;
    }

    const vPk = vRms * Math.SQRT2;
    return {
      freq,
      vRms,
      vPk,
      phase,
      shape,
      status,
      thd,
      cmrr,
      iLoad,
      name
    };
  }

  getCircuitChannelData() {
    return this.getSignalForTarget(this.scope1Target);
  }

  // Target keys that are already a measurement across the pair (Pin 2 to Pin 3) rather than one wire to ground
  isAcrossKey(key) {
    return /-(load|diff|sec)$/.test(key || "");  // e.g. xfmr-load, meyer-diff, xlrf-diff
  }

  // Hot, cold and across-the-pair keys for the schematic currently in view
  activePairKeys() {
    const cfg = this.currentActiveSchematic || SCHEMATIC_CONFIGS[3];
    return { hot: cfg.scope1_ch2, cold: cfg.scope2_ch3, across: cfg.scope2_ch4 };
  }

  // A LUCKY with its COM lead across the pair reads the differential node instead of its probed point
  effectiveDmmTarget(n) {
    const target = n === 1 ? this.dmm1Target : this.dmm2Target;
    const com = n === 1 ? this.dmm1Com : this.dmm2Com;
    return com === "across" ? this.activePairKeys().across : target;
  }

  // Short name of a probed point: PIN 2, GEN, SHIELD, CHASSIS …
  shortPoint(key) {
    const nm = (this.getSignalForTarget(key).name || key || "").toUpperCase();
    const pin = nm.match(/(?:PIN|SOCKET|CONTACT)\s*(\d)/);
    if (/ACROSS 2↔3|DIFFERENTIAL|ACROSS LOAD|-LOAD$|-DIFF$/.test(nm) || this.isAcrossKey(key)) return "PIN 2 ↔ PIN 3";
    if (pin) return `PIN ${pin[1]}`;
    if (/VIN|INPUT DRIVE|GENERATOR|AUDIO INP|PRIMARY/.test(nm)) return "GEN";
    if (/SHIELD/.test(nm)) return "SHIELD";
    if (/CHASSIS|BOND/.test(nm)) return "CHASSIS";
    if (/SECONDARY/.test(nm)) return "SECONDARY";
    return nm.length > 12 ? nm.slice(0, 11) + "…" : nm;
  }

  // What a meter is measuring, as its whole name: "PIN 2 → GND" or "PIN 2 ↔ PIN 3"
  measuredLabel(key, forceAcross = false) {
    if (forceAcross || this.isAcrossKey(key)) return "PIN 2 ↔ PIN 3";
    const pt = this.shortPoint(key);
    return pt === "PIN 2 ↔ PIN 3" ? pt : `${pt} → GND`;
  }

  // "V+ … · COM …" text describing what a meter is connected between
  referenceText(key, forceAcross = false) {
    const shortName = (k) => {
      const nm = this.getSignalForTarget(k).name || k;
      return nm.length > 24 ? nm.substring(0, 23).trim() + "…" : nm;
    };
    if (forceAcross || this.isAcrossKey(key)) {
      const pair = this.activePairKeys();
      return `V+ ${shortName(pair.hot)} · COM ${shortName(pair.cold)} · ACROSS PAIR`;
    }
    return `V+ ${shortName(key)} · COM GND (Pin 1)`;
  }

  // Fill a meter's reference line: what it is across, Vrms, dBu and distance from the +4 dBu goal
  setReferenceLine(id, key, vRms, forceAcross = false) {
    const line = document.getElementById(id);
    if (!line) return;
    const across = forceAcross || this.isAcrossKey(key);
    const dbu = vRms > 0.00001 ? 20 * Math.log10(vRms / 0.7746) : -120;
    const delta = dbu - GOAL_DBU;
    const txt = line.querySelector(".rack-ref-text");
    const goal = line.querySelector(".rack-goal");
    if (txt) {
      txt.textContent = this.referenceText(key, forceAcross);
      txt.title = txt.textContent;
    }
    if (goal) {
      const onGoal = Math.abs(delta) < 0.5;
      const oneLeg = !across && Math.abs(delta + 6.02) < 0.6;
      goal.textContent = `${vRms.toFixed(3)} Vrms · ${dbu >= 0 ? "+" : ""}${dbu.toFixed(1)} dBu · GOAL +${GOAL_DBU}: ${onGoal ? "✓ ON" : `${delta >= 0 ? "+" : ""}${delta.toFixed(1)} dB`}${oneLeg ? " (one leg = ½ swing)" : ""}`;
      goal.className = `rack-goal ${onGoal ? "on" : oneLeg ? "leg" : "off"}`;
    }
    const drop = line.querySelector(".rack-drop");
    if (drop) this.setDropBar(drop, dbu);
    const comBtn = line.querySelector(".rack-com-btn");
    if (comBtn) {
      comBtn.textContent = forceAcross ? "COM: ACROSS" : "COM: GND";
      comBtn.classList.toggle("across", !!forceAcross);
    }
  }

  // Bar from −30 to +10 dB around the +4 dBu goal; the fill shows how far the level drops (or rises)
  setDropBar(el, dbu) {
    const delta = dbu - GOAL_DBU;
    const onGoal = Math.abs(delta) < 0.5;
    const oneLeg = Math.abs(delta + 6.02) < 0.6;
    const pos = (d) => ((Math.max(-30, Math.min(10, d)) + 30) / 40) * 100;
    const fill = el.querySelector("i");
    const lo = Math.min(pos(delta), pos(0));
    const hi = Math.max(pos(delta), pos(0));
    fill.style.left = `${lo}%`;
    fill.style.width = `${Math.max(1.5, hi - lo)}%`;
    el.className = `rack-drop ${onGoal ? "on" : oneLeg ? "leg" : "off"}`;
    el.querySelector("b").textContent = dbu <= -119 ? "—" : onGoal ? "+4 ✓" : `${delta >= 0 ? "+" : ""}${delta.toFixed(1)} dB`;
  }

  // LUCKY DMM #1 jumps to Ω or C while a resistance / capacitance control is being turned
  showLcr({ kind, value, label }) {
    this.lcr = { kind, value, label };
    clearTimeout(this.lcrTimer);
    this.lcrTimer = setTimeout(() => {
      this.lcr = null;
      this.updateFromActiveCircuit();
    }, 4000);
    this.updateFromActiveCircuit();
  }

  renderLcr() {
    const lcrEl = document.getElementById("rack-dmm1-lcr");
    const matrix = document.getElementById("rack-dmm1-matrix");
    const on = !!this.lcr;
    if (lcrEl) lcrEl.hidden = !on;
    if (matrix) matrix.hidden = on;
    if (!on) return false;

    const si = (v, unit) => {
      const steps = [[1e6, "M"], [1e3, "k"], [1, ""], [1e-3, "m"], [1e-6, "µ"], [1e-9, "n"], [1e-12, "p"]];
      const [m, p] = steps.find(([m]) => Math.abs(v) >= m) || steps[steps.length - 1];
      const n = v / m;
      return `${n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)} ${p}${unit}`;
    };
    const { kind, value, label } = this.lcr;
    const name = label.replace(/\(.*?\)/, "").trim() || (kind === "C" ? "CAPACITANCE" : "RESISTANCE");
    const v1 = document.getElementById("rack-dmm1-val1");
    const v2 = document.getElementById("rack-dmm1-val2");
    if (v1) v1.textContent = si(value, kind === "C" ? "F" : "Ω");
    if (v2) v2.textContent = kind === "C" ? "C · LCR" : "Ω · LCR";
    const nameEl = document.getElementById("rack-dmm1-name");
    if (nameEl) nameEl.textContent = `${kind === "C" ? "C" : "R"} · ${name}`;
    const status = document.getElementById("rack-dmm1-status");
    if (status) {
      status.textContent = kind === "C" ? "CAPACITANCE" : "RESISTANCE";
      status.className = "rack-status-pill yellow";
    }

    let rows;
    if (kind === "C") {
      // Reactance at audio frequencies: Xc = 1 / (2πfC)
      rows = [100, 1000, 10000, 20000].map(f => [`Xc @ ${f >= 1000 ? f / 1000 + "k" : f}Hz`, si(1 / (2 * Math.PI * f * value), "Ω")]);
    } else {
      const vLine = 1.228; // +4 dBu across it
      rows = [
        ["Z (all f)", si(value, "Ω")],
        ["G", si(1 / value, "S")],
        ["I @ +4 dBu", si(vLine / value, "A")],
        ["P @ +4 dBu", si((vLine * vLine) / value, "W")]
      ];
    }
    if (lcrEl) lcrEl.innerHTML = rows.map(([k, v]) => `<div class="matrix-item"><span class="m-lbl">${k}:</span><span class="m-val">${v}</span></div>`).join("");
    return true;
  }

  updateFromActiveCircuit() {
    const data1 = this.getSignalForTarget(this.effectiveDmmTarget(1));
    const data2 = this.getSignalForTarget(this.effectiveDmmTarget(2));
    const sc1Data = this.getSignalForTarget(this.scope1Target);
    const sc2Data = this.getSignalForTarget(this.scope2Target);

    const refZ = this.refZ || 600;
    const vRefZ = Math.sqrt(0.001 * refZ);
    const rTxt = refZ >= 1000 ? `${(refZ / 1000).toFixed(refZ % 1000 === 0 ? 0 : 1)} k` : `${refZ}`;

    const setElText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    const formatBadge = (status) => {
      if (!status) return "LIVE";
      if (status.includes("CLIP")) return "CLIPPING";
      if (status.includes("FAULT")) return "FAULT";
      if (status.includes("GENERATOR HOT")) return "GEN HOT";
      if (status.includes("GENERATOR RETURN")) return "GEN COLD";
      if (status.includes("TRANSFORMED SECONDARY")) return "XFMR SEC";
      if (status.includes("FLOATING SECONDARY")) return "XFMR COLD";
      if (status.includes("PRIMARY WINDING")) return "XFMR PRI";
      if (status.includes("CHASSIS")) return "CHASSIS";
      if (status.includes("FARADAY")) return "SHIELD";
      if (status.includes("CM-TO-DM")) return "CM ERROR";
      if (status.includes("RECEIVER DIFFERENTIAL")) return "RX DIFF";
      if (status.includes("DIFFERENTIAL")) return "DIFF OUT";
      if (status.includes("BALANCED")) return "BALANCED";
      if (status.includes("HOT")) return "+VE HOT";
      if (status.includes("COLD")) return "-VE COLD";
      return status.length > 12 ? status.substring(0, 11).trim() : status;
    };

    // 1. Update DMM 1 (Lucky 8050A #1)
    const v1Rms = Math.max(0, data1.vRms);
    const v1Pk = v1Rms * Math.SQRT2;
    const v1Pp = v1Pk * 2;
    const dbu1 = (v1Rms > 0.00001) ? 20 * Math.log10(v1Rms / 0.7746) : -120;
    const dbv1 = (v1Rms > 0.00001) ? 20 * Math.log10(v1Rms / 1.0) : -120;
    const dbm1 = (v1Rms > 0.00001) ? 20 * Math.log10(v1Rms / vRefZ) : -120;
    const pMw1 = (v1Rms * v1Rms / Math.max(1, refZ)) * 1000;
    const iMa1 = (v1Rms / Math.max(1, refZ)) * 1000;

    const dmm1Val1 = document.getElementById("rack-dmm1-val1");
    const dmm1Val2 = document.getElementById("rack-dmm1-val2");
    const dmm1Status = document.getElementById("rack-dmm1-status");
    const dmm1Detail = document.getElementById("dmm1-detail-text");

    if (dmm1Val1 && dmm1Val2) {
      if (this.dmm1Mode === "rms") {
        dmm1Val1.textContent = `${v1Rms.toFixed(3)} Vrms`;
        dmm1Val2.textContent = `${dbu1 >= 0 ? "+" : ""}${dbu1.toFixed(1)} dBu`;
      } else if (this.dmm1Mode === "dbu") {
        dmm1Val1.textContent = `${dbm1 >= 0 ? "+" : ""}${dbm1.toFixed(2)} dBm`;
        dmm1Val2.textContent = `${v1Rms.toFixed(3)} V RMS`;
      } else if (this.dmm1Mode === "peak") {
        dmm1Val1.textContent = `${v1Pk.toFixed(3)} Vpk`;
        dmm1Val2.textContent = `${v1Pp.toFixed(3)} Vpp`;
      } else {
        dmm1Val1.textContent = `1.414 CF`;
        dmm1Val2.textContent = `${rTxt} Ω (REF Z)`;
      }
    }
    if (dmm1Status) {
      dmm1Status.textContent = formatBadge(data1.status);
      dmm1Status.className = data1.status.includes("CLIP") || data1.status.includes("FAULT") ? "rack-status-pill amber" : "rack-status-pill yellow";
    }
    if (dmm1Detail) {
      dmm1Detail.textContent = `Probed: ${data1.name} • ${v1Rms.toFixed(3)}V RMS • ${data1.status}`;
    }

    // Populate DMM 1 Matrix & Equivalents Table
    setElText("dmm1-mat-vpk", `${v1Pk.toFixed(3)}V`);
    setElText("dmm1-mat-vpp", `${v1Pp.toFixed(3)}V`);
    setElText("dmm1-mat-dbu", `${dbu1 >= 0 ? "+" : ""}${dbu1.toFixed(2)}`);
    setElText("dmm1-mat-dbv", `${dbv1 >= 0 ? "+" : ""}${dbv1.toFixed(2)}`);
    setElText("dmm1-mat-dbm", `${dbm1 >= 0 ? "+" : ""}${dbm1.toFixed(2)}`);
    setElText("dmm1-mat-pmw", `${pMw1.toFixed(2)}`);
    setElText("dmm1-mat-ima", `${iMa1.toFixed(2)}`);
    setElText("dmm1-mat-refz", `${rTxt}Ω`);

    setElText("dmm1-tbl-vpp", `${v1Pp.toFixed(3)} Vpp`);
    setElText("dmm1-tbl-vpk", `${v1Pk.toFixed(3)} Vpk`);
    setElText("dmm1-tbl-dbu", `${dbu1 >= 0 ? "+" : ""}${dbu1.toFixed(2)} dBu`);
    setElText("dmm1-tbl-dbv", `${dbv1 >= 0 ? "+" : ""}${dbv1.toFixed(2)} dBV`);
    setElText("dmm1-tbl-pwr", `${pMw1.toFixed(2)} mW`);
    setElText("dmm1-tbl-cur", `${iMa1.toFixed(2)} mA`);

    // 2. Update DMM 2 (Lucky 8050A #2)
    const v2Rms = Math.max(0, data2.vRms);
    const v2Pk = v2Rms * Math.SQRT2;
    const v2Pp = v2Pk * 2;
    const dbu2 = (v2Rms > 0.00001) ? 20 * Math.log10(v2Rms / 0.7746) : -120;
    const dbv2 = (v2Rms > 0.00001) ? 20 * Math.log10(v2Rms / 1.0) : -120;
    const dbm2 = (v2Rms > 0.00001) ? 20 * Math.log10(v2Rms / vRefZ) : -120;
    const pMw2 = (v2Rms * v2Rms / Math.max(1, refZ)) * 1000;

    const dmm2Val1 = document.getElementById("rack-dmm2-val1");
    const dmm2Val2 = document.getElementById("rack-dmm2-val2");
    const dmm2Status = document.getElementById("rack-dmm2-status");
    const dmm2Detail = document.getElementById("dmm2-detail-text");

    if (dmm2Val1 && dmm2Val2) {
      if (this.dmm2Mode === "diff") {
        dmm2Val1.textContent = `${v2Rms.toFixed(3)} Vrms`;
        dmm2Val2.textContent = `${dbu2 >= 0 ? "+" : ""}${dbu2.toFixed(1)} dBu`;
      } else if (this.dmm2Mode === "thd") {
        dmm2Val1.textContent = `${data2.thd.toFixed(3)} %`;
        const distDb = -20 * Math.log10(Math.max(0.00001, data2.thd / 100));
        dmm2Val2.textContent = `-${distDb.toFixed(1)} dB`;
      } else if (this.dmm2Mode === "cmrr") {
        dmm2Val1.textContent = `${data2.cmrr.toFixed(1)} dB`;
        dmm2Val2.textContent = `CMRR REJECT`;
      } else {
        dmm2Val1.textContent = `${dbm2 >= 0 ? "+" : ""}${dbm2.toFixed(1)} dBm`;
        dmm2Val2.textContent = `${rTxt} Ω (REF Z)`;
      }
    }
    if (dmm2Status) {
      dmm2Status.textContent = data2.cmrr >= 80 ? "BALANCED" : formatBadge(data2.status);
      dmm2Status.className = data2.cmrr >= 80 ? "rack-status-pill green" : "rack-status-pill amber";
    }
    if (dmm2Detail) {
      dmm2Detail.textContent = `Probed: ${data2.name} • ${v2Rms.toFixed(3)}V RMS • CMRR: ${data2.cmrr.toFixed(1)} dB • THD: ${data2.thd.toFixed(3)}%`;
    }

    // Populate DMM 2 Matrix & Equivalents Table
    setElText("dmm2-mat-vpk", `${v2Pk.toFixed(3)}V`);
    setElText("dmm2-mat-vpp", `${v2Pp.toFixed(3)}V`);
    setElText("dmm2-mat-dbu", `${dbu2 >= 0 ? "+" : ""}${dbu2.toFixed(2)}`);
    setElText("dmm2-mat-dbv", `${dbv2 >= 0 ? "+" : ""}${dbv2.toFixed(2)}`);
    setElText("dmm2-mat-dbm", `${dbm2 >= 0 ? "+" : ""}${dbm2.toFixed(2)}`);
    setElText("dmm2-mat-pmw", `${pMw2.toFixed(2)}mW`);
    setElText("dmm2-mat-thd", `${data2.thd.toFixed(3)}%`);
    setElText("dmm2-mat-cmrr", data2.cmrr >= 100 ? ">100dB" : `${data2.cmrr.toFixed(1)}dB`);

    setElText("dmm2-tbl-vpp", `${v2Pp.toFixed(3)} Vpp`);
    setElText("dmm2-tbl-vpk", `${v2Pk.toFixed(3)} Vpk`);
    setElText("dmm2-tbl-dbu", `${dbu2 >= 0 ? "+" : ""}${dbu2.toFixed(2)} dBu`);
    setElText("dmm2-tbl-dbv", `${dbv2 >= 0 ? "+" : ""}${dbv2.toFixed(2)} dBV`);
    setElText("dmm2-tbl-pwr", `${pMw2.toFixed(2)} mW`);
    setElText("dmm2-tbl-cmrr", data2.cmrr >= 100 ? ">100.0 dB" : `${data2.cmrr.toFixed(1)} dB`);

    // 3. Voltmeters 1–4: autorange, needle target (dB re full scale), digital readout
    [1, 2, 3, 4].forEach(n => {
      const data = this.getSignalForTarget(this[`vu${n}Target`]);
      const v = Math.max(0, data.vRms);
      if (this.vmAuto[n]) this[`vu${n}Range`] = VM_RANGES.find(r => v <= r * 1.02) || VM_RANGES[VM_RANGES.length - 1];
      const range = this[`vu${n}Range`];
      this[`vu${n}TargetDbu`] = 20 * Math.log10(Math.max(0.00005, v / range));

      const dbu = v > 0.00001 ? 20 * Math.log10(v / 0.7746) : -120;
      const delta = dbu - GOAL_DBU;
      this[`vu${n}Dbu`] = dbu;
      setElText(`rack-vu${n}-range-badge`, `${this.vmAuto[n] ? "AUTO " : ""}${range}V`);
      setElText(`vu${n}-detail-text`, `Probed: ${data.name} • ${v.toFixed(3)} V RMS • ${data.status}`);
    });
    const vu1Data = this.getSignalForTarget(this.vu1Target);
    const vu2Data = this.getSignalForTarget(this.vu2Target);

    // Each meter is named only by what it measures
    setElText("rack-dmm1-name", this.measuredLabel(this.effectiveDmmTarget(1), this.dmm1Com === "across"));
    setElText("rack-dmm2-name", this.measuredLabel(this.effectiveDmmTarget(2), this.dmm2Com === "across"));
    [1, 2, 3, 4].forEach(n => setElText(`rack-vu${n}-name`, this.measuredLabel(this[`vu${n}Target`])));

    // Reference lines: what each meter is across, Vrms, dBu and distance from +4 dBu
    this.setReferenceLine("rack-dmm1-ref", this.effectiveDmmTarget(1), v1Rms, this.dmm1Com === "across");
    this.setReferenceLine("rack-dmm2-ref", this.effectiveDmmTarget(2), v2Rms, this.dmm2Com === "across");
    this.setReferenceLine("rack-scope1-ref", this.scope1Target, sc1Data.vRms);
    this.setReferenceLine("rack-scope2-ref", this.scope2Target, sc2Data.vRms);

    // 4. Update Scope Telemetry Text
    const sc1Tel = document.getElementById("scope1-telemetry");
    if (sc1Tel) {
      sc1Tel.textContent = `CH1 (Yellow Vin): 1.23V • CH2 (${sc1Data.name}): ${sc1Data.vRms.toFixed(2)}V RMS (${sc1Data.status})`;
    }
    const sc2Tel = document.getElementById("scope2-telemetry");
    if (sc2Tel) {
      sc2Tel.textContent = `CH3 (Pink Cold): 1.23V • CH4 (${sc2Data.name}): ${sc2Data.vRms.toFixed(2)}V RMS (${sc2Data.status})`;
    }

    // LCR mode overrides DMM #1 while a resistance / capacitance control is being turned
    this.renderLcr();

    // 5. Append sample to Trend Recorder
    if (this.trendRunning) {
      this.trendBuffer.push({
        vHot: data1.vRms,
        vCold: data2.vRms,
        vDiff: sc2Data.vRms,
        time: Date.now()
      });
      if (this.trendBuffer.length > this.maxTrendSamples) {
        this.trendBuffer.shift();
      }
    }
  }

  startMainInstrumentLoop() {
    const loop = () => {
      // 1. Advance VU Meter Ballistics
      this.updateNeedleBallistics();

      // 2. Render the 8-channel scope
      this.renderScope8();

      // 3. Render Both APK VU Meters
      [1, 2, 3, 4].forEach(n => this.renderHpVoltmeter(n));

      // 4. Render Trend Graph if tab active
      if (this.currentTab === "chart") {
        this.renderTrendGraph();
      }

      // 5. Update Active Schematic from scroll position & Render Dynamic SVG Wires
      this.updateActiveSchematicFromScroll();
      this.renderWires();

      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  updateNeedleBallistics() {
    const eps = 0.02;

    [3, 4].forEach(n => {
      const needle = `vu${n}NeedleDbu`;
      const target = this[`vu${n}TargetDbu`];
      if (this[needle] < target - eps) this[needle] += (target - this[needle]) * this.attackRate;
      else if (this[needle] > target + eps) this[needle] -= (this[needle] - target) * this.releaseRate;
    });

    // Meter 1
    if (this.vu1NeedleDbu < this.vu1TargetDbu - eps) {
      this.vu1NeedleDbu += (this.vu1TargetDbu - this.vu1NeedleDbu) * this.attackRate;
    } else {
      this.vu1NeedleDbu -= (this.vu1NeedleDbu - this.vu1TargetDbu) * this.releaseRate;
    }

    // Meter 2
    if (this.vu2NeedleDbu < this.vu2TargetDbu - eps) {
      this.vu2NeedleDbu += (this.vu2TargetDbu - this.vu2NeedleDbu) * this.attackRate;
    } else {
      this.vu2NeedleDbu -= (this.vu2NeedleDbu - this.vu2TargetDbu) * this.releaseRate;
    }
  }

  // Eight probe points as separate strips sharing one time axis: CH1–CH4 are the scope probes,
  // CH5–CH8 show what DMM1, DMM2, VM3 and VM4 are probing
  scope8Channels() {
    return [
      { tag: "CH1", key: this.scope1VinTarget, color: PROBE_COLORS.CH1 },
      { tag: "CH2", key: this.scope1Target, color: PROBE_COLORS.CH2 },
      { tag: "CH3", key: this.scope2ColdTarget, color: PROBE_COLORS.CH3 },
      { tag: "CH4", key: this.scope2Target, color: PROBE_COLORS.CH4 },
      { tag: "DMM1", key: this.effectiveDmmTarget(1), color: PROBE_COLORS.DMM1 },
      { tag: "DMM2", key: this.effectiveDmmTarget(2), color: PROBE_COLORS.DMM2 },
      { tag: "VM3", key: this.vu3Target, color: PROBE_COLORS.VU3 },
      { tag: "VM4", key: this.vu4Target, color: PROBE_COLORS.VU4 }
    ];
  }

  renderScope8() {
    const canvas = this.scope8Canvas;
    if (!canvas) return;
    this.fitCanvasToBox(canvas);
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const RULER = 13;
    const LABEL_W = 92;
    const plotW = w - LABEL_W;
    const chans = this.scope8Channels();
    const stripH = (h - RULER) / chans.length;
    const totalMs = 10 * this.scopeTimeDiv;
    const halfV = 2 * this.scope8VoltsDiv; // each strip is 4 divisions tall

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    // Shared vertical time grid through every strip
    ctx.strokeStyle = "#1c1c1c";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 10; i++) {
      const x = Math.round(LABEL_W + (i / 10) * plotW) + 0.5;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h - RULER);
    }
    ctx.stroke();

    chans.forEach((c, k) => {
      const top = k * stripH;
      const mid = top + stripH / 2;
      const data = this.getSignalForTarget(c.key);

      ctx.strokeStyle = "#262626";
      ctx.beginPath();
      ctx.moveTo(LABEL_W, Math.round(top) + 0.5);
      ctx.lineTo(w, Math.round(top) + 0.5);
      ctx.stroke();
      ctx.strokeStyle = "#333333";
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(LABEL_W, Math.round(mid) + 0.5);
      ctx.lineTo(w, Math.round(mid) + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label column: tag, probed point, level
      ctx.fillStyle = c.color;
      ctx.font = "bold 9px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText(c.tag, 3, mid - 5);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "7.5px 'JetBrains Mono', monospace";
      ctx.fillText(this.measuredLabel(c.key, c.tag === "DMM2" ? this.dmm2Com === "across" : c.tag === "DMM1" ? this.dmm1Com === "across" : false), 3, mid + 5);
      ctx.fillStyle = c.color;
      ctx.textAlign = "right";
      ctx.fillText(`${data.vRms.toFixed(2)}V`, LABEL_W - 4, mid - 5);

      // Trace
      ctx.save();
      ctx.beginPath();
      ctx.rect(LABEL_W, top + 1, plotW, stripH - 2);
      ctx.clip();
      ctx.strokeStyle = c.color;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = c.color;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      const samples = Math.max(120, Math.round(plotW));
      for (let sIdx = 0; sIdx <= samples; sIdx++) {
        const t = (sIdx / samples) * totalMs / 1000;
        let v = 0;
        if (data.shape !== "flatline") {
          v = data.vPk * Math.sin(2 * Math.PI * data.freq * t + (data.shape === "hum" ? 0 : (data.phase || 0)));
          if (data.status && data.status.includes("CLIP")) v = Math.max(-1.5, Math.min(1.5, v * 1.8));
        }
        const x = LABEL_W + (sIdx / samples) * plotW;
        const y = mid - (v / halfV) * (stripH / 2 - 1);
        if (sIdx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    });

    // Common time ruler
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, h - RULER, w, RULER);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "7.5px 'JetBrains Mono', monospace";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= 10; i += 2) {
      const x = LABEL_W + (i / 10) * plotW;
      ctx.textAlign = i === 0 ? "left" : i === 10 ? "right" : "center";
      const ms = i * this.scopeTimeDiv;
      ctx.fillText(`${ms >= 1 ? ms.toFixed(ms % 1 ? 1 : 0) : ms.toFixed(2)}ms`, x, h - RULER / 2);
    }
    ctx.textAlign = "left";
    ctx.fillStyle = "#64748b";
    ctx.fillText(`${this.scope8VoltsDiv}V/div`, 3, h - RULER / 2);
  }

  renderScope1() {
    if (!this.scope1Ctx || !this.scope1Canvas) return;
    this.fitCanvasToBox(this.scope1Canvas);
    const ctx = this.scope1Ctx;
    const w = this.scope1Canvas.width;
    const h = this.scope1Canvas.height;

    // Phosphor decay persistence
    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.fillRect(0, 0, w, h);

    // Graticule Grid
    this.drawGraticule(ctx, w, h);

    const vinData = this.getSignalForTarget(this.scope1VinTarget || "xfmr-vin");
    const sc1Data = this.getSignalForTarget(this.scope1Target);
    const voltsPerDiv = this.scope1VoltsDiv;
    const timePerDiv = this.scopeTimeDiv * 0.001;
    const totalTimeSpan = 10 * timePerDiv;
    const numSamples = 200;
    const midY = h / 2;

    // Waveform 1: Vin Drive (CH1)
    ctx.strokeStyle = PROBE_COLORS.CH1;
    ctx.lineWidth = 3;
    ctx.shadowColor = PROBE_COLORS.CH1;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      const v = (vinData.vPk || 1.737) * Math.sin(2 * Math.PI * (vinData.freq || 1000) * t);
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Waveform 2: Probed Target (CH2)
    ctx.strokeStyle = PROBE_COLORS.CH2;
    ctx.lineWidth = 3;
    ctx.shadowColor = PROBE_COLORS.CH2;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      let v = 0;
      if (sc1Data.shape === "flatline") {
        v = 0;
      } else if (sc1Data.shape === "hum") {
        v = sc1Data.vPk * Math.sin(2 * Math.PI * sc1Data.freq * t);
      } else {
        v = sc1Data.vPk * Math.sin(2 * Math.PI * sc1Data.freq * t + (sc1Data.phase || 0));
        if (sc1Data.status.includes("CLIP")) {
          v = Math.max(-1.5, Math.min(1.5, v * 1.8));
        }
      }
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Minimal CRT Readout (top)
    ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = PROBE_COLORS.CH1;
    ctx.textAlign = "left";
    const lblVin = vinData.name.length > 9 ? vinData.name.substring(0, 9).toUpperCase() : vinData.name.toUpperCase();
    ctx.fillText(`CH1: ${lblVin}`, 6, 11);
    ctx.fillStyle = PROBE_COLORS.CH2;
    const lbl1 = sc1Data.name.length > 13 ? sc1Data.name.substring(0, 13).toUpperCase() : sc1Data.name.toUpperCase();
    ctx.fillText(`CH2: ${lbl1}`, 6, 22);
    ctx.fillStyle = "#888888";
    ctx.textAlign = "right";
    ctx.fillText(`${voltsPerDiv}V/DIV`, w - 6, 11);
  }

  renderScope2() {
    if (!this.scope2Ctx || !this.scope2Canvas) return;
    this.fitCanvasToBox(this.scope2Canvas);
    const ctx = this.scope2Ctx;
    const w = this.scope2Canvas.width;
    const h = this.scope2Canvas.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.fillRect(0, 0, w, h);

    this.drawGraticule(ctx, w, h);

    const coldData = this.getSignalForTarget(this.scope2ColdTarget || "xfmr-p3");
    const sc2Data = this.getSignalForTarget(this.scope2Target);
    const voltsPerDiv = this.scope2VoltsDiv;
    const timePerDiv = this.scopeTimeDiv * 0.001;
    const totalTimeSpan = 10 * timePerDiv;
    const numSamples = 200;
    const midY = h / 2;

    // Waveform 3: Cold / Return (CH3)
    ctx.strokeStyle = PROBE_COLORS.CH3;
    ctx.lineWidth = 3;
    ctx.shadowColor = PROBE_COLORS.CH3;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      let v = 0;
      if (coldData.shape !== "flatline") {
        v = (coldData.vPk || 1.737) * Math.sin(2 * Math.PI * (coldData.freq || 1000) * t + Math.PI);
      }
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Waveform 4: Probed Target (CH4)
    ctx.strokeStyle = PROBE_COLORS.CH4;
    ctx.lineWidth = 3;
    ctx.shadowColor = PROBE_COLORS.CH4;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      let v = 0;
      if (sc2Data.shape === "flatline") {
        v = 0;
      } else if (sc2Data.shape === "hum") {
        v = sc2Data.vPk * Math.sin(2 * Math.PI * sc2Data.freq * t);
      } else {
        v = sc2Data.vPk * Math.sin(2 * Math.PI * sc2Data.freq * t + (sc2Data.phase || 0));
        if (sc2Data.status.includes("CLIP")) {
          v = Math.max(-1.5, Math.min(1.5, v * 1.8));
        }
      }
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Minimal CRT Readout (top)
    ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = PROBE_COLORS.CH3;
    ctx.textAlign = "left";
    const lblCold = coldData.name.length > 9 ? coldData.name.substring(0, 9).toUpperCase() : coldData.name.toUpperCase();
    ctx.fillText(`CH3: ${lblCold}`, 6, 11);
    ctx.fillStyle = PROBE_COLORS.CH4;
    const lbl2 = sc2Data.name.length > 13 ? sc2Data.name.substring(0, 13).toUpperCase() : sc2Data.name.toUpperCase();
    ctx.fillText(`CH4: ${lbl2}`, 6, 22);
    ctx.fillStyle = "#888888";
    ctx.textAlign = "right";
    ctx.fillText(`${voltsPerDiv}V/DIV`, w - 6, 11);
  }

  drawGraticule(ctx, w, h) {
    ctx.strokeStyle = "rgba(40, 40, 40, 0.65)";
    ctx.lineWidth = 1;
    const dx = w / 10;
    const dy = h / 8;

    ctx.beginPath();
    for (let i = 1; i < 10; i++) {
      ctx.moveTo(i * dx, 0);
      ctx.lineTo(i * dx, h);
    }
    for (let j = 1; j < 8; j++) {
      ctx.moveTo(0, j * dy);
      ctx.lineTo(w, j * dy);
    }
    ctx.stroke();

    // Central crosshair ticks
    ctx.strokeStyle = "rgba(80, 80, 80, 0.65)";
    ctx.beginPath();
    const midX = w / 2;
    const midY = h / 2;
    for (let j = 0; j <= 8; j += 0.2) {
      const y = j * dy;
      ctx.moveTo(midX - 2, y);
      ctx.lineTo(midX + 2, y);
    }
    for (let i = 0; i <= 10; i += 0.2) {
      const x = i * dx;
      ctx.moveTo(x, midY - 2);
      ctx.lineTo(x, midY + 2);
    }
    ctx.stroke();
  }

  // Keep a canvas's drawing size equal to its laid-out size (the rack shrinks with short windows)
  fitCanvasToBox(canvas) {
    const w = Math.round(canvas.clientWidth);
    const h = Math.round(canvas.clientHeight);
    if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  // HP 400-style analog AC voltmeter face: linear volts movement, non-linear decibel arc,
  // level-pyramid zones placed for the current range, 0–1 and 0–3 R.M.S. volts scales, mirror band
  renderHpVoltmeter(n) {
    const canvas = this[`vu${n}Canvas`];
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const ch = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const color = PROBE_COLORS[`VU${n}`];
    const range = this[`vu${n}Range`];
    const rangeDb = 20 * Math.log10(range / 0.7746);

    ctx.fillStyle = "#fbf9f2";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, 3);

    const cx = w / 2;
    const cy = h * 1.08;
    const A0 = -Math.PI * 0.77;
    const A1 = -Math.PI * 0.23;
    const ang = (frac) => A0 + Math.max(-0.03, Math.min(1.05, frac)) * (A1 - A0);
    const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const rDb = h * 0.98;
    const rV1 = h * 0.72;
    const rV3 = h * 0.52;
    const rCap = h * 0.2;

    // Level-pyramid zones (dBu) at their place on this range
    VM_ZONES.forEach(z => {
      const f0 = (0.7746 * Math.pow(10, z.from / 20)) / range;
      const f1 = (0.7746 * Math.pow(10, z.to / 20)) / range;
      if (f1 <= 0.01 || f0 >= 1.05) return;
      ctx.strokeStyle = z.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, rDb + 4, ang(Math.max(0, f0)), ang(Math.min(1.05, f1)));
      ctx.stroke();
    });

    // Mirror band
    ctx.strokeStyle = "rgba(148, 163, 184, 0.45)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, rDb - 19, A0, A1);
    ctx.stroke();

    // Decibel arc: 0 dB at 0.775 of full scale on the 1 V range (HP convention); red above 0
    const dbFrac = (d) => 0.7746 * Math.pow(10, d / 20);
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(cx, cy, rDb, ang(dbFrac(-20)), ang(dbFrac(0)));
    ctx.stroke();
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(cx, cy, rDb, ang(dbFrac(0)), ang(dbFrac(2.2)));
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const tick = (r, frac, len, lw, col) => {
      const a = ang(frac);
      const [x1, y1] = pt(r, a);
      const [x2, y2] = pt(r - len, a);
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };
    const label = (r, frac, txt, col, size) => {
      const [x, y] = pt(r, ang(frac));
      ctx.fillStyle = col;
      ctx.font = `700 ${size}px Arial, sans-serif`;
      ctx.fillText(txt, x, y);
    };

    [-20, -10, -6, -4, -2, 0, 1, 2].forEach(d => {
      const col = d > 0 ? "#dc2626" : "#0f172a";
      tick(rDb, dbFrac(d), 5, 1.2, col);
      label(rDb - 11, dbFrac(d), d > 0 ? `+${d}` : `${d}`, col, 7);
    });

    // 0–1.0 volts scale
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.arc(cx, cy, rV1, A0, A1);
    ctx.stroke();
    for (let i = 0; i <= 50; i++) tick(rV1, i / 50, i % 10 === 0 ? 5 : i % 5 === 0 ? 3.5 : 2, i % 10 === 0 ? 1 : 0.5, "#334155");
    [0, 0.2, 0.4, 0.6, 0.8, 1].forEach(v => label(rV1 - 10, v, v === 1 ? "1.0" : v === 0 ? "0" : `.${v * 10}`, "#0f172a", 6.5));

    // 0–3 volts scale
    ctx.beginPath();
    ctx.arc(cx, cy, rV3, A0, A1);
    ctx.stroke();
    for (let i = 0; i <= 30; i++) tick(rV3, i / 30, i % 10 === 0 ? 4 : 2, 0.6, "#475569");
    [0, 1, 2, 3].forEach(v => label(rV3 - 9, v / 3, `${v}`, "#334155", 6.5));

    // Scale captions at the left end of each arc, hp badge, range
    ctx.font = "800 6px Arial, sans-serif";
    ctx.fillStyle = "#0f172a";
    const cap = (r, txt) => {
      const [x, y] = pt(r, A0 - 0.09);
      ctx.fillText(txt, x, y);
    };
    cap(rDb - 11, "dB");
    cap(rV1 - 10, "V");
    cap(rV3 - 9, "3V");
    ctx.font = "800 5.5px Arial, sans-serif";
    ctx.fillText("R.M.S. VOLTS", cx, cy - rCap - 6);
    ctx.fillStyle = "#006699";
    ctx.fillRect(5, 6, 13, 12);
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic bold 9px Georgia, serif";
    ctx.fillText("hp", 11.5, 12.5);
    ctx.textAlign = "right";
    ctx.fillStyle = "#475569";
    ctx.font = "700 7px Arial, sans-serif";
    ctx.fillText(`${range}V · ${rangeDb >= 0 ? "+" : ""}${rangeDb.toFixed(0)} dB`, w - 5, 11);

    // Reading inside the face: dBu (left) and drop from the +4 dBu goal (right)
    const dbuNow = this[`vu${n}Dbu`];
    if (dbuNow !== undefined) {
      const delta = dbuNow - GOAL_DBU;
      const onGoal = Math.abs(delta) < 0.5;
      ctx.textBaseline = "alphabetic";
      ctx.font = "900 11px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "#0f172a";
      ctx.fillText(dbuNow <= -119 ? "−∞" : `${dbuNow >= 0 ? "+" : ""}${dbuNow.toFixed(1)}`, 5, h - 5);
      ctx.textAlign = "right";
      ctx.fillStyle = onGoal ? "#15803d" : Math.abs(delta + 6.02) < 0.6 ? "#b45309" : "#dc2626";
      ctx.fillText(onGoal ? "+4 ✓" : `${delta >= 0 ? "+" : ""}${delta.toFixed(1)}`, w - 5, h - 5);
      ctx.textBaseline = "middle";
    }

    // Needle (linear in volts) with probe-colour pivot
    const frac = Math.pow(10, this[`vu${n}NeedleDbu`] / 20);
    const a = ang(frac);
    const [tx, ty] = pt(rDb + 2, a);
    const [bx, by] = pt(rCap, a);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    ctx.lineCap = "butt";
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, rCap, Math.PI * 1.15, Math.PI * 1.85);
    ctx.lineTo(cx, cy);
    ctx.fill();
  }

  renderVuMeter(ctx, canvas, dBuVal, label, probeColor = "#0f172a") {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fbf9f2";
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h + 18;
    const radius = h * 0.95;

    // Probe-colour band identifying which point this meter is on
    ctx.fillStyle = probeColor;
    ctx.fillRect(0, 0, w, 4);

    // Specular mirror strip
    ctx.strokeStyle = probeColor;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 12, -Math.PI * 0.78, -Math.PI * 0.22);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Red zone (> 0 dB)
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI * 0.44, -Math.PI * 0.24);
    ctx.stroke();

    // Black scale arc (< 0 dB)
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI * 0.76, -Math.PI * 0.44);
    ctx.stroke();

    // Scale ticks
    const dbTicks = [
      { db: -20, ang: -0.76 },
      { db: -10, ang: -0.66 },
      { db: -5,  ang: -0.55 },
      { db: 0,   ang: -0.44 },
      { db: 2,   ang: -0.31 },
      { db: 3,   ang: -0.24 }
    ];

    ctx.font = "bold 7.5px 'JetBrains Mono', sans-serif";
    ctx.textAlign = "center";
    dbTicks.forEach(t => {
      const a = t.ang * Math.PI;
      const x1 = cx + (radius - 1) * Math.cos(a);
      const y1 = cy + (radius - 1) * Math.sin(a);
      const x2 = cx + (radius - 6) * Math.cos(a);
      const y2 = cy + (radius - 6) * Math.sin(a);

      ctx.strokeStyle = t.db > 0 ? "#dc2626" : "#0f172a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const tx = cx + (radius - 12) * Math.cos(a);
      const ty = cy + (radius - 12) * Math.sin(a);
      ctx.fillStyle = t.db > 0 ? "#ef4444" : "#0f172a";
      ctx.fillText(t.db > 0 ? `+${t.db}` : `${t.db}`, tx, ty);
    });

    // Map dBuVal to angle
    const clampedDbu = Math.max(-20, Math.min(3, dBuVal));
    const norm = (clampedDbu - (-20)) / 23;
    const needleAngle = (-0.76 + norm * 0.52) * Math.PI;

    // Needle
    ctx.save();
    const tipLen = radius - 2;
    const tipX = cx + tipLen * Math.cos(needleAngle);
    const tipY = cy + tipLen * Math.sin(needleAngle);

    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    // Pivot cap
    ctx.fillStyle = probeColor;
    ctx.beginPath();
    ctx.arc(cx, cy, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  renderTrendGraph() {
    if (!this.trendCtx || !this.trendCanvas) return;
    const ctx = this.trendCtx;
    const w = this.trendCanvas.width;
    const h = this.trendCanvas.height;

    ctx.fillStyle = "#020b05";
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "rgba(34, 197, 94, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = 20; y < h; y += 30) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    for (let x = 30; x < w; x += 40) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();

    if (this.trendBuffer.length < 2) return;

    const maxV = 4.0;
    const len = this.trendBuffer.length;
    const dx = w / (this.maxTrendSamples - 1);

    // Plot +VE Hot (Yellow)
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const px = i * dx;
      const py = h - (this.trendBuffer[i].vHot / maxV) * (h - 20) - 10;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Plot -VE Cold (Cyan)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const px = i * dx;
      const py = h - (this.trendBuffer[i].vCold / maxV) * (h - 20) - 10;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Plot Diff Load (Green)
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const px = i * dx;
      const py = h - (this.trendBuffer[i].vDiff / maxV) * (h - 20) - 10;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  /**
   * Dynamic SVG Wires Engine: Renders physical colored leads from rack terminal dots to circuit nodes/anchors
   */
  renderWires() {
    const svg = document.getElementById("live-probe-wires-svg");
    if (!svg) return;

    const activeCfg = this.getActiveSchematic();

    // Channel routing: map each instrument dot to its active node
    const connections = [
      { fromId: "dot-scope1-ch1", targetKey: this.scope1VinTarget || activeCfg?.scope1_ch1 || "xfmr-vin", color: PROBE_COLORS.CH1, badge: "CH1", label: "Scope 1 CH1" },
      { fromId: "dot-scope1-ch2", targetKey: this.scope1Target || activeCfg?.scope1_ch2 || "xfmr-p2", color: PROBE_COLORS.CH2, badge: "CH2", label: "Scope 1 CH2" },
      { fromId: "dot-scope2-ch3", targetKey: this.scope2ColdTarget || activeCfg?.scope2_ch3 || "xfmr-p3", color: PROBE_COLORS.CH3, badge: "CH3", label: "Scope 2 CH3" },
      { fromId: "dot-scope2-ch4", targetKey: this.scope2Target || activeCfg?.scope2_ch4 || "xfmr-load", color: PROBE_COLORS.CH4, badge: "CH4", label: "Scope 2 CH4" },
      { fromId: "dot-dmm1", targetKey: this.effectiveDmmTarget(1) || activeCfg?.dmm1 || "xfmr-p2", color: PROBE_COLORS.DMM1, badge: "DMM1", label: "DMM 1" },
      { fromId: "dot-dmm2", targetKey: this.effectiveDmmTarget(2) || activeCfg?.dmm2 || "xfmr-load", color: PROBE_COLORS.DMM2, badge: "DMM2", label: "DMM 2" },
      { fromId: "dot-vu1", targetKey: this.vu1Target || activeCfg?.vu1 || "xfmr-vin", color: PROBE_COLORS.VU1, badge: "VM1", label: "VM 1" },
      { fromId: "dot-vu2", targetKey: this.vu2Target || activeCfg?.vu2 || "xfmr-load", color: PROBE_COLORS.VU2, badge: "VM2", label: "VM 2" },
      { fromId: "dot-vu3", targetKey: this.vu3Target || activeCfg?.scope1_ch2 || "xfmr-p2", color: PROBE_COLORS.VU3, badge: "VM3", label: "VM 3" },
      { fromId: "dot-vu4", targetKey: this.vu4Target || activeCfg?.scope2_ch3 || "xfmr-p3", color: PROBE_COLORS.VU4, badge: "VM4", label: "VM 4" }
    ];

    // Count how many probes connect to each targetKey to calculate non-overlapping offsets
    const targetCounts = {};
    connections.forEach(conn => {
      targetCounts[conn.targetKey] = (targetCounts[conn.targetKey] || 0) + 1;
    });

    const targetIndexTracker = {};
    let svgHtml = "";

    connections.forEach(conn => {
      const dotEl = document.getElementById(conn.fromId);
      if (!dotEl) return;
      const dotRect = dotEl.getBoundingClientRect();
      // Right-side rack: wire leaves from the LEFT edge of terminal dot
      const x1 = dotRect.left;
      const y1 = dotRect.top + dotRect.height / 2;

      // Find target element in page or user anchors
      let targetEl = document.querySelector(`[data-probe-target="${conn.targetKey}"]`);
      if (!targetEl) {
        targetEl = document.getElementById(conn.targetKey);
      }

      // Fallbacks for alternative IDs
      if (!targetEl) {
        if (conn.targetKey.includes("p2")) targetEl = document.querySelector('[data-probe-target="pp-p2"]') || document.querySelector('[data-probe-target="xfmr-p2"]');
        else if (conn.targetKey.includes("p3")) targetEl = document.querySelector('[data-probe-target="pp-p3"]') || document.querySelector('[data-probe-target="xfmr-p3"]');
        else if (conn.targetKey.includes("load")) targetEl = document.querySelector('[data-probe-target="pp-load"]') || document.querySelector('[data-probe-target="xfmr-load"]');
        else if (conn.targetKey.includes("vin")) targetEl = document.querySelector('[data-probe-target="pp-vin"]') || document.querySelector('[data-probe-target="xfmr-vin"]');
      }

      let x2 = 420;
      let y2 = y1 + 30;
      let isVisible = false;
      let targetRect = null;

      if (targetEl) {
        targetRect = targetEl.getBoundingClientRect();
        // Check if target is inside the visible viewport and not under the right rack (width 350px)
        if (targetRect.bottom > 0 && targetRect.top < window.innerHeight && targetRect.left < window.innerWidth - 350 && targetRect.right > 0) {
          x2 = targetRect.left + targetRect.width / 2;
          y2 = targetRect.top + targetRect.height / 2;
          isVisible = true;
        }
      }

      // Calculate staggered vertical offset if multiple probes share the same target
      const count = targetCounts[conn.targetKey] || 1;
      const idx = targetIndexTracker[conn.targetKey] || 0;
      targetIndexTracker[conn.targetKey] = idx + 1;

      let yOffset = 0;
      if (count === 2) {
        yOffset = idx === 0 ? -7 : 7;
      } else if (count === 3) {
        yOffset = idx === 0 ? -12 : (idx === 1 ? 0 : 12);
      } else if (count > 3) {
        yOffset = (idx - (count - 1) / 2) * 9;
      }

      const finalY2 = isVisible ? y2 + yOffset : y1 + 30;
      const finalX2 = isVisible ? x2 : 420;

      // Probe barrel dimensions: matte lab enclosure with colored collar
      // Wire originates from right rack, so barrel sits to the right of the circuit node
      const barrelW = 26;
      const barrelH = 11;
      const barrelX = finalX2 + 8;
      const barrelY = finalY2 - barrelH / 2;

      // Check if wire is explicitly highlighted (e.g. hovered meter card or probed node)
      const isTargetHovered = Boolean(
        this.hoveredProbeTarget && (
          conn.targetKey === this.hoveredProbeTarget ||
          (targetEl && targetEl.getAttribute("data-probe-target") === this.hoveredProbeTarget)
        )
      );
      const isChannelHovered = Boolean(
        this.hoveredChannels && (
          this.hoveredChannels.includes(conn.badge) || this.hoveredChannels === "ALL"
        )
      );
      const isHighlighted = isChannelHovered || isTargetHovered;

      // Determine wire mode styling
      const isWireStyleGray = this.wireStyle !== "vivid";
      const isGhost = this.wireStyle === "ghost";

      let wireStrokeColor, wireStrokeWidth, finalWireOpacity, shadowStroke, shadowWidth, glintOpacity;

      if (isHighlighted) {
        // High-contrast vivid highlight on focused instrument/probe
        wireStrokeColor = conn.color;
        wireStrokeWidth = 3.2;
        finalWireOpacity = 1.0;
        shadowStroke = "rgba(0, 0, 0, 0.65)";
        shadowWidth = 5.0;
        glintOpacity = 0.8;
      } else if (isGhost) {
        // Ghost mode: ultra faint
        wireStrokeColor = "#94a3b8";
        wireStrokeWidth = 1.2;
        finalWireOpacity = 0.12;
        shadowStroke = "none";
        shadowWidth = 0;
        glintOpacity = 0;
      } else if (isWireStyleGray) {
        // Reading Mode (Default): halfway between light gray and the vivid channel colour
        wireStrokeColor = this.mixHex("#94a3b8", conn.color, 0.5);
        wireStrokeWidth = 2.1;
        finalWireOpacity = isVisible ? 0.62 : 0.18;
        shadowStroke = "rgba(0, 0, 0, 0.34)";
        shadowWidth = 3.25;
        glintOpacity = 0.48;
      } else {
        // Classic vivid workbench mode
        wireStrokeColor = conn.color;
        wireStrokeWidth = 2.6;
        finalWireOpacity = isVisible ? 0.95 : 0.22;
        shadowStroke = "rgba(0, 0, 0, 0.6)";
        shadowWidth = 4.5;
        glintOpacity = finalWireOpacity * 0.8;
      }

      // Determine wire destination coordinates
      let endX, endY;
      if (isVisible) {
        endX = barrelX + barrelW;
        endY = finalY2;
      } else {
        if (targetRect && targetRect.bottom <= 0) {
          // Off-screen above viewport
          endX = Math.max(60, window.innerWidth - 450);
          endY = -15;
        } else if (targetRect && targetRect.top >= window.innerHeight) {
          // Off-screen below viewport
          endX = Math.max(60, window.innerWidth - 450);
          endY = window.innerHeight + 15;
        } else {
          // Natural resting drape heading leftward from right rack
          endX = Math.max(60, x1 - 80 + Math.sin(y1 * 0.05) * 30);
          endY = Math.max(60, Math.min(window.innerHeight - 60, y1 + 25));
        }
      }

      // Compute smooth cubic Bézier spline curving leftward from right rack
      const spanX = Math.max(50, Math.abs(x1 - endX));
      const drape = Math.min(60, Math.max(16, spanX * 0.07));

      const cx1 = x1 - spanX * 0.42;
      const cy1 = y1 + drape * 0.45;
      const cx2 = endX + spanX * 0.35;
      const cy2 = endY + drape * 0.25;

      const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
      const groupClass = isHighlighted ? "live-wire-group highlighted" : (isWireStyleGray ? "live-wire-group reading-dimmed" : "live-wire-group");

      svgHtml += `
        <g class="${groupClass}" data-channel="${conn.badge}">
          <!-- Wire Shadow (soft or subtle when reading) -->
          ${shadowStroke !== "none" ? `<path class="wire-shadow" d="${pathData}" fill="none" stroke="${shadowStroke}" stroke-width="${shadowWidth}" stroke-linecap="round"/>` : ""}
          <!-- Insulated Physical Colored Wire Body -->
          <path class="wire-body" d="${pathData}" fill="none" stroke="${wireStrokeColor}" stroke-width="${wireStrokeWidth}" stroke-linecap="round" opacity="${finalWireOpacity}"/>
          <!-- Glossy Glint Along Wire Core -->
          <path class="wire-glint" d="${pathData}" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.6" stroke-linecap="round" opacity="${glintOpacity}"/>
      `;

      if (isVisible) {
        const barrelBorder = isHighlighted ? conn.color : (isWireStyleGray ? "#475569" : conn.color);
        const barrelTextFill = isHighlighted ? conn.color : (isWireStyleGray ? conn.color : conn.color);
        const barrelOpacity = isHighlighted ? 1.0 : (isWireStyleGray ? 0.85 : 1.0);
        const haloOpacity = isHighlighted ? 0.8 : (isWireStyleGray ? 0.35 : 0.65);

        svgHtml += `
          <!-- Probe Barrel Collar & Strain Relief (Facing Left into Node) -->
          <rect x="${barrelX}" y="${barrelY}" width="${barrelW}" height="${barrelH}" rx="2" fill="#141416" stroke="${barrelBorder}" stroke-width="1.2" opacity="${barrelOpacity}"/>
          <line x1="${barrelX + barrelW - 4}" y1="${barrelY}" x2="${barrelX + barrelW - 4}" y2="${barrelY + barrelH}" stroke="${conn.color}" stroke-width="2.5" opacity="${barrelOpacity}"/>
          <text x="${barrelX + 11}" y="${finalY2 + 3.2}" fill="${barrelTextFill}" font-family="'JetBrains Mono', monospace" font-size="7.5" font-weight="900" text-anchor="middle" letter-spacing="-0.5px">${conn.badge}</text>
          
          <!-- Gold Needle Probe Tip touching circuit node from the right -->
          <line x1="${finalX2}" y1="${finalY2}" x2="${barrelX}" y2="${finalY2}" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round"/>
          
          <!-- Glowing Contact Halo at circuit node -->
          <circle cx="${finalX2}" cy="${finalY2}" r="3.5" fill="${conn.color}" stroke="#000000" stroke-width="1.2"/>
          <circle cx="${finalX2}" cy="${finalY2}" r="6.5" fill="none" stroke="${conn.color}" stroke-width="1" opacity="${haloOpacity}"/>
          <circle cx="${finalX2}" cy="${finalY2}" r="11" fill="none" stroke="${conn.color}" stroke-width="0.8" opacity="${haloOpacity * 0.5}">
            <animate attributeName="r" values="3.5;13" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="${haloOpacity};0" dur="2s" repeatCount="indefinite"/>
          </circle>
        `;
      }

      svgHtml += `</g>`;
    });

    svg.innerHTML = svgHtml;
  }
}

// Global initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.floatingMeterDock = new FloatingMeterDock();
  });
} else {
  window.floatingMeterDock = new FloatingMeterDock();
}
