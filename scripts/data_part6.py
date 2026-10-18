"""
scripts/data_part6.py
Modules 051 - 060: Receiver (Input Stage) Topologies
"""

PART6_MODULES = [
    {
        "num": 51, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "receiver-input-stage-bridging-philosophy",
        "title": "Receiver Input Stage Overview & Bridging Load Impedance Philosophy",
        "tags": ["receiver", "bridging", "input-impedance", "load", "differentials"],
        "standards": ["AES-X152 Section 3", "IEC 60268-3"],
        "equation": "Z_{\\text{in\\_diff}} \\ge 10\\text{ k}\\Omega, \\quad Z_{\\text{in\\_cm}} \\ge 20\\text{ k}\\Omega",
        "summary": "Bridging input philosophy for balanced receivers: Differential Mode Impedance (DMZ) vs Common Mode Impedance (CMZ).",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "A balanced input stage only needs to have high impedance between Pin 2 and Pin 3.",
        "theory": "Balanced receiver inputs present two distinct impedance characteristics: Differential-Mode Input Impedance (Z_dm), measured directly across Pin 2 and Pin 3 (typically 10 kΩ to 40 kΩ); and Common-Mode Input Impedance (Z_cm), measured from each conductor to ground (Pin 1/chassis). To maintain high CMRR in the presence of source impedance imbalances, Z_cm must be as high as physically possible across the entire audio frequency band.",
        "math": "Effect of source imbalance: CMRR_effective ≈ 20 * log10(Z_cm / ΔZs). If Z_cm is only 10 kΩ and ΔZs is 10 Ω, CMRR cannot exceed 60 dB, regardless of how well internal op-amp resistors are matched!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       DIFFERENTIAL VS COMMON-MODE IMPEDANCE                   |
|                                                                               |
|   Pin 2 (Hot)  --------+------------------------------------+                 |
|                        |                                    |                 |
|                     [ Z_cm1 ]                            [ Z_dm ] (Bridging)  |
|                        |                                    |                 |
|   Chassis Ground ======+                                    |                 |
|                        |                                    |                 |
|                     [ Z_cm2 ]                            [ Z_dm ]             |
|                        |                                    |                 |
|   Pin 3 (Cold) --------+------------------------------------+                 |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 3 requires separate specification of Z_dm and Z_cm at 100 Hz, 1 kHz, and 10 kHz.",
        "takeaways": "1. Z_dm determines audio loading on the driver.\n2. Z_cm determines real-world immunity to source impedance mismatches.\n3. High Z_cm is the hallmark of professional-grade input stages.",
        "quiz": "Q: Which receiver impedance parameter primarily determines its ability to reject hum when connected to a source with an impedance mismatch?\nA: Common-Mode Input Impedance (Z_cm)."
    },
    {
        "num": 52, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "passive-transformer-coupled-balanced-receiver",
        "title": "Passive Transformer-Coupled Balanced Receiver",
        "tags": ["transformer-receiver", "galvanic-isolation", "jensen", "cmrr"],
        "standards": ["AES-X152 Section 6.3", "IEC 60268-3"],
        "equation": "\\text{CMRR}_{\\text{transformer}} > 100\\text{ dB @ 60 Hz with } 10\\ \\Omega \\text{ source imbalance}",
        "summary": "Passive input transformers: Faraday shielding, galvanic isolation, ultra-high common-mode impedance, and benchmark CMRR.",
        "authors": ["Bill Whitlock", "Deane Jensen"],
        "myth": "Input transformers are obsolete because integrated circuits have higher open-loop gain.",
        "theory": "An input transformer (e.g. Jensen JT-11P-1) uses a primary winding completely floating from ground. Because there is no galvanic path between the primary winding and chassis ground, its common-mode input impedance at 60 Hz is virtually infinite (>100 MΩ). An internal copper Faraday shield between windings shunts common-mode capacitive currents harmlessly to chassis.",
        "math": "Under the IEC 60268-3 10 Ω source imbalance test, a precision input transformer maintains >100 dB CMRR at 60 Hz and >85 dB at 20 kHz, outperforming standard op-amp difference amplifiers by over 50 dB!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PASSIVE INPUT TRANSFORMER TOPOLOGY                      |
|                                                                               |
|   Pin 2 (Hot)  ---> [ Primary Winding ] (((( Magnetic )))) [ Secondary ] ---> Op-Amp +
|                            |                 Flux                 |           
|   Chassis Gnd ====> [ Faraday Shield ]                            |           
|                            |                                      |           
|   Pin 3 (Cold) ---> [ Primary Winding ]                    [ Secondary ] ---> 0V Ref
|                                                                               |
|   Infinite DC galvanic isolation + 100 dB real-world hum rejection!          |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.3 and IEC 60268-3 benchmark input transformer performance.",
        "takeaways": "1. Input transformers provide unmatched real-world CMRR under severe source imbalances.\n2. Internal Faraday shield is mandatory to preserve high-frequency CMRR.\n3. Eliminates DC ground loop voltage differentials completely.",
        "quiz": "Q: What feature inside a high-quality audio input transformer prevents capacitive high-frequency common-mode noise transfer?\nA: An internal electrostatic Faraday shield between the primary and secondary windings."
    },
    {
        "num": 53, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "basic-single-op-amp-difference-amplifier",
        "title": "Basic Single Op-Amp Differential Receiver (Difference Amplifier)",
        "tags": ["difference-amp", "single-opamp", "input-stage", "receiver"],
        "standards": ["AES-X152 Section 6.7"],
        "equation": "V_{\\text{out}} = \\frac{R_2}{R_1} * (V_{\\text{pin2}} - V_{\\text{pin3}}) \\quad \\text{(assuming } R_1=R_3, R_2=R_4\\text{)}",
        "summary": "Circuit analysis of the ubiquitous 4-resistor single operational amplifier difference receiver stage.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "The classic 4-resistor difference amplifier is an ideal balanced receiver for all pro audio applications.",
        "theory": "The single op-amp difference amplifier uses an operational amplifier with negative feedback. Resistors R1 and R2 set gain on the inverting leg; R3 and R4 form a voltage divider on the non-inverting leg. When R1 = R3 and R2 = R4, common-mode signals produce identical voltages at both op-amp inputs and cancel. However, it suffers from two major engineering flaws: low input impedance and severe impedance asymmetry between inputs.",
        "math": "Gain: A_d = R2 / R1. For unity gain with 10 kΩ resistors: R1 = R2 = R3 = R4 = 10 kΩ. Common-mode input impedance is approximately 10 kΩ to 20 kΩ.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       BASIC SINGLE OP-AMP DIFFERENCE AMPLIFIER                |
|                                                                               |
|   Pin 2 (Hot)  ----[ R1 = 10k ]----+------------- - \\                         |
|                                    |    R2           \\                        |
|                                    +--[ 10k ]--+      \\                       |
|                                                |       |---> Audio Out        |
|   Pin 3 (Cold) ----[ R3 = 10k ]----+           |      /                       |
|                                    |    R4     |     /                        |
|                                    +--[ 10k ]--+    +                         |
|                                         |                                     |
|                                        0V                                     |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.7 classifies the 4-resistor difference amplifier.",
        "takeaways": "1. Inexpensive and compact; standard in budget audio interfaces.\n2. Highly sensitive to resistor tolerance mismatches.\n3. Degrades severely when driven by unequal source impedances.",
        "quiz": "Q: What is the primary limitation of a single op-amp difference amplifier regarding common-mode rejection?\nA: Its common-mode input impedance is relatively low, making CMRR highly vulnerable to source impedance imbalances."
    },
    {
        "num": 54, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "impedance-asymmetry-in-single-opamp-receivers",
        "title": "The Impedance Asymmetry Flaw in Simple Single Op-Amp Receivers",
        "tags": ["impedance-asymmetry", "single-opamp", "input-impedance-mismatch"],
        "standards": ["AES-X152 Section 6.7"],
        "equation": "Z_{\\text{in(non-inv)}} = R_3 + R_4; \\quad Z_{\\text{in(inv)}} = \\frac{R_1}{1 - \\frac{V_{\\text{out}}}{V_{\\text{in-}}}} \\approx \\frac{R_1}{1 - (-1)} = \\frac{R_1}{2} \\text{ to } R_1",
        "summary": "Exposing the inherent impedance asymmetry between inverting and non-inverting inputs in the 4-resistor difference stage.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "A balanced difference amplifier presents equal load impedances to Conductor 1 and Conductor 2.",
        "theory": "In a 4-resistor difference amplifier (10 kΩ resistors, unity gain), the non-inverting input (Pin 3) connects through R3 and R4 to ground, presenting an input impedance of R3 + R4 = 20 kΩ. However, the inverting input (Pin 2) connects to the op-amp's virtual ground summing junction. Because the op-amp output swings in opposite polarity, negative feedback actively pulls current through R1! When driven with differential signals, Pin 2 sees an input impedance of only ~6.7 kΩ to 10 kΩ!",
        "math": "Impedance ratio between legs: Z_in(+) / Z_in(-) ≈ 20 kΩ / 10 kΩ = 2:1! The receiver itself introduces an impedance imbalance to the driving line, degrading line balance and increasing common-mode noise conversion.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       INPUT IMPEDANCE ASYMMETRY FLAW                          |
|                                                                               |
|   Pin 2 (Inverting Input): Sees Virtual Ground Summing Junction!              |
|   Z_in(-) ≈ 6.7 kΩ to 10 kΩ (Varies dynamically with differential drive!)     |
|                                                                               |
|   Pin 3 (Non-Inverting): Sees Passive Resistor Divider to 0V                  |
|   Z_in(+) = R3 + R4 = 20 kΩ (Fixed passive load)                              |
|                                                                               |
|   RESULT: The receiver itself unbalances the transmission line!               |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.7 highlights input impedance asymmetry in standard difference amps.",
        "takeaways": "1. Standard 4-resistor difference amps have radically unequal input impedances.\n2. Inverting leg loads the driver 2x heavier than non-inverting leg.\n3. Solved by buffered inputs (Instrumentation Amps) or InGenius architecture.",
        "quiz": "Q: In a standard 4-resistor difference amp using four 10 kΩ resistors, what is the input impedance seen by the non-inverting input versus the inverting input?\nA: Non-inverting input sees 20 kΩ (R3 + R4); inverting input sees ~10 kΩ (due to virtual ground summing junction)."
    },
    {
        "num": 55, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "three-op-amp-instrumentation-amplifier-in-amp",
        "title": "Three Op-Amp Differential Instrumentation Amplifier (In-Amp)",
        "tags": ["instrumentation-amp", "in-amp", "3-opamp", "high-z-inputs"],
        "standards": ["AES-X152 Section 6.7"],
        "equation": "Z_{\\text{in+}} = Z_{\\text{in-}} > 10^9\\ \\Omega \\quad \\text{(Op-amp non-inverting FET/BJT inputs)}",
        "summary": "Classic 3-op-amp instrumentation amplifier: high-impedance buffered inputs, differential gain control, and common-mode rejection.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "A 3-op-amp instrumentation amplifier completely solves all real-world audio CMRR problems.",
        "theory": "The classic 3-op-amp instrumentation amplifier (In-Amp) places two high-input-impedance non-inverting buffer amplifiers ahead of a 4-resistor difference stage. Both Pin 2 and Pin 3 connect directly to non-inverting op-amp gate/base inputs, presenting gigohm input impedances and zero load asymmetry. A single gain-setting resistor Rg sets differential gain while passing common-mode voltage at unity gain.",
        "math": "Differential gain: A_d = [ 1 + (2*R / Rg) ] * (R2 / R1). High input impedance prevents loading the driver, but the secondary difference stage remains vulnerable to common-mode voltage swing limits and resistor bridge tolerance errors.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       3-OP-AMP INSTRUMENTATION AMPLIFIER                      |
|                                                                               |
|   Pin 2 ---> [ Buffer Op-Amp 1 ]----+---------[ R1 ]----+---- - \\             |
|                    ^                |                   |       \\            |
|                    |             [ Rg ]                 |        |--> Vout   |
|                    v                |                   |       /            |
|   Pin 3 ---> [ Buffer Op-Amp 2 ]----+---------[ R3 ]----+---- + /             |
|                                                                               |
|   Inputs present >1000 Megohms impedance, eliminating loading asymmetry!      |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.7 describes 3-op-amp instrumentation topology.",
        "takeaways": "1. Buffers isolate signal lines from resistor loading asymmetry.\n2. Single resistor Rg controls differential gain cleanly.\n3. Common-mode voltage is limited by op-amp power supply rails.",
        "quiz": "Q: How does a 3-op-amp instrumentation amplifier eliminate the input impedance asymmetry of a single op-amp difference stage?\nA: By placing non-inverting op-amp buffers with gigohm input impedances in front of both signal legs."
    },
    {
        "num": 56, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "high-cm-impedance-receivers-ingenius-that1200",
        "title": "High Common-Mode Impedance Receivers: InGenius & THAT 1200 Architecture",
        "tags": ["ingenius", "that1200", "bootstrapping", "cmrr", "whitlock-patent"],
        "standards": ["US Patent 5,568,561", "AES-X152"],
        "equation": "Z_{\\text{cm\\_bootstrapped}} > 10\\text{ M}\\Omega \\quad \\text{across the full audio band}",
        "summary": "Bill Whitlock's patented InGenius input architecture (THAT 1200 series): active common-mode bootstrapping achieving transformer-grade CMRR.",
        "authors": ["Bill Whitlock", "Dennis Bohn"],
        "myth": "No solid-state active input circuit can match the real-world CMRR of a high-end audio transformer under source imbalance.",
        "theory": "Bill Whitlock invented the InGenius topology (US Patent 5,568,561, commercialized as THAT 1200/1240). It uses active bootstrapping to sense incoming common-mode voltage and drive internal nodes with an exact replica. This dynamic feedback cancels common-mode current flow, raising common-mode input impedance from 10 kΩ to over 10 Megohms across the audio band! As a result, source impedance imbalances of 10 Ω or even 100 Ω cause virtually zero degradation of CMRR.",
        "math": "Under the IEC 10 Ω imbalance test: Standard difference amp CMRR = 34 dB; THAT 1200 InGenius CMRR = >90 dB @ 60 Hz and >85 dB @ 20 kHz!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       THAT 1200 INGENIUS BOOTSTRAPPED RECEIVER                |
|                                                                               |
|   Pin 2 (Hot)  ---[ R1 = 10k ]---+---------[ Difference Stage ]---> Output    |
|                                  |                     ^                      |
|                               [ Bootstrap Sense ]      |                      |
|                                  |                     |                      |
|   Pin 3 (Cold) ---[ R2 = 10k ]---+---[ Common-Mode Driver ]                   |
|                                                                               |
|   Common-mode bootstrap boosts effective input impedance to >10 Megohms!     |
|   Achieves transformer-grade 90 dB CMRR with 10 Ω source imbalance!           |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.7 and AES Convention Paper 4372 cite Whitlock InGenius architecture.",
        "takeaways": "1. Solves the source impedance imbalance flaw in solid-state receivers.\n2. Achieves >90 dB CMRR even with severe cable/driver mismatches.\n3. Standard modern benchmark IC for pro line inputs.",
        "quiz": "Q: How does the THAT 1200 InGenius receiver maintain >90 dB CMRR in the presence of source impedance imbalances?\nA: By actively bootstrapping common-mode input impedance to >10 Megohms, preventing imbalance from converting to differential voltage."
    },
    {
        "num": 57, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "ground-cancelling-and-ground-sensing-receivers",
        "title": "Ground-Cancelling and Ground-Sensing Differential Receiver Circuits",
        "tags": ["ground-cancelling", "ground-sensing", "unbalanced-interface", "pseudos"],
        "standards": ["AES-X152 Section 6.6"],
        "equation": "V_{\\text{out}} = V_{\\text{sig}} + (V_{\\text{gnd\\_source}} - V_{\\text{gnd\\_source}}) = V_{\\text{sig}}",
        "summary": "Ground-cancelling and ground-sensing receiver circuits for eliminating hum when accepting unbalanced sources without ground loops.",
        "authors": ["Dennis Bohn", "Bill Whitlock"],
        "myth": "Connecting an unbalanced device to a balanced mixing console always creates an inescapable ground loop.",
        "theory": "Ground-sensing receivers use a differential amplifier where the inverting input connects directly to the chassis ground or jack sleeve of the driving unbalanced source via a dedicated wire. The receiver senses the ground voltage differential Vgvd between the two chassis and subtracts it directly from the hot audio line, eliminating 60 Hz hum without transformer isolation.",
        "math": "Hot carries V_sig + V_gnd. Ground sense wire carries V_gnd. Subtractor output: (V_sig + V_gnd) - (V_gnd) = V_sig.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       GROUND-SENSING RECEIVER TOPOLOGY                        |
|                                                                               |
|   [Unbalanced Source]                                [Balanced Receiver]      |
|   Center Pin (Audio) ------------------------------> Non-Inverting (+) Input   |
|                                                             -                 |
|   Chassis/Sleeve (Gnd) ----------------------------> Inverting (-) Input      |
|                                                             v                 |
|   Chassis ground hum is sensed and subtracted to zero! Clean audio out!       |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6.6 defines ground-sensing / ground-cancelling topology.",
        "takeaways": "1. Connects unbalanced gear to balanced systems hum-free.\n2. Dedicated ground-sensing conductor carries zero audio current.\n3. Widely used in professional automotive audio and broadcast routing.",
        "quiz": "Q: In a ground-sensing receiver, what signal is fed into the inverting input?\nA: The remote ground reference potential of the transmitting source equipment chassis."
    },
    {
        "num": 58, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "common-mode-voltage-window-and-rail-headroom",
        "title": "Common-Mode Voltage Window, Rail Headroom, and Clamping Protection",
        "tags": ["cm-voltage-range", "clamping", "headroom", "input-protection"],
        "standards": ["AES-X152 Section 3", "IEC 60268-3"],
        "equation": "V_{\\text{cm\\_max}} = \\pm (V_{\\text{rail}} - 2.0\\text{ V}) \\quad \\text{(Active Op-Amps)}",
        "summary": "The common-mode voltage operating window of active operational amplifiers, rail headroom limits, and input diode protection.",
        "authors": ["Richard Cabot", "Bill Whitlock"],
        "myth": "A balanced differential input can handle an infinite common-mode hum voltage as long as CMRR is high.",
        "theory": "Active op-amp input stages can only reject common-mode voltages that remain within their internal DC power supply rails (typically +/-15 V or +/-18 V). If common-mode ground noise exceeds the common-mode voltage range (typically +/-13 V), the input transistors enter saturation or cutoff. Once saturated, CMRR drops to zero, and catastrophic clipping or device destruction occurs. Transformers, by contrast, have common-mode breakdown ratings exceeding 1,000 V RMS.",
        "math": "Maximum allowable common-mode voltage before clipping: V_cm_peak < V_rail - 1.5 V. For +/-15 V rails, peak common-mode hum must not exceed 13.5 V (9.5 V RMS).",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       COMMON-MODE VOLTAGE CLIP WINDOW                         |
|                                                                               |
|   +15V Rail -------------------------------------------------------------     |
|              [ MAXIMUM COMMON-MODE OPERATING WINDOW: +/- 13.5 V Peak ]        |
|   -15V Rail -------------------------------------------------------------     |
|                                                                               |
|   CAUTION: If ground hum exceeds 13.5V, op-amp clips and CMRR collapses to 0! |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 3 mandates explicit disclosure of Maximum Common-Mode Voltage Range.",
        "takeaways": "1. Op-amp balanced inputs clip if common-mode hum exceeds power rails.\n2. Use input isolation transformers if inter-chassis ground voltages exceed 10 V RMS.\n3. Input Schottky clamping diodes protect semiconductors from overvoltage transients.",
        "quiz": "Q: What happens to the CMRR of an active op-amp input stage if common-mode hum exceeds its DC power supply rail voltage?\nA: CMRR collapses to 0 dB and the output violently clips."
    },
    {
        "num": 59, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "rfi-filtering-in-balanced-receiver-front-ends",
        "title": "Radio-Frequency Interference (RFI) Filtering in Balanced Receiver Front-Ends",
        "tags": ["rfi-filter", "emc", "capacitors", "common-mode-choke"],
        "standards": ["AES-X152 Section 2", "AES48"],
        "equation": "f_{\\text{corner\\_diff}} = \\frac{1}{2\\pi * (2R) * C_{\\text{diff}}} \\approx 120\\text{ kHz}; \\quad f_{\\text{corner\\_cm}} \\approx 800\\text{ kHz}",
        "summary": "Design and component selection for passive differential and common-mode low-pass RFI filters at receiver input connectors.",
        "authors": ["Jim Brown", "Dennis Bohn"],
        "myth": "Adding capacitors to balanced input pins ruins audio transient response and high-frequency phase.",
        "theory": "All professional balanced audio inputs require passive low-pass RC filtering at the connector entrance to prevent Radio Frequency Interference (RFI) from cell phones, Wi-Fi, and switch-mode supplies from reaching semiconductor inputs. A properly engineered filter uses high-grade C0G/NP0 ceramic capacitors and low-value series resistors to establish a cutoff above 100 kHz, creating zero phase or amplitude effect within the 20 Hz - 20 kHz audio band.",
        "math": "With R = 47 Ω and C_diff = 100 pF: f_diff = 1 / (2 * π * 94 * 100e-12) = 1.69 MHz. Attenuation at 20 kHz is <0.001 dB; attenuation at 900 MHz cell phone band is >45 dB.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       PRECISION RFI INPUT FILTER NETWORK                      |
|                                                                               |
|   Pin 2 (Hot)  ---[ 47 Ω ]---+---[ C_diff = 100 pF ]---+---> To Op-Amp +      |
|                              |                         |                      |
|                           [ C1 ]                    [ C2 ]                    |
|                              |                         |                      |
|   Pin 3 (Cold) ---[ 47 Ω ]---+-------------------------+---> To Op-Amp -      |
|                              |                                                |
|   Chassis Ground Shell ======+ (Direct Enclosure Bond)                        |
|   C1 = C2 = 470 pF C0G/NP0 (Matched to 1% to preserve HF CMRR!)               |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 2 specifies mandatory high-frequency RF suppression requirements.",
        "takeaways": "1. Filter components must be placed directly at connector pins.\n2. Shunt common-mode capacitors to chassis enclosure, never circuit 0V.\n3. Use C0G/NP0 dielectric ceramic capacitors to prevent distortion and preserve balance.",
        "quiz": "Q: Why must common-mode RFI filter capacitors (C1 and C2) be tightly matched in capacitance value?\nA: Because any capacitance mismatch converts high-frequency common-mode RF noise into differential noise, degrading RF immunity."
    },
    {
        "num": 60, "part_num": 6, "part_title": "Part 6: Receiver (Input Stage) Topologies",
        "slug": "differential-input-capacitance-matching-cmrr",
        "title": "Differential Input Capacitance Matching and High-Frequency CMRR",
        "tags": ["capacitance-matching", "c0g-np0", "hf-cmrr", "pcb-layout"],
        "standards": ["AES-X152 Section 3", "IEC 60268-3"],
        "equation": "\\Delta C_{\\text{in}} = |C_{\\text{pin2-gnd}} - C_{\\text{pin3-gnd}}| < 2\\text{ pF for } >60\\text{ dB CMRR @ 20 kHz}",
        "summary": "Impact of printed circuit board stray capacitance and component dielectric tolerances on high-frequency common-mode rejection.",
        "authors": ["Bill Whitlock", "Richard Cabot"],
        "myth": "If a receiver has 90 dB CMRR at 60 Hz, it will have 90 dB CMRR at 20 kHz.",
        "theory": "While low-frequency CMRR is governed by resistor matching, high-frequency CMRR (1 kHz to 20 kHz) is governed almost entirely by reactive capacitance matching between the two legs to ground. Because capacitive reactance decreases inversely with frequency (X_c = 1 / 2πfC), even a 2 pF difference in PCB trace capacitance creates a severe impedance mismatch at 20 kHz, causing high-frequency CMRR to collapse from 90 dB down to 40 dB.",
        "math": "At 20 kHz, reactance of 100 pF is X_c = 79.5 kΩ. A 5% tolerance error (5 pF) creates a ΔX_c = 4.1 kΩ mismatch, destroying common-mode rejection for high-frequency buzz harmonics and RF hash.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       HIGH-FREQUENCY CMRR CAPACITIVE ROLL-OFF                 |
|                                                                               |
|   60 Hz Power Hum:      CMRR = 90 dB (Governed by 0.01% Resistor Matching)   |
|   1 kHz Audio:          CMRR = 85 dB                                          |
|   10 kHz Sibilance:     CMRR = 65 dB (Stray Capacitance takes over!)          |
|   20 kHz Treble Limit:  CMRR = 50 dB (2 pF PCB Layout Mismatch limits CMRR)  |
|                                                                               |
|   SYMMETRICAL PCB TRACE LAYOUT IS ESSENTIAL FOR HIGH-FREQUENCY BALANCE!       |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 3 mandates plotting CMRR curves across 20 Hz to 20 kHz.",
        "takeaways": "1. Symmetrical PCB routing is required for Pin 2 and Pin 3 traces.\n2. Use 1% C0G/NP0 capacitors for all input RF networks.\n3. Guard traces and ground plane cutouts prevent unequal stray capacitance.",
        "quiz": "Q: What circuit parameter dominates the degradation of CMRR at 20 kHz compared to 60 Hz?\nA: Stray capacitance imbalance (ΔC) between the two signal conductors and ground."
    }
]
