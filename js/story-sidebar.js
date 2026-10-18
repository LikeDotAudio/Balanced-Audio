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
    this.setupScrollListener();
    this.setupIntersectionObserver();
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

          <div class="story-chapter" data-target="enclosure-explorer">
            <div class="chapter-dot"></div>
            <a href="#enclosure-explorer" class="chapter-link">0.0 Enclosure &amp; Ground Physics</a>
          </div>

          <div class="story-chapter" data-target="multichannel-hierarchy">
            <div class="chapter-dot"></div>
            <a href="#multichannel-hierarchy" class="chapter-link">0.2 Multichannel Breakout (DB25 / RJ45)</a>
          </div>

          <div class="story-chapter" data-target="xlr-hub">
            <div class="chapter-dot"></div>
            <a href="#xlr-hub" class="chapter-link">0.5 Universal XLR Hub &amp; Polarity</a>
          </div>

          <div class="story-chapter" data-target="top-level">
            <div class="chapter-dot"></div>
            <a href="#top-level" class="chapter-link">1.0 Top-Level Normative Rules</a>
          </div>

          <div class="story-chapter" data-target="triad">
            <div class="chapter-dot"></div>
            <a href="#triad" class="chapter-link">2.0 The Triad of Interconnection</a>
          </div>

          <div class="story-chapter" data-target="pyramid-section">
            <div class="chapter-dot"></div>
            <a href="#pyramid-section" class="chapter-link">3.0 Dynamic Range &amp; Levels Pyramid</a>
          </div>

          <div class="story-chapter" data-target="topologies">
            <div class="chapter-dot"></div>
            <a href="#topologies" class="chapter-link">4.0 Standardized Circuits (6.1–6.8)</a>
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
            <a href="#transformer-simulator" class="chapter-link">4.5 Audio Transformer Lab &amp; Zobel</a>
          </div>

          <div class="story-chapter" data-target="deepest-dive">
            <div class="chapter-dot"></div>
            <a href="#deepest-dive" class="chapter-link">5.0 Jim Meyer Thevenin CMRR</a>
          </div>

          <div class="story-chapter" data-target="tutorials-section">
            <div class="chapter-dot"></div>
            <a href="#tutorials-section" class="chapter-link">6.0 Richard Hess Unbalanced Matrix</a>
          </div>

          <div class="story-chapter" data-target="adapter-wiring-suite">
            <div class="chapter-dot"></div>
            <a href="#adapter-wiring-suite" class="chapter-link">6.9 Vector Adapter Wiring Suite</a>
          </div>

          <div class="story-chapter" data-target="taxonomy-tree">
            <div class="chapter-dot" style="background: var(--accent-cyan); box-shadow: 0 0 6px var(--accent-cyan);"></div>
            <a href="javascript:void(0)" id="sidebar-chapter-tree-btn" class="chapter-link" style="color: var(--accent-cyan); font-weight: 700;">
              7.0 Standards Taxonomy Tree ↗
            </a>
          </div>

          <div class="story-chapter" data-target="aes-vst">
            <div class="chapter-dot"></div>
            <a href="#aes-vst" class="chapter-link">8.0 AES-VST Plugin &amp; Map</a>
          </div>

          <div class="story-chapter" data-target="datasheet-templates">
            <div class="chapter-dot"></div>
            <a href="#datasheet-templates" class="chapter-link">9.0 Free Datasheet Templates</a>
          </div>

          <div class="story-chapter" data-target="dennis-bohn-par">
            <div class="chapter-dot"></div>
            <a href="#dennis-bohn-par" class="chapter-link">10.0 Dennis Bohn PAR Glossary</a>
          </div>

          <div class="story-chapter" data-target="landmark-papers">
            <div class="chapter-dot"></div>
            <a href="#landmark-papers" class="chapter-link">10.5 Landmark Papers Dossier</a>
          </div>

          <div class="story-chapter" data-target="timeline-section">
            <div class="chapter-dot"></div>
            <a href="#timeline-section" class="chapter-link">11.0 Standards Timeline</a>
          </div>

          <div class="story-chapter" data-target="roster-section">
            <div class="chapter-dot"></div>
            <a href="#roster-section" class="chapter-link">12.0 Contributor Roster</a>
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
    let scrollTimer = null;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // When user is scrolling, hide the sidebar so it never obstructs content
      if (this.sidebar) {
        this.sidebar.classList.add("scrolling-hidden");
        document.body.classList.add("sidebar-is-scrolling");
        if (this.sidebar.classList.contains("mobile-open")) {
          this.sidebar.classList.remove("mobile-open");
        }
      }

      // Hide top header when scrolled past hero
      if (currentScrollY > 180) {
        if (this.header) this.header.classList.add("header-hidden");
      } else {
        if (this.header) this.header.classList.remove("header-hidden");
      }

      // Once scrolling stops for 750ms, restore visibility if past hero
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (this.sidebar) {
          this.sidebar.classList.remove("scrolling-hidden");
          document.body.classList.remove("sidebar-is-scrolling");
          if (currentScrollY > 180) {
            this.sidebar.classList.add("sidebar-visible");
            document.body.classList.add("has-story-sidebar");
          } else {
            this.sidebar.classList.remove("sidebar-visible");
            document.body.classList.remove("has-story-sidebar");
          }
        }
      }, 750);

      this.lastScrollY = currentScrollY;
    }, { passive: true });

    // Allow user to reveal sidebar instantly by hovering near left edge (<= 45px)
    window.addEventListener("mousemove", (e) => {
      if (e.clientX <= 45 && window.scrollY > 180) {
        if (this.sidebar) {
          this.sidebar.classList.remove("scrolling-hidden");
          this.sidebar.classList.add("sidebar-visible");
          document.body.classList.remove("sidebar-is-scrolling");
        }
      }
    }, { passive: true });

    // Hide sidebar immediately when clicking any chapter link
    if (this.sidebar) {
      this.sidebar.querySelectorAll(".chapter-link").forEach(link => {
        link.addEventListener("click", () => {
          this.sidebar.classList.add("scrolling-hidden");
        });
      });
    }
  }

  setupIntersectionObserver() {
    const sectionIds = [
      "hero",
      "enclosure-explorer",
      "multichannel-hierarchy",
      "xlr-hub",
      "top-level",
      "triad",
      "pyramid-section",
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

  setActiveChapter(targetId) {
    if (!this.sidebar || targetId === this.activeSectionId) return;
    this.activeSectionId = targetId;

    const chapters = this.sidebar.querySelectorAll(".story-chapter");
    chapters.forEach(ch => {
      const match = ch.getAttribute("data-target") === targetId;
      ch.classList.toggle("active", match);
      if (match) {
        // Ensure active item is smoothly scrolled into view inside sidebar
        ch.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.storySidebar = new StorySidebar();
});
