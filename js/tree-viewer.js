/**
 * AES-X152 Taxonomy Tree Interactive Viewer
 * Renders the hierarchical tree structure from X152_TREE_DATA,
 * supports expand/collapse, searching/filtering, and detail inspection.
 * Integrates directly with the Story Index Left-Side Sidebar and Document.
 */

let isTreeViewerInitialized = false;

function renderTreeNode(node, parentElement, level = 0, isMatch = false) {
  const hasChildren = node.children && node.children.length > 0;
  
  const nodeEl = document.createElement("div");
  nodeEl.className = `tree-node level-${level} ${hasChildren ? "has-children" : "is-leaf"}`;
  nodeEl.id = `tree-node-${node.id}`;

  const headerEl = document.createElement("div");
  headerEl.className = `tree-node-header ${isMatch ? "highlight-match" : ""}`;
  headerEl.setAttribute("data-node-id", node.id);

  // Toggle icon
  const toggleIcon = document.createElement("span");
  toggleIcon.className = "tree-toggle";
  toggleIcon.innerHTML = hasChildren ? "▾" : "•";
  headerEl.appendChild(toggleIcon);

  // Name & tag
  const labelEl = document.createElement("span");
  labelEl.className = "tree-label";
  labelEl.textContent = node.name;
  headerEl.appendChild(labelEl);

  if (node.tag) {
    const tagEl = document.createElement("span");
    tagEl.className = "tree-tag";
    tagEl.textContent = node.tag;
    headerEl.appendChild(tagEl);
  }

  nodeEl.appendChild(headerEl);

  // Detail click handler
  headerEl.addEventListener("click", (e) => {
    // If clicking on toggle arrow, toggle collapse
    if (e.target.classList.contains("tree-toggle") && hasChildren) {
      nodeEl.classList.toggle("collapsed");
      toggleIcon.innerHTML = nodeEl.classList.contains("collapsed") ? "▸" : "▾";
      e.stopPropagation();
      return;
    }
    // Select node for inspection
    document.querySelectorAll(".tree-node-header.selected").forEach(el => el.classList.remove("selected"));
    headerEl.classList.add("selected");
    displayNodeDetail(node);
  });

  // Render children container
  if (hasChildren) {
    const childrenContainer = document.createElement("div");
    childrenContainer.className = "tree-children";
    
    // Auto collapse deep levels (> 1) by default to keep clean
    if (level >= 1) {
      nodeEl.classList.add("collapsed");
      toggleIcon.innerHTML = "▸";
    }

    node.children.forEach(child => {
      renderTreeNode(child, childrenContainer, level + 1);
    });

    nodeEl.appendChild(childrenContainer);
  }

  parentElement.appendChild(nodeEl);
}

function displayNodeDetail(node) {
  // 1. Sidebar Node Inspector Elements
  const titleEl = document.getElementById("node-inspector-title");
  const badgeEl = document.getElementById("node-inspector-badge");
  const descEl = document.getElementById("node-inspector-desc");
  const pathEl = document.getElementById("node-inspector-path");
  const extraEl = document.getElementById("node-inspector-extra");

  if (titleEl) titleEl.textContent = node.name || "Select a Node";
  if (badgeEl) {
    badgeEl.textContent = node.tag || "SC-05-05";
    badgeEl.style.display = node.tag ? "inline-block" : "none";
  }
  if (pathEl) {
    pathEl.textContent = node.subtitle || `AES-X152 / ${node.tag || 'Taxonomy'}`;
  }
  if (descEl) {
    descEl.textContent = node.description || "No detailed description provided.";
  }
  if (extraEl) {
    let prosConsHtml = "";
    if (node.pros || node.cons) {
      prosConsHtml = `
        <div class="pros-cons-grid mt-2" style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.75rem;">
          ${node.pros ? `<div class="pro-box" style="background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; padding: 0.3rem 0.5rem; border-radius: 3px; color: #6ee7b7;"><strong>✓ Advantages:</strong> ${node.pros}</div>` : ""}
          ${node.cons ? `<div class="con-box" style="background: rgba(239, 68, 68, 0.1); border-left: 3px solid #ef4444; padding: 0.3rem 0.5rem; border-radius: 3px; color: #fca5a5;"><strong>⚠ Limitations:</strong> ${node.cons}</div>` : ""}
        </div>
      `;
    }
    if (node.children && node.children.length > 0) {
      prosConsHtml += `<div style="margin-top: 0.4rem; color: #94a3b8; font-size: 0.72rem;">Contains <strong>${node.children.length}</strong> sub-elements. Click arrows in tree to expand.</div>`;
    }
    extraEl.innerHTML = prosConsHtml;
  }

  // 2. Legacy / Fallback Card Container if present
  const detailCard = document.getElementById("tree-detail-card");
  if (detailCard) {
    let prosConsHtml = "";
    if (node.pros || node.cons) {
      prosConsHtml = `
        <div class="pros-cons-grid mt-3">
          ${node.pros ? `<div class="pro-box"><strong>✓ Advantages:</strong> ${node.pros}</div>` : ""}
          ${node.cons ? `<div class="con-box"><strong>⚠ Limitations:</strong> ${node.cons}</div>` : ""}
        </div>
      `;
    }
    detailCard.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0">${node.name}</h4>
        ${node.tag ? `<span class="badge badge-primary">${node.tag}</span>` : ""}
      </div>
      <div class="card-body">
        ${node.subtitle ? `<h6 class="text-muted mb-2">${node.subtitle}</h6>` : ""}
        <p class="lead-sm">${node.description || "No detailed description provided."}</p>
        ${prosConsHtml}
        ${node.children ? `<div class="mt-3 text-muted small">Contains <strong>${node.children.length}</strong> sub-elements. Click arrows in the tree to expand.</div>` : ""}
      </div>
    `;
  }

  // Flash highlight on inspector card
  const inspector = document.getElementById("tree-node-inspector") || detailCard;
  if (inspector) {
    inspector.classList.remove("fade-highlight");
    void inspector.offsetWidth;
    inspector.classList.add("fade-highlight");
  }
}

function initTreeViewer() {
  const container = document.getElementById("tree-root-container");
  if (!container || typeof X152_TREE_DATA === "undefined") return;

  if (isTreeViewerInitialized) return;
  isTreeViewerInitialized = true;

  container.innerHTML = "";
  renderTreeNode(X152_TREE_DATA, container, 0);

  // Search input
  const searchInput = document.getElementById("tree-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterTree(q);
    });
  }

  // Expand all / Collapse all buttons
  const expandBtn = document.getElementById("tree-expand-all");
  const collapseBtn = document.getElementById("tree-collapse-all");

  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      document.querySelectorAll(".tree-node.has-children").forEach(el => {
        el.classList.remove("collapsed");
        const toggle = el.querySelector(":scope > .tree-node-header > .tree-toggle");
        if (toggle) toggle.innerHTML = "▾";
      });
    });
  }

  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      document.querySelectorAll(".tree-node.has-children").forEach((el, idx) => {
        // Keep root open, collapse all else
        if (idx > 0) {
          el.classList.add("collapsed");
          const toggle = el.querySelector(":scope > .tree-node-header > .tree-toggle");
          if (toggle) toggle.innerHTML = "▸";
        }
      });
    });
  }

  // Auto-display root detail
  displayNodeDetail(X152_TREE_DATA);
}

function filterTree(query) {
  if (!query) {
    document.querySelectorAll(".tree-node").forEach(el => {
      el.style.display = "";
      const header = el.querySelector(":scope > .tree-node-header");
      if (header) header.classList.remove("highlight-match");
    });
    return;
  }

  function searchNode(node) {
    let matchSelf = node.name.toLowerCase().includes(query) ||
                    (node.description && node.description.toLowerCase().includes(query)) ||
                    (node.tag && node.tag.toLowerCase().includes(query));
    
    let childMatch = false;
    if (node.children) {
      node.children.forEach(c => {
        if (searchNode(c)) childMatch = true;
      });
    }

    const nodeEl = document.getElementById(`tree-node-${node.id}`);
    if (nodeEl) {
      if (matchSelf || childMatch) {
        nodeEl.style.display = "";
        nodeEl.classList.remove("collapsed");
        const toggle = nodeEl.querySelector(":scope > .tree-node-header > .tree-toggle");
        if (toggle && node.children) toggle.innerHTML = "▾";
        const header = nodeEl.querySelector(":scope > .tree-node-header");
        if (matchSelf && header) {
          header.classList.add("highlight-match");
        } else if (header) {
          header.classList.remove("highlight-match");
        }
      } else {
        nodeEl.style.display = "none";
      }
    }

    return matchSelf || childMatch;
  }

  searchNode(X152_TREE_DATA);
}

window.initTreeViewer = initTreeViewer;
window.displayNodeDetail = displayNodeDetail;

document.addEventListener("DOMContentLoaded", initTreeViewer);
