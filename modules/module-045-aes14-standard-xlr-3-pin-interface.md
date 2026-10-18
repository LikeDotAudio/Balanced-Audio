---
module_id: "MOD-045"
module_number: 45
title: "AES14 Standard: XLR 3-Pin Interface & Pin Assignment"
part_number: 5
part_title: "Part 5: Cable Transmission Medium & Connector Standards"
slug: "aes14-standard-xlr-3-pin-interface"
tags: ["aes14", "xlr", "pinout", "table1", "table2", "standards"]
standards: ["AES14", "AES48"]
key_equation: "\text{Pin 1 = Shield/Chassis}, \quad \text{Pin 2 = Non-inverting (Hot)}, \quad \text{Pin 3 = Inverting (Cold)}"
summary: "The canonical AES14 standard establishing worldwide uniformity for 3-pin XLR audio connectors and resolving the 'Pin 3 Hot' legacy conflict."
authors: ["John Woodgate", "Bruce Olson"]
revision: "2026.1"
---

# Module 045: AES14 Standard: XLR 3-Pin Interface & Pin Assignment

> **Part 5**: Part 5: Cable Transmission Medium & Connector Standards  
> **Normative Standards**: `AES14`, `AES48`  
> **Key Governing Equation**: `$\text{Pin 1 = Shield/Chassis}, \quad \text{Pin 2 = Non-inverting (Hot)}, \quad \text{Pin 3 = Inverting (Cold)}$`  
> **Lead Working Group Contributors**: John Woodgate, Bruce Olson

---

## Executive Summary
The canonical AES14 standard establishing worldwide uniformity for 3-pin XLR audio connectors and resolving the 'Pin 3 Hot' legacy conflict.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Pin 3 Hot is still acceptable for vintage European or American gear in modern facilities.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Before AES14 (published in 1992), an industry schism existed: American manufacturers used Pin 2 Hot, while British and Japanese broadcast equipment frequently used Pin 3 Hot. AES14 officially standardized: Pin 1 = Shield / Chassis, Pin 2 = Hot (positive voltage produces acoustic compression), Pin 3 = Cold (negative reference). Mixing Pin 2 Hot and Pin 3 Hot equipment causes 180° acoustic phase inversion.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{Pin 1 = Shield/Chassis}, \quad \text{Pin 2 = Non-inverting (Hot)}, \quad \text{Pin 3 = Inverting (Cold)}}$$

### Detailed Parameter Analysis & Derivations
Polarity convention: Acoustic pressure increase on microphone diaphragm -> Positive voltage on Pin 2 relative to Pin 3.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       AES14 XLR CONNECTOR PINOUT                              |
|                                                                               |
|                  MALE MATING FACE              FEMALE MATING FACE             |
|                                                                               |
|                        ( 1 )                         ( 1 )                    |
|                                                                               |
|                    ( 2 )   ( 3 )                 ( 3 )   ( 2 )                |
|                                                                               |
|   Pin 1: Shield / Chassis Ground (Direct Enclosure Bond)                      |
|   Pin 2: Signal Hot (+) Non-Inverting                                         |
|   Pin 3: Signal Cold (-) Inverting Reference                                  |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES14`
- **Cross-Referenced Standards**: `AES48`

AES14-1992 (r2014): 'AES standard for professional audio equipment - Application of connectors, part 1, circular connectors'.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Pin 2 is Hot; Pin 3 is Cold worldwide.
2. Pin 1 connects to chassis, not audio circuit 0V.
3. Female XLR = Output/Source; Male XLR = Input/Destination.

---

## 7. Self-Assessment & Review Questions
Q: According to AES14, which pin on a 3-pin XLR connector carries the positive non-inverting audio signal?
A: Pin 2.

---

### Module Navigation
- **Previous Module**: [Module 044: Star-Quad Cable Geometry & Magnetic Rejection](module-044-star-quad-cable-geometry-magnetic-rejection.md)
- **Next Module**: [Module 046: 1/4-inch Phone Plugs (TRS vs TS) and B-Gauge Patch Cords](module-046-quarter-inch-phone-plugs-trs-vs-ts.md)
- **Master Syllabus**: [Curriculum Index](README.md)
