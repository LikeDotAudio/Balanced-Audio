---
module_id: "MOD-002"
module_number: 2
title: "Common-Mode Rejection Ratio (CMRR) Mathematical Foundations"
part_number: 1
part_title: "Part 1: Foundations & Core Principles"
slug: "cmrr-mathematical-foundations"
tags: ["cmrr", "mathematics", "rejection", "differential-gain", "common-mode"]
standards: ["IEC 60268-3 Section 13.2", "AES-X152"]
key_equation: "CMRR = 20 * log10(|A_diff / A_cm|)"
summary: "Mathematical derivation of CMRR, common-mode gain, differential gain, and logarithmic decibel scaling."
authors: ["Bill Whitlock", "Jim Brown"]
revision: "2026.1"
---

# Module 002: Common-Mode Rejection Ratio (CMRR) Mathematical Foundations

> **Part 1**: Part 1: Foundations & Core Principles  
> **Applicable Standards**: `IEC 60268-3 Section 13.2, AES-X152`  
> **Key Equation**: `$CMRR = 20 * log10(|A_diff / A_cm|)$`  
> **Primary Authors / Reference Contributors**: Bill Whitlock, Jim Brown

---

## Executive Summary
Mathematical derivation of CMRR, common-mode gain, differential gain, and logarithmic decibel scaling.

Understanding this topic is critical for audio hardware designers, studio facility integrators, and sound system engineers. Compliance with AES standards guarantees predictable, hum-free, high-fidelity interconnection across heterogeneous professional audio devices.

---

## 1. Industry Misconceptions & The Real-World Problem
Engineers often assume a receiver with 90 dB CMRR in a datasheet will provide 90 dB hum rejection in a real installation.

Many published tutorials and outdated manuals perpetuate oversimplified models that fail in modern electromagnetic environments filled with switch-mode power supplies, cell towers, and variable-frequency motor drives. 

---

## 2. Theoretical & Physical Foundations
CMRR is the ratio of differential voltage gain (Ad) to common-mode voltage gain (Acm). V_out = Ad * V_diff + Acm * V_cm. Decibel representation: CMRR_dB = 20 * log10(|Ad / Acm|).

Balanced analog audio interconnections form an electromagnetic transmission system. Signal currents must circulate exclusively within the dedicated differential signal path, while stray electrostatic and electromagnetic field currents must be guided harmlessly away from sensitive internal circuit nodes into the equipotential metal chassis shield enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this circuit node is governed by:

$$\mathbf{CMRR = 20 * log10(|A_diff / A_cm|)}$$

### Parameter Analysis & Derivation:
For a receiver with Ad = 1.0 (0 dB) and CMRR = 80 dB, Acm = 0.0001 (-80 dB). A 10 V common-mode hum voltage produces only 1 mV of error at the output.

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

CMRR Test Circuit: Signal generator tied in common to both Pin 2 and Pin 3 simultaneously with shield grounded. Output measured on precision AC voltmeter.

---

## 5. Normative Standards Alignment
This module aligns directly with the following published and working-group standards:
- **Primary Standard**: `IEC 60268-3 Section 13.2`
- **Harmonized Standards**: `AES-X152`

IEC 60268-3 Section 13.2 specifies measurement methodology with balanced and unbalanced generator source impedances.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. CMRR must be specified across the full audio bandwidth (20 Hz - 20 kHz), not just at 1 kHz.
2. Real-world CMRR is degraded by source impedance imbalances.
3. 60 dB CMRR reduces hum by a factor of 1,000; 80 dB reduces hum by 10,000.

---

## 7. Self-Assessment & Review Questions
Q: What output voltage results from a 5.0 V common-mode hum signal entering a receiver with 60 dB CMRR and unity gain?
A: 60 dB corresponds to an attenuation factor of 1,000 (1/1000). V_error = 5.0 V / 1000 = 5.0 mV.

---

### Module Navigation
- **Previous Module**: [Module 001](module-001-*.md)
- **Next Module**: [Module 003](module-003-*.md)
- **Master Syllabus**: [Curriculum Index](README.md)
