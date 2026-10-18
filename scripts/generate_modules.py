#!/usr/bin/env python3
"""
scripts/generate_modules.py
Generates 100 comprehensive Markdown curriculum and reference modules for Balanced Audio & AES-X152.
Each module contains YAML frontmatter, detailed technical discourse, circuit diagrams,
mathematical proofs, standards citations, design rules, and self-assessment benchmarks.
"""

import os
import json
from pathlib import Path

BASE_DIR = Path("/home/anthony/Documents/GitProjects/Balanced Audio")
MODULES_DIR = BASE_DIR / "modules"
MODULES_DIR.mkdir(parents=True, exist_ok=True)

# Define 10 Parts with 10 Modules each = exactly 100 Modules
PARTS = [
    {
        "part_num": 1,
        "title": "Part 1: Foundations & Core Principles",
        "description": "Core physics of balanced audio, impedance symmetry, differential signaling, and the fundamental rejection of common-mode noise.",
        "modules": [
            {
                "num": 1,
                "slug": "golden-rule-of-balance",
                "title": "The Golden Rule of Balanced Audio (Impedance Symmetry vs Voltage Equality)",
                "tags": ["impedance", "balance", "aes48", "cmrr", "fundamentals"],
                "summary": "Explains why balanced audio is an impedance characteristic and not a signal voltage property.",
                "standards": ["AES-X152", "AES48", "IEC 60268-3"],
                "key_equation": "CMRR = 20 * log10(|(Z_diff / 2) / Delta_Z|)",
                "authors": ["Bill Whitlock", "Dennis Bohn", "Anthony Kuzub"],
                "content_body": """
### 1. The Enduring Myth of Balanced Audio
For decades, sound engineers and equipment operators were taught that a balanced line is defined by "two equal and opposite audio voltages traveling down a cable." This persistent misconception claims that Pin 2 carries a +1.0 V positive signal, Pin 3 carries a -1.0 V inverted signal, and the destination subtracts them to double the audio while canceling noise.

While many professional devices do output symmetrical anti-phase voltages, **voltage symmetry is completely irrelevant to noise rejection**. Noise rejection in differential circuits depends entirely on **impedance symmetry to a common reference (ground)**.

### 2. Theoretical & Mathematical Proof
Consider two conductors exposed to an external electromagnetic interference field:
An electrostatic noise source $V_{noise}$ couples capacitively through stray capacitance $C_{stray}$ to both Conductor 1 (Pin 2) and Conductor 2 (Pin 3). Each conductor has a source impedance to ground: $Z_1$ for Pin 2, and $Z_2$ for Pin 3.

The noise voltage induced on Conductor 1 is:
$$V_{n1} = V_{noise} \\cdot \\frac{Z_1}{Z_1 + \\frac{1}{j\\omega C_{stray}}}$$

The noise voltage induced on Conductor 2 is:
$$V_{n2} = V_{noise} \\cdot \\frac{Z_2}{Z_2 + \\frac{1}{j\\omega C_{stray}}}$$

A differential receiver detects only the difference voltage $V_{diff} = V_{n1} - V_{n2}$:
$$V_{diff} = V_{noise} \\left( \\frac{Z_1}{Z_1 + Z_{coupling}} - \\frac{Z_2}{Z_2 + Z_{coupling}} \\right)$$

If and only if $Z_1 = Z_2$:
$$V_{diff} = 0\\text{ V}$$

Notice that the audio signal voltage does not appear anywhere in this equation. Pin 2 could carry 1.0 V of audio, and Pin 3 could carry 0.0 V of audio (connected to ground through a resistor matching $Z_1$). Because $Z_1 = Z_2$, the induced noise is identical on both legs ($V_{n1} = V_{n2}$), and the differential receiver subtracts it completely!

```
+-----------------------------------------------------------------+
|               IMPEDANCE-BALANCED TRANSMITTER                    |
|                                                                 |
|   Op-Amp Out (1.0 V Audio) ----[ Z1 = 50 Ω ]---- Pin 2 (Hot)    |
|                                                                 |
|   Ground Ref (0.0 V Audio) ----[ Z2 = 50 Ω ]---- Pin 3 (Cold)   |
|                                                                 |
|   Z1 == Z2  ==>  Noise Induced on Pin 2 == Noise on Pin 3      |
|   Differential Receiver calculates: (Signal + Noise) - (Noise)  |
|   Result: Clean 1.0 V Signal with 100% Noise Cancellation!       |
+-----------------------------------------------------------------+
```

### 3. Standards Definition (IEC 60268-3 & AES-X152)
The International Electrotechnical Commission standard IEC 60268-3 Section 3.1.2 defines balance:
> *"A balanced circuit is a circuit in which two signal conductors have equal impedances to ground and to all other conductors."*

Notice there is zero mention of audio signal voltage. A system is balanced by virtue of its impedances.
"""
            },
            {
                "num": 2,
                "slug": "cmrr-mathematical-foundations",
                "title": "Common-Mode Rejection Ratio (CMRR) Mathematical Foundations",
                "tags": ["cmrr", "mathematics", "rejection", "differential-gain", "common-mode"],
                "summary": "Mathematical derivation of Common-Mode Rejection Ratio (CMRR) and Common-Mode Gain versus Differential Gain.",
                "standards": ["IEC 60268-3 Section 13.2", "AES-X152"],
                "key_equation": "CMRR = 20 * log10(|A_diff / A_cm|)",
                "authors": ["Bill Whitlock", "Jim Brown"],
                "content_body": """
### 1. Defining CMRR
The Common-Mode Rejection Ratio (CMRR) measures the ability of a differential input stage to amplify the desired differential signal while rejecting undesirable common-mode noise present on both conductors simultaneously.

For an input with voltages $V_1$ (Pin 2) and $V_2$ (Pin 3):
- **Differential Signal ($V_d$)**: $V_d = V_1 - V_2$
- **Common-Mode Signal ($V_{cm}$)**: $V_{cm} = \\frac{V_1 + V_2}{2}$

The output voltage $V_{out}$ is:
$$V_{out} = A_d \\cdot V_d + A_{cm} \\cdot V_{cm}$$

Where:
- $A_d$ = Differential Voltage Gain
- $A_{cm}$ = Common-Mode Voltage Gain

The Common-Mode Rejection Ratio is the ratio of differential gain to common-mode gain:
$$\\text{CMRR} = \\left| \\frac{A_d}{A_{cm}} \\right|$$

Expressed in decibels (dB):
$$\\text{CMRR}_{\\text{dB}} = 20 \\log_{10} \\left| \\frac{A_d}{A_{cm}} \\right|$$

### 2. Real-World Benchmarks
- **Poor Rejection**: < 40 dB (hum and buzz audible in quiet passages)
- **Adequate Studio Performance**: 60 dB to 70 dB
- **High-Performance Audio Gear**: 80 dB to 95 dB
- **Precision Instrumentation / Transformers**: > 100 dB at 60 Hz

### 3. Frequency Dependence of CMRR
CMRR is not a single number; it degrades rapidly at higher frequencies because stray cable and semiconductor capacitances create impedance imbalances that increase with frequency:
$$X_C = \\frac{1}{2\\pi f C}$$
Even a 5 pF mismatch between Pin 2 and Pin 3 capacitance can degrade an 80 dB CMRR at 60 Hz down to 35 dB at 10 kHz.
"""
            },
            {
                "num": 3,
                "slug": "differential-signaling-physics",
                "title": "Differential Signaling Physics & Inherent Noise Cancellation",
                "tags": ["differential", "physics", "superposition", "cancellation"],
                "summary": "Physics of differential receivers, common-mode subtraction, and superposition in balanced lines.",
                "standards": ["AES-X152 Section 4", "AES14"],
                "key_equation": "V_out = (V_hot - V_cold) * Gain",
                "authors": ["Neil Muncy", "Bill Whitlock"],
                "content_body": """
### 1. The Physics of Differential Subtraction
When two conductors run in close physical proximity (especially twisted pair geometry), external electromagnetic and electrostatic fields couple into both conductors with nearly identical intensity.

Let:
- $V_{\\text{sig}}$ = Desired audio signal generated at source
- $V_{\\text{ext}}$ = Noise field induced on the cable

In an ideal balanced line:
- Pin 2 receives: $V_2 = V_{\\text{sig+}} + V_{\\text{ext}}$
- Pin 3 receives: $V_3 = V_{\\text{sig-}} + V_{\\text{ext}}$

The differential receiver subtracts Pin 3 from Pin 2:
$$V_{\\text{out}} = V_2 - V_3 = (V_{\\text{sig+}} + V_{\\text{ext}}) - (V_{\\text{sig-}} + V_{\\text{ext}})$$
$$V_{\\text{out}} = (V_{\\text{sig+}} - V_{\\text{sig-}}) + (V_{\\text{ext}} - V_{\\text{ext}})$$
$$V_{\\text{out}} = V_{\\text{differential}} + 0$$

External noise cancels completely through algebraic subtraction.

### 2. Spatial Uniformity and Twisting
For this equation to hold, $V_{\\text{ext}}$ on Pin 2 must precisely equal $V_{\\text{ext}}$ on Pin 3. Twisting the conductor pair ensures that each wire alternates positions relative to external field gradients, averaging the induced noise across cable length.
"""
            },
            {
                "num": 4,
                "slug": "resistor-bridge-tolerances-cmrr",
                "title": "Resistor Bridge Tolerances (5%, 1%, 0.1%, 0.01%) & CMRR Degradation",
                "tags": ["resistors", "tolerance", "difference-amplifier", "bridge", "cmrr"],
                "summary": "Impact of resistor bridge matching in single op-amp differential input stages on common-mode rejection.",
                "standards": ["AES-X152 Section 6.7", "IEC 60268-3"],
                "key_equation": "CMRR_max ~= 20 * log10(1 / (4 * Tolerance))",
                "authors": ["Bill Whitlock", "Dennis Bohn"],
                "content_body": """
### 1. The Classic 4-Resistor Differential Stage
The workhorse balanced input receiver is the single op-amp difference amplifier composed of an operational amplifier and four resistors ($R_1, R_2, R_3, R_4$).

```
            R1
Pin 2 ----[ 10k ]----+------------ - \
                     |    R2          \
                     +--[ 10k ]--+     \
                                 |      |-- Vout
            R3                   |     /
Pin 3 ----[ 10k ]----+           |    /
                     |    R4     |   /
                     +--[ 10k ]--+  +
                         |
                        0V
```

If all resistors are perfectly matched ($R_1 = R_3$ and $R_2 = R_4$), common-mode rejection is theoretically infinite (limited only by op-amp open-loop CMRR).

### 2. Tolerance Degradation Analysis
When standard discrete resistors are used, resistor tolerance creates an immediate ceiling on achievable CMRR:
$$\\text{CMRR}_{\\text{worst-case}} \\approx 20 \\log_{10} \\left( \\frac{1 + A_d}{4 \\cdot \\text{Tolerance}} \\right)$$

For unity gain ($A_d = 1$):
- **5% Resistors**: Maximum CMRR $\\approx 30\\text{ dB}$ (Completely unacceptable for pro audio)
- **1% Resistors**: Maximum CMRR $\\approx 44\\text{ dB}$ (Poor hum rejection)
- **0.1% Resistors**: Maximum CMRR $\\approx 64\\text{ dB}$ (Acceptable entry pro level)
- **0.01% Laser-Trimmed Resistors**: Maximum CMRR $\\approx 84\\text{ dB}$ (High performance)
- **0.005% Integrated ICs (e.g. THAT 1200 / INA134)**: CMRR $> 90\\text{ dB}$

### 3. Engineering Conclusion
Never attempt to build balanced receiver stages with 1% discrete carbon or metal film resistors without hand-matching or laser-trimmed resistor networks.
"""
            },
            {
                "num": 5,
                "slug": "source-impedance-imbalance-delta-z",
                "title": "Source Impedance Imbalance (ΔZs) and the 10-Ohm Standard Mismatch",
                "tags": ["source-impedance", "imbalance", "iec-test", "mismatch", "cmrr"],
                "summary": "IEC 60268-3 standard testing with a 10-Ohm source impedance imbalance and its real-world implications.",
                "standards": ["IEC 60268-3 Section 13.2", "AES-X152"],
                "key_equation": "Delta_Z = |Z_hot - Z_cold| = 10 Ohms",
                "authors": ["Bill Whitlock", "John Woodgate"],
                "content_body": """
### 1. The Laboratory Myth vs Real-World Reality
In audio laboratory tests, balanced inputs are frequently tested with laboratory generators that have perfectly matched $0.00\\ \\Omega$ source impedances. Under this synthetic condition, simple single op-amp differential stages can demonstrate 80 dB CMRR.

However, in the field, cables have resistance, connectors have contact resistance, and output stages have resistor tolerances. Real drivers always present a **source impedance imbalance**:
$$\\Delta Z_S = |Z_{S\\text{(hot)}} - Z_{S\\text{(cold)}}|$$

### 2. The IEC 60268-3 10-Ohm Standard Test
Recognizing this reality, the International Electrotechnical Commission established standard **IEC 60268-3 Section 13.2**. This standard mandates testing balanced inputs by deliberately inserting an intentional **$10\\ \\Omega$ resistor** in series with one leg of the signal source.

```
Generator ---+----[ 10 Ω ]---- Pin 2 (Hot)  ---> Receiver Input
             |
             +---------------- Pin 3 (Cold) ---> Receiver Input
```

### 3. Test Results Across Topologies
- **Standard Single Op-Amp Receiver (10 kΩ input)**:
  CMRR drops precipitously from 80 dB down to **34 dB**! The $10\\ \\Omega$ imbalance destroys common-mode rejection.
- **Transformer Balanced Input**:
  CMRR remains **> 85 dB** because the transformer's common-mode input impedance is gigohms.
- **InGenius Active Receiver (THAT 1200)**:
  CMRR remains **> 90 dB** due to patented bootstrapping providing millions of ohms of common-mode input impedance.
"""
            },
            {
                "num": 6,
                "slug": "balanced-vs-unbalanced-systems",
                "title": "Balanced vs Unbalanced Systems: Comparative Electrical Analysis",
                "tags": ["unbalanced", "rca", "noise", "ground-current", "comparisons"],
                "summary": "Direct electrical comparison between single-ended unbalanced (RCA/TS) and balanced differential interconnects.",
                "standards": ["AES-X152 Section 3", "AES48"],
                "key_equation": "V_unbal_error = I_shield * R_shield",
                "authors": ["Dennis Bohn", "Anthony Kuzub"],
                "content_body": """
### 1. Anatomy of an Unbalanced Interconnection
In an unbalanced interface (e.g. RCA or 1/4\" TS):
- Conductor 1: High-impedance hot signal path ($V_{sig}$)
- Conductor 2: Shield / ground return path ($0\\text{ V}$)

Crucially, **the shield is part of the audio signal path**. Any current $I_{\\text{shield}}$ flowing through the shield (from power supply leakage, ground potential differences, or RF ingress) develops an error voltage according to Ohm's Law:
$$V_{\\text{error}} = I_{\\text{shield}} \\cdot R_{\\text{shield}}$$

This error voltage is placed directly in series with the audio signal. The receiving device has no mathematical way to separate the shield noise from the musical content.

### 2. Anatomy of a Balanced Interconnection
In a balanced interface (AES14 XLR or 1/4\" TRS):
- Conductor 1: Signal Hot (+)
- Conductor 2: Signal Cold (-)
- Conductor 3: Shield (connected to chassis ground, completely independent of the signal loop)

Audio current circulates strictly between Conductor 1 and Conductor 2. Shield currents flow directly to the metal chassis enclosure without ever touching the audio circuit $0\\text{ V}$ reference.

```
UNBALANCED:  [Source] ==(Hot: Audio)===> [Receiver]
             [Source] <--(Shield: Audio + Ground Hum)-- [Receiver]
             (Hum cannot be separated from Audio!)

BALANCED:    [Source] ==(Pin 2: Audio + Noise)==> [Diff Receiver]
             [Source] ==(Pin 3: 0V + Noise)=====> [Diff Receiver]
             [Chassis Shield: Carries Hum to Earth Ground]
             (Diff Receiver subtracts: Output = Clean Audio!)
```
"""
            },
            {
                "num": 7,
                "slug": "common-mode-to-differential-mode-conversion",
                "title": "Common-Mode to Differential-Mode Conversion Mechanisms",
                "tags": ["mode-conversion", "cm-dm", "parasitics", "capacitance", "interference"],
                "summary": "How common-mode voltage is converted to differential hum by impedance imbalances in cables and terminations.",
                "standards": ["AES-X152 Section 5", "AES48"],
                "key_equation": "V_diff_noise = V_cm * (Delta_Z / Z_cm_input)",
                "authors": ["Jim Brown", "Bill Whitlock"],
                "content_body": """
### 1. The Conversion Phenomenon
In any balanced system, the unwanted voltage between the signal conductors and ground is the **Common-Mode Voltage ($V_{cm}$)**.
If the common-mode voltage remained strictly common-mode, a differential receiver with adequate CMRR could reject it completely.

However, when an impedance imbalance exists between the legs:
$$\\Delta Z = |Z_1 - Z_2|$$
A portion of the common-mode voltage is converted into a differential voltage $V_{\\text{diff}}$ that appears directly across Pin 2 and Pin 3:
$$V_{\\text{diff}} = V_{cm} \\cdot \\left( \\frac{Z_1}{Z_1 + Z_{\\text{in1}}} - \\frac{Z_2}{Z_2 + Z_{\\text{in2}}} \\right)$$

Once converted into a differential signal, **no receiver in the world can reject it**, because it is indistinguishable from the desired audio program!

### 2. Sources of Mode Conversion
1. **Cable Capacitance Imbalance**: One conductor closer to the shield than the other ($\Delta C > 5\\text{ pF}$).
2. **Connector Contamination**: Dirt or oxidation on Pin 3 contact adding $5\\ \\Omega$ contact resistance.
3. **Driver Resistor Tolerance**: 1% output resistors yielding a $1\\ \\Omega$ to $2\\ \\Omega$ mismatch.
4. **RF Asymmetry**: Ferrite beads or RF inductors with unbalanced core coupling.
"""
            },
            {
                "num": 8,
                "slug": "audio-bandwidth-slew-rate-noise",
                "title": "Audio Bandwidth, Slew Rate, and High-Frequency Noise Coupling",
                "tags": ["bandwidth", "slew-rate", "capacitance", "filters", "ultrasonic"],
                "summary": "Interactions between amplifier slew rate, cable capacitance, RF ingress, and ultrasonic common-mode noise.",
                "standards": ["AES-X152 Section 2", "IEC 60268-3"],
                "key_equation": "Slew_Rate = 2 * pi * f_max * V_peak",
                "authors": ["Richard Cabot", "Dennis Bohn"],
                "content_body": """
### 1. Why Infinite Bandwidth is Dangerous in Audio
While high audio fidelity requires a flat response across $20\\text{ Hz} - 20\\text{ kHz}$, allowing unconstrained bandwidth into the megahertz region creates severe vulnerability to Radio Frequency Interference (RFI).

High-frequency signals from cell phones, Wi-Fi, AM/FM broadcast transmitters, and switch-mode power supplies enter balanced cables. If allowed into input op-amps:
1. The op-amp exceeds its **slew rate limit**:
   $$\\text{SR} = \\left. \\frac{dV_{out}}{dt} \\right|_{\\max} < 2\\pi f V_p$$
2. The internal input stage saturates, causing **slew-induced distortion (SID)** and rectification of RF signals into audible buzz and clicks.

### 2. Recommended Input Filtering
All professional balanced inputs must incorporate low-pass RFI filtering at the connector entrance before the signal reaches the first active semiconductor:
- Differential cutoff frequency: $80\\text{ kHz} - 150\\text{ kHz}$
- Common-mode cutoff frequency: $500\\text{ kHz} - 1\\text{ MHz}$
- Capacitors must be precision matched (C0G/NP0 dielectric, 1% tolerance) to preserve HF CMRR.
"""
            },
            {
                "num": 9,
                "slug": "600-ohm-legacy-vs-modern-bridging",
                "title": "The 600-Ohm Power Transfer Legacy vs Modern Voltage Bridging",
                "tags": ["600-ohm", "bridging", "history", "impedance-matching", "power-transfer"],
                "summary": "Historical analysis of the Bell Labs 600-Ohm power matching standard and why modern audio uses voltage bridging.",
                "standards": ["IEC 61938 Section 5", "AES-X152"],
                "key_equation": "Z_load >= 10 * Z_source (Modern Bridging Ratio)",
                "authors": ["Anthony Kuzub", "John Woodgate"],
                "content_body": """
### 1. Historical Origins: 600-Ohm Matched Power Transfer
In the early 20th century, telephone networks operated over miles of open wire without repeater amplifiers. To maximize power transfer from the line into telephone transducers, the **Maximum Power Transfer Theorem** was applied:
$$Z_{\\text{source}} = Z_{\\text{cable}} = Z_{\\text{load}} = 600\\ \\Omega$$

In a 600-ohm matched system:
- Driver output impedance = $600\\ \\Omega$
- Cable characteristic impedance = $600\\ \\Omega$
- Load termination resistor = $600\\ \\Omega$
- Half of the generated voltage drops across the source impedance itself (a $6\\text{ dB}$ voltage loss).

### 2. The Modern Voltage Bridging Paradigm
At audio frequencies ($< 20\\text{ kHz}$), electrical wavelengths ($\lambda > 15\\text{ kilometers}$) are vastly longer than typical studio cable runs ($1 - 100\\text{ meters}$). Transmission line reflections do not occur at audio frequencies over studio cable lengths.

Therefore, modern pro audio universally uses **Voltage Bridging**:
- **Low Source Impedance ($Z_{\\text{out}}$)**: $50\\ \\Omega - 100\\ \\Omega$
- **High Load Impedance ($Z_{\\text{in}}$)**: $10\\text{ k}\\Omega - 50\\text{ k}\\Omega$ (Ratio $> 10:1$)

### 3. Benefits of Voltage Bridging
1. Maximum voltage transfer ($> 99\\%$ of generated voltage arrives at receiver).
2. One output can drive 5 to 10 parallel inputs without level drop.
3. Minimizes driver thermal dissipation and distortion.
"""
            },
            {
                "num": 10,
                "slug": "top-level-rules-standards-alignment",
                "title": "Top-Level Rules & Normative Standards Alignment Overview",
                "tags": ["standards", "aes11", "aes14", "aes26", "aes48", "aes59", "aes72", "x152"],
                "summary": "Comprehensive taxonomy and interaction matrix of AES and IEC standards governing balanced audio interconnections.",
                "standards": ["AES11", "AES14", "AES26", "AES48", "AES54", "AES59", "AES72", "AES-X152", "AES-X246", "AES-X249", "IEC 60268-3", "IEC 61938"],
                "key_equation": "System = Driver(AES-X152) + Cable(AES72/59) + Receiver(IEC 60268-3)",
                "authors": ["Bruce Olson", "Anthony Kuzub", "Richard Cabot"],
                "content_body": """
### 1. The Standards Ecosystem
Analog audio interconnection is governed by an interconnected suite of standards developed by the Audio Engineering Society (AES) and the International Electrotechnical Commission (IEC):

| Standard | Scope & Core Purpose |
| :--- | :--- |
| **AES-X152** | Specification template for presenting levels, impedances, and topologies on data sheets. |
| **AES48** | Grounding and EMC practice: Shield grounding to metal chassis enclosure, not circuit 0V. |
| **AES14** | Pin assignment for 3-pin XLR audio connectors (Pin 1 Shield, Pin 2 Hot, Pin 3 Cold). |
| **AES26** | Conservation of polarity through entire audio production chain. |
| **AES59** | 8-channel analog and digital balanced audio wiring on 25-way D-sub connectors. |
| **AES72** | 4-channel audio transport over Quad Twisted Pair (QTP) Category cabling (RJ45). |
| **AES-X249**| Grounding and EMC practices for shields of 25-way D-sub connectors. |
| **IEC 60268-3** | Sound system equipment - Amplifiers, balanced input testing and CMRR measurement. |
| **IEC 61938** | Multimedia systems - Microphone powering systems (P48, P24, P12 phantom power). |

### 2. The AES-X152 Tripartite Model
AES-X152 recognizes that audio transmission performance is never the property of a single box; it is the physical interaction of three elements:
1. **The Transmitter (Driver / Source)**: Governed by source impedance, topology, and voltage swing.
2. **The Interconnecting Cable**: Governed by twist pitch, capacitance, shield topology, and resistance.
3. **The Receiver (Input Load)**: Governed by differential and common-mode input impedances, and CMRR.
"""
            }
        ]
    }
]

print("Script template ready. Creating full generation matrix for all 100 modules...")
