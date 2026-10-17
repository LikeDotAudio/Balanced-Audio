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
    "bohnNote": "Historical Context: Developed in 1966 by Neumann for Norwegian Broadcasting (NRK) in Oslo, which had 48V DC auxiliary lighting systems available. Positive 48V is fed identically to pins 2 and 3 through matched 6.81 k\u03a9 resistors, using the cable shield (pin 1) as negative return."
  },
  "Phase vs Polarity": {
    "term": "Phase vs. Polarity",
    "cat": "Style Guide & Theory",
    "def": "Polarity refers to the non-inverting (+) vs. inverting (-) electrical or physical orientation of a circuit (instantaneous sign reversal across all frequencies). Phase is a frequency-dependent time delay (expressed in degrees or radians: \u03b8 = 2\u03c0ft).",
    "bohnNote": "Dennis Bohn Pro Audio Style Guide: 'Never say 'out of phase' when you mean 'reversed polarity'. Flipping hot and return wires reverses polarity, not phase.'"
  },
  "L": {
    "term": "L",
    "cat": "Pro Audio Reference",
    "def": "The electronic symbol for an inductor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "la": {
    "term": "la",
    "cat": "Music",
    "def": "The sixth tone of the diatonic scale in solfeggio. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAB": {
    "term": "LAB",
    "cat": "Pro Audio Reference",
    "def": "(Live Audio Board) Topics related to sound reinforcement and application of audio for live events \u2014 the most active pro audio forum on the Web, created by road dog Dave Stevens and hosted by ProSoundWeb.com.",
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
    "cat": "Pro Audio Reference",
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
  "LAMC": {
    "term": "LAMC",
    "cat": "Pro Audio Reference",
    "def": "(Latin Alternative Music Conference) A yearly conference held in NY City, usually in July, featuring Latin alternative music.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LAN": {
    "term": "LAN",
    "cat": "Pro Audio Reference",
    "def": "(local area network) A combination of at least two computers and peripherals on a common wiring scheme, which allows two-way communication of data between any devices on the network.",
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
  "LARES": {
    "term": "LARES",
    "cat": "Pro Audio Reference",
    "def": "(Lexicon Acoustic Reinforcement and Enhancement System) The time-varying reverberation system invented and developed by David Griesinger while at Lexicon beginning in 1991. Details here: Improving Room Acoustics through time-variant synthetic reverberation by David Griesinger. This is an example of an EAE system.",
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
  "lavaliere or": {
    "term": "lavaliere or",
    "cat": "Pro Audio Reference",
    "def": "lavaliere microphone A small electret microphone designed to be worn on a person. The first lavaliere mics were worn around the neck on a lanyard, hence the French name lavalli\u00e8re, a type of necktie, used to describe a pendant worn on a chain around the neck (after the Duchess de La Valli\u00e8re who started the fashion [AHD]). Today most lavaliere (the final \u201ce\u201d is commonly dropped) mics are attached by clips rather than hung from a cord.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "lawful \u201cCompatible": {
    "term": "lawful \u201cCompatible",
    "cat": "Pro Audio Reference",
    "def": "with the will of a judge having jurisdiction.\u201d \u2014 Ambrose Bierce.",
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
  "Layer 1": {
    "term": "Layer 1",
    "cat": "Pro Audio Reference",
    "def": "In the 7-layer OSI network model, this is the lowest level, and is known as the physical layer (seen abbreviated PHY) layer, characterized by the hardware of cables and connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Layer 2": {
    "term": "Layer 2",
    "cat": "Pro Audio Reference",
    "def": "In the 7-layer OSI network model, this is the next to lowest level, known as the data link layer. This layer defines how date is transferred between network objects. In pro audio, the most common layer 2 uses Ethernet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "layback": {
    "term": "layback",
    "cat": "Recording",
    "def": "A post operation that rejoins audio and video after all other editing is complete.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LCD": {
    "term": "LCD",
    "cat": "Pro Audio Reference",
    "def": "(liquid crystal display) A display of numerical or graphical information made of material whose reflectance or transmittance changes when an electric field is applied. An LCD requires ambient light or backlighting for viewing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LCR (left center right) Sound Reinforcement": {
    "term": "LCR (left center right) Sound Reinforcement",
    "cat": "Pro Audio Reference",
    "def": "A three-channel sound system utilizing a left channel, a right channel and a center channel to stabilize the phantom images.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LDI": {
    "term": "LDI",
    "cat": "Pro Audio Reference",
    "def": "(Live Design International) The largest US trade show and conference focused on technologies for the live entertainment industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LDR": {
    "term": "LDR",
    "cat": "Pro Audio Reference",
    "def": "(light-detecting resistor or light-dependent resistor) An optoelectronic device whose resistance varies (inversely proportional) as a function of light ; a photocell, often constructed from CdS.",
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
  "LED": {
    "term": "LED",
    "cat": "Pro Audio Reference",
    "def": "(light-emitting diode) Invented by Nick Holonyak, Jr. in 1962, a self-lighting semiconductor display of numerical or graphical information based on the light emitting characteristics of a solid-state device that emits incoherent (i.e., random direction) light when conducting a forward current. See LEVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEDE (live end-dead end)": {
    "term": "LEDE (live end-dead end)",
    "cat": "Acoustics",
    "def": "Recording studio acoustic treatment developed by Chips Davis in the late \u201970s where a room is designed to have a live end, i.e., reverberant and a dead end (opposite) that is heavily damped. Hit the link for the original AES paper written by Chips Davis and Don Davis (no relation) in 1980.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LEED\u00ae": {
    "term": "LEED\u00ae",
    "cat": "Pro Audio Reference",
    "def": "(Leadership in Energy and Environmental Design) A registered trademark of USGBC (US Green Building Council) An environmental rating system for the building industry \u2014 a \u201cbenchmark for the design, construction, and operation of high performance green buildings.\u201d See RaneNote: LEED and the MA 4 Multichannel Amplifier.",
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
  "LEO (low earth orbit) Telephony": {
    "term": "LEO (low earth orbit) Telephony",
    "cat": "Pro Audio Reference",
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
  "LEVD": {
    "term": "LEVD",
    "cat": "Pro Audio Reference",
    "def": "(light emitting vegetable diode) True story; kimchi, actually. Some other foods also do it.",
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
  "lexicographer The": {
    "term": "lexicographer The",
    "cat": "Pro Audio Reference",
    "def": "author of a lexicon or dictionary. \u201cEvery other author may aspire to praise; the lexicographer can only hope to escape reproach; and even this negative recompense has been yet granted to very few.\u201d \u2014 Samuel Johnson, 1755.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Leyland number": {
    "term": "Leyland number",
    "cat": "Mathematics",
    "def": "Any number that can be expressed as xy+ yx, e.g., 593 = 29 + 92. Hit the link to see other examples.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LFD": {
    "term": "LFD",
    "cat": "Pro Audio Reference",
    "def": "(low-frequency diffusion) Acoustics.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LFE": {
    "term": "LFE",
    "cat": "Pro Audio Reference",
    "def": "(low frequency effects) [Note: it is \u201ceffects\u201d NOT \u201cenhancement\u201d.) Popularly called bass management, but this is technically wrong. The \u201cpoint-one\u201d in \u201c5.1 surround systems\u201c. It refers to the limited bandwidth (20-90 Hz, 20-120 Hz, or 20-150 Hz depending on the encoding system) special effects/feature channel, but can also refer to a subwoofer channel. Both Dolby Digital and DTS Consumer use the term. The \u201cbass management\u201d part comes from having the option of leaving the bass in the five full-range channels or sending all the lower bass to the subwoofer, or some combination.",
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
  "LIDAR": {
    "term": "LIDAR",
    "cat": "Pro Audio Reference",
    "def": "(light detection and ranging) A system based on the same principles as RADAR developed for locating, ranging and profiling applications.",
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
  "Lilith or": {
    "term": "Lilith or",
    "cat": "Pro Audio Reference",
    "def": "Lilith Fair An all-women festival tour begun in 1997 by artist Sarah McLachlan along with Dan Fraser, Marty Diamond and Terry McBride, as a celebration of women in music. History here.",
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
  "limiter A": {
    "term": "limiter A",
    "cat": "Pro Audio Reference",
    "def": "compressor with a fixed ratio of 10:1 or greater. The dynamic action effectively prevents the audio signal from becoming any larger than the threshold setting. For example, if the threshold is set for, say, +16 dBu and the input signal increases by 10 dB to +26 dB, the output only increases by 1 dB to +17 dBu, essentially remaining constant. Used primarily for preventing equipment, media, and transmitter overloads. A limiter is to a compressor what a noise gate is to an expander. See the RaneNote \u201cDynamics Processors \u2014 Technology & Applications.\u201d",
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
  "linguistics The": {
    "term": "linguistics The",
    "cat": "Pro Audio Reference",
    "def": "study of the nature, structure, and variation of language, including phonetics, phonology, morphology, syntax, semantics, sociolinguistics, and pragmatics. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Linkwitz-Riley crossover": {
    "term": "Linkwitz-Riley crossover",
    "cat": "Pro Audio Reference",
    "def": "The de facto standard for professional audio active crossovers is the 4th-order (24 dB/octave slopes) Linkwitz-Riley (LR-4) design. Consisting of cascaded 2nd-order Butterworth low-pass filters, the LR-4 represents a vast improvement over the previous 3rd-order (18 dB/octave) Butterworth standard. Named after S. Linkwitz, a Hewlett-Packard engineer at that time, who first described the problems and solution in his paper \u201cActive Crossover Networks for Non-coincident Drivers,\u201d J. Audio Eng. Soc., vol. 24, Jan/Feb 1976, pp. 2-8. In this paper, he credited his co-worker Russ Riley for the idea that cascaded Butterworth filters met all his crossover requirements. Their effort became known as the Linkwitz-Riley alignment. Linkwitz showed that a significant weakness of the Butterworth design was the behavior of the combined acoustic lobe along the vertical axis. An acoustic lobe results when both drivers operate together reproducing the crossover frequency band, and in the Butterworth case it exhibits severe peaking and is not on-axis (it tilts toward the lagging driver). Linkwitz showed that this results from the Butterworth outputs not being in-phase. Riley demonstrated an elegant solution by cascading two 2nd-order (any even-ordered pair works) Butterworth filters, which produced outputs that were always in-phase and summed to a constant-voltage response. Thus was created a better crossover. See the RaneNote Linkwitz-Riley Crossovers: A Primer and RaneNote Signal Processing Fundamentals.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Linux A": {
    "term": "Linux A",
    "cat": "Pro Audio Reference",
    "def": "computer Unix-type operating system (OS) invented by Linus Torvalds in 1992, who wrote it as a student at the University of Helsinki. He created this OS because he couldn\u2019t afford one that could accomplish what he wanted with his available hardware. He then posted it on the network for other students, where it grew and became very stable and powerful. Today, for free, the software, source code, etc., is available off the Web.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LIPA": {
    "term": "LIPA",
    "cat": "Pro Audio Reference",
    "def": "(Liverpool Institute for Performing Arts) A state-of-the-art performing arts higher education institution co-founded by Paul McCartney and Mark Featherstone-Witty; located in a renovated old school that McCartney went to. History here.",
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
  "Little Kids": {
    "term": "Little Kids",
    "cat": "Pro Audio Reference",
    "def": "Rock A nonprofit organization that \u201c\u2026 provides weekly music education classes to K-12 students in public schools that have been stripped of their music programs.\u201d [from website] Amazing and valuable group.",
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
  "LKFS": {
    "term": "LKFS",
    "cat": "Pro Audio Reference",
    "def": "(loudness K-weighted digital full scale) Broadcast. A standard ( ITU R BS.1770-2) aimed at normalizing broadcast loudness levels. An increase of 1 dB in signal level will cause the loudness reading to increase by 1 LKFS. For a particularly good overview see: Florian Camerer\u2019s paper, \u201cOn the way to Loudness nirvana: audio levelling with EBU R128.\u201d Also see: LUFS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LL": {
    "term": "LL",
    "cat": "Pro Audio Reference",
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
  "lodestone (also": {
    "term": "lodestone (also",
    "cat": "Pro Audio Reference",
    "def": "loadstone) A piece of magnetite that has magnetic properties and attracts iron or steel. [AHD]",
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
  "log Short": {
    "term": "log Short",
    "cat": "Pro Audio Reference",
    "def": "for logarithm.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "logarithm": {
    "term": "logarithm",
    "cat": "Mathematics",
    "def": "A shortcut method that uses the powers of 10 (or some other base) to represent the actual number. The logarithm is the power to which a base, such as 10, must be raised to produce a given number. For example, 10\u00b3 = 1,000; therefore, log (to the base 10) 1,000 = 3. The types most often used are the common logarithm (base 10), the natural logarithm (base e), and the binary logarithm (base 2).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "logic A": {
    "term": "logic A",
    "cat": "Pro Audio Reference",
    "def": "system of reasoning first formulated by Aristotle. 1. The study of the principles of reasoning, especially of the structure of propositions as distinguished from their content and of method and validity in deductive reasoning. Computer Science a. The nonarithmetic operations performed by a computer, such as sorting, comparing, and matching, that involve yes-no decisions. b. Computer circuitry. c. Graphic representation of computer circuitry. [AHD",
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
  "loquacious Very talkative; garrulous": {
    "term": "loquacious Very talkative; garrulous",
    "cat": "Pro Audio Reference",
    "def": "[AHD]",
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
  "loss See": {
    "term": "loss See",
    "cat": "Pro Audio Reference",
    "def": "gain.",
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
  "loudness The": {
    "term": "loudness The",
    "cat": "Pro Audio Reference",
    "def": "SPL of a standard sound which appears to be as loud as the unknown. Loudness level is measured in phons and equals the equivalent SPL in dB of the standard. [For example, a sound judged as loud as a 40 dB-SPL 1 kHz tone has a loudness level of 40 phons. Also, it takes 10 phons (an increase of 10 dB-SPL) to be judged twice as loud.] Note that loudness is a subjective measurement; contrast with intensity which is an objective measurement.",
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
  "LP (long play) Phonograph Records": {
    "term": "LP (long play) Phonograph Records",
    "cat": "Pro Audio Reference",
    "def": "The name for the 33 1/3 rpm vinyl record introduced by Columbia Records in 1948.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "L-pad See": {
    "term": "L-pad See",
    "cat": "Pro Audio Reference",
    "def": "attenuator pad.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LRAD": {
    "term": "LRAD",
    "cat": "Pro Audio Reference",
    "def": "(long range acoustic device) A non-lethal sonic communicator/weapon developed by American Technology Corporation capable of producing sound pressure levels of 153 dB-SPL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LRC (inductance-resistance-capacitance)": {
    "term": "LRC (inductance-resistance-capacitance)",
    "cat": "Electronics",
    "def": "Shorthand for the most common passive circuit elements. Also seen as RLC, LCR, CRL, etc.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LSB": {
    "term": "LSB",
    "cat": "Pro Audio Reference",
    "def": "(least significant bit) The bit within a digital word that represents the smallest possible coded value; hence, the LSB is a measure of precision.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LTC": {
    "term": "LTC",
    "cat": "Pro Audio Reference",
    "def": "(linear time code) See time code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "LUFS": {
    "term": "LUFS",
    "cat": "Pro Audio Reference",
    "def": "(loudness unit digital Full Scale) Alternate term for LKFS.",
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
  "Lunchbox Nickname": {
    "term": "Lunchbox Nickname",
    "cat": "Pro Audio Reference",
    "def": "for the narrow 500 Series of modular card frame racks. Coined by Art Kelm. \u201cAPI Lunchbox\u201d is a registered trademark of API Audio.",
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
  "AES": {
    "term": "AES",
    "cat": "Pro Audio Reference",
    "def": "Follow Us Quick Links About Events Community Membership Diversity & Inclusion Mission Statement Contact 697 3rd Avenue, Suite 405 NY, NY 10017 +1 212 661 8528 Stay Connected With us Subscribe By clicking Subscribe, you acknowledge that you have read and accepted our Privacy Policy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Copyright \u00a9": {
    "term": "Copyright \u00a9",
    "cat": "Pro Audio Reference",
    "def": "2026 Audio Engineering Society, Inc. All rights reserved. Skip to main contentSkip to footerOpens in a new tab AES Donate Join Member Portal Login About",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "Store Pro": {
    "term": "Store Pro",
    "cat": "Pro Audio Reference",
    "def": "Audio Reference: PAR The Audio Industry's Essential Reference Guide Explore audio terminology, concepts, standards, technologies, and historical insights through a comprehensive reference built for audio professionals and enthusiasts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "What is": {
    "term": "What is",
    "cat": "Pro Audio Reference",
    "def": "the PAR? The Pro Audio Reference attempts to explain all the various terms commonly used by engineers in the pro audio field. (Scroll down for the full history.) You can either search for a term in the search box above, or click on the first letter of the word in the alphabet shown above. You can use that clickable alphabet to quickly jump around from page to page.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (L)"
  },
  "m": {
    "term": "m",
    "cat": "Pro Audio Reference",
    "def": "(lower-case) The symbol for milli-.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M": {
    "term": "M",
    "cat": "Pro Audio Reference",
    "def": "(upper-case) The symbol for mega-.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MAC": {
    "term": "MAC",
    "cat": "Pro Audio Reference",
    "def": "Address (Medium Access Control Address) (Also called MAC Name) Computer Networks. The (usually) 48-bit hardware address number unique to each LAN NIC (put there by the manufacturer), which identifies every network node.",
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
  "MADI": {
    "term": "MADI",
    "cat": "Pro Audio Reference",
    "def": "(multichannel audio digital interface) An AES recommended practice document Digital Audio Engineering \u2013 Serial Multichannel Audio Digital Interface (MADI) AES-10-1991 (ANSI S4.43-1991) specifying and controlling the requirements for digital interconnection between multitrack recorders and mixing consoles. The standard provides for 56 simultaneous digital audio channels that are conveyed point-to-point on a single coaxial cable fitted with BNC connectors along with a separate synchronization signal. Fiber optic implementation is specified in document AES-10id-1995, entitled AES information document for digital audio engineering \u2013 Engineering guidelines for the multichannel audio digital interface (MADI) AES 10. Basically, the technique takes the standard AES/EBU interface and multiplexes 56 of these into one sample period rather than the original two.",
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
  "magnetic flux density Symbol": {
    "term": "magnetic flux density Symbol",
    "cat": "Pro Audio Reference",
    "def": "The amount of magnetic flux through a unit area taken perpendicular to the direction of the magnetic flux. Also called magnetic induction. [AHD]",
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
  "magnetite The": {
    "term": "magnetite The",
    "cat": "Pro Audio Reference",
    "def": "mineral form of black iron oxide, Fe3O4, that often occurs with magnesium, zinc, and manganese and is an important ore of iron. [AHD]",
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
  "Maine The": {
    "term": "Maine The",
    "cat": "Pro Audio Reference",
    "def": "only American state whose name is just one syllable.",
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
  "MAMA": {
    "term": "MAMA",
    "cat": "Pro Audio Reference",
    "def": "(Musical Archives, Musical Archives) Founded in 1989 (1986?) by Gene Czerwinski (Cerwin-Vega founder) to preserve the music of culturally significant artists (by not requiring them to be commercially successful), whose CDs consistently are Grammy nominees, with at least one Grammy winner. [Now appears to be defunct.]",
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
  "mantissa The": {
    "term": "mantissa The",
    "cat": "Pro Audio Reference",
    "def": "fractional part of a logarithm, e.g., in the logarithm 1.83885, the mantissa is 0.83885. (The integer part of a number is called the characteristic. In the example the characteristic is 1.) Floating-point arithmetic also calls this the significand.",
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
  "mask or": {
    "term": "mask or",
    "cat": "Pro Audio Reference",
    "def": "masking (aka auditory masking) Psychology of Hearing. The human hearing phenomenon where the response to one stimulus is reduced in the presence of another, i.e., two sounds arrive but only one sound is heard. Particularly evident when one sound is louder than another, with the result being that we hear the louder sound, even if arriving at a slightly different time. Frequency plays a part: a louder sound heard at one frequency prevents softer sounds near that frequency from being heard. However, not all frequencies mask the same. Mid-band frequencies mask far better than low frequencies, for example. Related to critical bands. Also see: temporal masking (e.g., forward and backward masking) and sound masking.",
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
  "Transfer the": {
    "term": "Transfer the",
    "cat": "Pro Audio Reference",
    "def": "recording into the highest digital (or analog) format for the mastering steps. Fix unwanted noise problems, either captured during the recording process, or for restoration archival purposes. Edit and apply signal processing as required to optimize timbre, clarity, smoothness and impact. Maximize the stereo or surround-sound balance and spread. Maximize and smooth out differences in song levels. Add pre-emphasis equalization if required for the duplication media. Add ISRC and other subcodes as required. Sequence the songs into their optimum playing order. Create fade-ins, fade-outs, segues and spacing between songs. Hide bonus tracks by using creative subcoding, if requested. Format and transfer the final results to the required media for duplication. And sometimes, create the package artwork. Or, as DRT Mastering succinctly puts it: \u201cMastering creates a seamless whole out of a collection of individual tracks.\u201d",
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
  "mathematics The": {
    "term": "mathematics The",
    "cat": "Pro Audio Reference",
    "def": "study of the measurement, properties, and relationships of quantities and sets, using numbers and symbols. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mathmusician The": {
    "term": "mathmusician The",
    "cat": "Pro Audio Reference",
    "def": "merger of mathematics and music. See examples from Vi Hart [Absolutely one of the most brilliant contributions to the Internet by a true genius. Check it out; you won\u2019t be disappointed.] and another\u2014quite different\u2013from Dr. Larry Lesser,",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "matrix-encoding": {
    "term": "matrix-encoding",
    "cat": "Audio",
    "def": "A technique of storing more than two audio channels on a two-channel medium or transmission format. Dolby Surround is an example, where the center and surround channels are electronically encoded into the left and right channels of a stereo signal (usually by broadband 90\u00b0 phase shifting and summing). On playback, the center and surround channel are decoded from the left and right signals. The problem inherent with matrix-encoding is the mathematical dilemma of trying to solve for four unknowns (left, right, center & surround) when you only have two equations (the stereo signal); you can get close but you cannot get the exact right answer (so you always have crosstalk). This contrasts with today\u2019s discrete digital channels.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "matrix-mixer Similar": {
    "term": "matrix-mixer Similar",
    "cat": "Pro Audio Reference",
    "def": "to the matrix switcher (or router) below, but with additional signal processing features on all the inputs and outputs. With a matrix-mixer, not only can you assign any input to any output but you may add EQ, compression, change level, etc. Very elaborate models exist with as many as 32-channels in and 8 or more output channels (and as big as a Volkswagen). Also see mix-minus.",
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
  "MAU": {
    "term": "MAU",
    "cat": "Pro Audio Reference",
    "def": "(multistation access unit) See token ring.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MBLV": {
    "term": "MBLV",
    "cat": "Pro Audio Reference",
    "def": "(Mobile Beat Las Vegas) The number one trade show for mobile DJs.",
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
  "MCA-I": {
    "term": "MCA-I",
    "cat": "Pro Audio Reference",
    "def": "(Media Communications Association \u2013 International) See: ITVA",
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
    "cat": "Pro Audio Reference",
    "def": "(MiniDisc) Trademark term for the Sony digital audio recordable optical storage system utilizing data compression to reduce disc size.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MDCT": {
    "term": "MDCT",
    "cat": "Pro Audio Reference",
    "def": "(modified discrete cosine transform) Audio Compression. A popular audio coding technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MDM": {
    "term": "MDM",
    "cat": "Pro Audio Reference",
    "def": "(modular digital multitrack) Generic term used to describe any of the families of digital audio multitrack recorders. The most common examples being the Alesis ADAT series and the Tascam DA-88 series.",
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
  "MEDUSA": {
    "term": "MEDUSA",
    "cat": "Pro Audio Reference",
    "def": "(Mob Excess Deterrent Using Silent Audio) A microwave ray gun that beams sounds directly into people\u2019s brains, developed by Sierra Nevada Corporation. Short microwave bursts rapidly heat tissue, which causes a shockwave inside the skull that is detectable by the ears. Also see: Mosquito\u2122. [Ah yes, science at its best.]",
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
  "megabyte Popular": {
    "term": "megabyte Popular",
    "cat": "Pro Audio Reference",
    "def": "term meaning a million bytes but should be mebibytes. See mebi.",
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
  "MEIEA": {
    "term": "MEIEA",
    "cat": "Pro Audio Reference",
    "def": "(Music & Entertainment Industry Educators) An international organization formed in 1979 to bring together educators with leaders of the music and entertainment industries.",
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
  "MEMS": {
    "term": "MEMS",
    "cat": "Pro Audio Reference",
    "def": "(microelectromechanical systems) The acronym says it all. Check out this clearinghouse website for the latest info.",
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
  "meter Abbr. m 1.": {
    "term": "meter Abbr. m 1.",
    "cat": "Music",
    "def": "a. Division into measures or bars. b. A specific rhythm determined by the number of beats and the time value assigned to each note in a measure. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "meter ballistics": {
    "term": "meter ballistics",
    "cat": "Pro Audio Reference",
    "def": "Term describing the response characteristics of a meter indicator. Applies to all meters from original iron vane, taut-band or pivot & jewel mechanical analog designs to LED, LCD or plasma ladder arrays. Two universal standards exist for audio use: the VU meter and the PPM (peak program meter). The indicator attack (or rise) times are specified as well as the decay (or fall) rates along with the recommended detector method. Also see: peak hold.",
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
  "MFCC": {
    "term": "MFCC",
    "cat": "Pro Audio Reference",
    "def": "(mel-filtered cepstral coefficients) An important analysis parameter in CBID systems. These coefficients describe the harmonic spectrum shape perceived by the human auditory system, i.e., they characterize the shape of sound. For details, see Audible Magic, one of the leaders in CBID systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MFLOPS": {
    "term": "MFLOPS",
    "cat": "Pro Audio Reference",
    "def": "(pronounced \u201cmega-flops\u201d) (million floating point operations per second) A measure of computing power.",
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
    "cat": "Pro Audio Reference",
    "def": "(musical instrument) A broad term used to describe the musical instrument marketplace in general. Reference is made to \u201cthe MI market,\u201d or to a specific \u201cMI store.\u201d If a store sells band instruments, it is an MI store.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIAC": {
    "term": "MIAC",
    "cat": "Pro Audio Reference",
    "def": "(Music Industries Association of Canada) \u201cA national not-for-profit trade association that represents Canadian manufacturers, distributors and retailers of musical instruments and accessories, keyboards, sound reinforcement products and published music.\u201d",
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
  "mickey-mics See": {
    "term": "mickey-mics See",
    "cat": "Pro Audio Reference",
    "def": "mmF.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "micro- Prefix": {
    "term": "micro- Prefix",
    "cat": "Pro Audio Reference",
    "def": "for one millionth (10-6), abbreviated \u00b5.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microbar A": {
    "term": "microbar A",
    "cat": "Pro Audio Reference",
    "def": "unit of pressure equal to one millionth of a bar. [Not to be confused with microbrew.]",
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
  "microfiche One": {
    "term": "microfiche One",
    "cat": "Pro Audio Reference",
    "def": "millionth of a fish.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "micrometer Abbr": {
    "term": "micrometer Abbr",
    "cat": "Pro Audio Reference",
    "def": "\u00b5m A unit of length equal to one thousandth (10-3) of a millimeter or one millionth (10-6)of a meter.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "micron A": {
    "term": "micron A",
    "cat": "Pro Audio Reference",
    "def": "deprecated unit of measure equal to a micrometer, one-millionth of a meter. No longer used.",
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
  "omnidirectional A": {
    "term": "omnidirectional A",
    "cat": "Pro Audio Reference",
    "def": "response pattern that is as close to a perfect sphere as possible, i.e., it is not directional at all, or is a non-directional microphone. cardioid An on-axis response shaped like a cardioid with essentially no pickup to the rear. supercardioid cardioid-shaped response that includes small pickup directly to the rear. hypercardioid A cardioid-shaped response that includes greater rear pickup than the supercardioid design. subcardioid A cardioid-shaped response that does not tuck-in or null at the rear, instead has a smooth flat response to the rear. figure-of-eight A bidirectional microphone or one that responds equally front and rear and not at all to side sounds. shotgun The most directional response pattern, characterized by small sensitivity lobes on the left, right, and rear, with extreme sensitivity to the front. microphone positioning See: Positioning Microphones Cheat Sheet",
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
  "microphonic General. Any noise": {
    "term": "microphonic General. Any noise",
    "cat": "Audio",
    "def": "Electrical noise caused by mechanical or audio induced vibration of the object. Common examples are vacuum tubes where mechanical vibration of the tube causes modulation of the electrode current, and capacitors that induce noise when tapped or vibrated in any manner.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "microprocessor An": {
    "term": "microprocessor An",
    "cat": "Pro Audio Reference",
    "def": "integrated circuit that performs a variety of operations in accordance with a list of instructions. The core of a microcomputer or personal computer, a one chip computer.",
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
  "MIDI": {
    "term": "MIDI",
    "cat": "Pro Audio Reference",
    "def": "(musical instrument digital interface) Industry standard bus and protocol for interconnection and control of musical instruments. First launched in 1983, now generalized and expanded to include signal processing and lighting control. See MMA [Historical Note: MIDI began with Dave Smith, President of Sequential Circuits, who delivered an AES paper in the Fall of 1981 (The \u201cUSI,\u201d or Universal Synthesizer Interface by Dave Smith and Chet Wood, 70th AES Convention, 1981, preprint 1845). He is credited with the original concept, but he admits that the initial idea of needing some sort of standard interface originated by both Oberheim and Roland. Sources: Polyphony, February 1983, pp. 36-40 and an official IMA (International MIDI Association) publication, Exploring MIDI by David Droman in 1984.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "military music": {
    "term": "military music",
    "cat": "Pro Audio Reference",
    "def": "\u201cMilitary justice is to justice what military music is to music.\u201d \u2014 Groucho Marx [from Barber]",
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
  "MIM": {
    "term": "MIM",
    "cat": "Pro Audio Reference",
    "def": "(Music Instrument Museum) \u201cWith musical instruments from every country in the world, MIM will pay homage to the history and diversity of instruments and introduce museum guests to their varied and unique sounds. MIM will be an engaging, entertaining, and informative experience, in which the uninitiated and the knowledgeable, the young and the old will feel welcome.\u201d [From the website.] Here is a preview video.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIMO": {
    "term": "MIMO",
    "cat": "Pro Audio Reference",
    "def": "(pronounced \u201cmy-moh\u201d or \u201cme-moh\u201d) (multiple-input multiple-output) A broadcast technology utilizing multiple antennas at the transmitter and the receiver for better communication.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Minifon An": {
    "term": "Minifon An",
    "cat": "Pro Audio Reference",
    "def": "early portable dictating machine developed in the 1950s using wire recorder technology. An example of \u201cdead recording media.\u201d",
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
  "MIPA": {
    "term": "MIPA",
    "cat": "Pro Audio Reference",
    "def": "(Musikmesse International Press Awards) More than 100 international pro audio magazines award the best of each year\u2019s Musikmesse trade show.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MIPS": {
    "term": "MIPS",
    "cat": "Pro Audio Reference",
    "def": "(million instructions processed per second) A measure of computing power.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mix-minus A": {
    "term": "mix-minus A",
    "cat": "Pro Audio Reference",
    "def": "specialized matrix-mixer where there is one output associated with each input that includes all other inputs except the one it is associated with. (The output is the complete mix, minus the one input.) In this manner, the simplest mix-minus designs have an equal number of inputs and outputs (a square matrix). For example, if there were 8-inputs, there would be 8-outputs. Each output would consists of a mix of the seven other inputs, but not its own. Therefore Output 1, for instance, would consist of a mix of Inputs 2-8, while Output 2 would consist of a mix of Inputs 1 & 3-7, Output 3 would consist of a mix of Inputs 1,2 & 4-7, and so on. Primary usage is large conference rooms, where it is desirable to have the loudspeaker closest to each microphone exclude that particular microphone, so as to reduce the chance of feedback. See the RaneNote Introduction to Speech Reinforcement with Conferencing.",
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
  "MLP": {
    "term": "MLP",
    "cat": "Pro Audio Reference",
    "def": "(Meridian Lossless Packing) A lossless audio coding scheme developed by Meridian Audio Ltd. MLP has been selected as the optional coding scheme for use on DVD-Audio, as well as other transmission, storage and archiving applications. It is a true lossless coding technology, in that the recovered audio is bit-for-bit identical to the original. Unlike perceptual or lossy data reduction, MLP does not alter the final decoded signal in any way, but merely \u201cpacks\u201d the audio data more efficiently into a smaller data rate for transmission or storage. It is simple to decode and requires relatively low computational power for playback.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mirror ball": {
    "term": "mirror ball",
    "cat": "Pro Audio Reference",
    "def": "See: disco ball.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MLS": {
    "term": "MLS",
    "cat": "Pro Audio Reference",
    "def": "(maximum-length sequences) A time-domain-based analyzer using a mathematically designed test signal optimized for sound analysis. The test signal (a maximum-length sequence) is electronically generated and characterized by having a flat energy-vs.-frequency curve over a wide frequency range. Sounding similar to white noise, it is actually periodic, with a long repetition rate. This test signal is most often tailored to be pink noise, as the preferred response for fractional octave analysis. Similar in principle to impulse response testing \u2013 think of the maximum-length sequence test signal as a series of randomly distributed positive- and negative-going impulses. See: MLSSA",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MLSSA": {
    "term": "MLSSA",
    "cat": "Pro Audio Reference",
    "def": "(pronounced \u201cMelissa\u201d) (maximum-length sequences system analyzer) Trademarked name for the first MLS measurement instrument designed by DRA Laboratories (Sarasota, FL). M.R. Schroeder used maximum-length-sequences methods for room impulse response measurement in 1979 (based on work dating back to the mid-60\u2019s); however, it was not until 1987 that the use of MLS became commercially available. The first MLS instrument was developed and made practical by Douglas Rife, who described the principles in his landmark paper (co-authored by John Vanderkooy, University of Waterloo) \u201cTransfer-Function Measurement with Maximum-Length Sequences\u201d (J. Audio Eng. Soc., vol. 37, no. 6, June 1989), and followed up with new applications described in \u201cModulation Transfer Function Measurement with Maximum-Length Sequences\u201d (J. Audio Eng. Soc., vol. 40, no. 10, October 1992).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMA": {
    "term": "MMA",
    "cat": "Pro Audio Reference",
    "def": "(MIDI Manufacturers Association) The original source for information on MIDI technology, where companies work together to create the standards upon which MIDI compatibility is built.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMCD": {
    "term": "MMCD",
    "cat": "Pro Audio Reference",
    "def": "(multimedia compact disc) See DVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mmF (micro-micro-Farad) Capacitors": {
    "term": "mmF (micro-micro-Farad) Capacitors",
    "cat": "Pro Audio Reference",
    "def": "Old term used before pico- became standard. Pronounced \u201cmickey-mics\u201d by old-timers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMM": {
    "term": "MMM",
    "cat": "Pro Audio Reference",
    "def": "See: marvelous marble machine.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MMVF": {
    "term": "MMVF",
    "cat": "Pro Audio Reference",
    "def": "(multimedia video file) See DVD.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MNEC": {
    "term": "MNEC",
    "cat": "Pro Audio Reference",
    "def": "(Mass Notification & Emergency Communications) A trade organization providing resources for personnel working with the National Fire Alarm and Signaling Code (NFPA 72).",
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
  "MOBO": {
    "term": "MOBO",
    "cat": "Pro Audio Reference",
    "def": "(Music of Black Origin) An organization that \u201cidentifies, showcases and celebrates music derived from black heritage.\u201d A U.K. award show called the MOBO Awards.",
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
  "MOMM": {
    "term": "MOMM",
    "cat": "Pro Audio Reference",
    "def": "(Museum of Making Music) \u201cFounded in 1998 by the National Association of Music Merchants (NAMM), the Museum of Making Music was developed to showcase and celebrate the music products industry.\u201d [From website.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "monaural See": {
    "term": "monaural See",
    "cat": "Pro Audio Reference",
    "def": "mono.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mondegreen The": {
    "term": "mondegreen The",
    "cat": "Pro Audio Reference",
    "def": "term for representing a series of words resulting from the mishearing of a statement or song lyric. Variously attributed to Sylvia Wright, who is credited with coining the word in a 1954 Harper\u2019s column, and also to Jon Carroll by Pinker.",
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
  "monophonic See": {
    "term": "monophonic See",
    "cat": "Pro Audio Reference",
    "def": "mono.",
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
  "month One": {
    "term": "month One",
    "cat": "Pro Audio Reference",
    "def": "of the words in the English language without a rhyme \u2014 some others are \u201corange,\u201d \u201cpurple\u201d and \u201csilver.\u201d",
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
  "MOR": {
    "term": "MOR",
    "cat": "Pro Audio Reference",
    "def": "(magneto-optical recording) An erasable optical disc system using magnetic media and laser reading/writing.",
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
  "MOS-CQE": {
    "term": "MOS-CQE",
    "cat": "Pro Audio Reference",
    "def": "(Mean Opinion Score; Conversational Quality, Estimated) A measurement of voice quality in communication systems.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOSFET": {
    "term": "MOSFET",
    "cat": "Pro Audio Reference",
    "def": "(metal-oxide semiconductor field-effect transistor) See FET.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mosquito\u2122 Teenage": {
    "term": "Mosquito\u2122 Teenage",
    "cat": "Pro Audio Reference",
    "def": "Deterrent A security device used in the U.K. that emits a high-pitched scream at a frequency audible only to young people (roughly below the age of 20). With an effective range of about 20 meters, its aim is to break up loitering youths by annoyance and is, needless to say, a very controversial device. Also see: MEDUSA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "motional feedback": {
    "term": "motional feedback",
    "cat": "Pro Audio Reference",
    "def": "See servo-loop.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOTS": {
    "term": "MOTS",
    "cat": "Pro Audio Reference",
    "def": "(modified or modifiable off-the-shelf ) Government procurement term. Most often referencing software but general use is found. Compare with COTS, GOTS and NOTS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mountain Jam": {
    "term": "Mountain Jam",
    "cat": "Pro Audio Reference",
    "def": "Held at Hunter Mountain, in Hunter, NY, since 2005, is a four-day multi-stage event considered one of the top music festivals in the country.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MOV": {
    "term": "MOV",
    "cat": "Pro Audio Reference",
    "def": "(metal oxide varistor) See: TVS.",
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
  "Mozart was": {
    "term": "Mozart was",
    "cat": "Pro Audio Reference",
    "def": "approached by a young man, little older than a boy, who sought his advice on composing a symphony. Mozart pointed out that he was still very young and it might be better if he began by composing ballads. \u201cBut you wrote symphonies when you were only ten years old,\u201d objected the lad. \u201cBut I didn\u2019t have to ask how,\u201d Mozart retorted. [Bartlett\u2019s Book of Anecdotes]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MP3": {
    "term": "MP3",
    "cat": "Pro Audio Reference",
    "def": "(MPEG-1, Layer 3) A type of digital audio compression popularized for transmitting songs over the Internet. MP3 allows real-time audio streaming for Internet encoding and downloading. MP3 files are identified by the suffix \u201c.MP3\u201d Typically MP3 compresses CD-quality audio down to about one minute per 1MB file size.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPEG": {
    "term": "MPEG",
    "cat": "Pro Audio Reference",
    "def": "(Moving Picture Experts Group) A working group within SMPTE who set, among other things, specifications for compression schemes for audio and video transmission. A term commonly used to make reference to their image-compression scheme (MPEG-2) for full motion video.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPEG-2": {
    "term": "MPEG-2",
    "cat": "Pro Audio Reference",
    "def": "See AAC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPEG-4": {
    "term": "MPEG-4",
    "cat": "Pro Audio Reference",
    "def": "Structured Audio This specifies a set of tools that allow powerful and flexible description of sound in a variety of ways, all based on what has become known as \u201cstructured audio,\u201d meaning transmitting sound by describing it rather than compressing it. Also see: SLS",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPGA": {
    "term": "MPGA",
    "cat": "Pro Audio Reference",
    "def": "(Music Producers Guild of the Americas) The original professional guild for music producers and audio recording engineers, however in 2000, the Recording Academy absorbed it and established the Producers & Engineers Wing.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MPX": {
    "term": "MPX",
    "cat": "Pro Audio Reference",
    "def": "Abbreviation for multiplex as found in FM analog stereo broadcasting.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MR": {
    "term": "MR",
    "cat": "Pro Audio Reference",
    "def": "(magnetoresistive) A technology based on the effect where electrical resistance in a material changes when brought in contact with a magnetic field",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mr": {
    "term": "Mr",
    "cat": "Pro Audio Reference",
    "def": "Mojo Risin Lyrics Anagram constructed from \u201cJim Morrison\u201d used in the Doors song, L.A. Woman.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "M/S": {
    "term": "M/S",
    "cat": "Pro Audio Reference",
    "def": "or M-S (mid-side or mono-stereo) microphone technique. Invented by Alan Blumlein and awarded US Patent 429,054, \u201cImprovements in and relating to Sound-Transmission, Sound-Recording and Sound Reproducing Systems, filed in February 1934. It was first commercialized in the mid \u201950s by the Danish radio engineer Holger Lauridsen (H. Lauridsen & F. Schlegel, \u201cStereophonie und richtungsdiffuse Klangwiedergabe,\u201d Gravesaner Bl\u00e4tter, 1956, Nr. V, August, S.28-50). It is a method for capturing stereophonic sound using two microphones. One microphone with a cardioid response (although any polar pattern will work) is aimed straight ahead toward the sound source (this is the mid or mono M part), and a second microphone with a figure-8 (or bipolar) response is placed so that the two lobes are directed toward the sides (this is the side or stereoS part). The two signals are then combined using an M-S matrix circuit that yields two signals: M+S and M-S. See Streicher & Everest for complete details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MS-DOS\u00ae": {
    "term": "MS-DOS\u00ae",
    "cat": "Pro Audio Reference",
    "def": "(Microsoft\u00ae disk operating system) Microsoft\u2018s registered trademark for their PC operating system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSB": {
    "term": "MSB",
    "cat": "Pro Audio Reference",
    "def": "(most significant bit) The bit within a digital word that represents the biggest possible single-bit coded value.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSM": {
    "term": "MSM",
    "cat": "Pro Audio Reference",
    "def": "(mid-side-mid, also called Double MS) An extension of the M-S microphone technique using two coincident M-S pairs sharing the same side-facing figure-of-eight microphone, one pairing for the Front L and R and the other pairing for the surrounds Ls and Rs (from Mike Skeet\u2019s article \u201cMSM Mic Surround Technique,\u201d Audio Media, May 2003, pp. 58-59.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSO": {
    "term": "MSO",
    "cat": "Pro Audio Reference",
    "def": "(Music Store Owners) Originally called iSMO (Independent Music Store Owners) this organization exists to serve as a link between dealers, manufacturers and the public.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MSPS": {
    "term": "MSPS",
    "cat": "Pro Audio Reference",
    "def": "(million samples per second or megasamples per second) A measurement of data converter speed.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MTBF": {
    "term": "MTBF",
    "cat": "Pro Audio Reference",
    "def": "(mean time between failure) Reliability Analysis. A measure based on statistical experience of how reliable a hardware product or component is, expressing in thousands or tens of thousands of hours as the predicted average time between failures.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MTC": {
    "term": "MTC",
    "cat": "Pro Audio Reference",
    "def": "(MIDI time code) See time code.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MTTR": {
    "term": "MTTR",
    "cat": "Pro Audio Reference",
    "def": "(mean time to repair or mean time to recovery) Reliability Analysis. A measure of the maintainability of a piece of equipment. It is the average time required to fix any removable item in a product or system. Helpful in analyzing how long repairs and maintenance tasks will take in the event of a system failure.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "mu Vacuum Tubes": {
    "term": "mu Vacuum Tubes",
    "cat": "Pro Audio Reference",
    "def": "Symbol for the tube\u2019s amplification factor.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "MuchMusic Canada\u2019s": {
    "term": "MuchMusic Canada\u2019s",
    "cat": "Pro Audio Reference",
    "def": "MTV-like cable music channel.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Mu Law Telecommunications": {
    "term": "Mu Law Telecommunications",
    "cat": "Pro Audio Reference",
    "def": "The PCM voice coding and companding standard used in Japan and North America. [Newton] Contrast with A Law used in Europe.",
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
  "multing See": {
    "term": "multing See",
    "cat": "Pro Audio Reference",
    "def": "mult.",
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
    "cat": "Pro Audio Reference",
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
  "MUSICAM": {
    "term": "MUSICAM",
    "cat": "Pro Audio Reference",
    "def": "(masking pattern adapted universal sub-band integrated coding and multiplexing) A flexible bit rate reduction standard for high quality audio. Jointly developed for digital audio broadcast by CCETT in France, IRT in Germany and Philips in the Netherlands.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "Music Genome": {
    "term": "Music Genome",
    "cat": "Pro Audio Reference",
    "def": "Project\u00a9 A mathematical algorithm, granted US Patent Number 7003515, developed by its inventors to identify and describe music based on over 400 attributes. Using this algorithm it is possible to know a song\u2019s genre without listening to it.",
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
  "music note": {
    "term": "music note",
    "cat": "Pro Audio Reference",
    "def": "value Click the link.",
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
  "Musikmesse The": {
    "term": "Musikmesse The",
    "cat": "Pro Audio Reference",
    "def": "world\u2019s largest music trade show held annually in Frankfurt, Germany.",
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
  "mute A": {
    "term": "mute A",
    "cat": "Pro Audio Reference",
    "def": "control found on recording consoles, some mixers, and certain signal processing units that silences (mutes) a signal path, or output. Various uses.",
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
  "Mysteryland Billed": {
    "term": "Mysteryland Billed",
    "cat": "Pro Audio Reference",
    "def": "as the oldest EDM festival, held annually in the Netherlands since 1993. Now expanded into Mysteryland USA held in Bethel Woods, NY, the site of the famous 1969 Woodstock festival.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (M)"
  },
  "N": {
    "term": "N",
    "cat": "Pro Audio Reference",
    "def": "See: newton.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAB": {
    "term": "NAB",
    "cat": "Pro Audio Reference",
    "def": "(National Association of Broadcasters) A professional trade organization for people working in the radio and television industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NACFM": {
    "term": "NACFM",
    "cat": "Pro Audio Reference",
    "def": "(National Association of Church Facility Managers) \u201cA non-profit organization established in 1995 to promote networking and educational advancement opportunities for Facilities Management Professionals. NACFM provides an informational resource for church and religious facility management professionals by discussion groups, forums, panels, lectures, seminars, or similar programs or activities (such as this web site) designed to fulfill the purposes of the organization.\u201d Another great resource for audio contractors, integrators, etc.",
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
  "NAMA": {
    "term": "NAMA",
    "cat": "Pro Audio Reference",
    "def": "(Native American Music Awards) See NAMMYS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NAMM": {
    "term": "NAMM",
    "cat": "Pro Audio Reference",
    "def": "(National Association of Music Merchants is the original name; today it is officially the International Music Products Association but they didn\u2019t change the acronym) A professional trade organization for people working in the music business \u2014 primarily in retailing and manufacturing of music making products. [Popular saying is that NAMM means Not Available; Maybe May.]",
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
  "nanotechnology The": {
    "term": "nanotechnology The",
    "cat": "Pro Audio Reference",
    "def": "science and technology of building electronic circuits and devices from single atoms and molecules.",
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
  "NAPRS": {
    "term": "NAPRS",
    "cat": "Pro Audio Reference",
    "def": "(Nashville Association of Professional Recording Services) Established in 1995 to promote Nashville\u2019s finest recording studios, services and engineers worldwide; dissolved in 2009.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NARAS": {
    "term": "NARAS",
    "cat": "Pro Audio Reference",
    "def": "(National Academy of Recording Arts & Science) See The Recording Academy.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NARM": {
    "term": "NARM",
    "cat": "Pro Audio Reference",
    "def": "(National Association of Recording Merchandisers) An industry organization made up primarily of music retailers acting as an advocate body for the common interests of merchandisers and distributors of music to industry and public policy makers.",
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
    "cat": "Pro Audio Reference",
    "def": "(noise criterion) curves A unit of measurement for the ambient or background noise level of occupied indoor spaces, i.e., a measure of its noisiness \u2014 true story; real word. The measured noise spectrum (done in octave bands using an SPL meter) is compared against a series of standard noise criteria (NC) curves to determine the \u201cNC level\u201d of the space. The standard NC curves take into account the equal loudness contours of Fletcher-Munson to accurately reflect the listening experience. Each NC curve is assigned a number (in 5 dB increments) corresponding to the octave band SPL measured over the octave centered at approximately 1500 Hz. A space is then said to have a background noise level of \u201cNC-20,\u201d for instance, which would be very quiet, comparable to a quality recording studio. Compare with RC rating.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-end Telecommunication": {
    "term": "near-end Telecommunication",
    "cat": "Pro Audio Reference",
    "def": "term referring to your end; the local room, as opposed to the far-end.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "near-end crosstalk": {
    "term": "near-end crosstalk",
    "cat": "Pro Audio Reference",
    "def": "Crosstalk that is propagated in a disturbed channel in the direction opposite to the direction of propagation of the signal in the disturbing channel. The terminals of the disturbed channel, at which the near-end crosstalk is present, and the energized terminal of the disturbing channel, are usually near each other. [IEEE Std 802.5]",
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
  "NEC": {
    "term": "NEC",
    "cat": "Pro Audio Reference",
    "def": "(National Electrical Code) The name for the United States electrical safety standard (NFPA-70).",
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
  "neigh The": {
    "term": "neigh The",
    "cat": "Pro Audio Reference",
    "def": "long, high-pitched sound made by a horse. To utter the characteristic sound of a horse; whinny. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NEMA": {
    "term": "NEMA",
    "cat": "Pro Audio Reference",
    "def": "(National Electrical Manufacturing Association) Founded in 1926 and headquartered in Rosslyn, VA.",
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
  "neural spectrogram Hearing": {
    "term": "neural spectrogram Hearing",
    "cat": "Pro Audio Reference",
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
  "ney See:": {
    "term": "ney See:",
    "cat": "Pro Audio Reference",
    "def": "nay.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NFF": {
    "term": "NFF",
    "cat": "Pro Audio Reference",
    "def": "(near-field focalization) See: focalization.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "ngoni Musical Instrument": {
    "term": "ngoni Musical Instrument",
    "cat": "Pro Audio Reference",
    "def": "A West African stringed instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nibble A": {
    "term": "nibble A",
    "cat": "Pro Audio Reference",
    "def": "group of four bits or half a byte (8-bits). Also called a quartet.",
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
  "NIH": {
    "term": "NIH",
    "cat": "Pro Audio Reference",
    "def": "(not invented here) Popular abbreviation found in technology land, used to described a prima donna corporate attitude that everything they do must be original. Stems from an unhealthy attitude that the only solution worthy is their solution, thus rejecting ideas and inventions not theirs. Makes for very unproductive and unhappy engineering teams.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIME (New Interfaces for Musical Expression)": {
    "term": "NIME (New Interfaces for Musical Expression)",
    "cat": "Music",
    "def": "International organization for the development of new musical interface design.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nipper The": {
    "term": "Nipper The",
    "cat": "Pro Audio Reference",
    "def": "famous \u201cHis Master\u2019s Voice\u201d RCA dog. A bull terrier and fox terrier mix born in 1884 and named for his propensity to nip at peoples\u2019 legs.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NIST": {
    "term": "NIST",
    "cat": "Pro Audio Reference",
    "def": "(National Institute of Standards and Technology) Government organization who produces (among vastly other things) Special Publication 811: Guide for the Use of the International System of Units (SI), the authority on this subject.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "Nixie tube Vacuum Tubes": {
    "term": "Nixie tube Vacuum Tubes",
    "cat": "Pro Audio Reference",
    "def": "A numerical read-out cold-cathode tube first developed by Haydu Brothers Laboratories in 1955, later purchased by Burroughs Corporation who registered the name. The name Nixie was derived by Burroughs from \u201cNIX I\u201d, an abbreviation of \u201cNumeric Indicator eXperimental No. 1.\u201d Hit the link for photos.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "No also Noh Theater": {
    "term": "No also Noh Theater",
    "cat": "Pro Audio Reference",
    "def": "The classical drama of Japan, with music and dance performed in a highly stylized manner by elaborately dressed performers on an almost bare stage. [AHD] Similar but older than Kabuki.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "node": {
    "term": "node",
    "cat": "Acoustics",
    "def": "A point of minimum amplitude in a one-dimensional standing wave field. A nodal line is a line of minimum amplitude in a two-dimensional filed, and a nodal surface is a surface of minimum amplitude in a three-dimensional field. [Morfey]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "node Electronic Circuits. A": {
    "term": "node Electronic Circuits. A",
    "cat": "Physics",
    "def": "A point or region of virtually zero amplitude in a periodic system.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise General. Sound or": {
    "term": "noise General. Sound or",
    "cat": "Physics",
    "def": "A disturbance, especially a random and persistent disturbance, that obscures or reduces the clarity of a signal. Computer Science. Irrelevant or meaningless data. From Latin meaning nausea, discomfort and seasickness. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise cancelling": {
    "term": "noise cancelling",
    "cat": "Pro Audio Reference",
    "def": "headphones Special headphones incorporating a microphone built into the headset that samples the ambient sound and adds it back out-of-phase to the headphone signal. This method actively cancels or nulls out background noise \u2014 works best with low frequencies. See Sennheiser NoiseGard\u00ae for an interesting demo.",
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
    "cat": "Pro Audio Reference",
    "def": "dBA: 8 hours max 95 dBA: 4 hours max 100 dBA: 2 hours max 105 dBA: 1 hour max 110 dBA: 30 minutes max 115 dBA: 15 minutes max",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise figure": {
    "term": "noise figure",
    "cat": "Pro Audio Reference",
    "def": "The ratio between the Johnson noise (or thermal noise) of the equivalent input resistance of a circuit and its measured noise, expressed in decibels. It is the ratio of the output noise to the input noise, so the answer is always positive, with a theoretically noise-free device having a noise figure of 0 dB.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "noise floor": {
    "term": "noise floor",
    "cat": "Pro Audio Reference",
    "def": "Normally the lowest threshold of useful signal level, i.e., the residual noise with no signal present (although sometimes audible signals below the noise floor can be recovered).",
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
  "NOM": {
    "term": "NOM",
    "cat": "Pro Audio Reference",
    "def": "(number of open mics) An acronym believed first created in 1967, or 1968, by Bill Snow after he retired from Bell Labs and went to work at Altec Lansing Research. It\u2019s use was popularized by Dan Dugan, the father of the automatic microphone mixer and Altec Lansing, the manufacturer of his first design. In Dan\u2019s original design, the automatic mic mixer, like human operators, turned the gain down on unused mic channels and turned the gain up on active channels, all the while ensuring that the overall level remained roughly constant. As a rough approximation, each doubling of the number of open mics (NOM) cuts the gain by 3 dB, i.e., as more mics are opened up the mic mixer reduces overall gain. If not, as mics open and close, the reverberation and ambient noise fluctuates unacceptably. NOM attenuation techniques work to provide the gain, stability, and low noise qualities of a single open mic with the benefits of multiple mics. [Historical Note: This concept was first written about by C.P. Boner & R.E. Boner, in their paper \u201cThe Gain of a Sound System\u201d April 1969, reproduced in Sound Reinforcement: An Anthology (Audio Engineering Society, NY, 1978.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nominal This": {
    "term": "nominal This",
    "cat": "Pro Audio Reference",
    "def": "word has several definitions but the one of importance to pro audio is its engineering sense meaning: insignificantly small; trifling: a nominal amount. It can also mean \u201caccording to plan or design.\u201d [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NOMM": {
    "term": "NOMM",
    "cat": "Pro Audio Reference",
    "def": "(number of open mics & mixers) A term created by Rane Corporation extending the concept of NOM (above) to include multiple mixers as well as microphones. As used by Rane, it is NOM-like in that feedback stability is maintained, however, since large systems have mics across multiple mixers, Rane includes these mixers in the NOMM calculation. For example, in audio conferencing, when the chairman is speaking and someone else quickly answers \u201cyes,\u201d coughs, or drops a pen, most mic mixers running in NOM mode are annoying because they reduce the level of the chairman mic just because someone else made a noise. The Rane NOMM approach avoids this annoyance by keeping the chairman\u2019s mic at the same gain while still allowing the interruption to be heard, yet at a reduced gain from its full gated level.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "nomogram 1": {
    "term": "nomogram 1",
    "cat": "Pro Audio Reference",
    "def": "A graph consisting of three coplanar curves, each graduated for a different variable so that a straight line cutting all three curves intersects the related values of each variable. 2. A chart representing numerical relationships. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "non-acoustic voice": {
    "term": "non-acoustic voice",
    "cat": "Pro Audio Reference",
    "def": "sensor A device that can detect a person\u2019s voice without the person actually speaking out loud. See TERC.",
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
  "nonvolatile Refers": {
    "term": "nonvolatile Refers",
    "cat": "Pro Audio Reference",
    "def": "to a memory device that does not lose its data when power is removed from the system.",
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
  "NOTS": {
    "term": "NOTS",
    "cat": "Pro Audio Reference",
    "def": "(NATO off-the-shelf or niche off-the-shelf) Government procurement term. Most often referencing software but general use is found. Compare with COTS, MOTS and GOTS.",
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
    "cat": "Pro Audio Reference",
    "def": "See: noise reduction.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NRE": {
    "term": "NRE",
    "cat": "Pro Audio Reference",
    "def": "(non-recurring engineering charge) A one-time engineering charge for product development, separate from royalty or licensing fees.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NRW+E": {
    "term": "NRW+E",
    "cat": "Pro Audio Reference",
    "def": "(Nashville Recording Workshop and Expo) Yearly Nashville event dedicated to \u201cHelping Creative People Make Better Recordings.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NRZ": {
    "term": "NRZ",
    "cat": "Pro Audio Reference",
    "def": "(non-return to zero) A system of binary code where one\u2019s are usually represented by a positive voltage and zeroes by a negative number, i.e., neither is ever zero volts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NSCA": {
    "term": "NSCA",
    "cat": "Pro Audio Reference",
    "def": "(National Systems Contractors Association) \u201cFounded in 1980 as the National Sound Contractors Association, the NSCA underwent a name change in 1994 to better reflect the diversification found within the hi-tech industry of electronic systems. Rather than focusing solely on the installation of audio systems, today\u2019s innovative member companies of the NSCA expanded into other fields, including audio, video, intercom/paging, telecommunications, security/access control, and many others.\u201d [from NSCA website]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NSP": {
    "term": "NSP",
    "cat": "Pro Audio Reference",
    "def": "(native signal processing) Intel-designed method of using a powerful microprocessor (like their Pentium CPU) for signal processing functions normally done by separate DSP chips. Not finding many backers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NSSP": {
    "term": "NSSP",
    "cat": "Pro Audio Reference",
    "def": "(National Standards Systems Network) A Web-based service launched by ANSI, along with government and industry partners. A full search & sales service provides for locating and buying virtually any standard. More than 100,000 global standards are available. Over 25 standards groups provide technical specs for this database, including ISO. The EIA endorsed the project.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NTMTM": {
    "term": "NTMTM",
    "cat": "Pro Audio Reference",
    "def": "Crossover Filter (Neville Thiele MethodTM Crossover Filter) Trademarked term for the patented (U.S. Patent 6,854,005) technology developed by Neville Thiele for Whise Acoustics in Australia. Two choices were offered, a 4th-order with rolloff slopes of 36 dB/octave and an 8th-order with 52 dB/octave slopes. The published curves resemble 4th- and 8th-order cascaded elliptic filters. Rod Elliot of Elliot Sound Products explores the details in his paper: NTM\u2122 Crossovers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (N)"
  },
  "NTSC": {
    "term": "NTSC",
    "cat": "Pro Audio Reference",
    "def": "(National Television Standards Committee) The United States and Japan standard for color formatting for television transmission developed in the 1950s. Compare with PAL/SECAM.",
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
  "OAG": {
    "term": "OAG",
    "cat": "Pro Audio Reference",
    "def": "(old analog guy) As opposed to a YDG.",
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
  "OCA": {
    "term": "OCA",
    "cat": "Pro Audio Reference",
    "def": "(Open Control Architecture) An alliance of pro audio manufacturers with the goal of creating an open public communications standard for control and monitoring of devices in professional media networks.",
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
  "occlusion or occlusion effect Hearing": {
    "term": "occlusion or occlusion effect Hearing",
    "cat": "Pro Audio Reference",
    "def": "The phenomenon resulting from wearing solid earplugs, hearing aids or some personal monitors that makes the wearer\u2019s voice sound hollow and boomy to themselves, i.e., a voice-in-a-barrel effect. The earplugs block the ear canal resulting in a sound similar to sticking a finger in each ear and talking. This closure effect also produces louder sounds to the wearer since the ear canal blockage allows additional sound pressure to build up (rather than escape out the open ear canal) and be conducted to the inner ear. This is easily demonstrated by pronouncing and sustaining the word \u201cfee,\u201d then sticking your fingers in your ears and notice how much louder it sounds (oh go ahead, no one is looking).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "octal A": {
    "term": "octal A",
    "cat": "Pro Audio Reference",
    "def": "number system using the base-8, i.e., each digit can be any of 8 values, represented by the digits 0-7. A three-bit binary number (since 23 = 8) can also represent each octal digit.",
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
  "octothorpe The": {
    "term": "octothorpe The",
    "cat": "Pro Audio Reference",
    "def": "\u201c#\u201d symbol on the telephone keypad, also known as a pound sign, crosshatch, number sign, sharp, hash, crunch, mesh, hex, flash, grid, pig-pen, gate, hak, oof, rake, fence, gate, grid, gridlet, square, and widget mark. Click the link to read the history of this creative word.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Oddmusic.com A": {
    "term": "Oddmusic.com A",
    "cat": "Pro Audio Reference",
    "def": "terrific website for unusual and bazaar music-making creations.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OEM": {
    "term": "OEM",
    "cat": "Pro Audio Reference",
    "def": "(original equipment manufacturer) The true manufacturer of equipment sold under another name.",
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
  "OFC (oxygen-free copper) Wire & Cables": {
    "term": "OFC (oxygen-free copper) Wire & Cables",
    "cat": "Pro Audio Reference",
    "def": "Another of the popular audiophile myths that OFC power cables can improve sound. See Howard Johnson\u2019s wonderful essay titled: OFC madness: Facts, not fantasy, regarding power cables for high-end audio equipment.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "O+": {
    "term": "O+",
    "cat": "Pro Audio Reference",
    "def": "Festival Festival that began in Kingston, NY in 2010, and is now expanding to other venues like the one held in 2013 in San Francisco. This is a festival celebrating music and the arts.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "off-axis response": {
    "term": "off-axis response",
    "cat": "Pro Audio Reference",
    "def": "Any direction other than the on-axis response, i.e., the response measured along the imaginary straight line drawn through the geometric center of an object. In pro audio most often used in measurements of loudspeakers, microphones and humans.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "offset The start or": {
    "term": "offset The start or",
    "cat": "Pro Audio Reference",
    "def": "[AHD] Within pro audio typical offset categories are level, time, phase, and wavelength.",
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
  "OHCI": {
    "term": "OHCI",
    "cat": "Pro Audio Reference",
    "def": "(Open Host Controller Interface) Networks. Based on the IEEE-1394 specification, however, it goes beyond the basic specs. It allows for hard drives, CDR\u2019s, scanners, audio and video devices, digital still cameras, mixers, and more to be controlled.",
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
  "Ohm\u2019s Acoustic": {
    "term": "Ohm\u2019s Acoustic",
    "cat": "Pro Audio Reference",
    "def": "Law The law stating that a complex musical sound is heard as the sum of a number of distinct pure tones which can be resolved by Fourier analysis [OED]. [After Georg Simon Ohm.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Ohm\u2019s Electrical": {
    "term": "Ohm\u2019s Electrical",
    "cat": "Pro Audio Reference",
    "def": "Law The law stating that the direct current flowing in a conductor is directly proportional to the potential difference between its ends. It is usually formulated as V = IR, where V is the potential difference, or voltage, I is the current, and R is the resistance of the conductor. [After Georg Simon Ohm.] [Note: Georg Ohm did NOT formulate the basic power equations; that was done by James Joule: see Joule\u2019s Law.]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ohnosecond A": {
    "term": "ohnosecond A",
    "cat": "Pro Audio Reference",
    "def": "very short moment in time during which you realize that you have pressed the wrong key and deleted hours, days, or weeks of work. [Whatis.com]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OIART": {
    "term": "OIART",
    "cat": "Pro Audio Reference",
    "def": "(Ontario Institute of Audio Recording Technology) This Canadian school offers a three-term, forty-six week immersion course designed to prepare graduates for a career in the professional audio recording and audio communications industry.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OITC": {
    "term": "OITC",
    "cat": "Pro Audio Reference",
    "def": "(outdoor-indoor transmission class) Noise Measurement. A sound isolation measurement protocol, used to indicate the rate of sound transmission between outdoor and indoor spaces.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Okedo Daiko Muscial Instrument": {
    "term": "Okedo Daiko Muscial Instrument",
    "cat": "Pro Audio Reference",
    "def": "Japanese two-headed percussion drum.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oldest musical": {
    "term": "oldest musical",
    "cat": "Pro Audio Reference",
    "def": "instrument A 35,000-year-old flute found in Germany is believed to be the first musical instrument.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OLED": {
    "term": "OLED",
    "cat": "Pro Audio Reference",
    "def": "(organic light emitting diode) A type of LED display made from organic polymers (think plastic that glows) that provides a wide viewing angle and uses low power. OLED displays do not require a backlight as do LCD screens. OLED screens can also be fabricated on plastic as well as glass substrates, making them more flexible and durable. See OLED for details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OL": {
    "term": "OL",
    "cat": "Pro Audio Reference",
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
  "omnidirectional microphone": {
    "term": "omnidirectional microphone",
    "cat": "Pro Audio Reference",
    "def": "One with a response pattern that is as close to a perfect sphere as possible. Receives sound from all directions equally well. Compare with unidirectional mic and cardioid microphone.",
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
  "one-third octave": {
    "term": "one-third octave",
    "cat": "Pro Audio Reference",
    "def": "SPL The sound pressure level of the sound contained within a one-third octave frequency band.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "onomastics 1": {
    "term": "onomastics 1",
    "cat": "Pro Audio Reference",
    "def": "a. The study of the origins and forms of proper names. b. The study of the origins and forms of terms used in specialized fields. 2. The system that underlies the formation and use of proper names or terms used in specialized fields. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "onomatopoeia The": {
    "term": "onomatopoeia The",
    "cat": "Pro Audio Reference",
    "def": "formation or use of words such as buzz, hiss, splash, sizzle or murmur that imitate the sounds associated with the objects or actions they refer to. [AHD] See zaa zaa.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "oompah": {
    "term": "oompah",
    "cat": "Music",
    "def": "A rhythmic sound made by a tuba or other brass instrument. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OOP": {
    "term": "OOP",
    "cat": "Pro Audio Reference",
    "def": "See object-oriented.",
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
    "cat": "Pro Audio Reference",
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
  "OR Computer Science & Logic": {
    "term": "OR Computer Science & Logic",
    "cat": "Pro Audio Reference",
    "def": "A Boolean logical operator that returns a true value if one or both operators are true; a form of addition. For example, two parallel connected switches, A and B, requires one or both be closed for current to pass, thus it requires switch A OR switch B closed to operate.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "orange One": {
    "term": "orange One",
    "cat": "Pro Audio Reference",
    "def": "of the words in the English language without a rhyme \u2014 some others are \u201cmonth,\u201d \u201cpurple,\u201d and \u201csilver.\u201d",
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
  "organ of Corti Hearing": {
    "term": "organ of Corti Hearing",
    "cat": "Pro Audio Reference",
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
  "ORTF": {
    "term": "ORTF",
    "cat": "Pro Audio Reference",
    "def": "(Office de Radiodiffusion \u2014 Television Francaise) An initialism formed from the name of the French national broadcasting system, who designed a stereo microphone recording technique known as the ORTF method. The technique uses two cardioid microphones with a spacing of 17 cm between the microphone diaphragms, and with an 110\u00b0 angle between the capsules. This technique reproduces stereo cues similar to those used by the human ear to perceive directional information in the horizontal plane. The spacing of the microphones emulates the distance between the human ears, and the angle between the two directional microphones emulates the shadow effect of the human head. The ORTF stereo technique provides the recording with a wider stereo image than X-Y stereo while still preserving good mono information.",
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
  "OSD": {
    "term": "OSD",
    "cat": "Pro Audio Reference",
    "def": "(optimal source distribution) Localization. A system to eliminate or improve the degradation caused by cross-talk cancellation techniques used in binaural sound reproduction.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OSHA U.S": {
    "term": "OSHA U.S",
    "cat": "Pro Audio Reference",
    "def": "Occupational Safety and Health Administration",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "Osheaga A": {
    "term": "Osheaga A",
    "cat": "Pro Audio Reference",
    "def": "music and arts festival held on Montreal\u2019s Saint Helen\u2019s Island, is considered one of the most important festivals of its genre in Canada. Known as The Festival de la Musique et des Arts to Montreal natives..",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OSI": {
    "term": "OSI",
    "cat": "Pro Audio Reference",
    "def": "(open system interconnection) The only internationally accepted framework of standards for communication between different systems made by different vendors. The model originally developed by ISO describing computer communication services and protocols without making assumptions concerning language, operating systems or application issues. The main goal is to create an open systems networking environment where any vendor\u2019s computer system, connected to any network, can freely share data with any other computer system on that network See The 7 Layers of the OSI Model.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ossicles Hearing": {
    "term": "ossicles Hearing",
    "cat": "Pro Audio Reference",
    "def": "The group of the three bones of the middle ear commonly known as the hammer, anvil and stirrup.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "ostinato": {
    "term": "ostinato",
    "cat": "Music",
    "def": "A short melody or pattern that is constantly repeated, usually in the same part at the same pitch. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "otacoustic Hearing": {
    "term": "otacoustic Hearing",
    "cat": "Pro Audio Reference",
    "def": "Any external apparatus that improves hearing, e.g., an ear trumpet.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OTL (output transformerless) Power Amplifiers": {
    "term": "OTL (output transformerless) Power Amplifiers",
    "cat": "Pro Audio Reference",
    "def": "Historically vacuum tube power amplifiers had output transformers that isolated the high output impedance of the tubes and the low impedance of the loudspeaker load. Years later tube amplifiers evolved into cathode follower designs that no longer required output transformers, thus they became \u201coutput transformerless.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "otoacoustic emission Hearing": {
    "term": "otoacoustic emission Hearing",
    "cat": "Pro Audio Reference",
    "def": "Sound generated from the inner ear and observable as sound in the external ear canal.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "otolaryngology Hearing": {
    "term": "otolaryngology Hearing",
    "cat": "Pro Audio Reference",
    "def": "The branch of science that treats diseases of the ear, nose and throat.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "OTPROM": {
    "term": "OTPROM",
    "cat": "Pro Audio Reference",
    "def": "(one-time programmable read-only memory) A redundant term, incorrectly used to mean PROM \u2014 a PROM, by definition, is a one-time device.",
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
  "oval window Hearing": {
    "term": "oval window Hearing",
    "cat": "Pro Audio Reference",
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
  "overs A": {
    "term": "overs A",
    "cat": "Pro Audio Reference",
    "def": "term associated with A/D converters used to describe input signals exceeding the full scale range (0 dBFS). Overs indicators vary from simple single LEDs to elaborate calibrated digital meters. To be of genuine value the overs indicator, however displayed, must be based on reading the true digital code associated with the input level. It is important to distinguish between 0 dBFS and overs; they are not the same. 0 dBFS is the absolute highest voltage level that any particular A/D can convert. It produces the equivalent of a digital code consisting of all 1s. No digital level can exceed 0 dBFS. A 0 dBFS voltage level and all levels greater than this produce the same output code of all 1s. A true overs indicator actually counts the number of times that the 0 dBFS level was exceeded and displays this number. As yet there is no standard as to how many samples exceeding 0 dBFS constitutes an over. Everyone agrees that very brief excursions beyond 0 dBFS (producing digital clipping) cannot be heard; however no such agreement exists as to just how many samples it takes before an over is audible.",
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
    "cat": "Pro Audio Reference",
    "def": "From Frank Baum\u2019s \u201cThe Wizard of Oz,\u201d the name was created when he looked at his filing cabinet and saw \u201cA-N,\u201d and \u201cO-Z,\u201d hence \u201cOz.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (O)"
  },
  "P2C2E": {
    "term": "P2C2E",
    "cat": "Pro Audio Reference",
    "def": "(process too complex to explain) [Thanks, Lou!]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "P2P": {
    "term": "P2P",
    "cat": "Pro Audio Reference",
    "def": "See peer-to-peer.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "p": {
    "term": "p",
    "cat": "Pro Audio Reference",
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
    "cat": "Pro Audio Reference",
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
  "PAC": {
    "term": "PAC",
    "cat": "Pro Audio Reference",
    "def": "(Perceptual Audio Coder) Proprietary bit reduction scheme originally developed by Elemedia, a subsidiary of Bell Labs.",
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
  "PAE": {
    "term": "PAE",
    "cat": "Pro Audio Reference",
    "def": "(patent assertion entities) The politically correct term for \u201cpatent trolls.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAG (potential acoustic gain)": {
    "term": "PAG (potential acoustic gain)",
    "cat": "Acoustics",
    "def": "The calculated gain that a sound system can achieve at or just below the point of feedback. [Vear]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAL\u00ae": {
    "term": "PAL\u00ae",
    "cat": "Pro Audio Reference",
    "def": "(programmable array logic) Original registered trademark of Monolithic Memories Inc. (now owned by Advanced Micro Devices, Inc.) for their fuse-link once-programmable logic parts that have a programmable AND array, but a predefined OR array. See also PLA, PLD & FPGA.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAL/SECAM": {
    "term": "PAL/SECAM",
    "cat": "Pro Audio Reference",
    "def": "(phase alternated line/sequential couleur avec memoire or sequential color with memory) The European and Australian standard for color formatting for television transmission developed in the 1960s and used most everywhere in the world except the U.S.A. and Japan, which use NTSC.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Palais en": {
    "term": "Palais en",
    "cat": "Pro Audio Reference",
    "def": "Jazz Yearly very cool outdoor event held in a royal palace in northern France called Palais de Compi\u00e8gne.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PALM": {
    "term": "PALM",
    "cat": "Pro Audio Reference",
    "def": "Expo (Pro Audio Lighting Music) China\u2019s Largest International Exhibition on Pro Audio, Light, Music & Technology.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PALME": {
    "term": "PALME",
    "cat": "Pro Audio Reference",
    "def": "Conferences (Professional Audio, Light, Music and Entertainment) International exhibitions held in Middle East, Asia and Vietnam.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PAMA": {
    "term": "PAMA",
    "cat": "Pro Audio Reference",
    "def": "(Professional Audio Manufacturers Alliance) The voice of the professional audio manufacturing community, managed by InfoComm.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pan (panoramic)": {
    "term": "pan (panoramic)",
    "cat": "Pro Audio Reference",
    "def": "control A control found on mixers, used to \u201cmove,\u201d or pan the apparent position of a single sound channel between two outputs, usually \u201cleft,\u201d and \u201cright,\u201d for stereo outputs. At one extreme of travel the sound source is heard from only one output; at the other extreme it is heard from the other output. In the middle, the sound is heard equally from each output, but is reduced in level by 3 dB relative to its original value (this is theoretical, the real world is not quite that simple \u2014 see Pan Law). This guarantees that as the sound is panned from one side to the other, it maintains equal loudness (power) for all positions. Contrast with balance and crossfade controls.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pandemonium Loud,": {
    "term": "pandemonium Loud,",
    "cat": "Pro Audio Reference",
    "def": "confused, or disagreeable sound implying disorderly tumult together with loud, bewildering sound. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pangram A": {
    "term": "pangram A",
    "cat": "Pro Audio Reference",
    "def": "sentence that uses all the letters of the alphabet. [AHD] The most famous example comes from typing class: The quick brown fox jumps over the lazy dog.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pan law": {
    "term": "pan law",
    "cat": "Pro Audio Reference",
    "def": "Real world acoustics complicates things immensely when panning a signal. Hit the link to learn why.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "panoply A": {
    "term": "panoply A",
    "cat": "Pro Audio Reference",
    "def": "splendid or striking array: a panoply of colorful flags. [AHD] Used in pro audio to describe loudspeaker line arrays.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Panatrope Phonographs": {
    "term": "Panatrope Phonographs",
    "cat": "Pro Audio Reference",
    "def": "Designed by RCA and sold by Brunswick in 1925, this was their name for the first phonograph player to use electricity to reproduce the sound stored on the record. Hit the link to see a photo. Go to AdClassix.com to see (and buy) their original magazine advertisement.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PANS Acronym for personal": {
    "term": "PANS Acronym for personal",
    "cat": "Pro Audio Reference",
    "def": "Interconnection of IT (information technology) devices within the range of an individual person. Compare with POTS.",
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
  "parity A": {
    "term": "parity A",
    "cat": "Pro Audio Reference",
    "def": "redundant error detection method in which the total number of binary 1\u2019s (or 0\u2019s) is always made even or odd by appending one or more bits.",
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
  "passband The": {
    "term": "passband The",
    "cat": "Pro Audio Reference",
    "def": "range of frequencies passed by an audio low-pass, high-pass or bandpass filter. Normally measured at the -3 dB point: the frequency point where the amplitude response is attenuated 3 dB (decibels) relative to the level of the main passband. For a bandpass filter two points are referenced: the upper and lower -3 dB points. The -3 dB point represents the frequency where the output power has been reduced by one-half. [Technical details: -3 dB represents a multiplier of 0.707. If the voltage is reduced by 0.707, the current is also reduced by 0.707 (ohms law), and since power equals voltage-times-current, 0.707 times 0.707 equals 0.5, or half-power.] The opposite of stopband.",
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
  "PASTI": {
    "term": "PASTI",
    "cat": "Pro Audio Reference",
    "def": "(public address speech transmission index) Chiefly British term for STIpa.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "patchbay or": {
    "term": "patchbay or",
    "cat": "Pro Audio Reference",
    "def": "patch panel A flat panel, or enclosure, usually rack-mounted, that contains at least two rows of 1/4\u2033 TRS connectors used to \u201cpatch in\u201d or insert into the signal path a piece of external equipment (really dense configurations use 4.4 mm miniature or \u201cbantam\u201d jacks). The two rows consists of \u201csend\u201d (top row) and \u201creceive\u201d (bottom row) jacks wired for true balanced interconnection, i.e., tip = positive signal, ring = negative signal, sleeve = shield ground (unbalanced patchbays exist \u2013 but should not \u2013 so no further discussion). The two rows are tied together by shorting contacts such that the normal operation (hence, \u201cnormalling\u201d jacks) is to short the send and receive tip-to-tip & ring-to-ring (the sleeves are always connected) maintaining the signal path until something is plugged in (or jacked-in as cyberpunks love to say). Popular in recording studios where it is common to change the units in the signal path for each new session or client. Another popular wiring convention is called \u201chalf-normalled\u201d where only one of the insert points (top: send, or bottom: receive) breaks the signal path (in normalling, or full normalling as it is sometimes called, inserting into either top or bottom row breaks the signal path). This configuration allows monitoring of the sent signal or received signal depending on which row is half-normalled. Hit the link to see diagrams.",
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
  "a": {
    "term": "a",
    "cat": "Pro Audio Reference",
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
  "PBX": {
    "term": "PBX",
    "cat": "Pro Audio Reference",
    "def": "(private branch exchange) Term referring to hardware allowing several telephones to be connected to a smaller number of lines.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PC": {
    "term": "PC",
    "cat": "Pro Audio Reference",
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
  "PC-DOS\u00ae": {
    "term": "PC-DOS\u00ae",
    "cat": "Pro Audio Reference",
    "def": "(personal computer disk operating system) IBM\u2018s trademarked acronym for their PC operating system. If PC-DOS runs on an IBM compatible, it is then called MS-DOS.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCI": {
    "term": "PCI",
    "cat": "Pro Audio Reference",
    "def": "(peripheral component interconnect) Intel-designed high performance CPU interconnect strategy for \u201cglueless\u201d I/O subsystems. A 32- or 64-bit local-bus specification, characterized by being self-configuring, open, high-bandwidth and processor-independent \u2014 allowing for modular hardware design.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCM": {
    "term": "PCM",
    "cat": "Pro Audio Reference",
    "def": "(pulse code modulation) A conversion method in which digital words in a bit stream represent samples of analog information. The basis of most digital audio systems, first invented by Alec H. Reeves in 1937. Also see RaneNote: Digital Dharma of Audio A/D Converters.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PCMCIA": {
    "term": "PCMCIA",
    "cat": "Pro Audio Reference",
    "def": "(Personal Computer Memory Card International Association) 1. The association and first name given to the standardized credit-card size packages (aka smart cards) for memory and I/O (modems, LAN cards, etc.) for computers, laptops, palmtops, etc. Nicknamed PC-Card, which is now the preferred term. 2. Popularly believed to stand for People Can\u2019t Memorize Computer Interface Acronyms.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PDA": {
    "term": "PDA",
    "cat": "Pro Audio Reference",
    "def": "(personal digital assistant) A small palmtop-like computer designed for specific tasks such as a pocket calculator. Other examples include personal electronic diaries, memo takers, communicators, web browsers, dictionary-translators, etc. Apple\u2018s Newton is a PDA. IBM named theirs personal communicators.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pdf (probability": {
    "term": "pdf (probability",
    "cat": "Pro Audio Reference",
    "def": "density function) See probability density function.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PDF": {
    "term": "PDF",
    "cat": "Pro Audio Reference",
    "def": "files (portable document format) Suffix letters used (.pdf) to indicate an Adobe Acrobat document.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peak hold Metering": {
    "term": "peak hold Metering",
    "cat": "Pro Audio Reference",
    "def": "An extra function found on some LED, LCD or plasma ladder arrays where the peak value is displayed by a single element displayed above the average program material. Commonly has a slow decay rate where it is usual to see just the peak value element lit with no others once the program material ends.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peaking response": {
    "term": "peaking response",
    "cat": "Pro Audio Reference",
    "def": "Term used to describe a bandpass shape when applied to program equalization.",
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
  "PEAQ": {
    "term": "PEAQ",
    "cat": "Pro Audio Reference",
    "def": "(perceptual evaluation of audio quality) Term for the ITU-R recommendations for the objective measurement of perceived audio quality for perceptually coded digital audio signals. Popularly called the new \u201celectronic ear\u201d to provide yardstick values for digitally coded audio quality, there are a series of recommendations covering various aspects of this method (e.g., ITU-R Rec. BS.1387, ITU-R Rec. BS.1116 and ITU-R Rec. BS.562-3). For details of this complex issue see the definitive overview paper by Thiede, et al., \u201cPEAQ \u2014 The ITU Standard for Objective Measurement of Perceived Audio Quality,\u201d J. Audio Eng. Soc., vol. 48 [Audio Engineering Society, January/February 2000].",
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
  "PEC": {
    "term": "PEC",
    "cat": "Pro Audio Reference",
    "def": "(parallel earth conductor) Modern best practices for EMC in installations (per IEC 61000-5-2:1998) require the use of trays, conduits and heavy-gauge earth conductors, known as \u201cparallel earth conductors\u201d (PEC) to divert power currents away from cables and their shields. See Williams\u2018 EMC for Systems and Installations for full details.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peer-to-peer abbreviated": {
    "term": "peer-to-peer abbreviated",
    "cat": "Pro Audio Reference",
    "def": "P2P A network term popularly used to mean an equal access network where every node can send/receive data at any time without waiting for permission, i.e., each node can act as a client or server. An example would be a group of computers that communicate directly with each other, rather than through a central server.",
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
  "perilymph Hearing": {
    "term": "perilymph Hearing",
    "cat": "Pro Audio Reference",
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
  "PET": {
    "term": "PET",
    "cat": "Pro Audio Reference",
    "def": "(protective earth terminal) Terminal connected to conductive parts of Class I equipment for safety purposes. This terminal is intended to be connected to an external earthing system by a PEC (protective earth conductor).",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peta- Prefix": {
    "term": "peta- Prefix",
    "cat": "Pro Audio Reference",
    "def": "for one quadrillion (1015), abbreviated P.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "petabyte A": {
    "term": "petabyte A",
    "cat": "Pro Audio Reference",
    "def": "unit of information or computer storage equal to one quadrillion bytes, or 1024 terabytes. It is commonly abbreviated PB, when used with byte multiples (however should be peti-), the prefix may indicate a power of either 10005 or 10245, so the exact number may be either: 1015or 250.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "peti- Symbol": {
    "term": "peti- Symbol",
    "cat": "Pro Audio Reference",
    "def": "Pi New term standardized by the IEC (IEC 60027-2) to represent binary multiples of 10245. It differentiates between decimal and binary multipliers. The abbreviation, PB, should not be used for binary numbers.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PFC": {
    "term": "PFC",
    "cat": "Pro Audio Reference",
    "def": "(power-factor-corrected) See power-factor-corrected.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PFL": {
    "term": "PFL",
    "cat": "Pro Audio Reference",
    "def": "(pre-fade listen) A term used on recording consoles and mixers, referring to a signal taken before the main channel fader. The significance is this signal is not affected by the fader position. Normally used to monitor (via headphones) to an individual input (or a small group of inputs) without affecting the main outputs, particularly useful in that it allows listening to an input with its fader all the way down (off). In broadcast this function is often called cueing, while recording or live-sound users may also refer to it as soloing. Compare with AFL and APL.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phantom power": {
    "term": "phantom power",
    "cat": "Pro Audio Reference",
    "def": "Invented by Georg Neumann in 1966, the term given to the standardized scheme of providing power supply voltage to certain microphones using the same two lines as the balanced audio path. The international standard is IEC 60268-15, derived from the original German standard DIN 45 596. It specifies three DC voltage levels of 48 volts, 24 volts and 12 volts, delivered through 6.8k ohms, 1.2k ohms, and 680 ohms matched resistors respectively, capable of delivering 10-15 mA. The design calls for both signal conductors to have the same DC potential. This allows the use of microphone connections either for microphones without built-in preamps, such as dynamic types, or for microphones with built-in preamps such as condenser and electret types.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Why 48 volts is": {
    "term": "Why 48 volts is",
    "cat": "Pro Audio Reference",
    "def": "The answer is three-fold: 1) 48 volts is an exact multiple of the 1.5 volt battery cell; 2) 48 volts has been the telephone communication standard since before 1900; and 3) both of these combine to give the background to the explanation direct from J\u00fcrgen Breitlow and Stephen Peus at Neumann:",
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
    "cat": "Pro Audio Reference",
    "def": "the 48 volt phantom powering system, which was later standardized in DIN 45 596, came into existence.\u201d",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phase Audio": {
    "term": "phase Audio",
    "cat": "Pro Audio Reference",
    "def": "signals are complex AC (alternating current) periodic phenomena expressed mathematically as phasors, or vectors. Phase refers to a particular value of t (time) for any periodic function, i.e. it is the relationship between a reference point and the fractional part of the period through which the signal has advanced relative to an arbitrary origin. [The origin is usually taken at the last previous passage through zero from the negative to the positive direction \u2014 IEEE.] See Georgia State University\u2019s great website HyperPhysics for more detail.",
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
  "phaser Also": {
    "term": "phaser Also",
    "cat": "Pro Audio Reference",
    "def": "called a \u201cphase shifter,\u201d this is an electronic device creating an effect similar to flanging, but not as pronounced. Based on phase shift (frequency dependent), rather than true signal delay (frequency independent), the phaser is much easier and cheaper to construct. Using a relatively simple narrow notch filter (all-pass filters also were used) and sweeping it up and down through some frequency range, then summing this output with the original input, creates the desired effect. Narrow notch filters are characterized by having sudden and extreme phase shifts just before and just after the deep notch. This generates the needed phase shifts for the ever-changing magnitude cancellations.",
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
  "See Livio": {
    "term": "See Livio",
    "cat": "Pro Audio Reference",
    "def": "for all the fascinating details of this most intriguing number.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phlogiston A": {
    "term": "phlogiston A",
    "cat": "Pro Audio Reference",
    "def": "hypothetical substance formerly thought to be a volatile constituent of all combustible substances released as flame in combustion. [AHD] See smoke.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "Phoenix-blocks (or": {
    "term": "Phoenix-blocks (or",
    "cat": "Pro Audio Reference",
    "def": "-connectors or -strips) A term, becoming generic, meaning disconnectable, or plugable terminal blocks, after Phoenix Contact connector company, although dozens of companies make them. Also called Euroblocks. See connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phon A": {
    "term": "phon A",
    "cat": "Pro Audio Reference",
    "def": "unit of apparent loudness, equal in number to the intensity in decibels of a 1,000 Hz tone judged to be as loud as the sound being measured.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonautogram or": {
    "term": "phonautogram or",
    "cat": "Pro Audio Reference",
    "def": "phonautograph An apparatus for automatically recording sound vibrations in the form of a tracing on a revolving cylinder. [OED]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phone jack": {
    "term": "phone jack",
    "cat": "Pro Audio Reference",
    "def": "Same as 1/4\u2033 TRS, see connectors.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phoneme The": {
    "term": "phoneme The",
    "cat": "Pro Audio Reference",
    "def": "smallest phonetic unit in a language that is capable of conveying a distinction in meaning, as the m of mat and the b of bat in English. [AHD] Phonemes consist of the vowels and consonants that make up English words.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonetic Representing": {
    "term": "phonetic Representing",
    "cat": "Pro Audio Reference",
    "def": "the sounds of speech with a set of distinct symbols, each designating a single sound: phonetic spelling.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonetics The": {
    "term": "phonetics The",
    "cat": "Pro Audio Reference",
    "def": "branch of linguistics that deals with the sounds of speech and their production, combination, description, and representation by written symbols. [AHD]",
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
  "phonon The": {
    "term": "phonon The",
    "cat": "Pro Audio Reference",
    "def": "quantum of acoustic or vibrational energy, considered a discrete particle and used especially in mathematical models to calculate thermal and vibrational properties of solids. [AHD]",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "phonon laser": {
    "term": "phonon laser",
    "cat": "Pro Audio Reference",
    "def": "A nanoscale laser-like device that uses sound waves instead of light, i.e., it uses phonons, so it could rightly use the acronym \u201cphaser\u201d for phonon amplification by stimulated emission of radiation\u2014not to be confused with the other phaser.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PHY": {
    "term": "PHY",
    "cat": "Pro Audio Reference",
    "def": "Abbreviation for physical and pertaining to the physical layer of the OSI Model.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "physics Some": {
    "term": "physics Some",
    "cat": "Pro Audio Reference",
    "def": "claim that studying physics is all you need for a complete education \u2014 after a visit to HyperPhysics you may agree.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pi Symbol \u03c0 (Greek": {
    "term": "pi Symbol \u03c0 (Greek",
    "cat": "Pro Audio Reference",
    "def": "Mathematics. A transcendental number, approximately 3.14159, represented by the Greek lower-case pi symbol, that expresses the ratio of the circumference to the diameter of a circle and appears as a constant in many mathematical expressions. [AHD] 2. Filters. Equal to 180 degrees or integral multiples thereof. (Why chose pi as the letter to represent the number 3.141592\u2026? Because the letter pi in Greek is like our letter p, as in perimeter (or circumference).) See: Beckmann for in-depth history. For the most enjoyable anti-pi rant see Vi Hart.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "PI": {
    "term": "PI",
    "cat": "Pro Audio Reference",
    "def": "14 See Pseudoacoustic Infector.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "piano A": {
    "term": "piano A",
    "cat": "Pro Audio Reference",
    "def": "musical instrument with a manual keyboard actuating hammers that strike wire strings, producing sounds that may be softened or sustained by means of pedals. [AHD] Italian Bartolomeo Cristofori invented the first hammer-operated piano in 1700.",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
  },
  "pianoforte Original": {
    "term": "pianoforte Original",
    "cat": "Pro Audio Reference",
    "def": "Italian-derived name for the musical instrument now shorte <truncated 2280748 bytes>",
    "bohnNote": "Dennis A. Bohn Pro Audio Reference (P)"
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
