/**
 * js/modules-viewer.js — AES-X152 100-Module Reference Curriculum Browser & Reader
 * Dynamically feeds text and schematics from the 100 Markdown modules into the interactive portal.
 * (c) 2026 Audio Engineering Society SC-05-05 Standards Working Group
 */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("modules-grid-container");
  const searchInput = document.getElementById("module-search-input");
  const partFilterSelect = document.getElementById("module-part-filter");
  const countDisplay = document.getElementById("module-count-display");
  const modal = document.getElementById("module-reader-modal");
  const modalBody = document.getElementById("module-modal-content");
  const modalCloseBtn = document.getElementById("module-modal-close");

  if (!container || typeof BALANCED_MODULES_DATA === "undefined") {
    return;
  }

  const modules = BALANCED_MODULES_DATA;

  function renderModules(filtered) {
    container.innerHTML = "";
    if (countDisplay) {
      countDisplay.textContent = `Displaying ${filtered.length} of ${modules.length} Technical Modules`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: var(--text-muted); background: var(--bg-card); border-radius: 8px;">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No modules matched your search.</p>
          <span style="font-size: 0.85rem;">Try searching for "CMRR", "Pin 1", "Phantom", "AES59", "Transformer", or "Thevenin".</span>
        </div>
      `;
      return;
    }

    filtered.forEach((mod) => {
      const card = document.createElement("div");
      card.className = "module-card";
      card.dataset.num = mod.num;
      card.dataset.part = mod.part;

      const numStr = String(mod.num).padStart(3, "0");
      const tagsHtml = (mod.tags || [])
        .slice(0, 3)
        .map((t) => `<span class="module-tag">#${t}</span>`)
        .join(" ");

      card.innerHTML = `
        <div class="module-card-header">
          <span class="module-badge">MOD-${numStr}</span>
          <span class="module-part-badge">Part ${mod.part}</span>
        </div>
        <h4 class="module-card-title">${mod.title}</h4>
        <p class="module-card-summary">${mod.summary}</p>
        <div class="module-card-equation">
          <code>${escapeHtml(mod.equation)}</code>
        </div>
        <div class="module-card-footer">
          <div class="module-tags-wrapper">${tagsHtml}</div>
          <button class="btn-read-module" data-num="${mod.num}">Read Module &rarr;</button>
        </div>
      `;

      card.querySelector(".btn-read-module").addEventListener("click", () => {
        openModuleReader(mod);
      });

      container.appendChild(card);
    });
  }

  function openModuleReader(mod) {
    if (!modal || !modalBody) return;
    const numStr = String(mod.num).padStart(3, "0");

    modalBody.innerHTML = `
      <div class="module-modal-header-banner">
        <div>
          <span class="badge badge-accent">MODULE ${numStr}</span>
          <span class="badge badge-secondary" style="margin-left: 0.5rem;">${mod.partTitle}</span>
          <h2 style="margin: 0.5rem 0 0.2rem; color: var(--text-primary); font-size: 1.4rem;">${mod.title}</h2>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">
            <strong>Standards:</strong> ${mod.standards.join(", ")} &bull; 
            <strong>Contributors:</strong> ${mod.authors.join(", ")}
          </div>
        </div>
        <div style="text-align: right;">
          <a href="modules/${mod.filename}" target="_blank" class="btn-raw-md" download>
            📄 Raw .MD File
          </a>
        </div>
      </div>

      <div class="module-modal-body-scroll">
        <div class="module-prose-block">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">1. Executive Summary &amp; The Real-World Problem</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
            ${escapeHtml(mod.myth)}
          </p>

          <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">2. Theoretical &amp; Physical Foundations</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
            ${escapeHtml(mod.theory)}
          </p>

          <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">3. Governing Equation &amp; Mathematical Analysis</h4>
          <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-color); border-radius: 6px; padding: 1rem; margin-bottom: 1rem;">
            <code style="font-size: 1.05rem; color: #38bdf8; display: block; margin-bottom: 0.5rem;">${escapeHtml(mod.equation)}</code>
            <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
              ${escapeHtml(mod.math)}
            </p>
          </div>

          <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">4. Technical Schematic &amp; Circuit Topography</h4>
          <pre class="module-ascii-schematic">${escapeHtml(mod.schematic)}</pre>

          <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">5. Real-World Engineering Takeaways</h4>
          <div class="module-takeaways-box">
            ${escapeHtml(mod.takeaways).replace(/\\n/g, "<br/>")}
          </div>

          <h4 style="color: var(--accent-cyan); margin-top: 1.25rem; margin-bottom: 0.4rem;">6. Self-Assessment &amp; Verification Benchmark</h4>
          <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 0.85rem 1.25rem; border-radius: 6px; font-size: 0.9rem; color: var(--text-primary);">
            ${escapeHtml(mod.quiz).replace(/\\n/g, "<br/>")}
          </div>
        </div>
      </div>
    `;

    modal.style.display = "flex";
  }

  function filterModules() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedPart = partFilterSelect ? partFilterSelect.value : "all";

    const filtered = modules.filter((mod) => {
      const matchesPart = selectedPart === "all" || String(mod.part) === selectedPart;
      const textToSearch = `${mod.num} ${mod.title} ${mod.summary} ${mod.tags.join(" ")} ${mod.standards.join(" ")}`.toLowerCase();
      const matchesQuery = !query || textToSearch.includes(query);
      return matchesPart && matchesQuery;
    });

    renderModules(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterModules);
  }
  if (partFilterSelect) {
    partFilterSelect.addEventListener("change", filterModules);
  }

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Initial render
  renderModules(modules);
});
