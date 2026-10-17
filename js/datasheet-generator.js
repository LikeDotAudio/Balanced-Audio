/**
 * AES-X152 Free Data Sheet Templates & Interactive Generator
 * Normative Templates for Parts 1, 2, 3, 4
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

class AESDatasheetGenerator {
  constructor() {
    this.presets = {
      line_out: {
        title: "Professional Line Driver / DAC Output",
        part: "Part 1 & 2: Transmitter",
        topology: "6.2 Active Impedance-Balanced Output",
        nomLevel: "+4 dBu (1.228 V RMS)",
        maxLevel: "+24.0 dBu (12.28 V RMS into 10 kΩ)",
        dmzOut: "100 Ω (50 Ω Pin 2 + 50 Ω Pin 3)",
        cmzOut: "50 Ω to Chassis Ground",
        balanceTol: "0.1% (Impedance balance matching)",
        connector: "XLR-3M (AES14 Output Designation)",
        grounding: "Pin 1 direct chassis bond per AES48",
        notes: "Suitable for driving long capacitive cable runs up to 300 m with negligible HF roll-off."
      },
      mic: {
        title: "Studio Condenser Microphone",
        part: "SC-04-04 / AES-X152 Part 1",
        topology: "6.1 Transformerless Differential Output",
        nomLevel: "-40 dBu (7.75 mV RMS @ 94 dB SPL)",
        maxLevel: "+2.0 dBu (0.975 V RMS @ 138 dB SPL, 0.5% THD)",
        dmzOut: "150 Ω balanced (75 Ω / leg)",
        cmzOut: "75 Ω balanced to Pin 1",
        balanceTol: "0.05% matching across 20 Hz – 20 kHz",
        connector: "XLR-3M (AES14 Male Output)",
        grounding: "Pin 1 bonded to mic capsule metal shell (AES48)",
        notes: "Operating on standard P48 phantom power per IEC 61938 (3.5 mA current draw)."
      },
      line_in: {
        title: "Balanced Studio Line Receiver / ADC Input",
        part: "Part 3: Receiver Specification",
        topology: "Active Differential Instrumentation Receiver",
        nomLevel: "+4 dBu (1.228 V RMS)",
        maxLevel: "+26.0 dBu (15.5 V RMS before clip)",
        dmzOut: "20 kΩ Differential Bridging Input",
        cmzOut: "10 kΩ Common-Mode Input Impedance",
        balanceTol: "CMRR: 90 dB @ 60 Hz, 85 dB @ 1 kHz, 75 dB @ 20 kHz",
        connector: "XLR-3F (AES14 Female Input)",
        grounding: "Pin 1 bonded directly to equipment chassis shell",
        notes: "Resistant to +10 dBV ground potential differences without converting common-mode hum."
      },
      transformer: {
        title: "Galvanically Isolated Line Audio Transformer",
        part: "AES-X152 Part 1 & 3 Passive",
        topology: "6.3 Transformer Galvanically Floating",
        nomLevel: "+4 dBu (1.228 V RMS)",
        maxLevel: "+22 dBu @ 20 Hz, +28 dBu @ 1 kHz (Mu-metal core)",
        dmzOut: "600 Ω : 600 Ω (Turns Ratio 1:1.0)",
        cmzOut: "Infinite (> 100 MΩ DC isolation to chassis)",
        balanceTol: "CMRR: > 110 dB @ 60 Hz, > 95 dB @ 20 kHz",
        connector: "XLR-3F Input / XLR-3M Output",
        grounding: "Electrostatic Faraday shield tied to Pin 1 chassis",
        notes: "Eliminates all ground loops and DC common-mode offsets with true magnetic galvanic isolation."
      }
    };

    this.activeTab = "part1";
    this.activePresetKey = "line_out";
    this.init();
  }

  init() {
    this.bindDOM();
    this.generate();
  }

  bindDOM() {
    // Preset dropdown
    const presetEl = document.getElementById("ds-preset-select");
    if (presetEl) {
      presetEl.addEventListener("change", (e) => {
        this.activePresetKey = e.target.value;
        this.loadPresetToInputs(this.presets[this.activePresetKey]);
        this.generate();
      });
    }

    // Input changes
    const inputIds = [
      "ds-in-dev-name", "ds-in-mfg", "ds-in-topology", "ds-in-nom-level",
      "ds-in-max-level", "ds-in-dmz", "ds-in-cmz", "ds-in-cmrr", "ds-in-conn"
    ];

    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => this.generate());
      }
    });

    // Format Tab buttons (Markdown, JSON, Plain Text)
    document.querySelectorAll(".ds-format-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".ds-format-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTab = btn.dataset.format;
        this.generate();
      });
    });

    // Copy Button
    const copyBtn = document.getElementById("ds-copy-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => this.copyToClipboard());
    }

    // Download Button
    const dlBtn = document.getElementById("ds-download-btn");
    if (dlBtn) {
      dlBtn.addEventListener("click", () => this.downloadDatasheet());
    }
  }

  loadPresetToInputs(preset) {
    if (!preset) return;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal("ds-in-dev-name", preset.title);
    setVal("ds-in-topology", preset.topology);
    setVal("ds-in-nom-level", preset.nomLevel);
    setVal("ds-in-max-level", preset.maxLevel);
    setVal("ds-in-dmz", preset.dmzOut);
    setVal("ds-in-cmz", preset.cmzOut);
    setVal("ds-in-cmrr", preset.balanceTol);
    setVal("ds-in-conn", preset.connector);
  }

  getFormData() {
    const getVal = (id, fallback) => {
      const el = document.getElementById(id);
      return (el && el.value.trim()) ? el.value.trim() : fallback;
    };

    return {
      deviceName: getVal("ds-in-dev-name", "Professional Audio Device"),
      mfg: getVal("ds-in-mfg", "Audio Engineering Laboratory"),
      standard: "AES-X152 / IEC 60268-3 Compliant",
      topology: getVal("ds-in-topology", "Active Impedance-Balanced Output"),
      nomLevel: getVal("ds-in-nom-level", "+4 dBu (1.228 V RMS)"),
      maxLevel: getVal("ds-in-max-level", "+24.0 dBu (12.28 V RMS into 10 kΩ)"),
      dmz: getVal("ds-in-dmz", "100 Ω (50 Ω Pin 2 + 50 Ω Pin 3)"),
      cmz: getVal("ds-in-cmz", "50 Ω to Chassis"),
      cmrr: getVal("ds-in-cmrr", "CMRR: 85 dB @ 60 Hz, 80 dB @ 1 kHz"),
      connector: getVal("ds-in-conn", "XLR-3M (AES14 Table 1 Output)"),
      shieldRule: "Direct metal-to-metal chassis enclosure bond per AES48",
      dateGenerated: new Date().toISOString().split("T")[0]
    };
  }

  generate() {
    const data = this.getFormData();
    let outputText = "";

    if (this.activeTab === "markdown" || !this.activeTab) {
      outputText = `<!-- ========================================================
     AES-X152 STANDARDIZED PRODUCT DATA SHEET TEMPLATE
     Conforms to AES-X152 Parts 1–4 & AES48 / AES14 Standards
     ======================================================== -->

# ${data.deviceName}
**Manufacturer / Lab:** ${data.mfg}  
**Specification Standard:** ${data.standard}  
**Date of Document:** ${data.dateGenerated}  

---

## 1. General Architectural Classification (Part 1)
- **Circuit Topology:** ${data.topology}
- **Connector Type & Designation:** ${data.connector}
- **Grounding & Shield Termination:** ${data.shieldRule}
- **Nominal Operating Level:** ${data.nomLevel}
- **Maximum Output Capability ($L_{MAX}$):** ${data.maxLevel}

---

## 2. Impedance Characteristics (Part 2)
- **Differential Impedance ($DMZ$):** ${data.dmz}
- **Common-Mode Impedance ($CMZ$):** ${data.cmz}
- **Balance Matching Tolerance:** ${data.cmrr}

---

## 3. Interference Rejection & Compatibility (Part 3)
- **Common-Mode Rejection Ratio (CMRR):** ${data.cmrr}
- **Unbalanced Interconnection Rule:** Compatible with TS / RCA inputs per Richard Hess Matrix.
- **RF Immunity & Pin 1 Isolation:** 100% immune to Shield-Current-Induced Noise (SCIN).

---

## 4. Normative AES References (Part 4)
- **AES-X152:** Standard for Presenting Signal Levels & Impedances
- **AES14 / IEC 60268-12:** Circular Connectors (Male = Output, Female = Input)
- **AES26:** Conservation of Polarity (Pin 2 Positive)
- **AES48:** Connector Shield Grounding to Metal Enclosure
- **AES-X249:** D-Sub Shroud Direct Metal Bonding (if multichannel)
`;
    } else if (this.activeTab === "json") {
      const jsonObj = {
        standard: "AES-X152",
        revision: "Draft 2026",
        productSpecification: {
          productName: data.deviceName,
          manufacturer: data.mfg,
          generationDate: data.dateGenerated,
          part1_general: {
            circuitTopology: data.topology,
            connectorDesignation: data.connector,
            shieldGroundingStandard: "AES48 (Chassis Bonded)"
          },
          part2_impedances: {
            nominalOperatingLevel: data.nomLevel,
            maximumSignalLevel: data.maxLevel,
            differentialImpedance: data.dmz,
            commonModeImpedance: data.cmz
          },
          part3_interferenceRejection: {
            cmrrSpecification: data.cmrr,
            pin1Compliance: "Direct chassis metal-to-metal enclosure entry"
          },
          normativeReferences: ["AES-X152", "AES14", "AES26", "AES48", "IEC 60268-3"]
        }
      };
      outputText = JSON.stringify(jsonObj, null, 2);
    } else if (this.activeTab === "text") {
      outputText = `=============================================================
AES-X152 STANDARDIZED PRODUCT DATA SHEET SPECIFICATION
Audio Engineering Society Standards Committee SC-05-05
=============================================================
PRODUCT:          ${data.deviceName}
MANUFACTURER:     ${data.mfg}
STANDARD:         ${data.standard}
DATE:             ${data.dateGenerated}

[PART 1: ARCHITECTURE & CONNECTIONS]
- Circuit Topology:         ${data.topology}
- Connector Designation:    ${data.connector}
- Shield Termination:       ${data.shieldRule}

[PART 2: SIGNAL LEVELS & IMPEDANCES]
- Nominal Level:            ${data.nomLevel}
- Maximum Level (L_MAX):    ${data.maxLevel}
- Differential Z (DMZ):     ${data.dmz}
- Common-Mode Z (CMZ):      ${data.cmz}

[PART 3: CMRR & PERFORMANCE]
- Rejection Ratio:          ${data.cmrr}
- Polarity:                 AES26 Compliant (Pin 2 Hot / Positive)
- EMC & Grounding:          AES48 Compliant (Pin 1 to Chassis)
=============================================================`;
    }

    const codeEl = document.getElementById("ds-output-code");
    if (codeEl) codeEl.textContent = outputText;
  }

  copyToClipboard() {
    const codeEl = document.getElementById("ds-output-code");
    if (!codeEl) return;

    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      const btn = document.getElementById("ds-copy-btn");
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = "✓ Copied to Clipboard!";
        btn.style.background = "#10b981";
        btn.style.color = "#ffffff";
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = "";
          btn.style.color = "";
        }, 2200);
      }
    }).catch(err => {
      console.error("Copy failed", err);
    });
  }

  downloadDatasheet() {
    const codeEl = document.getElementById("ds-output-code");
    if (!codeEl) return;

    const ext = (this.activeTab === "json") ? "json" : (this.activeTab === "text" ? "txt" : "md");
    const mime = (this.activeTab === "json") ? "application/json" : "text/plain";
    const filename = `AES-X152_DataSheet_${this.activePresetKey}.${ext}`;

    const blob = new Blob([codeEl.textContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Instantiate on window load
document.addEventListener("DOMContentLoaded", () => {
  window.aesDatasheetGen = new AESDatasheetGenerator();
});
