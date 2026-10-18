---
module_id: "MOD-059"
module_number: 59
title: "Radio-Frequency Interference (RFI) Filtering in Balanced Receiver Front-Ends"
part_number: 6
part_title: "Part 6: Receiver (Input Stage) Topologies"
slug: "rfi-filtering-in-balanced-receiver-front-ends"
tags: ["rfi-filter", "emc", "capacitors", "common-mode-choke"]
standards: ["AES-X152 Section 2", "AES48"]
key_equation: "f_{\text{corner\_diff}} = \frac{1}{2\pi * (2R) * C_{\text{diff}}} \approx 120\text{ kHz}; \quad f_{\text{corner\_cm}} \approx 800\text{ kHz}"
summary: "Design and component selection for passive differential and common-mode low-pass RFI filters at receiver input connectors."
authors: ["Jim Brown", "Dennis Bohn"]
revision: "2026.1"
---

# Module 059: Radio-Frequency Interference (RFI) Filtering in Balanced Receiver Front-Ends

> **Part 6**: Part 6: Receiver (Input Stage) Topologies  
> **Normative Standards**: `AES-X152 Section 2`, `AES48`  
> **Key Governing Equation**: `$f_{\text{corner\_diff}} = \frac{1}{2\pi * (2R) * C_{\text{diff}}} \approx 120\text{ kHz}; \quad f_{\text{corner\_cm}} \approx 800\text{ kHz}$`  
> **Lead Working Group Contributors**: Jim Brown, Dennis Bohn

---

## Executive Summary
Design and component selection for passive differential and common-mode low-pass RFI filters at receiver input connectors.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Adding capacitors to balanced input pins ruins audio transient response and high-frequency phase.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
All professional balanced audio inputs require passive low-pass RC filtering at the connector entrance to prevent Radio Frequency Interference (RFI) from cell phones, Wi-Fi, and switch-mode supplies from reaching semiconductor inputs. A properly engineered filter uses high-grade C0G/NP0 ceramic capacitors and low-value series resistors to establish a cutoff above 100 kHz, creating zero phase or amplitude effect within the 20 Hz - 20 kHz audio band.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{f_{\text{corner\_diff}} = \frac{1}{2\pi * (2R) * C_{\text{diff}}} \approx 120\text{ kHz}; \quad f_{\text{corner\_cm}} \approx 800\text{ kHz}}$$

### Detailed Parameter Analysis & Derivations
With R = 47 Ω and C_diff = 100 pF: f_diff = 1 / (2 * π * 94 * 100e-12) = 1.69 MHz. Attenuation at 20 kHz is <0.001 dB; attenuation at 900 MHz cell phone band is >45 dB.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       PRECISION RFI INPUT FILTER NETWORK                      |
|                                                                               |
|   Pin 2 (Hot)  ---[ 47 Ω ]---+---[ C_diff = 100 pF ]---+---> To Op-Amp +      |
|                              |                         |                      |
|                           [ C1 ]                    [ C2 ]                    |
|                              |                         |                      |
|   Pin 3 (Cold) ---[ 47 Ω ]---+-------------------------+---> To Op-Amp -      |
|                              |                                                |
|   Chassis Ground Shell ======+ (Direct Enclosure Bond)                        |
|   C1 = C2 = 470 pF C0G/NP0 (Matched to 1% to preserve HF CMRR!)               |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 2`
- **Cross-Referenced Standards**: `AES48`

AES-X152 Section 2 specifies mandatory high-frequency RF suppression requirements.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Filter components must be placed directly at connector pins.
2. Shunt common-mode capacitors to chassis enclosure, never circuit 0V.
3. Use C0G/NP0 dielectric ceramic capacitors to prevent distortion and preserve balance.

---

## 7. Self-Assessment & Review Questions
Q: Why must common-mode RFI filter capacitors (C1 and C2) be tightly matched in capacitance value?
A: Because any capacitance mismatch converts high-frequency common-mode RF noise into differential noise, degrading RF immunity.

---

### Module Navigation
- **Previous Module**: [Module 058: Common-Mode Voltage Window, Rail Headroom, and Clamping Protection](module-058-common-mode-voltage-window-and-rail-headroom.md)
- **Next Module**: [Module 060: Differential Input Capacitance Matching and High-Frequency CMRR](module-060-differential-input-capacitance-matching-cmrr.md)
- **Master Syllabus**: [Curriculum Index](README.md)
