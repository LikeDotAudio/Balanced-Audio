---
module_id: "MOD-035"
module_number: 35
title: "Why Impedance-Balanced Drivers Match Push-Pull CMRR 100%"
part_number: 4
part_title: "Part 4: Transmitter (Driver/Output) Topologies"
slug: "why-impedance-balanced-matches-push-pull"
tags: ["impedance-balanced", "cmrr-parity", "noise-cancellation", "efficiency"]
standards: ["AES-X152 Section 6.2"]
key_equation: "\text{CMRR}_{6.2} = \text{CMRR}_{6.1} \quad \text{(for identical } \Delta Z\text{)}"
summary: "Mathematical and physical proof demonstrating that impedance-balanced drivers achieve identical CMRR to push-pull drivers."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 035: Why Impedance-Balanced Drivers Match Push-Pull CMRR 100%

> **Part 4**: Part 4: Transmitter (Driver/Output) Topologies  
> **Normative Standards**: `AES-X152 Section 6.2`  
> **Key Governing Equation**: `$\text{CMRR}_{6.2} = \text{CMRR}_{6.1} \quad \text{(for identical } \Delta Z\text{)}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Mathematical and physical proof demonstrating that impedance-balanced drivers achieve identical CMRR to push-pull drivers.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A differential receiver requires an inverted audio signal on Pin 3 to perform common-mode noise cancellation.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
A differential receiver subtracts Conductor 2 from Conductor 1: V_out = V_1 - V_2. For an impedance-balanced driver: V_1 = V_audio + V_noise; V_2 = 0 + V_noise. V_out = (V_audio + V_noise) - (V_noise) = V_audio + 0. The cancellation of V_noise is mathematically exact and independent of audio signal voltage on Pin 3.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{CMRR}_{6.2} = \text{CMRR}_{6.1} \quad \text{(for identical } \Delta Z\text{)}}$$

### Detailed Parameter Analysis & Derivations
Noise residual in both 6.1 and 6.2: V_residual = V_cm * [ (Z1 - Z2) / Z_load ]. If R1 and R2 are 0.1% matched in both circuits, the noise rejection is mathematically identical.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       CMRR PARITY PROOF                                       |
|                                                                               |
|   PUSH-PULL (6.1):        (+1.0 V Audio + Noise) - (-1.0 V Audio + Noise)    |
|                           = +2.0 V Audio + (Noise - Noise) = +2.0 V Audio     |
|                                                                               |
|   IMPEDANCE-BALANCED (6.2): (+1.0 V Audio + Noise) - (0.0 V Audio + Noise)    |
|                           = +1.0 V Audio + (Noise - Noise) = +1.0 V Audio     |
|                                                                               |
|   In both cases: NOISE CANCELLATION IS 100%!                                  |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.2`
- **Cross-Referenced Standards**: Normative audio engineering reference

AES-X152 Section 6.2 documentation on common-mode noise rejection parity.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Noise cancellation occurs at the receiver, not in the cable.
2. Audio voltage on Pin 3 contributes only gain, not noise rejection.
3. Impedance-balanced is an elegant, robust engineering solution.

---

## 7. Self-Assessment & Review Questions
Q: Does common-mode noise cancellation require an inverted audio signal on Pin 3?
A: No! It requires equal impedance to ground on both pins.

---

### Module Navigation
- **Previous Module**: [Module 034: Topology 6.2: Active Impedance-Balanced Output Architecture](module-034-topology-6-2-active-impedance-balanced.md)
- **Next Module**: [Module 036: Topology 6.3: Transformer-Coupled Floating Output](module-036-topology-6-3-transformer-floating-output.md)
- **Master Syllabus**: [Curriculum Index](README.md)
