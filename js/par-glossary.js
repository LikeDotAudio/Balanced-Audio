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
    "term": "1/4\u2033 TRS (tip-ring-sleeve)",
    "cat": "Style Guide & Connectors",
    "def": "All caps with a space, never lowercase or with a dash. Tip = Hot (+), Ring = Cold (-), Sleeve = Chassis Ground. Conforms to AES14.",
    "bohnNote": "Rule from Dennis A. Bohn Pro Audio Style Guide: '1/4\u2033 TRS or 1/4\u2033 TS all caps with a space, never lowercase or with a dash.'"
  },
  "16-bit vs 16 bits": {
    "term": "16-bit vs. 16 bits",
    "cat": "Style Guide",
    "def": "'16-bit' is used as an adjective to describe a product, such as 'a 16-bit converter,' and always uses a hyphen. '16 bits' is used as a noun, as in 'the unit has 16 bits,' without the hyphen.",
    "bohnNote": "Pro Audio Reference Style Guide rule: Hyphenate preceding compound adjectives; omit for nouns."
  },
  "AESn": {
    "term": "AES Standards Numbering Style",
    "cat": "Style Guide & Standards",
    "def": "Standards and Recommended Practices are represented as 'AESn' (no space or hyphen, e.g., AES3, AES14, AES48; not AES-3 or AES 3). Information documents are represented as 'AES-nid' (e.g., AES-6id). Project Reports as 'AES-Rn'.",
    "bohnNote": "Pro Audio Reference: Standards numbering convention established by Dennis A. Bohn."
  },
  "active-high": {
    "term": "active high vs. active-high",
    "cat": "Style Guide",
    "def": "'Active-high' is used as an adjective to describe a product ('an active-high logic block') and always uses a hyphen. 'Active high' is used as a noun ('the logic rule is active high').",
    "bohnNote": "Rule: Use the hyphen if it precedes a noun and omit it when it follows a noun."
  },
  "balanced line": {
    "term": "Balanced Line (IEC 60268-3)",
    "cat": "Interconnections",
    "def": "A transmission line consisting of two conductors symmetrically balanced with equal impedances to ground. Noise immunity depends solely on common-mode impedance balance, NOT on equal signal voltages.",
    "bohnNote": "Dennis A. Bohn PAR: 'Only the common-mode impedance balance of the driver, line, and receiver play a role in noise rejection. It makes no difference whether the signal exists on one or both lines.'"
  },
  "Pin 1 Problem": {
    "term": "The Pin 1 Problem (AES48)",
    "cat": "Grounding & EMC",
    "def": "The design error where connector shield contacts (Pin 1 on XLRs, D-sub shrouds) are wired to internal circuit signal ground (audio 0V PCB trace) instead of bonding directly to the metal enclosure. Converts shield RF currents directly into audible hum.",
    "bohnNote": "Documented extensively by Neil Muncy (1995) and Dennis A. Bohn in RaneNote 110: 'Sound System Interconnection'."
  },
  "SCIN": {
    "term": "Shield-Current-Induced Noise (SCIN)",
    "cat": "Cables & Interference",
    "def": "Differential noise induced onto balanced audio signal conductors by current flowing in the cable shield. Caused by magnetic coupling due to shield asymmetry or drain wire geometry.",
    "bohnNote": "Discovered and named by Jim Brown (AES 1995/2003); analyzed in Dennis Bohn's PAR under Cable Shielding."
  },
  "CMRR": {
    "term": "Common-Mode Rejection Ratio (CMRR)",
    "cat": "Receivers",
    "def": "A measure of a differential receiver's ability to reject common-mode noise voltages: CMRR = 20 log10(A_diff / A_cm). Primarily limited by source impedance balance (\u0394Z) rather than internal resistor matching.",
    "bohnNote": "PAR Reference: High receiver common-mode input impedance (Z_CM > 50 k\u03a9) protects against real-world source imbalances."
  },
  "Zobel Network": {
    "term": "Zobel Network (Boucherot Cell)",
    "cat": "Transformers & Filters",
    "def": "A series RC network (R_Z in series with C_Z) connected across an audio transformer secondary to damp the high-frequency resonant tank formed by leakage inductance (L_leak) and winding capacitance (C_w).",
    "bohnNote": "Invented by Otto Zobel (1923); prevents ultrasonic overshoot and op-amp slew-rate limiting."
  },
  "Ground Loop": {
    "term": "Ground Loop",
    "cat": "Grounding & EMC",
    "def": "A circulating current path created when audio equipment chassis are connected to earth safety ground at different physical locations with differing ground potentials (V_GVD). Solved by balanced lines with AES48 Pin 1 bonding.",
    "bohnNote": "PAR Entry: Dennis Bohn emphasizes that balanced audio lines do not require breaking earth safety grounds to achieve total silence."
  },
  "Common-Mode Voltage": {
    "term": "Common-Mode Voltage (V_CM)",
    "cat": "Voltages & Theory",
    "def": "The average potential appearing identically on both signal conductors relative to a common reference (chassis or earth): V_CM = (V_+ + V_-) / 2.",
    "bohnNote": "PAR Entry: Converted to differential hum only if source impedances are mismatched."
  },
  "dBu": {
    "term": "dBu (Decibel Unloaded)",
    "cat": "Levels & Units",
    "def": "A logarithmic voltage ratio referenced to 0.775 V RMS (the voltage across 600 \u03a9 dissipating 1 mW). Standard professional nominal line level is +4 dBu (1.228 V RMS).",
    "bohnNote": "Style rule: Always insert a space between the number and 'dBu' (e.g., '+4 dBu', never '+4dBu')."
  },
  "dBV": {
    "term": "dBV (Decibel Volt)",
    "cat": "Levels & Units",
    "def": "A logarithmic voltage ratio referenced strictly to 1.000 V RMS. Standard consumer nominal audio level is -10 dBV (0.316 V RMS).",
    "bohnNote": "Style rule: Dennis Bohn notes the critical difference between dBu (0.775 V) and dBV (1.0 V) which creates an 11.8 dB gap between +4 dBu and -10 dBV."
  },
  "dBFS": {
    "term": "dBFS (Decibels Full Scale)",
    "cat": "Digital Audio",
    "def": "Digital audio level scale where 0 dBFS represents the maximum possible digital peak code value before binary clipping.",
    "bohnNote": "Style rule: Capital letters 'dBFS'. Follows EBU R68 (-18 dBFS = +4 dBu) or SMPTE RP155 (-20 dBFS = +4 dBu)."
  },
  "Impedance Balance": {
    "term": "Impedance Balance",
    "cat": "Topologies",
    "def": "The fundamental condition where the output or input impedances of Pin 2 and Pin 3 to ground are identical (Z_P = Z_R). Equal signal voltages are completely unnecessary for perfect hum rejection.",
    "bohnNote": "Dennis A. Bohn landmark paper: 'The 48 Laws of Balanced Audio' (AES SC-05-05)."
  },
  "Bridging": {
    "term": "Bridging (Voltage Transfer)",
    "cat": "Interconnections",
    "def": "Interconnecting low output impedance sources (Z_OUT \u2264 100 \u03a9) to high input impedance receivers (Z_IN \u2265 10 k\u03a9, Z_IN \u2265 10 \u00d7 Z_OUT) for maximum voltage transfer with minimal distortion.",
    "bohnNote": "PAR Entry: Dennis Bohn stresses that modern audio uses bridging voltage transfer, rendering 600 \u03a9 power matching obsolete."
  },
  "Pseudo-balanced": {
    "term": "Pseudo-Balanced (Impedance-Balanced)",
    "cat": "Circuit Topologies",
    "def": "An active single-ended driver driving Pin 2 (Hot), while Pin 3 (Cold) is tied to ground through a passive resistor matching the exact output impedance of the active driver stage. Yields the full common-mode noise rejection of a balanced receiver at low cost.",
    "bohnNote": "Detailed in Dennis Bohn's RaneNote 110: 'Sound System Interconnection'."
  },
  "Phantom Power": {
    "term": "Phantom Power (P48/P24/P12)",
    "cat": "Powering & Transducers",
    "def": "Method of providing DC electrical power to active condenser microphones over standard 2-conductor shielded balanced audio cables. Conforms to DIN EN 61938 and IEC 60268-15.",
    "bohnNote": "Historical Context: Developed in 1966 for Norwegian Broadcasting (NRK) in Oslo, which had 48V DC auxiliary lighting systems available. Positive 48V is fed identically to pins 2 and 3 through matched 6.81 k\u03a9 resistors, using the cable shield (pin 1) as negative return."
  },
  "Phase vs Polarity": {
    "term": "Phase vs. Polarity",
    "cat": "Style Guide & Theory",
    "def": "Polarity refers to the non-inverting (+) vs. inverting (-) electrical or physical orientation of a circuit (instantaneous sign reversal across all frequencies). Phase is a frequency-dependent time delay (expressed in degrees or radians: \u03b8 = 2\u03c0ft).",
    "bohnNote": "Dennis Bohn Pro Audio Style Guide: 'Never say 'out of phase' when you mean 'reversed polarity'. Flipping hot and return wires reverses polarity, not phase.'"
  },
  "\u0391": {
    "term": "\u0391",
    "cat": "Terminology",
    "def": "\u2013 alpha \u2013 capital First letter of the Greek alphabet, therefore takes on the meaning of first, best, primary, number one, etc. Used as an adjective as in alpha male or alpha version. \u03b1 \u2013 alpha -small 1. Mathematics. Direct proportionality. 2. Physics. Angular acceleration. Alpha particle and alpha decay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0392": {
    "term": "\u0392",
    "cat": "Terminology",
    "def": "\u2013 beta \u2013 capital Second letter of the Greek alphabet, therefore takes on the meaning of being next to first, or almost there, as in beta testing. \u03b2 \u2013 beta \u2013 small 1. Phonology. Symbol for the voiced bilabial fricative [IPA]. 2. Special Relativity. Symbol for the speed of an object relative to the speed of light. 3. Particle Physics. The beta particle and beta decay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0393": {
    "term": "\u0393",
    "cat": "Terminology",
    "def": "\u2013 gamma \u2013 capital 1. Electrical Engineering. Symbol for the reflection coefficient. 2. Mathematics. The gamma function, as related to factorials. 3. Probability & Statistics. The gamma distribution. \u03b3 \u2013 gamma \u2013 small 1. Physics. Symbol for photon. Also symbol for adiabatic index of a gas. 2. Astronomy. Gamma factor and gamma rays. 3. Mathematics. Symbol for the Euler-Mascheroni constant (sometimes shortened to Euler Constant).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0394": {
    "term": "\u0394",
    "cat": "Terminology",
    "def": "\u2013 delta \u2013 capital 1. Data Converters. Delta-Sigma conversion (\u0394-process. A favorite audio data converter technology using a delta change as the heart of the process. 2. Geography. Name for the triangular shape caused by sediment deposits at the mouth of a river. 3. Physics. Delta particles in particle physics. \u03b4 \u2013 delta \u2013 small 1. Calculus. Symbol used to represent a very small change in a value, often called a delta change; a finite increment in a variable. 2. Mathematics. Symbol for the Dirac delta function (or just delta function) ; symbol for the Kronecker delta. 3. Proofreading. Symbol for deletion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0395": {
    "term": "\u0395",
    "cat": "Terminology",
    "def": "\u2013 epsilon \u2013 capital Rarely seen since it is too close to the English letter \u201cE.\u201d \u03b5 \u2013 epsilon \u2013 small 1. Electrical Engineering. Symbol for the permittivity constant. 2. Mathematics. A very small quantity; in tensor calculus, the Levi-Civita symbol, also called the permutation symbol; set membership. 3. Computer Science. Symbol for an empty string.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0396": {
    "term": "\u0396",
    "cat": "Terminology",
    "def": "\u2013 zeta \u2013 capital Rarely seen since it is too close to the English letter \u201cZ.\u201d \u03b6 \u2013 zeta \u2013 small Mathematics. The Riemann zeta function and other zeta functions.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0397": {
    "term": "\u0397",
    "cat": "Terminology",
    "def": "\u2013 eta \u2013 capital Rarely seen since it is too close to the English letter \u201cH.\u201d \u03b7 \u2013 eta \u2013 small 1. Thermodynamics. Symbol for the efficiency of a Carnot heat engine. 2. Physics. Symbol for refractive index of an optical medium.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0398": {
    "term": "\u0398",
    "cat": "Terminology",
    "def": "\u2013 theta \u2013 capital Symbol for death since it is an abbreviation for the Greek word thanatos, meaning the personification of death. \u03b8 \u2013 theta \u2013 small 1. Trigonometry. Symbol for an unknown angle. 2. Geometry. Symbol for a plane angle. 3. Phonology. Symbol for voiceless dental fricative [IPA].",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u0399": {
    "term": "\u0399",
    "cat": "Terminology",
    "def": "\u2013 iota \u2013 capital Rarely seen since it is too close to the English letter \u201cI.\u201d \u03b9 \u2013 iota \u2013 small The smallest letter in the Greek alphabet, hence the popular English usage to mean small, as in, \u201cIt doesn\u2019t matter one iota.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u039a": {
    "term": "\u039a",
    "cat": "Terminology",
    "def": "\u2013 kappa \u2013 capital Rarely seen since it is too close to the English letter \u201cK.\u201d \u03ba \u2013 kappa \u2013 small 1. Physics. Alternate symbol for adiabatic index of a gas. 2. Mathematics. The Kappa Curve.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u039b": {
    "term": "\u039b",
    "cat": "Terminology",
    "def": "\u2013 lambda \u2013 capital 1. Particle Physics. Symbol for lambda particles. \u03bb \u2013 lambda \u2013 small 1. Electromagnetic Waves. Symbol for wavelength. 2. Mathematics. Symbol for eigen values in linear algebra.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u039c": {
    "term": "\u039c",
    "cat": "Terminology",
    "def": "\u2013 mu \u2013 capital Rarely seen since it is too close to the English letter \u201cM.\u201d \u03bc \u2013 mu \u2013 small 1. Symbol for micro- and micron. 2. Statistics. Symbol for the mean. 3. Physics. Symbol for coefficient of friction. 4. Electromagnetism. Symbol for permeability.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u039d": {
    "term": "\u039d",
    "cat": "Terminology",
    "def": "\u2013 nu \u2013 capital Rarely seen since it is too close to the English letter \u201cN.\u201d \u03bd \u2013 nu \u2013 small 1. Physics. Symbol for the frequency of a wave. 2. Particle Physics. Symbol for any of the three kinds of neutrinos.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u039e": {
    "term": "\u039e",
    "cat": "Terminology",
    "def": "\u2013 xi \u2013 capital 1. Particle Physics. Symbol for cascade particles. \u03be \u2013 xi \u2013 small 1. Mathematics. Symbol for the Xi-Function.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u039f": {
    "term": "\u039f",
    "cat": "Terminology",
    "def": "\u2013 omicron \u2013 capital Rarely seen since it is too close to the English letter \u201cO.\u201d \u03bf \u2013 omicron \u2013 small Ditto to above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a0": {
    "term": "\u03a0",
    "cat": "Terminology",
    "def": "\u2013 pi \u2013 capital 1. Mathematics. Symbol for product, as in multiplication. \u03c0 \u2013 pi \u2013 small 1. Symbol for the ratio of the circumference of a circle to its diameter; a transcendental number, equal to approximately 3.14159. Note that the ratio of the circumference of an igloo to its diameter equals Eskimo Pi.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a1": {
    "term": "\u03a1",
    "cat": "Terminology",
    "def": "\u2013 rho \u2013 capital Rarely seen since it is too close to the English letter \u201cP.\u201d \u03c1 \u2013 rho \u2013 small 1. Physics. Symbol for resistivity and density.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a3": {
    "term": "\u03a3",
    "cat": "Terminology",
    "def": "\u2013 sigma \u2013 capital 1. Mathematics. Symbol for summation. 2. Data Converters. Delta-Sigma conversion (\u0394-\u03a3) process. A favorite audio data converter technology using delta change and summation. \u03c3 \u2013 sigma \u2013 small 1. Statistics. Symbol for the standard deviation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a4": {
    "term": "\u03a4",
    "cat": "Terminology",
    "def": "\u2013 tau \u2013 capital Rarely seen since it is too close to the English letter \u201cT.\u201d \u03c4 \u2013 tau \u2013 small 1. Mechanics. Symbol for torque. 2. Electronics. Symbol for the time-constant in an RC circuit.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a5": {
    "term": "\u03a5",
    "cat": "Terminology",
    "def": "\u2013 upsilon \u2013 capital Rarely seen since it is too close to the English letter \u201cY.\u201d \u03c5 \u2013 upsilon \u2013 small Rarely seen since it is too close to the English letter \u201cu.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a6": {
    "term": "\u03a6",
    "cat": "Terminology",
    "def": "\u2013 phi \u2013 capital 1. Physics. Symbol for magnetic flux. \u03c6 \u2013 phi \u2013 small 1. Electronics. Symbol for phase or phase shift. 2. Mathematics. Symbol for the number 1.618 \u2026 the golden number. See Phi.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a7": {
    "term": "\u03a7",
    "cat": "Terminology",
    "def": "\u2013 chi \u2013 capital Rarely seen since it is too close to the English letter \u201cX.\u201d \u03c7 \u2013 chi \u2013 small 1. Physics. Symbol for electric susceptibility. 2. Phonology. Symbol for the voiceless uvular fricative [IPA].",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a8": {
    "term": "\u03a8",
    "cat": "Terminology",
    "def": "\u2013 psi \u2013 capital Rarely seen since it is difficult to distinguish between the capital and the small psi symbols. \u03c8 \u2013 psi \u2013 small 1. Quantum Mechanics. Symbol for the wave function. Symbol for psi-network used in consumer audio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "\u03a9": {
    "term": "\u03a9",
    "cat": "Terminology",
    "def": "\u2013 omega \u2013 capital 1. Electronics. Symbol for ohm. 2. Last letter of the Greek alphabet so takes on the meaning of being last. \u03c9 \u2013 omega \u2013 small 1. Electronics. Symbol for angular velocity, i.e., frequency in radians/second = 2\u03c0f.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "AES Follow": {
    "term": "AES Follow",
    "cat": "Pro Audio Reference",
    "def": "Us Quick Links About Events Community Membership Diversity & Inclusion Mission Statement Contact 697 3rd Avenue, Suite 405 NY, NY 10017 +1 212 661 8528 Stay Connected With us Subscribe By clicking Subscribe, you acknowledge that you have read and accepted our Privacy Policy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (GREEK)"
  },
  "A": {
    "term": "A",
    "cat": "Terminology",
    "def": "Symbol for ampere.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "\u00c5": {
    "term": "\u00c5",
    "cat": "Terminology",
    "def": "See: angstrom.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A2IM (American": {
    "term": "A2IM (American",
    "cat": "Pro Audio Reference",
    "def": "Association of Independent Music) \u201c\u2026 serves the Independent music community as a unified voice representing a broad coalition of music labels \u2026 .\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AAAF (American": {
    "term": "AAAF (American",
    "cat": "Pro Audio Reference",
    "def": "Academy of Audiology Foundation) Their mission: \u201cTo promote philanthropy in support of research, education, and public awareness in audiology and hearing science.\u201d [From website.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AAC (Advanced": {
    "term": "AAC (Advanced",
    "cat": "Pro Audio Reference",
    "def": "Audio Coding) Shortened name for the MPEG-2 Advanced Audio Coding specification, declared an international standard by MPEG in April 1997; however, now the term is used also to refer to MPEG-4 advanced audio coding. Made most popular by Apple using it for compressing audio CDs for their iPod and iTunes products.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AAM (Academy": {
    "term": "AAM (Academy",
    "cat": "Pro Audio Reference",
    "def": "of Ancient Music) Founded by British musician Christopher Hogwood in 1973. They perform using instruments that date from the time when the music was composed. \u201cUnder Hogwood\u2019s visionary leadership, it established itself as a leading authority on how music was originally performed: this pioneering work had a transformative impact on the world of classical music, and lies at the heart of the AAM\u2019s reputation for musical excellence.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AAM (American": {
    "term": "AAM (American",
    "cat": "Pro Audio Reference",
    "def": "Association of Museums) \u201cAAM\u2019s mission is to enhance the value of museums to their communities through leadership, advocacy, and service.\u201d Valuable resource for sound contractors, integrators, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AB": {
    "term": "AB",
    "cat": "Microphones",
    "def": "A stereo recording technique whereby two microphones are spaced apart (anywhere from about 3 feet to as much as 10 feet) to create a time difference between them that the human brain perceives and translates into stereo localization and imaging. Also called time-difference recording.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ABA (Audio": {
    "term": "ABA (Audio",
    "cat": "Pro Audio Reference",
    "def": "Branding Academy) \u201cThe Audio Branding Academy was founded by Cornelius Ringe, Kai Bronner and Rainer Hirt in Hamburg in February 2009. It is the first independent institution for acoustic brand communication, aiming at promoting an intentional and responsible use of acoustic stimuli within brand communication. The Audio Branding Academy is a unique competence center for intersection points of brands, sound and environment and combines a forum, think tank, expert network and education. It hosts the annual Audio Branding Congress and regularly organizes workshops on various audio branding related topics.\u201d [From website; hit link]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "abbreviation 1": {
    "term": "abbreviation 1",
    "cat": "Pro Audio Reference",
    "def": "The act or product of shortening. 2. A shortened form of a word or phrase used chiefly in writing to represent the complete form, such as Mass. for Massachusetts or USMC for United States Marine Corps. [AHD] Compare with acronym and initialism.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Abe, Yoshiharu": {
    "term": "Abe, Yoshiharu",
    "cat": "Pro Audio Reference",
    "def": "(1931 -2013) One of the founders of TEAC, inventor of the Portastudio\u00ae and consider the father of personal multitrack recording.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Abffusor\u00ae Registered": {
    "term": "Abffusor\u00ae Registered",
    "cat": "Pro Audio Reference",
    "def": "trademark of RPG Diffusor Systems for their proprietary panel combining absorption and diffusion characteristics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A-B powering": {
    "term": "A-B powering",
    "cat": "Pro Audio Reference",
    "def": "See: T-powering.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "absolute pitch": {
    "term": "absolute pitch",
    "cat": "Music",
    "def": "The ability to name the pitch of a note, or to sing a named note, without reference to a previously sounded one. It is sometimes called \u2018perfect pitch.\u2019 [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "absorption To absorb": {
    "term": "absorption To absorb",
    "cat": "Pro Audio Reference",
    "def": "is to receive (an impulse) without echo or recoil: a fabric that absorbs sound; a bumper that absorbs impact; therefore absorption is the act or process of absorbing. [AHD] The absorption of sound is the process by which sound energy is diminished when passing through a medium or when striking a surface, i.e., sound is attenuated by absorption. [AHD] The physical mechanism is usually the conversion of sound into heat, i.e. sound molecules lose energy upon striking the material\u2019s atoms, which become agitated, which we characterized as warmth; thus, absorption is literally the changing of sound energy to heat. A material\u2019s ability to absorb sound is quantified by its absorption coefficient, whose value ranges between 0 (total reflection) and 1 (total absorption), and just to keep things interesting, varies with sound frequency and the angle of incidence. See Siegfried Linkwitz\u2019s Acoustic absorption and acoustic resistors; contrast with isolation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A-B testing": {
    "term": "A-B testing",
    "cat": "Pro Audio Reference",
    "def": "(or A/B testing) A comparison testing methodology where a first test, A, is compared against a second test, B.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ABX testing": {
    "term": "ABX testing",
    "cat": "Pro Audio Reference",
    "def": "(aka ABX double-blind comparator) A system controller for audio component comparison testing where the listener hears sound-A, sound-B, and sound-X. The listener must make a determination as to whether X is A or B. The subject may go back to A and B as often and for as long as necessary to make a determination. The listener knows that A and B are different and that X is either A or B, so there is always a correct answer. The \u201cdouble-blind\u201d part comes from neither the tester nor the listener (can be the same) knows what source is A, B or X, only the controller knows, which is downloaded after the test is complete to determine the results. First invented in 1977 by Arnold Krueger and Bern Muller (of the famous Southeastern Michigan Woofer and Tweeter Marching Society or SMWTMS), later refined and marketed by David Clark and his ABX Company. [For complete details see David L. Clark, \u201cHigh-Resolution Subjective Testing Using a Double-Blind Comparator\u201d, J. Audio Eng. Soc., Vol. 30 No. 5, May 1982, pp. 330-338.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AC": {
    "term": "AC",
    "cat": "Terminology",
    "def": "See: alternating current.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AC-3 (audio": {
    "term": "AC-3 (audio",
    "cat": "Pro Audio Reference",
    "def": "coding 3) Dolby\u2019s digital audio data compression algorithm adopted for HDTV transmission and used in DVDs, laserdiscs and CDs for 5.1 multichannel home theater use. See Dolby Digital. Competes with DTS Consumer. The terms AC-1 and AC-2 are other versions developed by Dolby for different applications. [See Usage Note under AES3 for transmission gotcha caveats.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Academy of": {
    "term": "Academy of",
    "cat": "Pro Audio Reference",
    "def": "Ancient Music See: AAM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Academy curve": {
    "term": "Academy curve",
    "cat": "Pro Audio Reference",
    "def": "The name of the standard mono optical track that has been around since the beginning of sound for film. Standardized in 1938, it has improved (very) slightly over the years. Also known as the N (normal) curve the response is flat 100 Hz-1.6 kHz, and is down 7 dB at 40 Hz, 10 dB at 5 kHz and 18 dB at 8 kHz. This drastic \u201cdumping\u201d of the high-end was to hide the high-frequency \u201cfrying\u201d and \u201ccrackling\u201d noise inherent in early film sound production. Compare with X curve.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "a cappella": {
    "term": "a cappella",
    "cat": "Music",
    "def": "Without instrumental accompaniment. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Accelerated-Slope\u2122": {
    "term": "Accelerated-Slope\u2122",
    "cat": "Pro Audio Reference",
    "def": "A trademark of Rane Corporation used to describe their family of patented tone control technologies that produce steeper slopes than normal, thus allowing boost/cut of high and low frequencies without disturbing the critical midband frequencies.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "accommodation Said to be": {
    "term": "accommodation Said to be",
    "cat": "Pro Audio Reference",
    "def": "the most misspelled word in American writing (two \u201cc\u201ds and two \u201cm\u201ds).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "accordion \u201cAn": {
    "term": "accordion \u201cAn",
    "cat": "Pro Audio Reference",
    "def": "instrument in harmony with the sentiments of an assassin.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "accumulator": {
    "term": "accumulator",
    "cat": "Computers",
    "def": "A register or electric circuit in a calculator or computer, in which the results of arithmetical and logical operations are formed. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ACM (Academy": {
    "term": "ACM (Academy",
    "cat": "Pro Audio Reference",
    "def": "of Country Music) \u201cImproving lives by connecting fans, artists and the industry.\u201d [from website]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Acousta\u2013Voicette\u2122 Equalizers": {
    "term": "Acousta\u2013Voicette\u2122 Equalizers",
    "cat": "Pro Audio Reference",
    "def": "Altec Lansing trademarked name for their model 729A graphic equalizer, a two channel, 24-band, cut-only 1/3-octave design introduced in 1971. This was the first commercially available 1/3-octave graphic equalizer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic calculators": {
    "term": "acoustic calculators",
    "cat": "Pro Audio Reference",
    "def": "Incredible web guide to online acoustic conversion calculators.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic cryocooler": {
    "term": "acoustic cryocooler",
    "cat": "Pro Audio Reference",
    "def": "See: thermoacoustics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic cryptanalysis": {
    "term": "acoustic cryptanalysis",
    "cat": "Pro Audio Reference",
    "def": "The science of deciphering intelligence from secondary sounds emitted by computers and peripherals. [Fascinating field; hit the link to explore further.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic diode": {
    "term": "acoustic diode",
    "cat": "Pro Audio Reference",
    "def": "An apparatus that transmits sound in only one direction. First use is in medical ultrasound imaging equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic distortion Term coined by Dr": {
    "term": "acoustic distortion Term coined by Dr",
    "cat": "Pro Audio Reference",
    "def": "Peter D\u2019Antonio, founder of RPG Diffusor Systems, for the interaction between the room, the loudspeaker, and the listener.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic echo": {
    "term": "acoustic echo",
    "cat": "Pro Audio Reference",
    "def": "canceller See: echo canceller.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic enhancement": {
    "term": "acoustic enhancement",
    "cat": "Pro Audio Reference",
    "def": "See: EAE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic feedback": {
    "term": "acoustic feedback",
    "cat": "Pro Audio Reference",
    "def": "The phenomenon where the sound from a loudspeaker is picked up by the microphone feeding it, and re-amplified out the same loudspeaker only to return to the same microphone to be re-amplified again, forming an acoustic loop. Each time the signal becomes larger until the system runs away and rings or feeds back on itself producing the all-too-common scream or squeal found in sound systems. These buildups occur at particular frequencies called feedback frequencies.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic horn": {
    "term": "acoustic horn",
    "cat": "Pro Audio Reference",
    "def": "See: horn.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic impedance Technically it": {
    "term": "acoustic impedance Technically it",
    "cat": "Pro Audio Reference",
    "def": "is the complex ratio of acoustic pressure to acoustic volume velocity, at a single frequency. Equivalently, it is a frequency response function in which pressure is the output and volume velocity is the input. [Morfey] First described by Webster in 1919.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic lens 1.": {
    "term": "acoustic lens 1.",
    "cat": "Loudspeakers",
    "def": "An acoustic lens focuses sound in much the same way that an optical lens focuses light. Snell\u2019s law describes the refraction of sound as it passes through an interface between two materials of differing sound speed. A high frequency loudspeaker mechanical acoustic lens provides the appropriate apparatus to spread a single point sound source into a parallel wave front. Additional information available from JBL. 2. Ultrasonography. A lens (often electromagnetic) used to focus or diverge a sound beam.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic lobe": {
    "term": "acoustic lobe",
    "cat": "Pro Audio Reference",
    "def": "See Linkwitz-Riley crossover.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic mirrors": {
    "term": "acoustic mirrors",
    "cat": "Pro Audio Reference",
    "def": "See: sound mirrors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustics Hearing; from": {
    "term": "acoustics Hearing; from",
    "cat": "Pro Audio Reference",
    "def": "the Greek akouein: to hear. The study of sound. 1. Of or relating to sound, the sense of hearing, or the science of sound. 2. a. Designed to carry sound or to aid in hearing. b. Designed to absorb or control sound: acoustic tile. 3. Music a. Of or being an instrument that does not produce or enhance sound electronically: an acoustic guitar; an acoustic bass. b. Being a performance that features such instruments: opened the show with an acoustic set. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustics and": {
    "term": "acoustics and",
    "cat": "Pro Audio Reference",
    "def": "vibration animations Fabulous website created by Prof. Dan Russell illustrating many important acoustic principles.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic-suspension loudspeaker": {
    "term": "acoustic-suspension loudspeaker",
    "cat": "Pro Audio Reference",
    "def": "Invented by Edgar Villchur in 1954 and co-developed with Henry Kloss . Hit the link for technical details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acoustic treatments There": {
    "term": "acoustic treatments There",
    "cat": "Pro Audio Reference",
    "def": "are only three classic (physical) tools available for the acoustician to treat a room: absorbers, reflectors and diffusers. Absorbers attenuated sound; reflectors redirect sound, and diffusers (hopefully) uniformly distribute sound. Or put another way, these tools change the temporal, spectra and spatial qualities of the sound. Additionally, with today\u2019s advanced digital audio tools, all of these elements can be electronically manipulated.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acousto-optics Abbr": {
    "term": "acousto-optics Abbr",
    "cat": "Pro Audio Reference",
    "def": "AO The science of the interaction of sound and light. A bit of a misnomer since it usually involves ultrasonic frequencies. For the math, see University of Colorado Acoustooptics Lecture.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acquisition time": {
    "term": "acquisition time",
    "cat": "Pro Audio Reference",
    "def": "The time required for a sample-and-hold (S/H) circuit to capture an input analog value; specifically, the time for the S/H output to approximately equal its input.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ACR (attenuation": {
    "term": "ACR (attenuation",
    "cat": "Pro Audio Reference",
    "def": "to crosstalk ratio) Category wiring. The ratio of attenuation and crosstalk in a cable, i.e., a measure of the difference between the received signal magnitude vs. the leaked crosstalk signal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "acronym": {
    "term": "acronym",
    "cat": "Pro Audio Reference",
    "def": "A word formed from the first letters of a name, such as laser for light amplification by stimulated emission of radiation, or by combining initial letters or parts of a series of words, such as radar for radio detecting and ranging. The requirement of forming a word is what distinguishes an acronym from an abbreviation (or initialism as it is also called). Thus modem [modulator-demodulator] is an acronym, and AES [Audio Engineering Society] is an abbreviation or initialism. Compare with portmanteau word [Unsubstantiated rumor has it that the word \u201cacronym\u201d itself is an acronym, created from the phrase \u201cabbreviating by cropping remainders off names to yield meaning\u201d \u2014 but it has never been confirmed.] (Thanks MR.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "active component": {
    "term": "active component",
    "cat": "Electronics",
    "def": "A component requiring power to operate, e.g. a transistor. Contrast with passive.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "active crossfader": {
    "term": "active crossfader",
    "cat": "Pro Audio Reference",
    "def": "A device found in DJ mixers used to crossfade between two music sources. An active design uses the potentiometer to send a control voltage to some type of voltage-controlled device that controls the audio, while in a passive design the audio appears on the potentiometer itself. Active designs are more robust and offer greater reliability over passive ones. See Evolution of the DJ Mixer Crossfader by Rane\u2019s ace DJ mixer designer, Rick Jeffs, for additional details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "active crossover": {
    "term": "active crossover",
    "cat": "Pro Audio Reference",
    "def": "A loudspeaker crossover requiring a power supply to operate. Usually rack-mounted as a separate unit, active crossovers require individual power amplifiers for each output frequency band. Available in configurations known as stereo 2-way, mono 3-way, and so on. A stereo 2-way crossover is a two-channel unit that divides the incoming signal into two segments, labeled Low and High outputs (biamped). A mono 3-way unit is a single channel device with three outputs, labeled Low, Mid and High (triamped). In this case, the user sets two frequencies: the Low-to-Mid, and the Mid-to-High crossover points. Up to stereo 5-way configurations exist for very elaborate systems. See passive crossover and the RaneNote Signal Processing Fundamentals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "active equalizer": {
    "term": "active equalizer",
    "cat": "Pro Audio Reference",
    "def": "A variable equalizer requiring a power supply to operate. Available in many different configurations and designs. Favored for low cost, small size, light weight, loading indifference, good isolation (high input and low output impedances), gain availability (signal boosting possible), and line-driving ability. Disliked for increased noise performance, limited dynamic range, reduced reliability, and RFI susceptibility; however, used everywhere. See the RaneNote Operator Adjustable Equalizers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ActiveX": {
    "term": "ActiveX",
    "cat": "Pro Audio Reference",
    "def": "A Microsoft developed software technology released in 1996. ActiveX, formerly called OLE (Object Linking and Embedding), is loosely based on the Component Object Model (COM), but provides substantially different services to developers. An ActiveX component is a unit of executable code (such as an .exe file) that follows the Active X specification for providing objects. This technology allows programmers to assemble reusable software components into applications and services. However, component software development using ActiveX technology should not be confused with Object-Oriented Programming (OOP). OOP is concerned with creating objects, while ActiveX is concerned with making objects work together. Simply stated, ActiveX is a technology that lets a program (the ActiveX component or control) interact with other programs over a network (e.g., the Internet), regardless of the language in which they were written. ActiveX components can do similar things as Java beans, but they are quite different. Java is a programming language, while ActiveX controls can be written in any language (e.g., Visual Basic, C, C++, even Java), Also ActiveX runs in a variety of applications, while Java beans usually run only in Web browsers. ActiveX controls are of concern to the pro audio community, because this is the technology that allows designers of computer-controlled sound systems to create common front-end software control panels that will operate different manufacturer\u2019s units, without having to know anything about their internal code or algorithms. Each ActiveX control is made up of properties, values associated with the control which might include such things as level settings and meter readings, and events, which tell the computer something significant has happened, such as a switch closer or clip detection. ActiveX allows the manufacturer to create an object that fully describes a device, while hiding the implementation details, such as protocol from the programmer. By hiding the communication details, there is no longer a need for different manufacturer\u2019s devices to agree on protocol. This lack of a protocol standard means that cooperation between manufacturers is not required. It allows each manufacturer to choose the best protocol for their devices.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ACU (Audio Coverage Uniformity)": {
    "term": "ACU (Audio Coverage Uniformity)",
    "cat": "Pro Audio Reference",
    "def": "A standard issued by InfoComm performance standards program. Read overview here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "adaptive delta modulation (ADM)": {
    "term": "adaptive delta modulation (ADM)",
    "cat": "Pro Audio Reference",
    "def": "A variation of delta modulation in which the step size may vary from sample to sample.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADAT (Alesis": {
    "term": "ADAT (Alesis",
    "cat": "Pro Audio Reference",
    "def": "Digital Audio Tape) Digital tape recording system developed by Alesis, and since licensed to Fostex & Panasonic, putting 8-tracks of 16-bit, 44.1 kHz digital audio on S-VHS tape.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADAT ODI": {
    "term": "ADAT ODI",
    "cat": "Pro Audio Reference",
    "def": "(optical digital interface) See ADAT Optical.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADAT Optical": {
    "term": "ADAT Optical",
    "cat": "Pro Audio Reference",
    "def": "Alesis\u2019s proprietary multichannel optical (fiber optic) digital interface specification for their family of ADAT modular digital multitrack recorders. This standard describes transmission of 8-channels of digital audio data through a single fiber optic cable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADC (or": {
    "term": "ADC (or",
    "cat": "Pro Audio Reference",
    "def": "A/D, analog-to-digital converter) The electronic component which converts the instantaneous value of an analog input signal to a digital word (represented as a binary number) for digital signal processing. The ADC is the first link in the digital chain of signal processing. See data converter bits See the RaneNote Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "add-in or": {
    "term": "add-in or",
    "cat": "Pro Audio Reference",
    "def": "add-on See: plugin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ade (Amsterdam": {
    "term": "ade (Amsterdam",
    "cat": "Pro Audio Reference",
    "def": "Dance Event) International 5-day conference and festival for electronic music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADJA (American": {
    "term": "ADJA (American",
    "cat": "Pro Audio Reference",
    "def": "Disc Jockey Association) An organization of professional disc jockeys that promotes ethical behavior, industry standards and continuing education for its members.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "admittance": {
    "term": "admittance",
    "cat": "Electronics",
    "def": "The reciprocal of impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADPCM (adaptive": {
    "term": "ADPCM (adaptive",
    "cat": "Pro Audio Reference",
    "def": "differential pulse code modulation) A very fast data compression algorithm based on the differences occurring between two samples.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ADR (automatic": {
    "term": "ADR (automatic",
    "cat": "Pro Audio Reference",
    "def": "dialog replacement) Film postproduction term used to indicate the act and location where dialogue that is not taped during production or that needs to be redone is recorded and synchronized to the picture. Usually the name of the room where this occurs, containing a studio with a screen, TV monitors, microphones, control area, console and loudspeakers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Advanced Audio": {
    "term": "Advanced Audio",
    "cat": "Pro Audio Reference",
    "def": "Coding See AAC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AEC (acoustic echo cancellation)": {
    "term": "AEC (acoustic echo cancellation)",
    "cat": "Pro Audio Reference",
    "def": "A technique using DSP (analog circuits exist, but DSP solutions are overwhelmingly superior) that filters unwanted signals caused by echoes from the main audio source. Echoes happen in both voice and data conversation, therefore two types of cancellers are encountered: acoustic and line. \u201cAcoustic\u201d echo cancellers are used in teleconferencing applications to suppress the acoustic echoes caused by the microphone/loudspeaker combination at one end picking up the signal from the other end and returning it to the original end. It is similar to sound system feedback problems (where the sound reinforcement loudspeaker is picked up by the microphone, re-amplified through the loudspeaker, only to be picked up again by the microphone, to be re-amplified, and so on), only made much worse by the additional time delay introduced by the telecommunication link. \u201cLine\u201d echo cancellers are used to suppress electrical echoes caused by the transmission link itself. Such things as non-perfect hybrids, and satellite systems (creating round-trip delays of about 600 ms), contribute to very annoying and disruptive line echoes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Aeolian tones": {
    "term": "Aeolian tones",
    "cat": "Pro Audio Reference",
    "def": "Air passing over an object produces a sound called Aeolian sound or tone after the Greek god of the winds, Aeolus.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Aeolus Muscial Instrument": {
    "term": "Aeolus Muscial Instrument",
    "cat": "Pro Audio Reference",
    "def": "A stringed horn instrument created by artist Luke Jerram that resembles a giant hedgehog.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aerophone Term for": {
    "term": "aerophone Term for",
    "cat": "Pro Audio Reference",
    "def": "a musical instrument that produces its sound by using air as the primary vibrating agent; aerophones form one of the four main classes of instruments. [Sadie] See: chordophone, idiophone, membranophone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES (Audio": {
    "term": "AES (Audio",
    "cat": "Pro Audio Reference",
    "def": "Engineering Society) Founded in 1948, the largest professional organization for electronic engineers and all others actively involved in audio engineering. Primarily concerned with education and standardization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES2": {
    "term": "AES2",
    "cat": "Pro Audio Reference",
    "def": "The standard for loudspeaker testing, officially known as AES2 AES standard for acoustics \u2013 Methods of measuring and specifying the performance of loudspeakers for professional applications \u2013 Drive units.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES3 interface": {
    "term": "AES3 interface",
    "cat": "Pro Audio Reference",
    "def": "(The interface formerly known as AES/EBU). The serial transmission format standardized for professional digital audio signals (AES3 AES Recommended Practice for Digital Audio Engineering \u2013 Serial transmission format for two-channel linearly represented digital audio data). A specification using time division multiplex for data, and balanced line drivers to transmit two channels of digital audio data on a single twisted-pair cable using 3-pin (XLR) connectors. Issued as ANSI S4.40-1985 by the American National Standards Institute. In addition, information document AES-3id is available describing the transmission of AES3 formatted data by unbalanced coaxial cable. Transmission by fiber optic cable is under discussion. The consumer version is referred to as S/PDIF. See the RaneNote Interfacing AES3 and S/PDIF. [Usage Note for AC-3 and DTS Transmission: The question comes up of whether a unit that passes AES3 will automatically pass AC-3 and DTS. Two industry experts answer \u201cmaybe\u201d as follows:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Tom Holman": {
    "term": "Tom Holman",
    "cat": "Pro Audio Reference",
    "def": "warns: \u201d \u2018Automatically\u2019 is the operative word here. You have to pass all the bits unaltered and it will work. We have found things with hidden embedded sample rate converters set to 1:1 conversion that changed bits and thus cause AC-3 bit streams to fail for instance. DC blockage filters in DSP code do it, anything that alters the bit stream can do it. It took a very long time to develop a bit identical path through a production chain to make our test CDs, available from Hollywood Edge. We applied a Prism Sound bit test pattern signal as a track, and it failed at nearly every stage but one in getting from computer to DAT to CD-R to workstation to CD-R to mastering station to CD replication plant. Those steps all failed initially, but the one that didn\u2019t is the one all the musicians suspect: the actual manufacturing of the discs was a perfect replication of the bits sent them. Nobody owns the trademark Digital, thus it can be genius or junk. Hard to tell which some times.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "And Rich": {
    "term": "And Rich",
    "cat": "Pro Audio Reference",
    "def": "Cabot elaborates: \u201cThere are several issues about how hardware operates that will affect whether it passes AC-3. These interact with the design of the AC-3 decoder.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "First, any": {
    "term": "First, any",
    "cat": "Pro Audio Reference",
    "def": "buffer/storage device which uses a sample rate converter to eliminate jitter on the received signal would pass PCM but completely screw up any coded audio. There are many receiver chips with built in SRCs. Assuming this is not the problem, there are some more subtle issues that must be considered.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "There": {
    "term": "There",
    "cat": "Pro Audio Reference",
    "def": "are several flavors of AC-3 over AES/SPDIF (they are described in IEC-61937). The consumer version, which is the most common, puts the AC-3 signal in both channels of the SPDIF. The professional formats allow this two channel packing but also allow AC-3 in either channel and PCM in the other. All three versions pack the AC-3 as 16 bit words so they can pass through consumer interfaces that might not pass all 24 bits.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "In": {
    "term": "In",
    "cat": "Terminology",
    "def": "all versions, the interface status bits are supposed to indicate that it is a coded signal. Also, the validity bit has been hijacked and now indicates that it is a coded signal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "If": {
    "term": "If",
    "cat": "Terminology",
    "def": "someone builds a device that passes the audio bits but changes status bits and/or the validity bit there could be problems. The decoder design affects what happens. Many decoders do not attempt to decode the signal unless both the validity bits and the status bits indicate that it is coded. Others will decode regardless of the status bit content but still look at the validity bits. I don\u2019t know for sure, but some may ignore both status and validity information and only look at the stream.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES3-MIC Any microphone having": {
    "term": "AES3-MIC Any microphone having",
    "cat": "Pro Audio Reference",
    "def": "a digital output that conforms to AES42 AES standard for acoustics \u2013 Digital interface for microphones.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES17 low-pass filter": {
    "term": "AES17 low-pass filter",
    "cat": "Pro Audio Reference",
    "def": "The common name given to the low-pass filter defined by AES17 AES standard method for digital audio engineering \u2014 Measurement of digital audio equipment, used to limit the measuring bandwidth. The rather daunting specification calls for a filter with a passband response of 10 Hz to 20 kHz, \u00b10.1 dB and a stopband attenuation greater than 60 dB at 24 kHz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES48 This": {
    "term": "AES48 This",
    "cat": "Pro Audio Reference",
    "def": "the standard on proper shield grounding, specifically AES48 AES standard on interconnections \u2013 Grounding and EMC practices \u2013 Shields of connectors in audio equipment containing active circuitry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES50 This": {
    "term": "AES50 This",
    "cat": "Pro Audio Reference",
    "def": "open standard defines a Layer 1 protocol using Ethernet wiring, albeit not a true switched audio network. Titled: AES50 AES standard for digital audio engineering \u2013 High-resolution multi-channel audio interconnection (HRMAI).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES67": {
    "term": "AES67",
    "cat": "Pro Audio Reference",
    "def": "The standard for operating pro audio network systems in an interoperable manner, specifically AES67 AES standard for audio applications of networks \u2013 High-performance streaming audio-over-IP interoperability.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AES/EBU interface": {
    "term": "AES/EBU interface",
    "cat": "Pro Audio Reference",
    "def": "See: AES3.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aetherphone Musical Instrument": {
    "term": "aetherphone Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Alternate name for the theremin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AF": {
    "term": "AF",
    "cat": "Terminology",
    "def": "(audio frequencies) Standard abbreviation for the accepted normal range of human audible frequencies being 20 Hz to 20 kHz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A-filter See:": {
    "term": "A-filter See:",
    "cat": "Pro Audio Reference",
    "def": "weighting filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AFL Abbreviation": {
    "term": "AFL Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for after fade listen, a term used on recording consoles and mixers, referring to a signal taken after the main channel fader; hence this sampling point tracks the main fader level. Also referred to as post fade solo, but since PFL already meant pre fade, AFL was adopted to prevent confusion. Got it? Compare with PFL and APL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A-format See:": {
    "term": "A-format See:",
    "cat": "Pro Audio Reference",
    "def": "soundfield microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AGC (automatic": {
    "term": "AGC (automatic",
    "cat": "Pro Audio Reference",
    "def": "gain control), aka ALC (automatic level control) Signal Processing. A circuit or algorithm that varies gain as a function of the input signal amplitude. Commonly found in pro audio applications where you want to automatically adjust the gain of different sound sources in order to maintain a constant loudness level at the output. For example, on deluxe professional DJ mixers the gain adjusts automatically when the DJ switches sources between records, CD, or MP3 files. Not only do signal levels differ greatly between different source technologies but also between any two examples of the same technology, e.g., between CDs, or between MP3 files, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AIA (American": {
    "term": "AIA (American",
    "cat": "Pro Audio Reference",
    "def": "Institute of Architects) The premier organization for architects and those working with architects (sound contractors, integrators, etc.).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AIFF (audio": {
    "term": "AIFF (audio",
    "cat": "Pro Audio Reference",
    "def": "interchange file format) Defined by Apple Computer in 1988, it provides a standard for storing monaural and multichannel sampled sounds at a variety of sample rates and widths.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "air absorption": {
    "term": "air absorption",
    "cat": "Pro Audio Reference",
    "def": "See: absorption.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "air motion": {
    "term": "air motion",
    "cat": "Pro Audio Reference",
    "def": "transformer (AMT) Midrange tweeter invented by Dr. Oskar Heil, which operates on a different principle than both dynamic and electrostatic drivers. Known also as the AVT (air velocity transformer),",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "air raid": {
    "term": "air raid",
    "cat": "Pro Audio Reference",
    "def": "siren See Chrysler Air Raid Siren.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "album covers": {
    "term": "album covers",
    "cat": "Pro Audio Reference",
    "def": "See Steinweiss, Alex.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aleatoric": {
    "term": "aleatoric",
    "cat": "Music",
    "def": "Using or consisting of sounds to be chosen by the performer or left to chance; indeterminate. From aleatory meaning dependent on chance, luck, or an uncertain outcome. Of or characterized by gambling. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "algorithm": {
    "term": "algorithm",
    "cat": "Pro Audio Reference",
    "def": "A structured set of instructions and operations tailored to accomplish a signal processing task. For example, a fast Fourier transform (FFT), or a finite impulse response (FIR) filter are common DSP algorithms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "algorithmic reverb Audio Signal Processing": {
    "term": "algorithmic reverb Audio Signal Processing",
    "cat": "Pro Audio Reference",
    "def": "Digital simulation of reverberation based on algorithms. Contrast with convolution reverb.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aliasing": {
    "term": "aliasing",
    "cat": "Pro Audio Reference",
    "def": "The problem of unwanted frequencies created when sampling a signal of a frequency higher than half the sampling rate. See Nyquist frequency. Also see RaneNote Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Allison Effect Loudspeakers &": {
    "term": "Allison Effect Loudspeakers &",
    "cat": "Acoustics",
    "def": "Describes how room boundaries and loudspeaker power output interact. Specifically, the name for the destructive interference pattern that develops when a radiator is located one-quarter wavelength away from a reflective surface; after Roy F. Allison, American acoustic engineer of AR (Acoustic Research) and Allison Acoustics fame, who first wrote of this effect in his paper, \u201cThe Influence of Room Boundaries on Loudspeaker Power Output,\u201d J. Aud. Eng. Soc. Vol. 22, p.314 (May 1974), reprinted in Loudspeakers Vol. I, pp.339-345, edited by R.E. Cooke (Audio Engineering Society, 1978).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Allison, Roy": {
    "term": "Allison, Roy",
    "cat": "Pro Audio Reference",
    "def": "(1927-2016) American acoustic engineer noted for his contributions to early loudspeaker design. See above for one example.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "all-pass filter": {
    "term": "all-pass filter",
    "cat": "Pro Audio Reference",
    "def": "A filter that provides only phase shift or phase delay without appreciably changing the magnitude characteristic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ALMA (American": {
    "term": "ALMA (American",
    "cat": "Pro Audio Reference",
    "def": "Loudspeaker Manufacturers Association) Founded in 1964, an international trade association for companies that design, manufacture, sell, and/or test loudspeakers, loudspeaker components and loudspeaker systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "alnico (al[uminum]": {
    "term": "alnico (al[uminum]",
    "cat": "Pro Audio Reference",
    "def": "+ ni[ckle] + co[balt] ) Magnetics. Any of several hard, strong alloys of iron, aluminum, nickel, cobalt and sometimes copper, niobium, or tantalum, used to make strong permanent magnets [found in loudspeakers]. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "alone \u201cIn": {
    "term": "alone \u201cIn",
    "cat": "Pro Audio Reference",
    "def": "bad company\u201d [Ambrose Bierce]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ALS (assisted listening systems)": {
    "term": "ALS (assisted listening systems)",
    "cat": "Hearing",
    "def": "See: hearing loop for one example.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "alternating current Abbr": {
    "term": "alternating current Abbr",
    "cat": "Pro Audio Reference",
    "def": "AC or ac (See usage note at end) An electric current that reverses direction at regularly recurring intervals of time. Contrast: direct current. [IEEE] [Usage Note: Officially the IEEE dictionary is very clear that the abbreviation for alternating current is \u201cac\u201d not \u201cAC.\u201d However most everyone agrees (mags, technical journalists, me, etc.) that when abbreviating alternating current in a standalone sense, that it looks better and reads clearer if you use uppercase, e.g., \u201cThe device runs off AC voltage,\u201d instead of \u201cThe device runs off ac voltage,\u201d, particularly if the abbreviation begins or ends a sentence. Imagine a sentence like this: \u201cAc is a type of generator voltage.\u201d Or, \u201cDo you want ac or dc?\u201d Both work better with uppercase. As for Vac vs. VAC, both are seen and accepted even though Vac is the IEEE standard.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aluminum sheath Wiring & Cable": {
    "term": "aluminum sheath Wiring & Cable",
    "cat": "Pro Audio Reference",
    "def": "An impervious aluminum or aluminum alloy tube, either smooth or corrugated, which is applied over a cable core to provide mechanical protection. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AM": {
    "term": "AM",
    "cat": "Terminology",
    "def": "(amplitude modulation) Radio broadcast. 1. The encoding of a carrier wave by variation of its amplitude in accordance with an input signal. 2. A broadcast system that uses amplitude modulation. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ambience 1.": {
    "term": "ambience 1.",
    "cat": "Acoustics",
    "def": "A perceptual sense of space [Blesser]. The acoustic qualities of a listening space [White]. 2. Psychoacoustics The special atmosphere or mood created by a particular environment; also spelled ambiance [AHD]. Contrast with reverberation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ambient": {
    "term": "ambient",
    "cat": "Pro Audio Reference",
    "def": "The medium (for example, air, gas, liquid, or earth) in which electric equipment operates. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ambient noise": {
    "term": "ambient noise",
    "cat": "Pro Audio Reference",
    "def": "compensator See leveler.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Ambisonics": {
    "term": "Ambisonics",
    "cat": "Pro Audio Reference",
    "def": "A British-developed surround sound system designed to reproduce a true three-dimensional sound field. Based on the late Michael Gerzon\u2019s (1945-1996) (Oxford University) famous theoretical foundations, Ambisonics delivers what the ill-fated quadraphonics of the \u201970s promised but could not. Requiring two or more transmission channels (encoded inputs) and four or more decoded output loudspeakers, it is not a simple system; nor is the problem of reproducing 3-dimensional sound. Yet with only an encoded stereo input pair and just four decoded reproducing channels, Ambisonics accurately reproduces a complete 360-degree horizontal sound field around the listener. With the addition of more input channels and more reproducing loudspeakers, it can develop a true spherical listening shell. As good as it is, a mass market for Ambisonics has never developed due to several factors. First, the actual recording requires a special tetrahedron array of four microphones: three to measure left-right, front-back and up-down sound pressure levels, while the fourth measures the overall pressure level. All these microphones must occupy the same point in space as much as possible. So far, only one manufacturer (first Calrec, bought by AMS, bought by Siemens, sold, now Soundfield) is known to make such an array. Next, a professional Ambisonics encoding unit is required to matrix these four mic signals together to form two or more channels before mastering or broadcast begins. Finally, the consumer must have an Ambisonics decoder, in addition to at least four channels of playback equipment. [The generic term is now soundfield microphone recording .]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AME (Association": {
    "term": "AME (Association",
    "cat": "Pro Audio Reference",
    "def": "for Manufacturing Excellence) \u201cA not-for-profit organization founded in 1985 dedicated to helping companies with continuous improvement and their pursuit of excellence.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Americana Music": {
    "term": "Americana Music",
    "cat": "Pro Audio Reference",
    "def": "Festival Yearly event held in Nashville, TN, since 2000, featuring over 150 performances at over nine venues, spread out over four days.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AMI-C (Automotive": {
    "term": "AMI-C (Automotive",
    "cat": "Pro Audio Reference",
    "def": "Multimedia Interface Collaboration) \u201cAn organization of motor vehicle manufacturers worldwide created to facilitate the development, promotion and standardization of electronic gateways to connect automotive multimedia, telematics and other electronic devices to their motor vehicles.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AMOLED (active-matrix": {
    "term": "AMOLED (active-matrix",
    "cat": "Pro Audio Reference",
    "def": "OLED) Electronic Displays. Refers to the technology behind the addressing of pixels in OLED displays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AMP (Audio Music Partnership)": {
    "term": "AMP (Audio Music Partnership)",
    "cat": "Pro Audio Reference",
    "def": "An alliance of industry partners that develop, manufacture, and support products and services that interoperate with the Microsoft platforms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AMP (Association": {
    "term": "AMP (Association",
    "cat": "Pro Audio Reference",
    "def": "of Music Parents) A non-profit organization that promotes music education in school systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ampacity (ampere capacity)": {
    "term": "ampacity (ampere capacity)",
    "cat": "Pro Audio Reference",
    "def": "The maximum current-caring capacity of a material. [This is an example of a portmanteau word.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AMPAS (Academy": {
    "term": "AMPAS (Academy",
    "cat": "Pro Audio Reference",
    "def": "of Motion Picture Arts & Sciences) Created in 1927, a professional honorary organization composed of over 6,000 motion picture craftsmen and women. Think Oscars\u00ae.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ampere Abbr": {
    "term": "ampere Abbr",
    "cat": "Pro Audio Reference",
    "def": "I, also A. 1. A unit of electric current in the International standard meter-kilogram-second (mks) system. It is the steady current that when flowing in straight parallel wires of infinite length and negligible cross section, separated by a distance of one meter in free space, produces a force between the wires of 2E-7 newtons per meter of length. 2. A unit in the International System specified as one International coulomb per second and equal to 0.999835 ampere. (After Andr\u00e9 Marie Amp\u00e8re.) [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Amp\u00e8re, Andr\u00e9": {
    "term": "Amp\u00e8re, Andr\u00e9",
    "cat": "Pro Audio Reference",
    "def": "Marie (1775-1836) French physicist and mathematician who formulated Amp\u00e8re\u2019s law, a mathematical description of the magnetic field produced by a current-carrying conductor. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amp head": {
    "term": "amp head",
    "cat": "Pro Audio Reference",
    "def": "See head amp.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amplifier": {
    "term": "amplifier",
    "cat": "Pro Audio Reference",
    "def": "An electronic device used to increase an electrical signal. The signal may be voltage, current or both (power). Preamplifier is the name applied to the first amplifier in the audio chain, accepting inputs from microphones, or other transducers, and low output sources (CD players, tape recorders, turntables, etc.). The preamplifier increases the input signals from mic-level, for instance, to line-level. Power amplifier is the name applied to the last amplifier in the audio chain, used to increase the line-level signals to whatever is necessary to drive the loudspeakers to the loudness required. See amplifier classes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amplifier classes": {
    "term": "amplifier classes",
    "cat": "Pro Audio Reference",
    "def": "Audio power amplifiers were originally classified according to the relationship between the output voltage swing and the input voltage swing; thus it was primarily the design of the output stage that defined each class. Classification was based on the amount of time the output devices operate during one complete cycle of signal swing. Classes were also defined in terms of output bias current [the amount of current flowing in the output devices with no applied signal]. For discussion purposes (with the exception of class A), assume a simple output stage consisting of two complementary devices (one positive polarity and one negative polarity) using tubes (valves) or any type of transistor (bipolar, MOSFET, JFET, IGFET, IGBT, etc.).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[Historical Notes": {
    "term": "[Historical Notes",
    "cat": "Pro Audio Reference",
    "def": "marked \u201cGRS\u201d provided by Gerald R. Stanley, Senior V.P. of Research, Crown International, Inc., designer of the famous Crown DC-300, inventor of the Crown K Series switchmode amplifier line and holder of over 45 U.S. Patents.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[GRS on": {
    "term": "[GRS on",
    "cat": "Pro Audio Reference",
    "def": "amplifiers: \u201cAt first there were no amplifiers as the very thought of amplification had yet to enter the vocabulary of electronics (another word which had yet to be birthed!). The invention of a three-terminaled device (DeForest Audion U.S. patent 841,386 or later triode) was the invention in 1906 of a more sensitive radio detector and not an element for an amplifier.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "By": {
    "term": "By",
    "cat": "Terminology",
    "def": "1912 the triode had become both a vacuum tube and an amplifier (multiple names can be attached to this collective achievement). The oscillator also dates to 1912 giving proof to the saying \u201cWhen you set out to make an amplifier you get an oscillator and when you attempt to make an oscillator you get an amplifier.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class": {
    "term": "Class",
    "cat": "Pro Audio Reference",
    "def": "A operation is where both devices conduct continuously for the entire cycle of signal swing, or the bias current flows in the output devices at all times. The key ingredient of class A operation is that both devices are always on. There is no condition where one or the other is turned off. Because of this, class A amplifiers in reality are not complementary designs. They are single-ended designs with only one type polarity output devices. They may have \u201cbottom side\u201d transistors but these are operated as fixed current sources, not amplifying devices. Consequently class A is the most inefficient of all power amplifier designs, averaging only around 20% (meaning you draw about 5 times as much power from the source as you deliver to the load.) Thus class A amplifiers are large, heavy and run very hot. All this is due to the amplifier constantly operating at full power. The positive effect of all this is that class A designs are inherently the most linear, with the least amount of distortion. [Much mystique and confusion surrounds the term class A. Many mistakenly think it means circuitry comprised of discrete components (as opposed to integrated circuits). Such is not the case. A great many integrated circuits incorporate class A designs, while just as many discrete component circuits do not use class A designs.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[GRS Historical Note: \u201cClass": {
    "term": "[GRS Historical Note: \u201cClass",
    "cat": "Pro Audio Reference",
    "def": "A \u2013 The most basic of operating modes saw both single-ended and push-pull embodiments by 1913. The first known use of push-pull appears in a patent of E.F.W. Alexanderson of GE U.S. 1,173,079 filed in 1913. While Alexanderson would have been aware of other levels of biasing his push-pull stage, such as classes B and C, he would have only been able to produce a useful result with a tuned stage such as a transmitter where resonant filtering would have managed the distortion problem. Negative feedback is not understood in 1913 to be able to cope with distortion problems.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class B operation": {
    "term": "Class B operation",
    "cat": "Pro Audio Reference",
    "def": "is the opposite of class A. Both output devices are never allowed to be on at the same time, or the bias is set so that current flow in a specific output device is zero when not stimulated with an input signal, i.e., the current in a specific output flows for one half cycle. Thus each output device is on for exactly one half of a complete sinusoidal signal cycle. Due to this operation, class B designs show high efficiency but poor linearity around the crossover region. This is due to the time it takes to turn one device off and the other device on, which translates into extreme crossover distortion. Thus restricting class B designs to power consumption critical applications, e.g., battery operated equipment, such as 2-way radio and other communications audio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[GRS Historical": {
    "term": "[GRS Historical",
    "cat": "Pro Audio Reference",
    "def": "Note: \u201cClass B \u2013 This class has no obvious inventor, but it does have its master and perfector. Loy Barton working for RCA developed tube designs and biasing methods to manage the open loop distortion of class B push-pull power stages. His IRE paper in 1931 titled \u201cHigh Output Power from Relatively Small Tubes\u201d is a landmark in the history of class B. Technically he only used class AB but the distinction was not in the language. Class AB is a later and probably unnecessary class fabrication.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class AB operation": {
    "term": "Class AB operation",
    "cat": "Pro Audio Reference",
    "def": "is the intermediate case. Here both devices are allowed to be on at the same time (like in class A), but just barely. The output bias is set so that current flows in a specific output device appreciably more than a half cycle but less than the entire cycle. That is, only a small amount of current is allowed to flow through both devices, unlike the complete load current of class A designs, but enough to keep each device operating so they respond instantly to input voltage demand s. Thus the inherent non-linearity of class B designs is eliminated, without the gross inefficiencies of the class A design. It is this combination of good efficiency (around 50%) with excellent linearity that makes class AB the most popular audio amplifier design.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class AB1": {
    "term": "Class AB1",
    "cat": "Pro Audio Reference",
    "def": "& AB2 Subdivisions of Class AB developed for vacuum tube design. These subsets primarily describe grid current behavior: Class AB1 has no current flowing into the grid of the tube, and Class AB2 has some current flowing into the grid. Class AB1 operates closer to Class A, while Class AB2 operates closer to Class B. Most bipolar solid-state amplifiers would be classified as Class AB2, while power JFET designs mimic Class AB1.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class AB": {
    "term": "Class AB",
    "cat": "Pro Audio Reference",
    "def": "plus B design involves two pairs of output devices: one pair operates class AB while the other (slave) pair operates class B.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class BD Invented by Robert B": {
    "term": "Class BD Invented by Robert B",
    "cat": "Pro Audio Reference",
    "def": "Herbert in 1971 U.S. patent 3,585,517 and improved on by Neil Edward Walker as disclosed in his 1971 U.S. patent 3,629,616. Both patents are concerned with improving original class D design efficiencies by using various bridge connections and cancellation techniques. And most recently more improvements are claimed by inventors James C. Strickland & Carlos A. Castrejon in their U.S. patent 6,097,249 assigned to Rockford Corporation in 2000 for their Fosgate-brand automotive amplifier.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[GRS comments: \u201cThis": {
    "term": "[GRS comments: \u201cThis",
    "cat": "Pro Audio Reference",
    "def": "is a class designation that would best be forgotten. It has been applied to multiple modulation schemes on a class D derived full-bridge. This is perhaps the most reinvented class design in recent history with \u201cfilter-less amplifiers\u201d and other such things. An interleave of two class D full-bridge is what we actually have here, and it is a good improvement to an interleave of one class D full-bridge. However an interleave of four is actually possible on a full-bridge if one uses Class I design.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class C use": {
    "term": "Class C use",
    "cat": "Pro Audio Reference",
    "def": "is restricted to the broadcast industry for radio frequency (RF) transmission. Its operation is characterized by turning on one device at a time for less than one half cycle. In essence, each output device is pulsed-on for some percentage of the half cycle, instead of operating continuously for the entire half cycle. This makes for an extremely efficient design capable of enormous output power. It is the magic of RF tuned circuits (flywheel effect) that overcomes the distortion create d by class C pulsed operation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class D operation": {
    "term": "Class D operation",
    "cat": "Pro Audio Reference",
    "def": "is switching, hence the term switching power amplifier. Here the output devices are rapidly switched on and off at least twice for each cycle (Sampling Theorem). Theoretically since the output devices are either completely on or completely off they do not dissipate any power. If a device is on there is a large amount of current flowing through it, but all the voltage is across the load, so the power dissipated by the device is zero (found by multiplying the voltage across the device [zero] times the current flowing through the device [big], so 0 x big = 0); and when the device is off, the voltage is large, but the current is zero so you get the same answer. Consequently class D operation is theoretically 100% efficient, but this requires zero on-impedance switches with infinitely fast switching times \u2014 a product we\u2019re still waiting for; meanwhile designs do exist with true efficiencies approaching 90%.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[Historical note:": {
    "term": "[Historical note:",
    "cat": "Pro Audio Reference",
    "def": "the original use of the term \u201cClass D\u201d referred to switching amplifiers that employed a resonant circuit at the output to remove the harmonics of the switching frequency. Today\u2019s use is much closer to the original \u201cClass S\u201d designs.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class E": {
    "term": "Class E",
    "cat": "Pro Audio Reference",
    "def": "operation involves amplifiers designed for rectangular input pulses, not sinusoidal audio waveforms. The output load is a tuned circuit, with the output voltage resembling a damped single pulse. Normally Class E employs a single transistor driven to act as a switch.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "The following": {
    "term": "The following",
    "cat": "Pro Audio Reference",
    "def": "terms, while generally agreed upon, are not official classifications:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class F": {
    "term": "Class F",
    "cat": "Pro Audio Reference",
    "def": "Also known by such terms as \u201cbiharmonic,\u201d \u201cpolyharmonic,\u201d \u201cClass DC,\u201d \u201csingle-ended Class D,\u201d \u201cHigh-efficiency Class C,\u201d and \u201cmultiresonator.\u201d Another example of a tuned power amplifier, whereby the load is a tuned resonant circuit. One of the differences here is the circuit is tuned for one or more harmonic frequencies as well as the carrier frequency. See References Krauss, et al. for complete details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class G": {
    "term": "Class G",
    "cat": "Pro Audio Reference",
    "def": "operation involves changing the power supply voltage from a lower level to a higher level when larger output swings are required. There have been several ways to do this. The simplest involves a single class AB output stage that is connected to two power supply rails by a diode, or a transistor switch. The design is such that for most musical program material, the output stage is connected to the lower supply voltage, and automatically switches to the higher rails for large signal peaks [thus the nickname rail-switcher]. Another approach uses two class AB output stages, each connected to a different power supply voltage, with the magnitude of the input signal determining the signal path. Using two power supplies improves efficiency enough to allow significantly more power for a given size and weight. Class G is common for pro audio designs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[Historical note: Hitachi": {
    "term": "[Historical note: Hitachi",
    "cat": "Pro Audio Reference",
    "def": "is credited with popularizing class G designs with their 1977 Dynaharmony HMA 8300 power amplifier, however it is shown much older by GRS: \u201cClass G \u2013 I have been searching for the proper inventor of this class, but have not been able to find a reference older than 1965 when I first encountered it in a college text \u201cHandbook of Basic Transistor Circuits and Measurements\u201d by Thornton et al., SEEC vol. 7. The method is introduced without references or fanfare. One is led to believe that it was common knowledge in 1965 and earlier. This is not the first known use of extended quasi-linear methods (beyond class B), as there is a dual found in Fisher U.S. 2,379,513 from 1942.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class H operation takes": {
    "term": "Class H operation takes",
    "cat": "Pro Audio Reference",
    "def": "the class G design one step further and actually modulates the higher power supply voltage by the input signal. This allows the power supply to track the audio input and provide just enough voltage for optimum operation of the output devices [thus the nickname rail-tracker or tracking power amplifier]. The efficiency of class H is comparable to class G designs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[Historical note: Soundcraftsmen": {
    "term": "[Historical note: Soundcraftsmen",
    "cat": "Pro Audio Reference",
    "def": "is credited with popularizing class H designs with their 1977 Vari-proportional MA5002 power amplifier, designed by Soundcraftsmen\u2019s Chief Engineer and Vice President, Paul Rolfes. However like class G above, GRS finds precedence: \u201cClass H \u2013 The apparent inventor of class-H in full-blown multi-level form was Manuel Kramer of NASA in 1964 U.S. patent 3,319,175. Class H optimally applied to a full-bridge was invented in 1987 (Stanley) U.S. 4,788,452. Classes G and H are all members of a class of amplifiers that has articulated rail voltages to improve the efficiency of class B power stages. Examples are available of tracking using binarily weighted segments, (Stanley) U.S. 5,045,990. Continuously variable tracking with switch-mode PWM appears to have been first done by Hamada in 1976 U.S. 4,054,843. The ultimate rail tracker using interleaved technology is found in (Stanley) U.S. 5,513,094. Only with interleave is the converter fast enough to meet the needs of full-bandwidth audio and yet have low switching losses.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class I": {
    "term": "Class I",
    "cat": "Pro Audio Reference",
    "def": "operation invented and named by Gerald R. Stanley for amplifiers based on his patent U.S. 5,657,219 covering opposed current converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[GRS explains:": {
    "term": "[GRS explains:",
    "cat": "Pro Audio Reference",
    "def": "The \u201cI\u201d of the class is short for \u201cinterleave\u201d as this is the only four-quadrant converter known that uses two switches yet has an interleave number of 2 in the terminology of interleave. When used with fixed-frequency natural two-sided PWM it forms a theoretically optimum converter having the least unnecessary/undesirable PWM spectra. A good reference is found in the IEEE Transactions on Power Electronics Vol. 14, No. 2, March 1999, pages 372-380.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class J operation": {
    "term": "Class J operation",
    "cat": "Pro Audio Reference",
    "def": "is the category/name suggested by Gerald R. Stanley for amplifiers that combine class B and class D where converters act in parallel to drive the load.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[GRS elaborates: \u201cThere": {
    "term": "[GRS elaborates: \u201cThere",
    "cat": "Pro Audio Reference",
    "def": "are serious problems with the power efficiency of these products when processing fast signals into arbitrary loads. The class B stage is used to actively remove the ripple of the class D stage and other distortion problems that plague class D. No solution is offered for the MOSFET CSOA (current safe operating area) problem of class D. To solve that problem it would be necessary to parallel a class I and class B amplifier but this would be without merit as the class I amplifier generally does not need the class B amplifier to meet fidelity requirements.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Class S": {
    "term": "Class S",
    "cat": "Pro Audio Reference",
    "def": "First invented in 1932, this technique is used for both amplification and amplitude modulation. Similar to Class D except the rectangular PWM voltage waveform is applied to a low-pass filter that allows only the slowly varying dc or average voltage component to appear across the load. Essentially this is what is termed \u201cClass D\u201d today. See References Krauss for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "[Final GRS": {
    "term": "[Final GRS",
    "cat": "Pro Audio Reference",
    "def": "Amplifier Historical Note: \u201cAll of our amplifier classes have thrived under a very important invention, without which most would have floundered. That invention is, of course, negative feedback. Harold Black in 1927 changed our world forever while riding to work on the Lackawanna Ferry. (See U.S. patent 2,102,671.) Harold Black did not stop there however, he also in 1953 wrote the text \u201cModulation Theory\u201d which we today use to understand the fundamentals of PWM. In 1935, Terman, in his now famous \u201cFundamentals of Radio\u201d handbook, wrote that it was good that class B was only used in places like radio stations as there needed to be an engineer on duty full time to keep the bias tweaked to where the distortion was acceptable. Thanks go to Harold Black for changing all that and leading us into the next century of amplification.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amplifier dummy load Modeling": {
    "term": "amplifier dummy load Modeling",
    "cat": "Pro Audio Reference",
    "def": "a real world loudspeaker for power amplifier testing purposes has been studied for years, resulting in many circuit possibilities. An article compiled and edited by Tomi Engdahl entitled \u201cSpeaker Impedance\u201d is an excellent summary of the results. He gives a complete (and complex) solution to the loudspeaker dummy load question. However you can get excellent results with a simplified version developed by electronics engineer Michael Rollins appearing below. The series resistor and inductor model the loudspeaker voice coil\u2019s DC resistance and inductance, while the parallel inductor and capacitor simulate the mechanical components of suspension compliance and cone mass respectively. The values shown work well for most power amplifier measurements.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "RS": {
    "term": "RS",
    "cat": "Terminology",
    "def": "= 6 ohms (aluminum body power resistor bolted to a heat sink; power rating twice max testing watts) LS = 0.33 mH (air core inductor; wire sized for max current) LP = 20 mH (air core inductor; wire sized for max current) CP = 1000 \u00b5F (100 V, or maximum expected peak voltage; paralleling two 500 \u00b5F caps may be smaller, cheaper)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amplitude 1. Greatness of": {
    "term": "amplitude 1. Greatness of",
    "cat": "Physics",
    "def": "The maximum absolute value of a periodically varying quantity. 3. Mathematics. a. The maximum absolute value of a periodic curve measured along its vertical axis. b. The angle made with the positive horizontal axis by the vector representation of a complex number. 4. Electronics. The maximum absolute value reached by a voltage or current waveform. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amplitude-frequency response": {
    "term": "amplitude-frequency response",
    "cat": "Pro Audio Reference",
    "def": "See frequency response.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "amplitude modulation": {
    "term": "amplitude modulation",
    "cat": "Pro Audio Reference",
    "def": "See: AM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AMT (air": {
    "term": "AMT (air",
    "cat": "Pro Audio Reference",
    "def": "motion transformer) See: air motion transformer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anacrusis See": {
    "term": "anacrusis See",
    "cat": "Pro Audio Reference",
    "def": "upbeat.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anagram": {
    "term": "anagram",
    "cat": "Pro Audio Reference",
    "def": "A word or phrase formed by reordering the letters of another word or phrase, such as satin to stain. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "analog": {
    "term": "analog",
    "cat": "Pro Audio Reference",
    "def": "A real world physical quantity or data characterized by being continuously variable (rather than making discrete jumps), and can be as precise as the available measuring technique.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ANC (ambient noise compensator)": {
    "term": "ANC (ambient noise compensator)",
    "cat": "Pro Audio Reference",
    "def": "A signal processing circuit that monitors the ambient noise in a space and adjusts the level of the amplified program material as necessary to maintain a desired signal-to-noise ratio. [Different than ANR]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AND Computer Science & Logic": {
    "term": "AND Computer Science & Logic",
    "cat": "Pro Audio Reference",
    "def": "A Boolean logical operator that returns a true value only if both operands are true; a form of multiplication. For example, two series connected switches, A and B, requires both be closed for current to pass, thus it requires switch A AND switch B closed to operate.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anechoic Literally, without echo,": {
    "term": "anechoic Literally, without echo,",
    "cat": "Pro Audio Reference",
    "def": "used to describe specially designed rooms, anechoic chambers, built to emulate a free sound field, by absorbing practically all the sound field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anechoic room": {
    "term": "anechoic room",
    "cat": "Pro Audio Reference",
    "def": "See: free-field room",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "angstrom Abbr": {
    "term": "angstrom Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u00c5 A unit of length equal to one-tenth of a nanometer \u2014 used for measuring the wavelengths of light.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Animusic Company": {
    "term": "Animusic Company",
    "cat": "Pro Audio Reference",
    "def": "that creates computer animated music videos that are pure genius and totally entertaining. See: Extraordinaire Instrument de Musique for example.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anisotropic": {
    "term": "anisotropic",
    "cat": "Physics",
    "def": "1. Not isotropic. 2. Having properties that differ according to the direction of measurement. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "annealed 1": {
    "term": "annealed 1",
    "cat": "Pro Audio Reference",
    "def": "To subject (glass or metal) to a process of heating and slow cooling in order to toughen and reduce brittleness. 2. To strengthen or harden. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anode 1": {
    "term": "anode 1",
    "cat": "Pro Audio Reference",
    "def": "A positively charged electrode. 2. In a vacuum tube, it is the plate electrode. 3. In a forward-biased semiconductor diode it is the positive terminal. Contrast with cathode.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ANR (ambient": {
    "term": "ANR (ambient",
    "cat": "Pro Audio Reference",
    "def": "noise reduction) Any of various DSP algorithms that reduce unwanted background noise, for example, HVAC noise. A common signal processing block found in acoustic echo cancellers. [Different than ANC]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ANSI (pronounced": {
    "term": "ANSI (pronounced",
    "cat": "Pro Audio Reference",
    "def": "\u201cann-see\u201d) (American National Standards Institute) A private organization that develops and publishes standards for voluntary use in the U.S.A.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Antheil, George": {
    "term": "Antheil, George",
    "cat": "Pro Audio Reference",
    "def": "(1900-1959) US Composer, specializing in film music, who described himself as \u201cAmerica\u2019s bad boy of music.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Among Antheil\u2019s": {
    "term": "Among Antheil\u2019s",
    "cat": "Pro Audio Reference",
    "def": "early avant-garde pieces, none caused a greater sensation than his Balet m\u00e9canique, scored for automobile horns, airplane propeller, fire siren, ten grand pianos, and other instruments. When it was performed at Carnegie Hall in 1924, a concertgoer near the orchestra could stand no more than a few minutes of the racket. Tying his handkerchief to his cane, he raised the white flag in surrender. [Bartlett\u2019s Book of Anecdotes]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anti-aliasing filter": {
    "term": "anti-aliasing filter",
    "cat": "Pro Audio Reference",
    "def": "A low-pass filter used at the input of digital audio converters to attenuate frequencies above the half-sampling frequency to prevent aliasing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "anti-imaging filter": {
    "term": "anti-imaging filter",
    "cat": "Pro Audio Reference",
    "def": "A low-pass filter used at the output of digital audio converters to attenuate frequencies above the half-sampling frequency to eliminate image spectra present at multiples of the sampling frequency.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "antiquing": {
    "term": "antiquing",
    "cat": "Digital Audio",
    "def": "\u201cThe act of processing modern audio files to make them appear to have originated from historic technology. It is the inverse of restoring old recordings.\u201d From the abstract.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "antiskating also anti-skating Turntables": {
    "term": "antiskating also anti-skating Turntables",
    "cat": "Pro Audio Reference",
    "def": "A control mechanism on a phonograph designed to compensate for the natural tendency of a pivoted tone arm to pull toward the center. [AHD] That is, it keeps the stylus centered in the groove.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AO": {
    "term": "AO",
    "cat": "Terminology",
    "def": "See acoustooptics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AoE (Audio over Ethernet) Networks": {
    "term": "AoE (Audio over Ethernet) Networks",
    "cat": "Pro Audio Reference",
    "def": "Many systems exist using Ethernet for the transport of digital audio. Hit the link for details about the various proprietary protocols that include Layer 1 (e.g., Digigram\u2019s Ethersound\u00ae), Layer 2 (e.g. Cirrus Logic\u2019s CobraNet\u00ae also AVB: Audio/Video Bridging) and Layer 3 (e.g. Audinate\u2019s Dante\u00ae),",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AOIP (audio over Internet Protocol) Networks": {
    "term": "AOIP (audio over Internet Protocol) Networks",
    "cat": "Pro Audio Reference",
    "def": "A system for audio file sharing/transport that converts analog or digital audio into Ethernet packers for distribution over a LAN or Ethernet switches.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AP": {
    "term": "AP",
    "cat": "Terminology",
    "def": "(access point) Networks. A device that connects a wireless network to a wired LAN.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "APA (Audio Publishers Association)": {
    "term": "APA (Audio Publishers Association)",
    "cat": "Pro Audio Reference",
    "def": "The online resource center designed for audiobook listeners and industry professionals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "APD (auto power down)": {
    "term": "APD (auto power down)",
    "cat": "Electronics",
    "def": "Term used to describe equipment with a built-in feature that automatically reduces the power draw after a prescribed amount of time.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "API (application program interface) Software": {
    "term": "API (application program interface) Software",
    "cat": "Pro Audio Reference",
    "def": "Protocols for creating software applications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "APL (after processing listen)": {
    "term": "APL (after processing listen)",
    "cat": "Pro Audio Reference",
    "def": "A mixing console term and feature that allows post-processing monitoring of the signal. Compare with AFL and PFL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "APPA (Association": {
    "term": "APPA (Association",
    "cat": "Pro Audio Reference",
    "def": "of Higher Education Facilities Officers) The abbreviation, APPA, comes from their early name: Association of Physical Plant Administrators of Universities and Colleges, which was changed in 1991. A good resource for audio contractors, integrators, etc., especially for their focus on energy efficient buildings.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "apparent power": {
    "term": "apparent power",
    "cat": "Pro Audio Reference",
    "def": "The result of multiplying the rms value of the voltage by the rms value of the current in an electronic circuit. It is expressed in watts (W) for resistive loads and in volt-amperes (VA) for reactive loads. It\u2019s the amount of power the casual observer thinks is available (hence, apparent), but because of power factor may not be \u2014 the real power is usually less. See power factor .",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "appoggiatura": {
    "term": "appoggiatura",
    "cat": "Music",
    "def": "An embellishing note, usually one step above or below the note it precedes and indicated by a small note or special sign. [AHD] A melodic tone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AquaSonic Name of": {
    "term": "AquaSonic Name of",
    "cat": "Pro Audio Reference",
    "def": "a Danish band that performs underwater.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A&R (artists": {
    "term": "A&R (artists",
    "cat": "Pro Audio Reference",
    "def": "and repertory) Historically the record industry term for the department or person that acts as the go-between the artist and the record label. Their job is to select and sign the performers to the label, decide what songs they will record, and select who will work with the artists in the production arranging and performance of the material for the recording of master tapes. These details vary a lot from label to label. For a good discussion on how the A&R world is changing see: Wendy Day.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "architectural columns": {
    "term": "architectural columns",
    "cat": "Pro Audio Reference",
    "def": "See: line arrays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "architectural drawing": {
    "term": "architectural drawing",
    "cat": "Pro Audio Reference",
    "def": "symbols ANSI-J-STD-710 ANSI/CEA/CEDIA/InfoComm, Audio, Video and Control Architectural Drawing Symbols. Hit the link for a free download.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Archos Jukebox": {
    "term": "Archos Jukebox",
    "cat": "Pro Audio Reference",
    "def": "Multimedia See: Jukebox Multimedia.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "arithmetic": {
    "term": "arithmetic",
    "cat": "Pro Audio Reference",
    "def": "The mathematics of integers, rational numbers, real numbers, or complex numbers under addition, subtraction, multiplication, and division. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "arithmetric progression": {
    "term": "arithmetric progression",
    "cat": "Pro Audio Reference",
    "def": "A sequence, such as the positive odd integers 1, 3, 5, 7, . . . , in which each term after the first is formed by adding a constant to the preceding term. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ARM (advanced RISC machines)": {
    "term": "ARM (advanced RISC machines)",
    "cat": "Pro Audio Reference",
    "def": "The name for a microprocessor group formed from Acorn, backed by Apple, VLSI Technology and Nippon Investment and Finance, in 1990. Acorn Computer was the parent company set up by Dr. Hermann Hauser and Dr. Chris Curry in 1979 to make personal computers, but now enjoys its biggest success selling intellectual property around their proprietary RISC computer, called ARM, which originally stood for Acorn RISC Machines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "armonica Musical Instrument": {
    "term": "armonica Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Name for Benjamin Franklin\u2019s improvement on the Glass harmonic in 1761. Go to William Zeitler\u2019s website for fascinating details from one of the few modern players.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Armstrong, Edwin": {
    "term": "Armstrong, Edwin",
    "cat": "Pro Audio Reference",
    "def": "Howard (1890-1954) American radio engineer and inventor of regenerative feedback, FM (frequency modulation) and the superheterodyne receiver.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Armstrong Park": {
    "term": "Armstrong Park",
    "cat": "Pro Audio Reference",
    "def": "New Orleans site named after Louis Armstrong, considered to be the birthplace of jazz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Arnold, H": {
    "term": "Arnold, H",
    "cat": "Pro Audio Reference",
    "def": "D. American engineer who invented and patented the thermophone, while working at Western Electric. He is also credited with introducing a vacuum to the triode tube, thus perfecting its performance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ARRL (American": {
    "term": "ARRL (American",
    "cat": "Pro Audio Reference",
    "def": "Radio Relay League) The national association for amateur radio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "articulated line": {
    "term": "articulated line",
    "cat": "Pro Audio Reference",
    "def": "arrays See line arrays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "articulation 1": {
    "term": "articulation 1",
    "cat": "Pro Audio Reference",
    "def": "The act of vocal expression; utterance or enunciation: an articulation of the group\u2019s sentiments. 2a. The act or manner of producing a speech sound. 2b. A speech sound, especially a consonant. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "articulation index Abbr": {
    "term": "articulation index Abbr",
    "cat": "Pro Audio Reference",
    "def": "AI Speech. A number (ranging from 0 to 1) which is a measure of the intelligibility of speech\u2014the higher the number, the greater the intelligibility. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "artifact": {
    "term": "artifact",
    "cat": "Audio",
    "def": "Anything added, due to technical limitations, that was not in the original signal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASA (Acoustical": {
    "term": "ASA (Acoustical",
    "cat": "Pro Audio Reference",
    "def": "Society of America) Founded in 1929, the oldest organization for scientist and professional acousticians and others engaged in acoustical design, research and education.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASCII (pronounced": {
    "term": "ASCII (pronounced",
    "cat": "Pro Audio Reference",
    "def": "\u201cask-ee\u201d) (American Standard Code for Information Interchange) An ANSI standard data transmission code consisting of seven information bits, used to code 128 letters, numbers, and special characters. Many systems now use an 8-bit binary code, called ASCII-8, in which 256 symbols are represented (for example, IBM\u2019s \u201cextended ASCII\u201d).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASHRAE (American": {
    "term": "ASHRAE (American",
    "cat": "Pro Audio Reference",
    "def": "Society of Heating, Refrigerating and Air-Conditioning Engineers, Inc.) An international organization organized for the purpose of advancing the arts and sciences of heating, ventilation, air-conditioning and refrigeration for the public\u2019s benefit through research, standards writing, continuing education and publications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASIC (application-specific integrated circuit)": {
    "term": "ASIC (application-specific integrated circuit)",
    "cat": "Pro Audio Reference",
    "def": "A large-scale integrated circuit whose function is determined by the final mask layer for a particular application or group of applications; for example, an IC that does all the functions of a modem.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASIO (pronounced": {
    "term": "ASIO (pronounced",
    "cat": "Pro Audio Reference",
    "def": "\u201caz-ee-o\u201d) (audio stream input/output) Originally a multichannel audio transfer protocol developed by Steinberg in 1997, for audio/MIDI sequencing applications, allowing access to the multichannel capabilities of sound cards. Today it is a standard driver protocol for digital audio and computer sound cards",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASPEC (adaptive": {
    "term": "ASPEC (adaptive",
    "cat": "Pro Audio Reference",
    "def": "spectral perceptual entropy coding) A bit rate reduction standard for high quality audio. Jointly developed by AT&T Bell Labs, Thomson, the Fraunhofer Society and CNET. Characterized by high degrees of compression to allow audio transmission on ISDN.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "asperity noise": {
    "term": "asperity noise",
    "cat": "Recording",
    "def": "Noise caused by microscopic imperfections in the oxide coating of magnetic tape. Heard as a low frequency rumble similar to rocks banging together.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aspiration Speech": {
    "term": "aspiration Speech",
    "cat": "Pro Audio Reference",
    "def": "Expulsion of breath in speech. [AHD] \u201cIt occurs in the phoneme \u201ch\u201d in English, or with less duration after the release of an unvoiced consonant, for example, after the \u201cp\u201d in \u201cpie\u201d. [Bregman]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ASTC (Association": {
    "term": "ASTC (Association",
    "cat": "Pro Audio Reference",
    "def": "of Science-Technology Centers) \u201cAn organization of science centers and museums dedicated to furthering public engagement with science among increasingly diverse audiences.\u201d Another valuable resource for audio contractors, integrators, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "asymmetrical (non-reciprocal) response Term": {
    "term": "asymmetrical (non-reciprocal) response Term",
    "cat": "Pro Audio Reference",
    "def": "used to describe the comparative shapes of the boost/cut curves for variable equalizers. The cut curves do not mirror the boost curves, but instead are quite narrow, intended to act as notch filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "asynchronous": {
    "term": "asynchronous",
    "cat": "Pro Audio Reference",
    "def": "A transmission process where the signal is transmitted without any fixed timing relationship between one word and the next (and the timing relationship is recovered from the data stream).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ATA (American": {
    "term": "ATA (American",
    "cat": "Pro Audio Reference",
    "def": "Telemedicine Association) \u201cThe leading resource and advocate promoting access to medical care for consumers and health professionals via telecommunications technology.\u201d Another valuable resource for audio contractors, integrators, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A-taper See": {
    "term": "A-taper See",
    "cat": "Pro Audio Reference",
    "def": "potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ATM (asynchronous": {
    "term": "ATM (asynchronous",
    "cat": "Pro Audio Reference",
    "def": "transfer mode) networking An extremely fast networking technology already found on many disk editors (Avid, Sonic Solutions, Studio Audio, etc.) and predicted to infiltrate homes within the coming decade. ATM specifies the protocol (i.e., the order and sequence) of the digital information on the network, but not the physical means of transmission (e.g., fiber optic, twisted-pair, etc.). The protocol controls how the entire network is run and maintained.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Atmos\u00ae Dolby": {
    "term": "Atmos\u00ae Dolby",
    "cat": "Pro Audio Reference",
    "def": "registered trademark for their 64-channel surround sound system for cinema and the companion 7.1.4 channel home system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "atmospheric pressure": {
    "term": "atmospheric pressure",
    "cat": "Pro Audio Reference",
    "def": "Pressure caused by the weight of the atmosphere. At sea level it has a mean value of one atmosphere but reduces with increasing altitude. [AHD] See 0 dB-SPL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "atofarad Abbr": {
    "term": "atofarad Abbr",
    "cat": "Pro Audio Reference",
    "def": "aF Nanotechnology. A prefix for 10-18 farads, as in 1 ppm of a 1 pF measurement (10-6 x 10-12).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "ATRAC (Adaptive": {
    "term": "ATRAC (Adaptive",
    "cat": "Pro Audio Reference",
    "def": "Transform Acoustic Coding) Very early (1992) Sony proprietary audio data compression technique using psychoacoustic principles to convert standard CD quality audio (16-bit, 44.1 kHz) into a file one-fifth the original size.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "attack": {
    "term": "attack",
    "cat": "Music",
    "def": "The beginning or manner of beginning a piece, passage, or tone. [AHD] A measure of how long it takes for the beginning to peak. Contrast with decay. Audio Compressors. How fast the gain is turned down once the signal exceeds the threshold setting. Contrast with release. Also see: automatic attack & release.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "attenuation to": {
    "term": "attenuation to",
    "cat": "Pro Audio Reference",
    "def": "crosstalk ratio See ACR.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "attenuator or attenuator pad": {
    "term": "attenuator or attenuator pad",
    "cat": "Electronics",
    "def": "A passive network that reduces the voltage (or power; see usage note under gain) level of a signal with negligible distortion, but with insertion loss. Often a purely resistive network, although any combination of inductors, resistors and capacitors are possible, a pad may also provide impedance matching. [Compare with fader and crossfader. More details available in an excellent article by Rick Chinn, \u201cPads 101\u201d appearing in the Syn-Aud-Con Newsletter, Vol. 32, No. 2 Spring 2004, pp. 8-11.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Pads": {
    "term": "Pads",
    "cat": "Pro Audio Reference",
    "def": "are referred to by the topology of the network formed, with the two most common being an L-pad and a T-pad:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "L-pad": {
    "term": "L-pad",
    "cat": "Pro Audio Reference",
    "def": "A two-leg network shaped like an inverted, backward letter \u201cL\u201d. It usually consists of two resistors that are fixed or adjustable. A true variable L-pad consists of two variable potentiometers that are ganged (tied) together. The ganged sections work to provide either a constant input or a constant output impedance regardless of the attenuation setting. Since modern analog audio electronic circuits consist of stages characterized by very high input and very low output impedances, the term is now broaden to include all L-shaped networks without the requirement of providing constant impedance to the source or load. Volume and level controls are common examples.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Balanced L-pad (or U-pad)": {
    "term": "Balanced L-pad (or U-pad)",
    "cat": "Pro Audio Reference",
    "def": "A balanced version of the above L-pad, the following is for general purpose audio, recommended by the IEC, exact and nearest 1% values shown.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "T-pad": {
    "term": "T-pad",
    "cat": "Pro Audio Reference",
    "def": "A three-leg network shaped like the letter \u201cT\u201d. It usually consists of three resistors that are fixed or adjustable. A true variable T-pad consists of two or three variable potentiometers that are ganged (tied) together. The ganged sections work to provide either a constant input or a constant output impedance regardless of the attenuation setting. Since modern analog audio electronic circuits consist of stages characterized by very high input and very low output impedances, the term is now broaden to include all T-shaped networks without the requirement of providing constant impedance to the source or load.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Bridged T-pad": {
    "term": "Bridged T-pad",
    "cat": "Pro Audio Reference",
    "def": "In this configuration, R1 and R2 are fixed to the pad\u2019s impedance, while R3 and R4 can be variable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Balanced T-pad": {
    "term": "Balanced T-pad",
    "cat": "Pro Audio Reference",
    "def": "(or H-pad) R1 and R3 are half the values of the unbalanced T-pad above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "O-pad": {
    "term": "O-pad",
    "cat": "Pro Audio Reference",
    "def": "Used when the input impedance is much higher than the impedance across the output.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aubades": {
    "term": "aubades",
    "cat": "Music",
    "def": "1. A song or instrumental composition concerning, accompanying, or evoking daybreak. 2. A poem or song of or about lovers separating at dawn. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Audimax CBS trademark for": {
    "term": "Audimax CBS trademark for",
    "cat": "Pro Audio Reference",
    "def": "a broadcast AGC unit invented by Emil Torick in the \u201950s to replace the transmitter watch engineer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio 1": {
    "term": "audio 1",
    "cat": "Pro Audio Reference",
    "def": "Of or relating to humanly audible sound, i.e., audio is all the sounds that humans hear (approximately 20 Hz \u2013 20 kHz). 2. a. Of or relating to the broadcasting or reception of sound. b. Of or relating to high-fidelity sound reproduction. (Audio traveling through air is vibrations, or cycles of alternating pressure zones. Rarefaction follows each cycle of compression, which produces a wave.) [AHD] [Usage Note: The word \u201caudio\u201d often refers to the electrical signal, as opposed to the acoustic meaning, which is most often referred to as \u201csound,\u201d rather than \u201caudio.\u201c]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio archaeologist": {
    "term": "audio archaeologist",
    "cat": "Pro Audio Reference",
    "def": "A term coined by sound designer Andrew Roth to describe his specialty of capturing sounds that relate to specific time periods.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio books": {
    "term": "audio books",
    "cat": "Pro Audio Reference",
    "def": "See Pro Audio Reference Books for books used to create this site.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio bridge": {
    "term": "audio bridge",
    "cat": "Pro Audio Reference",
    "def": "A communications bridge that allows multiple duplex connections over 4-wire telephone connections. Well designed audio bridges do not connect inputs to their own outputs, thus avoiding feedback. See mix-minus.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio compression": {
    "term": "audio compression",
    "cat": "Pro Audio Reference",
    "def": "See digital audio data compression.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio connectors": {
    "term": "audio connectors",
    "cat": "Pro Audio Reference",
    "def": "See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Audio Courses": {
    "term": "Audio Courses",
    "cat": "Pro Audio Reference",
    "def": "Interesting website; it\u2019s an online audio production school but with lots of useful (and free) information.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio coverage": {
    "term": "audio coverage",
    "cat": "Pro Audio Reference",
    "def": "uniformity See: ACU.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio levels": {
    "term": "audio levels",
    "cat": "Pro Audio Reference",
    "def": "See levels and decibels.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audiology": {
    "term": "audiology",
    "cat": "Pro Audio Reference",
    "def": "The study of hearing, especially hearing defects and their treatment. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Audio magazine": {
    "term": "Audio magazine",
    "cat": "Pro Audio Reference",
    "def": "(1947-2000) America\u2019s first and longest running audio magazine. Its demise after 53 years of continuous publication leaves a huge void in the consumer audio world. Gone is the last great rational voice, lost amidst the pseudoscientific din dominating high-end audio. An audio warrior is dead and we are lessened. [Searchable back issues here.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio magazines": {
    "term": "audio magazines",
    "cat": "Pro Audio Reference",
    "def": "(various) back issues Go here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audiophiles": {
    "term": "audiophiles",
    "cat": "Pro Audio Reference",
    "def": "The best description is found here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audion Dr": {
    "term": "audion Dr",
    "cat": "Pro Audio Reference",
    "def": "Lee De Forest\u2019s name for his 1906 invention of the triode (three-element vacuum tube), building upon Sir John Ambrose Fleming\u2019s thermionic diode, based on the Edison effect. De Forest credits his assistant, C.D. Babcock for the name.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Audio over": {
    "term": "Audio over",
    "cat": "Pro Audio Reference",
    "def": "Ethernet See: AoE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audion piano": {
    "term": "audion piano",
    "cat": "Pro Audio Reference",
    "def": "The first vacuum tube instrument in 1915, invented by Dr. Lee De Forest.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio snake": {
    "term": "audio snake",
    "cat": "Pro Audio Reference",
    "def": "See snake.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio taper": {
    "term": "audio taper",
    "cat": "Pro Audio Reference",
    "def": "See potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Audio Timeline": {
    "term": "Audio Timeline",
    "cat": "Pro Audio Reference",
    "def": "A most fascinating audio development timeline created by three esteemed AES members, Jerry Bruck, Al Grundy and Irv Joel, as part of the 50th anniversary of the AES.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audio websites": {
    "term": "audio websites",
    "cat": "Pro Audio Reference",
    "def": "A truly astonishing and remarkable list of audio related websites compiled daily by Steve Ekblad. Also see Audio & Hi-Fi Page, an equally astonishing and remarkable list of audio related websites compiled by Tomi Engdahl. And for a refreshingly rational voice on hot audio topics check out Rod Elliott\u2019s site, particularly his get-rich-quick scheme for exploiting the gullible regarding burning-in audio cables. [Absolutely brilliant.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "audition": {
    "term": "audition",
    "cat": "Hearing",
    "def": "1. The sense or power of hearing. 2. The act of hearing. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "auditory filter Term": {
    "term": "auditory filter Term",
    "cat": "Pro Audio Reference",
    "def": "used to describe the concept of critical bands. Analogous to a bandpass filter with a rounded top (\u201crounded-exponential\u201d after Patterson and Moore, 1986). The filter is slightly asymmetric, being wider on the low-frequency side.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "auditory masking": {
    "term": "auditory masking",
    "cat": "Hearing",
    "def": "See: masking.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "auditory streaming": {
    "term": "auditory streaming",
    "cat": "Pro Audio Reference",
    "def": "(Shortened form of \u201cauditory stream segregation\u201d dubbed by Ulric Neisser.) Hearing. Term coined by Albert Bregman in his book Auditory Scene Analysis to describe the hearing phenomenon where we separate a continuous sound stream into discrete words or sounds. This explains, for example, the \u201ccocktail party effect\u201d where we separate out specific sounds (words) important to us from a cacophony of surrounding sound. Another example is that speech is a continuous audio stream, even though we \u201chear\u201d separate words, yet there are no pauses in the audio stream. Yet another example is where musicians separate and listen to one or two instruments from among many playing at once. [I am vastly oversimplifying here to just give you a top-layer understanding. Hit the link and then obtain Bregman\u2019s book for the full treatment.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aulos Musical Instrument": {
    "term": "aulos Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Ancient Egyptian double flute [See vase photo here.] Also used for single flute; hit the link for all the variations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aural Of,": {
    "term": "aural Of,",
    "cat": "Pro Audio Reference",
    "def": "relating to, or perceived by the ear. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aural architecture": {
    "term": "aural architecture",
    "cat": "Pro Audio Reference",
    "def": "The phrase coined by Blesser & Salter in their book: Spaces Speak, Are You Listening, to describe the complex phenomenon of how humans sense space by listening. Sensing spatial attributes is a nature human ability and the authors conclusively make the point that every environment has an aural architecture.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aural hallucinations": {
    "term": "aural hallucinations",
    "cat": "Pro Audio Reference",
    "def": "See: clairaudient.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Aureal 3D": {
    "term": "Aureal 3D",
    "cat": "Pro Audio Reference",
    "def": "(A3D) Proprietary 3D sound technology first developed by Crystal River Engineering, which became the advanced technology subsidiary of Aureal Semiconductor, alas, now defunct. Aureal 3D made many claims. At one time their website stated that \u201csince we can hear sounds three dimensionally in the real world by using two ears, it must be possible to create sounds from two speakers that have the same effect\u201d \u2026 well \u2026 NO \u2026 it\u2019s pretty rhetoric, but flawed logic. Our two ears receive sound coming from sources located in every possible direction, and from that information process three-dimensional location \u2014 that is not the problem. The problem is how to make our two ears receive sound from sources located in only two directions, and trick them into hearing three dimensionally \u2014 that is the problem. Aureal claimed to have solved this problem, but didn\u2019t stay in business long enough for anyone to find out.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "auricle See:": {
    "term": "auricle See:",
    "cat": "Pro Audio Reference",
    "def": "pinna.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "authoring DVD, CD or CD-ROM": {
    "term": "authoring DVD, CD or CD-ROM",
    "cat": "Pro Audio Reference",
    "def": "A term used to indicate more than writing, now used to include all the processes necessary (designing, creating & editing) to add information of any sort onto a DVD, CD or CD-ROM primarily providing search and retrieval features.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "autoformer Autoformer": {
    "term": "autoformer Autoformer",
    "cat": "Pro Audio Reference",
    "def": "is short for autotransformer, or self-transformer, from the definition of auto-. An autotransformer is one that self-magnetizes to produce the transformer voltage, it does this by not having a true secondary, i.e., there is only one winding with one part acting as the primary and the other part acting as the secondary, but there is no second winding, and no air gap, and thus no true isolation between the primary and secondary. Therefore an autotransformer is a transformer in which part of one winding is common to both the primary and the secondary circuits associated with that winding.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "automatic attack & release Audio Compressors": {
    "term": "automatic attack & release Audio Compressors",
    "cat": "Pro Audio Reference",
    "def": "Automatic attack and release designs typically look at the rate of change of the difference between the threshold and the current signal level (the error signal). If the difference changes quickly, attack and release respond faster to the change. If the rate of change is small, attack and decay are slowed. The result is a relatively fast response to quick changes and a much slower response to slower changes, significantly reducing pumping and distortion. Digital designs do this using DSP algorithms. See THAT Corporation Design Note 114, Adaptive attack and release rates \u2026 http://www.thatcorp.com/datashts/dn114.pdf for a description of an automatic scheme for an analog design.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "automatic gain": {
    "term": "automatic gain",
    "cat": "Pro Audio Reference",
    "def": "control See: AGC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "automatic mic mixer": {
    "term": "automatic mic mixer",
    "cat": "Pro Audio Reference",
    "def": "A specialized mixer optimized for solving the problems of multiple live microphones operating together as a system, such as found in boardrooms, classrooms, courtrooms, church systems, etc. An automatic mic mixer controls the live microphones by turning up (on) mics when someone is talking, and turning down (off) mics that are not used, thus it is a voice-activated, real-time process, without an operator, hence, automatic. An automatic mic mixer must adapt to changing background noise conditions. Further it must control the additive effect of multiple mics being on at the same time (see NOM). If one mic is on at maximum gain, opening up another one may cause acoustic feedback, so an automatic mixer must also control the system gain to prevent feedback or excessive noise pickup. Dan Dugan patented the first automatic mic mixer and is recognized as the father of this technology. A final problem that automatic mixers solve is maintaining a natural ambience from the room. This is especially critical in recording and broadcasting. A good automatic mixer must make rapid and dramatic changes in the gains of the input channels while maintaining the sonic illusion that nothing is happening at all.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "automixer See:": {
    "term": "automixer See:",
    "cat": "Pro Audio Reference",
    "def": "automatic mic mixer",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aux Nickname": {
    "term": "aux Nickname",
    "cat": "Pro Audio Reference",
    "def": "for auxiliary jack, found on audio equipment and used as an additional input or output.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "aux fed": {
    "term": "aux fed",
    "cat": "Pro Audio Reference",
    "def": "subs, or aux fed subwoofers A live sound technique becoming popular when subwoofers are used with the FOH system. It is claimed that a properly configured and operated aux fed subwoofer system better maintains gain structure and crossover relationships. See Tom Young\u2019s article at ProSoundweb, \u201cA Detailed Explanation Of The Aux Fed Subwoofer Technique.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AVB (Audio/Video Bridging) Networks": {
    "term": "AVB (Audio/Video Bridging) Networks",
    "cat": "Pro Audio Reference",
    "def": "Name for the IEEE 802 emerging standard for gigabit Ethernet networks that is finding favor in the live sound industry to transport digital audio between the stage and the FOH console. Since this is a non-proprietary, i.e., no licensing fees, networking standard and is backed by giants Cisco and Intel, many pro audio companies are watching it closely. Also see: AoE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AV": {
    "term": "AV",
    "cat": "Terminology",
    "def": "Abbreviation for audio- video, referring to systems that contain both.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AVD (advanced video disk)": {
    "term": "AVD (advanced video disk)",
    "cat": "Pro Audio Reference",
    "def": "A Chinese proposed alternative to the DVD standard to avoid paying what they consider exorbitant royalties. This threatened standard would apply to DVD-like players sold only in China. Replaced by EVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "average power": {
    "term": "average power",
    "cat": "Pro Audio Reference",
    "def": "See apparent power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AVnu Alliance": {
    "term": "AVnu Alliance",
    "cat": "Pro Audio Reference",
    "def": "(pronounced \u201cavenue\u201d) From website: \u201cAn industry forum dedicated to the advancement of professional-quality audio video by promoting the adoption of the IEEE 802.1 Audio Video Bridging (AVB), and the related IEEE 1722 and IEEE 1733, standards over various networking link-layers.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AVT (air": {
    "term": "AVT (air",
    "cat": "Pro Audio Reference",
    "def": "velocity transformer) See: air motion transformer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "Awakenings Festival": {
    "term": "Awakenings Festival",
    "cat": "Pro Audio Reference",
    "def": "Netherlands music festival, billed as \u201cone of the world\u2019s largest outdoor techno festivals.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "A-weighting See": {
    "term": "A-weighting See",
    "cat": "Pro Audio Reference",
    "def": "weighting filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AWG (American wire gauge)": {
    "term": "AWG (American wire gauge)",
    "cat": "Pro Audio Reference",
    "def": "A specification for non-ferrous (e.g., copper, aluminum, gold, silver, etc.) wire diameter. [Note, for example, that this means that 14 gauge galvanized steel wire & 14 gauge cooper wire have different diameters.] Also known as Brown and Sharp (B&S) wire gauge, after J.R. Brown who devised the system in 1857 (I have been unsuccessful in finding out what Sharpe\u2019s role was). For more detail, see Douglas Brooks\u2019 \u201cHow to Gauge Traces.\u201d Many tables exist on the Internet. The British standard is called SWG standing for Standard wire gauge, also called Imperial wire gauge.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "axe Musical instrument, usually": {
    "term": "axe Musical instrument, usually",
    "cat": "Pro Audio Reference",
    "def": "a guitar.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "axial mode": {
    "term": "axial mode",
    "cat": "Acoustics",
    "def": "Sound reflecting between two parallel surfaces. Compare tangential mode and oblique mode.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "AZA (Association": {
    "term": "AZA (Association",
    "cat": "Pro Audio Reference",
    "def": "of Zoos and Aquariums) \u201cAZA-accredited zoos and aquariums are leaders in the protection of endangered species.\u201d Another resource for audio contractors, integrators, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "azimuth 1": {
    "term": "azimuth 1",
    "cat": "Pro Audio Reference",
    "def": "The horizontal angular distance from a reference direction, usually the northern point of the horizon, to the point where a vertical circle through a celestial body intersects the horizon, usually measured clockwise. Sometimes the southern point is used as the reference direction, and the measurement is made clockwise through 360\u00b0 2. The horizontal angle of the observer\u2019s bearing in surveying, measured clockwise from a referent direction, as from the north, or from a referent celestial body, usually Polaris. 3. The lateral deviation of a projectile or bomb. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "azimuth recording": {
    "term": "azimuth recording",
    "cat": "Recording",
    "def": "Magnetic recording trick that reduces crosstalk between adjacent tracks.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "azure noise": {
    "term": "azure noise",
    "cat": "Pro Audio Reference",
    "def": "See noise color.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (A)"
  },
  "B 1.": {
    "term": "B 1.",
    "cat": "Audio",
    "def": "The symbol for bel, a unit for level. 2. Electronics. Symbol for susceptance and, confusingly, also the symbol for magnetic flux density.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "B+": {
    "term": "B+",
    "cat": "Terminology",
    "def": "Vacuum Tubes. The symbol for the high voltage power supply found in battery-operated radios featuring vacuum tubes. In these designs there was an \u201cA\u201d supply for the filaments, a \u201cB\u201d supply for high voltage, a \u201cC\u201d supply for bias and a \u201cD\u201d supply for screen grids. [Pittman]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "B-3": {
    "term": "B-3",
    "cat": "Music",
    "def": "Famous organ developed by Laurens Hammond in 1954 and when combined with a Leslie\u00ae rotating speaker became a jazz, R&B, and rock \u2018n\u2019 roll staple.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "babbling tributary": {
    "term": "babbling tributary",
    "cat": "Pro Audio Reference",
    "def": "In LAN technology, a workstation that constantly sends meaningless messages.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "babel Loud,": {
    "term": "babel Loud,",
    "cat": "Pro Audio Reference",
    "def": "confused, or disagreeable sound that stresses confusion of vocal sounds arising from simultaneous utterance and random mixture of languages. After Babel, the biblical city (now thought to be Babylon) in Shinar where God confounded a presumptuous attempt to build a tower into heaven by confusing the language of its builders into many mutually incomprehensible languages. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bachata": {
    "term": "Bachata",
    "cat": "Pro Audio Reference",
    "def": "A Dominican Republic-born music genre growing in popularity as well as the exciting dance form.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "back-EMF (back-electromotive force) See": {
    "term": "back-EMF (back-electromotive force) See",
    "cat": "Pro Audio Reference",
    "def": "also EMF. Literally, back-voltage, is a phenomena found in all moving-coil electromagnetic systems, but for audio is most often used with respect to loudspeaker operation. This term describes the action where, after the signal stops, the speaker cone continues moving, causing the voice coil to move through the magnetic field (now acting like a microphone), creating a new voltage that tries to drive the cable back to the power amplifier\u2019s output. If the loudspeaker is allowed to do this, the cone flops around like a dying fish. It does not sound good. The only way to stop back-emf is to make the loudspeaker \u201csee\u201d a dead short, i.e., zero ohms looking backward, or as close to it as possible. See damping factor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "background music Abbr": {
    "term": "background music Abbr",
    "cat": "Pro Audio Reference",
    "def": "BGM Officially music without lyrics and not performed by the original artist, used as an alternative to silence. Contrast with foreground music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "background noise": {
    "term": "background noise",
    "cat": "Acoustics",
    "def": "The total noise from all sources other than a particular sound that is of interest (e.g., other than the sound being measured or other than the speech or music being listened to). [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "backplate": {
    "term": "backplate",
    "cat": "Microphones",
    "def": "The solid conductive disk that forms the fixed half of a condenser element. [Vear]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "backward masking": {
    "term": "backward masking",
    "cat": "Pro Audio Reference",
    "def": "See temporal masking.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "baffle": {
    "term": "baffle",
    "cat": "Loudspeakers",
    "def": "In its simplest form, the main speaker mounting board in a cabinet, whose primary purpose is to separate the front and rear sound waves, from here it becomes a very complex subject.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "baglama Musical Instrument": {
    "term": "baglama Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Turkish stringed instrument most commonly used for folk music,, sometimes called saz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bagpipe Musical Instrument": {
    "term": "bagpipe Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A musical instrument having a flexible bag inflated either by a tube with valves or by bellows, a double-reed melody pipe, and from one to four drone pipes. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Baker clamp": {
    "term": "Baker clamp",
    "cat": "Electronics",
    "def": "A circuit technique dating from the early \u201950s using a diode as a clamp to prevent deep transistor saturation by providing a path for excessive base drive current. Recently used by National Semiconductor in a popular audio power amplifier IC to aid in fast recovery from peak overloads. Hit the link for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bakersfield sound": {
    "term": "Bakersfield sound",
    "cat": "Music",
    "def": "A style made popular by Bakersfield, CA hometown boys, Merle Haggard and Buck Owens, featuring heavy twangy steel guitar.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "baking Sound": {
    "term": "baking Sound",
    "cat": "Recording",
    "def": "The name for the process required for old analog tapes where they must be put into an oven and \u201cbaked\u201d to remove moisture and prevent the oxide from shedding onto the tape heads.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "balance control": {
    "term": "balance control",
    "cat": "Pro Audio Reference",
    "def": "A control found most commonly on professional and consumer stereo preamplifiers, used to change the relative loudness (power) between the left and right channels. Attenuating the opposite channel makes one channel (apparently) louder. This is most often done (in analog designs) with a dual potentiometer with an \u201cM-N taper.\u201d An M-N taper consists of a \u201cshorted\u201d output for the first 50% of travel and then a linear taper for the last 50% of travel, operating oppositely for each channel. Therefore, with the control in its center detent position, there is no attenuation of either channel. Rotating it away from the center position causes one channel to be attenuated, while having no effect on the other channel, and vice-versa. Contrast with pan and crossfade controls.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Balanced lines": {
    "term": "Balanced lines",
    "cat": "Pro Audio Reference",
    "def": "are the preferred method (for hum free) interconnecting of sound systems using a shielded twisted-pair. Because of its superior noise immunity, balanced lines also find use in interconnecting data signals, e.g., RS-422, and digital audio, e.g., AES/EBU. The principal behind balanced lines is that the signal is transmitted over one wire and received back on another wire. The shield does not carry any information, thus it is free to function as a true shield, but must be earth grounded at each end to be successful. (For a detailed tutorial on proper grounding practices, see RaneNote Sound System Interconnection) This circuit\u2019s shining virtue is its great common-mode noise rejection ability. The concept here relies on induced noise showing up equally (or common) on each wire. It is mainly due to EMI (electromagnetic interference: passing through or near magnetic fields), RFI (radio frequency interference: strong broadcast signals), noisy ground references, or a combination of all three. A true balanced line exhibits exactly equal impedance from each line relative to ground, guaranteeing equal noise susceptibility. Since the balanced input stage amplifies only the difference between the lines, it rejects everything else (noise) that is common to the lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Ball, Roland": {
    "term": "Ball, Roland",
    "cat": "Pro Audio Reference",
    "def": "Sherwood \u201cErnie\u201d(1930-2004) American musician/entrepreneur who developed guitar strings and accessories into an art form.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "ballistics See": {
    "term": "ballistics See",
    "cat": "Pro Audio Reference",
    "def": "meter ballistics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "balun (balanced-unbalanced)": {
    "term": "balun (balanced-unbalanced)",
    "cat": "Pro Audio Reference",
    "def": "A jargon term originally popularized by radio engineers referring to the balanced to unbalanced transformer used to interface with the radio antenna. Today, expanded to refer to any interface (usually a transformer) between balanced and unbalanced lines or circuitry; may also provide impedance transformation, as 300 ohm balanced to 75 ohm unbalanced, or vice versa. Another popular use is in transitioning between balanced twisted-pair and an unbalanced coaxial cable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "banana jack": {
    "term": "banana jack",
    "cat": "Pro Audio Reference",
    "def": "or banana plug See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "banda": {
    "term": "banda",
    "cat": "Music",
    "def": "A popular brass, woodwind and percussion music style that began in Mexico and spread from there.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "band-limiting filters": {
    "term": "band-limiting filters",
    "cat": "Pro Audio Reference",
    "def": "A low-pass and a high-pass filter in series, acting together to restrict (limit) the overall bandwidth of a system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bandoneon Musical Instrument": {
    "term": "bandoneon Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A small accordion especially popular in Latin America. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bandpass filter": {
    "term": "bandpass filter",
    "cat": "Pro Audio Reference",
    "def": "A filter that has a finite passband, neither of the cutoff frequencies being zero or infinite. The bandpass frequencies are normally associated with frequencies that define the half power points, i.e. the -3 dB points. See Figure 1 of the RaneNote Constant-Q Graphic Equalizers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bandwidth Abbr": {
    "term": "bandwidth Abbr",
    "cat": "Pro Audio Reference",
    "def": "BW 1. Electronic filters The numerical difference between the upper and lower -3 dB points of a band of audio frequencies. Used to figure the Q, or quality factor, for a filter. See Figure 1 of RaneNote Constant-Q Graphic Equalizers; also download \u201cBandwidth vs. Q Calculator\u201d as a zipped Microsoft Excel spreadsheet in the Rane Library. 2. Telecommunications The size of the communications channel. In analog communications, bandwidth is measured in Hertz (Hz), while digital communications measures bandwidth (data transfer rate) in bits per second. For example, an analog telephone channel has a bandwidth of 4,000 Hz, while a digitally coded telephone channel has a bandwidth of 64 kilobits/second. See the RaneNote Audio Specifications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "banhu Musical Instrument": {
    "term": "banhu Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Chinese bowed 2-string fiddle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "banjo \u201cI": {
    "term": "banjo \u201cI",
    "cat": "Pro Audio Reference",
    "def": "can see fiddling around with a banjo, but how do you banjo around with a fiddle?\u201d \u2014 Duncan Purney [from Barber]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "banjo Musical Instrument": {
    "term": "banjo Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "An instrument with strings stretched across a membrane over a resonant cavity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "banjolin Musical Instrument": {
    "term": "banjolin Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "An instrument combining a banjo and a mandolin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Banjo Paterson": {
    "term": "Banjo Paterson",
    "cat": "Pro Audio Reference",
    "def": "See: Paterson, A.B.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bantam jacks": {
    "term": "bantam jacks",
    "cat": "Pro Audio Reference",
    "def": "See: TT.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bar": {
    "term": "bar",
    "cat": "Pro Audio Reference",
    "def": "A unit of pressure equal to one million dynes per square centimeter. (Yeah, I know, you expected some wiseacre response, but you ain\u2019t gonna get it.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bara, Theda": {
    "term": "Bara, Theda",
    "cat": "Pro Audio Reference",
    "def": "(1890-1955) Anagram of \u201cArab Death,\u201d used as a pseudonym by the Cincinnati-born, Hollywood actress Theodosia Goodman in the 1920s, who became the first woman movie star.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "barberpole tone": {
    "term": "barberpole tone",
    "cat": "Pro Audio Reference",
    "def": "(or effect) See Shepard function generator.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "barber\u2019s music": {
    "term": "barber\u2019s music",
    "cat": "Pro Audio Reference",
    "def": "Used to describe non-professional music named after the fact that barber\u2019s shops used to have a guitar or other acoustic instrument on hand for customer\u2019s use while waiting. [Kacirk]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Barkhausen noise": {
    "term": "Barkhausen noise",
    "cat": "Loudspeakers",
    "def": "A coil of wire wound on the ferromagnetic material can demonstrate the sudden, discontinuous jumps in magnetization. The sudden transitions in the magnetization of the material produce current pulses in the coil. These can be amplified to produce a series of clicks in a loudspeaker. This sounds as crackle, complete with skewed pulses which sounds like candy being unwrapped, Rice Krispies, or a pine log fire. [from Wikipedia entry] Transformers. Noise associated with the deformation of magnetic domains in the core of a transformer. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Baroque 1": {
    "term": "Baroque 1",
    "cat": "Pro Audio Reference",
    "def": "Music: of, relating to, or characteristic of a style of composition that flourished in Europe from about 1600 to 1750, marked by chromaticism, strict forms, and elaborate ornamentation. [AHD] 2. When you are out of Monet. (Thanks JF and I\u2019ll never tell.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Barr, Keith": {
    "term": "Barr, Keith",
    "cat": "Pro Audio Reference",
    "def": "Elliot (1949-2010) American engineer who cofounder MXR and then Alesis Electronics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "barrelhouse Style of boogie piano playing": {
    "term": "barrelhouse Style of boogie piano playing",
    "cat": "Pro Audio Reference",
    "def": "[Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "barrier strips": {
    "term": "barrier strips",
    "cat": "Pro Audio Reference",
    "def": "Same as terminal strips, see connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Barron, Louis": {
    "term": "Barron, Louis",
    "cat": "Pro Audio Reference",
    "def": "& Bebe (Louis: 1920-1989; Bebe:1925-2008) American husband and wife team that composed the first electronic-music score featured in the movie, Forbidden Planet, in 1956.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "baseband": {
    "term": "baseband",
    "cat": "Pro Audio Reference",
    "def": "A transmission medium with capacity for one channel only. Typically found in local area networks (LANs). In baseband LANs, the entire bandwidth, or capacity, of the cable is used to transmit a single digital signal. Everything on that cable (transmitted or received) must use that one channel, which is very fast, so each device needs only to use that high speed channel for only a little of the time. Therefore all attached devices (printers, computers, databases) share by taking turns using the same cable. Baseband as used in videoconferencing means audio and video signals are transmitted over separate cables. Contrast with broadband",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "baseband signaling Transmission of": {
    "term": "baseband signaling Transmission of",
    "cat": "Pro Audio Reference",
    "def": "a digital or analog signal at its original frequencies; i.e., a signal in its original form, not changed by modulation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BASH\u00ae (Bridged": {
    "term": "BASH\u00ae (Bridged",
    "cat": "Pro Audio Reference",
    "def": "Amplifier Switching Hybrid) Audio Amplifiers. The registered trademark of Indigo, an OEM company, for their patented (U.S. 5,075,634 & U.S. 5,510,753) Class H power amplifier technology that uses a fast-response, pulse-width modulated power supply and a linear Class AB amplifier. BASH modules are found in many powered loudspeakers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "basilar membrane": {
    "term": "basilar membrane",
    "cat": "Hearing",
    "def": "A membranous portion of the cochlea in the mammalian inner ear that supports the organ of Corti. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Basilica Soundscape Festival": {
    "term": "Basilica Soundscape Festival",
    "cat": "Pro Audio Reference",
    "def": "The ultimate eclectic alternative music festival, held annually in an old train-wheel factory in Hudson, NY.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bass Coast Festival": {
    "term": "Bass Coast Festival",
    "cat": "Pro Audio Reference",
    "def": "A Canadian eclectic music and arts festival held in Merritt, British Columbia (about 167 mi, or 269 km, northeast of Vancouver, unique for having no corporate sponsorship.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bass management Home Cinema": {
    "term": "bass management Home Cinema",
    "cat": "Pro Audio Reference",
    "def": "A circuit that sums all the frequencies below 80Hz from the main channels and the signal from the LFE channel and delivers it (normally) to the subwoofer. Compare with LFE",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bass ratio (BR)": {
    "term": "bass ratio (BR)",
    "cat": "Acoustics",
    "def": "An objective measure of sound \u201cwarmth.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bass reflex": {
    "term": "bass reflex",
    "cat": "Loudspeakers",
    "def": "Invented by Thuras in 1930, a type of cabinet design featuring a \u201cport\u201d (a vent or opening of any shape) on the baffle to allow the rear sound wave to exit (in phase \u2014 that is the trick) with the front wave. Originally a trademark of the Jensen Company in the 1930s. [White], this popular design is also called a vented loudspeaker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bat\u00e1 drum Musical Instrument": {
    "term": "Bat\u00e1 drum Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A set of three double-headed hourglass-shaped drums originating in Africa.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bathythermograph": {
    "term": "bathythermograph",
    "cat": "Acoustics",
    "def": "A device used in underwater acoustics to measure water temperature at different depths for the purpose of determining the velocity of sound in seawater. See XBT.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "battery": {
    "term": "battery",
    "cat": "Electronics",
    "def": "Invented and named by Benjamin Franklin in the 1748. He named his device for storing electrical charge for their resemblance to rows of guns.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "battle axe": {
    "term": "battle axe",
    "cat": "Pro Audio Reference",
    "def": "Musician slang for a trumpet. [Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "baud rate": {
    "term": "baud rate",
    "cat": "Pro Audio Reference",
    "def": "(pronounced \u201cbawd\u201d; after Baudot Code named for the French telegrapher Emile Baudot, 1845-1903) The transmitted signaling speed, or keying rate of a modem. Often confused with bit rate. Bit rate and baud rate are NOT synonymous and shall not be interchanged in usage. For example, one baud equals one half dot cycle per second in Morse code, one bit per second in a train of binary signals, and one 3-bit value per second in a train of signals each of which can assume one of 8 different states, and so on \u2013 all brought to you by the magic of advanced coding techniques that allow more than one bit per baud. Preferred usage is bit rate, with baud used only when the details of a modem are specified.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bauer, Benjamin": {
    "term": "Bauer, Benjamin",
    "cat": "Pro Audio Reference",
    "def": "(1913-1979) Russian-American engineer who made powerful contributions to the development of many electroacoustic devices including microphones (see: Unidyne), phonograph pickups and tape recording heads. He worked for Shure from 1936 (as a co-op student) to 1957 (leaving as vice president), then CBS Laboratories as vice president.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Baxandall tone controls": {
    "term": "Baxandall tone controls",
    "cat": "Pro Audio Reference",
    "def": "The most common form of active bass and treble tone control circuit based upon British engineer P.J. Baxandall\u2019s paper \u201cNegative Feedback Tone Control \u2014 Independent Variation of Bass and Treble Without Switches,\u201d Wireless World, vol. 58, no. 10, October 1952, p. 402. The Baxandall design is distinguished by having very low harmonic distortion due to the use of negative feedback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bayan Musical Instrument": {
    "term": "bayan Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Russian accordian.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bayou Country Superfest": {
    "term": "Bayou Country Superfest",
    "cat": "Pro Audio Reference",
    "def": "The title says it all; held annually in Baton Rouge since 2010.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bazouki See": {
    "term": "bazouki See",
    "cat": "Pro Audio Reference",
    "def": "bouzouki.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BCC (binaural cue coding) Audio Compression": {
    "term": "BCC (binaural cue coding) Audio Compression",
    "cat": "Pro Audio Reference",
    "def": "An audio coding technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BCD 1": {
    "term": "BCD 1",
    "cat": "Pro Audio Reference",
    "def": "(binary-coded decimal) Pertains to a number system where each decimal digit is separately represented by a 4-bit binary code; for example, the decimal number 23 is represented as 0010 0011 (2 = 0010 and 3 = 0011, grouped together as shown), while in straight binary notation, 23 is represented as 10111. 2. (binary-coded digit) A digit of any number system that is represented as a fixed number of binary digits; from the previous example, the decimal digit 23 is represented as 10111.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beamforming": {
    "term": "beamforming",
    "cat": "Acoustics",
    "def": "A technique utilizing special microphone arrays combined with signal processing to determine where sound originates. Teleconferencing. For instance, see Rambo U.S. Patent 7,190,775 High quality audio conferencing with adaptive beamforming.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beam steering": {
    "term": "beam steering",
    "cat": "Loudspeakers",
    "def": "Common name for the technology that allows changing the directionality of a loudspeaker array by using separate DSP and power amplifiers for each driver in the array. This allows each driver to be delayed and equalized separately as necessary to manipulate the vertical coverage pattern. The whole beam can be moved upward, downward, and made broader or narrower as desired. Very clever; very expensive.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beat": {
    "term": "beat",
    "cat": "Physics",
    "def": "To cause a reference wave to combine with a second wave so that the frequency of the second wave can be studied through time variations in the amplitude of the combination. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beats": {
    "term": "beats",
    "cat": "Music",
    "def": "Periodic fluctuations that are heard when sounds of slightly different frequencies are superimposed. [Everest]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beatboxing Hip-Hop": {
    "term": "beatboxing Hip-Hop",
    "cat": "Pro Audio Reference",
    "def": "Using the mouth, throat and nasal cavity as a vocal percussion instrument to create hip hop drum sounds similar to record scratching.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beat frequency Equal to": {
    "term": "beat frequency Equal to",
    "cat": "Pro Audio Reference",
    "def": "the absolute value of the difference in frequency of two waves beating together (see \u201cbeat\u201d above).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Beat Generation": {
    "term": "Beat Generation",
    "cat": "Pro Audio Reference",
    "def": "The story goes like this \u2026",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beat matching": {
    "term": "beat matching",
    "cat": "Pro Audio Reference",
    "def": "or beat mixing Used by disc jockeys to match beats to produce a seamless segue, or transition, between songs, or by turntablists between segments of different songs being mixed together. See Disc Jockey 101 for mixing, and Beat Matching Tips for matching.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Beat me": {
    "term": "Beat me",
    "cat": "Pro Audio Reference",
    "def": "daddy, eight to the bar. Play some boogie-woogie for me. (The left-hand bass lines in typical boogie-woogie piano feature a driving, eight-to-the-bar rhythm.) [Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "beatnik Term": {
    "term": "beatnik Term",
    "cat": "Pro Audio Reference",
    "def": "created by famed San Francisco Chronicle columnist Herb Caen in 1958. He explained: \u201cthe word just popped out.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Beauchamp, George": {
    "term": "Beauchamp, George",
    "cat": "Pro Audio Reference",
    "def": "(1899-1941) American inventor and entrepreneur who is credited with inventing the first electric guitar, named the \u201cFrying Pan\u201d in 1931 and cofounding Rickenbacker Guitars.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bebop Modern jazz style": {
    "term": "bebop Modern jazz style",
    "cat": "Pro Audio Reference",
    "def": "developed by Charlie Parker, Dizzy Gillespie and others in the early 1940s. Dizzy put out a single called \u201cBebop\u201d in 1945 and also released \u201cHe Beeped When He Shoulda Bopped,\u201d in 1946. [Decharne] See bop.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Begun, Semi": {
    "term": "Begun, Semi",
    "cat": "Pro Audio Reference",
    "def": "Joseph (1905-1995) Born in German, he immigrated to the U.S. in 1935 and pioneered magnetic tape recording. He wrote the first book published on magnetic recording and invented many recording products including the first consumer tape recorder as well as developing the technology that gave birth to the Black Box flight data recorder. Subject of a fascinating book by Mark Clark.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bel Abbr": {
    "term": "bel Abbr",
    "cat": "Pro Audio Reference",
    "def": "b, B Ten decibels. [After Alexander Graham Bell.] The Bel was the amount a signal dropped in level over a one-mile distance of telephone wire. See decibel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Belchfire\u00ae Series": {
    "term": "Belchfire\u00ae Series",
    "cat": "Pro Audio Reference",
    "def": "Term coined by Crown International for their mythical power amplifier, the BF-6000SUX. Based on original research into the first principles of teramagnostriction quasar-quadrature, the BF-6000SUX could have changed the design of all future power amps, but it didn\u2019t. In spite of Crown\u2019s leap forward into the past of technical declination, the marketplace categorically stated that it did not want 6,000 watts per channel in only one rack space \u2013 in spite of its six-foot depth and 206 pounds weight. The only known use of a BF-6000SUX was to drive the experimental Electro-Voice Rearaxial Softspeaker, when Rane demoed their PI 14 Pseudoacoustic Infector using Jensen\u2019s JE-EP-ERs Multi-denomial Transpedance Informer for coupling \u2014 but many consider that only hearsay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bell, Alexander": {
    "term": "Bell, Alexander",
    "cat": "Pro Audio Reference",
    "def": "Graham (1847-1922) Scottish-born American inventor of the telephone. The first demonstration of electrical transmission of speech by his apparatus took place in 1876. Bell also invented the audiometer, an early hearing aid, and improved the phonograph. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bellest bottoms": {
    "term": "bellest bottoms",
    "cat": "Pro Audio Reference",
    "def": "A term coined by Steve King, editor and publisher of Today in Literature, in a note about Robert Heinlein that appeared in the July 7, 2010 issue. He says it is \u201cintended to suggest biggest/best bell-bottom jeans.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bell\u2019s Law": {
    "term": "Bell\u2019s Law",
    "cat": "Pro Audio Reference",
    "def": "of Telephony \u201cNo matter what technology is used, your monthly phone bill magically remains about the same size.\u201d [A Dictionary of the Near Future by Douglas Coupland, NY Times, September 12, 2010.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "belly fiddle Guitar": {
    "term": "belly fiddle Guitar",
    "cat": "Pro Audio Reference",
    "def": "[Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BEM (boundary element modeling)": {
    "term": "BEM (boundary element modeling)",
    "cat": "Acoustics",
    "def": "A mathematical modeling method using only a mesh of the surface of a wave, making computations easier and faster.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "benders or": {
    "term": "benders or",
    "cat": "Pro Audio Reference",
    "def": "bending See circuit-bending.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bending wave": {
    "term": "bending wave",
    "cat": "Pro Audio Reference",
    "def": "physics (also known as Distributed Mode Loudspeakers or DML) Loudspeakers. The latest trend in flat panel loudspeaker innovations based on the bending wave principal. Its simplest form consists of a small driver and a large thin panel. The driver coil excites the panel but due to the large flat surface, it does not move in and out but rather \u201cbends\u201d- that is, deforms in a bending wave. This wave travels throughout the panel provoking 360-degree radiation of sound in the process \u2014 very different from the way a conventional loudspeaker cone produces sound by \u201cpushing\u201d air. Careful and complex design of the rigidity of the thin flexible panel allows it to increase from the middle to the edges at an equal ratio. This allows one panel to control most of the audio range, thus eliminating multiple drivers and crossover networks. See Colloms for theory. Also see Peter Dick\u2019s bending wave converter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Benten or": {
    "term": "Benten or",
    "cat": "Pro Audio Reference",
    "def": "Ben Zai Ten Japanese Deity. Goddess of music. The name of one of the Seven Gods of Good Fortune, the goddess of music, art, happiness and love.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BeOS (Be operating system)": {
    "term": "BeOS (Be operating system)",
    "cat": "Pro Audio Reference",
    "def": "An operating system (OS) developed by Be Incorporated in 1996, called the first true \u201cmedia OS.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BER (bit": {
    "term": "BER (bit",
    "cat": "Pro Audio Reference",
    "def": "error ratio) (also called bit error rate) 1. The ratio of the number of erroneous bits divided by the total number of bits transmitted, received, or processed over some stipulated period. 2. The number of bits processed before an erroneous bit is found (e.g., 10E13), or the frequency of erroneous bits (e.g., 10E-13).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Berliner, Emil": {
    "term": "Berliner, Emil",
    "cat": "Pro Audio Reference",
    "def": "(1851-1929) German-born American inventor who made important contributions to telephone technology and developed the phonograph record disc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Berserktown": {
    "term": "Berserktown",
    "cat": "Pro Audio Reference",
    "def": "A music festival focused on lesser known bands, started in 2014 in Los Angeles.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bessel crossover": {
    "term": "Bessel crossover",
    "cat": "Pro Audio Reference",
    "def": "A type of crossover utilizing low-pass filter design characterized by having a linear phase response (or maximally flat phase response), but also a monotonically decreasing passband amplitude response (which means it starts rolling off at DC and continues throughout the passband). Linear phase response (e.g., a linear plot of phase shift vs. frequency produces a straight line) results in constant time-delay (all frequencies within the passband are delayed the same amount). Consequently the value of linear phase is it reproduces a near-perfect step response, i.e., there is no overshoot or ringing resulting from a sudden transition between signal levels. The drawback is a sluggish roll-off rate. For example, for the same circuit complexity a Butterworth response rolls off nearly three times as fast. This circuit is based upon Bessel polynomials; however, the filters whose network functions use these polynomials are correctly called Thompson filters [W.E. Thomson, \u201cDelay Networks Having Maximally Flat Frequency Characteristics,\u201d Proc. IEEE, part 3, vol. 96. Nov 1949, pp. 487-490]. The fact that we do not refer to these as Thompson crossovers demonstrates, once again, that we do not live in a fair world. See Ray Miller\u2019s Bessel Filter Crossover and Its Relation to Other Types.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "B-field See": {
    "term": "B-field See",
    "cat": "Pro Audio Reference",
    "def": "magnetic flux density.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "B-format See:": {
    "term": "B-format See:",
    "cat": "Pro Audio Reference",
    "def": "soundfield microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BGA (ball grid array)": {
    "term": "BGA (ball grid array)",
    "cat": "Electronics",
    "def": "A type of miniature package for integrated circuits containing hundreds of pins.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BGM See:": {
    "term": "BGM See:",
    "cat": "Pro Audio Reference",
    "def": "background music",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "biamp, biamplified,": {
    "term": "biamp, biamplified,",
    "cat": "Pro Audio Reference",
    "def": "or biamplification Term used to refer to a 2-way active crossover where the audio signal is split into two paths, and using separate power amplifier channels for each driver.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bias or biasing": {
    "term": "bias or biasing",
    "cat": "Electronics",
    "def": "Preset voltages or currents in an electronic circuit that determine the electrical operating points of certain devices.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BICSI\u00ae (Building": {
    "term": "BICSI\u00ae (Building",
    "cat": "Pro Audio Reference",
    "def": "Industry Consulting Services, International) A telecommunications association that is a worldwide resource for technical publications, training, conferences, and registration programs for low-voltage cabling distribution design and installation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bidirectional microphone": {
    "term": "bidirectional microphone",
    "cat": "Pro Audio Reference",
    "def": "See: microphone polar response.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bilabial Phonology": {
    "term": "bilabial Phonology",
    "cat": "Pro Audio Reference",
    "def": "Pronounced or articulated with both lips, as the consonants b, p, m, and w. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BIEM (Bureau": {
    "term": "BIEM (Bureau",
    "cat": "Pro Audio Reference",
    "def": "International des Soci\u00e9t\u00e9s G\u00e9rant les Droits d\u2019Enregistrement et de Reproduction M\u00e9canique) An international organization representing mechanical rights societies found in most countries. They license the reproduction of songs (including musical, literary and dramatic works). Their members are composers, authors and publishers and their clients are record companies and other users of recorded music. They also license the downloading of music via the Internet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bifilar windings": {
    "term": "bifilar windings",
    "cat": "Pro Audio Reference",
    "def": "A term most often associated (in the pro audio industry) with audio transformer design describing the winding technique of laying two wires side-by-side, providing essentially unity coupling, thus reducing leakage inductance to negligible amounts. Literally two threads from Latin bi- two, and filum thread.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Big Ears": {
    "term": "Big Ears",
    "cat": "Pro Audio Reference",
    "def": "Festival \u201cThe Big Ears Festival is a dynamic, interactive experience that explores connections between musicians and artists, crossing all musical genres while interfacing with film, performance and the visual arts.\u201d [from website] The festival is held yearly in Knoxville, TN.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Big Guava": {
    "term": "Big Guava",
    "cat": "Pro Audio Reference",
    "def": "Music festival held in Tampa Bay, FL featuring carnival rides as well as music on four stages, and lots of food trucks.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bigit Very": {
    "term": "bigit Very",
    "cat": "Pro Audio Reference",
    "def": "early contraction term for \u201cbinary digit,\u201d now obsolete. (Mentioned by Edmund C. Berkeley in his book The Computer Revolution, Doubleday, 1962, page 234.) See bit.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bilinear transform": {
    "term": "bilinear transform",
    "cat": "Pro Audio Reference",
    "def": "A mathematical method used in the transformation of a continuous time (analog) function into an equivalent discrete time (digital) function. Fundamentally important for the design of digital filters. A bilinear transform ensures that a stable analog filter results in a stable digital filter, and it exactly preserves the frequency-domain characteristics, albeit with frequency compression.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BIM (building information modeling)": {
    "term": "BIM (building information modeling)",
    "cat": "Pro Audio Reference",
    "def": "A term coined by Georgia Institute of Technology for a very complex method of using digital models for design and construction of buildings. It is finding use in pro audio acoustic modeling tools.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bimorph Piezoelectric": {
    "term": "bimorph Piezoelectric",
    "cat": "Microphones",
    "def": "A cantilever device having two active piezoelectric layers where an electrical field causes one layer to bend out and the other layer to bend in. Compare with: unimorph.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binary": {
    "term": "binary",
    "cat": "Pro Audio Reference",
    "def": "A condition in which there are two possible states; for example, the binary number system (base-2) using the digits 0 and 1. See the RaneNote Digital Dharma of Audio A/D Converters. For a delightful treat see: Binary Hand Dance by Vi Hart.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binary logarithm": {
    "term": "binary logarithm",
    "cat": "Pro Audio Reference",
    "def": "A logarithm based on the powers of 2 (aka base 2).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binaural cue": {
    "term": "binaural cue",
    "cat": "Pro Audio Reference",
    "def": "coding See BCC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binaural localization": {
    "term": "binaural localization",
    "cat": "Hearing",
    "def": "Locating a sound source using the different arrival times between the ears. See: interaural.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binaural recording": {
    "term": "binaural recording",
    "cat": "Pro Audio Reference",
    "def": "or binaural sound Believe it or not, the groundwork was laid in the 1920s (no kidding, and some claim even earlier) when the idea of placing two microphones in a dummy head was first introduced as a source of loudspeaker stereo (which wouldn\u2019t go anywhere until Blumlein\u2019s contributions). It was the Germans who first produced a standard artificial listener for evaluating auditorium acoustics, and then played back the results over headphones \u2014 the startling realism launched binaural recording. A binaural recording is made using two microphones placed in the ear canals of an anatomically accurate dummy head, such that all the normal spatial attributes of the human head are present (just as in real listening situations) when the recording is made. Designed to be played back through headphones, the results are nothing but astonishing. First time listeners to binaural recordings often swear someone is there with them, talking and walking around them, such is the realism accomplished.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binding post": {
    "term": "binding post",
    "cat": "Pro Audio Reference",
    "def": "See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "binky See": {
    "term": "binky See",
    "cat": "Pro Audio Reference",
    "def": "Larry Blake\u2019s Film Sound Glossary.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "biphase mark": {
    "term": "biphase mark",
    "cat": "Pro Audio Reference",
    "def": "code (BMC) See: differential Manchester encoding.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bi-phase modulation": {
    "term": "bi-phase modulation",
    "cat": "Pro Audio Reference",
    "def": "See: BPSK.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bipolar transistor Pertaining to": {
    "term": "bipolar transistor Pertaining to",
    "cat": "Pro Audio Reference",
    "def": "a semiconductor technology in which transistors are built from alternating layers of positively and negatively doped semiconductors material. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "birefringence": {
    "term": "birefringence",
    "cat": "Physics",
    "def": "The resolution or splitting of a light wave into two unequally reflected or transmitted waves by an optically anisotropic medium such as calcite or quartz. Also called double refraction. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bit Abbr": {
    "term": "bit Abbr",
    "cat": "Pro Audio Reference",
    "def": "b Abbreviation for binary unit or binary digit. 1. The smallest amount of digital information. A bit can store or represent only two states, 0 and 1. [The original term binary unit was coined by John Tukey of Bell Laboratories to represent the basic unit of information as defined by Shannon as a message representing one of two states.] 2. A little bit \u2014 from Old English bita, meaning a piece bitten off.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bit clock": {
    "term": "bit clock",
    "cat": "Pro Audio Reference",
    "def": "The synchronizing signal that indicates the rate of individual data bits over a digital audio interface.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bit error": {
    "term": "bit error",
    "cat": "Pro Audio Reference",
    "def": "rate or bit error ratio See BER.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bit rate": {
    "term": "bit rate",
    "cat": "Pro Audio Reference",
    "def": "The rate or frequency at which bits appear in a bit stream. Applied to digital audio, bit rate (kbits/sec/channel) equals the sampling rate (kHz) times the number of bits per sample. The data bit rate for a CD, for example, is 1.41M bits per second (44.1 kHz x 16 bits per sample x 2 channels). [The oft-quoted CD bit rate of 4.3218 MHz is for the raw bit rate which comes from multiplying 7,350 frames per second by 588, the number of channel bits.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bits \u2014": {
    "term": "bits \u2014",
    "cat": "Pro Audio Reference",
    "def": "data converter See data converter bits.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bit stream": {
    "term": "bit stream",
    "cat": "Pro Audio Reference",
    "def": "A binary signal without regard to grouping.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bit-mapped display": {
    "term": "bit-mapped display",
    "cat": "Pro Audio Reference",
    "def": "A display in which each pixel\u2018s color and intensity data are stored in a separate memory location.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bi-wire": {
    "term": "bi-wire",
    "cat": "Loudspeakers",
    "def": "A technique that uses two wires to connect between one power amplifier and one loudspeaker instead of the more conventional one-wire approach. Some high-end consumer loudspeakers provide two sets of terminals with a shorting bar that can be removed to allow bi-wiring. It is important to understand that this is NOT a biamped technique where an electronic crossover and two power amplifiers are used to drive the woofer and high-frequency drivers separately. Instead this is a typical loudspeaker with a built-in passive crossover network that separates the audio signal after it enters the cabinet into (at least) low and high frequency components driving the woofer and high-frequency driver(s). [A very popular technique among wire and cable manufacturers.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Black, Harold S": {
    "term": "Black, Harold S",
    "cat": "Pro Audio Reference",
    "def": "(1898-1983) American electrical engineer and innovator most noted for his invention of negative feedback (U.S. patent 2,102,671).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "black hole": {
    "term": "black hole",
    "cat": "Pro Audio Reference",
    "def": "music Name given by astronomers to detecting the deepest note ever generated in the cosmos, a B-flat 57 octaves below middle C.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Blackmer, David (1927-2002)": {
    "term": "Blackmer, David (1927-2002)",
    "cat": "Pro Audio Reference",
    "def": "American scientist, inventor and businessman best known for founding dbx, Inc. and pioneering audio-grade VCAs for signal processing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "black noise": {
    "term": "black noise",
    "cat": "Pro Audio Reference",
    "def": "See noise color.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "black stick Clarinet": {
    "term": "black stick Clarinet",
    "cat": "Pro Audio Reference",
    "def": "[Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blame shifter Shifts": {
    "term": "blame shifter Shifts",
    "cat": "Pro Audio Reference",
    "def": "the pitch of mistakes down one octave so the audience thinks it was the bass player. [Thanks to DD at Sound Path Labs.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blooming Measurement": {
    "term": "blooming Measurement",
    "cat": "Pro Audio Reference",
    "def": "An increase in the blip size on the display as a result of an increase in signal intensity or duration. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bluegrass": {
    "term": "bluegrass",
    "cat": "Music",
    "def": "A type of folk music that originated in the southern United States, typically played on banjos and guitars and characterized by rapid tempos and jazz-like improvisation. [AHD] [\u201cWilliam Smith Monroe (known as Bill) was born near Rosine, Kentucky. His style of music, which we call bluegrass today, probably got its name from the name of his band, the Blue Grass Boys, which was in turn named after his home state of Kentucky, the Bluegrass State.\u201d Visual Thesaurus\u00ae.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bluegrass Island": {
    "term": "Bluegrass Island",
    "cat": "Pro Audio Reference",
    "def": "Festival (aka Outer Banks Bluegrass Island Festival) Bluegrass festival held yearly on an island off the coast of North Carolina, usually in September.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blue moon For half": {
    "term": "blue moon For half",
    "cat": "Pro Audio Reference",
    "def": "a century, it\u2019s been known as the second full moon in the same calendar month; however, recently this definition was corrected by the editors of Sky & Telescope magazine. The correct definition, they say, is that a blue moon occurs when a season has four full moons, rather than the usual three. Further, they claim the misunderstanding is their fault based on an article they published in 1946. For all the wonderful details, see Once In A Blue Moon.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blue noise": {
    "term": "blue noise",
    "cat": "Pro Audio Reference",
    "def": "See noise color.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blue note": {
    "term": "blue note",
    "cat": "Music",
    "def": "A flatted note, especially the third or seventh note of a scale, in place of an expected major interval. [From its use in blues music.] [AHD] Compare with brown note.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bluetooth": {
    "term": "Bluetooth",
    "cat": "Pro Audio Reference",
    "def": "The code name given a wireless network protocol, after a 10th century Danish king, Harald Bluetooth, who unified Denmark. The code name was adopted in April, 1998, when Intel and Microsoft formed a consortium between themselves IBM, Toshiba, Nokia, Ericsson and Puma Technology. This protocol promised to bring wireless Internet to the masses, making the Web as ubiquitous as radio and TV. The Bluetooth SIG (special interest group), now numbering over 2000 companies, sees a world where equipment from different manufacturers works seamlessly together using Bluetooth as a sort of virtual cable. Check out the website to read the whole history of Harald Bluetooth and get all the details. Heavily challenged by Wi-Fi, which appears to have already accomplished what Bluetooth is promising. Compare with ZigBee.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blue whales": {
    "term": "blue whales",
    "cat": "Pro Audio Reference",
    "def": "See SPL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Blumlein, Alan": {
    "term": "Blumlein, Alan",
    "cat": "Pro Audio Reference",
    "def": "Dower (1903-1942) English engineer who in a short working life span of 15 years wrote or cowrote 128 patents, developed stereophonic sound, designed new uses for microphones, designed a lateral disc-cutting system making modern records possible, developed much of the 405-line high definition television system broadcast in Britain until 1986, and improved radar systems such that they still operated 40 years later. Indeed, a genius by any definition, yet his story had to wait until 1999 to be told completely. Thanks to Robert Charles Alexander, former editor of AudioMedia magazine, a definitive biography now exists. A website of interest is by the BBC and tells the story of how Blumlein\u2019s unique recordings have been cleaned up. Go here: Early Stereo Recordings Restored.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Blu-ray Disc": {
    "term": "Blu-ray Disc",
    "cat": "Pro Audio Reference",
    "def": "A trademark of Sony for their optical disc video recording format developed for recording, rewriting and playback of HDTV, and is predicted to find its way into audio recording use.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "blurb Surprisingly": {
    "term": "blurb Surprisingly",
    "cat": "Pro Audio Reference",
    "def": "old term first used by American humorist Gelett Burgess in 1907. Hit the link for the whole story.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BMC See:": {
    "term": "BMC See:",
    "cat": "Pro Audio Reference",
    "def": "biphase mark code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BNC (bayonet Neill-Concelman)": {
    "term": "BNC (bayonet Neill-Concelman)",
    "cat": "Pro Audio Reference",
    "def": "A miniature bayonet locking connector for coaxial cable. It was developed in the late \u201940s by a collaboration of Paul Neill and Carl Concelman based on a patent granted to the late Dr. Octavio M. Salati. In 1942, while at Bell Labs, Paul Neill developed what became known as the type N connector, named after him, which became a U.S. Navy standard. Carl Concelman, while at Amphenol, developed a bayonet version of the N connector, which became known as the type C connector, after him (the first true 50-ohm connector). Then, together, they developed a miniature bayonet locking version of the C connector and it was named the type BNC connector, after both of them. There is even an improved threaded version called the threaded Neill-Concelman or TNC connector. [Thanks to all who wrote me to help clarify this correct meaning. My condolences to all, who with passion, conviction, and great creativity, truly believe differently. It is a sad but true tale that BNC does NOT stand for \u201cbaby N connector,\u201d or \u201cbayonet connector,\u201d or \u201cbayonet Naval connector,\u201d or \u201cBritish Naval Connector\u201d (sorry Microsoft). For further verification search the web for info on Paul Neill and Carl Concelman.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bode, Hendrick": {
    "term": "Bode, Hendrick",
    "cat": "Pro Audio Reference",
    "def": "Wade (1905-1982) American engineer who pioneered modern Control theory and Electronic Telecommunications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bode plot": {
    "term": "Bode plot",
    "cat": "Pro Audio Reference",
    "def": "or Bode diagram A method developed by Hendrick Wade Bode to represent the gain and phase of a system as a function of frequency. Usually seen as a plot of log-gain and phase-angle values on a log-frequency scale. See Bode plots and contrast with Nyquist diagrams.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bodhran Musical Instrument": {
    "term": "bodhran Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A hand-held goatskin drum used in traditional Irish music and often played with a stick. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bo": {
    "term": "Bo",
    "cat": "Terminology",
    "def": "Diddley (1928-2008) Stage name for the American rock legend. Born Otha Ellas Bates, his name was changed to Ellas B. McDaniel by his mother\u2019s first cousin, Gussie McDaniel, who raised him. In 1954, band member Billy Boy Arnold, a leading American blues harmonica player, came up with Bo Diddley as a stage name for McDaniel. He described it as a \u201cbowlegged guy, a comical looking guy.\u201d Although another possibility is that there is a one-string guitar \u2014 native to the Mississippi Delta where McDaniel was born, called a Diddley Bow, but it is said that Bo Diddley had never played one. [Thanks PT!]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bogen, David": {
    "term": "Bogen, David",
    "cat": "Pro Audio Reference",
    "def": "(1889-1974) American Russian immigrant who helped pioneer the hi-fi audio industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BOM (bill of materials)": {
    "term": "BOM (bill of materials)",
    "cat": "Pro Audio Reference",
    "def": "A report showing the material costs of a single unit of product; listing of all unit components with part numbers, quantities, and supplier prices. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bonded magnet": {
    "term": "bonded magnet",
    "cat": "Pro Audio Reference",
    "def": "motors Generic name for a new class of ironless electric motors that do not use iron or ferrite permanent magnets in their construction. Instead they use anisotropic NdFeB (neodymium-iron-boran) bonded magnets (aka neodymium magnets). Of interest to pro audio users since experimental loudspeakers based on bonded magnets are being researched as not only lighter and more eco-friendly but produce audio with lower distortion. See for instance: \u201cIronless Motor Loudspeaker: Quantization of the Subjective Enhanced Sound Quality\u201d by Ceruti, Daniele; Guyader, Gael; Lemarquand, Guy; Remy, Mathias; Six, Marc-Fran\u00e7ois; Toppi, Romolo, presented at the129th AES Convention, San Francisco, November 4-7, 2010, preprint 8192.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bone conduction": {
    "term": "bone conduction",
    "cat": "Hearing",
    "def": "The transmission of sound to the internal ear via mechanical vibration of the cranial bones and soft tissues. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Boner, C.P": {
    "term": "Boner, C.P",
    "cat": "Pro Audio Reference",
    "def": "(1900-1979) American physicist specializing in acoustics, considered the father of room equalization (U.S. patent 3,457,370).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bongo Musical Instrument": {
    "term": "bongo Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "One of a pair of connected tuned drums that are played by beating with the hands. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bonnaroo Yearly": {
    "term": "Bonnaroo Yearly",
    "cat": "Pro Audio Reference",
    "def": "music festival held at an 700-acre farm in Manchester, TN.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boogaloo Nickname": {
    "term": "boogaloo Nickname",
    "cat": "Pro Audio Reference",
    "def": "given to Abie \u201cBoogaloo\u201d Ames (1921-2002) in the 1940s for his boogie-woogie (see below) piano style.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boogie 1": {
    "term": "boogie 1",
    "cat": "Pro Audio Reference",
    "def": "To dance to rock music. 2. a. To get going; leave: We\u2019re late; let\u2019s boogie. b. To move quickly: boogied down the road in their car. n. 1. Strongly rhythmic rock music. 2. Boogie-woogie. [From boogie-woogie below.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boogie-woogie": {
    "term": "boogie-woogie",
    "cat": "Pro Audio Reference",
    "def": "A style of blues piano playing characterized by an up-tempo rhythm, a repeated melodic pattern in the bass, and a series of improvised variations in the treble. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bookkeeper \u201cThe": {
    "term": "bookkeeper \u201cThe",
    "cat": "Pro Audio Reference",
    "def": "only English word with three consecutive repeated letters (not including other forms of that word such as bookkeeping.\u201d [Oxford Dictionaries.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Boole, George": {
    "term": "Boole, George",
    "cat": "Pro Audio Reference",
    "def": "(1815-1864) British mathematician who devised a new form of algebra that represented logical expressions in a mathematical form now known as Boolean Algebra. [See Maxfield]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Boolean Algebra": {
    "term": "Boolean Algebra",
    "cat": "Pro Audio Reference",
    "def": "An algebra in which elements have one of two values and the algebraic operations defined on the set are logical OR, a type of addition, and logical AND, a type of multiplication. [AHD] (After George Boole.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boom": {
    "term": "boom",
    "cat": "Microphones",
    "def": "A long movable arm used to maneuver and support a microphone. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boom box": {
    "term": "boom box",
    "cat": "Pro Audio Reference",
    "def": "A portable audio system, usually consisting of a radio and a cassette or CD player, with speakers capable of producing loud sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boost converter Switchmode": {
    "term": "boost converter Switchmode",
    "cat": "Electronics",
    "def": "A type of step-up voltage converter, used in DC-DC conversion, favored by designers for its low cost and simplicity. Contrast with buck converter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boost/cut equalizer": {
    "term": "boost/cut equalizer",
    "cat": "Pro Audio Reference",
    "def": "The most common graphic equalizer. Available with 10 to 31 bands, on 1-octave to 1/3-octave spacing. The flat (0 dB) position locates all sliders at the center of the front panel. Comprised of bandpass filters, all controls start at their center 0 dB position and boost (amplify or make larger) signals by raising the sliders, or cut (attenuate or make smaller) the signal by lowering the sliders on a band-by-band basis. Commonly provide a center-detent feature identifying the 0 dB position. Proponents of boosting in permanent sound systems argue that cut-only use requires adding make-up gain that runs the same risk of reducing system headroom as boosting.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boot Computer Science": {
    "term": "boot Computer Science",
    "cat": "Pro Audio Reference",
    "def": "The process of starting or restarting a computer. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boot loader Computer Science": {
    "term": "boot loader Computer Science",
    "cat": "Pro Audio Reference",
    "def": "A small program that starts (loads) other data and programs into RAM where they are executed.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bop 1": {
    "term": "bop 1",
    "cat": "Pro Audio Reference",
    "def": "A post-World War II style of jazz characterized by rhythmic and harmonic complexity, improvised solo performances, and a brilliant style of execution. [AHD] The word \u201cbebop\u201d was shortened to \u201cbob\u201d with Charlie Parker\u2019s 1947 recording \u201cBongo Bop.\u201d [Decharne] 2. \u201cPlaying bop is like playing Scrabble with all the vowels missing.\u201d Duke Ellington, Look August 10, 1954. [Crystal]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bose, Amar": {
    "term": "Bose, Amar",
    "cat": "Pro Audio Reference",
    "def": "(1929-2013) American engineer, academic professor and entrepreneur, who founded Bose Corporation in 1964.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Boston Calling": {
    "term": "Boston Calling",
    "cat": "Pro Audio Reference",
    "def": "Festival Music festival featuring new and established acts held in\u2014wait for it\u2014yeah, Boston, MA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Botanicus Interacticus": {
    "term": "Botanicus Interacticus",
    "cat": "Pro Audio Reference",
    "def": "A touch-control technology named Touch\u00e9, invented by Disney scientists at Carnegie Mellon that can be used to play a houseplant like a musical instrument. Hit the link to watch the amazing video.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BottleRock": {
    "term": "BottleRock",
    "cat": "Pro Audio Reference",
    "def": "A festival combining wine, music and food held in Napa, California.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Boucherot, Paul": {
    "term": "Boucherot, Paul",
    "cat": "Pro Audio Reference",
    "def": "(1869-1943) French engineer who studied the phenomena of electric conduction, introducing the concept of reactive power and inventing the synchronous electric motor in 1898. He also studied the thermal energy of the seas. The Claude-Boucherot Process described a scheme to power a turbo-alternator using warm seawater from tropical oceans to produce steam in a vacuum chamber. Theorem of Boucherot: In an AC electrical network, the total active power is the sum of the individual active powers, the total reactive power is the sum of the individual reactive powers, but the total apparent power is NOT equal to the sum of the individual apparent powers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Boucherot cell": {
    "term": "Boucherot cell",
    "cat": "Pro Audio Reference",
    "def": "After Paul Boucherot above; see Zobel network.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "boundary microphone": {
    "term": "boundary microphone",
    "cat": "Pro Audio Reference",
    "def": "See PZM",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bouzouki (also bazouki) Musical Instrument": {
    "term": "bouzouki (also bazouki) Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Greek stringed instrument having a long fretted neck and usually pear-shaped body. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bowditch curve": {
    "term": "Bowditch curve",
    "cat": "Pro Audio Reference",
    "def": "See Lissajous figure.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bozak, Rudy": {
    "term": "Bozak, Rudy",
    "cat": "Pro Audio Reference",
    "def": "See Bozak.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BPL (broadband": {
    "term": "BPL (broadband",
    "cat": "Pro Audio Reference",
    "def": "over power lines) General term for any of the \u201ccarrier-current\u201d systems that conduct signals over existing electrical wiring or power lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BPM (beats per minute)": {
    "term": "BPM (beats per minute)",
    "cat": "Music",
    "def": "A measure of music tempo. See beat matching.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BPM Exposition": {
    "term": "BPM Exposition",
    "cat": "Pro Audio Reference",
    "def": "European expo focusing on DJing, club culture & electronic music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bps (always": {
    "term": "Bps (always",
    "cat": "Pro Audio Reference",
    "def": "uppercase B) Abbreviation for bytes per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bps (always": {
    "term": "bps (always",
    "cat": "Pro Audio Reference",
    "def": "lowercase b) Abbreviation for bits per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BPSK (binary": {
    "term": "BPSK (binary",
    "cat": "Pro Audio Reference",
    "def": "phase-shift keying) (aka bi-phase modulation) A specific form of PSK that defines two states of carrier phase that are digitally encoded in a binary stream. The states have a change in phase of 180 degrees that correspond to the 0 and 1 binary state. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Braille, Louis": {
    "term": "Braille, Louis",
    "cat": "Pro Audio Reference",
    "def": "(1809-1852) French musician, educator, and inventor of a writing and printing system for blind or visually impaired people (1829). He lost his sight at the age of three. [AHD] His braille system was first developed for blind musicians.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bray 1": {
    "term": "bray 1",
    "cat": "Pro Audio Reference",
    "def": "To utter the loud, harsh cry of a donkey. 2. To sound loudly and harshly: The foghorn brayed all night. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "breathing Dynamics Processors": {
    "term": "breathing Dynamics Processors",
    "cat": "Pro Audio Reference",
    "def": "The audible effect caused by varying noise (or hiss) levels down around the noise floor usually caused by turning on and off gates and expanders. [Izhaki] Technically it is a modulation of the noise floor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "breve": {
    "term": "breve",
    "cat": "Music",
    "def": "A note equivalent to two whole notes. Also: 1. A symbol ( ? ) placed over a vowel to show that it has a short sound, as the a in bat. 2. A curved mark used to indicate a short or unstressed syllable of verse. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "brewer See": {
    "term": "brewer See",
    "cat": "Pro Audio Reference",
    "def": "zymurgy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "brickwall filter Electronic": {
    "term": "brickwall filter Electronic",
    "cat": "Filters",
    "def": "A low-pass, high-pass or bandpass filter exhibiting extremely steep rolloff rates of greater than 50 dB/octave such that the response resembles a \u201cbrick wall.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bridge 1": {
    "term": "bridge 1",
    "cat": "Pro Audio Reference",
    "def": "In communications networks a bridge is a device that connects two or more different networks and forwards packets between them; specifically a device that (a) links or routes signals from one ring or bus to another, or from one network to another, (b) may extend the distance and capacity of a single LAN system, (c) performs no modification to packets or messages, (d) operates at the data-link layer of the OSI\u2014Reference Model (Layer 2), (e) reads packets, and (f) passes only those with addresses on the same segment of the network as the originating user. 2. A functional unit that interconnects two local area networks that use the same logical link control (LLC) procedure, but may use different medium access control (MAC) procedures. 3. A balanced electrical network, e.g., a Wheatstone bridge. Contrast with hub.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bridged amplifier": {
    "term": "bridged amplifier",
    "cat": "Pro Audio Reference",
    "def": "See BTL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bridge rectifier": {
    "term": "bridge rectifier",
    "cat": "Electronics",
    "def": "The arrangement of four diodes to achieve full-wave rectification; used to convert AC voltage to DC voltage.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bridge-tied load": {
    "term": "bridge-tied load",
    "cat": "Pro Audio Reference",
    "def": "See BTL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "briole": {
    "term": "briole",
    "cat": "Theater",
    "def": "Name for the adjustable wire ropes used for theater rigging, e.g., loudspeakers, lighting, scenery, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BRIT (British": {
    "term": "BRIT (British",
    "cat": "Pro Audio Reference",
    "def": "Record Industry Trust) Home of the Brit Awards; Britain\u2019s Grammy equivalent.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "British Summer": {
    "term": "British Summer",
    "cat": "Pro Audio Reference",
    "def": "Time See: BST.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "broadband": {
    "term": "broadband",
    "cat": "Pro Audio Reference",
    "def": "Also wideband, a transmission medium having a bandwidth greater than a traditional telephone (speech) channel (4 kHz). [Some argue that to be \u201cbroadband\u201d the medium must support 20 kHz.] The most common broadband medium is coaxial cable carrying multiple audio, video and data channels simultaneously. Each channel takes up a different frequency on the cable. There will be guardbands, or empty spaces, between the channels to make sure each channel does not interfere with its neighbor. The most common example is the CATV cable. Contrast with baseband.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "broadcasting Networks": {
    "term": "broadcasting Networks",
    "cat": "Pro Audio Reference",
    "def": "A message sent out available for anyone to receive (just like radio broadcast), i.e., sending the same message to multiple recipients, as opposed to multicasting. Broadcasting sends a message to everyone on the network; multicasting sends a message to a specified few.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "broadcasting signal": {
    "term": "broadcasting signal",
    "cat": "Pro Audio Reference",
    "def": "processing See: Robert Orban\u2019s A Short History of Transmission Audio Processing and Transmission Audio Processing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "brown noise": {
    "term": "brown noise",
    "cat": "Pro Audio Reference",
    "def": "See noise color.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "brown note": {
    "term": "brown note",
    "cat": "Music",
    "def": "An urban myth that there existed a low frequency note that when played at high levels would make listeners loose bowel control. Exposed as false by Meyer Sound in a TV Myth Busters episode. Compare with blue note.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Brubeck, Dave": {
    "term": "Brubeck, Dave",
    "cat": "Pro Audio Reference",
    "def": "(1920-2012) American jazz giant, designated a \u201cLiving Legend\u201d by The Library of Congress.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Brunswick Panatrope": {
    "term": "Brunswick Panatrope",
    "cat": "Pro Audio Reference",
    "def": "See: Panatrope.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "B&S gauge": {
    "term": "B&S gauge",
    "cat": "Pro Audio Reference",
    "def": "(Brown & Sharpe) See AWG.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BSI (British Standards Institute)": {
    "term": "BSI (British Standards Institute)",
    "cat": "Pro Audio Reference",
    "def": "The National Standards organization responsible for coordinating standards preparation for sound equipment in the UK.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BST (British": {
    "term": "BST (British",
    "cat": "Pro Audio Reference",
    "def": "Summer Time) Music festival held yearly in Hyde Park, London.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "B-taper See": {
    "term": "B-taper See",
    "cat": "Pro Audio Reference",
    "def": "potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BTL (bridge-tied load) Amplifiers": {
    "term": "BTL (bridge-tied load) Amplifiers",
    "cat": "Pro Audio Reference",
    "def": "An amplifier configuration where the loudspeaker load is connected between the two hot outputs of two amplifiers operating in bridged amplifier mode, i.e., anti-phase, where the output of one amplifier drives the the second amplifier out of phase, or inverted, and operates at unity gain. Thus the second amplifier (usually the second channel of a two channel design) acts as a current amplifier (with inverting voltage). This doubles the output voltage (one-half from the first amplifier and one-half from the second amplifier) and theoretically produces four times the power output (double the voltage equals double the current equals four times the power). However this virtually never happens in practice since the amplifier power supply runs out of current long before four times the power is reached. Typically, amplifiers operating in bridged amplifier mode deliver twice their single-ended output power. Semiconductor audio power amplifiers use BTL configurations as a way to maximize power output from the small voltage sources found in internet appliances and automotive applications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "BTU (British thermal unit) 1": {
    "term": "BTU (British thermal unit) 1",
    "cat": "Pro Audio Reference",
    "def": "The quantity of heat required to raise the temperature of one pound of water from 60\u00b0 to 61\u00b0F at a constant pressure of one atmosphere. 2. The quantity of heat equal to 1/180 of the heat required to raise the temperature of one pound of water from 32\u00b0 to 212\u00b0F at a constant pressure of one atmosphere. [AHD] The Btu is equivalent to 0.252 kilogram-calorie or 1055 joules. And 1 watt equals 3.41 BTUs/hour.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "buck Money": {
    "term": "buck Money",
    "cat": "Pro Audio Reference",
    "def": "The nickname for a U.S. dollar. [Short for buckskin (from its use in trade). Poker. A player\u2019s passing the marker, or buck, to the next player when not wanting to deal). [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "buck converter Switchmode": {
    "term": "buck converter Switchmode",
    "cat": "Electronics",
    "def": "A type of step-down voltage converter, used in DC-DC conversion, favored by designers for its low cost and simplicity. Contrast with boost converter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "buckslip (also buck slip) Publishing": {
    "term": "buckslip (also buck slip) Publishing",
    "cat": "Pro Audio Reference",
    "def": "A small dollar-bill size (i.e., a buck) printed insert blown into magazines during the binding stage. Common in the direct mail world. Office memo. A routing slip used especially in military offices to indicate the persons to whom the attached material is to go and usually the kind of action to be taken with such material. [Merriam-Webster]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Buddha Bar": {
    "term": "Buddha Bar",
    "cat": "Pro Audio Reference",
    "def": "A restaurant/club franchise begun in 1995 by Raymond Visan with his first location in Paris.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "buds See:": {
    "term": "buds See:",
    "cat": "Pro Audio Reference",
    "def": "personal monitors",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "buffer In data transmission,": {
    "term": "buffer In data transmission,",
    "cat": "Pro Audio Reference",
    "def": "a temporary storage location for information being sent or received.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "buffer amplifier": {
    "term": "buffer amplifier",
    "cat": "Pro Audio Reference",
    "def": "The IEEE dictionary defines buffer amplifier as \u201cAn amplifier in which the reaction of output-load-impedance variation on the input circuit is reduced to a minimum for isolation purposes.\u201d (Vacuum tube cathode followers and solid-state emitter followers are two examples.) This is a bit confusing, but one thing is clear, it says that at the most fundamental level a buffer amplifier isolates (buffers) the loading effects (impedance) of two stages. It separates them, making them independent. In analog designs, buffer amplifiers are used for just this purpose. If the next circuit stage in a design has impedance characteristics that are detrimental to the preceding stage then a buffer amplifier minimizes this interaction. And its use is not confined to analog design, digital circuits use buffers to minimize similar loading effects.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "The term": {
    "term": "The term",
    "cat": "Pro Audio Reference",
    "def": "\u201camplifier\u201d comes about from the fact that most buffer amplifiers also provide either voltage or current gain. In this sense, a normal audio power amplifier can be called a buffer amplifier \u2013 it buffers your preamp from your very low impedance loudspeakers. [Historical Note: Sometimes a buffer amplifier provides speed as well as isolation. In the mid \u201970s, National Semiconductor offered in their specialty hybrid circuits line, a product simply named \u201cFast Buffer,\u201d whose purpose was to provide impedance isolation, but could do so at high megawiggle speeds (not a trivial task back then), and if that wasn\u2019t good enough, they also offered a \u201cDamn Fast Buffer,\u201d that could really get the job done (true story).] As can be seen, the term buffer amplifier is a bit vague: it provides isolation, that much is sure, however, it may also offer voltage gain, current gain, or both. And it may even provide an unbalanced-to-balanced function, or vice-versa.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "bug": {
    "term": "bug",
    "cat": "Pro Audio Reference",
    "def": "A surprisingly old word used most often to connote a problem with a program or computer. From the 1896 edition of Hawkin\u2019s New Catechism of Electricity (Theo. Audel & Co.) comes this definition: \u201cThe term `bug\u2019 is used to a limited extent to designate any fault or trouble in the connections or working of electric apparatus.\u201d To get rid of see Agans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Buku Music+Art Project": {
    "term": "Buku Music+Art Project",
    "cat": "Pro Audio Reference",
    "def": "A music and art festival held springtime in New Orleans. \u201cBuku\u201d is slang for the French word \u201cbeaucoup.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "Bulwer-Lytton Fiction Contest": {
    "term": "Bulwer-Lytton Fiction Contest",
    "cat": "Pro Audio Reference",
    "def": "A whimsical literary competition that challenges entrants to compose the opening sentence to the worst of all possible novels. Created by Professor Scott Rice, English Department, at San Jose State University in 1982, the contest is still sponsored by the college. The name comes from Edward George Earle Bulwer-Lytton, who wrote the famous line \u201cIt was a dark and stormy night \u2026\u201d as the opening words in his novel Paul Clifford (1830). Check it out \u2014 great fun.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "When Wilkie": {
    "term": "When Wilkie",
    "cat": "Pro Audio Reference",
    "def": "Collins\u2019s detective novel The Woman in White appeared in 1860, it created a considerable stir. A feature much remarked upon was the villain, Count Fosco. One lady reader, however, was not so impressed and wrote to tell Collins, \u201cYou really do not know a villain. Your Count Fosco is a very poor one.\u201d She then offered to supply Collins with a villain next time he wanted one. \u201cDon\u2019t think that I am <truncated 401140 bytes>",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (B)"
  },
  "E": {
    "term": "E",
    "cat": "Terminology",
    "def": "Archaic symbol for voltage (stands for electromotive force, since it is measured in volts) but the official SI symbol is V, although E is still seen in many equations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "e": {
    "term": "e",
    "cat": "Mathematics",
    "def": "The base of the natural system of logarithms, having a numerical value of approximately 2.71828. [AHD] See Maor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EAD (equivalent acoustic distance)": {
    "term": "EAD (equivalent acoustic distance)",
    "cat": "Sound Reinforcement",
    "def": "In a live situation without sound reinforcement there is a speaker, or other source, and a listener separated by a straight line distance. Introducing sound reinforcement acts to make the speaker louder thus effectively shorting the distance to the listener. This is called the equivalent acoustic distance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EAE (electronic": {
    "term": "EAE (electronic",
    "cat": "Pro Audio Reference",
    "def": "acoustic enhancement) (seen shortened to acoustic enhancement and called electronic architecture) Any of several systems that make use of adding sound energy to a listening space rather than using sound absorbers to improve the quality. For examples see: LARES, VRAS, SIAP, and Carmen\u00ae.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ear": {
    "term": "ear",
    "cat": "Anatomy",
    "def": "The vertebrate organ of hearing, responsible for maintaining equilibrium as well as sensing sound and divided in mammals into the external ear, the middle ear, and the inner ear. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ear buds": {
    "term": "ear buds",
    "cat": "Pro Audio Reference",
    "def": "See: personal monitors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eargle, John": {
    "term": "Eargle, John",
    "cat": "Pro Audio Reference",
    "def": "Morgan (1931-2007) American audio engineer, musician, author, educator, recording engineer and Grammy winner.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "early decay": {
    "term": "early decay",
    "cat": "Pro Audio Reference",
    "def": "time (EDT) Time (in seconds) that it takes for a signal to decay from 0 to -10 dB relative to its steady state value.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Early, James": {
    "term": "Early, James",
    "cat": "Pro Audio Reference",
    "def": "(1922-2004) American scientist and engineer who pioneered bipolar transistors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "early reflections": {
    "term": "early reflections",
    "cat": "Acoustics",
    "def": "The first sound that arrives at a listener is called the direct sound; the next to arrive is the first reflected sound waves, which take a little longer to reach the listener due to traveling a slightly longer path length. The first several reflected sound waves to reach the listener after the direct sound are called early reflections.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ears See:": {
    "term": "ears See:",
    "cat": "Pro Audio Reference",
    "def": "personal monitors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "earth": {
    "term": "earth",
    "cat": "Electronics",
    "def": "Alternate term meaning ground; chiefly British.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Earth\u2019s Cries": {
    "term": "Earth\u2019s Cries",
    "cat": "Pro Audio Reference",
    "def": "A dreadful sound created high above the planet related to the Northern Lights. Hit the link to learn more and hear for yourself.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Earth\u2019s hum": {
    "term": "Earth\u2019s hum",
    "cat": "Pro Audio Reference",
    "def": "A mysterious infrasonic sound that reverberates through the Earth. A new theory has emerged from researchers at the National Center for Scientific Research in Brest, France, who believe it is due to ocean waves that cause our planet to vibrate subtly, or ring. Read all about it here. An abstract of the published paper is found here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "earthshine": {
    "term": "earthshine",
    "cat": "Pro Audio Reference",
    "def": "The sunlight reflected from the Earth to the moon and back again. Leonardo da Vinci was the first person to figure out that when the Earth reflects enough light, we can see the entire moon, not just the crescent.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Earth surface loudspeaker Hit": {
    "term": "Earth surface loudspeaker Hit",
    "cat": "Pro Audio Reference",
    "def": "the link to read this fascinating article found at redOrbit.com.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EASE (Enhanced": {
    "term": "EASE (Enhanced",
    "cat": "Pro Audio Reference",
    "def": "Acoustic Simulator for Engineers) A computer modeling tool distributed by Renkus-Heinz for ADA (Acoustic Design Ahnert), who developed the software and introduced it in 1990 at the 88th AES Convention in Montreux.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eaux Claires": {
    "term": "Eaux Claires",
    "cat": "Pro Audio Reference",
    "def": "Music & Arts Festival Statement from organizer Justin Vernon: \u201cWe at Eaux Claires have been driven by the idea that our festival would encourage music-genre-walls to melt away. That the barriers between the stage and the audience altered, and expression and experience put above all. We have put so much thought into who should collaborate at this festival, from musicians to actors, filmmakers to visual artists. We will all share and revel in this collision of artistic force while performing in the arms of our own Chippewa River Valley.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EBow (energy": {
    "term": "EBow (energy",
    "cat": "Pro Audio Reference",
    "def": "bow or electronic bow) Musical Instruments. An electric guitar accessory that allows the player to create very eerie sounds. It works by creating a magnetic field near the guitar\u2019s pick-ups that causes feedback rich in harmonics and sounds somewhat like a bow on the strings.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EBU (European Broadcasting Union)": {
    "term": "EBU (European Broadcasting Union)",
    "cat": "Pro Audio Reference",
    "def": "An international professional society that, among other things, helps establish audio standards.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "echo 1": {
    "term": "echo 1",
    "cat": "Pro Audio Reference",
    "def": "Acoustics A discrete sound reflection arriving at least 50 milliseconds after the direct sound, and significantly louder than the background reverberant sound field. Contrast with reverberation. 2. Psychoacoustics A perceptually distinct copy of the original sound; a delayed duplicate. A single echo may be the result of multiple surface reflections. [Blesser]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "echo canceller": {
    "term": "echo canceller",
    "cat": "Pro Audio Reference",
    "def": "See: AEC",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "echoic Of or resembling": {
    "term": "echoic Of or resembling",
    "cat": "Pro Audio Reference",
    "def": "an echo [AHD].",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "echolocation (also called echo ranging) 1": {
    "term": "echolocation (also called echo ranging) 1",
    "cat": "Pro Audio Reference",
    "def": "A sensory system in certain animals, such as bats and dolphins, in which usually high-pitched sounds are emitted and their echoes interpreted to determine the direction and distance of objects. 2. Electronics A process for determining the location of objects by emitting sound waves and analyzing the waves reflected back to the sender by the object. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "echo ranging": {
    "term": "echo ranging",
    "cat": "Pro Audio Reference",
    "def": "See: echolocation above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ECM (electret": {
    "term": "ECM (electret",
    "cat": "Pro Audio Reference",
    "def": "condenser microphone) See: electret microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ECS (Engineered": {
    "term": "ECS (Engineered",
    "cat": "Pro Audio Reference",
    "def": "Conference Systems) Rane Corporation trademark for their original teleconferencing equipment, now discontinued.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EDC See:": {
    "term": "EDC See:",
    "cat": "Pro Audio Reference",
    "def": "Electric Daisy Carnival",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "eddy current": {
    "term": "eddy current",
    "cat": "Pro Audio Reference",
    "def": "An electrical current induced in electrical conductors by fluctuating magnetic fields in the conductors. The current moves contrary to the direction of the main current, just below the surface of the material, flowing in circular motion like river eddies. First noted by Michael Faraday after his discovery of electromagnetic induction in 1831. Non-destructive testing based on eddy currents is a fast growing industry. Electrical currents are generated in a conductive material by an induced alternating magnetic field. Interruptions in the flow of eddy currents, caused by imperfections, dimensional changes or changes in the material\u2019s conductive and permeability properties, can be detected with the proper equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Edison effect": {
    "term": "Edison effect",
    "cat": "Pro Audio Reference",
    "def": "In 1883, Thomas Edison noticed that certain materials, when heated by a filament in a vacuum, emitted electrons that could be attracted to an electrode held at a positive potential with respect to the emitter. This became known as the Edison effect and according to Edison, was discovered by accident when experimenting with his new invention, the incandescent lamp. Twenty years later, this effect became the basis for inventing the vacuum tube.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Edison plug": {
    "term": "Edison plug",
    "cat": "Pro Audio Reference",
    "def": "An ordinary household plug with two flat blades and a ground pin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Edison, Thomas": {
    "term": "Edison, Thomas",
    "cat": "Pro Audio Reference",
    "def": "(1847-1931) American inventor extraordinaire",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EDLC (electric double-layer capacitor)": {
    "term": "EDLC (electric double-layer capacitor)",
    "cat": "Electronics",
    "def": "A primary energy storage technology used to replace batteries. Also called ultracapacitors or supercapacitors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EDM (electronic": {
    "term": "EDM (electronic",
    "cat": "Pro Audio Reference",
    "def": "dance music) Generic term for all types of club dance music. See: History of the Rave Scene: How DJs Built Modern Dance Music by Sara Simms. Also see: electronic music genres. And for a wonderful diagram see Stop Calling EDM EDM\u2014Here is a Proper Definition.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EDT See": {
    "term": "EDT See",
    "cat": "Pro Audio Reference",
    "def": "early decay time.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EEBAD (Earthed": {
    "term": "EEBAD (Earthed",
    "cat": "Pro Audio Reference",
    "def": "equipotential bonding and automatic disconnection) British abbreviation for a system with all grounds (\u201cEarths\u201d) bonded together.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EEPROM or": {
    "term": "EEPROM or",
    "cat": "Pro Audio Reference",
    "def": "E2PROM (electrically erasable programmable read-only memory) A version of read-only memory that can be electrically erased and reprogrammed by the designer. Differentiated from standard EPROM (one \u201cE\u201d) which requires ultraviolet radiation for erasure.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "effects boxes or effects units Abbr": {
    "term": "effects boxes or effects units Abbr",
    "cat": "Pro Audio Reference",
    "def": "EFX or just FX Any outboard unit designed to produce an alteration of a musical instrument\u2019s sound, used chiefly by guitarists. Go to GM Arts for an excellent discussion complete with real-world schematics of the most popular effects boxes. These are also called stompboxes due to most of them being designed to be footswitch operated and are placed in front of or to the side of the musician. Hit the link to read about all the variations created over the years.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "effects loop": {
    "term": "effects loop",
    "cat": "Pro Audio Reference",
    "def": "A mixer term used to describe the signal path location where an external (outboard) signal processor is connected. The loop consists of an output Send jack connecting to the effects box input, and an input Return or Receive jack that comes from the effects box output. This is the preferred term when two separate 1/4\u2033, or other connectors are provided to patch in an outboard processor using separate cables for send and receive. These jacks are usually unbalanced, but could be balanced. A stereo effects loop requires four jacks. Compare with insert loop.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "efficiency": {
    "term": "efficiency",
    "cat": "Electronics",
    "def": "The useful power output of an electrical device or circuit divided by the total power input, expressed in percent.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "E-field": {
    "term": "E-field",
    "cat": "Physics",
    "def": "Electric field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "E-flat": {
    "term": "E-flat",
    "cat": "Music",
    "def": "The strike note of The Liberty Bell is E flat. (Snapple Real Fact #660)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EFM (eight-to-fourteen": {
    "term": "EFM (eight-to-fourteen",
    "cat": "Pro Audio Reference",
    "def": "modulation) Compact Disc. A data encoding technique that creates a disc that is highly resilient to handling and storage problems such as dust, scratches, etc. The name comes from the fact that each 8-bit block is translated into a corresponding 14-bit codeword.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EFP (electronic": {
    "term": "EFP (electronic",
    "cat": "Pro Audio Reference",
    "def": "field production) mixer Pretentious equivalent for ENG mixer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EFX See:": {
    "term": "EFX See:",
    "cat": "Pro Audio Reference",
    "def": "effects boxes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EHF See": {
    "term": "EHF See",
    "cat": "Pro Audio Reference",
    "def": "frequency bands.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EIA (Electronic": {
    "term": "EIA (Electronic",
    "cat": "Pro Audio Reference",
    "def": "Industries Alliance) Founded in 1924 as the Radio Manufacturers Association (RMA), The EIA is a private trade organization made up of manufacturers which sets standards for voluntary use of its member companies (and all other electronic manufacturers), conducts educational programs, and lobbies in Washington for its members\u2019 interests.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EIA-422 See": {
    "term": "EIA-422 See",
    "cat": "Pro Audio Reference",
    "def": "RS-422.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EIA-485 See": {
    "term": "EIA-485 See",
    "cat": "Pro Audio Reference",
    "def": "RS-485.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EIAJ (Electronic": {
    "term": "EIAJ (Electronic",
    "cat": "Pro Audio Reference",
    "def": "Industry Association of Japan) A standards body in Japan begun in 1948, now merged into JEITA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "eigentone (from": {
    "term": "eigentone (from",
    "cat": "Pro Audio Reference",
    "def": "German eigen meaning \u201cself\u201d or \u201cown\u201d) See room mode.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eight Track": {
    "term": "Eight Track",
    "cat": "Pro Audio Reference",
    "def": "Museum No, really.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EIN (equivalent": {
    "term": "EIN (equivalent",
    "cat": "Pro Audio Reference",
    "def": "input noise) Output noise of a system or device referred to the input. Done by modeling the object as a noise-free device with an input noise generator equal to the output noise divided by the system or device gain. See the RaneNote Audio Specifications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Elco plug": {
    "term": "Elco plug",
    "cat": "Pro Audio Reference",
    "def": "See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electone (electronic tone)": {
    "term": "electone (electronic tone)",
    "cat": "Pro Audio Reference",
    "def": "A trade-marked symbol of the Yamaha Corporation; the brand name of Yamaha\u2019s organ instrument line.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electret microphone": {
    "term": "electret microphone",
    "cat": "Pro Audio Reference",
    "def": "A microphone design similar to that of condenser mics except utilizing a permanent electrical charge, thus eliminating the need for an external polarizing voltage. This is done by using a material call an electret [acronym for electricity + magnet] that holds a permanent charge (similar to a permanent magnet, i.e., a solid dielectric that exhibits persistent dielectric polarization). Because electret elements exhibit extremely high output impedance, they often employ an integral built-in impedance converter (usually a single JFET) that requires external power to operate. This low voltage power is often supplied single-ended over an unbalanced connection, or it may operate from standard phantom power. Electret technology was co-pioneered by Jim West and Gerhard Sessler in the 1960s at Bell Labs. Their original research into polymers (an electrical analogy of a permanent magnet) led to electret transducers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electric Anything": {
    "term": "electric Anything",
    "cat": "Pro Audio Reference",
    "def": "operated by electricity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Electric Daisy": {
    "term": "Electric Daisy",
    "cat": "Pro Audio Reference",
    "def": "Carnival Billed as North America\u2019s largest music festival, it is held in various US and international cities since 1993 and put on by Insomniac. \u201cFounded by Pasquale Rotella and built upon his creative vision, the company\u2019s core philosophy is to encourage audience participation through interactive art, roaming theatrical performers, and fully immersive state-of-the-art production design. Behind every corner and inside every area of Insomniac\u2019s festivals is a new adventure waiting to be explored.\u201d [From website]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Electric Festival Held on": {
    "term": "Electric Festival Held on",
    "cat": "Pro Audio Reference",
    "def": "the island of Aruba, just off the northern coast of Venezuela, it is billed as the biggest electronic festival in the Caribbean.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Electric Forest": {
    "term": "Electric Forest",
    "cat": "Pro Audio Reference",
    "def": "Festival Four-day music festival, begun in 2008, held yearly in Rothbury, MI, with overnight provisions.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electric guitar": {
    "term": "electric guitar",
    "cat": "Pro Audio Reference",
    "def": "Musical instrument derived from the standard guitar but having a solid-body and electric pickups using electromagnetic induction to convert metal string vibrations into audio signals that require further amplification before driving a loudspeaker. First invented by George Beauchamp in 1931.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Electric Zoo": {
    "term": "Electric Zoo",
    "cat": "Pro Audio Reference",
    "def": "(aka E-Zoo) Music festival held Labor Day weekend in NY City since 2009, featuring all genres of electronic music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electroacoustics": {
    "term": "electroacoustics",
    "cat": "Pro Audio Reference",
    "def": "The science that deals with the interaction or interconversion of electric and acoustic phenomena. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electroacoustic transducer": {
    "term": "electroacoustic transducer",
    "cat": "Pro Audio Reference",
    "def": "A transducer designed to receive electric input signals and to supply acoustic output signals, or vice versa. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electromagnetic induction": {
    "term": "electromagnetic induction",
    "cat": "Pro Audio Reference",
    "def": "The generation of an electromotive force (voltage) and current in a circuit or material by a changing magnetic field linking with that circuit or material. Electricity and magnetism are kinfolk and form the foundation of audio transducers found at both ends of any audio chain: dynamic microphones and loudspeakers with voice coils. The principle is beautifully simple: if you pass a coil of wire through a magnetic field, electricity is generated within the coil (dynamic microphone), and if you pass electricity through a coil of wire (voice coil), a magnetic field is generated. Move a magnet, create a voltage; apply a voltage, create a magnet. This is the essence of all electromechanical objects.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electromotive force Abbr. EMF": {
    "term": "electromotive force Abbr. EMF",
    "cat": "Physics",
    "def": "The energy per unit charge that is converted reversibly from chemical, mechanical, or other forms of energy into electrical energy in a battery or dynamo. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electronic acoustic": {
    "term": "electronic acoustic",
    "cat": "Pro Audio Reference",
    "def": "enhancement See: EAE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electronic architecture": {
    "term": "electronic architecture",
    "cat": "Pro Audio Reference",
    "def": "See: EAE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electronic music genres Hit": {
    "term": "electronic music genres Hit",
    "cat": "Pro Audio Reference",
    "def": "the link for an astonishing look at electronic music genres.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Electronic Sackbut Musical Instrument": {
    "term": "Electronic Sackbut Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Very early electronic instrument created in the \u201940s by Hugh Le Caine, which made use of the first known modulation wheel, and is now recognized as the first voltage-controlled synthesizer. [The name \u201csackbut\u201d is an ancient trombone-like musical instrument.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Electronium Musical Instruments": {
    "term": "Electronium Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "Very early electronic instrument invented by Raymond Scott in the late \u201950s or early \u201960s. Nice photo here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electrostatic loudspeaker": {
    "term": "electrostatic loudspeaker",
    "cat": "Pro Audio Reference",
    "def": "See loudspeaker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "electrostatic microphone": {
    "term": "electrostatic microphone",
    "cat": "Pro Audio Reference",
    "def": "See condenser microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "elephant hearing Hit": {
    "term": "elephant hearing Hit",
    "cat": "Pro Audio Reference",
    "def": "the link to read all about elephants hearing through seismic vibrations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "elephant teeth Piano keys": {
    "term": "elephant teeth Piano keys",
    "cat": "Pro Audio Reference",
    "def": "[Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Elliot Sound Products": {
    "term": "Elliot Sound Products",
    "cat": "Pro Audio Reference",
    "def": "An outstanding collection of audio technical articles by Rod Elliot (and DIY audio projects).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "elliptic filters": {
    "term": "elliptic filters",
    "cat": "Pro Audio Reference",
    "def": "or elliptic-function filters also called Cauer filters after network theorist Wilhelm Cauer. A filter having an equiripple passband and an equiminima stopband. [IEEE] Butterworth filters are all-pole types, while elliptic filters have zeros as well as poles at finite frequencies. The location of the poles and zeros creates equiripple behavior in the passband similar to Chebyshev filters. Finite transmission zeros in the stopband reduce the transition region so that extremely sharp roll-off rates result; however the improved performance is obtained at the expense of return lobes (\u201cbounce\u201d) in the stopband.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "elocution 1": {
    "term": "elocution 1",
    "cat": "Pro Audio Reference",
    "def": "The art of public speaking in which gesture, vocal production, and delivery are emphasized. 2. A style or manner of speaking, especially in public. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Ely, Jack": {
    "term": "Ely, Jack",
    "cat": "Pro Audio Reference",
    "def": "(1943-2015) American Northwest musician best known for being the frontman and lead singer of The Kingsmen and their famous cover of the song \u201cLouie Louie.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMC Directive": {
    "term": "EMC Directive",
    "cat": "Pro Audio Reference",
    "def": "(ElectroMagnetic Compatibility) 1. A directive issued by the European Commission aimed at establishing product compatibility within the EU (European Union). Article 1.4 defines electromagnetic compatibility as the ability of an electrical and electronic appliance, equipment or installation containing electrical and/or electronic components to function satisfactorily in its electromagnetic environment (immunity requirement) without introducing intolerable electromagnetic disturbances to anything in that environment (emission requirement). 2. Due to the significant increases in development time and product costs imposed by the EMC Directive, many believe the initials really stand for \u201celiminate minor companies.\u201d [Thanks DC.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMD (electronic": {
    "term": "EMD (electronic",
    "cat": "Pro Audio Reference",
    "def": "music distribution) Distributing digital music files (compressed using MP3, AAC, AC-3, etc.) from a server to a client.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EME (electromagnetic": {
    "term": "EME (electromagnetic",
    "cat": "Pro Audio Reference",
    "def": "environment) \u201cThe spatial distribution of electromagnetic fields surrounding a given site.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Emerson, Keith": {
    "term": "Emerson, Keith",
    "cat": "Pro Audio Reference",
    "def": "See: Keith Emerson.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMF (electromotive force)": {
    "term": "EMF (electromotive force)",
    "cat": "Physics",
    "def": "Voltage. See electromotive force & volt; also back-emf.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMI (electromagnetic interference)": {
    "term": "EMI (electromagnetic interference)",
    "cat": "Pro Audio Reference",
    "def": "A measure of electromagnetic radiation from equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "emitter follower": {
    "term": "emitter follower",
    "cat": "Pro Audio Reference",
    "def": "See buffer amplifier.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "emo": {
    "term": "emo",
    "cat": "Pro Audio Reference",
    "def": "A genre of dance music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "emoacoustics (emotional": {
    "term": "emoacoustics (emotional",
    "cat": "Pro Audio Reference",
    "def": "acoustics) \u201d \u2026 deals with the relationship between sounds characteristics, the individual, and the situation with a focus on the induced emotional reactions.\u201d [From website; hit the link]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMP (Experience": {
    "term": "EMP (Experience",
    "cat": "Pro Audio Reference",
    "def": "Music Project) Paul Allen\u2019s (cofounder of Microsoft) interactive music museum, located in Seattle, that celebrates and explores creativity and innovation in American popular music as exemplified by rock \u2018n\u2019 roll. [Very cool place \u2026 come visit sometime.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "empath 1": {
    "term": "empath 1",
    "cat": "Pro Audio Reference",
    "def": "One who practices empathy, i.e., a person who strongly identifies with and understands another\u2019s situation, feelings, and motives. 2. A DJ performance mixer combining the vision of Grandmaster Flash and Rane technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "emphasis Telecommunication": {
    "term": "emphasis Telecommunication",
    "cat": "Pro Audio Reference",
    "def": "The purposeful boosting of amplitude over a frequency range to reduce interference from noise.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMT plate": {
    "term": "EMT plate",
    "cat": "Pro Audio Reference",
    "def": "reverb Invented in 1957 by the German company, EMT (Elektromesstecknik), and used in all the famous recording studios in the \u201960s and \u201970s, it is still considered by many to be the best sounding reverb.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EMT 250": {
    "term": "EMT 250",
    "cat": "Pro Audio Reference",
    "def": "Digital Reverb Invented in 1976, this was the first commercial digital reverb.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "emulate Computer Science": {
    "term": "emulate Computer Science",
    "cat": "Pro Audio Reference",
    "def": "To imitate the function of (another system), as by modifications to hardware or software that allow the imitating system to accept the same data, execute the same programs, and achieve the same results as the imitated system. [AHD] For example digital vinyl systems such as Serato DJ and Native Instruments\u2019 Traktor use vinyl emulation control records to manipulate digital audio files.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "encode": {
    "term": "encode",
    "cat": "Electronics",
    "def": "To produce a unique combination of a group of output signals in response to each of a group of input signals. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "end-user": {
    "term": "end-user",
    "cat": "Pro Audio Reference",
    "def": "The ultimate consumer of a product, especially the one for whom the product has been designed. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "energy time": {
    "term": "energy time",
    "cat": "Pro Audio Reference",
    "def": "curve See: ETC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ENF (electric": {
    "term": "ENF (electric",
    "cat": "Pro Audio Reference",
    "def": "network frequency) Criterion Forensics. A method for the authentication of digital audio and video recordings.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ENG (electronic": {
    "term": "ENG (electronic",
    "cat": "Pro Audio Reference",
    "def": "news gathering) mixer Portable battery-powered mixer accommodating at least two or three mic inputs, used in the field to record speech and outdoor sound effects. Some specialized models have built-in telephone line interfacing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Englebart, Douglas C": {
    "term": "Englebart, Douglas C",
    "cat": "Pro Audio Reference",
    "def": "(1925-2013) American engineer famous for inventing the computer mouse while at Stanford Research Institute.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "English guitar Musical Instrument": {
    "term": "English guitar Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A 10-string cittern-type instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "enhancers See": {
    "term": "enhancers See",
    "cat": "Pro Audio Reference",
    "def": "exciters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "enharmonic": {
    "term": "enharmonic",
    "cat": "Music",
    "def": "Of, relating to, or involving tones that are identical in pitch but are written differently according to the key in which they occur, as C sharp and D flat, for example. [AHD] Contrast with inharmonic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ENOB (effective": {
    "term": "ENOB (effective",
    "cat": "Pro Audio Reference",
    "def": "number of bits) A figure of merit for A/D data converters useful in specifying a converter\u2019s real AC accuracy and performance. We all know that the data sheet says it\u2019s 24 bits, but what is it really? For a perfect sine wave, it can be approximated from the SINAD measurement by subtracting 1.76 from the SINAD (dB) and then dividing by 6.02. (For down-and-dirty quick calculations just divide the SINAD by 6 and you\u2019ll be in the ballpark.) For example, if a 24-bit A/D converter has a real world measured SINAD = 100 dB, then it has an ENOB equal to 16, nowhere near the claimed 24 bits.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ENR (excess noise ratio)": {
    "term": "ENR (excess noise ratio)",
    "cat": "Pro Audio Reference",
    "def": "The ratio of a source\u2019s noise power when it is on to when it is off. A normalized measure of how much noise the device creates above the rule of thumb thermal limit of -174 dB/Hz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ensemble": {
    "term": "ensemble",
    "cat": "Music",
    "def": "1. A group of musicians, singers, dancers, or actors who perform together. 2. A work for two or more vocalists or instrumentalists. 3. The performance of such a work. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ensonify": {
    "term": "ensonify",
    "cat": "Acoustics",
    "def": "To irradiate a target, or energize an acoustic medium, with fluid-borne sound. Hence ensonification, the process of irradiating a target or medium with sound. Also spelt insonify. Morfey",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "entropy coding Audio Compression": {
    "term": "entropy coding Audio Compression",
    "cat": "Pro Audio Reference",
    "def": "A lossless audio coding technique.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "envelope Waves": {
    "term": "envelope Waves",
    "cat": "Pro Audio Reference",
    "def": "The boundary of the family of curves obtained by varying a parameter of the wave. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "envelope control Synthesizers": {
    "term": "envelope control Synthesizers",
    "cat": "Pro Audio Reference",
    "def": "A voltage controlling pitch and volume to create a distinctive contour (envelope).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "envelope delay": {
    "term": "envelope delay",
    "cat": "Pro Audio Reference",
    "def": "See group delay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Epidaurus": {
    "term": "Epidaurus",
    "cat": "Acoustics",
    "def": "The Greek theater of Epidaurus is considered one of the most extraordinary acoustic spaces of antiquity. A study by Nico F. Declercq and Cindy Dekeyser of the Georgia Institute of Technology concluded that it was the use of limestone in the seats that created its wonderful acoustic qualities. More details here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "\u00e9pinette des Vosges Musical Instrument": {
    "term": "\u00e9pinette des Vosges Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A French dulcimer-type instrument; a type of zither.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "eponym": {
    "term": "eponym",
    "cat": "Pro Audio Reference",
    "def": "A person whose name is or is thought to be the source of the name of something, such as a city, country, or era. For example, Romulus is the eponym of Rome. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EQ": {
    "term": "EQ",
    "cat": "Terminology",
    "def": "(equalizer) A class of electronic filters designed to augment or adjust electronic or acoustic systems. Equalizers can be fixed or adjustable, active or passive. Indeed, in the early years of telephony and cinema, the first equalizers were fixed units designed to correct for losses in the transmission and recording of audio signals. Hence, the term equalizer described electronic circuits that corrected for these losses and made the output equal to the input. Equalizers commonly modify the frequency response of the signal passing through them; that is, they modify the amplitude versus frequency characteristics. There are also fixed equalizers that modify the phase response of the transmitted signals without disturbing the frequency content. These are referred to as all-pass, phase-delay, or signal-delay equalizers. See the RaneNote Exposing Equalizer Mythology, the RaneNote Operator Adjustable Equalizers, and RaneNote Signal Processing Fundamentals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equal level curves (aka isobaric contours)": {
    "term": "equal level curves (aka isobaric contours)",
    "cat": "Loudspeakers",
    "def": "A way of mapping loudspeaker coverage pattern. Here is Bob McCarthy\u2019s explanation: \u201cThe equal level contours are found by mapping the points of equal pressure between the on-axis and off-axis points at half the distance of the on-axis reference point. In such a case, the 6dB loss from moving off-axis is compensated by the 6dB gain from approaching the source. This creates a balloon-like shape that represents equal pressure. If you were to walk along this line, you would experience level uniformity. In a typical room, the response in the far-field on-axis area would have low-frequency buildup due to room reflections. In the off-axis near-field position, there would be HF attenuation because of the axial loss. These two opposing factors come together to create a high potential for frequency response uniformity, depending upon the particular room and array design factors. Therefore, the contour lines represent both level and (potentially) frequency response uniformity, two of our primary goals in array design.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equal loudness curves": {
    "term": "equal loudness curves",
    "cat": "Hearing",
    "def": "See: Fletcher-Munson Curves.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equal-tempered scale or equal": {
    "term": "equal-tempered scale or equal",
    "cat": "Music",
    "def": "Today\u2019s normal musical scale, it divides a musical octave into twelve equal parts (semitones), i.e., each is 2 1/12 above the other. Compare with just temperament.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equivalent acoustic": {
    "term": "equivalent acoustic",
    "cat": "Pro Audio Reference",
    "def": "distance See: EAD",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equivalent continuous A-weighted sound pressure level": {
    "term": "equivalent continuous A-weighted sound pressure level",
    "cat": "Acoustics",
    "def": "For airborne sounds that are non-stationary with respect to time, an equivalent continuous sound pressure level (see below) formed by applying A-weighting to the original signal before squaring and averaging. [Morfey] Abbreviated LAeq (15) for a time duration of 15 minutes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equivalent continuous sound pressure level": {
    "term": "equivalent continuous sound pressure level",
    "cat": "Acoustics",
    "def": "Of a non-stationary sound pressure signal between specified time limits, the sound pressure level of a notional unvarying sound that, for the same specified duration has the same signal energy as the original signal. [Morfey] Abbreviated Leq.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "equivalent input": {
    "term": "equivalent input",
    "cat": "Pro Audio Reference",
    "def": "noise See EIN.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "erhu Musical Instrument": {
    "term": "erhu Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Chinese 2-stringed fiddle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eric \u201cHoss\u201d": {
    "term": "Eric \u201cHoss\u201d",
    "cat": "Pro Audio Reference",
    "def": "Cartwright\u2019s given name \u2014 \u201cHoss\u201d was a nickname. This, for all you Jeopardy! fans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ERL (echo return loss)": {
    "term": "ERL (echo return loss)",
    "cat": "Pro Audio Reference",
    "def": "The difference between a frequency signal and the echo on that signal as it reaches its destination. [Newton]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ERLE (echo": {
    "term": "ERLE (echo",
    "cat": "Pro Audio Reference",
    "def": "return loss enhancement ) A measure (in dB) of how much echo signal reduction is taking place.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ERP (ear reference point)": {
    "term": "ERP (ear reference point)",
    "cat": "Pro Audio Reference",
    "def": "A point on the artificial test head where the intersection of the receiver ear-cap axis with the external ear-cap plane is placed for testing. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "error correction": {
    "term": "error correction",
    "cat": "Pro Audio Reference",
    "def": "A method using a coding system to correct data errors by use of redundant data within a data block. Often data is interleaved for immunity to burst errors. Corrected data is identical to the original.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESD (electrostatic": {
    "term": "ESD (electrostatic",
    "cat": "Pro Audio Reference",
    "def": "discharge) Electrical discharges of static electricity that build up on personnel or equipment, generated by interaction of dissimilar materials. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eskimo pi Ratio of": {
    "term": "Eskimo pi Ratio of",
    "cat": "Pro Audio Reference",
    "def": "an igloo\u2019s circumference to its diameter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESL (electrostatic": {
    "term": "ESL (electrostatic",
    "cat": "Pro Audio Reference",
    "def": "loudspeaker) See: loudspeaker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESO (equipment": {
    "term": "ESO (equipment",
    "cat": "Pro Audio Reference",
    "def": "superior to operator) Satirical term popular among service technicians used to code invoices for units returned with nothing wrong \u2014 similar to NPF (no problem found). [Thanks, CD!]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESP See:": {
    "term": "ESP See:",
    "cat": "Pro Audio Reference",
    "def": "Elliot Sound Products",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESPA (Electronic": {
    "term": "ESPA (Electronic",
    "cat": "Pro Audio Reference",
    "def": "Systems Professional Alliance) A non-profit organization specializing in entry-level electronic systems technicians (EST).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESR (effective series resistance) Capacitors": {
    "term": "ESR (effective series resistance) Capacitors",
    "cat": "Pro Audio Reference",
    "def": "The sum of many resistive losses in a capacitor. It includes resistance of the dielectric, plate material, electrolytic solution, and terminal leads at one specified frequency and acts like a resistor in series with a perfect capacitor. It is measured in ohms and is the real part of impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESSENCE Festival": {
    "term": "ESSENCE Festival",
    "cat": "Pro Audio Reference",
    "def": "Music festival put on by ESSENCE magazine, held annually in New Orleans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EST (electronic": {
    "term": "EST (electronic",
    "cat": "Pro Audio Reference",
    "def": "systems technician) See: ESPA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ESTA (Entertainment": {
    "term": "ESTA (Entertainment",
    "cat": "Pro Audio Reference",
    "def": "Services & Technology Association) A non-profit trade association representing the North American entertainment technology industry. Now merged with PLASA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "E-taper See:": {
    "term": "E-taper See:",
    "cat": "Pro Audio Reference",
    "def": "potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ETC (energy": {
    "term": "ETC (energy",
    "cat": "Pro Audio Reference",
    "def": "time curve) Originally a three-dimensional graphical plot of acoustic response where frequency, energy and time represent the three axes. Today it is more commonly seen as a two-dimensional graph with energy (in dB-SPL) and time being the axes. In simplest terms it is a plot of the envelope, or instantaneous amplitude decay of the test signal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ETCP (Entertainment": {
    "term": "ETCP (Entertainment",
    "cat": "Pro Audio Reference",
    "def": "Technician Certification Program) Industry certification program \u201cfocusing on the disciplines that directly affect the health and safety of crews, performers, and audiences.\u201d ETCP was created under the auspices of ESTA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "ether From": {
    "term": "ether From",
    "cat": "Pro Audio Reference",
    "def": "a Greek word meaning \u201cupper air,\u201d a term used in early physics (based on ancient beliefs), a magical medium thought to explain the propagation of electromagnetic waves.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Ethernet": {
    "term": "Ethernet",
    "cat": "Pro Audio Reference",
    "def": "A local area network (LAN), originally developed by Xerox in 1973 (the name was coined by its inventor Bob Metcalfe, et al. [who went on to found 3Com in 1979] after the old science term ether), receiving US Patent 4,063,220 in 1975, used for connecting computers, printers, workstations, terminals, etc., now extended to include audio and video using CobraNet and other new technologies (see: AoE, also see: AVB: Audio/Video Bridging). Ethernet operates over twisted-pair, coaxial cable, or fiber optic cable at various speeds designated \u201c10Base-T\u201d up to 10 megabits/sec (Mbps), \u201c100Base-T\u201c, a.k.a. Fast Ethernet, up to 100 Mbps, and \u201c1000Base-T\u201d up to 1 gigabit/sec, or 1000 Mbps, aka Gigabit Ethernet (GE) [uses all 8 conductors and can be up to 100 meters long], and \u201c10Gbase-T\u201d aka. 10-Gbit Ethernet. (The number in the front designates the speed in megabits/second. \u201cBase\u201d indicates the network is baseband. The letter following determines the type of cable and its requirements. 10Base-T, for example is unshielded twisted-pair, using a star topology, and 1000Base-F uses fiber cable.) Other Ethernet designators include:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "1000Base-CX": {
    "term": "1000Base-CX",
    "cat": "Pro Audio Reference",
    "def": "A standard for GE connectivity where the \u201cC\u201d means copper and \u201cX\u201d is a placeholder.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "1000Base-SX (\u201cS\u201d for": {
    "term": "1000Base-SX (\u201cS\u201d for",
    "cat": "Pro Audio Reference",
    "def": "short wavelength laser) for laser fiber cabling based on the Fiber Channel signaling specification for multimode fiber only.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "1000Base-LX (\u201cL\u201d": {
    "term": "1000Base-LX (\u201cL\u201d",
    "cat": "Pro Audio Reference",
    "def": "for long wavelength laser) for laser fiber cabling also based on the Fiber Channel signaling specification for multimode or single-mode fiber.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "1000Base-LH (\u201cLH\u201d": {
    "term": "1000Base-LH (\u201cLH\u201d",
    "cat": "Pro Audio Reference",
    "def": "for long haul) for a multivendor specification (each vendor has a set of transceivers covering different distances). While not an IEEE standard, the vendors are working to interoperate with IEEE 1000Base-LX equipment using the gigabit interface connector (GBIC) multivendor specification in order to provide a common form factor and greater flexibility.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Ethernet crossover cable": {
    "term": "Ethernet crossover cable",
    "cat": "Pro Audio Reference",
    "def": "A connection cable consisting of two pairs crossed plus two pairs uncrossed. Hit the link for a diagram and chart.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EtherSound Networks": {
    "term": "EtherSound Networks",
    "cat": "Pro Audio Reference",
    "def": "Digigram\u2018s patented real-time digital audio network based on standard Ethernet cabling and components (see above).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EULA (end user license agreement) Software": {
    "term": "EULA (end user license agreement) Software",
    "cat": "Pro Audio Reference",
    "def": "The terms and conditions of a user rights with respect to purchased software.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "euphonic Agreeable": {
    "term": "euphonic Agreeable",
    "cat": "Pro Audio Reference",
    "def": "sound, especially in the phonetic quality of words. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "euphonium Musical Instrument": {
    "term": "euphonium Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A brass wind instrument similar to the tuba but having a somewhat higher pitch and a mellower sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Euroblocks Shortened": {
    "term": "Euroblocks Shortened",
    "cat": "Pro Audio Reference",
    "def": "form for European style terminal blocks. See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eurorack Nickname": {
    "term": "Eurorack Nickname",
    "cat": "Pro Audio Reference",
    "def": "for 3U high 19\u2033 wide powered rack designed to accommodate modular synthesizer modules available from many manufacturers. Similar to FracRack but with minor (but important) differences; also similar but different from 500 Series card frames.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eventide H910": {
    "term": "Eventide H910",
    "cat": "Pro Audio Reference",
    "def": "Harmonizer Offered for sale in 1975, it was the first and still the most famous.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EVD (enhanced versatile disc)": {
    "term": "EVD (enhanced versatile disc)",
    "cat": "Pro Audio Reference",
    "def": "The Chinese national DVD standard developed to get around paying royalties to the DVD alliances.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "even temperament": {
    "term": "even temperament",
    "cat": "Pro Audio Reference",
    "def": "See equal-tempered scale.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "EVP (electronic": {
    "term": "EVP (electronic",
    "cat": "Pro Audio Reference",
    "def": "voice phenomenon) Noises resembling speech or music, created electronically, usually not wanted. Most common example is static interference in communication systems, often misinterpreted as conveying intelligence, and being from the dead or aliens. Hit the link for its fascinating history.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "exciters (or enhancers)": {
    "term": "exciters (or enhancers)",
    "cat": "Pro Audio Reference",
    "def": "A term referring to any of the popular special-effect signal processing products used primarily in recording and performing. All exciters work by adding harmonic distortion of some sort \u2013 but harmonic distortion found pleasing by most listeners. Various means of generating and summing frequency-dependent and amplitude-dependent harmonics exist. Both even- and odd-ordered harmonics find favorite applications. Psychoacoustics teaches that even-harmonics tend to make sounds soft, warm and full, while odd-harmonics tend to make things metallic, hollow and bright. Lower-order harmonics control basic timbre, while higher-order harmonics control the \u201cedge\u201d or \u201cbite\u201d of the sound. Used with discrimination, harmonic distortion changes the original sound dramatically, more so than measured performance might predict.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "expander": {
    "term": "expander",
    "cat": "Pro Audio Reference",
    "def": "A signal processing device used to increase the dynamic range of the signal passing through it. Expanders complement compressors. For example, a compressed input dynamic range of 70 dB might pass through a expander and exit with a new expanded dynamic range of 110 dB. Long answer: Just like compression, what \u201cexpansion\u201d is and does has evolved significantly over the years. Originally expanders were used to give the reciprocal function of a compressor, i.e., it undid compression. Anytime audio was recorded or broadcast it had to be compressed for optimum transfer. Then it required an expander at the other end to restore the audio to its original dynamic range. Operating about the same \u201chinge\u201d point and using the same ratio setting as the compressor, an expander makes audio increases and decreases bigger. From this sense came the phrase that \u201cexpanders make the quiet sounds quieter and the loud sounds louder.\u201d Modern expanders usually operate only below a set threshold point (as opposed to the center hinge point), i.e., they operate only on low-level audio. The term downward expander or downward expansion evolved to describe this type of application. (The term upward expander is sometimes used to refer to expanders operating only on high-level signals, i.e., increasing dynamic range above threshold.) The most common use is noise reduction. For example, say, an expander\u2019s threshold level is set to be just below the smallest vocal level being recorded, and the ratio control is set for 3:1. What happens is this: when the vocals stop, the \u201cdecrease below the set-point\u201d is the change from signal (vocals) to the noise floor (no vocals), i.e., there has been a step decrease from the smallest signal level down to the noise floor. If that step change is, say, -10 dB, then the expander\u2019s output will be -30 dB (because of the 3:1 ratio, a 10 dB decrease becomes a 30 dB decrease), thus resulting in a noise reduction improvement of 20 dB. See the RaneNote \u201cDynamics Processors \u2014 Technology & Applications.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "exponent": {
    "term": "exponent",
    "cat": "Pro Audio Reference",
    "def": "The component of a floating-point number that normally signifies the integer power to which the radix is raised in determining the value of the represented number (IEEE-100). For example if radix =10 (a decimal number), then the number 183.885 is represented as mantissa = 1.83885 and exponent = 2 (since 183.885 = 1.83885 x 102).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "exponential horn": {
    "term": "exponential horn",
    "cat": "Loudspeakers",
    "def": "A horn design characterized by having an exponentially increasing cross-sectional area.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "\u201cExpressman Blues\u201d": {
    "term": "\u201cExpressman Blues\u201d",
    "cat": "Pro Audio Reference",
    "def": "The first rock and roll song, recorded May 17, 1930 by \u201cSleepy\u201d John Estes, Yank Rachel and Hammy Nix. [McCleary]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "extensible Of": {
    "term": "extensible Of",
    "cat": "Pro Audio Reference",
    "def": "or relating to a programming language or a system that can be modified by changing or adding features. Capable of being extended: AES24 is an extensible protocol.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Extreme Programming": {
    "term": "Extreme Programming",
    "cat": "Pro Audio Reference",
    "def": "See: XP.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "Eye of Dionysius": {
    "term": "Eye of Dionysius",
    "cat": "Acoustics",
    "def": "The legend says that \u201cDionysius used the cave as a prison for political dissidents, and by means of the perfect acoustics eavesdropped on the plans and secrets of his captives.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "eye pattern": {
    "term": "eye pattern",
    "cat": "Pro Audio Reference",
    "def": "An oscilloscope display of the received voltage waveform in a transmission system. So named because portions of the display take on a human eye-like shape. The eye pattern gives important information. An eye pattern is obtained when a high speed transmission system outputs a long pseudorandom bit sequence. A sampling oscilloscope is used to observe the output such that the scope is triggered to sample on every fourth or eighth pseudorandom clock cycle, and every sample point is plotted on the screen. (The pseudorandom digital data signal from a receiver is repetitively sampled and applied to the vertical input, while the data rate is used to trigger the horizontal sweep.) The picture obtained is a superposition of ones and zeros output. The horizontal \u201cfatness\u201d of the lines indicates the amount of jitter and the rise and fall times is measured from the crossing points. See Siemon publication Data Throughput Validation: Making Every Bit Count for an example and more details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "E-Zoo See:": {
    "term": "E-Zoo See:",
    "cat": "Pro Audio Reference",
    "def": "Electric Zoo.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (E)"
  },
  "42V PowerNet": {
    "term": "42V PowerNet",
    "cat": "Pro Audio Reference",
    "def": "The official name for the 42 V automotive electrical power system. The value of 42 volts comes from a tripling of the normal 12 V car battery to 36 volts which measures 42 volts when running.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "5.1 surround sound": {
    "term": "5.1 surround sound",
    "cat": "Pro Audio Reference",
    "def": "The digital audio multichannel format developed by the Moving Picture Experts Group (see MPEG) for digital soundtrack encoding for film, laserdiscs, videotapes, DVD, and HDTV broadcast. The designation \u201c5.1\u201d (first proposed by Tom Holman of THX fame) refers to the five discrete, full bandwidth (20-20 kHz) channels \u2014 left, right, & center fronts, plus left & right surrounds \u2014 and the \u201c.1\u201d usually refers to the limited bandwidth (20-120 Hz) subwoofer channel, but can also refer to a special effects/feature channel. Terminology used by both Dolby Digital and DTS Consumer (the home version of their theater Coherent Acoustics system).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fa": {
    "term": "fa",
    "cat": "Music",
    "def": "The fourth tone of the diatonic scale in solfeggio. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "facetious One of": {
    "term": "facetious One of",
    "cat": "Pro Audio Reference",
    "def": "the words that contain all five vowels in the correct order. Other examples are obscure scientific terms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fader": {
    "term": "fader",
    "cat": "Pro Audio Reference",
    "def": "A control used to fade out one input source and fade in another. The fading of a single source is called attenuation and uses an attenuator.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fadista": {
    "term": "fadista",
    "cat": "Pro Audio Reference",
    "def": "A singer of tradition Portuguese musical style of fado (see next entry).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fado": {
    "term": "fado",
    "cat": "Music",
    "def": "1. Portuguese musical genre. 2. A sad Portuguese folksong. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fahnestock clip": {
    "term": "Fahnestock clip",
    "cat": "Electronics",
    "def": "A type of spring-clip terminal for electrical wire that is one of the oldest and most popular ever made.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fahrenheit Abbr": {
    "term": "Fahrenheit Abbr",
    "cat": "Pro Audio Reference",
    "def": "F Of or relating to a temperature scale that registers the freezing point of water as 32 \u00b0F and the boiling point as 212 \u00b0F, under normal atmospheric pressure. [AHD] (In scientific and technical contexts temperatures are now usually measured in degrees Celsius rather than Fahrenheit.) [After Gabriel Daniel Fahrenheit.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fahrenheit, Gabriel": {
    "term": "Fahrenheit, Gabriel",
    "cat": "Pro Audio Reference",
    "def": "Daniel (1686-1736) German-born physicist who invented the mercury thermometer (1714) and devised the Fahrenheit temperature scale. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fairchild 670": {
    "term": "Fairchild 670",
    "cat": "Pro Audio Reference",
    "def": "Compressor Limiter designed by Rein Narma in 1959, while at Fairchild Recording Equipment Company in Long Island City, NY. The most revered pro audio compressor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fairchild, Sherman": {
    "term": "Fairchild, Sherman",
    "cat": "Pro Audio Reference",
    "def": "Mills (1896 \u2013 1971) American inventor and entrepreneur who founded many companies, the most famous of which were Fairchild Recording and Fairchild Semiconductor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fall time": {
    "term": "fall time",
    "cat": "Pro Audio Reference",
    "def": "Electronics.The time required for a signal to decay from 90 % to 10 % of its maximum amplitude.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "falsetto": {
    "term": "falsetto",
    "cat": "Music",
    "def": "A voice in a register higher than a person\u2019s usual register, resulting from a change in the way the vocal cords are vibrated. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fandango": {
    "term": "fandango",
    "cat": "Music",
    "def": "An animated Spanish or Spanish-American dance in triple time.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FAQ (frequently": {
    "term": "FAQ (frequently",
    "cat": "Pro Audio Reference",
    "def": "asked question) Acronym commonly seen on bulletin boards, Internet Web sites, and corporate information centers. By compiling FAQ lists (FAQs), organizations significantly reduce time spent repeatedly answering the same questions.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "farad Abbr": {
    "term": "farad Abbr",
    "cat": "Pro Audio Reference",
    "def": "F The unit of capacitance in the meter-kilogram-second system equal to the capacitance of a capacitor having an equal and opposite charge of 1 coulomb on each plate and a potential difference of 1 volt between the plates. [AHD] [After Michael Faraday.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Faraday, Michael": {
    "term": "Faraday, Michael",
    "cat": "Pro Audio Reference",
    "def": "(1791-1867) British physicist and chemist who discovered electromagnetic induction (1831) and proposed the field theory later developed by Maxwell and Einstein. [AHD] After announcing that a new source of energy was possible by moving a magnet in a coil of wire, many declared him a fraud. Faraday responded with his memorable words: \u201cNothing is too wonderful to be true, if it be consistent with the laws of nature.\u201d See Faraday\u2019s Magnetic Field Induction Experiment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Faraday Effect": {
    "term": "Faraday Effect",
    "cat": "Pro Audio Reference",
    "def": "See: Kerr Effect.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "far-end Teleconferencing term meaning": {
    "term": "far-end Teleconferencing term meaning",
    "cat": "Pro Audio Reference",
    "def": "the distant location of transmission; the other end of the telephone line, as opposed to your end (known as the near-end).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "far-end crosstalk Crosstalk that": {
    "term": "far-end crosstalk Crosstalk that",
    "cat": "Pro Audio Reference",
    "def": "is propagated in a disturbed channel in the same direction as the propagation of the signal in the disturbing channel. The terminals of the disturbed channel, at which the far-end crosstalk is present, and the energized terminals of the disturbing channel, are usually remote from each other.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "far-field or": {
    "term": "far-field or",
    "cat": "Pro Audio Reference",
    "def": "far sound field The sound field distant enough from the sound source so the SPL decreases by 6 dB for each doubling of the distance from the source (inverse square law). Contrast with near-field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Farmborough Festival": {
    "term": "Farmborough Festival",
    "cat": "Pro Audio Reference",
    "def": "A 3-day country music festival located on Randall\u2019s Island, next to Manhattan and the Bronx in NY City\u2014a first.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fast Ethernet": {
    "term": "Fast Ethernet",
    "cat": "Pro Audio Reference",
    "def": "See: Ethernet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fat Recording slang": {
    "term": "fat Recording slang",
    "cat": "Pro Audio Reference",
    "def": "Informal phrase for heavily processed audio, usually featuring lots of reverb, chorusing, or doubling. Also seen as phat sound.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fax on": {
    "term": "fax on",
    "cat": "Pro Audio Reference",
    "def": "demand One of the terms for the process of ordering fax documents from remote machines via telephone, using a combination of voice processing and fax technologies. Also called fax-back.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fax-back See": {
    "term": "fax-back See",
    "cat": "Pro Audio Reference",
    "def": "fax on demand.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FDDI (fiber": {
    "term": "FDDI (fiber",
    "cat": "Pro Audio Reference",
    "def": "distributed data interface) An ANSI standard describing a 100 megabytes/sec (MBps) fiber optic LAN; now also specified for twisted-pair use.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FDTD (finite difference time domain)": {
    "term": "FDTD (finite difference time domain)",
    "cat": "Mathematics",
    "def": "A numerical technique for solving a partial differential equation involving time and space variables. The solution is implemented sequentially in the time domain. [IEEE] Considered easy to understand and easy to implement in software it is a popular technique.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FEA See": {
    "term": "FEA See",
    "cat": "Pro Audio Reference",
    "def": "Finite Element Analysis.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "feedback": {
    "term": "feedback",
    "cat": "Acoustics",
    "def": "See acoustic feedback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Feedback Stability": {
    "term": "Feedback Stability",
    "cat": "Pro Audio Reference",
    "def": "Margin See: FSM",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "feedback suppressor": {
    "term": "feedback suppressor",
    "cat": "Pro Audio Reference",
    "def": "An audio signal processing device that uses automatic detection to determine acoustic feedback frequencies and then positions notch filters to cancel the offending frequencies. Other methods use continuous frequency shifting (a very small amount) to prevent frequency build up and feedback before it happens.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "feedback troxelator Faster than": {
    "term": "feedback troxelator Faster than",
    "cat": "Pro Audio Reference",
    "def": "an exterminator. More powerful than an eliminator. Able to leap over an obliterator in a single sample \u2014 \u2018Look; up in the sky;\u2019 \u2018It\u2019s a bird;\u2019 \u2018It\u2019s a plane;\u2019 \u2018It\u2019s The Troxelator \u2026,\u2019 Rane\u2019s patented feedback suppressor technology developed by and named after Dana Troxel, one of their senior design engineers, who proclaims: \u201cI AM THE TROXELATOR.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "feed-through hole": {
    "term": "feed-through hole",
    "cat": "Pro Audio Reference",
    "def": "See vias.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "femto- Prefix": {
    "term": "femto- Prefix",
    "cat": "Pro Audio Reference",
    "def": "for one thousandth of one trillionth (10-15), abbreviated f.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fender, Clarence": {
    "term": "Fender, Clarence",
    "cat": "Pro Audio Reference",
    "def": "Leonidas \u201cLeo\u201d (1909-1991) American inventor and entrepreneur who founded the Fender Electric Instrument Company in 1946 and invented the legendary Stratocaster and Telecaster guitars.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fender-Rhodes Musical Instrument": {
    "term": "Fender-Rhodes Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Nickname for the Rhodes electro-mechanical piano as manufactured by Fender, invented by Harold Rhodes in the \u201950s.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "ferrite 1": {
    "term": "ferrite 1",
    "cat": "Pro Audio Reference",
    "def": "Any of a group of nonmetallic, ceramic-like, usually ferromagnetic compounds of ferric oxide with other oxides, especially such a compound characterized by extremely high electrical resistivity and used in computer memory elements, permanent magnets, and various solid-state devices. 2. Iron that has not combined with carbon, occurring commonly in steel, cast iron, and pig iron below 910\u00b0C. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "ferrite bead Electronic component": {
    "term": "ferrite bead Electronic component",
    "cat": "Pro Audio Reference",
    "def": "A small toroidal shaped part made from a mixture of iron, nickel and zinc oxides used to suppress EMI in audio and other electronic equipment. Usually seen on the inputs and outputs of equipment, ferrite beads act electrically like an inductor in series with a resistor. For more details see \u201cThe Use of Ferrites in EMI Suppression\u201d by Steward, now owned by Laird.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Festival No": {
    "term": "Festival No",
    "cat": "Pro Audio Reference",
    "def": "6 A unique music festival held in Portmeirion, Wales, a picturesque village on the north coast, most famously used as \u201cThe Village\u201d in the acclaimed 1960s television series, \u201cThe Prisoner,\u201d which starred Patrick McGoohan whose character was known as \u201cNumber 6\u201d \u2014hence the name of the festival.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FET (field-effect transistor)": {
    "term": "FET (field-effect transistor)",
    "cat": "Pro Audio Reference",
    "def": "A three-terminal transistor device where the output current flowing between the source and drain terminals is controlled by a variable electric field applied to the gate terminal. The gate design determines the type of FET: either JFET (junction FET) or MOSFET (metal-oxide semiconductor FET). Each type has two polarities: positive, or p-channel devices, and negative, or n-channel devices. In a JFET device the gate forms a true semiconductor junction with the channel, while in a MOSFET device the gate is insulated from the channel by a very thin (typically less than the wavelength of light) layer of glass (silicon dioxide) and the gate is either metal or doped silicon (polysilicon), hence the acronym metal-oxide semiconductor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "F\u00eate de": {
    "term": "F\u00eate de",
    "cat": "Pro Audio Reference",
    "def": "la Musique (aka World Music Day, aka Make Music Day) Music festival begun in 1982 in Paris that is now celebrated each year in cities located in over 100 countries, all on the same day, June 21\u2014summer solstice.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FFL (flat": {
    "term": "FFL (flat",
    "cat": "Pro Audio Reference",
    "def": "flexible loudspeaker) New loudspeaker technology developed by Warwick Audio Technologies, a spin-off company from The University of Warwick School of Engineering.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FFT (fast Fourier transform) 1": {
    "term": "FFT (fast Fourier transform) 1",
    "cat": "Pro Audio Reference",
    "def": "Similar to a discrete Fourier transform except the algorithm requires the number of sampled points be a power of two. 2. A DSP algorithm that is the computational equivalent to performing a specific number of discrete Fourier transforms, but by taking advantage of computational symmetries and redundancies, significantly reduces the computational burden. [It is believed Cornelius Lanczos of the Boeing Co. in the 1940\u2019s first described the FFT.] [See Bob McCarthy\u2019s excellent article: The Modern Audio Analyzer.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fiber-optic cable": {
    "term": "fiber-optic cable",
    "cat": "Pro Audio Reference",
    "def": "microphone Dubbed by the U.K. inventors as the \u201cworld\u2019s nervous system,\u201d it is a method based on the Rayleigh scattering effect of fiber-optic cables, using DAS (distributed acoustic sensing) . Hit the links for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fiber-optic microphone": {
    "term": "fiber-optic microphone",
    "cat": "Microphones",
    "def": "A technology based on sensing changes in light intensity to convert acoustic waves into electrical signals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fiber optics": {
    "term": "fiber optics",
    "cat": "Pro Audio Reference",
    "def": "The technology of using glass fibers to convey light and modulated information. Short distances (typically less than 150 feet) use plastic fibers, while long distances must use glass fibers. See cables.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fiddle Musical Instrument": {
    "term": "fiddle Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Popular name for the violin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fidelipac (aka": {
    "term": "Fidelipac (aka",
    "cat": "Pro Audio Reference",
    "def": "NAB cartridge or simply \u2018cart\u2019) Magnetic tape recording format that became the industry standard for radio broadcasting, introduced in 1959,",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fidelity 1": {
    "term": "fidelity 1",
    "cat": "Pro Audio Reference",
    "def": "The degree with which a system, or a portion of a system, accurately reproduces at its output the essential characteristics of the signal that is impressed upon its input. 2. (modeling and simulation) The degree of similarity between a model and the system properties being modeled. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "field": {
    "term": "field",
    "cat": "Video",
    "def": "One half of a complete video scanning cycle, equaling 1/60 second, or 16.67 milliseconds for NTSC and 1/50 second, or 20 milliseconds for PAL/SECAM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fife Muscial Instrument": {
    "term": "fife Muscial Instrument",
    "cat": "Pro Audio Reference",
    "def": "Western European woodwind flute.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fifth Beatle": {
    "term": "Fifth Beatle",
    "cat": "Pro Audio Reference",
    "def": "See: George Martin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fig newton": {
    "term": "fig newton",
    "cat": "Pro Audio Reference",
    "def": "One kilogram of falling figs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "figure-of-eight See:": {
    "term": "figure-of-eight See:",
    "cat": "Pro Audio Reference",
    "def": "microphone polar response.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "filament Vacuum Tubes": {
    "term": "filament Vacuum Tubes",
    "cat": "Pro Audio Reference",
    "def": "The heating element in a vacuum tube. [It\u2019s that glowing thing.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "film resistor Electronic Component": {
    "term": "film resistor Electronic Component",
    "cat": "Pro Audio Reference",
    "def": "A type of made by depositing a thin layer of resistive material on an insulating core. Favored for audio due to their low noise characteristic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "film sound": {
    "term": "film sound",
    "cat": "Pro Audio Reference",
    "def": "glossary See Larry Blake\u2019s Film Sound Glossary; find out what a \u201cbinky\u201d is.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "filter Any": {
    "term": "filter Any",
    "cat": "Pro Audio Reference",
    "def": "of various electric, electronic, acoustic, or optical devices used to reject signals, vibrations, or radiation of certain frequencies while passing others. Think sieve: pass what you want, reject all else. For audio use the most common electronic filter is a bandpass filter, characterized by three parameters: center frequency, amplitude (or magnitude), and bandwidth. Bandpass filters form the heart of audio graphic equalizers and parametric equalizers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FinFet (fin field-effect transistor) Solid-state": {
    "term": "FinFet (fin field-effect transistor) Solid-state",
    "cat": "Physics",
    "def": "The term was coined by University of California, Berkeley researchers (Profs. Chenming Hu, Tsu-Jae King-Liu and Jeffrey Bokor) to describe a nonplanar, double-gate transistor built on an SOI substrate. [Huang, X. et al. (1999) \u201cSub 50-nm FinFET: PMOS\u201d International Electron Devices Meeting Technical Digest, p. 67. December 5\u20138, 1999]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Finite Element Analysis Abbr": {
    "term": "Finite Element Analysis Abbr",
    "cat": "Pro Audio Reference",
    "def": "FEA A computer-based numerical technique for calculating the strength and behavior of engineering structures.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "finite field": {
    "term": "finite field",
    "cat": "Pro Audio Reference",
    "def": "See: Galois field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fipple Musical Instruments": {
    "term": "fipple Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "1. A whistle like mouthpiece for certain wind instruments, such as a recorder or flageolet, that channels the breath toward the sounding edge of a side opening. 2. An object similar to a fipple in an organ pipe. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FIR (finite impulse-response) filter": {
    "term": "FIR (finite impulse-response) filter",
    "cat": "Pro Audio Reference",
    "def": "A commonly used type of digital filter. Digitized samples of the audio signal serve as inputs, and each filtered output is computed from a weighted sum of a finite number of previous inputs. An FIR filter can be designed to have linear phase (i.e., constant time delay, regardless of frequency). FIR filters designed for frequencies much lower that the sample rate and/or with sharp transitions are computationally intensive, with large time delays. Popularly used for adaptive filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Firefly See": {
    "term": "Firefly See",
    "cat": "Pro Audio Reference",
    "def": "ZigBee.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Firefly Music": {
    "term": "Firefly Music",
    "cat": "Pro Audio Reference",
    "def": "Festival Yearly 4-day event held in Dover, DE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Firewire See": {
    "term": "Firewire See",
    "cat": "Pro Audio Reference",
    "def": "IEEE 1394.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "firkytoodle": {
    "term": "firkytoodle",
    "cat": "Pro Audio Reference",
    "def": "An English word no longer in print (except here) meaning to engage in intimate physical affection, as a prelude to sexual intercourse; foreplay (17th to 19th century).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "firmware Computer": {
    "term": "firmware Computer",
    "cat": "Pro Audio Reference",
    "def": "read-only memory (ROM) code (files) residing inside DSP and microprocessor ICs that controls the hardware response to software instructions \u2014 the liaison between software and hardware. Now really a specific type of software since most firmware updates are done via some sort of streaming network rather than burning new hardware ROMS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fishpaper": {
    "term": "fishpaper",
    "cat": "Pro Audio Reference",
    "def": "An insulating paper, often fiber- or oilcloth-like, used in the construction of transformers and coils. [Historical Note: Alvin G. Sydor writes: \u201cIn 1729 Stephen Gray made the discovery of the conducting and non-conducting power of different substances. Gray found that by using woven silk served as an excellent insulator. Some years later it was found that the paper industry could provide what was equivalent to woven silk. Later it was discovered that if the paper was saturated with fish oil its ability as an insulator was much improved particularly when used in harsh environments and high voltages.\u201d]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fixed-point": {
    "term": "fixed-point",
    "cat": "Pro Audio Reference",
    "def": "A computing method where numbers are expressed in the fixed-point representation system, i.e., one where the position of the \u201cdecimal point\u201d (technically the radix point) is fixed with respect to one end of the numbers. Integer or fractional data is expressed in a specific number of digits, with a radix point implicitly located at a predetermined position. Fixed-point DSPs support fractional arithmetic. A couple of fixed-point examples with two decimal places are 4.56 and 1789.45.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FLAC (free": {
    "term": "FLAC (free",
    "cat": "Pro Audio Reference",
    "def": "lossless audio codec) A lossless compression standard for music files.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flanging Originally, \u201cflanging\u201d": {
    "term": "flanging Originally, \u201cflanging\u201d",
    "cat": "Pro Audio Reference",
    "def": "was achieved using two reel-to-reel tape recorders playing the same program, in synchronization, with their outputs summed together. By alternately slowing one machine, then the other, different phase cancellations occurred in the summation process. The \u201cslowing down\u201d was done simply by pressing against the flanges of the tape reels, hence the original term \u201creel flanging,\u201d soon shortened to just \u201cflanging.\u201d Since the two identical signals would alternately add and subtract due to the introduced phase (timing) difference, the audible effect was one of a sweeping comb filter. It was described as a \u201cswishing\u201d or \u201ctunneling\u201d sound. Soon electronic means were devised to mimic true \u201creel flanging\u201d by using delay lines and mixing techniques. Adding a low-frequency oscillator to modulate the audio delay line\u2019s clock signal created a sweeping effect, much like a jet airplane taking off. The best flangers used two delay lines. Compare with phaser",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flanking sound transmission": {
    "term": "flanking sound transmission",
    "cat": "Acoustics",
    "def": "The transmission of sound from a source room (i.e., a room in which a source is located) to an adjacent receiving room by paths other than the common partition. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flat response": {
    "term": "flat response",
    "cat": "Microphones",
    "def": "A frequency response that is uniform and equal at all frequencies. [Vear]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fleming, Sir": {
    "term": "Fleming, Sir",
    "cat": "Pro Audio Reference",
    "def": "John Ambrose (1849-1945) British electrical engineer and inventor known for his work on electric lighting, wireless telegraphy, and the telephone. He invented and patented the first tube, a diode (which he called a thermionic valve, he used for signal detection (although Edison technically developed the first tube with a version of his light bulb).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fletcher, Harvey": {
    "term": "Fletcher, Harvey",
    "cat": "Pro Audio Reference",
    "def": "(1884-1981) American physicist and legendary pioneer in acoustics and hearing most often associated with the Fletcher-Munson Curves below. He published his findings in his book, Speech and Hearing (Van Nostrand Co., 1929). [And H. D. Arnold wrote the introduction.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fletcher-Munson Curves In": {
    "term": "Fletcher-Munson Curves In",
    "cat": "Pro Audio Reference",
    "def": "the \u201930s, researchers Fletcher and Munson first accurately measured and published a set of curves showing the human\u2019s ear\u2019s sensitivity to pure tone loudness verses frequency (\u201cLoudness, its Definition Measurement and Calculation,\u201d J. Acoust. Soc. Am., vol. 5, p 82, Oct. 1933). They conclusively demonstrated that human hearing is extremely dependent upon loudness. The curves show the ear most sensitive to pure tones in the 3 kHz to 4 kHz area. This means sounds above and below 3-4 kHz must be louder in order to be heard just as loud. For this reason, the Fletcher-Munson curves are referred to as \u201cequal loudness contours.\u201d They represent a family of curves from \u201cjust heard,\u201d (0 dB SPL) all the way to \u201charmfully loud\u201d (130 dB SPL), usually plotted in 10 dB loudness increments.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "D.": {
    "term": "D.",
    "cat": "Terminology",
    "def": "W. Robinson and R. S. Dadson revised the curves in their paper, \u201cA Redetermination of the Equal-Loudness Relations for Pure Tones,\u201d Brit. J. Appl. Phys., vol. 7, pp. 156-181, May 1956. These curves supersede the original Fletcher-Munson curves for all modern work with pure tones. Robinson & Dadson curves are the basis for ISO: \u201cNormal Equal-Loudness Level Contours,\u201d ISO 226:1987 \u2014 the current standard.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Users of": {
    "term": "Users of",
    "cat": "Pro Audio Reference",
    "def": "either of these curves must clearly understand that they are valid only for pure tones in a free field, as discussed in the following by Holman & Kampmann. This specifically means they do NOT apply to noise band analysis or diffused random noise for instance, i.e., they have little relevance to the real audio world. A good overview is T. Holman and F. Kampmann, \u201cLoudness Compensation: Use and Abuse,\u201d J. Audio Eng. Soc., vol. 26, no. 7/8, pp. 526-536, July/August 1978.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "For real audio use,": {
    "term": "For real audio use,",
    "cat": "Pro Audio Reference",
    "def": "the Steven\u2019s curves are more applicable: S. S. Stevens, \u201cPerceived Level of Noise by Mark VII and Decibels (E),\u201d J. Acoust. Soc. Am., vol. 51, pp. 575-601, 1972. [Used to create ISO 532:1975 and ASA S3.4-1980] See Holman & Kampmann above for discussion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flicker AC Power Systems": {
    "term": "flicker AC Power Systems",
    "cat": "Pro Audio Reference",
    "def": "The effect caused when load switching creates a short-duration dip in the AC voltage, as when the lights dim momentarily when the refrigerator compressor kicks in.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flicker noise": {
    "term": "flicker noise",
    "cat": "Pro Audio Reference",
    "def": "or 1/f noise Noise whose amplitude varies inversely with frequency. Mainly used in solid-state physics to describe noise with 1/f behavior, such as the noise resulting from impurities in the conducting channel, generation and recombination noise due to base current in transistors, etc. Pink noise has a 1/f characteristic so the two terms are often interchanged, however when used to describe semiconductor noise (in op amps for instance) it is uniquely a low-frequency phenomena occurring below 2 kHz, while in audio, pink noise is wideband to 20 kHz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "floating-point": {
    "term": "floating-point",
    "cat": "Pro Audio Reference",
    "def": "A computing method where numbers are expressed in the floating-point representation system, i.e., one where the position of the decimal point does not remain fixed with respect to one end of numerical expressions, but is regularly recalculated. A floating-point number has four parts: sign, mantissa, radix, and exponent. The sign indicates polarity so it is always 1 or -1. The mantissa is a positive number representing the significant digits. The exponent indicates the power of the radix (i.e., the number base, usually binary 2, but sometimes hexadecimal 16). A common example is the \u201cscientific notation\u201d used in all science and mathematics fields. Scientific notation is a floating point system with radix 10 (i.e., decimal). See FLOPS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "floating unbalanced line": {
    "term": "floating unbalanced line",
    "cat": "Pro Audio Reference",
    "def": "A quasi-balanced output stage consisting of an unbalanced output connected to the tip of a \u00bc\u201d TRS (tip-ring-sleeve) jack through an output resistor (typically in the 50-300 ohms range). An equal valued resistor is used to tie the ring terminal to signal ground. The sleeve connection is left open or \u201cfloating.\u201d Thus, from the receiver\u2019s viewpoint, what is \u201cseen\u201d are two lines of equal impedance, used to transfer the signal. In this sense, the line is \u2018balanced,\u201d although only one line is actually being driven. Leaving the sleeve open, guarantees that only one end of the shield (the receiving end) will be grounded. A practice that unbalanced systems often require. For trouble free interconnections, balanced lines are always the preferred choice.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "floobydust": {
    "term": "floobydust",
    "cat": "Pro Audio Reference",
    "def": "A contemporary made-up term, one meaning being derived from the archaic Latin miscellaneus, whose disputed history springs from Indo-European roots, probably finding Greek origins (influenced, of course, by Egyptian linguists) \u2014 meaning a mixed bag, or a heterogeneous motley mixed varied assortment. Popularized within the audio community when borrowed and used by the author of this web page as a chapter title in the National Semiconductor Audio Handbook, first published in 1976.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FLOPS (floating-point": {
    "term": "FLOPS (floating-point",
    "cat": "Pro Audio Reference",
    "def": "operations per second) A measure of computing power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flugelhorn or fluegelhorn": {
    "term": "flugelhorn or fluegelhorn",
    "cat": "Pro Audio Reference",
    "def": "A bugle with valves, similar to the cornet but having a wider bore. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flute Musical Instruments": {
    "term": "flute Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A high-pitched woodwind instrument consisting of a slender tube closed at one end with keys and finger holes on the side and an opening near the closed end across which the breath is blown. Also called transverse flute. [AHD] The oldest wooden musical instruments discovered to date were found in Greystone, Ireland and date from 4000 BC. And the oldest instrument of any sort is a flute made from bird bones found in Germany dating from 35,000 BC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flutina Musical Instrument": {
    "term": "flutina Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A type of European accordion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flutter 1. Analog": {
    "term": "flutter 1. Analog",
    "cat": "Recording",
    "def": "Any significant variation from the designed study rotational speed of a recording or playback mechanism, e.g., turntables and analog tape recorders (typically at 5-10 Hz rate). Heard as rapid fluctuation in pitch when played back. Compare with wow. 2. Telecommunications. Any rapid variation of signal parameters, such as amplitude, phase, and frequency.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flutter echo": {
    "term": "flutter echo",
    "cat": "Acoustics",
    "def": "An acoustic effect in some rooms where sound is reflected back and forth between two parallel surfaces, such as opposite walls. In order to qualify as a flutter echo the reflections must be fewer than about 15 or so per second. This happens when the walls are more than about 25 feet apart. Parallel surfaces closer than this give rise to standing waves that result in nonuniform distribution of sound between the surfaces. [White]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flux": {
    "term": "flux",
    "cat": "Physics",
    "def": "The lines of force found in an electric or magnetic field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fluxivity Magnetic": {
    "term": "fluxivity Magnetic",
    "cat": "Recording",
    "def": "The recorded flux per unit track width. See AES7: AES standard for the preservation and restoration of audio recording \u2014 Method of measuring recorded fluxivity of magnetic sound records at medium wavelengths.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "flux unit": {
    "term": "flux unit",
    "cat": "Pro Audio Reference",
    "def": "See: jansky.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FM": {
    "term": "FM",
    "cat": "Terminology",
    "def": "(frequency modulation) Radio broadcast. The encoding of a carrier wave by variation of its frequency in accordance with an input signal. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "focalization (a.k.a. near-field focalization (NFF)": {
    "term": "focalization (a.k.a. near-field focalization (NFF)",
    "cat": "Acoustics",
    "def": "A beamforming technique based on near-field measurements.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "foghorn Any": {
    "term": "foghorn Any",
    "cat": "Pro Audio Reference",
    "def": "device designed to emit a loud audible signal as a warning about navigational hazards due to heavy fog obscuring vision.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FOH Abbreviation": {
    "term": "FOH Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for front of house, used to describe the main mixer usually located in the audience for sound reinforcement systems. Meant to differentiate the main house mixer from the monitor mixer normally located to the side of the stage.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "foldback": {
    "term": "foldback",
    "cat": "Pro Audio Reference",
    "def": "The original term for monitors, or monitor loudspeakers, used by stage musicians to hear themselves and/or the rest of the band. The term \u201cmonitors\u201d has replaced \u201cfoldback\u201d in common practice.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Foley": {
    "term": "Foley",
    "cat": "Pro Audio Reference",
    "def": "A term synonymous with film sound effects. A recording studio Foley stage is where the sound effects are generated in synch with the moving picture. Named after Jack Foley, who invented sound effects for film sound while working for Universal. He simultaneously added music and effects to the previously silent film \u201cShowboat\u201d and the first \u201cFoley\u201d session was born.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "follower Shortened form for": {
    "term": "follower Shortened form for",
    "cat": "Pro Audio Reference",
    "def": "a number of electronic circuit buffer amplifiers named voltage followers, cathode followers, emitter followers, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fonz Foot Wedge": {
    "term": "Fonz Foot Wedge",
    "cat": "Loudspeakers",
    "def": "A special floor monitor developed for the Dave Matthews Band that utilizes a tactile transducer (like the one found in drummers butt thumpers) to produce a tactile pounding on the musicians foot.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Forecastle Founded in 2002,": {
    "term": "Forecastle Founded in 2002,",
    "cat": "Pro Audio Reference",
    "def": "a yearly music festival held in Louisville, KY. From website: \u201cA forecastle is a superstructure at the bow of a ship where the crew is housed. Hard at work in the unruly sea, it\u2019s a place workers gather after a long day to unwind. A place where the people come together, for one whale of a good time.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "foreground music": {
    "term": "foreground music",
    "cat": "Pro Audio Reference",
    "def": "Officially music with (or without) lyrics and performed by the original artist. Used where it is believed people will pay attention to it. Contrast with background music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "formant Any": {
    "term": "formant Any",
    "cat": "Pro Audio Reference",
    "def": "of several frequency regions of relatively great intensity in a sound spectrum, which together determine the characteristic quality of a vowel sound. [AHD] Formants are what you emphasis in a sound system (or hearing aid) to improve intelligibility.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "form factor": {
    "term": "form factor",
    "cat": "Electronics",
    "def": "The ratio of RMS value to average value for an alternating current waveform. [There are many more types of form factors: go here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "forr\u00f3 Dance": {
    "term": "forr\u00f3 Dance",
    "cat": "Pro Audio Reference",
    "def": "A Brazilian dance style that developed from European styles of folk music such as Chula and xotis.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "forward masking": {
    "term": "forward masking",
    "cat": "Pro Audio Reference",
    "def": "See temporal masking.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Four Elements Hip-Hop": {
    "term": "Four Elements Hip-Hop",
    "cat": "Pro Audio Reference",
    "def": "The four elements of hip-hop culture were outlined by DJ Afrika Bambaataa in the late \u201970s as being DJing, MCing, breaking and graffiti writing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fourier analysis": {
    "term": "Fourier analysis",
    "cat": "Mathematics",
    "def": "Most often the approximation of a function through the application of a Fourier series to periodic data, however it is not restricted to periodic data. [The Fourier series applies to periodic data only, but the Fourier integral transform converts an infinite continuous time function into an infinite continuous frequency function, with perfect reversibility in most cases. In this sense, it is not an approximation. The DFT and FFT are examples of the Fourier series, but are not approximations either unless the time data is an approximation itself, such as for sampled data systems, which introduces sampling errors.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fourier, Baron": {
    "term": "Fourier, Baron",
    "cat": "Pro Audio Reference",
    "def": "Jean Baptiste Joseph (1768-1830) French mathematician and physicist who formulated a method for analyzing periodic functions and studied the conduction of heat. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fourier series Application of": {
    "term": "Fourier series Application of",
    "cat": "Pro Audio Reference",
    "def": "the Fourier theorem to a periodic function, resulting in sine and cosine terms which are harmonics of the periodic frequency. [After Baron Jean Baptiste Joseph Fourier.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fourier theorem": {
    "term": "Fourier theorem",
    "cat": "Pro Audio Reference",
    "def": "A mathematical theorem stating that any function may be resolved into sine and cosine terms with known amplitudes and phases.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fourier transform": {
    "term": "Fourier transform",
    "cat": "Pro Audio Reference",
    "def": "A circuit analysis technique that decomposes or separates a waveform or function into sinusoids of different frequency which sum to the original waveform. It identifies or distinguishes the different frequency sinusoids and their respective amplitudes [Brigham, E. Oren, The Fast Fourier Transform and Its Applications, Englewood Cliffs, NJ: Prentice-Hall, Inc., 1988.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FPGA (field-programmable gate array)": {
    "term": "FPGA (field-programmable gate array)",
    "cat": "Pro Audio Reference",
    "def": "A programmable logic device which is more versatile (i.e., much larger) than traditional programmable devices such as PALs and PLAs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fps (frames": {
    "term": "fps (frames",
    "cat": "Pro Audio Reference",
    "def": "per second) See: frame.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FracRack (Fractional": {
    "term": "FracRack (Fractional",
    "cat": "Pro Audio Reference",
    "def": "Rack) Nickname for 3U high 19\u2033 wide powered rack designed to accommodate modular synthesizer modules available from many manufacturers. First introduced by PAiA, called FracRak\u2122. Similar to Eurorack with minor (but important) differences; also similar but very different from 500 Series card frames.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frame": {
    "term": "frame",
    "cat": "Video",
    "def": "One complete video scanning cycle, equals two fields for NTSC and PAL/SECAM. Also frame rate is expressed as frames per second, abbreviated fps.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frame Ethernet": {
    "term": "frame Ethernet",
    "cat": "Pro Audio Reference",
    "def": "A element of Ethernet systems made up of three elements: two addresses, the data, and an error checking field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frammel": {
    "term": "frammel",
    "cat": "Loudspeakers",
    "def": "In arrays it is sometimes necessary to separate and angle the cabinets a small amount to reduce phase interference. This is often done using a narrow wood strip called a frammel. [For reasons I cannot determine.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FRAP (flat": {
    "term": "FRAP (flat",
    "cat": "Pro Audio Reference",
    "def": "response audio pick-up) Transducers. A type of piezoelectric pick-up developed by Arnie Lazarus in the late \u201960s. Made famous by attaching them to the Golden Gate Bridge and recording its sounds. [Really!]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Freed, Alan": {
    "term": "Freed, Alan",
    "cat": "Pro Audio Reference",
    "def": "(1921-1965) Famous American radio disc jockey who jump-started the rock \u2018n\u2019 roll revolution that shook up the last half of the 20th century.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "free field": {
    "term": "free field",
    "cat": "Pro Audio Reference",
    "def": "or free sound field A sound field without boundaries or where the boundaries are so distant as to cause negligible reflections over the frequency range of interest. Note that if the boundaries exist but completely absorb the sound then a virtual free field is created, thus anechoic chambers are used to measure loudspeakers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "free-field room (aka anechoic room)": {
    "term": "free-field room (aka anechoic room)",
    "cat": "Acoustics",
    "def": "A room whose boundaries absorb effectively all the sound incident thereon, thereby providing essentially free-field conditions. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frequency 1": {
    "term": "frequency 1",
    "cat": "Pro Audio Reference",
    "def": "The property or condition of occurring at frequent intervals. 2. Mathematics. Physics. The number of times a specified phenomenon occurs within a specified interval, as: a. The number of repetitions of a complete sequence of values of a periodic function per unit variation of an independent variable. b. The number of complete cycles of a periodic process occurring per unit time. c. The number of repetitions per unit time of a complete waveform, as of an electric current. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frequency bands Broadcast": {
    "term": "frequency bands Broadcast",
    "cat": "Pro Audio Reference",
    "def": "Broadcast transmission frequency bands are broken into groups as follows:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "HF": {
    "term": "HF",
    "cat": "Terminology",
    "def": "(high frequency) 3 MHz to 30 MHz VHF (very high frequency) 30 MHz to 300 MHz UHF (ultra high frequency) 300 MHz to 3 GHz SHF (super high frequency) 3 GHz to 30 GHz EHF (extremely high frequency) 30 GHz to 300 GHz THF (tremendously high frequency) 300 GHz to 3000 GHZ frequency modulation See: FM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frequency-modulation (friction)": {
    "term": "frequency-modulation (friction)",
    "cat": "Pro Audio Reference",
    "def": "noise See: scrape flutter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frequency response Audio electronics": {
    "term": "frequency response Audio electronics",
    "cat": "Pro Audio Reference",
    "def": "It connotes amplitude-frequency response and quantifies a device\u2019s maximum and minimum frequency for full-output response. The electrical passband of an audio device. The measure of any audio device\u2019s ability to respond to a sine wave program, and therefore is a complex function measuring gain and phase shift (see phasor). It is used to express variation of gain, loss, amplification, or attenuation as a function of frequency, normally referred to a standard 1 kHz reference point.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frequency response": {
    "term": "frequency response",
    "cat": "Pro Audio Reference",
    "def": "of musical instruments See: musical instrument frequency ranges",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "frequency shift keying Abbr": {
    "term": "frequency shift keying Abbr",
    "cat": "Pro Audio Reference",
    "def": "FSK Telecommunications. A modulation technique in which binary 0 and 1 are represented by two different frequencies. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fricative Phonology": {
    "term": "fricative Phonology",
    "cat": "Pro Audio Reference",
    "def": "A consonant, such as f or s in English, produced by the forcing of breath through a constricted passage. Also called spirant. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "friction noise": {
    "term": "friction noise",
    "cat": "Pro Audio Reference",
    "def": "See: scrape flutter",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Frying Pan": {
    "term": "Frying Pan",
    "cat": "Pro Audio Reference",
    "def": "See: George Beauchamp.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FSK See:": {
    "term": "FSK See:",
    "cat": "Pro Audio Reference",
    "def": "frequency shift keying.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FSM (Feedback Stability Margin)": {
    "term": "FSM (Feedback Stability Margin)",
    "cat": "Acoustics",
    "def": "The acoustic gain safety margin for a sound system to minimize acoustic feedback problems, usually set at 6 dB.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "full duplex Redundant term": {
    "term": "full duplex Redundant term",
    "cat": "Pro Audio Reference",
    "def": "See duplex.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "full-range Any": {
    "term": "full-range Any",
    "cat": "Pro Audio Reference",
    "def": "audio device capable of capturing, reproducing or processing the full audio frequency spectrum of 20 Hz to 20 kHz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "full tilt": {
    "term": "full tilt",
    "cat": "Pro Audio Reference",
    "def": "boogie Slang phrase combining \u201cfull tilt\u201d from the alternate word for jousting at top speed and \u201cboogie\u201d meaning to dance, so it means dancing at full speed.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "full-wave rectification Term": {
    "term": "full-wave rectification Term",
    "cat": "Pro Audio Reference",
    "def": "used to describe a rectifier that inverts the negative half-cycle of the input sinusoid so that the output contains two half-sine pulses for each input cycle. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fuji Rock": {
    "term": "Fuji Rock",
    "cat": "Pro Audio Reference",
    "def": "Festival Started in 1997 by Hidaka Masa, the festival aims at changing the way Japanese fans \u201clisten to music,\u201d offering the possibility of hearing sounds for the very first time, in an atmosphere of \u201cfreedom\u201d while camping surrounded by nature. [\u201cTry Audio Provides Audio System for Fuji Rock Festival,\u201d FOH, November 2013]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fundamental": {
    "term": "fundamental",
    "cat": "Music",
    "def": "The first harmonic in a harmonic series; the lowest harmonic. Physics. The lowest frequency of a periodically varying quantity or of a vibrating system. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "Fun Fun": {
    "term": "Fun Fun",
    "cat": "Pro Audio Reference",
    "def": "Fun Fest Music festival held annually in Austin, Texas since 2006, growing each year, billed as \u201cone of the most relaxed, creative, and pioneering festivals in music today.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fuse": {
    "term": "fuse",
    "cat": "Pro Audio Reference",
    "def": "An overcurrent protective device with a circuit-opening fusible part that is heated and severed by the passage of the overcurrent through it. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fusion zone Acoustics &": {
    "term": "fusion zone Acoustics &",
    "cat": "Hearing",
    "def": "All reflections arriving at the observer\u2019s ear within 20 -to-40 msec of the direct sound are integrated, or fused together, with a resulting apparent increase in level. [Everest & Pohlmann]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fuzz box": {
    "term": "fuzz box",
    "cat": "Pro Audio Reference",
    "def": "also fuzzbox One of the earliest guitar effects units made popular in the \u201960s psychedelic and heavy metal sound. Early fuzz boxes were not much more than a heavy clipped signal, which tends to sound clarinet-like due to it squaring up the signal which adds lots of odd harmonics characteristic of the clarinet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "fuzzy clustering": {
    "term": "fuzzy clustering",
    "cat": "Mathematics",
    "def": "Analysis technique where complex problems are divided into groups or \u201cclusters\u201d for easier understanding. When the division between clusters is not sharp then you have \u201cfuzzy\u201d clusters that more accurately model real life situations. The importance to pro audio comes from it\u2019s use in modeling acoustic fields to predict SPL and other phenomena (for instance see Sunil Bharitkar and Chris Kyriakakis, \u201cA Cluster Centroid Method for Room Response Equalization at Multiple Locations\u201c).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "F-wrench Slang": {
    "term": "F-wrench Slang",
    "cat": "Pro Audio Reference",
    "def": "term for vernier calipers due to their resemblance to the letter \u201cF.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "FX": {
    "term": "FX",
    "cat": "Terminology",
    "def": "unit Slang for \u201ceffects unit.\u201d See: effects boxes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (F)"
  },
  "H": {
    "term": "H",
    "cat": "Terminology",
    "def": "The symbol for henry, a measure of inductance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "h": {
    "term": "h",
    "cat": "Terminology",
    "def": "Plank\u2019s constant, 6.626 \u00d7 10-34 joules-sec.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Haas Effect": {
    "term": "Haas Effect",
    "cat": "Pro Audio Reference",
    "def": "Also called the precedence effect, describes the human psychoacoustic phenomena of correctly identifying the direction of a sound source heard in both ears but arriving at different times. Due to the head\u2019s geometry (two ears spaced apart, separated by a barrier) the direct sound from any source first enters the ear closest to the source, then the ear farthest away. The Haas Effect tells us that humans localize a sound source based upon the first arriving sound, if the subsequent arrivals are within 25-35 milliseconds. If the later arrivals are longer than this, then two distinct sounds are heard. The Haas Effect is true even when the second arrival is louder than the first (even by as much as 10 dB.). In essence we do not \u201chear\u201d the delayed sound. This is the hearing example of human sensory inhibition that applies to all our senses. Sensory inhibition describes the phenomena where the response to a first stimulus causes the response to a second stimulus to be inhibited, i.e., sound first entering one ear cause us to \u201cnot hear\u201d the delayed sound entering into the other ear (within the 35 milliseconds time window). Sound arriving at both ears simultaneously is heard as coming from straight ahead, or behind, or within the head. The Haas Effect describes how full stereophonic reproduction from only two loudspeakers is possible. (After Helmut Haas\u2019s doctorate dissertation presented to the University of Gottingen, Gottingen, Germany as \u201c\u00dcber den Einfluss eines Einfachechos auf die H\u00f6rsamkeit von Sprache;\u201d translated into English by Dr. Ing. K.P.R. Ehrenberg, Building Research Station, Watford, Herts., England Library Communication no. 363, December, 1949; reproduced in the United States as \u201cThe Influence of a Single Echo on the Audibility of Speech,\u201d J. Audio Eng. Soc., Vol. 20 (Mar. 1972), pp. 145-159.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "habanera 1": {
    "term": "habanera 1",
    "cat": "Pro Audio Reference",
    "def": "A slow Cuban dance. 2. The music for this dance, in duple time. [AHD] [Not to be confused with haba\u00f1era and haba\u00f1ero chili peppers.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hafler, David": {
    "term": "Hafler, David",
    "cat": "Pro Audio Reference",
    "def": "(1919-2003) American engineer, inventor and member of the Audio Hall of Fame, considered one of the fathers of high fidelity. He founded Acrosound (1950), Dynaco (1954) and the David Hafler Company (1972).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "half-duplex Pertaining to": {
    "term": "half-duplex Pertaining to",
    "cat": "Pro Audio Reference",
    "def": "a transmission over a circuit capable of transmitting in either direction, but only one direction at a time. See also duplex.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "half-normalled See:": {
    "term": "half-normalled See:",
    "cat": "Pro Audio Reference",
    "def": "patchbay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "half-step or half-tone": {
    "term": "half-step or half-tone",
    "cat": "Music",
    "def": "1. A marching step of 15 inches (38 centimeters) at quick time and 18 inches (46 centimeters) at double time. [AHD] 2. A pitch change equivalent to that produced by two adjacent piano keys. A semitone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "half-wave rectification Term": {
    "term": "half-wave rectification Term",
    "cat": "Pro Audio Reference",
    "def": "used to describe a rectifier that passes only one-half of each incoming sinusoid, and does not pass the opposite half-cycle. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hall effect": {
    "term": "Hall effect",
    "cat": "Pro Audio Reference",
    "def": "or Hall voltage In a semiconductor, the Hall voltage is generated by the effect of an external magnetic field acting perpendicularly to the direction of the current.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hall, Edwin": {
    "term": "Hall, Edwin",
    "cat": "Pro Audio Reference",
    "def": "Herbert (1855-1938) American physicist best known for his 1879 discovery of the Hall effect.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hammond, Laurens": {
    "term": "Hammond, Laurens",
    "cat": "Pro Audio Reference",
    "def": "(1895-1973) American engineer/inventor/founder of the Hammond Organ company in 1935 and developer of the spring reverb based on a Bell Labs invention.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hamster switch DJ Mixers": {
    "term": "hamster switch DJ Mixers",
    "cat": "Pro Audio Reference",
    "def": "A control found on professional DJ performance mixers that reverses fader action. For example, if a fader normally is off at the bottom of its travel and on at the top of its travel, then activating the hamster switch reverses this, so off is now at the top and on is at the bottom of travel, or alternatively, it swaps left for right in horizontally mounted faders. Used to create the most comfortable (and fastest) fader access when using either turntable, and to accommodate left-handed and right-handed performers. Credited to, and named by DJ Quest, one of the original scratch-style crews named The Bullet Proof Scratch Hamsters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "handshaking": {
    "term": "handshaking",
    "cat": "Pro Audio Reference",
    "def": "The initial exchange between two communications systems prior to and during transmission to ensure proper data transfer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hangout Music Festival": {
    "term": "Hangout Music Festival",
    "cat": "Pro Audio Reference",
    "def": "A 3-day music festival located on an Alabama beach.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "happiness \u201cAn": {
    "term": "happiness \u201cAn",
    "cat": "Pro Audio Reference",
    "def": "agreeable sensation arising from contemplating the misery of another.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "haptic Of": {
    "term": "haptic Of",
    "cat": "Pro Audio Reference",
    "def": "or relating to the sense of touch; tactile. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hardanger fiddle Musical Instrument": {
    "term": "Hardanger fiddle Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "An 8 (or 9) string violin, indigenous to Norway, that is narrower and shorter-necked than a normal violin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hardart Musical Instruments": {
    "term": "hardart Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A type of keyboard invented by the composer Philip Glass, which is used to play other instruments. Click the link for the whole story.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hard bop": {
    "term": "hard bop",
    "cat": "Pro Audio Reference",
    "def": "A simpler and more rhythmic variation of bebop; referring mostly to East Coast jazz performed mainly by black musicians.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hard clipping": {
    "term": "hard clipping",
    "cat": "Pro Audio Reference",
    "def": "See clipping.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hard disk": {
    "term": "hard disk",
    "cat": "Pro Audio Reference",
    "def": "A sealed mass storage unit used for storing large amounts of digital data.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hard-drawn copper": {
    "term": "hard-drawn copper",
    "cat": "Pro Audio Reference",
    "def": "wire See Thomas Doolittle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hard Summer": {
    "term": "Hard Summer",
    "cat": "Pro Audio Reference",
    "def": "Music Festival Very eclectic music and performance festival held in various cities across North America.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hardware": {
    "term": "hardware",
    "cat": "Pro Audio Reference",
    "def": "The physical (mechanical, and electrical) devices that form a system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hardware key": {
    "term": "hardware key",
    "cat": "Pro Audio Reference",
    "def": "See: dongle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hardwired 1": {
    "term": "hardwired 1",
    "cat": "Pro Audio Reference",
    "def": "To connect (electronic components, for example) by electrical wires or cables. 2. To implement (a capability) through logic circuitry that is permanently connected within a computer and therefore not subject to change by programming. 3.a. To determine or put into effect by genetic inheritance: \u201cIt may be that certain orders of anxiety are hardwired in us\u201d (Armand Schwerner). b. To provide with a response or capability by genetic inheritance: Humans are hardwired for speech. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hardy Martin": {
    "term": "Hardy Martin",
    "cat": "Pro Audio Reference",
    "def": "See: Martin, Hardy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Harley-Davidson It": {
    "term": "Harley-Davidson It",
    "cat": "Pro Audio Reference",
    "def": "is a common misconception that the sound of a Harley is trademarked. It is not; although they did try. An application was filed on February 1, 1994, describing it as \u201cThe mark consists of the exhaust sound of applicant\u2019s motorcycles, produced by V-Twin, common crankpin motorcycle engines when the goods are in use.\u201d The application was never granted and was abandoned on September 22, 2000. For interesting reading see Michael Sapherstein, \u201cThe Trademark Registrability of the Harley-Davidson Roar: A Multimedia Analysis.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Harman, Sidney": {
    "term": "Harman, Sidney",
    "cat": "Pro Audio Reference",
    "def": "(1918-2011) Pro audio industry icon and Chairman Emeritus of Harman International Industries.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonic 1": {
    "term": "harmonic 1",
    "cat": "Pro Audio Reference",
    "def": "Any of a series of musical tones whose frequencies are integral multiples of the frequency of a fundamental tone. 2. A tone produced on a stringed instrument by lightly touching an open or stopped vibrating string at a given fraction of its length so that both segments vibrate. Also called overtone, partial, partial tone. A marching step of 15 inches (38 centimeters) at quick time and 18 inches (46 centimeters) at double time. Contrast with ultraharmonic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonica": {
    "term": "harmonica",
    "cat": "Pro Audio Reference",
    "def": "A small rectangular wind instrument with free reeds recessed in air slots from which tones are sounded by exhaling and inhaling. [MWD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonic distortion": {
    "term": "harmonic distortion",
    "cat": "Pro Audio Reference",
    "def": "See THD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonicity": {
    "term": "harmonicity",
    "cat": "Pro Audio Reference",
    "def": "The degree to which a sound\u2019s timbre conforms to a harmonic series (Thanks to Scott Wilkinson for this succinct definition).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonic overtones": {
    "term": "harmonic overtones",
    "cat": "Music",
    "def": "Redundant term. See: overtone and harmonic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonic series 1.": {
    "term": "harmonic series 1.",
    "cat": "Mathematics",
    "def": "A series whose terms are in harmonic progression, such as 1 + 1/2 + 1/3 + 1/4 + 1/5 + \u2026 2. Music. A series of tones consisting of a fundamental tone and the overtones produced by it, and whose frequencies are consecutive integral multiples of the frequency of the fundamental. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonic telegraph": {
    "term": "harmonic telegraph",
    "cat": "Pro Audio Reference",
    "def": "The original name given by Alexander Graham Bell to his idea that the telegraph could be used to transmit sound.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harmonium Musical Instrument": {
    "term": "harmonium Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "An organ-like keyboard instrument that produces tones with free metal reeds actuated by air forced from a bellows. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Harmonizer\u00ae Registered": {
    "term": "Harmonizer\u00ae Registered",
    "cat": "Pro Audio Reference",
    "def": "trademark of Eventide for their pitch-shifting signal processing product line. See: Eventide H910 Harmonizer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Harrison, David": {
    "term": "Harrison, David",
    "cat": "Pro Audio Reference",
    "def": "(1942-1995) American musician and engineer who founded Harrison Consoles. He pioneered the modern \u201cin-line\u201d audio console in 1970, licensing his first design to MCI who sold it as the MCI 400.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Harrison, Ercel B": {
    "term": "Harrison, Ercel B",
    "cat": "Pro Audio Reference",
    "def": "American engineer who was the chief designer at Peerless Transformers, where he designed the first full frequency transformers for the motion picture industry. He is regarded as a legend of transformer design and innovation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "harrumph To make": {
    "term": "harrumph To make",
    "cat": "Pro Audio Reference",
    "def": "a show of clearing one\u2019s throat. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Harvard sentences Speech Quality": {
    "term": "Harvard sentences Speech Quality",
    "cat": "Measurements",
    "def": "IEEE standard recommended sentences for measuring speech quality. Find the list here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HATS (head and torso simulator)": {
    "term": "HATS (head and torso simulator)",
    "cat": "Acoustics",
    "def": "A dummy head, with artificial ears and ear canals fitted with microphones, and a torso, used to measure acoustic parameters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HAVi (Home Audio/Video interoperability)": {
    "term": "HAVi (Home Audio/Video interoperability)",
    "cat": "Pro Audio Reference",
    "def": "An industry standard for home networks designed to link consumer electronics products. Developed by eight consumer giants \u2014 Grundig, Hitachi, Panasonic, Philips, Sharp, Sony, Thomson Multimedia and Toshiba \u2014 the main aim of this protocol is to ride on IEEE 1394 interface, connecting digital TVs, set-top boxes, DVD players and other digital consumer products.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HDBaseT Abbr": {
    "term": "HDBaseT Abbr",
    "cat": "Pro Audio Reference",
    "def": "HDBT Networking. A multimedia connectivity standard optimized for full uncompressed HD video, audio, 100Base-T Ethernet, power over cable and various control signals through a single Cat 5e cable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hdCD (high": {
    "term": "hdCD (high",
    "cat": "Pro Audio Reference",
    "def": "density compact disc) See DVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HDCD (high": {
    "term": "HDCD (high",
    "cat": "Pro Audio Reference",
    "def": "definition compatible digital) Pacific Microsonics\u2018 (now owned by Microsoft) trademark for their encode/decode scheme that allows up to 24 bit, 176.4 kHz digital audio mastering process, yet is compatible with normal 16 bit, 44.1 kHz CD and DAT formats. Claimed to sound superior even when not decoded, and to be indistinguishable from the original if decoded.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HDD (high-capacity": {
    "term": "HDD (high-capacity",
    "cat": "Pro Audio Reference",
    "def": "hard disk drive) See: HDR below.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HDR (hard-disk recorder)": {
    "term": "HDR (hard-disk recorder)",
    "cat": "Pro Audio Reference",
    "def": "An audio recording device based on computer hard disk memory technology. Typically, these machines are configured like analog tape recorders offering 24-48 tracks, utilizing 24-bit / 48-96 kHz data converters with optional I/O to interface with ADAT, TDIF, or AES3, and file format interchangeability with DAWs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HD": {
    "term": "HD",
    "cat": "Terminology",
    "def": "Radio Formerly called IBOC, the digital radio technology that allows simultaneous broadcasting of analog and digital signals using present radio spectrum allocations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HDTV (high definition television)": {
    "term": "HDTV (high definition television)",
    "cat": "Pro Audio Reference",
    "def": "The standard for digital television in North America, still being revised. When finished will include a definition for picture quality at least that of a movie theater, or 35 mm slide, i.e., at least two million pixels (compared to 336,000 pixels for NTSC).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "head amp": {
    "term": "head amp",
    "cat": "Electronics",
    "def": "1. A pre-preamplifier or simply a preamplifier. A very low noise, high gain audio preamp used to boost signal levels from very low sources such as moving coil phono cartridges, some acoustic pick-ups, etc. 2. Slang for headphone amplifier. 3. A guitar amplifier without speakers that usually sits on top of and forms the \u201chead\u201d of a loudspeaker stack, classically comprised of two cabinets consisting of four 10\u2033 or 12\u2033 drivers each. Also called amp head.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "headphones": {
    "term": "headphones",
    "cat": "Pro Audio Reference",
    "def": "An electromagnetic transducer usually based on the principle of electromagnetic induction used to convert the electrical energy output of a headphone amplifier into acoustic energy. Popular nickname:\u201dcans.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "headphone sensitivity": {
    "term": "headphone sensitivity",
    "cat": "Pro Audio Reference",
    "def": "See sensitivity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "headroom": {
    "term": "headroom",
    "cat": "Pro Audio Reference",
    "def": "A term related to dynamic range, used to express in dB, the level between the typical operating level and the maximum operating level (onset of clipping). For example, a nominal +4 dBu system that clips at +20 dBu has 16 dB of headroom. Because it is a pure ratio, there are no units or reference-level associated with headroom \u2014 just \u201cdB.\u201d Therefore (and a point of confusion for many) headroom expressed in dB accurately refers to both voltage and power. Which means our example has 16 dB of voltage headroom, as well as 16 dB of power headroom. It\u2019s not obvious, but it\u2019s true. (The math is left to the reader.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "headset": {
    "term": "headset",
    "cat": "Pro Audio Reference",
    "def": "A headphone fitted with an integral microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "headshell Turntables": {
    "term": "headshell Turntables",
    "cat": "Pro Audio Reference",
    "def": "The removable part of the cartridge mounting assembly attached to the end of the turntable arm.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HeadWize": {
    "term": "HeadWize",
    "cat": "Pro Audio Reference",
    "def": "A now defunct non-profit (i.e., no ads) site specializing in headphones and headphone listening, featuring articles, essays, projects and technical papers on all things headphone \u2014 very informative.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "H.E.A.R": {
    "term": "H.E.A.R",
    "cat": "Pro Audio Reference",
    "def": "(Hearing Education and Awareness for Rockers) A non-profit volunteer organization dedicated to raising awareness of the real dangers of repeated exposure to excessive noise levels from music which can lead to permanent, and sometimes debilitating, hearing loss and tinnitus.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hearing Perceiving sound by the ear": {
    "term": "hearing Perceiving sound by the ear",
    "cat": "Pro Audio Reference",
    "def": "[AHD] See \u201cWhat Is Up With Noises?\u201d by Vi Hart [Absolutely brilliant contribution by a true genius. Hit the link on her name and check out her home page; you won\u2019t be disappointed.] Also for the best presentation of the medical details of hearing see \u201cAuditory Transduction\u201d by Brandon Pletsch. He marries symphony with digital graphics guaranteed to stimulate and educate.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hearing, extreme": {
    "term": "hearing, extreme",
    "cat": "Pro Audio Reference",
    "def": "The record for the most extreme hearing range goes to the moth, who detects frequencies up to 300 kHz, followed by dolphins, who can hear up to 160 kHz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hearing loop": {
    "term": "hearing loop",
    "cat": "Pro Audio Reference",
    "def": "(aka inductive loop ) Audiology. A thin copper wire surrounding an area that transmits audio wirelessly to standard hearing aids and cochlear implants, so equipped.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "heat sink": {
    "term": "heat sink",
    "cat": "Electronics",
    "def": "A protective device that absorbs and dissipates the excess heat generated by a system. [AHD] Generally a mass of metal (usually aluminum) having much greater thermal capacity than the attached heat source. Also see: Kordyban.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heaviside, Oliver": {
    "term": "Heaviside, Oliver",
    "cat": "Pro Audio Reference",
    "def": "(1850-1925) British self-taught engineer, mathematician and physicist, a giant among giants who independently discovered Laplace-like operatives used to simplify differential equations and covenanted vector analysis which he used to reformulate Maxwell\u2019s equations (from twenty equations to the famous four of today). [All this before breakfast.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "heavy-metal": {
    "term": "heavy-metal",
    "cat": "Music",
    "def": "A form of rock music characterized by extreme volume, high-intensity electric guitar, flashy costumes and dramatic stage performances. Originally coined by William Burroughs in his book, Naked Lunch, it was first voiced in music, \u201cheavy-metal thunder,\u201d in Steppenwolf\u2019s \u201cBorn to be Wild.\u201d The song believed to be the first heavy-metal piece was a remake of Eddie Cochran\u2019s \u201cSummertime Blues\u201d recorded by Blue Cheer in 1968. [McCleary]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hecto- or hect-": {
    "term": "hecto- or hect-",
    "cat": "Mathematics",
    "def": "Prefix meaning one hundred (10\u00b2",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hectometer Abbr": {
    "term": "hectometer Abbr",
    "cat": "Pro Audio Reference",
    "def": "hm A metric unit of length equal to 100 meters. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HEI (House": {
    "term": "HEI (House",
    "cat": "Pro Audio Reference",
    "def": "Ear Institute) Established in 1946, a private nonprofit organization, with an international reputation as a leader in its field through its applied otologic research and education programs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heil, Oskar": {
    "term": "Heil, Oskar",
    "cat": "Pro Audio Reference",
    "def": "(1908-1994) German electrical engineer and inventor famous in pro audio for his invention of the air motion transformer loudspeaker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heinrich See:": {
    "term": "Heinrich See:",
    "cat": "Pro Audio Reference",
    "def": "discotheque",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heisenberg, Werner": {
    "term": "Heisenberg, Werner",
    "cat": "Pro Audio Reference",
    "def": "Karl (1901-1976) German physicist and a founder of quantum mechanics. He won a 1932 Nobel Prize for his uncertainty principle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heisenberg uncertainty": {
    "term": "Heisenberg uncertainty",
    "cat": "Pro Audio Reference",
    "def": "principle \u201cThe more precisely the position is determined, the less precisely the momentum is known in this instant, and vice versa.\u201d \u2014 Heisenberg, uncertainty paper, 1927.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Helmholtz Equation": {
    "term": "Helmholtz Equation",
    "cat": "Pro Audio Reference",
    "def": "Used in acoustics and electromagnetic studies. It arises, for example, in the analysis of vibrating membranes, such as the head of a drum, or in solving for room modes. (After Hermann Ludwig Ferdinand von Helmholtz below.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Helmholtz, Hermann": {
    "term": "Helmholtz, Hermann",
    "cat": "Pro Audio Reference",
    "def": "Ludwig Ferdinand von (1821-1894) German physicist and physiologist who formulated the mathematical law of the conservation of energy (1847) and invented an ophthalmoscope (1851) [AHD] (An instrument for examining the interior structures of the eye, especially the retina, consisting essentially of a mirror that reflects light into the eye and a central hole through which the eye is examined. You aren\u2019t a real doctor without one.) Famous for his book, On the Sensations of Tone first published in 1862.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Helmholtz resonator": {
    "term": "Helmholtz resonator",
    "cat": "Pro Audio Reference",
    "def": "When you blow air across the top of an empty bottle to make a sound, you are demonstrating the principal of a Helmholtz resonator. Click the link to read the details and do the math.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hellertion Synthesizers": {
    "term": "Hellertion Synthesizers",
    "cat": "Pro Audio Reference",
    "def": "An early synthesizer from 1928. A monophonic instrument using four leather touchtone fingerboards.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hemi-anechoic room": {
    "term": "hemi-anechoic room",
    "cat": "Acoustics",
    "def": "A test room with a hard reflective floor but whose other surfaces absorb essentially all the incident sound, thereby providing free-field conditions above the reflective plane. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "henry Abbr": {
    "term": "henry Abbr",
    "cat": "Pro Audio Reference",
    "def": "H The unit of inductance in which an induced electromotive force of one volt is produced when the current is varied at the rate of one ampere per second. [After Joseph Henry.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Henry, Joseph": {
    "term": "Henry, Joseph",
    "cat": "Pro Audio Reference",
    "def": "(1797-1878) American physicist who performed extensive studies of electromagnetic phenomena. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hertz Abbr": {
    "term": "hertz Abbr",
    "cat": "Pro Audio Reference",
    "def": "Hz. A unit of frequency equal to one cycle per second (cps). [After Heinrich Rudolf Hertz.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hertz, Heinrich": {
    "term": "Hertz, Heinrich",
    "cat": "Pro Audio Reference",
    "def": "Rudolf (1857-1894) German physicist who was the first to produce radio waves artificially. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "heterodyne Radio &": {
    "term": "heterodyne Radio &",
    "cat": "Television",
    "def": "Having alternating currents of two different frequencies that are combined to produce two new frequencies, the sum and difference of the original frequencies, either of which may be used in radio or television receivers by proper tuning or filtering. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "heterophony": {
    "term": "heterophony",
    "cat": "Music",
    "def": "The simultaneous playing or singing of two or more versions of a melody. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "heuristic Computer Science": {
    "term": "heuristic Computer Science",
    "cat": "Pro Audio Reference",
    "def": "Relating to or using a problem-solving technique in which the most appropriate solution of several found by alternative methods is selected at successive stages of a program for use in the next step of the program. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hexadecimal": {
    "term": "hexadecimal",
    "cat": "Pro Audio Reference",
    "def": "A number system using the base-16, i.e., each number can be any of 16 values. Normally represented by the digits 0-9, plus the alpha characters A-F. A four-bit binary number can represent each hexadecimal digit.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heyerdahl, Thor": {
    "term": "Heyerdahl, Thor",
    "cat": "Pro Audio Reference",
    "def": "(1914-2002) Norwegian anthropologist and explorer made famous by his book Kon-Tiki about his epic 1947 expedition voyage to Polynesia.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "On": {
    "term": "On",
    "cat": "Terminology",
    "def": "a visit to London, Heyerdahl had a busy schedule of appointments. Shortly after recording a program for the Independent Television Network, he was due at the BBC studios for an interview. Having been assured by the BBC that a taxi would be sent to pick him up from the ITN studios, Heyerdahl waited expectantly in the lobby. As the minutes ticked by, however, he began to grow anxious. He approached a little man in a flat cap, who looked as if he might be a taxi driver and was obviously searching for someone. \u201cI\u2019m Thor Heyerdahl,\u201d said the anthropologist, \u201cAre you looking for me?\u201d \u201cNo, mate,\u201d replied the driver. \u201cI\u2019ve been sent to pick up four Airedales for the BBC.\u201d [Bartlett\u2019s Book of Anecdotes]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Heyser, Richard C": {
    "term": "Heyser, Richard C",
    "cat": "Pro Audio Reference",
    "def": "(1931-1987) American engineer best known to the pro audio world for his pioneering work with time delay spectrometry (TDS).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "H(ermon) H(osmer)": {
    "term": "H(ermon) H(osmer)",
    "cat": "Pro Audio Reference",
    "def": "Scott (1909-1979) American engineer most famous for his very successful and important contributions to consumer hi-fi systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hi8 See": {
    "term": "Hi8 See",
    "cat": "Pro Audio Reference",
    "def": "DA-88.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hichiriki Musical Instrument": {
    "term": "hichiriki Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A type of Japanese flute.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HID (Human": {
    "term": "HID (Human",
    "cat": "Pro Audio Reference",
    "def": "Interface Device) Click the link for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hide A set of drums": {
    "term": "hide A set of drums",
    "cat": "Pro Audio Reference",
    "def": "[Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "high-cut filter": {
    "term": "high-cut filter",
    "cat": "Pro Audio Reference",
    "def": "also hi-cut filter See low-pass filter [In audio electronics, we define things like this just to make sure you\u2019re paying attention.] Contrast with high-pass filter below.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "higher order": {
    "term": "higher order",
    "cat": "Pro Audio Reference",
    "def": "ambisonics See: HOA",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "high impedance Abbr. Hi-Z": {
    "term": "high impedance Abbr. Hi-Z",
    "cat": "Electronics",
    "def": "A device having an electrical impedance of at least 2,000 ohms. [Note: This value is arbitrary as there is no standard defining exactly what constitutes a \u2018high impedance.\u2019] Examples include headphones rated 600 ohms and up (headphone division between hi-Z and lo-Z is lower than other devices); microphones rated 10k \u2013 100k ohms; and most circuit inputs are high-impedance, rated at 2k-100k ohms. Contrast with low impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "highlife": {
    "term": "highlife",
    "cat": "Music",
    "def": "Popular West African dance music that combines African rhythms and Western-style pop melodies.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "high-pass filter": {
    "term": "high-pass filter",
    "cat": "Pro Audio Reference",
    "def": "also hi-pass filter A filter having a passband extending from some finite cutoff frequency (not zero) up to infinite frequency. An infrasonic filter is a high-pass filter. Also known as a low-cut filter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hilliard, John": {
    "term": "Hilliard, John",
    "cat": "Pro Audio Reference",
    "def": "Kenneth (1901-1989) American physicist and distinguished acoustical engineer who began his career pioneering audio soundtracks for movies.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hi-NRG (High Energy) From": {
    "term": "Hi-NRG (High Energy) From",
    "cat": "Pro Audio Reference",
    "def": "the Evelyn Thomas disco hit, \u201cHigh Energy.\u201d A form of electronic dance music popular in the \u201980s.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hip-hop": {
    "term": "hip-hop",
    "cat": "Music",
    "def": "A musical genre term whose origin is still debated, but most credit Afrika Bambaataa and the Zulu Nation who used the term in the late \u201970s to describe their South Bronx block parties. Afrika Bambaataa credits Lovebug Starski as the first to use the term to relate to the hip-hop culture.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hiss Random": {
    "term": "hiss Random",
    "cat": "Pro Audio Reference",
    "def": "high frequency noise with a sibilant quality, most often associated with tape recordings. Acoustics. Term for noise in the 2 kHz to 8 kHz range.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "histogram": {
    "term": "histogram",
    "cat": "Pro Audio Reference",
    "def": "A bar graph of a frequency distribution in which the horizontal axis lists each unique value (or range of values) in a set of data, and the height of each bar represents the frequency (or relative frequency) of that value (or range of values). [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "History of": {
    "term": "History of",
    "cat": "Pro Audio Reference",
    "def": "Concert Sound Great repository of concert sound history created by Doug Fowler.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hi-Z See": {
    "term": "Hi-Z See",
    "cat": "Pro Audio Reference",
    "def": "high impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HOA (higher": {
    "term": "HOA (higher",
    "cat": "Pro Audio Reference",
    "def": "order ambisonics) See: Introduction to Higher Order Ambisonics, Blue Ribbon Sound.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hoaxes, audio": {
    "term": "hoaxes, audio",
    "cat": "Pro Audio Reference",
    "def": "See Bob Pease\u2019s wonderful \u201cWhat\u2019s All This Hoax Stuff, Anyhow?\u201c",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hokey 1": {
    "term": "hokey 1",
    "cat": "Pro Audio Reference",
    "def": "Mawkishly sentimental; corny. 2. Noticeably contrived; artificial. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hokey-pokey (also UK: hokey-cokey)": {
    "term": "hokey-pokey (also UK: hokey-cokey)",
    "cat": "Pro Audio Reference",
    "def": "A popular song and line dance whose origins is a bit cloudy. Hit the link for history.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "holodigital square": {
    "term": "holodigital square",
    "cat": "Mathematics",
    "def": "Square number containing each decimal digit exactly once, e.g., 9,814,072,356 is the largest example (i.e., 99,0662).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Holophonics": {
    "term": "Holophonics",
    "cat": "Pro Audio Reference",
    "def": "An acoustical recording and broadcast technology claimed to be the aural equivalent to holography, hence the name. Holophonics is an encode process that occurs during the recording session using a special listening device named \u201cRingo.\u201d It is claimed that \u201cplayback or broadcast is possible over headphones or any existing mono or stereo speaker system, with various levels of spatial effect. Optimal effects occurs when two tracks (stereo) are played utilizing digital technology over headphones and minimal effect when played over a single mono speaker (two tracks merged into one and played over a single speaker).\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HomeRF Lite": {
    "term": "HomeRF Lite",
    "cat": "Pro Audio Reference",
    "def": "See ZigBee.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "homicide \u201cThe": {
    "term": "homicide \u201cThe",
    "cat": "Pro Audio Reference",
    "def": "slaying of one human being by another. There are four kinds of homicide: felonious, excusable, justifiable and praiseworthy, but it makes no great difference to the person slain whether he fell by one kind or another \u2014 the classification is for advantage of the lawyers.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "homophone Words,": {
    "term": "homophone Words,",
    "cat": "Pro Audio Reference",
    "def": "such as taper and tapir, or timbre and tambour, that are pronounced the same but differ in meaning, origin, and sometimes spelling. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "homophonic": {
    "term": "homophonic",
    "cat": "Music",
    "def": "Having or characterized by a single melodic line with accompaniment. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hope \u201cDesire": {
    "term": "hope \u201cDesire",
    "cat": "Pro Audio Reference",
    "def": "and expectation rolled into one.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "horn": {
    "term": "horn",
    "cat": "Loudspeakers",
    "def": "A sound radiator cone mounted onto a loudspeaker diaphragm to amplify its output based on the same principal found in musical instrument horns.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Horner, William": {
    "term": "Horner, William",
    "cat": "Pro Audio Reference",
    "def": "George (1786-1837) English mathematician and inventor of the Zoetrope.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "horse-head fiddle": {
    "term": "horse-head fiddle",
    "cat": "Pro Audio Reference",
    "def": "See: morin khuur.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "horsepower Abbr": {
    "term": "horsepower Abbr",
    "cat": "Pro Audio Reference",
    "def": "hp A unit of power in the U.S. Customary System, equal to 745.7 watts or 33,000 foot-pounds per minute (550 foot-pounds per second). [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hot swap": {
    "term": "hot swap",
    "cat": "Pro Audio Reference",
    "def": "A disconnection of a subcomponent and a reconnection of the same or a replacement component without first turning off the power at the connection interface. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hot water": {
    "term": "hot water",
    "cat": "Pro Audio Reference",
    "def": "Running hot water has a lower pitch than running cold water.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hour Abbr": {
    "term": "hour Abbr",
    "cat": "Pro Audio Reference",
    "def": "h One of the 24 equal parts of a day. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hourglass drum": {
    "term": "hourglass drum",
    "cat": "Pro Audio Reference",
    "def": "See: talking drum.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "house curve": {
    "term": "house curve",
    "cat": "Sound Reinforcement",
    "def": "The name given to the weighting, or alteration, of the sound equalization for a room. It is a rule-of-thumb for what to do after achieving the flattest possible response. Different venues require different house curves with wide variation between many favorites. The most common one is for speech reinforcement in large auditoriums (only) and measures 10 dB down at 10 kHz with respect to 1 kHz (this is a 3 dB/octave slope). This contrasts to the 2 -3 dB used in many small control rooms. The proper choice is heavily dependent on the source material (speech vs. music) and the venue (large vs small; reverberant or dry); there is no one standard.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "House Ear": {
    "term": "House Ear",
    "cat": "Pro Audio Reference",
    "def": "Institute See HEI.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "house mixer": {
    "term": "house mixer",
    "cat": "Pro Audio Reference",
    "def": "See FOH.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "house sync": {
    "term": "house sync",
    "cat": "Pro Audio Reference",
    "def": "A distributed master signal used to guarantee all digital devices run at the same speed. Hit the link for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hove Festival": {
    "term": "Hove Festival",
    "cat": "Pro Audio Reference",
    "def": "Annual music/camping festival held in Tromoy, an island off Arendal, Norway.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HOW (house": {
    "term": "HOW (house",
    "cat": "Pro Audio Reference",
    "def": "of worship) Generic term for any structure used for religious gathering, includes churches, synagogues, temples and mosques; a sacred space.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "howlround What": {
    "term": "howlround What",
    "cat": "Pro Audio Reference",
    "def": "the British call acoustic feedback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "H-PAS (Hybrid Pressure Acceleration System)": {
    "term": "H-PAS (Hybrid Pressure Acceleration System)",
    "cat": "Loudspeakers",
    "def": "A proprietary loudspeaker technology licensed Atlantic Technology, in collaboration with Solus/Clements Loudspeakers, based on a concept developed by Philip R. Clements circa 1979 (U.S. patent 4,373,606, Loudspeaker enclosure and process for generating sound radiation, granted on February 15, 1983). Not relying on electronics, this bass extending idea uses a specially designed chamber to acoustically amplify low frequencies, e.g., a -3dB point of 28 Hz for a single 5 1/4\u2033 driver is achievable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HpTF (headphone transfer function)": {
    "term": "HpTF (headphone transfer function)",
    "cat": "Pro Audio Reference",
    "def": "The complete transfer function from source to the ear-canal, taking into effect the influence of headphone coupling and position on the ear. Hit the link for one scholarly experiment, results and discussion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HRA (High-Resolution Audio)": {
    "term": "HRA (High-Resolution Audio)",
    "cat": "Pro Audio Reference",
    "def": "An initiative by the Digital Entertainment Group (joined by CEA, AES, et al.) to define and mark file- or physical-media based sources of digital audio that qualify as true high-fidelity products. The official definition is \u201clossless audio that is capable of reproducing the full range of sound from recordings that have been mastered from better than CD quality music sources.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HRIR (head-related": {
    "term": "HRIR (head-related",
    "cat": "Pro Audio Reference",
    "def": "impulse response) See: HRTF.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HRMAI (high-resolution": {
    "term": "HRMAI (high-resolution",
    "cat": "Pro Audio Reference",
    "def": "multichannel audio interconnection) From AES standard AES50: AES Standard for digital audio engineering \u2014 High-resolution multichannel audio interconnection (HRMAI). \u201cA high- performance point-to-point audio interconnection rather than a network, although the auxiliary data may operate as a true network, independently of the audio.\u201d Also see the companion application document AES-R6: AES project report \u2014 Guidelines for AES standard for digital audio engineering \u2014 High Resolution multichannel audio interconnection (HRMAI). Download both here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HRRC (Home": {
    "term": "HRRC (Home",
    "cat": "Pro Audio Reference",
    "def": "Recording Rights Coalition) An advocacy group that includes consumers, retailers, manufacturers and professional servicers of consumer electronics recording products.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HRTF (head-related transfer function)": {
    "term": "HRTF (head-related transfer function)",
    "cat": "Pro Audio Reference",
    "def": "The impulse response from a sound source to the eardrum is called the head-related impulse response (HRIR), and its Fourier transform is called the head-related transfer function (HRTF). The HRTF captures all of the physical cues to source localization, and is a surprisingly complicated function of four variables: three space coordinates (azimuth, elevation & range) and frequency, and to make matters worst, they change from person to person. Interaural (i.e., between the ears) time differences, interaural time delays and the physical effects of diffraction of sound waves by the torso, shoulders, head and pinnae modify the spectrum of the sound that reaches the eardrums. These changes allow us to localize sound images in 3D space and are captured by the HRTFs. HRTFs have been named and studied since at least the early \u201970s [Blauert]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HTML (hypertext markup language)": {
    "term": "HTML (hypertext markup language)",
    "cat": "Pro Audio Reference",
    "def": "The software language used on the Internet\u2019s World Wide Web (WWW). Used primarily to create home pages containing hypertext.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HTTP (hypertext transfer protocol)": {
    "term": "HTTP (hypertext transfer protocol)",
    "cat": "Pro Audio Reference",
    "def": "The name for the protocol that moves documents around the Internet/Web. Used by the various servers and browsers to communicate over the net.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hub 1": {
    "term": "hub 1",
    "cat": "Pro Audio Reference",
    "def": "In broadband LAN use, a central location of a network that connects network nodes through spokes, usually in a star architecture. Think of it as a digital splitter, or distribution amplifier. 2. In complex systems, hubs perform the basic functions of restoring signal amplitude and timing, collision detection and notification, and signal broadcast to lower-level hubs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hubbub Loud,": {
    "term": "hubbub Loud,",
    "cat": "Pro Audio Reference",
    "def": "confused, or disagreeable sound or sounds that emphasizes turbulent activity and concomitant din. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Huffman coding": {
    "term": "Huffman coding",
    "cat": "Pro Audio Reference",
    "def": "or Huffman algorithm One of the MP3 and AAC techniques used in digital audio data compression. While not a compression technique in itself, it is used in the final steps to code the process, and is an ideal complement of the perceptual coding. Huffman codes are used in nearly every application that involves the compression and transmission of digital data, such as fax machines, modems, computer networks, and high-definition television. For more details, see: Huffman Coding [After David Huffman (1925-1999).]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hughes, David": {
    "term": "Hughes, David",
    "cat": "Pro Audio Reference",
    "def": "Edward (1831-1900) Welsh-American musician and scientist recognized as the coinventor of the microphone and teleprinter, and inventor of the crystal radio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "huh See: www.huhcorp.com": {
    "term": "huh See: www.huhcorp.com",
    "cat": "Pro Audio Reference",
    "def": "[Some things are too clever, creative and funny to explain; they are better left experienced. Enjoy.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hullabaloo Great": {
    "term": "hullabaloo Great",
    "cat": "Pro Audio Reference",
    "def": "noise or excitement; uproar; disorderly tumult together with loud, bewildering sound. The lagging of an effect behind its cause, as when the change in magnetism of a body lags behind changes in the magnetic field.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Human Jukebox Name of": {
    "term": "Human Jukebox Name of",
    "cat": "Pro Audio Reference",
    "def": "the famous (\u201cOften imitated. Never duplicated!\u201d) Southern University Band Program, Baton Rouge, La., and its signature step: the Jaguar rock.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Humanthesizer Hit": {
    "term": "Humanthesizer Hit",
    "cat": "Pro Audio Reference",
    "def": "the link to read & see performance artist Calvin Harris take MIDI to a new extreme as created by Phil Clandillon and Steve Milbourne of Sony/BMG.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "humbucking pickup Musical Instruments": {
    "term": "humbucking pickup Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A pickup arrangement usually found on electric guitars designed to reduce the effects of 50 Hz or 60 Hz hum products. Typically this is done using two pickups wired electrically and magnetically opposite so as to cancel (buck) induced hum and other noise interference. Invented by engineer Seth Lover at Gibson and patented as US 2,896,491 granted in 1959 but filed in 1955, and first appeared on Gibson steel guitars in 1956 and then on the legendary Les Paul models beginning in 1957. Leo Fender received his humbucking pickup patent, US 2,817,261 in 1957 after filing in 1956.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hum components": {
    "term": "hum components",
    "cat": "Pro Audio Reference",
    "def": "The harmonics of the AC mains supply. The Americas (except the southern half of South America), Japan, Taiwan, Korea and the Philippines use a 60-Hz system, placing the most annoying 2nd and 3rd harmonics at 120 Hz and 180 Hz. For Europe, and the rest of the world using 50-Hz mains, these components fall at 100 Hz and 150 Hz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "huqin Musical Instrument": {
    "term": "huqin Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Chinese bowed string instruments.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hurdy-gurdy Musical Instrument": {
    "term": "hurdy-gurdy Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "1. A medieval stringed instrument played by turning a rosined wheel with a crank and depressing keys connected to tangents on the strings. 2. Any instrument, such as a barrel organ, played by turning a crank. [AHD] (Hit the link for photos of this strange and wonderful instrument.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HVAC Construction": {
    "term": "HVAC Construction",
    "cat": "Pro Audio Reference",
    "def": "Term used to stand for the heating, ventilating, & air conditioning system of any building. Electrical engineering. Term used to mean high-voltage alternating current.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hybrid Telecommunications": {
    "term": "hybrid Telecommunications",
    "cat": "Pro Audio Reference",
    "def": "A term used to describe an interface box that converts a conversation (or data signal) coming in on two pairs (one pair for each direction of the conversation or signal) onto one pair and vice versa (i.e., a 2-wire to 4-wire converter). This is necessary because all long distance circuits are two pairs, while most local circuits are one pair. The name comes from the original use of a \u201chybrid coil\u201d in the telephone whose function was to keep the send and receive signals separated. Both analog and digital hybrid designs are found. A fundamental (and unavoidable) problem in any 2-wire to 4-wire design is leakage (crosstalk) between the transmit and receive signals. In analog designs leakage is reduced by modeling the impedance seen by the transmit amplifier as it drives the hybrid coil. Because telephone-line impedance is complex and not well modeled by a simple passive RLC circuit, only 10 dB to 15 dB of leakage reduction is usually possible. Digital hybrids use DSP technology to model and dynamically adapt to provide much greater reduction than analog designs, typically resulting in reductions of 30 dB to 40 dB. However, the best digital hybrids incorporate acoustic echo cancelling (AEC) circuitry to gain even greater improvements. The AEC works to cancel out any remaining signal coming from the loudspeaker (far-end received signal) from the microphone signal before they can be retransmitted to the far end as acoustic echo. Digital hybrids with AEC achieve total leakage reduction of 50 dB to 65 dB.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hybrid shield termination Audio wiring": {
    "term": "hybrid shield termination Audio wiring",
    "cat": "Pro Audio Reference",
    "def": "The name for the termination technique where the shield is bonded to the sending end\u2019s metal chassis and is capacitively-coupled to the receiving end\u2019s metal chassis. For an example of a connector designed for this see Neutrik\u2019s EMC-XLR.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hydrophilic Having": {
    "term": "hydrophilic Having",
    "cat": "Pro Audio Reference",
    "def": "an affinity for water; readily absorbing or dissolving in water. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hydrophone": {
    "term": "hydrophone",
    "cat": "Acoustics",
    "def": "An electrical instrument for detecting or monitoring sound under water. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hypercardioid microphone": {
    "term": "hypercardioid microphone",
    "cat": "Pro Audio Reference",
    "def": "See cardioid microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hyperlink": {
    "term": "hyperlink",
    "cat": "Pro Audio Reference",
    "def": "The protocol that allows connecting two Internet resources via a single word or phrase; allowing the user a simple point-and-click method to create the link.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "HyperPhysics": {
    "term": "HyperPhysics",
    "cat": "Pro Audio Reference",
    "def": "A website concept created by Carl R. (Rod) Nave, Department of Physics and Astronomy, Georgia State University. \u201cAn exploration environment for concepts in physics which employs concept maps and other linking strategies to facilitate smooth navigation.\u201d [An incredible site. You can get lost here for hours. I can\u2019t recommend it enough.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hypersonic sound Term that": {
    "term": "hypersonic sound Term that",
    "cat": "Pro Audio Reference",
    "def": "describes the emerging audio technology of using wireless ultrasonic signals and nonlinear signal mixing techniques to produce sound located only in very specific areas. First discovered and described by Helmholtz in the late 1800s, it is now finding use in ATMs, dynamic signage and museum exhibits. For examples see: American Technology Corporation\u2019s HSS\u00ae HyperSonic Sound products and Sennheiser\u2019s Audiobeam.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hypertext Within WWW documents,": {
    "term": "hypertext Within WWW documents,",
    "cat": "Pro Audio Reference",
    "def": "the linking of words to other sections of text, pictures or sound is called hypertext. Hypertext is created using the HTML software language. Also used frequently in Help files.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "hysteresis Magnetism&": {
    "term": "hysteresis Magnetism&",
    "cat": "Electronics",
    "def": "The lagging of an effect behind its cause, as when the change in magnetism of a body lags behind changes in the magnetic field. [AHD] The maximum difference in value for a digitizer code transition level when the transition level is approached from either side of the transition. [IEEE] In simple terms a circuit that has a different threshold point going high than it does going low. The phenomenon was identified, and the term coined, by Sir James Alfred Ewing in 1890. [From Wikipedia: hysteresis]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "Hz": {
    "term": "Hz",
    "cat": "Terminology",
    "def": "See: hertz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (H)"
  },
  "j": {
    "term": "j",
    "cat": "Mathematics",
    "def": "The symbol for the imaginary number , i.e., a number representing the square root of -1. See: complex number. [A lower case \u201ci\u201d is also used in mathematics but not in electronics since \u201ci\u201d is the symbol for current.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "J": {
    "term": "J",
    "cat": "Terminology",
    "def": "The symbol for joule, the SI unit of energy or work.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jabber To": {
    "term": "jabber To",
    "cat": "Pro Audio Reference",
    "def": "talk rapidly, unintelligibly, or idly. To utter rapidly or unintelligibly. Rapid or babbling talk. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jack Musical Instrument": {
    "term": "jack Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "The part of a harpsichord action that carries the plectrum past the string. The word is also used for the pivoted vertical lever in a piano action that forces the hammer upward when a key is depressed. [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jacket Wire & Cable": {
    "term": "jacket Wire & Cable",
    "cat": "Pro Audio Reference",
    "def": "The insulating layer of material that surrounds a wire or cable offering protection; also called sheath.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jackfield British": {
    "term": "jackfield British",
    "cat": "Pro Audio Reference",
    "def": "term for patchbay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jack Mullin": {
    "term": "Jack Mullin",
    "cat": "Pro Audio Reference",
    "def": "See: John Mullin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jacks and": {
    "term": "jacks and",
    "cat": "Pro Audio Reference",
    "def": "plugs Common name for audio connectors, where jack = female and plug = male is the standard convention for 1/4\u2033 and RCA \u2014 only \u2014 not followed for other types of connectors. If a connector is on the end of a cable \u2014 XLR and others \u2014 then either sex is a plug. [Hey, don\u2019t yell at me, I don\u2019t make the rules; I just report them.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jackson, Bruce": {
    "term": "Jackson, Bruce",
    "cat": "Pro Audio Reference",
    "def": "(1948-2011) Australian audio engineering sound pioneer who did live sound for Elvis Presley, Bruce Springsteen, Barbara Streisand and others. He started out cofounding JANDS and went on to invent and develop many digital audio innovations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jacob\u2019s ladder": {
    "term": "Jacob\u2019s ladder",
    "cat": "Pro Audio Reference",
    "def": "(aka high voltage traveling arc) Electricity & Magnetism. \u201cThe spark gap is formed by two wires, approximately vertical but gradually diverging away from each other towards the top in a narrow \u201cV\u201d shape. It was named for the \u201cladder to heaven\u201d described in the Bible.\u201d [From the Wikipedia link, found about halfway down the page on spark gaps.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JADE (Joint": {
    "term": "JADE (Joint",
    "cat": "Pro Audio Reference",
    "def": "Audio Decoder Encoder) Siemens trademark for their device that implements voice compression algorithms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JAES (Journal of": {
    "term": "JAES (Journal of",
    "cat": "Pro Audio Reference",
    "def": "the Audio Engineering Society) Also see: AES.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jaguar rock": {
    "term": "Jaguar rock",
    "cat": "Pro Audio Reference",
    "def": "See: Human Jukebox.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "ja": {
    "term": "ja",
    "cat": "Terminology",
    "def": "ja Spanish laugh.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jaleika (also": {
    "term": "jaleika (also",
    "cat": "Pro Audio Reference",
    "def": "spelled zhaleika) Musical Instrument. Russian wind instrument made from cow horn.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jam session": {
    "term": "jam session",
    "cat": "Music",
    "def": "An informal gathering of musicians to play improvised or unrehearsed music. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jam sync 1": {
    "term": "jam sync 1",
    "cat": "Pro Audio Reference",
    "def": "The process of regenerating SMPTE timecode from an original source. Used for repair as well as for new copies. 2. A recording studio in Nashville specializing in multichannel and multimedia founded by KK Proffitt and Joel Silverman.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jamaican Patois": {
    "term": "Jamaican Patois",
    "cat": "Pro Audio Reference",
    "def": "A West African influenced creole language spoken primarily in Jamaica.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "James Bullough": {
    "term": "James Bullough",
    "cat": "Pro Audio Reference",
    "def": "Lansing (James Martini, 1902-1949) American entrepreneur and inventor most famous for his companies: Lansing Manufacturing, Altec-Lansing and JBL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "James T": {
    "term": "James T",
    "cat": "Pro Audio Reference",
    "def": "Russell American physicist who came up with a CD concept in 1965 that he licensed to Sony in 1970. See: Klass Compaan.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jamming Wire & Cable": {
    "term": "jamming Wire & Cable",
    "cat": "Pro Audio Reference",
    "def": "The wedging of cables in a conduit when three cables lie side by side in a flat plane. [IEEE Std 576]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JANDS Famous": {
    "term": "JANDS Famous",
    "cat": "Pro Audio Reference",
    "def": "pro audio, lighting and staging company, which started out as a distributor in Australia. See: Pro Audio Names Section",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "janggu Muscial Instrument": {
    "term": "janggu Muscial Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Korean two-headed hand drum.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jangle To make": {
    "term": "jangle To make",
    "cat": "Pro Audio Reference",
    "def": "a harsh metallic sound: The spurs jangled noisily. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jangle pop": {
    "term": "jangle pop",
    "cat": "Pro Audio Reference",
    "def": "The first and most famous jangle pop band was The Byrds.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Janissary music": {
    "term": "Janissary music",
    "cat": "Pro Audio Reference",
    "def": "An ensemble of Turkish percussion instruments introduced into European military music in the 18th century an later adopted by the orchestra; it also refers to the kind of music composed for such a group. [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Janovsky, W": {
    "term": "Janovsky, W",
    "cat": "Pro Audio Reference",
    "def": "German engineer responsible for one of the earliest papers on non-linear distortion thresholds as published in his 1929 paper: \u201cThe Audibility of Distortion (in German language), Elek. Nachr.-Tech., vol. 6, pp. 421-439 (Nov., 1929).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jansky Abbr": {
    "term": "jansky Abbr",
    "cat": "Pro Audio Reference",
    "def": "Jy A unit of spectral power flux density: 10-26 times one watt per square meter per Hertz (IEEE Std 211). Also called the flux unit.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jarana jarocha Musical Instrument": {
    "term": "jarana jarocha Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Stringed guitar-like fretted instrument with eight strings.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JASA (Journal of": {
    "term": "JASA (Journal of",
    "cat": "Pro Audio Reference",
    "def": "the Acoustical Society of America) Also see: ASA",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jass Jazz": {
    "term": "jass Jazz",
    "cat": "Pro Audio Reference",
    "def": "music, written both ways from 1913 up until around 1920, when the word \u201cjazz\u201d became the accepted spelling. [Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jawaiian": {
    "term": "Jawaiian",
    "cat": "Music",
    "def": "A reggae genre combining traditional Hawaiian and Jamaican styles. Compare with reggaeton.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JavaTM": {
    "term": "JavaTM",
    "cat": "Pro Audio Reference",
    "def": "The trademarked name for a powerful object-oriented programming language developed by Sun Microsystems. Java allows high-speed fully interactive Web pages to be developed for the Internet or any type of platform.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jazz": {
    "term": "jazz",
    "cat": "Pro Audio Reference",
    "def": "A style of music, native to America, characterized by a strong but flexible rhythmic understructure with solo and ensemble improvisations on basic tunes and chord patterns and, more recently, a highly sophisticated harmonic idiom. [AHD] See jass.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jazz birthplace": {
    "term": "jazz birthplace",
    "cat": "Pro Audio Reference",
    "def": "Recognized as Armstrong Park, in the Trem\u00e9 section of New Orleans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jazz Fest": {
    "term": "Jazz Fest",
    "cat": "Pro Audio Reference",
    "def": "Music festival held annually in New Orleans featuring mostly jazz musicians.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jazz Festivals": {
    "term": "Jazz Festivals",
    "cat": "Pro Audio Reference",
    "def": "Worldwide Incredible online database of over 1,200 jazz festivals held in 45+ countries worldwide.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jecklin disk": {
    "term": "Jecklin disk",
    "cat": "Microphones",
    "def": "Official name, after inventor J\u00fcrg Jecklin, the former Swiss Radio chief sound engineer, for placing a baffle between two microphones in an AB setup.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JEDEC (Joint": {
    "term": "JEDEC (Joint",
    "cat": "Pro Audio Reference",
    "def": "Electron Device Engineering Council) Standards creating body for the microelectronics industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jeep Probably pronunciation of": {
    "term": "jeep Probably pronunciation of",
    "cat": "Pro Audio Reference",
    "def": "the letters \u201cGP\u201d, the designation for this vehicle in the manufacturer\u2019s parts numbering system : G(overnment) + P, designator for 80-inch wheelbase reconnaissance car. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JEITA (Japan": {
    "term": "JEITA (Japan",
    "cat": "Pro Audio Reference",
    "def": "Electronics and Information Technology Industries Association) A trade organization for the electronics and IT industries.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jellyfish display Multichannel Sound": {
    "term": "jellyfish display Multichannel Sound",
    "cat": "Pro Audio Reference",
    "def": "A type of metering used to display multichannel surround sound characteristics, i.e., usually the relative amplitude between channels; so-called for its roundish changing jellyfish-like pattern.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jerk": {
    "term": "jerk",
    "cat": "Mathematics",
    "def": "The (first) derivative of acceleration, i.e., it is a measure of the rate of change of acceleration \u2014 just as velocity is the derivative of speed, and acceleration is the derivative of velocity. Elevator makers are among those interested in measuring it. For example Otis Elevator Company has a transducer that measures jerk by differentiating acceleration. (Thanks to Glenn White for the Otis information.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jerking or jerkin\u2019 Hip-Hop Dance Style": {
    "term": "jerking or jerkin\u2019 Hip-Hop Dance Style",
    "cat": "Pro Audio Reference",
    "def": "Originated in Los Angeles, it is a dance movement consisting of rapidly moving your legs in and out, as well as other complicated moves.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jet\u00e9 Music Terminology": {
    "term": "jet\u00e9 Music Terminology",
    "cat": "Pro Audio Reference",
    "def": "In string playing, a bowstroke that bounces or ricochets off the string. [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jewish telegram \u201cStart worrying": {
    "term": "Jewish telegram \u201cStart worrying",
    "cat": "Pro Audio Reference",
    "def": "Details to follow.\u201d [Newton]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jew\u2019s harp Musical Instrument": {
    "term": "jew\u2019s harp Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A small musical instrument consisting of a lyre-shaped metal frame that is held between the teeth and a projecting steel tongue that is plucked to produce a soft twanging sound. [AHD] [For those controlled by political correctness, the revised name is \u201cjaws harp.\u201d ]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JFET (junction": {
    "term": "JFET (junction",
    "cat": "Pro Audio Reference",
    "def": "field-effect transistor) See FET",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jiaohu Musical Instrument": {
    "term": "jiaohu Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Chinese bowed string instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jiffy": {
    "term": "jiffy",
    "cat": "Pro Audio Reference",
    "def": "An actual unit of time, representing 1/100th of a second. [See Rowlett\u2019s \u201cHow Many? A Dictionary of Units of Measurement\u201d for the complete details.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jig": {
    "term": "jig",
    "cat": "Music",
    "def": "Any of various lively dances in triple time. The music for such a dance. Also called gigue. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jiggumbob": {
    "term": "jiggumbob",
    "cat": "Pro Audio Reference",
    "def": "A trinket; a knick-knack; a slight contrivance in machinery. [Lynch]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jim Williams": {
    "term": "Jim Williams",
    "cat": "Pro Audio Reference",
    "def": "(1948-2011) American engineer, analog IC guru, and cofounder of Linear Technology. Wonderful tribute video here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jimmy Savile": {
    "term": "Jimmy Savile",
    "cat": "Pro Audio Reference",
    "def": "(1926-2011) Scandalous British radio disc jockey credited as the first person to launch a DJ dance party in 1943 in Otley, England, and later resulted in the first known simultaneous use of two turntables to keep the music going continuously.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jinghu Musical Instrument": {
    "term": "jinghu Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Chinese bowed 2-stringe fiddle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jingle Noun 1": {
    "term": "jingle Noun 1",
    "cat": "Pro Audio Reference",
    "def": "The sound produced by or as if by bits of metal striking together. 2. A piece of light singsong verse or rhyme. 3. A catchy, often musical advertising slogan. Verb 1. To make a tinkling or ringing metallic sound. 2. To have the catchy sound of a simple, repetitious rhyme or doggerel. To cause to make a tinkling or ringing metallic sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JIRA Software": {
    "term": "JIRA Software",
    "cat": "Pro Audio Reference",
    "def": "Popular software development tool that eases bug tracking, issue tracking and project management. The name is not an acronym; it is a truncation of the word \u201cGojira,\u201d which is the Japanese name for Godzilla, that wonderful fictional Japanese monster.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jit Dance": {
    "term": "jit Dance",
    "cat": "Music",
    "def": "Fast guitar and drum rhythm popular in Zimbabwe. Hit the link for all the details. See also: Detroit Jit.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JITC (Joint": {
    "term": "JITC (Joint",
    "cat": "Pro Audio Reference",
    "def": "Interoperability Test Command) A military compatibility testing organization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jitter": {
    "term": "jitter",
    "cat": "Pro Audio Reference",
    "def": "A tendency towards lack of synchronization caused by electrical changes. Technically the unexpected (and unwanted) phase shift of digital pulses over a transmission medium. Time skew; a discrepancy between when a digital edge transition is supposed to occur and when it actually does occur \u2014 think of it as nervous digital, or maybe a digital analogy to wow and flutter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Here": {
    "term": "Here",
    "cat": "Pro Audio Reference",
    "def": "is the official definition from AES-12id, AES Information Document for Digital audio measurements \u2014 Jitter performance specifications:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "\u201cJitter": {
    "term": "\u201cJitter",
    "cat": "Pro Audio Reference",
    "def": "is the dynamic deviation of event instants in a stream or signal from their positions in time, excluding modulation components below 10 Hz.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jitter timing": {
    "term": "jitter timing",
    "cat": "Pro Audio Reference",
    "def": "error Short-term deviations of the transitions of a digital signal from their ideal positions in time.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "J.": {
    "term": "J.",
    "cat": "Terminology",
    "def": "J. Cale (1938-2013) American musician who was a major songwriter and influence on Neil Young, Eric Clapton, Lynyrd Skynyrd and John Mayer, among many others. He wrote some of the \u201960s and \u201970s top songs, including \u201cCocaine,\u201d \u201cAfter Midnight,\u201d and \u201cCall Me The Breeze.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jnd (just noticeable difference) Physiology": {
    "term": "jnd (just noticeable difference) Physiology",
    "cat": "Pro Audio Reference",
    "def": "The smallest difference in a sensory input detectable by a human being.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Joe, cup of Coffee": {
    "term": "Joe, cup of Coffee",
    "cat": "Pro Audio Reference",
    "def": "There is no clear origin but according to World Wide Words the most probable suggestion is that it is a modification of java or jamoke for coffee and that \u201cIt is significant that an early example appears in 1931 in the Reserve Officer\u2019s Manual by a man named Erdman: \u2018Jamoke, Java, Joe. Coffee. Derived from the words Java and Mocha, where originally the best coffee came from\u2019.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Joel, Irving": {
    "term": "Joel, Irving",
    "cat": "Pro Audio Reference",
    "def": "(\u201cIrv\u201d) Louis (1931-2015) American recording engineer and a very early member of the AES joining in 1957. His participation earned him multiple awards, including the AES Distinguished Service award in 2009.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "John T": {
    "term": "John T",
    "cat": "Pro Audio Reference",
    "def": "\u201cJack\u201d Mullin (1913\u20131999) American who pioneered modern tape recording based on his discovery of the first German tape recorders during WWII.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Johnston factor": {
    "term": "Johnston factor",
    "cat": "Pro Audio Reference",
    "def": "The ratio of fh/fl, where fh and fl are the highest and the lowest signal frequency limits, respectively. When the signal or waveform\u2019 Johnston factor is larger than the fraction 9/7 or decimal 1.3, corresponding to a fractional bandwidth of 0.25, the signal or waveform is UWB.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Johnson noise": {
    "term": "Johnson noise",
    "cat": "Pro Audio Reference",
    "def": "or thermal noise A form of white noise resulting from thermal agitation in electronic components. For example, a simple resistor hooked up to nothing generates noise, and the larger the resistor value the greater the noise. It is called thermal noise or Johnson noise and results from the motion of electron charge of the atoms making up the resistor (called thermal agitation, which is caused by heat \u2013 the hotter the resistor, the noisier. [After John Bertrand Johnson (1887-1970), Swedish-born American physicist who first observed thermal noise while at Bell Labs in 1927, publishing his findings as \u201cThermal agitation of electricity in conductors,\u201d Phys. Rev., vol. 32, pp. 97-109, 1928.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "John William": {
    "term": "John William",
    "cat": "Pro Audio Reference",
    "def": "Strutt See: Lord Rayleigh",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "joint probability": {
    "term": "joint probability",
    "cat": "Mathematics",
    "def": "The likelihood that two or more things will occur together.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jones, R.G": {
    "term": "Jones, R.G",
    "cat": "Pro Audio Reference",
    "def": "Founded in 1926, near London by Reginald Geoffrey Jones, the RG Jones company, along with Swanson Sound Service (Oakland, CA) are considered the first sound companies, and both are still going strong.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jookin Street": {
    "term": "jookin Street",
    "cat": "Pro Audio Reference",
    "def": "dance born in Memphis.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Joplin, Scott(1867-1917)": {
    "term": "Joplin, Scott(1867-1917)",
    "cat": "Pro Audio Reference",
    "def": "American musician and composer of ragtime music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jordan, Vilhelm L": {
    "term": "Jordan, Vilhelm L",
    "cat": "Pro Audio Reference",
    "def": "(1909-1982) Danish acoustics engineer, who, among many other designs, consulted on the Sydney Opera House, and authored Acoustical Design of Concert Halls and Theatres: A Personal Account.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jouhikko Finnish": {
    "term": "jouhikko Finnish",
    "cat": "Pro Audio Reference",
    "def": "bowed lyre.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "joule Abbr": {
    "term": "joule Abbr",
    "cat": "Pro Audio Reference",
    "def": "J or j. 1. The International System unit of electrical, mechanical, and thermal energy. 2. a. A unit of electrical energy equal to the work done when a current of one ampere is passed through a resistance of one ohm for one second. b. A unit of energy equal to the work done when a force of one newton acts through a distance of one meter. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Joule, James": {
    "term": "Joule, James",
    "cat": "Pro Audio Reference",
    "def": "Prescott (1818-1889) British physicist who established the mechanical theory of heat and discovered the first law of thermodynamics: a form of the law of conservation of energy whose discovery he shared with Hermann von Helmholtz, Julius von Mayer and Lord Kelvin. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Joule\u2019s Law It": {
    "term": "Joule\u2019s Law It",
    "cat": "Pro Audio Reference",
    "def": "was James Prescott Joule (see above) who came up with (and published in 1841) the basic power equations P = I2R; P = IE; & P = E2/R, NOT Georg Simon Ohm as is commonly believed. Contrast with Ohm\u2019s Law.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "joystick Potentiometer/Encoders": {
    "term": "joystick Potentiometer/Encoders",
    "cat": "Pro Audio Reference",
    "def": "A type of potentiometer or digital encoder with movement over two axes (sometimes three with the third being in-out, z-axis). [This is also called two or three degrees of freedom]. Usually the axis are left-right, x-axis, and up-down (or away-toward), y-axis, with each controlling a separate potentiometer or encoder. The term is borrowed from aviation technology meaning an aircraft control stick.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JPEG (Joint": {
    "term": "JPEG (Joint",
    "cat": "Pro Audio Reference",
    "def": "Photographic Experts Group) A standard for lossy compression of graphic-image files.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JSA (Japanese Standards Association)": {
    "term": "JSA (Japanese Standards Association)",
    "cat": "Pro Audio Reference",
    "def": "The National Standards organization responsible for coordinating standards preparation in Japan.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "j\u00f9j\u00fa Music": {
    "term": "j\u00f9j\u00fa Music",
    "cat": "Pro Audio Reference",
    "def": "A style of Nigerian popular music featuring electric guitars and traditional drums. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "juke": {
    "term": "juke",
    "cat": "Pro Audio Reference",
    "def": "A roadside drinking establishment that offers inexpensive drinks, food, and music for dancing, especially to the music of a jukebox. [Derivative Note: probably from Gullah juke, joog disorderly, wicked of West African origin; Wolof dzug to live wickedly Mandingo (Bambara) dzugu wicked. Gullah, the English-based Creole language spoken by Black people off the coast of Georgia and South Carolina, retains a number of words from the West African languages brought over by slaves. One such word is juke, \u2014 bad, wicked, disorderly, \u2014 the probable source of the English word juke.] Used chiefly in the Southeastern states, juke (also appearing in the compound juke joint) means a roadside drinking establishment that offers cheap drinks, food, and music for dancing and often doubles as a brothel. \u201cTo juke\u201d is to dance, particularly at a juke joint or to the music of a jukebox whose name, no longer regional and having lost the connotation of sleaziness, contains the same word. [AHD] \u2026 and you thought you were smart.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "Jukebox Multimedia Portable Media Player": {
    "term": "Jukebox Multimedia Portable Media Player",
    "cat": "Pro Audio Reference",
    "def": "Developed by Archos and released in 2002, it is recognized as the first handheld MP3/MP4 media player, combining an audio player, image viewer and video player.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "julian date": {
    "term": "julian date",
    "cat": "Pro Audio Reference",
    "def": "A chronological year date system where the days are sequentially numbered beginning with January 1, 4713 BC, Greenwich noon. Here is a handy converter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jump cut Broadcast": {
    "term": "jump cut Broadcast",
    "cat": "Pro Audio Reference",
    "def": "An edit between two video shots or audio sound bites that creates a \u201cjump\u201d or break in continuity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "jumper": {
    "term": "jumper",
    "cat": "Electronics",
    "def": "A conductor placed across the clear space between the ends of two conductors, or to connect conductors on different layers, on a printed circuit board.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "junction": {
    "term": "junction",
    "cat": "Semiconductors",
    "def": "The transition boundary between semiconductor regions of different electrical properties (e.g., n-n+, p-n, p-p+ semiconductors, or between a metal and a semiconductor). [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "junction, rectifying": {
    "term": "junction, rectifying",
    "cat": "Semiconductors",
    "def": "A region between two materials, typically n-type or p-type semiconductors, or between a metal and a semiconductor, arranged to provide a very low resistance to current flow in one direction and a very high resistance to current flow in the opposite direction. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "JUST Abbreviation": {
    "term": "JUST Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for Department of Justice, also known as DOJ. [IEEE Std 1512.2\u2122-2004, IEEE Standard for Public Safety Traffic Incident Management Message Sets for Use by Emergency Management Centers]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "just intonation or just temperament": {
    "term": "just intonation or just temperament",
    "cat": "Music",
    "def": "A musical scale employing frequency intervals represented by the ratios of the smaller integers of the harmonic series. [Olson] Compare with equal temperament.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "just noticeable": {
    "term": "just noticeable",
    "cat": "Pro Audio Reference",
    "def": "difference See: jnd.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "justify To shift": {
    "term": "justify To shift",
    "cat": "Pro Audio Reference",
    "def": "a numeral so that the most significant digit, or the least significant digit, is placed at a specific position in a row.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (J)"
  },
  "k": {
    "term": "k",
    "cat": "Terminology",
    "def": "The symbol for kilo.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K": {
    "term": "K",
    "cat": "Terminology",
    "def": "The symbol for Kilo.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K2HD (K2 High Definition) Recording Mastering": {
    "term": "K2HD (K2 High Definition) Recording Mastering",
    "cat": "Pro Audio Reference",
    "def": "A high-end CD mastering and re-mastering technique developed by JVC that uses 24-bit, 192 kHz sampling for all mastering steps up to the final 16-bit CD pressing. Said to give the listener the best possible 16-bit CD recording.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K2-W Designation for": {
    "term": "K2-W Designation for",
    "cat": "Pro Audio Reference",
    "def": "a famous tube-based \u2018modern\u2019 general-purpose operational amplifier built by Philbrick beginning in 1951.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "ka 1.": {
    "term": "ka 1.",
    "cat": "Electronics",
    "def": "Abbreviation for cathode. 2. Philosophy. Egyptian concept of duality, which is also an important electronics concept \u2014 check out the link.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kabuki": {
    "term": "Kabuki",
    "cat": "Theater",
    "def": "A type of popular Japanese drama, evolved from the older No theater, in which elaborately costumed performers, nowadays men only, use stylized movements, dances, and songs in order to enact tragedies and comedies. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kahn, Al": {
    "term": "Kahn, Al",
    "cat": "Pro Audio Reference",
    "def": "(1906-2005) American entrepreneur who cofounded Electro-Voice with Lou Burroughs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kaisermarsch": {
    "term": "Kaisermarsch",
    "cat": "Music",
    "def": "Work by Wagner for unison male voices and orchestra (1871), celebrating the German victory in the Franco-Prussian War and the election of Wilhelm I as emperor. [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kalimba Musical Instrument": {
    "term": "kalimba Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "The original thumb piano.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kaman, Charles H": {
    "term": "Kaman, Charles H",
    "cat": "Pro Audio Reference",
    "def": "(1919-2011) American musical pioneer (as well as an aeronautical engineer) who developed the Ovation \u00ae Roundback guitar and went on to found Kaman Corporation, now KMC Music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kamanche Musical Instruments": {
    "term": "kamanche Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A bowed spike fiddle of Middle East origin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K\u00e1m\u00e1n Line Astronomy": {
    "term": "K\u00e1m\u00e1n Line Astronomy",
    "cat": "Pro Audio Reference",
    "def": "The boundary between Earth\u2019s atmosphere and space (the edge of space) that lies roughly 100 km above sea level.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kankles Musical Instrument": {
    "term": "kankles Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Lithuanian zither.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kantor (also cantor) Christianity": {
    "term": "kantor (also cantor) Christianity",
    "cat": "Pro Audio Reference",
    "def": "Title of a church musician.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Ka-on vase": {
    "term": "Ka-on vase",
    "cat": "Pro Audio Reference",
    "def": "A flower vase fitted with audio input ports that use the flowers as loudspeakers. Invented by Let\u2019s Corporation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "karaoke": {
    "term": "karaoke",
    "cat": "Music",
    "def": "1. A music entertainment system providing prerecorded accompaniment to popular songs that a performer sings live, usually by following the words on a video screen. 2. The performance of such music. [From Japanese: kara, void, empty + oke(sutora), orchestra.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "karaokeal amnesia": {
    "term": "karaokeal amnesia",
    "cat": "Pro Audio Reference",
    "def": "\u201cMost people don\u2019t know the complete lyrics to almost any song, particularly the ones they hold most dear.\u201d [A Dictionary of the Near Future by Douglas Coupland, NY Times, September 12, 2010.] See also: lyrical putty.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "karat also carat Abbr": {
    "term": "karat also carat Abbr",
    "cat": "Pro Audio Reference",
    "def": "k or kt. A unit of measure for the fineness of gold, equal to 1/24 part. Pure gold is 24 karat; gold that is 50 percent pure is 12 karat. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Karnaugh map Mathematics of Computing": {
    "term": "Karnaugh map Mathematics of Computing",
    "cat": "Pro Audio Reference",
    "def": "A rectangular diagram of a logical expression drawn with overlapping rectangles representing a unique combination of the logic variables such that an intersection is shown for all combinations. The rows and columns are headed with combinations of the variables in a Gray code sequence. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kasik (spoon) Musical Instrument": {
    "term": "kasik (spoon) Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Turkish percussion instrument shaped and played like a spoon.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Katodophone Name for": {
    "term": "Katodophone Name for",
    "cat": "Pro Audio Reference",
    "def": "a microphone without mechanical moving parts based on recording the density variations in ionized air between an anode and a cathode caused by sound waves. First used to add sound to film in 1918, invented and patented by Han Vogt, Joseph Engl and Joseph Mass Olle who formed the German film company, Tri-Ergon (translates into \u201ca work of three.\u201d)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "katzenklavier See:": {
    "term": "katzenklavier See:",
    "cat": "Pro Audio Reference",
    "def": "cat organ.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kaval Musical Instrument": {
    "term": "kaval Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Bulgarian rim-blown flute, typically made from plum tree wood..",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kazoo": {
    "term": "kazoo",
    "cat": "Pro Audio Reference",
    "def": "A toy musical instrument with a membrane that produces a buzzing sound when a player hums or sings into the mouthpiece. The word origin is believed to come being imitative of its sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kb": {
    "term": "kb",
    "cat": "Terminology",
    "def": "See kilobit",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kB": {
    "term": "kB",
    "cat": "Terminology",
    "def": "See kilobyte",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kb": {
    "term": "Kb",
    "cat": "Terminology",
    "def": "See Kilobit",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KB": {
    "term": "KB",
    "cat": "Terminology",
    "def": "See Kilobyte",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KCL See:": {
    "term": "KCL See:",
    "cat": "Pro Audio Reference",
    "def": "Kirchoff\u2019s Current Law.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "keeper": {
    "term": "keeper",
    "cat": "Pro Audio Reference",
    "def": "A bar of material (usually soft iron) with very high magnetic permeability placed across the poles of a permanent magnet (effectively shorting out the magnetic field) to protect it from demagnetization. Most often seen on horseshoe or U-shaped magnets. [Thanks to Glenn White.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Keith Emerson": {
    "term": "Keith Emerson",
    "cat": "Pro Audio Reference",
    "def": "(1944-2016) Brilliant British musician composer and founding member of Emerson, Lake & Palmer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kellems\u00ae": {
    "term": "Kellems\u00ae",
    "cat": "Pro Audio Reference",
    "def": "A registered trademark of Hubbel Inc. for their series of wire mesh grips creating strain relief between electrical cables and connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kell factor": {
    "term": "Kell factor",
    "cat": "Video",
    "def": "After RCA researcher Ray Kell who discovered in 1934 the phenomenon that the actual human visual resolution is only about 70% of the number of physical lines used in a video system. That is, humans have a reduced visual resolution due to line-scanning structures. Visual information is lost due to the probability that some of the video information will be displayed during the retrace instead of the active portion of the scan line. Even though it may seem like half the information would be lost because there are equal number of scan and retrace lines, empirically it has been shown that about 30% is lost to this effect, yielding a Kell factor of about 0.7. (Bandwidth Versus Video Resolution, Maxim Application Note 750.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kellogg, Edward & Chester Rice": {
    "term": "Kellogg, Edward & Chester Rice",
    "cat": "Loudspeakers",
    "def": "General Electric researchers who invented and patented the moving-coil direct-radiator loudspeaker in 1925.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kelvin Abbr": {
    "term": "kelvin Abbr",
    "cat": "Pro Audio Reference",
    "def": "K The International System unit of absolute temperature equal to 1/273.16 of the absolute temperature of the triple point of water. This unit is equal to one Celsius degree. A temperature in kelvin may be converted to Celsius by subtracting 273.16. (After First Baron Kelvin) [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kelvin, William": {
    "term": "Kelvin, William",
    "cat": "Pro Audio Reference",
    "def": "Thomson, First Baron (1824-1907) British physicist who developed the Kelvin scale of temperature (1848) and supervised the laying of a transatlantic cable (1866). His pioneering work in thermodynamics and electricity helped develop the law of the conservation of energy. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kelvin worked out": {
    "term": "Kelvin worked out",
    "cat": "Pro Audio Reference",
    "def": "an improved method for measuring the depth of the sea using piano wire and a narrow-bore glass tube, stoppered at the upper end. While experimenting with this invention, he was interrupted one day by his colleague James Prescott Joule. Looking with astonishment at the lengths of piano wire, Joule asked him what he was doing. \u201cSounding,\u201d said Thompson. \u201cWhat note?\u201d asked Joule. \u201cThe deep C,\u201d returned Thompson. [Bartlett\u2019s Book of Anecdotes]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kelvin connection": {
    "term": "Kelvin connection",
    "cat": "Pro Audio Reference",
    "def": "also 4-wire Kelvin connection A 4-wire, 2-pair, connection used to make resistance measurements that are independent of the measuring lead resistance \u2014 one pair is a current source and the other pair is a voltmeter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kemen\u00e7e (of": {
    "term": "kemen\u00e7e (of",
    "cat": "Pro Audio Reference",
    "def": "the Black Sea) Musical Instrument. A bowed Persian folk instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kena See:": {
    "term": "kena See:",
    "cat": "Pro Audio Reference",
    "def": "quena.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kennelly, Arthur E": {
    "term": "Kennelly, Arthur E",
    "cat": "Pro Audio Reference",
    "def": "(1861-1939) An Iris-American engineer who was professor of electrical engineering at Harvard University and later at the Massachusetts Institute of Technology. In 1893, he presented his famous \u201cImpedance\u201d paper to the American Institute of Electrical Engineers. In it he demonstrated the first use of complex numbers as applied to Ohm\u2019s Law in alternating current circuit theory.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kerfuffle Fuss,": {
    "term": "kerfuffle Fuss,",
    "cat": "Pro Audio Reference",
    "def": "commotion, disorder, agitation. [OED]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kernel Software": {
    "term": "kernel Software",
    "cat": "Pro Audio Reference",
    "def": "That portion of an operating system that is kept in main memory at all times. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Keronite\u00ae Name of": {
    "term": "Keronite\u00ae Name of",
    "cat": "Pro Audio Reference",
    "def": "a company and of a surface treatment of light alloys that has the potential for creating superb loudspeaker cones. For details see Steve Mowry\u2019s \u201cThe Keronite\u00ae Story\u201d.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kerr Effect (aka Faraday Effect)": {
    "term": "Kerr Effect (aka Faraday Effect)",
    "cat": "Physics",
    "def": "If an isotropic dielectric is placed in an electric field and a beam of light is passed through the sample orthogonally to the field then the material displays birefringence. (After Rev. John Kerr, M.A., LL.D., F.R.S. [1824-1907].) This forms the basis of recordable optical discs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kevlar\u00ae Registered trademark of DuPont": {
    "term": "Kevlar\u00ae Registered trademark of DuPont",
    "cat": "Pro Audio Reference",
    "def": "Material invented by DuPont chemist Stephanie Kwolek. Used in loudspeaker driver cones due to its high strength-to-weight ratio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "key": {
    "term": "key",
    "cat": "Music",
    "def": "1. The pitch of a voice or other sound. 2. The principal tonality of a work: an etude in the key of E. 3. A tonal system consisting of seven tones in fixed relationship to a tonic, having a characteristic key signature and being the structural foundation of the bulk of Western music; tonality. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "keyable or keying Signal Processors": {
    "term": "keyable or keying Signal Processors",
    "cat": "Pro Audio Reference",
    "def": "The ability to start or trigger a process by applying an external signal, usually to a side-chain.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "key lock": {
    "term": "key lock",
    "cat": "Music",
    "def": "Phrase for pitch matching two or more sources using pitch-shifting techniques. It refers to the fact that the key or pitch of the music remains the same, even though the tempo is changing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "keynote": {
    "term": "keynote",
    "cat": "Pro Audio Reference",
    "def": "The tonic of a musical key. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Key West": {
    "term": "Key West",
    "cat": "Pro Audio Reference",
    "def": "audion Nickname given the first use of the audion tube by the Navy at their wireless station in Key West, Florida.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K-factor or K-rating": {
    "term": "K-factor or K-rating",
    "cat": "Transformers",
    "def": "Transformers designed for operation in non-sinusoidal environments with non-linear loads.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KHN filter": {
    "term": "KHN filter",
    "cat": "Pro Audio Reference",
    "def": "See state-variable filter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kHz (kilohertz)": {
    "term": "kHz (kilohertz)",
    "cat": "Pro Audio Reference",
    "def": "One thousand (1,000) cycles per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kibi Symbol": {
    "term": "kibi Symbol",
    "cat": "Pro Audio Reference",
    "def": "Ki New term standardized by the IEC as Amendment 2 to IEC 60027-2 Letter Symbols to be Used in Electrical Technology to signify binary multiples of 1024 (i.e., 2E10). Meant to distinguish between exact binary and decimal quantities, i.e., 1024 verses 1000. For example, it is now 16 kibibits, abbreviated 16 Kib, not 16 kilobits or 16 Kb.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kik": {
    "term": "kik",
    "cat": "Recording",
    "def": "Popular jargon meaning \u201ckick\u201d (bass) drum sound or just the drum itself.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kilby, Jack": {
    "term": "Kilby, Jack",
    "cat": "Pro Audio Reference",
    "def": "American electrical engineer and Noble price winner for his invention of the monolithic integrated circuit while working for Texas Instruments.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kill switch DJ Mixers": {
    "term": "kill switch DJ Mixers",
    "cat": "Pro Audio Reference",
    "def": "Control for removing whole frequency sections like bass, mids or highs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kilo- Abbreviated k (always lower-case)": {
    "term": "kilo- Abbreviated k (always lower-case)",
    "cat": "Pro Audio Reference",
    "def": "A prefix signifying one thousand (10E3).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kilo- Abbreviated K (always upper-case)": {
    "term": "Kilo- Abbreviated K (always upper-case)",
    "cat": "Pro Audio Reference",
    "def": "A prefix popularly used in computer work to signify multiples of 1024 (i.e., 2E10), but should use kibi. Meant to distinguish base-2 (binary) from base-10 (decimal) magnitudes. For example, a \u201c16 K\u201d memory is actually 16,384 bits (i.e., 16 times 1024, or 2E14), but should now read \u201c16 Ki\u201d.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kilobit \u2013": {
    "term": "kilobit \u2013",
    "cat": "Pro Audio Reference",
    "def": "Abbreviated kb (lower-case k and b). A term signifying one thousand bits. Also kb/s or kbps for kilobits per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kilobit \u2013": {
    "term": "Kilobit \u2013",
    "cat": "Pro Audio Reference",
    "def": "Abbreviated Kb (upper-case K and lower-case b). A term signifying 1024 bits, but should use Kibibit. Also Kb/s or Kbps for Kilobits per second or Kibibits per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kilobyte \u2013": {
    "term": "kilobyte \u2013",
    "cat": "Pro Audio Reference",
    "def": "Abbreviated kB (lower-case k, upper case B ). A term signifying one thousand bytes. Also kB/s or kBps for kilobytes per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kilobyte \u2013": {
    "term": "Kilobyte \u2013",
    "cat": "Pro Audio Reference",
    "def": "Abbreviated KB (upper-case k and B). A popular term signifying 1024 bytes, but should use Kibibyte. Also KB/s or KBps for kilobytes per second or Kibibytes per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kilogram Abbr": {
    "term": "kilogram Abbr",
    "cat": "Pro Audio Reference",
    "def": "kg The base unit of mass in the International System, equal to 1,000 grams (2.2046 pounds). [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kilovar": {
    "term": "kilovar",
    "cat": "Pro Audio Reference",
    "def": "A unit equal to one thousand voltamperes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kinetoscope": {
    "term": "kinetoscope",
    "cat": "Pro Audio Reference",
    "def": "A motion picture system developed in 1891 by Thomas A. Edison and William Dickson, considered the predecessor of the movie projector.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kirchoff\u2019s Current Law Abbr. KCL": {
    "term": "Kirchoff\u2019s Current Law Abbr. KCL",
    "cat": "Electronics",
    "def": "The amount of current flowing into a node exactly equals the amount of current flowing out of the same node; or the sum of all currents flowing into a node equals zero. (After Gustav Robert Kirchoff.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kirchoff, Gustav": {
    "term": "Kirchoff, Gustav",
    "cat": "Pro Audio Reference",
    "def": "Robert (1824-1887) German physicist noted for his research in spectrum analysis, optics, and electricity. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kirchoff\u2019s Voltage Law Abbr. KVL": {
    "term": "Kirchoff\u2019s Voltage Law Abbr. KVL",
    "cat": "Electronics",
    "def": "The sum of all voltage drops and rises in a closed loop equals zero. (After Gustav Robert Kirchoff.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kirshner, Don": {
    "term": "Kirshner, Don",
    "cat": "Pro Audio Reference",
    "def": "(1934-2011) American record producer, manager and song publisher, as well as TV host and producer of rock concerts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KJ": {
    "term": "KJ",
    "cat": "Terminology",
    "def": "(karaoke jockey) As in DJ and VJ, only different.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Klass Compaan": {
    "term": "Klass Compaan",
    "cat": "Pro Audio Reference",
    "def": "Dutch physicist who came up with the idea for the CD in 1960. He teamed up with Philips and produced a glass prototype in 1970. See James T. Russell.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Klaus Quirini": {
    "term": "Klaus Quirini",
    "cat": "Pro Audio Reference",
    "def": "See: discotheque",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Klippel Analyzer System": {
    "term": "Klippel Analyzer System",
    "cat": "Pro Audio Reference",
    "def": "A new loudspeaker parameter measurement tool invented and developed by Wolfgang Klippel. Theory and details are covered in his AES 2000 convention paper: Diagnosis and Remedy of Nonlinearities in Electrodynamical Transducers. AES Preprint #5261. Lots of technical application note downloads available here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Klipsch, Paul W": {
    "term": "Klipsch, Paul W",
    "cat": "Pro Audio Reference",
    "def": "(1904-2002) American engineer and inventor best know for inventing the \u201cKlipschorn\u201d below. He was one of the American audio pioneers. Member of the Audio Hall of Fame.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Klipschorn\u00ae": {
    "term": "Klipschorn\u00ae",
    "cat": "Pro Audio Reference",
    "def": "A type of full-range loudspeaker developed in 1941 with a revolutionary low end (Paul W. Klipsch, \u201cA Low Frequency Horn of Small Dimensions,\u201d JASA, Vol. 13 October 1941; U.S. Pat. Nos. 2,310,243 & 2,373,692). By using the corner of the room as an extension of the folded horn within the cabinet, it was able to reproduce low-distortion tones down to 30 Hz. The Klipschorn is claimed as the only speaker in the world that has been in continuous production since the \u201940s. (After Paul W. Klipsch above.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kloss, Henry": {
    "term": "Kloss, Henry",
    "cat": "Pro Audio Reference",
    "def": "(1929-2002) American engineer and inventor, best known for co-developing the acoustic-suspension loudspeaker (along with Edgar Villchur) and the large-screen projection television; founded four successful consumer electronics companies: Acoustic Research, KLH, Advent and Cambridge SoundWorks. Member of the Audio Hall of Fame.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kludge or kluge": {
    "term": "kludge or kluge",
    "cat": "Pro Audio Reference",
    "def": "A system, especially a computer system, that is constituted of poorly matched elements or of elements originally intended for other applications. [AHD] Or as an article by Jackson Granholme in \u201cDatamation\u201d put it: \u201cAn ill-assorted collection of poorly matching parts, forming a distressing whole.\u201d [From AHD: The word kludge is not \u201cetymologist-friendly,\u201d having many possible origins, none of which can be definitively established. This term, found frequently in the jargon of the engineering and computer professions, denotes a usually workable but makeshift system, modification, solution, or repair. Kludge has had a relatively short life (first recorded in 1962 although it is said to have been used as early as 1944 or 1945) for a word with so many possible origins. The proposed sources of the word, German klug, kluge, \u201cintelligent, clever,\u201d or a blend of klutz and nudge or klutz and refudge, do not contain all the necessary sounds to give us the word, correctly pronounced at least. The notions that kludge may have been coined by a computer technician or that it might be the last name of a designer of graphics hardware seem belied by the possibility that it is older than such origins would allow. It seems most likely that the word kludge originally was formed during the course of a specific situation in which such a device was called for. The makers of the word, if still alive, are no doubt unaware that etymologists need information so they can stop trying to \u201ckludge\u201d an etymology together.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "klystron": {
    "term": "klystron",
    "cat": "Pro Audio Reference",
    "def": "The name \u2014 from the Greek, as coined by scientists at Stanford University \u2014 was registered by Sperry Gyroscope Company in the late 1930s for their velocity-modulated, ultra-high-frequency tube. As described by them in an ad published in a 1945 issue of Scientific American, \u201cit is an apt description of the bunching of electrons between spaced grids within the tube.\u201d In the spirit of voluntary standardization they gave the name to the public for free use as the designation for velocity-modulated tubes of any manufacture. [Old klystron tubes make the best TV lamps.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Knechtel, Larry": {
    "term": "Knechtel, Larry",
    "cat": "Pro Audio Reference",
    "def": "(1940-2009) American musician who won a Grammy for his arrangement of Simon and Garfunkel\u2019s \u201cBridge Over Troubled Water.\u201d For nearly 50 years he performed live and in the studio with top-selling artists.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "knee (of": {
    "term": "knee (of",
    "cat": "Pro Audio Reference",
    "def": "a curve) The point on a curve where change begins to occur; a section resembling the human knee exhibiting bending.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "knife switch": {
    "term": "knife switch",
    "cat": "Pro Audio Reference",
    "def": "A form of switch in which the moving element, usually a hinged blade, enters or embraces the stationary contact clips. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "knockout": {
    "term": "knockout",
    "cat": "Pro Audio Reference",
    "def": "A portion of the wall of a box or cabinet so fashioned that it may be readily removed by a hammer, screwdriver, and pliers at the time of installation in order to provide a hole for the attachment of a raceway cable or fitting. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "knoup To toll the church bell": {
    "term": "knoup To toll the church bell",
    "cat": "Pro Audio Reference",
    "def": "[Kacirk]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Knowles, Hugh S": {
    "term": "Knowles, Hugh S",
    "cat": "Pro Audio Reference",
    "def": "(1904-1988) American engineer and entrepreneur who founded Industrial Research Products in 1946 and Knowles Electronics in 1954.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Knuckles, Frankie": {
    "term": "Knuckles, Frankie",
    "cat": "Pro Audio Reference",
    "def": "(1955-2014) American DJ recognized as the \u201cgodfather of house music.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Knudsen, Vernon": {
    "term": "Knudsen, Vernon",
    "cat": "Pro Audio Reference",
    "def": "Oliver (1893-1974) American physicist who studied and worked under Dr. Harvey Fletcher , helped found the ASA, and was the first dean of the UCLA Physics Department, then vice chancellor of the university and finally chancellor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kobza Musical Instrument": {
    "term": "kobza Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Ancient plucked lute (also called Thracian lyre) found in eastern europe and still manufactured in Romania (click the link for photo and history).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kodak See": {
    "term": "Kodak See",
    "cat": "Pro Audio Reference",
    "def": "Muzak.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "konghou Musical Instrument": {
    "term": "konghou Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Chinese ancient instrument similar to a harp.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kora Musical Instrument": {
    "term": "kora Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "West African harp lute.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Korner Killer\u2122 Acoustics": {
    "term": "Korner Killer\u2122 Acoustics",
    "cat": "Pro Audio Reference",
    "def": "A trademark of RPG Diffuser Systems, Inc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K-pop (shortened": {
    "term": "K-pop (shortened",
    "cat": "Pro Audio Reference",
    "def": "form of Korean pop) Musical genre originating in South Korea in 1992, and is now a global phenomenon.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "krunk (or crunk)": {
    "term": "krunk (or crunk)",
    "cat": "Pro Audio Reference",
    "def": "A hip-hop music style born in Memphis, by Three 6 Mafia in the early \u201990s.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kSPS (kilo": {
    "term": "kSPS (kilo",
    "cat": "Pro Audio Reference",
    "def": "samples per second) One thousand (1,000) samples per second. A measurement of data converter speed.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "ku": {
    "term": "ku",
    "cat": "Terminology",
    "def": "band Telecommunications. Radio frequencies band of roughly 15 GHz to 18 GHz, used for satellite telecommunications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KUDO (K-Louver": {
    "term": "KUDO (K-Louver",
    "cat": "Pro Audio Reference",
    "def": "modular directivity United with DOSC waveguide technology) Loudspeakers. Designation by L-Acoustics for their line array.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "Kundt\u2019s tube Named after A.A": {
    "term": "Kundt\u2019s tube Named after A.A",
    "cat": "Pro Audio Reference",
    "def": "Kundt in 1866 who developed this apparatus for measuring the speed of sound in gases. It allows visualizing acoustic standing waves.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kunstkopf": {
    "term": "kunstkopf",
    "cat": "Recording",
    "def": "The German word for an artificial recording head, used primarily for binaural recordings.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K\u00fcpfm\u00fcller, Karl": {
    "term": "K\u00fcpfm\u00fcller, Karl",
    "cat": "Pro Audio Reference",
    "def": "(1897-1977) German engineer who was a university professor before becoming the Director of R&D at Siemens & Halske and made significant contributions to network theory, communications technology and acoustics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kVA (kilovoltamperes)": {
    "term": "kVA (kilovoltamperes)",
    "cat": "Pro Audio Reference",
    "def": "One thousand (1,000) voltamperes. See voltampere.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "kvar (Pronounced": {
    "term": "kvar (Pronounced",
    "cat": "Pro Audio Reference",
    "def": "kay var, with emphasis on the first syllable) a) The size or magnitude of a reactive power source, which would usually be measured in (units of) kilovar. b) Abbreviation for kilovar, a unit of reactive power. [ IEEE Std 1531]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KVL See": {
    "term": "KVL See",
    "cat": "Pro Audio Reference",
    "def": "Kirchoff\u2019s Voltage Law.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KVM (keyboard/video/mouse)": {
    "term": "KVM (keyboard/video/mouse)",
    "cat": "Computers",
    "def": "An adapter box that allows multiple computers to share the same keyboard, monitor and mouse.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "K-weighting See:": {
    "term": "K-weighting See:",
    "cat": "Pro Audio Reference",
    "def": "weighting filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "KZK (Khokhlov-Zabolotskaya-Kuznetsov) equation Nonlinear": {
    "term": "KZK (Khokhlov-Zabolotskaya-Kuznetsov) equation Nonlinear",
    "cat": "Acoustics",
    "def": "A one-way propagation equation for narrow-angle beams of sound, similar to the nonlinear propagation equation but not limited to lossless fluids. [Morfey]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (K)"
  },
  "L": {
    "term": "L",
    "cat": "Terminology",
    "def": "The electronic symbol for an inductor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "la": {
    "term": "la",
    "cat": "Music",
    "def": "The sixth tone of the diatonic scale in solfeggio. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAB (Live": {
    "term": "LAB (Live",
    "cat": "Pro Audio Reference",
    "def": "Audio Board) Topics related to sound reinforcement and application of audio for live events \u2014 the most active pro audio forum on the Web, created by road dog Dave Stevens and hosted by ProSoundWeb.com.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lacquer crackers": {
    "term": "lacquer crackers",
    "cat": "Pro Audio Reference",
    "def": "Records, platters, waxings, discs. [Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAeq See": {
    "term": "LAeq See",
    "cat": "Pro Audio Reference",
    "def": "equivalent continuous A-weighted sound pressure level.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Laff Box": {
    "term": "Laff Box",
    "cat": "Pro Audio Reference",
    "def": "Invented by American sound engineer Charles Douglass (1910-2003) in 1953, it provided canned laughter for TV programs, including I Love Lucy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lag": {
    "term": "lag",
    "cat": "Electronics",
    "def": "1. The difference in phase between a current and the voltage that produced it, expressed in electrical degrees. 2. The delay in action of a sensing element of a control element. [ IEEE Std 241]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "La": {
    "term": "La",
    "cat": "Terminology",
    "def": "MaMa An experimental theater club located in NY city, begun in 1961 by Ellen Stewart.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lamarr, Hedy": {
    "term": "Lamarr, Hedy",
    "cat": "Pro Audio Reference",
    "def": "(1924-2000) Born Hedy Kiesler in Vienna, this Hollywood actress used her knowledge of musical harmony, along with composer George Antheil, to obtain a patent on technology for military communications in 1942, establishing the groundwork for today\u2019s spread-spectrum communication technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lambeg drum Musical Instrument": {
    "term": "Lambeg drum Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Claimed to be one of the loudest (>120 dB) acoustic instruments in the world, it is a large Irish drum, beaten with curved rattan canes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAMC (Latin": {
    "term": "LAMC (Latin",
    "cat": "Pro Audio Reference",
    "def": "Alternative Music Conference) A yearly conference held in NY City, usually in July, featuring Latin alternative music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAN (local area network)": {
    "term": "LAN (local area network)",
    "cat": "Pro Audio Reference",
    "def": "A combination of at least two computers and peripherals on a common wiring scheme, which allows two-way communication of data between any devices on the network.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Laneway Festival See: St": {
    "term": "Laneway Festival See: St",
    "cat": "Pro Audio Reference",
    "def": "Jerome\u2019s Laneway Festival.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lansing Iconic Loudspeaker": {
    "term": "Lansing Iconic Loudspeaker",
    "cat": "Pro Audio Reference",
    "def": "The first recording studio monitor loudspeaker designed and manufactured by Lansing Manufacturing Company in 1927. Hit the link for pictures and details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Laplace, Marquis": {
    "term": "Laplace, Marquis",
    "cat": "Pro Audio Reference",
    "def": "Pierre Simon de (1749-1827) French mathematician and astronomer who formulated the theory of probability.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Laplace transform Electronic circuit analysis": {
    "term": "Laplace transform Electronic circuit analysis",
    "cat": "Pro Audio Reference",
    "def": "A powerful circuit analysis technique that transforms difficult differential equations into simple algebra problems. Omitting all the mathematical details to get to the essence, the Laplace transform substitutes the Laplace operator \u201cs\u201d to represent complex frequency impedances. Therefore inductive reactance, XL is represented by \u201csL\u201d and capacitive reactance, XC becomes 1/sC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LARES (Lexicon": {
    "term": "LARES (Lexicon",
    "cat": "Pro Audio Reference",
    "def": "Acoustic Reinforcement and Enhancement System) The time-varying reverberation system invented and developed by David Griesinger while at Lexicon beginning in 1991. Details here: Improving Room Acoustics through time-variant synthetic reverberation by David Griesinger. This is an example of an EAE system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "largo Music": {
    "term": "largo Music",
    "cat": "Terminology",
    "def": "Broad, slow. [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Larsen Effect": {
    "term": "Larsen Effect",
    "cat": "Acoustics",
    "def": "Name for acoustic feedback. (After S\u00f8ren Larsen.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Larsen, S\u00f8ren": {
    "term": "Larsen, S\u00f8ren",
    "cat": "Pro Audio Reference",
    "def": "Arsalon (1871-1957) Danish physicist notable for his contributions on acoustic feedback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "larynx See": {
    "term": "larynx See",
    "cat": "Pro Audio Reference",
    "def": "voice box.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "laser (light": {
    "term": "laser (light",
    "cat": "Pro Audio Reference",
    "def": "amplification by stimulated emission of radiation) A device that generates coherent, monochromatic light waves. All CD players contain a semiconductor laser in their optical pickup.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "laser microphone": {
    "term": "laser microphone",
    "cat": "Microphones",
    "def": "An entirely new type of microphone invented by David Schwartz that promises conversion of acoustical to electrical energy with zero distortion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "laser turntable Phonographs": {
    "term": "laser turntable Phonographs",
    "cat": "Pro Audio Reference",
    "def": "A phonograph that plays vinyl records using a laser instead of a cartridge so there is no contact between the record and the laser sensor. Beginning at $15,000, it is not cheap, but very innovative.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "last-on Teleconferencing": {
    "term": "last-on Teleconferencing",
    "cat": "Pro Audio Reference",
    "def": "Term referring to microphone inputs on an automatic mic mixer that stay on (open) until another mic input turns on. Contrast with gated-on. A last-on mic becomes a master mic if left open long enough.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Las Vegas": {
    "term": "Las Vegas",
    "cat": "Pro Audio Reference",
    "def": "City of Lights Jazz and R&B Festival A picnic-style (grass and lawn chairs) venue jazz festival held yearly in Las Vegas in the Spring.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAT (linear array transducer)": {
    "term": "LAT (linear array transducer)",
    "cat": "Loudspeakers",
    "def": "Trademarked name for a new loudspeaker technology developed by Tymphany Corporation. For details see AES preprints #6191, 6247 and 6250.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "latency Similar": {
    "term": "latency Similar",
    "cat": "Pro Audio Reference",
    "def": "to propagation delay but broader in application. Used to describe the inherent delay in signal processing as well as software processing. The time it takes for a system or device to respond to an instruction, or the time it takes for a signal to pass through a device. It is how long it takes for a result to happen from a command. In telecommunications it is the length of time it takes packets to traverse the media.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "laugh box": {
    "term": "laugh box",
    "cat": "Pro Audio Reference",
    "def": "See Laff Box.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lavaliere or lavaliere microphone": {
    "term": "lavaliere or lavaliere microphone",
    "cat": "Pro Audio Reference",
    "def": "A small electret microphone designed to be worn on a person. The first lavaliere mics were worn around the neck on a lanyard, hence the French name lavalli\u00e8re, a type of necktie, used to describe a pendant worn on a chain around the neck (after the Duchess de La Valli\u00e8re who started the fashion [AHD]). Today most lavaliere (the final \u201ce\u201d is commonly dropped) mics are attached by clips rather than hung from a cord.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lawful \u201cCompatible with": {
    "term": "lawful \u201cCompatible with",
    "cat": "Pro Audio Reference",
    "def": "the will of a judge having jurisdiction.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lawyer \u201cOne": {
    "term": "lawyer \u201cOne",
    "cat": "Pro Audio Reference",
    "def": "skilled in circumvention of the law.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lay Wire & Cable": {
    "term": "lay Wire & Cable",
    "cat": "Pro Audio Reference",
    "def": "To place together (strands) to be twisted into rope. To make in this manner: lay up cable. [AHD] The number of twists per unit length in twisted cable, called the lay. The helical arrangement formed by twisting together the individual elements of a cable. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Layer 1 In": {
    "term": "Layer 1 In",
    "cat": "Pro Audio Reference",
    "def": "the 7-layer OSI network model, this is the lowest level, and is known as the physical layer (seen abbreviated PHY) layer, characterized by the hardware of cables and connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Layer 2 In": {
    "term": "Layer 2 In",
    "cat": "Pro Audio Reference",
    "def": "the 7-layer OSI network model, this is the next to lowest level, known as the data link layer. This layer defines how date is transferred between network objects. In pro audio, the most common layer 2 uses Ethernet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "layback": {
    "term": "layback",
    "cat": "Recording",
    "def": "A post operation that rejoins audio and video after all other editing is complete.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LCD (liquid crystal display)": {
    "term": "LCD (liquid crystal display)",
    "cat": "Pro Audio Reference",
    "def": "A display of numerical or graphical information made of material whose reflectance or transmittance changes when an electric field is applied. An LCD requires ambient light or backlighting for viewing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LCR (left center right)": {
    "term": "LCR (left center right)",
    "cat": "Sound Reinforcement",
    "def": "A three-channel sound system utilizing a left channel, a right channel and a center channel to stabilize the phantom images.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LDI (Live Design International)": {
    "term": "LDI (Live Design International)",
    "cat": "Pro Audio Reference",
    "def": "The largest US trade show and conference focused on technologies for the live entertainment industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LDR (light-detecting": {
    "term": "LDR (light-detecting",
    "cat": "Pro Audio Reference",
    "def": "resistor or light-dependent resistor) An optoelectronic device whose resistance varies (inversely proportional) as a function of light ; a photocell, often constructed from CdS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leach Jr.,": {
    "term": "Leach Jr.,",
    "cat": "Pro Audio Reference",
    "def": "William Marshall (1940-2010) American engineer and professor who made significant contributions to audio engineering throughout his life, including authoring 26 JAES papers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lead-acid battery": {
    "term": "lead-acid battery",
    "cat": "Pro Audio Reference",
    "def": "A storage battery in which the active material of the positive plate is lead dioxide, the negative plate is lead, and the electrolyte is dilute sulfuric acid. [ IEEE Std 1578]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "leakage": {
    "term": "leakage",
    "cat": "Microphones",
    "def": "Pickup of an instrument by a microphone intended to pick up another instrument. Creative leakage is artistically favorable leakage that adds a \u201cloose\u201d or \u201clive\u201d feel to a recording. [Vear]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lear cartridge (aka 8-track cartridge)": {
    "term": "Lear cartridge (aka 8-track cartridge)",
    "cat": "Recording",
    "def": "Invented by William Powell Lear, the man behind the LearJet; eventually superceded by the compact cassette.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LeBel, C": {
    "term": "LeBel, C",
    "cat": "Pro Audio Reference",
    "def": "J. (1901-1960) American inventor and founder and first president of the Audio Engineering Society.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leccese, Albert": {
    "term": "Leccese, Albert",
    "cat": "Pro Audio Reference",
    "def": "(1953-2010) American engineer who helped pioneer touring sound as Director of Engineering at Audio Analysts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LED (light-emitting": {
    "term": "LED (light-emitting",
    "cat": "Pro Audio Reference",
    "def": "diode) Invented by Nick Holonyak, Jr. in 1962, a self-lighting semiconductor display of numerical or graphical information based on the light emitting characteristics of a solid-state device that emits incoherent (i.e., random direction) light when conducting a forward current. See LEVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEDE (live end-dead end)": {
    "term": "LEDE (live end-dead end)",
    "cat": "Acoustics",
    "def": "Recording studio acoustic treatment developed by Chips Davis in the late \u201970s where a room is designed to have a live end, i.e., reverberant and a dead end (opposite) that is heavily damped. Hit the link for the original AES paper written by Chips Davis and Don Davis (no relation) in 1980.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEED\u00ae (Leadership": {
    "term": "LEED\u00ae (Leadership",
    "cat": "Pro Audio Reference",
    "def": "in Energy and Environmental Design) A registered trademark of USGBC (US Green Building Council) An environmental rating system for the building industry \u2014 a \u201cbenchmark for the design, construction, and operation of high performance green buildings.\u201d See RaneNote: LEED and the MA 4 Multichannel Amplifier.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leet Internet-based": {
    "term": "Leet Internet-based",
    "cat": "Pro Audio Reference",
    "def": "written slang, e.g., \u201cleet\u201d is Internet slang for \u201celite,\u201d \u201cL8tr\u201d for \u201clater,\u201d and \u201cl00kin6\u201d for \u201clooking, etc. Used to encrypt text messages, but it is much more sophisticated than the elementary \u201cB4\u201d for \u201cbefore.\u201d It is a complicated use of letters and numbers that look like letters, e.g., \u201cm4d\u201d for \u201cmad.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "legacy devices": {
    "term": "legacy devices",
    "cat": "Pro Audio Reference",
    "def": "Something handed down from an ancestor, or a predecessor, or something from the past [AHD]. Used in the computer world to refer to yesterday\u2019s solutions, for example including an RS-232 port on a USB machine.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEO (low earth orbit)": {
    "term": "LEO (low earth orbit)",
    "cat": "Telephony",
    "def": "Term referring to communications satellites positioned 200-900 miles (320-1450 kilometers) high.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lepatata See:": {
    "term": "lepatata See:",
    "cat": "Pro Audio Reference",
    "def": "vuvuzela",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leq Symbol": {
    "term": "Leq Symbol",
    "cat": "Pro Audio Reference",
    "def": "for equivalent continuous sound pressure level.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leq(A) Symbol": {
    "term": "Leq(A) Symbol",
    "cat": "Pro Audio Reference",
    "def": "for equivalent continuous sound pressure level (A-weighted). Also seen as LAeq.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leslie\u2122 Loudspeaker": {
    "term": "Leslie\u2122 Loudspeaker",
    "cat": "Pro Audio Reference",
    "def": "A special loudspeaker design made famous by its use with the Hammond B-3 organ, featured prominently in much of the 1960\u2019s and 1970\u2019s music (Procol Harum, et al.) characterized by a swirling pitch-shifting sound. Designed in the 1940s by Don Leslie, it uses a fixed loudspeaker and a rotating horn assembly to cause a doppler sound effect.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Les Paul": {
    "term": "Les Paul",
    "cat": "Pro Audio Reference",
    "def": "See: Paul, Les",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEV": {
    "term": "LEV",
    "cat": "Acoustics",
    "def": "Acronym for listener envelopment. [Morfey]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEVD (light": {
    "term": "LEVD (light",
    "cat": "Pro Audio Reference",
    "def": "emitting vegetable diode) True story; kimchi, actually. Some other foods also do it.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "leveler (also": {
    "term": "leveler (also",
    "cat": "Pro Audio Reference",
    "def": "seen as leveller, which is incorrect) A dynamic processor that maintains (or \u201clevels\u201d) the amount of one audio signal based upon the level of a second audio signal. Normally, the second signal is from an ambient noise sensing microphone. For example, a restaurant is a typical application where it is desired to maintain paging and background music a specified loudness above the ambient noise. The leveler monitors the background noise, dynamically increasing and decreasing the main audio signal as necessary to maintain a constant loudness differential between the two. Also called ambient noise compensator and SPL (sound pressure level) controller",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "levels Terms": {
    "term": "levels Terms",
    "cat": "Pro Audio Reference",
    "def": "used to describe relative audio signal levels: (Also see decibel).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "mic-level Nominal": {
    "term": "mic-level Nominal",
    "cat": "Pro Audio Reference",
    "def": "signal coming directly from a microphone (before any digital conversion if present). Very low, in the microvolts, and requires a preamp with at least 60 dB gain before using with any line-level equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line-level Standard": {
    "term": "line-level Standard",
    "cat": "Pro Audio Reference",
    "def": "+4 dBu (pro) or -10 dBV (consumer) audio levels. See decibel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "instrument-level Nominal": {
    "term": "instrument-level Nominal",
    "cat": "Pro Audio Reference",
    "def": "signal from musical instruments using electrical pick-ups. Varies widely, from very low mic-levels to quite large line-levels.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lexicographer": {
    "term": "lexicographer",
    "cat": "Pro Audio Reference",
    "def": "The author of a lexicon or dictionary. \u201cEvery other author may aspire to praise; the lexicographer can only hope to escape reproach; and even this negative recompense has been yet granted to very few.\u201d \u2014 Samuel Johnson, 1755.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leyland number": {
    "term": "Leyland number",
    "cat": "Mathematics",
    "def": "Any number that can be expressed as xy+ yx, e.g., 593 = 29 + 92. Hit the link to see other examples.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LFD (low-frequency": {
    "term": "LFD (low-frequency",
    "cat": "Pro Audio Reference",
    "def": "diffusion) Acoustics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LFE (low": {
    "term": "LFE (low",
    "cat": "Pro Audio Reference",
    "def": "frequency effects) [Note: it is \u201ceffects\u201d NOT \u201cenhancement\u201d.) Popularly called bass management, but this is technically wrong. The \u201cpoint-one\u201d in \u201c5.1 surround systems\u201c. It refers to the limited bandwidth (20-90 Hz, 20-120 Hz, or 20-150 Hz depending on the encoding system) special effects/feature channel, but can also refer to a subwoofer channel. Both Dolby Digital and DTS Consumer use the term. The \u201cbass management\u201d part comes from having the option of leaving the bass in the five full-range channels or sending all the lower bass to the subwoofer, or some combination.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LFO (low frequency oscillator) Synthesizers": {
    "term": "LFO (low frequency oscillator) Synthesizers",
    "cat": "Pro Audio Reference",
    "def": "A very low frequency (less than 10 Hz) sine wave oscillator used to slowly vary other parameters to create effects like flanging and tremolo, or vibrato.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "licorice stick Clarinet": {
    "term": "licorice stick Clarinet",
    "cat": "Pro Audio Reference",
    "def": "[Decharne]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LIDAR (light": {
    "term": "LIDAR (light",
    "cat": "Pro Audio Reference",
    "def": "detection and ranging) A system based on the same principles as RADAR developed for locating, ranging and profiling applications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lift/dip Popular": {
    "term": "lift/dip Popular",
    "cat": "Pro Audio Reference",
    "def": "European term meaning boost/cut.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "light organ": {
    "term": "light organ",
    "cat": "Pro Audio Reference",
    "def": "Electronic device popular in the \u201960s and \u201970s where different colored lights would flash in response to different musical frequencies. Contrast with color organ.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "light pipe": {
    "term": "light pipe",
    "cat": "Pro Audio Reference",
    "def": "or light guide A device made from optical plastic that couples light from a source (usually a surface mounted LED) to a user interface panel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "light wave": {
    "term": "light wave",
    "cat": "Pro Audio Reference",
    "def": "coupling See LWC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lilith or Lilith Fair": {
    "term": "Lilith or Lilith Fair",
    "cat": "Pro Audio Reference",
    "def": "An all-women festival tour begun in 1997 by artist Sarah McLachlan along with Dan Fraser, Marty Diamond and Terry McBride, as a celebration of women in music. History here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "limelight a": {
    "term": "limelight a",
    "cat": "Pro Audio Reference",
    "def": "An early type of stage light in which lime was heated to incandescence producing brilliant illumination. b. The brilliant white light so produced. Also called calcium light. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "limestone": {
    "term": "limestone",
    "cat": "Acoustics",
    "def": "See: Epidaurus.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "limiter": {
    "term": "limiter",
    "cat": "Pro Audio Reference",
    "def": "A compressor with a fixed ratio of 10:1 or greater. The dynamic action effectively prevents the audio signal from becoming any larger than the threshold setting. For example, if the threshold is set for, say, +16 dBu and the input signal increases by 10 dB to +26 dB, the output only increases by 1 dB to +17 dBu, essentially remaining constant. Used primarily for preventing equipment, media, and transmitter overloads. A limiter is to a compressor what a noise gate is to an expander. See the RaneNote \u201cDynamics Processors \u2014 Technology & Applications.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "limp wall": {
    "term": "limp wall",
    "cat": "Acoustics",
    "def": "A partition having inertia but no stiffness. [Morfey]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line arrays": {
    "term": "line arrays",
    "cat": "Loudspeakers",
    "def": "(also called articulated line arrays) A vertical line (or linear) configuration for large venue multi-cabinet loudspeaker systems creating tight (and steerable) beamwidth coverage (degrees of arc for the propagating sound wave, vertically and horizontally). Favored for their controlled directivity that reduces room reflections and produces less reverberation and improved sound intelligibility, as well as reducing the sound that bleeds back onto the performers. The three most popular configurations are (a) uniform array: typically 2-8 boxes arranged in a flat straight line popular in smaller venues and usually tilted downward above the audience; (b) constant splay array: forms a smooth arc by tilting each box the same amount (pitch) resulting in a wider beamwidth popular in concert hall settings, particularly those with balconies; (c) progressive splay array: combines both previous examples by starting out with a straight flat array that gradually creates an arc at the lower end, forming the letter \u201cJ\u201d like shape. Popular for large arenas and concert settings. Individual and unique variations are offered by all major loudspeaker companies.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear array": {
    "term": "linear array",
    "cat": "Pro Audio Reference",
    "def": "transducer See LAT.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear distortion": {
    "term": "linear distortion",
    "cat": "Pro Audio Reference",
    "def": "Any change to the amplitude or phase of the incoming signal frequency components. Contrast with nonlinear distortion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear PCM": {
    "term": "linear PCM",
    "cat": "Pro Audio Reference",
    "def": "A pulse code modulation system in which the signal is converted directly to a PCM word without companding, or other processing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear phase": {
    "term": "linear phase",
    "cat": "Pro Audio Reference",
    "def": "response Any system which accurately preserves phase relationships between frequencies, i.e., that exhibits pure delay. See group delay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear system": {
    "term": "linear system",
    "cat": "Pro Audio Reference",
    "def": "or linear device A system or device that meets two criteria: 1) proportionality \u2014 the output smoothly follows the input; 2) additivity \u2014 if input x results in output U and input y results in output V, then input x+y must result in output U+V. This means the system or device is predictably and its cause and effect relationship is proportional. Contrast: nonlinear.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear taper": {
    "term": "linear taper",
    "cat": "Pro Audio Reference",
    "def": "See potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linear time": {
    "term": "linear time",
    "cat": "Pro Audio Reference",
    "def": "code See time code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linearity error": {
    "term": "linearity error",
    "cat": "Electronics",
    "def": "The maximum permissible deviation of the actual output quantity from a reference curve or line. Think of it as an error-window surrounding the reference: anywhere inside is okay, anywhere outside is not. The size of the window is the linearity error.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line driver": {
    "term": "line driver",
    "cat": "Pro Audio Reference",
    "def": "A balanced output stage designed to interface and drive long lines. Long output lines tax output stages in terms of stability and current demands. Designs vary from direct-drive differential (sometimes using cross-coupled techniques) to transformer drive. See the RaneNote Practical Line Driving Current Requirements.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line echo": {
    "term": "line echo",
    "cat": "Pro Audio Reference",
    "def": "canceller See echo canceller.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line-level See": {
    "term": "line-level See",
    "cat": "Pro Audio Reference",
    "def": "levels.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line source": {
    "term": "line source",
    "cat": "Pro Audio Reference",
    "def": "arrays See: line arrays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "line spectrum": {
    "term": "line spectrum",
    "cat": "Pro Audio Reference",
    "def": "A spectrum containing only discrete frequency components. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "linguistics": {
    "term": "linguistics",
    "cat": "Pro Audio Reference",
    "def": "The study of the nature, structure, and variation of language, including phonetics, phonology, morphology, syntax, semantics, sociolinguistics, and pragmatics. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Linkwitz-Riley crossover": {
    "term": "Linkwitz-Riley crossover",
    "cat": "Pro Audio Reference",
    "def": "The de facto standard for professional audio active crossovers is the 4th-order (24 dB/octave slopes) Linkwitz-Riley (LR-4) design. Consisting of cascaded 2nd-order Butterworth low-pass filters, the LR-4 represents a vast improvement over the previous 3rd-order (18 dB/octave) Butterworth standard. Named after S. Linkwitz, a Hewlett-Packard engineer at that time, who first described the problems and solution in his paper \u201cActive Crossover Networks for Non-coincident Drivers,\u201d J. Audio Eng. Soc., vol. 24, Jan/Feb 1976, pp. 2-8. In this paper, he credited his co-worker Russ Riley for the idea that cascaded Butterworth filters met all his crossover requirements. Their effort became known as the Linkwitz-Riley alignment. Linkwitz showed that a significant weakness of the Butterworth design was the behavior of the combined acoustic lobe along the vertical axis. An acoustic lobe results when both drivers operate together reproducing the crossover frequency band, and in the Butterworth case it exhibits severe peaking and is not on-axis (it tilts toward the lagging driver). Linkwitz showed that this results from the Butterworth outputs not being in-phase. Riley demonstrated an elegant solution by cascading two 2nd-order (any even-ordered pair works) Butterworth filters, which produced outputs that were always in-phase and summed to a constant-voltage response. Thus was created a better crossover. See the RaneNote Linkwitz-Riley Crossovers: A Primer and RaneNote Signal Processing Fundamentals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Linux": {
    "term": "Linux",
    "cat": "Pro Audio Reference",
    "def": "A computer Unix-type operating system (OS) invented by Linus Torvalds in 1992, who wrote it as a student at the University of Helsinki. He created this OS because he couldn\u2019t afford one that could accomplish what he wanted with his available hardware. He then posted it on the network for other students, where it grew and became very stable and powerful. Today, for free, the software, source code, etc., is available off the Web.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LIPA (Liverpool": {
    "term": "LIPA (Liverpool",
    "cat": "Pro Audio Reference",
    "def": "Institute for Performing Arts) A state-of-the-art performing arts higher education institution co-founded by Paul McCartney and Mark Featherstone-Witty; located in a renovated old school that McCartney went to. History here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lissajous figure": {
    "term": "Lissajous figure",
    "cat": "Pro Audio Reference",
    "def": "also Lissajous curve and Bowditch curve (after Nathaniel Bowditch, in 1815 who first studied these curves) Oscilloscopes. A special case of X-Y plot in which the signals applied to both axes are sinusoidal functions. For a stable display the signals must be harmonics. Lissajous figures are useful for determining phase and harmonic relationships. (After J. A. Lissajous) [IEEE] For some educational fun check out Lissajous Lab. Also fun is Crop Circles of Consciousness.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lissajous, Jules": {
    "term": "Lissajous, Jules",
    "cat": "Pro Audio Reference",
    "def": "Antoine (1822-1880) French mathematician.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "listen has": {
    "term": "listen has",
    "cat": "Pro Audio Reference",
    "def": "the same letters as silent.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "listening \u201cIt": {
    "term": "listening \u201cIt",
    "cat": "Pro Audio Reference",
    "def": "is the province of knowledge to speak and it is the privilege of wisdom to listen.\u201d Oliver Wendel Holmes [Crystal]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "liter Abbr": {
    "term": "liter Abbr",
    "cat": "Pro Audio Reference",
    "def": "l or lit. A metric unit of volume equal to approximately 1.056 liquid quarts, 0.908 dry quart, or 0.264 gallon. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Little Kids Rock": {
    "term": "Little Kids Rock",
    "cat": "Pro Audio Reference",
    "def": "A nonprofit organization that \u201c\u2026 provides weekly music education classes to K-12 students in public schools that have been stripped of their music programs.\u201d [from website] Amazing and valuable group.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Little Willie": {
    "term": "Little Willie",
    "cat": "Pro Audio Reference",
    "def": "Littlefield (1931-2013) American musician famous as a blues singer and boogie-woogie pianist who recorded the first version of \u201cKansas City.\u201d Early pioneer of merging boogie-woogie and rock \u2018n\u2019 roll music techniques.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "litz wire": {
    "term": "litz wire",
    "cat": "Pro Audio Reference",
    "def": "Derived and shortened from the German word \u201clitzendraht\u201d meaning strand, or woven wire. It is a cable constructed of individually insulated magnet wires either twisted or braided into a uniform pattern, which increases the total surface area compared to an equivalent solid conductor. The pattern is formed to reduce skin effect by guaranteeing that along a significant length, any single conductor will be, for some portion of its length, located in the center, the middle, and the outer portion of the bundle. This transposition prevents any one conductor from being subject to the full forces of magnetic flux, thereby reducing the effective resistance of the entire bundle. Litz wire bundles of 50, 100 or even more conductors are available. They are constructed by winding smaller bundles of six conductors into larger bundles. Those bundles may be \u201clitzed\u201d with other bundles to create progressively larger cables. Litz constructions counteract skin effect by increasing the amount of surface area without significantly increasing the size of the conductor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "liuqin Musical Instrument": {
    "term": "liuqin Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Chinese 4-string mandolin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "live room": {
    "term": "live room",
    "cat": "Acoustics",
    "def": "A room characterized by a relatively small amount of sound absorption. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "live sound": {
    "term": "live sound",
    "cat": "Pro Audio Reference",
    "def": "See: History of Concert Sound.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LKFS (loudness": {
    "term": "LKFS (loudness",
    "cat": "Pro Audio Reference",
    "def": "K-weighted digital full scale) Broadcast. A standard ( ITU R BS.1770-2) aimed at normalizing broadcast loudness levels. An increase of 1 dB in signal level will cause the loudness reading to increase by 1 LKFS. For a particularly good overview see: Florian Camerer\u2019s paper, \u201cOn the way to Loudness nirvana: audio levelling with EBU R128.\u201d Also see: LUFS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LL": {
    "term": "LL",
    "cat": "Terminology",
    "def": "Cool J (Ladies love cool James) Birth name: James Todd Smith.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "load": {
    "term": "load",
    "cat": "Electronics",
    "def": "A device or the resistance of a device to which power is delivered. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "load shedding Power Supplies": {
    "term": "load shedding Power Supplies",
    "cat": "Pro Audio Reference",
    "def": "Term for any sort of automatic rationing of available power when demand exceeds capacity. When power companies do this it is commonly called a rolling blackout.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lobing error Electronic crossovers": {
    "term": "lobing error Electronic crossovers",
    "cat": "Pro Audio Reference",
    "def": "The amount of on-axis deviation in amplitude from zero (i.e., perfect combined radiation pattern) resulting from phase deviations at the crossover point. Term coined by Lipshitz, Stanley P. and John Vanderkooy, \u201cA Family of Linear-Phase Crossover Networks of High Slope Derived by Time Delay,\u201d J. Audio Eng. Soc., Vol. 31, No. 1/2, January/February 1983, pp. 2-20). See the RaneNote Linkwitz-Riley Crossovers: A Primer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lodestone (also loadstone)": {
    "term": "lodestone (also loadstone)",
    "cat": "Pro Audio Reference",
    "def": "A piece of magnetite that has magnetic properties and attracts iron or steel. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lodge, Oliver": {
    "term": "Lodge, Oliver",
    "cat": "Pro Audio Reference",
    "def": "Joseph (1851-1940) Knighted British physicist who, in 1898, gained a patent on the moving-coil loudspeaker, utilizing a coil connected to a diaphragm, suspended in a magnetic field (British patent 9,712/98).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Loft Scene": {
    "term": "Loft Scene",
    "cat": "Pro Audio Reference",
    "def": "Musical jazz and early hip-hop phenomenon occurring in New York city during the \u201970s, where people would dance and party in renovated old industrial loft spaces.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "log": {
    "term": "log",
    "cat": "Pro Audio Reference",
    "def": "Short for logarithm.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "logarithm": {
    "term": "logarithm",
    "cat": "Mathematics",
    "def": "A shortcut method that uses the powers of 10 (or some other base) to represent the actual number. The logarithm is the power to which a base, such as 10, must be raised to produce a given number. For example, 10\u00b3 = 1,000; therefore, log (to the base 10) 1,000 = 3. The types most often used are the common logarithm (base 10), the natural logarithm (base e), and the binary logarithm (base 2).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "logic": {
    "term": "logic",
    "cat": "Pro Audio Reference",
    "def": "A system of reasoning first formulated by Aristotle. 1. The study of the principles of reasoning, especially of the structure of propositions as distinguished from their content and of method and validity in deductive reasoning. Computer Science a. The nonarithmetic operations performed by a computer, such as sorting, comparing, and matching, that involve yes-no decisions. b. Computer circuitry. c. Graphic representation of computer circuitry. [AHD",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "log taper": {
    "term": "log taper",
    "cat": "Pro Audio Reference",
    "def": "See potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lollapalooza Chicago\u2019s": {
    "term": "Lollapalooza Chicago\u2019s",
    "cat": "Pro Audio Reference",
    "def": "biggest music festival (ahead of Pitchfork) usually held in August.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Long, Richard": {
    "term": "Long, Richard",
    "cat": "Pro Audio Reference",
    "def": "(1933-1986) Founder of RLA (Richard Long and Associates), dance club sound designers during the disco heydays of the \u201970s and \u201980s. Richard\u2019s success grew out of his experience working as the sound engineer for the Paradise Garage in Greenwich Village during the mid-seventies. After developing his chops at the Paradise Garage, Richard designed many famous dance clubs including Studio 54, Annabel\u2019s (London), Regine\u2019s (a chain of 19 clubs scattered around the world from Paris and NY to Cairo) and many others that were the vanguard of the disco era. Indeed, continuing years beyond Richard\u2019s unfortunate death in 1986, his designs flourish today in such icons as the Ministry of Sound (London). Further information available at GSA and see Richard and Alan Fierstein\u2019s seminal paper \u201cState-of-the-Art Discotheque Sound Systems \u2014 System Design and Acoustical Measurement,\u201d presented at the 67th Convention of the Audio Engineering Society, New York , 1980, preprint 1694.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Longacre Square": {
    "term": "Longacre Square",
    "cat": "Pro Audio Reference",
    "def": "Original name for Times Square; renamed in 1904.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "longitudinal Of": {
    "term": "longitudinal Of",
    "cat": "Pro Audio Reference",
    "def": "or relating to longitude or length. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "long-tailed pair Analog": {
    "term": "long-tailed pair Analog",
    "cat": "Electronics",
    "def": "The most common form of differential amplifier usually consisting of a top-side current mirror and a constant bias current source tied to the common emitters point, forming the \u201ctail.\u201d First designed and patented by Alan Blumlein (wasn\u2019t everything!) in 1936 as an amplifier for small signals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loop Electronic circuits": {
    "term": "loop Electronic circuits",
    "cat": "Pro Audio Reference",
    "def": "A closed circuit, i.e., a set of branches forming a closed current path, provided that the omission of any branch eliminates the closed path. An electric circuit providing an uninterrupted path for the flow of current.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loopback address Internet": {
    "term": "loopback address Internet",
    "cat": "Pro Audio Reference",
    "def": "Pinging yourself by using IP address 127.0.0.1",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lorentz force": {
    "term": "Lorentz force",
    "cat": "Physics",
    "def": "The orthogonal (right angle) force on a charged particle traveling in a magnetic field, named after H. A. Lorentz. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lorentz, Hendrik": {
    "term": "Lorentz, Hendrik",
    "cat": "Pro Audio Reference",
    "def": "Antoon (1853-1928) Dutch physicist, famous for the Lorentz force and co-receiving a Nobel Prize for researching the influence of magnetism on radiation. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lossless See": {
    "term": "lossless See",
    "cat": "Pro Audio Reference",
    "def": "digital audio data compression",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lossy See": {
    "term": "lossy See",
    "cat": "Pro Audio Reference",
    "def": "digital audio data compression.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loud Having": {
    "term": "loud Having",
    "cat": "Pro Audio Reference",
    "def": "offensively bright colors: a loud necktie. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudness": {
    "term": "loudness",
    "cat": "Pro Audio Reference",
    "def": "The SPL of a standard sound which appears to be as loud as the unknown. Loudness level is measured in phons and equals the equivalent SPL in dB of the standard. [For example, a sound judged as loud as a 40 dB-SPL 1 kHz tone has a loudness level of 40 phons. Also, it takes 10 phons (an increase of 10 dB-SPL) to be judged twice as loud.] Note that loudness is a subjective measurement; contrast with intensity which is an objective measurement.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudness curve": {
    "term": "loudness curve",
    "cat": "Pro Audio Reference",
    "def": "See Fletcher-Munson.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker, acoustic": {
    "term": "loudspeaker, acoustic",
    "cat": "Pro Audio Reference",
    "def": "suspension See: acoustic suspension loudspeaker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker Dynamic": {
    "term": "loudspeaker Dynamic",
    "cat": "Pro Audio Reference",
    "def": "An electromagnetic transducer based on the principle of electromagnetic induction used to convert the electrical energy output of a power amplifier into acoustic energy. The heart of a dynamic loudspeaker is a coil of wire (the voice coil), a magnet, and a cone. The amplifier applies voltage to the voice coil causing a current to flow that produces a magnetic field that reacts with the stationary magnet making the cone move proportional to the applied audio signal. Other loudspeaker technologies exist, among these are electrostatic (a thin sheet of plastic film suspended between two wire grids or screens; the film is conductive and charged with a high voltage; the film is alternately attracted to one grid and then the other resulting in motion that radiates sound), but for pro audio applications, dynamic loudspeakers dominate. The first loudspeaker was patented by Ernst Siemens in 1877, and Lodge obtained a UK patent in 1898. See also ribbon tweeter and back-emf.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker directivity": {
    "term": "loudspeaker directivity",
    "cat": "Pro Audio Reference",
    "def": "See: Q.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Loudspeaker Health": {
    "term": "Loudspeaker Health",
    "cat": "Pro Audio Reference",
    "def": "Care Fun and educational tips developed by MC2 System Design Group. [Check it out, you won\u2019t be disappointed.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker line": {
    "term": "loudspeaker line",
    "cat": "Pro Audio Reference",
    "def": "arrays See line arrays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker measurements": {
    "term": "loudspeaker measurements",
    "cat": "Pro Audio Reference",
    "def": "See AES2.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker model": {
    "term": "loudspeaker model",
    "cat": "Pro Audio Reference",
    "def": "See amplifier dummy load.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker reconing": {
    "term": "loudspeaker reconing",
    "cat": "Pro Audio Reference",
    "def": "See reconing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker sensitivity": {
    "term": "loudspeaker sensitivity",
    "cat": "Pro Audio Reference",
    "def": "See sensitivity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "loudspeaker surround": {
    "term": "loudspeaker surround",
    "cat": "Pro Audio Reference",
    "def": "See surround.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Love Parade": {
    "term": "Love Parade",
    "cat": "Pro Audio Reference",
    "def": "Music festival begun in 1989 after the fall of the Berlin wall to celebrate solidarity and freedom, became a huge EDM event, peaking at over 1.5 million people, which in 2010 resulted in 21 deaths and over 500 injured people; now permanently cancelled.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "low-cut filter": {
    "term": "low-cut filter",
    "cat": "Pro Audio Reference",
    "def": "also lo-cut filter See high-pass filter [In audio electronics, we define things like this just to make sure you\u2019re paying attention.] Contrast with low-pass filter below.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "low impedance Abbr. Lo-Z": {
    "term": "low impedance Abbr. Lo-Z",
    "cat": "Electronics",
    "def": "A device having an electrical impedance of at less than 1,000 ohms. [Note: This value is arbitrary as there is no standard defining exactly what constitutes a \u2018low impedance.\u2019] Examples include loudspeakers in the 4-16 ohms range; headphones from 32-150 ohms; microphones rated 50-600 ohms; and electronic circuit outputs are low-impedance, rated at 50-300 ohms. Contrast with high impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "low-pass filter": {
    "term": "low-pass filter",
    "cat": "Pro Audio Reference",
    "def": "also lo-pass filter A filter having a passband extending from DC (zero Hz) to some finite cutoff frequency (not infinite). A filter with a characteristic that allows all frequencies below a specified rolloff frequency to pass and attenuate all frequencies above. Anti-aliasing and anti-imaging filters are low-pass filters. Also known as a high-cut filter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "low voltage Electricity": {
    "term": "low voltage Electricity",
    "cat": "Pro Audio Reference",
    "def": "A term with many definitions, some of which surprise, like that 1000 Vac is considered \u201clow voltage\u201d by the IEC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "low-voltage system Electric Power": {
    "term": "low-voltage system Electric Power",
    "cat": "Pro Audio Reference",
    "def": "An electric system having a maximum root-mean-square alternating-current voltage of 1000 V or less. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lo-Z See": {
    "term": "Lo-Z See",
    "cat": "Pro Audio Reference",
    "def": "low impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LP": {
    "term": "LP",
    "cat": "Terminology",
    "def": "(long play) Phonograph Records. The name for the 33 1/3 rpm vinyl record introduced by Columbia Records in 1948.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "L-pad See": {
    "term": "L-pad See",
    "cat": "Pro Audio Reference",
    "def": "attenuator pad.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LRAD (long": {
    "term": "LRAD (long",
    "cat": "Pro Audio Reference",
    "def": "range acoustic device) A non-lethal sonic communicator/weapon developed by American Technology Corporation capable of producing sound pressure levels of 153 dB-SPL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LRC (inductance-resistance-capacitance)": {
    "term": "LRC (inductance-resistance-capacitance)",
    "cat": "Electronics",
    "def": "Shorthand for the most common passive circuit elements. Also seen as RLC, LCR, CRL, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LSB (least significant bit)": {
    "term": "LSB (least significant bit)",
    "cat": "Pro Audio Reference",
    "def": "The bit within a digital word that represents the smallest possible coded value; hence, the LSB is a measure of precision.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LTC (linear": {
    "term": "LTC (linear",
    "cat": "Pro Audio Reference",
    "def": "time code) See time code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LUFS (loudness": {
    "term": "LUFS (loudness",
    "cat": "Pro Audio Reference",
    "def": "unit digital Full Scale) Alternate term for LKFS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lully, Jean-Baptiste": {
    "term": "Lully, Jean-Baptiste",
    "cat": "Pro Audio Reference",
    "def": "(1632-1687) French composer. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "The baton": {
    "term": "The baton",
    "cat": "Pro Audio Reference",
    "def": "used by a seventeenth-century conductor was a much longer and heavier affair than the little wand used today. On January 8, 1687, in the course of conducting a Te Deum, Lully struck his foot with his baton, injuring it so seriously that gangrene set in and he died ten weeks later. [Bartlett\u2019s Book of Anecdotes]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lumi\u00e8re, Auguste": {
    "term": "Lumi\u00e8re, Auguste",
    "cat": "Pro Audio Reference",
    "def": "and Louis French brothers who invented the \u201ccinematograph,\u201d reportedly the first all-in-one camera/projector/printer, in 1895.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "luminance 1": {
    "term": "luminance 1",
    "cat": "Pro Audio Reference",
    "def": "Abbreviated Y. That part of the video signal that carries the information on how bright the TV signal is to be. The black and white signal. 2. VJ Jargon. A filter that controls the video brightness. Used to blend clips by limiting the bright or dark image pixels. See chrominance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lunchbox Nickname for": {
    "term": "Lunchbox Nickname for",
    "cat": "Pro Audio Reference",
    "def": "the narrow 500 Series of modular card frame racks. Coined by Art Kelm. \u201cAPI Lunchbox\u201d is a registered trademark of API Audio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lute Musical Instruments": {
    "term": "lute Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A stringed instrument having a body shaped like a pear sliced lengthwise and a neck with a fretted fingerboard that is usually bent just below the tuning pegs. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LWC (light wave coupling) Electronic Displays": {
    "term": "LWC (light wave coupling) Electronic Displays",
    "cat": "Pro Audio Reference",
    "def": "Experimental very flexible flat panel display technology under development at Extreme Photonix, a University of Cincinnati spin-off from their Nanoelectronics Laboratory.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Lynyrd Skynyrd": {
    "term": "Lynyrd Skynyrd",
    "cat": "Pro Audio Reference",
    "def": "American rock band who took their name from their high school gym teacher, Leonard Skinner, as a way of mocking him, since he was a strict disciplinarian and had their guitarist, Gary Rossington, kicked out of school for having hair too long.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lyra Musical Instruments": {
    "term": "lyra Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "Three stringed bowed instrument with a bowl back carved from the solid. Popular in Greece and the Balkans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lyre Musical Instruments": {
    "term": "lyre Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A stringed instrument of the harp family having two curved arms connected at the upper end by a crossbar, used to accompany a singer or reciter of poetry, especially in ancient Greece. [AHD] One of the oldest known musical instruments dating back to the Sumerians.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lyric French": {
    "term": "lyric French",
    "cat": "Pro Audio Reference",
    "def": "word literally meaning of a lyre; the words of a song.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lyrical putty": {
    "term": "lyrical putty",
    "cat": "Pro Audio Reference",
    "def": "\u201cThe lyrics one creates in one\u2019s head in the absence of knowing a song\u2019s real lyrics.\u201d [A Dictionary of the Near Future by Douglas Coupland, NY Times, September 12, 2010.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "m": {
    "term": "m",
    "cat": "Terminology",
    "def": "(lower-case) The symbol for milli-.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M": {
    "term": "M",
    "cat": "Terminology",
    "def": "(upper-case) The symbol for mega-.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MAC Address": {
    "term": "MAC Address",
    "cat": "Pro Audio Reference",
    "def": "(Medium Access Control Address) (Also called MAC Name) Computer Networks. The (usually) 48-bit hardware address number unique to each LAN NIC (put there by the manufacturer), which identifies every network node.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "macintosh (also": {
    "term": "macintosh (also",
    "cat": "Pro Audio Reference",
    "def": "mackintosh) Chiefly British A raincoat or a lightweight, waterproof fabric that was originally of rubberized cotton. [After Charles Macintosh (1766-1843), Scottish inventor] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "macrosonics Industrial": {
    "term": "macrosonics Industrial",
    "cat": "Pro Audio Reference",
    "def": "application of high amplitude sound waves, for example, surface cleaning.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Made In": {
    "term": "Made In",
    "cat": "Pro Audio Reference",
    "def": "America Festival Sponsored by Budweiser this yearly music festival is held in Philadelphia and Los Angeles, usually during August.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MADI (multichannel": {
    "term": "MADI (multichannel",
    "cat": "Pro Audio Reference",
    "def": "audio digital interface) An AES recommended practice document Digital Audio Engineering \u2013 Serial Multichannel Audio Digital Interface (MADI) AES-10-1991 (ANSI S4.43-1991) specifying and controlling the requirements for digital interconnection between multitrack recorders and mixing consoles. The standard provides for 56 simultaneous digital audio channels that are conveyed point-to-point on a single coaxial cable fitted with BNC connectors along with a separate synchronization signal. Fiber optic implementation is specified in document AES-10id-1995, entitled AES information document for digital audio engineering \u2013 Engineering guidelines for the multichannel audio digital interface (MADI) AES 10. Basically, the technique takes the standard AES/EBU interface and multiplexes 56 of these into one sample period rather than the original two.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "madrigal Generally": {
    "term": "madrigal Generally",
    "cat": "Pro Audio Reference",
    "def": "a song for several voices, but particularly a Renaissance song.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magic \u201cAn": {
    "term": "magic \u201cAn",
    "cat": "Pro Audio Reference",
    "def": "art of converting superstition into coin. There are other arts serving the same high purpose, but the discreet lexicographer does not name them.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MaGIC (Media-accelerated": {
    "term": "MaGIC (Media-accelerated",
    "cat": "Pro Audio Reference",
    "def": "Global Information Carrier) An acronym trademark of Gibson Guitar Corp. for their digital transport protocol.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnet": {
    "term": "magnet",
    "cat": "Physics",
    "def": "A body that produces a magnetic field external to itself. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnetic field": {
    "term": "magnetic field",
    "cat": "Physics",
    "def": "The electric field surrounding any current-carrying conductor. [IEEE] A condition found in the region around a magnet or an electric current, characterized by the existence of a detectable magnetic force at every point in the region and by the existence of magnetic poles. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnetic flux": {
    "term": "magnetic flux",
    "cat": "Pro Audio Reference",
    "def": "density Symbol B or B-field. The amount of magnetic flux through a unit area taken perpendicular to the direction of the magnetic flux. Also called magnetic induction. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnetic induction": {
    "term": "magnetic induction",
    "cat": "Pro Audio Reference",
    "def": "See: magnetic flux density above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnetic pickup": {
    "term": "magnetic pickup",
    "cat": "Pro Audio Reference",
    "def": "See: pickup.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnetite": {
    "term": "magnetite",
    "cat": "Pro Audio Reference",
    "def": "The mineral form of black iron oxide, Fe3O4, that often occurs with magnesium, zinc, and manganese and is an important ore of iron. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnetostriction (magneto": {
    "term": "magnetostriction (magneto",
    "cat": "Pro Audio Reference",
    "def": "+ (con)striction) Magnetism. Deformation of a ferromagnetic material subjected to a magnetic field. [AHD] Discovered by James Joule in 1842. The reciprocal effect, the change of the susceptibility of a material when subjected to a mechanical stress, is called the Villari effect, named after E. Villari, a 19th-century Italian physicist.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "magnitude": {
    "term": "magnitude",
    "cat": "Mathematics",
    "def": "1. A number assigned to a quantity so that it may be compared with other quantities. 2. A property that can be quantitatively described, such as the volume of a sphere, the length of a vector, or the value of a voltage or current waveform. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Maine": {
    "term": "Maine",
    "cat": "Pro Audio Reference",
    "def": "The only American state whose name is just one syllable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mainframe": {
    "term": "mainframe",
    "cat": "Computers",
    "def": "1. A large powerful computer, often serving many connected terminals and usually used by large complex organizations. 2. The central processing unit of a computer exclusive of peripheral and remote devices. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mains Electricity": {
    "term": "mains Electricity",
    "cat": "Pro Audio Reference",
    "def": "Name for the AC line voltage input. Short for mains power system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Make Music": {
    "term": "Make Music",
    "cat": "Pro Audio Reference",
    "def": "Day From website: \u201cMake Music takes place each year on the summer solstice. Founded in France 32 years ago as the F\u00eate de la Musique, it is now the world\u2019s largest annual music event, celebrated in 800 cities across 110 countries.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MAMA (Musical": {
    "term": "MAMA (Musical",
    "cat": "Pro Audio Reference",
    "def": "Archives, Musical Archives) Founded in 1989 (1986?) by Gene Czerwinski (Cerwin-Vega founder) to preserve the music of culturally significant artists (by not requiring them to be commercially successful), whose CDs consistently are Grammy nominees, with at least one Grammy winner. [Now appears to be defunct.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Manchester encoding": {
    "term": "Manchester encoding",
    "cat": "Pro Audio Reference",
    "def": "A method of encoding data in which separate data and clock signals can be combined into a single, self-synchronizable data stream, suitable for transmission on a serial channel. [IEEE]. Also see: differential Manchester encoding.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mandolin Musical Instrument": {
    "term": "mandolin Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A small lute-like instrument with a typically pear-shaped body and a straight fretted neck, having usually four sets of paired strings tuned in unison or octaves. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mandolin rail": {
    "term": "mandolin rail",
    "cat": "Pro Audio Reference",
    "def": "A device installed within a piano used to create the classic ragtime honky-tonk sound popularized in player pianos and nickelodeons. \u201cThe rail consists of a rod of wood spanning the strings of an upright piano. Fringed leather hangs from the rod. Each fringe is approximately two inches long and half an inch wide. Although steel buttons were often used, brass buttons affixed to the string side of the leather worked best. The rail was usually hinged to pivot upward when not in use or to pivot down when in use. The felt from the piano hammer will hit the leather fringe, knocking the brass button against the piano string. The result is a metallic, honky-tonk piano sound.\u201d \u2014 Howard Byrne, Assistant Curator, The Music House Museum, Acme, MI.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mantissa": {
    "term": "mantissa",
    "cat": "Pro Audio Reference",
    "def": "The fractional part of a logarithm, e.g., in the logarithm 1.83885, the mantissa is 0.83885. (The integer part of a number is called the characteristic. In the example the characteristic is 1.) Floating-point arithmetic also calls this the significand.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mapp\u2019s Law": {
    "term": "Mapp\u2019s Law",
    "cat": "Acoustics",
    "def": "\u201cPoint the loudspeaker at the listener,\u201d created by Peter Mapp, principal of Peter Mapp Associates. He is an engineer and physicist specializing in acoustics and technical writing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "maraca Musical Instrument": {
    "term": "maraca Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Latin-American percussion instrument consisting of a hollow-gourd rattle containing pebbles or beans and often played in pairs. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Marantz, Saul": {
    "term": "Marantz, Saul",
    "cat": "Pro Audio Reference",
    "def": "(1911-1997) American inventor and entrepreneur who pioneered high-fidelity audio equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Marconi, Guglielmo": {
    "term": "Marconi, Guglielmo",
    "cat": "Pro Audio Reference",
    "def": "(1874-1937) Italian engineer and inventor who in 1901 transmitted long-wave radio signals across the Atlantic Ocean and opened the door to a rapidly developing wireless industry. In 1909 he won the Nobel Prize in physics, shared with Karl Ferdinand Braun whose modifications to Marconi\u2019s transmitters significantly increased their range and usefulness. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "marimba Musical Instrument": {
    "term": "marimba Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A large wooden percussion instrument with resonators, resembling a xylophone. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Markov model": {
    "term": "Markov model",
    "cat": "Pro Audio Reference",
    "def": "A discrete, stochastic model in which the probability that the model is in a given state at a certain time depends only on the value of the immediately preceding state. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Marshall, Jim": {
    "term": "Marshall, Jim",
    "cat": "Pro Audio Reference",
    "def": "(1923-2012) Famous English businessman who founded Marshall Amplification.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Marshall, Steven Curtis See: Stephen St": {
    "term": "Marshall, Steven Curtis See: Stephen St",
    "cat": "Pro Audio Reference",
    "def": "Croix.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Martenot See:": {
    "term": "Martenot See:",
    "cat": "Pro Audio Reference",
    "def": "Ondes-Martenot.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Martin, Christian": {
    "term": "Martin, Christian",
    "cat": "Pro Audio Reference",
    "def": "Frederick (1796-1893) German emigrant who founded the legendary Martin & Co. guitar company in 1833.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Martin, George": {
    "term": "Martin, George",
    "cat": "Pro Audio Reference",
    "def": "(1926-2016) British recording engineer famous for his work with, and contribution to, the Beatles, which earned him the nickname of being the Fifth Beatle, as well as being knighted. Song-by-song contribution.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Martin, Hardy": {
    "term": "Martin, Hardy",
    "cat": "Pro Audio Reference",
    "def": "(1936-2016) American musician and entrepreneur who cofounder IED (Innovative Electronic Designs; now Atlas IED) and consider one of the digital audio pioneers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "marvelous marble": {
    "term": "marvelous marble",
    "cat": "Pro Audio Reference",
    "def": "machine Ingenious hand-cranked wooden machine uses 2,000 ball bearings to make music. Go here for comments by Martin Molin\u2014of the band Wintergatan\u2014the Swedish inventor and composer. And here for development videos of this stunning machine.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mask or masking (aka": {
    "term": "mask or masking (aka",
    "cat": "Hearing",
    "def": "The human hearing phenomenon where the response to one stimulus is reduced in the presence of another, i.e., two sounds arrive but only one sound is heard. Particularly evident when one sound is louder than another, with the result being that we hear the louder sound, even if arriving at a slightly different time. Frequency plays a part: a louder sound heard at one frequency prevents softer sounds near that frequency from being heard. However, not all frequencies mask the same. Mid-band frequencies mask far better than low frequencies, for example. Related to critical bands. Also see: temporal masking (e.g., forward and backward masking) and sound masking.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Massa, Frank": {
    "term": "Massa, Frank",
    "cat": "Pro Audio Reference",
    "def": "(1906-1990) American engineer who is considered the father of modern electroacoustics for developing the fundamental technology that became the foundation for electroacoustics. He is the recognized pioneer in the design of transducers and systems for both air and underwater applications, as well as the founder of Massa Products Corporation. Frank Massa and Harry Olson authored the first textbook on electroacoustics, Applied Acoustics, in 1934. See Fundamentals of Electroacoustics for further details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mastering Audio recording": {
    "term": "mastering Audio recording",
    "cat": "Pro Audio Reference",
    "def": "The final step in the recording process, completed before the replication or streaming process. The act of creating the master from which all copies will be made. The following lists many of the required artistic and technical steps, although some of these are more accurately referred to as pre-mastering steps leading to a preliminary master used to create the final production master.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Transfer": {
    "term": "Transfer",
    "cat": "Pro Audio Reference",
    "def": "the recording into the highest digital (or analog) format for the mastering steps. Fix unwanted noise problems, either captured during the recording process, or for restoration archival purposes. Edit and apply signal processing as required to optimize timbre, clarity, smoothness and impact. Maximize the stereo or surround-sound balance and spread. Maximize and smooth out differences in song levels. Add pre-emphasis equalization if required for the duplication media. Add ISRC and other subcodes as required. Sequence the songs into their optimum playing order. Create fade-ins, fade-outs, segues and spacing between songs. Hide bonus tracks by using creative subcoding, if requested. Format and transfer the final results to the required media for duplication. And sometimes, create the package artwork. Or, as DRT Mastering succinctly puts it: \u201cMastering creates a seamless whole out of a collection of individual tracks.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "master mic Teleconferencing": {
    "term": "master mic Teleconferencing",
    "cat": "Pro Audio Reference",
    "def": "Term referring to the microphone input on an automatic mic mixer that is the last to detect audio. A last-on mic becomes a master mic only if left open long enough.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "master port Teleconferencing": {
    "term": "master port Teleconferencing",
    "cat": "Pro Audio Reference",
    "def": "Term referring to the audio input port that is the last to detect audio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mathematics": {
    "term": "mathematics",
    "cat": "Pro Audio Reference",
    "def": "The study of the measurement, properties, and relationships of quantities and sets, using numbers and symbols. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mathmusician": {
    "term": "mathmusician",
    "cat": "Pro Audio Reference",
    "def": "The merger of mathematics and music. See examples from Vi Hart [Absolutely one of the most brilliant contributions to the Internet by a true genius. Check it out; you won\u2019t be disappointed.] and another\u2014quite different\u2013from Dr. Larry Lesser,",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "matrix-encoding": {
    "term": "matrix-encoding",
    "cat": "Audio",
    "def": "A technique of storing more than two audio channels on a two-channel medium or transmission format. Dolby Surround is an example, where the center and surround channels are electronically encoded into the left and right channels of a stereo signal (usually by broadband 90\u00b0 phase shifting and summing). On playback, the center and surround channel are decoded from the left and right signals. The problem inherent with matrix-encoding is the mathematical dilemma of trying to solve for four unknowns (left, right, center & surround) when you only have two equations (the stereo signal); you can get close but you cannot get the exact right answer (so you always have crosstalk). This contrasts with today\u2019s discrete digital channels.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "matrix-mixer Similar to": {
    "term": "matrix-mixer Similar to",
    "cat": "Pro Audio Reference",
    "def": "the matrix switcher (or router) below, but with additional signal processing features on all the inputs and outputs. With a matrix-mixer, not only can you assign any input to any output but you may add EQ, compression, change level, etc. Very elaborate models exist with as many as 32-channels in and 8 or more output channels (and as big as a Volkswagen). Also see mix-minus.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "matrix switcher": {
    "term": "matrix switcher",
    "cat": "Pro Audio Reference",
    "def": "See router.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Matsushita, Hideo": {
    "term": "Matsushita, Hideo",
    "cat": "Pro Audio Reference",
    "def": "(1919-2013) Founder and executive emeritus of Audio-Technica.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "maverick Being": {
    "term": "maverick Being",
    "cat": "Pro Audio Reference",
    "def": "independent in thought and action or exhibiting such independence. Believed after Samuel Augustus Maverick (1803-1870), American cattleman who left the calves in his herd unbranded. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Maxfield, J": {
    "term": "Maxfield, J",
    "cat": "Pro Audio Reference",
    "def": "P. American engineer who developed and was granted U.S. Patent #2,019, 616 for the first three-channel stereophonic system in 1935. He was a pioneer of motion picture sound while working for Western Electric. He also is credited with creating the 33 1/3 RPM record speed for synchronizing sound and motion pictures.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "maximally flat": {
    "term": "maximally flat",
    "cat": "Pro Audio Reference",
    "def": "magnitude response See: Butterworth crossover.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "maximum-length sequences": {
    "term": "maximum-length sequences",
    "cat": "Pro Audio Reference",
    "def": "See: MLS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Maxwell\u2019s equations": {
    "term": "Maxwell\u2019s equations",
    "cat": "Electronics",
    "def": "Four differential equations relating electricity and magnetism that form the basis of electrical and electronic engineering.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MAU (multistation": {
    "term": "MAU (multistation",
    "cat": "Pro Audio Reference",
    "def": "access unit) See token ring.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MBLV (Mobile": {
    "term": "MBLV (Mobile",
    "cat": "Pro Audio Reference",
    "def": "Beat Las Vegas) The number one trade show for mobile DJs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mbps (million": {
    "term": "Mbps (million",
    "cat": "Pro Audio Reference",
    "def": "bits per second) (always lower-case b) A popular measure of transmission speed, but should be Mibps, or mebi bits per second. See mebi.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MBps (million": {
    "term": "MBps (million",
    "cat": "Pro Audio Reference",
    "def": "bytes per second) (always upper-case B) A popular measure of transmission speed, but should be MiBps, or mebi bytes per second. See mebi.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MCA-I (Media": {
    "term": "MCA-I (Media",
    "cat": "Pro Audio Reference",
    "def": "Communications Association \u2013 International) See: ITVA",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "McIntosh, Frank": {
    "term": "McIntosh, Frank",
    "cat": "Pro Audio Reference",
    "def": "(1906-1990) American engineer and founder of McIntosh Labs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MD": {
    "term": "MD",
    "cat": "Terminology",
    "def": "(MiniDisc) Trademark term for the Sony digital audio recordable optical storage system utilizing data compression to reduce disc size.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MDCT (modified": {
    "term": "MDCT (modified",
    "cat": "Pro Audio Reference",
    "def": "discrete cosine transform) Audio Compression. A popular audio coding technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MDM (modular": {
    "term": "MDM (modular",
    "cat": "Pro Audio Reference",
    "def": "digital multitrack) Generic term used to describe any of the families of digital audio multitrack recorders. The most common examples being the Alesis ADAT series and the Tascam DA-88 series.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MDS (multidimensional scaling) Statistics": {
    "term": "MDS (multidimensional scaling) Statistics",
    "cat": "Pro Audio Reference",
    "def": "A method of displaying differences between items.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mebi Symbol": {
    "term": "mebi Symbol",
    "cat": "Pro Audio Reference",
    "def": "Mi New term standardized by the IEC as Amendment 2 to IEC 60027-2 Letter Symbols to be Used in Electrical Technology to signify binary multiples of 1,048,576 (i.e., 220). Meant to distinguish between exact binary and decimal quantities, i.e., 1,048,576 verses 1,000,000. For example, it is now 16 mebibits, abbreviated 16 Mib, not 16 megabits or 16 Mb.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "media converter": {
    "term": "media converter",
    "cat": "Pro Audio Reference",
    "def": "or media manager The ability to manage and the process of managing different media (coaxial cable, twisted-pair cable, and fiber-optics cable) used within the same network. Media management involves cable performance monitoring, cable break detection, planning for cable routes, as while as converting data signals between the various media.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "medical conferencing": {
    "term": "medical conferencing",
    "cat": "Pro Audio Reference",
    "def": "See telemedicine.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "medium 1": {
    "term": "medium 1",
    "cat": "Pro Audio Reference",
    "def": "In telecommunications, the transmission path along which a signal propagates, such as a twisted-pair, coaxial cable, waveguide, fiber optics, or through water, or air. 2. The material on which data are recorded, such as plain paper, paper tapes, punched cards, magnetic tapes, magnetic disks, or optical discs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MEDUSA (Mob": {
    "term": "MEDUSA (Mob",
    "cat": "Pro Audio Reference",
    "def": "Excess Deterrent Using Silent Audio) A microwave ray gun that beams sounds directly into people\u2019s brains, developed by Sierra Nevada Corporation. Short microwave bursts rapidly heat tissue, which causes a shockwave inside the skull that is detectable by the ears. Also see: Mosquito\u2122. [Ah yes, science at its best.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "meep Sound": {
    "term": "meep Sound",
    "cat": "Pro Audio Reference",
    "def": "\u201d An exclamation akin to \u2018ouch\u2019 or \u2018uh oh..\u2019 Urban Dictionary.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mega- 1": {
    "term": "mega- 1",
    "cat": "Pro Audio Reference",
    "def": "A prefix signifying one million (106). abbreviated M. 2. A prefix popularly used in computer work to signify multiples of 1,048,576 (i.e., 220), but should use mebi.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "megabyte Popular term meaning": {
    "term": "megabyte Popular term meaning",
    "cat": "Pro Audio Reference",
    "def": "a million bytes but should be mebibytes. See mebi.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "megacycle See": {
    "term": "megacycle See",
    "cat": "Pro Audio Reference",
    "def": "megahertz.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "megaflops See": {
    "term": "megaflops See",
    "cat": "Pro Audio Reference",
    "def": "MFLOPS",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "megahertz Abbr": {
    "term": "megahertz Abbr",
    "cat": "Pro Audio Reference",
    "def": "MHz One million cycles per second. Also called megacycle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MEIEA (Music": {
    "term": "MEIEA (Music",
    "cat": "Pro Audio Reference",
    "def": "& Entertainment Industry Educators) An international organization formed in 1979 to bring together educators with leaders of the music and entertainment industries.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mel scale A unit of pitch": {
    "term": "mel scale A unit of pitch",
    "cat": "Pro Audio Reference",
    "def": "A pure tone, frontally presented, having a frequency of 1000 Hz and a sound pressure level of 40 dB re 20 micropascals causes a pitch of 1000 mels. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mel filter": {
    "term": "mel filter",
    "cat": "Pro Audio Reference",
    "def": "See MFCC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "melisma": {
    "term": "melisma",
    "cat": "Music",
    "def": "A passage of several notes sung to one syllable of text, as in Gregorian chant. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mellotron Musical Instrument": {
    "term": "Mellotron Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "The first sampling keyboard, made famous by The Beatles, who used it prominently on their 1967 hit Strawberry Fields Forever. Not digital, it uses strips of magnetic recording tape.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Melodeon See:": {
    "term": "Melodeon See:",
    "cat": "Pro Audio Reference",
    "def": "reed organ.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "membranophone Generic": {
    "term": "membranophone Generic",
    "cat": "Pro Audio Reference",
    "def": "term for instruments that produce their sound from tightly stretched membranes. They are subdivided according to whether they are struck drums, plucked drums, friction drums or singing membranes (which are made to vibrate by speaking or singing into them). Membranophone form one of the four main classes of instruments. [Sadie] See: aerophone, chordophone, idiophone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "memristor (memory": {
    "term": "memristor (memory",
    "cat": "Pro Audio Reference",
    "def": "resistor) Electronic-circuit theory. The theoretical fourth two-port passive-component element, with the other three being resistors, capacitors and inductors. First postulated by Leon Chua, Professor at UC Berkeley, in his 1971 paper for IEEE Transactions on Circuit Theory. The first practical example was demonstrated by R. Stanley Williams, a Hewlett-Packard senior fellow in 2008.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MEMS (microelectromechanical systems)": {
    "term": "MEMS (microelectromechanical systems)",
    "cat": "Pro Audio Reference",
    "def": "The acronym says it all. Check out this clearinghouse website for the latest info.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MEMS microphone": {
    "term": "MEMS microphone",
    "cat": "Pro Audio Reference",
    "def": "Pro audio theory and application for new microphones based on MEMS technology. First commercial products available from Akustica.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mercer, Johnny": {
    "term": "Mercer, Johnny",
    "cat": "Pro Audio Reference",
    "def": "(1909-1976) American songwriter who wrote the lyrics to more than a thousand songs and received nineteen Academy Award nominations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MerleFest MerleFest": {
    "term": "MerleFest MerleFest",
    "cat": "Pro Audio Reference",
    "def": "was founded in 1988 in Memory of Eddy Merle Watson as a fundraiser for Wilkes Community College and to celebrate \u201ctraditional plus\u201d music. Country and bluegrass festival held at the Wilkes Community College in Wilkesboro, NC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mesa filter": {
    "term": "Mesa filter",
    "cat": "Pro Audio Reference",
    "def": "Term coined by Lake Technology Ltd for their Lake Contour\u2122 EQ technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mesh ground (a.k.a": {
    "term": "mesh ground (a.k.a",
    "cat": "Pro Audio Reference",
    "def": "common-bonded network) \u201cA system where every piece of structural and non-structural metalwork in a building is bonded together. This includes concrete reinforcing bars, girders, cable trays, ducts, deck-plates, gratings, frameworks, raised-floor stringers, conduits, elevators, window and door frames, and the metal pipe-work used for HVAC to make a highly interconnected system that is finally connected to the lightning protection system.\u201d From A Practical Interference Free Audio System by Tony Waldron, Technical Manager, CADAC Electronics PLC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "METAlliance (Music": {
    "term": "METAlliance (Music",
    "cat": "Pro Audio Reference",
    "def": "Engineering & Technology Alliance) \u201d \u2026 collaborative community in which producers, engineers and audio technology manufacturers work together to ensure the highest standards of audio production and delivery through developing consumer formats.\u201d [From website.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "metadata Data about data": {
    "term": "metadata Data about data",
    "cat": "Pro Audio Reference",
    "def": "See: Michael Day, \u201cMetadata in a Nutshell,\u201d and \u201cDemystifying Audio Metadata,\u201d J. Audio Eng. Soc., Vol. 51, No. 7/8, pp 744-751, July/Aug 2003.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "meter Abbr": {
    "term": "meter Abbr",
    "cat": "Pro Audio Reference",
    "def": "m 1. The international standard unit of length, approximately equivalent to 39.37 inches. It was redefined in 1983 as the distance traveled by light in a vacuum in 1/299,792,458 of a second. 2. Indicators. Any of various devices designed to measure time, distance, speed, or intensity or indicate and record or regulate the amount or volume, as of the flow of a gas or an electric current. 3. Music. a. Division into measures or bars. b. A specific rhythm determined by the number of beats and the time value assigned to each note in a measure. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "meter ballistics Term describing": {
    "term": "meter ballistics Term describing",
    "cat": "Pro Audio Reference",
    "def": "the response characteristics of a meter indicator. Applies to all meters from original iron vane, taut-band or pivot & jewel mechanical analog designs to LED, LCD or plasma ladder arrays. Two universal standards exist for audio use: the VU meter and the PPM (peak program meter). The indicator attack (or rise) times are specified as well as the decay (or fall) rates along with the recommended detector method. Also see: peak hold.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "metric Of": {
    "term": "metric Of",
    "cat": "Pro Audio Reference",
    "def": "or relating to the meter or the metric system. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "metronome": {
    "term": "metronome",
    "cat": "Music",
    "def": "A device used to mark time by means of regularly recurring ticks or flashes at adjustable intervals. [AHD] Originally mechanical devices that produced clicks over a range of 40-240 BPM (beats per minute), today most are electronic wonders.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MFCC (mel-filtered cepstral coefficients)": {
    "term": "MFCC (mel-filtered cepstral coefficients)",
    "cat": "Pro Audio Reference",
    "def": "An important analysis parameter in CBID systems. These coefficients describe the harmonic spectrum shape perceived by the human auditory system, i.e., they characterize the shape of sound. For details, see Audible Magic, one of the leaders in CBID systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MFLOPS (pronounced": {
    "term": "MFLOPS (pronounced",
    "cat": "Pro Audio Reference",
    "def": "\u201cmega-flops\u201d) (million floating point operations per second) A measure of computing power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mi": {
    "term": "mi",
    "cat": "Music",
    "def": "The third tone of the diatonic scale in solfeggio. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MI": {
    "term": "MI",
    "cat": "Terminology",
    "def": "(musical instrument) A broad term used to describe the musical instrument marketplace in general. Reference is made to \u201cthe MI market,\u201d or to a specific \u201cMI store.\u201d If a store sells band instruments, it is an MI store.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIAC (Music": {
    "term": "MIAC (Music",
    "cat": "Pro Audio Reference",
    "def": "Industries Association of Canada) \u201cA national not-for-profit trade association that represents Canadian manufacturers, distributors and retailers of musical instruments and accessories, keyboards, sound reinforcement products and published music.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mice music": {
    "term": "mice music",
    "cat": "Pro Audio Reference",
    "def": "\u201cScientists have known for decades that female lab mice or their pheromones cause male lab mice to make ultrasonic vocalizations. But a new paper from researchers at Washington University School of Medicine in St. Louis establishes for the first time that the utterances of the male mice are songs.\u201d Hit the link for the whole story.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mic-level See": {
    "term": "mic-level See",
    "cat": "Pro Audio Reference",
    "def": "levels.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "micro- Prefix": {
    "term": "micro- Prefix",
    "cat": "Pro Audio Reference",
    "def": "for one millionth (10-6), abbreviated \u00b5.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microbar": {
    "term": "microbar",
    "cat": "Pro Audio Reference",
    "def": "A unit of pressure equal to one millionth of a bar. [Not to be confused with microbrew.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microcontroller See:": {
    "term": "microcontroller See:",
    "cat": "Pro Audio Reference",
    "def": "microprocessor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microfarad Abbr": {
    "term": "microfarad Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u00b5F or uF A unit of capacitance equal to one millionth (10-6) of a farad.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microfiche One millionth of": {
    "term": "microfiche One millionth of",
    "cat": "Pro Audio Reference",
    "def": "a fish.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "micrometer Abbr": {
    "term": "micrometer Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u00b5m A unit of length equal to one thousandth (10-3) of a millimeter or one millionth (10-6)of a meter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "micron": {
    "term": "micron",
    "cat": "Pro Audio Reference",
    "def": "A deprecated unit of measure equal to a micrometer, one-millionth of a meter. No longer used.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphone Abbr": {
    "term": "microphone Abbr",
    "cat": "Pro Audio Reference",
    "def": "mic (never \u201cmike\u201d); however the abbreviation for the verb is miking (never \u201cmic\u2019ing\u201d) [One of the many inconsistencies of pro audio jargon.] An electroacoustic transducer used to convert the input acoustic energy into an electrical energy output. Many methods exist; see, for example, electret microphone, condenser microphone, and dynamic microphone. The inventor of the carbon microphone is Emil Berliner. The name \u201cmicrophone\u201d was coined by Narcissus Marsh: \u201cIn 1683 Marsh became one of the first members of the Dublin Philosophical Society. He contributed an early paper to that Society, called \u201cAn Introductory Essay on the Doctrine of Sounds, Containing some Proposals for the Improvement of Accousticks\u201d in which he apparently was the first to use the word microphone.\u201d Also see: Spooky & the Metronome.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphone directivity": {
    "term": "microphone directivity",
    "cat": "Pro Audio Reference",
    "def": "See: microphone polar patterns.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphone, optical": {
    "term": "microphone, optical",
    "cat": "Pro Audio Reference",
    "def": "See: optical microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphone polar": {
    "term": "microphone polar",
    "cat": "Pro Audio Reference",
    "def": "patterns (also called microphone directivity response)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "omnidirectional": {
    "term": "omnidirectional",
    "cat": "Pro Audio Reference",
    "def": "A response pattern that is as close to a perfect sphere as possible, i.e., it is not directional at all, or is a non-directional microphone. cardioid An on-axis response shaped like a cardioid with essentially no pickup to the rear. supercardioid cardioid-shaped response that includes small pickup directly to the rear. hypercardioid A cardioid-shaped response that includes greater rear pickup than the supercardioid design. subcardioid A cardioid-shaped response that does not tuck-in or null at the rear, instead has a smooth flat response to the rear. figure-of-eight A bidirectional microphone or one that responds equally front and rear and not at all to side sounds. shotgun The most directional response pattern, characterized by small sensitivity lobes on the left, right, and rear, with extreme sensitivity to the front. microphone positioning See: Positioning Microphones Cheat Sheet",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphonic cables": {
    "term": "microphonic cables",
    "cat": "Pro Audio Reference",
    "def": "See: triboelectric effect.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphone sensitivity": {
    "term": "microphone sensitivity",
    "cat": "Pro Audio Reference",
    "def": "See: sensitivity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphone tips": {
    "term": "microphone tips",
    "cat": "Pro Audio Reference",
    "def": "See: Audio-Technica\u2019s How To Mic A Zombie.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microphonic General": {
    "term": "microphonic General",
    "cat": "Pro Audio Reference",
    "def": "Any noise cause by mechanical shock or vibration of elements in a system (IEEE Std 100). Audio. Electrical noise caused by mechanical or audio induced vibration of the object. Common examples are vacuum tubes where mechanical vibration of the tube causes modulation of the electrode current, and capacitors that induce noise when tapped or vibrated in any manner.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microprocessor": {
    "term": "microprocessor",
    "cat": "Pro Audio Reference",
    "def": "An integrated circuit that performs a variety of operations in accordance with a list of instructions. The core of a microcomputer or personal computer, a one chip computer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microsecond Abbr": {
    "term": "microsecond Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u00b5s One millionth (10-6) of a second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Microsoft\u00ae(microcomputer software)": {
    "term": "Microsoft\u00ae(microcomputer software)",
    "cat": "Pro Audio Reference",
    "def": "Founded by Bill Gates and Paul Allen in 1975, whose relationship began with their first business venture named Traf-O-Data.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microstrip": {
    "term": "microstrip",
    "cat": "Electronics",
    "def": "A flat transmission line consisting of a conductive strip and a ground plane separated by dielectric. Contrast with stripline.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mic splitter": {
    "term": "mic splitter",
    "cat": "Pro Audio Reference",
    "def": "A phrase first coined by Franklin J. Miller, founder of Sescom, to describe a box fitted with female (inputs) and male (outputs) XLR mic connectors that allowed mic inputs to be routed to two, or more outputs. Usually passive, either hard-wired, or transformer connected. One common usage is for on-stage mic splitting, where one output goes to the monitor mixer and one to the FOH mixer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "middle C": {
    "term": "middle C",
    "cat": "Music",
    "def": "The tone represented by a note on the first ledger line below a treble clef or the first ledger line above a bass clef. It is the first C below international pitch. [AHD] The pitch equals 261.6 Hz and is the MIDI note number 60.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIDEM": {
    "term": "MIDEM",
    "cat": "Pro Audio Reference",
    "def": "An exhibition for music professionals held in Cannes, France each year at the Palais des Festivals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIDI (musical": {
    "term": "MIDI (musical",
    "cat": "Pro Audio Reference",
    "def": "instrument digital interface) Industry standard bus and protocol for interconnection and control of musical instruments. First launched in 1983, now generalized and expanded to include signal processing and lighting control. See MMA [Historical Note: MIDI began with Dave Smith, President of Sequential Circuits, who delivered an AES paper in the Fall of 1981 (The \u201cUSI,\u201d or Universal Synthesizer Interface by Dave Smith and Chet Wood, 70th AES Convention, 1981, preprint 1845). He is credited with the original concept, but he admits that the initial idea of needing some sort of standard interface originated by both Oberheim and Roland. Sources: Polyphony, February 1983, pp. 36-40 and an official IMA (International MIDI Association) publication, Exploring MIDI by David Droman in 1984.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIDI show control": {
    "term": "MIDI show control",
    "cat": "Pro Audio Reference",
    "def": "A term originally created by Charlie Richmond (Richmond Sound Design) to describe a new form of MIDI control designed for live theater venues. His efforts resulted in the official MIDI Show Control (MSC) specification. This document states: \u201cThe purpose of MIDI Show Control is to allow MIDI systems to communicate with and to control dedicated intelligent control equipment in theatrical, live performance, multi-media, audio-visual and similar environments.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIDI time": {
    "term": "MIDI time",
    "cat": "Pro Audio Reference",
    "def": "code See time code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "military music \u201cMilitary justice": {
    "term": "military music \u201cMilitary justice",
    "cat": "Pro Audio Reference",
    "def": "is to justice what military music is to music.\u201d \u2014 Groucho Marx [from Barber]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Miller effect": {
    "term": "Miller effect",
    "cat": "Electronics",
    "def": "The input impedance, and hence frequency response, of an inverting voltage amplifier stage is strongly affected by the feedback from the output to the input. This effect was first described by John M. Miller in his paper, \u201cDependence of the input impedance of a three-electrode vacuum tube upon the load in the plate circuit,\u201d Scientific Papers of the Bureau of Standards Vol. 15, pp. 367-385, 1920. This effect is used often in power amplifiers and op amps to set the frequency response and guarantee stability by forcing a single-pole (6 dB/octave, 90 degree phase shift) roll-off. Analog power amplifiers in their simplest form consist of an input differential pair that produces a single-ended output to drive a class A common-emitter amplifier voltage gain stage, followed by a push-pull emitter follower current gain class AB output stage. If a single capacitor is connected between the base and collector of the class A stage (called the \u201cMiller capacitor\u201d) it will create a stable dominate pole for the entire amplifier. In this circuit the effect described by Miller acts as a capacitance multiplier, allowing a small capacitor to set the overall response.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "milli- Prefix": {
    "term": "milli- Prefix",
    "cat": "Pro Audio Reference",
    "def": "for one thousandth (10-3), abbreviated m.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "milliampere Abbr": {
    "term": "milliampere Abbr",
    "cat": "Pro Audio Reference",
    "def": "mA A unit of current equal to one thousandth (10-3) of an ampere.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "millihenry Abbr": {
    "term": "millihenry Abbr",
    "cat": "Pro Audio Reference",
    "def": "mH A unit of inductance equal to one thousandth (10-3) of a henry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "millimeter Abbr": {
    "term": "millimeter Abbr",
    "cat": "Pro Audio Reference",
    "def": "mm A unit of length equal to one thousandth (10-3) of a meter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "millisecond Abbr": {
    "term": "millisecond Abbr",
    "cat": "Pro Audio Reference",
    "def": "ms A unit of time equal to one thousandth (10-3) of a second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "millivolt Abbr": {
    "term": "millivolt Abbr",
    "cat": "Pro Audio Reference",
    "def": "mV A unit of voltage equal to one thousandth (10-3) of a volt.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "milonga Dance": {
    "term": "milonga Dance",
    "cat": "Pro Audio Reference",
    "def": "A understated version of the tango. Music A singing style that originated in the R\u00edo de la Plata area of Argentina and Uruguay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIM (Music": {
    "term": "MIM (Music",
    "cat": "Pro Audio Reference",
    "def": "Instrument Museum) \u201cWith musical instruments from every country in the world, MIM will pay homage to the history and diversity of instruments and introduce museum guests to their varied and unique sounds. MIM will be an engaging, entertaining, and informative experience, in which the uninitiated and the knowledgeable, the young and the old will feel welcome.\u201d [From the website.] Here is a preview video.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIMO (pronounced": {
    "term": "MIMO (pronounced",
    "cat": "Pro Audio Reference",
    "def": "\u201cmy-moh\u201d or \u201cme-moh\u201d) (multiple-input multiple-output) A broadcast technology utilizing multiple antennas at the transmitter and the receiver for better communication.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Minifon": {
    "term": "Minifon",
    "cat": "Pro Audio Reference",
    "def": "An early portable dictating machine developed in the 1950s using wire recorder technology. An example of \u201cdead recording media.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "minimum-phase Networks": {
    "term": "minimum-phase Networks",
    "cat": "Pro Audio Reference",
    "def": "\u201cIf a network is minimum phase, there exists a unique relationship between amplitude and phase which allows a complete determination of phase from amplitude.\u201d [Richard C. Heyser, \u201cLoudspeaker Phase Characteristics and Time Delay Distortion: Part 1,\u201d J. Audio Eng. Soc., vol. 17, p. 31 (Jan., 1969).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "minimum-phase filters Electrical circuits": {
    "term": "minimum-phase filters Electrical circuits",
    "cat": "Pro Audio Reference",
    "def": "From an electrical engineering viewpoint, the precise definition of a minimum-phase function is a detailed mathematical concept involving positive real transfer functions, i.e., transfer functions with all zeros restricted to the left half s-plane (complex frequency plane using the Laplace transform operator s). This guarantees unconditional stability in the circuit. For example, all equalizer designs based on 2nd-order bandpass or band-reject networks have minimum-phase characteristics. Acoustics A term used to mean a linear phase (or phase linear, European term) system. See group delay and the RaneNote Exposing Equalizer Mythology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "minimum-phase loudspeaker": {
    "term": "minimum-phase loudspeaker",
    "cat": "Pro Audio Reference",
    "def": "One where \u201cthe measurement of either phase or amplitude is sufficient to characterized the frequency response completely.\u201d [Richard C. Heyser, \u201cLoudspeaker Phase Characteristics and Time Delay Distortion: Part 1,\u201d J. Audio Eng. Soc., vol. 17, p. 31 (Jan., 1969).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "minute (time) Abbr": {
    "term": "minute (time) Abbr",
    "cat": "Pro Audio Reference",
    "def": "min A unit of time equal to one sixtieth of an hour, or 60 seconds.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "minute (plane angle) Abbr": {
    "term": "minute (plane angle) Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u2018 A unit of angular measurement equal to one sixtieth of a degree, or 60 seconds.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIPA (Musikmesse": {
    "term": "MIPA (Musikmesse",
    "cat": "Pro Audio Reference",
    "def": "International Press Awards) More than 100 international pro audio magazines award the best of each year\u2019s Musikmesse trade show.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIPS (million": {
    "term": "MIPS (million",
    "cat": "Pro Audio Reference",
    "def": "instructions processed per second) A measure of computing power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mix-minus": {
    "term": "mix-minus",
    "cat": "Pro Audio Reference",
    "def": "A specialized matrix-mixer where there is one output associated with each input that includes all other inputs except the one it is associated with. (The output is the complete mix, minus the one input.) In this manner, the simplest mix-minus designs have an equal number of inputs and outputs (a square matrix). For example, if there were 8-inputs, there would be 8-outputs. Each output would consists of a mix of the seven other inputs, but not its own. Therefore Output 1, for instance, would consist of a mix of Inputs 2-8, while Output 2 would consist of a mix of Inputs 1 & 3-7, Output 3 would consist of a mix of Inputs 1,2 & 4-7, and so on. Primary usage is large conference rooms, where it is desirable to have the loudspeaker closest to each microphone exclude that particular microphone, so as to reduce the chance of feedback. See the RaneNote Introduction to Speech Reinforcement with Conferencing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mixer At": {
    "term": "mixer At",
    "cat": "Pro Audio Reference",
    "def": "its simplest level, an audio device used to add (combine or sum) multiple inputs into one or two outputs, complete with level controls on all inputs. From here signal processing is added to each of the inputs and outputs until behemoth monsters with as many as 64 inputs are created \u2014 at a cost of many kilobucks per input for fully digitized and automated boards. At these price points a mixer becomes a recording console.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mLAN (music": {
    "term": "mLAN (music",
    "cat": "Pro Audio Reference",
    "def": "local area network) A technology developed and licensed by Yamaha based on the IEEE 1394 standard. It is a high-level multichannel audio, video and MIDI networking and connection-management protocol.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MLP (Meridian Lossless Packing)": {
    "term": "MLP (Meridian Lossless Packing)",
    "cat": "Pro Audio Reference",
    "def": "A lossless audio coding scheme developed by Meridian Audio Ltd. MLP has been selected as the optional coding scheme for use on DVD-Audio, as well as other transmission, storage and archiving applications. It is a true lossless coding technology, in that the recovered audio is bit-for-bit identical to the original. Unlike perceptual or lossy data reduction, MLP does not alter the final decoded signal in any way, but merely \u201cpacks\u201d the audio data more efficiently into a smaller data rate for transmission or storage. It is simple to decode and requires relatively low computational power for playback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mirror ball": {
    "term": "mirror ball",
    "cat": "Pro Audio Reference",
    "def": "See: disco ball.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MLS (maximum-length sequences)": {
    "term": "MLS (maximum-length sequences)",
    "cat": "Pro Audio Reference",
    "def": "A time-domain-based analyzer using a mathematically designed test signal optimized for sound analysis. The test signal (a maximum-length sequence) is electronically generated and characterized by having a flat energy-vs.-frequency curve over a wide frequency range. Sounding similar to white noise, it is actually periodic, with a long repetition rate. This test signal is most often tailored to be pink noise, as the preferred response for fractional octave analysis. Similar in principle to impulse response testing \u2013 think of the maximum-length sequence test signal as a series of randomly distributed positive- and negative-going impulses. See: MLSSA",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MLSSA (pronounced": {
    "term": "MLSSA (pronounced",
    "cat": "Pro Audio Reference",
    "def": "\u201cMelissa\u201d) (maximum-length sequences system analyzer) Trademarked name for the first MLS measurement instrument designed by DRA Laboratories (Sarasota, FL). M.R. Schroeder used maximum-length-sequences methods for room impulse response measurement in 1979 (based on work dating back to the mid-60\u2019s); however, it was not until 1987 that the use of MLS became commercially available. The first MLS instrument was developed and made practical by Douglas Rife, who described the principles in his landmark paper (co-authored by John Vanderkooy, University of Waterloo) \u201cTransfer-Function Measurement with Maximum-Length Sequences\u201d (J. Audio Eng. Soc., vol. 37, no. 6, June 1989), and followed up with new applications described in \u201cModulation Transfer Function Measurement with Maximum-Length Sequences\u201d (J. Audio Eng. Soc., vol. 40, no. 10, October 1992).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMA (MIDI Manufacturers Association)": {
    "term": "MMA (MIDI Manufacturers Association)",
    "cat": "Pro Audio Reference",
    "def": "The original source for information on MIDI technology, where companies work together to create the standards upon which MIDI compatibility is built.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMCD (multimedia": {
    "term": "MMCD (multimedia",
    "cat": "Pro Audio Reference",
    "def": "compact disc) See DVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mmF (micro-micro-Farad) Capacitors": {
    "term": "mmF (micro-micro-Farad) Capacitors",
    "cat": "Pro Audio Reference",
    "def": "Old term used before pico- became standard. Pronounced \u201cmickey-mics\u201d by old-timers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMM See:": {
    "term": "MMM See:",
    "cat": "Pro Audio Reference",
    "def": "marvelous marble machine.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMVF (multimedia": {
    "term": "MMVF (multimedia",
    "cat": "Pro Audio Reference",
    "def": "video file) See DVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MNEC (Mass": {
    "term": "MNEC (Mass",
    "cat": "Pro Audio Reference",
    "def": "Notification & Emergency Communications) A trade organization providing resources for personnel working with the National Fire Alarm and Signaling Code (NFPA 72).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mobile Beat": {
    "term": "Mobile Beat",
    "cat": "Pro Audio Reference",
    "def": "Las Vegas See: MBLV.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M\u00f6bius, August": {
    "term": "M\u00f6bius, August",
    "cat": "Pro Audio Reference",
    "def": "Ferdinand (1790-1868) German mathematician and astronomer famous for his \u201cstrip\u201d and as a pioneer in the field of topology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M\u00f6bius (or Moebius) strip Mathematics": {
    "term": "M\u00f6bius (or Moebius) strip Mathematics",
    "cat": "Pro Audio Reference",
    "def": "A topological oddity, it is a continuous closed surface with no outside and no inside, i.e., it is a one-sided two-dimensional surface. Cutting it lengthwise down the middle does not produce two pieces, instead it produces a larger loop! See link for how to make a M\u00f6bius strip. [After August Ferdinand M\u00f6bius.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOBO (Music": {
    "term": "MOBO (Music",
    "cat": "Pro Audio Reference",
    "def": "of Black Origin) An organization that \u201cidentifies, showcases and celebrates music derived from black heritage.\u201d A U.K. award show called the MOBO Awards.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "modal": {
    "term": "modal",
    "cat": "Acoustics",
    "def": "Of, relating to, or characteristic of a room mode or modes. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "modes Shorten": {
    "term": "modes Shorten",
    "cat": "Pro Audio Reference",
    "def": "form of room modes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "modem (modulator-demodulator)": {
    "term": "modem (modulator-demodulator)",
    "cat": "Pro Audio Reference",
    "def": "A peripheral device used to convert digital signals (\u201c1s\u201d and \u201c0s\u201d) into analog signals (tones) and vice versa, necessary for communication using standard telephone lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "modified discrete": {
    "term": "modified discrete",
    "cat": "Pro Audio Reference",
    "def": "cosine transform See MDCT.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "modulation 1": {
    "term": "modulation 1",
    "cat": "Pro Audio Reference",
    "def": "The act or process of modulating. 2. The state of being modulated. 3. Music a. A passing or transition from one key or tonality to another. b. The result of such a transition. 4. a. A change in stress, pitch, loudness, or tone of the voice; an inflection of the voice. b. An instance of such a change or an inflection. 5. The harmonious use of language, as in poetry or prose. 6. Electronics The variation of a property of an electromagnetic wave or signal, such as its amplitude, frequency, or phase. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "modulation noise Signal Processing": {
    "term": "modulation noise Signal Processing",
    "cat": "Pro Audio Reference",
    "def": "Any artifact that did not exist in the original signal and that varies with the signal strength. Common to analog tape recorders.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mojo 1": {
    "term": "mojo 1",
    "cat": "Pro Audio Reference",
    "def": "A charm or amulet thought to have magic powers. 2. Slang: power, luck, etc., as of magical or supernatural origin. 3. Mojo Series Rane Corporation trademark for their discontinued series of economical products designed for high quality performance and reliability aimed at the working musician. 4. Abbr. Mother Jones magazine, or reference to their Internet news network: The Mojo Wire",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOL (maximum output level) Magnetic tape": {
    "term": "MOL (maximum output level) Magnetic tape",
    "cat": "Pro Audio Reference",
    "def": "The maximum output level of a magnetic tape is defined as the magnetization level at which a recorded 1 kHz sine wave reaches 3% third-harmonic distortion (note that is 3% THIRD-harmonic distortion \u2014 not 3% TOTAL harmonic distortion). Also referred to as 3% distortion of the musical twelfth. See third-harmonic distortion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Moldavian pan": {
    "term": "Moldavian pan",
    "cat": "Pro Audio Reference",
    "def": "flute See: nai.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOMM (Museum": {
    "term": "MOMM (Museum",
    "cat": "Pro Audio Reference",
    "def": "of Making Music) \u201cFounded in 1998 by the National Association of Music Merchants (NAMM), the Museum of Making Music was developed to showcase and celebrate the music products industry.\u201d [From website.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mondegreen": {
    "term": "mondegreen",
    "cat": "Pro Audio Reference",
    "def": "The term for representing a series of words resulting from the mishearing of a statement or song lyric. Variously attributed to Sylvia Wright, who is credited with coining the word in a 1954 Harper\u2019s column, and also to Jon Carroll by Pinker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Monitor World Live sound": {
    "term": "Monitor World Live sound",
    "cat": "Pro Audio Reference",
    "def": "Area of the live sound stage where the monitor engineer mixes his/her magic and attempts to decipher cryptic hand signals from the performers. Not to be confused with \u201cGuitar-Tech-Land\u201d, where all the babes hang out.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "monitor mixer": {
    "term": "monitor mixer",
    "cat": "Pro Audio Reference",
    "def": "A mixer used to create the proper signals to drive the individual musician stage loudspeaker monitors. Also called foldback speakers. Compare with FOH.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mono Shorten": {
    "term": "mono Shorten",
    "cat": "Pro Audio Reference",
    "def": "form of monophonic, or monaural, relating to a system of transmitting, recording, or reproducing sound in which one or more sources are connected to a single channel; monaural. [AHD] Compare to stereo.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "monoed One": {
    "term": "monoed One",
    "cat": "Pro Audio Reference",
    "def": "of many pro audio inspired jargon terms it is the verb form for mono. Usually meaning the result of mixing left and right channels. [Yes, it is a word; yes, it is correct.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mono 3-way, etc": {
    "term": "mono 3-way, etc",
    "cat": "Pro Audio Reference",
    "def": "See active crossover.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "monopole woofer system": {
    "term": "monopole woofer system",
    "cat": "Loudspeakers",
    "def": "Literally \u201cone pole,\u201d the most common form of woofer system that acts like an omnidirectional sound source, thus exciting room modes more than the alternative dipole woofer systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "monotonic": {
    "term": "monotonic",
    "cat": "Mathematics",
    "def": "Designating sequences, the successive members of which either consistently increase or decrease but do not oscillate in relative value. Each member of a monotone increasing sequence is greater than or equal to the preceding member; each member of a monotone decreasing sequence is less than or equal to the preceding member. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Monte Carlo": {
    "term": "Monte Carlo",
    "cat": "Pro Audio Reference",
    "def": "method Of or relating to a problem-solving technique that uses random samples and other statistical methods for finding solutions to mathematical or physical problems. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "month One of": {
    "term": "month One of",
    "cat": "Pro Audio Reference",
    "def": "the words in the English language without a rhyme \u2014 some others are \u201corange,\u201d \u201cpurple\u201d and \u201csilver.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Moog, Robert A": {
    "term": "Moog, Robert A",
    "cat": "Pro Audio Reference",
    "def": "(1934-2005) American engineer best known for inventing the Moog synthesizer. Inducted into the Inventors Hall of Fame in 2013.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Moogfest \u201cMoogfest": {
    "term": "Moogfest \u201cMoogfest",
    "cat": "Pro Audio Reference",
    "def": "is the annual event that honors the remarkable vision of Robert Moog and his amazing musical inventions that changed the course of music. Moogfest is a 3-day, multi-venue event originally held in Asheville, NC\u2014the place Bob Moog called home for the last 30 years of his life\u2014now held in Durham, NC. [From website.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Moog synthesizer": {
    "term": "Moog synthesizer",
    "cat": "Pro Audio Reference",
    "def": "The first electronic keyboard invented by US engineer Robert A. Moog in collaboration with composer Herbert A. Deutsch. Introduced in 1964, but not made popular until Wendy Carlos released the megahit album Switched-On Bach in 1968. For the complete history see Electronic and Experimental Music by Thom Holmes. Moog was granted U.S. Patent 4,050,343 Electronic music synthesizer, in 1977.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "moon guitar": {
    "term": "moon guitar",
    "cat": "Pro Audio Reference",
    "def": "See yue qin",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Moonrise Festival": {
    "term": "Moonrise Festival",
    "cat": "Pro Audio Reference",
    "def": "Popular music festival held yearly in Baltimore, MD, featuring international, regional and local EDM talent and live acts..",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Moore\u2019s Law 1": {
    "term": "Moore\u2019s Law 1",
    "cat": "Pro Audio Reference",
    "def": "Named by the physicist Carver Mead, after Gordon E. Moore, a cofounder of Intel, who wrote in an Electronics magazine article in 1965, that computer chip complexity would double every twelve months for the next ten years. Ten years later his forecast proved to be correct. At that time, he then predicted that the doubling would happen every two years for the next ten years. Ten years later, he was, once again, proved correct. By combining the two predictions, Moore\u2019s Law is often stated as a doubling every 18 months. 2. The dictum that requires you to buy a new computer every two years. [Thanks DC.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOR (magneto-optical recording)": {
    "term": "MOR (magneto-optical recording)",
    "cat": "Pro Audio Reference",
    "def": "An erasable optical disc system using magnetic media and laser reading/writing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "morin khuur Musical Instrument": {
    "term": "morin khuur Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Mongolian horse-headed violin. Nickname is horse head fiddle. [Think two-string cello.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "morphing Shorten form of metamorphose": {
    "term": "morphing Shorten form of metamorphose",
    "cat": "Pro Audio Reference",
    "def": "To transform (an image) by computer: cinematic special effects that morphed the villain into a snake. [AHD] See sound morphing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Morse, Samuel": {
    "term": "Morse, Samuel",
    "cat": "Pro Audio Reference",
    "def": "Finley Breese (1791-1872) American artist (true fact) and inventor best known as co-inventor of Morse code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOS-CQE (Mean": {
    "term": "MOS-CQE (Mean",
    "cat": "Pro Audio Reference",
    "def": "Opinion Score; Conversational Quality, Estimated) A measurement of voice quality in communication systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOSFET (metal-oxide": {
    "term": "MOSFET (metal-oxide",
    "cat": "Pro Audio Reference",
    "def": "semiconductor field-effect transistor) See FET.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mosquito\u2122 Teenage Deterrent": {
    "term": "Mosquito\u2122 Teenage Deterrent",
    "cat": "Pro Audio Reference",
    "def": "A security device used in the U.K. that emits a high-pitched scream at a frequency audible only to young people (roughly below the age of 20). With an effective range of about 20 meters, its aim is to break up loitering youths by annoyance and is, needless to say, a very controversial device. Also see: MEDUSA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "motional feedback": {
    "term": "motional feedback",
    "cat": "Pro Audio Reference",
    "def": "See servo-loop.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOTS (modified": {
    "term": "MOTS (modified",
    "cat": "Pro Audio Reference",
    "def": "or modifiable off-the-shelf ) Government procurement term. Most often referencing software but general use is found. Compare with COTS, GOTS and NOTS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mountain Jam": {
    "term": "Mountain Jam",
    "cat": "Pro Audio Reference",
    "def": "Held at Hunter Mountain, in Hunter, NY, since 2005, is a four-day multi-stage event considered one of the top music festivals in the country.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOV (metal": {
    "term": "MOV (metal",
    "cat": "Pro Audio Reference",
    "def": "oxide varistor) See: TVS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Movement Electronic": {
    "term": "Movement Electronic",
    "cat": "Pro Audio Reference",
    "def": "Music Festival Beginning in 2000, an electronic music festival said to be the largest in the US, held yearly in Detroit over Memorial Day weekend.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "moving coil Abbr": {
    "term": "moving coil Abbr",
    "cat": "Pro Audio Reference",
    "def": "MC Transducers. A type of electromagnetic transducer that operates by having a mechanical device move a coil of wire in a magnetic filed to convert the mechanical movement into an electrical current. Invented and patented by General Electric researchers Chester Rice and Edward Kellogg in 1924. The first stereo moving coil cartridges are credited to Joseph Grado and Grado Labs. Contrast with moving magnet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "moving magnet Abbr": {
    "term": "moving magnet Abbr",
    "cat": "Pro Audio Reference",
    "def": "MM Transducers. A type of electromagnetic transducer that operates by having a mechanical device move a magnet in a coil of wire to convert the mechanical movement into an electrical current. Invented in 1957 by ELAC. Contrast with moving coil.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mozart, Wolfgang": {
    "term": "Mozart, Wolfgang",
    "cat": "Pro Audio Reference",
    "def": "Amadeus (1756-1791) Austrian composer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mozart": {
    "term": "Mozart",
    "cat": "Pro Audio Reference",
    "def": "was approached by a young man, little older than a boy, who sought his advice on composing a symphony. Mozart pointed out that he was still very young and it might be better if he began by composing ballads. \u201cBut you wrote symphonies when you were only ten years old,\u201d objected the lad. \u201cBut I didn\u2019t have to ask how,\u201d Mozart retorted. [Bartlett\u2019s Book of Anecdotes]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MP3 (MPEG-1, Layer 3)": {
    "term": "MP3 (MPEG-1, Layer 3)",
    "cat": "Pro Audio Reference",
    "def": "A type of digital audio compression popularized for transmitting songs over the Internet. MP3 allows real-time audio streaming for Internet encoding and downloading. MP3 files are identified by the suffix \u201c.MP3\u201d Typically MP3 compresses CD-quality audio down to about one minute per 1MB file size.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPEG (Moving": {
    "term": "MPEG (Moving",
    "cat": "Pro Audio Reference",
    "def": "Picture Experts Group) A working group within SMPTE who set, among other things, specifications for compression schemes for audio and video transmission. A term commonly used to make reference to their image-compression scheme (MPEG-2) for full motion video.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPEG-4 Structured": {
    "term": "MPEG-4 Structured",
    "cat": "Pro Audio Reference",
    "def": "Audio This specifies a set of tools that allow powerful and flexible description of sound in a variety of ways, all based on what has become known as \u201cstructured audio,\u201d meaning transmitting sound by describing it rather than compressing it. Also see: SLS",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPGA (Music": {
    "term": "MPGA (Music",
    "cat": "Pro Audio Reference",
    "def": "Producers Guild of the Americas) The original professional guild for music producers and audio recording engineers, however in 2000, the Recording Academy absorbed it and established the Producers & Engineers Wing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPX Abbreviation": {
    "term": "MPX Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for multiplex as found in FM analog stereo broadcasting.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MR": {
    "term": "MR",
    "cat": "Terminology",
    "def": "(magnetoresistive) A technology based on the effect where electrical resistance in a material changes when brought in contact with a magnetic field",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mr": {
    "term": "Mr",
    "cat": "Pro Audio Reference",
    "def": "Mojo Risin Lyrics Anagram constructed from \u201cJim Morrison\u201d used in the Doors song, L.A. Woman.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M/S or": {
    "term": "M/S or",
    "cat": "Pro Audio Reference",
    "def": "M-S (mid-side or mono-stereo) microphone technique. Invented by Alan Blumlein and awarded US Patent 429,054, \u201cImprovements in and relating to Sound-Transmission, Sound-Recording and Sound Reproducing Systems, filed in February 1934. It was first commercialized in the mid \u201950s by the Danish radio engineer Holger Lauridsen (H. Lauridsen & F. Schlegel, \u201cStereophonie und richtungsdiffuse Klangwiedergabe,\u201d Gravesaner Bl\u00e4tter, 1956, Nr. V, August, S.28-50). It is a method for capturing stereophonic sound using two microphones. One microphone with a cardioid response (although any polar pattern will work) is aimed straight ahead toward the sound source (this is the mid or mono M part), and a second microphone with a figure-8 (or bipolar) response is placed so that the two lobes are directed toward the sides (this is the side or stereoS part). The two signals are then combined using an M-S matrix circuit that yields two signals: M+S and M-S. See Streicher & Everest for complete details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M/S matrix": {
    "term": "M/S matrix",
    "cat": "Pro Audio Reference",
    "def": "See M/S above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MS-DOS\u00ae (Microsoft\u00ae": {
    "term": "MS-DOS\u00ae (Microsoft\u00ae",
    "cat": "Pro Audio Reference",
    "def": "disk operating system) Microsoft\u2018s registered trademark for their PC operating system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSB (most significant bit)": {
    "term": "MSB (most significant bit)",
    "cat": "Pro Audio Reference",
    "def": "The bit within a digital word that represents the biggest possible single-bit coded value.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSM (mid-side-mid,": {
    "term": "MSM (mid-side-mid,",
    "cat": "Pro Audio Reference",
    "def": "also called Double MS) An extension of the M-S microphone technique using two coincident M-S pairs sharing the same side-facing figure-of-eight microphone, one pairing for the Front L and R and the other pairing for the surrounds Ls and Rs (from Mike Skeet\u2019s article \u201cMSM Mic Surround Technique,\u201d Audio Media, May 2003, pp. 58-59.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSO (Music": {
    "term": "MSO (Music",
    "cat": "Pro Audio Reference",
    "def": "Store Owners) Originally called iSMO (Independent Music Store Owners) this organization exists to serve as a link between dealers, manufacturers and the public.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSPS (million": {
    "term": "MSPS (million",
    "cat": "Pro Audio Reference",
    "def": "samples per second or megasamples per second) A measurement of data converter speed.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MTBF (mean": {
    "term": "MTBF (mean",
    "cat": "Pro Audio Reference",
    "def": "time between failure) Reliability Analysis. A measure based on statistical experience of how reliable a hardware product or component is, expressing in thousands or tens of thousands of hours as the predicted average time between failures.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MTC (MIDI": {
    "term": "MTC (MIDI",
    "cat": "Pro Audio Reference",
    "def": "time code) See time code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MTTR (mean": {
    "term": "MTTR (mean",
    "cat": "Pro Audio Reference",
    "def": "time to repair or mean time to recovery) Reliability Analysis. A measure of the maintainability of a piece of equipment. It is the average time required to fix any removable item in a product or system. Helpful in analyzing how long repairs and maintenance tasks will take in the event of a system failure.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mu": {
    "term": "mu",
    "cat": "Terminology",
    "def": "Vacuum Tubes. Symbol for the tube\u2019s amplification factor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MuchMusic Canada\u2019s": {
    "term": "MuchMusic Canada\u2019s",
    "cat": "Pro Audio Reference",
    "def": "MTV-like cable music channel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mu": {
    "term": "Mu",
    "cat": "Terminology",
    "def": "Law Telecommunications. The PCM voice coding and companding standard used in Japan and North America. [Newton] Contrast with A Law used in Europe.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mullin, Jack": {
    "term": "Mullin, Jack",
    "cat": "Pro Audio Reference",
    "def": "See: John Mullin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mult": {
    "term": "mult",
    "cat": "Recording",
    "def": "Slang shortened form for \u201cmultiplex\u201d or \u201cmultiple.\u201d Refers to routing or splitting signals to multiple destinations. Found on patchbays where several \u201cmult\u201d jacks make a signal available to many devices.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multicasting See": {
    "term": "multicasting See",
    "cat": "Pro Audio Reference",
    "def": "broadcasting.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multiclient ASIO driver Software Drivers": {
    "term": "multiclient ASIO driver Software Drivers",
    "cat": "Pro Audio Reference",
    "def": "Refers to a software ASIO driver capable of interfacing external hardware devices with multiple software applications (clients) on a computer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multicore Microprocessors": {
    "term": "multicore Microprocessors",
    "cat": "Pro Audio Reference",
    "def": "Two or more processors in a single package, which allows simultaneous processing of multiple instructions, thus greatly increasing processing speed.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multi-denomial transpedance": {
    "term": "multi-denomial transpedance",
    "cat": "Pro Audio Reference",
    "def": "informer Term coined by Jensen Transformers for their mythical product, the JE-EP-ERs, first introduced in 1987, which almost changed the whole audio transformer industry. The Jensen JE-EP-ERs pioneered the use of triple electonomic shielding and intrinsic eddy-breeding, until outlawed by Congress in 1988. Voluntarily discontinued when their stock of zeta-metal ran out, preventing any further use of interstage transpedance informance. Considered by many to be the only necessary accessory when coupling a Rane PI 14 Pseudoacoustic Infector to a Crown Belchfire\u00ae BF-6000SUX amplifier for playback using an Electro-Voice Rearaxial Softspeaker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multidimensional scaling": {
    "term": "multidimensional scaling",
    "cat": "Pro Audio Reference",
    "def": "See: MDS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multimedia Generally": {
    "term": "multimedia Generally",
    "cat": "Pro Audio Reference",
    "def": "refers to personal computers capable of multiple forms of communication methods. These constitute a minimum combination of stereo audio, video, text, and graphics, plus the more complex system includes fax and telephony provisions.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multipath Broadcast": {
    "term": "multipath Broadcast",
    "cat": "Pro Audio Reference",
    "def": "Short for \u201cmultipath interference\u201d or \u201cmultipath distortion.\u201d Interference due to multiple arrivals of the same broadcast signal due to reflections off buildings (usually). The difference in path lengths creates different arrival times thus causing signal cancellation and degradation. Most commonly occurs in FM and TV broadcast signals. The experience in car audio FM systems is static and signal weakening heard while slowing down and stopping; the signal comes and goes, weakens and distorts then clears, creating a phenomena called \u201cpicket fencing.\u201d Since AM broadcast frequencies are lower in frequency the wavelengths are longer and multipath does not occur. See diversity antenna.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multiplex To": {
    "term": "multiplex To",
    "cat": "Pro Audio Reference",
    "def": "interleave two or more signals into a single output; a process of selecting one of a number of inputs and switching its information to the output.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multipoint conference": {
    "term": "multipoint conference",
    "cat": "Pro Audio Reference",
    "def": "Telecommunication term referring to conferencing between three or more sites.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "multitrack": {
    "term": "multitrack",
    "cat": "Recording",
    "def": "The most popular method of music recording where each instrument, or group of instruments, is recorded on separate tracks (called stems) and then mixed down to a final version.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mu-metal Metallurgy": {
    "term": "mu-metal Metallurgy",
    "cat": "Pro Audio Reference",
    "def": "A nickel-iron alloy used primarily for magnetic shielding. Not to be confused with nu metal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mummers Parade Music Festival": {
    "term": "Mummers Parade Music Festival",
    "cat": "Pro Audio Reference",
    "def": "Said to be the oldest continuous folk festival in the U.S., held annually in Philadelphia on New Year\u2019s Day.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Muncy, Neil": {
    "term": "Muncy, Neil",
    "cat": "Pro Audio Reference",
    "def": "(1938 -2012) Canadian audio engineer most famous for his identifying and naming the \u201cPin-1 Problem.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Munson, W": {
    "term": "Munson, W",
    "cat": "Pro Audio Reference",
    "def": "A. American physicist who first measured the human ear\u2019s loudness response with Harvey Fletcher and known today as the Fletcher-Munson curves.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Murphy, Edsel": {
    "term": "Murphy, Edsel",
    "cat": "Pro Audio Reference",
    "def": "and Murphy\u2019s Law The dictum that if anything can go wrong, it will. For the full treatment see: \u201cThe Contributions of Edsel Murphy to the Understanding of the Behaviour of Inanimate Objects.\u201d This momentous presentation is believed to have been first published in EEE, vol. 15, no. 8, August 1967. [EEE (Electronic Equipment Engineering) magazine morphed into today\u2019s EDN (Electronic Design News) magazine.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Museum of": {
    "term": "Museum of",
    "cat": "Pro Audio Reference",
    "def": "Making Music See: MOMM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "music 1": {
    "term": "music 1",
    "cat": "Pro Audio Reference",
    "def": "The art of arranging sounds in time so as to produce a continuous, unified, and evocative composition, as through melody, harmony, rhythm, and timbre. [AHD] 2. The art or science of combining vocal or instrumental sounds with a view to beauty or coherence of form and expression of emotion. [OED] 3. The science of harmonical sounds. [Samuel Johnson\u2019s definition of m\u00fasick.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "\u201d": {
    "term": "\u201d",
    "cat": "Terminology",
    "def": "\u2026 what is music but a little wrinkling of the air?\u201d from Gwilan\u2019s Harp by Ursula K. Le Guin \u201d \u2026 of all the noises I think music is the least disagreeable.\u201d Samuel Johnson \u201cDon\u2019t bother looking at the view,\u201d he once told a visitor to his country house. \u201cI have already composed it.\u201d Gustav Mahler \u201cMusic is not sound. Music is using sound to organize emotions in time.\u201d Krystian Zimerman musical instrument classes See: aerophone, chordophone, idiophone, membranophone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "musical instrument": {
    "term": "musical instrument",
    "cat": "Pro Audio Reference",
    "def": "frequency ranges See the most amazing & informative chart here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Musical Telegraph Musical Instrument": {
    "term": "Musical Telegraph Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "The first electronic synthesizer invented by Elisha Gray, which created and transmitted sound over telegraph lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "musical twelfth": {
    "term": "musical twelfth",
    "cat": "Pro Audio Reference",
    "def": "The third-harmonic of a tone, which equals one octave and a fifth \u2014 hence, twelfth (12 not 13 because you don\u2019t count the original tone).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MUSICAM (masking": {
    "term": "MUSICAM (masking",
    "cat": "Pro Audio Reference",
    "def": "pattern adapted universal sub-band integrated coding and multiplexing) A flexible bit rate reduction standard for high quality audio. Jointly developed for digital audio broadcast by CCETT in France, IRT in Germany and Philips in the Netherlands.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Music Genome Project\u00a9": {
    "term": "Music Genome Project\u00a9",
    "cat": "Pro Audio Reference",
    "def": "A mathematical algorithm, granted US Patent Number 7003515, developed by its inventors to identify and describe music based on over 400 attributes. Using this algorithm it is possible to know a song\u2019s genre without listening to it.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "music genres": {
    "term": "music genres",
    "cat": "Pro Audio Reference",
    "def": "See: electronic music genres.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Music Instrument": {
    "term": "Music Instrument",
    "cat": "Pro Audio Reference",
    "def": "Museum See: MIM",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "m\u00fasick Defined": {
    "term": "m\u00fasick Defined",
    "cat": "Pro Audio Reference",
    "def": "by Samuel Johnson in his magnum opus, A Dictionary of the English Language, published in 1755, as \u201cThe science of harmonical sounds.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "music note value Click": {
    "term": "music note value Click",
    "cat": "Pro Audio Reference",
    "def": "the link.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Music Rising": {
    "term": "Music Rising",
    "cat": "Pro Audio Reference",
    "def": "A charity created in 2005 by U2\u2019s lead guitarist, the Edge, music producer Bob Ezrin and Henry Juszkiewicz, Chairman and CEO of Gibson Guitar Corp., along with musical partner Guitar Center.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "music temperament": {
    "term": "music temperament",
    "cat": "Pro Audio Reference",
    "def": "See temperament.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "music vs": {
    "term": "music vs",
    "cat": "Pro Audio Reference",
    "def": "noise 1. \u201cThe sensation of a musical tone is due to a rapid periodic motion of the sonorous body; the sensation of a noise to non-periodic motion.\u201d from On the Sensation of Tone(1862) Hermann Helmholtz. 2. \u201cOf all noises, I think music is the least disagreeable.\u201d \u2014 Samuel Johnson [from Barber]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Musikmesse": {
    "term": "Musikmesse",
    "cat": "Pro Audio Reference",
    "def": "The world\u2019s largest music trade show held annually in Frankfurt, Germany.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "musique abstraite": {
    "term": "musique abstraite",
    "cat": "Music",
    "def": "Music written for later playing; normal music as opposed to musique concr\u00e8te.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "musique concr\u00e8te Music": {
    "term": "musique concr\u00e8te Music",
    "cat": "Pro Audio Reference",
    "def": "Electronic music composed of instrumental and natural sounds often altered or distorted in the recording process. [AHD] The earliest classification for electronic music, invented by French composers, Pierre Henri Marie Schaeffer and Pierre Henry, in Paris, in 1948. Contrast with musique abstraite.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mutek A Montreal music festival": {
    "term": "Mutek A Montreal music festival",
    "cat": "Pro Audio Reference",
    "def": "\u201cA not-for-profit organization dedicated to the dissemination and development of digital creativity in sound, music, and audio-visual art.\u201d [from website]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mutual capacitance": {
    "term": "mutual capacitance",
    "cat": "Electronics",
    "def": "The capacitance between two conductors in a pair when the rate of change of the charges on the two are equal in magnitude but opposite in sign, and the potentials of the remaining conductors in the cable are held constant. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mutual coupling": {
    "term": "mutual coupling",
    "cat": "Pro Audio Reference",
    "def": "See coupling.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mute": {
    "term": "mute",
    "cat": "Pro Audio Reference",
    "def": "A control found on recording consoles, some mixers, and certain signal processing units that silences (mutes) a signal path, or output. Various uses.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Muzak (music + Kodak) 1": {
    "term": "Muzak (music + Kodak) 1",
    "cat": "Pro Audio Reference",
    "def": "Trademark of the business music company founded in 1928 by General George Owen Squier who patented the transmission of background music (phonograph records played through the telephone system). He created the name by merging the word \u201cmusic\u201d with that of his favorite high-tech venture, the Eastman Kodak Company. The word \u201cKodak\u201d was coined by Eastman himself, and in 1888 he first registered it as a trademark. According to Eastman, he invented it out of thin air. He explained: \u201cI devised the name myself. The letter \u201cK\u201d had been a favorite with me \u2013 it seems a strong, incisive sort of letter. It became a question of trying out a great number of combinations of letters that made words starting and ending with \u2018K.\u2019 The word \u2018Kodak\u2019 is the result.\u201d 2. \u201cI worry that the person who thought up Muzak may be thinking up something else.\u201d \u2014 Lily Tomlin [from Barber]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MVCDL (multiple voice coil digital loudspeaker)": {
    "term": "MVCDL (multiple voice coil digital loudspeaker)",
    "cat": "Loudspeakers",
    "def": "A type of direct digital loudspeaker. Compare: DTA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mysteryland Billed as": {
    "term": "Mysteryland Billed as",
    "cat": "Pro Audio Reference",
    "def": "the oldest EDM festival, held annually in the Netherlands since 1993. Now expanded into Mysteryland USA held in Bethel Woods, NY, the site of the famous 1969 Woodstock festival.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "N": {
    "term": "N",
    "cat": "Terminology",
    "def": "See: newton.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAB (National": {
    "term": "NAB (National",
    "cat": "Pro Audio Reference",
    "def": "Association of Broadcasters) A professional trade organization for people working in the radio and television industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NACFM (National": {
    "term": "NACFM (National",
    "cat": "Pro Audio Reference",
    "def": "Association of Church Facility Managers) \u201cA non-profit organization established in 1995 to promote networking and educational advancement opportunities for Facilities Management Professionals. NACFM provides an informational resource for church and religious facility management professionals by discussion groups, forums, panels, lectures, seminars, or similar programs or activities (such as this web site) designed to fulfill the purposes of the organization.\u201d Another great resource for audio contractors, integrators, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAG (needed acoustic gain)": {
    "term": "NAG (needed acoustic gain)",
    "cat": "Acoustics",
    "def": "The gain in decibels required by sound reinforcement to achieve an equivalent acoustic level at the farthest listener equal to what the nearest listener would hear without sound reinforcement.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nagara Musical Instrument": {
    "term": "nagara Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Turkish folk percussion instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nagra": {
    "term": "Nagra",
    "cat": "Recording",
    "def": "Famous Swiss company whose field tape recorders became the standard for all professionals. The name is so associated with portable recorders that today it is becoming a generic label, like Kleenex or band-aid or XLR.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAH (nearfield acoustic holography)": {
    "term": "NAH (nearfield acoustic holography)",
    "cat": "Acoustics",
    "def": "A sound radiation measurement system developed by Professors J. D. Maynard, E. G. Williams, and Y. Lee at the Pennsylvania State University, Department of Physics in 1985. See: \u201cNearfield acoustic holography: I. Theory of generalized holography and the development of NAH,\u201d J. Acoustical Soc. of America, Oct., 1985, Vol. 78, Issue 4, pp. 1395-1413.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nai Musical Instrument": {
    "term": "nai Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Romanian panpipes, also called Moldavian pan flute.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nail violin Musical Instrument": {
    "term": "nail violin Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A friction idiophone invented c1740.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAMA (Native": {
    "term": "NAMA (Native",
    "cat": "Pro Audio Reference",
    "def": "American Music Awards) See NAMMYS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAMM (National": {
    "term": "NAMM (National",
    "cat": "Pro Audio Reference",
    "def": "Association of Music Merchants is the original name; today it is officially the International Music Products Association but they didn\u2019t change the acronym) A professional trade organization for people working in the music business \u2014 primarily in retailing and manufacturing of music making products. [Popular saying is that NAMM means Not Available; Maybe May.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAMMYS": {
    "term": "NAMMYS",
    "cat": "Pro Audio Reference",
    "def": "The name of the award given yearly by NAMA (Native American Music Awards).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nano- Abbr": {
    "term": "nano- Abbr",
    "cat": "Pro Audio Reference",
    "def": "n A prefix for one billionth (10-9)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nanosecond Abbr": {
    "term": "nanosecond Abbr",
    "cat": "Pro Audio Reference",
    "def": "ns One billionth (10-9) of a second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nanotechnology": {
    "term": "nanotechnology",
    "cat": "Pro Audio Reference",
    "def": "The science and technology of building electronic circuits and devices from single atoms and molecules.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nanoweber Abbr": {
    "term": "nanoweber Abbr",
    "cat": "Pro Audio Reference",
    "def": "nWb A unit of magnetic flux equal to one billionth (10-9) of a weber.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Napier, John": {
    "term": "Napier, John",
    "cat": "Pro Audio Reference",
    "def": "(1550-1617) Scottish mathematician who invented logarithms and introduced the use of the decimal point in writing numbers. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Napier\u2019s bones": {
    "term": "Napier\u2019s bones",
    "cat": "Mathematics",
    "def": "A set of graduated rods used to perform multiplication quickly. Lord Napier is credited with creating them to expedite arithmetical calculations. [Kacirk]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAPRS (Nashville": {
    "term": "NAPRS (Nashville",
    "cat": "Pro Audio Reference",
    "def": "Association of Professional Recording Services) Established in 1995 to promote Nashville\u2019s finest recording studios, services and engineers worldwide; dissolved in 2009.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NARAS (National": {
    "term": "NARAS (National",
    "cat": "Pro Audio Reference",
    "def": "Academy of Recording Arts & Science) See The Recording Academy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NARM (National": {
    "term": "NARM (National",
    "cat": "Pro Audio Reference",
    "def": "Association of Recording Merchandisers) An industry organization made up primarily of music retailers acting as an advocate body for the common interests of merchandisers and distributors of music to industry and public policy makers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "narrow-band filter": {
    "term": "narrow-band filter",
    "cat": "Pro Audio Reference",
    "def": "Term popularized by equalizer pioneer C.P. Boner to describe his patented (tapped toroidal inductor) passive notch filters. Boner\u2019s filters were very high Q (around 200) and extremely narrow (5 Hz at the -3 dB points). Boner used 100-150 of these sections in series to reduce feedback modes. Today\u2019s usage extends this terminology to include all filters narrower than 1/3-octave. This includes parametrics, notch filter sets, and certain cut-only variable equalizer designs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "National Electrical": {
    "term": "National Electrical",
    "cat": "Pro Audio Reference",
    "def": "Code See NEC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "National Music": {
    "term": "National Music",
    "cat": "Pro Audio Reference",
    "def": "Museum Located in Vermillion, S. Dakota on the Campus of The University of South Dakota, it has more than 13,500 items in its collection (largest in the world) with some 800 on display at any one time.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "National Recording": {
    "term": "National Recording",
    "cat": "Pro Audio Reference",
    "def": "Registry Set up by Congress in 2002 to preserve historical recordings. The inaugural list of recognized recordings includes \u201cThe Message,\u201d by Grandmaster Flash and the Furious Five. (1982)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "natural frequency": {
    "term": "natural frequency",
    "cat": "Pro Audio Reference",
    "def": "\u201cThe natural frequency is the rate at which an object vibrates when it is not disturbed by an outside force.\u201d [Chegg]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "natural logarithm": {
    "term": "natural logarithm",
    "cat": "Pro Audio Reference",
    "def": "A logarithm based on the powers of e (aka Base-e).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "naturals Musical Instruments": {
    "term": "naturals Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "The white note keys on a piano or organ keyboard; so named for the \u201cnatural\u201d notes of the C major scale: C,D,E,F,G,A,B).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nay (also ney) Musical Instrument": {
    "term": "nay (also ney) Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Persian end-blown bamboo flute.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NC": {
    "term": "NC",
    "cat": "Terminology",
    "def": "(noise criterion) curves A unit of measurement for the ambient or background noise level of occupied indoor spaces, i.e., a measure of its noisiness \u2014 true story; real word. The measured noise spectrum (done in octave bands using an SPL meter) is compared against a series of standard noise criteria (NC) curves to determine the \u201cNC level\u201d of the space. The standard NC curves take into account the equal loudness contours of Fletcher-Munson to accurately reflect the listening experience. Each NC curve is assigned a number (in 5 dB increments) corresponding to the octave band SPL measured over the octave centered at approximately 1500 Hz. A space is then said to have a background noise level of \u201cNC-20,\u201d for instance, which would be very quiet, comparable to a quality recording studio. Compare with RC rating.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-end Telecommunication": {
    "term": "near-end Telecommunication",
    "cat": "Pro Audio Reference",
    "def": "term referring to your end; the local room, as opposed to the far-end.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-end crosstalk Crosstalk that": {
    "term": "near-end crosstalk Crosstalk that",
    "cat": "Pro Audio Reference",
    "def": "is propagated in a disturbed channel in the direction opposite to the direction of propagation of the signal in the disturbing channel. The terminals of the disturbed channel, at which the near-end crosstalk is present, and the energized terminal of the disturbing channel, are usually near each other. [IEEE Std 802.5]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-field": {
    "term": "near-field",
    "cat": "Acoustics",
    "def": "The sound field very close to the sound source, between the source and the far field. Technically, a distance less than one wavelength at the frequency of interest.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-field focalization": {
    "term": "near-field focalization",
    "cat": "Pro Audio Reference",
    "def": "(NFF) See: focalization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-field monitor": {
    "term": "near-field monitor",
    "cat": "Pro Audio Reference",
    "def": "A loudspeaker used at a distance of 3-4 feet (1-1\u00bd meters) in recording studios.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NEC (National Electrical Code)": {
    "term": "NEC (National Electrical Code)",
    "cat": "Pro Audio Reference",
    "def": "The name for the United States electrical safety standard (NFPA-70).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "negative": {
    "term": "negative",
    "cat": "Electronics",
    "def": "An excess of electrons in a conductor or semiconductor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "negative feedback": {
    "term": "negative feedback",
    "cat": "Pro Audio Reference",
    "def": "The act of comparing a fraction of the output signal to the input signal at the input to an amplifier in such a way that the amplifier will keep this fraction of the output signal always exactly the same as the input signal. Negative feedback is of prime importance in designing with op amps and audio power amplifiers. As applied to audio amplifiers, negative feedback is first attributed to Bell Labs scientist Harold S. Black, as described in the Bell Labs Technical Review, 1934 and his monumental 87 page U.S. patent 2,102,671 filed in 1932.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "negative logic": {
    "term": "negative logic",
    "cat": "Pro Audio Reference",
    "def": "An electronic logic system where the voltage representing one, active, or true has a more negative value than the voltage representing zero, inactive, or false. Also known as negative-true logic, it is normally used in electronic and computing data and communications switching systems for noise immunity reasons. [IEEE Std 1451.2]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "negative resistor (aka negistor;": {
    "term": "negative resistor (aka negistor;",
    "cat": "Electronics",
    "def": "A resistor having the opposite characteristics of Ohm\u2019s Law, i.e., the current goes down if the voltage goes up and vice versa. Certain devices and circuits display this trait and are used mainly to make negative resistance oscillators.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "negistor See": {
    "term": "negistor See",
    "cat": "Pro Audio Reference",
    "def": "negative resistor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "neigh": {
    "term": "neigh",
    "cat": "Pro Audio Reference",
    "def": "The long, high-pitched sound made by a horse. To utter the characteristic sound of a horse; whinny. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NEMA (National": {
    "term": "NEMA (National",
    "cat": "Pro Audio Reference",
    "def": "Electrical Manufacturing Association) Founded in 1926 and headquartered in Rosslyn, VA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "neodymium Abbr": {
    "term": "neodymium Abbr",
    "cat": "Pro Audio Reference",
    "def": "Nd Audio Transducers. Popular rare-earth metal used to make superior magnets for loudspeakers and microphones. Neodymium iron boron magnets have a more linear frequency response, are more powerful and smaller, with higher output levels than conventional iron magnets. First used by Electro-Voice in the late \u201970s. [No, it was not named after Neil Diamond.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "neodymium motors": {
    "term": "neodymium motors",
    "cat": "Pro Audio Reference",
    "def": "See: bonded magnet motors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nephew node Networks": {
    "term": "nephew node Networks",
    "cat": "Pro Audio Reference",
    "def": "A node with one port in standby and all other ports (if any) disabled, disconnected, or suspended. The peer uncle node proxies for the nephew node during bus resets. [IEEE Std 1394b]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "network Generally": {
    "term": "network Generally",
    "cat": "Pro Audio Reference",
    "def": "used to mean a multi-computer system (as opposed to a single computer bus-type system) where multiple access is allowed from more than one computer at a time. Characterized by full two-way (duplex) communications between all equipment and computers on the network. See CobraNet for an example.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "network glossary": {
    "term": "network glossary",
    "cat": "Pro Audio Reference",
    "def": "See CobraNet glossary for many useful terms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "network terms": {
    "term": "network terms",
    "cat": "Pro Audio Reference",
    "def": "See Sound&Video Contractor article IT Terminology To Know And Understand.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Neumann, Georg": {
    "term": "Neumann, Georg",
    "cat": "Pro Audio Reference",
    "def": "(1891-1976) German inventor, entrepreneur and audio industry pioneer of high-quality microphones.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "neume or neum": {
    "term": "neume or neum",
    "cat": "Music",
    "def": "A sign used in the notation of plainsong during the Middle Ages, surviving today in transcriptions of Gregorian chants. [Middle English, series of notes sung on one syllable, from Medieval Latin pneuma, from Greek, breath.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "neural spectrogram": {
    "term": "neural spectrogram",
    "cat": "Hearing",
    "def": "\u201cThe idea that the auditory system takes apart the acoustic information in the same way that a spectrogram does. The separation of different frequencies is done by the basilar membrane. Information about the intensity and phase of different frequency components is kept separate in different neural pathways originating at different sites on the membrane. This separation of frequency information is maintained all the way up to the brain. Intensity activity in each neural pathway corresponds to the darkness of the streak on the spectrogram for the corresponding frequency.\u201d [Bregman]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "neutral": {
    "term": "neutral",
    "cat": "Electronics",
    "def": "1. Having no electrical charge. 2. Common point of a star-connected generator or transformer winding. [IEEE Std 1020]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Neve 1073": {
    "term": "Neve 1073",
    "cat": "Pro Audio Reference",
    "def": "Console Module Designed by Rubert Neve in 1970, this mic-preamp with 3-band EQ set the standard for all mic channels to follow.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Neville Thiele": {
    "term": "Neville Thiele",
    "cat": "Pro Audio Reference",
    "def": "Method\u2122 See: NTM",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Newman, Robert B": {
    "term": "Newman, Robert B",
    "cat": "Pro Audio Reference",
    "def": "(1917-1983) American engineer specializing in acoustics most remembered for being on of the founders of Bolt, Beranek and Newman in 1948.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "New Orleans": {
    "term": "New Orleans",
    "cat": "Pro Audio Reference",
    "def": "Jazz & Heritage Festival Beginning in 1970, hit the link to read the fascinating history of this forty-plus-years old festival.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Newport Folk": {
    "term": "Newport Folk",
    "cat": "Pro Audio Reference",
    "def": "Festival One of America\u2019s oldest and most famous folk music festivals held in Newport, R.I., usually in July.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Newport Jazz": {
    "term": "Newport Jazz",
    "cat": "Pro Audio Reference",
    "def": "Festival Founded in 1954, it was the premier jazz festival in America, held annually in Newport, R.I., usually in August.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "newton Abbr": {
    "term": "newton Abbr",
    "cat": "Pro Audio Reference",
    "def": "N. The International System unit of force. It is equal to the force required to accelerate a mass of one kilogram one meter per second per second.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Newton, Sir": {
    "term": "Newton, Sir",
    "cat": "Pro Audio Reference",
    "def": "Isaac (1642-1727) English mathematician and scientist who invented differential calculus and formulated the theory of universal gravitation, a theory about the nature of light, and three laws of motion. The sight of a falling apple supposedly inspired his treatise on gravitation, presented in Principia Mathematica (1687). [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NEXT (near-end crosstalk) Category wiring": {
    "term": "NEXT (near-end crosstalk) Category wiring",
    "cat": "Pro Audio Reference",
    "def": "Interference between signals on twisted pair cable caused by damage (usually a loosening of the tight twist required for high speed transmission) occurring close to the connector.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NFF (near-field": {
    "term": "NFF (near-field",
    "cat": "Pro Audio Reference",
    "def": "focalization) See: focalization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "ngoni Musical Instrument": {
    "term": "ngoni Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A West African stringed instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nibble": {
    "term": "nibble",
    "cat": "Pro Audio Reference",
    "def": "A group of four bits or half a byte (8-bits). Also called a quartet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIC (negative impedance converter) Op Amps": {
    "term": "NIC (negative impedance converter) Op Amps",
    "cat": "Pro Audio Reference",
    "def": "A circuit that acts like a negative load, i.e., it adds rather than consumes energy\u2014magic, really.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIC (network interface card) Ethernet": {
    "term": "NIC (network interface card) Ethernet",
    "cat": "Pro Audio Reference",
    "def": "The PC expansion board that connects a device to a LAN, usually Ethernet-based.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIC (noise isolation class) Noise": {
    "term": "NIC (noise isolation class) Noise",
    "cat": "Measurements",
    "def": "\u201cA method for rating a partition\u2019s ability to block airborne noise transfer.\u201d [From link]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nichols, Roger": {
    "term": "Nichols, Roger",
    "cat": "Pro Audio Reference",
    "def": "(1944-2011) American recording engineer most famous for his innovative and Grammy Award-winning work with Steely Dan.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nickelodeon 1": {
    "term": "nickelodeon 1",
    "cat": "Pro Audio Reference",
    "def": "An early movie theater charging an admission price of five cents. 2. A player piano. 3. A jukebox. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nickers To neigh softly": {
    "term": "nickers To neigh softly",
    "cat": "Pro Audio Reference",
    "def": "[AHD] [ As in what a horse does, not underwear.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIH (not": {
    "term": "NIH (not",
    "cat": "Pro Audio Reference",
    "def": "invented here) Popular abbreviation found in technology land, used to described a prima donna corporate attitude that everything they do must be original. Stems from an unhealthy attitude that the only solution worthy is their solution, thus rejecting ideas and inventions not theirs. Makes for very unproductive and unhappy engineering teams.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIME (New Interfaces for Musical Expression)": {
    "term": "NIME (New Interfaces for Musical Expression)",
    "cat": "Music",
    "def": "International organization for the development of new musical interface design.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nipper": {
    "term": "Nipper",
    "cat": "Pro Audio Reference",
    "def": "The famous \u201cHis Master\u2019s Voice\u201d RCA dog. A bull terrier and fox terrier mix born in 1884 and named for his propensity to nip at peoples\u2019 legs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIST (National": {
    "term": "NIST (National",
    "cat": "Pro Audio Reference",
    "def": "Institute of Standards and Technology) Government organization who produces (among vastly other things) Special Publication 811: Guide for the Use of the International System of Units (SI), the authority on this subject.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nixie tube Vacuum Tubes": {
    "term": "Nixie tube Vacuum Tubes",
    "cat": "Pro Audio Reference",
    "def": "A numerical read-out cold-cathode tube first developed by Haydu Brothers Laboratories in 1955, later purchased by Burroughs Corporation who registered the name. The name Nixie was derived by Burroughs from \u201cNIX I\u201d, an abbreviation of \u201cNumeric Indicator eXperimental No. 1.\u201d Hit the link for photos.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "No also Noh": {
    "term": "No also Noh",
    "cat": "Theater",
    "def": "The classical drama of Japan, with music and dance performed in a highly stylized manner by elaborately dressed performers on an almost bare stage. [AHD] Similar but older than Kabuki.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "node": {
    "term": "node",
    "cat": "Acoustics",
    "def": "A point of minimum amplitude in a one-dimensional standing wave field. A nodal line is a line of minimum amplitude in a two-dimensional filed, and a nodal surface is a surface of minimum amplitude in a three-dimensional field. [Morfey]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "node Electronic Circuits": {
    "term": "node Electronic Circuits",
    "cat": "Pro Audio Reference",
    "def": "A point of interconnection between two or more components. Physics. A point or region of virtually zero amplitude in a periodic system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise General": {
    "term": "noise General",
    "cat": "Pro Audio Reference",
    "def": "Sound or a sound that is loud, unpleasant, unexpected, or undesired. Physics. A disturbance, especially a random and persistent disturbance, that obscures or reduces the clarity of a signal. Computer Science. Irrelevant or meaningless data. From Latin meaning nausea, discomfort and seasickness. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise cancelling": {
    "term": "noise cancelling",
    "cat": "Pro Audio Reference",
    "def": "headphones Special headphones incorporating a microphone built into the headset that samples the ambient sound and adds it back out-of-phase to the headphone signal. This method actively cancels or nulls out background noise \u2014 works best with low frequencies. See Sennheiser NoiseGard\u00ae for an interesting demo.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise cancelling microphone": {
    "term": "noise cancelling microphone",
    "cat": "Pro Audio Reference",
    "def": "A special dynamic microphone designed so both sides of the diaphragm are exposed to the sound field. Close direct sound strikes primarily one side of the diaphragm causing it to move while sounds from far away tend to be canceled because they strike the diaphragm from all sides with no net force.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise color": {
    "term": "noise color",
    "cat": "Pro Audio Reference",
    "def": "People working in pro audio know the terms white noise and pink noise, but few recognize the terms \u201cazure noise\u201d or \u201cred noise,\u201d but they are real terms. Noise that is not white is called colored noise and will have more energy at some frequencies than others, analogous to colored light. White noise and pink noise are well defined and known; much less so are the others. White noise is so named because it is analogous to white light in that it contains all audible frequencies distributed uniformly throughout the spectrum. Passing white light through a prism (a form of filtering) breaks it down into a range of colors. Examination shows that red light is characterized by the longer wavelengths of light, i.e., the lower frequency region. Similarly, \u201cpink noise\u201d has higher energy in the low frequencies, hence the somewhat tongue-in-cheek term. The Federal Standard 1037C Telecommunications: Glossary of Telecommunication Terms defines four noise colors (white, pink, blue & black) and is considered the official source. No official standard could be found for the others. The following list of noise colors is loosely based on a rainbow-prism light analogy, where a prism creates a rainbow effect by separating white light passed through it into a visible spectrum labeled red, orange, yellow, green, blue, indigo, and violet from lowest to highest frequencies. Also shown is the approximate slope of the power density spectrum relative to white noise used as the reference:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "red noise": {
    "term": "red noise",
    "cat": "Pro Audio Reference",
    "def": "also called brown noise or Brownian noise after Robert Brown: -6 dB/oct decreasing density (most amount of low frequency energy or power; used in oceanography; power proportional to 1/frequency-squared); popcorn noise.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "pink noise:": {
    "term": "pink noise:",
    "cat": "Pro Audio Reference",
    "def": "-3 dB/oct decreasing noise density (but, equal power per octave; 1/f noise or flicker noise; power proportional to 1/frequency).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "white noise:": {
    "term": "white noise:",
    "cat": "Pro Audio Reference",
    "def": "0 dB/oct reference noise with equal power density (equal power per hertz; Johnson noise).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "grey noise:": {
    "term": "grey noise:",
    "cat": "Pro Audio Reference",
    "def": "A random pink noise within the audible frequency range subjected to inverted A-weighting loudness curve per IEC 61672. It gives the listener the perception that it is equally loud at all frequencies.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "blue (or": {
    "term": "blue (or",
    "cat": "Pro Audio Reference",
    "def": "azure) noise: +3 dB/oct increasing noise density (power proportional to frequency).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "purple (or": {
    "term": "purple (or",
    "cat": "Pro Audio Reference",
    "def": "violet) noise: +6 dB/oct increasing noise density (power proportional to frequency-squared; most amount of high frequency energy or power).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "black noise:": {
    "term": "black noise:",
    "cat": "Pro Audio Reference",
    "def": "silence (zero power density with a few random spikes allowed).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Other noise": {
    "term": "Other noise",
    "cat": "Pro Audio Reference",
    "def": "colors exist for specialized fields like video/photographic/image processing, communications, mathematical chaos theory, etc., but are not found in pro audio circles.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise criterion": {
    "term": "noise criterion",
    "cat": "Pro Audio Reference",
    "def": "(NC) curves See NC curves.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise dose": {
    "term": "noise dose",
    "cat": "Pro Audio Reference",
    "def": "or noise exposure Limits of noise exposure published by OSHA (US Department of Labor, Occupational Safety and Health Administration). It is a expressed as A-weighted SPL (dBA) term. Here are some common examples:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "90": {
    "term": "90",
    "cat": "Terminology",
    "def": "dBA: 8 hours max 95 dBA: 4 hours max 100 dBA: 2 hours max 105 dBA: 1 hour max 110 dBA: 30 minutes max 115 dBA: 15 minutes max",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise figure": {
    "term": "noise figure",
    "cat": "Pro Audio Reference",
    "def": "The ratio between the Johnson noise (or thermal noise) of the equivalent input resistance of a circuit and its measured noise, expressed in decibels. It is the ratio of the output noise to the input noise, so the answer is always positive, with a theoretically noise-free device having a noise figure of 0 dB.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise floor Normally": {
    "term": "noise floor Normally",
    "cat": "Pro Audio Reference",
    "def": "the lowest threshold of useful signal level, i.e., the residual noise with no signal present (although sometimes audible signals below the noise floor can be recovered).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise gate": {
    "term": "noise gate",
    "cat": "Pro Audio Reference",
    "def": "An expander with a fixed \u201cinfinite\u201d downward expansion ratio. Used extensively for controlling unwanted noise, such as preventing \u201copen\u201d microphones and \u201chot\u201d instrument pick-ups from introducing extraneous sounds into the system. When the incoming audio signal drops below the user set-point (the threshold point) the expander prevents any further output by reducing the gain to \u201czero.\u201d The actual gain reduction is typically on the order of -80 dB, thus once audio falls below the threshold, effectively the output level becomes the residual noise of the gate. Common terminology refers to the gate \u201copening\u201d and \u201cclosing.\u201d Another popular application uses noise gates to enhance musical instrument sounds, especially percussion instruments. Judicious setting of a noise gate\u2019s attack (turn-on) and release (turn-off) times adds \u201cpunch,\u201d or \u201ctightens\u201d the percussive sound, making it more pronounced. A noise gate is to an expander as a limiter is to a compressor. See the RaneNotes Dynamics Processors and Signal Processing Fundamentals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise map Serato DJ": {
    "term": "noise map Serato DJ",
    "cat": "Pro Audio Reference",
    "def": "The Serato control vinyl and control CDs each contain a proprietary Noise Map Control Tone that allows Scratch Live to track the motion of the record, simulating the same movement with digital audio. The Serato noise map was co-invented in 2002 by Serato cofounders, Steve West and AJ Bertenshaw (\u201cAJ\u201d). An important distinction is that Serato\u2019s noise map is not time code, or anything like time code. It is a unique and proprietary method of tracking the control record\u2019s motion based on the mathematical concept of a maximum-length pseudo random bit sequence, which guarantees uniqueness for the shorted possible section. It is a continuously varying signal rather than a sequence of discrete consecutive location labels as is the case with time code schemes. A noise map makes it is more difficult to determine any exact location since a form of fuzzy pattern matching must be used. However, this increased complexity is more than compensated for by the resultant lower latency, the lack of any need to synchronize with lengthy code words within the signal, and better robustness to noise. In AJ\u2019s words: \u201cThe idea is to get a sequence of bits in which you can find your position uniquely in the shortest number of bits, without having to synchronize. The problem with time code is that you have to know where each code ends and the next begins. With the noise map you don\u2019t have the problem because the code is continuous.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NoiseMap\u2122 Trademark": {
    "term": "NoiseMap\u2122 Trademark",
    "cat": "Pro Audio Reference",
    "def": "of Serato Audio Research for their proprietary technology used in the Scratch DJ vinyl emulation system. See: noise map.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise masking": {
    "term": "noise masking",
    "cat": "Acoustics",
    "def": "The practice of adding white noise to an audio system to make background sounds unintelligible or less distracting; makes use of the human hearing masking phenomenon.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise measurement": {
    "term": "noise measurement",
    "cat": "Pro Audio Reference",
    "def": "filters See weighting filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise reduction Abbr. NR": {
    "term": "noise reduction Abbr. NR",
    "cat": "Recording",
    "def": "A signal processing function used to reduce the amount of background noise. See expander.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise reduction coefficient": {
    "term": "noise reduction coefficient",
    "cat": "Acoustics",
    "def": "A single-number rating of the sound absorption properties of a material; it is the arithmetic mean of the sound absorption coefficients at 250, 500, 1000, and 2000 Hz, rounded to the nearest multiple of 0.05. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise shaping": {
    "term": "noise shaping",
    "cat": "Pro Audio Reference",
    "def": "A technique used in oversampling low-bit converters and other quantizers to shift (shape) the frequency range of quantizing error (noise and distortion). The output of a quantizer is fed back through a filter, and summed with its input signal. Dither is sometimes used in the process. Oversampling A/D converters shift much of it out of the audio range completely. In this case, the in-band noise is decreased, which allows low-bit converters (such as delta-sigma) to equal or out-perform high-bit converters (those greater than 16 bits). When oversampling is not involved, the noise still appears to decrease by 12 dB or more because it is redistributed into less audible frequency areas. Further digital processing usually reverses the benefits of this kind of noise shaping. See the RaneNote Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise temperature": {
    "term": "noise temperature",
    "cat": "Pro Audio Reference",
    "def": "The standard reference temperature for noise measurements is 290\u00b0K.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise weighting": {
    "term": "noise weighting",
    "cat": "Pro Audio Reference",
    "def": "See: weighting filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NOM (number": {
    "term": "NOM (number",
    "cat": "Pro Audio Reference",
    "def": "of open mics) An acronym believed first created in 1967, or 1968, by Bill Snow after he retired from Bell Labs and went to work at Altec Lansing Research. It\u2019s use was popularized by Dan Dugan, the father of the automatic microphone mixer and Altec Lansing, the manufacturer of his first design. In Dan\u2019s original design, the automatic mic mixer, like human operators, turned the gain down on unused mic channels and turned the gain up on active channels, all the while ensuring that the overall level remained roughly constant. As a rough approximation, each doubling of the number of open mics (NOM) cuts the gain by 3 dB, i.e., as more mics are opened up the mic mixer reduces overall gain. If not, as mics open and close, the reverberation and ambient noise fluctuates unacceptably. NOM attenuation techniques work to provide the gain, stability, and low noise qualities of a single open mic with the benefits of multiple mics. [Historical Note: This concept was first written about by C.P. Boner & R.E. Boner, in their paper \u201cThe Gain of a Sound System\u201d April 1969, reproduced in Sound Reinforcement: An Anthology (Audio Engineering Society, NY, 1978.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nominal This": {
    "term": "nominal This",
    "cat": "Pro Audio Reference",
    "def": "word has several definitions but the one of importance to pro audio is its engineering sense meaning: insignificantly small; trifling: a nominal amount. It can also mean \u201caccording to plan or design.\u201d [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NOMM (number": {
    "term": "NOMM (number",
    "cat": "Pro Audio Reference",
    "def": "of open mics & mixers) A term created by Rane Corporation extending the concept of NOM (above) to include multiple mixers as well as microphones. As used by Rane, it is NOM-like in that feedback stability is maintained, however, since large systems have mics across multiple mixers, Rane includes these mixers in the NOMM calculation. For example, in audio conferencing, when the chairman is speaking and someone else quickly answers \u201cyes,\u201d coughs, or drops a pen, most mic mixers running in NOM mode are annoying because they reduce the level of the chairman mic just because someone else made a noise. The Rane NOMM approach avoids this annoyance by keeping the chairman\u2019s mic at the same gain while still allowing the interruption to be heard, yet at a reduced gain from its full gated level.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nomogram 1": {
    "term": "nomogram 1",
    "cat": "Pro Audio Reference",
    "def": "A graph consisting of three coplanar curves, each graduated for a different variable so that a straight line cutting all three curves intersects the related values of each variable. 2. A chart representing numerical relationships. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "non-acoustic voice sensor": {
    "term": "non-acoustic voice sensor",
    "cat": "Pro Audio Reference",
    "def": "A device that can detect a person\u2019s voice without the person actually speaking out loud. See TERC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nonlinear": {
    "term": "nonlinear",
    "cat": "Electronics",
    "def": "The amplitude of the output is not linearly proportional to the input. If a true sine wave were transmitted through a nonlinear device, its shape would be changed. [IEEE] Contrast with linear.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nonlinear distortion": {
    "term": "nonlinear distortion",
    "cat": "Pro Audio Reference",
    "def": "Introduction of frequency components not present in the original signal. Contrast with linear distortion.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nonvolatile": {
    "term": "nonvolatile",
    "cat": "Pro Audio Reference",
    "def": "Refers to a memory device that does not lose its data when power is removed from the system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "norator": {
    "term": "norator",
    "cat": "Electronics",
    "def": "A two-terminal circuit element with a voltage-current (V-I) characteristic curve consisting of all points on the V-I plane (except zero/zero because that is a nullator). The device does not define either the voltage or the current. Used to model complex circuits for analysis. For example the output of an ideal op amp can be modeled with a norator, i.e., its output voltage and current can assume any value. Paired with a nullator creates a nullor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "normal distribution": {
    "term": "normal distribution",
    "cat": "Pro Audio Reference",
    "def": "See: Gaussian distribution.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "normalize": {
    "term": "normalize",
    "cat": "Recording",
    "def": "The process of linearly increasing all digital samples by the same amount so that the largest original sample reaches a given level. This is done in order to create a maximum signal while maintaining the S/N ratio, and with no clipping when the level selected is 0 dBFS. Analogous to an analog audio system\u2019s volume control. See: 10 Myths about Normalization for an interesting discussion of this subject.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "normalling jacks": {
    "term": "normalling jacks",
    "cat": "Pro Audio Reference",
    "def": "See patchbay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "normative": {
    "term": "normative",
    "cat": "Standards",
    "def": "A mandatory set of instructions or references. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Norris Creek": {
    "term": "Norris Creek",
    "cat": "Pro Audio Reference",
    "def": "Pig Pickin\u2019 Bluegrass & BBQ Festival Held in Louisberg, North Carolina over the July 4th holiday.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Norte\u00f1o Music": {
    "term": "Norte\u00f1o Music",
    "cat": "Pro Audio Reference",
    "def": "A genre of Mexican music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Norton\u2019s Theorem": {
    "term": "Norton\u2019s Theorem",
    "cat": "Pro Audio Reference",
    "def": "In simple terms, states that a complex linear circuit (i.e., no exponents or roots in its defining equations) can be replaced by a single current source and a parallel resistor. See All About Circuit\u2019s Norton\u2019s Theorem for detailed explanation. [After Edward L. Norton.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Norton, Edward": {
    "term": "Norton, Edward",
    "cat": "Pro Audio Reference",
    "def": "Lawry (1898-1983) American engineer who formulated Norton\u2019s Theorem while working at Bell Labs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "notch filter": {
    "term": "notch filter",
    "cat": "Pro Audio Reference",
    "def": "A special type of cut-only equalizer used to attenuate (only, no boosting provisions exist) a narrow band of frequencies. Three controls: frequency, bandwidth and depth, determine the notch. Simplified units provide only a frequency control, with bandwidth and depth fixed internally. Used most often in acoustic feedback control to eliminate a small band of frequencies where the system wants to howl (feedback).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "note value": {
    "term": "note value",
    "cat": "Pro Audio Reference",
    "def": "See: music note value.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NOTS (NATO": {
    "term": "NOTS (NATO",
    "cat": "Pro Audio Reference",
    "def": "off-the-shelf or niche off-the-shelf) Government procurement term. Most often referencing software but general use is found. Compare with COTS, MOTS and GOTS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Novachord Musical Instruments": {
    "term": "Novachord Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "The name for Hammond\u2019s first commercially available synthesizer released in 1938. See The Novachord Restoration Project for pictures and text.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noy": {
    "term": "noy",
    "cat": "Psychoacoustics",
    "def": "A subjective unit of noisiness. For example, a sound of 2 noys is twice as noisy as a sound of 1 noy and half as noisy as a sound of 4 noys. [BBC\u2019s J.R. comes through again \u2013 thanks!]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NPO 1": {
    "term": "NPO 1",
    "cat": "Pro Audio Reference",
    "def": "Ceramic capacitors Temperature coefficient designator meaning negative-positive-zero, i.e., the capacitance drifts negative and positive averaging zero. A marking meaning stable with temperature. 2. Medicine Abbreviation for nil per os, or nothing by mouth",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NR": {
    "term": "NR",
    "cat": "Terminology",
    "def": "See: noise reduction.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NRE (non-recurring engineering charge)": {
    "term": "NRE (non-recurring engineering charge)",
    "cat": "Pro Audio Reference",
    "def": "A one-time engineering charge for product development, separate from royalty or licensing fees.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NRW+E (Nashville": {
    "term": "NRW+E (Nashville",
    "cat": "Pro Audio Reference",
    "def": "Recording Workshop and Expo) Yearly Nashville event dedicated to \u201cHelping Creative People Make Better Recordings.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NRZ (non-return to zero)": {
    "term": "NRZ (non-return to zero)",
    "cat": "Pro Audio Reference",
    "def": "A system of binary code where one\u2019s are usually represented by a positive voltage and zeroes by a negative number, i.e., neither is ever zero volts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NSCA (National": {
    "term": "NSCA (National",
    "cat": "Pro Audio Reference",
    "def": "Systems Contractors Association) \u201cFounded in 1980 as the National Sound Contractors Association, the NSCA underwent a name change in 1994 to better reflect the diversification found within the hi-tech industry of electronic systems. Rather than focusing solely on the installation of audio systems, today\u2019s innovative member companies of the NSCA expanded into other fields, including audio, video, intercom/paging, telecommunications, security/access control, and many others.\u201d [from NSCA website]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NSP (native": {
    "term": "NSP (native",
    "cat": "Pro Audio Reference",
    "def": "signal processing) Intel-designed method of using a powerful microprocessor (like their Pentium CPU) for signal processing functions normally done by separate DSP chips. Not finding many backers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NSSP (National": {
    "term": "NSSP (National",
    "cat": "Pro Audio Reference",
    "def": "Standards Systems Network) A Web-based service launched by ANSI, along with government and industry partners. A full search & sales service provides for locating and buying virtually any standard. More than 100,000 global standards are available. Over 25 standards groups provide technical specs for this database, including ISO. The EIA endorsed the project.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NTMTM Crossover": {
    "term": "NTMTM Crossover",
    "cat": "Pro Audio Reference",
    "def": "Filter (Neville Thiele MethodTM Crossover Filter) Trademarked term for the patented (U.S. Patent 6,854,005) technology developed by Neville Thiele for Whise Acoustics in Australia. Two choices were offered, a 4th-order with rolloff slopes of 36 dB/octave and an 8th-order with 52 dB/octave slopes. The published curves resemble 4th- and 8th-order cascaded elliptic filters. Rod Elliot of Elliot Sound Products explores the details in his paper: NTM\u2122 Crossovers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NTSC (National": {
    "term": "NTSC (National",
    "cat": "Pro Audio Reference",
    "def": "Television Standards Committee) The United States and Japan standard for color formatting for television transmission developed in the 1950s. Compare with PAL/SECAM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "n-type semiconductor": {
    "term": "n-type semiconductor",
    "cat": "Pro Audio Reference",
    "def": "An extrinsic semiconductor in which the conduction electron concentration exceeds the mobile hole concentration. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "null": {
    "term": "null",
    "cat": "Mathematics",
    "def": "Of or relating to a set having no members or to zero magnitude. Instrumentation. A reading of zero. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nullator": {
    "term": "nullator",
    "cat": "Electronics",
    "def": "A two-terminal circuit element with a voltage-current (V-I) characteristic curve consisting of only the origin point on the V-I plane, i.e., it always has a value of 0-0. Used to model complex circuits for analysis. For example the input of an ideal op amp can be modeled with a nullator; it has zero input current and acts like a virtual short between its inputs, i.e., zero volts between the inputs, thus an input voltage-current characteristic of 0-0. Paired with a norator creates a nullor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "null modem": {
    "term": "null modem",
    "cat": "Pro Audio Reference",
    "def": "cable Special wiring of an RS-232 cable such that a computer can talk to another computer without a modem (thus \u201cnull\u201d modem). As a minimum, a null modem cable reverses pins 2 and 3 on a standard RS-232 cable \u2014 but other pins may also need changing and shorting together.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nullor": {
    "term": "nullor",
    "cat": "Electronics",
    "def": "A four-terminal circuit element consisting of a norator and a nullator; together they model an ideal op amp, i.e., one whose input voltage and current equal zero and whose output voltage and current can be any value.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "numerator": {
    "term": "numerator",
    "cat": "Mathematics",
    "def": "The top part of a common fraction.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "numerological nonsense": {
    "term": "numerological nonsense",
    "cat": "Pro Audio Reference",
    "def": "John Allen Paulos\u2019 wonderful page of rationality helping to fight off the increasing numbers of irrational parents/teachers/politicians/scientists/engineers/audiophiles/(your favorite here).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nu metal": {
    "term": "nu metal",
    "cat": "Music",
    "def": "A very diverse category that is somewhat based on heavy metal genre. Not to be confused with mu-metal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nusselt number": {
    "term": "Nusselt number",
    "cat": "Pro Audio Reference",
    "def": "See Grashof.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nWb See:": {
    "term": "nWb See:",
    "cat": "Pro Audio Reference",
    "def": "nanoweber.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nyckelharpa Musical Instrument": {
    "term": "nyckelharpa Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A 600 year old Swedish keyed stringed instrument. Very unusual; very cool.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nyquist diagram": {
    "term": "Nyquist diagram",
    "cat": "Pro Audio Reference",
    "def": "For feedback circuits, the plot, in rectangular coordinates, of the real and imaginary parts of the open loop transfer function. See: Nyquist diagram and contrast with Bode plot.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nyquist frequency": {
    "term": "Nyquist frequency",
    "cat": "Pro Audio Reference",
    "def": "The highest frequency that may be accurately sampled. The Nyquist frequency is one-half the sampling frequency. For example, the theoretical Nyquist frequency of a CD system is 22.05 kHz. See the RaneNote Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nyquist, Harry": {
    "term": "Nyquist, Harry",
    "cat": "Pro Audio Reference",
    "def": "(1889-1976) Swedish born American physicist most famous in pro audio for his diagram and frequency developments.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "1/4\u2033 TRS": {
    "term": "1/4\u2033 TRS",
    "cat": "Pro Audio Reference",
    "def": "or 1/4\u2033 TS See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "100Base-T or": {
    "term": "100Base-T or",
    "cat": "Pro Audio Reference",
    "def": "1000Base-T See Ethernet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "1/f noise": {
    "term": "1/f noise",
    "cat": "Pro Audio Reference",
    "def": "See flicker noise.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OAG (old": {
    "term": "OAG (old",
    "cat": "Pro Audio Reference",
    "def": "analog guy) As opposed to a YDG.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "obbligato Music": {
    "term": "obbligato Music",
    "cat": "Terminology",
    "def": "\u201c\u2018Necessary\u2019: term used for an independent and essential part in concerted music, secondary to the principal melody.\u201d [Sadie]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "object-oriented or": {
    "term": "object-oriented or",
    "cat": "Pro Audio Reference",
    "def": "object-based programming (Abbreviated OOP) A software technique in which a system program is expressed completely in terms of predefined things (objects), consisting of a set of variables and operations which can be performed on them, and the connections between objects.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oblique mode": {
    "term": "oblique mode",
    "cat": "Acoustics",
    "def": "Sound reflecting between all six sides of a rectanguloid. Compare with tangential mode and axial mode.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "obstacle gain": {
    "term": "obstacle gain",
    "cat": "Pro Audio Reference",
    "def": "The ratio, usually expressed in dB, of the electromagnetic field at a point in the vicinity of the geometrical shadow of an obstacle to the field which would occur in the absence of the obstacle. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OCA (Open Control Architecture)": {
    "term": "OCA (Open Control Architecture)",
    "cat": "Pro Audio Reference",
    "def": "An alliance of pro audio manufacturers with the goal of creating an open public communications standard for control and monitoring of devices in professional media networks.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ocarina Musical Instrument": {
    "term": "ocarina Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A small terra-cotta or plastic wind instrument with finger holes, a mouthpiece, and an elongated ovoid shape. Named after Italian oca, goose, from the fact that its mouthpiece is shaped like a goose\u2019s beak. [AHD] Made famous when Bob Hope, Bing Crosby and Dorothy Lamour played ocarinas and sang the song, When the Sweet Potato Piper Plays in the movie Road to Singapore, in 1940. [Thanks GS!] And who can forget the ocarina solo in the soundtrack of The Good, The Bad, and the Ugly in 1967. See Ocarina History; also Viennese Vegetable Orchestra.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Occam\u2019s razor": {
    "term": "Occam\u2019s razor",
    "cat": "Pro Audio Reference",
    "def": "A rule in science and philosophy stating that entities should not be multiplied needlessly. This rule is interpreted to mean that the simplest of two or more competing theories is preferable and that an explanation for unknown phenomena should first be attempted in terms of what is already known. Also called law of parsimony. [After William of Ockham.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "occluded ear": {
    "term": "occluded ear",
    "cat": "Pro Audio Reference",
    "def": "simulator Ear simulator that simulates the inner part of the ear canal, from the tip of an ear insert to the eardrum. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "occlusion or occlusion effect": {
    "term": "occlusion or occlusion effect",
    "cat": "Hearing",
    "def": "The phenomenon resulting from wearing solid earplugs, hearing aids or some personal monitors that makes the wearer\u2019s voice sound hollow and boomy to themselves, i.e., a voice-in-a-barrel effect. The earplugs block the ear canal resulting in a sound similar to sticking a finger in each ear and talking. This closure effect also produces louder sounds to the wearer since the ear canal blockage allows additional sound pressure to build up (rather than escape out the open ear canal) and be conducted to the inner ear. This is easily demonstrated by pronouncing and sustaining the word \u201cfee,\u201d then sticking your fingers in your ears and notice how much louder it sounds (oh go ahead, no one is looking).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octal": {
    "term": "octal",
    "cat": "Pro Audio Reference",
    "def": "A number system using the base-8, i.e., each digit can be any of 8 values, represented by the digits 0-7. A three-bit binary number (since 23 = 8) can also represent each octal digit.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octant Acoustical Geometry": {
    "term": "octant Acoustical Geometry",
    "cat": "Pro Audio Reference",
    "def": "One of the eight equal regions into which a set of three orthogonal planes divides three-dimensional space. An example of an octant is the region (x > 0, y > 0, z > 0), where x, y, z are rectangular coordinates. [Morfey]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octaphonic or octophonic Multichannel Sound": {
    "term": "octaphonic or octophonic Multichannel Sound",
    "cat": "Pro Audio Reference",
    "def": "Systems using eight discrete channels for recording and playback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octave 1.": {
    "term": "octave 1.",
    "cat": "Audio",
    "def": "The interval between any two frequencies having a ratio of 2 to 1. 2. Music a. The interval of eight diatonic degrees between two tones, one of which has twice as many vibrations per second as the other. b. A tone that is eight full tones above or below another given tone. c. An organ stop that produces tones an octave above those usually produced by the keys played. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octet": {
    "term": "octet",
    "cat": "Music",
    "def": "a. The interval of eight diatonic degrees between two tones of the same name, the higher of which has twice as many vibrations per second as the lower. b. A tone that is eight diatonic degrees above or below another given tone. c. Two tones eight diatonic degrees apart that are sounded together. d. The consonance that results when two tones eight diatonic degrees apart are sounded. e. A series of tones included within this interval or the keys of an instrument that produce such a series. f. An organ stop that produces tones an octave above those usually produced by the keys played. g. The interval between any two frequencies having a ratio of 2 to 1. h. A music group consisting of eight members & instruments. [AHD] Computers. Eight bits, also called a byte.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Octopus": {
    "term": "Octopus",
    "cat": "Recording",
    "def": "The name given by comedian W.C. Fields for Les Paul\u2019s original Ampex 8-track Sel-Sync\u2122 recorder.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octothorpe": {
    "term": "octothorpe",
    "cat": "Pro Audio Reference",
    "def": "The \u201c#\u201d symbol on the telephone keypad, also known as a pound sign, crosshatch, number sign, sharp, hash, crunch, mesh, hex, flash, grid, pig-pen, gate, hak, oof, rake, fence, gate, grid, gridlet, square, and widget mark. Click the link to read the history of this creative word.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Oddmusic.com": {
    "term": "Oddmusic.com",
    "cat": "Pro Audio Reference",
    "def": "A terrific website for unusual and bazaar music-making creations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OEM (original equipment manufacturer)": {
    "term": "OEM (original equipment manufacturer)",
    "cat": "Pro Audio Reference",
    "def": "The true manufacturer of equipment sold under another name.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OEO (one end open) Wiring": {
    "term": "OEO (one end open) Wiring",
    "cat": "Pro Audio Reference",
    "def": "Abbreviation used as shorthand when discussion the practice of only grounding one end (the sending end) of a connecting cable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oersted Abbr": {
    "term": "oersted Abbr",
    "cat": "Pro Audio Reference",
    "def": "Oe The unit of magnetic field strength (intensity) in the centimeter-gram-second electromagnetic system, equal to the magnetic intensity one centimeter from a unit magnetic pole. [IEEE] Named after Hans Christian Oersted (1777-1851), Danish physicist. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oeuvre 1": {
    "term": "oeuvre 1",
    "cat": "Pro Audio Reference",
    "def": "A work of art. 2. The sum of the lifework of an artist, writer, or composer. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OFC (oxygen-free copper) Wire &": {
    "term": "OFC (oxygen-free copper) Wire &",
    "cat": "Cables",
    "def": "Another of the popular audiophile myths that OFC power cables can improve sound. See Howard Johnson\u2019s wonderful essay titled: OFC madness: Facts, not fantasy, regarding power cables for high-end audio equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "O+": {
    "term": "O+",
    "cat": "Terminology",
    "def": "Festival Festival that began in Kingston, NY in 2010, and is now expanding to other venues like the one held in 2013 in San Francisco. This is a festival celebrating music and the arts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "off-axis response": {
    "term": "off-axis response",
    "cat": "Pro Audio Reference",
    "def": "Any direction other than the on-axis response, i.e., the response measured along the imaginary straight line drawn through the geometric center of an object. In pro audio most often used in measurements of loudspeakers, microphones and humans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "offset": {
    "term": "offset",
    "cat": "Pro Audio Reference",
    "def": "The start or initial stage; the outset. [AHD] Within pro audio typical offset categories are level, time, phase, and wavelength.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "offset binary": {
    "term": "offset binary",
    "cat": "Pro Audio Reference",
    "def": "A digital coding scheme for bipolar signals that represents the most negative value with all zeros and the most positive value with all ones.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Ogg Vorbis": {
    "term": "Ogg Vorbis",
    "cat": "Pro Audio Reference",
    "def": "An open, royalty-free, pro audio encoding and streaming technology that competes with AAC, TwinVQ and other schemes. The name \u201cOgg\u201d comes from a video game and \u201cVorbis\u201d from a Terry Pratchett novel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OHCI (Open": {
    "term": "OHCI (Open",
    "cat": "Pro Audio Reference",
    "def": "Host Controller Interface) Networks. Based on the IEEE-1394 specification, however, it goes beyond the basic specs. It allows for hard drives, CDR\u2019s, scanners, audio and video devices, digital still cameras, mixers, and more to be controlled.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ohm Abbr": {
    "term": "ohm Abbr",
    "cat": "Pro Audio Reference",
    "def": "R or Greek upper-case omega, \u03a9 A unit of electrical resistance equal to that of a conductor in which a current of one ampere is produced by a potential of one volt across its terminals. [After Georg Simon Ohm.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Ohm, Georg": {
    "term": "Ohm, Georg",
    "cat": "Pro Audio Reference",
    "def": "Simon (1789-1854) German physicist noted for his contributions to mathematics, acoustics, and the measurement of electrical resistance. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ohmage Archaic": {
    "term": "ohmage Archaic",
    "cat": "Pro Audio Reference",
    "def": "British term for loudspeaker resistance. No longer used; replaced by the term impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Ohm\u2019s Acoustic Law": {
    "term": "Ohm\u2019s Acoustic Law",
    "cat": "Pro Audio Reference",
    "def": "The law stating that a complex musical sound is heard as the sum of a number of distinct pure tones which can be resolved by Fourier analysis [OED]. [After Georg Simon Ohm.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Ohm\u2019s Electrical Law": {
    "term": "Ohm\u2019s Electrical Law",
    "cat": "Pro Audio Reference",
    "def": "The law stating that the direct current flowing in a conductor is directly proportional to the potential difference between its ends. It is usually formulated as V = IR, where V is the potential difference, or voltage, I is the current, and R is the resistance of the conductor. [After Georg Simon Ohm.] [Note: Georg Ohm did NOT formulate the basic power equations; that was done by James Joule: see Joule\u2019s Law.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ohnosecond": {
    "term": "ohnosecond",
    "cat": "Pro Audio Reference",
    "def": "A very short moment in time during which you realize that you have pressed the wrong key and deleted hours, days, or weeks of work. [Whatis.com]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OIART (Ontario": {
    "term": "OIART (Ontario",
    "cat": "Pro Audio Reference",
    "def": "Institute of Audio Recording Technology) This Canadian school offers a three-term, forty-six week immersion course designed to prepare graduates for a career in the professional audio recording and audio communications industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OITC (outdoor-indoor": {
    "term": "OITC (outdoor-indoor",
    "cat": "Pro Audio Reference",
    "def": "transmission class) Noise Measurement. A sound isolation measurement protocol, used to indicate the rate of sound transmission between outdoor and indoor spaces.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Okedo Daiko Muscial Instrument": {
    "term": "Okedo Daiko Muscial Instrument",
    "cat": "Pro Audio Reference",
    "def": "Japanese two-headed percussion drum.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oldest musical instrument": {
    "term": "oldest musical instrument",
    "cat": "Pro Audio Reference",
    "def": "A 35,000-year-old flute found in Germany is believed to be the first musical instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OLED (organic": {
    "term": "OLED (organic",
    "cat": "Pro Audio Reference",
    "def": "light emitting diode) A type of LED display made from organic polymers (think plastic that glows) that provides a wide viewing angle and uses low power. OLED displays do not require a backlight as do LCD screens. OLED screens can also be fabricated on plastic as well as glass substrates, making them more flexible and durable. See OLED for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OL": {
    "term": "OL",
    "cat": "Terminology",
    "def": "light See overload light.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Olson, Harry Ferdinand, Ph.D": {
    "term": "Olson, Harry Ferdinand, Ph.D",
    "cat": "Pro Audio Reference",
    "def": "(1901-1982) American engineer who worked 40 years at RCA labs, recognized and honored as a pioneer and leading authority in acoustics and electronic sound recording. He was granted over 100 patents, along with many awards and medals for his contributions to the science of sound. He authored more than 130 technical papers and wrote several textbooks still considered the best of their genre.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "omele Musical Instrument": {
    "term": "omele Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "The base of the bata drums consisting of 3 or 4 small drums tied together.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "omnidirectional microphone One with": {
    "term": "omnidirectional microphone One with",
    "cat": "Pro Audio Reference",
    "def": "a response pattern that is as close to a perfect sphere as possible. Receives sound from all directions equally well. Compare with unidirectional mic and cardioid microphone.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "on-axis response": {
    "term": "on-axis response",
    "cat": "Pro Audio Reference",
    "def": "See off-axis response.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ondes Martenot Synthesizers": {
    "term": "ondes Martenot Synthesizers",
    "cat": "Pro Audio Reference",
    "def": "(oenz MAR-te-noe) \u2013 An early synthesizer from 1928. A monophonic theremin-sounding instrument using a stretched wire under a keyboard with timbre and loudness controls. It was the female voice effect in the original Star Trek TV theme.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "one-bit data": {
    "term": "one-bit data",
    "cat": "Pro Audio Reference",
    "def": "converter Loose reference to any of the various data conversion schemes (e.g., delta-sigma, adaptive delta modulation, etc.) that use only one binary bit (i.e., levels 1 and 0) in the conversion and storage process.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "one-third octave 1": {
    "term": "one-third octave 1",
    "cat": "Pro Audio Reference",
    "def": "Term referring to frequencies spaced every one-third of an octave apart. One-third of an octave represents a frequency 1.26-times above a reference, or 0.794-times below the same reference. The math goes like this: 1/3-octave = 21/3 = 1.260; and the reciprocal, 1/1.260 = 0.794. Therefore, for example, a frequency 1/3-octave above a 1 kHz reference equals 1.26 kHz (which is rounded-off to the ANSI-ISO preferred frequency of \u201c1.25 kHz\u201d for equalizers and analyzers), while a frequency 1/3-octave below 1 kHz equals 794 Hz (labeled \u201c800 Hz\u201d). Mathematically it is significant to note that, to a very close degree, 21/3 equals 101/10 (1.2599 vs. 1.2589). This bit of natural niceness allows the same frequency divisions to be used to divide and mark an octave into one-thirds and a decade into one-tenths. 2. Term used to express the bandwidth of equalizers and other filters that are 1/3-octave wide at their -3 dB (half-power) points. 3. Approximates the smallest region (bandwidth) humans reliably detect change. See critical bands. Compare with third-octave.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "one-third octave SPL": {
    "term": "one-third octave SPL",
    "cat": "Pro Audio Reference",
    "def": "The sound pressure level of the sound contained within a one-third octave frequency band.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "onomastics 1": {
    "term": "onomastics 1",
    "cat": "Pro Audio Reference",
    "def": "a. The study of the origins and forms of proper names. b. The study of the origins and forms of terms used in specialized fields. 2. The system that underlies the formation and use of proper names or terms used in specialized fields. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "onomatopoeia": {
    "term": "onomatopoeia",
    "cat": "Pro Audio Reference",
    "def": "The formation or use of words such as buzz, hiss, splash, sizzle or murmur that imitate the sounds associated with the objects or actions they refer to. [AHD] See zaa zaa.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oompah": {
    "term": "oompah",
    "cat": "Music",
    "def": "A rhythmic sound made by a tuba or other brass instrument. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OOP See": {
    "term": "OOP See",
    "cat": "Pro Audio Reference",
    "def": "object-oriented.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "opacity 1": {
    "term": "opacity 1",
    "cat": "Pro Audio Reference",
    "def": "The quality or state of a body that makes it impervious to the rays of light; broadly : the relative capacity of matter to obstruct the transmission of radiant energy. 2.An opaque spot in a normally transparent structure (as the lens of the eye) [MWD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "op": {
    "term": "op",
    "cat": "Terminology",
    "def": "amp (operational amplifier) An analog integrated circuit device characterized as having two opposite polarity inputs and one output, used as the basic building block in analog signal processing. See vacuum-tube op amps.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "open circuit": {
    "term": "open circuit",
    "cat": "Electronics",
    "def": "The condition where there is no connection between two nodes, resulting in zero current flow between the nodes. Electricity. Containing a gap across which electricity cannot pass: an open circuit.[AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "opera 1": {
    "term": "opera 1",
    "cat": "Pro Audio Reference",
    "def": "A theatrical presentation in which a dramatic performance is set to music. [AHD] 2. \u201cI do not mind what language an opera is sung in so long as it is a language I don\u2019t understand\u201d. Edward Appleton, Observer August 28, 1955. [Crystal] 3. \u201cAn unalterable and unquestioned law of the musical world required that the German text of French operas sung by Swedish artists should be translated into Italian for the clearer understanding of the English-speaking audiences\u201d. Edith Wharton, 1920, The Age of Innocence. [Crystal]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ophicleide Musical Instrument": {
    "term": "ophicleide Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A family of keyed brass instruments.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "optical-fiber cable": {
    "term": "optical-fiber cable",
    "cat": "Pro Audio Reference",
    "def": "See fiber-optics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "optical microphone": {
    "term": "optical microphone",
    "cat": "Pro Audio Reference",
    "def": "Many designs exist but it seems like Sennheiser\u2019s new design (based on a licensing arrangement with the Israeli company Phone-Or (owner of US Patent 5,771,091) is the best yet. See: Sennheiser MO 2000. Here\u2019s how it works (paraphrased from the data sheet): light from an LED is directed onto a reflective diaphragm via an fiber optic cable. The diaphragm reflects part of the light into a receiver fiber optic cable. If the diaphragm is moved by sound signals, the reflected light bean is deflected, with the result that more or less light is coupled into the receiver fiber optic cable. At the end of the receiver fiber optic cable, a photodiode converts the light intensity variations into electric signals. The results are impressive: an omnidirectional polar pattern with 20 Hz to 40 kHz frequency response and a maximum 134 dB-SPL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Optigan (Optical organ) Musical Instrument": {
    "term": "Optigan (Optical organ) Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A portmanteau word naming a type of consumer electronic keyboard introduced in 1971 by a division of Mattel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "optocoupler Any": {
    "term": "optocoupler Any",
    "cat": "Pro Audio Reference",
    "def": "device that functions as an electrical-to-optical or optical-to-electrical transducer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Optophonic Piano": {
    "term": "Optophonic Piano",
    "cat": "Pro Audio Reference",
    "def": "Invented by Vladimir Baranoff Rossine, a very early color organ.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OR": {
    "term": "OR",
    "cat": "Terminology",
    "def": "Computer Science & Logic. A Boolean logical operator that returns a true value if one or both operators are true; a form of addition. For example, two parallel connected switches, A and B, requires one or both be closed for current to pass, thus it requires switch A OR switch B closed to operate.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "orange One of": {
    "term": "orange One of",
    "cat": "Pro Audio Reference",
    "def": "the words in the English language without a rhyme \u2014 some others are \u201cmonth,\u201d \u201cpurple,\u201d and \u201csilver.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "orange noise": {
    "term": "orange noise",
    "cat": "Pro Audio Reference",
    "def": "See noise color.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ordinate": {
    "term": "ordinate",
    "cat": "Mathematics",
    "def": "The plane Cartesian coordinate representing the distance from a specified point to the x-axis, measured parallel to the y-axis. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "organ": {
    "term": "organ",
    "cat": "Music",
    "def": "1. An instrument consisting of a number of pipes that sound tones when supplied with air and a keyboard that operates a mechanism controlling the flow of air to the pipes. Also called pipe organ. 2. Any one of various other instruments, such as the electronic organ, that resemble a pipe organ either in mechanism or sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "organic LED": {
    "term": "organic LED",
    "cat": "Pro Audio Reference",
    "def": "See OLED.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "organ of Corti": {
    "term": "organ of Corti",
    "cat": "Hearing",
    "def": "A specialized structure located on the inner surface of the basilar membrane of the cochlea containing hair cells that transmit sound vibrations to the nerve fibers. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "organ trio": {
    "term": "organ trio",
    "cat": "Pro Audio Reference",
    "def": "A group of three musicians playing a Hammond organ, a drummer and a jazz guitarist.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oronyms Speech": {
    "term": "oronyms Speech",
    "cat": "Pro Audio Reference",
    "def": "Streams of sound than can be carved into words in two different ways, i.e., it illustrates the seamlessness of speech. For example oronyms are often found in songs and nursery rhymes such as the famous \u201cMairzey doats and dozey doats, And little lamsey divey, A kiddley-divey do, Wouldn\u2019t you?\u201d From Pinker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "orotund 1": {
    "term": "orotund 1",
    "cat": "Pro Audio Reference",
    "def": "Pompous and bombastic: orotund talk. 2. Full in sound; sonorous: orotund tones. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ORTF (Office": {
    "term": "ORTF (Office",
    "cat": "Pro Audio Reference",
    "def": "de Radiodiffusion \u2014 Television Francaise) An initialism formed from the name of the French national broadcasting system, who designed a stereo microphone recording technique known as the ORTF method. The technique uses two cardioid microphones with a spacing of 17 cm between the microphone diaphragms, and with an 110\u00b0 angle between the capsules. This technique reproduces stereo cues similar to those used by the human ear to perceive directional information in the horizontal plane. The spacing of the microphones emulates the distance between the human ears, and the angle between the two directional microphones emulates the shadow effect of the human head. The ORTF stereo technique provides the recording with a wider stereo image than X-Y stereo while still preserving good mono information.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "orthogonal 1. Relating to": {
    "term": "orthogonal 1. Relating to",
    "cat": "Mathematics",
    "def": "a. Of or relating to a matrix whose transpose equals its inverse. b. Of or relating to a linear transformation that preserves the length of vectors. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oscillator Electronics & Synthesizers": {
    "term": "oscillator Electronics & Synthesizers",
    "cat": "Pro Audio Reference",
    "def": "A circuit that continuously alternates between two (or more) states [IEEE]; the period between alternations defines the frequency of oscillation. A common said complaint of electronic engineering students is that they build \u201camplifiers that oscillate and oscillators that amplify\u201d.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oscilloscope Electronic Test Equipment": {
    "term": "oscilloscope Electronic Test Equipment",
    "cat": "Pro Audio Reference",
    "def": "An instrument primarily for making visible the instantaneous value of one or more rapidly varying electrical quantities (typically voltage) as a function of time or another electrical or mechanical quantity. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OSD (optimal": {
    "term": "OSD (optimal",
    "cat": "Pro Audio Reference",
    "def": "source distribution) Localization. A system to eliminate or improve the degradation caused by cross-talk cancellation techniques used in binaural sound reproduction.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OSD (on-screen display) chip": {
    "term": "OSD (on-screen display) chip",
    "cat": "Pro Audio Reference",
    "def": "An integrated circuit providing all necessary functions for adding text to television or video monitor display screens.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OSHA U.S": {
    "term": "OSHA U.S",
    "cat": "Pro Audio Reference",
    "def": "Occupational Safety and Health Administration",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Osheaga": {
    "term": "Osheaga",
    "cat": "Pro Audio Reference",
    "def": "A music and arts festival held on Montreal\u2019s Saint Helen\u2019s Island, is considered one of the most important festivals of its genre in Canada. Known as The Festival de la Musique et des Arts to Montreal natives..",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OSI (open system interconnection)": {
    "term": "OSI (open system interconnection)",
    "cat": "Pro Audio Reference",
    "def": "The only internationally accepted framework of standards for communication between different systems made by different vendors. The model originally developed by ISO describing computer communication services and protocols without making assumptions concerning language, operating systems or application issues. The main goal is to create an open systems networking environment where any vendor\u2019s computer system, connected to any network, can freely share data with any other computer system on that network See The 7 Layers of the OSI Model.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ossicles": {
    "term": "ossicles",
    "cat": "Hearing",
    "def": "The group of the three bones of the middle ear commonly known as the hammer, anvil and stirrup.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ostinato": {
    "term": "ostinato",
    "cat": "Music",
    "def": "A short melody or pattern that is constantly repeated, usually in the same part at the same pitch. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "otacoustic": {
    "term": "otacoustic",
    "cat": "Hearing",
    "def": "Any external apparatus that improves hearing, e.g., an ear trumpet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OTL (output transformerless) Power Amplifiers": {
    "term": "OTL (output transformerless) Power Amplifiers",
    "cat": "Pro Audio Reference",
    "def": "Historically vacuum tube power amplifiers had output transformers that isolated the high output impedance of the tubes and the low impedance of the loudspeaker load. Years later tube amplifiers evolved into cathode follower designs that no longer required output transformers, thus they became \u201coutput transformerless.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "otoacoustic emission": {
    "term": "otoacoustic emission",
    "cat": "Hearing",
    "def": "Sound generated from the inner ear and observable as sound in the external ear canal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "otolaryngology": {
    "term": "otolaryngology",
    "cat": "Hearing",
    "def": "The branch of science that treats diseases of the ear, nose and throat.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OTPROM (one-time": {
    "term": "OTPROM (one-time",
    "cat": "Pro Audio Reference",
    "def": "programmable read-only memory) A redundant term, incorrectly used to mean PROM \u2014 a PROM, by definition, is a one-time device.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oud (aka ud) Musical Instrument": {
    "term": "oud (aka ud) Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A musical instrument of northern Africa and southwest Asia resembling a lute. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "outboard unit": {
    "term": "outboard unit",
    "cat": "Pro Audio Reference",
    "def": "External, usually referring to a separate piece of signal processing gear located remote to a mixer that connects in the effects loop.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Outer Banks": {
    "term": "Outer Banks",
    "cat": "Pro Audio Reference",
    "def": "Bluegrass Island Festival See: Bluegrass Island Festival.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "out-of-phase In": {
    "term": "out-of-phase In",
    "cat": "Pro Audio Reference",
    "def": "an un-synchronized or un-correlated way. See polarity and phase et al.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "output impedance": {
    "term": "output impedance",
    "cat": "Electronics",
    "def": "The output driving impedance of a device, usually low in the 50-300 ohm range. Output impedance is frequency dependent and varies as a function of circuit feedback, therefore the value given must state the frequency range it covers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Outside Lands": {
    "term": "Outside Lands",
    "cat": "Pro Audio Reference",
    "def": "Three-day festival held in Golden Gate Park, San Francisco since 2009 featuring music, food, wine, beer and art.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oval window": {
    "term": "oval window",
    "cat": "Hearing",
    "def": "\u201cA tiny membranous window on the cochlea to which the foot plate of the stirrup ossicle is attached. The sound from the eardrum is transmitted to the fluid of the inner ear through the oval window.\u201d [Everest]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ovcharska svirka Musical Instrument": {
    "term": "ovcharska svirka Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Bulgarian shepherd\u2019s pipe.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "overdrive box": {
    "term": "overdrive box",
    "cat": "Pro Audio Reference",
    "def": "See: effects boxes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "overdub": {
    "term": "overdub",
    "cat": "Recording",
    "def": "To add (supplementary recorded sound) to a previously taped musical recording especially in order to heighten the total effect. Additional recorded sound that is blended into a musical recording. [AHD] Usually done while listening to the previously recorded music on the same tape recorder or device.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "overload light": {
    "term": "overload light",
    "cat": "Pro Audio Reference",
    "def": "or OL light An indicator found on pro audio signal processing units that lights once the signal level exceeds a preset point. There is no standard specifying when an OL light should illuminate, although common practice makes it 3-4 dB below actual clipping. Good signal processing design ensures that the OL light illuminates anytime the signal exceeds the set point, anywhere in the signal path, not just the input or output level.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "override Signal Processing": {
    "term": "override Signal Processing",
    "cat": "Pro Audio Reference",
    "def": "See: ducker.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "overs": {
    "term": "overs",
    "cat": "Pro Audio Reference",
    "def": "A term associated with A/D converters used to describe input signals exceeding the full scale range (0 dBFS). Overs indicators vary from simple single LEDs to elaborate calibrated digital meters. To be of genuine value the overs indicator, however displayed, must be based on reading the true digital code associated with the input level. It is important to distinguish between 0 dBFS and overs; they are not the same. 0 dBFS is the absolute highest voltage level that any particular A/D can convert. It produces the equivalent of a digital code consisting of all 1s. No digital level can exceed 0 dBFS. A 0 dBFS voltage level and all levels greater than this produce the same output code of all 1s. A true overs indicator actually counts the number of times that the 0 dBFS level was exceeded and displays this number. As yet there is no standard as to how many samples exceeding 0 dBFS constitutes an over. Everyone agrees that very brief excursions beyond 0 dBFS (producing digital clipping) cannot be heard; however no such agreement exists as to just how many samples it takes before an over is audible.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oversampling 1": {
    "term": "oversampling 1",
    "cat": "Pro Audio Reference",
    "def": "Sampling at a rate higher than the sampling Nyquist theorem. 2. A technique where each sample from the data converter is sampled more than once, i.e., oversampled. This multiplication of samples permits digital filtering of the signal, thus reducing the need for sharp analog filters to control aliasing. See the RaneNote Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "overtone Any": {
    "term": "overtone Any",
    "cat": "Pro Audio Reference",
    "def": "frequency higher than the fundamental frequency of a sound. See: harmonic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OXCO (oven-controlled crystal oscillator)": {
    "term": "OXCO (oven-controlled crystal oscillator)",
    "cat": "Electronics",
    "def": "Very stable form of crystal oscillator.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oxide, magnetic": {
    "term": "oxide, magnetic",
    "cat": "Recording",
    "def": "Magnetically responsive material forming the basis of magnetic recording. It comes in a variety of types with different recording properties, especially suited to the needs of audio tape or videotape recording at a variety of densities of recording. [Holman]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Oz": {
    "term": "Oz",
    "cat": "Terminology",
    "def": "From Frank Baum\u2019s \u201cThe Wizard of Oz,\u201d the name was created when he looked at his filing cabinet and saw \u201cA-N,\u201d and \u201cO-Z,\u201d hence \u201cOz.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "P2C2E (process": {
    "term": "P2C2E (process",
    "cat": "Pro Audio Reference",
    "def": "too complex to explain) [Thanks, Lou!]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "P2P See": {
    "term": "P2P See",
    "cat": "Pro Audio Reference",
    "def": "peer-to-peer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "p": {
    "term": "p",
    "cat": "Terminology",
    "def": "The symbol for pico-.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "p\u2019s and": {
    "term": "p\u2019s and",
    "cat": "Pro Audio Reference",
    "def": "q\u2019s From old British saying: pints and quarts [\u2026 and you know pints and quarts of what.] 1. Socially correct behavior; manners. 2. The way one acts; conduct: was told to watch his p\u2019s and q\u2019s or he would be fired. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PA": {
    "term": "PA",
    "cat": "Terminology",
    "def": "(public address) See: Bruce Borgerson\u2019s: \u201cIs it P.A. or SR?\u201d. Also see: Andy Coules\u2019 The History of PA, Part 1. and Modern Pioneers: The History of PA, Part 2.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PA-232": {
    "term": "PA-232",
    "cat": "Pro Audio Reference",
    "def": "An RS-232-based variant of the PA-422 AES standard.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PA-422": {
    "term": "PA-422",
    "cat": "Pro Audio Reference",
    "def": "A pro audio implementation of Electronics Industries Association EIA-422 interconnection standard, defined and adopted by the Audio Engineering Society as AES Recommended practice for sound-reinforcement systems \u2013 Communications interface (PA-422) AES 15-1991 (ANSI S4.49-1991).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAC (Perceptual": {
    "term": "PAC (Perceptual",
    "cat": "Pro Audio Reference",
    "def": "Audio Coder) Proprietary bit reduction scheme originally developed by Elemedia, a subsidiary of Bell Labs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "packet Ethernet": {
    "term": "packet Ethernet",
    "cat": "Pro Audio Reference",
    "def": "An Ethernet packet consists of two kinds of data: control information and user data (also known as payload). [Wikipedia; hit the link.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pad See": {
    "term": "pad See",
    "cat": "Pro Audio Reference",
    "def": "attenuator pad.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAE (patent assertion entities)": {
    "term": "PAE (patent assertion entities)",
    "cat": "Pro Audio Reference",
    "def": "The politically correct term for \u201cpatent trolls.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAG (potential acoustic gain)": {
    "term": "PAG (potential acoustic gain)",
    "cat": "Acoustics",
    "def": "The calculated gain that a sound system can achieve at or just below the point of feedback. [Vear]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAL\u00ae (programmable": {
    "term": "PAL\u00ae (programmable",
    "cat": "Pro Audio Reference",
    "def": "array logic) Original registered trademark of Monolithic Memories Inc. (now owned by Advanced Micro Devices, Inc.) for their fuse-link once-programmable logic parts that have a programmable AND array, but a predefined OR array. See also PLA, PLD & FPGA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAL/SECAM (phase": {
    "term": "PAL/SECAM (phase",
    "cat": "Pro Audio Reference",
    "def": "alternated line/sequential couleur avec memoire or sequential color with memory) The European and Australian standard for color formatting for television transmission developed in the 1960s and used most everywhere in the world except the U.S.A. and Japan, which use NTSC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Palais en": {
    "term": "Palais en",
    "cat": "Pro Audio Reference",
    "def": "Jazz Yearly very cool outdoor event held in a royal palace in northern France called Palais de Compi\u00e8gne.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PALM Expo": {
    "term": "PALM Expo",
    "cat": "Pro Audio Reference",
    "def": "(Pro Audio Lighting Music) China\u2019s Largest International Exhibition on Pro Audio, Light, Music & Technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PALME Conferences": {
    "term": "PALME Conferences",
    "cat": "Pro Audio Reference",
    "def": "(Professional Audio, Light, Music and Entertainment) International exhibitions held in Middle East, Asia and Vietnam.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAMA (Professional": {
    "term": "PAMA (Professional",
    "cat": "Pro Audio Reference",
    "def": "Audio Manufacturers Alliance) The voice of the professional audio manufacturing community, managed by InfoComm.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pan (panoramic) control": {
    "term": "pan (panoramic) control",
    "cat": "Pro Audio Reference",
    "def": "A control found on mixers, used to \u201cmove,\u201d or pan the apparent position of a single sound channel between two outputs, usually \u201cleft,\u201d and \u201cright,\u201d for stereo outputs. At one extreme of travel the sound source is heard from only one output; at the other extreme it is heard from the other output. In the middle, the sound is heard equally from each output, but is reduced in level by 3 dB relative to its original value (this is theoretical, the real world is not quite that simple \u2014 see Pan Law). This guarantees that as the sound is panned from one side to the other, it maintains equal loudness (power) for all positions. Contrast with balance and crossfade controls.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pandemonium Loud,": {
    "term": "pandemonium Loud,",
    "cat": "Pro Audio Reference",
    "def": "confused, or disagreeable sound implying disorderly tumult together with loud, bewildering sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pangram": {
    "term": "pangram",
    "cat": "Pro Audio Reference",
    "def": "A sentence that uses all the letters of the alphabet. [AHD] The most famous example comes from typing class: The quick brown fox jumps over the lazy dog.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pan law": {
    "term": "pan law",
    "cat": "Pro Audio Reference",
    "def": "Real world acoustics complicates things immensely when panning a signal. Hit the link to learn why.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "panoply": {
    "term": "panoply",
    "cat": "Pro Audio Reference",
    "def": "A splendid or striking array: a panoply of colorful flags. [AHD] Used in pro audio to describe loudspeaker line arrays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Panatrope Phonographs": {
    "term": "Panatrope Phonographs",
    "cat": "Pro Audio Reference",
    "def": "Designed by RCA and sold by Brunswick in 1925, this was their name for the first phonograph player to use electricity to reproduce the sound stored on the record. Hit the link to see a photo. Go to AdClassix.com to see (and buy) their original magazine advertisement.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PANS Acronym": {
    "term": "PANS Acronym",
    "cat": "Pro Audio Reference",
    "def": "for personal area network system. Interconnection of IT (information technology) devices within the range of an individual person. Compare with POTS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAQRAT\u00ae": {
    "term": "PAQRAT\u00ae",
    "cat": "Pro Audio Reference",
    "def": "A registered trademark of Rane Corporation for their recording converter devices, RC 24T & RC 24A, that converted AES/EBU stereo 18-24 bit digital audio two track data into 16-bit compatible four tracks for recording and playback on 1st-generation 16-bit modular digital multitrack tape machines such as Alesis ADAT and Tascam DTRS (DA-88) models.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "parabolic reflector": {
    "term": "parabolic reflector",
    "cat": "Acoustics",
    "def": "Shape and mathematics behind antennas and special purpose microphones and sound mirrors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "paragraphic See": {
    "term": "paragraphic See",
    "cat": "Pro Audio Reference",
    "def": "parametric equalizer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "parallel circuit Electronic Circuits": {
    "term": "parallel circuit Electronic Circuits",
    "cat": "Pro Audio Reference",
    "def": "Two-terminal elements are connected in parallel when they are connected between the same pair of nodes. For example a parallel battery connection is made by connecting all positive terminals together and all negative terminals together, the voltage of the group being only that of one cell and the current drain through the battery being divided among the several cells. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "parallel interface": {
    "term": "parallel interface",
    "cat": "Pro Audio Reference",
    "def": "The printer port in the PC world. A parallel port conforming to the quasi-standard called the Centronics Parallel Standard (there is no EIA standard). Originally a 36-pin connector, now more often a D-25 type connector. A parallel (as opposed to serial) interface transfers all bits in a word simultaneously. See also serial interface.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "parametric audio coding Audio Compression": {
    "term": "parametric audio coding Audio Compression",
    "cat": "Pro Audio Reference",
    "def": "An audio coding technology originally developed for speech. Basis of MPEG-4 standard.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "parametric equalizer": {
    "term": "parametric equalizer",
    "cat": "Pro Audio Reference",
    "def": "First designed and named by George Massenburg in 1969, a multi-band variable equalizer offering control of all the \u201cparameters\u201d of the internal bandpass filter sections. These parameters being amplitude, center frequency and bandwidth. This allows the user not only to control the amplitude of each band, but also to shift the center frequency and to widen or narrow the affected area. Available with rotary and slide controls. Subcategories of parametric equalizers exist which allow control of center frequency but not bandwidth. For rotary control units the most used term is quasi-parametric. For units with slide controls the popular term is paragraphic. The frequency control may be continuously variable or switch selectable in steps. Cut-only parametric equalizers (with adjustable bandwidth or not) are called notch equalizers, or band-reject equalizers. See the RaneNote Constant-Q Graphic Equalizers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "parity": {
    "term": "parity",
    "cat": "Pro Audio Reference",
    "def": "A redundant error detection method in which the total number of binary 1\u2019s (or 0\u2019s) is always made even or odd by appending one or more bits.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Parkinson\u2019s Law": {
    "term": "Parkinson\u2019s Law",
    "cat": "Pro Audio Reference",
    "def": "\u201cWork expands so as to fill the time available for its completion.\u201d Prof. Cyril Northcote Parkinson (1909-1993)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "partial or": {
    "term": "partial or",
    "cat": "Pro Audio Reference",
    "def": "partial tone See harmonic.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pascal Abbr": {
    "term": "pascal Abbr",
    "cat": "Pro Audio Reference",
    "def": "Pa. The International System unit of pressure equal to one newton per square meter. [After Blaise Pascal.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Pascal, Blaise": {
    "term": "Pascal, Blaise",
    "cat": "Pro Audio Reference",
    "def": "(1623-1662) French philosopher and mathematician. Among his achievements are the invention of an adding machine and the development of the modern theory of probability. Famous quote: \u201cI have made this letter longer than usual because I lack the time to make it short.\u201d \u2013 Blaise Pascal, in \u201cProvincial Letters.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "passband": {
    "term": "passband",
    "cat": "Pro Audio Reference",
    "def": "The range of frequencies passed by an audio low-pass, high-pass or bandpass filter. Normally measured at the -3 dB point: the frequency point where the amplitude response is attenuated 3 dB (decibels) relative to the level of the main passband. For a bandpass filter two points are referenced: the upper and lower -3 dB points. The -3 dB point represents the frequency where the output power has been reduced by one-half. [Technical details: -3 dB represents a multiplier of 0.707. If the voltage is reduced by 0.707, the current is also reduced by 0.707 (ohms law), and since power equals voltage-times-current, 0.707 times 0.707 equals 0.5, or half-power.] The opposite of stopband.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "passive component": {
    "term": "passive component",
    "cat": "Electronics",
    "def": "A component that does not require power to operate, e.g., a resistor. Contrast with active.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "passive crossover": {
    "term": "passive crossover",
    "cat": "Pro Audio Reference",
    "def": "A loudspeaker crossover not requiring a power supply for operation. Normally built into the loudspeaker cabinet. Passive crossovers do not require separate power amplifiers for each driver. See active crossover. See the RaneNote Signal Processing Fundamentals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "passive equalizer": {
    "term": "passive equalizer",
    "cat": "Pro Audio Reference",
    "def": "A variable equalizer requiring no power supply to operate. Consisting only of passive components (inductors, capacitors and resistors) passive equalizers have no AC line cord. Favored for their low noise performance (no active components to generate noise), high dynamic range (no active power supplies to limit voltage swing), extremely good reliability (passive components rarely break), and lack of RFI interference (no semiconductors to detect radio frequencies). Disliked for their cost (inductors are expensive), size (and bulky), weight (and heavy), hum susceptibility (and need careful shielding), and signal loss characteristic (passive equalizers always reduce the signal). Also inductors saturate easily with large low frequency signals, causing distortion. Rarely seen today, but historically they were used primarily for notching in permanent sound systems. See the RaneNote Operator Adjustable Equalizers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PASTI (public": {
    "term": "PASTI (public",
    "cat": "Pro Audio Reference",
    "def": "address speech transmission index) Chiefly British term for STIpa.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "patchbay or patch panel": {
    "term": "patchbay or patch panel",
    "cat": "Pro Audio Reference",
    "def": "A flat panel, or enclosure, usually rack-mounted, that contains at least two rows of 1/4\u2033 TRS connectors used to \u201cpatch in\u201d or insert into the signal path a piece of external equipment (really dense configurations use 4.4 mm miniature or \u201cbantam\u201d jacks). The two rows consists of \u201csend\u201d (top row) and \u201creceive\u201d (bottom row) jacks wired for true balanced interconnection, i.e., tip = positive signal, ring = negative signal, sleeve = shield ground (unbalanced patchbays exist \u2013 but should not \u2013 so no further discussion). The two rows are tied together by shorting contacts such that the normal operation (hence, \u201cnormalling\u201d jacks) is to short the send and receive tip-to-tip & ring-to-ring (the sleeves are always connected) maintaining the signal path until something is plugged in (or jacked-in as cyberpunks love to say). Popular in recording studios where it is common to change the units in the signal path for each new session or client. Another popular wiring convention is called \u201chalf-normalled\u201d where only one of the insert points (top: send, or bottom: receive) breaks the signal path (in normalling, or full normalling as it is sometimes called, inserting into either top or bottom row breaks the signal path). This configuration allows monitoring of the sent signal or received signal depending on which row is half-normalled. Hit the link to see diagrams.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "patents See:": {
    "term": "patents See:",
    "cat": "Pro Audio Reference",
    "def": "USPTO.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "patent trolls": {
    "term": "patent trolls",
    "cat": "Pro Audio Reference",
    "def": "See: PAE.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Paterson, A.B": {
    "term": "Paterson, A.B",
    "cat": "Pro Audio Reference",
    "def": "(\u201cBanjo\u201d) (1864-1941) Australian bush poet most famous for writing the song, \u201cWaltzing Matilda,\u201d which became Australia\u2019s unofficial national anthem. Hit the link for the fascinating story.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "a.": {
    "term": "a.",
    "cat": "Terminology",
    "def": "A regional dialect, especially one without a literary tradition. b. Nonstandard speech. The special jargon of a group; cant. [AHD] See for example: Jamaican Patois.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Paul, Les": {
    "term": "Paul, Les",
    "cat": "Pro Audio Reference",
    "def": "(1915-2009) [Birth name: Lester William Polsfuss] American musician legend who was also a gifted songwriter and inventor. His pioneering work on the solid-body electric guitar and multitrack recordings changed the pro audio industry forever.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "payload See:": {
    "term": "payload See:",
    "cat": "Pro Audio Reference",
    "def": "packet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PBX (private": {
    "term": "PBX (private",
    "cat": "Pro Audio Reference",
    "def": "branch exchange) Term referring to hardware allowing several telephones to be connected to a smaller number of lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PC": {
    "term": "PC",
    "cat": "Terminology",
    "def": "(personal computer) Original term coined by IBM to describe their first personal computers; now used to mean all IBM-compatible personal computers, or any personal computer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCA (principal component analysis)": {
    "term": "PCA (principal component analysis)",
    "cat": "Mathematics",
    "def": "A statistical analysis method invented in 1901 by Karl Pearson .",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCB (printed circuit board)": {
    "term": "PCB (printed circuit board)",
    "cat": "Electronics",
    "def": "An electric circuit in which the conducting connections have been printed or otherwise deposited in predetermined patterns on an insulating base. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PC-Card See": {
    "term": "PC-Card See",
    "cat": "Pro Audio Reference",
    "def": "PCMCIA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PC-DOS\u00ae (personal": {
    "term": "PC-DOS\u00ae (personal",
    "cat": "Pro Audio Reference",
    "def": "computer disk operating system) IBM\u2018s trademarked acronym for their PC operating system. If PC-DOS runs on an IBM compatible, it is then called MS-DOS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCI (peripheral": {
    "term": "PCI (peripheral",
    "cat": "Pro Audio Reference",
    "def": "component interconnect) Intel-designed high performance CPU interconnect strategy for \u201cglueless\u201d I/O subsystems. A 32- or 64-bit local-bus specification, characterized by being self-configuring, open, high-bandwidth and processor-independent \u2014 allowing for modular hardware design.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCM (pulse code modulation)": {
    "term": "PCM (pulse code modulation)",
    "cat": "Pro Audio Reference",
    "def": "A conversion method in which digital words in a bit stream represent samples of analog information. The basis of most digital audio systems, first invented by Alec H. Reeves in 1937. Also see RaneNote: Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCMCIA (Personal": {
    "term": "PCMCIA (Personal",
    "cat": "Pro Audio Reference",
    "def": "Computer Memory Card International Association) 1. The association and first name given to the standardized credit-card size packages (aka smart cards) for memory and I/O (modems, LAN cards, etc.) for computers, laptops, palmtops, etc. Nicknamed PC-Card, which is now the preferred term. 2. Popularly believed to stand for People Can\u2019t Memorize Computer Interface Acronyms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PDA (personal digital assistant)": {
    "term": "PDA (personal digital assistant)",
    "cat": "Pro Audio Reference",
    "def": "A small palmtop-like computer designed for specific tasks such as a pocket calculator. Other examples include personal electronic diaries, memo takers, communicators, web browsers, dictionary-translators, etc. Apple\u2018s Newton is a PDA. IBM named theirs personal communicators.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pdf (probability": {
    "term": "pdf (probability",
    "cat": "Pro Audio Reference",
    "def": "density function) See probability density function.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PDF files": {
    "term": "PDF files",
    "cat": "Pro Audio Reference",
    "def": "(portable document format) Suffix letters used (.pdf) to indicate an Adobe Acrobat document.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peak hold Metering": {
    "term": "peak hold Metering",
    "cat": "Pro Audio Reference",
    "def": "An extra function found on some LED, LCD or plasma ladder arrays where the peak value is displayed by a single element displayed above the average program material. Commonly has a slow decay rate where it is usual to see just the peak value element lit with no others once the program material ends.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peaking response Term": {
    "term": "peaking response Term",
    "cat": "Pro Audio Reference",
    "def": "used to describe a bandpass shape when applied to program equalization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peak program": {
    "term": "peak program",
    "cat": "Pro Audio Reference",
    "def": "meter See PPM.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peak PSD (power spectral density)": {
    "term": "peak PSD (power spectral density)",
    "cat": "Physics",
    "def": "PSD measured in a time interval less than one second. Term used to specify UWB radios.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PEAQ (perceptual": {
    "term": "PEAQ (perceptual",
    "cat": "Pro Audio Reference",
    "def": "evaluation of audio quality) Term for the ITU-R recommendations for the objective measurement of perceived audio quality for perceptually coded digital audio signals. Popularly called the new \u201celectronic ear\u201d to provide yardstick values for digitally coded audio quality, there are a series of recommendations covering various aspects of this method (e.g., ITU-R Rec. BS.1387, ITU-R Rec. BS.1116 and ITU-R Rec. BS.562-3). For details of this complex issue see the definitive overview paper by Thiede, et al., \u201cPEAQ \u2014 The ITU Standard for Objective Measurement of Perceived Audio Quality,\u201d J. Audio Eng. Soc., vol. 48 [Audio Engineering Society, January/February 2000].",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Pearson, Donald (\u201cDr": {
    "term": "Pearson, Donald (\u201cDr",
    "cat": "Pro Audio Reference",
    "def": "Don\u201d) Michael (1942-2006) American live sound engineer who pioneered high-fidelity large-scale sound reinforcement systems. His systems powered many famous groups including Jefferson Airplane, Hot Tuna, Jefferson Starship, Grateful Dead, Andrea Bocelli and the Dave Matthews Band.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Pease, Bob": {
    "term": "Pease, Bob",
    "cat": "Pro Audio Reference",
    "def": "(1940-2011) Famous American engineer known for his innovative analog IC designs, popular for his \u201cPease Porridge\u201d column in Electronic Design magazine, and writing about hiking and biking in exotic places like Tibet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PEC (parallel": {
    "term": "PEC (parallel",
    "cat": "Pro Audio Reference",
    "def": "earth conductor) Modern best practices for EMC in installations (per IEC 61000-5-2:1998) require the use of trays, conduits and heavy-gauge earth conductors, known as \u201cparallel earth conductors\u201d (PEC) to divert power currents away from cables and their shields. See Williams\u2018 EMC for Systems and Installations for full details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PEC (protective": {
    "term": "PEC (protective",
    "cat": "Pro Audio Reference",
    "def": "earth conductor) Conductor to be connected between the protective earth terminal and an external protective earthing system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peer-to-peer abbreviated P2P": {
    "term": "peer-to-peer abbreviated P2P",
    "cat": "Pro Audio Reference",
    "def": "A network term popularly used to mean an equal access network where every node can send/receive data at any time without waiting for permission, i.e., each node can act as a client or server. An example would be a group of computers that communicate directly with each other, rather than through a central server.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pennywhistle See:": {
    "term": "pennywhistle See:",
    "cat": "Pro Audio Reference",
    "def": "tin whistle.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pentode": {
    "term": "pentode",
    "cat": "Electronics",
    "def": "A vacuum tube consisting of five elements: cathode, control grid, screen grid, suppressor grid and plate.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Percentage Articulation": {
    "term": "Percentage Articulation",
    "cat": "Pro Audio Reference",
    "def": "Loss of Consonants (%ALCONS) A term first published in the paper by V. M. A. Peutz. \u201cArticulation Loss of Consonants as a Criteria for Speech Transmission in a Room,\u201d J. Audio Eng. Soc., Vol. 19, Dec 1971. It is a measure of room speech intelligibility based on the measured RT60 time and dimensions of the room, combined and expressed as a percent, where 0% (no loss of consonants) is perfect, 10% is poor, and 15% is intolerable. Popularized by Syn-Aud-Con\u2019s Pat Brown who teaches how to use it to direct loudspeaker line arrays. See Peter Mapp\u2019s excellent AES preprint 5668 presented at the 113th Convention of the Audio Engineering Society, Los Angeles, October 2002. Contrast with STI and RASTI.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "perceptual coding": {
    "term": "perceptual coding",
    "cat": "Pro Audio Reference",
    "def": "A lossy digital audio data compression technique based on the human hearing mechanisms of masking and critical bands. AC-3 and AAC are examples of digital audio data compression schemes based on perceptual coding.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "perfect pitch": {
    "term": "perfect pitch",
    "cat": "Pro Audio Reference",
    "def": "See: absolute pitch.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Perfect-QTM graphic": {
    "term": "Perfect-QTM graphic",
    "cat": "Pro Audio Reference",
    "def": "equalizer Rane Corporation\u2019s trademark term for their patented true response graphic equalizer technology. See the RaneNote Perfect-Q, the Next Step in Graphic Equalizers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "perilymph": {
    "term": "perilymph",
    "cat": "Hearing",
    "def": "A fluid found in the inner ear.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "period Abbr": {
    "term": "period Abbr",
    "cat": "Pro Audio Reference",
    "def": "T, t 1. The period of a periodic function is the smallest time interval over which the function repeats itself. (For example, the period of a sine wave is the amount of time, T, it takes for the waveform to pass through 360 degrees. Also, it is the reciprocal of the frequency itself: i.e., T = 1/f.) 2. Mathematics. a. The least interval in the range of the independent variable of a periodic function of a real variable in which all possible values of the dependent variable are assumed. b. A group of digits separated by commas in a written number. c. The number of digits that repeat in a repeating decimal. For example, 1/7 = 0.142857142857\u2026 has a six-digit period. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "periodic motion": {
    "term": "periodic motion",
    "cat": "Pro Audio Reference",
    "def": "Motion that repeats itself at regular or predictable intervals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peripheral Equipment": {
    "term": "peripheral Equipment",
    "cat": "Pro Audio Reference",
    "def": "physically independent of, but which may interface to a computer or a controller.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Perkins EQTM": {
    "term": "Perkins EQTM",
    "cat": "Pro Audio Reference",
    "def": "Trademark of Mackie for their mixing board EQ designed by the legendary Cal Perkins of Marantz, JBL & Fender fame.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "permeability Magnetics": {
    "term": "permeability Magnetics",
    "cat": "Pro Audio Reference",
    "def": "A general term used to express various relationships between magnetic induction and magnetizing force. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "permeance Magnetics": {
    "term": "permeance Magnetics",
    "cat": "Pro Audio Reference",
    "def": "A measure of the ability of a magnetic circuit to conduct magnetic flux; the reciprocal of reluctance. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "permittivity Abbr": {
    "term": "permittivity Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u03b5 A measure of the ability of a material to resist the formation of an electric field within it. Also called dielectric constant, relative permittivity. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "personal monitors Headphones": {
    "term": "personal monitors Headphones",
    "cat": "Pro Audio Reference",
    "def": "A special earpiece or earplug containing high quality miniature loudspeaker systems, similar to hearing aids, used for on-stage and recording studio purposes in lieu of traditional floor foldback monitors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PET (protective": {
    "term": "PET (protective",
    "cat": "Pro Audio Reference",
    "def": "earth terminal) Terminal connected to conductive parts of Class I equipment for safety purposes. This terminal is intended to be connected to an external earthing system by a PEC (protective earth conductor).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peta- Prefix": {
    "term": "peta- Prefix",
    "cat": "Pro Audio Reference",
    "def": "for one quadrillion (1015), abbreviated P.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "petabyte": {
    "term": "petabyte",
    "cat": "Pro Audio Reference",
    "def": "A unit of information or computer storage equal to one quadrillion bytes, or 1024 terabytes. It is commonly abbreviated PB, when used with byte multiples (however should be peti-), the prefix may indicate a power of either 10005 or 10245, so the exact number may be either: 1015or 250.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peti- Symbol": {
    "term": "peti- Symbol",
    "cat": "Pro Audio Reference",
    "def": "Pi New term standardized by the IEC (IEC 60027-2) to represent binary multiples of 10245. It differentiates between decimal and binary multipliers. The abbreviation, PB, should not be used for binary numbers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PFC (power-factor-corrected)": {
    "term": "PFC (power-factor-corrected)",
    "cat": "Pro Audio Reference",
    "def": "See power-factor-corrected.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PFL (pre-fade listen)": {
    "term": "PFL (pre-fade listen)",
    "cat": "Pro Audio Reference",
    "def": "A term used on recording consoles and mixers, referring to a signal taken before the main channel fader. The significance is this signal is not affected by the fader position. Normally used to monitor (via headphones) to an individual input (or a small group of inputs) without affecting the main outputs, particularly useful in that it allows listening to an input with its fader all the way down (off). In broadcast this function is often called cueing, while recording or live-sound users may also refer to it as soloing. Compare with AFL and APL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phantom power": {
    "term": "phantom power",
    "cat": "Pro Audio Reference",
    "def": "Invented by Georg Neumann in 1966, the term given to the standardized scheme of providing power supply voltage to certain microphones using the same two lines as the balanced audio path. The international standard is IEC 60268-15, derived from the original German standard DIN 45 596. It specifies three DC voltage levels of 48 volts, 24 volts and 12 volts, delivered through 6.8k ohms, 1.2k ohms, and 680 ohms matched resistors respectively, capable of delivering 10-15 mA. The design calls for both signal conductors to have the same DC potential. This allows the use of microphone connections either for microphones without built-in preamps, such as dynamic types, or for microphones with built-in preamps such as condenser and electret types.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Why 48 volts": {
    "term": "Why 48 volts",
    "cat": "Pro Audio Reference",
    "def": "is an interesting question. The answer is three-fold: 1) 48 volts is an exact multiple of the 1.5 volt battery cell; 2) 48 volts has been the telephone communication standard since before 1900; and 3) both of these combine to give the background to the explanation direct from J\u00fcrgen Breitlow and Stephen Peus at Neumann:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "\u201cIn 1966,": {
    "term": "\u201cIn 1966,",
    "cat": "Pro Audio Reference",
    "def": "a Neumann engineer presented the latest developments in the field of studio microphones at Norwegian Radio and Television in Oslo. The first transistorized condenser microphones were shown at that time, together with the well-known tube microphones.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "For compatibility": {
    "term": "For compatibility",
    "cat": "Pro Audio Reference",
    "def": "reasons, Norwegian Radio wanted the transistor microphones to be supplied with a phantom powering system. Due to the limited amount of daylight available there in winter, an auxiliary lighting system was installed in the studios \u2014 fed from a central 48 V supply. This voltage would also be used for phantom powering the microphones.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "So": {
    "term": "So",
    "cat": "Terminology",
    "def": "the 48 volt phantom powering system, which was later standardized in DIN 45 596, came into existence.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase Audio signals": {
    "term": "phase Audio signals",
    "cat": "Pro Audio Reference",
    "def": "are complex AC (alternating current) periodic phenomena expressed mathematically as phasors, or vectors. Phase refers to a particular value of t (time) for any periodic function, i.e. it is the relationship between a reference point and the fractional part of the period through which the signal has advanced relative to an arbitrary origin. [The origin is usually taken at the last previous passage through zero from the negative to the positive direction \u2014 IEEE.] See Georgia State University\u2019s great website HyperPhysics for more detail.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase cancellation": {
    "term": "phase cancellation",
    "cat": "Pro Audio Reference",
    "def": "When two signals have the same exact time relationship to each other, they are said to be \u201cin-phase;\u201d if they do not, they are said to be \u201cout-of-phase.\u201d (Compare with polarity) If two out-of-phase signals add together, since this is vector arithmetic (see phasor), they will, in fact, subtract from one another. This is called phase cancellation. Another type of phase cancellation occurs when water waves interact. One wave\u2019s energy becomes stronger when two waves collide in-phase (summing) and becomes weaker when they collide out-of-phase (cancelling).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase delay": {
    "term": "phase delay",
    "cat": "Pro Audio Reference",
    "def": "A phase-shifted sine wave appears displaced in time from the input waveform. This displacement is called phase delay and is usually constant for all frequencies of interest. Used as another name for group delay; however there are instances where they are not the same, for example systems exhibiting ripple in their phase vs. frequency characteristics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase lag": {
    "term": "phase lag",
    "cat": "Pro Audio Reference",
    "def": "and phase lead Phase shift caused by reactive elements (capacitors and inductors) that either subtracts (lag) or adds (lead) degrees of shift. See the RaneNote Linkwitz-Riley Crossovers: A Primer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase linear 1": {
    "term": "phase linear 1",
    "cat": "Pro Audio Reference",
    "def": "Chiefly a European phrase meaning \u201clinear phase.\u201d Any system which accurately preserves phase relationships between frequencies, i.e., that exhibits pure delay. See group delay. 2. Consumer hi-fi company where the Rane owners worked before starting Rane Corporation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase lock loop Abbr": {
    "term": "phase lock loop Abbr",
    "cat": "Pro Audio Reference",
    "def": "PLL A circuit for synchronizing a variable local oscillator with the phase of a transmitted signal. The circuit acts as a phase detector by comparing the frequency of a known oscillator with an incoming signal and then feeds back the output of the detector to keep the oscillator in phase with the incoming frequency. Commonly used for bit-synchronization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase plug": {
    "term": "phase plug",
    "cat": "Loudspeakers",
    "def": "A device and technique that extends high frequency response by preventing cancellation of high frequency waves. Many designs exist. See Cliff Henricksen\u2019s AES paper: \u201cPhase Plug Modelling and Analysis: Circumferential Versus Radial Types\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phaser": {
    "term": "phaser",
    "cat": "Pro Audio Reference",
    "def": "Also called a \u201cphase shifter,\u201d this is an electronic device creating an effect similar to flanging, but not as pronounced. Based on phase shift (frequency dependent), rather than true signal delay (frequency independent), the phaser is much easier and cheaper to construct. Using a relatively simple narrow notch filter (all-pass filters also were used) and sweeping it up and down through some frequency range, then summing this output with the original input, creates the desired effect. Narrow notch filters are characterized by having sudden and extreme phase shifts just before and just after the deep notch. This generates the needed phase shifts for the ever-changing magnitude cancellations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase shift": {
    "term": "phase shift",
    "cat": "Pro Audio Reference",
    "def": "The fraction of a complete cycle elapsed as measured from a specified reference point and expressed as an angle. See the RaneNote Exposing Equalizer Mythology. Also see discussion of phase shift vs. inversion at polarity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phasor 1": {
    "term": "phasor 1",
    "cat": "Pro Audio Reference",
    "def": "A complex number expressing the magnitude and phase of a time-varying quantity. It is math shorthand for complex numbers. Unless otherwise specified, it is used only within the context of steady-state alternating linear systems. [Example: 1.5 /27\u00b0 is a phasor representing a vector with a magnitude of 1.5 and a phase angle of 27 degrees.] 2. For some unknown reason, used a lot by Star Fleet personnel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phat, phatter,": {
    "term": "phat, phatter,",
    "cat": "Pro Audio Reference",
    "def": "phattest Slang Excellent; first-rate: phat fashion; a phat rapper. [Earlier, sexy (said of a woman), of unknown origin.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phi Symbol \u03a6 Mathematics": {
    "term": "phi Symbol \u03a6 Mathematics",
    "cat": "Pro Audio Reference",
    "def": "The symbol for the \u201cGolden Rectangle\u201d or \u201cGolden Ratio.\u201d It is a never-ending, never-repeating number found by calculating this formula:",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "See Livio for all": {
    "term": "See Livio for all",
    "cat": "Pro Audio Reference",
    "def": "the fascinating details of this most intriguing number.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phlogiston": {
    "term": "phlogiston",
    "cat": "Pro Audio Reference",
    "def": "A hypothetical substance formerly thought to be a volatile constituent of all combustible substances released as flame in combustion. [AHD] See smoke.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Phoenix-blocks (or": {
    "term": "Phoenix-blocks (or",
    "cat": "Pro Audio Reference",
    "def": "-connectors or -strips) A term, becoming generic, meaning disconnectable, or plugable terminal blocks, after Phoenix Contact connector company, although dozens of companies make them. Also called Euroblocks. See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phon": {
    "term": "phon",
    "cat": "Pro Audio Reference",
    "def": "A unit of apparent loudness, equal in number to the intensity in decibels of a 1,000 Hz tone judged to be as loud as the sound being measured.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonautogram or phonautograph": {
    "term": "phonautogram or phonautograph",
    "cat": "Pro Audio Reference",
    "def": "An apparatus for automatically recording sound vibrations in the form of a tracing on a revolving cylinder. [OED]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phone jack": {
    "term": "phone jack",
    "cat": "Pro Audio Reference",
    "def": "Same as 1/4\u2033 TRS, see connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phoneme": {
    "term": "phoneme",
    "cat": "Pro Audio Reference",
    "def": "The smallest phonetic unit in a language that is capable of conveying a distinction in meaning, as the m of mat and the b of bat in English. [AHD] Phonemes consist of the vowels and consonants that make up English words.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonetic Representing": {
    "term": "phonetic Representing",
    "cat": "Pro Audio Reference",
    "def": "the sounds of speech with a set of distinct symbols, each designating a single sound: phonetic spelling.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonetics": {
    "term": "phonetics",
    "cat": "Pro Audio Reference",
    "def": "The branch of linguistics that deals with the sounds of speech and their production, combination, description, and representation by written symbols. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonograph 1": {
    "term": "phonograph 1",
    "cat": "Pro Audio Reference",
    "def": "Literally means \u201cwriting sound\u201d, a term coined from Greek roots. 2. A machine that reproduces sound by means of a stylus in contact with a grooved rotating disk. [AHD] 3. \u201cAn irritating toy that restores life to dead noises.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonograph cartridge": {
    "term": "phonograph cartridge",
    "cat": "Pro Audio Reference",
    "def": "See pickup.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonography": {
    "term": "phonography",
    "cat": "Music",
    "def": "Literally \u201csound-writing,\u201d this term refers to field audio recordings used in music compositions. Speech. 1. The science or practice of transcribing speech by means of symbols representing elements of sound; phonetic transcription. 2. A system of shorthand based on phonetic transcription. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phono jack": {
    "term": "phono jack",
    "cat": "Pro Audio Reference",
    "def": "Same as RCA, see connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonology 1": {
    "term": "phonology 1",
    "cat": "Pro Audio Reference",
    "def": "The study of speech sounds in language or a language with reference to their distribution and patterning and to tacit rules governing pronunciation. 2. The sound system of a language: the phonology of English. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonon": {
    "term": "phonon",
    "cat": "Pro Audio Reference",
    "def": "The quantum of acoustic or vibrational energy, considered a discrete particle and used especially in mathematical models to calculate thermal and vibrational properties of solids. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonon laser": {
    "term": "phonon laser",
    "cat": "Pro Audio Reference",
    "def": "A nanoscale laser-like device that uses sound waves instead of light, i.e., it uses phonons, so it could rightly use the acronym \u201cphaser\u201d for phonon amplification by stimulated emission of radiation\u2014not to be confused with the other phaser.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PHY Abbreviation": {
    "term": "PHY Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for physical and pertaining to the physical layer of the OSI Model.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "physics Some": {
    "term": "physics Some",
    "cat": "Pro Audio Reference",
    "def": "claim that studying physics is all you need for a complete education \u2014 after a visit to HyperPhysics you may agree.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pi": {
    "term": "pi",
    "cat": "Terminology",
    "def": "Symbol \u03c0 (Greek lower-case pi) 1. Mathematics. A transcendental number, approximately 3.14159, represented by the Greek lower-case pi symbol, that expresses the ratio of the circumference to the diameter of a circle and appears as a constant in many mathematical expressions. [AHD] 2. Filters. Equal to 180 degrees or integral multiples thereof. (Why chose pi as the letter to represent the number 3.141592\u2026? Because the letter pi in Greek is like our letter p, as in perimeter (or circumference).) See: Beckmann for in-depth history. For the most enjoyable anti-pi rant see Vi Hart.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PI": {
    "term": "PI",
    "cat": "Terminology",
    "def": "14 See Pseudoacoustic Infector.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "piano": {
    "term": "piano",
    "cat": "Pro Audio Reference",
    "def": "A musical instrument with a manual keyboard actuating hammers that strike wire strings, producing sounds that may be softened or sustained by means of pedals. [AHD] Italian Bartolomeo Cristofori invented the first hammer-operated piano in 1700.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pianoforte Original": {
    "term": "pianoforte Original",
    "cat": "Pro Audio Reference",
    "def": "Italian-derived name for the musical instrument now shorte <truncated 2280748 bytes>",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "q (lower-case)": {
    "term": "q (lower-case)",
    "cat": "Physics",
    "def": "The symbol for charge.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Q (upper-case) Quality factor.": {
    "term": "Q (upper-case) Quality factor.",
    "cat": "Filters",
    "def": "The selectivity factor defined to be the ratio of the center frequency f divided by the bandwidth BW. See the RaneNote Constant-Q Graphic Equalizers; also download \u201cBandwidth vs. Q Calculator\u201d as a zipped Microsoft Excel spreadsheet in the Rane Library.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Q-8 RCA\u2019s": {
    "term": "Q-8 RCA\u2019s",
    "cat": "Pro Audio Reference",
    "def": "name for their 4-channel, eight-track tape cartridges, the world\u2019s first (and last).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qanbus Musical Instrument": {
    "term": "qanbus Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A short-necked fretless flute indigenous to Yemen.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qanoun Musical Instruments": {
    "term": "qanoun Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "Arabic dulcimer. Contrast with: Quanoon.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qawwali": {
    "term": "qawwali",
    "cat": "Pro Audio Reference",
    "def": "A style of Muslim devotional music, associated particularly with Sufis in Pakistan, characterized by a fervent, often improvisatory vocal delivery and with an accompanying rhythm articulated on drums and harmonium; a song in this style. [OED]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QD": {
    "term": "QD",
    "cat": "Terminology",
    "def": "LED See: QLED.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QED (quod erat demonstrandum) Latin.": {
    "term": "QED (quod erat demonstrandum) Latin.",
    "cat": "Mathematics",
    "def": "Literally, \u201cwhich was to be demonstrated.\u201d Used to connote the end of a mathematical proof.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Qi": {
    "term": "Qi",
    "cat": "Terminology",
    "def": "(pronounced \u201cchee\u201d) From Asian philosophy, meaning \u201cvital energy.\u201d The name adopted for a standard universal battery charging system for mobile devices whereby any Qi-compatible device or adapter can be charged with any Qi-compatible charging pad.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qin": {
    "term": "qin",
    "cat": "Pro Audio Reference",
    "def": "also guqin A Chinese musical instrument dating from 1000 BC similar to a zither; common name for most Chinese stringed instruments. Also Qin dynasty. See yangqin.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qix Online": {
    "term": "qix Online",
    "cat": "Pro Audio Reference",
    "def": "jargon shorthand for \u201cquick.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QLED (quantum-dot LED)": {
    "term": "QLED (quantum-dot LED)",
    "cat": "Pro Audio Reference",
    "def": "also seen as QD LED. Latest LED technology based on quantum dot semiconductor nanocrystals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QoS (quality": {
    "term": "QoS (quality",
    "cat": "Pro Audio Reference",
    "def": "of service) Today\u2019s usage: \u201cQuality of service is the ability to provide different priority to different applications, users, or data flows, or to guarantee a certain level of performance to a data flow.\u201d [From Wikipedia; hit link.] Original usage: 1. The performance specification of a communications channel or system. It may be quantitatively indicated by channel or system performance parameters, such as signal-to-noise ratio (S/N), bit error ratio (BER), message throughput rate, and call blocking probability. 2. A subjective rating of telephone communications quality in which listeners judge transmissions by qualifiers, such as excellent, good, fair, poor, or unsatisfactory. [From Federal Standard 1037C].",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QR": {
    "term": "QR",
    "cat": "Terminology",
    "def": "code (Quick Response code) A matrix barcode readable by devices with cameras, i.e., smart phones, tablets, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QRD (quadratic": {
    "term": "QRD (quadratic",
    "cat": "Pro Audio Reference",
    "def": "residue diffusor) Another name for a Schroeder diffusor. Hit the link for more details and also see: diffusers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QS": {
    "term": "QS",
    "cat": "Terminology",
    "def": "Sansui\u2019s name for their quadraphonic sound system using a proprietary matrixing algorithm for encoding four-channel sound down to two-channels. Compare with SQ.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QSound": {
    "term": "QSound",
    "cat": "Pro Audio Reference",
    "def": "The name of a Canadian company and its proprietary and patented 3D sound technology. Designed for two channel playback systems, QSound finds success in the computer and arcade game markets, as well as movie theaters. Using advanced signal processing techniques, QSound adds localization cues to the original material. Since loudspeakers and headphones create quite different playback environments, different algorithms exist for each. QSound allows the music producer to locate specific sound events in virtual positions outside the physical locations of the two loudspeakers. The effect is primarily one of widening the sound field. QSound works best when the listener is positioned in the sweet spot located equidistant between the speakers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QT": {
    "term": "QT",
    "cat": "Terminology",
    "def": "The state of being secret or confidential: told me the story on the QT. [AHD] Also online jargon shorthand for \u201ccutie.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QTC (quantum": {
    "term": "QTC (quantum",
    "cat": "Pro Audio Reference",
    "def": "tunnelling composite) Pressure sensors based on quantum physics. Finding use in touchscreens, among other applications.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QTR Abbreviation": {
    "term": "QTR Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for quarter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QTY Abbreviation": {
    "term": "QTY Abbreviation",
    "cat": "Pro Audio Reference",
    "def": "for quantity.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quackery": {
    "term": "quackery",
    "cat": "Pro Audio Reference",
    "def": "The statement floating about cyberspace that a duck\u2019s quack does not echo and no one knows why. See Salford Acoustics Experiment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Quad 8": {
    "term": "Quad 8",
    "cat": "Pro Audio Reference",
    "def": "See: Q-8.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quad flat pack": {
    "term": "quad flat pack",
    "cat": "Pro Audio Reference",
    "def": "The most commonly used package in surface mount technology to achieve a high lead count in a small area. Leads are brought out on all four sides of a thin square package.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadlet": {
    "term": "quadlet",
    "cat": "Computers",
    "def": "Four bytes (32 bits) of data. [IEEE]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quad mic": {
    "term": "quad mic",
    "cat": "Pro Audio Reference",
    "def": "cable See: cables.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadraphonic sound Coined in": {
    "term": "quadraphonic sound Coined in",
    "cat": "Pro Audio Reference",
    "def": "the \u201970s, the original term for surround sound.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadratic equation Mathematics": {
    "term": "quadratic equation Mathematics",
    "cat": "Pro Audio Reference",
    "def": "An equation in which one or more of the terms is squared but raised to no higher power, having the general form ax\u00b2 + bx + c = 0, where a, b, and c are constants. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadratic residue diffuser": {
    "term": "quadratic residue diffuser",
    "cat": "Pro Audio Reference",
    "def": "A type of Schroeder diffuser consisting of a plane surface with an array of parallel slots all the same width but with varying depths based on a prime number mathematical sequence.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadrature": {
    "term": "quadrature",
    "cat": "Pro Audio Reference",
    "def": "A state of separation or relationship equal to 90\u00b0. For example, two same frequency sine waves one-quarter wavelength apart are in quadrature. A phase difference equal to one-fourth of a period.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadruple-play network": {
    "term": "quadruple-play network",
    "cat": "Pro Audio Reference",
    "def": "A network offering mobility in addition to audio, video and data.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quadrupole sound source": {
    "term": "quadrupole sound source",
    "cat": "Acoustics",
    "def": "Quadrupole is defined as a multipole of order two, therefore two opposite dipoles make up a quadrupole source.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quaff To": {
    "term": "quaff To",
    "cat": "Pro Audio Reference",
    "def": "drink (a beverage) heartily: quaffed the ale with gusto. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quale (plural form: qualia)": {
    "term": "quale (plural form: qualia)",
    "cat": "Pro Audio Reference",
    "def": "A property, such as whiteness, considered independently from things having the property. [AHD] \u201cExamples of qualia include the pain of a headache, the taste of wine, or the perceived redness of an evening sky.\u201d [from link]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quality factor": {
    "term": "quality factor",
    "cat": "Pro Audio Reference",
    "def": "See Q.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Quanoon Musical Instruments": {
    "term": "Quanoon Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "Egyptian dulcimer. Contrast with: Qanoun.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quant Slang": {
    "term": "quant Slang",
    "cat": "Pro Audio Reference",
    "def": "An expert in the use of mathematics and related subjects, particularly in investment management and stock trading. [Probably short for quantitative.] [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantal": {
    "term": "quantal",
    "cat": "Physics",
    "def": "1. Of or relating to quanta, quantum mechanics, or a quantized system. 2. Existing in only one of two possible states. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantic": {
    "term": "quantic",
    "cat": "Mathematics",
    "def": "A homogeneous polynomial having two or more variables. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantization distortion": {
    "term": "quantization distortion",
    "cat": "Pro Audio Reference",
    "def": "Same as quantization error below.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantization error": {
    "term": "quantization error",
    "cat": "Pro Audio Reference",
    "def": "Error resulting from quantizing an analog waveform to a discrete level. It is the difference between the actual value of the analog signal at the sampling instant and the nearest quantization value. Therefore, in general, the longer the word length, the less the error, because there are more step sizes to choose the closest. See also SQNR and the RaneNote Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantization": {
    "term": "quantization",
    "cat": "Pro Audio Reference",
    "def": "The process of converting, or digitizing, the almost infinitely variable amplitude of an analog waveform to one of a finite series of discrete levels. Performed by the A/D converter. See also SQNR and the RaneNote Digital Dharma of Audio A/D Converters. [The name derives from quantum physics, where electrons orbit an atom\u2019s nucleus at fixed distances and are never found in-between.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Quantizer\u2122 Trademark of M.I.T": {
    "term": "Quantizer\u2122 Trademark of M.I.T",
    "cat": "Pro Audio Reference",
    "def": "for the work conceived and developed by Juliana Cherston and Ewan Hill that converts high energy physics data from the ATLAS/CERN project into real-time audio. Details here.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantum": {
    "term": "quantum",
    "cat": "Physics",
    "def": "The smallest amount of a physical quantity that can exist independently, especially a discrete quantity of electromagnetic radiation. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantum dot": {
    "term": "quantum dot",
    "cat": "Pro Audio Reference",
    "def": "A confined and isolated atom such that the removal or addition of a single electron can be detected, i.e., its properties change in a detectable manner \u2014 the ultimate memory cell. In nanotechnology, they are called quantum bits or qubits.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantum entanglement": {
    "term": "quantum entanglement",
    "cat": "Physics",
    "def": "Einstein called entanglement \u201cspooky action at a distance.\u201d Hit the link for a clear simple explanation.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantum microphone": {
    "term": "quantum microphone",
    "cat": "Pro Audio Reference",
    "def": "A new technology for detecting \u201c\u2026 sound at the level of quietness of quantum mechanics.\u201d Developed by scientists at Chalmers University of Technology in Sweden and is based on a single-electron transistor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantum noise": {
    "term": "quantum noise",
    "cat": "Physics",
    "def": "Any noise attributable to the discrete nature of electromagnetic radiation. Shot noise is one example.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quantum tunneling": {
    "term": "quantum tunneling",
    "cat": "Pro Audio Reference",
    "def": "composite See: QTC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quartan Occurring": {
    "term": "quartan Occurring",
    "cat": "Pro Audio Reference",
    "def": "every fourth day, counting inclusively, or every 72 hours. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quartern One": {
    "term": "quartern One",
    "cat": "Pro Audio Reference",
    "def": "fourth of something, especially of some weights and measures. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quarter-inch jack": {
    "term": "quarter-inch jack",
    "cat": "Pro Audio Reference",
    "def": "Same as 1/4\u2033 TRS or 1/4\u2033 TS, see connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quarter-note": {
    "term": "quarter-note",
    "cat": "Music",
    "def": "A note having one-fourth the time value of a whole note.[AHD] In most popular music, the quarter-note is the value equal to one beat. Also called crotchet (chiefly British).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quarter-track stereo": {
    "term": "quarter-track stereo",
    "cat": "Recording",
    "def": "An analog recording head arrangement that allows recording two tracks in one direction and another two tracks in the opposite direction. The name comes from each track and guard band using one quarter of the tape width.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quartet Mathematics of computing": {
    "term": "quartet Mathematics of computing",
    "cat": "Pro Audio Reference",
    "def": "1. A group of four adjacent digits operated upon as a unit. 2. A byte composed of four bits, i.e., a nibble. Music. 1. A composition for four voices or four instruments. 2. A group of four singers or four instrumentalists. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quartic": {
    "term": "quartic",
    "cat": "Mathematics",
    "def": "Of or relating to the fourth degree. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quartile Statistics": {
    "term": "quartile Statistics",
    "cat": "Pro Audio Reference",
    "def": "The value of the boundary at the 25th, 50th, or 75th percentiles of a frequency distribution divided into four parts, each containing a quarter of the population. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quartz crystals": {
    "term": "quartz crystals",
    "cat": "Electronics",
    "def": "A small crystal of quartz accurately cut along certain axes so that it can be vibrated at a particular frequency, used for its piezoelectric properties to produce an electric signal of constant known frequency. [AHD] See piezo.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quasi- To": {
    "term": "quasi- To",
    "cat": "Pro Audio Reference",
    "def": "some degree; in some manner: quasi-stellar object. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quasi-balanced line": {
    "term": "quasi-balanced line",
    "cat": "Pro Audio Reference",
    "def": "See floating unbalanced line.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quasi-parametric See": {
    "term": "quasi-parametric See",
    "cat": "Pro Audio Reference",
    "def": "parametric equalizer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quasi-peak detector": {
    "term": "quasi-peak detector",
    "cat": "Electronics",
    "def": "A detector having specified electrical time constants that, when regularly repeated pulses of constant amplitude are applied to it, delivers an output voltage that is a fraction of the peak value of the pulses, the fraction increasing toward unity as the pulse repetition rate is increased. [IEEE] In other words, a peak detector with a long time constant.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quaternary": {
    "term": "quaternary",
    "cat": "Pro Audio Reference",
    "def": "The word that comes after primary, secondary, tertiary.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quatrain": {
    "term": "quatrain",
    "cat": "Pro Audio Reference",
    "def": "A stanza or poem of four lines. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quatro (also": {
    "term": "quatro (also",
    "cat": "Pro Audio Reference",
    "def": "seen as cuatro) Musical Instrument. A stringed Latin American instrument found in the guitar family.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quattuordecillion 1": {
    "term": "quattuordecillion 1",
    "cat": "Pro Audio Reference",
    "def": "The cardinal number: 1045. 2. Chiefly British The cardinal number equal to 1084. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qubits See": {
    "term": "qubits See",
    "cat": "Pro Audio Reference",
    "def": "quantum dot above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "qubyte": {
    "term": "qubyte",
    "cat": "Pro Audio Reference",
    "def": "A sequence of eight quantum bits operated on as a unit by a computer. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Queen, Daniel": {
    "term": "Queen, Daniel",
    "cat": "Pro Audio Reference",
    "def": "(1934-2002) Long-time Standards Manager for the AES, Daniel had a full and productive audio career including his successful consulting company, Daniel Queen Associates, specializing in electroacoustics, architectural acoustics, and noise control. He joined the AES in 1962 and became a fellow in 1970.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quena": {
    "term": "quena",
    "cat": "Pro Audio Reference",
    "def": "also called a kena Musical Instrument. A shepard\u2019s pipe, or flute) without a mouthpiece. [Note: a large quena is called a quenacho.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "queueing": {
    "term": "queueing",
    "cat": "Pro Audio Reference",
    "def": "The only eight letter English word with five vowels in a row.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quiescent Being": {
    "term": "quiescent Being",
    "cat": "Pro Audio Reference",
    "def": "quiet, still, or at rest; inactive. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quiescent noise": {
    "term": "quiescent noise",
    "cat": "Pro Audio Reference",
    "def": "Another name for a product\u2019s residual noise or noise floor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quietest place": {
    "term": "quietest place",
    "cat": "Pro Audio Reference",
    "def": "Microsoft Corporation\u2019s anechoic chamber; certified by Guinness World Record organization. Record formally held by Orfield Laboratories in Minneapolis.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quieting sensitivity FM": {
    "term": "quieting sensitivity FM",
    "cat": "Radio",
    "def": "(Also called IHF Sensitivity.) In simple terms it is the minimum input signal required to provide a distortion-free listenable output signal. In technical terms, it is \u201cthe minimum unmodulated signal input for which the output signal-to-noise ratio does not exceed a specified limit, under specified conditions.\u201d [IEEE] This test was standardized in 1958 by the IHF (Institute of High Fidelity) to mean the unmodulated carrier amplitude measured in microvolts (rms) required for a specific dB reduction in output noise over the output noise present with no-signal. A typical specification might read: 0.5 microvolts for 20-dB quieting. Also measured in femtowatts (dBf).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quinary": {
    "term": "quinary",
    "cat": "Pro Audio Reference",
    "def": "The word that comes after primary, secondary, tertiary, quaternary.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quinate Arranged": {
    "term": "quinate Arranged",
    "cat": "Pro Audio Reference",
    "def": "in groups of five.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Quinnipiac (pronounced KWIN-uh-pe-ack)": {
    "term": "Quinnipiac (pronounced KWIN-uh-pe-ack)",
    "cat": "Pro Audio Reference",
    "def": "A private, coeducational, nonsectarian university located in Hamden, CT, featuring a fully digital high-definition broadcast studio.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quint": {
    "term": "quint",
    "cat": "Music",
    "def": "Name for an interval of a fifth.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quintal": {
    "term": "quintal",
    "cat": "Pro Audio Reference",
    "def": "A unit of mass in the metric system equal to 100 kilograms. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quintephone Musical Instruments": {
    "term": "quintephone Musical Instruments",
    "cat": "Pro Audio Reference",
    "def": "A musical instrument that generates sound \u201cinformatically,\u201d i.e., using information science and technology. For example, synthesizers are a subset of quintephones.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quintet": {
    "term": "quintet",
    "cat": "Music",
    "def": "1. A composition for five voices or five instruments. 2. A group of five singers or five instrumentalists.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quintessence In": {
    "term": "quintessence In",
    "cat": "Pro Audio Reference",
    "def": "ancient and medieval philosophy, the fifth and highest essence after the four elements of earth, air, fire, and water, thought to be the substance of the heavenly bodies and latent in all things. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quinticlave Musical Instrument": {
    "term": "quinticlave Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A French brass instrument created in the 19th century by Jean Hilaire Ast\u00e9. It is the alto size of the ophicleide family.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quinton Musical Instrument": {
    "term": "quinton Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A 17th-centruy treble viol. Also, an 18th-century five-stringed hybrid between the viol and violin families. [OED]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quintophonic sound": {
    "term": "quintophonic sound",
    "cat": "Pro Audio Reference",
    "def": "(also seen as quintaphonic sound) The name of the 5-channel discrete surround system developed by John Mosely for The Who\u2019s rock opera, Tommy, production. The forerunner of 5.1 surround systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quire": {
    "term": "quire",
    "cat": "Pro Audio Reference",
    "def": "A set of 25 sheets of paper of the same size and stock; 1/20 of a ream. [Originally 24 sheets, but now 25.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "Quirini, Klaus": {
    "term": "Quirini, Klaus",
    "cat": "Pro Audio Reference",
    "def": "See: discotheque",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quitiplas Musical Instrument": {
    "term": "quitiplas Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A Venezuelan bamboo instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quodlibet": {
    "term": "quodlibet",
    "cat": "Music",
    "def": "A usually humorous medley. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quother Speech": {
    "term": "quother Speech",
    "cat": "Pro Audio Reference",
    "def": "To talk in a low and confidential tone. [Kacirk]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "quotient": {
    "term": "quotient",
    "cat": "Mathematics",
    "def": "The number obtained by dividing one quantity by another. In 45 \u00f7 3 = 15, 15 is the quotient. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "QWERTY Nickname for": {
    "term": "QWERTY Nickname for",
    "cat": "Pro Audio Reference",
    "def": "the computer (or typewriter) keyboard derived from the left side, top row of letter keys.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (Q)"
  },
  "rackett Musical Instrument": {
    "term": "rackett Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "Western Europe oboe.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rack unit": {
    "term": "rack unit",
    "cat": "Pro Audio Reference",
    "def": "See \u201cU\u201c",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radar (radio detecting and ranging) 1": {
    "term": "radar (radio detecting and ranging) 1",
    "cat": "Pro Audio Reference",
    "def": "A method of detecting distant objects and determining their position, velocity, or other characteristics by analysis of very high frequency radio waves reflected from their surfaces. 2. The equipment used in such detection. [AHD] Compare with sonar and sodar.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radian 1.": {
    "term": "radian 1.",
    "cat": "Mathematics",
    "def": "A unit of angular measure equal to the angle subtended at the center of a circle by an arc equal in length to the radius of the circle, approximately 57\u00b017\u201944.6 [AHD] 2. Filters. Frequency is measured in radians/second. One cycle (360\u00b0) equals 2\u03c0 (pi) radians.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radiation error": {
    "term": "radiation error",
    "cat": "Loudspeakers",
    "def": "All inclusive term describing the total lobing and cancellation error occurring in a loudspeaker response due to crossover and multiple driver effects. An ideal crossover applied between two sources would exhibit no lobing error and no cancellations off axis. [Coined by Justin Baird and David McGrath, Lake Technology, in their paper \u201cPractical Application of Linear Phase Crossovers with Transition Bands Approaching a Brick Wall Response for Optimal Loudspeaker Frequency, Impulse and Polar Response,\u201d presented at the 115th Convention of the Audio Engineering Society, New York, NY October 10-13, 2003, Preprint 5885.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radicalism \u201cThe": {
    "term": "radicalism \u201cThe",
    "cat": "Pro Audio Reference",
    "def": "conservatism of tomorrow injected into the affairs of today.\u201d \u2014 Ambrose Bierce.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radio": {
    "term": "radio",
    "cat": "Pro Audio Reference",
    "def": "The wireless transmission through space of electromagnetic waves in the approximate frequency range from 10 kilohertz to 300,000 megahertz. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radio button": {
    "term": "radio button",
    "cat": "Pro Audio Reference",
    "def": "A graphical user interface style based on old automobile analog radio designs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radio history Go to American Radio": {
    "term": "radio history Go to American Radio",
    "cat": "History",
    "def": "[An incredible resource.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Radiolab Broadcast": {
    "term": "Radiolab Broadcast",
    "cat": "Pro Audio Reference",
    "def": "Popular public radio program that describes itself this way: \u201cRadiolab believes your ears are a portal to another world. Where sound illuminates ideas, and the boundaries blur between science, philosophy, and human experience. Big questions are investigated, tinkered with, and encouraged to grow. Bring your curiosity, and we\u2019ll feed it with possibility.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radix": {
    "term": "radix",
    "cat": "Mathematics",
    "def": "The number base, such as 2 in the binary system and 10 in the decimal system. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "radix point": {
    "term": "radix point",
    "cat": "Pro Audio Reference",
    "def": "The binary equivalent of the decimal point \u2014 think of it as a \u201cbinary point.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Ragone chart": {
    "term": "Ragone chart",
    "cat": "Pro Audio Reference",
    "def": "A useful way to compare such things as batteries, this chart plots storage device energy density versus power density on a log-log graph with discharge times represented as diagonal lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RAID (Redundant": {
    "term": "RAID (Redundant",
    "cat": "Pro Audio Reference",
    "def": "Array of Independent Disks) [Originally: Redundant Array of Inexpensive Disks] A technology providing greater storage functions and reliability using redundancy. Hit the link for details. Finding its way into pro audio studio use by such companies as Glyph\u2019s Portagig 62.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rail-switcher": {
    "term": "rail-switcher",
    "cat": "Pro Audio Reference",
    "def": "A term used to describe audio power amplifier designs utilizing more than one power supply for the output, and a means of switching between them based upon the input signal. This scheme improves efficiency. See Class G Amplifiers and compare with tracking power amplifiers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rail-to-rail\u00ae Registered": {
    "term": "rail-to-rail\u00ae Registered",
    "cat": "Pro Audio Reference",
    "def": "trademark of Nippon Motorola, Ltd. for their op amp designs having maximum input and output levels equal to the power supply voltages. See RRIO.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rainstick Musical Instrument": {
    "term": "rainstick Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "English translation for the original Chilean instrument called palo de lluvia.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "raised cosine filter": {
    "term": "raised cosine filter",
    "cat": "Pro Audio Reference",
    "def": "A low-pass filter found most often in data communication systems. A perfect raised cosine filter is characterized by a frequency response that is symmetrical about 0 Hz, with a flat low frequency passband, then a smooth rolloff following a cosine curve to zero through the transition region and staying at zero (infinite attenuation) throughout the stopband. The response of real world filters (usually DSP FIR designs) approximate this response, with the most noticeable deviation being ripple in the transition region, limiting attenuation to, say, 70 dB, or so, depending on the number of filter taps used. The first known use of this technology in pro audio occurred with a proprietary filter based on raised cosine design used in the Lake Contour\u2122 system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RAM (random access memory)": {
    "term": "RAM (random access memory)",
    "cat": "Pro Audio Reference",
    "def": "A memory device in which data may be read out and new data written into any address or location.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Ramone, Phil": {
    "term": "Ramone, Phil",
    "cat": "Pro Audio Reference",
    "def": "(1934-2013) Famous American record producer and recording engineer, who worked with the biggest stars.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Randall, Don": {
    "term": "Randall, Don",
    "cat": "Pro Audio Reference",
    "def": "(1917-2008) American entrepreneur who cofounded Fender in 1946 along with Leo Fender. Beginning in the 1970s he started his own company using the Randall brand.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RaneNotes": {
    "term": "RaneNotes",
    "cat": "Pro Audio Reference",
    "def": "A series of technical notes written by Rane\u2019s technical staff.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RaneWare\u00ae": {
    "term": "RaneWare\u00ae",
    "cat": "Pro Audio Reference",
    "def": "A registered trademark of Rane Corporation used to identify Rane RW 232 software products \u2014 not something to keep you dry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Rankine scale": {
    "term": "Rankine scale",
    "cat": "Pro Audio Reference",
    "def": "A scale of absolute temperature using degrees the same size as those of the Fahrenheit scale, in which the freezing point of water is 491.69\u00b0 and the boiling point of water is 671.69\u00b0. After William John Macquorn Rankine below. [AHD. Sounds handy to me.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Rankine, William": {
    "term": "Rankine, William",
    "cat": "Pro Audio Reference",
    "def": "John Macquorn (1820-1872), Scottish engineer and physicist.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RAQ (rarely asked questions)": {
    "term": "RAQ (rarely asked questions)",
    "cat": "Pro Audio Reference",
    "def": "The really important questions that should be asked, but never are. The answers to RAQs are kept hidden within government and corporate walls.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rarefaction 1": {
    "term": "rarefaction 1",
    "cat": "Pro Audio Reference",
    "def": "A decrease in density and pressure in a medium, such as air, caused by the passage of a sound wave. 2. The region in which this occurs. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RASTI (room": {
    "term": "RASTI (room",
    "cat": "Pro Audio Reference",
    "def": "acoustics speech transmission index) [Originally spelled RaSTI, with lower-case a, which was an acronym for rapid speech transmission index.] A speech intelligibility performance technique developed in 1973 by Dr. Steeneken in Holland, it is simpler than the more complex STI (speech transmission index), however overtime this procedure proved unreliable and was removed as a IEC standard with the 2011 revision to IEC 60268-16. Compare with %ALCONS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rationalism 1": {
    "term": "rationalism 1",
    "cat": "Pro Audio Reference",
    "def": "Reliance on reason as the best guide for belief and action. 2. Philosophy The theory that the exercise of reason, rather than experience, authority, or spiritual revelation, provides the primary basis for knowledge. [AHD] [The optimist says the glass is half full. The pessimist says the glass is half empty. The rationalist says the glass is twice as big as it needs to be.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rave music": {
    "term": "rave music",
    "cat": "Pro Audio Reference",
    "def": "Unannounced, unadvertised dance party, often illegal, held in an unmarked location, usually a warehouse; spread by word of mouth. See: History of the Rave Scene: How DJs Built Modern Dance Music by Sara Simms",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rayl": {
    "term": "rayl",
    "cat": "Acoustics",
    "def": "One rayl equals 1 pascal-second per meter (Pa s/m). [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Rayleigh distance": {
    "term": "Rayleigh distance",
    "cat": "Acoustics",
    "def": "\u201cThe geometric nearfield of a finite acoustic radiator is the area around the radiator where the sound pressure level does not follow spherical or cylindrical spreading \u2026 The Rayleigh distance D = ka\u00b2/2, where k = 2pi f/c, f is the frequency, c is the sound speed, and a is half the largest dimension, has been used to approximate the size of the geometric nearfield of plane radiators.\u201d From Kuntz, Hixson and Ryan, \u201cThe Rayleigh distance and geometric nearfield size of nonplane sound radiators,\u201d Jour. Acoust. Soc. Amer., Nov., 1983.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Rayleigh, Lord (1842-1919), Third Baron": {
    "term": "Rayleigh, Lord (1842-1919), Third Baron",
    "cat": "Pro Audio Reference",
    "def": "Title of John William Strutt. British physicist. He won a 1904 Nobel Prize for investigating the density of gases and for discovering argon with Sir William Ramsay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Rayleigh scattering": {
    "term": "Rayleigh scattering",
    "cat": "Physics",
    "def": "The scattering of electromagnetic radiation by particles with dimensions much smaller than the wavelength of the radiation, resulting in angular separation of colors and responsible for the reddish color of sunset and the blue of the sky. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Raymond Scott": {
    "term": "Raymond Scott",
    "cat": "Pro Audio Reference",
    "def": "See: Electronium.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "R&B See:": {
    "term": "R&B See:",
    "cat": "Pro Audio Reference",
    "def": "rhythm & blues.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RC": {
    "term": "RC",
    "cat": "Terminology",
    "def": "(room criteria) rating A new noise criteria adopted by ASHRAE to replace the NC criteria. The RC rating is based on ASHRAE sponsored studies of preference and requirements for speech privacy ratings for \u201cacoustical quality.\u201d RC ratings contain both a numerical value and a letter to describe the expected spectral quality of the sound. The numerical part is called the speech interference level (SIL) equal to the arithmetic average of the measured SPL in the 500 Hz, 1 kHz and 2 kHz octave bands, and the letter part denotes the timbre or sound quality as subjectively described by an observer as neutral (N), rumbly (R), hissy (H) or acoustically induced vibration noise (RV). The RC curves serve as optimum spectrum shapes for background sound in buildings. Octave band analysis that meet a specific RC curve are considered neutrally balanced, i.e., they have the desired amounts of low-, mid- and high-frequency content to be heard as not offensive. RC curves are straight lines set at -5 dB/octave slopes (of course \u2014 couldn\u2019t be 6, had to be 5). The RC rating standard is Criteria for Evaluating Room Noise, ANSI S12.2.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RCA jack": {
    "term": "RCA jack",
    "cat": "Pro Audio Reference",
    "def": "See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RCDDTM (Registered": {
    "term": "RCDDTM (Registered",
    "cat": "Pro Audio Reference",
    "def": "Communications Distribution Designer) A designation for individuals who demonstrate expertise in the design, integration, and implementation of telecommunications (voice, data, video, audio, and other low-voltage control) transport systems and their related infrastructure components.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RC time constant": {
    "term": "RC time constant",
    "cat": "Electronics",
    "def": "One time constant equals the time required for the output voltage to increase to 63%, or decrease to 37%, of the final value, due to a step input voltage change. This action is fundamentally controlled by a resistor-capacitor pair. [Although not obvious, time (in seconds) equals resistance (in ohms) times capacitance (in farads).]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "R-DAT or": {
    "term": "R-DAT or",
    "cat": "Pro Audio Reference",
    "def": "DAT (rotary head digital audio tape recorder) A digital audio recorder utilizing a magnetic tape cassette system similar to that of a video recorder.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RD-taper See:": {
    "term": "RD-taper See:",
    "cat": "Pro Audio Reference",
    "def": "potentiometer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "re": {
    "term": "re",
    "cat": "Music",
    "def": "The second tone of the diatonic scale in solfeggio. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "REACH (Registration,": {
    "term": "REACH (Registration,",
    "cat": "Pro Audio Reference",
    "def": "Evaluation and Authorization of Chemicals) The EU\u2019s latest legislation bans additional chemicals from electronic products.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reactance": {
    "term": "reactance",
    "cat": "Pro Audio Reference",
    "def": "The imaginary part of an impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reactive power": {
    "term": "reactive power",
    "cat": "Pro Audio Reference",
    "def": "Same as apparent power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Reado": {
    "term": "Reado",
    "cat": "Pro Audio Reference",
    "def": "The name of the first FAX machine, introduced by Crosley Radio in 1940.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reality \u201cReality": {
    "term": "reality \u201cReality",
    "cat": "Pro Audio Reference",
    "def": "is that which, when you stop believing in it, doesn\u2019t go away.\u201d \u2014 Philip K. Dick",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "real part": {
    "term": "real part",
    "cat": "Mathematics",
    "def": "See: complex number.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "real power": {
    "term": "real power",
    "cat": "Pro Audio Reference",
    "def": "The total circuit power in watts (resistive load). Contrast with apparent power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "real-time analyzer": {
    "term": "real-time analyzer",
    "cat": "Pro Audio Reference",
    "def": "See RTA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "real-time operation What": {
    "term": "real-time operation What",
    "cat": "Pro Audio Reference",
    "def": "is perceived to be instantaneous to a user (or more technically, processing that completes in a specific time allotment).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "real-time transport": {
    "term": "real-time transport",
    "cat": "Pro Audio Reference",
    "def": "protocol (RTP) This protocol adds timing and sequence information to Ethernet packets, which allows accurate packet reassembly for real-time audio and video.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Reamp\u00ae Registered": {
    "term": "Reamp\u00ae Registered",
    "cat": "Pro Audio Reference",
    "def": "trademark by John Cuniberti for his patented reamplifying device first produced in 1994; now owned by Radial Engineering Ltd.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reamplifying Originally": {
    "term": "reamplifying Originally",
    "cat": "Pro Audio Reference",
    "def": "this term meant to take an already recorded guitar sound and use it to drive another different sounding guitar amp \u2014 literally reamplifying it as a means of changing the original recorded sound. Now used on any recorded sound with a real amplifier or virtual plug-in.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rearaxial softspeaker": {
    "term": "rearaxial softspeaker",
    "cat": "Pro Audio Reference",
    "def": "Term coined by Electro-Voice for their mythical loudspeaker, the SP13.5TRBXWK. Claimed by many to be the speaker that couldn\u2019t be made, it might have changed all future loudspeaker design, but it didn\u2019t. Characterized by being undirectional, the designer\u2019s claimed it produced silken highs and woolen lows. The only loudspeaker known to incorporate both \u201cpresence\u201d and \u201cabsence\u201d controls. Based on a ridiculously simple principle that still cannot be explained, the SP13.5TRBXWK was only heard once, during the Rane demo of their PI 14 Pseudoacoustic Infector, coupled by a Jensen JE-EP-ERs Multi-denomial Transpedance Informer to a Crown Belchfire BF-6000SUX amplifier. No one survived.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rear lobe": {
    "term": "rear lobe",
    "cat": "Microphones",
    "def": "A region of pickup at the rear of a supercardioid or hypercardioid microphone polar pattern. A bidirectional microphone has a rear lobe equal to its front pickup. [Vear]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rebab Musical Instrument": {
    "term": "rebab Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A type of bowed or plucked string instrument indigenous to the Middle East.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rebec Muscial Instrument": {
    "term": "rebec Muscial Instrument",
    "cat": "Pro Audio Reference",
    "def": "Western Europe bowed stringed instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Recklinghausen, Daniel": {
    "term": "Recklinghausen, Daniel",
    "cat": "Pro Audio Reference",
    "def": "von (1925-2011) American engineer and audio inventor who was associated with the AES for over 50 years. Famous for his quote: \u201cIf it measures good and sounds bad, it is bad; if it measures bad and sounds good, you\u2019ve measured the wrong thing.\u201d Here is a list of his major engineering contributions while at H. H. Scott.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reconing": {
    "term": "reconing",
    "cat": "Loudspeakers",
    "def": "The act of replacing a blown, torn, or cracked cone on a dynamic loudspeaker \u2014 a highly skilled operation. See Loudspeaker Reconing by Thomas P. Colvin for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reconstruction filter": {
    "term": "reconstruction filter",
    "cat": "Pro Audio Reference",
    "def": "A low-pass filter used at the output of digital audio processors (following the DAC) to remove (or at least greatly attenuate) any aliasing products (image spectra present at multiples of the sampling frequency) produced by the use of real-world (non-brickwall) input filters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Recording Academy,": {
    "term": "Recording Academy,",
    "cat": "Pro Audio Reference",
    "def": "The The organization formerly known as NARAS. Think Grammy; often confused with SPARS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "recording console": {
    "term": "recording console",
    "cat": "Pro Audio Reference",
    "def": "See mixer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "recording history": {
    "term": "recording history",
    "cat": "Pro Audio Reference",
    "def": "See History of Recording.com.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "recording terminology See": {
    "term": "recording terminology See",
    "cat": "Pro Audio Reference",
    "def": "the Recording Institute of Detroit, who claims to have posted the largest glossary of recording terms on the web.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rectangular coordinates": {
    "term": "rectangular coordinates",
    "cat": "Mathematics",
    "def": "A coordinate in a rectangular Cartesian coordinate system. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rectifier": {
    "term": "rectifier",
    "cat": "Pro Audio Reference",
    "def": "An electronic component used to convert from alternating current (AC) to direct-current (DC). Works by only conducting current in one direction which allows inversion or suppression of alternate half cycles. Several types exist from early selenium rectifiers to modern semiconductor diodes. See full-wave and half-wave.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "rectifying junction": {
    "term": "rectifying junction",
    "cat": "Pro Audio Reference",
    "def": "See: junction, rectifying.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "recursive 1": {
    "term": "recursive 1",
    "cat": "Pro Audio Reference",
    "def": "A data structure that is defined in terms of itself. For example, in mathematics, an expression, such as a polynomial, each term of which is determined by application of a formula to preceding terms. [AHD] 2. Pertaining to a process that is defined or generated in terms of itself, i.e., its immediate past history. 3. Use of feedback as in a recursive filter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Red Book Nickname for": {
    "term": "Red Book Nickname for",
    "cat": "Pro Audio Reference",
    "def": "the Philips and Sony\u2019s ECMA-130 standard document that defines the format for CD-Audio (compact disc-digital audio) discs; available only to licensees. Compare with Green Book and Yellow Book.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "RedfestDXB": {
    "term": "RedfestDXB",
    "cat": "Pro Audio Reference",
    "def": "The biggest Middle East music festival, held yearly in Dubai. Winner of Time Out magazine\u2019s Music and Nightlife Awards in 2015.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reed": {
    "term": "reed",
    "cat": "Music",
    "def": "1. A primitive wind instrument made of a hollow reed stalk. 2. a. A flexible strip of cane or metal set into the mouthpiece or air opening of certain instruments to produce tone by vibrating in response to a stream of air. b. An instrument, such as an oboe or clarinet, that is fitted with a reed. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "REED (Record": {
    "term": "REED (Record",
    "cat": "Pro Audio Reference",
    "def": "Engineering Development Department) EMI lab responsible for the famous recording console used to record the Beatles at Abbey Road Studios.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reed organ Musical Instrument": {
    "term": "reed organ Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "An organ design using reeds rather than pipes.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reed relay": {
    "term": "reed relay",
    "cat": "Electronics",
    "def": "A relay using glass-enclosed, magnetically closed reeds as the contact members. Some forms are mercury-wetted.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Reed-Solomon code (after Irving S": {
    "term": "Reed-Solomon code (after Irving S",
    "cat": "Pro Audio Reference",
    "def": "Reed and Gustave Solomon) The most popular and powerful error-correcting code in use.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reentrant loudspeaker": {
    "term": "reentrant loudspeaker",
    "cat": "Pro Audio Reference",
    "def": "Reentrant means directed inward. A reentrant loudspeaker is a folded horn design where the sound does not radiate forward from a cone but is routed forward than back to a bell which directs it forward again. This design achieves very loud SPL in a small size and is popular for public address use where loud SPL is required to overcome background noise. Hit the link and scroll down to see a great diagram and picture of a reentrant horn.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Reeves, Alec": {
    "term": "Reeves, Alec",
    "cat": "Pro Audio Reference",
    "def": "Harley (1902-1971) British physicist who first proposed PCM (pulse code modulation).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reference sound power": {
    "term": "reference sound power",
    "cat": "Acoustics",
    "def": "1 picowatt (1 pW; i.e., (10-12 W)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reference sound pressure": {
    "term": "reference sound pressure",
    "cat": "Acoustics",
    "def": "20 micropascals (20 \u00b5Pa)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reflection": {
    "term": "reflection",
    "cat": "Acoustics",
    "def": "Sound that is reflected. See link.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reflection phase": {
    "term": "reflection phase",
    "cat": "Pro Audio Reference",
    "def": "grating See: grating.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reflectors In acoustics,": {
    "term": "reflectors In acoustics,",
    "cat": "Pro Audio Reference",
    "def": "an object or surface that reflects, or bounces back the original signal. A perfect reflector would reflect with no loss of energy. A diffuser is a special kind of reflector.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "refraction": {
    "term": "refraction",
    "cat": "Acoustics",
    "def": "The bending of sound waves caused by entering a medium where the speed of sound is different. See link.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "refrigerator There": {
    "term": "refrigerator There",
    "cat": "Pro Audio Reference",
    "def": "is no \u201cd\u201d in this word \u2014 it is quickly becoming the most misspelled word in the United States.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reggae": {
    "term": "reggae",
    "cat": "Music",
    "def": "Jamaican English, ragged clothing. Popular music of Jamaican origin having elements of calypso and rhythm and blues, characterized by a strongly accentuated offbeat. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reggaet\u00f3n Music": {
    "term": "reggaet\u00f3n Music",
    "cat": "Pro Audio Reference",
    "def": "A genre of dance music characterized by Entertainment Weekly as \u201ca Spanish-language, pan-American fusion of Stateside hip-hop rhymes, Puerto Rican salsa flourishes, and Jamaican dancehall rhythms.\u201d Compare with Jawaiian.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Reign Fest": {
    "term": "Reign Fest",
    "cat": "Pro Audio Reference",
    "def": "Music festival held in Dolgeville, NY spotlighting Christian music groups.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "Reis, Johann": {
    "term": "Reis, Johann",
    "cat": "Pro Audio Reference",
    "def": "Philipp (1834-1874) German scientist and inventor who is credited with building prototypes of very early telephone concepts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "REL (Rights Expression Language)": {
    "term": "REL (Rights Expression Language)",
    "cat": "Pro Audio Reference",
    "def": "A unified vocabulary for individuals to express copyright law rights.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "relay": {
    "term": "relay",
    "cat": "Electronics",
    "def": "An electromechanical device with a coil that when energized creates a magnetic field that either opens or closes metal contacts, for making or breaking electrical connections. Invented by Joseph Henry in 1835.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "release Audio Compressors": {
    "term": "release Audio Compressors",
    "cat": "Pro Audio Reference",
    "def": "How fast the gain is turned back up once the signal drops below the threshold setting. Contrast with attack. Also see: automatic attack & release.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reluctance Magnetics": {
    "term": "reluctance Magnetics",
    "cat": "Pro Audio Reference",
    "def": "A measure of the opposition to magnetic flux, analogous to electric resistance. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "R.E.M. (Remember Every Moment)": {
    "term": "R.E.M. (Remember Every Moment)",
    "cat": "Music",
    "def": "Athens, Georgia band formed in 1980 by Michael Stipe, Mike Mills, Bill Berry, and Peter Buck. Upon being inducted into the Rock and Roll Hall of Fame in 2007, Michael Stipe disclosed that the band\u2019s name came from a favorite saying of his mother.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "remixing DJ": {
    "term": "remixing DJ",
    "cat": "Recording",
    "def": "An alternate variation of one or more original song (or video, etc.) compositions created by manipulating the original using various recording techniques to create a new version.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "REOREO Speedwagon": {
    "term": "REOREO Speedwagon",
    "cat": "Music",
    "def": "American rock group formed in 1967. REO Speedwagon took its name from the Reo Speed-Wagon, a truck manufactured by the REO automobile company. (\u201cREO\u201d are initials the company\u2019s founder, Ransom Eli Olds, who also lent his name to the Oldsmobile division of General Motors.)",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "residual 1": {
    "term": "residual 1",
    "cat": "Pro Audio Reference",
    "def": "The quantity left over at the end of a process; a remainder. 2. often residuals A payment made to a performer, writer, or director for each repeat showing of a recorded television show or commercial. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "residual sound": {
    "term": "residual sound",
    "cat": "Acoustics",
    "def": "The all-encompassing sound , at a specified time, being usually a composite of sound from many sources at many directions, near and far, remaining at a given position in a given situation when all uniquely identifiable discrete sound sources are eliminated, rendered insignificant, or otherwise not included. [Harris]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resistance See": {
    "term": "resistance See",
    "cat": "Pro Audio Reference",
    "def": "impedance.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resistivity Symbol": {
    "term": "resistivity Symbol",
    "cat": "Pro Audio Reference",
    "def": "\u03c1 (Greek letter small rho). Electricity. An intrinsic property of a material that is measured as its resistance to current per unit length for a uniform cross section. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resistor": {
    "term": "resistor",
    "cat": "Electronics",
    "def": "Circuit symbol: R 1. An element within a circuit that has specified resistance value designed to restrict the flow of current. 2. A device with the primary purpose of introducing resistance into an electric circuit. (A resistor as used in electric circuits for purposes of operation, protection, or control, commonly consists of an aggregation of units. Resistors, as commonly supplied, consist of wire, metal, ribbon, cast metal or carbon compounds supported by or embedded in an insulating medium. The insulating medium may enclose and support the resistance material as in the case of the porcelain tube type or the insulation may be provided only at the points of support as in the case of heavy duty ribbon or cast iron grids mounted in metal frames.) [IEEE] See: color-code and standard component values.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resistor standard": {
    "term": "resistor standard",
    "cat": "Pro Audio Reference",
    "def": "values See values.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resonance 1.": {
    "term": "resonance 1.",
    "cat": "Electronics",
    "def": "In an LRC circuit, it is the condition where the inductive and capacitive reactances are equal; this is called the resonant frequency. 2. Physics. The increase in amplitude of oscillation of an electric or mechanical system exposed to a periodic force whose frequency is equal or very close to the natural undamped frequency of the system. [AHD] A dynamic condition which occurs when any input frequency of vibration coincides with one of the natural frequencies of the structure. That is, the inclination of any mechanical or electrical system to vibrate (resonate) at a certain frequency when excited by an external force, and to keep vibrating after the excitation is removed. 3. Acoustics. Intensification and prolongation of sound, especially of a musical tone, produced by sympathetic vibration. 4. Linguistics. Intensification of vocal tones during articulation, as by the air cavities of the mouth and nasal passages. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resonant frequency Electronic Circuits": {
    "term": "resonant frequency Electronic Circuits",
    "cat": "Pro Audio Reference",
    "def": "See above.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "resonator guitar": {
    "term": "resonator guitar",
    "cat": "Pro Audio Reference",
    "def": "Invented by John Dopyera, who founded the Dobro Manufacturing Company with his brothers Rudy, Emile, Robert and Louis, after leaving the National String Instrument Corporation, a company he cofounded.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "retro audio": {
    "term": "retro audio",
    "cat": "Pro Audio Reference",
    "def": "Termed coined by Tomlinson Holman of THX fame, referring to new audio gear designed using legacy or old technology, usually tubes, with cosmetics to match.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "return loss Category wiring": {
    "term": "return loss Category wiring",
    "cat": "Pro Audio Reference",
    "def": "The ratio of the transmitted signal strength to the reflected signal strength. A characteristic often degraded due to excessive bending of the cable.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reverb": {
    "term": "reverb",
    "cat": "Recording",
    "def": "Shortened form of reverberator, or reverberation unit. Any electronic or acoustical device designed to simulate, or capture, the natural reverberation of a large hard-surfaced (echoic) room, and mix it back with the original recorded sound. Reverb today is accomplished by digital devices using complex DSP algorithms; previously done using a chamber, a plate, or springs. See: algorithmic reverb and convolution reverb for DSP techniques.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reverberation": {
    "term": "reverberation",
    "cat": "Pro Audio Reference",
    "def": "The total sound field remaining in a room after the original source is silenced. The length of time of this collapsing sound field is called the reverberation time and is defined below. Contrast with echo and ambience. \u201cReverberation represents the energy decay process after the initial echoes\u201d [Blesser].",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reverberation time": {
    "term": "reverberation time",
    "cat": "Pro Audio Reference",
    "def": "also RT60 and more often today as T30 Reverberation is all sound remaining after the source stops. The time it takes for this sound to decay is called the reverberation time, and it is quantified by measuring how long it takes the sound pressure level to decay to one-thousanth of its original value. Since one-thousanth equals a 60 dB reduction, reverberation time is abbreviated \u201cRT60,\u201d however since most acousticians measure the decay time for a 30 dB reduction and then doubles the number to express it as RT60, it is more accurately called T30. Now this is a very simplified definition; for a very thorough discussion see: Averaging RT60 Values for Room-Acoustics by Eric Desart. For most reverberant place in the world see: Inchindown.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
  },
  "reverse mixing Live Sound": {
    "term": "reverse mixing Live Sound",
    "cat": "Pro Audio Reference",
    "def": "A term coined by Rick Chinn of Uneeda Audio who defines it this way: \u201cReverse Mixing refers to the practice of listening to a mix and NOT raising the level of something that you can\u2019t hear sufficiently but instead looking for the <truncated 195864 bytes>",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (R)"
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

    const f = filter.trim().toLowerCase();
    const allKeys = Object.keys(this.glossaryTerms);

    let matchingKeys = [];
    if (!f || f === "all") {
      // Show first 48 entries for clean performance
      matchingKeys = allKeys.slice(0, 48);
    } else if (f.length === 1 && f >= "a" && f <= "z") {
      // Single letter filter
      matchingKeys = allKeys.filter(k => k.trim().toLowerCase().startsWith(f));
    } else {
      // Free text search
      matchingKeys = allKeys.filter(k => {
        const item = this.glossaryTerms[k];
        return item.term.toLowerCase().includes(f) ||
               item.def.toLowerCase().includes(f) ||
               item.cat.toLowerCase().includes(f);
      });
    }

    if (matchingKeys.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: var(--text-muted);">No pro audio terms found matching "${filter}".</div>`;
      return;
    }

    const countHeader = (!f || f === "all") 
      ? `<div style="grid-column: 1/-1; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Showing first 48 of ${allKeys.length} total Dennis A. Bohn Pro Audio Reference terms. Select a letter pill or search to explore.</div>`
      : `<div style="grid-column: 1/-1; font-size: 0.85rem; color: var(--accent-cyan); margin-bottom: 0.5rem;">Found ${matchingKeys.length} terms matching "${filter}" (out of ${allKeys.length} total PAR entries):</div>`;

    container.innerHTML = countHeader + matchingKeys.map(k => {
      const item = this.glossaryTerms[k];
      return `
        <div class="detail-card par-card" style="border-left: 3px solid var(--accent-cyan);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
            <h4 style="margin: 0; color: var(--text-primary); font-size: 1rem;">${item.term}</h4>
            <span class="badge badge-accent" style="font-size: 0.7rem;">${item.cat}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.5;">${item.def}</p>
          <div style="font-size: 0.78rem; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.08); padding: 0.35rem 0.6rem; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.2);">
            <strong>Dennis Bohn Reference:</strong> ${item.bohnNote}
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
        // Reset letter buttons
        document.querySelectorAll(".par-letter-btn").forEach(b => b.classList.remove("active"));
        this.renderGlossaryCards(e.target.value.trim());
      });
    }

    // Letter buttons
    document.querySelectorAll(".par-letter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".par-letter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const letter = btn.dataset.letter;
        if (searchInput) searchInput.value = "";
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
