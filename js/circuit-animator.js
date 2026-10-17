/**
 * AES-X152 Interactive Animated Circuit Simulator & Thevenin Model Engine
 * High-fidelity animated SVG circuit engine with dynamic variables,
 * live voltage-colored conductors, animated current flow particles,
 * and real-time Falstad-style probe readouts.
 */

class CircuitSimulator {
  constructor() {
    this.animationFrame = null;
    this.time = 0;
    this.circuits = {};
  }

  init() {
    this.setupListeners();
    this.startAnimationLoop();
  }

  setupListeners() {
    // 6.1 Ground Referenced Controls
    this.bindInputs(["pp-vin", "pp-rout", "pp-rload", "pp-short-pin3"], () => this.updatePushPull());

    // 6.2 Impedance-Balanced / Active Floating Controls
    this.bindInputs(["ib-vin", "ib-rout", "ib-rload", "ib-short-pin3", "af-vin", "af-rout", "af-rload", "af-short-pin3"], () => this.updateImpedanceBalanced());

    // 6.3 Transformer Floating Controls
    this.bindInputs(["tx-vin", "tx-ratio", "tx-rload", "tx-ground-pin3"], () => this.updateTransformer());

    // 6.4 Double Transformer Link & Noise Injection Controls
    this.bindInputs(["txlink-vin", "txlink-noise", "txlink-rload"], () => this.updateTransformerLink());

    // Type Z Impedance Balanced Controls
    this.bindInputs(["z-vin", "z-rout", "z-rload", "z-short-pin3"], () => this.updateTypeZ());

    // Dynamic Range Pyramid Controls
    this.bindInputs(["pyr-ref-level", "pyr-clip-level", "pyr-noise-floor", "pyr-mezz-offset"], () => this.updatePyramid());

    // Deepest Dive: Jim Meyer Thevenin Model Controls
    this.bindInputs(["meyer-vpo", "meyer-zpo", "meyer-zro", "meyer-cmz", "meyer-vgvd", "meyer-cps"], () => this.updateMeyerModel());

    // Initial calculations
    this.updatePushPull();
    this.updateImpedanceBalanced();
    this.updateTransformer();
    this.updateTransformerLink();
    this.updateTypeZ();
    this.updatePyramid();
    this.updateMeyerModel();

    // 1960s Military & 1970s Laboratory Equipment Handlers
    this.initMilitaryControls();
    this.initLevelConverter();
  }

  bindInputs(ids, callback) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", callback);
    });
  }

  // Helper: Rotate 1970s test equipment dial knob
  updateKnob(knobId, val, min, max) {
    const knob = document.getElementById(knobId);
    if (!knob) return;
    const clamped = Math.max(min, Math.min(max, val));
    const angle = -135 + ((clamped - min) / (max - min)) * 270;
    knob.style.transform = `rotate(${angle.toFixed(1)}deg)`;
  }

  // Helper: Deflect 1970s HP 400FL Precision AC Voltmeter needle (-20 to +2 dB / 0 to 1.0 V RMS)
  updateVuMeter(needleId, dBu) {
    const needle = document.getElementById(needleId);
    if (!needle) return;
    
    // HP 400FL Precision AC Voltmeter movement calibration:
    // Moving-coil galvanometer pivot is at cx=190, cy=250.
    // Rest stop (no signal / <= -24 dB): -36 deg
    // 0.1 V (-20 dB): -30 deg
    // 0.316 V (-10 dB): -17 deg
    // 0.5 V (-6 dB): -6 deg
    // 0.775 V (0 dBu): +10.5 deg
    // 1.0 V (0 dB on 1V scale): +24 deg
    // 1.228 V (+4 dBu / +2 dBFS relative): +37.7 deg
    // Mechanical full-scale stop: +41 deg
    let angle;
    if (dBu <= -24) {
      angle = -36;
    } else if (dBu >= 3.5) {
      angle = 41;
    } else {
      const v = 0.775 * Math.pow(10, dBu / 20);
      const vNorm = Math.min(1.28, Math.max(0.0, v));
      angle = -36 + vNorm * 60;
    }
    
    needle.setAttribute("transform", `rotate(${angle.toFixed(2)} 190 250)`);
    needle.style.transformOrigin = "190px 250px";
    needle.style.transform = `rotate(${angle.toFixed(2)}deg)`;
  }

  // 1960s Military Step Presets & Manual Exact Value Binding
  initMilitaryControls() {
    const bindPresetAndManual = (sliderId, presetId, manualId, updateFn) => {
      const slider = document.getElementById(sliderId);
      const preset = document.getElementById(presetId);
      const manual = document.getElementById(manualId);
      if (!slider) return;

      if (preset) {
        preset.addEventListener("change", (e) => {
          if (e.target.value !== "custom") {
            const val = parseFloat(e.target.value);
            slider.value = val;
            if (manual) manual.value = val;
            updateFn();
          }
        });
      }

      if (manual) {
        manual.addEventListener("input", (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val)) {
            slider.value = val;
            if (preset) preset.value = "custom";
            updateFn();
          }
        });
      }
    };

    bindPresetAndManual("pp-vin", "pp-vin-preset", "pp-vin-manual", () => this.updatePushPull());
    bindPresetAndManual("pp-rout", "pp-rout-preset", "pp-rout-manual", () => this.updatePushPull());
    bindPresetAndManual("pp-rload", "pp-rload-preset", "pp-rload-manual", () => this.updatePushPull());
  }

  // 1970s Laboratory Audio Level Converter & DMM LCD Driver
  initLevelConverter() {
    const dbuEl = document.getElementById("calc-dbu");
    const dbvEl = document.getElementById("calc-dbv");
    const vrmsEl = document.getElementById("calc-vrms");
    const vpeakEl = document.getElementById("calc-vpeak");
    const presetSelect = document.getElementById("pyr-preset-select");

    const syncFromDbu = (dbu) => {
      const vrms = 0.775 * Math.pow(10, dbu / 20);
      const dbv = 20 * Math.log10(Math.max(0.0001, vrms / 1.0));
      const vpeak = vrms * Math.SQRT2;

      if (dbuEl && document.activeElement !== dbuEl) dbuEl.value = dbu.toFixed(2);
      if (dbvEl && document.activeElement !== dbvEl) dbvEl.value = dbv.toFixed(2);
      if (vrmsEl && document.activeElement !== vrmsEl) vrmsEl.value = vrms >= 1.0 ? vrms.toFixed(3) : vrms.toFixed(4);
      if (vpeakEl) vpeakEl.value = vpeak >= 1.0 ? vpeak.toFixed(3) : vpeak.toFixed(4);

      // 1970s DMM Fluorescent LCD readout
      const dmmVrms = document.getElementById("dmm-vrms-val");
      if (dmmVrms) dmmVrms.textContent = `${vrms >= 1.0 ? vrms.toFixed(3) : (vrms * 1000).toFixed(1) + ' m'}V`;
      const dmmDbu = document.getElementById("dmm-dbu-val");
      if (dmmDbu) dmmDbu.textContent = `${dbu >= 0 ? '+' : ''}${dbu.toFixed(1)} dBu`;
      const dmmPeak = document.getElementById("dmm-vpeak-val");
      if (dmmPeak) dmmPeak.textContent = `${vpeak >= 1.0 ? vpeak.toFixed(3) : (vpeak * 1000).toFixed(1) + ' m'}V`;

      // 1970s Analogue VU meter needle deflection
      this.updateVuMeter("pyr-vu-needle", dbu);
    };

    if (dbuEl) {
      dbuEl.addEventListener("input", () => {
        const dbu = parseFloat(dbuEl.value);
        if (!isNaN(dbu)) {
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (dbvEl) {
      dbvEl.addEventListener("input", () => {
        const dbv = parseFloat(dbvEl.value);
        if (!isNaN(dbv)) {
          const vrms = Math.pow(10, dbv / 20);
          const dbu = 20 * Math.log10(vrms / 0.775);
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (vrmsEl) {
      vrmsEl.addEventListener("input", () => {
        const vrms = parseFloat(vrmsEl.value);
        if (!isNaN(vrms) && vrms > 0) {
          const dbu = 20 * Math.log10(vrms / 0.775);
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        if (e.target.value !== "custom") {
          const dbu = parseFloat(e.target.value);
          if (!isNaN(dbu)) syncFromDbu(dbu);
        }
      });
    }

    // Initialize with +4.0 dBu studio standard
    syncFromDbu(4.0);
  }

  // ==========================================
  // 6.1 Ground Referenced Push-Pull
  // ==========================================
  updatePushPull() {
    const vinEl = document.getElementById("pp-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById("pp-rout").value);
    const rload = parseFloat(document.getElementById("pp-rload").value);
    const shortPin3 = document.getElementById("pp-short-pin3").checked;

    document.getElementById("pp-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("pp-rout-val").textContent = `${rout} Ω`;
    document.getElementById("pp-rload-val").textContent = `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`;

    // Synchronize 1970s rotary knob dials
    this.updateKnob("pp-vin-knob", vin, 0.1, 5.0);
    this.updateKnob("pp-rout-knob", rout, 10, 200);
    this.updateKnob("pp-rload-knob", rload, 150, 10000);

    // Synchronize manual number inputs if not actively focused
    const vinMan = document.getElementById("pp-vin-manual");
    if (vinMan && document.activeElement !== vinMan) vinMan.value = vin.toFixed(1);
    const routMan = document.getElementById("pp-rout-manual");
    if (routMan && document.activeElement !== routMan) routMan.value = Math.round(rout);
    const rloadMan = document.getElementById("pp-rload-manual");
    if (rloadMan && document.activeElement !== rloadMan) rloadMan.value = Math.round(rload);

    let vPin2, vPin3, iPin2, iPin3, vDiff, iLoad, isClipped = false;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = (2 * vin) / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = -(vin - iLoad * rout);
      iPin2 = iLoad;
      iPin3 = iLoad;
      vDiff = vPin2 - vPin3;
    } else {
      const iShort = vin / Math.max(1, rout);
      iPin3 = iShort;
      vPin3 = 0;
      iLoad = vin / (rout + rload);
      vPin2 = vin - iLoad * rout;
      iPin2 = iLoad;
      vDiff = vPin2;
      if (iShort > 0.05) isClipped = true;
    }

    // Panel probe readouts
    const vrmsText = `${(vin * 0.707).toFixed(2)} VRMS / ${(vin * 1000 / 10000).toFixed(1)} mA`;
    this.setProbe("pp-probe-gen", vrmsText);
    this.setProbe("pp-probe-in", vrmsText);
    this.setProbe("pp-probe-p2", `${(iPin2 * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("pp-probe-p3", `${(iPin3 * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);
    this.setProbe("pp-probe-load", `V_diff: ${vDiff.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    // 1970s Analogue VU meter needle on Circuit 6.1
    const dBuOut = 20 * Math.log10(Math.max(0.001, vDiff / 0.775));
    this.updateVuMeter("pp-vu-needle", dBuOut);

    // 1970s DMM Fluorescent LCD screen readouts
    this.setProbe("pp-dmm-vdiff", `${vDiff.toFixed(2)} V`);
    this.setProbe("pp-dmm-iload", `${(iLoad * 1000).toFixed(1)} mA`);
    const dmmStatus = document.getElementById("pp-dmm-status");
    if (dmmStatus) {
      if (shortPin3) {
        dmmStatus.textContent = isClipped ? "OVERLOAD CLIP" : "TS SHORTED";
        dmmStatus.className = "dmm-readout-value amber";
      } else {
        dmmStatus.textContent = "SYMMETRIC";
        dmmStatus.className = "dmm-readout-value";
      }
    }

    // Live SVG schematic component fader value overlays
    this.setProbe("pp-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("pp-svg-zpo", `${rout} Ω`);
    this.setProbe("pp-svg-zro", `${rout} Ω`);
    this.setProbe("pp-svg-rload", `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`);
    this.setProbe("pp-svg-probe-p2", `${(iPin2 * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("pp-svg-probe-p3", `${(iPin3 * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);

    // Dynamic Sizing & Wire Visualization in SVG:
    // If voltage is increased, signal wire gets larger in the drawing!
    const driveWire = document.getElementById("pp-svg-wire-drive");
    if (driveWire) {
      const w = 2.0 + (vin / 5.0) * 3.5;
      driveWire.setAttribute("stroke-width", w.toFixed(1));
    }
    // Load resistor rectangle scales with R_Load
    const loadRect = document.getElementById("pp-svg-rload-rect");
    if (loadRect) {
      const rw = Math.min(28, Math.max(14, 14 + (rload / 10000) * 14));
      loadRect.setAttribute("width", rw.toFixed(0));
      loadRect.setAttribute("x", (630 - rw / 2).toFixed(0));
    }

    // TS Short toggle visual feedback in SVG
    const shortGroup = document.getElementById("svg-pp-short-group");
    const shortDash = document.getElementById("pp-svg-short-dash");
    const shortText = document.getElementById("pp-svg-ts-text");
    if (shortGroup && shortDash && shortText) {
      if (shortPin3) {
        shortGroup.setAttribute("opacity", "1.0");
        shortDash.setAttribute("stroke-dasharray", "none");
        shortDash.setAttribute("stroke-width", "3.5");
        shortText.textContent = "TS Short Link: CLOSED (0 Ω to Chassis!)";
        shortText.setAttribute("fill", "#ef4444");
      } else {
        shortGroup.setAttribute("opacity", "0.65");
        shortDash.setAttribute("stroke-dasharray", "4,4");
        shortDash.setAttribute("stroke-width", "2");
        shortText.textContent = "TS Short: OPEN";
        shortText.setAttribute("fill", "#94a3b8");
      }
    }

    const statusEls = document.querySelectorAll("#pp-status, #pp-panel-status");
    statusEls.forEach(statusEl => {
      if (shortPin3) {
        statusEl.className = "badge badge-danger";
        statusEl.textContent = isClipped 
          ? "CRITICAL: Op-Amp 2 in Current Limit Clip! Massive Distortion!" 
          : "WARNING: Pin 3 Shorted to Ground (Heavy Current Draw)";
      } else {
        statusEl.className = "badge badge-success";
        statusEl.textContent = "Normal Symmetrical Balanced Operation";
      }
    });
  }

  // ==========================================
  // 6.2 Active Impedance-Balanced Output
  // ==========================================
  updateImpedanceBalanced() {
    const vinEl = document.getElementById("ib-vin") || document.getElementById("af-vin");
    if (!vinEl) return;
    const prefix = document.getElementById("ib-vin") ? "ib-" : "af-";
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById(prefix + "rout").value);
    const rload = parseFloat(document.getElementById(prefix + "rload").value);
    const shortPin3 = document.getElementById(prefix + "short-pin3").checked;

    const vinValEl = document.getElementById(prefix + "vin-val");
    if (vinValEl) vinValEl.textContent = `${vin.toFixed(1)} V`;
    const routValEl = document.getElementById(prefix + "rout-val");
    if (routValEl) routValEl.textContent = `${rout} Ω`;
    const rloadValEl = document.getElementById(prefix + "rload-val");
    if (rloadValEl) rloadValEl.textContent = `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`;

    let vPin2, vPin3 = 0, iLoad, vDiff;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = vin / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = iLoad * rout;
      vDiff = vPin2 - vPin3;
    } else {
      iLoad = vin / (rout + rload);
      vPin2 = iLoad * rload;
      vPin3 = 0;
      vDiff = vPin2;
    }

    const dBu = 20 * Math.log10(Math.max(0.001, vPin2 / 0.775));
    this.setProbe("ib-probe-drv", `${vin.toFixed(2)} V / ${(iLoad * 1000).toFixed(2)} mA`);
    this.setProbe("ib-probe-p2", `${vPin2.toFixed(2)} V / ${dBu >= 0 ? '+' : ''}${dBu.toFixed(1)} dBu`);
    this.setProbe("ib-probe-p3", shortPin3 ? "0.00 V (Direct Chassis Short)" : `0.00 V / ${rout.toFixed(1)} Ω to 0V`);
    this.setProbe("ib-probe-load", `V_diff: ${vDiff.toFixed(2)} V | 100% Hum Immunity`);

    // SVG fader overlays
    this.setProbe("ib-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("ib-svg-rpo", `${rout} Ω`);
    this.setProbe("ib-svg-rro", `${rout} Ω`);
    this.setProbe("ib-svg-rload", `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`);
    this.setProbe("ib-svg-p2-probe", `${vPin2.toFixed(2)} V / ${dBu >= 0 ? '+' : ''}${dBu.toFixed(1)} dBu`);
    this.setProbe("ib-svg-p3-probe", shortPin3 ? "0.00 V (Grounded)" : `0.00 V / ${rout} Ω to 0V`);
  }

  // ==========================================
  // 6.3 Transformer Floating
  // ==========================================
  updateTransformer() {
    const vinEl = document.getElementById("tx-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const turnsRatio = parseFloat(document.getElementById("tx-ratio").value);
    const rload = parseFloat(document.getElementById("tx-rload").value);
    const groundPin3 = document.getElementById("tx-ground-pin3").checked;

    document.getElementById("tx-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("tx-ratio-val").textContent = `1 : ${turnsRatio.toFixed(1)}`;
    document.getElementById("tx-rload-val").textContent = `${rload} Ω`;

    const vSec = vin * turnsRatio;
    const rSec = 40;
    const iLoad = vSec / (rSec + rload);
    const vLoad = iLoad * rload;

    let vPin2 = groundPin3 ? vLoad : (vLoad / 2);
    let vPin3 = groundPin3 ? 0 : (-vLoad / 2);

    this.setProbe("tx-probe-pri", `${(iLoad * turnsRatio * 1000).toFixed(1)} mA / ${vin.toFixed(1)} V`);
    this.setProbe("tx-probe-p2", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("tx-probe-p3", `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);
    this.setProbe("tx-probe-load", `V_load: ${vLoad.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    // SVG fader overlays
    this.setProbe("tx-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("tx-svg-ratio", `1 : ${turnsRatio.toFixed(1)}`);
    this.setProbe("tx-svg-rload", `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`);
    this.setProbe("tx-svg-p2-probe", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("tx-svg-p3-probe", `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);

    const statusEl = document.getElementById("tx-status");
    if (statusEl) {
      statusEl.className = "badge badge-success";
      statusEl.textContent = groundPin3 
        ? "Pin 3 Earth-Referenced: Full Voltage Preserved with Zero Distortion" 
        : "True Galvanic Floating: 100% Isolation from Earth Ground Loops";
    }
  }

  // ==========================================
  // 6.4 Double Transformer Link & Noise Injection (User Image 0)
  // ==========================================
  updateTransformerLink() {
    const vinEl = document.getElementById("txlink-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const noiseV = parseFloat(document.getElementById("txlink-noise").value);
    const rload = parseFloat(document.getElementById("txlink-rload").value);

    document.getElementById("txlink-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("txlink-noise-val").textContent = `${noiseV.toFixed(1)} V @ 44.8 kHz`;
    document.getElementById("txlink-rload-val").textContent = `${rload} Ω`;

    // Isolation calculation: Two transformers in cascade reject RF common-mode noise
    const iPri = vin / 600;
    const iSec1 = iPri * 0.95;
    const iLoad = iSec1 * 0.95;
    const vLoad = iLoad * rload;
    const residualNoise = noiseV * 0.0001; // 80 dB isolation

    this.setProbe("txlink-probe-src", `${(iPri * 1000).toFixed(1)} mA / ${vin.toFixed(1)} V`);
    this.setProbe("txlink-probe-mid", `${(iSec1 * 1000).toFixed(1)} mA / 600 Ω line`);
    this.setProbe("txlink-probe-load", `${vLoad.toFixed(2)} V audio | ${(residualNoise * 1000).toFixed(2)} mV RF noise`);

    // SVG fader overlays
    this.setProbe("txlink-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("txlink-svg-noise", `${noiseV.toFixed(1)} V`);
    this.setProbe("txlink-svg-rload", `${rload} Ω`);

    const statusEl = document.getElementById("txlink-status");
    if (statusEl) {
      statusEl.className = "badge badge-success";
      statusEl.textContent = "Double Galvanic Isolation: > 80 dB RF Noise Attenuation";
    }
  }

  // ==========================================
  // Type Z Impedance Balanced
  // ==========================================
  updateTypeZ() {
    const vinEl = document.getElementById("z-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById("z-rout").value);
    const rload = parseFloat(document.getElementById("z-rload").value);
    const shortPin3 = document.getElementById("z-short-pin3").checked;

    document.getElementById("z-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("z-rout-val").textContent = `${rout} Ω`;
    document.getElementById("z-rload-val").textContent = `${rload} Ω`;

    let vPin2, vPin3 = 0, iLoad, vDiff;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = vin / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = iLoad * rout;
      vDiff = vPin2 - vPin3;
    } else {
      iLoad = vin / (rout + rload);
      vPin2 = iLoad * rload;
      vPin3 = 0;
      vDiff = vPin2;
    }

    this.setProbe("z-probe-in", `${vin.toFixed(2)} V / 1 kHz`);
    this.setProbe("z-probe-p2", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("z-probe-p3", `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V (Passive Match)`);
    this.setProbe("z-probe-load", `V_load: ${vDiff.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    const statusEl = document.getElementById("z-status");
    if (statusEl) {
      statusEl.className = shortPin3 ? "badge badge-primary" : "badge badge-success";
      statusEl.textContent = shortPin3 ? "Unbalanced Mode: 100% Safe (Passive Resistor Absorbs Ground)" : "Balanced Mode: 100% Noise Rejection via Passive Impedance Match";
    }
  }

  // ==========================================
  // Dynamic Range Pyramid Variables
  // ==========================================
  updatePyramid() {
    const refLevelEl = document.getElementById("pyr-ref-level");
    if (!refLevelEl) return;
    const refLevel = parseFloat(refLevelEl.value);
    const clipLevel = parseFloat(document.getElementById("pyr-clip-level").value);
    const noiseFloor = parseFloat(document.getElementById("pyr-noise-floor").value);
    const mezzOffset = parseFloat(document.getElementById("pyr-mezz-offset").value);

    document.getElementById("pyr-ref-val").textContent = `${refLevel >= 0 ? "+" : ""}${refLevel} dBu`;
    document.getElementById("pyr-clip-val").textContent = `+${clipLevel} dBu`;
    document.getElementById("pyr-noise-val").textContent = `${noiseFloor} dBu`;
    document.getElementById("pyr-mezz-val").textContent = `-${mezzOffset} dB below clip`;

    const headroom = clipLevel - refLevel;
    const dynamicRange = clipLevel - noiseFloor;
    const mezzLevel = clipLevel - mezzOffset;

    this.setSvgText("pyr-svg-clip-text", `+${clipLevel} dBu Peak Clip`);
    this.setSvgText("pyr-svg-headroom-text", `${headroom.toFixed(0)} dB HEADROOM`);
    this.setSvgText("pyr-svg-ref-text", `Nominal: ${refLevel >= 0 ? "+" : ""}${refLevel} dBu (${refLevel === 4 ? "Pro Audio" : "Consumer"})`);
    this.setSvgText("pyr-svg-noise-text", `Noise Floor: ${noiseFloor} dBu (${dynamicRange.toFixed(0)} dB Dynamic Range)`);
    this.setSvgText("pyr-svg-mezz-text", `Distortion Threshold: +${mezzLevel.toFixed(1)} dBu (1% THD)`);

    const totalSpan = clipLevel - noiseFloor;
    const clipRatio = (clipLevel - mezzLevel) / Math.max(1, totalSpan);
    const mezzY = 70 + clipRatio * (440 - 70) * 1.5;

    const mezzLine = document.getElementById("pyr-svg-mezz-line");
    if (mezzLine) {
      mezzLine.setAttribute("y1", Math.min(300, Math.max(120, mezzY)));
      mezzLine.setAttribute("y2", Math.min(300, Math.max(120, mezzY)));
    }
  }

  // ==========================================
  // Deepest Dive: Jim Meyer's Thevenin 3-Impedance Model
  // ==========================================
  updateMeyerModel() {
    const vpoEl = document.getElementById("meyer-vpo");
    if (!vpoEl) return;
    const vpo = parseFloat(vpoEl.value);
    const zpo = parseFloat(document.getElementById("meyer-zpo").value);
    const zro = parseFloat(document.getElementById("meyer-zro").value);
    const cmz = parseFloat(document.getElementById("meyer-cmz").value);
    const vgvd = parseFloat(document.getElementById("meyer-vgvd").value);
    const cps = parseFloat(document.getElementById("meyer-cps").value);

    document.getElementById("meyer-vpo-val").textContent = `${vpo.toFixed(1)} V`;
    document.getElementById("meyer-zpo-val").textContent = `${zpo} Ω`;
    document.getElementById("meyer-zro-val").textContent = `${zro} Ω`;
    document.getElementById("meyer-cmz-val").textContent = `${cmz >= 1000 ? (cmz / 1000).toFixed(1) + ' kΩ' : cmz + ' Ω'}`;
    document.getElementById("meyer-vgvd-val").textContent = `${vgvd.toFixed(1)} V (Hum / Ground Offset)`;
    document.getElementById("meyer-cps-val").textContent = `${cps} pF`;

    // Calculate Thevenin impedance imbalance deltaZ = |Z_PO - Z_RO|
    const deltaZ = Math.abs(zpo - zro);
    const rinDiff = 20000; // 20k bridging input
    const rinCm = 50000;   // 50k common mode input

    // Ground loop current driven through shield / chassis bonds
    const iGnd = vgvd / (cmz + 20);
    // Differential audio signal received
    const vDiff = (2 * vpo) * (rinDiff / (rinDiff + zpo + zro));

    // Common-mode to differential conversion error:
    // V_err = V_GVD * (deltaZ / (rinCm + cmz))
    const vErr = vgvd * (deltaZ / (rinCm + cmz));
    const cmrrThevenin = (vErr > 0.000001) ? (20 * Math.log10(vpo / vErr)) : 140;

    const percentImbalance = zpo > 0 ? ((deltaZ / zpo) * 100).toFixed(2) : "0.00";
    this.setProbe("meyer-probe-deltaz", `${deltaZ.toFixed(1)} Ω (${percentImbalance}%)`);
    this.setProbe("meyer-probe-ignd", `${(iGnd * 1000).toFixed(1)} mA`);
    this.setProbe("meyer-probe-vdiff", `${vDiff.toFixed(2)} V`);

    const vErrEl = document.getElementById("meyer-probe-verror");
    if (vErrEl) {
      if (deltaZ === 0) {
        vErrEl.textContent = "0.00 mV (Infinite CMRR)";
        vErrEl.style.color = "#10b981";
      } else {
        vErrEl.textContent = `${(vErr * 1000).toFixed(2)} mV`;
        vErrEl.style.color = vErr * 1000 > 1.0 ? "#ef4444" : "#f59e0b";
      }
    }

    const cmrrEl = document.getElementById("meyer-probe-cmrr");
    if (cmrrEl) {
      if (deltaZ === 0 || cmrrThevenin >= 120) {
        cmrrEl.innerHTML = "&infin; dB";
        cmrrEl.style.color = "#10b981";
      } else {
        cmrrEl.textContent = `${(Math.round(cmrrThevenin * 10) / 10).toFixed(1)} dB`;
        cmrrEl.style.color = cmrrThevenin < 60 ? "#ef4444" : "#38bdf8";
      }
    }

    // Live SVG schematic fader overlays
    this.setProbe("meyer-svg-vpo", `${vpo.toFixed(1)} V`);
    this.setProbe("meyer-svg-zpo", `${zpo} Ω`);
    this.setProbe("meyer-svg-zro", `${zro} Ω`);
    this.setProbe("meyer-svg-cmz", `${cmz >= 1000 ? (cmz / 1000).toFixed(1) + ' kΩ' : cmz + ' Ω'}`);
    this.setProbe("meyer-svg-vgvd", `${vgvd.toFixed(1)} V`);
    this.setProbe("meyer-svg-cps", `${cps} pF`);

    const badgeEl = document.getElementById("meyer-status");
    if (badgeEl) {
      if (deltaZ === 0) {
        badgeEl.className = "badge badge-success";
        badgeEl.textContent = "Perfect Impedance Match (Infinite Thevenin CMRR)";
      } else if (cmrrThevenin >= 70) {
        badgeEl.className = "badge badge-primary";
        badgeEl.textContent = "Excellent Balanced Rejection (> 70 dB)";
      } else if (cmrrThevenin >= 50) {
        badgeEl.className = "badge badge-warning";
        badgeEl.textContent = "Degraded Immunity (Noticeable Hum Under GVD)";
      } else {
        badgeEl.className = "badge badge-danger";
        badgeEl.textContent = "Severe Ground Loop Interference!";
      }
    }
  }

  setProbe(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  setSvgText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Real-Time Animated Current Particle Loop
  startAnimationLoop() {
    const animate = () => {
      this.time += 0.04;

      document.querySelectorAll(".animated-current-flow").forEach(path => {
        const speed = parseFloat(path.getAttribute("data-flow-speed") || "1");
        const offset = (this.time * speed * 25) % 100;
        path.style.strokeDashoffset = -offset;
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }
}

// Global instance
window.circuitSim = new CircuitSimulator();
document.addEventListener("DOMContentLoaded", () => {
  window.circuitSim.init();
});
