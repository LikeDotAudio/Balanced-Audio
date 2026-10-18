---
module_id: "MOD-044"
module_number: 44
title: "Star-Quad Cable Geometry & Magnetic Rejection"
part_number: 5
part_title: "Part 5: Cable Transmission Medium & Connector Standards"
slug: "star-quad-cable-geometry-magnetic-rejection"
tags: ["star-quad", "magnetic-rejection", "geometry", "quad-cable", "hum"]
standards: ["AES-X152", "AES72"]
key_equation: "\text{Magnetic\_Immunity\_Improvement} \approx 20\text{ dB to } 35\text{ dB over standard twisted pair}"
summary: "Physics of 4-conductor star-quad cable geometry, cross-connection, and spatial magnetic field cancellation."
authors: ["Jim Brown", "Anthony Kuzub"]
revision: "2026.1"
---

# Module 044: Star-Quad Cable Geometry & Magnetic Rejection

> **Part 5**: Part 5: Cable Transmission Medium & Connector Standards  
> **Normative Standards**: `AES-X152`, `AES72`  
> **Key Governing Equation**: `$\text{Magnetic\_Immunity\_Improvement} \approx 20\text{ dB to } 35\text{ dB over standard twisted pair}$`  
> **Lead Working Group Contributors**: Jim Brown, Anthony Kuzub

---

## Executive Summary
Physics of 4-conductor star-quad cable geometry, cross-connection, and spatial magnetic field cancellation.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
Star-quad cable is just standard 4-conductor wire that sounds better because of oxygen-free copper.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Star-quad cable consists of four insulated conductors arranged in a tight symmetrical square cross-section. Opposing pairs of conductors are tied together in parallel at each end (Conductors 1 & 3 = Hot / Pin 2; Conductors 2 & 4 = Cold / Pin 3). This creates two interleaved virtual loops whose effective magnetic pickup areas overlap spatially, canceling induced magnetic hum from power cords and stage lighting dimmers by 20 to 35 dB compared to standard pairs.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{Magnetic\_Immunity\_Improvement} \approx 20\text{ dB to } 35\text{ dB over standard twisted pair}}$$

### Detailed Parameter Analysis & Derivations
Trade-off: Star-quad has approximately double the capacitance of standard twisted pair (~180 pF/m vs ~90 pF/m). For long mic runs (>50m), ensure the driver can handle the higher capacitance.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       STAR-QUAD CROSS-SECTION GEOMETRY                        |
|                                                                               |
|                             [ Conductor 1: Hot ]                              |
|                                      |                                        |
|         [ Conductor 4: Cold ] -------+------- [ Conductor 2: Cold ]           |
|                                      |                                        |
|                             [ Conductor 3: Hot ]                              |
|                                                                               |
|   Opposing hot wires (1 & 3) in parallel; opposing cold wires (2 & 4) in      |
|   parallel. Spatial magnetic centroid is identical for hot and cold!          |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152`
- **Cross-Referenced Standards**: `AES72`

AES-X152 Section 7 references star-quad geometry for harsh electromagnetic environments.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Use star-quad for stage mic cables near lighting trusses and power runs.
2. Provides 20-35 dB superior magnetic hum rejection.
3. Mind the higher capacitance on runs exceeding 100 meters.

---

## 7. Self-Assessment & Review Questions
Q: How are the four conductors of a star-quad cable wired at the XLR connectors?
A: Diametrically opposite pairs of conductors are tied in parallel: Conductors 1 & 3 to Pin 2 (Hot); Conductors 2 & 4 to Pin 3 (Cold).

---

### Module Navigation
- **Previous Module**: [Module 043: Cable Run Length, Driver Output Impedance & -3dB Cutoff Frequency](module-043-cable-length-driver-impedance-hf-rolloff.md)
- **Next Module**: [Module 045: AES14 Standard: XLR 3-Pin Interface & Pin Assignment](module-045-aes14-standard-xlr-3-pin-interface.md)
- **Master Syllabus**: [Curriculum Index](README.md)
