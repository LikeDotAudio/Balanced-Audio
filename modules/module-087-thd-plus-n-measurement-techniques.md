---
module_id: "MOD-087"
module_number: 87
title: "Total Harmonic Distortion plus Noise (THD+N) Measurement Techniques"
part_number: 9
part_title: "Part 9: Advanced Mathematical Models & Test Equipment"
slug: "thd-plus-n-measurement-techniques"
tags: ["thd+n", "distortion-analyzer", "notch-filter", "harmonics", "audio-precision"]
standards: ["IEC 60268-3", "AES-X152 Section 2"]
key_equation: "\text{THD+N} = \frac{\sqrt{V_{\text{harmonics}}^2 + V_{\text{noise}}^2}}{V_{\text{total}}} * 100\%"
summary: "State-of-the-art distortion analysis: deep analog notch filters, FFT residual analysis, and distinguishing harmonic distortion from noise."
authors: ["Richard Cabot", "Dennis Bohn"]
revision: "2026.1"
---

# Module 087: Total Harmonic Distortion plus Noise (THD+N) Measurement Techniques

> **Part 9**: Part 9: Advanced Mathematical Models & Test Equipment  
> **Normative Standards**: `IEC 60268-3`, `AES-X152 Section 2`  
> **Key Governing Equation**: `$\text{THD+N} = \frac{\sqrt{V_{\text{harmonics}}^2 + V_{\text{noise}}^2}}{V_{\text{total}}} * 100\%$`  
> **Lead Working Group Contributors**: Richard Cabot, Dennis Bohn

---

## Executive Summary
State-of-the-art distortion analysis: deep analog notch filters, FFT residual analysis, and distinguishing harmonic distortion from noise.

Mastery of this module is fundamental to professional audio facility integration, hardware engineering, and sound system optimization. Compliance with AES and IEC standards eliminates guesswork, guaranteeing predictable, hum-free, high-fidelity interconnection across heterogeneous studio and broadcast hardware.

---

## 1. Industry Misconceptions & The Real-World Problem
A THD+N specification of 0.005% means the device creates 0.005% harmonic distortion.

For decades, oversimplified rules of thumb have circulated among sound engineers, causing persistent ground loops, high-frequency signal loss, and non-compliance with electromagnetic compatibility standards. In modern production environments filled with high-frequency switch-mode power supplies, variable-frequency drives, and wireless transmitters, rigorous standards compliance is essential.

---

## 2. Theoretical & Physical Foundations
Standard THD+N measurement uses a precision analog tracking notch filter to notch out the fundamental test frequency (e.g. 1 kHz) by >120 dB. Everything remaining in the measurement bandwidth—harmonics, power supply hum, thermal noise, and RF interference—is measured as the residual. At low signal levels, 'THD+N' is almost entirely thermal noise, not nonlinear harmonic distortion!

Audio transmission performance is governed by Maxwell's electromagnetic field equations, circuit topology constraints, and transmission line theory. Differential signaling relies on the physical principle that signal currents must circulate exclusively within the dedicated signal path, while external noise currents must be intercepted and safely guided away from sensitive semiconductor nodes into the low-impedance metallic equipment enclosure.

---

## 3. Mathematical Proof & Governing Equations
The electrical behavior of this system is governed by:

$$\mathbf{\text{THD+N} = \frac{\sqrt{V_{\text{harmonics}}^2 + V_{\text{noise}}^2}}{V_{\text{total}}} * 100\%}$$

### Detailed Parameter Analysis & Derivations
THD+N in dB: 20 * log10(V_residual / V_total). A residual of 10 µV on a 1.0 V signal corresponds to -100 dB (0.001%) THD+N.

When manufacturing component tolerances drift or parasitic impedances remain uncompensated, common-mode rejection degrades proportionally. Maintaining tight component tolerances (0.1% or better) across critical bridge networks is mandatory to satisfy AES-X152 published datasheet disclosures.

---

## 4. Technical Schematic & Circuit Topography

+-------------------------------------------------------------------------------+
|                       ANALOG NOTCH FILTER THD+N ANALYZER                      |
|                                                                               |
|   Audio Under Test ---> [ Precision 1 kHz Deep Notch Filter ]                 |
|                                     |                                         |
|                   (Removes 1 kHz fundamental by >120 dB)                      |
|                                     |                                         |
|                                     v                                         |
|   Residual Signal = [ Harmonics (2k, 3k, 4k...) + Hum (60Hz) + Thermal Noise ]|
|                                     |                                         |
|   True RMS Voltmeter Measures Total Residual Power relative to Input!         |
+-------------------------------------------------------------------------------+

---

## 5. Normative Standards Alignment
This curriculum module is harmonized with the following published AES and IEC standards:
- **Primary Standard Reference**: `IEC 60268-3`
- **Cross-Referenced Standards**: `AES-X152 Section 2`

IEC 60268-3 Section 11 and AES-X152 Section 2 specify measurement bandwidths (e.g. 20 Hz - 20 kHz, 80 kHz BW).

---

## 6. Real-World Benchmarks & Practical Takeaways
1. Always check measurement bandwidth when comparing THD+N specs.
2. FFT spectrum analysis is necessary to separate real harmonics from noise.
3. THD+N increases at low output levels due to noise floor dominance.

---

## 7. Self-Assessment & Review Questions
Q: Why does a device's measured THD+N percentage typically increase at very low signal levels?
A: Because the fixed residual noise floor becomes a larger fraction of the small signal voltage, dominating the calculation.

---

### Module Navigation
- **Previous Module**: [Module 086: Hewlett-Packard 353A Patch Panel: Precision Attenuation & Calibrated Loads](module-086-hp-353a-patch-panel-attenuation-and-loads.md)
- **Next Module**: [Module 088: SPICE Circuit Simulation of Audio Line Interconnections](module-088-spice-circuit-simulation-of-interconnects.md)
- **Master Syllabus**: [Curriculum Index](README.md)
