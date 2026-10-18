---
module_id: "MOD-005"
module_number: 5
title: "Source Impedance Imbalance (ΔZs) and the 10-Ohm Standard Mismatch"
part_number: 1
part_title: "Part 1: Foundations & Core Principles"
slug: "source-impedance-imbalance-delta-z"
tags: ["source-impedance", "imbalance", "iec-test", "mismatch", "cmrr"]
standards: ["IEC 60268-3 Section 13.2", "AES-X152"]
key_equation: "Delta_Z = |Z_hot - Z_cold| = 10 Ohms"
summary: "IEC 60268-3 standard testing with a 10-Ohm source impedance imbalance and its real-world implications."
authors: ["Bill Whitlock", "John Woodgate"]
revision: "2026.1"
---

# Module 005: Source Impedance Imbalance (ΔZs) and the 10-Ohm Standard Mismatch

> **Part 1**: Part 1: Foundations & Core Principles  
> **Applicable Standards**: `IEC 60268-3 Section 13.2, AES-X152`  
> **Key Equation**: `$Delta_Z = |Z_hot - Z_cold| = 10 Ohms$`  
> **Primary Authors / Reference Contributors**: Bill Whitlock, John Woodgate

---

## Executive Summary
IEC 60268-3 standard testing with a 10-Ohm source impedance imbalance and its real-world implications.

Understanding this topic is critical for audio hardware designers, studio facility integrators, and sound system engineers. Compliance with AES standards guarantees predictable, hum-free, high-fidelity interconnection across heterogeneous professional audio devices.

---

## 1. Industry Misconceptions & The Real-World Problem
A receiver that exhibits 90 dB CMRR in a manufacturer test with 0 Ω source impedance will reject hum equally well in real studio setups.

Many published tutorials and outdated manuals perpetuate oversimplified models that fail in modern electromagnetic environments filled with switch-mode power supplies, cell towers, and variable-frequency motor drives. 

---

## 2. Theoretical & Physical Foundations
Real-world signal sources never have perfectly matched output impedances. Cable resistance, connector corrosion, and driver component tolerances introduce an impedance imbalance ΔZs.

Balanced analog audio interconnections form an electromagnetic transmission system. Signal currents must circulate exclusively within the dedicated differential signal path, while stray electrostatic and electromagnetic field currents must be guided harmlessly away from sensitive internal circuit nodes into the equipotential metal chassis shield enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this circuit node is governed by:

$$\mathbf{Delta_Z = |Z_hot - Z_cold| = 10 Ohms}$$

### Parameter Analysis & Derivation:
When connected to a receiver with common-mode input impedance Z_cm, a source imbalance ΔZs induces a differential error: CMRR_effective ≈ 20 * log10(Z_cm / ΔZs). For a standard difference amp where Z_cm is only 10 kΩ, a 10 Ω ΔZs degrades CMRR to 20 * log10(10,000 / 10) = 60 dB. If Z_cm is 2.5 kΩ, CMRR drops to 48 dB!

When component values or parasitic capacitances drift, common-mode rejection is degraded proportionally. Maintaining tight manufacturing tolerances (0.1% or better on critical bridge components) is mandatory to satisfy AES-X152 datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography
```
+-------------------------------------------------------------------------------+
|                       AES-X152 REFERENCE CIRCUIT MODEL                        |
|                                                                               |
|  [Transmitter Stage] --------(Pin 2 / Hot)--------> [Receiver Differential]   |
|         |                                                   |                 |
|         +--------------------(Pin 3 / Cold)-------> [Subtractor / Op-Amp]     |
|                                                                               |
|  [Chassis Ground Shell] ====(Pin 1 / Shield)======> [Chassis Ground Shell]    |
|       (Direct Enclosure Bond - ZERO PCB Trace Connection - AES48)             |
+-------------------------------------------------------------------------------+
```

Balanced source with 10 Ω mismatch resistor inserted in Pin 2; differential input receiver showing altered voltage division.

---

## 5. Normative Standards Alignment
This module aligns directly with the following published and working-group standards:
- **Primary Standard**: `IEC 60268-3 Section 13.2`
- **Harmonized Standards**: `AES-X152`

IEC 60268-3 Clause 13.2 mandates reporting CMRR with both matched source and an intentional 10 Ω imbalance.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. High common-mode input impedance (Z_cm) is essential to preserve CMRR against source mismatches.
2. Standard simple op-amp inputs fail the 10 Ω test catastrophically.
3. High-performance receivers (transformers or InGenius ICs) maintain >80 dB CMRR even with a 10 Ω imbalance.

---

## 7. Self-Assessment & Review Questions
Q: Why does IEC 60268-3 mandate the 10-Ohm imbalance test?
A: Because real-world studio interconnects always suffer from connector contact resistance and driver component tolerances; 10 Ω represents a realistic worst-case field mismatch.

---

### Module Navigation
- **Previous Module**: [Module 004](module-004-*.md)
- **Next Module**: [Module 006](module-006-*.md)
- **Master Syllabus**: [Curriculum Index](README.md)
