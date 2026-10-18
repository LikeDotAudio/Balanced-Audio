---
module_id: "MOD-002"
module_number: 2
title: "Common-Mode Rejection Ratio (CMRR) Mathematical Foundations"
part_number: 1
part_title: "Part 1: Foundations & Core Principles"
slug: "cmrr-mathematical-foundations"
tags: ["cmrr", "mathematics", "rejection", "differential-gain", "common-mode"]
standards: ["IEC 60268-3 Section 13.2", "AES-X152"]
key_equation: "\text{CMRR}_{\text{dB}} = 20 * \log_{10}\left|\frac{A_{\text{diff}}}{A_{\text{cm}}}\right|"
summary: "Mathematical derivation of CMRR, common-mode gain, differential gain, and logarithmic decibel scaling."
authors: ["Bill Whitlock", "Jim Brown"]
revision: "2026.1"
---

# Module 002: Common-Mode Rejection Ratio (CMRR) Mathematical Foundations

> **Part 1**: Part 1: Foundations & Core Principles  
> **Normative Standards**: `IEC 60268-3 Section 13.2`, `AES-X152`  
> **Key Governing Equation**: `$\text{CMRR}_{\text{dB}} = 20 * \log_{10}\left|\frac{A_{\text{diff}}}{A_{\text{cm}}}\right|$`  
> **Lead Working Group Contributors**: Bill Whitlock, Jim Brown

---

## Executive Summary
Mathematical derivation of CMRR, common-mode gain, differential gain, and logarithmic decibel scaling.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Engineers often assume a receiver with 90 dB CMRR in a datasheet will provide 90 dB hum rejection in a real installation.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
CMRR is the ratio of differential voltage gain (Ad) to common-mode voltage gain (Acm). V_out = Ad * V_diff + Acm * V_cm. Decibel representation: CMRR_dB = 20 * log10(|Ad / Acm|).

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{CMRR}_{\text{dB}} = 20 * \log_{10}\left|\frac{A_{\text{diff}}}{A_{\text{cm}}}\right|}$$

### Detailed Parameter Analysis & Derivations
For a receiver with Ad = 1.0 (0 dB) and CMRR = 80 dB, Acm = 0.0001 (-80 dB). A 10 V common-mode hum voltage produces only 1 mV of error at the output.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       CMRR MEASUREMENT TEST RIG (IEC 60268-3)                |
|                                                                               |
|   Audio Gen (10 V CM) ---+----[ Rs1 = 50 Ω ]----> Pin 2 (+ Input)             |
|                          |                                   \                |
|                          +----[ Rs2 = 50 Ω ]----> Pin 3 (- Input) \ [Diff Amp]|
|                                                                     |--> Vout |
|   Chassis Ground Shell -------------------------> Pin 1 (Shield)   /          |
|                                                                               |
|   Acm = Vout / 10 V;   CMRR = 20 * log10(1.0 / Acm)                           |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `IEC 60268-3 Section 13.2`
- **Cross-Referenced Standards**: `AES-X152`

IEC 60268-3 Section 13.2 specifies measurement methodology with balanced and unbalanced generator source impedances.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. CMRR must be specified across the full audio bandwidth (20 Hz - 20 kHz), not just at 1 kHz.
2. Real-world CMRR is degraded by source impedance imbalances.
3. 60 dB CMRR reduces hum by 1,000; 80 dB reduces hum by 10,000.

---

## 7. Self-Assessment & Review Questions
Q: What output voltage results from a 5.0 V common-mode hum signal entering a receiver with 60 dB CMRR and unity gain?
A: 60 dB corresponds to an attenuation factor of 1,000 (1/1000). V_error = 5.0 V / 1000 = 5.0 mV.

---

### Module Navigation
- **Previous Module**: [Module 001: The Golden Rule of Balanced Audio (Impedance Symmetry vs Voltage Equality)](module-001-golden-rule-of-balance.md)
- **Next Module**: [Module 003: Differential Signaling Physics & Inherent Noise Cancellation](module-003-differential-signaling-physics.md)
- **Master Syllabus**: [Curriculum Index](README.md)
