/**
 * story-sidebar.js — Dynamic Left-Side Story Index Tree & Auto-Hiding Header
 *
 * Requirements:
 * - When scrolling down, the top header smoothly hides to maximize document reading space.
 * - A persistent, interactive left-side Story Index Tree slides into view like a table of contents / story chapters.
 * - Dual-Tab Interface:
 *     1) 📖 Story Index: Highlights active chapter/demo in real time via IntersectionObserver.
 *     2) 🌳 Taxonomy Tree: Full interactive SC-05-05 Taxonomy Tree Explorer with search, expand/collapse,
 *        and detail inspector integrated directly into the sidebar.
 * - Clicking any chapter or taxonomy link smoothly scrolls or switches to the mind map.
 */

class StorySidebar {
  constructor() {
    this.header = document.querySelector(".site-header");
    this.sidebar = null;
    this.activeSectionId = null;
    this.lastScrollY = 0;
    this.activeTab = "chapters";
    this.init();
  }

  init() {
    this.createSidebarDOM();
    this.lockSidebarOpen();
    this.setupScrollListener();
    this.setupIntersectionObserver();
    this.setupSubnodeSpy();
    this.numberClauses();
    this.setupGlobalTreeLinks();
  }

  createSidebarDOM() {
    // Check if already in DOM
    if (document.getElementById("story-index-sidebar")) {
      this.sidebar = document.getElementById("story-index-sidebar");
      return;
    }

    const aside = document.createElement("aside");
    aside.id = "story-index-sidebar";
    aside.className = "story-index-sidebar";
    aside.setAttribute("aria-label", "Story Index & Taxonomy Mind Map Navigation");

    aside.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <span class="sidebar-icon">📖</span>
          <div class="sidebar-title-group">
            <span class="sidebar-title">Story &amp; Standards</span>
            <span class="sidebar-sub">AES-X152 Reference</span>
          </div>
        </div>
        <button id="sidebar-collapse-btn" class="sidebar-toggle-btn" title="Toggle Sidebar">◀</button>
      </div>

      <!-- Dual Navigation Tabs -->
      <div class="sidebar-tabs">
        <button type="button" id="sidebar-tab-chapters" class="sidebar-tab-btn active" data-tab="chapters">
          📖 Chapters
        </button>
        <button type="button" id="sidebar-tab-tree" class="sidebar-tab-btn" data-tab="tree">
          🌳 Taxonomy Tree
        </button>
      </div>

      <!-- View 1: Story Chapters Index -->
      <div id="sidebar-chapters-view" class="sidebar-view active" style="display: flex; flex-direction: column; flex: 1; overflow: hidden;">
        <div class="sidebar-scrollable-tree">
          <div class="story-chapter" data-target="hero">
            <div class="chapter-dot"></div>
            <a href="#hero" class="chapter-link">0. Prologue &amp; Mandate</a>
          </div>

          <div class="story-chapter" data-target="how-to-use">
            <div class="chapter-dot"></div>
            <a href="#how-to-use" class="chapter-link">★ How to Use This Lab</a>
          </div>

          <div class="story-chapter" data-target="triad">
            <div class="chapter-dot"></div>
            <a href="#triad" class="chapter-link">1.0 The Three Parts of the Chain</a>
          </div>

          <div class="story-chapter" data-target="pyramid-section">
            <div class="chapter-dot"></div>
            <a href="#pyramid-section" class="chapter-link">2.0 Dynamic Range &amp; Levels Pyramid</a>
          </div>

          <div class="story-chapter" data-target="enclosure-explorer">
            <div class="chapter-dot"></div>
            <a href="#enclosure-explorer" class="chapter-link">3.0 Enclosure &amp; Ground Physics</a>
          </div>

          <div class="story-chapter" data-target="multichannel-hierarchy">
            <div class="chapter-dot"></div>
            <a href="#multichannel-hierarchy" class="chapter-link">3.2 Multichannel Breakout (DB25 / RJ45)</a>
            <div class="chapter-subnodes fault-subnodes">
              <span class="subnode-heading">Snake / QTP faults</span>
              <a href="#qtp-demo-normal" class="subnode-link fault-subnode active" data-sidebar-fault="normal">✓ Normal Balanced</a>
              <a href="#qtp-demo-phase_flip" class="subnode-link fault-subnode" data-sidebar-fault="phase_flip">⚡ Phase Flip (180°)</a>
              <a href="#qtp-demo-pin_dropped_1" class="subnode-link fault-subnode" data-sidebar-fault="pin_dropped_1">⚠️ 1 Pin Dropped (Pin 2)</a>
              <a href="#qtp-demo-pin_dropped_2" class="subnode-link fault-subnode" data-sidebar-fault="pin_dropped_2">⚠️ 2 Pins Dropped (Pins 1 &amp; 3)</a>
              <a href="#qtp-demo-pin_dropped_3" class="subnode-link fault-subnode" data-sidebar-fault="pin_dropped_3">❌ 3 Pins Dropped</a>
              <a href="#qtp-demo-pin_dropped_4" class="subnode-link fault-subnode" data-sidebar-fault="pin_dropped_4">❌ 4 Pins Dropped (Trunk Open)</a>
              <a href="#qtp-demo-pair_dropped" class="subnode-link fault-subnode" data-sidebar-fault="pair_dropped">🚫 1 Pair Dropped (Mute)</a>
              <a href="#qtp-demo-shield_lifted" class="subnode-link fault-subnode" data-sidebar-fault="shield_lifted">🛡️ Shield Lifted (P48 Fails)</a>
              <a href="#qtp-demo-leg_flipped" class="subnode-link fault-subnode" data-sidebar-fault="leg_flipped">⇉ Mixed Polarity (1 Wire Flipped)</a>
            </div>
          </div>

          <div class="story-chapter" data-target="xlr-hub">
            <div class="chapter-dot"></div>
            <a href="#xlr-hub" class="chapter-link">3.5 Universal XLR Hub &amp; Polarity</a>
          </div>

          <div class="story-chapter" data-target="top-level">
            <div class="chapter-dot"></div>
            <a href="#top-level" class="chapter-link">4.0 Top-Level Normative Rules</a>
          </div>



          <div class="story-chapter" data-target="topologies">
            <div class="chapter-dot"></div>
            <a href="#topologies" class="chapter-link">5.0 Standardized Circuits (6.1–6.8)</a>
            <div class="chapter-subnodes">
              <a href="#circuit-6-1" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-1')">6.1 Dual Push-Pull</a>
              <a href="#circuit-6-2" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-2')">6.2 Active Impedance-Balanced</a>
              <a href="#circuit-6-3" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-3')">6.3 Transformer Floating</a>
              <a href="#circuit-6-4" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-4')">6.4 Cascaded Link</a>
              <a href="#circuit-6-5" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-5')">6.5 Cross-Coupled</a>
              <a href="#circuit-6-6" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-6')">6.6 Diff Receiver</a>
              <a href="#circuit-6-7" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-7')">6.7 Instrumentation Amp</a>
              <a href="#circuit-6-8" class="subnode-link" onclick="if(window.switchCircuit) switchCircuit('6-8')">6.8 Active-Transformer</a>
            </div>
          </div>

          <div class="story-chapter" data-target="transformer-simulator">
            <div class="chapter-dot"></div>
            <a href="#transformer-simulator" class="chapter-link">5.5 Audio Transformer Lab &amp; Zobel</a>
          </div>

          <div class="story-chapter" data-target="deepest-dive">
            <div class="chapter-dot"></div>
            <a href="#deepest-dive" class="chapter-link">6.0 Jim Meyer Thevenin CMRR</a>
          </div>

          <div class="story-chapter" data-target="tutorials-section">
            <div class="chapter-dot"></div>
            <a href="#tutorials-section" class="chapter-link">7.0 Richard Hess Unbalanced Matrix</a>
          </div>

          <div class="story-chapter" data-target="adapter-wiring-suite">
            <div class="chapter-dot"></div>
            <a href="#adapter-wiring-suite" class="chapter-link">7.5 Vector Adapter Wiring Suite</a>
          </div>

          <div class="story-chapter" data-target="taxonomy-tree">
            <div class="chapter-dot" style="background: var(--accent-cyan); box-shadow: 0 0 6px var(--accent-cyan);"></div>
            <a href="javascript:void(0)" id="sidebar-chapter-tree-btn" class="chapter-link" style="color: var(--accent-cyan); font-weight: 700;">
              8.0 Standards Taxonomy Tree ↗
            </a>
          </div>

          <div class="story-chapter" data-target="aes-vst">
            <div class="chapter-dot"></div>
            <a href="#aes-vst" class="chapter-link">9.0 AES-VST Plugin &amp; Map</a>
          </div>

          <div class="story-chapter" data-target="datasheet-templates">
            <div class="chapter-dot"></div>
            <a href="#datasheet-templates" class="chapter-link">10.0 Free Datasheet Templates</a>
          </div>

          <div class="story-chapter" data-target="dennis-bohn-par">
            <div class="chapter-dot"></div>
            <a href="#dennis-bohn-par" class="chapter-link">11.0 Dennis Bohn PAR Glossary</a>
          </div>

          <div class="story-chapter" data-target="landmark-papers">
            <div class="chapter-dot"></div>
            <a href="#landmark-papers" class="chapter-link">11.5 Landmark Papers Dossier</a>
          </div>

          <div class="story-chapter" data-target="timeline-section">
            <div class="chapter-dot"></div>
            <a href="#timeline-section" class="chapter-link">12.0 Standards Timeline</a>
          </div>

          <div class="story-chapter" data-target="roster-section">
            <div class="chapter-dot"></div>
            <a href="#roster-section" class="chapter-link">13.0 Contributor Roster</a>
          </div>
        </div>

        <!-- Quick meter launch dock toggle in sidebar -->
        <div class="sidebar-meter-action">
          <button id="sidebar-float-meters-btn" class="btn btn-outline" style="width: 100%; font-size: 0.76rem; padding: 0.35rem 0.5rem;">
            🎛️ Breakaway Meters
          </button>
        </div>
      </div>

      <!-- View 2: SC-05-05 Taxonomy Tree Explorer & Node Inspector -->
      <div id="sidebar-tree-view" class="sidebar-view" style="display: none; flex-direction: column; flex: 1; overflow: hidden;">
        <div class="sidebar-tree-toolbar">
          <input type="text" id="tree-search-input" class="sidebar-tree-search" placeholder="Search tree (e.g. CMRR, transformer, star-quad, AES48)..." />
          <div class="sidebar-tree-btn-group">
            <button type="button" id="tree-expand-all" class="sidebar-tree-btn">Expand All</button>
            <button type="button" id="tree-collapse-all" class="sidebar-tree-btn">Collapse All</button>
          </div>
        </div>

        <div class="sidebar-tree-viewport">
          <div id="tree-root-container"></div>
        </div>

        <!-- Node Detail Inspector Card -->
        <div class="sidebar-tree-inspector detail-card" id="tree-node-inspector">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h4 id="node-inspector-title" style="margin: 0; color: var(--accent-cyan); font-size: 0.95rem; font-weight: 700;">Select a Node</h4>
            <span id="node-inspector-badge" class="badge badge-accent" style="font-size: 0.65rem;">SC-05-05</span>
          </div>
          <div id="node-inspector-path" style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace; margin-bottom: 0.35rem;">
            Root / ...
          </div>
          <p id="node-inspector-desc" style="color: var(--text-secondary); line-height: 1.45; font-size: 0.78rem; margin: 0;">
            Click any branch or leaf in the taxonomy tree above to inspect its formal AES-X152 engineering definition, mathematical equations, and related standards.
          </p>
          <div id="node-inspector-extra" style="margin-top: 0.4rem; font-size: 0.75rem;"></div>
        </div>
      </div>
    `;

    document.body.appendChild(aside);
    this.sidebar = aside;

    // Mobile floating activator tab
    const mobileTab = document.createElement("button");
    mobileTab.id = "mobile-story-tab";
    mobileTab.className = "mobile-story-tab";
    mobileTab.innerHTML = "📖 Index";
    mobileTab.setAttribute("aria-label", "Toggle Story Index");
    document.body.appendChild(mobileTab);

    // Event listeners
    mobileTab.addEventListener("click", () => {
      this.sidebar.classList.toggle("mobile-open");
    });

    const collapseBtn = aside.querySelector("#sidebar-collapse-btn");
    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        this.sidebar.classList.toggle("collapsed");
        document.body.classList.toggle("sidebar-collapsed");
        collapseBtn.textContent = this.sidebar.classList.contains("collapsed") ? "▶" : "◀";
      });
    }

    const floatMetersBtn = aside.querySelector("#sidebar-float-meters-btn");
    if (floatMetersBtn) {
      floatMetersBtn.addEventListener("click", () => {
        if (window.floatingMeterDock) {
          window.floatingMeterDock.toggleFloat();
        }
      });
    }

    // QTP snake fault injection lives in the chapter list; it drives the simulator's own (hidden) fault buttons
    aside.querySelectorAll("[data-sidebar-fault]").forEach(link => {
      link.addEventListener("click", () => {
        const btn = document.querySelector(`.fault-btn[data-fault="${link.dataset.sidebarFault}"]`);
        if (btn) btn.click();
      });
    });

    // Tab buttons
    const tabChaptersBtn = aside.querySelector("#sidebar-tab-chapters");
    const tabTreeBtn = aside.querySelector("#sidebar-tab-tree");
    if (tabChaptersBtn) {
      tabChaptersBtn.addEventListener("click", () => this.switchTab("chapters"));
    }
    if (tabTreeBtn) {
      tabTreeBtn.addEventListener("click", () => this.switchTab("tree"));
    }

    // Chapter 7 direct button
    const ch7Btn = aside.querySelector("#sidebar-chapter-tree-btn");
    if (ch7Btn) {
      ch7Btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.switchTab("tree");
      });
    }
  }

  // The sidebar is permanent: always shown, never collapsed, content laid out beside it
  lockSidebarOpen() {
    if (!this.sidebar) return;
    this.sidebar.classList.add("sidebar-visible", "sidebar-locked");
    this.sidebar.classList.remove("collapsed", "scrolling-hidden");
    document.body.classList.add("has-story-sidebar");
    document.body.classList.remove("sidebar-collapsed", "sidebar-is-scrolling");
  }

  switchTab(tabName) {
    if (!this.sidebar) return;
    this.activeTab = tabName;

    const chaptersTabBtn = this.sidebar.querySelector("#sidebar-tab-chapters");
    const treeTabBtn = this.sidebar.querySelector("#sidebar-tab-tree");
    const chaptersView = this.sidebar.querySelector("#sidebar-chapters-view");
    const treeView = this.sidebar.querySelector("#sidebar-tree-view");

    if (tabName === "tree") {
      if (chaptersTabBtn) chaptersTabBtn.classList.remove("active");
      if (treeTabBtn) treeTabBtn.classList.add("active");
      if (chaptersView) chaptersView.style.display = "none";
      if (treeView) treeView.style.display = "flex";
      this.sidebar.classList.add("taxonomy-active");
      document.body.classList.add("sidebar-taxonomy-active");

      // Initialize tree viewer if not yet done
      if (typeof window.initTreeViewer === "function") {
        window.initTreeViewer();
      }
    } else {
      if (treeTabBtn) treeTabBtn.classList.remove("active");
      if (chaptersTabBtn) chaptersTabBtn.classList.add("active");
      if (treeView) treeView.style.display = "none";
      if (chaptersView) chaptersView.style.display = "flex";
      this.sidebar.classList.remove("taxonomy-active");
      document.body.classList.remove("sidebar-taxonomy-active");
    }
  }

  openTaxonomyTree() {
    if (this.sidebar) {
      this.sidebar.classList.add("sidebar-visible");
      this.sidebar.classList.remove("collapsed");
      document.body.classList.add("has-story-sidebar");
      document.body.classList.remove("sidebar-collapsed");
      this.switchTab("tree");
      const searchInput = document.getElementById("tree-search-input");
      if (searchInput) searchInput.focus();
    }
  }

  setupGlobalTreeLinks() {
    document.querySelectorAll("a[href='#tree-explorer']").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.openTaxonomyTree();
      });
    });
  }

  setupScrollListener() {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Hide top header when scrolled past hero
      if (currentScrollY > 180) {
        if (this.header) this.header.classList.add("header-hidden");
      } else {
        if (this.header) this.header.classList.remove("header-hidden");
      }

      this.lastScrollY = currentScrollY;
    }, { passive: true });
  }

  setupIntersectionObserver() {
    const sectionIds = [
      "hero",
      "how-to-use",
      "triad",
      "pyramid-section",
      "enclosure-explorer",
      "multichannel-hierarchy",
      "xlr-hub",
      "top-level",
      "topologies",
      "transformer-simulator",
      "deepest-dive",
      "tutorials-section",
      "adapter-wiring-suite",
      "aes-vst",
      "datasheet-templates",
      "dennis-bohn-par",
      "landmark-papers",
      "timeline-section",
      "roster-section"
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          this.setActiveChapter(id);
        }
      });
    }, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Keep an item visible inside the sidebar's own list. (scrollIntoView would also scroll the page.)
  revealInSidebar(el) {
    const list = el.closest(".sidebar-scrollable-tree");
    if (!list) return;
    const lr = list.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    if (er.top < lr.top) list.scrollBy({ top: er.top - lr.top - 8, behavior: "smooth" });
    else if (er.bottom > lr.bottom) list.scrollBy({ top: er.bottom - lr.bottom + 8, behavior: "smooth" });
  }

  // Standards-document clause numbers: each section title gets its chapter number
  numberClauses() {
    if (!this.sidebar) return;
    this.sidebar.querySelectorAll(".story-chapter[data-target]").forEach(ch => {
      const m = (ch.querySelector(".chapter-link")?.textContent || "").trim().match(/^(\d+(?:\.\d+)?)\s/);
      const title = document.querySelector(`#${ch.dataset.target} .section-title`);
      if (!m || !title || title.querySelector(".clause-no")) return;
      const no = document.createElement("span");
      no.className = "clause-no";
      no.textContent = m[1];
      title.prepend(no);
    });
  }

  // Highlight sub-items (e.g. 6.1–6.8) while their section is passing the upper part of the screen
  setupSubnodeSpy() {
    if (!this.sidebar) return;
    const links = [...this.sidebar.querySelectorAll(".subnode-link[href^='#']")];
    let queued = false;
    let lastPassing = null;

    const update = () => {
      queued = false;
      const vh = window.innerHeight;
      const inBand = (el) => {
        if (!el || el.offsetParent === null) return false;
        const r = el.getBoundingClientRect();
        return r.top < vh * 0.45 && r.bottom > vh * 0.15;
      };

      let passing = null;
      links.forEach(link => {
        const on = inBand(document.querySelector(link.getAttribute("href")));
        link.classList.toggle("passing", on);
        if (on && !passing) passing = link;
      });

      this.sidebar.querySelectorAll(".fault-subnodes").forEach(g => g.classList.toggle("passing", !!g.querySelector(".passing")));
      if (passing && passing !== lastPassing) this.revealInSidebar(passing);
      lastPassing = passing;
    };

    window.addEventListener("scroll", () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  setActiveChapter(targetId) {
    if (!this.sidebar || targetId === this.activeSectionId) return;
    this.activeSectionId = targetId;

    const chapters = this.sidebar.querySelectorAll(".story-chapter");
    chapters.forEach(ch => {
      const match = ch.getAttribute("data-target") === targetId;
      ch.classList.toggle("active", match);
      if (match) {
        // Ensure active item is smoothly scrolled into view inside sidebar
        this.revealInSidebar(ch);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.storySidebar = new StorySidebar();
});
