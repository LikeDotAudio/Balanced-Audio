---
module_id: "MOD-054"
module_number: 54
title: "The Impedance Asymmetry Flaw in Simple Single Op-Amp Receivers"
part_number: 6
part_title: "Part 6: Receiver (Input Stage) Topologies"
slug: "impedance-asymmetry-in-single-opamp-receivers"
tags: ["impedance-asymmetry", "single-opamp", "input-impedance-mismatch"]
standards: ["AES-X152 Section 6.7"]
key_equation: "Z_{\text{in(non-inv)}} = R_3 + R_4; \quad Z_{\text{in(inv)}} = \frac{R_1}{1 - \frac{V_{\text{out}}}{V_{\text{in-}}}} \approx \frac{R_1}{1 - (-1)} = \frac{R_1}{2} \text{ to } R_1"
summary: "Exposing the inherent impedance asymmetry between inverting and non-inverting inputs in the 4-resistor difference stage."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 054: The Impedance Asymmetry Flaw in Simple Single Op-Amp Receivers

> **Part 6**: Part 6: Receiver (Input Stage) Topologies  
> **Normative Standards**: `AES-X152 Section 6.7`  
> **Key Governing Equation**: `$Z_{\text{in(non-inv)}} = R_3 + R_4; \quad Z_{\text{in(inv)}} = \frac{R_1}{1 - \frac{V_{\text{out}}}{V_{\text{in-}}}} \approx \frac{R_1}{1 - (-1)} = \frac{R_1}{2} \text{ to } R_1$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Exposing the inherent impedance asymmetry between inverting and non-inverting inputs in the 4-resistor difference stage.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A balanced difference amplifier presents equal load impedances to Conductor 1 and Conductor 2.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
In a 4-resistor difference amplifier (10 kΩ resistors, unity gain), the non-inverting input (Pin 3) connects through R3 and R4 to ground, presenting an input impedance of R3 + R4 = 20 kΩ. However, the inverting input (Pin 2) connects to the op-amp's virtual ground summing junction. Because the op-amp output swings in opposite polarity, negative feedback actively pulls current through R1! When driven with differential signals, Pin 2 sees an input impedance of only ~6.7 kΩ to 10 kΩ!

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{Z_{\text{in(non-inv)}} = R_3 + R_4; \quad Z_{\text{in(inv)}} = \frac{R_1}{1 - \frac{V_{\text{out}}}{V_{\text{in-}}}} \approx \frac{R_1}{1 - (-1)} = \frac{R_1}{2} \text{ to } R_1}$$

### Detailed Parameter Analysis & Derivations
Impedance ratio between legs: Z_in(+) / Z_in(-) ≈ 20 kΩ / 10 kΩ = 2:1! The receiver itself introduces an impedance imbalance to the driving line, degrading line balance and increasing common-mode noise conversion.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       INPUT IMPEDANCE ASYMMETRY FLAW                          |
|                                                                               |
|   Pin 2 (Inverting Input): Sees Virtual Ground Summing Junction!              |
|   Z_in(-) ≈ 6.7 kΩ to 10 kΩ (Varies dynamically with differential drive!)     |
|                                                                               |
|   Pin 3 (Non-Inverting): Sees Passive Resistor Divider to 0V                  |
|   Z_in(+) = R3 + R4 = 20 kΩ (Fixed passive load)                              |
|                                                                               |
|   RESULT: The receiver itself unbalances the transmission line!               |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.7`
- **Cross-Referenced Standards**: Normative audio engineering reference

AES-X152 Section 6.7 highlights input impedance asymmetry in standard difference amps.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Standard 4-resistor difference amps have radically unequal input impedances.
2. Inverting leg loads the driver 2x heavier than non-inverting leg.
3. Solved by buffered inputs (Instrumentation Amps) or InGenius architecture.

---

## 7. Self-Assessment & Review Questions
Q: In a standard 4-resistor difference amp using four 10 kΩ resistors, what is the input impedance seen by the non-inverting input versus the inverting input?
A: Non-inverting input sees 20 kΩ (R3 + R4); inverting input sees ~10 kΩ (due to virtual ground summing junction).

---

### Module Navigation
- **Previous Module**: [Module 053: Basic Single Op-Amp Differential Receiver (Difference Amplifier)](module-053-basic-single-op-amp-difference-amplifier.md)
- **Next Module**: [Module 055: Three Op-Amp Differential Instrumentation Amplifier (In-Amp)](module-055-three-op-amp-instrumentation-amplifier-in-amp.md)
- **Master Syllabus**: [Curriculum Index](README.md)
