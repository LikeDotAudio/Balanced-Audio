---
module_id: "MOD-060"
module_number: 60
title: "Differential Input Capacitance Matching and High-Frequency CMRR"
part_number: 6
part_title: "Part 6: Receiver (Input Stage) Topologies"
slug: "differential-input-capacitance-matching-cmrr"
tags: ["capacitance-matching", "c0g-np0", "hf-cmrr", "pcb-layout"]
standards: ["AES-X152 Section 3", "IEC 60268-3"]
key_equation: "\Delta C_{\text{in}} = |C_{\text{pin2-gnd}} - C_{\text{pin3-gnd}}| < 2\text{ pF for } >60\text{ dB CMRR @ 20 kHz}"
summary: "Impact of printed circuit board stray capacitance and component dielectric tolerances on high-frequency common-mode rejection."
authors: ["Bill Whitlock", "Richard Cabot"]
revision: "2026.1"
---

# Module 060: Differential Input Capacitance Matching and High-Frequency CMRR

> **Part 6**: Part 6: Receiver (Input Stage) Topologies  
> **Normative Standards**: `AES-X152 Section 3`, `IEC 60268-3`  
> **Key Governing Equation**: `$\Delta C_{\text{in}} = |C_{\text{pin2-gnd}} - C_{\text{pin3-gnd}}| < 2\text{ pF for } >60\text{ dB CMRR @ 20 kHz}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Richard Cabot

---

## Executive Summary
Impact of printed circuit board stray capacitance and component dielectric tolerances on high-frequency common-mode rejection.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
If a receiver has 90 dB CMRR at 60 Hz, it will have 90 dB CMRR at 20 kHz.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
While low-frequency CMRR is governed by resistor matching, high-frequency CMRR (1 kHz to 20 kHz) is governed almost entirely by reactive capacitance matching between the two legs to ground. Because capacitive reactance decreases inversely with frequency (X_c = 1 / 2πfC), even a 2 pF difference in PCB trace capacitance creates a severe impedance mismatch at 20 kHz, causing high-frequency CMRR to collapse from 90 dB down to 40 dB.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\Delta C_{\text{in}} = |C_{\text{pin2-gnd}} - C_{\text{pin3-gnd}}| < 2\text{ pF for } >60\text{ dB CMRR @ 20 kHz}}$$

### Detailed Parameter Analysis & Derivations
At 20 kHz, reactance of 100 pF is X_c = 79.5 kΩ. A 5% tolerance error (5 pF) creates a ΔX_c = 4.1 kΩ mismatch, destroying common-mode rejection for high-frequency buzz harmonics and RF hash.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       HIGH-FREQUENCY CMRR CAPACITIVE ROLL-OFF                 |
|                                                                               |
|   60 Hz Power Hum:      CMRR = 90 dB (Governed by 0.01% Resistor Matching)   |
|   1 kHz Audio:          CMRR = 85 dB                                          |
|   10 kHz Sibilance:     CMRR = 65 dB (Stray Capacitance takes over!)          |
|   20 kHz Treble Limit:  CMRR = 50 dB (2 pF PCB Layout Mismatch limits CMRR)  |
|                                                                               |
|   SYMMETRICAL PCB TRACE LAYOUT IS ESSENTIAL FOR HIGH-FREQUENCY BALANCE!       |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 3`
- **Cross-Referenced Standards**: `IEC 60268-3`

AES-X152 Section 3 mandates plotting CMRR curves across 20 Hz to 20 kHz.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Symmetrical PCB routing is required for Pin 2 and Pin 3 traces.
2. Use 1% C0G/NP0 capacitors for all input RF networks.
3. Guard traces and ground plane cutouts prevent unequal stray capacitance.

---

## 7. Self-Assessment & Review Questions
Q: What circuit parameter dominates the degradation of CMRR at 20 kHz compared to 60 Hz?
A: Stray capacitance imbalance (ΔC) between the two signal conductors and ground.

---

### Module Navigation
- **Previous Module**: [Module 059: Radio-Frequency Interference (RFI) Filtering in Balanced Receiver Front-Ends](module-059-rfi-filtering-in-balanced-receiver-front-ends.md)
- **Next Module**: [Module 061: IEC 61938 Phantom Power Standards: P48, P24, and P12 Specifications](module-061-iec-61938-phantom-power-standards.md)
- **Master Syllabus**: [Curriculum Index](README.md)
