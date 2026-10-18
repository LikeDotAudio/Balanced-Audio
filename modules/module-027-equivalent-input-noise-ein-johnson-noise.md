---
module_id: "MOD-027"
module_number: 27
title: "Equivalent Input Noise (EIN) and Thermal Johnson-Nyquist Noise Limits"
part_number: 3
part_title: "Part 3: Interconnection Levels & Dynamic Range"
slug: "equivalent-input-noise-ein-johnson-noise"
tags: ["ein", "johnson-noise", "thermal-limit", "preamps", "physics"]
standards: ["AES-X152 Section 2", "IEC 60268-3"]
key_equation: "V_{\text{thermal}} = \sqrt{4 * k_B * T * B * R}"
summary: "Physics of Johnson-Nyquist thermal noise, theoretical limits of preamplification, and calculating EIN."
authors: ["Richard Cabot", "Bill Whitlock"]
revision: "2026.1"
---

# Module 027: Equivalent Input Noise (EIN) and Thermal Johnson-Nyquist Noise Limits

> **Part 3**: Part 3: Interconnection Levels & Dynamic Range  
> **Normative Standards**: `AES-X152 Section 2`, `IEC 60268-3`  
> **Key Governing Equation**: `$V_{\text{thermal}} = \sqrt{4 * k_B * T * B * R}$`  
> **Lead Working Group Contributors**: Richard Cabot, Bill Whitlock

---

## Executive Summary
Physics of Johnson-Nyquist thermal noise, theoretical limits of preamplification, and calculating EIN.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A premium preamp manufacturer can build a preamp with an EIN of -140 dBu for a 150 Ω mic.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Thermal agitation of electrons inside any physical resistor creates thermal noise (Johnson-Nyquist noise). A 150 Ω resistor at room temperature (295 K) over a 20 kHz audio bandwidth produces a fundamental thermal noise floor of -130.8 dBu. No preamplifier on Earth can have an EIN lower than this physical limit without cryogenic cooling!

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{V_{\text{thermal}} = \sqrt{4 * k_B * T * B * R}}$$

### Detailed Parameter Analysis & Derivations
V_n = sqrt(4 * 1.38e-23 * 295 * 20000 * 150) = 0.22 µV RMS = -130.8 dBu. A preamp with an EIN of -128 dBu is within 2.8 dB of theoretical perfection.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       JOHNSON-NYQUIST THERMAL NOISE LIMIT                     |
|                                                                               |
|   150 Ω Resistor (Mic Coil) ====> [ Theoretical Limit: -130.8 dBu ]          |
|                                              |                                |
|                                   [ Active Preamp Noise ]                     |
|                                              |                                |
|                                   [ Real-World EIN: -128.5 dBu ]              |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 2`
- **Cross-Referenced Standards**: `IEC 60268-3`

IEC 60268-3 Section 14 defines EIN measurement with a 150 Ω termination across 20 Hz - 20 kHz.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Theoretical noise limit for a 150 Ω mic is -130.8 dBu at room temperature.
2. EIN specifications must include termination resistance and bandwidth.
3. Preamp EIN below -128 dBu represents world-class performance.

---

## 7. Self-Assessment & Review Questions
Q: What is the lowest possible noise floor (EIN) for a 150 Ω microphone at room temperature over a 20 kHz bandwidth?
A: -130.8 dBu.

---

### Module Navigation
- **Previous Module**: [Module 026: Decibel Systems in Pro Audio: dBu, dBV, dBm, dBFS, and dBSPL](module-026-decibel-systems-in-pro-audio.md)
- **Next Module**: [Module 028: Signal-to-Noise Ratio (SNR) vs Total Dynamic Range (DNR)](module-028-snr-vs-dynamic-range-dnr.md)
- **Master Syllabus**: [Curriculum Index](README.md)
