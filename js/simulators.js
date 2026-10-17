/**
 * AES-X152 Interactive Engineering Simulators
 * 1. CMRR & Resistor Tolerance Simulator
 * 2. Cable Capacitance & High-Frequency Roll-off Calculator
 * 3. Interconnection Compatibility Checker ("What Works With What")
 */

// ========================================================
// 1. CMRR & Resistor Tolerance Simulator
// ========================================================
function calculateCMRR(resistorTolerancePct, deltaZs, rCommonMode) {
  // Resistor tolerance delta (worst case: two resistors +tol, two -tol => factor of 4)
  const tolRatio = resistorTolerancePct / 100.0;
  
  // Op-amp internal resistor bridge CMRR limitation:
  // CMRR_bridge approx 20 * log10( (1 + Gain) / (4 * tolRatio) ) for unity gain
  let cmrrBridgeLin = (tolRatio > 0) ? (2.0 / (4.0 * tolRatio)) : 1e6;
  
  // Source impedance unbalance effect:
  // Common mode voltage divided by common mode input impedance:
  // V_diff_error = V_cm * (deltaZs / rCommonMode)
  let cmrrSourceLin = (deltaZs > 0 && rCommonMode > 0) ? (rCommonMode / deltaZs) : 1e6;
  
  // Total CMRR is parallel combination of these limits:
  let totalCMRRLin = 1.0 / ( (1.0 / cmrrBridgeLin) + (1.0 / cmrrSourceLin) );
  let cmrrDb = 20 * Math.log10(Math.max(1, totalCMRRLin));
  
  return {
    cmrrDb: Math.round(cmrrDb * 10) / 10,
    bridgeDb: Math.round(20 * Math.log10(Math.max(1, cmrrBridgeLin)) * 10) / 10,
    sourceDb: Math.round(20 * Math.log10(Math.max(1, cmrrSourceLin)) * 10) / 10,
    leakagePct: (1.0 / totalCMRRLin) * 100
  };
}

function updateCMRRSimulator() {
  const tolSelect = document.getElementById("cmrr-tol");
  const deltaZsInput = document.getElementById("cmrr-delta-zs");
  const rCmInput = document.getElementById("cmrr-rcm");

  if (!tolSelect || !deltaZsInput || !rCmInput) return;

  const tol = parseFloat(tolSelect.value);
  const deltaZs = parseFloat(deltaZsInput.value);
  const rCm = parseFloat(rCmInput.value);

  document.getElementById("cmrr-delta-zs-val").textContent = `${deltaZs} Ω`;
  document.getElementById("cmrr-rcm-val").textContent = `${(rCm / 1000).toFixed(0)} kΩ`;

  const results = calculateCMRR(tol, deltaZs, rCm);

  const cmrrValEl = document.getElementById("cmrr-result-val");
  const cmrrRatingEl = document.getElementById("cmrr-rating");
  const cmrrBreakdownEl = document.getElementById("cmrr-breakdown");

  if (cmrrValEl) {
    cmrrValEl.textContent = `${results.cmrrDb} dB`;
  }

  if (cmrrRatingEl) {
    if (results.cmrrDb >= 80) {
      cmrrRatingEl.className = "badge badge-success";
      cmrrRatingEl.textContent = "Laboratory Grade (Outstanding Noise Immunity)";
    } else if (results.cmrrDb >= 60) {
      cmrrRatingEl.className = "badge badge-primary";
      cmrrRatingEl.textContent = "Professional Studio Grade";
    } else if (results.cmrrDb >= 40) {
      cmrrRatingEl.className = "badge badge-warning";
      cmrrRatingEl.textContent = "Fair / Moderate Immunity (Vulnerable in high EMI)";
    } else {
      cmrrRatingEl.className = "badge badge-danger";
      cmrrRatingEl.textContent = "Poor (Severe Hum & Noise Intrusion)";
    }
  }

  if (cmrrBreakdownEl) {
    cmrrBreakdownEl.innerHTML = `
      Resistor Network Limit: <strong>${results.bridgeDb} dB</strong> | 
      Source Imbalance Limit (ΔZ: ${deltaZs}Ω): <strong>${results.sourceDb} dB</strong> | 
      Noise Leakage: <strong>${results.leakagePct.toFixed(4)}%</strong>
    `;
  }

  // Draw simulated waveforms on canvas
  drawCMRRWaveforms(results.cmrrDb);
}

function drawCMRRWaveforms(cmrrDb) {
  const canvas = document.getElementById("cmrr-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // Background grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < w; x += 40) {
    ctx.moveTo(x, 0); ctx.lineTo(x, h);
  }
  for (let y = 0; y < h; y += 30) {
    ctx.moveTo(0, y); ctx.lineTo(w, y);
  }
  ctx.stroke();

  // Baseline
  const midY1 = h * 0.35;
  const midY2 = h * 0.78;

  // 1. Draw Common Mode Noise Waveform (top)
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    let t = x * 0.05;
    // 60Hz hum + 180Hz harmonic + random hash
    let y = midY1 + Math.sin(t) * 22 + Math.sin(t * 3) * 8 + Math.sin(t * 7) * 3;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Label top
  ctx.fillStyle = "#f59e0b";
  ctx.font = "11px Inter, sans-serif";
  ctx.fillText("Common-Mode Noise on Cable (Hum + RF Interference)", 12, 20);

  // 2. Draw Differential Residual Noise Output (bottom)
  // Scale residual amplitude by 10^(-cmrrDb/20)
  const attenuation = Math.pow(10, -cmrrDb / 20);
  const displayAmp = Math.min(25, 25 * attenuation * 300); // Visual amplification for visibility

  ctx.strokeStyle = (cmrrDb >= 60) ? "#10b981" : ((cmrrDb >= 40) ? "#3b82f6" : "#ef4444");
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    let t = x * 0.05;
    let baseNoise = (Math.sin(t) * 22 + Math.sin(t * 3) * 8 + Math.sin(t * 7) * 3) * (displayAmp / 25);
    let y = midY2 + baseNoise;
    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Label bottom
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fillText(`Residual Noise after Differential Subtraction (${cmrrDb} dB Rejection)`, 12, h * 0.62);
}

// ========================================================
// 2. Cable Capacitance & High-Frequency Roll-off Calculator
// ========================================================
function updateCableCalculator() {
  const zOutInput = document.getElementById("cable-zout");
  const capPerMInput = document.getElementById("cable-cap-per-m");
  const lengthInput = document.getElementById("cable-length");
  const lengthUnit = document.getElementById("cable-unit");
  const rLoadInput = document.getElementById("cable-rload");

  if (!zOutInput || !capPerMInput || !lengthInput || !rLoadInput) return;

  const zOut = parseFloat(zOutInput.value);
  const capPerM = parseFloat(capPerMInput.value);
  let length = parseFloat(lengthInput.value);
  const isFeet = lengthUnit && lengthUnit.value === "ft";
  if (isFeet) {
    length = length * 0.3048; // convert feet to meters
  }
  const rLoad = parseFloat(rLoadInput.value);

  // Update slider text displays
  document.getElementById("cable-zout-val").textContent = `${zOut} Ω`;
  document.getElementById("cable-cap-val").textContent = `${capPerM} pF/m`;
  document.getElementById("cable-length-val").textContent = isFeet ? `${(length / 0.3048).toFixed(0)} ft (${length.toFixed(1)} m)` : `${length.toFixed(0)} m`;

  // Parallel resistance R_eq = (Z_out * R_load) / (Z_out + R_load)
  const rEq = (zOut * rLoad) / (zOut + rLoad);

  // Total capacitance C_total = length * capPerM * 1e-12 Farads
  const totalCapPF = length * capPerM;
  const totalCapF = totalCapPF * 1e-12;

  // Cutoff frequency fc = 1 / (2 * pi * R_eq * C_total)
  const fcHz = 1.0 / (2.0 * Math.PI * rEq * totalCapF);
  const fcKhz = fcHz / 1000.0;

  // Attenuation at 20 kHz:
  // H(f) = 1 / sqrt(1 + (f / fc)^2)
  const fAudio = 20000;
  const h20k = 1.0 / Math.sqrt(1.0 + Math.pow(fAudio / fcHz, 2));
  const loss20kDb = 20 * Math.log10(h20k); // negative dB
  const phaseDeg = -Math.atan(fAudio / fcHz) * (180 / Math.PI);

  // Update UI Elements
  document.getElementById("cable-total-cap").textContent = totalCapPF >= 1000 ? `${(totalCapPF / 1000).toFixed(2)} nF (${totalCapPF.toFixed(0)} pF)` : `${totalCapPF.toFixed(0)} pF`;
  document.getElementById("cable-fc").textContent = fcKhz >= 1000 ? `${(fcKhz / 1000).toFixed(2)} MHz` : `${fcKhz.toFixed(1)} kHz`;
  document.getElementById("cable-loss-20k").textContent = `${loss20kDb.toFixed(2)} dB`;
  document.getElementById("cable-phase").textContent = `${phaseDeg.toFixed(1)}°`;

  const badgeEl = document.getElementById("cable-badge");
  if (badgeEl) {
    if (Math.abs(loss20kDb) < 0.1) {
      badgeEl.className = "badge badge-success";
      badgeEl.textContent = "Transparent Transmission (< 0.1 dB loss at 20 kHz)";
    } else if (Math.abs(loss20kDb) < 0.5) {
      badgeEl.className = "badge badge-primary";
      badgeEl.textContent = "Audibly Flat (< 0.5 dB loss at 20 kHz)";
    } else if (Math.abs(loss20kDb) < 1.0) {
      badgeEl.className = "badge badge-warning";
      badgeEl.textContent = "Mild Treble Attenuation (Noticeable in mastering)";
    } else {
      badgeEl.className = "badge badge-danger";
      badgeEl.textContent = "Severe High-Frequency Loss (> 1 dB loss at 20 kHz)";
    }
  }
}

// ========================================================
// 3. Interconnection Compatibility Checker ("What Works with What")
// ========================================================
const COMPATIBILITY_RULES = {
  // Source: Transformer Floating
  "tx-xfmr": {
    "rx-xfmr": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB (Unity)",
      cmrr: "Maximum (> 100 dB)",
      groundRisk: "Virtually Zero (Double Galvanic Isolation)",
      wiring: "Standard XLR / TRS (Pin 2 to 2, Pin 3 to 3, Pin 1 shield grounded at chassis).",
      notes: "The gold standard of immunity. True galvanic isolation on both source and receiver eliminates ground hum loops entirely."
    },
    "rx-ina": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB (Unity)",
      cmrr: "Very High (> 85 dB)",
      groundRisk: "Low (Source is floating)",
      wiring: "Standard balanced cable. Pin 1 connects to chassis.",
      notes: "Instrumentation input handles wide common-mode voltage swings gracefully. Floating transformer source prevents hum."
    },
    "rx-simple": {
      grade: "GOOD",
      badgeClass: "badge-primary",
      levelShift: "0 dB (Unity)",
      cmrr: "High (approx 65-75 dB)",
      groundRisk: "Low",
      wiring: "Standard balanced cable.",
      notes: "Floating source prevents the single op-amp's inherent input impedance asymmetry from degrading common-mode rejection."
    },
    "rx-unbal": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB (No level loss)",
      cmrr: "None (Unbalanced input cannot reject common mode)",
      groundRisk: "Low",
      wiring: "Pin 2 to RCA/TS Tip; Tie Pin 3 to Pin 1/Sleeve at the destination.",
      notes: "Because the transformer winding is floating, grounding Pin 3 simply references the winding to the receiver's ground with ZERO signal loss or distortion."
    }
  },

  // Source: Cross-Coupled Active Floating (Servo-Balanced)
  "tx-servo": {
    "rx-xfmr": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB",
      cmrr: "High (> 80 dB)",
      groundRisk: "Low",
      wiring: "Standard balanced connection (Pin 2 to 2, Pin 3 to 3, Pin 1 to chassis).",
      notes: "Clean active line driver with wide dynamic range into high-CMRR transformer input."
    },
    "rx-ina": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB",
      cmrr: "High (> 80 dB)",
      groundRisk: "Low to Moderate (requires proper AES48 grounding)",
      wiring: "Standard balanced connection.",
      notes: "Industry standard modern pro audio pairing. Exceptional bandwidth, ultra-low THD."
    },
    "rx-simple": {
      grade: "GOOD",
      badgeClass: "badge-primary",
      levelShift: "0 dB",
      cmrr: "Moderate (~60 dB)",
      groundRisk: "Moderate",
      wiring: "Standard balanced connection.",
      notes: "Functional and widely deployed, though simple op-amp impedance asymmetry can slightly limit CMRR."
    },
    "rx-unbal": {
      grade: "GOOD (Requires Careful Wiring)",
      badgeClass: "badge-warning",
      levelShift: "0 dB (Maintains full voltage swing)",
      cmrr: "None (Unbalanced input)",
      groundRisk: "Moderate",
      wiring: "Pin 2 to Tip; MUST CONNECT Pin 3 to Sleeve/Ground at the unbalanced plug! Do NOT leave Pin 3 floating.",
      notes: "Servo cross-coupling senses the short on Pin 3 and automatically boosts Pin 2 by +6 dB to maintain full output voltage. If Pin 3 is left floating, feedback loop is broken, resulting in distortion and instability!"
    }
  },

  // Source: Electronic Push-Pull (Ground Referenced Dual Op-Amp)
  "tx-pushpull": {
    "rx-xfmr": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB",
      cmrr: "High (> 85 dB)",
      groundRisk: "Low",
      wiring: "Standard balanced connection.",
      notes: "Transformer receiver provides isolation and isolates push-pull drivers from external ground discrepancies."
    },
    "rx-ina": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB",
      cmrr: "High (> 80 dB)",
      groundRisk: "Low (if AES48 chassis bonding is observed)",
      wiring: "Standard balanced connection.",
      notes: "Huge output voltage capability (+28 dBu headroom). Clean differential transmission."
    },
    "rx-simple": {
      grade: "GOOD",
      badgeClass: "badge-primary",
      levelShift: "0 dB",
      cmrr: "Moderate (55-65 dB)",
      groundRisk: "Moderate",
      wiring: "Standard balanced connection.",
      notes: "Works reliably in standard studio interconnects."
    },
    "rx-unbal": {
      grade: "CAUTION (Risk of Op-Amp Short Circuit)",
      badgeClass: "badge-danger",
      levelShift: "-6 dB (Half voltage)",
      cmrr: "None",
      groundRisk: "High",
      wiring: "Pin 2 to Tip; Pin 1 to Sleeve. DO NOT CONNECT PIN 3 TO GROUND! Leave Pin 3 FLOATING / UNCONNECTED.",
      notes: "DANGER: Pin 3 is driven by an active inverting op-amp. If you short Pin 3 to ground (standard TS cable behavior), you short the op-amp output directly into ground, causing heavy distortion, high current draw, and potential thermal failure!"
    }
  },

  // Source: Impedance Balanced
  "tx-impbal": {
    "rx-xfmr": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB",
      cmrr: "Maximum (> 90 dB)",
      groundRisk: "Low",
      wiring: "Standard balanced connection.",
      notes: "Matches the differential receiver bridge perfectly. Identical common-mode noise rejection to dual-driven lines."
    },
    "rx-ina": {
      grade: "EXCELLENT",
      badgeClass: "badge-success",
      levelShift: "0 dB",
      cmrr: "High (> 80 dB)",
      groundRisk: "Low",
      wiring: "Standard balanced connection.",
      notes: "Full CMRR benefit at a fraction of power consumption and component cost."
    },
    "rx-simple": {
      grade: "GOOD",
      badgeClass: "badge-primary",
      levelShift: "0 dB",
      cmrr: "Moderate (~60 dB)",
      groundRisk: "Moderate",
      wiring: "Standard balanced connection.",
      notes: "Reliable operation. The passive matching resistor on Pin 3 guarantees balanced impedances."
    },
    "rx-unbal": {
      grade: "GOOD (Clean, but 6 dB Level Drop)",
      badgeClass: "badge-primary",
      levelShift: "-6 dB (Half voltage signal)",
      cmrr: "None",
      groundRisk: "Low",
      wiring: "Pin 2 to Tip; Pin 1 & Pin 3 to Sleeve. Safe to ground Pin 3.",
      notes: "Completely safe to ground Pin 3 because Pin 3 is driven through a passive resistor, not an active amplifier. Because only Pin 2 carried signal, you receive -6 dB compared to differential mode."
    }
  },

  // Source: Unbalanced Output (RCA / TS)
  "tx-unbal": {
    "rx-xfmr": {
      grade: "GOOD (Galvanic Isolation Benefit)",
      badgeClass: "badge-primary",
      levelShift: "0 dB",
      cmrr: "Moderate (~50 dB)",
      groundRisk: "Low",
      wiring: "RCA center pin to Pin 2; RCA shell to Pin 3. Cable shield connected to Pin 1 at receiver only.",
      notes: "Using a transformer input to receive an unbalanced source breaks the ground loop completely and yields a pseudo-balanced run."
    },
    "rx-ina": {
      grade: "FAIR",
      badgeClass: "badge-warning",
      levelShift: "0 dB",
      cmrr: "Moderate (Depends on source impedance matching)",
      groundRisk: "Moderate",
      wiring: "RCA center to Pin 2; RCA ground to Pin 3; Shield tied to chassis Pin 1 at receiver.",
      notes: "Differential receiver subtracts ground noise between source and destination if connected as pseudo-balanced."
    },
    "rx-simple": {
      grade: "POOR / CAUTION",
      badgeClass: "badge-danger",
      levelShift: "0 dB",
      cmrr: "Poor (CMRR ruined by unbalanced source impedance)",
      groundRisk: "High",
      wiring: "Standard adapter cable.",
      notes: "The unequal input impedances of the simple difference amp severely degrade CMRR when driving source impedance is asymmetric."
    },
    "rx-unbal": {
      grade: "POOR (Unbalanced to Unbalanced)",
      badgeClass: "badge-danger",
      levelShift: "0 dB",
      cmrr: "0 dB (No Common-Mode Rejection)",
      groundRisk: "Severe (Direct common-impedance ground loop path)",
      wiring: "Standard 2-conductor unbalanced cable (TS or RCA).",
      notes: "No noise cancellation. Ground currents flow directly through the audio signal return shield, inducing 60Hz/120Hz hum and computer buzz directly into the audio path."
    }
  }
};

function updateCompatibilityChecker() {
  const txSelect = document.getElementById("compat-tx");
  const rxSelect = document.getElementById("compat-rx");

  if (!txSelect || !rxSelect) return;

  const tx = txSelect.value;
  const rx = rxSelect.value;

  const rule = COMPATIBILITY_RULES[tx] && COMPATIBILITY_RULES[tx][rx];
  if (!rule) return;

  const gradeBadge = document.getElementById("compat-grade");
  const levelShiftEl = document.getElementById("compat-level-shift");
  const cmrrEl = document.getElementById("compat-cmrr");
  const groundRiskEl = document.getElementById("compat-ground-risk");
  const wiringEl = document.getElementById("compat-wiring");
  const notesEl = document.getElementById("compat-notes");

  if (gradeBadge) {
    gradeBadge.className = `badge ${rule.badgeClass}`;
    gradeBadge.textContent = rule.grade;
  }
  if (levelShiftEl) levelShiftEl.textContent = rule.levelShift;
  if (cmrrEl) cmrrEl.textContent = rule.cmrr;
  if (groundRiskEl) groundRiskEl.textContent = rule.groundRisk;
  if (wiringEl) wiringEl.textContent = rule.wiring;
  if (notesEl) notesEl.textContent = rule.notes;
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  // CMRR Simulator listeners
  const cmrrTol = document.getElementById("cmrr-tol");
  const cmrrDeltaZs = document.getElementById("cmrr-delta-zs");
  const cmrrRcm = document.getElementById("cmrr-rcm");

  if (cmrrTol) cmrrTol.addEventListener("change", updateCMRRSimulator);
  if (cmrrDeltaZs) cmrrDeltaZs.addEventListener("input", updateCMRRSimulator);
  if (cmrrRcm) cmrrRcm.addEventListener("input", updateCMRRSimulator);

  // Cable Calculator listeners
  const cableZout = document.getElementById("cable-zout");
  const cableCapPerM = document.getElementById("cable-cap-per-m");
  const cableLength = document.getElementById("cable-length");
  const cableUnit = document.getElementById("cable-unit");
  const cableRload = document.getElementById("cable-rload");

  if (cableZout) cableZout.addEventListener("input", updateCableCalculator);
  if (cableCapPerM) cableCapPerM.addEventListener("input", updateCableCalculator);
  if (cableLength) cableLength.addEventListener("input", updateCableCalculator);
  if (cableUnit) cableUnit.addEventListener("change", updateCableCalculator);
  if (cableRload) cableRload.addEventListener("change", updateCableCalculator);

  // Preset buttons for cable
  document.querySelectorAll("[data-cable-preset]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const type = e.target.getAttribute("data-cable-preset");
      if (type === "mic-std") {
        cableCapPerM.value = 85;
      } else if (type === "starquad") {
        cableCapPerM.value = 150;
      } else if (type === "cat6") {
        cableCapPerM.value = 50;
      }
      updateCableCalculator();
    });
  });

  // Compatibility Checker listeners
  const compatTx = document.getElementById("compat-tx");
  const compatRx = document.getElementById("compat-rx");
  if (compatTx) compatTx.addEventListener("change", updateCompatibilityChecker);
  if (compatRx) compatRx.addEventListener("change", updateCompatibilityChecker);

  // Initial runs
  updateCMRRSimulator();
  updateCableCalculator();
  updateCompatibilityChecker();
});
