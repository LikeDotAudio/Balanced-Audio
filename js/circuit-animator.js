/**
 * AES-X152 Interactive Animated Circuit Simulator
 * High-fidelity animated SVG circuit engine with dynamic variables,
 * live voltage-colored conductors, animated current flow particles,
 * and real-time Falstad-style probe readouts.
 */

class CircuitSimulator {
  constructor() {
    this.animationFrame = null;
    this.time = 0;
    this.circuits = {};
    this.activeCircuit = "pushpull";
  }

  init() {
    this.setupListeners();
    this.startAnimationLoop();
  }

  setupListeners() {
    // 6.1 Ground Referenced Controls
    const ppVin = document.getElementById("pp-vin");
    const ppRout = document.getElementById("pp-rout");
    const ppRload = document.getElementById("pp-rload");
    const ppShortPin3 = document.getElementById("pp-short-pin3");

    [ppVin, ppRout, ppRload, ppShortPin3].forEach(el => {
      if (el) el.addEventListener("input", () => this.updatePushPull());
    });

    // 6.2 Active Floating Controls
    const afVin = document.getElementById("af-vin");
    const afRout = document.getElementById("af-rout");
    const afRload = document.getElementById("af-rload");
    const afShortPin3 = document.getElementById("af-short-pin3");

    [afVin, afRout, afRload, afShortPin3].forEach(el => {
      if (el) el.addEventListener("input", () => this.updateActiveFloating());
    });

    // 6.3 Transformer Floating Controls
    const txVin = document.getElementById("tx-vin");
    const txRatio = document.getElementById("tx-ratio");
    const txRload = document.getElementById("tx-rload");
    const txGroundPin3 = document.getElementById("tx-ground-pin3");

    [txVin, txRatio, txRload, txGroundPin3].forEach(el => {
      if (el) el.addEventListener("input", () => this.updateTransformer());
    });

    // Type Z Impedance Balanced Controls
    const zVin = document.getElementById("z-vin");
    const zRout = document.getElementById("z-rout");
    const zRload = document.getElementById("z-rload");
    const zShortPin3 = document.getElementById("z-short-pin3");

    [zVin, zRout, zRload, zShortPin3].forEach(el => {
      if (el) el.addEventListener("input", () => this.updateTypeZ());
    });

    // Dynamic Range Pyramid Controls
    const pyrRef = document.getElementById("pyr-ref-level");
    const pyrClip = document.getElementById("pyr-clip-level");
    const pyrNoise = document.getElementById("pyr-noise-floor");
    const pyrMezz = document.getElementById("pyr-mezz-offset");

    [pyrRef, pyrClip, pyrNoise, pyrMezz].forEach(el => {
      if (el) el.addEventListener("input", () => this.updatePyramid());
    });

    // Initial updates
    this.updatePushPull();
    this.updateActiveFloating();
    this.updateTransformer();
    this.updateTypeZ();
    this.updatePyramid();
  }

  // ==========================================
  // 6.1 Ground Referenced Push-Pull
  // ==========================================
  updatePushPull() {
    const vin = parseFloat(document.getElementById("pp-vin").value);
    const rout = parseFloat(document.getElementById("pp-rout").value);
    const rload = parseFloat(document.getElementById("pp-rload").value);
    const shortPin3 = document.getElementById("pp-short-pin3").checked;

    document.getElementById("pp-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("pp-rout-val").textContent = `${rout} Ω`;
    document.getElementById("pp-rload-val").textContent = `${rload} Ω`;

    let vPin2, vPin3, iPin2, iPin3, vDiff, iLoad, isClipped = false;

    if (!shortPin3) {
      // Normal balanced operation into R_load
      // Each opamp sees R_out + R_load / 2
      const rTotal = 2 * rout + rload;
      iLoad = (2 * vin) / rTotal; // Differential current
      vPin2 = vin - iLoad * rout;
      vPin3 = -(vin - iLoad * rout);
      iPin2 = iLoad;
      iPin3 = iLoad;
      vDiff = vPin2 - vPin3;
    } else {
      // Pin 3 shorted to Ground (0V) directly!
      // Inverting op-amp output is shorted through its R_out to ground:
      const iShort = vin / Math.max(1, rout); // High current!
      iPin3 = iShort;
      vPin3 = 0; // Grounded contact

      // Pin 2 now drives R_out + R_load to ground
      iLoad = vin / (rout + rload);
      vPin2 = vin - iLoad * rout;
      iPin2 = iLoad;
      vDiff = vPin2;

      if (iShort > 0.05) { // Op-amp current limiting threshold (50 mA)
        isClipped = true;
      }
    }

    // Update Probes
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

    this.circuits["pushpull"] = { vPin2, vPin3, iLoad, iPin3, shortPin3 };
  }

  // ==========================================
  // 6.2 Active Floating (Cross-Coupled Servo)
  // ==========================================
  updateActiveFloating() {
    const vin = parseFloat(document.getElementById("af-vin").value);
    const rout = parseFloat(document.getElementById("af-rout").value);
    const rload = parseFloat(document.getElementById("af-rload").value);
    const shortPin3 = document.getElementById("af-short-pin3").checked;

    document.getElementById("af-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("af-rout-val").textContent = `${rout} Ω`;
    document.getElementById("af-rload-val").textContent = `${rload} Ω`;

    let vPin2, vPin3, iLoad, vDiff;

    if (!shortPin3) {
      // Normal balanced drive
      const rTotal = 2 * rout + rload;
      iLoad = (2 * vin) / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = -(vin - iLoad * rout);
      vDiff = vPin2 - vPin3;
    } else {
      // Servo Action: Grounding Pin 3 increases Pin 2 voltage by +6 dB (factor of 2)
      // Maintains identical differential voltage across load!
      vPin3 = 0;
      const effectiveDrive = 2 * vin; // Double gain on Pin 2
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
      if (shortPin3) {
        statusEl.className = "badge badge-success";
        statusEl.textContent = "Servo Active: Pin 2 Doubled (+6 dB). Zero Level Loss!";
      } else {
        statusEl.className = "badge badge-primary";
        statusEl.textContent = "Floating Active Balanced Mode";
      }
    }

    this.circuits["servo"] = { vPin2, vPin3, iLoad, shortPin3 };
  }

  // ==========================================
  // 6.3 Transformer Floating
  // ==========================================
  updateTransformer() {
    const vin = parseFloat(document.getElementById("tx-vin").value);
    const turnsRatio = parseFloat(document.getElementById("tx-ratio").value);
    const rload = parseFloat(document.getElementById("tx-rload").value);
    const groundPin3 = document.getElementById("tx-ground-pin3").checked;

    document.getElementById("tx-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("tx-ratio-val").textContent = `1 : ${turnsRatio.toFixed(1)}`;
    document.getElementById("tx-rload-val").textContent = `${rload} Ω`;

    const vSec = vin * turnsRatio;
    const rSec = 40; // Secondary winding DCR
    const iLoad = vSec / (rSec + rload);
    const vLoad = iLoad * rload;

    let vPin2, vPin3;
    if (!groundPin3) {
      // Symmetrical floating relative to chassis
      vPin2 = vLoad / 2;
      vPin3 = -vLoad / 2;
    } else {
      // Pin 3 referenced to ground
      vPin3 = 0;
      vPin2 = vLoad;
    }

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

    this.circuits["transformer"] = { vPin2, vPin3, iLoad, groundPin3 };
  }

  // ==========================================
  // Type Z Impedance Balanced
  // ==========================================
  updateTypeZ() {
    const vin = parseFloat(document.getElementById("z-vin").value);
    const rout = parseFloat(document.getElementById("z-rout").value);
    const rload = parseFloat(document.getElementById("z-rload").value);
    const shortPin3 = document.getElementById("z-short-pin3").checked;

    document.getElementById("z-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("z-rout-val").textContent = `${rout} Ω`;
    document.getElementById("z-rload-val").textContent = `${rload} Ω`;

    let vPin2, vPin3 = 0, iLoad, vDiff;

    if (!shortPin3) {
      // Differential load across Pin 2 and Pin 3:
      // Loop: Op-Amp Vin -> R_out (Pin 2) -> R_load -> R_match (Pin 3) -> Ground
      const rTotal = 2 * rout + rload;
      iLoad = vin / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = iLoad * rout; // Voltage developed across passive leg!
      vDiff = vPin2 - vPin3; // vDiff = iLoad * rload
    } else {
      // Pin 3 tied to ground directly:
      // Passive resistor R_match is bypassed.
      // Loop: Op-Amp Vin -> R_out -> R_load -> Ground
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
      if (shortPin3) {
        statusEl.className = "badge badge-primary";
        statusEl.textContent = "Unbalanced Mode: 100% Safe (Passive Resistor Absorbs Ground)";
      } else {
        statusEl.className = "badge badge-success";
        statusEl.textContent = "Balanced Mode: 100% Noise Rejection via Passive Impedance Match";
      }
    }

    this.circuits["impbal"] = { vPin2, vPin3, iLoad, shortPin3 };
  }

  // ==========================================
  // Audio Dynamic Range Pyramid Variables
  // ==========================================
  updatePyramid() {
    const refLevel = parseFloat(document.getElementById("pyr-ref-level").value);
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

    // Update text elements on the Pyramid SVG
    this.setSvgText("pyr-svg-clip-text", `+${clipLevel} dBu Peak Clip`);
    this.setSvgText("pyr-svg-headroom-text", `${headroom.toFixed(0)} dB HEADROOM`);
    this.setSvgText("pyr-svg-ref-text", `Nominal: ${refLevel >= 0 ? "+" : ""}${refLevel} dBu (${refLevel === 4 ? "Pro Audio" : "Consumer"})`);
    this.setSvgText("pyr-svg-noise-text", `Noise Floor: ${noiseFloor} dBu (${dynamicRange.toFixed(0)} dB Dynamic Range)`);
    this.setSvgText("pyr-svg-mezz-text", `Distortion Threshold: +${mezzLevel.toFixed(1)} dBu (1% THD)`);

    // Dynamically adjust Mezzanine line Y position in SVG:
    // Apex = y:70 (clipLevel), Base = y:440 (noiseFloor)
    const totalSpan = clipLevel - noiseFloor;
    const clipRatio = (clipLevel - mezzLevel) / totalSpan;
    const mezzY = 70 + clipRatio * (440 - 70) * 1.5; // Scaled for visual proportion

    const mezzLine = document.getElementById("pyr-svg-mezz-line");
    if (mezzLine) {
      mezzLine.setAttribute("y1", Math.min(300, Math.max(120, mezzY)));
      mezzLine.setAttribute("y2", Math.min(300, Math.max(120, mezzY)));
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

  // ==========================================
  // Real-Time Animated Current Particle Loop
  // ==========================================
  startAnimationLoop() {
    const animate = () => {
      this.time += 0.04;
      const phase = this.time;

      // Animate current flow particles in active SVG circuits
      document.querySelectorAll(".animated-current-flow").forEach(path => {
        // Dash offset animation creates moving particle flow
        const speed = parseFloat(path.getAttribute("data-flow-speed") || "1");
        const offset = (this.time * speed * 25) % 100;
        path.style.strokeDashoffset = -offset;
      });

      // Animate pulsating conductors according to voltage sign
      const sinWave = Math.sin(phase * 4);
      document.querySelectorAll(".dynamic-voltage-wire").forEach(wire => {
        const baseColor = sinWave > 0 ? "#10b981" : "#ef4444";
        wire.style.stroke = baseColor;
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
