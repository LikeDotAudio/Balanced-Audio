---
module_id: "MOD-008"
module_number: 8
title: "Audio Bandwidth, Slew Rate, and High-Frequency Noise Coupling"
part_number: 1
part_title: "Part 1: Foundations & Core Principles"
slug: "audio-bandwidth-slew-rate-noise"
tags: ["bandwidth", "slew-rate", "capacitance", "filters", "ultrasonic"]
standards: ["AES-X152 Section 2", "IEC 60268-3"]
key_equation: "\text{Slew\_Rate} = 2 * \pi * f_{\max} * V_{\text{peak}}"
summary: "Interactions between amplifier slew rate, cable capacitance, RF ingress, and ultrasonic common-mode noise."
authors: ["Richard Cabot", "Dennis Bohn"]
revision: "2026.1"
---

# Module 008: Audio Bandwidth, Slew Rate, and High-Frequency Noise Coupling

> **Part 1**: Part 1: Foundations & Core Principles  
> **Normative Standards**: `AES-X152 Section 2`, `IEC 60268-3`  
> **Key Governing Equation**: `$\text{Slew\_Rate} = 2 * \pi * f_{\max} * V_{\text{peak}}$`  
> **Lead Working Group Contributors**: Richard Cabot, Dennis Bohn

---

## Executive Summary
Interactions between amplifier slew rate, cable capacitance, RF ingress, and ultrasonic common-mode noise.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Audio input stages should have unlimited frequency bandwidth (up to 10 MHz) to preserve phase linearity.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Unconstrained bandwidth allows high-frequency RF signals (cell phones, switch-mode power supplies, AM/FM broadcasts) into active semiconductors. When input signal rise times exceed the op-amp's slew rate capability, the stage enters nonlinear slewing, demodulating RF into audible buzz and intermodulation products.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{Slew\_Rate} = 2 * \pi * f_{\max} * V_{\text{peak}}}$$

### Detailed Parameter Analysis & Derivations
Required Slew Rate: SR = 2 * π * f * V_peak. For a 20 kHz signal at +24 dBu (17.4 V peak): SR = 2 * 3.1415 * 20,000 * 17.4 ≈ 2.19 V/µs. An ultrasonic RF spike at 2 MHz requires over 200 V/µs, driving standard op-amps into total saturation.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       INPUT RFI FILTER ATTENUATION NETWORK                    |
|                                                                               |
|   Pin 2 ----[ Ferrite Bead ]---+---[ 47 Ω ]---+---> To Active Input +         |
|                                |              |                               |
|                              [ C1 ]         [ C_diff = 100 pF ]               |
|                                |              |                               |
|   Pin 3 ----[ Ferrite Bead ]---+---[ 47 Ω ]---+---> To Active Input -         |
|                                |                                              |
|                              [ C2 ]                                           |
|                                |                                              |
|   Chassis Ground (Direct) -----+                                              |
|   C1, C2 = 470 pF COG/NP0 (Common-Mode RF Short to Chassis)                   |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 2`
- **Cross-Referenced Standards**: `IEC 60268-3`

AES-X152 Section 2 covers bandwidth disclosure and input filtering recommendations.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Limit audio receiver bandwidth above 100 kHz with passive low-pass filters.
2. Filter capacitors must be located directly at connector pins.
3. Common-mode choke beads prevent semiconductor RF demodulation.

---

## 7. Self-Assessment & Review Questions
Q: What is the primary audible symptom of RF demodulation in a balanced preamplifier input?
A: Audible buzz, ticks, radio broadcasts, or cell phone GSM 'buzz-buzz-buzz' pulses caused by nonlinear rectification in the input op-amp transistors.

---

### Module Navigation
- **Previous Module**: [Module 007: Common-Mode to Differential-Mode Conversion Mechanisms](module-007-common-mode-to-differential-mode-conversion.md)
- **Next Module**: [Module 009: The 600-Ohm Power Transfer Legacy vs Modern Voltage Bridging](module-009-600-ohm-legacy-vs-modern-bridging.md)
- **Master Syllabus**: [Curriculum Index](README.md)
