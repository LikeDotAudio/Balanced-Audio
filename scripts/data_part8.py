"""
scripts/data_part8.py
Modules 071 - 080: Interconnection Compatibility, Adapters & Safety
"""

PART8_MODULES = [
    {
        "num": 71, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "richard-hess-interconnection-philosophy",
        "title": "Richard L. Hess Interconnection Compatibility Philosophy",
        "tags": ["hess-matrix", "compatibility", "interconnection", "unbalanced-to-balanced"],
        "standards": ["AES-X152", "AES48"],
        "equation": "\\text{Compatibility} = f(\\text{Source Topology}, \\text{Destination Topology}, \\text{Cable Wiring})",
        "summary": "Richard L. Hess's definitive interconnection framework: identifying driver topology before choosing adapter cable wiring.",
        "authors": ["Richard L. Hess", "Bill Whitlock"],
        "myth": "There is a single universal wiring adapter that safely connects any balanced output to any unbalanced input.",
        "theory": "Richard L. Hess (AES Fellow) established that no single adapter cable can connect balanced equipment to unbalanced gear safely. Because different output topologies behave completely differently when Pin 3 is grounded (Push-pull distorts, transformer shorts winding, impedance-balanced works perfectly, cross-coupled requires grounding), you must first identify the output topology before choosing how to wire the adapter cable.",
        "math": "Hess Decision Matrix: If Topology 6.1 -> Float Pin 3 (-6 dB level). If Topology 6.2 -> Tie Pin 3 to 1 or Float (0 dB loss). If Topology 6.3 -> Must ground Pin 3 (0 dB loss). If Topology 6.5 -> Must ground Pin 3 (+6 dB auto boost, 0 dB net loss).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       RICHARD HESS COMPATIBILITY DECISION FLOW                |
|                                                                               |
|   Identify Output Topology:                                                   |
|     |                                                                         |
|     +---> 6.1 Push-Pull ----------> FLOAT PIN 3! (Do not short to ground)     |
|     +---> 6.2 Impedance-Balanced -> TIE PIN 3 OR FLOAT (Safe either way)      |
|     +---> 6.3 Transformer Float --> MUST GROUND PIN 3 TO SLEEVE               |
|     +---> 6.5 Cross-Coupled ------> MUST GROUND PIN 3 TO SLEEVE               |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 and Richard L. Hess: 'Interconnecting Balanced and Unbalanced Audio Equipment' (AES/Rane literature).",
        "takeaways": "1. Never wire an adapter cable without knowing the driver topology.\n2. When in doubt, check equipment schematics or service manuals.\n3. Hess matrix prevents blown op-amps and distorted audio.",
        "quiz": "Q: According to the Richard Hess compatibility matrix, what happens if you use a commercial XLR-to-RCA adapter that shorts Pin 3 to Pin 1 on a Topology 6.1 push-pull driver?\nA: The inverted output op-amp is shorted to ground, resulting in severe harmonic distortion and overheating."
    },
    {
        "num": 72, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "interfacing-balanced-outputs-to-unbalanced-inputs",
        "title": "Interfacing Balanced Outputs to Unbalanced Inputs (By Driver Topology)",
        "tags": ["balanced-to-unbalanced", "wiring", "push-pull", "impedance-balanced"],
        "standards": ["AES-X152 Section 6", "AES48"],
        "equation": "\\text{Gain\\_Loss}_{\\text{6.1}} = -6.02\\text{ dB}; \\quad \\text{Gain\\_Loss}_{\\text{6.2}} = 0.00\\text{ dB}",
        "summary": "Step-by-step wiring rules for connecting all 8 AES-X152 output topologies into unbalanced single-ended inputs.",
        "authors": ["Richard L. Hess", "Dennis Bohn"],
        "myth": "Connecting balanced gear to unbalanced gear always causes a 6 dB signal drop.",
        "theory": "Level drop depends entirely on the source topology. Topology 6.1 push-pull drops by 6 dB because half the differential voltage on Pin 3 is left unused. Topology 6.2 impedance-balanced has 0 dB loss because the full signal voltage is on Pin 2. Topology 6.5 cross-coupled senses the grounded cold leg and automatically boosts Pin 2 by +6 dB, preserving 100% of nominal level.",
        "math": "20 * log10(V_hot / V_differential) = 20 * log10(0.5) = -6.02 dB for symmetrical push-pull.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       BALANCED TO UNBALANCED WIRING MATRIX                    |
|                                                                               |
|   TOPOLOGY 6.1 (PUSH-PULL):                                                   |
|   Pin 2 (Hot) -------------> Tip (Audio In)                                   |
|   Pin 3 (Cold) ------------> [ FLOAT / LEAVE DISCONNECTED! ]                  |
|   Pin 1 (Chassis) ---------> Sleeve (Ground)                                  |
|                                                                               |
|   TOPOLOGY 6.3 (TRANSFORMER FLOATING):                                        |
|   Pin 2 (Hot) -------------> Tip (Audio In)                                   |
|   Pin 3 (Cold) ------------+                                                  |
|                            +-> Sleeve (Ground / Reference)                    |
|   Pin 1 (Chassis) ---------+                                                  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6 compatibility disclosure guidelines.",
        "takeaways": "1. Label custom adapter cables with their intended topology.\n2. Use a direct box or isolation transformer for foolproof interfacing.\n3. Account for 6 dB level offsets in system gain staging.",
        "quiz": "Q: Why does a Topology 6.1 push-pull output suffer a 6 dB level drop when connected to an unbalanced input with Pin 3 floating?\nA: Because the differential signal is split equally between Pin 2 and Pin 3; discarding Pin 3 discards half the voltage (V/2 = -6.02 dB)."
    },
    {
        "num": 73, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "interfacing-unbalanced-outputs-to-balanced-inputs",
        "title": "Interfacing Unbalanced Outputs to Balanced Inputs (Pseudo-Balancing)",
        "tags": ["unbalanced-to-balanced", "pseudo-balanced", "hum-cancellation"],
        "standards": ["AES-X152", "AES48"],
        "equation": "\\text{CMRR}_{\\text{pseudo}} \\approx 20 * \\log_{10}\\left(\\frac{Z_{\\text{cm\\_rx}}}{R_{\\text{shield\\_source}}}\\right) > 60\\text{ dB}",
        "summary": "Pseudo-balanced cable architecture: converting unbalanced sources to balanced inputs with full ground hum cancellation.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "To connect an RCA output to an XLR input, you just connect an RCA cable and use a cheap mono adapter at the mixer.",
        "theory": "Connecting an unbalanced RCA output using standard coaxial cable sends ground hum current directly along the shield return. A pseudo-balanced cable uses 2-conductor shielded twisted pair: Conductor 1 connects RCA center pin to XLR Pin 2 (Hot); Conductor 2 connects RCA outer shield to XLR Pin 3 (Cold); and the cable shield connects ONLY to XLR Pin 1 (Chassis Ground) at the balanced destination end. The balanced receiver senses and subtracts ground noise between the chassis, eliminating hum!",
        "math": "Induced hum cancellation: Both Conductor 1 and Conductor 2 are terminated at the source with nearly equal impedances (RCA output impedance ~50 Ω vs ground ~0 Ω). The receiver subtracts the ground voltage differential Vgvd, achieving 40 dB to 60 dB hum reduction without an active direct box.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PSEUDO-BALANCED CABLE WIRING                            |
|                                                                               |
|   [Unbalanced RCA Source]                            [Balanced XLR Receiver]  |
|   Center Pin (Audio) --------- Twisted Pair Wire 1 ------> Pin 2 (Hot +)      |
|                                                                               |
|   Outer Shell (0V Ground) ---- Twisted Pair Wire 2 ------> Pin 3 (Cold -)     |
|                                                                               |
|   [ NO CONNECTION! ] ========= Cable Shield (Braided) ===> Pin 1 (Chassis)    |
|   (Shield connected at balanced end ONLY: Hum canceled completely!)           |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Annex D and AES-X152 Section 6 recommend pseudo-balanced cable wiring.",
        "takeaways": "1. Always use shielded twisted pair for RCA-to-XLR cables.\n2. Tie the shield to Pin 1 at the balanced input ONLY.\n3. Eliminates hum without transformers or DI boxes.",
        "quiz": "Q: In a pseudo-balanced RCA-to-XLR cable, where is the cable outer shield connected?\nA: Connected to Pin 1 (chassis ground) at the balanced XLR destination end only; left floating at the RCA source end."
    },
    {
        "num": 74, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "rca-to-xlr-adapter-wiring-rules",
        "title": "RCA to XLR Adapter Wiring (Breaking the Ground Loop Trap)",
        "tags": ["rca-to-xlr", "adapters", "pin1-pin3-jumper", "wiring-hazard"],
        "standards": ["AES14", "AES48"],
        "equation": "I_{\\text{loop}} = 0\\text{ A} \\quad \\text{(when ground loop path is broken at shield)}",
        "summary": "Why commercial molded RCA-to-XLR adapters cause hum, and how to wire custom adapters that comply with AES48.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "Store-bought RCA-to-XLR barrel adapters are wired correctly for pro audio installations.",
        "theory": "Most commercial molded RCA-to-XLR adapters feature an internal hard jumper connecting Pin 1 directly to Pin 3 inside the XLR barrel. When plugged into a system with ground potential differences, this jumper routes hundreds of milliamperes of AC shield ground current directly into the signal conductor! This injects loud 60 Hz hum and buzz into the receiving audio electronics.",
        "math": "Ohmic injection: V_hum = I_shield * R_contact. A 500 mA ground current through a 100 mΩ contact resistance injects 50 mV of audible hum directly across the audio input terminals.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       COMMERCIAL ADAPTER HAZARD JUMPER                        |
|                                                                               |
|   COMMERCIAL BARREL ADAPTER (HAZARDOUS):                                      |
|   RCA Center ---> Pin 2                                                       |
|   RCA Shell  ---> Pin 1 + Pin 3 JUMPERED TOGETHER INSIDE SHELL!               |
|                   (Injects ground loop current straight into audio path!)     |
|                                                                               |
|   CORRECT AES48 CUSTOM WIRING:                                                |
|   RCA Center ---> Pin 2 (Signal Hot)                                          |
|   RCA Shell  ---> Pin 3 (Signal Cold / Ground Reference)                      |
|   Cable Shield -> Pin 1 (Chassis Ground at Destination Only)                  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Clause 4 and AES14 Table 2 strictly prohibit jumpering Pin 1 and Pin 3 inside connector shells.",
        "takeaways": "1. Avoid cheap molded RCA-to-XLR barrel adapters in studio setups.\n2. Wire custom cables using two-conductor shielded twisted pair.\n3. Never bridge Pin 1 to Pin 3 inside an XLR plug.",
        "quiz": "Q: What is the design flaw present in almost all cheap molded commercial RCA-to-XLR adapters?\nA: An internal wire jumper directly tying Pin 1 (chassis shield) to Pin 3 (audio cold), forcing ground loop current into the audio signal path."
    },
    {
        "num": 75, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "quarter-inch-ts-mono-to-trs-interconnections",
        "title": "1/4\" TS Mono to 1/4\" TRS Balanced Interconnections",
        "tags": ["ts-to-trs", "phone-jack", "mono-plug", "ring-shorting-hazard"],
        "standards": ["AES14", "AES-X152"],
        "equation": "R_{\\text{ring-sleeve}} = 0.0\\ \\Omega \\quad \\text{(Metal TS sleeve shorts jack Ring contact)}",
        "summary": "Mechanical and electrical interactions when plugging 2-conductor (TS) mono plugs into 3-conductor (TRS) balanced jacks.",
        "authors": ["Dennis Bohn", "Anthony Kuzub"],
        "myth": "A 1/4\" TRS balanced jack will always reject noise even if you plug a mono TS guitar cable into it.",
        "theory": "The long metal sleeve of a standard 1/4\" TS mono plug physically spans across both the Ring and Sleeve contact springs inside a 1/4\" TRS jack. Inserting a TS plug mechanically and electrically shorts the jack's Ring contact (Pin 3) directly to the Sleeve (Pin 1/ground). If the jack is a Topology 6.1 push-pull output, this shorts an active op-amp to ground. If it is a balanced input, it converts the differential stage into an unbalanced input with zero CMRR.",
        "math": "When Ring is shorted to Sleeve: V_ring = 0.0 V. For balanced input: V_out = V_tip - V_ring = V_tip - 0 = V_tip (Standard single-ended operation, zero common-mode rejection).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TS PLUG IN TRS JACK MECHANICAL INTERACTION              |
|                                                                               |
|   1/4" TRS JACK CONTACTS:     [ TIP (Hot) ]    [ RING (Cold) ]  [ SLEEVE (Gnd)]|
|                                     |                 |               |       |
|   INSERTING TS MONO PLUG:     [ TIP Plug ]     [ === LONG SLEEVE Plug === ]   |
|                                                       |               |       |
|                                       RING IS SHORTED TO SLEEVE AUTOMATICALLY!|
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES14 Section 5 and AES-X152 Section 6 document phone jack contact wiping behavior.",
        "takeaways": "1. Inserting TS plug into TRS output shorts Ring to ground.\n2. Only safe on Topology 6.2 impedance-balanced or 6.5 cross-coupled outputs.\n3. Causes severe distortion on Topology 6.1 push-pull outputs.",
        "quiz": "Q: What electrical connection is formed when a mono 1/4\" TS plug is inserted into a balanced 1/4\" TRS jack?\nA: The Ring contact inside the jack is physically shorted to the Sleeve (ground) contact by the long metal plug sleeve."
    },
    {
        "num": 76, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "patchbay-normaling-topologies",
        "title": "Patchbay Normaling Topologies: Full-Normal, Half-Normal, and Isolated",
        "tags": ["patchbay", "normaling", "half-normal", "full-normal", "studio-routing"],
        "standards": ["AES-X152", "AES14"],
        "equation": "\\text{Signal Routing: Top Jack (Source)} \\rightarrow [ \\text{Normals} ] \\rightarrow \\text{Bottom Jack (Destination)}",
        "summary": "Engineering patchbays: mechanical internal normal switches, half-normal bridging splits, full-normal isolation, and parallel patching.",
        "authors": ["Anthony Kuzub", "John Woodgate"],
        "myth": "All patchbays are wired the same way inside.",
        "theory": "Professional patchbays route standard studio connections without patch cords using mechanical shunt contacts ('normals') inside each jack pair (Top = Output/Source, Bottom = Input/Destination):",
        "math": """
- **Full-Normal**: Inserting a patch cord into EITHER top or bottom jack breaks the internal normal connection completely.
- **Half-Normal (Most Common)**: Inserting a cord into the Top jack allows the signal to continue to the bottom jack while tapping a copy ('mult/split'); inserting into the Bottom jack breaks the normal to accept an external signal.
- **Non-Normal / Isolated**: No internal connection exists between top and bottom jacks.""",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       HALF-NORMAL PATCHBAY OPERATION                          |
|                                                                               |
|   [ TOP JACK: Preamp Out ] ----+------------------------------> Destination   |
|                                |                                              |
|                           [ Switch Contacts ]                                 |
|                                |                                              |
|   [ BOTTOM JACK: ADC In ] <----+ (Broken ONLY when plug is inserted into      |
|                                   bottom jack!)                               |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 4 and MIL-STD patchbay specifications.",
        "takeaways": "1. Half-normal is standard for console inserts and converter connections.\n2. Full-normal is standard for high-gain microphone lines.\n3. Regularly clean patchbay normal switch contacts to prevent intermittent audio dropouts.",
        "quiz": "Q: What is the behavior of a half-normalled patchbay jack pair when a patch cable is plugged into the top jack?\nA: The signal continues to flow down into the bottom jack while also being sent down the patch cable (a bridging split/mult)."
    },
    {
        "num": 77, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "ground-loops-in-patchbay-installations",
        "title": "Ground Loops and Ground Bus Architecture in Patchbay Installations",
        "tags": ["patchbay-grounding", "ground-bus", "isolated-grounds", "facility-wiring"],
        "standards": ["AES48", "IEEE 1100"],
        "equation": "Z_{\\text{bus\\_bar}} < 1\\text{ m}\\Omega \\quad \\text{(Solid copper ground bus across patchbay)}",
        "summary": "Facility grounding architectures for patchbays: bussed grounds, vertically strapped grounds, and completely isolated jack sleeves.",
        "authors": ["Bill Whitlock", "Bruce Olson"],
        "myth": "All jack sleeves on a patchbay should be soldered together to a single ground wire.",
        "theory": "Soldering all patchbay jack sleeves together creates an enormous ground loop mesh inside the rack, interconnecting the chassis grounds of dozens of different devices. Modern best practice mandates completely isolated jack sleeves (where each cable shield passes directly through the patchbay from source to destination without touching adjacent jacks or patchbay chassis), or solid heavy copper bus bars bonded directly to the equipment rack frame under AES48.",
        "math": "Loop impedance in isolated patchbay: Z_loop between channels = Infinity (No cross-channel ground current circulation).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PATCHBAY GROUNDING TOPOLOGIES                           |
|                                                                               |
|   1. ISOLATED SLEEVES (Best Modern Practice):                                 |
|      Each channel's shield passes straight through, 100% isolated from others.|
|                                                                               |
|   2. VERTICALLY STRAPPED: Top sleeve connects to bottom sleeve only.          |
|                                                                               |
|   3. BUSSED GROUNDS (Hazardous): All sleeves soldered together; causes loops! |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Section 4 and IEEE 1100 (Emerald Book) facility grounding guidelines.",
        "takeaways": "1. Specify patchbays with fully isolated jack sleeves.\n2. Never daisy-chain ground wires across patchbay rows.\n3. Bond patchbay metal subframes directly to rack equipotential grounding bars.",
        "quiz": "Q: Why is isolated sleeve grounding preferred in modern patchbay installations?\nA: It prevents ground currents from different pieces of equipment from mixing together across adjacent patch channels."
    },
    {
        "num": 78, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "electrical-safety-preventing-phantom-feeds",
        "title": "Electrical Safety: Preventing Accidental 48V Feeds into Line Equipment",
        "tags": ["phantom-hazard", "blocking-capacitors", "line-gear-safety", "safety"],
        "standards": ["IEC 61938", "AES-X152"],
        "equation": "V_{\\text{applied}} = +48\\text{ V DC} \\quad \\text{into op-amp output with 25V-rated DC coupling caps}",
        "summary": "What happens when line-level outputs (keyboards, preamps, processors) are accidentally plugged into 48V phantom-powered mic inputs.",
        "authors": ["Anthony Kuzub", "Gary Hebert"],
        "myth": "All modern professional line-level equipment is built to survive +48V phantom power on its outputs.",
        "theory": "Many line-level outputs (especially budget interfaces, synthesizers, and vintage processors) utilize 16V or 25V DC blocking capacitors or direct DC-coupled op-amps without reverse diode protection. Plugging these outputs into a console mic input with +48V phantom power active subjects the output capacitors to reverse overvoltage, causing electrolytic dielectric breakdown, capacitor explosion, or blown op-amp silicon.",
        "math": "Overvoltage condition: 48V applied across 25V-rated electrolytic capacitor -> 192% of rated dielectric breakdown voltage.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       ACCIDENTAL PHANTOM FEED INTO LINE OUTPUT                |
|                                                                               |
|   [ Mic Input with +48V Active ] ==========================> [ Line Out Op-Amp ]
|                                       |                             |         
|                                (+48V DC Surge)            [ 25V Cap: EXPLODES!]
|                                       |                             |         
|                                       +-------------------> [ Op-Amp Silicon:  
|                                                               VAPORIZES! ]    
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 61938 and AES-X152 Section 4 recommend robust DC voltage withholding on all output stages.",
        "takeaways": "1. Never plug line-level gear into mic inputs with phantom power active.\n2. Use a passive direct box (DI) to protect line gear from phantom power.\n3. Equipment designers should specify 63V-rated DC blocking caps with clamping diodes.",
        "quiz": "Q: What is the safest way to connect a line-level synthesizer or keyboard into a stage snake that has +48V phantom power enabled?\nA: Route through a passive Direct Injection (DI) box, which provides transformer galvanic isolation against DC voltages."
    },
    {
        "num": 79, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "speaker-level-interfacing-balanced-pads",
        "title": "High-Voltage Speaker Level Interfacing & Balanced Attenuator Pads",
        "tags": ["speaker-level", "attenuator-pads", "h-pad", "bridging", "power-amps"],
        "standards": ["AES-X152 Section 2", "IEC 60268-3"],
        "equation": "\\text{Attenuation}_{\\text{dB}} = 20 * \\log_{10}\\left(\\frac{R_{\\text{shunt}}}{2 * R_{\\text{series}} + R_{\\text{shunt}}}\\right) = -40\\text{ dB}",
        "summary": "Safely tapping high-voltage power amplifier speaker lines (+30 to +50 dBu / 25V to 100V RMS) down to line/mic levels using balanced H-pads.",
        "authors": ["Dennis Bohn", "Anthony Kuzub"],
        "myth": "You can connect a power amplifier speaker output directly to a line input if you turn the mixer gain down.",
        "theory": "A 1,000-watt power amplifier into a 4 Ω load generates 63.2 Volts RMS (179 Volts peak-to-peak / +38 dBu). Connecting this directly into a line input (+24 dBu max) or mic input (-20 dBu max) will instantly vaporize input attenuator resistors, incinerate semiconductor protection diodes, and destroy the receiving equipment. Speaker signals must be attenuated using a symmetrical balanced H-pad (typically -40 dB) rated for high power dissipation.",
        "math": "For a -40 dB balanced H-pad: Attenuation factor = 1/100 (0.01). With R_shunt = 200 Ω, each series arm requires R_series = (200 / 0.01 - 200) / 2 = 9.9 kΩ (use two 10 kΩ 5-watt precision power resistors).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       BALANCED H-PAD ATTENUATOR (SPEAKER TO MIC)              |
|                                                                               |
|   Speaker Hot (+)  ----[ R1 = 10 kΩ (5W) ]----+----[ R2 = 10 kΩ (5W) ]----> Hot Pin 2
|                                               |                               |
|                                           [ R_shunt ] (200 Ω)                 |
|                                               |                               |
|   Speaker Ret (-)  ----[ R3 = 10 kΩ (5W) ]----+----[ R4 = 10 kΩ (5W) ]----> Cold Pin 3
|                                                                               |
|   Attenuates 70V Speaker signal down to 0.7V safe Mic-level! Symmetrical Z!   |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 2 and IEC 60268-3 Section 14 cover high-voltage attenuator networks.",
        "takeaways": "1. Never connect speaker outputs directly to line/mic inputs.\n2. Balanced H-pad maintains equal impedance on both legs.\n3. Resistors must have adequate wattage ratings (5W to 10W wirewound/metal oxide).",
        "quiz": "Q: Why must an attenuator pad for a balanced line be configured as an H-pad rather than a simple unbalanced T-pad?\nA: An H-pad places equal resistance in series with both signal conductors, preserving common-mode impedance balance and CMRR."
    },
    {
        "num": 80, "part_num": 8, "part_title": "Part 8: Interconnection Compatibility, Adapters & Safety",
        "slug": "systematic-hum-and-buzz-troubleshooting",
        "title": "Systematic Audio Hum, Buzz, and Noise Troubleshooting Flowchart",
        "tags": ["troubleshooting", "hum-elimination", "buzz", "flowchart", "diagnostics"],
        "standards": ["AES48", "AES-X152"],
        "equation": "f_{\\text{fundamental}} = 60\\text{ Hz (Clean Hum)} \\quad \\text{vs} \\quad 120\\text{ Hz / Harmonics (Buzzy Rectifier Hash)}",
        "summary": "Algorithmic flowchart for locating, diagnosing, and eradicating hum, buzz, and RF noise in complex pro audio systems.",
        "authors": ["Bill Whitlock", "Jim Brown"],
        "myth": "The best way to fix hum is to randomly lift grounds on power cords with cheater plugs until it gets quiet.",
        "theory": "Cutting safety earth ground on AC power cords is illegal, violates electrical safety codes, and creates a lethal shock hazard! Systematic troubleshooting diagnoses noise by acoustic spectral signature: pure 60 Hz hum indicates magnetic induction from power transformers; raspy 120 Hz buzz indicates power supply rectifier diode switching spikes flowing through ground shields (AES48 Pin 1 problem); and ultrasonic clicking/hash indicates RF ingress or digital clock jitter.",
        "math": "Diagnostic Step 1: Disconnect inputs. If noise persists, it is generated inside the box or power supply. If noise disappears, it is arriving via the interconnect cable. Step 2: Temporarily insert a 1:1 isolation transformer. If noise vanishes, the problem is a ground loop or Pin 1 problem.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       SYSTEMATIC HUM DIAGNOSTIC FLOWCHART                     |
|                                                                               |
|   HEAR NOISE?                                                                 |
|     |                                                                         |
|     +---> 60 Hz Sine Wave? ===> Magnetic pickup (move cable away from power!) |
|     |                                                                         |
|     +---> 120 Hz Raspy Buzz? => Ground loop current / Pin 1 Problem!          |
|     |                             (Insert 1:1 Isolation Transformer)          |
|     |                                                                         |
|     +---> High-Pitch Hash? ===> RF / Switch-mode supply (Install Ferrite Core)|
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES48 Annex B and AES-X152 troubleshooting reference guide.",
        "takeaways": "1. NEVER use 3-to-2 prong AC ground lifters (lethal hazard!).\n2. Differentiate between 60 Hz hum (magnetic) and 120 Hz buzz (rectifier current).\n3. High-quality 1:1 audio isolation transformers permanently cure ground loops.",
        "quiz": "Q: What does a raspy, buzzy noise with strong 120 Hz harmonics typically indicate in an audio system?\nA: Inter-chassis ground current containing power supply rectifier switching spikes flowing through a cable shield (Pin 1 problem)."
    }
]
