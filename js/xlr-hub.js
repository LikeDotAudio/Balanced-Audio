/**
 * Universal XLR Connection Hub & AES14 Table 2 Interactive Engine
 * Standards: AES14-1992 (s2014), AES48, AES26, IEC 60268-12
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

const AES14_TABLE2_DATA = [
  {
    id: 1,
    name: "Single-channel balanced",
    is5Pin: false,
    pins: {
      1: { name: "Screen", signal: "Chassis Shield (AES48)", type: "shield", dc: "0V DC", polarity: "Chassis Shield" },
      2: { name: "Positive polarity", signal: "Hot (+)", type: "hot", dc: "0V DC", polarity: "Positive (In-Phase)" },
      3: { name: "Return", signal: "Cold / Return (-)", type: "cold", dc: "0V DC", polarity: "Inverted (180°)" },
      4: null,
      5: null
    },
    note: "Standard 3-pin balanced line interconnection (AES14, AES26, IEC 60268-12). Contact 1 bonds to chassis for AES48 compliance.",
    insight: "The universal pro audio standard. Pin 1 connects cable shield directly to equipment chassis. Audio signal is differential between Pins 2 and 3 with equal impedance to ground."
  },
  {
    id: 2,
    name: "Single-channel unbalanced",
    is5Pin: false,
    pins: {
      1: { name: "Screen and return", signal: "Shield & 0V Signal Return", type: "shield", dc: "0V DC", polarity: "Common Return" },
      2: { name: "Positive polarity", signal: "Hot (+)", type: "hot", dc: "0V DC", polarity: "Positive (In-Phase)" },
      3: { name: "See note", signal: "Tied to Pin 1 on Input", type: "jumper", dc: "0V DC", polarity: "Jumpered to Ground" },
      4: null,
      5: null
    },
    note: "AES14 Table 2 Normative Note: If an unbalanced amplifier input is to accept a balanced microphone, contact 3 of the input shall be connected to contact 1.",
    insight: "For unbalanced inputs accepting balanced sources, Pin 3 must be jumpered to Pin 1 (ground) at the receiving connector. This grounds the cold side of the transformer/floating source, completing the circuit path."
  },
  {
    id: 3,
    name: "Single-channel balanced, phantom supplied",
    is5Pin: false,
    pins: {
      1: { name: "Screen and negative supply", signal: "Shield & 0V DC Negative Supply", type: "shield", dc: "0V DC (Power 0V)", polarity: "Ground Reference" },
      2: { name: "Positive polarity; positive supply", signal: "Hot (+) & +48V DC Supply", type: "hot", dc: "+48V DC via 6.81 kΩ", polarity: "Positive (In-Phase)" },
      3: { name: "Return; positive supply", signal: "Cold (-) & +48V DC Supply", type: "cold", dc: "+48V DC via 6.81 kΩ", polarity: "Inverted (180°)" },
      4: null,
      5: null
    },
    note: "DIN EN 61938 / IEC 60268-15 / AES14: Phantom power (P48/P24/P12). Identical DC voltage applied through matched 6.81 kΩ resistors to pins 2 and 3.",
    insight: "DC power is delivered common-mode across pins 2 and 3. Because both pins sit at exactly +48V DC, there is 0V DC differential across the microphone transducer coil, preventing magnetization or damage to dynamic microphones."
  },
  {
    id: 4,
    name: "Single-channel balanced, A-B supplied",
    is5Pin: false,
    pins: {
      1: { name: "Screen", signal: "Chassis Shield Only (No DC)", type: "shield", dc: "Isolated Screen", polarity: "Chassis Shield" },
      2: { name: "Positive polarity; positive supply", signal: "Hot (+) & +12V DC Supply", type: "hot", dc: "+12V DC via 180 Ω", polarity: "Positive & +12V DC" },
      3: { name: "Return; negative supply", signal: "Cold (-) & -12V DC Supply", type: "cold", dc: "-12V DC (0V Return)", polarity: "Return & -12V DC" },
      4: null,
      5: null
    },
    note: "DIN 45595 / AES14: Tonaderspeisung (T-power / A-B powering). 12V DC differential potential applied directly BETWEEN contacts 2 and 3.",
    insight: "WARNING: A-B (T-power) places a full 12V DC potential DIFFERENCE directly across signal pins 2 and 3! Connecting a standard dynamic or modern phantom-powered microphone to an A-B supply can destroy the voice coil or preamp circuitry."
  },
  {
    id: 5,
    name: "Two-channel balanced",
    is5Pin: true,
    pins: {
      1: { name: "Screen", signal: "Chassis Shield", type: "shield", dc: "0V DC", polarity: "Chassis Ground" },
      2: { name: "Left positive polarity", signal: "Left Hot (+)", type: "hot", dc: "0V DC", polarity: "Left In-Phase" },
      3: { name: "Left return", signal: "Left Cold (-)", type: "cold", dc: "0V DC", polarity: "Left Inverted" },
      4: { name: "Right positive polarity", signal: "Right Hot (+)", type: "hot", dc: "0V DC", polarity: "Right In-Phase" },
      5: { name: "Right return", signal: "Right Cold (-)", type: "cold", dc: "0V DC", polarity: "Right Inverted" }
    },
    note: "Standard 5-pin circular connector (XLR-5) carrying two independent balanced audio channels (e.g. Stereo microphone, intercom, M/S pair).",
    insight: "Provides two discrete balanced channels sharing a single common chassis shield on Pin 1. Conforms to AES14 Table 2 for stereo or dual-channel connections."
  },
  {
    id: 6,
    name: "Two-channel unbalanced",
    is5Pin: true,
    pins: {
      1: { name: "Screen and return", signal: "Shield & Common 0V Return", type: "shield", dc: "0V DC", polarity: "Common Ground Return" },
      2: { name: "Left positive polarity", signal: "Left Hot (+)", type: "hot", dc: "0V DC", polarity: "Left Signal" },
      3: { name: "See note", signal: "Left Return Tied to Pin 1", type: "jumper", dc: "0V DC", polarity: "Jumpered to Ground" },
      4: { name: "Right positive polarity", signal: "Right Hot (+)", type: "hot", dc: "0V DC", polarity: "Right Signal" },
      5: { name: "See note", signal: "Right Return Tied to Pin 1", type: "jumper", dc: "0V DC", polarity: "Jumpered to Ground" }
    },
    note: "AES14 Table 2 Normative Note: If unbalanced inputs accept balanced sources, contacts 3 and 5 shall be connected to contact 1.",
    insight: "When an unbalanced two-channel amplifier input accepts balanced microphones, both return contacts (Pin 3 for Left, Pin 5 for Right) must be strapped to Pin 1 (ground)."
  },
  {
    id: 7,
    name: "Two-channel balanced, phantom supplied",
    is5Pin: true,
    pins: {
      1: { name: "Screen and negative supply", signal: "Shield & 0V DC Negative Supply", type: "shield", dc: "0V DC (Power 0V)", polarity: "Common Power 0V" },
      2: { name: "Left pos; pos supply", signal: "Left Hot (+) & +48V DC", type: "hot", dc: "+48V DC", polarity: "Left In-Phase" },
      3: { name: "Left return; pos supply", signal: "Left Cold (-) & +48V DC", type: "cold", dc: "+48V DC", polarity: "Left Inverted" },
      4: { name: "Right pos; pos supply", signal: "Right Hot (+) & +48V DC", type: "hot", dc: "+48V DC", polarity: "Right In-Phase" },
      5: { name: "Right return; pos supply", signal: "Right Cold (-) & +48V DC", type: "cold", dc: "+48V DC", polarity: "Right Inverted" }
    },
    note: "Two-channel phantom power (XLR-5). Pin 1 carries shared 0V return, while pins 2, 3, 4, 5 all carry matched +48V DC phantom potential.",
    insight: "Allows powering stereo condenser microphones with a single XLR-5 cable. All 4 signal pins carry common-mode +48V DC relative to the Pin 1 chassis/cable screen."
  },
  {
    id: 8,
    name: "Two-channel balanced, A-B supplied",
    is5Pin: true,
    pins: {
      1: { name: "Screen", signal: "Chassis Shield Only", type: "shield", dc: "Isolated Screen", polarity: "Chassis Shield" },
      2: { name: "Left pos; pos supply", signal: "Left Hot (+) & +12V DC", type: "hot", dc: "+12V DC", polarity: "Left +12V DC" },
      3: { name: "Left return; neg supply", signal: "Left Cold (-) & -12V DC", type: "cold", dc: "-12V DC", polarity: "Left Return -12V DC" },
      4: { name: "Right pos; pos supply", signal: "Right Hot (+) & +12V DC", type: "hot", dc: "+12V DC", polarity: "Right +12V DC" },
      5: { name: "Right return; neg supply", signal: "Right Cold (-) & -12V DC", type: "cold", dc: "-12V DC", polarity: "Right Return -12V DC" }
    },
    note: "Two-channel A-B (T-power) via 5-pin XLR. Dual 12V differential DC power systems on pins 2-3 and 4-5.",
    insight: "Differential T-power applied independently across the Left channel pair (Pins 2 & 3) and Right channel pair (Pins 4 & 5). Screen (Pin 1) remains completely isolated from DC current."
  }
];

class XLRHubEngine {
  constructor() {
    this.currentCircuitId = 1;
    this.init();
  }

  // Slide the mating-face inspector down beside the AES14 tables as the reader scrolls,
  // never past the bottom of the tables column
  initFollowInspector() {
    const panel = document.querySelector(".xlr-inspector-sticky");
    if (!panel) return;
    const column = panel.parentElement;
    const GAP = 12;
    let queued = false;

    const place = () => {
      queued = false;
      panel.style.transform = "";
      const colRect = column.getBoundingClientRect();
      const panelH = panel.offsetHeight;
      const maxShift = Math.max(0, colRect.height - panelH);
      const shift = Math.min(maxShift, Math.max(0, GAP - colRect.top));
      panel.style.transform = shift ? `translateY(${shift}px)` : "";
    };
    const queue = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(place);
      }
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    place();
  }

  init() {
    this.initFollowInspector();
    this.bindEvents();
    this.renderCircuit(1);
  }

  bindEvents() {
    // Mode Buttons
    document.querySelectorAll(".xlr-mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.circuitId, 10);
        if (!isNaN(id)) {
          this.renderCircuit(id);
        }
      });
    });

    // Table 2 Rows clickable
    document.querySelectorAll(".aes14-t2-row").forEach(row => {
      row.addEventListener("click", () => {
        const id = parseInt(row.dataset.circuitId, 10);
        if (!isNaN(id)) {
          this.renderCircuit(id);
        }
      });
    });

    // Filter toggle button
    const filterBtn = document.getElementById("btn-toggle-xlr-filter");
    if (filterBtn) {
      filterBtn.addEventListener("click", () => {
        this.onlySelectedMode = !this.onlySelectedMode;
        filterBtn.textContent = this.onlySelectedMode 
          ? "Show All Configurations" 
          : "Show Only Selected Circuit";
        filterBtn.classList.toggle("active", this.onlySelectedMode);
        this.renderCircuit(this.currentCircuitId);
      });
    }
  }

  renderCircuit(id) {
    this.currentCircuitId = id;
    const item = AES14_TABLE2_DATA.find(d => d.id === id) || AES14_TABLE2_DATA[0];

    // Update button states
    document.querySelectorAll(".xlr-mode-btn").forEach(b => {
      b.classList.toggle("active", parseInt(b.dataset.circuitId, 10) === id);
    });

    // Update table row highlighting and selective visibility
    document.querySelectorAll(".aes14-t2-row").forEach(r => {
      const isSelected = parseInt(r.dataset.circuitId, 10) === id;
      r.classList.toggle("table-row-selected", isSelected);
      if (this.onlySelectedMode) {
        r.style.display = isSelected ? "" : "none";
      } else {
        r.style.display = "";
      }
      if (isSelected) {
        r.style.background = "rgba(56, 189, 248, 0.12)";
        r.style.borderLeft = "4px solid var(--accent-cyan)";
      } else {
        r.style.background = "";
        r.style.borderLeft = "";
      }
    });

    // Update insight and note callouts
    const titleEl = document.getElementById("xlr-active-mode-title");
    if (titleEl) titleEl.textContent = `${item.id}. ${item.name}`;

    const noteEl = document.getElementById("xlr-active-note");
    if (noteEl) noteEl.textContent = item.note;

    const insightEl = document.getElementById("xlr-active-insight");
    if (insightEl) insightEl.textContent = item.insight;

    // Render SVG diagram
    this.renderSVG(item);
    this.renderPinBadges(item);
  }

  getColor(type) {
    switch (type) {
      case "shield": return "#94a3b8"; // Slate / ground
      case "hot": return "#10b981"; // Emerald / hot
      case "cold": return "#ef4444"; // Red / return
      case "jumper": return "#f59e0b"; // Amber / jumper
      default: return "#475569";
    }
  }

  renderSVG(item) {
    const svgContainer = document.getElementById("xlr-svg-container");
    if (!svgContainer) return;
    queueMicrotask(() => this.tagProbePoints(item));

    if (!item.is5Pin) {
      // 3-Pin Circular (XLR-3)
      const p1Color = this.getColor(item.pins[1]?.type);
      const p2Color = this.getColor(item.pins[2]?.type);
      const p3Color = this.getColor(item.pins[3]?.type);

      // Realistic XLR-3 faces: machined metal shells, black insulators, metal pins / brass sockets.
      // Pin circles keep r="14" so the lab rack can probe them (see tagProbePoints).
      const pinFill = "url(#xlr-pin-metal)";
      const role = (n) => this.getColor(item.pins[n]?.type);
      const short = (n) => ({ shield: "Screen", hot: "Hot +", cold: "Return −", jumper: "→ Pin 1" })[item.pins[n]?.type] || "n/c";
      const malePin = (x, y, n) => `
            <circle cx="${x}" cy="${y}" r="14" fill="${pinFill}" stroke="${role(n)}" stroke-width="2.5"/>
            <circle cx="${x - 4}" cy="${y - 4}" r="4.5" fill="#ffffff" opacity="0.55"/>
            <circle cx="${x}" cy="${y}" r="9.5" fill="none" stroke="#475569" stroke-width="0.8" opacity="0.7"/>`;
      const socket = (x, y, n) => `
            <circle cx="${x}" cy="${y}" r="14" fill="#030303" stroke="${role(n)}" stroke-width="2.5"/>
            <circle cx="${x}" cy="${y}" r="8.5" fill="none" stroke="url(#xlr-brass)" stroke-width="3"/>
            <circle cx="${x}" cy="${y}" r="3.5" fill="#000000"/>`;
      const shell = (keyway) => `
            <circle cx="0" cy="0" r="86" fill="url(#xlr-shell-metal)" stroke="#334155" stroke-width="1.5"/>
            <circle cx="0" cy="0" r="80" fill="none" stroke="#f8fafc" stroke-width="1.2" opacity="0.7"/>
            <circle cx="0" cy="0" r="74" fill="url(#xlr-shell-inner)" stroke="#475569" stroke-width="1"/>
            <circle cx="0" cy="0" r="66" fill="url(#xlr-insulator)" stroke="#000000" stroke-width="1.5"/>
            ${keyway}`;

      svgContainer.innerHTML = `
        <svg viewBox="0 0 640 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
          <defs>
            <radialGradient id="xlr-shell-metal" cx="38%" cy="30%" r="80%">
              <stop offset="0%" stop-color="#ffffff"/><stop offset="25%" stop-color="#d7dde5"/>
              <stop offset="55%" stop-color="#8b95a3"/><stop offset="80%" stop-color="#c3cad3"/><stop offset="100%" stop-color="#5b6573"/>
            </radialGradient>
            <radialGradient id="xlr-shell-inner" cx="60%" cy="70%" r="75%">
              <stop offset="0%" stop-color="#e5e9ee"/><stop offset="60%" stop-color="#7c8794"/><stop offset="100%" stop-color="#3b4450"/>
            </radialGradient>
            <radialGradient id="xlr-insulator" cx="45%" cy="40%" r="70%">
              <stop offset="0%" stop-color="#2a2f36"/><stop offset="100%" stop-color="#07080a"/>
            </radialGradient>
            <radialGradient id="xlr-pin-metal" cx="35%" cy="30%" r="75%">
              <stop offset="0%" stop-color="#ffffff"/><stop offset="40%" stop-color="#d4d9df"/><stop offset="100%" stop-color="#6b7480"/>
            </radialGradient>
            <linearGradient id="xlr-brass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#f3d78a"/><stop offset="50%" stop-color="#b8892f"/><stop offset="100%" stop-color="#6e4f17"/>
            </linearGradient>
          </defs>

          <!-- Pin connector (male) — equipment output -->
          <g transform="translate(170, 135)">
            ${shell(`<rect x="-8" y="-88" width="16" height="16" rx="2" fill="#07080a" stroke="#334155"/>`)}
            ${malePin(-36, -22, 1)}
            ${malePin(36, -22, 2)}
            ${malePin(0, 38, 3)}
            <text x="-36" y="-42" fill="#e5e7eb" font-size="10" font-weight="800" text-anchor="middle">1</text>
            <text x="36" y="-42" fill="#e5e7eb" font-size="10" font-weight="800" text-anchor="middle">2</text>
            <text x="20" y="58" fill="#e5e7eb" font-size="10" font-weight="800" text-anchor="middle">3</text>
            <text x="-94" y="-18" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="end">1 · ${short(1)}</text>
            <text x="94" y="-18" fill="${role(2)}" font-size="10" font-weight="700" text-anchor="start">2 · ${short(2)}</text>
            <text x="0" y="104" fill="${role(3)}" font-size="10" font-weight="700" text-anchor="middle">3 · ${short(3)}</text>
            <text x="0" y="124" fill="#38bdf8" font-size="12" font-weight="800" text-anchor="middle">XLR-3 PIN CONNECTOR (MALE)</text>
            <text x="0" y="139" fill="#94a3b8" font-size="9.5" text-anchor="middle">Equipment output · mating face (AES14 Table 1)</text>
          </g>

          <!-- Socket connector (female) — equipment input -->
          <g transform="translate(470, 135)">
            ${shell(`<path d="M -18,-84 L -18,-100 Q -18,-106 -12,-106 L 12,-106 Q 18,-106 18,-100 L 18,-84 Z" fill="url(#xlr-shell-metal)" stroke="#334155" stroke-width="1.2"/>
            <text x="0" y="-92" fill="#1e293b" font-size="7" font-weight="900" text-anchor="middle">PUSH</text>
            <rect x="-6" y="-66" width="12" height="9" fill="#2a2f36" stroke="#000"/>`)}
            ${socket(36, -22, 1)}
            ${socket(-36, -22, 2)}
            ${socket(0, 38, 3)}
            <text x="36" y="-42" fill="#e5e7eb" font-size="10" font-weight="800" text-anchor="middle">1</text>
            <text x="-36" y="-42" fill="#e5e7eb" font-size="10" font-weight="800" text-anchor="middle">2</text>
            <text x="20" y="58" fill="#e5e7eb" font-size="10" font-weight="800" text-anchor="middle">3</text>
            <text x="94" y="-18" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="start">1 · ${short(1)}</text>
            <text x="-94" y="-18" fill="${role(2)}" font-size="10" font-weight="700" text-anchor="end">2 · ${short(2)}</text>
            <text x="0" y="104" fill="${role(3)}" font-size="10" font-weight="700" text-anchor="middle">3 · ${short(3)}</text>
            <text x="0" y="124" fill="#10b981" font-size="12" font-weight="800" text-anchor="middle">XLR-3 SOCKET CONNECTOR (FEMALE)</text>
            <text x="0" y="139" fill="#94a3b8" font-size="9.5" text-anchor="middle">Equipment input · mating face (AES14 Table 1)</text>
          </g>

          <!-- Dimensions (drafting style; values per IEC 61076-2-103) -->
          <g transform="translate(30, 0)" stroke="#64748b" stroke-width="0.8" fill="#94a3b8" font-size="8.5" font-style="italic">
            <line x1="54" y1="18" x2="226" y2="18"/>
            <line x1="54" y1="13" x2="54" y2="40" stroke-dasharray="2,2"/><line x1="226" y1="13" x2="226" y2="40" stroke-dasharray="2,2"/>
            <polygon points="54,18 61,15 61,21" stroke="none"/><polygon points="226,18 219,15 219,21" stroke="none"/>
            <text x="140" y="14" text-anchor="middle" stroke="none">Ø shell</text>
            <line x1="104" y1="92" x2="176" y2="92"/>
            <line x1="104" y1="113" x2="104" y2="88" stroke-dasharray="2,2"/><line x1="176" y1="113" x2="176" y2="88" stroke-dasharray="2,2"/>
            <polygon points="104,92 110,89 110,95" stroke="none"/><polygon points="176,92 170,89 170,95" stroke="none"/>
            <text x="140" y="88" text-anchor="middle" stroke="none">pitch 1↔2</text>
            <line x1="126" y1="190" x2="154" y2="190"/>
            <text x="140" y="203" text-anchor="middle" stroke="none">Ø pin</text>
            <text x="290" y="294" text-anchor="middle" stroke="none" font-style="normal">Dimensions: see IEC 61076-2-103 (XLR-type circular connectors), referenced by AES14</text>
          </g>
        </svg>
      `;
    } else {
      // 5-Pin Circular (XLR-5)
      const p1Color = this.getColor(item.pins[1]?.type);
      const p2Color = this.getColor(item.pins[2]?.type);
      const p3Color = this.getColor(item.pins[3]?.type);
      const p4Color = this.getColor(item.pins[4]?.type);
      const p5Color = this.getColor(item.pins[5]?.type);

      svgContainer.innerHTML = `
        <svg viewBox="0 0 540 250" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto;">
          <!-- Left: MALE Pin Connector (Equipment Output - 5 Pin) -->
          <g transform="translate(130, 115)">
            <circle cx="0" cy="0" r="76" fill="#1e293b" stroke="#38bdf8" stroke-width="3"/>
            <circle cx="0" cy="0" r="84" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>

            <!-- Pin 1: ~10 o'clock -->
            <circle cx="-38" cy="-24" r="11" fill="${p1Color}" stroke="#ffffff" stroke-width="1.8"/>
            <text x="-38" y="-20" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">1</text>

            <!-- Pin 2: ~8 o'clock -->
            <circle cx="-42" cy="18" r="11" fill="${p2Color}" stroke="#ffffff" stroke-width="1.8"/>
            <text x="-42" y="22" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">2</text>

            <!-- Pin 3: Bottom Center -->
            <circle cx="0" cy="42" r="11" fill="${p3Color}" stroke="#ffffff" stroke-width="1.8"/>
            <text x="0" y="46" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">3</text>

            <!-- Pin 4: ~4 o'clock -->
            <circle cx="42" cy="18" r="11" fill="${p4Color}" stroke="#ffffff" stroke-width="1.8"/>
            <text x="42" y="22" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">4</text>

            <!-- Pin 5: ~2 o'clock -->
            <circle cx="38" cy="-24" r="11" fill="${p5Color}" stroke="#ffffff" stroke-width="1.8"/>
            <text x="38" y="-20" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">5</text>

            <text x="0" y="105" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">XLR-5M (5-PIN PIN CONNECTOR)</text>
            <text x="0" y="120" fill="#94a3b8" font-size="9.5" text-anchor="middle">Equipment Output (Stereo/Dual-Ch)</text>
          </g>

          <!-- Right: FEMALE Socket Connector (Equipment Input - 5 Pin) -->
          <g transform="translate(410, 115)">
            <circle cx="0" cy="0" r="76" fill="#1e293b" stroke="#10b981" stroke-width="3"/>
            <circle cx="0" cy="0" r="84" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="3,3"/>

            <!-- Socket 1: ~2 o'clock (Mirror of Male 1) -->
            <circle cx="38" cy="-24" r="11" fill="${p1Color}" stroke="#ffffff" stroke-width="1.8"/>
            <circle cx="38" cy="-24" r="3.5" fill="#0f172a"/>
            <text x="38" y="-20" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">1</text>

            <!-- Socket 2: ~4 o'clock -->
            <circle cx="42" cy="18" r="11" fill="${p2Color}" stroke="#ffffff" stroke-width="1.8"/>
            <circle cx="42" cy="18" r="3.5" fill="#0f172a"/>
            <text x="42" y="22" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">2</text>

            <!-- Socket 3: Bottom Center -->
            <circle cx="0" cy="42" r="11" fill="${p3Color}" stroke="#ffffff" stroke-width="1.8"/>
            <circle cx="0" cy="42" r="3.5" fill="#0f172a"/>
            <text x="0" y="46" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">3</text>

            <!-- Socket 4: ~8 o'clock -->
            <circle cx="-42" cy="18" r="11" fill="${p4Color}" stroke="#ffffff" stroke-width="1.8"/>
            <circle cx="-42" cy="18" r="3.5" fill="#0f172a"/>
            <text x="-42" y="22" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">4</text>

            <!-- Socket 5: ~10 o'clock -->
            <circle cx="-38" cy="-24" r="11" fill="${p5Color}" stroke="#ffffff" stroke-width="1.8"/>
            <circle cx="-38" cy="-24" r="3.5" fill="#0f172a"/>
            <text x="-38" y="-20" fill="#ffffff" font-size="10" font-weight="700" text-anchor="middle">5</text>

            <text x="0" y="105" fill="#10b981" font-size="12" font-weight="700" text-anchor="middle">XLR-5F (5-PIN SOCKET CONNECTOR)</text>
            <text x="0" y="120" fill="#94a3b8" font-size="9.5" text-anchor="middle">Equipment Input (Stereo/Dual-Ch)</text>
          </g>
        </svg>
      `;
    }
  }

  // Make every pin / socket on the mating faces a probe point for the lab rack, plus an across-the-pair point
  tagProbePoints(item) {
    const svg = document.querySelector("#xlr-svg-container svg");
    if (!svg) return;
    const faces = svg.querySelectorAll(":scope > g");
    const sides = [["xlrm", "Male pin"], ["xlrf", "Female socket"]];
    faces.forEach((face, f) => {
      if (!sides[f]) return;
      const [prefix, label] = sides[f];
      const contacts = [...face.querySelectorAll("circle")].filter(c => ["14", "11"].includes(c.getAttribute("r")));
      contacts.forEach((c, i) => {
        c.setAttribute("data-probe-target", `${prefix}-p${i + 1}`);
        c.setAttribute("data-probe-label", `${label} ${i + 1}: ${item.pins[i + 1]?.name || ""}`);
        c.style.cursor = "crosshair";
      });
    });

    // Socket-side point for meters reading across contacts 2 and 3
    const female = faces[1];
    if (female) {
      const ns = "http://www.w3.org/2000/svg";
      const g = document.createElementNS(ns, "g");
      g.innerHTML = `
        <rect x="-26" y="-2" width="52" height="16" rx="3" fill="#0f172a" stroke="#f97316" stroke-width="1.2" />
        <text x="0" y="10" fill="#f97316" font-size="9" font-weight="800" text-anchor="middle">V 2↔3</text>`;
      g.setAttribute("data-probe-target", "xlrf-diff");
      g.setAttribute("data-probe-label", "Across contacts 2 & 3 (differential)");
      g.style.cursor = "crosshair";
      female.appendChild(g);
      if (item.is5Pin) {
        const g45 = document.createElementNS(ns, "g");
        g45.innerHTML = `
          <rect x="-26" y="54" width="52" height="16" rx="3" fill="#0f172a" stroke="#f97316" stroke-width="1.2" />
          <text x="0" y="66" fill="#f97316" font-size="9" font-weight="800" text-anchor="middle">V 4↔5</text>`;
        g45.setAttribute("data-probe-target", "xlrf-diff45");
        g45.setAttribute("data-probe-label", "Across contacts 4 & 5 (right channel)");
        g45.style.cursor = "crosshair";
        female.appendChild(g45);
      }
    }
  }

  renderPinBadges(item) {
    const badgeContainer = document.getElementById("xlr-pin-badges-grid");
    if (!badgeContainer) return;

    let pinsList = [1, 2, 3];
    if (item.is5Pin) pinsList = [1, 2, 3, 4, 5];

    badgeContainer.innerHTML = pinsList.map(pNum => {
      const p = item.pins[pNum];
      if (!p) return "";
      const col = this.getColor(p.type);
      return `
        <div style="padding: 0.6rem 0.8rem; background: rgba(30, 41, 59, 0.7); border-radius: 6px; border-left: 3px solid ${col};">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.2rem;">
            <strong style="color: ${col}; font-size: 0.9rem;">Contact ${pNum}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${p.dc}</span>
          </div>
          <div style="font-weight: 600; font-size: 0.82rem; color: var(--text-primary);">${p.name}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.15rem;">${p.signal} &bull; ${p.polarity}</div>
        </div>
      `;
    }).join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.xlrHubEngine = new XLRHubEngine();
});
