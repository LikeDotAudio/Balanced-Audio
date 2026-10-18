/**
 * AES-X152 Interactive Animated Circuit Simulator & Thevenin Model Engine
 * High-fidelity animated SVG circuit engine with dynamic variables,
 * live voltage-colored conductors, animated current flow particles,
 * and real-time Falstad-style probe readouts.
 */

class CircuitSimulator {
  constructor() {
    this.animationFrame = null;
    this.time = 0;
    this.circuits = {};
    this.refZ = 600;
    this.refZList = [50, 75, 93, 110, 125, 135, 150, 250, 300, 500, 600, 800, 900, 1000, 1200, 2400, 8000, 10000];
  }

  setRefZ(r) {
    if (!r || isNaN(r)) return;
    this.refZ = Number(r);

    const rTxt = this.refZ >= 1000 ? `${(this.refZ / 1000).toFixed(this.refZ % 1000 === 0 ? 0 : 1)} k` : `${this.refZ}`;
    const fullText = `1 mW ${rTxt} Ω`;

    // 1. Update left meter dial plates
    ["pyr-meter-ref-z", "pp-meter-ref-z"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = fullText;
    });

    // 2. Update HP meter Ref Z buttons
    document.querySelectorAll(".hp-refz-btn[data-refz-val]").forEach(btn => {
      const val = parseFloat(btn.getAttribute("data-refz-val"));
      btn.classList.toggle("active", val === this.refZ);
    });

    // 3. Update transformer section sync buttons and badge
    document.querySelectorAll(".xfmr-sync-r-btn[data-xfmr-sync-r]").forEach(btn => {
      const val = parseFloat(btn.getAttribute("data-xfmr-sync-r"));
      btn.classList.toggle("active", val === this.refZ);
    });
    const xfmrSyncBadge = document.getElementById("xfmr-sync-active-r");
    if (xfmrSyncBadge) xfmrSyncBadge.textContent = `Active: ${rTxt} Ω`;

    // 4. Update Level Converter select
    const calcRefz = document.getElementById("calc-refz");
    if (calcRefz && document.activeElement !== calcRefz) {
      calcRefz.value = String(this.refZ);
    }

    // 5. Update Fluke VFD display & controls
    this.updateLuckyDmmDisplay();

    // 6. Update Section 3 level converter values
    if (typeof this.syncFromDbu === "function" && this.lastDbu !== undefined) {
      this.syncFromDbu(this.lastDbu);
    }

    // 7. Update needle ballistics on active meters
    if (this.lastPyrVrms !== undefined) {
      this.updateVuMeter("pyr-vu-needle", null, this.lastPyrVrms);
    }
    if (this.lastPpVdiff !== undefined) {
      this.updateVuMeter("pp-vu-needle", null, this.lastPpVdiff);
    }

    // 8. Synchronize Floating Meter Dock
    if (window.floatingMeterDock && typeof window.floatingMeterDock.setRefZ === "function") {
      window.floatingMeterDock.setRefZ(this.refZ);
    }
  }

  cycleRefZ() {
    const idx = this.refZList.indexOf(this.refZ);
    const nextIdx = (idx + 1) % this.refZList.length;
    this.setRefZ(this.refZList[nextIdx]);
  }

  init() {
    this.setupListeners();
    this.startAnimationLoop();
  }

  setupListeners() {
    // 6.1 Ground Referenced Controls
    this.bindInputs(["pp-vin", "pp-rout", "pp-rload", "pp-short-pin3"], () => this.updatePushPull());

    // 6.2 Impedance-Balanced / Active Floating Controls
    this.bindInputs(["ib-vin", "ib-rout", "ib-rload", "ib-short-pin3", "af-vin", "af-rout", "af-rload", "af-short-pin3"], () => this.updateImpedanceBalanced());

    // 6.3 Transformer Floating Controls
    this.bindInputs(["tx-vin", "tx-ratio", "tx-rload", "tx-ground-pin3"], () => this.updateTransformer());

    // 6.4 Double Transformer Link & Noise Injection Controls
    this.bindInputs(["txlink-vin", "txlink-noise", "txlink-rload"], () => this.updateTransformerLink());

    // Type Z Impedance Balanced Controls
    this.bindInputs(["z-vin", "z-rout", "z-rload", "z-short-pin3"], () => this.updateTypeZ());

    // Dynamic Range Pyramid Controls
    this.bindInputs(["pyr-ref-level", "pyr-clip-level", "pyr-noise-floor", "pyr-mezz-offset"], () => this.updatePyramid());

    // Deepest Dive: Jim Meyer Thevenin Model Controls
    this.bindInputs(["meyer-vpo", "meyer-zpo", "meyer-zro", "meyer-cmz", "meyer-vgvd", "meyer-cps"], () => this.updateMeyerModel());

    // Initial calculations
    this.updatePushPull();
    this.updateImpedanceBalanced();
    this.updateTransformer();
    this.updateTransformerLink();
    this.updateTypeZ();
    this.updatePyramid();
    this.updateMeyerModel();

    // 1960s Military & 1970s Laboratory Equipment Handlers
    this.initMilitaryControls();
    this.initLevelConverter();
    this.initLTPFaders();
    this.initVoltmeterControls();
    this.initLuckyDmm();
    this.initHp353aPatchPanel();
    this.initTrendRecorder();
    this.initCircuitMdpPointers();
    this.initCircuitFullscreen();
  }

  bindInputs(ids, callback) {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", callback);
    });
  }

  // Helper: Rotate 1970s test equipment dial knob
  updateKnob(knobId, val, min, max) {
    const knob = document.getElementById(knobId);
    if (!knob) return;
    const clamped = Math.max(min, Math.min(max, val));
    const angle = -135 + ((clamped - min) / (max - min)) * 270;
    knob.style.transform = `rotate(${angle.toFixed(1)}deg)`;
  }

  // Helper: Play violent mechanical overload snap sound (Web Audio API)
  playNeedleSnapSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this._audioCtx) {
        this._audioCtx = new AudioCtx();
      }
      const ctx = this._audioCtx;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;

      // 1. Heavy moving-coil stop impact (thud/clack)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(340, now);
      osc1.frequency.exponentialRampToValueAtTime(75, now + 0.05);
      gain1.gain.setValueAtTime(0.75, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.06);

      // 2. High-frequency needle shaft fracture SNAP!
      const snapBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.07), ctx.sampleRate);
      const data = snapBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.01));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = snapBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 3600;
      filter.Q.value = 3.8;
      const snapGain = ctx.createGain();
      snapGain.gain.setValueAtTime(0.95, now + 0.012);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      noise.connect(filter);
      filter.connect(snapGain);
      snapGain.connect(ctx.destination);
      noise.start(now + 0.012);

      // 3. Metallic bounce clinks as severed fragment settles on glass
      [0.10, 0.18, 0.25].forEach((del, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1700 + i * 350, now + del);
        g.gain.setValueAtTime(0.18 / (i + 1), now + del);
        g.gain.exponentialRampToValueAtTime(0.0001, now + del + 0.035);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + del);
        osc.stop(now + del + 0.035);
      });
    } catch (e) {
      console.warn("Snap audio synthesis error:", e);
    }
  }

  // Helper: Play screwdriver ratchet sound when replacing needle
  playScrewRatchetSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this._audioCtx) {
        this._audioCtx = new AudioCtx();
      }
      const ctx = this._audioCtx;
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      [0, 0.04, 0.08, 0.12].forEach((t, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(1200 + i * 150, now + t);
        g.gain.setValueAtTime(0.12, now + t);
        g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.02);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.02);
      });
    } catch (e) {}
  }

  // Trigger Needle Break Mechanism
  breakNeedle(targetMeterId) {
    if (this.isNeedleBroken) return;
    this.isNeedleBroken = true;
    window.isVoltmeterNeedleBroken = true;

    this.playNeedleSnapSound();

    const meters = [
      { needleId: "pyr-vu-needle", bladeId: "pyr-needle-blade", severedId: "pyr-severed-needle", alertId: "pyr-needle-alert", screwId: "pyr-zero-screw" },
      { needleId: "pp-vu-needle",  bladeId: "pp-needle-blade",  severedId: "pp-severed-needle",  alertId: "pp-needle-alert",  screwId: "pp-zero-screw" }
    ];

    meters.forEach(m => {
      const needle = document.getElementById(m.needleId);
      const blade = document.getElementById(m.bladeId);
      const severed = document.getElementById(m.severedId);
      const alertEl = document.getElementById(m.alertId);
      const screw = document.getElementById(m.screwId);

      if (needle) {
        // Slam hard past stop peg with transient shake
        needle.style.transition = "transform 0.05s ease-out";
        needle.setAttribute("transform", "rotate(44 190 250)");
        needle.style.transform = "rotate(44deg)";
      }

      setTimeout(() => {
        if (blade) {
          // Replace blade with jagged stub
          blade.setAttribute("points", "189,250 189.4,200 188.5,195 190.5,193 191.2,198 191,250");
        }

        if (needle) {
          // Stub drops back limply to mechanical rest stop
          needle.style.transition = "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
          needle.setAttribute("transform", "rotate(-36 190 250)");
          needle.style.transform = "rotate(-36deg)";
        }

        if (severed) {
          severed.style.display = "block";
          severed.style.transformOrigin = "190px 140px";
          severed.style.transition = "none";
          severed.setAttribute("transform", "rotate(43 190 250)");

          requestAnimationFrame(() => {
            severed.style.transition = "transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)";
            severed.setAttribute("transform", "translate(25, 82) rotate(82 190 140)");
          });
        }

        if (alertEl) {
          alertEl.style.display = "block";
        }

        if (screw) {
          screw.classList.add("screw-pulse");
        }
      }, 70);
    });

    if (window.floatingMeterDock && typeof window.floatingMeterDock.setNeedleBroken === "function") {
      window.floatingMeterDock.setNeedleBroken(true);
    }
  }

  // Repair / Replace Galvanometer Needle
  repairNeedle() {
    if (!this.isNeedleBroken) return;

    if (this.activeRangeIndex === 0 || this.activeRangeVolts === 0) {
      if (typeof this.showToast === "function") {
        this.showToast("⚠️ Cannot replace needle on ∞ range! Turn selector back to a calibrated range first.", 3500);
      }
      this.playNeedleSnapSound();
      return;
    }

    this.isNeedleBroken = false;
    window.isVoltmeterNeedleBroken = false;

    this.playScrewRatchetSound();

    const meters = [
      { needleId: "pyr-vu-needle", bladeId: "pyr-needle-blade", severedId: "pyr-severed-needle", alertId: "pyr-needle-alert", screwId: "pyr-zero-screw", slotId: "pyr-zero-screw-slot" },
      { needleId: "pp-vu-needle",  bladeId: "pp-needle-blade",  severedId: "pp-severed-needle",  alertId: "pp-needle-alert",  screwId: "pp-zero-screw",  slotId: "pp-zero-screw-slot" }
    ];

    meters.forEach(m => {
      const needle = document.getElementById(m.needleId);
      const blade = document.getElementById(m.bladeId);
      const severed = document.getElementById(m.severedId);
      const alertEl = document.getElementById(m.alertId);
      const screw = document.getElementById(m.screwId);
      const slot = document.getElementById(m.slotId);

      if (slot) {
        const cur = slot.getAttribute("data-rot") ? parseInt(slot.getAttribute("data-rot"), 10) + 90 : 90;
        slot.setAttribute("data-rot", cur);
        slot.setAttribute("transform", `rotate(${cur} 190 230)`);
      }

      if (severed) severed.style.display = "none";
      if (alertEl) alertEl.style.display = "none";
      if (screw) screw.classList.remove("screw-pulse");

      if (blade) {
        blade.setAttribute("points", "189,250 189.5,100 189.8,72 190.2,72 190.5,100 191,250");
      }

      if (needle) {
        needle.style.transition = "transform 0.22s cubic-bezier(0.12, 0.9, 0.25, 1)";
      }
    });

    if (window.floatingMeterDock && typeof window.floatingMeterDock.setNeedleBroken === "function") {
      window.floatingMeterDock.setNeedleBroken(false);
    }

    if (typeof this.showToast === "function") {
      this.showToast("🔧 Galvanometer needle replaced & mechanical zero calibrated!", 2800);
    }

    if (this.lastPyrVrms !== undefined) {
      this.updateVuMeter("pyr-vu-needle", null, this.lastPyrVrms);
    }
    if (this.lastPpVdiff !== undefined) {
      this.updateVuMeter("pp-vu-needle", null, this.lastPpVdiff);
    }
  }

  showToast(msg, dur = 2500) {
    let toast = document.getElementById("probe-hud-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "probe-hud-toast";
      toast.className = "probe-hud-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("visible");
    }, dur);
  }

  // Helper: Deflect APK Precision AC Voltmeter needle (-20 to +2 dB / 0 to 1.0 & 0 to 3.0 scales)
  updateVuMeter(needleId, dBu, vRms) {
    const needle = document.getElementById(needleId);
    if (!needle) return;

    if (this.isNeedleBroken) {
      needle.setAttribute("transform", "rotate(-36 190 250)");
      needle.style.transformOrigin = "190px 250px";
      needle.style.transform = "rotate(-36deg)";
      return;
    }

    let v = vRms;
    if (v === undefined || v === null) {
      if (dBu !== undefined && dBu !== null) {
        v = 0.775 * Math.pow(10, dBu / 20);
      } else {
        v = 0;
      }
    }

    const range = this.activeRangeVolts;
    // Check if on infinity: immediately breaks needle!
    if (this.activeRangeIndex === 0 || range === 0 || range === undefined) {
      this.breakNeedle(needleId);
      return;
    }

    const safeRange = range > 0 ? range : 0.0000001;
    const vFrac = Math.max(0.0, v / safeRange);

    // If excessive overload (vFrac >= 15.0 on ultra-sensitive ranges like -140 or -120 dB):
    if (vFrac >= 15.0) {
      this.breakNeedle(needleId);
      return;
    }

    // APK Precision AC Voltmeter movement calibration:
    // Moving-coil galvanometer pivot is at cx=190, cy=250.
    // Mechanical rest stop (no signal / <= 0.002 FS): -36 deg
    // Mechanical overload peg stop (>= 1.25 FS): +41 deg
    // 0 to 1.0 FS linear movement spans 60 deg (-36 deg to +24 deg)
    let angle;
    if (vFrac <= 0.002) {
      angle = -36;
    } else if (vFrac >= 1.25) {
      angle = 41;
    } else {
      angle = -36 + vFrac * 60;
    }

    needle.setAttribute("transform", `rotate(${angle.toFixed(2)} 190 250)`);
    needle.style.transformOrigin = "190px 250px";
    needle.style.transform = `rotate(${angle.toFixed(2)}deg)`;
  }

  // APK Precision AC Voltmeter: 18 Calibrated Ranges (from Infinity down to 300V)
  initVoltmeterControls() {
    this.activeRangeIndex = 13; // Default nominal 3V (+10 dB)
    this.activeRangeVolts = 3.0;

    const ranges = [
      { idx: 0,  label: "∞",       db: "-∞ dB",  v: 0.0,         angle: 68.0,  tier: "singularity", tierName: "INFINITE SENSITIVITY SINGULARITY (OVERLOAD)", color: "#ec4899" },
      { idx: 1,  label: ".1 µV",   db: "-140 dB", v: 0.0000001,   angle: 83.0,  tier: "quantum",     tierName: "QUANTUM / JOHNSON-NYQUIST NOISE FLOOR (-140 dB)", color: "#a855f7" },
      { idx: 2,  label: "1 µV",    db: "-120 dB", v: 0.000001,    angle: 98.0,  tier: "quantum",     tierName: "ULTRA-LOW NOISE PREAMP EIN FLOOR (-120 dB)", color: "#8b5cf6" },
      { idx: 3,  label: "10 µV",   db: "-100 dB", v: 0.00001,     angle: 114.0, tier: "quantum",     tierName: "SYSTEM RESIDUAL NOISE / DYNAMIC CEILING (-100 dB)", color: "#6366f1" },
      { idx: 4,  label: ".1 mV",   db: "-80 dB",  v: 0.0001,      angle: 130.2, tier: "mic",         tierName: "MICROPHONE TRANSDUCER LEVEL (-80 dB)", color: "#f59e0b" },
      { idx: 5,  label: ".3 mV",   db: "-70 dB",  v: 0.0003,      angle: 145.3, tier: "mic",         tierName: "MICROPHONE TRANSDUCER LEVEL (-70 dB)", color: "#f59e0b" },
      { idx: 6,  label: "1 mV",    db: "-60 dB",  v: 0.001,       angle: 160.3, tier: "mic",         tierName: "MICROPHONE TRANSDUCER LEVEL (-60 dB)", color: "#f59e0b" },
      { idx: 7,  label: "3 mV",    db: "-50 dB",  v: 0.003,       angle: 175.9, tier: "mic",         tierName: "MICROPHONE TRANSDUCER LEVEL (-60 to -40 dBu)", color: "#f59e0b" },
      { idx: 8,  label: "10 mV",   db: "-40 dB",  v: 0.010,       angle: -164.1,tier: "mic",         tierName: "MICROPHONE TRANSDUCER LEVEL (-40 dBu)", color: "#f59e0b" },
      { idx: 9,  label: "30 mV",   db: "-30 dB",  v: 0.030,       angle: -148.4,tier: "consumer",    tierName: "CONSUMER LOW LINE (-30 dB)", color: "#06b6d4" },
      { idx: 10, label: "100 mV",  db: "-20 dB",  v: 0.100,       angle: -132.5,tier: "consumer",    tierName: "CONSUMER AUX LINE (-20 dB)", color: "#06b6d4" },
      { idx: 11, label: ".3 V",    db: "-10 dB",  v: 0.3,         angle: -47.5, tier: "consumer",    tierName: "CONSUMER LINE LEVEL REFERENCE (-10 dBV / -7.78 dBu)", color: "#06b6d4" },
      { idx: 12, label: "1 V",     db: "0 dB",    v: 1.0,         angle: -31.6, tier: "pro",         tierName: "PROFESSIONAL 0 dB REFERENCE (0.775 V)", color: "#10b981" },
      { idx: 13, label: "3 V",     db: "+10 dB",  v: 3.0,         angle: -15.9, tier: "pro",         tierName: "PROFESSIONAL LINE LEVEL REFERENCE (+4 dBu / 0 VU)", color: "#10b981" },
      { idx: 14, label: "10 V",    db: "+20 dB",  v: 10.0,        angle: 4.1,   tier: "headroom",    tierName: "MAXIMUM SYSTEM HEADROOM (+20 dBu)", color: "#ef4444" },
      { idx: 15, label: "30 V",    db: "+30 dB",  v: 30.0,        angle: 19.7,  tier: "headroom",    tierName: "MAXIMUM SYSTEM HEADROOM CEILING (+24 to +28 dBu)", color: "#ef4444" },
      { idx: 16, label: "100 V",   db: "+40 dB",  v: 100.0,       angle: 34.7,  tier: "headroom",    tierName: "HIGH-VOLTAGE BUS / HEADROOM OVERLOAD (+40 dB)", color: "#ef4444" },
      { idx: 17, label: "300 V",   db: "+50 dB",  v: 300.0,       angle: 49.8,  tier: "headroom",    tierName: "TRANSMISSION LINE / OVERLOAD MAXIMUM (+50 dB)", color: "#ef4444" }
    ];
    this.voltmeterRanges = ranges;
    window.APK_VOLTMETER_RANGES = ranges;
    window.repairVoltmeterNeedle = () => this.repairNeedle();
    window.breakVoltmeterNeedle = () => this.breakNeedle();

    const setRange = (target) => {
      let idx = 13;
      if (typeof target === "number") {
        idx = target;
      } else if (typeof target === "string") {
        const found = ranges.findIndex(rg => rg.db.toLowerCase().includes(target.toLowerCase()) || rg.label.toLowerCase().includes(target.toLowerCase()));
        if (found !== -1) idx = found;
      }
      idx = Math.max(0, Math.min(ranges.length - 1, idx));
      this.activeRangeIndex = idx;
      this.activeRangeVolts = ranges[idx].v;

      const r = ranges[idx];
      // Rotate rotors on both Section 3 and Section 4 voltmeters
      const rotors = document.querySelectorAll(".range-knob-rotor");
      rotors.forEach(rotor => {
        rotor.setAttribute("transform", `rotate(${r.angle.toFixed(1)})`);
        rotor.style.transform = `rotate(${r.angle.toFixed(1)}deg)`;
        rotor.setAttribute("data-range-idx", idx);
      });

      // Highlight active tick marks
      document.querySelectorAll(".range-dial-tick").forEach(tick => {
        const tIdx = parseInt(tick.getAttribute("data-range-idx"), 10);
        tick.classList.toggle("active", tIdx === idx);
      });

      // Synchronize Dynamic Range Pyramid Tiers (Both Main Diagram and Meter Scale)
      const activeTier = r.tier;
      const allTiers = ["mic", "consumer", "pro", "headroom"];
      allTiers.forEach(t => {
        const els = document.querySelectorAll(`.pyramid-tier[data-tier="${t}"], .meter-scale-pyramid-tier[data-tier="${t}"]`);
        els.forEach(el => {
          if (t === activeTier) {
            el.classList.add("tier-active");
            el.classList.remove("tier-dimmed");
          } else {
            el.classList.remove("tier-active");
            el.classList.add("tier-dimmed");
          }
        });
      });

      // Synchronize Calibrated Detent Dots Around Rotary Knob
      document.querySelectorAll(".range-detent-dot").forEach(dot => {
        const dIdx = parseInt(dot.getAttribute("data-range-idx"), 10);
        if (dIdx === idx) {
          dot.classList.add("active");
          dot.setAttribute("fill", r.color);
        } else {
          dot.classList.remove("active");
          dot.setAttribute("fill", "#475569");
        }
      });

      // Synchronize Calibrated Curve Zones on Voltmeter Scales
      allTiers.forEach(t => {
        const zones = document.querySelectorAll(`.meter-scale-zone.zone-${t}`);
        zones.forEach(z => {
          if (t === activeTier) {
            z.classList.add("active");
          } else {
            z.classList.remove("active");
          }
        });
      });

      // Synchronize Dynamic Range Pyramid HUD
      const hudRange = document.getElementById("pyramid-hud-range");
      const hudDot = document.getElementById("pyramid-hud-dot");
      const hudDomain = document.getElementById("pyramid-hud-domain");
      if (hudRange) {
        hudRange.textContent = `${r.label} (${r.db})`;
        hudRange.style.borderColor = r.color;
        hudRange.style.color = r.color;
      }
      if (hudDot) {
        hudDot.style.background = r.color;
        hudDot.style.boxShadow = `0 0 10px ${r.color}`;
      }
      if (hudDomain) {
        hudDomain.textContent = r.tierName;
        hudDomain.style.color = r.color;
      }

      // Update Fluke 8050A Dynamic Headroom Pyramid Annunciator
      const dmmAnnunciator = document.getElementById("dmm-pyramid-annunciator");
      const ppDmmAnnunciator = document.getElementById("pp-dmm-pyramid-annunciator");
      const tierAnnounce = {
        headroom: "TIER: HEADROOM CEILING (+24 to +28 dBu) • ±0 dB CEIL",
        pro: "TIER: PRO LINE LEVEL (+4 dBu / 0 VU) • 20 dB HD",
        consumer: "TIER: CONSUMER LINE (-10 dBV / -7.8 dBu) • -14 dB REL",
        mic: "TIER: MIC TRANSDUCER (-60 to -40 dBu) • 44–64 dB GAIN"
      };
      if (dmmAnnunciator) {
        dmmAnnunciator.textContent = tierAnnounce[activeTier] || activeTier.toUpperCase();
        dmmAnnunciator.style.color = r.color;
      }
      if (ppDmmAnnunciator) {
        ppDmmAnnunciator.textContent = tierAnnounce[activeTier] || activeTier.toUpperCase();
        ppDmmAnnunciator.style.color = r.color;
      }

      // Synchronize floating meter dock
      if (window.floatingMeterDock && typeof window.floatingMeterDock.setHpRange === "function") {
        window.floatingMeterDock.setHpRange(r.v, r.db);
      }

      // If switched to infinity range: immediately snaps needle off!
      if (idx === 0) {
        this.breakNeedle();
      }

      // Re-render active meter needles with new sensitivity immediately
      if (this.lastPyrVrms !== undefined) {
        this.updateVuMeter("pyr-vu-needle", null, this.lastPyrVrms);
      }
      if (this.lastPpVdiff !== undefined) {
        this.updateVuMeter("pp-vu-needle", null, this.lastPpVdiff);
      }
    };
    this.setVoltmeterRange = setRange;
    window.setVoltmeterRange = setRange;

    // Direct clicks on dial ticks
    document.querySelectorAll(".range-dial-tick").forEach(tick => {
      tick.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(tick.getAttribute("data-range-idx"), 10);
        if (!isNaN(idx)) setRange(idx);
      });
    });

    // Direct clicks on calibrated detent pips around knob
    document.querySelectorAll(".range-detent-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(dot.getAttribute("data-range-idx"), 10);
        if (!isNaN(idx)) setRange(idx);
      });
    });

    // Direct clicks on mechanical zero screws and overload alerts (to repair broken needle)
    ["pyr-zero-screw", "pp-zero-screw", "pyr-needle-alert", "pp-needle-alert"].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          this.repairNeedle();
        });
      }
    });

    // Rotor clicks, dragging, and wheel events
    const knobRotors = [document.getElementById("pyr-range-knob-rotor"), document.getElementById("pp-range-knob-rotor")];
    knobRotors.forEach(rotor => {
      if (!rotor) return;

      // Click to cycle next/prev
      rotor.addEventListener("click", (e) => {
        e.preventDefault();
        const step = (e.shiftKey || e.button === 2) ? -1 : 1;
        let nextIdx = (this.activeRangeIndex + step + ranges.length) % ranges.length;
        setRange(nextIdx);
      });

      // Mouse wheel to rotate
      rotor.addEventListener("wheel", (e) => {
        e.preventDefault();
        const step = e.deltaY > 0 ? 1 : -1;
        let nextIdx = Math.max(0, Math.min(ranges.length - 1, this.activeRangeIndex + step));
        setRange(nextIdx);
      }, { passive: false });

      // Drag to rotate
      let isDragging = false;
      let startAngle = 0;
      let startIdx = 0;

      const getAngleFromCenter = (evt) => {
        const rect = rotor.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const clientX = evt.clientX || (evt.touches && evt.touches[0].clientX) || 0;
        const clientY = evt.clientY || (evt.touches && evt.touches[0].clientY) || 0;
        return Math.atan2(clientY - cy, clientX - cx) * 180 / Math.PI;
      };

      const onPointerDown = (evt) => {
        isDragging = true;
        startAngle = getAngleFromCenter(evt);
        startIdx = this.activeRangeIndex;
        rotor.style.cursor = "grabbing";
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      };

      const onPointerMove = (evt) => {
        if (!isDragging) return;
        const currAngle = getAngleFromCenter(evt);
        let closestIdx = startIdx;
        let minDiff = Infinity;
        ranges.forEach((rng, i) => {
          let diff = Math.abs(currAngle - rng.angle);
          if (diff > 180) diff = 360 - diff;
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });
        if (closestIdx !== this.activeRangeIndex) {
          setRange(closestIdx);
        }
      };

      const onPointerUp = () => {
        isDragging = false;
        rotor.style.cursor = "grab";
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
      };

      rotor.addEventListener("pointerdown", onPointerDown);
    });

    // Dynamic Range Pyramid bidirectional interaction
    const tierNominalRanges = {
      mic: 7,        // 3 mV (-50 dB)
      consumer: 11,  // .3 V (-10 dB)
      pro: 13,       // 3 V (+10 dB)
      headroom: 15   // 30 V (+30 dB)
    };

    const tierPresets = {
      mic: "-50.0",
      consumer: "-7.78",
      pro: "4.0",
      headroom: "24.0"
    };

    document.querySelectorAll(".pyramid-tier, .meter-scale-pyramid-tier").forEach(tierEl => {
      tierEl.addEventListener("click", () => {
        const tierName = tierEl.getAttribute("data-tier");
        if (tierName && tierNominalRanges[tierName] !== undefined) {
          setRange(tierNominalRanges[tierName]);
          const presetSelect = document.getElementById("pyr-preset-select");
          if (presetSelect && tierPresets[tierName]) {
            presetSelect.value = tierPresets[tierName];
            presetSelect.dispatchEvent(new Event("change"));
          }
        }
      });
      tierEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          tierEl.click();
        }
      });
    });

    // Left meter dial click target (pyr and pp)
    [document.getElementById("pyr-meter-ref-z-btn"), document.getElementById("pp-meter-ref-z-btn")].forEach(btn => {
      if (btn) btn.addEventListener("click", () => this.cycleRefZ());
    });

    // Left meter quick pills
    document.querySelectorAll(".hp-refz-btn[data-refz-val]").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = parseFloat(btn.getAttribute("data-refz-val"));
        if (!isNaN(val)) this.setRefZ(val);
      });
    });

    // Left meter cycle buttons
    ["pyr-cycle-refz-btn", "pp-cycle-refz-btn"].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", () => this.cycleRefZ());
    });

    // Fluke REF Z buttons
    document.querySelectorAll(".dmm-key[data-dmm-func='refz']").forEach(btn => {
      btn.addEventListener("click", () => this.cycleRefZ());
    });

    // Fluke dB mode buttons
    document.querySelectorAll(".dmm-key[data-dmm-func='db']").forEach(btn => {
      btn.addEventListener("click", () => {
        this.dmmMode = "hot";
        this.updateLuckyDmmDisplay();
      });
    });

    // Transformer section sync buttons
    document.querySelectorAll(".xfmr-sync-r-btn[data-xfmr-sync-r]").forEach(btn => {
      btn.addEventListener("click", () => {
        const val = parseFloat(btn.getAttribute("data-xfmr-sync-r"));
        if (!isNaN(val)) this.setRefZ(val);
      });
    });

    // Set initial range (3V / +10 dB)
    setRange(9);
    // Set initial Reference Impedance (600 Ω)
    this.setRefZ(600);
  }


  // 1960s Military Step Presets & Manual Exact Value Binding
  initMilitaryControls() {
    const bindPresetAndManual = (sliderId, presetId, manualId, updateFn) => {
      const slider = document.getElementById(sliderId);
      const preset = document.getElementById(presetId);
      const manual = document.getElementById(manualId);
      if (!slider) return;

      if (preset) {
        preset.addEventListener("change", (e) => {
          if (e.target.value !== "custom") {
            const val = parseFloat(e.target.value);
            slider.value = val;
            if (manual) manual.value = val;
            updateFn();
          }
        });
      }

      if (manual) {
        manual.addEventListener("input", (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val)) {
            slider.value = val;
            if (preset) preset.value = "custom";
            updateFn();
          }
        });
      }
    };

    bindPresetAndManual("pp-vin", "pp-vin-preset", "pp-vin-manual", () => this.updatePushPull());
    bindPresetAndManual("pp-rout", "pp-rout-preset", "pp-rout-manual", () => this.updatePushPull());
    bindPresetAndManual("pp-rload", "pp-rload-preset", "pp-rload-manual", () => this.updatePushPull());
  }

  // LTP Fader (Linear Travelling Potentiometer) Canvas Integration
  initLTPFaders() {
    if (typeof LTPFader === "undefined") return;

    // Circuit 6.1: Drive Level (VIN)
    const ppVinCont = document.getElementById("pp-vin-ltp");
    if (ppVinCont) {
      this.ltpPpVin = new LTPFader(ppVinCont, {
        min: 0.1,
        max: 5.0,
        value: 1.2,
        step: 0.1,
        unit: "V",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("pp-vin");
          if (s) { s.value = value; this.updatePushPull(); }
        }
      });
    }

    // Circuit 6.1: Output Series Impedance (Z_OUT)
    const ppRoutCont = document.getElementById("pp-rout-ltp");
    if (ppRoutCont) {
      this.ltpPpRout = new LTPFader(ppRoutCont, {
        min: 10,
        max: 200,
        value: 50,
        step: 5,
        unit: "Ω",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("pp-rout");
          if (s) { s.value = value; this.updatePushPull(); }
        }
      });
    }

    // Circuit 6.1: Receiver Load Impedance (R_LOAD)
    const ppRloadCont = document.getElementById("pp-rload-ltp");
    if (ppRloadCont) {
      this.ltpPpRload = new LTPFader(ppRloadCont, {
        min: 150,
        max: 20000,
        value: 600,
        logarithmic: true,
        unit: "Ω",
        railColor: "#f59e0b",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("pp-rload");
          if (s) { s.value = value; this.updatePushPull(); }
        }
      });
    }

    // Circuit 6.2: Active Leg Input Voltage
    const ibVinCont = document.getElementById("ib-vin-ltp");
    if (ibVinCont) {
      this.ltpIbVin = new LTPFader(ibVinCont, {
        min: 0.1,
        max: 5.0,
        value: 1.2,
        step: 0.1,
        unit: "V",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("ib-vin");
          if (s) { s.value = value; this.updateImpedanceBalanced(); }
        }
      });
    }

    // Circuit 6.2: Output Series Impedance
    const ibRoutCont = document.getElementById("ib-rout-ltp");
    if (ibRoutCont) {
      this.ltpIbRout = new LTPFader(ibRoutCont, {
        min: 10,
        max: 200,
        value: 50,
        step: 5,
        unit: "Ω",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("ib-rout");
          if (s) { s.value = value; this.updateImpedanceBalanced(); }
        }
      });
    }

    // Circuit 6.2: Receiver Bridging Load
    const ibRloadCont = document.getElementById("ib-rload-ltp");
    if (ibRloadCont) {
      this.ltpIbRload = new LTPFader(ibRloadCont, {
        min: 600,
        max: 20000,
        value: 10000,
        logarithmic: true,
        unit: "Ω",
        railColor: "#f59e0b",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("ib-rload");
          if (s) { s.value = value; this.updateImpedanceBalanced(); }
        }
      });
    }

    // Circuit 6.3: Transformer Primary Voltage
    const txVinCont = document.getElementById("tx-vin-ltp");
    if (txVinCont) {
      this.ltpTxVin = new LTPFader(txVinCont, {
        min: 1,
        max: 25,
        value: 15,
        step: 0.5,
        unit: "V",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("tx-vin");
          if (s) { s.value = value; this.updateTransformer(); }
        }
      });
    }

    // Circuit 6.3: Transformer Turns Ratio
    const txRatioCont = document.getElementById("tx-ratio-ltp");
    if (txRatioCont) {
      this.ltpTxRatio = new LTPFader(txRatioCont, {
        min: 0.5,
        max: 2.0,
        value: 1.0,
        step: 0.1,
        unit: ":1",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("tx-ratio");
          if (s) { s.value = value; this.updateTransformer(); }
        }
      });
    }

    // Circuit 6.3: Transformer Load Resistance
    const txRloadCont = document.getElementById("tx-rload-ltp");
    if (txRloadCont) {
      this.ltpTxRload = new LTPFader(txRloadCont, {
        min: 150,
        max: 5000,
        value: 600,
        logarithmic: true,
        unit: "Ω",
        railColor: "#f59e0b",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("tx-rload");
          if (s) { s.value = value; this.updateTransformer(); }
        }
      });
    }

    // Section 5: The Deepest Dive — Jim Meyer's Thevenin Model LTP Faders
    // 1. Signal Drive V_PO
    const meyerVpoCont = document.getElementById("meyer-vpo-ltp");
    if (meyerVpoCont) {
      this.ltpMeyerVpo = new LTPFader(meyerVpoCont, {
        min: 0.1,
        max: 5.0,
        value: 1.0,
        step: 0.1,
        unit: "V",
        railColor: "#38bdf8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("meyer-vpo");
          if (s) { s.value = value; this.updateMeyerModel(); }
          const m = document.getElementById("meyer-vpo-manual");
          if (m) m.value = value.toFixed(1);
        }
      });
    }

    // 2. Positive Leg Source Impedance Z_PO
    const meyerZpoCont = document.getElementById("meyer-zpo-ltp");
    if (meyerZpoCont) {
      this.ltpMeyerZpo = new LTPFader(meyerZpoCont, {
        min: 10,
        max: 250,
        value: 50,
        step: 5,
        unit: "Ω",
        railColor: "#10b981",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("meyer-zpo");
          if (s) { s.value = value; this.updateMeyerModel(); }
          const m = document.getElementById("meyer-zpo-manual");
          if (m) m.value = Math.round(value);
        }
      });
    }

    // 3. Return Leg Source Impedance Z_RO
    const meyerZroCont = document.getElementById("meyer-zro-ltp");
    if (meyerZroCont) {
      this.ltpMeyerZro = new LTPFader(meyerZroCont, {
        min: 10,
        max: 250,
        value: 50,
        step: 5,
        unit: "Ω",
        railColor: "#ef4444",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("meyer-zro");
          if (s) { s.value = value; this.updateMeyerModel(); }
          const m = document.getElementById("meyer-zro-manual");
          if (m) m.value = Math.round(value);
        }
      });
    }

    // 4. Common-Mode Source Impedance CMZ_OUT
    const meyerCmzCont = document.getElementById("meyer-cmz-ltp");
    if (meyerCmzCont) {
      this.ltpMeyerCmz = new LTPFader(meyerCmzCont, {
        min: 10,
        max: 1000,
        value: 50,
        step: 10,
        unit: "Ω",
        railColor: "#94a3b8",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("meyer-cmz");
          if (s) { s.value = value; this.updateMeyerModel(); }
          const m = document.getElementById("meyer-cmz-manual");
          if (m) m.value = Math.round(value);
        }
      });
    }

    // 5. Ground Voltage Differential V_GVD
    const meyerVgvdCont = document.getElementById("meyer-vgvd-ltp");
    if (meyerVgvdCont) {
      this.ltpMeyerVgvd = new LTPFader(meyerVgvdCont, {
        min: 0.0,
        max: 10.0,
        value: 3.0,
        step: 0.2,
        unit: "V",
        railColor: "#f59e0b",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("meyer-vgvd");
          if (s) { s.value = value; this.updateMeyerModel(); }
          const m = document.getElementById("meyer-vgvd-manual");
          if (m) m.value = value.toFixed(1);
        }
      });
    }

    // 6. Cable Capacitance C_PS
    const meyerCpsCont = document.getElementById("meyer-cps-ltp");
    if (meyerCpsCont) {
      this.ltpMeyerCps = new LTPFader(meyerCpsCont, {
        min: 20,
        max: 1000,
        value: 100,
        step: 20,
        unit: "pF",
        railColor: "#64748b",
        width: 80,
        height: 180,
        onChange: ({ value }) => {
          const s = document.getElementById("meyer-cps");
          if (s) { s.value = value; this.updateMeyerModel(); }
          const m = document.getElementById("meyer-cps-manual");
          if (m) m.value = Math.round(value);
        }
      });
    }

    // Initialize Section 5 Presets and Direct Value Handlers
    this.initMeyerPresetsAndManuals();
  }

  // Section 5: Calibrated Presets & Manual Value Synchronization
  initMeyerPresetsAndManuals() {
    const presetSelect = document.getElementById("meyer-preset-select");
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        const mode = e.target.value;
        if (mode === "balanced") {
          this.setMeyerFader("meyer-vpo", 1.0);
          this.setMeyerFader("meyer-zpo", 50);
          this.setMeyerFader("meyer-zro", 50);
          this.setMeyerFader("meyer-cmz", 50);
          this.setMeyerFader("meyer-vgvd", 3.0);
          this.setMeyerFader("meyer-cps", 100);
        } else if (mode === "imbalance_10") {
          this.setMeyerFader("meyer-vpo", 1.0);
          this.setMeyerFader("meyer-zpo", 45);
          this.setMeyerFader("meyer-zro", 55);
          this.setMeyerFader("meyer-cmz", 50);
          this.setMeyerFader("meyer-vgvd", 3.0);
          this.setMeyerFader("meyer-cps", 100);
        } else if (mode === "imbalance_severe") {
          this.setMeyerFader("meyer-vpo", 1.0);
          this.setMeyerFader("meyer-zpo", 20);
          this.setMeyerFader("meyer-zro", 120);
          this.setMeyerFader("meyer-cmz", 50);
          this.setMeyerFader("meyer-vgvd", 3.0);
          this.setMeyerFader("meyer-cps", 100);
        } else if (mode === "clean_ground") {
          this.setMeyerFader("meyer-vpo", 1.0);
          this.setMeyerFader("meyer-zpo", 50);
          this.setMeyerFader("meyer-zro", 50);
          this.setMeyerFader("meyer-cmz", 50);
          this.setMeyerFader("meyer-vgvd", 0.0);
          this.setMeyerFader("meyer-cps", 100);
        } else if (mode === "heavy_hum") {
          this.setMeyerFader("meyer-vpo", 1.0);
          this.setMeyerFader("meyer-zpo", 45);
          this.setMeyerFader("meyer-zro", 55);
          this.setMeyerFader("meyer-cmz", 30);
          this.setMeyerFader("meyer-vgvd", 6.0);
          this.setMeyerFader("meyer-cps", 150);
        } else if (mode === "long_cable") {
          this.setMeyerFader("meyer-vpo", 1.0);
          this.setMeyerFader("meyer-zpo", 50);
          this.setMeyerFader("meyer-zro", 50);
          this.setMeyerFader("meyer-cmz", 50);
          this.setMeyerFader("meyer-vgvd", 3.0);
          this.setMeyerFader("meyer-cps", 500);
        }
        this.updateMeyerModel();
      });
    }

    const bindManual = (id) => {
      const man = document.getElementById(id + "-manual");
      const slider = document.getElementById(id);
      if (man && slider) {
        man.addEventListener("input", (e) => {
          const val = parseFloat(e.target.value);
          if (!isNaN(val)) {
            slider.value = val;
            this.syncMeyerLtp(id, val);
            if (presetSelect) presetSelect.value = "custom";
            this.updateMeyerModel();
          }
        });
      }
    };

    bindManual("meyer-vpo");
    bindManual("meyer-zpo");
    bindManual("meyer-zro");
    bindManual("meyer-cmz");
    bindManual("meyer-vgvd");
    bindManual("meyer-cps");
  }

  setMeyerFader(id, val) {
    const slider = document.getElementById(id);
    if (slider) slider.value = val;
    const man = document.getElementById(id + "-manual");
    if (man) man.value = val;
    this.syncMeyerLtp(id, val);
  }

  syncMeyerLtp(id, val) {
    const ltpMap = {
      "meyer-vpo": this.ltpMeyerVpo,
      "meyer-zpo": this.ltpMeyerZpo,
      "meyer-zro": this.ltpMeyerZro,
      "meyer-cmz": this.ltpMeyerCmz,
      "meyer-vgvd": this.ltpMeyerVgvd,
      "meyer-cps": this.ltpMeyerCps
    };
    const ltp = ltpMap[id];
    if (ltp && typeof ltp.setValue === "function") {
      ltp.setValue(val, true);
    }
  }

  // Full Screen Circuit Expansion Controller
  initCircuitFullscreen() {
    window.toggleCircuitFullscreen = (btnEl) => {
      const card = btnEl.closest(".svg-diagram-card") || btnEl.closest(".circuit-subcard") || btnEl.closest(".section");
      if (!card) return;

      const isFs = card.classList.contains("circuit-fullscreen-active");

      if (isFs) {
        card.classList.remove("circuit-fullscreen-active");
        document.body.classList.remove("has-circuit-fullscreen");
        const exitBtn = card.querySelector(".circuit-fullscreen-exit-btn");
        if (exitBtn) exitBtn.remove();
        document.body.style.overflow = "";
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      } else {
        card.classList.add("circuit-fullscreen-active");
        document.body.classList.add("has-circuit-fullscreen");
        document.body.style.overflow = "hidden";

        // Add prominent Exit button
        if (!card.querySelector(".circuit-fullscreen-exit-btn")) {
          const exitBtn = document.createElement("button");
          exitBtn.className = "circuit-fullscreen-exit-btn";
          exitBtn.innerHTML = `<span>✕ Exit Full Screen [Esc]</span>`;
          exitBtn.onclick = () => window.toggleCircuitFullscreen(btnEl);
          card.appendChild(exitBtn);
        }

        // Request browser fullscreen if available
        if (card.requestFullscreen) {
          card.requestFullscreen().catch(() => {});
        }

        // Trigger resize event for canvas rerendering
        setTimeout(() => window.dispatchEvent(new Event("resize")), 100);
      }
    };

    // Global Esc key listener
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.body.classList.remove("has-circuit-fullscreen");
        const fsEl = document.querySelector(".circuit-fullscreen-active");
        if (fsEl) {
          const btn = fsEl.querySelector(".btn-circuit-fullscreen");
          if (btn) window.toggleCircuitFullscreen(btn);
          else {
            fsEl.classList.remove("circuit-fullscreen-active");
            const exitBtn = fsEl.querySelector(".circuit-fullscreen-exit-btn");
            if (exitBtn) exitBtn.remove();
            document.body.style.overflow = "";
          }
        }
      }
    });
  }

  // 1970s Laboratory Audio Level Converter & DMM LCD Driver
  initLevelConverter() {
    const dbuEl = document.getElementById("calc-dbu");
    const dbvEl = document.getElementById("calc-dbv");
    const vrmsEl = document.getElementById("calc-vrms");
    const vpeakEl = document.getElementById("calc-vpeak");
    const refzEl = document.getElementById("calc-refz");
    const dbmEl = document.getElementById("calc-dbm");
    const presetSelect = document.getElementById("pyr-preset-select");

    const syncFromDbu = (dbu) => {
      this.lastDbu = dbu;
      const vrms = 0.775 * Math.pow(10, dbu / 20);
      const dbv = 20 * Math.log10(Math.max(0.0001, vrms / 1.0));
      const vpeak = vrms * Math.SQRT2;
      const refZ = this.refZ || 600;
      const vRefZ = Math.sqrt(0.001 * refZ);
      const dbm = 20 * Math.log10(Math.max(0.00001, vrms / vRefZ));

      if (dbuEl && document.activeElement !== dbuEl) dbuEl.value = dbu.toFixed(2);
      if (dbvEl && document.activeElement !== dbvEl) dbvEl.value = dbv.toFixed(2);
      if (vrmsEl && document.activeElement !== vrmsEl) vrmsEl.value = vrms >= 1.0 ? vrms.toFixed(3) : vrms.toFixed(4);
      if (vpeakEl) vpeakEl.value = vpeak >= 1.0 ? vpeak.toFixed(3) : vpeak.toFixed(4);
      if (refzEl && document.activeElement !== refzEl) refzEl.value = String(refZ);
      if (dbmEl && document.activeElement !== dbmEl) dbmEl.value = dbm.toFixed(2);

      // 1970s DMM Fluorescent LCD readout
      const dmmVrms = document.getElementById("dmm-vrms-val");
      if (dmmVrms) dmmVrms.textContent = `${vrms >= 1.0 ? vrms.toFixed(3) : (vrms * 1000).toFixed(1) + ' m'}V`;
      const dmmDbu = document.getElementById("dmm-dbu-val");
      if (dmmDbu) dmmDbu.textContent = `${dbm >= 0 ? '+' : ''}${dbm.toFixed(1)} dBm`;
      const dmmPeak = document.getElementById("dmm-vpeak-val");
      const rTxt = refZ >= 1000 ? `${(refZ / 1000).toFixed(refZ % 1000 === 0 ? 0 : 1)} k` : `${refZ}`;
      if (dmmPeak) dmmPeak.textContent = `${rTxt} Ω (REF Z)`;

      // APK Precision AC Voltmeter needle deflection
      this.lastPyrVrms = vrms;
      this.updateVuMeter("pyr-vu-needle", dbu, vrms);
    };
    this.syncFromDbu = syncFromDbu;

    if (dbuEl) {
      dbuEl.addEventListener("input", () => {
        const dbu = parseFloat(dbuEl.value);
        if (!isNaN(dbu)) {
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (dbvEl) {
      dbvEl.addEventListener("input", () => {
        const dbv = parseFloat(dbvEl.value);
        if (!isNaN(dbv)) {
          const vrms = Math.pow(10, dbv / 20);
          const dbu = 20 * Math.log10(vrms / 0.775);
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (vrmsEl) {
      vrmsEl.addEventListener("input", () => {
        const vrms = parseFloat(vrmsEl.value);
        if (!isNaN(vrms) && vrms > 0) {
          const dbu = 20 * Math.log10(vrms / 0.775);
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (dbmEl) {
      dbmEl.addEventListener("input", () => {
        const dbm = parseFloat(dbmEl.value);
        if (!isNaN(dbm)) {
          const refZ = this.refZ || 600;
          const vRefZ = Math.sqrt(0.001 * refZ);
          const vrms = vRefZ * Math.pow(10, dbm / 20);
          const dbu = 20 * Math.log10(vrms / 0.775);
          if (presetSelect) presetSelect.value = "custom";
          syncFromDbu(dbu);
        }
      });
    }

    if (refzEl) {
      refzEl.addEventListener("change", (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          this.setRefZ(val);
        }
      });
    }

    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        if (e.target.value !== "custom") {
          const dbu = parseFloat(e.target.value);
          if (!isNaN(dbu)) syncFromDbu(dbu);
        }
      });
    }

    // Initialize with +4.0 dBu studio standard
    syncFromDbu(4.0);
  }

  // ==========================================
  // 6.1 Ground Referenced Push-Pull
  // ==========================================
  updatePushPull() {
    const vinEl = document.getElementById("pp-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById("pp-rout").value);
    const rload = parseFloat(document.getElementById("pp-rload").value);
    const shortPin3 = document.getElementById("pp-short-pin3").checked;

    document.getElementById("pp-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("pp-rout-val").textContent = `${rout} Ω`;
    document.getElementById("pp-rload-val").textContent = `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`;

    // Synchronize 1970s rotary knob dials
    this.updateKnob("pp-vin-knob", vin, 0.1, 5.0);
    this.updateKnob("pp-rout-knob", rout, 10, 200);
    this.updateKnob("pp-rload-knob", rload, 150, 10000);

    // Synchronize manual number inputs if not actively focused
    const vinMan = document.getElementById("pp-vin-manual");
    if (vinMan && document.activeElement !== vinMan) vinMan.value = vin.toFixed(1);
    const routMan = document.getElementById("pp-rout-manual");
    if (routMan && document.activeElement !== routMan) routMan.value = Math.round(rout);
    const rloadMan = document.getElementById("pp-rload-manual");
    if (rloadMan && document.activeElement !== rloadMan) rloadMan.value = Math.round(rload);

    let vPin2, vPin3, iPin2, iPin3, vDiff, iLoad, isClipped = false;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = (2 * vin) / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = -(vin - iLoad * rout);
      iPin2 = iLoad;
      iPin3 = iLoad;
      vDiff = vPin2 - vPin3;
    } else {
      const iShort = vin / Math.max(1, rout);
      iPin3 = iShort;
      vPin3 = 0;
      iLoad = vin / (rout + rload);
      vPin2 = vin - iLoad * rout;
      iPin2 = iLoad;
      vDiff = vPin2;
      if (iShort > 0.05) isClipped = true;
    }

    // Panel probe readouts
    const vrmsText = `${(vin * 0.707).toFixed(2)} VRMS / ${(vin * 1000 / 10000).toFixed(1)} mA`;
    this.setProbe("pp-probe-gen", vrmsText);
    this.setProbe("pp-probe-in", vrmsText);
    this.setProbe("pp-probe-p2", `${(iPin2 * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("pp-probe-p3", `${(iPin3 * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);
    this.setProbe("pp-probe-load", `V_diff: ${vDiff.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    // APK Precision AC Voltmeter needle on Circuit 6.1
    this.lastPpVdiff = vDiff;
    const dBuOut = 20 * Math.log10(Math.max(0.001, vDiff / 0.775));
    this.updateVuMeter("pp-vu-needle", dBuOut, vDiff);

    // LUCKY 8050A Precision DMM readouts (Yellow Font & Multi-Mode)
    this.updateLuckyDmmDisplay(vPin2, vPin3, vDiff, iLoad, shortPin3, isClipped);

    // Broadcast to Breakaway Floating Meter Dock
    if (window.floatingMeterDock) {
      window.floatingMeterDock.updateFromActiveCircuit();
    }

    // Live SVG schematic component fader value overlays
    this.setProbe("pp-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("pp-svg-zpo", `${rout} Ω`);
    this.setProbe("pp-svg-zro", `${rout} Ω`);
    this.setProbe("pp-svg-rload", `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`);
    this.setProbe("pp-svg-probe-p2", `${(iPin2 * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("pp-svg-probe-p3", `${(iPin3 * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);

    // Live SVG Measurement Data Points (MDP) Badges with Pointers
    const dBuP2 = 20 * Math.log10(Math.max(0.001, vPin2 / 0.775));
    this.setProbe("mdp-val-6-1-vin", `${vin.toFixed(2)} V RMS`);
    this.setProbe("mdp-val-6-1-p2", `${vPin2.toFixed(2)} V RMS (${dBuP2 >= 0 ? '+' : ''}${dBuP2.toFixed(1)} dBu)`);
    this.setProbe("mdp-val-6-1-p3", shortPin3 ? "0.00 V (SHORTED)" : `${vPin3.toFixed(2)} V RMS (180°)`);
    this.setProbe("mdp-val-6-1-load", `${vDiff.toFixed(2)} V / ${(iLoad * 1000).toFixed(1)} mA`);

    // Dynamic Sizing & Wire Visualization in SVG:
    // If voltage is increased, signal wire gets larger in the drawing!
    const driveWire = document.getElementById("pp-svg-wire-drive");
    if (driveWire) {
      const w = 2.0 + (vin / 5.0) * 3.5;
      driveWire.setAttribute("stroke-width", w.toFixed(1));
    }
    // Load resistor rectangle scales with R_Load
    const loadRect = document.getElementById("pp-svg-rload-rect");
    if (loadRect) {
      const rw = Math.min(28, Math.max(14, 14 + (rload / 10000) * 14));
      loadRect.setAttribute("width", rw.toFixed(0));
      loadRect.setAttribute("x", (630 - rw / 2).toFixed(0));
    }

    // TS Short toggle visual feedback in SVG
    const shortGroup = document.getElementById("svg-pp-short-group");
    const shortDash = document.getElementById("pp-svg-short-dash");
    const shortText = document.getElementById("pp-svg-ts-text");
    if (shortGroup && shortDash && shortText) {
      if (shortPin3) {
        shortGroup.setAttribute("opacity", "1.0");
        shortDash.setAttribute("stroke-dasharray", "none");
        shortDash.setAttribute("stroke-width", "3.5");
        shortText.textContent = "TS Short Link: CLOSED (0 Ω to Chassis!)";
        shortText.setAttribute("fill", "#ef4444");
      } else {
        shortGroup.setAttribute("opacity", "0.65");
        shortDash.setAttribute("stroke-dasharray", "4,4");
        shortDash.setAttribute("stroke-width", "2");
        shortText.textContent = "TS Short: OPEN";
        shortText.setAttribute("fill", "#94a3b8");
      }
    }

    const statusEls = document.querySelectorAll("#pp-status, #pp-panel-status");
    statusEls.forEach(statusEl => {
      if (shortPin3) {
        statusEl.className = "badge badge-danger";
        statusEl.textContent = isClipped 
          ? "CRITICAL: Op-Amp 2 in Current Limit Clip! Massive Distortion!" 
          : "WARNING: Pin 3 Shorted to Ground (Heavy Current Draw)";
      } else {
        statusEl.className = "badge badge-success";
        statusEl.textContent = "Normal Symmetrical Balanced Operation";
      }
    });
  }

  // ==========================================
  // 6.2 Active Impedance-Balanced Output
  // ==========================================
  updateImpedanceBalanced() {
    const vinEl = document.getElementById("ib-vin") || document.getElementById("af-vin");
    if (!vinEl) return;
    const prefix = document.getElementById("ib-vin") ? "ib-" : "af-";
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById(prefix + "rout").value);
    const rload = parseFloat(document.getElementById(prefix + "rload").value);
    const shortPin3 = document.getElementById(prefix + "short-pin3").checked;

    const vinValEl = document.getElementById(prefix + "vin-val");
    if (vinValEl) vinValEl.textContent = `${vin.toFixed(1)} V`;
    const routValEl = document.getElementById(prefix + "rout-val");
    if (routValEl) routValEl.textContent = `${rout} Ω`;
    const rloadValEl = document.getElementById(prefix + "rload-val");
    if (rloadValEl) rloadValEl.textContent = `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`;

    let vPin2, vPin3 = 0, iLoad, vDiff;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = vin / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = iLoad * rout;
      vDiff = vPin2 - vPin3;
    } else {
      iLoad = vin / (rout + rload);
      vPin2 = iLoad * rload;
      vPin3 = 0;
      vDiff = vPin2;
    }

    const dBu = 20 * Math.log10(Math.max(0.001, vPin2 / 0.775));
    this.setProbe("ib-probe-drv", `${vin.toFixed(2)} V / ${(iLoad * 1000).toFixed(2)} mA`);
    this.setProbe("ib-probe-p2", `${vPin2.toFixed(2)} V / ${dBu >= 0 ? '+' : ''}${dBu.toFixed(1)} dBu`);
    this.setProbe("ib-probe-p3", shortPin3 ? "0.00 V (Direct Chassis Short)" : `0.00 V / ${rout.toFixed(1)} Ω to 0V`);
    this.setProbe("ib-probe-load", `V_diff: ${vDiff.toFixed(2)} V | 100% Hum Immunity`);

    // SVG fader overlays
    this.setProbe("ib-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("ib-svg-rpo", `${rout} Ω`);
    this.setProbe("ib-svg-rro", `${rout} Ω`);
    this.setProbe("ib-svg-rload", `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`);
    this.setProbe("ib-svg-p2-probe", `${vPin2.toFixed(2)} V / ${dBu >= 0 ? '+' : ''}${dBu.toFixed(1)} dBu`);
    this.setProbe("ib-svg-p3-probe", shortPin3 ? "0.00 V (Grounded)" : `0.00 V / ${rout} Ω to 0V`);

    // Live SVG Measurement Data Points (MDP) Badges with Pointers
    this.setProbe("mdp-val-6-2-vin", `${vin.toFixed(2)} V RMS`);
    this.setProbe("mdp-val-6-2-p2", `${vPin2.toFixed(2)} V RMS (ACTIVE)`);
    this.setProbe("mdp-val-6-2-p3", shortPin3 ? "0.00 V (Direct Short)" : `0.00 V (${rout}Ω PASSIVE)`);
    this.setProbe("mdp-val-6-2-load", `${vDiff.toFixed(2)} V / 100% CMRR`);

    // LUCKY 8050A Precision DMM readouts (Yellow Font & Multi-Mode)
    this.updateLuckyDmmDisplay(vPin2, vPin3, vDiff, iLoad, shortPin3, false);

    if (window.floatingMeterDock) {
      window.floatingMeterDock.updateFromActiveCircuit();
    }
  }

  // ==========================================
  // 6.3 Transformer Floating
  // ==========================================
  updateTransformer() {
    const vinEl = document.getElementById("tx-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const turnsRatio = parseFloat(document.getElementById("tx-ratio").value);
    const rload = parseFloat(document.getElementById("tx-rload").value);
    const groundPin3 = document.getElementById("tx-ground-pin3").checked;

    document.getElementById("tx-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("tx-ratio-val").textContent = `1 : ${turnsRatio.toFixed(1)}`;
    document.getElementById("tx-rload-val").textContent = `${rload} Ω`;

    const vSec = vin * turnsRatio;
    const rSec = 40;
    const iLoad = vSec / (rSec + rload);
    const vLoad = iLoad * rload;

    let vPin2 = groundPin3 ? vLoad : (vLoad / 2);
    let vPin3 = groundPin3 ? 0 : (-vLoad / 2);

    this.setProbe("tx-probe-pri", `${(iLoad * turnsRatio * 1000).toFixed(1)} mA / ${vin.toFixed(1)} V`);
    this.setProbe("tx-probe-p2", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("tx-probe-p3", `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);
    this.setProbe("tx-probe-load", `V_load: ${vLoad.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    // SVG fader overlays
    this.setProbe("tx-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("tx-svg-ratio", `1 : ${turnsRatio.toFixed(1)}`);
    this.setProbe("tx-svg-rload", `${rload >= 1000 ? (rload / 1000).toFixed(1) + ' kΩ' : rload + ' Ω'}`);
    this.setProbe("tx-svg-p2-probe", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("tx-svg-p3-probe", `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V`);

    const statusEl = document.getElementById("tx-status");
    if (statusEl) {
      statusEl.className = "badge badge-success";
      statusEl.textContent = groundPin3 
        ? "Pin 3 Earth-Referenced: Full Voltage Preserved with Zero Distortion" 
        : "True Galvanic Floating: 100% Isolation from Earth Ground Loops";
    }

    if (window.floatingMeterDock) {
      window.floatingMeterDock.updateFromActiveCircuit();
    }
  }

  // ==========================================
  // 6.4 Double Transformer Link & Noise Injection (User Image 0)
  // ==========================================
  updateTransformerLink() {
    const vinEl = document.getElementById("txlink-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const noiseV = parseFloat(document.getElementById("txlink-noise").value);
    const rload = parseFloat(document.getElementById("txlink-rload").value);

    document.getElementById("txlink-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("txlink-noise-val").textContent = `${noiseV.toFixed(1)} V @ 44.8 kHz`;
    document.getElementById("txlink-rload-val").textContent = `${rload} Ω`;

    // Isolation calculation: Two transformers in cascade reject RF common-mode noise
    const iPri = vin / 600;
    const iSec1 = iPri * 0.95;
    const iLoad = iSec1 * 0.95;
    const vLoad = iLoad * rload;
    const residualNoise = noiseV * 0.0001; // 80 dB isolation

    this.setProbe("txlink-probe-src", `${(iPri * 1000).toFixed(1)} mA / ${vin.toFixed(1)} V`);
    this.setProbe("txlink-probe-mid", `${(iSec1 * 1000).toFixed(1)} mA / 600 Ω line`);
    this.setProbe("txlink-probe-load", `${vLoad.toFixed(2)} V audio | ${(residualNoise * 1000).toFixed(2)} mV RF noise`);

    // SVG fader overlays
    this.setProbe("txlink-svg-vin", `${vin.toFixed(1)} V`);
    this.setProbe("txlink-svg-noise", `${noiseV.toFixed(1)} V`);
    this.setProbe("txlink-svg-rload", `${rload} Ω`);

    const statusEl = document.getElementById("txlink-status");
    if (statusEl) {
      statusEl.className = "badge badge-success";
      statusEl.textContent = "Double Galvanic Isolation: > 80 dB RF Noise Attenuation";
    }
  }

  // ==========================================
  // Type Z Impedance Balanced
  // ==========================================
  updateTypeZ() {
    const vinEl = document.getElementById("z-vin");
    if (!vinEl) return;
    const vin = parseFloat(vinEl.value);
    const rout = parseFloat(document.getElementById("z-rout").value);
    const rload = parseFloat(document.getElementById("z-rload").value);
    const shortPin3 = document.getElementById("z-short-pin3").checked;

    document.getElementById("z-vin-val").textContent = `${vin.toFixed(1)} V`;
    document.getElementById("z-rout-val").textContent = `${rout} Ω`;
    document.getElementById("z-rload-val").textContent = `${rload} Ω`;

    let vPin2, vPin3 = 0, iLoad, vDiff;

    if (!shortPin3) {
      const rTotal = 2 * rout + rload;
      iLoad = vin / rTotal;
      vPin2 = vin - iLoad * rout;
      vPin3 = iLoad * rout;
      vDiff = vPin2 - vPin3;
    } else {
      iLoad = vin / (rout + rload);
      vPin2 = iLoad * rload;
      vPin3 = 0;
      vDiff = vPin2;
    }

    this.setProbe("z-probe-in", `${vin.toFixed(2)} V / 1 kHz`);
    this.setProbe("z-probe-p2", `${(iLoad * 1000).toFixed(1)} mA / ${vPin2.toFixed(2)} V`);
    this.setProbe("z-probe-p3", `${(iLoad * 1000).toFixed(1)} mA / ${vPin3.toFixed(2)} V (Passive Match)`);
    this.setProbe("z-probe-load", `V_load: ${vDiff.toFixed(2)} V | I_load: ${(iLoad * 1000).toFixed(1)} mA`);

    const statusEl = document.getElementById("z-status");
    if (statusEl) {
      statusEl.className = shortPin3 ? "badge badge-primary" : "badge badge-success";
      statusEl.textContent = shortPin3 ? "Unbalanced Mode: 100% Safe (Passive Resistor Absorbs Ground)" : "Balanced Mode: 100% Noise Rejection via Passive Impedance Match";
    }
  }

  // ==========================================
  // Dynamic Range Pyramid Variables
  // ==========================================
  updatePyramid() {
    const refLevelEl = document.getElementById("pyr-ref-level");
    if (!refLevelEl) return;
    const refLevel = parseFloat(refLevelEl.value);
    const clipLevel = parseFloat(document.getElementById("pyr-clip-level").value);
    const noiseFloor = parseFloat(document.getElementById("pyr-noise-floor").value);
    const mezzOffset = parseFloat(document.getElementById("pyr-mezz-offset").value);

    document.getElementById("pyr-ref-val").textContent = `${refLevel >= 0 ? "+" : ""}${refLevel} dBu`;
    document.getElementById("pyr-clip-val").textContent = `+${clipLevel} dBu`;
    document.getElementById("pyr-noise-val").textContent = `${noiseFloor} dBu`;
    document.getElementById("pyr-mezz-val").textContent = `-${mezzOffset} dB below clip`;

    const headroom = clipLevel - refLevel;
    const dynamicRange = clipLevel - noiseFloor;
    const mezzLevel = clipLevel - mezzOffset;

    this.setSvgText("pyr-svg-clip-text", `+${clipLevel} dBu Peak Clip`);
    this.setSvgText("pyr-svg-headroom-text", `${headroom.toFixed(0)} dB HEADROOM`);
    this.setSvgText("pyr-svg-ref-text", `Nominal: ${refLevel >= 0 ? "+" : ""}${refLevel} dBu (${refLevel === 4 ? "Pro Audio" : "Consumer"})`);
    this.setSvgText("pyr-svg-noise-text", `Noise Floor: ${noiseFloor} dBu (${dynamicRange.toFixed(0)} dB Dynamic Range)`);
    this.setSvgText("pyr-svg-mezz-text", `Distortion Threshold: +${mezzLevel.toFixed(1)} dBu (1% THD)`);

    const totalSpan = clipLevel - noiseFloor;
    const clipRatio = (clipLevel - mezzLevel) / Math.max(1, totalSpan);
    const mezzY = 70 + clipRatio * (440 - 70) * 1.5;

    const mezzLine = document.getElementById("pyr-svg-mezz-line");
    if (mezzLine) {
      mezzLine.setAttribute("y1", Math.min(300, Math.max(120, mezzY)));
      mezzLine.setAttribute("y2", Math.min(300, Math.max(120, mezzY)));
    }
  }

  // ==========================================
  // Deepest Dive: Jim Meyer's Thevenin 3-Impedance Model
  // ==========================================
  updateMeyerModel() {
    const vpoEl = document.getElementById("meyer-vpo");
    if (!vpoEl) return;
    const vpo = parseFloat(vpoEl.value);
    const zpo = parseFloat(document.getElementById("meyer-zpo").value);
    const zro = parseFloat(document.getElementById("meyer-zro").value);
    const cmz = parseFloat(document.getElementById("meyer-cmz").value);
    const vgvd = parseFloat(document.getElementById("meyer-vgvd").value);
    const cps = parseFloat(document.getElementById("meyer-cps").value);

    document.getElementById("meyer-vpo-val").textContent = `${vpo.toFixed(1)} V`;
    document.getElementById("meyer-zpo-val").textContent = `${zpo} Ω`;
    document.getElementById("meyer-zro-val").textContent = `${zro} Ω`;
    document.getElementById("meyer-cmz-val").textContent = `${cmz >= 1000 ? (cmz / 1000).toFixed(1) + ' kΩ' : cmz + ' Ω'}`;
    document.getElementById("meyer-vgvd-val").textContent = `${vgvd.toFixed(1)} V (Hum / Ground Offset)`;
    document.getElementById("meyer-cps-val").textContent = `${cps} pF`;

    // Calculate Thevenin impedance imbalance deltaZ = |Z_PO - Z_RO|
    const deltaZ = Math.abs(zpo - zro);
    const rinDiff = 20000; // 20k bridging input
    const rinCm = 50000;   // 50k common mode input

    // Ground loop current driven through shield / chassis bonds
    const iGnd = vgvd / (cmz + 20);
    // Differential audio signal received
    const vDiff = (2 * vpo) * (rinDiff / (rinDiff + zpo + zro));

    // Common-mode to differential conversion error:
    // V_err = V_GVD * (deltaZ / (rinCm + cmz))
    const vErr = vgvd * (deltaZ / (rinCm + cmz));
    const cmrrThevenin = (vErr > 0.000001) ? (20 * Math.log10(vpo / vErr)) : 140;

    const percentImbalance = zpo > 0 ? ((deltaZ / zpo) * 100).toFixed(2) : "0.00";
    this.setProbe("meyer-probe-deltaz", `${deltaZ.toFixed(1)} Ω (${percentImbalance}%)`);
    this.setProbe("meyer-probe-ignd", `${(iGnd * 1000).toFixed(1)} mA`);
    this.setProbe("meyer-probe-vdiff", `${vDiff.toFixed(2)} V`);

    const vErrEl = document.getElementById("meyer-probe-verror");
    if (vErrEl) {
      if (deltaZ === 0) {
        vErrEl.textContent = "0.00 mV (Infinite CMRR)";
        vErrEl.style.color = "#10b981";
      } else {
        vErrEl.textContent = `${(vErr * 1000).toFixed(2)} mV`;
        vErrEl.style.color = vErr * 1000 > 1.0 ? "#ef4444" : "#f59e0b";
      }
    }

    const cmrrEl = document.getElementById("meyer-probe-cmrr");
    if (cmrrEl) {
      if (deltaZ === 0 || cmrrThevenin >= 120) {
        cmrrEl.innerHTML = "&infin; dB";
        cmrrEl.style.color = "#10b981";
      } else {
        cmrrEl.textContent = `${(Math.round(cmrrThevenin * 10) / 10).toFixed(1)} dB`;
        cmrrEl.style.color = cmrrThevenin < 60 ? "#ef4444" : "#38bdf8";
      }
    }

    // Live SVG schematic fader overlays
    this.setProbe("meyer-svg-vpo", `${vpo.toFixed(1)} V`);
    this.setProbe("meyer-svg-zpo", `${zpo} Ω`);
    this.setProbe("meyer-svg-zro", `${zro} Ω`);
    this.setProbe("meyer-svg-cmz", `${cmz >= 1000 ? (cmz / 1000).toFixed(1) + ' kΩ' : cmz + ' Ω'}`);
    this.setProbe("meyer-svg-vgvd", `${vgvd.toFixed(1)} V`);
    this.setProbe("meyer-svg-cps", `${cps} pF`);

    const badgeEl = document.getElementById("meyer-status");
    if (badgeEl) {
      if (deltaZ === 0) {
        badgeEl.className = "badge badge-success";
        badgeEl.textContent = "Perfect Impedance Match (Infinite Thevenin CMRR)";
      } else if (cmrrThevenin >= 70) {
        badgeEl.className = "badge badge-primary";
        badgeEl.textContent = "Excellent Balanced Rejection (> 70 dB)";
      } else if (cmrrThevenin >= 50) {
        badgeEl.className = "badge badge-warning";
        badgeEl.textContent = "Degraded Immunity (Noticeable Hum Under GVD)";
      } else {
        badgeEl.className = "badge badge-danger";
        badgeEl.textContent = "Severe Ground Loop Interference!";
      }
    }

    if (window.floatingMeterDock) {
      window.floatingMeterDock.updateFromActiveCircuit();
    }
  }

  // ==========================================
  // LUCKY 8050A Precision DMM (Yellow Font & Multi-Mode)
  // ==========================================
  initLuckyDmm() {
    this.dmmMode = "hot"; // 'hot' (+VE) | 'cold' (-VE) | 'thd' | 'multi'
    this.dmmRange = "auto"; // 'auto' | '200mv' | '2v' | '20v' | '200v'

    // Mode switchers across page
    document.querySelectorAll("[data-dmm-mode]").forEach(btn => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-dmm-mode");
        if (!mode) return;
        this.dmmMode = mode;
        document.querySelectorAll("[data-dmm-mode]").forEach(b => {
          const match = b.getAttribute("data-dmm-mode") === mode;
          b.classList.toggle("active", match);
          b.classList.toggle("yellow-mode", match);
        });
        this.updateLuckyDmmDisplay();
      });
    });

    // Range keys across page
    document.querySelectorAll("[data-dmm-range]").forEach(key => {
      key.addEventListener("click", () => {
        const range = key.getAttribute("data-dmm-range");
        if (!range) return;
        this.dmmRange = range;
        document.querySelectorAll("[data-dmm-range]").forEach(k => {
          const match = k.getAttribute("data-dmm-range") === range;
          k.classList.toggle("active", match);
          if (k.getAttribute("data-dmm-range") === "auto") {
            k.classList.toggle("key-auto", range === "auto");
          }
        });
        this.updateLuckyDmmDisplay();
      });
    });
  }

  formatLuckyValue(val, unit = "V") {
    if (val === undefined || val === null || isNaN(val)) return `--.- ${unit}`;
    const abs = Math.abs(val);
    const sign = val < 0 ? "-" : "";

    if (this.dmmRange === "200mv") {
      if (abs > 0.22) return "O.L.";
      return `${sign}${(abs * 1000).toFixed(1)} mV`;
    }
    if (this.dmmRange === "2v") {
      if (abs > 2.2) return "O.L.";
      return `${sign}${abs.toFixed(3)} V`;
    }
    if (this.dmmRange === "20v") {
      if (abs > 22.0) return "O.L.";
      return `${sign}${abs.toFixed(2)} V`;
    }
    if (this.dmmRange === "200v") {
      if (abs > 220.0) return "O.L.";
      return `${sign}${abs.toFixed(1)} V`;
    }

    // Auto range
    if (abs < 0.2) {
      return `${sign}${(abs * 1000).toFixed(1)} mV`;
    }
    if (abs < 2.0) {
      return `${sign}${abs.toFixed(3)} V`;
    }
    if (abs < 20.0) {
      return `${sign}${abs.toFixed(2)} V`;
    }
    return `${sign}${abs.toFixed(1)} V`;
  }

  updateLuckyDmmDisplay(vHot, vCold, vDiff, iLoad, shortPin3, isClipped) {
    if (vHot === undefined) vHot = this.lastPyrVrms || 1.228;
    if (vCold === undefined) vCold = shortPin3 ? 0 : -(vHot);
    if (vDiff === undefined) vDiff = this.lastPpVdiff || (vHot - vCold);
    if (iLoad === undefined) iLoad = vDiff / 600;

    const refZ = this.refZ || 600;
    const vRefZ = Math.sqrt(0.001 * refZ);
    const dbmHot = 20 * Math.log10(Math.max(0.0001, vHot / vRefZ));
    const dbmDiff = 20 * Math.log10(Math.max(0.0001, vDiff / vRefZ));
    const rTxt = refZ >= 1000 ? `${(refZ / 1000).toFixed(refZ % 1000 === 0 ? 0 : 1)} k` : `${refZ}`;

    const dbuHot = 20 * Math.log10(Math.max(0.0001, vHot / 0.775));
    const dbuCold = vCold !== 0 ? 20 * Math.log10(Math.max(0.0001, Math.abs(vCold) / 0.775)) : -Infinity;
    const thdVal = isClipped ? 8.450 : (shortPin3 ? 4.250 : 0.0018);
    const thdDb = 20 * Math.log10(thdVal / 100);
    const cmrrVal = shortPin3 ? 0.0 : (Math.abs(vHot + vCold) < 0.001 ? 98.4 : 54.2);

    // Section 3 DMM readouts
    const vrmsEl = document.getElementById("dmm-vrms-val");
    const dbuEl = document.getElementById("dmm-dbu-val");
    const vpeakEl = document.getElementById("dmm-vpeak-val");
    const lbl1 = document.getElementById("dmm-lbl-1");
    const lbl2 = document.getElementById("dmm-lbl-2");
    const lbl3 = document.getElementById("dmm-lbl-3");

    // Section 4 DMM readouts
    const ppVdiffEl = document.getElementById("pp-dmm-vdiff");
    const ppIloadEl = document.getElementById("pp-dmm-iload");
    const ppStatusEl = document.getElementById("pp-dmm-status");
    const ppLbl1 = document.getElementById("pp-dmm-lbl-1");
    const ppLbl2 = document.getElementById("pp-dmm-lbl-2");
    const ppLbl3 = document.getElementById("pp-dmm-lbl-3");

    if (this.dmmMode === "hot") {
      if (lbl1) lbl1.textContent = "V_HOT (+VE RMS)";
      if (lbl2) lbl2.textContent = `AUDIO LEVEL (${refZ === 600 ? "dBm / dBu" : "dBm @" + rTxt + "Ω"})`;
      if (lbl3) lbl3.textContent = "REF IMPEDANCE (R)";
      if (vrmsEl) vrmsEl.textContent = this.formatLuckyValue(vHot);
      if (dbuEl) dbuEl.textContent = `${dbmHot >= 0 ? "+" : ""}${dbmHot.toFixed(1)} dBm`;
      if (vpeakEl) vpeakEl.textContent = `${rTxt} Ω (REF Z)`;

      if (ppLbl1) ppLbl1.textContent = "V_DIFF (AC RMS)";
      if (ppLbl2) ppLbl2.textContent = `AUDIO LEVEL (${refZ === 600 ? "dBm / dBu" : "dBm @" + rTxt + "Ω"})`;
      if (ppLbl3) ppLbl3.textContent = "REF IMPEDANCE (R)";
      if (ppVdiffEl) ppVdiffEl.textContent = this.formatLuckyValue(vDiff);
      if (ppIloadEl) ppIloadEl.textContent = `${dbmDiff >= 0 ? "+" : ""}${dbmDiff.toFixed(1)} dBm`;
      if (ppStatusEl) ppStatusEl.textContent = `${rTxt} Ω (REF Z)`;

    } else if (this.dmmMode === "cold") {
      if (lbl1) lbl1.textContent = "V_COLD (-VE RMS)";
      if (lbl2) lbl2.textContent = "PHASE / RETURN";
      if (lbl3) lbl3.textContent = "REF IMPEDANCE (R)";
      if (vrmsEl) vrmsEl.textContent = this.formatLuckyValue(Math.abs(vCold));
      if (dbuEl) dbuEl.textContent = vCold !== 0 ? "180.0° INVERTED" : "0.0° (GND RETURN)";
      if (vpeakEl) vpeakEl.textContent = `${rTxt} Ω (REF Z)`;

      if (ppLbl1) ppLbl1.textContent = "V_COLD (-VE RMS)";
      if (ppLbl2) ppLbl2.textContent = "PHASE / RETURN";
      if (ppLbl3) ppLbl3.textContent = "REF IMPEDANCE (R)";
      if (ppVdiffEl) ppVdiffEl.textContent = this.formatLuckyValue(Math.abs(vCold));
      if (ppIloadEl) ppIloadEl.textContent = vCold !== 0 ? "180.0° INVERTED" : "0.0° (GND RETURN)";
      if (ppStatusEl) ppStatusEl.textContent = `${rTxt} Ω (REF Z)`;

    } else if (this.dmmMode === "thd") {
      if (lbl1) lbl1.textContent = "THD+N DISTORTION";
      if (lbl2) lbl2.textContent = "DISTORTION LEVEL (dB)";
      if (lbl3) lbl3.textContent = "REF Z / CMRR";
      if (vrmsEl) vrmsEl.textContent = `${thdVal.toFixed(4)} %`;
      if (dbuEl) dbuEl.textContent = `${thdDb.toFixed(1)} dB`;
      if (vpeakEl) vpeakEl.textContent = `${rTxt}Ω | ${cmrrVal.toFixed(0)} dB`;

      if (ppLbl1) ppLbl1.textContent = "THD+N DISTORTION";
      if (ppLbl2) ppLbl2.textContent = "DISTORTION LEVEL (dB)";
      if (ppLbl3) ppLbl3.textContent = "REF Z / CMRR";
      if (ppVdiffEl) ppVdiffEl.textContent = `${thdVal.toFixed(4)} %`;
      if (ppIloadEl) ppIloadEl.textContent = `${thdDb.toFixed(1)} dB`;
      if (ppStatusEl) ppStatusEl.textContent = `${rTxt}Ω | ${cmrrVal.toFixed(0)} dB`;

    } else { // 'multi'
      if (lbl1) lbl1.textContent = "+VE HOT / -VE COLD";
      if (lbl2) lbl2.textContent = "V_DIFF LOAD VOLTS";
      if (lbl3) lbl3.textContent = `REF Z (${rTxt} Ω) / STATUS`;
      if (vrmsEl) vrmsEl.textContent = `${this.formatLuckyValue(vHot)} / ${this.formatLuckyValue(Math.abs(vCold))}`;
      if (dbuEl) dbuEl.textContent = `${dbmDiff >= 0 ? "+" : ""}${dbmDiff.toFixed(1)} dBm`;
      if (vpeakEl) vpeakEl.textContent = `${rTxt}Ω | ${thdVal.toFixed(3)}%`;

      if (ppLbl1) ppLbl1.textContent = "+VE HOT / -VE COLD";
      if (ppLbl2) ppLbl2.textContent = "V_DIFF LOAD VOLTS";
      if (ppLbl3) ppLbl3.textContent = `REF Z (${rTxt} Ω) / STATUS`;
      if (ppVdiffEl) ppVdiffEl.textContent = `${this.formatLuckyValue(vHot)} / ${this.formatLuckyValue(Math.abs(vCold))}`;
      if (ppIloadEl) ppIloadEl.textContent = `${dbmDiff >= 0 ? "+" : ""}${dbmDiff.toFixed(1)} dBm`;
      if (ppStatusEl) ppStatusEl.textContent = `${rTxt}Ω | ${thdVal.toFixed(3)}%`;
    }

    // Ensure yellow font
    [vrmsEl, dbuEl, vpeakEl, ppVdiffEl, ppIloadEl, ppStatusEl].forEach(el => {
      if (el) {
        el.style.color = "#facc15";
        el.style.textShadow = "0 0 10px rgba(250, 204, 21, 0.85), 0 0 2px #fef08a";
      }
    });

    // Feed real-time sample into trend recorder
    this.recordTrendSample(vHot, Math.abs(vCold), vDiff, thdVal);
  }

  // ==========================================
  // Hewlett-Packard 353A Patch Panel (Operating Manual 00353-90003)
  // ==========================================
  initHp353aPatchPanel() {
    this.hp353a = {
      measCal: "MEAS",   // 'MEAS' | 'CAL'
      freqRange: "<5kHz",// '<5kHz' | '>5kHz'
      outZ: 600,         // 135, 600, 900
      inZ: 10000,        // 135, 600, 900, 10000 (BRG)
      atten10: 0,        // 0 to 100 in 10 dB steps
      atten1: 0,         // 0 to 10 in 1 dB steps
    };

    const outZSteps = [135, 600, 900];
    const inZSteps = [135, 600, 900, 10000];

    // Out Z dials
    document.querySelectorAll(".hp353a-outz-dial").forEach(dial => {
      dial.addEventListener("click", () => {
        let idx = (outZSteps.indexOf(this.hp353a.outZ) + 1) % outZSteps.length;
        this.setHp353aOutputZ(outZSteps[idx]);
      });
    });

    // In Z dials
    document.querySelectorAll(".hp353a-inz-dial").forEach(dial => {
      dial.addEventListener("click", () => {
        let idx = (inZSteps.indexOf(this.hp353a.inZ) + 1) % inZSteps.length;
        this.setHp353aInputZ(inZSteps[idx]);
      });
    });

    // 10 dB Attenuator dials
    document.querySelectorAll(".hp353a-atten10-dial").forEach(dial => {
      dial.addEventListener("click", () => {
        this.hp353a.atten10 = (this.hp353a.atten10 + 10) % 110;
        this.updateHp353aUI();
        this.applyHp353aSettings();
      });
    });

    // 1 dB Attenuator dials
    document.querySelectorAll(".hp353a-atten1-dial").forEach(dial => {
      dial.addEventListener("click", () => {
        this.hp353a.atten1 = (this.hp353a.atten1 + 1) % 11;
        this.updateHp353aUI();
        this.applyHp353aSettings();
      });
    });

    // MEAS / CAL toggle buttons
    document.querySelectorAll(".hp353a-toggle-meas").forEach(btn => {
      btn.addEventListener("click", () => {
        this.hp353a.measCal = this.hp353a.measCal === "MEAS" ? "CAL" : "MEAS";
        this.updateHp353aUI();
        this.applyHp353aSettings();
      });
    });

    // FREQ toggle buttons
    document.querySelectorAll(".hp353a-toggle-freq").forEach(btn => {
      btn.addEventListener("click", () => {
        this.hp353a.freqRange = this.hp353a.freqRange === "<5kHz" ? ">5kHz" : "<5kHz";
        this.updateHp353aUI();
        this.applyHp353aSettings();
      });
    });

    this.updateHp353aUI();
  }

  setHp353aOutputZ(z) {
    this.hp353a.outZ = z;
    const rout1 = document.getElementById("pp-rout");
    if (rout1) { rout1.value = z; this.updatePushPull(); }
    const rout2 = document.getElementById("ib-rout");
    if (rout2) { rout2.value = z; this.updateImpedanceBalanced(); }
    this.updateHp353aUI();
  }

  setHp353aInputZ(z) {
    this.hp353a.inZ = z;
    const rload1 = document.getElementById("pp-rload");
    if (rload1) { rload1.value = z; this.updatePushPull(); }
    const rload2 = document.getElementById("ib-rload");
    if (rload2) { rload2.value = z; this.updateImpedanceBalanced(); }
    this.updateHp353aUI();
  }

  updateHp353aUI() {
    const totalAtten = this.hp353a.atten10 + this.hp353a.atten1;
    document.querySelectorAll(".hp353a-outz-val").forEach(el => el.textContent = `${this.hp353a.outZ} Ω`);
    document.querySelectorAll(".hp353a-inz-val").forEach(el => el.textContent = `${this.hp353a.inZ >= 1000 ? (this.hp353a.inZ / 1000) + ' kΩ' : this.hp353a.inZ + ' Ω'}`);
    document.querySelectorAll(".hp353a-atten10-val").forEach(el => el.textContent = `${this.hp353a.atten10} dB`);
    document.querySelectorAll(".hp353a-atten1-val").forEach(el => el.textContent = `${this.hp353a.atten1} dB`);
    document.querySelectorAll(".hp353a-atten-total").forEach(el => el.textContent = `${totalAtten} dB Loss`);

    // Rotate dials
    const outZAngles = { 135: -45, 600: 0, 900: 45 };
    const inZAngles = { 135: -45, 600: -15, 900: 15, 10000: 45 };
    const a10Angle = -135 + (this.hp353a.atten10 / 100) * 270;
    const a1Angle = -135 + (this.hp353a.atten1 / 10) * 270;

    document.querySelectorAll(".hp353a-outz-dial").forEach(d => d.style.transform = `rotate(${outZAngles[this.hp353a.outZ] || 0}deg)`);
    document.querySelectorAll(".hp353a-inz-dial").forEach(d => d.style.transform = `rotate(${inZAngles[this.hp353a.inZ] || 0}deg)`);
    document.querySelectorAll(".hp353a-atten10-dial").forEach(d => d.style.transform = `rotate(${a10Angle}deg)`);
    document.querySelectorAll(".hp353a-atten1-dial").forEach(d => d.style.transform = `rotate(${a1Angle}deg)`);

    document.querySelectorAll(".hp353a-toggle-meas").forEach(b => {
      b.textContent = `MODE: ${this.hp353a.measCal}`;
      b.classList.toggle("active", this.hp353a.measCal === "CAL");
    });
    document.querySelectorAll(".hp353a-toggle-freq").forEach(b => {
      b.textContent = `FREQ: ${this.hp353a.freqRange}`;
      b.classList.toggle("active", this.hp353a.freqRange === ">5kHz");
    });
  }

  applyHp353aSettings() {
    const totalAtten = this.hp353a.atten10 + this.hp353a.atten1;
    this.hp353aAttenFactor = Math.pow(10, -totalAtten / 20);
    this.updatePushPull();
    this.updateImpedanceBalanced();
    this.updateLuckyDmmDisplay();
  }

  // ==========================================
  // Strip-Chart Trend Recorder (Time-Series Scrolling Graph)
  // ==========================================
  initTrendRecorder() {
    this.trendBuffer = [];
    this.trendRecording = true;
    this.trendScale = "auto"; // 'auto' | '2v' | '10v' | '20v'
    this.lastTrendTime = 0;

    // Controls
    document.querySelectorAll(".trend-btn-run").forEach(btn => {
      btn.addEventListener("click", () => {
        this.trendRecording = !this.trendRecording;
        btn.textContent = this.trendRecording ? "PAUSE" : "REC";
        btn.classList.toggle("active", this.trendRecording);
      });
    });

    document.querySelectorAll(".trend-btn-clear").forEach(btn => {
      btn.addEventListener("click", () => {
        this.trendBuffer = [];
      });
    });

    document.querySelectorAll("[data-trend-scale]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.trendScale = btn.getAttribute("data-trend-scale") || "auto";
        document.querySelectorAll("[data-trend-scale]").forEach(b => {
          b.classList.toggle("active", b === btn);
        });
      });
    });

    // Start render loop
    const renderLoop = () => {
      this.renderTrendCanvases();
      requestAnimationFrame(renderLoop);
    };
    requestAnimationFrame(renderLoop);
  }

  recordTrendSample(vHot, vCold, vDiff, thd) {
    if (!this.trendRecording) return;
    const now = performance.now();
    if (now - this.lastTrendTime < 95) return; // 10Hz sampling
    this.lastTrendTime = now;

    this.trendBuffer.push({
      t: now,
      vHot: typeof vHot === "number" ? vHot : 0,
      vCold: typeof vCold === "number" ? vCold : 0,
      vDiff: typeof vDiff === "number" ? vDiff : 0,
      thd: typeof thd === "number" ? thd : 0
    });

    if (this.trendBuffer.length > 300) {
      this.trendBuffer.shift();
    }
  }

  renderTrendCanvases() {
    const canvases = [
      document.getElementById("dmm-trend-canvas"),
      document.getElementById("dock-trend-canvas"),
      document.getElementById("pp-trend-canvas")
    ].filter(Boolean);

    canvases.forEach(canvas => this.renderSingleTrendCanvas(canvas));
  }

  renderSingleTrendCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, w, h);

    // Grid Graticule (10 horizontal, 6 vertical divisions)
    ctx.strokeStyle = "rgba(51, 65, 85, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += w / 10) {
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
    }
    for (let y = 0; y <= h; y += h / 6) {
      ctx.moveTo(0, y); ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Zero baseline
    const midY = h / 2;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    if (this.trendBuffer.length < 2) return;

    let maxV = 2.0;
    if (this.trendScale === "auto") {
      this.trendBuffer.forEach(s => {
        maxV = Math.max(maxV, Math.abs(s.vHot), Math.abs(s.vCold), Math.abs(s.vDiff));
      });
      maxV = Math.max(0.5, maxV * 1.25);
    } else if (this.trendScale === "10v") {
      maxV = 10.0;
    } else if (this.trendScale === "20v") {
      maxV = 20.0;
    }

    const n = this.trendBuffer.length;
    const dx = w / Math.max(n - 1, 1);

    const drawTrace = (prop, color, lineWidth = 2) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const pt = this.trendBuffer[i];
        const px = i * dx;
        const val = pt[prop] || 0;
        const py = midY - (val / maxV) * (midY - 8);
        const clampedY = Math.max(4, Math.min(h - 4, py));
        if (i === 0) ctx.moveTo(px, clampedY);
        else ctx.lineTo(px, clampedY);
      }
      ctx.stroke();
      ctx.restore();
    };

    // 1. Hot (+VE) — Yellow
    drawTrace("vHot", "#facc15", 2);
    // 2. Cold (-VE) — Cyan
    drawTrace("vCold", "#38bdf8", 1.8);
    // 3. Diff — Green
    drawTrace("vDiff", "#10b981", 2.2);

    // OSD Header
    ctx.font = "bold 9px 'Courier New', monospace";
    ctx.fillStyle = "#facc15";
    ctx.textAlign = "left";
    ctx.fillText(`+VE: ${(this.trendBuffer[n-1]?.vHot || 0).toFixed(2)}V`, 8, 14);

    ctx.fillStyle = "#38bdf8";
    ctx.fillText(`-VE: ${(this.trendBuffer[n-1]?.vCold || 0).toFixed(2)}V`, 85, 14);

    ctx.fillStyle = "#10b981";
    ctx.fillText(`DIFF: ${(this.trendBuffer[n-1]?.vDiff || 0).toFixed(2)}V`, 155, 14);

    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "right";
    ctx.fillText(`SPAN: ±${maxV.toFixed(1)}V`, w - 8, 14);
  }

  // ==========================================
  // Circuit Measurement Data Points (MDP) with Dynamic Pointers
  // ==========================================
  initCircuitMdpPointers() {
    document.querySelectorAll(".circuit-mdp-badge").forEach(badge => {
      badge.addEventListener("click", () => {
        const target = badge.getAttribute("data-probe-target");
        if (target && window.floatingMeterDock) {
          if (window.floatingMeterDock.selectProbeTarget) {
            window.floatingMeterDock.selectProbeTarget(target);
          } else if (window.floatingMeterDock.setProbeTarget) {
            window.floatingMeterDock.setProbeTarget(target);
          }
        }
      });
    });
  }

  setProbe(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  setSvgText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Real-Time Animated Current Particle Loop
  startAnimationLoop() {
    const animate = () => {
      this.time += 0.04;

      document.querySelectorAll(".animated-current-flow").forEach(path => {
        const speed = parseFloat(path.getAttribute("data-flow-speed") || "1");
        const offset = (this.time * speed * 25) % 100;
        path.style.strokeDashoffset = -offset;
      });

      this.animationFrame = requestAnimationFrame(animate);
    };

    animate();
  }
}

// Global instance
window.circuitSim = new CircuitSimulator();
window.animator = window.circuitSim;
document.addEventListener("DOMContentLoaded", () => {
  window.circuitSim.init();
});
