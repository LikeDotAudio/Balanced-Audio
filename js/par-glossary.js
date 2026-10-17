/**
 * Dennis A. Bohn Pro Audio Reference (PAR) Glossary, Greek Symbols & Style Guide Engine
 * Donated to AES by Dennis A. Bohn (2016)
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

class PARGlossaryEngine {
  constructor() {
    this.greekAlphabet = [
      { upper: "Α", lower: "α", name: "Alpha", engMeaning: "Direct proportionality; angular acceleration; alpha particle / decay. First / primary (alpha release)." },
      { upper: "Β", lower: "β", name: "Beta", engMeaning: "Common-emitter transistor current gain (h_FE); relativistic velocity ratio; beta decay. Next to first (beta testing)." },
      { upper: "Γ", lower: "γ", name: "Gamma", engMeaning: "Capital: Electrical reflection coefficient, gamma function. Small: Photon, adiabatic index of gas, Euler constant." },
      { upper: "Δ", lower: "δ", name: "Delta", engMeaning: "Capital: Delta-Sigma (Δ-Σ) conversion process, differential bridge delta (ΔZ). Small: Dirac delta function, finite difference increment." },
      { upper: "Ε", lower: "ε", name: "Epsilon", engMeaning: "Permittivity constant (ε_0 = 8.854 pF/m); dielectric constant in audio cable insulation; small infinitesimal quantity." },
      { upper: "Ζ", lower: "ζ", name: "Zeta", engMeaning: "Damping factor (ζ = 0.707 for critically damped Butterworth alignment in transformer termination and filters)." },
      { upper: "Η", lower: "η", name: "Eta", engMeaning: "Electrical and mechanical transducer efficiency; thermodynamic Carnot efficiency; refractive index." },
      { upper: "Θ", lower: "θ", name: "Theta", engMeaning: "Phase angle (radians or degrees); plane angle in vector acoustics; directional polar angle in microphone patterns." },
      { upper: "Ι", lower: "ι", name: "Iota", engMeaning: "Smallest Greek letter, mathematical inclusion, negligible increment." },
      { upper: "Κ", lower: "κ", name: "Kappa", engMeaning: "Susceptibility ratio, thermal conductivity, adiabatic gas coefficient." },
      { upper: "Λ", lower: "λ", name: "Lambda", engMeaning: "Acoustic and electromagnetic wavelength (λ = c / f); eigenvalues in linear modal analysis." },
      { upper: "Μ", lower: "μ", name: "Mu", engMeaning: "Magnetic permeability (μ_0, μ_r in transformer mu-metal cores); micro- (10^-6 prefix); coefficient of friction." },
      { upper: "Ν", lower: "ν", name: "Nu", engMeaning: "Wave frequency, kinematic viscosity, neutrino symbol." },
      { upper: "Ξ", lower: "ξ", name: "Xi", engMeaning: "Acoustic displacement variable, cascade damping coefficient." },
      { upper: "Ο", lower: "ο", name: "Omicron", engMeaning: "Standard order of magnitude notation O(n)." },
      { upper: "Π", lower: "π", name: "Pi", engMeaning: "Ratio of circle circumference to diameter (≈ 3.14159); capital: mathematical product of series." },
      { upper: "Ρ", lower: "ρ", name: "Rho", engMeaning: "Copper resistivity (1.68 × 10^-8 Ω·m for wire resistance calculations); volume mass density (kg/m^3)." },
      { upper: "Σ", lower: "σ", name: "Sigma", engMeaning: "Capital: Mathematical summation; Delta-Sigma (Δ-Σ) converters. Small: Standard deviation, electrical conductivity." },
      { upper: "Τ", lower: "τ", name: "Tau", engMeaning: "Time constant in RC and RL circuits (τ = R × C); mechanical shear stress and torque." },
      { upper: "Υ", lower: "υ", name: "Upsilon", engMeaning: "Velocity potential function in acoustic fluid mechanics." },
      { upper: "Φ", lower: "φ", name: "Phi", engMeaning: "Capital: Magnetic flux (Φ = B × A). Small: Phase shift or phase delay in filters; golden ratio (1.618...)." },
      { upper: "Χ", lower: "χ", name: "Chi", engMeaning: "Electric and magnetic susceptibility; voiceless fricative in phonetics." },
      { upper: "Ψ", lower: "ψ", name: "Psi", engMeaning: "Wave function in quantum mechanics; psi-network used in consumer audio decoupling." },
      { upper: "Ω", lower: "ω", name: "Omega", engMeaning: "Capital: Ohm (unit of electrical resistance and impedance). Small: Angular velocity/frequency (ω = 2πf in rad/s)." }
    ];

    this.glossaryTerms = {
      "1/4\" TRS": {
        term: "1/4″ TRS (tip-ring-sleeve)",
        cat: "Style Guide & Connectors",
        def: "All caps with a space, never lowercase or with a dash. Tip = Hot (+), Ring = Cold (-), Sleeve = Chassis Ground. Conforms to AES14.",
        bohnNote: "Rule from Dennis A. Bohn Pro Audio Style Guide: '1/4″ TRS or 1/4″ TS all caps with a space, never lowercase or with a dash.'"
      },
      "16-bit vs 16 bits": {
        term: "16-bit vs. 16 bits",
        cat: "Style Guide",
        def: "'16-bit' is used as an adjective to describe a product, such as 'a 16-bit converter,' and always uses a hyphen. '16 bits' is used as a noun, as in 'the unit has 16 bits,' without the hyphen.",
        bohnNote: "Pro Audio Reference Style Guide rule: Hyphenate preceding compound adjectives; omit for nouns."
      },
      "AESn": {
        term: "AES Standards Numbering Style",
        cat: "Style Guide & Standards",
        def: "Standards and Recommended Practices are represented as 'AESn' (no space or hyphen, e.g., AES3, AES14, AES48; not AES-3 or AES 3). Information documents are represented as 'AES-nid' (e.g., AES-6id). Project Reports as 'AES-Rn'.",
        bohnNote: "Pro Audio Reference: Standards numbering convention established by Dennis A. Bohn."
      },
      "active-high": {
        term: "active high vs. active-high",
        cat: "Style Guide",
        def: "'Active-high' is used as an adjective to describe a product ('an active-high logic block') and always uses a hyphen. 'Active high' is used as a noun ('the logic rule is active high').",
        bohnNote: "Rule: Use the hyphen if it precedes a noun and omit it when it follows a noun."
      },
      "balanced line": {
        term: "Balanced Line (IEC 60268-3)",
        cat: "Interconnections",
        def: "A transmission line consisting of two conductors symmetrically balanced with equal impedances to ground. Noise immunity depends solely on common-mode impedance balance, NOT on equal signal voltages.",
        bohnNote: "Dennis A. Bohn PAR: 'Only the common-mode impedance balance of the driver, line, and receiver play a role in noise rejection. It makes no difference whether the signal exists on one or both lines.'"
      },
      "Pin 1 Problem": {
        term: "The Pin 1 Problem (AES48)",
        cat: "Grounding & EMC",
        def: "The design error where connector shield contacts (Pin 1 on XLRs, D-sub shrouds) are wired to internal circuit signal ground (audio 0V PCB trace) instead of bonding directly to the metal enclosure. Converts shield RF currents directly into audible hum.",
        bohnNote: "Documented extensively by Neil Muncy (1995) and Dennis A. Bohn in RaneNote 110: 'Sound System Interconnection'."
      },
      "SCIN": {
        term: "Shield-Current-Induced Noise (SCIN)",
        cat: "Cables & Interference",
        def: "Differential noise induced onto balanced audio signal conductors by current flowing in the cable shield. Caused by magnetic coupling due to shield asymmetry or drain wire geometry.",
        bohnNote: "Discovered and named by Jim Brown (AES 1995/2003); analyzed in Dennis Bohn's PAR under Cable Shielding."
      },
      "CMRR": {
        term: "Common-Mode Rejection Ratio (CMRR)",
        cat: "Receivers",
        def: "A measure of a differential receiver's ability to reject common-mode noise voltages: CMRR = 20 log10(A_diff / A_cm). Primarily limited by source impedance balance (ΔZ) rather than internal resistor matching.",
        bohnNote: "PAR Reference: High receiver common-mode input impedance (Z_CM > 50 kΩ) protects against real-world source imbalances."
      },
      "Zobel Network": {
        term: "Zobel Network (Boucherot Cell)",
        cat: "Transformers & Filters",
        def: "A series RC network (R_Z in series with C_Z) connected across an audio transformer secondary to damp the high-frequency resonant tank formed by leakage inductance (L_leak) and winding capacitance (C_w).",
        bohnNote: "Invented by Otto Zobel (1923); prevents ultrasonic overshoot and op-amp slew-rate limiting."
      },
      "Ground Loop": {
        term: "Ground Loop",
        cat: "Grounding & EMC",
        def: "A circulating current path created when audio equipment chassis are connected to earth safety ground at different physical locations with differing ground potentials (V_GVD). Solved by balanced lines with AES48 Pin 1 bonding.",
        bohnNote: "PAR Entry: Dennis Bohn emphasizes that balanced audio lines do not require breaking earth safety grounds to achieve total silence."
      },
      "Common-Mode Voltage": {
        term: "Common-Mode Voltage (V_CM)",
        cat: "Voltages & Theory",
        def: "The average potential appearing identically on both signal conductors relative to a common reference (chassis or earth): V_CM = (V_+ + V_-) / 2.",
        bohnNote: "PAR Entry: Converted to differential hum only if source impedances are mismatched."
      },
      "dBu": {
        term: "dBu (Decibel Unloaded)",
        cat: "Levels & Units",
        def: "A logarithmic voltage ratio referenced to 0.775 V RMS (the voltage across 600 Ω dissipating 1 mW). Standard professional nominal line level is +4 dBu (1.228 V RMS).",
        bohnNote: "Style rule: Always insert a space between the number and 'dBu' (e.g., '+4 dBu', never '+4dBu')."
      },
      "dBV": {
        term: "dBV (Decibel Volt)",
        cat: "Levels & Units",
        def: "A logarithmic voltage ratio referenced strictly to 1.000 V RMS. Standard consumer nominal audio level is -10 dBV (0.316 V RMS).",
        bohnNote: "Style rule: Dennis Bohn notes the critical difference between dBu (0.775 V) and dBV (1.0 V) which creates a 11.8 dB gap between +4 dBu and -10 dBV."
      },
      "dBFS": {
        term: "dBFS (Decibels Full Scale)",
        cat: "Digital Audio",
        def: "Digital audio level scale where 0 dBFS represents the maximum possible digital peak code value before binary clipping.",
        bohnNote: "Style rule: Capital letters 'dBFS'. Follows EBU R68 (-18 dBFS = +4 dBu) or SMPTE RP155 (-20 dBFS = +4 dBu)."
      },
      "Impedance Balance": {
        term: "Impedance Balance",
        cat: "Topologies",
        def: "The fundamental condition where the output or input impedances of Pin 2 and Pin 3 to ground are identical (Z_P = Z_R). Equal signal voltages are completely unnecessary for perfect hum rejection.",
        bohnNote: "Dennis A. Bohn landmark paper: 'The 48 Laws of Balanced Audio' (AES SC-05-05)."
      },
      "Bridging": {
        term: "Bridging (Voltage Transfer)",
        cat: "Interconnections",
        def: "Interconnecting low output impedance sources (Z_OUT ≤ 100 Ω) to high input impedance receivers (Z_IN ≥ 10 kΩ, Z_IN ≥ 10 × Z_OUT) for maximum voltage transfer with minimal distortion.",
        bohnNote: "PAR Entry: Dennis Bohn stresses that modern audio uses bridging voltage transfer, rendering 600 Ω power matching obsolete."
      }
    };

    this.init();
  }

  init() {
    this.renderGreekTable();
    this.renderGlossaryCards();
    this.bindTooltips();
    this.bindSearch();
  }

  renderGreekTable() {
    const container = document.getElementById("par-greek-tbody");
    if (!container) return;

    container.innerHTML = this.greekAlphabet.map(g => `
      <tr>
        <td style="font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan); text-align: center;">${g.upper}</td>
        <td style="font-size: 1.25rem; font-weight: 700; color: var(--accent-emerald); text-align: center;">${g.lower}</td>
        <td><strong>${g.name}</strong></td>
        <td style="color: var(--text-secondary); font-size: 0.9rem;">${g.engMeaning}</td>
      </tr>
    `).join("");
  }

  renderGlossaryCards(filter = "") {
    const container = document.getElementById("par-glossary-grid");
    if (!container) return;

    const terms = Object.keys(this.glossaryTerms).filter(k => {
      if (!filter) return true;
      const f = filter.toLowerCase();
      const obj = this.glossaryTerms[k];
      return obj.term.toLowerCase().includes(f) || obj.def.toLowerCase().includes(f) || obj.cat.toLowerCase().includes(f);
    });

    if (terms.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-muted);">No pro audio terms found matching "${filter}".</div>`;
      return;
    }

    container.innerHTML = terms.map(k => {
      const item = this.glossaryTerms[k];
      return `
        <div class="detail-card par-card" style="border-left: 3px solid var(--accent-cyan);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
            <h4 style="margin: 0; color: var(--text-primary); font-size: 1rem;">${item.term}</h4>
            <span class="badge badge-accent" style="font-size: 0.7rem;">${item.cat}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.5;">${item.def}</p>
          <div style="font-size: 0.78rem; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.08); padding: 0.35rem 0.6rem; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <strong>Dennis Bohn Style / Reference:</strong> ${item.bohnNote}
          </div>
        </div>
      `;
    }).join("");
  }

  bindTooltips() {
    // Look for all .par-term elements across the entire page
    document.querySelectorAll(".par-term").forEach(el => {
      const termKey = el.dataset.parTerm;
      const customDef = el.dataset.parDef;

      let defText = customDef;
      if (!defText && termKey && this.glossaryTerms[termKey]) {
        defText = this.glossaryTerms[termKey].def;
      }

      if (defText) {
        el.setAttribute("title", `[PAR] ${defText}`);
      }
    });
  }

  bindSearch() {
    const searchInput = document.getElementById("par-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderGlossaryCards(e.target.value.trim());
      });
    }

    // Letter buttons
    document.querySelectorAll(".par-letter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".par-letter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const letter = btn.dataset.letter;
        if (letter === "ALL") {
          this.renderGlossaryCards("");
        } else {
          this.renderGlossaryCards(letter);
        }
      });
    });
  }
}

// Instantiate on window load
document.addEventListener("DOMContentLoaded", () => {
  window.parGlossaryEngine = new PARGlossaryEngine();
});
