---
module_id: "MOD-061"
module_number: 61
title: "IEC 61938 Phantom Power Standards: P48, P24, and P12 Specifications"
part_number: 7
part_title: "Part 7: Phantom Power & Transducer Interfacing"
slug: "iec-61938-phantom-power-standards"
tags: ["phantom-power", "iec61938", "p48", "p24", "p12", "microphones"]
standards: ["IEC 61938", "AES-X152"]
key_equation: "V_{\text{supply}} = 48\text{ V} \pm 4\text{ V}; \quad R_{\text{feed}} = 6.81\text{ k}\Omega \pm 0.1\% \quad \text{(P48 Standard)}"
summary: "Engineering analysis of IEC 61938: P48, P24, and P12 microphone phantom powering systems, feed resistor tolerances, and current capacity."
authors: ["John Woodgate", "Anthony Kuzub"]
revision: "2026.1"
---

# Module 061: IEC 61938 Phantom Power Standards: P48, P24, and P12 Specifications

> **Part 7**: Part 7: Phantom Power & Transducer Interfacing  
> **Normative Standards**: `IEC 61938`, `AES-X152`  
> **Key Governing Equation**: `$V_{\text{supply}} = 48\text{ V} \pm 4\text{ V}; \quad R_{\text{feed}} = 6.81\text{ k}\Omega \pm 0.1\% \quad \text{(P48 Standard)}$`  
> **Lead Working Group Contributors**: John Woodgate, Anthony Kuzub

---

## Executive Summary
Engineering analysis of IEC 61938: P48, P24, and P12 microphone phantom powering systems, feed resistor tolerances, and current capacity.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
All microphones labeled 'phantom powered' require 48 volts to operate.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
IEC 61938 specifies three standard phantom voltages: P48 (+48V via 6.81 kΩ resistors), P24 (+24V via 1.2 kΩ resistors), and P12 (+12V via 680 Ω resistors). +48V DC is applied equally to both Pin 2 and Pin 3 through precision matched resistors, with the cable shield (Pin 1) serving as the DC ground return. Because Pin 2 and Pin 3 sit at identical DC potentials, dynamic mics experience 0.0V DC differential voltage.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{V_{\text{supply}} = 48\text{ V} \pm 4\text{ V}; \quad R_{\text{feed}} = 6.81\text{ k}\Omega \pm 0.1\% \quad \text{(P48 Standard)}}$$

### Detailed Parameter Analysis & Derivations
Maximum short-circuit current per microphone in P48: I_max = 48 V / (6.81 kΩ / 2) = 14.1 mA. Under maximum standard microphone current draw (10 mA), the voltage drop across the resistors is 34 V, leaving 14 V DC at the microphone terminals.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       IEC 61938 P48 PHANTOM POWER SYSTEM                      |
|                                                                               |
|   +48V DC Supply ---+---[ R1 = 6.81 kΩ (0.1%) ]---------> Pin 2 (Audio + DC)  |
|                     |                                                         |
|                     +---[ R2 = 6.81 kΩ (0.1%) ]---------> Pin 3 (Audio + DC)  |
|                                                                               |
|   Chassis Ground =======================================> Pin 1 (DC Return)   |
|   (Identical +48V DC on Pin 2 & 3: Differential DC voltage across mic = 0V!)  |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `IEC 61938`
- **Cross-Referenced Standards**: `AES-X152`

IEC 61938:2018: 'Multimedia systems - Guide to the recommended characteristics of analogue interfaces to achieve interoperability'.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. P48 feed resistors must be 6.81 kΩ matched to 0.1% or better.
2. Total current per microphone must not exceed 10 mA under IEC 61938.
3. Cable shield (Pin 1) must be continuous to complete the DC circuit.

---

## 7. Self-Assessment & Review Questions
Q: What is the standard feed resistor value specified by IEC 61938 for +48V phantom power (P48)?
A: 6.81 kΩ (matched to within 0.1%).

---

### Module Navigation
- **Previous Module**: [Module 060: Differential Input Capacitance Matching and High-Frequency CMRR](module-060-differential-input-capacitance-matching-cmrr.md)
- **Next Module**: [Module 062: 6.81 kΩ Resistor Bridge Matching and Phantom-Induced CMRR Loss](module-062-resistor-bridge-matching-phantom-cmrr.md)
- **Master Syllabus**: [Curriculum Index](README.md)
