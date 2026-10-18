/**
 * review-comments.js — Reviewer sign-in, click-to-comment notes, and an emailable summary
 *
 * - "Review" button in the header: the reviewer signs in with a name or initials (e.g. APK).
 * - While commenting is on, clicking any paragraph, heading, card or figure opens a note box.
 *   Selected text is quoted into the note automatically.
 * - Each note shows as a numbered pin beside the thing it is about; click a pin to edit/delete.
 * - The "Review Notes" section at the end of the page lists every note by section, with
 *   Email / Copy / Download buttons so the summary can be sent back to the authors.
 *
 * Notes live in this browser's localStorage only — nothing is uploaded anywhere.
 */

// Address pre-filled in the "To:" box of the review summary (reviewers can change it).
const REVIEW_AUTHORS_EMAIL = "";

class ReviewComments {
  constructor() {
    this.KEY_NAME = "ba-review-name";
    this.KEY_NOTES = "ba-review-notes";
    this.KEY_TO = "ba-review-to";
    this.name = this.load(this.KEY_NAME, "");
    this.notes = this.load(this.KEY_NOTES, []);
    this.active = false;
    this.hoverEl = null;
    this.init();
  }

  load(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) {
      return fallback;
    }
  }

  save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) { /* private window: notes last for this visit only */ }
  }

  init() {
    this.buildHeaderButton();
    this.buildBar();
    this.buildPinLayer();
    this.buildSummarySection();
    this.buildPopover();

    document.addEventListener("mouseover", (e) => this.onHover(e), true);
    document.addEventListener("click", (e) => this.onClick(e), true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (this.popover.hidden) this.setActive(false);
        else this.closePopover();
      }
    });

    // Layout shifts constantly (sims, meters, collapsibles) so pins re-place on a timer.
    window.addEventListener("resize", () => this.placePins());
    setInterval(() => this.placePins(), 1000);
    this.renderAll();
  }

  /* ---------- UI construction ---------- */

  buildHeaderButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "review-toggle";
    btn.className = "review-toggle-btn";
    btn.title = "Sign in and click anything on the page to leave a review note";
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.setActive(!this.active);
    });
    const theme = document.getElementById("theme-toggle");
    if (theme && theme.parentNode) theme.parentNode.insertBefore(btn, theme);
    else document.body.appendChild(btn);
    this.toggleBtn = btn;
  }

  buildBar() {
    const bar = document.createElement("div");
    bar.id = "review-bar";
    bar.className = "review-bar";
    bar.hidden = true;
    bar.innerHTML = `
      <span class="review-bar-dot"></span>
      <span>Commenting as <strong id="review-bar-name"></strong> &mdash; click anything to add a note (select text first to quote it). Esc to stop.</span>
      <a href="#review-summary" class="review-bar-link">Summary (<span id="review-bar-count">0</span>)</a>
      <button type="button" id="review-bar-switch" class="review-bar-btn">Switch reviewer</button>
      <button type="button" id="review-bar-done" class="review-bar-btn">Done</button>`;
    document.body.appendChild(bar);
    bar.querySelector("#review-bar-done").addEventListener("click", () => this.setActive(false));
    bar.querySelector("#review-bar-switch").addEventListener("click", () => {
      if (this.signIn(true)) this.renderAll();
    });
    this.bar = bar;
  }

  buildPinLayer() {
    const layer = document.createElement("div");
    layer.id = "review-pin-layer";
    layer.className = "review-pin-layer";
    document.body.appendChild(layer);
    this.pinLayer = layer;
  }

  buildSummarySection() {
    const section = document.createElement("section");
    section.id = "review-summary";
    section.className = "section review-summary";
    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Reviewer Notes</span>
          <h2 class="section-title">Review Comment Summary</h2>
          <p class="section-lead" style="margin: 0;">
            Press <strong>Review</strong> in the header, sign in with your name or initials, then click anything
            on the page to leave a note. Every note is collected here &mdash; email the summary back to the authors when you are done.
            Notes are saved in this browser only.
          </p>
        </div>
        <div class="review-actions">
          <label class="review-to">To: <input type="email" id="review-to" placeholder="authors@example.com"></label>
          <button type="button" class="review-action-btn primary" id="review-email">✉ Email to authors</button>
          <button type="button" class="review-action-btn" id="review-copy">Copy text</button>
          <button type="button" class="review-action-btn" id="review-download">Download .txt</button>
          <button type="button" class="review-action-btn" id="review-start">Start commenting</button>
          <button type="button" class="review-action-btn danger" id="review-clear">Clear all notes</button>
        </div>
        <p class="review-status" id="review-status" aria-live="polite"></p>
        <div id="review-list" class="review-list"></div>
      </div>`;

    const footer = document.querySelector(".site-footer");
    if (footer) footer.parentNode.insertBefore(section, footer);
    else document.body.appendChild(section);

    const to = section.querySelector("#review-to");
    to.value = this.load(this.KEY_TO, REVIEW_AUTHORS_EMAIL);
    to.addEventListener("input", () => this.save(this.KEY_TO, to.value.trim()));

    section.querySelector("#review-email").addEventListener("click", () => this.emailSummary());
    section.querySelector("#review-copy").addEventListener("click", () => this.copySummary());
    section.querySelector("#review-download").addEventListener("click", () => this.downloadSummary());
    section.querySelector("#review-start").addEventListener("click", () => this.setActive(true));
    section.querySelector("#review-clear").addEventListener("click", () => {
      if (!this.notes.length) return;
      if (!confirm(`Delete all ${this.notes.length} review notes from this browser?`)) return;
      this.notes = [];
      this.persist();
    });
    section.querySelector("#review-list").addEventListener("click", (e) => {
      const go = e.target.closest("[data-review-go]");
      const del = e.target.closest("[data-review-del]");
      if (go) this.jumpTo(go.dataset.reviewGo);
      if (del) this.deleteNote(del.dataset.reviewDel);
    });
    this.summary = section;
  }

  buildPopover() {
    const pop = document.createElement("div");
    pop.id = "review-popover";
    pop.className = "review-popover";
    pop.hidden = true;
    pop.innerHTML = `
      <div class="review-pop-head">
        <span id="review-pop-title">New note</span>
        <span id="review-pop-who" class="review-pop-who"></span>
      </div>
      <div id="review-pop-where" class="review-pop-where"></div>
      <blockquote id="review-pop-quote" class="review-pop-quote" hidden></blockquote>
      <textarea id="review-pop-text" rows="4" placeholder="Your comment…"></textarea>
      <div class="review-pop-actions">
        <button type="button" id="review-pop-delete" class="review-action-btn danger">Delete</button>
        <span style="flex:1"></span>
        <button type="button" id="review-pop-cancel" class="review-action-btn">Cancel</button>
        <button type="button" id="review-pop-save" class="review-action-btn primary">Save note</button>
      </div>`;
    document.body.appendChild(pop);
    pop.querySelector("#review-pop-cancel").addEventListener("click", () => this.closePopover());
    pop.querySelector("#review-pop-save").addEventListener("click", () => this.savePopover());
    pop.querySelector("#review-pop-delete").addEventListener("click", () => {
      if (this.draft && this.draft.id) this.deleteNote(this.draft.id);
      this.closePopover();
    });
    pop.querySelector("#review-pop-text").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) this.savePopover();
    });
    this.popover = pop;
  }

  /* ---------- Sign-in & mode ---------- */

  signIn(force) {
    if (this.name && !force) return true;
    const entered = prompt("Reviewer name or initials (e.g. APK):", this.name || "");
    if (entered === null) return !!this.name;
    const clean = entered.trim().slice(0, 40);
    if (!clean) return !!this.name;
    this.name = clean;
    this.save(this.KEY_NAME, clean);
    return true;
  }

  setActive(on) {
    if (on && !this.signIn(false)) return;
    this.active = on;
    document.body.classList.toggle("review-mode", on);
    this.bar.hidden = !on;
    if (!on) {
      this.clearHover();
      this.closePopover();
    }
    this.renderToggle();
  }

  renderToggle() {
    const n = this.notes.length;
    const who = this.name ? ` · ${this.name}` : "";
    this.toggleBtn.textContent = this.active ? `💬 Commenting${who}` : `💬 Review${n ? ` (${n})` : ""}`;
    this.toggleBtn.classList.toggle("active", this.active);
    const nameEl = document.getElementById("review-bar-name");
    if (nameEl) nameEl.textContent = this.name;
    const countEl = document.getElementById("review-bar-count");
    if (countEl) countEl.textContent = n;
  }

  /* ---------- Picking a target ---------- */

  isOwnUI(el) {
    return !!el.closest("#review-popover, #review-bar, #review-pin-layer, #review-toggle, #review-summary");
  }

  // The element a click "is about": the nearest readable block, not a tiny span or the whole section.
  pickTarget(el) {
    const block = el.closest(
      "p, li, h1, h2, h3, h4, h5, h6, blockquote, figure, table, pre, svg, canvas, img, " +
      "[class*='card'], [class*='panel'], .section-header, .container > div"
    );
    let t = block || el;
    // Clicks inside an SVG drawing should pin to the whole drawing.
    if (t.ownerSVGElement) t = t.ownerSVGElement;
    while (t.ownerSVGElement) t = t.ownerSVGElement;
    if (t === document.body || t.matches("section, main, html")) return null;
    return t;
  }

  onHover(e) {
    if (!this.active || !this.popover.hidden) return;
    const t = this.isOwnUI(e.target) ? null : this.pickTarget(e.target);
    if (t === this.hoverEl) return;
    this.clearHover();
    if (t) {
      t.classList.add("review-hover");
      this.hoverEl = t;
    }
  }

  clearHover() {
    if (this.hoverEl) this.hoverEl.classList.remove("review-hover");
    this.hoverEl = null;
  }

  onClick(e) {
    const pin = e.target.closest(".review-pin");
    if (pin) {
      e.preventDefault();
      e.stopPropagation();
      const note = this.notes.find((n) => n.id === pin.dataset.id);
      if (note) this.openPopover(note, this.resolve(note));
      return;
    }
    if (!this.active || this.isOwnUI(e.target)) return;
    if (!this.popover.hidden) {
      this.closePopover();
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const target = this.pickTarget(e.target);
    if (!target) return;
    // Swallow the click so links, sims and toggles do not fire while commenting.
    e.preventDefault();
    e.stopPropagation();

    const sel = window.getSelection();
    let quote = sel && !sel.isCollapsed ? sel.toString().trim() : "";
    if (!quote) quote = this.snippet(target);

    const section = target.closest("section[id], footer, header");
    this.openPopover({
      id: null,
      author: this.name,
      path: this.pathOf(target),
      sectionId: section && section.id ? section.id : "",
      sectionTitle: this.sectionTitle(section),
      quote: quote.slice(0, 300),
      text: "",
      created: new Date().toISOString(),
    }, target);
  }

  snippet(el) {
    if (el.matches("svg, canvas, img")) {
      return "[" + (el.getAttribute("aria-label") || el.getAttribute("alt") || el.tagName.toLowerCase() + " drawing") + "]";
    }
    const t = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
    return t.length > 160 ? t.slice(0, 157) + "…" : t;
  }

  sectionTitle(section) {
    if (!section) return "Page";
    if (section.matches("header")) return "Header";
    if (section.matches("footer")) return "Footer";
    const h = section.querySelector(".section-title, h1, h2");
    return h ? h.textContent.replace(/\s+/g, " ").trim() : section.id;
  }

  // A stable-ish address: nearest ancestor with an id, then nth-child steps down to the element.
  pathOf(el) {
    const steps = [];
    let cur = el;
    while (cur && cur !== document.body) {
      if (cur.id && !cur.id.startsWith("review-")) {
        steps.unshift("#" + CSS.escape(cur.id));
        break;
      }
      const parent = cur.parentElement;
      if (!parent) break;
      const idx = Array.prototype.indexOf.call(parent.children, cur) + 1;
      steps.unshift(`${cur.tagName.toLowerCase()}:nth-child(${idx})`);
      cur = parent;
    }
    return steps.join(" > ");
  }

  resolve(note) {
    let el = null;
    try {
      el = note.path ? document.querySelector(note.path) : null;
    } catch (e) { /* stale selector */ }
    if (!el && note.sectionId) el = document.getElementById(note.sectionId);
    return el;
  }

  /* ---------- Popover ---------- */

  openPopover(note, anchor) {
    this.draft = { ...note };
    this.clearHover();
    const pop = this.popover;
    pop.querySelector("#review-pop-title").textContent = note.id ? `Note #${this.numberOf(note.id)}` : "New note";
    pop.querySelector("#review-pop-who").textContent = note.author;
    pop.querySelector("#review-pop-where").textContent = note.sectionTitle;
    const q = pop.querySelector("#review-pop-quote");
    q.textContent = note.quote;
    q.hidden = !note.quote;
    const ta = pop.querySelector("#review-pop-text");
    ta.value = note.text;
    pop.querySelector("#review-pop-delete").hidden = !note.id;
    pop.hidden = false;

    // Place next to the anchor, kept inside the viewport.
    const r = anchor ? anchor.getBoundingClientRect() : { left: 40, top: 80, bottom: 80, right: 40 };
    const w = Math.min(360, window.innerWidth - 32);
    pop.style.width = w + "px";
    let left = Math.min(Math.max(16, r.left), window.innerWidth - w - 16);
    let top = r.bottom + 8;
    const h = pop.offsetHeight;
    if (top + h > window.innerHeight - 16) top = Math.max(16, r.top - h - 8);
    if (top + h > window.innerHeight - 16) top = Math.max(16, window.innerHeight - h - 16);
    pop.style.left = left + "px";
    pop.style.top = top + "px";
    ta.focus();
  }

  closePopover() {
    this.popover.hidden = true;
    this.draft = null;
  }

  savePopover() {
    const d = this.draft;
    if (!d) return;
    const text = this.popover.querySelector("#review-pop-text").value.trim();
    if (!text) {
      this.popover.querySelector("#review-pop-text").focus();
      return;
    }
    if (d.id) {
      const n = this.notes.find((x) => x.id === d.id);
      if (n) {
        n.text = text;
        n.edited = new Date().toISOString();
      }
    } else {
      d.id = "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      d.text = text;
      this.notes.push(d);
    }
    this.closePopover();
    this.persist();
  }

  deleteNote(id) {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.persist();
  }

  persist() {
    this.save(this.KEY_NOTES, this.notes);
    this.renderAll();
  }

  /* ---------- Rendering ---------- */

  // Notes are numbered in page order so the summary reads top to bottom.
  ordered() {
    const withEl = this.notes.map((n) => ({ n, el: this.resolve(n) }));
    withEl.sort((a, b) => {
      if (a.el && b.el && a.el !== b.el) {
        return a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      }
      return a.n.created < b.n.created ? -1 : 1;
    });
    return withEl.map((x) => x.n);
  }

  numberOf(id) {
    return this.ordered().findIndex((n) => n.id === id) + 1;
  }

  renderAll() {
    this.renderToggle();
    this.renderPins();
    this.renderSummary();
  }

  renderPins() {
    this.pinLayer.innerHTML = "";
    this.ordered().forEach((n, i) => {
      const pin = document.createElement("button");
      pin.type = "button";
      pin.className = "review-pin";
      pin.dataset.id = n.id;
      pin.textContent = i + 1;
      pin.title = `${n.author}: ${n.text}`;
      this.pinLayer.appendChild(pin);
    });
    this.placePins();
  }

  placePins() {
    const pins = this.pinLayer.children;
    const stack = new Map();
    for (const pin of pins) {
      const note = this.notes.find((n) => n.id === pin.dataset.id);
      const el = note && this.resolve(note);
      if (!el || !el.getClientRects().length) {
        pin.style.display = "none";
        continue;
      }
      const r = el.getBoundingClientRect();
      const key = Math.round(r.top) + ":" + Math.round(r.right);
      const k = stack.get(key) || 0;
      stack.set(key, k + 1);
      pin.style.display = "";
      pin.style.top = r.top + window.scrollY - 6 + "px";
      pin.style.left = Math.min(r.right + window.scrollX - 10 - k * 24, document.documentElement.scrollWidth - 26) + "px";
    }
  }

  renderSummary() {
    const list = this.summary.querySelector("#review-list");
    const notes = this.ordered();
    if (!notes.length) {
      list.innerHTML = `<p class="review-empty">No notes yet. Press <strong>Start commenting</strong> and click anything on the page.</p>`;
      return;
    }
    const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    let html = "";
    let lastSection = null;
    notes.forEach((n, i) => {
      if (n.sectionTitle !== lastSection) {
        if (lastSection !== null) html += "</div>";
        html += `<h3 class="review-group">${esc(n.sectionTitle)}</h3><div class="review-group-items">`;
        lastSection = n.sectionTitle;
      }
      html += `
        <div class="review-item">
          <button type="button" class="review-item-num" data-review-go="${n.id}" title="Show on page">${i + 1}</button>
          <div class="review-item-body">
            ${n.quote ? `<blockquote class="review-pop-quote">${esc(n.quote)}</blockquote>` : ""}
            <p class="review-item-text">${esc(n.text)}</p>
            <span class="review-item-meta">${esc(n.author)} &bull; ${new Date(n.created).toLocaleString()}</span>
          </div>
          <button type="button" class="review-item-del" data-review-del="${n.id}" title="Delete note">✕</button>
        </div>`;
    });
    html += "</div>";
    list.innerHTML = html;
  }

  jumpTo(id) {
    const note = this.notes.find((n) => n.id === id);
    const el = note && this.resolve(note);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("review-flash");
    setTimeout(() => el.classList.remove("review-flash"), 1600);
  }

  /* ---------- Export ---------- */

  summaryText() {
    const notes = this.ordered();
    const reviewers = [...new Set(notes.map((n) => n.author))].join(", ");
    const lines = [
      `Review comments — ${document.title}`,
      `Reviewer: ${reviewers || this.name || "(unnamed)"}`,
      `Date: ${new Date().toLocaleString()}`,
      `Page: ${location.href.split("#")[0]}`,
      `Notes: ${notes.length}`,
      "",
    ];
    let lastSection = null;
    notes.forEach((n, i) => {
      if (n.sectionTitle !== lastSection) {
        lines.push("", `== ${n.sectionTitle} ==`, "");
        lastSection = n.sectionTitle;
      }
      lines.push(`${i + 1}. [${n.author}] ${n.text}`);
      if (n.quote) lines.push(`   > "${n.quote}"`);
      lines.push("");
    });
    return lines.join("\n");
  }

  status(msg) {
    const el = this.summary.querySelector("#review-status");
    el.textContent = msg;
    clearTimeout(this.statusTimer);
    this.statusTimer = setTimeout(() => (el.textContent = ""), 6000);
  }

  copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } finally {
      ta.remove();
    }
    return Promise.resolve();
  }

  copySummary() {
    if (!this.notes.length) return this.status("No notes to copy yet.");
    this.copyText(this.summaryText())
      .then(() => this.status("Summary copied to the clipboard."))
      .catch(() => this.status("Could not copy — use Download .txt instead."));
  }

  downloadSummary() {
    if (!this.notes.length) return this.status("No notes to download yet.");
    const blob = new Blob([this.summaryText()], { type: "text/plain" });
    const a = document.createElement("a");
    const who = (this.name || "review").replace(/[^\w-]+/g, "_");
    a.href = URL.createObjectURL(blob);
    a.download = `review-notes-${who}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  emailSummary() {
    if (!this.notes.length) return this.status("No notes to email yet.");
    const to = this.summary.querySelector("#review-to").value.trim();
    const text = this.summaryText();
    const subject = `Review comments (${this.name || "reviewer"}) — ${document.title}`;
    // Mail clients truncate long mailto links, so big summaries go via the clipboard.
    let body = text;
    if (encodeURIComponent(text).length > 1800) {
      body = "The full review summary is on the clipboard — paste it here.\n\n" +
        "(If it is not, use \"Download .txt\" on the page and attach the file.)";
      this.copyText(text).catch(() => {});
      this.status("Summary is long — copied to the clipboard; paste it into the email.");
    }
    location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.reviewComments = new ReviewComments();
});
