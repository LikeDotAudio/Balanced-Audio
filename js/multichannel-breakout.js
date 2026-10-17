/**
 * Multichannel Audio Hierarchy, Cable Shield & Fault Simulator Engine
 * Architecture: AES59 (8-Ch DB25) -> AES72-4E (4-Ch RJ45) -> 4x XLR or 4x TRS
 * TIA-568-B Pair Color Mnemonic: SUN (Orange), SKY (Blue), GRASS (Green), EARTH (Brown)
 * Pins 2, 4, 6, 8 are positive (+)
 * Standards: AES59, AES-X249, AES72-4E, AES14, AES48, AES26, TIA-568-B
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

const MULTICHANNEL_DATA = {
  tiaPairs: [
    { name: "SUN", colorName: "Orange", hex: "#f97316", hotPin: 2, coldPin: 1, pairNum: 2, desc: "Pair 2 • Pin 2 (+) Solid Orange | Pin 1 (-) White/Orange" },
    { name: "SKY", colorName: "Blue", hex: "#38bdf8", hotPin: 4, coldPin: 5, pairNum: 1, desc: "Pair 1 • Pin 4 (+) Solid Blue | Pin 5 (-) White/Blue" },
    { name: "GRASS", colorName: "Green", hex: "#10b981", hotPin: 6, coldPin: 3, pairNum: 3, desc: "Pair 3 • Pin 6 (+) Solid Green | Pin 3 (-) White/Green" },
    { name: "EARTH", colorName: "Brown", hex: "#ca8a04", hotPin: 8, coldPin: 7, pairNum: 4, desc: "Pair 4 • Pin 8 (+) Solid Brown | Pin 7 (-) White/Brown" }
  ],
  channels: [
    {
      ch: 1,
      bank: "Bank A (Ch 1–4) • RJ45 #1",
      link: "Link 1",
      mnemonic: "SUN",
      pairColor: "Orange",
      db25: { hot: 24, cold: 12, shield: 25 },
      rj45: { pair: "Pair 2 (SUN: Orange / White-Orange)", hotPin: 2, coldPin: 1, mnemonic: "SUN (Orange)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#f97316"
    },
    {
      ch: 2,
      bank: "Bank A (Ch 1–4) • RJ45 #1",
      link: "Link 2",
      mnemonic: "GRASS",
      pairColor: "Green",
      db25: { hot: 10, cold: 23, shield: 11 },
      rj45: { pair: "Pair 3 (GRASS: Green / White-Green)", hotPin: 6, coldPin: 3, mnemonic: "GRASS (Green)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#10b981"
    },
    {
      ch: 3,
      bank: "Bank A (Ch 1–4) • RJ45 #1",
      link: "Link 3",
      mnemonic: "SKY",
      pairColor: "Blue",
      db25: { hot: 21, cold: 9, shield: 22 },
      rj45: { pair: "Pair 1 (SKY: Blue / White-Blue)", hotPin: 4, coldPin: 5, mnemonic: "SKY (Blue)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#38bdf8"
    },
    {
      ch: 4,
      bank: "Bank A (Ch 1–4) • RJ45 #1",
      link: "Link 4",
      mnemonic: "EARTH",
      pairColor: "Brown",
      db25: { hot: 7, cold: 20, shield: 8 },
      rj45: { pair: "Pair 4 (EARTH: Brown / White-Brown)", hotPin: 8, coldPin: 7, mnemonic: "EARTH (Brown)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#ca8a04"
    },
    {
      ch: 5,
      bank: "Bank B (Ch 5–8) • RJ45 #2",
      link: "Link 1",
      mnemonic: "SUN",
      pairColor: "Orange",
      db25: { hot: 18, cold: 6, shield: 19 },
      rj45: { pair: "Pair 2 (SUN: Orange / White-Orange)", hotPin: 2, coldPin: 1, mnemonic: "SUN (Orange)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#f97316"
    },
    {
      ch: 6,
      bank: "Bank B (Ch 5–8) • RJ45 #2",
      link: "Link 2",
      mnemonic: "GRASS",
      pairColor: "Green",
      db25: { hot: 4, cold: 17, shield: 5 },
      rj45: { pair: "Pair 3 (GRASS: Green / White-Green)", hotPin: 6, coldPin: 3, mnemonic: "GRASS (Green)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#10b981"
    },
    {
      ch: 7,
      bank: "Bank B (Ch 5–8) • RJ45 #2",
      link: "Link 3",
      mnemonic: "SKY",
      pairColor: "Blue",
      db25: { hot: 15, cold: 3, shield: 16 },
      rj45: { pair: "Pair 1 (SKY: Blue / White-Blue)", hotPin: 4, coldPin: 5, mnemonic: "SKY (Blue)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#38bdf8"
    },
    {
      ch: 8,
      bank: "Bank B (Ch 5–8) • RJ45 #2",
      link: "Link 4",
      mnemonic: "EARTH",
      pairColor: "Brown",
      db25: { hot: 1, cold: 14, shield: 2 },
      rj45: { pair: "Pair 4 (EARTH: Brown / White-Brown)", hotPin: 8, coldPin: 7, mnemonic: "EARTH (Brown)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#ca8a04"
    }
  ]
};

// ==========================================================================
// Snake & QTP Shield & Cable Fault Simulator Engine
// ==========================================================================
class QTPSimulatorEngine {
  constructor() {
    this.currentFault = "normal";
    this.init();
  }

  init() {
    this.bindButtons();
    this.render();
  }

  bindButtons() {
    document.querySelectorAll(".fault-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".fault-btn").forEach(b => {
          b.classList.remove("active", "danger", "amber");
        });
        btn.classList.add("active");
        if (btn.dataset.fault === "phase_flip") btn.classList.add("amber");
        else if (btn.dataset.fault !== "normal") btn.classList.add("danger");

        this.setFault(btn.dataset.fault);
      });
    });
  }

  setFault(faultKey) {
    this.currentFault = faultKey;
    this.render();
  }

  render() {
    this.renderSVG();
    this.updateDiagnostics();
  }

  renderSVG() {
    const container = document.getElementById("qtp-sim-svg-container");
    if (!container) return;

    const f = this.currentFault;
    const isPhaseFlip = f === "phase_flip";
    const isPin1Drop = f === "pin_dropped_1";
    const isPin2Drop = f === "pin_dropped_2";
    const isPin3Drop = f === "pin_dropped_3";
    const isPin4Drop = f === "pin_dropped_4";
    const isPairDrop = f === "pair_dropped";
    const isShieldLift = f === "shield_lifted";

    // Wire status flags
    const wireState = {
      sun_hot: !isPin1Drop && !isPin3Drop && !isPin4Drop && !isPairDrop,
      sun_cold: !isPin2Drop && !isPin3Drop && !isPin4Drop && !isPairDrop,
      sky_hot: !isPin4Drop,
      sky_cold: !isPin4Drop,
      grass_hot: !isPin3Drop && !isPin4Drop,
      grass_cold: !isPin2Drop && !isPin3Drop && !isPin4Drop,
      earth_hot: true,
      earth_cold: true,
      shield: !isShieldLift
    };

    container.innerHTML = `
      <svg viewBox="0 0 920 340" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background: #060910; border-radius: 8px;">
        <defs>
          <pattern id="shield-braid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0,4 L 8,4 M 4,0 L 4,8 M 0,0 L 8,8 M 8,0 L 0,8" stroke="#475569" stroke-width="0.8" opacity="0.6"/>
          </pattern>
        </defs>

        <!-- Outer Cable Sheath (Cutaway View) -->
        <rect x="50" y="30" width="780" height="270" rx="14" fill="#0b111e" stroke="#334155" stroke-width="2"/>
        <text x="65" y="52" fill="#94a3b8" font-size="11" font-weight="700">HEAVY-DUTY OUTER JACKET (PUR / PVC)</text>

        <!-- 360-Degree Overall Braided/Foil Shield Layer -->
        <rect x="75" y="65" width="730" height="215" rx="10" fill="url(#shield-braid)" stroke="${wireState.shield ? '#38bdf8' : '#ef4444'}" stroke-width="${wireState.shield ? '2' : '2.5'}" stroke-dasharray="${wireState.shield ? 'none' : '5,5'}"/>
        
        <!-- Shield Collar Ground Lug Bond (AES48) -->
        <g transform="translate(770, 75)">
          <rect x="0" y="0" width="30" height="195" rx="4" fill="${wireState.shield ? '#10b981' : '#ef4444'}" opacity="0.8"/>
          <text x="15" y="100" fill="#0f172a" font-size="9" font-weight="800" text-anchor="middle" transform="rotate(-90 15 100)">
            ${wireState.shield ? '360° CHASSIS BOND (AES48)' : 'SHIELD LIFTED (OPEN!)'}
          </text>
        </g>

        <!-- 4 TIA-568-B Twisted Pairs Inside Cable -->
        <!-- PAIR 2: SUN (ORANGE) - Link 1: Pin 2 (+) / Pin 1 (-) -->
        <g transform="translate(100, 85)">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="${wireState.sun_hot && wireState.sun_cold ? '#f97316' : '#ef4444'}" stroke-width="1.5"/>
          <text x="15" y="18" fill="#f97316" font-size="10" font-weight="800">SUN • Pair 2</text>
          
          <!-- Pin 2 Hot Wire (Solid Orange) -->
          <line x1="120" y1="12" x2="620" y2="12" stroke="#f97316" stroke-width="3" stroke-dasharray="${wireState.sun_hot ? 'none' : '6,4'}"/>
          <circle cx="120" cy="12" r="5" fill="#f97316"/>
          <circle cx="620" cy="12" r="5" fill="${wireState.sun_hot ? '#f97316' : '#ef4444'}"/>
          <text x="100" y="15" fill="#f97316" font-size="9" font-weight="700">P2 (+)</text>
          <text x="630" y="15" fill="${wireState.sun_hot ? '#f97316' : '#ef4444'}" font-size="9" font-weight="700">
            ${isPhaseFlip ? 'P2 (180° FLIPPED!)' : (wireState.sun_hot ? 'P2 (HOT +)' : 'P2 (DROPPED!)')}
          </text>

          <!-- Pin 1 Cold Wire (White/Orange Stripe) -->
          <line x1="120" y1="26" x2="620" y2="26" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="${wireState.sun_cold ? '8,4' : '4,4'}" opacity="${wireState.sun_cold ? '1' : '0.4'}"/>
          <circle cx="120" cy="26" r="4" fill="#fb923c"/>
          <circle cx="620" cy="26" r="4" fill="${wireState.sun_cold ? '#fb923c' : '#ef4444'}"/>
          <text x="100" y="29" fill="#fed7aa" font-size="8.5">P1 (&minus;)</text>
          <text x="630" y="29" fill="${wireState.sun_cold ? '#fed7aa' : '#ef4444'}" font-size="8.5">
            ${wireState.sun_cold ? 'P1 (COLD &minus;)' : 'P1 (DROPPED!)'}
          </text>
        </g>

        <!-- PAIR 1: SKY (BLUE) - Link 3: Pin 4 (+) / Pin 5 (-) -->
        <g transform="translate(100, 132)">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="${wireState.sky_hot ? '#38bdf8' : '#ef4444'}" stroke-width="1.5"/>
          <text x="15" y="18" fill="#38bdf8" font-size="10" font-weight="800">SKY • Pair 1</text>
          
          <!-- Pin 4 Hot Wire (Solid Blue) -->
          <line x1="120" y1="12" x2="620" y2="12" stroke="#38bdf8" stroke-width="3" stroke-dasharray="${wireState.sky_hot ? 'none' : '6,4'}"/>
          <circle cx="120" cy="12" r="5" fill="#38bdf8"/>
          <circle cx="620" cy="12" r="5" fill="${wireState.sky_hot ? '#38bdf8' : '#ef4444'}"/>
          <text x="100" y="15" fill="#38bdf8" font-size="9" font-weight="700">P4 (+)</text>
          <text x="630" y="15" fill="${wireState.sky_hot ? '#38bdf8' : '#ef4444'}" font-size="9" font-weight="700">
            ${wireState.sky_hot ? 'P4 (HOT +)' : 'P4 (DROPPED!)'}
          </text>

          <!-- Pin 5 Cold Wire (White/Blue Stripe) -->
          <line x1="120" y1="26" x2="620" y2="26" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="${wireState.sky_cold ? '8,4' : '4,4'}" opacity="${wireState.sky_cold ? '1' : '0.4'}"/>
          <circle cx="120" cy="26" r="4" fill="#7dd3fc"/>
          <circle cx="620" cy="26" r="4" fill="${wireState.sky_cold ? '#7dd3fc' : '#ef4444'}"/>
          <text x="100" y="29" fill="#bae6fd" font-size="8.5">P5 (&minus;)</text>
          <text x="630" y="29" fill="${wireState.sky_cold ? '#bae6fd' : '#ef4444'}" font-size="8.5">
            ${wireState.sky_cold ? 'P5 (COLD &minus;)' : 'P5 (DROPPED!)'}
          </text>
        </g>

        <!-- PAIR 3: GRASS (GREEN) - Link 2: Pin 6 (+) / Pin 3 (-) -->
        <g transform="translate(100, 179)">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="${wireState.grass_hot && wireState.grass_cold ? '#10b981' : '#ef4444'}" stroke-width="1.5"/>
          <text x="15" y="18" fill="#10b981" font-size="10" font-weight="800">GRASS • Pair 3</text>
          
          <!-- Pin 6 Hot Wire (Solid Green) -->
          <line x1="120" y1="12" x2="620" y2="12" stroke="#10b981" stroke-width="3" stroke-dasharray="${wireState.grass_hot ? 'none' : '6,4'}"/>
          <circle cx="120" cy="12" r="5" fill="#10b981"/>
          <circle cx="620" cy="12" r="5" fill="${wireState.grass_hot ? '#10b981' : '#ef4444'}"/>
          <text x="100" y="15" fill="#10b981" font-size="9" font-weight="700">P6 (+)</text>
          <text x="630" y="15" fill="${wireState.grass_hot ? '#10b981' : '#ef4444'}" font-size="9" font-weight="700">
            ${wireState.grass_hot ? 'P6 (HOT +)' : 'P6 (DROPPED!)'}
          </text>

          <!-- Pin 3 Cold Wire (White/Green Stripe) -->
          <line x1="120" y1="26" x2="620" y2="26" stroke="#6ee7b7" stroke-width="2.5" stroke-dasharray="${wireState.grass_cold ? '8,4' : '4,4'}" opacity="${wireState.grass_cold ? '1' : '0.4'}"/>
          <circle cx="120" cy="26" r="4" fill="#6ee7b7"/>
          <circle cx="620" cy="26" r="4" fill="${wireState.grass_cold ? '#6ee7b7' : '#ef4444'}"/>
          <text x="100" y="29" fill="#a7f3d0" font-size="8.5">P3 (&minus;)</text>
          <text x="630" y="29" fill="${wireState.grass_cold ? '#a7f3d0' : '#ef4444'}" font-size="8.5">
            ${wireState.grass_cold ? 'P3 (COLD &minus;)' : 'P3 (DROPPED!)'}
          </text>
        </g>

        <!-- PAIR 4: EARTH (BROWN) - Link 4: Pin 8 (+) / Pin 7 (-) -->
        <g transform="translate(100, 226)">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="#ca8a04" stroke-width="1.5"/>
          <text x="15" y="18" fill="#ca8a04" font-size="10" font-weight="800">EARTH • Pair 4</text>
          
          <!-- Pin 8 Hot Wire (Solid Brown) -->
          <line x1="120" y1="12" x2="620" y2="12" stroke="#ca8a04" stroke-width="3"/>
          <circle cx="120" cy="12" r="5" fill="#ca8a04"/>
          <circle cx="620" cy="12" r="5" fill="#ca8a04"/>
          <text x="100" y="15" fill="#ca8a04" font-size="9" font-weight="700">P8 (+)</text>
          <text x="630" y="15" fill="#ca8a04" font-size="9" font-weight="700">P8 (HOT +)</text>

          <!-- Pin 7 Cold Wire (White/Brown Stripe) -->
          <line x1="120" y1="26" x2="620" y2="26" stroke="#eab308" stroke-width="2.5" stroke-dasharray="8,4"/>
          <circle cx="120" cy="26" r="4" fill="#eab308"/>
          <circle cx="620" cy="26" r="4" fill="#eab308"/>
          <text x="100" y="29" fill="#fef08a" font-size="8.5">P7 (&minus;)</text>
          <text x="630" y="29" fill="#fef08a" font-size="8.5">P7 (COLD &minus;)</text>
        </g>

        <!-- Dynamic Overall Cable Shield Return Wave -->
        <path d="M 80,270 Q 450,290 800,270" fill="none" stroke="${wireState.shield ? '#38bdf8' : '#ef4444'}" stroke-width="${wireState.shield ? '2' : '3'}" stroke-dasharray="${wireState.shield ? '4,4' : '2,2'}"/>
        <text x="450" y="292" fill="${wireState.shield ? '#38bdf8' : '#ef4444'}" font-size="10" font-weight="700" text-anchor="middle">
          ${wireState.shield ? 'CONTINUOUS OVERALL FOIL / BRAID SHIELD (360° METAL HOUSING ENCASEMENT)' : 'OVERALL SHIELD BROKEN: PHANTOM POWER P48 FAILS • MASSIVE RFI DEMODULATION'}
        </text>
      </svg>
    `;
  }

  updateDiagnostics() {
    const f = this.currentFault;
    const descEl = document.getElementById("qtp-sim-diag-text");
    const vdiffEl = document.getElementById("qtp-sim-vdiff");
    const phaseEl = document.getElementById("qtp-sim-phase");
    const cmrrEl = document.getElementById("qtp-sim-cmrr");
    const p48El = document.getElementById("qtp-sim-p48");

    let vdiff = "+4.0 dBu (1.228 V)";
    let phase = "0° In-Phase (✓ Matched)";
    let phaseColor = "#10b981";
    let cmrr = "> 92 dB (Optimal)";
    let cmrrColor = "#10b981";
    let p48 = "48.0 VDC (Normal)";
    let p48Color = "#10b981";
    let diag = "Normal Balanced Transmission: Conforms fully to AES72-4E and AES48. Balanced line rejects common-mode noise. All 4 pairs carry differential audio.";

    if (f === "phase_flip") {
      vdiff = "+4.0 dBu (1.228 V)";
      phase = "180° Inverted (✗ Out of Phase)";
      phaseColor = "#ef4444";
      cmrr = "> 90 dB (Diff Intact)";
      cmrrColor = "#10b981";
      p48 = "48.0 VDC (OK)";
      diag = "PHASE FLIP (180° Inversion): Hot and Cold polarity reversed on Pair 2 (SUN). Audio is inverting; when summed with in-phase stereo channels or stereo microphones, causes catastrophic bass cancellation and comb filtering!";
    } else if (f === "pin_dropped_1") {
      vdiff = "-2.02 dBu (0.614 V)";
      phase = "Single-Ended (Unbalanced)";
      phaseColor = "#f59e0b";
      cmrr = "0 dB (Loss of CMRR!)";
      cmrrColor = "#ef4444";
      p48 = "48.0 VDC (Distorted)";
      diag = "ONE PIN DROPPED (Pin 2 Hot Open): Line converts from differential to single-ended. 6.02 dB level loss (voltage halved). Common-mode rejection drops to 0 dB, injecting severe 60 Hz / 50 Hz power hum!";
    } else if (f === "pin_dropped_2") {
      vdiff = "-2.02 dBu (0.614 V)";
      phase = "Single-Ended (Floating)";
      phaseColor = "#f59e0b";
      cmrr = "0 dB (Loss of CMRR!)";
      cmrrColor = "#ef4444";
      p48 = "24.0 VDC (Sagged)";
      diag = "TWO PINS DROPPED (Pins 1 & 3 Cold Open): Both return legs disconnected across Link 1 & Link 2. Floating grounds cause electrostatic buzz and severe high-frequency crosstalk between channels.";
    } else if (f === "pin_dropped_3") {
      vdiff = "Unstable / Distorted";
      phase = "Broken Reference";
      phaseColor = "#ef4444";
      cmrr = "0 dB (Failed)";
      cmrrColor = "#ef4444";
      p48 = "12.0 VDC (Failed)";
      diag = "THREE PINS DROPPED: Catastrophic cable failure. 3 out of 8 signal lines open. Multi-channel signal integrity ruined.";
    } else if (f === "pin_dropped_4") {
      vdiff = "-inf dB (Muted)";
      phase = "Open Trunk";
      phaseColor = "#ef4444";
      cmrr = "0 dB (No Link)";
      cmrrColor = "#ef4444";
      p48 = "0.0 VDC (Dead)";
      diag = "FOUR PINS DROPPED: Complete Quad Trunk Failure (all 4 conductors in one RJ45 bank severed). Total signal loss on all 4 channels.";
    } else if (f === "pair_dropped") {
      vdiff = "-inf dB (0.00 V)";
      phase = "No Signal (Dead Channel)";
      phaseColor = "#ef4444";
      cmrr = "N/A (Open Circuit)";
      cmrrColor = "#94a3b8";
      p48 = "0.0 VDC (Pair Open)";
      diag = "ONE PAIR DROPPED (SUN / Orange Pair 2 Severed): Channel 1 completely open. Audio receiver reads 0.00 V. Full channel mute.";
    } else if (f === "shield_lifted") {
      vdiff = "+4.0 dBu (Severe Buzz)";
      phase = "0° (Shield Floating)";
      phaseColor = "#f59e0b";
      cmrr = "Sagging (-35 dB RFI)";
      cmrrColor = "#f59e0b";
      p48 = "0.0 VDC (P48 FAILED!)";
      p48Color = "#ef4444";
      diag = "OVERALL SHIELD LIFTED: Pin 1 / etherCON shell ground disconnected! In condenser microphones, cable shield is the sole DC return for P48 phantom power — microphones immediately power off! High RFI and mobile phone buzz demodulates into audio path.";
    }

    if (vdiffEl) vdiffEl.textContent = vdiff;
    if (phaseEl) {
      phaseEl.textContent = phase;
      phaseEl.style.color = phaseColor;
    }
    if (cmrrEl) {
      cmrrEl.textContent = cmrr;
      cmrrEl.style.color = cmrrColor;
    }
    if (p48El) {
      p48El.textContent = p48;
      p48El.style.color = p48Color;
    }
    if (descEl) descEl.textContent = diag;
  }
}

// ==========================================================================
// Multichannel Breakout & Always Accessible AES59 Master Matrix
// ==========================================================================
class MultichannelBreakoutEngine {
  constructor() {
    this.selectedCh = 1;
    this.breakoutMode = "xlr"; // "xlr" or "trs"
    this.init();
  }

  init() {
    this.bindDOM();
    this.render();
  }

  bindDOM() {
    // Mode toggle buttons (XLR vs TRS)
    document.querySelectorAll(".mc-mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".mc-mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.breakoutMode = btn.dataset.mcMode;
        this.render();
      });
    });

    // Channel selection buttons (Ch 1 to 8)
    document.querySelectorAll(".mc-ch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".mc-ch-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedCh = parseInt(btn.dataset.ch, 10);
        this.render();
      });
    });
  }

  render() {
    const item = MULTICHANNEL_DATA.channels.find(c => c.ch === this.selectedCh) || MULTICHANNEL_DATA.channels[0];

    // Update Channel Badge & Title
    const titleEl = document.getElementById("mc-active-title");
    if (titleEl) {
      titleEl.innerHTML = `<span style="color: ${item.color}; font-weight: 700;">Channel ${item.ch}</span>: Signal Routing (${item.bank})`;
    }

    // Render Dynamic SVG Icon Chain
    this.renderSVGDiagram(item);

    // Render Pinout Cross-Reference Table
    this.renderTable(item);

    // Render Always Accessible AES59 Table
    this.renderAES59MasterTable();
  }

  renderSVGDiagram(item) {
    const container = document.getElementById("mc-svg-container");
    if (!container) return;

    const isXlr = this.breakoutMode === "xlr";
    const destIconName = isXlr ? "4 × XLR-3 Circular Connectors" : "4 × 1/4″ TRS Phone Jacks";

    container.innerHTML = `
      <svg viewBox="0 0 980 340" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto; background: #070b12; border-radius: 8px;">
        <!-- STAGE 1: AES59 DB25 Trunk (8 Channels) -->
        <g transform="translate(60, 50)">
          <!-- DB25 Icon Shroud -->
          <path d="M 0,20 L 20,0 L 150,0 L 170,20 L 155,190 L 15,190 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5" />
          <rect x="25" y="20" width="120" height="150" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1.5" />
          
          <text x="85" y="45" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">AES59 (DB25)</text>
          <text x="85" y="62" fill="#94a3b8" font-size="9" text-anchor="middle">8 Balanced Channels</text>
          
          <!-- Miniature 25-pin grid representation -->
          <g transform="translate(35, 75)">
            ${Array.from({ length: 13 }).map((_, i) => `
              <circle cx="${i * 8}" cy="0" r="2.2" fill="${i + 1 === item.db25.hot || i + 1 === item.db25.cold ? item.color : '#64748b'}" />
            `).join("")}
            ${Array.from({ length: 12 }).map((_, i) => `
              <circle cx="${4 + i * 8}" cy="10" r="2.2" fill="${i + 14 === item.db25.hot || i + 14 === item.db25.cold ? item.color : '#64748b'}" />
            `).join("")}
          </g>

          <rect x="25" y="105" width="120" height="55" rx="4" fill="#1e293b" />
          <text x="85" y="122" fill="#f8fafc" font-size="9.5" font-weight="600" text-anchor="middle">Ch ${item.ch} (${item.mnemonic}):</text>
          <text x="85" y="137" fill="${item.color}" font-size="9" font-weight="700" text-anchor="middle">Hot: Pin ${item.db25.hot} &bull; Cold: Pin ${item.db25.cold}</text>
          <text x="85" y="151" fill="#94a3b8" font-size="8.5" text-anchor="middle">Shield: Pin ${item.db25.shield} + Shroud (AES-X249)</text>

          <text x="85" y="215" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">AES59 DB25 TRUNK</text>
          <text x="85" y="230" fill="#94a3b8" font-size="9" text-anchor="middle">Ch 1–8 Send/Receive Female</text>
        </g>

        <!-- Arrow Splitting DB25 to 2 x RJ45 -->
        <g stroke="${item.color}" stroke-width="2.5" fill="none">
          <!-- Upper Path: Bank A (Ch 1-4) -->
          <path d="M 230,120 C 290,120 300,90 350,90" stroke-dasharray="${item.ch <= 4 ? 'none' : '4,4'}" opacity="${item.ch <= 4 ? '1' : '0.35'}" />
          <!-- Lower Path: Bank B (Ch 5-8) -->
          <path d="M 230,160 C 290,160 300,210 350,210" stroke-dasharray="${item.ch > 4 ? 'none' : '4,4'}" opacity="${item.ch > 4 ? '1' : '0.35'}" />
        </g>

        <!-- STAGE 2: AES72-4E QTP RJ45 Connectors (Two 4-Channel Banks) -->
        <!-- Bank A: RJ45 Port 1 (Ch 1–4) -->
        <g transform="translate(360, 40)" opacity="${item.ch <= 4 ? '1' : '0.45'}">
          <rect x="0" y="0" width="160" height="98" rx="6" fill="#1e293b" stroke="${item.ch <= 4 ? item.color : '#475569'}" stroke-width="${item.ch <= 4 ? '2.5' : '1.5'}" />
          <rect x="55" y="0" width="50" height="12" fill="#0f172a" />
          <text x="80" y="28" fill="#34d399" font-size="11.5" font-weight="700" text-anchor="middle">AES72-4E (RJ45 #1)</text>
          <text x="80" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">Bank A: Ch 1–4 &bull; TIA-568-B</text>
          <rect x="15" y="52" width="130" height="34" rx="3" fill="#0f172a" />
          <text x="80" y="67" fill="${item.ch <= 4 ? item.color : '#94a3b8'}" font-size="8.5" font-weight="700" text-anchor="middle">${item.mnemonic} (${item.pairColor})</text>
          <text x="80" y="80" fill="#94a3b8" font-size="8" text-anchor="middle">Hot Pin ${item.rj45.hotPin} (+) &bull; Cold Pin ${item.rj45.coldPin} (&minus;)</text>
        </g>

        <!-- Bank B: RJ45 Port 2 (Ch 5–8) -->
        <g transform="translate(360, 160)" opacity="${item.ch > 4 ? '1' : '0.45'}">
          <rect x="0" y="0" width="160" height="98" rx="6" fill="#1e293b" stroke="${item.ch > 4 ? item.color : '#475569'}" stroke-width="${item.ch > 4 ? '2.5' : '1.5'}" />
          <rect x="55" y="0" width="50" height="12" fill="#0f172a" />
          <text x="80" y="28" fill="#a855f7" font-size="11.5" font-weight="700" text-anchor="middle">AES72-4E (RJ45 #2)</text>
          <text x="80" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">Bank B: Ch 5–8 &bull; TIA-568-B</text>
          <rect x="15" y="52" width="130" height="34" rx="3" fill="#0f172a" />
          <text x="80" y="67" fill="${item.ch > 4 ? item.color : '#94a3b8'}" font-size="8.5" font-weight="700" text-anchor="middle">${item.mnemonic} (${item.pairColor})</text>
          <text x="80" y="80" fill="#94a3b8" font-size="8" text-anchor="middle">Hot Pin ${item.rj45.hotPin} (+) &bull; Cold Pin ${item.rj45.coldPin} (&minus;)</text>
        </g>

        <!-- Connecting lines to 4x Breakouts -->
        <path d="M 520,${item.ch <= 4 ? 85 : 205} C 570,${item.ch <= 4 ? 85 : 205} 580,145 640,145" stroke="${item.color}" stroke-width="2.5" fill="none" />

        <!-- STAGE 3: 4 x XLR or 4 x TRS Breakout Icons -->
        <g transform="translate(640, 25)">
          <rect x="0" y="0" width="310" height="260" rx="8" fill="#111827" stroke="#374151" stroke-width="1.5" />
          <text x="155" y="25" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">${destIconName}</text>
          <text x="155" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">Discrete Balanced Channel Termination</text>

          <!-- 4 Output Connector Icons -->
          ${[1, 2, 3, 4].map((localCh) => {
            const globalCh = (item.ch <= 4) ? localCh : (localCh + 4);
            const isTarget = (globalCh === item.ch);
            const yPos = 55 + (localCh - 1) * 48;
            const strokeColor = isTarget ? item.color : "#475569";
            const fillColor = isTarget ? "rgba(56, 189, 248, 0.15)" : "rgba(30, 41, 59, 0.4)";

            if (isXlr) {
              return `
                <g transform="translate(20, ${yPos})">
                  <rect x="0" y="0" width="270" height="42" rx="6" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isTarget ? '2' : '1'}" />
                  <circle cx="28" cy="21" r="15" fill="#1e293b" stroke="${strokeColor}" stroke-width="1.8" />
                  <circle cx="22" cy="16" r="3" fill="#94a3b8" />
                  <circle cx="34" cy="16" r="3" fill="#10b981" />
                  <circle cx="28" cy="27" r="3" fill="#ef4444" />
                  
                  <text x="55" y="19" fill="#f8fafc" font-size="10.5" font-weight="700">Channel ${globalCh} (XLR-3)</text>
                  <text x="55" y="32" fill="#94a3b8" font-size="8.5">Pin 1: Shield | Pin 2: Hot (+) | Pin 3: Cold (-)</text>
                  ${isTarget ? `<rect x="220" y="10" width="42" height="20" rx="3" fill="${item.color}" /><text x="241" y="24" fill="#0f172a" font-size="9" font-weight="800" text-anchor="middle">ACTIVE</text>` : ''}
                </g>
              `;
            } else {
              return `
                <g transform="translate(20, ${yPos})">
                  <rect x="0" y="0" width="270" height="42" rx="6" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isTarget ? '2' : '1'}" />
                  <rect x="14" y="18" width="18" height="6" fill="#94a3b8" />
                  <rect x="33" y="18" width="6" height="6" fill="#ef4444" />
                  <polygon points="40,18 48,21 40,24" fill="#10b981" />
                  
                  <text x="55" y="19" fill="#f8fafc" font-size="10.5" font-weight="700">Channel ${globalCh} (1/4″ TRS)</text>
                  <text x="55" y="32" fill="#94a3b8" font-size="8.5">Tip: Hot (+) | Ring: Cold (-) | Sleeve: Shield</text>
                  ${isTarget ? `<rect x="220" y="10" width="42" height="20" rx="3" fill="${item.color}" /><text x="241" y="24" fill="#0f172a" font-size="9" font-weight="800" text-anchor="middle">ACTIVE</text>` : ''}
                </g>
              `;
            }
          }).join("")}
        </g>
      </svg>
    `;
  }

  renderTable(item) {
    const tbody = document.getElementById("mc-table-tbody");
    if (!tbody) return;

    const isXlr = this.breakoutMode === "xlr";

    tbody.innerHTML = MULTICHANNEL_DATA.channels.map(c => {
      const isSel = (c.ch === this.selectedCh);
      const bgStyle = isSel ? `background: rgba(56, 189, 248, 0.12); border-left: 4px solid ${c.color}; font-weight: 600;` : "";
      
      const breakoutCol = isXlr
        ? `Pin 1: Shield &bull; Pin 2: Hot (+) &bull; Pin 3: Cold (-)`
        : `Tip: Hot (+) &bull; Ring: Cold (-) &bull; Sleeve: Shield`;

      return `
        <tr style="${bgStyle} cursor: pointer;" onclick="window.multichannelEngine.selectChannel(${c.ch})">
          <td style="color: ${c.color}; font-weight: 700;">Ch ${c.ch}</td>
          <td>${c.bank}</td>
          <td>Hot: Pin ${c.db25.hot} &bull; Cold: Pin ${c.db25.cold} &bull; Shield: Pin ${c.db25.shield}</td>
          <td>${c.rj45.pair} (Pins ${c.rj45.hotPin}/${c.rj45.coldPin})</td>
          <td>${breakoutCol}</td>
          <td><span class="badge badge-success" style="font-size: 0.72rem;">AES48 Chassis Bond</span></td>
        </tr>
      `;
    }).join("");
  }

  renderAES59MasterTable() {
    const container = document.getElementById("aes59-master-tbody");
    if (!container) return;

    container.innerHTML = MULTICHANNEL_DATA.channels.map(c => {
      const isSel = (c.ch === this.selectedCh);
      const bgStyle = isSel ? `background: rgba(56, 189, 248, 0.15); font-weight: 700;` : "";
      return `
        <tr style="${bgStyle} cursor: pointer;" onclick="window.multichannelEngine.selectChannel(${c.ch})">
          <td style="color: ${c.color}; font-weight: 800;">Channel ${c.ch}</td>
          <td><span class="aes59-pin-pill hot">Pin ${c.db25.hot} (+)</span></td>
          <td><span class="aes59-pin-pill cold">Pin ${c.db25.cold} (&minus;)</span></td>
          <td><span class="aes59-pin-pill gnd">Pin ${c.db25.shield} (GND)</span></td>
          <td>DB25 Female (Socket)</td>
          <td>DB25 Female (Socket)</td>
          <td style="font-family: var(--font-mono); font-weight: 700; color: ${c.color};">${c.mnemonic} (Pin ${c.rj45.hotPin}+)</td>
        </tr>
      `;
    }).join("");
  }

  selectChannel(chNum) {
    this.selectedCh = chNum;
    document.querySelectorAll(".mc-ch-btn").forEach(b => {
      b.classList.toggle("active", parseInt(b.dataset.ch, 10) === chNum);
    });
    this.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.multichannelEngine = new MultichannelBreakoutEngine();
  window.qtpSimulator = new QTPSimulatorEngine();
});
