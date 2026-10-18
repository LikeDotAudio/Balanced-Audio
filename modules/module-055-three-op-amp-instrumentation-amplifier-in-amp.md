---
module_id: "MOD-055"
module_number: 55
title: "Three Op-Amp Differential Instrumentation Amplifier (In-Amp)"
part_number: 6
part_title: "Part 6: Receiver (Input Stage) Topologies"
slug: "three-op-amp-instrumentation-amplifier-in-amp"
tags: ["instrumentation-amp", "in-amp", "3-opamp", "high-z-inputs"]
standards: ["AES-X152 Section 6.7"]
key_equation: "Z_{\text{in+}} = Z_{\text{in-}} > 10^9\ \Omega \quad \text{(Op-amp non-inverting FET/BJT inputs)}"
summary: "Classic 3-op-amp instrumentation amplifier: high-impedance buffered inputs, differential gain control, and common-mode rejection."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 055: Three Op-Amp Differential Instrumentation Amplifier (In-Amp)

> **Part 6**: Part 6: Receiver (Input Stage) Topologies  
> **Normative Standards**: `AES-X152 Section 6.7`  
> **Key Governing Equation**: `$Z_{\text{in+}} = Z_{\text{in-}} > 10^9\ \Omega \quad \text{(Op-amp non-inverting FET/BJT inputs)}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Classic 3-op-amp instrumentation amplifier: high-impedance buffered inputs, differential gain control, and common-mode rejection.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A 3-op-amp instrumentation amplifier completely solves all real-world audio CMRR problems.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
The classic 3-op-amp instrumentation amplifier (In-Amp) places two high-input-impedance non-inverting buffer amplifiers ahead of a 4-resistor difference stage. Both Pin 2 and Pin 3 connect directly to non-inverting op-amp gate/base inputs, presenting gigohm input impedances and zero load asymmetry. A single gain-setting resistor Rg sets differential gain while passing common-mode voltage at unity gain.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{Z_{\text{in+}} = Z_{\text{in-}} > 10^9\ \Omega \quad \text{(Op-amp non-inverting FET/BJT inputs)}}$$

### Detailed Parameter Analysis & Derivations
Differential gain: A_d = [ 1 + (2*R / Rg) ] * (R2 / R1). High input impedance prevents loading the driver, but the secondary difference stage remains vulnerable to common-mode voltage swing limits and resistor bridge tolerance errors.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       3-OP-AMP INSTRUMENTATION AMPLIFIER                      |
|                                                                               |
|   Pin 2 ---> [ Buffer Op-Amp 1 ]----+---------[ R1 ]----+---- - \             |
|                    ^                |                   |       \            |
|                    |             [ Rg ]                 |        |--> Vout   |
|                    v                |                   |       /            |
|   Pin 3 ---> [ Buffer Op-Amp 2 ]----+---------[ R3 ]----+---- + /             |
|                                                                               |
|   Inputs present >1000 Megohms impedance, eliminating loading asymmetry!      |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.7`
- **Cross-Referenced Standards**: Normative audio engineering reference

AES-X152 Section 6.7 describes 3-op-amp instrumentation topology.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Buffers isolate signal lines from resistor loading asymmetry.
2. Single resistor Rg controls differential gain cleanly.
3. Common-mode voltage is limited by op-amp power supply rails.

---

## 7. Self-Assessment & Review Questions
Q: How does a 3-op-amp instrumentation amplifier eliminate the input impedance asymmetry of a single op-amp difference stage?
A: By placing non-inverting op-amp buffers with gigohm input impedances in front of both signal legs.

---

### Module Navigation
- **Previous Module**: [Module 054: The Impedance Asymmetry Flaw in Simple Single Op-Amp Receivers](module-054-impedance-asymmetry-in-single-opamp-receivers.md)
- **Next Module**: [Module 056: High Common-Mode Impedance Receivers: InGenius & THAT 1200 Architecture](module-056-high-cm-impedance-receivers-ingenius-that1200.md)
- **Master Syllabus**: [Curriculum Index](README.md)
