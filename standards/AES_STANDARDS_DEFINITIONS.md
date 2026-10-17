# Official Engineering Terms & Definitions in AES & IEC Standards for Balanced Audio

Compiled by the Audio Engineering Society (AES) Standards Working Group SC-05-05 (Grounding and EMC Practices) and SC-04-04 (Microphones).  
Source Standards: **AES11, AES14, AES14id, AES26, AES48, AES54-1, AES54-2, AES54-3, AES59, AES72-4E, AES-X152, AES-X246, AES-X249, IEC 60268-3, IEC 61938**.

---

## 1. Fundamental Transmission & Circuit Concepts

### 1.1 Balanced Interconnection (Normative: IEC 60268-3 §3.2, AES-X152)
> **Definition:** A transmission circuit consisting of two signal conductors and an optional shield, where both signal conductors have equal impedances to a common reference potential (usually equipment chassis or earth ground).
* **Mathematical Requirement:**
  $$Z_{\text{hot-to-ref}} = Z_{\text{cold-to-ref}} \quad \text{across the full audio bandwidth (20 Hz to 20 kHz)}$$
* **Fundamental Axiom:** Noise immunity in a balanced line does **NOT** depend on equal or opposite signal voltages on the two conductors. It depends **solely on the equality of common-mode impedances** of the source, transmission line, and receiver. Signal symmetry is secondary; impedance balance is mandatory.

### 1.2 Common-Mode Rejection Ratio (CMRR) (AES-X152, IEC 60268-3)
> **Definition:** The ratio of differential gain ($A_d$) to common-mode gain ($A_{cm}$) of a differential receiver, expressed in decibels.
$$\text{CMRR} = 20 \log_{10} \left( \frac{|A_d|}{|A_{cm}|} \right) \text{ dB}$$
* **Normative Test Condition (IEC 60268-3, AES-X152):** CMRR shall be measured under a severe $10\,\Omega$ source impedance unbalance ($\Delta Z = 10\,\Omega$) to verify immunity in real-world broadcast and stage installations.
* **Benchmark Target:** Superior differential receivers (such as the THAT InGenius topology or precision Jensen input transformers) achieve $> 90\text{ dB}$ CMRR at 60 Hz even with a $10\,\Omega$ or $50\,\Omega$ leg imbalance.

### 1.3 Impedance Balance ($\Delta Z$) & Balance Factor ($B$) (AES-X152, IEC 60268-3)
> **Definition:** The difference between the impedances of the two signal conductors to ground, and the fractional balance ratio:
$$\Delta Z = |Z_{\text{hot}} - Z_{\text{cold}}|$$
$$B = \frac{|Z_{\text{hot}} - Z_{\text{cold}}|}{Z_{\text{hot}} + Z_{\text{cold}}} \times 100\%$$
* If $\Delta Z = 0\,\Omega$ ($B = 0\%$), common-mode noise induces identical voltages on both legs:
  $$V_{\text{cm, hot}} = V_{\text{cm, cold}} \implies V_{\text{diff, error}} = V_{\text{cm, hot}} - V_{\text{cm, cold}} = 0\text{ V}$$
* If $\Delta Z > 0\,\Omega$, a portion of the common-mode interference converts directly into differential audio noise:
  $$V_{\text{diff}} = V_{\text{cm}} \times \left( \frac{\Delta Z}{Z_{\text{in, cm}}} \right)$$

### 1.4 Bridging Interconnection (AES-X152 Part 1 §4.1)
> **Definition:** An interconnection method where the input impedance of the receiver is significantly higher than the output impedance of the driver:
$$Z_{\text{in}} \ge 10 \times Z_{\text{out}}$$
* Standard line-level bridging: $Z_{\text{out}} \le 100\,\Omega$, $Z_{\text{in}} \ge 10\,\text{k}\Omega$ to $20\,\text{k}\Omega$.
* **Rationale:** Maximizes voltage transfer ($\approx 0\text{ dB}$ loss), minimizes amplifier output stage distortion, and allows daisy-chaining multiple receivers to a single driver without requiring terminating resistors or matching pads.

---

## 2. Grounding, Shielding & EMC Definitions (AES48, AES-X249, AES54)

### 2.1 The Pin 1 Problem (Muncy 1995, AES48-2019 §4)
> **Definition:** The audio defect caused by terminating the cable shield contact (Pin 1 in XLR connectors, or sleeve/pin contacts) to an internal signal reference ground (0V reference) on a printed circuit board, instead of directly to the metallic equipment enclosure.
* **Mechanism:** Shield currents induced by power mains ground loops, magnetic fields, or ambient RF flow through internal PCB ground traces. The non-zero impedance of the trace ($Z = R + j\omega L$) develops an audible error voltage:
  $$V_{\text{error}} = I_{\text{shield}} \times Z_{\text{trace}}$$
  Because internal preamplifiers reference this same trace, the noise voltage is amplified and output as 50/60 Hz hum and RF demodulation buzz.

### 2.2 Direct Chassis Bonding (AES48-2019 §4.2, AES-X249)
> **Definition:** The normative practice of bonding the cable shield contact and connector outer metallic shroud directly to the metallic equipment enclosure (chassis) at the immediate entrance of the connector, via the shortest practical path.
* **Maximum Bonding Impedance:** $< 0.1\,\Omega$ at power line frequencies (50/60 Hz) and lowest practical inductance at RF frequencies ($< 2\,\text{nH}$).
* **Imperative:** Cable shield currents must be shunted around internal circuits into the chassis perimeter (Faraday cage), bypassing audio circuit 0V reference traces completely.

### 2.3 Shield-Current-Induced Noise (SCIN) (Brown & Whitlock 2003, AES Preprint 5747)
> **Definition:** Differential noise voltage induced into the balanced signal conductors by shield currents flowing along the cable length, caused by physical and capacitive asymmetry between the conductors and the shield:
$$\Delta C = C_{\text{hot-shield}} - C_{\text{cold-shield}}$$
$$V_{\text{diff}} = I_{\text{shield}} \times \omega \times \Delta M \quad \text{or} \quad V_{\text{cm}} \times \left( \frac{\Delta C}{C_{\text{total}}} \right)$$
* Minimized by Star-Quad geometry (four-conductor cross-connected quad) and precision bonded pairs, which achieve $> 30\text{ dB}$ higher rejection of magnetic and shield current induction than conventional two-conductor twisted pair.

---

## 3. Circuit Topologies (AES-X152 Part 1 §6)

### 3.1 Type P: Ground-Referenced Push-Pull Driver (AES-X152 §6.1)
* Two active operational amplifiers driving equal and opposite audio signal voltages referenced to circuit 0V.
* **Leg Voltages:** $V_{\text{hot}} = +V_s$, $V_{\text{cold}} = -V_s$. Total differential output $V_{\text{diff}} = 2V_s$.
* **Unbalanced Connection Rule (CRITICAL):**
  * Pin 2 (Hot) connects to Tip (+).
  * **Pin 3 (Cold) MUST BE LEFT UNCONNECTED (FLOATED)! NEVER SHORT PIN 3 TO GROUND!**
  * *Failure Mode:* Shorting Pin 3 to ground forces the inverting op-amp into short-circuit current limiting, causes thermal overheating, creates asymmetric power rail ripple, and injects severe distortion into other channels.

### 3.2 Type I: Impedance-Balanced Output Driver (AES-X152 §6.2)
* Only **ONE** active amplifier drives Pin 2 (Hot). Pin 3 (Cold) is tied to ground through a precision passive network matching the output impedance of the active driver ($Z_{\text{hot}} = Z_{\text{cold}}$).
* **Signal Voltage:** Pin 2 carries the full audio signal voltage ($V_s$); Pin 3 carries 0V audio signal.
* **Common-Mode Rejection:** 100% intact because common-mode interference induces identical voltages on both identical $Z$ legs, which cancel completely in the differential receiver.
* **Unbalanced Connection Rule:** Pin 2 to Tip; Pin 3 may be tied to Pin 1/Sleeve or left floating without loss of signal or amplifier stress.

### 3.3 Type F: Active Floating / Cross-Coupled Driver (AES-X152 §6.5)
* An active circuit utilizing negative cross-feedback between hot and cold drivers (e.g. THAT OutSmarts, THAT 1646, Analog Devices SSM2142) to emulate a true floating transformer secondary winding.
* **Differential Level:** $+4\text{ dBu}$ ($1.228\text{ V}_{\text{RMS}}$).
* **Unbalanced Connection Rule:**
  * Pin 2 connects to Tip (+).
  * **Pin 3 MUST BE BONDED TO PIN 1 (GROUND)!**
  * *Automatic Level Compensation:* Grounding Pin 3 triggers cross-coupled feedback that automatically transfers the gain to Pin 2, maintaining full output level without 6 dB loss.

### 3.4 Type T: Transformer Isolated Driver (AES-X152 §6.3, §6.4)
* True galvanic isolation via magnetic coupling across primary and secondary windings.
* Provides infinite DC isolation and very high RF common-mode impedance ($> 100\text{ k}\Omega$ at 60 Hz).
* **Unbalanced Connection Rule:** Pin 2 connects to Tip (+); Pin 3 **MUST BE CONNECTED TO SLEEVE (GROUND)** to complete the closed AC current circuit loop through the secondary winding.

---

## 4. Multichannel Connectors & Multi-Conductor Trunks

### 4.1 AES59: 25-Way D-Sub Connector for 8-Channel Balanced Audio
* Standard 25-pin D-subminiature connector carrying 8 balanced analog or AES3 digital audio channels.
* **Pin Allocation Scheme (Tascam Standard):**
  * **Ch 1:** Pin 24 (+), Pin 12 (&minus;), Pin 25 (Shield)
  * **Ch 2:** Pin 10 (+), Pin 23 (&minus;), Pin 11 (Shield)
  * **Ch 3:** Pin 21 (+), Pin 9 (&minus;), Pin 22 (Shield)
  * **Ch 4:** Pin 7 (+), Pin 20 (&minus;), Pin 8 (Shield)
  * **Ch 5:** Pin 18 (+), Pin 6 (&minus;), Pin 19 (Shield)
  * **Ch 6:** Pin 4 (+), Pin 17 (&minus;), Pin 5 (Shield)
  * **Ch 7:** Pin 15 (+), Pin 3 (&minus;), Pin 16 (Shield)
  * **Ch 8:** Pin 1 (+), Pin 14 (&minus;), Pin 2 (Shield)
  * **Pin 13:** **STRICTLY NO CONNECT (NC). Never tie audio, shield, or chassis to Pin 13!**
* **Equipment Gender Conventions:**
  * Equipment Inputs: DB25 **Female (Sockets)**
  * Equipment Outputs: DB25 **Female (Sockets)**
  * Multi-channel Snake Cables: DB25 **Male (Pins)** on both ends.
* **AES-X249 Mandate:** Outer metallic shroud flange ($C_{sf}$) and threaded jack screws ($C_{js}$) must bond directly metal-to-metal to the equipment chassis (AES48).

### 4.2 AES72-4E: Quad Twisted Pair (QTP) over Category Cable
* Transports 4 balanced analog audio channels over standard Category 5e/6/6A/7/8 structured cable with 8P8C (RJ45 / etherCON) connectors.
* **Type 4E Rule (Even Pins Positive):**
  Conforms to TIA-568-B color-code pairing:
  * **☀️ Link 1 / Pair 2 (SUN - Orange):** Pin 2 Hot (+), Pin 1 Cold (&minus;)
  * **🌱 Link 2 / Pair 3 (GRASS - Green):** Pin 6 Hot (+), Pin 3 Cold (&minus;)
  * **☁️ Link 3 / Pair 1 (SKY - Blue):** Pin 4 Hot (+), Pin 5 Cold (&minus;)
  * **🌍 Link 4 / Pair 4 (EARTH - Brown):** Pin 8 Hot (+), Pin 7 Cold (&minus;)
  * **Mandatory Rule:** **Pins 2, 4, 6, 8 are positive (+)**.
* **Continuous Overall Shield:** Shielded Cat cable (STP/FTP) must utilize etherCON or shielded RJ45 metal shroud bonded 360° to equipment chassis ground for AES48 compliance and P48 phantom power return.

---

## 5. Discrete XLR & TRS Connector Standards (AES14, AES14id, AES26)

### 5.1 AES14: XLR Circular Connector Allocations
* **Pin 1:** Cable Shield / Protective Earth. Bonds directly to equipment metallic enclosure (chassis) per AES48.
* **Pin 2:** Signal In-Phase / Hot (+). Positive acoustic pressure at transducer produces positive electrical potential on Pin 2 relative to Pin 3 (AES26).
* **Pin 3:** Signal Inverted / Cold (&minus;). Reference return leg.
* **Gender Rule:**
  * **Equipment Outputs:** **MALE (Pins)**
  * **Equipment Inputs:** **FEMALE (Sockets)**
  * **Microphone Output:** **MALE (Pins)**

### 5.2 AES14id: Concentric 1/4" Phone Plugs & Jacks (TRS / TS)
* **Tip (T):** Signal In-Phase / Hot (+)
* **Ring (R):** Signal Inverted / Cold (&minus;)
* **Sleeve (S):** Shield / Chassis ground.

### 5.3 AES26: Conservation of Audio Signal Polarity
* Establishes unbroken acoustic-to-electrical-to-acoustic polarity:
  1. A positive acoustic pressure wave entering a microphone diaphragm MUST produce a **positive electrical voltage on Pin 2** (XLR) or Tip (TRS) relative to Pin 3 / Ring.
  2. A positive electrical voltage on Pin 2 entering a power amplifier MUST cause the loudspeaker cone to move **forward (outward)**, generating a positive acoustic compression wave in air.

---

## 6. Microphone Powering Standards (IEC 61938)

### 6.1 P48 Phantom Power (IEC 61938 §5.1)
* **Supply Voltage:** $+48\text{ VDC} \pm 4\text{ V}$ (44.0V to 52.0V).
* **Resistor Matching:** Matched $6.81\text{ k}\Omega \pm 0.1\%$ ($0.4\%$ absolute maximum) series feed resistors to Pins 2 & 3.
* **DC Current Limit:** Maximum permissible current draw is $10.0\text{ mA}$ per microphone transducer.
* **DC Return Loop:** Cable Shield (Pin 1) serves as the **sole DC return conductor**! Lifting or disconnecting Pin 1 immediately unpowers the microphone.

### 6.2 P24 & P12 Phantom Power (IEC 61938 §5.2, §5.3)
* **P24:** $+24\text{ VDC} \pm 1\text{ V}$, feed resistors $1.21\text{ k}\Omega \pm 0.1\%$, max $10\text{ mA}$.
* **P12:** $+12\text{ VDC} \pm 1\text{ V}$, feed resistors $680\,\Omega \pm 0.1\%$, max $15\text{ mA}$.

### 6.3 T-Power (A-B Powering / DIN 45595)
* Obsolete 12V powering through $180\,\Omega$ series resistors directly across Pin 2 and Pin 3 ($12\text{V}$ potential difference across signal conductors, DC isolated from Pin 1). Strictly incompatible with modern P48 condenser microphones!
