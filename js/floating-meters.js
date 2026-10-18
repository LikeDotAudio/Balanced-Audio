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
    this.dmm1Mode = "rms"; // 'rms' | 'dbu' | 'peak' | 'crest'
    this.dmm2Mode = "diff"; // 'diff' | 'thd' | 'cmrr' | 'error'

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
            <select class="rack-probe-dropdown" data-probe-select="scope1">
              <option value="6-1-p2" selected>Pin 2 Hot (Circuit 6.1)</option>
              <option value="6-1-vin">Audio Input Drive (Vin)</option>
              <option value="6-1-op1">Op-Amp A1 Output (+Buffer)</option>
              <option value="6-2-p2">Pin 2 Hot (Circuit 6.2 Active)</option>
              <option value="6-3-p2">Secondary Pin 2 (Circuit 6.3)</option>
              <option value="meyer-p2">Cable Pin 2 Hot Line (Section 5)</option>
            </select>
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
            <select class="rack-probe-dropdown" data-probe-select="scope2">
              <option value="6-1-load" selected>Differential Across Load (Circuit 6.1)</option>
              <option value="6-1-p3">Pin 3 Cold Output (Circuit 6.1)</option>
              <option value="6-2-load">Differential Load (Circuit 6.2)</option>
              <option value="6-2-p3">Pin 3 Cold 0V Passive (Circuit 6.2)</option>
              <option value="6-3-sec">Transformer Secondary 2-3 (Circuit 6.3)</option>
              <option value="meyer-diff">Receiver Differential Audio (Section 5)</option>
            </select>
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
              <button class="dmm-key" data-dmm1-mode="dbu">dBu LEVEL</button>
              <button class="dmm-key" data-dmm1-mode="peak">PEAK</button>
              <button class="dmm-key" data-dmm1-mode="crest">CREST</button>
            </div>
            <div class="rack-telemetry-text" id="dmm1-detail-text">
              Probed Signal: Pin 2 Hot Output (+4.0 dBu Ref 0.775V)
            </div>
            <select class="rack-probe-dropdown" data-probe-select="dmm1">
              <option value="6-1-p2" selected>Pin 2 Hot (+VE Driver Out)</option>
              <option value="6-1-vin">Audio Input Drive (Vin)</option>
              <option value="6-2-p2">Circuit 6.2 Active Hot Out</option>
              <option value="6-3-p2">Circuit 6.3 Transformer Hot</option>
              <option value="meyer-vpo">Jim Meyer V_PO Generator</option>
            </select>
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
              <button class="dmm-key" data-dmm2-mode="error">ERROR Verr</button>
            </div>
            <div class="rack-telemetry-text" id="dmm2-detail-text">
              Differential Load: 2.456V RMS &bull; CMRR: >95.0 dB &bull; THD: 0.003%
            </div>
            <select class="rack-probe-dropdown" data-probe-select="dmm2">
              <option value="6-1-load" selected>Circuit 6.1 Differential Across Load</option>
              <option value="6-1-p3">Circuit 6.1 Pin 3 Cold Out</option>
              <option value="6-2-load">Circuit 6.2 Differential Across Load</option>
              <option value="6-2-p3">Circuit 6.2 Pin 3 Cold Passive (0V)</option>
              <option value="6-3-sec">Circuit 6.3 Transformer Floating Secondary</option>
              <option value="meyer-verr">Section 5 Meyer CM-to-DM Error (V_err)</option>
              <option value="meyer-diff">Section 5 Receiver Differential Out</option>
            </select>
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
            <div class="rack-telemetry-text">
              Tracks audio generator input drive level with 300ms mechanical needle ballistics.
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
            <div class="rack-telemetry-text">
              Tracks differential output level across balanced receiver terminating load.
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
        this.updateFromActiveCircuit();
      });
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

  getCircuitChannelData() {
    let freq = 1000.0;
    let vin = 1.2;
    let vHot = 1.2;
    let vCold = 1.2;
    let vDiff = 2.4;
    let iLoad = 0.002;
    let thd = 0.003;
    let cmrr = 95.0;
    let status = "NORMAL SYMMETRICAL";

    // Detect circuit parameter inputs from active page
    const ppVin = document.getElementById("pp-vin");
    const ibVin = document.getElementById("ib-vin");
    const meyerVpo = document.getElementById("meyer-vpo");

    if (ppVin) {
      vin = parseFloat(ppVin.value || 1.2);
      const rout = parseFloat(document.getElementById("pp-rout")?.value || 50);
      const rload = parseFloat(document.getElementById("pp-rload")?.value || 600);
      const shortPin3 = document.getElementById("pp-short-pin3")?.checked || false;

      if (!shortPin3) {
        iLoad = (2 * vin) / (2 * rout + rload);
        vHot = vin - iLoad * rout;
        vCold = vHot;
        vDiff = 2 * vHot;
        cmrr = 95.0;
        thd = 0.0025;
        status = "NORMAL SYMMETRICAL";
      } else {
        iLoad = vin / (rout + rload);
        vHot = vin - iLoad * rout;
        vCold = 0;
        vDiff = vHot;
        cmrr = 48.0;
        thd = iLoad > 0.05 ? 12.5 : 0.085;
        status = iLoad > 0.05 ? "CURRENT LIMIT CLIP" : "TS SHORTED";
      }
    } else if (ibVin) {
      vin = parseFloat(ibVin.value || 1.2);
      const rout = parseFloat(document.getElementById("ib-rout")?.value || 50);
      const rload = parseFloat(document.getElementById("ib-rload")?.value || 10000);
      iLoad = vin / (rout + rload);
      vHot = iLoad * rload;
      vCold = 0.0;
      vDiff = vHot;
      cmrr = 110.0;
      thd = 0.0018;
      status = "ACTIVE IMPEDANCE-BALANCED";
    }

    return {
      freq,
      vin,
      vHot,
      vCold,
      vDiff,
      iLoad,
      thd,
      cmrr,
      status
    };
  }

  updateFromActiveCircuit() {
    const data = this.getCircuitChannelData();

    // 1. Update DMM 1 (Lucky 8050A #1)
    const dmm1Val1 = document.getElementById("rack-dmm1-val1");
    const dmm1Val2 = document.getElementById("rack-dmm1-val2");
    const dmm1Status = document.getElementById("rack-dmm1-status");
    const dmm1Detail = document.getElementById("dmm1-detail-text");

    if (dmm1Val1 && dmm1Val2) {
      if (this.dmm1Mode === "rms") {
        dmm1Val1.textContent = `${data.vHot.toFixed(3)} V`;
        const dbu = 20 * Math.log10(Math.max(0.0001, data.vHot / 0.775));
        dmm1Val2.textContent = `${dbu >= 0 ? "+" : ""}${dbu.toFixed(1)} dBu`;
      } else if (this.dmm1Mode === "dbu") {
        const dbu = 20 * Math.log10(Math.max(0.0001, data.vHot / 0.775));
        dmm1Val1.textContent = `${dbu >= 0 ? "+" : ""}${dbu.toFixed(2)} dBu`;
        dmm1Val2.textContent = `${data.vHot.toFixed(3)} V RMS`;
      } else if (this.dmm1Mode === "peak") {
        dmm1Val1.textContent = `${(data.vHot * Math.SQRT2).toFixed(3)} Vpk`;
        dmm1Val2.textContent = `${(data.vHot * 2 * Math.SQRT2).toFixed(3)} Vpp`;
      } else {
        dmm1Val1.textContent = `1.414 CF`;
        dmm1Val2.textContent = `PURE SINE`;
      }
    }
    if (dmm1Status) {
      dmm1Status.textContent = data.status.includes("CLIP") ? "CLIPPING" : "+VE HOT";
      dmm1Status.className = data.status.includes("CLIP") ? "rack-status-pill amber" : "rack-status-pill yellow";
    }
    if (dmm1Detail) {
      dmm1Detail.textContent = `Target: ${this.dmm1Target} • ${data.vHot.toFixed(3)}V RMS • ${data.status}`;
    }

    // 2. Update DMM 2 (Lucky 8050A #2)
    const dmm2Val1 = document.getElementById("rack-dmm2-val1");
    const dmm2Val2 = document.getElementById("rack-dmm2-val2");
    const dmm2Status = document.getElementById("rack-dmm2-status");
    const dmm2Detail = document.getElementById("dmm2-detail-text");

    if (dmm2Val1 && dmm2Val2) {
      if (this.dmm2Mode === "diff") {
        dmm2Val1.textContent = `${data.vDiff.toFixed(3)} V`;
        dmm2Val2.textContent = `${(data.thd).toFixed(3)}% THD`;
      } else if (this.dmm2Mode === "thd") {
        dmm2Val1.textContent = `${(data.thd).toFixed(3)} %`;
        const distDb = -20 * Math.log10(Math.max(0.00001, data.thd / 100));
        dmm2Val2.textContent = `-${distDb.toFixed(1)} dB`;
      } else if (this.dmm2Mode === "cmrr") {
        dmm2Val1.textContent = `${data.cmrr.toFixed(1)} dB`;
        dmm2Val2.textContent = `CMRR REJECT`;
      } else {
        const vErr = data.vDiff - 2 * data.vHot;
        dmm2Val1.textContent = `${Math.abs(vErr * 1000).toFixed(2)} mV`;
        dmm2Val2.textContent = `V_ERR LEAK`;
      }
    }
    if (dmm2Status) {
      dmm2Status.textContent = data.cmrr >= 80 ? "BALANCED" : "DEGRADED";
      dmm2Status.className = data.cmrr >= 80 ? "rack-status-pill green" : "rack-status-pill amber";
    }
    if (dmm2Detail) {
      dmm2Detail.textContent = `Diff Load: ${data.vDiff.toFixed(3)}V RMS • CMRR: ${data.cmrr.toFixed(1)} dB • THD: ${data.thd.toFixed(3)}%`;
    }

    // 3. Update Target VU Meter dB levels
    this.vu1TargetDbu = 20 * Math.log10(Math.max(0.00005, data.vin / (this.vu1Range || 3.0)));
    this.vu2TargetDbu = 20 * Math.log10(Math.max(0.00005, data.vDiff / (this.vu2Range || 3.0)));

    // 4. Update Scope Telemetry Text
    const sc1Tel = document.getElementById("scope1-telemetry");
    if (sc1Tel) {
      sc1Tel.textContent = `CH1 (Yellow Vin): ${data.vin.toFixed(2)}V • CH2 (Cyan Hot): ${data.vHot.toFixed(2)}V • Phase: 0°`;
    }
    const sc2Tel = document.getElementById("scope2-telemetry");
    if (sc2Tel) {
      sc2Tel.textContent = `CH3 (Pink Cold): ${data.vCold.toFixed(2)}V • CH4 (Green Diff): ${data.vDiff.toFixed(2)}V • CMRR: ${data.cmrr.toFixed(0)}dB`;
    }

    // 5. Append sample to Trend Recorder
    if (this.trendRunning) {
      this.trendBuffer.push({
        vHot: data.vHot,
        vCold: data.vCold,
        vDiff: data.vDiff,
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

    const cData = this.getCircuitChannelData();
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
      const v = cData.vin * Math.SQRT2 * Math.sin(2 * Math.PI * cData.freq * t);
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Waveform 2: Vhot Pin 2 (Cyan #38bdf8)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      let v = cData.vHot * Math.SQRT2 * Math.sin(2 * Math.PI * cData.freq * t);
      if (cData.status.includes("CLIP")) {
        v = Math.max(-1.5, Math.min(1.5, v * 1.8));
      }
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Minimal CRT Readout (top right)
    ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#facc15";
    ctx.textAlign = "left";
    ctx.fillText("VIN", 6, 11);
    ctx.fillStyle = "#38bdf8";
    ctx.fillText("+VE HOT", 36, 11);
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

    const cData = this.getCircuitChannelData();
    const voltsPerDiv = this.scope2VoltsDiv;
    const timePerDiv = this.scopeTimeDiv * 0.001;
    const totalTimeSpan = 10 * timePerDiv;
    const numSamples = 200;
    const midY = h / 2;

    // Waveform 3: Vcold Pin 3 (Pink #f43f5e)
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      let v = 0;
      if (cData.vCold > 0.01) {
        v = cData.vCold * Math.SQRT2 * Math.sin(2 * Math.PI * cData.freq * t + Math.PI);
      }
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Waveform 4: Differential Across Load (Green #4ade80)
    ctx.strokeStyle = "#4ade80";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let s = 0; s < numSamples; s++) {
      const px = (s / (numSamples - 1)) * w;
      const t = (s / (numSamples - 1)) * totalTimeSpan;
      const v = cData.vDiff * Math.SQRT2 * Math.sin(2 * Math.PI * cData.freq * t);
      const py = midY - (v / (4 * voltsPerDiv)) * midY;
      if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Minimal CRT Readout (top right)
    ctx.font = "bold 8.5px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#f43f5e";
    ctx.textAlign = "left";
    ctx.fillText("-VE COLD", 6, 11);
    ctx.fillStyle = "#4ade80";
    ctx.fillText("DIFF LOAD", 58, 11);
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
      { fromId: "dot-dmm2", targetKey: this.dmm2Target, color: "#4ade80", label: "DMM 2 (Diff)" }
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
