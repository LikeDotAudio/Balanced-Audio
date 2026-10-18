---
module_id: "MOD-041"
module_number: 41
title: "Cable Electrical Parameters: Inductance, Capacitance, Resistance (LCR)"
part_number: 5
part_title: "Part 5: Cable Transmission Medium & Connector Standards"
slug: "cable-lcr-electrical-parameters"
tags: ["cable-parameters", "lcr", "capacitance", "inductance", "resistance"]
standards: ["AES-X152 Section 7", "AES72"]
key_equation: "Z_0 = \sqrt{\frac{R + j\omega L}{G + j\omega C}} \approx \sqrt{\frac{L}{C}} \quad \text{@ RF}"
summary: "Distributed transmission parameters of shielded twisted pair audio cables: loop resistance, mutual inductance, and dielectric capacitance."
authors: ["Bill Whitlock", "Anthony Kuzub"]
revision: "2026.1"
---

# Module 041: Cable Electrical Parameters: Inductance, Capacitance, Resistance (LCR)

> **Part 5**: Part 5: Cable Transmission Medium & Connector Standards  
> **Normative Standards**: `AES-X152 Section 7`, `AES72`  
> **Key Governing Equation**: `$Z_0 = \sqrt{\frac{R + j\omega L}{G + j\omega C}} \approx \sqrt{\frac{L}{C}} \quad \text{@ RF}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Anthony Kuzub

---

## Executive Summary
Distributed transmission parameters of shielded twisted pair audio cables: loop resistance, mutual inductance, and dielectric capacitance.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Audio cables are simple zero-loss conductors that have no electrical effect on the signal.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Every physical audio cable possesses distributed electrical parameters per unit length: series loop resistance (R in Ω/m), series inductance (L in µH/m), shunt capacitance (C in pF/m), and dielectric conductance (G in S/m). At audio frequencies, series resistance and shunt capacitance form a distributed low-pass RC ladder filter that interacts dynamically with source and load impedances.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{Z_0 = \sqrt{\frac{R + j\omega L}{G + j\omega C}} \approx \sqrt{\frac{L}{C}} \quad \text{@ RF}}$$

### Detailed Parameter Analysis & Derivations
Typical balanced audio cable (e.g. Belden 8412 or Canare L-2T2S): R ≈ 0.08 Ω/m loop resistance; L ≈ 0.6 µH/m; C ≈ 100 pF/m core-to-core, and 170 pF/m core-to-shield.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       DISTRIBUTED CABLE LCR MODEL                             |
|                                                                               |
|   Pin 2 ----[ R/2 ]---( L/2 )---+---[ R/2 ]---( L/2 )---+---> Pin 2 (Out)     |
|                                 |                       |                     |
|                               [ C_cc ]                [ C_cc ]                |
|                                 |                       |                     |
|   Pin 3 ----[ R/2 ]---( L/2 )---+---[ R/2 ]---( L/2 )---+---> Pin 3 (Out)     |
|                                 |                       |                     |
|                               [ C_cs ]                [ C_cs ]                |
|                                 v                       v                     |
|   Shield ====================================================> Shield (Pin 1) |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 7`
- **Cross-Referenced Standards**: `AES72`

AES-X152 Section 7 mandates standardized reporting of cable L, C, and R per meter.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Capacitance is the primary limiter of high-frequency bandwidth.
2. Low-capacitance cable (<70 pF/m) preserves treble on long runs.
3. Inductance is negligible at audio frequencies below 20 kHz.

---

## 7. Self-Assessment & Review Questions
Q: Which distributed electrical parameter of an audio cable has the largest impact on high-frequency roll-off at audio frequencies?
A: Shunt capacitance (core-to-core and core-to-shield capacitance).

---

### Module Navigation
- **Previous Module**: [Module 040: Unbalanced Single-Ended Outputs (RCA & TS 1/4") & Driver Load Driving](module-040-unbalanced-single-ended-outputs.md)
- **Next Module**: [Module 042: Core-to-Core vs Core-to-Shield Distributed Capacitances](module-042-core-to-core-vs-core-to-shield-capacitance.md)
- **Master Syllabus**: [Curriculum Index](README.md)
