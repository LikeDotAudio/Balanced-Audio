---
module_id: "MOD-056"
module_number: 56
title: "High Common-Mode Impedance Receivers: InGenius & THAT 1200 Architecture"
part_number: 6
part_title: "Part 6: Receiver (Input Stage) Topologies"
slug: "high-cm-impedance-receivers-ingenius-that1200"
tags: ["ingenius", "that1200", "bootstrapping", "cmrr", "whitlock-patent"]
standards: ["US Patent 5,568,561", "AES-X152"]
key_equation: "Z_{\text{cm\_bootstrapped}} > 10\text{ M}\Omega \quad \text{across the full audio band}"
summary: "Bill Whitlock's patented InGenius input architecture (THAT 1200 series): active common-mode bootstrapping achieving transformer-grade CMRR."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 056: High Common-Mode Impedance Receivers: InGenius & THAT 1200 Architecture

> **Part 6**: Part 6: Receiver (Input Stage) Topologies  
> **Normative Standards**: `US Patent 5,568,561`, `AES-X152`  
> **Key Governing Equation**: `$Z_{\text{cm\_bootstrapped}} > 10\text{ M}\Omega \quad \text{across the full audio band}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Bill Whitlock's patented InGenius input architecture (THAT 1200 series): active common-mode bootstrapping achieving transformer-grade CMRR.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
No solid-state active input circuit can match the real-world CMRR of a high-end audio transformer under source imbalance.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Bill Whitlock invented the InGenius topology (US Patent 5,568,561, commercialized as THAT 1200/1240). It uses active bootstrapping to sense incoming common-mode voltage and drive internal nodes with an exact replica. This dynamic feedback cancels common-mode current flow, raising common-mode input impedance from 10 kΩ to over 10 Megohms across the audio band! As a result, source impedance imbalances of 10 Ω or even 100 Ω cause virtually zero degradation of CMRR.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{Z_{\text{cm\_bootstrapped}} > 10\text{ M}\Omega \quad \text{across the full audio band}}$$

### Detailed Parameter Analysis & Derivations
Under the IEC 10 Ω imbalance test: Standard difference amp CMRR = 34 dB; THAT 1200 InGenius CMRR = >90 dB @ 60 Hz and >85 dB @ 20 kHz!

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       THAT 1200 INGENIUS BOOTSTRAPPED RECEIVER                |
|                                                                               |
|   Pin 2 (Hot)  ---[ R1 = 10k ]---+---------[ Difference Stage ]---> Output    |
|                                  |                     ^                      |
|                               [ Bootstrap Sense ]      |                      |
|                                  |                     |                      |
|   Pin 3 (Cold) ---[ R2 = 10k ]---+---[ Common-Mode Driver ]                   |
|                                                                               |
|   Common-mode bootstrap boosts effective input impedance to >10 Megohms!     |
|   Achieves transformer-grade 90 dB CMRR with 10 Ω source imbalance!           |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `US Patent 5,568,561`
- **Cross-Referenced Standards**: `AES-X152`

AES-X152 Section 6.7 and AES Convention Paper 4372 cite Whitlock InGenius architecture.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Solves the source impedance imbalance flaw in solid-state receivers.
2. Achieves >90 dB CMRR even with severe cable/driver mismatches.
3. Standard modern benchmark IC for pro line inputs.

---

## 7. Self-Assessment & Review Questions
Q: How does the THAT 1200 InGenius receiver maintain >90 dB CMRR in the presence of source impedance imbalances?
A: By actively bootstrapping common-mode input impedance to >10 Megohms, preventing imbalance from converting to differential voltage.

---

### Module Navigation
- **Previous Module**: [Module 055: Three Op-Amp Differential Instrumentation Amplifier (In-Amp)](module-055-three-op-amp-instrumentation-amplifier-in-amp.md)
- **Next Module**: [Module 057: Ground-Cancelling and Ground-Sensing Differential Receiver Circuits](module-057-ground-cancelling-and-ground-sensing-receivers.md)
- **Master Syllabus**: [Curriculum Index](README.md)
