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

    // 6.2 Active Floating Controls
    this.bindInputs(["af-vin", "af-rout", "af-rload", "af-short-pin3"], () => this.updateActiveFloating());

    // 6.3 Transformer Floating Controls
    this.bindInputs(["tx-vin", "tx-ratio", "tx-rload", "tx-ground-pin3"], () => this.updateTransformer());

    // 6.4 Double Transformer Link & Noise Injection Controls (User Image 0)
    this.bindInputs(["txlink-vin", "txlink-noise", "txlink-rload"], () => this.updateTransformerLink());

    // Type Z Impedance Balanced Controls
    this.bindInputs(["z-vin", "z-rout", "z-rload", "z-short-pin3"], () => this.updateTypeZ());

    // Dynamic Range Pyramid Controls
    this.bindInputs(["pyr-ref-level", "pyr-clip-level", "pyr-noise-floor", "pyr-mezz-offset"], () => this.updatePyramid());

    // Deepest Dive: Jim Meyer Thevenin Model Controls
    this.bindInputs(["meyer-vpo", "meyer-zpo", "meyer-zro", "meyer-cmz", "meyer-vgvd", "meyer-cps"], () => this.updateMeyerModel());

    // Initial calculations
    this.updatePushPull();
    this.updateActiveFloating();
    this.updateTransformer();
    this.updateTransformerLink();
    this.updateTypeZ();
    this.updatePyramid();
    this.updateMeyerModel();
  }

  bindInputs(ids, callback) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", callback);
    });
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
    document.getElementById("pp-rload-val").textContent = `${rload} Ω`;

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

    this.setProbe("pp-probe-in", `${(vin * 0.707).toFixed(2)} VRMS / ${(vin * 1000 / 10000).toFixed(1)} mA`);
    this.setProbe("pp-probe-p2", `${(iPin2 * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("pp-probe-p3", `${(iPin3 * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);
    this.setProbe("pp-probe-load", `V_diff: ${vDiff.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    const statusEl = document.getElementById("pp-status");
    if (statusEl) {
      if (shortPin3) {
        statusEl.className = "badge badge-danger";
        statusEl.textContent = isClipped 
          ? "CRITICAL: Op-Amp 2 in Current Limit Clip! Massive Distortion!" 
          : "WARNING: Pin 3 Shorted to Ground (Heavy Current Draw)";
      } else {
        statusEl.className = "badge badge-success";
        statusEl.textContent = "Normal Symmetrical Balanced Operation";
      }
    }
  }

  // ==========================================
  // 6.2 Active Floating (Cross-Coupled Servo)
  // ==========================================
  updateActiveFloating() {
    const vinEl = document.getElementById("af-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById("af-rout").value);
    const rload = parseFloat(document.getElementById("af-rload").value);
    const shortPin3 = document.getElementById("af-short-pin3").checked;

    document.getElementById("af-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("af-rout-val").textContent = `${rout} Ω`;
    document.getElementById("af-rload-val").textContent = `${rload} Ω`;

    let vPin2, vPin3, iLoad, vDiff;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = (2 * vin) / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = -(vin - iLoad * rout);
      vDiff = vPin2 - vPin3;
    } else {
      vPin3 = 0;
      const effectiveDrive = 2 * vin;
      iLoad = effectiveDrive / (rout + rload);
      vPin2 = effectiveDrive - iLoad * rout;
      vDiff = vPin2;
    }

    this.setProbe("af-probe-in", `${vin.toFixed(2)} V / 1 kHz`);
    this.setProbe("af-probe-p2", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("af-probe-p3", shortPin3 ? "0.0 mA / 0.00 V (Grounded)" : `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);
    this.setProbe("af-probe-load", `V_load: ${vDiff.toFixed(2)} V (${(20 * Math.log10(Math.max(0.001, vDiff / (2 * vin)) * 2)).toFixed(1)} dB re balanced)`);

    const statusEl = document.getElementById("af-status");
    if (statusEl) {
      statusEl.className = shortPin3 ? "badge badge-success" : "badge badge-primary";
      statusEl.textContent = shortPin3 ? "Servo Active: Pin 2 Doubled (+6 dB). Zero Level Loss!" : "Floating Active Balanced Mode";
    }
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
    document.getElementById("meyer-cmz-val").textContent = `${(cmz / 1000).toFixed(1)} kΩ`;
    document.getElementById("meyer-vgvd-val").textContent = `${vgvd.toFixed(1)} V (Hum / Ground Offset)`;
    document.getElementById("meyer-cps-val").textContent = `${cps} pF`;

    // Calculate Thevenin impedance imbalance deltaZ = |Z_PO - Z_RO|
    const deltaZ = Math.abs(zpo - zro);
    const rinDiff = 20000; // 20k bridging input
    const rinCm = 50000;   // 50k common mode input

    // Common-mode to differential conversion error:
    // V_err = V_GVD * (deltaZ / (rinCm + cmz))
    const vErr = vgvd * (deltaZ / (rinCm + cmz));
    const cmrrThevenin = (vErr > 0) ? (20 * Math.log10(vpo / vErr)) : 120;

    this.setProbe("meyer-probe-deltaz", `ΔZ: ${deltaZ} Ω (${((deltaZ / zpo) * 100).toFixed(1)}% Imbalance)`);
    this.setProbe("meyer-probe-verr", `V_error: ${(vErr * 1000).toFixed(3)} mV`);
    this.setProbe("meyer-probe-cmrr", `Thevenin CMRR: ${Math.min(120, Math.round(cmrrThevenin * 10) / 10)} dB`);

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
