/**
 * Top-Level Engineering Definitions - Micro Interactive Math Demos & Illustrations
 * SC-05-05 Balanced Audio Reference
 */

document.addEventListener("DOMContentLoaded", () => {
  initDefinitionSimulators();
});

function initDefinitionSimulators() {
  // 1. Balanced Interconnection (IEC 60268-3)
  const z1Slider = document.getElementById("def-z1");
  const z2Slider = document.getElementById("def-z2");
  if (z1Slider && z2Slider) {
    z1Slider.addEventListener("input", updateBalanceSim);
    z2Slider.addEventListener("input", updateBalanceSim);
    updateBalanceSim();
  }

  // 2. Common-Mode Voltage (V_CM)
  const vcmVp = document.getElementById("def-vcm-vp");
  const vcmVn = document.getElementById("def-vcm-vn");
  if (vcmVp && vcmVn) {
    vcmVp.addEventListener("input", updateVcmSim);
    vcmVn.addEventListener("input", updateVcmSim);
    
    document.querySelectorAll("[data-vcm-preset]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const mode = e.currentTarget.getAttribute("data-vcm-preset");
        if (mode === "pushpull") {
          vcmVp.value = 1.0;
          vcmVn.value = -1.0;
        } else if (mode === "single") {
          vcmVp.value = 1.0;
          vcmVn.value = 0.0;
        } else if (mode === "hum") {
          vcmVp.value = 4.0;
          vcmVn.value = 4.0;
        }
        updateVcmSim();
      });
    });
    updateVcmSim();
  }

  // 3. Differential-Mode Voltage (V_DM)
  const vdmVp = document.getElementById("def-vdm-vp");
  const vdmVn = document.getElementById("def-vdm-vn");
  if (vdmVp && vdmVn) {
    vdmVp.addEventListener("input", updateVdmSim);
    vdmVn.addEventListener("input", updateVdmSim);
    updateVdmSim();
  }

  // 4. Common-Mode Rejection Ratio (CMRR)
  const cmrrGain = document.getElementById("def-cmrr-gain");
  const cmrrVin = document.getElementById("def-cmrr-vin");
  if (cmrrGain && cmrrVin) {
    cmrrGain.addEventListener("input", updateCmrrSim);
    cmrrVin.addEventListener("input", updateCmrrSim);
    updateCmrrSim();
  }

  // 5. Shield-Current-Induced Noise (SCIN)
  const scinIsh = document.getElementById("def-scin-ishield");
  const scinType = document.getElementById("def-scin-type");
  const scinLen = document.getElementById("def-scin-len");
  if (scinIsh && scinType && scinLen) {
    scinIsh.addEventListener("input", updateScinSim);
    scinType.addEventListener("change", updateScinSim);
    scinLen.addEventListener("input", updateScinSim);
    updateScinSim();
  }

  // 6. Ground Voltage Difference (V_GVD)
  const vgvdIn = document.getElementById("def-vgvd-ineutral");
  const vgvdRg = document.getElementById("def-vgvd-rearth");
  if (vgvdIn && vgvdRg) {
    vgvdIn.addEventListener("input", updateVgvdSim);
    vgvdRg.addEventListener("input", updateVgvdSim);
    updateVgvdSim();
  }
}

// ========================================================
// 1. Balance Sim (IEC 60268-3)
// ========================================================
function updateBalanceSim() {
  const z1 = parseFloat(document.getElementById("def-z1").value);
  const z2 = parseFloat(document.getElementById("def-z2").value);

  document.getElementById("def-z1-val").textContent = `${z1.toFixed(1)} Ω`;
  document.getElementById("def-z2-val").textContent = `${z2.toFixed(1)} Ω`;

  const deltaZ = Math.abs(z1 - z2);
  const percent = z1 > 0 ? (deltaZ / z1) * 100 : 0;
  
  // With 20k bridging common-mode input:
  const cmrrLimit = deltaZ < 0.001 ? 140 : 20 * Math.log10(20000 / deltaZ);

  const deltaEl = document.getElementById("def-balance-delta-val");
  if (deltaEl) deltaEl.textContent = `${deltaZ.toFixed(2)} Ω (${percent.toFixed(2)}%)`;

  const cmrrEl = document.getElementById("def-balance-cmrr-val");
  if (cmrrEl) {
    cmrrEl.textContent = deltaZ < 0.001 ? "∞ dB" : `${Math.min(120, Math.round(cmrrLimit * 10) / 10).toFixed(1)} dB`;
  }

  const badgeEl = document.getElementById("def-balance-badge");
  if (badgeEl) {
    if (deltaZ < 0.05) {
      badgeEl.className = "micro-badge micro-badge-success";
      badgeEl.textContent = "IEC Compliant (Perfect Balance)";
    } else if (deltaZ <= 0.5) {
      badgeEl.className = "micro-badge micro-badge-info";
      badgeEl.textContent = "Acceptable (< 1% Drift)";
    } else {
      badgeEl.className = "micro-badge micro-badge-danger";
      badgeEl.textContent = "Severe Imbalance (Hum Vulnerable)";
    }
  }

  // Update SVG labels
  const svgZ1 = document.getElementById("def-svg-z1-text");
  const svgZ2 = document.getElementById("def-svg-z2-text");
  const svgBalText = document.getElementById("def-svg-balance-text");
  const svgBalPill = document.getElementById("def-svg-balance-pill");

  if (svgZ1) svgZ1.textContent = `${z1.toFixed(1)} Ω`;
  if (svgZ2) svgZ2.textContent = `${z2.toFixed(1)} Ω`;
  if (svgBalText) {
    svgBalText.textContent = deltaZ < 0.05 ? "ΔZ = 0.0 Ω (100% Balanced)" : `ΔZ = ${deltaZ.toFixed(2)} Ω (Imbalance)`;
    svgBalText.setAttribute("fill", deltaZ < 0.05 ? "#10b981" : (deltaZ <= 0.5 ? "#f59e0b" : "#ef4444"));
  }
  if (svgBalPill) {
    svgBalPill.setAttribute("stroke", deltaZ < 0.05 ? "#10b981" : (deltaZ <= 0.5 ? "#f59e0b" : "#ef4444"));
    svgBalPill.setAttribute("fill", deltaZ < 0.05 ? "rgba(16, 185, 129, 0.15)" : (deltaZ <= 0.5 ? "rgba(245, 158, 11, 0.15)" : "rgba(239, 68, 68, 0.15)"));
  }
}

// ========================================================
// 2. Common-Mode Voltage (V_CM)
// ========================================================
function updateVcmSim() {
  const vp = parseFloat(document.getElementById("def-vcm-vp").value);
  const vn = parseFloat(document.getElementById("def-vcm-vn").value);

  document.getElementById("def-vcm-vp-val").textContent = `${vp >= 0 ? '+' : ''}${vp.toFixed(2)} V`;
  document.getElementById("def-vcm-vn-val").textContent = `${vn >= 0 ? '+' : ''}${vn.toFixed(2)} V`;

  const vcm = (vp + vn) / 2.0;
  const outEl = document.getElementById("def-vcm-out-val");
  if (outEl) outEl.textContent = `${vcm >= 0 ? '+' : ''}${vcm.toFixed(3)} V`;

  const badgeEl = document.getElementById("def-vcm-badge");
  if (badgeEl) {
    if (Math.abs(vcm) < 0.01) {
      badgeEl.className = "micro-badge micro-badge-success";
      badgeEl.textContent = "V_CM = 0V (Pure Symmetrical Audio)";
    } else if (Math.abs(vp - vn) < 0.05) {
      badgeEl.className = "micro-badge micro-badge-warning";
      badgeEl.textContent = "Pure Common-Mode Hum (In-Phase)";
    } else {
      badgeEl.className = "micro-badge micro-badge-info";
      badgeEl.textContent = "Mixed Audio + CM Hum Offset";
    }
  }

  // Update SVG
  const svgVp = document.getElementById("def-svg-vp-bar-text");
  const svgVn = document.getElementById("def-svg-vn-bar-text");
  const svgVcmText = document.getElementById("def-svg-vcm-text");
  const svgDot = document.getElementById("def-svg-vcm-dot");

  if (svgVp) svgVp.textContent = `${vp >= 0 ? '+' : ''}${vp.toFixed(1)}V`;
  if (svgVn) svgVn.textContent = `${vn >= 0 ? '+' : ''}${vn.toFixed(1)}V`;
  if (svgVcmText) svgVcmText.textContent = `= ${vcm >= 0 ? '+' : ''}${vcm.toFixed(2)} V`;

  if (svgDot) {
    // Map -5V to +5V onto y range 70 to 20
    const clamped = Math.max(-5, Math.min(5, vcm));
    const cy = 45 - (clamped / 5.0) * 25;
    svgDot.setAttribute("cy", cy);
  }
}

// ========================================================
// 3. Differential-Mode Voltage (V_DM)
// ========================================================
function updateVdmSim() {
  const vp = parseFloat(document.getElementById("def-vdm-vp").value);
  const vn = parseFloat(document.getElementById("def-vdm-vn").value);

  document.getElementById("def-vdm-vp-val").textContent = `${vp >= 0 ? '+' : ''}${vp.toFixed(2)} V`;
  document.getElementById("def-vdm-vn-val").textContent = `${vn >= 0 ? '+' : ''}${vn.toFixed(2)} V`;

  const vdm = vp - vn;
  const outEl = document.getElementById("def-vdm-out-val");
  if (outEl) outEl.textContent = `${vdm >= 0 ? '+' : ''}${vdm.toFixed(3)} Vpk`;

  const vrms = Math.abs(vdm) / Math.SQRT2;
  const dbu = vrms > 0.0001 ? 20 * Math.log10(vrms / 0.775) : -99.9;

  const dbuEl = document.getElementById("def-vdm-dbu-val");
  if (dbuEl) {
    dbuEl.textContent = `${vrms.toFixed(2)} VRMS (${dbu >= 0 ? '+' : ''}${dbu.toFixed(1)} dBu)`;
  }

  const badgeEl = document.getElementById("def-vdm-badge");
  if (badgeEl) {
    if (Math.abs(vdm) < 0.01) {
      badgeEl.className = "micro-badge micro-badge-danger";
      badgeEl.textContent = "Zero Differential Audio (Canceled)";
    } else if (dbu >= 3.5 && dbu <= 4.5) {
      badgeEl.className = "micro-badge micro-badge-success";
      badgeEl.textContent = "+4 dBu Professional Line Reference";
    } else {
      badgeEl.className = "micro-badge micro-badge-info";
      badgeEl.textContent = "Active Differential Audio Signal";
    }
  }

  // Update SVG
  const svgVdm = document.getElementById("def-svg-vdm-text");
  if (svgVdm) svgVdm.textContent = `V_DM = ${vdm >= 0 ? '+' : ''}${vdm.toFixed(2)} V`;
}

// ========================================================
// 4. Common-Mode Rejection Ratio (CMRR)
// ========================================================
function updateCmrrSim() {
  const cmGainDb = parseFloat(document.getElementById("def-cmrr-gain").value); // e.g. -80 dB
  const vin = parseFloat(document.getElementById("def-cmrr-vin").value); // e.g. 5.0 V

  const cmrrDb = Math.abs(cmGainDb);
  document.getElementById("def-cmrr-gain-val").textContent = `${cmGainDb} dB (CMRR: ${cmrrDb} dB)`;
  document.getElementById("def-cmrr-vin-val").textContent = `${vin.toFixed(1)} V Hum`;

  const linearGain = Math.pow(10, cmGainDb / 20); // 10^(-80/20) = 0.0001
  const vOutMv = vin * linearGain * 1000; // in mV

  const outEl = document.getElementById("def-cmrr-out-val");
  if (outEl) outEl.textContent = `${cmrrDb.toFixed(0)} dB`;

  const voltEl = document.getElementById("def-cmrr-volt-out");
  if (voltEl) {
    voltEl.textContent = `${vOutMv < 0.01 ? (vOutMv * 1000).toFixed(1) + ' µV' : vOutMv.toFixed(2) + ' mV'} Hum Leakage`;
  }

  const badgeEl = document.getElementById("def-cmrr-badge");
  if (badgeEl) {
    if (cmrrDb >= 90) {
      badgeEl.className = "micro-badge micro-badge-success";
      badgeEl.textContent = "High-End Precision Grade (>90 dB)";
    } else if (cmrrDb >= 60) {
      badgeEl.className = "micro-badge micro-badge-info";
      badgeEl.textContent = "Standard Professional CMRR";
    } else {
      badgeEl.className = "micro-badge micro-badge-danger";
      badgeEl.textContent = "Vulnerable to Ground Buzz (<60 dB)";
    }
  }

  // Update SVG
  const svgText = document.getElementById("def-svg-cmrr-text");
  if (svgText) {
    svgText.textContent = `${cmrrDb.toFixed(0)} dB (Noise: ${vOutMv < 0.01 ? (vOutMv * 1000).toFixed(0) + ' µV' : vOutMv.toFixed(1) + ' mV'})`;
  }
}

// ========================================================
// 5. Shield-Current-Induced Noise (SCIN)
// ========================================================
function updateScinSim() {
  const ishield = parseFloat(document.getElementById("def-scin-ishield").value);
  const typeVal = parseFloat(document.getElementById("def-scin-type").value);
  const lengthM = parseFloat(document.getElementById("def-scin-len").value);

  document.getElementById("def-scin-ishield-val").textContent = `${ishield.toFixed(2)} A`;
  document.getElementById("def-scin-len-val").textContent = `${lengthM} m`;

  // V_scin = I_shield * (Mt in ohm/m) * length
  const vScinV = ishield * (typeVal / 1000.0) * lengthM;
  const vScinMv = vScinV * 1000.0;
  const dbu = vScinV > 0.00001 ? 20 * Math.log10(vScinV / 0.775) : -120;

  const outEl = document.getElementById("def-scin-out-val");
  if (outEl) {
    outEl.textContent = `${vScinMv < 1 ? (vScinMv * 1000).toFixed(1) + ' µV' : vScinMv.toFixed(2) + ' mV'}`;
  }

  const dbuEl = document.getElementById("def-scin-dbu-val");
  if (dbuEl) dbuEl.textContent = `${dbu >= 0 ? '+' : ''}${dbu.toFixed(1)} dBu Noise Floor`;

  const badgeEl = document.getElementById("def-scin-badge");
  if (badgeEl) {
    if (vScinMv < 1.0) {
      badgeEl.className = "micro-badge micro-badge-success";
      badgeEl.textContent = "Imperceptible SCIN (< 1 mV)";
    } else if (vScinMv < 20.0) {
      badgeEl.className = "micro-badge micro-badge-warning";
      badgeEl.textContent = "Audible Ground Buzz";
    } else {
      badgeEl.className = "micro-badge micro-badge-danger";
      badgeEl.textContent = "Severe SCIN Contamination!";
    }
  }

  // Update SVG
  const svgText = document.getElementById("def-svg-scin-text");
  if (svgText) {
    svgText.textContent = `V_SCIN: ${vScinMv.toFixed(1)} mV (${dbu.toFixed(1)} dBu)`;
  }
}

// ========================================================
// 6. Ground Voltage Difference (V_GVD)
// ========================================================
function updateVgvdSim() {
  const iNeutral = parseFloat(document.getElementById("def-vgvd-ineutral").value);
  const rEarth = parseFloat(document.getElementById("def-vgvd-rearth").value);

  document.getElementById("def-vgvd-ineutral-val").textContent = `${iNeutral.toFixed(1)} A`;
  document.getElementById("def-vgvd-rearth-val").textContent = `${rEarth.toFixed(2)} Ω`;

  const vgvd = iNeutral * rEarth;
  const rShield = 0.5; // Typical 20m cable shield resistance
  const iShield = vgvd / rShield;

  const outEl = document.getElementById("def-vgvd-out-val");
  if (outEl) outEl.textContent = `${vgvd.toFixed(2)} V AC Hum`;

  const ishieldEl = document.getElementById("def-vgvd-ishield-val");
  if (ishieldEl) ishieldEl.textContent = `${(iShield * 1000).toFixed(0)} mA shield current`;

  const badgeEl = document.getElementById("def-vgvd-badge");
  if (badgeEl) {
    if (vgvd < 0.1) {
      badgeEl.className = "micro-badge micro-badge-success";
      badgeEl.textContent = "Low Offset (< 100 mV)";
    } else if (vgvd < 0.5) {
      badgeEl.className = "micro-badge micro-badge-warning";
      badgeEl.textContent = "Moderate Ground Potential Delta";
    } else {
      badgeEl.className = "micro-badge micro-badge-danger";
      badgeEl.textContent = "Severe Ground Loop Hazard!";
    }
  }

  // Update SVG
  const svgText = document.getElementById("def-svg-vgvd-text");
  if (svgText) {
    svgText.textContent = `V_GVD: ${vgvd.toFixed(2)} V AC | I_shield: ${(iShield * 1000).toFixed(0)} mA`;
  }
}
