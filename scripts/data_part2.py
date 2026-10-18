"""
scripts/data_part2.py
Modules 011 - 020: Grounding, Shielding & EMC Practices
"""

PART2_MODULES = [
    {
        "num": 11, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "the-pin-1-problem-aes48",
        "title": "The Pin 1 Problem (AES48 Canonical Analysis & Historical Origins)",
        "tags": ["pin-1", "aes48", "chassis", "shield", "grounding", "muncy"],
        "standards": ["AES48", "AES-X152"],
        "equation": "V_{\\text{pin1\\_error}} = I_{\\text{shield}} * Z_{\\text{chassis\\_trace}}",
        "summary": "Canonical investigation into the Pin 1 problem first identified by Neil Muncy in 1994 and codified in AES48.",
        "authors": ["Neil Muncy", "Bill Whitlock", "Jim Brown"],
        "myth": "Pin 1 on an XLR connector is 'ground' and can safely be connected to the circuit board ground trace (0V audio reference).",
        "theory": "When cable shield currents (from inter-chassis ground differentials or RF ingress) flow onto internal circuit board ground traces, they induce voltage drops directly across the circuit's 0V reference. Sensitive high-gain preamps amplify this ground drop as hum and buzz. AES48 dictates that Pin 1 MUST connect directly and immediately to the metallic equipment chassis enclosure at the connector entrance, never routing through a PCB trace.",
        "math": "A 100 mA shield current flowing through a 100 mΩ PCB ground trace creates a 10 mV hum voltage. In a mic preamp with 60 dB gain (1,000x), this injects 10.0 Volts of hum directly into the output!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       AES48 PIN 1 ENCLOSURE BONDING                           |
|                                                                               |
|   BAD DESIGN (THE PIN 1 PROBLEM):                                             |
|   Pin 1 ----[ PCB Copper Trace ]----> Circuit 0V Audio Ref ----> Enclosure    |
|             (Shield currents flow through audio 0V, causing loud hum!)        |
|                                                                               |
|   AES48 COMPLIANT DESIGN:                                                     |
|   Pin 1 ----[ ZERO-LENGTH BOND ]----> METAL CHASSIS ENCLOSURE                 |
|                                            |                                  |
|                                     [ Earth Ground ]                          |
|             (Shield currents bypass audio circuitry entirely!)                |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Clause 4.1 specifies: 'The shield shall be connected to the equipment enclosure at the connector.'",
        "takeaways": "1. Pin 1 belongs to the chassis, NOT circuit 0V.\n2. Never route shield currents across a printed circuit board.\n3. AES48 compliance eliminates 99% of ground hum problems.",
        "quiz": "Q: Why does connecting Pin 1 to a PCB ground plane cause hum?\nA: Shield currents flowing through PCB trace resistance create an IR voltage drop that modulates the amplifier's reference potential."
    },
    {
        "num": 12, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "chassis-ground-vs-circuit-0v",
        "title": "Chassis Enclosure Grounding vs Audio Circuit 0V Reference",
        "tags": ["chassis", "circuit-0v", "earth", "enclosure", "isolation"],
        "standards": ["AES48", "AES-X152 Section 4"],
        "equation": "Z_{\\text{chassis-0V}} = R_{\\text{isolation}} \\parallel \\frac{1}{j\\omega C_{\\text{stray}}}",
        "summary": "Clear differentiation between protective safety earth, equipment enclosure shielding, and the internal signal reference.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "'Ground' is a magical zero-impedance sink that can absorb infinite electrical noise.",
        "theory": "Earth ground exists purely for safety (preventing electric shock during line faults). Chassis ground provides an electrostatic Faraday shield around electronics. Circuit 0V is the internal reference plane for operational amplifiers. Equating these three concepts creates ground loops and EMC failures.",
        "math": "Common-mode chassis voltage V_chassis relative to earth: V_ch = I_leakage * Z_earth. Signal 0V is referenced to chassis at a single star point or through a hybrid RF isolator network.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       GROUND REFERENCE ARCHITECTURE                           |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   | METAL CHASSIS ENCLOSURE (FARADAY CAGE)                                |   |
|   |    |                                                                  |   |
|   |    +-----> Safety Green/Yellow Wire ---> Earth Safety Ground          |   |
|   |    |                                                                  |   |
|   |    +--[ Star Ground Point ]--+                                        |   |
|   |                              |                                        |   |
|   |                       Circuit 0V Reference (Audio Signal Clean Ground)|   |
|   |                                                                       |   |
|   +-----------------------------------------------------------------------+   |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Section 4.2 details the physical bond between internal circuit common and the protective chassis enclosure.",
        "takeaways": "1. Earth ground is for human safety; chassis is for RF shielding; 0V is for audio.\n2. Keep shield currents outside the chassis.\n3. Never disconnect the safety earth pin on a power cord.",
        "quiz": "Q: What is the primary function of the third green/yellow safety wire in an AC power cord?\nA: To trip the circuit breaker in the event of an electrical short circuit to the metal chassis, protecting personnel from electrocution."
    },
    {
        "num": 13, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "ground-loop-physics-vgvd",
        "title": "Ground Loop Physics & Inter-Chassis Potential Differences (Vgvd)",
        "tags": ["ground-loop", "vgvd", "potential-difference", "hum", "earthing"],
        "standards": ["AES-X152", "AES48"],
        "equation": "I_{\\text{loop}} = \\frac{V_{\\text{gvd}}}{R_{\\text{safety\\_ground}} + R_{\\text{cable\\_shield}}}",
        "summary": "Physics of ground loops, AC power distribution leakage, and inter-chassis ground voltage differentials (Vgvd).",
        "authors": ["Bill Whitlock", "Jim Meyer"],
        "myth": "Ground loops only happen when gear is broken or plugged into bad electrical outlets.",
        "theory": "Every building AC power system carries neutral and safety ground currents. Because building grounding wires have finite resistance, small AC voltage drops (typically 10 mV to 5 V RMS) exist between electrical outlets on different walls or circuits. This voltage is Ground Voltage Differential (Vgvd). Connecting a cable shield between two pieces of equipment completes a loop through the building safety ground.",
        "math": "For Vgvd = 2.0 V RMS and total loop resistance R_loop = 1.0 Ω (safety wiring + cable shield), a 2.0 Ampere ground loop current circulates continuously through the cable shield!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       GROUND LOOP CURRENT CIRCULATION                         |
|                                                                               |
|   [Device A Chassis] ========(Cable Shield: I_loop)=======> [Device B Chassis]|
|          |                                                         |          |
|     (Power Cord)                                              (Power Cord)    |
|          |                                                         |          |
|   [Wall Outlet A] <-------(Building Ground Wire: Vgvd)-------> [Wall Outlet B]|
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Jim Meyer model defines Vgvd as a fundamental drive generator in the interconnection equivalent network.",
        "takeaways": "1. Ground loops are inherent to interconnected AC-powered gear.\n2. Balanced differential inputs make ground loops benign.\n3. AES48 chassis bonding prevents ground loop currents from entering audio circuits.",
        "quiz": "Q: If two pieces of equipment plugged into different outlets have a 1.5 V potential difference between their chassis, will a compliant AES48 balanced connection hum?\nA: No! The shield safely carries the loop current to the chassis, and the differential receiver rejects the common-mode voltage."
    },
    {
        "num": 14, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "shield-current-induced-noise-scin",
        "title": "Shield Current Induced Noise (SCIN) in Balanced Interconnects",
        "tags": ["scin", "shield-current", "induction", "magnetic-coupling"],
        "standards": ["AES48", "AES-X152"],
        "equation": "V_{\\text{scin}} = I_{\\text{shield}} * \\omega * M_{\\text{mutual}}",
        "summary": "Mechanisms by which shield currents induce differential voltages into signal pairs via mutual magnetic inductance.",
        "authors": ["Jim Brown", "Neil Muncy"],
        "myth": "If Pin 1 connects to chassis, shield current cannot cause noise in a balanced line.",
        "theory": "Shield Current Induced Noise (SCIN) occurs when current flowing along a cable shield creates an internal magnetic field that couples unequally to the two twisted signal conductors due to geometrical asymmetries in the shield or cable construction (especially foil shields with spiral drain wires).",
        "math": "Induced differential noise: V_scin = I_shield * 2 * π * f * (M1 - M2). A 100 mA shield current at 60 Hz in a poorly constructed cable can induce 10 µV of audible differential noise directly between Pin 2 and Pin 3.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       SHIELD CURRENT INDUCED NOISE (SCIN)                     |
|                                                                               |
|          +================== CABLE SHIELD (I_shield) ===================+      |
|          |                                                              |      |
|          |   Conductor 1 (Pin 2) -----[ Mutual Inductance M1 ]-----+    |      |
|          |                                                         |    |      |
|          |   Conductor 2 (Pin 3) -----[ Mutual Inductance M2 ]-----+    |      |
|          |                                                              |      |
|          +==============================================================+      |
|                                                                               |
|   If M1 != M2 (drain wire asymmetry), I_shield induces differential hum!     |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Annex C documents SCIN measurement techniques and cable geometry evaluations by Jim Brown.",
        "takeaways": "1. Braided shields with high optical coverage exhibit 20-30 dB less SCIN than foil with drain wire.\n2. Star-quad cable geometry provides superior immunity to SCIN.\n3. Keep shield currents to a minimum even in balanced systems.",
        "quiz": "Q: Why do foil-shielded cables with off-center drain wires suffer from higher SCIN than braided cables?\nA: The drain wire concentrates shield current on one side of the cable, creating an asymmetrical magnetic field that couples unequally into the two conductors."
    },
    {
        "num": 15, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "cable-shield-types-braid-spiral-foil",
        "title": "Cable Shield Types: Braided, Spiral/Serve, and Foil with Drain Wire",
        "tags": ["shield-types", "braid", "spiral", "foil", "drain-wire"],
        "standards": ["AES48", "AES72"],
        "equation": "\\text{Optical\\_Coverage} = \\left(2F - F^2\\right) * 100\\%",
        "summary": "Engineering comparison of braided copper, spiral (serve) wrap, and foil/drain shields for RF and audio immunity.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "100% foil shield is always superior to 90% braided shield for audio cables.",
        "theory": "Foil shields offer 100% optical coverage against high-frequency electrostatic fields but have higher DC resistance and severe SCIN vulnerability due to drain wire asymmetry. Braided copper shields offer low DC resistance, high mechanical flexibility, and excellent symmetrical magnetic cancellation.",
        "math": "Shield resistance: Braided #22 AWG equivalent ≈ 0.015 Ω/m. Foil with #24 AWG drain wire ≈ 0.085 Ω/m (over 5x higher resistance, resulting in 5x higher V = I * R voltage drops).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CABLE SHIELD COMPARISON                                 |
|                                                                               |
|   1. BRAIDED COPPER: Interwoven wire mesh (85-95% coverage, lowest SCIN)      |
|   2. SPIRAL / SERVE: Helical wrap (flexible, degrades when flexed/opened)     |
|   3. FOIL + DRAIN: Aluminum Mylar + wire (100% RF, high resistance, high SCIN) |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Section 4 mandates low-resistance shields to minimize inter-chassis common-mode voltages.",
        "takeaways": "1. Use braided shield for live stage, portable touring, and mic cables.\n2. Foil with drain wire is acceptable for fixed permanent studio conduit runs.\n3. Spiral shield is suitable only for budget patch cables.",
        "quiz": "Q: Which shield type provides the lowest DC resistance and best performance against SCIN?\nA: High-density braided copper shield."
    },
    {
        "num": 16, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "ground-lifting-and-pseudo-balancing",
        "title": "Ground-Lifting Techniques, Telescoping Shields & Pseudo-Balancing",
        "tags": ["ground-lift", "telescoping", "pseudo-balanced", "hum-elimination"],
        "standards": ["AES48", "AES-X152"],
        "equation": "Z_{\\text{lifted\\_shield}} = \\frac{1}{j\\omega C_{\\text{open}}} \\approx \\infty \\quad \\text{at 60 Hz}",
        "summary": "Techniques for lifting cable shields at one end, telescoping grounds, and constructing pseudo-balanced cables.",
        "authors": ["Dennis Bohn", "Bill Whitlock"],
        "myth": "Cutting the shield ground at one end of a cable ruins shielding completely.",
        "theory": "Electrostatic shielding requires connection to ground at only one end to form a Faraday cage. Lifting the shield at the receiving end breaks the conductive path for ground loop current (I_shield = 0) while maintaining electrostatic protection at audio frequencies. For RF protection, an RF-bypass capacitor (10 nF ceramic) bridges the lift.",
        "math": "Ground current after lift: I_loop = V_gvd / (R_wire + 1/(jωC_gap)) ≈ 0 A at 60 Hz.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TELESCOPING SHIELD WITH RF CAPACITOR                    |
|                                                                               |
|   [Source XLR]                                                [Receiver XLR]  |
|   Pin 1 (Shield) ======== Cable Shield ===================== [Open / 10 nF]   |
|   Pin 2 (Hot)    -------- Conductor 1 ---------------------- Pin 2 (Hot)      |
|   Pin 3 (Cold)   -------- Conductor 2 ---------------------- Pin 3 (Cold)      |
|                                                                               |
|   Audio 60 Hz ground loop is broken; 10 nF shunts RF interference to chassis!  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Annex D discusses single-ended shield connections and hybrid RF capacitive terminations.",
        "takeaways": "1. Lift shields at the receiving end, never at the driving source.\n2. Use a 10 nF ceramic capacitor across the ground lift to maintain RF shielding.\n3. Never lift safety AC power ground pins.",
        "quiz": "Q: Where should the shield connection be broken in a telescoping shield cable?\nA: At the receiving destination end (source end stays connected to chassis)."
    },
    {
        "num": 17, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "rf-ingress-and-connector-bonding",
        "title": "RF Ingress, Connector Shell Bonding, and Microstrip Antennas",
        "tags": ["rf-ingress", "rfi", "connector-shell", "pin1", "emc"],
        "standards": ["AES48", "AES54"],
        "equation": "L_{\\text{pigtail}} < 2\\text{ mm} \\quad \\text{(360-degree connector bond)}",
        "summary": "Mechanisms of Radio Frequency Interference (RFI) ingress, pigtail inductance, and 360-degree connector shell bonding.",
        "authors": ["Jim Brown", "Anthony Kuzub"],
        "myth": "Connecting the cable shield to Pin 1 with a 2-inch wire pigtail is fine because 'it's all connected to ground anyway.'",
        "theory": "At radio frequencies (10 MHz - 1 GHz), wires act as inductors (~1 nH per mm). A 2-inch (50 mm) pigtail has ~50 nH inductance, presenting an impedance of j314 Ω at 1 GHz! This inductive impedance blocks RF currents from shunting to chassis, converting the pigtail into a transmitting antenna inside the chassis enclosure.",
        "math": "Inductive reactance: X_L = 2 * π * f * L. For L = 50 nH at 100 MHz FM broadcast: X_L = 31.4 Ω. A 360-degree circumferential shield bond has L < 0.5 nH (X_L < 0.3 Ω).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CONNECTOR PIGTAIL VS 360-DEGREE BOND                    |
|                                                                               |
|   BAD: Long Pigtail wire ----[ 50 nH Inductance ]----> Acts as RF Antenna!    |
|                                                                               |
|   GOOD: 360-degree EMC clamp bonding shield directly to connector metal shell |
|         giving <0.5 nH inductance and total RF containment.                   |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES54-1, AES54-2, and AES54-3 specify metal enclosure shielding and connector shell bonding.",
        "takeaways": "1. Keep shield pigtails as short as physically possible (<5 mm).\n2. Use metal XLR connectors with 360-degree shield clamp contacts.\n3. Bond connector shells directly to equipment chassis.",
        "quiz": "Q: What electrical property makes long shield pigtail wires ineffective at suppressing RFI?\nA: High inductive reactance (X_L = 2*π*f*L) at radio frequencies."
    },
    {
        "num": 18, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "ferrite-chokes-and-common-mode-beads",
        "title": "Ferrite Chokes, Common-Mode Beads & High-Frequency Filtering",
        "tags": ["ferrite", "choke", "common-mode", "attenuation", "rf"],
        "standards": ["AES-X152", "AES48"],
        "equation": "Z_{\\text{ferrite}}(f) = R(f) + j\\omega L(f)",
        "summary": "Selection, placement, and physics of ferrite cores and common-mode beads for audio line RF suppression.",
        "authors": ["Jim Brown", "Bill Whitlock"],
        "myth": "Ferrite clamps on audio cables degrade audio bass response.",
        "theory": "Ferrite beads act as common-mode RF chokes. Because the two balanced conductors pass through the core in opposite directions for differential signals, their audio magnetic fields cancel completely (zero net flux), leaving the audio signal untouched. Common-mode RF signals travel in the same direction, generating high flux and dissipating RF energy as heat in the core.",
        "math": "At audio frequencies (<20 kHz), ferrite impedance is negligible (<0.01 Ω). At 100 MHz, the ferrite presents 200 Ω - 800 Ω of resistive loss, attenuating RF ingress by 20 dB or more.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       FERRITE COMMON-MODE CHOKE OPERATION                    |
|                                                                               |
|   Pin 2 (Audio Hot)  ========[                    ]=======> Receiver +        |
|                              [  FERRITE CORE      ]                           |
|   Pin 3 (Audio Cold) ========[  (Differential Flux]=======> Receiver -        |
|                              [   Cancels to 0)    ]                           |
|                                                                               |
|   Audio differential signal passes with 0 dB loss. Common-mode RF blocked!    |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 2 recommends common-mode RF filtering on all analog ports.",
        "takeaways": "1. Ferrites have zero effect on differential audio signals.\n2. Place ferrites as close as possible to the receiving equipment entrance.\n3. Use Type 31 or Type 43 ferrite material for optimal audio RFI suppression.",
        "quiz": "Q: Why doesn't a common-mode ferrite choke attenuate differential audio signals?\nA: Because the differential signal currents flow in opposite directions through the core, producing equal and opposite magnetic fluxes that cancel completely."
    },
    {
        "num": 19, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "electrostatic-vs-magnetic-coupling",
        "title": "Electrostatic vs Magnetic Coupling in Shielded Audio Cable Runs",
        "tags": ["electrostatic", "magnetic", "faraday", "shielding", "coupling"],
        "standards": ["AES-X152", "AES48"],
        "equation": "V_{\\text{magnetic}} = -\\mu_0 * A * \\frac{dI_{\\text{power}}}{dt} \\cdot \\cos(\\theta)",
        "summary": "Electromagnetic field physics distinguishing capacitive (electrostatic) voltage coupling from inductive (magnetic) current coupling.",
        "authors": ["Bill Whitlock", "Neil Muncy"],
        "myth": "Standard copper or aluminum foil cable shields block magnetic hum from power transformers.",
        "theory": "Electrostatic (capacitive) fields are electric fields from high-voltage conductors; standard copper shields easily intercept them and shunt them to ground. Magnetic fields are created by high current flow in power cables and transformers; non-magnetic copper/aluminum shields have zero shielding effect against magnetic fields! Magnetic hum can only be rejected by tight conductor twisting, distance, or mu-metal shielding.",
        "math": "Induced magnetic voltage in loop area A: V = -dΦ/dt = -A * dB/dt. Twisting the pair creates alternating cancellation loops where adjacent loops have opposite polarity induced voltages.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CAPACITIVE VS MAGNETIC COUPLING                         |
|                                                                               |
|   CAPACITIVE NOISE (E-Field): Shunted 100% by copper shield to chassis ground. |
|                                                                               |
|   MAGNETIC NOISE (B-Field): Penetrates copper shield completely!              |
|   Rejected ONLY by:                                                           |
|     1. Conductor twisting (averages loop area to 0)                           |
|     2. Physical distance (Inverse square law: B ~ 1/d^2)                      |
|     3. Star-quad cross-connected geometry (>30 dB extra rejection)            |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 7 documents cable magnetic field susceptibility parameters.",
        "takeaways": "1. Copper shields do NOT block magnetic hum.\n2. Conductor twisting is the primary weapon against magnetic interference.\n3. Never run mic cables parallel to AC power feeder lines.",
        "quiz": "Q: Can an aluminum foil cable shield prevent magnetic hum induced by an adjacent power transformer?\nA: No. Aluminum has no magnetic permeability (μr ≈ 1); magnetic fields pass through unhindered."
    },
    {
        "num": 20, "part_num": 2, "part_title": "Part 2: Grounding, Shielding & EMC Practices",
        "slug": "star-grounding-vs-ground-planes",
        "title": "Star-Point Grounding vs Equipotential Ground Planes and Mesh Grids",
        "tags": ["star-ground", "ground-plane", "mesh-grid", "facility-earthing"],
        "standards": ["AES48", "IEEE 1100"],
        "equation": "Z_{\\text{plane}} = \\frac{\\rho * L}{w * t} + j\\omega L_{\\text{sheet}} \\ll Z_{\\text{wire}}",
        "summary": "Facility grounding topologies: the limitations of star earthing at RF and the supremacy of equipotential mesh ground grids.",
        "authors": ["Bill Whitlock", "Bruce Olson"],
        "myth": "Single-point 'star grounding' is the best grounding architecture for modern audio facilities.",
        "theory": "Star grounding works well at 60 Hz audio frequencies. However, in modern facilities filled with digital equipment, switch-mode power supplies, and wireless transmitters, long star ground wires act as inductors and quarter-wave antennas at RF frequencies (>1 MHz). Modern engineering mandates equipotential mesh ground networks (MBN) where low-impedance copper planes or grids bond all equipment chassis together.",
        "math": "Inductance of a 10-meter ground wire: L ≈ 12 µH. At 10 MHz, Z = 2 * π * 10^7 * 12 * 10^-6 = 754 Ω! The wire is an open circuit to RF.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       STAR GROUND VS MESH GROUND GRID                         |
|                                                                               |
|   STAR GROUND (Single Point): Long wires have high RF inductance.             |
|                                                                               |
|   EQUIPOTENTIAL MESH GRID: Low-impedance bonding across all racks and bays    |
|   guarantees zero inter-chassis potential differences across all frequencies. |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEEE 1100 (Emerald Book) and AES48 Annex B recommend equipotential mesh grounding for broadcast and recording studios.",
        "takeaways": "1. Star grounding fails at radio frequencies.\n2. Equipotential mesh ground grids provide lowest impedance at both 60 Hz and 100 MHz.\n3. Bond equipment racks directly with solid copper bus bars.",
        "quiz": "Q: Why does single-point star grounding fail in modern digital audio facilities?\nA: Because long ground wires have high inductive impedance at high radio frequencies, failing to maintain an equipotential ground reference."
    }
]
