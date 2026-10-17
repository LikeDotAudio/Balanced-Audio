/**
 * story-sidebar.js — Dynamic Left-Side Story Index Tree & Auto-Hiding Header
 *
 * Requirements:
 * - When scrolling down, the top header smoothly hides to maximize document reading space.
 * - A persistent, interactive left-side Story Index Tree slides into view like a table of contents / story chapters.
 * - Highlights active chapter/demo in real time via IntersectionObserver.
 * - Clicking any item smoothly scrolls directly to that section.
 */

class StorySidebar {
  constructor() {
    this.header = document.querySelector(".site-header");
    this.sidebar = null;
    this.activeSectionId = null;
    this.lastScrollY = 0;
    this.init();
  }

  init() {
    this.createSidebarDOM();
    this.setupScrollListener();
    this.setupIntersectionObserver();
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
    aside.setAttribute("aria-label", "Story Index Navigation");

    aside.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <span class="sidebar-icon">📖</span>
          <div class="sidebar-title-group">
            <span class="sidebar-title">Story Index</span>
            <span class="sidebar-sub">AES-X152 Reference</span>
          </div>
        </div>
        <button id="sidebar-collapse-btn" class="sidebar-toggle-btn" title="Toggle Sidebar">◀</button>
      </div>

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

        <div class="story-chapter" data-target="tree-explorer">
          <div class="chapter-dot"></div>
          <a href="#tree-explorer" class="chapter-link">7.0 Standards Taxonomy Tree</a>
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
  }

  setupScrollListener() {
    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Scroll past hero triggers auto-hide of top header and display of story sidebar
      if (currentScrollY > 180) {
        if (this.header) this.header.classList.add("header-hidden");
        if (this.sidebar) this.sidebar.classList.add("sidebar-visible");
        document.body.classList.add("has-story-sidebar");
      } else {
        if (this.header) this.header.classList.remove("header-hidden");
        if (this.sidebar) this.sidebar.classList.remove("sidebar-visible");
        document.body.classList.remove("has-story-sidebar");
      }

      this.lastScrollY = currentScrollY;
    }, { passive: true });
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
      "tree-explorer",
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
