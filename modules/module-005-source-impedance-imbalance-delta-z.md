---
module_id: "MOD-005"
module_number: 5
title: "Source Impedance Imbalance (ΔZs) and the 10-Ohm Standard Mismatch"
part_number: 1
part_title: "Part 1: Foundations & Core Principles"
slug: "source-impedance-imbalance-delta-z"
tags: ["source-impedance", "imbalance", "iec-test", "mismatch", "cmrr"]
standards: ["IEC 60268-3 Section 13.2", "AES-X152"]
key_equation: "\Delta Z_S = |Z_{\text{hot}} - Z_{\text{cold}}| = 10\ \Omega"
summary: "IEC 60268-3 standard testing with a 10-Ohm source impedance imbalance and its real-world implications."
authors: ["Bill Whitlock", "John Woodgate"]
revision: "2026.1"
---

# Module 005: Source Impedance Imbalance (ΔZs) and the 10-Ohm Standard Mismatch

> **Part 1**: Part 1: Foundations & Core Principles  
> **Normative Standards**: `IEC 60268-3 Section 13.2`, `AES-X152`  
> **Key Governing Equation**: `$\Delta Z_S = |Z_{\text{hot}} - Z_{\text{cold}}| = 10\ \Omega$`  
> **Lead Working Group Contributors**: Bill Whitlock, John Woodgate

---

## Executive Summary
IEC 60268-3 standard testing with a 10-Ohm source impedance imbalance and its real-world implications.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A receiver that exhibits 90 dB CMRR in a manufacturer test with 0 Ω source impedance will reject hum equally well in real studio setups.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Real-world signal sources never have perfectly matched output impedances. Cable resistance, connector corrosion, and driver component tolerances introduce an impedance imbalance ΔZs.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\Delta Z_S = |Z_{\text{hot}} - Z_{\text{cold}}| = 10\ \Omega}$$

### Detailed Parameter Analysis & Derivations
When connected to a receiver with common-mode input impedance Z_cm, a source imbalance ΔZs induces a differential error: CMRR_effective ≈ 20 * log10(Z_cm / ΔZs). For a standard difference amp where Z_cm is only 10 kΩ, a 10 Ω ΔZs degrades CMRR to 20 * log10(10,000 / 10) = 60 dB. If Z_cm is 2.5 kΩ, CMRR drops to 48 dB!

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       IEC 60268-3 10-OHM SOURCE IMBALANCE TEST                |
|                                                                               |
|   Generator (V_cm) ---+---[ Rs = 50 Ω ]---[ 10 Ω Mismatch ]---> Pin 2 (Hot)   |
|                       |                                                       |
|                       +---[ Rs = 50 Ω ]-------------------------> Pin 3 (Cold) |
|                                                                               |
|   Difference Amp CMRR drops from 80 dB down to 34 dB!                         |
|   InGenius Receiver CMRR remains >90 dB due to Bootstrapped Common-Mode Z!    |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `IEC 60268-3 Section 13.2`
- **Cross-Referenced Standards**: `AES-X152`

IEC 60268-3 Clause 13.2 mandates reporting CMRR with both matched source and an intentional 10 Ω imbalance.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. High common-mode input impedance (Z_cm) is essential to preserve CMRR against source mismatches.
2. Standard simple op-amp inputs fail the 10 Ω test catastrophically.
3. High-performance receivers maintain >80 dB CMRR even with a 10 Ω imbalance.

---

## 7. Self-Assessment & Review Questions
Q: Why does IEC 60268-3 mandate the 10-Ohm imbalance test?
A: Because real-world studio interconnects always suffer from connector contact resistance and driver component tolerances; 10 Ω represents a realistic worst-case field mismatch.

---

### Module Navigation
- **Previous Module**: [Module 004: Resistor Bridge Tolerances (5%, 1%, 0.1%, 0.01%) & CMRR Degradation](module-004-resistor-bridge-tolerances-cmrr.md)
- **Next Module**: [Module 006: Balanced vs Unbalanced Systems: Comparative Electrical Analysis](module-006-balanced-vs-unbalanced-systems.md)
- **Master Syllabus**: [Curriculum Index](README.md)
