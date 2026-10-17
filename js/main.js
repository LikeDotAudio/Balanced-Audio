/**
 * AES-X152 Main UI & Interactions
 */

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("x152-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  if (themeToggle) {
    themeToggle.textContent = savedTheme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("x152-theme", next);
      themeToggle.textContent = next === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
      
      // Re-render canvas in simulator with updated colors
      if (typeof updateCMRRSimulator === "function") {
        updateCMRRSimulator();
      }
    });
  }
}

// Datasheet Template Switcher
const DATASHEET_PRESETS = {
  micpre: {
    title: "Example 1: Studio Microphone Preamplifier",
    subtitle: "High-Performance Instrumentation Front-End with P48 Phantom",
    part2: [
      { param: "Input Configuration", val: "Active Balanced Differential (Instrumentation Amp)" },
      { param: "Input Impedance (Differential)", val: "2,400 Ω @ 1 kHz" },
      { param: "Input Impedance (Common Mode)", val: "10,000 Ω @ 1 kHz" },
      { param: "Output Configuration", val: "Cross-Coupled Active Floating (Servo-Balanced)" },
      { param: "Output Impedance", val: "50 Ω (balanced), 25 Ω (unbalanced)" },
      { param: "Minimum Load Impedance", val: "600 Ω" },
      { param: "AES48 Compliance", val: "YES (Pin 1 bonded directly to chassis enclosure)" },
      { param: "Circuit Protection", val: "DC blocking, transient suppressors to +60 V" }
    ],
    part3: [
      { param: "Nominal Operating Level", val: "+4 dBu (1.228 VRMS)" },
      { param: "Maximum Input Level", val: "+24 dBu @ minimum gain (1% THD)" },
      { param: "Maximum Output Level", val: "+27 dBu into 600 Ω" },
      { param: "Gain Range", val: "+10 dB to +65 dB continuously variable" },
      { param: "Frequency Response", val: "10 Hz – 80 kHz (+0 / -0.3 dB re 1 kHz)" },
      { param: "Phantom Power Supply", val: "IEC 61938 P48 (48 V ± 2 V, 10 mA max, 0.1% resistor match)" },
      { param: "Channel Crosstalk", val: "-105 dB @ 1 kHz (+4 dBu), -90 dB @ 20 kHz" }
    ],
    part4: [
      { param: "THD+N (Unity Gain)", val: "0.0004% (1 kHz, +4 dBu, 22 kHz BW)" },
      { param: "THD+N (40 dB Gain)", val: "0.0025% (20 Hz – 20 kHz, +4 dBu out)" },
      { param: "Equivalent Input Noise (EIN)", val: "-129.5 dBu (150 Ω source, 22 kHz unweighted)" },
      { param: "Signal-to-Noise Ratio (SNR)", val: "118 dB referenced to +24 dBu clip" },
      { param: "CMRR @ 60 Hz", val: "92 dB (IEC 60268-3 with 10 Ω source imbalance)" },
      { param: "CMRR @ 1 kHz / 20 kHz", val: "88 dB @ 1 kHz, 72 dB @ 20 kHz" },
      { param: "Intermodulation Distortion", val: "0.0008% SMPTE (60 Hz / 7 kHz, 4:1)" }
    ]
  },
  linedriver: {
    title: "Example 2: Precision Mastering DAC / Line Driver",
    subtitle: "Low-Impedance Balanced Driver with Transformer Isolation Option",
    part2: [
      { param: "Output Configuration", val: "Transformer Floating Output (Nickel Core)" },
      { param: "Output Source Impedance", val: "40 Ω balanced (matched to 0.05%)" },
      { param: "Balance Symmetry (IEC 60268-3)", val: "> 85 dB balance factor up to 20 kHz" },
      { param: "Minimum Load Impedance", val: "300 Ω" },
      { param: "Maximum Cable Capacitance Drive", val: "10,000 pF (approx. 100 meters standard STP)" },
      { param: "AES48 Compliance", val: "YES (XLR shell and Pin 1 bonded to chassis ground)" },
      { param: "DC / RF Protection", val: "Transformer galvanic block + 100 pF RF feedthrough caps" }
    ],
    part3: [
      { param: "Reference Operating Level", val: "+4 dBu (+24 dBu full-scale 0 dBFS)" },
      { param: "Maximum Output Level", val: "+26 dBu into 600 Ω (1% THD @ 20 Hz)" },
      { param: "Output Headroom", val: "20 dB above nominal pro line level" },
      { param: "Frequency Response", val: "5 Hz – 96 kHz (+0 / -0.2 dB)" },
      { param: "Maximum Drive Current", val: "120 mA RMS before slew limiting" },
      { param: "Channel Separation", val: "-118 dB @ 1 kHz, -102 dB @ 20 kHz" }
    ],
    part4: [
      { param: "THD @ 1 kHz (+4 dBu)", val: "0.00025% (2nd through 5th harmonics measured)" },
      { param: "THD @ 20 Hz (+20 dBu)", val: "0.012% (transformer magnetic core saturation limit)" },
      { param: "Dynamic Range", val: "126 dB A-weighted" },
      { param: "Residual Output Noise", val: "-102 dBu (22 Hz – 22 kHz flat)" },
      { param: "Common Mode Output Rejection", val: "95 dB isolation from chassis ground currents" }
    ]
  },
  dibox: {
    title: "Example 3: Passive Direct Box (DI)",
    subtitle: "High-Impedance Unbalanced to Low-Impedance Balanced Interface",
    part2: [
      { param: "Input Configuration", val: "Unbalanced High-Z Bridging (1/4\" TS Jack)" },
      { param: "Input Impedance", val: "140 kΩ @ 1 kHz (into 1 kΩ mic preamp load)" },
      { param: "Output Configuration", val: "Mu-metal shielded transformer balanced floating" },
      { param: "Output Impedance", val: "150 Ω nominal" },
      { param: "Ground Lift Switch", val: "Disconnects XLR Pin 1 from input chassis/shield" },
      { param: "AES48 Compliance", val: "YES (Chassis bonded, RF filter cap when lifted)" }
    ],
    part3: [
      { param: "Nominal Input Level", val: "-10 dBV to +4 dBu (switchable -20 dB pad)" },
      { param: "Maximum Input Level", val: "+22 dBu (-20 dB pad engaged, 1% THD @ 30 Hz)" },
      { param: "Insertion Loss", val: "-21.5 dB nominal (step-down ratio 12:1)" },
      { param: "Frequency Response", val: "20 Hz – 40 kHz (±0.5 dB into 1 kΩ load)" }
    ],
    part4: [
      { param: "THD @ 1 kHz (+4 dBu input)", val: "0.005%" },
      { param: "THD @ 30 Hz (+4 dBu input)", val: "0.05% (core saturation harmonic profile)" },
      { param: "Common Mode Rejection Ratio", val: "> 105 dB @ 60 Hz, > 85 dB @ 10 kHz" },
      { param: "Magnetic Shielding", val: "Mu-metal can providing > 30 dB hum field rejection" }
    ]
  }
};

function renderDatasheet(presetKey) {
  const data = DATASHEET_PRESETS[presetKey];
  if (!data) return;

  const titleEl = document.getElementById("datasheet-title");
  const subtitleEl = document.getElementById("datasheet-subtitle");
  const tablePart2 = document.getElementById("datasheet-table-part2");
  const tablePart3 = document.getElementById("datasheet-table-part3");
  const tablePart4 = document.getElementById("datasheet-table-part4");

  if (titleEl) titleEl.textContent = data.title;
  if (subtitleEl) subtitleEl.textContent = data.subtitle;

  function buildRows(items) {
    return items.map(item => `
      <tr>
        <td class="param-name"><strong>${item.param}</strong></td>
        <td class="param-val">${item.val}</td>
      </tr>
    `).join("");
  }

  if (tablePart2) tablePart2.innerHTML = buildRows(data.part2);
  if (tablePart3) tablePart3.innerHTML = buildRows(data.part3);
  if (tablePart4) tablePart4.innerHTML = buildRows(data.part4);
}

// Image Modal Viewer
function initImageModal() {
  const modal = document.getElementById("image-modal");
  const openBtn = document.getElementById("open-circuit-modal");
  const closeBtn = document.getElementById("close-circuit-modal");

  if (!modal) return;

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// Deep Dive smooth jump
function initDeepDiveLinks() {
  document.querySelectorAll("[data-scroll-to]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-scroll-to");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initImageModal();
  initDeepDiveLinks();

  // Datasheet buttons
  document.querySelectorAll("[data-datasheet-preset]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll("[data-datasheet-preset]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-datasheet-preset");
      renderDatasheet(key);
    });
  });

  // Initial render of default datasheet
  renderDatasheet("micpre");
});
