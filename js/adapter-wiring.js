/**
 * Vector SVG Adapter Wiring Schematics Suite
 * Connects Unbalanced Audio Gear (RCA & 1/4" TS) to:
 * - AES14 (XLR Balanced Input & Output)
 * - AES72-4E (RJ45 / Quad Twisted Pair 4-Channel Input & Output)
 * - AES59 (DB25 8-Channel Input & Output, Channels 1 to 8)
 * Conforming to AES14, AES72-4E, AES59, AES48, AES26, RaneNote 110 & Bill Whitlock (Jensen AN-003).
 */

const ADAPTER_DATA = {
  aes59Channels: [
    { ch: 1, hot: 24, cold: 12, gnd: 25, pair: "Pair 2 (SUN)", color: "#f97316" },
    { ch: 2, hot: 10, cold: 23, gnd: 11, pair: "Pair 3 (GRASS)", color: "#10b981" },
    { ch: 3, hot: 21, cold: 9, gnd: 22, pair: "Pair 1 (SKY)", color: "#38bdf8" },
    { ch: 4, hot: 7, cold: 20, gnd: 8, pair: "Pair 4 (EARTH)", color: "#ca8a04" },
    { ch: 5, hot: 18, cold: 6, gnd: 19, pair: "Pair 2 (SUN)", color: "#f97316" },
    { ch: 6, hot: 4, cold: 17, gnd: 5, pair: "Pair 3 (GRASS)", color: "#10b981" },
    { ch: 7, hot: 15, cold: 3, gnd: 16, pair: "Pair 1 (SKY)", color: "#38bdf8" },
    { ch: 8, hot: 1, cold: 14, gnd: 2, pair: "Pair 4 (EARTH)", color: "#ca8a04" }
  ],
  aes72Links: [
    { ch: 1, name: "Link 1", pair: "Pair 2 (SUN: Orange)", hotPin: 2, coldPin: 1, color: "#f97316" },
    { ch: 2, name: "Link 2", pair: "Pair 3 (GRASS: Green)", hotPin: 6, coldPin: 3, color: "#10b981" },
    { ch: 3, name: "Link 3", pair: "Pair 1 (SKY: Blue)", hotPin: 4, coldPin: 5, color: "#38bdf8" },
    { ch: 4, name: "Link 4", pair: "Pair 4 (EARTH: Brown)", hotPin: 8, coldPin: 7, color: "#ca8a04" }
  ]
};

class AdapterWiringEngine {
  constructor() {
    this.selectedStandard = "aes14"; // "aes14", "aes72", "aes59"
    this.selectedDirection = "unbal_to_bal"; // "unbal_to_bal", "bal_to_unbal"
    this.selectedTopology = "push_pull"; // "push_pull", "transformer_cross", "impedance_bal"
    this.selectedChannel = 1; // 1 to 8 for AES59, 1 to 4 for AES72
    this.init();
  }

  init() {
    this.bindDOM();
    this.render();
  }

  bindDOM() {
    // Standard tabs
    document.querySelectorAll(".adapter-nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".adapter-nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedStandard = btn.dataset.adapterStd;
        this.render();
      });
    });

    // Direction buttons
    document.querySelectorAll(".adapter-dir-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".adapter-dir-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedDirection = btn.dataset.adapterDir;
        this.render();
      });
    });

    // Topology selector (for balanced to unbalanced)
    const topoSelect = document.getElementById("adapter-topo-select");
    if (topoSelect) {
      topoSelect.addEventListener("change", (e) => {
        this.selectedTopology = e.target.value;
        this.render();
      });
    }

    // Channel pills
    document.querySelectorAll(".adapter-ch-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".adapter-ch-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.selectedChannel = parseInt(pill.dataset.ch, 10);
        this.render();
      });
    });
  }

  render() {
    const container = document.getElementById("adapter-svg-container");
    const diagText = document.getElementById("adapter-diag-text");
    const topoRow = document.getElementById("adapter-topo-row");
    const chRow = document.getElementById("adapter-ch-row");

    // Toggle visibility of topology dropdown & channel bar
    if (topoRow) {
      topoRow.style.display = (this.selectedDirection === "bal_to_unbal") ? "flex" : "none";
    }
    if (chRow) {
      chRow.style.display = (this.selectedStandard === "aes59" || this.selectedStandard === "aes72") ? "flex" : "none";
    }

    if (this.selectedStandard === "aes14") {
      this.renderAES14(container, diagText);
    } else if (this.selectedStandard === "aes72") {
      this.renderAES72(container, diagText);
    } else if (this.selectedStandard === "aes59") {
      this.renderAES59(container, diagText);
    }
  }

  renderAES14(container, diagText) {
    if (!container) return;
    const isUnbalToBal = this.selectedDirection === "unbal_to_bal";

    if (isUnbalToBal) {
      container.innerHTML = `
        <svg viewBox="0 0 860 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background: #060910; border-radius: 8px;">
          <!-- SEND: Unbalanced Output (RCA / TS) -->
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="220" height="190" rx="6" fill="#131d2e" stroke="#334155" stroke-width="1.5" />
            <text x="110" y="28" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">UNBALANCED OUTPUT</text>
            <text x="110" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">RCA Phono or 1/4″ TS Phone Jack</text>
            
            <!-- RCA/TS Graphic -->
            <rect x="25" y="65" width="170" height="42" rx="4" fill="#0b111e" stroke="#f59e0b" stroke-width="1.5" />
            <circle cx="50" cy="86" r="8" fill="#10b981" />
            <text x="70" y="90" fill="#10b981" font-size="10" font-weight="700">Tip / Center Pin (+)</text>
            
            <rect x="25" y="125" width="170" height="42" rx="4" fill="#0b111e" stroke="#64748b" stroke-width="1.5" />
            <circle cx="50" cy="146" r="8" fill="#ef4444" />
            <text x="70" y="150" fill="#ef4444" font-size="10" font-weight="700">Sleeve / Outer Shell (&minus;)</text>
          </g>

          <!-- INTERCONNECTION CABLE (Pseudo-Balanced 2-Conductor Shielded) -->
          <!-- Hot Wire -->
          <line x1="260" y1="116" x2="600" y2="86" stroke="#10b981" stroke-width="3" />
          <text x="430" y="92" fill="#10b981" font-size="10" font-weight="700" text-anchor="middle">Audio Signal (+)</text>

          <!-- Cold / Ground Reference Wire -->
          <line x1="260" y1="176" x2="600" y2="136" stroke="#ef4444" stroke-width="3" />
          <text x="430" y="130" fill="#ef4444" font-size="10" font-weight="700" text-anchor="middle">Signal Return Reference (&minus;)</text>

          <!-- Shield Wire (Tied to Chassis at Receiver ONLY, Floated at Send) -->
          <path d="M 600,186 L 380,186" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="5,4" />
          <circle cx="380" cy="186" r="4" fill="#38bdf8" />
          <text x="430" y="178" fill="#38bdf8" font-size="9" font-weight="700" text-anchor="middle">Cable Shield (FLOATED at Unbalanced End)</text>
          <text x="375" y="200" fill="#94a3b8" font-size="8" text-anchor="end">Open (No Ground Loop!)</text>

          <!-- RECEIVE: AES14 XLR Balanced Input -->
          <g transform="translate(600, 30)">
            <rect x="0" y="0" width="220" height="190" rx="6" fill="#131d2e" stroke="#38bdf8" stroke-width="1.8" />
            <text x="110" y="28" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">AES14 BALANCED INPUT</text>
            <text x="110" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">XLR-3 Female (Sockets)</text>

            <rect x="25" y="65" width="170" height="105" rx="6" fill="#0b111e" stroke="#334155" />
            <circle cx="50" cy="86" r="8" fill="#10b981" />
            <text x="70" y="90" fill="#10b981" font-size="10" font-weight="700">Pin 2: Hot (+)</text>

            <circle cx="50" cy="136" r="8" fill="#ef4444" />
            <text x="70" y="140" fill="#ef4444" font-size="10" font-weight="700">Pin 3: Cold (&minus;)</text>

            <circle cx="50" cy="186" r="8" fill="#38bdf8" />
            <text x="70" y="190" fill="#38bdf8" font-size="10" font-weight="700">Pin 1: Chassis (AES48)</text>
          </g>
        </svg>
      `;
      if (diagText) {
        diagText.innerHTML = `<strong>Unbalanced Send &rarr; AES14 Balanced Receive (Pseudo-Balanced Topology):</strong> Conforms strictly to RaneNote 110 & Bill Whitlock. RCA Tip connects to XLR Pin 2 (Hot). RCA Sleeve connects to XLR Pin 3 (Cold). The cable shield connects to XLR Pin 1 (Chassis) at the balanced receive end ONLY, and is left FLOATING at the RCA/TS end. This forces shield ground loop currents to zero ($I_{\\text{shield}} = 0$) while allowing the balanced receiver's differential input stage to reject common-mode ground noise completely!`;
      }
    } else {
      // Balanced Output to Unbalanced Input
      const isPushPull = this.selectedTopology === "push_pull";
      const isTransformer = this.selectedTopology === "transformer_cross";

      container.innerHTML = `
        <svg viewBox="0 0 860 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background: #060910; border-radius: 8px;">
          <!-- SEND: AES14 XLR Balanced Output -->
          <g transform="translate(40, 30)">
            <rect x="0" y="0" width="220" height="190" rx="6" fill="#131d2e" stroke="#38bdf8" stroke-width="1.8" />
            <text x="110" y="28" fill="#38bdf8" font-size="12" font-weight="700" text-anchor="middle">AES14 BALANCED OUTPUT</text>
            <text x="110" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">XLR-3 Male (Pins) &bull; ${isPushPull ? 'Type P Push-Pull' : (isTransformer ? 'Type T / F Floating' : 'Type I Impedance-Bal')}</text>

            <rect x="25" y="65" width="170" height="105" rx="6" fill="#0b111e" stroke="#334155" />
            <circle cx="50" cy="86" r="8" fill="#10b981" />
            <text x="70" y="90" fill="#10b981" font-size="10" font-weight="700">Pin 2: Hot (+)</text>

            <circle cx="50" cy="136" r="8" fill="#ef4444" />
            <text x="70" y="140" fill="#ef4444" font-size="10" font-weight="700">Pin 3: Cold (&minus;)</text>

            <circle cx="50" cy="186" r="8" fill="#38bdf8" />
            <text x="70" y="190" fill="#38bdf8" font-size="10" font-weight="700">Pin 1: Chassis (AES48)</text>
          </g>

          <!-- Pin 2 Hot Wire -->
          <line x1="260" y1="116" x2="600" y2="86" stroke="#10b981" stroke-width="3" />
          <text x="430" y="92" fill="#10b981" font-size="10" font-weight="700" text-anchor="middle">Pin 2 &rarr; Tip (+)</text>

          <!-- Pin 3 Treatment -->
          ${isPushPull ? `
            <line x1="260" y1="166" x2="390" y2="166" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,4" />
            <circle cx="390" cy="166" r="5" fill="#ef4444" />
            <text x="400" y="170" fill="#ef4444" font-size="10" font-weight="800">PIN 3 FLOATED (DO NOT GROUND!)</text>
            <text x="400" y="184" fill="#f87171" font-size="8">Grounding shorts inverting op-amp into limit!</text>
            <!-- Pin 1 Ground Wire to Sleeve -->
            <line x1="260" y1="216" x2="600" y2="176" stroke="#38bdf8" stroke-width="3" />
            <text x="430" y="210" fill="#38bdf8" font-size="10" font-weight="700" text-anchor="middle">Pin 1 (Chassis) &rarr; Sleeve (Return)</text>
          ` : `
            <!-- Jumpered Pin 3 to Ground / Sleeve -->
            <path d="M 260,166 L 380,166 L 600,176" fill="none" stroke="#ef4444" stroke-width="2.5" />
            <line x1="260" y1="216" x2="380" y2="166" stroke="#38bdf8" stroke-width="2" />
            <circle cx="380" cy="166" r="4" fill="#10b981" />
            <text x="430" y="160" fill="#10b981" font-size="10" font-weight="800" text-anchor="middle">PIN 3 BONDED TO SLEEVE (GROUND)</text>
            <text x="430" y="174" fill="#94a3b8" font-size="8.5" text-anchor="middle">Completes transformer coil return path</text>
          `}

          <!-- RECEIVE: Unbalanced Input (RCA / TS) -->
          <g transform="translate(600, 30)">
            <rect x="0" y="0" width="220" height="190" rx="6" fill="#131d2e" stroke="#334155" stroke-width="1.5" />
            <text x="110" y="28" fill="#f8fafc" font-size="12" font-weight="700" text-anchor="middle">UNBALANCED INPUT</text>
            <text x="110" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">RCA Phono or 1/4″ TS Jack</text>

            <rect x="25" y="65" width="170" height="42" rx="4" fill="#0b111e" stroke="#f59e0b" stroke-width="1.5" />
            <circle cx="50" cy="86" r="8" fill="#10b981" />
            <text x="70" y="90" fill="#10b981" font-size="10" font-weight="700">Tip / Center Pin (+)</text>

            <rect x="25" y="125" width="170" height="42" rx="4" fill="#0b111e" stroke="#64748b" stroke-width="1.5" />
            <circle cx="50" cy="146" r="8" fill="#38bdf8" />
            <text x="70" y="150" fill="#38bdf8" font-size="10" font-weight="700">Sleeve / Shell (GND)</text>
          </g>
        </svg>
      `;

      if (diagText) {
        if (isPushPull) {
          diagText.innerHTML = `<strong style="color: #f87171;">⚠️ AES14 Ground-Referenced Push-Pull (Type P) &rarr; Unbalanced Input:</strong> Pin 2 connects to RCA Tip (+). <strong>PIN 3 MUST BE LEFT UNCONNECTED (FLOATED)!</strong> Never tie Pin 3 to ground on a ground-referenced driver, as it creates a dead short across the negative operational amplifier, causing thermal distortion, heavy current draw, and power supply sag. Signal level drops by 6.02 dB (voltage halved).`;
        } else if (isTransformer) {
          diagText.innerHTML = `<strong style="color: #34d399;">✓ AES14 Transformer Floating (Type T) / Cross-Coupled (Type F) &rarr; Unbalanced Input:</strong> Pin 2 connects to RCA Tip (+). <strong>PIN 3 MUST BE BONDED TO PIN 1 / SLEEVE (GROUND)!</strong> For a transformer, grounding Pin 3 completes the secondary winding circuit loop; leaving it open produces zero audio. For cross-coupled active floating drivers (e.g. THAT OutSmarts), grounding Pin 3 automatically transfers +6 dB of gain to Pin 2, preserving 100% of the signal level with 0 dB loss!`;
        } else {
          diagText.innerHTML = `<strong style="color: #38bdf8;">✓ AES14 Impedance-Balanced (Type I) &rarr; Unbalanced Input:</strong> Pin 2 connects to RCA Tip (+). Pin 3 may be tied to ground or left floating without consequence, since Pin 3 carries no audio signal voltage. 100% full signal level preserved with 0 dB loss.`;
        }
      }
    }
  }

  renderAES72(container, diagText) {
    if (!container) return;
    const isUnbalToBal = this.selectedDirection === "unbal_to_bal";
    const ch = Math.min(4, Math.max(1, this.selectedChannel));
    const link = ADAPTER_DATA.aes72Links[ch - 1];

    container.innerHTML = `
      <svg viewBox="0 0 860 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background: #060910; border-radius: 8px;">
        <!-- Left: 4-Channel Unbalanced or AES72 -->
        <g transform="translate(30, 25)">
          <rect x="0" y="0" width="240" height="220" rx="8" fill="#131d2e" stroke="${link.color}" stroke-width="1.8" />
          <text x="120" y="24" fill="#f8fafc" font-size="11.5" font-weight="700" text-anchor="middle">
            ${isUnbalToBal ? '4 × UNBALANCED RCA / TS' : 'AES72-4E QTP RJ45'}
          </text>
          <text x="120" y="38" fill="#94a3b8" font-size="8.5" text-anchor="middle">
            ${isUnbalToBal ? 'Discrete Channels 1 to 4' : '4-Channel Category Cable Trunk'}
          </text>

          ${[1, 2, 3, 4].map(i => {
            const l = ADAPTER_DATA.aes72Links[i - 1];
            const isTarget = (i === ch);
            const y = 48 + (i - 1) * 40;
            return `
              <rect x="15" y="${y}" width="210" height="34" rx="4" fill="${isTarget ? 'rgba(56, 189, 248, 0.15)' : '#0b111e'}" stroke="${isTarget ? l.color : '#334155'}" stroke-width="${isTarget ? '2' : '1'}" />
              <text x="25" y="${y + 20}" fill="${l.color}" font-size="9.5" font-weight="800">Ch ${i}: ${l.name}</text>
              <text x="115" y="${y + 20}" fill="#94a3b8" font-size="8.5">Hot P${l.hotPin}+ &bull; Cold P${l.coldPin}&minus;</text>
            `;
          }).join("")}
        </g>

        <!-- Connecting Lines for Active Channel -->
        <line x1="270" y1="${65 + (ch - 1) * 40}" x2="590" y2="90" stroke="${link.color}" stroke-width="3" />
        <circle cx="270" cy="${65 + (ch - 1) * 40}" r="4" fill="${link.color}" />
        <circle cx="590" cy="90" r="4" fill="${link.color}" />
        <text x="430" y="80" fill="${link.color}" font-size="10" font-weight="800" text-anchor="middle">
          ${link.pair}: Hot Pin ${link.hotPin} (+)
        </text>

        <line x1="270" y1="${75 + (ch - 1) * 40}" x2="590" y2="150" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,3" />
        <circle cx="270" cy="${75 + (ch - 1) * 40}" r="4" fill="#94a3b8" />
        <circle cx="590" cy="150" r="4" fill="#94a3b8" />
        <text x="430" y="142" fill="#94a3b8" font-size="9.5" font-weight="700" text-anchor="middle">
          Return: Cold Pin ${link.coldPin} (&minus;)
        </text>

        <!-- Overall Shield Collar Ground Path -->
        <path d="M 270,225 L 590,225" stroke="#38bdf8" stroke-width="2.5" />
        <text x="430" y="218" fill="#38bdf8" font-size="9.5" font-weight="700" text-anchor="middle">
          OVERALL SHIELD COLLAR &rarr; 360° CHASSIS GROUND (AES48)
        </text>

        <!-- Right: Destination AES72 or Unbalanced -->
        <g transform="translate(590, 25)">
          <rect x="0" y="0" width="240" height="220" rx="8" fill="#131d2e" stroke="${link.color}" stroke-width="1.8" />
          <text x="120" y="24" fill="#f8fafc" font-size="11.5" font-weight="700" text-anchor="middle">
            ${isUnbalToBal ? 'AES72-4E QTP RECEIVER' : '4 × UNBALANCED INPUT'}
          </text>
          <text x="120" y="38" fill="#94a3b8" font-size="8.5" text-anchor="middle">
            Active Channel ${ch} Detail
          </text>

          <rect x="15" y="60" width="210" height="60" rx="5" fill="#0b111e" stroke="${link.color}" stroke-width="1.5" />
          <text x="25" y="84" fill="${link.color}" font-size="11" font-weight="800">Pin ${link.hotPin} (HOT +)</text>
          <text x="25" y="104" fill="#cbd5e1" font-size="9">Connects to RCA Tip / Center Conductor</text>

          <rect x="15" y="130" width="210" height="60" rx="5" fill="#0b111e" stroke="#64748b" stroke-width="1.5" />
          <text x="25" y="154" fill="#fca5a5" font-size="11" font-weight="800">Pin ${link.coldPin} (COLD &minus;)</text>
          <text x="25" y="174" fill="#94a3b8" font-size="9">Connects to RCA Sleeve / Ground Return</text>
        </g>
      </svg>
    `;

    if (diagText) {
      diagText.innerHTML = `<strong>AES72-4E (Quad Twisted Pair RJ45) &harr; Unbalanced 4-Way Adapter (Channel ${ch}: ${link.name} / ${link.pair}):</strong> 
      Conforming to AES72-4E Type 4E (Even Pins Positive rule): 
      Hot (+) is on <strong>Pin ${link.hotPin}</strong> (Even pin) and connects to RCA/TS Tip. 
      Cold (&minus;) is on <strong>Pin ${link.coldPin}</strong> (Odd pin) and connects to RCA/TS Sleeve. 
      The continuous outer braided/foil shield terminates to the RJ45 shielded connector metal collar and bonds to equipment chassis ground per AES48. 
      Pins 2, 4, 6, 8 are positive across all 4 links!`;
    }
  }

  renderAES59(container, diagText) {
    if (!container) return;
    const isUnbalToBal = this.selectedDirection === "unbal_to_bal";
    const ch = Math.min(8, Math.max(1, this.selectedChannel));
    const item = ADAPTER_DATA.aes59Channels[ch - 1];

    container.innerHTML = `
      <svg viewBox="0 0 860 280" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background: #060910; border-radius: 8px;">
        <!-- Left Stage -->
        <g transform="translate(30, 25)">
          <rect x="0" y="0" width="240" height="230" rx="8" fill="#131d2e" stroke="${item.color}" stroke-width="1.8" />
          <text x="120" y="24" fill="#f8fafc" font-size="11.5" font-weight="700" text-anchor="middle">
            ${isUnbalToBal ? 'UNBALANCED GEAR (RCA / TS)' : 'AES59 DB25 OUTPUT (SEND)'}
          </text>
          <text x="120" y="38" fill="#94a3b8" font-size="8.5" text-anchor="middle">
            Channel ${item.ch} Audio Source
          </text>

          <rect x="15" y="55" width="210" height="50" rx="4" fill="#0b111e" stroke="#10b981" />
          <circle cx="35" cy="80" r="7" fill="#10b981" />
          <text x="50" y="84" fill="#10b981" font-size="10" font-weight="700">RCA Tip / Audio Hot (+)</text>

          <rect x="15" y="115" width="210" height="50" rx="4" fill="#0b111e" stroke="#ef4444" />
          <circle cx="35" cy="140" r="7" fill="#ef4444" />
          <text x="50" y="144" fill="#ef4444" font-size="10" font-weight="700">RCA Sleeve / Return (&minus;)</text>

          <rect x="15" y="175" width="210" height="40" rx="4" fill="#0b111e" stroke="#38bdf8" />
          <circle cx="35" cy="195" r="5" fill="#38bdf8" />
          <text x="50" y="199" fill="#38bdf8" font-size="9" font-weight="700">Cable Shield (Float at Send)</text>
        </g>

        <!-- Center Traces to DB25 Pins -->
        <!-- Hot Wire -->
        <line x1="270" y1="105" x2="590" y2="85" stroke="${item.color}" stroke-width="3" />
        <circle cx="270" cy="105" r="4" fill="${item.color}" />
        <circle cx="590" cy="85" r="4" fill="${item.color}" />
        <text x="430" y="75" fill="${item.color}" font-size="10" font-weight="800" text-anchor="middle">
          Ch ${item.ch} Hot (+) &rarr; DB25 Pin ${item.hot}
        </text>

        <!-- Cold Wire -->
        <line x1="270" y1="165" x2="590" y2="145" stroke="#ef4444" stroke-width="2.5" />
        <circle cx="270" cy="165" r="4" fill="#ef4444" />
        <circle cx="590" cy="145" r="4" fill="#ef4444" />
        <text x="430" y="135" fill="#ef4444" font-size="9.5" font-weight="700" text-anchor="middle">
          Ch ${item.ch} Cold (&minus;) &rarr; DB25 Pin ${item.cold}
        </text>

        <!-- Ground / Shield Pin -->
        <line x1="270" y1="220" x2="590" y2="205" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,3" />
        <circle cx="270" cy="220" r="4" fill="#38bdf8" />
        <circle cx="590" cy="205" r="4" fill="#38bdf8" />
        <text x="430" y="195" fill="#38bdf8" font-size="9" font-weight="700" text-anchor="middle">
          Ch ${item.ch} Ground &rarr; DB25 Pin ${item.gnd}
        </text>

        <!-- Shroud Flange Chassis Direct Bond (AES-X249) -->
        <path d="M 590,240 L 430,240 L 430,260" stroke="#10b981" stroke-width="2" fill="none" />
        <text x="430" y="255" fill="#10b981" font-size="8.5" font-weight="700" text-anchor="middle">
          AES-X249 Metallic Shroud Flange &rarr; Chassis Bond
        </text>

        <!-- Right Stage: AES59 DB25 Connector -->
        <g transform="translate(590, 25)">
          <rect x="0" y="0" width="240" height="230" rx="8" fill="#131d2e" stroke="${item.color}" stroke-width="1.8" />
          <text x="120" y="24" fill="#a855f7" font-size="11.5" font-weight="700" text-anchor="middle">
            ${isUnbalToBal ? 'AES59 DB25 INPUT (RECEIVE)' : 'UNBALANCED DESTINATION'}
          </text>
          <text x="120" y="38" fill="#94a3b8" font-size="8.5" text-anchor="middle">
            DB25 Female (Sockets) &bull; Normative Standard
          </text>

          <rect x="15" y="55" width="210" height="50" rx="4" fill="#0b111e" stroke="${item.color}" stroke-width="1.5" />
          <text x="25" y="78" fill="${item.color}" font-size="11" font-weight="800">PIN ${item.hot} (HOT +)</text>
          <text x="25" y="94" fill="#94a3b8" font-size="8.5">Channel ${item.ch} In-Phase Audio Contact</text>

          <rect x="15" y="115" width="210" height="50" rx="4" fill="#0b111e" stroke="#ef4444" stroke-width="1.5" />
          <text x="25" y="138" fill="#fca5a5" font-size="11" font-weight="800">PIN ${item.cold} (COLD &minus;)</text>
          <text x="25" y="154" fill="#94a3b8" font-size="8.5">Channel ${item.ch} Inverted Audio Return</text>

          <rect x="15" y="175" width="210" height="40" rx="4" fill="#0b111e" stroke="#38bdf8" stroke-width="1.5" />
          <text x="25" y="195" fill="#38bdf8" font-size="10" font-weight="800">PIN ${item.gnd} (SHIELD GND)</text>
          <text x="25" y="207" fill="#64748b" font-size="7.5">Channel ${item.ch} Individual Shield Pin</text>
        </g>
      </svg>
    `;

    if (diagText) {
      diagText.innerHTML = `<strong>AES59 8-Channel DB25 &harr; Unbalanced Interconnection (Channel ${item.ch}):</strong> 
      For Channel ${item.ch}, the unbalanced audio signal connects to <strong>DB25 Pin ${item.hot} (Hot +)</strong> and the ground return connects to <strong>DB25 Pin ${item.cold} (Cold &minus;)</strong>. 
      The channel's individual shield terminates to <strong>DB25 Pin ${item.gnd}</strong>. 
      Per AES-X249, the outer metallic connector shroud flange ($C_{sf}$) and threaded jack screws ($C_{js}$) bond directly to the equipment chassis enclosure (AES48). 
      <strong>Pin 13 is strictly NC (No Connect).</strong>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.adapterWiringEngine = new AdapterWiringEngine();
});
