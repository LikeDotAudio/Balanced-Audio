/**
 * LTPFader.js — Linear Travelling Potentiometer
 * Author: Anthony Peter Kuzub (original concept)
 * Web Canvas implementation with Focus & Fade-away dynamics.
 *
 * Architecture:
 * - Single canvas rendering: rail track, ticks, master highlight fill,
 *   travelling potentiometer cap, rotational indicator angle (-135° to +135°),
 *   and dynamic floating value chip.
 * - Compound value: { value: linearVal, rotValue: rotVal, mode: 1|2 }
 * - Interactions:
 *   * Drag cap -> adjust linear travel.
 *   * Alt + drag (or double click pan latch) -> adjust rotation (fine trim/Q/gain).
 *   * Mouse wheel -> fine tune linear; Alt + wheel -> fine tune rotation.
 *   * Focus dynamics: Highlights with active cyan glow during interaction,
 *     then smoothly fades back into console aesthetic after use.
 */

class LTPFader {
  constructor(container, options = {}) {
    this.container = typeof container === "string" ? document.getElementById(container) : container;
    if (!this.container) return;

    this.config = options;
    this.fc = options.fader_config || {};
    this.kc = options.knob_config || {};

    // Domain ranges
    this.min = this.fc?.domain?.min !== undefined ? this.fc.domain.min : (options.min !== undefined ? options.min : 0);
    this.max = this.fc?.domain?.max !== undefined ? this.fc.domain.max : (options.max !== undefined ? options.max : 100);
    this.defaultVal = this.fc?.value?.default_value !== undefined ? this.fc.value.default_value : (this.min + this.max) / 2;
    this.step = options.step || 1;
    this.unitText = options.unit || this.fc.unit_text || "";
    this.isLog = options.logarithmic ?? this.fc.logarithmic ?? (this.min > 0 && this.max > 0 && (this.max / this.min) >= 100);

    // Rotational pot range (-100 to +100 default)
    this.rotMin = this.kc?.rotation_min !== undefined ? this.kc.rotation_min : (options.rotMin !== undefined ? options.rotMin : -100);
    this.rotMax = this.kc?.rotation_max !== undefined ? this.kc.rotation_max : (options.rotMax !== undefined ? options.rotMax : 100);
    this.rotUnit = options.rotUnit || "trim";

    // Dimensions
    this.width = options.width || 80;
    this.height = options.height || 260;
    this.isHorizontal = this.width > this.height;

    // Cosmetics
    this.railColor = options.railColor || this.fc?.cosmetics?.colors?.highlight || "#06b6d4";
    this.capRadius = options.capRadius || this.kc?.cap_radius || 16;
    this.capBody = options.capBody || this.kc?.cap_color || "#1e293b";
    this.capAccent = options.capAccent || this.kc?.cap_outline_color || "#38bdf8";

    // State
    this.linearVal = options.value !== undefined ? options.value : this.defaultVal;
    this.rotVal = options.rotValue !== undefined ? options.rotValue : 0;
    this.dragMode = null; // null | 'rail' | 'linear' | 'rot' | 'both'
    this.panLatch = false;
    this.isFocused = false;
    this.fadeTimer = null;
    this.onChange = options.onChange || null;

    this.dragState = {
      active: false,
      mode: 'linear',
      startX: 0,
      startY: 0,
      startLin: this.linearVal,
      startRot: this.rotVal,
      isMod: false
    };

    this.initDOM();
    this.setupListeners();
    this.render();
  }

  initDOM() {
    this.container.classList.add("ltp-fader-container");
    this.container.style.position = "relative";
    this.container.style.width = `${this.width}px`;
    this.container.style.height = `${this.height}px`;
    this.container.style.margin = "0 auto";
    this.container.style.userSelect = "none";

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width * window.devicePixelRatio || this.width * 2;
    this.canvas.height = this.height * window.devicePixelRatio || this.height * 2;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.canvas.style.display = "block";
    this.canvas.style.cursor = "ns-resize";
    this.canvas.style.borderRadius = "8px";
    this.canvas.style.touchAction = "none";

    this.ctx = this.canvas.getContext("2d");
    this.container.innerHTML = "";
    this.container.appendChild(this.canvas);
  }

  valToNorm(v) {
    const clamped = Math.max(this.min, Math.min(this.max, v));
    if (this.isLog) {
      return Math.log10(clamped / this.min) / Math.log10(this.max / this.min);
    }
    return (clamped - this.min) / ((this.max - this.min) || 1);
  }

  normToVal(n) {
    const clampedN = Math.max(0, Math.min(1, n));
    if (this.isLog) {
      return this.min * Math.pow(this.max / this.min, clampedN);
    }
    return this.min + (clampedN * (this.max - this.min));
  }

  getHandlePos(val) {
    const norm = this.valToNorm(val);
    if (this.isHorizontal) {
      const drawW = this.width - 40;
      return 20 + drawW * norm;
    } else {
      const drawH = this.height - 40;
      return 20 + drawH * (1.0 - norm);
    }
  }

  getValFromPos(x, y) {
    if (this.isHorizontal) {
      const drawW = this.width - 40;
      const norm = (x - 20) / drawW;
      return this.normToVal(norm);
    } else {
      const drawH = this.height - 40;
      const norm = (drawH - (y - 20)) / drawH;
      return this.normToVal(norm);
    }
  }

  triggerFocus() {
    this.isFocused = true;
    this.container.classList.add("ltp-active-focus");
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  scheduleFadeAway() {
    if (this.fadeTimer) clearTimeout(this.fadeTimer);
    this.fadeTimer = setTimeout(() => {
      this.isFocused = false;
      this.container.classList.remove("ltp-active-focus");
      this.render();
    }, 1800);
  }

  render() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 2;
    const w = this.width;
    const h = this.height;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const isNarrow = this.isHorizontal ? h < 50 : w < 50;

    // Panel slot bevel shadow
    ctx.fillStyle = "rgba(10, 15, 26, 0.75)";
    ctx.beginPath();
    ctx.roundRect(4, 4, w - 8, h - 8, 6);
    ctx.fill();

    // Central Rail Slot
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (this.isHorizontal) {
      ctx.moveTo(20, cy);
      ctx.lineTo(w - 20, cy);
    } else {
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, h - 20);
    }
    ctx.stroke();

    // Inner track line
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Master highlight fill up to cap
    const handlePos = this.getHandlePos(this.linearVal);
    ctx.strokeStyle = this.isFocused ? this.railColor : "rgba(6, 182, 212, 0.6)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (this.isHorizontal) {
      ctx.moveTo(20, cy);
      ctx.lineTo(handlePos, cy);
    } else {
      ctx.moveTo(cx, h - 20);
      ctx.lineTo(cx, handlePos);
    }
    ctx.stroke();

    // Precision calibration tick marks
    const steps = isNarrow ? 5 : 8;
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1;
    ctx.font = isNarrow ? "7px monospace" : "9px monospace";
    ctx.fillStyle = "#64748b";

    for (let i = 0; i <= steps; i++) {
      const norm = i / steps;
      const val = this.normToVal(norm);
      const tw = (i === 0 || i === steps || i === Math.floor(steps / 2)) ? 8 : 4;
      ctx.beginPath();
      if (this.isHorizontal) {
        const x = 20 + (w - 40) * norm;
        ctx.moveTo(x, cy - tw);
        ctx.lineTo(x, cy + tw);
        ctx.stroke();
      } else {
        const y = 20 + (h - 40) * (1.0 - norm);
        ctx.moveTo(cx - tw, y);
        ctx.lineTo(cx + tw, y);
        ctx.stroke();
        if (i % 2 === 0 && !isNarrow) {
          ctx.textAlign = "left";
          const formatted = val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${Math.round(val)}`;
          ctx.fillText(formatted, cx + 14, y + 3);
        }
      }
    }

    const hx = this.isHorizontal ? handlePos : cx;
    const hy = this.isHorizontal ? cy : handlePos;

    // Draw Linear Travelling Potentiometer Cap
    ctx.save();
    // Cap shadow
    ctx.shadowColor = this.isFocused ? this.railColor : "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = this.isFocused ? 14 : 8;
    ctx.shadowOffsetY = 2;

    // Cap outer ring (Brushed aluminium / Bakelite rim)
    const capGrad = ctx.createRadialGradient(hx - 3, hy - 3, 2, hx, hy, this.capRadius);
    capGrad.addColorStop(0, "#475569");
    capGrad.addColorStop(0.5, "#1e293b");
    capGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = capGrad;
    ctx.strokeStyle = this.isFocused ? this.capAccent : "#475569";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(hx, hy, this.capRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Rotational Potentiometer Pointer (Angle +/-135 deg based on rotVal)
    const rotSpan = (this.rotMax - this.rotMin) || 200;
    const normRot = ((this.rotVal - this.rotMin) / rotSpan) * 2 - 1;
    const rotAngle = normRot * 135;
    const rad = (rotAngle - 90) * (Math.PI / 180);

    const ptrLen = this.capRadius - 3;
    const px = hx + ptrLen * Math.cos(rad);
    const py = hy + ptrLen * Math.sin(rad);

    ctx.strokeStyle = this.capAccent;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Center brass pivot jewel
    ctx.fillStyle = this.capAccent;
    ctx.beginPath();
    ctx.arc(hx, hy, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Floating Numeric Readout Chip (Always visible while active/focused)
    if (this.isFocused || this.dragState.active) {
      const fVal = this.linearVal >= 1000 ? `${(this.linearVal / 1000).toFixed(2)}k` : `${this.linearVal.toFixed(this.linearVal < 10 ? 1 : 0)}`;
      const linTxt = `${fVal} ${this.unitText}`.trim();
      const rotTxt = this.rotVal !== 0 ? ` &bull; ${this.rotVal > 0 ? '+' : ''}${this.rotVal.toFixed(0)}°` : '';
      const fullTxt = `${linTxt}${rotTxt}`;

      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      const chipW = ctx.measureText(fullTxt).width + 14;
      const chipH = 18;
      const chipX = cx;
      const chipY = Math.max(12, hy - this.capRadius - 16);

      ctx.fillStyle = "rgba(11, 15, 25, 0.95)";
      ctx.strokeStyle = this.capAccent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(chipX - chipW / 2, chipY - chipH / 2, chipW, chipH, 4);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#f8fafc";
      ctx.fillText(fullTxt, chipX, chipY + 3.5);
    }

    ctx.restore();
  }

  getPointerCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const sx = this.width / (rect.width || 1);
    const sy = this.height / (rect.height || 1);
    return {
      x: (e.clientX - rect.left) * sx,
      y: (e.clientY - rect.top) * sy
    };
  }

  isOverHandle(x, y) {
    const hp = this.getHandlePos(this.linearVal);
    const hx = this.isHorizontal ? hp : this.width / 2;
    const hy = this.isHorizontal ? this.height / 2 : hp;
    return Math.hypot(x - hx, y - hy) <= this.capRadius * 1.5;
  }

  setupListeners() {
    this.canvas.addEventListener("pointerdown", (e) => {
      this.triggerFocus();
      const { x, y } = this.getPointerCoords(e);
      try { this.canvas.setPointerCapture(e.pointerId); } catch (_) {}

      if (this.isOverHandle(x, y)) {
        const mode = (this.panLatch || e.altKey) ? 'rot' : 'linear';
        this.dragState = {
          active: true,
          mode,
          startX: x,
          startY: y,
          startLin: this.linearVal,
          startRot: this.rotVal,
          isMod: e.altKey
        };
      } else {
        // Click on rail jumps to position
        this.dragState = {
          active: true,
          mode: 'rail',
          startX: x,
          startY: y,
          startLin: this.linearVal,
          startRot: this.rotVal,
          isMod: false
        };
        const nextVal = Math.max(this.min, Math.min(this.max, this.getValFromPos(x, y)));
        this.setValue(nextVal);
      }
      this.render();
    });

    this.canvas.addEventListener("pointermove", (e) => {
      if (!this.dragState.active) return;
      this.triggerFocus();
      const { x, y } = this.getPointerCoords(e);

      if (this.dragState.mode === 'rail') {
        const nextVal = Math.max(this.min, Math.min(this.max, this.getValFromPos(x, y)));
        this.setValue(nextVal);
        return;
      }

      const isRot = this.dragState.mode === 'rot' || this.panLatch || e.altKey;
      if (isRot) {
        // Horizontal movement rotates the cap
        const deltaRot = (x - this.dragState.startX) * ((this.rotMax - this.rotMin) / 120);
        const nextRot = Math.max(this.rotMin, Math.min(this.rotMax, this.dragState.startRot + deltaRot));
        this.setRotation(nextRot);
      } else {
        // Vertical movement slides the fader
        const dy = -(y - this.dragState.startY) / (this.height - 40);
        const curNorm = this.valToNorm(this.dragState.startLin);
        const nextVal = Math.max(this.min, Math.min(this.max, this.normToVal(curNorm + dy)));
        this.setValue(nextVal);
      }
    });

    const onPointerUp = (e) => {
      if (!this.dragState.active) return;
      this.dragState.active = false;
      this.panLatch = false;
      try { this.canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      this.scheduleFadeAway();
      this.render();
    };

    this.canvas.addEventListener("pointerup", onPointerUp);
    this.canvas.addEventListener("pointercancel", onPointerUp);

    // Double click toggles rotation pan latch
    this.canvas.addEventListener("dblclick", (e) => {
      const { x, y } = this.getPointerCoords(e);
      if (this.isOverHandle(x, y)) {
        this.panLatch = !this.panLatch;
        this.triggerFocus();
        this.render();
      }
    });

    // Native mouse wheel for fine incrementing
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.triggerFocus();
      const delta = Math.sign(e.deltaY) * -1;
      if (e.altKey) {
        const step = (this.rotMax - this.rotMin) / 36;
        this.setRotation(Math.max(this.rotMin, Math.min(this.rotMax, this.rotVal + delta * step)));
      } else {
        const range = this.max - this.min;
        const step = range / 50;
        this.setValue(Math.max(this.min, Math.min(this.max, this.linearVal + delta * step)));
      }
      this.scheduleFadeAway();
    }, { passive: false });
  }

  setValue(val, suppressEmit = false) {
    this.linearVal = Math.max(this.min, Math.min(this.max, val));
    this.render();
    if (!suppressEmit && typeof this.onChange === "function") {
      this.onChange({ value: this.linearVal, rotValue: this.rotVal });
    }
  }

  setRotation(rot, suppressEmit = false) {
    this.rotVal = Math.max(this.rotMin, Math.min(this.rotMax, rot));
    this.render();
    if (!suppressEmit && typeof this.onChange === "function") {
      this.onChange({ value: this.linearVal, rotValue: this.rotVal });
    }
  }

  getValue() {
    return { value: this.linearVal, rotValue: this.rotVal };
  }
}

window.LTPFader = LTPFader;
