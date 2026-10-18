---
module_id: "MOD-034"
module_number: 34
title: "Topology 6.2: Active Impedance-Balanced Output Architecture"
part_number: 4
part_title: "Part 4: Transmitter (Driver/Output) Topologies"
slug: "topology-6-2-active-impedance-balanced"
tags: ["impedance-balanced", "single-driven", "topology-6.2", "reliability"]
standards: ["AES-X152 Section 6.2", "IEC 60268-3"]
key_equation: "V_{\text{pin2}} = V_{\text{sig}}, \quad V_{\text{pin3}} = 0.0\text{ V}; \quad Z_{\text{pin2}} = Z_{\text{pin3}} = R_{\text{match}}"
summary: "Circuit design, economic advantages, and fail-safe robustness of active impedance-balanced line outputs."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 034: Topology 6.2: Active Impedance-Balanced Output Architecture

> **Part 4**: Part 4: Transmitter (Driver/Output) Topologies  
> **Normative Standards**: `AES-X152 Section 6.2`, `IEC 60268-3`  
> **Key Governing Equation**: `$V_{\text{pin2}} = V_{\text{sig}}, \quad V_{\text{pin3}} = 0.0\text{ V}; \quad Z_{\text{pin2}} = Z_{\text{pin3}} = R_{\text{match}}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Circuit design, economic advantages, and fail-safe robustness of active impedance-balanced line outputs.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Impedance-balanced outputs are 'cheap pseudo-balanced shortcuts' that do not offer real professional noise rejection.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Topology 6.2 uses a single operational amplifier to drive Pin 2 through a precision matching resistor R1. Pin 3 carries NO audio signal; it is connected directly to circuit ground through an identical precision matching resistor R2. Because Z_pin2 = Z_pin3 to ground, noise couples equally to both conductors and is 100% rejected by the differential receiver!

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{V_{\text{pin2}} = V_{\text{sig}}, \quad V_{\text{pin3}} = 0.0\text{ V}; \quad Z_{\text{pin2}} = Z_{\text{pin3}} = R_{\text{match}}}$$

### Detailed Parameter Analysis & Derivations
When connected to an unbalanced input, Pin 3 can be grounded with ZERO consequence because it carries 0 V audio. Signal level on Pin 2 is completely unchanged (0.0 dB loss).

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       TOPOLOGY 6.2: IMPEDANCE-BALANCED DRIVER                 |
|                                                                               |
|   Audio In ---> [ Active Op-Amp ] -----[ R1 = 50 Ω ]----> Pin 2 (Hot Audio)   |
|                                                                               |
|   Circuit 0V --------------------------[ R2 = 50 Ω ]----> Pin 3 (Cold Ground) |
|                                                                               |
|   Pin 3 carries 0V audio, but matches Pin 2 impedance exactly!                |
|   100% immune to Pin 3 short-to-ground faults!                                |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.2`
- **Cross-Referenced Standards**: `IEC 60268-3`

AES-X152 Section 6.2 classifies single-driven impedance-matched outputs as Topology 6.2.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. 100% of the CMRR of push-pull systems.
2. Half the parts, half the power, half the noise of dual-op-amp designs.
3. Immune to destruction or distortion when plugged into mono 1/4" TS jacks.

---

## 7. Self-Assessment & Review Questions
Q: What happens to the audio signal level when a Topology 6.2 impedance-balanced output is plugged into an unbalanced TS jack?
A: Zero level loss (0.0 dB change); the signal on Pin 2 remains at full level.

---

### Module Navigation
- **Previous Module**: [Module 033: Push-Pull Hazard: Pin 3 Grounding Faults & Thermal Limiting](module-033-push-pull-hazard-pin-3-grounding.md)
- **Next Module**: [Module 035: Why Impedance-Balanced Drivers Match Push-Pull CMRR 100%](module-035-why-impedance-balanced-matches-push-pull.md)
- **Master Syllabus**: [Curriculum Index](README.md)
