---
module_id: "MOD-040"
module_number: 40
title: "Unbalanced Single-Ended Outputs (RCA & TS 1/4") & Driver Load Driving"
part_number: 4
part_title: "Part 4: Transmitter (Driver/Output) Topologies"
slug: "unbalanced-single-ended-outputs"
tags: ["unbalanced-driver", "single-ended", "rca", "ts", "drive-limits"]
standards: ["AES-X152 Section 6.8"]
key_equation: "V_{\text{out}} = V_{\text{sig}} \quad \text{(Referenced strictly to local circuit 0V)}"
summary: "Single-ended output driver architecture, output current limits, and drive considerations into unbalanced destinations."
authors: ["Anthony Kuzub", "John Woodgate"]
revision: "2026.1"
---

# Module 040: Unbalanced Single-Ended Outputs (RCA & TS 1/4") & Driver Load Driving

> **Part 4**: Part 4: Transmitter (Driver/Output) Topologies  
> **Normative Standards**: `AES-X152 Section 6.8`  
> **Key Governing Equation**: `$V_{\text{out}} = V_{\text{sig}} \quad \text{(Referenced strictly to local circuit 0V)}$`  
> **Lead Working Group Contributors**: Anthony Kuzub, John Woodgate

---

## Executive Summary
Single-ended output driver architecture, output current limits, and drive considerations into unbalanced destinations.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
An unbalanced output can be converted to balanced by simply connecting it with a 3-conductor XLR cable.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
A single-ended unbalanced driver (Topology 6.8) outputs audio signal on a single conductor referenced directly to internal circuit 0V. Connecting an unbalanced output to a 3-pin XLR without impedance-balancing resistors leaves Pin 3 tied to ground at 0 Ω while Pin 2 has 50 Ω - 100 Ω, creating a massive impedance mismatch that destroys balanced common-mode rejection.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{V_{\text{out}} = V_{\text{sig}} \quad \text{(Referenced strictly to local circuit 0V)}}$$

### Detailed Parameter Analysis & Derivations
Source impedance mismatch: ΔZs = |Z_pin2 - Z_pin3| = |50 Ω - 0 Ω| = 50 Ω. At the receiving differential input, CMRR degrades from 80 dB down to <40 dB.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       UNBALANCED SINGLE-ENDED OUTPUT (6.8)                    |
|                                                                               |
|   Audio In ---> [ Op-Amp Buffer ] ----[ 47 Ω ]----> Center Pin / Tip (Audio)  |
|                                                                               |
|   Circuit 0V -------------------------------------> Outer Shell / Sleeve (0V) |
|                                                                               |
|   Signal is single-ended; zero common-mode noise cancellation possible!       |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.8`
- **Cross-Referenced Standards**: Normative audio engineering reference

AES-X152 Section 6.8 defines single-ended ground-referenced ports.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Unbalanced drivers require passive DI boxes or impedance balancing to interface to snakes.
2. Keep cable lengths under 3 meters (10 feet).
3. Protect against output shorts with a series resistor (47 Ω to 100 Ω).

---

## 7. Self-Assessment & Review Questions
Q: What happens if an unbalanced output is connected to a balanced XLR snake without an impedance-matching network?
A: The impedance imbalance destroys common-mode rejection at the destination mixer, causing severe hum and noise.

---

### Module Navigation
- **Previous Module**: [Module 039: Integrated Silicon Line Drivers: THAT 1646 / 1606 OutSmarts Architecture](module-039-integrated-silicon-line-drivers-that-1646.md)
- **Next Module**: [Module 041: Cable Electrical Parameters: Inductance, Capacitance, Resistance (LCR)](module-041-cable-lcr-electrical-parameters.md)
- **Master Syllabus**: [Curriculum Index](README.md)
