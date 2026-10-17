/**
 * AES-VST Plugin Interface & Standards Ecosystem Map
 * Virtual Studio Technology (VST) Hardware Preview & Standards Inspector
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

class AESVSTPlugin {
  constructor() {
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
        title: "Digital Audio Interfaces (AES3 & AES11)",
        chair: "John Grant / Rich Cabot",
        status: "Active Working Group",
        description: "Develops the serial linear digital transmission standard (AES3) and master synchronization clock distribution (AES11). Defines 110 Ω balanced twisted pair and 75 Ω coaxial formats.",
        keyStandards: ["AES3", "AES11", "AES-3id"],
        jumpTarget: "#box-digital"
      }
    };

    this.activeStandard = "aes-x152";
    this.meterValL = 0;
    this.meterValR = 0;
    this.animationId = null;

    this.init();
  }

  init() {
    this.bindDOM();
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
      node.addEventListener("click", (e) => {
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
        const val = e.target.value;
        const oledMsg = document.getElementById("vst-oled-text");
        if (oledMsg) {
          oledMsg.textContent = `MODE: ${val.toUpperCase()} | BALANCED OK`;
        }
      });
    }

    // Knobs input event
    const bindKnob = (id, displayId, unit) => {
      const knob = document.getElementById(id);
      const disp = document.getElementById(displayId);
      if (knob && disp) {
        knob.addEventListener("input", (e) => {
          disp.textContent = `${e.target.value} ${unit}`;
        });
      }
    };

    bindKnob("vst-knob-gain", "vst-gain-val", "dB");
    bindKnob("vst-knob-cmrr", "vst-cmrr-val", "dB");

    // Ground lift toggle
    const gndLift = document.getElementById("vst-gnd-lift");
    if (gndLift) {
      gndLift.addEventListener("change", (e) => {
        const oled = document.getElementById("vst-oled-sub");
        if (oled) {
          oled.textContent = e.target.checked 
            ? "PIN 1 LIFTED: Floating Ground Active (AES48 Warning!)" 
            : "PIN 1 BONDED: Direct Chassis Metal-to-Metal (AES48 OK)";
          oled.style.color = e.target.checked ? "#ef4444" : "#10b981";
        }
      });
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
      jumpBtn.textContent = `Jump to ${data.name} on Page ↓`;
    }

    // Update VST OLED display
    const oledEl = document.getElementById("vst-oled-text");
    if (oledEl) {
      oledEl.textContent = `${data.id.toUpperCase()}: ${data.title.substring(0, 32)}...`;
    }
  }

  startMeterAnimation() {
    const meterL = document.getElementById("vst-vu-bar-l");
    const meterR = document.getElementById("vst-vu-bar-r");
    const peakLedL = document.getElementById("vst-peak-led-l");
    const peakLedR = document.getElementById("vst-peak-led-r");

    let t = 0;
    const animate = () => {
      t += 0.05;
      // Simulated realistic audio signal fluctuation
      const rawL = (Math.sin(t * 1.5) * 0.35 + Math.cos(t * 3.7) * 0.25 + 0.5) * 85;
      const rawR = (Math.sin(t * 1.7 + 0.3) * 0.35 + Math.cos(t * 3.3) * 0.25 + 0.5) * 85;

      this.meterValL = this.meterValL * 0.7 + rawL * 0.3;
      this.meterValR = this.meterValR * 0.7 + rawR * 0.3;

      if (meterL) meterL.style.width = `${Math.min(100, Math.max(5, this.meterValL))}%`;
      if (meterR) meterR.style.width = `${Math.min(100, Math.max(5, this.meterValR))}%`;

      if (peakLedL) {
        peakLedL.style.opacity = (this.meterValL > 78) ? "1" : "0.2";
      }
      if (peakLedR) {
        peakLedR.style.opacity = (this.meterValR > 78) ? "1" : "0.2";
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
