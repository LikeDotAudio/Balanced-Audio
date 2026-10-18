---
module_id: "MOD-094"
module_number: 94
title: "AES-X152 Datasheet: Section 3 Terminal Impedances vs Frequency"
part_number: 10
part_title: "Part 10: AES-X152 Standard, Literature, Roster & Legacy"
slug: "aes-x152-datasheet-section-3-terminal-impedances"
tags: ["datasheet-template", "section-3", "terminal-impedance", "dmz", "cmz"]
standards: ["AES-X152 Clause 3", "IEC 60268-3"]
key_equation: "Z_{\text{terminal}}(f) = R(f) + jX(f) \quad \text{@ 100 Hz, 1 kHz, and 10 kHz}"
summary: "Clause 3 of the AES-X152 datasheet template: Differential-Mode Impedance (DMZ) and Common-Mode Impedance (CMZ) across the audio band."
authors: ["Bill Whitlock", "Jim Meyer"]
revision: "2026.1"
---

# Module 094: AES-X152 Datasheet: Section 3 Terminal Impedances vs Frequency

> **Part 10**: Part 10: AES-X152 Standard, Literature, Roster & Legacy  
> **Normative Standards**: `AES-X152 Clause 3`, `IEC 60268-3`  
> **Key Governing Equation**: `$Z_{\text{terminal}}(f) = R(f) + jX(f) \quad \text{@ 100 Hz, 1 kHz, and 10 kHz}$`  
> **Lead Working Group Contributors**: Bill Whitlock, Jim Meyer

---

## Executive Summary
Clause 3 of the AES-X152 datasheet template: Differential-Mode Impedance (DMZ) and Common-Mode Impedance (CMZ) across the audio band.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A single resistance number (e.g. 'Input Impedance: 10k') accurately describes circuit terminal behavior.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Circuit impedances are complex reactive quantities that vary with frequency. A line driver may have 50 Ω output resistance at 1 kHz, but due to output DC blocking capacitors, its source impedance may rise to 500 Ω at 20 Hz, degrading low-frequency balance! AES-X152 Clause 3 mandates reporting Differential-Mode Impedance (DMZ) and Common-Mode Impedance (CMZ) at three spot frequencies: 100 Hz, 1 kHz, and 10 kHz, along with impedance balance ratio.

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{Z_{\text{terminal}}(f) = R(f) + jX(f) \quad \text{@ 100 Hz, 1 kHz, and 10 kHz}}$$

### Detailed Parameter Analysis & Derivations
Impedance Balance Ratio: Bal% = [ 1 - (|Z1 - Z2| / (Z1 + Z2)) ] * 100%. A 0.1% mismatch corresponds to a 99.9% Balance Ratio (>60 dB balance).

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       AES-X152 DATASHEET: SECTION 3 TEMPLATE                  |
|                                                                               |
|   +-------------------+------------+------------+------------+            |
|   | Terminal Metric   | @ 100 Hz   | @ 1 kHz    | @ 10 kHz   |            |
|   +-------------------+------------+------------+------------+            |
|   | Output DMZ (diff) | 52.1 Ω     | 50.0 Ω     | 50.4 Ω     |            |
|   | Output CMZ (com)  | 52.3 Ω     | 50.1 Ω     | 50.5 Ω     |            |
|   | Source Imbalance  | 0.2 Ω      | 0.1 Ω      | 0.1 Ω      |            |
|   | Input DMZ (diff)  | 20.2 kΩ    | 20.0 kΩ    | 19.8 kΩ    |            |
|   | Input CMZ (com)   | 10.1 MegΩ  | 10.0 MegΩ  | 4.2 MegΩ   |            |
|   +-------------------+------------+------------+------------+            |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `AES-X152 Clause 3`
- **Cross-Referenced Standards**: `IEC 60268-3`

AES-X152 Clause 3: Terminal Impedances.

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Impedance must be disclosed across frequency, not as a single DC number.
2. Separate reporting of differential and common-mode impedances is mandatory.
3. Reveals high-frequency reactive capacitance mismatches.

---

## 7. Self-Assessment & Review Questions
Q: Why does AES-X152 mandate disclosing terminal impedances at 100 Hz, 1 kHz, and 10 kHz?
A: Because coupling capacitors increase impedance at low frequencies, while stray capacitances reduce impedance at high frequencies.

---

### Module Navigation
- **Previous Module**: [Module 093: AES-X152 Datasheet: Section 2 Rated Levels & Maximum Voltage Swings](module-093-aes-x152-datasheet-section-2-rated-levels.md)
- **Next Module**: [Module 095: AES-X152 Datasheet: Section 4 Topology & Grounding Classifications](module-095-aes-x152-datasheet-section-4-topologies-grounding.md)
- **Master Syllabus**: [Curriculum Index](README.md)
