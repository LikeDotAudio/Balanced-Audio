/**
 * floating-meters.js — Breakaway Floating Instrument Dock, Oscilloscope CRT & Universal Circuit Probing
 *
 * Features:
 * 1. Dual Probe Modes: Pick between a DMM Probe (Red/Black Leads) and an Oscilloscope Probe (10X BNC with Ground Clip).
 * 2. 1970s Laboratory CRT Oscilloscope: Live animated green phosphor CRT trace with 8x10 division graticule,
 *    trigger stabilization, volts/div, time/div, on-screen CRT readouts, and true circuit physics waveforms.
 * 3. Universal "Poke Any Circuit": Click any terminal, conductor, resistor, shield bond, or ground loop node
 *    across ALL schematics on the page to snap test probes and view real-time signals.
 * 4. APK Precision AC Voltmeter & Fluke 8050A True RMS DMM fully synchronized to probed nodes.
 */

class FloatingMeterDock {
  constructor() {
    this.dock = null;
    this.isFloating = false;
    this.toolMode = "scope"; // 'dmm' | 'scope'
    this.displayMode = "dual"; // 'dmm' | 'scope' | 'dual'
    this.isArmed = false; // "Poke Circuit" crosshair mode

    // Probe state
    this.activeProbeTarget = "6-1-p2"; // Default Pin 2 Hot (Circuit 6.1)
    this.activeReferenceTarget = "chassis"; // Default Pin 1 Chassis Ground
    this.probeLabel = "Pin 2 Hot (Circuit 6.1 Dual Push-Pull)";

    // Oscilloscope settings
    this.scopeVoltsDiv = 1.0; // Volts per division
    this.scopeTimeDiv = 0.5; // Milliseconds per division
    this.scopeCoupling = "AC"; // AC | DC | GND
    this.scopeTriggerMode = "AUTO"; // AUTO | NORM
    this.scopeCanvas = null;
    this.scopeCtx = null;
    this.scopeTime = 0;

    // HP Voltmeter needle physics ballistics
    this.currentNeedleDbu = 4.0;
    this.targetNeedleDbu = 4.0;
    this.attackRate = 0.28;
    this.releaseRate = 0.08;
    this.hpRangeVolts = 3.0;

    // Settings drawer states
    this.settingsOpen = null; // 'hp' | 'scope' | 'fluke' | null
    this.animFrame = null;

    this.init();
  }

  init() {
    this.createDockDOM();
    this.setupScrollTrigger();
    this.setupGlobalProbeHooks();
    this.startMainInstrumentLoop();
  }

  createDockDOM() {
    if (document.getElementById("floating-meter-dock")) {
      this.dock = document.getElementById("floating-meter-dock");
      return;
    }

    const dock = document.createElement("div");
    dock.id = "floating-meter-dock";
    dock.className = "floating-meter-dock";
    dock.setAttribute("aria-label", "Laboratory Bench Probes & Oscilloscope Dock");

    dock.innerHTML = `
      <!-- Dock Control Header -->
      <div class="dock-header">
        <div class="dock-title-group">
          <span class="dock-icon">⚡</span>
          <div>
            <div class="dock-title">LAB BENCH PROBES &amp; OSCILLOSCOPE</div>
            <div id="dock-probe-status" class="dock-probe-status">Probing: Pin 2 Hot (+4.0 dBu)</div>
          </div>
        </div>
        <div class="dock-action-btns">
          <button id="dock-expand-btn" class="dock-mini-btn" title="Expand Settings">⚙️</button>
          <button id="dock-minimize-btn" class="dock-mini-btn" title="Minimize Dock">_</button>
          <button id="dock-close-btn" class="dock-mini-btn" title="Dock back to bench">✕</button>
        </div>
      </div>

      <!-- Interactive Probe Mode & Tool Picker -->
      <div class="dock-tool-picker">
        <button id="dock-pick-scope-btn" class="tool-pick-btn active" title="Select Oscilloscope 10X Probe">
          <span class="tool-dot green"></span> O-Scope Probe
        </button>
        <button id="dock-pick-dmm-btn" class="tool-pick-btn" title="Select DMM Red (+) Lead">
          <span class="tool-dot red"></span> DMM Probe
        </button>
        <button id="dock-arm-probe-btn" class="tool-arm-btn" title="Click anywhere on any circuit to poke it!">
          🎯 Poke Circuit
        </button>
      </div>

      <!-- Test Probe Leads Telemetry Bar -->
      <div class="dock-probes-bar">
        <div id="dock-lead-signal" class="probe-lead green active">
          <span id="dock-lead-dot" class="probe-tip-led green-led"></span>
          <span>Probe: <strong id="dock-probe-signal-target">Pin 2 Hot (10X)</strong></span>
        </div>
        <div id="dock-lead-ref" class="probe-lead black active">
          <span class="probe-tip-led black-led"></span>
          <span>Ref: <strong id="dock-probe-ref-target">Chassis / Pin 1</strong></span>
        </div>
      </div>

      <!-- Instrument View Switcher Tabs -->
      <div class="dock-view-tabs">
        <button id="dock-tab-scope" class="dock-tab-btn active">📈 4-CH Scope</button>
        <button id="dock-tab-dmm" class="dock-tab-btn">📊 Lucky DMM</button>
        <button id="dock-tab-hp353a" class="dock-tab-btn">🎛️ HP 353A</button>
        <button id="dock-tab-chart" class="dock-tab-btn">📉 Trend Graph</button>
        <button id="dock-tab-dual" class="dock-tab-btn">🔲 Dual View</button>
      </div>

      <!-- ================= 1. CRT Oscilloscope Bay (4-Channel) ================= -->
      <div id="dock-panel-scope" class="dock-instrument-panel">
        <div class="dock-scope-card">
          <div class="dock-meter-label">
            <span style="color: #4ade80; display: flex; align-items: center; gap: 5px;">
              <span class="crt-glow-dot"></span>
              TEKTRONIX / HP 4-CH CRT SCOPE
            </span>
            <span id="dock-scope-telemetry-badge" class="badge-mini green">1.0V/div &bull; 0.5ms</span>
          </div>
          <div class="dock-scope-bezel">
            <canvas id="dock-scope-canvas" width="300" height="150" class="dock-scope-canvas"></canvas>
          </div>

          <!-- 4-Channel Trace Toggles -->
          <div class="scope-ch-toggles">
            <button class="scope-ch-btn ch1 active" data-ch="1" title="CH1: Generator Audio Drive Reference (Yellow)">CH1: Ref</button>
            <button class="scope-ch-btn ch2 active" data-ch="2" title="CH2: Pin 2 Hot Output (Cyan)">CH2: +VE</button>
            <button class="scope-ch-btn ch3 active" data-ch="3" title="CH3: Pin 3 Cold Output (Pink)">CH3: -VE</button>
            <button class="scope-ch-btn ch4 active" data-ch="4" title="CH4: Differential Load Summation (Green)">CH4: Diff</button>
          </div>

          <!-- Oscilloscope Front-Panel Controls -->
          <div class="dock-scope-controls" style="margin-top: 0.35rem;">
            <div class="scope-ctrl-group">
              <span class="scope-ctrl-label">VOLTS/DIV:</span>
              <div class="scope-btn-group">
                <button class="scope-btn" data-vdiv="0.2">.2V</button>
                <button class="scope-btn" data-vdiv="0.5">.5V</button>
                <button class="scope-btn active" data-vdiv="1.0">1V</button>
                <button class="scope-btn" data-vdiv="2.0">2V</button>
                <button class="scope-btn" data-vdiv="5.0">5V</button>
              </div>
            </div>
            <div class="scope-ctrl-group">
              <span class="scope-ctrl-label">TIME/DIV:</span>
              <div class="scope-btn-group">
                <button class="scope-btn" data-tdiv="0.2">.2ms</button>
                <button class="scope-btn active" data-tdiv="0.5">.5ms</button>
                <button class="scope-btn" data-tdiv="1.0">1ms</button>
                <button class="scope-btn" data-tdiv="2.0">2ms</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 2. DMM & APK Voltmeter Bay ================= -->
      <div id="dock-panel-dmm" class="dock-instrument-panel">
        <!-- Meter 1: APK Precision AC Voltmeter -->
        <div id="dock-meter-hp" class="dock-meter-card" title="Click to open APK Voltmeter calibration settings">
          <div class="dock-meter-label">
            <span>APK PRECISION AC VOLTMETER</span>
            <span id="dock-hp-range-badge" class="badge-mini">3V / +10 dB</span>
          </div>
          <div class="dock-meter-face-wrapper">
            <canvas id="dock-hp-canvas" width="300" height="135" class="dock-canvas"></canvas>
          </div>
        </div>

        <!-- Meter 2: LUCKY 8050A True RMS DMM (Yellow Font) -->
        <div id="dock-meter-fluke" class="dock-meter-card" style="margin-top: 0.5rem;" title="Click to open Lucky 8050A settings">
          <div class="dock-meter-label">
            <span style="color: #facc15; font-weight: 800;">LUCKY 8050A TRUE RMS DMM</span>
            <span id="dock-dmm-mode-badge" class="badge-mini" style="background: rgba(250, 204, 21, 0.2); color: #facc15; border: 1px solid #facc15;">+VE HOT</span>
          </div>
          <div class="dmm-mode-switcher" style="margin-top: 0.35rem;">
            <button class="dmm-mode-btn active yellow-mode" data-dock-dmm-mode="hot">+VE HOT</button>
            <button class="dmm-mode-btn" data-dock-dmm-mode="cold">-VE COLD</button>
            <button class="dmm-mode-btn" data-dock-dmm-mode="thd">THD / DIST</button>
            <button class="dmm-mode-btn" data-dock-dmm-mode="multi">MULTI</button>
          </div>
          <div class="dock-dmm-vfd-display" style="border: 2px solid #ca8a04;">
            <div class="dmm-vfd-row">
              <span id="dock-dmm-lbl-1" class="dmm-vfd-label">V_HOT (RMS):</span>
              <span id="dock-dmm-vdiff" class="dmm-vfd-number lucky-yellow">1.228 V</span>
            </div>
            <div class="dmm-vfd-row">
              <span id="dock-dmm-lbl-2" class="dmm-vfd-label">AUDIO LEVEL:</span>
              <span id="dock-dmm-iload" class="dmm-vfd-number lucky-yellow">+4.0 dBu</span>
            </div>
            <div class="dmm-vfd-row">
              <span id="dock-dmm-lbl-3" class="dmm-vfd-label">LINE STATUS:</span>
              <span id="dock-dmm-status" class="dmm-vfd-status lucky-yellow">SYMMETRIC</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= 3. HP 353A Patch Panel Bay ================= -->
      <div id="dock-panel-hp353a" class="dock-instrument-panel" style="display: none;">
        <div class="hp353a-panel-card" style="margin-top: 0;">
          <div class="hp353a-header">
            <div class="hp353a-badge">
              <span class="hp353a-hp-logo">hp</span>
              <span class="hp353a-title">353A PATCH PANEL</span>
            </div>
            <span style="font-size: 0.65rem; color: #94a3b8; font-family: monospace;">MANUAL 00353-90003</span>
          </div>
          <div class="hp353a-grid">
            <div class="hp353a-ctrl-col">
              <span class="hp353a-ctrl-title">OUTPUT Z</span>
              <div class="hp353a-rotary-dial hp353a-outz-dial" title="Click to cycle Output Impedance (135, 600, 900 Ω)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span class="hp353a-value-readout hp353a-outz-val">600 Ω</span>
            </div>
            <div class="hp353a-ctrl-col">
              <span class="hp353a-ctrl-title">INPUT TERM Z</span>
              <div class="hp353a-rotary-dial hp353a-inz-dial" title="Click to cycle Input Termination (135, 600, 900, 10k Ω)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span class="hp353a-value-readout hp353a-inz-val">10 kΩ</span>
            </div>
            <div class="hp353a-ctrl-col">
              <span class="hp353a-ctrl-title">ATTEN 10 dB</span>
              <div class="hp353a-rotary-dial hp353a-atten10-dial" title="Click to step 10 dB Attenuation (0 - 100 dB)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span class="hp353a-value-readout hp353a-atten10-val">0 dB</span>
            </div>
            <div class="hp353a-ctrl-col">
              <span class="hp353a-ctrl-title">ATTEN 1 dB</span>
              <div class="hp353a-rotary-dial hp353a-atten1-dial" title="Click to step 1 dB Attenuation (0 - 10 dB)">
                <div class="hp353a-rotary-pointer"></div>
              </div>
              <span class="hp353a-value-readout hp353a-atten1-val">0 dB</span>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.65rem; padding-top: 0.5rem; border-top: 1px solid #334155;">
            <button class="hp353a-switch-btn hp353a-toggle-meas active" title="Toggle MEAS (circuit under test) vs CAL (oscillator reference)">MODE: MEAS</button>
            <span class="hp353a-atten-total" style="font-family: monospace; font-size: 0.72rem; color: #f59e0b; font-weight: 800;">0 dB Loss</span>
            <button class="hp353a-switch-btn hp353a-toggle-freq" title="Toggle FREQ (<5kHz audio vs >5kHz carrier)">FREQ: &lt;5kHz</button>
          </div>
        </div>
      </div>

      <!-- ================= 4. Trend Recorder Bay ================= -->
      <div id="dock-panel-chart" class="dock-instrument-panel" style="display: none;">
        <div class="trend-recorder-card" style="margin-top: 0;">
          <div class="trend-toolbar">
            <span class="trend-title">📉 TREND RECORDER</span>
            <div class="trend-legend">
              <span class="trend-legend-pill" style="color: #facc15;"><span class="trend-dot yellow"></span> +VE</span>
              <span class="trend-legend-pill" style="color: #38bdf8;"><span class="trend-dot cyan"></span> -VE</span>
              <span class="trend-legend-pill" style="color: #10b981;"><span class="trend-dot green"></span> DIFF</span>
            </div>
            <div class="trend-btn-group">
              <button class="trend-btn trend-btn-run active">PAUSE</button>
              <button class="trend-btn trend-btn-clear">CLEAR</button>
            </div>
          </div>
          <canvas id="dock-trend-canvas" width="300" height="150" class="trend-canvas"></canvas>
        </div>
      </div>

      <!-- Quick Probe Target Dropdown -->
      <div class="dock-target-selector">
        <label style="font-size: 0.68rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">
          Move Probes To Test Point (Or Click Schematic Directly):
        </label>
        <select id="dock-probe-select" class="dock-probe-dropdown">
          <optgroup label="Circuit 6.1 (Dual Push-Pull)">
            <option value="6-1-p2" selected>Pin 2 Hot (Output +)</option>
            <option value="6-1-p3">Pin 3 Cold (Output &minus;)</option>
            <option value="6-1-load">Differential Across Load</option>
            <option value="6-1-vin">Audio Input Drive</option>
            <option value="6-1-op1">Op-Amp A1 Output (Hot)</option>
            <option value="6-1-op2">Op-Amp A2 Output (Inverting)</option>
            <option value="6-1-p1">Pin 1 Chassis Ground</option>
          </optgroup>
          <optgroup label="Circuit 6.2 (Active Impedance-Balanced)">
            <option value="6-2-p2">Pin 2 Hot (Active Driven Out)</option>
            <option value="6-2-p3">Pin 3 Cold (Passive 0V Match)</option>
            <option value="6-2-load">Differential Across Load</option>
            <option value="6-2-vin">Audio Input Drive</option>
          </optgroup>
          <optgroup label="Circuit 6.3 (Transformer Floating)">
            <option value="6-3-sec">Secondary Across Pins 2 &amp; 3</option>
            <option value="6-3-p2">Secondary Pin 2 (Hot)</option>
            <option value="6-3-p3">Secondary Pin 3 (Cold)</option>
            <option value="6-3-pri">Primary Audio Drive</option>
          </optgroup>
          <optgroup label="Section 5.0 (Jim Meyer Thevenin Ground Loop)">
            <option value="meyer-vgvd">Ground Loop Voltage (V_GVD 60Hz)</option>
            <option value="meyer-vpo">Generator V_PO (Hot Leg)</option>
            <option value="meyer-vro">Generator V_RO (Cold Leg)</option>
            <option value="meyer-p2">Cable Pin 2 Hot Line</option>
            <option value="meyer-p3">Cable Pin 3 Cold Line</option>
            <option value="meyer-shield">Cable Shield (Pin 1 to Pin 1)</option>
            <option value="meyer-verr">CM-to-DM Noise Error (V_err)</option>
            <option value="meyer-diff">Receiver Differential Audio Out</option>
          </optgroup>
          <optgroup label="Section 0 (Enclosure &amp; AES48 Grounding)">
            <option value="enc-chassisa">Equipment A Chassis Ground</option>
            <option value="enc-pin1bond">AES48 Direct Chassis Bond (0V Clean)</option>
            <option value="enc-pin1fault">Pin 1 Routed to Audio Board Ground (120Hz Buzz)</option>
            <option value="enc-shield">Cable Shield Outside Shell</option>
          </optgroup>
        </select>
      </div>

      <!-- Settings / Calibration Drawer -->
      <div id="dock-settings-drawer" class="dock-settings-drawer">
        <div class="drawer-header">
          <span id="drawer-title" style="font-weight: 700; color: var(--accent-cyan);">APK Voltmeter Calibration &amp; Sensitivity</span>
          <button id="drawer-close-btn" class="drawer-close-btn">&times;</button>
        </div>
        <div id="drawer-content" class="drawer-content">
          <div style="font-size: 0.75rem; color: #94a3b8; line-height: 1.4;">
            <strong>APK Voltmeter Range &amp; Sensitivity:</strong>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.35rem; margin: 0.4rem 0;">
              <button class="drawer-btn active" onclick="if(window.setVoltmeterRange) window.setVoltmeterRange(9); else window.floatingMeterDock.setHpRange(3, '+10 dB');">3V (+10dB)</button>
              <button class="drawer-btn" onclick="if(window.setVoltmeterRange) window.setVoltmeterRange(8); else window.floatingMeterDock.setHpRange(1, '0 dB');">1V (0dB)</button>
              <button class="drawer-btn" onclick="if(window.setVoltmeterRange) window.setVoltmeterRange(10); else window.floatingMeterDock.setHpRange(10, '+20 dB');">10V (+20dB)</button>
              <button class="drawer-btn" onclick="if(window.setVoltmeterRange) window.setVoltmeterRange(7); else window.floatingMeterDock.setHpRange(0.3, '-10 dB');">.3V (-10dB)</button>
              <button class="drawer-btn" onclick="if(window.setVoltmeterRange) window.setVoltmeterRange(11); else window.floatingMeterDock.setHpRange(30, '+30 dB');">30V (+30dB)</button>
              <button class="drawer-btn" onclick="if(window.setVoltmeterRange) window.setVoltmeterRange(6); else window.floatingMeterDock.setHpRange(0.1, '-20 dB');">100mV (-20dB)</button>
            </div>
            <strong>Needle Ballistics Damping:</strong>
            <div style="display: flex; gap: 0.35rem; margin: 0.4rem 0;">
              <button class="drawer-btn active" onclick="window.floatingMeterDock.setBallistics('vu')">VU (300ms)</button>
              <button class="drawer-btn" onclick="window.floatingMeterDock.setBallistics('peak')">Fast Peak</button>
              <button class="drawer-btn" onclick="window.floatingMeterDock.setBallistics('damped')">Average</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dock);
    this.dock = dock;

    this.attachEventListeners();
    this.initHpCanvas();
    this.initScopeCanvas();
    this.updateDisplayMode("dual");
  }

  attachEventListeners() {
    const dock = this.dock;

    // Window controls
    dock.querySelector("#dock-close-btn")?.addEventListener("click", () => this.dockBack());
    const minBtn = dock.querySelector("#dock-minimize-btn");
    if (minBtn) {
      minBtn.addEventListener("click", () => {
        dock.classList.toggle("minimized");
        minBtn.textContent = dock.classList.contains("minimized") ? "□" : "_";
      });
    }
    dock.querySelector("#dock-expand-btn")?.addEventListener("click", () => this.toggleSettings("hp"));
    dock.querySelector("#dock-meter-hp")?.addEventListener("click", () => this.toggleSettings("hp"));
    dock.querySelector("#dock-meter-fluke")?.addEventListener("click", () => this.toggleSettings("fluke"));
    dock.querySelector("#drawer-close-btn")?.addEventListener("click", () => this.closeSettings());

    // Probe Mode Pickers
    const scopePickBtn = dock.querySelector("#dock-pick-scope-btn");
    const dmmPickBtn = dock.querySelector("#dock-pick-dmm-btn");
    const armBtn = dock.querySelector("#dock-arm-probe-btn");

    if (scopePickBtn) {
      scopePickBtn.addEventListener("click", () => {
        this.setToolMode("scope");
      });
    }
    if (dmmPickBtn) {
      dmmPickBtn.addEventListener("click", () => {
        this.setToolMode("dmm");
      });
    }
    if (armBtn) {
      armBtn.addEventListener("click", () => {
        this.toggleArmProbe();
      });
    }

    // 4-Channel Trace Toggles
    this.scopeChannels = { ch1: true, ch2: true, ch3: true, ch4: true };
    dock.querySelectorAll(".scope-ch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const ch = "ch" + btn.getAttribute("data-ch");
        this.scopeChannels[ch] = !this.scopeChannels[ch];
        btn.classList.toggle("active", this.scopeChannels[ch]);
      });
    });

    // View tabs
    dock.querySelector("#dock-tab-scope")?.addEventListener("click", () => this.updateDisplayMode("scope"));
    dock.querySelector("#dock-tab-dmm")?.addEventListener("click", () => this.updateDisplayMode("dmm"));
    dock.querySelector("#dock-tab-hp353a")?.addEventListener("click", () => this.updateDisplayMode("hp353a"));
    dock.querySelector("#dock-tab-chart")?.addEventListener("click", () => this.updateDisplayMode("chart"));
    dock.querySelector("#dock-tab-dual")?.addEventListener("click", () => this.updateDisplayMode("dual"));

    // Dock DMM Mode Switcher
    this.dockDmmMode = "hot";
    dock.querySelectorAll("[data-dock-dmm-mode]").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-dock-dmm-mode");
        this.dockDmmMode = mode;
        dock.querySelectorAll("[data-dock-dmm-mode]").forEach(b => {
          const match = b.getAttribute("data-dock-dmm-mode") === mode;
          b.classList.toggle("active", match);
          b.classList.toggle("yellow-mode", match);
        });
        const badge = dock.querySelector("#dock-dmm-mode-badge");
        if (badge) {
          badge.textContent = mode === "hot" ? "+VE HOT" : (mode === "cold" ? "-VE COLD" : (mode === "thd" ? "THD / DIST" : "MULTI"));
        }
        this.updateFromActiveCircuit();
      });
    });

    // Quick target selector
    dock.querySelector("#dock-probe-select")?.addEventListener("change", (e) => {
      this.selectProbeTarget(e.target.value);
    });

    // Scope controls (Volts/Div & Time/Div)
    dock.querySelectorAll(".scope-btn[data-vdiv]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll(".scope-btn[data-vdiv]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.scopeVoltsDiv = parseFloat(e.currentTarget.getAttribute("data-vdiv"));
        this.updateScopeBadge();
      });
    });

    dock.querySelectorAll(".scope-btn[data-tdiv]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll(".scope-btn[data-tdiv]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.scopeTimeDiv = parseFloat(e.currentTarget.getAttribute("data-tdiv"));
        this.updateScopeBadge();
      });
    });
  }

  setToolMode(mode) {
    this.toolMode = mode;
    const scopeBtn = this.dock.querySelector("#dock-pick-scope-btn");
    const dmmBtn = this.dock.querySelector("#dock-pick-dmm-btn");
    const leadSignal = this.dock.querySelector("#dock-lead-signal");
    const leadDot = this.dock.querySelector("#dock-lead-dot");
    const signalTarget = this.dock.querySelector("#dock-probe-signal-target");

    if (mode === "scope") {
      scopeBtn?.classList.add("active");
      dmmBtn?.classList.remove("active");
      if (leadSignal) {
        leadSignal.className = "probe-lead green active";
      }
      if (leadDot) {
        leadDot.className = "probe-tip-led green-led";
      }
      if (signalTarget) {
        signalTarget.textContent = `${this.activeProbeTarget.toUpperCase()} (10X Scope)`;
      }
      if (this.displayMode === "dmm") {
        this.updateDisplayMode("scope");
      }
    } else {
      dmmBtn?.classList.add("active");
      scopeBtn?.classList.remove("active");
      if (leadSignal) {
        leadSignal.className = "probe-lead red active";
      }
      if (leadDot) {
        leadDot.className = "probe-tip-led";
      }
      if (signalTarget) {
        signalTarget.textContent = `${this.activeProbeTarget.toUpperCase()} (DMM +)`;
      }
      if (this.displayMode === "scope") {
        this.updateDisplayMode("dmm");
      }
    }
    this.updateFromActiveCircuit();
  }

  toggleArmProbe() {
    this.isArmed = !this.isArmed;
    const armBtn = this.dock.querySelector("#dock-arm-probe-btn");
    if (this.isArmed) {
      document.body.classList.add("probe-cursor-active");
      armBtn?.classList.add("active");
      this.showToast(`🎯 Probing Armed: Click ANY circuit wire, pin, or component to poke it!`);
    } else {
      document.body.classList.remove("probe-cursor-active");
      armBtn?.classList.remove("active");
    }
  }

  updateDisplayMode(mode) {
    this.displayMode = mode;
    const tabScope = this.dock.querySelector("#dock-tab-scope");
    const tabDmm = this.dock.querySelector("#dock-tab-dmm");
    const tabHp = this.dock.querySelector("#dock-tab-hp353a");
    const tabChart = this.dock.querySelector("#dock-tab-chart");
    const tabDual = this.dock.querySelector("#dock-tab-dual");

    const panelScope = this.dock.querySelector("#dock-panel-scope");
    const panelDmm = this.dock.querySelector("#dock-panel-dmm");
    const panelHp = this.dock.querySelector("#dock-panel-hp353a");
    const panelChart = this.dock.querySelector("#dock-panel-chart");

    tabScope?.classList.toggle("active", mode === "scope");
    tabDmm?.classList.toggle("active", mode === "dmm");
    tabHp?.classList.toggle("active", mode === "hp353a");
    tabChart?.classList.toggle("active", mode === "chart");
    tabDual?.classList.toggle("active", mode === "dual");

    [panelScope, panelDmm, panelHp, panelChart].forEach(p => { if (p) p.style.display = "none"; });

    if (mode === "scope") {
      if (panelScope) panelScope.style.display = "block";
    } else if (mode === "dmm") {
      if (panelDmm) panelDmm.style.display = "block";
    } else if (mode === "hp353a") {
      if (panelHp) panelHp.style.display = "block";
    } else if (mode === "chart") {
      if (panelChart) panelChart.style.display = "block";
    } else {
      // dual view
      if (panelScope) panelScope.style.display = "block";
      if (panelDmm) panelDmm.style.display = "block";
    }
  }

  updateScopeBadge() {
    const badge = this.dock.querySelector("#dock-scope-telemetry-badge");
    if (badge) {
      badge.textContent = `${this.scopeVoltsDiv}V/div • ${this.scopeTimeDiv}ms`;
    }
  }

  initHpCanvas() {
    this.hpCanvas = document.getElementById("dock-hp-canvas");
    if (this.hpCanvas) {
      this.hpCtx = this.hpCanvas.getContext("2d");
      this.renderHpMeter(this.currentNeedleDbu);
    }
  }

  initScopeCanvas() {
    this.scopeCanvas = document.getElementById("dock-scope-canvas");
    if (this.scopeCanvas) {
      this.scopeCtx = this.scopeCanvas.getContext("2d");
    }
  }

  setupScrollTrigger() {
    const labBench = document.getElementById("topologies") || document.querySelector(".vintage-test-bench");
    window.addEventListener("scroll", () => {
      if (!labBench) return;
      const rect = labBench.getBoundingClientRect();
      if (rect.bottom < 120) {
        this.setFloating(true);
      } else if (rect.top > 250) {
        this.setFloating(false);
      }
    }, { passive: true });
  }

  setFloating(enable) {
    this.isFloating = enable;
    if (this.dock) {
      this.dock.classList.toggle("active", enable);
    }
  }

  dockBack() {
    this.setFloating(false);
    const labBench = document.querySelector(".vintage-test-bench") || document.getElementById("topologies");
    if (labBench) {
      labBench.scrollIntoView({ behavior: "smooth" });
    }
  }

  toggleSettings(type) {
    const drawer = document.getElementById("dock-settings-drawer");
    const title = document.getElementById("drawer-title");
    if (!drawer) return;

    if (this.settingsOpen === type) {
      this.closeSettings();
      return;
    }

    this.settingsOpen = type;
    drawer.classList.add("open");
    if (title) {
      title.textContent = type === "hp" ? "APK Voltmeter Calibration & Sensitivity" : "Fluke 8050A DMM Configuration";
    }
  }

  closeSettings() {
    const drawer = document.getElementById("dock-settings-drawer");
    if (drawer) drawer.classList.remove("open");
    this.settingsOpen = null;
  }

  setHpRange(v, dbTxt) {
    this.hpRangeVolts = v;
    const badge = document.getElementById("dock-hp-range-badge");
    if (badge) badge.textContent = `${v}V / ${dbTxt}`;
    this.updateFromActiveCircuit();
  }

  setBallistics(mode) {
    if (mode === "peak") {
      this.attackRate = 0.55;
      this.releaseRate = 0.04;
    } else if (mode === "damped") {
      this.attackRate = 0.15;
      this.releaseRate = 0.12;
    } else {
      this.attackRate = 0.28;
      this.releaseRate = 0.08;
    }
  }

  /**
   * Universal Probe Hooks: Binds click handlers to EVERY interactive node across ALL schematics
   */
  setupGlobalProbeHooks() {
    const bindTarget = (el) => {
      el.style.cursor = "crosshair";
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const target = el.getAttribute("data-probe-target");
        const label = el.getAttribute("data-probe-label") || el.getAttribute("title") || target;
        this.selectProbeTarget(target, label, el);
      });
    };

    // Auto-discover any element with data-probe-target
    document.querySelectorAll("[data-probe-target]").forEach(bindTarget);

    // Also listen for clicks when armed mode is active
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
    this.activeProbeTarget = targetKey;
    const select = document.getElementById("dock-probe-select");
    if (select) select.value = targetKey;

    const signalLabel = document.getElementById("dock-probe-signal-target");
    const statusLabel = document.getElementById("dock-probe-status");

    const targets = {
      // Circuit 6.1
      "6-1-p2": { name: "Pin 2 Hot", desc: "Circuit 6.1 Pin 2 Hot Output (0° Sine)" },
      "6-1-p3": { name: "Pin 3 Cold", desc: "Circuit 6.1 Pin 3 Cold Output (180° Inverted Sine)" },
      "6-1-load": { name: "Differential Load", desc: "Circuit 6.1 Differential Across R_LOAD" },
      "6-1-vin": { name: "Audio In (Drive)", desc: "Circuit 6.1 Audio Input Generator" },
      "6-1-op1": { name: "Op-Amp A1 Out", desc: "Circuit 6.1 Non-inverting Driver Output (+1 Buffer)" },
      "6-1-op2": { name: "Op-Amp A2 Out", desc: "Circuit 6.1 Inverting Driver Output (-1 Inverter)" },
      "6-1-p1": { name: "Pin 1 Chassis", desc: "Circuit 6.1 AES48 Chassis Ground Shell" },

      // Circuit 6.2
      "6-2-p2": { name: "Pin 2 Hot (Active)", desc: "Circuit 6.2 Active Impedance Pin 2 Hot (+1.2V)" },
      "6-2-p3": { name: "Pin 3 Cold (Passive)", desc: "Circuit 6.2 Passive 0V Match (Flatline 0V, 50Ω Z)" },
      "6-2-load": { name: "Differential Load", desc: "Circuit 6.2 Differential Across Load" },
      "6-2-vin": { name: "Audio In", desc: "Circuit 6.2 Audio Input Drive" },

      // Circuit 6.3
      "6-3-sec": { name: "Sec Across 2-3", desc: "Circuit 6.3 Transformer Secondary Output" },
      "6-3-p2": { name: "Secondary Pin 2", desc: "Circuit 6.3 Transformer Secondary Hot (+)" },
      "6-3-p3": { name: "Secondary Pin 3", desc: "Circuit 6.3 Transformer Secondary Cold (-)" },
      "6-3-pri": { name: "Primary Drive", desc: "Circuit 6.3 Transformer Primary Audio In" },

      // Section 5 Meyer Thevenin Ground Loop
      "meyer-vgvd": { name: "Ground V_GVD", desc: "Ground Potential Difference (60Hz + 120Hz Mains Buzz)" },
      "meyer-vpo": { name: "Generator V_PO", desc: "Equipment A Source Hot Generator" },
      "meyer-vro": { name: "Generator V_RO", desc: "Equipment A Source Cold Generator" },
      "meyer-p2": { name: "Cable Pin 2", desc: "Twisted Pair Hot Conductor" },
      "meyer-p3": { name: "Cable Pin 3", desc: "Twisted Pair Cold Conductor" },
      "meyer-shield": { name: "Cable Shield Pin 1", desc: "Shield Continuity (Pin 1 to Pin 1 Chassis Bond)" },
      "meyer-verr": { name: "Error V_err", desc: "Common-Mode to Differential Error Voltage" },
      "meyer-diff": { name: "Audio Out (Diff)", desc: "Equipment B Receiver Differential Audio Output" },

      // Section 0 Enclosure
      "enc-chassisa": { name: "Equipment A Chassis", desc: "Equipment A Exterior Metal Enclosure" },
      "enc-pin1bond": { name: "AES48 Direct Bond", desc: "Pin 1 Directly Bonded to Chassis (Quiet 0V)" },
      "enc-pin1fault": { name: "Pin 1 PCB Ground", desc: "Pin 1 Problem: Shield Noise in Audio Circuit (120Hz Buzz)" },
      "enc-shield": { name: "Cable Shield Shell", desc: "Cable Overall Braided Shield" }
    };

    const info = targets[targetKey] || { name: targetKey, desc: customLabel || targetKey };
    if (signalLabel) {
      const modeSuffix = this.toolMode === "scope" ? "(10X Scope)" : "(DMM +)";
      signalLabel.textContent = `${info.name} ${modeSuffix}`;
    }
    if (statusLabel) {
      statusLabel.textContent = `Probing: ${info.desc}`;
    }

    // Attach physical visual probe indicator to clicked element if available
    this.renderProbePinMarker(clickedEl);

    // Expand floating dock if not visible
    this.setFloating(true);
    this.updateFromActiveCircuit();

    this.showToast(`⚡ Probing: ${info.desc}`);
  }

  renderProbePinMarker(targetEl) {
    // Remove previous probe marker
    document.querySelectorAll(".live-probe-marker-pin").forEach(el => el.remove());

    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const marker = document.createElement("div");
    marker.className = `live-probe-marker-pin ${this.toolMode === "scope" ? "green" : "red"}`;
    marker.innerHTML = `
      <div class="probe-needle-tip"></div>
      <div class="probe-body-collar">
        <span>${this.toolMode === "scope" ? "OSCOPE 10X" : "DMM (+)"}</span>
      </div>
    `;
    marker.style.left = `${window.scrollX + rect.left + rect.width / 2 - 12}px`;
    marker.style.top = `${window.scrollY + rect.top - 38}px`;

    document.body.appendChild(marker);
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

  updateLiveReadings(vDiff, iLoad, dBu, status = "SYMMETRIC") {
    const range = this.hpRangeVolts || 3.0;
    const relativeDb = 20 * Math.log10(Math.max(0.00005, vDiff / range));
    this.targetNeedleDbu = relativeDb;

    const vdiffEl = document.getElementById("dock-dmm-vdiff");
    if (vdiffEl) vdiffEl.textContent = `${vDiff.toFixed(2)} V`;

    const iloadEl = document.getElementById("dock-dmm-iload");
    if (iloadEl) iloadEl.textContent = `${(iLoad * 1000).toFixed(1)} mA`;

    const statusEl = document.getElementById("dock-dmm-status");
    if (statusEl) {
      statusEl.textContent = status;
      statusEl.className = status.includes("OVERLOAD") || status.includes("CLIP") || status.includes("IMBALANCE")
        ? "dmm-vfd-status amber"
        : "dmm-vfd-status";
    }
  }

  /**
   * Reads simulator parameters and computes the exact physical waveform + measurements
   */
  getProbedSignalData() {
    const key = this.activeProbeTarget;

    // Default 1kHz parameters
    let freq = 1000.0;
    let vRms = 1.23;
    let vPk = vRms * Math.SQRT2;
    let phase = 0; // radians
    let shape = "sine"; // 'sine' | 'clipped' | 'flatline' | 'hum' | 'noise'
    let status = "SYMMETRIC";
    let iLoad = 0.002;

    if (key.startsWith("6-1")) {
      const vin = parseFloat(document.getElementById("pp-vin")?.value || 1.2);
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
      } else {
        iLoad = vin / (rout + rload);
        vPin2 = vin - iLoad * rout;
        vPin3 = 0;
        vDiff = vPin2;
        status = iLoad > 0.05 ? "CURRENT LIMIT CLIP" : "TS SHORTED";
      }

      if (key === "6-1-p2") {
        vRms = vPin2;
        vPk = vRms * Math.SQRT2;
        phase = 0;
        shape = "sine";
      } else if (key === "6-1-p3") {
        if (shortPin3) {
          vRms = 0;
          vPk = 0;
          shape = "flatline";
        } else {
          vRms = Math.abs(vPin3);
          vPk = vRms * Math.SQRT2;
          phase = Math.PI; // Inverted 180°
          shape = "sine";
        }
      } else if (key === "6-1-load") {
        vRms = vDiff;
        vPk = vRms * Math.SQRT2;
        phase = 0;
        shape = "sine";
      } else if (key === "6-1-vin") {
        vRms = vin;
        vPk = vin * Math.SQRT2;
        phase = 0;
        shape = "sine";
      } else if (key === "6-1-op2") {
        if (shortPin3) {
          vRms = vin;
          vPk = 14.0; // Saturated rail
          shape = "clipped";
        } else {
          vRms = vin;
          vPk = vin * Math.SQRT2;
          phase = Math.PI;
          shape = "sine";
        }
      } else if (key === "6-1-p1") {
        vRms = 0.001;
        vPk = 0.001;
        shape = "flatline";
      }
    } else if (key.startsWith("6-2")) {
      const vin = parseFloat(document.getElementById("ib-vin")?.value || 1.2);
      const rout = parseFloat(document.getElementById("ib-rout")?.value || 50);
      const rload = parseFloat(document.getElementById("ib-rload")?.value || 10000);
      const shortPin3 = document.getElementById("ib-short-pin3")?.checked || false;

      iLoad = vin / (rout + rload);
      const vPin2 = iLoad * rload;

      if (key === "6-2-p2") {
        vRms = vPin2;
        vPk = vRms * Math.SQRT2;
        phase = 0;
        shape = "sine";
        status = "ACTIVE DRIVEN (+)";
      } else if (key === "6-2-p3") {
        vRms = 0.0;
        vPk = 0.0;
        shape = "flatline"; // Zero signal voltage!
        status = "PASSIVE MATCH (0V SIGNAL, 50Ω Z)";
      } else if (key === "6-2-load") {
        vRms = vPin2;
        vPk = vRms * Math.SQRT2;
        shape = "sine";
        status = "DIFFERENTIAL LOAD OK";
      } else {
        vRms = vin;
        vPk = vin * Math.SQRT2;
        shape = "sine";
      }
    } else if (key.startsWith("6-3")) {
      const vin = parseFloat(document.getElementById("tx-vin")?.value || 15.0);
      const ratio = parseFloat(document.getElementById("tx-ratio")?.value || 1.0);
      const rload = parseFloat(document.getElementById("tx-rload")?.value || 600);
      const groundPin3 = document.getElementById("tx-ground-pin3")?.checked || false;

      const vSec = vin * ratio;
      iLoad = vSec / (40 + rload);
      const vLoad = iLoad * rload;

      if (key === "6-3-pri") {
        vRms = vin;
        vPk = vin * Math.SQRT2;
        shape = "sine";
        status = "PRIMARY GENERATOR";
      } else if (key === "6-3-sec" || key === "6-3-p2") {
        vRms = vLoad;
        vPk = vLoad * Math.SQRT2;
        shape = "sine";
        status = groundPin3 ? "EARTHED REFERENCE" : "GALVANIC FLOATING";
      } else if (key === "6-3-p3") {
        if (groundPin3) {
          vRms = 0.0;
          vPk = 0.0;
          shape = "flatline";
          status = "PIN 3 EARTHED (0V)";
        } else {
          vRms = vLoad / 2;
          vPk = vRms * Math.SQRT2;
          phase = Math.PI;
          shape = "sine";
          status = "FLOATING BALANCED";
        }
      }
    } else if (key.startsWith("meyer")) {
      const vpo = parseFloat(document.getElementById("meyer-vpo")?.value || 1.23);
      const vgvd = parseFloat(document.getElementById("meyer-vgvd")?.value || 10.0);
      const zpo = parseFloat(document.getElementById("meyer-zpo")?.value || 50);
      const zro = parseFloat(document.getElementById("meyer-zro")?.value || 50);
      const deltaZ = Math.abs(zpo - zro);
      const vErr = vgvd * (deltaZ / 20000);

      if (key === "meyer-vgvd") {
        freq = 60.0;
        vRms = vgvd;
        vPk = vgvd * Math.SQRT2;
        shape = "hum"; // 60Hz hum + 120Hz harmonics
        status = "GROUND LOOP MAINS HUM";
      } else if (key === "meyer-verr") {
        freq = 60.0;
        vRms = vErr;
        vPk = vErr * Math.SQRT2;
        shape = deltaZ === 0 ? "flatline" : "hum";
        status = deltaZ === 0 ? "INFINITE CMRR REJECTION" : "COMMON-MODE LEAKAGE";
      } else if (key === "meyer-diff") {
        freq = 1000.0;
        vRms = vpo + vErr;
        vPk = vRms * Math.SQRT2;
        shape = deltaZ === 0 ? "sine" : "hum-riding";
        status = deltaZ === 0 ? "PURE AUDIO (NOISE CANCELLED)" : "HUM CORRUPTED OUTPUT";
      } else {
        freq = 1000.0;
        vRms = vpo;
        vPk = vpo * Math.SQRT2;
        shape = "sine";
        status = "EQUIPMENT A DRIVE";
      }
    } else if (key.startsWith("enc")) {
      if (key === "enc-pin1fault") {
        freq = 120.0;
        vRms = 0.85;
        vPk = 1.2;
        shape = "hum";
        status = "PIN 1 PROBLEM (120Hz BUZZ ON PCB)";
      } else if (key === "enc-pin1bond") {
        vRms = 0.0001;
        vPk = 0.0001;
        shape = "flatline";
        status = "AES48 CHASSIS BOND (CLEAN 0V)";
      } else {
        vRms = 0.05;
        vPk = 0.08;
        shape = "flatline";
        status = "SHIELD CHASSIS POTENTIAL";
      }
    }

    return { freq, vRms, vPk, phase, shape, status, iLoad };
  }

  updateFromActiveCircuit() {
    const data = this.getProbedSignalData();
    const dBu = 20 * Math.log10(Math.max(0.0001, data.vRms / 0.775));
    this.updateLiveReadings(data.vRms, data.iLoad, dBu, data.status);
  }

  startMainInstrumentLoop() {
    const loop = (timestamp) => {
      // 1. Update needle physics
      const eps = 0.02;
      if (this.currentNeedleDbu < this.targetNeedleDbu - eps) {
        this.currentNeedleDbu += (this.targetNeedleDbu - this.currentNeedleDbu) * this.attackRate;
      } else {
        this.currentNeedleDbu -= (this.currentNeedleDbu - this.targetNeedleDbu) * this.releaseRate;
      }
      this.renderHpMeter(this.currentNeedleDbu);

      // 2. Update Oscilloscope CRT
      this.renderOscilloscope();

      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  /**
   * 1970s Tektronix / HP CRT Oscilloscope Rendering Engine
   */
  renderOscilloscope() {
    if (!this.scopeCtx) return;
    const ctx = this.scopeCtx;
    const w = this.scopeCanvas.width;
    const h = this.scopeCanvas.height;

    // Advance timebase
    this.scopeTime += 0.0005;

    // Phosphor decay persistence (draw transparent mask instead of clearRect)
    ctx.fillStyle = "rgba(2, 20, 8, 0.28)";
    ctx.fillRect(0, 0, w, h);

    // Draw Graticule Grid (8 vertical divisions, 10 horizontal divisions)
    ctx.strokeStyle = "rgba(34, 197, 94, 0.18)";
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

    // Central crosshair ticks (0.2 div sub-divisions)
    ctx.strokeStyle = "rgba(74, 222, 128, 0.35)";
    ctx.beginPath();
    const midX = w / 2;
    const midY = h / 2;
    for (let j = 0; j <= 8; j += 0.2) {
      const y = j * dy;
      ctx.moveTo(midX - 3, y);
      ctx.lineTo(midX + 3, y);
    }
    for (let i = 0; i <= 10; i += 0.2) {
      const x = i * dx;
      ctx.moveTo(x, midY - 3);
      ctx.lineTo(x, midY + 3);
    }
    ctx.stroke();

    // Compute waveform from probed node
    const sig = this.getProbedSignalData();
    const voltsPerDiv = this.scopeVoltsDiv; // e.g. 1.0 V/div
    const timePerDiv = this.scopeTimeDiv * 0.001; // e.g. 0.0005 s/div
    const totalTimeSpan = 10 * timePerDiv;

    // Draw Live Green Phosphor CRT Trace
    ctx.save();
    ctx.strokeStyle = "#4ade80";
    ctx.shadowColor = "#22c55e";
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    const numSamples = 240;

    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const tPoint = (s / (numSamples - 1)) * totalTimeSpan;
      
      // Auto-trigger sync locks phase so wave is stationary on CRT
      const t = this.scopeTriggerMode === "AUTO" ? tPoint : this.scopeTime + tPoint;

      let v = 0;
      const omega = 2 * Math.PI * sig.freq;

      if (sig.shape === "sine") {
        v = sig.vPk * Math.sin(omega * t + sig.phase);
      } else if (sig.shape === "flatline") {
        v = 0;
      } else if (sig.shape === "clipped") {
        const raw = 14.0 * Math.sin(omega * t + sig.phase);
        v = Math.max(-5.0, Math.min(5.0, raw)); // Hard clipping saturation
      } else if (sig.shape === "hum") {
        // 60Hz mains hum + 120Hz / 180Hz rectifier spikes
        const w60 = 2 * Math.PI * 60;
        v = sig.vPk * (0.8 * Math.sin(w60 * t) + 0.25 * Math.sin(2 * w60 * t) + 0.1 * Math.sin(3 * w60 * t));
      } else if (sig.shape === "hum-riding") {
        const w1k = 2 * Math.PI * 1000;
        const w60 = 2 * Math.PI * 60;
        v = sig.vPk * Math.sin(w1k * t) + 0.4 * Math.sin(w60 * t);
      }

      // Map voltage to CRT Y coordinate (midY is 0V, positive is up)
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      const clampedY = Math.max(4, Math.min(h - 4, py));

      if (s === 0) {
        ctx.moveTo(px, clampedY);
      } else {
        ctx.lineTo(px, clampedY);
      }
    }
    ctx.stroke();
    ctx.restore();

    // On-Screen CRT Display (OSD) Telemetry
    ctx.font = "bold 9px 'Courier New', monospace";
    ctx.fillStyle = "#4ade80";
    ctx.shadowColor = "#22c55e";
    ctx.shadowBlur = 4;

    // Top Header: CH1 scale, Timebase & Trigger
    ctx.textAlign = "left";
    ctx.fillText(`CH1: ${voltsPerDiv.toFixed(1)}V/DIV  ${this.scopeCoupling}`, 8, 14);

    ctx.textAlign = "right";
    ctx.fillText(`TIME: ${this.scopeTimeDiv.toFixed(1)}ms/DIV`, w - 24, 14);
    // Green Trigger LED
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(w - 12, 11, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Bottom Footer: Vp-p, V_RMS, Frequency
    ctx.textAlign = "left";
    ctx.fillText(`Vp-p: ${(sig.vPk * 2).toFixed(2)}V`, 8, h - 8);

    ctx.textAlign = "center";
    ctx.fillText(`Vrms: ${sig.vRms.toFixed(2)}V`, w / 2, h - 8);

    ctx.textAlign = "right";
    const freqTxt = sig.freq >= 1000 ? `${(sig.freq / 1000).toFixed(2)} kHz` : `${sig.freq.toFixed(0)} Hz`;
    ctx.fillText(`FREQ: ${freqTxt}`, w - 8, h - 8);
  }

  /**
   * APK Precision AC Voltmeter Dial Face Renderer
   */
  renderHpMeter(dBuVal) {
    if (!this.hpCtx) return;
    const ctx = this.hpCtx;
    const w = this.hpCanvas.width;
    const h = this.hpCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Bezel & aged ivory dial face
    ctx.fillStyle = "#fbf9f2";
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h + 22;
    const radius = h * 0.92;

    // Specular mirror strip to eliminate parallax
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 15, -Math.PI * 0.78, -Math.PI * 0.22);
    ctx.stroke();

    // Red zone (> 0 dB)
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI * 0.44, -Math.PI * 0.24);
    ctx.stroke();

    // Black scale arc (< 0 dB)
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI * 0.76, -Math.PI * 0.44);
    ctx.stroke();

    // Scale ticks: -20 to +3 dB
    const dbTicks = [
      { db: -20, ang: -0.76 },
      { db: -10, ang: -0.66 },
      { db: -7,  ang: -0.60 },
      { db: -5,  ang: -0.55 },
      { db: -3,  ang: -0.50 },
      { db: -1,  ang: -0.46 },
      { db: 0,   ang: -0.44 },
      { db: 1,   ang: -0.38 },
      { db: 2,   ang: -0.31 },
      { db: 3,   ang: -0.24 }
    ];

    ctx.font = "bold 8.5px 'Inter', sans-serif";
    ctx.textAlign = "center";
    dbTicks.forEach(t => {
      const a = t.ang * Math.PI;
      const x1 = cx + (radius - 1) * Math.cos(a);
      const y1 = cy + (radius - 1) * Math.sin(a);
      const x2 = cx + (radius - 7) * Math.cos(a);
      const y2 = cy + (radius - 7) * Math.sin(a);

      ctx.strokeStyle = t.db > 0 ? "#ef4444" : "#0f172a";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const tx = cx + (radius - 15) * Math.cos(a);
      const ty = cy + (radius - 15) * Math.sin(a);
      ctx.fillStyle = t.db > 0 ? "#ef4444" : "#0f172a";
      ctx.fillText(t.db > 0 ? `+${t.db}` : `${t.db}`, tx, ty);
    });

    // Map dBuVal (-20 to +3 dBu) to angle
    const clampedDbu = Math.max(-20, Math.min(3, dBuVal));
    const norm = (clampedDbu - (-20)) / 23;
    const needleAngle = (-0.76 + norm * 0.52) * Math.PI;

    // Draw Knife-Edge Needle with counter-balance tail
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;

    const tipLen = radius - 3;
    const tipX = cx + tipLen * Math.cos(needleAngle);
    const tipY = cy + tipLen * Math.sin(needleAngle);

    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    // Pivot cap
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(cx, cy, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.floatingMeterDock = new FloatingMeterDock();
});
