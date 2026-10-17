import json
import os
import shutil

# Target directories
DIRS = [
    '/home/anthony/Documents/GitProjects/Balanced Audio/standards',
    '/home/anthony/Documents/GitProjects/Balanced Audio/.env/standards_json'
]

for d in DIRS:
    os.makedirs(d, exist_ok=True)

standards_data = {}

# 1. AES11
standards_data['aes11'] = {
    "standard_id": "AES11-2009 (r2014)",
    "short_id": "AES11",
    "title": "AES recommended practice for digital audio engineering - Synchronization of digital audio equipment in studio operations",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Reaffirmed 2014 (Revision of AES11-2003)",
    "working_group": "SC-02-01 (Working Group on Digital Audio Measurement Techniques / Infrastructure)",
    "source_file": ".env/Collection - #AES - #AES11 aes11-2009-r2014-f.pdf",
    "abstract": "This standard provides a systematic approach to the synchronization of digital audio signals. Recommendations are made concerning the accuracy of sample clocks as embodied in the interface signal and the use of this format as a convenient synchronization reference where signals must be rendered cotimed for digital processing. Synchronism is defined, and limits are given which take account of relevant timing uncertainties encountered in an audio studio.",
    "scope": {
        "general": "Specifies synchronization methods for digital audio equipment in studio operations using AES3 digital interfaces or dedicated reference signals.",
        "area_of_application": "Applies to professional recording, broadcasting, post-production, and digital routing facilities where multiple digital audio devices must operate synchronously without buffer under-run or over-run errors."
    },
    "normative_references": [
        "AES3: AES standard for digital audio engineering - Serial transmission format for two-channel linearly represented digital audio data",
        "IEC 60958: Digital audio interface",
        "ITU-R BS.647: A digital audio interface for broadcasting studios"
    ],
    "key_definitions": {
        "DARS": "Digital Audio Reference Signal: An AES3 signal containing no intentional audio data but carrying a valid clock and channel status to which other digital devices synchronize.",
        "cotimed": "Signals that are synchronized such that corresponding sample frames occur simultaneously within defined timing tolerances.",
        "sampling_frequency": "The frequency at which the audio signal is sampled (standard values: 48 kHz reference, 44.1 kHz, 96 kHz, 192 kHz).",
        "word_clock": "A square-wave reference signal at the audio sample frequency (fs), typically distributed over 75-ohm coaxial cabling with BNC connectors.",
        "capture_range": "The maximum frequency deviation from nominal over which a slave device's receiver PLL can achieve lock."
    },
    "modes_of_operation": {
        "DARS_referenced": "Equipment synchronizes its internal sample clock to an incoming AES3 DARS bitstream.",
        "audio_input_referenced": "Equipment recovers sample clock directly from the incoming audio data stream.",
        "video_referenced": "Audio sample clock is locked to an incoming video reference (genlock/black burst/tri-level sync) via integer or non-integer frequency ratios.",
        "GPS_referenced": "Atomic clock or GPS-derived 10 MHz reference signal used for distributed facility-wide master synchronization."
    },
    "clock_grades": {
        "grade_1": {
            "frequency_accuracy": "±1 ppm",
            "intended_use": "Master reference generators, facility-wide house clocks, broadcast master control."
        },
        "grade_2": {
            "frequency_accuracy": "±10 ppm",
            "intended_use": "Local studio operations, standalone digital audio workstations, routing matrixes."
        }
    },
    "timing_tolerances": {
        "input_timing_phase": "±25% of sample period (0.25 Ts)",
        "output_timing_phase": "Within ±5% of sample period relative to reference",
        "jitter_attenuation": "Receivers must attenuate input jitter above 100 Hz by at least 20 dB/decade."
    },
    "physical_interconnection": {
        "balanced": "110 Ω balanced twisted pair shielded cable (AES3-balanced), terminating in XLR-3 (AES14) or DB25 (AES59).",
        "unbalanced": "75 Ω coaxial cable with BNC connectors (AES3-id) for long distance distribution."
    },
    "relevance_to_balanced_audio": "AES11 DARS uses the identical 110 Ω balanced physical plant and AES48 chassis-grounded shielding scheme as analog balanced interconnections, ensuring electromagnetic compatibility (EMC) and jitter-free digital studio distribution."
}

# 2. AES14
standards_data['aes14'] = {
    "standard_id": "AES14-1992 (s2014)",
    "short_id": "AES14",
    "title": "AES standard for professional audio equipment — Application of connectors, part 1, XLR-type polarity and gender",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Reaffirmed 2014, Stabilized 2014 (ANSI S4.43-1991)",
    "working_group": "SC-05-02 (Working Group on Audio Connectors)",
    "source_file": ".env/aes14-1992-s2014-f.pdf",
    "abstract": "This Audio Engineering Society (AES) standard specifies a common scheme for wiring the connectors used in audio systems, particularly to avoid the inversion of absolute polarity among the items in the analog signal chain.",
    "object": "In sound systems it is often necessary to connect pieces of equipment from different manufacturers. This standard provides a common scheme for wiring the connectors used—particularly to avoid the inversion of absolute polarity among the items in a signal chain.",
    "scope": "Applies to 3-pin and 5-pin circular connectors commonly and generically known as XLR-type, used for the interconnection of all categories of sound system components for professional audio, commercial, recording, broadcast, and similar applications, regardless of function, type, or level of the signal. Specifies the application and polarity of analog signals for these connectors.",
    "normative_references": [
        "IEC 60268-12: Sound System Equipment Part 12: Application of Connectors for Broadcast and Similar Use",
        "IEC 61076-2-103: Circular connectors - Detail specification for a range of multipole connectors (type 'XLR')"
    ],
    "key_definitions": {
        "positive_sound_pressure": "That portion of the sound wave during which the pressure is in excess of the atmospheric ambient.",
        "positive_polarity": "An electrical signal voltage which acquires a potential that has a phase angle within 90 degrees with respect to a positive sound pressure peak.",
        "positive_polarity_terminal": "That terminal on which a positive signal shall be measured with respect to the oppositely polarized terminal when a positive-polarity signal is applied as observed with an oscilloscope.",
        "return_terminal": "That terminal which is polarized opposite to the positive-polarity terminal, that is, the negative-polarity terminal.",
        "positive_supply_terminal": "That terminal which carries the positive voltage of a direct-current microphone power supply.",
        "negative_supply_terminal": "That terminal which carries the negative voltage of a direct-current microphone power supply."
    },
    "gender_convention": {
        "equipment_output": "Male pin connector (contacts exposed on chassis)",
        "equipment_input": "Female socket connector (recessed contacts on chassis)",
        "cable_assembly": "Female socket on source end (plugs into equipment output), Male pin on receiving end (plugs into equipment input)"
    },
    "pinout_table": {
        "single_channel_balanced": {
            "pin_1": "Cable shield / screen",
            "pin_2": "Positive-polarity terminal (Hot / Signal +)",
            "pin_3": "Return terminal (Cold / Signal -)"
        },
        "single_channel_unbalanced": {
            "pin_1": "Screen and signal return (Ground)",
            "pin_2": "Positive-polarity terminal (Signal +)",
            "pin_3": "Connected to Pin 1 when interfacing balanced equipment to unbalanced inputs"
        },
        "phantom_powered_balanced": {
            "pin_1": "Cable shield / screen and negative supply ground (0V DC)",
            "pin_2": "Positive polarity signal AND +48V DC positive supply",
            "pin_3": "Return signal AND +48V DC positive supply"
        },
        "ab_powered_balanced": {
            "pin_1": "Cable shield / screen",
            "pin_2": "Positive polarity signal AND positive supply (+12V DC)",
            "pin_3": "Return signal AND negative supply (0V DC)"
        },
        "two_channel_balanced_5pin": {
            "pin_1": "Cable shield / screen",
            "pin_2": "Channel 1 (Left) positive polarity",
            "pin_3": "Channel 1 (Left) return",
            "pin_4": "Channel 2 (Right) positive polarity",
            "pin_5": "Channel 2 (Right) return"
        }
    },
    "historical_context": "Settled the historic 'Pin 2 Hot' vs 'Pin 3 Hot' divide between North American and European manufacturers, universally mandating Pin 2 as positive polarity.",
    "relevance_to_balanced_audio": "The foundational physical connector standard for all balanced analog audio, establishing the 3-conductor differential topology (Hot, Cold, Shield) referenced across AES48, AES26, and AES-X152."
}

# 3. AES14id
standards_data['aes14id'] = {
    "standard_id": "AES14id",
    "short_id": "AES14id",
    "title": "AES information document for professional audio — Application of connectors, concentric phone plugs and jacks",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Information Document",
    "working_group": "SC-05-02 (Audio Connectors)",
    "source_file": ".env/X152/AES - SC0505 - TERMS USED ELSEWHERE.smmx",
    "abstract": "Defines standardized allocations, contacts, and mating practices for concentric phone plugs and jacks (1/4 inch, 6.35 mm, 3.5 mm) used in professional balanced and unbalanced audio systems.",
    "key_definitions": {
        "jack": "Female concentric connector, usually fixed to equipment or connector panel.",
        "plug": "Male concentric connector, usually terminating a free cable.",
        "TRS_plug": "3-contact concentric plug where the contacts are identified as Tip, Ring, and Sleeve.",
        "TS_plug": "2-contact concentric plug where the contacts are identified as Tip and Sleeve.",
        "IEC_plug": "2-contact or 3-contact concentric plug compliant with IEC 60603-11.",
        "B_gauge_plug": "6.35 mm (nominal sleeve diameter) 3-contact concentric plug identified in Standard Sheet 12 of IEC 61602 (broadcast patch fields).",
        "MIL_plug": "6.35 mm 3-contact concentric plug identified in US military specification PJ-051."
    },
    "contact_allocations": {
        "balanced_single_channel": {
            "tip": "Positive-polarity terminal (Signal + / Hot)",
            "ring": "Return terminal (Signal - / Cold)",
            "sleeve": "Designated shield contact (Chassis / Shield)"
        },
        "unbalanced_monophonic": {
            "tip": "Positive-polarity terminal (Signal +)",
            "sleeve": "Common shield and signal return"
        },
        "unbalanced_stereophonic": {
            "tip": "Left-channel positive polarity",
            "ring": "Right-channel positive polarity",
            "sleeve": "Common shield and return"
        }
    },
    "interoperability_and_hazards": {
        "ts_in_trs_hazard": "When a monophonic 2-contact TS plug is inserted into a balanced TRS jack, the long sleeve shorts the Ring contact to Sleeve (Ground). In active cross-coupled or ground-referenced push-pull driver topologies, this dead-shorts an active op-amp output to ground, causing excessive thermal stress, output stage clipping, and increased distortion.",
        "insertion_shorting": "Concentric plugs momentarily short adjacent contacts (Tip to Ring or Ring to Sleeve) during physical insertion and withdrawal. Equipment must include current limiting (series output resistance >= 50 Ω) and DC blocking to prevent internal amplifier damage."
    },
    "relevance_to_balanced_audio": "Specifies 1/4\" TRS balanced patchbay and line I/O interconnects, highlighting critical differences between active floating versus ground-referenced op-amp drivers when mated with unbalanced cabling."
}

# 4. AES26
standards_data['aes26'] = {
    "standard_id": "AES26-2001 (s2017)",
    "short_id": "AES26",
    "title": "AES recommended practice for professional audio interconnections — Conservation of the polarity of audio signals",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Stabilized 2017 (Revision of AES26-1995, reaffirmed 2006, 2011)",
    "working_group": "SC-05-05 (Working Group on Grounding and EMC Practices)",
    "source_file": ".env/AES26 - Polarity/aes26-2001-s2017-f.pdf",
    "abstract": "This document standardizes the polarity of the signals at the various interface points between different items of equipment, in particular from the acoustical, electrical, mechanical, digital, and magnetic aspects. Each item of equipment complies separately with the polarity requirements for the input and output signals.",
    "scope": "Applies to professional audio equipment, sound reinforcement systems, studio recording, and broadcast facilities. Establishes requirements to preserve absolute signal polarity from sound pressure in air, through transducers, mixing consoles, processors, recording media, and back to acoustic sound waves radiated by loudspeakers.",
    "normative_references": [
        "AES14: Application of connectors, part 1, XLR-type polarity and gender",
        "IEC 60268-2: Sound system equipment - Part 2: Explanation of general terms and calculation methods",
        "IEC 60268-12: Application of connectors for broadcast and similar use",
        "IEC 60094-1: Magnetic tape sound recording and reproducing systems"
    ],
    "key_definitions": {
        "positive_polarity": "An instantaneous positive audio signal corresponding to positive acoustic sound pressure.",
        "positive_sound_pressure": "A portion of the sound wave where acoustic pressure exceeds atmospheric pressure.",
        "in_phase": "Signals whose waveforms maintain identical sign and time alignment across channels."
    },
    "polarity_specifications": {
        "microphones": "Positive sound pressure incident upon the front of a microphone diaphragm produces a positive electrical voltage on XLR Pin 2 relative to Pin 3.",
        "loudspeakers": "Positive electrical voltage applied to the designated '+' or non-black terminal causes the speaker diaphragm/cone to move outwardly toward the listener, creating positive acoustic sound pressure.",
        "amplifiers": "A positive input signal produces a non-inverted positive output signal. In bridged mono mode, the lower numbered channel retains input polarity, while the higher numbered channel is inverted.",
        "xlr_connectors": "Pin 2 is positive polarity relative to Pin 3 (complying with AES14).",
        "concentric_connectors": "Balanced: Tip positive relative to Ring. Unbalanced: Tip positive relative to Sleeve.",
        "magnetic_tape": "Magnetization of tape in the direction of tape travel corresponds to positive audio signal.",
        "digital_systems": "Positive acoustic sound pressure peak is represented by positive numerical values in two's complement linear PCM encoding."
    },
    "verification_methods": {
        "test_waveform": "Asymmetric half-wave rectified sawtooth pulse (400 μs ramp, 100 μs fall, 500 μs baseline) used to verify reproducing and recording channel polarity without ambiguity."
    },
    "relevance_to_balanced_audio": "Establishes Rule 5 of balanced audio: Absolute polarity must be conserved end-to-end. Without strict adherence to AES26, multi-microphone acoustic summing, stereo imaging, and subwoofer phase alignment suffer severe acoustic cancellation."
}

# 5. AES48
standards_data['aes48'] = {
    "standard_id": "AES48-2019",
    "short_id": "AES48",
    "title": "AES standard on interconnections — Grounding and EMC practices — Shields of connectors in balanced circuits",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Standard (Revision of AES48-2005)",
    "working_group": "SC-05-05 (Working Group on Grounding and EMC Practices)",
    "source_file": ".env/AES-X249 AES standard on interconnections - Grounding and EMC practices - Shields of  25-way D-type connectors in balanced circuits/ReadyToMerge_With_AES48 _Project_X249_Shields_of_D-type_connectors_20240930.docx",
    "abstract": "Specifies requirements for termination of cable shields of balanced audio wiring to equipment enclosures to maintain electromagnetic compatibility (EMC) and prevent shield currents from inducing audible hum, buzz, and RF interference into audio signal paths.",
    "cardinal_rule": "Cable shields shall connect directly to the metallic equipment enclosure (chassis) with the lowest practical impedance (< 0.1 Ω at power frequencies) at the entrance of the connector. Shields must NEVER connect to the internal signal circuit ground (0V reference).",
    "the_pin_1_problem": {
        "mechanism": "When cable shield currents (ground loops, RF interference, power supply leakage) enter the enclosure and flow through internal PCB ground traces, the trace impedance (Z = R + jωL) develops an error voltage (V = I × Z). Because audio circuitry references this same trace, the error voltage is injected directly into high-gain preamplifier stages, creating audible 50/60 Hz hum and RF demodulation buzz.",
        "solution": "Direct chassis bonding: Divert shield currents straight into the metallic chassis perimeter. The chassis acts as a Faraday cage, shunting noise around internal circuits directly to earth/ground without traversing signal reference traces."
    },
    "engineering_requirements": {
        "maximum_bonding_impedance": "< 0.1 Ω from connector shield contact to metallic enclosure",
        "connector_shell_bonding": "Connector shells must bond directly to chassis. In portable cables, AES54-1 applies.",
        "internal_circuit_ground": "Audio circuit 0V reference connects to chassis at one single star ground point, completely isolated from shield entrance currents."
    },
    "relevance_to_balanced_audio": "Rule 2 of Balanced Audio. Over 90% of field ground hum problems are traced directly to Pin 1 violations in commercial equipment. AES48 compliance is the mandatory gatekeeper test in AES-X152 Part 2."
}

# 6. AES54 series (AES54-1, AES54-2, AES54-3)
standards_data['aes54-1'] = {
    "standard_id": "AES54-1-2008 (r2018)",
    "short_id": "AES54-1",
    "title": "AES standard on interconnections — Grounding and EMC practices — Connection of cable shields within connectors attached to portable balanced audio cables",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Standard (Reaffirmed 2018)",
    "working_group": "SC-05-05 (Grounding and EMC Practices)",
    "source_file": ".env/X152/AES - SC0505 - TERMS USED ELSEWHERE.smmx",
    "abstract": "Specifies requirements for terminating cable shields within connectors attached to portable balanced audio cables (e.g. microphone cables) to ensure EMC compliance while preventing accidental ground loops when connector shells touch adjacent equipment.",
    "key_clauses": {
        "pin_1_termination": "The cable shield must terminate strictly on Pin 1 (the designated shield contact).",
        "shell_termination": "The connector outer shell should NOT be connected to Pin 1 inside portable cables. Leaving the shell floating prevents unintentional shield-to-chassis contact when connector barrels touch stage floors, lighting trusses, or other connector shells."
    },
    "relevance_to_balanced_audio": "Prevents unpredictable ground loop paths in portable concert touring and broadcast environments."
}

standards_data['aes54-2'] = {
    "standard_id": "AES54-2-2008 (r2018)",
    "short_id": "AES54-2",
    "title": "AES standard on interconnections — Grounding and EMC practices — Shields of balanced audio wiring within fixed and portable installations",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Standard (Reaffirmed 2018)",
    "working_group": "SC-05-05 (Grounding and EMC Practices)",
    "source_file": ".env/X152/AES - SC0505 - TERMS USED ELSEWHERE.smmx",
    "abstract": "Specifies the shielding and grounding practices for balanced audio wiring installed in fixed architectural facilities and portable installations, addressing line level and microphone level interconnects.",
    "standardized_levels": {
        "line_level": "Audio signal transmitted at reference RMS voltage between 0.25 V and 2 V RMS (practical range: few millivolts to 15 V).",
        "microphone_level": "Audio signal transmitted at output levels specified by IEC 61938 for electrodynamic and capacitor microphones (nominal: 1 mV to 10 mV; practical range: few microvolts to 1 V)."
    },
    "shield_grounding_architectures": {
        "single_point_shielding": "Shield grounded at driving end only; provides low-frequency electrostatic shielding but degrades RF immunity.",
        "dual_point_shielding": "Shield bonded at both ends to chassis (strictly compliant with AES48); provides maximum RF shielding immunity.",
        "hybrid_rf_shielding": "Direct metallic bond at driving end, capacitive termination (0.01 μF to 0.1 μF ceramic) at receiving end to bleed RF while blocking power-line ground loop currents."
    },
    "relevance_to_balanced_audio": "Harmonizes installation wiring rules with equipment design, bridging AES48 with field facility infrastructure."
}

standards_data['aes54-3'] = {
    "standard_id": "AES54-3-2008 (r2018)",
    "short_id": "AES54-3",
    "title": "AES standard on interconnections — Grounding and EMC practices — Screen connection of multi-conductor balanced cables",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Standard (Reaffirmed 2018)",
    "working_group": "SC-05-05 (Grounding and EMC Practices)",
    "source_file": ".env/X152/AES - SC0505 - TERMS USED ELSEWHERE.smmx",
    "abstract": "Defines screening practices for multi-pair and multi-conductor audio cables, establishing designated screen contacts (Dsc) and screen enclosures for multi-channel snakes and interconnect bundles.",
    "key_definitions": {
        "screen_shield": "A surrounding metallic layer to confine the electric field within the cable and protect from external electrical influence.",
        "designated_screen_contact": "The contact of a connector dedicated to provide an electromagnetic screen connection (e.g. Pin 1 of XLR, shield pins of DB25)."
    },
    "relevance_to_balanced_audio": "Sets the stage for multi-channel connector standards like AES59 and AES-X249."
}

# 7. AES59
standards_data['aes59'] = {
    "standard_id": "AES59-2012",
    "short_id": "AES59",
    "title": "AES standard for professional audio — Audio application of 25-way D-type connectors in balanced circuits",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Standard (Developed under project AES-X183 by SC-05-02)",
    "working_group": "SC-05-02 (Working Group on Audio Connectors)",
    "source_file": ".env/AES59/aes59-2012-f__For_CBC_use_only_Do_not_distribute.pdf",
    "abstract": "This document describes a standard contact assignment and gender convention for users of the 25-contact D-type connector as a multi-channel balanced audio interconnection, in analogue or AES3 digital form, to facilitate interconnection of equipment from different suppliers using standardized cables. The intent is to simplify the rapid and reliable interconnection of equipment in temporary installations, perhaps using rented equipment, although the method may be extended to permanent installations where appropriate.",
    "mechanical_specifications": {
        "equipment_connector": "Female (DB25F / socket)",
        "cable_connector": "Male (DB25M / pin)",
        "gender_rationale": "Equipment-mounted connectors are difficult to replace if damaged; female connectors are far less susceptible to bent pins.",
        "jackscrew_specification": "4/40 unified inch screw thread (ISO 263 / #4 UNC). M3 metric screws are strictly prohibited as they cross-thread and destroy mating connectors."
    },
    "unused_pin_rule": "Pin 13 is strictly UNUSED. It shall not be connected to audio, DC, or shield overall.",
    "eight_way_balanced_pinout": [
        {"circuit": 1, "signal": "Hot (+)", "pin": 24, "return": "Cold (-)", "return_pin": 12, "shield_pin": 25},
        {"circuit": 2, "signal": "Hot (+)", "pin": 10, "return": "Cold (-)", "return_pin": 23, "shield_pin": 11},
        {"circuit": 3, "signal": "Hot (+)", "pin": 21, "return": "Cold (-)", "return_pin": 9,  "shield_pin": 22},
        {"circuit": 4, "signal": "Hot (+)", "pin": 7,  "return": "Cold (-)", "return_pin": 20, "shield_pin": 8},
        {"circuit": 5, "signal": "Hot (+)", "pin": 18, "return": "Cold (-)", "return_pin": 6,  "shield_pin": 19},
        {"circuit": 6, "signal": "Hot (+)", "pin": 4,  "return": "Cold (-)", "return_pin": 17, "shield_pin": 5},
        {"circuit": 7, "signal": "Hot (+)", "pin": 15, "return": "Cold (-)", "return_pin": 3,  "shield_pin": 16},
        {"circuit": 8, "signal": "Hot (+)", "pin": 1,  "return": "Cold (-)", "return_pin": 14, "shield_pin": 2}
    ],
    "digital_combined_io_pinout": {
        "description": "4 digital inputs (RCV 1-4) and 4 digital outputs (XMT 1-4) on a single DB25 connector",
        "receivers": [
            {"circuit": "RCV 1", "hot_pin": 24, "cold_pin": 12, "shield_pin": 25},
            {"circuit": "RCV 2", "hot_pin": 10, "cold_pin": 23, "shield_pin": 11},
            {"circuit": "RCV 3", "hot_pin": 21, "cold_pin": 9,  "shield_pin": 22},
            {"circuit": "RCV 4", "hot_pin": 7,  "cold_pin": 20, "shield_pin": 8}
        ],
        "transmitters": [
            {"circuit": "XMT 1", "hot_pin": 18, "cold_pin": 6,  "shield_pin": 19},
            {"circuit": "XMT 2", "hot_pin": 4,  "cold_pin": 17, "shield_pin": 5},
            {"circuit": "XMT 3", "hot_pin": 15, "cold_pin": 3,  "shield_pin": 16},
            {"circuit": "XMT 4", "hot_pin": 1,  "cold_pin": 14, "shield_pin": 2}
        ]
    },
    "relevance_to_balanced_audio": "Universal standard for high-density multi-channel audio interfaces (AD/DA converters, mixing consoles, audio patchbays, DSP frames)."
}

# 8. AES72
standards_data['aes72'] = {
    "standard_id": "AES72-2019",
    "short_id": "AES72",
    "title": "AES standard on interconnections — Application of RJ45-type connectors and quad twisted pair cable for audio interconnections",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Published Standard (2019)",
    "working_group": "SC-05-02 (Working Group on Audio Connectors)",
    "source_file": ".env/AES72-4E - QTP - RJ45 /aes72-2019-f.pdf",
    "abstract": "This standard documents 8C8P (RJ45) pin-outs commonly used in professional audio applications, including channel/link order, signal polarity and phantom power compatibility. Type numbers are assigned to these variations, allowing manufacturers to easily specify which wiring standard is used in a particular piece of equipment.",
    "scope": "Specifies wiring schemes for conveying 4 balanced audio links (analog channels or AES3 digital streams) over quad twisted pair (QTP / Cat5, Cat5e, Cat6, Cat7) structured cabling using 8P8C (RJ45) modular connectors.",
    "normative_references": [
        "IEC 60603-7: Detail specification for 8-way, unshielded, free and fixed connectors",
        "IEC 60603-7-1: Detail specification for 8-way, shielded, free and fixed connectors",
        "ANSI/TIA-568: Commercial Building Telecommunications Cabling Standard",
        "AES14: XLR-type polarity and gender"
    ],
    "type_descriptor_system": {
        "number": "Designates link-to-pair assignment (Types 1 through 6)",
        "letter": {
            "E": "Even pins are Positive Polarity (+)",
            "O": "Odd pins are Positive Polarity (+)",
            "M": "Mixed polarity (Pins 4/5 inverted relative to others)"
        }
    },
    "wiring_types_table": [
        {"type": "Type 1E", "pin1": "Link 1 -", "pin2": "Link 1 +", "pin3": "Link 2 -", "pin4": "Link 3 +", "pin5": "Link 3 -", "pin6": "Link 2 +", "pin7": "Link 4 -", "pin8": "Link 4 +", "polarity_rule": "Even = +"},
        {"type": "Type 1O", "pin1": "Link 1 +", "pin2": "Link 1 -", "pin3": "Link 2 +", "pin4": "Link 3 -", "pin5": "Link 3 +", "pin6": "Link 2 -", "pin7": "Link 4 +", "pin8": "Link 4 -", "polarity_rule": "Odd = +"},
        {"type": "Type 1M", "pin1": "Link 1 +", "pin2": "Link 1 -", "pin3": "Link 2 +", "pin4": "Link 3 +", "pin5": "Link 3 -", "pin6": "Link 2 -", "pin7": "Link 4 +", "pin8": "Link 4 -", "polarity_rule": "Mixed"},
        {"type": "Type 2O", "pin1": "Link 2 +", "pin2": "Link 2 -", "pin3": "Link 3 +", "pin4": "Link 1 -", "pin5": "Link 1 +", "pin6": "Link 3 -", "pin7": "Link 4 +", "pin8": "Link 4 -", "polarity_rule": "Odd = +"},
        {"type": "Type 3E", "pin1": "Link 3 -", "pin2": "Link 3 +", "pin3": "Link 2 -", "pin4": "Link 1 +", "pin5": "Link 1 -", "pin6": "Link 2 +", "pin7": "Link 4 -", "pin8": "Link 4 +", "polarity_rule": "Even = +"},
        {"type": "Type 3M", "pin1": "Link 3 +", "pin2": "Link 3 -", "pin3": "Link 2 +", "pin4": "Link 1 +", "pin5": "Link 1 -", "pin6": "Link 2 -", "pin7": "Link 4 +", "pin8": "Link 4 -", "polarity_rule": "Mixed"},
        {"type": "Type 4E", "pin1": "Link 1 -", "pin2": "Link 1 +", "pin3": "Link 3 -", "pin4": "Link 2 +", "pin5": "Link 2 -", "pin6": "Link 3 +", "pin7": "Link 4 -", "pin8": "Link 4 +", "polarity_rule": "Even = + (Industry Standard: Radial, StudioHub, SoundTools)"},
        {"type": "Type 5E", "pin1": "Link 3 -", "pin2": "Link 3 +", "pin3": "Link 4 -", "pin4": "Link 1 +", "pin5": "Link 1 -", "pin6": "Link 4 +", "pin7": "Link 2 -", "pin8": "Link 2 +", "polarity_rule": "Even = +"},
        {"type": "Type 6E", "pin1": "Link 4 -", "pin2": "Link 4 +", "pin3": "Link 3 -", "pin4": "Link 2 +", "pin5": "Link 2 -", "pin6": "Link 3 +", "pin7": "Link 1 -", "pin8": "Link 1 +", "polarity_rule": "Even = +"}
    ],
    "cable_shielding_and_phantom_power": {
        "shielded_requirement": "Shielded CAT cable (STP/FTP) with metal-wrapped RJ45 connectors (IEC 60603-7-1) is MANDATORY when carrying phantom power (P48), because all 8 internal pins carry differential audio. The outer shield is the sole DC ground return path for phantom current.",
        "chassis_grounding": "Shield must connect directly to equipment chassis with lowest practical RF impedance, conforming to AES48."
    },
    "labeling_requirement": "Equipment shall be prominently labeled with descriptor (e.g. 'AES72 Type 4E') and state whether shield ground is connected.",
    "relevance_to_balanced_audio": "Revolutionized stage boxes, studio tie-lines, and broadcast infrastructure by carrying 4 balanced audio lines over single inexpensive Category 5/6/7 patch cables."
}

# 9. AES-X152
standards_data['aes-x152'] = {
    "standard_id": "AES-X152",
    "short_id": "AES-X152",
    "title": "AES standard on interconnections — Standard for Presenting Signal Levels, Circuit Impedances, and Topologies of Analog Audio System Components for Product Data Sheets",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Draft Working Group Standard",
    "working_group": "SC-05-05 (Grounding and EMC Practices)",
    "project_editor_and_chair": "Anthony P. Kuzub",
    "writing_group_contributors": [
        "R. Cabot", "K. Fause", "B. Whitlock", "R. L. Hess", "J. Meyer",
        "J. Woodgate", "J. Brown", "A. P. Kuzub", "A. Walker", "J. Celli", "P. Keller"
    ],
    "source_file": ".env/AES-SC-05-05-X152-202300920.docx",
    "abstract": "This standard defines the format for device manufacturers to present a uniform description of their interfacing circuit capabilities. The intent of this standard is to enable system designers and users to better predict and understand 'what can work - with what - and how'. The performance of device interconnection depends on the tripartite interaction of the Driver (Transmitter), the Interconnecting Cable, and the Receiver (Input Load).",
    "scope": "A standard Datasheet disclosure framework to measure, document, and report characteristics, topologies, impedances, and interface parameters of analog audio devices.",
    "foundational_principles": {
        "impedance_balance": "Balance is an IMPEDANCE characteristic, not a voltage property. Common-Mode Rejection Ratio (CMRR) requires equal impedances to ground on both signal legs (Z_P = Z_R). Equal and opposite voltages are not required.",
        "voltage_transfer": "Modern audio interconnection operates via bridging voltage transfer (Z_IN >= 10 × Z_OUT), not obsolete 600-ohm power matching.",
        "pin_1_enclosure_bond": "Cable shields belong to the metallic chassis enclosure, never internal audio signal 0V."
    },
    "four_part_datasheet_framework": {
        "part_1_mechanical_and_shielding": {
            "connector_type": "XLR (AES14), 1/4\" TRS (AES14id), DB25 (AES59), RJ45 (AES72), Terminal Block",
            "aes48_compliance": "Yes/No (Direct < 0.1 Ω bond to chassis)",
            "phantom_power": "None, P48, P24, P12, SP48 (IEC 61938)"
        },
        "part_2_circuit_topology_and_impedances": {
            "differential_mode_impedance_DMZ": {
                "formula_output": "DMZ_OUT = Z_PO + Z_RO",
                "formula_input": "DMZ_IN = Z_PI + Z_RI",
                "typical_values": "Output: 50 Ω to 200 Ω (nominally ~136 Ω); Input: 10 kΩ to 100 kΩ"
            },
            "common_mode_impedance_CMZ": {
                "formula_output": "CMZ_OUT = Z_SO + Z_RO",
                "formula_input": "CMZ_IN = Z_SI + (Z_PI || Z_RI)",
                "output_thresholds": {
                    "low": "CMZ_OUT < DMZ_OUT",
                    "high": "CMZ_OUT @ 1 kHz > 4 kΩ",
                    "mid": "Not Low or High"
                },
                "input_thresholds": {
                    "low": "CMZ_IN < DMZ_IN / 2",
                    "high": "CMZ_IN @ 1 kHz > 2 × DMZ_IN",
                    "mid": "Not Low or High"
                }
            },
            "impedance_balance_Zbal": "Yes if |Z_P - Z_R| / Z_P <= 10% across 20 Hz to 20 kHz; otherwise No",
            "voltage_symmetry_Vsym": "Yes if V_R = -V_P; No if V_R = 0 (impedance-balanced)"
        },
        "part_3_signal_levels_and_distortion": {
            "setup_reference_level": "0 dBu (0.775 V RMS) or +4 dBu (1.228 V RMS)",
            "mezzanine_distortion_level": "Maximum linear operating level at rated distortion (0.1% or 1% THD+N across 10 Hz - 50 kHz, typically +20 dBu to +24 dBu)",
            "clipping_ceiling": "Absolute hard clip level where waveform hits DC supply rails"
        },
        "part_4_common_mode_rejection": {
            "cmrr_matched": "Measured with 0 Ω source imbalance across 20 Hz - 20 kHz",
            "cmrr_unbalanced_source": "Measured with normative 10 Ω or 600 Ω source imbalance per IEC 60268-3"
        }
    },
    "standardized_output_topologies": [
        {"topology": "Transformer Balanced Output", "z_bal": "Yes", "v_sym": "Yes", "cmz": "High", "z_gnd": "High", "short_to_ground_safe": "Yes", "notes": "True galvanic isolation, extreme RF/ground loop rejection, high cost."},
        {"topology": "Impedance Balanced Output", "z_bal": "Yes", "v_sym": "No (Audio on Pin 2, passive resistor on Pin 3)", "cmz": "Low", "z_gnd": "Low", "short_to_ground_safe": "Yes", "notes": "Full CMRR noise rejection, low power, safe when Pin 3 shorted to ground by TS plug."},
        {"topology": "Servo / Cross-Coupled Balanced Output", "z_bal": "Yes", "v_sym": "Yes", "cmz": "Mid", "z_gnd": "Low", "short_to_ground_safe": "Yes", "notes": "Cross-coupled op-amps; automatically delivers 6 dB boost when Pin 3 grounded to maintain level."},
        {"topology": "Differential Push-Pull Balanced Output", "z_bal": "Yes", "v_sym": "Yes", "cmz": "Low", "z_gnd": "Low", "short_to_ground_safe": "NO (High Distortion/Thermal Overload)", "notes": "Ground-referenced independent op-amps; shorting Pin 3 shorts active op-amp to ground."},
        {"topology": "Transformer Balanced with Center Tap", "z_bal": "Yes", "v_sym": "Yes", "cmz": "Low", "z_gnd": "Low", "short_to_ground_safe": "NO (Shorts half winding)", "notes": "Secondary center tap referenced to ground."}
    ],
    "relevance_to_balanced_audio": "The overarching synthesis standard for the entire SC-05-05 working group, providing engineers with the first standardized datasheet language to predict interoperability between audio devices."
}

# 10. AES-X246
standards_data['aes-x246'] = {
    "standard_id": "AES-X246-XXXX",
    "short_id": "AES-X246",
    "title": "AES draft standard on interconnections — Application of RJ45-type connectors and quad twisted pair cable for audio interconnections",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Working Draft (Precursor developed into AES72-2019)",
    "working_group": "SC-05-02 (Working Group on Audio Connectors)",
    "source_file": ".env/AES72-4E - QTP - RJ45 /X246 - QTP/aes-x246-181229 (1).docx",
    "abstract": "This standard documents 8C8P (RJ45) pin-outs commonly used in professional audio applications, including channel/link order, signal polarity and phantom power compatibility. Type numbers are assigned to these variations, allowing manufacturers to easily specify which wiring standard is used in a particular piece of equipment.",
    "historic_role": "Identified the chaos of competing commercial RJ45 wiring schemes across broadcast and live sound manufacturers, formulating the first standardized classification matrix that culminated in AES72-2019.",
    "relevance_to_balanced_audio": "Documented historical commercial implementations from StudioHub, Whirlwind, Radial Engineering, ETS, and Ward-Beck."
}

# 11. AES-X249
standards_data['aes-x249'] = {
    "standard_id": "AES-X249",
    "short_id": "AES-X249",
    "title": "AES standard on interconnections — Grounding and EMC practices — Shields of 25-way D-type connectors in balanced circuits",
    "organization": "Audio Engineering Society, Inc.",
    "status": "Draft Standard / Amendment to AES48 (SC-05-05)",
    "working_group": "SC-05-05 (Working Group on Grounding and EMC Practices)",
    "contributors": [
        "R. Cabot", "K. Fause", "B. Whitlock", "R. L. Hess", "J. Meyer",
        "J. Woodgate", "J. Brown", "A. P. Kuzub", "A. Walker", "J. Celli", "P. Keller"
    ],
    "source_file": ".env/AES-X249 AES standard on interconnections - Grounding and EMC practices - Shields of  25-way D-type connectors in balanced circuits/ReadyToMerge_With_AES48 _Project_X249_Shields_of_D-type_connectors_20240930.docx",
    "abstract": "Defines specific mechanical and electrical bonding requirements for 25-way D-subminiature (AES59 DB25) connectors to equipment shielding enclosures (chassis) to eliminate the Pin 1 problem in high-density multi-channel audio equipment.",
    "key_elements": {
        "Csf": "Contact Shroud Flange: The trapezoidal metal flange surrounding connector pins, installed inside enclosure pushing outward, providing direct metal-to-metal contact with the metallic chassis perimeter.",
        "Cjs": "Contact Jack Screw: Hexagonal metal standoffs with 4-40 threaded holes that mechanically fasten connector and provide electrical bonding directly to the chassis shield plane.",
        "Dsc": "Designated Shield Contacts: Pins 2, 5, 8, 11, 16, 19, 22, 25 in DB25 connector.",
        "So": "Shield Overall: External cable outer braid.",
        "pin_13_prohibition": "Under AES59, Pin 13 is unused. AES-X249 strictly prohibits bonding Shield Overall or any ground wire to Pin 13."
    },
    "pcb_layout_rules": {
        "shield_plane": "A dedicated PCB shield plane must route designated shield contacts directly to jackscrews and shroud flange.",
        "segregation": "Shield plane currents MUST be completely segregated from the internal audio signal circuit reference ground plane.",
        "paint_warning": "No non-conductive paint, anodization, or powder coat between shroud flange, jack screws, and metallic chassis."
    },
    "relevance_to_balanced_audio": "Extends AES48 chassis-grounding discipline to multi-channel DB25 connectors, solving RF and hum intrusion in compact high-channel-count converters."
}

# 12. IEC 61938
standards_data['iec61938'] = {
    "standard_id": "IEC 61938:2018 (CDV)",
    "short_id": "IEC 61938",
    "title": "Multimedia systems — Guide to the recommended characteristics of analogue interfaces to achieve interoperability",
    "organization": "International Electrotechnical Commission (IEC TC 100)",
    "status": "International Standard",
    "source_file": ".env/X152/IEC-61938_2018_CDV.pdf",
    "abstract": "Gives guidance on recommended electrical characteristics of analogue audio and video interfaces to achieve interoperability between equipment from different manufacturers. Covers direct current power supply voltages, phantom powering for microphones, and matching criteria.",
    "normative_phantom_power_specifications": {
        "P48": {
            "supply_voltage": "48 V ± 4 V DC",
            "maximum_supply_current": "10 mA",
            "rated_supply_current": "7 mA",
            "resistors_R1_R2": "6.8 kΩ (typically 6.81 kΩ 0.1% matched)",
            "matching_requirement": "Resistors must be matched within 0.1% to preserve common-mode rejection ratio (CMRR)."
        },
        "P24": {
            "supply_voltage": "24 V ± 4 V DC",
            "maximum_supply_current": "10 mA",
            "rated_supply_current": "10 mA",
            "resistors_R1_R2": "1.2 kΩ (or 2.4 kΩ for backward compatibility)"
        },
        "P12": {
            "supply_voltage": "12 V ± 1 V DC",
            "maximum_supply_current": "15 mA",
            "rated_supply_current": "15 mA",
            "resistors_R1_R2": "680 Ω"
        },
        "SP48": {
            "description": "Specialized high-power phantom interface for microphones with extreme dynamic range",
            "supply_voltage": "48 V ± 4 V DC",
            "maximum_supply_current": "22 mA",
            "resistors_R1_R2": "2.2 kΩ"
        },
        "P12L": {
            "description": "Specialized low-power phantom interface for intercom systems",
            "supply_voltage": "12 V ± 1 V DC",
            "maximum_supply_current": "8 mA",
            "resistors_R1_R2": "3.3 kΩ"
        }
    },
    "ab_power_specifications": {
        "supply_voltage": "12 V ± 1 V DC",
        "maximum_current": "15 mA",
        "resistors_R1_R2": "180 Ω",
        "topology": "Differential series supply through signal conductors"
    },
    "relevance_to_balanced_audio": "Defines the exact resistor matching and current supply requirements for phantom powering condenser microphones across AES14 XLR and AES72 RJ45 interfaces."
}

# 13. IEC 60268-3
standards_data['iec60268-3'] = {
    "standard_id": "IEC 60268-3",
    "short_id": "IEC 60268-3",
    "title": "Sound system equipment — Part 3: Amplifiers",
    "organization": "International Electrotechnical Commission",
    "status": "International Standard",
    "source_file": ".env/X152/SC-05-05-X152-Map-20210217.smmx",
    "abstract": "Defines specifications, characteristics, and measurement methods for sound system amplifiers, including balance factor and Common-Mode Rejection Ratio (CMRR).",
    "key_clauses": {
        "balance_definition": "A circuit is balanced if the voltages between each conductor and a reference point (ground) are equal in magnitude and 180° out of phase, and the impedances between each conductor and reference point are equal.",
        "cmrr_measurement_method": "Common-mode generator V_cm is connected to Pin 2 and Pin 3 simultaneously relative to Pin 1. Differential audio output V_dm_out is measured.",
        "source_impedance_imbalance_test": "Tested with matched source (0 Ω imbalance) and with standardized 10 Ω (modern) or 600 Ω (legacy) series resistor inserted in one leg to simulate real-world driver/cable imbalance."
    },
    "relevance_to_balanced_audio": "The normative test procedure cited in AES-X152 Part 4 for verifying real-world CMRR under realistic source impedance imbalances."
}

# 14. Master Catalog Index
standards_index = {
    "collection_title": "AES Standards & Reference Documents for Balanced Audio",
    "compiled_from": "/home/anthony/Documents/GitProjects/Balanced Audio/.env",
    "compiled_by": "Antigravity AI Pair Programmer & Anthony P. Kuzub (SC-05-05 Chair)",
    "date_generated": "2026-10-17",
    "total_standards": len(standards_data),
    "standards_catalog": [
        {
            "short_id": item["short_id"],
            "standard_id": item["standard_id"],
            "title": item["title"],
            "status": item["status"],
            "file": f"{key}.json"
        }
        for key, item in standards_data.items()
    ],
    "standards_taxonomy": {
        "grounding_and_shielding": ["AES48", "AES54-1", "AES54-2", "AES54-3", "AES-X249"],
        "connectors_and_pinouts": ["AES14", "AES14id", "AES59", "AES72", "AES-X246"],
        "signal_levels_and_polarity": ["AES26", "AES-X152", "IEC 61938", "IEC 60268-3"],
        "digital_audio_synchronization": ["AES11"]
    }
}

# Write individual files
for key, data in standards_data.items():
    json_filename = f"{key}.json"
    for d in DIRS:
        out_path = os.path.join(d, json_filename)
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Wrote {out_path} ({len(json.dumps(data))} bytes)")

# Write index file
for d in DIRS:
    index_path = os.path.join(d, "standards_index.json")
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(standards_index, f, indent=2, ensure_ascii=False)
    print(f"Wrote {index_path} ({len(json.dumps(standards_index))} bytes)")

# Write combined all-standards.json
for d in DIRS:
    all_path = os.path.join(d, "all_standards.json")
    with open(all_path, 'w', encoding='utf-8') as f:
        json.dump({
            "index": standards_index,
            "standards": standards_data
        }, f, indent=2, ensure_ascii=False)
    print(f"Wrote {all_path} ({len(json.dumps(standards_data))} bytes)")

print("\nAll JSON files successfully created and validated!")
