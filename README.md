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
- **The 100-Module AES-X152 Reference Curriculum**: 100 comprehensive technical Markdown documents (`modules/module-001-...md` to `modules/module-100-...md`) spanning 10 core engineering parts, featuring theoretical proofs, mathematical derivations, ASCII schematics, normative standards citations, and review assessments. These MD files feed directly into the interactive portal module browser and can be compiled into master syllabi and manifests.
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

## Permanent Left-Side Laboratory Instrument Rack

All laboratory test equipment is permanently docked in a **350px fixed left rack** that joins the navigation sidebar and **never scrolls** with the page:
- **Strict Square & Solid Black Aesthetic**:
  - `border-radius: 0` (strictly 90-degree square bezels and cards).
  - Pure solid black (`#000000`) with subtle grey borders (`#333333`) and zero background blur or radial gradient fades.
  - Padding optimized to eliminate all wasted space.
- **"No Text Until Someone Clicks the Meter"**:
  - Each instrument presents only its authentic hardware face at rest (CRT screen, glowing yellow vacuum-fluorescent digits, or analog needle dial).
  - Clicking any meter card toggles open a collapsible controls and telemetry drawer with sensitivity rotary ranges, Volts/Div and Time/Div buttons, and circuit probe dropdowns.

---

## Exactly Six Laboratory Instruments

1. **Oscilloscope 1 (Audio In & Pin 2 Hot)**:
   - **CH1 (Yellow `#facc15`)**: Generator Audio Input Drive ($V_{in}$).
   - **CH2 (Cyan `#38bdf8`)**: Pin 2 Hot Non-Inverting Line ($V_{hot}$).
   - Independent Volts/Div (`.2V`, `.5V`, `1V`, `2V`, `5V`) and shared Time/Div (`.2ms` to `2ms`).
2. **Oscilloscope 2 (Pin 3 Cold & Differential Load)**:
   - **CH3 (Pink `#f43f5e`)**: Pin 3 Cold Inverting Line ($V_{cold}$).
   - **CH4 (Green `#4ade80`)**: Differential Signal across terminating load ($V_{diff}$).
   - Visualizes inverted phase and reveals zero signal on impedance-balanced topologies.
3. **LUCKY 8050A True RMS DMM #1 (Input & Hot)**:
   - Model 8050A in high-contrast **Yellow Phosphor font** (`#facc15`).
   - Live True RMS AC Volts and calibrated Audio Level in $\text{dBu}$.
   - Selectable modes: `TRUE RMS`, `dBu LEVEL`, `PEAK`, `CREST FACTOR`.
4. **LUCKY 8050A True RMS DMM #2 (Differential / THD+N / CMRR)**:
   - High-contrast **Yellow Phosphor font** (`#facc15`).
   - Differential Load RMS voltage, THD+N percentage, and common-mode rejection ratio ($>95\text{ dB}$).
   - Selectable modes: `DIFF RMS`, `THD+N %`, `CMRR dB`, `ERROR Verr`.
5. **APK Precision AC Voltmeter #1 (Channel A: Drive In)**:
   - Modeled after laboratory needle voltmeters with aged ivory scale, red overload arc, and 300 ms mechanical needle ballistics.
   - Stepped sensitivity ranges: `0.1V (-20dB)` to `30V (+30dB)`.
6. **APK Precision AC Voltmeter #2 (Channel B: Load Out)**:
   - Precision analog needle voltmeter monitoring output level across balanced receiver load.

---

## Dynamic SVG Wires & User-Created Circuit Anchors

- **Live Dynamic Bézier Wires**:
  - Fullscreen fixed SVG overlay (`#live-probe-wires-svg`) renders physical colored leads extending from instrument terminal dots on the left rack across the screen directly to the probed schematic nodes or user anchors.
  - Automatically recalculates curved splines during scrolling, resizing, or circuit interaction.
- **Circuit Test Anchors (`[⚓ ANCHOR]`)**:
  - Click the `[⚓ ANCHOR]` toolbar button and click anywhere on any schematic or document text to drop a persistent circuit test anchor badge.
  - Probes and dynamic wires snap directly to user-placed anchors.
- **Universal Circuit Probing (`[🎯 POKE]`)**:
  - Click any pin, conductor, resistor, or ground loop node across all schematics to immediately attach scopes and multimeters.

---

## In-Page Vector SVGs Streamlined

To eliminate wasted vertical space and prevent redundant scrolling, bulky in-page duplicate vector SVG test benches in Section 3 and Section 4 have been retired from the document body. All live instrumentation is permanently anchored on the left rack.

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
