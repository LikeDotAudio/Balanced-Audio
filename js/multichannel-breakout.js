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
    { name: "SUN", colorName: "Orange", hex: "#f97316", hotPin: 2, coldPin: 1, pairNum: 2, desc: "Pin 2 (+) Solid Orange | Pin 1 (-) White/Orange" },
    { name: "SKY", colorName: "Blue", hex: "#38bdf8", hotPin: 4, coldPin: 5, pairNum: 1, desc: "Pin 4 (+) Solid Blue | Pin 5 (-) White/Blue" },
    { name: "GRASS", colorName: "Green", hex: "#10b981", hotPin: 6, coldPin: 3, pairNum: 3, desc: "Pin 6 (+) Solid Green | Pin 3 (-) White/Green" },
    { name: "EARTH", colorName: "Brown", hex: "#ca8a04", hotPin: 8, coldPin: 7, pairNum: 4, desc: "Pin 8 (+) Solid Brown | Pin 7 (-) White/Brown" }
  ],
  channels: [
    {
      ch: 1,
      bank: "Paths 1–4 • RJ45 #1",
      link: "Link 1",
      mnemonic: "SUN",
      pairColor: "Orange",
      db25: { hot: 24, cold: 12, shield: 25 },
      rj45: { pair: "(SUN: Orange / White-Orange)", hotPin: 2, coldPin: 1, mnemonic: "SUN (Orange)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#f97316"
    },
    {
      ch: 2,
      bank: "Paths 1–4 • RJ45 #1",
      link: "Link 2",
      mnemonic: "SKY",
      pairColor: "Blue",
      db25: { hot: 10, cold: 23, shield: 11 },
      rj45: { pair: "(SKY: Blue / White-Blue)", hotPin: 4, coldPin: 5, mnemonic: "SKY (Blue)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#38bdf8"
    },
    {
      ch: 3,
      bank: "Paths 1–4 • RJ45 #1",
      link: "Link 3",
      mnemonic: "GRASS",
      pairColor: "Green",
      db25: { hot: 21, cold: 9, shield: 22 },
      rj45: { pair: "(GRASS: Green / White-Green)", hotPin: 6, coldPin: 3, mnemonic: "GRASS (Green)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#10b981"
    },
    {
      ch: 4,
      bank: "Paths 1–4 • RJ45 #1",
      link: "Link 4",
      mnemonic: "EARTH",
      pairColor: "Brown",
      db25: { hot: 7, cold: 20, shield: 8 },
      rj45: { pair: "(EARTH: Brown / White-Brown)", hotPin: 8, coldPin: 7, mnemonic: "EARTH (Brown)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#ca8a04"
    },
    {
      ch: 5,
      bank: "Paths 5–8 • RJ45 #2",
      link: "Link 1",
      mnemonic: "SUN",
      pairColor: "Orange",
      db25: { hot: 18, cold: 6, shield: 19 },
      rj45: { pair: "(SUN: Orange / White-Orange)", hotPin: 2, coldPin: 1, mnemonic: "SUN (Orange)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#f97316"
    },
    {
      ch: 6,
      bank: "Paths 5–8 • RJ45 #2",
      link: "Link 2",
      mnemonic: "SKY",
      pairColor: "Blue",
      db25: { hot: 4, cold: 17, shield: 5 },
      rj45: { pair: "(SKY: Blue / White-Blue)", hotPin: 4, coldPin: 5, mnemonic: "SKY (Blue)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#38bdf8"
    },
    {
      ch: 7,
      bank: "Paths 5–8 • RJ45 #2",
      link: "Link 3",
      mnemonic: "GRASS",
      pairColor: "Green",
      db25: { hot: 15, cold: 3, shield: 16 },
      rj45: { pair: "(GRASS: Green / White-Green)", hotPin: 6, coldPin: 3, mnemonic: "GRASS (Green)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#10b981"
    },
    {
      ch: 8,
      bank: "Paths 5–8 • RJ45 #2",
      link: "Link 4",
      mnemonic: "EARTH",
      pairColor: "Brown",
      db25: { hot: 1, cold: 14, shield: 2 },
      rj45: { pair: "(EARTH: Brown / White-Brown)", hotPin: 8, coldPin: 7, mnemonic: "EARTH (Brown)" },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#ca8a04"
    }
  ]
};

const QTP_DEMOS = [
  { key: "normal", title: "Normal Balanced (Optimal)" },
  { key: "phase_flip", title: "Phase Flip (180° Polarity Inverted)" },
  { key: "pin_dropped_1", title: "1 Pin Dropped (Pin 2 Hot Open)" },
  { key: "pin_dropped_2", title: "2 Pins Dropped (Pins 1 & 3 Cold Open)" },
  { key: "pin_dropped_3", title: "3 Pins Dropped (Multi-Conductor Open)" },
  { key: "pin_dropped_4", title: "4 Pins Dropped (Quad Trunk Open)" },
  { key: "pair_dropped", title: "SUN Path Dropped (Silent)" },
  { key: "shield_lifted", title: "Shield Lifted (P48 Fails)" },
  { key: "leg_flipped", title: "Mixed Polarity (One Conductor Flipped)" }
];

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

  // Which conductors are intact for the current fault (also read by the 8-CH bench scopes)
  getWireState(f = this.currentFault) {
    const isPin1Drop = f === "pin_dropped_1";
    const isPin2Drop = f === "pin_dropped_2";
    const isPin3Drop = f === "pin_dropped_3";
    const isPin4Drop = f === "pin_dropped_4";
    const isPairDrop = f === "pair_dropped";
    return {
      sun_hot: !isPin1Drop && !isPin3Drop && !isPin4Drop && !isPairDrop,
      sun_cold: !isPin2Drop && !isPin3Drop && !isPin4Drop && !isPairDrop,
      sky_hot: !isPin4Drop,
      sky_cold: !isPin4Drop,
      grass_hot: !isPin3Drop && !isPin4Drop,
      grass_cold: !isPin2Drop && !isPin3Drop && !isPin4Drop,
      earth_hot: true,
      earth_cold: true,
      shield: f !== "shield_lifted",
      sunFlipped: f === "phase_flip",
      // One conductor of SUN reversed: both legs now carry the same polarity
      sunColdFlipped: f === "leg_flipped"
    };
  }

  setFault(faultKey) {
    this.currentFault = faultKey;
    document.querySelectorAll("[data-sidebar-fault]").forEach(link => {
      link.classList.toggle("active", link.dataset.sidebarFault === faultKey);
    });
    this.render();
  }

  render() {
    this.renderSVG();
    this.updateDiagnostics();
  }

  // The 8 faults as separate worked examples, one after another (nothing is overlaid or switched)
  renderSVG() {
    const container = document.getElementById("qtp-sim-svg-container");
    if (!container) return;
    if (!container.dataset.built) {
      container.innerHTML = QTP_DEMOS.map((d, i) => {
        const dg = this.diagnosticsFor(d.key);
        return `
          <div class="qtp-demo" id="qtp-demo-${d.key}" data-fault="${d.key}">
            <h4 class="qtp-demo-title"><span class="qtp-demo-no">Example ${i + 1}</span> ${d.title}</h4>
            ${this.svgFor(d.key)}
            <div class="qtp-demo-metrics">
              <span><b>V<sub>DIFF</sub></b> ${dg.vdiff}</span>
              <span style="color: ${dg.phaseColor};"><b>Phase</b> ${dg.phase}</span>
              <span style="color: ${dg.cmrrColor};"><b>CMRR</b> ${dg.cmrr}</span>
              <span style="color: ${dg.p48Color};"><b>P48</b> ${dg.p48}</span>
            </div>
            <p class="qtp-demo-diag">${dg.diag}</p>
          </div>`;
      }).join("");
      container.dataset.built = "1";
      this.followScroll(container);
    }
    container.querySelectorAll(".qtp-demo").forEach(d => d.classList.toggle("active", d.dataset.fault === this.currentFault));
  }

  // The example in the middle of the screen drives the 8-CH conductor scopes and the chapter list
  followScroll(container) {
    let queued = false;
    const pick = () => {
      queued = false;
      const mid = window.innerHeight / 2;
      const demo = [...container.querySelectorAll(".qtp-demo")].find(d => {
        const r = d.getBoundingClientRect();
        return r.top <= mid && r.bottom >= mid;
      });
      if (demo && demo.dataset.fault !== this.currentFault) this.setFault(demo.dataset.fault);
    };
    window.addEventListener("scroll", () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(pick);
      }
    }, { passive: true });
  }

  svgFor(f) {
    const isPhaseFlip = f === "phase_flip";
    const wireState = this.getWireState(f);

    return `
      <svg viewBox="0 0 920 340" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background: #060910; border-radius: 8px;">
        <defs>
          <pattern id="shield-braid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0,4 L 8,4 M 4,0 L 4,8 M 0,0 L 8,8 M 8,0 L 0,8" stroke="#475569" stroke-width="0.8" opacity="0.6"/>
          </pattern>
        </defs>

        <!-- Outer Cable Sheath (Cutaway View) -->
        <rect class="diagram-ground" x="50" y="30" width="780" height="270" rx="14" fill="#0b111e" stroke="#334155" stroke-width="2"/>
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
        <g transform="translate(100, 85)" data-qtp-pair="sun">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="${wireState.sun_hot && wireState.sun_cold ? '#f97316' : '#ef4444'}" stroke-width="1.5"/>
          <text x="15" y="18" fill="#f97316" font-size="10" font-weight="800">SUN PATH</text>
          ${wireState.shield ? "" : '<text x="15" y="31" fill="#ef4444" font-size="8" font-weight="800">⇅ same hum on both legs</text>'}
          
          <!-- Pin 2 Hot Wire (Solid Orange) -->
          <line x1="120" y1="12" x2="520" y2="12" stroke="#f97316" stroke-width="3" stroke-dasharray="${wireState.sun_hot ? 'none' : '6,4'}"/>
          <circle cx="120" cy="12" r="5" fill="#f97316" data-probe-target="qtp-sun-hot"/>
          <circle data-qtp-wire="sun-hot" cx="520" cy="12" r="5" fill="${wireState.sun_hot ? '#f97316' : '#ef4444'}"/>
          <text x="112" y="15" fill="#f97316" font-size="9" font-weight="700" text-anchor="end">P2 (+)</text>
          <text x="532" y="15" fill="${wireState.sun_hot ? '#f97316' : '#ef4444'}" font-size="9" font-weight="700">
            ${isPhaseFlip ? 'P2 (180° FLIPPED!)' : (wireState.sun_hot ? 'P2 (HOT +)' : 'P2 (DROPPED!)')}
          </text>

          <!-- Pin 1 Cold Wire (White/Orange Stripe) -->
          <line x1="120" y1="26" x2="520" y2="26" stroke="#fb923c" stroke-width="2.5" stroke-dasharray="${wireState.sun_cold ? '8,4' : '4,4'}" opacity="${wireState.sun_cold ? '1' : '0.4'}"/>
          <circle cx="120" cy="26" r="4" fill="#fb923c" data-probe-target="qtp-sun-cold"/>
          <circle data-qtp-wire="sun-cold" cx="520" cy="26" r="4" fill="${wireState.sun_cold ? '#fb923c' : '#ef4444'}"/>
          <text x="112" y="29" fill="#fed7aa" font-size="8.5" text-anchor="end">P1 (&minus;)</text>
          <text x="532" y="29" fill="${wireState.sun_cold ? '#fed7aa' : '#ef4444'}" font-size="8.5">
            ${wireState.sunColdFlipped ? 'P1 (FLIPPED → +)' : wireState.sun_cold ? 'P1 (COLD &minus;)' : 'P1 (DROPPED!)'}
          </text>
        </g>

        <!-- PAIR 1: SKY (BLUE) - Link 3: Pin 4 (+) / Pin 5 (-) -->
        <g transform="translate(100, 132)" data-qtp-pair="sky">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="${wireState.sky_hot ? '#38bdf8' : '#ef4444'}" stroke-width="1.5"/>
          <text x="15" y="18" fill="#38bdf8" font-size="10" font-weight="800">SKY PATH</text>
          ${wireState.shield ? "" : '<text x="15" y="31" fill="#ef4444" font-size="8" font-weight="800">⇅ same hum on both legs</text>'}
          
          <!-- Pin 4 Hot Wire (Solid Blue) -->
          <line x1="120" y1="12" x2="520" y2="12" stroke="#38bdf8" stroke-width="3" stroke-dasharray="${wireState.sky_hot ? 'none' : '6,4'}"/>
          <circle cx="120" cy="12" r="5" fill="#38bdf8" data-probe-target="qtp-sky-hot"/>
          <circle data-qtp-wire="sky-hot" cx="520" cy="12" r="5" fill="${wireState.sky_hot ? '#38bdf8' : '#ef4444'}"/>
          <text x="112" y="15" fill="#38bdf8" font-size="9" font-weight="700" text-anchor="end">P4 (+)</text>
          <text x="532" y="15" fill="${wireState.sky_hot ? '#38bdf8' : '#ef4444'}" font-size="9" font-weight="700">
            ${wireState.sky_hot ? 'P4 (HOT +)' : 'P4 (DROPPED!)'}
          </text>

          <!-- Pin 5 Cold Wire (White/Blue Stripe) -->
          <line x1="120" y1="26" x2="520" y2="26" stroke="#7dd3fc" stroke-width="2.5" stroke-dasharray="${wireState.sky_cold ? '8,4' : '4,4'}" opacity="${wireState.sky_cold ? '1' : '0.4'}"/>
          <circle cx="120" cy="26" r="4" fill="#7dd3fc" data-probe-target="qtp-sky-cold"/>
          <circle data-qtp-wire="sky-cold" cx="520" cy="26" r="4" fill="${wireState.sky_cold ? '#7dd3fc' : '#ef4444'}"/>
          <text x="112" y="29" fill="#bae6fd" font-size="8.5" text-anchor="end">P5 (&minus;)</text>
          <text x="532" y="29" fill="${wireState.sky_cold ? '#bae6fd' : '#ef4444'}" font-size="8.5">
            ${wireState.sky_cold ? 'P5 (COLD &minus;)' : 'P5 (DROPPED!)'}
          </text>
        </g>

        <!-- PAIR 3: GRASS (GREEN) - Link 2: Pin 6 (+) / Pin 3 (-) -->
        <g transform="translate(100, 179)" data-qtp-pair="grass">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="${wireState.grass_hot && wireState.grass_cold ? '#10b981' : '#ef4444'}" stroke-width="1.5"/>
          <text x="15" y="18" fill="#10b981" font-size="10" font-weight="800">GRASS PATH</text>
          ${wireState.shield ? "" : '<text x="15" y="31" fill="#ef4444" font-size="8" font-weight="800">⇅ same hum on both legs</text>'}
          
          <!-- Pin 6 Hot Wire (Solid Green) -->
          <line x1="120" y1="12" x2="520" y2="12" stroke="#10b981" stroke-width="3" stroke-dasharray="${wireState.grass_hot ? 'none' : '6,4'}"/>
          <circle cx="120" cy="12" r="5" fill="#10b981" data-probe-target="qtp-grass-hot"/>
          <circle data-qtp-wire="grass-hot" cx="520" cy="12" r="5" fill="${wireState.grass_hot ? '#10b981' : '#ef4444'}"/>
          <text x="112" y="15" fill="#10b981" font-size="9" font-weight="700" text-anchor="end">P6 (+)</text>
          <text x="532" y="15" fill="${wireState.grass_hot ? '#10b981' : '#ef4444'}" font-size="9" font-weight="700">
            ${wireState.grass_hot ? 'P6 (HOT +)' : 'P6 (DROPPED!)'}
          </text>

          <!-- Pin 3 Cold Wire (White/Green Stripe) -->
          <line x1="120" y1="26" x2="520" y2="26" stroke="#6ee7b7" stroke-width="2.5" stroke-dasharray="${wireState.grass_cold ? '8,4' : '4,4'}" opacity="${wireState.grass_cold ? '1' : '0.4'}"/>
          <circle cx="120" cy="26" r="4" fill="#6ee7b7" data-probe-target="qtp-grass-cold"/>
          <circle data-qtp-wire="grass-cold" cx="520" cy="26" r="4" fill="${wireState.grass_cold ? '#6ee7b7' : '#ef4444'}"/>
          <text x="112" y="29" fill="#a7f3d0" font-size="8.5" text-anchor="end">P3 (&minus;)</text>
          <text x="532" y="29" fill="${wireState.grass_cold ? '#a7f3d0' : '#ef4444'}" font-size="8.5">
            ${wireState.grass_cold ? 'P3 (COLD &minus;)' : 'P3 (DROPPED!)'}
          </text>
        </g>

        <!-- PAIR 4: EARTH (BROWN) - Link 4: Pin 8 (+) / Pin 7 (-) -->
        <g transform="translate(100, 226)" data-qtp-pair="earth">
          <rect x="0" y="0" width="650" height="36" rx="6" fill="#131d2e" stroke="#ca8a04" stroke-width="1.5"/>
          <text x="15" y="18" fill="#ca8a04" font-size="10" font-weight="800">EARTH PATH</text>
          ${wireState.shield ? "" : '<text x="15" y="31" fill="#ef4444" font-size="8" font-weight="800">⇅ same hum on both legs</text>'}
          
          <!-- Pin 8 Hot Wire (Solid Brown) -->
          <line x1="120" y1="12" x2="520" y2="12" stroke="#ca8a04" stroke-width="3"/>
          <circle cx="120" cy="12" r="5" fill="#ca8a04" data-probe-target="qtp-earth-hot"/>
          <circle data-qtp-wire="earth-hot" cx="520" cy="12" r="5" fill="#ca8a04"/>
          <text x="112" y="15" fill="#ca8a04" font-size="9" font-weight="700" text-anchor="end">P8 (+)</text>
          <text x="532" y="15" fill="#ca8a04" font-size="9" font-weight="700">P8 (HOT +)</text>

          <!-- Pin 7 Cold Wire (White/Brown Stripe) -->
          <line x1="120" y1="26" x2="520" y2="26" stroke="#eab308" stroke-width="2.5" stroke-dasharray="8,4"/>
          <circle cx="120" cy="26" r="4" fill="#eab308" data-probe-target="qtp-earth-cold"/>
          <circle data-qtp-wire="earth-cold" cx="520" cy="26" r="4" fill="#eab308"/>
          <text x="112" y="29" fill="#fef08a" font-size="8.5" text-anchor="end">P7 (&minus;)</text>
          <text x="532" y="29" fill="#fef08a" font-size="8.5">P7 (COLD &minus;)</text>
        </g>

        <!-- Dynamic Overall Cable Shield Return Wave -->
        <path d="M 80,270 Q 450,290 800,270" fill="none" stroke="${wireState.shield ? '#38bdf8' : '#ef4444'}" stroke-width="${wireState.shield ? '2' : '3'}" stroke-dasharray="${wireState.shield ? '4,4' : '2,2'}"/>
        <text x="450" y="292" fill="${wireState.shield ? '#38bdf8' : '#ef4444'}" font-size="10" font-weight="700" text-anchor="middle">
          ${wireState.shield ? 'CONTINUOUS OVERALL FOIL / BRAID SHIELD (360° METAL HOUSING ENCASEMENT)' : 'OVERALL SHIELD BROKEN: PHANTOM POWER P48 FAILS • MASSIVE RFI DEMODULATION'}
        </text>
      </svg>
    `;
  }

  // Readings and explanation for one fault
  diagnosticsFor(f) {
    let vdiff = "+4.0 dBu (1.228 V)";
    let phase = "0° In-Phase (✓ Matched)";
    let phaseColor = "#10b981";
    let cmrr = "> 92 dB (Optimal)";
    let cmrrColor = "#10b981";
    let p48 = "48.0 VDC (Normal)";
    let p48Color = "#10b981";
    let diag = "Normal Balanced Transmission: Conforms fully to AES72-4E and AES48. Balanced line rejects common-mode noise. The SUN, SKY, GRASS and EARTH paths all carry differential audio.";

    if (f === "phase_flip") {
      vdiff = "+4.0 dBu (1.228 V)";
      phase = "180° Inverted (✗ Out of Phase)";
      phaseColor = "#ef4444";
      cmrr = "> 90 dB (Diff Intact)";
      cmrrColor = "#10b981";
      p48 = "48.0 VDC (OK)";
      diag = "PHASE FLIP (180° Inversion): Hot and Cold polarity reversed on the SUN path. Audio is inverting; when summed with in-phase stereo signals or stereo microphones, causes catastrophic bass cancellation and comb filtering!";
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
      diag = "TWO PINS DROPPED (Pins 1 & 3 Cold Open): Both return legs disconnected across Link 1 & Link 2. Floating grounds cause electrostatic buzz and severe high-frequency crosstalk between paths.";
    } else if (f === "pin_dropped_3") {
      vdiff = "Unstable / Distorted";
      phase = "Broken Reference";
      phaseColor = "#ef4444";
      cmrr = "0 dB (Failed)";
      cmrrColor = "#ef4444";
      p48 = "12.0 VDC (Failed)";
      diag = "THREE PINS DROPPED: Catastrophic cable failure. 3 out of 8 signal lines open. Signal integrity ruined on every path.";
    } else if (f === "pin_dropped_4") {
      vdiff = "-inf dB (Muted)";
      phase = "Open Trunk";
      phaseColor = "#ef4444";
      cmrr = "0 dB (No Link)";
      cmrrColor = "#ef4444";
      p48 = "0.0 VDC (Dead)";
      diag = "FOUR PINS DROPPED: Complete Quad Trunk Failure (all 4 conductors in one RJ45 bank severed). Total signal loss on the SUN, SKY, GRASS and EARTH paths.";
    } else if (f === "pair_dropped") {
      vdiff = "-inf dB (0.00 V)";
      phase = "No Signal (Dead Path)";
      phaseColor = "#ef4444";
      cmrr = "N/A (Open Circuit)";
      cmrrColor = "#94a3b8";
      p48 = "0.0 VDC (Path Open)";
      diag = "SUN PATH DROPPED (orange conductors severed): Both SUN path conductors open. The receiver reads 0.00 V: silence.";
    } else if (f === "leg_flipped") {
      vdiff = "-inf dB (Audio Cancels!)";
      phase = "Legs In Phase (✗ Same Polarity)";
      phaseColor = "#ef4444";
      cmrr = "Rejects the AUDIO";
      cmrrColor = "#ef4444";
      p48 = "48.0 VDC (OK)";
      diag = "MIXED POLARITY (One SUN Path Conductor Flipped): the cold conductor now carries the SAME polarity as the hot. Both legs swing together, so the audio is common-mode and the balanced receiver cancels it: V_DIFF ≈ 0 while each wire still measures full signal to ground. Check every conductor's polarity, not just the path.";
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

    return { vdiff, phase, phaseColor, cmrr, cmrrColor, p48, p48Color, diag };
  }

  updateDiagnostics() {
    const descEl = document.getElementById("qtp-sim-diag-text");
    const vdiffEl = document.getElementById("qtp-sim-vdiff");
    const phaseEl = document.getElementById("qtp-sim-phase");
    const cmrrEl = document.getElementById("qtp-sim-cmrr");
    const p48El = document.getElementById("qtp-sim-p48");
    const { vdiff, phase, phaseColor, cmrr, cmrrColor, p48, p48Color, diag } = this.diagnosticsFor(this.currentFault);

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
        this.selectChannel(parseInt(btn.dataset.ch, 10));
      });
    });
  }

  render() {
    const item = MULTICHANNEL_DATA.channels.find(c => c.ch === this.selectedCh) || MULTICHANNEL_DATA.channels[0];

    // Update Channel Badge & Title
    const titleEl = document.getElementById("mc-active-title");
    if (titleEl) {
      titleEl.innerHTML = `<span style="color: ${item.color}; font-weight: 700;">Path ${item.ch}</span>: Signal Routing (${item.bank})`;
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
    const chans = MULTICHANNEL_DATA.channels;
    const benchColors = typeof BENCH_CH_COLORS !== "undefined" ? BENCH_CH_COLORS : chans.map(c => c.color);
    const rowY = (ch) => 62 + (ch - 1) * 48;

    // DB25 stood upright: pins 1–13 in the left column, 14–25 in the right (wires leave to the right)
    const PIN_DY = 26;
    const db = { x: 96, y: 50 };
    const DB_H = 13 * PIN_DY + 8;
    const pinPos = (pin) => pin <= 13
      ? { x: db.x + 22, y: db.y + 18 + (pin - 1) * PIN_DY }
      : { x: db.x + 52, y: db.y + 18 + PIN_DY / 2 + (pin - 14) * PIN_DY };

    // Pin → role lookup so every contact on the face shows +, − or G
    const pinRole = {};
    chans.forEach(c => {
      pinRole[c.db25.hot] = { ch: c, sym: "+", kind: "hot" };
      pinRole[c.db25.cold] = { ch: c, sym: "−", kind: "cold" };
      pinRole[c.db25.shield] = { ch: c, sym: "G", kind: "gnd" };
    });

    const conductorColor = (c, kind) => kind === "gnd" ? "#94a3b8" : c.color;
    const RJ_X = 430;
    const RJ_W = 170;
    const OUT_X = 640;

    // Harness: three conductors per channel from the DB25 pins to the RJ45 pair row
    const harness = chans.map(c => {
      const sel = c.ch === item.ch;
      const yc = rowY(c.ch);
      return [["hot", c.db25.hot, -7], ["cold", c.db25.cold, 0], ["gnd", c.db25.shield, 7]].map(([kind, pin, dy]) => {
        const p = pinPos(pin);
        const ex = RJ_X;
        const ey = yc + dy;
        const midX = 300 + (c.ch - 1) * 6;
        const d = `M ${p.x},${p.y} C ${midX},${p.y} ${midX - 40},${ey} ${ex},${ey}`;
        // Signal direction on the hot wire: CH1–4 send out of the DB25, CH5–8 return into it
        const send = c.ch <= 4;
        const flow = kind !== "hot" ? "" : [0, 1].map(k => `
          <circle r="3" fill="${c.color}"><animateMotion dur="2.4s" begin="-${(k * 1.2).toFixed(1)}s" repeatCount="indefinite"
            keyPoints="${send ? "0;1" : "1;0"}" keyTimes="0;1" calcMode="linear" path="${d}"/></circle>`).join("");
        return `<path d="${d}" fill="none"
          stroke="${conductorColor(c, kind)}" stroke-width="${sel ? 2.2 : 1}" opacity="${sel ? 1 : 0.4}"
          ${kind === "cold" ? 'stroke-dasharray="5,2"' : ""} />${flow}`;
      }).join("");
    }).join("");

    const pinsSvg = Array.from({ length: 25 }, (_, i) => {
      const pin = i + 1;
      const p = pinPos(pin);
      const role = pinRole[pin];
      const sel = role && role.ch.ch === item.ch;
      const ring = role ? conductorColor(role.ch, role.kind) : "#334155";
      const numX = pin <= 13 ? p.x - 12 : p.x + 12;
      const numAnchor = pin <= 13 ? "end" : "start";
      return `
        <g ${role ? `onclick="window.multichannelEngine.selectChannel(${role.ch.ch})" style="cursor: pointer;"` : ""}>
          <circle cx="${p.x}" cy="${p.y}" r="7" fill="${sel ? ring : "#0f172a"}" stroke="${ring}" stroke-width="${sel ? 2 : 1.3}" />
          <text x="${p.x}" y="${p.y + 3.5}" fill="${sel ? "#0f172a" : ring}" font-size="10" font-weight="800" text-anchor="middle">${role ? role.sym : "·"}</text>
          <text x="${numX}" y="${p.y + 3}" fill="#64748b" font-size="7.5" text-anchor="${numAnchor}">${pin}</text>
          ${role ? `<title>Pin ${pin}: CH${role.ch.ch} ${role.kind === "hot" ? "Hot (+)" : role.kind === "cold" ? "Cold (−)" : "Shield / Ground (G)"}</title>` : "<title>Pin 13: not connected</title>"}
        </g>`;
    }).join("");

    const rjBank = (bank, first) => {
      const top = rowY(first) - 24;
      const height = 48 * 4;
      const active = item.ch >= first && item.ch < first + 4;
      const rows = chans.filter(c => c.ch >= first && c.ch < first + 4).map(c => {
        const sel = c.ch === item.ch;
        const yc = rowY(c.ch);
        return `
          <g onclick="window.multichannelEngine.selectChannel(${c.ch})" style="cursor: pointer;">
            <rect x="${RJ_X + 26}" y="${yc - 18}" width="${RJ_W - 32}" height="36" rx="3" fill="${sel ? "rgba(56,189,248,0.12)" : "#0f172a"}" stroke="${sel ? c.color : "#1e293b"}" />
            <text x="${RJ_X + 34}" y="${yc - 4}" fill="${c.color}" font-size="9.5" font-weight="800">PATH ${c.ch} · ${c.mnemonic}</text>
            <text x="${RJ_X + 34}" y="${yc + 10}" fill="#94a3b8" font-size="8">+ Pin ${c.rj45.hotPin} · − Pin ${c.rj45.coldPin} · G Drain</text>
          </g>`;
      }).join("");
      return `
        <rect x="${RJ_X}" y="${top}" width="${RJ_W}" height="${height}" rx="6" fill="#1e293b" stroke="${active ? item.color : "#475569"}" stroke-width="${active ? 2.2 : 1.2}" />
        <text transform="translate(${RJ_X + 16}, ${top + height / 2}) rotate(-90)" fill="${first === 1 ? "#34d399" : "#a855f7"}" font-size="9.5" font-weight="800" text-anchor="middle">AES72-4E RJ45 #${bank} · PATHS ${first}–${first + 3}</text>
        ${rows}`;
    };

    // RJ45 → breakout: + / − / G per channel
    const tails = chans.map(c => {
      const sel = c.ch === item.ch;
      const yc = rowY(c.ch);
      return [["hot", -7], ["cold", 0], ["gnd", 7]].map(([kind, dy]) => `
        <line x1="${RJ_X + RJ_W}" y1="${yc + dy}" x2="${OUT_X}" y2="${yc + dy}" stroke="${conductorColor(c, kind)}"
          stroke-width="${sel ? 2.2 : 1}" opacity="${sel ? 1 : 0.45}" ${kind === "cold" ? 'stroke-dasharray="5,2"' : ""} />`).join("");
    }).join("");

    const outputs = chans.map(c => {
      const sel = c.ch === item.ch;
      const yc = rowY(c.ch);
      const stroke = sel ? c.color : "#475569";
      const icon = isXlr
        ? `<circle cx="22" cy="21" r="14" fill="#1e293b" stroke="${stroke}" stroke-width="1.6" />
           <text x="15" y="18" fill="#94a3b8" font-size="7" font-weight="800" text-anchor="middle">G</text>
           <text x="29" y="18" fill="#10b981" font-size="8" font-weight="800" text-anchor="middle">+</text>
           <text x="22" y="31" fill="#ef4444" font-size="8" font-weight="800" text-anchor="middle">−</text>`
        : `<rect x="6" y="18" width="16" height="6" fill="#94a3b8" />
           <rect x="23" y="18" width="6" height="6" fill="#ef4444" />
           <polygon points="30,18 38,21 30,24" fill="#10b981" />`;
      const label = isXlr ? "XLR-3" : "1/4″ TRS";
      const pins = isXlr ? "Pin 2 + · Pin 3 − · Pin 1 G" : "Tip + · Ring − · Sleeve G";
      return `
        <g transform="translate(${OUT_X}, ${yc - 21})" data-mc-out="${c.ch}" onclick="window.multichannelEngine.selectChannel(${c.ch})" style="cursor: pointer;">
          <rect x="0" y="0" width="300" height="42" rx="5" fill="${sel ? "rgba(56, 189, 248, 0.15)" : "rgba(30, 41, 59, 0.4)"}" stroke="${stroke}" stroke-width="${sel ? 2 : 1}" />
          ${icon}
          <text x="46" y="18" fill="#f8fafc" font-size="10.5" font-weight="700">Path ${c.ch} (${label})</text>
          <text x="46" y="31" fill="#94a3b8" font-size="8.5">${pins}</text>
          <rect x="248" y="11" width="46" height="20" rx="3" fill="${sel ? c.color : "#0f172a"}" stroke="${benchColors[c.ch - 1]}" />
          <text x="271" y="25" fill="${sel ? "#0f172a" : benchColors[c.ch - 1]}" font-size="8.5" font-weight="800" text-anchor="middle">METER</text>
        </g>`;
    }).join("");

    container.innerHTML = `
      <svg viewBox="0 0 980 470" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto; background: #070b12; border-radius: 8px;">
        ${harness}
        ${tails}

        <!-- STAGE 1: AES59 DB25 (upright) with + / − / G on every contact -->
        <path d="M ${db.x},${db.y - 6} L ${db.x + 74},${db.y + 8} L ${db.x + 74},${db.y + DB_H - 8} L ${db.x},${db.y + DB_H + 6} Z" fill="#1e293b" fill-opacity="0.85" stroke="#38bdf8" stroke-width="2.5" />
        ${pinsSvg}
        <text x="${db.x + 37}" y="${db.y - 30}" fill="#38bdf8" font-size="13" font-weight="800" text-anchor="middle">AES59 DB25</text>
        <text x="${db.x + 37}" y="${db.y - 14}" fill="#e2e8f0" font-size="9.5" font-weight="800" text-anchor="middle">PATHS 1–4 SEND → · ← PATHS 5–8 RETURN</text>
        <text transform="translate(${db.x - 34}, ${db.y + DB_H / 2}) rotate(-90)" fill="#94a3b8" font-size="9" text-anchor="middle">8 balanced paths · Pin 13 n/c · Shell to chassis (AES48)</text>
        <text x="${db.x + 37}" y="${db.y + DB_H + 26}" fill="${item.color}" font-size="9.5" font-weight="700" text-anchor="middle">PATH ${item.ch} (${item.mnemonic}): + Pin ${item.db25.hot} · − Pin ${item.db25.cold} · G Pin ${item.db25.shield}</text>
        <g font-size="8.5" font-weight="700">
          <text x="${db.x - 60}" y="${db.y + DB_H + 44}" fill="#e2e8f0">+ Hot</text>
          <text x="${db.x - 10}" y="${db.y + DB_H + 44}" fill="#e2e8f0">− Cold (dashed)</text>
          <text x="${db.x + 82}" y="${db.y + DB_H + 44}" fill="#94a3b8">G Shield/Ground</text>
        </g>

        <!-- STAGE 2: Two AES72-4E RJ45 banks -->
        ${rjBank(1, 1)}
        ${rjBank(2, 5)}

        <!-- STAGE 3: 8 discrete breakouts, each wired to its meter in the right rack -->
        <text x="${OUT_X + 150}" y="22" fill="#f8fafc" font-size="11.5" font-weight="700" text-anchor="middle">8 × ${isXlr ? "XLR-3 (AES14)" : "1/4″ TRS"} → 8-CH METERS</text>
        ${outputs}
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
          <td style="color: ${c.color}; font-weight: 700;">Path ${c.ch}</td>
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
          <td style="color: ${c.color}; font-weight: 800;">Path ${c.ch}</td>
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

  selectChannel(chNum, fromBench = false) {
    this.selectedCh = chNum;
    if (!fromBench && window.eightChannelBench) window.eightChannelBench.focusLine(chNum, true);
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
