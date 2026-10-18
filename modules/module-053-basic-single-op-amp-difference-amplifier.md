---
module_id: "MOD-053"
module_number: 53
title: "Basic Single Op-Amp Differential Receiver (Difference Amplifier)"
part_number: 6
part_title: "Part 6: Receiver (Input Stage) Topologies"
slug: "basic-single-op-amp-difference-amplifier"
tags: ["difference-amp", "single-opamp", "input-stage", "receiver"]
standards: ["AES-X152 Section 6.7"]
key_equation: "V_{\text{out}} = \frac{R_2}{R_1} * (V_{\text{pin2}} - V_{\text{pin3}}) \quad \text{(assuming } R_1=R_3, R_2=R_4\text{)}"
summary: "Circuit analysis of the ubiquitous 4-resistor single operational amplifier difference receiver stage."
authors: ["Bill Whitlock", "Dennis Bohn"]
revision: "2026.1"
---

# Module 053: Basic Single Op-Amp Differential Receiver (Difference Amplifier)

> **Part 6**: Part 6: Receiver (Input Stage) Topologies  
> **Normative Standards**: `AES-X152 Section 6.7`  
> **Key Governing Equation**: `$V_{\text{out}} = \frac{R_2}{R_1} * (V_{\text{pin2}} - V_{\text{pin3}}) \quad \text{(assuming } R_1=R_3, R_2=R_4\text{)}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Dennis Bohn

---

## Executive Summary
Circuit analysis of the ubiquitous 4-resistor single operational amplifier difference receiver stage.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
The classic 4-resistor difference amplifier is an ideal balanced receiver for all pro audio applications.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
The single op-amp difference amplifier uses an operational amplifier with negative feedback. Resistors R1 and R2 set gain on the inverting leg; R3 and R4 form a voltage divider on the non-inverting leg. When R1 = R3 and R2 = R4, common-mode signals produce identical voltages at both op-amp inputs and cancel. However, it suffers from two major engineering flaws: low input impedance and severe impedance asymmetry between inputs.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{V_{\text{out}} = \frac{R_2}{R_1} * (V_{\text{pin2}} - V_{\text{pin3}}) \quad \text{(assuming } R_1=R_3, R_2=R_4\text{)}}$$

### Detailed Parameter Analysis & Derivations
Gain: A_d = R2 / R1. For unity gain with 10 kΩ resistors: R1 = R2 = R3 = R4 = 10 kΩ. Common-mode input impedance is approximately 10 kΩ to 20 kΩ.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       BASIC SINGLE OP-AMP DIFFERENCE AMPLIFIER                |
|                                                                               |
|   Pin 2 (Hot)  ----[ R1 = 10k ]----+------------- - \                         |
|                                    |    R2           \                        |
|                                    +--[ 10k ]--+      \                       |
|                                                |       |---> Audio Out        |
|   Pin 3 (Cold) ----[ R3 = 10k ]----+           |      /                       |
|                                    |    R4     |     /                        |
|                                    +--[ 10k ]--+    +                         |
|                                         |                                     |
|                                        0V                                     |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Section 6.7`
- **Cross-Referenced Standards**: Normative audio engineering reference

AES-X152 Section 6.7 classifies the 4-resistor difference amplifier.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Inexpensive and compact; standard in budget audio interfaces.
2. Highly sensitive to resistor tolerance mismatches.
3. Degrades severely when driven by unequal source impedances.

---

## 7. Self-Assessment & Review Questions
Q: What is the primary limitation of a single op-amp difference amplifier regarding common-mode rejection?
A: Its common-mode input impedance is relatively low, making CMRR highly vulnerable to source impedance imbalances.

---

### Module Navigation
- **Previous Module**: [Module 052: Passive Transformer-Coupled Balanced Receiver](module-052-passive-transformer-coupled-balanced-receiver.md)
- **Next Module**: [Module 054: The Impedance Asymmetry Flaw in Simple Single Op-Amp Receivers](module-054-impedance-asymmetry-in-single-opamp-receivers.md)
- **Master Syllabus**: [Curriculum Index](README.md)
