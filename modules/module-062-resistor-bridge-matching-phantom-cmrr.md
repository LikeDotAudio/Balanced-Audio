---
module_id: "MOD-062"
module_number: 62
title: "6.81 kΩ Resistor Bridge Matching and Phantom-Induced CMRR Loss"
part_number: 7
part_title: "Part 7: Phantom Power & Transducer Interfacing"
slug: "resistor-bridge-matching-phantom-cmrr"
tags: ["phantom-resistors", "6.81k", "bridge-matching", "cmrr-degradation"]
standards: ["IEC 61938", "AES-X152"]
key_equation: "\Delta R = |R_1 - R_2| < 6.8\ \Omega \quad (0.1\% \text{ match required for } >80\text{ dB CMRR})"
summary: "How loose tolerance phantom feed resistors destroy preamplifier common-mode rejection and inject power supply ripple."
authors: ["Bill Whitlock", "Jim Brown"]
revision: "2026.1"
---

# Module 062: 6.81 kΩ Resistor Bridge Matching and Phantom-Induced CMRR Loss

> **Part 7**: Part 7: Phantom Power & Transducer Interfacing  
> **Normative Standards**: `IEC 61938`, `AES-X152`  
> **Key Governing Equation**: `$\Delta R = |R_1 - R_2| < 6.8\ \Omega \quad (0.1\% \text{ match required for } >80\text{ dB CMRR})$`  
> **Lead Working Group Contributors**: Bill Whitlock, Jim Brown

---

## Executive Summary
How loose tolerance phantom feed resistors destroy preamplifier common-mode rejection and inject power supply ripple.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Standard 1% 6.81 kΩ resistors are good enough for phantom power circuits.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
The two 6.81 kΩ phantom feed resistors sit directly in parallel with the audio signal conductors to AC ground. If R1 and R2 are not precisely matched, any ripple or noise on the +48V phantom power rail is converted into a differential audio buzz. Furthermore, a resistance mismatch creates an immediate source impedance imbalance, destroying the preamp's CMRR for external EMI.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\Delta R = |R_1 - R_2| < 6.8\ \Omega \quad (0.1\% \text{ match required for } >80\text{ dB CMRR})}$$

### Detailed Parameter Analysis & Derivations
A 1% mismatch between 6.81 kΩ resistors yields ΔR = 68.1 Ω. This massive imbalance degrades preamp CMRR from 85 dB down to less than 45 dB! Power supply rejection ratio (PSRR) collapses, causing audible 120 Hz hum from the phantom supply.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

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
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `IEC 61938`
- **Cross-Referenced Standards**: `AES-X152`

IEC 61938 Clause 6 mandates 0.1% resistor pair matching for P48 supplies.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Always specify 0.1% or hand-matched metal film resistors for phantom power.
2. Phantom supply ripple must be <0.5 mV RMS.
3. Resistor mismatch directly converts phantom ripple into differential hum.

---

## 7. Self-Assessment & Review Questions
Q: What is the maximum acceptable tolerance mismatch between the two 6.81 kΩ phantom power feed resistors to preserve high CMRR?
A: 0.1% (less than 6.8 Ω difference between resistors).

---

### Module Navigation
- **Previous Module**: [Module 061: IEC 61938 Phantom Power Standards: P48, P24, and P12 Specifications](module-061-iec-61938-phantom-power-standards.md)
- **Next Module**: [Module 063: The Phantom Menace: Turn-On Transients & Mic Preamp Input Destruction](module-063-phantom-menace-turn-on-transients.md)
- **Master Syllabus**: [Curriculum Index](README.md)
