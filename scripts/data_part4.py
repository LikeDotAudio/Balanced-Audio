"""
scripts/data_part4.py
Modules 031 - 040: Transmitter (Driver/Output) Topologies
"""

PART4_MODULES = [
    {
        "num": 31, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "thevenin-output-model-transmitters",
        "title": "Thevenin Output Model for Audio Transmitters",
        "tags": ["thevenin", "driver", "source-impedance", "transmitters", "topology"],
        "standards": ["AES-X152 Section 1", "IEC 60268-3"],
        "equation": "V_{\\text{terminal}} = V_{\\text{open}} * \\left[ \\frac{Z_{\\text{load}}}{Z_{\\text{source}} + Z_{\\text{load}}} \\right]",
        "summary": "Thevenin equivalent circuit modeling for audio drivers: open-circuit voltage, source resistance, and load regulation.",
        "authors": ["Jim Meyer", "Bill Whitlock"],
        "myth": "An audio output stage behaves like an ideal infinite-current voltage source.",
        "theory": "All real-world audio transmitters can be represented by a Thevenin equivalent circuit consisting of an ideal audio voltage generator V_th in series with an internal source impedance Z_s. The source impedance consists of output resistors, op-amp open-loop output impedance, and decoupling capacitors. Under load, output voltage drops according to voltage division with the receiver's input impedance.",
        "math": "For a driver with Z_s = 100 Ω and V_open = +4 dBu (1.228 V): Loaded into 10 kΩ, V_term = 1.216 V (-0.08 dB). Loaded into 600 Ω, V_term = 1.053 V (-1.33 dB loss).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       THEVENIN TRANSMITTER EQUIVALENT                         |
|                                                                               |
|   [ Ideal Gen V_th ] ----[ Z_source (e.g. 50 Ω) ]----> Terminal Out (Pin 2)   |
|                                                          |                    |
|                                                       [ Load: 10 kΩ ]         |
|                                                          |                    |
|   Ground 0V -----------------------------------------> Terminal Out (Pin 3)   |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Clause 1 defines the Thevenin transmitter parameters required on standardized datasheets.",
        "takeaways": "1. Source impedance must be declared across 20 Hz - 20 kHz.\n2. Modern drivers maintain Z_s between 40 Ω and 100 Ω.\n3. Excessive source impedance causes high-frequency roll-off with long cables.",
        "quiz": "Q: What is the typical source impedance of a modern professional op-amp line driver?\nA: 40 Ω to 100 Ω (typically 47 Ω or 50 Ω per leg)."
    },
    {
        "num": 32, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "topology-6-1-electronic-push-pull",
        "title": "Topology 6.1: Electronic Push-Pull (Ground-Referenced Dual Active)",
        "tags": ["push-pull", "dual-opamp", "active-balanced", "topology-6.1", "drivers"],
        "standards": ["AES-X152 Section 6.1", "IEC 60268-3"],
        "equation": "V_{\\text{pin2}} = +\\frac{V_{\\text{sig}}}{2}, \\quad V_{\\text{pin3}} = -\\frac{V_{\\text{sig}}}{2} \\quad \\text{(Referenced to 0V)}",
        "summary": "Architecture, voltage swing benefits, and operating principles of ground-referenced push-pull line drivers.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "Push-pull dual-opamp outputs are the only 'true' balanced outputs.",
        "theory": "In Topology 6.1, two separate operational amplifiers drive the line. Op-amp 1 drives Pin 2 with a non-inverted audio signal (+V/2), while Op-amp 2 drives Pin 3 with an inverted signal (-V/2). Both op-amps are referenced to the local power supply 0V. This architecture delivers double the differential voltage swing (+6 dB) and symmetrical cancellation of power supply ripple.",
        "math": "Differential voltage: V_diff = V_pin2 - V_pin3 = (+V/2) - (-V/2) = +V. Maximum peak-to-peak output is doubled compared to single-ended: V_diff_max = 2 * (V_rail - V_sat).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TOPOLOGY 6.1: ELECTRONIC PUSH-PULL                      |
|                                                                               |
|   Audio In ---> [ Non-Inverting Op-Amp ] ----[ 50 Ω ]----> Pin 2 (+ Hot)      |
|         |                                                                     |
|         +-----> [ Inverting Op-Amp ] --------[ 50 Ω ]----> Pin 3 (- Cold)     |
|                                                                               |
|   Both op-amps ground-referenced to internal circuit 0V.                      |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.1 classifies ground-referenced dual-active drivers as Topology 6.1.",
        "takeaways": "1. Delivers +6 dB higher output voltage swing on given power rails.\n2. Rejects common-mode power supply ripple internally.\n3. Vulnerable to severe distortion if Pin 3 is grounded.",
        "quiz": "Q: What is the main voltage advantage of Topology 6.1 push-pull drivers?\nA: Double the differential voltage output (+6 dB extra headroom) on the same DC power rails."
    },
    {
        "num": 33, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "push-pull-hazard-pin-3-grounding",
        "title": "Push-Pull Hazard: Pin 3 Grounding Faults & Thermal Limiting",
        "tags": ["push-pull-hazard", "short-circuit", "thermal-limiting", "distortion"],
        "standards": ["AES-X152 Section 6.1", "AES48"],
        "equation": "I_{\\text{short\\_peak}} = \\frac{V_{\\text{out\\_peak}}}{R_{\\text{protect}}} \\quad \\text{(Op-amp current limits!)}",
        "summary": "What happens when a Topology 6.1 push-pull driver is plugged into an unbalanced input with Pin 3 shorted to ground.",
        "authors": ["Bill Whitlock", "Richard Hess"],
        "myth": "You can connect a balanced push-pull output to an unbalanced TS jack by simply shorting Pin 3 to Pin 1 (ground).",
        "theory": "In Topology 6.1, Op-amp 2 actively drives audio onto Pin 3 referenced to 0V. If Pin 3 is connected to ground (e.g. by plugging a mono 1/4\" TS plug into a TRS output jack, or using an RCA-to-XLR adapter with pins 1 and 3 tied), Op-amp 2 is forced to drive maximum signal voltage directly into a dead short circuit! This forces Op-amp 2 into internal current limiting, causing heavy harmonic distortion, power supply modulation, and thermal overheating.",
        "math": "For a +24 dBu signal (17.4 V peak) and a 47 Ω output resistor, short-circuit current is 17.4 V / 47 Ω = 370 mA peak! Standard op-amps clip internally at 30-50 mA, creating violent clipping harmonics that bleed into Pin 2 via shared power rails.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       THE PUSH-PULL PIN 3 SHORT-CIRCUIT HAZARD               |
|                                                                               |
|   Pin 2 (Hot)  ---------[ 50 Ω ]--------------------> Tip (Unbalanced In)    |
|                                                                               |
|   Pin 3 (Cold) ---------[ 50 Ω ]----+                                         |
|                                     |  <=== DEAD SHORT TO GROUND!             |
|   Pin 1 (Gnd)  ---------------------+---------------> Sleeve (Ground)         |
|                                                                               |
|   Inverted op-amp fights short circuit: Massive distortion & thermal runaway! |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.1 Warning Notice: 'Do NOT ground Pin 3 of Topology 6.1 drivers; float Pin 3 when unbalancing.'",
        "takeaways": "1. NEVER tie Pin 3 to Pin 1 on Topology 6.1 push-pull outputs.\n2. When connecting to unbalanced inputs, leave Pin 3 floating (unconnected).\n3. Signal level drops by 6.0 dB, but op-amp remains clean and undamaged.",
        "quiz": "Q: How should Pin 3 be treated when connecting a Topology 6.1 push-pull output to an unbalanced RCA input?\nA: Leave Pin 3 floating (unconnected)! Never tie it to ground."
    },
    {
        "num": 34, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "topology-6-2-active-impedance-balanced",
        "title": "Topology 6.2: Active Impedance-Balanced Output Architecture",
        "tags": ["impedance-balanced", "single-driven", "topology-6.2", "reliability"],
        "standards": ["AES-X152 Section 6.2", "IEC 60268-3"],
        "equation": "V_{\\text{pin2}} = V_{\\text{sig}}, \\quad V_{\\text{pin3}} = 0.0\\text{ V}; \\quad Z_{\\text{pin2}} = Z_{\\text{pin3}} = R_{\\text{match}}",
        "summary": "Circuit design, economic advantages, and fail-safe robustness of active impedance-balanced line outputs.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "Impedance-balanced outputs are 'cheap pseudo-balanced shortcuts' that do not offer real professional noise rejection.",
        "theory": "Topology 6.2 uses a single operational amplifier to drive Pin 2 through a precision matching resistor R1. Pin 3 carries NO audio signal; it is connected directly to circuit ground through an identical precision matching resistor R2. Because Z_pin2 = Z_pin3 to ground, noise couples equally to both conductors and is 100% rejected by the differential receiver!",
        "math": "When connected to an unbalanced input, Pin 3 can be grounded with ZERO consequence because it carries 0 V audio. Signal level on Pin 2 is completely unchanged (0.0 dB loss).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TOPOLOGY 6.2: IMPEDANCE-BALANCED DRIVER                 |
|                                                                               |
|   Audio In ---> [ Active Op-Amp ] -----[ R1 = 50 Ω ]----> Pin 2 (Hot Audio)   |
|                                                                               |
|   Circuit 0V --------------------------[ R2 = 50 Ω ]----> Pin 3 (Cold Ground) |
|                                                                               |
|   Pin 3 carries 0V audio, but matches Pin 2 impedance exactly!                |
|   100% immune to Pin 3 short-to-ground faults!                                |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.2 classifies single-driven impedance-matched outputs as Topology 6.2.",
        "takeaways": "1. 100% of the CMRR of push-pull systems.\n2. Half the parts, half the power, half the noise of dual-op-amp designs.\n3. Immune to destruction or distortion when plugged into mono 1/4\" TS jacks.",
        "quiz": "Q: What happens to the audio signal level when a Topology 6.2 impedance-balanced output is plugged into an unbalanced TS jack?\nA: Zero level loss (0.0 dB change); the signal on Pin 2 remains at full level."
    },
    {
        "num": 35, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "why-impedance-balanced-matches-push-pull",
        "title": "Why Impedance-Balanced Drivers Match Push-Pull CMRR 100%",
        "tags": ["impedance-balanced", "cmrr-parity", "noise-cancellation", "efficiency"],
        "standards": ["AES-X152 Section 6.2"],
        "equation": "\\text{CMRR}_{6.2} = \\text{CMRR}_{6.1} \\quad \\text{(for identical } \\Delta Z\\text{)}",
        "summary": "Mathematical and physical proof demonstrating that impedance-balanced drivers achieve identical CMRR to push-pull drivers.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "A differential receiver requires an inverted audio signal on Pin 3 to perform common-mode noise cancellation.",
        "theory": "A differential receiver subtracts Conductor 2 from Conductor 1: V_out = V_1 - V_2. For an impedance-balanced driver: V_1 = V_audio + V_noise; V_2 = 0 + V_noise. V_out = (V_audio + V_noise) - (V_noise) = V_audio + 0. The cancellation of V_noise is mathematically exact and independent of audio signal voltage on Pin 3.",
        "math": "Noise residual in both 6.1 and 6.2: V_residual = V_cm * [ (Z1 - Z2) / Z_load ]. If R1 and R2 are 0.1% matched in both circuits, the noise rejection is mathematically identical.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CMRR PARITY PROOF                                       |
|                                                                               |
|   PUSH-PULL (6.1):        (+1.0 V Audio + Noise) - (-1.0 V Audio + Noise)    |
|                           = +2.0 V Audio + (Noise - Noise) = +2.0 V Audio     |
|                                                                               |
|   IMPEDANCE-BALANCED (6.2): (+1.0 V Audio + Noise) - (0.0 V Audio + Noise)    |
|                           = +1.0 V Audio + (Noise - Noise) = +1.0 V Audio     |
|                                                                               |
|   In both cases: NOISE CANCELLATION IS 100%!                                  |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.2 documentation on common-mode noise rejection parity.",
        "takeaways": "1. Noise cancellation occurs at the receiver, not in the cable.\n2. Audio voltage on Pin 3 contributes only gain, not noise rejection.\n3. Impedance-balanced is an elegant, robust engineering solution.",
        "quiz": "Q: Does common-mode noise cancellation require an inverted audio signal on Pin 3?\nA: No! It requires equal impedance to ground on both pins."
    },
    {
        "num": 36, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "topology-6-3-transformer-floating-output",
        "title": "Topology 6.3: Transformer-Coupled Floating Output",
        "tags": ["transformer-output", "floating", "galvanic-isolation", "topology-6.3"],
        "standards": ["AES-X152 Section 6.3"],
        "equation": "Z_{\\text{isolation\\_DC}} = \\infty; \\quad V_{\\text{breakdown}} > 1500\\text{ V RMS}",
        "summary": "Galvanic isolation, magnetic flux coupling, common-mode rejection, and behavior of floating transformer line outputs.",
        "authors": ["Bill Whitlock", "John Woodgate"],
        "myth": "Audio transformers are outdated components replaced completely by modern silicon op-amps.",
        "theory": "A transformer-coupled floating output (Topology 6.3) transmits audio exclusively via magnetic induction across an insulated dielectric barrier. The secondary winding has NO electrical or galvanic connection to chassis or circuit ground. Ground potential differences (Vgvd) of hundreds of volts have zero effect because there is no conductive return loop.",
        "math": "When unbalancing a floating transformer output, Pin 3 MUST be connected to ground. Grounding Pin 3 simply references the isolated winding to the destination's ground potential without signal loss or op-amp stress.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TOPOLOGY 6.3: TRANSFORMER FLOATING OUTPUT               |
|                                                                               |
|   Audio Drive ---> [ Primary Winding ] (((( Magnetic )))) [ Secondary Winding ] -> Pin 2
|                            |                 Flux                 |            
|   Circuit 0V ----> [ Primary Ground  ]                    [ Secondary Winding ] -> Pin 3
|                                                                               |
|   Secondary is 100% galvanically isolated from equipment ground!             |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.3 defines transformer-coupled floating outputs.",
        "takeaways": "1. Infinite DC isolation prevents ground loops completely.\n2. When unbalancing, you MUST ground Pin 3 (floating produces no circuit).\n3. Eliminates RF common-mode currents at low frequencies.",
        "quiz": "Q: What happens if you connect a floating transformer output to an unbalanced input but leave Pin 3 disconnected (floating)?\nA: No audio will pass (or only very faint distorted treble) because there is no closed electrical current circuit."
    },
    {
        "num": 37, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "topology-6-4-transformer-grounded-center-tap",
        "title": "Topology 6.4: Transformer Output with Grounded Center-Tap",
        "tags": ["transformer-center-tap", "phantom-return", "topology-6.4"],
        "standards": ["AES-X152 Section 6.4", "IEC 61938"],
        "equation": "V_{\\text{pin2}} = +\\frac{V_{\\text{sig}}}{2}, \\quad V_{\\text{pin3}} = -\\frac{V_{\\text{sig}}}{2} \\quad \\text{(DC referenced via Center Tap)}",
        "summary": "Circuit analysis of center-tapped transformer outputs: symmetrical DC phantom return paths versus loss of floating isolation.",
        "authors": ["John Woodgate", "Anthony Kuzub"],
        "myth": "A transformer output with a center tap tied to ground has the same isolation as a floating transformer.",
        "theory": "In Topology 6.4, the secondary winding has a center tap tied to equipment chassis or circuit ground. This provides symmetrical signal voltages referenced to ground and a low-resistance path for DC phantom power or bias currents. However, it completely eliminates floating isolation! Grounding Pin 3 shorts half the transformer winding directly to ground, causing severe distortion and signal drop.",
        "math": "If Pin 3 is grounded, winding inductance and impedance of the lower half are shorted, cutting output voltage by 6.0 dB and driving the primary driver into heavy inductive loading.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TOPOLOGY 6.4: TRANSFORMER WITH CENTER TAP               |
|                                                                               |
|   Audio In ---> [ Primary ] (((( )))) [ Upper Secondary ] --------> Pin 2     |
|                                               |                               |
|                                         [ CENTER TAP ] -----------> Ground 0V |
|                                               |                               |
|   Audio In ---> [ Primary ] (((( )))) [ Lower Secondary ] --------> Pin 3     |
|                                                                               |
|   Grounding Pin 3 shorts lower half of winding! DO NOT GROUND PIN 3!          |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.4 defines center-tapped transformer outputs.",
        "takeaways": "1. Do NOT ground Pin 3 of a center-tapped transformer output.\n2. Provides balanced DC current return paths for phantom power.\n3. Lacks the floating ground-isolation benefits of Topology 6.3.",
        "quiz": "Q: Can you safely short Pin 3 to ground on a Topology 6.4 center-tapped transformer output?\nA: No! Shorting Pin 3 shorts half the transformer secondary winding to ground."
    },
    {
        "num": 38, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "topology-6-5-cross-coupled-active-floating",
        "title": "Topology 6.5: Cross-Coupled Active Floating (Servo-Balanced) Output",
        "tags": ["cross-coupled", "servo-balanced", "outsmarts", "topology-6.5"],
        "standards": ["AES-X152 Section 6.5"],
        "equation": "A_{\\text{unbalanced}} = A_{\\text{balanced}} \\quad \\text{(Automatic +6 dB transfer to active leg)}",
        "summary": "Cross-coupled active line driver topology: electronic emulation of floating transformer windings.",
        "authors": ["Monty Hebert", "Bill Whitlock"],
        "myth": "Cross-coupled servo-balanced outputs are identical to simple push-pull outputs.",
        "theory": "Topology 6.5 uses cross-coupled feedback loops between the two output op-amps. It mimics the behavior of a floating transformer secondary: when Pin 3 is connected to ground (unbalanced load), the feedback network senses the zero-voltage condition on Pin 3 and automatically doubles the drive voltage (+6 dB) on Pin 2, maintaining exact nominal output level with zero clipping or op-amp stress.",
        "math": "Balanced load: V_pin2 = +V/2, V_pin3 = -V/2 (V_diff = V). Unbalanced load with Pin 3 grounded: V_pin3 = 0.0 V, V_pin2 increases automatically to +V. Net output level is identical (0 dB change).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       TOPOLOGY 6.5: CROSS-COUPLED ACTIVE FLOATING             |
|                                                                               |
|   Audio In ---+---> [ Op-Amp 1 (+) ] ---[ 50 Ω ]---> Pin 2 (Hot)              |
|               |            ^                                                  |
|               |            | Cross-Feedback Loop                              |
|               |            v                                                  |
|               +---> [ Op-Amp 2 (-) ] ---[ 50 Ω ]---> Pin 3 (Cold)             |
|                                                                               |
|   Grounding Pin 3 causes Op-Amp 1 to double its gain (+6 dB)!                 |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.5 defines cross-coupled active floating line drivers.",
        "takeaways": "1. Delivers identical level into balanced or unbalanced loads.\n2. Must tie Pin 3 to ground when unbalancing to close the feedback loop.\n3. Older discrete implementations were prone to high-frequency instability.",
        "quiz": "Q: What happens when Pin 3 of a cross-coupled servo-balanced output is tied to ground?\nA: The circuit senses the grounded cold leg and automatically boosts the hot leg by +6 dB to maintain full output level."
    },
    {
        "num": 39, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "integrated-silicon-line-drivers-that-1646",
        "title": "Integrated Silicon Line Drivers: THAT 1646 / 1606 OutSmarts Architecture",
        "tags": ["that1646", "outsmarts", "line-driver", "integrated-circuits"],
        "standards": ["AES-X152 Section 6.5"],
        "equation": "\\text{THD+N} < 0.0007\\% \\quad \\text{@ 1 kHz into } 600\\ \\Omega",
        "summary": "Modern silicon line drivers: THAT 1646 OutSmarts technology, patented dual feedback loops, and short-circuit protection.",
        "authors": ["Gary Hebert", "Dennis Bohn"],
        "myth": "Modern IC line drivers are fragile and blow up easily when plugged into phantom power.",
        "theory": "The THAT 1646 / THAT 1606 family uses patented OutSmarts cross-coupled feedback architecture with laser-trimmed thin-film resistors. Unlike older cross-coupled designs (e.g. SSM2142), OutSmarts uses two independent negative feedback loops (one differential, one common-mode), ensuring unconditional stability into high-capacitance cables and preventing high DC offset when unbalancing.",
        "math": "Drives +27.5 dBu into 600 Ω loads on +/-18 V rails. Common-mode output offset is held below 5 mV even under heavy output clipping.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       THAT 1646 OUTSMARTS BLOCK DIAGRAM                       |
|                                                                               |
|   Audio In ---> [ Differential Amplifier ] ----> [ + Output Stage ] -> Pin 2  |
|                        ^           ^                     |                    |
|                        |           +---[ CM Loop ]<------+                    |
|                        |                                 |                    |
|                        +---------------[ DM Loop ]<------+------> Pin 3       |
|                                                                               |
|   Built-in internal diodes clamp phantom transients directly to power rails!   |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.5 cites THAT OutSmarts architecture as standard reference for modern IC drivers.",
        "takeaways": "1. Exceptional distortion (<0.0007%) and high drive current (>100 mA).\n2. Built-in protection against phantom power turn-on spikes.\n3. Transparent drop-in replacement for older discrete line driver stages.",
        "quiz": "Q: What stability improvement did the THAT 1646 OutSmarts topology introduce over earlier cross-coupled drivers?\nA: Dual independent feedback loops that eliminate common-mode latch-up and instability into capacitive loads."
    },
    {
        "num": 40, "part_num": 4, "part_title": "Part 4: Transmitter (Driver/Output) Topologies",
        "slug": "unbalanced-single-ended-outputs",
        "title": "Unbalanced Single-Ended Outputs (RCA & TS 1/4\") & Driver Load Driving",
        "tags": ["unbalanced-driver", "single-ended", "rca", "ts", "drive-limits"],
        "standards": ["AES-X152 Section 6.8"],
        "equation": "V_{\\text{out}} = V_{\\text{sig}} \\quad \\text{(Referenced strictly to local circuit 0V)}",
        "summary": "Single-ended output driver architecture, output current limits, and drive considerations into unbalanced destinations.",
        "authors": ["Anthony Kuzub", "John Woodgate"],
        "myth": "An unbalanced output can be converted to balanced by simply connecting it with a 3-conductor XLR cable.",
        "theory": "A single-ended unbalanced driver (Topology 6.8) outputs audio signal on a single conductor referenced directly to internal circuit 0V. Connecting an unbalanced output to a 3-pin XLR without impedance-balancing resistors leaves Pin 3 tied to ground at 0 Ω while Pin 2 has 50 Ω - 100 Ω, creating a massive impedance mismatch that destroys balanced common-mode rejection.",
        "math": "Source impedance mismatch: ΔZs = |Z_pin2 - Z_pin3| = |50 Ω - 0 Ω| = 50 Ω. At the receiving differential input, CMRR degrades from 80 dB down to <40 dB.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       UNBALANCED SINGLE-ENDED OUTPUT (6.8)                    |
|                                                                               |
|   Audio In ---> [ Op-Amp Buffer ] ----[ 47 Ω ]----> Center Pin / Tip (Audio)  |
|                                                                               |
|   Circuit 0V -------------------------------------> Outer Shell / Sleeve (0V) |
|                                                                               |
|   Signal is single-ended; zero common-mode noise cancellation possible!       |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.8 defines single-ended ground-referenced ports.",
        "takeaways": "1. Unbalanced drivers require passive DI boxes or impedance balancing to interface to snakes.\n2. Keep cable lengths under 3 meters (10 feet).\n3. Protect against output shorts with a series resistor (47 Ω to 100 Ω).",
        "quiz": "Q: What happens if an unbalanced output is connected to a balanced XLR snake without an impedance-matching network?\nA: The impedance imbalance destroys common-mode rejection at the destination mixer, causing severe hum and noise."
    }
]
