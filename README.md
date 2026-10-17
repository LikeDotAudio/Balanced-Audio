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

## LUCKY 8050A True RMS Digital Multimeter (Yellow Phosphor)

The benchtop multimeter is faithfully modeled after the iconic 1970s bench DMM, rebranded as **LUCKY 8050A**:
- **Yellow Phosphor Display**: Rendered with high-visibility amber/yellow glowing vacuum-fluorescent typography (`#facc15`).
- **Auto & Selectable Ranges**:
  - Automatically ranges between millivolts and volts (`AUTO` mode active by default).
  - Selectable pushbuttons: `AUTO`, `200mV`, `2V`, `20V`, and `200V`.
  - True physical overload detection with vintage `O.L.` display.
- **4-Way Measurement Modes**:
  - **`+VE HOT (PIN 2)`**: Probes Pin 2 non-inverting audio signal, reporting $V_{RMS}$ and calibrated audio level in $\text{dBu}$.
  - **`-VE COLD (PIN 3)`**: Probes Pin 3 cold leg, revealing the $180^\circ$ inverted wave in push-pull circuits, or the flatline $0\text{ V}$ condition in impedance-balanced circuits.
  - **`THD & CMRR`**: Precision harmonic distortion ratio (THD+N %), distortion attenuation ($\text{dB}$), and common-mode rejection ratio ($>90\text{ dB}$).
  - **`MULTI`**: Simultaneous multi-parameter readout showing $+VE / -VE$, Differential Load Voltage / Current, and CMRR / THD metrics.

---

## Hewlett-Packard 353A Patch Panel (Manual 00353-90003)

Faithfully implemented from the official Hewlett-Packard Operating and Service Manual (HP Part No. 00353-90003):
- **Impedance Matching & Bridging Network**:
  - **Output Impedance ($Z_{OUT}$)**: 135 $\Omega$, 600 $\Omega$, 900 $\Omega$ selectable rotary switch.
  - **Input Termination ($Z_{IN}$)**: 135 $\Omega$, 600 $\Omega$, 900 $\Omega$, and 10 k$\Omega$ high-impedance bridging termination.
- **Dual Stepped Attenuators (0 to 110 dB)**:
  - 10 dB per step attenuator (0 to 100 dB).
  - 1 dB per step attenuator (0 to 10 dB).
  - Directly alters generator drive level and circuit attenuation in real time.
- **Pushbutton Mode Switches**:
  - **MEAS / CAL**: Toggles between measuring the circuit under test (MEAS) and referencing the direct calibration oscillator (CAL).
  - **FREQ**: Audio frequency range optimization ($<5\text{ kHz}$ vs $>5\text{ kHz}$).

---

## 4-Channel CRT Oscilloscope

The vintage CRT oscilloscope engine supports simultaneous 4-channel acquisition with individual channel toggles:
- **Channel Allocation**:
  - **CH1 (Ref)**: Audio Generator Input Reference ($V_{in}$) — Yellow (`#facc15`)
  - **CH2 (+VE)**: Pin 2 Hot Output Conductor ($V_{hot}$) — Cyan (`#38bdf8`)
  - **CH3 (-VE)**: Pin 3 Cold Output Conductor ($V_{cold}$) — Pink (`#f43f5e`)
  - **CH4 (Diff)**: Differential Signal across Load ($V_{diff}$) — Green (`#4ade80`)
- **Features**:
  - Individual channel pushbuttons to view 1, 2, 3, or all 4 traces simultaneously.
  - Dual timebase (.2ms, .5ms, 1ms, 2ms) and voltage scaling (.1V, .2V, .5V, 1V, 2V, 5V per division).
  - Realistic green phosphor persistence decay and graticule crosshair ticks.

---

## Time-Series Strip-Chart Trend Recorder

Integrated multi-channel strip-chart recorder logging measurement history over time:
- **Live Traces**: Plots +VE Hot (Yellow), -VE Cold (Cyan), and Differential Load (Green) signals in real time.
- **Auto-Scaling**: Dynamically adjusts vertical scale span ($\pm 2\text{V}$, $\pm 5\text{V}$, $\pm 10\text{V}$, $\pm 20\text{V}$).
- **Controls**: Interactive `PAUSE`/`REC` toggle and `CLEAR` buffer reset button.

---

## Measurement Data Points (MDP) with Dynamic Pointers

Interactive vector schematic callout system across Circuit 6.1 (Push-Pull) and Circuit 6.2 (Impedance-Balanced):
- **Visual Leader Pointers**: Distinct color-coded leader lines with pointer arrowheads pointing directly to circuit nodes:
  - **MDP-0**: Audio Drive Generator Input
  - **MDP-1**: Pin 2 (+VE Hot Terminal)
  - **MDP-2**: Pin 3 (-VE Cold Terminal)
  - **MDP-3**: Differential Load Terminals ($R_{LOAD}$)
- **Interactive Probing**: Clicking any MDP badge or pointer arrow automatically directs the test bench DMM and 4-channel oscilloscope to probe that specific node.

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
