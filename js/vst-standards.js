/**
 * AES-VST Plugin Interface & Standards Ecosystem Map
 * Virtual Studio Technology (VST) Hardware Preview & Standards Inspector
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

class AESVSTPlugin {
  constructor() {
    this.meterMode = "stereo"; // "stereo", "balanced", "cm"
    this.isGndLifted = false;
    this.gainDb = 0.0;
    this.cmrrDb = 92;
    this.preset = "line";
    this.activeStandard = "aes-x152";

    this.meterValL = 68.0;
    this.meterValR = 68.0;

    this.standardsData = {
      "sc-05-05": {
        id: "sc-05-05",
        name: "AES SC-05-05 Working Group",
        title: "Interconnections & Grounding Practices",
        chair: "Anthony P. Kuzub / Bruce Hofer / Ray Rayburn",
        status: "Active Working Group",
        description: "Parent working group responsible for developing standards on analog audio interconnections, presenting signal levels, circuit impedances, connector shielding, and Pin 1 EMC practices.",
        keyStandards: ["AES-X152", "AES-X249", "AES48", "AES59", "AES72", "AES14"],
        jumpTarget: "#top-level"
      },
      "aes-x152": {
        id: "aes-x152",
        name: "AES-X152 Standard",
        title: "Presenting Signal Levels, Circuit Impedances & Topologies for Product Data Sheets",
        chair: "SC-05-05 Task Group",
        status: "Draft Standard & Method of Presentation",
        description: "Establishes normative methods for reporting analog audio device input/output levels, source and load impedances, differential and common-mode parameters, and circuit topologies.",
        keyStandards: ["IEC 60268-3", "AES48", "AES14"],
        jumpTarget: "#hero"
      },
      "aes-x249": {
        id: "aes-x249",
        name: "AES-X249 Standard",
        title: "Shields of 25-Way D-Type Connectors in Balanced Audio Circuits",
        chair: "Bruce Hofer / SC-05-05",
        status: "Normative Annex to AES48",
        description: "Mandates that DB25 metal shroud flanges and mechanical jack screws must bond directly to chassis metal-to-metal at connector entry to prevent ground loops and SCIN.",
        keyStandards: ["AES48", "AES59"],
        jumpTarget: "#box-db25"
      },
      "sc-04-04": {
        id: "sc-04-04",
        name: "AES SC-04-04 Working Group",
        title: "Microphones & Acoustic Transducers",
        chair: "David Josephson",
        status: "Active Working Group",
        description: "Formulates standards on microphone sensitivity, impedance balance, capsule RF shielding, phantom power (P48 / P12) current supply, and electrostatic transducer terminations.",
        keyStandards: ["IEC 61938", "AES48", "AES26"],
        jumpTarget: "#box-mic"
      },
      "aes14": {
        id: "aes14",
        name: "AES14 Standard",
        title: "Application of 3-Pin and 5-Pin Circular Connectors for Audio Signals",
        chair: "SC-05-05",
        status: "Published Standard (s2014)",
        description: "Defines the universal XLR standard: Pin 1 Shield, Pin 2 Hot (+), Pin 3 Cold (-). Establishes Table 1 rule: Male pin connector = Equipment OUTPUT; Female socket = Equipment INPUT.",
        keyStandards: ["IEC 60268-12", "AES26", "AES48"],
        jumpTarget: "#xlr-hub"
      },
      "aes26": {
        id: "aes26",
        name: "AES26 Standard",
        title: "Conservation of Polarity in Audio Systems",
        chair: "SC-05-05",
        status: "Published Standard (s2017)",
        description: "Guarantees that positive acoustic pressure at a microphone transducer produces a positive-going voltage on Pin 2, preserved through the entire signal chain to loudspeaker outward cone excursion.",
        keyStandards: ["AES14", "AES48"],
        jumpTarget: "#xlr-hub"
      },
      "aes48": {
        id: "aes48",
        name: "AES48 Standard",
        title: "Interconnections — Grounding & EMC Practices — Shields of Connectors",
        chair: "Jim Brown / SC-05-05",
        status: "Flagship EMC Standard",
        description: "The definitive solution to the Pin 1 Problem: Cable shields and connector shells must bond DIRECTLY to the metal equipment enclosure, never to internal signal ground / audio 0V trace.",
        keyStandards: ["AES14", "AES59", "AES72", "AES-X249"],
        jumpTarget: "#top-level"
      },
      "aes59": {
        id: "aes59",
        name: "AES59 Standard",
        title: "Multichannel 25-Way D-Type Connector Pinout",
        chair: "SC-05-05",
        status: "Industry Standard (Tascam DB25)",
        description: "Standardizes the 8-channel balanced analog and 4-pair AES3 digital pin assignments on DB25 connectors. Harmonized with AES-X249 for mandatory 360-degree shield chassis bonding.",
        keyStandards: ["AES-X249", "AES48"],
        jumpTarget: "#box-db25"
      },
      "aes72": {
        id: "aes72",
        name: "AES72 Standard (AES72-4E)",
        title: "Quad Twisted Pair (QTP) RJ45 Audio Interconnection",
        chair: "Anthony P. Kuzub / SC-05-05",
        status: "Published Standard",
        description: "Defines pin allocations for transmitting 4 balanced analog audio channels or 4 AES3 digital pairs over Category 5e/6/7 STP cable using standard 8P8C (RJ45) modular connectors.",
        keyStandards: ["AES48", "TIA-568"],
        jumpTarget: "#box-qtp"
      },
      "sc-02-01": {
        id: "sc-02-01",
        name: "AES SC-02-01 Working Group",
        title: "Digital Audio Interfaces",
        chair: "John Strawn",
        status: "Active Working Group",
        description: "Develops digital audio transport specifications including AES3 (AES/EBU balanced 110 Ω digital audio) and AES10 (MADI multichannel digital interface).",
        keyStandards: ["AES3", "AES10", "AES11"],
        jumpTarget: "#box-aes3"
      },
      "aes3": {
        id: "aes3",
        name: "AES3 Standard",
        title: "Digital Audio Engineering — Serial Transmission Format for Two-Channel Audio",
        chair: "SC-02-01",
        status: "Universal Professional Digital Standard",
        description: "Specifies 110 Ω balanced transmission of linear PCM digital audio over XLR-3 or DB25, using biphase-mark encoding with transformer isolation.",
        keyStandards: ["AES11", "AES14", "AES59"],
        jumpTarget: "#box-aes3"
      },
      "aes11": {
        id: "aes11",
        name: "AES11 Standard",
        title: "Synchronization of Digital Audio Equipment in Studio Operations",
        chair: "SC-02-01",
        status: "Published Standard (r2014)",
        description: "Establishes master clock synchronization requirements and DARS (Digital Audio Reference Signal) phase alignment across studio installations.",
        keyStandards: ["AES3"],
        jumpTarget: "#box-aes3"
      }
    };

    this.init();
  }

  init() {
    this.bindDOM();
    this.updateMeterLabels();
    this.startMeterAnimation();
    this.selectStandard("aes-x152");
  }

  bindDOM() {
    // STANDARDS MAP button
    const mapBtn = document.getElementById("vst-standards-map-btn");
    const mapModal = document.getElementById("vst-standards-modal");
    const closeBtn = document.getElementById("vst-modal-close");

    if (mapBtn && mapModal) {
      mapBtn.addEventListener("click", () => {
        mapModal.classList.toggle("active");
        if (mapModal.classList.contains("active")) {
          mapModal.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }

    if (closeBtn && mapModal) {
      closeBtn.addEventListener("click", () => {
        mapModal.classList.remove("active");
      });
    }

    // Node click handlers in SVG map
    document.querySelectorAll(".standards-map-node").forEach(node => {
      node.addEventListener("click", () => {
        const stdId = node.dataset.stdId;
        if (stdId && this.standardsData[stdId]) {
          this.selectStandard(stdId);
        }
      });
    });

    // Preset selector
    const presetSelect = document.getElementById("vst-preset-select");
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        this.preset = e.target.value;
        this.updateOLEDDisplay();
      });
    }

    // Knobs input event
    const knobGain = document.getElementById("vst-knob-gain");
    const dispGain = document.getElementById("vst-gain-val");
    if (knobGain && dispGain) {
      knobGain.addEventListener("input", (e) => {
        this.gainDb = parseFloat(e.target.value);
        dispGain.textContent = `${this.gainDb >= 0 ? '+' : ''}${this.gainDb.toFixed(1)} dB`;
        this.updateOLEDDisplay();
      });
    }

    const knobCmrr = document.getElementById("vst-knob-cmrr");
    const dispCmrr = document.getElementById("vst-cmrr-val");
    if (knobCmrr && dispCmrr) {
      knobCmrr.addEventListener("input", (e) => {
        this.cmrrDb = parseInt(e.target.value, 10);
        dispCmrr.textContent = `${this.cmrrDb} dB`;
        this.updateOLEDDisplay();
      });
    }

    // Meter mode buttons
    document.querySelectorAll(".vst-meter-mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".vst-meter-mode-btn").forEach(b => {
          b.classList.remove("active");
          b.style.background = "transparent";
          b.style.borderColor = "#475569";
          b.style.color = "#94a3b8";
        });
        btn.classList.add("active");
        btn.style.background = "#1e293b";
        btn.style.borderColor = "#06b6d4";
        btn.style.color = "#06b6d4";

        this.meterMode = btn.dataset.meterMode || "stereo";
        this.updateMeterLabels();
      });
    });

    // AES48 Pin 1 Ground Shield toggle button
    const gndToggleBtn = document.getElementById("vst-gnd-toggle-btn");
    if (gndToggleBtn) {
      gndToggleBtn.addEventListener("click", () => {
        this.isGndLifted = !this.isGndLifted;
        this.updateGroundLiftUI();
      });
    }
  }

  updateMeterLabels() {
    const m1Label = document.getElementById("vst-m1-label");
    const m2Label = document.getElementById("vst-m2-label");

    if (this.meterMode === "stereo") {
      if (m1Label) m1Label.textContent = "Left Channel (Ch 1)";
      if (m2Label) m2Label.textContent = "Right Channel (Ch 2)";
    } else if (this.meterMode === "balanced") {
      if (m1Label) m1Label.textContent = "Pin 2 (Hot / Positive +)";
      if (m2Label) m2Label.textContent = "Pin 3 (Cold / Return \u2212)";
    } else if (this.meterMode === "cm") {
      if (m1Label) m1Label.textContent = "V_DIFF (Differential Signal)";
      if (m2Label) m2Label.textContent = "V_CM (Common-Mode Noise)";
    }
  }

  updateGroundLiftUI() {
    const btn = document.getElementById("vst-gnd-toggle-btn");
    const desc = document.getElementById("vst-gnd-status-desc");
    const oledSub = document.getElementById("vst-oled-sub");

    if (this.isGndLifted) {
      if (btn) {
        btn.textContent = "LIFTED (SHIELD OPEN)";
        btn.style.borderColor = "#f59e0b";
        btn.style.background = "rgba(245, 158, 11, 0.2)";
        btn.style.color = "#fbbf24";
      }
      if (desc) {
        desc.textContent = "\u26a0\ufe0f Pin 1 Lifted: Ground loop broken, but shield ungrounded (RFI alert).";
        desc.style.color = "#fbbf24";
      }
      if (oledSub) {
        oledSub.textContent = "PIN 1 LIFTED: Floating Shield (AES48 Non-Compliant / RFI Risk)";
        oledSub.style.color = "#f59e0b";
      }
    } else {
      if (btn) {
        btn.textContent = "CHASSIS BONDED";
        btn.style.borderColor = "#10b981";
        btn.style.background = "rgba(16, 185, 129, 0.2)";
        btn.style.color = "#34d399";
      }
      if (desc) {
        desc.textContent = "\u2713 Shield bonded to enclosure chassis. Conforms to AES48.";
        desc.style.color = "#10b981";
      }
      if (oledSub) {
        oledSub.textContent = "PIN 1 BONDED: Direct Chassis Metal-to-Metal (AES48 OK)";
        oledSub.style.color = "#10b981";
      }
    }

    this.updateOLEDDisplay();
  }

  updateOLEDDisplay() {
    const oledText = document.getElementById("vst-oled-text");
    if (oledText) {
      const modeNames = {
        line: "MODE: AES14 BALANCED LINE (+4 dBu / 100 \u03a9)",
        mic: "MODE: SC-04-04 MICROPHONE (-50 dBu / 150 \u03a9 + P48)",
        digital: "MODE: AES3 DIGITAL (110 \u03a9 BALANCED / 0 dBFS)",
        db25: "MODE: AES59 MULTICHANNEL DB25 (8-CH BALANCED)",
        qtp: "MODE: AES72 QUAD TWISTED PAIR (4-CH RJ45)"
      };
      oledText.textContent = modeNames[this.preset] || "MODE: AES-X152 BALANCED LINE";
    }
  }

  selectStandard(stdId) {
    const data = this.standardsData[stdId];
    if (!data) return;

    this.activeStandard = stdId;

    // Highlight active node in SVG map
    document.querySelectorAll(".standards-map-node").forEach(node => {
      node.classList.remove("selected");
      if (node.dataset.stdId === stdId) {
        node.classList.add("selected");
      }
    });

    // Update Detail Card
    const titleEl = document.getElementById("vst-std-title");
    const chairEl = document.getElementById("vst-std-chair");
    const descEl = document.getElementById("vst-std-desc");
    const relatedEl = document.getElementById("vst-std-related");
    const jumpBtn = document.getElementById("vst-std-jump");

    if (titleEl) titleEl.textContent = `${data.name}: ${data.title}`;
    if (chairEl) chairEl.textContent = `Committee / Chair: ${data.chair} (${data.status})`;
    if (descEl) descEl.textContent = data.description;
    
    if (relatedEl) {
      relatedEl.innerHTML = data.keyStandards.map(s => `<span class="badge badge-accent">${s}</span>`).join(" ");
    }

    if (jumpBtn) {
      jumpBtn.setAttribute("href", data.jumpTarget);
      jumpBtn.textContent = `Jump to ${data.name} on Page \u2193`;
    }
  }

  startMeterAnimation() {
    const meterL = document.getElementById("vst-vu-bar-l");
    const meterR = document.getElementById("vst-vu-bar-r");
    const valL = document.getElementById("vst-m1-val");
    const valR = document.getElementById("vst-m2-val");
    const peakLedL = document.getElementById("vst-peak-led-l");
    const peakLedR = document.getElementById("vst-peak-led-r");

    let t = 0;
    const animate = () => {
      t += 0.05;

      let dBu1 = 0;
      let dBu2 = 0;

      // Base program level
      let nominalDbu = 4.0;
      if (this.preset === "mic") nominalDbu = -45.0;
      else if (this.preset === "digital") nominalDbu = 0.0;

      const progOscL = Math.sin(t * 1.8) * 1.8 + Math.cos(t * 3.4) * 1.2;
      const progOscR = Math.sin(t * 1.6 + 0.4) * 1.8 + Math.cos(t * 3.1) * 1.2;

      if (this.meterMode === "stereo") {
        dBu1 = nominalDbu + this.gainDb + progOscL;
        dBu2 = nominalDbu + this.gainDb + progOscR;
      } else if (this.meterMode === "balanced") {
        dBu1 = nominalDbu + this.gainDb + progOscL;
        dBu2 = nominalDbu + this.gainDb + progOscL; // Identical differential magnitude on Pin 3
      } else if (this.meterMode === "cm") {
        // Meter 1: Differential audio
        dBu1 = nominalDbu + this.gainDb + progOscL;
        // Meter 2: Common-Mode residual noise
        let cmNoise = -20.0 - this.cmrrDb; // suppressed by CMRR
        if (this.isGndLifted) {
          // Floating shield picks up RFI/EMI
          cmNoise = -65.0 + Math.sin(t * 5.0) * 3.0;
        } else {
          cmNoise += Math.sin(t * 2.5) * 1.5;
        }
        dBu2 = cmNoise;
      }

      // Convert dBu (-40 to +24 dBu) to percentage [0, 100]
      const toPct = (val) => {
        const minDbu = -40;
        const maxDbu = 24;
        return Math.min(100, Math.max(2, ((val - minDbu) / (maxDbu - minDbu)) * 100));
      };

      const targetPctL = toPct(dBu1);
      const targetPctR = toPct(dBu2);

      this.meterValL = this.meterValL * 0.7 + targetPctL * 0.3;
      this.meterValR = this.meterValR * 0.7 + targetPctR * 0.3;

      if (meterL) meterL.style.width = `${this.meterValL.toFixed(1)}%`;
      if (meterR) meterR.style.width = `${this.meterValR.toFixed(1)}%`;

      if (valL) {
        valL.textContent = `${dBu1 >= 0 ? '+' : ''}${dBu1.toFixed(1)} dBu`;
      }
      if (valR) {
        valR.textContent = `${dBu2 >= 0 ? '+' : ''}${dBu2.toFixed(1)} dBu`;
      }

      if (peakLedL) {
        peakLedL.style.opacity = (dBu1 > 20.0) ? "1" : "0.2";
      }
      if (peakLedR) {
        peakLedR.style.opacity = (dBu2 > 20.0) ? "1" : "0.2";
      }

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }
}

// Instantiate on window load
document.addEventListener("DOMContentLoaded", () => {
  window.aesVstPlugin = new AESVSTPlugin();
});
