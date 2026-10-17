/**
 * Multichannel Audio Hierarchy & Breakout Visualizer
 * Architecture: AES59 (8-Ch DB25) -> AES72-4E (4-Ch RJ45) -> 4x XLR or 4x TRS
 * Standards: AES59, AES-X249, AES72-4E, AES14, AES48, AES26
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

const MULTICHANNEL_DATA = {
  channels: [
    {
      ch: 1,
      bank: "Bank A (Ch 1–4)",
      db25: { hot: 24, cold: 12, shield: 25 },
      rj45: { pair: "Pair 1 (Blue / White-Blue)", hotPin: 4, coldPin: 5 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#38bdf8"
    },
    {
      ch: 2,
      bank: "Bank A (Ch 1–4)",
      db25: { hot: 10, cold: 22, shield: 11 },
      rj45: { pair: "Pair 2 (Orange / White-Orange)", hotPin: 1, coldPin: 2 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#10b981"
    },
    {
      ch: 3,
      bank: "Bank A (Ch 1–4)",
      db25: { hot: 21, cold: 9, shield: 23 },
      rj45: { pair: "Pair 3 (Green / White-Green)", hotPin: 3, coldPin: 6 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#f59e0b"
    },
    {
      ch: 4,
      bank: "Bank A (Ch 1–4)",
      db25: { hot: 7, cold: 19, shield: 8 },
      rj45: { pair: "Pair 4 (Brown / White-Brown)", hotPin: 7, coldPin: 8 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#ec4899"
    },
    {
      ch: 5,
      bank: "Bank B (Ch 5–8)",
      db25: { hot: 18, cold: 6, shield: 20 },
      rj45: { pair: "Pair 1 (Blue / White-Blue)", hotPin: 4, coldPin: 5 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#8b5cf6"
    },
    {
      ch: 6,
      bank: "Bank B (Ch 5–8)",
      db25: { hot: 4, cold: 16, shield: 5 },
      rj45: { pair: "Pair 2 (Orange / White-Orange)", hotPin: 1, coldPin: 2 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#06b6d4"
    },
    {
      ch: 7,
      bank: "Bank B (Ch 5–8)",
      db25: { hot: 15, cold: 3, shield: 17 },
      rj45: { pair: "Pair 3 (Green / White-Green)", hotPin: 3, coldPin: 6 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#a855f7"
    },
    {
      ch: 8,
      bank: "Bank B (Ch 5–8)",
      db25: { hot: 1, cold: 13, shield: 2 },
      rj45: { pair: "Pair 4 (Brown / White-Brown)", hotPin: 7, coldPin: 8 },
      xlr: { pin1: "Shield (Chassis)", pin2: "Hot (+)", pin3: "Cold (-)" },
      trs: { tip: "Hot (+)", ring: "Cold (-)", sleeve: "Shield (Chassis)" },
      color: "#ef4444"
    }
  ]
};

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
  }

  renderSVGDiagram(item) {
    const container = document.getElementById("mc-svg-container");
    if (!container) return;

    const isXlr = this.breakoutMode === "xlr";
    const destIconName = isXlr ? "4 × XLR-3 Circular Connectors" : "4 × 1/4″ TRS Phone Jacks";

    container.innerHTML = `
      <svg viewBox="0 0 980 340" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto; background: #070b12; border-radius: 8px;">
        <!-- Definitions for Glows & Filters -->
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

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
          <text x="85" y="122" fill="#f8fafc" font-size="9.5" font-weight="600" text-anchor="middle">Ch ${item.ch} Pin Allocation:</text>
          <text x="85" y="137" fill="${item.color}" font-size="9" font-weight="700" text-anchor="middle">Hot: Pin ${item.db25.hot} &bull; Cold: Pin ${item.db25.cold}</text>
          <text x="85" y="151" fill="#94a3b8" font-size="8.5" text-anchor="middle">Shield: Pin ${item.db25.shield} + Shroud (AES-X249)</text>

          <text x="85" y="215" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">AES59 DB25 TRUNK</text>
          <text x="85" y="230" fill="#94a3b8" font-size="9" text-anchor="middle">8-Channel Multichannel Trunk</text>
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
          <!-- RJ45 Modular Jack Icon -->
          <rect x="0" y="0" width="150" height="95" rx="6" fill="#1e293b" stroke="${item.ch <= 4 ? item.color : '#475569'}" stroke-width="${item.ch <= 4 ? '2.5' : '1.5'}" />
          <!-- Tab notch -->
          <rect x="50" y="0" width="50" height="12" fill="#0f172a" />
          <text x="75" y="28" fill="#34d399" font-size="11.5" font-weight="700" text-anchor="middle">AES72-4E (RJ45 #1)</text>
          <text x="75" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">Bank A: Channels 1–4</text>
          <rect x="15" y="52" width="120" height="32" rx="3" fill="#0f172a" />
          <text x="75" y="67" fill="${item.ch <= 4 ? item.color : '#94a3b8'}" font-size="8.5" font-weight="600" text-anchor="middle">Active: ${item.rj45.pair}</text>
          <text x="75" y="79" fill="#94a3b8" font-size="8" text-anchor="middle">Pins ${item.rj45.hotPin} (+) &amp; ${item.rj45.coldPin} (&minus;) &bull; Shield: Shell</text>
        </g>

        <!-- Bank B: RJ45 Port 2 (Ch 5–8) -->
        <g transform="translate(360, 160)" opacity="${item.ch > 4 ? '1' : '0.45'}">
          <!-- RJ45 Modular Jack Icon -->
          <rect x="0" y="0" width="150" height="95" rx="6" fill="#1e293b" stroke="${item.ch > 4 ? item.color : '#475569'}" stroke-width="${item.ch > 4 ? '2.5' : '1.5'}" />
          <!-- Tab notch -->
          <rect x="50" y="0" width="50" height="12" fill="#0f172a" />
          <text x="75" y="28" fill="#a855f7" font-size="11.5" font-weight="700" text-anchor="middle">AES72-4E (RJ45 #2)</text>
          <text x="75" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">Bank B: Channels 5–8</text>
          <rect x="15" y="52" width="120" height="32" rx="3" fill="#0f172a" />
          <text x="75" y="67" fill="${item.ch > 4 ? item.color : '#94a3b8'}" font-size="8.5" font-weight="600" text-anchor="middle">Active: ${item.rj45.pair}</text>
          <text x="75" y="79" fill="#94a3b8" font-size="8" text-anchor="middle">Pins ${item.rj45.hotPin} (+) &amp; ${item.rj45.coldPin} (&minus;) &bull; Shield: Shell</text>
        </g>

        <!-- Connecting lines to 4x Breakouts -->
        <path d="M 510,${item.ch <= 4 ? 85 : 205} C 570,${item.ch <= 4 ? 85 : 205} 580,145 640,145" stroke="${item.color}" stroke-width="2.5" fill="none" />

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
              // XLR Icon (Circular 3-pin)
              return `
                <g transform="translate(20, ${yPos})">
                  <rect x="0" y="0" width="270" height="42" rx="6" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isTarget ? '2' : '1'}" />
                  <!-- Circular XLR Icon -->
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
              // 1/4" TRS Icon (Tip-Ring-Sleeve phone plug)
              return `
                <g transform="translate(20, ${yPos})">
                  <rect x="0" y="0" width="270" height="42" rx="6" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isTarget ? '2' : '1'}" />
                  <!-- TRS Plug Icon -->
                  <rect x="14" y="18" width="18" height="6" fill="#94a3b8" /> <!-- Sleeve -->
                  <rect x="33" y="18" width="6" height="6" fill="#ef4444" /> <!-- Ring -->
                  <polygon points="40,18 48,21 40,24" fill="#10b981" /> <!-- Tip -->
                  
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
});
