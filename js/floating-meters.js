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

class FloatingMeterDock {
  constructor() {
    this.dock = null;
    this.currentTab = "rack"; // 'rack' | 'hp353a' | 'chart'
    this.isArmed = false; // "Poke Circuit" mode
    this.isCreatingAnchor = false; // "Create Anchor" mode
    this.anchors = []; // User-created test anchors
    this.anchorCounter = 1;

    // Active Probe Targets for instruments
    this.scope1Target = "6-1-p2";
    this.scope2Target = "6-1-load";
    this.dmm1Target = "6-1-p2";
    this.dmm2Target = "6-1-load";
    this.vu1Target = "6-1-vin";
    this.vu2Target = "6-1-load";
    this.dmm1Mode = "rms"; // 'rms' | 'dbu' | 'peak' | 'crest'
    this.dmm2Mode = "diff"; // 'diff' | 'thd' | 'cmrr' | 'error'

    // Reference impedance (Fluke 8050A selectable REF Z)
    this.refZ = 600;
    this.refZList = [50, 75, 93, 110, 125, 135, 150, 250, 300, 500, 600, 800, 900, 1000, 1200, 2400, 8000, 10000];

    // Oscilloscope settings (Shared timebase, independent V/div)
    this.scope1VoltsDiv = 1.0;
    this.scope2VoltsDiv = 1.0;
    this.scopeTimeDiv = 0.5; // ms/div
    this.scopeTime = 0;

    // VU Meters Ballistics & Sensitivity
    this.vu1Range = 3.0; // 3V (+10 dB)
    this.vu2Range = 3.0;
    this.vu1NeedleDbu = 4.0;
    this.vu2NeedleDbu = 4.0;
    this.vu1TargetDbu = 4.0;
    this.vu2TargetDbu = 4.0;
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
    this.showToast(`Fluke 8050A Reference Z set to ${rTxt}`);
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

  init() {
    this.createPermanentRackDOM();
    this.initCanvases();
    this.attachEventListeners();
    this.setupGlobalProbeHooks();
    this.initAnchorEngine();
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
          <button id="rack-tab-hp353a" class="rack-nav-tab" title="HP 353A Patch Panel">🎛️ HP 353A</button>
          <button id="rack-tab-chart" class="rack-nav-tab" title="Multi-Channel Trend Graph">📉 TREND</button>
        </div>
        <div class="rack-quick-actions">
          <button id="rack-btn-anchor" class="rack-action-btn anchor-btn" title="Click to drop a persistent circuit test anchor anywhere!">⚓ ANCHOR</button>
          <button id="rack-btn-poke" class="rack-action-btn poke-btn" title="Click any wire or component on schematics to poke it!">🎯 POKE</button>
        </div>
      </div>

      <!-- ================= 1. Six Permanent Instruments Bay ================= -->
      <div id="rack-instruments-bay" class="rack-instruments-bay">

        <!-- Meter 1: SCOPE 1 (Audio In & Pin 2 Hot) -->
        <div id="rack-card-scope1" class="rack-meter-card" title="Click to open Scope 1 controls and range">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-scope1-ch1" class="rack-terminal-dot yellow" title="CH1: Signal Generator Vin"></span>
              <span id="dot-scope1-ch2" class="rack-terminal-dot cyan" title="CH2: Pin 2 Hot Out"></span>
              <span>SCOPE 1 &bull; VIN / +VE HOT</span>
            </div>
            <span id="scope1-vdiv-badge" class="rack-status-pill yellow">1V &bull; .5ms</span>
          </div>
          <div class="rack-scope-bezel">
            <canvas id="rack-scope1-canvas" width="338" height="110" class="rack-canvas"></canvas>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>VOLTS/DIV:</span>
              <div class="scope-btn-row">
                <button class="scope-btn" data-scope1-vdiv="0.2">.2V</button>
                <button class="scope-btn" data-scope1-vdiv="0.5">.5V</button>
                <button class="scope-btn active" data-scope1-vdiv="1.0">1V</button>
                <button class="scope-btn" data-scope1-vdiv="2.0">2V</button>
                <button class="scope-btn" data-scope1-vdiv="5.0">5V</button>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 3px;">
              <span>TIME/DIV:</span>
              <div class="scope-btn-row">
                <button class="scope-btn" data-tdiv="0.2">.2ms</button>
                <button class="scope-btn active" data-tdiv="0.5">.5ms</button>
                <button class="scope-btn" data-tdiv="1.0">1ms</button>
                <button class="scope-btn" data-tdiv="2.0">2ms</button>
              </div>
            </div>
            <div class="rack-telemetry-text" id="scope1-telemetry">
              CH1 (Yellow Vin): 1.23V RMS &bull; CH2 (Cyan Hot): 1.23V RMS &bull; Phase: 0.0°
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">
                MOVE PROBES TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):
              </label>
              <select class="rack-probe-dropdown" data-probe-select="scope1">
                ${this.renderProbeOptions(this.scope1Target)}
              </select>
            </div>
          </div>
        </div>

        <!-- Meter 2: SCOPE 2 (Pin 3 Cold & Differential Load) -->
        <div id="rack-card-scope2" class="rack-meter-card" title="Click to open Scope 2 controls and range">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-scope2-ch3" class="rack-terminal-dot pink" title="CH3: Pin 3 Cold Inverted"></span>
              <span id="dot-scope2-ch4" class="rack-terminal-dot green" title="CH4: Differential Load Across Pins 2-3"></span>
              <span>SCOPE 2 &bull; -VE COLD / DIFF LOAD</span>
            </div>
            <span id="scope2-vdiv-badge" class="rack-status-pill green">1V &bull; .5ms</span>
          </div>
          <div class="rack-scope-bezel">
            <canvas id="rack-scope2-canvas" width="338" height="110" class="rack-canvas"></canvas>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>VOLTS/DIV:</span>
              <div class="scope-btn-row">
                <button class="scope-btn" data-scope2-vdiv="0.2">.2V</button>
                <button class="scope-btn" data-scope2-vdiv="0.5">.5V</button>
                <button class="scope-btn active" data-scope2-vdiv="1.0">1V</button>
                <button class="scope-btn" data-scope2-vdiv="2.0">2V</button>
                <button class="scope-btn" data-scope2-vdiv="5.0">5V</button>
              </div>
            </div>
            <div class="rack-telemetry-text" id="scope2-telemetry">
              CH3 (Pink Cold): 1.23V RMS &bull; CH4 (Green Diff): 2.46V RMS &bull; CMRR: 95.0 dB
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">
                MOVE PROBES TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):
              </label>
              <select class="rack-probe-dropdown" data-probe-select="scope2">
                ${this.renderProbeOptions(this.scope2Target)}
              </select>
            </div>
          </div>
        </div>

        <!-- Meter 3: LUCKY 8050A DMM #1 (Input & Hot +VE Line) -->
        <div id="rack-card-dmm1" class="rack-meter-card" title="Click to open Lucky 8050A #1 settings">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-dmm1" class="rack-terminal-dot yellow"></span>
              <span style="color: #facc15; font-weight: 800;">LUCKY 8050A #1</span>
              <span style="color: #888888;">(INPUT / +VE)</span>
            </div>
            <span id="rack-dmm1-status" class="rack-status-pill yellow">+VE HOT</span>
          </div>
          <!-- Clean Digital Face (Yellow Phosphor) -->
          <div class="rack-dmm-face">
            <span id="rack-dmm1-val1" class="rack-dmm-digits" style="color: #facc15;">1.228 V</span>
            <span id="rack-dmm1-val2" class="rack-dmm-sub-digits" style="color: #facc15;">+4.0 dBu</span>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <div class="dmm-keypad-mini">
              <button class="dmm-key active" data-dmm1-mode="rms">TRUE RMS</button>
              <button class="dmm-key" data-dmm1-mode="dbu">dBm LEVEL</button>
              <button class="dmm-key" data-dmm1-mode="peak">PEAK</button>
              <button class="dmm-key" id="rack-btn-refz" title="Cycle Fluke 8050A Reference Impedance R (50Ω to 10kΩ)">REF Z: 600 Ω</button>
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
              <span id="dot-dmm2" class="rack-terminal-dot green"></span>
              <span style="color: #facc15; font-weight: 800;">LUCKY 8050A #2</span>
              <span style="color: #888888;">(DIFF / THD)</span>
            </div>
            <span id="rack-dmm2-status" class="rack-status-pill green">BALANCED</span>
          </div>
          <!-- Clean Digital Face (Yellow Phosphor) -->
          <div class="rack-dmm-face">
            <span id="rack-dmm2-val1" class="rack-dmm-digits" style="color: #facc15;">2.456 V</span>
            <span id="rack-dmm2-val2" class="rack-dmm-sub-digits" style="color: #facc15;">0.003% THD</span>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <div class="dmm-keypad-mini">
              <button class="dmm-key active" data-dmm2-mode="diff">DIFF RMS</button>
              <button class="dmm-key" data-dmm2-mode="thd">THD+N %</button>
              <button class="dmm-key" data-dmm2-mode="cmrr">CMRR dB</button>
              <button class="dmm-key" id="rack-btn-refz2" title="Cycle Fluke 8050A Reference Impedance R (50Ω to 10kΩ)">REF Z: 600 Ω</button>
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

        <!-- Meter 5: APK Precision AC Voltmeter #1 (Channel A: Audio In) -->
        <div id="rack-card-vu1" class="rack-meter-card" title="Click to open APK Voltmeter #1 calibration settings">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-vu1" class="rack-terminal-dot yellow"></span>
              <span>APK AC VOLTMETER #1 &bull; CH A DRIVE</span>
            </div>
            <span id="rack-vu1-range-badge" class="rack-status-pill yellow">3V &bull; +10dB</span>
          </div>
          <div class="rack-vu-bezel">
            <canvas id="rack-vu1-canvas" width="338" height="85" class="rack-canvas"></canvas>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <span>SENSITIVITY RANGE:</span>
            <div class="vu-range-btn-row">
              <button class="drawer-btn" data-vu1-range="0.1">.1V (-20dB)</button>
              <button class="drawer-btn" data-vu1-range="0.3">.3V (-10dB)</button>
              <button class="drawer-btn" data-vu1-range="1.0">1V (0dB)</button>
              <button class="drawer-btn active" data-vu1-range="3.0">3V (+10dB)</button>
              <button class="drawer-btn" data-vu1-range="10.0">10V (+20dB)</button>
              <button class="drawer-btn" data-vu1-range="30.0">30V (+30dB)</button>
            </div>
            <div class="rack-telemetry-text" id="vu1-detail-text">
              Tracks audio generator input drive level with 300ms mechanical needle ballistics.
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">
                MOVE PROBES TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):
              </label>
              <select class="rack-probe-dropdown" data-probe-select="vu1">
                ${this.renderProbeOptions(this.vu1Target)}
              </select>
            </div>
          </div>
        </div>

        <!-- Meter 6: APK Precision AC Voltmeter #2 (Channel B: Differential Load) -->
        <div id="rack-card-vu2" class="rack-meter-card" title="Click to open APK Voltmeter #2 calibration settings">
          <div class="rack-meter-bar">
            <div class="rack-meter-title">
              <span id="dot-vu2" class="rack-terminal-dot green"></span>
              <span>APK AC VOLTMETER #2 &bull; CH B LOAD</span>
            </div>
            <span id="rack-vu2-range-badge" class="rack-status-pill green">3V &bull; +10dB</span>
          </div>
          <div class="rack-vu-bezel">
            <canvas id="rack-vu2-canvas" width="338" height="85" class="rack-canvas"></canvas>
          </div>
          <!-- Collapsible Drawer: No text until clicked -->
          <div class="meter-collapsible-drawer">
            <span>SENSITIVITY RANGE:</span>
            <div class="vu-range-btn-row">
              <button class="drawer-btn" data-vu2-range="0.1">.1V (-20dB)</button>
              <button class="drawer-btn" data-vu2-range="0.3">.3V (-10dB)</button>
              <button class="drawer-btn" data-vu2-range="1.0">1V (0dB)</button>
              <button class="drawer-btn active" data-vu2-range="3.0">3V (+10dB)</button>
              <button class="drawer-btn" data-vu2-range="10.0">10V (+20dB)</button>
              <button class="drawer-btn" data-vu2-range="30.0">30V (+30dB)</button>
            </div>
            <div class="rack-telemetry-text" id="vu2-detail-text">
              Tracks differential output level across balanced receiver terminating load.
            </div>
            <div class="rack-probe-selector-group">
              <label class="rack-probe-label">
                MOVE PROBES TO TEST POINT (OR CLICK SCHEMATIC DIRECTLY):
              </label>
              <select class="rack-probe-dropdown" data-probe-select="vu2">
                ${this.renderProbeOptions(this.vu2Target)}
              </select>
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
    this.scope1Canvas = document.getElementById("rack-scope1-canvas");
    if (this.scope1Canvas) this.scope1Ctx = this.scope1Canvas.getContext("2d");

    this.scope2Canvas = document.getElementById("rack-scope2-canvas");
    if (this.scope2Canvas) this.scope2Ctx = this.scope2Canvas.getContext("2d");

    this.vu1Canvas = document.getElementById("rack-vu1-canvas");
    if (this.vu1Canvas) this.vu1Ctx = this.vu1Canvas.getContext("2d");

    this.vu2Canvas = document.getElementById("rack-vu2-canvas");
    if (this.vu2Canvas) this.vu2Ctx = this.vu2Canvas.getContext("2d");

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
    const tabHp = dock.querySelector("#rack-tab-hp353a");
    const tabChart = dock.querySelector("#rack-tab-chart");

    const bayInstruments = dock.querySelector("#rack-instruments-bay");
    const bayHp = dock.querySelector("#rack-panel-hp353a");
    const bayChart = dock.querySelector("#rack-panel-chart");

    const switchTab = (tab) => {
      this.currentTab = tab;
      tabRack?.classList.toggle("active", tab === "rack");
      tabHp?.classList.toggle("active", tab === "hp353a");
      tabChart?.classList.toggle("active", tab === "chart");

      if (bayInstruments) bayInstruments.style.display = tab === "rack" ? "flex" : "none";
      if (bayHp) bayHp.style.display = tab === "hp353a" ? "block" : "none";
      if (bayChart) bayChart.style.display = tab === "chart" ? "block" : "none";
    };

    tabRack?.addEventListener("click", () => switchTab("rack"));
    tabHp?.addEventListener("click", () => switchTab("hp353a"));
    tabChart?.addEventListener("click", () => switchTab("chart"));

    // Quick Actions
    const anchorBtn = dock.querySelector("#rack-btn-anchor");
    const pokeBtn = dock.querySelector("#rack-btn-poke");

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

    // VU Meter 1 Range
    dock.querySelectorAll("[data-vu1-range]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-vu1-range]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.vu1Range = parseFloat(e.currentTarget.getAttribute("data-vu1-range"));
        const b = dock.querySelector("#rack-vu1-range-badge");
        if (b) b.textContent = `${this.vu1Range}V Range`;
        this.updateFromActiveCircuit();
      });
    });

    // VU Meter 2 Range
    dock.querySelectorAll("[data-vu2-range]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        dock.querySelectorAll("[data-vu2-range]").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.vu2Range = parseFloat(e.currentTarget.getAttribute("data-vu2-range"));
        const b = dock.querySelector("#rack-vu2-range-badge");
        if (b) b.textContent = `${this.vu2Range}V Range`;
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
    this.scope1Target = targetKey;
    this.dmm1Target = targetKey;

    this.dock.querySelectorAll("[data-probe-select='scope1'], [data-probe-select='dmm1']").forEach(sel => {
      sel.value = targetKey;
    });

    this.updateFromActiveCircuit();
    this.showToast(`⚡ Probing: ${customLabel || targetKey}`);
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

    if (!key) key = "6-1-p2";

    if (key.startsWith("6-1")) {
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

      if (key === "6-1-p2") {
        vRms = vPin2;
        name = "Pin 2 Hot (Output +)";
      } else if (key === "6-1-p3") {
        vRms = shortPin3 ? 0.0001 : Math.abs(vPin3);
        phase = Math.PI;
        name = "Pin 3 Cold (Output −)";
      } else if (key === "6-1-load") {
        vRms = vDiff;
        name = "Differential Across Load";
      } else if (key === "6-1-vin") {
        vRms = vin;
        name = "Audio Input Drive";
      } else if (key === "6-1-op1") {
        vRms = vin;
        name = "Op-Amp A1 Output (Hot)";
      } else if (key === "6-1-op2") {
        vRms = shortPin3 ? 14.0 : vin;
        phase = Math.PI;
        shape = shortPin3 ? "clipped" : "sine";
        name = "Op-Amp A2 Output (Inverting)";
      } else if (key === "6-1-p1") {
        vRms = 0.001;
        shape = "flatline";
        name = "Pin 1 Chassis Ground";
      }
    } else if (key.startsWith("6-2")) {
      const vin = isMuted ? 0.0 : parseFloat(document.getElementById("ib-vin")?.value || 1.2);
      const rout = parseFloat(document.getElementById("ib-rout")?.value || 50);
      const rload = parseFloat(document.getElementById("ib-rload")?.value || 10000);
      iLoad = vin / (rout + rload);
      const vPin2 = iLoad * rload;

      if (key === "6-2-p2") {
        vRms = vPin2;
        status = "ACTIVE DRIVEN (+)";
        name = "Pin 2 Hot (Active)";
      } else if (key === "6-2-p3") {
        vRms = 0.0001;
        shape = "flatline";
        status = "PASSIVE MATCH (0V SIGNAL, 50Ω Z)";
        name = "Pin 3 Cold (Passive 0V)";
      } else if (key === "6-2-load") {
        vRms = vPin2;
        status = "DIFFERENTIAL LOAD OK";
        name = "Differential Across Load";
      } else {
        vRms = vin;
        name = "Audio Input Drive";
      }
    } else if (key.startsWith("6-3")) {
      const vin = isMuted ? 0.0 : parseFloat(document.getElementById("tx-vin")?.value || 1.23);
      const ratio = parseFloat(document.getElementById("tx-ratio")?.value || 1.0);
      const rload = parseFloat(document.getElementById("tx-rload")?.value || 600);
      const groundPin3 = document.getElementById("tx-ground-pin3")?.checked || false;
      const vSec = vin * ratio;
      iLoad = vSec / (40 + rload);
      const vLoad = iLoad * rload;

      if (key === "6-3-pri") {
        vRms = vin;
        status = "PRIMARY GENERATOR";
        name = "Primary Audio Drive";
      } else if (key === "6-3-sec" || key === "6-3-p2") {
        vRms = vLoad;
        status = groundPin3 ? "EARTHED REFERENCE" : "GALVANIC FLOATING";
        name = "Secondary Pins 2 & 3";
      } else if (key === "6-3-p3") {
        vRms = groundPin3 ? 0.0001 : vLoad;
        phase = groundPin3 ? 0 : Math.PI;
        status = groundPin3 ? "TIED TO CHASSIS" : "GALVANIC FLOATING";
        name = "Secondary Pin 3";
      }
    } else if (key.startsWith("xfmr")) {
      let simVin = isMuted ? 0.0 : 1.23;
      let ratio = 1.0;
      if (window.audioTransformerSim && window.audioTransformerSim.state) {
        simVin = isMuted ? 0.0 : (window.audioTransformerSim.state.vin || 1.23);
        ratio = (window.audioTransformerSim.state.n2 || 1500) / (window.audioTransformerSim.state.n1 || 1500);
      }
      if (key === "xfmr-pri") {
        vRms = simVin;
        status = "TRANSFORMER PRIMARY DRIVE";
        name = "Transformer Primary Input";
      } else if (key === "xfmr-sec") {
        vRms = simVin * ratio;
        status = "SECONDARY TRANSFORMED OUT";
        name = "Transformer Secondary Output";
      } else if (key === "xfmr-core") {
        vRms = 0.15;
        shape = "sine";
        status = "CORE MAGNETIC FLUX";
        name = "Core Saturation";
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

  updateFromActiveCircuit() {
    const data1 = this.getSignalForTarget(this.dmm1Target);
    const data2 = this.getSignalForTarget(this.dmm2Target);
    const vu1Data = this.getSignalForTarget(this.vu1Target);
    const vu2Data = this.getSignalForTarget(this.vu2Target);
    const sc1Data = this.getSignalForTarget(this.scope1Target);
    const sc2Data = this.getSignalForTarget(this.scope2Target);

    const refZ = this.refZ || 600;
    const vRefZ = Math.sqrt(0.001 * refZ);
    const rTxt = refZ >= 1000 ? `${(refZ / 1000).toFixed(refZ % 1000 === 0 ? 0 : 1)} k` : `${refZ}`;

    // 1. Update DMM 1 (Lucky 8050A #1)
    const dmm1Val1 = document.getElementById("rack-dmm1-val1");
    const dmm1Val2 = document.getElementById("rack-dmm1-val2");
    const dmm1Status = document.getElementById("rack-dmm1-status");
    const dmm1Detail = document.getElementById("dmm1-detail-text");

    if (dmm1Val1 && dmm1Val2) {
      const dbm1 = 20 * Math.log10(Math.max(0.0001, data1.vRms / vRefZ));
      if (this.dmm1Mode === "rms") {
        dmm1Val1.textContent = `${data1.vRms.toFixed(3)} V`;
        dmm1Val2.textContent = `${dbm1 >= 0 ? "+" : ""}${dbm1.toFixed(1)} dBm`;
      } else if (this.dmm1Mode === "dbu") {
        dmm1Val1.textContent = `${dbm1 >= 0 ? "+" : ""}${dbm1.toFixed(2)} dBm`;
        dmm1Val2.textContent = `${data1.vRms.toFixed(3)} V RMS`;
      } else if (this.dmm1Mode === "peak") {
        dmm1Val1.textContent = `${data1.vPk.toFixed(3)} Vpk`;
        dmm1Val2.textContent = `${(data1.vPk * 2).toFixed(3)} Vpp`;
      } else {
        dmm1Val1.textContent = `1.414 CF`;
        dmm1Val2.textContent = `${rTxt} Ω (REF Z)`;
      }
    }
    if (dmm1Status) {
      dmm1Status.textContent = data1.status.includes("CLIP") ? "CLIPPING" : (data1.status.length > 12 ? data1.status.substring(0, 12) : data1.status);
      dmm1Status.className = data1.status.includes("CLIP") || data1.status.includes("FAULT") ? "rack-status-pill amber" : "rack-status-pill yellow";
    }
    if (dmm1Detail) {
      dmm1Detail.textContent = `Probed: ${data1.name} • ${data1.vRms.toFixed(3)}V RMS • ${data1.status}`;
    }

    // 2. Update DMM 2 (Lucky 8050A #2)
    const dmm2Val1 = document.getElementById("rack-dmm2-val1");
    const dmm2Val2 = document.getElementById("rack-dmm2-val2");
    const dmm2Status = document.getElementById("rack-dmm2-status");
    const dmm2Detail = document.getElementById("dmm2-detail-text");

    if (dmm2Val1 && dmm2Val2) {
      const dbm2 = 20 * Math.log10(Math.max(0.0001, data2.vRms / vRefZ));
      if (this.dmm2Mode === "diff") {
        dmm2Val1.textContent = `${data2.vRms.toFixed(3)} V`;
        dmm2Val2.textContent = `${data2.thd.toFixed(3)}% THD`;
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
      dmm2Status.textContent = data2.cmrr >= 80 ? "BALANCED" : (data2.status.length > 12 ? data2.status.substring(0, 12) : data2.status);
      dmm2Status.className = data2.cmrr >= 80 ? "rack-status-pill green" : "rack-status-pill amber";
    }
    if (dmm2Detail) {
      dmm2Detail.textContent = `Probed: ${data2.name} • ${data2.vRms.toFixed(3)}V RMS • CMRR: ${data2.cmrr.toFixed(1)} dB • THD: ${data2.thd.toFixed(3)}%`;
    }

    // 3. Update Target VU Meter dB levels
    this.vu1TargetDbu = 20 * Math.log10(Math.max(0.00005, vu1Data.vRms / (this.vu1Range || 3.0)));
    this.vu2TargetDbu = 20 * Math.log10(Math.max(0.00005, vu2Data.vRms / (this.vu2Range || 3.0)));

    const vu1Detail = document.getElementById("vu1-detail-text");
    if (vu1Detail) {
      vu1Detail.textContent = `Probed: ${vu1Data.name} • ${vu1Data.vRms.toFixed(3)}V RMS (${(this.vu1TargetDbu >= 0 ? "+" : "") + this.vu1TargetDbu.toFixed(1)} dB relative to range)`;
    }
    const vu2Detail = document.getElementById("vu2-detail-text");
    if (vu2Detail) {
      vu2Detail.textContent = `Probed: ${vu2Data.name} • ${vu2Data.vRms.toFixed(3)}V RMS (${(this.vu2TargetDbu >= 0 ? "+" : "") + this.vu2TargetDbu.toFixed(1)} dB relative to range)`;
    }

    // 4. Update Scope Telemetry Text
    const sc1Tel = document.getElementById("scope1-telemetry");
    if (sc1Tel) {
      sc1Tel.textContent = `CH1 (Yellow Vin): 1.23V • CH2 (${sc1Data.name}): ${sc1Data.vRms.toFixed(2)}V RMS (${sc1Data.status})`;
    }
    const sc2Tel = document.getElementById("scope2-telemetry");
    if (sc2Tel) {
      sc2Tel.textContent = `CH3 (Pink Cold): 1.23V • CH4 (${sc2Data.name}): ${sc2Data.vRms.toFixed(2)}V RMS (${sc2Data.status})`;
    }

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

      // 2. Render Both Oscilloscopes
      this.renderScope1();
      this.renderScope2();

      // 3. Render Both APK VU Meters
      this.renderVuMeter(this.vu1Ctx, this.vu1Canvas, this.vu1NeedleDbu, "APK #1: DRIVE IN");
      this.renderVuMeter(this.vu2Ctx, this.vu2Canvas, this.vu2NeedleDbu, "APK #2: LOAD OUT");

      // 4. Render Trend Graph if tab active
      if (this.currentTab === "chart") {
        this.renderTrendGraph();
      }

      // 5. Render Dynamic SVG Wires
      this.renderWires();

      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  updateNeedleBallistics() {
    const eps = 0.02;

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

  renderScope1() {
    if (!this.scope1Ctx || !this.scope1Canvas) return;
    const ctx = this.scope1Ctx;
    const w = this.scope1Canvas.width;
    const h = this.scope1Canvas.height;

    // Phosphor decay persistence
    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.fillRect(0, 0, w, h);

    // Graticule Grid
    this.drawGraticule(ctx, w, h);

    const vinData = this.getSignalForTarget("6-1-vin");
    const sc1Data = this.getSignalForTarget(this.scope1Target);
    const voltsPerDiv = this.scope1VoltsDiv;
    const timePerDiv = this.scopeTimeDiv * 0.001;
    const totalTimeSpan = 10 * timePerDiv;
    const numSamples = 200;
    const midY = h / 2;

    // Waveform 1: Vin Drive (Yellow #facc15)
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      const v = (vinData.vPk || 1.737) * Math.sin(2 * Math.PI * (vinData.freq || 1000) * t);
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Waveform 2: Probed Target (Cyan #38bdf8)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.8;
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

    // Minimal CRT Readout (top)
    ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#facc15";
    ctx.textAlign = "left";
    ctx.fillText("CH1: VIN", 6, 11);
    ctx.fillStyle = "#38bdf8";
    const lbl1 = sc1Data.name.length > 15 ? sc1Data.name.substring(0, 15).toUpperCase() : sc1Data.name.toUpperCase();
    ctx.fillText(`CH2: ${lbl1}`, 60, 11);
    ctx.fillStyle = "#888888";
    ctx.textAlign = "right";
    ctx.fillText(`${voltsPerDiv}V/DIV`, w - 6, 11);
  }

  renderScope2() {
    if (!this.scope2Ctx || !this.scope2Canvas) return;
    const ctx = this.scope2Ctx;
    const w = this.scope2Canvas.width;
    const h = this.scope2Canvas.height;

    ctx.fillStyle = "rgba(0, 0, 0, 0.32)";
    ctx.fillRect(0, 0, w, h);

    this.drawGraticule(ctx, w, h);

    const coldData = this.getSignalForTarget("6-1-p3");
    const sc2Data = this.getSignalForTarget(this.scope2Target);
    const voltsPerDiv = this.scope2VoltsDiv;
    const timePerDiv = this.scopeTimeDiv * 0.001;
    const totalTimeSpan = 10 * timePerDiv;
    const numSamples = 200;
    const midY = h / 2;

    // Waveform 3: Cold / Return (Pink #f43f5e)
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 1.8;
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

    // Waveform 4: Probed Target (Green #4ade80)
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 1.8;
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

    // Minimal CRT Readout (top)
    ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#f43f5e";
    ctx.textAlign = "left";
    ctx.fillText("CH3: COLD", 6, 11);
    ctx.fillStyle = "#4ade80";
    const lbl2 = sc2Data.name.length > 15 ? sc2Data.name.substring(0, 15).toUpperCase() : sc2Data.name.toUpperCase();
    ctx.fillText(`CH4: ${lbl2}`, 68, 11);
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

  renderVuMeter(ctx, canvas, dBuVal, label) {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fbf9f2";
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h + 18;
    const radius = h * 0.95;

    // Specular mirror strip
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 12, -Math.PI * 0.78, -Math.PI * 0.22);
    ctx.stroke();

    // Red zone (> 0 dB)
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, -Math.PI * 0.44, -Math.PI * 0.24);
    ctx.stroke();

    // Black scale arc (< 0 dB)
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1.2;
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

      ctx.strokeStyle = t.db > 0 ? "#ef4444" : "#0f172a";
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

    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 1.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    // Pivot cap
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
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

    const connections = [
      { fromId: "dot-scope1-ch1", targetKey: "6-1-vin", color: "#facc15", label: "Scope 1 CH1 (Vin)" },
      { fromId: "dot-scope1-ch2", targetKey: this.scope1Target, color: "#38bdf8", label: "Scope 1 CH2 (+VE)" },
      { fromId: "dot-scope2-ch3", targetKey: "6-1-p3", color: "#f43f5e", label: "Scope 2 CH3 (-VE)" },
      { fromId: "dot-scope2-ch4", targetKey: this.scope2Target, color: "#4ade80", label: "Scope 2 CH4 (Diff)" },
      { fromId: "dot-dmm1", targetKey: this.dmm1Target, color: "#facc15", label: "DMM 1 (+VE)" },
      { fromId: "dot-dmm2", targetKey: this.dmm2Target, color: "#4ade80", label: "DMM 2 (Diff)" },
      { fromId: "dot-vu1", targetKey: this.vu1Target, color: "#facc15", label: "VU 1 (Drive)" },
      { fromId: "dot-vu2", targetKey: this.vu2Target, color: "#4ade80", label: "VU 2 (Load)" }
    ];

    let svgHtml = "";

    connections.forEach(conn => {
      const dotEl = document.getElementById(conn.fromId);
      if (!dotEl) return;
      const dotRect = dotEl.getBoundingClientRect();
      const x1 = dotRect.right;
      const y1 = dotRect.top + dotRect.height / 2;

      // Find target element in page or user anchors
      let targetEl = document.querySelector(`[data-probe-target="${conn.targetKey}"]`);
      if (!targetEl) {
        targetEl = document.getElementById(conn.targetKey);
      }

      let x2, y2;
      let isVisible = false;

      if (targetEl) {
        const tRect = targetEl.getBoundingClientRect();
        // Check if target is in visible viewport
        if (tRect.bottom > 0 && tRect.top < window.innerHeight && tRect.right > 350 && tRect.left < window.innerWidth) {
          x2 = tRect.left + tRect.width / 2;
          y2 = tRect.top + tRect.height / 2;
          isVisible = true;
        }
      }

      // If target is off-screen or not found, drape wire naturally across rightward
      if (!isVisible) {
        // Point toward middle-right of screen
        x2 = Math.min(window.innerWidth - 30, 420 + Math.sin(y1 * 0.05) * 40);
        y2 = Math.max(80, Math.min(window.innerHeight - 80, y1 + 30));
      }

      // Compute smooth cubic Bézier spline
      const dx = Math.abs(x2 - x1);
      const cx1 = x1 + dx * 0.5;
      const cy1 = y1;
      const cx2 = x2 - dx * 0.3;
      const cy2 = y2 + 20;

      svgHtml += `
        <g class="live-wire-group">
          <!-- Shadow -->
          <path d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}"
                fill="none" stroke="rgba(0,0,0,0.5)" stroke-width="4" stroke-linecap="round"/>
          <!-- Physical colored wire lead -->
          <path d="M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}"
                fill="none" stroke="${conn.color}" stroke-width="2.2" stroke-linecap="round" opacity="0.88"/>
          <!-- Needle Probe Tip at destination -->
          <circle cx="${x2}" cy="${y2}" r="3.5" fill="${conn.color}" stroke="#000000" stroke-width="1.5"/>
        </g>
      `;
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
