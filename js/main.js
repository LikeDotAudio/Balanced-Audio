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

// ==========================================================================
// 0 & 1: Enclosure & Signal Chain Explorer ("Start with the Box")
// ==========================================================================

const BOX_TYPES = {
  mic: {
    title: "Microphone Enclosure & Transducer Interface",
    subtitle: "SC-04-04 Standards &bull; Low-Level Small Signal (-60 to -20 dBu) with P48 Phantom",
    badge: "Low-Level Transducer: 1 mV &ndash; 77 mV",
    boxDesc: "Conductive metallic housing (turned brass or zinc die-cast) with double-layer woven mesh acoustic grille acting as a continuous RF Faraday shield. Transducer capsule (condenser or dynamic) is 100% electrically floating relative to the casing to preserve common-mode isolation.",
    connectorDesc: "3-pin XLR male (AES14). Pin 1 is bonded directly to the microphone metallic housing (AES48). In poorly designed microphones, Pin 1 travels inside onto the internal preamplifier PCB before reaching the chassis, causing severe RF demodulation from mobile phones and transmitters (the classic 'Pin 1 Problem in Microphones' documented by Jim Brown and David Josephson).",
    wireDesc: "Shielded Twisted Pair (STP) with high braid coverage (&ge; 95%), or Star-Quad cable (four tightly twisted conductors connected in opposite diagonal pairs). Star-Quad reduces induced magnetic hum from AC stage lighting and power transformers by over 30 dB compared to standard twisted pair.",
    receiverDesc: "Differential microphone preamplifier with low equivalent input noise (EIN &le; -129 dBu) and IEC 61938 P48 phantom power (48 VDC &plusmn; 4V delivered through 6.81 k&Omega; matched to 0.1%). Common-mode input impedance ($CMZ_{IN}$) &ge; 10 k&Omega;.",
    svg: `<svg viewBox="0 0 920 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="920" height="280" fill="var(--bg-tertiary)" rx="8"/>
      <!-- Microphone Enclosure -->
      <path d="M 50,60 L 160,60 C 200,60 220,90 220,140 C 220,190 200,220 160,220 L 50,220 Z" fill="#1e293b" stroke="#0ea5e9" stroke-width="2.5"/>
      <text x="135" y="45" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">MIC HOUSING (BRASS CHASSIS)</text>
      <!-- Grille -->
      <path d="M 50,70 L 30,85 C 20,110 20,170 30,195 L 50,210 Z" fill="#0f172a" stroke="#38bdf8" stroke-dasharray="3,3" stroke-width="2"/>
      <text x="35" y="145" fill="#38bdf8" font-size="9" text-anchor="middle">RF GRILLE</text>
      <!-- Floating Capsule -->
      <circle cx="100" cy="140" r="22" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="100" y="144" fill="#f59e0b" font-size="9" font-weight="700" text-anchor="middle">CAPSULE</text>
      <!-- Signal Lines -->
      <line x1="122" y1="130" x2="280" y2="100" stroke="#10b981" stroke-width="2"/>
      <text x="300" y="104" fill="#10b981" font-size="11" font-weight="700">Pin 2 (+)</text>
      <line x1="122" y1="150" x2="280" y2="180" stroke="#ef4444" stroke-width="2"/>
      <text x="300" y="184" fill="#ef4444" font-size="11" font-weight="700">Pin 3 (&minus;)</text>
      <!-- Pin 1 Direct Bond to Shell -->
      <line x1="210" y1="215" x2="280" y2="240" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="210" cy="215" r="5" fill="#10b981"/>
      <text x="300" y="244" fill="#38bdf8" font-size="11" font-weight="700">Pin 1 (BONDED TO SHELL)</text>
      <!-- Star-Quad Cable -->
      <rect x="390" y="70" width="230" height="150" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="505" y="92" fill="#94a3b8" font-size="11" font-weight="700" text-anchor="middle">STAR-QUAD CABLE (4 CONDUCTORS)</text>
      <circle cx="480" cy="130" r="12" fill="#10b981"/>
      <circle cx="530" cy="130" r="12" fill="#ef4444"/>
      <circle cx="480" cy="170" r="12" fill="#ef4444"/>
      <circle cx="530" cy="170" r="12" fill="#10b981"/>
      <text x="480" y="134" fill="#000" font-size="9" font-weight="700" text-anchor="middle">+</text>
      <text x="530" y="134" fill="#000" font-size="9" font-weight="700" text-anchor="middle">&minus;</text>
      <text x="480" y="174" fill="#000" font-size="9" font-weight="700" text-anchor="middle">&minus;</text>
      <text x="530" y="174" fill="#000" font-size="9" font-weight="700" text-anchor="middle">+</text>
      <!-- Preamp Receiver with P48 -->
      <rect x="680" y="60" width="210" height="170" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="785" y="85" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle">MIC PREAMP (P48 PHANTOM)</text>
      <text x="785" y="125" fill="#f59e0b" font-size="10" text-anchor="middle">+48 VDC via 6.81 k&Omega; (0.1%)</text>
      <text x="785" y="155" fill="#38bdf8" font-size="10" text-anchor="middle">Differential INA (EIN -129.5 dBu)</text>
      <text x="785" y="185" fill="#94a3b8" font-size="10" text-anchor="middle">AES48 Chassis Ground Return</text>
    </svg>`,
    norms: [
      "AES26 Polarity: Inward sound pressure compression on diaphragm produces positive voltage on Pin 2 relative to Pin 3.",
      "IEC 61938 P48 Standard: 48 VDC &plusmn; 4V supply through matched 6.81 k&Omega; (&le; 0.1%) resistors. Max current draw: 10 mA.",
      "AES48 Shell Bonding: Pin 1 must make zero-impedance electrical contact with the outer metal casing directly at the connector insert.",
      "SC-04-04 Quality Standard: Disclose capsule self-noise, impedance balance percentage (&le; 1%), and RF demodulation susceptibility."
    ]
  },

  line: {
    title: "Analog Line Source (AES14 / XLR & TRS)",
    subtitle: "Standard Pro Audio (+4 dBu / 1.228 VRMS) and Consumer (-10 dBV / 0.316 VRMS) Small-Signal Line Interconnect",
    badge: "Line Level: +4 dBu (1.23 V) &bull; Clip Ceiling +24 dBu",
    boxDesc: "Standard 19-inch rack-mount equipment chassis (painted or anodized aluminum/steel). The metallic chassis acts as a Faraday shield. Safety earth wire (green/yellow) is securely bolted directly to a dedicated threaded stud with locking star washers to ensure life-safety compliance (NFPA 70 / NEC).",
    connectorDesc: "3-pin XLR (AES14) or 1/4-inch concentric TRS jacks (AES14id). Pin 1 / Sleeve contact is bonded with negligible impedance (< 0.1 &Omega;) directly to the metallic chassis wall at the cutout. Never route Pin 1 through the internal audio circuit board trace!",
    wireDesc: "Precision balanced Shielded Twisted Pair (STP) with drain wire and aluminum/mylar foil or braided copper shield. Characteristic mutual capacitance ($C_{DM}$) &le; 80 pF/m. Core-to-shield capacitance balance matched within 2% to preserve high-frequency CMRR beyond 20 kHz.",
    receiverDesc: "High-impedance differential bridging receiver ($DMZ_{IN} &ge; 10\,\text{k}\Omega$, $CMZ_{IN} &ge; 20\,\text{k}\Omega$) driven by low output impedance ($DMZ_{OUT} &le; 100\,\Omega$). 100:1 impedance ratio eliminates cable loading and reflection issues.",
    svg: `<svg viewBox="0 0 920 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="920" height="260" fill="var(--bg-tertiary)" rx="8"/>
      <!-- Source Box -->
      <rect x="40" y="40" width="220" height="180" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
      <text x="150" y="65" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">PRO AUDIO DAC / PREAMP</text>
      <!-- Low-Z Driver -->
      <polygon points="80,100 80,160 140,130" fill="#0f172a" stroke="#0ea5e9" stroke-width="2"/>
      <text x="110" y="134" fill="#38bdf8" font-size="9" text-anchor="middle">LOW-Z</text>
      <!-- Output Resistors -->
      <line x1="140" y1="115" x2="200" y2="115" stroke="#10b981" stroke-width="2"/>
      <rect x="170" y="108" width="30" height="14" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <text x="185" y="119" fill="#10b981" font-size="8.5" text-anchor="middle">50&Omega;</text>
      <circle cx="250" cy="115" r="5" fill="#10b981"/>
      <text x="270" y="119" fill="#10b981" font-size="11" font-weight="700">Pin 2 (Hot)</text>
      
      <line x1="140" y1="145" x2="200" y2="145" stroke="#ef4444" stroke-width="2"/>
      <rect x="170" y="138" width="30" height="14" fill="#0f172a" stroke="#ef4444" stroke-width="1.5"/>
      <text x="185" y="149" fill="#ef4444" font-size="8.5" text-anchor="middle">50&Omega;</text>
      <circle cx="250" cy="145" r="5" fill="#ef4444"/>
      <text x="270" y="149" fill="#ef4444" font-size="11" font-weight="700">Pin 3 (Cold)</text>

      <!-- Pin 1 Chassis Bond -->
      <circle cx="250" cy="185" r="5" fill="#38bdf8"/>
      <line x1="250" y1="185" x2="250" y2="210" stroke="#38bdf8" stroke-width="3"/>
      <text x="270" y="190" fill="#38bdf8" font-size="11" font-weight="700">Pin 1 (Chassis Wall)</text>

      <!-- STP Cable -->
      <rect x="370" y="85" width="220" height="90" rx="6" fill="#0f172a" stroke="#94a3b8" stroke-width="1.5"/>
      <text x="480" y="105" fill="#94a3b8" font-size="10" font-weight="700" text-anchor="middle">PRECISION BALANCED STP CABLE</text>
      <line x1="370" y1="125" x2="590" y2="125" stroke="#10b981" stroke-width="2"/>
      <line x1="370" y1="145" x2="590" y2="145" stroke="#ef4444" stroke-width="2"/>
      <line x1="370" y1="165" x2="590" y2="165" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="480" y="158" fill="#38bdf8" font-size="8.5" text-anchor="middle">Shield Braid / Drain Wire</text>

      <!-- Receiver Bridging Box -->
      <rect x="660" y="40" width="220" height="180" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="770" y="65" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle">BRIDGING RECEIVER</text>
      <polygon points="730,105 730,165 790,135" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="755" y="139" fill="#10b981" font-size="9" text-anchor="middle">DIFF INA</text>
      <text x="770" y="185" fill="#94a3b8" font-size="9.5" text-anchor="middle">Z_IN &ge; 20 k&Omega; Bridging</text>
    </svg>`,
    norms: [
      "Bridging Ratio: Z_IN (&ge; 10 k&Omega;) must be at least 10 times Z_OUT (&le; 100 &Omega;) to eliminate signal loss and non-linear loading.",
      "AES48 Direct Chassis Bond: Pin 1 / Sleeve must be bonded directly to the metallic panel opening with < 0.1 &Omega; impedance.",
      "AES26 Polarity: Pin 2 Hot, Pin 3 Return. Tip = Hot, Ring = Cold, Sleeve = Shield on 1/4-inch TRS jacks (AES14id).",
      "Headroom Rating: Modern professional line interfaces maintain at least 20 dB of headroom above +4 dBu nominal operating level."
    ]
  },

  aes3: {
    title: "Digital AES3 & Master Clock Synchronization (AES11)",
    subtitle: "110 &Omega; Balanced Digital Transmission of 2-Channel Linear PCM Audio with DARS Master Sync",
    badge: "AES3 Digital &bull; 110 &Omega; Balanced &bull; AES11 DARS Sync",
    boxDesc: "Digital audio processors, hardware converters, and master clock generators. Because AES3 transmits bi-phase mark encoded square waves with transition speeds in the tens of megahertz, the equipment chassis must provide high-integrity RF containment to meet FCC Part 15 / CISPR electromagnetic emissions standards.",
    connectorDesc: "3-pin XLR (AES3-1992) or 25-way D-sub (AES59). Characteristic impedance strictly specified at 110 &Omega;. Pulse isolation transformers are integrated inside the box at transmitter and receiver ports to provide DC isolation and common-mode RF suppression.",
    wireDesc: "Dedicated 110 &Omega; digital audio cable ($Z_0 = 110\,\Omega \pm 20\%$). Standard analog audio cable MUST NOT be used for long AES3 runs; the incorrect impedance causes transmission line reflections, eye pattern closure, and high digital bit jitter.",
    receiverDesc: "Pulse transformer coupled digital line receiver with adaptive equalization and phase-locked loop (PLL) clock recovery. AES11 defines the recommended practice for synchronizing multiple digital devices using DARS (Digital Audio Reference Signal).",
    svg: `<svg viewBox="0 0 920 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="920" height="260" fill="var(--bg-tertiary)" rx="8"/>
      <!-- Digital Transmitter -->
      <rect x="40" y="40" width="220" height="180" rx="6" fill="#1e293b" stroke="#0ea5e9" stroke-width="2"/>
      <text x="150" y="65" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">AES3 DIGITAL TRANSMITTER</text>
      <!-- RS422 Driver & Pulse Tx -->
      <rect x="60" y="90" width="60" height="40" fill="#0f172a" stroke="#0ea5e9" stroke-width="1.5"/>
      <text x="90" y="115" fill="#38bdf8" font-size="9" text-anchor="middle">RS422 PHY</text>
      <!-- Pulse Transformer -->
      <circle cx="170" cy="110" r="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="170" y="114" fill="#f59e0b" font-size="8.5" text-anchor="middle">1:1 Tx</text>
      <text x="150" y="150" fill="#f8fafc" font-size="9" text-anchor="middle">Z_OUT = 110 &Omega;</text>
      <line x1="184" y1="105" x2="250" y2="105" stroke="#10b981" stroke-width="2"/>
      <line x1="184" y1="115" x2="250" y2="115" stroke="#ef4444" stroke-width="2"/>
      <circle cx="250" cy="105" r="4" fill="#10b981"/>
      <circle cx="250" cy="115" r="4" fill="#ef4444"/>

      <!-- 110 Ohm Cable -->
      <rect x="350" y="80" width="240" height="100" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="470" y="105" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">110 &Omega; CONTROLLED IMPEDANCE CABLE</text>
      <path d="M 370,125 L 390,125 L 390,145 L 420,145 L 420,125 L 450,125 L 450,145 L 480,145 L 480,125 L 510,125 L 510,145 L 540,145 L 540,125 L 570,125" fill="none" stroke="#10b981" stroke-width="2"/>
      <text x="470" y="165" fill="#94a3b8" font-size="9" text-anchor="middle">Bi-Phase Mark Encoded Digital Bitstream (2&ndash;7 Vpp)</text>

      <!-- Digital Receiver -->
      <rect x="660" y="40" width="220" height="180" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="770" y="65" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle">DIGITAL RECEIVER (AES11)</text>
      <circle cx="730" cy="110" r="14" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="730" y="114" fill="#f59e0b" font-size="8.5" text-anchor="middle">1:1 Rx</text>
      <rect x="765" y="90" width="75" height="40" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <text x="802" y="115" fill="#34d399" font-size="9" text-anchor="middle">PLL CLOCK</text>
      <text x="770" y="165" fill="#f59e0b" font-size="9.5" text-anchor="middle">AES11 DARS Sync Reference</text>
      <text x="770" y="185" fill="#94a3b8" font-size="9" text-anchor="middle">Z_IN = 110 &Omega; Terminated</text>
    </svg>`,
    norms: [
      "AES3 Transmission Impedance: Balanced driver output impedance 110 &Omega; &plusmn; 20%; receiver termination 110 &Omega; &plusmn; 20%.",
      "AES11 DARS Synchronization: Master studio clock distributed as AES3-compliant bitstream with null audio to align sample clocks.",
      "Transformer Isolation: Pulse transformers must provide &ge; 500 V galvanic isolation and &gt; 30 dB common-mode rejection at 6 MHz.",
      "Cable Requirement: Controlled 110 &Omega; characteristic impedance prevents reflections and digital jitter."
    ]
  },

  db25: {
    title: "Multi-Channel 25-way D-Sub (AES59 & AES-X249)",
    subtitle: "High-Density 8-Channel Balanced Audio Interconnect &bull; Lessons from AES-X249 Merged into AES48",
    badge: "AES59 &bull; AES-X249 &bull; 8 Balanced Channels &bull; Shroud Flange Csf &bull; Jack Screws Cjs",
    boxDesc: "Multi-channel converters, 8-channel preamps, and console patch points. High connector density creates critical grounding challenges. AES-X249 establishes that the connector shroud flange ($C_{sf}$) and contact jack screws ($C_{js}$) must make direct 360-degree metal-to-metal contact with the exterior metallic enclosure.",
    connectorDesc: "25-pin D-subminiature (AES59). The trapezoidal metal shell provides mechanical alignment and shield bonding. WARNING: Paint between the shroud flange and chassis acts as an insulator, destroying shield continuity and causing catastrophic RF leakage! Paint must be masked or removed at mounting cutouts.",
    wireDesc: "8-pair individually shielded multipair snake cable. Designated shield contacts ($D_{sc}$) must pass through the printed circuit board via a DEDICATED SHIELD PLANE directly to the jack screws and chassis wall&mdash;COMPLETELY ISOLATED from sensitive audio 0V circuitry!",
    receiverDesc: "8-channel differential receiver array. Crucial Rule from AES59 / AES-X249: PIN 13 IS UNUSED. The overall cable shield ($S_O$) MUST NOT be connected to Pin 13! If an overall shield is present, it must be bonded directly to the metal backshell / shielding enclosure.",
    svg: `<svg viewBox="0 0 920 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="920" height="280" fill="var(--bg-tertiary)" rx="8"/>
      <!-- Equipment Enclosure Wall -->
      <line x1="280" y1="20" x2="280" y2="260" stroke="#38bdf8" stroke-width="6"/>
      <text x="260" y="35" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="end">METALLIC ENCLOSURE WALL</text>

      <!-- DB25 Connector Shroud Flange (Csf) -->
      <path d="M 277,50 L 320,65 L 320,215 L 277,230 Z" fill="#1e293b" stroke="#0ea5e9" stroke-width="2.5"/>
      <text x="310" y="145" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle" transform="rotate(-90 310 145)">SHROUD FLANGE (Csf)</text>

      <!-- Jack Screws (Cjs) -->
      <rect x="265" y="45" width="26" height="14" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
      <text x="278" y="56" fill="#000" font-size="8" font-weight="700" text-anchor="middle">Cjs</text>
      <rect x="265" y="221" width="26" height="14" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
      <text x="278" y="232" fill="#000" font-size="8" font-weight="700" text-anchor="middle">Cjs</text>

      <!-- Warning callout: Paint Insulation -->
      <rect x="40" y="45" width="200" height="45" rx="4" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="140" y="62" fill="#fb7185" font-size="9.5" font-weight="700" text-anchor="middle">WARNING: AVOID PAINTED METAL!</text>
      <text x="140" y="78" fill="#fda4af" font-size="8.5" text-anchor="middle">Direct metal contact required at Csf/Cjs</text>

      <!-- Dedicated PCB Shield Plane -->
      <rect x="60" y="120" width="180" height="90" rx="4" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      <text x="150" y="140" fill="#34d399" font-size="10" font-weight="700" text-anchor="middle">DEDICATED PCB SHIELD PLANE</text>
      <text x="150" y="160" fill="#94a3b8" font-size="8.5" text-anchor="middle">Channel shields pass to Cjs &amp; Csf</text>
      <text x="150" y="180" fill="#f43f5e" font-size="8.5" font-weight="700" text-anchor="middle">ISOLATED FROM AUDIO 0V!</text>
      <line x1="240" y1="165" x2="277" y2="165" stroke="#10b981" stroke-width="3"/>

      <!-- AES59 Pinout Display Right -->
      <rect x="360" y="40" width="530" height="200" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="625" y="65" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">AES59 PINOUT &bull; 8 BALANCED CHANNELS</text>
      
      <!-- Table of Pins -->
      <text x="390" y="95" fill="#10b981" font-size="10" font-weight="700">Ch 1: Pin 24 (+), 12 (&minus;), 25 (GND)</text>
      <text x="390" y="115" fill="#10b981" font-size="10" font-weight="700">Ch 2: Pin 10 (+), 23 (&minus;), 11 (GND)</text>
      <text x="390" y="135" fill="#10b981" font-size="10" font-weight="700">Ch 3: Pin 21 (+), 9 (&minus;), 22 (GND)</text>
      <text x="390" y="155" fill="#10b981" font-size="10" font-weight="700">Ch 4: Pin 7 (+), 20 (&minus;), 8 (GND)</text>

      <text x="660" y="95" fill="#10b981" font-size="10" font-weight="700">Ch 5: Pin 18 (+), 6 (&minus;), 19 (GND)</text>
      <text x="660" y="115" fill="#10b981" font-size="10" font-weight="700">Ch 6: Pin 4 (+), 17 (&minus;), 5 (GND)</text>
      <text x="660" y="135" fill="#10b981" font-size="10" font-weight="700">Ch 7: Pin 15 (+), 3 (&minus;), 16 (GND)</text>
      <text x="660" y="155" fill="#10b981" font-size="10" font-weight="700">Ch 8: Pin 1 (+), 14 (&minus;), 2 (GND)</text>

      <!-- Pin 13 Warning -->
      <rect x="390" y="180" width="470" height="45" rx="4" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="625" y="198" fill="#f87171" font-size="11" font-weight="700" text-anchor="middle">CRITICAL AES-X249 RULE: PIN 13 IS UNUSED</text>
      <text x="625" y="214" fill="#fecdd3" font-size="9" text-anchor="middle">Overall cable shield (So) MUST NOT connect to Pin 13! Bond directly to metal backshell.</text>
    </svg>`,
    norms: [
      "Contact Shroud Flange (Csf): Connector shroud must make direct metal-to-metal contact with the chassis cutout opening.",
      "Contact Jack Screws (Cjs): 4-40 hexagonal standoffs provide mechanical retention AND electrical shield bonding to the enclosure.",
      "Warning on Painted Metal: Paint on the chassis enclosure insulates the shroud, causing catastrophic RF shield leakage. Must be bare metal.",
      "Pin 13 Prohibition: According to AES59, Pin 13 is UNUSED. Overall cable shield ($S_O$) must NEVER be tied to Pin 13; it must bond 360&deg; to the backshell.",
      "Dedicated Shield Plane: Designated shield contacts ($D_{sc}$) must connect to chassis via a segregated PCB shield plane, never mixing with audio 0V."
    ]
  },

  rj45: {
    title: "Quad Twisted Pair (AES72 & AES72-4E / RJ45)",
    subtitle: "Transporting 4 Balanced Audio Links over Category Cable &bull; The 'Even Pins Positive' Polarity Standard",
    badge: "AES72-4E &bull; 4 Balanced Links &bull; Even Pins Positive &bull; etherCON Shielded P48",
    boxDesc: "Modern stage snakes, broadcast patchbays, and networked breakout boxes. Uses cost-effective Cat5e/Cat6/Cat7 cable with 8P8C (RJ45) or ruggedized Neutrik etherCON connectors. Standardizes link assignments and pin polarity across manufacturers.",
    connectorDesc: "Shielded 8P8C / etherCON with 360-degree metallic ground collar. AES72 Section 4.3 MANDATES: When phantom power (P48) is utilized for condenser microphones, SHIELDED connectors and shielded cable are REQUIRED, as the cable shield is the ONLY DC return path for phantom currents!",
    wireDesc: "Category 5e / 6 / 6A / 7 Quad Twisted Pair (QTP). High twist symmetry provides exceptional common-mode noise rejection. Star-quad or high twist rates prevent inter-pair crosstalk down to below -90 dB at 20 kHz.",
    receiverDesc: "4-channel balanced differential receiver array. AES72-4E establishes the universal link order and link polarity across all 4 channels.",
    svg: `<svg viewBox="0 0 920 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
      <rect width="920" height="280" fill="var(--bg-tertiary)" rx="8"/>
      <!-- RJ45 Connector Body -->
      <rect x="40" y="40" width="240" height="200" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
      <text x="160" y="65" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">AES72-4E RJ45 / etherCON JACK</text>
      
      <!-- etherCON Metallic Shield Shell -->
      <rect x="250" y="60" width="25" height="160" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="262" y="140" fill="#f59e0b" font-size="9" font-weight="700" text-anchor="middle" transform="rotate(-90 262 140)">360&deg; SHIELD COLLAR</text>
      <!-- Direct Bond to Chassis -->
      <line x1="275" y1="140" x2="310" y2="140" stroke="#f59e0b" stroke-width="3"/>
      <circle cx="310" cy="140" r="5" fill="#10b981"/>
      <text x="325" y="144" fill="#10b981" font-size="10" font-weight="700">CHASSIS BOND</text>

      <!-- Pin Map Table Inside Card -->
      <rect x="360" y="40" width="530" height="200" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <text x="625" y="65" fill="#34d399" font-size="12" font-weight="700" text-anchor="middle">AES72-4E PINOUT &bull; EVEN PINS POSITIVE (+)</text>

      <text x="390" y="95" fill="#38bdf8" font-size="11" font-weight="700">Link 1: Pin 1 (&minus; W/OR) &bull; Pin 2 (+ OR)</text>
      <text x="390" y="115" fill="#94a3b8" font-size="9.5">Pair 2 (TIA-568) &bull; Even Pin 2 is Positive (+)</text>

      <text x="390" y="140" fill="#38bdf8" font-size="11" font-weight="700">Link 2: Pin 3 (&minus; W/GR) &bull; Pin 6 (+ GR)</text>
      <text x="390" y="160" fill="#94a3b8" font-size="9.5">Pair 3 (Ethernet Split Pair) &bull; Even Pin 6 is Positive (+)</text>

      <text x="660" y="95" fill="#38bdf8" font-size="11" font-weight="700">Link 3: Pin 5 (&minus; W/BL) &bull; Pin 4 (+ BL)</text>
      <text x="660" y="115" fill="#94a3b8" font-size="9.5">Pair 1 (Center Pair) &bull; Even Pin 4 is Positive (+)</text>

      <text x="660" y="140" fill="#38bdf8" font-size="11" font-weight="700">Link 4: Pin 7 (&minus; W/BR) &bull; Pin 8 (+ BR)</text>
      <text x="660" y="160" fill="#94a3b8" font-size="9.5">Pair 4 &bull; Even Pin 8 is Positive (+)</text>

      <!-- Phantom Power Callout -->
      <rect x="390" y="180" width="470" height="45" rx="4" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.5"/>
      <text x="625" y="198" fill="#34d399" font-size="11" font-weight="700" text-anchor="middle">MANDATORY SHIELD FOR PHANTOM POWER (P48)</text>
      <text x="625" y="214" fill="#a7f3d0" font-size="9" text-anchor="middle">AES72 Sec 4.3: Shield is the sole DC return path for mic phantom current! Unshielded cable fails.</text>
    </svg>`,
    norms: [
      "AES72-4E 'Even = Positive' Rule: Solid colored conductors on even pins (2, 4, 6, 8) carry positive (+); striped conductors on odd pins (1, 3, 5, 7) carry return (-).",
      "Ethernet Split Pair: Link 2 uses pins 3 and 6 (surrounding center pins 4 & 5), fully compatible with standard RJ45 networking hardware.",
      "Mandatory Shield for P48: When carrying microphone lines, shielded cable (STP/FTP) and shielded RJ45/etherCON jacks are mandatory as phantom DC return.",
      "Equipment Labeling: Hardware compliant with AES72 must be visibly marked 'AES72 Type 4E' near the RJ45 jack."
    ]
  }
};

function selectBoxType(typeKey) {
  const data = BOX_TYPES[typeKey];
  if (!data) return;

  // Update tabs
  document.querySelectorAll(".circuit-tabs-nav .circuit-tab-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`btn-box-${typeKey}`);
  if (activeBtn) activeBtn.classList.add("active");

  const card = document.getElementById("box-display-card");
  if (!card) return;

  card.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      <div>
        <h3 style="margin: 0; color: var(--accent-cyan); font-size: 1.4rem;">${data.title}</h3>
        <span style="font-size: 0.9rem; color: var(--text-secondary);">${data.subtitle}</span>
      </div>
      <span class="badge badge-primary" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">${data.badge}</span>
    </div>

    <!-- 4-Stage Architectural Breakdown -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
        <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">[01] The Box (Enclosure)</span>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.35rem 0 0; line-height: 1.4;">${data.boxDesc}</p>
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
        <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">[02] The Connector</span>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.35rem 0 0; line-height: 1.4;">${data.connectorDesc}</p>
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
        <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">[03] The Cable / Wire</span>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.35rem 0 0; line-height: 1.4;">${data.wireDesc}</p>
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem;">
        <span style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase;">[04] The Receiver</span>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0.35rem 0 0; line-height: 1.4;">${data.receiverDesc}</p>
      </div>
    </div>

    <!-- Vector SVG Schematic -->
    <div class="svg-diagram-wrapper" style="margin: 1rem 0;">
      ${data.svg}
    </div>

    <!-- Normative Engineering Takeaways -->
    <div style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem; margin-top: 1rem;">
      <h5 style="margin: 0 0 0.5rem; color: var(--accent-cyan); font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.04em;">
        Critical Hardware &amp; Interconnection Norms:
      </h5>
      <ul style="margin: 0; padding-left: 1.2rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
        ${data.norms.map(norm => `<li>${norm}</li>`).join("")}
      </ul>
    </div>
  `;
}

// Navigation Jump Helpers
function switchCircuit(circuitKey) {
  const el = document.getElementById(`circuit-${circuitKey}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.circuit-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[onclick*="switchCircuit('${circuitKey}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

function switchTermsTab(tabKey) {
  const el = document.getElementById(`terms-${tabKey}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.terms-tab-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[onclick*="switchTermsTab('${tabKey}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Default box type
  selectBoxType("mic");

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
