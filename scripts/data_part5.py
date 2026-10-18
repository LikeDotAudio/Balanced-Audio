"""
scripts/data_part5.py
Modules 041 - 050: Cable Transmission Medium & Connector Standards
"""

PART5_MODULES = [
    {
        "num": 41, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "cable-lcr-electrical-parameters",
        "title": "Cable Electrical Parameters: Inductance, Capacitance, Resistance (LCR)",
        "tags": ["cable-parameters", "lcr", "capacitance", "inductance", "resistance"],
        "standards": ["AES-X152 Section 7", "AES72"],
        "equation": "Z_0 = \\sqrt{\\frac{R + j\\omega L}{G + j\\omega C}} \\approx \\sqrt{\\frac{L}{C}} \\quad \\text{@ RF}",
        "summary": "Distributed transmission parameters of shielded twisted pair audio cables: loop resistance, mutual inductance, and dielectric capacitance.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "Audio cables are simple zero-loss conductors that have no electrical effect on the signal.",
        "theory": "Every physical audio cable possesses distributed electrical parameters per unit length: series loop resistance (R in Ω/m), series inductance (L in µH/m), shunt capacitance (C in pF/m), and dielectric conductance (G in S/m). At audio frequencies, series resistance and shunt capacitance form a distributed low-pass RC ladder filter that interacts dynamically with source and load impedances.",
        "math": "Typical balanced audio cable (e.g. Belden 8412 or Canare L-2T2S): R ≈ 0.08 Ω/m loop resistance; L ≈ 0.6 µH/m; C ≈ 100 pF/m core-to-core, and 170 pF/m core-to-shield.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       DISTRIBUTED CABLE LCR MODEL                             |
|                                                                               |
|   Pin 2 ----[ R/2 ]---( L/2 )---+---[ R/2 ]---( L/2 )---+---> Pin 2 (Out)     |
|                                 |                       |                     |
|                               [ C_cc ]                [ C_cc ]                |
|                                 |                       |                     |
|   Pin 3 ----[ R/2 ]---( L/2 )---+---[ R/2 ]---( L/2 )---+---> Pin 3 (Out)     |
|                                 |                       |                     |
|                               [ C_cs ]                [ C_cs ]                |
|                                 v                       v                     |
|   Shield ====================================================> Shield (Pin 1) |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 7 mandates standardized reporting of cable L, C, and R per meter.",
        "takeaways": "1. Capacitance is the primary limiter of high-frequency bandwidth.\n2. Low-capacitance cable (<70 pF/m) preserves treble on long runs.\n3. Inductance is negligible at audio frequencies below 20 kHz.",
        "quiz": "Q: Which distributed electrical parameter of an audio cable has the largest impact on high-frequency roll-off at audio frequencies?\nA: Shunt capacitance (core-to-core and core-to-shield capacitance)."
    },
    {
        "num": 42, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "core-to-core-vs-core-to-shield-capacitance",
        "title": "Core-to-Core vs Core-to-Shield Distributed Capacitances",
        "tags": ["core-to-core", "core-to-shield", "c_cc", "c_cs", "capacitance"],
        "standards": ["AES-X152 Section 7"],
        "equation": "C_{\\text{effective\\_diff}} = C_{\\text{cc}} + \\frac{C_{\\text{cs1}} * C_{\\text{cs2}}}{C_{\\text{cs1}} + C_{\\text{cs2}}}",
        "summary": "Electrical distinction between conductor-to-conductor mutual capacitance and conductor-to-shield capacitance.",
        "authors": ["Jim Brown", "Bill Whitlock"],
        "myth": "The capacitance specification printed in cable datasheets represents the only capacitance that matters.",
        "theory": "Balanced cables have two distinct capacitances: Mutual Conductor-to-Conductor Capacitance (C_cc), which shunts the differential audio signal directly between Pin 2 and Pin 3; and Conductor-to-Shield Capacitance (C_cs), which shunts each conductor to the cable shield. Any asymmetry (ΔC = |C_cs1 - C_cs2|) transforms common-mode noise into differential noise at high frequencies.",
        "math": "If C_cs1 = 160 pF/m and C_cs2 = 175 pF/m (a 15 pF/m mismatch), a 100-meter snake run creates a 1.5 nF imbalance, destroying high-frequency CMRR above 5 kHz.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CABLE CAPACITANCE NETWORK                               |
|                                                                               |
|   Conductor 1 (Pin 2) --------------+----------------------------------->     |
|                                     |                                         |
|                                  [ C_cc ]  (Differential Load)                |
|                                     |                                         |
|   Conductor 2 (Pin 3) --------------+----------------------------------->     |
|                        |                           |                          |
|                     [ C_cs1 ]                   [ C_cs2 ]                     |
|                        |                           |                          |
|   Cable Shield ========+===========================+=====================>    |
|   (If C_cs1 != C_cs2, common-mode noise converts to differential hum!)        |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 7 details measurement protocols for C_cc and C_cs.",
        "takeaways": "1. Look for balanced cables with matched C_cs1 and C_cs2 specs.\n2. Star-quad construction provides symmetrical capacitance geometry.\n3. Total effective differential capacitance is C_cc + C_cs/2.",
        "quiz": "Q: Why does a mismatch between Conductor 1-to-shield capacitance and Conductor 2-to-shield capacitance cause noise?\nA: It creates an impedance imbalance to ground at high frequencies, converting common-mode noise into differential noise."
    },
    {
        "num": 43, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "cable-length-driver-impedance-hf-rolloff",
        "title": "Cable Run Length, Driver Output Impedance & -3dB Cutoff Frequency",
        "tags": ["cable-length", "hf-rolloff", "cutoff-frequency", "driver-impedance"],
        "standards": ["AES-X152 Section 7"],
        "equation": "f_{-3\\text{dB}} = \\frac{1}{2\\pi * Z_{\\text{source}} * C_{\\text{total}}}",
        "summary": "Calculating high-frequency roll-off (-3dB cutoff point) as a function of total cable capacitance and driver source impedance.",
        "authors": ["Dennis Bohn", "Bill Whitlock"],
        "myth": "Long cable runs always roll off treble, no matter what equipment is driving them.",
        "theory": "The high-frequency cutoff frequency f_-3dB is strictly determined by the RC time constant formed by the transmitter's source impedance Z_source and the total shunt capacitance C_total of the cable. A high source impedance (e.g. passive guitar pickup: 10 kΩ) suffers audible treble loss over 5 meters. A low source impedance driver (50 Ω) can drive 300 meters of cable without audible loss.",
        "math": "For a 100-meter cable (C_total = 15 nF): With Z_source = 50 Ω: f_-3dB = 1 / (2 * π * 50 * 15e-9) = 212 kHz (Completely flat across audio band). With Z_source = 600 Ω: f_-3dB = 17.6 kHz (Audible treble roll-off!).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       SOURCE IMPEDANCE VS CABLE BANDWIDTH                     |
|                                                                               |
|   Driver Z_s = 50 Ω  + 100m Cable (15 nF) ===> -3 dB @ 212 kHz (FLAT AUDIO!)  |
|                                                                               |
|   Driver Z_s = 600 Ω + 100m Cable (15 nF) ===> -3 dB @ 17.6 kHz (TREBLE LOSS!)|
|                                                                               |
|   Passive Guitar (10k) + 10m Cable (1 nF) ===> -3 dB @ 15.9 kHz (DULL TONE!)  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 7 cable bandwidth charts.",
        "takeaways": "1. Low driver source impedance (<100 Ω) prevents high-frequency loss on long runs.\n2. Passive high-impedance instruments require direct injection (DI) buffers before long snakes.\n3. Keep driver output resistors as low as stability permits.",
        "quiz": "Q: What is the primary reason professional line drivers have low output impedance (e.g. 50 Ω)?\nA: To push the RC low-pass filter cutoff frequency far above the audible band even when driving hundreds of meters of high-capacitance cable."
    },
    {
        "num": 44, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "star-quad-cable-geometry-magnetic-rejection",
        "title": "Star-Quad Cable Geometry & Magnetic Rejection",
        "tags": ["star-quad", "magnetic-rejection", "geometry", "quad-cable", "hum"],
        "standards": ["AES-X152", "AES72"],
        "equation": "\\text{Magnetic\\_Immunity\\_Improvement} \\approx 20\\text{ dB to } 35\\text{ dB over standard twisted pair}",
        "summary": "Physics of 4-conductor star-quad cable geometry, cross-connection, and spatial magnetic field cancellation.",
        "authors": ["Jim Brown", "Anthony Kuzub"],
        "myth": "Star-quad cable is just standard 4-conductor wire that sounds better because of oxygen-free copper.",
        "theory": "Star-quad cable consists of four insulated conductors arranged in a tight symmetrical square cross-section. Opposing pairs of conductors are tied together in parallel at each end (Conductors 1 & 3 = Hot / Pin 2; Conductors 2 & 4 = Cold / Pin 3). This creates two interleaved virtual loops whose effective magnetic pickup areas overlap spatially, canceling induced magnetic hum from power cords and stage lighting dimmers by 20 to 35 dB compared to standard pairs.",
        "math": "Trade-off: Star-quad has approximately double the capacitance of standard twisted pair (~180 pF/m vs ~90 pF/m). For long mic runs (>50m), ensure the driver can handle the higher capacitance.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       STAR-QUAD CROSS-SECTION GEOMETRY                        |
|                                                                               |
|                             [ Conductor 1: Hot ]                              |
|                                      |                                        |
|         [ Conductor 4: Cold ] -------+------- [ Conductor 2: Cold ]           |
|                                      |                                        |
|                             [ Conductor 3: Hot ]                              |
|                                                                               |
|   Opposing hot wires (1 & 3) in parallel; opposing cold wires (2 & 4) in      |
|   parallel. Spatial magnetic centroid is identical for hot and cold!          |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 7 references star-quad geometry for harsh electromagnetic environments.",
        "takeaways": "1. Use star-quad for stage mic cables near lighting trusses and power runs.\n2. Provides 20-35 dB superior magnetic hum rejection.\n3. Mind the higher capacitance on runs exceeding 100 meters.",
        "quiz": "Q: How are the four conductors of a star-quad cable wired at the XLR connectors?\nA: Diametrically opposite pairs of conductors are tied in parallel: Conductors 1 & 3 to Pin 2 (Hot); Conductors 2 & 4 to Pin 3 (Cold)."
    },
    {
        "num": 45, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "aes14-standard-xlr-3-pin-interface",
        "title": "AES14 Standard: XLR 3-Pin Interface & Pin Assignment",
        "tags": ["aes14", "xlr", "pinout", "table1", "table2", "standards"],
        "standards": ["AES14", "AES48"],
        "equation": "\\text{Pin 1 = Shield/Chassis}, \\quad \\text{Pin 2 = Non-inverting (Hot)}, \\quad \\text{Pin 3 = Inverting (Cold)}",
        "summary": "The canonical AES14 standard establishing worldwide uniformity for 3-pin XLR audio connectors and resolving the 'Pin 3 Hot' legacy conflict.",
        "authors": ["John Woodgate", "Bruce Olson"],
        "myth": "Pin 3 Hot is still acceptable for vintage European or American gear in modern facilities.",
        "theory": "Before AES14 (published in 1992), an industry schism existed: American manufacturers used Pin 2 Hot, while British and Japanese broadcast equipment frequently used Pin 3 Hot. AES14 officially standardized: Pin 1 = Shield / Chassis, Pin 2 = Hot (positive voltage produces acoustic compression), Pin 3 = Cold (negative reference). Mixing Pin 2 Hot and Pin 3 Hot equipment causes 180° acoustic phase inversion.",
        "math": "Polarity convention: Acoustic pressure increase on microphone diaphragm -> Positive voltage on Pin 2 relative to Pin 3.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       AES14 XLR CONNECTOR PINOUT                              |
|                                                                               |
|                  MALE MATING FACE              FEMALE MATING FACE             |
|                                                                               |
|                        ( 1 )                         ( 1 )                    |
|                                                                               |
|                    ( 2 )   ( 3 )                 ( 3 )   ( 2 )                |
|                                                                               |
|   Pin 1: Shield / Chassis Ground (Direct Enclosure Bond)                      |
|   Pin 2: Signal Hot (+) Non-Inverting                                         |
|   Pin 3: Signal Cold (-) Inverting Reference                                  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES14-1992 (r2014): 'AES standard for professional audio equipment - Application of connectors, part 1, circular connectors'.",
        "takeaways": "1. Pin 2 is Hot; Pin 3 is Cold worldwide.\n2. Pin 1 connects to chassis, not audio circuit 0V.\n3. Female XLR = Output/Source; Male XLR = Input/Destination.",
        "quiz": "Q: According to AES14, which pin on a 3-pin XLR connector carries the positive non-inverting audio signal?\nA: Pin 2."
    },
    {
        "num": 46, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "quarter-inch-phone-plugs-trs-vs-ts",
        "title": "1/4-inch Phone Plugs (TRS vs TS) and B-Gauge Patch Cords",
        "tags": ["trs", "ts", "b-gauge", "patchbays", "phone-jacks"],
        "standards": ["AES14", "AES-X152"],
        "equation": "\\text{Tip = Hot (+)}, \\quad \\text{Ring = Cold (-)}, \\quad \\text{Sleeve = Ground/Shield}",
        "summary": "Mechanical tolerances, contact wiping, and short-circuit hazards of 1/4\" TRS, TS, and mil-spec B-gauge phone plugs.",
        "authors": ["Dennis Bohn", "Anthony Kuzub"],
        "myth": "All 1/4\" phone jacks and plugs have identical dimensions.",
        "theory": "Commercial 1/4\" phone plugs (A-gauge) have a ball-shaped tip, while military and broadcast patchbay plugs (B-gauge / Western Electric 310 / Longframe) have a rounded cylindrical tip. Inserting an A-gauge plug into a B-gauge patchbay damages spring contacts. Furthermore, plugging a 1/4\" plug into a live jack momentarily shorts Tip to Ring, and Ring to Sleeve during insertion!",
        "math": "Contact short duration during plug insertion: 5 ms to 20 ms. If 48V phantom power or active line driver outputs are shorted during this wipe, severe current spikes result.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       1/4-INCH PHONE PLUG GEOMETRY                            |
|                                                                               |
|   [ TIP: Hot (+) ] === [ RING: Cold (-) ] === [ SLEEVE: Ground/Shield ]       |
|                                                                               |
|   CAUTION: Inserting plug wipes Tip across Ring and Sleeve contacts!          |
|   Mute monitors and power down phantom before patching phone plugs.           |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES14 Section 5 covers 3-pole 1/4-inch (6.35 mm) phone plug contacts.",
        "takeaways": "1. Tip = Pin 2 (Hot); Ring = Pin 3 (Cold); Sleeve = Pin 1 (Shield).\n2. Plugging in a TS plug shorts Ring to Sleeve automatically.\n3. Never use commercial A-gauge plugs in professional B-gauge patchbays.",
        "quiz": "Q: Which contact on a 1/4\" TRS balanced plug corresponds to Pin 3 of an XLR connector?\nA: The Ring."
    },
    {
        "num": 47, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "aes59-multi-pair-pinout-standard-db25",
        "title": "AES59 Multi-Pair Pinout Standard: 8-Channel DB25 D-Sub Connector",
        "tags": ["aes59", "db25", "d-sub", "8-channel", "multichannel", "tascam"],
        "standards": ["AES59", "AES-X249", "AES48"],
        "equation": "8\\text{ Balanced Channels on 25 Pins: } 8 * 3 = 24\\text{ Pins + 1 Unused Chassis}",
        "summary": "The canonical AES59 standard for 8-channel analog and digital balanced audio interconnection on 25-way D-sub connectors.",
        "authors": ["Anthony Kuzub", "Bruce Olson"],
        "myth": "There are multiple conflicting DB25 audio pinouts in modern professional audio.",
        "theory": "Historically, Yamaha and Tascam used different DB25 pinouts. In 2012, AES59 officially standardized the Tascam pinout worldwide. The standard allocates 8 balanced channels: each channel uses three pins (Hot, Cold, Ground). The metal connector shell provides 360-degree bonding to the equipment chassis enclosure under AES-X249 and AES48.",
        "math": "Channel pinout matrix: Ch1 (Hot 24, Cold 12, Gnd 25); Ch2 (Hot 10, Cold 23, Gnd 11); Ch3 (Hot 21, Cold 9, Gnd 22); Ch4 (Hot 7, Cold 20, Gnd 8); Ch5 (Hot 18, Cold 6, Gnd 19); Ch6 (Hot 4, Cold 17, Gnd 5); Ch7 (Hot 15, Cold 3, Gnd 16); Ch8 (Hot 1, Cold 14, Gnd 2). Pin 13 is chassis ground.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       AES59 DB25 PINOUT MATRIX                               |
|                                                                               |
|    13  12  11  10   9   8   7   6   5   4   3   2   1                         |
|     o   o   o   o   o   o   o   o   o   o   o   o   o                         |
|       o   o   o   o   o   o   o   o   o   o   o   o                           |
|      25  24  23  22  21  20  19  18  17  16  15  14                          |
|                                                                               |
|   Standardized worldwide across Avid, Apogee, Focusrite, Lynx, SSL, Universal |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES59-2012: 'AES standard on interconnections - Application of 25-way D-type connectors in balanced audio interconnections'.",
        "takeaways": "1. AES59 is the universal standard for 8-channel audio on DB25.\n2. Pin 13 connects to chassis enclosure.\n3. The metal D-sub hood must provide circumferential 360-degree cable shield grounding (AES-X249).",
        "quiz": "Q: How many balanced analog audio channels does a single AES59 DB25 connector carry?\nA: 8 balanced audio channels (24 pins used for signals, 1 for chassis)."
    },
    {
        "num": 48, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "aes72-quad-twisted-pair-cat-cable-audio",
        "title": "AES72 Quad Twisted Pair (QTP) Standard: Category Cable Audio (RJ45)",
        "tags": ["aes72", "qtp", "rj45", "cat5e", "cat6", "analog-ethernet"],
        "standards": ["AES72", "AES-X246"],
        "equation": "4\\text{ Balanced Analog Channels over Cat5e / Cat6 (4 UTP/STP Pairs)}",
        "summary": "The AES72 standard for transporting 4 balanced audio channels over structured Quad Twisted Pair (Category 5e/6/7) cables and 8P8C (RJ45) modular connectors.",
        "authors": ["Anthony Kuzub", "Bruce Olson"],
        "myth": "Running analog audio over Ethernet cables causes massive crosstalk and RF interference.",
        "theory": "Category 5e and Cat6 network cables feature four tightly twisted pairs with differentiated twist pitches (pair twist rates vary from 65 to 80 twists per meter to minimize inter-pair capacitive and magnetic coupling). AES72 standardizes analog audio transport across these 4 pairs, achieving over 100 dB of channel-to-channel isolation across the audio band. Type 4E defines standard RJ45 pinout: Ch1 (Pins 1/2), Ch2 (Pins 3/6), Ch3 (Pins 4/5), Ch4 (Pins 7/8).",
        "math": "Crosstalk isolation between pairs in Cat6: >100 dB @ 1 kHz, >85 dB @ 20 kHz. Low capacitance (<52 pF/m) supports runs exceeding 100 meters without high-frequency loss.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       AES72 TYPE 4E RJ45 CHANNEL MAPPING                      |
|                                                                               |
|   RJ45 Pin 1 & 2: Pair 2 (Orange/White) -------> Channel 1 (Hot/Cold)         |
|   RJ45 Pin 3 & 6: Pair 3 (Green/White) --------> Channel 2 (Hot/Cold)         |
|   RJ45 Pin 4 & 5: Pair 1 (Blue/White) ---------> Channel 3 (Hot/Cold)         |
|   RJ45 Pin 7 & 8: Pair 4 (Brown/White) --------> Channel 4 (Hot/Cold)         |
|   Connector Metal Shell: Shielded Cat6 STP ====> Overall Chassis Ground       |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES72-2019: 'AES standard on interconnections - Transport of analog audio over quad twisted pair cabling'.",
        "takeaways": "1. Cat6 STP carries 4 balanced channels with broadcast fidelity.\n2. Follow TIA-568-B color code and AES72 Type 4E pinout.\n3. Always use shielded Cat6 (STP/FTP) with metal RJ45 shells for phantom power.",
        "quiz": "Q: In AES72 Type 4E, which RJ45 pins carry Channel 2?\nA: Pins 3 and 6 (the standard Ethernet split pair, Green/White-Green in T568B)."
    },
    {
        "num": 49, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "multichannel-snakes-and-stage-boxes",
        "title": "Multichannel Snakes, Stage Drop Boxes & Splitter Systems",
        "tags": ["snakes", "stage-box", "multichannel", "splitters", "transformers"],
        "standards": ["AES48", "AES59", "AES72"],
        "equation": "\\text{Channel\\_Isolation}_{\\text{dB}} > 100\\text{ dB @ 1 kHz}",
        "summary": "Engineering architecture of multichannel audio snakes, multi-pin disconnects (Mass, Socapex, Whirlwind), and transformer-isolated stage splitters.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "Connecting three mixing consoles to a stage snake with simple parallel Y-splitters is fine if everyone has phantom power turned on.",
        "theory": "Paralleling multiple console inputs divides mic impedance, cuts signal level, and creates catastrophic ground loops between consoles powered from different electrical services. A professional stage splitter uses precision audio transformers: Direct Split (powers mic via 48V from FOH console), and Isolated Splits (transformer-isolated windings with ground-lift switches feeding Monitor and Broadcast consoles).",
        "math": "Transformer isolation voltage breakdown: >1,000 V RMS. Inter-console ground loop current: 0.0 mA.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       3-WAY TRANSFORMER ISOLATED SPLITTER                     |
|                                                                               |
|   Stage Mic In ---> [ Direct Split + 48V Pass ] =======> Front of House (FOH) |
|                            |                                                  |
|                            +---[ Primary ] (((( )))) [ Sec 1 ] => Monitors    |
|                                            (((( )))) [ Sec 2 ] => Broadcast   |
|                                                                               |
|   Ground Lift switches on Sec 1 & 2 break all inter-console ground loops!     |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Section 4 and AES-X152 apply to multi-channel stage drop boxes and splitters.",
        "takeaways": "1. Only ONE console may supply 48V phantom power to a shared microphone.\n2. Use transformer isolation on monitor and broadcast splits.\n3. Individual channel shields must remain isolated from each other inside the snake.",
        "quiz": "Q: In a 3-way transformer-isolated microphone split, which destination supplies 48V phantom power?\nA: The Main / FOH direct pass-through destination only."
    },
    {
        "num": 50, "part_num": 5, "part_title": "Part 5: Cable Transmission Medium & Connector Standards",
        "slug": "connector-contact-resistance-and-noble-platings",
        "title": "Connector Contact Resistance, Oxidation, and Noble Metal Platings",
        "tags": ["connectors", "contact-resistance", "gold", "silver", "oxidation"],
        "standards": ["AES14", "IEC 60268-3"],
        "equation": "R_{\\text{contact}} < 5\\text{ m}\\Omega \\quad \\text{(Initial)}; \\quad \\Delta R < 1\\text{ m}\\Omega \\quad \\text{(Imbalance)}",
        "summary": "Tribology of electrical contacts: gold vs silver platings, galvanic corrosion, wiping action, and contact resistance balance.",
        "authors": ["John Woodgate", "Dennis Bohn"],
        "myth": "Gold contacts always sound better than silver contacts under all circumstances.",
        "theory": "Silver is the most conductive metal known to physics, but it forms silver sulfide tarnish in the presence of atmospheric sulfur. Tarnish is broken down by mechanical wiping action during mating or by signal voltages above 100 mV. Gold does not oxidize or tarnish, making it ideal for microvolt-level microphone signals. Never mate gold contacts with tin contacts, as dissimilar metals induce rapid galvanic corrosion.",
        "math": "Contact resistance imbalance: If Pin 2 has 2 mΩ contact resistance and oxidized Pin 3 has 200 mΩ, ΔR = 198 mΩ. In low-impedance mic circuits (150 Ω), this introduces a 0.13% impedance imbalance, degrading high-frequency CMRR by 15 dB.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CONTACT RESISTANCE & PLATINGS                           |
|                                                                               |
|   GOLD (Au over Ni barrier): Non-oxidizing. Essential for microvolt mic signals|
|   SILVER (Ag): Highest conductivity. Best for high-current speaker/line plugs. |
|                                                                               |
|   DISSIMILAR METALS (Gold into Tin/Nickel): Galvanic corrosion occurs!        |
|   Always match Gold-to-Gold and Silver-to-Silver where possible.              |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES14 Clause 4 specifies contact resistance limits (<5 mΩ) and plating durability.",
        "takeaways": "1. Use gold-plated pins for low-level microphone lines.\n2. Silver plating is superior for high-current line and speaker connections.\n3. Clean tarnished contacts with deoxidizing contact cleaners.",
        "quiz": "Q: Why is gold plating preferred over silver for low-level microphone connectors?\nA: Because gold does not form non-conductive oxide or tarnish layers, ensuring low contact resistance at microvolt signal levels."
    }
]
