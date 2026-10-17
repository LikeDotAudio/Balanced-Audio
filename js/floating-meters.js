/**
 * floating-meters.js — Breakaway Floating Instrument Dock & Universal Circuit Probing
 *
 * Requirements:
 * - When scrolling past the laboratory bench, the two meters (HP 400FL AC Voltmeter at top,
 *   Fluke 8050A DMM at bottom) break away and float pinned on the right.
 * - Universal Probes: Red (+) and Black (−) test leads with glowing tips.
 * - Interactive Probing: Clicking any circuit terminal across the page connects the
 *   floating meters to that exact test point. Values update in real time as knobs/LTP faders move!
 * - Click Meter to Open Calibration: Clicking either meter expands its calibration settings.
 */

class FloatingMeterDock {
  constructor() {
    this.dock = null;
    this.isFloating = false;
    this.activeProbeTarget = "circuit-6-1-p2"; // Default probing Pin 2 on Circuit 6.1
    this.probeLabel = "Pin 2 Hot (Circuit 6.1)";
    this.activeCircuit = "6-1";
    this.animFrame = null;

    // Needle physics ballistics ported from NeedleMeter.jsx
    this.currentNeedleDbu = 4.0;
    this.targetNeedleDbu = 4.0;
    this.peakHoldDbu = 4.0;
    this.lastSampleDbu = 4.0;
    this.attackRate = 0.28;
    this.releaseRate = 0.08;

    // Settings drawer states
    this.settingsOpen = null; // 'hp' | 'fluke' | null

    this.init();
  }

  init() {
    this.createDockDOM();
    this.setupScrollTrigger();
    this.setupGlobalProbeHooks();
    this.startBallisticsLoop();
  }

  createDockDOM() {
    if (document.getElementById("floating-meter-dock")) {
      this.dock = document.getElementById("floating-meter-dock");
      return;
    }

    const dock = document.createElement("div");
    dock.id = "floating-meter-dock";
    dock.className = "floating-meter-dock";
    dock.setAttribute("aria-label", "Breakaway Laboratory Meter Dock");

    dock.innerHTML = `
      <!-- Dock Control Header -->
      <div class="dock-header">
        <div class="dock-title-group">
          <span class="dock-icon">⚡</span>
          <div>
            <div class="dock-title">LABORATORY BENCH PROBES</div>
            <div id="dock-probe-status" class="dock-probe-status">Probing: Pin 2 Hot (+4.0 dBu)</div>
          </div>
        </div>
        <div class="dock-action-btns">
          <button id="dock-expand-btn" class="dock-mini-btn" title="Expand Settings">⚙️</button>
          <button id="dock-minimize-btn" class="dock-mini-btn" title="Minimize Dock">_</button>
          <button id="dock-close-btn" class="dock-mini-btn" title="Dock back to bench">✕</button>
        </div>
      </div>

      <!-- Test Probe Leads Bar -->
      <div class="dock-probes-bar">
        <div class="probe-lead red active">
          <span class="probe-tip-led"></span>
          <span>Red (+) Probe: <strong id="dock-probe-red-target">Pin 2 Hot</strong></span>
        </div>
        <div class="probe-lead black active">
          <span class="probe-tip-led black-led"></span>
          <span>Black (&minus;) Probe: <strong id="dock-probe-black-target">Pin 1 Chassis</strong></span>
        </div>
      </div>

      <!-- Meter 1: HP 400FL Precision AC Voltmeter (TOP) -->
      <div id="dock-meter-hp" class="dock-meter-card" title="Click to open HP 400FL calibration settings">
        <div class="dock-meter-label">
          <span>HEWLETT &bull; PACKARD 400FL AC VOLTMETER</span>
          <span id="dock-hp-range-badge" class="badge-mini">3V / +10 dB</span>
        </div>
        <div class="dock-meter-face-wrapper">
          <canvas id="dock-hp-canvas" width="300" height="150" class="dock-canvas"></canvas>
        </div>
      </div>

      <!-- Meter 2: Fluke 8050A True RMS DMM (BOTTOM) -->
      <div id="dock-meter-fluke" class="dock-meter-card" title="Click to open Fluke 8050A multimeter settings">
        <div class="dock-meter-label">
          <span>FLUKE 8050A TRUE RMS DMM</span>
          <span id="dock-dmm-mode-badge" class="badge-mini cyan">AC V</span>
        </div>
        <div class="dock-dmm-vfd-display">
          <div class="dmm-vfd-row">
            <span class="dmm-vfd-label">V_DIFF (AC RMS):</span>
            <span id="dock-dmm-vdiff" class="dmm-vfd-number">1.228 V</span>
          </div>
          <div class="dmm-vfd-row">
            <span class="dmm-vfd-label">I_LOAD (CURRENT):</span>
            <span id="dock-dmm-iload" class="dmm-vfd-number">2.05 mA</span>
          </div>
          <div class="dmm-vfd-row">
            <span class="dmm-vfd-label">LINE BALANCE:</span>
            <span id="dock-dmm-status" class="dmm-vfd-status">SYMMETRIC</span>
          </div>
        </div>
      </div>

      <!-- Interactive Quick Probe Target Selector -->
      <div class="dock-target-selector">
        <label style="font-size: 0.68rem; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Move Probes to Test Point:</label>
        <select id="dock-probe-select" class="dock-probe-dropdown">
          <optgroup label="Circuit 6.1 (Dual Push-Pull)">
            <option value="6-1-p2" selected>Pin 2 Hot (Output +)</option>
            <option value="6-1-p3">Pin 3 Cold (Output &minus;)</option>
            <option value="6-1-load">Differential Across Load</option>
            <option value="6-1-vin">Audio Input Drive</option>
          </optgroup>
          <optgroup label="Circuit 6.2 (Active Impedance-Balanced)">
            <option value="6-2-p2">Pin 2 Hot (Active Out)</option>
            <option value="6-2-p3">Pin 3 Cold (Passive 0V Match)</option>
            <option value="6-2-load">Differential Across Load</option>
          </optgroup>
          <optgroup label="Circuit 6.3 (Transformer Floating)">
            <option value="6-3-sec">Secondary Across Pins 2 &amp; 3</option>
            <option value="6-3-pri">Primary Audio Drive</option>
          </optgroup>
          <optgroup label="Section 5.0 (Meyer Thevenin Ground Loop)">
            <option value="meyer-vgvd">Ground Loop Voltage (V_GVD)</option>
            <option value="meyer-verr">CM-to-DM Error Voltage</option>
            <option value="meyer-diff">Differential Output</option>
          </optgroup>
        </select>
      </div>

      <!-- Settings / Calibration Slide-out Drawer -->
      <div id="dock-settings-drawer" class="dock-settings-drawer">
        <div class="drawer-header">
          <span id="drawer-title" style="font-weight: 700; color: var(--accent-cyan);">HP 400FL Calibration</span>
          <button id="drawer-close-btn" class="drawer-close-btn">&times;</button>
        </div>
        <div id="drawer-content" class="drawer-content">
          <div style="font-size: 0.75rem; color: #94a3b8; line-height: 1.4;">
            <strong>Range Selection:</strong>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.35rem; margin: 0.4rem 0;">
              <button class="drawer-btn active" onclick="window.floatingMeterDock.setHpRange(3, '+10 dB')">3V (+10dB)</button>
              <button class="drawer-btn" onclick="window.floatingMeterDock.setHpRange(1, '0 dB')">1V (0dB)</button>
              <button class="drawer-btn" onclick="window.floatingMeterDock.setHpRange(10, '+20 dB')">10V (+20dB)</button>
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

    // Attach button listeners
    const closeBtn = dock.querySelector("#dock-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.dockBack());

    const minBtn = dock.querySelector("#dock-minimize-btn");
    if (minBtn) {
      minBtn.addEventListener("click", () => {
        dock.classList.toggle("minimized");
        minBtn.textContent = dock.classList.contains("minimized") ? "□" : "_";
      });
    }

    const expandBtn = dock.querySelector("#dock-expand-btn");
    if (expandBtn) expandBtn.addEventListener("click", () => this.toggleSettings("hp"));

    const hpCard = dock.querySelector("#dock-meter-hp");
    if (hpCard) hpCard.addEventListener("click", () => this.toggleSettings("hp"));

    const flukeCard = dock.querySelector("#dock-meter-fluke");
    if (flukeCard) flukeCard.addEventListener("click", () => this.toggleSettings("fluke"));

    const drawerClose = dock.querySelector("#drawer-close-btn");
    if (drawerClose) drawerClose.addEventListener("click", () => this.closeSettings());

    const select = dock.querySelector("#dock-probe-select");
    if (select) {
      select.addEventListener("change", (e) => {
        this.selectProbeTarget(e.target.value);
      });
    }

    this.initHpCanvas();
  }

  initHpCanvas() {
    this.hpCanvas = document.getElementById("dock-hp-canvas");
    if (!this.hpCanvas) return;
    this.hpCtx = this.hpCanvas.getContext("2d");
    this.renderHpMeter(this.currentNeedleDbu);
  }

  setupScrollTrigger() {
    const labBench = document.getElementById("topologies");
    window.addEventListener("scroll", () => {
      if (!labBench) return;
      const rect = labBench.getBoundingClientRect();
      // Break away when scrolling past the top of the circuit section
      if (rect.bottom < 150) {
        this.setFloating(true);
      } else if (rect.top > 200) {
        this.setFloating(false);
      }
    }, { passive: true });
  }

  toggleFloat() {
    this.setFloating(!this.isFloating);
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
      title.textContent = type === "hp" ? "HP 400FL Calibration" : "Fluke 8050A Multimeter Configuration";
    }
  }

  closeSettings() {
    const drawer = document.getElementById("dock-settings-drawer");
    if (drawer) drawer.classList.remove("open");
    this.settingsOpen = null;
  }

  setHpRange(v, dbTxt) {
    const badge = document.getElementById("dock-hp-range-badge");
    if (badge) badge.textContent = `${v}V / ${dbTxt}`;
  }

  setBallistics(mode) {
    if (mode === "peak") {
      this.attackRate = 0.55;
      this.releaseRate = 0.04;
    } else if (mode === "damped") {
      this.attackRate = 0.15;
      this.releaseRate = 0.12;
    } else {
      // standard VU 300ms
      this.attackRate = 0.28;
      this.releaseRate = 0.08;
    }
  }

  setupGlobalProbeHooks() {
    // Add clickable probe handlers to any element with data-probe-point
    document.querySelectorAll("[data-probe-target]").forEach(el => {
      el.addEventListener("click", () => {
        const target = el.getAttribute("data-probe-target");
        this.selectProbeTarget(target);
      });
    });
  }

  selectProbeTarget(targetKey) {
    this.activeProbeTarget = targetKey;
    const select = document.getElementById("dock-probe-select");
    if (select) select.value = targetKey;

    const redLabel = document.getElementById("dock-probe-red-target");
    const statusLabel = document.getElementById("dock-probe-status");

    const targets = {
      "6-1-p2": { red: "Pin 2 Hot", desc: "Pin 2 Hot (Circuit 6.1 Dual Push-Pull)" },
      "6-1-p3": { red: "Pin 3 Cold", desc: "Pin 3 Cold (Circuit 6.1 Dual Push-Pull)" },
      "6-1-load": { red: "Load Differential", desc: "Differential Across Load (Circuit 6.1)" },
      "6-1-vin": { red: "Audio In (Drive)", desc: "Generator Drive Voltage (Circuit 6.1)" },
      "6-2-p2": { red: "Pin 2 Hot", desc: "Pin 2 Hot (Circuit 6.2 Active Impedance)" },
      "6-2-p3": { red: "Pin 3 Cold", desc: "Pin 3 Cold (Circuit 6.2 Passive Match 0V)" },
      "6-2-load": { red: "Load Differential", desc: "Differential Across Load (Circuit 6.2)" },
      "6-3-sec": { red: "Sec Pins 2-3", desc: "Secondary Floating Output (Circuit 6.3)" },
      "6-3-pri": { red: "Primary In", desc: "Primary Driver Input (Circuit 6.3)" },
      "meyer-vgvd": { red: "Ground V_GVD", desc: "Ground Voltage Difference (Thevenin Model)" },
      "meyer-verr": { red: "Error V_error", desc: "CM-to-DM Conversion Error (Thevenin Model)" },
      "meyer-diff": { red: "V_diff Output", desc: "Audio Differential Signal (Thevenin Model)" }
    };

    const info = targets[targetKey] || { red: targetKey, desc: targetKey };
    if (redLabel) redLabel.textContent = info.red;
    if (statusLabel) statusLabel.textContent = `Probing: ${info.desc}`;

    this.setFloating(true);
    this.updateFromActiveCircuit();
  }

  updateLiveReadings(vDiff, iLoad, dBu, status = "SYMMETRIC") {
    this.targetNeedleDbu = dBu;

    const vdiffEl = document.getElementById("dock-dmm-vdiff");
    if (vdiffEl) vdiffEl.textContent = `${vDiff.toFixed(2)} V`;

    const iloadEl = document.getElementById("dock-dmm-iload");
    if (iloadEl) iloadEl.textContent = `${(iLoad * 1000).toFixed(1)} mA`;

    const statusEl = document.getElementById("dock-dmm-status");
    if (statusEl) {
      statusEl.textContent = status;
      statusEl.className = status.includes("OVERLOAD") || status.includes("CLIP") 
        ? "dmm-vfd-status amber" 
        : "dmm-vfd-status";
    }
  }

  updateFromActiveCircuit() {
    // Read from current simulator values based on active probe target
    const key = this.activeProbeTarget;
    if (key.startsWith("6-1")) {
      const vinEl = document.getElementById("pp-vin");
      const vin = vinEl ? parseFloat(vinEl.value) : 1.2;
      const routEl = document.getElementById("pp-rout");
      const rout = routEl ? parseFloat(routEl.value) : 50;
      const rloadEl = document.getElementById("pp-rload");
      const rload = rloadEl ? parseFloat(rloadEl.value) : 600;
      const shortPin3 = document.getElementById("pp-short-pin3")?.checked || false;

      let vPin2, vPin3, iLoad, vDiff;
      if (!shortPin3) {
        iLoad = (2 * vin) / (2 * rout + rload);
        vPin2 = vin - iLoad * rout;
        vPin3 = -(vin - iLoad * rout);
        vDiff = 2 * (vin - iLoad * rout);
      } else {
        iLoad = vin / (rout + rload);
        vPin2 = vin - iLoad * rout;
        vPin3 = 0;
        vDiff = vPin2;
      }

      let measuredV = vDiff;
      if (key === "6-1-p2") measuredV = vPin2;
      else if (key === "6-1-p3") measuredV = Math.abs(vPin3);
      else if (key === "6-1-vin") measuredV = vin;

      const dBu = 20 * Math.log10(Math.max(0.001, measuredV / 0.775));
      this.updateLiveReadings(measuredV, iLoad, dBu, shortPin3 ? "OVERLOAD CLIP" : "SYMMETRIC");
    } else if (key.startsWith("6-2")) {
      const vinEl = document.getElementById("ib-vin");
      const vin = vinEl ? parseFloat(vinEl.value) : 1.2;
      const routEl = document.getElementById("ib-rout");
      const rout = routEl ? parseFloat(routEl.value) : 50;
      const rloadEl = document.getElementById("ib-rload");
      const rload = rloadEl ? parseFloat(rloadEl.value) : 10000;
      const shortPin3 = document.getElementById("ib-short-pin3")?.checked || false;

      const iLoad = vin / (rout + rload);
      const vPin2 = iLoad * rload;
      const measuredV = key === "6-2-p3" ? 0 : vPin2;
      const dBu = 20 * Math.log10(Math.max(0.001, measuredV / 0.775));
      this.updateLiveReadings(measuredV, iLoad, dBu, shortPin3 ? "UNBALANCED SAFE" : "SYMMETRIC IMPEDANCE");
    } else if (key.startsWith("meyer")) {
      const vpoEl = document.getElementById("meyer-vpo");
      const vpo = vpoEl ? parseFloat(vpoEl.value) : 1.23;
      const vgvdEl = document.getElementById("meyer-vgvd");
      const vgvd = vgvdEl ? parseFloat(vgvdEl.value) : 10.0;
      const zpoEl = document.getElementById("meyer-zpo");
      const zpo = zpoEl ? parseFloat(zpoEl.value) : 50;
      const zroEl = document.getElementById("meyer-zro");
      const zro = zroEl ? parseFloat(zroEl.value) : 50;
      const deltaZ = Math.abs(zpo - zro);

      const vErr = vgvd * (deltaZ / 20000);
      const measuredV = key === "meyer-vgvd" ? vgvd : (key === "meyer-verr" ? vErr : vpo);
      const dBu = 20 * Math.log10(Math.max(0.001, measuredV / 0.775));
      this.updateLiveReadings(measuredV, vpo / 600, dBu, deltaZ === 0 ? "INFINITE CMRR" : "IMBALANCE NOISE");
    } else if (key.startsWith("6-3")) {
      const vinEl = document.getElementById("tx-vin");
      const vin = vinEl ? parseFloat(vinEl.value) : 15.0;
      const ratioEl = document.getElementById("tx-ratio");
      const ratio = ratioEl ? parseFloat(ratioEl.value) : 1.0;
      const rloadEl = document.getElementById("tx-rload");
      const rload = rloadEl ? parseFloat(rloadEl.value) : 600;
      const groundPin3 = document.getElementById("tx-ground-pin3")?.checked || false;

      const vSec = vin * ratio;
      const iLoad = vSec / (40 + rload);
      const vLoad = iLoad * rload;
      const measuredV = key === "6-3-pri" ? vin : vLoad;
      const dBu = 20 * Math.log10(Math.max(0.001, measuredV / 0.775));
      this.updateLiveReadings(measuredV, iLoad, dBu, groundPin3 ? "EARTH-REF PIN 3" : "GALVANIC FLOATING");
    }
  }

  startBallisticsLoop() {
    const loop = () => {
      // Dynamic needle physics attack & release
      const eps = 0.02;
      if (this.currentNeedleDbu < this.targetNeedleDbu - eps) {
        this.currentNeedleDbu += (this.targetNeedleDbu - this.currentNeedleDbu) * this.attackRate;
      } else {
        this.currentNeedleDbu -= (this.currentNeedleDbu - this.targetNeedleDbu) * this.releaseRate;
      }

      this.renderHpMeter(this.currentNeedleDbu);
      this.animFrame = requestAnimationFrame(loop);
    };
    loop();
  }

  renderHpMeter(dBuVal) {
    if (!this.hpCtx) return;
    const ctx = this.hpCtx;
    const w = this.hpCanvas.width;
    const h = this.hpCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Bezel & aged ivory dial face
    ctx.fillStyle = "#fbf9f2";
    ctx.fillRect(0, 0, w, h);

    // Pivot center and arc radius
    const cx = w / 2;
    const cy = h + 25;
    const radius = h * 0.95;

    // Specular mirror strip to eliminate parallax
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 16, -Math.PI * 0.78, -Math.PI * 0.22);
    ctx.stroke();

    // Red zone (> 0 dB)
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.beginPath();
    // 0 dB is at approx -Math.PI * 0.44
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

    ctx.font = "bold 9px 'Inter', sans-serif";
    ctx.textAlign = "center";
    dbTicks.forEach(t => {
      const a = t.ang * Math.PI;
      const x1 = cx + (radius - 1) * Math.cos(a);
      const y1 = cy + (radius - 1) * Math.sin(a);
      const x2 = cx + (radius - 8) * Math.cos(a);
      const y2 = cy + (radius - 8) * Math.sin(a);

      ctx.strokeStyle = t.db > 0 ? "#ef4444" : "#0f172a";
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      const tx = cx + (radius - 16) * Math.cos(a);
      const ty = cy + (radius - 16) * Math.sin(a);
      ctx.fillStyle = t.db > 0 ? "#ef4444" : "#0f172a";
      ctx.fillText(t.db > 0 ? `+${t.db}` : `${t.db}`, tx, ty);
    });

    // Map current dBuVal (-20 to +3 dBu) to angle
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

    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(tipX, tipY);
    ctx.stroke();

    // Pivot cap
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#b91c1c";
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.floatingMeterDock = new FloatingMeterDock();
});
