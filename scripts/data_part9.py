"""
scripts/data_part9.py
Modules 081 - 090: Advanced Mathematical Models & Test Equipment
"""

PART9_MODULES = [
    {
        "num": 81, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "jim-meyer-thevenin-3-impedance-model",
        "title": "Jim Meyer's Thevenin 3-Impedance Equivalent Circuit Model",
        "tags": ["meyer-model", "thevenin-3z", "interconnect-math", "vgvd", "parasitics"],
        "standards": ["AES-X152 Section 5", "AES Convention Paper"],
        "equation": "V_{\\text{diff}} = V_{\\text{gvd}} * \\left[ \\frac{Z_{\\text{po}} * Z_{\\text{ri}} - Z_{\\text{ro}} * Z_{\\text{pi}}}{(Z_{\\text{po}} + Z_{\\text{pi}})(Z_{\\text{ro}} + Z_{\\text{ri}})} \\right]",
        "summary": "Jim Meyer's definitive 3-impedance Thevenin interconnect model accounting for driver impedances, cable shield capacitance, and receiver terminations.",
        "authors": ["Jim Meyer", "Bill Whitlock", "Anthony Kuzub"],
        "myth": "Simple 2-resistor voltage dividers adequately model real balanced audio lines.",
        "theory": "Jim Meyer formulated the rigorous 3-impedance Thevenin model adopted by AES-X152. The model accounts for: Hot Leg Driver Impedance (Z_po), Cold Leg Driver Impedance (Z_ro), Driver Common-Mode-to-Chassis Impedance (CMZ_out), Ground Voltage Differential (Vgvd), Cable Core-to-Shield Capacitance (C_ps), Receiver Hot Input Impedance (Z_pi), and Receiver Cold Input Impedance (Z_ri). This provides the complete analytical closed-form solution for audio interconnect performance.",
        "math": "When Z_po / Z_pi = Z_ro / Z_ri, the numerator (Z_po*Z_ri - Z_ro*Z_pi) equals zero, proving analytically that zero differential hum appears across the receiver input regardless of the magnitude of Vgvd!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       JIM MEYER THEVENIN 3-Z INTERCONNECT MODEL               |
|                                                                               |
|   [ Source Hot ] ---[ Z_po ]--------+--------[ C_ps ]---->[ Rx Hot: Z_pi ]    |
|                                     |                         |               |
|                                 [ CMZ_out ]               [ V_diff Load ]     |
|                                     |                         |               |
|   [ Source Cold ] --[ Z_ro ]--------+--------[ C_ps ]---->[ Rx Cold: Z_ri ]   |
|                                     |                                         |
|   [ Source Chassis ] <===( Vgvd Ground Loop Generator )===> [ Rx Chassis ]    |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 5 and Working Group Drafts: 'Jim Meyer Thevenin Interconnect Formulation'.",
        "takeaways": "1. Meyer model accounts for all parasitics simultaneously.\n2. Cross-product equality (Z_po*Z_ri = Z_ro*Z_pi) guarantees zero noise.\n3. Proves mathematically why balance is an impedance property.",
        "quiz": "Q: In Jim Meyer's Thevenin 3-impedance model, what condition causes the ground voltage differential (Vgvd) to produce zero differential noise across the load?\nA: When the ratio of driver source impedances matches the ratio of receiver input impedances (Z_po / Z_ro = Z_pi / Z_ri)."
    },
    {
        "num": 82, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "analytical-derivation-noise-from-imbalance",
        "title": "Analytical Derivation of Differential Noise from Impedance Imbalance",
        "tags": ["mathematical-derivation", "noise-transfer", "delta-z", "closed-form"],
        "standards": ["AES-X152 Section 5"],
        "equation": "V_{\\text{diff\\_noise}} \\approx V_{\\text{gvd}} * \\left( \\frac{\\Delta Z_{\\text{source}}}{Z_{\\text{receiver\\_common\\_mode}}} \\right)",
        "summary": "Closed-form mathematical derivation showing how inter-chassis ground potential differences convert to audible noise.",
        "authors": ["Jim Meyer", "Bill Whitlock"],
        "myth": "A 1-Ohm resistance imbalance is too small to have any audible consequence.",
        "theory": "By applying Kirchhoff's Voltage and Current Laws to the balanced interconnect loop: let Vgvd be the ground differential voltage, ΔZs = Z1 - Z2 be source impedance imbalance, and Z_cm be receiver common-mode input impedance. Common-mode current flowing through the source impedances produces a differential error voltage across the load.",
        "math": "Derivation: I_cm = Vgvd / (Z_cm + Zs). V1 = I_cm * Z1; V2 = I_cm * Z2. V_diff = V1 - V2 = I_cm * (Z1 - Z2) = Vgvd * (ΔZs / (Z_cm + Zs)). For Vgvd = 1.0 V, ΔZs = 5 Ω, and Z_cm = 10 kΩ: V_diff = 1.0 * (5 / 10,000) = 0.5 mV (-64 dBu), which is plainly audible in quiet passages!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       CLOSED-FORM NOISE DERIVATION                            |
|                                                                               |
|   Ground Differential Vgvd (1.0 V RMS)                                        |
|         |                                                                     |
|         v                                                                     |
|   Common-Mode Current I_cm = Vgvd / Z_cm                                      |
|         |                                                                     |
|         v                                                                     |
|   Multiplies by Source Imbalance ΔZs (5 Ω)                                    |
|         |                                                                     |
|         v                                                                     |
|   Resulting Differential Audio Noise: V_diff = 0.5 mV RMS (-64 dBu AUDIBLE HUM)|
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 5 Mathematical Appendix.",
        "takeaways": "1. Every 1 Ω of source imbalance directly increases differential noise.\n2. Doubling receiver common-mode impedance cuts induced noise in half (-6 dB).\n3. Keep source output resistors matched to within 0.1%.",
        "quiz": "Q: If a 2.0 V ground voltage differential exists and a receiver has 20 kΩ common-mode input impedance, how much differential noise results from a 10 Ω source imbalance?\nA: V_diff = 2.0 V * (10 Ω / 20,000 Ω) = 1.0 mV RMS (-57.8 dBu)."
    },
    {
        "num": 83, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "ac-voltmeters-true-rms-vs-average-hp400fl",
        "title": "AC Voltmeters: True RMS vs Average-Responding Meters (HP 400FL)",
        "tags": ["ac-voltmeter", "true-rms", "crest-factor", "hp400fl", "audio-metering"],
        "standards": ["IEC 60268-3", "AES-X152"],
        "equation": "V_{\\text{RMS}} = \\sqrt{\\frac{1}{T} \\int_0^T [v(t)]^2 dt}; \\quad V_{\\text{avg}} = \\frac{1}{T} \\int_0^T |v(t)| dt",
        "summary": "Operating principles of laboratory AC voltmeters (e.g. Hewlett-Packard 400FL): True RMS thermal converters vs average-responding rectifiers.",
        "authors": ["Anthony Kuzub", "John Woodgate"],
        "myth": "Any standard digital handheld multimeter measures AC audio levels accurately.",
        "theory": "Average-responding AC voltmeters rectify AC voltage and multiply by 1.111, which is only accurate for a pure, undistorted sine wave. On real audio signals, noise, or complex musical waveforms with high crest factors, average meters read 3 dB to 10 dB lower than true power. A True RMS voltmeter (such as the classic HP 400FL or precision thermal converters) measures true electrical heating power regardless of waveform shape.",
        "math": "Sine wave: Form factor = V_rms / V_avg = 1.111 (0.0 dB error). Pink noise: Form factor ≈ 1.25 (Average meter reads 1.05 dB low). Pulse train (10:1 crest): Average meter reads over 6 dB low!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       HP 400FL AC VOLTMETER ARCHITECTURE                      |
|                                                                               |
|   AC Audio In ---> [ Precision Stepped Attenuator ] ---> [ Linear AC Amp ]    |
|                                                                 |             |
|                                                      [ True RMS Detector ]    |
|                                                                 |             |
|                                                [ Mirrored Taut-Band Meter ]   |
|                                                (Dual dB / Linear Volts Scale) |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 60268-3 Section 13 mandates True RMS metering for all noise and CMRR evaluations.",
        "takeaways": "1. Average-responding meters produce massive errors on noise and distorted signals.\n2. Always verify that test instruments are True RMS rated up to 100 kHz.\n3. HP 400FL logarithmic scales provide unmatched dynamic range resolution.",
        "quiz": "Q: Why do average-responding AC voltmeters produce inaccurate readings when measuring audio noise floors?\nA: Because noise has a random Gaussian distribution with high crest factors; average-responding meters are calibrated strictly for pure sine waves."
    },
    {
        "num": 84, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "dual-slope-dmm-architecture-lucky-8050a",
        "title": "Dual-Slope Integration & Benchtop DMM Architecture (Lucky/Fluke 8050A)",
        "tags": ["dmm", "fluke-8050a", "lucky-8050a", "dual-slope", "true-rms-converter"],
        "standards": ["AES-X152"],
        "equation": "T_{\\text{de-integrate}} = T_{\\text{integrate}} * \\left( \\frac{V_{\\text{input}}}{V_{\\text{reference}}} \\right)",
        "summary": "Benchtop digital multimeter architecture: dual-slope integrating analog-to-digital conversion, True RMS AC converters, and dBm readouts.",
        "authors": ["Anthony Kuzub", "Dennis Bohn"],
        "myth": "Digital multimeters measure voltage instantly using flash converters.",
        "theory": "Precision benchtop multimeters (such as the iconic Fluke 8050A / LUCKY 8050A) use Dual-Slope Integrating A/D Converters. The input voltage charges an internal capacitor for a fixed integration period (typically 100 ms, exactly synchronized to reject 50/60 Hz line hum). The capacitor is then discharged at a constant rate using a precision reference voltage. The time required to de-integrate is directly proportional to input voltage, providing immune, high-linearity 4.5-digit precision.",
        "math": "Line rejection: Integrating over exactly 100 ms integrates across exactly 6 full cycles of 60 Hz (or 5 cycles of 50 Hz). The mathematical integral of a full sine cycle is exactly zero, achieving >60 dB normal-mode line hum rejection!",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       LUCKY 8050A DMM BENCHTOP ARCHITECTURE                   |
|                                                                               |
|   Input ---> [ True RMS Converter IC ] ---> [ Dual-Slope Integrator ]         |
|                                                    |                          |
|                                            [ Run-Up Ramp ]                    |
|                                            [ De-Integrate Run-Down ]          |
|                                                    |                          |
|   [ Yellow Phosphor Display ] <------------ [ Microcontroller Counter ]       |
|   (Readouts in True RMS Volts, dBm, and Relative Offset)                      |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Benchtop Instrumentation Guideline.",
        "takeaways": "1. Dual-slope integration inherently rejects 50 Hz and 60 Hz line hum.\n2. Built-in dB calculation allows direct decibel readings referenced to 600 Ω.\n3. True RMS converter ICs operate accurately up to 200 kHz.",
        "quiz": "Q: How does dual-slope integration in benchtop multimeters inherently eliminate 60 Hz power line noise?\nA: By setting the integration run-up time to an exact integer multiple of the line period (e.g. 100 ms = 6 cycles), causing line hum to integrate to zero."
    },
    {
        "num": 85, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "four-channel-crt-oscilloscope-probing",
        "title": "4-Channel CRT Oscilloscope Probing & Phase Verification",
        "tags": ["oscilloscope", "4-channel", "crt", "phase-tracking", "differential-probe"],
        "standards": ["AES-X152 Section 6", "IEC 60268-3"],
        "equation": "\\Delta \\theta = \\arcsin\\left(\\frac{A}{B}\\right) \\quad \\text{(Lissajous phase angle derivation)}",
        "summary": "Using 4-channel analog/digital oscilloscopes to probe audio balanced interconnects: CH1 (Vin), CH2 (Hot), CH3 (Cold), and CH4 (Vdiff).",
        "authors": ["Anthony Kuzub", "Bill Whitlock"],
        "myth": "An oscilloscope ground clip can be connected to any pin of a balanced audio line.",
        "theory": "Oscilloscope ground clips are hard-bonded to building safety earth! Connecting a scope ground clip to Pin 2 or Pin 3 of a balanced driver creates a dead short to ground, destroying the balance and potentially damaging op-amps. Probing balanced lines requires either a dedicated active differential probe or a 4-channel oscilloscope tracking: CH1 = Input Reference, CH2 = Pin 2 (+ Hot), CH3 = Pin 3 (- Cold), and CH4 = Math Channel (CH2 - CH3).",
        "math": "Lissajous X-Y mode: Plotting Pin 2 against Pin 3 produces a straight diagonal line with a -45° slope for perfect 180° anti-phase balance. Any phase skew or amplitude mismatch opens the line into an ellipse.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       4-CHANNEL OSCILLOSCOPE PROBING RIG                      |
|                                                                               |
|   CH1 (Yellow Phosphor): Audio Generator Reference (Vin)                      |
|   CH2 (Cyan Trace):      Pin 2 (+ Hot Output)                                 |
|   CH3 (Pink Trace):      Pin 3 (- Cold Output - 180° Inverted)                |
|   CH4 (Green Trace):     Differential Signal across Load (CH2 - CH3)          |
|                                                                               |
|   Scope Ground Leads connect ONLY to equipment metal chassis enclosure!       |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6 probing standards.",
        "takeaways": "1. Never attach scope ground clips to Pin 2 or Pin 3.\n2. Scope grounds attach strictly to chassis Pin 1.\n3. Use Math (CH1 - CH2) or differential probes for true differential inspection.",
        "quiz": "Q: What happens if you attach a standard oscilloscope ground clip to Pin 3 of a Topology 6.1 push-pull driver?\nA: You create a direct short circuit to building earth ground, overloading the inverted op-amp output stage."
    },
    {
        "num": 86, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "hp-353a-patch-panel-attenuation-and-loads",
        "title": "Hewlett-Packard 353A Patch Panel: Precision Attenuation & Calibrated Loads",
        "tags": ["hp353a", "patch-panel", "attenuation", "impedance-matching", "laboratory"],
        "standards": ["HP Manual 00353-90003", "AES-X152"],
        "equation": "\\text{Total\\_Attenuation} = \\text{Decade\\_Step (0-100 dB)} + \\text{Vernier\\_Step (0-10 dB)}",
        "summary": "Engineering study of the classic Hewlett-Packard 353A Patch Panel: precision constant-impedance bridged-T attenuators and selectable terminations.",
        "authors": ["Anthony Kuzub", "John Woodgate"],
        "myth": "Audio attenuator pads can use simple potentiometers without altering system impedances.",
        "theory": "The HP 353A Patch Panel is the gold standard of laboratory transmission test fixtures. It incorporates dual stepped bridged-T attenuators (0 to 100 dB in 10 dB steps, and 0 to 10 dB in 1 dB steps) that maintain precise, constant terminal impedance (135 Ω, 600 Ω, or 900 Ω) regardless of attenuation setting. It includes selectable bridging terminations (10 kΩ) and MEAS/CAL switching for instant calibration referencing.",
        "math": "Attenuation accuracy: ±0.1 dB from DC to 100 kHz. Frequency compensation networks eliminate capacitive parasitic roll-off across all 110 dB of attenuation range.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       HP 353A PATCH PANEL ARCHITECTURE                        |
|                                                                               |
|   Input ---> [ Z_in Selector: 135/600/900/10k ]                               |
|                     |                                                         |
|              [ 10 dB/step Attenuator: 0-100 dB ]                              |
|                     |                                                         |
|              [ 1 dB/step Attenuator: 0-10 dB ]                                |
|                     |                                                         |
|              [ MEAS / CAL Transfer Switch ]                                   |
|                     |                                                         |
|   Output --> [ Z_out Selector: 135/600/900 Ω ]                                |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "Hewlett-Packard Operating and Service Manual 00353-90003 and AES-X152.",
        "takeaways": "1. Bridged-T attenuators maintain constant source and load impedances.\n2. Stepped precision attenuators eliminate potentiometer tracking errors.\n3. Essential for calibrated gain-bandwidth and CMRR testing.",
        "quiz": "Q: What is the primary operational advantage of the stepped bridged-T attenuators used in the HP 353A Patch Panel?\nA: They maintain constant characteristic input and output impedances regardless of the selected attenuation level."
    },
    {
        "num": 87, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "thd-plus-n-measurement-techniques",
        "title": "Total Harmonic Distortion plus Noise (THD+N) Measurement Techniques",
        "tags": ["thd+n", "distortion-analyzer", "notch-filter", "harmonics", "audio-precision"],
        "standards": ["IEC 60268-3", "AES-X152 Section 2"],
        "equation": "\\text{THD+N} = \\frac{\\sqrt{V_{\\text{harmonics}}^2 + V_{\\text{noise}}^2}}{V_{\\text{total}}} * 100\\%",
        "summary": "State-of-the-art distortion analysis: deep analog notch filters, FFT residual analysis, and distinguishing harmonic distortion from noise.",
        "authors": ["Richard Cabot", "Dennis Bohn"],
        "myth": "A THD+N specification of 0.005% means the device creates 0.005% harmonic distortion.",
        "theory": "Standard THD+N measurement uses a precision analog tracking notch filter to notch out the fundamental test frequency (e.g. 1 kHz) by >120 dB. Everything remaining in the measurement bandwidth—harmonics, power supply hum, thermal noise, and RF interference—is measured as the residual. At low signal levels, 'THD+N' is almost entirely thermal noise, not nonlinear harmonic distortion!",
        "math": "THD+N in dB: 20 * log10(V_residual / V_total). A residual of 10 µV on a 1.0 V signal corresponds to -100 dB (0.001%) THD+N.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       ANALOG NOTCH FILTER THD+N ANALYZER                      |
|                                                                               |
|   Audio Under Test ---> [ Precision 1 kHz Deep Notch Filter ]                 |
|                                     |                                         |
|                   (Removes 1 kHz fundamental by >120 dB)                      |
|                                     |                                         |
|                                     v                                         |
|   Residual Signal = [ Harmonics (2k, 3k, 4k...) + Hum (60Hz) + Thermal Noise ]|
|                                     |                                         |
|   True RMS Voltmeter Measures Total Residual Power relative to Input!         |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 60268-3 Section 11 and AES-X152 Section 2 specify measurement bandwidths (e.g. 20 Hz - 20 kHz, 80 kHz BW).",
        "takeaways": "1. Always check measurement bandwidth when comparing THD+N specs.\n2. FFT spectrum analysis is necessary to separate real harmonics from noise.\n3. THD+N increases at low output levels due to noise floor dominance.",
        "quiz": "Q: Why does a device's measured THD+N percentage typically increase at very low signal levels?\nA: Because the fixed residual noise floor becomes a larger fraction of the small signal voltage, dominating the calculation."
    },
    {
        "num": 88, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "spice-circuit-simulation-of-interconnects",
        "title": "SPICE Circuit Simulation of Audio Line Interconnections",
        "tags": ["spice", "circuit-simulation", "ltspice", "monte-carlo", "tolerance"],
        "standards": ["AES-X152 Section 6"],
        "equation": "\\text{Monte Carlo Run: } R_n = R_{\\text{nom}} * (1 + \\text{tol} * \\text{random}(-1, +1))",
        "summary": "Modeling audio interconnect systems in SPICE: transmission line subcircuits, Monte Carlo resistor tolerance distributions, and CMRR yield.",
        "authors": ["Bill Whitlock", "Anthony Kuzub"],
        "myth": "SPICE simulation with ideal components proves a circuit will work in the real world.",
        "theory": "Simulating a balanced difference amplifier with nominal component values in SPICE shows 140 dB CMRR because components are mathematically identical. To evaluate real manufacturability, engineers must perform Monte Carlo analysis: running 1,000 simulation passes where component values vary randomly across their tolerance envelopes (e.g. 1% or 0.1%). This reveals the true statistical yield and worst-case CMRR.",
        "math": "Monte Carlo distribution: 1% resistors yield a Gaussian distribution of CMRR centered at 44 dB, with worst-case units falling down to 34 dB. 0.1% resistors shift the center to 64 dB, with worst-case units at 54 dB.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       SPICE MONTE CARLO CMRR YIELD HISTOGRAM                  |
|                                                                               |
|   1% RESISTORS:                                                               |
|   Count |                                                                     |
|         |           ***                                                       |
|         |         *******                                                     |
|         +-----*---*********---*-------------------------------------> CMRR   |
|              34dB   44dB    54dB                                              |
|                                                                               |
|   0.1% RESISTORS:                                                             |
|   Count |                                                                     |
|         |                                 ***                                 |
|         |                               *******                               |
|         +---------------------------*--*********--*-----------------> CMRR   |
|                                    54dB  64dB   74dB                          |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Section 6 SPICE benchmark netlists.",
        "takeaways": "1. Never trust a SPICE CMRR simulation without Monte Carlo analysis.\n2. Model cable capacitance imbalances in SPICE transmission lines.\n3. Include source impedance tolerances in driver subcircuits.",
        "quiz": "Q: Why is Monte Carlo analysis essential when simulating balanced audio input stages in SPICE?\nA: Because standard SPICE simulations assume perfect 0.00% component matching; Monte Carlo randomly varies component tolerances to reveal real-world statistical CMRR performance."
    },
    {
        "num": 89, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "time-domain-vs-frequency-domain-behavior",
        "title": "Time-Domain vs Frequency-Domain Behavior of Balanced Interconnects",
        "tags": ["time-domain", "frequency-domain", "fft", "step-response", "square-wave"],
        "standards": ["AES-X152", "IEC 60268-3"],
        "equation": "v(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} V(\\omega) e^{j\\omega t} d\\omega \\quad \\text{(Fourier Transform Pair)}",
        "summary": "Correlating square wave step-response in the time domain with Bode frequency magnitude and phase responses.",
        "authors": ["Richard Cabot", "Anthony Kuzub"],
        "myth": "A flat frequency response from 20 Hz to 20 kHz guarantees perfect transient response.",
        "theory": "Audio signals are transient time-domain events. Testing balanced interconnects with square waves (typically 10 kHz) immediately reveals cable parasitic resonances, transformer leakage inductance ringing, and op-amp phase margin instability. Damped high-frequency ringing on square wave edges indicates phase margin degradation and ultrasonic resonance, even if frequency response appears flat on steady-state sine sweeps.",
        "math": "Step-response overshoot: Damping factor ζ < 0.707 produces ringing. Overshoot percentage: OS% = 100 * exp(-π*ζ / sqrt(1 - ζ^2)). 30% overshoot indicates a sharp peak in frequency response above 50 kHz.",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       SQUARE WAVE TRANSIENT STEP RESPONSE                     |
|                                                                               |
|   OPTIMALLY DAMPED (ζ = 0.707):                                               |
|       +-----------+                                                           |
|       |           |                                                           |
|   ----+           +--------------------- (Clean rise, zero overshoot)         |
|                                                                               |
|   UNDER-DAMPED (Parasitic Ringing):                                           |
|        _/\_                                                                   |
|       /    \--+                                                               |
|   ---+        +------------------------- (Ringing indicates high-Q resonance!) |
+-------------------------------------------------------------------------------+""",
        "standards_ref": "IEC 60268-3 Section 12 square-wave testing standards.",
        "takeaways": "1. 10 kHz square wave testing quickly diagnoses line instability.\n2. Ringing indicates capacitive loading on output op-amps.\n3. Add small series isolation resistors (22 Ω - 47 Ω) to stabilize line drivers.",
        "quiz": "Q: What does high-frequency ringing on the edges of a 10 kHz square wave indicate when driving a long cable?\nA: Under-damped parasitic resonance between the driver output impedance and the distributed cable capacitance."
    },
    {
        "num": 90, "part_num": 9, "part_title": "Part 9: Advanced Mathematical Models & Test Equipment",
        "slug": "measurement-data-points-mdp-methodology",
        "title": "Measurement Data Points (MDP): Calibrated Probing Methodology",
        "tags": ["mdp", "probing", "measurement-points", "calibration", "data-acquisition"],
        "standards": ["AES-X152 Section 4"],
        "equation": "\\text{MDP-0 (Drive)} \\rightarrow \\text{MDP-1 (Hot)} \\rightarrow \\text{MDP-2 (Cold)} \\rightarrow \\text{MDP-3 (Load)}",
        "summary": "The AES-X152 standardized Measurement Data Point (MDP) framework for probing, troubleshooting, and verifying balanced line nodes.",
        "authors": ["Anthony Kuzub", "Bruce Olson"],
        "myth": "Audio testing can probe random circuit points without standardized calibration referencing.",
        "theory": "To ensure absolute repeatability and eliminate ambiguity in technical reports and datasheets, AES-X152 establishes standardized Measurement Data Points (MDP across all circuit topologies):",
        "math": """
- **MDP-0**: Audio Drive Generator Input (Reference excitation voltage V_gen).
- **MDP-1**: Pin 2 (+ Hot Conductor Terminal at equipment connector boundary).
- **MDP-2**: Pin 3 (- Cold Conductor Terminal at equipment connector boundary).
- **MDP-3**: Differential Load Terminals across receiver termination (R_load).""",
        "schematic": """
+-------------------------------------------------------------------------------+
|                       AES-X152 STANDARDIZED MDP NODES                         |
|                                                                               |
|   [MDP-0] Gen In ---> [ Driver ] ----[MDP-1: Pin 2 Hot] ----> [ Cable ] ----+ |
|                                                                             | |
|                       [ Driver ] ----[MDP-2: Pin 3 Cold] ---> [ Cable ] ----+ |
|                                                                             | |
|                                                                   [MDP-3: Load]
+-------------------------------------------------------------------------------+""",
        "standards_ref": "AES-X152 Clause 4.3 standardized MDP indexing schema.",
        "takeaways": "1. MDP-0 defines input generator calibration.\n2. MDP-1 and MDP-2 verify driver leg balance and unbalance behavior.\n3. MDP-3 measures final differential performance across the load.",
        "quiz": "Q: According to the AES-X152 framework, which node corresponds to Measurement Data Point 3 (MDP-3)?\nA: The differential load terminals across the receiving equipment input."
    }
]
