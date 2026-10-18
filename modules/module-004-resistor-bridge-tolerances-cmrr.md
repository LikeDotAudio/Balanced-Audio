---
module_id: "MOD-004"
module_number: 4
title: "Resistor Bridge Tolerances (5%, 1%, 0.1%, 0.01%) & CMRR Degradation"
part_number: 1
part_title: "Part 1: Foundations & Core Principles"
slug: "resistor-bridge-tolerances-cmrr"
tags: ["resistors", "tolerance", "difference-amplifier", "bridge", "cmrr"]
standards: ["AES-X152 Section 6.7", "IEC 60268-3"]
key_equation: "\text{CMRR}_{\text{worst-case}} \approx 20 * \log_{10}\left(\frac{1 + A_d}{4 * \text{Tolerance}}\right)"
summary: "Impact of resistor bridge matching in single op-amp differential input stages on common-mode rejection."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 004: Resistor Bridge Tolerances (5%, 1%, 0.1%, 0.01%) & CMRR Degradation

> **Part 1**: Part 1: Foundations & Core Principles  
> **Normative Standards**: `AES-X152 Section 6.7`, `IEC 60268-3`  
> **Key Governing Equation**: `$\text{CMRR}_{\text{worst-case}} \approx 20 * \log_{10}\left(\frac{1 + A_d}{4 * \text{Tolerance}}\right)$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Impact of resistor bridge matching in single op-amp differential input stages on common-mode rejection.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Using standard 1% metal film resistors in a DIY balanced input stage is sufficient for professional broadcast performance.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
The classic 4-resistor difference amplifier relies on exact ratio matching: R2/R1 = R4/R3. Any deviation causes common-mode gain to skyrocket, destroying CMRR.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{CMRR}_{\text{worst-case}} \approx 20 * \log_{10}\left(\frac{1 + A_d}{4 * \text{Tolerance}}\right)}$$

### Detailed Parameter Analysis & Derivations
Worst-case CMRR for unity gain: CMRR = 20 * log10(1 / (4 * tol)). For 1% (tol = 0.01): CMRR ≈ 20 * log10(25) = 28 to 34 dB worst case, and ~44 dB nominal. 0.1% yields ~64 dB. 0.01% yields ~84 dB.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       DISCRETE OP-AMP DIFFERENCE AMPLIFIER                    |
|                                                                               |
|   Pin 2 (Hot)  ----[ R1 = 10k (1%) ]----+------------- - \                    |
|                                         |    R2           \                   |
|                                         +--[ 10k (1%) ]-+  \                  |
|                                                         |   |--- Output       |
|   Pin 3 (Cold) ----[ R3 = 10k (1%) ]----+               |  /                  |
|                                         |    R4         | /                   |
|                                         +--[ 10k (1%) ]-+ +                   |
|                                              |                                |
|                                             0V                                |
|   1% Tolerance Mismatch Limits Worst-Case CMRR to only ~40 dB!                |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.7`
- **Cross-Referenced Standards**: `IEC 60268-3`

AES-X152 Section 6.7 highlights component tolerance as the primary limiter of discrete op-amp CMRR.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. 1% resistors limit difference amplifier CMRR to ~40-46 dB.
2. Laser-trimmed thin-film integrated circuits (e.g. THAT 1200, INA134) achieve 0.005% matching for >90 dB CMRR.
3. Discrete op-amp receivers require manual trimming potentiometers.

---

## 7. Self-Assessment & Review Questions
Q: What maximum CMRR can you guarantee using unselected 5% carbon film resistors in a difference amplifier?
A: Only approximately 20 dB to 26 dB, which is entirely inadequate for eliminating 60 Hz hum.

---

### Module Navigation
- **Previous Module**: [Module 003: Differential Signaling Physics & Inherent Noise Cancellation](module-003-differential-signaling-physics.md)
- **Next Module**: [Module 005: Source Impedance Imbalance (ΔZs) and the 10-Ohm Standard Mismatch](module-005-source-impedance-imbalance-delta-z.md)
- **Master Syllabus**: [Curriculum Index](README.md)
