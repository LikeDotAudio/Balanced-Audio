# Balanced Audio & AES-X152 Reference Portal

An interactive, responsive HTML5 web portal, report of findings, and engineering toolkit exploring **AES-X152**: *Standard for Presenting Signal Levels, Circuit Impedances, and Topologies of Analog Audio System Components for Product Data Sheets* (Audio Engineering Society Standards Committee SC-05-05 Working Group on Grounding and EMC Practices).

Live Repository: [LikeDotAudio/Balanced-Audio](https://github.com/LikeDotAudio/Balanced-Audio)

---

## Overview

The purpose of AES-X152 is to empower system designers, sound engineers, and audio equipment manufacturers to predict and understand:
> **"What can work with what, and how."**

Interconnection performance hinges on the dynamic interaction of a tripartite chain:
1. **The Transmitter (Driver / Source)**
2. **The Interconnecting Cable (The Transmission Path)**
3. **The Receiver (Input Load)**

---

## Key Findings & Core Truths

1. **Balance is an Impedance Characteristic, Not a Signal Property**
   - Noise rejection (Common-Mode Rejection Ratio / CMRR) in differential audio does not require equal-and-opposite voltages on the signal conductors. It strictly requires **equal impedance to ground (or any third reference point)** on both legs.
   - When impedances are balanced, external electromagnetic interference induces equal voltages on both conductors, which the differential receiver subtracts to zero ($V_{out} = V_+ - V_- = 0$).

2. **The "Pin 1 Problem" (AES48)**
   - Cable shields must connect directly to the metallic equipment chassis enclosure at the connector entrance. Connecting Pin 1 to the internal audio circuit ground ($0\text{ V}$) injects hum and RF shield currents directly into signal paths.

3. **Impedance-Balanced Drivers**
   - Driving audio only on Pin 2 while terminating Pin 3 with a matching passive resistor achieves 100% of the common-mode noise rejection of dual-driven lines at lower cost and power consumption, with zero risk of damage when shorted to ground.

4. **Push-Pull Output Hazards**
   - Ground-referenced dual-active op-amp outputs risk damage or severe distortion if Pin 3 is shorted to ground (e.g. via mono 1/4" TS plugs).

---

## Web Portal Features

The included modern HTML5/CSS3/JavaScript web portal includes:

- **The Three-Part Triad Explorer**: Deep dive into the physical and electrical behavior of Drivers, Cables, and Receivers.
- **Interactive SC-05-05 Taxonomy Tree**: A searchable, collapsible hierarchical mind map representing the complete AES SC-05-05 taxonomy.
- **Engineering Simulators**:
  - **CMRR & Resistor Tolerance Simulator**: Visualizes the impact of resistor bridge tolerances (5%, 1%, 0.1%, 0.01%) and source impedance imbalances ($\Delta Z_S$) with real-time waveform visualization.
  - **Cable Capacitance & High-Frequency Roll-off Calculator**: Calculates $-3\text{ dB}$ cutoff frequency, total capacitance, phase shift, and attenuation at 20 kHz based on cable length and driver impedance.
  - **Interconnection Compatibility Checker ("What Works with What")**: Select any source and receiver topology to discover real-world compatibility, level offsets, ground loop risk, and recommended wiring adapters.
- **AES-X152 Standardized Datasheet Framework**: Interactive preview of the 4-part disclosure template with presets for Studio Mic Preamps, Mastering DACs, and Passive DI Boxes.
- **High-Resolution Circuit Schematic Explorer**: Zoomable modal viewer showcasing the official SPICE circuit models for ground-referenced, active floating, and transformer-isolated topologies.
- **Literature & Deep Dives**: Normative standards (AES14, AES26, AES48, AES54, AES59, AES72, IEC 60268-3, IEC 61938) and references to Dennis Bohn (Rane Note 145), Bill Whitlock, Jim Brown, and John Woodgate.

---

## Local Development & Viewing

Open [`index.html`](index.html) directly in any modern web browser, or serve it locally using Python:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your web browser.

---

## Standards Committee & Acknowledgments

Developed in collaboration with the contributors of AES SC-05-05:
- **Anthony P. Kuzub** (SC-05-05 Chair & Project Editor)
- **Jim Brown**
- **Bill Whitlock**
- **John Woodgate**
- **David Josephson**
- **Richard L. Hess**
- **Jim Meyer**
- **Richard Cabot**
- **Kenneth Fause**
- **Jon Celli**
- **Peter Keller**
- **Andy Walker**
- **Dennis Bohn** (Rane Note 145 inspiration)
