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

---

## Standalone Single-File Distribution (`INDEX.htm-YYYYMMDD-HHMM.html`)

The portal is packaged into a 100% self-contained, standalone single-file distribution:
- **Snapshot File**: `INDEX.htm-YYYYMMDD-HHMM.html` (e.g., `INDEX.htm-20261017-1907.html`, ~1.69 MB).
- **Aliases**: `index.htm` and `index.html`.
- **Zero External Dependencies**: All CSS stylesheets, JavaScript application engines, SVG schematics, interactive LTP faders, CRT oscilloscope graphics, 20 AES-X152 working draft papers, and the 2,290-term Dennis Bohn Pro Audio Reference (PAR) glossary are fully embedded inline.
- **Offline Capable**: File sizes between 1.2 MB and 10 MB run offline anywhere directly via `file://` with no web server or internet connection required.
- **Rebuilding the Bundle**:
  ```bash
  python3 scripts/bundle.py [YYYYMMDD-HHMM]
  ```

---

## APK Precision AC Voltmeter & Calibrated Range Sensitivity

The test bench features the **APK Precision AC Voltmeter** (designed by Anthony Peter Kuzub, replacing the legacy 400FL designation):
- **14 Calibrated Ranges**:
  - `mV / dB`: `.1 mV` (-80 dB), `.3 mV` (-70 dB), `1 mV` (-60 dB), `3 mV` (-50 dB), `10 mV` (-40 dB), `30 mV` (-30 dB), `100 mV` (-20 dB).
  - `V / dB`: `.3 V` (-10 dB), `1 V` (0 dB), `3 V` (+10 dB nominal studio default), `10 V` (+20 dB), `30 V` (+30 dB), `100 V` (+40 dB), `300 V` (+50 dB).
- **Interactive Rotary Controls**:
  - **Click**: Click the fluted rotor to advance through ranges; Shift-click or secondary click to step backwards.
  - **Mouse Wheel**: Scroll directly over the knob or dial face to cycle ranges up or down.
  - **Drag**: Click and drag around the knob center to rotate naturally to any calibrated angle.
  - **Direct Tick Selection**: Click directly on any dial tick text or label (`1V`, `3V`, `10V`, `+10`, etc.) to jump the selector immediately.
- **True Physical Sensitivity**:
  - Needle deflection scales dynamically against the selected full-scale range: $f = V_{rms} / V_{range}$.
  - Overload signals ($V > 1.15 \times V_{range}$) deflect into the red $+2\text{ dB}$ overload region and peg against the mechanical stop at $+41^\circ$.
  - Higher voltage ranges attenuate deflection down toward mechanical zero ($-36^\circ$), replicating authentic moving-coil meter ballistics.
  - The breakaway floating test dock synchronizes with bench range settings and updates live sensitivity in real time.

---

## Local Development & Viewing

Open [`index.html`](index.html), [`index.htm`](index.htm), or any `INDEX.htm-YYYYMMDD-HHMM.html` file directly in any modern web browser, or serve it locally using Python:

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
