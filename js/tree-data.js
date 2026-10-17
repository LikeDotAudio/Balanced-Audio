/**
 * AES-SC-05-05 X152 - Full Taxonomy Tree Data
 * Extracted from SC-05-05-X152-Map-20210217 and Working Group Drafts
 */

const X152_TREE_DATA = {
  id: "root",
  name: "⚖️ Balanced Analog Audio Interconnection",
  subtitle: "AES-SC-05-05 / AES-X152 Taxonomy",
  description: "The complete system model defining the interaction between Driver (Transmitter), Interconnecting Cable, and Receiver (Input Load).",
  category: "root",
  children: [
    {
      id: "transmitter",
      name: "📡 Part I: Transmitter (Driver / Source)",
      subtitle: "Audio Signal Source & Output Stage",
      description: "The generating device's output circuitry, source impedance, voltage swing, and chassis reference.",
      category: "part1",
      children: [
        {
          id: "tx-topologies",
          name: "⚖️ Output Topologies",
          subtitle: "Circuit Implementations",
          description: "Circuit designs used to drive balanced audio lines, each presenting unique behaviors into balanced and unbalanced loads.",
          children: [
            {
              id: "tx-transformer",
              name: "📯 Transformer Floating Output",
              tag: "Type Tx",
              description: "Galvanically isolated winding with no connection to earth ground. Inherent floating behavior; shorts on either leg to ground simply refer the circuit to that potential without signal loss.",
              pros: "Infinite DC isolation, outstanding galvanic isolation, unaffected by ground voltage offsets.",
              cons: "Bulk, weight, saturation distortion at high levels/low frequencies, cost."
            },
            {
              id: "tx-transformer-ct",
              name: "📯 Transformer with Center Tap",
              tag: "Type Tx-CT",
              description: "Transformer output with center tap tied to chassis ground or bias supply, providing common-mode DC referencing.",
              pros: "Symmetrical voltage references, provides DC phantom/bias path.",
              cons: "Loss of fully floating isolation; grounding either leg shorts half the winding."
            },
            {
              id: "tx-cross-coupled",
              name: "🔄 Cross-Coupled Active Floating",
              tag: "Servo-Balanced",
              description: "Electronically balanced circuit using cross-feedback op-amps to emulate a floating transformer winding. When one leg is grounded, the opposing leg doubles its output voltage (+6 dB) so overall differential level remains unchanged.",
              pros: "Transparent sound, identical level into balanced or unbalanced loads, wide bandwidth.",
              cons: "Susceptible to stability issues or excessive current if pin 3 is accidentally left open instead of grounded."
            },
            {
              id: "tx-push-pull",
              name: "⚡ Electronic Push-Pull",
              tag: "Dual Op-Amp",
              description: "One op-amp drives non-inverted (+) signal, a second op-amp drives inverted (-) signal. Both referenced to circuit 0V.",
              pros: "High output voltage swing (+28 dBu), low cost, low distortion.",
              cons: "If pin 3 is grounded when connecting to unbalanced gear, the inverted op-amp is shorted directly to ground, causing distortion and high current draw."
            },
            {
              id: "tx-impedance-balanced",
              name: "🎯 Impedance Balanced Output",
              tag: "Type Z",
              description: "Audio signal is driven ONLY onto Pin 2 (Hot). Pin 3 (Cold) is tied to ground through an identical passive resistor/capacitor matching the Pin 2 output impedance exactly.",
              pros: "100% identical Common-Mode Rejection to fully symmetrical drivers at a fraction of the cost, completely immune to output short circuits.",
              cons: "Provides 6 dB lower signal level when feeding unbalanced inputs; often misunderstood by marketing departments."
            }
          ]
        },
        {
          id: "tx-impedance",
          name: "🚦 Source Impedance ($Z_{OUT}$)",
          subtitle: "Output Impedance Characteristics",
          description: "Crucial parameter determining line-driving capability, cable capacitance roll-off, and common-mode balance.",
          children: [
            {
              id: "tx-dmz",
              name: "Differential Mode Impedance (DMZ)",
              description: "The impedance measured across Pin 2 and Pin 3 ($Z_{PO} + Z_{RO}$). Typical pro line output: 50 Ω to 200 Ω."
            },
            {
              id: "tx-cmz",
              name: "Common Mode Impedance (CMZ)",
              description: "The impedance of Pin 2 and Pin 3 in parallel relative to chassis ground. Dictates how common-mode noise voltages develop."
            },
            {
              id: "tx-balance-ratio",
              name: "Impedance Balance Criterion (IEC 60268-3)",
              description: "Output is classified as Balanced if $Z_{PO}$ and $Z_{RO}$ are matched within 10% (or tighter) across the full operating bandwidth (20 Hz - 20 kHz)."
            },
            {
              id: "tx-min-load",
              name: "Minimum Rated Load Impedance ($R_{L,min}$)",
              description: "The lowest load impedance (typically 600 Ω or 2 kΩ) into which the output can deliver rated output level without exceeding specified THD."
            }
          ]
        },
        {
          id: "tx-levels",
          name: "🎚 Output Levels & Dynamics",
          subtitle: "Headroom & Signal Capacity",
          description: "Signal voltages and distortion thresholds specified under defined load conditions.",
          children: [
            {
              id: "tx-nominal",
              name: "Nominal Operating Level",
              description: "+4 dBu (1.228 VRMS) for professional audio equipment; -10 dBV (316 mVRMS) for consumer."
            },
            {
              id: "tx-max-level",
              name: "Maximum Output Level (Clip Point)",
              description: "Smallest output level (dBu) producing rated distortion (1% THD) into rated minimum load across 10 Hz – 50 kHz. Typically +24 dBu to +28 dBu in pro gear."
            },
            {
              id: "tx-drive-current",
              name: "Maximum Drive Current",
              description: "Maximum peak current before clipping or slew-rate limiting, determining ability to drive long, high-capacitance cables."
            }
          ]
        },
        {
          id: "tx-grounding",
          name: "🛡 Shielding & System Reference",
          subtitle: "AES48 Compliance",
          description: "The structural bond between connector shell, shield pin, circuit ground, and enclosure.",
          children: [
            {
              id: "tx-aes48",
              name: "AES48 Pin 1 to Chassis Bond",
              description: "XLR Pin 1 must connect directly to the chassis/metallic enclosure with negligible impedance (< 0.1 Ω), never routed to the internal audio PCB ground plane."
            },
            {
              id: "tx-dc-protection",
              name: "DC & Phantom Fault Protection",
              description: "Protection diodes and DC blocking capacitors preventing catastrophic failure if +48V phantom power is inadvertently applied to the line output."
            },
            {
              id: "tx-rf-containment",
              name: "RF Containment & Immunity",
              description: "Ferrite beads and small ceramic capacitors (e.g., 100 pF) at the connector shell to shunt incoming radio frequencies before they enter the enclosure."
            }
          ]
        }
      ]
    },
    {
      id: "cable",
      name: "〰️ Part II: Interconnecting Cable & Connectors",
      subtitle: "The Transmission Medium",
      description: "The metallic pathway carrying signal and shielding, defining parasitic capacitance, magnetic loop rejection, and connector geometry.",
      category: "part2",
      children: [
        {
          id: "cable-types",
          name: "🧵 Cable Construction Geometries",
          subtitle: "Conductor Arrangements",
          description: "Physical layout of the signal-carrying conductors and their spatial relationship to external electromagnetic fields.",
          children: [
            {
              id: "cable-stp",
              name: "Shielded Twisted Pair (STP)",
              tag: "Standard Pro Audio",
              description: "Two insulated conductors twisted together with a continuous metallic shield. Twisting ensures external magnetic and electrostatic fields induce equal voltages onto both conductors.",
              pros: "Flexible, economical, industry standard for mic and line runs up to several hundred feet.",
              cons: "Susceptible to low-frequency hum when placed in close proximity to massive power transformers."
            },
            {
              id: "cable-starquad",
              name: "Star-Quad Cable (4-Conductor)",
              tag: "Maximum Rejection",
              description: "Four conductors arranged in a tight cross formation; opposing pairs are connected in parallel (+ with +, - with -).",
              pros: "Provides 20 dB to 30 dB superior rejection of hum and EMI from power cables and lighting dimmers.",
              cons: "Higher conductor-to-conductor capacitance (approx. 150 pF/m vs 70 pF/m), causing faster high-frequency roll-off on long runs."
            },
            {
              id: "cable-utp",
              name: "Unshielded Twisted Pair (UTP) - AES72",
              tag: "Cat5e / Cat6",
              description: "Multi-pair network cable using tight, staggered twist pitches without individual shields. Formalized in standard AES72 for multichannel balanced audio.",
              pros: "Extremely low cost, ubiquitous, lightweight, predictable capacitance.",
              cons: "No outer metallic shield against extreme electrostatic RF fields; relies entirely on CMRR of the receiver."
            }
          ]
        },
        {
          id: "cable-shielding",
          name: "🛡 Shielding Types",
          subtitle: "Electromagnetic Barriers",
          description: "The conductive layer surrounding the audio conductors to intercept electrostatic noise.",
          children: [
            {
              id: "shield-braid",
              name: "Braided Copper Shield",
              description: "Interwoven strands of tinned or bare copper providing 85% to 95% physical coverage. Highest mechanical durability and lowest shield resistance."
            },
            {
              id: "shield-spiral",
              name: "Spiral (Serve) Shield",
              description: "Parallel copper strands wrapped spirally around conductors. Highly flexible for stage microphones, but can open up when bent sharply."
            },
            {
              id: "shield-foil",
              name: "Aluminized Foil + Drain Wire",
              description: "100% electrostatic coverage with a tinned drain wire. Best for permanent installation, but poor flex life in portable applications."
            }
          ]
        },
        {
          id: "cable-connectors",
          name: "🔌 Connector Standards",
          subtitle: "Interface Hardware",
          description: "Standardized pinouts and contact geometries governing physical audio interconnects.",
          children: [
            {
              id: "conn-aes14",
              name: "AES14 (3-Pin XLR)",
              description: "Pin 1: Shield / Chassis ground; Pin 2: Positive / Hot; Pin 3: Negative / Cold (IEC 60268-12 and AES26 polarity compliant)."
            },
            {
              id: "conn-trs",
              name: "AES14id (1/4\" 6.35mm TRS)",
              description: "Tip: Hot (+); Ring: Cold (-); Sleeve: Shield / Chassis Ground. Commonly used on compact consoles and audio interfaces."
            },
            {
              id: "conn-aes59",
              name: "AES59 (25-Way D-Sub / DB25)",
              description: "Carries 8 balanced channels in a single connector. Standardized pinout for pro recording consoles and multi-channel converters."
            },
            {
              id: "conn-aes72",
              name: "AES72 (8P8C / RJ45 Quad Audio)",
              description: "Standard for transporting 4 channels of analog or AES3 digital audio over Cat5/6 cable using standard 8P8C modular connectors."
            }
          ]
        },
        {
          id: "cable-parasitics",
          name: "📉 Transmission Parasitics",
          subtitle: "Capacitance & Length Limits",
          description: "Distributed capacitance and resistance forming a low-pass filter with the source impedance.",
          children: [
            {
              id: "cable-cap",
              name: "Capacitance per Meter (pF/m)",
              description: "Typically 60 pF/m to 160 pF/m. Interacts with driver source impedance $Z_{OUT}$ to dictate high-frequency bandwidth cutoff ($f_{-3dB} = 1 / (2\\pi R C)$)."
            },
            {
              id: "cable-length",
              name: "Maximum Practical Cable Run",
              description: "Determined by $Z_{OUT}$, cable capacitance, and allowable high-frequency attenuation at 20 kHz (typically < 0.5 dB loss)."
            }
          ]
        }
      ]
    },
    {
      id: "receiver",
      name: "📥 Part III: Receiver (Input / Load)",
      subtitle: "Audio Signal Input & Load Stage",
      description: "The receiving device's input amplifier, common-mode rejection, input impedance, and phantom power provision.",
      category: "part3",
      children: [
        {
          id: "rx-topologies",
          name: "⚖️ Input Topologies",
          subtitle: "Differential Input Circuits",
          description: "Active and passive circuits designed to subtract common-mode noise and amplify differential audio signals.",
          children: [
            {
              id: "rx-transformer",
              name: "📯 Transformer Input",
              tag: "Passive Magnetic",
              description: "Input transformer providing pure galvanic isolation. Very high common-mode rejection (often > 100 dB at 60 Hz) that remains virtually unaffected by source impedance imbalances.",
              pros: "Immune to source resistance mismatch, blocks DC and ground voltage differentials completely.",
              cons: "Cost, weight, magnetic susceptibility to stray hum fields unless enclosed in Mu-metal cans."
            },
            {
              id: "rx-simple-opamp",
              name: "🪀 Simple Single Op-Amp Differential",
              tag: "Standard Difference Amp",
              description: "Single operational amplifier with 4 matched resistors ($R_1, R_2, R_3, R_4$). Common in budget gear.",
              pros: "Lowest cost, simple parts count, compact PCB area.",
              cons: "Asymmetric input impedance: inverting input impedance is significantly lower than non-inverting input impedance, degrading real-world CMRR when driven by unbalanced sources."
            },
            {
              id: "rx-dual-opamp",
              name: "🔄 Dual Op-Amp (Current / Voltage Mode)",
              tag: "Current Mode Buffer",
              description: "Two op-amps configured to balance input currents or provide buffered differential amplification.",
              pros: "Better impedance symmetry than single op-amp, improved CMRR across frequency.",
              cons: "Higher noise than discrete transformer or specialized instrumentation amplifiers."
            },
            {
              id: "rx-instrumentation",
              name: "🏛 Instrumentation Amplifier (Triple Op-Amp)",
              tag: "Type INA",
              description: "Two high-impedance input buffer op-amps feeding a precision difference amplifier stage (e.g. THAT 1512 or discrete equivalent).",
              pros: "Extremely high and perfectly matched input impedance on both pins (> 10 MΩ common-mode), stellar CMRR (> 90 dB), low noise.",
              cons: "Requires precision laser-trimmed resistor network or integrated circuit fabrication."
            }
          ]
        },
        {
          id: "rx-cmrr",
          name: "🛡 Common-Mode Rejection Ratio (CMRR)",
          subtitle: "Noise Elimination Performance",
          description: "The fundamental figure of merit for a balanced receiver: the ratio of differential gain to common-mode gain.",
          children: [
            {
              id: "cmrr-resistor",
              name: "Resistor Tolerance Dependence",
              description: "In an active differential stage, a 1% resistor mismatch limits theoretical CMRR to only 46 dB! A 0.1% tolerance achieves 66 dB, and 0.01% achieves 86 dB."
            },
            {
              id: "cmrr-iec60268",
              name: "IEC 60268-3 Real-World Test",
              description: "Standardized test injecting common-mode voltage with a 10 Ω or 600 Ω impedance imbalance in one leg, exposing real-world CMRR degradation."
            },
            {
              id: "cmrr-frequency",
              name: "CMRR vs Frequency Degradation",
              description: "While many products claim 80 dB CMRR at 60 Hz, stray capacitance imbalances often degrade CMRR to 40 dB or worse at 10 kHz."
            }
          ]
        },
        {
          id: "rx-impedance",
          name: "🚦 Input Impedance ($Z_{IN}$)",
          subtitle: "Load Characteristics",
          description: "Impedance presented to the driving source, categorized into differential and common-mode values.",
          children: [
            {
              id: "rx-dmz",
              name: "Differential Input Impedance ($DMZ_{IN}$)",
              description: "Line inputs typically specify $\\ge 10\\,\\text{k}\\Omega$ (bridging input); microphone inputs typically specify $1.5\\,\\text{k}\\Omega$ to $3\\,\\text{k}\\Omega$."
            },
            {
              id: "rx-cmz",
              name: "Common Mode Input Impedance ($CMZ_{IN}$)",
              description: "Impedance from each pin to chassis ground. Must be tightly matched to avoid turning common-mode noise into differential signal."
            }
          ]
        },
        {
          id: "rx-phantom",
          name: "👻 Phantom Power Supply (IEC 61938 P48)",
          subtitle: "Microphone Powering",
          description: "Standard +48 VDC delivered through two matched 6.81 kΩ resistors to Pins 2 and 3.",
          children: [
            {
              id: "p48-matching",
              name: "Resistor Matching Requirement",
              description: "IEC 61938 requires the pair of 6.81 kΩ feed resistors to match within 0.1% or better, or microphone noise rejection is severely compromised."
            },
            {
              id: "p48-capacity",
              name: "Current Capacity & Sag",
              description: "Standard specifies up to 10 mA per microphone channel. Budget preamps with inadequate power supplies sag significantly when multi-channel condenser mics are connected."
            }
          ]
        },
        {
          id: "rx-max-levels",
          name: "🎚 Sensitivity & Overload Thresholds",
          subtitle: "Operating Limits",
          description: "Maximum input voltage before internal preamplifier or ADC clipping occurs.",
          children: [
            {
              id: "rx-max-input",
              name: "Maximum Input Level",
              description: "Highest level in dBu that can be applied without causing clipping distortion that cannot be removed by the input gain control."
            },
            {
              id: "rx-ein",
              name: "Equivalent Input Noise (EIN)",
              description: "Theoretical noise floor of the preamplifier referenced to its input, measured with a 150 Ω source impedance (typically -128 dBu to -130 dBu)."
            }
          ]
        }
      ]
    },
    {
      id: "standards-matrix",
      name: "📋 Part IV: AES-X152 Standards & Datasheet Report",
      subtitle: "The Disclosure Specification Framework",
      description: "The 4-part reporting standard created by SC-05-05 to ensure clear, consistent, and predictable interoperability documentation.",
      category: "part4",
      children: [
        {
          id: "spec-part1",
          name: "Part 1: Interconnection Framework & Scope",
          description: "Defines the tripartite interaction (Driver, Cable, Receiver), normative references, and compliance declaration rules."
        },
        {
          id: "spec-part2",
          name: "Part 2: Signal & Interface Topologies (Annex 1-5)",
          description: "Standardized disclosure of input and output impedances, balancing topology classification, and AES48 chassis ground compliance."
        },
        {
          id: "spec-part3",
          name: "Part 3: Signal Levels, Bandwidth & Power (Annex 1-7)",
          description: "Reference operating levels (+4 dBu / -10 dBV), headroom before clip, P48 phantom capabilities, bandwidth (±0.5 dB), and channel crosstalk."
        },
        {
          id: "spec-part4",
          name: "Part 4: Audio Distortion, Noise & CMRR (Annex 1-7)",
          description: "Total Harmonic Distortion (THD up to 5th harmonic), THD+N across 20 Hz - 20 kHz, Equivalent Input Noise (EIN), Signal-to-Noise Ratio (SNR), and real-world CMRR."
        }
      ]
    }
  ]
};
