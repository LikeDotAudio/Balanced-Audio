/**
 * AES-X152 Free Data Sheet Templates & Interactive Live Builder
 * Normative Templates for Parts 1, 2, 3, 4
 * Conforms to AES-X152, AES48, AES14, AES59, AES72
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

class AESDatasheetGenerator {
  constructor() {
    this.presets = {
      blank: {
        title: "[ENTER PRODUCT / MODEL NAME]",
        mfg: "[ENTER MANUFACTURER / LAB NAME]",
        part: "AES-X152 Normative Specification Template",
        topology: "[SELECT: 6.1 Transless Diff | 6.2 Active Imp-Balanced | 6.3 Transformer Floating]",
        nomLevel: "[e.g. +4 dBu (1.228 V RMS) / -10 dBV (0.316 V RMS)]",
        maxLevel: "[e.g. +24.0 dBu into 10 kΩ load before clipping]",
        dmzOut: "[e.g. 100 Ω Differential Output Impedance (50 Ω / leg)]",
        cmzOut: "[e.g. 50 Ω Common-Mode Impedance to Chassis Ground]",
        balanceTol: "[e.g. 0.1% matching / CMRR > 85 dB @ 60 Hz]",
        connector: "[e.g. XLR-3M (AES14) / DB25 (AES59) / RJ45 (AES72-4E) / 1/4″ TRS]",
        grounding: "[AES48 Direct metal-to-metal chassis enclosure bond at connector entry]",
        notes: "[Enter device application notes, temperature ratings, powering specifications]"
      },
      line_out: {
        title: "Model 100-PRO Differential Line Driver",
        mfg: "Audio Research Laboratories",
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
        title: "Studio Condenser Microphone Capsule",
        mfg: "Acoustic Transducer Labs",
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
        title: "Precision Balanced Line Receiver",
        mfg: "Signal Processing Systems",
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
        title: "Galvanically Isolated Audio Transformer",
        mfg: "Mu-Metal Magnetics Lab",
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
      },
      db25_aes59: {
        title: "8-Channel Analog / AES3 Multichannel Interface",
        mfg: "Pro Multichannel Systems",
        part: "AES59 & AES-X249 Standard",
        topology: "Multichannel Active Balanced Driver / Receiver Array",
        nomLevel: "+4 dBu (1.228 V RMS) Analog / 0 dBFS Digital",
        maxLevel: "+24.0 dBu analog / 110 Ω AES3 digital",
        dmzOut: "100 Ω analog (110 Ω digital)",
        cmzOut: "50 Ω per channel to chassis",
        balanceTol: "CMRR: > 85 dB across all 8 channels",
        connector: "DB25 Female (AES59 Tascam standard pinout)",
        grounding: "AES-X249: Metal shroud & jack screws 360° bonded to chassis",
        notes: "Breaks out into two AES72-4E RJ45 trunks or eight discrete XLR-3 connections."
      },
      qtp_aes72: {
        title: "4-Channel Quad Twisted Pair Stage Extender",
        mfg: "Category Audio Interfaces",
        part: "AES72-4E QTP Standard",
        topology: "4-Channel Shielded Twisted Pair Transmission",
        nomLevel: "+4 dBu analog / AES3 digital / DMX512",
        maxLevel: "+24 dBu analog across Cat 5e/6/7 STP cable",
        dmzOut: "100 Ω nominal transmission impedance",
        cmzOut: "Low-impedance overall foil/braid shield connection",
        balanceTol: "Near-End Crosstalk (NEXT) < -90 dB @ 20 kHz",
        connector: "Shielded 8P8C (RJ45 with conductive metal collar)",
        grounding: "RJ45 shield collar directly bonded to chassis per AES48",
        notes: "Breaks out into 4 individual XLR-3 or 4 individual 1/4″ TRS connectors."
      }
    };

    this.activeTab = "markdown";
    this.previewMode = "rendered"; // "rendered" or "code"
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
        this.triggerBuildingIndicator();
        this.generate();
      });
    }

    // Load Blank Template quick button
    const loadBlankBtn = document.getElementById("ds-load-blank-btn");
    if (loadBlankBtn) {
      loadBlankBtn.addEventListener("click", () => {
        if (presetEl) presetEl.value = "blank";
        this.activePresetKey = "blank";
        this.loadPresetToInputs(this.presets.blank);
        this.triggerBuildingIndicator();
        this.generate();
      });
    }

    // Input changes (Real-Time Live Building!)
    const inputIds = [
      "ds-in-dev-name", "ds-in-mfg", "ds-in-topology", "ds-in-nom-level",
      "ds-in-max-level", "ds-in-dmz", "ds-in-cmz", "ds-in-cmrr", "ds-in-conn"
    ];

    inputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("input", () => {
          this.triggerBuildingIndicator();
          this.generate();
        });
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

    // Preview Mode toggle (Rendered View vs Raw Code)
    document.querySelectorAll(".ds-view-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".ds-view-tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.previewMode = btn.dataset.view;
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

    // Download Blank Button
    const dlBlankBtn = document.getElementById("ds-download-blank-btn");
    if (dlBlankBtn) {
      dlBlankBtn.addEventListener("click", () => this.downloadBlankTemplate());
    }
  }

  triggerBuildingIndicator() {
    const pulseEl = document.getElementById("ds-building-pulse");
    if (pulseEl) {
      pulseEl.style.opacity = "1";
      pulseEl.textContent = "● BUILDING LIVE TEMPLATE...";
      pulseEl.style.color = "#38bdf8";

      clearTimeout(this.pulseTimeout);
      this.pulseTimeout = setTimeout(() => {
        pulseEl.textContent = "✓ TEMPLATE READY";
        pulseEl.style.color = "#10b981";
      }, 400);
    }
  }

  loadPresetToInputs(preset) {
    if (!preset) return;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };

    setVal("ds-in-dev-name", preset.title);
    if (preset.mfg) setVal("ds-in-mfg", preset.mfg);
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
      deviceName: getVal("ds-in-dev-name", "[Enter Product Name]"),
      mfg: getVal("ds-in-mfg", "[Enter Manufacturer / Lab]"),
      standard: "AES-X152 / IEC 60268-3 Compliant",
      topology: getVal("ds-in-topology", "[Enter Circuit Topology]"),
      nomLevel: getVal("ds-in-nom-level", "[Enter Nominal Level]"),
      maxLevel: getVal("ds-in-max-level", "[Enter Maximum Level]"),
      dmz: getVal("ds-in-dmz", "[Enter DMZ]"),
      cmz: getVal("ds-in-cmz", "[Enter CMZ]"),
      cmrr: getVal("ds-in-cmrr", "[Enter Balance / CMRR]"),
      connector: getVal("ds-in-conn", "[Enter Connector Standard]"),
      shieldRule: "Direct metal-to-metal chassis enclosure bond per AES48",
      dateGenerated: new Date().toISOString().split("T")[0]
    };
  }

  generate() {
    const data = this.getFormData();
    const renderedContainer = document.getElementById("ds-rendered-view");
    const codeContainer = document.getElementById("ds-output-code");

    // Build raw text formats
    let mdText = `<!-- ========================================================
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
- **Maximum Output Capability (L_MAX):** ${data.maxLevel}

---

## 2. Impedance Characteristics (Part 2)
- **Differential Impedance (DMZ):** ${data.dmz}
- **Common-Mode Impedance (CMZ):** ${data.cmz}
- **Balance Matching Tolerance:** ${data.cmrr}

---

## 3. Interference Rejection & Compatibility (Part 3)
- **Common-Mode Rejection Ratio (CMRR):** ${data.cmrr}
- **Unbalanced Interconnection Rule:** Compatible with TS / RCA inputs per Richard Hess Matrix.
- **RF Immunity & Pin 1 Isolation:** 100% immune to Shield-Current-Induced Noise (SCIN).

---

## 4. Normative AES References (Part 4)
- **AES-X152:** Standard Method of Presenting Levels, Topologies & Circuit Impedances
- **AES48:** Interconnections & Pin 1 Direct Chassis Enclosure Bonding
- **AES14 / AES59 / AES72:** Connector Pin Allocations & Mating Face Conventions
- **AES26:** Polarity Conservation (Pin 2 Hot / Positive Acoustic Pressure)
`;

    let jsonText = JSON.stringify({
      aes_x152_specification: {
        document_version: "AES-X152-2026",
        product_identification: {
          device_name: data.deviceName,
          manufacturer: data.mfg,
          publication_date: data.dateGenerated
        },
        part_1_architecture: {
          topology: data.topology,
          connector: data.connector,
          grounding_compliance: "AES48 Direct Chassis Bond",
          nominal_level: data.nomLevel,
          maximum_level: data.maxLevel
        },
        part_2_impedance: {
          differential_impedance_dmz: data.dmz,
          common_mode_impedance_cmz: data.cmz,
          balance_tolerance: data.cmrr
        },
        part_3_interference: {
          cmrr: data.cmrr,
          scin_immunity: "Compliant with AES48 Pin 1"
        },
        part_4_standards: [
          "AES-X152", "AES48", "AES14", "AES26", "AES59", "AES72-4E"
        ]
      }
    }, null, 2);

    let plainText = `============================================================
AES-X152 STANDARDIZED PRODUCT DATA SHEET SPECIFICATION
============================================================
Device:               ${data.deviceName}
Manufacturer:         ${data.mfg}
Standard:             ${data.standard}
Date:                 ${data.dateGenerated}

[PART 1: ARCHITECTURAL SPECIFICATION]
Circuit Topology:     ${data.topology}
Connector Type:       ${data.connector}
Grounding Rule:       ${data.shieldRule}
Nominal Level:        ${data.nomLevel}
Max Output Level:     ${data.maxLevel}

[PART 2: IMPEDANCE CHARACTERISTICS]
Differential (DMZ):   ${data.dmz}
Common-Mode (CMZ):    ${data.cmz}
Balance Matching:     ${data.cmrr}

[PART 3: INTERFERENCE & COMPATIBILITY]
CMRR:                 ${data.cmrr}
Grounding:            AES48 Direct Chassis Bond (No Pin 1 Problem)

[PART 4: HARMONIZED STANDARDS]
Standards:            AES-X152, AES48, AES14, AES26, AES59, AES72
============================================================
`;

    this.currentCodeText = (this.activeTab === "json") ? jsonText : ((this.activeTab === "text") ? plainText : mdText);

    // Render Raw Code View
    if (codeContainer) {
      codeContainer.textContent = this.currentCodeText;
    }

    // Render Live Document Preview
    if (renderedContainer) {
      renderedContainer.innerHTML = `
        <div style="background: rgba(15, 23, 42, 0.6); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 1rem;">
            <div>
              <span class="badge badge-accent" style="margin-bottom: 0.35rem; display: inline-block;">AES-X152 DATA SHEET</span>
              <h2 style="margin: 0; color: var(--text-primary); font-size: 1.35rem;">${data.deviceName}</h2>
              <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">
                <strong>${data.mfg}</strong> &bull; ${data.standard} &bull; ${data.dateGenerated}
              </div>
            </div>
            <span class="badge badge-success" style="font-size: 0.75rem;">AES48 COMPLIANT</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <!-- Part 1 -->
            <div style="background: rgba(30, 41, 59, 0.4); padding: 0.85rem; border-radius: 6px;">
              <strong style="color: var(--accent-cyan); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.4rem;">
                Part 1: Topology &amp; Operating Levels
              </strong>
              <div style="font-size: 0.82rem; line-height: 1.6; color: var(--text-secondary);">
                <div>&bull; <strong>Topology:</strong> <span style="color: var(--text-primary);">${data.topology}</span></div>
                <div>&bull; <strong>Connector:</strong> <span style="color: var(--text-primary);">${data.connector}</span></div>
                <div>&bull; <strong>Nominal Level:</strong> <span style="color: var(--accent-cyan);">${data.nomLevel}</span></div>
                <div>&bull; <strong>Maximum Level:</strong> <span style="color: #f59e0b;">${data.maxLevel}</span></div>
              </div>
            </div>

            <!-- Part 2 -->
            <div style="background: rgba(30, 41, 59, 0.4); padding: 0.85rem; border-radius: 6px;">
              <strong style="color: var(--accent-emerald); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.4rem;">
                Part 2: Impedance Parameters
              </strong>
              <div style="font-size: 0.82rem; line-height: 1.6; color: var(--text-secondary);">
                <div>&bull; <strong>Differential (DMZ):</strong> <span style="color: var(--accent-emerald);">${data.dmz}</span></div>
                <div>&bull; <strong>Common-Mode (CMZ):</strong> <span style="color: var(--accent-emerald);">${data.cmz}</span></div>
                <div>&bull; <strong>Balance / CMRR:</strong> <span style="color: var(--text-primary);">${data.cmrr}</span></div>
                <div>&bull; <strong>Grounding:</strong> <span style="color: #34d399;">${data.shieldRule}</span></div>
              </div>
            </div>
          </div>

          <!-- Part 3 & 4 Callout -->
          <div style="padding: 0.75rem 1rem; background: rgba(56, 189, 248, 0.08); border-left: 3px solid var(--accent-cyan); border-radius: 4px; font-size: 0.82rem; color: var(--text-secondary);">
            <strong>AES Standards Harmony (Parts 3 &amp; 4):</strong> Complies with <strong>AES48</strong> Pin 1 chassis shield bonding (zero RF/hum ingress), <strong>AES14 / AES59 / AES72</strong> connector designations, and <strong>AES26</strong> acoustic polarity conservation.
          </div>
        </div>
      `;
    }

    // Toggle View modes
    if (this.previewMode === "rendered") {
      if (renderedContainer) renderedContainer.style.display = "block";
      if (codeContainer) codeContainer.style.display = "none";
    } else {
      if (renderedContainer) renderedContainer.style.display = "none";
      if (codeContainer) codeContainer.style.display = "block";
    }
  }

  copyToClipboard() {
    if (!this.currentCodeText) return;
    navigator.clipboard.writeText(this.currentCodeText).then(() => {
      const copyBtn = document.getElementById("ds-copy-btn");
      if (copyBtn) {
        const orig = copyBtn.textContent;
        copyBtn.textContent = "✓ Copied!";
        copyBtn.style.borderColor = "#10b981";
        copyBtn.style.color = "#10b981";
        setTimeout(() => {
          copyBtn.textContent = orig;
          copyBtn.style.borderColor = "";
          copyBtn.style.color = "";
        }, 1500);
      }
    });
  }

  downloadDatasheet() {
    if (!this.currentCodeText) return;
    const ext = (this.activeTab === "json") ? "json" : ((this.activeTab === "text") ? "txt" : "md");
    const mime = (this.activeTab === "json") ? "application/json" : "text/plain";
    const blob = new Blob([this.currentCodeText], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AES-X152_DataSheet.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  downloadBlankTemplate() {
    const blankData = this.presets.blank;
    const blankMd = `<!-- ========================================================
     AES-X152 STANDARDIZED BLANK PRODUCT DATA SHEET TEMPLATE
     Audio Engineering Society Standards Committee SC-05-05
     ======================================================== -->

# [PRODUCT / MODEL NAME]
**Manufacturer / Organization:** [ENTER NAME]  
**Specification Standard:** AES-X152 / IEC 60268-3  
**Date of Document:** [YYYY-MM-DD]  

---

## 1. General Architectural Classification (Part 1)
- **Circuit Topology:** [Select: 6.1 Transless Diff | 6.2 Active Imp-Balanced | 6.3 Transformer Floating]
- **Connector Type & Designation:** [e.g. XLR-3M / XLR-3F / DB25 AES59 / RJ45 AES72-4E]
- **Grounding & Shield Termination:** AES48 Direct metal-to-metal chassis enclosure bond at connector entry
- **Nominal Operating Level:** [e.g. +4 dBu (1.228 V RMS) / -10 dBV (0.316 V RMS)]
- **Maximum Output Capability (L_MAX):** [e.g. +24.0 dBu into 10 kΩ load]

---

## 2. Impedance Characteristics (Part 2)
- **Differential Impedance (DMZ):** [e.g. 100 Ω Differential Output Impedance (50 Ω / leg)]
- **Common-Mode Impedance (CMZ):** [e.g. 50 Ω Common-Mode Impedance to Chassis Ground]
- **Balance Matching Tolerance:** [e.g. 0.1% matching / CMRR > 85 dB @ 60 Hz]

---

## 3. Interference Rejection & Compatibility (Part 3)
- **Common-Mode Rejection Ratio (CMRR):** [e.g. ≥ 85 dB @ 60 Hz, ≥ 80 dB @ 1 kHz]
- **Unbalanced Interconnection Rule:** Compatible with TS / RCA inputs per Richard Hess Matrix.
- **RF Immunity & Pin 1 Isolation:** 100% immune to Shield-Current-Induced Noise (SCIN).

---

## 4. Normative AES References (Part 4)
- **AES-X152:** Standard Method of Presenting Levels, Topologies & Circuit Impedances
- **AES48:** Interconnections & Pin 1 Direct Chassis Enclosure Bonding
- **AES14 / AES59 / AES72:** Connector Pin Allocations & Mating Face Conventions
- **AES26:** Polarity Conservation (Pin 2 Hot / Positive Acoustic Pressure)
`;

    const blob = new Blob([blankMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AES-X152_Blank_Template.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.aesDatasheetGenerator = new AESDatasheetGenerator();
});
