/**
 * print-report.js — "Print PDF" button, document version, and committee-only watermark
 *
 * - The version comes from <meta name="doc-version">, stamped by build.py at build time.
 * - Printing always uses the paper view; the instruments, wires and navigation are hidden.
 * - Every printed page carries a diagonal "COMMITTEE USE ONLY" watermark and a header/footer
 *   with the version and page numbers.
 */

const PRINT_NOTICE = "FOR COMMITTEE USE ONLY — NOT FOR PUBLICATION";

function docVersion() {
  const meta = document.querySelector('meta[name="doc-version"]');
  const v = meta ? meta.content : "dev";
  return v === "dev" ? `dev ${new Date(document.lastModified).toISOString().slice(0, 16).replace("T", " ")}` : v;
}

document.addEventListener("DOMContentLoaded", () => {
  const version = docVersion();
  document.querySelectorAll("[data-doc-version]").forEach(el => (el.textContent = `Version ${version}`));

  // Watermark: a fixed element repeats on every printed page
  const mark = document.createElement("div");
  mark.className = "print-watermark";
  mark.setAttribute("aria-hidden", "true");
  mark.innerHTML = `<span>COMMITTEE USE ONLY<br><small>Not for publishing</small></span>`;
  document.body.appendChild(mark);

  // First-page title block
  const cover = document.createElement("div");
  cover.className = "print-cover";
  cover.innerHTML = `
    <div class="print-cover-notice">${PRINT_NOTICE}</div>
    <div class="print-cover-title">${document.title}</div>
    <div class="print-cover-meta">Internal Report &amp; Interactive Toolset &bull; AES SC-05-05 &bull; Version ${version} &bull; Printed ${new Date().toLocaleDateString()}</div>`;
  document.body.prepend(cover);

  // Page margin boxes carry the notice, version and page numbers
  const pageStyle = document.createElement("style");
  pageStyle.textContent = `
    @page {
      margin: 16mm 12mm;
      @top-center { content: "${PRINT_NOTICE}"; font: 700 8pt sans-serif; color: #b91c1c; }
      @bottom-left { content: "Version ${version}"; font: 8pt sans-serif; color: #555; }
      @bottom-right { content: "Page " counter(page) " of " counter(pages); font: 8pt sans-serif; color: #555; }
    }`;
  document.head.appendChild(pageStyle);

  // Print in the paper view, then put the reader's view back
  let themeBeforePrint = null;
  window.addEventListener("beforeprint", () => {
    themeBeforePrint = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "paper");
  });
  window.addEventListener("afterprint", () => {
    if (themeBeforePrint) document.documentElement.setAttribute("data-theme", themeBeforePrint);
    themeBeforePrint = null;
  });

  document.getElementById("print-pdf-btn")?.addEventListener("click", () => window.print());
});
