/**
 * Activity wayfinding.
 *
 * Each interactive activity on the page (control panel, scope, calculator, explorer…) is framed as a
 * numbered activity tied to its chapter number in the Story Index ("Activity 6.5-B · …"), with a
 * one-line instruction, what it drives, and an end rule. Each section that has activities gets an
 * "Activities in this section" strip under its header, linking to them.
 *
 * The activities wrap existing nodes (moved, never cloned), so ids, data-probe-target attributes and
 * listeners are kept. A registry entry names a host element and the first/last host children to wrap
 * ("from"/"to" may be any element inside those children). A host whose children are all wrapped
 * drops its own card frame so the activity frames are the only rules.
 */
(function () {
  "use strict";

  const ACTIVITIES = [
    // 3.0 Levels pyramid
    { sec: "pyramid-section", host: ".pyr-split", from: ".pyr-split-left",
      title: "Pick a level on the pyramid", short: "Pyramid",
      brief: "Click a tier (microphone, consumer line, professional line, maximum headroom) to load its nominal level.",
      link: "Drives the voltmeter and level converter in the next activity." },
    { sec: "pyramid-section", host: ".pyr-split", from: ".pyr-split-right",
      title: "Read and convert the level", short: "Voltmeter & converter",
      brief: "Turn the range knob or type a level in dBu, dBV or V RMS; the other units are recalculated.",
      link: "Marks the matching pyramid tier in the previous activity.", results: ["#pyramid-meter-alignment-hud"] },

    // 4.0 Enclosure explorer
    { sec: "enclosure-explorer", host: ".container", from: ".enclosure-diagram-container",
      title: "Select an enclosure in the signal chain", short: "Enclosure explorer",
      brief: "Click a box in the chain diagram; the panel below gives its grounding, shielding and the standard that covers it.",
      results: ["#enclosure-detail-panel"] },

    // 4.2 Multichannel breakout
    { sec: "multichannel-hierarchy", host: ".container", from: ".mc-mode-btn", to: ".aes-spec-table",
      title: "Trace one path through the breakout", short: "Path tracer",
      brief: "Choose XLR or TRS breakout and a path (1–8), or click a row of the cross-reference table; the diagram traces that path from the DB25 through the QTP cable to its connector.",
      link: "The path buttons and the table rows both drive the diagram." },
    { sec: "multichannel-hierarchy", host: ".container", from: ".qtp-sim-card",
      title: "Snake and QTP fault examples", short: "Fault examples",
      brief: "Nine worked faults, one per example, each with its wiring and meter readings. Read them in order or jump to one from the Story Index." },
    { sec: "multichannel-hierarchy", host: ".container", from: ".aes59-always-accessible-card",
      title: "Look up a path in the AES59 8-path matrix", short: "AES59 matrix",
      brief: "Reference matrix for all eight paths: DB25 pin, pair colour and XLR pin for each leg." },

    // 4.5 XLR hub
    { sec: "xlr-hub", host: ".container", from: ".xlr-mode-btn", to: ".xlr-hub-grid",
      title: "Pick an AES14 Table 2 configuration", short: "XLR configurations",
      brief: "Choose one of the eight configurations; Table 2 marks its row and the pin inspector shows the mating face and circuit.",
      results: [".xlr-inspector-sticky"] },

    // 5.0 Key findings: definition calculators
    ...[
      ["Balanced interconnection: unbalance the legs", "Leg impedance", "Move Z1 and Z2 apart; the imbalance and the IEC limit are recalculated."],
      ["Common-mode voltage", "V_CM", "Set the Pin 2 and Pin 3 potentials or use a preset; V_CM is their average."],
      ["Differential-mode voltage", "V_DM", "Set the Pin 2 and Pin 3 potentials; V_DM is their difference."],
      ["Common-mode rejection ratio", "CMRR", "Set the common-mode input and gain; the output error and CMRR in dB follow."],
      ["Shield-current-induced noise", "SCIN", "Choose the cable construction, shield current and run length; the induced noise is calculated."],
      ["Ground voltage difference", "V_GVD", "Set the neutral current and earth resistance; the ground voltage difference between chassis follows."],
    ].map(([title, short, brief], i) => ({
      sec: "top-level", host: `.definitions-grid > .term-card:nth-of-type(${i + 1})`, from: ".micro-demo-container",
      title, short, brief })),

    // 6.0 Standardized circuits 6.1 – 6.8 (one bench each)
    ...[
      ["6-1", "Circuit 6.1: drive the dual push-pull output", "6.1 Push-pull",
        "Pick a level preset or set drive, series impedance and load on the AN/URM-1960 panel; try the Pin 3 short. The bench readouts and the probes on the schematic update live."],
      ["6-2", "Circuit 6.2: drive the impedance-balanced output", "6.2 Impedance-balanced",
        "Set the panel controls; the probes on the schematic below show the voltages on each leg."],
      ["6-3", "Circuit 6.3: drive the transformer-floating output", "6.3 Transformer floating",
        "Set the panel controls; the probes on the schematic below show the voltages on each leg."],
      ["6-4", "Circuit 6.4: inject RF into the cascaded link", "6.4 Cascaded link",
        "Set the audio drive, RF noise amplitude and load resistance; the schematic below shows how much of the RF reaches the receiver."],
      ["6-5", "Circuit 6.5: probe the cross-coupled output", "6.5 Cross-coupled",
        "Read the probe values; the schematic below marks where each probe is taken."],
      ["6-6", "Circuit 6.6: probe the differential receiver", "6.6 Diff receiver",
        "Read the probe values; the schematic below marks where each probe is taken."],
      ["6-7", "Circuit 6.7: probe the instrumentation receiver", "6.7 Instrumentation amp",
        "Read the probe values; the schematic below marks where each probe is taken."],
      ["6-8", "Circuit 6.8: probe the active-transformer system", "6.8 Active-transformer",
        "Read the probe values; the schematic below marks where each probe is taken."],
    ].map(([id, title, short, brief]) => ({
      sec: "topologies", host: `#circuit-${id} > .svg-diagram-card`, title, short, brief })),

    // 6.5 Transformer lab
    { sec: "transformer-simulator", host: ".xfmr-main-card", from: "#xfmr-sat-badge", to: ".xfmr-instruments-row",
      title: "Observe the transformer on the bench", short: "Schematic, scope & Bode",
      brief: "Read-only. The schematic, readouts, oscilloscope (time domain) and Bode plot (frequency domain) show the transformer as currently wound and terminated.",
      link: "Driven by the analyzer panel in the next activity." },
    { sec: "transformer-simulator", host: ".xfmr-main-card", from: ".vintage-military-panel",
      title: "Wind, drive and terminate the transformer", short: "Winding analyzer",
      brief: "Pick a preset or set the core, turns and wire gauge; choose the generator, drive level and secondary termination.",
      link: "Drives the schematic, scope and Bode plot above. The recommended Zobel termination at the bottom is this panel’s result.",
      results: ["#zobel-recommendation-card"] },

    // 7.0 Thevenin model
    { sec: "deepest-dive", host: ".svg-diagram-card",
      title: "Unbalance the Thevenin interconnection", short: "Thevenin network",
      brief: "Set the source, cable and receiver impedances on the panel; the network below shows the error voltage, derived step by step underneath." },

    // 8.5 Adapter wiring suite (inside section 8.0)
    { sec: "tutorials-section", chapter: "adapter-wiring-suite", no: "8.5", host: "", from: "#adapter-wiring-suite",
      title: "Wire an adapter", short: "Adapter wiring",
      brief: "Select the standard, signal flow and driver topology; the schematic shows the adapter wiring and the box below gives the diagnosis." },

    // Curriculum
    { sec: "curriculum-modules", no: "", host: ".container", from: "#module-search-input", to: "#modules-grid-container",
      title: "Find and open a curriculum module", short: "Module finder",
      brief: "Search by keyword or filter by part; click a module card to open it in the reader." },

    // 10.0 Data sheet generator
    { sec: "datasheet-templates", host: ".container", from: ".ds-generator-grid",
      title: "Generate a data sheet", short: "Data sheet generator",
      brief: "Load a preset or type the device parameters; the data sheet at right is written as you type and can be copied or downloaded.",
      results: ["#ds-rendered-view"] },

    // 11.0 PAR glossary
    { sec: "dennis-bohn-par", host: ".container", from: "#par-glossary-grid",
      title: "Look up a term in the A–Z glossary", short: "A–Z glossary",
      brief: "Pick a letter to jump through the glossary; each card gives the term as defined in the Pro Audio Reference." },

    // 11.5 Landmark papers
    { sec: "landmark-papers", host: "", from: "#paper-search-input", to: "#landmark-papers-grid",
      title: "Filter the papers dossier", short: "Papers filter",
      brief: "Search or pick a category; the list below shows only the matching papers and drafts." },
  ];

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // Chapter number as the Story Index shows it ("6.5 Audio Transformer Lab" → "6.5")
  function chapterNo(target, fallback) {
    const link = document.querySelector(`#story-index-sidebar .story-chapter[data-target="${target}"] .chapter-link`);
    const m = (link?.textContent || "").trim().match(/^(\d+(?:\.\d+)?)\s/);
    return m ? m[1] : (fallback ?? "");
  }

  // The direct child of `host` that contains `el`
  function childOf(host, el) {
    while (el && el.parentElement !== host) el = el.parentElement;
    return el;
  }

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function build() {
    const letters = {};
    const bySection = new Map();

    ACTIVITIES.forEach(a => {
      const sec = document.getElementById(a.sec);
      if (!sec) return;
      const host = a.host ? sec.querySelector(a.host) : sec;
      if (!host) return;
      let first = a.from ? childOf(host, host.querySelector(a.from)) : host.firstElementChild;
      const last = a.to ? childOf(host, host.querySelector(a.to)) : (a.from ? first : host.lastElementChild);
      // A full-screen button row placed just before the first child belongs to it
      if (first && first.previousElementSibling?.classList.contains("fs-btn-row")) first = first.previousElementSibling;
      if (!first || !last) return;
      const run = [];
      for (let n = first; n; n = n.nextElementSibling) { run.push(n); if (n === last) break; }
      if (run[run.length - 1] !== last) return;

      const no = chapterNo(a.chapter || a.sec, a.no);
      const key = no || a.sec;
      const letter = String.fromCharCode(65 + (letters[key] = (letters[key] ?? -1) + 1));
      const label = no ? `${no}-${letter}` : letter;
      const id = `activity-${slug(no ? label : a.sec + "-" + letter)}`;

      const box = el("div", "activity");
      box.id = id;
      box.dataset.activity = label;

      const head = el("div", "activity-head");
      const line = el("div", "activity-head-line");
      line.append(el("span", "activity-no", `Activity ${label}`), el("span", "activity-title", a.title));
      head.append(line, el("p", "activity-brief", a.brief));
      if (a.link) head.append(el("p", "activity-link", a.link));

      const body = el("div", "activity-body");
      const foot = el("div", "activity-foot", `End of Activity ${label}`);
      host.insertBefore(box, first);
      run.forEach(n => body.appendChild(n));
      box.append(head, body, foot);

      (a.results || []).forEach(sel => {
        const r = body.querySelector(sel);
        if (r) { r.classList.add("activity-result"); r.dataset.activityResult = `Result · Activity ${label}`; }
      });

      if (!bySection.has(sec)) bySection.set(sec, []);
      bySection.get(sec).push({ id, label, short: a.short || a.title });
    });

    // Children with no frame of their own get inner padding so text does not touch the activity rule;
    // an unframed wrapper around a single framed card passes through, so the card sits on the rule
    const framed = (n) => {
      const cs = getComputedStyle(n);
      return parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0;
    };
    document.querySelectorAll(".activity-body > *").forEach(c => {
      if (framed(c)) return;
      const only = c.children.length === 1 && c.children[0];
      c.classList.add(only && framed(only) ? "activity-pass" : "activity-pad");
    });

    // Hosts whose content is now entirely activities drop their own card frame
    document.querySelectorAll(".activity").forEach(box => {
      const host = box.parentElement;
      if (host && !host.matches("section, .container") &&
          [...host.children].every(c => c.classList.contains("activity") || c.tagName === "SCRIPT")) {
        host.classList.add("activity-host");
      }
    });

    // "Activities in this section" strip under each section header
    bySection.forEach((items, sec) => {
      const header = sec.querySelector(".section-header");
      if (!header || header.querySelector(".activity-strip")) return;
      const nav = el("nav", "activity-strip");
      nav.setAttribute("aria-label", "Activities in this section");
      nav.append(el("span", "activity-strip-label", items.length === 1 ? "Activity in this section" : "Activities in this section"));
      const list = el("span", "activity-strip-list");
      items.forEach(it => {
        const a = el("a", "activity-strip-link");
        a.href = `#${it.id}`;
        a.append(el("span", "activity-strip-no", it.label), document.createTextNode(" " + it.short));
        list.append(a);
      });
      nav.append(list);
      header.append(nav);
    });
  }

  document.addEventListener("DOMContentLoaded", () => setTimeout(build, 0));
})();
