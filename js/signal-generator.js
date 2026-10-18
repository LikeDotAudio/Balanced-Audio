/**
 * js/signal-generator.js — Precision Audio Laboratory Signal Generator
 * Model: AN/URM-1960 Military / Audio Precision Standard Signal Generator
 * 
 * Features:
 * - Real-time Web Audio API Multi-Waveform Synthesizer (Sine, Square, Triangle, Pink Noise)
 * - Calibrated Spot Frequencies (20 Hz, 100 Hz, 400 Hz, 1 kHz Pro Ref, 10 kHz, 20 kHz)
 * - Continuous Logarithmic Frequency Sweep (10 Hz – 100 kHz)
 * - Output Active / Mute Relay with Glowing Status LED
 * - Interactive Live Audible Monitor Speaker with Volume Fader
 * - Bidirectional Synchronization with Balanced Circuits (6.1–6.8) and 100 kHz L.P. Voltmeter Filter
 */

class SignalGenerator {
  constructor() {
    this.freq = 1000;          // 1,000 Hz default
    this.wave = "sine";        // "sine", "square", "triangle", "noise"
    this.outputActive = true;  // Circuit drive output enabled
    this.monitorAudible = false; // Speaker audition
    this.volume = 0.15;        // Safe listening volume

    this.audioCtx = null;
    this.oscNode = null;
    this.gainNode = null;
    this.noiseNode = null;
    this.filterNode = null;

    this.init();
  }

  init() {
    this.bindUI();
    this.updateDisplay();
    this.syncToCircuit();
  }

  // Lazy initialize Web Audio API on first user interaction
  initAudioEngine() {
    if (this.audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.audioCtx = new AudioContext();

      // Master output gain node
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);

      // Low-pass reconstruction filter
      this.filterNode = this.audioCtx.createBiquadFilter();
      this.filterNode.type = "lowpass";
      this.filterNode.frequency.setValueAtTime(22000, this.audioCtx.currentTime);

      this.gainNode.connect(this.filterNode);
      this.filterNode.connect(this.audioCtx.destination);

      this.setupOscillator();
    } catch (err) {
      console.warn("SignalGenerator: Web Audio initialization failed:", err);
    }
  }

  setupOscillator() {
    if (!this.audioCtx) return;

    if (this.oscNode) {
      try { this.oscNode.stop(); } catch (e) {}
      this.oscNode.disconnect();
      this.oscNode = null;
    }
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch (e) {}
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }

    const now = this.audioCtx.currentTime;

    if (this.wave === "noise") {
      // 2-second looping Pink Noise buffer
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;
      this.noiseNode.connect(this.gainNode);
      this.noiseNode.start(now);
    } else {
      this.oscNode = this.audioCtx.createOscillator();
      this.oscNode.type = this.wave;
      this.oscNode.frequency.setValueAtTime(this.freq, now);
      this.oscNode.connect(this.gainNode);
      this.oscNode.start(now);
    }

    this.updateAudioGain();
  }

  updateAudioGain() {
    if (!this.gainNode || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const targetGain = (this.monitorAudible && this.outputActive) ? this.volume : 0.00001;
    this.gainNode.gain.setTargetAtTime(targetGain, now, 0.015);
  }

  setFrequency(freq, source = "manual") {
    this.freq = Math.max(10, Math.min(100000, Math.round(freq)));
    
    // Update active oscillator
    if (this.oscNode && this.audioCtx && this.wave !== "noise") {
      this.oscNode.frequency.setTargetAtTime(this.freq, this.audioCtx.currentTime, 0.01);
    }

    // Update UI controls
    this.updateDisplay(source);
    this.syncToCircuit();
  }

  setWaveform(wave) {
    if (this.wave === wave) return;
    this.wave = wave;
    if (this.audioCtx) {
      this.setupOscillator();
    }
    document.querySelectorAll(".siggen-wave-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-wave") === wave);
    });
    this.syncToCircuit();
  }

  setOutputActive(active) {
    this.outputActive = !!active;

    const led = document.getElementById("siggen-led");
    const toggleBtn = document.getElementById("siggen-mute-btn");

    if (led) led.classList.toggle("active", this.outputActive);
    if (toggleBtn) {
      toggleBtn.classList.toggle("active", this.outputActive);
      toggleBtn.textContent = this.outputActive ? "OUT ON" : "MUTED";
    }

    this.updateAudioGain();
    this.syncToCircuit();
  }

  setMonitorAudible(audible) {
    this.initAudioEngine();
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    this.monitorAudible = !!audible;

    const btn = document.getElementById("siggen-speaker-btn");
    const icon = document.getElementById("siggen-speaker-icon");
    const txt = document.getElementById("siggen-speaker-txt");

    if (btn) btn.classList.toggle("active", this.monitorAudible);
    if (icon) icon.textContent = this.monitorAudible ? "🔊" : "🔇";
    if (txt) txt.textContent = this.monitorAudible ? "Monitor: ON" : "Monitor: Muted";

    this.updateAudioGain();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.updateAudioGain();
  }

  updateDisplay(excludeSource = null) {
    // Frequency text display
    const disp = document.getElementById("siggen-freq-display");
    if (disp) {
      if (this.freq >= 1000) {
        disp.textContent = `${(this.freq / 1000).toLocaleString(undefined, { minimumFractionDigits: this.freq % 1000 === 0 ? 0 : 2, maximumFractionDigits: 2 })} kHz`;
      } else {
        disp.textContent = `${this.freq.toLocaleString()} Hz`;
      }
    }

    // Spot frequency select
    if (excludeSource !== "select") {
      const select = document.getElementById("siggen-spot-select");
      if (select) {
        const spotValues = ["20", "100", "400", "1000", "10000", "20000"];
        if (spotValues.includes(String(this.freq))) {
          select.value = String(this.freq);
        } else {
          select.value = "custom";
        }
      }
    }

    // Continuous logarithmic slider: log10(10)=1, log10(100,000)=5
    if (excludeSource !== "slider") {
      const slider = document.getElementById("siggen-freq-slider");
      if (slider) {
        slider.value = Math.log10(this.freq).toFixed(3);
      }
    }

    // Fluted dial knob angle: maps log freq to -135deg .. +135deg
    if (excludeSource !== "knob") {
      const knob = document.getElementById("siggen-freq-knob");
      if (knob) {
        const logMin = 1.0; // 10 Hz
        const logMax = 5.0; // 100,000 Hz
        const logCur = Math.log10(this.freq);
        const norm = (logCur - logMin) / (logMax - logMin);
        const angle = -135 + norm * 270;
        knob.style.transform = `rotate(${angle.toFixed(1)}deg)`;
      }
    }
  }

  // Propagate generator parameters to circuit simulations (6.1 to 6.8)
  syncToCircuit() {
    if (!window.circuitSim) return;

    window.circuitSim.sigGenFreq = this.freq;
    window.circuitSim.sigGenWave = this.wave;
    window.circuitSim.sigGenOutputActive = this.outputActive;

    // Realistic 100 kHz low-pass Butterworth roll-off on AC Voltmeter filter
    // Attenuation at 100 kHz = -3.0 dB (0.707x), higher frequencies drop at 24 dB/oct
    const fc = 100000;
    const filterFactor = 1.0 / Math.sqrt(1.0 + Math.pow(this.freq / fc, 4));
    window.circuitSim.sigGenFilterRollOff = filterFactor;

    // Trigger active circuit update
    if (typeof window.circuitSim.updatePushPull === "function") {
      window.circuitSim.updatePushPull();
    }
  }

  bindUI() {
    // Waveform buttons
    document.querySelectorAll(".siggen-wave-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const w = btn.getAttribute("data-wave");
        if (w) this.setWaveform(w);
      });
    });

    // Mute / Output toggle button
    const muteBtn = document.getElementById("siggen-mute-btn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        this.setOutputActive(!this.outputActive);
      });
    }

    // Spot frequency select
    const spotSelect = document.getElementById("siggen-spot-select");
    if (spotSelect) {
      spotSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val !== "custom") {
          this.setFrequency(parseFloat(val), "select");
        }
      });
    }

    // Continuous logarithmic slider
    const slider = document.getElementById("siggen-freq-slider");
    if (slider) {
      slider.addEventListener("input", (e) => {
        const logVal = parseFloat(e.target.value);
        const freq = Math.pow(10, logVal);
        this.setFrequency(freq, "slider");
      });
    }

    // Rotary frequency knob (Click, Wheel, and Drag)
    const knob = document.getElementById("siggen-freq-knob");
    if (knob) {
      knob.addEventListener("wheel", (e) => {
        e.preventDefault();
        const step = e.deltaY > 0 ? -0.05 : 0.05;
        const curLog = Math.log10(this.freq);
        const nextLog = Math.max(1, Math.min(5, curLog + step));
        this.setFrequency(Math.pow(10, nextLog), "knob");
      }, { passive: false });

      let isDragging = false;
      let startY = 0;
      let startLog = 1;

      knob.addEventListener("pointerdown", (e) => {
        isDragging = true;
        startY = e.clientY;
        startLog = Math.log10(this.freq);
        knob.style.cursor = "grabbing";

        const onPointerMove = (ev) => {
          if (!isDragging) return;
          const dy = startY - ev.clientY; // drag up to increase
          const deltaLog = dy * 0.015;
          const nextLog = Math.max(1, Math.min(5, startLog + deltaLog));
          this.setFrequency(Math.pow(10, nextLog), "knob");
        };

        const onPointerUp = () => {
          isDragging = false;
          knob.style.cursor = "grab";
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", onPointerUp);
        };

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
      });
    }

    // Speaker monitor toggle
    const speakerBtn = document.getElementById("siggen-speaker-btn");
    if (speakerBtn) {
      speakerBtn.addEventListener("click", () => {
        this.setMonitorAudible(!this.monitorAudible);
      });
    }

    // Speaker volume slider
    const volSlider = document.getElementById("siggen-speaker-vol");
    if (volSlider) {
      volSlider.addEventListener("input", (e) => {
        this.setVolume(parseFloat(e.target.value));
      });
    }
  }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.signalGenerator = new SignalGenerator();
});
