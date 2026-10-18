"""
scripts/data_part7.py
Modules 061 - 070: Phantom Power & Transducer Interfacing
"""

PART7_MODULES = [
    {
        "num": 61, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "iec-61938-phantom-power-standards",
        "title": "IEC 61938 Phantom Power Standards: P48, P24, and P12 Specifications",
        "tags": ["phantom-power", "iec61938", "p48", "p24", "p12", "microphones"],
        "standards": ["IEC 61938", "AES-X152"],
        "equation": "V_{\\text{supply}} = 48\\text{ V} \\pm 4\\text{ V}; \\quad R_{\\text{feed}} = 6.81\\text{ k}\\Omega \\pm 0.1\\% \\quad \\text{(P48 Standard)}",
        "summary": "Engineering analysis of IEC 61938: P48, P24, and P12 microphone phantom powering systems, feed resistor tolerances, and current capacity.",
        "authors": ["John Woodgate", "Anthony Kuzub"],
        "myth": "All microphones labeled 'phantom powered' require 48 volts to operate.",
        "theory": "IEC 61938 specifies three standard phantom voltages: P48 (+48V via 6.81 kΩ resistors), P24 (+24V via 1.2 kΩ resistors), and P12 (+12V via 680 Ω resistors). +48V DC is applied equally to both Pin 2 and Pin 3 through precision matched resistors, with the cable shield (Pin 1) serving as the DC ground return. Because Pin 2 and Pin 3 sit at identical DC potentials, dynamic mics experience 0.0V DC differential voltage.",
        "math": "Maximum short-circuit current per microphone in P48: I_max = 48 V / (6.81 kΩ / 2) = 14.1 mA. Under maximum standard microphone current draw (10 mA), the voltage drop across the resistors is 34 V, leaving 14 V DC at the microphone terminals.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       IEC 61938 P48 PHANTOM POWER SYSTEM                      |
|                                                                               |
|   +48V DC Supply ---+---[ R1 = 6.81 kΩ (0.1%) ]---------> Pin 2 (Audio + DC)  |
|                     |                                                         |
|                     +---[ R2 = 6.81 kΩ (0.1%) ]---------> Pin 3 (Audio + DC)  |
|                                                                               |
|   Chassis Ground =======================================> Pin 1 (DC Return)   |
|   (Identical +48V DC on Pin 2 & 3: Differential DC voltage across mic = 0V!)  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 61938:2018: 'Multimedia systems - Guide to the recommended characteristics of analogue interfaces to achieve interoperability'.",
        "takeaways": "1. P48 feed resistors must be 6.81 kΩ matched to 0.1% or better.\n2. Total current per microphone must not exceed 10 mA under IEC 61938.\n3. Cable shield (Pin 1) must be continuous to complete the DC circuit.",
        "quiz": "Q: What is the standard feed resistor value specified by IEC 61938 for +48V phantom power (P48)?\nA: 6.81 kΩ (matched to within 0.1%)."
    },
    {
        "num": 62, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "resistor-bridge-matching-phantom-cmrr",
        "title": "6.81 kΩ Resistor Bridge Matching and Phantom-Induced CMRR Loss",
        "tags": ["phantom-resistors", "6.81k", "bridge-matching", "cmrr-degradation"],
        "standards": ["IEC 61938", "AES-X152"],
        "equation": "\\Delta R = |R_1 - R_2| < 6.8\\ \\Omega \\quad (0.1\\% \\text{ match required for } >80\\text{ dB CMRR})",
        "summary": "How loose tolerance phantom feed resistors destroy preamplifier common-mode rejection and inject power supply ripple.",
        "authors": ["Bill Whitlock", "Jim Brown"],
        "myth": "Standard 1% 6.81 kΩ resistors are good enough for phantom power circuits.",
        "theory": "The two 6.81 kΩ phantom feed resistors sit directly in parallel with the audio signal conductors to AC ground. If R1 and R2 are not precisely matched, any ripple or noise on the +48V phantom power rail is converted into a differential audio buzz. Furthermore, a resistance mismatch creates an immediate source impedance imbalance, destroying the preamp's CMRR for external EMI.",
        "math": "A 1% mismatch between 6.81 kΩ resistors yields ΔR = 68.1 Ω. This massive imbalance degrades preamp CMRR from 85 dB down to less than 45 dB! Power supply rejection ratio (PSRR) collapses, causing audible 120 Hz hum from the phantom supply.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PHANTOM RESISTOR MISMATCH CONVERSION                    |
|                                                                               |
|   +48V Rail (with 10 mV AC Ripple)                                            |
|          |                                                                    |
|          +---[ R1 = 6,810 Ω ]---> Pin 2 (Audio + 5.0 mV Ripple)               |
|          |                                                                    |
|          +---[ R2 = 6,878 Ω ]---> Pin 3 (Audio + 4.9 mV Ripple)               |
|                                                                               |
|   RESULT: 0.1 mV Differential Ripple injected directly into mic preamp!      |
|   Amplified by 60 dB gain = 100 mV of AUDIBLE POWER SUPPLY BUZZ!              |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 61938 Clause 6 mandates 0.1% resistor pair matching for P48 supplies.",
        "takeaways": "1. Always specify 0.1% or hand-matched metal film resistors for phantom power.\n2. Phantom supply ripple must be <0.5 mV RMS.\n3. Resistor mismatch directly converts phantom ripple into differential hum.",
        "quiz": "Q: What is the maximum acceptable tolerance mismatch between the two 6.81 kΩ phantom power feed resistors to preserve high CMRR?\nA: 0.1% (less than 6.8 Ω difference between resistors)."
    },
    {
        "num": 63, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "phantom-menace-turn-on-transients",
        "title": "The Phantom Menace: Turn-On Transients & Mic Preamp Input Destruction",
        "tags": ["phantom-menace", "transients", "turn-on", "hebert-thomas", "preamp-damage"],
        "standards": ["AES Convention Paper 5335", "AES-X152"],
        "equation": "V_{\\text{transient\\_spike}} > 40\\text{ V peak across input BJT base-emitter junction}",
        "summary": "Rosalfonso Bortoni, Gary Hebert, and Frank Thomas's landmark research on phantom power hot-plugging destroying mic preamp inputs.",
        "authors": ["Gary Hebert", "Rosalfonso Bortoni", "Frank Thomas"],
        "myth": "Hot-plugging microphones with +48V phantom turned on is completely harmless.",
        "theory": "When an XLR cable is plugged into a live 48V mic input, contact pins mate non-simultaneously (Pin 1 mates first, but Pin 2 or Pin 3 mates next). If one pin contacts while the other is open, the DC blocking capacitor on the connected pin charges instantaneously to +48V. When the second pin finally makes contact, stored energy discharges violently through the input transistors, exceeding their base-emitter reverse breakdown voltage (typically 5V - 7V) and destroying them.",
        "math": "Discharge current spike: I = C * (dV/dt). A 47 µF DC blocking capacitor discharged across a 10 Ω circuit impedance produces peak pulse currents exceeding 3.5 Amperes, destroying delicate low-noise input transistors in microseconds.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       THE PHANTOM MENACE TRANSIENT SPIKE                      |
|                                                                               |
|   XLR Hot-Plug Moment: Pin 2 connects while Pin 3 is open!                    |
|                                                                               |
|   +48V Surge ===>[ 47 µF Cap ]===> [ Input Transistor Base-Emitter ] ===> Gnd |
|                                              |                                |
|   Reverse Voltage exceeds 40 V! Base-Emitter junction breaks down (zenering),  |
|   causing permanent noise degradation or total transistor burnout!            |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES Convention Paper 5335 ('The Phantom Menace') and AES Paper 7909 ('The Phantom Menace Returns').",
        "takeaways": "1. Turn off +48V phantom power BEFORE plugging or unplugging mic cables.\n2. Modern preamps require ultra-fast clamping diodes to protect input transistors.\n3. Damaged input transistors exhibit crackling, hiss, and elevated noise.",
        "quiz": "Q: What physical mechanism destroys microphone preamplifier input transistors during phantom power hot-plugging?\nA: Reverse base-emitter junction breakdown caused by massive discharge current spikes from AC coupling capacitors."
    },
    {
        "num": 64, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "diode-clamping-and-tvs-protection-networks",
        "title": "Diode Clamping & Transient Voltage Suppression (TVS) Protection Networks",
        "tags": ["diode-clamping", "tvs", "transient-protection", "mic-preamp-protection"],
        "standards": ["AES-X152 Section 4", "IEC 61938"],
        "equation": "V_{\\text{clamp}} = V_{\\text{rail}} + V_{\\text{diode\\_forward}} \\approx \\pm (V_{\\text{rail}} + 0.3\\text{ V})",
        "summary": "Engineering input protection: ultra-fast Schottky clamping diodes, TVS arrays, and series surge-limiting resistors.",
        "authors": ["Gary Hebert", "Dennis Bohn"],
        "myth": "Internal op-amp ESD diodes are sufficient to protect preamps from phantom transients.",
        "theory": "Internal IC ESD diodes are microscopic structures rated for only ~10 mA. A phantom transient delivers several amperes, vaporizing internal IC silicon. Robust protection requires external high-current Schottky diodes (e.g. BAT54S or BAV99) or Transient Voltage Suppression (TVS) diodes clamped to the DC power supply rails, combined with series pulse-limiting resistors.",
        "math": "Energy absorption: Series pulse resistor (typically 22 Ω to 47 Ω) limits peak current to I_peak = 48 V / 47 Ω ≈ 1.0 A. High-speed Schottky diodes clamp the voltage to within 0.3V of the +/-15V supply rails.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       INPUT CLAMPING PROTECTION NETWORK                       |
|                                                                               |
|                                       +15V Rail                               |
|                                           |                                   |
|                                         [ D1: Schottky Clamp ]                |
|                                           |                                   |
|   Pin 2 ----[ 22 Ω Pulse Limiter ]--------+----[ DC Block Cap ]---> Preamp In |
|                                           |                                   |
|                                         [ D2: Schottky Clamp ]                |
|                                           |                                   |
|                                       -15V Rail                               |
|                                                                               |
|   Transients clamped safely to power rails before reaching semiconductors!    |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 4 outlines input transient protection standards.",
        "takeaways": "1. External Schottky clamping diodes are mandatory on phantom-powered mic inputs.\n2. Series resistors limit peak surge current.\n3. TVS diode arrays provide secondary sub-nanosecond overvoltage clamping.",
        "quiz": "Q: Why are internal op-amp ESD diodes incapable of protecting against phantom power hot-plug transients?\nA: Because internal diodes have tiny microscopic junctions that burn open when exposed to the multi-ampere energy of large DC coupling capacitors."
    },
    {
        "num": 65, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "dynamic-microphones-and-voice-coil-interfacing",
        "title": "Dynamic Microphones & Floating Low-Impedance Voice-Coil Interfacing",
        "tags": ["dynamic-mic", "voice-coil", "shure-sm58", "floating-transducer"],
        "standards": ["IEC 60268-4", "AES-X152"],
        "equation": "Z_{\\text{voice\\_coil}}(f) = R_{\\text{dc}} + j\\omega L_{\\text{coil}} \\approx 150\\ \\Omega \\text{ to } 300\\ \\Omega",
        "summary": "Electro-acoustic interfacing of moving-coil dynamic microphones (e.g. Shure SM57/SM58): voice-coil impedance, floating coils, and loading.",
        "authors": ["John Woodgate", "Anthony Kuzub"],
        "myth": "Moving-coil dynamic microphones are damaged if +48V phantom power is turned on.",
        "theory": "A standard dynamic microphone uses a lightweight voice coil suspended in a permanent magnetic field. The coil connects across Pin 2 and Pin 3 with NO connection to Pin 1 or the microphone body. When plugged into a properly wired P48 input, +48V DC appears identically on both Pin 2 and Pin 3. The differential DC voltage across the coil is 0.000 V. Zero DC current flows through the coil; the microphone operates normally and suffers zero damage.",
        "math": "V_coil_DC = V_pin2 - V_pin3 = (+48V) - (+48V) = 0.00 V. Ohmic DC dissipation = V^2 / R = 0.00 Watts.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       DYNAMIC MICROPHONE FLOATING VOICE COIL                  |
|                                                                               |
|   +48V DC Rail -----------------------+-----------------------+               |
|                                       |                       |               |
|                                   [ 6.81k ]               [ 6.81k ]           |
|                                       |                       |               |
|   Pin 2 (+48V DC) -------------> [ Voice Coil: 150 Ω ] <------------- Pin 3 (+48V DC)
|                                       |                                       |
|                                (DC Voltage = 0V!)                             |
|                                                                               |
|   Pin 1 (Chassis Shield) =====> Microphone Metal Body (Zero DC Connection)    |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 60268-4: 'Sound system equipment - Microphones' and AES-X152.",
        "takeaways": "1. Correctly wired dynamic mics are 100% immune to damage from phantom power.\n2. The voice coil is completely floating from the microphone body and Pin 1.\n3. Problems only occur if a cable has a Pin 1 to Pin 2/3 short.",
        "quiz": "Q: Why is a properly wired dynamic microphone undamaged by +48V phantom power?\nA: Because both ends of the voice coil sit at the same DC voltage (+48V), resulting in zero differential DC voltage and zero current flow through the coil."
    },
    {
        "num": 66, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "ribbon-microphones-transformer-coupling-p48-hazard",
        "title": "Ribbon Microphones: Transformer Coupling, DC Hazard & P48 Protection",
        "tags": ["ribbon-mic", "dc-hazard", "transformer", "corrugated-aluminum", "royer"],
        "standards": ["AES-X152", "IEC 61938"],
        "equation": "I_{\\text{ribbon}} = \\frac{V_{\\text{DC\\_unbalance}}}{R_{\\text{ribbon\\_reflected}}} \\quad \\text{(A few mV DC can stretch or pop the ribbon!)}",
        "summary": "The vulnerability of passive ribbon microphones to DC phantom power imbalances, patchbay shorts, and blown ribbons.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "Passive ribbon microphones are always destroyed instantly the second phantom power is switched on.",
        "theory": "A passive ribbon mic uses an ultra-thin corrugated aluminum foil strip (typically 1.5 to 2.5 microns thick) with extremely low electrical resistance (~0.2 Ω). An internal step-up transformer converts this to 200 Ω. In an ideal balanced system with matched resistors, phantom power produces 0V DC across the transformer secondary. However, if a cable has an open conductor, or if a patchbay plug shorts Pin 2 or 3 to ground during insertion, DC current surges through the transformer, inducing a massive DC pulse that physically stretches or destroys the delicate ribbon!",
        "math": "Transformer step-up turns ratio: N = 1:30. A momentary 10 mV DC pulse on the secondary transforms into a 300 mV pulse across the 0.2 Ω ribbon, driving 1.5 Amperes through a foil strip thinner than a human hair!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PASSIVE RIBBON MICROPHONE DC HAZARD                     |
|                                                                               |
|   Pin 2 ----[ Secondary ] (((( )))) [ Primary ] ----+                         |
|                 |                                   |                         |
|                 |                            [ ULTRA-THIN RIBBON: 0.2 Ω ]     |
|                 |                                   |                         |
|   Pin 3 ----[ Secondary ] (((( )))) [ Primary ] ----+                         |
|                                                                               |
|   CAUTION: Any DC imbalance or patchbay short pulses the ribbon, stretching   |
|   the aluminum foil and permanently ruining frequency response!              |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6 and IEC 61938 warn against DC current in ribbon transducers.",
        "takeaways": "1. Turn phantom power OFF when using passive ribbon microphones.\n2. Never patch ribbon mics through live 1/4\" or TT patchbays with phantom active.\n3. Active ribbon mics (with internal buffer amps) require phantom power safely.",
        "quiz": "Q: What event poses the greatest risk of destroying a passive ribbon microphone when phantom power is active?\nA: Hot-plugging or patchbay insertion, where contacts short non-simultaneously, sending a high DC pulse through the step-up transformer."
    },
    {
        "num": 67, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "active-condenser-microphones-phantom-extraction",
        "title": "Active Condenser Microphones: Phantom Extraction & Impedance Match",
        "tags": ["condenser-mic", "dc-converter", "fet-impedance-converter", "capsule", "neumann"],
        "standards": ["IEC 61938", "AES-X152"],
        "equation": "V_{\\text{polarization}} = 40\\text{ V to } 80\\text{ V DC} \\quad \\text{(Extracted from P48 via DC-DC multiplier)}",
        "summary": "Internal electronics of condenser microphones: FET impedance conversion, capsule polarization voltage, and audio line driving.",
        "authors": ["John Woodgate", "Anthony Kuzub"],
        "myth": "Condenser microphone capsules generate audio current directly into the cable.",
        "theory": "A condenser capsule consists of a conductive diaphragm and fixed backplate forming a variable capacitor (~50 pF). Acoustic pressure changes capacitance: ΔV = Q / ΔC. Because capsule impedance is astronomical (gigohms), it cannot drive even a few inches of cable. Internal electronics use a junction FET (JFET) or miniature vacuum tube as an ultra-high-impedance unity-gain buffer, powered by extracting DC current from the P48 line.",
        "math": "Capsule charge equation: Q = C * V. To prevent bass roll-off, the gate bias resistor must be R_gate > 1 Gigohm (1,000,000,000 Ω) to yield f_corner = 1 / (2*π*1G*50pF) ≈ 3.18 Hz.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CONDENSER MICROPHONE INTERNAL TOPOLOGY                  |
|                                                                               |
|   [ Condenser Capsule (50 pF) ]                                               |
|          |                                                                    |
|          +---> [ Gate: JFET Buffer ] ----> [ Balanced Driver Stage ] -> Pins 2/3
|          |                                         |                          |
|     [ 1 GΩ Bias ]                        <===[ P48 DC Extraction ]            |
|          |                                         |                          |
|   [ +60V DC Polarizer ] <--------------------------+                          |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 61938 and IEC 60268-4 govern condenser microphone powering and interface standards.",
        "takeaways": "1. True condenser mics require phantom power for both capsule bias and FET buffer.\n2. Electret condensers have pre-polarized capsules but still need power for the FET buffer.\n3. Output stages are typically active impedance-balanced or transformer-coupled.",
        "quiz": "Q: What is the primary purpose of the internal JFET in a condenser microphone?\nA: To convert the astronomical impedance (gigohms) of the condenser capsule down to a low impedance capable of driving audio lines."
    },
    {
        "num": 68, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "passive-direct-injection-di-boxes",
        "title": "Passive Direct Injection (DI) Boxes: Transformer Isolation & Loading",
        "tags": ["passive-di", "transformer", "direct-box", "instrument-to-mic"],
        "standards": ["AES-X152", "IEC 60268-3"],
        "equation": "Z_{\\text{in}} = N^2 * Z_{\\text{load}}; \\quad \\frac{Z_{\\text{in}}}{Z_{\\text{out}}} = \\left(\\frac{N_p}{N_s}\\right)^2 \\approx 100:1",
        "summary": "Passive Direct Injection (DI) boxes: mu-metal shielded transformers, step-down turns ratios, and guitar pickup loading.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "A passive DI box works great on passive electric guitars and basses.",
        "theory": "A passive DI box uses a high-performance audio transformer with a step-down turns ratio (typically 10:1 or 12:1). It performs two critical functions: impedance step-down (converting instrument-level ~50 kΩ to mic-level ~150 Ω) and 100% galvanic isolation (breaking ground loops via ground-lift switch). However, because impedance scales with the square of turns ratio (Z_in = N^2 * Z_out), a 10:1 transformer driving a 1.5 kΩ mic preamp presents an input impedance of only 150 kΩ, which loads passive guitar pickups and causes noticeable high-frequency dulling.",
        "math": "Turns ratio N = 10:1. Voltage attenuation = -20 dB (converts instrument level to mic level). Input impedance: Z_in = 100 * 1,500 Ω = 150 kΩ. Suitable for active keyboards and basses, but low for passive single-coil guitars.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PASSIVE DIRECT INJECTION (DI) BOX                       |
|                                                                               |
|   1/4" Inst In ----[ Primary: 10 Turns ] (((( )))) [ Secondary: 1 Turn ] -> Pin 2 (Mic Hot)
|                           |             Mu-Metal          |                   
|   1/4" Thru Out           |              Shield           |                 -> Pin 3 (Mic Cold)
|                           |                               |                   
|   1/4" Sleeve Gnd --------+                       [ Ground Lift Switch ] ===> Pin 1 (Chassis)
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.3 and IEC 60268-3 cover passive DI transformer specs.",
        "takeaways": "1. Passive DIs require no power and provide total galvanic isolation.\n2. Best suited for active electronic instruments (keyboards, active basses, DJ gear).\n3. Use active DI boxes for high-impedance passive guitar pickups to prevent loading.",
        "quiz": "Q: Why is an active DI box preferred over a passive DI box for passive electric guitars with single-coil pickups?\nA: Because passive DIs present too low an input impedance (~150 kΩ), loading the pickups and causing high-frequency treble loss, whereas active DIs provide >1 Megohm impedance."
    },
    {
        "num": 69, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "active-direct-injection-di-boxes-fet-buffers",
        "title": "Active Direct Injection (DI) Boxes: High-Z FET Buffers & Phantom Powering",
        "tags": ["active-di", "fet-buffer", "high-z-input", "phantom-powered", "countryman"],
        "standards": ["IEC 61938", "AES-X152"],
        "equation": "Z_{\\text{in\\_active}} \\ge 1.0\\text{ M}\\Omega \\text{ to } 10\\text{ M}\\Omega \\quad \\text{(Zero pickup loading)}",
        "summary": "Active DI box architecture: high-impedance JFET/CMOS input buffers, phantom power extraction, and balanced output driving.",
        "authors": ["Dennis Bohn", "Bill Whitlock"],
        "myth": "Active DI boxes always have better galvanic isolation than passive DI boxes.",
        "theory": "An active DI box (e.g. Countryman Type 85 or BSS AR-133) uses an active discrete FET or low-noise op-amp buffer stage powered by +48V phantom power or an internal 9V battery. It presents an input impedance of 1.0 Megohm to 10 Megohms, completely eliminating pickup loading and preserving sparkling high-frequency harmonics on passive guitars and acoustic piezos.",
        "math": "Input loading: With Z_in = 10 MΩ and guitar pickup Z_s = 10 kΩ, signal loss is 20 * log10(10M / 10.01M) = 0.008 dB (practically zero loss across all frequencies).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       ACTIVE DIRECT INJECTION (DI) BOX                        |
|                                                                               |
|   1/4" Inst In ---> [ High-Z JFET Buffer (10 MΩ) ] ---> [ Balanced Driver ] -> Pins 2/3
|                               |                                |              
|   1/4" Sleeve Gnd ------------+                     <===[ P48 Phantom Power ]  
|                               |                                |              
|                       [ Opto / Transformer Isolation ] ===> [ Ground Lift ] -> Pin 1
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 61938 and AES-X152 Section 6 govern active direct injection equipment.",
        "takeaways": "1. 10 Megohm input impedance prevents pickup loading on passive instruments.\n2. Powered seamlessly via IEC 61938 P48 phantom power.\n3. Premium active DIs include internal transformer isolation to maintain ground-lifting capability.",
        "quiz": "Q: What is the typical input impedance of a professional active direct injection box?\nA: 1.0 Megohm to 10 Megohms."
    },
    {
        "num": 70, "part_num": 7, "part_title": "Part 7: Phantom Power & Transducer Interfacing",
        "slug": "piezo-pickups-ultra-high-impedance-buffers",
        "title": "Piezo Pickups, Ultra-High Input Impedances (10MΩ), and Buffer Stages",
        "tags": ["piezo", "ultra-high-z", "10-megohm", "acoustic-instruments", "phase"],
        "standards": ["AES-X152 Section 3"],
        "equation": "f_{\\text{bass\\_cutoff}} = \\frac{1}{2\\pi * R_{\\text{in}} * C_{\\text{piezo}}}",
        "summary": "The electrical physics of piezoelectric crystals: pure capacitive sources, bass loss into standard inputs, and 10 Megohm buffer design.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "Piezo pickups have thin, harsh sound because the crystals inherently lack low frequencies.",
        "theory": "A piezoelectric pickup is an electrical capacitor (typically 500 pF to 2 nF) that generates charge when mechanically stressed. When connected to a standard 10 kΩ line input or even a 100 kΩ instrument input, the pickup capacitance forms a high-pass filter with the load resistor, cutting off all low bass frequencies and shifting phase, creating the notorious 'thin, quacky' piezo sound. Terminating a piezo into 10 Megohms restores full, deep bass response down to 10 Hz.",
        "math": "For C_piezo = 1.0 nF: Loaded into 100 kΩ: f_cutoff = 1 / (2*π*100k*1nF) = 1,591 Hz (All bass and midrange destroyed!). Loaded into 10 MΩ: f_cutoff = 1 / (2*π*10M*1nF) = 15.9 Hz (Full rich bass restored!).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PIEZO FREQUENCY RESPONSE VS LOAD                        |
|                                                                               |
|   Piezo (1 nF) into 100 kΩ Input:  -3 dB @ 1.59 kHz (TINNY, HARSH QUACK!)     |
|                                                                               |
|   Piezo (1 nF) into 1.0 MΩ Input:  -3 dB @ 159 Hz   (THIN BASS)               |
|                                                                               |
|   Piezo (1 nF) into 10 MΩ Buffer:  -3 dB @ 15.9 Hz  (FULL DEEP BASS SOUND!)   |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 3 requires declaring input impedance for transducer buffers.",
        "takeaways": "1. Piezo transducers are purely capacitive sources.\n2. Must be loaded with at least 5 MΩ to 10 MΩ to reproduce low bass frequencies.\n3. Buffer amplifier must be located as close as possible to the pickup.",
        "quiz": "Q: Why does plugging an acoustic guitar with a passive piezo pickup into a standard mixer line input (10 kΩ) sound thin and harsh?\nA: Because the small capacitance of the piezo crystal forms a high-pass filter with the 10 kΩ load, cutting off all audio frequencies below 1.5 kHz."
    }
]
